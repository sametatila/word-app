/**
 * Yapay zekâ rızasının VERİTABANI testi — `npm run test:consent`.
 *
 * Kapının asıl sözü veritabanında tutuluyor ya da tutulmuyor: "izin yoksa metin
 * sağlayıcıya gitmez". Bunu saf bir testle sınamak yetmezdi, çünkü üç kusur
 * sınıfı ancak SQL'de görünür:
 *
 *   - Defter eklemeli: son karar en yeni satır. Sıralama ters okunursa geri
 *     alınmış bir izin hâlâ geçerli sayılır ve kapı açık kalır.
 *   - Gecikmeli değerlendirme kuyruğu izni sorgunun içinde süzüyor
 *     (`runAssessQueue`). İlişkili alt sorgunun yanlış bağlanması, izin
 *     vermemiş kullanıcının metnini saatler sonra sağlayıcıya yollar.
 *   - Hesap silme defteri de temizlemeli (`purgeUserData`).
 *
 * KURULUM `scripts/test-entitlement.ts` başındakiyle aynı (yerel docker
 * Postgres + bütün migration'lar). ÜRETİMDE KOŞMAZ: adres yerel değilse reddedilir.
 */
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments, userConsents } from "../src/lib/db/schema";
import { aiConsentGate, aiConsentStatuses, hasAiConsent, recordAiConsent } from "../src/lib/ai-consent";
import { AI_CONSENT_ERROR, AI_CONSENT_VERSIONS, aiConsentShouldPrompt, asAiConsentRequired } from "../src/lib/ai-consent-shared";
import { runAssessQueue } from "../src/lib/assess";
import { purgeUserData } from "../src/lib/account/purge";

/*
  SAĞLAYICI ANAHTARLARI SİLİNİYOR. Kuyruk testi `runAssessQueue`i çağırıyor ve
  anahtar varsa işlemci metni GERÇEK dil modeline yollar. `.env` bilerek
  okunmuyor (adres TEST_DATABASE_URL'den geliyor); kabukta tanımlı bir anahtar
  kalmışsa da burada düşüyor. Anahtarsız işlemci süzülen satır sayısını
  `pending` olarak döndürüyor ve test tam onu ölçüyor.
*/
for (const k of Object.keys(process.env)) {
  if (/(_API_KEY|_API_TOKEN|_SECRET|_KEY)$/.test(k) || /^(AZURE|CLOUDFLARE|DEEPGRAM|SPEECHMATICS|GROQ|MISTRAL|CEREBRAS)_/.test(k)) delete process.env[k];
}

const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(
    url
      ? `Bu test YALNIZ yerel bir veritabanında koşar; TEST_DATABASE_URL yerel değil: ${url.replace(/:[^:@]*@/, ":***@")}`
      : "TEST_DATABASE_URL tanımlı değil. Kurulum için scripts/test-entitlement.ts başındaki nota bak.",
  );
  process.exit(2);
}

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${String(detail)}`}`);
  }
}

const uid = (tag: string) => `test-consent-${tag}-${Math.random().toString(36).slice(2, 8)}`;

async function cleanup(ids: string[]) {
  for (const id of ids) {
    await db.delete(userConsents).where(eq(userConsents.userId, id));
    await db.delete(assessments).where(eq(assessments.userId, id));
  }
}

async function gateBody(userId: string, purpose: "ai_text" | "ai_voice") {
  const res = await aiConsentGate(userId, purpose);
  if (!res) return { status: 200, body: null as ReturnType<typeof asAiConsentRequired> };
  return { status: res.status, body: asAiConsentRequired(await res.json()) };
}

