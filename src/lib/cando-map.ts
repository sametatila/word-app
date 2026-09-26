import { isCandoId, type CandoSkill } from "@/lib/cando";
import type { CefrLevel, SkillId } from "@/lib/skills/types";

/**
 * İçerik → yapabilirlik etiketi (WP-43, adım 3).
 *
 * 220 konuşma ve 344 egzersizi elle etiketlemek yerine ilk tur KURALLA
 * yapılıyor: konuşmanın simgesi (konu ailesi) + seviyesi, egzersizin becerisi +
 * seviyesi + türü. İçeriğin kendi `cando` alanı varsa o kazanır; bu harita
 * yalnız boşlukları doldurur. WP-71/72 içerik gözden geçirmesinde etiketler
 * içeriğe yazılır ve bu harita küçülür. Bilinmeyen kimlik üretilmez: her
 * sonuç `isCandoId` süzgecinden geçer.
 */

type Theme = "social" | "service" | "work";

const ICON_THEME: Record<string, Theme> = {
  greet: "social", party: "social", family: "social", handshake: "social", gift: "social", ring: "social", baby: "social",
  feelings: "social", culture: "social", music: "social", art: "social", film: "social", media: "social", star: "social",
  question: "social", idea: "social", flower: "social", dog: "social",
  cafe: "service", food: "service", bread: "service", cake: "service", shopping: "service", shirt: "service", money: "service",
  ticket: "service", suitcase: "service", mail: "service", phone: "service", doctor: "service", tooth: "service", pill: "service",
  repair: "service", key: "service", home: "service", car: "service", bike: "service", train: "service", plane: "service",
  transport: "service", map: "service", camera: "service", clock: "service", calendar: "service", weather: "service",
  sun: "service", snow: "service", rain: "service", nature: "service", mountain: "service", recycle: "service", city: "service",
  vacation: "service", bed: "service",
  job: "work", office: "work", school: "work", book: "work", pen: "work", law: "work", chart: "work", tech: "work", flag: "work",
  run: "work", sport: "work",
};

/** Seviye × tema → konuşma ifadesi (konuşmanın sohbet sahnesi). */
const CONVERSATION_SPK: Record<CefrLevel, Record<Theme, number>> = {
  A1: { social: 1, service: 3, work: 5 },
  A2: { social: 6, service: 1, work: 7 },
  B1: { social: 6, service: 3, work: 7 },
  B2: { social: 1, service: 4, work: 3 },
  C1: { social: 2, service: 3, work: 1 },
};

/** Konuşmanın dilbilgisi odağı (focusId) → dilbilgisi ifadesi. */
/**
 * A1 ALMANCA KONUŞMALARININ KONUŞMA İFADESİ, konuşma konuşma (2026-09-26).
 *
 * Tema kuralı (simge → sosyal/hizmet/iş) A1'de kabaydı: "hizmet" temasındaki
 * her şey (saat, yol sorma, vücut, telefon, Perfekt) "Kafede sipariş
 * verebilirim"e, alfabe ve form doldurma "Mesleğimi, ailemi anlatabilirim"e
 * gidiyordu; SPK.2 (selamlaşma) ve SPK.4 (sayı, saat, tarih) ifadelerine hiçbir
 * konuşma bağlanamıyordu. Ölçüldü: 100 konuşmanın 72'si yanlış ifadedeydi.
 * Tablo tema kuralından önce uygulanıyor; öteki seviyeler tema kuralında.
 * Mobil ikizi `mobile/src/game/candoMap.ts` (`check:parity`).
 */
