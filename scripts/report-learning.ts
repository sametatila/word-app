import "dotenv/config";
import { Pool } from "pg";

/**
 * Öğrenme raporu — `docs/plan/kpi.md`'deki sekiz KPI, haftalık.
 *
 * `report-events.ts` ürünü ölçer (kim nereye tıkladı); bu betik öğrenmeyi:
 * kaç kişi çalışıyor, ürettiği cevap oranı, sınav ve beceri puanları, ders
 * geçme, rol yapma, hata tipleri, geri gelme. Sorgular kpi.md ile birebir
 * aynı — orada değişen burada da değişir.
 *
 * Boş tablo "kırık" değil "henüz yok" demek: üretim olayları Faz 1, sınavlar
 * Faz 4 ile dolmaya başlar. Betik bunu satırında söyler.
 *
 *   npm run report:learning        # son 8 hafta
 *   npm run report:learning 16     # son 16 hafta
 */

type Row = Record<string, unknown>;
const n = (v: unknown) => Number(v ?? 0);
const pct = (a: number, b: number) => (b > 0 ? `%${Math.round((a / b) * 100)}` : "—");
const pad = (s: unknown, w: number) => String(s ?? "").padStart(w);

function head(title: string, hint?: string) {
  console.log(`\n${title}`);
  if (hint) console.log(`  ${hint}`);
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil");
  const sql = new Pool({ connectionString: url });
  const weeks = Math.max(1, Math.min(52, Number(process.argv[2]) || 8));
  const since = `current_date - ${7 * weeks}`;
  // Neon sürücüsü parametreyi tarih aritmetiğinde interval gibi okuyamıyor;
  // gün sayısını tam sayı olarak bağlayıp `::int` ile çarpıyoruz.
  const days = 7 * weeks;

  console.log(`\n══ Öğrenme raporu · son ${weeks} hafta (${since}) ══`);

  // 1. WAU
  const wau = (await sql`
    select date_trunc('week', day)::date::text as week, count(distinct user_id)::int as wau,
           sum(reviews)::int as answers, sum(seconds)::int as seconds
    from daily_stats
    where (reviews > 0 or xp > 0) and day >= current_date - ${days}::int
    group by 1 order by 1
  `) as Row[];
  head("1. Haftalık aktif öğrenen", "hafta · kişi · cevap · dakika");
  for (const r of wau)
    console.log(`  ${r.week}  ${pad(r.wau, 4)} kişi  ${pad(r.answers, 6)} cevap  ${pad(Math.round(n(r.seconds) / 60), 6)} dk`);
  if (!wau.length) console.log("  (kayıt yok)");

  // 2. Üretim oranı
  const prod = (await sql`
    with p as (
      select date_trunc('week', day)::date as week, count(*)::int as n
      from events where name = 'production_attempt' and day >= current_date - ${days}::int group by 1),
    r as (
      select date_trunc('week', created_at)::date as week,
             count(*) filter (where game in ('typing','scramble','order','translate','speak'))::int as prod,
             -- Tanıma TUR sayısı: tanıtım kartı bir soru değil (sayılmaz); eşleştirme
             -- turu beş cevap yazar ama tek turdur (1/5 ağırlık). Aksi hâlde pay
             -- iki kat düşük görünüyordu (26 Ağu ölçümü: %12 → %19).
             round(sum(case when game = 'match' then 0.2 when game = 'intro' then 0 when game in ('typing','scramble','order','translate','speak') then 0 else 1 end))::int as recog
      from reviews where created_at >= current_date - ${days}::int group by 1)
    select coalesce(p.week, r.week)::text as week, (coalesce(p.n,0) + coalesce(r.prod,0))::int as production, coalesce(r.recog,0)::int as recognition
    from p full join r on p.week = r.week order by 1
  `) as Row[];
  head("2. Üretim oranı", "üretim turu (yazma/bulmaca/diz/çeviri/sesli + üretim görevleri) / tüm turlar (tanıtım hariç, eşleştirme = 1 tur) · hedef ≥ %40");
  for (const r of prod) {
    const p = n(r.production), q = n(r.recognition);
    console.log(`  ${r.week}  ${pad(p, 5)} üretim  ${pad(q, 6)} tanıma  → ${pct(p, p + q)}`);
  }
  if (!prod.length) console.log("  (kayıt yok)");

  // 3. Sınav
  const exams = (await sql`
    select date_trunc('week', day)::date::text as week, split_part(coalesce(kind,'?'), ':', 1) as exam,
           round(avg(value))::int as avg_score, count(*)::int as exams, count(distinct user_id)::int as people
    from events where name = 'exam_finish' and day >= current_date - ${days}::int group by 1, 2 order by 1, 2
  `) as Row[];
  head("3. Sınav skorları", "tür başına ortalama · kullanım sınavı hedefi ≥ 70");
  for (const r of exams)
    console.log(`  ${r.week}  ${String(r.exam).padEnd(10)} ort ${pad(r.avg_score, 3)}  ${pad(r.exams, 4)} sınav · ${r.people} kişi`);
  if (!exams.length) console.log("  (henüz sınav olayı yok — Faz 4)");

  // 4. Beceri
  const skills = (await sql`
    select date_trunc('week', day)::date::text as week, coalesce(kind,'?') as skill_level,
           round(avg(value))::int as avg_score, count(*)::int as finishes, count(distinct user_id)::int as people
    from events where name = 'skill_finish' and day >= current_date - ${days}::int group by 1, 2 order by 1, 2
  `) as Row[];
  head("4. Beceri puanları", "beceri:seviye başına haftalık ortalama; önceki haftaya fark");
  const prevScore = new Map<string, number>();
  for (const r of skills) {
    const key = String(r.skill_level);
    const score = n(r.avg_score);
    const prev = prevScore.get(key);
    const delta = prev === undefined ? "" : ` (${score - prev >= 0 ? "+" : ""}${score - prev})`;
    prevScore.set(key, score);
    console.log(`  ${r.week}  ${key.padEnd(14)} ort ${pad(score, 3)}${delta.padEnd(7)} ${pad(r.finishes, 4)} bitiş · ${r.people} kişi`);
  }
  if (!skills.length) console.log("  (henüz beceri olayı yok — WP-01 sonrası dolar)");

  // 5 + 6. Ders geçme ve rol yapma
  const lessons = (await sql`
    select date_trunc('week', last_at)::date::text as week, count(*)::int as lessons,
           count(*) filter (where roleplay_done and correct::float / nullif(total,0) >= 0.7)::int as passed,
           count(*) filter (where roleplay_done)::int as roleplay_done,
           count(distinct user_id)::int as people
    from user_lessons where last_at >= current_date - ${days}::int group by 1 order by 1
  `) as Row[];
  head("5. Ders geçme oranı", "geçme = rol yapma bitti ve doğru ≥ %70 · hedef %60–80");
  for (const r of lessons)
    console.log(`  ${r.week}  ${pad(r.lessons, 4)} ders  ${pad(r.passed, 4)} geçti  → ${pct(n(r.passed), n(r.lessons))} · ${r.people} kişi`);
  if (!lessons.length) console.log("  (kayıt yok)");
  head("6. Rol yapma tamamlama", "hedef ≥ %85 (sağlayıcı kapalıyken de)");
  for (const r of lessons)
    console.log(`  ${r.week}  ${pad(r.roleplay_done, 4)} / ${pad(r.lessons, 4)}  → ${pct(n(r.roleplay_done), n(r.lessons))}`);
  const rp = (await sql`
    select date_trunc('week', day)::date::text as week, count(*)::int as n, round(avg(value))::int as avg_score
    from events where name = 'production_attempt' and kind = 'roleplay' and day >= current_date - ${days}::int
    group by 1 order by 1
  `) as Row[];
  for (const r of rp) console.log(`    ${r.week}  rol yapma puanı ort ${r.avg_score} (${r.n} konuşma)`);

  // 7. Hata tipleri
  const errors = (await sql`
    select date_trunc('week', day)::date::text as week, coalesce(kind,'?') as error_type, count(*)::int as n
    from events where name = 'error_recorded' and day >= current_date - ${days}::int group by 1, 2 order by 1, 3 desc
  `) as Row[];
  head("7. Hata tipi dağılımı", "haftanın yanlışları tipe göre");
  let curWeek = "";
  let weekTotal = 0;
  for (const r of errors) {
    if (r.week !== curWeek) {
      curWeek = String(r.week);
      weekTotal = errors.filter((e) => e.week === curWeek).reduce((a, e) => a + n(e.n), 0);
      console.log(`  ${curWeek}  toplam ${weekTotal}`);
    }
    console.log(`    ${String(r.error_type).padEnd(14)} ${pad(r.n, 5)}  ${pct(n(r.n), weekTotal)}`);
  }
  if (!errors.length) console.log("  (henüz hata tipi olayı yok — WP-02 sonrası dolar)");
  const weighted = (await sql`
    select date_trunc('week', day)::date::text as week, coalesce(kind,'?') as error_type, count(*)::int as n, round(avg(value))::int as w
    from events where name = 'srs_weight' and day >= current_date - ${days}::int group by 1, 2 order by 1, 3 desc
  `) as Row[];
  if (weighted.length) {
    console.log("  SRS hata ağırlığı uygulanan tekrarlar (WP-51)");
    for (const r of weighted) console.log(`    ${r.week}  ${String(r.error_type).padEnd(14)} ${pad(r.n, 5)}  ×${(n(r.w) / 100).toFixed(2)}`);
  }

  // 8. Tutunma
  const retention = (await sql`
    with first as (
      select user_id, date_trunc('week', min(day))::date as cohort
      from daily_stats where reviews > 0 or xp > 0 group by 1),
    active as (
      select distinct user_id, date_trunc('week', day)::date as week
      from daily_stats where reviews > 0 or xp > 0)
    select f.cohort::text as cohort, count(*)::int as users,
      count(*) filter (where exists (select 1 from active a where a.user_id = f.user_id and a.week = f.cohort + 7))::int as back_w1,
      count(*) filter (where exists (select 1 from active a where a.user_id = f.user_id and a.week = f.cohort + 28))::int as back_w4,
      bool_and(f.cohort + 7 <= current_date) as w1_known,
      bool_and(f.cohort + 28 <= current_date) as w4_known
    from first f where f.cohort >= current_date - ${days}::int group by 1 order by 1
  `) as Row[];
  head("8. Tutunma", "kohort = ilk aktif hafta · 1 hafta / 4 hafta sonra geri gelen · hedef %50 / %30");
  for (const r of retention) {
    const w1 = r.w1_known ? pct(n(r.back_w1), n(r.users)) : "(erken)";
    const w4 = r.w4_known ? pct(n(r.back_w4), n(r.users)) : "(erken)";
    console.log(`  ${r.cohort}  ${pad(r.users, 4)} kişi  1h ${w1.padStart(6)}  4h ${w4.padStart(6)}`);
  }
  if (!retention.length) console.log("  (kayıt yok)");

  // ── WP-80: öğrenme takibi ────────────────────────────────────────
  // 9. Ders adımları: nasıl geçiliyor
  const steps = (await sql`
    select split_part(kind, ':', 1) as step, split_part(kind, ':', 2) as via,
           count(*)::int as n,
           count(*) filter (where value = 2)::int as first_try,
           count(*) filter (where value = 1)::int as later,
           count(*) filter (where value = 0)::int as failed
    from events where name = 'lesson_step' and day >= current_date - ${days}::int group by 1, 2 order by 1, 2
  `) as Row[];
  head("9. Ders adımları", "adım türü · yol (mikrofon / yazı / atla) · ilk denemede / sonraki / geçilemedi");
  for (const r of steps)
    console.log(`  ${String(r.step).padEnd(10)} ${String(r.via).padEnd(6)} ${pad(r.n, 5)}  ilk ${pad(r.first_try, 4)}  sonra ${pad(r.later, 4)}  geçemedi ${pad(r.failed, 4)}  → ilk denemede ${pct(n(r.first_try), n(r.n))}`);
  if (!steps.length) console.log("  (henüz ders adımı olayı yok — WP-80 sonrası dolar)");
  const lf = (await sql`
    select date_trunc('week', day)::date::text as week, count(*)::int as n, round(avg(value))::int as avg_pct,
           count(*) filter (where kind is not null)::int as with_id, count(distinct user_id)::int as people
    from events where name = 'lesson_finish' and day >= current_date - ${days}::int group by 1 order by 1
  `) as Row[];
  for (const r of lf) console.log(`    ${r.week}  ${pad(r.n, 4)} ders bitişi · ort doğru %${r.avg_pct} · ${r.people} kişi`);
  const ls = (await sql`
    select count(*) filter (where value = 1)::int as resumed, count(*)::int as n from events where name = 'lesson_start' and day >= current_date - ${days}::int
  `) as Row[];
  if (n(ls[0]?.n)) console.log(`    ders başlangıcı ${ls[0].n} · kaldığı yerden ${ls[0].resumed} (${pct(n(ls[0].resumed), n(ls[0].n))})`);

  // 10. Söyleyiş: karar kimin
  const ss = (await sql`
    select kind as via, count(*)::int as n, count(*) filter (where value = 1)::int as ok
    from events where name = 'speak_self' and day >= current_date - ${days}::int group by 1 order by 1
  `) as Row[];
  head("10. Söyleyiş kararı", "tanıyıcı (asr) mı öğrenci (self) mi karar verdi · doğru oranı — self payı yüksekse drill sınamıyor");
  for (const r of ss) console.log(`  ${String(r.via).padEnd(6)} ${pad(r.n, 5)} karar  doğru ${pct(n(r.ok), n(r.n))}`);
  if (!ss.length) console.log("  (kayıt yok)");
  const pr = (await sql`
    select count(*)::int as n, round(avg(value))::int as avg_score, count(*) filter (where value >= 80)::int as passed, count(distinct user_id)::int as people
    from events where name = 'pronounce' and day >= current_date - ${days}::int
  `) as Row[];
  if (n(pr[0]?.n)) console.log(`  telaffuz puanı: ${pr[0].n} klip · ort ${pr[0].avg_score} · geçen ${pct(n(pr[0].passed), n(pr[0].n))} · ${pr[0].people} kişi`);

  // 11. Dilbilgisi drill'leri
  const dr = (await sql`
    select kind as table_id, count(*)::int as sets, round(avg(value))::int as avg_pct, count(distinct user_id)::int as people
    from events where name = 'drill_finish' and day >= current_date - ${days}::int group by 1 order by sets desc
  `) as Row[];
  head("11. Dilbilgisi drill setleri", "tablo · set · ortalama doğru · kişi");
  for (const r of dr) console.log(`  ${String(r.table_id).padEnd(22)} ${pad(r.sets, 4)}  %${pad(r.avg_pct, 3)}  ${r.people} kişi`);
  if (!dr.length) console.log("  (kayıt yok)");
  const de = (await sql`
    select kind as error_type, count(*)::int as n, count(*) filter (where value = 1)::int as ok
    from events where name = 'drill' and day >= current_date - ${days}::int group by 1 order by n desc
  `) as Row[];
  for (const r of de) console.log(`    ${String(r.error_type).padEnd(16)} ${pad(r.n, 5)} cevap  doğru ${pct(n(r.ok), n(r.n))}`);

  // 12. Tur türleri
  const st = (await sql`
    select coalesce(split_part(kind, ':', 1), 'eski') as mode, count(*)::int as n, count(distinct user_id)::int as people
    from events where name = 'session_start' and day >= current_date - ${days}::int group by 1 order by n desc
  `) as Row[];
  head("12. Tur türleri", "karışık · tek oyun · ek tur — üretim oranı düşükse tek oyun tercihi ipucu verir");
  for (const r of st) console.log(`  ${String(r.mode).padEnd(8)} ${pad(r.n, 5)} tur · ${r.people} kişi`);
  const sg = (await sql`
    select split_part(kind, ':', 2) as game, count(*)::int as n from events
    where name = 'session_start' and kind like 'single:%' and day >= current_date - ${days}::int group by 1 order by n desc
  `) as Row[];
  for (const r of sg) console.log(`    tek oyun ${String(r.game).padEnd(14)} ${pad(r.n, 4)}`);

  // 13. Ekranda geçen süre — öğrenme yüzeyleri
  const ts = (await sql`
    select kind as screen, sum(value)::int as seconds, count(*)::int as visits, count(distinct user_id)::int as people
    from events where name = 'time_spent' and day >= current_date - ${days}::int
      and kind in ('learn','lesson','skill','drill','cheatsheet','exam','placement','weekly','roleplay_exam')
    group by 1 order by seconds desc
  `) as Row[];
  head("13. Öğrenme yüzeylerinde geçen süre", "ekran · toplam dakika · kalış · ortalama kalış · kişi");
  for (const r of ts) console.log(`  ${String(r.screen).padEnd(14)} ${pad(Math.round(n(r.seconds) / 60), 5)} dk  ${pad(r.visits, 4)} kalış  ${pad(Math.round(n(r.seconds) / Math.max(1, n(r.visits))), 4)} sn  ${r.people} kişi`);
  if (!ts.length) console.log("  (kayıt yok)");

  // 14. Sağlayıcı sağlığı — sessizce düşen konuşma hattı
  const ai = (await sql`
    select kind, provider, count(*)::int as n, count(*) filter (where ok)::int as ok,
           round(avg(ms))::int as latency, count(*) filter (where status = 429)::int as limited
    from ai_usage where created_at >= current_date - ${days}::int group by 1, 2 order by 1, n desc
  `) as Row[];
  head("14. AI / STT sağlığı", "tür · sağlayıcı · istek · başarı · ort gecikme — başarı %90 altı = zincir çalışıyor ama kota yakın");
  for (const r of ai) console.log(`  ${String(r.kind).padEnd(9)} ${String(r.provider).padEnd(12)} ${pad(r.n, 5)}  ${pct(n(r.ok), n(r.n)).padStart(5)}  ${r.latency ?? "—"} ms${n(r.limited) ? `  · 429: ${r.limited}` : ""}`);
  if (!ai.length) console.log("  (kayıt yok)");
  const ce = (await sql`
    select kind as screen, count(*)::int as n, count(distinct user_id)::int as people, count(*) filter (where value = 1)::int as boundary
    from events where name = 'client_error' and day >= current_date - ${days}::int group by 1 order by n desc
  `) as Row[];
  if (ce.length) {
    console.log("  istemci hataları (ekran · olay · kişi · hata sınırına düşen)");
    for (const r of ce) console.log(`    ${String(r.screen).padEnd(14)} ${pad(r.n, 4)} · ${r.people} kişi · sınır ${r.boundary}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
