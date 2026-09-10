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
| `FirstPracticeScreen` | `/first-words` | **yakın** | İlk 5 kelime, kayıt öncesi. `11bbbe3` ile geldi; kelime listesi mobil `firstWords.ts` ile birebir |
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
| O — Onboarding | **bitti** | `b9b68ba` günlük hedef adımı · `11bbbe3` akış mobil sıraya: misafir onboarding + `/first-words` + kararların hesaba taşınması |
| I — Arayüz dili | **bitti** | Altyapıdan (`b4a5bf2`) son taramaya kadar 14 commit. Arayüzün tamamı üç dilde; kalan yalnızca İÇERİK (aşağıda, §6) |
| X — Temizlik | **bitti** | `6b992d6` migrasyon açıkları · `65e019d` ders ikiliği + öksüz bileşenler. İki madde yanlış alarmdı (vercel.json, demo sayfaları) |

---

## 5. Tur katmanı (oyunlar) — 9 Eyl

Şerit I'in en derin parçası: `src/components/games/*` (12 oyun + kabuk),
`session-player`, `level-badge`, fark vurgusu ve cümle hakemi. 42 yeni anahtar
(`rounds.*`, `words.*`, `match.*`, `diff.*`) + mobilin `games.*` / `common.*` /
`rounds.*` kalemlerinin yeniden kullanımı.

**Mobilden alınanlar.** Oyun adları, "Doğrusu:", "İpucu", "Sil", "Kontrol et",
"Devam", "Doğru/Yanlış" mobil sözlükten geliyor — web ayrı bir metin yazmıyor.
Web'de karşılığı olmayanlar (`rounds.letter_hint`, `rounds.build_sentence`,
`rounds.ai_accepted` gibi) `src/i18n/web/` içinde.

**Üç yapısal düzeltme, çeviri sırasında çıktı:**

| # | Bulgu | Neden önemli |
|---|---|---|
| G1 | `load()` geç dönen cevabı **oynanan turun üstüne** yazıyordu: durum "oynanıyor"dan "hazır"a düşüyor, ekran yükleme kartında donuyordu. Geliştirme modunda React etkiyi iki kez çalıştırdığı için **her açılışta** oluşuyordu. | Tur hiç başlamıyordu. `setStatus` artık başlamış turu geri çekmiyor. |
| G2 | Özet kartındaki "Devam" yeni turu yüklüyor ama `autoStarted` kapısı bir daha açılmadığı için **kimse başlatmıyordu**. | Kapı her `load()`'da sıfırlanıyor. |
| G3 | Önbellekten çizilen kuyruk `resume()` ile **doğrulanmadan oynanıyordu** — cevaplanmış kelimeler yeniden sorulabilirdi. `startFresh` bunu zaten bekliyordu, `resume` beklemiyordu. | İki yol da artık taze cevabı bekliyor. |

**Sayı biçimi.** `toLocaleString("tr-TR")` her yerde gömülüydü: İngilizce
arayüzde bile Türkçe binlik ayracı çıkıyordu. `formatNumber(n, lang)` ve
`formatPercent(n, lang)` eklendi (yüzde işaretinin YERİ dile göre değişiyor:
`%45` / `45%` / `45 %`, mobilin `item.score_pct` kalıbıyla aynı). Tur ekranı
düzeltildi; kalan ~18 çağrı yeri sırada.

**Açık kalan parite maddesi (G4).** Mobilde cevaptan sonra **"Devam" düğmesi**
var (`FeedbackFooter`, tek elle erişim için ekranın dibinde); web'de şerit
kendiliğinden ilerliyor ve arada Erdi şeridi sürükleyerek getiriyor. İkisi
bilinçli tasarlanmış ve mobil kodu web'i kaynak gösteriyor
(`M/src/game/rounds.tsx`: "web VerdictBar'ın taşıdığı bilgi"). Karar
gerekiyor — bu belge kapanmadan.

---

## 6. Şerit I kapanışı — ne bitti, ne bilerek kaldı

**Bitti.** Kabuk, sekmeler, on iki oyun ve tur katmanı, dört yan mod, sınav ve
deneme sınavı, ders oynatıcısı ve konuşma sınavı, beş beceri oynatıcısı,
sosyal katmanın tamamı, giriş/kayıt/parola akışı, karşılama sayfası,
onboarding, kurulum rehberi, ayarlar, profil, ilerleme, başarımlar, avatar,
yerleştirme testi, hata sayfası ve 404. Sözlük: `src/i18n/base/*` mobilden
üretiliyor (1079 anahtar), `src/i18n/web/*` web'e özgü (1090).

`npm run i18n:check` üç dilin anahtar kümesini ve YER TUTUCULARINI denetliyor.
Eksik anahtar sessizce Türkçeye düşüyor — yani fark edilmeyen bir hata; betik
onu görünür kılıyor.

**Çeviri sırasında çıkan İŞLEVSEL hatalar** (hepsi çeviriden önce de vardı):

| # | Hata | Sonuç |
|---|---|---|
| G1 | Geç dönen oturum cevabı oynanan turun üstüne yazıyordu | Tur hiç başlamıyordu |
| G2 | Özet kartındaki "Devam" yeni turu yüklüyor ama kimse başlatmıyordu | Yükleme kartında donuyordu |
| G3 | `resume()` ilerlemeyi eskimiş kapanıştan okuyordu | İkinci ziyaretten sonra her açılış donuyordu |
| G5 | Onay/doğru-yanlış adımları tanıyıcıyı `tr-TR` kipinde açıyordu | İngilizce "true" diyen kullanıcı adımı geçemiyordu |
| G6 | `parseConfirm` yalnız Türkçe sözcüklere bakıyordu | Yürüyüşteki "devam edelim mi?" cevabı hiç anlaşılmıyordu |
| G7 | Anlatım sesi doğrudan `TURKISH_VOICE`a bağlıydı | Anadili Türkçe olmayan kullanıcı açıklamaları Türkçe sesle duyuyordu |
| G8 | Üç yerde ileti TONU metin içinde Türkçe sözcük aranarak seçiliyordu | Çeviriyle birlikte her başarı iletisi kırmızıya dönerdi |
| G9 | "Kalıp tuttu mu" kararı `label.startsWith("Kalıp")` ile veriliyordu | Çeviri mantığı sessizce bozardı |

