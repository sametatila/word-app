/**
 * Çeviri kurtarma kalite testi — `npm run test:translate-check`
 *
 *   npm run test:translate-check                    (Cloudflare, Gemma)
 *   CHAT_PROVIDER=groq npm run test:translate-check (yedek sağlayıcı)
 *   npm run test:translate-check -- --old           (eski tam rubrik yolunu da ölç)
 *
 * Elle yazılmış, etiketli çeviriler (canlı kullanıcı metni YOK). Etiket: öğretmen
 * bu çeviriyi kabul eder mi? Anlam korunmuş (eşanlamlı, geçerli başka sıra ya da
 * yapı, kaynakta belirsiz zaman/cinsiyetin geçerli karşılığı serbest) VE
 * dilbilgisi doğru. Yalnız `matchSentence`in "yanlış" ya da "sıra" dediği ve en az
 * 3 kelimelik cevaplar modele gidiyor; küme de öyle süzülüyor. `--new` yalnız son
 * ayrılmış kümeyi koşar.
 *
 * İki küme: AYAR (istem bunlara bakılarak yazıldı) ve AYRILMIŞ (istem yazıldıktan
 * sonra, sonucu görmeden yazıldı). İstem değişirse yeni bir ayrılmış küme ekle.
 *
 * Ölçüt (motto: kalite düşmez): yanlış kabul sıfır olmalı; yanlış kabul hatayı
 * pekiştirdiği için yanlış retten ağır sayılır.
 */
import "dotenv/config";
import { completeChat, type CallReport } from "../src/lib/chat-providers";
import { assessSystemPrompt, assessUserMessage, parseAssessment, ASSESS_MAX_TOKENS, type AssessLevel, type AssessRequest } from "../src/lib/assess-prompts";
import { matchSentence } from "../src/lib/sentence-match";
import { isTranslateCheck, runTranslateCheck, translateAccepted, translateCheckAssessment } from "../src/lib/translate-check";

export type TItem = { lang: "de" | "en"; level: AssessLevel; source: string; target: string; student: string; ok: boolean; note: string };
const T = (lang: TItem["lang"], level: AssessLevel, source: string, target: string, student: string, ok: boolean, note: string): TItem => ({
  lang,
  level,
  source,
  target,
  student,
  ok,
  note,
});

