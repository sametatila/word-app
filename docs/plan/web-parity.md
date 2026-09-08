# Web paritesi — envanter ve çalışma planı (2026-09-08)

Mobil (Android/iOS, `mobile/`) tasarım, yapı ve ekran kurgusu bakımından olgunlaştı.
Web (`src/`) ise kendi ayrı tasarım dilinde kalmış: **başka bir marka rengi, başka bir
tipografi ölçeği, başka bir kabuk, bazı ekranların hiç olmadığı, bazılarının ise farklı
bir bilgi mimarisiyle kurulduğu** bir yüzey. Bu belge iki şey yapar:

1. Mobilde olup web'de olmayan / farklı olan her şeyin **kanıtlı envanterini** çıkarır.
2. İşi birbirine çarpmayan **şeritlere** böler, her şeridin kabul kriterini yazar.

İlgili belgeler: `docs/plan/ios-parity.md` (aynı yöntemin iOS için uygulanmış hali),
`docs/plan/60-ui-composition.md` (web'in bugünkü kompozisyon kararları),
`docs/plan/immersion.md` (Patika tasarımı), `docs/plan/social.md`.

---

## 0. Yöntem — bu envanter neye bakılarak yazıldı

Tahmin yok; iki taraf da çalışır halde görüldü.

**Mobil kanıtı:** `mobile/ios/build/screenshots/flow-tr-*.png` (5 Eyl 2026, 81 kare,
simülatörde gerçek akış) + `mobile/src/**` kaynak kodu. iOS ve Android aynı RN kodunu
çalıştırdığı için bu kareler Android'in de tasarımıdır.

**Web kanıtı:** yerelde ayağa kaldırılıp gezildi —

```bash
docker run -d --name lernomi-dev-pg -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=lernomi \
  -p 127.0.0.1:5439:5432 postgres:16-alpine
DATABASE_URL=postgres://postgres:dev@127.0.0.1:5439/lernomi npx drizzle-kit migrate
DATABASE_URL=… npm run db:seed && npm run db:seed:skills
DATABASE_URL=… BETTER_AUTH_URL=http://localhost:3456 npx next dev -p 3456
```

Kareler 390×844'te (mobil genişlik) Playwright ile alındı.

**Kurulum sırasında çıkan iki yan bulgu** (parite işi değil, ama kayda geçiyor):

| # | Bulgu | Kanıt |
|---|---|---|
| Y1 | `drizzle/0039_mock_exams.sql` `meta/_journal.json`'a **girmemiş** (39 dosya, 39 kayıt ama son kayıt `0038`). `drizzle-kit migrate` bu migrasyonu hiç uygulamıyor; temiz bir veritabanında `/mock-exams` **500 veriyor** (`relation "mock_exam_attempts" does not exist`). | `drizzle/meta/_journal.json` son giriş `idx: 38`; dev sunucusu logu `digest: '1674636304'` |
| Y2 | `better-auth` tabloları (`user`/`session`/`account`/`verification`) hiçbir migrasyonda yok; yalnız `drizzle-kit push` ile oluşuyor. Temiz kurulumda giriş çalışmıyor. | `grep -l '"user"' drizzle/*.sql` → boş; `src/lib/db/auth-schema.ts` |

---

## 1. Envanter

Yollar depo köküne göre. `M/` = `mobile/`.

### 1.1 Tasarım dili — iki ayrı sistem

Web ve mobil aynı uygulamanın iki yüzü değil, **iki ayrı ürün gibi** görünüyor. Fark
üslup değil, temel değerlerde:

| # | Boyut | Mobil | Web | Kanıt |
|---|---|---|---|---|
| T1 | **Marka rengi** | `#f87612` — logo turuncusu, canlı | `#eda45d`/`#c87318` — kehribar, maskot kürkünden ölçülmüş | `M/src/theme/colors.ts:8`, `src/app/globals.css` `--color-brand-*` |
| T2 | **Dolu buton** | Düz turuncu zemin + **beyaz** yazı, tam genişlik hap | Kehribar **gradyan** + **koyu kahve** (`#2f1911`) yazı | `M/src/screens/SettingsScreen.tsx` "Kaydet"; `globals.css` `.btn-primary` |
| T3 | **Zemin / yüzey** | bg `#fbf7f2`, surface `#ffffff`, surface2 `#f5efe8`, hairline `#f1eae0` | bg `#fbf6ee`, surface `#ffffff`, surface-2 `#f6efe3`, border `#e9decb` | `colors.ts`; `globals.css :root` |
| T4 | **Kart** | `radius 26`, 1px hairline, **yumuşak gölge** (`softShadow`) | `radius 20` (`--radius-xl2`), 1px border, **gölge yok** | `M/src/ui/Card.tsx`; `globals.css .card` |
| T5 | **Tipografi** | `display 32/800`, `h1 26/800`, `h2 20/700`, `h3 16/700`, `body 15/500`, `caption 12.5/600`, `micro 11/700` — tek ölçek, `<Text variant>` | Tailwind sınıfları serbest: `text-2xl font-extrabold`, `text-xl font-bold`, `text-sm`… Ortak ölçek yok | `M/src/theme/tokens.ts`; `src/app/(app)/skills/page.tsx:79` vb. |
| T6 | **Basma geri bildirimi** | `PressableScale` — her dokunulabilir öğe 0.96'ya iner (yay) | Yalnız `.btn:active { scale(.97) }`; kartlar/satırlar tepkisiz | `M/src/ui/PressableScale.tsx`; `globals.css` |
| T7 | **Gölge** | `softShadow(color, elevation)` — renkli, geniş, düşük opaklık; kart/buton/ikon karolarında | Yalnız `.btn-primary`'de tek bir `box-shadow` | `tokens.ts:24`; `globals.css` |
| T8 | **Yarıçap ölçeği** | `sm10 md14 lg20 xl26 xxl34 pill` — adlandırılmış | `rounded-lg/xl/2xl/full` karışık, `--radius-xl2` tek özel değer | `tokens.ts:5`; her sayfada farklı |
| T9 | **İkon karosu** | 38–54 px kare, `radius md`, renk tonu zemin + beyaz ikon, renkli gölge | Kimi yerde var (profil menüsü), kimi yerde yok | `M/src/screens/ProfileScreen.tsx` `Row`; `src/components/profile-menu.tsx` |

**Ölçülen kontrast** (`scripts/palette-check.mjs` ile aynı yöntem):

| Çift | Oran | Eşik | Sonuç |
|---|---|---|---|
| beyaz / `#f87612` (mobil dolu buton) | **2.77** | 4.5 (normal), 3.0 (büyük) | **kalıyor** — mobilde de |
| `#2f1911` / `#eda45d` (web `.btn-primary`) | 7.94 | 4.5 | geçiyor |
| beyaz / `#db5f08` (orange-600) | 3.72 | 4.5 / 3.0 | büyük metinde geçer |
| beyaz / `#b44909` (orange-700) | **5.39** | 4.5 | geçiyor |
| mobil `textMuted` / surface | 4.23 | 4.5 | sınırda kalıyor |
| web `--text-muted` / surface | 5.05 | 4.5 | geçiyor |

> **Karar (T-KARAR-1) — sahibin kararı, 8 Eyl 2026.** Marka rengi web'de de `#f87612`
> ve dolu butonun yazısı **beyaz**: mobil uygulamayla **birebir aynı**. Ölçüm 2.77 ve
> AA eşiğinin (4.5) altında; bu bilinerek seçildi — iki uygulamanın aynı görünmesi,
> bu tek eşleşmedeki kontrast kazancının önüne geçti.
>
> Reddedilen alternatifler, sonradan tartışılabilsin diye ölçülmüş halleriyle:
>
> | Seçenek | Ölçüm | Neden seçilmedi |
> |---|---|---|
> | zemin `#f87612`, yazı `#2f1911` | 5.99 | Mobil açık temada beyaz kullanıyor |
> | zemin `#b44909`, yazı beyaz | 5.39 | Marka rengi gözle görülür biçimde yanıyor |
> | ikisini birden `#b44909`'a çekmek | 5.39 | Mobil uygulamanın da görünümü değişirdi |
>
> **Kararın sınırı:** yalnız marka yüzeyleri. Renk TEK taşıyıcı olduğu yerlerde (CEFR
> rozetleri, der/die/das) KATI eşik geçerli olmayı sürdürüyor — B2 rozeti bu yüzden
> turuncunun 700'üne indi (beyazla 5.39, C1'den ΔE 20.3).
>
> **Ölçüm gizlenmiyor.** `scripts/palette-check.mjs`'e "kabul edilmiş sapma" kategorisi
> eklendi: değer ve eşik aynen yazılıyor, yanına kararın adı geliyor, çıkış kodu
> bozulmuyor. Ölçümü listeden çıkarmak aracı yalancı yapardı; kırmızıya boyamak da
> denetim adımını her koşuda kırar ve insanlar kalan ölçümlere bakmayı bırakırdı.

