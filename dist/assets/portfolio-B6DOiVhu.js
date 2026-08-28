import { t as paintingsList } from "./paintings-CGb28fgX.js";

function render() {
  return `
    <div class="portfolio-page" style="background: var(--bg-main); color: var(--white); scroll-margin-top: 100px;">
      <!-- Hero Section -->
      <section class="page-hero reveal-up" style="padding-top: clamp(130px, 16vh, 170px); padding-bottom: 3rem; text-align: center;">
        <div class="container">
          <p class="subtitle" style="color: var(--accent); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.75rem;">Our Artwork</p>
          <h1 class="title" style="font-size: clamp(2.5rem, 5vw, 4.2rem); font-family: var(--font-heading); color: var(--white); font-weight: 300;">Original Art Portfolio</h1>
          <p class="description" style="color: var(--gray-300); max-width: 600px; margin: 0.75rem auto 0 auto; font-size: 1.1rem; line-height: 1.6;">Explore original Himalayan landscapes, fine art portraits, and contemporary Nepalese paintings.</p>
        </div>
      </section>

      <!-- Filter Controls Bar -->
      <section class="portfolio-filter-section" style="background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 1.75rem 0; sticky: top; top: 80px; z-index: 90;">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="filter-bar" style="display: flex; flex-direction: column; gap: 1.25rem;">
            
            <!-- Top Controls: Search Bar & Dropdown Filters -->
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: space-between; align-items: center;">
              <div class="search-wrap" style="flex: 1; min-width: 260px; max-width: 450px;">
                <input type="text" id="searchInput" class="search-input" placeholder="Search by title, style, or tag..." style="width: 100%; background: var(--bg-main); border: 1px solid rgba(255,255,255,0.12); color: var(--white); border-radius: var(--radius-pill); padding: 0.75rem 1.25rem; font-size: 0.95rem;" />
              </div>

              <div class="filter-dropdowns" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <select id="mediumFilter" class="filter-select" style="background: var(--bg-main); border: 1px solid rgba(255,255,255,0.12); color: var(--white); border-radius: var(--radius-pill); padding: 0.75rem 1.25rem; font-size: 0.9rem; cursor: pointer;">
                  <option value="all">All Mediums</option>
                  <option value="oil">Oil on Canvas</option>
                  <option value="acrylic">Acrylic</option>
                  <option value="watercolor">Watercolor</option>
                  <option value="mixed media">Mixed Media</option>
                </select>

                <select id="sortSelect" class="sort-select" style="background: var(--bg-main); border: 1px solid rgba(255,255,255,0.12); color: var(--white); border-radius: var(--radius-pill); padding: 0.75rem 1.25rem; font-size: 0.9rem; cursor: pointer;">
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Title: A to Z</option>
                </select>
              </div>
            </div>

            <!-- Category Pills -->
            <div class="filter-buttons" id="categoryFilters" style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding-top: 0.5rem;">
              <button class="filter-btn active" data-category="all">All</button>
              <button class="filter-btn" data-category="landscape">Landscape</button>
              <button class="filter-btn" data-category="portrait">Portrait</button>
              <button class="filter-btn" data-category="abstract">Abstract</button>
              <button class="filter-btn" data-category="nature">Nature</button>
              <button class="filter-btn" data-category="people">People</button>
              <button class="filter-btn" data-category="animals">Animals</button>
              <button class="filter-btn" data-category="mountains">Mountains</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Gallery Section -->
      <section class="gallery-section" style="padding: 4rem 0 6rem 0; background: var(--bg-main);">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          <div class="gallery-count" id="galleryCount" style="color: var(--gray-400); font-size: 0.9rem; margin-bottom: 2rem;">
            Showing 0 paintings
          </div>
          
          <div class="portfolio-grid" id="galleryGrid">
            <!-- Dynamically populated paintings cards -->
          </div>

          <div class="load-more-wrap" style="text-align: center; margin-top: 4rem;">
            <button id="loadMoreBtn" class="btn btn-primary" style="padding: 1rem 3rem;">Load More Paintings</button>
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <div class="lightbox" id="lightbox" style="position: fixed; inset: 0; background: rgba(5,5,5,0.95); z-index: 10000; display: none; align-items: center; justify-content: center; padding: 2rem;">
        <button class="lightbox-close" id="lightboxClose" style="position: absolute; top: 1.5rem; right: 2rem; background: none; border: none; color: #fff; font-size: 2.5rem; cursor: pointer; z-index: 10;">&times;</button>
        <div class="lightbox-nav">
          <button class="lightbox-prev" id="lightboxPrev" style="position: absolute; top: 50%; left: 1.5rem; transform: translateY(-50%); background: rgba(255,255,255,0.1); border: none; color: #fff; width: 48px; height: 48px; border-radius: 50%; font-size: 1.8rem; cursor: pointer;">&#8249;</button>
          <button class="lightbox-next" id="lightboxNext" style="position: absolute; top: 50%; right: 1.5rem; transform: translateY(-50%); background: rgba(255,255,255,0.1); border: none; color: #fff; width: 48px; height: 48px; border-radius: 50%; font-size: 1.8rem; cursor: pointer;">&#8250;</button>
        </div>
        <div class="lightbox-content" style="max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; background: var(--bg-card); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
          <img class="lightbox-image" id="lightboxImage" src="" alt="" style="max-width: 100%; max-height: 55vh; object-fit: contain; border-radius: var(--radius-md); margin: 0 auto 1.5rem auto; display: block;" />
          <div class="lightbox-info">
            <h3 id="lightboxTitle" style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 0.5rem;"></h3>
            <p id="lightboxDetails" style="color: var(--accent); font-size: 0.95rem; margin-bottom: 0.75rem;"></p>
            <p id="lightboxDescription" style="color: var(--gray-300); font-size: 0.95rem; line-height: 1.7; max-width: 650px; margin: 0 auto 1.5rem auto;"></p>
            <span class="tag" id="lightboxAvailability" style="margin-bottom: 1.25rem;"></span>
            <div id="lightboxBuyWrap" style="margin-top: 1rem;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function init() {
  let selectedCategory = "all",
    selectedMedium = "all",
    searchQuery = "",
    selectedSort = "newest",
    displayLimit = 12,
    currentIndex = -1,
    filteredItems = [...paintingsList],
    visibleItems = [],
    searchInput = document.getElementById("searchInput"),
    categoryFilters = document.getElementById("categoryFilters"),
    mediumFilter = document.getElementById("mediumFilter"),
    sortSelect = document.getElementById("sortSelect"),
    galleryGrid = document.getElementById("galleryGrid"),
    galleryCount = document.getElementById("galleryCount"),
    loadMoreBtn = document.getElementById("loadMoreBtn"),
    lightbox = document.getElementById("lightbox"),
    lightboxClose = document.getElementById("lightboxClose"),
    lightboxPrev = document.getElementById("lightboxPrev"),
    lightboxNext = document.getElementById("lightboxNext"),
    lightboxImage = document.getElementById("lightboxImage"),
    lightboxTitle = document.getElementById("lightboxTitle"),
    lightboxDetails = document.getElementById("lightboxDetails"),
    lightboxDescription = document.getElementById("lightboxDescription"),
    lightboxAvailability = document.getElementById("lightboxAvailability");

  function createCardHTML(item) {
    return `
      <div class="portfolio-item-card" data-id="${item.id}" style="background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.08); overflow: hidden; display: flex; flex-direction: column; transition: transform var(--transition-normal), box-shadow var(--transition-normal); cursor: pointer;">
        <div style="position: relative; width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #000;">
          <img src="${item.image}" alt="${item.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);" />
          <span style="position: absolute; top: 1rem; right: 1rem; background: ${item.available ? "var(--accent)" : "rgba(220,53,69,0.9)"}; color: ${item.available ? "var(--black)" : "#fff"}; padding: 0.35rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
            ${item.available ? "Available" : "Sold"}
          </span>
        </div>
        <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 0.35rem; font-weight: 400;">${item.title}</h4>
            <p style="color: var(--accent); font-size: 0.85rem; margin-bottom: 0.5rem;">${item.technique || "Original Painting"} ${item.dimensions ? `· ${item.dimensions}` : ""}</p>
            <p style="color: var(--gray-400); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.25rem;">${(item.description || "").slice(0, 95)}...</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
            <span style="color: #fff; font-weight: 700; font-size: 1.1rem;">${item.price ? `$${item.price}` : "Inquire"}</span>
            <button class="btn btn-secondary" style="padding: 0.45rem 1.25rem; font-size: 0.8rem; border-color: var(--accent); color: var(--accent);">View Details</button>
          </div>
        </div>
      </div>
    `;
  }

  function applyFilters() {
    filteredItems = paintingsList.filter((item) => {
      let matchCat = selectedCategory === "all" || (item.category && item.category.toLowerCase() === selectedCategory),
        tech = item.technique ? item.technique.toLowerCase() : "",
        matchMed = selectedMedium === "all" || tech.includes(selectedMedium),
        matchTitle = item.title ? item.title.toLowerCase().includes(searchQuery) : false,
        matchDesc = item.description ? item.description.toLowerCase().includes(searchQuery) : false,
        matchTags = item.tags && Array.isArray(item.tags) ? item.tags.some((t) => t.toLowerCase().includes(searchQuery)) : false;
      return matchCat && matchMed && (searchQuery === "" || matchTitle || matchDesc || matchTags);
    });

    switch (selectedSort) {
      case "newest":
        filteredItems.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "oldest":
        filteredItems.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "price-low":
        filteredItems.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filteredItems.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        filteredItems.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
    }

    displayLimit = 12;
    renderGallery();
  }

  function renderGallery() {
    if (!galleryGrid) return;
    visibleItems = filteredItems.slice(0, displayLimit);
    if (visibleItems.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--gray-400);">
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">No Paintings Found</h3>
          <p>Try resetting filters or searching with a different term.</p>
        </div>
      `;
    } else {
      galleryGrid.innerHTML = visibleItems.map((item) => createCardHTML(item)).join("");
    }

    if (galleryCount) {
      galleryCount.textContent = `Showing ${visibleItems.length} of ${filteredItems.length} paintings`;
    }

    if (loadMoreBtn) {
      loadMoreBtn.style.display = displayLimit >= filteredItems.length ? "none" : "inline-block";
    }

    attachCardClickHandlers();
  }

  function attachCardClickHandlers() {
    document.querySelectorAll(".portfolio-item-card").forEach((card) => {
      card.addEventListener("click", () => {
        let id = card.getAttribute("data-id");
        openLightbox(id);
      });
    });
  }

  function openLightbox(id) {
    currentIndex = visibleItems.findIndex((item) => item.id == id);
    if (currentIndex !== -1 && lightbox) {
      updateLightboxContent();
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  function updateLightboxContent() {
    if (currentIndex < 0 || currentIndex >= visibleItems.length) return;
    let item = visibleItems[currentIndex];
    lightboxImage.src = item.image || "";
    lightboxImage.alt = item.title || "";
    lightboxTitle.textContent = item.title || "";
    lightboxDetails.textContent = `${item.technique || "Original Painting"} · ${item.dimensions || item.size || ""} · ${item.year || ""}`;
    lightboxDescription.textContent = item.description || "";
    lightboxAvailability.textContent = item.available ? "Available for Purchase" : "Sold";
    lightboxAvailability.className = item.available ? "tag available" : "tag sold";
    
    let buyWrap = document.getElementById("lightboxBuyWrap");
    if (buyWrap) {
      buyWrap.innerHTML = item.available
        ? `<a href="#/contact" class="btn btn-primary" style="padding: 0.85rem 2.5rem; background: var(--white); color: var(--black);">Inquire to Purchase ($${item.price || "Price on Request"})</a>`
        : `<span style="color: var(--gray-400); font-size: 0.9rem;">This artwork has been sold into a private collection.</span>`;
    }
  }

  function nextSlide() {
    currentIndex < visibleItems.length - 1 ? currentIndex++ : (currentIndex = 0);
    updateLightboxContent();
  }

  function prevSlide() {
    currentIndex > 0 ? currentIndex-- : (currentIndex = visibleItems.length - 1);
    updateLightboxContent();
  }

  searchInput && searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    applyFilters();
  });

  categoryFilters && categoryFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      selectedCategory = e.target.getAttribute("data-category");
      applyFilters();
    }
  });

  mediumFilter && mediumFilter.addEventListener("change", (e) => {
    selectedMedium = e.target.value;
    applyFilters();
  });

  sortSelect && sortSelect.addEventListener("change", (e) => {
    selectedSort = e.target.value;
    applyFilters();
  });

  loadMoreBtn && loadMoreBtn.addEventListener("click", () => {
    displayLimit += 8;
    renderGallery();
  });

  lightboxClose && lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev && lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); prevSlide(); });
  lightboxNext && lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); });
  lightbox && lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  applyFilters();
}

export { init, render };