export const TUNE: TItem[] = [
  T("de", "A2", "Yarın annemi ziyaret edeceğim.", "Morgen besuche ich meine Mutter.", "Ich werde morgen meine Mutter besuchen.", true, "Futur I"),
  T("de", "A2", "Yarın annemi ziyaret edeceğim.", "Morgen besuche ich meine Mutter.", "Morgen ich besuche meine Mutter.", false, "V2"),
  T("de", "A1", "Doktora gitmem gerekiyor.", "Ich muss zum Arzt gehen.", "Ich muss zum Doktor gehen.", true, "eşanlamlı"),
  T("de", "A1", "Doktora gitmem gerekiyor.", "Ich muss zum Arzt gehen.", "Ich muss zum Arzt gehe.", false, "mastar"),
  T("de", "A2", "Dün sinemaya gittim.", "Gestern bin ich ins Kino gegangen.", "Ich ging gestern ins Kino.", true, "Präteritum"),
  T("de", "A2", "Dün sinemaya gittim.", "Gestern bin ich ins Kino gegangen.", "Gestern habe ich ins Kino gegangen.", false, "yardımcı fiil"),
  T("de", "A1", "Bu akşam vaktim yok.", "Heute Abend habe ich keine Zeit.", "Heute Abend habe ich Zeit.", false, "olumsuzluk eksik"),
  T("de", "A1", "Kahveyi sütlü içerim.", "Ich trinke den Kaffee mit Milch.", "Ich trinke Kaffee ohne Milch.", false, "anlam"),
  T("de", "A1", "Otobüs durağı nerede?", "Wo ist die Bushaltestelle?", "Wo ist hier die Bushaltestelle?", true, "hier"),
  T("de", "A1", "Otobüs durağı nerede?", "Wo ist die Bushaltestelle?", "Wo ist der Bushaltestelle?", false, "artikel"),
  T("de", "A1", "Kız kardeşim Berlin'de çalışıyor.", "Meine Schwester arbeitet in Berlin.", "Mein Schwester arbeitet in Berlin.", false, "iyelik"),
  T("de", "A1", "Bana yardım edebilir misiniz?", "Können Sie mir helfen?", "Könnten Sie mir bitte helfen?", true, "Konjunktiv nezaket"),
  T("de", "A1", "Bana yardım edebilir misiniz?", "Können Sie mir helfen?", "Können Sie mich helfen?", false, "Dativ"),
  T("de", "A1", "Hafta sonu ne yapıyorsun?", "Was machst du am Wochenende?", "Was hast du am Wochenende vor?", true, "vorhaben"),
  T("de", "A1", "Hafta sonu ne yapıyorsun?", "Was machst du am Wochenende?", "Was machst du in Wochenende?", false, "edat"),
  T("de", "A2", "Çok güzel bir daire buldum.", "Ich habe eine sehr schöne Wohnung gefunden.", "Ich fand eine sehr schöne Wohnung.", true, "Präteritum"),
  T("de", "A2", "Çok güzel bir daire buldum.", "Ich habe eine sehr schöne Wohnung gefunden.", "Ich habe eine sehr schöne Wohnung finden.", false, "Partizip"),
  T("de", "A2", "Tren on dakika gecikti.", "Der Zug hatte zehn Minuten Verspätung.", "Der Zug ist zehn Minuten zu spät gekommen.", true, "yeniden ifade"),
  T("de", "B1", "İş başvurusu için bir özgeçmiş yazıyorum.", "Ich schreibe einen Lebenslauf für die Bewerbung.", "Für die Bewerbung schreibe ich einen Lebenslauf.", true, "sıra"),
  T("de", "A1", "Hava bugün çok soğuk.", "Das Wetter ist heute sehr kalt.", "Heute ist es sehr kalt.", true, "es"),
  T("de", "A1", "Hava bugün çok soğuk.", "Das Wetter ist heute sehr kalt.", "Heute das Wetter ist sehr kalt.", false, "V2"),
  T("de", "A2", "Çocuklarım okula yürüyerek gidiyor.", "Meine Kinder gehen zu Fuß zur Schule.", "Meine Kinder laufen zur Schule.", true, "laufen"),
  T("de", "A2", "Çocuklarım okula yürüyerek gidiyor.", "Meine Kinder gehen zu Fuß zur Schule.", "Meine Kinder gehen mit dem Bus zur Schule.", false, "anlam"),
  T("de", "A2", "Bir randevu almak istiyorum.", "Ich möchte einen Termin vereinbaren.", "Ich hätte gern einen Termin.", true, "hätte gern"),
  T("de", "A2", "Bir randevu almak istiyorum.", "Ich möchte einen Termin vereinbaren.", "Ich möchte ein Termin vereinbaren.", false, "Akkusativ"),
  T("de", "A1", "Yeni işim çok ilginç.", "Meine neue Arbeit ist sehr interessant.", "Meine neue Arbeit ist sehr interessiert.", false, "sözcük"),
  T("de", "B1", "Almanca öğrenmek istiyorum çünkü Almanya'da çalışmak istiyorum.", "Ich möchte Deutsch lernen, weil ich in Deutschland arbeiten möchte.", "Ich will Deutsch lernen, weil ich in Deutschland arbeiten will.", true, "wollen"),
  T("de", "B1", "Almanca öğrenmek istiyorum çünkü Almanya'da çalışmak istiyorum.", "Ich möchte Deutsch lernen, weil ich in Deutschland arbeiten möchte.", "Ich möchte Deutsch lernen, weil ich möchte in Deutschland arbeiten.", false, "fiil sonda"),
  T("de", "A2", "Kiramı her ayın başında öderim.", "Ich zahle meine Miete am Anfang jedes Monats.", "Ich bezahle meine Miete immer am Monatsanfang.", true, "Monatsanfang"),
  T("de", "A2", "Kiramı her ayın başında öderim.", "Ich zahle meine Miete am Anfang jedes Monats.", "Ich zahle meine Miete am Ende jedes Monats.", false, "anlam"),
  T("de", "A2", "Eşim ve ben iki yıldır Almanya'da yaşıyoruz.", "Meine Frau und ich wohnen seit zwei Jahren in Deutschland.", "Mein Mann und ich leben seit zwei Jahren in Deutschland.", true, "eş cinsiyetsiz"),
  T("de", "A2", "Eşim ve ben iki yıldır Almanya'da yaşıyoruz.", "Meine Frau und ich wohnen seit zwei Jahren in Deutschland.", "Meine Frau und ich wohnen seit zwei Jahre in Deutschland.", false, "Dativ çoğul"),
  T("de", "A1", "O (kadın) Berlin'de yaşıyor.", "Sie wohnt in Berlin.", "Sie wohnen in Berlin.", false, "çekim"),
  T("de", "A2", "Arkadaşımla sinemaya gidiyorum.", "Ich gehe mit meinem Freund ins Kino.", "Ich gehe mit mein Freund ins Kino.", false, "Dativ"),
  T("de", "A2", "Arkadaşımla sinemaya gidiyorum.", "Ich gehe mit meinem Freund ins Kino.", "Mit meiner Freundin gehe ich ins Kino.", true, "arkadaş cinsiyetsiz"),
  T("en", "A2", "Dün işe geç kaldım.", "I was late for work yesterday.", "Yesterday I was late to work.", true, "late to"),
  T("en", "A2", "Dün işe geç kaldım.", "I was late for work yesterday.", "Yesterday I am late for work.", false, "zaman"),
  T("en", "A2", "Hafta sonları genellikle yüzmeye giderim.", "I usually go swimming on weekends.", "On weekends I usually go swimming.", true, "sıra"),
  T("en", "A2", "Hafta sonları genellikle yüzmeye giderim.", "I usually go swimming on weekends.", "I usually going swimming on weekends.", false, "çekim"),
  T("en", "A1", "Bir doktor randevusuna ihtiyacım var.", "I need a doctor's appointment.", "I need an appointment with a doctor.", true, "yeniden ifade"),
  T("en", "A1", "Bir doktor randevusuna ihtiyacım var.", "I need a doctor's appointment.", "I need a appointment with doctor.", false, "artikel"),
  T("en", "A2", "Kardeşim benden daha uzun.", "My brother is taller than me.", "My brother is taller than I am.", true, "than I am"),
  T("en", "A2", "Kardeşim benden daha uzun.", "My brother is taller than me.", "My brother is more tall than me.", false, "karşılaştırma"),
  T("en", "A1", "Bu akşam ne yapmak istersin?", "What would you like to do tonight?", "What do you want to do this evening?", true, "want"),
  T("en", "A1", "Bu akşam ne yapmak istersin?", "What would you like to do tonight?", "What you want to do tonight?", false, "yardımcı fiil"),
  T("en", "B1", "Toplantı ertelendi.", "The meeting was postponed.", "The meeting has been postponed.", true, "present perfect"),
  T("en", "B1", "Toplantı ertelendi.", "The meeting was postponed.", "The meeting was cancelled.", false, "anlam"),
  T("en", "A2", "Hiç Londra'ya gittin mi?", "Have you ever been to London?", "Did you ever go to London?", true, "AmE past"),
  T("en", "A2", "Hiç Londra'ya gittin mi?", "Have you ever been to London?", "Have you ever went to London?", false, "participle"),
  T("en", "A1", "Kahvemi şekersiz içerim.", "I drink my coffee without sugar.", "I take my coffee with no sugar.", true, "take"),
  T("en", "A1", "Kahvemi şekersiz içerim.", "I drink my coffee without sugar.", "I drink my coffee with sugar.", false, "anlam"),
];

