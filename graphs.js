// --- FUNCTION EVALUATOR & CANVAS PLOTTER ---
let graphState = {
  xmin: -10,
  xmax: 10,
  isDragging: false,
  dragStartX: 0,
  expr: "x^2 - 4*x + 3",
};

function plotFunctionAndTable() {
  const tbody = document.getElementById("func-table-body");
  try {
    const expr = document.getElementById("func-expr").value;
    const expressions = expr
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!expressions.length || expressions.length > 4)
      throw Error("Informe de 1 a 4 funções separadas por ;");
    const fs = expressions.map((expr) => Numerical.fn(expr));
    const xmin = readNumber("table-xmin"),
      xmax = readNumber("table-xmax"),
      step = readNumber("table-step");
    if (
      xmin >= xmax ||
      step <= 0 ||
      !Number.isFinite((xmax - xmin) / step) ||
      (xmax - xmin) / step > 1000
    )
      throw Error("Use mín < máx, passo > 0 e no máximo 1001 linhas");
    graphState.expr = expressions[0];
    graphState.functions = fs;
    graphState.xmin = xmin;
    graphState.xmax = xmax;
    const x = readNumber("func-eval-x");
    try {
      document.getElementById("func-eval-result").value = fs[0](x);
    } catch {
      document.getElementById("func-eval-result").value = "Indefinido";
    }
    tbody.replaceChildren();
    const count = Math.floor((xmax - xmin) / step + 1e-10);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i <= count; i++) {
      const x = xmin + i * step;
      let y;
      try {
        y = MathEngine.format(fs[0](x));
      } catch {
        y = "Indefinido";
      }
      const tr = document.createElement("tr");
      tr.className = "hover:bg-cyber-bg";
      for (const value of [MathEngine.format(x), y]) {
        const td = document.createElement("td");
        td.className = "p-2 border-b border-cyber-cardBorder";
        td.textContent = value;
        tr.append(td);
      }
      fragment.append(tr);
    }
    tbody.append(fragment);
    document.getElementById("graph-error").textContent = "";
    renderCanvasGraph();
  } catch (err) {
    document.getElementById("graph-error").textContent = err.message;
  }
}
function resetGraphZoom() {
  plotFunctionAndTable();
}
function exportGraph() {
  const a = document.createElement("a");
  a.download = "cybercalc-grafico.png";
  a.href = document.getElementById("function-canvas").toDataURL("image/png");
  a.click();
}

function renderCanvasGraph() {
  const canvas = document.getElementById("function-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx || !graphState.functions) return;

  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight || 380;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isDark = document.documentElement.classList.contains("dark");
  const gridColor = isDark ? "#1f293d" : "#cbd5e1";
  const axisColor = "#00f3ff";
  const plotColor = "#ff007f";

  const { xmin, xmax, expr } = graphState;

  const curves = [];
  const points = [];
  const numSamples = canvas.width;
  let computedYmin = Infinity,
    computedYmax = -Infinity;

  for (const f of graphState.functions) {
    const curve = [];
    for (let i = 0; i <= numSamples; i++) {
      const x = xmin + (i / numSamples) * (xmax - xmin);
      try {
        const y = f(x);
        if (!isNaN(y) && isFinite(y)) {
          points.push({ x, y });
          curve.push({ x, y });
          if (y < computedYmin) computedYmin = y;
          if (y > computedYmax) computedYmax = y;
        }
      } catch {
        curve.push(null);
      }
    }
    curves.push(curve);
  }

  if (points.length === 0) return;
  let ymin = computedYmin;
  let ymax = computedYmax;
  if (ymin === ymax) {
    ymin -= 1;
    ymax += 1;
  }
  const yPadding = (ymax - ymin) * 0.1 || 1;
  ymin -= yPadding;
  ymax += yPadding;

  const mapX = (x) => ((x - xmin) / (xmax - xmin)) * canvas.width;
  const mapY = (y) =>
    canvas.height - ((y - ymin) / (ymax - ymin)) * canvas.height;

  // Neon Grid
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  const gridStep = 10 ** Math.floor(Math.log10(xmax - xmin)) / 5;
  for (let index = 0; index <= 60; index++) {
    const x = Math.ceil(xmin / gridStep) * gridStep + index * gridStep;
    if (x > xmax) break;
    const px = mapX(x);
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, canvas.height);
    ctx.stroke();
  }

  // Neon Axes
  ctx.strokeStyle = axisColor;
  ctx.shadowColor = "#00f3ff";
  ctx.shadowBlur = 6;
  ctx.lineWidth = 1.5;
  const zeroY = mapY(0);
  if (zeroY >= 0 && zeroY <= canvas.height) {
    ctx.beginPath();
    ctx.moveTo(0, zeroY);
    ctx.lineTo(canvas.width, zeroY);
    ctx.stroke();
  }
  const zeroX = mapX(0);
  if (zeroX >= 0 && zeroX <= canvas.width) {
    ctx.beginPath();
    ctx.moveTo(zeroX, 0);
    ctx.lineTo(zeroX, canvas.height);
    ctx.stroke();
  }

  // Neon Curve Plot
  ctx.strokeStyle = plotColor;
  ctx.shadowColor = "#ff007f";
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2.5;
  curves.forEach((curve, index) => {
    ctx.strokeStyle = ["#ff007f", "#00f3ff", "#00ff66", "#f59e0b"][index];
    ctx.shadowColor = ctx.strokeStyle;
    ctx.beginPath();
    let prev = null;
    curve.forEach((pt) => {
      if (!pt) {
        prev = null;
        return;
      }
      const px = mapX(pt.x),
        py = mapY(pt.y);
      // Do not connect a sampled gap or a jump crossing a vertical asymptote.
      if (
        !prev ||
        Math.abs(py - mapY(prev.y)) > canvas.height * 0.45 ||
        (prev.y * pt.y < 0 && Math.abs(pt.y - prev.y) > (ymax - ymin) * 0.4)
      )
        ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      prev = pt;
    });
    ctx.stroke();
  });
  ctx.shadowBlur = 0;

  // Interactive Pan/Zoom
  canvas.onmousedown = (e) => {
    graphState.isDragging = true;
    graphState.dragStartX = e.clientX;
  };

  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const currentX = xmin + (mouseX / canvas.width) * (xmax - xmin);
    try {
      const currentY = graphState.functions[0](currentX);
      document.getElementById("canvas-coords").innerText =
        `x: ${currentX.toFixed(2)}, y: ${currentY.toFixed(2)}`;
    } catch {
      document.getElementById("canvas-coords").innerText =
        `x: ${currentX.toFixed(2)}, y: -`;
    }

    if (graphState.isDragging) {
      const dx = e.clientX - graphState.dragStartX;
      const xShift = (dx / canvas.width) * (graphState.xmax - graphState.xmin);
      graphState.xmin -= xShift;
      graphState.xmax -= xShift;
      graphState.dragStartX = e.clientX;
      renderCanvasGraph();
    }
  };

  window.onmouseup = () => {
    graphState.isDragging = false;
  };

  canvas.onmouseleave = () => {
    graphState.isDragging = false;
  };
  canvas.onwheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    const range = graphState.xmax - graphState.xmin;
    if (range * zoomFactor < 1e-8 || range * zoomFactor > 1e8) return;
    const center = graphState.xmin + range / 2;
    graphState.xmin = center - (range * zoomFactor) / 2;
    graphState.xmax = center + (range * zoomFactor) / 2;
    renderCanvasGraph();
  };
}

window.addEventListener("resize", () => {
  if (!document.getElementById("module-graph").classList.contains("hidden"))
    renderCanvasGraph();
});
