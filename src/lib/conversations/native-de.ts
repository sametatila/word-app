import type { Conversation, Segment } from "./types";

/**
 * İngilizce kursun derslerini ALMANCAYA çevirir — anadili Almanca olan
 * kullanıcı için.
 *
 * NEDEN `native.ts`TEKİ ÇÖZÜCÜ KULLANILAMIYOR. `resolveConversation` Almanca
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

/** Bileşik anahtarların ayracı — `data/conversations/apply-de.mjs` ile aynı. */
const SEP = String.fromCharCode(0);

export type DeDict = {
  /** Ders düzyazısı — anahtar `tür + AYRAÇ + tr` (`prose-de/out/`). */
  conversation: Record<string, string>;
  /** Beceri egzersizlerinin düz metni — anahtar DÜZ `tr`. */
  prose: Record<string, string>;
  /** Beceri egzersizlerinin görev metni — anahtar `tür + AYRAÇ + tr`. */
  task: Record<string, string>;
  /** Deneme kâğıtları — anahtar `mockKey` ile aynı. */
  mock: Record<string, string>;
  /**
   * Modül sınavı kâğıtları — anahtar DÜZ `tr` (`exam-de/out/`).
   *
   * Kardeş sözlükteki `exam` ile aynı biçim, ters yön: orası Almanca kursun
   * Türkçesini İngilizceye, burası İngilizce kursun Türkçesini Almancaya
   * bağlıyor. Aynı biçimde olması bilinçli — `resolveExamDe` `NativeDict`
   * bekliyor ve `DeDict` bu alanla olduğu gibi verilebiliyor.
   */
  exam: Record<string, string>;
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
    const de = dict.conversation[deKey(kind, s.text)];
    if (de === undefined) {
      fail();
      return s;
    }
    return { ...s, lang: "de" as const, text: de };
  });
};

export function resolveEnConversation(dict: DeDict, conversation: Conversation): Conversation | null {
  let failed = false;
  const fail = () => {
    failed = true;
  };
  /** Boş alan ÇEVRİLMİYOR: çıkarıcı da boşu hiç eklemedi (`add()` süzgeci). */
  const t = (kind: string, s: string | undefined): string | undefined => {
    if (!s || !s.trim()) return s;
    const de = dict.conversation[deKey(kind, s)];
    if (de === undefined) fail();
    return de ?? s;
  };

  const out: Conversation = {
    ...conversation,
    titleTr: t("titleTr", conversation.titleTr) ?? conversation.titleTr,
    summary: t("summary", conversation.summary) ?? conversation.summary,
    vocab: conversation.vocab?.map((v) => ({ ...v, tr: t("vocab.tr", v.tr) ?? v.tr })),
    patterns: conversation.patterns?.map((p) => ({ ...p, tr: t("pattern.tr", p.tr) ?? p.tr })),
    lecture: conversation.lecture?.map((step) => {
      const say = segments(dict, "say.tr", step.say, fail) ?? step.say;
      const e = step.expect;
      if (!e) return { ...step, say };
      if (e.kind === "truefalse")
        return { ...step, say, expect: { ...e, why: segments(dict, "why.tr", e.why, fail) ?? e.why } };
      if (e.kind === "produce")
        return { ...step, say, expect: { ...e, hint: segments(dict, "hint.tr", e.hint, fail) ?? e.hint } };
      return { ...step, say, expect: e };
    }),
    chat: {
      ...conversation.chat,
      scene: t("scene", conversation.chat?.scene) ?? conversation.chat?.scene,
      partner: t("partner", conversation.chat?.partner) ?? conversation.chat?.partner,
      openingTr: t("openingTr", conversation.chat?.openingTr) ?? conversation.chat?.openingTr,
      goal: t("goal", conversation.chat?.goal) ?? conversation.chat?.goal,
    },
  } as Conversation;

  return failed ? null : out;
}