/* İstem (translate-check.ts) yazıldıktan sonra, sonucu görmeden yazıldı. */
export const HOLDOUT: TItem[] = [
  T("de", "A2", "Akşamları genellikle kitap okurum.", "Abends lese ich meistens ein Buch.", "Ich lese abends normalerweise ein Buch.", true, "normalerweise"),
  T("de", "A2", "Akşamları genellikle kitap okurum.", "Abends lese ich meistens ein Buch.", "Ich lese abends normalerweise eine Buch.", false, "artikel"),
  T("de", "B1", "Markete gitmeden önce bir liste yazarım.", "Bevor ich zum Supermarkt gehe, schreibe ich eine Liste.", "Ich schreibe eine Liste, bevor ich einkaufen gehe.", true, "einkaufen"),
  T("de", "B1", "Markete gitmeden önce bir liste yazarım.", "Bevor ich zum Supermarkt gehe, schreibe ich eine Liste.", "Bevor ich zum Supermarkt gehe, ich schreibe eine Liste.", false, "yan cümleden sonra V2"),
  T("de", "A2", "Annem bana bir hediye verdi.", "Meine Mutter hat mir ein Geschenk gegeben.", "Meine Mutter gab mir ein Geschenk.", true, "Präteritum"),
  T("de", "A2", "Annem bana bir hediye verdi.", "Meine Mutter hat mir ein Geschenk gegeben.", "Meine Mutter hat mich ein Geschenk gegeben.", false, "Dativ"),
  T("de", "A1", "Kapıyı kapatabilir misin?", "Kannst du die Tür schließen?", "Kannst du bitte die Tür zumachen?", true, "zumachen"),
  T("de", "A1", "Kapıyı kapatabilir misin?", "Kannst du die Tür schließen?", "Kannst du die Tür schließt?", false, "mastar"),
  T("de", "A1", "Kapıyı kapatabilir misin?", "Kannst du die Tür schließen?", "Kannst du das Fenster schließen?", false, "anlam"),
  T("de", "B1", "Hastaydım, bu yüzden işe gitmedim.", "Ich war krank, deshalb bin ich nicht zur Arbeit gegangen.", "Weil ich krank war, bin ich nicht zur Arbeit gegangen.", true, "weil"),
  T("de", "B1", "Hastaydım, bu yüzden işe gitmedim.", "Ich war krank, deshalb bin ich nicht zur Arbeit gegangen.", "Ich war krank, deshalb ich bin nicht zur Arbeit gegangen.", false, "deshalb + V2"),
  T("de", "B1", "Hastaydım, bu yüzden işe gitmedim.", "Ich war krank, deshalb bin ich nicht zur Arbeit gegangen.", "Ich war krank, deshalb bin ich zur Arbeit gegangen.", false, "olumsuzluk eksik"),
  T("de", "A2", "Bu ceket bana çok büyük.", "Diese Jacke ist mir zu groß.", "Die Jacke ist mir viel zu groß.", true, "viel zu"),
  T("de", "A2", "Bu ceket bana çok büyük.", "Diese Jacke ist mir zu groß.", "Diese Jacke ist mich zu groß.", false, "Dativ"),
  T("de", "A1", "Saat kaçta buluşalım?", "Um wie viel Uhr treffen wir uns?", "Um wie viel Uhr sollen wir uns treffen?", true, "sollen"),
  T("de", "A1", "Saat kaçta buluşalım?", "Um wie viel Uhr treffen wir uns?", "Um wie viel Uhr treffen wir?", false, "uns eksik"),
  T("en", "A2", "Geçen yaz İspanya'ya gittik.", "We went to Spain last summer.", "Last summer we traveled to Spain.", true, "traveled"),
  T("en", "A2", "Geçen yaz İspanya'ya gittik.", "We went to Spain last summer.", "Last summer we go to Spain.", false, "zaman"),
  T("en", "A2", "Ödevimi henüz bitirmedim.", "I haven't finished my homework yet.", "I didn't finish my homework yet.", true, "AmE past + yet"),
  T("en", "A2", "Ödevimi henüz bitirmedim.", "I haven't finished my homework yet.", "I haven't finish my homework yet.", false, "participle"),
  T("en", "A2", "Bu kitap o kitaptan daha ilginç.", "This book is more interesting than that book.", "This book is more interesting than that one.", true, "that one"),
  T("en", "A2", "Bu kitap o kitaptan daha ilginç.", "This book is more interesting than that book.", "This book is interestinger than that one.", false, "karşılaştırma"),
  T("en", "A2", "Bu kitap o kitaptan daha ilginç.", "This book is more interesting than that book.", "This book is more boring than that one.", false, "anlam"),
  T("en", "A1", "Bana tuzu uzatır mısın?", "Can you pass me the salt?", "Could you pass the salt, please?", true, "could"),
  T("en", "A1", "Bana tuzu uzatır mısın?", "Can you pass me the salt?", "Can you pass me the pepper?", false, "anlam"),
  T("en", "A1", "Her sabah koşuya çıkar.", "She goes running every morning.", "He goes for a run every morning.", true, "cinsiyet belirsiz"),
  T("en", "A1", "Her sabah koşuya çıkar.", "She goes running every morning.", "She go running every morning.", false, "3. tekil -s"),
];

