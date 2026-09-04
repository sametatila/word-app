# Lernomi — Almanca Kelime Uygulaması

A1'den C1'e, **iki kursla** çalışan, oyunlaştırılmış ve **tekrarı kendisi planlayan** Almanca
uygulaması. Next.js + PostgreSQL, Netcup'ta kendi sunucumuzda (blue-green deploy). Ana ekrana eklenince
uygulama gibi tam ekran açılır (PWA).

- **İki kurs, tek uygulama:**
  - **Almanca (Hochdeutsch)** — A1–C1, 7.392 kelime (A1 851 · A2 477 · B1 1.827 · B2 2.059 · C1 2.178)
  - **Zürih Almancası (Züritüütsch)** — listenin tamamının (7.392 madde) lehçe karşılığı, Hochdeutsch
    köprüsüyle (`formen` alanında "HD: …") ve Zürihçe örnek cümlelerle. B2/C1 genişlemesinin
    lehçe karşılıkları henüz üretilmedi; karşılığı olmayan madde Zürih kursunda görünmez
    (`seed-zurich.ts` eksikleri seviye bazında raporlar, yükleme durmaz).

  Kurs ilk girişte seçilir (`/kurs-sec`), sonradan profilden değiştirilebilir. Kelime havuzu,
  tekrar kuyruğu, beceri içeriği ve ilerleme sayıları aktif kursa bağlıdır; kurs değiştirince
  diğer kursun ilerlemesi **silinmez**, beklemeye geçer.
- **10 kelime oyunu:** Eşleştirme, Doğru Anlam, Artikel Yarışı, Harf Bulmacası, Cümleyi Tamamla,
  Yazarak Hatırla, Cümleyi Diz, Çoğul Bilmece, Kulaktan Tanı, Doğru mu Yanlış mı. Her oyun farklı
  bir şey ölçer: tanıma, üretim, söz dizimi (Cümleyi Diz), çoğul biçim (Çoğul Bilmece), dinleme
  (Kulaktan Tanı) ve hızlı ikili karar (Doğru mu Yanlış mı). Aynı oyun üç tur boyunca tekrarlanmaz
  ve oturumda az çıkan oyun öne alınır.
- **Beceriler bölümü (`/skills`):** her kursta A1–C1 için okuma, dinleme ve yazma alıştırmaları —
  metin, sözlükçe (gloss), çoktan seçmeli sorular ve gerekçeli açıklamalar; yazmada önce cümle
  kurma, sonra kontrol listeli serbest yazı ve örnek çözüm.
- **Ders içi rol yapma:** serbest sohbet bölümü kaldırıldı; yerine her dersin sonundaki
  konuşma fazı geçti (`/api/roleplay`). Fark tek kelimede: **amaç**. Sohbette model her şeye
  cevap veriyordu ve konuşmanın nereye gideceği belirsizdi — boş sayfa serbest sohbetin en
  pahalı sorunuydu. Rol yapmada sahne, muhatap ve kullanılacak kalıplar belli; model konuşmayı
  dersin kalıplarına doğru sürüyor ve düzeltmeyi o çerçevede yapıyor. **Eller serbest** anahtarı
  açıkken tek bir döngü kurulur — cevap sesli okunur, okuma biter bitmez mikrofon kendiliğinden
  açılır, söylediğin doğrudan gönderilir. GitHub Models'in ücretsiz Cerebras, Groq ya da
  Mistral'in ücretsiz katmanı üzerinden çalışır; anahtarı olan ilk sağlayıcı seçilir, düşerse
  yedeğe geçilir.
- **Rol yapmanın adı var:** muhataplar isimsiz değil. Her modül (10 ders) küçük bir kadroya
  sahip ve aynı üç kişi o modül boyunca dönüyor — yeme-içme modülünde tanıştığın garson üç ders
  sonra yine karşına çıkıyor. İsimler dersin katalogdaki yerinden türetiliyor
  (`src/lib/lessons/characters.ts`), içerik dosyalarına tek bir alan bile eklenmedi.
- **Örnek cümle çevirileri:** her örnek cümlenin doğal Türkçe karşılığı vardır; tanıtım kartında,
  kelime listesinde ve Cümleyi Tamamla oyununda görünür.
- **Adaptif tekrar:** ayrı bir "tekrar et" bölümü yok. Her cevabın hızı ve doğruluğu 0–5 kalite puanına
  çevrilir, kelimenin bir sonraki gösterim zamanı SM-2 türevi bir motorla hesaplanır ve kelime
  oyunun akışına kendiliğinden karışır. Aynı gün içindeki tekrarlar aralığı şişirmez, son 30 dakikada
  sorulan kelime yeniden sıraya girmez.
- **Sıklık sırası ve tür karışımı:** yeni kelimeler alfabetik değil, kullanım sıklığına göre gelir
  (ich, sie, du, nicht…) ve isim/fiil/diğer olarak serpiştirilir.
- **CEFR seviyesi kullanıcınındır:** profilden seçilir ve orada kalır; sistem terfi/düşüş yapmaz.
  Öğren ekranının üstünde rütbe değil **kapsam** görünür: o seviyenin kaç kelimesi pekişti.
  Yalnızca artan bir ölçü.
- **Adaptif zorluk kelimeye bakar:** yeni ya da takılan kelimede şıklı tanıma, oturmuş kelimede
  yazma sorulur. Şık yönü de buna bağlı (Almanca→Türkçe tanıma, Türkçe→Almanca üretime yakın).
  Kullanıcının genel doğruluk oranı zorluğu belirlemez — o oran yetkinliği değil, kuyruğun
  bileşimini ölçer.
- **Tempo koleksiyona bakar:** tekrar borcu günlük hedefin iki katını aşarsa yeni kelime durur,
  takılan kelime oranı yükselirse yarıya iner. Bu bir not değil, yük kararı.
- **Hayatta kalma turu:** oturum sonunda, öğrenilenlerden karışık oyun türleriyle süreye karşı tur.
  Sabit süre yok: 40 saniyeyle başlar, doğru cevap +2 sn (hızlıysan +3,5 sn), yanlış −4 sn, tavan
  75 sn. Üst üste doğrular puanı 3 katına kadar çıkarır; sorular üç dalgada sertleşir (ısınma →
  baskı → kriz) ve son dalga en çok unuttuğun kelimelerle gelir. Rekor hesapta tutulur, her
  cihazda aynı görünür.
- **Zorlayıcı çeldiriciler:** çoktan seçmelide rastgele kelime yerine Almanca biçimi hedefe benzeyen
  kelimeler kullanılır (aufhören / aufheben / aufräumen).
- **Telaffuz:** her Almanca kelime ve örnek cümle tek dokunuşla sesli okunur (tarayıcı konuşma sentezi).
- **"Bunu zaten biliyorum":** bildiğin kelimeyi tek dokunuşla pekişmiş işaretleyip atlarsın.
- **Kelimelerim ekranı:** binlerce kelimede arama, seviye/durum filtresi, çoğul-tür bilgisi, örnek cümle
  ve bir sonraki tekrar tarihi.
- **Sesli geri bildirim:** her doğru cevapta yükselen kısa bir ton, yanlışta alçalan bir nota.
  Perde sabit değil — üst üste doğru gittikçe pentatonik bir merdivende bir basamak yükseliyor,
  yani ekrana bakmadan da serinin sürdüğü duyuluyor. Etap, kusursuz etap, rekor, rozet açılışı
  ve son sekiz saniyenin ayrı ezgileri var. Ses dosyası yok: tonlar WebAudio ile yerinde
  üretiliyor, indirilecek bir şey olmadığı için ilk cevap da anında sesli. Profilden kapatılır.
- **Haftalık sıralama:** tablo tüm zamanların toplamını değil **bu haftanın** XP'sini gösteriyor
  ve pazartesi sıfırlanıyor. Toplam birikim tablosu iki tarafa da bir şey söylemiyordu: öndeki
  tehdit altında değildi, arkadaki umutsuzdu. Tabloda kaç gün kaldığı ve bir üsttekine kaç XP
  olduğu yazıyor — "6. sıradasın" bir durum, "bir üsttekine 140 XP" bir hedef.
- **Öğrenci arması:** sıralamadaki gri baş-harf dairesi yerine kimlikten türetilen renkli arma
  (gradyan + desen). Sıfır depolama, sıfır ayar, herkes farklı; ilk üçün armasında madalya
  halkası var.
- **Rozetler:** 41 rozet, yedi grupta (seri · kelime · oyunlar · dersler · beceriler · turlar ·
  keşif). İlerleme ayrı bir sayaçta biriktirilmiyor, mevcut tablolardan okunuyor — bunun sonucu
  rozetlerin **geriye dönük** olması: sistem açıldığı gün kimse sıfırdan başlamıyor. Kilitli
  rozetler gizlenmiyor, sönük duruyor ve altlarında "ne kadar kaldı" çubuğu var; gizlenmiş
  hedef hedef değildir. Eşikler bilerek uzak — beş dakikada açılan rozet, rozet değil bildirimdir.
  Hiçbiri satın alınamaz, tek yol oynamak.
- **Bahis:** etap sınırında isteğe bağlı risk. Sonraki beş tur hatasız geçerse o etabın puanı
  ikiye katlanıyor, iki yanlışta etap hiç puan kazandırmamış oluyor, tek yanlış başa baş.
  Kayıp yalnızca o etaba ait: dünkü birikime dokunulmuyor. Bahse girmeyen için oyun hiç
  değişmiyor.
- **Günün turu bir düello:** o tur herkese aynı kelimeleri aynı sırayla verdiği için paylaşılan
  sonuç sıradan bir skor değil, karşılaştırılabilir bir meydan okuma. Paylaşım metni bunu
  söylüyor ve puanı taşıyor — günün turunda kıyaslanan şey doğru sayısı değil puan, çünkü hız
  ve seri puana giriyor.
