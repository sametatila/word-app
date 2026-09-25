/**
 * Kota kurallarının VERİTABANI testi — `npm run test:quota`.
 *
 * Kural `docs/premium/README.md` §2 (2026-09-25): Patika Konuşma, Patika Yazma
 * ve Beceriler seviye başına 2 + "bitir ve 7 günlük seri yap" dilimleri, her biri
 * ayrı sayaç; yürüyüş modu günde 3 tur. Saf formül `test:premium`de; burası
 * sayaçların SQL'ini sınıyor: sahiplenme işareti, izin verilen sayıyla atomik
 * sayım, eşzamanlı istekler, bitirmenin `user_conversations`ten okunması ve yürüyüş
 * turunun çift istek koruması. Bunlar tek süreçte görünmüyor.
 *
 * Kurulum `scripts/test-entitlement.ts`in başındaki notla aynı (TEST_DATABASE_URL,
 * bütün migration'lar). ÜRETİMDE KOŞMAZ: adres yerel değilse reddediyor.
 */
import "dotenv/config";
import { and, eq, sql } from "drizzle-orm";
// `@/lib/db` — göreli değil: e2e tsconfig'i takma adı test ikizine yönlendiriyor
// (bkz. test-entitlement). Premium modülleri de aynı havuzu kullanmalı.
import { db } from "@/lib/db";
import { profiles, usageCounters, userConversations } from "../src/lib/db/schema";
import { claimTiered, isOwned, openWalkRound, refundWalkRound, tieredState, unlockOverview, walkState } from "../src/lib/premium/access";
import { getUsage } from "../src/lib/premium/quota";

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

const uid = (tag: string) => `test-quota-${tag}-${Math.random().toString(36).slice(2, 8)}`;
const created: string[] = [];

async function user(tag: string, o: { longest?: number; current?: number; premium?: boolean } = {}): Promise<string> {
  const id = uid(tag);
  created.push(id);
  const today = new Date().toISOString().slice(0, 10);
  await db.insert(profiles).values({
    userId: id,
    longestStreak: o.longest ?? 0,
    currentStreak: o.current ?? 0,
    lastActiveDay: today,
    premiumUntil: o.premium ? new Date(Date.now() + 30 * 86_400_000) : null,
  });
  return id;
}

async function setStreak(id: string, longest: number, current = longest) {
  await db.update(profiles).set({ longestStreak: longest, currentStreak: current }).where(eq(profiles.userId, id));
}

/** Konuşma adımının dersi bitirildi (`/api/conversation`in yazdığı satır). */
async function finishConversation(id: string, conversationId: string) {
  await db.insert(userConversations).values({ userId: id, conversationId, ruleId: "r", total: 1 }).onConflictDoNothing();
}

async function cleanup() {
  for (const id of created) {
    await db.delete(usageCounters).where(eq(usageCounters.userId, id));
    await db.delete(userConversations).where(eq(userConversations.userId, id));
    await db.delete(profiles).where(eq(profiles.userId, id));
  }
}

