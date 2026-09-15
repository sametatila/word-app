import { sql } from "drizzle-orm";
import { createEmailVerificationToken } from "better-auth/api";
import { db } from "@/lib/db";
import { auth } from "../src/lib/auth/server";
import { purgeUserData } from "../src/lib/account/purge";

/**
 * MİSAFİRİ YERİNDE HESABA ÇEVİRME — gerçek Postgres'te, Better Auth'un kendi
 * işleyicisinden (bkz. src/lib/auth/guest-upgrade).
 *
 * İki kip ayrı süreçte koşuyor, çünkü doğrulama zorunluluğu modül yüklenirken
 * SMTP ortamından okunuyor:
 *
 *   SMTP yok  → yükseltme hemen hesap: kimlik aynı, bayrak indi, çerez hesap,
 *               e-posta + parolayla giriş aynı kimliğe açılıyor.
 *   SMTP var  → doğrulanana dek misafir; doğrulama bayrağı indiriyor ve
 *               ÇEREZ ÖNBELLEĞİ de hesabı gösteriyor (60 sn "misafir" demiyor).
 *   İkisinde  → var olan e-posta misafiri değiştirmiyor; misafir olmayan
 *               oturum reddediliyor.
 *
 *   TEST_DATABASE_URL=… DATABASE_URL=… BETTER_AUTH_SECRET=… BETTER_AUTH_URL=http://localhost:3000 npm run test:guest-upgrade
 *   (SMTP'li kip için ek olarak SMTP_HOST=127.0.0.1 SMTP_PORT=9 SMTP_USER=x SMTP_PASS=x — posta gönderilemiyor, yutuluyor)
 */

const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(url ? "Bu test YALNIZ yerel bir veritabanında koşar." : "TEST_DATABASE_URL tanımlı değil.");
  process.exit(2);
}
const BASE = process.env.BETTER_AUTH_URL ?? "";
const VERIFY = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

let failures = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${typeof detail === "string" ? detail : JSON.stringify(detail)}`}`);
  }
}

const tag = Math.random().toString(36).slice(2, 8);
const R = `test-gu-real-${tag}`;
const realEmail = `real-${tag}@example.test`;
const newEmail = `upgraded-${tag}@example.test`;
const PASSWORD = "Uzun-ve-Tahmin-Edilmez-42";
const created: string[] = [R];

/* Aynı ad birden çok kez yazılabiliyor (yanıt sonrası kanca çerezi yeniden
   yazıyor): tarayıcı gibi SONUNCUSU geçerli. */
const cookieOf = (setCookie: string) => {
  const byName = new Map<string, string>();
  for (const c of setCookie.split(/,(?=\s*[^;,]+=)/).map((x) => x.trim().split(";")[0])) {
    const name = c.split("=")[0];
    if (name.includes("session_token") || name.includes("session_data")) byName.set(name, c);
  }
  return [...byName.values()].join("; ");
};

