# Wortspiel — Almanca Kelime Uygulaması

Goethe A1–B1 kelime listeleriyle çalışan, oyunlaştırılmış ve **tekrarı kendisi planlayan**
Almanca kelime uygulaması. Next.js + Neon Postgres, Vercel'e tek komutla çıkar.

- **6 kelime oyunu:** Eşleştirme, Doğru Anlam, Artikel Yarışı, Harf Bulmacası, Cümleyi Tamamla, Yazarak Hatırla
- **Adaptif tekrar:** ayrı bir "tekrar et" bölümü yok. Her cevabın hızı ve doğruluğu 0–5 kalite puanına
  çevrilir, kelimenin bir sonraki gösterim zamanı SM-2 türevi bir motorla hesaplanır ve kelime
  oyunun akışına kendiliğinden karışır. Aynı gün içindeki tekrarlar aralığı şişirmez, son 30 dakikada
  sorulan kelime yeniden sıraya girmez.
- **Sıklık sırası:** yeni kelimeler alfabetik değil, Almancadaki kullanım sıklığına göre gelir
  (ich, sie, du, nicht… ile başlar).
- **Telaffuz:** her Almanca kelime ve örnek cümle tek dokunuşla sesli okunur (tarayıcı konuşma sentezi).
- **"Bunu zaten biliyorum":** bildiğin kelimeyi tek dokunuşla pekişmiş işaretleyip atlarsın.
- **Kelimelerim ekranı:** 3.192 kelimede arama, seviye/durum filtresi, çoğul-tür bilgisi, örnek cümle
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
npm run db:seed                 # 3.192 kelimeyi yükle
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

Faydalı adresler: `/` tanıtım · `/learn` oturum · `/words` kelime listesi · `/progress` ilerleme ·
`/profile` ayarlar · `/demo-games` altı oyunun tek sayfada önizlemesi.

## 2. Neon kurulumu (Postgres 18)

1. [console.neon.tech](https://console.neon.tech) → yeni proje (Postgres 18).
2. **Connection string** → *Pooled connection* olanı kopyala, `DATABASE_URL` yap.
3. `npm run db:push` → tablolar oluşur (`drizzle/*.sql` dosyaları da hazır, istersen SQL
   Editor'a sırayla yapıştırabilirsin).
4. `npm run db:seed` → `data/app/words.json` içindeki 3.192 kelime yüklenir.

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
    (app)/learn|words|progress|profile
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
    db/schema.ts            words · profiles · user_words · reviews · daily_stats
  components/
    session-player.tsx      oyun akışını yöneten oynatıcı
    games/*.tsx             altı oyun + ortak çerçeve
data/
  app/words.json            tohumlama kaynağı (3.192 kelime)
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

## 6. E-posta akışları (parola sıfırlama, kayıt onayı)

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

## 7. Kelime verisi

`data/` klasöründeki CSV/JSON dosyaları Goethe-Institut'un resmî Wortliste PDF'lerinden
çıkarılmış, Türkçe karşılıkları eklenmiş ve doğrulanmıştır. Ayrıntı: `data/README.md`.
