import { n as fetchInstagramFeed, t as getInstagramFeed } from "./instagram-B34Hmjju.js";

function render() {
  return `
    <div class="about-page" style="background: var(--bg-main); color: var(--white); scroll-margin-top: 100px;">
      <!-- Hero Header -->
      <section class="page-hero reveal-up" style="padding-top: clamp(130px, 16vh, 170px); padding-bottom: 4rem; text-align: center;">
        <div class="container">
          <p class="subtitle" style="color: var(--accent); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">Our Biography</p>
          <h1 class="title" style="font-size: clamp(2.5rem, 5vw, 4.2rem); font-family: var(--font-heading); color: var(--white); font-weight: 300;">About Caterpillar Art Gallery</h1>
          <p class="description" style="color: var(--gray-300); max-width: 650px; margin: 1rem auto 0 auto; font-size: 1.1rem; line-height: 1.7;">Combining travel, adventure, and fine art in Lakeside, Pokhara, Nepal.</p>
        </div>
      </section>

      <!-- 1. Company Story -->
      <section class="section about-story" style="padding: 5rem 0; background: var(--bg-main);">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="story-split-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
            <div class="story-text reveal-left">
              <span class="section-subtitle">Our Journey</span>
              <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 1.5rem; font-family: var(--font-heading); font-weight: 300;">Travel, Adventure, and Fine Art</h2>
              <p style="margin-bottom: 1.25rem; line-height: 1.8; color: var(--gray-200);">Caterpillar Art Gallery is a premium, experience-driven art destination based in the beautiful lake city of <strong>Lakeside, Pokhara, Nepal</strong>. Our collective was founded on a shared passion for travel, outdoor adventure, and fine art creation.</p>
              <p style="margin-bottom: 1.25rem; line-height: 1.8; color: var(--gray-200);">We believe that the majestic landscapes of Nepal are meant to be experienced, not just observed. By organizing <strong>Trekking & Painting Experiences</strong>, we take artists and adventurers deep into the mountain trails of the Annapurna and beyond, helping them paint their own Himalayan memoirs under open skies.</p>
              <p style="line-height: 1.8; color: var(--gray-200); margin-bottom: 0;">Led by master artist <strong>Suman Wagle</strong>, our work is deeply inspired by Nepal's dramatic snow peaks, alpine lakes, ancient local cultures, and warm, welcoming people.</p>
            </div>
            <div class="story-image image-reveal">
              <img src="/photos/paintings-of-nepal-15.jpg" alt="Lakeside Pokhara Studio" style="width: 100%; border-radius: var(--radius-lg); display: block; border: 1px solid rgba(255,255,255,0.08); aspect-ratio: 4/3; object-fit: cover;" />
            </div>
          </div>
        </div>
      </section>

      <!-- 2. MEET THE ARTIST: SUMAN WAGLE (Video on Left on Desktop, Above on Mobile) -->
      <section class="section" style="background: var(--bg-card); padding: 6rem 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="artist-split-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
            
            <!-- LEFT COLUMN: Featured Video First, followed by Artist Portrait -->
            <div class="artist-media-col reveal-scale" style="display: flex; flex-direction: column; gap: 2rem;">
              <!-- Instagram Video Player Container -->
              <div class="artist-video-container" style="background: var(--bg-main); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: var(--shadow-md);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                  <span style="color: var(--accent); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    Featured Instagram Reel
                  </span>
                  <a href="https://www.instagram.com/p/DQv86Q9khS6/" target="_blank" rel="noopener" style="color: var(--gray-300); font-size: 0.85rem; text-decoration: underline;">Watch on Instagram &rarr;</a>
                </div>
                <div style="position: relative; width: 100%; aspect-ratio: 9/16; max-height: 520px; margin: 0 auto; border-radius: var(--radius-md); overflow: hidden; background: #000;">
                  <iframe src="https://www.instagram.com/p/DQv86Q9khS6/embed" style="width: 100%; height: 100%; border: 0; display: block;" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
              </div>

              <!-- Suman Wagle Portrait Photo -->
              <div class="image-reveal" style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
                <img id="aboutArtistImg" src="/photos/paintings-of-nepal-16.jpg" alt="Artist Suman Wagle" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; filter: contrast(1.05);" />
              </div>
            </div>

            <!-- RIGHT COLUMN: Biographical Details & Text -->
            <div class="artist-text-col reveal-up">
              <span class="section-subtitle">Meet the Artist</span>
              <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); margin-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 300; color: var(--white);">Suman Wagle</h2>
              <p style="color: var(--accent); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; margin-bottom: 2rem;">Lead Artist & Founder</p>
              
              <p style="line-height: 1.8; color: var(--gray-200); margin-bottom: 2rem; font-size: 1.05rem;">
                Suman Wagle is a Pokhara-based Nepali artist whose work is inspired by Nepal's landscapes, culture, travel, and everyday life. Through original paintings, live wedding painting, and trekking art experiences, he transforms meaningful moments and breathtaking scenery into timeless works of art.
              </p>
              
              <h4 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 400; color: var(--white); margin-bottom: 0.75rem;">Artistic Philosophy</h4>
              <p style="line-height: 1.8; color: var(--gray-200); margin-bottom: 2rem; font-size: 1rem; font-style: italic; border-left: 2px solid var(--accent); padding-left: 1rem;">
                "Art is an adventurous journey of discovery. To paint the mountain, you must feel its cold air, walk its steep ridges, and respect its silent scale. My goal is to capture not just the physical topology of Nepal, but the spiritual emotion and peace that these peaks project."
              </p>
              
              <h4 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 400; color: var(--white); margin-bottom: 0.75rem;">Signature Style</h4>
              <p style="line-height: 1.8; color: var(--gray-200); margin-bottom: 2.5rem; font-size: 1rem;">
                Suman's paintings are instantly recognizable by his bold, expressive palette-knife strokes and thick impasto textures. He works primarily in oils and heavy-body acrylics, building layered relief textures on canvas that mirror the rugged snow cracks and sharp granite walls of the mountain peaks.
              </p>
              
              <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
                <a href="https://www.instagram.com/kalo_biralo/" id="aboutArtistIgBtn" target="_blank" rel="noopener" class="btn btn-primary" style="background: var(--white); color: var(--black);">@kalo_biralo on Instagram</a>
                <a href="#/portfolio" class="btn btn-secondary" style="border-color: var(--accent); color: var(--accent);">View Gallery</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Mission & Vision -->
      <section class="section" style="background: var(--bg-main); padding: 6rem 0;">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="stagger-children mission-vision-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;">
            <div class="card" style="padding: 3rem 2.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-top: 4px solid var(--accent); border-radius: var(--radius-lg);">
              <h3 style="font-size: 1.8rem; margin-bottom: 1.25rem; font-family: var(--font-heading); font-weight: 400;">Our Mission</h3>
              <p style="line-height: 1.8; color: var(--gray-200); margin-bottom: 0;">To deliver premium, experience-driven art programs that blend travel and outdoor adventure with fine art instruction, enabling travelers to carry home authentic handmade memories of Nepal.</p>
            </div>
            <div class="card" style="padding: 3rem 2.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-top: 4px solid var(--accent); border-radius: var(--radius-lg);">
              <h3 style="font-size: 1.8rem; margin-bottom: 1.25rem; font-family: var(--font-heading); font-weight: 400;">Our Vision</h3>
              <p style="line-height: 1.8; color: var(--gray-200); margin-bottom: 0;">To establish Lakeside, Pokhara as Nepal's ultimate destination for experiential art, serving as a global benchmark for live painting, trekking retreats, and contemporary Nepalese landscape representation.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Achievements/Stats -->
      <section class="section" style="background: var(--bg-card); padding: 5rem 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="stats-grid stagger-children">
            <div class="stat-item">
              <span class="stat-number counter-number" data-count="500">0</span>
              <span class="stat-label">Paintings Created</span>
            </div>
            <div class="stat-item">
              <span class="stat-number counter-number" data-count="200">0</span>
              <span class="stat-label">Happy Students</span>
            </div>
            <div class="stat-item">
              <span class="stat-number counter-number" data-count="50">0</span>
              <span class="stat-label">Successful Events</span>
            </div>
            <div class="stat-item">
              <span class="stat-number counter-number" data-count="15">0</span>
              <span class="stat-label">Awards Received</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Inside Suman's Lakeside Studio (Fixed & Properly Aligned) -->
      <section class="section studio-section" style="padding: 6rem 0; background: var(--bg-main);">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="section-header reveal-up" style="text-align: center; margin-bottom: 3.5rem;">
            <span class="section-subtitle">Creative Workspace</span>
            <h2 class="section-title" style="font-size: clamp(2rem, 4vw, 3rem); font-family: var(--font-heading); font-weight: 300;">Inside Suman's Lakeside Studio</h2>
            <p class="section-description" style="color: var(--gray-400); max-width: 600px; margin: 0.5rem auto 0 auto;">Explore the creative studio environment in Pokhara where oil palettes, canvases, and Himalayan memories come to life.</p>
          </div>
          
          <div class="studio-gallery-grid stagger-children">
            <div class="studio-card"><img src="/photos/paintings-of-nepal-1.jpg" alt="Studio View 1" loading="lazy" /></div>
            <div class="studio-card"><img src="/photos/paintings-of-nepal-2.jpg" alt="Studio View 2" loading="lazy" /></div>
            <div class="studio-card"><img src="/photos/paintings-of-nepal-3.jpg" alt="Studio View 3" loading="lazy" /></div>
            <div class="studio-card"><img src="/photos/paintings-of-nepal-4.jpg" alt="Studio View 4" loading="lazy" /></div>
            <div class="studio-card"><img src="/photos/paintings-of-nepal-5.jpg" alt="Studio View 5" loading="lazy" /></div>
            <div class="studio-card"><img src="/photos/paintings-of-nepal-6.jpg" alt="Studio View 6" loading="lazy" /></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

async function init() {
  document.querySelectorAll(`.counter-number`).forEach((element) => {
    let target = +element.getAttribute(`data-count`),
      count = 0,
      update = () => {
        let step = target / 40;
        count < target ? ((count += step), (element.innerText = Math.ceil(count) + `+`), setTimeout(update, 40)) : (element.innerText = target + `+`);
      },
      observer = new IntersectionObserver((entries) => {
        entries[0].isIntersecting && (update(), observer.disconnect());
      }, { threshold: 0.5 });
    observer.observe(element);
  });

  try {
    let data = await getInstagramFeed(),
      img = document.getElementById(`aboutArtistImg`);
    img && data.profile_picture_url && (img.src = data.profile_picture_url);
    let btn = document.getElementById(`aboutArtistIgBtn`);
    btn && data.username && ((btn.href = `https://www.instagram.com/${data.username}/`), (btn.textContent = `@${data.username} on Instagram`));
  } catch (err) {
    console.error(`Failed to sync artist profile on about page:`, err);
  }
}

export { init, render };