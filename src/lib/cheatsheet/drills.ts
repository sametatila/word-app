import type { CefrLevel } from "@/lib/skills/types";
import type { ErrorType } from "@/lib/errors";

/**
 * Dönüştürme drilleri (WP-11).
 *
 * Dilbilgisi tabloları okunuyor, uygulanmıyordu: sütun gizleme mekaniği bir
 * hücreyi HATIRLATIR, kuralı KULLANDIRMAZ. Drill tablonun kuralını cümle
 * üstünde işletir — "Der Mann ist hier" verilir, "Ich sehe den Mann" istenir.
 * Cevap yazılı; eşleştirme WP-10 cümle kütüphanesi (`matchSentence`): yazım
 * sapması ve kelime sırası ayrı ayrı görünür, fark vurgusu aynı bileşen.
 *
 * Her madde tek bir tabloya bağlı (`tableId`) ve tek bir hata tipine
 * (`errorType`, WP-02 sözlüğü): yanlış cevap, profildeki "zayıf noktaların"
 * listesine o tiple düşer. `why` gerekçe satırı Türkçe ve kısa — WP-13
 * "neden" satırıyla aynı tonda.
 *
 * Pilot beş tablo × 12 madde; kalan tablolar WP-73 ile. Kimlik "d:tablo:nn"
 * — sıraya değil içeriğe bağlı kalması için maddeler yeniden numaralanmaz,
 * araya girenler sona eklenir.
 */
export type DrillKind = "transform" | "fill" | "reorder" | "translate";

export type Drill = {
  id: string;
  tableId: string;
  level: CefrLevel;
  kind: DrillKind;
  prompt: {
    /** Verilen Almanca cümle/parça; `fill` türünde "___" boşluk. */
    de?: string;
    /** Türkçe yönerge: ne yapılacak. */
    tr: string;
  };
  /** Beklenen tam cümle. */
  answer: string;
  /** Kabul edilen başka biçimler (boşluk doldurmada yalnız boşluğun kendisi de). */
  alternatives?: string[];
  errorType: ErrorType;
  /** Gerekçe, Türkçe, tek cümle. */
  why: string;
};

const d = (
  tableId: string,
  level: CefrLevel,
  n: number,
  kind: DrillKind,
  tr: string,
  de: string | undefined,
  answer: string,
  errorType: ErrorType,
  why: string,
  alternatives?: string[],
): Drill => ({
  id: `d:${tableId}:${String(n).padStart(2, "0")}`,
  tableId,
  level,
  kind,
  prompt: { de, tr },
  answer,
  alternatives,
  errorType,
  why,
});

