import { sql } from "drizzle-orm";
import { createEmailVerificationToken } from "better-auth/api";
import { db } from "@/lib/db";
import { auth } from "../src/lib/auth/server";
import { purgeUserData } from "../src/lib/account/purge";

/**
 * DOĞRULAMA BAĞLANTISIYLA OTURUM DAYATMA — gerçek Postgres'te, Better Auth'un
 * kendi işleyicisinden (bkz. src/lib/auth/server `hooks.after` /verify-email).
 *
 * Saldırı: saldırgan bir hesap açar, doğrulama bağlantısını (30 dk geçerli)
 * kurbana gönderir. `autoSignInAfterVerification` bağlantıyı açanın o
 * hesaba girmesini sağlıyor ve KENDİ hesabında oturumu olan kurbanın
 * oturumunu da sessizce saldırganınkiyle değiştiriyordu.
 *
 * Ölçülenler: gerçek hesapta oturumu olan biri başka bir hesabın bağlantısını
 * açınca KENDİ oturumunda kalıyor, bağlantının hesabı yine doğrulanıyor ve
 * onun için açılan oturum satırı geride kalmıyor. Oturumsuz açılış ve misafirin
 * yerinde yükseltmesi (aynı kimlik) eskisi gibi giriş yapıyor.
 *
 *   TEST_DATABASE_URL=postgres://postgres@127.0.0.1:5432/lernomi_test \
 *   DATABASE_URL=$TEST_DATABASE_URL BETTER_AUTH_SECRET=test-secret-at-least-32-characters-long \
 *   BETTER_AUTH_URL=http://localhost:3000 npm run test:verify-session
 */

const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(url ? "Bu test YALNIZ yerel bir veritabanında koşar." : "TEST_DATABASE_URL tanımlı değil.");
  process.exit(2);
}
const BASE = process.env.BETTER_AUTH_URL ?? "";
const SECRET = process.env.BETTER_AUTH_SECRET ?? "";

let failures = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${typeof detail === "string" ? detail : JSON.stringify(detail)}`}`);
  }
}

const tag = Math.random().toString(36).slice(2, 8);
const created: string[] = [];

/* Aynı ad birden çok kez yazılabiliyor: tarayıcı gibi SONUNCUSU geçerli. */
const cookieOf = (setCookie: string, prev = "") => {
  const byName = new Map<string, string>();
  for (const c of [...prev.split("; "), ...setCookie.split(/,(?=\s*[^;,]+=)/).map((x) => x.trim().split(";")[0])]) {
    const name = c.split("=")[0];
    if (name.includes("session_token") || name.includes("session_data")) byName.set(name, c);
  }
  return [...byName.values()].filter((c) => c.split("=")[1] !== "").join("; ");
};

