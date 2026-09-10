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
  /**
   * BECERİ EGZERSİZLERİNİN GÖREV METNİ — yazma görevleri, söyleyiş
   * drilleri, monolog ve dil bilgisi anlatımı (`data/skills/task/out/`).
   *
   * Anahtar `tür + AYRAÇ + tr`, düz `tr` değil. Bir dize iki ayrı alanda
   * geçip FARKLI karşılık isteyebiliyor ve korpusta tam da bu bulundu:
   *
   *   explanation.examples.tr  "Saat altıda kalkıyorum."  Ich stehe um sechs Uhr auf.
   *   build.tr                 "Saat altıda kalkıyorum."  Ich stehe um sechs auf
   *
   * İkisi aynı Türkçeyi kullanıyor ama Almancaları farklı ("um sechs Uhr"
   * ile "um sechs"), o yüzden İngilizceleri de farklı. Düz anahtar birini
   * ötekinin üstüne yazardı — anlatım hattındaki `lectureSplit` ile aynı
   * gerekçe, aynı çözüm.
   */
  task: Record<string, string>;
  /**
   * DENEME KÂĞITLARININ Türkçe yüzü — 60 Almanca kâğıt, 6.627 dize
   * (`data/mock-exams/prose/out/`). Anahtar `tür + AYRAÇ + tr`.
   *
   * Neden ayrı bir sözlük: kâğıtlar `src/lib/mock-exams/` altında duruyor,
   * ne dersten ne egzersizden çıkıyor. Neden bileşik anahtar: ölçüldü —
   * yalnız dizeye bakılsa 6.626 girdi olurdu, yani bir Türkçe dize iki
   * türde iki ayrı şey anlatıyor ve düz anahtar birini sessizce yerdi.
   */
  mock: Record<string, string>;
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
 * SORU KÖKÜ / BAŞLIK ÖĞRENCİNİN DİLİNDE Mİ?
 *
 * Bu iki alan uzun süre "öğrenilen dilde" sayıldı ve çözücünün dışında
 * bırakıldı. Ölçüm bunun yalnız ÇOĞUNLUK için doğru olduğunu gösterdi:
 * 4.100 kökten 3.821'i düpedüz Almanca ("Woher kommt Frau Yılmaz?"), ama
 * 246'sı Türkçe ("Jonas'ın son cümlesini yaz.", "Sıfat ne zaman ek alır?").
 * O 246'sı İngilizce kursta Türkçe kalıyordu ve hiçbir kapı bunu görmüyordu,
 * çünkü çözücü bu alanlara hiç bakmıyordu.
 *
 * AYIRT ETMEK KOLAY DEĞİL, çünkü ikisi de karışıyor:
 *
 *   Sind Sie Frau Yılmaz?                 Almanca cümle + Türkçe ÖZEL AD
 *   „Wir haben ein Kinder.“ — Bu cümle doğru mu?   Almanca alıntı + Türkçe çerçeve
 *
 * Ölçüt: KÜÇÜK HARFLE başlayan bir Türkçe işareti var mı. Özel adlar
 * (Yılmaz, Aydın, Yıldız) büyük harfli olduğu için dizeyi Türkçe yapmıyor;
 * çerçeve cümlesindeki `doğru`, `cümlesini`, `mi` ise küçük harfli.
 * Ölçüldü: Almanca işlev sözcüğü ile Türkçe harfi birlikte taşıyan 54
 * dizenin 48'i çerçeve, 6'sı özel ad — ölçüt 54'ünü de doğru ayırıyor.
 *
 * BURADA duruyor, paketleyicide değil: `isProseQuote` ile aynı gerekçe.
 * İki kopya ayrışırsa biri dizeyi "yazılacak" sayar, sözlükte karşılığı
 * olmaz ve hep-ya-hiç kuralı bütün egzersizi Türkçeye düşürür.
 */
const TR_WORD =
  /^(?:bir|ve|ile|için|değil|var|yok|gibi|daha|çok|ama|kadar|sonra|önce|mi|mı|mu|mü|ne|nasıl|hangi|neden|nedir|bu|şu|yani|hem|ancak|yaz|söyle|koy|seç|nerede)$/u;
