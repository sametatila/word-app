import "dotenv/config";
import { Pool } from "pg";

/**
 * Hangi sağlayıcı gerçekten cevaplıyor.
 *
 * Zincir sırayla çalışıyor ve anahtarı olmayan sağlayıcı SESSİZCE atlanıyor:
 * uygulama sorunsuz çalışırken birincil sağlayıcı hiç çağrılmamış olabiliyor
 * ve bu dışarıdan görünmüyor. Sağlayıcının kendi panelinde kullanım sıfır
 * görününce sorunun anahtarda mı, panelin gecikmesinde mi, yoksa zincirin
 * başka bir sağlayıcıya düşmesinde mi olduğu ayırt edilemiyordu.
 *
 * Cevap `roleplay_logs` içinde: her tur hangi sağlayıcı ve model tarafından
 * verildiyse oraya yazılıyor, sağlayıcının bildirdiği kalan hakla birlikte.
 *
 *   npm run report:providers
 */
type Row = Record<string, unknown>;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil");
  const sql = new Pool({ connectionString: url });

  // ── AI çağrılarının muhasebesi ─────────────────────────────────────
  // Bu tablo başarısız denemeleri de tutuyor. Zincir düşen sağlayıcıyı
  // sessizce atladığı için, yalnızca başarıya bakan bir rapor "her istekte
  // 429 alan birincil"i hiç kullanılmıyor sanıyordu.
  const usage = (await sql`
    select kind, provider, model,
           count(*)::int as toplam,
           count(*) filter (where ok)::int as basarili,
           round(avg(ms) filter (where ok))::int as ort_ms,
           coalesce(sum(prompt_tokens), 0)::int as giris,
           coalesce(sum(completion_tokens), 0)::int as cikis,
           coalesce(sum(audio_seconds), 0)::int as ses,
           max(created_at)::text as son
    from ai_usage
    where created_at > now() - interval '30 days'
    group by 1, 2, 3
    order by toplam desc
  `) as Row[];

  if (usage.length) {
    console.log("\nSon 30 gün · AI çağrıları\n");
    console.log("  iş         sağlayıcı   model                      çağrı  başarı  ort ms   jeton      ses");
    for (const r of usage) {
      const t = Number(r.toplam), ok = Number(r.basarili);
      const tok = Number(r.giris) + Number(r.cikis);
      console.log(
        `  ${String(r.kind).padEnd(10)} ${String(r.provider).padEnd(11)} ${String(r.model).slice(0, 26).padEnd(26)} ` +
          `${String(t).padStart(5)}  %${String(Math.round((ok / t) * 100)).padStart(3)}  ${String(r.ort_ms ?? "—").padStart(6)}  ` +
          `${tok ? String(tok).padStart(7) : "      —"}  ${Number(r.ses) ? String(r.ses).padStart(5) + " sn" : "     —"}`,
      );
    }

    // Hatalar ayrı: en çok merak edilen "neden düştü" sorusu.
    const errs = (await sql`
      select provider, status, count(*)::int as n, max(error) as ornek
      from ai_usage
      where not ok and created_at > now() - interval '30 days'
      group by 1, 2 order by n desc limit 6
    `) as Row[];
    if (errs.length) {
      console.log("\n  Düşen denemeler");
      for (const e of errs) {
        console.log(
          `    ${String(e.provider).padEnd(11)} ${String(e.status).padStart(3)}  ${String(e.n).padStart(4)} kez  ${String(e.ornek ?? "").slice(0, 60)}`,
        );
      }
    }

    // "Doğru söyledim ama yanlış saydı" şikâyetinin tek cevabı bu liste:
    // beklenen ile duyulan yan yana. Sorun telaffuzda mı, tanıyıcıda mı,
    // yoksa kabul mantığında mı — ancak böyle ayrılıyor.
    const mismatch = (await sql`
      select expected, heard, provider, count(*)::int as n
      from ai_usage
      where kind = 'stt' and ok and expected is not null and heard is not null
        and lower(regexp_replace(expected, '^(der|die|das) ', '')) <>
            lower(regexp_replace(heard, '[.,!?]', '', 'g'))
        and created_at > now() - interval '30 days'
      group by 1, 2, 3 order by n desc limit 10
    `) as Row[];
    if (mismatch.length) {
      console.log("\n  Beklenen ≠ duyulan (yazıya çevirme)");
      for (const m of mismatch) {
        console.log(
          `    ${String(m.expected).padEnd(22)} → ${String(m.heard).padEnd(22)} ${String(m.n).padStart(3)} kez  (${m.provider})`,
        );
      }
    }

    // Ücretsiz katmanın bağlayıcı sınırı istek sayısı; günlük en yoğunlar.
    const daily = (await sql`
      select day::text as gun, kind, count(*)::int as n, coalesce(sum(audio_seconds), 0)::int as ses
      from ai_usage where created_at > now() - interval '30 days'
      group by 1, 2 order by n desc limit 6
    `) as Row[];
    if (daily.length) {
      console.log("\n  Günün en yoğunları (groq ücretsiz sınırı: 2.000 istek · 28.800 sn ses)");
      for (const d of daily) {
        const n = Number(d.n), sec = Number(d.ses);
        console.log(
          `    ${d.gun}  ${String(d.kind).padEnd(10)} ${String(n).padStart(5)} istek (%${Math.round((n / 2000) * 100)})` +
            (sec ? `  ${sec} sn ses (%${Math.round((sec / 28800) * 100)})` : ""),
        );
      }
    }
  } else {
    console.log("\nai_usage boş — henüz kaydedilmiş AI çağrısı yok.");
  }

  const total = (await sql`select count(*)::int as n from roleplay_logs`) as Row[];
  const n = Number(total[0]?.n ?? 0);
  if (!n) {
    console.log(
      "roleplay_logs boş. Ya hiç ders konuşması yapılmadı ya da kayıtların süresi doldu\n" +
        "(kayıt kalıcı bir birikim değil, süreli bir teşhis penceresi).",
    );
    return;
  }

  const rows = (await sql`
    select
      coalesce(provider, '(kayıtsız)') as provider,
      coalesce(model, '(kayıtsız)') as model,
      count(*)::int as n,
      min(created_at)::text as ilk,
      max(created_at)::text as son
    from roleplay_logs
    group by 1, 2
    order by n desc
  `) as Row[];

  console.log(`\nToplam ${n} rol yapma turu kaydı\n`);
  console.log("  sağlayıcı      model                              tur    son kullanım");
  for (const r of rows) {
    console.log(
      `  ${String(r.provider).padEnd(14)} ${String(r.model).slice(0, 34).padEnd(34)} ${String(r.n).padStart(4)}   ${String(r.son).slice(0, 16)}`,
    );
  }

  // Son cevabın bildirdiği kalan hak: limite ne kadar yaklaşıldığı ancak
  // buradan görülüyor — 429 gelene kadar her şey normal görünüyor.
  const last = (await sql`
    select provider, model, limits, created_at::text as at
    from roleplay_logs
    where limits is not null
    order by created_at desc
    limit 1
  `) as Row[];
  if (last.length) {
    console.log(`\nEn son bildirilen kalan hak (${last[0].provider} · ${String(last[0].at).slice(0, 16)}):`);
    const limits = last[0].limits as Record<string, string>;
    for (const [k, v] of Object.entries(limits ?? {})) console.log(`  ${k.padEnd(38)} ${v}`);
  } else {
    console.log("\nHiçbir kayıtta kalan hak başlığı yok — sağlayıcı bildirmiyor olabilir.");
  }
  console.log("");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