const A1_ARTIKEL: Drill[] = [
  d("a1-artikel", "A1", 1, "transform", "Nesne yap (Akkusativ): Ich sehe …", "Der Mann ist hier.", "Ich sehe den Mann.", "case", "Eril isim nesne olunca der → den; Akkusativ'de değişen tek artikel erildir."),
  d("a1-artikel", "A1", 2, "fill", "Boşluğu doldur: bir köpeğim var (ein Hund)", "Ich habe ___ Hund.", "Ich habe einen Hund.", "case", "haben nesnesini Akkusativ'de ister: ein → einen (eril).", ["einen"]),
  d("a1-artikel", "A1", 3, "fill", "Boşluğu doldur: kadına yardım ediyorum (die Frau)", "Ich helfe ___ Frau.", "Ich helfe der Frau.", "case", "helfen Dativ alır; dişil Dativ die → der.", ["der"]),
  d("a1-artikel", "A1", 4, "fill", "Boşluğu doldur: topla oynuyor (der Ball)", "Das Kind spielt mit ___ Ball.", "Das Kind spielt mit dem Ball.", "case", "mit her zaman Dativ: der → dem.", ["dem"]),
  d("a1-artikel", "A1", 5, "fill", "Boşluğu doldur: kitabı alıyorum (das Buch)", "Ich kaufe ___ Buch.", "Ich kaufe das Buch.", "case", "Nötr isim Akkusativ'de değişmez: das kalır.", ["das"]),
  d("a1-artikel", "A1", 6, "fill", "Boşluğu doldur: çocuklarla gidiyoruz (die Kinder)", "Wir fahren mit ___ Kindern.", "Wir fahren mit den Kindern.", "case", "Dativ çoğul: artikel den, isim de -n alır (Kindern).", ["den"]),
  d("a1-artikel", "A1", 7, "transform", "Aynı kişiye yardım et (Dativ): Ich helfe …", "Ich sehe die Frau.", "Ich helfe der Frau.", "case", "sehen Akkusativ, helfen Dativ: die Frau → der Frau."),
  d("a1-artikel", "A1", 8, "translate", "Almancaya çevir: Öğretmene bir mektup yazıyorum. (der Lehrer, der Brief)", undefined, "Ich schreibe dem Lehrer einen Brief.", "case", "Kime → Dativ (dem Lehrer), neyi → Akkusativ (einen Brief)."),
  d("a1-artikel", "A1", 9, "fill", "Boşluğu doldur: hiç vaktim yok (kein + die Zeit)", "Ich habe ___ Zeit.", "Ich habe keine Zeit.", "case", "kein, ein gibi çekilir: dişil Akkusativ keine.", ["keine"]),
  d("a1-artikel", "A1", 10, "fill", "Boşluğu doldur: sinemaya gidiyorum (in + das Kino)", "Ich gehe ___ Kino.", "Ich gehe ins Kino.", "case", "Hedef (wohin?) Akkusativ: in das → ins kaynaşır.", ["ins", "in das", "Ich gehe in das Kino."]),
  d("a1-artikel", "A1", 11, "fill", "Boşluğu doldur: doktorda (bei + der Arzt)", "Er ist ___ Arzt.", "Er ist beim Arzt.", "case", "bei Dativ alır: bei dem → beim.", ["beim", "bei dem", "Er ist bei dem Arzt."]),
  d("a1-artikel", "A1", 12, "transform", "Nesne yap (Akkusativ): Ich sehe …", "Ein Mann wartet.", "Ich sehe einen Mann.", "case", "Belirsiz artikel eril Akkusativ: ein → einen."),
];

const A1_PRONOMEN: Drill[] = [
  d("a1-pronomen", "A1", 1, "transform", "İsmi zamirle değiştir", "Ich sehe den Mann.", "Ich sehe ihn.", "case", "den Mann Akkusativ eril → ihn."),
  d("a1-pronomen", "A1", 2, "transform", "İsmi zamirle değiştir", "Ich helfe der Frau.", "Ich helfe ihr.", "case", "der Frau Dativ dişil → ihr."),
  d("a1-pronomen", "A1", 3, "transform", "İsmi zamirle değiştir", "Kennst du das Kind?", "Kennst du es?", "case", "das Kind nötr; Akkusativ'de es."),
  d("a1-pronomen", "A1", 4, "transform", "Her iki ismi zamirle değiştir", "Ich gebe dem Kind das Buch.", "Ich gebe es ihm.", "case", "İki zamir varsa sıra önce Akkusativ (es), sonra Dativ (ihm)."),
  d("a1-pronomen", "A1", 5, "fill", "Boşluğu doldur: anahtar bende (der Schlüssel)", "Wo ist der Schlüssel? — Ich habe ___.", "Ich habe ihn.", "case", "Eşya da cinsiyet taşır: der Schlüssel → ihn, es değil.", ["ihn"]),
  d("a1-pronomen", "A1", 6, "fill", "Boşluğu doldur: sana teşekkür ederim (du)", "Ich danke ___.", "Ich danke dir.", "case", "danken Dativ alır: du → dir.", ["dir"]),
  d("a1-pronomen", "A1", 7, "fill", "Boşluğu doldur: beni seviyor (ich)", "Er liebt ___.", "Er liebt mich.", "case", "lieben Akkusativ: ich → mich.", ["mich"]),
  d("a1-pronomen", "A1", 8, "fill", "Boşluğu doldur: sizi ziyaret ediyoruz (ihr)", "Wir besuchen ___.", "Wir besuchen euch.", "case", "ihr'in Akkusativ'i euch.", ["euch"]),
  d("a1-pronomen", "A1", 9, "fill", "Boşluğu doldur: size yardım edebilir miyim? (Sie)", "Kann ich ___ helfen?", "Kann ich Ihnen helfen?", "case", "helfen Dativ: Sie → Ihnen (büyük harfle).", ["Ihnen"]),
  d("a1-pronomen", "A1", 10, "fill", "Boşluğu doldur: hediye bizim için (wir)", "Das Geschenk ist für ___.", "Das Geschenk ist für uns.", "case", "für Akkusativ alır: wir → uns.", ["uns"]),
  d("a1-pronomen", "A1", 11, "transform", "Her iki ismi zamirle değiştir", "Ich zeige den Kindern das Bild.", "Ich zeige es ihnen.", "case", "das Bild → es (Akk), den Kindern → ihnen (Dativ çoğul); önce Akkusativ."),
  d("a1-pronomen", "A1", 12, "translate", "Almancaya çevir: Seni görüyorum.", undefined, "Ich sehe dich.", "case", "sehen Akkusativ: du → dich."),
];

