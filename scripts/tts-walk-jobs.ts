/**
 * Yürüyüş modunun ANLATIM cümleleri — kendi karakter sesleri için iş listesi.
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-walk-jobs.ts <çıktı.jsonl> [sabit|ozet|hepsi]
 *
 * Yürüyüş modunda kelime ve anlamı Defne/Aras okuyor; aradaki yönergeler ("Yeni kelime.", "Doğrusu:", "Tur bitti.
 * 20 sorudan 14 doğru.") de aynı karakterin anadil sesiyle okunsun diye burada sayılıyor. Metin uygulamanın KENDİ
 * çeviri işlevinden (`translate`, mobil `t` ile aynı kural ve aynı `{x}` yer tutucuları) ve `cleanForSpeech`ten
 * geçiyor: kayıt anahtarı istemcinin isteyeceği dizgenin ta kendisi.
 *
 * Kaynak: web `walk-player` ve mobil `WalkModeScreen`in sesli okuduğu anahtarlar (ekranda görünen ama okunmayanlar
 * burada yok). Yeni bir anlatım cümlesi okunmaya başlarsa buraya da eklenmeli; `tts-own-coverage.ts` bu listeyi
 * kapsam denetimine katıyor.
 *
 * `ozet`: tur sonu özeti sayı içeriyor ({total} soru, {correct} doğru). Tur 20 soru (`ROUNDS_PER_SESSION`), yani
 * 0–20 arası bütün birleşimler üretiliyor; sayılar metinde rakamla, seslendirme onları sözcüğe çeviriyor.
 */
import { writeFileSync } from "node:fs";
import { translate } from "../src/lib/i18n/dict";
import { cleanForSpeech } from "../src/lib/tts/text";
import { COURSES, PAIR_READY, type NativeLang } from "../src/lib/courses";

/** Sesli okunan sabit anahtarlar (web + mobil birleşimi). */
export const WALK_SPOKEN_KEYS = [
  "walk.new_word",
  "walk.your_turn",
  "walk.correct_is",
  "walk.not_heard",
  "walk.mic_silent",
  "walk.mic_unreachable",
  "walk.continuing",
  "walk.continue_q",
  "walk.continue_yes_no",
  "walk.goodbye",
  "walk.no_more",
  "walk.paused_spoken",
  "walk.pocket_announce",
  "walk.skip_hint_before",
  "walk.skip_hint_after",
  "walk.screen_off_warning",
  "walk.browser_stt_dead_server",
  "walk.browser_stt_dead_stop",
  "walkmode.screen_off_premium",
  "walkmode.screen_off_account",
  "aiconsent.voice_without",
] as const;

/** Tur uzunluğu — `lib/session` ROUNDS_PER_SESSION ile aynı. */
export const WALK_MAX_ROUNDS = 20;

export type WalkLine = { lang: NativeLang; field: string; text: string };

/** Yürüyüş modunun seslendirdiği bütün anlatım metinleri, anadil başına. */
export function walkLines(which: "sabit" | "ozet" | "hepsi" = "hepsi"): WalkLine[] {
  const out: WalkLine[] = [];
  const natives = (Object.keys(PAIR_READY) as NativeLang[]).filter((l) => PAIR_READY[l].length);
  for (const lang of natives) {
    const add = (field: string, text: string) => out.push({ lang, field, text });
    if (which !== "ozet") {
      for (const key of WALK_SPOKEN_KEYS) add(`walk:${key}`, translate(lang, key));
      // web: toplam 0 iken özet yerine "Tur bitti! Devam edelim mi?"
      add("walk:round_done_q", `${translate(lang, "common.round_done")} ${translate(lang, "walk.continue_q")}`);
      // cesaret cümleleri: tek anahtarda "|" ile ayrılmış seçenekler
      for (const e of translate(lang, "walk.encourage").split("|").filter(Boolean)) add("walk:encourage", e);
      // selamlama: mobil, öğrenilen dilin adıyla
      for (const course of COURSES.filter((c) => c.enabled && PAIR_READY[lang].includes(c.id))) {
        add("walk:greeting", translate(lang, "walk.greeting", { lang: course.label[lang] }));
      }
    }
    if (which !== "sabit") {
      for (let total = 0; total <= WALK_MAX_ROUNDS; total++) {
        for (let correct = 0; correct <= total; correct++) {
          add("walk:tour_done", translate(lang, "walk.tour_done", { total, correct }));
          add("walk:tour_done_continue", translate(lang, "walk.tour_done_continue", { total, correct }));
        }
      }
    }
  }
  return out;
}

if (process.argv[1]?.endsWith("tts-walk-jobs.ts")) {
  const [out, which = "hepsi"] = process.argv.slice(2);
  if (!out) {
    console.error("kullanım: tts-walk-jobs.ts <çıktı.jsonl> [sabit|ozet|hepsi]");
    process.exit(2);
  }
  const seen = new Set<string>();
  const lines: string[] = [];
  for (const l of walkLines(which as "sabit" | "ozet" | "hepsi")) {
    const clean = cleanForSpeech(l.text);
    if (!clean || seen.has(`${l.lang}|${clean}`)) continue;
    seen.add(`${l.lang}|${clean}`);
    lines.push(JSON.stringify({ id: `w${lines.length}`, field: l.field.replace(/[^\w]/g, "_"), lang: l.lang, text: l.text, clean }));
  }
  writeFileSync(out, lines.join("\n") + "\n");
  console.log(`${lines.length} anlatım metni (${which}) → ${out}`);
}
