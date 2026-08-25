import type { SpeakingMonologueExercise } from "../types";
import type { CefrLevel } from "../types";

/**
 * Monolog görevleri (WP-21): seviye başına dört, 30–60 sn.
 *
 * A1 kişisel bilgi, A2 anlatı (geçmiş), B1 görüş + gerekçe, B2 tartışma,
 * C1 savunma. Örnekler kısa tutuldu (35–70 kelime): öğrencinin hedefi,
 * modelin uzunluğu değil — sonuçta "şöyle de olurdu" diye açılır.
 * Kalıplar (`targets`) rubriğe hedef olarak gider; sonuçta kullanıldı mı
 * işaretlenir.
 */
const m = (
  id: string,
  level: CefrLevel,
  title: string,
  intro: string,
  promptTr: string,
  bulletsTr: string[],
  targets: { de: string; tr: string }[],
  sampleDe: string,
  secs: [number, number] = [30, 60],
  rubricHint?: string,
): SpeakingMonologueExercise => ({
  id,
  level,
  skill: "speaking",
  title,
  genre: "Monolog",
  intro,
  // Sözlükçe yok: kalıplar `monologue.targets`te, oynatıcı onları kendisi gösterir.
  gloss: [],
  minutes: 4,
  monologue: { promptTr, bulletsTr, targets, minSeconds: secs[0], maxSeconds: secs[1], sampleDe, rubricHint },
});

