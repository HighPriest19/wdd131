// scripts.js - FoodieFind interactions

// --- Data (recipes) ---
const RECIPES = [
  { id: "r1", name: "Classic Burger", type: "quick", time: 20, image: "images/recipe1.jpg" },
  { id: "r2", name: "Veggie Stir Fry", type: "vegetarian", time: 25, image: "images/recipe2.jpg" },
  { id: "r3", name: "Chocolate Cake", type: "dessert", time: 45, image: "images/recipe3.jpg" },
  { id: "r4", name: "Creamy Pasta", type: "quick", time: 30, image: "images/recipe4.jpg" },
  { id: "r5", name: "Hearty Soup", type: "vegetarian", time: 15, image: "images/recipe5.jpg" }
];

// --- helpers ---
const byId = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

// --- render card ---
function buildCard(r){
  const node = document.createElement('article');
  node.className = 'card';
  node.innerHTML = `
    <img loading="lazy" src="${r.image}" alt="${r.name}">
    <h3>${r.name}</h3>
    <p class="muted">${r.time} mins • ${r.type}</p>
  `;
  return node;
}

// --- populate featured (index) ---
function populateFeatured(){
  const target = byId('featured-grid');
  if(!target) return;
  target.innerHTML = '';
  RECIPES.slice(0,3).forEach(r => target.appendChild(buildCard(r)));
}

// --- populate recipe grid (recipes.html) ---
function populateRecipes(filter='all', sort='default'){
  const container = byId('recipe-grid');
  if(!container) return;
  let list = RECIPES.slice();
  if(filter !== 'all') list = list.filter(x => x.type === filter);
  if(sort === 'time-asc') list.sort((a,b)=> a.time - b.time);
  if(sort === 'time-desc') list.sort((a,b)=> b.time - a.time);
  container.innerHTML = '';
  list.forEach(r => container.appendChild(buildCard(r)));
}

// --- contact form handler ---
function initContactForm(){
  const form = byId('suggest-form');
  if(!form) return;
  const feedback = byId('confirm');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      type: form.type.value,
      details: form.details.value.trim(),
      time: new Date().toISOString()
    };
    const stored = JSON.parse(localStorage.getItem('foodie_suggestions') || '[]');
    stored.push(data);
    localStorage.setItem('foodie_suggestions', JSON.stringify(stored));
    feedback.textContent = 'Thanks! Your suggestion was saved locally.';
    form.reset();
    setTimeout(()=> feedback.textContent = '', 4000);
  });
}

// --- theme toggle (top-right) ---
function initTheme(){
  const toggles = document.querySelectorAll('[id^="theme-toggle"]');
  const iconMap = { light: 'fa-moon', dark: 'fa-sun' }; // icon showing opposite action
  function setTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('foodie_theme', theme);
    // update icons
    toggles.forEach(btn=>{
      const icon = btn.querySelector('i');
      if(icon){
        icon.classList.remove('fa-moon','fa-sun');
        icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
      }
    });
  }
  // init from storage
  const stored = localStorage.getItem('foodie_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(stored);

  toggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  });
}

// --- mobile nav toggle ---
function initNav(){
  const menuButtons = document.querySelectorAll('[id^="menu-toggle"], #menu-toggle, #menu-btn, #menu-toggle-2, #menu-toggle-3');
  const navs = document.querySelectorAll('.nav');
  // single handler for known menu buttons
  document.querySelectorAll('#menu-toggle, #menu-toggle-2, #menu-toggle-3, #menu-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      // find sibling nav
      const parent = btn.closest('.inner');
      if(!parent) return;
      const nav = parent.querySelector('.nav');
      if(!nav) return;
      nav.classList.toggle('open');
    });
  });
}

// --- footer dates ---
function initFooterDates(){
  const y = new Date().getFullYear();
  if(byId('year')) byId('year').textContent = y;
  if(byId('year-2')) byId('year-2').textContent = y;
  if(byId('year-3')) byId('year-3').textContent = y;
  const lm = document.lastModified;
  if(byId('last-mod')) byId('last-mod').textContent = 'Last Modified: ' + lm;
  if(byId('last-mod-2')) byId('last-mod-2').textContent = 'Last Modified: ' + lm;
  if(byId('last-mod-3')) byId('last-mod-3').textContent = 'Last Modified: ' + lm;
}

// --- init on DOM ready ---
document.addEventListener('DOMContentLoaded', ()=>{
  populateFeatured();
  populateRecipes(); // for recipes.html will early-return if no grid element
  initContactForm();
  initTheme();
  initNav();
  initFooterDates();

  // recipes page: wire filter/sort if present
  const filter = byId('filter'), sort = byId('sort');
  if(filter) filter.addEventListener('change', ()=> populateRecipes(filter.value, sort ? sort.value : 'default'));
  if(sort) sort.addEventListener('change', ()=> populateRecipes(filter ? filter.value : 'all', sort.value));
});

