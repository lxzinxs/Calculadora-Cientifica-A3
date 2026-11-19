const { test } = require("node:test");
const assert = require("node:assert/strict");
const E = require("../src/js/core/math-engine"),
  N = require("../src/js/modules/numerical"),
  A = require("../src/js/modules/advanced");
const close = (a, b, tol = 1e-10) =>
  assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} ≠ ${b}`);
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
for (const [expr, result] of required)
  test("Obrigatório: " + expr, () => close(E.evaluate(expr), result));
test("Precedência, sinais, porcentagem, notação científica e domínios", () => {
  for (const [expr, result] of [
    ["2^3^2", 512],
    ["-5^2", -25],
    ["2^-3", 0.125],
    [".1+.2", 0.3],
    ["50%+2", 2.5],
    ["50%^2", 0.25],
    ["(25+25)%", 0.5],
    ["sin(0)%", 0],
    ["200*10%", 20],
    ["1e-8*2", 2e-8],
    ["2*-3", -6],
    ["2--3", 5],
    ["(2+3)!", 120],
  ])
    close(E.evaluate(expr), result);
  for (const expr of [
    "1/0",
    "0/0",
    "5.5!",
    "(-1)!",
    "(2+",
    "2**3",
    "2+*3",
    "log(0)",
    "1e999",
  ])
    assert.throws(() => E.evaluate(expr));
});
test("Bloqueio de código, atribuições, acessos e custos excessivos", () => {
  for (const expr of [
    "window.alert(1)",
    'constructor.constructor("return process")()',
    'import("x")',
    "a=3",
    "f(x)=x",
    "[1:100000]",
    "identity(1000000)",
    "pow(2,100000)",
    "2^100000",
    "171!",
    'fraction("1e10000000")',
    'evaluate("1+1")',
    'simplify("factorial(1000000)")',
  ])
    assert.throws(() => E.evaluate(expr), expr);
});
test("Trigonometria e complexos", () => {
  E.setAngle("DEG");
  close(E.evaluate("sin(30)"), 0.5);
  close(E.evaluate("asin(0.5)"), 30);
  E.setAngle("RAD");
  close(E.evaluate("sin(pi/2)"), 1);
  assert.equal(E.format(E.evaluate("sqrt(-4)")), "2i");
  close(E.evaluate("abs(3+4i)"), 5);
  close(E.evaluate("re(exp(i*pi))"), -1);
  close(E.evaluate("ln(e)"), 1);
});
test("Funções avançadas exatas", () => {
  assert.equal(E.format(E.evaluate('periodic(0,"1","6")')), "1/6");
  assert.equal(
    E.format(E.evaluate('bignumber("12345678901234567890")+1')),
    "12345678901234567891",
  );
  assert.equal(E.format(E.evaluate("fibonacci(100)")), "354224848179261915075");
  assert.deepEqual(E.evaluate("factorize(360)"), [2, 2, 2, 3, 3, 5]);
  assert.equal(E.evaluate("doubleFactorial(7)"), 105);
  assert.equal(E.evaluate("isPrime(97)"), true);
});
test("Gráficos usam f(x) real, domínio e multiplicação implícita", () => {
  for (const [expr, x, result] of [
    ["x^2", 3, 9],
    ["2x+1", 2, 5],
    ["sin(x)", 0, 0],
    ["x^3-2x", 2, 4],
    ["1/x", 2, 0.5],
  ])
    close(N.fn(expr)(x), result);
  assert.throws(() => N.fn("1/x")(0));
  assert.throws(() => N.fn("sqrt(-1)")(0));
});
test("Matrizes, vetores e sistemas", () => {
  close(E.evaluate("det([[1,2],[3,4]])"), -2);
  assert.deepEqual(E.evaluate("inv([[1,2],[3,4]])").toArray(), [
    [-2, 1],
    [1.5, -0.5],
  ]);
  assert.deepEqual(E.evaluate("lusolve([[2,0],[0,3]],[[4],[9]])").toArray(), [
    [2],
    [3],
  ]);
  assert.equal(E.evaluate("rank([[1,2],[2,4]])"), 1);
  close(E.evaluate("dot([1,2,3],[4,5,6])"), 32);
  assert.deepEqual(E.evaluate("cross([1,0,0],[0,1,0])").toArray(), [0, 0, 1]);
  assert.throws(() => E.evaluate("inv([[1,2],[2,4]])"));
});
test("Cálculo numérico e raízes", () => {
  const f = N.fn("x^2");
  close(N.derivative(f, 3), 6, 1e-7);
  close(N.derivative(f, 3, 2), 2, 1e-6);
  close(N.integrate(f, 0, 1), 1 / 3);
  close(N.integrate(f, 1, 0), -1 / 3);
  close(N.integrate(f, 0, 0), 0);
  close(N.integrate(f, 0, 1, "trapezoid"), 1 / 3, 1e-6);
  for (const method of ["bisection", "newton", "secant"])
    close(N.rootFind(N.fn("x^2-2"), 0, 2, method), Math.sqrt(2), 1e-8);
  assert.throws(() => N.integrate(N.fn("1/x"), -1, 1));
  assert.throws(() => N.rootFind(N.fn("x^2+1"), -1, 1));
});
test("Estatística, regressão, equações e triângulo", () => {
  const s = A.statistics([1, 2, 3], [3, 5, 7], [1, 2, 1]);
  close(s.média, 2);
  close(s.variância_amostral, 1);
  close(s.correlação, 1);
  close(s.inclinação, 2);
  close(s.intercepto, 1);
  close(s.média_ponderada, 2);
  assert.deepEqual(A.quadratic(1, -3, 2), [2, 1]);
  assert.equal(E.format(A.quadratic(1, 0, 1)[0]), "i");
  close(A.triangle(3, 4, 90).lado_c, 5);
  assert.throws(() => A.statistics([1, 2], [1]));
  assert.throws(() => A.dataset("2,abc"));
});
test("Probabilidades, finanças, unidades e bases", () => {
  close(E.evaluate("binomial(10,3,0.5)"), 0.1171875);
  close(E.evaluate("normal(0)"), 1 / Math.sqrt(2 * Math.PI));
  close(E.evaluate("poisson(2,3)"), (9 * Math.exp(-3)) / 2);
  close(E.evaluate("compoundInterest(1000,0.1,2)"), 1210);
  close(E.evaluate("payment(1200,0,12)"), 100);
  close(E.evaluate("sac(1200,0.01,12,1)"), 112);
  assert.equal(E.format(E.evaluate('to(unit(0,"degC"),"degF")')), "32 degF");
  assert.equal(A.convertBase("255", 10, 16), "FF");
  assert.equal(A.convertBase("-FF", 16, 2), "-11111111");
  close(E.evaluate("bitNot(0)"), -1);
  assert.throws(() => E.evaluate('to(unit(1,"m"),"kg")'));
});

test("Funções personalizadas limitadas e sem recursão", () => {
  E.defineFunction("testF", "x^2+1");
  close(E.evaluate("testF(2)"), 5);
  assert.throws(() => E.defineFunction("testF", "x"));
  assert.throws(() => E.defineFunction("recursiveF", "recursiveF(x)"));
});

test("Orçamento impede explosão de funções personalizadas encadeadas", () => {
  E.defineFunction("chainA", Array(10).fill("x").join("+"));
  E.defineFunction("chainB", Array(10).fill("chainA(x)").join("+"));
  E.defineFunction("chainC", Array(10).fill("chainB(x)").join("+"));
  E.defineFunction("chainD", Array(10).fill("chainC(x)").join("+"));
  assert.throws(() => E.evaluate("chainD(2)"), /Limite de operações/);
});
