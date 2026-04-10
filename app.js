const rates = {
  regular: 0.12,
  deep: 0.23,
  rough: 0.25,
  final: 0.35,
  touch: 0.12,
  turnover: 0.10
};

let currentStep = 1;

document.addEventListener("DOMContentLoaded", () => {

  // Buttons
  const step1Btn = document.getElementById("step1Btn");
  const step2Btn = document.getElementById("step2Btn");
  const backTo1 = document.getElementById("backTo1");
  const backTo2 = document.getElementById("backTo2");

  // STEP 1 → STEP 2
  if (step1Btn) {
    step1Btn.addEventListener("click", () => {
      const sqft = document.getElementById("sqft").value;

      if (!sqft || sqft <= 0) {
        alert("Enter valid square feet");
        return;
      }

      goToStep(2);
    });
  }

  // STEP 2 → STEP 3
  if (step2Btn) {
    step2Btn.addEventListener("click", () => {
      goToStep(3);
    });
  }

  // BACK BUTTONS
  if (backTo1) {
    backTo1.addEventListener("click", () => {
      goToStep(1);
    });
  }

  if (backTo2) {
    backTo2.addEventListener("click", () => {
      goToStep(2);
    });
  }

  updateProgress();
});

/* STEP CONTROL */
function goToStep(step) {
  document.querySelectorAll(".step").forEach(s => {
    s.classList.remove("active");
  });

  const next = document.getElementById("step" + step);
  if (next) next.classList.add("active");

  currentStep = step;
  updateProgress();

  if (step === 3) {
    calculate();
  }
}

/* PROGRESS BAR */
function updateProgress() {
  const bar = document.getElementById("progressFill");
  if (!bar) return;

  if (currentStep === 1) bar.style.width = "33%";
  if (currentStep === 2) bar.style.width = "66%";
  if (currentStep === 3) bar.style.width = "100%";

  document.querySelectorAll(".progress-steps span").forEach((el, i) => {
    el.classList.toggle("active", i < currentStep);
  });
}

/* CALCULATION */
function calculate() {
  const sqft = parseFloat(document.getElementById("sqft").value);
  const type = document.getElementById("type").value;

  if (!sqft || !rates[type]) return;

  const base = sqft * rates[type];

  setValue("low", base);
  setValue("mid", base * 1.10);
  setValue("high", base * 1.20);
}

/* FORMAT */
function setValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = "$" + value.toFixed(2);
}