async function call(method: "GET" | "POST", path: string, body?: unknown, cookie?: string) {
  const res = await auth.handler(new Request(`${BASE}/api/auth${path}`, {
    method,
    headers: { "content-type": "application/json", origin: BASE, ...(cookie ? { cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }));
  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  return { status: res.status, json, cookie: cookieOf(res.headers.get("set-cookie") ?? "") };
}

async function session(cookie: string) {
  const r = await call("GET", "/get-session", undefined, cookie);
  return (r.json?.user ?? null) as { id?: string; email?: string; isAnonymous?: boolean } | null;
}

async function newGuest() {
  const r = await call("POST", "/sign-in/anonymous", {});
  const id = (r.json?.user as { id?: string } | undefined)?.id ?? "";
  if (id) created.push(id);
  return { id, cookie: r.cookie };
}

async function cleanup() {
  for (const uid of created) await purgeUserData(uid).catch(() => {});
  await db.execute(sql`delete from "user" where id = any(${sql.param(created)}::text[])`);
}

async function main() {
  try {
    await db.execute(sql`insert into "user" (id, name, email, "emailVerified", "isAnonymous", "createdAt", "updatedAt") values (${R}, 'Var Olan', ${realEmail}, true, false, now(), now())`);

    console.log(`\nKip: ${VERIFY ? "doğrulama zorunlu (SMTP var)" : "doğrulamasız (SMTP yok)"}`);
    const g = await newGuest();
    check("misafir açıldı", Boolean(g.id && g.cookie));

    const up = await call("POST", "/guest/upgrade", { name: "Yeni Kişi", email: newEmail, password: PASSWORD }, g.cookie);
    check("yükseltme 200", up.status === 200, up);
    check("yanıttaki kimlik misafirin kimliği", (up.json?.user as { id?: string } | undefined)?.id === g.id, up.json);
    const rows = await db.execute(sql`select email, "isAnonymous" as anon from "user" where id = ${g.id}`);
    const row = ((Array.isArray(rows) ? rows : (rows as { rows: unknown[] }).rows) ?? [])[0] as { email: string; anon: boolean };
    check("e-posta aynı kimliğe bağlandı (yeni kullanıcı açılmadı)", row?.email === newEmail, row);

    if (!VERIFY) {
      check("oturum jetonu döndü", typeof up.json?.token === "string");
      check("bayrak indi", row?.anon === false, row);
      const s = await session(up.cookie || g.cookie);
      check("çerez önbelleği hesabı gösteriyor", s?.id === g.id && s?.isAnonymous === false, s);
      const si = await call("POST", "/sign-in/email", { email: newEmail, password: PASSWORD });
      check("e-posta + parolayla giriş aynı kimliğe açılıyor", (si.json?.user as { id?: string } | undefined)?.id === g.id, si);
    } else {
      check("doğrulama bekleniyor: jeton yok", up.json?.token === null, up.json);
      check("doğrulanana dek misafir", row?.anon === true, row);
      const token = await createEmailVerificationToken(process.env.BETTER_AUTH_SECRET!, newEmail, undefined, 1800);
      const v = await call("GET", `/verify-email?token=${token}`, undefined, g.cookie);
      check("doğrulama 200", v.status === 200, v);
      const after = await db.execute(sql`select "isAnonymous" as anon, "emailVerified" as ok from "user" where id = ${g.id}`);
      const a = ((Array.isArray(after) ? after : (after as { rows: unknown[] }).rows) ?? [])[0] as { anon: boolean; ok: boolean };
      check("doğrulama bayrağı indirdi", a?.anon === false && a?.ok === true, a);
      const s = await session(v.cookie || g.cookie);
      check("doğrulamanın çerezi (önbellek) hesabı gösteriyor", s?.id === g.id && s?.isAnonymous === false, s);
    }

    console.log("\nReddedilenler");
    const g2 = await newGuest();
    const dup = await call("POST", "/guest/upgrade", { name: "X", email: realEmail, password: PASSWORD }, g2.cookie);
    const dupRows = await db.execute(sql`select email, "isAnonymous" as anon from "user" where id = ${g2.id}`);
    const d = ((Array.isArray(dupRows) ? dupRows : (dupRows as { rows: unknown[] }).rows) ?? [])[0] as { email: string; anon: boolean };
    check("var olan e-posta misafiri değiştirmiyor", d?.anon === true && d?.email !== realEmail, d);
    check(VERIFY ? "var olan e-posta sızdırılmıyor (genel yanıt)" : "var olan e-posta 422", VERIFY ? dup.status === 200 && dup.json?.token === null : dup.status === 422, dup);
    const noGuest = await call("POST", "/guest/upgrade", { name: "X", email: `x-${tag}@example.test`, password: PASSWORD });
    check("oturumsuz istek reddediliyor", noGuest.status === 401 || noGuest.status === 403, noGuest);
    const short = await call("POST", "/guest/upgrade", { name: "X", email: `y-${tag}@example.test`, password: "kisa" }, g2.cookie);
    check("kısa parola reddediliyor", short.status === 400, short);
  } finally {
    await cleanup();
  }
  if (failures) {
    console.log(`\n${failures} doğrulama başarısız.`);
    process.exit(1);
  }
  console.log("\ntamam: misafir yerinde hesaba dönüyor");
  process.exit(0);
}

main().catch(async (err) => {
  console.error(err);
  await cleanup().catch(() => {});
  process.exit(1);
});
