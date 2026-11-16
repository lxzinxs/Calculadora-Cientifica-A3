function calculateNumerical() {
  const box = document.getElementById("calculus-results-box");
  try {
    const f = Numerical.fn(document.getElementById("calc-func-expr").value);
    const x = readNumber("calc-x0"),
      a = readNumber("calc-a"),
      b = readNumber("calc-b");
    const d1 = Numerical.derivative(f, x),
      d2 = Numerical.derivative(f, x, 2);
    const integral = Numerical.integrate(
      f,
      a,
      b,
      document.getElementById("integral-method").value,
    );
    box.textContent = `Aproximações numéricas: f′(${x}) ≈ ${d1.toPrecision(10)}; f″(${x}) ≈ ${d2.toPrecision(10)}; ∫[${a}, ${b}] ≈ ${integral.toPrecision(10)}`;
  } catch (err) {
    box.textContent = err.message;
  }
}
function solveRoot() {
  try {
    const f = Numerical.fn(document.getElementById("calc-func-expr").value);
    const value = Numerical.rootFind(
      f,
      readNumber("calc-a"),
      readNumber("calc-b"),
      document.getElementById("root-method").value,
    );
    document.getElementById("root-result").textContent =
      "Raiz aproximada: " + value.toPrecision(12);
  } catch (err) {
    document.getElementById("root-result").textContent = err.message;
  }
}
function symbolicDerivative() {
  try {
    const expr = document.getElementById("calc-func-expr").value;
    MathEngine.compile(expr, { x: 0 });
    if (document.getElementById("angle-mode").value !== "RAD")
      throw Error("Derivação simbólica usa RAD; selecione RAD");
    document.getElementById("root-result").textContent =
      "Derivada simbólica (RAD): " +
      MathEngine.math.derivative(expr, "x").toString();
  } catch (err) {
    document.getElementById("root-result").textContent = err.message;
  }
}
