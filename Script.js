// --- THEME SWITCHER (DARK / LIGHT MODE) ---
function toggleTheme() {
    const htmlEl = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        if (themeText) themeText.innerText = 'LIGHT';
    } else {
        htmlEl.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        if (themeText) themeText.innerText = 'DARK';
    }

    // Redraw graph if active to adapt grid colors
    if (!document.getElementById('module-graph').classList.contains('hidden')) {
        renderCanvasGraph();
    }
}

// Initialize theme from storage
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        if (themeText) themeText.innerText = 'LIGHT';
    } else {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        if (themeText) themeText.innerText = 'DARK';
    }
})();

// --- TAB NAVIGATION ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.className = 'tab-btn px-3 py-2 rounded border border-transparent text-cyber-dimText hover:border-cyber-cardBorder hover:text-cyber-text transition flex items-center gap-2';
    });
    document.getElementById(`module-${tabId}`).classList.remove('hidden');
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    activeBtn.className = 'tab-btn px-3 py-2 rounded border border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)] transition flex items-center gap-2';

    if (tabId === 'graph') {
        setTimeout(plotFunctionAndTable, 50);
    }
    if (tabId === 'matrix') {
        buildMatricesInputs();
    }
}

// --- HISTORY LOGIC ---
let historyLog = JSON.parse(localStorage.getItem('calc_history') || '[]');

function addHistory(expr, result) {
    const entry = { expr, result, time: new Date().toLocaleTimeString() };
    historyLog.unshift(entry);
    if (historyLog.length > 50) historyLog.pop();
    localStorage.setItem('calc_history', JSON.stringify(historyLog));
    renderHistory();
}

function renderHistory() {
    const quickList = document.getElementById('quick-history-list');
    const fullList = document.getElementById('full-history-list');

    if (historyLog.length === 0) {
        quickList.innerHTML = '<p class="text-xs font-mono text-cyber-dimText text-center py-8">// SEM DADOS REGISTRADOS</p>';
        fullList.innerHTML = '<p class="text-xs font-mono text-cyber-dimText text-center py-12">// NENHUM CÁLCULO ARMAZENADO</p>';
        return;
    }

    let quickHtml = '';
    let fullHtml = '';

    historyLog.forEach((item, idx) => {
        const htmlItem = `
            <div class="bg-cyber-bg border border-cyber-cardBorder p-2.5 rounded flex justify-between items-center text-xs font-mono">
                <div>
                    <div class="text-cyber-dimText">${item.expr}</div>
                    <div class="font-bold text-cyber-green text-glow-green">= ${item.result}</div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-[10px] text-cyber-dimText">${item.time}</span>
                    <button onclick="reuseExpr('${encodeURIComponent(item.expr)}')" class="p-1 bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 rounded hover:bg-cyber-cyan hover:text-black transition" title="Reutilizar"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                </div>
            </div>
        `;
        if (idx < 10) quickHtml += htmlItem;
        fullHtml += htmlItem;
    });

    quickList.innerHTML = quickHtml;
    fullList.innerHTML = fullHtml;
}

function clearHistory() {
    historyLog = [];
    localStorage.removeItem('calc_history');
    renderHistory();
}

function reuseExpr(encodedExpr) {
    const expr = decodeURIComponent(encodedExpr);
    calcCurrentExpr = expr;
    updateCalcDisplay();
    switchTab('calc');
}

// --- CALCULATOR ENGINE ---
let calcCurrentExpr = '';

function updateCalcDisplay() {
    document.getElementById('calc-main-display').innerText = calcCurrentExpr || '0';
}

function calcInput(val) {
    calcCurrentExpr += val;
    updateCalcDisplay();
}

function calcClearEntry() {
    calcCurrentExpr = '';
    updateCalcDisplay();
}

function calcClearAll() {
    calcCurrentExpr = '';
    document.getElementById('calc-history-display').innerText = '';
    updateCalcDisplay();
}

function calcBackspace() {
    calcCurrentExpr = calcCurrentExpr.slice(0, -1);
    updateCalcDisplay();
}

function calcToggleSign() {
    if (calcCurrentExpr) {
        if (calcCurrentExpr.startsWith('-(')) {
            calcCurrentExpr = calcCurrentExpr.slice(2, -1);
        } else {
            calcCurrentExpr = `-(${calcCurrentExpr})`;
        }
        updateCalcDisplay();
    }
}

