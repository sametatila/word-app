# Mağaza vitrin kareleri

Mağazaya yüklenen ekran görüntüleri burada üretiliyor. Üç parça var:

| Klasör | Ne | Depoda mı |
|---|---|---|
| `raw/` | Cihazdan alınmış ham ekran görüntüleri (1080×2266, durum ve gezinme çubukları kırpılmış) | **Evet** — yeniden üretilemez, cihaz ve giriş yapılmış hesap ister |
| `plan/` | Hangi ham görüntüye hangi altyazı, hangi sırayla | **Evet** |
| `play/`, `appstore/` | Üretilen kareler | Hayır — `.gitignore`'da, tek komutla yeniden üretilir |

## Vitrin kararları (2026-09-25) — GEÇERLİ OLAN BU

Samet'le soru-cevapla verildi. `plan/*.json` (a-walk, b-exam, c-native) ve
`docs/appstore/listing.md` §4'teki eski sıra **onaylanmamış referanslardır**; çelişirse bu
bölüm geçerli. Kareler henüz ÇEKİLMEDİ: önce tasarım çalışması yapılacak (Samet), çekim bu
tanıma göre olacak. Karar değişirse bu bölüm güncellenir, yeni belge açılmaz.

**Konumlandırma.** Lernomi bir *dil* uygulaması; Almanca ilk ve en güçlü kurs (vitrin adı
"Almanca Öğren A1-C1" ASO için), İngilizce ikinci planda ama açıklamada anılır: "tek dil
uygulaması" izlenimi verilmez. Ana vaat **gerçek dil eğitimi** (tam müfredat, konuşarak,
Türkçe anlatım); sınav bu eğitimin sonucu olarak ikinci katman. Sınava hazırlanan kitle
(tarihi olan öğrenci) ayrıca WhatsApp/Telegram grup kampanyasıyla (2 ay) hedefleniyor;
kampanya vitrinde YOK (görselde fiyat/süreli teklif olmaz), grup sayfasında.

**Altyazı / tek cümle:** **"Konuş, anla, sınava hazırlan"** (tr, 28 karakter; iOS subtitle,
Play kısa açıklamanın ilk cümlesi). en-US: **"Speak, understand, ace exams"** (28) ·
de-DE: **"Sprechen, verstehen, bestehen"** (29).

**Play kısa açıklaması (tr, 70):** "Konuş, anla, sınava hazırlan: A1'den C1'e Almanca, Türkçe
anlatımla." (iOS altyazısıyla aynı cümleyle başlar.)

**Sayılar (2026-09-25, Samet):** birim KELİME + ALIŞTIRMA + DENEME SINAVI; adım/ünite sayısı
anılmaz. Yuvarlak ve doğru: Almanca "8.500'den fazla kelime, 900'den fazla alıştırma, **50'den fazla
deneme sınavı**" (Samet: içerik artacak, "60" ve seviye başına kesin sayı "her seviyede 12" YAZILMAZ) (ölçüm: 8.707 kelime, beceri alıştırması canlıda 1.120, repo sayımı 995; 60 deneme
sınavı); İngilizce "7.000'den fazla kelime, 900'den fazla alıştırma, 50'den fazla deneme sınavı" (7.175 /
1.034 canlı, 939 repo / 60). İçerik azalırsa bu cümleler gözden geçirilir.