const A1_PERFEKT: Drill[] = [
  d("a1-perfekt", "A1", 1, "transform", "Perfekt'e çevir", "Ich mache die Hausaufgaben.", "Ich habe die Hausaufgaben gemacht.", "conjugation", "Düzenli fiil: ge- + mach + -t; yardımcı haben."),
  d("a1-perfekt", "A1", 2, "transform", "Perfekt'e çevir", "Wir sehen einen Film.", "Wir haben einen Film gesehen.", "conjugation", "Düzensiz fiil: ge- + seh + -en; nesne var → haben."),
  d("a1-perfekt", "A1", 3, "transform", "Perfekt'e çevir", "Er geht nach Hause.", "Er ist nach Hause gegangen.", "conjugation", "Yer değiştirme → sein: ist gegangen."),
  d("a1-perfekt", "A1", 4, "transform", "Perfekt'e çevir", "Sie kommt um acht.", "Sie ist um acht gekommen.", "conjugation", "kommen hareket fiili → sein: ist gekommen."),
  d("a1-perfekt", "A1", 5, "transform", "Perfekt'e çevir", "Ich stehe früh auf.", "Ich bin früh aufgestanden.", "conjugation", "Ayrılabilen fiil: auf-ge-standen; durum değişimi → sein."),
  d("a1-perfekt", "A1", 6, "transform", "Perfekt'e çevir", "Du bezahlst die Rechnung.", "Du hast die Rechnung bezahlt.", "conjugation", "be- önekli fiilde ge- yok: bezahlt."),
  d("a1-perfekt", "A1", 7, "transform", "Perfekt'e çevir", "Ich studiere in Berlin.", "Ich habe in Berlin studiert.", "conjugation", "-ieren fiillerinde ge- yok: studiert."),
  d("a1-perfekt", "A1", 8, "transform", "Perfekt'e çevir", "Wir bleiben zu Hause.", "Wir sind zu Hause geblieben.", "conjugation", "bleiben üç istisnadan biri: sein ile."),
  d("a1-perfekt", "A1", 9, "transform", "Perfekt'e çevir", "Ich denke an dich.", "Ich habe an dich gedacht.", "conjugation", "Karışık fiil: kök değişir, -t alır: gedacht."),
  d("a1-perfekt", "A1", 10, "transform", "Perfekt'e çevir", "Sie fährt nach Köln.", "Sie ist nach Köln gefahren.", "conjugation", "Nesnesiz fahren yer değiştirme → sein: ist gefahren."),
  d("a1-perfekt", "A1", 11, "transform", "Perfekt'e çevir", "Ich esse eine Pizza.", "Ich habe eine Pizza gegessen.", "conjugation", "essen düzensiz: gegessen (çift g); haben."),
  d("a1-perfekt", "A1", 12, "transform", "Perfekt'e çevir", "Ich schlafe ein.", "Ich bin eingeschlafen.", "conjugation", "einschlafen durum değişimi → sein; ein-ge-schlafen."),
];