function evaluateMathExpression(expr, xVal = 0) {
    try {
        let jsExpr = expr
            .replace(/π/g, 'Math.PI')
            .replace(/\be\b/g, 'Math.E')
            .replace(/\basin\b/g, 'Math.asin')
            .replace(/\bacos\b/g, 'Math.acos')
            .replace(/\batan\b/g, 'Math.atan')
            .replace(/\bsin\b/g, 'Math.sin')
            .replace(/\bcos\b/g, 'Math.cos')
            .replace(/\btan\b/g, 'Math.tan')
            .replace(/\bln\b/g, 'Math.log')
            .replace(/\blog\b/g, 'Math.log10')
            .replace(/\bsqrt\b/g, 'Math.sqrt')
            .replace(/\bcbrt\b/g, 'Math.cbrt')
            .replace(/\bexp\b/g, 'Math.exp')
            .replace(/\bmod\b/g, '%')
            .replace(/\^/g, '**');

        jsExpr = jsExpr.replace(/(\d+(\.\d+)?|\b[a-zA-Z_]\w*\b|\([^)]+\))!/g, 'calcFactorialNum($1)');

        const func = new Function('x', 'calcFactorialNum', `return ${jsExpr};`);
        return func(xVal, calcFactorialNum);
    } catch (err) {
        throw new Error('Expressão Inválida');
    }
}

function calcFactorialNum(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= Math.floor(n); i++) res *= i;
    return res;
}

function calcEvaluate() {
    if (!calcCurrentExpr) return;
    try {
        const evalStr = calcCurrentExpr;
        const result = evaluateMathExpression(evalStr);
        document.getElementById('calc-history-display').innerText = evalStr + ' =';
        calcCurrentExpr = String(result);
        updateCalcDisplay();
        addHistory(evalStr, result);
    } catch (err) {
        document.getElementById('calc-main-display').innerText = 'ERRO';
    }
}

// Keyboard Support
window.addEventListener('keydown', (e) => {
    if (document.getElementById('module-calc').classList.contains('hidden')) return;
    if (document.activeElement.tagName === 'INPUT') return;

    if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')', '^', '%'].includes(e.key)) {
        calcInput(e.key);
    } else if (e.key === 'Enter') {
        calcEvaluate();
    } else if (e.key === 'Backspace') {
        calcBackspace();
    } else if (e.key === 'Escape') {
        calcClearAll();
    }
});

// --- FUNCTION EVALUATOR & CANVAS PLOTTER ---
let graphState = {
    xmin: -10,
    xmax: 10,
    isDragging: false,
    dragStartX: 0,
    expr: 'x^2 - 4*x + 3'
};

function plotFunctionAndTable() {
    graphState.expr = document.getElementById('func-expr').value;
    const evalX = parseFloat(document.getElementById('func-eval-x').value);
    graphState.xmin = parseFloat(document.getElementById('table-xmin').value);
    graphState.xmax = parseFloat(document.getElementById('table-xmax').value);
    const step = parseFloat(document.getElementById('table-step').value);

    try {
        const res = evaluateMathExpression(graphState.expr, evalX);
        document.getElementById('func-eval-result').value = isNaN(res) ? 'Indefinido' : res;
    } catch {
        document.getElementById('func-eval-result').value = 'Erro';
    }

    const tbody = document.getElementById('func-table-body');
    tbody.innerHTML = '';
    let tableData = [];
    if (step > 0 && graphState.xmin <= graphState.xmax) {
        for (let x = graphState.xmin; x <= graphState.xmax + 1e-9; x += step) {
            let fx;
            try { fx = evaluateMathExpression(graphState.expr, x); } catch { fx = NaN; }
            tableData.push({ x: Number(x.toFixed(4)), fx: isNaN(fx) ? 'NaN' : Number(fx.toFixed(4)) });
        }
    }

    tableData.forEach(row => {
        tbody.innerHTML += `<tr class="hover:bg-cyber-bg"><td class="p-2 border-b border-cyber-cardBorder">${row.x}</td><td class="p-2 border-b border-cyber-cardBorder font-bold text-cyber-green text-glow-green">${row.fx}</td></tr>`;
    });

    renderCanvasGraph();
}

function resetGraphZoom() {
    graphState.xmin = parseFloat(document.getElementById('table-xmin').value) || -10;
    graphState.xmax = parseFloat(document.getElementById('table-xmax').value) || 10;
    renderCanvasGraph();
}

