import "dotenv/config";
import { Pool } from "pg";

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

// Sekme SIRASI 26 Ağu 2026'da değişti (beş → üç); o günden sonra `nav` olayı
// `kind` olarak sekme adını taşıyor ve rapor ona bakıyor. Eski satırlar için
// eski sıra: Öğren, Beceriler, Dersler, Kelimeler, Profil.
const NAV_LABELS_LEGACY = ["Öğren", "Beceriler", "Dersler", "Kelimeler", "Profil"];
const NAV_KEYS: Record<string, string> = { learn: "Öğren", lessons: "Dersler", skills: "Beceriler" };

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
  const sql = new Pool({ connectionString: url });
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
    select coalesce(kind, 'legacy:' || value::text) as tab, count(*)::int as n, count(distinct user_id)::int as people
    from events
    where name = 'nav' and day >= current_date - ${days}::int and (kind is null or kind not like 'onboarding:%' and kind not like 'roleplay_exam:%')
    group by 1 order by n desc
  `) as Row[];
  if (navs.length) {
    console.log("\nSekmeler");
    const max = Math.max(...navs.map((r) => Number(r.n)));
    for (const r of navs) {
      const tab = String(r.tab);
      const label = tab.startsWith("legacy:") ? `${NAV_LABELS_LEGACY[Number(tab.slice(7))] ?? tab} (eski sıra)` : (NAV_KEYS[tab] ?? tab);
      console.log(`  ${label.padEnd(22)} ${String(r.n).padStart(5)} · ${r.people} kişi  ${bar(Number(r.n), max)}`);
    }
  }

  // ── Ekranlar (WP-80) ───────────────────────────────────────────────
  // Sekme dışı ekranlar da burada: alt gezinmeden çıkarılan Kelimeler ve
  // Profil'e hâlâ giriliyor mu, ayarlar/sınav/yerleştirme açılıyor mu.
  const screens = (await sql`
    with v as (
      select kind, count(*)::int as views, count(distinct user_id)::int as people
      from events where name = 'page_view' and day >= current_date - ${days}::int group by 1),
    t as (
      select kind, sum(value)::int as seconds, count(*)::int as visits
      from events where name = 'time_spent' and day >= current_date - ${days}::int group by 1)
    select coalesce(v.kind, t.kind) as screen, coalesce(v.views,0) as views, coalesce(v.people,0) as people,
           coalesce(t.seconds,0) as seconds, coalesce(t.visits,0) as visits
    from v full join t on v.kind = t.kind order by views desc
  `) as Row[];
  if (screens.length) {
    console.log("\nEkranlar · açılış · kişi · toplam dakika · ortalama kalış");
    for (const r of screens) {
      const sec = Number(r.seconds), visits = Number(r.visits);
      const avg = visits ? `${Math.round(sec / visits)} sn/kalış` : "";
      console.log(`  ${String(r.screen).padEnd(14)} ${String(r.views).padStart(5)} · ${String(r.people).padStart(2)} kişi  ${String(Math.round(sec / 60)).padStart(5)} dk  ${avg}`);
    }
  }

  // ── Katlı bölümler ─────────────────────────────────────────────────
  const panels = (await sql`
    select kind, count(*) filter (where value = 1)::int as opened, count(distinct user_id) filter (where value = 1)::int as people
    from events where name = 'panel_open' and day >= current_date - ${days}::int group by 1 order by opened desc
  `) as Row[];
  if (panels.length) {
    console.log("\nKatlı bölümler (açılma) · sahibin taşıdığı ölçüm kartları görülüyor mu");
    for (const r of panels) console.log(`  ${String(r.kind).padEnd(22)} ${String(r.opened).padStart(5)} · ${r.people} kişi`);
  }

  // ── Onboarding hunisi ──────────────────────────────────────────────
  const onb = (await sql`
    select kind, count(distinct user_id)::int as people from events
    where name = 'onboarding_step' and day >= current_date - ${days}::int group by 1
  `) as Row[];
  if (onb.length) {
    console.log("\nOnboarding hunisi (kişi)");
    for (const step of ["welcome", "goal", "level", "ready"]) {
      const p = Number(onb.find((r) => r.kind === step)?.people ?? 0);
      console.log(`  ${step.padEnd(10)} ${String(p).padStart(4)}`);
    }
    const pl = get("placement_finish");
    console.log(`  ${"yerleştirme".padEnd(10)} ${String(pl.people).padStart(4)}`);
  }

  // ── Cihaz ──────────────────────────────────────────────────────────
  const devices = (await sql`
    select kind, count(*)::int as opens, count(distinct user_id)::int as people, round(avg(value))::int as width
    from events where name = 'app_open' and day >= current_date - ${days}::int group by 1 order by opens desc
  `) as Row[];
  if (devices.length) {
    console.log("\nCihaz · günlük ilk açılış · kişi · ortalama genişlik");
    for (const r of devices) console.log(`  ${String(r.kind).padEnd(20)} ${String(r.opens).padStart(5)} · ${r.people} kişi · ${r.width}px`);
  }

  // ── Bildirim ve davet hunisi ───────────────────────────────────────
  const sent = get("push_sent"), opened = get("push_open"), optin = get("push_optin");
  if (sent.n || opened.n || optin.n) {
    console.log("\nBildirim");
    const optRows = (await sql`
      select value, count(*)::int as n from events where name = 'push_optin' and day >= current_date - ${days}::int group by 1
    `) as Row[];
    const ov = (v: number) => Number(optRows.find((r) => Number(r.value) === v)?.n ?? 0);
    console.log(`  izin istendi: verildi ${ov(1)} · reddedildi ${ov(0)} · sonra ${ov(2)}`);
    console.log(`  gönderilen ${sent.n} (${sent.people} kişi) → bildirimden açılış ${opened.n} (${opened.people} kişi) ${sent.n ? pct(opened.n, sent.n) : ""}`);
  }
  const inst = (await sql`
    select value, count(*)::int as n from events where name = 'install_prompt' and day >= current_date - ${days}::int group by 1
  `) as Row[];
  if (inst.length) {
    const iv = (v: number) => Number(inst.find((r) => Number(r.value) === v)?.n ?? 0);
    console.log(`  ana ekrana ekleme: eklendi ${iv(1)} · reddedildi ${iv(0)} · iOS ipucu ${iv(2)}`);
  }
  const inv = get("invite_open");
  if (inv.n) console.log(`  davet bağlantısıyla açılış ${inv.n} (${inv.people} kişi)`);

  // ── Ayarlar, arama, ses, koç ───────────────────────────────────────
  const misc = (await sql`
    select name, kind, count(*)::int as n, count(distinct user_id)::int as people
    from events where name in ('setting_change','search','tts_play','coach_show','client_error') and day >= current_date - ${days}::int
    group by 1, 2 order by 1, n desc
  `) as Row[];
  if (misc.length) {
    console.log("\nAyar · arama · ses · koç · hata");
    for (const r of misc) console.log(`  ${String(r.name).padEnd(15)} ${String(r.kind ?? "—").padEnd(16)} ${String(r.n).padStart(5)} · ${r.people} kişi`);
  }

  // ── Diğer olaylar ──────────────────────────────────────────────────
  const SHOWN = ["nav", "stage_done", "session_stop", "page_view", "time_spent", "panel_open", "onboarding_step", "app_open", "push_sent", "push_open", "push_optin", "install_prompt", "invite_open", "setting_change", "search", "tts_play", "coach_show", "client_error", ...funnel.map((f) => f[0])];
  const rest = totals.filter((r) => !SHOWN.includes(String(r.name)));
  if (rest.length) {
    console.log("\nDiğer");
    for (const r of rest) {
      console.log(`  ${String(r.name).padEnd(22)} ${String(r.n).padStart(5)} · ${r.people} kişi`);
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
