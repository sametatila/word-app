import "server-only";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { cleanForSpeech } from "./text";
import { OWN_VOICES, ownCastFor, type Pace, type Pitch, type VoiceId } from "./voices";

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

/** Dinleme (`l`) ve okuma (`r`) katmanı — adres `k=l` / `k=r` taşıyor. */
export type OwnLayer = "l" | "r";

/**
 * KATMAN ANAHTARI (2026-09-29): `TTS_OWN_LAYERS="l:defne,r:defne"` — hangi katmanda hangi karakterin dosyası
 * verilsin. Boşsa katman istekleri bugünkü gibi Edge'de. Karakter karakter açılıyor: bir karakterin o katmandaki
 * kapsamı TAMAMLANMADAN açılırsa aynı diyalogda/parçada o kişinin sesi satır satır değişir (dosya var → kendi ses,
 * yok → Edge). Kapsam: `scripts/tts-listening-jobs.ts` / `tts-reading-jobs.ts` ile sunucu tablosu karşılaştırılır.
 */
export function ownLayerEnabled(layer: OwnLayer, character: string): boolean {
  return (process.env.TTS_OWN_LAYERS ?? "")
    .split(",")
    .map((s) => s.trim())
    .includes(`${layer}:${character}`);
}

/**
 * Hız kademesinin tablo son eki. Dinleme ve okuma `listen`/`listenSlow` hızında isteniyor; bu sürümler üretimde
 * (tts-test `yayin.py`) aynı oranla (%20 / %45 yavaş, perde korunarak) ÖNCEDEN kodlanıp tabloya
 * `…|metin#listen` anahtarıyla yazılıyor: canlıda ses işleme yok. `slow` bu katmanlarda istenmiyor, üretilmedi.
 */
const LAYER_PACE: Partial<Record<Pace, string>> = { normal: "", listen: "#listen", listenSlow: "#listenSlow" };

/**
 * Dinleme kadrosunun 2. koltuğu (karar 2026-09-21, `scripts/tts-listening-jobs.ts` `CHAR`): 2. kadın Mira, 2. erkek
 * Can. Bu karakterler kullanıcının seçebildiği ses değil, `OWN_VOICES`ta yoklar; katman isteği onların Edge sesiyle
 * (Amala, Killian, Aria, Andrew) geliyor. 1. koltuk `ownCastFor` (Defne/Aras). 3. koltuk (Seraphina, Florian …)
 * Edge'de kalıyor: üretimi aynı karakterin perde kaydırılmış hâli, sunucuda o eşleme yok (2026-10-06 açılışta
 * bulundu: `l:mira,l:can` açıktı ama hiçbir istek bu karakterlere ulaşmıyordu).
 */
const LAYER_SECOND_SEAT: Partial<Record<VoiceId, { character: string; lang: "de" | "en" }>> = {
  "de-DE-AmalaNeural": { character: "mira", lang: "de" },
  "de-DE-KillianNeural": { character: "can", lang: "de" },
  "en-US-AriaNeural": { character: "mira", lang: "en" },
  "en-US-AndrewNeural": { character: "can", lang: "en" },
};

/**
 * Katman isteğinin karakter dosyası: istek EDGE sesiyle geliyor (Katja, Jenny …), karakter `ownCastFor` ile
 * (2. koltukta `LAYER_SECOND_SEAT` ile) bulunuyor. Anahtar kapalıysa, perde kaydırılmışsa (kadronun 3.+ koltuğu), hız üretilmemişse ya da metin tabloda
 * yoksa `null` → çağıran Edge'le sürüyor. Katman DÜŞÜŞLÜ: kelime katmanı gibi 404 değil.
 */
export async function ownLayerAudio(layer: OwnLayer, text: string, edgeVoice: VoiceId, pace: Pace, pitch: Pitch): Promise<OwnAudio | null> {
  const dir = process.env.TTS_OWN_DIR;
  const ownId = ownCastFor(edgeVoice);
  const own = (ownId ? OWN_VOICES[ownId] : undefined) ?? LAYER_SECOND_SEAT[edgeVoice];
  const suffix = LAYER_PACE[pace];
  if (!dir || !own || pitch !== "mid" || suffix === undefined || !ownLayerEnabled(layer, own.character)) return null;
  try {
    const name = (await load(dir))[`${own.character}|${own.lang}|${cleanForSpeech(text)}${suffix}`];
    if (!name) return null;
    return { audio: await readFile(path.join(dir, "m4a", name)), name };
  } catch (err) {
    console.error("[tts-own]", err);
    return null;
  }
}
