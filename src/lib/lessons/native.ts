import type { Lesson, LectureStep, Segment } from "./types";
import type { DialogueTurn } from "@/lib/dialogue";

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
  /** Can-do ifadesi — anahtar `A1.SPK.1` biçiminde. */
  cando: Record<string, string>;
  /**
   * Çevrimdışı rol yapma senaryosunun Türkçe alanları. Anahtar DİZENİN
   * KENDİSİ: kaynak konumsal kısayollarla yazıldığı için alanların adı yok.
   */
  script: Record<string, string>;
  /**
   * Modül sınavı kâğıtlarının Türkçe alanları — anahtar yine dizenin kendisi.
   *
   * `canDo` ve `writing.phrases` BURADA YOK: ikisinde de `en` alanı kaynakta
   * ZATEN dolu (290/290). Çözücü onları sözlükten değil kaynaktan okuyor.
   */
  exam: Record<string, string>;
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

  /*
    SENARYO, ROL YAPMANIN İÇİNDE. On dersin `roleplay.script` dizisi var ve
    içindeki üç alan Türkçe. Buradaki eksik de dersi TÜMDEN düşürüyor:
    modelin çalışmadığı anda devreye giren akış bu, yani yarım çevrilirse
    tam da en kırılgan anda Türkçe çıkar.
  */
  const src = lesson.roleplay as unknown as { script?: DialogueTurn[] };
  let script: DialogueTurn[] | undefined;
  if (src.script) {
    const turns: DialogueTurn[] = [];
    for (const t of src.script) {
      const askTr = dict.script[t.askTr];
      const cue = dict.script[t.cue];
      if (askTr === undefined || cue === undefined) return null;
      const replies: DialogueTurn["replies"] = [];
      for (const r of t.replies ?? []) {
        const sayTr = dict.script[r.sayTr];
        if (sayTr === undefined) return null;
        replies.push({ ...r, sayTr });
      }
      let fallback = t.fallback;
      if (fallback) {
        const sayTr = dict.script[fallback.sayTr];
        if (sayTr === undefined) return null;
        fallback = { ...fallback, sayTr };
      }
      turns.push({ ...t, askTr, cue, replies, fallback });
    }
    script = turns;
  }

  return {
    ...lesson,
    titleTr: meta.title,
    summary: meta.summary,
    vocab: lesson.vocab.map((v) => ({ ...v, tr: dict.vocab[lesson.id + SEP + v.de] ?? v.tr })),
    patterns: lesson.patterns.map((p) => ({ ...p, tr: dict.patterns[lesson.id + SEP + p.de] ?? p.tr })),
    roleplay: { ...lesson.roleplay, ...(rp ?? {}), ...(script ? { script } : {}) },
    lecture,
  };
}

/**
 * Modül sınavı kâğıdını öğrencinin ana diline çevirir.
 *
 * Kâğıt ÜÇ dilli bir nesne ve üçünün rolü ayrı: Almanca ölçülen dil, Türkçe
 * (ya da İngilizce) öğrencinin dili, şıklar Almanca. Çevrilen yalnız orta
 * sütun — `titleDe`, replik `de`si, soru kökünün `de`si, şıklar, okuma metni
 * ve örnek cevap OLDUĞU GİBİ kalıyor. Sınav Almanca ölçüyor; onları çevirmek
 * sınavı ortadan kaldırırdı.
 *
 * `canDo` ve `writing.phrases` sözlükten GEÇMİYOR: ikisinin de `en` alanı
 * kaynakta zaten dolu. Aynı şey için iki doğruluk kaynağı tutmak, ayrıştıkları
 * gün hangisinin doğru olduğunu bilinemez hâle getirir.
 *
 * Ders çözücüsüyle aynı kural: HEP YA HİÇ. Tek bir yönerge Türkçe kalırsa
 * kâğıt reddediliyor — yarı Türkçe bir sınav kâğıdı, öğrencinin okuduğu
 * yönergeye güvenemediği bir kâğıttır.
 */
export function resolveExam<T extends ExamShape>(dict: NativeDict, plan: T): T | null {
  let failed = false;
  const t = (s: string): string => {
    const en = dict.exam[s];
    if (en === undefined) failed = true;
    return en ?? s;
  };
  const en = (g: { en?: string; tr: string }): string => {
    if (!g.en?.trim()) failed = true;
    return g.en ?? g.tr;
  };

  const out = {
    ...plan,
    titleTr: t(plan.titleTr),
    focus: plan.focus.map((f) => ({ ...f, tr: t(f.tr) })),
    canDo: plan.canDo.map((c) => ({ ...c, tr: en(c) })),
    listening: {
      ...plan.listening,
      titleTr: t(plan.listening.titleTr),
      situation: t(plan.listening.situation),
      turns: plan.listening.turns.map((x) => ({ ...x, tr: t(x.tr) })),
      questions: plan.listening.questions.map((q) => ({ ...q, tr: t(q.tr) })),
    },
    reading: {
      ...plan.reading,
      titleTr: t(plan.reading.titleTr),
      genre: t(plan.reading.genre),
      questions: plan.reading.questions.map((q) => ({ ...q, tr: t(q.tr) })),
    },
    speaking: plan.speaking.map((s) => ({ ...s, situation: t(s.situation), tr: t(s.tr) })),
    writing: {
      ...plan.writing,
      prompt: t(plan.writing.prompt),
      checklist: plan.writing.checklist.map(t),
      phrases: plan.writing.phrases.map((g) => ({ ...g, tr: en(g) })),
    },
  };
  return failed ? null : (out as T);
}

/**
 * `resolveExam`in dokunduğu alanlar. Tipi `ModuleExamPlan`den ALMIYORUZ:
 * çözücü tarayıcıda da derlenen bir modül, sınav tipleri ise sunucu tarafının
 * ağır ağacını (`skills/types`) çekiyor. Yapısal tanım ikisini ayrı tutuyor.
 */
export type ExamShape = {
  titleTr: string;
  focus: { tr: string }[];
  canDo: { tr: string; en?: string }[];
  listening: {
    titleTr: string;
    situation: string;
    turns: { tr: string }[];
    questions: { tr: string }[];
  };
  reading: { titleTr: string; genre: string; questions: { tr: string }[] };
  speaking: { situation: string; tr: string }[];
  writing: { prompt: string; checklist: string[]; phrases: { tr: string; en?: string }[] };
};
