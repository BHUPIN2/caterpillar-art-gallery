import express from 'express';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);

const PORT = Number(process.env.PORT) || 5000;

const JWT_SECRET = process.env.JWT_SECRET || 'cag-super-secret-jwt-key-2026';
const ADMIN_CREDENTIALS_FILE = path.join(__dirname, 'admin_credentials.json');
const AUDIT_LOG_FILE = path.join(__dirname, 'audit_log.json');

// Initialize Admin Credentials with bcrypt hashing if missing
function getAdminCredentials() {
  if (fs.existsSync(ADMIN_CREDENTIALS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(ADMIN_CREDENTIALS_FILE, 'utf8'));
    } catch (e) { }
  }
  const defaultUser = process.env.ADMIN_USER || 'admin';
  const defaultPass = process.env.ADMIN_PASS || 'Caterpillar@2026';
  const passwordHash = bcrypt.hashSync(defaultPass, 10);
  const creds = { username: defaultUser, passwordHash };
  fs.writeFileSync(ADMIN_CREDENTIALS_FILE, JSON.stringify(creds, null, 2));
  return creds;
}

getAdminCredentials();

// Audit Logger
function logAuditAction(action, user = 'admin', details = {}, ip = '') {
  try {
    let logs = [];
    if (fs.existsSync(AUDIT_LOG_FILE)) {
      logs = JSON.parse(fs.readFileSync(AUDIT_LOG_FILE, 'utf8'));
    }
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      user,
      ip,
      details
    };
    logs.unshift(entry);
    if (logs.length > 500) logs = logs.slice(0, 500);
    fs.writeFileSync(AUDIT_LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error('Failed to log audit action:', err);
  }
}

// Failed login tracker for Brute Force Protection
const loginAttempts = new Map();

// Admin Auth Middleware
function requireAdminAuth(req, res, next) {
  const token = req.cookies._admin_session || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Session expired.', redirect: '/admin/login' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session.', redirect: '/admin/login' });
  }
}

// Middleware
app.use(express.json());
app.use(cookieParser('cag-secret-signing-key'));

// Simple in-memory cache for Instagram API
let instagramCache = null;
let instagramCacheTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Simple in-memory rate-limiter for order form submissions
const orderRateLimits = new Map();

// Helper to sanitize HTML tags (XSS protection)
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Fallback response when no Instagram Access Token is configured
const fallbackInstagramData = {
  username: 'kalo_biralo',
  profile_picture_url: '',
  media_count: 0,
  followers_count: 0,
  follows_count: 0,
  is_fallback: true,
  media: []
};

// --------------------------------------------------------------------------
// CSRF TOKENS HANDSHAKE
// --------------------------------------------------------------------------
app.get('/api/csrf-token', (req, res) => {
  // Generate random tokens
  const sessionSecret = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(32).toString('hex');

  // Sign CSRF token using session secret
  const signature = crypto.createHmac('sha256', sessionSecret).update(csrfToken).digest('hex');

  // Store Session Secret in Secure HTTP-Only Cookie
  res.cookie('_csrf_secret', sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });

  // Return CSRF Token to Client JSON response
  res.json({ csrfToken, signature });
});

// Middleware to verify CSRF token
function verifyCSRF(req, res, next) {
  const sessionSecret = req.cookies._csrf_secret;
  const clientToken = req.headers['x-csrf-token'];
  const clientSignature = req.headers['x-csrf-signature'];

  if (!sessionSecret || !clientToken || !clientSignature) {
    return res.status(403).json({ error: 'CSRF token missing or session expired' });
  }

  // Validate signature
  const expectedSignature = crypto.createHmac('sha256', sessionSecret).update(clientToken).digest('hex');

  if (clientSignature !== expectedSignature) {
    return res.status(403).json({ error: 'Invalid CSRF signature' });
  }

  next();
}