### 1.2 Kabuk ve gezinme

| # | Öğe | Mobil | Web | Kanıt |
|---|---|---|---|---|
| K1 | **Sekme çubuğu** | Ekranın dibinde **yüzen hap**: yuvarlak (radius 34), gölgeli, kenarlıklı; etkin sekme yumuşak turuncu çip zemininde | Dibe yapışık, düz, **üst kenarlıklı** bant; etkin sekme yalnız renk + 2px üst çizgi | `M/src/navigation/TabBar.tsx`; `src/components/app-shell.tsx` alt `<nav>` |
| K2 | **Üst başlık (sekmeler)** | Sekme başına **büyük başlık**: üstte küçük alt satır (selamlama/açıklama), altında `display 32/800`; sağda seri hapı + gelen kutusu + 44px maskot avatarı | Tüm sekmelerde **aynı** ince uygulama çubuğu: logo + "Lernomi" + iki minik rozet + zil + 32px baş-harf arması | `M/src/ui/AppHeader.tsx`; `app-shell.tsx` `<header>` |
| K3 | **Yığın başlığı** | 44px kare geri düğmesi (`surface2` zeminli) + `h2` başlık; sağda bağlama göre eylem (ör. Profil'de dişli) | `PageBack` bileşeni, ölçüleri ve zemini farklı; her sayfa kendi başlık düzenini kuruyor | `M/src/screens/ProfileScreen.tsx:63`; `src/components/page-back.tsx` |
| K4 | **İçerik sütunu** | `ContentColumn` — dar (okuma) / geniş (ızgara) iki kap; ekran başına seçiliyor. Yatay tablette Patika **iki panele** açılıyor | Tek `max-w-6xl` kabuk + sayfa başına serbest `max-w-*`; iki panel yok | `M/src/ui/ContentColumn.tsx`, `PathScreen.tsx:88`; `app-shell.tsx:250` |
| K5 | **Izgara** | `CardGrid` — geniş ekranda dikey yığını sütunlara böler (en çok 3) | Yok; sayfa başına elle `grid-cols-*` | `M/src/ui/CardGrid.tsx` |
| K6 | **İskelet (skeleton)** | Gerçek düzenin ölçüleriyle iskelet: `Skeleton`, `SkeletonLine(variant)`, `SkeletonCard`, `SkeletonTile`, `textHeight()` — veri gelince hiçbir şey yerinden oynamıyor | `CardSkeleton height=…` — tek bir kutu; çoğu sayfada hiç yok | `M/src/ui/Skeleton.tsx`; `src/components/skeleton.tsx` |

### 1.3 Ekran haritası

Durum sütunu: **yok** = web'de karşılığı hiç yok · **gömülü** = var ama başka bir
sayfanın içine sıkıştırılmış · **farklı** = var ama kurgusu/yerleşimi başka ·
**yakın** = yapı aynı, yalnız tasarım dili farklı.

| Mobil ekran | Web karşılığı | Durum | Not |
|---|---|---|---|
| `LearnScreen` (Öğren sekmesi) | `/learn` = `SessionPlayer` | **farklı** | Mobilde Öğren bir **merkez**: kahraman "günlük tur" kartı + maskot, seviye/ilerleme satırı, Günün Görevleri, arkadaş nabzı, "Öne çıkan" iki kama (Yürüyüş / Sınav hazırlık), "Daha fazlası" üç satır. Web'de `/learn` doğrudan **oyun oynatıcısı**; merkez onun `StartCard` durumunun içine gömülü |
| `GameScreen` (kelime turu) | `/learn` içindeki `playing` durumu | **gömülü** | Mobilde tam ekran ayrı rota |
| `PathScreen` (Patika) | `/immersion` | **yakın** | Öne çıkan ünite kartı + ünite ızgarası ikisinde de var; mobilde ayrıca **sıradaki adım satırı**, ünite öğe şeritleri, yatay tablette **iki panel** |
| `UnitScreen` | — | **yok** | Web'de ünite ayrıntısı için ayrı sayfa yok; hub içinde açılıyor |
| `SkillsScreen` (Beceriler) | `/skills` | **farklı** | Mobilde beceri başına bölüm + egzersiz satırı (nokta + tür + süre + ✓); web'de düz liste, seviye çipleri farklı |
| `ItemScreen` (egzersiz oynatıcı) | `/immersion/skill/[id]` | **yakın** | |
| `LessonScreen` | `/lessons/[id]` | **yakın** | |
| `QuizScreen` | `/immersion/quiz/[unit]` | **yakın** | |
| `ExamScreen` | `/exam/[level]/[module]` | **yakın** | |
| `MockExamsScreen` | `/mock-exams` | **yakın** | Temiz kurulumda 500 (bkz. Y1) |
| `MockExamScreen` | `/mock-exams/[paper]/[skill]` | **yakın** | |
| `MockStatsScreen` | — | **yok** | Deneme sınavı istatistiği (bölüm/seviye/geçmiş kırılımı) web'de hiç yok |
| `WalkModeScreen` | `/learn` içindeki `walk` durumu | **gömülü** | |
| `DailyScreen` (günün turu) | `/learn` içindeki `daily` durumu | **gömülü** | |
| `WeeklyScreen` | `/learn/weekly` | **yakın** | |
| `PracticeScreen` | `/learn/practice` | **yakın** | |
| `ProfileScreen` | `/profile` | **farklı** | Mobil: kimlik kartı (avatar + ad + e-posta + seri/XP hapları) → 2×2 istatistik karosu → premium bandı → 10 satırlık menü → çıkış. Web: kimlik şeridi → seviye kartı → premium → etkinlik → yetkinlik paneli → rozet duvarı → 5 satırlık menü; **çıkış yok**, avatar düzenleme yok |
| `AvatarScreen` | — | **yok** | Mobilde maskot avatarı düzenleniyor (şapka + renk, gözlük, bıyık). Web'de avatar **kimlikten türetilen baş-harf arması** — aynı kullanıcı iki platformda **farklı** görünüyor |
| `SettingsScreen` | `/profile/settings` | **farklı** | bkz. §1.4 |
| `AchievementsScreen` | `/profile` içindeki `AchievementWall` | **gömülü** | Mobilde kendi ekranı |
| `ProgressScreen` | `/profile` içindeki `ActivityProgress` + `ProgressPanel` | **gömülü** | Mobilde seri hapından da açılıyor |
| `LeaderboardScreen` | `/learn` içindeki `Leaderboard` | **gömülü** | Mobilde Profil'den açılan kendi ekranı |
| `WordsScreen` | `/words` | **farklı** | Mobilde satır başına **seslendirme düğmesi**; web'de yok |
| `CandoScreen` | `/profile/cando` | **yakın** | |
| `WritingsScreen` | `/profile/writings` | **yakın** | |
| `FriendsScreen` | `/friends` | **yakın** | |
| `UserScreen` | `/u/[username]` | **yakın** | |
| `InboxScreen` | — | **yok** | Web'de `social/inbox.tsx` bileşeni var ama **rotası yok**; zil doğrudan `/notifications`'a gidiyor |
| `SocialSettingsScreen` | `/profile/settings` içine gömülü | **gömülü** | |
| `NotificationsScreen` | `/notifications` | **yakın** | |
| `PlacementScreen` | `/placement` | **yakın** | |
| `PaywallScreen` | `/premium` | **yakın** | |
| `DeleteAccountScreen` | `/account/delete` | **yakın** | |
| `OnboardingScreen` | `/setup` | **yakın** | ENVANTER DÜZELTMESİ (8 Eyl): web `/setup` tek sayfalık form DEĞİL, zaten dört adımlı bir sihirbazdı (isim+kurs+ses → amaç → seviye → hazır). Eksik olan tek adım günlük hedefti; `1e0…` ile geldi ve akış beş adım oldu. Web'de fazladan bir **amaç** adımı var (İş / Günlük hayat / Sınav / İsviçre), mobilde yok |
| `FirstPracticeScreen` | `/ilk-kelimeler` | **yakın** | İlk 5 kelime, kayıt öncesi. `11bbbe3` ile geldi; kelime listesi mobil `firstWords.ts` ile birebir |
| `NotifPrimeScreen` | `push-optin` bileşeni | **gömülü** | |
| `AuthScreen` | `/login` | **yakın** | |
| — | `/analytics`, `/admin`, `/demo-games`, `/demo-feedback` | web'e özel | Yönetim/geliştirme yüzeyleri, paritesi gerekmiyor |
| — | `/lessons`, `/lessons/boss/…` | **web'e özel / eski** | Patika (`/immersion`) ile aynı içeriğin ikinci bir yüzeyi. Alt gezinmede yok, yalnız oynatıcı sonlarından ve `weak-spots-card`'dan bağlanıyor. Mobilde karşılığı yok |

### 1.4 İşlevsel açıklar

| # | Açık | Mobil | Web | Etki |
|---|---|---|---|---|
| F1 | **Arayüz dili** | tr / en / de, **972 anahtar**, Ayarlar'da seçici, eksik çeviri Türkçeye düşer | **Yok.** Tüm metin Türkçe gömülü, `<html lang="tr">` sabit | Türkçe bilmeyen bir kullanıcı mobilde uygulamayı kullanabiliyor, web'de kullanamıyor. Sunucu tarafı **hazır**: `profiles.native_lang` sütunu var (`drizzle/0038`), `/api/profile` ve `/api/me` okuyup yazıyor — yalnız web arayüzü kullanmıyor |
| F2 | **Avatar** | Maskot tabanı + aksesuar (şapka/renk, gözlük, bıyık), düzenleme ekranı | Kimlikten türetilen renkli baş-harf arması | Aynı kişi iki platformda farklı; mobilde seçilen avatar web'de görünmüyor. (Mobilde de yalnız cihazda saklanıyor — `M/src/lib/avatar.ts`; sunucuya taşınması ayrı bir iş) |
| F3 | **Tema modu** | Sistem / Açık / Koyu (üçlü segment) | Yalnız Açık ↔ Koyu (ikili düğme); "sistemi izle" seçilemiyor, bir kez seçilince geri dönülemiyor | `src/components/theme-toggle.tsx` |
| F4 | **Kelime satırında ses** | Her satırda seslendirme düğmesi | Yok | `M/src/screens/WordsScreen.tsx`; `src/components/word-list.tsx` |
| F5 | **Günün görevleri** | Öğren sekmesinde gömülü kutular (`DailyQuests`) | `QuestCard` var ama `StartCard` içinde | Görev listesi web'de ancak oyun başlangıç kartına inilerek görülüyor |
| F6 | **Öne çıkanlar** | "Yürüyüş modu" + "Sınav hazırlık" kamaları — ürün planındaki iki farklılaştırıcı | `ModeTile`/`WalkCard` başlangıç kartının içinde | |
| F7 | **Deneme sınavı istatistiği** | `MockStatsScreen` | Yok | |
| F8 | **Gelen kutusu** | Ayrı ekran (istek/tepki/dürtme) | Bileşen var, rota yok | |
| F9 | **Çıkış yap** | Profil'in altında, onay diyaloğuyla | Profil'de yok | `src/app/(app)/profile/page.tsx` |
| F10 | **Onay diyaloğu** | `ConfirmDialog` — yıkıcı eylemlerde ortak | Ortak bileşen yok | |
| F11 | **Geri onayı** | `useBackConfirm` — yarım kalan turdan çıkarken sorar | Yok | `M/src/lib/useBackConfirm.ts` |
| F12 | **Haptik** | `lib/haptics.ts` — doğru/yanlış/başarımda titreşim | Yok (Vibration API mevcut) | |

### 1.5 Temizlik adayları

| # | Ne | Neden | Kanıt |
|---|---|---|---|
| X1 | ~~`/lessons` listesi + `lesson-hub.tsx` (783 satır)~~ | **BİTTİ** (`65e019d`): liste Patika'ya yönlendi, hub silindi, yedi bağlantı çevrildi. Ders (`/lessons/[id]`) ve modül sınavı duruyor | |
| X2 | ~~`/demo-games`, `/demo-feedback`~~ | **YANLIŞ ALARM**: belgelenmiş geliştirme/ekran görüntüsü sayfaları (README, `docs/plan/60-ui-composition.md`). Dokunulmadı | |
| X3 | ~~`session-player.tsx` (1690 satır)~~ | **BİTTİ** (`9d2c931`): merkez, üç yan mod ve oynatıcı ayrıldı; dosya 380 satır küçüldü | |
| X4 | ~~`vercel.json`~~ | **YANLIŞ ALARM**: dosya kendi içinde neden durduğunu yazıyor — cron tanımları KAYIT olarak tutuluyor, çalıştıran systemd timer'ları | |
| X5 | ~~Y1/Y2 (bkz. §0)~~ | **BİTTİ** (`6b992d6`): `0039` günlüğe girdi, auth tabloları `0040_auth_tables.sql` ile migrasyona geldi. Boş veritabanı yalnız `drizzle-kit migrate` ile tam kuruluyor | |
| X6 | Öksüz bileşenler | **BİTTİ** (`65e019d`): eski başlangıç kartının beş parçası + `profile-menu` silindi; `knip` `src/` altında öksüz dosya görmüyor | |

---

## 2. Hedef

**Web, mobil uygulamanın aynı ürünü olduğu ilk bakışta anlaşılacak.** Ölçütler:

1. Aynı palet, aynı tipografi ölçeği, aynı yarıçap/gölge/boşluk ölçeği.
2. Aynı bilgi mimarisi: her mobil ekranın web'de **kendi adresi** ve aynı yerleşimi var.
3. Mobilde yapılabilen her şey web'de de yapılabiliyor (§1.4'te tek satır kalmıyor).
4. Web'in kendi kazanımları kaybolmuyor: ölçülmüş kontrast, güvenli alan hesabı,
   `prefers-reduced-motion`, klavye erişimi, sunucu tarafı çizim.
