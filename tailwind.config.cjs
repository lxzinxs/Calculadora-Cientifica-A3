module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "var(--cyber-bg)",
          card: "var(--cyber-card)",
          cardBorder: "var(--cyber-cardBorder)",
          red: "#d32f2f",
          cyan: "#00f3ff",
          magenta: "#ff007f",
          green: "#00ff66",
          text: "var(--cyber-text)",
          dimText: "var(--cyber-dimText)",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "Consolas", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
module.exports.content = ["./index.html", "./*.js"];
