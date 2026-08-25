import type { CefrLevel } from "@/lib/skills/types";
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
  /** Kural, Türkçe, tek cümle. */
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
  r("case.dativ-praep", "A1", "case", "mit/aus/bei/nach/von/zu/seit her zaman Dativ ister", "mit dem Bus, bei der Arbeit", "a1-praepositionen", /\b(mit|aus|bei|nach|von|zu|seit|zum|zur|beim|vom)\b/i),
  r("case.akk-praep", "A1", "case", "für/durch/gegen/ohne/um her zaman Akkusativ ister", "für dich, ohne den Schlüssel", "a1-praepositionen", /\b(für|durch|gegen|ohne|um)\b/i),
  r("case.wechsel", "A2", "case", "yer edatlarında hedef (wohin?) Akkusativ, konum (wo?) Dativ", "in die Küche / in der Küche", "a2-wechselpraepositionen", /\b(in|an|auf|über|unter|vor|hinter|neben|zwischen|ins|ans|im|am)\b/i),
  r("case.dativ-verb", "A2", "case", "helfen, danken, gefallen, gehören, antworten Dativ alır", "Ich helfe dir. Das gehört mir.", "a2-dativverben", /\b(helf|dank|gefall|gehör|antwort|glaub|folg|gratulier|pass)\w*/i),
  r("case.akk-mask", "A1", "case", "Akkusativ'de değişen tek artikel eril: der → den, ein → einen", "Ich sehe den Mann.", "a1-artikel", /\b(den|einen|keinen)\b/i),
  r("case.dativ-plural-n", "A1", "case", "Dativ çoğulda artikel den ve isim de -n alır", "mit den Kindern", "a1-artikel", /\bden\s+\p{L}+n\b/iu),
  r("case.pronoun", "A1", "case", "zamir hâle göre değişir: ich–mich–mir, er–ihn–ihm", "Ich helfe ihm. Ich sehe ihn.", "a1-pronomen", /\b(mich|mir|dich|dir|ihn|ihm|ihr|uns|euch|ihnen|Ihnen)\b/),
  r("case.general", "A1", "case", "hâli edat ya da fiil belirler: nesne Akkusativ, kime/neye Dativ", "Ich gebe dem Kind den Ball.", "a1-artikel"),

  // ── fiil çekimi ── (Perfekt kuralı sein/haben'den ÖNCE: "bin gegangen" yardımcı fiil kuralıdır, sein çekimi değil)
  r("conj.perfekt-aux", "A1", "conjugation", "Perfekt'te hareket ve durum değişimi sein, geri kalan haben alır", "Ich bin gegangen. Ich habe gegessen.", "a1-perfekt", /\b(bin|bist|ist|sind|seid|habe|hast|hat|haben|habt)\b\s+\S.*\bge\p{L}+(t|en)\b/iu),
  r("conj.sein", "A1", "conjugation", "sein düzensiz: bin, bist, ist, sind, seid, sind", "Ich bin müde. Du bist hier.", "a1-sein-haben", /\b(bin|bist|ist|sind|seid)\b/i),
  r("conj.haben", "A1", "conjugation", "haben'de du ve er/sie/es b'yi düşürür: hast, hat", "Du hast Zeit. Er hat Hunger.", "a1-sein-haben", /\b(habe|hast|hat|haben|habt)\b/i),
  r("conj.modal", "A1", "conjugation", "modal fiil çekilir, asıl fiil mastarla sona gider; ich ve er/sie/es aynı biçim", "Ich kann kommen. Er muss arbeiten.", "a1-modalverben", /\b(kann|kannst|muss|musst|will|willst|darf|darfst|soll|sollst|mag|magst|möchte|möchtest|können|müssen|wollen|dürfen|sollen|mögen)\b/i),
  r("conj.partizip", "A2", "conjugation", "Partizip II: düzenli ge-…-t, düzensiz ge-…-en; be-/ver-/-ieren ge- almaz", "gemacht, gesehen, bezahlt, studiert", "a2-perfekt-partizip", /\b(ge\p{L}+(t|en)|\p{L}+iert|be\p{L}+t|ver\p{L}+t)\b/iu),
  r("conj.trennbar", "A1", "conjugation", "ayrılabilen fiilin öneki ana cümlede en sona gider", "Ich stehe um sieben auf.", "a1-trennbar", /\b(auf|an|ab|ein|aus|mit|zu|vor|zurück|weg|los|fern)\b\s*[.!?]?$/i),
  r("conj.stem-change", "A1", "conjugation", "bazı fiiller du ve er/sie/es'te kök ünlüsünü değiştirir: e→i/ie, a→ä", "du sprichst, er liest, sie fährt", "a1-verben", /\b(sprichst|spricht|liest|fährst|fährt|isst|nimmst|nimmt|siehst|sieht|schläfst|schläft|gibst|gibt|hilfst|hilft|läufst|läuft|triffst|trifft)\b/i),
  r("conj.praeteritum", "A2", "conjugation", "war/hatte/konnte konuşmada da Präteritum ile söylenir", "Ich war krank. Ich hatte keine Zeit.", "a2-praeteritum", /\b(war|warst|waren|wart|hatte|hattest|hatten|hattet|konnte|musste|wollte|durfte|sollte)\w*\b/i),
  r("conj.imperativ", "A2", "conjugation", "du'ya emir: -st düşer, özne yok; Sie'ye emir: fiil + Sie", "Komm! Kommen Sie!", "a2-imperativ", /^(komm|geh|mach|nimm|gib|lies|sprich|sei|hab|warte|setz|steh)\b/i),
  r("conj.general", "A1", "conjugation", "fiil özneye göre çekilir: ich -e, du -st, er/sie/es -t, wir/sie -en, ihr -t", "ich lerne, du lernst, er lernt", "a1-praesens"),

  // ── fiilin yeri ── (başta yan cümle kuralı, genel yan cümle kuralından ÖNCE: "^" ile daha özel)
  r("vpos.subordinate-first", "A2", "verb_position", "yan cümle önde gelirse ana cümlenin fiili virgülden hemen sonra gelir", "Wenn ich Zeit habe, komme ich.", "a2-nebensatz", /^(weil|wenn|als|obwohl|nachdem|bevor|während|falls|sobald)\b/i),
  r("vpos.subordinate", "A2", "verb_position", "yan cümle bağlacından sonra çekimli fiil en sona gider", "…, weil ich krank bin.", "a2-nebensatz", /\b(weil|dass|wenn|ob|obwohl|damit|während|bevor|nachdem|als|sobald|falls|seitdem|bis)\b/i),
  r("vpos.adverb-first", "A2", "verb_position", "deshalb/trotzdem/dann/danach birinci sırayı kaplar; fiil hemen arkasına, özne sonraya", "Deshalb bleibe ich zu Hause.", "a2-nebensatz", /\b(deshalb|deswegen|darum|trotzdem|dann|danach|sonst|außerdem)\b/i),
  r("vpos.yesno", "A1", "verb_position", "evet/hayır sorusunda çekimli fiil cümlenin başına gelir", "Kommst du mit?", "a1-satzbau", /^(bin|bist|ist|sind|hast|hat|haben|kannst|kann|könnt|musst|muss|willst|will|darf|darfst|kommst|gehst|magst|möchtest|möchten|sprichst|wohnst|arbeitest)\b/i),
  r("vpos.wfrage", "A1", "verb_position", "soru kelimesinden sonra fiil ikinci sırada, özne fiilden sonra", "Wo wohnst du?", "a1-wfragen", /^(wer|was|wo|wann|wie|warum|wohin|woher|welche[rs]?|wieso|wem|wen)\b/i),
  r("vpos.inversion", "A1", "verb_position", "cümle özne dışında bir öğeyle başlayınca fiil yine ikinci sırada, özne fiilden sonra", "Heute gehe ich ins Kino.", "a1-satzbau", /^(heute|morgen|gestern|jetzt|dann|am|im|um|nach|vor|seit|leider|zum Glück|manchmal|oft)\b/i),
  r("vpos.general", "A1", "verb_position", "ana cümlede çekimli fiil her zaman ikinci sırada durur", "Ich gehe heute ins Kino.", "a1-satzbau"),

  // ── kelime sırası ── (nicht ve zamir kuralları önce; zaman/yer sırası en geniş ağ, en sonda)
  r("worder.pronoun-first", "A1", "word_order", "zamir nesne isim nesneden önce; iki zamirde önce Akkusativ sonra Dativ", "Ich gebe es ihm. Ich gebe ihm das Buch.", "a1-pronomen", /\b(es|ihn|sie|mich|dich|uns|euch)\s+(ihm|ihr|mir|dir|uns|euch|ihnen)\b/i),
  r("worder.nicht", "A1", "word_order", "nicht fiilin olumsuzlanan öğesinden hemen önce, cümlenin sonuna doğru durur", "Ich komme heute nicht.", "a1-negation", /\bnicht\b/i),
  r("worder.tekamolo", "A2", "word_order", "fiil dışı öğelerin sırası: zaman – neden – tarz – yer (wann – warum – wie – wo)", "Ich fahre morgen mit dem Bus nach Köln.", "a1-satzbau", /\b(heute|morgen|gestern|um \d|am \w+tag|mit dem|mit der|nach|zu)\b/i),
  r("worder.general", "A1", "word_order", "önce özne ve fiil, sonra zaman, tarz, yer; en sonda ikinci fiil parçası", "Ich muss heute früh nach Hause gehen.", "a1-satzbau"),

  // ── artikel / çoğul (kelime kuralı why.ts'te; burası tabloya bağ için genel) ──
  r("article.general", "A1", "article", "artikel kelimenin parçası: son ek kuralı yoksa kelimeyle birlikte ezberle", "die Wohnung, das Mädchen, der Lehrer", "a1-artikel"),
  r("plural.general", "A1", "plural", "çoğul eki isme göre: dişil -(e)n, eril -e, kısa nötr -er, yabancı -s", "die Frauen, die Tische, die Kinder, die Autos", "a1-plural"),

  // ── anlam, yazım, dinleme, telaffuz — genel parçacıklar ──
  r("spelling.general", "A1", "spelling", "z = ts, v = f, w = v, ie uzun i, ei „ay“; isimler büyük harfle", "die Zeit, vier, Wien", "a1-zahlen"),
  r("meaning.general", "A1", "meaning", "iki karşılığı yan yana bir daha oku; benzer görünen kelimeler ayrı ezberlenir", "die Kirche (kilise) ≠ die Kirsche (kiraz)"),
  r("listening.general", "A1", "listening", "bir kez daha dinle, yazımına bak: ch, sch ve umlaut sesleri Türkçede yok", "ich, schön, über"),
  r("pronunciation.general", "A1", "pronunciation", "vurgu genelde ilk hecede; z = ts, w = v, ü dudak yuvarlak", "Zeit, Wasser, über"),
];

const BY_TYPE = new Map<ErrorType, Rule[]>();
for (const rule of RULES) BY_TYPE.set(rule.trigger.errorType, [...(BY_TYPE.get(rule.trigger.errorType) ?? []), rule]);

/** Bağlama uyan ilk kural; uyan yoksa tipin genel kuralı. */
export function ruleFor(errorType: ErrorType, context = ""): Rule | null {
  const list = BY_TYPE.get(errorType) ?? [];
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
