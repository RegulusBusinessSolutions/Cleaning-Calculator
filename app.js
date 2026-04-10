const rates = {
  regular: 0.12,
  deep: 0.23,
  rough: 0.25,
  final: 0.35,
  touch: 0.12,
  turnover: 0.10
};

let currentStep = 1;

function nextStep(step) {
  if (step === 2) {
    const sqft = document.getElementById("sqft").value;
    if (!sqft || sqft <= 0) {
      alert("Enter valid square feet");
      return;
    }
  }

  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");

  currentStep = step;
  updateProgress();

  if (step === 3) calculate();
}

function updateProgress() {
  const bar = document.getElementById("progressFill");

  if (currentStep === 1) bar.style.width = "33%";
  if (currentStep === 2) bar.style.width = "66%";
  if (currentStep === 3) bar.style.width = "100%";

  document.querySelectorAll(".progress-steps span").forEach((el, i) => {
    el.classList.toggle("active", i < currentStep);
  });
}

function calculate() {
  const sqft = parseFloat(document.getElementById("sqft").value);
  const type = document.getElementById("type").value;

  const base = sqft * rates[type];

  document.getElementById("low").innerText = "$" + base.toFixed(2);
  document.getElementById("mid").innerText = "$" + (base * 1.1).toFixed(2);
  document.getElementById("high").innerText = "$" + (base * 1.2).toFixed(2);
}

document.addEventListener("DOMContentLoaded", updateProgress);
