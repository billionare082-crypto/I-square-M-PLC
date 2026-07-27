// ==========================================================
// Render asset cards from products.js
// ==========================================================
function formatPrice(n) {
  return n.toLocaleString("en-US");
}

function buildCard(product) {
  const card = document.createElement("article");
  card.className = "asset-card";

  const hasMultiple = product.images.length > 1;

  const imagesHtml = product.images
    .map((src, i) => <img src="${src}" alt="${product.name} — photo ${i + 1}" class="${i === 0 ? "is-active" : ""}" data-index="${i}">)
    .join("");

  const dotsHtml = product.images
    .map((_, i) => <button class="filmstrip-dot ${i === 0 ? "is-active" : ""}" data-goto="${i}" aria-label="Show photo ${i + 1}"></button>)
    .join("");

  const specsHtml = product.specs.map((s) => <li>${s}</li>).join("");

  const negotiableHtml = product.negotiable ? <span class="negotiable">(negotiable)</span> : "";

  card.innerHTML = 
    <div class="filmstrip" data-product="${product.id}">
      ${hasMultiple ? <span class="asset-count">1 / ${product.images.length}</span> : ""}
      ${imagesHtml}
      ${hasMultiple ? 
      <div class="filmstrip-nav">
        <button class="filmstrip-btn" data-dir="-1" aria-label="Previous photo">&#8249;</button>
        <button class="filmstrip-btn" data-dir="1" aria-label="Next photo">&#8250;</button>
      </div>
      <div class="filmstrip-dots">${dotsHtml}</div> : ""}
    </div>
    <div class="asset-perf"></div>
    <div class="asset-body">
      <span class="asset-tagno">ASSET NO. ${product.assetNo}</span>
      <h3>${product.name}</h3>
      <p class="asset-tagline">${product.tagline}</p>
      <ul class="asset-specs">${specsHtml}</ul>
      <p class="asset-condition">${product.condition}</p>
      <div class="asset-footer">
        <span class="asset-price">${CURRENCY} ${formatPrice(product.price)} ${negotiableHtml}</span>
        <a class="asset-cta" href="#contact">Ask about this unit</a>
      </div>
    </div>
  ;

  return card;
}

function renderProducts() {
  const grid = document.getElementById("assetGrid");
  if (!grid) return;
  PRODUCTS.forEach((product) => grid.appendChild(buildCard(product)));
}

// ==========================================================
// Filmstrip interaction (prev/next + dots) — event delegation
// ==========================================================
function setActiveImage(filmstrip, index) {
  const images = filmstrip.querySelectorAll("img");
  const dots = filmstrip.querySelectorAll(".filmstrip-dot");
  const count = images.length;
  const clamped = ((index % count) + count) % count;

  images.forEach((img, i) => img.classList.toggle("is-active", i === clamped));
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === clamped));

  const counter = filmstrip.querySelector(".asset-count");
  if (counter) counter.textContent = ${clamped + 1} / ${count};

  filmstrip.dataset.current = String(clamped);
}

function initFilmstrips() {
  document.querySelectorAll(".filmstrip").forEach((filmstrip) => {
    filmstrip.dataset.current = "0";

    filmstrip.querySelectorAll(".filmstrip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = parseInt(filmstrip.dataset.current || "0", 10);
        const dir = parseInt(btn.dataset.dir, 10);
        setActiveImage(filmstrip, current + dir);
      });
    });

    filmstrip.querySelectorAll(".filmstrip-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        setActiveImage(filmstrip, parseInt(dot.dataset.goto, 10));
      });
    });
  });
}

// ==========================================================
// Hero tilt effect (pointer-driven fake-3D depth)
// ==========================================================
function initHeroTilt() {
  const tilt = document.getElementById("heroTilt");
  if (!tilt) return;

  const maxTilt = 8; // degrees
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return; tilt.addEventListener("pointermove", (e) => {
    const rect = tilt.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tilt.style.transform = rotateY(${px * maxTilt * 2}deg) rotateX(${-py * maxTilt * 2}deg);
  });

  tilt.addEventListener("pointerleave", () => {
    tilt.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

// ==========================================================
// Init
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initFilmstrips();
  initHeroTilt();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
