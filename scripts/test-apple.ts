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

console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total} test`);
process.exit(failures === 0 ? 0 : 1);
