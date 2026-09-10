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
  /**
   * ALMANCA takas tablosu — `(ders, özgün Almanca)` → yeni Almanca.
   *
   * Çeviri değil KARAR. Ders öğrenciye kendisi hakkında bir cümle
   * söyletiyorsa ("Ich bin in Izmir geboren", "Ich spreche Türkisch") o cümle
   * Türk öğrenciye göre kurulmuş demektir; İngilizce konuşan için yanlış.
   * Diyalogdaki BİR KİŞİNİN Türkiyeli olması ise içerik ve olduğu gibi kalır
   * — ayıran şey cümlenin dersteki rolü. Tablo: `data/lessons/swap/en.json`.
   */
  swap: Record<string, string>;
  /**
   * İngilizce taraftaki eşi — `(ders, özgün İngilizce)` → yeni İngilizce.
   *
   * Almanca değişince onu ALINTILAYAN İngilizce satır da değişmeli:
   * "Last: 'Turkish and German are not related languages.'" satırı, altındaki
   * Almanca cümle değiştiği anda yalan söylemeye başlar.
   */
  swapEn: Record<string, string>;
  /**
   * BECERİ EGZERSİZLERİNİN düz metni — `intro` ve `questions[].explain`.
   * Anahtar dizenin kendisi (`data/skills/prose/out/`).
   *
   * Ders ekseninden ayrı bir sözlük çünkü kaynağı da ayrı: bu dizeler
   * `BUNDLED_EXERCISES`ten çıkıyor, derslerden değil. Aynı Türkçe cümle iki
   * eksende farklı çevrilebilir ve tek sözlüğe konsalar biri ötekini ezerdi.
   *
   * ALINTILAR BURADA YOK ve olmamalı: 1.885 `explain` satırı düz Türkçe
   * değil, metinden alınmış bir cümle ("„Fünf Minuten.“") ve İngilizcesi
   * kendisi. Onları birim eşleme olarak sözlüğe koymak dosyayı yarı yarıya
   * büyütür ve hiçbir karar taşımaz — çözücü `isProseQuote` ile tanıyıp
   * olduğu gibi geçiriyor. Paketleyici de AYNI işlevi çağırıyor, yani iki
   * taraf ayrışamıyor.
   */
  prose: Record<string, string>;
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

/**
 * İngilizce takası — sözlükten okunan her ATOMİK parçaya uygulanıyor.
 *
 * Şablonun kurduğu satır (`It means 'Turkish'. Please say`) hiçbir dosyada
 * durmuyor; üç parçadan çalışma anında kuruluyor. Takas bitmiş satıra
 * uygulansaydı o satırı hiç yakalayamazdı — parçaya uygulanınca kelime
 * karşılığı daha kurulmadan dönüyor.
 */
const swapEn = (dict: NativeDict, lesson: string, en: string): string =>
  dict.swapEn[lesson + SEP + en] ?? en;