async function main() {
  const a = uid("a");
  const b = uid("b");
  const ids = [a, b];
  await cleanup(ids);

  console.log("\nKarar yokken");
  {
    const s = await aiConsentStatuses(a);
    check("iki amaç da 'unset'", s.ai_text.state === "unset" && s.ai_voice.state === "unset", JSON.stringify(s));
    const g = await gateBody(a, "ai_text");
    check("kapı 403 döner", g.status === 403, g.status);
    check("gövde rıza isteği, durum 'unset'", g.body?.error === AI_CONSENT_ERROR && g.body.state === "unset", JSON.stringify(g.body));
    check("'unset' ekranı açtırır", aiConsentShouldPrompt("unset"));
  }

  console.log("\nİzin verilince");
  {
    const st = await recordAiConsent(a, "ai_text", true, "ios");
    check("yazılan durum 'granted'", st.state === "granted" && st.version === AI_CONSENT_VERSIONS.ai_text, JSON.stringify(st));
    check("kapı açık", (await aiConsentGate(a, "ai_text")) === null);
    check("hasAiConsent true", await hasAiConsent(a, "ai_text"));
    check("öteki amaç ETKİLENMEZ (ses hâlâ kapalı)", !(await hasAiConsent(a, "ai_voice")));
  }

  console.log("\nGeri alınca (defterde en yeni satır geçerli)");
  {
    await new Promise((r) => setTimeout(r, 5));
    await recordAiConsent(a, "ai_text", false, "android");
    const g = await gateBody(a, "ai_text");
    check("kapı yeniden kapalı", g.status === 403, g.status);
    check("durum 'declined'", g.body?.state === "declined", JSON.stringify(g.body));
    check("'declined' ekranı KENDİLİĞİNDEN açtırmaz", !aiConsentShouldPrompt("declined"));
    const rows = await db.select().from(userConsents).where(eq(userConsents.userId, a));
    check("defter eklemeli: iki karar da duruyor", rows.length === 2, rows.length);
  }

  console.log("\nEski sürümle verilmiş izin");
  {
    await db.insert(userConsents).values({ userId: b, purpose: "ai_voice", granted: true, version: AI_CONSENT_VERSIONS.ai_voice - 1, platform: "web" });
    const g = await gateBody(b, "ai_voice");
    check("kapı kapalı, durum 'outdated'", g.status === 403 && g.body?.state === "outdated", JSON.stringify(g.body));
    check("'outdated' yeniden sorulur", aiConsentShouldPrompt("outdated"));
  }

  console.log("\nGecikmeli değerlendirme kuyruğu");
  {
    // a: izni geri aldı · b: metin için hiç izin vermedi → önce ikisi de dışarıda
    const row = (userId: string, n: number) => ({ userId, kind: "writing", level: "A1", day: "2026-09-14", answer: `metin ${n}`, hash: `h-${userId}-${n}` });
    await db.insert(assessments).values([row(a, 1), row(a, 2), row(b, 1)]);
    const before = await runAssessQueue(50);
    const mine = (await db.select().from(assessments).where(eq(assessments.userId, a))).length + (await db.select().from(assessments).where(eq(assessments.userId, b))).length;
    check("test satırları yazıldı", mine === 3, mine);
    // Sağlayıcı anahtarı yokken `pending` süzülen satır sayısını döndürüyor.
    // Başka testlerden kalan satırlar sayıyı büyütebilir; bizimkiler SAYILMAMALI.
    const baseline = before.pending;
    await recordAiConsent(b, "ai_text", true, "web");
    const after = await runAssessQueue(50);
    check("izin veren kullanıcının satırı kuyruğa girer (+1)", after.pending === baseline + 1, `${baseline} → ${after.pending}`);
    await recordAiConsent(a, "ai_text", true, "web");
    const again = await runAssessQueue(50);
    check("izin yeniden verilince iki satır daha girer (+2)", again.pending === baseline + 3, `${baseline} → ${again.pending}`);
  }

  console.log("\nHesap silme");
  {
    await purgeUserData(a);
    const left = await db.select().from(userConsents).where(eq(userConsents.userId, a));
    check("rıza defteri silindi", left.length === 0, left.length);
  }

  await cleanup(ids);
  console.log(`\n${total - failures}/${total} doğrulama geçti.`);
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
