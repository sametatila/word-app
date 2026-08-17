# Wortspiel — Almanca Kelime Uygulaması

A1'den C1'e, **iki kursla** çalışan, oyunlaştırılmış ve **tekrarı kendisi planlayan** Almanca
uygulaması. Next.js + Neon Postgres, Vercel'e tek komutla çıkar. Ana ekrana eklenince
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
- **Sohbet (`/sohbet`):** seviyene göre konuşan Almanca partner. Her istekte tekrar kuyruğundan
  18 kelime sistem istemine girer, konuşma onların etrafında döner — sohbet SRS'in üstüne biner.
  Hatalar konuşmayı bölmeden tek satırda düzeltilir. Yazmak son çare: her cevabın altında
  dokunulabilir öneriler, mikrofonla sesli cevap ve umlaut tuşları var. **Eller serbest**
  anahtarı açıkken tek bir döngü kurulur — cevap sesli okunur, okuma biter bitmez mikrofon
  kendiliğinden açılır, söylediğin doğrudan gönderilir; telefona hiç dokunmazsın. GitHub Models'in ücretsiz
  Cerebras, Groq ya da Mistral'in ücretsiz katmanı üzerinden çalışır; anahtarı olan ilk
  sağlayıcı seçilir, düşerse yedeğe geçilir. Anahtar yoksa sayfa çökmez, ne yapılacağını söyler.
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
cp .env.example .env            # DATABASE_URL'i Neon'dan yapıştır
npm run db:push                 # tabloları oluştur
npm run db:seed                 # Almanca kursu: 7.392 kelime + örnek cümle çevirileri
npm run db:seed:zurich          # Zürih kursu: 7.392 Züritüütsch madde
npm run db:seed:skills          # beceri alıştırmaları (iki kurs, A1–C1)
npm run dev                     # http://localhost:3000
```

`.env` içeriği:

```bash
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.<region>.aws.neon.tech/neondb?sslmode=require"
NEON_AUTH_BASE_URL="https://ep-xxx.neonauth.<region>.aws.neon.tech/neondb/auth"
NEON_AUTH_COOKIE_SECRET="openssl rand -base64 32 çıktısı"

