import { n as fetchIg } from "./instagram-B34Hmjju.js";
import { t as paintingsData } from "./paintings-CGb28fgX.js";
import { t as servicesData } from "./services-d98QNpyH.js";

var articlesData = [
  {
    id: 1,
    title: "The Art of Himalayan Landscapes",
    slug: "art-of-himalayan-landscapes",
    excerpt: "Exploring the techniques and inspiration behind capturing the world's highest peaks on canvas.",
    author: "Suman Wagle",
    date: "2024-11-15",
    image: "/photos/paintings-of-nepal-1.jpg",
    category: "Technique",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Preserving Newari Architecture Through Art",
    slug: "preserving-newari-architecture-through-art",
    excerpt: "How contemporary artists are documenting the intricate beauty of traditional Kathmandu Valley architecture.",
    author: "Suman Maharjan",
    date: "2024-10-22",
    image: "/photos/paintings-of-nepal-2.jpg",
    category: "Heritage",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "A Beginner's Guide to Plein Air Painting",
    slug: "beginners-guide-to-plein-air",
    excerpt: "Tips and tricks for taking your easel outdoors and painting from life.",
    author: "Elena Rostova",
    date: "2024-09-10",
    image: "/photos/paintings-of-nepal-3.jpg",
    category: "Tutorial",
    readTime: "6 min"
  }
];

