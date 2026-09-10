/**
 * Apple client secret birim testi — `npm run test:apple`.
 *
 * Veritabanı ve ağ gerektirmez. Test kendi P-256 anahtarını üretiyor, onu
 * `APPLE_PRIVATE_KEY` gibi (tek satır, `\n` kaçışlı) ortama koyuyor ve
 * `appleClientSecret()`in ürettiği JWT'yi baştan sona doğruluyor.
 *
 * NEDEN BU TEST: Apple'ın /auth/revoke ucu yanlış imzada yalnız "invalid_client"
 * diyor, sebebini söylemiyor. İki klasik hata da burada yakalanıyor:
 *  - imza biçimi: Node ECDSA'yı DER üretir, JWS ham r||s ister (derToJose),
 *  - PEM kaçışları: `.env` tek satır tutuyor, `\n` geri açılmazsa anahtar okunmaz.
 * İkisi de ancak gerçek bir Apple hesabıyla, silme anında patlardı.
 */
import { createPrivateKey, createPublicKey, createVerify, generateKeyPairSync } from "node:crypto";
import { appleClientSecret, appleRevokeConfigured } from "../src/lib/auth/apple";

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

const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
const pem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();

// Ortam: .env'deki gibi TEK SATIR, satır sonları "\n" kaçışıyla.
process.env.APPLE_BUNDLE_ID = "app.lernomi.ios";
process.env.APPLE_TEAM_ID = "AB12CD34EF";
process.env.APPLE_KEY_ID = "KEY1234567";
process.env.APPLE_PRIVATE_KEY = pem.replace(/\n/g, "\\n");

// Modül env'i import anında DEĞİL, çağrı anında okuyor; bu yüzden yukarıdaki
// statik import yeterli ve testin ortamı önce kurması bir sıra sorunu doğurmuyor.

const b64urlDecode = (s: string) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

/** Ham r||s imzayı DER'e çevirir — createVerify DER bekliyor. */
function joseToDer(sig: Buffer): Buffer {
  const trim = (b: Buffer) => {
    let i = 0;
    while (i < b.length - 1 && b[i] === 0) i++;
    const v = b.subarray(i);
    return v[0] & 0x80 ? Buffer.concat([Buffer.from([0]), v]) : v;
  };
  const r = trim(sig.subarray(0, 32));
  const s = trim(sig.subarray(32));
  const body = Buffer.concat([Buffer.from([0x02, r.length]), r, Buffer.from([0x02, s.length]), s]);
  return Buffer.concat([Buffer.from([0x30, body.length]), body]);
}

console.log("Apple client secret");

check("yapılandırma dolu sayılıyor", appleRevokeConfigured());

const now = 1_757_000_000_000; // sabit an: exp/iat aritmetiği kayarsa görünür
const jwt = appleClientSecret(now);
const [h, p, sig] = jwt.split(".");
check("üç parçalı JWT", Boolean(h && p && sig), `parça: ${jwt.split(".").length}`);

const header = JSON.parse(b64urlDecode(h).toString()) as Record<string, string>;
const payload = JSON.parse(b64urlDecode(p).toString()) as Record<string, string | number>;

check("alg ES256", header.alg === "ES256", String(header.alg));
check("kid = APPLE_KEY_ID", header.kid === "KEY1234567", String(header.kid));
check("iss = takım kimliği", payload.iss === "AB12CD34EF", String(payload.iss));
check("sub = bundle kimliği", payload.sub === "app.lernomi.ios", String(payload.sub));
check("aud = appleid.apple.com", payload.aud === "https://appleid.apple.com", String(payload.aud));
check("iat verilen andan", payload.iat === Math.floor(now / 1000), String(payload.iat));
check("exp 5 dakika sonra", (payload.exp as number) - (payload.iat as number) === 300, `${payload.exp}`);
check("exp Apple'ın 6 ay sınırının altında", (payload.exp as number) - (payload.iat as number) < 15_777_000);
check("jti var (tek kullanım)", typeof payload.jti === "string" && payload.jti.length > 10);

