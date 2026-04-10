let selectedService = null;
let sqft = 0;

/* STEP NAVIGATION */
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

function showStep(step) {
  step1.classList.remove("active");
  step2.classList.remove("active");
  step3.classList.remove("active");

  step.classList.add("active");
}

/* STEP 1 → STEP 2 */
document.getElementById("toStep2").addEventListener("click", () => {
  sqft = parseFloat(document.getElementById("sqft").value);

  if (!sqft || sqft <= 0) return;

  showStep(step2);
});

/* BACK BUTTON */
document.getElementById("back1").addEventListener("click", () => {
  showStep(step1);
});

document.getElementById("back2").addEventListener("click", () => {
  showStep(step2);
});

/* SERVICE SELECTION */
const serviceButtons = document.querySelectorAll(".service-btn");

serviceButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    serviceButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedService = btn.dataset.service;
  });
});

/* STEP 2 → STEP 3 */
document.getElementById("toStep3").addEventListener("click", () => {
  if (!selectedService) return;

  calculatePrices();
  showStep(step3);
});

/* PRICE CALCULATION */
function calculatePrices() {
  let rate = 0;

  if (selectedService === "standard") rate = 0.10;
  if (selectedService === "deep") rate = 0.20;
  if (selectedService === "move") rate = 0.22;

  let base = sqft * rate;
  let mid = base * 1.10;
  let high = base * 1.20;

  let extras = getExtrasTotal();

  document.getElementById("lowPrice").innerText = format(base + extras);
  document.getElementById("midPrice").innerText = format(mid + extras);
  document.getElementById("highPrice").innerText = format(high + extras);
}

/* EXTRAS */
const extrasCheckboxes = document.querySelectorAll(".extras-grid input");

extrasCheckboxes.forEach(box => {
  box.addEventListener("change", calculatePrices);
});

function getExtrasTotal() {
  let total = 0;

  extrasCheckboxes.forEach(box => {
    if (box.checked) {
      total += parseFloat(box.dataset.price);
    }
  });

  return total;
}

/* FORMAT */
function format(num) {
  return "$" + num.toFixed(2);
}

/* RESET */
document.getElementById("reset").addEventListener("click", () => {

  document.getElementById("sqft").value = "";
  selectedService = null;

  serviceButtons.forEach(b => b.classList.remove("selected"));

  extrasCheckboxes.forEach(box => box.checked = false);

  document.getElementById("lowPrice").innerText = "$0";
  document.getElementById("midPrice").innerText = "$0";
  document.getElementById("highPrice").innerText = "$0";

  showStep(step1);
});