/** Tek bir Türkçe parçanın İngilizcesi; bulunamazsa `null`. */
function resolveText(
  dict: NativeDict,
  lesson: string,
  text: string,
  prevTarget: string | null,
): string | null {
  const split = prevTarget ? dict.lectureSplit[text + SEP + prevTarget] : undefined;
  if (split !== undefined) return swapEn(dict, lesson, split);
  const plain = dict.lecture[text];
  if (plain !== undefined) return swapEn(dict, lesson, plain);
  const ordinal = dict.ordinals[text];
  if (ordinal !== undefined) return swapEn(dict, lesson, ordinal);

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
    return fill(frame, swapEn(dict, lesson, word), noteEn === null ? null : swapEn(dict, lesson, noteEn));
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
      /*
        SIRA KRİTİK: `prevTarget` ÖZGÜN Almancayı taşıyor, takas edilmişi
        değil. Bölünmüş anlatım anahtarları (`lectureSplit`) ve şablonun
        kelime araması ona bakıyor; takas edilmiş dizeyi anahtar yapsaydık
        69 satırın karşılığı sessizce bulunamazdı. Ekrana giden metin
        takas edilmiş, anahtar özgün.
      */
      out.push({ ...s, text: dict.swap[lesson + SEP + s.text] ?? s.text });
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

  /** Almanca takası — `(ders, özgün)` → yeni. Yoksa dize olduğu gibi döner. */
  const sw = (de: string): string => dict.swap[lesson.id + SEP + de] ?? de;

  const lecture: LectureStep[] = [];
  for (const step of lesson.lecture ?? []) {
    const say = resolveSegments(dict, lesson.id, step.say);
    if (!say) return null;
    let expect = step.expect;
    /*
      TANIMA HEDEFİ de takas ediliyor: ekranda yeni cümle duruyorsa öğrenci
      onu söyleyecek, eskisini değil. Hedef takas edilmezse öğrenci ekranda
      gördüğünü söyler ve konuşma her seferinde yanlış sayılır.
    */
    if (expect && "target" in expect && typeof expect.target === "string")
      expect = { ...expect, target: sw(expect.target) };
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
        replies.push({ ...r, sayTr: swapEn(dict, lesson.id, sayTr), say: sw(r.say) });
      }
      let fallback = t.fallback;
      if (fallback) {
        const sayTr = dict.script[fallback.sayTr];
        if (sayTr === undefined) return null;
        /* `example` de Almanca ve öğrencinin söyleyeceği örnek cevap —
           replik takas edilip örnek eski kalırsa ikisi çelişir. */
        const ex = (fallback as { example?: string }).example;
        fallback = {
          ...fallback,
          sayTr: swapEn(dict, lesson.id, sayTr),
          say: sw(fallback.say),
          ...(ex ? { example: sw(ex) } : {}),
        };
      }
      turns.push({
        ...t,
        ask: sw(t.ask),
        askTr: swapEn(dict, lesson.id, askTr),
        cue: swapEn(dict, lesson.id, cue),
        replies,
        fallback,
      });
    }
    script = turns;
  }

  return {
    ...lesson,
    titleTr: meta.title,
    summary: meta.summary,
    /* Arama ÖZGÜN Almancayla, gösterilen takas edilmiş: anahtar `v.de`nin
       eski hâli, kart üstündeki kelime yenisi. */
    vocab: lesson.vocab.map((v) => ({
      ...v,
      de: sw(v.de),
      tr: swapEn(dict, lesson.id, dict.vocab[lesson.id + SEP + v.de] ?? v.tr),
    })),
    patterns: lesson.patterns.map((p) => ({ ...p, tr: dict.patterns[lesson.id + SEP + p.de] ?? p.tr })),
    roleplay: {
      ...lesson.roleplay,
      ...(rp ?? {}),
      ...(lesson.roleplay?.opening ? { opening: sw(lesson.roleplay.opening) } : {}),
      /* Açılış repliğinin ANA DİLDEKİ karşılığı da takas ediliyor: Almancası
         "Du bist also in Manchester aufgewachsen?" olup altındaki İngilizce
         "So you grew up in Izmir?" kalsaydı ikisi birbirini yalanlardı. */
      ...(rp?.openingTr ? { openingTr: swapEn(dict, lesson.id, rp.openingTr) } : {}),
      ...(script ? { script } : {}),
    },
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

/**
 * ALINTI SATIRI — çevrilmeyen `explain`.
 *
 * Açıklamaların büyük kısmı Türkçe düzyazı DEĞİL: metinden alınmış Almanca
 * (İngilizce kursta İngilizce) bir cümle, tırnak içinde. "„Fünf Minuten.“"
 * satırının İngilizcesi yine "„Fünf Minuten.“" — kanıt cümlesi çevrilmez,
 * çünkü öğrencinin metinde göreceği şey odur.
 *
 * Ölçüt DAR: dizenin TAMAMI tek bir tırnak açıklığı olacak, içinde başka
 * tırnak geçmeyecek, sonunda en fazla bir nokta olacak. "„X“ ve Murat'ın
 * sorusu …" gibi alıntıyla BAŞLAYIP Türkçe devam eden satırlar (34 tane)
 * geçiş sayılmıyor.
 *
 * BURADA duruyor, `data/skills/prose/make.ts`te değil: paketleyici ile
 * çözücü aynı ölçütü kullanmak ZORUNDA. Ayrı iki kopya olsaydı biri
 * daraldığında öteki dizeyi "yazılacak" sayar, sözlükte karşılığı olmaz ve
 * hep-ya-hiç kuralı bütün egzersizi Türkçeye düşürürdü — hiçbir yerde hata
 * görünmeden.
 */
export const isProseQuote = (t: string): boolean =>
  /^\s*[„"“']([^„"“”']+)[”“"']\s*\.?\s*$/.test(t);

/**
 * Beceri egzersizini öğrencinin diline çevirir; bir dize bile eksikse `null`.
 *
 * Hep-ya-hiç, kardeşleriyle aynı gerekçeyle: yarısı Türkçe yarısı İngilizce
 * bir egzersiz, tümü Türkçe olandan daha kötü — öğrenci hangi dilde
 * okuyacağını bilemiyor ve açıklamanın çevrilmemiş yarısı tam da anlamadığı
 * için okuduğu yer oluyor.
 *
 * Yalnız iki alan: `intro` ve `questions[].explain`. Soru kökü, şıklar ve
 * metnin kendisi ÖĞRENİLEN dilde — çevrilmemeli. `gloss` de burada yok:
 * `Gloss` tipinde `en` alanı zaten dolu (4.945/4.945) ve oynatıcılar onu
 * kendileri okuyor.
 */
export function resolveExercise<T extends ExerciseShape>(dict: NativeDict, ex: T): T | null {
  let failed = false;
  const t = (s: string): string => {
    if (!s.trim() || isProseQuote(s)) return s;
    const en = dict.prose[s];
    if (en === undefined) failed = true;
    return en ?? s;
  };

  const out = {
    ...ex,
    intro: t(ex.intro),
    ...(ex.questions ? { questions: ex.questions.map((q) => ({ ...q, explain: t(q.explain) })) } : {}),
  };
  return failed ? null : (out as T);
}

/**
 * `resolveExercise`in dokunduğu alanlar. `SkillExercise`ten ALMIYORUZ —
 * `ExamShape` ile aynı gerekçe: çözücü tarayıcıda da derleniyor, beceri
 * tipleri ise sunucu tarafının ağır ağacını çekiyor.
 */
export type ExerciseShape = {
  intro: string;
  questions?: { explain: string }[];
};