/* İkinci ayrılmış küme: istem ilk ayrılmış kümenin sonucundan sonra genelleştirildi
   (Türkçe "o"nun cinsiyetsizliği, anlamı değiştirmeyen küçük ekler, Amerikan "yet");
   bu küme o değişiklikten sonra, sonucu görmeden yazıldı. */
export const HOLDOUT2: TItem[] = [
  T("de", "A2", "Bugün çok çalıştım.", "Heute habe ich viel gearbeitet.", "Heute arbeitete ich viel.", true, "Präteritum"),
  T("de", "A2", "Bugün çok çalıştım.", "Heute habe ich viel gearbeitet.", "Heute habe ich viel arbeitet.", false, "Partizip"),
  T("de", "A1", "Kardeşim bir doktor.", "Mein Bruder ist Arzt.", "Meine Schwester ist Ärztin.", true, "kardeş cinsiyetsiz"),
  T("de", "A1", "Kardeşim bir doktor.", "Mein Bruder ist Arzt.", "Mein Bruder sind Arzt.", false, "çekim"),
  T("de", "A2", "Bu akşam pizza yiyelim mi?", "Sollen wir heute Abend Pizza essen?", "Wollen wir heute Abend Pizza essen?", true, "wollen"),
  T("de", "A2", "Bu akşam pizza yiyelim mi?", "Sollen wir heute Abend Pizza essen?", "Sollen wir heute Abend Pizza gegessen?", false, "mastar"),
  T("de", "A2", "Bu akşam pizza yiyelim mi?", "Sollen wir heute Abend Pizza essen?", "Sollen wir morgen Abend Pizza essen?", false, "anlam"),
  T("de", "A1", "Lütfen yavaş konuşun.", "Bitte sprechen Sie langsam.", "Können Sie bitte langsamer sprechen?", true, "rica sorusu"),
  T("de", "A1", "Lütfen yavaş konuşun.", "Bitte sprechen Sie langsam.", "Bitte sprechen Sie schnell.", false, "anlam"),
  T("de", "A2", "Yeni bir iş arıyorum.", "Ich suche eine neue Arbeit.", "Ich suche einen neuen Job.", true, "Job"),
  T("de", "A2", "Yeni bir iş arıyorum.", "Ich suche eine neue Arbeit.", "Ich suche einen neue Job.", false, "sıfat çekimi"),
  T("de", "A2", "Pazartesi günü toplantım var.", "Am Montag habe ich ein Meeting.", "Ich habe am Montag eine Besprechung.", true, "Besprechung"),
  T("de", "A2", "Pazartesi günü toplantım var.", "Am Montag habe ich ein Meeting.", "Am Montag ich habe eine Besprechung.", false, "V2"),
  T("en", "A1", "Annem çok iyi yemek yapar.", "My mother cooks very well.", "My mom is a really good cook.", true, "yeniden ifade"),
  T("en", "A1", "Annem çok iyi yemek yapar.", "My mother cooks very well.", "My mother cook very well.", false, "3. tekil -s"),
  T("en", "A2", "Otobüsü kaçırdım.", "I missed the bus.", "I've missed the bus.", true, "present perfect"),
  T("en", "A2", "Otobüsü kaçırdım.", "I missed the bus.", "I missed the train.", false, "anlam"),
  T("en", "A2", "Yarın yağmur yağacak.", "It will rain tomorrow.", "It's going to rain tomorrow.", true, "going to"),
  T("en", "A2", "Yarın yağmur yağacak.", "It will rain tomorrow.", "It will raining tomorrow.", false, "biçim"),
  T("en", "A1", "Ona yardım ettim.", "I helped her.", "I helped him out.", true, "cinsiyet + out"),
  T("en", "A1", "Ona yardım ettim.", "I helped her.", "I helps him.", false, "çekim + zaman"),
  T("en", "A1", "Bu restoranı çok seviyorum.", "I love this restaurant.", "I really love this restaurant.", true, "really"),
  T("en", "A1", "Bu restoranı çok seviyorum.", "I love this restaurant.", "I don't like this restaurant.", false, "anlam"),
];