5. Geniş ekran web'in kendi işi: mobil sütun/ızgara kuralları masaüstünde de geçerli,
   üstüne kenar çubuğu.

---

## 3. Şeritler

Sıra bağımlılık sırasıdır. Her adım sonunda `npx tsc --noEmit` + `npm run build` temiz
olmalı, ekran görüntüsüyle kanıtlanmalı, ayrı commit edilmeli (proje kuralı,
`docs/plan/README.md`).

### Şerit T — Tasarım dili (TEMEL, önce bu)

Diğer her şerit bunun üstüne kuruluyor.

1. ~~`src/app/globals.css` paletini mobil `colors.ts` ile hizala: `--color-brand-*` turuncu
   rampasına (`orange 50…900`) geç, `bg/surface/surface-2/border/hairline` değerlerini
   mobilinkilerle eşitle, koyu tema aynı şekilde.~~ **BİTTİ** (`7bc52e0`)
2. ~~Tipografi ölçeğini token'a bağla~~ **BİTTİ** (`9ef1947`). Eski hali: (`display/h1/h2/h3/body/bodyStrong/caption/micro`) —
   Tailwind `@theme` üzerinden sınıf olarak; sayfalar serbest `text-*` yazmayı bıraksın.
3. ~~Yarıçap + boşluk + `softShadow` karşılıklarını CSS değişkeni yap.~~ **BİTTİ** (`9ef1947`) — boşluğa token gerekmedi, mobilin ölçeği Tailwind tabanına birebir oturuyor.
4. ~~`.card`, `.chip`, `.option` bileşen sınıflarını yeni ölçülere taşı.~~ **BİTTİ**
   (`7bc52e0` renk, `9ef1947` ölçü).