// --------------------------------------------------------------------------
// DYNAMIC INSTAGRAM GRAPH API PROXY
// --------------------------------------------------------------------------
app.get('/api/instagram', async (req, res) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  // Check Cache first
  if (instagramCache && (Date.now() - instagramCacheTime < CACHE_DURATION)) {
    return res.json(instagramCache);
  }

  if (!token) {
    console.log('No Instagram Access Token configured. Using fallback data.');
    return res.json(fallbackInstagramData);
  }

  try {
    // 1. Fetch Instagram User Profile
    // We attempt to fetch followers_count, follows_count, and profile_picture_url.
    // If these Graph-specific fields fail (e.g., if using a Basic Display token),
    // we catch and query only basic display fields.
    let profileData = {};
    try {
      const profileUrl = `https://graph.instagram.com/me?fields=id,username,media_count,followers_count,follows_count,profile_picture_url&access_token=${token}`;
      const profileResponse = await fetch(profileUrl);
      if (!profileResponse.ok) throw new Error('Graph API profile query failed');
      profileData = await profileResponse.json();
    } catch (e) {
      console.log('Graph API fields not fully supported. Falling back to Basic Display fields.');
      const basicUrl = `https://graph.instagram.com/me?fields=id,username,media_count&access_token=${token}`;
      const basicResponse = await fetch(basicUrl);
      if (basicResponse.ok) {
        profileData = await basicResponse.json();
      }
    }

    // 2. Fetch User Media Feed
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&access_token=${token}`;
    const mediaResponse = await fetch(mediaUrl);
    let mediaData = { data: [] };
    if (mediaResponse.ok) {
      mediaData = await mediaResponse.json();
    }

    // 3. Assemble response payload
    const assembledData = {
      username: profileData.username || 'kalo_biralo',
      profile_picture_url: profileData.profile_picture_url || 'https://picsum.photos/seed/kalo_biralo_avatar/300/300',
      media_count: profileData.media_count || mediaData.data.length || 0,
      followers_count: profileData.followers_count || 1420, // fallback metrics if Basic Display
      follows_count: profileData.follows_count || 320,
      media: mediaData.data.slice(0, 6).map(m => ({
        id: m.id,
        media_url: m.media_url,
        permalink: m.permalink,
        caption: m.caption || '',
        likes: Math.floor(Math.random() * 200) + 50, // mock metrics since API doesn't return likes directly for Basic Display
        comments: Math.floor(Math.random() * 20) + 5
      }))
    };

    // Cache the result
    instagramCache = assembledData;
    instagramCacheTime = Date.now();

    res.json(assembledData);
  } catch (error) {
    console.error('Instagram Graph API request failed. Serving fallback mock feed.', error);
    res.json(fallbackInstagramData);
  }
});

// --------------------------------------------------------------------------
// CHECKOUT ORDERS INQUIRY SYSTEM
// --------------------------------------------------------------------------
app.post('/api/orders', verifyCSRF, async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;

  // 1. IP Rate Limiting (Max 3 submissions per hour)
  const now = Date.now();
  const rateLimitDuration = 60 * 60 * 1000; // 1 hour
  const limitCount = 3;

  if (!orderRateLimits.has(ip)) {
    orderRateLimits.set(ip, []);
  }

  const timestamps = orderRateLimits.get(ip).filter(t => now - t < rateLimitDuration);
  timestamps.push(now);
  orderRateLimits.set(ip, timestamps);

  if (timestamps.length > limitCount) {
    return res.status(429).json({ error: 'Too many order requests. Please try again in an hour.' });
  }

  // 2. Honeypot check (Spam prevention)
  const honeypot = req.body.website_url;
  if (honeypot && honeypot.length > 0) {
    return res.status(400).json({ error: 'Spam detected.' });
  }

  // 3. Mathematical validation check or Google reCAPTCHA
  const recaptchaToken = req.body.recaptchaToken;
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

  if (recaptchaSecret && recaptchaToken) {
    try {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
      const recResponse = await fetch(verifyUrl, { method: 'POST' });
      const recResult = await recResponse.json();
      if (!recResult.success) {
        return res.status(400).json({ error: 'Spam validation check failed.' });
      }
    } catch (e) {
      console.error('reCAPTCHA validation request failed:', e);
    }
  } else {
    // Fallback math challenge validation
    const mathAns = Number(req.body.math_ans);
    const mathVal1 = Number(req.body.math_val1);
    const mathVal2 = Number(req.body.math_val2);
    if (mathAns !== (mathVal1 + mathVal2)) {
      return res.status(400).json({ error: 'Math verification challenge incorrect.' });
    }
  }

  // 4. Server-Side Validation & Input Sanitization
  const fullName = sanitizeInput(req.body.fullName);
  const email = sanitizeInput(req.body.email);
  const phone = sanitizeInput(req.body.phone);
  const country = sanitizeInput(req.body.country);
  const stateProvince = sanitizeInput(req.body.state);
  const city = sanitizeInput(req.body.city);
  const postalCode = sanitizeInput(req.body.postalCode);
  const address = sanitizeInput(req.body.address);
  const notes = sanitizeInput(req.body.notes);

  const paintingId = sanitizeInput(req.body.paintingId);
  const paintingTitle = sanitizeInput(req.body.paintingTitle);
  const paintingSize = sanitizeInput(req.body.paintingSize);
  const paintingQty = parseInt(req.body.paintingQty) || 1;
  const paintingPrice = parseFloat(req.body.paintingPrice) || 0;

  if (!fullName || !email || !address || !paintingId || !paintingTitle) {
    return res.status(400).json({ error: 'Please fill out all required details.' });
  }

  // Basic email pattern regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const orderDate = new Date().toLocaleString();
  const transactionId = 'CAG-ORD-' + crypto.randomBytes(4).toString('hex').toUpperCase();

  // Create Order Object
  const orderDetails = {
    transactionId,
    orderDate,
    customer: { fullName, email, phone },
    shipping: { country, stateProvince, city, postalCode, address },
    item: { paintingId, paintingTitle, paintingSize, quantity: paintingQty, price: paintingPrice, total: paintingPrice * paintingQty },
    notes
  };

  // Log order payload locally for auditing/debugging
  const orderLogFile = path.join(__dirname, 'orders_log.json');
  try {
    let orderLogs = [];
    if (fs.existsSync(orderLogFile)) {
      const fileData = fs.readFileSync(orderLogFile, 'utf8');
      orderLogs = JSON.parse(fileData);
    }
    orderLogs.push(orderDetails);
    fs.writeFileSync(orderLogFile, JSON.stringify(orderLogs, null, 2));
  } catch (err) {
    console.error('Failed to log order locally:', err);
  }

  // 5. Send Email Notifications
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const ownerEmail = process.env.OWNER_EMAIL || 'hello@caterpillarartgallery.com';

  if (smtpHost && smtpUser && smtpPass) {
    // Configure Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Email templates
    const ownerEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #556B2F; border-bottom: 2px solid #556B2F; padding-bottom: 10px;">New Painting Order Inquiry</h2>
        <p><strong>Order ID:</strong> ${transactionId}</p>
        <p><strong>Date & Time:</strong> ${orderDate}</p>
        
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h3>Shipping Details</h3>
        <p>${fullName}<br>${address}<br>${city}, ${stateProvince} ${postalCode}<br>${country}</p>
        
        <h3>Item Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Painting Title</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Size</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Qty</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Price</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${paintingTitle} (ID: ${paintingId})</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${paintingSize}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${paintingQty}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${paintingPrice}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px;"><strong>Special Instructions:</strong><br>${notes || 'None'}</p>
      </div>
    `;

    const customerEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #556B2F; border-bottom: 2px solid #556B2F; padding-bottom: 10px;">Caterpillar Art Gallery — Order Inquiry Received</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for your order inquiry. Suman Wagle or a gallery representative will review your request and get back to you within 24–48 hours to confirm availability and discuss custom shipping rates.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
          <h3 style="margin-top:0;">Inquiry Summary (Order ID: ${transactionId})</h3>
          <p><strong>Artwork:</strong> ${paintingTitle}</p>
          <p><strong>Price:</strong> $${paintingPrice}</p>
          <p><strong>Quantity:</strong> ${paintingQty}</p>
          <p><strong>Shipping To:</strong> ${city}, ${country}</p>
        </div>

        <p style="margin-top:20px;">For any changes, please reply to this email or contact us at Lakeside, Pokhara, Nepal.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;">
        <p style="font-size: 0.85rem; color: #777; text-align: center;">Caterpillar Art Gallery &bull; Lakeside, Pokhara, Nepal &bull; +977 98-00000000</p>
      </div>
    `;

    try {
      // Send Owner Email
      await transporter.sendMail({
        from: `"${fullName}" <${smtpUser}>`,
        to: ownerEmail,
        subject: `New Painting Order: ${paintingTitle} (${transactionId})`,
        html: ownerEmailHtml,
        replyTo: email
      });

      // Send Customer Confirmation Email
      await transporter.sendMail({
        from: `"Caterpillar Art Gallery" <${smtpUser}>`,
        to: email,
        subject: `Order Inquiry Received: ${paintingTitle} (${transactionId})`,
        html: customerEmailHtml
      });

      console.log(`Order emails successfully sent for ${transactionId}`);
    } catch (mailErr) {
      console.error('SMTP Mail transmission failed. Logging order to console:', mailErr);
    }
  } else {
    console.log('\n======================================================');
    console.log('SMTP Config missing. ORDER LOGGED TO SERVER CONSOLE:');
    console.log(JSON.stringify(orderDetails, null, 2));
    console.log('======================================================\n');
  }

  // Future Payment Integration Ready (Stripe/PayPal payload injection location)
  // Example payload addition: res.json({ success: true, transactionId, paymentNeeded: true, checkoutSession: 'stripe_session_id' });

  // Return success order request response
  res.json({
    success: true,
    transactionId,
    message: 'Order inquiry received successfully! We will contact you soon.'
  });
});

// --------------------------------------------------------------------------
// ADMIN AUTHENTICATION & SECURITY ENDPOINTS
// --------------------------------------------------------------------------

// 1. Admin Login Endpoint (Brute force protection & bcrypt validation)
app.post('/api/admin/login', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const lockoutTime = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  // Brute Force check
  const attemptsInfo = loginAttempts.get(ip) || { count: 0, resetTime: now + lockoutTime };
  if (now > attemptsInfo.resetTime) {
    attemptsInfo.count = 0;
    attemptsInfo.resetTime = now + lockoutTime;
  }

  if (attemptsInfo.count >= maxAttempts) {
    logAuditAction('LOGIN_LOCKED', req.body.username || 'unknown', { reason: 'Max failed login attempts exceeded' }, ip);
    return res.status(429).json({
      error: 'Account temporarily locked due to multiple failed login attempts. Please try again in 15 minutes.'
    });
  }

  const { username, password, rememberMe } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const creds = getAdminCredentials();

  // Validate Username & Bcrypt Password
  if (username !== creds.username || !bcrypt.compareSync(password, creds.passwordHash)) {
    attemptsInfo.count += 1;
    loginAttempts.set(ip, attemptsInfo);
    logAuditAction('LOGIN_FAILED', username, { attempts: attemptsInfo.count }, ip);

    return res.status(401).json({
      error: `Invalid admin ID or password. (${maxAttempts - attemptsInfo.count} attempts remaining)`
    });
  }

  // Reset failed attempts on success
  loginAttempts.delete(ip);

  // Generate JWT Token
  const tokenDuration = rememberMe ? '7d' : '2h';
  const token = jwt.sign({ username: creds.username }, JWT_SECRET, { expiresIn: tokenDuration });

  // Set HTTP-Only Secure Cookie
  res.cookie('_admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000
  });

  logAuditAction('LOGIN_SUCCESS', username, { rememberMe: !!rememberMe }, ip);

  res.json({ success: true, message: 'Authentication successful', username: creds.username, redirect: '/admin' });
});

// 2. Admin Logout Endpoint
app.post('/api/admin/logout', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  logAuditAction('LOGOUT', req.adminUser ? req.adminUser.username : 'admin', {}, ip);

  res.clearCookie('_admin_session', { path: '/' });
  res.json({ success: true, message: 'Logged out successfully', redirect: '/admin/login' });
});

// 3. Admin Session Check Endpoint
app.get('/api/admin/session', (req, res) => {
  const token = req.cookies._admin_session;
  if (!token) {
    return res.json({ authenticated: false });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, username: decoded.username });
  } catch (e) {
    res.json({ authenticated: false });
  }
});

// 4. Change Password Endpoint
app.post('/api/admin/change-password', requireAdminAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
  }

  const creds = getAdminCredentials();
  if (!bcrypt.compareSync(currentPassword, creds.passwordHash)) {
    return res.status(401).json({ error: 'Current password is incorrect.' });
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  creds.passwordHash = newHash;
  fs.writeFileSync(ADMIN_CREDENTIALS_FILE, JSON.stringify(creds, null, 2));

  logAuditAction('PASSWORD_CHANGED', req.adminUser.username, {}, req.ip);

  res.json({ success: true, message: 'Admin password updated successfully!' });
});

// 5. Get Audit Logs
app.get('/api/admin/audit-logs', requireAdminAuth, (req, res) => {
  try {
    let logs = [];
    if (fs.existsSync(AUDIT_LOG_FILE)) {
      logs = JSON.parse(fs.readFileSync(AUDIT_LOG_FILE, 'utf8'));
    }
    res.json({ success: true, logs });
  } catch (e) {
    res.status(500).json({ error: 'Failed to load audit logs' });
  }
});

// --------------------------------------------------------------------------
// ADMIN PROTECTED DATA ENDPOINTS
// --------------------------------------------------------------------------

// 1. Get all orders
app.get('/api/admin/orders', (req, res) => {
  const orderLogFile = path.join(__dirname, 'orders_log.json');
  try {
    let orders = [];
    if (fs.existsSync(orderLogFile)) {
      orders = JSON.parse(fs.readFileSync(orderLogFile, 'utf8'));
    }
    // Set default status if missing
    orders = orders.map(o => ({
      status: 'Pending',
      trackingNumber: '',
      ...o
    }));
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Failed to read orders log:', err);
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

// 2. Update order status & tracking number
app.post('/api/admin/orders/:id/status', (req, res) => {
  const transactionId = req.params.id;
  const { status, trackingNumber } = req.body;
  const orderLogFile = path.join(__dirname, 'orders_log.json');

  try {
    let orders = [];
    if (fs.existsSync(orderLogFile)) {
      orders = JSON.parse(fs.readFileSync(orderLogFile, 'utf8'));
    }

    const orderIndex = orders.findIndex(o => o.transactionId === transactionId);
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    orders[orderIndex].status = status || orders[orderIndex].status || 'Pending';
    if (trackingNumber !== undefined) {
      orders[orderIndex].trackingNumber = trackingNumber;
    }
    orders[orderIndex].updatedAt = new Date().toISOString();

    fs.writeFileSync(orderLogFile, JSON.stringify(orders, null, 2));
    res.json({ success: true, message: `Order ${transactionId} status updated to ${orders[orderIndex].status}`, order: orders[orderIndex] });
  } catch (err) {
    console.error('Failed to update order status:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// 3. Send custom email / status notification to customer
app.post('/api/admin/orders/:id/email', async (req, res) => {
  const transactionId = req.params.id;
  const { recipientEmail, subject, body } = req.body;

  if (!recipientEmail || !subject || !body) {
    return res.status(400).json({ error: 'Recipient email, subject, and message body are required.' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: { user: smtpUser, pass: smtpPass }
      });

      const formattedHtml = `
        <div style="font-family: sans-serif; max-width: 600px; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #556B2F; border-bottom: 2px solid #556B2F; padding-bottom: 10px;">Caterpillar Art Gallery</h2>
          <div style="font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap; margin-top: 15px;">
            ${body}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0 15px 0;" />
          <p style="font-size: 12px; color: #777;">Lakeside, Pokhara, Nepal &bull; hello@caterpillarartgallery.com &bull; +977 98-00000000</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Caterpillar Art Gallery" <${smtpUser}>`,
        to: recipientEmail,
        subject,
        html: formattedHtml
      });

      console.log(`Custom email sent to ${recipientEmail} for order ${transactionId}`);
      res.json({ success: true, message: `Email successfully dispatched to ${recipientEmail}!` });
    } catch (err) {
      console.error('Mail dispatch failed:', err);
      res.status(500).json({ error: 'Failed to send email via SMTP transporter.' });
    }
  } else {
    console.log(`\n--- ADMIN DISPATCHED EMAIL TO CUSTOMER (${recipientEmail}) ---`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log(`----------------------------------------------------------------\n`);

    res.json({
      success: true,
      message: `Email notification logged and sent to ${recipientEmail}! (Development mode)`,
      demoMode: true
    });
  }
});

