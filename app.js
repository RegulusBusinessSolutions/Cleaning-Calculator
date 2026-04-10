let sqft = 0;
let service = null;
let basePrice = 0;

/* ================= STEP CONTROL ================= */
function showStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
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

/* ================= SERVICE SELECTION ================= */
document.querySelectorAll(".service-btn").forEach(btn => {
  btn.onclick = function () {
    document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
    service = this.dataset.service;
  };
});

/* ================= STEP 2 ================= */
document.getElementById("toStep3").onclick = () => {
  if (!service) {
    alert("Select a service");
    return;
  }

  calculateBasePrices();
  showStep(3);
};

/* ================= PRICING ================= */
function calculateBasePrices() {

  let rate = 0;

  if (service === "standard") rate = 0.10;
  if (service === "deep") rate = 0.20;
  if (service === "move") rate = 0.22;

  const low = sqft * rate;
  const mid = low * 1.10;
  const high = low * 1.20;

  basePrice = mid; // always use recommended

  document.getElementById("price-low").innerText = format(low);
  document.getElementById("price-mid").innerText = format(mid);
  document.getElementById("price-high").innerText = format(high);

  updateTotal();
}

/* ================= QUANTITY CONTROLS ================= */
document.querySelectorAll(".extra-item").forEach(item => {

  const minus = item.querySelector(".minus");
  const plus = item.querySelector(".plus");
  const qtyEl = item.querySelector(".qty");

  let qty = 0;

  plus.onclick = () => {
    qty++;
    update();
  };

  minus.onclick = () => {
    if (qty > 0) qty--;
    update();
  };

  function update() {
    qtyEl.textContent = qty;
    item.dataset.qty = qty;
    updateTotal();
  }

  item.dataset.qty = 0;
});

/* ================= EXTRAS CALC ================= */
function calculateExtras() {
  let total = 0;

  document.querySelectorAll(".extra-item").forEach(item => {
    const price = parseFloat(item.dataset.price);
    const qty = parseInt(item.dataset.qty) || 0;

    total += price * qty;
  });

  return total;
}

/* ================= TOTAL ================= */
function updateTotal() {

  const extras = calculateExtras();
  const total = basePrice + extras;

  document.getElementById("basePrice").innerText = format(basePrice);
  document.getElementById("extrasPrice").innerText = format(extras);
  document.getElementById("total-price").innerText = format(total);
}

/* ================= NAV ================= */
document.getElementById("back1").onclick = () => showStep(1);
document.getElementById("back2").onclick = () => showStep(2);
document.getElementById("reset").onclick = () => location.reload();

/* ================= FORMAT ================= */
function format(num) {
  return "$" + num.toFixed(2);
}
