// Footer dynamic dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Mobile hamburger toggle
const menuBtn = document.getElementById("menu");
const nav = document.getElementById("site-nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  const open = nav.classList.contains("open");
  menuBtn.textContent = open ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(open));
});
