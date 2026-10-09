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
 *   - bir önceki ölçümü `TTS_OWN_DIR/eksik-durum.json`da tutar ve YALNIZ YENİ eksik varsa çok satırlı mesaj basar.
 * Mesaj boşsa söylenecek bir şey yok; sarmalayıcı mesajı Telegram'a yollar. Üretim sürerken kalan binlerce
 * eksik her gece tekrar bildirilmesin diye ölçüt "yeni", toplam yalnız bağlam olarak yazılıyor.
 *
 * Yürüyüş anlatımı (`walk_*`) eksikse susmuyor, Edge karşılığı çalıyor (`k=n`); o yüzden ayrı sayılıyor.
 *
 * SOSYAL VİDEO STÜDYOSU (2026-10-09): stüdyoda düzenlenen bölümlerin seslendirilen Almanca metinleri
 * (`social_episodes.spoken`, arşivlenmemiş) de ihtiyaç listesine girer (alan `word_social` / `example_social`: Mac kelime kayıtlarını alanın ilk parçasından tanır).
 * Samet'in kararı "yalnız Defne": kaydı olmayan metnin bölümü onaylanamaz; Mac'in sabah turu üretince açılır.
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
  // stüdyo: seslendirilen metinler (tablo yoksa ya da göç uygulanmadıysa sessizce atla)
  let social: string[] = [];
  try {
    const r = await pool.query<{ text: string }>(
      `select distinct jsonb_array_elements_text(spoken) as text from social_episodes where archived_at is null`,
    );
    social = r.rows.map((x) => x.text).filter(Boolean);
  } catch {
    /* social_episodes yok */
  }
  await pool.end();

  const map: Record<string, string> = JSON.parse(readFileSync(path.join(dir, "tts-map.json"), "utf8"));
  const SOCIAL_ROW: WordRow = { id: 0, de: "", artikel: null, tr: "", en: null, formen: null, typ: "", niveau: "B1", beispiel: null, de_gloss: null, rank: null, course: "social" };
  // kısa metin (kelime, artikelli kelime) kelime gibi, cümle örnek cümle gibi okunur (Mac'in kayıt kapıları alana göre)
  const socialNeeds = social.map((text) => ({ lang: "de", text, field: text.split(/\s+/).length <= 3 && !/[.!?]$/.test(text) ? "word_social" : "example_social", w: SOCIAL_ROW }));
  const { missing, jobs, needed } = coverage([...ownNeeds(rows), ...socialNeeds], map);

  const lines = jobLines(jobs);
  writeFileSync(path.join(dir, "eksik.jsonl"), lines.join("\n") + (lines.length ? "\n" : ""));

  const statePath = path.join(dir, "eksik-durum.json");
  const first = !existsSync(statePath);
  const before = new Set<string>(first ? [] : JSON.parse(readFileSync(statePath, "utf8")).missing);
  writeFileSync(statePath, JSON.stringify({ at: new Date().toISOString(), missing: missing.map((m) => m.key) }));

  const narration = (m: { field: string }) => m.field.startsWith("walk_");
  const silent = missing.filter((m) => !narration(m));
  const fresh = missing.filter((m) => !before.has(m.key));
  // `#listen`/`#listenSlow`: dinleme ve okumanın önceden yavaşlatılmış sürümleri (lib/tts/own `ownLayerAudio`), kelime
  // katmanının ihtiyacı değil; sayılmıyor.
  const unused = Object.keys(map).filter((k) => !k.includes("#") && !needed.has(k)).length;

  const n = (x: number) => x.toLocaleString("tr-TR");
  if (first) {
    console.log(
      [
        "Ses bekçisi ilk ölçüm",
        `Sessiz anahtar: ${n(silent.length)} · Edge'de çalan anlatım: ${n(missing.length - silent.length)}`,
        `Tabloda kullanılmayan: ${n(unused)} · İş listesi: ${n(lines.length)} metin (${dir}/eksik.jsonl)`,
      ].join("\n"),
    );
    return;
  }
  if (!fresh.length) return;

  /* Telegram'a çok satırlı düz metin (tts-watch.sh bütün çıktıyı alıyor). Anahtar `ses|dil|metin`; aynı metnin iki
     sesi tek satırda: "let someone know (en · Defne, Aras)". */
  const freshSilent = fresh.filter((m) => !narration(m));
  const byText = new Map<string, { lang: string; text: string; voices: string[] }>();
  for (const { key } of fresh) {
    const [voice, lang, ...rest] = key.split("|");
    const text = rest.join("|");
    const e = byText.get(`${lang}|${text}`) ?? { lang, text, voices: [] };
    e.voices.push(voice.charAt(0).toLocaleUpperCase("tr-TR") + voice.slice(1));
    byText.set(`${lang}|${text}`, e);
  }
  const clip = (s: string) => (s.length > 60 ? `${s.slice(0, 57)}…` : s);
  const sample = [...byText.values()].slice(0, 5).map((e) => `• ${clip(e.text)} (${e.lang} · ${e.voices.join(", ")})`);
  console.log(
    [
      `Sesi olmayan yeni metin: ${n(byText.size)} metin (${n(fresh.length)} anahtar)`,
      `Kelime katmanı, sessiz: ${n(freshSilent.length)} · Yürüyüş anlatımı, Edge'de çalıyor: ${n(fresh.length - freshSilent.length)}`,
      "Örnekler:",
      ...sample,
      ...(byText.size > sample.length ? [`… ve ${n(byText.size - sample.length)} metin daha`] : []),
      `Toplam eksik: ${n(missing.length)} anahtar · Tabloda kullanılmayan: ${n(unused)}`,
      `Üretim: ${dir}/eksik.jsonl → tts-test kelimeler/jobs/, kelimeler.py ile`,
    ].join("\n"),
  );
}

main().catch((err) => {
  console.log(`Ses bekçisi çalışamadı: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
