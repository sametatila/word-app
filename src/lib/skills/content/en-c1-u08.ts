import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 8 — "Sözleşmeyi bir arada tutmak, kararda alay yoktur,
 * konuşulan ve yazılan, görüşmeyi yönetmek".
 *
 * Dört ders: Holding a contract together · No irony in a ruling ·
 * Spoken and written · Managing the conversation.
 *
 *   Kelime: declaration of commitment, hardship case, federal office,
 *           registry, lucrative, thrifty, cyclical, colloquial language,
 *           feel for language, emphatically, empty phrase, haltingly,
 *           accent-free, expressive power, streamline, circumvent,
 *           quick wit, speaking inhibition, pay homage, become entrenched.
 *   Kalıp:  This alone binds the declaration of commitment. ·
 *           Such a hardship case is rare. ·
 *           The latter falls to the federal office. ·
 *           Not exactly lucrative, is it? ·
 *           I wouldn't call that thrifty. ·
 *           Hardly cyclical, is it? ·
 *           In colloquial language the same line lands differently. ·
 *           A feel for language tells you which register fits. ·
 *           Said emphatically, an empty phrase sounds like a claim. ·
 *           To streamline a talk is not to circumvent a question. ·
 *           A quick wit cannot cure a speaking inhibition. ·
 *           What we pay homage to tends to become entrenched.
 *
 * Ünitenin tek öğretme noktası SORU EKİ. İngilizce onu her seferinde
 * yeniden HESAPLIYOR: hangi yardımcı fiil, cümle artı mı eksi mi, özne
 * hangi adıla iniyor. Komşu dil ise değişmez tek bir sözcük koyuyor
 * („oder?“) ve hiç hesap yapmıyor. Hesabın bedeli var ama karşılığı da
 * var: ek, cümlenin GİZLİ KUTBUNU açığa çıkaran tek görünür kanıt —
 * „Hardly cyclical, is it?“ içinde „not“ yokken ek artı kalıyor, çünkü
 * „hardly“ cümleyi çoktan olumsuz saymış. Almancanın böyle bir testi yok.
 * İkinci ölçü: ekin bir TABANI var — konuşmada her yerde, kararda ya da
 * raporda hiç. Yazı aynı işi başka yoldan görmek zorunda, ünite 3'teki
 * eksiltili söyleyiş de o yüzden yazının aracı.
 */
