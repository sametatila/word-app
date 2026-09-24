/**
 * SES BEKÇİSİ — sunucuda, canlı `words` tablosu ile `TTS_OWN_DIR/tts-map.json`i karşılaştırır.
 *   npm run -s tts:watch        (sunucuda `/opt/lernomi/tts-watch.sh` çağırıyor: her gece + her deploy sonunda)
 *
 * Neden: kelime katmanı Edge'e düşmüyor (`lib/tts/own`), yani bir metin değişince ya da yeni içerik gelince
 * sesi üretilene kadar hoparlör susuyor. 2026-09-24'te "ana dili konuşuru" → "ana dili olarak konuşan kişi"
 * düzeltmesinin sesi eksik kaldı ve bunu yalnız elle bakınca gördük.
 *
 * Yaptığı:
 *   - eksik anahtarları hesaplar (`tts-own-needs`, elle çalışan `tts:coverage` ile aynı hesap),
 *   - üretim işini `TTS_OWN_DIR/eksik.jsonl`e yazar (tts-test `kelimeler.py` biçimi),
 *   - bir önceki ölçümü `TTS_OWN_DIR/eksik-durum.json`da tutar ve YALNIZ YENİ eksik varsa tek satır mesaj basar.
 * Mesaj boşsa söylenecek bir şey yok; sarmalayıcı mesajı Telegram'a yollar. Üretim sürerken kalan binlerce
 * eksik her gece tekrar bildirilmesin diye ölçüt "yeni", toplam yalnız bağlam olarak yazılıyor.
 *
 * Yürüyüş anlatımı (`walk_*`) eksikse susmuyor, Edge karşılığı çalıyor (`k=n`); o yüzden ayrı sayılıyor.
 */
import "dotenv/config";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";
import { coverage, jobLines, ownNeeds, type WordRow } from "./tts-own-needs";

async function main() {
  const dir = process.env.TTS_OWN_DIR;
  if (!dir) return; // anahtar kapalıyken kelimeler Edge'den çalıyor, bekçiye iş yok
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query<WordRow>(
    `select id, de, artikel, tr, en, formen, typ, niveau, beispiel, de_gloss, rank, course from words where course in ('de', 'en')`,
  );
  await pool.end();

  const map: Record<string, string> = JSON.parse(readFileSync(path.join(dir, "tts-map.json"), "utf8"));
  const { missing, jobs, needed } = coverage(ownNeeds(rows), map);

  const lines = jobLines(jobs);
  writeFileSync(path.join(dir, "eksik.jsonl"), lines.join("\n") + (lines.length ? "\n" : ""));

  const statePath = path.join(dir, "eksik-durum.json");
  const first = !existsSync(statePath);
  const before = new Set<string>(first ? [] : JSON.parse(readFileSync(statePath, "utf8")).missing);
  writeFileSync(statePath, JSON.stringify({ at: new Date().toISOString(), missing: missing.map((m) => m.key) }));

  const narration = (m: { field: string }) => m.field.startsWith("walk_");
  const silent = missing.filter((m) => !narration(m));
  const fresh = missing.filter((m) => !before.has(m.key));
  const unused = Object.keys(map).filter((k) => !needed.has(k)).length;

  if (first) {
    console.log(`Ses bekçisi ilk ölçüm: ${silent.length} anahtar sesiz (+${missing.length - silent.length} anlatım Edge'de), tabloda kullanılmayan ${unused}. İş: ${lines.length} metin → ${dir}/eksik.jsonl`);
    return;
  }
  if (!fresh.length) return;

  const freshSilent = fresh.filter((m) => !narration(m));
  const sample = fresh.slice(0, 5).map(({ key: k }) => (k.length > 60 ? `${k.slice(0, 57)}…` : k)).join(" · ");
  console.log(
    `Sesi olmayan YENİ metin: ${fresh.length} anahtar (${freshSilent.length} sesiz, ${fresh.length - freshSilent.length} anlatım Edge'de). ` +
      `Örnek: ${sample}. Toplam eksik ${missing.length}, tabloda kullanılmayan ${unused}. ` +
      `Üretim: scp lernomi:${dir}/eksik.jsonl → tts-test kelimeler/jobs/eksik_<tarih>.jsonl, kelimeler.py eksik_<tarih>`,
  );
}

main().catch((err) => {
  console.log(`Ses bekçisi çalışamadı: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
