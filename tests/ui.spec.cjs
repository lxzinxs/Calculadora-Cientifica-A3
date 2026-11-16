const { test, expect } = require("@playwright/test");
const required = [
  ["2+2", 4],
  ["10-5", 5],
  ["8*7", 56],
  ["100/4", 25],
  ["2^3", 8],
  ["sqrt(81)", 9],
  ["cbrt(27)", 3],
  ["5!", 120],
  ["log(100)", 2],
  ["ln(e)", 1],
  ["sin(0)", 0],
  ["cos(0)", 1],
  ["10 mod 3", 1],
  ["(5+3)*2", 16],
  ["-5+3", -2],
];
test.beforeEach(async ({ page }) => {
  page.errors = [];
  page.missing = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) page.missing.push(r.url());
  });
  await page.goto("/");
});
test.afterEach(async ({ page }) => {
  expect(page.errors).toEqual([]);
  expect(page.missing).toEqual([]);
});
const calculate = async (page, expr) => {
  await page.locator("#expression-input").fill(expr);
  await page.locator("#expression-input").press("Enter");
  return page.locator("#calc-main-display").innerText();
};
test("15 resultados obrigatórios pela interface e entradas inválidas", async ({
  page,
}) => {
  for (const [expr, value] of required) {
    expect(Math.abs(Number(await calculate(page, expr)) - value)).toBeLessThan(
      1e-10,
    );
    await expect(page.locator("#calc-error")).toBeEmpty();
  }
  for (const expr of ["1/0", "5.5!", "2+", "(2+3"]) {
    await calculate(page, expr);
    await expect(page.locator("#calc-error")).not.toBeEmpty();
  }
  await calculate(page, "2+2");
  await expect(page.locator("#calc-error")).toBeEmpty();
});
test("Teclado virtual, físico, CE, C, exclusão, sinal, continuação e Ans", async ({
  page,
}) => {
  const button = (name) =>
    page.locator("#module-calc button").getByText(name, { exact: true });
  await button("2").click();
  await button("+").click();
  await button("2").click();
  await button("=").click();
  await expect(page.locator("#calc-main-display")).toHaveText("4");
  await page.keyboard.press("Enter");
  await expect(page.locator("#calc-main-display")).toHaveText("4");
  await button("×").click();
  await button("3").click();
  await button("=").click();
  await expect(page.locator("#calc-main-display")).toHaveText("12");
  await button("C").click();
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  await page.keyboard.type("10-5");
  await page.keyboard.press("Enter");
  await expect(page.locator("#calc-main-display")).toHaveText("5");
  await button("±").click();
  await button("=").click();
  await expect(page.locator("#calc-main-display")).toHaveText("-5");
  await button("CE").click();
  await page.keyboard.type("123");
  await page.keyboard.press("Backspace");
  await expect(page.locator("#calc-main-display")).toHaveText("12");
  await page.keyboard.press("Escape");
  await expect(page.locator("#calc-main-display")).toHaveText("0");
  expect(await calculate(page, "Ans+10")).toBe("5");
});
test("Histórico persistente, reutilização, memória, favoritos e exportação", async ({
  page,
}) => {
  await calculate(page, "2+2");
  await page.getByText("M+", { exact: true }).click();
  await page.getByText("M-", { exact: true }).click();
  await page.getByText("M+", { exact: true }).click();
  await page.getByText("MC", { exact: true }).click();
  await page.getByText("M+", { exact: true }).click();
  await page.getByText("MR", { exact: true }).click();
  await expect(page.locator("#calc-main-display")).toHaveText("(4)");
  await page.locator("summary").filter({ hasText: "FAVORITOS" }).click();
  await page.locator("#favorite-save").click();
  await page.reload();
  await expect(page.locator("#quick-history-list")).toContainText("2+2");
  await page.locator("#quick-history-list button").first().click();
  await expect(page.locator("#expression-input")).toHaveValue("2+2");
  await page.locator("#tab-btn-history").click();
  const dl = page.waitForEvent("download");
  await page.getByText("EXPORTAR JSON", { exact: true }).click();
  expect((await dl).suggestedFilename()).toContain(".json");
  await page.getByText("LIMPAR BANCO DE LOGS", { exact: true }).click();
  await expect(page.locator("#full-history-list")).toContainText("SEM DADOS");
  await page.locator("#tab-btn-calc").click();
  await page.locator("summary").filter({ hasText: "FAVORITOS" }).click();
  await expect(page.locator("#favorite-list")).toContainText("(4)");
  await page.locator("#favorite-list button").click();
  await page.locator("#favorite-clear").click();
  await expect(page.locator("#favorite-list")).toBeEmpty();
});
test("Armazenamento corrompido, bloqueado e histórico hostil", async ({
  page,
}) => {
  await page.evaluate(() => localStorage.setItem("calc_history", "{broken"));
  await page.reload();
  expect(await calculate(page, "2+2")).toBe("4");
  await page.evaluate(() =>
    localStorage.setItem(
      "calc_history",
      JSON.stringify([
        {
          expr: "<img src=x onerror=alert(1)>",
          result: "4",
          time: "<script>x</script>",
        },
      ]),
    ),
  );
  await page.reload();
  expect(await page.locator("#quick-history-list img").count()).toBe(0);
  await expect(page.locator("#quick-history-list")).toContainText("<img");
  await page.addInitScript(() => {
    Storage.prototype.getItem = function () {
      throw Error("blocked");
    };
    Storage.prototype.setItem = function () {
      throw Error("quota");
    };
    Storage.prototype.removeItem = function () {
      throw Error("blocked");
    };
  });
  await page.reload();
  expect(await calculate(page, "2+2")).toBe("4");
  await page.locator("#theme-toggle-btn").click();
  await page.locator("#quick-history-list").getByRole("button").first().click();
  await page.getByText("LIMPAR", { exact: true }).click();
});
test("Gráficos: funções, tabela, domínio, limites, zoom, pan e PNG", async ({
  page,
}) => {
  await page.locator("#tab-btn-graph").click();
  await expect(page.locator("#func-table-body tr")).toHaveCount(21);
  for (const [expr, value] of [
    ["x^2", "4"],
    ["2x+1", "5"],
    ["sin(x)", String(Math.sin(2))],
    ["x^3-2x", "4"],
    ["1/x", "0.5"],
  ]) {
    await page.locator("#func-expr").fill(expr);
    await page.locator('[onclick="plotFunctionAndTable()"]', {}).click();
    await expect(page.locator("#func-eval-result")).toHaveValue(value);
  }
  await page.locator("#func-eval-x").fill("0");
  await page.locator('[onclick="plotFunctionAndTable()"]', {}).click();
  await expect(page.locator("#func-eval-result")).toHaveValue("Indefinido");
  await expect(page.locator("#func-table-body")).toContainText("Indefinido");
  await page.locator("#func-expr").fill("x^2;2x+1");
  await page.locator('[onclick="plotFunctionAndTable()"]', {}).click();
  const canvas = page.locator("#function-canvas");
  const before = await page.evaluate(() => graphState.xmax - graphState.xmin);
  await canvas.hover();
  await page.mouse.wheel(0, -100);
  expect(
    await page.evaluate(() => graphState.xmax - graphState.xmin),
  ).toBeLessThan(before);
  const box = await canvas.boundingBox();
  const xmin = await page.evaluate(() => graphState.xmin);
  await page.mouse.move(box.x + 100, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + 130, box.y + 100);
  await page.mouse.up();
  expect(await page.evaluate(() => graphState.xmin)).not.toBe(xmin);
  await page.getByText("RESET VIEW", { exact: true }).click();
  expect(await page.evaluate(() => graphState.xmin)).toBe(-10);
  const download = page.waitForEvent("download");
  await page.getByText("EXPORTAR PNG", { exact: true }).click();
  expect((await download).suggestedFilename()).toContain(".png");
  await page.locator("#table-step").fill("0.00000001");
  await page.locator('[onclick="plotFunctionAndTable()"]', {}).click();
  await expect(page.locator("#graph-error")).toContainText("1001");
});
test("Matrizes: todas as operações, persistência entre abas e erros", async ({
  page,
}) => {
  await page.locator("#tab-btn-matrix").click();
  for (const [name, values] of [
    ["A", [1, 2, 3, 4]],
    ["B", [5, 6, 7, 8]],
  ])
    for (let i = 0; i < 4; i++)
      await page
        .locator(`#mat${name}_${Math.floor(i / 2)}_${i % 2}`)
        .fill(String(values[i]));
  const result = page.locator("#matrix-result-container");
  for (const [op, values] of [
    ["add", [6, 8, 10, 12]],
    ["sub", [-4, -4, -4, -4]],
    ["scalar", [2, 4, 6, 8]],
    ["mul", [19, 22, 43, 50]],
    ["transA", [1, 3, 2, 4]],
    ["invA", [-2, 1, 1.5, -0.5]],
    ["rref", [1, 0, 0, 1]],
  ]) {
    await page.locator(`[onclick="matrixOperation('${op}')"]`).click();
    expect(await result.locator("td").allTextContents()).toEqual(
      values.map(String),
    );
  }
  for (const [op, value] of [
    ["detA", "-2"],
    ["trace", "5"],
    ["rank", "2"],
  ]) {
    await page.locator(`[onclick="matrixOperation('${op}')"]`).click();
    await expect(result).toHaveText(value);
  }
  await page.locator("#tab-btn-calc").click();
  await page.locator("#tab-btn-matrix").click();
  await expect(page.locator("#matA_0_1")).toHaveValue("2");
  await page.locator("#matA_1_0").fill("2");
  await page.locator("#matA_1_1").fill("4");
  await page.locator(`[onclick="matrixOperation('invA')"]`).click();
  await expect(result).toContainText("singular");
  await page.locator("#matB-cols").fill("1");
  await page.locator("#matB-cols").press("Tab");
  await page.locator(`[onclick="matrixOperation('add')"]`).click();
  await expect(result).toContainText("incompatíveis");
  await page.locator("#matA_0_0").fill("2");
  await page.locator("#matA_0_1").fill("0");
  await page.locator("#matA_1_0").fill("0");
  await page.locator("#matA_1_1").fill("3");
  await page.locator("#matB_0_0").fill("4");
  await page.locator("#matB_1_0").fill("9");
  await page.locator(`[onclick="matrixOperation('solve')"]`).click();
  expect(await result.locator("td").allTextContents()).toEqual(["2", "3"]);
  await page.locator("#matA-rows").fill("13");
  await page.locator("#matA-rows").press("Tab");
  await expect(result).toContainText("1 e 12");
});
test("Combinatória BigInt e entradas inválidas", async ({ page }) => {
  await page.locator("#tab-btn-combinatorics").click();
  await page.locator("#comb-n").fill("5");
  await page.locator("#comb-k").fill("3");
  await page.locator("#comb-rep").fill("2,2");
  await page.locator('[onclick="calculateCombinatorics()"]', {}).click();
  for (const value of ["120", "30", "60", "10", "35"])
    await expect(page.locator("#comb-results-box")).toContainText(value);
  for (const [id, value] of [
    ["comb-n", "-1"],
    ["comb-n", "2.5"],
    ["comb-n", ""],
  ]) {
    await page.locator("#" + id).fill(value);
    await page.locator('[onclick="calculateCombinatorics()"]', {}).click();
    await expect(page.locator("#comb-results-box")).not.toContainText(
      "FATORIAL",
    );
  }
  await page.locator("#comb-n").fill("30");
  await page.locator("#comb-rep").fill("");
  await page.locator('[onclick="calculateCombinatorics()"]', {}).click();
  await expect(page.locator("#comb-results-box")).toContainText(
    "265.252.859.812.191.058.636.308.480.000.000",
  );
});
test("Cálculo numérico, métodos, raízes e derivada simbólica", async ({
  page,
}) => {
  await page.locator("#tab-btn-calculus").click();
  await page.locator("#calc-func-expr").fill("x^2");
  await page.locator("#calc-x0").fill("3");
  await page.locator("#calc-a").fill("0");
  await page.locator("#calc-b").fill("1");
  await page.locator('[onclick="calculateNumerical()"]', {}).click();
  await expect(page.locator("#calculus-results-box")).toContainText("6.000000");
  await expect(page.locator("#calculus-results-box")).toContainText("0.333333");
  await page.locator("#integral-method").selectOption("trapezoid");
  await page.locator('[onclick="calculateNumerical()"]', {}).click();
  await expect(page.locator("#calculus-results-box")).toContainText("0.333333");
  await page.locator("summary").filter({ hasText: "RAÍZES" }).click();
  await page.locator('[onclick="symbolicDerivative()"]', {}).click();
  await expect(page.locator("#root-result")).toContainText("2 * x");
  await page.locator("#calc-func-expr").fill("x^2-2");
  await page.locator("#calc-b").fill("2");
  for (const method of ["bisection", "newton", "secant"]) {
    await page.locator("#root-method").selectOption(method);
    await page.locator('[onclick="solveRoot()"]', {}).click();
    await expect(page.locator("#root-result")).toContainText("1.414213");
  }
  await page.locator("#calc-b").fill("0");
  await page.locator('[onclick="calculateNumerical()"]', {}).click();
  await expect(page.locator("#calculus-results-box")).toContainText(
    "∫[0, 0] ≈ 0.000000",
  );
});
test("Catálogo: todos os exemplos reais, variáveis, DEG, complexos e ferramentas", async ({
  page,
}) => {
  const errors = await page.evaluate(() =>
    catalog
      .map((row) => {
        try {
          evaluateMathExpression(row[2]);
          return null;
        } catch (e) {
          return [row[2], e.message];
        }
      })
      .filter(Boolean),
  );
  expect(errors).toEqual([]);
  await page.locator("#angle-mode").selectOption("DEG");
  expect(Number(await calculate(page, "sin(30)"))).toBeCloseTo(0.5);
  await page.locator("#angle-mode").selectOption("RAD");
  expect(await calculate(page, "sqrt(-4)")).toBe("2i");
  await page
    .locator("summary")
    .filter({ hasText: "FUNÇÕES AVANÇADAS" })
    .click();
  await page.locator("#function-search").fill("Fibonacci");
  await expect(page.locator("#function-catalog button")).toHaveCount(1);
  await page.locator("#function-catalog button").click();
  await page.locator("#expression-input").press("Enter");
  await expect(page.locator("#calc-error")).toBeEmpty();
  await page.locator("#variables-save").click();
  expect(await calculate(page, "2x+1")).toBe("5");
  await page.locator("summary").filter({ hasText: "ÁLGEBRA //" }).click();
  await page.locator("#quadratic-solve").click();
  await expect(page.locator("#quadratic-result")).toHaveText("2; 1");
  await page.locator("#triangle-solve").click();
  await expect(page.locator("#triangle-result")).toContainText("lado_c");
  await page.locator("summary").filter({ hasText: "ESTATÍSTICA" }).click();
  await page.locator("#statistics-run").click();
  await expect(page.locator("#statistics-result")).toContainText('"média": 3');
  await page
    .locator("summary")
    .filter({ hasText: "CONVERSÃO DE BASES" })
    .click();
  await page.locator("#base-convert").click();
  await expect(page.locator("#base-result")).toHaveText("FF");
  await page.locator("summary").filter({ hasText: "PERSONALIZADAS" }).click();
  await page.locator("#custom-define").click();
  expect(await calculate(page, "f(2)")).toBe("5");
  await page.locator("#custom-define").click();
  await expect(page.locator("#custom-status")).toContainText("reservado");
});
test("Temas, seis abas e viewport de celular", async ({ page }) => {
  await page.locator("#theme-toggle-btn").click();
  await expect(page.locator("html")).not.toHaveClass("dark");
  await page.reload();
  await expect(page.locator("#theme-text")).toHaveText("LIGHT");
  await page.locator("#theme-toggle-btn").click();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const tab of [
    "graph",
    "matrix",
    "combinatorics",
    "calculus",
    "history",
    "calc",
  ]) {
    await page.locator("#tab-btn-" + tab).click();
    await expect(page.locator("#module-" + tab)).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
  }
  expect(await calculate(page, "sqrt(81)")).toBe("9");
});
test("PWA: cache completo e recarga realmente offline", async ({
  page,
  context,
}) => {
  await expect(page.locator("#offline-status")).toHaveText(
    "NÚCLEO DISPONÍVEL OFFLINE",
    { timeout: 15000 },
  );
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  expect(await calculate(page, "ln(e)")).toBe("1");
  await page.locator("#tab-btn-graph").click();
  await expect(page.locator("#func-table-body tr")).toHaveCount(21);
  await context.setOffline(false);
});

