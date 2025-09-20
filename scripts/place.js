document.addEventListener("DOMContentLoaded", () => {
  // Current year
  const year = document.getElementById("currentyear");
  if (year) year.textContent = new Date().getFullYear();

  // Last modified
  const lastModified = document.getElementById("lastModified");
  if (lastModified) lastModified.textContent = "Last Modified: " + document.lastModified;
});
