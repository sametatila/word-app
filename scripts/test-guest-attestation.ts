import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "../src/lib/auth/server";
import { purgeUserData } from "../src/lib/account/purge";
import {
  DecodeError,
  evaluateIntegrity,
  guestAttestationConfig,
  guestAttestationMode,
  guestRequestHash,
  readAttestationInput,
  setIntegrityDecoderForTests,
  settleGuestAttestations,
  purgeExpiredGuestAttestations,
  ATTESTATION_RETENTION_DAYS,
  PLAY_INTEGRITY_PACKAGE,
  type IntegrityPayload,
} from "../src/lib/auth/play-integrity";

/**
 * MİSAFİR AÇILIŞINDA CİHAZ DOĞRULAMASI — KAYIT KİPİ (docs/plan/device-attestation.md Aşama 2).
 *
 * Google çağrısı sahte bir çözücüyle değiştiriliyor; geri kalan her şey gerçek:
 * Better Auth'un kendi işleyicisi, `after` kancası ve Postgres'teki tablo.
 * Ölçülenler: hüküm kuralları (paket, özet, tazelik, uygulama, cihaz), kip
 * bayrağı (boş/off hiçbir şey yazmıyor, anahtar yolu yoksa kapalı), her
 * sonuçta misafirin YİNE açıldığı (kimse reddedilmiyor), tekrar kullanılan
 * belge, iOS'un kayda girmemesi, hesap silmede kimliğin boşalması ve
 * saklama süresi dolan satırın günlük süpürmeyle gitmesi (Gizlilik §9).
 *
 *   TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/lernomi \
 *   DATABASE_URL=$TEST_DATABASE_URL BETTER_AUTH_SECRET=test-secret-at-least-32-characters-long \
 *   BETTER_AUTH_URL=http://localhost:3000 npm run test:guest-attestation
 */

const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(url ? "Bu test YALNIZ yerel bir veritabanında koşar." : "TEST_DATABASE_URL tanımlı değil.");
  process.exit(2);
}
const BASE = process.env.BETTER_AUTH_URL ?? "";

let failures = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${typeof detail === "string" ? detail : JSON.stringify(detail)}`}`);
  }
}

const rowsOf = (r: unknown) => ((Array.isArray(r) ? r : (r as { rows: unknown[] }).rows) ?? []) as Record<string, unknown>[];
const created: string[] = [];
const ANDROID = "android/1.0.0/14";

function payload(nonce: string, over: Partial<{ pkg: string; hash: string; ts: number; app: string; device: string[]; lic: string }> = {}): IntegrityPayload {
  return {
    requestDetails: {
      requestPackageName: over.pkg ?? PLAY_INTEGRITY_PACKAGE,
      requestHash: over.hash ?? guestRequestHash(nonce),
      timestampMillis: String(over.ts ?? Date.now()),
    },
    appIntegrity: { appRecognitionVerdict: over.app ?? "PLAY_RECOGNIZED" },
    deviceIntegrity: { deviceRecognitionVerdict: over.device ?? ["MEETS_DEVICE_INTEGRITY"] },
    accountDetails: { appLicensingVerdict: over.lic ?? "LICENSED" },
  };
}

async function signIn(body: unknown, client: string | null) {
  const res = await auth.handler(new Request(`${BASE}/api/auth/sign-in/anonymous`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: BASE, ...(client ? { "x-lernomi-client": client } : {}) },
    body: JSON.stringify(body),
  }));
  const json = (await res.json().catch(() => null)) as { user?: { id?: string } } | null;
  const uid = json?.user?.id ?? null;
  if (uid) created.push(uid);
  await settleGuestAttestations();
  const rows = uid ? rowsOf(await db.execute(sql`select * from guest_attestations where user_id = ${uid}`)) : [];
  return { status: res.status, uid, rows };
}

const nonce = (s: string) => `nonce-${s}-${Math.random().toString(36).slice(2, 12)}`.padEnd(24, "x");
const TOKEN = "tok.en_" + "a".repeat(40);

