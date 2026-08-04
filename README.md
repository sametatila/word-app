# Wortspiel — Almanca Kelime Uygulaması

A1'den C1'e, **iki kursla** çalışan, oyunlaştırılmış ve **tekrarı kendisi planlayan** Almanca
uygulaması. Next.js + Neon Postgres, Vercel'e tek komutla çıkar. Ana ekrana eklenince
uygulama gibi tam ekran açılır (PWA).

- **İki kurs, tek uygulama:**
  - **Almanca (Hochdeutsch)** — A1–C1, 7.429 kelime (A1 858 · A2 481 · B1 1.853 · B2 2.059 · C1 2.178)
  - **Zürih Almancası (Züritüütsch)** — listenin ilk 4.046 maddesinin lehçe karşılığı, Hochdeutsch
    köprüsüyle (`formen` alanında "HD: …") ve Zürihçe örnek cümlelerle. B2/C1 genişlemesinin
    lehçe karşılıkları henüz üretilmedi; karşılığı olmayan madde Zürih kursunda görünmez
    (`seed-zurich.ts` eksikleri seviye bazında raporlar, yükleme durmaz).

  Kurs ilk girişte seçilir (`/kurs-sec`), sonradan profilden değiştirilebilir. Kelime havuzu,
  tekrar kuyruğu, beceri içeriği ve ilerleme sayıları aktif kursa bağlıdır; kurs değiştirince
  diğer kursun ilerlemesi **silinmez**, beklemeye geçer.
- **6 kelime oyunu:** Eşleştirme, Doğru Anlam, Artikel Yarışı, Harf Bulmacası, Cümleyi Tamamla, Yazarak Hatırla
- **Beceriler bölümü (`/skills`):** her kursta A1–C1 için okuma, dinleme ve yazma alıştırmaları —
  metin, sözlükçe (gloss), çoktan seçmeli sorular ve gerekçeli açıklamalar; yazmada önce cümle
  kurma, sonra kontrol listeli serbest yazı ve örnek çözüm.
- **Örnek cümle çevirileri:** her örnek cümlenin doğal Türkçe karşılığı vardır; tanıtım kartında,
  kelime listesinde ve Cümleyi Tamamla oyununda görünür.
- **Adaptif tekrar:** ayrı bir "tekrar et" bölümü yok. Her cevabın hızı ve doğruluğu 0–5 kalite puanına
  çevrilir, kelimenin bir sonraki gösterim zamanı SM-2 türevi bir motorla hesaplanır ve kelime
  oyunun akışına kendiliğinden karışır. Aynı gün içindeki tekrarlar aralığı şişirmez, son 30 dakikada
  sorulan kelime yeniden sıraya girmez.
- **Sıklık sırası ve tür karışımı:** yeni kelimeler alfabetik değil, kullanım sıklığına göre gelir
  (ich, sie, du, nicht…) ve isim/fiil/diğer olarak serpiştirilir.
- **Dinamik CEFR seviyesi:** aktif seviye performansa göre yükselir ve düşer. Öğren ekranının
  üstünde seviye rozeti ve bir sonraki seviyeye ilerleme çubuğu görünür; oturum sonunda terfi/düşüş
  duyurulur. Profildeki seçim **tavan değil, başlangıç noktasıdır**.
- **Adaptif zorluk:** son 50 cevabın doğruluğu %85'in üstündeyse üretim oyunları (yazma, harf
  bulmacası), %60'ın altındaysa tanıma oyunları öne çıkar. Kullanıcıya ekranda açıklanır.
- **60 saniye meydan okuma:** oturum sonunda, öğrenilenlerden rastgele ve karışık oyun türleriyle
  süreye karşı tur.
- **Zorlayıcı çeldiriciler:** çoktan seçmelide rastgele kelime yerine Almanca biçimi hedefe benzeyen
  kelimeler kullanılır (aufhören / aufheben / aufräumen).
- **Telaffuz:** her Almanca kelime ve örnek cümle tek dokunuşla sesli okunur (tarayıcı konuşma sentezi).
- **"Bunu zaten biliyorum":** bildiğin kelimeyi tek dokunuşla pekişmiş işaretleyip atlarsın.
- **Kelimelerim ekranı:** binlerce kelimede arama, seviye/durum filtresi, çoğul-tür bilgisi, örnek cümle
  ve bir sonraki tekrar tarihi.
- **Takip:** günlük seri (streak), günlük hedef, XP, CEFR seviyesine göre ilerleme, 8 haftalık aktivite
  ısı haritası, oyun bazında doğruluk, oturum sonunda "zorlandıkların" listesi.
- **Mobil öncelikli, masaüstünde de tam:** mobilde alt sekme çubuğu, masaüstünde kenar çubuğu.
  Açık/koyu tema.

---

## 1. Yerelde çalıştırma

