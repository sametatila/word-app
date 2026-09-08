import type { Gloss } from "@/lib/skills/types";

/**
 * Deneme sınavı içerik modeli.
 *
 * NEDEN AYRI BİR MODEL. `lib/exam.ts` (modül/seviye sınavı) kâğıdı ders
 * içeriğinden ÜRETİYOR: kelime turu, dilbilgisi hücresi, üretim adımı. O sınav
 * Patika'nın türevi ve öğrencinin o modülde ne öğrendiğini ölçüyor. Deneme
 * sınavı bambaşka bir şey ölçüyor: öğrenci, hiç görmediği bir metinle karşı
 * karşıya kaldığında seviyesinin gerektirdiği işi yapabiliyor mu. Bu yüzden
 * maddeleri türetilemez — elle yazılır, kâğıt kendi başına durur.
 *
 * YAPI. Kâğıt dört bölümden oluşur (Lesen / Hören / Schreiben / Sprechen), her
 * bölüm birkaç GÖREVe (Teil) bölünür, her görevin bir ÖLÇÜM HEDEFİ (`goal`) ve
 * bir BİÇİMİ (`format`) vardır. Bu ikisi ayrı tutuluyor çünkü aynı biçim farklı
 * şey ölçebiliyor: üç şıklı bir soru bir görevde ana fikri, ötekinde tek bir
 * ayrıntıyı sorar ve bunlar farklı zorluktadır. Hedefi yazmak, kâğıdın neyi
 * ölçtüğünü kâğıdın kendisinde belgeliyor.
 *
 * MADDE = 1 PUAN. Nesnel maddelerin hepsi eşit değerde. Yazma ve konuşma
 * bölümleri makinece puanlanmıyor; ölçütleri ve örnek cevabı taşıyorlar,
 * puanlama ayrı (yazma için rubrik, konuşma için telaffuz).
 *
 * AÇIKLAMA ZORUNLU. Her maddede `explain` var: neden bu cevap, metnin
 * neresinde. Sınav sırasında gösterilmez, sonundaki dökümde okunur. Sadece puan
 * veren bir deneme sınavı öğretmez; yanlışın nerede olduğunu söyleyen öğretir.
 *
 * MARKA YOK. Kâğıtlar gerçek sınavların YAPISINA bakılarak yazıldı ama hiçbiri
 * bir kurumun sınavı değil, kopyası da değil. Metinler özgün. Hiçbir alanda
 * kurum ya da sınav markası geçmez — `scripts/check-mock-exams.ts` bunu
 * kâğıtların tamamında arar ve geçerse derlemeyi durdurur.
 */

export type MockLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type MockSkill = "reading" | "listening" | "writing" | "speaking";

/**
 * Görevin ölçüm hedefi — sınav literatüründeki "Prüfungsziel".
 *
 * Bir kâğıdın geçerli olması, bölümün hedeflerinin seviyenin tanımladığı
 * yapabilirliklere denk gelmesi demek. A1'de `opinion` (bir metinden yazarın
 * tutumunu çıkarmak) aranmaz, B2'de yalnız `detail` sormak da seviyeyi ölçmez.
 * Doğrulayıcı bölüm başına hedef çeşitliliğini bunun üzerinden denetliyor.
 */
export type MockGoal =
  /** Ana fikir, metnin bütünü — "Worum geht es?" */
  | "gist"
  /** Tek bir bilgi, seçici okuma/dinleme — sayı, saat, koşul. */
  | "detail"
  /** Yazarın/konuşanın tutumu, görüşü, ima ettiği. */
  | "opinion"
  /** Hangi ilan/duyuru kime uyar — yönlenme okuması. */
  | "orientation"
  /** Kural, yönerge, talimat: ne yapılmalı, ne yasak. */
  | "instruction"
  /** Dilbilgisel ve sözcüksel bağdaşıklık — boşluklu metin. */
  | "structure"
  /** Üretim: kendi metnini/konuşmanı kurma. */
  | "production"
  /** Etkileşim: karşı tarafa uygun biçimde yanıt verme, anlaşma. */
  | "interaction";

/**
 * Maddenin cevaplanma biçimi. `format` görevin TAMAMI için geçerli ve ekranın
 * nasıl çizileceğini söyler; `kind` tek maddenin nasıl cevaplandığını.
 */