async function render() {
  let works = paintingsData.filter((e) => e.featured || e.available).slice(0, 6);
  let firstWork = works[0] || {};
  let remainingWorks = works.slice(1);

  let services = servicesData.slice(0, 3);
  let firstService = services[0] || {};
  let remainingServices = services.slice(1);

  let articles = articlesData.slice(0, 3);

  return `
    <div class="home-page" style="background: var(--bg-main); color: var(--white); overflow: hidden;">
      
      <!-- 1. MOBILE-FIRST HERO SECTION -->
      <section class="hero-section-root" style="position: relative; min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; padding: clamp(130px, 16vh, 170px) 1.25rem 2.5rem 1.25rem; overflow: hidden; background: var(--bg-main);">
        <div style="position: absolute; top: -10%; right: -5%; width: 50vw; height: 50vw; background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%); border-radius: 50%; opacity: 0.35; z-index: 0; filter: blur(80px); pointer-events: none;"></div>
        
        <div class="container" style="position: relative; z-index: 2; width: 100%; max-width: 1400px; margin: 0 auto;">
          <div class="hero-split-grid" style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 4rem; align-items: center;">
            
            <!-- Left Info Column -->
            <div class="hero-info-col" style="z-index: 3;">
              <span class="hero-subtitle reveal-up" style="display: inline-block; font-size: 0.78rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 0.85rem;">LAKESIDE, POKHARA &bull; NEPAL</span>
              
              <h1 class="reveal-up display-text" style="color: var(--white); font-family: var(--font-heading); line-height: 1.1; margin-bottom: 1.25rem; font-weight: 300; font-size: clamp(2.1rem, 6.5vw, 4.2rem);">
                Art Inspired <br>
                <span style="font-style: italic; font-weight: 400; color: var(--accent);">by the Himalayas</span>
              </h1>

              <p class="reveal-up" style="font-size: 1.05rem; line-height: 1.7; color: var(--gray-200); margin-bottom: 1.85rem; max-width: 520px;">
                Caterpillar Art Gallery is a premium, experience-driven art studio in Pokhara. We combine travel, adventure, and fine art: <strong>Trekking & Painting Retreats</strong>, <strong>Wedding Live Painting</strong>, and original Himalayan landscape paintings.
              </p>

              <!-- CTA Buttons (ALWAYS VISIBLE FIRST ON MOBILE) -->
              <div class="reveal-up hero-cta-buttons" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
                <a href="#/portfolio" class="btn btn-primary" style="background: var(--white); color: var(--black); padding: 0.85rem 1.85rem; font-weight: 600;">Explore Paintings</a>
                <a href="#/services" class="btn btn-secondary" style="background: transparent; color: var(--white); border-color: rgba(255,255,255,0.25); padding: 0.85rem 1.85rem;">Our Experiences</a>
              </div>
            </div>
            
            <!-- Right Column - Interactive Drawing Easel -->
            <div class="reveal-scale hero-easel-col" style="display: flex; flex-direction: column; align-items: center;">
              <div class="easel-stand" style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center;">
                
                <div style="position: relative; background: #e6dfd5; border: 10px solid #1a130e; border-radius: 6px; box-shadow: var(--shadow-lg), 0 20px 50px rgba(0,0,0,0.8); width: 100%; height: 320px; overflow: hidden; cursor: crosshair;" id="canvasFrame">
                  <div style="position: absolute; inset: 0; background: url('https://www.transparenttextures.com/patterns/canvas-paper.png'); opacity: 0.6; pointer-events: none; mix-blend-mode: multiply; z-index: 1;"></div>
                  <canvas id="heroSketchCanvas" style="position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 2;"></canvas>
                  
                  <div id="sketchHint" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 3; pointer-events: none; color: #443c35; text-align: center; padding: 1.5rem; font-family: var(--font-heading); transition: opacity 0.5s ease;">
                    <span style="font-size: 2.2rem; margin-bottom: 0.5rem; animation: float 3s ease-in-out infinite;">🖌️</span>
                    <span style="font-size: 1.2rem; font-style: italic; font-weight: 500;">Touch & Drag to Paint</span>
                    <span style="font-size: 0.72rem; text-transform: uppercase; font-family: var(--font-body); letter-spacing: 0.15em; margin-top: 0.4rem; opacity: 0.6;">Sketch on Canvas</span>
                  </div>
                </div>
                
                <div style="display: flex; gap: 0.85rem; margin-top: 1.25rem; align-items: center; background: rgba(18, 18, 18, 0.85); border: 1px solid rgba(255,255,255,0.08); padding: 0.5rem 1.25rem; border-radius: var(--radius-pill); z-index: 3; backdrop-filter: blur(10px);">
                  <div style="display: flex; gap: 0.6rem;">
                    <div class="brush-color active" data-color="#556B2F" style="width: 20px; height: 20px; border-radius: 50%; background: #556B2F; border: 2px solid var(--white); cursor: pointer;"></div>
                    <div class="brush-color" data-color="#9ab07e" style="width: 20px; height: 20px; border-radius: 50%; background: #9ab07e; border: 2px solid transparent; cursor: pointer;"></div>
                    <div class="brush-color" data-color="#111111" style="width: 20px; height: 20px; border-radius: 50%; background: #111111; border: 2px solid transparent; cursor: pointer;"></div>
                    <div class="brush-color" data-color="#902c2c" style="width: 20px; height: 20px; border-radius: 50%; background: #902c2c; border: 2px solid transparent; cursor: pointer;"></div>
                  </div>
                  <div style="width: 1px; height: 16px; background: rgba(255,255,255,0.15);"></div>
                  <button id="clearSketchBtn" class="btn btn-secondary" style="padding: 0.25rem 0.65rem; font-size: 0.7rem; margin-bottom: 0;">Clear</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 2. EXPANDABLE DRAWER SECTION: EXPERIENCE ART SPECIALTIES -->
      <section class="section" style="padding: 4rem 0; background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.03);">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1.25rem;">
          
          <div class="expandable-folder-drawer">
            <!-- Folder Badge -->
            <div style="text-align: center;">
              <span class="folder-tab-badge">📁 Experience Art Specialties Folder</span>
              <h2 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 4.5vw, 2.8rem); font-weight: 300; color: #fff; margin: 0.25rem 0 1rem 0;">Trekking & Live Painting Retreats</h2>
            </div>

            <!-- COLLAPSED DEFAULT VIEW (1 FEATURED ITEM ONLY) -->
            <div class="drawer-collapsed-view">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05);">
                <div style="aspect-ratio: 16/10; overflow: hidden; border-radius: var(--radius-md);">
                  <img src="${firstService.image || '/photos/photo-wedding.png'}" alt="${firstService.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                </div>
                <div>
                  <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent); font-weight: 600; display: block; margin-bottom: 0.4rem;">FEATURED SPECIALTY &bull; ${firstService.duration || 'Custom'}</span>
                  <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 0.75rem; font-weight: 400;">${firstService.title}</h3>
                  <p style="color: var(--gray-200); font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.25rem;">${firstService.description}</p>
                  <a href="#/services" class="btn btn-secondary" style="padding: 0.6rem 1.4rem; font-size: 0.85rem;">Explore Experience &rarr;</a>
                </div>
              </div>
            </div>

            <!-- EXPANDED VIEW (REMAINING 2 SPECIALTIES) -->
            <div class="drawer-expanded-view">
              <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                ${remainingServices.map((e) => `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05);">
                    <div style="aspect-ratio: 16/10; overflow: hidden; border-radius: var(--radius-md);">
                      <img src="${e.image}" alt="${e.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                    </div>
                    <div>
                      <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent); font-weight: 600; display: block; margin-bottom: 0.4rem;">SPECIALTY &bull; ${e.duration || 'Custom'}</span>
                      <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 0.75rem; font-weight: 400;">${e.title}</h3>
                      <p style="color: var(--gray-200); font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.25rem;">${e.description}</p>
                      <a href="#/services" class="btn btn-secondary" style="padding: 0.6rem 1.4rem; font-size: 0.85rem;">Explore Experience &rarr;</a>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- ANIMATED DOWN ARROW EXPAND TRIGGER -->
            <div style="text-align: center; margin-top: 1.5rem;">
              <button class="folder-expand-trigger-btn" data-closed-text="Explore All 3 Specialties" data-open-text="Collapse Folder ▲">
                <span class="btn-label-text">Explore All 3 Specialties</span>
                <span class="folder-arrow-anim">▼</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      <!-- 3. EXPANDABLE DRAWER SECTION: CATALOGUE FOLDER -->
      <section class="section" style="padding: 4rem 0; background: var(--bg-main);">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1.25rem;">
          
          <div class="expandable-folder-drawer">
            <!-- Folder Badge -->
            <div style="text-align: center;">
              <span class="folder-tab-badge">📁 Portfolio Catalogue Folder</span>
              <h2 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 4.5vw, 2.8rem); font-weight: 300; color: #fff; margin: 0.25rem 0 1rem 0;">Original Himalayan Paintings</h2>
            </div>

            <!-- COLLAPSED DEFAULT VIEW (1 FEATURED CARD ONLY) -->
            <div class="drawer-collapsed-view">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05);">
                <div style="aspect-ratio: 4/3; overflow: hidden; border-radius: var(--radius-md);">
                  <img src="${firstWork.image || '/photos/paintings-of-nepal-1.jpg'}" alt="${firstWork.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                </div>
                <div>
                  <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent); font-weight: 600; display: block; margin-bottom: 0.4rem;">FEATURED MASTERPIECE</span>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                    <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin: 0; font-weight: 400;">${firstWork.title}</h3>
                    <span style="font-weight: 700; color: var(--accent); font-size: 1.25rem; white-space: nowrap;">$${firstWork.price}</span>
                  </div>
                  <p style="color: var(--gray-400); font-size: 0.88rem; margin: 0.4rem 0 1rem 0;">${firstWork.medium} &bull; ${firstWork.size}</p>
                  <p style="color: var(--gray-200); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">Handmade original oil painting capturing the morning alpenglow over Machhapuchhre in Lakeside, Pokhara.</p>
                  <button class="btn btn-primary buy-painting" data-id="${firstWork.id}" data-title="${firstWork.title}" data-price="${firstWork.price}" data-size="${firstWork.size}" data-img="${firstWork.image}" style="padding: 0.65rem 1.5rem; font-size: 0.85rem;">Inquire Artwork</button>
                </div>
              </div>
            </div>

            <!-- EXPANDED VIEW (REMAINING 5 ARTWORKS) -->
            <div class="drawer-expanded-view">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
                ${remainingWorks.map((e) => `
                  <div class="painting-card" style="position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--bg-main); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="aspect-ratio: 4/3; width: 100%; overflow: hidden; border-radius: var(--radius-md);">
                      <img src="${e.image}" alt="${e.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                    <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.35rem;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                        <h4 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 400; color: #fff; margin: 0;">${e.title}</h4>
                        <span style="font-weight: 700; color: var(--accent); font-size: 1.1rem; white-space: nowrap;">$${e.price}</span>
                      </div>
                      <p style="color: var(--gray-400); font-size: 0.82rem; margin: 0;">${e.medium} &bull; ${e.size}</p>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                        <span class="tag" style="background: ${e.available ? `rgba(154,176,126,0.2)` : `rgba(255,255,255,0.08)`}; color: ${e.available ? `var(--accent)` : `var(--gray-400)`}; font-size: 0.72rem; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill); font-weight: 600;">${e.available ? `Available` : `Sold`}</span>
                        <button class="btn btn-secondary buy-painting" data-id="${e.id}" data-title="${e.title}" data-price="${e.price}" data-size="${e.size}" data-img="${e.image}" style="padding: 0.35rem 0.85rem; font-size: 0.75rem;">Inquire</button>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- ANIMATED DOWN ARROW EXPAND TRIGGER -->
            <div style="text-align: center; margin-top: 1.5rem;">
              <button class="folder-expand-trigger-btn" data-closed-text="View Full Catalogue (6 Works)" data-open-text="Collapse Folder ▲">
                <span class="btn-label-text">View Full Catalogue (6 Works)</span>
                <span class="folder-arrow-anim">▼</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      <!-- 4. LATEST JOURNAL ENTRIES -->
      <section class="section" style="padding: 5rem 0; background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.03);">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1.25rem;">
          <div class="section-header reveal-up" style="margin-bottom: 3rem; text-align: center;">
            <span class="section-subtitle" style="color: var(--accent); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.8rem; font-weight: 600;">Journal Logs</span>
            <h2 class="section-title" style="font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 300;">Latest Journal Entries</h2>
          </div>
          
          <div class="grid grid-3 stagger-children" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${articles.map((e) => `
              <div class="blog-card card" style="border: 1px solid rgba(255,255,255,0.05); background: var(--bg-main); border-radius: var(--radius-lg); overflow: hidden;">
                <img src="${e.image}" alt="${e.title}" style="width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block;" />
                <div style="padding: 1.5rem;">
                  <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 0.4rem;">${e.category}</span>
                  <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.75rem; line-height: 1.3;"><a href="#/blog/${e.slug}" style="color: var(--white);">${e.title}</a></h3>
                  <p style="font-size: 0.88rem; color: var(--gray-300); margin-bottom: 1.25rem; line-height: 1.6;">${e.excerpt}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.78rem; color: var(--gray-400);">
                    <span>${e.date}</span>
                    <span>${e.readTime} read</span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- 5. INSTAGRAM FEED -->
      <section class="instagram-feed reveal-up" style="border-bottom: 1px solid rgba(255,255,255,0.03);">
        <div class="instagram-header" style="text-align: center; padding: 4rem 0 2rem;">
          <span class="section-subtitle" style="color: var(--accent); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.8rem; font-weight: 600;">Visual Feed</span>
          <h3 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 300;">Follow Suman Wagle</h3>
          <p style="color: var(--gray-400); margin-top: 0.5rem;"><a href="https://instagram.com/kalo_biralo" id="igUsernameLink" target="_blank" rel="noopener" style="color: var(--accent); font-weight: 600;">@kalo_biralo</a></p>
        </div>
        
        <div class="instagram-grid" id="instagram-grid-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.5rem;"></div>
        
        <div style="text-align: center; padding: 2.5rem 0 4rem 0;">
          <a href="https://instagram.com/kalo_biralo" id="igFollowBtn" target="_blank" rel="noopener" class="btn btn-secondary" style="border-color: var(--accent); color: var(--accent);">Follow on Instagram</a>
        </div>
      </section>

    </div>
  `;
}

function init() {
  initSketchCanvas();
  initInstagram();
  initExpandableDrawers();
}

function initExpandableDrawers() {
  document.querySelectorAll(".folder-expand-trigger-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let drawer = btn.closest(".expandable-folder-drawer");
      if (!drawer) return;

      let isOpen = drawer.classList.toggle("is-open");
      let labelSpan = btn.querySelector(".btn-label-text");
      let closedText = btn.getAttribute("data-closed-text") || "View Full Folder";
      let openText = btn.getAttribute("data-open-text") || "Collapse Folder ▲";

      if (labelSpan) {
        labelSpan.textContent = isOpen ? openText : closedText;
      }
    });
  });
}

async function initInstagram() {
  let container = document.getElementById("instagram-grid-container");
  if (!container) return;
  try {
    let data = await fetchIg();
    let media = data.media || [];
    if (data.is_fallback || media.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
          <a href="https://instagram.com/kalo_biralo" target="_blank" class="btn btn-primary" style="background: var(--white); color: var(--black);">Follow @kalo_biralo on Instagram</a>
        </div>
      `;
      return;
    }
    container.innerHTML = media.slice(0, 6).map((e) => `
      <a href="${e.permalink}" target="_blank" rel="noopener" style="display: block; aspect-ratio: 1; overflow: hidden;">
        <img src="${e.media_url}" alt="${e.caption}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
      </a>
    `).join("");
  } catch (err) { }
}

function initSketchCanvas() {
  let canvas = document.getElementById("heroSketchCanvas"),
    frame = document.getElementById("canvasFrame"),
    hint = document.getElementById("sketchHint"),
    clearBtn = document.getElementById("clearSketchBtn"),
    colors = document.querySelectorAll(".brush-color");

  if (!canvas || !frame) return;

  let ctx = canvas.getContext("2d"),
    isDrawing = false,
    color = "#556B2F";

  function resize() {
    let rect = frame.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
  }

  resize();
  window.addEventListener("resize", resize);

  function getPos(e) {
    let rect = canvas.getBoundingClientRect(),
      x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  }

  function start(e) {
    isDrawing = true;
    let pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    if (hint) hint.style.opacity = "0";
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    let pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stop() {
    isDrawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  canvas.addEventListener("touchend", stop);

  clearBtn && clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hint) hint.style.opacity = "1";
  });

  colors.forEach((c) => {
    c.addEventListener("click", () => {
      colors.forEach((el) => (el.style.borderColor = "transparent"));
      c.style.borderColor = "var(--white)";
      color = c.getAttribute("data-color");
      ctx.strokeStyle = color;
    });
  });
}

export { init, render };