```bash
npm install
cp .env.example .env            # DATABASE_URL'i Neon'dan yapıştır
npm run db:push                 # tabloları oluştur
npm run db:seed                 # Almanca kursu: 7.429 kelime + örnek cümle çevirileri
npm run db:seed:zurich          # Zürih kursu: 4.046 Züritüütsch madde (karşılığı olanlar)
npm run db:seed:skills          # beceri alıştırmaları (iki kurs, A1–C1)
npm run dev                     # http://localhost:3000
```

`.env` içeriği:

```bash
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.<region>.aws.neon.tech/neondb?sslmode=require"
NEON_AUTH_BASE_URL="https://ep-xxx.neonauth.<region>.aws.neon.tech/neondb/auth"
NEON_AUTH_COOKIE_SECRET="openssl rand -base64 32 çıktısı"
```

`NEON_AUTH_*` boş bırakılırsa uygulama **demo modunda** tek kullanıcıyla çalışır — veritabanı
bağlıysa tüm oyunlar, ilerleme ve streak çalışır. İki değer eklenince giriş/kayıt (`/giris`)
kendiliğinden devreye girer.

Faydalı adresler: `/` tanıtım · `/kurs-sec` ilk giriş kurs/seviye seçimi · `/learn` oturum ·
`/words` kelime listesi · `/skills` okuma-dinleme-yazma · `/profile` ayarlar + ilerleme ·
`/demo-games` altı oyunun tek sayfada önizlemesi. (`/progress` artık `/profile`'a yönlenir.)

## 2. Neon kurulumu (Postgres 18)

1. [console.neon.tech](https://console.neon.tech) → yeni proje (Postgres 18).
2. **Connection string** → *Pooled connection* olanı kopyala, `DATABASE_URL` yap.
3. `npm run db:push` → tablolar oluşur (`drizzle/*.sql` dosyaları da hazır, istersen SQL
   Editor'a sırayla yapıştırabilirsin).
4. `npm run db:seed` → `data/app/words.json` içindeki 7.429 kelime + `data/app/beispiel-tr.json`
   içindeki örnek cümle çevirileri yüklenir.
5. `npm run db:seed:zurich` → `data/zurich/chunk-*.json` içindeki 4.046 Züritüütsch madde
   `course='gsw-zh'` olarak yüklenir (kimlik: 100000 + kaynak id).
6. `npm run db:seed:skills` → `src/lib/skills/content/*` içindeki beceri alıştırmaları yüklenir.

## 3. Vercel'e deploy

```bash
npm i -g vercel
vercel link
vercel env add DATABASE_URL production                     # ve preview/development
vercel env add NEON_AUTH_BASE_URL production
vercel env add NEON_AUTH_COOKIE_SECRET production
vercel --prod
```

Deploy sonrası Neon Console → Auth → Configuration → **Domains** kısmına Vercel alan adını ekle
(önizleme dağıtımları için `https://*-<takım>.vercel.app` gibi joker desen de kabul edilir).

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

E2E testi (45 kontrol) oturum kurgusunu, SRS zamanlamasını, yanlış cevap davranışını, streak
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
    (app)/learn|words|skills|profile
    api/session             oturum kuyruğunu üretir
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
    games/*.tsx             altı oyun + ortak çerçeve
    skills/*.tsx            beceri hub'ı, okuma/dinleme/yazma çalıştırıcıları
data/
  app/words.json            Almanca tohumlama kaynağı (7.429 kelime, A1–C1)
  app/beispiel-tr.json      örnek cümlelerin Türkçe çevirileri (7.426 cümle)
  zurich/chunk-*.json       Züritüütsch karşılıklar (4.046 madde — B2/C1 genişlemesi bekliyor)
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
harf bulmacası). Aynı oyun arka arkaya gelmez.

## 6. Seviye ve zorluk mantığı

| Olay | Etki |
|---|---|
| Oturum doğruluğu ≥ %85 | seviye puanı +2 |
| %70–85 | +1 |
| %50–70 | 0 |
| < %50 | −2 |

Terfi iki vitesli çalışır:

| Aşama | Terfi | İniş |
|---|---|---|
| **Kalibrasyon** (seviyedeki ilk 80 cevap) | puan ≥ 10 **ve** oturum doğruluğu ≥ %90 | puan ≤ −6 |
| **Sonrası** | puan ≥ 24 | puan ≤ −10 |

Kalibrasyon penceresi, yanlış başlangıç seviyesi seçen öğrenciyi hızla kendi seviyesine yaklaştırır;
pencere kapandıktan sonra terfi seviyede gerçekten çalışılmış hacim ister. Seviye her değiştiğinde
puan 4'e döner ve hacim sayacı sıfırlanır.

Profildeki seçim tavan değildir: aktif seviye C1'e kadar yükselebilir, A1'e kadar inebilir.
Yeni kelimeler aktif seviyenin çevresinden (bir alt, aktif, bir üst), sıklık sırasıyla gelir.

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
