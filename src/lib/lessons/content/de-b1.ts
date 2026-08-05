import type { Lesson } from "../types";

/**
 * B1 dersleri — Almanca.
 *
 * A1–A2 tek cümle kurmayı öğretti; B1 cümleleri birbirine bağlamayı öğretiyor.
 * Türkçe konuşan için asıl kırılma noktası burası: Türkçede bağlama ekle
 * yapılıyor (gelince, geldiği için), Almancada ayrı bir kelime geliyor ve o
 * kelime cümlenin sözcük dizilişini değiştiriyor.
 */
export const deB1: Lesson[] = [
  {
    id: "de-b1-l1",
    level: "B1",
    course: "de",
    ruleId: "Nebensatz-weil-dass",
    title: "Yan cümlede fiil sona gider",
    summary: "weil, dass, wenn ile başlayan cümlede fiil en sondadır.",
    minutes: 8,
    rule:
      "weil, dass, wenn, obwohl gibi bağlaçlar yan cümle kurar ve yan cümlede çekimli fiil EN SONA gider. Ana cümlede ikinci sırada olan fiil, bağlaçtan sonra sona düşüyor — aynı fiil, iki farklı yer. Türkçede bağlama ek ile yapıldığı için bu değişiklik beklenmiyor.",
    examples: [
      { de: "Ich bleibe zu Hause, weil ich müde bin.", tr: "Evde kalıyorum çünkü yorgunum." },
      { de: "Ich glaube, dass er recht hat.", tr: "Sanırım haklı." },
      { de: "Wenn ich Zeit habe, komme ich mit.", tr: "Vaktim olursa gelirim." },
    ],
    checks: [
      {
        kind: "fill",
        prompt: "„Ich komme nicht, weil ich krank ___.“",
        options: ["bin", "ist", "sein"],
        answer: "bin",
        why: "Yan cümlede fiil sona gider ve özne „ich“ olduğu için „bin“.",
      },
      {
        kind: "pick",
        prompt: "Hangisi doğru?",
        options: [
          "Ich denke, dass er kommt morgen.",
          "Ich denke, dass er morgen kommt.",
          "Ich denke, dass kommt er morgen.",
        ],
        answer: "Ich denke, dass er morgen kommt.",
        why: "„dass“ yan cümle açar; fiil („kommt“) en sona gider.",
      },
      {
        kind: "fill",
        prompt: "„Wenn es regnet, ___ ich zu Hause.“",
        options: ["ich bleibe", "bleibe", "bleiben"],
        answer: "bleibe",
        why: "Yan cümle başta olduğu için birinci öğe sayılır; ana cümlenin fiili hemen arkasından gelir.",
      },
      {
        kind: "spot",
        prompt: "Hangi cümlede hata var?",
        options: [
          "Ich bleibe hier, weil es regnet.",
          "Ich glaube, dass sie kommt morgen.",
          "Wenn du willst, gehen wir.",
        ],
        answer: "Ich glaube, dass sie kommt morgen.",
        why: "„dass“ yan cümle açar; fiil sona gitmeli: „dass sie morgen kommt“.",
      },
    ],
    roleplay: {
      scene:
        "Bir davete gidemeyeceğini arkadaşına anlatıyorsun. Gerekçelerini „weil“ ile kur, düşüncelerini „ich glaube, dass…“ ile söyle. Fiili sona atmayı unutma.",
      partner: "biraz ısrarcı ama anlayışlı bir arkadaş",
      opening: "Kommst du morgen zu meiner Party?",
      openingTr: "Yarın partime geliyor musun?",
      minTurns: 4,
    },
  },
  {
    id: "de-b1-l2",
    level: "B1",
    course: "de",
    ruleId: "Relativsatz",
    title: "İlgi cümlesi: der, die, das",
    summary: "Bir ismi tarif eden cümle, ismin cinsine göre bağlanır.",
    minutes: 8,
    rule:
      "Bir ismi açıklamak için ilgi cümlesi kurulur ve bağlayıcı, ismin CİNSİNE göre seçilir: der (eril), die (dişil/çoğul), das (nötr). İlgi cümlesi de yan cümledir, yani fiil sona gider. Türkçede bu iş sıfat-fiil ekiyle yapıldığından (aldığım kitap) ayrı bir bağlayıcı fikri yeni geliyor.",
    examples: [
      { de: "Das ist der Mann, der hier arbeitet.", tr: "Bu, burada çalışan adam." },
      { de: "Ich habe eine Freundin, die in Berlin wohnt.", tr: "Berlin'de oturan bir arkadaşım var." },
      { de: "Das Buch, das ich lese, ist spannend.", tr: "Okuduğum kitap heyecanlı." },
    ],
    checks: [
      {
        kind: "fill",
        prompt: "„Das ist die Frau, ___ Deutsch unterrichtet.“",
        options: ["der", "die", "das"],
        answer: "die",
        why: "„Frau“ dişil olduğu için bağlayıcı „die“.",
      },
      {
        kind: "fill",
        prompt: "„Ich kenne den Mann, ___ dort steht.“",
        options: ["der", "den", "dem"],
        answer: "der",
        why: "İlgi cümlesinde bağlayıcı, o cümledeki görevine göre çekilir; burada özne olduğu için „der“.",
      },
      {
        kind: "pick",
        prompt: "Hangisi doğru?",
        options: [
          "Das Auto, das ist rot, gehört mir.",
          "Das Auto, das rot ist, gehört mir.",
          "Das Auto, ist das rot, gehört mir.",
        ],
        answer: "Das Auto, das rot ist, gehört mir.",
        why: "İlgi cümlesi yan cümledir; fiil („ist“) sona gider.",
      },
      {
        kind: "spot",
        prompt: "Hangi cümlede hata var?",
        options: [
          "Das ist der Mann, der dort wohnt.",
          "Ich habe ein Buch, das ich mag.",
          "Das ist die Frau, der hier arbeitet.",
        ],
        answer: "Das ist die Frau, der hier arbeitet.",
        why: "„Frau“ dişil; bağlayıcı „die“ olmalı.",
      },
    ],
    roleplay: {
      scene:
        "Bir fotoğraftaki kişileri ve eşyaları tarif ediyorsun. Her tarifte ilgi cümlesi kur: „Das ist der/die/das …, der/die/das …“",
      partner: "fotoğrafı merak eden bir arkadaş",
      opening: "Wer ist das auf dem Foto? Und was ist das da hinten?",
      openingTr: "Fotoğraftaki kim? Peki arkadaki ne?",
      minTurns: 4,
    },
  },
];