**Bilerek Türkçe kalanlar (karar gerektirenler Samet'e):**

1. **Ders ve sınav içeriği** (~89 bin satır): konuşma senaryoları, deneme
   sınavı kâğıtları, beceri kütüphanesi. Mobilde de Türkçe; ayrı bir içerik
   projesi.
2. **Can-do ifadeleri** (`lib/cando.ts`, 128) — aynı sınıf.
3. **Karıştırma çiftleri** (`lib/confusables.ts`, 148 çift): hem çiftlerin
   SEÇİMİ hem ayrım cümleleri Türkçe konuşana göre ("bekommen ≠ become" bir
   İngilizce yalancı eşi). Başka dilde çevrilmemiş cümle göstermektense genel
   açıklamaya düşülüyor; çiftlerin yeniden seçilmesi içerik kararı.
4. **Kelime karşılıkları**: `words` tablosunda `tr` ve `en` var, Almanca yok.
   Almanca arayüzde anlam Türkçe kalıyor — mobil de öyle. Yeni bir sütun ve
   içerik gerekir.
5. `/analytics` (iç ölçüm sayfası), `admin/*`, `console.error` günlükleri ve
   modele giden İSTEMLER. İstemin talimatı Türkçe; modelden CEVABI kullanıcının
   dilinde vermesi isteniyor.

**Mobil tarafına düşen küçük işler** (web'de düzeltmek iki tarafı ayırırdı):

- `skills.skills` Almanca sözlükte "Skills" diyor, "Fertigkeiten" değil.
- Mobil `formatDuration` "dk"/"s" sabit yazıyor.
- Mobil hero rozetleri "{n} tekrar" / "{n} yeni" sabit.

---

## 7. İkinci tur — şeritlerin mobil kaynağıyla yeniden doğrulanması (9 Eyl)

Şeritler "bitti" işaretliydi ama kabul ölçütü ("mobil karesiyle aynı bölüm
sırası ve aynı kartlar") ekran ekran doğrulanmamıştı. Mobil kaynağı ile web
DOM'u karşılaştırıldı; on bir fark çıktı ve düzeltildi.

| Ekran | Fark | Commit |
|---|---|---|
| Öğren | Mobilde olmayan "bugünkü plan" satırı ve sekmenin altındaki sıralama tablosu; seri rozeti profile gidiyordu | `e558b37e` |
| Profil | Menüde fazladan "Gelişim", eksik "Arkadaşını davet et", sıralamanın rengi; davet metni sabit Türkçe ve davet kodsuz | `d1d83236` |
| Beceriler | Mükerrer "Deneme Sınavları" kartı; seviye etiketi ile sayaç ayrı satırlarda | `167d91b3` |
| Ayarlar | Giriş yöntemleri en dipte, okuma sesi hedeften önce, dil+görünüm tek etiketsiz kartta, mükerrer OTURUM bölümü | `be05b52b` |
| Sıralama · nabız · paylaşım | Sabit Türkçe cümleler ve sekiz yerde `tr-TR` sabitli sayı biçimi | `d769eac5` |
| Arkadaşlar | Sosyal ayarlar uygulama ayarlarının içinde ve `#social` çapasıyla; ayarlar düğmesi kartın içinde; iki rozet hiç çizilmiyor | `c2e39958` |
| İlerleme | Seri kahramanı, kelime ustalığı şeridi ve başarımlar satırı yok; karolar mobildekiler değil; yetkinlik bandı ham ("40developing") | `c188eb5f` |
| Bildirimler | `/notifications` `/inbox` ile birebir aynı şeyi çiziyordu; hatırlatma anahtarları uygulama ayarlarındaydı | `89a8c566` |
| Push metinleri | Akşam giden bildirimlerin metni sabit Türkçeydi; adsız kullanıcıda cümle küçük harfle başlıyordu | `6b253282` |
| Hatırlatma kategorileri | Mobildeki üç anahtarın ikisi web'de hiç yoktu, günlük kanalın saati arayüzde görünmüyordu | `2e8e2577` |
| Rozet duvarı | Sekmeliydi — yedi grup birer çip, aynı anda tek grup; mobil hepsini alt alta diziyor. Ayrıntı paneli kartın içine indi, kademe adları sabit Türkçeydi | `21fcdd7a` |
| Deneme sınavları | Mobilin seviye/kapsam kartı yoktu; giriş paragrafı çiplerin üstündeydi | `f470d9d0` |
| İçerik bildirme | `POST /api/reports` aylardır vardı, **hiçbir arayüz onu çağırmıyordu** — mobilde üç yerde var | `5dbfe4b6` |
| Sabit Türkçe (11 yer) | Kelime listesi tekrar cümleleri, modül sınavı yönergesi, ses/gizlilik etiketleri, kilit ekranı albüm adı | `0c001fb6` |
| Sekme başlıkları | 27 sayfa sabit Türkçe `metadata.title` taşıyordu; Kelimeler'in hiç başlığı yoktu | `9d8b844c` |
| Sabit Türkçe (3 parti) | Tarayıcının kör noktası düzeltilince 60 kalem daha çıktı: tur özeti, iki push metni, ilerleme, beceri oynatıcıları, **sertifika**, yerleştirme testi | `b2cc4b58` `2127d535` `46f4eeb7` |

Sözlük denetimine üçüncü kural eklendi: **kodda çağrılan her anahtar sözlükte
var mı**. `translate` bulamadığı anahtarın kendisini döndürüyor, yani ekrana
`socialw.friends_load_failed` yazıyor — hata değil, sessiz arıza. İlk koşuda
yedi tane buldu.

### Hatırlatma kategorileri — kapandı (`2e8e2577`)

Mobildeki üç hatırlatma CİHAZDA kuruluyor; web'de bildirim sunucudan gidiyor,
o yüzden karşılığı bir arka uç işiydi. Yapılanlar:

1. `0042_reminder_kinds` — `streak_alert` ve `weekly_reminder` (eklemeli,
   varsayılan açık: bugün hiç gönderilmeyen kanallar, yani kimsenin sustuğu
   bir kanal açılmıyor). Günlük kanalın kendisi ve saati zaten şemadaydı
   (`reminders_enabled`, `reminder_hour`) ama arayüzde görünmüyordu.
2. `/api/notifications/prefs` — tercih sunucuda durur, iki tarayıcıda aynı
   görünür. Saat 0–23 dışında kabul edilmiyor; sorgu onu doğrudan
   karşılaştırmada kullanıyor.
3. `runStreakAlerts` / `runWeeklyReminders` + iki cron ucu. İkisi de günlük
   bütçeyi paylaşıyor (`last_reminder_day`): ayrı sayaç, öğlen hatırlatma alan
   birine akşam ikinci bir bildirim demekti.
4. `/notifications` mobildeki üç anahtarı ve beş saat çipini gösteriyor —
   yalnız push izni varken, çünkü izinsiz bir anahtar dokunulunca hiçbir şey
   yapmaz.

**Kalan tek adım deploy sonrasına ait:** `lernomi-cron-streak` ve
`lernomi-cron-weekly` timer'ları sunucuda kurulacak (AGENTS.md'de yazılı).
Bugün kurulsalardı uçlar henüz canlıda olmadığı için 404 dönerdi.


---

## 8. Regresyon ağı geri kuruldu (9 Eyl)

`npm run test:e2e` **9. testte çöküyordu** ve bu bir süredir böyleydi:
`scripts/` klasörü `tsconfig.json`da `exclude` içindeydi, yani `npx tsc
--noEmit` betiklere hiç bakmıyordu. Şerit I'in yeniden adlandırmaları
(`GAME_LABELS` → `GAME_LABEL_KEYS`, bantlar Türkçe sözcükten kararlı kimliğe)
ve şerit L'nin adres değişikliği (`/learn?game=` → `/learn/game?game=`)
testlerde karşılıksız kalmıştı.

- `npm run typecheck:scripts` eklendi; `scripts/tsconfig.e2e.json` artık
  `include` taşıyor. İlk koşuda dört betikte daha aynı sınıf hata çıktı:
  `pg.Pool` şablon etiketi gibi çağrılıyordu (`sql\`…\``), yani o raporlama
  betikleri ilk sorguda patlardı. Etiket doğru biçimde yazıldı.
- Beş beklenti, ürünün BİLEREK değiştiği yerlerde eskimişti: dilbilgisi
  bölümü 2026-08'de kaldırıldı (yerleştirme + sınav kâğıdı), rol yapma
  `894ddb0b` ile 6-9 tura uzatıldı. Testler bugünkü tasarıma göre yazıldı.
- Bir gerçek hata çıktı: hata analizi `gameLabel`i ham anahtar olarak
  döndürüyordu, yani zayıf nokta kartının ipucunda `games.article_race`
  yazıyordu. Aynı kartta üç sabit Türkçe daha vardı ("Çalış", "{n} kez",
  `%{pct}`).

**Sonuç: 620 test geçiyor.** Tek oynak kalem "oyun çeşitliliği": yirmi oturum
kurup aynı oyunun arka arkaya gelmemesini bekliyor ve gerçek veriyle koşuda
bazen 1-3 tekrar çıkıyor (kelimenin durumuna göre uygun oyun sayısı azalınca).
Eşiği gevşetmek sorunu gizlemek olurdu; olduğu gibi bırakıldı.

**e2e veritabanı kurulumu** (yerel, `lernomi-dev-pg` kabında):

```bash
docker exec lernomi-dev-pg psql -U postgres -c "CREATE DATABASE lernomi_e2e"
# tüm migration'lar TEK süreçte (apply-migration.ts dosya başına bir süreç
# açıyor ve havuzu kapatmıyor — 43 dosya için 43 asılı süreç demek)
DATABASE_URL=<e2e> npx tsx scripts/seed.ts          # 8.707 kelime
DATABASE_URL=<e2e> npx tsx scripts/seed-skills.ts   # 984 egzersiz
TEST_DATABASE_URL=<e2e> npm run test:e2e
```


### Denetim araçları

Bu turda iki denetim eklendi ve ikisi de ilk koşularında gerçek hata buldu:

- `npm run i18n:check` üçüncü kural: **kodda çağrılan her anahtar sözlükte var
  mı.** `translate` bulamadığı anahtarın kendisini döndürüyor, yani ekrana
  `socialw.friends_load_failed` yazıyor — hata değil, sessiz arıza. Yedi tane
  buldu.
- `npm run typecheck:scripts`: `scripts/` klasörü `tsconfig.json`da `exclude`
  içindeydi ve e2e aylardır 9. testte çöküyordu (bkz. §8).
- Dördüncü kural: **aynı anahtar iki kez tanımlanmış mı.** TypeScript bunu hata
  sayıyor ama denetim saymıyordu; `Map` ikincisini yazıyor ve ilki sessizce
  ölüyor. Bir tane buldu.

**Tarayıcının kendi kör noktası:** JSX metninin İÇİNDE `{…}` varken satır hiç
taranmıyordu — `{combo} üst üste` gibi ifadeler üç turdur kaçıyordu. Kalıp
düzeltilince altmış kalem daha çıktı; en ağırı SERTİFİKA idi: indirilip
paylaşılan belgede bölüm adları çevriliyken gövde metni ("Bu belge",
"BÖLÜMLER", geçme kuralı) sabit Türkçeydi, yani belge yarı Almanca yarı
Türkçe basılıyordu.

Geriye kalan Türkçe metinler yalnız `console.error` günlükleri, `?diag=1`
paneli, `/analytics`, `admin/*` ve dile göre anahtarlanmış haritalar
(`TRUE_WORD`/`FALSE_WORD` gibi) — hiçbiri kullanıcı arayüzü değil.

Üç dilde 24 sayfalık tam tarama: ekranda ham anahtar YOK, sayfa hatası YOK,
hepsi üç dilde çiziliyor. (Tarama `networkidle` beklerken `/notifications`
zaman aşımına uğruyor; sebep Next'in HMR websocket'i — geliştirme sunucusuna
ait, ürüne değil. Sayfa `domcontentloaded` ile üç dilde de doğrulandı.)

### Bilerek farklı kalanlar

Parite "webde fazla olanı at" demek değil; web'e özgü olanlar mobilin
düzenine oturtuldu, yerlerini korudular.

BEŞİNİN HEPSİ KODLA KARŞILAŞTIRILDI (2026-09-10) — kararlar tutuyor, bir
madde de düzeltildi:

- **Hayatta kalma turu** — mobilde yok, "Daha fazlası" ızgarasında duruyor.
  Doğrulandı: web `learn-hub` ızgarasında duruyor ve yorumu da bunu söylüyor;
  mobilde ekran yok. Bu turda §11.25'te yanlışlıkla "yüzey eksiği" diye
  sınıflandırılmıştı, portlamaya başlamadan önce ölçülüp düzeltildi.
- **Kelime listesinde seviye süzgeci ve gelişim açılırı** — mobilde yok;
  8.707 kelimelik listede seviye süzgeci mobilde olmayan bir işlev, kaldırmak
  kayıp olurdu. Doğrulandı: web `word-list` `LEVELS` çipleriyle süzüyor,
  mobil `WordsScreen` yalnız DURUM süzgeci taşıyor (hepsi/öğreniliyor/…) ve
  seviyeyi satır başına etiket olarak gösteriyor.
- **Ayarlarda "Cihaz" bölümü** (ana ekrana ekle) — tarayıcıya özgü, mobilde
  karşılığı olamaz. Görünümle gizliliğin arasında kendi etiketiyle duruyor.
  Doğrulandı: `profile-form` `settings.app` bölümü, `InstallGuide` açılır
  kutuda; bileşenin kendi yorumu da "mobilde karşılığı yok, olamaz da" diyor.
- **Yapabildiklerim'de beceriye göre GRUPLAMA** — DÜZELTİLDİ: eski kayıt
  "mobilde yalnız seviye var" diyordu, bu artık doğru değil. Mobil
  `CandoScreen` beceriyi SATIR BAŞINA küçük bir etiketle gösteriyor; web
  satırları beceri başlıkları altında GRUPLUYOR. Yani fark bilginin varlığı
  değil, düzeni: web'de eklenen yapı, eksilen değil.
- **`/analytics` ve `admin/*`** — iç araçlar, Türkçe kalıyor. Doğrulandı:
  ham metin tarayıcısının atlama listesi ikisini de taşıyor
  (`scripts/i18n-hardcoded.mjs`).


---

## 9. İkinci turun kapanışı (9 Eyl)

Mobilin 34 ekranının tamamı web karşılığıyla karşılaştırıldı. Şerit tablosu
(§4) hâlâ geçerli ama "bitti" artık **doğrulanmış** demek: her ekranın bölüm
sırası, kartları ve denetimleri mobil kaynağıyla yan yana okundu.

### Dil tarafında bulunan iki yapısal açık

1. **İlk ziyarette dil sorulmuyordu.** Çerez ve profil yokken sunucu doğrudan
   Türkçeye düşüyordu — yani arayüzün üç dilde olması, dili SEÇEBİLEN
   kullanıcıya kadar hiç işe yaramıyordu. Artık `accept-language` dinleniyor
   ve onboarding mobildeki soruyu soruyor (`01aab4c0`, `a51adc49`).
2. **Onboarding'de seçilen dil hesaba taşınmıyordu.** Karar çerezde kalıyor,
   hesap açılınca `LangSync` profili çereze aynalayıp seçimi eziyordu
   (`e730c9dc`).

### Son durum

| Denetim | Sonuç |
|---|---|
| `npx tsc --noEmit` | temiz |
| `npm run typecheck:scripts` | temiz |
| `npm run i18n:check` | base 1079 + web 1227 anahtar × 3 dil, dört kural da geçiyor |
| `npx eslint src` | 0 hata |
| `npm run test:e2e` | 618 geçti · 2 oynak (oyun çeşitliliği, aşağıda) |
| Üç dilde 24 sayfa | ham anahtar yok, sayfa hatası yok |

**Oynak test:** "aynı oyun arka arkaya gelmiyor" yirmi oturum kurup sıfır
tekrar bekliyor; gerçek veriyle koşuda 0-3 arası çıkıyor, çünkü kelimenin
durumuna göre uygun oyun sayısı azalabiliyor. Eşiği gevşetmek sorunu gizlemek
olurdu — merdivenin kendisi bakılacak bir kalem olarak duruyor.

### Oyun katmanı — dört fark, dördü de web'in aleyhine

**Önceki değerlendirme yanlıştı.** Yalnız mobilin `Prompt` bileşenine bakıp
"web'in kartsız düzeni ölçüme dayanıyor, kalem mobile düşüyor" demiştim;
mobilin ekranın TAMAMINI nasıl kurduğuna bakmamıştım. Bakınca mobil dört
noktada da daha iyi çıktı:

| | Mobil | Web (önce) |
|---|---|---|
| Soru | kendi kartı: yüzey, kenarlık, gölge | kartsız, dolgulu çip + düz metin |
| Soru ↔ şık arası | `MascotMid` — boşluğu Erdi dolduruyor, cevaptan sonra gizlenip **yerini koruyor** | boş `aria-hidden` div |
| Aksiyon alanı | `RoundShell` footer — dipte, klavye açılınca kalkıyor | akışın içinde |
| İlerleme | **"Devam" düğmesi** — kararı öğrenci veriyor | zamanlayıcı: doğruda 620 ms, yanlışta 1200 ms |

Sonuncusu en ağırı: 1200 ms bir düzeltmeyi ve altındaki gerekçeyi okumaya
yetmiyor, üstelik hoparlöre basıp tekrar dinlemek de mümkün değildi — tur
çoktan geçmiş oluyordu. Mobil kararı öğrenciye bırakıyor.

Dördü de web'de düzeltildi: `game-shell` artık soruyu kartın içine alıyor,
aradaki boşluğu Erdi dolduruyor, şeridin altına "Devam" koyuyor (Enter ve
boşluk da çalışıyor) ve on bir oyunun tamamı kendiliğinden ilerlemek yerine
cevabı bekletiyor. Soru rengi de mobildeki gibi düz metin rengine döndü.

**Ders:** bir farkı "web daha iyi" diye bırakmadan önce öbür tarafın
tamamına bakmak gerekiyor. Mobil burada kendi çözümünü bulmuştu ve daha
iyisiydi.

### Samet'e kalanlar

1. **Push** — 170+ yerel commit bekliyor; `git push origin main`.
2. **Deploy sonrası iki timer:** `lernomi-cron-streak` ve `lernomi-cron-weekly`
   (AGENTS.md'de yazılı). Uçlar bugün çağrılsa 404 döner.
3. **Migrasyon** `0042_reminder_kinds` deploy zincirinde uygulanacak.
4. **İçerik kararları** (§6): karıştırma çiftlerinin İngilizce/Almanca
   konuşana göre yeniden seçilmesi ve `words` tablosuna Almanca karşılık
   sütunu. İkisi de içerik projesi, kod değil.
5. **Mobil tarafı** (küçük kalemler): `skills.skills` Almanca sözlükte
   "Skills" diyor, `formatDuration` "dk"/"s" sabit yazıyor, hero rozetleri
   "{n} tekrar" / "{n} yeni" sabit.

---

## 10. Üçüncü tur — üç platformun ilerleme seviyesi (9 Eyl)

Soru bu turda daha genişti: **web, Android ve iOS bugün nerede duruyor ve
birbirlerinden nerede ayrışıyorlar?** Referans Android.

### 10.1 Yöntem

Belgeye değil koda bakıldı; her iddianın altında koşulan bir ölçüm var.

| Ne ölçüldü | Nasıl |
|---|---|
| Ekran haritası | mobil `screens/` (37) ↔ web `app/**/page.tsx` (57) |
| İçerik kapsamı | `lessonsFor` · `BUNDLED_EXERCISES` · `MOCK_PAPERS` kurs kurs sayıldı |
| Web → mobil köprüleri | üç döküm betiği de koşuldu, çıktı depodakiyle diff'lendi |
| Mobil → web sözlüğü | `i18n-pull.mjs` koşuldu, ayrışma arandı |
| Sözlük kullanımı | `i18n-check`in `KEY_CALL` kalıbıyla iki taraftaki çağrılar çıkarıldı |
| iOS native | `RCT_EXTERN_METHOD` listesi ↔ Kotlin `@ReactMethod` listesi |
| Kapılar | `i18n:check`, `ios:check`, `tsc`, `eslint`, `typecheck:scripts` |

### 10.2 iOS

**Kod tarafında parite kapandı.** Ayrıntı ve ölçüm tablosu
`docs/plan/ios-parity.md` başına eklendi. Özet: native yöntem kümesi birebir
aynı (20/20), `ios:check` sekiz denetimi de geçiyor, sürüm dörtlüsü tek
kaynaktan basılıyor. Açık kalanlar kod değil: Google iOS OAuth istemcisi,
RevenueCat anahtarları (iki platformda da boş), `LEGAL_PLATFORMS.ios` kapısı
ve Mac'te cihaz koşusu.

### 10.3 Web → mobil içerik köprüleri: ayrışma yok

Üç döküm betiği de koşuldu; `mobile/src/data/**` altında **tek satır fark
çıkmadı**. Yani beceri egzersizleri, deneme kâğıtları ve Almanca dersler için
"tek kaynak web, mobil türev" kuralı bugün gerçekten tutuyor.

Betiğin kendisinde bir açık vardı: `dump:lessons` `package.json`'da **yoktu**.
Mobil ders paketinin kaynağın gerisinde kalması (`3c1b7b61`) bu yüzden fark
edilmemişti. Eklendi.

### 10.4 Bulunan asıl ayrışma: İngilizce dersler

| kurs | web ders | web egzersiz | web kâğıt | mobil ders |
|---|---|---|---|---|
| de | 580 | 995 | 60 | 580 |
| gsw-zh | 0 (hedef dili Almanca) | 0 | 0 | — |
| en | **0** | 189 | 60 | **200** |

İki yüz ders (A1 100, A2 100) doğrudan `mobile/src/data/lessons/en-*.json`
olarak yazılmış ve web'e **hiç girmemiş** — geçmişte de hiç olmamışlar
(`git log --diff-filter=A 'src/lib/lessons/content/en-*'` boş). Sonuç:
İngilizce kursu seçen web kullanıcısı Patika'da hiçbir konuşma düğümü
görmüyordu; aynı kullanıcı Android'de yüz dersi birden görüyordu.

`7957f895` ile kapandı: dosyalar `src/lib/lessons/content/` altına taşındı,
tek kaynak yeniden web oldu, mobil paketi döküm üretiyor. Dönüşün kayıpsız
olduğu ölçüldü — dökümden çıkan iki paket depodakiyle nesne nesne aynı.

### 10.5 Sözlükte yapısal ayrışma — ölçüldü ve büyük bölümü kapandı

`src/i18n/base/*` mobilden tazedir (`i18n-pull` ayrışma bulmadı). Ama web o
tabanın yarısını kullanmıyordu: mobilde çağrılan 851 anahtarın **446'sı**
web'de hiç çağrılmıyor, web onların yerine kendi ad uzaylarını yazmıştı.

**İlk okuma yanlıştı.** "446 anahtar taşınacak" demek, hepsinin aynı metnin
ikinci kopyası olduğunu varsaymaktı. Ad uzayı ad uzayı bakıldığında ikiye
ayrıldılar:

| Ad uzayı | Karar | Neden |
|---|---|---|
| `socialw` (57) | **taşındı** (46) | Aynı ekranlar; 17'si üç dilde birebir aynı cümle |
| `del` (18) | **taşındı** (8) | Hesap silme ekranı mobilde `deleteaccount.*` ile kurulu |
| `monow` (4) | **taşındı** (4) | Üçü üç dilde birebir aynı |
| `achgroup` (9) | **silindi** | Web sözlüğü tabandakinin birebir kopyasını taşıyordu |
| tekil kopyalar (7) | **taşındı** | `lang.app_language`, `anlt.send_usage`, `firstw.title`, `rpexam.listening`, `authw.no_connection`, `authw.reset_sent`, `wordsw.load_failed` |
| `walk` (34) | **kalıyor** | Web yürüyüşü tarayıcı tanıyıcısıyla çalışıyor; mobilinki native servis. Metinler farklı çünkü DAVRANIŞ farklı ("Chrome ya da Safari", "Cebe koy") |
| `onb` (21) | **kalıyor** | Web akışı beş adım ve mobilde olmayan bir "amaç" adımı taşıyor |
| `lessonp` (29) | **kalıyor** | Web oynatıcısında eller serbest kipi, sohbet servisi kapalı uyarısı ve sınav bağlantısı var; mobilde yok |
| `wordsw`, `authw` kalanı | **kalıyor** | Sayfalama, parola sıfırlama akışı — mobilde karşılığı yok |
| `bossw`, `challenge`, `land`, `install`, `stage`, `pron` | **kalıyor** | Web'e özgü yüzeyler |

Bir de **aynı sözcüğe denk gelen ama ayrı yerler** var ve bunlar bilerek
birleştirilmedi: `common.go_back`, `common.listen`, `common.add`,
`summary.streak`, `assess.vocab`, `settings.words_unit`, `theme.appearance`.
Metin bugün aynı; rol farklı. Birleştirmek ilgisiz iki ekranı birbirine
bağlar ve birinde yapılan düzeltme ötekini bozar.

**Sonuç:** web sözlüğü 1255 → 1181 anahtar; mobilde çağrılıp web'de hiç
çağrılmayan anahtar 446 → 385. Kalan 385'in ezici çoğunluğu yukarıdaki
"kalıyor" satırlarına ait — yani ayrı yazılmış olmaları doğru.

**Erteleme kapandı.** `friends-hub.tsx`, `requests.tsx` ve `friends/page.tsx`
taşıma sırasında başka bir oturumun elindeydi (sekme yapısı yeniden
kuruluyordu); sekme işi inince o üç dosya da tarandı. Bir taşıma çıktı —
davet kartının alt satırı (`socialw.invite_sub` → mobilin
`friends.send_your_profile_link_and_study`'si) — ve sekme yeniden kurgusuyla
sahipsiz kalan dört anahtar silindi (`socialw.no_requests`,
`socialw.requests_sub`, `socialw.sent`, `socialw.settings`).

Geriye kalan `socialw.*` anahtarları BİLEREK duruyor, hepsinin mobilde
karşılığı yok: alkışlama ve dürtme ipuçları, ortak seri uyarısı, sekme
listesinin ekran okuyucu etiketi, "bağlantı kopyalandı" durumu (mobil yerel
paylaşım sayfasını açıyor, kopyalama durumu yok), tam sayfa hata kartı
(mobil yalnız "tekrar dene" hapı gösteriyor) ve profil karolarından ikisi.

### 10.6 Kapatılan sabit Türkçeler

Sabit Türkçe denetiminin kör noktası: birim sözcükleri ("dk", "sn", "gün")
eşiğin altında kalıyor. Elle tarandı, on kalem çıktı ve hepsinin karşılığı
tabanda zaten vardı (`7f9874ee`) — monolog oynatıcısının dört düğmesi, tur
oynatıcısının iki hata kartı, beceri kabuğu ve kişi aramadaki seri rozeti,
ilerleme paneli, ilk kelimeler ve ilerleme grafiği. Taban 185 → 180.

### 10.7 Açık kalanlar

| # | Ne | Durum |
|---|---|---|
| 1 | Google iOS OAuth istemcisi | **açık** — Google Cloud'da açılacak (hesap işi) |
| 2 | RevenueCat anahtarları | **açık** — iki platformda da boş (hesap işi) |
| 3 | Sözlük taşıması | **bitti**, §10.5. Üç dosyalık kalıntı orada yazılı |
| 4 | `boss-player.tsx` sayacındaki "{n} sn" | **bitti** — `challenge.seconds` yeniden kullanıldı |
| 5 | `monow.*` dört anahtarı | **bitti** — `item.mono_*`a çekildi |
| 6 | Yapabildiklerim / Yazılarım geniş ekranda | **bitti** — `CardGrid`, `CardGrid` artık `as` alıyor |
| 7 | Mobilde `rounds.tsx` sabit Türkçesi | **bitti** — `rounds.match_first_try` |

Tasarım turunun (§11) açık kalemleri de kapandı: semantik renkler §11.4, misafir
yerleştirme testi §11.5, rozet kademeleri §11.8, dil bilgisi giriş cümlesi.
Kod tarafında bekleyen madde kalmadı; 1 ve 2 hesap işi ve Samet'te.

Yeni ve bilerek AÇIK bırakılan tek şey §11.7: beceri kütüphanesinde yön ters
ve kapatmak ürün kararı istiyor.

---

## 11. Tasarım turu — ölçü ölçü karşılaştırma (10 Eyl)

Önceki turlar bilgi mimarisine ve metne bakmıştı; bu tur ÖLÇÜLERE baktı:
belirteçler, kabuk, bileşen ölçüleri ve tur yönergeleri. Yöntem aynı — iki
tarafın kaynağı yan yana okundu, fark bulunca ölçüldü.

### 11.1 Ölçülüp EŞİT çıkanlar

Zemin, yüzey, kenarlık, ayraç, metin rengi, marka rampası (10 basamak), altı
semantik renk, beş yarıçap, üç gölge basamağı ve tipografi ölçeği (sekiz
varyant) iki tarafta birebir aynı. Yüzen sekme çubuğunun yarıçapı, iç dolgusu,
kenarlığı, gölgesi, ikon boyu ve seçili öğesinin yarıçapı da öyle. Şık
(`option`) kenarlığı ve yarıçapı aynı. iOS'un pencere ve açılış zeminleri
Android'in `window_bg` / `ic_launcher_background` değerleriyle birebir.

### 11.2 Düzeltilen farklar

| Ne | Fark | Yön |
|---|---|---|
| Sönük metin | mobil #8a7866 (4.23) · web #7c6c5d (5.05) | Ölçüm: mobil web'e geçti. Koyu temada ikisi de geçiyordu, orada web mobile geçti |
| Seçili sekme hapı | web `color-mix(%14)` = #feecde · mobil düz `orange[100]` = #ffe3c4 | Web mobile geçti (`--brand-soft`) |
| Sekme öğesi dikey dolgu | web 10 · mobil 9 | Web mobile geçti |
| Başlık seri hapı alfası | web %16 · mobil %13,3 | Web mobile geçti |
| Seçim çipi | web pill + dolu turuncu · mobil radius 14 + yumuşak zemin | Web mobile geçti; süzgeç hapı `.chip-filter` olarak AYRILDI |
| Seçili çip yazısı | mobil marka 500 (**2.24**) | Ölçüm: ikisi de marka 800'e (6.13). Yeni belirteç: `onPrimarySoft` / `--on-brand-soft` |
| `.input` | web'de sınıf kullanılıyor ama TANIMLI DEĞİL | Mobilin ölçüleriyle tanımlandı |
| Tur yönergesi | web oyunun ADINI yazıyordu, mobil YÖNERGEYİ | On iki oyun mobile geçti |

Çipin yazı tonu bu turun en öğretici kalemi: körlemesine hizalama Android'in
2.24'lük kontrastını yirmi web yüzeyine taşıyacaktı. Ölçüm yön tayin etti ve
referans taraf da düzeldi — bu oturumdaki `textMuted` kararıyla aynı çizgi.

### 11.3 Ölçülüp BİLEREK farklı bırakılanlar

- **Sonuç şeridinin kenarlığı.** Mobilde 1,5 px tonlu kenarlık var, web'de yok.
  Web'in gerekçesi dosyada yazılı: kenarlık şeridi dokunulabilir gösterir,
  şerit ise bir bildirim. Üstelik bu bileşende referans WEB — mobil kendi
  yorumunda "Web VerdictBar" diye kaynağı gösteriyor.
- **Kenar çubuğundaki XP hapı.** Mobilde yok ama o çubuk masaüstüne özgü bir
  yüzey; mobildeki başlığın gerçek karşılığı (`app-header.tsx`) zaten aynı
  üçlüyü taşıyor.
- **Ünite teması ikonları.** Web'in ikon setinde 47 kullanılmayan ikon var
  (bread, bus, cake…) ve `lesson.icon` alanı İKİ tarafta da uykuda. Asimetri
  değil, ortak bir uyuyan zemin; temalı Patika için hazırlık gibi duruyor.
- **Tur başlığının kompozisyonu.** Android tek satırda çıkış, ilerleme çubuğu,
  seri hapı ve sayaç gösteriyor; web bunları iki satıra bölüyor ve üstte
  ayrıca seviye rozetini (CEFR + pekişme) tutuyor. Bilgi kaybı yok — web'de
  FAZLASI var, üstelik yeni/tekrar çipiyle. Kompozisyon farkı ekran
  genişliğinden geliyor; renkler eşitlendi (seri hapı iki tarafta da gök).

### 11.4 Semantik renklerin bir basamak farkı — KAPANDI

Web'in semantik renkleri Android'inkinden bir basamak koyuydu ve bu bilinçli:
paletin ölçüm kapısı (`palette-check.mjs`) beyaz kart üstünde metin kontrastı
istiyor. Ölçüm (metin / beyaz, eşik 4.5):

| rol | mobil (dolgu) | | web (yazı) | |
|---|---|---|---|---|
| streak / flame | #b8940f | **2.88** | #86690e | 5.20 |
| success / mint | #2f9a61 | **3.55** | #237a4c | 5.30 |
| info / sky | #1b93ac | **3.61** | #16748a | 5.39 |
| danger / rose | #dc3f55 | **4.30** | #b62e43 | 6.07 |
| accent / violet | #9256bc | 4.91 | #77439d | 6.83 |

Madde bir süre açık kaldı çünkü iki yön de yanlıştı: web'i Android'e çekmek
dört ölçümü birden kırardı, Android'i web'e çekmek ise o tonların DOLU ZEMİN
olarak kullanıldığı yerleri (ikon karoları, ilerleme çubukları) geniş bir
alanda değiştirirdi.

Çözüm üçüncü yoldu ve zaten web'de duruyordu: **dolgu ve yazı ayrı ton**.
Web açık temada dolgu için 500'ü, yazı için 600'ü kullanıyor. Mobil paletine
aynı ayrım eklendi (`successText`, `dangerText`, `streakText`, `infoText`,
`accentText` — değerler web'in 600'leri) ve YALNIZ `<Text>` içinde renk
taşıyan otuz üç yer çevrildi; ikon, zemin ve kenarlık kullanımları olduğu gibi
kaldı. Koyu temada ikinci bir ton uydurulmadı: oradaki tonlar yüzey üstünde
8.3-9.7 veriyor.

### 11.5 Misafir yerleştirme testi — kapandı

Android'de sıra şuydu: misafir onboarding'de "Seviyemi öğrenmek istiyorum"
der, **testi çözer**, sonra hesap açar. Web'de aynı seçenek
`/login?mode=signup&next=/placement`e gidiyordu: önce hesap, sonra test —
yani seviyesini bilmediği için testi isteyen kişi ölçülmeden kaydolmak
zorundaydı.

Dört parça da yapıldı:

1. `src/lib/placement-demo.ts` — mobil `data/demoPlacement.ts` ile birebir
   soru seti (sekiz soru, `<anadil>-<kurs>` çiftine göre, aynı hedef dili
   paylaşan kursa düşer).
2. `/level-test` — misafire çizilen sayfa. `(app)` grubunun DIŞINDA, çünkü o
   grubun düzeni oturum yoksa `/login`a yönlendiriyor; `/first-words` ile aynı
   sınıftan bir sayfa. Oturum açıksa gerçek teste (`/placement`) yönlendirir.
3. `src/components/placement/demo-placement.tsx` — yerel puanlama, ilerleme
   çubuklu başlık, "Seviye testi · örnek" eki ve sonuç ekranı. Misafir
   varyantı `placement.understood` ile kapanıyor (`placement.set_level`
   oturum açık yolun metni ve orada duruyor).
4. Seçilen seviye `saveOnboardingPrefs({ level })` ile cihazda duruyor;
   hesap açılınca `onboarding-adopt` onu profile taşıyor.

Onboarding'in "Testle belirle" dalı artık misafiri `/level-test`e gönderiyor.
Soru metinleri öğrenme içeriği olduğu için `placement-demo.ts` ham metin
tarayıcısının içerik listesinde (`first-words.ts` gibi).

### 11.9 Mobilde eksik: yapay zekâ kapalıyken senaryo yolu

Konuşma dersinin sohbeti yapılandırılmamışsa (`/api/roleplay` `configured:false`)
iki platform farklı davranıyor:

- **Web** derse ait SENARYOYA düşüyor (`lib/lessons/offline-roleplay`): açılış
  repliği, ipucu ve dallanan bir tur akışı ders verisinden okunuyor, yani
  konuşma çalışmaya devam ediyor.
- **Mobil** böyle bir yola sahip değil. Eskiden her tur genel `catch`e düşüp
  "bağlantı sorunu" yazıyordu — yanlış teşhis; artık doğrusu söyleniyor
  (`lesson.ai_off`) ama ders yine de yapılamıyor.

Senaryo yolunu mobile taşımak bir durum makinesi ve ders verisi okuma demek;
loop turunun işi değil, ayrıca ölçülmeli. Yön yine TERS (web ileride), §11.7
ile aynı sınıf.

#### Portun boyutu ölçüldü (bu tur)

  modül            satır   bağımlılık
  offline-roleplay   180   dialogue, speech.normalizeSpoken, chat-format, courses
  dialogue           128   yalnız speech.normalizeSpoken
  normalizeSpoken     ~15  foldNumbers + noktalama (mobilde ikisi de var)

Yani zincir kapalı ve mobilde karşılığı olmayan tek parça `normalizeSpoken`,
o da on beş satır. `SUGGESTION_MARK` mobilde ZATEN var (`game/roleplay`,
kendi kopyası).

KRİTİK VERİ: dallanan senaryo 780 dersin 10'unda var (`roleplay.script`).
Kalan 770 ders zaten `offlineStart`ın İKİNCİ yoluna düşüyor - açılış repliği
`roleplay.opening`, yönlendirme `patterns[0]` - ve mobil döküm ikisini de
taşıyor. Yani portun büyük kısmı döküm değişikliği İSTEMİYOR; yalnız o 10 ders
için `roleplay.script` alanının döküme eklenmesi gerekiyor.

#### Yan bulgu, DÜZELTİLDİ: üç yönlendirme Türkçe sabitti

`offlineStart`/`offlineReply` mikrofon etiketine düşen üç yönlendirmeyi
Türkçe SABİT yazıyordu: "Kalıbı kullan: …", "Anlaşılmadı — ör. …", "Sıradaki
kalıp / Bu kalıbı dene: …". İngilizce ve Almanca arayüzde de Türkçe
görünüyorlardı.

Ham metin tarayıcısı bunları GÖREMİYORDU: `lib/lessons` dizini "ders içeriği"
diye bütünüyle atlanıyor, oysa bu dosya MANTIK. Kör noktanın kendisi de
kapatıldı - tarayıcıya `FORCE` listesi eklendi: atlanan dizinin içinde olsa da
taranan dosyalar.

MEKANİZMA İLK YAZIMDA İŞLEMİYORDU ve bunu ancak sınayarak gördüm: `FORCE`
yalnız DOSYA yolunu karşılaştırıyordu, ama gezinme atlanan DİZİNDE zaten
duruyor ve o dosyaya hiç inmiyordu. Yani liste sessizce etkisizdi - kapının
"eklendi" demesi yetmiyor, yakaladığını görmek gerekiyor. Düzeltildikten
sonra sınandı: `progress.ts`e ham bir Türkçe dizgi konduğunda kapı
"progress.ts: 0 → 1" diyor.

Liste yalnız BUGÜN TEMİZ olan mantık dosyalarını taşıyor (altısı sıfır dizgi
veriyor), yani kapı bedava güçleniyor. Kirli olanlar bilerek dışarıda ve
borçları betikte yazılı - hepsi birden eklenirse taban 173'ten 281'e çıkardı:

    modules.ts          46   modül adları/açıklamaları (müfredat içeriği)
    module-content.ts   35   bölüm etiketleri + içerik türetme
    roleplay.ts         19   modele giden yönerge (kullanıcı görmüyor)
    native-server.ts     4
    log.ts               2
    native.ts            2

AYRIM YAPILDI (altısının hepsi tek tek okundu) ve sonuç şu: HİÇBİRİ
kullanıcıya görünen bir yerelleştirme hatası değil. Beşinde Türkçe olması
DOĞRU, altıncısı ölü:

    log.ts             2   sunucu logu (`[roleplay-log] yazılamadı`) - tabandaki
                           173 dizginin çoğu da aynı sınıf
    native-server.ts   4   sunucu logu (`[native] ders çevrilemedi…`)
    native.ts          2   TÜRKÇE İÇERİĞİ TANIYAN çerçeve deseni; Türkçe
                           kalmalı, yoksa desen içeriği bulamaz
    module-content.ts 35   `LEAD_INS` - içerikten yönergeyi kırpan Türkçe
                           desen listesi; aynı sebep
    roleplay.ts       19   modele giden yönerge metni, kullanıcı görmüyor
    modules.ts        46   `MODULE_THEMES` - ÇAĞIRANI YOK (src, scripts, mobil
                           ve data'da tek kullanım yok; aynı dosyadaki
                           `MODULE_SIZE` beş yerden kullanılıyor, yani ölü olan
                           dosya değil o sabit). Yani Türkçeliği bugün kimseye
                           görünmüyor; yüzey gelirse anahtar gerekir.

Bu yüzden hiçbiri temizlenmedi ve `FORCE`a da eklenmedi: eklemek tabanı 173'ten
281'e çıkarır ve kapı, gerçek hatayı gürültünün içinde saklardı. Ayrım burada
yazılı, yani sonraki okuyucu altı dosyayı yeniden okumak zorunda değil.

`MODULE_THEMES`in çağıranı olmaması "yazılmış ama bağlanmamış" ailesine
(§11.10) ait bir kalem; yol haritasının modül katmanı için yazılmış, bugün
modül adları başka yerden geliyor (`moduleExamPlan`).

#### Bu aile için KAPI DENENDİ ve VAZGEÇİLDİ

Uç kapısı (§11.24) işe yaradığı için aynı fikir "dışa açık ama hiçbir yerden
kullanılmayan ad" için de denendi: bütün `src` dosyaları belirteçlere ayrılıp
her `export`un başka bir dosyada geçip geçmediğine bakıldı.

VAZGEÇİLDİ, iki sebeple:

  1. Ölçüm gürültülü: 346 aday çıktı ve tek başına `components/icons.tsx` 47
     tanesini veriyor - o dosyanın kullanılmayan ikonları BİLEREK duruyor ve
     zaten §11.14'te yazılı. Kapı, "biliyoruz" diyen uzun bir muafiyet
     listesine dönüşürdü.
  2. Prototipin kendisi güvenilir değildi: `courses.ts`in `CourseId`i dört
     dosyada geçmesine rağmen listede çıktı, yani belirteç indeksi yanlış
     sayıyordu. Sayıyı bulgu diye yazmak yanlış olurdu.

Bu ailenin gerçekten önemli iki kalemi (73 tema ikonu, `MODULE_THEMES`) düz
yazıyla kayıtlı ve ölçülmüş durumda; otomatik denetim onlara bir şey
katmıyordu. Kapı yazılmadı, karar burada.

Yönlendirmeler artık ANAHTAR taşıyor (metin değil) ve çeviri gösterildiği
yerde yapılıyor - koç cümleleri ve fark vurgusundaki kalıbın aynısı. Senaryo
dallarının `cue`su içerikten geldiği için boş anahtar + `text` değişkeniyle
olduğu gibi geçiyor.

### 11.10 Yüzeyi olmayan yazılmış içerik

Tarama üç yerde "yazılmış ama hiçbir ekranda görünmeyen" metin buldu. İkisi
kapatıldı (deneme sınavı sözlükçesi, lig satırındaki bildirim); geriye ikisi
kaldı ve ikisi de EKSİK PARİTE DEĞİL, iki platformda birden yok:

- `share.streak` (üç dil) + mobil `shareStreak()` — seri paylaşma. Hiçbir
  ekranda düğme yok. Eklemek hizalama değil ürün kararı: düğme profile mi,
  seri hapına mı, sonuç ekranına mı?
- `coach.plan_*` (on beş cümle, üç dil) + `planMoment()` — "bugünkü plan"
  selamı. O satır mobilde karşılığı olmadığı için web'den bilerek kaldırıldı
  (§ Öğren). Cümleler yüzey geri gelirse yeniden yazılmasın diye duruyor.
- `coach.weekly_*` (beş cümle, üç dil) + `CoachMoment "weekly"` — cümleler
  okununca hangi yüzeye ait olduğu anlaşılıyor: "geçen haftanın özeti burada",
  "yeni hafta, geçen haftanın sayıları hemen altta". Yani HAFTALIK ÖZET
  ekranına yazılmışlar, haftalık SINAV girişine değil. Haftalık özet bugün bir
  ekran değil, cron'un gönderdiği bir bildirim (`lernomi-cron-summary`) - o
  yüzden anın çağıranı yok. Sınav girişine bağlamak yanlış olurdu: test
  düğmesinin üstünde "geçen haftanın özeti aşağıda" yazardı.

KOÇ ZATEN WEB'E ÖZEL bir katman: `coach.*` anahtarlarının hiçbiri mobil
kaynak sözlükte YOK (ölçüldü: sıfır), yalnız `src/i18n/web/*` içinde. Yani
Android'de koç olmaması bir eksik değil, kurulum böyle. Sekiz andan dördü
canlı (`exam_intro`, `exam_pass`, `exam_fail`, `weak_done`), dördü yüzeysiz
(üç plan + weekly).

### 11.8 Rozet kademe renkleri — ölçüldü ve eşitlendi

Dört kademenin dördü de ayrışmıştı ve rozetin üstünde BEYAZ ikon duruyor,
yani grafik ögesi eşiği (3.0) geçerli:

| kademe | mobil | | web | | ortak |
|---|---|---|---|---|---|
| bronz | #b08d57 | 3.09 | #a9683c | 4.44 | #a9683c |
| gümüş | #9aa3ad | **2.56** | #a8a29a | **2.53** | #8a8277 (3.79) |
| altın | #b8940f | **2.88** | #d4a017 | **2.38** | #aa8012 (3.62) |
| efsane | #9256bc | 4.91 | #77439d | 6.83 | #77439d |

Gümüş ve altın İKİ platformda da eşiğin altındaydı: beyaz ikon kendi
zemininde eriyordu. Hue korunarak açıklık düşürüldü; bronz ve efsanede web'in
değeri alındı, o ikisi zaten geçiyordu.

Mobilde gümüş ayrıca mavi-griydi (#9aa3ad) — web bu sorunu bir kez çözüp sıcak
griye geçmişti, mobil geride kalmıştı. Altın ve efsane de mobilde semantik
renklere (`streak`, `accent`) bağlıydı, yani anlam renkleri değişince rozetler
de değişiyordu; artık kendi değerleri var.

### 11.7 TERS YÖN: beceri kütüphanesinde web ileride

Bu turların çoğu Android'i referans aldı çünkü genelde ileride olan o. Beceri
egzersizlerinde durum TERSİNE dönmüş ve bunu yazmadan bırakmak, sonraki turda
yanlış yöne çekmeye yol açar.

Mobilde bütün beceri türleri tek ekranda (`ItemScreen`) ve ortak bir soru
listesiyle çiziliyor. Web'de her tür kendi oynatıcısını almış:

| Oynatıcı | Web'e özel anahtar | Mobilde |
|---|---|---|
| `listening-player` | `listenp.*` — 9 | yok |
| `speaking-player` | `speakp.*` — 7 | yok |
| `writing-player` | `writp.*` — 20 | yok |
| `player-shell` | `skillp.*` — 5 | yok |
| `monologue-player` | `item.mono_*` — 14 | ekran var, oynatıcı yok |

Web'in kapanış kartı da ileride: kazanılan XP, seri, "tekrar sayılmadı" notu,
çevrimdışı kaydedildi hâli, yeniden dene ve SIRADAKİ egzersize bağlantı.
Mobilde kapanış yüzde ve iki düğme.

Bunu bir loop turunda kapatmak doğru değil: mobil tarafta beş yeni oynatıcı
ve elli civarı yeni metin demek, yani ürün kararı. Buraya yazıldı ki
"Android referanstır" kuralı bu alanda körlemesine uygulanmasın.

### 11.6 Yan bulgular

- Seçim çipi mobilde dört kopya halinde yazılıydı (Ayarlar, Bildirimler, sosyal
  ortak modül, Sıralama'da satır içi) ve dolguları üç türlüydü;
  `mobile/src/ui/Chip.tsx` tek yer oldu.
- Ham metin tarayıcısının sezgisi yalnız Türkçe'ye özgü harfe bakıyordu.
  Sözlük tabanlı ikinci kural eklendi ve iki platformda 43 ham metin çıkardı
  (web 36, Android 7). Kural artık iki tarayıcıda da var.
- `npm run typecheck:scripts` ve `npm run lint` main'de kırmızıydı; ikisi de
  düzeltildi ve betik derlemesi CI kapısı oldu.
- Sözlük tabanlı kuralın da bir kör noktası var: bir Türkçe kelimeyi ancak
  sözlükte GEÇİYORSA tanıyor. `AvatarScreen`teki `"BIYIK"` bu yüzden aylarca
  görünmedi — "bıyık" hiçbir çeviride yoktu. Dilden bağımsız bir üçüncü kural
  (arayüz metni konumundaki düz dizgiler) prototiplendi ve iki platformda
  koşturuldu: mobilde sıfır, web'de yalnız `analytics`/`admin` (ikisi de zaten
  bilerek tek dilli). Yeni bir şey bulmadığı için kapı olarak eklenmedi.
- Mikrofon açıklaması web'de yoktu. Android yürüyüş modunda mikrofonu açmadan
  önce sesin nereye gittiğini anlatıp olumlu onay alıyor (Play "prominent
  disclosure"); web'de o mağaza kuralı yok ama toplanan veri aynı — web de
  sesi `/api/stt`e gönderiyor. Ekran, yerel onay saklama ve ayarlardan geri
  alma web'e taşındı. Dört maddeden biri web'e özel yazıldı: Android'in metni
  "sürekli bir bildirimden bunu görürsün" diyor ve o bildirim ön plan
  servisinin kendisi; tarayıcıda öyle bir bildirim yok, tutulmayacak söz
  verilmedi.

### 11.11 Kelime listesi — web ileride (kayıt, port edilmedi)

`/words` iki platformda da aynı sorguyu kuruyor: kurs süzgeci, arama (de/tr/en),
seviye ve durum eşikleri, sıralama, sayfalama — hepsi birebir. Ayrışan tek şey
satırın DERİNLİĞİ:

| | alan |
|---|---|
| web (`word-list.tsx`) | de · artikel · tr · en · tip · seviye · örnek cümle (de/tr/en) · SRS aralığı · sonraki tekrar · unutma sayısı · sülük işareti |
| Android (`WordsScreen`) | de · artikel · tr · seviye · durum |

Web satırı açılıyor ve ayrıntıyı gösteriyor; Android satırı düz. Sayfa boyu da
farklı (web 40, uç 30) ama o ekran genişliğine ait bir seçim, kusur değil.

PORT EDİLMEDİ. Kapatmak `/api/words` yanıtını genişletmeyi, `WordRow` tipini
büyütmeyi ve satıra açılır bir ayrıntı eklemeyi gerektiriyor — yani ANDROID'E
ÖZELLİK EKLEMEK. Bu turun kuralı bunun tersi: Android referans, web ve iOS ona
hizalanıyor. Web'i kırpmak ise düpedüz gerileme olurdu. Karar Samet'in: örnek
cümle tek başına bile eklenmeye değer olabilir (öğrenci için en yararlı alan ve
uçtan bir kolon uzağa).

### 11.12 Değerlendirme kuyruğu — mobilde yok (kayıt, dosya başkasının açık işi)

`POST /api/assess/queue` sağlayıcı kapalıyken yazılan metni saklıyor ve
`/api/cron/assess` servis dönünce puanlıyor. Web'in BECERİ yazma oynatıcısı
(`skills/writing-player`) bunu çağırıyor ve kullanıcıya "metnin kaydedildi,
servis açılınca puanlanacak" diyor. Mobilin karşılığı çağırmıyor: sağlayıcı
kapalıyken yazılan metin hiç puanlanmıyor.

İki tarafın SINAV oynatıcısı bu konuda EŞİT — ikisi de kuyruğa almıyor, yalnız
yedek puan gösteriyor. Fark yalnız beceri yazma yüzeyinde.

PORT EDİLMEDİ: mobildeki tek çağrı yeri `mobile/src/game/skillLibrary.tsx` ve
o dosya şu an başka bir oturumun açık işi (beceri kütüphanesi portu). Aynı
dosyaya dokunmak onların yarım işini kırar. Kütüphane oturumu bittiğinde
eklenecek tek şey: sağlayıcı/ağ hatasında aynı gövdeyi `/api/assess/queue`e
POST etmek ve `assess.queued` benzeri bir satır göstermek.

### 11.13 `free_sentence` turu mobilde yanlış çiziliyordu — KAPANDI

Sunucu "Cümle Kur" turunu üretiyor (`lib/session` `free_sentence`): iki kelime
veriliyor, öğrenci onlarla cümle yazıyor, hakem `/api/assess`. Koşullar —
öğrencinin gücü `strong`, oturum başına en çok 2 tur, ve `chatConfigured()`.
Sunucu istemciyi TANIMIYOR: aynı turu mobile de gönderiyor.

Web'de karşılığı var (`games/free-sentence-game`). Mobilin tur dağıtıcısında
YOK, o yüzden `SelfAssess`e düşüyor — yani ekranda "bu kelimeyi biliyor musun?"
kartı çıkıyor: görev söylenmiyor, ikinci kelime hiç kullanılmıyor. Üstelik
öz-değerlendirmenin cevabı `/api/answers`e `free_sentence` cevabı olarak
yazılıyor; SRS hiç sorulmamış bir alıştırmanın sonucunu kaydediyor.

HAFTALIK SINAVDA DURUM DAHA AĞIRDI ve orası KAPATILDI. `GAME_PLAN` on beşin
ikisini `free_sentence` yapıyor ve bu rastlantısal değil, sabit: sağlayıcı
açıkken HER haftalık sınavın iki sorusu mobilde yanlış soruluyordu. Çözüm
sunucuda zaten vardı — sağlayıcı kapalıyken uygulanan `typing` ikamesi.
İstemci artık çizemediğini söylüyor (`/api/weekly?skipGames=free_sentence`) ve
sunucu o yedeğe düşüyor; sınav on beş tur kalıyor, oyun mobile eklendiğinde
parametre kaldırılır.

NORMAL OTURUM yolu duruyor: orada `free_sentence` `pickGame` içinde, altı
parametreli `buildSession`ın derinliğinde seçiliyor ve aynı bayrağı oraya
taşımak imzayı büyütüyor. Ayrıca oradaki koşullar dar (yalnız `strong` kelime,
oturumda en çok iki, meydan okuma dalgalarında hiç), yani haftalık sınavın
kesinliği yok. Üç yol var ve seçim ürün kararı:
  1. SUNUCU SUSTURSUN — istemci neyi çizebildiğini söylesin (`?can=` gibi) ve
     `free_sentence` yalnız onu bilen istemciye gitsin. En temizi ama sözleşme
     değişikliği.
  2. MOBİL ATLASIN — tur çizilmeden geçilsin. Küçük ama "atla" yolu cevabı da
     yazmamalı, o da `GameScreen`in cevap kaydına dokunmayı gerektiriyor.
  3. MOBİLE PORT — AI puanlı yazma turunu eklemek. Bu turun kuralının tersi
     (Android referans), yani ayrı bir ürün işi.

Bugünkü hâl ölçüldü, uydurulmadı: mobil dağıtıcı on bir oyunu tanıyor
(choice, artikel, truefalse, typing, cloze, plural, listen, scramble, order,
translate, match) + `intro`; web on üçü tanıyor. Fark yalnız `free_sentence`.
`speak` de iki tarafta dağıtıcıda yok ama o yalnız yürüyüş modunda üretiliyor
ve orada kendi oynatıcısı var — sorun değil.

#### Kapanış (bu tur)

Yeniden ölçüldü ve HÂLÂ CANLIYDI: `/api/session` ucunda `skipGames` diye bir
süzgeç yoktu (yalnız `skip`, o da kelime atlıyor) ve sunucu turu sağlam
kelimede, AI açıkken, oturumda en çok iki kez karışık tura koyuyor. Mobil
`pickRound` `free_sentence`i tanımadığı için tur bilinmeyen oyun dalına
düşüyor ve `SelfAssess` olarak çiziliyordu: kullanıcı "hatırla → cevabı gör →
zorlandım/anladım" kartı görüyor, hiç cümle yazmıyor ve yazmadığı bir şeyi
kendi kendine değerlendiriyordu.

Üç seçenekten İKİNCİSİ uygulandı (turu mobile hiç göndermemek), çünkü aynı
çözüm haftalık sınav ucunda zaten vardı ve kodda kurulu bir kalıptı:

  - `/api/session` artık `?skipGames=` alıyor. Ayıklama `GAME_LABEL_KEYS` ile,
    `PLAYABLE_GAMES` ile DEĞİL: ikincisi tek-oyun pratiğinin listesi ve
    `free_sentence` orada yok, onunla süzmek istenen adı sessizce düşürürdü.
  - Süzgeç `loadSession` → `buildSession` → `composeRounds` → `pickRound`
    zincirinden geçiyor ve `pickRound`ta İKİ yerde etkili: aday kümeye hiç
    eklenmiyor, ayrıca `avoid` boşalınca yapılan geri düşüşten de muaf -
    oynanamayan oyun hiçbir koşulda geri gelmemeli.
  - Mobil `fetchSession` her çağrıda `skipGames=free_sentence` gönderiyor.

Kapı: `parity-check` 18. bölüm üç şeyi denetliyor - mobil oturum çağrısı,
mobil haftalık çağrısı ve ucun süzgeci. Biri kalkarsa kapı söylüyor.

Oynatıcı yazmak (birinci seçenek) hâlâ açık bir iş: tur webde var ve AI
hakemli yazma mobilde hiç yok. Bu kapanış "mobil artık YANLIŞ bir şey
göstermiyor" demek, "mobil de oynuyor" demek değil.

### 11.14 Ders ikonu: alan çalışıyor, ÇİZİMİ iki platformda da yok

`LESSON_ICONS` 65 konu simgesi tanımlıyor ve yorumu ne için olduğunu söylüyor:
"yol haritasındaki düğüm simgesi — dersin konusunu tek bakışta söylüyor".
İçerik de bunu dolduruyor (780 dersin hepsinde bir `icon` var).

ALAN ÖLÜ DEĞİL: `lib/cando-map` onu okuyup dersi bir can-do temasına
(social/service/work) yerleştiriyor ve `check-content` değerin kayıt
defterinde olduğunu doğruluyor. Sınıflandırmayı sunucu yaptığı için iki
platform da aynı gruplamayı görüyor.

ÇİZİLMEYEN kısım görsel olan: Patika düğümü hem webde hem Androidde öğenin
TÜRÜNÜ gösteriyor (kitap/kulaklık/kalem), dersin KONUSUNU değil. Yani burada
parite YOK DEĞİL - iki platform eşit biçimde eksik.

Web'de bu iş için 73 tema ikonu bileşeni yazılmış (`BabyIcon`, `BreadIcon`,
`BusIcon`…) ve hiçbiri hiçbir bileşende kullanılmıyor. Paket boyutuna etkisi
yok (tek tek export, paketleyici eliyor); maliyeti okunabilirlik. SİLİNMEDİ:
kayıt defterinin yorumu bu bileşenlerin o liste için yazıldığını söylüyor,
yani planlanmış bir işin yarısı.

BAĞLAMAK PORT DEĞİL, TASARIM İŞİ: webde eksik olan tek şey ad→bileşen
haritası, ama Androidde o 60 küsur ikonun kendisi yok (mobil ikon kümesi 50
ve tamamı arayüz ikonu). Android referans olduğu için webe tek taraflı eklemek
de yeni bir ayrışma yaratırdı. Karar Samet'in.

### 11.15 Ses tabloları ölçüldü; rozet kutlaması webde var, Androidde yok

`lib/sfx` yorumu "yürüyüş modunun üç sesi — mobille birebir aynı tablo" diyor.
İDDİA ÖLÇÜLDÜ ve doğru: `micon` (4 nota), `micoff` (4), `premium` (6) — her
satır, her frekans, her zamanlama iki tarafta aynı.

Geri bildirim sesleri de simetrik ve ikisi de kendi sıralamasını yorumluyor:
webde `vibrate(kind)` önce `play(kind)` çağırıyor (masaüstünde titreşim yok,
ses tek geri bildirim), mobilde `haptic(kind)` önce haptiği tetikleyip sonra
`sfx(kind)` çağırıyor. Aynı tasarım, aynada.

Cue kümesi farkı (web 13, mobil 7) çoğunlukla YÜZEY farkı: `start`, `perfect`,
`stage` oturum oynatıcısında çalıyor ve mobilde karşılığı yok - küçük bir his
farkı, ses dosyası gerektirmiyor.

`danger` ve `record` bu kayıt yazıldığında "web'e özel" sayılıyordu çünkü
yalnız meydan okuma ve boss oynatıcılarında çalıyorlardı. BOSS ARTIK MOBİLDE
DE VAR (§11.25) ve iki cue de mobilde yok, yani ikisi artık gerçek fark:

  - `danger` (son saniyelerde saniyede bir tık) mobil boss ekranında YOK.
  - `record` (rekor kırıldığında yükselen dörtlü) yerine mobil `finish`
    çalıyor - eksik ses değil, DAHA AZI: kapanış kadansı, kutlama değil.

İkisini de eklemek teknik olarak açık ve yolu belli: notaları web
`lib/sfx`ten aynen almak (`record`: 523.25/698.46/880/1174.66 arpej + altta
tutulan 261.63), `mobile/src/lib/sfxNotes.ts`e yazmak, sonra
`python3 mobile/scripts/render-sfx.py` ile iki paketin mp3'lerini üretip
`--kotlin` ve `--swift` çıktılarını native dosyalara yapıştırmak. Bağımlılıklar
bu makinede HAZIR (numpy 2.5.3, lame /usr/bin/lame) ve
`mobile/__tests__/sfxNotes.test.ts` üç kopyanın eşitliğini zaten denetliyor.

YAPILMADI çünkü sesin kendisi doğrulanamıyor: üretilen mp3'ü dinleyemem ve
native tabloları yapıştırmak iki platformun ses yolunu değiştiriyor. Kazanç
tek ekranda tek ses, riski iki native dosya. Karar Samet'in - notalar ve
komut yukarıda, iş bir turluk.

GERÇEK BOŞLUK: `unlock`. Web'de rozet açılışının kendi kutlaması var
(`achievement-unlock`): sıraya alınmış tek rozet kartları, ikiden çoğunda
toplu kart, kapatılabilir, sesli. Android'de böyle bir an HİÇ YOK - rozet
yalnız Başarımlar tahtasında dolu görünüyor ve mobil ses kümesinde `unlock`
cue'su bile yok.

PORT EDİLMEDİ: kutlama bir özellik (kuyruk mantığı, iki kart düzeni, yeni bir
ses). Bu turun kuralı Android'i referans alıyor ve burada ileride olan WEB.
Karar Samet'in; not, kutlamanın Android'de en çok işe yarayacağı yeri de
söylüyor - rozetler oturum sonunda açılıyor ve mobil oturum özeti zaten
`Celebrate` bileşenini kullanıyor.

### 11.16 Maskot: iki klip ve iki ekran webde var, Androidde yok

Kullanılan mood'lar ölçüldü (bildirilen değil — webde `dance` ve `peek`
tanımlı ama hiçbir yerde çağrılmıyor, yani onlar fark sayılmaz):

    web    cheer happy idle sad sleep think thumbsup wave wow   (9)
    mobil  celebrate happy idle sad sleep thumbsup wave         (7)

`celebrate` mobilin `cheer`i, yani gerçek fark iki klip: **`think`** ve
**`wow`**.

Bu bir klip eksiği olmaktan önce bir YÜZEY eksiği: webin `think`i kullandığı
iki yerde mobilde maskot HİÇ YOK — kurs onboardingi (iki adımda) ve haftalık
sınavın giriş ekranı. `wow` ise tanıtım turunda (`intro-game`) kelime
açılmadan önce duruyor; mobilin tanıtım turu (`rounds` `SelfAssess`)
maskotsuz.

PORT EDİLMEDİ ve sebebi tek cümleyle: mobile maskot koymak, mobilde OLMAYAN
bir ifade istiyor. Mevcut yedi klipten biriyle (idle/wave) koymak webin
anlatmak istediği şeyi anlatmaz - `think` "düşünüyorum", `wow` "bak şuna"
diyor. Yani iş kod değil ÇİZİM: iki yeni `.webp` (`think`, `wow`) ve sonra üç
satır. Android referans olduğu için webden kırpmak da yanlış olurdu; karar
Samet'in.

Not: `Mascot` bilinmeyen mood'da `idle`a düşüyor, yani bugün sessiz bir hata
yok - eksik olan ifade, kırık olan bir şey değil.

### 11.17 Aynı hatırlatma iki kanaldan gidebilir (günlük)

11.x'teki tercih onarımından sonra (bkz. commit "Mobil bildirim anahtarları
sunucudaki tercihi de yazıyor") anahtarın KAPALI yönü artık doğru çalışıyor:
kapatınca sunucu da susuyor. AÇIK yönde bir soru kaldı.

Ölçüm — üç kategorinin sunucu tarafı bugün nerede:

    lernomi-cron-reminders    KURULU     her gün 18:00 UTC   -> /api/cron/reminders
    lernomi-cron-streak       KURULMADI  (AGENTS.md)         -> /api/cron/streak-alert
    lernomi-cron-weekly       KURULMADI  (AGENTS.md)         -> /api/cron/weekly-reminder

`findReminderTargets` tarayıcı aboneliğini VEYA mobil cihaz jetonunu yeterli
sayıyor. Yani günlük hatırlatmayı uygulamadan açan kullanıcı iki bildirim
alıyor: notifee'nin seçtiği saatte kurduğu yerel bildirim ve sunucunun aynı
gün attığı push. Seri ve haftalık kategorilerde timer henüz kurulmadığı için
bugün çift yok, ama kurulunca aynı şey olacak.

Metinler de bir değil, ve fark tesadüf değil: sunucu `push.rem_streak_*`
anahtarlarını kullanıyor ve içine tekrar sayısı, rakip adı, ortak seri gibi
gerçek veriyi koyuyor; mobilin yerel metni sabit (`notif.streak_body`).

DÜZELTİLMEDİ, çünkü hangi kanalın kazanacağı ürün kararı ve ikisi de bir şey
kaybettiriyor:

  a) Yerel kalsın, sunucu mobil jetonuna atmasın. Çevrimdışı da çalışır ve
     Android'in bugünkü davranışı bu (referans o). Ama sunucunun zengin
     metnini ve sayılarını kaybeder, ayrıca sunucunun "bu kullanıcı yerelde
     kuruyor" diye bileceği bir alan yok - şema işi.
  b) Sunucu kazansın, mobil yerel zamanlamayı bıraksın. Metin zenginleşir ve
     web ile birebir aynı olur; ama bildirim FCM'e ve canlı jetona bağlanır,
     uçakta ya da jeton yenilenirken hiç gelmez.
  c) İkisi kalsın, gövde farklılaşsın (yerel "hadi başla", sunucu "37 kelime
     bekliyor"). Çift bildirim kalır; en kötüsü.

Bugün zarar tek kategoriyle sınırlı ve gözle görülür bir hata değil - fazladan
bir nudge. Seri/haftalık timer'ları kurulmadan önce karar verilmesi gerekiyor,
yoksa üç kategoride birden çift olur.

### 11.18 Cevap eşleştirmesi: webin kalan Almanca varsayımları

Ölçüm — mobil eşleştirici dile bakıyor, web büyük ölçüde Almancaya sabitti.
İkisi üç noktada eşitlendi (commit "Web cevap eşleştirmesi dile bakıyor"):
tanımlık tablosu, tanıyıcı noktalama tablosu, kesme işareti. Sonra a ve b de
port edildi (commit "Boşluksuz okumalar webe de geldi"). Kalan maddeler ve
nedenleri:

**a) Boşluksuz ikinci okuma — PORT EDİLDİ.** Tanıyıcı Almanca bileşikleri
ayırıyor ("Anrufbeantworter" → "Anruf Beantworter"; havuzda 2313 uzun bileşik).
Web artık aynı okumayı yapıyor.

**b) Ham harf okuması — PORT EDİLDİ.** Sayı katlaması YAPILMADAN sıkıştırılmış
karşılaştırma; webin `normalize`ı sayıya dokunmadığı için karşılığı hazırdı.
Gerekçesi kayıtlı: tanıyıcı bileşiği bölünce ikinci parça sayı sözcüğü
olabiliyor ("Fasnacht" → "Fasn acht" → katlanmış "fasn 8" artık orijinaline
benzemiyor).