5. ~~`PressableScale` karşılığı: `.pressable` yardımcı sınıfı.~~ **BİTTİ** (`9ef1947`).
6. **Mobil düzeltmesi:** `M/src/theme/colors.ts` — `textMuted` beyaz kart üstünde 4.23
   veriyor (eşik 4.5); web'in `#7c6c5d`'sine çekilecek. İki ton yan yana ayırt
   edilemiyor, yani görsel paritede kayıp yok. (Buton rengi T-KARAR-1 ile olduğu gibi
   kalıyor — orada iki taraf zaten aynı.)
7. ~~`scripts/palette-check.mjs`'i yeni palette koştur.~~ **BİTTİ** — kabul edilmiş sapma
   dışında tüm ölçümler geçiyor; araç ayrıca yorumları ayrıştırmadan önce siliyor.

**Kabul:** paletin her rengi ölçülüp geçti; `/learn`, `/immersion`, `/skills` kareleri
mobil karelerinin yanında aynı ürün gibi duruyor.

### Şerit K — Kabuk ve gezinme (T'ye bağlı)

1. ~~`AppHeader` web karşılığı.~~ **BİTTİ** (`fb1ecf9`) — kabuktaki ortak üst çubuk
   kalktı, başlığı her sekme kendi çiziyor. Avatar hâlâ baş-harf arması; maskota
   dönüşü Şerit R'de.
