/**
 * Kulak kontrolü kararları — `tts_reviews` tablosunun okuma/yazma kapısı (bkz. schema `ttsReviews`).
 *
 *   npm run -s tts:reviews -- import < kararlar.json    # [{voice, lang, text, file, verdict, note?, decidedAt, source?}]
 *   npm run -s tts:reviews -- export [--ok]              # JSON dizi; --ok: yalnız onaylılar
 *
 * Üretim makinesi (tts-test) sunucuda ssh ile çağırıyor: karar senkronu (`karar_yaz.py`) yazar, paket ve aday
 * seçimi okur. Aynı sese (ses, dil, metin, dosya) ikinci karar gelirse YENİSİ (decidedAt) kalır; not boş gelirse
 * eskisi korunur — notsuz bir onay, reddederken yazılmış notu silmesin.
 */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { Pool } from "pg";

type Row = { voice: string; lang: string; text: string; file?: string; verdict: "ok" | "redo"; note?: string | null; decidedAt: string; source?: string | null };

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    if (cmd === "import") {
      const rows = JSON.parse(readFileSync(0, "utf8")) as Row[];
      let n = 0;
      for (const r of rows) {
        if (!r.voice || !r.lang || !r.text || !["ok", "redo"].includes(r.verdict) || !r.decidedAt) continue;
        const res = await pool.query(
          `insert into tts_reviews (voice, lang, text, file, verdict, note, source, decided_at)
           values ($1, $2, $3, $4, $5, $6, $7, $8)
           on conflict (voice, lang, text, file) do update set
             verdict = case when excluded.decided_at >= tts_reviews.decided_at then excluded.verdict else tts_reviews.verdict end,
             note = coalesce(excluded.note, tts_reviews.note),
             source = case when excluded.decided_at >= tts_reviews.decided_at then excluded.source else tts_reviews.source end,
             decided_at = greatest(excluded.decided_at, tts_reviews.decided_at),
             updated_at = now()`,
          [r.voice, r.lang, r.text, r.file ?? "", r.verdict, r.note?.trim() || null, r.source ?? null, r.decidedAt],
        );
        n += res.rowCount ?? 0;
      }
      const { rows: c } = await pool.query(`select verdict, count(*)::int n from tts_reviews group by verdict order by verdict`);
      console.log(`yazıldı ${n}/${rows.length} · tabloda ${c.map((x) => `${x.verdict} ${x.n}`).join(", ")}`);
    } else if (cmd === "export") {
      const ok = rest.includes("--ok");
      const { rows } = await pool.query(
        `select voice, lang, text, file, verdict, note, source, decided_at as "decidedAt" from tts_reviews
         ${ok ? "where verdict = 'ok'" : ""} order by voice, lang, text, file`,
      );
      process.stdout.write(JSON.stringify(rows));
    } else {
      console.error("kullanım: tts-reviews.ts import < dosya.json | export [--ok]");
      process.exitCode = 2;
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
