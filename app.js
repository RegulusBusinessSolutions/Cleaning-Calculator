// STATE
let sqft = 0;
let service = null;
let selectedExtras = [];

// ELEMENTS
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const sqftInput = document.getElementById("sqft");

const lowPrice = document.getElementById("lowPrice");
const midPrice = document.getElementById("midPrice");
const highPrice = document.getElementById("highPrice");
const totalPrice = document.getElementById("totalPrice");

// =====================
// STEP NAVIGATION
// =====================

document.getElementById("toStep2").onclick = () => {
  sqft = parseFloat(sqftInput.value);

  if (!sqft || sqft <= 0) {
    alert("Enter valid square feet");
    return;
  }

  step1.classList.remove("active");
  step2.classList.add("active");
};

document.getElementById("back1").onclick = () => {
  step2.classList.remove("active");
  step1.classList.add("active");
};

document.getElementById("toStep3").onclick = () => {
  if (!service) {
    alert("Select a service");
    return;
  }

  calculatePrices();

  step2.classList.remove("active");
  step3.classList.add("active");
};

document.getElementById("back2").onclick = () => {
  step3.classList.remove("active");
  step2.classList.add("active");
};

document.getElementById("reset").onclick = () => {
  location.reload();
};

// =====================
// SERVICE SELECTION
// =====================

document.querySelectorAll(".service-btn").forEach(btn => {
  btn.onclick = function () {
    document.querySelectorAll(".service-btn").forEach(b => {
      b.classList.remove("selected");
    });

    this.classList.add("selected");
    service = this.getAttribute("data-type");

    // DEBUG (optional)
    console.log("Service selected:", service);
  };
});

// =====================
// EXTRAS SELECTION (TILES)
// =====================

document.querySelectorAll(".extra").forEach(tile => {
  tile.onclick = function () {
    const price = parseFloat(this.getAttribute("data-price"));

    this.classList.toggle("active");

    if (selectedExtras.includes(price)) {
      selectedExtras = selectedExtras.filter(p => p !== price);
    } else {
      selectedExtras.push(price);
    }

    updateTotal();
  };
});

// =====================
// PRICING LOGIC
// =====================

function calculatePrices() {

  let rate = 0;

  if (service === "standard") rate = 0.10;
  if (service === "deep") rate = 0.20;
  if (service === "move") rate = 0.22;

  const base = sqft * rate;
  const mid = base * 1.10;
  const high = base * 1.20;

  // Store globally
  window.pricing = {
    low: base,
    mid: mid,
    high: high
  };

  // Update UI
  lowPrice.textContent = format(base);
  midPrice.textContent = format(mid);
  highPrice.textContent = format(high);

  updateTotal();
}

// =====================
// TOTAL UPDATE
// =====================

function updateTotal() {
  if (!window.pricing) return;

  const extrasTotal = selectedExtras.reduce((sum, val) => sum + val, 0);

  // Default = recommended price
  const total = window.pricing.mid + extrasTotal;

  totalPrice.textContent = format(total);
}

// =====================
// FORMAT
// =====================

function format(num) {
  return "$" + num.toFixed(2);
}
