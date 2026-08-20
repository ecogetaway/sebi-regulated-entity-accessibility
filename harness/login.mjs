// Opens a REAL, VISIBLE browser window so the account holder can sign in
// themselves. Claude never sees, types, or stores the credentials -- the only
// thing written to disk is the resulting session cookie jar, under .auth/,
// which is gitignored.
//
//   node login.mjs 5paisa https://www.5paisa.com/
//
// Sign in in the window that opens, navigate to the screen you want measured,
// then press Enter in this terminal. Run `node scan-auth.mjs 5paisa <url...>`
// afterwards.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import readline from 'node:readline/promises';

const [name, startUrl] = process.argv.slice(2);
if (!name || !startUrl) {
  console.error('usage: node login.mjs <broker-slug> <start-url>');
  process.exit(1);
}
mkdirSync('.auth', { recursive: true });

// channel:'chrome' uses the real installed Chrome rather than a bundled headless
// shell. Several brokers' edge protection rejects headless outright; this is a
// genuine browser driven by the account holder on their own machine, not an
// attempt to look like something it isn't.
const ctx = await chromium.launchPersistentContext(`.auth/${name}-profile`, {
  headless: false,
  channel: 'chrome',
  viewport: { width: 1280, height: 900 },
});
const page = ctx.pages()[0] || await ctx.newPage();
await page.goto(startUrl, { waitUntil: 'domcontentloaded' });

console.log(`\nA browser window is open.
  1. Sign in yourself. Do not paste credentials into this terminal.
  2. Navigate to the screen you want measured (dashboard, order pad, portfolio).
  3. Come back here and press Enter.\n`);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
await rl.question('Press Enter when signed in and on the target screen... ');
rl.close();

await ctx.storageState({ path: `.auth/${name}.json` });
console.log(`\nsaved .auth/${name}.json`);
console.log(`current url: ${page.url()}`);
console.log(`\nnext:  node scan-auth.mjs ${name} "${page.url()}"`);
await ctx.close();
