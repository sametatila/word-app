import type { Lesson, LectureStep, Segment } from "./types";

/**
 * Anlatımı öğrencinin ANA DİLİNE çevirir.
 *
 * Ders içeriği Türkçe yazıldı ve öyle kalıyor — karşılıklar `data/lessons/`
 * altındaki beş hatta elle yazılıp `apply.mjs` ile tek bir üretilen sözlüğe
 * toplanıyor. Burası o sözlüğü okuyan taraf.
 *
 * YARIM DERS YOK. Bir parçanın karşılığı bulunamazsa çözücü o dersi TÜMDEN
 * reddediyor (`null`) — tek bir Türkçe cümle kalmış İngilizce ders, çalışıyor
 * görünen en kötü biçim. Faz 1'in kuralı da bu: karşılık yoksa `null` döner,
 * Türkçeye DÜŞMEZ.
 *
 * `lang` yalnız ekranı değil TTS sesini ve mikrofon dilini de seçiyor, o
 * yüzden çevrilen parça `"en"` etiketleniyor; Türkçe metnin yerine İngilizce
 * yazmak yetmez, etiket de değişmeli.
 */

/** Bileşik anahtarların ayracı — `data/lessons/apply.mjs` ile aynı olmak zorunda. */
const SEP = "\u0000";

export type NativeDict = {
  /** Düz anlatım dizeleri. */
  lecture: Record<string, string>;
  /**
   * Almanca kelimeye göre BÖLÜNMÜŞ anlatım dizeleri.
   *
   * "Türkçesi 'yüz' demek" hem `hundert` hem `das Gesicht` için kullanılıyor;
   * Türkçede 'yüz' ikisini de karşıladığı için kaynak kurtuluyor, İngilizcede
   * 'a hundred' ile 'face' aynı sözcük değil. Anahtar: dize + ayraç + adımda
   * ÖNCE gelen Almanca parça.
   */
  lectureSplit: Record<string, string>;
  /** `word()` yardımcısının iki çerçeve metni. */
  frames: Record<string, string>;
  /** "İlk kelimemiz:" … "Son kelimemiz:" */
  ordinals: Record<string, string>;
  /** `word()`in üçüncü argümanı — kullanım notu. */
  notes: Record<string, string>;
  /** `(ders, Almanca)` → kelimenin İngilizce karşılığı. */
  vocab: Record<string, string>;
  patterns: Record<string, string>;
  meta: Record<string, { title: string; summary: string }>;
  /**
   * Rol yapma sahnesi. `openingTr` Almanca açılış repliğinin ANA DİLDEKİ
   * karşılığı — Almanca replik (`opening`) olduğu gibi kalıyor, model onu
   * konuşuyor.
   */
  roleplay: Record<string, { scene: string; partner: string; openingTr: string; goal: string }>;
};

/*
  ŞABLON ÇALIŞMA ANINDA KURULUYOR, yani ekrana çıkan dize `out/`ta YOK.
  38 dosya bir `word()` yardımcısı tanımlıyor ve iki ayrı çerçeve metni
  yazmış; çözücü dizeyi desenle tanıyıp üç parçadan yeniden kuruyor:
  kelimenin karşılığı (sözlükçe hattı), not (şablon hattı) ve çerçevenin
  kendisi.

  Sıra ÖNEMLİ: önce düz sözlüğe bakılıyor. İçerik dosyalarında elle
  yazılmış "'X' demek. Lütfen" dizeleri de var ve onlar `out/`ta duruyor;
  desen önce çalışsaydı onları da parçalayıp yanlış yoldan kurardı.
*/
const FRAME_A = { tr: "'{}' demek.{not} Lütfen", re: /^'(.+?)' demek\.(?: (.+?))? Lütfen$/ };
const FRAME_B = { tr: "Türkçesi '{}' demek{ — not}. Lütfen", re: /^Türkçesi '(.+?)' demek(?: — (.+?))?\. Lütfen$/ };

