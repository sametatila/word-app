import "dotenv/config";
import { neon } from "@neondatabase/serverless";

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
  const sql = neon(url);

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