async function main() {
  console.log("\nPatika Konuşma: taban 2, bitir + 7 günlük seri → +2");
  {
    const u = await user("conv");
    check("1. adım sahiplenildi", (await claimTiered(u, "conversation", "A1", "L1")).allowed);
    check("aynı adımın ikinci turu hak yemiyor", (await claimTiered(u, "conversation", "A1", "L1")).allowed);
    check("sayaç 1", (await getUsage(u, "conversation:A1", "all")) === 1, await getUsage(u, "conversation:A1", "all"));
    check("2. adım sahiplenildi", (await claimTiered(u, "conversation", "A1", "L2")).allowed);
    const third = await claimTiered(u, "conversation", "A1", "L3");
    check("3. adım KİLİTLİ (quota_spent)", !third.allowed && third.reason === "quota_spent", third.reason);
    check("kilit sayacı artırmadı, işaret geri alındı", (await getUsage(u, "conversation:A1", "all")) === 2 && !(await isOwned(u, "conversation", "A1", "L3")));
    check("sahiplenilmiş adım hak bitince de açık", (await claimTiered(u, "conversation", "A1", "L1")).allowed);
    check("başka seviye ayrı sayaç (A2 açık)", (await claimTiered(u, "conversation", "A2", "L9")).allowed);

    await setStreak(u, 30);
    check("seri 30 ama adımlar bitmedi → hâlâ kilitli", !(await claimTiered(u, "conversation", "A1", "L3")).allowed);
    await finishConversation(u, "L1");
    await finishConversation(u, "L2");
    await setStreak(u, 6);
    check("ikisi bitti ama seri 6 → kilitli", !(await claimTiered(u, "conversation", "A1", "L3")).allowed);
    const s6 = await tieredState(u, "conversation", "A1");
    check("durum: bitir 2/2 ✓, seri 6/7, 1 gün", !s6.premium && s6.next?.complete.done === 2 && s6.next?.streak.current === 6 && s6.next?.days === 1, JSON.stringify(s6));
    await setStreak(u, 7);
    check("ikisi bitti + 7 gün → 3. adım açıldı", (await claimTiered(u, "conversation", "A1", "L3")).allowed);
    check("4. adım da açık (dilim +2)", (await claimTiered(u, "conversation", "A1", "L4")).allowed);
    check("5. adım kilitli (sonraki dilim 14 gün + dört bitirme ister)", !(await claimTiered(u, "conversation", "A1", "L5")).allowed);
    /* Sahiplenilmemiş bir dersi bitirmek dilimi doldurmuyor — hak düşmeyen
       (senaryolu) konuşma sayılmıyor. */
    await finishConversation(u, "Lx");
    const st = await tieredState(u, "conversation", "A1");
    check("sahiplenilmemiş bitirme sayılmıyor (bitir 2/4)", !st.premium && st.next?.complete.done === 2 && st.next?.complete.needed === 4, JSON.stringify(st));
  }

  console.log("\nEşzamanlı istekler tavanı aşamıyor");
  {
    const u = await user("race");
    const ids = Array.from({ length: 12 }, (_, i) => `R${i}`);
    const out = await Promise.all(ids.map((id) => claimTiered(u, "conversation", "B1", id)));
    check("12 farklı adımdan TAM 2'si açıldı", out.filter((a) => a.allowed).length === 2, out.filter((a) => a.allowed).length);
    check("sayaç 2", (await getUsage(u, "conversation:B1", "all")) === 2, await getUsage(u, "conversation:B1", "all"));
    const same = await Promise.all(Array.from({ length: 10 }, () => claimTiered(u, "path_writing", "B1", "W1")));
    check("aynı göreve 10 eşzamanlı istek tek hak yaktı", same.every((a) => a.allowed) && (await getUsage(u, "path_writing:B1", "all")) === 1, await getUsage(u, "path_writing:B1", "all"));
  }

  console.log("\nPatika Yazma ve Beceriler ayrı sayaçlar, seviye başına");
  {
    const u = await user("write");
    check("Patika Yazma 1", (await claimTiered(u, "path_writing", "A1", "pw1")).allowed);
    check("Patika Yazma 2", (await claimTiered(u, "path_writing", "A1", "pw2")).allowed);
    check("Patika Yazma 3 kilitli", !(await claimTiered(u, "path_writing", "A1", "pw3")).allowed);
    check("Beceriler yazma ayrı: 1", (await claimTiered(u, "skill_writing", "A1", "sw1")).allowed);
    check("Beceriler yazma ayrı: 2", (await claimTiered(u, "skill_writing", "A1", "sw2")).allowed);
    check("Beceriler yazma 3 kilitli", !(await claimTiered(u, "skill_writing", "A1", "sw3")).allowed);
    check("Beceriler konuşma ayrı sayaç", (await claimTiered(u, "skill_speaking", "B1", "ss1")).allowed);
    check("Beceriler yazma B1 ayrı seviye", (await claimTiered(u, "skill_writing", "B1", "sw9")).allowed);
    /* Yazmada hak ilk değerlendirmede düşüyor: kullanılan = bitirilen. */
    await setStreak(u, 7);
    check("yazma: iki değerlendirme + 7 gün → 3. açıldı", (await claimTiered(u, "path_writing", "A1", "pw3")).allowed);
    check("eski haftalık hak sayacı yazılmıyor", (await getUsage(u, "ai_practice_weekly", "week")) === 0);
  }

  console.log("\nPremium: kademe yok, kötüye kullanım tavanı");
  {
    const u = await user("pro", { premium: true });
    for (let i = 0; i < 5; i++) await claimTiered(u, "conversation", "A1", `P${i}`);
    check("premium'da Konuşma serbest, ücretsiz sayaç yazılmıyor", (await getUsage(u, "conversation:A1", "all")) === 0);
    check("premium'da da adım sahipleniliyor (abonelik biterse açık kalsın)", await isOwned(u, "conversation", "A1", "P0"));
    await claimTiered(u, "path_writing", "A1", "x1");
    await claimTiered(u, "path_writing", "A1", "x1");
    await claimTiered(u, "skill_writing", "A1", "x2");
    check("yazma günlük tavana alıştırma başına bir kez sayıldı", (await getUsage(u, "ai_practice", "day")) === 2, await getUsage(u, "ai_practice", "day"));
    const st = await tieredState(u, "conversation", "A1");
    check("durum premium", st.premium === true);
  }

  console.log("\nYürüyüş modu: günde 3 tur, \"devam\" da bir tur");
  {
    const u = await user("walk");
    /* Son sayılan turu geriye alır — çift istek korumasının (birkaç saniye)
       dışına düşmek için beklemek yerine. */
    const age = async () =>
      db
        .update(usageCounters)
        .set({ updatedAt: sql`now() - interval '1 minute'` })
        .where(and(eq(usageCounters.userId, u), eq(usageCounters.key, "walk_rounds")));
    const a = await openWalkRound(u);
    check("1. tur sayıldı", a.allowed && !a.duplicate && (await walkState(u)).used === 1);
    const dup = await openWalkRound(u);
    check("hemen gelen çift istek aynı turun tekrarı (sayılmadı)", dup.allowed && dup.duplicate && (await walkState(u)).used === 1);
    await age();
    const cont = await openWalkRound(u);
    check("\"devam\" turu da bir tur (pencere yok)", cont.allowed && !cont.duplicate && (await walkState(u)).used === 2);
    await age();
    await openWalkRound(u);
    const st = await walkState(u);
    check("3 tur kullanıldı, kalan 0", st.used === 3 && st.remaining === 0, JSON.stringify(st));
    await age();
    const d = await openWalkRound(u);
    check("4. tur KİLİTLİ (quota_spent)", !d.allowed && d.reason === "quota_spent", d.reason);
    check("kilit sayacı artırmadı", (await walkState(u)).used === 3);

    const f = await user("walk-race");
    const race = await Promise.all(Array.from({ length: 10 }, () => openWalkRound(f)));
    check("eşzamanlı 10 istek TEK tur saydı", race.every((x) => x.allowed) && (await walkState(f)).used === 1, (await walkState(f)).used);
    await refundWalkRound(f);
    check("kuyruk kurulamazsa tur geri veriliyor", (await walkState(f)).used === 0);

    const p = await user("walk-pro", { premium: true });
    const ps = await openWalkRound(p);
    const pst = await walkState(p);
    check("premium'da tur sayılıyor, tavan 20, cepte açık", ps.allowed && pst.perDay === 20 && pst.pocket && pst.used === 1, JSON.stringify(pst));
  }

  console.log("\nKilit açma görünümü (durum ucu)");
  {
    const u = await user("ov", { longest: 3, current: 3 });
    await claimTiered(u, "conversation", "A1", "O1");
    await claimTiered(u, "conversation", "A1", "O2");
    await finishConversation(u, "O1");
    await claimTiered(u, "skill_writing", "B2", "sk1");
    const o = await unlockOverview(u);
    const c = o.levels.A1.conversation;
    check("A1 Konuşma: açık 2, kalan 0", !c.premium && c.open === 2 && c.remaining === 0, JSON.stringify(c));
    check("A1 Konuşma: bitir 1/2, seri 3/7, 4 gün", !c.premium && c.next?.complete.done === 1 && c.next?.streak.current === 3 && c.next?.days === 4, JSON.stringify(c.premium ? null : c.next));
    check("sahiplenilenler listede", o.owned.conversation.includes("O1") && o.owned.conversation.includes("O2") && o.owned.skills.includes("sk1"));
    const sw = o.levels.B2.skillWriting;
    check("B2 Beceriler yazma kalan 1", !sw.premium && sw.remaining === 1, JSON.stringify(sw));
    check("A2 Konuşma dokunulmamış: kalan 2", !o.levels.A2.conversation.premium && o.levels.A2.conversation.remaining === 2);
    check("yürüyüş: 3 tur hakkı", o.walk.perDay === 3 && o.walk.remaining === 3 && !o.walk.pocket);
    check("seri bilgisi", o.streak.current === 3 && o.streak.longest === 3 && o.streak.step === 7);
  }

  await cleanup();
  console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (e) => {
  console.error(e);
  await cleanup().catch(() => {});
  process.exit(1);
});
