import type { DialogueTurn, DialogueReply } from "@/lib/dialogue";

/**
 * A1 derslerinin çevrimdışı rol yapma senaryoları (WP-04, ilk 10 ders).
 *
 * Her senaryo dersin sahnesini modelsiz oynatır: kapalı tema, 4 tur (dersin
 * `minTurns`ı), her turda öğrencinin verebileceği cevapların anahtar kökleri.
 * İlk turun `ask`i dersin açılış repliğiyle birebir aynı — oynatıcı açılışı
 * zaten gösteriyor. `uses` dersin kalıplarını (patterns.de) taşır; özet
 * "şunları kullandın" derken buradan sayar.
 *
 * Kökler bilerek cömert: tanıyıcı "heiße"yi "heisse", "Türkei"yi "turkei"
 * yazabilir; `normalizeSpoken` ikisini de düzlüyor. Kısa kökler (≤ 3 harf)
 * yalnız tam kelime olarak aranır (bkz. lib/dialogue.ts).
 */

const t = (
  id: string,
  ask: string,
  askTr: string,
  cue: string,
  replies: DialogueReply[],
  fallback: DialogueTurn["fallback"],
): DialogueTurn => ({ id, ask, askTr, cue, replies, fallback });

const r = (match: string[], say: string, sayTr: string, next?: string, uses?: string[]): DialogueReply => ({
  match,
  say,
  sayTr,
  next,
  uses,
});

