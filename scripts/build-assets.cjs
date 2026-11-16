const fs = require("node:fs");
for (const dir of ["assets", "assets/webfonts"])
  fs.mkdirSync(dir, { recursive: true });
for (const [src, dest] of [
  ["node_modules/mathjs/lib/browser/math.js", "assets/math.js"],
  ["node_modules/mathjs/LICENSE", "assets/mathjs-LICENSE"],
  [
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "assets/icons.css",
  ],
  [
    "node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2",
    "assets/webfonts/fa-solid-900.woff2",
  ],
  [
    "node_modules/@fortawesome/fontawesome-free/LICENSE.txt",
    "assets/fontawesome-LICENSE.txt",
  ],
])
  fs.copyFileSync(src, dest);
// FontAwesome CSS expects ../webfonts; keep only the solid face used by this app.
let css = fs
  .readFileSync("assets/icons.css", "utf8")
  .replaceAll("../webfonts/", "webfonts/");
css = css.replace(/@font-face\{[^}]*\}/g, (rule) =>
  rule.includes("Font Awesome 6 Free") && rule.includes("900") ? rule : "",
);
css = css
  .replace(/url\([^)]*\.ttf[^)]*\)(?: format\([^)]*\))?,?/g, "")
  .replace(/,\s*;/g, ";");
fs.writeFileSync("assets/icons.css", css);