function renderCanvasGraph() {
    const canvas = document.getElementById('function-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 380;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? '#1f293d' : '#cbd5e1';
    const axisColor = '#00f3ff';
    const plotColor = '#ff007f';

    const { xmin, xmax, expr } = graphState;

    const points = [];
    const numSamples = canvas.width;
    let computedYmin = Infinity, computedYmax = -Infinity;

    for (let i = 0; i <= numSamples; i++) {
        const x = xmin + (i / numSamples) * (xmax - xmin);
        try {
            const y = evaluateMathExpression(expr, x);
            if (!isNaN(y) && isFinite(y)) {
                points.push({ x, y });
                if (y < computedYmin) computedYmin = y;
                if (y > computedYmax) computedYmax = y;
            }
        } catch {}
    }

    if (points.length === 0) return;
    let ymin = computedYmin;
    let ymax = computedYmax;
    if (ymin === ymax) { ymin -= 1; ymax += 1; }
    const yPadding = (ymax - ymin) * 0.1 || 1;
    ymin -= yPadding;
    ymax += yPadding;

    const mapX = (x) => ((x - xmin) / (xmax - xmin)) * canvas.width;
    const mapY = (y) => canvas.height - ((y - ymin) / (ymax - ymin)) * canvas.height;

    // Neon Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xmin); x <= xmax; x++) {
        const px = mapX(x);
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, canvas.height); ctx.stroke();
    }

    // Neon Axes
    ctx.strokeStyle = axisColor;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 6;
    ctx.lineWidth = 1.5;
    const zeroY = mapY(0);
    if (zeroY >= 0 && zeroY <= canvas.height) {
        ctx.beginPath(); ctx.moveTo(0, zeroY); ctx.lineTo(canvas.width, zeroY); ctx.stroke();
    }
    const zeroX = mapX(0);
    if (zeroX >= 0 && zeroX <= canvas.width) {
        ctx.beginPath(); ctx.moveTo(zeroX, 0); ctx.lineTo(zeroX, canvas.height); ctx.stroke();
    }

    // Neon Curve Plot
    ctx.strokeStyle = plotColor;
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let drawing = false;
    points.forEach(pt => {
        const px = mapX(pt.x);
        const py = mapY(pt.y);
        if (!drawing) { ctx.moveTo(px, py); drawing = true; }
        else { ctx.lineTo(px, py); }
    });
    ctx.stroke();
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
            const currentY = evaluateMathExpression(expr, currentX);
            document.getElementById('canvas-coords').innerText = `x: ${currentX.toFixed(2)}, y: ${currentY.toFixed(2)}`;
        } catch {
            document.getElementById('canvas-coords').innerText = `x: ${currentX.toFixed(2)}, y: -`;
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

    window.onmouseup = () => { graphState.isDragging = false; };

    canvas.onwheel = (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
        const range = graphState.xmax - graphState.xmin;
        const center = (graphState.xmax + graphState.xmin) / 2;
        graphState.xmin = center - (range * zoomFactor) / 2;
        graphState.xmax = center + (range * zoomFactor) / 2;
        renderCanvasGraph();
    };
}

// --- MATRIX ALGEBRA ---
function buildMatricesInputs() {
    const rA = parseInt(document.getElementById('matA-rows').value) || 2;
    const cA = parseInt(document.getElementById('matA-cols').value) || 2;
    const rB = parseInt(document.getElementById('matB-rows').value) || 2;
    const cB = parseInt(document.getElementById('matB-cols').value) || 2;

    document.getElementById('matA-container').innerHTML = createMatrixInputsHTML('A', rA, cA);
    document.getElementById('matB-container').innerHTML = createMatrixInputsHTML('B', rB, cB);
}

function createMatrixInputsHTML(name, rows, cols) {
    let html = `<div class="grid gap-1.5" style="grid-template-columns: repeat(${cols}, minmax(0, 1fr));">`;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            html += `<input type="number" id="mat${name}_${i}_${j}" value="${i === j ? 1 : 0}" step="any" class="bg-cyber-bg border border-cyber-cardBorder rounded p-1.5 text-xs text-center font-mono text-cyber-text focus:border-cyber-cyan">`;
        }
    }
    html += `</div>`;
    return html;
}

function getMatrixFromInputs(name, rows, cols) {
    const mat = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const val = parseFloat(document.getElementById(`mat${name}_${i}_${j}`).value) || 0;
            row.push(val);
        }
        mat.push(row);
    }
    return mat;
}

