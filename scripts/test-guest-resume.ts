import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "../src/lib/auth/server";
import { purgeUserData } from "../src/lib/account/purge";

/**
 * MİSAFİR OTURUMUNU GERİ KURMA — gerçek Postgres'te, Better Auth'un kendi
 * işleyicisinden (bkz. src/lib/auth/guest-resume).
 *
 * Uç, çerezini kaybeden misafiri (iki adımlı doğrulamada vazgeçilen giriş)
 * kimliğine döndürüyor. Ölçülenler: doğru jetonla çerez yazılıyor ve çerez
 * gerçekten o misafirin oturumu; süresi geçmiş oturumda yenisi açılıp jeton
 * dönüyor; yanlış kimlik, gerçek hesabın jetonu ve eksik gövde reddediliyor.
 *
 *   TEST_DATABASE_URL=postgres://postgres@127.0.0.1:5432/lernomi_test \
 *   DATABASE_URL=$TEST_DATABASE_URL BETTER_AUTH_SECRET=test-secret-at-least-32-characters-long \
 *   BETTER_AUTH_URL=http://localhost:3000 npm run test:guest-resume
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

const tag = Math.random().toString(36).slice(2, 8);
const G = `test-gr-guest-${tag}`;
const G_OLD = `test-gr-expired-${tag}`;
const R = `test-gr-real-${tag}`;
const ALL = [G, G_OLD, R];
const tok = (s: string) => `tok-${s}-0123456789abcdef`;

async function addUser(uid: string, anonymous: boolean) {
  await db.execute(sql`
    insert into "user" (id, name, email, "emailVerified", "isAnonymous", "createdAt", "updatedAt")
    values (${uid}, ${anonymous ? "guest" : "Deneme Kişi"}, ${`${uid}@${anonymous ? "guest.lernomi.invalid" : "example.test"}`}, false, ${anonymous}, now(), now())
  `);
}
async function addSession(uid: string, token: string, expiresInDays: number) {
  await db.execute(sql`
    insert into session (id, "expiresAt", token, "createdAt", "updatedAt", "userId")
    values (${`s-${token}`}, now() + make_interval(days => ${expiresInDays}), ${token}, now(), now(), ${uid})
  `);
}

async function call(path: string, body: unknown, cookie?: string) {
  const res = await auth.handler(new Request(`${BASE}/api/auth${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: BASE, ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(body),
  }));
  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  return { status: res.status, json, setCookie: res.headers.get("set-cookie") ?? "" };
}

async function sessionOf(setCookie: string): Promise<string | null> {
  const pair = setCookie.split(/,(?=\s*[^;,]+=)/).map((c) => c.trim().split(";")[0]).find((c) => c.includes("session_token="));
  if (!pair) return null;
  const res = await auth.handler(new Request(`${BASE}/api/auth/get-session`, { headers: { cookie: pair } }));
  const json = (await res.json().catch(() => null)) as { user?: { id?: string } } | null;
  return json?.user?.id ?? null;
}

async function cleanup() {
  for (const uid of ALL) await purgeUserData(uid).catch(() => {});
  await db.execute(sql`delete from "user" where id = any(${sql.param(ALL)}::text[])`);
}

async function main() {
  await cleanup();
  try {
    await addUser(G, true);
    await addSession(G, tok(G), 30);
    await addUser(G_OLD, true);
    await addSession(G_OLD, tok(G_OLD), -2);
    await addUser(R, false);
    await addSession(R, tok(R), 30);

    console.log("\nGeçerli oturum");
    const ok = await call("/guest/resume", { guestId: G, token: tok(G) });
    check("200 dönüyor", ok.status === 200, ok);
    check("jeton aynı kalıyor", ok.json?.token === tok(G), ok.json);
    check("yazılan çerez misafirin oturumu", (await sessionOf(ok.setCookie)) === G, ok.setCookie.slice(0, 80));

    console.log("\nSüresi geçmiş oturum");
    const old = await call("/guest/resume", { guestId: G_OLD, token: tok(G_OLD) });
    check("200 dönüyor", old.status === 200, old);
    check("yeni jeton veriliyor", typeof old.json?.token === "string" && old.json.token !== tok(G_OLD), old.json);
    check("çerez misafirin yeni oturumu", (await sessionOf(old.setCookie)) === G_OLD);
    const stale = await db.execute(sql`select 1 from session where token = ${tok(G_OLD)}`);
    check("eski oturum satırı silindi", ((Array.isArray(stale) ? stale : (stale as { rows: unknown[] }).rows) ?? []).length === 0);

    console.log("\nReddedilenler");
    const wrongId = await call("/guest/resume", { guestId: G_OLD, token: tok(G) });
    check("jeton başka misafirin: 404", wrongId.status === 404 && !wrongId.setCookie.includes("session_token="), wrongId);
    const real = await call("/guest/resume", { guestId: R, token: tok(R) });
    check("gerçek hesabın jetonu: 404", real.status === 404 && !real.setCookie.includes("session_token="), real);
    const bad = await call("/guest/resume", { guestId: G });
    check("jetonsuz: 400", bad.status === 400, bad);

    const signIn = await call("/guest/resume", { guestId: G, token: tok(G) });
    const guestCookie = signIn.setCookie.split(";")[0];
    const again = await call("/guest/resume", { guestId: G, token: tok(G) }, guestCookie);
    check("misafir oturumu açıkken yeniden kurmak serbest", again.status === 200, again);
  } finally {
    await cleanup();
  }
  if (failures) {
    console.log(`\n${failures} doğrulama başarısız.`);
    process.exit(1);
  }
  console.log("\ntamam: misafir oturumu jetonla geri kuruluyor");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