**a/b ile birlikte ÇIKAN VE İKİ TARAFTA DA DÜZELTİLEN hata:** bu iki okumada
boşluk sınırı kalktığı için içerme tehlikeli. Hedef "was", söylenen "das
Wasser" → sıkıştırılmış biçim hedefi içeriyordu ve yanlış cevap doğru
sayılıyordu; Android bunu baştan beri yapıyordu. Ders havuzundaki 5164 başlık
ölçüldü: 3 harf eşiğinde 1310 hedef başka bir başlığın içinde geçiyor, 12
harfte 22 ("der Chef" ⊂ "die Chefin" gibi türevler). Bu iki okumanın içerme
eşiği ayrıldı ve 12 yapıldı - bölünmüş bileşik zaten EŞİTLİKLE yakalanıyor,
içerme yalnız bölünme artı dolgu sözcüğü bir aradayken gerekiyor ve orada
hedef hep uzun. Referansı düzeltmek gerekti: iki taraf yine eşit.

**c) İngilizce sayı sözcükleri — PORT EDİLDİ.** Modül `lib/german-numbers.ts`
adından `lib/numbers.ts`e taşındı ve mobil `mobile/src/lib/numbers.ts` ile
birebir aynı: İngilizce ölçek ("two hundred and fifty"), tireli/boşluklu
bileşik ("twenty-one" / "twenty one"), sıra sayısı ("first" → "1st", kardinal
kanonundan AYRI) ve tire/kesme komşuluğu koruması ("one-way street",
"one's mind" sayı sayılmıyor).