2. ~~Alt gezinme: yüzen hap.~~ **BİTTİ** (`fb1ecf9`) — ayrıca çubuk artık YALNIZ üç
   sekmede çiziliyor, mobildeki gibi. Güvenli alan hesabı korundu.
3. ~~Yığın başlığı.~~ **BİTTİ** (`beedf5d`) — 44px kare düğme + `h2` + `HeaderAction`.
4. ~~`ContentColumn` / `CardGrid`.~~ **BİTTİ** (`9b88cb0`). Sayfaların kendi
   `max-w-*`larından buraya taşınması ilgili şeritlerde yapılıyor.
5. ~~`Skeleton` ailesi.~~ **BİTTİ** (`9b88cb0`) — ölçüler tipografi ölçeğinden türüyor.

**Kabul:** üç sekme + üç yığın sayfası mobil kareleriyle bire bir hizalı; 320 px'de taşma yok.

### Şerit L — Öğren sekmesi (K'ya bağlı)

1. `/learn` **merkez** olur: kahraman günlük tur kartı (maskot + rozetler + hedef şeridi),
   seviye/ilerleme satırı, `DailyQuests`, `FriendPulse`, "Öne çıkan" kamaları,
   "Daha fazlası" satırları.
2. Oyun `/learn/game`'e taşınır (tam ekran), yürüyüş `/learn/walk`, günün turu
   `/learn/daily`, meydan okuma `/learn/challenge`.
