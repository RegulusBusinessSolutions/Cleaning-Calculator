let sqft = 0;
let selectedService = null;
let selectedExtras = [];

/* ================= NAVIGATION ================= */

function showStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");
}

/* ================= STEP 1 ================= */

document.getElementById("toStep2").addEventListener("click", () => {
  const input = document.getElementById("sqft").value;

  if (!input || input <= 0) {
    alert("Enter valid square footage");
    return;
  }

  sqft = parseInt(input);
  showStep(2);
});

/* ================= SERVICE SELECTION ================= */

document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedService = btn.dataset.service;
  });
});

/* ================= STEP 2 FIX ================= */

document.getElementById("toStep3").addEventListener("click", () => {
  if (!selectedService) {
    alert("Select a service");
    return;
  }

  calculatePrices();
  showStep(3);
});

/* ================= PRICING ================= */

function calculatePrices() {
  let rate = 0;

  if (selectedService === "standard") rate = 0.10;
  if (selectedService === "deep") rate = 0.20;
  if (selectedService === "move") rate = 0.22;

  const base = sqft * rate;
  const mid = base * 1.1;
  const high = base * 1.2;

  document.getElementById("price-low").innerText = "$" + base.toFixed(2);
  document.getElementById("price-mid").innerText = "$" + mid.toFixed(2);
  document.getElementById("price-high").innerText = "$" + high.toFixed(2);

  updateTotal(base);
}

/* ================= EXTRAS ================= */

document.querySelectorAll(".extra").forEach(el => {
  el.addEventListener("click", () => {
    const price = parseFloat(el.dataset.price);

    if (el.classList.contains("active")) {
      el.classList.remove("active");
      selectedExtras = selectedExtras.filter(p => p !== price);
    } else {
      el.classList.add("active");
      selectedExtras.push(price);
    }

    updateTotal();
  });
});

/* ================= TOTAL ================= */

function updateTotal(baseOverride = null) {
  let rate = 0;

  if (selectedService === "standard") rate = 0.10;
  if (selectedService === "deep") rate = 0.20;
  if (selectedService === "move") rate = 0.22;

  let base = baseOverride !== null ? baseOverride : sqft * rate;

  let extrasTotal = selectedExtras.reduce((a, b) => a + b, 0);

  const total = base + extrasTotal;

  document.getElementById("total-price").innerText = "$" + total.toFixed(2);
}

/* ================= NAV BACK ================= */

document.getElementById("back1").addEventListener("click", () => showStep(1));
document.getElementById("back2").addEventListener("click", () => showStep(2));

/* ================= RESET ================= */

document.getElementById("reset").addEventListener("click", () => {
  sqft = 0;
  selectedService = null;
  selectedExtras = [];

  document.getElementById("sqft").value = "";

  document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll(".extra").forEach(e => e.classList.remove("active"));

  showStep(1);
});