Aynı portta Almanca tarafta da bir eksik kapandı: çarpımsal bileşikler
("achthundert" 800, "dreißigtausend" 30000, "zweihundertfünfzig" 250) webde
hiç çözülmüyordu; mobilin `deScale`i çözüyor ve "Jahrhundert"/"Tausendfüßler"
gibi sayı içeren normal sözcükleri bozmuyor.

`parity-check` 16. bölümü iki dosyanın GÖVDESİNİ satır satır karşılaştırıyor
(başlık yorumu hariç), yani modül bir daha ayrışamaz.

**f) `foldSentence` ve `normalizeSpoken` hâlâ Almancaya sabit.** İkisi de
`toLocaleLowerCase("de-DE")` yapıyor ve umlaut katlıyor; `lib/sentence-match`
(cümle kurma/yazma görevleri) ve `lib/speech` bunları kullanıyor. Sayı tarafı
bu turda dile açıldı ama bu iki katlamaya `"de"` AÇIKÇA geçiliyor - sessizce
İngilizceye açmak asimetri üretirdi (küçültme Almanca, sayı İngilizce). Mobil
karşılıkları (`lib/textFold` `foldCompare`, `foldCase`) dile bakıyor. Ayrı tur.

**d) Geniş noktalama kümesi — PORT EDİLDİ.** Küme yalnız `.,!?;:` idi; artık
mobil `lib/textFold` `PUNCT` ile aynı (tırnak, tire, üç nokta, parantez, ok) ve
simge tablosu da geldi (`%`→prozent/percent, `€`→euro, `&`→und/and).