/* Üçüncü ayrılmış küme: cinsiyet kuralı ve "X → X" süzgeci eklendikten sonra, sonucu görmeden yazıldı. */
export const HOLDOUT3: TItem[] = [
  T("de", "A1", "Arkadaşım İstanbul'da yaşıyor.", "Meine Freundin wohnt in Istanbul.", "Mein Freund lebt in Istanbul.", true, "arkadaş cinsiyetsiz"),
  T("de", "A1", "Arkadaşım İstanbul'da yaşıyor.", "Meine Freundin wohnt in Istanbul.", "Mein Freund wohnen in Istanbul.", false, "çekim"),
  T("de", "A1", "O her gün kahve içer.", "Er trinkt jeden Tag Kaffee.", "Sie trinkt jeden Tag Kaffee.", true, "o cinsiyetsiz"),
  T("de", "A1", "O her gün kahve içer.", "Er trinkt jeden Tag Kaffee.", "Ich trinke jeden Tag Kaffee.", false, "kişi değişti"),
  T("de", "A2", "Öğretmenim çok sabırlı.", "Mein Lehrer ist sehr geduldig.", "Meine Lehrerin ist sehr geduldig.", true, "öğretmen cinsiyetsiz"),
  T("de", "A2", "Öğretmenim çok sabırlı.", "Mein Lehrer ist sehr geduldig.", "Mein Lehrer ist sehr ungeduldig.", false, "anlam"),
  T("en", "A1", "O bir mühendis.", "He is an engineer.", "She's an engineer.", true, "o cinsiyetsiz"),
  T("en", "A1", "O bir mühendis.", "He is an engineer.", "She is a engineer.", false, "artikel"),
  T("en", "A2", "Kuzenim Kanada'da okuyor.", "My cousin studies in Canada.", "My cousin is studying in Canada.", true, "continuous"),
  T("en", "A2", "Kuzenim Kanada'da okuyor.", "My cousin studies in Canada.", "My cousin study in Canada.", false, "3. tekil -s"),
];