const A2_NEBENSATZ: Drill[] = [
  d("a2-nebensatz", "A2", 1, "transform", "İki cümleyi weil ile bağla", "Ich bleibe zu Hause. Ich bin krank.", "Ich bleibe zu Hause, weil ich krank bin.", "verb_position", "weil yan cümle kurar: çekimli fiil (bin) sona gider."),
  d("a2-nebensatz", "A2", 2, "transform", "dass ile bağla", "Ich weiß es. Du hast recht.", "Ich weiß, dass du recht hast.", "verb_position", "dass yan cümlesinde fiil (hast) sonda."),
  d("a2-nebensatz", "A2", 3, "transform", "wenn ile bağla", "Ich komme. Ich habe Zeit.", "Ich komme, wenn ich Zeit habe.", "verb_position", "wenn yan cümlesinde fiil sona: … Zeit habe.", ["Wenn ich Zeit habe, komme ich."]),
  d("a2-nebensatz", "A2", 4, "transform", "obwohl ile bağla", "Ich gehe raus. Es regnet.", "Ich gehe raus, obwohl es regnet.", "verb_position", "obwohl yan cümle bağlacı: fiil sonda (regnet)."),
  d("a2-nebensatz", "A2", 5, "transform", "ob ile bağla", "Ich weiß nicht. Er kommt.", "Ich weiß nicht, ob er kommt.", "verb_position", "ob dolaylı evet/hayır sorusu; fiil sonda."),
  d("a2-nebensatz", "A2", 6, "transform", "deshalb ile bağla", "Ich bin krank. Ich bleibe zu Hause.", "Ich bin krank, deshalb bleibe ich zu Hause.", "verb_position", "deshalb birinci sırayı kaplar: fiil hemen arkasına, özne sonraya (bleibe ich)."),
  d("a2-nebensatz", "A2", 7, "transform", "denn ile bağla", "Ich bleibe zu Hause. Ich bin krank.", "Ich bleibe zu Hause, denn ich bin krank.", "verb_position", "denn ana cümle bağlacı: sıra değişmez, fiil 2. sırada kalır."),
  d("a2-nebensatz", "A2", 8, "transform", "weil yerine denn kullan", "Ich lerne Deutsch, weil ich in Berlin arbeite.", "Ich lerne Deutsch, denn ich arbeite in Berlin.", "verb_position", "denn'den sonra ana cümle dizilişi: özne + fiil (ich arbeite)."),
  d("a2-nebensatz", "A2", 9, "transform", "damit ile bağla", "Ich spare. Ich kann reisen.", "Ich spare, damit ich reisen kann.", "verb_position", "damit yan cümlesinde çekimli fiil (kann) en sona, mastar önüne."),
  d("a2-nebensatz", "A2", 10, "transform", "Yan cümleyle başla", "Ich komme, wenn ich Zeit habe.", "Wenn ich Zeit habe, komme ich.", "verb_position", "Yan cümle önde ise ana cümlenin fiili virgülden hemen sonra: komme ich."),
  d("a2-nebensatz", "A2", 11, "transform", "dass ile bağla", "Er sagt es. Er hat keine Zeit.", "Er sagt, dass er keine Zeit hat.", "verb_position", "dass yan cümlesinde hat sona gider."),
  d("a2-nebensatz", "A2", 12, "transform", "weil yerine deshalb ile söyle", "Ich bleibe zu Hause, weil ich krank bin.", "Ich bin krank, deshalb bleibe ich zu Hause.", "verb_position", "Sebep önce, sonuç deshalb ile: deshalb + fiil + özne."),
];

