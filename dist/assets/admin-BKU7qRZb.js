function render() {
  return `
    <div class="admin-page-root" style="background: var(--bg-main); color: var(--white); min-height: 100vh; font-family: var(--font-body);">
      
      <!-- LOGIN VIEW (UNAUTHENTICATED) -->
      <div id="adminLoginView" style="display: none; min-height: 100vh; align-items: center; justify-content: center; padding: 2rem; background: radial-gradient(circle at center, #121610 0%, #050505 100%);">
        <div class="card" style="max-width: 440px; width: 100%; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-lg); padding: 2.75rem; box-shadow: var(--shadow-lg);">
          
          <div style="text-align: center; margin-bottom: 2rem;">
            <span style="color: var(--accent); font-family: var(--font-heading); font-size: 1.8rem; letter-spacing: -0.01em; display: block;">Caterpillar</span>
            <span style="color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.75rem; font-weight: 600;">Art Gallery Admin Portal</span>
          </div>

          <div id="loginAlertBox" style="display: none; background: rgba(220,53,69,0.15); border: 1px solid #dc3545; color: #ff6b6b; padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.88rem; margin-bottom: 1.5rem; text-align: center; line-height: 1.5;"></div>

          <form id="adminLoginForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="color: #fff; font-weight: 500;">Admin ID / Username</label>
              <input type="text" id="loginUsername" required value="admin" class="form-input" placeholder="admin" style="background: #1a1a1a; color: #fff;" />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="color: #fff; font-weight: 500;">Password</label>
              <div style="position: relative;">
                <input type="password" id="loginPassword" required class="form-input" placeholder="••••••••••••" style="background: #1a1a1a; color: #fff; padding-right: 2.75rem;" />
                <button type="button" id="togglePasswordBtn" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--gray-400); cursor: pointer; font-size: 1.1rem;" aria-label="Show password">👁️</button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-300); cursor: pointer;">
                <input type="checkbox" id="rememberMeCheck" style="width: 16px; height: 16px;" checked /> Remember Me
              </label>
              <span style="color: var(--gray-400); font-size: 0.8rem;">Protected by JWT & Bcrypt</span>
            </div>

            <button type="submit" id="loginSubmitBtn" class="btn btn-primary" style="padding: 1rem; font-size: 1rem; font-weight: 600; margin-top: 0.5rem;">🔐 Sign In to Admin Dashboard</button>
          </form>


        </div>
      </div>

      <!-- DASHBOARD VIEW (AUTHENTICATED) -->
      <div id="adminDashboardView" style="display: none; padding-top: 100px; padding-bottom: 5rem;">
        <div class="container" style="max-width: 1400px; margin: 0 auto;">
          
          <!-- Top Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.5rem;">
            <div>
              <span style="color: var(--accent); text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.85rem; font-weight: 600;">Control Panel</span>
              <h1 style="font-family: var(--font-heading); font-size: 2.8rem; font-weight: 300; margin: 0.25rem 0 0 0; color: #fff;">Caterpillar Gallery Admin</h1>
            </div>
            
            <div style="display: flex; gap: 0.85rem; align-items: center; flex-wrap: wrap;">
              <span id="adminUserBadge" style="background: rgba(154,176,126,0.15); color: var(--accent); border: 1px solid var(--accent); padding: 0.4rem 1rem; border-radius: var(--radius-pill); font-size: 0.8rem; font-weight: 600;">Admin: admin</span>
              <button id="adminRefreshBtn" class="btn btn-secondary" style="padding: 0.5rem 1.1rem; font-size: 0.85rem;">🔄 Refresh</button>
              <button id="adminLogoutBtn" class="btn btn-secondary" style="padding: 0.5rem 1.1rem; font-size: 0.85rem; color: #ff6b6b; border-color: #ff6b6b;">🚪 Log Out</button>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div style="display: flex; gap: 0.75rem; margin-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; overflow-x: auto;">
            <button class="admin-tab-btn active" data-tab="orders-tab" style="background: var(--accent); color: var(--black); border: none; padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">📦 Track Orders</button>
            <button class="admin-tab-btn" data-tab="messages-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">📬 Messages</button>
            <button class="admin-tab-btn" data-tab="workshops-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">🎨 Workshop Bookings</button>
            <button class="admin-tab-btn" data-tab="blogs-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">✍️ Blog Posts & Editor</button>
            <button class="admin-tab-btn" data-tab="add-shop-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">🛒 Shop Items</button>
            <button class="admin-tab-btn" data-tab="add-portfolio-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">🖼️ Portfolio Items</button>
            <button class="admin-tab-btn" data-tab="audit-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">📋 Audit Logs</button>
            <button class="admin-tab-btn" data-tab="settings-tab" style="background: rgba(255,255,255,0.05); color: var(--white); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer;">⚙️ Security Settings</button>
          </div>

          <!-- TAB 1: TRACK ORDERS -->
          <div id="orders-tab" class="admin-tab-content" style="display: block;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Total Orders</span>
                <h2 id="totalOrdersCount" style="font-size: 2.2rem; margin-top: 0.5rem; color: #fff;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #f5a623; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Pending Action</span>
                <h2 id="pendingOrdersCount" style="font-size: 2.2rem; margin-top: 0.5rem; color: #f5a623;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #17a2b8; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Dispatched / Transit</span>
                <h2 id="dispatchedOrdersCount" style="font-size: 2.2rem; margin-top: 0.5rem; color: #17a2b8;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #28a745; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Delivered</span>
                <h2 id="deliveredOrdersCount" style="font-size: 2.2rem; margin-top: 0.5rem; color: #28a745;">0</h2>
              </div>
            </div>

            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem; overflow-x: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 300;">Track Customer Orders</h3>
                <div style="display: flex; gap: 0.5rem;" id="orderFilterButtons">
                  <button class="btn btn-secondary order-filter-btn active" data-filter="all" style="padding: 0.4rem 1rem; font-size: 0.8rem;">All Orders</button>
                  <button class="btn btn-secondary order-filter-btn" data-filter="Pending" style="padding: 0.4rem 1rem; font-size: 0.8rem;">Pending</button>
                  <button class="btn btn-secondary order-filter-btn" data-filter="Dispatched" style="padding: 0.4rem 1rem; font-size: 0.8rem;">Dispatched</button>
                  <button class="btn btn-secondary order-filter-btn" data-filter="Delivered" style="padding: 0.4rem 1rem; font-size: 0.8rem;">Delivered</button>
                </div>
              </div>

              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">
                    <th style="padding: 1rem;">Order ID</th>
                    <th style="padding: 1rem;">Customer</th>
                    <th style="padding: 1rem;">Item & Total</th>
                    <th style="padding: 1rem;">Shipping City</th>
                    <th style="padding: 1rem;">Tracking Number</th>
                    <th style="padding: 1rem;">Status</th>
                    <th style="padding: 1rem; text-align: right;">Action & Mail</th>
                  </tr>
                </thead>
                <tbody id="ordersTableBody"></tbody>
              </table>
            </div>
          </div>

          <!-- TAB 2: BLOG MANAGEMENT -->
          <div id="blogs-tab" class="admin-tab-content" style="display: none;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">Total Articles</span>
                <h2 id="statTotalBlogs" style="font-size: 2rem; margin-top: 0.5rem; color: #fff;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #28a745; font-size: 0.8rem; text-transform: uppercase;">Published</span>
                <h2 id="statPublishedBlogs" style="font-size: 2rem; margin-top: 0.5rem; color: #28a745;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #f5a623; font-size: 0.8rem; text-transform: uppercase;">Drafts</span>
                <h2 id="statDraftBlogs" style="font-size: 2rem; margin-top: 0.5rem; color: #f5a623;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--accent); font-size: 0.8rem; text-transform: uppercase;">Article Views</span>
                <h2 id="statBlogViews" style="font-size: 2rem; margin-top: 0.5rem; color: var(--accent);">0</h2>
              </div>
            </div>

            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 300;">Blog Articles</h3>
                <button id="openNewBlogModalBtn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-weight: 600;">✍️ + Write New Article</button>
              </div>

              <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center;">
                <input type="text" id="blogSearchInput" placeholder="Search articles by title..." style="flex: 1; min-width: 240px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem;" />
                <select id="blogCategoryFilter" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem; cursor: pointer;">
                  <option value="all">All Categories</option>
                  <option value="Live Wedding Paintings">Live Wedding Paintings</option>
                  <option value="Landscape Paintings">Landscape Paintings</option>
                  <option value="Portraits">Portraits</option>
                  <option value="Tutorials">Tutorials</option>
                </select>
                <select id="blogStatusFilter" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem; cursor: pointer;">
                  <option value="all">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                  <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">
                      <th style="padding: 0.85rem;">Cover</th>
                      <th style="padding: 0.85rem;">Article Title</th>
                      <th style="padding: 0.85rem;">Category</th>
                      <th style="padding: 0.85rem;">Author</th>
                      <th style="padding: 0.85rem;">Status</th>
                      <th style="padding: 0.85rem;">Date</th>
                      <th style="padding: 0.85rem;">Views</th>
                      <th style="padding: 0.85rem; text-align: right;">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="blogsTableBody"></tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 3: SHOP PRODUCTS -->
          <div id="add-shop-tab" class="admin-tab-content" style="display: none;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">Total Products</span>
                <h2 id="statTotalShop" style="font-size: 2rem; margin-top: 0.5rem; color: #fff;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #28a745; font-size: 0.8rem; text-transform: uppercase;">In Stock</span>
                <h2 id="statInStockShop" style="font-size: 2rem; margin-top: 0.5rem; color: #28a745;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #f5a623; font-size: 0.8rem; text-transform: uppercase;">On Sale</span>
                <h2 id="statSaleShop" style="font-size: 2rem; margin-top: 0.5rem; color: #f5a623;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--accent); font-size: 0.8rem; text-transform: uppercase;">Categories</span>
                <h2 id="statCategoriesShop" style="font-size: 2rem; margin-top: 0.5rem; color: var(--accent);">0</h2>
              </div>
            </div>

            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 300;">Shop Products Catalog</h3>
                <button id="openNewShopModalBtn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-weight: 600;">🛒 + Add New Shop Product</button>
              </div>

              <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center;">
                <input type="text" id="shopSearchInput" placeholder="Search products by title..." style="flex: 1; min-width: 240px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem;" />
                <select id="shopCategoryFilter" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem; cursor: pointer;">
                  <option value="all">All Categories</option>
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="abstract">Abstract</option>
                  <option value="nature">Nature</option>
                  <option value="mountains">Mountains</option>
                  <option value="original">Original</option>
                  <option value="print">Fine Art Print</option>
                </select>
                <select id="shopStatusFilter" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem; cursor: pointer;">
                  <option value="all">All Stock Statuses</option>
                  <option value="instock">In Stock</option>
                  <option value="soldout">Sold Out</option>
                </select>
              </div>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                  <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">
                      <th style="padding: 0.85rem;">Product</th>
                      <th style="padding: 0.85rem;">Title & Size</th>
                      <th style="padding: 0.85rem;">Category</th>
                      <th style="padding: 0.85rem;">Price</th>
                      <th style="padding: 0.85rem;">Status</th>
                      <th style="padding: 0.85rem; text-align: right;">Action</th>
                    </tr>
                  </thead>
                  <tbody id="shopItemsTableBody"></tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 4: PORTFOLIO MASTERPIECES -->
          <div id="add-portfolio-tab" class="admin-tab-content" style="display: none;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">Total Artworks</span>
                <h2 id="statTotalPortfolio" style="font-size: 2rem; margin-top: 0.5rem; color: #fff;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #28a745; font-size: 0.8rem; text-transform: uppercase;">Available</span>
                <h2 id="statAvailablePortfolio" style="font-size: 2rem; margin-top: 0.5rem; color: #28a745;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: #dc3545; font-size: 0.8rem; text-transform: uppercase;">Sold Out</span>
                <h2 id="statSoldPortfolio" style="font-size: 2rem; margin-top: 0.5rem; color: #dc3545;">0</h2>
              </div>
              <div class="card" style="padding: 1.5rem; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);">
                <span style="color: var(--accent); font-size: 0.8rem; text-transform: uppercase;">Categories</span>
                <h2 id="statCategoriesPortfolio" style="font-size: 2rem; margin-top: 0.5rem; color: var(--accent);">0</h2>
              </div>
            </div>

            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 300;">Portfolio Masterpieces Gallery</h3>
                <button id="openNewPortfolioModalBtn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-weight: 600;">🖼️ + Add New Artwork</button>
              </div>

              <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center;">
                <input type="text" id="portfolioSearchInput" placeholder="Search artworks by title..." style="flex: 1; min-width: 240px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem;" />
                <select id="portfolioCategoryFilter" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem; cursor: pointer;">
                  <option value="all">All Categories</option>
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="abstract">Abstract</option>
                  <option value="nature">Nature</option>
                  <option value="mountains">Mountains</option>
                </select>
                <select id="portfolioStatusFilter" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.65rem 1rem; border-radius: var(--radius-pill); font-size: 0.88rem; cursor: pointer;">
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                  <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">
                      <th style="padding: 0.85rem;">Artwork</th>
                      <th style="padding: 0.85rem;">Title & Size</th>
                      <th style="padding: 0.85rem;">Category & Medium</th>
                      <th style="padding: 0.85rem;">Price</th>
                      <th style="padding: 0.85rem;">Status</th>
                      <th style="padding: 0.85rem; text-align: right;">Action</th>
                    </tr>
                  </thead>
                  <tbody id="portfolioItemsTableBody"></tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB: CONTACT MESSAGES -->
          <div id="messages-tab" class="admin-tab-content" style="display: none;">
            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem; overflow-x: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 300;">Contact Messages</h3>
                <span id="msgCountBadge" style="background: rgba(154,176,126,0.15); color: var(--accent); border: 1px solid var(--accent); padding: 0.3rem 0.8rem; border-radius: var(--radius-pill); font-size: 0.8rem; font-weight: 600;">0 messages</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">
                    <th style="padding: 0.85rem;">ID</th>
                    <th style="padding: 0.85rem;">Sender</th>
                    <th style="padding: 0.85rem;">Subject</th>
                    <th style="padding: 0.85rem;">Message</th>
                    <th style="padding: 0.85rem;">Date</th>
                    <th style="padding: 0.85rem;">Status</th>
                  </tr>
                </thead>
                <tbody id="messagesTableBody"></tbody>
              </table>
            </div>
          </div>

          <!-- TAB: WORKSHOP BOOKINGS -->
          <div id="workshops-tab" class="admin-tab-content" style="display: none;">
            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem; overflow-x: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 300;">Workshop Bookings</h3>
                <span id="workshopCountBadge" style="background: rgba(154,176,126,0.15); color: var(--accent); border: 1px solid var(--accent); padding: 0.3rem 0.8rem; border-radius: var(--radius-pill); font-size: 0.8rem; font-weight: 600;">0 bookings</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); font-size: 0.8rem; text-transform: uppercase;">
                    <th style="padding: 0.85rem;">ID</th>
                    <th style="padding: 0.85rem;">Name</th>
                    <th style="padding: 0.85rem;">Contact</th>
                    <th style="padding: 0.85rem;">Type</th>
                    <th style="padding: 0.85rem;">Date & Time</th>
                    <th style="padding: 0.85rem;">People</th>
                    <th style="padding: 0.85rem;">Requests</th>
                    <th style="padding: 0.85rem;">Status</th>
                  </tr>
                </thead>
                <tbody id="workshopsTableBody"></tbody>
              </table>
            </div>
          </div>

          <!-- TAB 5: AUDIT LOGS -->
          <div id="audit-tab" class="admin-tab-content" style="display: none;">
            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 1.75rem; overflow-x: auto;">
              <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 300; margin-bottom: 1.5rem;">Admin Activity & Security Audit Logs</h3>
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--gray-400); text-transform: uppercase;">
                    <th style="padding: 0.85rem;">Timestamp</th>
                    <th style="padding: 0.85rem;">Action Event</th>
                    <th style="padding: 0.85rem;">User</th>
                    <th style="padding: 0.85rem;">IP Address</th>
                    <th style="padding: 0.85rem;">Event Details</th>
                  </tr>
                </thead>
                <tbody id="auditTableBody"></tbody>
              </table>
            </div>
          </div>

          <!-- TAB 6: SECURITY SETTINGS -->
          <div id="settings-tab" class="admin-tab-content" style="display: none;">
            <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 2.5rem; max-width: 600px; margin: 0 auto;">
              <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 300; margin-bottom: 0.5rem;">Admin Security Settings</h2>
              <p style="color: var(--gray-300); font-size: 0.9rem; margin-bottom: 2rem;">Update your admin password securely using Bcrypt hashing.</p>

              <form id="changePasswordForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div class="form-group">
                  <label class="form-label">Current Password</label>
                  <input type="password" id="changeCurrentPass" required class="form-input" />
                </div>
                <div class="form-group">
                  <label class="form-label">New Password (min 6 characters)</label>
                  <input type="password" id="changeNewPass" required minlength="6" class="form-input" />
                </div>
                <div class="form-group">
                  <label class="form-label">Confirm New Password</label>
                  <input type="password" id="changeConfirmPass" required minlength="6" class="form-input" />
                </div>
                <button type="submit" class="btn btn-primary" style="padding: 0.85rem; font-weight: 600;">Update Password &rarr;</button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <!-- RICH TEXT BLOG EDITOR MODAL -->
      <div id="blogEditorModal" style="position: fixed; inset: 0; background: rgba(5,5,5,0.95); z-index: 10000; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
        <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-lg); padding: 2.5rem; max-width: 950px; width: 100%; max-height: 92vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem;">
            <div>
              <span id="blogAutosaveStatus" style="color: var(--accent); font-size: 0.8rem; font-weight: bold;">Autosave Active (every 30s)</span>
              <h3 id="blogModalHeading" style="font-family: var(--font-heading); font-size: 2rem; font-weight: 300; margin: 0.2rem 0 0 0;">Create Article</h3>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: center;">
              <button id="saveDraftBtn" class="btn btn-secondary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">Save Draft</button>
              <button id="publishNowBtn" class="btn btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.85rem; font-weight: 600;">Publish Now &rarr;</button>
              <button id="closeBlogModal" style="background: none; border: none; color: #fff; font-size: 2.2rem; cursor: pointer; line-height: 1;">&times;</button>
            </div>
          </div>

          <form id="blogEditorForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <input type="hidden" id="editorBlogId" />
            <div class="form-group">
              <label class="form-label">Article Title</label>
              <input type="text" id="editorTitle" required placeholder="Enter article headline..." class="form-input" style="font-size: 1.2rem; font-family: var(--font-heading);" />
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label">URL Slug</label>
                <input type="text" id="editorSlug" placeholder="art-of-live-wedding-painting" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <select id="editorCategory" class="form-input">
                  <option value="Live Wedding Paintings">Live Wedding Paintings</option>
                  <option value="Landscape Paintings">Landscape Paintings</option>
                  <option value="Portraits">Portraits</option>
                  <option value="Tutorials">Tutorials</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Author Name</label>
              <input type="text" id="editorAuthor" value="Suman Wagle" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Cover / Featured Image</label>
              <input type="hidden" id="editorImage" value="/photos/photo-wedding.png" />
              <div id="blogDropZone" style="border: 2px dashed rgba(154,176,126,0.4); border-radius: var(--radius-lg); padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s ease; background: rgba(154,176,126,0.03); position: relative;">
                <input type="file" id="blogFileInput" accept="image/*" style="position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2;" />
                <div id="blogDropContent">
                  <div style="font-size: 2.5rem; margin-bottom: 0.5rem; opacity: 0.6;">📷</div>
                  <p style="color: var(--accent); font-weight: 600; margin-bottom: 0.25rem; font-size: 0.95rem;">Drag & drop blog cover image here</p>
                  <p style="color: var(--gray-400); font-size: 0.82rem; margin: 0;">or click to browse • JPG, PNG, WebP up to 10MB</p>
                </div>
                <div id="blogPreviewContainer" style="display: none;">
                  <img id="blogPreviewImg" style="max-height: 180px; max-width: 100%; border-radius: var(--radius-md); margin-bottom: 0.5rem; object-fit: contain;" />
                  <p id="blogFileName" style="color: var(--accent); font-size: 0.82rem; margin: 0;"></p>
                  <button type="button" id="blogRemoveImg" style="margin-top: 0.5rem; background: rgba(220,53,69,0.15); border: 1px solid #dc3545; color: #ff6b6b; padding: 0.3rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; cursor: pointer;">✕ Remove / Change</button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Short Summary (Teaser)</label>
              <textarea id="editorSummary" rows="2" placeholder="Brief summary..." class="form-textarea"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Article Body Content</label>
              <div class="rich-toolbar" style="display: flex; gap: 0.4rem; background: #1a1a1a; padding: 0.5rem; border-radius: var(--radius-md) var(--radius-md) 0 0; border: 1px solid rgba(255,255,255,0.15); border-bottom: none; flex-wrap: wrap;">
                <button type="button" class="toolbar-btn" data-cmd="bold" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer; font-weight: bold;">B</button>
                <button type="button" class="toolbar-btn" data-cmd="italic" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer; font-style: italic;">I</button>
                <button type="button" class="toolbar-btn" data-cmd="formatBlock" data-val="H2" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer;">H2</button>
                <button type="button" class="toolbar-btn" data-cmd="formatBlock" data-val="H3" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer;">H3</button>
                <button type="button" class="toolbar-btn" data-cmd="formatBlock" data-val="BLOCKQUOTE" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer;">"" Quote</button>
                <button type="button" class="toolbar-btn" data-cmd="insertUnorderedList" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer;">• Bullet List</button>
                <button type="button" id="toolbarLinkBtn" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer;">🔗 Link</button>
                <button type="button" id="toolbarImgBtn" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer;">🖼️ Insert Image</button>
              </div>
              <div id="blogContentEditor" contenteditable="true" style="min-height: 250px; max-height: 400px; overflow-y: auto; background: #121212; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 1.25rem; border-radius: 0 0 var(--radius-md) var(--radius-md); font-size: 1rem; line-height: 1.7; outline: none;">
                <p>Start writing your blog article here...</p>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 1.25rem; border-radius: var(--radius-md);">
              <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--accent); margin-bottom: 1rem;">SEO & Social Meta Settings</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">SEO Meta Title</label>
                  <input type="text" id="editorSeoTitle" class="form-input" />
                </div>
                <div class="form-group">
                  <label class="form-label">Keywords</label>
                  <input type="text" id="editorKeywords" class="form-input" />
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Meta Description</label>
                <input type="text" id="editorMetaDescription" class="form-input" />
              </div>
            </div>
            <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md);">
              <div style="flex: 1; min-width: 160px;">
                <label class="form-label">Publish Status</label>
                <select id="editorStatus" class="form-input">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              <div style="flex: 1; min-width: 160px;">
                <label class="form-label">Publish Date</label>
                <input type="date" id="editorPublishDate" class="form-input" />
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem;">
                <input type="checkbox" id="editorFeatured" style="width: 18px; height: 18px;" />
                <label for="editorFeatured" style="color: #fff; font-size: 0.9rem;">Featured Article</label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- MAIL MODAL -->
      <div id="emailModal" style="position: fixed; inset: 0; background: rgba(5,5,5,0.92); z-index: 10000; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
        <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-lg); padding: 2.5rem; max-width: 650px; width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 300;">Send Customer Email</h3>
            <button id="closeEmailModal" style="background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer;">&times;</button>
          </div>
          <form id="emailForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <input type="hidden" id="emailOrderId" />
            <div class="form-group">
              <label class="form-label">Recipient Email</label>
              <input type="email" id="emailRecipient" required readonly style="opacity: 0.8;" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Email Subject</label>
              <input type="text" id="emailSubject" required class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Message Body</label>
              <textarea id="emailBody" rows="7" required class="form-textarea"></textarea>
            </div>
            <button type="submit" id="sendEmailSubmitBtn" class="btn btn-primary" style="padding: 1rem; font-weight: 600;">📧 Dispatch Mail</button>
          </form>
        </div>
      </div>
      <!-- ADD SHOP ITEM MODAL -->
      <div id="shopModal" style="position: fixed; inset: 0; background: rgba(5,5,5,0.95); z-index: 10000; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
        <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-lg); padding: 2.5rem; max-width: 800px; width: 100%; max-height: 92vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem;">
            <h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 300; margin: 0;">Add New Shop Product</h3>
            <button id="closeShopModal" style="background: none; border: none; color: #fff; font-size: 2.2rem; cursor: pointer; line-height: 1;">&times;</button>
          </div>
          <form id="addShopForm" style="display: flex; flex-direction: column; gap: 1.25rem;" enctype="multipart/form-data">
            <div class="form-group">
              <label class="form-label">Item Title</label>
              <input type="text" name="title" required placeholder="e.g. Annapurna Morning Light" class="form-input" />
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label">Selling Price ($)</label>
                <input type="number" name="price" required step="0.01" placeholder="250.00" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">Original Price ($)</label>
                <input type="number" name="originalPrice" step="0.01" placeholder="300.00" class="form-input" />
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label">Category</label>
                <select name="category" class="form-input">
                  <option value="original">Original Painting</option>
                  <option value="print">Fine Art Print</option>
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="abstract">Abstract</option>
                  <option value="mountains">Mountains</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Medium & Material</label>
                <input type="text" name="medium" placeholder="Oil on Canvas" class="form-input" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Dimensions / Size</label>
              <input type="text" name="dimensions" placeholder="24&quot; x 36&quot;" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Artwork Image (Drag & Drop)</label>
              <div id="shopDropZone" style="border: 2px dashed rgba(154,176,126,0.4); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center; cursor: pointer; transition: all 0.3s ease; background: rgba(154,176,126,0.03); position: relative;">
                <input type="file" name="image" id="shopFileInput" accept="image/*" style="position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2;" />
                <div id="shopDropContent">
                  <div style="font-size: 3rem; margin-bottom: 0.75rem; opacity: 0.6;">📷</div>
                  <p style="color: var(--accent); font-weight: 600; margin-bottom: 0.25rem; font-size: 1rem;">Drag & drop your image here</p>
                  <p style="color: var(--gray-400); font-size: 0.85rem; margin: 0;">or click to browse • JPG, PNG, WebP up to 10MB</p>
                </div>
                <div id="shopPreviewContainer" style="display: none;">
                  <img id="shopPreviewImg" style="max-height: 200px; max-width: 100%; border-radius: var(--radius-md); margin-bottom: 0.75rem; object-fit: contain;" />
                  <p id="shopFileName" style="color: var(--accent); font-size: 0.85rem; margin: 0;"></p>
                  <button type="button" id="shopRemoveImg" style="margin-top: 0.5rem; background: rgba(220,53,69,0.15); border: 1px solid #dc3545; color: #ff6b6b; padding: 0.35rem 1rem; border-radius: var(--radius-pill); font-size: 0.8rem; cursor: pointer;">✕ Remove</button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Item Description</label>
              <textarea name="description" rows="3" class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 1rem; font-weight: 600;">+ Save Shop Item</button>
          </form>
        </div>
      </div>

      <!-- ADD PORTFOLIO ITEM MODAL -->
      <div id="portfolioModal" style="position: fixed; inset: 0; background: rgba(5,5,5,0.95); z-index: 10000; display: none; align-items: center; justify-content: center; padding: 1.5rem;">
        <div class="card" style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-lg); padding: 2.5rem; max-width: 800px; width: 100%; max-height: 92vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem;">
            <h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 300; margin: 0;">Add New Portfolio Masterpiece</h3>
            <button id="closePortfolioModal" style="background: none; border: none; color: #fff; font-size: 2.2rem; cursor: pointer; line-height: 1;">&times;</button>
          </div>
          <form id="addPortfolioForm" style="display: flex; flex-direction: column; gap: 1.25rem;" enctype="multipart/form-data">
            <div class="form-group">
              <label class="form-label">Artwork Title</label>
              <input type="text" name="title" required placeholder="e.g. Machhapuchhre Sunset" class="form-input" />
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label">Category Tag</label>
                <select name="category" class="form-input">
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="abstract">Abstract</option>
                  <option value="nature">Nature</option>
                  <option value="mountains">Mountains</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Technique / Medium</label>
                <input type="text" name="medium" placeholder="Oil on Canvas" class="form-input" />
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Price ($)</label>
                <input type="number" name="price" step="0.01" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">Year</label>
                <input type="number" name="year" value="2024" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">Dimensions</label>
                <input type="text" name="dimensions" placeholder="30&quot; x 40&quot;" class="form-input" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Artwork Image (Drag & Drop)</label>
              <div id="portfolioDropZone" style="border: 2px dashed rgba(154,176,126,0.4); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center; cursor: pointer; transition: all 0.3s ease; background: rgba(154,176,126,0.03); position: relative;">
                <input type="file" name="image" id="portfolioFileInput" accept="image/*" style="position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2;" />
                <div id="portfolioDropContent">
                  <div style="font-size: 3rem; margin-bottom: 0.75rem; opacity: 0.6;">📷</div>
                  <p style="color: var(--accent); font-weight: 600; margin-bottom: 0.25rem; font-size: 1rem;">Drag & drop your image here</p>
                  <p style="color: var(--gray-400); font-size: 0.85rem; margin: 0;">or click to browse • JPG, PNG, WebP up to 10MB</p>
                </div>
                <div id="portfolioPreviewContainer" style="display: none;">
                  <img id="portfolioPreviewImg" style="max-height: 200px; max-width: 100%; border-radius: var(--radius-md); margin-bottom: 0.75rem; object-fit: contain;" />
                  <p id="portfolioFileName" style="color: var(--accent); font-size: 0.85rem; margin: 0;"></p>
                  <button type="button" id="portfolioRemoveImg" style="margin-top: 0.5rem; background: rgba(220,53,69,0.15); border: 1px solid #dc3545; color: #ff6b6b; padding: 0.35rem 1rem; border-radius: var(--radius-pill); font-size: 0.8rem; cursor: pointer;">✕ Remove</button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea name="description" rows="3" class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 1rem; font-weight: 600;">+ Save Portfolio Masterpiece</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function init() {
  let loginView = document.getElementById("adminLoginView"),
    dashboardView = document.getElementById("adminDashboardView"),
    loginForm = document.getElementById("adminLoginForm"),
    loginAlertBox = document.getElementById("loginAlertBox"),
    inactivityTimer = null;

  // Verify Session on Load
  async function checkSession() {
    try {
      let res = await fetch("/api/admin/session");
      let data = await res.json();

      if (data.authenticated) {
        showDashboard(data.username);
      } else {
        showLogin();
      }
    } catch (e) {
      showLogin();
    }
  }

  function showLogin() {
    if (loginView) loginView.style.display = "flex";
    if (dashboardView) dashboardView.style.display = "none";
    clearTimeout(inactivityTimer);
  }

  function showDashboard(username) {
    if (loginView) loginView.style.display = "none";
    if (dashboardView) dashboardView.style.display = "block";

    let badge = document.getElementById("adminUserBadge");
    if (badge) badge.textContent = `Admin: ${username || "admin"}`;

    // Reset inactivity timer
    resetInactivityTimer();
    attachInactivityListeners();

    fetchOrders();
    fetchBlogs();
    fetchAuditLogs();
    fetchMessages();
    fetchWorkshops();
    fetchAdminShopItems();
    fetchAdminPortfolioItems();
  }

  // 30-Minute Inactivity Auto-Logout
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      alert("Session expired due to 30 minutes of inactivity.");
      logoutAdmin();
    }, 30 * 60 * 1000);
  }

  function attachInactivityListeners() {
    ["mousemove", "keypress", "click", "touchstart"].forEach((evt) => {
      window.addEventListener(evt, resetInactivityTimer, { passive: true });
    });
  }

  // Login Submit Handler
  loginForm && loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.getElementById("loginUsername").value,
      password = document.getElementById("loginPassword").value,
      rememberMe = document.getElementById("rememberMeCheck").checked,
      submitBtn = document.getElementById("loginSubmitBtn");

    if (loginAlertBox) loginAlertBox.style.display = "none";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Authenticating...";
    }

    try {
      let res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe })
      });
      let data = await res.json();

      if (res.ok && data.success) {
        showDashboard(data.username);
      } else {
        if (loginAlertBox) {
          loginAlertBox.textContent = data.error || "Login failed.";
          loginAlertBox.style.display = "block";
        }
      }
    } catch (err) {
      if (loginAlertBox) {
        loginAlertBox.textContent = "Network error connecting to server.";
        loginAlertBox.style.display = "block";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "🔐 Sign In to Admin Dashboard";
      }
    }
  });

  // Toggle Show/Hide Password
  document.getElementById("togglePasswordBtn")?.addEventListener("click", () => {
    let passInput = document.getElementById("loginPassword");
    if (passInput) {
      passInput.type = passInput.type === "password" ? "text" : "password";
    }
  });

  // Logout Handler
  async function logoutAdmin() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {}
    showLogin();
  }

  document.getElementById("adminLogoutBtn")?.addEventListener("click", logoutAdmin);

  // Tabs switching
  document.querySelectorAll(".admin-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab-btn").forEach((b) => {
        b.style.background = "rgba(255,255,255,0.05)";
        b.style.color = "var(--white)";
        b.style.border = "1px solid rgba(255,255,255,0.1)";
      });
      btn.style.background = "var(--accent)";
      btn.style.color = "var(--black)";
      btn.style.border = "none";

      let target = btn.getAttribute("data-tab");
      document.querySelectorAll(".admin-tab-content").forEach((tab) => {
        tab.style.display = tab.id === target ? "block" : "none";
      });

      if (target === "audit-tab") fetchAuditLogs();
      if (target === "messages-tab") fetchMessages();
      if (target === "workshops-tab") fetchWorkshops();
      if (target === "add-shop-tab") fetchAdminShopItems();
      if (target === "add-portfolio-tab") fetchAdminPortfolioItems();
    });
  });

  // Fetch Audit Logs
  async function fetchAuditLogs() {
    let tbody = document.getElementById("auditTableBody");
    if (!tbody) return;

    try {
      let res = await fetch("/api/admin/audit-logs");
      let data = await res.json();
      if (data.success && data.logs) {
        tbody.innerHTML = data.logs.map((log) => `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 0.85rem; color: var(--gray-400);">${new Date(log.timestamp).toLocaleString()}</td>
            <td style="padding: 0.85rem; font-weight: bold; color: var(--accent);">${log.action}</td>
            <td style="padding: 0.85rem; color: #fff;">${log.user || "admin"}</td>
            <td style="padding: 0.85rem; color: var(--gray-300);">${log.ip || "local"}</td>
            <td style="padding: 0.85rem; color: var(--gray-300); font-size: 0.82rem;">${JSON.stringify(log.details || {})}</td>
          </tr>
        `).join("");
      }
    } catch (e) {}
  }

  // Change Password Form
  let changePasswordForm = document.getElementById("changePasswordForm");
  changePasswordForm && changePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let currentPassword = document.getElementById("changeCurrentPass").value,
      newPassword = document.getElementById("changeNewPass").value,
      confirmPass = document.getElementById("changeConfirmPass").value;

    if (newPassword !== confirmPass) {
      alert("New passwords do not match!");
      return;
    }

    try {
      let res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      let data = await res.json();
      if (data.success) {
        alert("✨ Password changed successfully!");
        changePasswordForm.reset();
      } else {
        alert(data.error || "Failed to update password.");
      }
    } catch (err) {
      alert("Failed to update password.");
    }
  });

  // --- BLOGS MODULE & ORDERS MODULE ---
  let ordersList = [], blogsList = [], activeOrderFilter = "all", blogSearch = "", blogCategory = "all", blogStatus = "all", autosaveInterval = null;

  async function fetchOrders() {
    try {
      let res = await fetch("/api/admin/orders");
      let data = await res.json();
      if (data.success) {
        ordersList = data.orders || [];
        renderOrders();
      }
    } catch (e) {}
  }

  function renderOrders() {
    let tbody = document.getElementById("ordersTableBody");
    if (!tbody) return;
    let filtered = ordersList.filter((o) => activeOrderFilter === "all" || o.status === activeOrderFilter);

    let totalCount = document.getElementById("totalOrdersCount"),
      pendingCount = document.getElementById("pendingOrdersCount"),
      dispatchedCount = document.getElementById("dispatchedOrdersCount"),
      deliveredCount = document.getElementById("deliveredOrdersCount");

    if (totalCount) totalCount.textContent = ordersList.length;
    if (pendingCount) pendingCount.textContent = ordersList.filter((o) => o.status === "Pending" || !o.status).length;
    if (dispatchedCount) dispatchedCount.textContent = ordersList.filter((o) => o.status === "Dispatched" || o.status === "Processing" || o.status === "Out for Delivery").length;
    if (deliveredCount) deliveredCount.textContent = ordersList.filter((o) => o.status === "Delivered").length;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 3rem; color: var(--gray-400);">No orders found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((o) => {
      let cust = o.customer || {}, item = o.item || {}, ship = o.shipping || {};
      let statusColor = "#f5a623";
      if (o.status === "Dispatched" || o.status === "Out for Delivery") statusColor = "#17a2b8";
      if (o.status === "Delivered") statusColor = "#28a745";
      if (o.status === "Cancelled") statusColor = "#dc3545";

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
          <td style="padding: 1rem; font-weight: bold; color: var(--accent);">${o.transactionId || "CAG-ORD"}</td>
          <td style="padding: 1rem;">
            <div style="color: #fff; font-weight: 600;">${cust.fullName || "Guest Customer"}</div>
            <div style="color: var(--gray-400); font-size: 0.8rem;">${cust.email || ""} &bull; ${cust.phone || ""}</div>
          </td>
          <td style="padding: 1rem;">
            <div style="color: #fff;">${item.paintingTitle || "Original Artwork"}</div>
            <div style="color: var(--gray-400); font-size: 0.8rem;">Size: ${item.paintingSize || "Standard"} &bull; $${item.total || item.price || 0}</div>
          </td>
          <td style="padding: 1rem; color: var(--gray-300);">${ship.city || "Pokhara"}, ${ship.country || "Nepal"}</td>
          <td style="padding: 1rem;">
            <input type="text" class="tracking-input" data-id="${o.transactionId}" value="${o.trackingNumber || ""}" placeholder="Tracking #" style="padding: 0.4rem; font-size: 0.8rem; background: #1a1a1a; color: #fff; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; width: 130px;" />
          </td>
          <td style="padding: 1rem;">
            <select class="status-select-btn" data-id="${o.transactionId}" style="padding: 0.4rem; font-size: 0.8rem; background: #1a1a1a; color: ${statusColor}; border: 1px solid ${statusColor}; border-radius: var(--radius-pill); cursor: pointer;">
              <option value="Pending" ${o.status === "Pending" ? "selected" : ""}>Pending</option>
              <option value="Processing" ${o.status === "Processing" ? "selected" : ""}>Processing</option>
              <option value="Dispatched" ${o.status === "Dispatched" ? "selected" : ""}>Dispatched</option>
              <option value="Out for Delivery" ${o.status === "Out for Delivery" ? "selected" : ""}>Out for Delivery</option>
              <option value="Delivered" ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
              <option value="Cancelled" ${o.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
          </td>
          <td style="padding: 1rem; text-align: right;">
            <button class="btn btn-secondary open-email-modal-btn" data-id="${o.transactionId}" style="padding: 0.4rem 0.8rem; font-size: 0.78rem; border-color: var(--accent); color: var(--accent);">📧 Send Mail</button>
          </td>
        </tr>
      `;
    }).join("");

    attachOrderEventHandlers();
  }

  function attachOrderEventHandlers() {
    document.querySelectorAll(".status-select-btn").forEach((sel) => {
      sel.addEventListener("change", async (e) => {
        let id = sel.getAttribute("data-id"),
          newStatus = e.target.value,
          trackingInput = document.querySelector(`.tracking-input[data-id="${id}"]`),
          trackingNum = trackingInput ? trackingInput.value : "";
        await updateOrderStatus(id, newStatus, trackingNum);
      });
    });

    document.querySelectorAll(".open-email-modal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        let id = btn.getAttribute("data-id");
        let order = ordersList.find((o) => o.transactionId === id);
        if (order) openMailModal(order);
      });
    });
  }

  async function updateOrderStatus(transactionId, status, trackingNumber) {
    try {
      let res = await fetch(`/api/admin/orders/${transactionId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, trackingNumber })
      });
      let data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (e) {}
  }

  async function fetchBlogs() {
    try {
      let res = await fetch("/api/admin/blogs");
      let data = await res.json();
      if (data.success) {
        blogsList = data.blogs || [];
        renderBlogsTable();
      }
    } catch (e) {}
  }

  function renderBlogsTable() {
    let tbody = document.getElementById("blogsTableBody");
    if (!tbody) return;

    let filtered = blogsList.filter((b) => {
      let matchSearch = blogSearch === "" || b.title.toLowerCase().includes(blogSearch);
      let matchCat = blogCategory === "all" || b.category === blogCategory;
      let matchStat = blogStatus === "all" || b.status === blogStatus;
      return matchSearch && matchCat && matchStat;
    });

    let totalStat = document.getElementById("statTotalBlogs"),
      publishedStat = document.getElementById("statPublishedBlogs"),
      draftStat = document.getElementById("statDraftBlogs"),
      viewsStat = document.getElementById("statBlogViews");

    if (totalStat) totalStat.textContent = blogsList.length;
    if (publishedStat) publishedStat.textContent = blogsList.filter((b) => b.status === "Published").length;
    if (draftStat) draftStat.textContent = blogsList.filter((b) => b.status === "Draft").length;
    if (viewsStat) viewsStat.textContent = blogsList.reduce((acc, b) => acc + (b.views || 0), 0);

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 3rem; color: var(--gray-400);">No articles found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((b) => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
        <td style="padding: 0.85rem;"><img src="${b.image || "/photos/paintings-of-nepal-1.jpg"}" style="width: 50px; height: 40px; object-fit: cover; border-radius: 4px;" /></td>
        <td style="padding: 0.85rem;"><div style="color: #fff; font-weight: 600;">${b.title}</div><div style="color: var(--gray-400); font-size: 0.78rem;">/${b.slug}</div></td>
        <td style="padding: 0.85rem; color: var(--gray-300);">${b.category || "General"}</td>
        <td style="padding: 0.85rem; color: var(--gray-300);">${b.author || "Suman Wagle"}</td>
        <td style="padding: 0.85rem;"><span style="color: ${b.status === "Published" ? "#28a745" : "#f5a623"}; border: 1px solid ${b.status === "Published" ? "#28a745" : "#f5a623"}; padding: 0.2rem 0.6rem; border-radius: var(--radius-pill); font-size: 0.75rem;">${b.status}</span></td>
        <td style="padding: 0.85rem; color: var(--gray-400); font-size: 0.85rem;">${b.publishDate || ""}</td>
        <td style="padding: 0.85rem; color: var(--accent); font-weight: bold;">${b.views || 0}</td>
        <td style="padding: 0.85rem; text-align: right;">
          <div style="display: flex; gap: 0.35rem; justify-content: flex-end;">
            <button class="btn btn-secondary edit-blog-btn" data-id="${b.id}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">Edit</button>
            <a href="#/blog/${b.slug}" target="_blank" class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; color: var(--accent); border-color: var(--accent);">View</a>
            <button class="btn btn-secondary del-blog-btn" data-id="${b.id}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; color: #dc3545; border-color: #dc3545;">Delete</button>
          </div>
        </td>
      </tr>
    `).join("");

    attachBlogTableEvents();
  }

  function attachBlogTableEvents() {
    document.querySelectorAll(".edit-blog-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        let id = btn.getAttribute("data-id");
        let blog = blogsList.find((b) => String(b.id) === String(id));
        if (blog) openBlogEditor(blog);
      });
    });

    document.querySelectorAll(".del-blog-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        let id = btn.getAttribute("data-id");
        try {
          let res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
          let data = await res.json();
          if (data.success) {
            alert("Article deleted successfully!");
            fetchBlogs();
          } else {
            alert(data.error || "Failed to delete article.");
          }
        } catch (e) {
          alert("Network error deleting article.");
        }
      });
    });
  }

  let blogEditorModal = document.getElementById("blogEditorModal"),
    closeBlogModal = document.getElementById("closeBlogModal");

  document.getElementById("openNewBlogModalBtn")?.addEventListener("click", () => openBlogEditor(null));
  closeBlogModal && closeBlogModal.addEventListener("click", () => {
    if (blogEditorModal) blogEditorModal.style.display = "none";
  });

  function openBlogEditor(blog) {
    document.getElementById("editorBlogId").value = blog ? blog.id : "";
    document.getElementById("blogModalHeading").textContent = blog ? "Edit Article" : "Create Article";
    document.getElementById("editorTitle").value = blog ? blog.title : "";
    document.getElementById("editorSlug").value = blog ? blog.slug : "";
    document.getElementById("editorCategory").value = blog ? blog.category : "Live Wedding Paintings";
    document.getElementById("editorAuthor").value = blog ? blog.author : "Suman Wagle";
    let imgVal = blog && blog.image ? blog.image : "";
    document.getElementById("editorImage").value = imgVal;
    let bDrop = document.getElementById("blogDropContent"),
      bPrev = document.getElementById("blogPreviewContainer"),
      bImg = document.getElementById("blogPreviewImg"),
      bName = document.getElementById("blogFileName"),
      bFile = document.getElementById("blogFileInput");
    if (imgVal && bImg && bPrev && bDrop) {
      bImg.src = imgVal;
      if (bName) bName.textContent = imgVal.split("/").pop();
      bDrop.style.display = "none";
      bPrev.style.display = "block";
      if (bFile) bFile.style.display = "none";
    } else {
      if (bDrop) bDrop.style.display = "block";
      if (bPrev) bPrev.style.display = "none";
      if (bFile) bFile.style.display = "block";
      if (bImg) bImg.src = "";
      if (bName) bName.textContent = "";
    }
    document.getElementById("editorSummary").value = blog ? blog.summary : "";
    document.getElementById("blogContentEditor").innerHTML = blog ? blog.content : "<p>Start writing article content...</p>";
    document.getElementById("editorStatus").value = blog ? blog.status : "Published";
    document.getElementById("editorPublishDate").value = blog ? blog.publishDate : new Date().toISOString().split("T")[0];
    document.getElementById("editorFeatured").checked = blog ? !!blog.featured : false;

    if (blogEditorModal) blogEditorModal.style.display = "flex";
  }

  async function saveBlog(statusOverride) {
    let id = document.getElementById("editorBlogId").value,
      payload = {
        title: document.getElementById("editorTitle").value,
        slug: document.getElementById("editorSlug").value,
        category: document.getElementById("editorCategory").value,
        author: document.getElementById("editorAuthor").value,
        image: document.getElementById("editorImage").value,
        summary: document.getElementById("editorSummary").value,
        content: document.getElementById("blogContentEditor").innerHTML,
        seoTitle: document.getElementById("editorSeoTitle").value,
        keywords: document.getElementById("editorKeywords").value,
        metaDescription: document.getElementById("editorMetaDescription").value,
        status: statusOverride || document.getElementById("editorStatus").value,
        publishDate: document.getElementById("editorPublishDate").value,
        featured: document.getElementById("editorFeatured").checked
      };

    if (!payload.title) {
      alert("Title is required!");
      return;
    }

    try {
      let url = id ? `/api/admin/blogs/${id}` : "/api/admin/blogs",
        method = id ? "PUT" : "POST";
      let res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      let data = await res.json();
      if (data.success) {
        alert(`Article ${id ? "updated" : "published"} successfully!`);
        if (blogEditorModal) blogEditorModal.style.display = "none";
        fetchBlogs();
      }
    } catch (e) {
      alert("Failed to save article.");
    }
  }

  document.getElementById("saveDraftBtn")?.addEventListener("click", (e) => { e.preventDefault(); saveBlog("Draft"); });
  document.getElementById("publishNowBtn")?.addEventListener("click", (e) => { e.preventDefault(); saveBlog("Published"); });

  // ========================================================================
  // DRAG & DROP IMAGE UPLOAD FOR SHOP
  // ========================================================================
  function setupDropZone(dropZoneId, fileInputId, dropContentId, previewContainerId, previewImgId, fileNameId, removeBtnId) {
    let dropZone = document.getElementById(dropZoneId),
      fileInput = document.getElementById(fileInputId),
      dropContent = document.getElementById(dropContentId),
      previewContainer = document.getElementById(previewContainerId),
      previewImg = document.getElementById(previewImgId),
      fileName = document.getElementById(fileNameId),
      removeBtn = document.getElementById(removeBtnId);

    if (!dropZone || !fileInput) return;

    ['dragenter', 'dragover'].forEach(evt => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.style.borderColor = 'var(--accent)';
        dropZone.style.background = 'rgba(154,176,126,0.08)';
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.style.borderColor = 'rgba(154,176,126,0.4)';
        dropZone.style.background = 'rgba(154,176,126,0.03)';
      });
    });

    dropZone.addEventListener('drop', (e) => {
      let files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        showPreview(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) showPreview(fileInput.files[0]);
    });

    function showPreview(file) {
      if (!file.type.startsWith('image/')) { alert('Please select an image file.'); return; }
      let reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        fileName.textContent = file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
        dropContent.style.display = 'none';
        previewContainer.style.display = 'block';
        fileInput.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = '';
        previewImg.src = '';
        fileName.textContent = '';
        dropContent.style.display = 'block';
        previewContainer.style.display = 'none';
        fileInput.style.display = 'block';
      });
    }
  }

  setupDropZone('shopDropZone', 'shopFileInput', 'shopDropContent', 'shopPreviewContainer', 'shopPreviewImg', 'shopFileName', 'shopRemoveImg');
  setupDropZone('portfolioDropZone', 'portfolioFileInput', 'portfolioDropContent', 'portfolioPreviewContainer', 'portfolioPreviewImg', 'portfolioFileName', 'portfolioRemoveImg');

  // ========================================================================
  // DRAG & DROP FOR BLOG COVER IMAGE (with instant server upload)
  // ========================================================================
  let blogDropZone = document.getElementById("blogDropZone"),
    blogFileInput = document.getElementById("blogFileInput"),
    blogDropContent = document.getElementById("blogDropContent"),
    blogPreviewContainer = document.getElementById("blogPreviewContainer"),
    blogPreviewImg = document.getElementById("blogPreviewImg"),
    blogFileName = document.getElementById("blogFileName"),
    blogRemoveImg = document.getElementById("blogRemoveImg"),
    editorImage = document.getElementById("editorImage");

  if (blogDropZone && blogFileInput) {
    ['dragenter', 'dragover'].forEach(evt => {
      blogDropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        blogDropZone.style.borderColor = 'var(--accent)';
        blogDropZone.style.background = 'rgba(154,176,126,0.08)';
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      blogDropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        blogDropZone.style.borderColor = 'rgba(154,176,126,0.4)';
        blogDropZone.style.background = 'rgba(154,176,126,0.03)';
      });
    });

    async function handleBlogFile(file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      let reader = new FileReader();
      reader.onload = (e) => {
        if (blogPreviewImg) blogPreviewImg.src = e.target.result;
        if (blogFileName) blogFileName.textContent = file.name + ' (Uploading...)';
        if (blogDropContent) blogDropContent.style.display = 'none';
        if (blogPreviewContainer) blogPreviewContainer.style.display = 'block';
        if (blogFileInput) blogFileInput.style.display = 'none';
      };
      reader.readAsDataURL(file);

      let formData = new FormData();
      formData.append('image', file);
      try {
        let res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        let data = await res.json();
        if (data.success && data.url) {
          if (editorImage) editorImage.value = data.url;
          if (blogFileName) blogFileName.textContent = file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB) ✓ Uploaded';
        } else {
          alert(data.error || 'Failed to upload image.');
        }
      } catch (err) {
        alert('Failed to upload image to server.');
      }
    }

    blogDropZone.addEventListener('drop', (e) => {
      let files = e.dataTransfer.files;
      if (files.length > 0) {
        blogFileInput.files = files;
        handleBlogFile(files[0]);
      }
    });

    blogFileInput.addEventListener('change', () => {
      if (blogFileInput.files.length > 0) handleBlogFile(blogFileInput.files[0]);
    });

    if (blogRemoveImg) {
      blogRemoveImg.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        blogFileInput.value = '';
        if (editorImage) editorImage.value = '';
        if (blogPreviewImg) blogPreviewImg.src = '';
        if (blogFileName) blogFileName.textContent = '';
        if (blogDropContent) blogDropContent.style.display = 'block';
        if (blogPreviewContainer) blogPreviewContainer.style.display = 'none';
        if (blogFileInput) blogFileInput.style.display = 'block';
      });
    }
  }

  // Blog Rich Text Toolbar Actions
  document.querySelectorAll(".toolbar-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let cmd = btn.getAttribute("data-cmd"),
        val = btn.getAttribute("data-val") || null;
      document.execCommand(cmd, false, val);
      document.getElementById("blogContentEditor")?.focus();
    });
  });

  document.getElementById("toolbarLinkBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    let url = prompt("Enter the link URL:", "https://");
    if (url) document.execCommand("createLink", false, url);
  });

  document.getElementById("toolbarImgBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    let url = prompt("Enter image URL:", "/photos/paintings-of-nepal-1.jpg");
    if (url) document.execCommand("insertImage", false, url);
  });

  // Shop & Portfolio Modal Triggers
  document.getElementById('openNewShopModalBtn')?.addEventListener('click', () => {
    let m = document.getElementById('shopModal');
    if (m) m.style.display = 'flex';
  });
  document.getElementById('closeShopModal')?.addEventListener('click', () => {
    let m = document.getElementById('shopModal');
    if (m) m.style.display = 'none';
  });

  document.getElementById('openNewPortfolioModalBtn')?.addEventListener('click', () => {
    let m = document.getElementById('portfolioModal');
    if (m) m.style.display = 'flex';
  });
  document.getElementById('closePortfolioModal')?.addEventListener('click', () => {
    let m = document.getElementById('portfolioModal');
    if (m) m.style.display = 'none';
  });

  // ========================================================================
  // SHOP FORM SUBMISSION (FormData with file)
  // ========================================================================
  let shopForm = document.getElementById('addShopForm');
  shopForm && shopForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(shopForm);
    let submitBtn = shopForm.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Saving...'; }

    try {
      let res = await fetch('/api/admin/shop', { method: 'POST', body: formData });
      let data = await res.json();
      if (data.success) {
        alert('Shop product added successfully!');
        shopForm.reset();
        let sc = document.getElementById('shopDropContent'), sp = document.getElementById('shopPreviewContainer');
        if (sc) sc.style.display = 'block';
        if (sp) sp.style.display = 'none';
        let sf = document.getElementById('shopFileInput');
        if (sf) sf.style.display = 'block';
        let sm = document.getElementById('shopModal');
        if (sm) sm.style.display = 'none';
        fetchAdminShopItems();
      } else {
        alert(data.error || 'Failed to add shop product.');
      }
    } catch (err) {
      alert('Failed to save shop product.');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '+ Save Shop Item'; }
    }
  });

  // ========================================================================
  // SHOP ITEMS MANAGEMENT & DELETION
  // ========================================================================
  let shopItemsList = [], shopSearch = '', shopCategory = 'all', shopStatus = 'all';

  document.getElementById('shopSearchInput')?.addEventListener('input', (e) => {
    shopSearch = e.target.value.toLowerCase();
    renderShopTable();
  });
  document.getElementById('shopCategoryFilter')?.addEventListener('change', (e) => {
    shopCategory = e.target.value.toLowerCase();
    renderShopTable();
  });
  document.getElementById('shopStatusFilter')?.addEventListener('change', (e) => {
    shopStatus = e.target.value;
    renderShopTable();
  });

  async function fetchAdminShopItems() {
    try {
      let res = await fetch('/api/shop');
      let data = await res.json();
      if (data.success) {
        shopItemsList = data.items || [];
        renderShopTable();
      }
    } catch (e) {}
  }

  function renderShopTable() {
    let tbody = document.getElementById("shopItemsTableBody");
    if (!tbody) return;

    let statTotal = document.getElementById("statTotalShop"),
      statInStock = document.getElementById("statInStockShop"),
      statSale = document.getElementById("statSaleShop"),
      statCat = document.getElementById("statCategoriesShop");

    if (statTotal) statTotal.textContent = shopItemsList.length;
    if (statInStock) statInStock.textContent = shopItemsList.filter(i => i.inStock !== false).length;
    if (statSale) statSale.textContent = shopItemsList.filter(i => i.onSale).length;
    if (statCat) statCat.textContent = new Set(shopItemsList.map(i => (i.category || 'original').toLowerCase())).size;

    let filtered = shopItemsList.filter(item => {
      let matchSearch = shopSearch === '' || (item.title && item.title.toLowerCase().includes(shopSearch));
      let matchCat = shopCategory === 'all' || (item.category && item.category.toLowerCase().includes(shopCategory));
      let matchStat = shopStatus === 'all' || (shopStatus === 'instock' ? item.inStock !== false : item.inStock === false);
      return matchSearch && matchCat && matchStat;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--gray-400);">No shop products found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((item) => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
        <td style="padding: 0.85rem;"><img src="${item.image || '/photos/paintings-of-nepal-1.jpg'}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px;" /></td>
        <td style="padding: 0.85rem;"><div style="color: #fff; font-weight: 600;">${item.title}</div><div style="color: var(--gray-400); font-size: 0.78rem;">${item.dimensions || ''}</div></td>
        <td style="padding: 0.85rem; color: var(--gray-300); text-transform: capitalize;">${item.category || 'Original'}</td>
        <td style="padding: 0.85rem; color: var(--gray-300);">${item.medium || 'Oil on Canvas'}</td>
        <td style="padding: 0.85rem; color: var(--accent); font-weight: bold;">$${item.price}</td>
        <td style="padding: 0.85rem;"><span style="color: ${item.inStock !== false ? '#28a745' : '#dc3545'}; border: 1px solid ${item.inStock !== false ? '#28a745' : '#dc3545'}; padding: 0.2rem 0.6rem; border-radius: var(--radius-pill); font-size: 0.75rem;">${item.inStock !== false ? 'In Stock' : 'Sold Out'}</span></td>
        <td style="padding: 0.85rem; text-align: right;">
          <button class="btn btn-secondary del-shop-btn" data-id="${item.id}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; color: #dc3545; border-color: #dc3545; cursor: pointer;">🗑️ Delete</button>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".del-shop-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this shop product?")) return;
        let id = btn.getAttribute("data-id");
        try {
          let res = await fetch(`/api/admin/shop/${id}`, { method: "DELETE" });
          let data = await res.json();
          if (data.success) {
            alert("Shop product deleted successfully!");
            fetchAdminShopItems();
          } else {
            alert(data.error || "Failed to delete shop product.");
          }
        } catch (err) {
          alert("Network error.");
        }
      });
    });
  }

  // ========================================================================
  // PORTFOLIO FORM SUBMISSION (FormData with file)
  // ========================================================================
  let portfolioForm = document.getElementById('addPortfolioForm');
  portfolioForm && portfolioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(portfolioForm);
    let submitBtn = portfolioForm.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Saving...'; }

    try {
      let res = await fetch('/api/admin/portfolio', { method: 'POST', body: formData });
      let data = await res.json();
      if (data.success) {
        alert('Portfolio artwork added successfully!');
        portfolioForm.reset();
        let pc = document.getElementById('portfolioDropContent'), pp = document.getElementById('portfolioPreviewContainer');
        if (pc) pc.style.display = 'block';
        if (pp) pp.style.display = 'none';
        let pf = document.getElementById('portfolioFileInput');
        if (pf) pf.style.display = 'block';
        let pm = document.getElementById('portfolioModal');
        if (pm) pm.style.display = 'none';
        fetchAdminPortfolioItems();
      } else {
        alert(data.error || 'Failed to add portfolio artwork.');
      }
    } catch (err) {
      alert('Failed to save portfolio artwork.');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '+ Save Portfolio Masterpiece'; }
    }
  });

  // ========================================================================
  // PORTFOLIO ITEMS MANAGEMENT & DELETION
  // ========================================================================
  let portfolioItemsList = [], portfolioSearch = '', portfolioCategory = 'all', portfolioStatus = 'all';

  document.getElementById('portfolioSearchInput')?.addEventListener('input', (e) => {
    portfolioSearch = e.target.value.toLowerCase();
    renderPortfolioTable();
  });
  document.getElementById('portfolioCategoryFilter')?.addEventListener('change', (e) => {
    portfolioCategory = e.target.value.toLowerCase();
    renderPortfolioTable();
  });
  document.getElementById('portfolioStatusFilter')?.addEventListener('change', (e) => {
    portfolioStatus = e.target.value;
    renderPortfolioTable();
  });

  async function fetchAdminPortfolioItems() {
    try {
      let res = await fetch('/api/portfolio');
      let data = await res.json();
      if (data.success) {
        portfolioItemsList = data.items || [];
        renderPortfolioTable();
      }
    } catch (e) {}
  }

  function renderPortfolioTable() {
    let tbody = document.getElementById("portfolioItemsTableBody");
    if (!tbody) return;

    let statTotal = document.getElementById("statTotalPortfolio"),
      statAvail = document.getElementById("statAvailablePortfolio"),
      statSold = document.getElementById("statSoldPortfolio"),
      statFeat = document.getElementById("statFeaturedPortfolio");

    if (statTotal) statTotal.textContent = portfolioItemsList.length;
    if (statAvail) statAvail.textContent = portfolioItemsList.filter(i => i.available !== false).length;
    if (statSold) statSold.textContent = portfolioItemsList.filter(i => i.available === false).length;
    if (statFeat) statFeat.textContent = new Set(portfolioItemsList.map(i => (i.category || 'landscape').toLowerCase())).size;

    let filtered = portfolioItemsList.filter(item => {
      let matchSearch = portfolioSearch === '' || (item.title && item.title.toLowerCase().includes(portfolioSearch));
      let matchCat = portfolioCategory === 'all' || (item.category && item.category.toLowerCase().includes(portfolioCategory));
      let matchStat = portfolioStatus === 'all' || (portfolioStatus === 'available' ? item.available !== false : item.available === false);
      return matchSearch && matchCat && matchStat;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--gray-400);">No portfolio artworks found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((item) => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
        <td style="padding: 0.85rem;"><img src="${item.image || '/photos/paintings-of-nepal-2.jpg'}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px;" /></td>
        <td style="padding: 0.85rem;"><div style="color: #fff; font-weight: 600;">${item.title}</div><div style="color: var(--gray-400); font-size: 0.78rem;">${item.dimensions || ''}</div></td>
        <td style="padding: 0.85rem; color: var(--gray-300); text-transform: capitalize;">${item.category || 'Landscape'}</td>
        <td style="padding: 0.85rem; color: var(--gray-300);">${item.medium || item.technique || 'Oil on Canvas'}</td>
        <td style="padding: 0.85rem; color: var(--gray-400);">${item.year || 2024}</td>
        <td style="padding: 0.85rem; color: var(--accent); font-weight: bold;">$${item.price || 0}</td>
        <td style="padding: 0.85rem;"><span style="color: ${item.available !== false ? '#28a745' : '#dc3545'}; border: 1px solid ${item.available !== false ? '#28a745' : '#dc3545'}; padding: 0.2rem 0.6rem; border-radius: var(--radius-pill); font-size: 0.75rem;">${item.available !== false ? 'Available' : 'Sold'}</span></td>
        <td style="padding: 0.85rem; text-align: right;">
          <button class="btn btn-secondary del-portfolio-btn" data-id="${item.id}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; color: #dc3545; border-color: #dc3545; cursor: pointer;">🗑️ Delete</button>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".del-portfolio-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this portfolio artwork?")) return;
        let id = btn.getAttribute("data-id");
        try {
          let res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
          let data = await res.json();
          if (data.success) {
            alert("Portfolio artwork deleted successfully!");
            fetchAdminPortfolioItems();
          } else {
            alert(data.error || "Failed to delete artwork.");
          }
        } catch (err) {
          alert("Network error.");
        }
      });
    });
  }

  // ========================================================================
  // CONTACT MESSAGES MODULE
  // ========================================================================
  let messagesList = [];

  async function fetchMessages() {
    try {
      let res = await fetch('/api/admin/messages');
      let data = await res.json();
      if (data.success) {
        messagesList = data.messages || [];
        renderMessages();
      }
    } catch (e) {}
  }

  function renderMessages() {
    let tbody = document.getElementById('messagesTableBody');
    let badge = document.getElementById('msgCountBadge');
    if (!tbody) return;
    if (badge) badge.textContent = messagesList.length + ' messages';

    if (messagesList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 3rem; color: var(--gray-400);">No messages yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = messagesList.map((m) => {
      let statusColor = m.status === 'Unread' ? '#f5a623' : m.status === 'Replied' ? '#28a745' : '#17a2b8';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
          <td style="padding: 0.85rem; font-weight: bold; color: var(--accent); font-size: 0.82rem;">${m.id}</td>
          <td style="padding: 0.85rem;">
            <div style="color: #fff; font-weight: 600;">${m.name}</div>
            <div style="color: var(--gray-400); font-size: 0.78rem;">${m.email} ${m.phone ? '• ' + m.phone : ''}</div>
          </td>
          <td style="padding: 0.85rem; color: var(--gray-200);">${m.subject}</td>
          <td style="padding: 0.85rem; color: var(--gray-300); font-size: 0.85rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.message}</td>
          <td style="padding: 0.85rem; color: var(--gray-400); font-size: 0.82rem;">${new Date(m.createdAt).toLocaleString()}</td>
          <td style="padding: 0.85rem;">
            <select class="msg-status-select" data-id="${m.id}" style="padding: 0.35rem 0.6rem; font-size: 0.78rem; background: #1a1a1a; color: ${statusColor}; border: 1px solid ${statusColor}; border-radius: var(--radius-pill); cursor: pointer;">
              <option value="Unread" ${m.status === 'Unread' ? 'selected' : ''}>Unread</option>
              <option value="Read" ${m.status === 'Read' ? 'selected' : ''}>Read</option>
              <option value="Replied" ${m.status === 'Replied' ? 'selected' : ''}>Replied</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.msg-status-select').forEach((sel) => {
      sel.addEventListener('change', async (e) => {
        let id = sel.getAttribute('data-id');
        try {
          await fetch(`/api/admin/messages/${id}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.target.value })
          });
          fetchMessages();
        } catch (err) {}
      });
    });
  }

  // ========================================================================
  // WORKSHOP BOOKINGS MODULE
  // ========================================================================
  let workshopsList = [];

  async function fetchWorkshops() {
    try {
      let res = await fetch('/api/admin/workshops');
      let data = await res.json();
      if (data.success) {
        workshopsList = data.bookings || [];
        renderWorkshops();
      }
    } catch (e) {}
  }

  function renderWorkshops() {
    let tbody = document.getElementById('workshopsTableBody');
    let badge = document.getElementById('workshopCountBadge');
    if (!tbody) return;
    if (badge) badge.textContent = workshopsList.length + ' bookings';

    if (workshopsList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 3rem; color: var(--gray-400);">No workshop bookings yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = workshopsList.map((w) => {
      let statusColor = w.status === 'Pending' ? '#f5a623' : w.status === 'Confirmed' ? '#28a745' : w.status === 'Cancelled' ? '#dc3545' : '#17a2b8';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
          <td style="padding: 0.85rem; font-weight: bold; color: var(--accent); font-size: 0.82rem;">${w.id}</td>
          <td style="padding: 0.85rem; color: #fff; font-weight: 600;">${w.name}</td>
          <td style="padding: 0.85rem;">
            <div style="color: var(--gray-200); font-size: 0.85rem;">${w.email}</div>
            <div style="color: var(--gray-400); font-size: 0.78rem;">${w.phone || '-'}</div>
          </td>
          <td style="padding: 0.85rem; color: var(--accent); font-weight: 600;">${w.type} ($${w.type === 'Group' ? '100' : '20'})</td>
          <td style="padding: 0.85rem; color: var(--gray-200);">${w.date || '-'} @ ${w.time || '-'}</td>
          <td style="padding: 0.85rem; color: #fff; text-align: center;">${w.people}</td>
          <td style="padding: 0.85rem; color: var(--gray-300); font-size: 0.85rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${w.requests || '-'}</td>
          <td style="padding: 0.85rem;">
            <select class="workshop-status-select" data-id="${w.id}" style="padding: 0.35rem 0.6rem; font-size: 0.78rem; background: #1a1a1a; color: ${statusColor}; border: 1px solid ${statusColor}; border-radius: var(--radius-pill); cursor: pointer;">
              <option value="Pending" ${w.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Confirmed" ${w.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Completed" ${w.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${w.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.workshop-status-select').forEach((sel) => {
      sel.addEventListener('change', async (e) => {
        let id = sel.getAttribute('data-id');
        try {
          await fetch(`/api/admin/workshops/${id}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.target.value })
          });
          fetchWorkshops();
        } catch (err) {}
      });
    });
  }

  // Check Auth on Init
  checkSession();
}

export { init, render };