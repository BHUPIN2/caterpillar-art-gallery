function extractSlug(params) {
  if (!params) return null;
  let str = typeof params === "string" ? params : params.slug || params.path || "";
  let parts = str.split("/").filter((p) => p && p !== "#" && p !== "#blog" && p !== "blog");
  if (parts.length > 0) {
    let last = parts[parts.length - 1];
    if (last && last !== "blog" && last !== "#blog") {
      return last.replace(/^#/, "");
    }
  }
  return null;
}

function render(params) {
  let slug = extractSlug(params);
  if (slug) {
    return renderSinglePost();
  } else {
    return renderBlogList();
  }
}

function renderBlogList() {
  return `
    <div class="blog-page" style="background: var(--bg-main); color: var(--white); scroll-margin-top: 100px;">
      <!-- Hero Header -->
      <section class="page-hero reveal-up" style="padding-top: clamp(120px, 14vh, 160px); padding-bottom: 3rem; text-align: center;">
        <div class="container" style="padding: 0 1.25rem;">
          <p class="subtitle" style="color: var(--accent); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">Stories & Insights</p>
          <h1 class="title" style="font-size: clamp(2.2rem, 6vw, 4.2rem); font-family: var(--font-heading); color: var(--white); font-weight: 300;">Caterpillar Art Journal</h1>
          <p class="description" style="color: var(--gray-300); max-width: 650px; margin: 0.75rem auto 0 auto; font-size: 1.05rem; line-height: 1.6;">Articles on live wedding painting, Himalayan plein-air trekking, studio techniques, and art collecting in Nepal.</p>
        </div>
      </section>

      <!-- Category Filter Bar -->
      <section style="background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 1.25rem 0;">
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1.25rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;" id="blogCategoryPills">
            <button class="filter-btn active" data-cat="all" style="padding: 0.5rem 1rem; font-size: 0.82rem;">All Stories</button>
            <button class="filter-btn" data-cat="Live Wedding Paintings" style="padding: 0.5rem 1rem; font-size: 0.82rem;">Live Wedding Painting</button>
            <button class="filter-btn" data-cat="Landscape Paintings" style="padding: 0.5rem 1rem; font-size: 0.82rem;">Landscape Paintings</button>
            <button class="filter-btn" data-cat="Tutorials" style="padding: 0.5rem 1rem; font-size: 0.82rem;">Tutorials</button>
            <button class="filter-btn" data-cat="Exhibitions" style="padding: 0.5rem 1rem; font-size: 0.82rem;">Exhibitions</button>
          </div>
        </div>
      </section>

      <!-- Main Blog Grid -->
      <section class="section" style="padding: 3rem 0 5rem 0; background: var(--bg-main);">
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1.25rem;">
          <div class="portfolio-grid" id="publicBlogGrid">
            <!-- Cards Dynamically Populated -->
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderSinglePost() {
  return `
    <div class="blog-post-page" id="singlePostContainer" style="background: var(--bg-main); color: var(--white); scroll-margin-top: 100px; padding-top: clamp(110px, 13vh, 150px); padding-bottom: 5rem;">
      <div class="container" style="max-width: 820px; margin: 0 auto; padding: 0 1.25rem;">
        <div id="singlePostContent">
          <div style="text-align: center; padding: 4rem; color: var(--gray-400);">Loading story...</div>
        </div>
      </div>
    </div>
  `;
}

async function init(params) {
  let slug = extractSlug(params);
  if (slug) {
    await initSinglePost(slug);
  } else {
    await initBlogList();
  }
}

async function initBlogList() {
  let blogs = [];
  try {
    let res = await fetch("/api/blogs");
    let data = await res.json();
    if (data.success) {
      blogs = data.blogs || [];
    }
  } catch (err) {
    console.error("Failed to load public blogs:", err);
  }

  function renderGrid(filter) {
    let grid = document.getElementById("publicBlogGrid");
    if (!grid) return;

    let items = blogs.filter((b) => filter === "all" || b.category === filter);

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--gray-400);">No articles published in this category yet.</div>`;
      return;
    }

    grid.innerHTML = items.map((b) => `
      <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column;">
        <div style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000;">
          <img src="${b.image}" alt="${b.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
          <span style="position: absolute; top: 0.85rem; left: 0.85rem; background: rgba(5,5,5,0.85); color: var(--accent); padding: 0.3rem 0.75rem; border-radius: var(--radius-pill); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; backdrop-filter: blur(4px);">
            ${b.category || "Art"}
          </span>
        </div>
        <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
          <div>
            <div style="color: var(--gray-400); font-size: 0.8rem; margin-bottom: 0.4rem;">${b.publishDate || ""} &bull; ${b.readingTime || "4 min read"}</div>
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin-bottom: 0.65rem; font-weight: 400; line-height: 1.3;">
              <a href="#/blog/${b.slug}" style="color: #fff;">${b.title}</a>
            </h3>
            <p style="color: var(--gray-300); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.25rem;">${b.summary || ""}</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--gray-400); font-size: 0.82rem;">By ${b.author || "Suman Wagle"}</span>
            <a href="#/blog/${b.slug}" style="color: var(--accent); font-size: 0.88rem; font-weight: 600;">Read Story &rarr;</a>
          </div>
        </div>
      </div>
    `).join("");
  }

  document.querySelectorAll("#blogCategoryPills .filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#blogCategoryPills .filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      let cat = btn.getAttribute("data-cat");
      renderGrid(cat);
    });
  });

  renderGrid("all");
}