async function cleanup() {
  for (const uid of created) await purgeUserData(uid).catch(() => {});
  if (created.length) {
    await db.execute(sql`delete from guest_attestations where user_id = any(${sql.param(created)}::text[])`);
    await db.execute(sql`delete from "user" where id = any(${sql.param(created)}::text[])`);
  }
}

async function main() {
  console.log("\nHüküm kuralları");
  const n = nonce("rule");
  const h = guestRequestHash(n);
  check("hepsi yerinde: pass", evaluateIntegrity(payload(n), h).result === "pass");
  check("başka paket: package", evaluateIntegrity(payload(n, { pkg: "com.evil" }), h).reasons.includes("package"));
  check("başka isteğin özeti: hash", evaluateIntegrity(payload(n, { hash: guestRequestHash("baska-bir-nonce-degeri") }), h).reasons.includes("hash"));
  check("nonce yoksa: nonce", evaluateIntegrity(payload(n), null).reasons.includes("nonce"));
  check("11 dakikalık belge: stale", evaluateIntegrity(payload(n, { ts: Date.now() - 11 * 60_000 }), h).reasons.includes("stale"));
  check("5 dk ileri saat: stale", evaluateIntegrity(payload(n, { ts: Date.now() + 5 * 60_000 }), h).reasons.includes("stale"));
  const unrec = evaluateIntegrity(payload(n, { app: "UNRECOGNIZED_VERSION" }), h);
  check("tanınmayan sürüm: fail app:UNRECOGNIZED_VERSION", unrec.result === "fail" && unrec.reasons.includes("app:UNRECOGNIZED_VERSION"), unrec);
  const basic = evaluateIntegrity(payload(n, { device: ["MEETS_BASIC_INTEGRITY"] }), h);
  check("yalnız temel bütünlük: fail device:MEETS_BASIC_INTEGRITY", basic.result === "fail" && basic.reasons.includes("device:MEETS_BASIC_INTEGRITY"), basic);
  const none = evaluateIntegrity(payload(n, { device: [] }), h);
  check("cihaz hükmü boş: device:none", none.reasons.includes("device:none") && none.deviceVerdict === null, none);
  const unlic = evaluateIntegrity(payload(n, { lic: "UNLICENSED" }), h);
  check("lisans yalnız kaydediliyor: UNLICENSED yine pass", unlic.result === "pass" && unlic.licensingVerdict === "UNLICENSED", unlic);

  console.log("\nGövde süzgeci");
  check("attestation yok: hepsi null", JSON.stringify(readAttestationInput({})) === JSON.stringify({ token: null, nonce: null, clientError: null }));
  check("serbest metin hata kodu düşüyor", readAttestationInput({ attestation: { error: "<script>" } }).clientError === null);
  check("kısa nonce düşüyor", readAttestationInput({ attestation: { nonce: "abc" } }).nonce === null);
  check("Play hata kodu kalıyor", readAttestationInput({ attestation: { error: "-1" } }).clientError === "-1");

  console.log("\nKip bayrağı");
  delete process.env.GUEST_ATTESTATION;
  process.env.PLAY_INTEGRITY_KEY_PATH = "/yok/sahte.json";
  check("boş: off ve istemciye bayrak inmiyor", guestAttestationMode() === "off" && guestAttestationConfig() === null);
  process.env.GUEST_ATTESTATION = "bilinmeyen";
  check("tanınmayan değer: off", guestAttestationMode() === "off");
  process.env.GUEST_ATTESTATION = "log";
  check("log: istemciye proje numarası iniyor", guestAttestationMode() === "log" && guestAttestationConfig()?.cloudProjectNumber === "658160017552");
  process.env.PLAY_INTEGRITY_KEY_PATH = "";
  check("anahtar yolu boşken log bile off", guestAttestationMode() === "off" && guestAttestationConfig() === null);
  process.env.PLAY_INTEGRITY_KEY_PATH = "/yok/sahte.json";
  process.env.GUEST_ATTESTATION = "enforce";
  check("enforce: henüz log gibi (kip adıyla kaydediliyor)", guestAttestationMode() === "enforce");
  process.env.GUEST_ATTESTATION = "log";

  await cleanup();
  let decodes = 0;
  try {
    console.log("\nMisafir açılışı — kayıt kipi");
    const n1 = nonce("ok");
    setIntegrityDecoderForTests(async () => { decodes++; return payload(n1); });
    const ok = await signIn({ attestation: { token: TOKEN, nonce: n1 } }, ANDROID);
    check("misafir açıldı (200)", ok.status === 200 && !!ok.uid, ok.status);
    check("tek satır, pass", ok.rows.length === 1 && ok.rows[0].result === "pass", ok.rows);
    check("platform ve build yazıldı", ok.rows[0]?.platform === "android" && ok.rows[0]?.build === 14, ok.rows[0]);
    check("kip log, hükümler yazıldı", ok.rows[0]?.mode === "log" && ok.rows[0]?.app_verdict === "PLAY_RECOGNIZED" && ok.rows[0]?.device_verdict === "MEETS_DEVICE_INTEGRITY" && ok.rows[0]?.licensing_verdict === "LICENSED", ok.rows[0]);
    check("belgenin kendisi hiçbir sütunda yok", !JSON.stringify(ok.rows[0]).includes(TOKEN));

    const replay = await signIn({ attestation: { token: TOKEN, nonce: n1 } }, ANDROID);
    check("aynı belge ikinci kez: misafir YİNE açıldı", replay.status === 200 && !!replay.uid);
    check("…ve kayıt fail + replay", replay.rows[0]?.result === "fail" && String(replay.rows[0]?.reasons).includes("replay"), replay.rows[0]);

    const n2 = nonce("emu");
    setIntegrityDecoderForTests(async () => payload(n2, { app: "UNRECOGNIZED_VERSION", device: [] }));
    const emu = await signIn({ attestation: { token: TOKEN, nonce: n2 } }, ANDROID);
    check("emülatör/yan yükleme: açıldı, fail", emu.status === 200 && emu.rows[0]?.result === "fail", emu.rows[0]);
    check("…sebep app + device", String(emu.rows[0]?.reasons) === "app:UNRECOGNIZED_VERSION,device:none", emu.rows[0]?.reasons);

    const n3 = nonce("hash");
    setIntegrityDecoderForTests(async () => payload(n3));
    const other = await signIn({ attestation: { token: TOKEN, nonce: nonce("baska") } }, ANDROID);
    check("başka nonce'un belgesi: açıldı, fail hash", other.status === 200 && other.rows[0]?.result === "fail" && String(other.rows[0]?.reasons).includes("hash"), other.rows[0]);

    const missing = await signIn({}, ANDROID);
    check("belgesiz (eski sürüm): açıldı, missing no_token", missing.status === 200 && missing.rows[0]?.result === "missing" && missing.rows[0]?.reasons === "no_token", missing.rows[0]);
    const clientErr = await signIn({ attestation: { error: "-1" } }, ANDROID);
    check("Play hizmetleri yok (-1): missing client:-1", clientErr.status === 200 && clientErr.rows[0]?.reasons === "client:-1", clientErr.rows[0]);
    const bot = await signIn({}, null);
    check("istemci başlığı yok (betik): kayıt platformsuz", bot.status === 200 && bot.rows[0]?.result === "missing" && bot.rows[0]?.platform === null, bot.rows[0]);

    setIntegrityDecoderForTests(async () => { throw new DecodeError("invalid", "decode http 400"); });
    const forged = await signIn({ attestation: { token: TOKEN, nonce: nonce("sahte") } }, ANDROID);
    check("Google belgeyi reddetti (sahte): açıldı, fail decode:invalid", forged.status === 200 && forged.rows[0]?.result === "fail" && forged.rows[0]?.reasons === "decode:invalid", forged.rows[0]);
    setIntegrityDecoderForTests(async () => { throw new DecodeError("network", "decode TimeoutError"); });
    const down = await signIn({ attestation: { token: TOKEN, nonce: nonce("ag") } }, ANDROID);
    check("Google'a ulaşılamadı: açıldı, error", down.status === 200 && down.rows[0]?.result === "error" && down.rows[0]?.reasons === "decode:network", down.rows[0]);
    setIntegrityDecoderForTests(async () => { throw new Error("beklenmeyen"); });
    const boom = await signIn({ attestation: { token: TOKEN, nonce: nonce("boom") } }, ANDROID);
    check("çözücü beklenmedik hata attı: açıldı, error", boom.status === 200 && boom.rows[0]?.result === "error", boom.rows[0]);

    const ios = await signIn({ attestation: { token: TOKEN, nonce: nonce("ios") } }, "ios/1.0.0/4");
    check("iOS: açıldı ve kayda girmiyor (App Attest Aşama 4)", ios.status === 200 && ios.rows.length === 0, ios.rows);

    console.log("\nKip kapalı");
    const before = decodes;
    setIntegrityDecoderForTests(async () => { decodes++; return payload("x".repeat(20)); });
    delete process.env.GUEST_ATTESTATION;
    const off = await signIn({ attestation: { token: TOKEN, nonce: nonce("off") } }, ANDROID);
    check("off: açıldı, satır yok, Google'a gidilmedi", off.status === 200 && off.rows.length === 0 && decodes === before, { rows: off.rows, decodes });
    process.env.GUEST_ATTESTATION = "log";

    console.log("\nHesap silme");
    await purgeUserData(ok.uid!);
    const left = rowsOf(await db.execute(sql`select user_id from guest_attestations where request_hash = ${guestRequestHash(n1)} order by id`));
    check("satır kalıyor, kimlik boşalıyor", left.length === 2 && left[0].user_id === null, left);
    await db.execute(sql`delete from guest_attestations where request_hash = ${guestRequestHash(n1)} and user_id is null`);

    console.log("\nSaklama süresi");
    /* Süpürme tabloyu tümden tarıyor; yerel veritabanındaki öteki satırlara
       dokunmamak için "şimdi" ileri alınmıyor, test satırları geçmişe yazılıyor. */
    const tag = `retention-${Math.random().toString(36).slice(2, 10)}`;
    const days = (d: number) => sql`now() - make_interval(days => ${d}::int)`;
    for (const [suffix, at] of [["old", days(ATTESTATION_RETENTION_DAYS + 1)], ["edge", days(ATTESTATION_RETENTION_DAYS - 1)], ["new", sql`now()`]] as const) {
      await db.execute(sql`insert into guest_attestations (user_id, mode, result, request_hash, created_at)
        values (${suffix === "old" ? null : ok.uid}, 'log', 'pass', ${`${tag}-${suffix}`}, ${at})`);
    }
    const purged = await purgeExpiredGuestAttestations();
    const kept = rowsOf(await db.execute(sql`select request_hash from guest_attestations where request_hash like ${tag + "-%"} order by request_hash`)).map((r) => r.request_hash);
    check(`${ATTESTATION_RETENTION_DAYS} günü geçen satır silindi`, purged >= 1 && !kept.includes(`${tag}-old`), { purged, kept });
    check("süresi dolmayanlar kaldı", kept.includes(`${tag}-edge`) && kept.includes(`${tag}-new`), kept);
    const again = rowsOf(await db.execute(sql`select 1 from guest_attestations where request_hash like ${tag + "-%"}`)).length;
    await purgeExpiredGuestAttestations();
    check("ikinci koşu zararsız (kalanlara dokunmuyor)", rowsOf(await db.execute(sql`select 1 from guest_attestations where request_hash like ${tag + "-%"}`)).length === again);
    await db.execute(sql`delete from guest_attestations where request_hash like ${tag + "-%"}`);
  } finally {
    setIntegrityDecoderForTests(null);
    await cleanup();
  }
  if (failures) {
    console.log(`\n${failures} doğrulama başarısız.`);
    process.exit(1);
  }
  console.log("\ntamam: misafir açılışı belgeyi kaydediyor, kimseyi reddetmiyor");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
