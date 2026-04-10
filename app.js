// STATE
let sqft = 0;
let service = null;
let selectedExtras = [];

// ELEMENTS
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const sqftInput = document.getElementById("sqft");

const serviceButtons = document.querySelectorAll(".service-btn");
const extraButtons = document.querySelectorAll(".extra");

const lowPriceEl = document.getElementById("lowPrice");
const midPriceEl = document.getElementById("midPrice");
const highPriceEl = document.getElementById("highPrice");
const totalPriceEl = document.getElementById("totalPrice");

// NAVIGATION
document.getElementById("toStep2").onclick = () => {
  sqft = parseInt(sqftInput.value);

  if (!sqft || sqft <= 0) {
    alert("Enter valid square footage");
    return;
  }

  goTo(step1, step2);
};

document.getElementById("toStep3").onclick = () => {
  if (!service) {
    alert("Select a service");
    return;
  }

  calculatePrices();
  goTo(step2, step3);
};

document.getElementById("back1").onclick = () => goTo(step2, step1);
document.getElementById("back2").onclick = () => goTo(step3, step2);

document.getElementById("reset").onclick = () => {
  location.reload();
};

// STEP SWITCH
function goTo(from, to) {
  from.classList.remove("active");
  to.classList.add("active");
}

// SERVICE SELECTION
serviceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    serviceButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    service = btn.dataset.type;
  });
});

// EXTRAS TOGGLE
extraButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const price = parseFloat(btn.dataset.price);

    btn.classList.toggle("active");

    if (selectedExtras.includes(price)) {
      selectedExtras = selectedExtras.filter(p => p !== price);
    } else {
      selectedExtras.push(price);
    }

    updateTotal();
  });
});

// PRICING LOGIC
function calculatePrices() {
  let baseRate = 0;

  if (service === "standard") baseRate = 0.10;
  if (service === "deep") baseRate = 0.20;
  if (service === "move") baseRate = 0.22;

  const base = sqft * baseRate;
  const mid = base * 1.10;
  const high = base * 1.20;

  // STORE
  window.pricing = {
    low: base,
    mid: mid,
    high: high
  };

  // UI UPDATE
  lowPriceEl.textContent = format(base);
  midPriceEl.textContent = format(mid);
  highPriceEl.textContent = format(high);

  updateTotal();
}

// TOTAL CALCULATION
function updateTotal() {
  if (!window.pricing) return;

  const extrasTotal = selectedExtras.reduce((a, b) => a + b, 0);

  const total = window.pricing.mid + extrasTotal;

  totalPriceEl.textContent = format(total);
}

// FORMAT
function format(num) {
  return "$" + num.toFixed(2);
}