/** Çerçeveyi doldurur: `{}` kelimenin karşılığı, `{not}` / `{ — not}` nottur. */
function fill(frame: string, word: string, note: string | null): string {
  return frame
    .replace("{}", word)
    .replace("{not}", note ? ` ${note}` : "")
    .replace("{ — not}", note ? ` — ${note}` : "");
}

/** Tek bir Türkçe parçanın İngilizcesi; bulunamazsa `null`. */
function resolveText(
  dict: NativeDict,
  lesson: string,
  text: string,
  prevTarget: string | null,
): string | null {
  const split = prevTarget ? dict.lectureSplit[text + SEP + prevTarget] : undefined;
  if (split !== undefined) return split;
  const plain = dict.lecture[text];
  if (plain !== undefined) return plain;
  const ordinal = dict.ordinals[text];
  if (ordinal !== undefined) return ordinal;

  for (const f of [FRAME_A, FRAME_B]) {
    const m = f.re.exec(text);
    if (!m || !prevTarget) continue;
    const word = dict.vocab[lesson + SEP + prevTarget];
    if (word === undefined) return null;
    const note = m[2] ?? null;
    const noteEn = note === null ? null : (dict.notes[note] ?? null);
    if (note !== null && noteEn === null) return null;
    const frame = dict.frames[f.tr];
    if (frame === undefined) return null;
    return fill(frame, word, noteEn);
  }
  return null;
}

/**
 * Bir parça dizisini çevirir. Tek bir parça bile çözülemezse `null`.
 *
 * `prevTarget` adımda dizeden ÖNCE gelen HEDEF dil parçası — bölünmüş
 * anahtarın ve şablonun kelimesi o. `make.mjs` de yalnız ona bakıyor;
 * adımdaki bütün Almancayı toplamak aynı dizeyi üç kez sordurmuştu.
 */
export function resolveSegments(
  dict: NativeDict,
  lesson: string,
  segs: Segment[],
): Segment[] | null {
  const out: Segment[] = [];
  let prevTarget: string | null = null;
  for (const s of segs) {
    if (s.lang !== "tr") {
      out.push(s);
      prevTarget = s.text;
      continue;
    }
    const en = resolveText(dict, lesson, s.text, prevTarget);
    if (en === null) return null;
    out.push({ ...s, lang: "en", text: en });
    prevTarget = null;
  }
  return out;
}

/**
 * Dersin anlatımını çevirir; bir adım bile çözülemezse ders TÜMDEN reddedilir.
 *
 * Başlık ve özet de `meta` hattından geliyor; kalıp notu `patterns`ten.
 * Sözlükçenin kendisi (`vocab`) ekranda kelime listesi olarak görünüyor ve
 * ayrı okunuyor — burada yalnız anlatımın içine giren karşılığı kullanılıyor.
 */
export function resolveLesson(dict: NativeDict, lesson: Lesson): Lesson | null {
  const meta = dict.meta[lesson.id];
  if (!meta) return null;

  const lecture: LectureStep[] = [];
  for (const step of lesson.lecture ?? []) {
    const say = resolveSegments(dict, lesson.id, step.say);
    if (!say) return null;
    let expect = step.expect;
    if (expect && "hint" in expect && expect.hint) {
      const hint = resolveSegments(dict, lesson.id, expect.hint);
      if (!hint) return null;
      expect = { ...expect, hint };
    }
    if (expect && "why" in expect && expect.why) {
      const why = resolveSegments(dict, lesson.id, expect.why);
      if (!why) return null;
      expect = { ...expect, why };
    }
    lecture.push({ ...step, say, expect });
  }

  const rp = dict.roleplay[lesson.id];

  return {
    ...lesson,
    titleTr: meta.title,
    summary: meta.summary,
    vocab: lesson.vocab.map((v) => ({ ...v, tr: dict.vocab[lesson.id + SEP + v.de] ?? v.tr })),
    patterns: lesson.patterns.map((p) => ({ ...p, tr: dict.patterns[lesson.id + SEP + p.de] ?? p.tr })),
    roleplay: rp ? { ...lesson.roleplay, ...rp } : lesson.roleplay,
    lecture,
  };
}