export type MockFormat =
  /** Çoktan seçmeli — şık sayısı maddeden gelir (2, 3 ya da 4). */
  | "mcq"
  /** Richtig / Falsch. */
  | "truefalse"
  /** Ja / Nein — görüş metinlerinde "bu görüş metinde var mı" sorusu. */
  | "yesno"
  /**
   * Ortak şık bankasından eşleştirme. Varsayılan olarak her şık en fazla bir
   * kez kullanılır; `reuseOptions` açıksa aynı şık birden çok maddenin cevabı
   * olabilir (İngilizce sınavların çoklu eşleştirme görevlerinde soru sayısı
   * metin sayısını aşar).
   */
  | "match"
  /**
   * Metindeki boşluğa yazarak doldurma. İki ayrı görev tipi bu biçimi
   * paylaşıyor: boşluk başına tek sözcük yazılan `open cloze` (maddenin
   * `text`i boş) ve boşluğun yanında büyük harfli kök verilen kelime türetme
   * (kök `text`e yazılır). İkisi de aynı ekranı istiyor, ayrı bir biçim
   * eklemek karşılığı olmayan bir dallanma olurdu.
   */
  | "gap"
  /** Metindeki boşluğu şıklardan seçerek doldurma. */
  | "gapMcq"
  /**
   * Anahtar sözcükle cümle dönüştürme: verilen cümle, DEĞİŞTİRİLMEDEN
   * kullanılması gereken bir anahtar sözcük ve boşluklu ikinci bir cümle.
   *
   * Ayrı bir biçim çünkü ekranı `gap`ten farklı: maddenin metni yok, üç
   * parçası var (kaynak cümle, anahtar sözcük, hedef cümle) ve anahtar
   * sözcük vurgulu durmalı. Doğrulayıcı da bu biçimde fazladan bir şey
   * ölçüyor — anahtar sözcük her kabul edilen cevapta aynen geçmeli.
   */
  | "transform"
  /** Dinlerken not alma — kısa yazılı cevap. */
  | "notes"
  /**
   * Tek görevde birden çok madde tipi. Gerçek sınavların Hören bölümünde
   * yaygın: aynı kayıt için önce bir Richtig/Falsch, sonra üç şıklı bir soru
   * sorulur. Bu görevlerde biçimi madde belirler (`kind`), görev değil.
   */
  | "mixed"
  /** Serbest yazma görevi. */
  | "writing"
  /** Sözlü görev. */
  | "speaking";

/** Okunacak ya da dinlenecek malzeme. */
export type MockStimulus =
  | {
      kind: "text";
      /** Metnin kimliği — maddeler `ref` ile buna bağlanır. */
      id: string;
      /** Tür etiketi, Almanca: "E-Mail", "Zeitungsartikel", "Aushang"… */
      genre: string;
      /** Türün Türkçesi — yönerge şeridinde görünür. */
      genreTr: string;
      title?: string;
      /**
       * Metin. Paragraflar boş satırla ayrılır. Boşluk doldurma görevlerinde
       * boşluklar `{{n}}` ile işaretlenir; `n` maddenin `no` alanıdır.
       */
      body: string;
      /** Metnin kilit kelimeleri — sınavdan SONRA, dökümde gösterilir. */
      gloss?: Gloss[];
    }
  | {
      kind: "audio";
      id: string;
      genre: string;
      genreTr: string;
      title?: string;
      /** Durum, Türkçe: kaydı dinlemeden önce okunan tek cümle. */
      situation: string;
      /** Kaç kez dinletilir — gerçek sınavların ayrımı burada korunuyor. */
      plays: 1 | 2;
      /** Konuşmalar. Tek sesli metinde `speaker` boş kalır. */
      segments: { speaker?: string; text: string }[];
      gloss?: Gloss[];
    };

/** Eşleştirme görevinin ortak şık bankasındaki bir şık. */
export type MockOption = {
  /** Kâğıttaki harf: "a", "b", … Maddenin cevabı bu harftir. */
  key: string;
  /** Kısa etiket — ilan başlığı, kişi adı. */
  label: string;
  /** Uzun gövde (ilan metni). Varsa şık bir kart olarak çizilir. */
  body?: string;
};

