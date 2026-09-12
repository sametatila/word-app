import type { CefrLevel } from "@/lib/skills/types";
import type { TargetLang } from "@/lib/courses";
import { ERROR_TYPES, type ErrorType } from "@/lib/errors";

/**
 * Kural parçacıkları (WP-73): "neden" satırının ve drill gerekçelerinin
 * ortak kural bilgisi.
 *
 * WP-13 `why.ts` artikel ve çoğul için kelimeden kural çıkarabiliyor; hâl,
 * çekim, fiil yeri ve kelime sırasında ise tek bir genel cümle söylüyordu
 * ("edat hâli belirler…"). Burada her hata tipine, cümlede geçen ipucuna
 * (`trigger.pattern`) göre seçilen kısa kurallar var: cevapta "mit" geçiyorsa
 * Dativ edatı kuralı, "weil" geçiyorsa yan cümle kuralı. Kural bulunamazsa
 * tipin genel kuralı (pattern'siz) döner — her tipin en az bir genel kuralı
 * var; testi `npm run test:rules`.
 *
 * `link` dilbilgisi tablosu kimliği: gerekçe tabloya bağlanır, hata tipinin
 * varsayılan tablosundan daha isabetli. Kurallar Türkçe, tek cümle,
 * "genelde"li; istisnalı yerde istisna söylenir.
 */
export type Rule = {
  id: string;
  level: CefrLevel;
  trigger: {
    errorType: ErrorType;
    /** Bağlama (cevap cümlesi + yazılan + kelime) uygulanır; yoksa genel kural. */
    pattern?: RegExp;
  };
  /** Kuralın SÖZLÜK ANAHTARI (`whyrule.<id>`) — metin gösterildiği yerde çevriliyor. */
  why: string;
  /** Almanca örnek. */
  example: string;
  /** Dilbilgisi tablosu kimliği (`CheatSheet.id`). */
  link?: string;
};

const r = (id: string, level: CefrLevel, errorType: ErrorType, why: string, example: string, link?: string, pattern?: RegExp): Rule => ({
  id,
  level,
  trigger: { errorType, pattern },
  why,
  example,
  link,
});

