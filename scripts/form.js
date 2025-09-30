document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: "p1", name: "HyperDrive Engine", avg_rating: 4.8 },
    { id: "p2", name: "Solar Power Bank", avg_rating: 4.3 },
    { id: "p3", name: "Smart Drone", avg_rating: 4.6 },
    { id: "p4", name: "Eco Speaker", avg_rating: 3.9 },
    { id: "p5", name: "Virtual AR Glasses", avg_rating: 5.0 }
  ];

  const select = document.getElementById("product-name");
  products.forEach(product => {
    const opt = document.createElement("option");
    opt.value = product.name;
    opt.textContent = `${product.name} (⭐ ${product.avg_rating})`;
    select.appendChild(opt);
  });

  // Review counter setup
  if (!localStorage.getItem("reviewCount")) {
    localStorage.setItem("reviewCount", 0);
  }

  // Footer details
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent =
    "Last updated: " + document.lastModified;
});
