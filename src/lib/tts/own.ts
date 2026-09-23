import "server-only";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { cleanForSpeech } from "./text";
import { OWN_VOICES, type Pace, type Pitch, type VoiceId } from "./voices";

/**
 * KENDİ KARAKTER SESLERİ — Defne ve Aras'ın önceden üretilmiş dosyaları (2026-09-23).
 *
 * `docs/plan/tts-own-voices.md` bölüm 4: canlıda sentez yok, GPU yok. tts-test `yayin.py` her klibi AAC-LC
 * 48 kb/s mono `.m4a` olarak içerik özetiyle adlandırıp `tts-map.json` yazıyor:
 * `"<karakter>|<dil>|<temiz metin>" → "<karakter>/<ad>.m4a"`. Sunucu `TTS_OWN_DIR` altında bu tabloyu ve
 * `m4a/` dizinini buluyor.
 *
 * `TTS_OWN_DIR` YAYIN ANAHTARI. Tanımlı değilse karakter sesi istekleri Edge karşılığına gidiyor ve kelime
 * isteği de susmuyor (bkz. route `k=w`): tablo sunucuya konmadan kod yayına çıkabilsin, ama tablo
 * TAMAMLANMADAN değişken açılmasın — açıldığı an kelimelerde düşüş kalkıyor, eksik metin susuyor.
 * Kapsam kapısı: `scripts/tts-own-coverage.ts`.
 *
 * Yalnız normal hız ve orta perde üretildi. Kelime katmanında yavaş ya da perdeli istek yok (ölçüldü:
 * günlük tur ve pratikte `slow`/`p` taşıyan kelime çağrısı yok); gelirse tabloda bulunmuyor sayılıyor.
 */

type Table = { dir: string; map: Record<string, string>; mtimeMs: number; checked: number };
let table: Table | null = null;
const RECHECK_MS = 60_000;

/** Tablo bir kez yükleniyor (~10 MB), dakikada bir değişip değişmediğine bakılıyor: yayın yeniden başlatma istemesin. */
async function load(dir: string): Promise<Record<string, string>> {
  const now = Date.now();
  if (table && table.dir === dir && now - table.checked < RECHECK_MS) return table.map;
  const file = path.join(dir, "tts-map.json");
  const { mtimeMs } = await stat(file);
  if (!table || table.dir !== dir || table.mtimeMs !== mtimeMs) {
    table = { dir, map: JSON.parse(await readFile(file, "utf8")), mtimeMs, checked: now };
  }
  table.checked = now;
  return table.map;
}

/** Karakter sesleri yayında mı — `TTS_OWN_DIR` tanımlı mı. */
export function ownVoicesLive(): boolean {
  return Boolean(process.env.TTS_OWN_DIR);
}

export type OwnAudio = { audio: Buffer; name: string };

/**
 * Önceden üretilmiş dosya varsa baytları ve adı (ad içerik özeti → ETag), yoksa `null`.
 * Okuma hatası da `null` ama günlüğe düşüyor: tablo var, dosya yoksa yayın eksik kopyalanmış demek.
 */
export async function ownVoiceAudio(text: string, voice: VoiceId, pace: Pace, pitch: Pitch): Promise<OwnAudio | null> {
  const dir = process.env.TTS_OWN_DIR;
  const own = OWN_VOICES[voice];
  if (!dir || !own || pace !== "normal" || pitch !== "mid") return null;
  try {
    const name = (await load(dir))[`${own.character}|${own.lang}|${cleanForSpeech(text)}`];
    if (!name) return null;
    return { audio: await readFile(path.join(dir, "m4a", name)), name };
  } catch (err) {
    console.error("[tts-own]", err);
    return null;
  }
}