// İmza: ham r||s tam 64 bayt olmalı, yoksa Apple invalid_client der.
const raw = b64urlDecode(sig);
check("imza 64 bayt (ham r||s)", raw.length === 64, `${raw.length} bayt`);

const verifier = createVerify("SHA256");
verifier.update(`${h}.${p}`);
verifier.end();
const pub = createPublicKey(createPrivateKey(pem));
check("imza açık anahtarla doğrulanıyor", verifier.verify(pub, joseToDer(raw)));

// İki çağrı aynı jti'yi vermemeli (Apple tekrar kullanımı reddediyor).
check("her çağrı yeni jti", appleClientSecret(now) !== appleClientSecret(now));

// Eksik yapılandırmada hiç denenmemeli.
process.env.APPLE_PRIVATE_KEY = "";
check("anahtar yokken yapılandırılmamış sayılıyor", !appleRevokeConfigured());

/**
 * Sunucudan sunucuya bildirim doğrulaması.
 *
 * NEDEN BU TEST: uç kimlik doğrulamasız ve herkese açık; tek kapı imza. Kapının
 * yanlış açıldığı üç klasik yol da burada deneniyor — `alg` başlığına uymak,
 * `aud` kontrolünü atlamak, imzayı hiç bakmadan geçmek. Üçü de gerçek hayatta
 * ancak birinin uydurma bildirimle hesap sildirmesiyle fark edilirdi.
 *
 * Ağ yok: Apple'ın JWKS'i yerine testin ürettiği RSA anahtarı önbelleğe elle
 * konuyor.
 */