Tire en önemli eksikti: tanıyıcı "t-shirt" yerine "t shirt", "U-Bahn" yerine
"U Bahn" yazıyor ve havuzda 142 İngilizce, 14 Almanca tireli başlık var -
hiçbiri eşleşmiyordu.

Blokçu sanılan şey ölçünce blokçu çıkmadı: `scramble-game` karo dizilişini ve
hedefi AYNI `normalize`dan geçiriyor, yani küme genişleyince iki tarafa aynı
boşluk giriyor ve eşitlik bozulmuyordu. Yine de kurala bağlandı - iki taraf da
`foldTight` ile karşılaştırılıyor (mobil `game/rounds` 618/633 de böyle), böylece
noktalama kümesi bir daha değiştiğinde karo oyunu tesadüfe kalmıyor.

Aynı ölçümde `acceptedForms` da Almancaya sabit çıktı: `normalize`ı dilsiz
çağırıyordu (simge tablosu Almanca geliyordu) ve baştaki tanımlığı
`der|die|das` ile düşürüyordu. Dile bağlandı.

**e) Kısaltmalar - iki platformda da yok.** İngilizce derslerde 338 konuşma
adımı kısaltma taşıyor (181 repeat, 157 produce: "I'm from Turkey.",
"What's your name?"). Kesme işareti artık iki tarafta da siliniyor, yani
"I'm" ile "Im" aynı; ama "I am" hâlâ farklı bir dize. Tanıyıcı ya da kullanıcı
açık biçimi verdiğinde cevap yanlış sayılıyor.