/*
  Sıra önemli: aynı tipte önce özel (pattern'li) kurallar, en sonda genel
  kural. `ruleFor` ilk uyanı alır.
*/
export const RULES: Rule[] = [
  // ── hâl (Kasus) ──
  r("case.dativ-praep", "A1", "case", "whyrule.case.dativ-praep", "mit dem Bus, bei der Arbeit", "a1-praepositionen", /\b(mit|aus|bei|nach|von|zu|seit|zum|zur|beim|vom)\b/i),
  r("case.akk-praep", "A1", "case", "whyrule.case.akk-praep", "für dich, ohne den Schlüssel", "a1-praepositionen", /\b(für|durch|gegen|ohne|um)\b/i),
  r("case.wechsel", "A2", "case", "whyrule.case.wechsel", "in die Küche / in der Küche", "a2-wechselpraepositionen", /\b(in|an|auf|über|unter|vor|hinter|neben|zwischen|ins|ans|im|am)\b/i),
  r("case.dativ-verb", "A2", "case", "whyrule.case.dativ-verb", "Ich helfe dir. Das gehört mir.", "a2-dativverben", /\b(helf|dank|gefall|gehör|antwort|glaub|folg|gratulier|pass)\w*/i),
  r("case.akk-mask", "A1", "case", "whyrule.case.akk-mask", "Ich sehe den Mann.", "a1-artikel", /\b(den|einen|keinen)\b/i),
  r("case.dativ-plural-n", "A1", "case", "whyrule.case.dativ-plural-n", "mit den Kindern", "a1-artikel", /\bden\s+\p{L}+n\b/iu),
  r("case.pronoun", "A1", "case", "whyrule.case.pronoun", "Ich helfe ihm. Ich sehe ihn.", "a1-pronomen", /\b(mich|mir|dich|dir|ihn|ihm|ihr|uns|euch|ihnen|Ihnen)\b/),
  r("case.general", "A1", "case", "whyrule.case.general", "Ich gebe dem Kind den Ball.", "a1-artikel"),

  // ── fiil çekimi ── (Perfekt kuralı sein/haben'den ÖNCE: "bin gegangen" yardımcı fiil kuralıdır, sein çekimi değil)
  r("conj.perfekt-aux", "A1", "conjugation", "whyrule.conj.perfekt-aux", "Ich bin gegangen. Ich habe gegessen.", "a1-perfekt", /\b(bin|bist|ist|sind|seid|habe|hast|hat|haben|habt)\b\s+\S.*\bge\p{L}+(t|en)\b/iu),
  r("conj.sein", "A1", "conjugation", "whyrule.conj.sein", "Ich bin müde. Du bist hier.", "a1-sein-haben", /\b(bin|bist|ist|sind|seid)\b/i),
  r("conj.haben", "A1", "conjugation", "whyrule.conj.haben", "Du hast Zeit. Er hat Hunger.", "a1-sein-haben", /\b(habe|hast|hat|haben|habt)\b/i),
  r("conj.modal", "A1", "conjugation", "whyrule.conj.modal", "Ich kann kommen. Er muss arbeiten.", "a1-modalverben", /\b(kann|kannst|muss|musst|will|willst|darf|darfst|soll|sollst|mag|magst|möchte|möchtest|können|müssen|wollen|dürfen|sollen|mögen)\b/i),
  r("conj.partizip", "A2", "conjugation", "whyrule.conj.partizip", "gemacht, gesehen, bezahlt, studiert", "a2-perfekt-partizip", /\b(ge\p{L}+(t|en)|\p{L}+iert|be\p{L}+t|ver\p{L}+t)\b/iu),
  r("conj.trennbar", "A1", "conjugation", "whyrule.conj.trennbar", "Ich stehe um sieben auf.", "a1-trennbar", /\b(auf|an|ab|ein|aus|mit|zu|vor|zurück|weg|los|fern)\b\s*[.!?]?$/i),
  r("conj.stem-change", "A1", "conjugation", "whyrule.conj.stem-change", "du sprichst, er liest, sie fährt", "a1-verben", /\b(sprichst|spricht|liest|fährst|fährt|isst|nimmst|nimmt|siehst|sieht|schläfst|schläft|gibst|gibt|hilfst|hilft|läufst|läuft|triffst|trifft)\b/i),
  r("conj.praeteritum", "A2", "conjugation", "whyrule.conj.praeteritum", "Ich war krank. Ich hatte keine Zeit.", "a2-praeteritum", /\b(war|warst|waren|wart|hatte|hattest|hatten|hattet|konnte|musste|wollte|durfte|sollte)\w*\b/i),
  r("conj.imperativ", "A2", "conjugation", "whyrule.conj.imperativ", "Komm! Kommen Sie!", "a2-imperativ", /^(komm|geh|mach|nimm|gib|lies|sprich|sei|hab|warte|setz|steh)\b/i),
  r("conj.general", "A1", "conjugation", "whyrule.conj.general", "ich lerne, du lernst, er lernt", "a1-praesens"),

  // ── fiilin yeri ── (başta yan cümle kuralı, genel yan cümle kuralından ÖNCE: "^" ile daha özel)
  r("vpos.subordinate-first", "A2", "verb_position", "whyrule.vpos.subordinate-first", "Wenn ich Zeit habe, komme ich.", "a2-nebensatz", /^(weil|wenn|als|obwohl|nachdem|bevor|während|falls|sobald)\b/i),
  r("vpos.subordinate", "A2", "verb_position", "whyrule.vpos.subordinate", "…, weil ich krank bin.", "a2-nebensatz", /\b(weil|dass|wenn|ob|obwohl|damit|während|bevor|nachdem|als|sobald|falls|seitdem|bis)\b/i),
  r("vpos.adverb-first", "A2", "verb_position", "whyrule.vpos.adverb-first", "Deshalb bleibe ich zu Hause.", "a2-nebensatz", /\b(deshalb|deswegen|darum|trotzdem|dann|danach|sonst|außerdem)\b/i),
  r("vpos.yesno", "A1", "verb_position", "whyrule.vpos.yesno", "Kommst du mit?", "a1-satzbau", /^(bin|bist|ist|sind|hast|hat|haben|kannst|kann|könnt|musst|muss|willst|will|darf|darfst|kommst|gehst|magst|möchtest|möchten|sprichst|wohnst|arbeitest)\b/i),
  r("vpos.wfrage", "A1", "verb_position", "whyrule.vpos.wfrage", "Wo wohnst du?", "a1-wfragen", /^(wer|was|wo|wann|wie|warum|wohin|woher|welche[rs]?|wieso|wem|wen)\b/i),
  r("vpos.inversion", "A1", "verb_position", "whyrule.vpos.inversion", "Heute gehe ich ins Kino.", "a1-satzbau", /^(heute|morgen|gestern|jetzt|dann|am|im|um|nach|vor|seit|leider|zum Glück|manchmal|oft)\b/i),
  r("vpos.general", "A1", "verb_position", "whyrule.vpos.general", "Ich gehe heute ins Kino.", "a1-satzbau"),

  // ── kelime sırası ── (nicht ve zamir kuralları önce; zaman/yer sırası en geniş ağ, en sonda)
  r("worder.pronoun-first", "A1", "word_order", "whyrule.worder.pronoun-first", "Ich gebe es ihm. Ich gebe ihm das Buch.", "a1-pronomen", /\b(es|ihn|sie|mich|dich|uns|euch)\s+(ihm|ihr|mir|dir|uns|euch|ihnen)\b/i),
  r("worder.nicht", "A1", "word_order", "whyrule.worder.nicht", "Ich komme heute nicht.", "a1-negation", /\bnicht\b/i),
  r("worder.tekamolo", "A2", "word_order", "whyrule.worder.tekamolo", "Ich fahre morgen mit dem Bus nach Köln.", "a1-satzbau", /\b(heute|morgen|gestern|um \d|am \w+tag|mit dem|mit der|nach|zu)\b/i),
  r("worder.general", "A1", "word_order", "whyrule.worder.general", "Ich muss heute früh nach Hause gehen.", "a1-satzbau"),

  // ── artikel / çoğul (kelime kuralı why.ts'te; burası tabloya bağ için genel) ──
  r("article.general", "A1", "article", "whyrule.article.general", "die Wohnung, das Mädchen, der Lehrer", "a1-artikel"),
  r("plural.general", "A1", "plural", "whyrule.plural.general", "die Frauen, die Tische, die Kinder, die Autos", "a1-plural"),

  // ── anlam, yazım, dinleme, telaffuz — genel parçacıklar ──
  r("spelling.general", "A1", "spelling", "whyrule.spelling.general", "die Zeit, vier, Wien", "a1-zahlen"),
  r("meaning.general", "A1", "meaning", "whyrule.meaning.general", "die Kirche (kilise) ≠ die Kirsche (kiraz)"),
  r("listening.general", "A1", "listening", "whyrule.listening.general", "ich, schön, über"),
  r("pronunciation.general", "A1", "pronunciation", "whyrule.pronunciation.general", "Zeit, Wasser, über"),
];