/** Kesme işaretiyle bağlanan Türkçe ek: `Jonas'ın`, `Timo'nun`. */
const TR_SUFFIX =
  /['’](?:de|da|te|ta|den|dan|ten|tan|ye|ya|yi|yı|yu|yü|nin|nın|nun|nün|in|ın|un|ün|le|la|dir|dır|e|a|i|ı|u|ü)$/u;
export const isTurkishStem = (t: string): boolean =>
  t
    .split(/[^\p{L}'’]+/u)
    .filter(Boolean)
    .some((w) => !/^\p{Lu}/u.test(w) && (/[ışğ]/.test(w) || TR_WORD.test(w) || TR_SUFFIX.test(w)));

/**
 * ŞIKLARIN BİRİMİ SORU, dize değil.
 *
 * `isTurkishStem` tek tek şıklarda yetmiyor, çünkü Türkçe bir şık hiçbir
 * işaret taşımayabiliyor: "Afiyet olsun!" ve "Neyi unuttunuz?" içinde ne
 * ı/ş/ğ var ne de listedeki bir sözcük. İkisi de "„Gute Besserung!“ ne
 * demek?" sorusunun şıkları ve kardeşleri (`Görüşürüz!`, `Geçmiş olsun!`)
 * yakalanıyordu — biri çevrilip öteki kalsaydı, hattın önlemeye çalıştığı
 * yarım çevirinin tam ortası olurdu.
 *
 * Ölçüt ŞIK KÜMESİ, tek tek şık değil: kaynak bir sorunun şıklarını tek
 * dilde yazıyor. Tek tek bakmak iki yönden de yanılıyordu — "Afiyet
 * olsun!" hiçbir Türkçe işareti taşımadığı için düşüyor, "sofort
 * auflegen" ve "Liebe Grüße" ise listede olmayan Almanca sözcüklerden
 * ötürü Türkçe sanılıyordu.
 *
 * İki koşuldan biri yetiyor: Türkçe işaretli şık Almanca işaretliden
 * çoksa, YA DA kök Türkçeyken hiçbir şık Almanca işareti taşımıyorsa.
 * İkincisi "Afiyet olsun! · Görüşürüz! · Geçmiş olsun!" gibi hepsi büyük
 * harfle başlayan kümeler için gerekli; birincisi ise Türkçe kökün
 * ALMANCA şıklarını dışarıda tutuyor — doğru/yanlış sorularında
 * `Richtig`/`Falsch`, dinlemede `mit dem Zug`.
 */
const DE_WORD =
  /(?<!\p{L})(?:was|wer|wie|wo|wann|warum|welche[rsnm]?|wohin|woher|ist|sind|war|hat|haben|wird|werden|kann|können|soll|sollen|muss|müssen|darf|möchte|gibt|der|die|das|den|dem|des|ein|eine|einen|einem|eines|und|oder|nicht|kein|keine|mit|für|von|zu|im|am|auf|bei|nach|vor|über|sie|er|es|man|ihr|sich|beim|zum|zur|nur|noch|schon|sehr|gut|dann|dort|hier)(?!\p{L})/iu;
/** Tek başına duran büyük harfli bir sözcük Almanca sayılıyor: `Richtig`. */
const looksGerman = (t: string): boolean => {
  const words = t.split(/[^\p{L}'’]+/u).filter(Boolean);
  if (DE_WORD.test(t)) return true;
  return words.length === 1 && /^\p{Lu}/u.test(words[0]) && !/[ışğİĞŞ]/.test(words[0]);
};
export const hasTurkishOptions = (q: { text?: string; options?: string[] }): boolean => {
  const opts = (q.options ?? []).filter((o) => typeof o === "string" && o.trim());
  if (!opts.length) return false;
  const tr = opts.filter(isTurkishStem).length;
  const de = opts.filter(looksGerman).length;
  return tr > de || (de === 0 && typeof q.text === "string" && isTurkishStem(q.text));
};
export const isTurkishOption = (
  q: { text?: string; options?: string[] },
  option: string,
): boolean => Boolean(option.trim()) && hasTurkishOptions(q);

/**
 * Beceri egzersizini öğrencinin diline çevirir; bir dize bile eksikse `null`.
 *
 * Hep-ya-hiç, kardeşleriyle aynı gerekçeyle: yarısı Türkçe yarısı İngilizce
 * bir egzersiz, tümü Türkçe olandan daha kötü — öğrenci hangi dilde
 * okuyacağını bilemiyor ve açıklamanın çevrilmemiş yarısı tam da anlamadığı
 * için okuduğu yer oluyor.
 *
 * Düz metin iki alan: `intro` ve `questions[].explain`. Soru kökü, şıklar,
 * metnin kendisi ve Almanca uyaranlar (`stimulus`, `sample`, `source`)
 * ÖĞRENİLEN dilde — çevrilmemeli.
 *
 * SÖZLÜKÇE ÇEVRİLMİYOR, KATLANIYOR. `Gloss` tipinde `en` alanı zaten dolu
 * (3.577/3.577) ama oynatıcı ikisini birden çiziyor: kalın Almanca, yanında
 * TÜRKÇE karşılık, altında soluk İngilizce. İngilizce konuşan biri için bu
 * ters — asıl satır dipnotta, anlamadığı dil önde. Katlama `tr`yi `en` ile
 * değiştirip `en`i düşürüyor; ekranda "Wohnung · flat" kalıyor, satır
 * sayısı da azalıyor. Aynısı yazma görevlerinin `phrases` alanına da
 * uygulanıyor (o da `Gloss`).
 *
 * `note` katlanamıyor — Türkçe ve `Gloss`ta İngilizcesi yok; sözlükten
 * geliyor (`kind: "note"`, on bir madde). Çevrilmemiş bir not, kelimenin
 * hemen altında duran Türkçe bir cümledir ve yarım çevirinin en görünür
 * hâlidir; o yüzden hep-ya-hiç kuralına dahil.
 */
export function resolveExercise<T extends ExerciseShape>(dict: NativeDict, ex: T): T | null {
  let failed = false;
  const t = (s: string): string => {
    if (!s.trim() || isProseQuote(s)) return s;
    const en = dict.prose[s];
    if (en === undefined) failed = true;
    return en ?? s;
  };

  /* `tasks` YAPISAL TİPTE DEĞİL, burada okunuyor. `WritingTask` bir birlik
     ve kollarının çoğunda `phrases` yok; `{ phrases?: … }` zayıf tip olduğu
     için TypeScript "ortak alanı yok" diyip `SkillExercise`i şekle
     uydurmuyordu. Alanı şekilden çıkarıp burada okumak, şekli de dürüst
     tutuyor: çözücünün SÖZ VERDİĞİ alanlar `intro`, `questions` ve `gloss`. */
  const tasks = (ex as { tasks?: TaskShape[] }).tasks;

  /**
   * Görev nesnesinin çevrilen alanları. TÜR AYRIMI `kind` alanından
   * geliyor; söyleyiş drilinin `kind`ı YOK (konuşma egzersizinin görevleri
   * tek biçimde) ve o yüzden `drill` sayılıyor — paketleyici de aynı
   * ayrımı yapıyor.
   */
  const task = (x: TaskShape): TaskShape => {
    const kind = typeof x.kind === "string" ? x.kind : "drill";
    const out: TaskShape = { ...x };
    if (x.phrases) out.phrases = x.phrases.map(fold);
    if (x.stimulus !== undefined) out.stimulus = stem("task.stimulus", x.stimulus);
    if (x.source !== undefined) out.source = stem("task.source", x.source);
    if (kind === "drill") {
      out.tr = k("drill.tr", x.tr);
      out.hint = k("drill.hint", x.hint);
      if (x.confusions) out.confusions = x.confusions.map((c) => ({ ...c, fix: k("drill.fix", c.fix) }));
      return out;
    }
    if (kind === "build") {
      out.tr = k("build.tr", x.tr);
      out.hint = k("build.hint", x.hint);
      return out;
    }
    if (kind === "form") {
      out.prompt = k("form.prompt", x.prompt);
      out.facts = k("form.facts", x.facts);
      return out;
    }
    if (kind === "rewrite") {
      out.prompt = k("rewrite.prompt", x.prompt);
      out.why = k("rewrite.why", x.why);
      return out;
    }
    if (kind === "reply" || kind === "free") {
      out.prompt = k(`${kind}.prompt`, x.prompt);
      if (x.checklist) out.checklist = x.checklist.map((c) => k(`${kind}.checklist`, c) ?? c);
      return out;
    }
    /* `sentence` ve `summary` türlerinin Türkçe alanı çıkarıcıda YOK:
       `sentence.prompt` isteğe bağlı ve korpusta hiç dolmamış, `summary`
       ise yalnız Almanca metin taşıyor. Sessizce geçiyorlar. */
    return out;
  };

  /* GÖREV METNİ: anahtar `tür + AYRAÇ + tr`. Alanın hangi türe ait olduğunu
     çağıran biliyor, sözlük bilmiyor — o yüzden tür burada veriliyor. */
  const k = (kind: string, s: string | undefined): string | undefined => {
    if (typeof s !== "string" || !s.trim()) return s;
    const en = dict.task[kind + SEP + s];
    if (en === undefined) failed = true;
    return en ?? s;
  };

  /**
   * Soru kökü ve başlık: yalnız TÜRKÇE olanlar çevriliyor. Almanca kök
   * (4.100'ün 3.821'i) öğrenilen dilde ve olduğu gibi kalıyor; `k`ye
   * verilseydi sözlükte karşılığı olmadığı için her egzersiz düşerdi.
   */
  const stem = (kind: string, s: string | undefined): string | undefined =>
    typeof s === "string" && isTurkishStem(s) ? k(kind, s) : s;

  const fold = <G extends GlossShape>(g: G): G => {
    if (!g.en?.trim()) failed = true;
    return { ...g, tr: g.en ?? g.tr, en: undefined, ...(g.note ? { note: t(g.note) } : {}) };
  };

  /* Dil bilgisi anlatımı ve monolog da yapısal tipin dışında okunuyor —
     `tasks` ile aynı gerekçe: ikisi de yalnız bir egzersiz türünde var. */
  const wide = ex as unknown as {
    focus?: string;
    explanation?: { heading?: string; tr?: string; examples?: { tr?: string; note?: string }[] }[];
    monologue?: {
      promptTr?: string;
      rubricHint?: string;
      bulletsTr?: string[];
      targets?: { tr?: string }[];
    };
  };

  const out = {
    ...ex,
    intro: t(ex.intro),
    ...(ex.title !== undefined ? { title: stem("title", ex.title) } : {}),
    ...(ex.questions
      ? {
          questions: ex.questions.map((q) => ({
            ...q,
            explain: t(q.explain),
            ...(q.text !== undefined ? { text: stem("question.text", q.text) } : {}),
            ...(q.options
              ? {
                  options: q.options.map((o) =>
                    isTurkishOption(q, o) ? (k("question.option", o) as string) : o,
                  ),
                }
              : {}),
          })),
        }
      : {}),
    ...(ex.gloss ? { gloss: ex.gloss.map(fold) } : {}),
    ...(wide.focus ? { focus: k("focus", wide.focus) } : {}),
    ...(wide.explanation
      ? {
          explanation: wide.explanation.map((b) => ({
            ...b,
            heading: k("explanation.heading", b.heading),
            tr: k("explanation.tr", b.tr),
            ...(b.examples
              ? {
                  examples: b.examples.map((x) => ({
                    ...x,
                    tr: k("explanation.examples.tr", x.tr),
                    note: k("explanation.examples.note", x.note),
                  })),
                }
              : {}),
          })),
        }
      : {}),
    ...(wide.monologue
      ? {
          monologue: {
            ...wide.monologue,
            promptTr: k("monologue.promptTr", wide.monologue.promptTr),
            rubricHint: k("monologue.rubricHint", wide.monologue.rubricHint),
            ...(wide.monologue.bulletsTr
              ? { bulletsTr: wide.monologue.bulletsTr.map((b) => k("monologue.bulletsTr", b)) }
              : {}),
            ...(wide.monologue.targets
              ? {
                  targets: wide.monologue.targets.map((x) => ({
                    ...x,
                    tr: k("monologue.targets.tr", x.tr),
                  })),
                }
              : {}),
          },
        }
      : {}),
    ...(tasks ? { tasks: tasks.map(task) } : {}),
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
  /** Başlık: çoğu Almanca, 53'ü Türkçe — ayrımı `isTurkishStem` yapıyor. */
  title?: string;
  /**
   * `text` soru kökü, `options` şıklar; Almanca olanlar `isTurkishStem`le
   * eleniyor. Şıkların 5.590'ından yalnız 15'i Türkçe (altı kök) ama
   * onlar da hep-ya-hiç kuralına dahil: Türkçe kalmış bir şık, kökü
   * çevrilmiş bir sorunun altında en görünür yarım çeviridir.
   */
  questions?: { explain: string; text?: string; options?: string[] }[];
  gloss?: GlossShape[];
};

/** `Gloss`un katlamayı ilgilendiren üç alanı. */
export type GlossShape = { tr: string; en?: string; note?: string };

/** `resolveExercise`in bir görev nesnesinde dokunduğu alanlar. */
export type TaskShape = {
  kind?: string;
  tr?: string;
  hint?: string;
  prompt?: string;
  facts?: string;
  why?: string;
  /**
   * İkisi de ÇOĞUNLUKLA Almanca ve öyle kalıyor: `stimulus` öğrencinin
   * okuduğu metin (43), `source` yeniden yazacağı cümle (189). Ama bir
   * azınlık Türkçe — 21 brifing bloğu ("DURUM: … ELİNDEKİ VERİ: …") ve
   * A1'de Almancaya çevrilecek tek bir Türkçe cümle. Ayrımı yine
   * `isTurkishStem` yapıyor.
   */
  stimulus?: string;
  source?: string;
  checklist?: string[];
  phrases?: GlossShape[];
  confusions?: { fix?: string }[];
};
