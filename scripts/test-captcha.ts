/**
 * Turnstile muafiyeti birim testi — `npm run test:captcha`.
 *
 * Veritabanı ve ağ gerektirmez: muaf yol Cloudflare'e hiç gitmiyor, muaf
 * olmayan yol jeton başlığı olmadığı için doğrulamaya varmadan 400 dönüyor.
 *
 * NEDEN BU TEST: muafiyet mağaza incelemesinde girişin tek güvencesi
 * (lib/auth/captcha `CAPTCHA_EXEMPT_EMAILS`) ve iki yönde de sessiz bozulabilir:
 * dar kalmazsa kayıt ve parola sıfırlama korumasız kalır, çalışmazsa inceleme
 * görevlisi giriş yapamaz. İkisi de ancak canlıda, inceleme günü görünürdü.
 */
process.env.TURNSTILE_SITE_KEY = "site";
process.env.TURNSTILE_SECRET_KEY = "secret";
process.env.CAPTCHA_EXEMPT_EMAILS = " Review@Example.test , other@example.test ";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

async function main() {
  const { captchaPlugins } = await import("../src/lib/auth/captcha");
  const [plugin] = captchaPlugins();
  const ctx = { options: { basePath: "/api/auth" }, logger: { error() {} } } as never;
  const call = async (path: string, body: unknown) => {
    const req = new Request(`https://www.lernomi.app/api/auth${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
    const res = (await plugin.onRequest?.(req, ctx)) as { response?: Response } | undefined;
    return res?.response?.status ?? 0;
  };

  console.log("\nTurnstile muafiyeti");
  check("muaf adres jetonsuz girer", (await call("/sign-in/email", { email: "review@example.test", password: "x" })) === 0);
  check("büyük harf ve boşluk fark etmez", (await call("/sign-in/email", { email: "  REVIEW@example.TEST", password: "x" })) === 0);
  check("listedeki ikinci adres de muaf", (await call("/sign-in/email", { email: "other@example.test", password: "x" })) === 0);
  check("başka adres jetonsuz 400", (await call("/sign-in/email", { email: "someone@example.test", password: "x" })) === 400);
  check("muaf adresle KAYIT korunuyor", (await call("/sign-up/email", { email: "review@example.test", password: "x", name: "R" })) === 400);
  check("muaf adresle parola sıfırlama korunuyor", (await call("/request-password-reset", { email: "review@example.test" })) === 400);
  check("bozuk gövde muaf sayılmıyor", (await call("/sign-in/email", "{bozuk")) === 400);

  console.log(`\n${total - failures}/${total} geçti`);
  if (failures) process.exit(1);
}

void main();

export {};