const CONVERSATION_SPK_BY_ID: Record<string, number> = {
  "de-a1-hallo": 1,
  "de-a1-wie-gehts": 2,
  "de-a1-du-oder-sie": 2,
  "de-a1-woher": 1,
  "de-a1-sprachen": 1,
  "de-a1-zahlen": 4,
  "de-a1-alphabet": 1,
  "de-a1-beruf": 5,
  "de-a1-alter": 1,
  "de-a1-formular": 1,
  "de-a1-familie": 5,
  "de-a1-geschwister": 5,
  "de-a1-kein": 6,
  "de-a1-haustiere": 5,
  "de-a1-fotos": 5,
  "de-a1-plural": 6,
  "de-a1-aussehen": 5,
  "de-a1-freunde": 5,
  "de-a1-nicht": 6,
  "de-a1-familienfest": 5,
  "de-a1-cafe": 3,
  "de-a1-fruehstueck": 3,
  "de-a1-imbiss": 3,
  "de-a1-restaurant": 3,
  "de-a1-lieblingsessen": 3,
  "de-a1-supermarkt": 3,
  "de-a1-mengen": 3,
  "de-a1-kochen": 6,
  "de-a1-allergie": 3,
  "de-a1-einladung-essen": 6,
  "de-a1-mein-tag": 4,
  "de-a1-uhrzeit": 4,
  "de-a1-trennbar": 4,
  "de-a1-wochentage": 4,
  "de-a1-v2": 6,
  "de-a1-morgenroutine": 4,
  "de-a1-arbeitstag": 5,
  "de-a1-feierabend": 5,
  "de-a1-wochenende-plan": 5,
  "de-a1-zeit-haben": 4,
  "de-a1-kleidung": 3,
  "de-a1-groesse": 3,
  "de-a1-farben": 3,
  "de-a1-preis": 3,
  "de-a1-gefallen": 3,
  "de-a1-umtausch": 3,
  "de-a1-geschenk": 3,
  "de-a1-markt": 3,
  "de-a1-apotheke-kauf": 3,
  "de-a1-online": 3,
  "de-a1-weg": 6,
  "de-a1-bus-bahn": 6,
  "de-a1-ticket": 3,
  "de-a1-verspaetung": 6,
  "de-a1-taxi": 6,
  "de-a1-stadtplan": 6,
  "de-a1-sehenswuerdig": 6,
  "de-a1-verlaufen": 6,
  "de-a1-fahrrad": 6,
  "de-a1-bahnhof-info": 6,
  "de-a1-wohnung-zeigen": 6,
  "de-a1-zimmer": 6,
  "de-a1-moebel": 6,
  "de-a1-nachbarn": 1,
  "de-a1-hausordnung": 6,
  "de-a1-miete-zahlen": 4,
  "de-a1-putzen": 6,
  "de-a1-umzug": 6,
  "de-a1-garten": 6,
  "de-a1-kaputt": 6,
  "de-a1-hobbys": 5,
  "de-a1-koennen": 5,
  "de-a1-sport": 5,
  "de-a1-musik": 5,
  "de-a1-kino": 6,
  "de-a1-wetter-smalltalk": 2,
  "de-a1-park": 6,
  "de-a1-schwimmbad": 5,
  "de-a1-fernsehen": 5,
  "de-a1-absage": 6,
  "de-a1-koerper": 6,
  "de-a1-weh-tun": 6,
  "de-a1-termin-arzt": 4,
  "de-a1-muessen": 6,
  "de-a1-apotheke": 3,
  "de-a1-krank-melden": 6,
  "de-a1-imperativ-du": 6,
  "de-a1-notruf": 6,
  "de-a1-gesund-leben": 6,
  "de-a1-beim-zahnarzt": 6,
  "de-a1-telefonieren": 4,
  "de-a1-nachricht": 6,
  "de-a1-termin-machen": 4,
  "de-a1-einladung": 6,
  "de-a1-perfekt-haben": 6,
  "de-a1-perfekt-sein": 6,
  "de-a1-gestern": 6,
  "de-a1-wochenende-bericht": 5,
  "de-a1-jahreszeiten": 4,
  "de-a1-a1-rueckblick": 1,
};