/* Dördüncü ayrılmış küme (2026-10-09): kontrol artık konuşma anlatımında yazılan
   üretimde, cümle kurma/dizmede ve yerel "sıra" hükmünde de soruluyor. Başka
   doğru kuruluş ve geçerli başka diziliş kabul; V2/çekim hatası ret. Sonucu
   görmeden yazıldı. */
export const HOLDOUT4: TItem[] = [
  T("de", "A1", "Annemle babam bayrama geliyor.", "Meine Eltern kommen zum Fest.", "Meine Mutter und mein Vater kommen zum Fest.", true, "başka kuruluş"),
  T("de", "A1", "İki şişe su istiyorum.", "Ich hätte gern zwei Flaschen Wasser.", "Zwei Flaschen Wasser, bitte.", true, "kısa sipariş"),
  T("de", "A1", "Kahvaltıda çay içiyorum.", "Zum Frühstück trinke ich einen Tee.", "Zum Frühstück ich trinke einen Tee.", false, "V2"),
  T("de", "A1", "Kahvaltıda çay içiyorum.", "Zum Frühstück trinke ich einen Tee.", "Ich trinke zum Frühstück einen Tee.", true, "geçerli başka sıra"),
  T("de", "A1", "Yarın alışveriş yapıyorum.", "Ich kaufe morgen ein.", "Morgen kaufe ich ein.", true, "geçerli başka sıra (dizme)"),
  T("de", "A1", "Yarın alışveriş yapıyorum.", "Ich kaufe morgen ein.", "Morgen ich kaufe ein.", false, "V2 (dizme)"),
  T("de", "A1", "Yarın alışveriş yapıyorum.", "Ich kaufe morgen ein.", "Ich kaufe ein morgen.", false, "ayrılan parça sonda değil"),
  T("de", "A2", "Birlikte çok mutluyuz.", "Wir sind sehr glücklich zusammen.", "Wir sind zusammen sehr glücklich.", true, "QA: geçerli başka sıra"),
  T("de", "A2", "Birlikte çok mutluyuz.", "Wir sind sehr glücklich zusammen.", "Wir zusammen sind sehr glücklich.", false, "V2"),
  T("de", "A1", "Bu hangi beden?", "Welche Größe ist das?", "Was für eine Größe ist das?", true, "başka soru kalıbı"),
  T("de", "A1", "Bu hangi beden?", "Welche Größe ist das?", "Welche Größe das ist?", false, "soru sırası"),
  T("de", "A1", "Kedim yok.", "Ich habe keine Katze.", "Ich habe kein Katze.", false, "QA: çekim"),
  T("de", "A1", "Nerelisiniz?", "Woher kommen Sie?", "Woher kommst Sie?", false, "QA: çekim"),
  T("de", "A1", "Bunu deneyebilir miyim?", "Kann ich das anprobieren?", "Darf ich das anprobieren?", true, "modal eşanlamlı"),
  T("de", "A1", "Bunu deneyebilir miyim?", "Kann ich das anprobieren?", "Kann ich anprobieren das?", false, "fiil sonda değil"),
  T("en", "A2", "Hafta sonu sinemaya gidiyoruz.", "We are going to the cinema on the weekend.", "On the weekend we are going to the movies.", true, "başka sıra + eşanlamlı"),
  T("en", "A2", "Hafta sonu sinemaya gidiyoruz.", "We are going to the cinema on the weekend.", "We going to the cinema on the weekend.", false, "yardımcı fiil eksik"),
];

