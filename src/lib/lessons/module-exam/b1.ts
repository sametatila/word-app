import type { ModuleExamPlan } from "./types";

/**
 * B1 modül sınavlarının elle yazılan içeriği (müfredatın üretilmiş modülleri).
 *
 * B1'de metinlerin işi değişiyor: artık bilgi taşımıyorlar, bir DURUŞ
 * taşıyorlar (bir ret mektubu, bir gider hesabı, bir forum yazısı) ve soru
 * "ne yazıyor" değil "ne demeye getiriyor" diye soruyor. Yazma görevleri de
 * bu yüzden uzun: 70–80 kelime altında B1 üretimi ölçülemiyor.
 */
export const B1_EXAMS: ModuleExamPlan[] = [
  {
    level: "B1",
    index: 0,
    code: "B1.1",
    titleDe: "Arbeitswelt und Bewerbung",
    titleTr: "İş dünyası",
    focus: [
      { de: "Nebensatz mit weil und obwohl", tr: "sebep ve zıtlık" },
      { de: "Präteritum im Lebenslauf", tr: "özgeçmişin zamanı" },
      { de: "um … zu + Infinitiv", tr: "amaç bildirmek" },
      { de: "indirekte Frage", tr: "„…nasıl olduğunu söyleyebilir misiniz“" },
      { de: "Konjunktiv II", tr: "kibar rica ve dilek" },
    ],
    canDo: [
      { de: "Ich kann mich in einem Vorstellungsgespräch vorstellen.", tr: "İş görüşmesinde kendimi tanıtabiliyorum.", en: "I can introduce myself in a job interview." },
      { de: "Ich kann meinen Werdegang zusammenhängend erzählen.", tr: "Kariyer geçmişimi bütünlüklü anlatabiliyorum.", en: "I can describe my career path coherently." },
      { de: "Ich kann über Stärken und Schwächen sprechen.", tr: "Güçlü ve zayıf yönlerimden bahsedebiliyorum.", en: "I can talk about strengths and weaknesses." },
      { de: "Ich kann meine Motivation mit „um … zu“ begründen.", tr: "Motivasyonumu amaç cümlesiyle gerekçelendirebiliyorum.", en: "I can justify my motivation with a purpose clause." },
      { de: "Ich kann höfliche Fragen und Bitten formulieren.", tr: "Kibar soru ve rica cümleleri kurabiliyorum.", en: "I can formulate polite questions and requests." },
    ],
    listening: {
      title: "Das Vorstellungsgespräch",
      titleTr: "İş görüşmesi",
      situation: "Bir aday insan kaynakları uzmanıyla görüşüyor.",
      turns: [
        { speaker: "Personalerin", de: "Frau Kaya, erzählen Sie doch kurz von Ihrem Werdegang.", tr: "Bayan Kaya, kariyer geçmişinizden kısaca bahseder misiniz?" },
        { speaker: "Frau Kaya", de: "Gern. Ich habe in Izmir Betriebswirtschaft studiert und arbeitete danach vier Jahre in einer Spedition. Vor zwei Jahren wechselte ich in den Kundenservice.", tr: "Tabii. İzmir'de işletme okudum, ardından dört yıl bir nakliye şirketinde çalıştım. İki yıl önce müşteri hizmetlerine geçtim." },
        { speaker: "Personalerin", de: "Und warum möchten Sie zu uns?", tr: "Peki neden bize gelmek istiyorsunuz?" },
        { speaker: "Frau Kaya", de: "Ich bewerbe mich, um mehr Verantwortung zu übernehmen. Obwohl mir mein Team gefällt, gibt es dort kaum Entwicklungsmöglichkeiten.", tr: "Daha fazla sorumluluk almak için başvuruyorum. Ekibimi sevsem de orada gelişim imkânı neredeyse yok." },
        { speaker: "Personalerin", de: "Verstehe. Hätten Sie eine Frage an uns?", tr: "Anlıyorum. Bize bir sorunuz var mı?" },
        { speaker: "Frau Kaya", de: "Ja — könnten Sie mir sagen, wie die Einarbeitung abläuft?", tr: "Evet — işe alışma sürecinin nasıl işlediğini söyleyebilir misiniz?" },
        { speaker: "Personalerin", de: "Natürlich. In den ersten vier Wochen begleitet Sie eine feste Ansprechpartnerin.", tr: "Tabii. İlk dört hafta size sabit bir sorumlu eşlik ediyor." },
      ],
      questions: [
        { de: "Wo hat Frau Kaya nach dem Studium gearbeitet?", tr: "Bayan Kaya okuldan sonra nerede çalıştı?", options: ["Im Kundenservice", "In einer Spedition", "An einer Universität", "Bei einer Bank"], answer: 1 },
        { de: "Warum möchte sie wechseln?", tr: "Neden iş değiştirmek istiyor?", options: ["Das Gehalt ist zu niedrig", "Sie möchte mehr Verantwortung", "Ihr Team ist unfreundlich", "Der Weg ist zu weit"], answer: 1 },
        { de: "Wonach fragt Frau Kaya?", tr: "Bayan Kaya neyi soruyor?", options: ["Nach dem Gehalt", "Nach der Einarbeitung", "Nach den Überstunden", "Nach dem Urlaub"], answer: 1 },
      ],
    },
    reading: {
      title: "Eine Absage",
      titleTr: "Ret yazısı",
      genre: "Resmî e-posta",
      text: "Sehr geehrte Frau Kaya,\n\nvielen Dank für Ihre Bewerbung und für das freundliche Gespräch am 12. April. Wir haben uns die Unterlagen aller Kandidatinnen und Kandidaten genau angesehen.\n\nLeider müssen wir Ihnen mitteilen, dass wir uns für eine andere Person entschieden haben. Der Grund liegt nicht an Ihrer Qualifikation: Die ausgewählte Bewerberin hatte bereits mehrere Jahre in derselben Branche gearbeitet.\n\nGern behalten wir Ihre Unterlagen sechs Monate, falls Sie einverstanden sind. Für Ihren weiteren Weg wünschen wir Ihnen alles Gute.\n\nMit freundlichen Grüßen\nPetra Lohmann, Personalabteilung",
      questions: [
        { de: "Was ist das Ergebnis der Bewerbung?", tr: "Başvurunun sonucu ne?", options: ["Frau Kaya bekommt die Stelle", "Frau Kaya bekommt eine Absage", "Sie wird zu einem zweiten Gespräch eingeladen", "Die Stelle wurde gestrichen"], answer: 1 },
        { de: "Warum hat die andere Bewerberin die Stelle bekommen?", tr: "Diğer aday işi neden aldı?", options: ["Sie war günstiger", "Sie hatte schon Erfahrung in der Branche", "Sie wohnt näher", "Sie sprach besser Deutsch"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "İş görüşmesinde motivasyonunu anlatıyorsun.", de: "Ich bewerbe mich bei Ihnen, um mehr Verantwortung zu übernehmen und mich weiterzuentwickeln.", tr: "Daha fazla sorumluluk almak ve kendimi geliştirmek için size başvuruyorum." },
      { situation: "Görüşmenin sonunda kibarca soru soruyorsun.", de: "Könnten Sie mir sagen, wie die Einarbeitung bei Ihnen abläuft?", tr: "İşe alışma sürecinin nasıl işlediğini söyleyebilir misiniz?" },
    ],
    writing: {
      prompt: "Bir iş ilanına başvuru mektubu (Anschreiben) yaz.",
      checklist: [
        "Hangi pozisyona başvurduğunu ve nereden gördüğünü yaz",
        "Deneyimini kısaca anlat",
        "Motivasyonunu „um … zu“ ile yaz",
        "Kibar bir soru ya da kapanış cümlesi kur",
      ],
      minWords: 70,
      phrases: [
        { de: "Mit großem Interesse habe ich Ihre Anzeige gelesen.", tr: "İlanınızı büyük ilgiyle okudum.", en: "I read your advertisement with great interest." },
        { de: "Ich bewerbe mich, um … zu …", tr: "… yapmak için başvuruyorum", en: "I am applying in order to …" },
        { de: "Nach meinem Studium arbeitete ich …", tr: "Öğrenimimden sonra … çalıştım", en: "After my studies I worked …" },
        { de: "Meine Stärke liegt in …", tr: "Güçlü yönüm …", en: "My strength lies in …" },
        { de: "Über eine Einladung würde ich mich sehr freuen.", tr: "Bir görüşme daveti beni çok sevindirir.", en: "I would be delighted to be invited for an interview." },
      ],
      sample:
        "Sehr geehrte Frau Lohmann,\n\nmit großem Interesse habe ich Ihre Anzeige für die Stelle im Kundenservice gelesen. Ich bewerbe mich, um meine Erfahrung in einem größeren Team einzubringen.\n\nNach meinem Studium in Izmir arbeitete ich vier Jahre in einer Spedition, zuletzt war ich für die Betreuung von Firmenkunden zuständig. Obwohl mir die Arbeit dort gefällt, suche ich eine Aufgabe mit mehr Verantwortung. Meine Stärke liegt im ruhigen Umgang mit schwierigen Situationen; an meinem schriftlichen Deutsch arbeite ich weiter.\n\nÜber eine Einladung zu einem Gespräch würde ich mich sehr freuen. Könnten Sie mir mitteilen, bis wann Sie eine Entscheidung treffen?\n\nMit freundlichen Grüßen\nSelin Kaya",
    },
  },

  {
    level: "B1",
    index: 1,
    code: "B1.2",
    titleDe: "Wohnen und Mietrecht",
    titleTr: "Ev ve kira dünyası",
    focus: [
      { de: "Konjunktiv II", tr: "Könnten Sie …? / Wäre es möglich …?" },
      { de: "indirekte Frage", tr: "Ich wüsste gern, ob …" },
      { de: "Passiv", tr: "Die Kaution wird gezahlt." },
      { de: "Adjektivdeklination", tr: "der große helle Raum" },
      { de: "bevor / während / obwohl", tr: "zaman ve zıtlık bağlaçları" },
    ],
    canDo: [
      { de: "Ich kann bei einer Besichtigung gezielt Fragen stellen.", tr: "Daire gezerken yerinde sorular sorabiliyorum.", en: "I can ask targeted questions during a viewing." },
      { de: "Ich kann höflich bitten und nachfragen.", tr: "Kibarca rica edip sorabiliyorum.", en: "I can make polite requests and follow-up questions." },
      { de: "Ich kann Passivsätze verstehen und bilden.", tr: "Edilgen cümleleri anlayıp kurabiliyorum.", en: "I can understand and form passive sentences." },
      { de: "Ich kann einen Schaden schriftlich melden und eine Frist setzen.", tr: "Bir arızayı yazılı bildirip süre verebiliyorum.", en: "I can report a defect in writing and set a deadline." },
      { de: "Ich kann einer Abrechnung widersprechen.", tr: "Bir hesaba itiraz edebiliyorum.", en: "I can object to a statement of costs." },
    ],
    listening: {
      title: "Die Wohnungsbesichtigung",
      titleTr: "Daire gezme",
      situation: "Bir kiracı adayı daireyi geziyor ve ayrıntıları soruyor.",
      turns: [
        { speaker: "Interessent", de: "Guten Tag. Ich wüsste gern, ob die Wohnung schon renoviert ist.", tr: "İyi günler. Dairenin tadilatlı olup olmadığını öğrenmek isterim." },
        { speaker: "Vermieterin", de: "Das Bad wurde letztes Jahr komplett renoviert, die Küche ist älter.", tr: "Banyo geçen yıl tamamen yenilendi, mutfak daha eski." },
        { speaker: "Interessent", de: "Und wie hoch sind die Nebenkosten?", tr: "Peki aidat ne kadar?" },
        { speaker: "Vermieterin", de: "180 Euro monatlich. Heizung und Wasser sind enthalten, Strom nicht.", tr: "Aylık 180 euro. Isıtma ve su dahil, elektrik değil." },
        { speaker: "Interessent", de: "Könnten Sie mir sagen, wann ich einziehen könnte?", tr: "Ne zaman taşınabileceğimi söyleyebilir misiniz?" },
        { speaker: "Vermieterin", de: "Ab dem ersten Oktober. Die Kaution wird bei der Vertragsunterschrift gezahlt — drei Kaltmieten.", tr: "1 Ekim'den itibaren. Depozito sözleşme imzasında ödeniyor — üç kira bedeli." },
        { speaker: "Interessent", de: "Wäre es möglich, die Kaution in drei Raten zu zahlen?", tr: "Depozitoyu üç taksitte ödemek mümkün olur mu?" },
        { speaker: "Vermieterin", de: "Ja, das ist gesetzlich erlaubt.", tr: "Evet, yasal olarak buna izin var." },
      ],
      questions: [
        { de: "Was wurde letztes Jahr renoviert?", tr: "Geçen yıl ne yenilendi?", options: ["Die Küche", "Das Bad", "Das Wohnzimmer", "Das ganze Haus"], answer: 1 },
        { de: "Was ist in den Nebenkosten nicht enthalten?", tr: "Aidata dahil olmayan ne?", options: ["Heizung", "Wasser", "Strom", "Müll"], answer: 2 },
        { de: "Wie kann die Kaution gezahlt werden?", tr: "Depozito nasıl ödenebilir?", options: ["Nur auf einmal", "In drei Raten", "Erst nach dem Einzug", "Gar nicht"], answer: 1 },
      ],
    },
    reading: {
      title: "Nebenkostenabrechnung",
      titleTr: "Gider hesabı",
      genre: "Resmî mektup",
      text: "Nebenkostenabrechnung für das Jahr 2025\n\nSehr geehrte Frau Demir,\n\nnachstehend erhalten Sie die Abrechnung für Ihre Wohnung in der Lindenstraße 8.\n\nVorauszahlungen: 12 × 180,00 € = 2.160,00 €\nTatsächliche Kosten: 2.517,40 €\nNachzahlung: 357,40 €\n\nDer Betrag wird am 1. März von Ihrem Konto abgebucht. Die Erhöhung ergibt sich vor allem aus den gestiegenen Heizkosten.\n\nDie Belege können innerhalb von vier Wochen in unserem Büro eingesehen werden. Ein Widerspruch muss schriftlich erfolgen.\n\nMit freundlichen Grüßen\nHausverwaltung Kruse",
      questions: [
        { de: "Wie hoch ist die Nachzahlung?", tr: "Ek ödeme ne kadar?", options: ["180,00 €", "2.160,00 €", "357,40 €", "2.517,40 €"], answer: 2 },
        { de: "Was muss man tun, wenn man nicht einverstanden ist?", tr: "Kabul etmiyorsa ne yapmalı?", options: ["Anrufen", "Schriftlich widersprechen", "Nicht zahlen", "Ausziehen"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Ev sahibine kibar bir soru soruyorsun.", de: "Könnten Sie mir sagen, ob die Nebenkosten die Heizung enthalten?", tr: "Aidatın ısıtmayı kapsayıp kapsamadığını söyleyebilir misiniz?" },
      { situation: "Arıza için süre veriyorsun.", de: "Die Heizung tropft seit einer Woche. Ich bitte darum, dass der Schaden bis Freitag repariert wird.", tr: "Kalorifer bir haftadır damlıyor. Arızanın cumaya kadar giderilmesini rica ediyorum." },
    ],
    writing: {
      prompt: "Ev sahibine bir arızayı bildiren ve süre veren resmî bir e-posta yaz.",
      checklist: [
        "Arızayı ve ne zamandır sürdüğünü yaz",
        "En az bir kibar rica cümlesi kur",
        "Bir tarih ya da süre ver",
        "Bir edilgen (Passiv) cümle kullan",
      ],
      minWords: 70,
      phrases: [
        { de: "Ich wohne seit … in …", tr: "…'dan beri …'da oturuyorum", en: "I have been living in … since …" },
        { de: "Seit … tropft / funktioniert … nicht.", tr: "…'dan beri … damlıyor / çalışmıyor.", en: "Since … the … has been leaking / not working." },
        { de: "Ich bitte darum, dass … repariert wird.", tr: "…'in onarılmasını rica ediyorum.", en: "I request that … be repaired." },
        { de: "bis spätestens …", tr: "en geç …'a kadar", en: "by … at the latest" },
        { de: "Könnten Sie mir mitteilen, wann …?", tr: "…'in ne zaman olacağını bildirebilir misiniz?", en: "Could you let me know when …?" },
      ],
      sample:
        "Sehr geehrte Frau Kruse,\n\nich wohne seit zwei Jahren in der Lindenstraße 8, Wohnung 4. Seit dem vergangenen Wochenende tropft der Wasserhahn im Bad, und seit Montag wird die Heizung im Wohnzimmer nicht mehr richtig warm.\n\nBevor ich Ihnen geschrieben habe, hatte ich bereits den Hausmeister informiert; leider wurde der Schaden bisher nicht behoben. Obwohl es draußen kälter wird, kann ich das Zimmer im Moment kaum nutzen.\n\nIch bitte darum, dass die Reparatur bis spätestens Freitag, den 14. März, durchgeführt wird. Könnten Sie mir mitteilen, wann der Handwerker kommt? Am Nachmittag bin ich in der Regel zu Hause.\n\nMit freundlichen Grüßen\nAyse Demir",
    },
  },

  {
    level: "B1",
    index: 2,
    code: "B1.3",
    titleDe: "Konnektoren meistern",
    titleTr: "Bağlaç ustalığı",
    focus: [
      { de: "damit und um … zu", tr: "amaç anlatmanın iki yolu" },
      { de: "obwohl und trotzdem", tr: "zıtlık: yan cümle mi bağlayıcı mı" },
      { de: "als und wenn", tr: "bir kerelik geçmiş mi tekrar mı" },
      { de: "nachdem, bevor, während", tr: "olayları sıraya koymak" },
      { de: "je … desto, entweder … oder", tr: "orantı ve ikili bağlaçlar" },
    ],
    canDo: [
      { de: "Ich kann Absichten mit „damit“ und „um … zu“ ausdrücken.", tr: "Amaçlarımı iki farklı yapıyla anlatabiliyorum.", en: "I can express intentions with purpose clauses." },
      { de: "Ich kann Gegensätze mit „obwohl“ und „trotzdem“ formulieren.", tr: "Zıtlığı „obwohl“ ve „trotzdem“ ile kurabiliyorum.", en: "I can express contrast with „obwohl“ and „trotzdem“." },
      { de: "Ich kann „als“ und „wenn“ richtig unterscheiden.", tr: "„als“ ile „wenn“ arasındaki farkı doğru kullanabiliyorum.", en: "I can distinguish „als“ and „wenn“ correctly." },
      { de: "Ich kann Ereignisse zeitlich ordnen.", tr: "Olayları zaman sırasına dizebiliyorum.", en: "I can order events in time." },
      { de: "Ich kann mit zweiteiligen Konnektoren Alternativen ausdrücken.", tr: "İkili bağlaçlarla seçenek sunabiliyorum.", en: "I can express alternatives with paired conjunctions." },
    ],
    listening: {
      title: "Der Wechsel",
      titleTr: "İş değişikliği",
      situation: "İki arkadaş iş değiştirme kararını konuşuyor.",
      turns: [
        { speaker: "Mert", de: "Du siehst zufrieden aus. Wie läuft die neue Stelle?", tr: "Memnun görünüyorsun. Yeni iş nasıl gidiyor?" },
        { speaker: "Lisa", de: "Sehr gut. Nachdem ich den alten Job gekündigt hatte, habe ich zwei Monate lang nichts gefunden.", tr: "Çok iyi. Eski işten ayrıldıktan sonra iki ay hiçbir şey bulamamıştım." },
        { speaker: "Mert", de: "Das war sicher anstrengend.", tr: "Kesin yorucuydu." },
        { speaker: "Lisa", de: "Obwohl ich am Anfang nervös war, habe ich weitergesucht. Ich habe jeden Tag geübt, um im Gespräch sicherer zu sprechen.", tr: "Başta gergin olsam da aramaya devam ettim. Görüşmede daha rahat konuşmak için her gün çalıştım." },
        { speaker: "Mert", de: "Und jetzt?", tr: "Peki şimdi?" },
        { speaker: "Lisa", de: "Jetzt arbeite ich vier Tage, damit ich freitags studieren kann. Je mehr ich lerne, desto leichter wird es.", tr: "Şimdi dört gün çalışıyorum, cumaları okuyabilmek için. Ne kadar çok öğrenirsem o kadar kolaylaşıyor." },
        { speaker: "Mert", de: "Also entweder Arbeit oder Studium?", tr: "Yani ya iş ya okul mu?" },
        { speaker: "Lisa", de: "Nein — sowohl Arbeit als auch Studium.", tr: "Hayır — hem iş hem okul." },
      ],
      questions: [
        { de: "Was ist passiert, nachdem Lisa gekündigt hatte?", tr: "Lisa istifa ettikten sonra ne oldu?", options: ["Sie hat sofort eine Stelle gefunden", "Sie hat zwei Monate lang nichts gefunden", "Sie hat sofort studiert", "Sie hat Urlaub gemacht"], answer: 1 },
        { de: "Warum arbeitet Lisa nur vier Tage?", tr: "Lisa neden sadece dört gün çalışıyor?", options: ["Weil sie krank ist", "Damit sie freitags studieren kann", "Weil die Firma es so will", "Obwohl sie mehr arbeiten möchte"], answer: 1 },
        { de: "Wozu hat Lisa jeden Tag geübt?", tr: "Lisa her gün ne için çalıştı?", options: ["Um sicherer zu sprechen", "Weil der Chef es verlangt hat", "Damit sie mehr verdient", "Obwohl sie keine Zeit hatte"], answer: 0 },
      ],
    },
    reading: {
      title: "Sprachen lernen als Erwachsener",
      titleTr: "Yetişkinlikte dil öğrenmek",
      genre: "Forum yazısı",
      text: "Forum: Sprachen lernen als Erwachsener\n\nViele glauben, dass man als Erwachsener keine Sprache mehr richtig lernen kann. Das stimmt so nicht. Zwar lernen Kinder die Aussprache leichter, aber Erwachsene verstehen Strukturen schneller, weil sie schon eine Sprache analysiert haben.\n\nEntscheidend ist die Regelmäßigkeit: Je öfter man übt, desto stabiler wird das Gelernte. Zwanzig Minuten täglich bringen mehr als drei Stunden am Sonntag.\n\nWichtig ist außerdem, dass man spricht, bevor man sich sicher fühlt. Wer wartet, bis alles perfekt ist, fängt nie an. Obwohl Fehler unangenehm sind, sind sie der schnellste Weg zum Fortschritt.",
      questions: [
        { de: "Was können Erwachsene laut Text besser als Kinder?", tr: "Metne göre yetişkinler çocuklardan neyi daha iyi yapıyor?", options: ["Die Aussprache", "Strukturen schneller verstehen", "Länger üben", "Fehler vermeiden"], answer: 1 },
        { de: "Was empfiehlt der Text?", tr: "Metin neyi öneriyor?", options: ["Drei Stunden am Sonntag üben", "Jeden Tag kurz üben", "Erst sprechen, wenn man sicher ist", "Fehler unbedingt vermeiden"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Bir amacını anlatıyorsun.", de: "Ich stehe früher auf, damit ich vor der Arbeit noch eine halbe Stunde lernen kann.", tr: "İşten önce yarım saat çalışabilmek için daha erken kalkıyorum." },
      { situation: "Bir zıtlığı anlatıyorsun.", de: "Obwohl das Angebot gut war, habe ich es abgelehnt; trotzdem bereue ich nichts.", tr: "Teklif iyi olmasına rağmen reddettim; yine de pişman değilim." },
    ],
    writing: {
      prompt: "Hayatında verdiğin bir kararı anlat: neden verdin, öncesinde ve sonrasında ne oldu, bugün nasıl görüyorsun.",
      checklist: [
        "„nachdem“ ile bir cümle kur (öncesi Plusquamperfekt)",
        "„obwohl“ ya da „trotzdem“ kullan",
        "„damit“ ya da „um … zu“ ile bir amaç yaz",
        "„je … desto“ ya da bir ikili bağlaç kullan",
      ],
      minWords: 80,
      phrases: [
        { de: "Nachdem ich … hatte, …", tr: "…'dıktan sonra …", en: "After I had …, …" },
        { de: "Obwohl …, …", tr: "…-e rağmen …", en: "Although …, …" },
        { de: "…, damit …", tr: "… diye / … olsun diye", en: "…, so that …" },
        { de: "Je mehr …, desto …", tr: "Ne kadar çok …, o kadar …", en: "The more …, the …" },
        { de: "entweder … oder … / sowohl … als auch …", tr: "ya … ya … / hem … hem …", en: "either … or … / both … and …" },
      ],
      sample:
        "Vor drei Jahren habe ich meine Stelle gekündigt, obwohl ich dort gut verdient habe. Der Grund war einfach: Ich wollte etwas lernen, das mich wirklich interessiert.\n\nNachdem ich gekündigt hatte, war ich zwei Monate ohne Arbeit. Diese Zeit war schwierig, trotzdem habe ich sie genutzt: Ich habe jeden Tag Deutsch geübt, um bei Bewerbungsgesprächen sicherer zu sprechen. Bevor ich mich beworben habe, habe ich außerdem einen kurzen Kurs gemacht.\n\nHeute arbeite ich vier Tage pro Woche, damit ich freitags studieren kann. Je länger ich das mache, desto sicherer werde ich. Entweder man wartet auf den perfekten Moment oder man fängt einfach an — ich habe mich für das Zweite entschieden.",
    },
  },

  {
    level: "B1",
    index: 3,
    code: "B1.4",
    titleDe: "Beschreiben und definieren",
    titleTr: "İlgi cümleleri",
    focus: [
      { de: "Relativsatz im Nominativ", tr: "der / die / das ile tanımlama" },
      { de: "Relativsatz im Akkusativ", tr: "nesnede der yerine den" },
      { de: "Relativsatz im Dativ", tr: "dem / der / denen" },
      { de: "Präposition + Relativpronomen", tr: "in dem, mit dem, von dem" },
      { de: "alles, was … / jemand, der …", tr: "belirsiz sözlerle ilgi cümlesi" },
    ],
    canDo: [
      { de: "Ich kann Personen genau beschreiben.", tr: "İnsanları ayrıntılı tarif edebiliyorum.", en: "I can describe people in detail." },
      { de: "Ich kann etwas beschreiben, wenn ich den Namen nicht weiß.", tr: "Adını bilmediğim bir şeyi tarif edebiliyorum.", en: "I can describe something when I don't know its name." },
      { de: "Ich kann das Relativpronomen im Nominativ, Akkusativ und Dativ richtig wählen.", tr: "İlgi zamirini yalın, belirtme ve yönelme hâlinde doğru seçebiliyorum.", en: "I can choose the right relative pronoun in all three cases." },
      { de: "Ich kann eine Präposition vor das Relativpronomen stellen.", tr: "İlgi zamirinin önüne edat koyabiliyorum.", en: "I can put a preposition before the relative pronoun." },
      { de: "Ich kann im Fundbüro einen verlorenen Gegenstand beschreiben.", tr: "Kayıp eşya bürosunda kaybettiğim eşyayı tarif edebiliyorum.", en: "I can describe a lost item at the lost-and-found office." },
    ],
    listening: {
      title: "Im Fundbüro",
      titleTr: "Kayıp eşya bürosunda",
      situation: "Bir adam tramvayda unuttuğu çantayı arıyor.",
      turns: [
        { speaker: "Beamtin", de: "Guten Tag. Was haben Sie denn verloren?", tr: "İyi günler. Neyinizi kaybettiniz?" },
        { speaker: "Herr Solak", de: "Eine Tasche, die ich gestern in der Straßenbahn vergessen habe.", tr: "Dün tramvayda unuttuğum bir çanta." },
        { speaker: "Beamtin", de: "Können Sie die Tasche beschreiben?", tr: "Çantayı tarif edebilir misiniz?" },
        { speaker: "Herr Solak", de: "Sie ist dunkelblau, aus Stoff, mit einem roten Band am Griff.", tr: "Koyu mavi, kumaştan, sapında kırmızı bir bant var." },
        { speaker: "Beamtin", de: "Und was war darin?", tr: "Peki içinde ne vardı?" },
        { speaker: "Herr Solak", de: "Ein Laptop, ein Ladegerät und ein Buch, das ich aus der Bibliothek geliehen habe.", tr: "Bir dizüstü, bir şarj aleti ve kütüphaneden aldığım bir kitap." },
        { speaker: "Beamtin", de: "Einen Moment. Wir haben hier eine blaue Tasche, die gestern Abend abgegeben wurde.", tr: "Bir dakika. Dün akşam teslim edilen mavi bir çanta var." },
        { speaker: "Herr Solak", de: "Das rote Band — ja, das ist meine!", tr: "Kırmızı bant — evet, bu benimki!" },
      ],
      questions: [
        { de: "Wo hat Herr Solak die Tasche vergessen?", tr: "Bay Solak çantayı nerede unuttu?", options: ["Im Bus", "In der Straßenbahn", "Im Zug", "Im Café"], answer: 1 },
        { de: "Woran erkennt man die Tasche?", tr: "Çanta neyden tanınıyor?", options: ["An einem Namensschild", "An einem roten Band am Griff", "An der Größe", "An einem Aufkleber"], answer: 1 },
        { de: "Was war in der Tasche?", tr: "Çantada ne vardı?", options: ["Nur ein Laptop", "Ein Laptop, ein Ladegerät und ein Buch", "Ein Buch und ein Handy", "Kleidung und Schuhe"], answer: 1 },
      ],
    },
    reading: {
      title: "Schwarzes Brett — Nachbarschaftshilfe",
      titleTr: "Mahalle panosundaki ilan",
      genre: "İlan",
      text: "Schwarzes Brett — Nachbarschaftshilfe\n\nGesucht: jemand, der zweimal pro Woche mit unserem Hund spazieren geht. Wir suchen keine Firma, sondern eine Person aus dem Viertel, die Zeit und Geduld hat.\n\nUnser Hund heißt Emil. Er ist ein ruhiger Mischling, der Kinder mag und der nicht an der Leine zieht.\n\nWir zahlen zwölf Euro pro Stunde. Wer Interesse hat, meldet sich unter 0176 55 43 21 — am besten abends, weil wir tagsüber arbeiten.\n\nFamilie Brandt, Haus Nr. 14",
      questions: [
        { de: "Wen sucht Familie Brandt?", tr: "Brandt ailesi kimi arıyor?", options: ["Eine Hundeschule", "Eine Person aus dem Viertel", "Einen Tierarzt", "Eine Firma"], answer: 1 },
        { de: "Wann soll man am besten anrufen?", tr: "En iyisi ne zaman aranmalı?", options: ["Morgens", "Mittags", "Abends", "Am Wochenende"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Bir arkadaşına sevdiğin filmi öneriyorsun.", de: "Das ist ein Film, den ich schon dreimal gesehen habe.", tr: "Bu, üç kez izlediğim bir film." },
      { situation: "Kayıp eşya bürosunda çantanı tarif ediyorsun.", de: "Ich suche eine Tasche, die ich in der Straßenbahn vergessen habe.", tr: "Tramvayda unuttuğum bir çanta arıyorum." },
    ],
    writing: {
      prompt: "Mahalle panosuna bir ilan yaz: bir şey arıyorsun ya da bir şey veriyorsun.",
      checklist: [
        "Ne aradığını ya da ne verdiğini yaz",
        "En az iki ilgi cümlesi kur",
        "Bir tanesinde ilgi zamirinin önüne edat koy",
        "Nasıl ve ne zaman ulaşılacağını yaz",
      ],
      minWords: 70,
      phrases: [
        { de: "Ich suche jemanden, der …", tr: "… olan birini arıyorum", en: "I am looking for someone who …" },
        { de: "…, den ich … habe", tr: "…-dığım …", en: "…, which I have …" },
        { de: "…, in dem / in der …", tr: "içinde … olan", en: "… in which …" },
        { de: "Wer Interesse hat, meldet sich unter …", tr: "İlgilenen … numarasından ulaşsın", en: "Anyone interested can get in touch at …" },
        { de: "am besten abends", tr: "en iyisi akşamları", en: "preferably in the evening" },
      ],
      sample:
        "Suche Rad-Begleitung\n\nIch suche jemanden, der zweimal pro Woche mit mir zur Arbeit fährt. Ich wohne im Bezirk Ehrenfeld, in dem es zum Glück viele ruhige Radwege gibt, und arbeite in der Innenstadt.\n\nIch habe ein altes Rad, das nicht besonders schnell ist — Tempo ist mir also nicht wichtig. Wichtiger ist mir jemand, dem man morgens auch mal in Ruhe zuhören kann.\n\nWer Interesse hat, meldet sich unter 0176 22 11 09, am besten abends. Ich freue mich!",
    },
  },

  {
    level: "B1",
    index: 4,
    code: "B1.5",
    titleDe: "Ämter und Anträge",
    titleTr: "Bürokrasi",
    focus: [
      { de: "Passiv im Präsens", tr: "wird artı Partizip II" },
      { de: "Passiv im Präteritum", tr: "wurde artı Partizip II" },
      { de: "Passiv mit Modalverb", tr: "muss vorgelegt werden" },
      { de: "Konjunktiv II für höfliche Bitten", tr: "Wäre es möglich …?" },
      { de: "indirekte Frage", tr: "Wissen Sie, wann …?" },
    ],
    canDo: [
      { de: "Ich kann Behördenbriefe im Passiv verstehen.", tr: "Resmî yazılardaki edilgen cümleleri anlayabiliyorum.", en: "I can understand official letters written in the passive." },
      { de: "Ich kann sagen, welche Unterlagen benötigt werden.", tr: "Hangi belgelerin gerektiğini söyleyebiliyorum.", en: "I can say which documents are required." },
      { de: "Ich kann einen Amtstermin höflich verschieben.", tr: "Resmî bir randevuyu kibarca erteleyebiliyorum.", en: "I can politely postpone an appointment at a public office." },
      { de: "Ich kann schriftlich Widerspruch einlegen und ihn begründen.", tr: "Yazılı itiraz edip gerekçelendirebiliyorum.", en: "I can lodge a written objection and justify it." },
      { de: "Ich kann höflich nachfragen, was verlangt wird.", tr: "Neyin istendiğini kibarca sorabiliyorum.", en: "I can politely ask what is required." },
    ],
    listening: {
      title: "Bei der Ausländerbehörde",
      titleTr: "Yabancılar dairesinde",
      situation: "Bir kadın oturma iznini uzatmak için memurla konuşuyor.",
      turns: [
        { speaker: "Sachbearbeiter", de: "Guten Tag. Ihre Aufenthaltserlaubnis läuft im Mai ab, richtig?", tr: "İyi günler. Oturma izniniz mayısta doluyor, değil mi?" },
        { speaker: "Frau Nuri", de: "Ja, am fünfzehnten Mai. Ich möchte sie verlängern lassen.", tr: "Evet, 15 Mayıs'ta. Uzatmak istiyorum." },
        { speaker: "Sachbearbeiter", de: "Dann werden drei Dinge benötigt: der Pass, der Mietvertrag und ein Nachweis über Ihr Einkommen.", tr: "O zaman üç şey gerekiyor: pasaport, kira sözleşmesi ve gelir belgesi." },
        { speaker: "Frau Nuri", de: "Den Mietvertrag habe ich dabei. Muss das Original vorgelegt werden?", tr: "Kira sözleşmesi yanımda. Asıl nüsha mı ibraz edilmeli?" },
        { speaker: "Sachbearbeiter", de: "Beim Pass ja, beim Mietvertrag reicht eine Kopie.", tr: "Pasaportta evet, kira sözleşmesinde fotokopi yeterli." },
        { speaker: "Frau Nuri", de: "Und wie lange wird der Antrag bearbeitet?", tr: "Peki başvuru ne kadar sürede işleme alınıyor?" },
        { speaker: "Sachbearbeiter", de: "In der Regel vier bis sechs Wochen. Der Bescheid wird Ihnen zugeschickt.", tr: "Genelde dört ila altı hafta. Karar yazısı size gönderilir." },
        { speaker: "Frau Nuri", de: "Gut. Dann bringe ich den Einkommensnachweis morgen vorbei.", tr: "Peki. O zaman gelir belgesini yarın getiririm." },
      ],
      questions: [
        { de: "Was läuft im Mai ab?", tr: "Mayısta neyin süresi doluyor?", options: ["Der Mietvertrag", "Die Aufenthaltserlaubnis", "Der Pass", "Die Widerspruchsfrist"], answer: 1 },
        { de: "Wovon reicht eine Kopie?", tr: "Neyin fotokopisi yeterli?", options: ["Vom Pass", "Vom Mietvertrag", "Vom Einkommensnachweis", "Von allen Unterlagen"], answer: 1 },
        { de: "Wie lange dauert die Bearbeitung?", tr: "İşlem ne kadar sürüyor?", options: ["Zwei Wochen", "Vier bis sechs Wochen", "Drei Monate", "Das sagt der Sachbearbeiter nicht"], answer: 1 },
      ],
    },
    reading: {
      title: "Bescheid des Straßenverkehrsamts",
      titleTr: "Trafik dairesinden karar yazısı",
      genre: "Resmî yazı",
      text: "Stadt Bonn — Straßenverkehrsamt\n\nSehr geehrte Frau Aydin,\n\nIhr Antrag auf Umschreibung des Führerscheins wurde am 12. März bearbeitet. Leider konnte er nicht bewilligt werden, weil der Sehtest fehlt.\n\nDer Nachweis kann bis zum 30. April nachgereicht werden. Danach wird der Antrag ohne weitere Prüfung abgelehnt.\n\nDie Gebühr von 43 Euro wurde bereits gebucht und wird nicht erstattet.\n\nMit freundlichen Grüßen\nIm Auftrag\nR. Seidel",
      questions: [
        { de: "Warum wurde der Antrag nicht bewilligt?", tr: "Başvuru neden onaylanmadı?", options: ["Die Gebühr fehlt", "Der Sehtest fehlt", "Der Pass ist abgelaufen", "Die Frist ist vorbei"], answer: 1 },
        { de: "Was passiert mit der Gebühr?", tr: "Ücrete ne oluyor?", options: ["Sie wird erstattet", "Sie wird nicht erstattet", "Sie muss noch gezahlt werden", "Sie wird halbiert"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Dairede hangi belgelerin gerektiğini soruyorsun.", de: "Können Sie mir sagen, welche Unterlagen benötigt werden?", tr: "Hangi belgelerin gerektiğini söyleyebilir misiniz?" },
      { situation: "Randevunu kibarca ertelemek istiyorsun.", de: "Wäre es möglich, den Termin um eine Woche zu verschieben?", tr: "Randevuyu bir hafta ertelemek mümkün olur mu?" },
    ],
    writing: {
      prompt: "Aşağıdaki karara yazılı olarak itiraz et.",
      stimulus: "Ihr Antrag auf Verlängerung der Aufenthaltserlaubnis wurde abgelehnt, da der Einkommensnachweis nicht fristgerecht eingereicht wurde.",
      checklist: [
        "Neye itiraz ettiğini ilk cümlede yaz",
        "İtirazını gerekçelendir",
        "En az bir edilgen cümle kullan",
        "Ricanı bir yan cümleyle yaz",
      ],
      minWords: 70,
      phrases: [
        { de: "Hiermit widerspreche ich …", tr: "İşbu yazıyla …'e itiraz ediyorum", en: "I hereby object to …" },
        { de: "Ich bitte darum, dass …", tr: "…-mesini rica ediyorum", en: "I request that …" },
        { de: "fristgerecht", tr: "süresi içinde", en: "within the deadline" },
        { de: "in der Anlage", tr: "ekte", en: "enclosed" },
        { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Yours sincerely" },
      ],
      sample:
        "Sehr geehrte Damen und Herren,\n\nhiermit widerspreche ich Ihrem Bescheid vom 14. April, mit dem mein Antrag auf Verlängerung der Aufenthaltserlaubnis abgelehnt wurde.\n\nDer Einkommensnachweis wurde meiner Ansicht nach fristgerecht eingereicht: Ich habe ihn am 3. April persönlich abgegeben. Eine Kopie mit dem Eingangsstempel füge ich in der Anlage bei.\n\nIch bitte darum, dass der Antrag erneut geprüft wird. Über eine kurze Bestätigung, dass mein Widerspruch eingegangen ist, wäre ich dankbar.\n\nMit freundlichen Grüßen\nLeyla Aydin",
    },
  },
];