async function initSinglePost(slug) {
  let container = document.getElementById("singlePostContent");
  if (!container) return;

  try {
    let res = await fetch(`/api/blogs/${slug}`);
    let data = await res.json();

    if (!data.success || !data.blog) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
          <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: #fff; margin-bottom: 1rem;">Article Not Found</h2>
          <p style="color: var(--gray-400); margin-bottom: 2rem;">The story you are looking for may have been moved or updated.</p>
          <a href="#/blog" class="btn btn-primary">&larr; Back to Caterpillar Journal</a>
        </div>
      `;
      return;
    }

    let b = data.blog;

    // Fetch all published blogs for Prev / Next / Related
    let allBlogs = [];
    try {
      let r = await fetch("/api/blogs");
      let d = await r.json();
      if (d.success) allBlogs = d.blogs || [];
    } catch (e) {}

    let currIdx = allBlogs.findIndex((x) => x.slug === b.slug);
    let prevBlog = currIdx > 0 ? allBlogs[currIdx - 1] : null;
    let nextBlog = currIdx >= 0 && currIdx < allBlogs.length - 1 ? allBlogs[currIdx + 1] : null;
    let related = allBlogs.filter((x) => x.slug !== b.slug).slice(0, 2);

    // Schema.org Article Structured Data Injection
    let schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: b.title,
      image: [b.image],
      datePublished: b.publishDate,
      author: { "@type": "Person", name: b.author },
      publisher: { "@type": "Organization", name: "Caterpillar Art Gallery" },
      description: b.metaDescription || b.summary
    });
    document.head.appendChild(schemaScript);

    container.innerHTML = `
      <article class="blog-article-full">
        <!-- Sticky Navigation Breadcrumb -->
        <div style="margin-bottom: 2rem;">
          <a href="#/blog" style="color: var(--accent); font-size: 0.88rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
            &larr; Back to Caterpillar Art Journal
          </a>
        </div>

        <!-- Article Header -->
        <div style="margin-bottom: 2.5rem;">
          <span style="background: rgba(154,176,126,0.15); color: var(--accent); border: 1px solid var(--accent); padding: 0.35rem 0.9rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">
            ${b.category || "Art"}
          </span>
          
          <h1 style="font-family: var(--font-heading); font-size: clamp(2rem, 5.5vw, 3.6rem); margin: 1.25rem 0 1.25rem 0; font-weight: 300; line-height: 1.2; color: #fff;">
            ${b.title}
          </h1>

          <div style="color: var(--gray-400); font-size: 0.88rem; display: flex; gap: 0.85rem; align-items: center; flex-wrap: wrap; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.25rem;">
            <span>By <strong style="color: #fff;">${b.author || "Suman Wagle"}</strong></span>
            <span>&bull;</span>
            <span>Published ${b.publishDate || ""}</span>
            <span>&bull;</span>
            <span style="color: var(--accent); font-weight: 600;">⏱️ ${b.readingTime || "5 min read"}</span>
          </div>
        </div>

        <!-- Featured Cover Image -->
        <div style="margin-bottom: 3rem; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: var(--shadow-lg);">
          <img src="${b.image}" alt="${b.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block;" />
        </div>

        <!-- Short Summary Teaser Callout -->
        ${b.summary ? `
          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid var(--accent); padding: 1.25rem 1.5rem; margin-bottom: 2.5rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; font-style: italic; color: var(--gray-200); font-size: 1.1rem; line-height: 1.6;">
            "${b.summary}"
          </div>
        ` : ""}

        <!-- Article Content Body -->
        <div class="article-body-text" style="font-size: 1.12rem; line-height: 1.85; color: var(--gray-200); margin-bottom: 3.5rem;">
          ${b.content}
        </div>

        <!-- Social Share Bar -->
        <div style="border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.25rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 3.5rem;">
          <span style="color: #fff; font-weight: 600; font-size: 0.9rem;">Share this article:</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;">Facebook</a>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(b.title + " " + window.location.href)}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;">WhatsApp</a>
            <button id="copyBlogLinkBtn" class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;">📋 Copy Link</button>
          </div>
        </div>

        <!-- Previous / Next Article Navigation -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 4rem;">
          ${prevBlog ? `
            <a href="#/blog/${prevBlog.slug}" class="card" style="padding: 1.25rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); text-decoration: none;">
              <span style="color: var(--accent); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.4rem;">&larr; Previous Story</span>
              <h4 style="color: #fff; font-family: var(--font-heading); font-size: 1.15rem; font-weight: 400; margin: 0; line-height: 1.3;">${prevBlog.title}</h4>
            </a>
          ` : `<div></div>`}

          ${nextBlog ? `
            <a href="#/blog/${nextBlog.slug}" class="card" style="padding: 1.25rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); text-decoration: none; text-align: right;">
              <span style="color: var(--accent); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.4rem;">Next Story &rarr;</span>
              <h4 style="color: #fff; font-family: var(--font-heading); font-size: 1.15rem; font-weight: 400; margin: 0; line-height: 1.3;">${nextBlog.title}</h4>
            </a>
          ` : `<div></div>`}
        </div>

        <!-- Related Stories Section -->
        ${related.length > 0 ? `
          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 3rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 1.5rem; font-weight: 300;">Related Articles</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
              ${related.map((r) => `
                <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); overflow: hidden;">
                  <img src="${r.image}" alt="" style="width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block;" />
                  <div style="padding: 1.25rem;">
                    <span style="color: var(--accent); font-size: 0.72rem; text-transform: uppercase;">${r.category}</span>
                    <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #fff; margin: 0.4rem 0 0.75rem 0; font-weight: 400; line-height: 1.3;">
                      <a href="#/blog/${r.slug}" style="color: #fff;">${r.title}</a>
                    </h4>
                    <a href="#/blog/${r.slug}" style="color: var(--accent); font-size: 0.82rem; font-weight: 600;">Read Story &rarr;</a>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

      </article>
    `;

    document.getElementById("copyBlogLinkBtn")?.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! 📋");
    });
  } catch (err) {
    container.innerHTML = `<p style="color: red; text-align: center;">Failed to load article.</p>`;
  }
}

export { init, render };