type ItemBase = {
  /** Kalıcı kimlik — sonuç kaydı buna bağlanır, değiştirme. */
  id: string;
  /** Bölüm içindeki madde numarası (1 tabanlı, bölüm boyunca artar). */
  no: number;
  /** Hangi metne ait — birden çok metinli görevlerde. */
  ref?: string;
  /**
   * Neden bu cevap doğru, metnin neresinde — Türkçe. Sınav sırasında
   * gösterilmez. Yanlış şıkların neden yanlış olduğunu da söyler.
   */
  explain: string;
};

export type MockItem =
  | (ItemBase & {
      kind: "mcq";
      /** Soru kökü — Almanca. */
      text: string;
      options: string[];
      /** Doğru şıkkın dizini. */
      answer: number;
    })
  | (ItemBase & {
      kind: "bool";
      text: string;
      answer: boolean;
    })
  | (ItemBase & {
      kind: "match";
      /** Durum ya da kişi — neyin eşleştirileceği. */
      text: string;
      /** Doğru şıkkın `key` değeri. */
      answer: string;
    })
  | (ItemBase & {
      kind: "gap";
      /**
       * Boşluğun başlığı ya da soru kökü; boşluklu metinde boş kalabilir.
       * Kelime türetmede boşluğun kökü buraya büyük harfle yazılır ("ATTRACT").
       * `transform` biçiminde kaynak cümle ile hedef cümlenin ikisi birden
       * burada durur, aralarında satır sonu ile — oynatıcılar satır sonunu
       * koruyarak çiziyor.
       */
      text: string;
      /**
       * `transform` biçiminde: cevapta DEĞİŞTİRİLMEDEN geçmesi gereken
       * anahtar sözcük. Doğrulayıcı her kabul edilen cevapta arıyor.
       */
      cue?: string;
      /** Kabul edilen yazımlar; ilki kanonik cevap. */
      accept: string[];
    });

/** Yazma ve konuşma görevinin ölçütü. */
export type MockRubric = {
  /** Beklenen en az kelime sayısı (yazma). */
  minWords?: number;
  /** Beklenen süre, dakika (konuşma). */
  minutes?: number;
  /** İçerik noktaları — hepsi işlenmeli. */
  points: { de: string; tr: string }[];
  /** Örnek cevap — sınavdan sonra gösterilir. */
  sample: string;
  /** Nasıl değerlendirilir — Türkçe, öğrenci kendi metnini buna göre okur. */
  criteria: string[];
};

/**
 * Karşılıklı konuşmanın tek adımı.
 *
 * Dijital sınav oturumlarında konuşma bölümü fazlara ayrılır ve fazlar
 * kendiliğinden ilerler. Buradaki dizi aynı işi yapıyor: `partner` replikleri
 * sesle okunur (TTS), `you` adımlarında mikrofon açılır ve söylenen cihazın
 * tanıyıcısıyla yazıya çevrilir (STT). Yazıya çevrilen metin değerlendirmeye
 * gider; SES SUNUCUYA GİTMEZ.
 */
export type MockTurn =
  | {
      who: "partner";
      /** Karşı tarafın söylediği — Almanca, TTS bunu okur. */
      de: string;
      /** Türkçesi — ekranda altında durur, ses bittikten sonra okunabilir. */
      tr: string;
    }
  | {
      who: "you";
      /** Ne yapman isteniyor — Türkçe yönlendirme, konuşmadan önce görünür. */
      hint: string;
      /**
       * Beklenen İŞLEV — değerlendirmeye görev tanımı olarak gider
       * ("bir öneri sun ve gerekçelendir"). Beklenen CÜMLE değildir:
       * konuşmada tek doğru cümle yoktur.
       */
      expect: string;
      /** Konuşma için verilen süre (saniye). */
      seconds: number;
    };