- **Yürürken (ekransız) mod:** uygulamanın tamamı bir ekrana bakmayı gerektiriyordu. Bu modda
  Türkçesini duyar, Almancasını söylersin — telefon cepte kalabilir. Yön bilerek üretim: şık
  işaretlemek tanımadır, ağızdan çıkarmak dilin asıl kullanıldığı iş. Tur ekrandaki turun ta
  kendisi (aynı kuyruk, aynı uç), yani ekranda başlayıp kulakla devam edebilirsin; SRS, günlük
  hedef ve seri hiçbir şeyin farkında olmaz. Duyulmayan tur **yanlış sayılmaz** — sokaktaki
  gürültü tekrar planını bozmamalı. Yirmi tur bitince **“devam edelim mi?”** sesli sorulur ve
  “evet” demen yeter. **Ekran kapalıyken de çalışır**: cevap tarayıcının konuşma tanıyıcısıyla
  değil, kısa bir ses klibi kaydedilip sunucuda yazıya çevrilerek alınır.
- **Modül sınavı (patron turu):** ders yolundaki her modülün sonunda, o modülün ~45 kelimesiyle
  süre baskılı bir sınav. Hayatta kalma turundan farkı bir **kaybetme koşulu** olması: 15 soruyu
  60 saniye içinde bitirmek zorundasın (doğru +3 sn, yanlış −5 sn). Geçilen modül yolda taç
  takar ve kalan en iyi süre rekor olarak kalır. Kaybedince hiçbir şey silinmez — cevaplar zaten
  tekrar planına işlemiştir.
- **Arena başlangıç ekranında:** hayatta kalma turuna tek giriş oturum ÖZETİYDİ, yani turu
  görebilmek için önce 20 turluk bir oturumu bitirmek gerekiyordu. Artık günün turunun hemen
  altında, rekorunla birlikte duruyor.
- **Takip:** günlük seri (streak), günlük hedef, XP, CEFR seviyesine göre ilerleme, 8 haftalık aktivite
  ısı haritası, oyun bazında doğruluk, oturum sonunda "zorlandıkların" listesi.
- **Günün turu:** aynı kurs ve seviyedeki herkes her gün **aynı kelimeleri aynı sırayla**
  görür — tur saklanmaz, günden türetilir. Tek hak, süre baskısı yok; skor tablosu ve
  paylaşılabilir sonuç bu yüzden anlamlıdır (herkes aynı soruları çözmüştür).
- **Günün görevleri:** her gün üç görev, biri mutlaka beceri/ders/günün turu gibi az
  uğranan bir bölüme götürür. İlerleme ayrı bir sayaçta biriktirilmez, mevcut tablolardan
  okunur; ödül talep edilince verilir ve tamamlanma sunucuda yeniden doğrulanır.
- **Tek oyun oyna:** on oyunun her biri 20 turluk bağımsız bir tur olarak seçilebilir.
  Kuyruk değişmez — kelimeler yine tekrar planından ve gün kontenjanındaki yenilerden
  gelir, yeni kelime yine tanıtım kartıyla açılır. Değişen tek şey hangi oyunun sorulduğudur.
- **Beşerli etaplar ve seri rozeti:** oturum 20 turluk tek blok değil; her beş turda bir
  "devam et / şimdilik yeter" durağı gelir ve ilerleme sunucuda kalır. Üst üste doğrularda
  ekranda seri rozeti belirir (yalnızca görsel — XP dengesine dokunmaz).
- **Hatırlatma bildirimleri:** çalışılmayan günde günde en fazla bir web push. Metin duruma
  göre seçilir — bugün kırılacak seri, tekrar borcu ya da kısa bir davet. İzin, kayıt anında
  değil ilk tur bittikten sonra istenir; reddedilen bildirim izni tarayıcıda kalıcıdır.
- **Seri onarımı:** tek bir kaçırılan gün seriyi sıfırlamıyor. Ayda bir kez, geri dönen
  kullanıcının serisi kaldığı yerden devam eder ve özet ekranı bunu söyler.
- **Paylaşılabilir sonuç:** tur sonunda Wordle tarzı kare deseni — hangi kelimeler olduğunu
  ele vermeden turun nasıl geçtiğini gösterir. Telefonda sistem paylaşım sayfası,
  masaüstünde panoya kopyalama.
- **Mobil öncelikli, masaüstünde de tam:** mobilde alt sekme çubuğu, masaüstünde kenar çubuğu.
  Açık/koyu tema.

---

## 1. Yerelde çalıştırma

```bash
npm install
cp .env.example .env            # DATABASE_URL'i yerel ya da sunucu Postgres'ten yapıştır
npm run db:push                 # tabloları oluştur
npm run db:seed                 # Almanca kursu: 7.392 kelime + örnek cümle çevirileri
npm run db:seed:zurich          # Zürih kursu: 7.392 Züritüütsch madde
npm run db:seed:skills          # beceri alıştırmaları (iki kurs, A1–C1)
npm run dev                     # http://localhost:3000
```

`.env` içeriği:

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/lernomi"
# Kimlik doğrulama better-auth ile KENDİ sunucumuzda; Neon Auth / Stack Auth KULLANILMIYOR.
# E-posta doğrulama ve parola sıfırlama nodemailer + SMTP üzerinden gider (SMTP_* anahtarları).
BETTER_AUTH_SECRET="openssl rand -base64 32 çıktısı"
CRON_SECRET="openssl rand -hex 32 çıktısı"   # zamanlanmış uçların Bearer sırrı