async function call(method: "GET" | "POST", path: string, body?: unknown, cookie?: string) {
  const res = await auth.handler(new Request(`${BASE}/api/auth${path}`, {
    method,
    headers: { "content-type": "application/json", origin: BASE, ...(cookie ? { cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }));
  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  const raw = res.headers.get("set-cookie") ?? "";
  return { status: res.status, json, raw, cookie: cookieOf(raw, cookie) };
}

async function whoIs(cookie: string) {
  const r = await call("GET", "/get-session?disableCookieCache=true", undefined, cookie);
  return ((r.json?.user ?? null) as { id?: string } | null)?.id ?? null;
}

const rows = (r: unknown) => ((Array.isArray(r) ? r : (r as { rows: unknown[] }).rows) ?? []) as Record<string, unknown>[];

async function addUnverified(label: string) {
  const id = `test-vs-${label}-${tag}`;
  const email = `${label}-${tag}@example.test`;
  created.push(id);
  await db.execute(sql`insert into "user" (id, name, email, "emailVerified", "isAnonymous", "createdAt", "updatedAt") values (${id}, 'Saldırgan', ${email}, false, false, now(), now())`);
  return { id, email };
}

async function signUp(label: string) {
  const email = `${label}-${tag}@example.test`;
  const r = await call("POST", "/sign-up/email", { name: "Kurban Kişi", email, password: "Uzun-ve-Tahmin-Edilmez-42" });
  const id = ((r.json?.user ?? {}) as { id?: string }).id ?? "";
  if (id) created.push(id);
  return { id, cookie: r.cookie };
}

async function cleanup() {
  for (const uid of created) await purgeUserData(uid).catch(() => {});
  await db.execute(sql`delete from "user" where id = any(${sql.param(created)}::text[])`);
}

async function main() {
  try {
    console.log("\nGerçek hesapta oturumu olan kurban, başka bir hesabın bağlantısını açıyor");
    const victim = await signUp("kurban");
    check("kurban oturumu açık", Boolean(victim.id) && (await whoIs(victim.cookie)) === victim.id, victim);
    const attacker = await addUnverified("saldirgan");
    const token = await createEmailVerificationToken(SECRET, attacker.email, undefined, 1800);
    const v = await call("GET", `/verify-email?token=${token}`, undefined, victim.cookie);
    check("istek başarılı", v.status === 200, v);
    check("kurban KENDİ oturumunda kalıyor", (await whoIs(v.cookie)) === victim.id, await whoIs(v.cookie));
    check("yanıtta oturum çerezi yazılmıyor (değer telde de görünmüyor)", !/session_(token|data)=[^;]/.test(v.raw), v.raw.slice(0, 120));
    const verified = rows(await db.execute(sql`select "emailVerified" from "user" where id = ${attacker.id}`))[0]?.emailVerified;
    check("bağlantının hesabı yine doğrulandı", verified === true, verified);
    const left = rows(await db.execute(sql`select 1 from session where "userId" = ${attacker.id}`)).length;
    check("bağlantının hesabı için oturum satırı kalmadı", left === 0, left);

    console.log("\nMisafir kurban (mobil): ilerlemesi başka hesaba birleşmemeli");
    const g = await call("POST", "/sign-in/anonymous", {});
    const guestId = ((g.json?.user ?? {}) as { id?: string }).id ?? "";
    if (guestId) created.push(guestId);
    const other = await addUnverified("misafire");
    const otherToken = await createEmailVerificationToken(SECRET, other.email, undefined, 1800);
    const gv = await call("GET", `/verify-email?token=${otherToken}`, undefined, g.cookie);
    check("istek başarılı", gv.status === 200, gv);
    check("misafir KENDİ oturumunda kalıyor", Boolean(guestId) && (await whoIs(gv.cookie)) === guestId, await whoIs(gv.cookie));

    console.log("\nOturumsuz açılış (kendi bağlantısını açan kullanıcı)");
    const own = await addUnverified("kendi");
    const ownToken = await createEmailVerificationToken(SECRET, own.email, undefined, 1800);
    const o = await call("GET", `/verify-email?token=${ownToken}`);
    check("istek başarılı", o.status === 200, o);
    check("hesaba giriş yapıldı", (await whoIs(o.cookie)) === own.id, await whoIs(o.cookie));

    console.log("\nAynı hesabın oturumuyla açılış");
    const same = await signUp("ayni");
    await db.execute(sql`update "user" set "emailVerified" = false where id = ${same.id}`);
    const sameToken = await createEmailVerificationToken(SECRET, `ayni-${tag}@example.test`, undefined, 1800);
    const s = await call("GET", `/verify-email?token=${sameToken}`, undefined, same.cookie);
    check("istek başarılı", s.status === 200, s);
    check("oturum aynı hesapta", (await whoIs(s.cookie)) === same.id, await whoIs(s.cookie));
  } finally {
    await cleanup();
  }
  if (failures) {
    console.log(`\n${failures} doğrulama başarısız.`);
    process.exit(1);
  }
  console.log("\ntamam: doğrulama bağlantısı var olan oturumu değiştirmiyor");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
