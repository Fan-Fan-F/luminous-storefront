// Luminous Storefront — 零依赖原生 JS
(function () {
  "use strict";

  const state = {
    keyword: "",
    category: "全部",
    sort: "featured",
    cart: loadCart(),
  };

  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");
  const resultInfo = document.getElementById("resultInfo");
  const chipsBox = document.getElementById("categoryChips");
  const cartDrawer = document.getElementById("cartDrawer");

  /* ---------- 筛选 / 排序 ---------- */
  function getVisibleProducts() {
    let list = PRODUCTS.filter(p => {
      const matchCategory = state.category === "全部" || p.category === state.category;
      const kw = state.keyword.trim().toLowerCase();
      const matchKw = !kw || [p.name, p.brand, p.category].join(" ").toLowerCase().includes(kw);
      return matchCategory && matchKw;
    });

    const sorters = {
      "featured":   (a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.reviews - a.reviews,
      "price-asc":  (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "rating":     (a, b) => b.rating - a.rating,
      "newest":     (a, b) => b.createdAt.localeCompare(a.createdAt),
    };
    return list.sort(sorters[state.sort] || sorters.featured);
  }

  /* ---------- 渲染 ---------- */
  function renderChips() {
    chipsBox.innerHTML = CATEGORIES.map(c =>
      `<button class="chip ${c === state.category ? "active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");
  }

  function starText(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function renderGrid() {
    const list = getVisibleProducts();
    resultInfo.textContent = `共 ${list.length} 件商品` + (state.keyword ? ` · 搜索“${state.keyword}”` : "");
    emptyState.hidden = list.length > 0;

    grid.innerHTML = list.map(p => `
      <article class="card">
        <div class="card-thumb" style="background:linear-gradient(135deg,hsl(${p.hue},70%,92%),hsl(${p.hue + 30},60%,85%))">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          <span>${p.emoji}</span>
        </div>
        <div class="card-body">
          <span class="card-brand">${p.brand}</span>
          <h3 class="card-name">${p.name}</h3>
          <span class="card-rating">${starText(p.rating)} ${p.rating} <span>(${p.reviews})</span></span>
          <div class="card-bottom">
            <span class="price">¥${p.price}${p.originalPrice ? `<small>¥${p.originalPrice}</small>` : ""}</span>
            <button class="add-btn" data-add="${p.id}" aria-label="加入购物车">＋</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  /* ---------- 购物车 ---------- */
  function loadCart() {
    try { return JSON.parse(localStorage.getItem("luminous-cart")) || {}; }
    catch { return {}; }
  }
  function saveCart() {
    localStorage.setItem("luminous-cart", JSON.stringify(state.cart));
  }
  function cartEntries() {
    return Object.entries(state.cart)
      .map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id === +id), qty }))
      .filter(e => e.product);
  }

  function renderCart() {
    const entries = cartEntries();
    const count = entries.reduce((s, e) => s + e.qty, 0);
    const total = entries.reduce((s, e) => s + e.qty * e.product.price, 0);

    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartTotal").textContent = "¥" + total.toFixed(2);

    const box = document.getElementById("cartItems");
    if (!entries.length) {
      box.innerHTML = `<p class="cart-empty">购物车是空的，去挑几件好物吧～</p>`;
      return;
    }
    box.innerHTML = entries.map(({ product: p, qty }) => `
      <div class="cart-item">
        <div class="cart-item-thumb" style="background:hsl(${p.hue},70%,92%)">${p.emoji}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name}</p>
          <p class="cart-item-price">¥${p.price}</p>
        </div>
        <div class="qty-ctrl">
          <button data-dec="${p.id}">−</button>
          <span>${qty}</span>
          <button data-inc="${p.id}">＋</button>
        </div>
      </div>
    `).join("");
  }

  function changeQty(id, delta) {
    state.cart[id] = (state.cart[id] || 0) + delta;
    if (state.cart[id] <= 0) delete state.cart[id];
    saveCart();
    renderCart();
  }

  /* ---------- 事件 ---------- */
  document.getElementById("searchInput").addEventListener("input", e => {
    state.keyword = e.target.value;
    renderGrid();
  });

  document.getElementById("sortSelect").addEventListener("change", e => {
    state.sort = e.target.value;
    renderGrid();
  });

  chipsBox.addEventListener("click", e => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    state.category = btn.dataset.cat;
    renderChips();
    renderGrid();
  });

  grid.addEventListener("click", e => {
    const btn = e.target.closest("[data-add]");
    if (btn) changeQty(+btn.dataset.add, 1);
  });

  document.getElementById("cartItems").addEventListener("click", e => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) changeQty(+inc.dataset.inc, 1);
    if (dec) changeQty(+dec.dataset.dec, -1);
  });

  document.getElementById("cartBtn").addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  });
  document.getElementById("closeCart").addEventListener("click", closeDrawer);
  cartDrawer.addEventListener("click", e => { if (e.target === cartDrawer) closeDrawer(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  function closeDrawer() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }

  /* ---------- 启动 ---------- */
  renderChips();
  renderGrid();
  renderCart();
})();
