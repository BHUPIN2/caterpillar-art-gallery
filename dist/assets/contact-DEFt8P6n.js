import { i as initMap } from "./index-zNGUWzcJ.js";

function render() {
  return `
    <div class="contact-page" style="background: var(--bg-main); color: var(--white); scroll-margin-top: 100px;">
      <!-- Hero Section -->
      <section class="page-hero reveal-up" style="padding-top: clamp(130px, 16vh, 170px); padding-bottom: 3.5rem; text-align: center; background-color: var(--bg-main);">
        <div class="container">
          <p class="subtitle" style="color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.85rem; margin-bottom: 0.75rem;">Get In Touch</p>
          <h1 class="title" style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4.2rem); margin: 0.5rem 0 1rem 0; font-weight: 300; color: #ffffff;">Contact Us</h1>
          <p class="description" style="color: var(--gray-300); max-width: 600px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">We would love to hear from you. Send us a message or visit our gallery studio in Lakeside, Pokhara.</p>
        </div>
      </section>

      <!-- Main Contact Section -->
      <section class="section" style="background: var(--bg-main); padding: 4rem 0 6rem 0;">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="contact-grid-layout" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: start;">
            
            <!-- Left Column: Contact Form Card -->
            <div class="contact-form-card card reveal-up" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--shadow-md);">
              <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 0.5rem; font-weight: 300; color: #ffffff;">Send a Message</h2>
              <p style="color: var(--gray-300); font-size: 0.95rem; margin-bottom: 2rem;">Fill out the form below for painting inquiries, live wedding bookings, or custom commissions.</p>
              
              <form id="contact-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="color: #ffffff; font-weight: 500; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Full Name</label>
                  <input type="text" name="name" required class="form-input" placeholder="Your name..." style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: var(--radius-md); width: 100%; font-size: 0.95rem;" />
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;" class="form-row-2">
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="color: #ffffff; font-weight: 500; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Email Address</label>
                    <input type="email" name="email" required class="form-input" placeholder="hello@example.com" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: var(--radius-md); width: 100%; font-size: 0.95rem;" />
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="color: #ffffff; font-weight: 500; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Phone Number</label>
                    <input type="tel" name="phone" class="form-input" placeholder="+977 98..." style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: var(--radius-md); width: 100%; font-size: 0.95rem;" />
                  </div>
                </div>

                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="color: #ffffff; font-weight: 500; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Inquiry Subject</label>
                  <select name="subject" required class="form-input" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: var(--radius-md); width: 100%; font-size: 0.95rem; cursor: pointer;">
                    <option value="General Inquiry" style="background: #121212; color: #fff;">General Inquiry</option>
                    <option value="Wedding Live Painting" style="background: #121212; color: #fff;">Wedding Live Painting</option>
                    <option value="Custom Commission" style="background: #121212; color: #fff;">Custom Commission Request</option>
                    <option value="Trekking & Art Tour" style="background: #121212; color: #fff;">Trekking & Art Tour</option>
                    <option value="Workshop Booking" style="background: #121212; color: #fff;">Workshop Booking</option>
                  </select>
                </div>

                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="color: #ffffff; font-weight: 500; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Message</label>
                  <textarea name="message" required rows="5" class="form-textarea" placeholder="Tell us about your request..." style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: var(--radius-md); width: 100%; font-size: 0.95rem; line-height: 1.6;"></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 1rem; background: var(--white); color: var(--black); font-weight: 600; font-size: 1rem;">Send Message &rarr;</button>
              </form>
            </div>

            <!-- Right Column: Pokhara Gallery Information -->
            <div class="contact-info-wrapper reveal-up" style="display: flex; flex-direction: column; gap: 2rem;">
              <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--shadow-md);">
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 300; color: #ffffff; margin-bottom: 1.5rem;">Visit Our Pokhara Gallery</h2>
                
                <div class="info-block" style="margin-bottom: 1.75rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 1.25rem;">
                  <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 400; margin-bottom: 0.4rem; color: var(--accent); display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Gallery Location
                  </h3>
                  <p style="color: var(--gray-200); font-size: 1rem; line-height: 1.5;">Lakeside, Pokhara 33700, Nepal</p>
                </div>
                
                <div class="info-block" style="margin-bottom: 1.75rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 1.25rem;">
                  <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 400; margin-bottom: 0.4rem; color: var(--accent); display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Direct Contact
                  </h3>
                  <p style="color: var(--gray-200); margin-bottom: 0.35rem; font-size: 0.95rem;">WhatsApp / Phone: <strong style="color: #ffffff;">+977 98-00000000</strong></p>
                  <p style="color: var(--gray-200); font-size: 0.95rem;">Email: <strong style="color: #ffffff;">hello@caterpillarartgallery.com</strong></p>
                </div>

                <div class="info-block" style="margin-bottom: 1.75rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 1.25rem;">
                  <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 400; margin-bottom: 0.4rem; color: var(--accent); display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Opening Hours
                  </h3>
                  <p style="color: var(--gray-200); margin-bottom: 0.35rem; font-size: 0.95rem;">Monday &ndash; Friday: <strong style="color: #ffffff;">10:00 AM &ndash; 6:00 PM</strong></p>
                  <p style="color: var(--gray-200); margin-bottom: 0.35rem; font-size: 0.95rem;">Saturday: <strong style="color: #ffffff;">10:00 AM &ndash; 4:00 PM</strong></p>
                  <p style="color: var(--gray-200); font-size: 0.95rem;">Sunday: <strong style="color: #ffffff;">By Appointment Only</strong></p>
                </div>
                
                <div class="info-block">
                  <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 400; margin-bottom: 0.75rem; color: var(--accent);">Social Profiles</h3>
                  <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
                    <a href="https://www.instagram.com/kalo_biralo/" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; border-color: var(--accent); color: var(--accent);">Instagram @kalo_biralo</a>
                    <a href="https://www.facebook.com/kalo.biralo.321" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; border-color: var(--accent); color: var(--accent);">Facebook Page</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Google Map Section -->
      <section class="map-section reveal-up" style="border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14061.272186358362!2d83.95540306354425!3d28.212726590886196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959524a87317b9%3A0xe54d8b9d3329241b!2sLakeside%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" width="100%" height="450" style="border:0; display: block; filter: invert(90%) hue-rotate(180deg);" allowfullscreen="" loading="lazy"></iframe>
      </section>

      <!-- FAQ Accordion Section -->
      <section class="section" style="background: var(--bg-card); padding: 6rem 0;">
        <div class="container" style="max-width: 850px; margin: 0 auto;">
          <h2 class="section-title reveal-up" style="font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 3.5rem; text-align: center; font-weight: 300; color: #ffffff;">Frequently Asked Questions</h2>
          <div class="accordion-container stagger-children">
            ${[
              { question: `Do you offer international shipping for paintings?`, answer: `Yes, we ship original paintings worldwide from Pokhara with professional museum-grade packaging, insurance, and door-to-door tracking.` },
              { question: `How do I book a Live Wedding Painting session?`, answer: `Select 'Wedding Live Painting' in the form above or message us directly on WhatsApp with your event date and venue details.` },
              { question: `Can I commission a custom mountain landscape?`, answer: `Suman Wagle accepts custom landscape and portrait commissions. Provide your reference photos or location ideas in the inquiry form.` },
              { question: `What is included in the Trekking & Painting experience?`, answer: `Our art treks include guided mountain hikes, art supplies, accommodation, meals, and plein-air painting sessions.` }
            ].map((faq) => `
              <div class="accordion-item" style="border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 1rem; padding-bottom: 1rem;">
                <div class="accordion-header" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: #ffffff; padding: 0.75rem 0;">
                  <h4 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 400; color: #ffffff;">${faq.question}</h4>
                  <span class="accordion-icon" style="color: var(--accent); font-size: 1.5rem;">+</span>
                </div>
                <div class="accordion-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                  <div class="accordion-content-inner" style="color: var(--gray-300); padding-top: 0.5rem; line-height: 1.7; font-size: 0.95rem;">
                    ${faq.answer}
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function init() {
  let form = document.getElementById("contact-form");
  form && form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    let formData = new FormData(form);
    let payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      subject: formData.get('subject') || 'General Inquiry',
      message: formData.get('message')
    };

    try {
      let res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let data = await res.json();
      if (data.success) {
        alert("Thank you! Your message has been sent successfully. We will get back to you shortly.");
        form.reset();
      } else {
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message \u2192'; }
    }
  });

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      let content = header.nextElementSibling,
        icon = header.querySelector(".accordion-icon");
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        icon && (icon.textContent = "+");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon && (icon.textContent = "−");
      }
    });
  });
}

export { init, render };