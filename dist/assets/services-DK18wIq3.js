import{t as e}from"./services-d98QNpyH.js";function t(){return`
    <div class="services-page" style="background: var(--bg-main); color: var(--white);">
      <section class="page-hero reveal-up">
        <div class="container">
          <p class="subtitle">What We Offer</p>
          <h1 class="title">Our Services</h1>
          <p class="description">Premium event artistry, custom commissions, and interactive art tours in Nepal.</p>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="section" style="padding: 8rem 0 6rem 0;">
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 5%;">
          ${(e||[]).map((e,t)=>{let n=t%2==1;return`
      <div class="service-card-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; margin-bottom: 8rem;" class="service-row-layout">
        <div class="service-image image-reveal" style="${n?`order: 2;`:`order: 1;`}">
          <img src="${e.image}" alt="${e.title}" style="width: 100%; border-radius: var(--radius-lg); display: block; box-shadow: var(--shadow-md); border: 1px solid rgba(255,255,255,0.05);">
        </div>
        <div class="service-content reveal-up" style="${n?`order: 1;`:`order: 2;`} padding: 1rem;">
          <h4 style="color: var(--accent); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; font-size: 0.85rem; font-weight: 600;">${e.tagline||`Premium Service`}</h4>
          <h2 style="font-size: 2.8rem; margin-bottom: 1.5rem; font-family: var(--font-heading); font-weight: 300;">${e.title}</h2>
          <p style="font-size: 1rem; line-height: 1.8; color: var(--gray-200); margin-bottom: 2rem; font-weight: 300;">${e.description}</p>
          <ul style="margin-bottom: 3rem; padding-left: 1rem; list-style-type: square; color: var(--accent); line-height: 2;">
            ${(e.features||[`Consultation included`,`Premium quality materials`,`Custom tailored approach`,`Secure delivery`]).map(e=>`<li><span style="color: var(--gray-100);">${e}</span></li>`).join(``)}
          </ul>
          <div style="display: flex; align-items: center; gap: 2rem;">
            <p style="font-weight: 600; font-size: 1.25rem; color: var(--white);">${e.pricing||`Starting at $199`}</p>
            <a href="#/contact" class="btn btn-primary" style="background: var(--white); color: var(--black);">Book Now</a>
          </div>
        </div>
      </div>
    `}).join(``)}
        </div>
      </section>

      <!-- Custom Paintings -->
      <section class="section" style="padding: 8rem 0; background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03);">
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 5%;">
          <div class="reveal-up" style="text-align: center; margin-bottom: 5rem;">
            <span class="section-subtitle">Bespoke Artistry</span>
            <h2 class="section-title" style="font-family: var(--font-heading); font-size: var(--text-h2); font-weight: 300;">Customized Paintings</h2>
          </div>
          
          <div class="stagger-children service-row-layout" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2rem;">
            <div class="custom-card card" style="text-align: center; cursor: pointer; background: var(--bg-main); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s;">
              <div style="overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem; aspect-ratio: 4/5;">
                <img src="/photos/paintings-of-nepal-1.jpg" alt="Portraits" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              </div>
              <h3 style="font-size: 1.15rem; font-family: var(--font-heading); font-weight: 400; color: var(--white);">Portraits</h3>
            </div>
            <div class="custom-card card" style="text-align: center; cursor: pointer; background: var(--bg-main); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s;">
              <div style="overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem; aspect-ratio: 4/5;">
                <img src="/photos/paintings-of-nepal-2.jpg" alt="Family Paintings" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              </div>
              <h3 style="font-size: 1.15rem; font-family: var(--font-heading); font-weight: 400; color: var(--white);">Family Paintings</h3>
            </div>
            <div class="custom-card card" style="text-align: center; cursor: pointer; background: var(--bg-main); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s;">
              <div style="overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem; aspect-ratio: 4/5;">
                <img src="/photos/paintings-of-nepal-3.jpg" alt="Landscape Commissions" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              </div>
              <h3 style="font-size: 1.15rem; font-family: var(--font-heading); font-weight: 400; color: var(--white);">Landscape Commissions</h3>
            </div>
            <div class="custom-card card" style="text-align: center; cursor: pointer; background: var(--bg-main); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s;">
              <div style="overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem; aspect-ratio: 4/5;">
                <img src="/photos/paintings-of-nepal-4.jpg" alt="Pet Paintings" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              </div>
              <h3 style="font-size: 1.15rem; font-family: var(--font-heading); font-weight: 400; color: var(--white);">Pet Paintings</h3>
            </div>
            <div class="custom-card card" style="text-align: center; cursor: pointer; background: var(--bg-main); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s;">
              <div style="overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem; aspect-ratio: 4/5;">
                <img src="/photos/paintings-of-nepal-5.jpg" alt="Corporate Gifts" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              </div>
              <h3 style="font-size: 1.15rem; font-family: var(--font-heading); font-weight: 400; color: var(--white);">Corporate Gifts</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="section" style="padding: 8rem 0; background: var(--bg-main);">
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 5%;">
          <h2 class="reveal-up" style="text-align: center; font-size: 3rem; margin-bottom: 6rem; font-family: var(--font-heading); font-weight: 300;">How It Works</h2>
          <div class="process-grid stagger-children service-row-layout" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; text-align: center;">
            <div class="process-step">
              <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent); color: var(--black); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 2rem; box-shadow: 0 10px 20px var(--accent-glow);">1</div>
              <h4 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: var(--font-heading); font-weight: 400;">Consultation</h4>
              <p style="color: var(--gray-200); line-height: 1.6; font-size: 0.95rem;">We discuss your unique vision, sizing preferences, and overall aesthetic direction.</p>
            </div>
            <div class="process-step">
              <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent); color: var(--black); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 2rem; box-shadow: 0 10px 20px var(--accent-glow);">2</div>
              <h4 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: var(--font-heading); font-weight: 400;">Concept Sketch</h4>
              <p style="color: var(--gray-200); line-height: 1.6; font-size: 0.95rem;">Our lead artist creates structural sketches for your feedback and approval.</p>
            </div>
            <div class="process-step">
              <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent); color: var(--black); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 2rem; box-shadow: 0 10px 20px var(--accent-glow);">3</div>
              <h4 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: var(--font-heading); font-weight: 400;">Creation</h4>
              <p style="color: var(--gray-200); line-height: 1.6; font-size: 0.95rem;">The piece is meticulously executed using fine linens and archival pigments.</p>
            </div>
            <div class="process-step">
              <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent); color: var(--black); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 2rem; box-shadow: 0 10px 20px var(--accent-glow);">4</div>
              <h4 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: var(--font-heading); font-weight: 400;">Secure Delivery</h4>
              <p style="color: var(--gray-200); line-height: 1.6; font-size: 0.95rem;">Carefully crated and shipped globally with full tracking and insurance.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section" style="background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.03); text-align: center; padding: 8rem 0;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 0 5%;">
          <h2 style="font-size: 3rem; margin-bottom: 2.5rem; font-family: var(--font-heading); font-weight: 300;">Have a Vision? Let's Paint It Together.</h2>
          <a href="#/contact" class="btn btn-secondary" style="border: 1px solid var(--accent); color: var(--accent); padding: 1.25rem 3.5rem;">Request Quote</a>
        </div>
      </section>
    </div>
    
    <style>
      @media (max-width: 1024px) {
        .service-row-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
        .service-card-row { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        .service-image { order: unset !important; }
        .service-content { order: unset !important; }
        .process-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `}function n(){console.log(`Services page initialized`)}export{n as init,t as render};