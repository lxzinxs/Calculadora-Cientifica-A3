/* Independent applied-math routines; shared by the interface and Node regression tests. */
(function (root) {
  const E =
    typeof module === "object" ? require("./math-engine") : root.MathEngine;
  const m = E.math;
  function dataset(text) {
    const tokens = text.trim().split(/[\s,;]+/);
    if (!text.trim() || tokens.length > 1000)
      throw Error(
        "Informe de 1 a 1000 valores separados por espaços ou vírgulas (decimais com ponto)",
      );
    const data = tokens.map(Number);
    if (data.some((x) => !Number.isFinite(x)))
      throw Error("Dados devem ser números finitos");
    return data;
  }
  function statistics(data, other = [], weights = []) {
    const n = data.length;
    if (!n) throw Error("Conjunto vazio");
    const sorted = [...data].sort((a, b) => a - b),
      mean = m.mean(data);
    const q = (p) => {
      const i = (n - 1) * p,
        j = Math.floor(i);
      return sorted[j] + (sorted[Math.min(j + 1, n - 1)] - sorted[j]) * (i - j);
    };
    const out = {
      n,
      média: mean,
      mediana: m.median(data),
      moda: m.mode(data),
      mínimo: sorted[0],
      máximo: sorted[n - 1],
      amplitude: sorted[n - 1] - sorted[0],
      Q1: q(0.25),
      Q3: q(0.75),
      variância_populacional: m.variance(data, "uncorrected"),
      desvio_populacional: m.std(data, "uncorrected"),
    };
    if (n > 1) {
      out.variância_amostral = m.variance(data, "unbiased");
      out.desvio_amostral = m.std(data, "unbiased");
    }
    if (data.every((x) => x > 0))
      out.média_geométrica = Math.exp(
        data.reduce((v, x) => v + Math.log(x), 0) / n,
      );
    if (weights.length) {
      if (
        weights.length !== n ||
        weights.some((x) => x < 0) ||
        m.sum(weights) <= 0
      )
        throw Error(
          "Pesos não negativos devem corresponder aos dados e somar > 0",
        );
      out.média_ponderada =
        data.reduce((v, x, i) => v + x * weights[i], 0) / m.sum(weights);
    }
    if (other.length) {
      if (other.length !== n || n < 2)
        throw Error("X e Y devem ter o mesmo tamanho (mínimo 2)");
      const my = m.mean(other),
        sx = data.reduce((v, x) => v + (x - mean) ** 2, 0),
        sy = other.reduce((v, y) => v + (y - my) ** 2, 0),
        sxy = data.reduce((v, x, i) => v + (x - mean) * (other[i] - my), 0);
      out.covariância_amostral = sxy / (n - 1);
      if (sx && sy) out.correlação = sxy / Math.sqrt(sx * sy);
      if (sx) {
        out.inclinação = sxy / sx;
        out.intercepto = my - out.inclinação * mean;
      }
    }
    if (
      Object.values(out)
        .flat()
        .some((x) => typeof x === "number" && !Number.isFinite(x))
    )
      throw Error("Dados excedem o limite numérico");
    return out;
  }
  function quadratic(a, b, c) {
    if (![a, b, c].every(Number.isFinite))
      throw Error("Coeficientes inválidos");
    if (a === 0) {
      if (b === 0) throw Error(c === 0 ? "Infinitas soluções" : "Sem solução");
      return [-c / b];
    }
    const d = b * b - 4 * a * c;
    if (d < 0) {
      const re = -b / (2 * a),
        im = Math.sqrt(-d) / (2 * a);
      return [m.complex(re, im), m.complex(re, -im)];
    }
    const q = -0.5 * (b + (b >= 0 ? 1 : -1) * Math.sqrt(d));
    return q === 0 ? [0, 0] : [q / a, c / q];
  }
  function convertBase(text, from, to) {
    if (![2, 8, 10, 16].includes(from) || ![2, 8, 10, 16].includes(to))
      throw Error("Base deve ser 2, 8, 10 ou 16");
    if (!/^-?[0-9a-f]+$/i.test(text) || text.length > 256)
      throw Error("Inteiro inválido (máximo 256 dígitos)");
    const neg = text[0] === "-",
      digits = (neg ? text.slice(1) : text).toLowerCase();
    let n = 0n;
    for (const d of digits) {
      const v = parseInt(d, 16);
      if (v >= from) throw Error("Dígito incompatível com a base");
      n = n * BigInt(from) + BigInt(v);
    }
    return (neg ? -n : n).toString(to).toUpperCase();
  }
  function triangle(a, b, degrees) {
    if (a <= 0 || b <= 0 || degrees <= 0 || degrees >= 180)
      throw Error("Lados positivos e ângulo entre 0° e 180°");
    const C = (degrees * Math.PI) / 180,
      c = Math.sqrt((a - b) ** 2 + 4 * a * b * Math.sin(C / 2) ** 2);
    return { lado_c: c, área: (a * b * Math.sin(C)) / 2 };
  }
  const api = { dataset, statistics, quadratic, convertBase, triangle };
  root.Advanced = api;
  if (typeof module === "object") module.exports = api;
})(globalThis);
