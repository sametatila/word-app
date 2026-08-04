# Wortspiel — Almanca Kelime Uygulaması

Goethe A1–B1 kelime listeleriyle çalışan, oyunlaştırılmış ve **tekrarı kendisi planlayan**
Almanca kelime uygulaması. Next.js + Neon Postgres, Vercel'e tek komutla çıkar.

- **6 kelime oyunu:** Eşleştirme, Doğru Anlam, Artikel Yarışı, Harf Bulmacası, Cümleyi Tamamla, Yazarak Hatırla
- **Adaptif tekrar:** ayrı bir "tekrar et" bölümü yok. Her cevabın hızı ve doğruluğu 0–5 kalite puanına
  çevrilir, kelimenin bir sonraki gösterim zamanı SM-2 türevi bir motorla hesaplanır ve kelime
  oyunun akışına kendiliğinden karışır.
- **Takip:** günlük seri (streak), günlük hedef, XP, CEFR seviyesine göre ilerleme, 8 haftalık aktivite
  ısı haritası, oyun bazında doğruluk.
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

`.env` içeriği en az şu olmalı:

```bash
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.<region>.aws.neon.tech/neondb?sslmode=require"
```

Neon Auth anahtarları boş bırakılırsa uygulama **demo modunda** tek kullanıcıyla çalışır —
veritabanı bağlıysa tüm oyunlar, ilerleme ve streak çalışır. Anahtarlar eklenince giriş/kayıt
kendiliğinden devreye girer.

Faydalı adresler: `/` tanıtım · `/learn` oturum · `/progress` ilerleme · `/profile` ayarlar ·
`/demo-games` altı oyunun tek sayfada önizlemesi.

## 2. Neon kurulumu (Postgres 18)

1. [console.neon.tech](https://console.neon.tech) → yeni proje (Postgres 18).
2. **Connection string** → *Pooled connection* olanı kopyala, `DATABASE_URL` yap.
3. `npm run db:push` → tablolar oluşur (`drizzle/0000_*.sql` dosyası da hazır, istersen SQL
   Editor'a yapıştırabilirsin).
4. `npm run db:seed` → `data/app/words.json` içindeki 3.192 kelime yüklenir.
5. **Auth** sekmesinden Neon Auth'u aç, üç anahtarı `.env` ve Vercel'e ekle.

## 3. Vercel'e deploy

```bash
npm i -g vercel
vercel link
vercel env add DATABASE_URL production                     # ve preview/development
vercel env add NEXT_PUBLIC_STACK_PROJECT_ID production
vercel env add NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY production
vercel env add STACK_SECRET_SERVER_KEY production
vercel --prod
```

Neon Auth kullanıyorsan Neon Console → Auth → **Domains** kısmına Vercel alan adını ekle.

## 4. Testler

```bash
npm run test:sql          # üretilen tüm SQL cümlelerini yazdırır (veritabanı gerekmez)

# uçtan uca mantık testi — yerel PostgreSQL 18 ister
docker run -d --name wa-pg -e POSTGRES_PASSWORD=test -e POSTGRES_DB=wa \
  -p 55432:5432 postgres:18-alpine
docker cp drizzle/0000_wooden_patriot.sql wa-pg:/tmp/m.sql
docker exec wa-pg psql -U postgres -d wa -f /tmp/m.sql
TEST_DATABASE_URL="postgres://postgres:test@localhost:55432/wa" npm run test:e2e
```

E2E testi oturum kurgusunu, SRS zamanlamasını, yanlış cevap davranışını, streak mantığını ve
ilerleme sorgularını gerçek PostgreSQL üzerinde doğrular.

## 5. Mimari

```
src/
  app/
    page.tsx                tanıtım sayfası
    (app)/learn|progress|profile
    api/session             oturum kuyruğunu üretir
    api/answers             cevapları işler (SRS + streak + istatistik)
    api/profile             ayar güncelleme
    handler/[...stack]      Neon Auth ekranları
  lib/
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
| 6 lapse | Kelime "leech" işaretlenir |

Oyun türü kelimenin durumuna göre seçilir: yeni/öğrenilen kelimelerde tanıma ağırlıklı
(çoktan seçmeli, eşleştirme, artikel), pekişenlerde üretim ağırlıklı (yazma, cümle tamamlama,
harf bulmacası). Aynı oyun arka arkaya gelmez.

## 6. Kelime verisi

`data/` klasöründeki CSV/JSON dosyaları Goethe-Institut'un resmî Wortliste PDF'lerinden
çıkarılmış, Türkçe karşılıkları eklenmiş ve doğrulanmıştır. Ayrıntı: `data/README.md`.