async function notificationTests(): Promise<void> {
  const { generateKeyPairSync: genRsa, createSign } = await import("node:crypto");
  const { verifyAppleNotification, __setAppleJwksForTest } = await import(
    "../src/lib/auth/apple-notifications"
  );

  console.log("\nApple sunucudan sunucuya bildirim");

  process.env.APPLE_BUNDLE_ID = "app.lernomi.ios";
  const { publicKey, privateKey: rsaPrivate } = genRsa("rsa", { modulusLength: 2048 });
  const jwk = publicKey.export({ format: "jwk" }) as Record<string, string>;
  __setAppleJwksForTest([{ ...jwk, kid: "TESTKID", alg: "RS256", use: "sig" }]);

  const b64u = (b: Buffer) => b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const nowS = Math.floor(now / 1000);

  /** Verilen başlık ve iddialarla imzalı bir JWS üretir. */
  function sign(claims: Record<string, unknown>, head: Record<string, unknown> = {}): string {
    const h = b64u(Buffer.from(JSON.stringify({ alg: "RS256", kid: "TESTKID", ...head })));
    const p = b64u(Buffer.from(JSON.stringify(claims)));
    const s = createSign("RSA-SHA256");
    s.update(`${h}.${p}`);
    s.end();
    return `${h}.${p}.${b64u(s.sign(rsaPrivate))}`;
  }

  const base = (events: unknown, over: Record<string, unknown> = {}) => ({
    iss: "https://appleid.apple.com",
    aud: "app.lernomi.ios",
    iat: nowS,
    exp: nowS + 600,
    jti: "test-jti",
    events,
    ...over,
  });

  // Apple `events`i JSON DİZGİ olarak gönderiyor — asıl biçim bu.
  const revoked = JSON.stringify({ type: "consent-revoked", sub: "001234.abcdef", event_time: now });
  const okRes = await verifyAppleNotification(sign(base(revoked)), now);
  check("geçerli bildirim doğrulanıyor", okRes.ok, okRes.ok ? "" : okRes.reason);
  check("olay türü okundu", okRes.ok && okRes.event.type === "consent-revoked");
  check("sub okundu", okRes.ok && okRes.event.sub === "001234.abcdef");

  // Belgelerin bazı örnekleri nesne veriyor; ikisi de kabul edilmeli.
  const asObject = await verifyAppleNotification(
    sign(base({ type: "account-delete", sub: "001234.abcdef" })),
    now,
  );
  check("events nesne olarak da okunuyor", asObject.ok && asObject.event.type === "account-delete");

  const emailEv = JSON.stringify({
    type: "email-disabled",
    sub: "001234.abcdef",
    email: "x@privaterelay.appleid.com",
    is_private_email: "true",
  });
  const emailRes = await verifyAppleNotification(sign(base(emailEv)), now);
  check(
    "is_private_email dizgisi boolean'a çevriliyor",
    emailRes.ok && emailRes.event.isPrivateEmail === true,
  );

  // ── reddedilmesi gerekenler ──────────────────────────────────────────────

  const tampered = (() => {
    const parts = sign(base(revoked)).split(".");
    const sig = Buffer.from(parts[2].replace(/-/g, "+").replace(/_/g, "/"), "base64");
    sig[0] ^= 0xff;
    return `${parts[0]}.${parts[1]}.${b64u(sig)}`;
  })();
  const bad = await verifyAppleNotification(tampered, now);
  check("bozulmuş imza reddediliyor", !bad.ok && bad.reason === "bad_signature", bad.ok ? "kabul edildi" : bad.reason);

  const otherApp = await verifyAppleNotification(sign(base(revoked, { aud: "com.baskasi.app" })), now);
  check("başka uygulamanın bildirimi reddediliyor", !otherApp.ok && otherApp.reason === "bad_audience");

  const badIss = await verifyAppleNotification(sign(base(revoked, { iss: "https://evil.example" })), now);
  check("sahte issuer reddediliyor", !badIss.ok && badIss.reason === "bad_issuer");

  // `alg` başlığına uymak JWT'nin en bilinen zafiyeti: header ne derse desin RS256.
  const noneAlg = await verifyAppleNotification(sign(base(revoked), { alg: "none" }), now);
  check("alg:none reddediliyor", !noneAlg.ok && noneAlg.reason === "bad_alg");
  const hs256 = await verifyAppleNotification(sign(base(revoked), { alg: "HS256" }), now);
  check("alg:HS256 reddediliyor", !hs256.ok && hs256.reason === "bad_alg");

  const expired = await verifyAppleNotification(sign(base(revoked, { exp: nowS - 3600 })), now);
  check("süresi geçmiş bildirim reddediliyor", !expired.ok && expired.reason === "expired");

  const unknownKid = await verifyAppleNotification(sign(base(revoked), { kid: "BASKA" }), now);
  check("tanınmayan kid reddediliyor", !unknownKid.ok);

  const weird = await verifyAppleNotification(
    sign(base(JSON.stringify({ type: "bir-sey", sub: "001234.abcdef" }))),
    now,
  );
  check("bilinmeyen olay türü reddediliyor", !weird.ok && weird.reason.startsWith("unknown_type"));

  const noSub = await verifyAppleNotification(sign(base(JSON.stringify({ type: "consent-revoked" }))), now);
  check("sub'suz olay reddediliyor", !noSub.ok && noSub.reason === "no_sub");

  const junk = await verifyAppleNotification("bu-bir-jws-degil", now);
  check("bozuk JWS reddediliyor", !junk.ok && junk.reason === "malformed_jws");

  // Yapılandırma yoksa hiç denenmemeli: `aud` karşılaştırılamaz.
  process.env.APPLE_BUNDLE_ID = "";
  const unconfigured = await verifyAppleNotification(sign(base(revoked)), now);
  check("bundle kimliği yokken doğrulama yapılmıyor", !unconfigured.ok && unconfigured.reason === "not_configured");
}

void notificationTests().then(() => {
  console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total} test`);
  process.exit(failures === 0 ? 0 : 1);
});
