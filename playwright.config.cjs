const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.cjs",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:8000", headless: true },
  webServer: {
    command: "python3 -m http.server 8000 --bind 127.0.0.1",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "ignore",
  },
  reporter: "list",
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
  ],
});
