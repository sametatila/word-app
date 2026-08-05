import type { Lesson } from "../types";

/**
 * A1 dersleri — Almanca.
 *
 * Sıra rastgele değil: her ders bir öncekinin kullandığı yapıyı varsayıyor.
 * Önce cümlenin iskeleti (fiil ikinci sırada), sonra nesne (Akkusativ), sonra
 * zaman ifadeleri. Bu sırayla gidilince rol yapmada öğrencinin kuracağı cümle
 * her seferinde bir öncekinin üstüne biniyor.
 */
export const deA1: Lesson[] = [
  {
    id: "de-a1-l1",
    level: "A1",
    course: "de",
    ruleId: "V2-Regel",
    title: "Fiil ikinci sırada",
    summary: "Almanca cümlede çekimli fiil her zaman ikinci öğedir.",
    minutes: 7,
    rule:
      "Almancada çekimli fiil cümlenin İKİNCİ öğesidir. Başa ne koyarsan koy — özne, zaman, yer — fiil hep ikinci sırada kalır ve özne fiilin arkasına geçer. Türkçede fiil sona gittiği için bu, en sık atlanan kuraldır.",
    examples: [
      { de: "Ich gehe am Wochenende ins Kino.", tr: "Hafta sonu sinemaya gidiyorum." },
      { de: "Am Wochenende gehe ich ins Kino.", tr: "Hafta sonu sinemaya gidiyorum." },
      { de: "Heute arbeite ich zu Hause.", tr: "Bugün evde çalışıyorum." },
    ],
    checks: [
      {
        prompt: "Hangisi doğru?",
        options: ["Morgen ich komme.", "Morgen komme ich.", "Morgen ich komme nicht."],
        answer: "Morgen komme ich.",
        why: "„Morgen“ birinci öğe; fiil („komme“) ikinci sıraya, özne („ich“) arkasına geçer.",
      },
      {
        prompt: "„Heute ___ ich müde.“ boşluğa ne gelir?",
        options: ["bin", "ist", "sein"],
        answer: "bin",
        why: "Fiil ikinci sırada ve özne „ich“ olduğu için çekim „bin“dir.",
      },
      {
        prompt: "Cümlenin başına „In Istanbul“ eklenirse „Ich wohne“ nasıl olur?",
        options: ["In Istanbul ich wohne.", "In Istanbul wohne ich.", "Wohne in Istanbul ich."],
        answer: "In Istanbul wohne ich.",
        why: "Başa gelen öğe birinci sayılır; fiil ikinci sırayı korur.",
      },
    ],
    roleplay: {
      scene:
        "Yeni bir komşunla merdivende karşılaştın. Sana günlük programını soruyor. Cevaplarına „Heute…“, „Morgen…“, „Am Wochenende…“ gibi zaman ifadeleriyle başla — kuralı kullanman gereken yer tam orası.",
      partner: "meraklı ama kibar bir komşu",
      opening: "Guten Tag! Sie sind neu hier, oder? Was machen Sie heute?",
      openingTr: "İyi günler! Buraya yeni taşındınız, değil mi? Bugün ne yapıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-l2",
    level: "A1",
    course: "de",
    ruleId: "Akkusativ",
    title: "Belirtme hâli: den, einen",
    summary: "Nesne olan eril kelimede „der“ → „den“, „ein“ → „einen“ olur.",
    minutes: 7,
    rule:
      "Cümlenin nesnesi belirtme hâline (Akkusativ) girer. Değişen tek şey ERİL kelimelerdir: „der“ → „den“, „ein“ → „einen“. Dişil ve nötr olanlar aynı kalır. Türkçede nesne eki her cinste aynı olduğu için bu ayrım gözden kaçıyor.",
    examples: [
      { de: "Ich habe einen Bruder.", tr: "Bir erkek kardeşim var." },
      { de: "Ich sehe den Mann.", tr: "Adamı görüyorum." },
      { de: "Ich habe eine Schwester.", tr: "Bir kız kardeşim var." },
      { de: "Ich kaufe das Buch.", tr: "Kitabı alıyorum." },
    ],
    checks: [
      {
        prompt: "„Ich habe ___ Hund.“ (der Hund)",
        options: ["ein", "einen", "eine"],
        answer: "einen",
        why: "„Hund“ eril ve burada nesne; „ein“ belirtme hâlinde „einen“ olur.",
      },
      {
        prompt: "„Ich trinke ___ Milch.“ (die Milch)",
        options: ["die", "den", "das"],
        answer: "die",
        why: "Dişil kelimeler belirtme hâlinde değişmez.",
      },
      {
        prompt: "Hangisi doğru?",
        options: ["Ich sehe der Mann.", "Ich sehe den Mann.", "Ich sehe dem Mann."],
        answer: "Ich sehe den Mann.",
        why: "Eril nesne „den“ alır; „dem“ yönelme hâlidir (Dativ), burada değil.",
      },
    ],
    roleplay: {
      scene:
        "Bir mağazadasın ve satıcıya ne aradığını anlatıyorsun. Eril kelimeler seçmeye çalış (der Mantel, der Schuh, der Tisch) — kuralı kullanacağın yer orası.",
      partner: "yardımsever bir satıcı",
      opening: "Guten Tag! Was suchen Sie denn?",
      openingTr: "İyi günler! Ne arıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-l3",
    level: "A1",
    course: "de",
    ruleId: "Trennbare-Verben",
    title: "Ayrılabilen fiiller",
    summary: "„aufstehen“ gibi fiillerin öneki cümlenin sonuna gider.",
    minutes: 7,
    rule:
      "Bazı fiillerin başında ayrılabilen bir önek vardır: aufstehen, einkaufen, anrufen, mitkommen. Cümle kurulunca fiil ikinci sıraya, ÖNEK ise cümlenin SONUNA gider. Türkçede böyle bir şey olmadığı için önek çoğu zaman fiile yapışık bırakılıyor.",
    examples: [
      { de: "Ich stehe um sieben Uhr auf.", tr: "Saat yedide kalkıyorum." },
      { de: "Wir kaufen am Samstag ein.", tr: "Cumartesi alışveriş yapıyoruz." },
      { de: "Rufst du mich morgen an?", tr: "Beni yarın arar mısın?" },
    ],
    checks: [
      {
        prompt: "„aufstehen“ ile: „Ich ___ um acht ___.“",
        options: ["stehe … auf", "aufstehe … —", "auf … stehe"],
        answer: "stehe … auf",
        why: "Fiil ikinci sırada, önek cümlenin sonunda.",
      },
      {
        prompt: "Hangisi doğru?",
        options: ["Wir einkaufen heute.", "Wir kaufen heute ein.", "Wir kaufen ein heute."],
        answer: "Wir kaufen heute ein.",
        why: "Önek en sona gider; zaman ifadesi fiil ile önek arasında kalır.",
      },
      {
        prompt: "„anrufen“ ile soru: „___ du mich ___?“",
        options: ["Rufst … an", "Anrufst … —", "Ruf … an du"],
        answer: "Rufst … an",
        why: "Soruda fiil başa geçer ama önek yine sonda kalır.",
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla hafta sonu planı yapıyorsun. Ayrılabilen fiiller kullan: aufstehen, einkaufen, anrufen, mitkommen. Öneki cümlenin sonuna atmayı unutma.",
      partner: "plan yapmayı seven bir arkadaş",
      opening: "Hallo! Was machen wir am Samstag? Stehst du früh auf?",
      openingTr: "Selam! Cumartesi ne yapıyoruz? Erken kalkıyor musun?",
      minTurns: 4,
    },
  },
];
