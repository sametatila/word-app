import { pinLegacyFields, pinLegacyRedirects, pinLegacyUrl } from "../src/lib/auth/legacy-redirects";

/**
 * Eski alan adına (exfe.me) giden yönlendirmeler asıl alan adına sabitleniyor mu —
 * `npm run test:legacy-redirects`. Güvenlik denetimi 2026-09-14, bilgi maddesi.
 */

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  if (ok) console.log(`  ✓ ${name}`);
  else {
    fails++;
    console.log(`  ✗ ${name}${detail ? ` → ${detail}` : ""}`);
  }
};
const BASE = "https://www.lernomi.app";

console.log("adres çevirisi");
check("www.exfe.me → asıl alan, yol+sorgu+çapa korunur", pinLegacyUrl("https://www.exfe.me/reset-password?a=1#x", BASE) === `${BASE}/reset-password?a=1#x`);
check("exfe.me (apex) de çevrilir", pinLegacyUrl("https://exfe.me/learn", BASE) === `${BASE}/learn`);
check("büyük harfli host da çevrilir", pinLegacyUrl("https://WWW.EXFE.ME/x", BASE) === `${BASE}/x`);
check("http eski alan da çevrilir", pinLegacyUrl("http://exfe.me/x", BASE) === `${BASE}/x`);
check("asıl alan dokunulmaz", pinLegacyUrl(`${BASE}/learn`, BASE) === null);
check("göreli yol dokunulmaz", pinLegacyUrl("/learn", BASE) === null);
check("sonek taklidi (exfe.me.evil.example) dokunulmaz, better-auth reddeder", pinLegacyUrl("https://exfe.me.evil.example/x", BASE) === null);
check("başka alan dokunulmaz", pinLegacyUrl("https://evil.example/x", BASE) === null);
check("yedek alan adı (lernomi.rumpuskit.com) asıl alana sabitlenir", pinLegacyUrl("https://lernomi.rumpuskit.com/learn?a=1", BASE) === `${BASE}/learn?a=1`);
check("yedek alanın sonek taklidi dokunulmaz", pinLegacyUrl("https://lernomi.rumpuskit.com.evil.example/x", BASE) === null);

console.log("\ngövde alanları");
const f = pinLegacyFields({ email: "a@b.c", redirectTo: "https://www.exfe.me/reset-password", callbackURL: "/learn", errorCallbackURL: "https://exfe.me/login" }, BASE);
check("redirectTo ve errorCallbackURL çevrildi, diğerleri aynı",
  !!f && f.redirectTo === `${BASE}/reset-password` && f.errorCallbackURL === `${BASE}/login` && f.callbackURL === "/learn" && f.email === "a@b.c", JSON.stringify(f));
check("değişiklik yoksa null", pinLegacyFields({ email: "a@b.c", callbackURL: `${BASE}/x` }, BASE) === null);

async function main() {
  console.log("\nistek");
  const post = new Request("https://www.exfe.me/api/auth/request-password-reset", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://www.exfe.me", "x-captcha-response": "tok" },
    body: JSON.stringify({ email: "kurban@example.com", redirectTo: "https://www.exfe.me/reset-password" }),
  });
  const p = await pinLegacyRedirects(post, BASE);
  const pb = JSON.parse(await p.text());
  check("JSON gövdede redirectTo asıl alana çevrildi", pb.redirectTo === `${BASE}/reset-password` && pb.email === "kurban@example.com", JSON.stringify(pb));
  check("Origin ve diğer başlıklar korundu (eski uygulama Origin denetimini geçer)", p.headers.get("origin") === "https://www.exfe.me" && p.headers.get("x-captcha-response") === "tok");
  check("yöntem ve adres korundu", p.method === "POST" && p.url === "https://www.exfe.me/api/auth/request-password-reset");

  const get = new Request(`${BASE}/api/auth/reset-password/TOKEN?callbackURL=${encodeURIComponent("https://exfe.me/reset-password")}`);
  const g = await pinLegacyRedirects(get, BASE);
  check("e-postadaki bağlantı tıklanınca (GET) sorgudaki callbackURL çevrildi", new URL(g.url).searchParams.get("callbackURL") === `${BASE}/reset-password`, g.url);

  const plain = new Request(`${BASE}/api/auth/get-session`);
  check("ilgisiz istek aynı nesne olarak geçiyor", (await pinLegacyRedirects(plain, BASE)) === plain);

  const form = new Request(`${BASE}/api/auth/callback/apple`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "code=abc&state=xyz" });
  const fr = await pinLegacyRedirects(form, BASE);
  check("form gövdesi (Apple form_post) dokunulmadan geçiyor", fr === form && (await fr.text()) === "code=abc&state=xyz");

  const bad = new Request(`${BASE}/api/auth/sign-in/email`, { method: "POST", headers: { "content-type": "application/json" }, body: "{bozuk" });
  check("bozuk JSON aynen iletiliyor (better-auth kendi hatasını verir)", (await (await pinLegacyRedirects(bad, BASE)).text()) === "{bozuk");

  console.log(fails === 0 ? "\ntamam: hepsi geçti" : `\nKALDI: ${fails}`);
  process.exit(fails === 0 ? 0 : 1);
}
main();
