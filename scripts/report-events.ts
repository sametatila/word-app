import "dotenv/config";
import { neon } from "@neondatabase/serverless";

/**
 * Olay raporu.
 *
 * `events` tablosu yazılıyordu ama okuyan hiçbir şey yoktu — ölçüm altyapısı
 * kurup okumasını bırakmak, ölçmemekle aynı kapıya çıkıyor. Bu betik tablonun
 * cevap vermek için var olduğu soruları soruyor:
 *
 *   1. Kaç kişi başlangıç kartını görüp hiç başlamadan çıktı? (Beşerli etaplar
 *      tam da bu ölçüm yüzünden eklenmişti ama o zaman elle sayılmıştı.)
 *   2. Turu başlatanların kaçı bitiriyor, kaçı etapta bırakıyor?
 *   3. Hangi sekmeye gerçekten uğranıyor?
 *
 * Sayılar hem OLAY hem KİŞİ olarak veriliyor: yedi kişilik bir uygulamada
 * "142 tur başladı" tek başına yanıltıcı, "142 tur · 4 kişi" değil.
 *
 *   npm run report:events           # son 14 gün
 *   npm run report:events 60        # son 60 gün
 */

const NAV_LABELS = ["Öğren", "Beceriler", "Dersler", "Kelimeler", "Profil"];

type Row = Record<string, unknown>;

function bar(n: number, max: number, width = 24): string {
  if (max <= 0) return "";
  return "█".repeat(Math.max(n > 0 ? 1 : 0, Math.round((n / max) * width)));
}

function pct(a: number, b: number): string {
  if (b <= 0) return "—";
  return `%${Math.round((a / b) * 100)}`;
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil");
  const sql = neon(url);
  const days = Math.max(1, Math.min(365, Number(process.argv[2]) || 14));

  const totals = (await sql`
    select name, count(*)::int as n, count(distinct user_id)::int as people
    from events
    where day >= current_date - ${days}::int
    group by name
    order by n desc
  `) as Row[];

  if (!totals.length) {
    console.log(`Son ${days} günde hiç olay yok. Uygulama açıldıkça dolar.`);
    return;
  }

  const by = new Map(totals.map((r) => [String(r.name), { n: Number(r.n), people: Number(r.people) }]));
  const get = (k: string) => by.get(k) ?? { n: 0, people: 0 };

  console.log(`\n── Son ${days} gün ──────────────────────────────────────────\n`);

  // ── Huni ───────────────────────────────────────────────────────────
  // Her adım bir öncekinin yüzdesi olarak da veriliyor: mutlak sayı nerede
  // kaybedildiğini söylemez, oran söyler.
  console.log("Tur hunisi");
  // Huniye YALNIZCA tur başına en fazla bir kez atılan olaylar giriyor.
  // `stage_done` bir turda dört kez atılıyor; huniye konsaydı "%140" gibi
  // bir orana yol açardı ve huni oran demektir. O yüzden aşağıda, ayrı.
  const funnel: [string, string][] = [
    ["start_card", "başlangıç kartı görüldü"],
    ["session_start", "tur başlatıldı"],
    ["session_done", "tur tamamlandı"],
  ];
  let prev = 0;
  for (const [key, label] of funnel) {
    const v = get(key);
    const rel = prev > 0 ? ` (önceki adıma göre ${pct(v.n, prev)})` : "";
    console.log(`  ${label.padEnd(28)} ${String(v.n).padStart(5)} olay · ${v.people} kişi${rel}`);
    prev = v.n;
  }

  const stages = get("stage_done");
  const stopped = get("session_stop");
  if (stages.n || stopped.n) {
    console.log("\n  Ara adımlar (tur başına birden çok kez olabilir)");
    if (stages.n)
      console.log(`    ${"etap bitti".padEnd(26)} ${String(stages.n).padStart(5)} olay · ${stages.people} kişi`);
    if (stopped.n)
      console.log(`    ${"etapta bırakıldı".padEnd(26)} ${String(stopped.n).padStart(5)} olay · ${stopped.people} kişi`);
  }
  // Asıl merak edilen tek satır.
  const cards = get("start_card").n;
  const starts = get("session_start").n;
  if (cards > 0) {
    console.log(
      `\n  Kartı görüp hiç başlamayan: ${Math.max(0, cards - starts)} açılış (${pct(Math.max(0, cards - starts), cards)})`,
    );
  }

  // ── Sekmeler ───────────────────────────────────────────────────────
  const navs = (await sql`
    select value, count(*)::int as n, count(distinct user_id)::int as people
    from events
    where name = 'nav' and day >= current_date - ${days}::int
    group by value order by value
  `) as Row[];
  if (navs.length) {
    console.log("\nSekmeler");
    const max = Math.max(...navs.map((r) => Number(r.n)));
    for (let i = 0; i < NAV_LABELS.length; i++) {
      const row = navs.find((r) => Number(r.value) === i);
      const n = Number(row?.n ?? 0);
      const people = Number(row?.people ?? 0);
      console.log(
        `  ${NAV_LABELS[i].padEnd(12)} ${String(n).padStart(5)} · ${people} kişi  ${bar(n, max)}`,
      );
    }
  }

  // ── Diğer olaylar ──────────────────────────────────────────────────
  const rest = totals.filter(
    (r) => !["nav", "stage_done", "session_stop", ...funnel.map((f) => f[0])].includes(String(r.name)),
  );
  if (rest.length) {
    console.log("\nDiğer");
    for (const r of rest) {
      console.log(`  ${String(r.name).padEnd(22)} ${String(r.n).padStart(5)} · ${r.people} kişi`);
    }
  }

  // ── Yazıya çevirme kullanımı ───────────────────────────────────────
  // Ücretsiz katmanların bağlayıcı sınırı jeton değil İSTEK SAYISI. Groq'un
  // ücretsiz katmanı günde 2.000 istek ve 28.800 saniye ses; burada günlük
  // en yüksek kullanım ikisiyle birlikte gösteriliyor ki limite ne kadar
  // yaklaşıldığı 429 gelmeden görülsün.
  const stt = (await sql`
    select day::text as gun, count(*)::int as istek, sum(value)::int as saniye
    from events where name = 'stt_call' and day >= current_date - ${days}::int
    group by 1 order by istek desc limit 5
  `) as Row[];
  if (stt.length) {
    console.log("\nSesli cevap · yazıya çevirme (günün en yoğunları)");
    console.log("  gün          istek / 2.000    ses sn / 28.800");
    for (const r of stt) {
      const i = Number(r.istek), sec = Number(r.saniye ?? 0);
      console.log(
        `  ${r.gun}   ${String(i).padStart(5)} (%${Math.round((i / 2000) * 100)})` +
          `      ${String(sec).padStart(6)} (%${Math.round((sec / 28800) * 100)})`,
      );
    }
  }

  // ── Günlük etkinlik ────────────────────────────────────────────────
  const daily = (await sql`
    select day::text as day, count(*)::int as n, count(distinct user_id)::int as people
    from events
    where day >= current_date - ${days}::int
    group by day order by day
  `) as Row[];
  if (daily.length > 1) {
    console.log("\nGünlük");
    const max = Math.max(...daily.map((r) => Number(r.n)));
    for (const r of daily) {
      console.log(
        `  ${r.day}  ${String(r.n).padStart(5)} · ${r.people} kişi  ${bar(Number(r.n), max, 20)}`,
      );
    }
  }
  console.log("");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