3. `session-player.tsx` bölünür: merkez / oynatıcı / mod ekranları ayrı dosyalar.
4. Eski `/learn?game=…` adresleri yeni rotalara yönlenir.

**Kabul:** mobil Öğren karesiyle aynı bölüm sırası ve aynı kartlar; oyun akışı bozulmadı
(`npm run test:playtest`, `test:walk`).

### Şerit P — Patika (K'ya bağlı)

1. Öne çıkan ünite kartı: numara/onay dairesi, öğe şeridi, **sıradaki adım satırı**,
   tam genişlik devam düğmesi.
2. Ünite ızgarası: halka + tema + durum; kilitli/biten/şimdiki ayrımı mobildeki gibi.
3. Ünite ayrıntısı `/immersion/unit/[index]`; geniş ekranda **iki panel**.

### Şerit B — Beceriler (K'ya bağlı)

1. Seviye çipleri mobildeki gibi (eşit genişlikte 5 sekme).
2. Beceri başına bölüm: ikon + ad + sayı; kart içinde egzersiz satırları (nokta, tür·süre,
   ✓/›). Geniş ekranda `CardGrid`.

### Şerit R — Profil, Ayarlar ve "ben" ekranları (K'ya bağlı)

1. `/profile`: kimlik kartı + 2×2 istatistik karosu + premium bandı + 10 satırlık menü +
   çıkış (onay diyaloğuyla).