const FOCUS_GR: [RegExp, Record<CefrLevel, number>][] = [
  [/artikel|plural|nomen|genus/i, { A1: 1, A2: 2, B1: 6, B2: 4, C1: 4 }],
  /* A1: 0 — A1'de Perfekt ifadesi yok; A1.GR.2 Präsens çekimi, Perfekt konuşmasına bağlanmıyor. */
  [/perfekt|partizip|vergangen|prateritum|präteritum/i, { A1: 0, A2: 1, B1: 5, B2: 6, C1: 3 }],
  [/akkusativ|dativ|genitiv|kasus|praeposition|präposition|preposition/i, { A1: 5, A2: 2, B1: 6, B2: 4, C1: 4 }],
  [/weil|dass|wenn|obwohl|nebensatz|relativ|konjunktion/i, { A1: 3, A2: 3, B1: 1, B2: 5, C1: 1 }],
  [/modal|konnen|können|mussen|müssen|wollen|sollen|durfen|dürfen/i, { A1: 4, A2: 4, B1: 2, B2: 2, C1: 3 }],
  [/konjunktiv|wurde|würde|hatte|hätte/i, { A1: 4, A2: 4, B1: 2, B2: 2, C1: 3 }],
  [/passiv/i, { A1: 3, A2: 3, B1: 3, B2: 1, C1: 1 }],
  [/imperativ|befehl/i, { A1: 3, A2: 5, B1: 1, B2: 5, C1: 2 }],
  [/komparativ|superlativ|vergleich|adjektiv/i, { A1: 5, A2: 6, B1: 4, B2: 3, C1: 1 }],
  [/trennbar|v2|satzbau|wortstellung|frage/i, { A1: 3, A2: 3, B1: 1, B2: 5, C1: 1 }],
  [/pronomen|possessiv/i, { A1: 5, A2: 2, B1: 4, B2: 4, C1: 2 }],
];

/**
 * İNGİLİZCE KURSUN dilbilgisi odakları — ayrı tablo, ayrı kimlik bloğu.
 *
 * Yukarıdaki `FOCUS_GR` Almanca kursun kuralları için yazılmış ve düzenli
 * ifadeleri de Almanca ("artikel", "perfekt", "nebensatz"). İngilizce konuşma
 * odakları ("Prepositions-place", "Imperatives", "Superlatives") oraya
 * rastgele düşüyordu: `preposition` A1'de 5 numaraya, yani ZAMİR ifadesine
 * bağlanıyordu. Ölçüldü: 17 İngilizce konuşma yanlış ifadeye bağlıydı.
 *
 * Kimlikler 11'den başlıyor (bkz. `EN_GR_IDS`); bir seviyede karşılığı
 * olmayan odak sessizce düşüyor, çünkü `isCandoId` bilinmeyen kimliği
 * eliyor. Bugün yalnız A1 ve A2 var — İngilizce kursun konuşmaları o iki
 * seviyede.
 */
