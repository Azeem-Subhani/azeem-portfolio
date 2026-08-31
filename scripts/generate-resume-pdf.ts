import { spawn } from "node:child_process";
import path from "node:path";

import { chromium } from "@playwright/test";

const ROOT = path.resolve(import.meta.dirname, "..");
const PORT = 4399;
const OUTPUT_PATH = path.join(ROOT, "public", "azeem-subhani-resume.pdf");

function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          resolve();
          return;
        }
      } catch {
        // server not up yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server at ${url} did not respond in time.`));
        return;
      }

      setTimeout(attempt, 500);
    };

    attempt();
  });
}

async function run() {
  const server = spawn(
    "npx",
    ["next", "start", "-p", String(PORT)],
    { cwd: ROOT, stdio: "inherit" },
  );

  const cleanup = () => {
    server.kill();
  };
  process.on("exit", cleanup);

  try {
    await waitForServer(`http://localhost:${PORT}/resume`, 30_000);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/resume`, { waitUntil: "networkidle" });
    // The root loading.tsx boundary can still be showing when "networkidle"
    // resolves during streamed SSR. Wait for real content explicitly instead
    // of trusting that signal alone.
    await page
      .getByRole("heading", { level: 1, name: "Azeem Subhani" })
      .waitFor({ state: "visible", timeout: 15_000 });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: OUTPUT_PATH,
      format: "Letter",
      printBackground: true,
      margin: { top: "0.5in", bottom: "0.5in", left: "0.6in", right: "0.6in" },
    });
    await browser.close();

    console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  } finally {
    cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
