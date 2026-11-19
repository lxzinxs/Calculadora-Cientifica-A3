const fs = require("node:fs");
for (const dir of ["assets/css", "assets/fonts", "assets/vendor"])
  fs.mkdirSync(dir, { recursive: true });
for (const [src, dest] of [
  ["node_modules/mathjs/lib/browser/math.js", "assets/vendor/math.js"],
  ["node_modules/mathjs/LICENSE", "assets/vendor/mathjs-LICENSE"],
  [
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "assets/css/icons.css",
  ],
  [
    "node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2",
    "assets/fonts/fa-solid-900.woff2",
  ],
  [
    "node_modules/@fortawesome/fontawesome-free/LICENSE.txt",
    "assets/fonts/fontawesome-LICENSE.txt",
  ],
])
  fs.copyFileSync(src, dest);
// O CSS do FontAwesome fica em assets/css e a fonte em assets/fonts; mantém só a face sólida usada.
let css = fs
  .readFileSync("assets/css/icons.css", "utf8")
  .replaceAll("../webfonts/", "../fonts/");
css = css.replace(/@font-face\{[^}]*\}/g, (rule) =>
  rule.includes("Font Awesome 6 Free") && rule.includes("900") ? rule : "",
);
css = css
  .replace(/url\([^)]*\.ttf[^)]*\)(?: format\([^)]*\))?,?/g, "")
  .replace(/,\s*;/g, ";");
fs.writeFileSync("assets/css/icons.css", css);
