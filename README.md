# Lernomi

Türkçe (ve İngilizce, Almanca) konuşanlar için dil öğrenme uygulaması: **Almanca** ve
**İngilizce** kursları, A1'den C1'e. Web (https://www.lernomi.app) ile Android ve iOS
uygulamaları aynı sunucuyu ve aynı hesabı kullanıyor.

- **Öğren:** günlük kelime turu (aralıklı tekrar), pratik, haftalık quiz, deneme sınavları,
  yürüyüş modu (sesli; ekran kapalıyken Premium).
- **Patika:** ünite ünite Okuma, Dinleme, Konuşma (Türkçe anlatım + yapay zekâ sohbeti),
  Yazma, Dil bilgisi, Quiz adımları; modül ve seviye sınavları.
- **Beceriler:** seviyesi serbest seçilen beş beceri kütüphanesi.
- **Sosyal:** arkadaşlar, ortak seri, haftalık lig.
- **Premium:** aylık/yıllık abonelik (App Store, Google Play; RevenueCat üzerinden). Ücretsiz
  ve Premium sınırları `docs/premium/README.md` §2.
- Hesapsız (misafir) başlanabiliyor; ilerleme sonra hesaba taşınıyor.

Ürünün adlandırması (Patika, Konuşma adımı, Kendini puanla, Ünite quizi…) ve kodda karşılıkları
`docs/premium/README.md` §2 ve §2.2'de.

## Yığın

| Parça | Ne |
|---|---|
| Web + API | Next.js 16 (App Router), React 19, Tailwind 4 — `src/` |
| Veritabanı | PostgreSQL 17, Drizzle ORM (`src/lib/db/schema.ts`, göçler `drizzle/`) |
| Kimlik | better-auth, kendi sunucumuzda (e-posta, Google, Apple) |
| Mobil | React Native (bare), `mobile/` — ayrıntı `mobile/README.md` |
| İçerik | `data/**` ve `src/lib/**/content` (git'te); uygulamaya içerik hattıyla (`npm run content:publish`) |
| Yapay zekâ | Sohbet ve değerlendirme: OpenAI uyumlu sağlayıcı zinciri (`src/lib/chat-providers.ts`); ses tanıma `src/lib/stt.ts`; seslendirme `src/lib/tts/` |
| Barındırma | Netcup VPS, blue-green deploy, nginx. Sunucu işletimi yerel `AGENTS.md`'de (depoda değil) |

## Yerelde çalıştırma

```bash
npm install
cp .env.example .env        # en az DATABASE_URL ve BETTER_AUTH_SECRET
npm run db:push             # şemayı yerel Postgres'e uygula
npm run db:seed             # Almanca kelime havuzu (data/app/words.json)
npm run db:seed:en          # İngilizce kelime havuzu
npm run db:seed:skills      # beceri alıştırmaları
npm run dev                 # http://localhost:3000
```

`.env.example` her anahtarı açıklamasıyla taşıyor; yerel `.env` ve sunucu `.env` aynı anahtar
kümesini aynı sırayla tutar. Yapay zekâ anahtarı olmadan uygulama açılır, yalnız o özellikler
kapalı görünür (`npm run report:providers` hangi sağlayıcının cevapladığını gösterir). `SMTP_*`
boşken e-posta doğrulaması zorunlu tutulmaz. Anahtarlar koda ve depoya yazılmaz.

Başlıca adresler (`src/app`): `/` tanıtım · `/setup` ilk kurs ve seviye seçimi · `/first-words`,
`/level-test` hesap öncesi ısınma ve seviye testi · `/learn` Öğren · `/immersion` Patika ·
`/skills` Beceriler · `/friends` · `/mock-exams` · `/conversations/<id>` Konuşma adımı ·
`/exam/<sv>` sınavlar · `/words` · `/profile` · `/premium` · `/admin` yönetim paneli ·
`/privacy`, `/terms`, `/support`, `/impressum`, `/licenses`.

## Test ve kapılar

CI (`.github/workflows/checks.yml`) main'e push ve PR'da koşuyor (yalnız belge değişen push'ta değil); aynı sırayla yerelde:

```bash
npm run ci:local                # web işi (ağır adımlar hariç)
npm run ci:local -- mobile      # mobil işi
npm run ci:local -- --all       # next build ve veritabanı testleri dahil
```

Tek tek sık kullanılanlar:

| Grup | Komutlar |
|---|---|
| Tip, lint, yapı | `npm run lint`, `npm run typecheck:scripts`, `npm run build` |
| Veritabanı ister | `test:e2e` (önce `test:seed`), `test:entitlement`, `test:quota`, `test:content-db`, `test:legal-db` — `TEST_DATABASE_URL` yerel olmalı |
| Veritabanısız | `test:premium`, `test:legal`, `test:apple`, `test:league`, `test:mock-exams`, `test:content` |
| İçerik kapıları | `check:conversations*`, `check:skills-*`, `check:mock-*`, `check:quiz-*`, `check:published-examples`, `check:age-rating`, `check:tts` |
| Web ↔ mobil | `check:parity`, `i18n:check` |
| Şema | `db:check` (şema ↔ veritabanı) |

Yerel test veritabanı için örnek (CI `postgres:17` kullanıyor):

```bash
docker run -d --name lernomi-pgtest -p 55432:5432 \
  -e POSTGRES_PASSWORD=test -e POSTGRES_DB=lernomi postgres:17-alpine
export TEST_DATABASE_URL=postgres://postgres:test@127.0.0.1:55432/lernomi
export DATABASE_URL=$TEST_DATABASE_URL
npx tsx scripts/migrate-all.ts
```

## Deploy

`git push origin main` → GitHub webhook → sunucuda `deploy.sh`: boştaki renk derlenir, sağlık
kontrolünden geçer, nginx o renge döner; geçmezse canlıya dokunulmaz. Zamanlanmış işler systemd
timer'larıyla. Ayrıntılar (sunucu, yedek, cron, izleme) yerel `AGENTS.md`'de.

## Belgeler

| Nerede | Ne |
|---|---|
| `docs/store/README.md` | Vitrin metinleri (iki mağaza, üç dil) ve ekran görüntüsü üretimi |
| `docs/store/audit.md` | Mağaza ve hukuk denetimlerinin tek kaydı, açık işler |
| `docs/appstore/` | iOS: durum, gizlilik etiketleri (`README.md`), inceleme hesabı ve notu (`connect.md`), yaş derecelendirmesi (`listing.md`) |
| `docs/play/` | Android: uygulama erişimi, OAuth, ön plan servisi (`console.md`), Veri güvenliği (`data-safety.md`), hedef kitle, IARC, marka, yayıncı (`listing.md`) |
| `docs/premium/README.md` | Premium mimarisi, ücretsiz/Premium kararları, mağaza ve RevenueCat kurulumu |
| `docs/plan/` | Ürün ve teknik planlar: öğrenme sistemi (`ogrenme-sistemi.md`), Patika ve beceri kütüphanesi, anadil katmanı, sosyal, ses (TTS/STT, telaffuz, yürüyüş), iOS/web paritesi ve cihaz runbook'u, cihaz doğrulaması, KPI |
| `mobile/README.md` | Mobil kurulum, sürüm, imza ve yayın |
| `AGENTS.md` (yerel) | Sunucu işletimi, deploy, env kuralları, tarihli işler |