export type MockTask = {
  /** Kalıcı kimlik: "de-a1-1-l1" gibi. */
  id: string;
  /** Teil numarası (1 tabanlı). */
  no: number;
  format: MockFormat;
  goal: MockGoal;
  /**
   * Görevin kendi süresi (dakika). Dijital sınav oturumlarında süre bölüm
   * değil GÖREV başına verilir ve süre dolunca bir sonraki göreve otomatik
   * geçilir. Verilmezse bölümün süresi iş yüküne göre bölünür — bkz.
   * `taskSeconds`.
   */
  minutes?: number;
  /** Konuşma görevinde hazırlık süresi (saniye) — düşünme fazı. */
  prepSeconds?: number;
  /** Konuşma görevinde konuşma süresi (saniye) — tek kişilik görevlerde. */
  speakSeconds?: number;
  /** Karşılıklı konuşma adımları; yalnız `speaking` görevlerinde. */
  exchange?: MockTurn[];
  /** Görev yönergesi — kâğıdın kendi dilinde (hedef dil). */
  prompt: string;
  /** Yönergenin Türkçesi. */
  promptTr: string;
  /** Okunacak/dinlenecek malzeme. Yazma ve konuşma görevlerinde boş olabilir. */
  texts?: MockStimulus[];
  /** `match` biçiminde ortak şık bankası. */
  options?: MockOption[];
  /**
   * Eşleştirmede aynı şık birden çok maddenin cevabı olabilir mi.
   *
   * Almanca sınavların eşleştirme görevlerinde her ilan/kişi en fazla bir kez
   * kullanılır ve şık sayısı madde sayısını aşar; kapalı olması bu yüzden
   * doğru varsayılan. İngilizce sınavların çoklu eşleştirmesi tersini yapıyor:
   * dört metne on soru sorulur ve her metin birkaç kez cevap olur. Bayrak
   * açıkken doğrulayıcı "her şık en fazla bir kez" ve "en az bir çeldirici"
   * kurallarını bırakır, yerine ölü şık ve tek şıkka yığılma arar.
   */
  reuseOptions?: boolean;
  items: MockItem[];
  rubric?: MockRubric;
};

export type MockPart = {
  skill: MockSkill;
  /** Bölümün süresi (dakika). */
  minutes: number;
  /** Bölüm yönergesi — kâğıdın kendi dilinde. */
  instruction: string;
  instructionTr: string;
  tasks: MockTask[];
};

/**
 * Kâğıdın kursu = HEDEF dil.
 *
 * `CourseId`den bilerek dar: Züritüütsch kursunun hedefi de Almanca ve aynı
 * Almanca kâğıtlara hazırlanır, dolayısıyla kendi kâğıdı yoktur. Kurs kimliği
 * yerine hedef dili tutmak, "gsw-zh kâğıdı nerede" sorusunu baştan siliyor.
 */
export type MockCourse = "de" | "en";

export type MockPaper = {
  /** "de-a1-01" — kurs, seviye, kaçıncı deneme. */
  id: string;
  course: MockCourse;
  level: MockLevel;
  /** Kaçıncı deneme. Ekrandaki ad çeviriden gelir, kâğıtta metin tutulmaz. */
  no: number;
  /** Kâğıdın teması — hedef dilde tek sözcük öbeği, listede alt satır. */
  theme: string;
  themeTr: string;
  /** Toplam süre (dakika) = bölümlerin toplamı. Doğrulayıcı denetler. */
  minutes: number;
  parts: MockPart[];
};

/** Geçme eşiği (yüzde) — bölüm başına ve toplamda. */
export const MOCK_PASS_PCT = 60;

/** Bölümlerin kâğıttaki sırası. */
export const MOCK_SKILL_ORDER: MockSkill[] = ["reading", "listening", "writing", "speaking"];

/**
 * Kâğıdın KENDİ dilindeki etiketler — bölüm adı ve doğru/yanlış düğmeleri.
 *
 * Arayüz sözlüğünden (i18n) gelmiyorlar, kâğıttan geliyorlar. Sebep: bunlar
 * arayüz metni değil SINAV metni. Almanca kâğıtta düğme "Richtig", İngilizce
 * kâğıtta "True" yazmalı; öğrencinin arayüz dili Türkçe de olsa İngilizce de
 * olsa bu değişmez. i18n'e konulduğunda üç sözlükte de Almanca sabitlenmişti
 * ve İngilizce kâğıt "Lesen / Richtig" diye açılırdı.
 */
export const MOCK_LABELS: Record<MockCourse, { skill: Record<MockSkill, string>; bool: [string, string]; yesno: [string, string] }> = {
  de: {
    skill: { reading: "Lesen", listening: "Hören", writing: "Schreiben", speaking: "Sprechen" },
    bool: ["Richtig", "Falsch"],
    yesno: ["Ja", "Nein"],
  },
  en: {
    skill: { reading: "Reading", listening: "Listening", writing: "Writing", speaking: "Speaking" },
    bool: ["True", "False"],
    yesno: ["Yes", "No"],
  },
};