# Sohbet (/sohbet) — üçünden biri yeter. Sıra: cerebras → groq → mistral.
CEREBRAS_API_KEY="..."          # önerilen: ücretsizlerin en hızlısı, 1M token/gün
# GROQ_API_KEY="..."            # ~500K token/gün, ilk yedek
# MISTRAL_API_KEY="..."         # 1B token/ay ama ~2 RPM — taşma yedeği
```

Sohbet üçünü de destekler ve **anahtarı olan ilk sağlayıcıyı** kullanır (sıra:
Cerebras → Groq → Mistral). Üçü de OpenAI uyumlu olduğu için tek istemci yetiyor; sıra
hıza göre kurulu, çünkü sohbette gecikme her şeyden önemli. Birincil düşerse yedeğe
geçilir — **akış başlamadan önce**; başladıktan sonra yarım cümlenin üstüne başka modelin
cevabını eklemek doğru olmazdı. Sırayı `CHAT_PROVIDER` ile ezebilirsin. Hiçbiri yoksa yalnızca
`/sohbet` kapalı görünür, uygulamanın geri kalanı etkilenmez.

Anahtarlar **koda gömülmez** — bu depo GitHub'a push ediliyor ve GitHub kendi token biçimini
tarayıp bulduğu anda iptal ediyor.

`NEON_AUTH_*` boş bırakılırsa uygulama **demo modunda** tek kullanıcıyla çalışır — veritabanı
bağlıysa tüm oyunlar, ilerleme ve streak çalışır. İki değer eklenince giriş/kayıt (`/giris`)
kendiliğinden devreye girer.

Faydalı adresler: `/` tanıtım · `/kurs-sec` ilk giriş kurs/seviye seçimi · `/learn` oturum ·
`/words` kelime listesi · `/skills` okuma-dinleme-yazma-konuşma · `/sohbet` serbest sohbet ·
`/profile` ayarlar + ilerleme ·
`/demo-games` on oyunun tek sayfada önizlemesi. (`/progress` artık `/profile`'a yönlenir.)

## 2. Neon kurulumu (Postgres 18)

1. [console.neon.tech](https://console.neon.tech) → yeni proje (Postgres 18).
2. **Connection string** → *Pooled connection* olanı kopyala, `DATABASE_URL` yap.
3. `npm run db:push` → tablolar oluşur (`drizzle/*.sql` dosyaları da hazır, istersen SQL
   Editor'a sırayla yapıştırabilirsin).
4. `npm run db:seed` → `data/app/words.json` içindeki 7.392 kelime + `data/app/beispiel-tr.json`
   içindeki örnek cümle çevirileri yüklenir.
5. `npm run db:seed:zurich` → `data/zurich/chunk-*.json` içindeki 7.392 Züritüütsch madde
   `course='gsw-zh'` olarak yüklenir (kimlik: 100000 + kaynak id).
6. `npm run db:seed:skills` → `src/lib/skills/content/*` içindeki beceri alıştırmaları yüklenir.

## 3. Vercel'e deploy

```bash
npm i -g vercel
vercel link
vercel env add DATABASE_URL production                     # ve preview/development
vercel env add NEON_AUTH_BASE_URL production
vercel env add NEON_AUTH_COOKIE_SECRET production
vercel env add CEREBRAS_API_KEY production                  # /sohbet için; yoksa yalnızca o sayfa kapalı

# Hatırlatma bildirimleri — üçü birden gerekli, biri eksikse özellik kapalı kalır.
npx web-push generate-vapid-keys --json                     # çıktıdaki iki anahtar
vercel env add NEXT_PUBLIC_VAPID_PUBLIC_KEY production
vercel env add VAPID_PRIVATE_KEY production
vercel env add VAPID_SUBJECT production                     # mailto:seninadresin@ornek.com
vercel env add CRON_SECRET production                       # openssl rand -hex 32

vercel --prod
```

Deploy sonrası Neon Console → Auth → Configuration → **Domains** kısmına Vercel alan adını ekle
(önizleme dağıtımları için `https://*-<takım>.vercel.app` gibi joker desen de kabul edilir).

### Hatırlatma bildirimleri

Turu `vercel.json` içindeki cron tetikliyor (`/api/cron/reminders`, günde bir kez 18:00 UTC).
Vercel'in **Hobby** planı günde birden sık cron kabul etmiyor — `0 * * * *` gibi bir ifade
deploy'da hata verir. Kod her iki duruma da hazır: tur ne zaman çalışırsa çalışsın, o an
yerel saati `reminder_hour`'u geçmiş ve o gün hiç çalışmamış kullanıcılara gönderiyor.
Pro planına geçilirse `schedule` saatliğe çekilebilir; başka değişiklik gerekmez.

Kişi başına günde en fazla bir bildirim gider ve içeriği kullanıcının durumuna göre seçilir:
serisi bugün kırılacaksa seri, tekrar borcu varsa kelime sayısı, ikisi de yoksa kısa bir davet.
İzin, oturum özet ekranında — kullanıcı bir tur bitirdikten sonra — isteniyor; profilden
kapatılabiliyor.

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
TEST_DATABASE_URL="postgres://postgres:test@localhost:55432/wa" npm run test:e2e
```

E2E testi (196 kontrol) oturum kurgusunu, SRS zamanlamasını, yanlış cevap davranışını, streak
mantığını, sıklık sıralamasını, eşanlamlı kabulünü, "zaten biliyorum" akışını ve ilerleme
sorgularını gerçek PostgreSQL üzerinde doğrular.

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
    (app)/learn|words|skills|sohbet|profile
    api/session             oturum kuyruğunu üretir
    api/chat                sohbet partneri (akışlı; sağlayıcı seçimi chat-providers.ts)
    api/answers             cevapları işler (SRS + streak + istatistik)
    api/profile             ayar güncelleme
    api/words/known         "bunu zaten biliyorum" işaretlemesi
    api/auth/[...path]      Neon Auth proxy (giriş, kayıt, oturum)
    giris                   giriş / kayıt ekranı
    sifremi-unuttum         parola sıfırlama isteği
    sifre-sifirla           e-postadaki bağlantıdan yeni parola
    eposta-dogrula          kayıt sonrası doğrulama bilgilendirmesi
  lib/
    auth/                   Neon Auth sunucu + istemci sarmalayıcıları
    srs.ts                  tekrar motoru (saf fonksiyonlar)
    session.ts              kuyruk kurgusu, cevap işleme, ilerleme sorguları
    example.ts              örnek cümle ayıklama (numaralı liste + kısaltma farkındalığı)
    skills/                 beceri içeriği: types · meta · content/{a1..c1, zh-a1..zh-c1}
    db/schema.ts            words · profiles · user_words · reviews · daily_stats ·
                            skill_exercises · user_skills
  components/
    session-player.tsx      oyun akışını yöneten oynatıcı
    games/*.tsx             on oyun + ortak çerçeve
    skills/*.tsx            beceri hub'ı, okuma/dinleme/yazma çalıştırıcıları
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

Doğrulama ve sıfırlama e-postalarını **Neon Auth sunucusu** gönderir; uygulama yalnızca
akışı tetikler ve ekranları gösterir:

| Ekran | Ne yapar |
|---|---|
| `/sifremi-unuttum` | `requestPasswordReset` → e-postaya sıfırlama bağlantısı |
| `/sifre-sifirla?token=…` | `resetPassword` → yeni parolayı kaydeder |
| `/eposta-dogrula?email=…` | `sendVerificationEmail` ile doğrulama e-postasını yeniden yollar |

Kayıt sonrası oturum açılmadıysa (Neon Auth'ta "require email verification" açıksa)
kullanıcı otomatik olarak `/eposta-dogrula` ekranına yönlenir.

**Gönderen adresi:** Varsayılan olarak Neon'un paylaşımlı sunucusu kullanılır
(`noreply@stackframe.co`). Kendi alan adından göndermek için Neon Console → Auth →
Configuration → **Email server → Custom SMTP** kısmına Resend SMTP bilgilerini gir:

```
Host: smtp.resend.com
Port: 587            (veya 465 / 2465)
User: resend
Pass: <Resend API key>
From: Wortspiel <noreply@exfe.me>
```

Resend tarafında `exfe.me` alan adını doğrulaman (DKIM/SPF kayıtları) gerekir.

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

## 10. XP tablosu

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

XP, günlük istatistik ve seri tek geçitten yazılır (`src/lib/award.ts`); yeni bir öğrenme
yolu eklenirken üç şeyi ayrı ayrı hatırlamak gerekmez.