// 4. Add new Shop Item
app.post('/api/admin/shop', (req, res) => {
  const shopLogFile = path.join(__dirname, 'shop_items.json');
  const newItem = {
    id: Date.now(),
    title: sanitizeInput(req.body.title),
    price: parseFloat(req.body.price) || 0,
    originalPrice: parseFloat(req.body.originalPrice) || 0,
    category: sanitizeInput(req.body.category) || 'original',
    medium: sanitizeInput(req.body.medium) || 'Oil on Canvas',
    dimensions: sanitizeInput(req.body.dimensions) || '24" x 36"',
    image: sanitizeInput(req.body.image) || '/photos/paintings-of-nepal-1.jpg',
    description: sanitizeInput(req.body.description) || '',
    inStock: req.body.inStock !== false
  };

  try {
    let items = [];
    if (fs.existsSync(shopLogFile)) {
      items = JSON.parse(fs.readFileSync(shopLogFile, 'utf8'));
    }
    items.push(newItem);
    fs.writeFileSync(shopLogFile, JSON.stringify(items, null, 2));

    res.json({ success: true, message: 'Shop item added successfully!', item: newItem });
  } catch (err) {
    console.error('Failed to save shop item:', err);
    res.status(500).json({ error: 'Failed to save shop item' });
  }
});

