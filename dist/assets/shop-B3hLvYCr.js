import{i as e,n as t,r as n,t as r}from"./index-zNGUWzcJ.js";import{t as i}from"./shop-C0ckIy7b.js";function a(){return`
    <style>
      .shop-page-wrapper {
        padding: 4rem 5%;
        display: flex;
        gap: 3rem;
        max-width: 1400px;
        margin: 0 auto;
      }
      .shop-sidebar {
        width: 250px;
        flex-shrink: 0;
      }
      .shop-sidebar-section {
        margin-bottom: 2rem;
      }
      .shop-sidebar-title {
        font-family: var(--font-heading, "Cormorant Garamond", serif);
        font-size: 1.2rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--gray-200, #eee);
        padding-bottom: 0.5rem;
      }
      .shop-filter-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .shop-filter-list li {
        margin-bottom: 0.5rem;
        cursor: pointer;
        color: var(--gray-600, #666);
        transition: color 0.3s;
        display: flex;
        justify-content: space-between;
        font-size: 0.95rem;
      }
      .shop-filter-list li:hover, .shop-filter-list li.active {
        color: var(--olive, #556B2F);
        font-weight: 600;
      }
      .shop-main {
        flex-grow: 1;
        min-width: 0;
      }
      .shop-topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .search-input {
        padding: 0.75rem 1rem;
        border: 1px solid var(--gray-300, #ccc);
        border-radius: 4px;
        width: 300px;
        max-width: 100%;
        font-family: inherit;
      }
      .search-input:focus {
        outline: none;
        border-color: var(--olive, #556B2F);
      }
      .sort-select {
        padding: 0.75rem 1rem;
        border: 1px solid var(--gray-300, #ccc);
        border-radius: 4px;
        font-family: inherit;
        background: #fff;
        cursor: pointer;
      }
      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
      }
      
      /* Product Card CSS requested */
      .product-card {
        position: relative;
        background: #fff;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border-radius: 8px;
        overflow: hidden;
      }
      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      }
      .product-card-img {
        position: relative;
        overflow: hidden;
        aspect-ratio: 3/4;
        background: #f8f9fa;
      }
      .product-card-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      .product-card:hover .product-card-img img {
        transform: scale(1.05);
      }
      .product-card-actions {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        display: flex;
        gap: 0.5rem;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10;
      }
      .product-card:hover .product-card-actions {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .product-sale-badge, .product-new-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        padding: 0.25rem 0.75rem;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        z-index: 2;
        border-radius: 4px;
      }
      .product-sale-badge { background: #dc3545; color: white; }
      .product-new-badge { background: var(--olive, #556B2F); color: white; }
      .wishlist-btn, .quick-view-btn {
        background: #fff;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: background 0.3s, color 0.3s;
        color: #111;
      }
      .quick-view-btn {
        width: auto;
        border-radius: 20px;
        padding: 0 1rem;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
      }
      .wishlist-btn:hover, .quick-view-btn:hover {
        background: var(--olive, #556B2F);
        color: #fff;
      }
      .wishlist-btn.active {
        color: var(--olive, #556B2F);
      }
      .wishlist-btn.active svg {
        fill: currentColor;
      }
      .wishlist-btn svg {
        width: 20px;
        height: 20px;
        fill: transparent;
        stroke: currentColor;
        stroke-width: 2;
      }
      .product-card-info {
        padding: 1.5rem;
        text-align: center;
      }
      .product-category { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--olive, #556B2F); margin-bottom: 0.5rem; }
      .product-title { font-family: var(--font-heading, "Cormorant Garamond", serif); font-size: 1.1rem; margin-bottom: 0.25rem; color: #111; }
      .product-medium { font-size: 0.8rem; color: var(--gray-500, #888); margin-bottom: 0.75rem; }
      .product-pricing { margin-bottom: 1rem; }
      .original-price { text-decoration: line-through; color: var(--gray-400, #aaa); margin-right: 0.5rem; }
      .product-price { font-size: 1.2rem; font-weight: 600; color: var(--olive, #556B2F); }
      .btn-small { padding: 0.6rem 1.5rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; border: none; background: #111; color: #fff; cursor: pointer; transition: background 0.3s; }
      .btn-small:hover:not(:disabled) { background: var(--olive, #556B2F); }
      .btn-small:disabled { background: #ccc; cursor: not-allowed; }
      .btn-primary { padding: 0.8rem 2rem; background: #111; color: #fff; border: none; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em; transition: background 0.3s; }
      .btn-primary:hover { background: var(--olive, #556B2F); }

      /* Quick View Modal */
      .quick-view-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(17, 17, 17, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        padding: 2rem;
      }
      .quick-view-overlay.active {
        opacity: 1;
        pointer-events: all;
      }
      .quick-view {
        background: #fff;
        width: 100%;
        max-width: 900px;
        display: flex;
        gap: 2rem;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      .quick-view-overlay.active .quick-view {
        transform: translateY(0);
      }
      .qv-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255,255,255,0.8);
        border: none;
        font-size: 1.5rem;
        width: 40px; height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        color: #111;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
      }
      .qv-close:hover { background: #eee; }
      .qv-image {
        width: 50%;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .qv-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .qv-details {
        width: 50%;
        padding: 3rem 2rem 3rem 0;
        overflow-y: auto;
      }
      .qv-details h2 { font-family: var(--font-heading, "Cormorant Garamond", serif); font-size: 2rem; margin-bottom: 0.5rem; color: #111; }
      .qv-details .product-price { font-size: 1.5rem; margin-bottom: 1.5rem; display: block; }
      .qv-meta { margin-bottom: 1.5rem; font-size: 0.9rem; color: #666; }
      .qv-desc { margin-bottom: 2rem; line-height: 1.6; color: #444; }
      .qv-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
      
      @media (max-width: 768px) {
        .shop-page-wrapper { flex-direction: column; padding: 2rem 5%; }
        .shop-sidebar { width: 100%; }
        .quick-view { flex-direction: column; overflow-y: auto; }
        .qv-image, .qv-details { width: 100%; }
        .qv-details { padding: 2rem; }
        .qv-image { aspect-ratio: 1; height: auto; }
      }
    </style>

    <div class="page-hero reveal-up" style="padding: 6rem 0; text-align: center; background: #111; color: #fff;">
      <p class="subtitle" style="font-family: var(--font-heading, 'Cormorant Garamond', serif); color: var(--olive, #556B2F); font-size: 1.2rem; font-style: italic; margin-bottom: 0.5rem;">Original Artwork</p>
      <h1 class="title" style="font-family: var(--font-heading, 'Cormorant Garamond', serif); font-size: 4rem; margin-bottom: 1rem; font-weight: normal;">Shop</h1>
      <p style="color: #ccc; max-width: 600px; margin: 0 auto;">Own a piece of original Himalayan art</p>
    </div>

    <div class="shop-page-wrapper">
      <aside class="shop-sidebar reveal-up stagger-children">
        <!-- Categories -->
        <div class="shop-sidebar-section">
          <h3 class="shop-sidebar-title">Categories</h3>
          <ul class="shop-filter-list" id="filter-categories">
            <li class="active" data-value="All">All <span class="count"></span></li>
            <li data-value="Landscape">Landscape <span class="count"></span></li>
            <li data-value="Portrait">Portrait <span class="count"></span></li>
            <li data-value="Abstract">Abstract <span class="count"></span></li>
            <li data-value="Nature">Nature <span class="count"></span></li>
            <li data-value="Mountains">Mountains <span class="count"></span></li>
          </ul>
        </div>
        
        <!-- Price Range -->
        <div class="shop-sidebar-section">
          <h3 class="shop-sidebar-title">Price Range</h3>
          <ul class="shop-filter-list" id="filter-price">
            <li class="active" data-value="All">All</li>
            <li data-value="Under $200">Under $200</li>
            <li data-value="200-500">$200-$500</li>
            <li data-value="500-1000">$500-$1000</li>
            <li data-value="1000-2000">$1000-$2000</li>
            <li data-value="Over $2000">Over $2000</li>
          </ul>
        </div>
        
        <!-- Availability -->
        <div class="shop-sidebar-section">
          <h3 class="shop-sidebar-title">Availability</h3>
          <ul class="shop-filter-list" id="filter-availability">
            <li class="active" data-value="All">All</li>
            <li data-value="In Stock">In Stock</li>
            <li data-value="Sold Out">Sold Out</li>
          </ul>
        </div>

        <!-- On Sale Toggle -->
        <div class="shop-sidebar-section">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--gray-600, #666); font-size: 0.95rem;">
            <input type="checkbox" id="filter-sale" style="width: 16px; height: 16px; accent-color: var(--olive, #556B2F);">
            <span>On Sale</span>
          </label>
        </div>
      </aside>

      <main class="shop-main reveal-up stagger-children">
        <div class="shop-topbar">
          <div class="search-container">
            <input type="text" class="search-input" id="shop-search" placeholder="Search artwork..." />
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span id="shop-results-count" style="color: #666; font-size: 0.9rem;">Showing 0 products</span>
            <select class="sort-select" id="shop-sort">
              <option value="Featured">Featured</option>
              <option value="Newest">Newest</option>
              <option value="Price Low-High">Price: Low-High</option>
              <option value="Price High-Low">Price: High-Low</option>
              <option value="Name A-Z">Name: A-Z</option>
            </select>
          </div>
        </div>
        
        <div class="product-grid" id="product-grid">
          <!-- Products injected here -->
        </div>
        
        <div style="text-align: center; margin-top: 3rem;">
          <button class="btn-primary" id="load-more-btn" style="display: none; width: auto; min-width: 200px;">Load More</button>
        </div>
      </main>
    </div>

    <!-- Quick View Modal -->
    <div class="quick-view-overlay" id="quick-view-modal">
      <div class="quick-view">
        <button class="qv-close" id="qv-close">&times;</button>
        <div class="qv-image">
          <img src="" alt="" id="qv-img" loading="lazy" />
        </div>
        <div class="qv-details">
          <h2 id="qv-title"></h2>
          <p class="qv-meta" id="qv-meta"></p>
          <div class="product-pricing">
            <span class="original-price" id="qv-orig-price" style="display:none;"></span>
            <span class="product-price" id="qv-price"></span>
          </div>
          <p class="qv-desc" id="qv-desc"></p>
          <div class="qv-actions">
            <button class="btn-primary add-to-cart" id="qv-add-cart" data-id="">Add to Cart</button>
            <button class="btn-primary buy-painting" id="qv-buy-painting" data-id="" data-title="" data-price="" data-size="" data-img="" style="background: var(--olive, #556B2F); color: #fff;">Buy This Painting</button>
            <button class="wishlist-btn" id="qv-wishlist" data-wishlist="" style="width: auto; padding: 0.8rem 1.5rem; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; text-transform: uppercase;">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span>Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function o(){let a={category:`All`,price:`All`,availability:`All`,onSale:!1,search:``,sort:`Featured`,visibleCount:12,filteredData:[],products:Array.isArray(i)?i:[]},o={catFilters:document.querySelectorAll(`#filter-categories li`),priceFilters:document.querySelectorAll(`#filter-price li`),availFilters:document.querySelectorAll(`#filter-availability li`),saleToggle:document.getElementById(`filter-sale`),searchInput:document.getElementById(`shop-search`),sortSelect:document.getElementById(`shop-sort`),resultsCount:document.getElementById(`shop-results-count`),productGrid:document.getElementById(`product-grid`),loadMoreBtn:document.getElementById(`load-more-btn`),qvModal:document.getElementById(`quick-view-modal`),qvClose:document.getElementById(`qv-close`),qvImg:document.getElementById(`qv-img`),qvTitle:document.getElementById(`qv-title`),qvMeta:document.getElementById(`qv-meta`),qvOrigPrice:document.getElementById(`qv-orig-price`),qvPrice:document.getElementById(`qv-price`),qvDesc:document.getElementById(`qv-desc`),qvAddCart:document.getElementById(`qv-add-cart`),qvWishlist:document.getElementById(`qv-wishlist`)};o.catFilters.length&&o.catFilters.forEach(e=>{e.addEventListener(`click`,e=>{o.catFilters.forEach(e=>e.classList.remove(`active`)),e.currentTarget.classList.add(`active`),a.category=e.currentTarget.dataset.value,a.visibleCount=12,s()})}),o.priceFilters.length&&o.priceFilters.forEach(e=>{e.addEventListener(`click`,e=>{o.priceFilters.forEach(e=>e.classList.remove(`active`)),e.currentTarget.classList.add(`active`),a.price=e.currentTarget.dataset.value,a.visibleCount=12,s()})}),o.availFilters.length&&o.availFilters.forEach(e=>{e.addEventListener(`click`,e=>{o.availFilters.forEach(e=>e.classList.remove(`active`)),e.currentTarget.classList.add(`active`),a.availability=e.currentTarget.dataset.value,a.visibleCount=12,s()})}),o.saleToggle&&o.saleToggle.addEventListener(`change`,e=>{a.onSale=e.target.checked,a.visibleCount=12,s()}),o.searchInput&&o.searchInput.addEventListener(`input`,e=>{a.search=e.target.value.toLowerCase(),a.visibleCount=12,s()}),o.sortSelect&&o.sortSelect.addEventListener(`change`,e=>{a.sort=e.target.value,s()}),o.loadMoreBtn&&o.loadMoreBtn.addEventListener(`click`,()=>{a.visibleCount+=12,c()}),o.qvClose&&o.qvClose.addEventListener(`click`,f),o.qvModal&&o.qvModal.addEventListener(`click`,e=>{e.target===o.qvModal&&f()}),o.qvAddCart&&o.qvAddCart.addEventListener(`click`,t=>{let r=t.target.dataset.id;if(r){let t=a.products.find(e=>e.id===r||e.id==r);t&&t.inStock!==!1&&(n(t),e(`Added to Cart`))}}),o.qvWishlist&&o.qvWishlist.addEventListener(`click`,e=>{let n=e.currentTarget,i=n.dataset.wishlist;if(i){t(i);let e=r(i);e?n.classList.add(`active`):n.classList.remove(`active`),document.querySelectorAll(`.wishlist-btn[data-wishlist="${i}"]`).forEach(t=>e?t.classList.add(`active`):t.classList.remove(`active`))}});function s(){let e=[...a.products];a.category!==`All`&&(e=e.filter(e=>e.category&&e.category.toLowerCase()===a.category.toLowerCase())),a.price!==`All`&&(e=e.filter(e=>{let t=Number(e.price)||0;return a.price===`Under $200`?t<200:a.price===`200-500`?t>=200&&t<=500:a.price===`500-1000`?t>=500&&t<=1e3:a.price===`1000-2000`?t>=1e3&&t<=2e3:a.price!==`Over $2000`||t>2e3})),a.availability===`In Stock`?e=e.filter(e=>e.inStock!==!1):a.availability===`Sold Out`&&(e=e.filter(e=>e.inStock===!1)),a.onSale&&(e=e.filter(e=>e.onSale)),a.search&&(e=e.filter(e=>e.title&&e.title.toLowerCase().includes(a.search)||e.category&&e.category.toLowerCase().includes(a.search)||e.description&&e.description.toLowerCase().includes(a.search))),e.sort((e,t)=>a.sort===`Newest`?(t.year||0)-(e.year||0):a.sort===`Price Low-High`?(Number(e.price)||0)-(Number(t.price)||0):a.sort===`Price High-Low`?(Number(t.price)||0)-(Number(e.price)||0):a.sort===`Name A-Z`?(e.title||``).localeCompare(t.title||``):0),a.filteredData=e,c(),l()}function c(){if(!o.productGrid)return;let e=a.filteredData.slice(0,a.visibleCount);e.length===0?o.productGrid.innerHTML=`<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #666;">No products match your criteria.</div>`:o.productGrid.innerHTML=e.map(e=>{let t=r(e.id)?`active`:``,n=e.onSale?`<span class="product-sale-badge">Sale</span>`:``,i=e.new?`<span class="product-new-badge">New</span>`:``,a=e.onSale&&e.originalPrice?`<span class="original-price">$${e.originalPrice}</span>`:``,o=e.inStock!==!1;return`
          <div class="product-card" data-id="${e.id||``}">
            <div class="product-card-img">
              <img src="${e.image||``}" alt="${e.title||``}" loading="lazy" />
              <div class="product-card-actions">
                <button class="wishlist-btn ${t}" data-wishlist="${e.id||``}" aria-label="Toggle Wishlist">
                  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
                <button class="quick-view-btn" data-quickview="${e.id||``}">Quick View</button>
              </div>
              ${n}
              ${i}
            </div>
            <div class="product-card-info">
              <p class="product-category">${e.category||`Artwork`}</p>
              <h3 class="product-title">${e.title||`Untitled`}</h3>
              <p class="product-medium">${e.medium||`Medium`} · ${e.size||`Size`}</p>
              <div class="product-pricing">
                ${a}
                <span class="product-price">$${e.price||0}</span>
              </div>
              <button class="btn-small add-to-cart" data-id="${e.id||``}" ${o?``:`disabled`}>
                ${o?`Add to Cart`:`Sold Out`}
              </button>
              ${o?`<button class="btn-small buy-painting" style="margin-top: 0.5rem; background: var(--olive, #556B2F); color: #fff;" data-id="${e.id||``}" data-title="${e.title||``}" data-price="${e.price||0}" data-size="${e.size||``}" data-img="${e.image||``}">Buy Now</button>`:``}
            </div>
          </div>
        `}).join(``),o.resultsCount&&(o.resultsCount.textContent=`Showing ${a.filteredData.length} product${a.filteredData.length===1?``:`s`}`),o.loadMoreBtn&&(a.visibleCount>=a.filteredData.length?o.loadMoreBtn.style.display=`none`:o.loadMoreBtn.style.display=`inline-block`),u()}function l(){o.catFilters.forEach(e=>{let t=e.dataset.value,n=e.querySelector(`.count`);n&&(t===`All`?n.textContent=`(${a.products.length})`:n.textContent=`(${a.products.filter(e=>e.category&&e.category.toLowerCase()===t.toLowerCase()).length})`)})}function u(){document.querySelectorAll(`#product-grid .add-to-cart`).forEach(t=>{t.addEventListener(`click`,t=>{let r=t.currentTarget.dataset.id,i=a.products.find(e=>e.id===r||e.id==r);i&&(n(i),e(`Added to Cart`))})}),document.querySelectorAll(`#product-grid .wishlist-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.currentTarget.dataset.wishlist;t(n),r(n)?e.currentTarget.classList.add(`active`):e.currentTarget.classList.remove(`active`)})}),document.querySelectorAll(`#product-grid .quick-view-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.quickview;d(t)})})}function d(e){let t=a.products.find(t=>t.id===e||t.id==e);if(!t||!o.qvModal)return;o.qvImg.src=t.image||``,o.qvImg.alt=t.title||``,o.qvTitle.textContent=t.title||`Untitled`,o.qvMeta.textContent=`${t.medium||`Medium`} · ${t.size||`Size`} · ${t.year||`N/A`}`,t.onSale&&t.originalPrice?(o.qvOrigPrice.textContent=`$${t.originalPrice}`,o.qvOrigPrice.style.display=`inline-block`):o.qvOrigPrice.style.display=`none`,o.qvPrice.textContent=`$${t.price||0}`,o.qvDesc.textContent=t.description||`No description available.`,o.qvAddCart.dataset.id=t.id,o.qvWishlist.dataset.wishlist=t.id;let n=document.getElementById(`qv-buy-painting`);n&&(n.dataset.id=t.id,n.dataset.title=t.title||``,n.dataset.price=t.price||0,n.dataset.size=t.size||``,n.dataset.img=t.image||``,t.inStock===!1?n.style.display=`none`:n.style.display=``),t.inStock===!1?(o.qvAddCart.textContent=`Sold Out`,o.qvAddCart.disabled=!0,o.qvAddCart.style.background=`#ccc`):(o.qvAddCart.textContent=`Add to Cart`,o.qvAddCart.disabled=!1,o.qvAddCart.style.background=``),r(t.id)?o.qvWishlist.classList.add(`active`):o.qvWishlist.classList.remove(`active`),o.qvModal.classList.add(`active`),document.body.style.overflow=`hidden`}function f(){o.qvModal&&(o.qvModal.classList.remove(`active`),document.body.style.overflow=``)}fetch('/api/shop').then(r=>r.json()).then(data=>{if(data.success&&Array.isArray(data.items)&&data.items.length>0){let custom=data.items.map(item=>({id:item.id,title:item.title,price:item.price,originalPrice:item.originalPrice||item.price,onSale:item.originalPrice&&item.originalPrice>item.price,category:item.category||'original',medium:item.medium||'Oil on Canvas',size:item.dimensions||'24" x 36"',image:item.image||'/photos/paintings-of-nepal-1.jpg',images:[item.image||'/photos/paintings-of-nepal-1.jpg'],description:item.description||`Exquisite original piece, "${item.title}".`,inStock:item.inStock!==false,stockQuantity:item.inStock!==false?1:0,sku:`CAG-${(item.category||'ART').toUpperCase()}-${item.id}`,dimensions:item.dimensions||'24" x 36"',featured:true,new:true}));let existingIds=new Set(custom.map(c=>c.id));let defaults=Array.isArray(i)?i.filter(d=>!existingIds.has(d.id)):[];a.products=[...custom,...defaults];s();}}).catch(()=>{});s()}export{o as init,a as render};