Kaynakta beş `repeat` adımında `accept` alternatifi yazılı (ikisi tam bu
kısaltma sorunu: "I am waiting at the bus stop."). Ama `accept` repeat'te
İKİ İSTEMCİDE DE bilerek okunmuyor - web `lesson-player`ın satırı açık:
`[e.target, ...(e.kind === "produce" ? (e.accept ?? []) : [])]`. Yani o beş
alternatif ölü veri ve düzeltme yeri istemci değil:

  1. Kısaltma açma tablosu (m→am, re→are, ve→have, ll→will, nt→not) iki
     tarafın katlamasına girer; deterministik olduğu için iki tarafa da aynı
     uygulanır ve yanlış pozitif üretmez ("his" kesme taşımadığı için "he is"
     olmaz). En kapsamlı çözüm, 338 adımı birden düzeltir.
  2. Ya da o beş adımın `kind`i `produce`a çevrilir - ama repeat "aynısını
     söyle" demek, paraphrase kabul etmek egzersizin kendisini bozar.

Karar Samet'in; ölçüm 1'i işaret ediyor.

### 11.19 Cümle hakemi ve cevap yükü: web ileride, Android geride

Bu ölçüm §11.18(f) için mobil karşılığı ararken çıktı ve yön TERS: burada web
ileride. Ölçülenler:

**a) Çevir turunun hükmü.** Web `lib/sentence-match` üç katmanlı bir hakem:
katlama, en uzun ortak alt dizi ile kelime hizalama, sonra karar. Sonuç
`exact | spelling | order | wrong` ve SRS kalitesi 5 / 4 / 3 / 1, artı kelime
kelime işaret (`missing`, `extra`, `moved`, `typo`) — ekranda fark vurgusu
buradan çıkıyor. Mobil `game/rounds` `TranslateRound` ise İKİLİ:
`foldCompare(val) === foldCompare(s.de)` ya da alternatiflerden biri; başka
hiçbir şey yok.

Sonucu iki yerde görünüyor: (1) bir harf yazım hatası Androidde tam yanlış
sayılıyor ve kelime lapse ediyor, webde kalite 4 alıyor ve kelime düşmüyor;
(2) sıra hatası Androidde "yanlış", webde kalite 3 ve "kelimeler doğru, cümle
kurulamamış" mesajı.

**b) Cevap yükü.** Mobil `game/session` `AnswerOut` şu alanları taşıyor:
`wordId, game, correct, latencyMs, quality?, detail?`. `quality` TANIMLI ama
mobilde HİÇBİR YERDE atanmıyor (ölçüldü: tek geçtiği yer tip tanımı).
`errorType` ise hiç yok — web `Answer` tipinde var, uç
(`/api/answers`, `/api/exam`) doğruluyor ve `lib/error-analytics` onu
kullanıyor. Yani yalnız Androidde çalışan bir kullanıcının hata tipi dökümü
BOŞ ve SRS'i yalnız doğru/yanlış görüyor.

Üç ayrı katman gerekiyordu ve sırası önemli:

  **1. Saf hakemin portu — YAPILDI.** `mobile/src/lib/sentenceMatch.ts` web
  kopyasıyla gövde gövde aynı; saf yardımcılar `mobile/src/lib/errors.ts`e
  alındı (web `lib/errors`in yalnız saf parçası: tip birleşimi, `levenshtein`,
  `classifyOrder`). `levenshtein`in `game/skillQuiz` içindeki ÜÇÜNCÜ kopyası
  da kaldırıldı. `TranslateRound` artık hakemi kullanıyor ve kabul kuralı web
  ile birebir: `quality >= 3 && verdict !== "order"`. Yani tek harf yazım
  hatası artık cümleyi tam yanlış saymıyor. `parity-check` 17. bölümü ve
  `mobile/__tests__/sentenceMatch.test.ts` bunu bağlıyor.

  **2. Cevap yükü — YAPILDI.** `AnswerOut`a `errorType` eklendi ve `Done`
  sözleşmesi `(correct, extra?: DoneExtra)` oldu; on tur web karşılığıyla aynı
  tipi gönderiyor (`lib/errors` `miss` portu). Çevir turu `quality`yi de
  gönderiyor. `parity-check` 18. bölümü tur→tip tablosunu karşılaştırıyor.

  İpucu kırpması da eklendi (bkz. §11.21): `HintRow`un durumu tur bileşenine
  çıktı, çevir turu kaliteyi 3'e kırpıyor ve `hintUsed` gönderiyor.

  **3. Fark vurgusu arayüzü — YAPILDI.** `mobile/src/ui/TokenDiff.tsx` web
  `components/feedback/diff-text` karşılığı; çeviri turunun geri bildirimi artık
  hükmü ve kelime kelime farkı birlikte gösteriyor, yanlışta "yazdığın" satırı
  da (yalnız gerçekten fark varken). `diff` verildiğinde `answerDe` satırı
  çizilmiyor - ikisi aynı şeyi iki kez söylerdi.

  BİÇİM RN'in verdiği kadar: web noktalı alt çizgi kullanıyor, React Native'de
  `textDecorationStyle` yalnız iOS'ta işliyor. Ayrım biçim çiftiyle kuruldu -
  eksik kelime düz alt çizgi, yazım hatası alt çizgi + eğik. İkisi de renkten
  bağımsız ayrışıyor. Sözlük anahtarları (`diff.*`, `match.*`,
  `rounds.you_wrote`) web-özelden mobil kaynağa taşındı ve `i18n-pull` ile
  tabana çekildi. `parity-check` 17. bölümü işaret→anahtar tablosunu ve hüküm
  anahtarlarını karşılaştırıyor.

Üç adımın hepsi bitti.

Yan bulgu, web tarafında DÜZELTİLDİ: katlama sayı sözcüklerini rakama
indirdiği için "at six o'clock" ile "at 5 o'clock" arasındaki fark tek
karakter ("6" ↔ "5") oluyordu ve hakem bunu YAZIM HATASI sayıp kalite 4
veriyordu - yanlış saat yazan öğrenci neredeyse doğru sayılıyordu. Rakam ile
rakam arasındaki fark artık hiçbir zaman yazım hatası değil.

### 11.20 Cloze "yazarak" modu Androidde hiç olmuyordu

Sunucu boşluk doldurma turunu iki biçimde veriyor ve seçim SAĞLAMLIĞA bağlı:
`lib/session` `mode: Math.random() < clozeTypeChance(strength) ? "type" : undefined`
(`lib/ladder`: sağlam kelimede yarı yarıya, oturmuşta dörtte bir). Web bunu
okuyor ve şıkları kaldırıp metin girişi çiziyor.

Mobilin `Round` tipinde `mode` alanı HİÇ YOKTU: alan sessizce düşüyor ve tur
her seferinde şıklarla çiziliyordu. Yani kademeli zorlaştırma Androidde hiç
gerçekleşmiyordu - öğrenci sağlam bir kelimeyi yazarak değil tanıyarak
geçiyordu ve SRS de o kolay kanıtı görüyordu.

Düzeltildi: `mode?: "type"`, yazarak modda metin girişi + kontrol düğmesi,
katlamalı karşılaştırma (boşluksuz yedekle) ve hata tipi `classifyTyping`.
Şıklar sunucudan yine geliyor çünkü basamak inişi onlara dönüyor; yalnız
çizilmiyorlar. `rounds.cloze_typed` anahtarı mobil sözlüğe eklendi ve
`i18n-pull` ile tabana çekildi (webdeki web-özel kopyası kaldırıldı - artık
tek kaynak mobil). `parity-check` 18. bölümü iki istemcinin de `mode`u
okuduğunu denetliyor.

### 11.21 İpucu Androidde bedavaydı

Sunucu SRS kalitesini `hintUsed` ile belirliyor: `lib/srs`
`grade(game, correct, latencyMs, hintUsed)` ipucu kullanıldıysa hızdan
bağımsız 3 veriyor, kullanılmadıysa 5'e kadar çıkıyor. Web ipucu sunan her
turda bunu gönderiyor.