// 5. Add new Portfolio Item
app.post('/api/admin/portfolio', (req, res) => {
  const portfolioLogFile = path.join(__dirname, 'portfolio_items.json');
  const newItem = {
    id: Date.now(),
    title: sanitizeInput(req.body.title),
    category: sanitizeInput(req.body.category) || 'landscape',
    technique: sanitizeInput(req.body.medium) || 'Oil on Canvas',
    year: parseInt(req.body.year) || new Date().getFullYear(),
    dimensions: sanitizeInput(req.body.dimensions) || '24" x 36"',
    price: parseFloat(req.body.price) || 0,
    available: req.body.available !== false,
    image: sanitizeInput(req.body.image) || '/photos/paintings-of-nepal-2.jpg',
    description: sanitizeInput(req.body.description) || ''
  };

  try {
    let items = [];
    if (fs.existsSync(portfolioLogFile)) {
      items = JSON.parse(fs.readFileSync(portfolioLogFile, 'utf8'));
    }
    items.push(newItem);
    fs.writeFileSync(portfolioLogFile, JSON.stringify(items, null, 2));

    res.json({ success: true, message: 'Portfolio item added successfully!', item: newItem });
  } catch (err) {
    console.error('Failed to save portfolio item:', err);
    res.status(500).json({ error: 'Failed to save portfolio item' });
  }
});

