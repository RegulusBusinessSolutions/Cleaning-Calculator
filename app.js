const rates = {
  regular: 0.12,
  deep: 0.23,
  rough: 0.25,
  final: 0.35,
  touch: 0.12,
  turnover: 0.10
};

// Format currency
function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

// Smooth animation with easing
function animateValue(id, endValue, duration = 500) {
  const element = document.getElementById(id);
  const startValue = parseFloat(element.innerText.replace("$", "")) || 0;

  let startTime = null;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOutQuad(progress);

    const current = startValue + (endValue - startValue) * eased;

    element.innerText = formatCurrency(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.innerText = formatCurrency(endValue);
    }
  }

  requestAnimationFrame(step);
}

// Main calculation
function calculate() {
  const sqftInput = document.getElementById("sqft");
  const typeSelect = document.getElementById("type");

  const sqft = parseFloat(sqftInput.value);
  const type = typeSelect.value;

  // Validation
  if (!sqft || sqft <= 0 || !rates[type]) {
    ["low", "mid", "high"].forEach(id => {
      document.getElementById(id).innerText = "$0.00";
    });
    return;
  }

  const base = sqft * rates[type];

  const results = {
    low: base,
    mid: base * 1.10,
    high: base * 1.20
  };

  // Animate results
  animateValue("low", results.low);
  animateValue("mid", results.mid);
  animateValue("high", results.high);
}

// Debounce (prevents too many calculations while typing)
function debounce(func, delay = 300) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

// Initialize
function initCalculator() {
  const sqftInput = document.getElementById("sqft");
  const typeSelect = document.getElementById("type");

  if (!sqftInput || !typeSelect) return;

  const debouncedCalculate = debounce(calculate, 200);

  sqftInput.addEventListener("input", debouncedCalculate);
  typeSelect.addEventListener("change", calculate);
}

// Run when ready
document.addEventListener("DOMContentLoaded", initCalculator);
