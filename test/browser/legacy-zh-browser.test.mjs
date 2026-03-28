import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const PREVIEW_PORT = 4173;
const PREVIEW_ORIGIN = process.env.LEGACY_ZH_PREVIEW_ORIGIN || `http://127.0.0.1:${PREVIEW_PORT}`;

async function waitForServer(url, attempts = 40) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Wait for the preview server to start accepting connections.
    }

    await delay(250);
  }

  throw new Error(`Preview server did not start for ${url}`);
}

async function stopServer(server) {
  if (!server || server.killed) {
    return;
  }

  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    delay(1000).then(() => {
      if (!server.killed) {
        server.kill('SIGKILL');
      }
    }),
  ]);
}

test('legacy zh browser redirect lands on the root route family', async () => {
  const server = spawn('python3', ['-m', 'http.server', String(PREVIEW_PORT), '--directory', 'out'], {
    stdio: 'ignore',
  });

  let browser;
  let page;

  try {
    await waitForServer(`${PREVIEW_ORIGIN}/`);
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();

    const cases = [
      ['/zh/', '/'],
      ['/zh/jobs/llm-engineer/', '/jobs/llm-engineer/'],
      ['/zh/q/201/', '/q/201/'],
    ];

    for (const [sourcePath, expectedPath] of cases) {
      const expectedUrl = new URL(expectedPath, PREVIEW_ORIGIN).toString();
      await page.goto(`${PREVIEW_ORIGIN}${sourcePath}`, { waitUntil: 'domcontentloaded' });
      await page.waitForURL(expectedUrl, { timeout: 5000 });
      const finalUrl = new URL(page.url());
      assert.equal(finalUrl.toString(), expectedUrl);
    }
  } finally {
    await page?.close();
    await browser?.close();
    await stopServer(server);
  }
});