const FOCUS_GR_EN: [RegExp, Partial<Record<CefrLevel, number>>][] = [
  /* B1 SATIRLARI ÖNDE. Sıra önemli: ilk eşleşen kazanıyor ve A1/A2 desenleri
     geniş. «Modals of obligation» aşağıdaki `/must|have to|…/` satırına düşerdi
     ve o satırın B1 sütunu yok — konuşma sessizce dilbilgisi ifadesiz kalırdı.
     Aynı tuzak «Present perfect vs past simple» için de var (`/past simple/`).
     Desenler B1'e özgü tutuldu ki A1/A2 odakları buraya kaymasın. */
  /* B2 SATIRLARI EN ÖNDE. B1 satırlarının B2 sütunu YOK: bir B2 konuşması
     «Passive report structures» odağıyla aşağıdaki `/passive/i` satırına
     düşseydi `hit[1]["B2"]` undefined dönerdi ve konuşma sessizce ifadesiz
     kalırdı. Desenler B2'ye özgü: «third conditional» yakalanır ama
     «Conditionals» aşağıdaki B1 satırına gitmeye devam eder. */
  /* C1 SATIRLARI HEPSİNDEN ÖNDE, aynı gerekçeyle: B2 satırlarının C1 sütunu
     YOK. Bir C1 konuşması «Reporting verbs and evaluation» odağıyla aşağıdaki
     `/report structure/i` satırına düşseydi `hit[1]["C1"]` undefined döner,
     konuşma sessizce ifadesiz kalırdı. Desenler C1'e özgü: «fronting» yakalanır
     ama «cleft» aşağıdaki B2 satırına gitmeye devam eder. */
  [/ellipsis|substitution|former and the latter/i, { C1: 11 }],
  [/fronting|end.weight|marked word order/i, { C1: 12 }],
  [/subjunctive|formulaic were|lest/i, { C1: 13 }],
  [/concessive|albeit|much as/i, { C1: 14 }],
  [/collocation|delexical|fixed expression/i, { C1: 15 }],
  [/register shift|three registers|register range/i, { C1: 16 }],
  [/reporting verb|evaluation in reporting/i, { C1: 17 }],
  [/modal nuance|remoteness|may well/i, { C1: 18 }],
  [/irony|understatement|implicature/i, { C1: 19 }],
  [/cohesion|text-level reference|signposting/i, { C1: 20 }],
  [/perfect modal|must have|speculation about the past/i, { B2: 11 }],
  [/third conditional|mixed conditional|regret conditional/i, { B2: 12 }],
  [/report structure|it is said|passive reporting/i, { B2: 13 }],
  [/cleft|emphasis/i, { B2: 14 }],
  [/inversion|negative adverbial/i, { B2: 15 }],
  [/participle clause/i, { B2: 16 }],
  [/non-defining|which is why|prepositional relative/i, { B2: 17 }],
  [/future perfect|future continuous/i, { B2: 18 }],
  [/nominalis|nominaliz|formal register/i, { B2: 19 }],
  [/hedging|discourse marker|admittedly|arguably/i, { B2: 20 }],
  [/present perfect vs past|perfect or past/i, { B1: 11 }],
  [/past perfect/i, { B1: 12 }],
  [/future forms|will vs going|arrangements/i, { B1: 13 }],
  [/conditional/i, { B1: 14 }],
  [/relative clause/i, { B1: 15 }],
  [/reported speech|indirect speech/i, { B1: 16 }],
  [/passive/i, { B1: 17 }],
  [/deduction|modals of obligation|obligation and permission/i, { B1: 18 }],
  [/gerund|infinitive|verb patterns/i, { B1: 19 }],
  [/linking words|connectors|although|despite|in order to/i, { B1: 20 }],
  [/to-be|past of be|there-is|there is/i, { A1: 11 }],
  [/article/i, { A1: 12 }],
  [/plural|countable/i, { A1: 13 }],
  [/possessive|have-got|\bhave\b/i, { A1: 14 }],
  [/present.?simple|present-continuous|frequency|routine|habits/i, { A1: 15, A2: 12 }],
  [/preposition|location|directions/i, { A1: 16 }],
  [/imperative|instruction|sequencing/i, { A1: 17, A2: 11 }],
  [/question|wh-|yes-no|word-order|short forms/i, { A1: 18 }],
  [/past simple|irregular past|past time|did|past narrative|used to|past habits/i, { A2: 11 }],
  [/past continuous|when \/ while|contrast past/i, { A2: 12 }],
  [/present perfect|been vs gone|since \/ for|already \/ yet/i, { A2: 13 }],
  [/comparative|superlative|comparing|descriptive/i, { A2: 14 }],
  [/future|going-to|be going to|hope|wishes/i, { A2: 15 }],
  [/must|have to|should|\bcan\b|advice|rules|conditions|purpose/i, { A2: 16 }],
];

export function candoForConversation(conversation: {
  id?: string;
  level: CefrLevel;
  icon: string;
  focusId: string;
  cando?: string[];
  /** Kurs: dilbilgisi ifadesi bundan seçiliyor (varsayılan Almanca). */
  course?: string;
}): string[] {
  if (conversation.cando?.length) return conversation.cando.filter(isCandoId);
  const theme = ICON_THEME[conversation.icon] ?? "social";
  const spk = CONVERSATION_SPK_BY_ID[conversation.id ?? ""] ?? CONVERSATION_SPK[conversation.level][theme];
  const out = [`${conversation.level}.SPK.${spk}`];
  const gr = grammarCando(conversation.course, conversation.level, conversation.focusId);
  if (gr) out.push(gr);
  return out.filter(isCandoId);
}

