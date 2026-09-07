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
  /** Ortak şık bankasından eşleştirme; her şık en fazla bir kez kullanılır. */
  | "match"
  /** Metindeki boşluğa yazarak doldurma. */
  | "gap"
  /** Metindeki boşluğu şıklardan seçerek doldurma. */
  | "gapMcq"
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
      /** Boşluğun başlığı ya da soru kökü; boşluklu metinde boş kalabilir. */
      text: string;
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

export type MockTask = {
  /** Kalıcı kimlik: "de-a1-1-l1" gibi. */
  id: string;
  /** Teil numarası (1 tabanlı). */
  no: number;
  format: MockFormat;
  goal: MockGoal;
  /** Görev yönergesi — Almanca, kâğıdın kendi dili. */
  prompt: string;
  /** Yönergenin Türkçesi. */
  promptTr: string;
  /** Okunacak/dinlenecek malzeme. Yazma ve konuşma görevlerinde boş olabilir. */
  texts?: MockStimulus[];
  /** `match` biçiminde ortak şık bankası. */
  options?: MockOption[];
  items: MockItem[];
  rubric?: MockRubric;
};

export type MockPart = {
  skill: MockSkill;
  /** Bölümün süresi (dakika). */
  minutes: number;
  /** Bölüm yönergesi — Almanca. */
  instruction: string;
  instructionTr: string;
  tasks: MockTask[];
};

export type MockPaper = {
  /** "de-a1-1" — kurs, seviye, kaçıncı deneme. */
  id: string;
  course: "de";
  level: MockLevel;
  /** Kaçıncı deneme. Ekrandaki ad çeviriden gelir, kâğıtta metin tutulmaz. */
  no: number;
  /** Kâğıdın teması — Almanca tek sözcük öbeği, listede alt satır. */
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

/** Bölüm adı, Almanca — kâğıdın dili. */
export const MOCK_SKILL_DE: Record<MockSkill, string> = {
  reading: "Lesen",
  listening: "Hören",
  writing: "Schreiben",
  speaking: "Sprechen",
};

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