const PRICE: Record<string, { in: number; out: number }> = {
  cloudflare: { in: 0.1, out: 0.3 },
  groq: { in: 0.15, out: 0.6 },
};

type Call = { ms: number; inTok: number; outTok: number; provider: string };

async function call(system: string, user: string, maxTokens: number): Promise<{ text: string; c: Call }> {
  let rep: Parameters<CallReport>[0] | null = null;
  const t0 = Date.now();
  for (let attempt = 0; ; attempt++) {
    try {
      const text = await completeChat(system, [{ role: "user", content: user }], maxTokens, (r) => {
        if (r.ok) rep = r;
      });
      const r = rep as Parameters<CallReport>[0] | null;
      return { text, c: { ms: Date.now() - t0, inTok: r?.promptTokens ?? 0, outTok: r?.completionTokens ?? 0, provider: r?.provider ?? "?" } };
    } catch (err) {
      /* Groq ücretsiz katmanı dakikalık sınırda 429 veriyor; ölçülen şey kalite. */
      if (attempt < 4 && /429/.test((err as Error).message)) {
        await new Promise((res) => setTimeout(res, 15_000));
        continue;
      }
      throw err;
    }
  }
}

function toReq(x: TItem): AssessRequest {
  return { kind: "sentence", level: x.level, lang: x.lang, native: "tr", task: { prompt: `Çevir: ${x.source}`, target: x.target }, answer: { text: x.student } };
}

