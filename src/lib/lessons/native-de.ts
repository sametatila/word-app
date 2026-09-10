import type { Lesson, Segment } from "./types";

/**
 * İngilizce kursun derslerini ALMANCAYA çevirir — anadili Almanca olan
 * kullanıcı için.
 *
 * NEDEN `native.ts`TEKİ ÇÖZÜCÜ KULLANILAMIYOR. `resolveLesson` Almanca
 * kursun TS derslerine göre kurulmuş: sözlüğü `meta`, `lecture`,
 * `lectureSplit`, `frames`, `vocab` gibi alt sözlüklere bölüyor ve
 * `word()` şablonunu çalışma anında yeniden kuruyor. İngilizce kursun
 * dersleri ise kendi kendine yeten JSON — Türkçe alanlar dersin İÇİNDE,
 * şablon yok, Almanca kelimeye göre bölünecek belirsizlik yok. Aynı
 * çözücüye ikinci bir biçim öğretmek, okunmayan yarısı için ölü dal
 * taşımak olurdu.
 *
 * BECERİ VE DENEME KÂĞIDI İÇİN AYRI ÇÖZÜCÜ YOK: `resolveExercise` ve
 * `resolveMockPaper` yalnız `dict.prose` ile `dict.mock`a bakıyor ve
 * ikisinin anahtarları Almanca tarafta da birebir aynı. `DeDict`in o iki
 * alanı bu yüzden aynı adı taşıyor — sözlük olduğu gibi verilebiliyor.
 *
 * HEP-YA-HİÇ, kardeşiyle aynı gerekçeyle: bir dize bile eksikse ders
 * TÜMDEN reddediliyor ve Türkçe kalıyor. Yarı Almanca yarı Türkçe bir
 * ders, hiç çevrilmemişinden kötü.
 */

/** Bileşik anahtarların ayracı — `data/lessons/apply-de.mjs` ile aynı. */
const SEP = String.fromCharCode(0);

export type DeDict = {
  /** Ders düzyazısı — anahtar `tür + AYRAÇ + tr` (`prose-de/out/`). */
  lesson: Record<string, string>;
  /** Beceri egzersizlerinin düz metni — anahtar DÜZ `tr`. */
  prose: Record<string, string>;
  /** Beceri egzersizlerinin görev metni — anahtar `tür + AYRAÇ + tr`. */
  task: Record<string, string>;
  /** Deneme kâğıtları — anahtar `mockKey` ile aynı. */
  mock: Record<string, string>;
  /** Can-do ifadeleri — anahtar `id` (`A1.SPK.1`). ÇÖZÜCÜDEN GEÇMİYOR:
   *  ders sayfasının altındaki köprü bunu ayrı okuyor (`nativeCando`). */
  cando: Record<string, string>;
};

/** Ders sözlüğünün anahtarı. Çıkarıcı da (`prose-de/make.mjs`) bunu kuruyor. */
export const deKey = (kind: string, tr: string): string => kind + SEP + tr;

/**
 * Anlatım parçaları. Türkçe olan çevriliyor ve `lang` ALMANCAYA dönüyor —
 * dili söyleyen alan sesi de seçiyor, Almanca metni Türkçe sesle okumak
 * yanlış olurdu. Öğretilen dilin (İngilizce) parçalarına dokunulmuyor.
 */
const segments = (
  dict: DeDict,
  kind: string,
  segs: Segment[] | undefined,
  fail: () => void,
): Segment[] | undefined => {
  if (!segs) return segs;
  return segs.map((s) => {
    if (s.lang !== "tr") return s;
    /* BOŞ PARÇA ÇEVRİLMİYOR ve bu ölçütün çıkarıcıyla aynı olması şart:
       `prose-de/make.mjs` boş dizeyi hiç eklemiyor (`add()` süzgeci), yani
       sözlükte karşılığı yok. Burada aranırsa bulunmaz ve hep-ya-hiç kuralı
       DERSİN TAMAMINI reddeder. Tam bu oldu: `en-a2-interview`in bir
       doğru/yanlış adımında `{lang:"tr", text:""}` duruyor ve ders 200'ün
       199'u çözülürken tek başına düşüyordu. */
    if (!s.text || !s.text.trim()) return s;
    const de = dict.lesson[deKey(kind, s.text)];
    if (de === undefined) {
      fail();
      return s;
    }
    return { ...s, lang: "de" as const, text: de };
  });
};

export function resolveEnLesson(dict: DeDict, lesson: Lesson): Lesson | null {
  let failed = false;
  const fail = () => {
    failed = true;
  };
  /** Boş alan ÇEVRİLMİYOR: çıkarıcı da boşu hiç eklemedi (`add()` süzgeci). */
  const t = (kind: string, s: string | undefined): string | undefined => {
    if (!s || !s.trim()) return s;
    const de = dict.lesson[deKey(kind, s)];
    if (de === undefined) fail();
    return de ?? s;
  };

  const out: Lesson = {
    ...lesson,
    titleTr: t("titleTr", lesson.titleTr) ?? lesson.titleTr,
    summary: t("summary", lesson.summary) ?? lesson.summary,
    vocab: lesson.vocab?.map((v) => ({ ...v, tr: t("vocab.tr", v.tr) ?? v.tr })),
    patterns: lesson.patterns?.map((p) => ({ ...p, tr: t("pattern.tr", p.tr) ?? p.tr })),
    lecture: lesson.lecture?.map((step) => {
      const say = segments(dict, "say.tr", step.say, fail) ?? step.say;
      const e = step.expect;
      if (!e) return { ...step, say };
      if (e.kind === "truefalse")
        return { ...step, say, expect: { ...e, why: segments(dict, "why.tr", e.why, fail) ?? e.why } };
      if (e.kind === "produce")
        return { ...step, say, expect: { ...e, hint: segments(dict, "hint.tr", e.hint, fail) ?? e.hint } };
      return { ...step, say, expect: e };
    }),
    roleplay: {
      ...lesson.roleplay,
      scene: t("scene", lesson.roleplay?.scene) ?? lesson.roleplay?.scene,
      partner: t("partner", lesson.roleplay?.partner) ?? lesson.roleplay?.partner,
      openingTr: t("openingTr", lesson.roleplay?.openingTr) ?? lesson.roleplay?.openingTr,
      goal: t("goal", lesson.roleplay?.goal) ?? lesson.roleplay?.goal,
    },
  } as Lesson;

  return failed ? null : out;
}
