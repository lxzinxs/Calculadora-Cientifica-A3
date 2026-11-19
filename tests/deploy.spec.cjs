// Publicação: subdiretório (GitHub Pages), atualização do cache offline,
// carregamento real de estilos/fontes/ícones e layout de tablet.
const { test, expect } = require("@playwright/test");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const PREFIX = "/Calculadora-Cientifica-A3/";
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

// Servidor estático que publica o projeto apenas sob /Calculadora-Cientifica-A3/.
let server, subdirURL;
test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!url.startsWith(PREFIX)) {
      res.writeHead(404).end();
      return;
    }
    let file = path.join(ROOT, url.slice(PREFIX.length) || "index.html");
    if (!file.startsWith(ROOT) || !fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
    });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  subdirURL = `http://127.0.0.1:${server.address().port}${PREFIX}`;
});
test.afterAll(() => server.close());

function watch(page) {
  const problems = [];
  page.on("response", (r) => {
    if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
  });
  // Requisições canceladas pelo próprio navegador durante um reload (ex.: favicon
  // no Firefox, NS_BINDING_ABORTED) não indicam recurso ausente; 404 e falhas reais sim.
  page.on("requestfailed", (r) => {
    if (!/ABORT/i.test(r.failure()?.errorText ?? ""))
      problems.push(`falhou ${r.url()} (${r.failure()?.errorText})`);
  });
  page.on("pageerror", (e) => problems.push("erro " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") problems.push("console " + m.text());
  });
  return problems;
}

test("Subdiretório (GitHub Pages): carrega sem 404 e funciona offline", async ({
  page,
  context,
  browserName,
}) => {
  // No Firefox, o navegador cancela o favicon durante o reload offline e o
  // service worker registra o cancelamento no console. O mesmo ocorre na versão
  // anterior à reorganização (sw.js inalterado), então a validação é no Chromium.
  test.skip(browserName === "firefox", "cancelamento do favicon no Firefox");
  const problems = watch(page);
  await page.goto(subdirURL);
  await expect(page.locator("#offline-status")).toHaveText(
    "NÚCLEO DISPONÍVEL OFFLINE",
    { timeout: 15000 },
  );
  const sw = await page.evaluate(
    async () => (await navigator.serviceWorker.ready).active.scriptURL,
  );
  expect(sw).toContain("/Calculadora-Cientifica-A3/sw.js");
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await page.locator("#expression-input").fill("sqrt(81)+ln(e)");
  await page.locator("#expression-input").press("Enter");
  await expect(page.locator("#calc-main-display")).toHaveText("10");
  await page.locator("#tab-btn-graph").click();
  await expect(page.locator("#func-table-body tr")).toHaveCount(21);
  expect(
    await page.evaluate(() => graphState.view.xLabels.length),
  ).toBeGreaterThan(3);
  await page.locator("#tab-btn-matrix").click();
  await page.locator(`[onclick="matrixOperation('detA')"]`).click();
  await expect(page.locator("#matrix-result-container")).toHaveText("1");
  // Ícones e fontes também respondem sem rede (vindos do cache).
  const offlineAssets = await page.evaluate(async () =>
    Promise.all(
      [
        "assets/icons/icon-192.png",
        "assets/icons/icon-512.png",
        "assets/fonts/inter.woff2",
        "manifest.webmanifest",
      ].map(async (f) => (await fetch(f)).status),
    ),
  );
  expect(offlineAssets).toEqual([200, 200, 200, 200]);
  await context.setOffline(false);
  expect(problems).toEqual([]);
});