function displayMatrixResult(mat) {
    const container = document.getElementById('matrix-result-container');
    if (typeof mat === 'number') {
        container.innerHTML = `<div class="text-2xl font-bold font-mono text-cyber-green text-glow-green">${mat}</div>`;
        return;
    }
    const rows = mat.length;
    const cols = mat[0].length;
    let html = `<table class="border-collapse font-mono text-xs">`;
    for (let i = 0; i < rows; i++) {
        html += `<tr>`;
        for (let j = 0; j < cols; j++) {
            html += `<td class="border border-cyber-cardBorder px-4 py-2 text-center text-cyber-cyan text-glow-cyan">${Number(mat[i][j].toFixed(4))}</td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    container.innerHTML = html;
}

function matrixOperation(op) {
    const rA = parseInt(document.getElementById('matA-rows').value);
    const cA = parseInt(document.getElementById('matA-cols').value);
    const rB = parseInt(document.getElementById('matB-rows').value);
    const cB = parseInt(document.getElementById('matB-cols').value);
    const scalar = parseFloat(document.getElementById('matrix-scalar').value) || 0;

    const A = getMatrixFromInputs('A', rA, cA);
    const B = getMatrixFromInputs('B', rB, cB);

    try {
        if (op === 'add') {
            if (rA !== rB || cA !== cB) throw new Error('Dimensões incompatíveis para soma');
            const res = A.map((row, i) => row.map((val, j) => val + B[i][j]));
            displayMatrixResult(res);
        } else if (op === 'sub') {
            if (rA !== rB || cA !== cB) throw new Error('Dimensões incompatíveis para subtração');
            const res = A.map((row, i) => row.map((val, j) => val - B[i][j]));
            displayMatrixResult(res);
        } else if (op === 'scalar') {
            const res = A.map(row => row.map(val => val * scalar));
            displayMatrixResult(res);
        } else if (op === 'mul') {
            if (cA !== rB) throw new Error('Colunas de A devem equivaler às Linhas de B');
            const res = Array(rA).fill(0).map(() => Array(cB).fill(0));
            for (let i = 0; i < rA; i++) {
                for (let j = 0; j < cB; j++) {
                    for (let k = 0; k < cA; k++) {
                        res[i][j] += A[i][k] * B[k][j];
                    }
                }
            }
            displayMatrixResult(res);
        } else if (op === 'detA') {
            if (rA !== cA) throw new Error('Matriz A precisa ser quadrada');
            displayMatrixResult(matrixDeterminant(A));
        } else if (op === 'transA') {
            const res = Array(cA).fill(0).map((_, j) => Array(rA).fill(0).map((_, i) => A[i][j]));
            displayMatrixResult(res);
        } else if (op === 'invA') {
            if (rA !== cA) throw new Error('Matriz A precisa ser quadrada');
            displayMatrixResult(matrixInverse(A));
        }
    } catch (err) {
        document.getElementById('matrix-result-container').innerHTML = `<span class="text-xs font-mono text-cyber-magenta">${err.message}</span>`;
    }
}

function matrixDeterminant(m) {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    let det = 0;
    for (let c = 0; c < n; c++) {
        const sub = m.slice(1).map(row => row.filter((_, idx) => idx !== c));
        det += (c % 2 === 0 ? 1 : -1) * m[0][c] * matrixDeterminant(sub);
    }
    return det;
}

function matrixInverse(m) {
    const n = m.length;
    const det = matrixDeterminant(m);
    if (Math.abs(det) < 1e-9) throw new Error('Matriz não inversível (det = 0)');

    let aug = m.map((row, i) => [...row, ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)]);

    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) maxRow = k;
        }
        [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];

        const pivot = aug[i][i];
        if (Math.abs(pivot) < 1e-9) throw new Error('Matriz singular');

        for (let j = 0; j < 2 * n; j++) aug[i][j] /= pivot;

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = aug[k][i];
                for (let j = 0; j < 2 * n; j++) aug[k][j] -= factor * aug[i][j];
            }
        }
    }

    return aug.map(row => row.slice(n));
}

// --- COMBINATORICS ENGINE ---
function bigIntFactorial(n) {
    if (n < 0n) return 0n;
    let res = 1n;
    for (let i = 2n; i <= n; i++) res *= i;
    return res;
}

function formatBigIntThousand(bigint) {
    return bigint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateCombinatorics() {
    const n = parseInt(document.getElementById('comb-n').value) || 0;
    const k = parseInt(document.getElementById('comb-k').value) || 0;
    const repStr = document.getElementById('comb-rep').value;
    const reps = repStr.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x) && x > 0);

    const nBig = BigInt(n);
    const kBig = BigInt(k);

    const nFact = bigIntFactorial(nBig);
    const permSimple = nFact;

    let repDenom = 1n;
    reps.forEach(r => repDenom *= bigIntFactorial(BigInt(r)));
    const permRep = nFact / repDenom;

    let arrSimple = 0n;
    let combSimple = 0n;
    if (n >= k) {
        arrSimple = nFact / bigIntFactorial(nBig - kBig);
        combSimple = nFact / (bigIntFactorial(kBig) * bigIntFactorial(nBig - kBig));
    }

    const box = document.getElementById('comb-results-box');
    box.innerHTML = `
        <div><span class="text-cyber-dimText block text-xs">FATORIAL (n!):</span> <span class="font-bold text-cyber-green text-glow-green break-all">${formatBigIntThousand(nFact)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">PERMUTAÇÃO SIMPLES P(${n}):</span> <span class="font-bold text-cyber-cyan text-glow-cyan break-all">${formatBigIntThousand(permSimple)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">PERMUTAÇÃO C/ REPETIÇÃO:</span> <span class="font-bold text-cyber-cyan text-glow-cyan break-all">${formatBigIntThousand(permRep)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">ARRANJO SIMPLES A(${n}, ${k}):</span> <span class="font-bold text-cyber-magenta text-glow-magenta break-all">${formatBigIntThousand(arrSimple)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">COMBINAÇÃO SIMPLES C(${n}, ${k}):</span> <span class="font-bold text-cyber-magenta text-glow-magenta break-all">${formatBigIntThousand(combSimple)}</span></div>
    `;
}

// --- NUMERICAL CALCULUS ENGINE ---
function calculateNumerical() {
    const expr = document.getElementById('calc-func-expr').value;
    const x0 = parseFloat(document.getElementById('calc-x0').value) || 0;
    const a = parseFloat(document.getElementById('calc-a').value) || 0;
    const b = parseFloat(document.getElementById('calc-b').value) || 1;

    const h = 1e-5;
    let d1 = NaN, d2 = NaN, integral = NaN;

    try {
        const fPlus = evaluateMathExpression(expr, x0 + h);
        const fMinus = evaluateMathExpression(expr, x0 - h);
        const fCenter = evaluateMathExpression(expr, x0);
        d1 = (fPlus - fMinus) / (2 * h);
        d2 = (fPlus - 2 * fCenter + fMinus) / (h * h);

        const n = 1000;
        const deltaX = (b - a) / n;
        let sum = evaluateMathExpression(expr, a) + evaluateMathExpression(expr, b);
        for (let i = 1; i < n; i++) {
            const xi = a + i * deltaX;
            sum += evaluateMathExpression(expr, xi) * (i % 2 === 0 ? 2 : 4);
        }
        integral = (deltaX / 3) * sum;
    } catch {}

    const box = document.getElementById('calculus-results-box');
    box.innerHTML = `
        <div><span class="text-cyber-dimText block text-xs">PRIMEIRA DERIVADA f'(${x0}):</span> <span class="font-bold text-cyber-cyan text-glow-cyan">${isNaN(d1) ? 'Erro' : d1.toFixed(6)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">SEGUNDA DERIVADA f''(${x0}):</span> <span class="font-bold text-cyber-magenta text-glow-magenta">${isNaN(d2) ? 'Erro' : d2.toFixed(6)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">INTEGRAL DEFINIDA ∫ f(x)dx [${a}, ${b}]:</span> <span class="font-bold text-cyber-green text-glow-green">${isNaN(integral) ? 'Erro' : integral.toFixed(6)}</span></div>
    `;
}

// --- PWA MANIFEST INLINE BLOB ---
const manifestData = {
    name: "CyberCalc Cyberpunk Edition",
    short_name: "CyberCalc",
    start_url: "./",
    display: "standalone",
    background_color: "#12161f",
    theme_color: "#d32f2f",
    icons: [
        { src: "https://placehold.co/192x192/d32f2f/00f3ff?text=CYBER", sizes: "192x192", type: "image/png" },
        { src: "https://placehold.co/512x512/d32f2f/00f3ff?text=CYBER", sizes: "512x512", type: "image/png" }
    ]
};
const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
document.getElementById('pwa-manifest').href = URL.createObjectURL(manifestBlob);

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('pwa-install-btn').classList.remove('hidden');
    document.getElementById('pwa-install-btn').classList.add('flex');
});

document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            document.getElementById('pwa-install-btn').classList.add('hidden');
        }
        deferredPrompt = null;
    }
});

// Initialize history log
renderHistory();