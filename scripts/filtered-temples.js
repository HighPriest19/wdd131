// filtered-temples.js
// Renders temple cards from an array, supports filters, lazy-loading images,
// hamburger toggle, and footer dates.

// ---------- Footer + Hamburger (keeps behavior from your original temples.js) ----------
const currentYearEl = document.getElementById("currentyear");
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) lastModifiedEl.textContent = "Last Modified: " + document.lastModified;

const menuBtn = document.getElementById("menu");
const nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    const open = nav.classList.contains("open");
    menuBtn.textContent = open ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(open));
  });
}

// ---------- Helpers ----------
function getYearFromString(dateStr) {
  // robust year extraction: find the first 4-digit number
  if (!dateStr) return NaN;
  const m = dateStr.match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : NaN;
}

// ---------- Temple array (local filenames + a few CDN entries) ----------
const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/Aba-Nigeria-Temple.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "images/Accra-Ghana-Temple.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, June, 9",
    area: 42000,
    imageUrl: "images/Rome-Italy-Temple.jpeg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 12000,
    imageUrl: "images/Paris-France-Temple.jpeg"
  },
  {
    templeName: "Lagos Nigeria Temple",
    location: "Lagos, Nigeria",
    dedicated: "2019, May, 12",
    area: 17000,
    imageUrl: "images/Lagos-Nigeria-Temple.jpg"
  },
  {
    templeName: "Sydney Australia Temple",
    location: "Sydney, Australia",
    dedicated: "2000, June, 18",
    area: 30000,
    imageUrl: "images/The-Sydney-Australia-LDS-temple.jpeg"
  },
  {
    templeName: "Kyiv Ukraine Temple",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 5",
    area: 16000,
    imageUrl: "images/Kiev-Temple.jpeg"
  },
  // three additional temples from CDN (absolute URLs) - you may replace with local optimized images
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Washington D.C. Temple",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Mexico City Temple",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  }
];

// ---------- DOM refs ----------
const container = document.getElementById("temple-cards");
if (!container) {
  console.error("No #temple-cards element found. Make sure filtered-temples.html has: <section id=\"temple-cards\" class=\"gallery\"></section>");
}

// ---------- Render function ----------
function displayTemples(list) {
  if (!container) return;
  container.innerHTML = "";
  if (!list || list.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No temples match that filter.";
    empty.style.textAlign = "center";
    container.appendChild(empty);
    return;
  }

  list.forEach(t => {
    const fig = document.createElement("figure");

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = t.templeName + " - " + t.location;
    img.loading = "lazy";
    img.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `<strong>${t.templeName}</strong><span class="meta">${t.location}<br>Dedicated: ${t.dedicated} • Area: ${t.area.toLocaleString()} sq ft</span>`;

    fig.appendChild(img);
    fig.appendChild(caption);
    container.appendChild(fig);
  });
}

// ---------- Filter logic ----------
function setActiveButton(id) {
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function showAll() {
  displayTemples(temples);
  setActiveButton("home");
}

function showOld() {
  const filtered = temples.filter(t => getYearFromString(t.dedicated) < 1900);
  displayTemples(filtered);
  setActiveButton("old");
}

function showNew() {
  const filtered = temples.filter(t => getYearFromString(t.dedicated) > 2000);
  displayTemples(filtered);
  setActiveButton("new");
}

function showLarge() {
  const filtered = temples.filter(t => t.area > 90000);
  displayTemples(filtered);
  setActiveButton("large");
}

function showSmall() {
  const filtered = temples.filter(t => t.area < 10000);
  displayTemples(filtered);
  setActiveButton("small");
}

// ---------- Event bindings ----------
const homeBtn = document.getElementById("home");
const oldBtn = document.getElementById("old");
const newBtn = document.getElementById("new");
const largeBtn = document.getElementById("large");
const smallBtn = document.getElementById("small");

if (homeBtn) homeBtn.addEventListener("click", (e) => { e.preventDefault(); showAll(); });
if (oldBtn) oldBtn.addEventListener("click", (e) => { e.preventDefault(); showOld(); });
if (newBtn) newBtn.addEventListener("click", (e) => { e.preventDefault(); showNew(); });
if (largeBtn) largeBtn.addEventListener("click", (e) => { e.preventDefault(); showLarge(); });
if (smallBtn) smallBtn.addEventListener("click", (e) => { e.preventDefault(); showSmall(); });

// initial view
showAll();
