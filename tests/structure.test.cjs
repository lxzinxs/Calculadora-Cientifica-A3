// Integridade da estrutura de pastas: todo caminho referenciado existe,
// é relativo (funciona na raiz e em subdiretórios, como no GitHub Pages)
// e está no cache offline quando é necessário para executar a calculadora.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const exists = (file) => fs.existsSync(path.join(ROOT, file));
const norm = (p) => path.posix.normalize(p.replace(/^\.\//, ""));

const html = read("index.html");
const localRefs = [...html.matchAll(/\s(?:src|href)="([^"#]+)"/g)]
  .map((m) => m[1])
  .filter((ref) => !/^(https?:|mailto:|data:)/.test(ref));
const swFiles = JSON.parse(
  read("sw.js")
    .match(/const FILES = (\[[\s\S]*?\]);/)[1]
    .replace(/,\s*\]/, "]"),
);

test("index.html: todo recurso local existe e usa caminho relativo", () => {
  assert.ok(localRefs.length >= 19, "esperado CSS, ícone, manifest e scripts");
  for (const ref of localRefs) {
    assert.ok(
      !ref.startsWith("/"),
      `caminho absoluto quebra subdiretório: ${ref}`,
    );
    assert.ok(exists(ref), `arquivo ausente: ${ref}`);
  }
});

test("index.html: scripts mantêm a ordem de carregamento original", () => {
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  // Mesma sequência de antes da reorganização (script.js precede os módulos de aba).
  assert.deepEqual(scripts, [
    "assets/vendor/math.js",
    "src/js/core/math-engine.js",
    "src/js/core/storage.js",
    "src/js/modules/numerical.js",
    "src/js/modules/graph-scale.js",
    "src/js/ui/script.js",
    "src/js/modules/graphs.js",
    "src/js/modules/matrices.js",
    "src/js/modules/combinatorics.js",
    "src/js/modules/calculus.js",
    "src/js/modules/advanced.js",
    "src/js/ui/interface.js",
    "src/js/ui/pwa.js",
  ]);
});

test("Service worker: cache offline cobre todos os recursos da página", () => {
  for (const file of swFiles) {
    assert.ok(!file.startsWith("/"), file);
    if (file !== "./") assert.ok(exists(file), `ausente no disco: ${file}`);
  }
  const cached = new Set(swFiles.map(norm));
  for (const ref of localRefs)
    assert.ok(cached.has(norm(ref)), `fora do cache offline: ${ref}`);
  // Fontes referenciadas pelo CSS também precisam estar no cache.
  for (const css of ["assets/css/fonts.css", "assets/css/icons.css"])
    for (const [, url] of read(css).matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
      const target = path.posix.join(path.posix.dirname(css), url);
      assert.ok(exists(target), `${css} aponta para arquivo ausente: ${url}`);
      assert.ok(cached.has(target), `fonte fora do cache: ${target}`);
    }
  assert.match(read("sw.js"), /const CACHE = "cybercalc-a3-v\d+"/);
});

test("Manifest PWA: ícones existem, são relativos e estão no cache", () => {
  const manifest = JSON.parse(read("manifest.webmanifest"));
  assert.equal(manifest.start_url, "./index.html");
  assert.equal(manifest.scope, "./");
  for (const icon of manifest.icons) {
    assert.ok(exists(icon.src), icon.src);
    assert.ok(swFiles.map(norm).includes(norm(icon.src)), icon.src);
  }
});

test("Build: destinos do build-assets e do Tailwind batem com a página", () => {
  const build = read("scripts/build-assets.cjs");
  for (const target of [
    "assets/vendor/math.js",
    "assets/css/icons.css",
    "assets/fonts/fa-solid-900.woff2",
  ])
    assert.ok(build.includes(`"${target}"`), target);
  const pkg = JSON.parse(read("package.json"));
  assert.match(
    pkg.scripts.build,
    /-i src\/styles\/tailwind\.css -o assets\/css\/utilities\.css/,
  );
  assert.ok(exists("src/styles/tailwind.css"));
  assert.match(read("tailwind.config.cjs"), /"\.\/src\/js\/\*\*\/\*\.js"/);
});

test("Licenças acompanham fontes e dependências distribuídas", () => {
  for (const file of [
    "assets/fonts/inter-OFL.txt",
    "assets/fonts/jetbrains-OFL.txt",
    "assets/fonts/fontawesome-LICENSE.txt",
    "assets/vendor/mathjs-LICENSE",
  ])
    assert.ok(exists(file), file);
});

test("Raiz organizada: só sw.js como JavaScript solto", () => {
  const rootJs = fs
    .readdirSync(ROOT)
    .filter((f) => /\.(js|css)$/.test(f))
    .sort();
  assert.deepEqual(rootJs, ["sw.js"]);
});

test("Links relativos do README e da apresentação apontam para arquivos reais", () => {
  const docs = [
    "README.md",
    "apresentacao/apresentacao.md",
    "apresentacao/ENTREGA-VISUAL.md",
  ];
  let checked = 0;
  for (const doc of docs)
    for (const [, link] of read(doc).matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|#|mailto:)/.test(link)) continue;
      const target = path.join(
        ROOT,
        path.dirname(doc),
        decodeURIComponent(link.split("#")[0]),
      );
      assert.ok(fs.existsSync(target), `${doc} → ${link}`);
      checked++;
    }
  assert.ok(checked >= 15, `poucos links verificados: ${checked}`);
  assert.ok(
    fs
      .readdirSync(path.join(ROOT, "docs", "academico"))
      .some((f) => f.endsWith(".pdf")),
    "PDF da primeira entrega",
  );
});