const A2_WECHSEL: Drill[] = [
  d("a2-wechselpraepositionen", "A2", 1, "fill", "Boşluğu doldur: mutfağa gidiyorum (die Küche)", "Ich gehe in ___ Küche.", "Ich gehe in die Küche.", "case", "wohin? → Akkusativ: in die Küche.", ["die"]),
  d("a2-wechselpraepositionen", "A2", 2, "fill", "Boşluğu doldur: mutfaktayım (die Küche)", "Ich bin in ___ Küche.", "Ich bin in der Küche.", "case", "wo? → Dativ: in der Küche.", ["der"]),
  d("a2-wechselpraepositionen", "A2", 3, "fill", "Boşluğu doldur: kitabı masaya koyuyorum (der Tisch)", "Ich lege das Buch auf ___ Tisch.", "Ich lege das Buch auf den Tisch.", "case", "legen hareket → wohin? → Akkusativ: auf den Tisch.", ["den"]),
  d("a2-wechselpraepositionen", "A2", 4, "fill", "Boşluğu doldur: kitap masada duruyor (der Tisch)", "Das Buch liegt auf ___ Tisch.", "Das Buch liegt auf dem Tisch.", "case", "liegen durum → wo? → Dativ: auf dem Tisch.", ["dem"]),
  d("a2-wechselpraepositionen", "A2", 5, "fill", "Boşluğu doldur: kedi masanın altına giriyor (der Tisch)", "Die Katze geht unter ___ Tisch.", "Die Katze geht unter den Tisch.", "case", "gehen + hedef → Akkusativ: unter den Tisch.", ["den"]),
  d("a2-wechselpraepositionen", "A2", 6, "fill", "Boşluğu doldur: yanımda oturuyor (ich)", "Er sitzt neben ___.", "Er sitzt neben mir.", "case", "sitzen durum → Dativ: neben mir.", ["mir"]),
  d("a2-wechselpraepositionen", "A2", 7, "fill", "Boşluğu doldur: yanıma otur! (ich)", "Setz dich neben ___!", "Setz dich neben mich!", "case", "sich setzen hareket → Akkusativ: neben mich.", ["mich"]),
  d("a2-wechselpraepositionen", "A2", 8, "transform", "Sonucu söyle: şişe şimdi nerede? (stehen)", "Ich stelle die Flasche auf den Tisch.", "Die Flasche steht auf dem Tisch.", "case", "stellen → stehen; durum olunca Dativ: auf dem Tisch."),
  d("a2-wechselpraepositionen", "A2", 9, "transform", "Sonucu söyle: kitap şimdi nerede? (liegen)", "Ich lege das Buch auf den Tisch.", "Das Buch liegt auf dem Tisch.", "case", "legen → liegen; wo? → Dativ."),
  d("a2-wechselpraepositionen", "A2", 10, "fill", "Boşluğu doldur: resmi kanepenin üstüne asıyorum (das Sofa)", "Ich hänge das Bild über ___ Sofa.", "Ich hänge das Bild über das Sofa.", "case", "hängen (asmak) hareket → Akkusativ: über das Sofa.", ["das"]),
  d("a2-wechselpraepositionen", "A2", 11, "fill", "Boşluğu doldur: resim kanepenin üstünde asılı (das Sofa)", "Das Bild hängt über ___ Sofa.", "Das Bild hängt über dem Sofa.", "case", "hängen (asılı olmak) durum → Dativ: über dem Sofa.", ["dem"]),
  d("a2-wechselpraepositionen", "A2", 12, "fill", "Boşluğu doldur: kitapların arasında duruyor (die Bücher)", "Es steht zwischen ___ Büchern.", "Es steht zwischen den Büchern.", "case", "stehen durum → Dativ çoğul: den Büchern (-n).", ["den"]),
];

export const DRILLS: Drill[] = [...A1_ARTIKEL, ...A1_PRONOMEN, ...A1_PERFEKT, ...A2_NEBENSATZ, ...A2_WECHSEL];

const BY_ID = new Map(DRILLS.map((x) => [x.id, x]));
const BY_TABLE = new Map<string, Drill[]>();
for (const x of DRILLS) BY_TABLE.set(x.tableId, [...(BY_TABLE.get(x.tableId) ?? []), x]);

export function drillById(id: string): Drill | undefined {
  return BY_ID.get(id);
}

export function drillsFor(tableId: string): Drill[] {
  return BY_TABLE.get(tableId) ?? [];
}

export const DRILL_KIND_LABELS: Record<DrillKind, string> = {
  transform: "dönüştür",
  fill: "boşluk",
  reorder: "sırala",
  translate: "çevir",
};