/** Odak metnine düşen dilbilgisi ifadesi — kurs hangi tabloyu kullanacağını söyler. */
function grammarCando(course: string | undefined, level: CefrLevel, focus: string): string | null {
  if (course === "en") {
    const hit = FOCUS_GR_EN.find(([re]) => re.test(focus));
    const n = hit?.[1][level];
    return n ? `${level}.GR.${n}` : null;
  }
  const n = FOCUS_GR.find(([re]) => re.test(focus))?.[1][level];
  return n ? `${level}.GR.${n}` : null;
}

const SKILL_CODE: Record<SkillId, CandoSkill> = { reading: "RD", listening: "LS", writing: "WR", speaking: "SPK", grammar: "GR" };

/** Tür anahtarı → (seviye başına) ifade numarası; eşleşmezse 1. */
const GENRE_INDEX: [RegExp, Partial<Record<CandoSkill, Record<CefrLevel, number>>>][] = [
  [/mesaj|e-posta|not\b|kartpostal|yarı resmi/i, { RD: { A1: 2, A2: 1, B1: 2, B2: 2, C1: 1 }, WR: { A1: 2, A2: 1, B1: 2, B2: 2, C1: 2 } }],
  [/ilan|duyuru|anons|program|tarife/i, { RD: { A1: 1, A2: 2, B1: 5, B2: 5, C1: 2 }, LS: { A1: 2, A2: 1, B1: 2, B2: 5, C1: 1 } }],
  [/köşe|forum|okur mektubu|deneme|tartışma|yorum/i, { RD: { A1: 4, A2: 4, B1: 1, B2: 1, C1: 4 }, WR: { A1: 5, A2: 3, B1: 1, B2: 1, C1: 1 }, LS: { A1: 5, A2: 3, B1: 3, B2: 2, C1: 2 } }],
  [/resmî|resmi|iş yazışması|tutanak|şikâyet|başvuru/i, { RD: { A1: 3, A2: 3, B1: 2, B2: 2, C1: 2 }, WR: { A1: 1, A2: 4, B1: 2, B2: 2, C1: 2 }, LS: { A1: 4, A2: 5, B1: 4, B2: 5, C1: 3 } }],
  [/rehber|bilgi yazısı|kültür|günlük yaşam/i, { RD: { A1: 4, A2: 5, B1: 3, B2: 3, C1: 2 } }],
  [/telefon|telesekreter|sesli mesaj/i, { LS: { A1: 3, A2: 2, B1: 5, B2: 5, C1: 1 } }],
  [/diyalog|sohbet|tanışma|danışma/i, { LS: { A1: 5, A2: 3, B1: 1, B2: 3, C1: 4 }, SPK: { A1: 1, A2: 1, B1: 3, B2: 4, C1: 3 } }],
  [/radyo|podcast|panel|konferans|röportaj|uzman/i, { LS: { A1: 5, A2: 4, B1: 3, B2: 1, C1: 3 } }],
  [/toplantı/i, { LS: { A1: 4, A2: 5, B1: 4, B2: 5, C1: 3 } }],
  [/ses çalışması/i, { SPK: { A1: 6, A2: 6, B1: 6, B2: 6, C1: 4 } }],
];

export function candoForExercise(ex: { skill: SkillId; level: CefrLevel; genre: string; cando?: string[]; focus?: string; course?: string }): string[] {
  if (ex.cando?.length) return ex.cando.filter(isCandoId);
  const code = SKILL_CODE[ex.skill];
  // Dil bilgisi egzersizi kuralını `focus` alanında adlandırıyor; konuşmanın
  // `focusId`'sini eşleyen tablo burada da iş görür (aynı kural aileleri).
  if (ex.skill === "grammar" && ex.focus) {
    const id = grammarCando(ex.course, ex.level, ex.focus);
    if (id && isCandoId(id)) return [id];
  }
  const hit = GENRE_INDEX.find(([re, map]) => re.test(ex.genre) && map[code]);
  const n = hit ? hit[1][code]![ex.level] : 1;
  const id = `${ex.level}.${code}.${n}`;
  return isCandoId(id) ? [id] : [`${ex.level}.${code}.1`].filter(isCandoId);
}