/** Kâğıdın diline göre bölüm adı; bilinmeyen kurs Almancaya düşmez, açıkça seçilir. */
export function mockSkillLabel(course: MockCourse, skill: MockSkill): string {
  return MOCK_LABELS[course].skill[skill];
}

/** Görevin doğru/yanlış düğme etiketleri — biçime ve kâğıdın diline göre. */
export function mockBoolLabels(course: MockCourse, format: MockFormat): [string, string] {
  return format === "yesno" ? MOCK_LABELS[course].yesno : MOCK_LABELS[course].bool;
}

/** Nesnel puanlanan (makinece ölçülen) bölümler. */
export const MOCK_SCORED: MockSkill[] = ["reading", "listening"];

/** Görevin kaç madde taşıdığı — nesnel bölümlerde puan sayısı. */
export function taskPoints(task: MockTask): number {
  return task.format === "writing" || task.format === "speaking" ? 0 : task.items.length;
}

/** Bölümün toplam nesnel puanı. */
export function partPoints(part: MockPart): number {
  return part.tasks.reduce((a, t) => a + taskPoints(t), 0);
}

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Bir görevin kabaca kaç dakikalık iş olduğu — süre dağıtımının ağırlığı.
 *
 * Üç kalemden toplanıyor: metni okumak (dakikada ~120 kelime, ikinci dilde
 * gerçekçi bir hız), kaydı dinlemek (dakikada ~140 kelime, tekrar sayısıyla
 * çarpılı) ve maddeleri cevaplamak (madde başına yarım dakika). Yazma
 * görevinde beklenen kelime sayısı, konuşmada rubrikteki süre esas alınıyor.
 *
 * Kesin bir ölçüm değil, ORANTI kurmak için. Bölümün toplam süresi zaten
 * kâğıtta yazılı; buradaki iş onu görevler arasında adilce bölmek.
 *
 * DÖNÜŞTÜRME GÖREVİ AYRI SAYILIYOR. `transform` maddesinin okuyacak metni yok:
 * üç kalemin ikisi sıfır çıkıyor ve dört dönüşüm yetmiş dakikalık bir bölümde
 * üç buçuk dakika alıyordu. Oysa yapılan iş bir şık işaretlemek değil, cümleyi
 * baştan kurmak — gerçek sınavlar da bu göreve madde başına bir buçuk dakika
 * ayırıyor. Ek ağırlık yalnız bu biçime veriliyor; Almanca kâğıtlarda
 * `transform` görevi olmadığı için oradaki süre dağılımı değişmiyor.
 */
function workload(task: MockTask): number {
  let w = 0;
  if (task.format === "transform") w += task.items.length;
  for (const s of task.texts ?? []) {
    if (s.kind === "text") w += wordCount(s.body) / 120;
    else w += (s.segments.reduce((a, x) => a + wordCount(x.text), 0) / 140) * s.plays + 0.25;
  }
  for (const o of task.options ?? []) w += wordCount(`${o.label} ${o.body ?? ""}`) / 120;
  w += task.items.length * 0.5;
  if (task.format === "writing") w += (task.rubric?.minWords ?? 40) / 8;
  if (task.format === "speaking") w += task.rubric?.minutes ?? 3;
  return Math.max(w, 0.5);
}

/**
 * Bölümün görevlerine düşen süre (saniye), sırasıyla.
 *
 * Kâğıtta açık `minutes` varsa o kullanılır. Yoksa bölümün süresi iş yüküne
 * göre bölünür ve yuvarlama farkı son göreve yazılır — toplam her zaman
 * bölümün süresine eşit çıkar, yoksa oynatıcının saati kâğıtla çelişirdi.
 */
export function taskSeconds(part: MockPart): number[] {
  const total = part.minutes * 60;
  const explicit = part.tasks.map((t) => (t.minutes ? t.minutes * 60 : null));
  if (explicit.every((x) => x !== null)) return explicit as number[];

  const weights = part.tasks.map(workload);
  const sum = weights.reduce((a, x) => a + x, 0) || 1;
  const out = weights.map((w) => Math.max(60, Math.round((total * w) / sum)));
  const drift = total - out.reduce((a, x) => a + x, 0);
  out[out.length - 1] += drift;
  return out;
}