**Konuşma adımının vitrindeki anlatımı (Samet'in seçtiği metin):** "Doktorda, iş
görüşmesinde, yol sorarken… Gerçek hayatta karşına çıkacak durumları yapay zekâ karakteriyle
konuşarak çalışırsın. Hatanı hemen düzeltir, takıldığında ne diyebileceğini önerir." Ücretsizde
seviye başına sınırlı olduğu için "ücretsiz ve sınırsız" denmez.

**Açıklama metni kararları (2026-09-25):** her iddia koda, canlı ayara ve içeriğe göre
doğrulanır, gerekirse metin değişir (Samet'in kuralı). Doğrulanmış tr taslağı ve 32
satırlık kanıt tablosu oturum çıktısında; kararlar:
- Deneme süresi açıkça: "yeni abonelere ilk ay ücretsiz" (iki mağazada 175 bölgede FREE_TRIAL
  1 ay, ASC ve Play'den okundu; yalnız daha önce abone olmamışa).
- "8.500'den fazla kelime" (Almanca 8.707; İngilizce "7.000'den fazla", 7.175).
- "HESAPSIZ BAŞLA" paragrafı kalıyor (hesapsız başlama, ilerlemenin hesaba taşınması, aynı
  hesap telefon/tablet/web, hesap isteyen özellikler).
- Ücretsiz haklar "bitir + seri" mekaniğiyle somut anlatılır (2026-09-25 kararı, kod varsayılanı:
  seviye başına Patika 2 Konuşma + 2 Yazma, Beceriler 2 konuşma + 2 yazma, 1 deneme sınavı;
  açık olanları bitirip 7 günlük seri yapınca +2 / deneme +1, sonra her 7 günlük seride
  yeniden; kademe tavanı yok; haftalık yenilenen hak KALKTI). Panelde sayı değişirse metin de.
- Düzeltilen yanlış/yanıltıcı iddialar: sohbet "daha doğal söyleyiş önermez" (yalnız dil
  bilgisi düzeltir + takılınca 3 öneri; `src/lib/conversations/chat.ts` üslup kuralı); Premium'da
  da deneme sınavları üçerli paketlerle sırayla açılır (`computePacks`); deneme sınavında
  sonuç tek yüzde + hata→düzeltme (ölçüt çubukları yalnız beceri turu ve modül sınavında);
  aralıklı tekrar SM-2 türevi ("unutmadan önce", "tam unutmak üzereyken" DEĞİL); kulaklık
  zorunlu değil. Metinde Android/Google Play adı geçmez (App Store 2.3.10).
- KARAR VERİLDİ (2026-09-25, `docs/premium/README.md` §2): konuşmanın yapay zekâ sohbeti artık
  Patika'nın **Konuşma** adımı ve ücretsizde seviye başına 2 + "bitir + seri"; hak yoksa adım
  kilitli ve Premium ister. Misafir ve yapay zekâ iznini reddeden senaryolu konuşmayla devam
  eder (maliyetsiz). Premium tavanı 300 mesaj/gün KALIYOR. Metin sohbeti "ücretsiz ve
  sınırsız" diye anmaz.

**Beş sütun (öncelik sırası):** 1) **A1'den C1'e adım adım**, Türkçe anlatım ("müfredat" ve "tam" kullanılmaz) · 2) konuşarak
öğren: gerçek hayattan durumlarda yapay zekâ karakteriyle sohbet + konuşmaya geri bildirim · 3) dört becerili deneme sınavları,
konuşma ve yazma da puanlanır · 4) Cepte yürüyüş (ekran kapalı, **Premium**; ekran açık
yürüyüş ücretsizde günde 3 tur, `plan.free_walk`) · 5) günlük kelime turu ve seri.

