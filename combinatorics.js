// --- COMBINATORICS ENGINE ---
function bigIntFactorial(n) {
  if (n < 0n || n > 1000n) throw Error("Use inteiro entre 0 e 1000");
  let res = 1n;
  for (let i = 2n; i <= n; i++) res *= i;
  return res;
}

function formatBigIntThousand(bigint) {
  return bigint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateCombinatorics() {
  const box = document.getElementById("comb-results-box");
  try {
    const n = MathEngine.integer(readNumber("comb-n"));
    const k = MathEngine.integer(readNumber("comb-k"), n);
    const repStr = document.getElementById("comb-rep").value.trim();
    const reps = repStr
      ? repStr.split(",").map((x) => {
          if (!/^\d+$/.test(x.trim()))
            throw Error(
              "Repetições devem ser inteiros positivos separados por vírgula",
            );
          const value = MathEngine.integer(Number(x), n);
          if (!value) throw Error("Repetições devem ser positivas");
          return value;
        })
      : [];
    if (reps.reduce((a, b) => a + b, 0) > n)
      throw Error(
        "A soma das repetições não pode exceder n (elementos restantes são distintos)",
      );
    const nBig = BigInt(n);
    const kBig = BigInt(k);

    const nFact = bigIntFactorial(nBig);
    const permSimple = nFact;

    let repDenom = 1n;
    reps.forEach((r) => (repDenom *= bigIntFactorial(BigInt(r))));
    const permRep = nFact / repDenom;

    let arrSimple = 0n;
    let combSimple = 0n;
    if (n >= k) {
      arrSimple = nFact / bigIntFactorial(nBig - kBig);
      combSimple =
        nFact / (bigIntFactorial(kBig) * bigIntFactorial(nBig - kBig));
    }

    box.innerHTML = `
        <div><span class="text-cyber-dimText block text-xs">FATORIAL (n!):</span> <span class="font-bold text-cyber-green text-glow-green break-all">${formatBigIntThousand(nFact)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">PERMUTAÇÃO SIMPLES P(${n}):</span> <span class="font-bold text-cyber-cyan text-glow-cyan break-all">${formatBigIntThousand(permSimple)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">PERMUTAÇÃO C/ REPETIÇÃO:</span> <span class="font-bold text-cyber-cyan text-glow-cyan break-all">${formatBigIntThousand(permRep)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">ARRANJO SIMPLES A(${n}, ${k}):</span> <span class="font-bold text-cyber-magenta text-glow-magenta break-all">${formatBigIntThousand(arrSimple)}</span></div>
        <div><span class="text-cyber-dimText block text-xs">COMBINAÇÃO SIMPLES C(${n}, ${k}):</span> <span class="font-bold text-cyber-magenta text-glow-magenta break-all">${formatBigIntThousand(combSimple)}</span></div>
        <div>COMBINAÇÃO C/ REPETIÇÃO: ${formatBigIntThousand(k === 0 ? 1n : n === 0 ? 0n : Array.from({ length: k }, (_, i) => BigInt(i + 1)).reduce((v, j) => (v * (nBig + j - 1n)) / j, 1n))}</div>
    `;
  } catch (err) {
    box.textContent = err.message;
  }
}
