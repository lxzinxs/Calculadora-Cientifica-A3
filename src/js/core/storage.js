// Storage failure must never turn a valid calculation into an error.
const SafeStorage = {
  get(key, fallback = null) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* Keep in-memory state usable. */
    }
  },
  json(key, fallback) {
    try {
      return JSON.parse(this.get(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
};
let historyLog = SafeStorage.json("calc_history", []);
if (!Array.isArray(historyLog)) historyLog = [];
historyLog = historyLog
  .filter(
    (item) =>
      item &&
      typeof item.expr === "string" &&
      item.expr.length <= 1000 &&
      (typeof item.result === "string" || typeof item.result === "number") &&
      String(item.result).length <= 10000 &&
      !/NaN|Infinity/.test(String(item.result)) &&
      typeof item.time === "string",
  )
  .slice(0, 50);
function addHistory(expr, result) {
  const text = typeof result === "string" ? result : MathEngine.format(result);
  if (/NaN|Infinity/.test(text)) return;
  historyLog.unshift({
    expr,
    result: text,
    time: new Date().toLocaleTimeString(),
  });
  historyLog = historyLog.slice(0, 50);
  SafeStorage.set("calc_history", JSON.stringify(historyLog));
  renderHistory();
}
function renderHistory() {
  for (const [id, limit] of [
    ["quick-history-list", 10],
    ["full-history-list", 50],
  ]) {
    const container = document.getElementById(id);
    container.replaceChildren();
    if (!historyLog.length) {
      const p = document.createElement("p");
      p.className = "text-xs font-mono text-cyber-dimText text-center py-8";
      p.textContent = "// SEM DADOS REGISTRADOS";
      container.append(p);
    }
    for (const item of historyLog.slice(0, limit)) {
      const row = document.createElement("div");
      row.className =
        "bg-cyber-bg border border-cyber-cardBorder p-2.5 rounded flex justify-between items-center text-xs font-mono gap-2";
      const content = document.createElement("div");
      content.className = "min-w-0 break-all";
      const expr = document.createElement("div");
      expr.className = "text-cyber-dimText";
      expr.textContent = item.expr;
      const result = document.createElement("div");
      result.className = "font-bold text-cyber-green text-glow-green";
      result.textContent = "= " + item.result;
      content.append(expr, result);
      const time = document.createElement("span");
      time.textContent = item.time;
      time.className = "text-cyber-dimText text-[10px]";
      const button = document.createElement("button");
      button.className = "btn-cyber-op p-2 rounded";
      button.textContent = "↶";
      button.title = "Reutilizar";
      button.addEventListener("click", () => reuseExpr(item.expr));
      row.append(content, time, button);
      container.append(row);
    }
  }
}
function clearHistory() {
  historyLog = [];
  SafeStorage.remove("calc_history");
  renderHistory();
}
function reuseExpr(expr) {
  calcCurrentExpr = expr;
  calcJustEvaluated = false;
  updateCalcDisplay();
  switchTab("calc");
}
function downloadFile(name, data, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function exportHistory() {
  downloadFile(
    "cybercalc-historico.json",
    JSON.stringify(historyLog, null, 2),
    "application/json",
  );
}