2. Ayrı adresler: `/profile/achievements`, `/profile/progress`, `/leaderboard`, `/inbox`,
   `/profile/avatar`, `/mock-exams/stats`.
3. `/profile/settings`: mobildeki bölüm düzeni (HESAP / ÖĞRENİLECEK DİL / SEVİYE /
   OKUMA SESİ / UYGULAMA DİLİ / GÖRÜNÜM / GİZLİLİK) + üçlü tema segmenti.
4. Avatar düzenleyici + maskot avatarının web bileşeni (`avatarParts` SVG'lerinin web
   karşılığı); armanın yerini alır.
5. `ConfirmDialog` web karşılığı.

### Şerit S — Sosyal (K'ya bağlı)

Arkadaşlar / kullanıcı / gelen kutusu / sosyal ayarlar ekranlarını yeni dile taşı;
`/inbox` rotasını aç, zil oraya baksın.

### Şerit O — Onboarding ve giriş (T'ye bağlı, K'dan bağımsız)

1. ~~`/setup` çok adımlı sihirbaza dönüşür.~~ Zaten öyleymiş (envanter yanlıştı).
   Eksik olan **günlük hedef adımı** eklendi — akış beş adım.
2. ~~İlk kelimeler turu (`FirstPractice`).~~ **BİTTİ** (`11bbbe3`).
   İlk değerlendirme yanlıştı: anonim OTURUM gerekmiyordu. Mobilin ısınması
   statik bir kelime listesi oynatıyor — sunucu yok, ilerleme kaydı yok,
   hesaba devredilecek kuyruk yok. Gereken tek şey akış sırasının değişmesiydi:
   `/setup` oturumdan çıkarıldı, kararlar cihazda saklanıyor ve giriş sonrası
   profile taşınıyor.