**Kare listesi (iPhone 6.9" ve Play telefon, bu sırayla; ilk üçü aramada görünür):**

| # | Sütun | Ekran | İçerik durumu (çekimde hazırlanacak) | Altyazı taslağı |
|---|---|---|---|---|
| 1 | A1'den C1'e adım adım | Patika: A1→C1 ünite haritası (Okuma, Dinleme, Konuşma, Yazma, Dil bilgisi, Quiz, Sınav) | B1'de ilerleyen hesap; A1–A2 tamamlanmış görünür | A1'den C1'e adım adım, Türkçe anlatımla |
| 2 | Konuşma | Patika › Konuşma adımı: sahne sohbeti | Gerçek bir sahne (ör. B1 doktor randevusu); kullanıcının cümlesi ve düzeltmesi görünür; yapay zekâ bildirimi görünür | Konuş, düzeltmeni anında gör |
| 3 | Sınav | Deneme sınavı sonucu | B1 deneme sınavı: genel yüzde, bölüm sonuçları ve yazma/konuşma için hata→düzeltme listesi (ölçüt çubuğu YOK; deneme sınavında öyle bir ekran yok) | Konuşma ve yazma da puanlanır |
| 4 | Fark | Cepte yürüyüş + kilit ekranı | Ekran kapalı akış; kilit ekranında "Yürüyüş modu açık" | Ekran kapalı, yolda çalış · Premium |
| 5 | Alışkanlık | Günlük kelime turu | Sesli tur, kalan kelime sayısı | Her gün, unutmadan önce |
| 6 | Beceriler | Beceri kütüphanesi | Beş beceri kartı | Okuma, dinleme, yazma, konuşma, dil bilgisi |

**iPad 13" (yatay, 4 kare):** 1, 2, 3 ve 6 (tablet içerik kolonu en iyi bu ekranlarda).

**Kurallar (değişmedi):** her vitrin kendi dilinde çekilir (tr-TR: Türkçe arayüz + Almanca
kurs; en-US: İngilizce arayüz + Almanca kurs; de-DE: Almanca arayüz + İngilizce kurs);
gerçek hesap, yer tutucu veri yok; sınav markası yok; Premium özellik altyazıda "Premium"
der (2.3.2). Aşağıdaki "Kurallar" bölümü de geçerli.

**Görsel kararlar (2026-09-25, Samet):**
- Play öne çıkan grafik (1024×500): mirket maskot + "Konuş, anla, sınava hazırlan", marka
  renklerinde, az yazı.
- Maskot ekran görüntülerinde YALNIZ 1. karede (Patika), küçük bir vurgu olarak; öteki kareler
  yalnız uygulama ekranı + altyazı.
- App Store tanıtım videosu (App Preview) GÖNDERİLECEK ama şimdi değil (Cepte yürüyüş + Konuşma,
  gerçek cihazda; aynı çekim Play ön plan servisi beyanı videosu için de kullanılabilir, AND-3).

**Onaylanan Türkçe uzun açıklama (App Store + Play ortak, 2026-09-25):** 41 iddia koda, canlı
ayara ve içeriğe karşı doğrulandı (kanıt tablosu oturum çıktısında). Kararlar: belge her yerde
"başarı belgesi"; seri kademesi tavansız ("sonra her 7 günlük seride yeniden" doğru); fiyat
cümlesi yok (mağaza ve paywall gösteriyor). Karakter: 3957/4000. 2026-09-25 düzeltmesi: anlatım ekranda yazı, sesli okunan yalnız öğrenilen dil → "dinlersin" değil "okursun". Paragraflar tek satır.

```text
Konuş, anla, sınava hazırlan.

Lernomi ile Almancayı A1'den C1'e, Türkçe anlatımla ve konuşarak öğren. Kelime ezberinde kalmazsın: dili kullanırsın, konuşmana ve yazına geri bildirim alırsın, hazır olduğunda deneme sınavlarıyla kendini ölçersin.

A1'DEN C1'E ADIM ADIM
Almancada 8.500'den fazla kelime ve 900'den fazla alıştırma. Patika seni seviye seviye, ünite ünite ilerletir: her ünitede okuma, dinleme, konuşma, yazma, dil bilgisi ve quiz adımları var; modül ve seviye sınavlarıyla nerede olduğunu görürsün. Başlangıç seviyeni kendin seçebilir ya da kısa bir seviye testiyle bulabilirsin. Dili biraz biliyorsan Beceriler'de istediğin seviyeden alıştırma yaparsın.

KONUŞARAK ÖĞREN
Doktorda, iş görüşmesinde, yol sorarken… Gerçek hayatta karşına çıkacak durumları yapay zekâ karakteriyle konuşarak çalışırsın. Hatanı hemen düzeltir, takıldığında ne diyebileceğini önerir. Konuşma adımı Türkçe bir anlatımla başlar: kullanacağın kalıpları önce kendi dilinde okursun. İstersen sonunda kendini puanlarsın. Uygulama karşındakinin yapay zekâ olduğunu ekranda söyler.

DÖRT BECERİLİ DENEME SINAVLARI
Her seviyede birden çok, toplamda 50'den fazla deneme sınavı. Her birinde okuma, dinleme, yazma ve konuşma bölümleri ve bölüm başına süre var. Okuma ve dinleme otomatik puanlanır; yazma ve konuşma cevaplarını yapay zekâ puanlar ve hatalarını düzeltmeleriyle gösterir. Sonunda başarı yüzdeni ve neye çalışman gerektiğini gösteren bir liste alırsın.

CEPTE YÜRÜYÜŞ
Yürüyüş modunda ekrana bakmadan çalışırsın: Türkçe ipucunu duyar, kelimeyi sesli söylersin. Ücretsizde ekran açıkken günde 3 tur. Telefon cebindeyken, ekran kapalıyken de süren Cepte yürüyüş Premium'da.

HER GÜN BİRKAÇ DAKİKA
Günlük kelime turunda aralıklı tekrar, kelimeleri unutmadan önce yeniden karşına çıkarır. Pratikte istediğin kadar tekrar eder, her hafta öğrendiklerinden kurulan bir quiz çözersin. Serini koru, haftalık ligde yarış, arkadaşlarınla sıralamanı karşılaştır.

İNGİLİZCE DE VAR
Aynı yapıda İngilizce kursu: A1'den C1'e 7.000'den fazla kelime, 900'den fazla alıştırma ve 50'den fazla deneme sınavı.

HESAPSIZ BAŞLA
Hesap açmadan başlayabilirsin. Hesap oluşturunca ilerlemen hesabına taşınır; telefonda, tablette ve web'de aynı hesapla devam edersin. Arkadaşlar ve lig, yapay zekâyla sohbet ve Premium hesap ister; hesapsızken Konuşma adımı önceden hazırlanmış bir sohbetle sürer. Metnin yapay zekâya ancak iznini verirsen gider.

ÜCRETSİZ
Kelime çalışma, pratik, okuma, dinleme, dil bilgisi ve quiz ücretsiz ve sınırsız. Haftalık quiz, ekran açık yürüyüş ve her seviyede 1 deneme sınavı da ücretsiz. Patika'da her seviyede 2 Konuşma ve 2 Yazma adımı, Beceriler'de her seviyede 2 konuşma ve 2 yazma değerlendirmesi açık. Açık olanları bitirip 7 günlük seri yapınca her birine 2, deneme sınavına 1 yeni hak eklenir; sonra her 7 günlük seride yeniden.

PREMIUM
Ekran kapalı Cepte yürüyüş, tüm deneme sınavları, Patika ve Beceriler'de bütün konuşma ve yazma çalışmaları, seri ve bitirme beklemeden. Deneme sınavları her seviyede 3'lü paketlerle açılır: paketteki 3 sınavı bitirince sonraki paket gelir. Kötüye kullanımı önleyen günlük üst sınır: 20 yürüyüş turu, 30 yapay zekâ değerlendirmesi, 300 sohbet mesajı.
Premium aylık ya da yıllık, otomatik yenilenen bir aboneliktir ve aynı hesapla telefonda, tablette ve web'de geçerlidir. Yeni abonelere ilk ay ücretsiz; deneme bitmeden iptal edersen ücret alınmaz. Dönem bitiminden en az 24 saat önce iptal edilmezse abonelik yenilenir; aboneliğini satın aldığın mağazanın hesap ayarlarından yönetebilir ya da iptal edebilirsin.

Modül ve seviye sınavlarını geçince neler yapabildiğini gösteren, paylaşabileceğin bir başarı belgesi alırsın. Deneme sınavlarını Lernomi hazırladı; Lernomi hiçbir sınav kurumuyla bağlantılı değildir, belgeler resmî bir sertifika yerine geçmez.

Reklam yok. Hesabını uygulamanın içinden silebilirsin.

Kullanım Şartları: https://www.lernomi.app/terms
Gizlilik Politikası: https://www.lernomi.app/privacy
```

**Onaylanacak en-US ve de-DE uzun açıklamaları (2026-09-25):** aynı yapı, kendi kitlesine uyarlanmış
(en-US: İngilizce konuşup Almanca öğrenen; de-DE: Almanca konuşup İngilizce öğrenen). Her arayüzde tek
kurs sunulduğu için "öteki kurs" paragrafı yok. Vitrine özgü iddialar doğrulandı (anlatım dili,
sahneler, bağlantılar). Almanca metinde Beceriler "Fertigkeiten" (Samet'in kararı, uygulamayla aynı).
Haftalık quizin en/de çevirisi uygulamaya geçene kadar "explained in English / Erklärungen auf
Deutsch" iddiası haftalık quiz için doğru DEĞİL; çeviri işi sürüyor.

en-US (3978/4000):

```text
Speak, understand, ace exams.

Learn German from A1 to C1 with Lernomi: explained in English, practiced by speaking. Go beyond word lists: use the language, get feedback on your speaking and writing, and test yourself with mock exams when you're ready.

A1 TO C1, STEP BY STEP
More than 8,500 German words and more than 900 exercises. The Path takes you level by level, unit by unit: every unit has Reading, Listening, Speaking, Writing, Grammar and Quiz steps, and module and level exams show you where you stand. Pick your starting level yourself or find it with a short placement test. If you already know some German, practice at any level you like in Skills.

LEARN BY SPEAKING
At the doctor's, in a job interview, asking for directions… Practice real-life situations by talking with an AI character. It corrects your mistakes right away and suggests what you could say when you get stuck. Each Speaking step opens with a short intro in English to the phrases you'll use. If you like, finish with Score yourself. The app tells you on screen that you're talking to an AI.

FOUR-SKILL MOCK EXAMS
Several at every level, more than 50 mock exams in total. Each has Reading, Listening, Writing and Speaking sections, each with its own time limit. Reading and Listening are scored automatically; AI scores your written and spoken answers and shows your mistakes with corrections. At the end you get your score as a percentage and a list of what to work on.

POCKET WALKING
In Walk mode you study without looking at the screen: you hear the English cue and say the German word out loud. Free: 3 rounds a day with the screen on. Pocket Walking, with your phone in your pocket and the screen off, is Premium.

A FEW MINUTES A DAY
In the daily word round, spaced repetition brings words back before you forget them. In Practice you review as much as you like, and every week you take a quiz built from what you've learned. Keep your streak, compete in the weekly league and compare your ranking with friends.

START WITHOUT AN ACCOUNT
You can start without creating an account. Once you create one, your progress moves into it, and you continue with the same account on phone, tablet and the web. Friends and leagues, AI conversation and Premium need an account; without one, the Speaking step runs as a prepared conversation. Your text is only sent to the AI if you allow it.

FREE
Vocabulary, practice, reading, listening, grammar and quizzes are free and unlimited. The weekly quiz, Walk mode with the screen on and 1 mock exam per level are free too. In Path, 2 Speaking and 2 Writing steps per level are open; in Skills, 2 speaking and 2 writing assessments per level. Finish what's open and reach a 7-day streak to get 2 more of each and 1 more mock exam; then again with every further 7 days of streak.

PREMIUM
Pocket Walking with the screen off, every mock exam, and every Speaking and Writing step in Path plus all speaking and writing assessments in Skills, with no waiting for streaks or finishing. Mock exams open in packs of 3 at each level: finish the 3 exams in a pack and the next pack opens. Daily upper limit to prevent abuse: 20 walk rounds, 30 AI assessments, 300 conversation messages.
Premium is a monthly or yearly auto-renewing subscription and works with the same account on phone, tablet and the web. New subscribers get the first month free; cancel before the trial ends and you won't be charged. It renews unless cancelled at least 24 hours before the end of the period; manage or cancel it in the account settings of the store you bought it from.

Pass module and level exams to earn a certificate of achievement you can share, showing what you can do. The mock exams are Lernomi's own; Lernomi is not affiliated with any exam provider, and certificates of achievement are not official certificates.

No ads. You can delete your account right in the app.

Terms of Use: https://www.lernomi.app/terms/en
Privacy Policy: https://www.lernomi.app/privacy/en
```

de-DE (3998/4000):

```text
Sprechen, verstehen, bestehen.

Lerne mit Lernomi Englisch von A1 bis C1, mit Erklärungen auf Deutsch und durch Sprechen. Statt nur Vokabeln zu pauken, benutzt du die Sprache, bekommst Feedback zu Sprechen und Schreiben und misst dich mit Probeprüfungen.

VON A1 BIS C1, SCHRITT FÜR SCHRITT
Mehr als 7.000 Wörter und mehr als 900 Übungen. Der Pfad führt dich Niveau für Niveau, Einheit für Einheit: Jede Einheit hat die Schritte Lesen, Hören, Sprechen, Schreiben, Grammatik und Quiz; Modul- und Niveauprüfungen zeigen, wo du stehst. Dein Startniveau wählst du selbst oder per kurzem Einstufungstest. Mit Vorkenntnissen übst du bei den Fertigkeiten auf jedem Niveau.

LERNEN DURCH SPRECHEN
Beim Arzt, im Vorstellungsgespräch, beim Fragen nach dem Weg … Alltagssituationen übst du im Gespräch mit einer KI-Figur. Sie korrigiert Fehler sofort und schlägt dir etwas vor, wenn du nicht weiterweißt. Jeder Sprechen-Schritt beginnt mit einer kurzen Einführung der Wendungen auf Deutsch. Wenn du willst, folgt am Ende „Bewerte dich“. Die App zeigt an, dass du mit einer KI sprichst.

PROBEPRÜFUNGEN IN VIER FERTIGKEITEN
Mehrere pro Niveau, insgesamt mehr als 50 Probeprüfungen. Jede hat die Teile Lesen, Hören, Schreiben und Sprechen mit eigener Zeit. Lesen und Hören werden automatisch bewertet; Geschriebenes und Gesprochenes bewertet eine KI und zeigt deine Fehler mit Korrektur. Am Ende siehst du dein Ergebnis in Prozent und woran du arbeiten solltest.

GEHMODUS IN DER TASCHE
Im Gehmodus lernst du ohne Blick aufs Display: Du hörst den deutschen Hinweis und sagst das englische Wort laut. Kostenlos: 3 Runden pro Tag bei eingeschaltetem Bildschirm. Der Gehmodus in der Tasche, auch bei ausgeschaltetem Bildschirm, gehört zu Premium.

JEDEN TAG EIN PAAR MINUTEN
In der täglichen Runde bringt verteilte Wiederholung Wörter zurück, bevor du sie vergisst. Beim Üben wiederholst du beliebig oft, und jede Woche wartet ein Quiz aus dem Gelernten. Halte deine Serie, tritt in der Wochenliga an und vergleiche dich mit Freunden.

OHNE KONTO STARTEN
Du kannst ohne Konto loslegen. Mit einem Konto kommt dein Fortschritt mit, und du lernst auf Handy, Tablet und im Web weiter. Freunde und Liga, KI-Gespräche und Premium brauchen ein Konto; ohne Konto läuft der Sprechen-Schritt als vorbereitetes Gespräch. Dein Text geht nur mit deiner Erlaubnis an die KI.

KOSTENLOS
Vokabeln, Üben, Lesen, Hören, Grammatik und Quiz sind kostenlos und unbegrenzt. Auch das Wochen-Quiz, der Gehmodus bei eingeschaltetem Bildschirm und 1 Probeprüfung pro Niveau sind kostenlos. Pro Niveau sind im Pfad 2 Sprechen- und 2 Schreiben-Schritte offen, bei den Fertigkeiten 2 Sprech- und 2 Schreibbewertungen. Schließt du das Offene ab und erreichst eine 7-Tage-Serie, kommen je 2 weitere und 1 Probeprüfung dazu; danach alle weiteren 7 Serientage erneut.

PREMIUM
Gehmodus in der Tasche, alle Probeprüfungen und alle Sprech- und Schreibaufgaben in Pfad und Fertigkeiten, ohne auf Serie oder Abschluss zu warten. Probeprüfungen öffnen sich pro Niveau in 3er-Paketen: Ist ein Paket fertig, kommt das nächste. Tägliche Obergrenze gegen Missbrauch: 20 Geh-Runden, 30 KI-Bewertungen, 300 Gesprächsnachrichten.
Premium ist ein sich automatisch verlängerndes Monats- oder Jahresabo und gilt mit demselben Konto auf Handy, Tablet und im Web. Neue Abonnenten bekommen den ersten Monat kostenlos; kündigst du vor Ende der Testphase, zahlst du nichts. Es verlängert sich, wenn du nicht mindestens 24 Stunden vor Ende des Zeitraums kündigst; verwalten und kündigen kannst du es in den Kontoeinstellungen deines Stores.

Für bestandene Modul- und Niveauprüfungen bekommst du einen teilbaren Leistungsnachweis, der zeigt, was du kannst. Die Probeprüfungen stammen von Lernomi; Lernomi ist mit keinem Prüfungsanbieter verbunden, ein Leistungsnachweis ersetzt kein offizielles Zertifikat.

Keine Werbung. Dein Konto löschst du in der App.

Nutzungsbedingungen: https://www.lernomi.app/terms/de
Datenschutzerklärung: https://www.lernomi.app/privacy/de
```

**Açık (sonraki soru-cevap):** en-US ve de-DE metinlerinin Samet onayı; haftalık quiz çevirisinin uygulamaya geçmesi.

## Yeniden üretmek

```bash
python3 scripts/store-shots.py --plan docs/store/plan/b-exam.json --out docs/store/play/b-exam --store play
```

`--store play` 1080×1920, `--store ios` 1290×2796 üretir.

## Play ikonu (512×512)

Kaynağı iOS'un 1024'lük ikonu; Play 512 istiyor, alfa ve köşe yuvarlatma
KABUL ETMİYOR. Türetme tek satır, o yüzden çıktı depoda durmuyor:

```bash
python3 -c "from PIL import Image; \
Image.open('mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/AppIcon-1024.png') \
.convert('RGB').resize((512,512), Image.LANCZOS) \
.save('docs/store/graphics/play-icon-512.png','PNG',optimize=True)"
```

## Yeni ham görüntü çekmek

Gerçek cihaz (ya da emülatör) + **imzalı release yapısı** + giriş yapılmış hesap gerekir.
Debug yapısı olmaz: R8 küçültmesi ve paketlenmiş varlıklar yalnız release'te devrede ve
karelerdeki ekran mağazadaki uygulamanın ekranı olmalı.

```bash
adb exec-out screencap -p > /tmp/x.png
python3 - <<'PY'
from PIL import Image
Image.open("/tmp/x.png").convert("RGB").crop((0, 74, 1080, 2340)).save("docs/store/raw/yeni.png")
PY
```

Kırpma değerleri 1080×2400 · 420 dpi içindir: üstteki 74 piksel durum çubuğu, alttaki
60 piksel gezinme çubuğu. Başka bir çözünürlükte bu iki sayı yeniden ölçülür.

## Kurallar

- **Yer tutucu veri olmaz.** Kareler gerçek hesapla, gerçek ilerlemeyle alınır.
- **Maskot ana unsur olmaz** (bkz. `docs/play/listing.md` §1): hedef kitle 18+ ve
  vitrinde çocuk vurgusu istenmiyor.
- **Altyazı özellik anlatır**, fiyat ya da vaat içermez.
- **Sınav markası geçmez** (hiçbir sınav kurumunun ya da sınavın adı; karar
  `docs/play/listing.md` §4.2). "Gerçek
  sınav görevi", "resmî sınav" gibi bir kurumla bağ ya da resmîlik ima eden ifade de yok:
  deneme sınavlarını Lernomi kendisi yazdı.
- **Premium gerektiren özellik anılıyorsa altyazıda "Premium" yazar** (App Store 2.3.2, Play
  yanıltıcı meta veri). Karedeki ekran premium hesapla çekildiği için kilitsiz görünüyor;
  ücretsiz kapsamı altyazı söylemek zorunda. Ücretsiz/Premium ayrımının kaynağı
  `src/lib/premium/gates.ts`; "1'i ücretsiz" sayısı `free.mockExamsPerLevel` ve panelde
  değişirse altyazı da değişir.
- **Her yerelleştirme kendi dilinde** kare ister. Üç arayüz dilinin üçü de açık
  (`PAIR_READY`: tr, en, de — `mobile/src/lib/courses.ts`), ama bugün yalnız Türkçe kare seti
  var: en-US ve de-DE için ham görüntüler o arayüz diliyle yeniden çekilmeli. Betik karenin
  üstündeki "ADIM n / N" etiketini sabit Türkçe basıyor (`scripts/store-shots.py`); öteki
  diller için o etiket de yerelleştirilmeli.
- **iOS kareleri iOS'tan alınır.** Android karesini App Store'a yüklemek 2.3.3 ihlalidir;
  `--store ios` yalnız yerleşim provası için.

## Altyazı değişikliği (2026-09-14)

Mağaza ön inceleme raporu (B25, B26; ücretsiz/Premium ayrımı için B21) üzerine beş altyazı
değişti. `play/` depoda değil, her makinede yerelde üretiliyor: bu tarihten önce üretilmiş
kareler eski altyazıyı taşır ve yüklemeden önce üç set de yeniden üretilmeli (ham görüntüler
değişmedi, yeni çekim gerekmiyor). Komut 2026-09-15'te koşuldu: yalnız bu beş kare değişti,
farkı yalnız altyazı bölgesinde; öteki on üç kare önceki üretimle bayt bayt aynı çıktı.

| Set | Kare | Eski | Yeni | Sebep |
|---|---|---|---|---|
| a-walk 05, b-exam 01, c-native 05 | `mock-list.png` | Her seviyede 12 tam deneme sınavı | Her seviyede 12 deneme sınavı: 1'i ücretsiz, tümü Premium'da | Ücretsizde seviye başına 1 deneme sınavı açık; kare premium hesapla çekildi |
| b-exam 02 | `mock-task.png` | Gerçek sınav görevi, gerçek süre | Sınav düzeninde görev, süre tutarak | "Gerçek sınav" resmî sınav materyali iması taşıyordu |
| c-native 06 | `walk.png` | Ekran kapalıyken bile çalışır | Ekran kapalıyken Cepte yürüyüş, Premium'da | Ekran kapalı çalışan yürüyüş (uygulamadaki adıyla Cepte yürüyüş) yalnız Premium'da |

```bash
for p in a-walk b-exam c-native; do
  python3 scripts/store-shots.py --plan docs/store/plan/$p.json --out docs/store/play/$p --store play
done
```

Yeni altyazıların üçü de mevcut punto aralığında en çok üç satıra sığıyor (betiğin kendi
`fit_caption` hesabıyla ölçüldü; Play'de 90–96 px). Değişmeyen on üç altyazıda marka,
fiyat ya da Premium'a bağlı bir iddia yok.