Mobil `AnswerOut`ta alan HİÇ YOKTU ve `HintRow`un "gösterildi" durumu bileşenin
içinde kapalıydı. Sonuç: cevabın harf iskeletini açıp yazan kullanıcı hızlı ve
doğru sayılıp kalite 5 alıyordu. Ölçülen dört tur:

    typing     ipucu düğmesi + sunucunun `assist` bayrağı
    translate  ipucu düğmesi (webde ayrıca kaliteyi 3'e kırpıyor)
    scramble   ipucu düğmesi (bir harf yerleştirir)
    listen     üçüncü dinleyişten sonra ipucu sayılıyor (web `replays >= 2`)

Dördü de artık bildiriyor; `SelfAssess` (web `intro` karşılığı) web gibi her
zaman `hintUsed: true` gönderiyor - orada cevap zaten gösteriliyor.

ÜÇÜNCÜ SESSİZCE DÜŞEN ALAN: `round.assist`. Sunucu taze kelimenin ardındaki
yazma turunu `assist: true` ile işaretliyor (`lib/session`) ve web ipucu iskeletini
baştan açık gösteriyor. Mobilin `Round` tipinde alan yoktu, yani o turda ne
iskele görünüyordu ne de ipucu sayılıyordu. (Önceki ikisi: `mode` §11.20,
`errorType` §11.19.)

`parity-check` 18. bölümü dört turun ipucu bildirimini ve `assist` alanının
iki istemcide de okunduğunu denetliyor.

Kalan: web `order-game`de ipucu var, mobil `OrderRound`da ipucu düğmesi HİÇ
YOK - bu bir eksik özellik, bildirim eksiği değil. Bedava ipucu sorunu orada
doğmuyor; düğmenin kendisi ayrı bir iş.

### 11.22 Sessizce düşen sunucu alanları — sınıfın kendisi ve kapısı

Bu turda üst üste üç kez aynı şey çıktı: SUNUCU bir alan gönderiyor, İSTEMCİ
tipinde o alan yok, alan sessizce düşüyor. Derleme kırılmıyor, istek başarılı,
hiçbir kapı bir şey söylemiyor — yalnız o bilgi hiç kullanılmıyor.

    errorType   cevap yükünde yok         -> hata dökümü boş, SRS kaba (§11.19)
    mode        cloze turunda yok         -> yazarak zorlaştırma hiç olmuyor (§11.20)
    assist      typing turunda yok        -> ipucu iskelesi hiç açılmıyor (§11.21)
    coverage    oturum metasında yok      -> seviye rozeti hiç çizilemiyor (bu madde)

Dördüncüsü de düzeltildi: `SessionMeta.coverage` eklendi ve oturum başlığına
`ui/LevelBadge` kondu (web `components/level-badge` karşılığı; renk rolleri
aynı, yüzde biçimi yerelden - Türkçe "%45", Almanca "45 %"). Aynı satıra webde
olup mobilde olmayan YENİ/TEKRAR çipi de eklendi: öğrenci bu kelimeyi ilk kez
mi gördüğünü artık görüyor.

KAPI: `parity-check` 19. bölümü web `Round` union'ının ve oturum `meta`sının
bütün alan adlarını mobil tipiyle karşılaştırıyor; webde olup mobilde olmayan
her alan ayrışma sayılıyor. Sınandı - `coverage` geri alındığında kapı onu
söylüyor. Yani bu sınıf artık sessiz değil.

İki alan bilerek listeden çıkarıldı: `partners` ve `level` yalnız
`free_sentence` turunun alanları ve o turun mobilde oynatıcısı yok (§11.13).

HİÇBİR İSTEMCİDE OKUNMAYAN üç meta alanı da ölçüldü ve ayrı tutuldu, çünkü bu
parite değil "yazılmış ama bağlanmamış":

  - `pacing` ("normal" | "light" | "review") — sunucu günlük yükü karara
    bağlıyor ve gerekçesini paketle gönderiyor, ama ne web ne mobil gösteriyor.
    Kullanıcı yeni kelime gelmediğinde sebebini hiçbir yerde görmüyor.
  - `leeches` — takılan kelime sayısı. Webde YALNIZ ilerleme ekranında
    kullanılıyor (`progress-view`), oturum paketindeki kopya okunmuyor;
    mobilde hiç yok.
  - `challengeBest` — meta'ya "başlangıç kartındaki arena kartı için"
    bindirilmiş ama hiçbir bileşen okumuyor. Mobilde hayatta kalma turu da yok.

Üçü de ürün kararı istiyor: gösterilecek mi, yoksa paketten çıkarılacak mı.

### 11.23 Oturum özeti: dört satır Androidde hiç yoktu

§11.22'deki sınıfın beşinci örneği, bu kez CEVAP YANITINDA. Web `AnswerResult`
on bir alan taşıyor; mobil `SubmitResult` yalnız üçünü tanıyordu
(`streakRepaired`, `currentStreak`, `newlyMastered`) ve geri kalanı sessizce
düşüyordu. Sonuç: oturum özeti dört şeyi HİÇ göstermiyordu, oysa sunucu
sayıları gönderiyordu ve web dördünü de gösteriyor:

    xpGained                 kazanılan XP        -> özetin en üstündeki sayı
    reviewsToday/dailyGoal   günlük hedef        -> çubuk + "hedefi tamamladın"
    newlyMastered            pekişen kelime      -> mobilde yalnız kutlama
                                                    eşiği için kullanılıyordu,
                                                    ekranda yazmıyordu
    dueTomorrow              yarına kalan tekrar -> "yarın N kelimenin tekrarı var"

Dördü de eklendi; metinler webin kendi cümleleri (anahtarlar web-özelden mobil
kaynağa taşındı, `i18n-pull` ile tabana çekildi, webdeki kopyalar kaldırıldı -
yani iki platform artık aynı cümleyi kuruyor, iki ayrı çeviri değil).

`wagerXp` alan olarak eklendi ama OKUNMUYOR: bahisli etap mobilde hiç yok
(ölçüldü - mobil kaynağında "wager" hiç geçmiyor). Sözleşme tam olsun diye
tipte duruyor ve sebebi yorumda.

KAPI: `parity-check` 19. bölümü artık üç yüzeyi karşılaştırıyor - tur alanları,
oturum meta alanları ve cevap yanıtı alanları.

### 11.24 Çağıranı olmayan uçlar — ve kapısı

§11.22'deki sınıfın kardeşi: orada sunucu bir alan gönderiyor ve istemci
tanımıyordu; burada bir UÇ var ve hiç kimse çağırmıyor. İkisi de sessiz:
derleme geçiyor, lint geçiyor, tipler tutuyor.

Altmış yedi ucun hepsi tarandı (yorumlar hariç — uç yolları yorumlarda da
geçiyor ve yorumdaki atıf çağıran değil). Dokuz ucun repoda çağıranı yok;
yedisi DIŞARIDAN çağrılıyor ve doğru durumda:

    /api/auth/apple/notifications   Apple sunucudan sunucuya
    /api/cron/reminders             systemd timer (+ cron-call.sh, repo dışı)
    /api/cron/streak-alert          systemd timer (deploy sonrası kurulacak)
    /api/cron/summary               systemd timer
    /api/cron/weekly-reminder       systemd timer (deploy sonrası kurulacak)
    /api/cron/assess                systemd timer
    /api/premium/webhook/[[...]]    mağaza (Play/RevenueCat)

Kalan ikisi gerçekten çağıransız:

**`/api/plan`** — zaten belgeliydi (ucun kendi yorumunda ve §7'de): tek
istemcisi Öğren sekmesindeki "bugünkü plan" satırıydı, mobilde karşılığı
olmadığı için parite turunda kaldırıldı. `lib/plan` ve uç duruyor, e2e
`buildPlan`i doğrudan deniyor. Yeni bir bulgu değil; kayıtta kalıyor.

**`/api/premium/consume`** — YENİ BULGU. Tur başına kotayı sayan TEK yer:
yorumu "kotanın birimi kullanıcıya söylenen şey olmalı" diyor ve cepte
yürüyüşü "günde N TUR" diye sayıyor. Çağıranı olmadığı için `pocket_walk`,
`weekly_exam`, `speaking` ve `writing` sayaçları HİÇ ARTMIYOR.

Bugün zarar yok ve sebebi ölçüldü: ücretsiz katmanda `pocketWalksPerDay` sıfır,
yani `canPocketWalk` sayaca bakmadan önce `premium_only` ile kesiyor; premium
tarafta `fairUse` aynı hiç artmayan sayaca bakıyor ama premium pasif. Yani
kilit bugün doğru çalışıyor, SAYAÇ çalışmıyor. Premium açıldığında adil
kullanım tavanı hiç dolmaz.

Çağrı-başına sayılan kotalar ayrı ve çalışıyor: `/api/tts`, `/api/stt` ve
`/api/assess` kendi `bumpUsage`larını çağırıyor (`tts_calls`,
`pocket_walk_words`, `ai_assess_calls`).

Ucu bağlamak ürün kararı - bağlanınca tavan gerçekten dolmaya başlar. Kayıt
burada; kapı da eklendi.

KAPI: `scripts/check-endpoints.mjs` (+ `npm run check:endpoints`, CI'da "Uç
çağıranları"). Her uç ya kaynakta çağrılıyor olacak ya da betikteki listede
SEBEBİYLE yazılı olacak. Liste yalnız kısalabilir: bir ucu listeye eklemek onu
bağlamamayı BELGELEMEK demek. Denetim iki yönlü - listede olup artık çağrılan
bir uç da hata veriyor, yani liste bayatlamıyor. Sınandı: `/api/plan` listeden
çıkarıldığında kapı onu söylüyor.

### 11.25 İstemci-uç sözleşmesi, ters yön

§11.24 "ucun çağıranı var mı" diye sordu; bu madde "hangi İSTEMCİ çağırıyor"
diye soruyor. Altmış yedi ucun kırkı iki istemcide de kullanılıyor. Kalanlar:

**Yalnız webde (21)** — çoğu doğru durumda (biri de bilerek: hayatta kalma): `admin/*` (yönetici panosu),
`auth/apple/notifications` + `cron/*` + `premium/webhook` (dışarıdan),
`push/subscribe` (tarayıcı aboneliği; mobil `push/device` kullanıyor),
`plan` + `premium/consume` (§11.24), `certificate/[id]` (sertifika görüntüsü),
`errors` + `growth` (web telemetrisi), `premium/referral` (mobil aynı veriyi
`premium/status` içinden alıyor - eksik değil), `assess/queue` (§11.12),
`pronounce` (`lib/pronounce-client` çağırıyor; mobil kendi native tanıyıcısını
kullanıyor).

Üçü GERÇEK yüzey eksiği:

  - **`/api/words/known`** — DÜZELTİLDİ (aşağıda).
  - **`/api/challenge`** — süreye karşı hayatta kalma turu (`challenge-player`).
    Mobilde ekran yok ve OLMAMASI KARAR: yukarıdaki "Bilerek farklı kalanlar"
    listesinin ilk maddesi, web `learn-hub` yorumu da aynısını söylüyor
    ("hayatta kalma mobilde YOK - web'e özel bir mod"). Bu madde ilk yazıldığında
    "yüzey eksiği" diye sınıflandırılmıştı; YANLIŞTI, düzeltildi. Portlamaya
    başlanmadan önce ölçüldü ve karar bulundu. `meta.challengeBest` mobilde bu
    yüzden anlamsız (§11.22) - eksik değil, karşılığı yok.
  - **`/api/boss`** — modül patronu (`boss-player`). Mobilde ekran YOKTU ve
    olmaması bir karar DEĞİLDİ (ne "bilerek farklı" listesinde ne web
    yorumlarında böyle bir not var; webin kendi yorumu yalnız GİRİŞİN yerini
    tartışıyor). PORT EDİLDİ, aşağıda.

#### `/api/boss` — modül patronu (hız turu)

`mobile/src/screens/BossScreen.tsx` eklendi (web `boss-player` karşılığı):
süreli tur, doğru cevap süre ekliyor, yanlış siliyor, süre bitmeden bitiren
modül tacını alıyor. Tur döngüsü mevcut `RoundView`dan geliyor, yani oyun
türlerinin hiçbiri yeniden yazılmadı.

SÜRE KURALLARI SUNUCUDAN: saniye, bonus, ceza ve tavan yanıtla geliyor ve
istemcide ikinci bir kopya tutulmuyor - ucun kendi yorumu da bunu şart
koşuyor ("dengeyi değiştirdiğimizde iki yerde birden değiştirmeyi hatırlamak
demekti").

GİRİŞ YERİ WEB İLE AYNI ve sebebi de aynı: modül sınavı bittikten SONRA, sonuç
ekranının altında sessiz bir satır. Web bunu bir kez yol haritasına koymuş ve
geri almış - yorumu duruyor: "orada ikinci bir sınav gibi okunuyordu, oysa
altmış saniyede on beş kelime bir şey KANITLAMIYOR; sınavdan sonra yeri doğru:
ölçüm bitti, bu bir oyun". Aynı hatayı mobilde tekrarlamamak için giriş
`ExamScreen` sonucuna kondu, `PathScreen`e değil, ve yalnız MODÜL sınavında
görünüyor.

İki bilinçli fark, ikisi de mobilin verdiğiyle sınırlı:
  - Webin son saniyelerdeki tık sesi yok: mobil ses tablosunda `danger` diye
    bir tür yok ve eklemek native tabloları yeniden üretmeyi gerektiriyor
    (`scripts/render-sfx.py`, iki paket). Sayaç görünüyor.
  - Kaybetme kartındaki saat ikonu yerine tekrar ikonu: mobil ikon kümesinde
    saat yok, "süre bitti, yeniden dene" aynı şeyi söylüyor.

Yirmi beş sözlük anahtarı web-özelden mobil kaynağa taşındı ve `i18n-pull` ile
tabana çekildi (taban 1203); webdeki kopyalar kaldırıldı.

Sunucunun bu turda ürettiği yedi oyun türü (choice, artikel, listen, typing,
truefalse, scramble, cloze) ölçüldü ve yedisi de mobil `pickRound`ta var, yani
"içerik istemcinin çizemediği bir tür gönderiyor" sınıfına düşmüyor. Boss
turlarında cloze her zaman ŞIKLI: `mode` yalnız `buildSession`da veriliyor,
`makeRound`ta değil.

**Yalnız mobilde (6)** — hepsi doğru: `account/apple-code` (native Apple
girişi), `config` (mobil çalışma zamanı ayarı), `me` / `premium/status` /
`immersion` (web aynı veriyi sunucu bileşeninde doğrudan üretiyor),
`push/device` (FCM).

#### `/api/words/known` — "Bunu zaten biliyorum"

Web `intro-game`de baştan beri bir düğme var: bildiği bir kelimeyi gören
kullanıcı onu tekrar kuyruğuna hiç sokmadan pekişmiş sayabiliyor. Mobilde
HİÇ YOKTU - Android kullanıcısı bildiği kelimeyi her tekrarında yeniden
görüyordu.

Eklendi: yeni kelime turunda (`intro`) ikinci sıradaki sessiz düğme.
`markKnown()` ucu çağırıyor, hata yutuluyor (çevrimdışıysa tur yine ilerliyor,
web de öyle) ve `DoneExtra.skip` ile bu tur için CEVAP KAYDEDİLMİYOR - web
`onDone([])` ile aynı şeyi söylüyor. Metinler webin cümleleri; anahtarlar
mobil kaynağa taşındı ve `i18n-pull` ile tabana çekildi.

### 11.26 ZORUNLU İÇERİK KAPISI ANA DALDA KIRMIZI (oturumlar arası bulgu)

Bu bir parite maddesi değil; kapı kapsamı ölçülürken çıktı ve kaydedilmeden
geçilemez.

`data/content/SPEC.md` ilk satırında şunu söylüyor: bütün öğretici içerik
"**tek bir doğrulayıcıdan** geçer: `npm run test:content`" ve "doğrulayıcı
yeşil olmadan içerik depoya girmez". Ölçüldü:

  1. `test:content` CI'da HİÇ ÇALIŞMIYOR. `checks.yml`in çalıştırdığı 24
     adımın içinde yok; kural yalnız yazının kendisine dayanıyor.
  2. Ve bugün KIRMIZI. Uyarı bütçesi üç etikette aşılmış:

         lessons: çok anlamlı vocab tr      188 > 81   (iki kattan fazla)
         lessons: lecture N adım (N–N)       31 > 25
         lessons: havuz dışı kelime N/N       5 > 4

     Taban dosyasına son dokunan commit `0915c59f` (beceri kütüphanesi), yani
     borç ÇALIŞMA AĞACINDA değil, ana dalda duruyor.

CI'ya EKLENMEDİ: kırmızı bir kapıyı CI'ya koymak ana dalı herkes için anında
kırmızıya çevirir - içerik üreten paralel oturumlar dâhil. Sıra tersi olmalı:
önce borç ya kapatılır ya `--baseline` ile BİLİNÇLİ kabul edilir (SPEC'in
kendi sözcüğü), sonra adım eklenir. Bu bir ürün/içerik kararı ve içeriği yazan
tarafın kararı.

Öneri, sırasıyla: (a) `npm run test:content -- lessons` ile üç etiketin
hangi derslerden geldiğini çıkar, (b) "çok anlamlı vocab tr" 81'den 188'e
neden çıktı - yeni derslerin sözlükçesi mi yoksa kuralın kendisi mi
sıkılaştı, (c) karar verilince `checks.yml`e "İçerik doğrulaması" adımı ekle;
o adım eklenmeden SPEC'in birinci cümlesi yalnız bir niyet.