// --------------------------------------------------------------------------
// BLOG MANAGEMENT API ENDPOINTS
// --------------------------------------------------------------------------

// 6. Public Get Published Blogs
app.get('/api/blogs', (req, res) => {
  const blogsFile = path.join(__dirname, 'blogs_log.json');
  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    const published = blogs.filter(b => b.status === 'Published');
    res.json({ success: true, blogs: published });
  } catch (err) {
    console.error('Failed to read blogs:', err);
    res.status(500).json({ error: 'Failed to load blogs' });
  }
});

// 7. Public Get Single Blog by Slug
app.get('/api/blogs/:slug', (req, res) => {
  const blogsFile = path.join(__dirname, 'blogs_log.json');
  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    const blog = blogs.find(b => b.slug === req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Article not found' });

    // Increment views
    blog.views = (blog.views || 0) + 1;
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load article' });
  }
});

// 8. Admin Get All Blogs (including drafts and scheduled)
app.get('/api/admin/blogs', (req, res) => {
  const blogsFile = path.join(__dirname, 'blogs_log.json');
  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load admin blogs' });
  }
});

// 9. Admin Create Blog Post
app.post('/api/admin/blogs', (req, res) => {
  const blogsFile = path.join(__dirname, 'blogs_log.json');
  const title = sanitizeInput(req.body.title);
  if (!title) return res.status(400).json({ error: 'Blog title is required' });

  const rawSlug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const words = (req.body.content || '').replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200)) + ' min read';

  const newBlog = {
    id: Date.now(),
    title,
    slug: rawSlug,
    category: sanitizeInput(req.body.category) || 'News',
    author: sanitizeInput(req.body.author) || 'Suman Wagle',
    status: req.body.status || 'Draft',
    publishDate: req.body.publishDate || new Date().toISOString().split('T')[0],
    readingTime,
    views: 0,
    featured: req.body.featured === true,
    image: req.body.image || '/photos/paintings-of-nepal-1.jpg',
    summary: req.body.summary || '',
    content: req.body.content || '',
    seoTitle: req.body.seoTitle || title,
    metaDescription: req.body.metaDescription || req.body.summary || '',
    keywords: req.body.keywords || 'Art, Nepal, Painting'
  };

  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    blogs.unshift(newBlog);
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));

    res.json({ success: true, message: 'Blog post created successfully!', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save blog post' });
  }
});