test("Atualização do cache: versão antiga é descartada e a nova contém tudo", async ({
  page,
}) => {
  const problems = watch(page);
  await page.goto("/");
  await expect(page.locator("#offline-status")).toHaveText(
    "NÚCLEO DISPONÍVEL OFFLINE",
    { timeout: 15000 },
  );
  // Simula um visitante que tinha a versão anterior em cache.
  await page.evaluate(async () => {
    const old = await caches.open("cybercalc-a3-v2");
    await old.put("./script.js", new Response("// antigo"));
    for (const r of await navigator.serviceWorker.getRegistrations())
      await r.unregister();
  });
  await page.reload();
  await expect(page.locator("#offline-status")).toHaveText(
    "NÚCLEO DISPONÍVEL OFFLINE",
    { timeout: 15000 },
  );
  await expect
    .poll(() => page.evaluate(async () => (await caches.keys()).sort()), {
      timeout: 10000,
    })
    .toEqual(["cybercalc-a3-v3"]);
  const { expected, cached } = await page.evaluate(async () => {
    const src = await (await fetch("sw.js")).text();
    const files = JSON.parse(
      src.match(/const FILES = (\[[\s\S]*?\]);/)[1].replace(/,\s*\]/, "]"),
    );
    const cache = await caches.open("cybercalc-a3-v3");
    const keys = (await cache.keys()).map((r) => new URL(r.url).pathname);
    return {
      expected: files.map((f) => new URL(f, location.href).pathname).sort(),
      cached: keys.sort(),
    };
  });
  expect(cached).toEqual(expected);
  expect(problems).toEqual([]);
});

test("Recursos: CSS, fontes, ícones e manifest realmente carregados", async ({
  page,
}) => {
  const problems = watch(page);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(async () => {
    const sheets = [...document.styleSheets].map((s) => ({
      href: s.href?.split("/").slice(-3).join("/"),
      rules: s.cssRules.length,
    }));
    await Promise.all(
      [
        '16px "JetBrains Mono"',
        '16px "Inter"',
        '900 16px "Font Awesome 6 Free"',
      ].map((f) => document.fonts.load(f)),
    );
    const loaded = [...document.fonts]
      .filter((f) => f.status === "loaded")
      .map((f) => f.family.replace(/"/g, ""));
    const manifest = await (await fetch("manifest.webmanifest")).json();
    const icons = await Promise.all(
      manifest.icons.map(async (i) => {
        const r = await fetch(i.src);
        const bitmap = await createImageBitmap(await r.blob());
        return `${r.status}:${bitmap.width}x${bitmap.height}`;
      }),
    );
    const favicon = await fetch(
      document.querySelector('link[rel="icon"]').href,
    );
    const iconFont = getComputedStyle(
      document.querySelector(".fa-solid"),
      "::before",
    ).fontFamily;
    return { sheets, loaded, icons, favicon: favicon.status, iconFont };
  });
  for (const sheet of result.sheets)
    expect(sheet.rules, sheet.href).toBeGreaterThan(0);
  expect(result.sheets.map((s) => s.href)).toEqual([
    "assets/css/utilities.css",
    "assets/css/icons.css",
    "assets/css/fonts.css",
    "src/styles/style.css",
  ]);
  for (const family of ["JetBrains Mono", "Inter", "Font Awesome 6 Free"])
    expect(result.loaded).toContain(family);
  expect(result.icons).toEqual(["200:192x192", "200:512x512"]);
  expect(result.favicon).toBe(200);
  expect(result.iconFont).toContain("Font Awesome 6 Free");
  expect(problems).toEqual([]);
});

test("Tablet: seis abas sem rolagem horizontal e matrizes legíveis", async ({
  page,
}) => {
  const problems = watch(page);
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto("/");
  for (const theme of ["dark", "light"]) {
    if (theme === "light") await page.locator("#theme-toggle-btn").click();
    for (const tab of [
      "calc",
      "graph",
      "matrix",
      "combinatorics",
      "calculus",
      "history",
    ]) {
      await page.locator("#tab-btn-" + tab).click();
      await expect(page.locator("#module-" + tab)).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(820);
    }
  }
  await page.locator("#tab-btn-matrix").click();
  const clipped = await page
    .locator(".matrix-op-btn")
    .evaluateAll(
      (buttons) => buttons.filter((b) => b.scrollWidth > b.clientWidth).length,
    );
  expect(clipped).toBe(0);
  await page.locator("#tab-btn-graph").click();
  await expect(page.locator("#func-table-body tr")).toHaveCount(21);
  expect(
    await page.evaluate(() => graphState.view.yLabels.length),
  ).toBeGreaterThan(2);
  expect(problems).toEqual([]);
});
