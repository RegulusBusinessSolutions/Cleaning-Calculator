let currentStep = 1;
let selectedService = null;

document.addEventListener("DOMContentLoaded", () => {

  const step1Btn = document.getElementById("step1Btn");
  const step2Btn = document.getElementById("step2Btn");
  const restartBtn = document.getElementById("restartBtn");

  /* STEP 1 → STEP 2 */
  step1Btn.addEventListener("click", () => {
    const sqft = document.getElementById("sqft").value;

    if (!sqft || sqft <= 0) {
      alert("Enter valid square feet");
      return;
    }

    goToStep(2);
  });

  /* SERVICE SELECTION */
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".service-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedService = card.dataset.type;
    });
  });

  /* STEP 2 → STEP 3 */
  step2Btn.addEventListener("click", () => {
    if (!selectedService) {
      alert("Select a service");
      return;
    }

    goToStep(3);
  });

  /* RESTART */
  restartBtn.addEventListener("click", () => {
    selectedService = null;

    document.querySelectorAll(".service-card").forEach(c => c.classList.remove("active"));

    goToStep(1);
  });

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

/* PRICING TABLE */
function getPrice(sqft, type) {

  const pricing = {

    standard: [
      [999, 160, "1 hr"],
      [1499, 175, "1 hr 15 min"],
      [1999, 190, "1 hr 30 min"],
      [2499, 210, "1 hr 45 min"],
      [2999, 230, "2 hr"],
      [3499, 250, "2 hr 15 min"],
      [3999, 270, "2 hr 30 min"],
      [4499, 290, "2 hr 45 min"],
      [4999, 320, "3 hr"]
    ],

    deep: [
      [999, 310, "2 hr"],
      [1499, 340, "2 hr 15 min"],
      [1999, 370, "2 hr 30 min"],
      [2499, 400, "2 hr 45 min"],
      [2999, 430, "3 hr"],
      [3499, 470, "3 hr 15 min"],
      [3999, 520, "3 hr 30 min"],
      [4499, 580, "3 hr 45 min"],
      [4999, 680, "4 hr"]
    ],

    move: [
      [999, 330, "3 hr"],
      [1499, 360, "3 hr 15 min"],
      [1999, 390, "3 hr 30 min"],
      [2499, 420, "3 hr 45 min"],
      [2999, 450, "4 hr"],
      [3499, 490, "4 hr 15 min"],
      [3999, 540, "4 hr 30 min"],
      [4499, 600, "4 hr 45 min"],
      [4999, 680, "5 hr"]
    ]

  };

  const table = pricing[type];

  for (let i = 0; i < table.length; i++) {
    if (sqft <= table[i][0]) {
      return table[i];
    }
  }

  return [5000, "Call for quote", "Custom"];
}

/* CALCULATION */
function calculate() {
  const sqft = parseFloat(document.getElementById("sqft").value);

  if (!sqft || !selectedService) return;

  const result = getPrice(sqft, selectedService);

  const price = result[1];
  const time = result[2];

  document.getElementById("price").innerText =
    typeof price === "number" ? "$" + price.toFixed(2) : price;

  document.getElementById("time").innerText = time;
}
