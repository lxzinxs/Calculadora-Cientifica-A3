(function (root) {
  const E =
    typeof module === "object"
      ? require("../core/math-engine")
      : root.MathEngine;
  function fn(expr, vars = {}) {
    const f = E.compile(expr, vars);
    return (x) => {
      const v = f({ x });
      if (typeof v !== "number" || !Number.isFinite(v))
        throw Error("Função indefinida no intervalo real");
      return v;
    };
  }
  function derivative(f, x, order = 1) {
    if (![1, 2].includes(order))
      throw Error("Ordem numérica suportada: 1 ou 2");
    const h =
      (order === 1
        ? Math.cbrt(Number.EPSILON)
        : Math.pow(Number.EPSILON, 0.25)) * Math.max(1, Math.abs(x));
    return order === 1
      ? (f(x + h) - f(x - h)) / (2 * h)
      : (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
  }
  function integrate(f, a, b, method = "simpson", n = 1000) {
    E.integer(n, 10000);
    if (!Number.isFinite(a) || !Number.isFinite(b) || n < 2 || n % 2)
      throw Error("Intervalo inválido ou número de subdivisões ímpar");
    if (a === b) return 0;
    const h = (b - a) / n;
    let sum = (f(a) + f(b)) * (method === "trapezoid" ? 0.5 : 1);
    for (let j = 1; j < n; j++)
      sum += f(a + j * h) * (method === "trapezoid" ? 1 : j % 2 ? 4 : 2);
    const v = (sum * h) / (method === "trapezoid" ? 1 : 3);
    if (!Number.isFinite(v)) throw Error("Integral fora do limite");
    return v;
  }
  function rootFind(f, a, b, method = "bisection") {
    let fa = f(a),
      fb = f(b);
    if (Math.abs(fa) < 1e-10) return a;
    if (Math.abs(fb) < 1e-10) return b;
    if (method === "bisection" && Math.sign(fa) === Math.sign(fb))
      throw Error("Bisseção requer mudança de sinal no intervalo");
    for (let j = 0; j < 100; j++) {
      let x =
        method === "bisection"
          ? (a + b) / 2
          : method === "newton"
            ? b - fb / derivative(f, b)
            : b - (fb * (b - a)) / (fb - fa);
      if (!Number.isFinite(x)) throw Error("Método não convergiu");
      const fx = f(x);
      if (Math.abs(fx) < 1e-10) return x;
      if (method === "bisection") {
        if (Math.sign(fa) !== Math.sign(fx)) {
          b = x;
          fb = fx;
        } else {
          a = x;
          fa = fx;
        }
      } else {
        a = b;
        fa = fb;
        b = x;
        fb = fx;
      }
    }
    throw Error("Sem convergência em 100 iterações");
  }
  const api = { fn, derivative, integrate, rootFind };
  root.Numerical = api;
  if (typeof module === "object") module.exports = api;
})(globalThis);