/**
 * İNGİLİZCE KURSUN KENDİ KURALLARI.
 *
 * Yukarıdaki tablo baştan sona ALMANCA: tetikleyicileri Almanca sözcükler,
 * örnekleri Almanca cümleler, bağlantıları Almanca dilbilgisi sayfaları.
 * İngilizce kurs onu paylaşınca öğrenci kendi hatasının karşılığında Almanca
 * bir kural görüyordu; 2026-09-12'de ölçüldü ve iki ayrı biçimde yanlıştı:
 *
 *   «I usually get up at seven.» → "Cümle „I“ ile başlayınca fiil yine
 *      ikinci sırada kalır, özne fiilden SONRA gelir." — Almanca V2 kuralı,
 *      İngilizcede özne fiilden ÖNCE gelir, yani cümle düpedüz yanlış.
 *   «Where do you live?» → "Önce özne ve fiil, sonra zaman, tarz, yer…:
 *      Ich muss heute früh nach Hause gehen." — İngilizce öğrenene Almanca
 *      örnek cümle.
 *
 * Bu tablo yalnız SIRAYLA ilgili iki tipi kapsıyor (`verb_position`,
 * `word_order`), çünkü İngilizce kursun tur akışında üretilen tipler
 * bunlar; hâl (`case`) ve çekim (`conjugation`) kuralları Almanca kursun
 * kendi oyunlarından geliyor. Kapsam büyürse buraya eklenir.
 *
 * `link` YOK: dilbilgisi tabloları (`CheatSheet`) Almanca kursun sayfaları.
 */
