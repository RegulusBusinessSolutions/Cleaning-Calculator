const rates = {
  regular: 0.12,
  deep: 0.23,
  rough: 0.25,
  final: 0.35,
  touch: 0.12,
  turnover: 0.10
};

/* ---------- STATE ---------- */
let currentStep = 1;

/* ---------- FORMAT ---------- */
function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

/* ---------- ANIMATION ---------- */
function animateValue(id, endValue, duration = 500) {
  const el = document.getElementById(id);
  const startValue = parseFloat(el.innerText.replace("$", "")) || 0;

  let startTime = null;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOut(progress);

    const current = startValue + (endValue - startValue) * eased;

    el.innerText = formatCurrency(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.innerText = formatCurrency(endValue);
    }
  }

  requestAnimationFrame(step);
}

/* ---------- CALCULATION ---------- */
function calculate() {
  const sqft = parseFloat(document.getElementById("sqft").value);
  const type = document.getElementById("type").value;

  if (!sqft || sqft <= 0 || !rates[type]) return;

  const base = sqft * rates[type];

  animateValue("low", base);
  animateValue("mid", base * 1.10);
  animateValue("high", base * 1.20);
}

/* ---------- STEP CONTROL ---------- */
function nextStep(step) {
  // validation for step 1
  if (step === 2) {
    const sqft = document.getElementById("sqft").value;
    if (!sqft || sqft <= 0) {
      shakeInput("sqft");
      return;
    }
  }

  document.querySelectorAll(".step").forEach(s => {
    s.classList.remove("active");
  });

  document.getElementById("step" + step).classList.add("active");

  currentStep = step;

  updateProgress();

  if (step === 3) {
    calculate();
  }
}

/* ---------- PROGRESS BAR ---------- */
function updateProgress() {
  const progress = document.getElementById("progressFill");

  if (currentStep === 1) progress.style.width = "33%";
  if (currentStep === 2) progress.style.width = "66%";
  if (currentStep === 3) progress.style.width = "100%";

  const steps = document.querySelectorAll(".progress-steps span");

  steps.forEach((s, i) => {
    s.classList.remove("active");
    if (i < currentStep) {
      s.classList.add("active");
    }
  });
}

/* ---------- INPUT FEEDBACK ---------- */
function shakeInput(id) {
  const el = document.getElementById(id);
  el.style.borderColor = "#FF00E5";
  el.style.boxShadow = "0 0 12px rgba(255,0,229,