export const monologues: SpeakingMonologueExercise[] = [
  // ── A1 ──
  m("a1-m1", "A1", "Das bin ich", "Kendini 30–45 saniyede tanıtacaksın.", "Kendini tanıt: adın, nereli olduğun, nerede oturduğun, işin ya da okulun, bir hobin.",
    ["Ad ve memleket", "Oturduğun yer", "İş / okul", "Hobi"],
    [{ de: "Ich heiße …", tr: "Adım …" }, { de: "Ich komme aus …", tr: "…'den geliyorum" }, { de: "Ich wohne in …", tr: "…'de oturuyorum" }, { de: "Ich arbeite als …", tr: "… olarak çalışıyorum" }],
    "Hallo! Ich heiße Deniz und ich komme aus der Türkei, aus Izmir. Jetzt wohne ich in Hamburg. Ich arbeite als Ingenieurin bei einer kleinen Firma. Mein Hobby ist Schwimmen; ich gehe zweimal pro Woche ins Schwimmbad. Ich lerne Deutsch, weil ich hier arbeite.", [30, 45]),
  m("a1-m2", "A1", "Mein Tag", "Sıradan bir gününü anlatacaksın.", "Bir gününü anlat: ne zaman kalkıyorsun, sabah ne yapıyorsun, işte/okulda ne var, akşam ne yapıyorsun.",
    ["Kalkış saati", "Sabah rutini", "İş / okul", "Akşam"],
    [{ de: "Ich stehe um … auf.", tr: "… kalkıyorum" }, { de: "Dann …", tr: "Sonra …" }, { de: "Am Abend …", tr: "Akşam …" }],
    "Ich stehe um sieben Uhr auf. Dann trinke ich Kaffee und frühstücke. Um acht Uhr fahre ich mit dem Bus zur Arbeit. Ich arbeite bis fünf Uhr. Am Abend koche ich und sehe ein bisschen fern. Um elf Uhr gehe ich schlafen.", [30, 45]),
  m("a1-m3", "A1", "Meine Familie", "Aileni tanıtacaksın.", "Aileni anlat: kaç kişi, kimler, ne iş yapıyorlar, nerede yaşıyorlar.",
    ["Kaç kişi", "Anne / baba / kardeş", "Meslekler", "Nerede yaşıyorlar"],
    [{ de: "Ich habe …", tr: "… var" }, { de: "Mein Vater / Meine Mutter …", tr: "Babam / annem …" }, { de: "… ist … Jahre alt.", tr: "… yaşında" }],
    "Meine Familie ist klein. Ich habe eine Schwester und keinen Bruder. Meine Schwester ist 25 Jahre alt und studiert in Ankara. Mein Vater ist Lehrer und meine Mutter arbeitet in einem Büro. Sie wohnen in Izmir. Wir telefonieren jeden Sonntag.", [30, 45]),
  m("a1-m4", "A1", "Mein Hobby", "Hobini anlatacaksın.", "Hobini anlat: ne yapıyorsun, ne zaman, kiminle, neden seviyorsun.",
    ["Hobi ne", "Ne zaman", "Kiminle", "Neden"],
    [{ de: "Mein Hobby ist …", tr: "Hobim …" }, { de: "Ich … gern.", tr: "… severim" }, { de: "am Wochenende", tr: "hafta sonu" }],
    "Mein Hobby ist Fußball. Ich spiele am Wochenende mit meinen Freunden im Park. Wir spielen zwei Stunden und dann trinken wir zusammen einen Kaffee. Ich sehe auch gern Fußball im Fernsehen. Fußball macht mir Spaß, weil ich Bewegung brauche.", [30, 45]),

  // ── A2 ──
  m("a2-m1", "A2", "Mein letztes Wochenende", "Geçen hafta sonunu Perfekt ile anlatacaksın.", "Geçen hafta sonunu anlat: ne yaptın, kiminle, nasıldı.",
    ["Cumartesi", "Pazar", "Kiminle", "Nasıldı"],
    [{ de: "Am Samstag habe ich …", tr: "Cumartesi … yaptım" }, { de: "Wir sind … gegangen.", tr: "… gittik" }, { de: "Es war …", tr: "… idi" }],
    "Am Samstag habe ich lange geschlafen. Dann bin ich mit meiner Freundin in die Stadt gefahren und wir haben ein neues Café ausprobiert. Am Abend haben wir einen Film gesehen. Am Sonntag habe ich meine Eltern besucht und wir haben zusammen gekocht. Es war ein ruhiges, aber schönes Wochenende.", [40, 60], "Perfekt bekle; Präsens anlatısı görev puanını düşürür."),
  m("a2-m2", "A2", "Meine Wohnung", "Oturduğun evi anlatacaksın.", "Evini anlat: kaç oda, hangi katta, neyi seviyorsun, neyi sevmiyorsun.",
    ["Oda sayısı ve kat", "En sevdiğin yer", "Sevmediğin bir şey", "Çevre"],
    [{ de: "Meine Wohnung hat …", tr: "Evimin … var" }, { de: "im … Stock", tr: "… katta" }, { de: "Am liebsten …", tr: "En çok …" }],
    "Meine Wohnung hat zwei Zimmer, eine Küche und ein kleines Bad. Sie liegt im dritten Stock, ohne Aufzug. Am liebsten sitze ich auf dem Balkon, weil man von dort den Park sieht. Die Küche ist leider sehr klein. Die U-Bahn ist nur fünf Minuten entfernt, das finde ich praktisch.", [40, 60]),
  m("a2-m3", "A2", "Ein Termin", "Bir randevuyu telesekretere anlatacaksın.", "Doktora telefonda mesaj bırak: kimsin, ne şikâyetin var, ne zaman gelebilirsin, telefon numaran.",
    ["Kim olduğun", "Şikâyet", "Uygun zaman", "Telefon numarası"],
    [{ de: "Ich hätte gern einen Termin.", tr: "Randevu almak istiyorum" }, { de: "Ich habe … Schmerzen.", tr: "… ağrım var" }, { de: "Ich kann am … kommen.", tr: "… gelebilirim" }],
    "Guten Tag, hier spricht Deniz Kaya. Ich hätte gern einen Termin bei Frau Doktor Weber. Ich habe seit drei Tagen starke Halsschmerzen. Ich kann am Montag oder Dienstag am Nachmittag kommen. Meine Telefonnummer ist null eins fünf eins, drei vier fünf sechs sieben. Vielen Dank und auf Wiederhören.", [30, 60]),
  m("a2-m4", "A2", "Meine Stadt", "Yaşadığın şehri tanıtacaksın.", "Şehrini anlat: nerede, ne kadar büyük, neyi seviyorsun, bir ziyaretçiye ne önerirsin.",
    ["Konum ve büyüklük", "Sevdiğin şey", "Sevmediğin şey", "Öneri"],
    [{ de: "… liegt im …", tr: "… -de bulunuyor" }, { de: "Man kann …", tr: "İnsan … yapabilir" }, { de: "Ich empfehle …", tr: "… öneririm" }],
    "Ich wohne in Köln. Die Stadt liegt im Westen von Deutschland am Rhein und hat etwa eine Million Einwohner. Ich mag die Menschen hier, sie sind offen und lustig. Der Verkehr ist aber schlecht. Wenn du Köln besuchst, empfehle ich den Dom und einen Spaziergang am Rhein.", [40, 60]),

  // ── B1 ──
  m("b1-m1", "B1", "Stadt oder Land?", "Şehirde mi köyde mi yaşamak: görüşünü gerekçelendireceksin.", "Şehirde mi kırsalda mı yaşamayı tercih edersin? Görüşünü söyle, iki gerekçe ver, karşı görüşe bir cümle ayır.",
    ["Görüşün", "Gerekçe 1", "Gerekçe 2", "Karşı görüş", "Sonuç"],
    [{ de: "Meiner Meinung nach …", tr: "Bence …" }, { de: "Einerseits … andererseits …", tr: "Bir yandan … öte yandan …" }, { de: "obwohl …", tr: "… -e rağmen" }],
    "Meiner Meinung nach ist das Leben in der Stadt besser, obwohl es teurer ist. Einerseits hat man dort Arbeit, Kultur und gute Verkehrsmittel. Andererseits ist es laut und man hat wenig Natur. Auf dem Land ist es ruhig, aber ohne Auto kommt man nirgendwohin. Deshalb würde ich in einer kleinen Stadt wohnen, die beides bietet.", [45, 60], "Bağlaçlı gerekçe bekle (weil, obwohl, deshalb)."),
  m("b1-m2", "B1", "Eine Erfahrung", "Seni etkileyen bir olayı anlatacaksın.", "Almanca öğrenirken yaşadığın bir olayı anlat: ne oldu, nasıl hissettin, ne öğrendin.",
    ["Ne oldu", "Nerede / ne zaman", "Duyguların", "Ders"],
    [{ de: "Als ich …", tr: "… -dığımda" }, { de: "Ich habe gelernt, dass …", tr: "… öğrendim" }, { de: "Seitdem …", tr: "O zamandan beri …" }],
    "Als ich das erste Mal beim Amt war, habe ich fast nichts verstanden. Die Beamtin hat schnell gesprochen und ich war sehr nervös. Ich habe sie gebeten, langsamer zu sprechen, und sie war freundlich. Ich habe gelernt, dass man ruhig nachfragen darf. Seitdem habe ich weniger Angst vor Gesprächen.", [45, 60]),
  m("b1-m3", "B1", "Handy im Unterricht", "Bir kurala görüş bildireceksin.", "Derste cep telefonu yasağı olmalı mı? Görüşün, iki gerekçe, bir örnek, öneri.",
    ["Görüş", "Gerekçeler", "Örnek", "Öneri"],
    [{ de: "Ich bin dafür / dagegen, dass …", tr: "… lehindeyim / aleyhindeyim" }, { de: "Ein Beispiel dafür ist …", tr: "Buna örnek …" }, { de: "Man sollte …", tr: "… -meli" }],
    "Ich bin dagegen, dass Handys im Unterricht ganz verboten werden. Erstens braucht man sie manchmal zum Nachschlagen, zweitens lernen Schüler so, verantwortlich damit umzugehen. Ein Beispiel dafür ist unsere Deutschklasse: Wir benutzen das Wörterbuch auf dem Handy. Man sollte aber klare Regeln haben, zum Beispiel Handys nur auf Erlaubnis.", [45, 60]),
  m("b1-m4", "B1", "Mein Traumjob", "Hayalindeki işi anlatacaksın.", "Hayalindeki işi anlat: ne, neden, hangi becerileri gerektiriyor, ona ulaşmak için ne yapıyorsun.",
    ["İş ve neden", "Gereken beceriler", "Şu anki adımların", "Beş yıl sonra"],
    [{ de: "Ich würde gern …", tr: "… isterdim" }, { de: "Dafür braucht man …", tr: "Bunun için … gerekir" }, { de: "In fünf Jahren …", tr: "Beş yıl sonra …" }],
    "Ich würde gern als Krankenpflegerin in Deutschland arbeiten, weil ich Menschen helfen möchte. Dafür braucht man gute Deutschkenntnisse, Geduld und eine anerkannte Ausbildung. Im Moment lerne ich für die B2-Prüfung und mache ein Praktikum im Krankenhaus. In fünf Jahren möchte ich fest angestellt sein und vielleicht eine Weiterbildung machen.", [45, 60]),

  // ── B2 ──
  m("b2-m1", "B2", "Homeoffice", "Evden çalışmanın artılarını ve eksilerini tartacaksın.", "Evden çalışma: avantajlar, dezavantajlar, kişisel deneyim ya da örnek, dengeli bir sonuç.",
    ["Avantajlar", "Dezavantajlar", "Örnek", "Sonuç"],
    [{ de: "Ein wesentlicher Vorteil besteht darin, dass …", tr: "Temel bir avantaj …" }, { de: "Allerdings …", tr: "Ancak …" }, { de: "Insgesamt lässt sich sagen, dass …", tr: "Genel olarak …" }],
    "Ein wesentlicher Vorteil des Homeoffice besteht darin, dass man Zeit und Geld für den Arbeitsweg spart und sich die Arbeit flexibler einteilen kann. Allerdings verschwimmen die Grenzen zwischen Arbeit und Freizeit, und der Austausch mit Kollegen leidet. Bei uns im Team hat sich ein Mischmodell bewährt: zwei Tage im Büro, drei zu Hause. Insgesamt lässt sich sagen, dass Homeoffice funktioniert, wenn klare Regeln vereinbart werden.", [50, 75], "Passiv ve Nominalisierung ödüllendir."),
  m("b2-m2", "B2", "Eine Grafik beschreiben", "Bir grafiği sözlü betimleyeceksin.", "Şu grafiği anlat: 2015–2025 arasında Almanya'da bisikletle işe gidenlerin oranı %9'dan %14'e çıktı, 2020'de sıçrama var. Eğilimi betimle, olası nedenleri söyle, yorumla.",
    ["Konu ve kaynak", "Eğilim ve sayılar", "Olası nedenler", "Yorum"],
    [{ de: "Die Grafik zeigt …", tr: "Grafik … gösteriyor" }, { de: "Der Anteil ist von … auf … gestiegen.", tr: "Oran …'den …'e yükseldi" }, { de: "Das lässt sich damit erklären, dass …", tr: "Bu … ile açıklanabilir" }],
    "Die Grafik zeigt, wie sich der Anteil der Berufspendler mit dem Fahrrad in Deutschland zwischen 2015 und 2025 entwickelt hat. Der Anteil ist von neun auf vierzehn Prozent gestiegen, wobei der stärkste Anstieg im Jahr 2020 zu beobachten ist. Das lässt sich vermutlich damit erklären, dass viele Menschen während der Pandemie öffentliche Verkehrsmittel gemieden haben. Meiner Einschätzung nach wird der Trend anhalten, sofern die Städte weiter in Radwege investieren.", [50, 75]),
  m("b2-m3", "B2", "Ehrenamt", "Gönüllü çalışmanın toplumdaki yerini tartışacaksın.", "Gönüllülük zorunlu olmalı mı? Tez, karşı tez, kendi konumun, öneri.",
    ["Tez", "Karşı tez", "Kendi konumun", "Öneri"],
    [{ de: "Befürworter argumentieren, dass …", tr: "Savunanlar … diyor" }, { de: "Dem lässt sich entgegenhalten, dass …", tr: "Buna karşılık …" }, { de: "Ich vertrete die Ansicht, dass …", tr: "… görüşündeyim" }],
    "Befürworter eines verpflichtenden Ehrenamts argumentieren, dass es den Zusammenhalt stärkt und jungen Menschen Verantwortung beibringt. Dem lässt sich entgegenhalten, dass Freiwilligkeit gerade das Wesen des Ehrenamts ausmacht und Zwang die Motivation zerstört. Ich vertrete die Ansicht, dass man Anreize schaffen sollte, etwa Anrechnung im Studium oder steuerliche Vorteile, statt eine Pflicht einzuführen.", [50, 75]),
  m("b2-m4", "B2", "Ein Problem lösen", "Mahalledeki bir soruna çare arayacaksın.", "Mahallende gürültü sorunu var. Sorunu tanımla, iki çözüm öner, birini gerekçeyle seç, uygulamayı anlat.",
    ["Sorun", "Çözüm 1", "Çözüm 2", "Seçim ve gerekçe", "Uygulama"],
    [{ de: "Das Problem besteht darin, dass …", tr: "Sorun şu ki …" }, { de: "Eine Möglichkeit wäre, …", tr: "Bir seçenek …" }, { de: "Ich würde vorschlagen, …", tr: "… önerirdim" }],
    "Das Problem besteht darin, dass in unserer Straße nachts Lieferwagen mit laufendem Motor stehen. Eine Möglichkeit wäre, eine Lieferzone mit festen Zeiten einzurichten. Eine andere wäre, das Ordnungsamt regelmäßig kontrollieren zu lassen. Ich würde die erste Lösung vorschlagen, weil sie die Ursache angeht und nicht nur die Folgen. Dafür müssten wir als Nachbarn einen Antrag beim Bezirksamt stellen.", [50, 75]),

  // ── C1 ──
  m("c1-m1", "C1", "Künstliche Intelligenz im Alltag", "Bir tezi savunacaksın.", "\"Yapay zekâ yaratıcılığı zayıflatır\" tezini ele al: kavramı tanımla, savun ya da çürüt, ayrım yap, nüanslı sonuç.",
    ["Kavram ve tez", "Savunma / çürütme", "Ayrım", "Nüanslı sonuç"],
    [{ de: "Zunächst gilt es zu klären, …", tr: "Önce … açıklığa kavuşturmak gerekir" }, { de: "Es wäre verkürzt zu behaupten, dass …", tr: "… demek eksik olurdu" }, { de: "Entscheidend ist vielmehr, …", tr: "Asıl belirleyici olan …" }],
    "Zunächst gilt es zu klären, was unter Kreativität zu verstehen ist: das Hervorbringen von Neuem, nicht das Kombinieren von Bekanntem. Es wäre verkürzt zu behaupten, dass künstliche Intelligenz diese Fähigkeit schwächt; sie verlagert sie eher. Wer Werkzeuge blind übernimmt, verlernt das eigene Urteil, wer sie hinterfragt, gewinnt Zeit für das Wesentliche. Entscheidend ist vielmehr, ob wir den Umgang damit bewusst gestalten.", [60, 90]),
  m("c1-m2", "C1", "Ein Zitat kommentieren", "Bir alıntıyı yorumlayacaksın.", "\"Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt\" (Wittgenstein). Yorumla, kendi dil öğrenme deneyinle ilişkilendir, sınırlarını göster.",
    ["Anlam", "Kendi deneyimin", "Eleştiri / sınır", "Sonuç"],
    [{ de: "Das Zitat legt nahe, dass …", tr: "Alıntı … ima ediyor" }, { de: "Aus eigener Erfahrung kann ich sagen, …", tr: "Kendi deneyimimden …" }, { de: "Gleichwohl …", tr: "Yine de …" }],
    "Das Zitat legt nahe, dass Denken und Sprache untrennbar sind: Wofür mir das Wort fehlt, das kann ich kaum fassen. Aus eigener Erfahrung kann ich sagen, dass mir mit jedem deutschen Begriff, etwa Feierabend, auch eine Vorstellung zugewachsen ist, die es im Türkischen so nicht gibt. Gleichwohl greift die Formulierung zu weit, denn Erfahrungen gehen der Sprache oft voraus. Die Grenzen verschieben sich also, sie fallen nicht.", [60, 90]),
  m("c1-m3", "C1", "Stellungnahme", "Resmî bir görüş bildireceksin.", "Belediye meclisine sözlü görüş: şehir merkezinde araba yasağı. Tutumunu bildir, üç argüman, karşı argümana yanıt, öneri.",
    ["Tutum", "Üç argüman", "Karşı argüman", "Öneri"],
    [{ de: "Ich spreche mich dafür aus, …", tr: "… lehinde görüş bildiriyorum" }, { de: "Dem Einwand, dass …, ist entgegenzuhalten, …", tr: "… itirazına karşı …" }, { de: "Abschließend möchte ich anregen, …", tr: "Son olarak … öneririm" }],
    "Ich spreche mich dafür aus, den historischen Stadtkern für den privaten Autoverkehr zu sperren. Erstens sinkt die Luftbelastung nachweislich, zweitens gewinnt der Einzelhandel durch mehr Fußgänger, drittens werden Unfälle seltener. Dem Einwand, dass ältere Menschen benachteiligt würden, ist entgegenzuhalten, dass Ausnahmen für Anwohner und ein dichter Bustakt vorgesehen sind. Abschließend möchte ich anregen, die Maßnahme zunächst für ein Jahr zu erproben.", [60, 90]),
  m("c1-m4", "C1", "Ein Projekt präsentieren", "Bir projeyi sunacaksın.", "Kendi seçtiğin bir projeyi (iş, gönüllülük, kişisel) sun: amaç, yöntem, zorluklar, sonuç ve öğrenilenler.",
    ["Amaç", "Yöntem", "Zorluklar", "Sonuç ve ders"],
    [{ de: "Ziel des Projekts war es, …", tr: "Projenin amacı …" }, { de: "Dabei sind wir so vorgegangen, dass …", tr: "Şöyle ilerledik …" }, { de: "Rückblickend …", tr: "Geriye bakınca …" }],
    "Ziel des Projekts war es, für unseren Sprachkurs eine Tandem-Börse aufzubauen, in der sich Lernende mit Muttersprachlern zusammenfinden. Dabei sind wir so vorgegangen, dass wir zunächst den Bedarf abgefragt und dann eine einfache Plattform aufgesetzt haben. Die größte Herausforderung bestand darin, die Verbindlichkeit der Treffen zu sichern. Rückblickend hat sich gezeigt, dass feste Termine und kleine Gruppen wesentlich mehr bewirken als eine offene Liste.", [60, 90]),
];
