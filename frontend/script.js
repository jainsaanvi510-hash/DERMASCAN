async function generateRoutine() {
  const res = await fetch("http://localhost:7000/api/skincare-routine");
  const data = await res.json();

  document.getElementById("routineResult").innerHTML =
    data.routine.map(step => `<li>${step}</li>`).join("");
}

async function analyzeProduct() {
  const ingredients = document.getElementById("ingredients").value;

  const res = await fetch("http://localhost:7000/api/product-analyzer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  });

  const data = await res.json();
  document.getElementById("productResult").innerHTML =
    data.analysis.map(a => `<li>${a}</li>`).join("");
}

async function explainReport() {
  const report = document.getElementById("report").value;

  const res = await fetch("http://localhost:7000/api/dermoscopy-explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ report })
  });

  const data = await res.json();
  document.getElementById("reportResult").innerHTML =
    data.explanation.map(e => `<li>${e}</li>`).join("");
}
