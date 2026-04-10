let sqft = 0;
let service = null;
let extras = [];

/* ================= STEP CONTROL ================= */
function showStep(step) {
  document.querySelectorAll(".step").forEach(s => {
    s.classList.remove("active");
  });

  document.getElementById("step" + step).classList.add("active");
}

/* ================= STEP 1 ================= */
document.getElementById("toStep2").onclick = () => {
  const value = document.getElementById("sqft").value;

  if (!value || value <= 0) {
    alert("Enter valid square footage");
    return;
  }

  sqft = parseFloat(value);
  showStep(2);
};

/* ================= STEP 2 ================= */
document.getElementById("toStep3").onclick = () => {
  if (!service) {
    alert("Select a service");
    return;
  }

  calculatePrices();
  showStep(3);
};

/* ================= NAV ================= */
document.getElementById("back1").onclick = () => showStep(1);
document.getElementById("back2").onclick = () => showStep(2);
document.getElementById("reset").onclick = () => location.reload();

/* ================= SERVICE SELECTION ================= */
document.querySelectorAll(".service-btn").forEach(btn => {
  btn.onclick = function () {
    document.querySelectorAll(".service-btn").forEach(b => {
      b.classList.remove("selected");
    });

    this.classList.add("selected");
    service = this.getAttribute("data-service");
  };
});

/* ================= EXTRAS ================= */
document.querySelectorAll(".extra").forEach(el => {
  el.onclick = function () {
    const price = parseFloat(this.dataset.price);

    if (this.classList.contains("active")) {
      this.classList.remove("active");
      extras = extras.filter(p => p !== price);
    } else {
      this.classList.add("active");
      extras.push(price);
    }

    updateTotal();
  };
});

/* ================= PRICING ================= */
function calculatePrices() {

  let rate = 0;

  if (service === "standard") rate = 0.10;
  if (service === "deep") rate = 0.20;
  if (service === "move") rate = 0.22;

  const base = sqft * rate;
  const mid = base * 1.10;
  const high = base * 1.20;

  // Update UI
  document.getElementById("price-low").innerText = format(base);
  document.getElementById("price-mid").innerText = format(mid);
  document.getElementById("price-high").innerText = format(high);

  // Store base for total calc
  window.basePrice = base;

  updateTotal();
}

/* ================= TOTAL ================= */
function updateTotal() {

  if (!window.basePrice) return;

  const extrasTotal = extras.reduce((sum, val) => sum + val, 0);

  // Default = recommended price
  const total = (window.basePrice * 1.10) + extrasTotal;

  document.getElementById("total-price").innerText = format(total);
}

/* ================= FORMAT ================= */
function format(num) {
  return "$" + num.toFixed(2);
}