test("Reutilização de resultado negativo e complexo preserva agrupamento", async ({
  page,
}) => {
  await calculate(page, "-5");
  await page.locator(`[onclick="calcInput('^')"]`).click();
  await page.locator(`[onclick="calcInput('2')"]`).click();
  await page.locator('[onclick="calcEvaluate()"]', {}).click();
  await expect(page.locator("#calc-main-display")).toHaveText("25");
  await calculate(page, "2+3i");
  await page.locator(`[onclick="calcInput('*')"]`).click();
  await page.locator(`[onclick="calcInput('2')"]`).click();
  await page.locator('[onclick="calcEvaluate()"]', {}).click();
  await expect(page.locator("#calc-main-display")).toHaveText("4 + 6i");
});

// Exercise every original scientific-key handler through actual clicks.
test("Botões científicos originais e ação de copiar", async ({
  page,
  context,
}) => {
  const cases = [
    [["sin(", "0", ")"], 0],
    [["cos(", "0", ")"], 1],
    [["tan(", "0", ")"], 0],
    [["asin(", "0", ")"], 0],
    [["acos(", "1", ")"], 0],
    [["atan(", "0", ")"], 0],
    [["log(", "1", "0", "0", ")"], 2],
    [["ln(", "e", ")"], 1],
    [["sqrt(", "8", "1", ")"], 9],
    [["cbrt(", "2", "7", ")"], 3],
    [["exp(", "0", ")"], 1],
    [["5", "!"], 120],
    [["1", "0", "mod", "3"], 1],
    [["5", "0", "%"], 0.5],
    [["2", "^", "3"], 8],
    [["π", "/", "π"], 1],
    [["1", "0", "/", "4"], 2.5],
  ];
  for (const [keys, value] of cases) {
    await page.locator('[onclick="calcClearAll()"]', {}).click();
    for (const key of keys)
      await page.locator(`[onclick="calcInput('${key}')"]`).click();
    await page.locator('[onclick="calcEvaluate()"]', {}).click();
    expect(
      Number(await page.locator("#calc-main-display").innerText()),
    ).toBeCloseTo(value, 10);
    await expect(page.locator("#calc-error")).toBeEmpty();
  }
  await page.locator('[onclick="calcBackspace()"]', {}).click();
  await expect(page.locator("#calc-main-display")).toHaveText("2.");
  await calculate(page, "-(5)+3");
  await page.locator('[onclick="calcToggleSign()"]', {}).click();
  await page.locator('[onclick="calcEvaluate()"]', {}).click();
  await expect(page.locator("#calc-main-display")).toHaveText("2");
  // Clipboard support differs between engines: assert the real result or the explicit fallback.
  await page.getByText("COPIAR", { exact: true }).click();
  await expect(page.locator("#memory-status")).toHaveText(
    /Copiado|clipboard indisponível/,
  );
});
