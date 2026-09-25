import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * A1'de okuma, dinleme ve yazma hücreleri mobil partisiyle zaten ONUN
 * üstünde; bu partiler yalnız KONUŞMA ve DİL BİLGİSİ hücrelerini ona
 * tamamlıyor. Kurs İngilizce olduğu için `de` alanı hedef dil metnini
 * taşır ve sözlükçede `en` aranmaz.
 */
export const enA1P6: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s6",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "street, school, spring",
    genre: "pronounce",
    intro: "İngilizce kelimeler iki üç sessizle başlayabilir; araya ünlü koymadan söylemek alıştırma ister.",
    gloss: [
      { de: "street", tr: "cadde" },
      { de: "school", tr: "okul" },
      { de: "spring", tr: "ilkbahar" },
      { de: "to spell", tr: "harf harf söylemek" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "The school is on this street.",
        tr: "Okul bu caddede.",
        hint: "„school“ SK ile, „street“ STR ile başlar. Baştaki sessizler tek nefeste çıkar, araya ünlü girmez.",
        confusions: [
          { heard: ["is cool"], fix: "Kelimenin başına i sesi ekleme; s doğrudan sonraki sessize bağlanır.", expected: "street" },
        ],
      },
      {
        de: "Spring starts in March.",
        tr: "İlkbahar martta başlıyor.",
        hint: "„spring“ üç sessizle başlar: s-p-r. Üçü de duyulur ama aralarında ünlü yoktur.",
        confusions: [
          { heard: ["is spring"], fix: "Üç sessiz arka arkaya gelir; hiçbiri atlanmaz ve araya ses girmez.", expected: "spring" },
        ],
      },
      {
        de: "Can you spell your name?",
        tr: "Adını harf harf söyleyebilir misin?",
        hint: "„spell“ SP ile başlar: SPEL. Türkçede böyle bir başlangıç yok, bu yüzden dil hazırlanmalı.",
        confusions: [
          { heard: ["is spell"], fix: "Dudaklar p için hazırken s zaten çıkmış olmalı.", expected: "spell" },
        ],
      },
      {
        de: "The train is slow today.",
        tr: "Tren bugün yavaş.",
        hint: "„train“ TR ile, „slow“ SL ile başlar. İkisi de tek hecedir, iki heceye bölünmez.",
        confusions: [
          { heard: ["terrain", "silo"], fix: "TR ve SL birer küme; araya ünlü koymak heceyi ikiye böler.", expected: "train" },
        ],
      },
      {
        de: "She's a strong student.",
        tr: "O iyi bir öğrenci.",
        hint: "„strong“ üç sessizle başlar: s-t-r. „student“ ise s-t-y. Zor olan kümeyi yavaş başlayıp hızlandır.",
        confusions: [
          { heard: ["is strong"], fix: "Önce yavaş söyle, sonra hızlandır; ünlü eklemeden.", expected: "strong" },
        ],
      },
      {
        de: "Please speak slowly.",
        tr: "Lütfen yavaş konuş.",
        hint: "„speak“ ve „slowly“ aynı s ile başlar ama devamı farklıdır: SPİİK, SLOU-li.",
        confusions: [
          { heard: ["is speak"], fix: "İki kelimede de s doğrudan sonraki sessize bağlanır.", expected: "speak" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g6",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "have got, my and Ali's",
    genre: "grammar",
    intro: "Bir şeyin kime ait olduğunu üç ayrı yolla söyleyebilirsin; hangisinin nerede kullanıldığını öğren.",
    focus: "have got, iyelik sıfatları ve isimlerde 's",
    gloss: [
      { de: "brother", tr: "erkek kardeş" },
      { de: "car", tr: "araba" },
      { de: "keys", tr: "anahtarlar" },
      { de: "apartment", tr: "daire" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "have got: sahip olmak",
        tr: "İngilizcede sahip olmayı söylemenin iki yolu vardır: „I have a car“ ve „I have got a car“. İkisi de doğrudur; Amerikan İngilizcesinde en yaygını düz „have“dir, „have got“ ise daha çok günlük konuşmada ve kısaltılarak kullanılır: I've got, she's got. Üçüncü tekil kişide „has got“ olur.",
        examples: [
          { de: "I've got two brothers.", tr: "İki erkek kardeşim var.", note: "I have got → I've got" },
          { de: "She's got a new apartment.", tr: "Yeni bir dairesi var.", note: "she has got → she's got" },
          { de: "Have you got a car?", tr: "Araban var mı?", note: "soruda have başa geçer" },
        ],
      },
      {
        heading: "Olumsuz ve soru",
        tr: "„have got“ yapısında yardımcı fiil zaten „have“dir, bu yüzden „do/does“ KULLANILMAZ: „Have you got …?“, „I haven't got …“. Ama düz „have“ ile kurarsan „do/does“ gerekir: „Do you have a car?“ İki yapıyı karıştırmak en sık yapılan hatadır.",
        examples: [
          { de: "I haven't got any money.", tr: "Hiç param yok.", note: "haven't got" },
          { de: "Do you have a bike?", tr: "Bisikletin var mı?", note: "düz have → do" },
          { de: "He hasn't got a phone.", tr: "Telefonu yok.", note: "hasn't got" },
        ],
      },
      {
        heading: "my, your ve Ali's",
        tr: "Kişi zamiri iyelik sıfatına dönüşür: I → my, you → your, he → his, she → her, we → our, they → their. Bir İSİM sahip oluyorsa sonuna 's eklenir: „Ali's car“, „my brother's apartment“. -s ile biten çoğul isimlerde yalnız kesme işareti eklenir: „my parents' house“.",
        examples: [
          { de: "This is my brother's car.", tr: "Bu, erkek kardeşimin arabası.", note: "isim + 's" },
          { de: "Their keys are on the table.", tr: "Anahtarları masanın üstünde.", note: "they → their" },
          { de: "Is this your apartment?", tr: "Bu senin dairen mi?", note: "you → your" },
        ],
      },
    ],
    questions: [
      {
        text: "___ you got a car?",
        options: ["Do", "Have", "Are"],
        answer: 1,
        explain: "„have got“ yapısında yardımcı fiil have'dir; do kullanılmaz.",
      },
      {
        text: "She ___ got a new apartment.",
        options: ["have", "has", "is"],
        answer: 1,
        explain: "Üçüncü tekil kişide „has got“ gelir.",
      },
      {
        text: "This is ___ car.",
        options: ["my brother", "my brothers", "my brother's"],
        answer: 2,
        explain: "Sahip bir isimse sonuna 's eklenir.",
      },
      {
        kind: "gapfill",
        text: "I ___ got any money. (have + not)",
        options: [],
        answer: 0,
        accept: ["haven't", "have not"],
        explain: "„have got“ olumsuzu haven't got'tur.",
      },
      {
        kind: "gapfill",
        text: "___ keys are on the table. (they)",
        options: [],
        answer: 0,
        accept: ["Their", "their"],
        explain: "„they“ iyelik sıfatı olarak their olur.",
      },
      {
        kind: "gapfill",
        text: "___ you have a bike? (düz have ile soru)",
        options: [],
        answer: 0,
        accept: ["Do", "do"],
        explain: "„got“ yoksa yardımcı fiil do gerekir.",
      },
      {
        kind: "gapfill",
        text: "He ___ got a phone. (have + not)",
        options: [],
        answer: 0,
        accept: ["hasn't", "has not"],
        explain: "Üçüncü tekil kişinin olumsuzu hasn't got'tur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I've", "got", "two", "brothers"],
        explain: "Özne + have got + nesne: I've got two brothers.",
      },
      {
        kind: "truefalse",
        text: "„Do you have got a car?“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "İki yardımcı fiil bir arada olmaz: ya „Do you have …?“ ya „Have you got …?“",
      },
      {
        kind: "truefalse",
        text: "„This is my brother's car.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Sahip bir isim olduğu için 's eklenmiş.",
      },
    ],
  },
];