3. `/login` mobil `AuthScreen` yerleşimine.
4. **Etiket–değer uyumsuzluğu (iki tarafta birden):** günlük hedef seçenekleri
   "5/10/20 dk" diyor ama yazılan değer `dailyGoal` = tekrar sayısı. Tek
   tarafta düzeltmek iki uygulamayı ayırır.

### Şerit I — Arayüz dili (T'den bağımsız, en büyük tek kalem)

1. `src/lib/i18n` — mobil `M/src/lib/i18n.ts` ile **aynı anahtar kümesi**; sunucu
   bileşenleri için de çalışan bir `t()`.
2. `M/src/i18n/{tr,en,de}.ts` sözlükleri paylaşılan bir pakete taşınır ya da web'e
   kopyalanıp tek kaynaktan üretilir (mobil kaynak, web türetilmiş).
3. Web'deki gömülü Türkçe metinler anahtara çevrilir (kabaca 120+ dosya).
4. Dil seçimi `profiles.native_lang`'dan okunur, Ayarlar'dan yazılır; `<html lang>` ona bağlanır.

### Şerit X — Temizlik

1. `/lessons` yüzeyinin geleceğine karar (Patika'ya yönlendir ya da koru) — X1.
2. `/demo-*` sayfalarını üretimden kaldır — X2.
3. Y1 (0039 journal) ve Y2 (auth tabloları migrasyonu) düzelt.
4. `knip` + `eslint` temiz.

---

## 4. Durum

| Şerit | Durum | Not |
|---|---|---|
| T — Tasarım dili | **bitti** | `7bc52e0` palet · `9ef1947` tipografi/yarıçap/gölge + kart + `.pressable`. Kalan tek kalem mobil `textMuted` (adım 6) |
| K — Kabuk | **bitti** | `fb1ecf9` sekme başlığı + yüzen çubuk + ikonlar · `beedf5d` yığın başlığı · `9b88cb0` kap/ızgara/iskelet |
| L — Öğren | **bitti** | `9d2c931` — merkez + `/learn/game` + üç yan mod kendi adresinde |
| P — Patika | **bitti** | `f9b89d2` — mobil yerleşim, emoji yerine ikon, `/immersion/unit/[index]`, geniş ekranda iki panel |
| B — Beceriler | **bitti** | `14d2cf0` — beş eşit seviye sekmesi, beceri renkleri, `CardGrid` |
| R — Profil/Ayarlar | **bitti** | `815728d` maskot avatarı + düzenleyici · `dd57b9e` profil + 4 yeni adres + onay diyaloğu · `c33face` üçlü tema · `62c8a51` ayar bölümleri · `86bdc4b` deneme istatistiği |
| S — Sosyal | **bitti** | `97bef74` — kimlik kartı + davet bandı + dolgusuz çipler |
| O — Onboarding | **bitti** | `b9b68ba` günlük hedef adımı · `11bbbe3` akış mobil sıraya: misafir onboarding + `/ilk-kelimeler` + kararların hesaba taşınması |
| I — Arayüz dili | **sürüyor** | `b4a5bf2` altyapı · `b2eb5a8` kabuk+sekmeler · `bda8770` profil/ünite · `189cf21` görevler (sunucu) · `6b332b7` başarımlar (sunucu) · `fc2ff10` yetkinlik/gelişim. Kalan: ekranların geri kalanı + can-do (128) ve dilbilgisi açıklamaları (42) |
| X — Temizlik | **bitti** | `6b992d6` migrasyon açıkları · `65e019d` ders ikiliği + öksüz bileşenler. İki madde yanlış alarmdı (vercel.json, demo sayfaları) |