# Ders içi rol yapma — üçünden biri yeter. Sıra: cerebras → groq → mistral.
#
# Yürürken modunun EKRAN KAPALI çalışması için ayrıca bir yazıya çevirme anahtarı
# gerekiyor. Önerilen: AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (F0: 5 saat/ay,
# sessizlikte uydurmuyor, güven veriyor; yalnız bu yolda kullanılır). Yoksa
# DEEPGRAM_API_KEY, o da yoksa GROQ_API_KEY. Hiçbiri yoksa mod tarayıcının kendi
# tanıyıcısına düşer ve ekranın açık kalması gerekir.
# AZURE_SPEECH_KEY="..."
# AZURE_SPEECH_REGION="germanywestcentral"
CEREBRAS_API_KEY="..."          # önerilen: ücretsizlerin en hızlısı, 1M token/gün
# GROQ_API_KEY="..."            # ~500K token/gün, ilk yedek
# MISTRAL_API_KEY="..."         # 1B token/ay ama ~2 RPM — taşma yedeği
```

Hangi sağlayıcının gerçekten cevapladığı `npm run report:providers` ile görülür. Buna ihtiyaç
zincirin sessiz çalışmasından doğdu: anahtarı olmayan sağlayıcı atlanıyor, uygulama sorunsuz
çalışıyor ve birincil sağlayıcı hiç çağrılmamış olabiliyor — sağlayıcının kendi panelinde
kullanım sıfır görününce sorunun anahtarda mı yoksa zincirin başka bir sağlayıcıya
düşmesinde mi olduğu ayırt edilemiyordu. Cevap `roleplay_logs` tablosunda: her tur hangi
sağlayıcı ve modelle verildiyse oraya, bildirilen kalan hakla birlikte yazılıyor.

Rol yapma üçünü de destekler ve **anahtarı olan ilk sağlayıcıyı** kullanır (sıra:
Cerebras → Groq → Mistral). Üçü de OpenAI uyumlu olduğu için tek istemci yetiyor; sıra
hıza göre kurulu, çünkü konuşmada gecikme her şeyden önemli. Birincil düşerse yedeğe
geçilir — **akış başlamadan önce**; başladıktan sonra yarım cümlenin üstüne başka modelin
cevabını eklemek doğru olmazdı. Sırayı `CHAT_PROVIDER` ile ezebilirsin. Hiçbiri yoksa yalnızca
derslerin konuşma fazı kapalı görünür, uygulamanın geri kalanı etkilenmez.

Anahtarlar **koda gömülmez** — bu depo GitHub'a push ediliyor ve GitHub kendi token biçimini
tarayıp bulduğu anda iptal ediyor.

Kimlik doğrulama **better-auth** ile kendi sunucumuzda; kullanıcı, oturum ve hesap tabloları
`DATABASE_URL`'in gösterdiği Postgres'te. `SMTP_*` boşken e-posta doğrulama **zorunlu
tutulmaz** (gelmeyen bir postayı bekleyip kilitlenme olmasın) ve parola sıfırlama sessizce
çalışmaz — beş SMTP anahtarı dolunca ikisi de kendiliğinden açılır.

Faydalı adresler: `/` tanıtım · `/kurs-sec` ilk giriş kurs/seviye seçimi · `/learn` oturum ·
`/words` kelime listesi · `/skills` okuma-dinleme-yazma-konuşma · `/lessons` ders yolu ·
`/profile` ayarlar + ilerleme ·
`/demo-games` on oyunun tek sayfada önizlemesi. (`/progress` artık `/profile`'a yönlenir.)

## 2. Veritabanı kurulumu (PostgreSQL)

Üretimde Netcup sunucusundaki yerel PostgreSQL kullanılıyor; geliştirmede kendi
makinendeki bir Postgres yeter. (Proje eskiden Neon üzerindeydi, **terk edildi**.)

1. Bir PostgreSQL veritabanı oluştur (üretimde 17.x kullanılıyor).
2. Bağlantı dizesini `DATABASE_URL` yap.
3. `npm run db:push` → tablolar oluşur (`drizzle/*.sql` dosyaları da hazır, istersen SQL
   Editor'a sırayla yapıştırabilirsin).
4. `npm run db:seed` → `data/app/words.json` içindeki 7.392 kelime + `data/app/beispiel-tr.json`
   içindeki örnek cümle çevirileri yüklenir.
5. `npm run db:seed:zurich` → `data/zurich/chunk-*.json` içindeki 7.392 Züritüütsch madde
   `course='gsw-zh'` olarak yüklenir (kimlik: 100000 + kaynak id).
6. `npm run db:seed:skills` → `src/lib/skills/content/*` içindeki beceri alıştırmaları yüklenir.

## 3. Deploy

Vercel **bırakıldı**; üretim Netcup'ta kendi sunucumuzda, blue-green düzeniyle çalışıyor.
Akış: `git push origin main` → GitHub webhook → sunucuda `deploy.sh` → boştaki renk derlenir,
sağlık kontrolünden geçer, nginx zarifçe o renge döner. Ayrıntı ve komutlar `AGENTS.md`'de.

Zamanlanmış işler (hatırlatma, değerlendirme kuyruğu, haftalık özet) **systemd timer**
ile çalışıyor: `lernomi-cron-reminders`, `lernomi-cron-assess`, `lernomi-cron-summary`.
`vercel.json`'daki cron tanımları yalnızca kayıt olarak duruyor, çalıştıran onlar değil.

## 4. Testler

```bash
npm run test:sql          # üretilen tüm SQL cümlelerini yazdırır (veritabanı gerekmez)
npm run test:mix          # yeni öğrencinin ilk günlerde gördüğü oyun dağılımı
npm run test:playtest     # arayüzden oynayan öğrenci simülasyonu (dev sunucusu açıkken)

# uçtan uca mantık testi — yerel PostgreSQL 18 ister
docker run -d --name wa-pg -e POSTGRES_PASSWORD=test -e POSTGRES_DB=wa \
  -p 55432:5432 postgres:18-alpine
for f in drizzle/*.sql; do
  docker cp "$f" wa-pg:/tmp/m.sql && docker exec wa-pg psql -U postgres -d wa -q -f /tmp/m.sql
done
# Testin dolu bir `words` tablosuna ihtiyacı var: tohumlanmamış veritabanında oturum
# kurulamadığı için testlerin çoğu "0 tur üretildi" diye düşer ve sebebi kodmuş gibi görünür.
# (`npm run db:seed` burada kullanılamaz — tohumlama betiği üretim bağlantısını bekliyor.)
export TEST_DATABASE_URL="postgres://postgres:test@localhost:55432/wa"
npm run test:seed
npm run test:e2e
```

E2E testi (552 kontrol) oturum kurgusunu, SRS zamanlamasını, yanlış cevap davranışını, streak
mantığını, sıklık sıralamasını, eşanlamlı kabulünü, "zaten biliyorum" akışını, bahsin puan
sınırlarını, haftalık sıralamanın pencere hesabını, rozetlerin geriye dönük açılmasını,
tohumlu karıştırmanın kararlılığını, hatırlatma metinlerinin sırasını, modül sınavının
kelime havuzunu ve ilerleme sorgularını gerçek PostgreSQL üzerinde doğrular.

```bash
# arayüzden oynayan öğrenci simülasyonu (dev sunucusu açıkken)
node scripts/playtest.mjs 330
```

## 5. Mimari

```
src/
  app/
    page.tsx                tanıtım sayfası
    kurs-sec                ilk giriş: kurs + başlangıç seviyesi
    (app)/learn|words|skills|lessons|profile
    api/session             oturum kuyruğunu üretir
    api/roleplay            ders içi rol yapma (akışlı; sağlayıcı seçimi chat-providers.ts)
    api/answers             cevapları işler (SRS + streak + istatistik)
    api/profile             ayar güncelleme
    api/words/known         "bunu zaten biliyorum" işaretlemesi
    api/auth/[...path]      better-auth uçları (giriş, kayıt, oturum)
    giris                   giriş / kayıt ekranı
    sifremi-unuttum         parola sıfırlama isteği
    sifre-sifirla           e-postadaki bağlantıdan yeni parola
    eposta-dogrula          kayıt sonrası doğrulama bilgilendirmesi
  lib/
    auth/                   better-auth sunucu + istemci sarmalayıcıları
    srs.ts                  tekrar motoru (saf fonksiyonlar)
    session.ts              kuyruk kurgusu, cevap işleme, haftalık sıralama, ilerleme
    sfx.ts                  oyun sesleri (WebAudio; dosya yok, tonlar yerinde üretilir)
    achievements.ts         41 rozetin tanımı + mevcut tablolardan geriye dönük hesabı
    events.ts / track.ts    ürün olayları (sunucu yazımı / istemci göndericisi)
    ai-usage.ts             AI çağrılarının muhasebesi (hatalar dâhil)
    xp.ts                   XP tablosu + bahis kuralı (tek referans noktası)
    lessons/characters.ts   rol yapma kadrosu — isimler katalog sırasından türer
    lessons/boss.ts         modül sınavı: ders kelimelerinden süreli tur + geçme kaydı
    shuffle.ts              tohumlu karıştırma (sunucu ve tarayıcı aynı sırayı üretsin)
    example.ts              örnek cümle ayıklama (numaralı liste + kısaltma farkındalığı)
    skills/                 beceri içeriği: types · meta · content/{a1..c1, zh-a1..zh-c1}
    db/schema.ts            words · profiles · user_words · reviews · daily_stats ·
                            skill_exercises · user_skills · session_state · daily_scores ·
                            quest_claims · user_lessons · achievements · events
  components/
    session-player.tsx      oyun akışını yöneten oynatıcı (etaplar, bahis, arena)
    games/*.tsx             on oyun + ortak çerçeve
    skills/*.tsx            beceri hub'ı, okuma/dinleme/yazma çalıştırıcıları
    achievement-*.tsx       rozet duvarı, rozet görseli, açılış kutlaması
    avatar.tsx              kimlikten türetilen öğrenci arması
    walk-player.tsx         ekransız sesli tur · use-listen.ts ortak dinleme döngüsü
    boss-player.tsx         modül sınavı (süreli, kaybetme koşullu)
    leaderboard.tsx         haftalık sıralama
data/
  app/words.json            Almanca tohumlama kaynağı (7.392 kelime, A1–C1)
  app/beispiel-tr.json      örnek cümlelerin Türkçe çevirileri (7.426 cümle)
  zurich/chunk-*.json       Züritüütsch karşılıklar (7.392 madde, A1–C1 tam)
  zurich/style-guide.md     lehçe yazım kuralları — içerik üretiminde bağlayıcı
```

### Tekrar mantığı özet

| Durum | Ne olur |
|---|---|
| Yeni kelime | Tanıtım kartı → aynı oturumda tanıma oyunu |
| Doğru (hızlı) | Kalite 5 → aralık `ease × 1.15` kadar uzar |
| Doğru (yavaş) | Kalite 3 → aralık kısa tutulur |
| Yanlış | Öğrenme adımına düşer, 1 dk sonra tekrar; `ease` −0.2, lapse +1 |
| Aynı gün ikinci doğru | Aralık büyümez (6 dakikalık oturumda kelime haftalar sonrasına atılmaz) |
| "Zaten biliyorum" | Kelime 21 gün sonrasına planlanır, kuyruğu meşgul etmez |
| 6 lapse | Kelime "leech" işaretlenir |

Oyun türü kelimenin durumuna göre seçilir: yeni/öğrenilen kelimelerde tanıma ağırlıklı
(çoktan seçmeli, eşleştirme, artikel), pekişenlerde üretim ağırlıklı (yazma, cümle tamamlama,
harf bulmacası). Aynı oyun üç tur boyunca tekrarlanmaz.

## 6. Seviye ve zorluk mantığı

| Olay | Etki |
|---|---|
| Oturum doğruluğu ≥ %85 | seviye puanı +2 |
| %70–85 | +1 |
| %50–70 | 0 |
| < %50 | −2 |

Terfi iki vitesli çalışır:

Seviye **yalnızca kullanıcı** değiştirir. Önceki sürümde oturum doğruluğuna göre otomatik
terfi/düşüş vardı; kaldırıldı. Sebebi: bir SRS oturumu bilerek karışık kurulur (hiç görülmemiş
kelimeler, öğrenilmekte olanlar, oturmuş tekrarlar bir arada), bu yüzden oturum doğruluğu
yetkinliği değil kuyruğun bileşimini ölçer. Yeni kelime almaya cesaret eden düşük, yalnızca kolay
tekrar yapan yüksek doğruluk alıyordu — yani sistem öğrenmeyi cezalandırıyordu.

Yerine geçen üç ayrı mekanizma:

| Soru | Neye bakar |
|---|---|
| Hangi kelimeler geliyor? | Kullanıcının seçtiği seviye (%70) + bir alt seviye (boşluk doldurma) |
| Her soru ne kadar zor? | O kelimenin kendi geçmişi: üst üste doğru sayısı, unutma sayısı, kolaylık faktörü, aralık |
| Bugün ne kadar yük? | Tekrar borcu ve takılan kelime oranı |

Seçilen seviyede görülmemiş kelime kalmazsa bir üst seviye devreye girer; öğrenme durmaz.

## 7. E-posta akışları (parola sıfırlama, kayıt onayı)

Akışı **better-auth** yürütür, e-postayı **biz** göndeririz: `lib/auth/server.ts`'teki
`sendResetPassword` / `sendVerificationEmail` kancaları `lib/email.ts`'i çağırır, o da
nodemailer ile SMTP'ye verir. Yani gönderimi üstlenen bir dış kimlik servisi YOKTUR —
`SMTP_HOST`, `SMTP_USER` ve `SMTP_PASS` doldurulmadan hiçbir e-posta çıkmaz (kod bunu
log'a yazıp sessizce geçer).

| Ekran | Ne yapar |
|---|---|
| `/sifremi-unuttum` | `requestPasswordReset` → e-postaya sıfırlama bağlantısı |
| `/sifre-sifirla?token=…` | `resetPassword` → yeni parolayı kaydeder |
| `/eposta-dogrula?email=…` | `sendVerificationEmail` ile doğrulama e-postasını yeniden yollar |

Kayıt sonrası oturum açılmadıysa (SMTP bağlıyken `requireEmailVerification` açılır)
kullanıcı otomatik olarak `/eposta-dogrula` ekranına yönlenir.

**Gönderen adresi ve SMTP:** Gönderimi biz yaparız, dış bir kimlik servisi değil.
`.env`'deki beş anahtar doldurulur:

```bash
SMTP_HOST="smtp.<saglayici>.com"
SMTP_PORT="587"        # 587 STARTTLS, 465 örtük TLS
SMTP_USER="..."
SMTP_PASS="..."
SMTP_FROM="Lernomi <noreply@lernomi.app>"
```

Üçü (`HOST`, `USER`, `PASS`) dolu değilse `emailConfigured` false olur: e-posta
gönderilmez, log'a "SMTP tanımsız" düşer ve doğrulama zorunlu tutulmaz. Sağlayıcı
serbest (Resend, Postmark, Brevo, SES…); kendi alan adından göndermek için o
sağlayıcıda SPF ve DKIM kayıtlarını doğrulaman gerekir.

> **Not:** Bu bölüm eskiden "e-postaları Neon Auth sunucusu gönderir" diyordu. Proje
> Neon + Vercel'den Netcup'a taşınırken kimlik doğrulama better-auth'a geçti ve
> platformun bedava gönderimi de gitti; belge geride kalmıştı.

## 8. Kelime verisi

A1–B1 kelimeleri Goethe-Institut'un resmî Wortliste PDF'lerinden çıkarılmış, Türkçe karşılıkları
eklenmiş ve doğrulanmıştır (ayrıntı: `data/README.md`).

**B2 ve C1** için Goethe resmî bir liste yayınlamadığından bu seviyeler konu bazlı olarak
üretilmiştir (iş, toplum, akademik dil, hukuk, kültür, ileri fiil/sıfat…); her madde artikel,
çoğul/çekim, Türkçe karşılık ve örnek cümle içerir, A1–B1 ile çakışanlar ayıklanmıştır.

**Örnek cümle çevirileri** `data/app/beispiel-tr.json` dosyasındadır (4.043 cümle). Kaynak
listedeki 497 madde "1. … 2. …" biçiminde numaralı bir derleme olduğu için ayıklama
`src/lib/example.ts` üzerinden yapılır; bu yardımcı numaralandırmayı ve "ca. / z. B. / Dr."
gibi kısaltmaları tanır.

### Züritüütsch (gsw-zh) verisi

`data/zurich/style-guide.md` dönüşümün **bağlayıcı** kuralıdır: söz başı K→Ch, mastar -en→-e,
uzun ünlüler çift (Ziit, Huus, Lüüt), iç seste -st-→-scht-, küçültme -li, ß hiç kullanılmaz,
artikeller de/d/s, Präteritum ve Genitiv yok, ilgi cümlesi "wo". Helvetizmler çevrilmez,
karşılığı konur (Fahrrad→Velo, Fahrkarte→Billett, Frühstück→Zmorge).

Zürihçe örnek cümleler çoğu yerde yerelleştirilmiştir (Berlin→Züri, Mainz→Winterthur). Bu
maddelerde Almancadan devralınan Türkçe çeviri yanlış olacağından `scripts/seed-zurich.ts`
cümledeki sayıları ve yer adlarını karşılaştırır; örtüşmeyen ~374 maddede çeviri boş bırakılır.

## 9. Beceri içeriği (okuma · dinleme · yazma)

İçerik repoda TypeScript olarak yazılır (`src/lib/skills/content/`), `npm run db:seed:skills`
ile `skill_exercises` tablosuna yüklenir ve çalışma zamanında oradan servis edilir. Veritabanına
ulaşılamazsa gömülü kopya devreye girer — ekran hiçbir durumda boş kalmaz.

| | Almanca (de) | Zürih (gsw-zh) |
|---|---|---|
| Seviye başına | 6 okuma · 6 dinleme · 4 yazma | 6 okuma · 6 dinleme · 4 yazma |
| A1–C1 toplam | 80 alıştırma | 80 alıştırma |

- **Okuma/dinleme:** başlık, tür, Türkçe yönerge, sözlükçe, metin veya konuşmacıya bölünmüş
  ses bölümleri, çoktan seçmeli sorular ve her soru için gerekçeli açıklama.
- **Dinleme:** cihazın konuşma sentezi kullanılır; bir bölümde `audio` alanı varsa önce
  gerçek kayıt çalınır. Zürih kursunda de-CH sesi tercih edilir.
- **Yazma:** önce Türkçeden hedef dile cümle kurma (ipuçlu, alternatif cevaplı), sonra
  kontrol listesi + kalıp desteği + örnek çözümle serbest yazı görevi.
- **XP:** ilk tamamlamada tam verilir; tekrar çözümlerde yalnızca en iyi skorun farkı eklenir.
  Sonuçlar sunucuda (`user_skills`) tutulur, cihazlar arasında senkrondur.

## 10. İngilizce kursu (tr → en)

Almanca-Türkçe paritesi tek başına dar bir kitleye hitap ettiği için ikinci bir parite açıldı:
**anadili Türkçe olan kullanıcı için İngilizce**. Model `mobile/src/lib/courses.ts` ve
`src/lib/courses.ts`'te: `course` HEDEF dili tutar (`de` | `gsw-zh` | `en`), kullanıcının
anadili (`nativeLang`: `tr` | `en` | `de`) ayrı bir eksendir; parite ikisinin bileşimidir.

İçerik **yalnız mobilde**. Web Almanca kursuna hizmet etmeye devam ediyor ve bu paritenin
hiçbir dosyasını okumuyor.

| | A1 | A2 | B1 | B2 | C1 |
|---|---|---|---|---|---|
| Ders | 100 | 100 | — | — | — |
| Okuma · dinleme · yazma | 12 · 12 · 8 | 12 · 12 · 8 | — | — | — |

Kelime katmanı beş seviyeyi de kapsıyor (`data/app/words-en.json`, 6.975 madde; `course='en'`,
id aralığı 200001+). Dersler `mobile/src/data/lessons/en-a1.json` ve `en-a2.json`, beceri
egzersizleri `mobile/src/data/skills/exercises-en.json` dosyalarında.

### Bilerek sonraya bırakılanlar

- **B1, B2 ve C1 dersleri ile beceri egzersizleri.** A1 ve A2 Almanca ile tam paritede
  bitirildi; üst seviyeler sonraki bir çalışmada üretilecek. Patika o seviyelerde ders
  bulamadığı için üniteleri "Yakında" gösterir ve **Almanca içeriğe DÜŞMEZ**
  (`bundleFor`/`poolFor`: yalnız aynı hedef dili paylaşan kursa düşülür).
- **`en → de` paritesi** (anadili İngilizce olan kullanıcı için Almanca). Kelime verisi
  hazır — satırlar üç dilli olduğundan yeni kelime toplamak gerekmiyor; eksik olan, anlatım
  dili İngilizce olan ders metinleri.
- **Havuz Almanca listesinden türüyor.** İngilizce 6.975 madde, Almanca 8.267; aradaki 1.292'nin
  hepsi **aynı İngilizce başlığa düşen** Almanca kelimeler (`an`/`bei`/`zu` → *at*), yani veri
  eksik değil, tekilleştirilmiş. Asıl sınır şu: havuz Almanca A1–C1 listesinin İngilizce
  karşılıklarından oluşuyor, bağımsız bir İngilizce CEFR listesi değil. Bu yüzden İngilizceye
  özgü kelimeler (renkler, gün adları, *fitting room*) derslerde geçiyor ama havuzda karşılığı
  yok. Derslerde geçen 651 kelimenin 89'u bu durumdaydı; 68'i havuza eklendi (id aralığı
  209001+, `srcId` yok — Almanca bir satırdan türemiyorlar), 21'i eklenmedi çünkü havuzda
  zaten karşılığı vardı: yazım/lehçe çiftleri (*colour*↔*color*, *neighbour*↔*neighbor*,
  *rubbish*↔*trash*), çekimli biçimler (*played*, *watched*) ve öğretim çiftleri
  (*go / went*). Kapsam artık %100.

### İçerik üretirken uyulan kurallar

Bu kurallar üretim sırasında tek tek hataya yol açtıkları için yazıldı:

- **Seviye sınırı makineyle denetlenir.** A1'de geçmiş zaman, A2'de koşul cümlesi/edilgen
  çatı/dolaylı anlatım metinlere sızmamalı.
- **`roleplay.partner` TÜRKÇE yazılır** — `src/lib/lessons/roleplay.ts` onu Türkçe bir cümlenin
  içine koyuyor ("… rolündesin"), İngilizce yazılırsa bozuk okunur.
- **`icon` yalnız `LESSON_ICONS` listesinden** (`src/lib/lessons/types.ts`). Mobil bu alanı
  okumuyor ama web'in kapalı union'ı okuyor.
- **Modül sınırı 10 derstir.** `moduleThemes` listesi GERÇEK içerik kadar uzun tutulur; olmayan
  modüle başlık yazmak, ders eklendikçe sıranın kayıp başlığın içerikten ayrılmasına yol açar.
- **Yazma görevlerinde kısaltmalar.** Puanlayıcı (`skillQuiz.tsx`, `written`/`fold`) "I am" ile
  "I'm" arasında köprü kurmaz. Bir cümlede birden çok kısaltma varsa öğrenci karışık yazabilir,
  bu yüzden tüm ara biçimler `alternatives` içinde bulunmalıdır.

## 11. XP tablosu

Puan **harcanan çabayı** ölçer, aktivitenin türünü değil: aynı beş dakika hangi yolla
geçirilirse geçirilsin benzer XP kazandırır. Taban `src/lib/xp.ts` içinde tek yerde durur
ve kelime oyunlarında ölçülen orana eşitlenmiştir (dakikada ~100 XP).

Önceki dağılım öğrenmeyi çarpıtıyordu — ölçüm: kelime oyunları dakikada 99,5 XP, beş
dakikalık bir okuma alıştırması ~9 XP/dk, dersler ise **sıfır**. Sekiz tamamlanmış ders ve
sekiz rol yapma turu hesaba hiç yazılmamıştı; üstelik ders çalışılan gün seri bile
ilerlemiyordu. Sıralamada yükselmek isteyen öğrenci kelime kartı çevirmek zorundaydı.

| Yol | XP |
|---|---|
| Kelime cevabı | kaliteye göre 3–12 (≈100 XP/dk) |
| Beceri alıştırması | `minutes × 100 × (0,5 + 0,5 × doğruluk)` |
| Ders | süreye göre; rol yapma ayrı ağırlık taşır (dersin asıl parçası o) |
| Günün turu | süreye göre, ilk kayıtta bir kez |
| Görev ödülü | görev başına 120–200, üçü birden +300 |
| Hayatta kalma rekoru | farkla orantılı, 25–400 arası |
| Bahisli etap | hatasızsa etabın puanı kadar ek, iki yanlışta etabın puanı kadar eksi (tavan 250) |

XP, günlük istatistik ve seri tek geçitten yazılır (`src/lib/award.ts`); yeni bir öğrenme
yolu eklenirken üç şeyi ayrı ayrı hatırlamak gerekmez.

## 12. Oyun katmanı

Uygulamada mekanik eksik değildi; eksik olan **geri bildirim, hatıra ve rekabet**ti. Bu bölüm
o üçünü kuran parçaları ve neden öyle kurulduklarını anlatıyor.

### Ses

Uygulama tamamen sessizdi. Geri bildirim yalnızca titreşim ve ekrandaki geçiş çizgisiydi;
titreşim masaüstünde hiç yok, telefonda da sistem ayarıyla kapatılabiliyor — yani bir cevabın
doğru olduğu bazı cihazlarda **sadece renkle** anlaşılıyordu.

Sesin işi süslemek değil, üç şeyi söylemek:

| Ne der | Nasıl |
|---|---|
| "Cevabın alındı" | Dokunuş–ses gecikmesi sıfıra yakın: ses dosyası yok, tonlar `WebAudio` ile yerinde üretiliyor |
| "Üst üste doğru gidiyorsun" | Doğru sesi sabit değil; her ardışık doğruda pentatonik merdivende bir basamak yükseliyor |
| "Bir şey kazandın" | Etap, kusursuz etap, rekor ve rozet açılışının ayrı ezgileri var |

Merdiven bilerek pentatonik: hangi basamaktan hangisine atlanırsa atlansın uyumsuz aralık
çıkmaz. Kromatik bir dizide 7. doğruda kulağı tırmalayan bir aralık duyulur ve "kombo
yükseliyor" hissi bozulurdu.

Ses tek noktadan bağlı (`src/lib/fx.ts` içindeki `vibrate()`): on oyunun hepsi ve dersler
cevabı aldığı anda ya `vibrate()` ya da onu zaten çağıran `fx()` üzerinden geçiyor. On bir
çağrı yerini dolaşmadan bütün uygulama seslendi.

### Rozetler

Biriken tek şey XP'ydi ve XP tek bir sayı: 41.320'den 41.480'e çıkmak hiçbir şey anlatmıyor.
Geriye dönüp bakılacak bir yüzey yoktu — oysa veritabanında yüz günlük seriler, binlerce doğru
cevap ve bitmiş dersler duruyordu. Emek vardı, hatırası yoktu.

Üç karar:

1. **İlerleme biriktirilmiyor**, mevcut tablolardan okunuyor (`quests.ts` ile aynı ilke).
   Bedeli birkaç ek sorgu; karşılığı rozetlerin **geriye dönük** olması. Sistem açıldığı gün
   kimse sıfırdan başlamıyor.
2. **Az ve zor.** Her şeye rozet veren sistemler *overjustification* etkisiyle içsel
   motivasyonu düşürüyor. 41 rozetin çoğu aylara, birkaçı yıllara yayılıyor.
3. **Hiçbiri satın alınamaz.** Uygulamada para yok ve olmayacak; rozetin değeri buradan geliyor.

Kutlama tek bir yerde duruyor (`app-shell.tsx` → `AchievementUnlock`) ve tetikleyicisi zaten var
olan `lernomi:stats` olayı: XP değiştiğinde bir şey kazanılmış demektir. Rozetin kazanılabileceği
altı ayrı yere (kelime turu, ders, beceri, görev, günün turu, hayatta kalma) ayrı kutlama koymak,
altı yerde unutulabilecek bir şey demekti.

### Bahis

Ana turda kaybedilecek hiçbir şey yoktu, dolayısıyla kazanılacak bir şey de yoktu. Bahis
gerilimi ana tura taşıyor:

| Sonuç | Etki |
|---|---|
| Beşi de doğru | Etabın puanı iki katı |
| Bir yanlış | Başa baş |
| İki veya daha çok yanlış | Etap puan kazandırmaz |

İki kural adil tutuyor: **tamamen isteğe bağlı** (bahse girmeyen için oyun hiç değişmez) ve
**kayıp yalnızca o etaba ait** (dünkü emeğe dokunulmaz, toplam XP asla geriye gitmez). Pay
istemciden geldiği için sunucuda tavanlı — `xpForWager` 250'yi geçen bir pay kabul etmiyor.

### Yürürken modu

Eller serbest konuşma döngüsü derslerde zaten çalışıyordu: cevap sesli okunuyor, okuma biter
bitmez mikrofon kendiliğinden açılıyor, söylenen doğrudan gidiyor. Aynı döngü kelime turuna
taşınınca ortaya bambaşka bir kullanım anı çıktı — yürürken, bulaşık yıkarken, otobüste.

| Karar | Neden |
|---|---|
| Türkçe duy → Almanca söyle | Şık işaretlemek tanımadır; ağızdan çıkarmak ekrana bakmadan yapılabilecek tek alıştırma türü ve dilin asıl kullanıldığı iş |
| Tur, ekrandaki turun ta kendisi | Ayrı bir "sesli mod ilerlemesi" kurmak aynı emeği ikinci bir yerde saymak olurdu; ekranda başlayıp kulakla devam etmek serbest |
| Duyulmayan tur yanlış sayılmaz | Sokakta mikrofonun bir turu kaçırması olağan; onu hata yazmak kelimeyi gerçekten unutulduğu için değil gürültü yüzünden öne çekerdi |
| Cevaplar `speak` adıyla kaydedilir | Yazma oyununun hanesine yazmak kolaydı ama profildeki oyun başarısı tablosunu bozardı: ikisi farklı beceri |

#### Ekran kapalıyken mikrofon

Tarayıcının kendi konuşma tanıyıcısı (`SpeechRecognition`) **yalnızca sayfa görünürken**
çalışıyor. Telefon kilitlenince susuyor ve bunun etrafından dolaşmanın yolu yok: bu bir eksik
değil, mikrofonun görünmez biçimde açık kalmasını engelleyen bilinçli bir platform kararı.
`Screen Wake Lock` de yetmiyor, çünkü yalnızca BOŞTA KALMAYI engelliyor — güç tuşuna basıldığında
ekran yine kapanıyor.

Çözüm tanıyıcıyı bırakmak: ses `getUserMedia` ile **kendimiz kaydediliyor** ve sunucuda yazıya
çevriliyor. `getUserMedia` akışı arka planda yaşamaya devam ediyor — sesli not uygulamalarının
ekran kapalıyken kayıt yapabilmesinin sebebi bu.

| Parça | Neden |
|---|---|
| Mikrofon akışı **ekran açıkken** alınıyor, susturulmuş hâlde bekliyor | Gerçek telefonda ekran kilitlendikten SONRA `getUserMedia` reddediliyor: ekran kapanınca mikrofonu açmaya çalışan akış isteği anında düşürüyor ve cevap, mikrofon açılma sesiyle aynı anda "duyamadım" oluyordu. Akış oturum başında alınıp parçaları kapatılıyor (tanıyıcıyla çekişmesin diye); ekran kapanınca yalnızca açılıyor. Ekran geri açılınca kayıt duruyor ama akış BIRAKILMIYOR — ekran yeniden kapanabilir |
| Kaydedici oturum boyunca durmadan çalışıyor | Her tur yeniden başlatmak kalkış gecikmesi ekliyordu ve kullanıcı Türkçeyi duyar duymaz konuşmaya başladığı için kelimenin BAŞI kayda girmiyordu. Ölçüldü: başı kesik ses Whisper'da doğrudan uydurmaya dönüyor (`der Weg` → "Vielen Dank.", `der Großvater` → "Krater"), sonu kesik ses ise sorunsuz. Açık akış ayrıca sekmenin arka planda canlı kalmasının en güçlü güvencesi |
| Cevaplar **halka tampondan** kesiliyor | Kaydedici sürekli döndüğü için kalkış gecikmesi yok; dilim geriye doğru da genişletilerek konuşmanın gerçek başı yakalanıyor |
| Konuşmanın bitişi **bayt boyutundan** anlaşılıyor | Chrome'un kaydedicisi opus'u değişken hızda kodluyor: 200 ms'lik parça sessizlikte **72 bayt**, konuşmada **3.880 bayt**. Elli kattan fazla fark ve WebAudio gerektirmiyor — ekran kapanınca `AudioContext` askıya alındığı için çözümleyiciye dayalı bir çözüm tam ihtiyaç duyulan yerde çalışmazdı |
| Bayt eşiği **yalnızca kırpmak için** | Reddetmek için kullanıldığında gerçek cihazda "her cevap duyamadım" oldu: eşik sentetik bir ses cihazında ölçülmüştü, gerçek mikrofonun seviyesi ve gürültü bastırması başka. Şüphede kalan klip gönderiliyor, kararı Whisper veriyor |
| Kaydedici ölürse **tek seferlik kayda** düşülüyor | Sürekli kaydedici bir kez düştüğünde (ekran kapanması, sekmenin dondurulması) sonraki her cevap sessizce "duyamadım" oluyordu. Bir turu kaybetmek, turun tamamını kaybetmekten iyi |
| Sayfa görünürken mikrofon **yalnızca tanıyıcının** | İki tüketici birbirini bozuyor: kaydedici sürekli açıkken tanıma ekran açıkken bile belirgin biçimde kötüleşti. Görünürken kayıt yolu hiç kurulmuyor; ekran kapanınca (tanıyıcı zaten susuyor) mikrofon açılıyor, ekran açılınca bırakılıyor |
| Dinleme **üst sınırlı** | Duraklama payı her ara sonuçta sıfırlanıyor; gürültülü ortamda tanıyıcı ara sonuç üretmeyi sürdürdükçe sayaç hiç dolmuyor ve tur kapanmıyordu. Konuşma başladıktan sonra bir kez kurulan tavan bunu bitiriyor |
| Bitiş eşiği **gürültü tabanından** | Sabit eşik gerçek cihazda çalışmadı. İlk denemede taban pencerenin İLK parçalarından ölçüldü ve o da yanlıştı: kullanıcı okuma biter bitmez konuşmaya başlıyor, yani ilk parçalar sessizlik değil konuşma oluyor ve taban konuşma seviyesine kuruluyordu. Taban artık pencerenin alt yüzdeliği ve her turda yeniden hesaplanıyor |
| Kayıt **erken kapanmıyor** | Ön-pay okumanın ses kuyruğunu içeriyor; o kuyruk eşiği geçince "konuşma başladı" sanılıyor, ardından düşünme sessizliği gelince kayıt daha cevap verilmeden kapanıyordu ("mikrofon açıldığı gibi kapandı"). Üç koruma: karar yalnızca ön-pay sonrasından veriliyor, konuşma sayılması için iki ardışık gürültülü parça gerekiyor ve kayıt 1,8 saniyeden önce hiç kapanmıyor |
| Cevabın kabulü **yazma oyunuyla aynı** | Konuşma yolu daha katıydı: artikel zorunluydu, umlaut katlanmıyordu. Tanıyıcı tek kelimelik cevapta artikeli sık düşürüyor — "die Katze" denip metne "Katze" geçiyor ve tur "doğrusu: die Katze" diyordu. Artikelin kendi oyunu var; buranın sorusu "kedi Almanca ne" |
| Duyulan metin **ekranda** | "Doğru söyledim ama yanlış saydı"nın tek cevabı ne duyulduğunu göstermek. Yanlış cevapta transkript yazıyor, sorunun telaffuzda mı tanıyıcıda mı olduğu anında görülüyor |
| Beklenen ve duyulan **kaydediliyor** | Aynı soru sonradan da sorulabilsin diye: `report:providers` "beklenen ≠ duyulan" listesini veriyor. İlk seferinde sebebin artikel olduğu koda bakarak anlaşıldı, veriye bakarak değil |
| Sesler **ses öğesi** zinciriyle çalınıyor | Kilitlenince `AudioContext` askıya alınıyor, ses öğeleri çalmaya devam ediyor (podcast uygulamalarının çalışma biçimi) |
| Arkada **sessiz döngü + MediaSession** | Ses hiç kesilmezse tarayıcı sekmeyi "medya çalıyor" sayıyor: zamanlayıcılar kısılmıyor ve sonraki parça ekran kapalıyken de başlatılabiliyor |
| Ses **saklanmıyor** | Klip bellekte sağlayıcıya iletiliyor ve cevapla birlikte düşüyor |

#### Ekran açıkken tanıyıcı, kapalıyken Azure

Kullanıcının şikâyeti iki cümleydi: "ekran açıkken Web Speech yerine sunucuya gidiyor" ve
"sunucu ne desem anlamıyor, olmayan kelimeler söylüyor." İkisi de doğruydu. Tanıyıcı iki
boş dinlemeden sonra oturum boyunca bırakılıyordu (düşünme süresi 4 saniyeyi aşan iki cevap
yetiyordu); sunucu tarafında Whisper tek kelimelik cep klibine kelime uyduruyor ve uydurma
yanlış cevap sayılıyordu (`der Großvater` → "Wolfsfatter", `raten` → "Per Geschenk").
Ölçümler ve karar `docs/plan/walk-stt.md`'de; özeti:

| Karar | Neden |
|---|---|
| Ekranda kip **dersle birebir aynı**: yalnız tarayıcı tanıyıcısı, mikrofon tutulmuyor, sessiz döngü çalmıyor, okuma oyunların boşluksuz yolundan | İlk düzeltme mikrofon akışını oturum başında alıp (parçaları kapalı) tutmayı sürdürüyordu; sahibin telefonunda altı dinlemenin altısı `browser:end` — tanıyıcı açılıyor, hata vermeden ve hiçbir şey duymadan kapanıyor. Android eşzamanlı kayıtta sesi üstteki uygulamanın kendi akışına veriyor, tanıyıcı servisi sessizlik alıyor; aynı akış Bluetooth'ta çıkışı telefon yoluna düşürüp okumayı da bozuyordu ("oyunlardaki gibi değil"). Boş dinleme "duyamadım"dır, kip değişmez; sessizlik tavanı 7 sn |
| Cep yolu **"Cebe koy" ile** kuruluyor | Mikrofon kilitli ekranda istenemiyor (ölçülmüş), tutulunca da tanıyıcı ölüyor: tek izinli an, kullanıcının ekran açıkken dokunduğu an. Düğme mikrofonu alıp sessiz döngüyü kuruyor, "ekranı kapatabilirsin" diyor; ekran kapanınca kayıt + sunucu. Ekran açık kaldıkça cepte kipinde DİNLENMİYOR, yarım dakikada kapanmazsa ekran kipine dönülüyor. Ekran geri açılınca (süren kayıt bitince) kendiliğinden ekran kipi |
| Ekran kipinde ekran kapanırsa tur **duruyor ve sebebini söylüyor** | O an yapılabilecek dürüst şey yok. Ekranı KAPATMADAN cebe koyan için ekran kipi zaten yeter: ekran kilidi ekranı açık tutuyor, tanıyıcı sürüyor |
| Ekran kapalıyken **Deepgram önde** (`mode: walk`) | Klip geçerli webm olarak gidiyor ve Deepgram bunu ham çözüyor; başı-kesik seste UYDURMUYOR, boş dönüyor (Whisper'lar "der Großvater" → "Wolfsfatter" uyduruyor). Azure kısa-ses ucu webm ALMIYOR (yalnız WAV/OGG), o yüzden cep zincirinde değil — Azure yalnız TTS yedeği |
| Klip **geçerli webm**, istemcide çevrilmiyor | WAV'a çevirme `AudioContext`e dayanıyordu ve o KİLİTLİ EKRANDA askıya alınıyor: cep yolu ölüydü (`stt:decode`). Çeviri bırakıldı; klip ham webm gidiyor, sunucu çözüyor |
| Kaydedici **ekran açıkken** başlatılıp açık tutuluyor | Cevap başına taze `MediaRecorder` denendi ama ekran KAPALIYKEN başlatılan kayıt SESSİZ geliyordu (`deepgram:empty`, conf 0) — Android arka planda yeni `AudioRecord` başlatmayı sessiz geçiyor. Süregelen bir kayıt ise ses veriyor; kaydedici "Cebe koy"da (ekran açık) başlıyor, cevaplar ondan kesiliyor (`recordAnswerClip`) |
| Kesme **geriye yürümüyor** | Halka tampondan `first`ten başlayan dilim küme sınırında olmuyor ve "bozuk dosya" (400) sayılıyordu. Cevap başında tampon sıfırlanıp başlık + ardışık küme(ler) kesintisiz gönderiliyor: geçerli webm, konuşma bitişi yine bayt boyutundan |
| Kip **görünürlükten** seçiliyor, istemci değil | `transcribe` sayfa gizliyse `walk`, görünürse `default` gönderiyor. Görünür sayfa `walk` isteyemiyor — "ekran açıkken asla sunucu STT" böylece istemcinin elinde değil |
| Turlar arası **kısa nefes** (ekran açık) | Tanıyıcı doğru cevabı duyar duymaz kapanıp sonraki soruya geçiyordu — "aşırı hızlı". Ekranda ~0,55 sn es; cepte ekran kapalıyken zaten yavaş, orada es yok |
| Düğme **okumuyor**, döngüye not bırakıyor | "Cebe koy"dan doğrudan okumak döngünün süren okumasını iptal ediyor, döngü o okumanın bitişini 30 sn'lik tavana kadar bekliyordu (ölçüldü: 1,3 → 31,3 sn). Duyuruyu döngü kendi sırasında okuyor; dinlemenin ortasına denk gelirse kelime yeniden soruluyor |
| Süresi dolan dinleme **iptal** | Eskiden arkada kaydı bitirip sunucuya da gönderiyordu: aynı saniyede iki çağrı |
| Her dinleme **kayda geçiyor** | `walk_listen` (yol, hata kodu, giden saniye) ve `walk_switch`; `?diag=1` son dinlemeleri ekranda gösteriyor. Teşhisin kendisi bu veriden çıktı |

`npm run test:walk -- visible-only` ekran açıkken sunucuya sıfır istek gittiğini,
`switch` "Cebe koy" sonrası kapanınca kaydın gidip açılınca bir daha gitmediğini ve turun
tanıyıcıyla sürdüğünü ölçüyor; `npm run test:vad` kırpıcının birim testi.

#### Mikrofon açıkken ses kalitesi

Mikrofon oturum boyunca açık tutuluyor (ekran kilitlendikten sonra yeniden
istemek reddedildiği için) ve bunun bir yan etkisi vardı: turun TAMAMI boyunca
çalan her şey bozuk duyuluyordu — Bluetooth kulaklıkta telefon görüşmesi sesi,
hoparlörde incelmiş ve boğuklaşmış bir çıkış.

Sebep `echoCancellation`. Masum bir istek değil: Android/Chrome yankı
bastırmayı gördüğünde yakalamayı "konuşma" yoluna alıyor ve o yol ÇIKIŞI da
içine çekiyor. Bluetooth'ta A2DP bırakılıp HFP'ye düşülüyor (16 kHz, tek
kanal); hoparlörde de çıkış voice yoluna geçiyor.

| Parça | Neden |
|---|---|
| Yankı bastırma **kapalı** | Bedeli burada küçük: kulaklıkta hoparlörden mikrofona giden yol zaten yok, hoparlörde de kayıt okuma BİTTİKTEN sonra başlıyor. Karşılığında çıkış kalitesi turun tamamında korunuyor |
| Gürültü bastırma ve kazanç denetimi **açık** | İkisi yazılımda çalışıyor ve çıkış yolunu değiştirmiyor; cepteki telefonun kumaşa sürtünmesi ve sokak gürültüsü karşısında yazıya çevirmeyi belirgin biçimde kolaylaştırıyor |
| Kısıt **şart koşuluyor**, sonra gevşetiliyor | Düz değer yalnızca "tercih" sayılıyor ve sessizce yok sayılabiliyor; ilk deneme `exact` ile kapalı olmasını zorunlu kılıyor. Cihaz yapamıyorsa sırayla gevşetiliyor — hiç akış alamamak, kalitesiz akıştan kötü |
| Ne alındığı **kaydediliyor** | İstemek ile almak aynı şey değil. Her turda `walk_capture` olayı yankı bastırmanın gerçekte açık kalıp kalmadığını yazıyor; ses şikâyetinde tahmin etmeye gerek kalmıyor |
| Üretilen sesler **48 kHz/16 bit** | Sessiz döngü ve mikrofon bipi 8 kHz/8 bit'ti. Sessiz döngü oturum boyunca DURMADAN çalıyor: ses yolunun neden bozulduğu aranırken elenmesi gereken ilk şüphelilerden, bip de 8 bitte kaba duyuluyordu |

Bluetooth kulaklıkta sorun bundan sonra da sürerse kalan tek sebep, Chrome'un
kulaklığın KENDİ mikrofonunu açmak için SCO bağlantısı kurmasıdır; onun tek
çaresi girişi telefonun dahili mikrofonuna sabitlemek — cepteki telefonda
konuşmayı kumaşın arkasından dinlemek demek olduğu için bilerek yapılmadı.

#### Ses hijyeni

"Boş bir odada yankılı gibi geliyor" ve "kelimeyi söylerkenki kalite artık
hiçbirinde yok" — ikisi de ses kalitesi şikâyeti gibi duruyor ama ikisi de
mekanik hata. Aynı anda çalan ikinci bir ses, kulakta kaliteyi düşüren bir
şeye dönüşüyor.

| Parça | Neden |
|---|---|
| Konuşma yolu **iki öğeyi birden** susturuyor | Uygulama iki ses öğesi kullanıyor; parça zinciri (ders anlatımı, yürürken modu) ikisini sırayla çalıyor. Oyunların konuşma yolu ise yalnızca birincisini susturuyordu ve yarım kalmış bir anlatım ikincide çalmayı sürdürüyordu. Susturmanın diğer bütün yolları zaten ikisini de durduruyordu; eksik olan tek yol, oyunların TAMAMININ kullandığı yoldu |
| Dinleme alıştırması da **paylaşılanları** susturuyor | Kendi `Audio` nesnesini kuruyor ve yalnızca kendi sesini durduruyordu |
| Sessiz döngü **modun dışına taşmıyor** | Yürürken modu arka planda kalmak için sessiz bir ses çalıyor ve o döngünün kendini yeniden başlatan bir gözcüsü var. "Geri dön" düğmesine basmadan çıkılınca (alt gezinmeden başka bir sekmeye geçmek) döngü çalmaya devam ediyordu: durdurulamayan, sürekli açık bir çıkış akışı. Ölçüldü — düzeltmeden önce mod dışında çalmayı sürdürüyor, sonra bırakılıyor |
| Arka plan gözcüsü **çalan sesi kesmiyor** | `onplaying` kaçırılırsa hâlâ çalan bir parçanın üstüne sıradakini başlatabiliyordu. Ölçüt `paused` değil `currentTime`: `play()` çağrılır çağrılmaz `paused` false oluyor, ses hiç akmasa bile — ilk hâli ona bakıyordu ve ağ takıldığında gözcüyü tamamen devre dışı bırakıyordu |

`npm run test:audio` ikisini birden ölçüyor: aynı anda çalan öğe sayısı ve
moddan çıkınca kalan döngü. Sızıntı yalnızca UYGULAMA İÇİ gezinmeyle görülüyor —
tam sayfa yüklemesi her şeyi zaten yok ediyor ve hatayı gizliyor.

#### Bekleme ve yanlış duyma

Üç şikâyet aynı turdan çıktı: mikrofon çok bekliyor, bipi beklemeden
konuşulamıyor, ve tanıyıcı arkadan gelen konuşmaları da kelimeye çeviriyor
(bazen başka bir dilde).

| Parça | Neden |
|---|---|
| Doğru cevap duyulunca **hemen** kapanıyor | Beklenen cevap belliyken duraklama payının dolmasını beklemenin karşılığı yok; kullanıcının hissettiği tek şey bekleme oluyordu. Ara sonuç zaten tutuyorsa tur biter. Yalnızca KAPATMAK için: kabul kararını yine çağıran taraf veriyor. Aynısı "devam edelim mi?" onayında da geçerli |
| İşaret, mikrofon **açıldıktan sonra** çalıyor | Bip duyulduğunda tanıyıcı zaten dinliyor, yani bipi beklemek gerekmiyor. Kayıt yolunda klip halka tampondan geriye kesildiği için bipten önce söylenen de klibe giriyor |
| Bip **bir kez** | Ekran açık yolda iki işaret birden çalıyordu (biri turdan, biri dinleme kancasından); ikisi arka arkaya gelince mikrofonun ne zaman açıldığı belirsizleşiyordu |
| Kuyruk payı ve en kısa dinleme **kısaldı** | 800 → 600 ms ve 1,8 → 1,2 sn. İkisi de erken kapanmaya karşı konmuştu; erken kapanmanın asıl sebebi (ön-payın okuma kuyruğunu içermesi) ayrıca çözüldüğü için bu kadar cömert olmalarına gerek kalmadı |
| Klibin **sonu da kırpılıyor** | Önceden pencerenin sonuna kadar her şey gidiyordu: kullanıcı sustuktan sonraki sokak gürültüsü ve arkadan gelen konuşmalar dâhil. Tanıyıcıya duyacak bir şey verilince duyuyor — "arkadaki konuşmaları da algılıyor" şikâyetinin doğrudan kaynağı buydu |
| Güveni düşük metin **duyulmamış** sayılıyor | Ayırt eden şey metnin kendisi değil, tanıyıcının o metne ne kadar inandığı. Eşik bilerek gevşek (0,4): daha önce bir eşik ölçülmeden kondu ve gerçek cihazda "her cevap duyamadım"a dönüştü. Duyulmayan tur zaten yanlış sayılmıyor, yani bedeli bir tur |
| Güven **kaydediliyor** | Eşiği tahminle sıkmamak için: gerçek cevaplarla uydurmaların değerleri `ai_usage`'da yan yana duruyor. `0024` göçü bu sütunu ekliyor |

`browser-fast` senaryosu bunu dışarıdan kanıtlıyor: sahte tanıyıcı doğru cevabı
ara sonuç olarak veriyor ve `onend` **hiç vermiyor**. Tur yine de 20 sorunun
tamamını bitiriyor ve en uzun sessizlik 0,9 saniye — erken kapatma olmasa her
soru zaman aşımını beklerdi.

#### Donmayan döngü

Ekran kapalıyken kalan şikâyet artık yanlış cevap değil, HİÇBİR cevaptı: kelime okunmuyor,
"duyamadım" bile denmiyor, sıradakine geçilmiyor. Tur bir `await` zinciri olduğu için tek bir
adımın takılması tamamını sessizce dondurmaya yetiyordu — ve gizli sayfada takılabilecek adım
çoktu.

| Parça | Neden |
|---|---|
| Zaman aşımları **medya nabzına** bağlı | Gizli sayfada `setTimeout` dakikada bire kısılıyor, yani zaman aşımını zamanlayıcıyla kurmak korumayı tam gerektiği anda kaybetmek demek. Kısılan zamanın kendisi değil uyandırma: vade `Date.now()` ile tutuluyor, işletme ise eline geçen her olayda oluyor — çalan sesin `timeupdate`i (saniyede dört, medya iş parçacığından), kaydedicinin 200 ms'lik parçaları ve kısıtlı da olsa aralık |
| Cevap penceresi de aynı nabızla | `recordClip` her 200 ms'de bir `setTimeout` ile dönüyordu ve ekran kapanınca duruyordu: kayıt hiç kapanmıyor, pencere üst sınıra kadar sessiz bekliyordu. Ölçüldü: düzeltmeden önce ekran kapalıyken sunucuya giden kayıt **sıfır**, sonrasında her soru için bir tane |
| Her adımın **üst sınırı** var | Okuma 30 sn, dinleme pencere + 15 sn, ağ istekleri 8–10 sn. Süre dolarsa "duyulmadı" sayılıyor — duyulmayan tur zaten yanlış sayılmıyor, yani bedeli bir tur; donmanın bedeli ise turun tamamı |
| Parça **başlamazsa** beklenmiyor | Çalmaya başlamış ama bitmeyen parça uzun sürebilir, hiç başlamayan parça gelmiyordur. Başlama payı 4,5 sn, sonrası parçanın kendi süresi + pay |
| Arka planda **tarayıcı sentezi yok** | Telefon kilitliyken `speechSynthesis` konuşmuyor VE `onend` vermiyor; yedek diye oraya düşmek sesi kurtarmıyor, üstüne zinciri sonsuza dek asıyordu. Arka planda çalınamayan parça atlanıyor |
| Mikrofon işareti **ses öğesiyle** | İşaret WebAudio ile üretiliyordu ve ekran kapanınca `AudioContext` askıda: cepteki kullanıcı mikrofonun açıldığını yalnızca kulağıyla anlayabiliyor |
| Sessiz döngü **kendini toparlıyor** | Arka planın taşıyıcı direği o: durursa hem zamanlayıcılar kısılıyor hem nabız gidiyor. Gelen çağrı ya da ses odağının kaybı durdurabiliyor; `onpause` yeniden başlatıyor |
| Durmak zorunda kalınırsa **sesle söyleniyor** | Sunucuda yazıya çevirme yoksa ekran kapalıyken cevap duyulamıyor ve tur durmak zorunda. Eskiden bu sessizce oluyordu: kullanıcı telefonu çıkarana kadar turun durduğunu bilmiyordu |

Altı arıza senaryosu `npm run test:walk -- <senaryo>` ile koşuluyor (`ok`, `browser-fast`,
`stt-off`, `stt-noise`, `stt-hang`, `stt-500`, `tts-hang`, `tts-500`). Test gerçek tarayıcıda gerçek uygulamayı
oynatıyor ve ekran kapanmasını taklit ederken **gerçek kısıtları** kuruyor: `getUserMedia`
gizliyken reddediliyor, zamanlayıcılar dakikada bire kısılıyor. İkisi de masaüstü Chrome'da
kendiliğinden olmuyor; eklenmezse test yalancı bir "geçti" veriyor — bu bölümdeki hataların
çoğu tam olarak öyle gözden kaçmıştı.

Yazıya çevirme `/api/stt` üzerinden. Ekran kapalı yolda (`mode: walk`) sıra **deepgram**
(`nova-3`, webm'i ham çözüyor, başı-kesikte uydurmuyor) → **groq** → cloudflare →
speechmatics → **mistral**; ekranlı yollarda groq önde. Azure kısa-ses ucu webm almadığı
için STT zincirinde değil (yalnız TTS yedeği). Hiçbiri yoksa tarayıcının kendi tanıyıcısına
düşülüyor.

Deepgram'in başta olmasının sebebi hızı değil **dürüstlüğü**. Ölçüldü — temiz ve gürültülü
seste ikisi de 8/8, ama ses bozulduğunda yolları ayrılıyor:

| ses | groq | deepgram |
|---|---|---|
| tam | 8/8 | 8/8 |
| gürültülü + kısık | 8/8 | 8/8 |
| başı kesik | **"Vielen Dank.", "Krater"** (uyduruyor) | **""** (boş döner) |

Bu uygulamada fark büyük: uydurma bir metin **yanlış cevap** olup öğrenciyi cezalandırıyor,
boş metin ise "duyamadım" sayılıp tekrar planına hiç dokunmuyor. Groq yedekte: daha hızlı
(ölçüldü: 215 ms'ye karşı 483 ms) ama ani yükte 429 veriyor.

Deepgram OpenAI biçimini konuşmuyor (parametreler adreste, ses ham gövdede, cevap başka
yapıda), bu yüzden uçta iki lehçe var.

Her AI çağrısı — **başarısız denemeler dâhil** — `ai_usage` tablosuna yazılıyor: iş türü
(roleplay · coach · stt), sağlayıcı, model, HTTP durumu, gecikme, jeton sayısı, ses saniyesi ve
sağlayıcının bildirdiği kalan hak. Hatalar özellikle önemli, çünkü zincir düşen sağlayıcıyı
sessizce atlıyor: her istekte 429 alan bir birincil, yalnızca başarıya bakan bir raporda "hiç
kullanılmıyor" gibi görünür — oysa her seferinde bir gidiş dönüş ve bir kullanıcı gecikmesi
harcar. `npm run report:providers` hepsini okuyor.

**Ücretsiz katman yeter mi?** Bağlayıcı sınır jeton değil, istek sayısı. Groq'un ücretsiz
katmanı günde **2.000 istek · 28.800 saniye ses**; bir yürüyüş turu ~22 cevap ve ~77 saniye
ses demek:

| | bir tur | günlük sınır | sınıra kaç tur |
|---|---|---|---|
| İstek | ~22 | 2.000 | **~90 tur** |
| Ses | ~77 sn | 28.800 sn | ~370 tur |

Yani sınır istek tarafında ve **hesabın tamamı için günde ~90 yürüyüş turu** ediyor. Sayaç
`npm run report:events` çıktısında: her çağrı `stt_call` olarak yazılıyor, günün en yoğunları
sınıra oranıyla listeleniyor — limite ne kadar yaklaşıldığı 429 gelmeden görülsün diye.

Sesli cevap **sohbet jetonlarını harcamıyor**: Groq'ta yazıya çevirme ses saniyesiyle
ölçülüyor, ders içi rol yapmanın jeton bütçesine dokunmuyor. Yalnızca `MISTRAL_API_KEY`
varsa klipler oraya gider; `GROQ_API_KEY` eklemek hem ücretsiz hem de iki yükü birbirinden
ayırır.

İki koruma daha var:

| Sorun | Çözüm |
|---|---|
| Mikrofon bozukken tur yanıyor | Son dört turun üçü duyulmadıysa tur duruyor. Ölçüt bilerek "üst üste" değil: bozuk tanıyıcı arada çöp metin döndürüyor ve ardışıklık arayan bir sayaç onunla sıfırlanıyordu — ölçümde 45 saniyede altı tur yandı, sayaç hiç üçe ulaşmadı |
| Tur bitince telefonu çıkarmak gerekiyor | "Devam edelim mi?" sesli soruluyor, cevap sesli alınıyor. Anlaşılmayan cevap ne evet ne hayır sayılıyor; soru bir kez tekrarlanıyor, sonra duruluyor |

### Modül sınavı

On ders bitince hiçbir şey olmuyordu: pankartta bir kupa beliriyor, yol devam ediyordu. Sınav
yola bir varış noktası koyuyor.

Hayatta kalma turundan ayıran şey **kaybetme koşulu**. Orada amaç puanı büyütmek ve turun bir
sonu yok; burada 15 soruyu süre bitmeden bitirmek zorundasın. Patron turu tam olarak budur —
yenilebilir bir şey. Süre cömert başlıyor (60 sn) ama doğru yalnızca +3 sn kazandırıyor, yanlış
−5 sn yakıyor: yani hız değil **isabet** kazandırıyor (hayatta kalma turunda tersi, çünkü orada
amaç dayanmak).

Sorular ders içeriğinden geliyor ama kelime tablosundan kuruluyor: ders `vocab`'ı yalnızca
"das Frühstück / kahvaltı" ikilisi, oysa oyunların artikele, çoğula ve örnek cümleye ihtiyacı
var. İkisi başlıktan eşleştiriliyor — eşleşme modül başına %64–98 (ortalama ~%86), yani her
modülde 32–49 kelime kalıyor.

Kaybedince hiçbir şey silinmiyor: cevaplar zaten tekrar planına işledi, kaybedilen tek şey taç.

### Ölçüm

Bugüne kadarki kararlar ölçümle alındı ama ölçülebilen yalnızca ardında iz bırakan şeylerdi:
cevaplar, dersler, XP. Görülemeyen sorular en çok merak edilenlerdi — kaç kişi başlangıç kartını
görüp hiç başlamadan çıktı, hangi sekmeye hiç dokunulmadı.

Okuma tarafı `npm run report:events` (varsayılan son 14 gün, `report:events 60` ile daha
uzun): tur hunisi, "kartı görüp hiç başlamayan" oranı, sekme kullanımı ve günlük etkinlik.
Sayılar hem olay hem kişi olarak veriliyor — yedi kişilik bir uygulamada "142 tur başladı"
tek başına yanıltıcı, "142 tur · 4 kişi" değil.

`events` tablosu bilerek dar: kim, hangi gün, hangi olay, isteğe bağlı bir sayı. Serbest metin ya
da jsonb yok; olay adları `src/lib/events.ts` içindeki **kapalı listeden** doğrulanıyor, yoksa
tablo altı ayda kimsenin anlamını bilmediği yüzlerce adla dolardı. Yazma hiçbir zaman hata
fırlatmıyor: ölçüm, ölçtüğü şeyi bozmamalı.

### Bilerek yapılmayanlar

| Ne | Neden |
|---|---|
| Enerji / can sistemi | Öğrenmeyi duvara çarptırır. Ücretsiz kullanıcıyı saatlerce bekleten bir sistem, öğrenme uygulamasının kendi amacına aykırı |
| Para, mağaza, satın alınabilir rozet | Bu uygulama satılmıyor. Açılabilir her şeyin tek yolu oynamak |
| Otomatik seviye düşürme | Oturum doğruluğu yetkinliği değil kuyruğun bileşimini ölçüyor; daha önce kaldırıldı, geri gelmedi |
| Bildirim sıklığını artırmak | Günde bir sınırı doğru; eksik olan sıklık değil, tetikleyicinin türüydü |