export const enC1U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u08-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 8,
    title: "No irony in a ruling",
    genre: "info",
    intro: "İki sözcüklük ek, üç ayrı karar. Ek neyi açığa çıkarıyor?",
    gloss: [
      { de: "poor", tr: "zayıf" },
      { de: "units", tr: "üniteler" },
      { de: "pronoun", tr: "adıl" },
      { de: "whole", tr: "bütün" },
      { de: "seldom", tr: "nadiren" },
      { de: "barely", tr: "ancak" },
      { de: "behaviour", tr: "davranış" },
      { de: "whatever", tr: "her ne" },
      { de: "belongs", tr: "ait" },
      { de: "appears", tr: "beliriyor" },
      { de: "a move", tr: "hamle" },
      { de: "understatement", tr: "eksiltili söyleyiş" },
      { de: "a tag", tr: "ek" },
      { de: "computes", tr: "hesaplıyor" },
      { de: "fresh", tr: "yeniden" },
      { de: "an auxiliary", tr: "yardımcı fiil" },
      { de: "counts", tr: "sayıyor" },
      { de: "reduces", tr: "iniyor" },
      { de: "a dictionary", tr: "sözlük" },
      { de: "positive", tr: "artı" },
      { de: "correct it", tr: "düzeltmek" },
      { de: "visible proof", tr: "görünür kanıt" },
      { de: "a test", tr: "test" },
      { de: "behave", tr: "davranıyor" },
      { de: "invariant", tr: "değişmez" },
      { de: "underneath", tr: "altta" },
      { de: "out loud", tr: "yüksek sesle" },
      { de: "a room", tr: "oda" },
      { de: "a face", tr: "yüz" },
      { de: "agree", tr: "katılmak" },
      { de: "a floor", tr: "taban" },
      { de: "a ruling", tr: "karar" },
      { de: "a clause", tr: "yan cümle" },
      { de: "slower", tr: "daha yavaş" },
    ],
    minutes: 12,
    text:
      "Not exactly lucrative, is it? Two moves in five words, and only one of them is taught in most books.\n" +
      "The first move is the understatement: „not exactly lucrative“ in place of „poor“, which this level met a few units ago. The second is the tag, and the tag is the harder one, because English computes it fresh every time.\n" +
      "Look at what has to be settled before those two words can be written. Which auxiliary the sentence is using. Whether the sentence counts as positive or negative. Which pronoun the subject reduces to. Get any of the three wrong and the line stops sounding like English, even though nothing in it is a mistake a dictionary could find.\n" +
      "Now the sentence that shows why any of this matters. Hardly cyclical, is it? The tag is positive, and a reader who has learned „positive sentence, negative tag“ will want to correct it. They should not. „Hardly“ has already made the sentence negative, and the tag is the only visible proof that English counts it that way.\n" +
      "That is the useful part of the whole shape. The tag is a test the language runs on its own sentence. Words such as „hardly“, „seldom“, „barely“ and „few“ carry no „not“ in them and behave as though they did, and the tag is where that behaviour becomes visible.\n" +
      "A neighbouring language has no such test. It posts one small invariant word at the end, always the same word whatever the sentence did, and the question of whether the sentence was negative underneath is never asked out loud.\n" +
      "Which brings us to the third line. I wouldn't call that thrifty. No tag at all here, and that is not an accident: this one belongs to writing. A tag needs a room and a face and somebody in it to agree with.\n" +
      "So the shape has a floor. In speech it is everywhere; in a ruling or a report it never appears once, and a written text that reaches for it has changed what it is. The written language has to get the same work done another way — a clause added at the end, or an understatement left standing on its own, which is slower and asks nobody for anything.",
    questions: [
      {
        text: "Why is the tag the harder move?",
        options: ["English computes it fresh", "it is longer", "it is rare"],
        answer: 0,
        explain: "„the tag is the harder one, because English computes it fresh every time.“",
      },
      {
        text: "What has already made that sentence negative?",
        options: ["„hardly“", "the tag", "the subject"],
        answer: 0,
        explain: "„„Hardly“ has already made the sentence negative…“",
      },
      {
        kind: "truefalse",
        text: "A tag appears now and then in a ruling.",
        options: ["True", "False"],
        answer: 1,
        explain: "„in a ruling or a report it never appears once…“",
      },
      {
        kind: "gapfill",
        text: "Hardly cyclical, ___ it?",
        options: [],
        answer: 0,
        accept: ["is"],
        explain: "„Hardly cyclical, is it?“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Not exactly lucrative, is it?",
          "Hardly cyclical, is it?",
          "I wouldn't call that thrifty.",
          "The shape has a floor.",
        ],
        explain: "Eksiltili söyleyiş, gizli kutup, yazılı biçim; en sonda ölçü.",
      },
      {
        kind: "short_answer",
        text: "What does a tag need?",
        options: [],
        answer: 0,
        accept: ["a room", "a face", "somebody to agree with"],
        explain: "„A tag needs a room and a face and somebody in it to agree with.“",
      },
    ],
  },
  {
    id: "en-c1-u08-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 8,
    title: "Spoken and written",
    genre: "opinion",
    intro: "Aynı satır iki dil düzeyinde. Hangi kusur bağışlanıyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "trouble", tr: "sıkıntı" },
      { de: "knowledge", tr: "bilgi" },
      { de: "merely", tr: "yalnızca" },
      { de: "assumed", tr: "varsaydı" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "neutral", tr: "yansız" },
      { de: "halting", tr: "kesik kesik" },
      { de: "lands", tr: "düşüyor" },
      { de: "in advance", tr: "önceden" },
      { de: "unhelpful", tr: "işe yaramaz" },
      { de: "a rule", tr: "kural" },
      { de: "a choice", tr: "seçim" },
      { de: "holding still", tr: "kımıldamadan durmak" },
      { de: "the delivery", tr: "söyleyiş" },
      { de: "furniture", tr: "mobilya" },
      { de: "disagree", tr: "karşı çıkmak" },
      { de: "dangerous", tr: "tehlikeli" },
      { de: "forgiven", tr: "bağışlanan" },
      { de: "on purpose", tr: "bile bile" },
      { de: "the control", tr: "denetim" },
      { de: "the gap", tr: "aralık" },
      { de: "the damage", tr: "zarar" },
      { de: "the stress", tr: "vurgu" },
      { de: "points backwards", tr: "geriye işaret ediyor" },
      { de: "a description", tr: "betimleme" },
      { de: "precise", tr: "kesin" },
      { de: "a glance", tr: "bakış" },
      { de: "honest", tr: "dürüst" },
      { de: "aloud", tr: "sesli" },
      { de: "read out", tr: "okunan" },
      { de: "on its back", tr: "sırtında" },
    ],
    minutes: 12,
    text:
      "In colloquial language the same line lands differently. That is the whole of this lesson, and the trouble with it is that nobody can tell you in advance how much differently.\n" +
      "A feel for language tells you which register fits. An unhelpful sentence, and a true one. What it names is a piece of knowledge that cannot be written down as a rule, because it is knowledge about hundreds of small choices that were each made for a different reason.\n" +
      "Said emphatically, an empty phrase sounds like a claim. Here is one of those choices, and it is worth holding still over. Nothing in the words has changed. The delivery has, and the delivery has moved the sentence out of one kind of act and into another: what was furniture a second ago is now something a listener can disagree with.\n" +
      "This is the point where a second language becomes dangerous rather than merely difficult. A learner who speaks haltingly is forgiven everything, and one who is accent-free is forgiven nothing, because the second one is assumed to have chosen every word on purpose. Expressive power arrives before the control of it does, and the gap between the two is where the damage happens.\n" +
      "Now the written side, and three lines out of an office.\n" +
      "This alone binds the declaration of commitment. „Alone“ has been put after the subject rather than in front of it, which is a written habit; in speech the stress would have done the same work with no extra word at all.\n" +
      "Such a hardship case is rare. „Such a“ points backwards at a description the reader has already been given, and a text that uses it has promised that the description was precise.\n" +
      "The latter falls to the federal office. „The latter“ saves four words and costs the reader a glance back up the page, and it is only honest when the two items were named in the last two lines.\n" +
      "None of the three could be said aloud without sounding like a document being read out, and that is the test. A written shape that survives speech is neutral; one that does not is carrying a register on its back, and a writer who has not noticed which of the two is in hand will be heard saying something about themselves rather than about the case.",
    questions: [
      {
        text: "What cannot be written down as a rule?",
        options: ["a feel for language", "a register", "an empty phrase"],
        answer: 0,
        explain: "„What it names is a piece of knowledge that cannot be written down as a rule…“",
      },
      {
        text: "Who is forgiven nothing?",
        options: ["the accent-free speaker", "the halting speaker", "the writer"],
        answer: 0,
        explain: "„one who is accent-free is forgiven nothing…“",
      },
      {
        kind: "truefalse",
        text: "The words change when the phrase is said emphatically.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nothing in the words has changed. The delivery has…“",
      },
      {
        kind: "gapfill",
        text: "The ___ falls to the federal office.",
        options: [],
        answer: 0,
        accept: ["latter"],
        explain: "„The latter falls to the federal office.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "This alone binds the declaration of commitment.",
          "Such a hardship case is rare.",
          "The latter falls to the federal office.",
          "A written shape that survives speech is neutral.",
        ],
        explain: "Özneden sonra „alone“, geriye işaret, kısaltma; en sonda test.",
      },
      {
        kind: "short_answer",
        text: "What does „such a“ point at?",
        options: [],
        answer: 0,
        accept: ["a description", "the description", "an earlier description"],
        explain: "„„Such a“ points backwards at a description…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u08-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 8,
    title: "Managing the conversation",
    genre: "dialogue",
    intro: "Görüşmeyi kısaltmak ile soruyu atlatmak arasındaki fark.",
    gloss: [
      { de: "visible", tr: "görünür" },
      { de: "shortened", tr: "kısaltılmış" },
      { de: "efficient", tr: "verimli" },
      { de: "fourth", tr: "dördüncü" },
      { de: "compliment", tr: "iltifat" },
      { de: "a question", tr: "soru" },
      { de: "the difference", tr: "fark" },
      { de: "an agenda", tr: "gündem" },
      { de: "unanswered", tr: "cevapsız" },
      { de: "cure", tr: "iyileştirmek" },
      { de: "speed", tr: "hız" },
      { de: "silence", tr: "sessizlik" },
      { de: "worse", tr: "daha kötü" },
      { de: "repeated", tr: "yinelenen" },
      { de: "a phrase", tr: "kalıp" },
      { de: "furniture", tr: "mobilya" },
      { de: "a reprimand", tr: "azar" },
      { de: "softened", tr: "yumuşatılmış" },
      { de: "on record", tr: "kayıtlı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Deniz", text: "To streamline a talk is not to circumvent a question. I put that line at the top of the page before every meeting I chair." },
      { speaker: "Kaan", text: "Is the difference always visible?" },
      { speaker: "Deniz", text: "Afterwards it is. A shortened talk leaves the agenda finished and one question still unanswered, and everyone in the room can name which one." },
      { speaker: "Kaan", text: "Not exactly efficient, is it?" },
      { speaker: "Deniz", text: "Say that at the table and you will get an answer. Write it in the minutes and you will get a complaint about the minutes." },
      { speaker: "Kaan", text: "A quick wit cannot cure a speaking inhibition." },
      { speaker: "Deniz", text: "It cannot, and it often makes it worse, because speed in the chair teaches the quiet half of the room that silence is cheaper than being cut off." },
      { speaker: "Kaan", text: "So what do you do instead?" },
      { speaker: "Deniz", text: "I ask the question twice and wait the second time. Nothing else has ever worked, and it costs about forty seconds." },
      { speaker: "Kaan", text: "And the last line on your page?" },
      { speaker: "Deniz", text: "What we pay homage to tends to become entrenched. A phrase repeated in three meetings is furniture by the fourth, and nobody can argue with furniture." },
      { speaker: "Kaan", text: "Even a reprimand?" },
      { speaker: "Deniz", text: "A reprimand most of all. Softened once it is polite; softened four times it is on record as a compliment, and the person it was meant for has heard nothing." },
    ],
    questions: [
      {
        text: "What does a shortened talk leave?",
        options: ["one question unanswered", "one question repeated", "no minutes"],
        answer: 0,
        explain: "„A shortened talk leaves the agenda finished and one question still unanswered…“",
      },
      {
        text: "Why does speed make it worse?",
        options: ["silence becomes cheaper", "it saves time", "the chair is quiet"],
        answer: 0,
        explain: "„silence is cheaper than being cut off.“",
      },
      {
        kind: "truefalse",
        text: "Deniz asks the question once and moves on.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I ask the question twice and wait the second time.“",
      },
      {
        kind: "gapfill",
        text: "A quick wit cannot ___ a speaking inhibition.",
        options: [],
        answer: 0,
        accept: ["cure"],
        explain: "„A quick wit cannot cure a speaking inhibition.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["To streamline a talk is not to circumvent a question.", "To streamline a talk is not to circumvent a question"],
        explain: "Mastar özne; olumsuz biçim bir çıkarımı reddediyor.",
      },
      {
        kind: "short_answer",
        text: "What is a phrase by the fourth meeting?",
        options: [],
        answer: 0,
        accept: ["furniture", "it is furniture", "part of the room"],
        explain: "„A phrase repeated in three meetings is furniture by the fourth…“",
      },
    ],
  },
  {
    id: "en-c1-u08-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 8,
    title: "Holding a contract together",
    genre: "monologue",
    intro: "Bir belgeyi bir arada tutan sözcükler hangileri?",
    gloss: [
      { de: "drop", tr: "düşürmek" },
      { de: "entirely", tr: "tümüyle" },
      { de: "spends", tr: "harcıyor" },
      { de: "visible", tr: "görünür" },
      { de: "backwards", tr: "tersinden" },
      { de: "above", tr: "yukarıda" },
      { de: "exact", tr: "tam" },
      { de: "difficulties", tr: "güçlükler" },
      { de: "glance", tr: "bakış" },
      { de: "spent", tr: "harcadı" },
      { de: "none", tr: "hiçbiri" },
      { de: "a paragraph", tr: "paragraf" },
      { de: "binds", tr: "bağlıyor" },
      { de: "in front of", tr: "önünde" },
      { de: "an office habit", tr: "büro alışkanlığı" },
      { de: "rare", tr: "seyrek" },
      { de: "a promise", tr: "söz" },
      { de: "upwards", tr: "yukarı" },
      { de: "named", tr: "adı anılmış" },
      { de: "a registry", tr: "sicil" },
      { de: "a copy", tr: "suret" },
      { de: "an audit", tr: "denetim" },
      { de: "aloud", tr: "sesli" },
      { de: "a signature", tr: "imza" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Tuna", text: "This alone binds the declaration of commitment. One paragraph out of nine, and the other eight are dates and addresses." },
      { speaker: "Tuna", text: "Notice where „alone“ sits. After the subject, not in front of it, which is an office habit and not a spoken one." },
      { speaker: "Tuna", text: "Said aloud, you would put the stress on „this“ and drop the word entirely. The written page has no stress, so it spends a word." },
      { speaker: "Tuna", text: "Such a hardship case is rare. That line is doing two jobs and only one of them is visible." },
      { speaker: "Tuna", text: "It points backwards at the description above it, and by pointing backwards it promises that the description was exact enough to be pointed at." },
      { speaker: "Tuna", text: "If the paragraph above says only that the family had difficulties, the sentence is a promise the file cannot keep, and an audit will find it." },
      { speaker: "Tuna", text: "The latter falls to the federal office. Four words saved, one glance upwards spent, and it is honest only when the two bodies were named in the last two lines." },
      { speaker: "Tuna", text: "Three lines above it and the reader has to count. Three pages above it and the reader has to guess, which is where a file starts losing." },
      { speaker: "Tuna", text: "The registry keeps a copy of all of this and reads none of it until something goes wrong." },
      { speaker: "Tuna", text: "So write the document for that reader. Not the one who signs it today, but the one who opens it in four years looking for a signature and a date." },
    ],
    questions: [
      {
        text: "Where does „alone“ sit?",
        options: ["after the subject", "in front of the subject", "at the end"],
        answer: 0,
        explain: "„After the subject, not in front of it…“",
      },
      {
        text: "What does the second line promise?",
        options: ["the description was exact", "the case is common", "the office will act"],
        answer: 0,
        explain: "„it promises that the description was exact enough to be pointed at.“",
      },
      {
        kind: "truefalse",
        text: "The registry reads the file at once.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The registry keeps a copy of all of this and reads none of it until something goes wrong.“",
      },
      {
        kind: "gapfill",
        text: "Such a ___ case is rare.",
        options: [],
        answer: 0,
        accept: ["hardship"],
        explain: "„Such a hardship case is rare.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The latter falls to the federal office.", "The latter falls to the federal office"],
        explain: "Dört sözcük kazanılıyor, bir bakış harcanıyor.",
      },
      {
        kind: "short_answer",
        text: "Whom should the document be written for?",
        options: [],
        answer: 0,
        accept: ["the later reader", "the one in four years", "a future reader"],
        explain: "„the one who opens it in four years…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u08-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "Not exactly lucrative, is it?",
    genre: "info",
    intro: "Hesaplanan ek ve gizli kutup.",
    gloss: [
      { de: "auxiliary", tr: "yardımcı fiil" },
      { de: "seldom", tr: "nadiren" },
      { de: "positive", tr: "olumlu" },
      { de: "lucrative", tr: "kazançlı" },
      { de: "thrifty", tr: "tutumlu" },
      { de: "cyclical", tr: "döngüsel" },
      { de: "to streamline", tr: "sadeleştirmek" },
      { de: "to circumvent", tr: "atlatmak" },
      { de: "a quick wit", tr: "hazırcevaplık" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Pek kazançlı sayılmaz, değil mi?",
        answer: "Not exactly lucrative, is it?",
        hint: "Eksiltili söyleyiş, sonra hesaplanan ek.",
      },
      {
        kind: "build",
        tr: "Ben buna tutumlu demezdim.",
        answer: "I wouldn't call that thrifty.",
        hint: "Ek yok: bu satır yazıya ait.",
      },
      {
        kind: "build",
        tr: "Pek döngüsel değil, değil mi?",
        answer: "Hardly cyclical, is it?",
        hint: "„Hardly“ cümleyi olumsuz saydırıyor; ek artı kalıyor.",
      },
      {
        kind: "build",
        tr: "Bir görüşmeyi sadeleştirmek bir soruyu atlatmak değildir.",
        answer: "To streamline a talk is not to circumvent a question.",
        hint: "Mastar özne; olumsuz biçim çıkarımı reddediyor.",
      },
      {
        kind: "build",
        tr: "Hazırcevaplık konuşma çekingenliğini iyileştiremez.",
        answer: "A quick wit cannot cure a speaking inhibition.",
        hint: "Hız çekingenliği büyütüyor.",
      },
      {
        kind: "form",
        prompt: "Soru eki kartını doldur.",
        facts: "Ek her seferinde hesaplanıyor; yardımcı fiil, kutup ve özne belirleniyor; „hardly“ cümleyi olumsuz sayıyor; ek konuşmaya ait, karara değil.",
        fields: [
          { label: "Computed from", answer: "the auxiliary", accept: ["an auxiliary"] },
          { label: "Hidden polarity", answer: "hardly", accept: ["seldom"] },
          { label: "Tag after hardly", answer: "positive", accept: ["is it"] },
          { label: "Not used in", answer: "a ruling", accept: ["writing"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u08-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "In colloquial language the same line lands differently",
    genre: "info",
    intro: "Dil düzeyi ve büronun üç satırı.",
    gloss: [
      { de: "colloquial language", tr: "günlük konuşma dili" },
      { de: "a feel for language", tr: "dil sezgisi" },
      { de: "emphatically", tr: "kesin bir dille" },
      { de: "an empty phrase", tr: "içi boş söz" },
      { de: "a declaration of commitment", tr: "taahhütname" },
      { de: "a hardship case", tr: "mağduriyet durumu" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Günlük konuşma dilinde aynı satır başka türlü düşüyor.",
        answer: "In colloquial language the same line lands differently.",
        hint: "Dil düzeyi sözcükleri değil etkiyi değiştiriyor.",
      },
      {
        kind: "build",
        tr: "Dil sezgisi sana hangi kaydın uyduğunu söyler.",
        answer: "A feel for language tells you which register fits.",
        hint: "Kurala yazılamayan bilgi.",
      },
      {
        kind: "build",
        tr: "Kesin bir dille söylenince içi boş bir söz iddia gibi duyuluyor.",
        answer: "Said emphatically, an empty phrase sounds like a claim.",
        hint: "Sözcükler değişmedi; söyleyiş değişti.",
      },
      {
        kind: "build",
        tr: "Taahhütnameyi bağlayan yalnızca bu.",
        answer: "This alone binds the declaration of commitment.",
        hint: "„Alone“ öznenin ardında: yazılı alışkanlık.",
      },
      {
        kind: "build",
        tr: "Böyle bir mağduriyet durumu seyrektir.",
        answer: "Such a hardship case is rare.",
        hint: "Geriye işaret ediyor; betimlemenin kesin olduğuna söz veriyor.",
      },
    ],
  },
];