async function pool<T, R>(items: T[], n: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

async function evaluate(name: string, set: TItem[], withOld: boolean) {
  /* Model yerel hüküm "yanlış" ya da "sıra" olduğunda soruluyor (istemciler 2026-10-09'dan beri ikisinde). */
  const items = set.filter((x) => {
    const v = matchSentence(x.student, x.target, [], x.lang).verdict;
    return (v === "wrong" || v === "order") && x.student.split(/\s+/).length >= 3;
  });
  const conc = process.env.CHAT_PROVIDER === "groq" ? 1 : 4;
  const rows = await pool(items, conc, async (x) => {
    const req = toReq(x);
    if (!isTranslateCheck(req)) throw new Error(`isTranslateCheck tanımadı: ${x.student}`);
    const calls: Call[] = [];
    const raws: string[] = [];
    const v = await runTranslateCheck(req, async (system, user, maxTokens) => {
      const r = await call(system, user, maxTokens);
      calls.push(r.c);
      raws.push(r.text.slice(0, 120));
      return r.text;
    });
    const nu = { c: calls.reduce((a, c) => ({ ms: a.ms + c.ms, inTok: a.inTok + c.inTok, outTok: a.outTok + c.outTok, provider: c.provider }), { ms: 0, inTok: 0, outTok: 0, provider: calls[0]?.provider ?? "?" }) };
    const recheck = calls.length > 1 ? `${calls.length} çağrı: ${calls.map((c) => c.provider).join(" + ")}` : null;
    /* İstemcinin eşiği sunucunun kurduğu puana uygulanıyor: eski mobil sürüm de böyle karar veriyor. */
    const a = v ? translateCheckAssessment(req, v) : null;
    const newAccept = !!a && a.score.overall >= 75 && a.score.task >= 3;
    if (v && newAccept !== translateAccepted(v)) throw new Error(`puan eşiği kararla çelişiyor: ${x.student}`);
    let old: { accept: boolean; c: Call } | null = null;
    if (withOld) {
      const o = await call(assessSystemPrompt("sentence", x.level, x.lang, "tr"), assessUserMessage(req), ASSESS_MAX_TOKENS);
      const p = parseAssessment(o.text, x.student, "sentence");
      old = { accept: !!p && p.score.overall >= 75 && p.score.task >= 3, c: o.c };
    }
    return { x, newAccept, parsed: !!v, note: (v ? `${v.meaningNote} | ${v.grammarNote}` : raws.join(" ‖ ")) + (recheck ? ` ‖ ${recheck}` : ""), c: nu.c, old };
  });

  const line = (label: string, accept: (r: (typeof rows)[number]) => boolean, calls: Call[]) => {
    const fa = rows.filter((r) => !r.x.ok && accept(r));
    const fr = rows.filter((r) => r.x.ok && !accept(r));
    const med = [...calls.map((c) => c.ms)].sort((a, b) => a - b)[Math.floor(calls.length / 2)] ?? 0;
    const prov = calls[0]?.provider ?? "cloudflare";
    const p = PRICE[prov] ?? PRICE.cloudflare;
    const usd = calls.reduce((s, c) => s + (c.inTok * p.in + c.outTok * p.out) / 1e6, 0) / Math.max(calls.length, 1);
    console.log(
      `  ${label.padEnd(24)} doğru ${rows.length - fa.length - fr.length}/${rows.length}  yanlış kabul ${fa.length}  yanlış ret ${fr.length}  medyan ${med} ms  $/100K ${(usd * 1e5).toFixed(2)}  (${prov})`,
    );
    for (const r of fa) console.log(`      yanlış kabul: [${r.x.lang}] ${r.x.student} (${r.x.note})`);
    for (const r of fr) console.log(`      yanlış ret:   [${r.x.lang}] ${r.x.student} (${r.x.note}) → ${r.note}`);
    return fa.length;
  };
  console.log(`\n${name}: ${set.length} örnek, modele giden ${items.length}`);
  const fa = line("Çeviri kontrolü", (r) => r.newAccept, rows.map((r) => r.c));
  if (withOld) line("Eski tam rubrik", (r) => !!r.old?.accept, rows.map((r) => r.old!.c));
  if (process.env.VERBOSE) for (const r of rows) console.log(`      ${r.x.ok ? "✓" : "✗"} ${r.newAccept ? "kabul" : "ret  "} ${r.x.student} → ${r.note}`);
  const bad = rows.filter((r) => !r.parsed).length;
  if (bad) console.log(`  okunamayan çıktı: ${bad}`);
  return fa + bad;
}

async function main() {
  const withOld = process.argv.includes("--old");
  let failures = 0;
  if (!process.argv.includes("--new")) {
    failures += await evaluate("AYAR", TUNE, withOld);
    failures += await evaluate("AYRILMIŞ", HOLDOUT, withOld);
    failures += await evaluate("AYRILMIŞ 2", HOLDOUT2, withOld);
    failures += await evaluate("AYRILMIŞ 3", HOLDOUT3, withOld);
  }
  failures += await evaluate("AYRILMIŞ 4 (ders, dizme, sıra)", HOLDOUT4, withOld);
  /* Kapı: yanlış kabul ya da okunamayan çıktı varsa kırmızı. */
  if (failures) {
    console.log(`\nKIRMIZI: ${failures} yanlış kabul / okunamayan çıktı`);
    process.exit(1);
  }
  console.log("\nYEŞİL: yanlış kabul yok");
}

if (process.argv[1]?.endsWith("translate-check-eval.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