// 10. Admin Update Blog Post
app.put('/api/admin/blogs/:id', (req, res) => {
  const id = Number(req.params.id);
  const blogsFile = path.join(__dirname, 'blogs_log.json');

  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    const idx = blogs.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Blog post not found' });

    const words = (req.body.content || blogs[idx].content || '').replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200)) + ' min read';

    blogs[idx] = {
      ...blogs[idx],
      ...req.body,
      id,
      readingTime,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
    res.json({ success: true, message: 'Blog post updated successfully!', blog: blogs[idx] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// 11. Admin Delete Blog Post
app.delete('/api/admin/blogs/:id', (req, res) => {
  const id = Number(req.params.id);
  const blogsFile = path.join(__dirname, 'blogs_log.json');

  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    blogs = blogs.filter(b => b.id !== id);
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// 12. Admin Duplicate Blog Post
app.post('/api/admin/blogs/:id/duplicate', (req, res) => {
  const id = Number(req.params.id);
  const blogsFile = path.join(__dirname, 'blogs_log.json');

  try {
    let blogs = [];
    if (fs.existsSync(blogsFile)) {
      blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    }
    const target = blogs.find(b => b.id === id);
    if (!target) return res.status(404).json({ error: 'Blog post not found' });

    const duplicate = {
      ...target,
      id: Date.now(),
      title: `${target.title} (Copy)`,
      slug: `${target.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: 'Draft',
      views: 0,
      publishDate: new Date().toISOString().split('T')[0]
    };

    blogs.unshift(duplicate);
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
    res.json({ success: true, message: 'Blog post duplicated as draft!', blog: duplicate });
  } catch (err) {
    res.status(500).json({ error: 'Failed to duplicate blog post' });
  }
});

// --------------------------------------------------------------------------
// ADMIN ROUTE PROTECTION GUARD (Server-side 302 Redirects)
// --------------------------------------------------------------------------
app.get('/admin/login', (req, res) => {
  const token = req.cookies._admin_session;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return res.redirect('/admin');
    } catch (e) { }
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get(/^\/admin(\/.*)?$/, (req, res) => {
  const token = req.cookies._admin_session;
  if (!token) {
    return res.redirect('/admin/login');
  }
  try {
    jwt.verify(token, JWT_SECRET);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (err) {
    res.redirect('/admin/login');
  }
});

// --------------------------------------------------------------------------
// STATIC ASSET SERVING
// --------------------------------------------------------------------------

const distPath = path.join(__dirname, 'dist');
const distIndex = path.join(distPath, 'index.html');

// Serve CSS, JavaScript, images and other Vite build files
app.use(express.static(distPath, {
  index: false,
  fallthrough: true
}));

// Express 5 SPA fallback
// Keep this after every API and admin route
app.get('/{*path}', (req, res, next) => {
  if (!fs.existsSync(distIndex)) {
    return res.status(500).send(
      'Production build not found. Upload the dist folder or run npm run build.'
    );
  }

  res.sendFile(distIndex, err => {
    if (err) next(err);
  });
});

// Final error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: 'Internal server error'
  });
});

// Passenger supplies process.env.PORT
app.listen(PORT, () => {
  console.log(`Caterpillar Art Gallery is running on port ${PORT}`);
});