export const A1_SCRIPTS: Record<string, DialogueTurn[]> = {
  "de-a1-hallo": [
    t("t1", "Hallo! Sie sind neu hier, oder? Wie heißen Sie?", "Merhaba! Buraya yeni taşındınız, değil mi? Adınız ne?", "Adını söyle: Ich heiße …", [
      r(["heiße", "heisse", "bin", "name"], "Freut mich! Ich bin Frau Keller aus dem dritten Stock. Woher kommen Sie?", "Memnun oldum! Ben üçüncü kattan Bayan Keller. Nerelisiniz?", "t2", ["Ich heiße …"]),
    ], { say: "Entschuldigung, wie bitte? Wie ist Ihr Name?", sayTr: "Affedersiniz, efendim? Adınız ne?", example: "Ich heiße Mehmet." }),
    t("t2", "Woher kommen Sie?", "Nerelisiniz?", "Nereli olduğunu söyle: Ich komme aus …", [
      r(["komme", "aus", "türkei", "turkei", "istanbul", "ankara", "izmir"], "Ah, schön! Und wo wohnen Sie jetzt — hier im Haus?", "Ah, ne güzel! Peki şimdi nerede oturuyorsunuz — bu binada mı?", "t3", ["Ich komme aus …"]),
    ], { say: "Aus welchem Land kommen Sie?", sayTr: "Hangi ülkeden geliyorsunuz?", example: "Ich komme aus der Türkei." }),
    t("t3", "Wo wohnen Sie jetzt?", "Şimdi nerede oturuyorsunuz?", "Nerede oturduğunu söyle: Ich wohne in …", [
      r(["wohne", "wohnung", "stock", "hier", "zürich", "zurich", "berlin"], "Dann sind wir Nachbarn! Wohnen Sie allein oder mit Familie?", "O zaman komşuyuz! Yalnız mı oturuyorsunuz, aileyle mi?", "t4", ["Ich wohne in …"]),
    ], { say: "Wo wohnen Sie? In welcher Stadt oder in welchem Stock?", sayTr: "Nerede oturuyorsunuz? Hangi şehirde ya da hangi katta?", example: "Ich wohne hier, im zweiten Stock." }),
    t("t4", "Wohnen Sie allein oder mit Familie?", "Yalnız mı, aileyle mi oturuyorsunuz?", "Kısaca cevap ver: allein / mit meiner Familie", [
      r(["allein", "alleine", "familie", "frau", "mann", "kinder", "freund", "freundin"], "Wie schön. Und in welchem Stock wohnen Sie?", "Ne güzel. Peki hangi katta oturuyorsunuz?", "t5", []),
    ], { say: "Allein oder mit Familie?", sayTr: "Yalnız mı, aileyle mi?", example: "Ich wohne mit meiner Familie." }),
    t("t5", "In welchem Stock wohnen Sie?", "Hangi katta oturuyorsunuz?", "Katını söyle: Ich wohne im … Stock", [
      r(["stock", "erste", "zweite", "dritte", "vierte", "oben", "unten", "erdgeschoss", "wohne"], "Ach, fast neben mir! Arbeiten Sie hier in der Nähe?", "Ah, neredeyse yanımdasınız! Buralarda mı çalışıyorsunuz?", "t6", ["Ich wohne in …"]),
    ], { say: "In welchem Stock — erster, zweiter, dritter?", sayTr: "Hangi kat — birinci, ikinci, üçüncü?", example: "Ich wohne im zweiten Stock." }),
    t("t6", "Arbeiten Sie hier in der Nähe?", "Buralarda mı çalışıyorsunuz?", "Nerede çalıştığını söyle: Ich arbeite bei …", [
      r(["arbeite", "firma", "büro", "buero", "stadt", "nähe", "naehe", "hause", "noch nicht"], "Praktisch! Wenn Sie etwas brauchen, klopfen Sie einfach. Wie war Ihr Name noch mal?", "Pratik! Bir şeye ihtiyacınız olursa kapıyı çalın. Adınız neydi?", "t7", []),
    ], { say: "Arbeiten Sie hier oder woanders?", sayTr: "Burada mı çalışıyorsunuz, başka yerde mi?", example: "Ich arbeite bei einer Firma in der Stadt." }),
    t("t7", "Wie war Ihr Name noch mal?", "Adınız neydi?", "Adını bir daha söyle: Ich heiße …", [
      r(["heiße", "heisse", "bin", "name"], "Alles klar. Willkommen im Haus — bis bald im Treppenhaus!", "Anlaşıldı. Binaya hoş geldiniz — merdivende görüşürüz!", undefined, ["Ich heiße …"]),
    ], { say: "Wie heißen Sie noch mal?", sayTr: "Adınız neydi?", example: "Ich heiße Mehmet." }),
  ],

  "de-a1-wie-gehts": [
    t("t1", "Guten Morgen! Wie geht es dir heute?", "Günaydın! Bugün nasılsın?", "Hâlini söyle ve geri sor: Mir geht es gut. Und dir?", [
      r(["gut", "prima", "super", "okay", "ok", "müde", "muede", "schlecht", "geht"], "Mir geht es auch gut, danke! Hast du heute viel Arbeit?", "Ben de iyiyim, teşekkürler! Bugün çok işin var mı?", "t2", ["Mir geht es gut.", "Und dir?"]),
    ], { say: "Wie geht es dir? Gut oder nicht so gut?", sayTr: "Nasılsın? İyi mi, pek değil mi?", example: "Mir geht es gut, danke. Und dir?" }),
    t("t2", "Hast du heute viel Arbeit?", "Bugün çok işin var mı?", "Evet/hayır de ve nedenini ekle", [
      r(["ja", "viel", "arbeit", "meeting", "termin", "nein", "wenig", "nicht"], "Ich auch! Trinken wir nachher einen Kaffee zusammen?", "Ben de! Sonra birlikte kahve içelim mi?", "t3", []),
    ], { say: "Viel Arbeit heute — ja oder nein?", sayTr: "Bugün çok iş var mı — evet mi hayır mı?", example: "Ja, ich habe heute viel Arbeit." }),
    t("t3", "Trinken wir nachher einen Kaffee zusammen?", "Sonra birlikte kahve içelim mi?", "Kabul et ya da başka zaman öner", [
      r(["ja", "gern", "gerne", "klar", "kaffee", "morgen", "später", "spaeter", "leider", "nein"], "Prima! Und wie geht es deiner Familie?", "Harika! Peki ailen nasıl?", "t4", []),
    ], { say: "Kaffee nachher — hast du Zeit?", sayTr: "Sonra kahve — vaktin var mı?", example: "Ja, gern! Um zwölf?" }),
    t("t4", "Wie geht es deiner Familie?", "Ailen nasıl?", "Ailenin hâlini söyle: Es geht ihnen gut.", [
      r(["gut", "geht", "danke", "familie", "alle", "prima"], "Das freut mich. Was machst du denn heute Abend?", "Buna sevindim. Peki bu akşam ne yapıyorsun?", "t5", ["Mir geht es gut."]),
    ], { say: "Und deiner Familie — geht es ihr gut?", sayTr: "Peki ailen — iyi mi?", example: "Danke, es geht ihnen gut." }),
    t("t5", "Was machst du heute Abend?", "Bu akşam ne yapıyorsun?", "Akşam planını söyle: Ich gehe … / Ich bleibe zu Hause", [
      r(["gehe", "mache", "bleibe", "hause", "sport", "kino", "koche", "nichts", "treffe", "arbeite"], "Klingt gut. Ich bin heute müde und gehe früh schlafen. Sehen wir uns morgen wieder hier?", "Kulağa hoş geliyor. Ben bugün yorgunum, erken yatacağım. Yarın yine burada görüşür müyüz?", "t6", []),
    ], { say: "Was machst du nach der Arbeit?", sayTr: "İşten sonra ne yapıyorsun?", example: "Ich gehe nach Hause und koche." }),
    t("t6", "Sehen wir uns morgen wieder hier?", "Yarın yine burada görüşür müyüz?", "Kabul et ya da başka gün söyle", [
      r(["ja", "klar", "gern", "gerne", "morgen", "nein", "vielleicht", "übermorgen", "uebermorgen"], "Super. Dann bis morgen — und einen schönen Tag noch!", "Süper. O zaman yarın görüşürüz — iyi günler!", undefined, ["Und dir?"]),
    ], { say: "Morgen wieder hier — ja oder nein?", sayTr: "Yarın yine burada — evet mi hayır mı?", example: "Ja, gern. Bis morgen!" }),
  ],

  "de-a1-du-oder-sie": [
    t("t1", "Guten Tag! Sind Sie neu hier im Team?", "İyi günler! Ekibe yeni misiniz?", "Kibarca cevap ver ve adını söyle", [
      r(["ja", "neu", "heiße", "heisse", "bin", "name"], "Willkommen! Ich bin Herr Braun, der Abteilungsleiter. Und wie heißen Sie?", "Hoş geldiniz! Ben Bay Braun, bölüm müdürü. Peki sizin adınız ne?", "t2", ["Sind Sie …?"]),
    ], { say: "Sind Sie neu hier? Ja oder nein?", sayTr: "Burada yeni misiniz? Evet mi hayır mı?", example: "Ja, ich bin neu hier. Ich heiße Ayşe Demir." }),
    t("t2", "Wie heißen Sie?", "Adınız ne?", "Adını söyle, sonra kibarca onun adını sor: Wie heißen Sie?", [
      r(["heiße", "heisse", "bin", "name", "heißen", "heissen"], "Freut mich, Sie kennenzulernen. Woher kommen Sie?", "Tanıştığımıza memnun oldum. Nerelisiniz?", "t3", ["Wie heißen Sie?"]),
    ], { say: "Ihr Name, bitte?", sayTr: "Adınız, lütfen?", example: "Ich heiße Ayşe Demir. Und wie heißen Sie?" }),
    t("t3", "Woher kommen Sie?", "Nerelisiniz?", "Nereli olduğunu söyle: Ich komme aus …", [
      r(["komme", "aus", "türkei", "turkei", "istanbul", "ankara"], "Interessant! Und wo wohnen Sie hier in der Stadt?", "İlginç! Peki burada, şehirde nerede oturuyorsunuz?", "t4", []),
    ], { say: "Aus welchem Land kommen Sie?", sayTr: "Hangi ülkeden geliyorsunuz?", example: "Ich komme aus der Türkei." }),
    t("t4", "Wo wohnen Sie hier in der Stadt?", "Şehirde nerede oturuyorsunuz?", "Nerede oturduğunu söyle: Ich wohne in …", [
      r(["wohne", "straße", "strasse", "zentrum", "nähe", "naehe", "stadt"], "Sehr gut. Kennen Sie schon jemanden im Team?", "Çok iyi. Ekipten tanıdığınız biri var mı?", "t5", []),
    ], { say: "Wo wohnen Sie?", sayTr: "Nerede oturuyorsunuz?", example: "Ich wohne in der Bahnhofstraße." }),
    t("t5", "Kennen Sie schon jemanden im Team?", "Ekipten tanıdığınız var mı?", "Evet/hayır de: Ja, ich kenne … / Nein, noch nicht", [
      r(["ja", "nein", "kenne", "noch", "niemand", "frau", "herr", "kollege", "kollegin"], "Das kommt schnell. Ihre erste Aufgabe heute: Können Sie die Post sortieren?", "O çabuk olur. Bugünkü ilk işiniz: Postayı ayırabilir misiniz?", "t6", []),
    ], { say: "Kennen Sie jemanden hier — ja oder nein?", sayTr: "Burada tanıdığınız var mı — evet mi hayır mı?", example: "Nein, noch nicht." }),
    t("t6", "Können Sie heute die Post sortieren?", "Bugün postayı ayırabilir misiniz?", "Kabul et: Ja, gern / Natürlich", [
      r(["ja", "gern", "gerne", "natürlich", "natuerlich", "klar", "kann", "mache"], "Wunderbar. Dann viel Erfolg am ersten Tag — und fragen Sie mich jederzeit!", "Harika. O zaman ilk gününüzde başarılar — ve istediğiniz zaman bana sorun!", undefined, ["Sie sind …?"]),
    ], { say: "Machen Sie das heute — ja oder nein?", sayTr: "Bugün yapar mısınız — evet mi hayır mı?", example: "Ja, gern." }),
  ],

  "de-a1-woher": [
    t("t1", "Hallo! Ich bin auch neu hier. Woher kommst du?", "Merhaba! Ben de buraya yeniyim. Nerelisin?", "Nereli olduğunu söyle ve geri sor: Und du?", [
      r(["komme", "aus", "türkei", "turkei", "istanbul", "ankara", "izmir"], "Ich komme aus Italien, aus Rom. Wo wohnst du jetzt?", "Ben İtalya'dan, Roma'danım. Şimdi nerede oturuyorsun?", "t2", ["Woher kommst du?"]),
    ], { say: "Woher kommst du? Aus welchem Land?", sayTr: "Nerelisin? Hangi ülkeden?", example: "Ich komme aus der Türkei. Und du?" }),
    t("t2", "Wo wohnst du jetzt?", "Şimdi nerede oturuyorsun?", "Nerede oturduğunu söyle ve ona sor: Wo wohnst du?", [
      r(["wohne", "wohnst", "zürich", "zurich", "stadt", "zentrum", "hier"], "Ich wohne auch in der Stadt, ganz in der Nähe. Was ist das da, ein Wörterbuch?", "Ben de şehirde oturuyorum, çok yakında. Oradaki ne, sözlük mü?", "t3", ["Wo wohnst du?"]),
    ], { say: "Wo wohnst du? In welcher Stadt?", sayTr: "Nerede oturuyorsun? Hangi şehirde?", example: "Ich wohne in Zürich. Und du?" }),
    t("t3", "Was ist das da, ein Wörterbuch?", "Oradaki ne, sözlük mü?", "Cevap ver ve sen de bir şey sor: Was ist das?", [
      r(["ja", "wörterbuch", "woerterbuch", "buch", "das ist", "nein", "heft", "was ist"], "Ah, ich sehe. Lernst du schon lange Deutsch?", "Ah, anladım. Uzun zamandır mı Almanca öğreniyorsun?", "t4", ["Was ist das?"]),
    ], { say: "Ist das ein Wörterbuch?", sayTr: "O bir sözlük mü?", example: "Ja, das ist ein Wörterbuch. Und was ist das?" }),
    t("t4", "Lernst du schon lange Deutsch?", "Uzun zamandır mı Almanca öğreniyorsun?", "Ne kadar süredir öğrendiğini söyle", [
      r(["monat", "monate", "jahr", "jahre", "woche", "wochen", "lange", "nein", "ja", "lerne"], "Super, dann lernen wir zusammen! Kommst du mit dem Bus zum Kurs?", "Süper, o zaman birlikte öğreniriz! Kursa otobüsle mi geliyorsun?", "t5", []),
    ], { say: "Seit wann lernst du Deutsch?", sayTr: "Ne zamandır Almanca öğreniyorsun?", example: "Ich lerne seit drei Monaten Deutsch." }),
    t("t5", "Kommst du mit dem Bus zum Kurs?", "Kursa otobüsle mi geliyorsun?", "Nasıl geldiğini söyle: mit dem Bus / zu Fuß", [
      r(["bus", "bahn", "fuß", "fuss", "auto", "fahrrad", "komme", "zu"], "Ich auch! Wollen wir im Kurs nebeneinander sitzen?", "Ben de! Kursta yan yana oturalım mı?", "t6", []),
    ], { say: "Wie kommst du zum Kurs?", sayTr: "Kursa nasıl geliyorsun?", example: "Ich komme mit dem Bus." }),
    t("t6", "Wollen wir im Kurs nebeneinander sitzen?", "Kursta yan yana oturalım mı?", "Kabul et: Ja, gern!", [
      r(["ja", "gern", "gerne", "klar", "okay", "ok", "nein"], "Prima. Dann bis gleich im Kurs — ich heiße übrigens Ayla!", "Harika. O zaman kursta görüşürüz — bu arada benim adım Ayla!", undefined, []),
    ], { say: "Zusammen sitzen — ja oder nein?", sayTr: "Yan yana oturalım mı — evet mi hayır mı?", example: "Ja, sehr gern!" }),
  ],

  "de-a1-sprachen": [
    t("t1", "Entschuldigung, sprichst du Deutsch?", "Affedersin, Almanca konuşuyor musun?", "Cevap ver: Ja, ein bisschen. / Nein, aber ich lerne Deutsch.", [
      r(["ja", "bisschen", "wenig", "spreche", "lerne", "nein"], "Sehr gut! Welche Sprachen sprichst du noch?", "Çok iyi! Başka hangi dilleri konuşuyorsun?", "t2", ["Ja, ich spreche …", "Nein, aber ich lerne Deutsch."]),
    ], { say: "Sprichst du Deutsch — ja oder ein bisschen?", sayTr: "Almanca konuşuyor musun — evet mi, biraz mı?", example: "Ja, ein bisschen. Ich lerne Deutsch." }),
    t("t2", "Welche Sprachen sprichst du noch?", "Başka hangi dilleri konuşuyorsun?", "Dillerini say: Ich spreche Türkisch und …", [
      r(["türkisch", "tuerkisch", "englisch", "spreche", "arabisch", "kurdisch", "französisch", "franzoesisch"], "Toll! Und ich spreche Spanisch und Englisch. Sprichst du auch Englisch?", "Harika! Ben İspanyolca ve İngilizce konuşuyorum. Sen de İngilizce konuşuyor musun?", "t3", ["Ja, ich spreche …"]),
    ], { say: "Welche Sprachen? Türkisch, Englisch …?", sayTr: "Hangi diller? Türkçe, İngilizce…?", example: "Ich spreche Türkisch und ein bisschen Englisch." }),
    t("t3", "Sprichst du auch Englisch?", "Sen de İngilizce konuşuyor musun?", "Evet/hayır de ve ona sor: Sprichst du Türkisch?", [
      r(["ja", "nein", "englisch", "bisschen", "gut", "sprichst", "türkisch", "tuerkisch"], "Nein, leider kein Türkisch! Wo lernst du Deutsch?", "Hayır, maalesef Türkçe bilmiyorum! Almancayı nerede öğreniyorsun?", "t4", ["Sprichst du Deutsch?"]),
    ], { say: "Englisch — ja oder nein?", sayTr: "İngilizce — evet mi hayır mı?", example: "Ja, ein bisschen. Sprichst du Türkisch?" }),
    t("t4", "Wo lernst du Deutsch?", "Almancayı nerede öğreniyorsun?", "Nerede öğrendiğini söyle: in der Schule / mit einer App / im Kurs", [
      r(["schule", "kurs", "app", "handy", "online", "lerne", "hause", "arbeit"], "Das ist eine gute Idee. Sprechen wir weiter Deutsch oder lieber Englisch?", "Bu iyi bir fikir. Almanca mı devam edelim, yoksa İngilizce mi?", "t5", []),
    ], { say: "Wo lernst du — im Kurs oder mit einer App?", sayTr: "Nerede öğreniyorsun — kursta mı, uygulamayla mı?", example: "Ich lerne Deutsch mit einer App." }),
    t("t5", "Sprechen wir weiter Deutsch oder lieber Englisch?", "Almanca mı devam edelim, İngilizce mi?", "Tercihini söyle: Deutsch, bitte", [
      r(["deutsch", "englisch", "lieber", "bitte", "weiter", "türkisch", "tuerkisch"], "Gut, dann bleiben wir bei Deutsch. Wie sagt man Danke auf Türkisch?", "Güzel, o zaman Almanca devam. Türkçede Danke nasıl deniyor?", "t6", ["Ja, ich spreche …"]),
    ], { say: "Deutsch oder Englisch?", sayTr: "Almanca mı İngilizce mi?", example: "Deutsch, bitte." }),
    t("t6", "Wie sagt man Danke auf Türkisch?", "Türkçede Danke nasıl deniyor?", "Türkçesini söyle ve kısaca açıkla", [
      r(["teşekkür", "tesekkur", "sagt", "man", "danke", "türkisch", "tuerkisch"], "Schön, das merke ich mir! Danke für das Gespräch — bis bald!", "Güzel, bunu aklımda tutarım! Sohbet için teşekkürler — görüşürüz!", undefined, ["Sprichst du Deutsch?"]),
    ], { say: "Wie sagt man das auf Türkisch?", sayTr: "Bu Türkçede nasıl deniyor?", example: "Auf Türkisch sagt man teşekkürler." }),
  ],

  "de-a1-zahlen": [
    t("t1", "Guten Tag! Sie möchten Mitglied werden? Wie ist Ihre Telefonnummer?", "İyi günler! Üye mi olmak istiyorsunuz? Telefon numaranız kaç?", "Numaranı söyle: Meine Nummer ist …", [
      r(["nummer", "null", "eins", "zwei", "drei", "vier", "fünf", "fuenf", "sechs", "sieben", "acht", "neun", "telefon"], "Danke. Und wie ist Ihre Postleitzahl?", "Teşekkürler. Peki posta kodunuz kaç?", "t2", ["Meine Nummer ist …"]),
    ], { say: "Ihre Telefonnummer, bitte — Ziffer für Ziffer.", sayTr: "Telefon numaranız, lütfen — rakam rakam.", example: "Meine Nummer ist null sieben neun, drei vier fünf, sechs sieben." }),
    t("t2", "Wie ist Ihre Postleitzahl?", "Posta kodunuz kaç?", "Posta kodunu rakam rakam söyle", [
      r(["postleitzahl", "null", "eins", "zwei", "drei", "vier", "fünf", "fuenf", "sechs", "sieben", "acht", "neun", "zehn", "zwanzig", "dreißig", "achtzig"], "Perfekt. Möchten Sie die Monatskarte oder die Jahreskarte?", "Mükemmel. Aylık kart mı istersiniz, yıllık mı?", "t3", []),
    ], { say: "Die Postleitzahl, bitte.", sayTr: "Posta kodu, lütfen.", example: "Achtzig null null fünf." }),
    t("t3", "Möchten Sie die Monatskarte oder die Jahreskarte?", "Aylık kart mı, yıllık mı?", "Birini seç ve fiyatı sor: Wie viel kostet das?", [
      r(["monatskarte", "monat", "jahreskarte", "jahr", "kostet", "kosten", "preis", "wie viel"], "Die Monatskarte kostet fünfundvierzig Euro, die Jahreskarte vierhundert. Möchten Sie bar oder mit Karte bezahlen?", "Aylık kart kırk beş euro, yıllık kart dört yüz. Nakit mi, kartla mı ödemek istersiniz?", "t4", ["Wie viel kostet das?"]),
    ], { say: "Monatskarte oder Jahreskarte?", sayTr: "Aylık kart mı, yıllık kart mı?", example: "Die Monatskarte, bitte. Wie viel kostet das?" }),
    t("t4", "Möchten Sie bar oder mit Karte bezahlen?", "Nakit mi, kartla mı?", "Ödeme şeklini söyle: bar / mit Karte", [
      r(["bar", "karte", "bezahle", "bezahlen", "kreditkarte"], "Sehr gut. Ab wann möchten Sie anfangen — heute oder ab Montag?", "Çok iyi. Ne zaman başlamak istersiniz — bugün mü, pazartesiden mi?", "t5", []),
    ], { say: "Bar oder mit Karte?", sayTr: "Nakit mi, kartla mı?", example: "Mit Karte, bitte." }),
    t("t5", "Ab wann möchten Sie anfangen — heute oder ab Montag?", "Ne zaman başlamak istersiniz — bugün mü, pazartesiden mi?", "Bir gün seç", [
      r(["heute", "montag", "morgen", "woche", "nächste", "naechste", "ab"], "Notiert. Wie ist Ihre Telefonnummer?", "Not aldım. Telefon numaranız kaç?", "t6", []),
    ], { say: "Heute oder ab Montag?", sayTr: "Bugün mü, pazartesiden mi?", example: "Ab Montag, bitte." }),
    t("t6", "Wie ist Ihre Telefonnummer?", "Telefon numaranız kaç?", "Numaranı rakam rakam söyle", [
      r(["nummer", "null", "eins", "zwei", "drei", "vier", "fünf", "fuenf", "sechs", "sieben", "acht", "neun", "handy", "telefon"], "Danke. Der Beitrag ist neunundzwanzig Euro im Monat — ist das in Ordnung?", "Teşekkürler. Aidat ayda yirmi dokuz euro — uygun mu?", "t7", ["Meine Nummer ist …"]),
    ], { say: "Ihre Telefonnummer, bitte.", sayTr: "Telefon numaranız, lütfen.", example: "Meine Nummer ist null sieben sechs, eins zwei drei." }),
    t("t7", "Der Beitrag ist neunundzwanzig Euro im Monat — ist das in Ordnung?", "Aidat ayda yirmi dokuz euro — uygun mu?", "Onayla ya da fiyatı bir daha sor", [
      r(["ja", "okay", "ok", "gut", "ordnung", "teuer", "nein", "wie viel", "kostet"], "Alles klar: neunundzwanzig Euro, Start am Montag. Hier ist Ihre Karte — viel Spaß beim Training!", "Tamamdır: yirmi dokuz euro, başlangıç pazartesi. İşte kartınız — antrenmanda iyi eğlenceler!", undefined, ["Wie viel kostet das?"]),
    ], { say: "Neunundzwanzig Euro im Monat — geht das?", sayTr: "Ayda yirmi dokuz euro — olur mu?", example: "Ja, das ist in Ordnung." }),
  ],

  "de-a1-alphabet": [
    t("t1", "Guten Tag! Ich brauche Ihren Vornamen und Ihren Nachnamen. Können Sie das buchstabieren?", "İyi günler! Adınıza ve soyadınıza ihtiyacım var. Harfleyebilir misiniz?", "Adını söyle: Mein Vorname ist … Mein Nachname ist …", [
      r(["vorname", "nachname", "heiße", "heisse", "name", "bin"], "Danke. Buchstabieren Sie bitte den Nachnamen.", "Teşekkürler. Lütfen soyadınızı harfleyin.", "t2", ["Mein Nachname ist …"]),
    ], { say: "Wie ist Ihr Vorname und Ihr Nachname?", sayTr: "Adınız ve soyadınız ne?", example: "Mein Vorname ist Ayşe. Mein Nachname ist Demir." }),
    t("t2", "Buchstabieren Sie bitte den Nachnamen.", "Soyadınızı harfleyin lütfen.", "Harf harf söyle: D-E-M-I-R", [
      r(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "y", "z", "buchstabiere"], "Danke. Und Ihre Straße? Wie schreibt man das?", "Teşekkürler. Peki sokağınız? Nasıl yazılıyor?", "t3", ["Buchstabieren Sie bitte."]),
    ], { say: "Bitte langsam buchstabieren: D – E – M …", sayTr: "Lütfen yavaşça harfleyin: D – E – M…", example: "D, E, M, I, R." }),
    t("t3", "Und Ihre Straße? Wie schreibt man das?", "Sokağınız? Nasıl yazılıyor?", "Sokağını söyle ve harfle; bilmiyorsan sor: Wie schreibt man das?", [
      r(["straße", "strasse", "weg", "platz", "schreibt", "wohne", "a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "r", "s", "t", "u"], "Alles klar. Ist Ihre E-Mail-Adresse auch mit dem Nachnamen?", "Anlaşıldı. E-posta adresiniz de soyadınızla mı?", "t4", ["Wie schreibt man das?"]),
    ], { say: "Ihre Straße, bitte — und wie schreibt man sie?", sayTr: "Sokağınız, lütfen — nasıl yazılıyor?", example: "Bahnhofstraße. B, A, H, N, H, O, F." }),
    t("t4", "Ist Ihre E-Mail-Adresse auch mit dem Nachnamen?", "E-postanız da soyadınızla mı?", "Evet/hayır de; e-postanı söyle (punkt, at)", [
      r(["ja", "nein", "mail", "punkt", "at", "adresse", "gmail", "web"], "Danke schön. Und wie schreibt man Ihre Straße?", "Çok teşekkürler. Peki sokağınız nasıl yazılıyor?", "t5", []),
    ], { say: "Ihre E-Mail-Adresse, bitte.", sayTr: "E-posta adresiniz, lütfen.", example: "Ja: ayse punkt demir at mail punkt de." }),
    t("t5", "Wie schreibt man Ihre Straße?", "Sokağınız nasıl yazılıyor?", "Sokak adını harfle: Man schreibt …", [
      r(["straße", "strasse", "weg", "platz", "schreibt", "buchstabiere", "wohne", "man"], "Habe ich. Möchten Sie die Karte heute abholen oder soll ich sie schicken?", "Aldım. Kartı bugün almak ister misiniz, yoksa göndereyim mi?", "t6", ["Wie schreibt man das?"]),
    ], { say: "Buchstabieren Sie bitte Ihre Straße.", sayTr: "Sokağınızı harfleyin lütfen.", example: "Man schreibt: L-I-N-D-E-N-S-T-R-A-S-S-E." }),
    t("t6", "Möchten Sie die Karte heute abholen oder soll ich sie schicken?", "Kartı bugün mü alırsınız, göndereyim mi?", "Birini seç: abholen / schicken", [
      r(["abholen", "hole", "schicken", "post", "heute", "selbst", "komme"], "Gut. Buchstabieren Sie bitte noch einmal Ihren Vornamen.", "Peki. Adınızı bir kez daha harfler misiniz?", "t7", []),
    ], { say: "Abholen oder schicken?", sayTr: "Gelip almak mı, göndermek mi?", example: "Ich hole sie ab." }),
    t("t7", "Buchstabieren Sie bitte noch einmal Ihren Vornamen.", "Adınızı bir kez daha harfleyin lütfen.", "Adını harf harf söyle", [
      r(["vorname", "heiße", "heisse", "buchstabiere", "name", "schreibt"], "Perfekt, alles richtig. Ihre Karte ist am Freitag fertig — viel Spaß beim Lesen!", "Mükemmel, hepsi doğru. Kartınız cuma hazır — iyi okumalar!", undefined, ["Buchstabieren Sie bitte.", "Mein Nachname ist …"]),
    ], { say: "Ihren Vornamen bitte, Buchstabe für Buchstabe.", sayTr: "Adınızı harf harf söyleyin lütfen.", example: "A-Y-S-E." }),
  ],

  "de-a1-beruf": [
    t("t1", "Guten Abend! Und was sind Sie von Beruf?", "İyi akşamlar! Peki sizin mesleğiniz ne?", "Mesleğini söyle: Ich bin … von Beruf.", [
      r(["beruf", "bin", "lehrer", "lehrerin", "ingenieur", "ingenieurin", "arzt", "ärztin", "student", "studentin", "verkäufer", "koch", "köchin", "krankenpfleger", "krankenschwester", "programmierer", "arbeite"], "Oh, interessant! Und als was arbeiten Sie genau?", "Oo, ilginç! Peki tam olarak ne olarak çalışıyorsunuz?", "t2", ["Ich bin … von Beruf."]),
    ], { say: "Was sind Sie von Beruf? Lehrer, Ingenieur, Student …?", sayTr: "Mesleğiniz ne? Öğretmen, mühendis, öğrenci…?", example: "Ich bin Ingenieur von Beruf." }),
    t("t2", "Als was arbeiten Sie genau?", "Tam olarak ne olarak çalışıyorsunuz?", "İşini söyle: Ich arbeite als …", [
      r(["arbeite als", "als", "arbeite"], "Das klingt spannend. Und bei welcher Firma arbeiten Sie?", "Kulağa heyecan verici geliyor. Peki hangi şirkette çalışıyorsunuz?", "t3", ["Ich arbeite als …"]),
    ], { say: "Als was arbeiten Sie?", sayTr: "Ne olarak çalışıyorsunuz?", example: "Ich arbeite als Softwareingenieur." }),
    t("t3", "Bei welcher Firma arbeiten Sie?", "Hangi şirkette çalışıyorsunuz?", "Şirketini söyle: Ich arbeite bei …", [
      r(["arbeite bei", "bei", "firma", "siemens", "google", "bank", "schule", "krankenhaus", "selbstständig", "selbststaendig"], "Ach, die kenne ich! Gefällt Ihnen die Arbeit?", "Ah, onu biliyorum! İşiniz hoşunuza gidiyor mu?", "t4", ["Ich arbeite bei …"]),
    ], { say: "Bei welcher Firma?", sayTr: "Hangi şirkette?", example: "Ich arbeite bei Siemens." }),
    t("t4", "Gefällt Ihnen die Arbeit?", "İşiniz hoşunuza gidiyor mu?", "Evet/hayır de ve kısa bir sebep ekle", [
      r(["ja", "gefällt", "gefaellt", "gern", "gut", "nein", "stress", "viel", "interessant", "kollegen"], "Das freut mich. Ich bin übrigens Krankenpfleger. Arbeiten Sie auch am Wochenende?", "Buna sevindim. Ben bu arada hemşireyim. Siz hafta sonu da çalışıyor musunuz?", "t5", []),
    ], { say: "Gefällt Ihnen die Arbeit — ja oder nein?", sayTr: "İş hoşunuza gidiyor mu — evet mi hayır mı?", example: "Ja, die Arbeit gefällt mir." }),
    t("t5", "Arbeiten Sie auch am Wochenende?", "Hafta sonu da çalışıyor musunuz?", "Evet/hayır de ve kısaca açıkla", [
      r(["ja", "nein", "wochenende", "samstag", "sonntag", "arbeite", "frei", "manchmal"], "Verstehe. Und wie lange machen Sie das schon?", "Anlıyorum. Peki bu işi ne zamandır yapıyorsunuz?", "t6", []),
    ], { say: "Am Wochenende auch — ja oder nein?", sayTr: "Hafta sonu da mı — evet mi hayır mı?", example: "Nein, am Wochenende habe ich frei." }),
    t("t6", "Wie lange machen Sie das schon?", "Bu işi ne zamandır yapıyorsunuz?", "Süreyi söyle: seit … Jahren", [
      r(["jahr", "jahre", "monat", "monate", "seit", "lange", "neu", "anfang"], "Respekt! Kommen Sie, ich hole uns etwas zu trinken — schön, Sie kennenzulernen.", "Helal olsun! Gelin, bize içecek bir şey getireyim — tanıştığımıza memnun oldum.", undefined, ["Ich bin … von Beruf.", "Ich arbeite bei …"]),
    ], { say: "Seit wann machen Sie das?", sayTr: "Ne zamandır yapıyorsunuz?", example: "Seit drei Jahren." }),
  ],

  "de-a1-alter": [
    t("t1", "Hallo, ich bin Lena und heute dreißig Jahre alt. Wie alt bist du?", "Merhaba, ben Lena ve bugün otuz yaşındayım. Sen kaç yaşındasın?", "Yaşını söyle: Ich bin … Jahre alt.", [
      r(["jahre", "alt", "bin", "zwanzig", "dreißig", "dreissig", "vierzig", "fünfzig", "fuenfzig", "achtzehn", "neunzehn"], "Herzlichen Glückwunsch nachträglich! Wo bist du geboren?", "Geçmiş doğum günün kutlu olsun! Nerede doğdun?", "t2", ["Ich bin … Jahre alt."]),
    ], { say: "Wie alt bist du?", sayTr: "Kaç yaşındasın?", example: "Ich bin fünfundzwanzig Jahre alt." }),
    t("t2", "Wo bist du geboren?", "Nerede doğdun?", "Doğum yerini söyle: Ich bin in … geboren.", [
      r(["geboren", "istanbul", "ankara", "izmir", "türkei", "turkei", "in"], "Schön! Ich bin in Hamburg geboren. Und wann hast du Geburtstag?", "Güzel! Ben Hamburg'da doğdum. Peki doğum günün ne zaman?", "t3", ["Ich bin in … geboren."]),
    ], { say: "In welcher Stadt bist du geboren?", sayTr: "Hangi şehirde doğdun?", example: "Ich bin in Istanbul geboren." }),
    t("t3", "Wann hast du Geburtstag?", "Doğum günün ne zaman?", "Ayı söyle: im Mai / im Oktober", [
      r(["januar", "februar", "märz", "maerz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember", "geburtstag", "im"], "Dann feiern wir bald wieder! Wie alt ist dein bester Freund oder deine beste Freundin?", "O zaman yakında yine kutlarız! En iyi arkadaşın kaç yaşında?", "t4", []),
    ], { say: "In welchem Monat hast du Geburtstag?", sayTr: "Hangi ayda doğum günün?", example: "Ich habe im Oktober Geburtstag." }),
    t("t4", "Wie alt ist dein bester Freund oder deine beste Freundin?", "En iyi arkadaşın kaç yaşında?", "Arkadaşının yaşını söyle ve Lena'ya geri sor: Wie alt bist du?", [
      r(["jahre", "alt", "ist", "zwanzig", "dreißig", "dreissig", "vierzig", "wie alt"], "Ha, fast so alt wie ich! Und wo bist du geboren?", "Ha, neredeyse benim yaşımda! Peki sen nerede doğdun?", "t5", ["Wie alt bist du?"]),
    ], { say: "Wie alt ist dein Freund oder deine Freundin?", sayTr: "Arkadaşın kaç yaşında?", example: "Er ist achtundzwanzig Jahre alt." }),
    t("t5", "Wo bist du geboren?", "Nerede doğdun?", "Doğduğun yeri söyle: Ich bin in … geboren", [
      r(["geboren", "bin", "izmir", "ankara", "istanbul", "stadt", "dorf"], "Im Ernst? Meine Mutter kommt auch von dort! Warst du dieses Jahr schon dort?", "Cidden mi? Annem de oralı! Bu yıl gittin mi oraya?", "t6", ["Ich bin in … geboren."]),
    ], { say: "In welcher Stadt bist du geboren?", sayTr: "Hangi şehirde doğdun?", example: "Ich bin in Izmir geboren." }),
    t("t6", "Warst du dieses Jahr schon dort?", "Bu yıl oraya gittin mi?", "Evet/hayır de ve kısa bir şey ekle", [
      r(["ja", "nein", "war", "sommer", "jahr", "noch", "nicht", "bald"], "Wie schön — dann haben wir ja etwas gemeinsam! Komm, wir holen uns ein Stück Kuchen.", "Ne güzel — demek ortak bir yanımız var! Gel, birer dilim pasta alalım.", undefined, []),
    ], { say: "Dieses Jahr schon dort — ja oder nein?", sayTr: "Bu yıl gittin mi — evet mi hayır mı?", example: "Ja, im Sommer war ich dort." }),
  ],

  "de-a1-formular": [
    t("t1", "Guten Tag! Wie ist Ihr Name, bitte?", "İyi günler! Adınız nedir?", "Adını ve soyadını söyle: Mein Name ist …", [
      r(["name", "heiße", "heisse", "bin", "vorname", "nachname"], "Danke. Wie ist Ihre Adresse?", "Teşekkürler. Adresiniz nedir?", "t2", ["Wie ist Ihr Name?"]),
    ], { say: "Ihr Name, bitte — Vorname und Nachname.", sayTr: "Adınız, lütfen — ad ve soyad.", example: "Mein Name ist Ayşe Demir." }),
    t("t2", "Wie ist Ihre Adresse?", "Adresiniz nedir?", "Adresini söyle: Meine Adresse ist … Straße, Nummer …", [
      r(["adresse", "straße", "strasse", "weg", "platz", "nummer", "wohne"], "Und die Postleitzahl?", "Peki posta kodu?", "t3", ["Meine Adresse ist …"]),
    ], { say: "Ihre Adresse, bitte: Straße und Hausnummer.", sayTr: "Adresiniz, lütfen: sokak ve kapı numarası.", example: "Meine Adresse ist Bahnhofstraße zwölf." }),
    t("t3", "Und die Postleitzahl?", "Peki posta kodu?", "Posta kodunu ve şehri söyle", [
      r(["postleitzahl", "null", "eins", "zwei", "drei", "vier", "fünf", "fuenf", "sechs", "sieben", "acht", "neun", "zürich", "zurich", "berlin", "stadt"], "Gut. Und wie ist Ihre Telefonnummer?", "İyi. Peki telefon numaranız?", "t4", []),
    ], { say: "Die Postleitzahl und die Stadt, bitte.", sayTr: "Posta kodu ve şehir, lütfen.", example: "Achtzig null null vier, Zürich." }),
    t("t4", "Wie ist Ihre Telefonnummer?", "Telefon numaranız kaç?", "Numaranı söyle; sonra memur birkaç şey daha soracak", [
      r(["nummer", "null", "eins", "zwei", "drei", "vier", "fünf", "fuenf", "sechs", "sieben", "acht", "neun", "telefon", "handy"], "Danke. Seit wann wohnen Sie in dieser Wohnung?", "Teşekkürler. Bu dairede ne zamandan beri oturuyorsunuz?", "t5", []),
    ], { say: "Ihre Telefonnummer, bitte.", sayTr: "Telefon numaranız, lütfen.", example: "Meine Nummer ist null sieben sechs, eins zwei drei." }),
    t("t5", "Seit wann wohnen Sie in dieser Wohnung?", "Bu dairede ne zamandan beri oturuyorsunuz?", "Tarihi ya da süreyi söyle: seit …", [
      r(["seit", "januar", "februar", "märz", "maerz", "april", "monat", "woche", "erste", "zweite"], "Notiert. Und Ihre Postleitzahl noch einmal, bitte?", "Not aldım. Posta kodunuzu bir kez daha söyler misiniz?", "t6", []),
    ], { say: "Seit wann wohnen Sie dort?", sayTr: "Orada ne zamandan beri oturuyorsunuz?", example: "Seit dem ersten März." }),
    t("t6", "Und Ihre Postleitzahl noch einmal, bitte?", "Posta kodunuz bir kez daha, lütfen?", "Posta kodunu rakam rakam söyle", [
      r(["null", "eins", "zwei", "drei", "vier", "fünf", "fuenf", "sechs", "sieben", "acht", "neun", "postleitzahl"], "Alles erfasst. Unterschreiben Sie bitte hier — ist alles richtig?", "Hepsi kaydedildi. Buraya imza atın lütfen — her şey doğru mu?", "t7", ["Meine Adresse ist …"]),
    ], { say: "Ihre Postleitzahl, bitte.", sayTr: "Posta kodunuz, lütfen.", example: "Fünf null sechs sechs sieben." }),
    t("t7", "Unterschreiben Sie bitte hier — ist alles richtig?", "Buraya imza atın — her şey doğru mu?", "Onayla: Ja, das stimmt.", [
      r(["ja", "stimmt", "richtig", "okay", "ok", "unterschreibe", "nein", "falsch"], "Dann ist Ihre Anmeldung fertig. Hier ist die Bestätigung — auf Wiedersehen!", "O zaman kaydınız tamam. İşte belgeniz — hoşça kalın!", undefined, ["Unterschreiben Sie hier, bitte."]),
    ], { say: "Ist alles richtig — ja oder nein?", sayTr: "Her şey doğru mu — evet mi hayır mı?", example: "Ja, das stimmt." }),
  ],
};