export const RULES_EN: Rule[] = [
  // ── yardımcı fiilin yeri ──
  r("vpos.en-yesno", "A1", "verb_position", "whyrule.vpos.en-yesno", "Do you like coffee?", undefined,
    /^(do|does|did|is|am|are|was|were|can|could|will|would|shall|should|may|might|must|have|has|had)\b/i),
  r("vpos.en-wh", "A1", "verb_position", "whyrule.vpos.en-wh", "Where do you live?", undefined,
    /^(what|where|when|who|whom|whose|which|why|how)\b/i),
  r("vpos.en-general", "A1", "verb_position", "whyrule.vpos.en-general", "I am going to the cinema."),

  // ── kelime sırası ──
  r("worder.en-frequency", "A1", "word_order", "whyrule.worder.en-frequency", "I usually get up at seven. / She is always late.", undefined,
    /\b(always|usually|often|sometimes|never|rarely|seldom|ever|hardly ever)\b/i),
  r("worder.en-negation", "A1", "word_order", "whyrule.worder.en-negation", "I do not drink coffee. / She is not here.", undefined,
    /\b(not|n't|never)\b/i),
  r("worder.en-place-time", "A2", "word_order", "whyrule.worder.en-place-time", "I went to the cinema yesterday.", undefined,
    /\b(yesterday|today|tomorrow|tonight|last (week|year|month|night)|next (week|year|month)|this (morning|evening)|at \d)\b/i),
  r("worder.en-general", "A1", "word_order", "whyrule.worder.en-general", "I bought a book yesterday."),
];

const BY_TYPE = new Map<ErrorType, Rule[]>();
for (const rule of RULES) BY_TYPE.set(rule.trigger.errorType, [...(BY_TYPE.get(rule.trigger.errorType) ?? []), rule]);
const BY_TYPE_EN = new Map<ErrorType, Rule[]>();
for (const rule of RULES_EN) BY_TYPE_EN.set(rule.trigger.errorType, [...(BY_TYPE_EN.get(rule.trigger.errorType) ?? []), rule]);

/**
 * Bağlama uyan ilk kural; uyan yoksa tipin genel kuralı.
 *
 * `lang` HEDEF dil: İngilizce kursta İngilizce tablo, bulunamazsa Almanca
 * tabloya düşmüyor — düşseydi öğrenci yine Almanca örnek görürdü. İngilizce
 * tabloda olmayan tip için `null` dönüyor ve çağıran genel etikete iniyor.
 */
export function ruleFor(errorType: ErrorType, context = "", lang: TargetLang = "de"): Rule | null {
  const list = (lang === "en" ? BY_TYPE_EN : BY_TYPE).get(errorType) ?? [];
  const ctx = context.trim();
  for (const rule of list) {
    if (!rule.trigger.pattern) continue;
    if (ctx && rule.trigger.pattern.test(ctx)) return rule;
  }
  return list.find((x) => !x.trigger.pattern) ?? null;
}

export function ruleById(id: string): Rule | undefined {
  return RULES.find((x) => x.id === id);
}

/** Her hata tipinin en az bir genel kuralı var mı — test ve içerik kontrolü. */
export function uncoveredErrorTypes(): ErrorType[] {
  return ERROR_TYPES.filter((t) => !(BY_TYPE.get(t) ?? []).some((x) => !x.trigger.pattern));
}
