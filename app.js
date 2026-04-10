let sqft = 0;
let service = null;
let extras = [];

/* STEP NAV */
function showStep(n) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + n).classList.add("active");
}

/* STEP 1 */
document.getElementById("toStep2").onclick = () => {
  const val = document.getElementById("sqft").value;
  if (!val) return alert("Enter sqft");

  sqft = parseInt(val);
  showStep(2);
};

/* SELECT SERVICE */
document.querySelectorAll(".service-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    service = btn.dataset.service;
  };
});

/* STEP 2 → 3 */
document.getElementById("toStep3").onclick = () => {
  if (!service) return alert("Select a service");

  calculate();
  showStep(3);
};

/* PRICING */
function calculate() {
  let rate = 0;

  if (service === "standard") rate = 0.10;
  if (service === "deep") rate = 0.20;
  if (service === "move") rate = 0.22;

  let base = sqft * rate;

  document.getElementById("price-low").innerText = "$" + base.toFixed(2);
  document.getElementById("price-mid").innerText = "$" + (base * 1.1).toFixed(2);
  document.getElementById("price-high").innerText = "$" + (base * 1.2).toFixed(2);

  updateTotal(base);
}

/* EXTRAS */
document.querySelectorAll(".extra").forEach(el => {
  el.onclick = () => {
    let price = parseFloat(el.dataset.price);

    if (el.classList.contains("active")) {
      el.classList.remove("active");
      extras = extras.filter(p => p !== price);
    } else {
      el.classList.add("active");
      extras.push(price);
    }

    updateTotal();
  };
});

/* TOTAL */
function updateTotal(baseOverride = null) {
  let rate = service === "standard" ? 0.10 :
             service === "deep" ? 0.20 : 0.22;

  let base = baseOverride !== null ? baseOverride : sqft * rate;

  let total = base + extras.reduce((a,b)=>a+b,0);

  document.getElementById("total-price").innerText = "$" + total.toFixed(2);
}

/* NAV */
document.getElementById("back1").onclick = () => showStep(1);
document.getElementById("back2").onclick = () => showStep(2);

/* RESET */
document.getElementById("reset").onclick = () => location.reload();
