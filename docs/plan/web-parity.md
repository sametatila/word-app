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
| `OnboardingScreen` | `/setup` | **eş** | Akış artık BİREBİR aynı beş ekran: `welcome → lang → course → level → goal`, her ekranda tek karar. Web'in üç fazlalığı düştü — ad (kayıt formu zaten soruyor), ses seçici (kurstan türüyor), amaç adımı (`profiles.goal` hiçbir yerde okunmuyordu). "Hazır" özeti de kalktı: oturum açık kullanıcı son adımdan doğrudan `/learn`e gidiyor |
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

VAZGEÇİLDİ: ölçüm gürültülü. 345 aday çıkıyor ve tek başına
`components/icons.tsx` 47 tanesini veriyor - o dosyanın kullanılmayan ikonları
BİLEREK duruyor ve zaten §11.14'te yazılı. Kapı, "biliyoruz" diyen uzun bir
muafiyet listesine dönüşürdü; muafiyet listesi kapının kendisinden uzun
olduğunda kapı bir şey söylemez.

ÖLÇÜM SAĞLAM ÇIKTI - ilk yazdığım gerekçe yanlıştı ve düzeltildi. "Prototip
güvenilmez, `CourseId` dört dosyada geçmesine rağmen listede çıkıyor" demiştim.
İki bağımsız uygulama (belirteç indeksi ve ad ad regex) 346/345 ile hemfikir,
ve `CourseId` tek tek bakıldığında GERÇEKTEN kullanılmıyor: öteki üç geçişin
ikisi YORUM içinde (`walk-player`, `mock-exams/types`), üçüncüsü ise başka bir
ad (`lessons/index`te `isCourseId`). Yani sayı doğru, vazgeçme sebebi tek:
gürültü.

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

**KAPANDI (bkz. §11.167).** Sonraki turlarda uç yedi alanı birden göndermeye
başladı ve Android satırı açılır ayrıntıyı, örnek cümleyi, tekrar takvimini,
unutma sayısını ve sülük işaretini kazandı. Yukarıdaki tablo ARTIK GEÇERSİZ;
iki satır aynı yedi alanı gösteriyor ve `check:parity` §85 bunu ölçüyor.

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

**KAPANDI (bkz. §11.170).** Kutlama sonraki turlarda mobile geldi (aynı
eşik, aynı iki düzen, aynı "görüldü" bildirimi) ve eksik olan `unlock` sesi
§11.165'te eklendi. `check:parity` §86 beş ölçüyü birden tutuyor.

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

#### Sebep bulundu: taban İNGİLİZCE KURSTAN ÖNCE donmuş

Üç etiketin hepsi ders ders çıkarıldı ve kurs eksenine göre ayrıldı. Sonuç
tesadüf olamayacak kadar düzenli:

    etiket                          taban   bugün   Almanca   İngilizce
    çok anlamlı vocab tr               81     188        81         107
    lecture N adım (N–N)               25      31        25           6
    havuz dışı kelime N/N               4       5         4           1

ÜÇÜNDE DE Almanca sayı tabana BİREBİR eşit ve aşımın tamamı İngilizce
kurstan geliyor. Yani Almanca içerik hiç gerilemedi; taban İngilizce dersler
depoya girmeden önce donmuş ve o günden beri güncellenmemiş.

(Dördüncü ders etiketi `tekrar adımı payı %N` bütçe içinde: 44, tabanı da 44,
hepsi Almanca. Beceri etiketlerinin hiçbiri aşılmamış.)

Bu, "içerik özensizleşti" değil "kapı bir kursu hiç görmedi" demek ve kararı
kolaylaştırıyor:

  (a) Almanca tarafta düzeltilecek bir şey YOK - sayı tabanla aynı.
  (b) İngilizce aşımı (107 + 6 + 1) ya `--baseline` ile BİLİNÇLİ kabul edilir
      (SPEC'in kendi mekanizması) ya da İngilizce sözlükçe yeniden yazılır.
      "Çok anlamlı tr" demek Türkçe karşılıkta virgül var demek, yani
      "kapsam, ağırlık" gibi iki anlamlı gloss; 107 tanesi C1/B2 soyut
      kelimeleri ve orada tek karşılık bulmak gerçekten zor.
  (c) Karar verilince `checks.yml`e "İçerik doğrulaması" adımı eklenir. O adım
      eklenmeden SPEC'in birinci cümlesi yalnız bir niyet.

`--baseline` BU OTURUMDA ÇALIŞTIRILMADI: SPEC onu "bilinçli kabul" diye
tanımlıyor, yani içeriği yazan tarafın kararı, ve başka bir oturumun taban
dosyasını sessizce yeniden yazmak o kararı gasp etmek olurdu.

#### Beceri tarafı ölçüldü: bir etiketin borcu TAMAMEN ödenmiş, tabanı bayat

`npm run test:content -- skills` GEÇİYOR (363 uyarı, bütçe içinde). Ama tabanda
en büyük kalem duruyordu: `skills: en yok` → 1209.

O etiket bugün SIFIR uyarı üretiyor. Kural yalnız ALMANCA kurs egzersizlerinde
işliyor (`!g.en && !english`), yani Almanca sözlükçesi İngilizce karşılığı
olmayan girdiler için; İngilizce kursun kendi girdileri kuralı hiç tetiklemiyor.
Demek ki İngilizce karşılık kampanyası bitmiş ve borç kapanmış.

TABAN 1209'DAN 0'A İNDİRİLDİ. Sebep, betiğin kendi tasarım notunda yazılı:
"etiket başına tavan: hiçbir kategori büyüyemez". 1209'luk bayat tavan, o
kategorinin sessizce 1209 uyarıya kadar geri büyümesine izin veriyordu - kapı
orada hiçbir şey söylemezdi. Bu bir borç KABULÜ değil, tam tersi: kapıyı
sıkmak, ve ratchet'in kendi kuralı ("sayı yalnız aşağı inebilir") bunu
gerektiriyor.

Riski ölçüldü ve düşük: kural İngilizce kurs girdilerini atladığı için
sürmekte olan beceri kütüphanesi işi (İngilizce egzersizler) bu etiketi
tetikleyemez. Yalnız Almanca bir egzersiz İngilizce karşılıksız eklenirse
kırmızı olur - ki bugünkü standart tam olarak bunu yasaklıyor.

Üç ders etiketine DOKUNULMADI; onlar hâlâ içeriği yazan tarafın kararı.

#### Taban baştan sona denetlendi

On iki kalemin hepsi bugünkü sayıyla karşılaştırıldı:

    8 kalem   TAM EŞİT       ratchet sağlıklı çalışıyor (108, 133, 48, 33,
                             31, 44, 10 ve `en yok` 0)
    2 kalem   BAYAT          borcu ödenmiş, tavan yüksek kalmış:
                             `skills: en yok` 1209 → 0
                             `skills: intro Türkçe olmalı; Almanca harf var` 2 → 0
    3 kalem   AŞIM           üç ders etiketi; İngilizce kursun payı (yukarıda)

İkinci bayat kalem de indirildi: kural Türkçe olması gereken bir tanıtım
metninde Almanca harf arıyor (`intro Türkçe olmalı`) ve bugün hiç tetiklemiyor.
İki uyarılık tavan küçük ama aynı sınıf - ödenmiş bir borcun tavanı, geri
büyümeye açık kapı.

Artık tabandaki her kalem ya bugünkü sayıya EŞİT ya da yazılı bir karar
bekliyor. Sonraki denetim bu tabloyu yeniden üretip karşılaştırabilir.

### 11.27 `test:events` ana dalda kırmızıydı — mobil olaylar sayılmıyordu

Push öncesi durum ölçülürken çıktı ve iki ayrı hata taşıyordu. `test:events`
CI'nın "Birim testleri" adımında çalışıyor, yani ana dalın CI'sı bu yüzden
kırmızıydı; test dosyası ve olay sözlüğü `origin/main` ile BİREBİR aynı, yani
bu oturumun 44 commit'inden gelmiyor.

**a) Tarama yalnız `src`e bakıyordu.** Olay sözlüğü TEK ve uç ortak
(`api/events`): mobil `lib/track` aynı adlarla aynı uca yazıyor. Ama test
`walk("src")` ile yalnız webi tarıyordu ve mobilin yazdığı üç olay
"yazılmayan" görünüyordu: `onboarding_existing_account` (OnboardingScreen),
`purchase_start` ve `purchase_done` (PaywallScreen). Tarama `mobile/src`i de
kapsıyor artık.

**b) `notif_prime` SÖZLÜKTE HİÇ YOKTU.** Mobil onu iki yerden yazıyor
(`NotifPrimeScreen`: value 1 saat seçildi / 0 atlandı, kind = saat) ama web
sözlüğünün 70 adı arasında değildi. Uç bilinmeyen adı sessizce düşürüyor -
`api/events` `isEventName` geçmezse 204 dönüyor ve gövde hiç yazılmıyor,
"ölçümün başarısız olması istemcide hiçbir şeyi bozmasın" diye. Yani bildirim
izni hunisinin mobil tarafı HİÇ KAYDEDİLMEDİ ve raporlarda boş göründü.
Sözlüğe eklendi (71 oldu).

Kalan beş olay gerçekten yazılmıyor ve teste `PLANNED` listesi olarak
sebepleriyle girdi: `start_card`, `daily_play`, `plan_start` (yüzeyi parite
turunda kaldırıldı, §11.10), `speak_self`, `premium_gate`. Liste
`WRITTEN_ELSEWHERE`ten AYRI tutuldu - orası "başka yerde yazılıyor" der,
burası "hiç yazılmıyor"; ikisini karıştırmak yazılmayan bir olayı yazılıyor
diye kaydetmek olurdu. İki yönlü denetleniyor ve sınandı: listedeki bir ada
çağıran çıkarsa test "listeden çıkar" diyor.

Sonuç: `test:events` 71 olay / 138 çağrı ile yeşil.

### 11.28 Günün turu web tarafında HİÇ ölçülmüyordu

§11.27'nin `PLANNED` listesi tek tek incelendi ve dördünden biri gerçek bir
parite farkı çıktı.

Mobil `DailyScreen` baştan beri `session_start` (kind `"daily"`) ve
`session_done` (value = doğru sayısı, kind `"daily"`) yazıyor. Web
`daily-player` HİÇBİR olay yazmıyordu: günün turu raporlarda yalnız Android
tarafından görünüyordu, yani "günün turu ne kadar oynanıyor" sorusunun cevabı
sistematik olarak eksikti. Web de aynı iki olayı aynı `kind` ile yazıyor artık.

Ayrı bir `daily_play` olayı YAZILMADI ve sebebi ölçüldü: ölçüm zaten `kind`
ile ayrışıyor (`session_start kind=daily`), ikinci bir olay aynı turu iki kez
saymak olurdu. Sözlük girdisi `PLANNED`ta bu gerekçeyle duruyor.

Kalan üçü de sebepleriyle `PLANNED`ta:

  - `start_card` — başlangıç kartı görüntülenmesi. İKİ platformda da
    ölçülmüyor; ekran görünümü diye bir olay hiç yok. Eşit biçimde eksik.
  - `speak_self` — söyleyişte asr/self ayrımı. `lesson_step` aynı kararı
    `kind` ile zaten yazıyor; ikisinin sınırı karar istiyor.
  - `premium_gate` — premium kilidine çarpma. Mobil birleşiminde de tanımlı,
    çağıran yok; premium pasif olduğu için bugün ölçülecek bir olay da yok.

### 11.29 Aynı etkinlik, iki ayrı olay: haftalık sınav

§11.28'in ardından olay ve `kind` kümeleri iki platformda karşılaştırıldı.
(Tarama yalnız SABİT ilk argümanlı `track("ad", …)` çağrılarını görüyor;
değişken adla yazan yerler kapsam dışı, o yüzden "şu platformda yazılmıyor"
sonuçları tek tek doğrulandı.)

İki gerçek ayrışma çıktı.

**a) Haftalık sınav — DÜZELTİLDİ.** Mobil `WeeklyScreen` baştan beri
`session_start`/`session_done` + kind `"weekly"` yazıyor. Web `weekly-player`
ise `track("exam_start", 0, "usage")` yazıyordu ve bu iki şeyi birden
bozuyordu:

  1. Sözlüğün sözleşmesi `exam_start` için "kind = sınav türü:seviye" diyor
     (`"level:B1"`, `"placement:A1"`); `"usage"` o biçime hiç uymuyor.
  2. GERÇEK sınav `exam_start`ı SUNUCUDA yazıyor (`api/exam`,
     `${paper.kind}:${level}`), yani haftalık test aynı seride modül ve
     seviye sınavlarıyla karışıyordu - "kaç sınava girildi" sayısı haftalık
     testlerle şişiyordu.

Web de artık `session_start`/`session_done` + `"weekly"` yazıyor. Sunucudaki
`exam_start` yerinde duruyor; o iki platform için de ortak ve sözleşmeye
uygun.

**b) `kind` sözlüğü ayrışık — KARAR GEREKİYOR.** Aynı olay, iki ayrı sözcük
dağarcığı:

    tur          Android            web
    karışık      session            mixed / extra
    tek oyun     practice           single:<oyun>

Rapor `kind`e göre grupladığında aynı etkinlik platforma göre ayrı kovalara
düşüyor. Ama burada Android'i referans almak VERİ KAYBETTİRİR: webin
`single:<oyun>`u hangi oyunun oynandığını taşıyor, Android'in `practice`i
taşımıyor; `extra` de ek turu ayırıyor.

İki seçenek ve tavsiye: (a) Android webin dağarcığına geçer - bilgi artar,
mevcut Android serisi kırılır; (b) web Android'e geçer - seriler hizalanır,
oyun kırılımı kaybolur. Ölçüm (a)'yı işaret ediyor ama mevcut serilerin
anlamını değiştirmek ürün kararı, o yüzden yapılmadı.

### 11.30 `share` olayının kind'ı: tur sonucu webde ayrışmıyordu

§11.29'un bıraktığı üçüncü ayrışma ölçüldü. Dört paylaşım yolu var ve üçü
eşit, biri değildi:

    yol           Android                            web
    davet         share kind=invite                  share kind=invite      ✓
    profil        share kind=profile                 share kind=profile     ✓
    TUR SONUCU    share kind=result, value=doğru      track("share") — kind
                                                     ve değer YOK
    seri          share kind=streak, value=gün        yüzey yok (§11.10)

Webin kind'sız çağrısı raporda ayrışmıyordu: davet ve profil paylaşımları
kendi kind'ıyla dururken tur sonucu "boş kind" kovasına düşüyor ve kaç
doğruyla paylaşıldığı hiç kaydedilmiyordu. Web de artık
`share` kind=`result`, değer = doğru sayısı yazıyor - mobil `lib/share`
`shareResult` ile birebir.

Doğru sayısı `marks` dizisinden çıkarılıyor (`marks.filter(Boolean).length`);
`total` ayrı bir alan ve mobil de DEĞER olarak doğru sayısını gönderiyor, o
yüzden aynı anlam.

`streak` yolu webde yok ve bu §11.10'da kayıtlı: `share.streak` metinleri üç
dilde yazılı ama hiçbir ekranda düğme yok - iki platformda birden eksik değil,
mobilde `shareStreak()` var ama çağıranı yok. Yani o satır bu maddeyle
kapanmıyor.

### 11.31 `session_done` kind'sız yazılıyordu — başlangıçla bitiş eşleşmiyordu

`session_*` çiftinin tamamı çıkarıldı. İki gerçek kusur çıktı ve ikisi de
"kind sözlüğü" tartışmasından (§11.29) BAĞIMSIZ - biri webin kendi içinde
tutarsızlığı:

**a) Karışık/pratik tur — DÜZELTİLDİ.** `session-player` başlangıcı
`kind` ile yazıyordu (`mixed` / `extra` / `single:<oyun>`) ama bitişi
KİND'SIZ:

    track("session_start", 0, opts.game ? `single:${opts.game}` : …)   ✓
    track("session_done", next.correct)                                 ✗

Yani bir turun başlangıcı kovalanıyor, bitişi kovalanmıyordu; ikisi `kind`
üzerinden eşleştirilemiyordu ve "başlayan kaç tur bitiyor" sorusu tür bazında
cevaplanamıyordu. Tür artık bir kez hesaplanıp `sessionKind` ref'inde
saklanıyor ve iki olaya da aynı değer gidiyor. Mobil `GameScreen` ikisine de
aynı kind'i (`session` / `practice`) baştan beri veriyor.

**b) Yürüyüş turu — yarısı düzeltildi, yarısı kayıt.** Web `walk-player`
bitişi kind'sız yazıyordu; artık `kind="walk"` taşıyor, yoksa yürüyüş
tamamlamaları karışık turlarla aynı kovaya düşüyordu.

MOBİLDE İSE BU OLAY HİÇ YOK: `WalkModeScreen` yalnız `walk_start` yazıyor,
`session_done` yazmıyor. Yani yürüyüş tamamlamaları yalnız webden sayılıyor.
Buraya olay EKLENMEDİ çünkü mobilin yürüyüş akışı bitişi "devam edelim mi"
sorusuyla döngüye sokuyor ve turun "bittiği" anın hangisi olduğu (yirmi tur
mu, kullanıcı vazgeçtiğinde mi) bir tanım kararı; webde o karar `askContinue`
öncesine konmuş. Aynı kararı mobilde kendi başıma vermek, iki platformda
farklı anlamda bir sayı üretme riski taşıyordu.

### 11.32 Yürüyüş NASIL bitti — Androidde cevaplanamayan soru

`walk_*` olay ailesinin iki platformdaki tam dökümü:

    web (components/walk-player.tsx)      mobil (screens/WalkModeScreen.tsx)
    walk_start                            walk_start
    walk_end   (sebep kodu 1-6)           —
    walk_listen (kind: tarayıcı yolu)     —
    walk_switch                           —
    walk_capture                          —

Yani Androidde "kaç yürüyüş başladı" biliniyordu, "nasıl bitti" bilinmiyordu:
başlayan turların hepsi açık uçlu kalıyordu ve terk oranı yalnız webden
ölçülebiliyordu. Yürüyüş modu mobilin öne çıkan özelliği olduğu için ölçümün
eksik olduğu taraf tam da en çok kullanılan taraftı.

`walk_end` mobile eklendi, sebep kodları web `lib/events` tablosuyla birebir:

    1  kullanıcı "hayır" dedi (cevapsız bırakılan soru da buraya düşer)
    2  tur kalmadı
    3  duyulmama sınırı aşıldı (UNHEARD_LIMIT)
    6  elle duraklatıldı / ekrandan çıkıldı (bildirimden durdurma dahil)

4 (mikrofona ulaşılamadı) ve 5 (ekran kapandı, kayıt yolu yok) webin tarayıcı
yollarına özgü; native tarafta karşılıkları yok, o yüzden mobilde hiç
yazılmıyor — kodların anlamı aynı kaldı, kullanılmayanlar boş kaldı.

Kod 1'in "cevapsız" durumu da kapsaması bir ölçümün sonucu: web `askContinue`
yalnız `"yes" | "no"` dönüyor, yani cevaplanmayan soru orada da "hayır"a
düşüyor. Ayrı bir kod uydurmak iki platformda farklı anlamda sayı üretirdi.

Bitiş bir kez yazılıyor (`walkEnded` ref): iki yol birden tetiklenirse -
duyulmama sınırı ekranı kapatırken - tek tur iki bitiş sayısı üretmez.

**Eklenmeyen: `walk_listen`.** Webin `kind` değerleri tarayıcı yoluna özgü
(`browser:${outcome}`, `stt:premium`); mobilin native STT yolları için yeni bir
kelime dağarcığı uydurmak gerekirdi. Bu, §11.29'da kaydedilen sınıfın aynısı -
mevcut değerlerden birine zorlamak veri kaybettirir, yenisini uydurmak da
Sametin kararı. `walk_switch` / `walk_capture` ise gerçekten tarayıcıya özgü
mekanikler (ekran kapanınca devir, echoCancellation) ve mobilde karşılıkları
yok; eksik değil, konusuz.

### 11.33 Ayar değişiklikleri Androidde HİÇ ölçülmüyordu

Ölçüm, iki tarafta `setting_change` çağrılarının sayısı:

    web    13 çağrı  (profile-form 6, notification-settings 3, theme-toggle 2,
                      lang-setting 1, course-onboarding 1)
    mobil   0 çağrı

Olay web sözlüğünde vardı, mobil `EventName` birleşiminde YOKTU — yani
Android'de bir kullanıcının seviyesini değiştirdiği, günlük hedefini
düşürdüğü, kursunu ya da temasını değiştirdiği hiç kaydedilmiyordu. Ayarların
çoğuna mobilde dokunuluyor (uygulamanın ana yüzeyi orası), dolayısıyla
"seviyeyi kimse değiştirmiyor" ya da "günlük hedef hep düşürülüyor" gibi
sorular tam da en çok veri üreten taraftan cevapsız kalıyordu.

Eklenen çağrılar, web'deki kind'lara birebir:

    SettingsScreen        name · daily_goal · level  (kaydet, yalnız değişeni)
                          course · voice · theme · lang  (anında uygulanıyor)
    NotificationsScreen   remind_daily · remind_streak · remind_weekly

Üç kural web'den aynen alındı:

- **Yalnız gerçekten değişen alan.** "Kaydet"e her basışta üç olay yazmak
  dokunulmamış alanları da değişmiş gösterirdi. Karşılaştırma sunucudaki
  değere (`me`) bakıyor ve `refresh()` ondan SONRA çağrılıyor - tersi olsa
  karşılaştırılacak eski değer kaybolurdu.
- **Yalnız kayıt başarılıysa.** Başarısız kaydı "ayar değişti" saymak
  değişmemiş bir ayarı değişmiş gösterirdi.
- **Saat seçimi ölçülmüyor**, çünkü web de ölçmüyor; tek tarafta ölçmek "kaç
  kişi hatırlatma saatini değiştirdi" sorusunu yarım cevaplardı.

Mobilde bir kural EKLENDİ: hatırlatma anahtarları izin reddedilmişse
çevrilmiş görünüp başarısız oluyor. Olay yalnız anahtar gerçekten döndüğünde
yazılıyor. Webde anahtarlar izin olmadan hiç çizilmediği için orada bu durum
zaten oluşamıyor - yani iki taraftaki sayı aynı şeyi ifade ediyor.

Ölçülmeyen iki ayar, bilerek: **analitik anahtarı** (webde de ölçülmüyor -
ölçümü kapatan hareketi ölçmek kullanıcının kararına aykırı) ve **mikrofon
onayının geri alınması** (aynı gerekçe, ayrıca webde karşılığı yok).

Yan bulgu: sözlükteki kind listesi eskimişti - `lang` ve üç hatırlatma
anahtarı yazılıyor ama listede yoktu. Sözlüğü okuyan kişi yazılmayan bir
kind'ı yazılıyor sanmaz ama yazılan bir kind'ı yok sanır; liste tamamlandı ve
`value`nun her kind'da ne anlama geldiği de yazıldı.

### 11.34 `nav` ve `onboarding_step`: bir kova iki soruyu topluyordu

**Eşleşen taraf.** Sekme çubuğu ölçümü iki platformda birebir: aynı dört
anahtar aynı sırada (`learn`, `immersion`, `skills`, `friends`), `value` iki
tarafta da sekme sırası, ikisi de yalnız sekme GERÇEKTEN değişince yazıyor.
Burada yapılacak bir şey yok.

**Düzeltilen: `onboarding_step` kind çakışması.** Huni adlarının ölçümü:

    Android  welcome · lang · course · level · goal
    web      welcome · goal  · level · pace  · ready

`goal` iki platformda İKİ AYRI SORU adlandırıyordu. Android'de günlük hedef
adımı (10/20/50 tekrar); web'de "neden öğreniyorsun" (iş/günlük/sınav/İsviçre)
ve günlük hedef `pace` diye yazılıyordu. Yönetim panelindeki huni sorgusu
(`lib/admin.ts`, `where name='onboarding_step' group by kind`) iki platformu
birlikte topluyor, dolayısıyla `goal` kovası webin güdü adımıyla Android'in
günlük hedef adımını aynı sayıya katıyordu.

Kanıt tesadüf değil: webin 3. adımının başlığı ile Android'in `goal` adımının
başlığı aynı i18n anahtarı (`onboarding.what_s_your_daily_goal`) - aynı soru,
iki ayrı ad.

Android referans alındı: günlük hedef `goal`. Webin güdü adımının Android'de
karşılığı yok, o yüzden Android'in kelimesini işgal etmiyor, kendi adını
(`motivation`) aldı.

**Sonra: akışlar da eşlendi.** O sıradaki not "akışları eşlemek ayrı bir iş"
diyordu; o iş yapıldı. Web onboarding'i mobilin beş ekranına taşındı ve
`motivation` adımı hiç kalmadı:

    Android  welcome · lang · course · level · goal
    web      welcome · lang · course · level · goal

Artık yalnız adlar değil SIRA da aynı, yani huni sorgusu iki platformu adım
adım karşılaştırılabilir hâlde topluyor. Yönetim panosundaki liste de buna
göre düzeltildi (`ONB_ORDER`): eskiden webin akışını yansıtıyordu, `ready`
yalnız webde vardı ve mobilin `lang`/`course` adımları panoda hiç görünmüyordu.

Yan düzeltme: liste çağrı yerinde konumsal bir dizi sabitiydi
(`["welcome", …][step]`), araya bir adım eklenince bütün adlar sessizce
kayardı. Adlar artık `STEP_KEYS` dizisinde ve adım o dizinin indisi - ad ile
adım tek yerde.

**Ölçülüp kaydedilen, düzeltilmeyen: webde `nav` aşırı yüklü.** Sözlükte
`nav` = "sekme açıldı, value = sekme sırası". Android tam olarak bunu yazıyor.
Web ise dört çağrıda başka şeyler için de kullanıyor: `onboarding:placement`,
`onboarding:level` (onboarding çıkış yolu) ve `roleplay_exam:start` /
`roleplay_exam:done` - son ikisinde `value` konuşulan replik sayısı, yani sekme
sırası değil. Tek kovada üç ayrı olay ve üç ayrı `value` anlamı var. (Altı
çağrıydı: `onboarding:level_pick` ve `onboarding:level_measure` akış mobile
eşlenirken düştü, seviye adımı artık ayrı bir ara adıma geçmiyor.)

Düzeltilmedi çünkü Android'e eşlemenin yolu bu çağrıları başka bir olaya
taşımak ve o olayın adını UYDURMAK: onboarding çıkış yolu için `onboarding_done`
gibi bir ad, rol yapma sınavı için de webde-var/Android'de-yok bir yüzeyin
(WP-22, `/lessons/[id]/exam` - Android'de rol yapma dersin içinde bir aşama,
ayrı sınav yüzeyi yok) kendi olayı gerekirdi. İkisi de §11.29'da kaydedilen
sınıf: mevcut bir ada zorlamak veri kaybettirir, yenisini uydurmak Sametin
kararı. Şu an bir raporu bozmuyor - `nav` kovasını okuyan sorgu yok.

### 11.35 Patika dersleri Androidde HİÇ ölçülmüyordu

Ölçüm:

    web    lesson_start 1 · lesson_step 4 çağrı · lesson_finish 1
    mobil  0 · 0 · 0     (LessonScreen'de tek bir track çağrısı yok)

`LessonScreen` 750 satır ve mobilin patika yüzeyi: anlatım, konuşma, özet.
Ders bir öğrencinin uygulamada geçirdiği en uzun tek oturum ve Android'de
hiçbiri kaydedilmiyordu - kaç ders başlandığı, hangi adımda takılındığı, kaç
tanesinin bittiği yalnız webden sayılabiliyordu. Mobilde track yazan on üç
ekran var, bu on dördüncüsü değildi.

Web'in dilbilgisi aynen alındı:

    lesson_start   value 1 kaldığı yerden · 0 baştan   kind ders kimliği
    lesson_step    kind "adım:yol"                     value 2 / 1 / 0
    lesson_finish  value puanlı adımlarda doğru %      kind ders kimliği

Üç ayrıntı ölçülerek yerleştirildi:

- **Başlangıç tek yerden.** Anlatıma üç giriş yolu var (ilk açılış, "kaldığın
  yerden", "baştan başla") ve üçü de `presentFrom` çağırıyor. Olay
  `beginLecture` içinde ve bir kerelik bir ref'le korunuyor; yoksa "baştan
  başla"ya basan öğrenci iki ders başlangıcı üretirdi.
- **Sıfır yalnız adım GEÇİLEMEDİĞİNDE.** Web de öyle: her yanlış denemeye
  ayrı sıfır yazmak bir adımı üç başarısız adım gibi gösterirdi. Mobilde eşik
  aynı (üçüncü denemeden sonra doğrusu duyurulup geçiliyor).
- **İlk deneme ayrımı.** `tries === 0` webin `isFirstTry`ıyla aynı şey; iki
  tarafta da 2 = ilk denemede doğru, 1 = sonraki denemede doğru.

**Webde bulunan yan hata: doğru/yanlış düğmesi "mikrofon" diye sayılıyordu.**
`inputMode` yalnız yazma yolunda ayarlanıyor; doğru/yanlış adımının iki
düğmesi `evaluate()`i doğrudan çağırıyor ve `inputMode` "mic" olarak
kalıyordu. Yani düğmeye basılan her cevap ölçümde sesli söylenmiş gibi
görünüyordu - "öğrenciler bu adımı konuşarak mı geçiyor" sorusunun cevabı
sistematik olarak yanlıştı. Düğme yolu artık `tap`; webin sesli cevap yolu
("veya sesli söyle") duruyor ve hâlâ `mic`. Android'de bu adım yalnız
düğmeyle cevaplanıyor, orada tek değer `tap`.

**Yüzey farkı, kaydedildi:** webde "adımı atla" düğmesi var (`skipStep`,
`kind = "<adım>:skip"`), Android'de yok. `skip` bu yüzden mobilde hiç
yazılmıyor. Düğmenin mobile eklenmesi ölçüm değil ürün kararı - Android
takılan öğrenciyi üçüncü denemeden sonra kendiliğinden geçiriyor, yani
atlamanın işlevi zaten karşılanmış durumda.

### 11.36 `production_attempt` temiz çıktı; artikel renkleri Androidde paletin dışındaydı

**Ölçülen ve temiz çıkan: `production_attempt`.** Olay İSTEMCİDE değil
SUNUCUDA yazılıyor (`lib/assess.ts`, hem doğrudan hem kuyruk yolunda) ve dört
üretim türünü `productionKind` ile etiketliyor. İki platformun üretim
görevleri de aynı uçtan (`/api/assess`) geçtiği için Android'in ayrı bir
yazıcıya ihtiyacı yok - sayı zaten iki platformu birlikte topluyor. Webdeki
tek istemci çağrısı çevrimdışı rol yapma özetine ait
(`lib/lessons/offline-roleplay`), o yol Android'de yok ve zaten kayıtlı.
Burada yapılacak bir şey çıkmadı.

**Bulunan tasarım hatası: `ARTIKEL_TONE` elle yazılı Tailwind varsayılanıydı.**
`mobile/src/game/rounds.tsx` içinde üç değer sabitti:

    der #0284c7   die #e11d48   das #0d9488

Üç ayrı sorun:

1. **Uygulamanın paletinde yoklar.** Web aynı üç rolü palet basamağından
   alıyor (`intro-game`: sky-600 / rose-600 / mint-600 → #16748a / #b62e43 /
   #237a4c). Yani aynı artikel iki uygulamada iki ayrı renkti ve "das" mobilde
   TEAL, webde MİNT YEŞİLİydi - farklı bir renk ailesi.
2. **Tema duyarlı değiller.** Tek değer hem açık hem koyu temada çiziliyordu;
   web koyu temada 300 basamağına geçiyor (#6fd1e3 / #f79ba6 / #6fd19b).
3. **Kontrast eşiğini geçmiyorlar.** Ton burada seçenek METNİ olarak
   kullanılıyor (`OptionButton` `fg`), yani WCAG eşiği 4.5. Ölçüm:

        şimdiki                             palet değerleriyle
        der  açık 4.10  koyu 4.19           açık 5.39  koyu 9.74
        die  açık 4.70  koyu 3.66           açık 6.07  koyu 8.34
        das  açık 3.74  koyu 4.59           açık 5.30  koyu 9.22

   Altı ölçümün üçü sınırın altındaydı; palet değerleriyle altısı da geçiyor.

Renk burada TEK taşıyıcı - seçeneğin yanında rengi açıklayan bir etiket yok -
yani webin `palette-check` betiğindeki KATI eşiğin (ΔE ≥ 20) konusu. Palet
basamakları o eşikle birlikte ölçülüyor, elle yazılı değerler hiçbir ölçümden
geçmiyordu.

Düzeltme: renkler tema jetonlarından türüyor (`colors.infoText` /
`dangerText` / `successText`). Mobil paletin bu üç jetonu web değerleriyle
zaten birebir aynı (açık: #16748a / #b62e43 / #237a4c, koyu: #6fd1e3 /
#f79ba6 / #6fd19b), yani jetona bağlamak hem web ile eşliyor hem temayı
düzeltiyor hem eşiği geçiyor.

**Kaydedilen gözlem, değiştirilmedi:** web yeni kelime turunda artikeli
RENKLİ BİR ROZET olarak da gösteriyor (`intro-game`, dolu zemin + beyaz yazı);
mobil "der Tisch" diye tek dizge yazıyor. Yani mobil cinsiyeti SORARKEN renk
kodluyor, ÖĞRETİRKEN kodlamıyor. Bu Android'in yerleşimini değiştirmek
demek - referans platformun tasarımına dokunmak - o yüzden ölçülüp buraya
yazıldı, uygulanmadı.

### 11.37 Paletin dışına kaçan renkler: madalya ölçeği ve konfeti

§11.36'daki sınıfı sonuna kadar süpürdüm. Mobilde tema jetonu yerine elle
yazılı renk kullanan yerler (beyaz/siyah ve avatar çizimi hariç) on dört
satırdı; üçü gerçek sapma çıktı, kalanı meşru.

**a) Günün turu sıralama madalyası — hem çakışıyordu hem okunmuyordu.**

`DailyScreen.medalColor` üç değeri elle yazıyordu: altın `colors.streak`,
gümüş `#9aa3ad`, bronz `#b08d57`. İki ayrı sorun:

*Çakışma.* Rozet ekranında (`AchievementsScreen`) aynı bronz/gümüş/altın
ölçeği daha önce web `TIER_COLOR` ile eşlenmişti - gümüş `#9aa3ad`ten
`#8a8277`ye çekilmişti, çünkü mavi-gri değer sıcak paletin içinde tek başına
soğuk duruyordu. Günün turu o düzeltmeden habersiz kalmıştı: tek uygulamada
iki ayrı madalya ölçeği vardı. Ölçek artık `theme/colors.ts` içinde tek
kaynak (`TIER_COLOR`, webin dört değeriyle birebir) ve iki ekran ondan
okuyor - bir daha ayrışamaz.

*Okunmama.* Numara madalya rengiyle YAZILIYORDU. Ölçüm, beyaz kart üstünde:

    altın  2.88      gümüş  2.56      bronz  3.09      (eşik 4.5)

Açık temada ilk üç sıranın numarası okunmuyordu; koyu tema geçiyordu
(8.84 / 6.72 / 5.56), yani hata yalnız açık temada görünüyordu.

Hue'yu koruyup koyulaştırmak çözmüyor: 4.5'i geçen bir gümüş `#7b746a`
oluyor ve madalyasız sıralamanın soluk tonundan (`textMuted` `#7c6c5d`,
5.05) ayırt edilemiyor - ikinci sıra dördüncüyle aynı görünürdü. Uygulamanın
kendi dili bu iş için DOLU ZEMİN + BEYAZ İÇERİK (seviye rozeti, başarı
rozeti) ve o ölçekte üçü de geçiyor: beyazla 4.44 / 3.79 / 3.62, büyük-kalın
yazı ve grafik eşiği 3.0. İlk üç artık dolu daire, dördüncü ve sonrası düz
soluk numara.

**b) Konfeti renkleri paletin dışındaydı.** `Celebrate.tsx`:

    mobil  #f87612  #fbbf24  #34d399  #60a5fa  #f472b6  #a78bfa
    web    #eda45d  #ddb62c  #45b87a  #35b2cc  #ae79d4  #ee6b7c

Mobilin ilki marka turuncusu, kalan beşi Tailwind varsayılanı (amber-400,
emerald-400, blue-400, pink-400, violet-400) - paletin hiçbir basamağı değil
ve iki tanesi farklı renk AİLESİ: webin turkuazı (sky) yerine düz mavi,
gülü (rose) yerine pembe. Konfetinin üstünde yazı yok, yani kontrast konusu
değil; konu kimlik - kutlama kullanıcının ekran görüntüsü aldığı an ve iki
uygulama farklı renklerle kutluyordu. Liste webin altı değeriyle eşlendi.

**Meşru çıkanlar, dokunulmadı:** `#FA7C13` (avatar dairesinin zemini - Erdi
çiziminin PNG zeminiyle aynı değer ve webde de aynı satır), `softShadow`un
sıcak kahve tinti `#5a3418` (gölge rengi, iki temada da aynı olması bilinçli),
`avatar.ts` şapka varsayılanı (kullanıcının seçtiği aksesuar rengi, palet
değil), `icons.tsx` / `avatarParts.tsx` / `PersonAvatar.tsx` içindeki çizim
renkleri (illüstrasyon, tema jetonu değil).

### 11.38 Webde aynı sınıf: bir ternary'nin iki yanı iki ayrı kurala uyuyordu

§11.37'yi web tarafında tekrarladım. `globals.css` dışında elle yazılı renk
83 satır çıktı; büyük kısmı meşru (sertifika SVG'si, opengraph görseli,
e-posta HTML'i, Google logosunun kendi path renkleri, avatar illüstrasyonu,
karartma perdeleri, yönetim panosu). Ama `palette-check.mjs`in GÖRMEDİĞİ bir
sınıf çıktı ve üç yerde aynı şekli aldı: **aynı ternary'nin bir yanı anlamsal
(tema duyarlı) jeton, öteki yanı sabit basamak.** Betik yalnız
`globals.css`ten okuduğu jetonları ölçüyor, bileşenlerin içindeki kullanımı
görmüyor - o yüzden üçü de kapıdan geçiyordu.

**a) `premium-paywall`: promosyon kodu iletisi.**

    başarı yanı  var(--color-mint-600)     sabit basamak
    hata yanı    var(--color-danger, ...)  anlamsal jeton

Koyu temada başarı iletisi #237a4c, koyu kartın (#211a14) üstünde **3.24** -
küçük yazı eşiği 4.5. Hata iletisi doğru çalışıyordu. `--color-success` koyu
temada mint-300'e geçiyor: 9.22. Android iki yanı da tema jetonuyla yazıyor
(`PaywallScreen`: `successText` / `dangerText`), yani referans platform bu
işi baştan doğru yapıyordu.

Aynı satırdaki ölü yedek de atıldı: `--color-danger` tanımlı, yani `#dc2626`
hiç çizilmiyordu - ama jeton bir gün yeniden adlandırılsa sessizce paletin
dışında bir Tailwind kırmızısına düşerdi.

**b) `analytics` sayfası: üç tonlu istatistik.** "warn" baştan beri anlamsal
jetondu, "good" ve "bad" sabit 600 basamağıydı. Koyu temada kart üstünde
mint-600 **3.24**, rose-600 **2.83**. Anlamsal jetonlarla 9.22 ve 8.34.

**c) `skills` sayfası: beceri puanı çipi.** İki sapma birden - tint %18'di
(uygulamanın her yerindeki kalıp %14) ve kehribar yanı sabit `flame-500`
yazıyordu. Ölçüm, %18 tint üstünde flame-500 açık temada **2.43**; küçük
kalın yazı eşiği 4.5'in çok altında. Bitmiş (mint) yanı zaten anlamsal
jetondu. `--color-flame` + %14 ile açık temada 4.55, koyu temada 9.31 -
`progress-view` ve `app-shell`teki kabul edilmiş kalıbın aynısı.

Üçünün ortak dersi: bir rengin metin olarak kullanıldığı yerde sabit basamak
YANLIŞ - basamak dolgu için, anlamsal jeton metin için. Sapma her seferinde
tek bir ternary'nin bir yanında duruyordu, yani gözle bakan biri "jeton
kullanılmış" diye geçiyordu.

### 11.39 Kör noktaya kapı: `check:colors`

Son üç bölümdeki beş hata (§11.36 artikel tonları, §11.37 madalya ölçeği,
§11.38 üç web ternary'si) ortak bir boşluktan geçti: `palette-check.mjs`
paletin KENDİSİNİ ölçüyor - kontrast, ayrışma - ve `globals.css`ten okuyor;
bileşenlerin o paleti nasıl KULLANDIĞINI hiç görmüyor. Beşi de derleme, lint
ve kontrast kapısının üçünden birden geçti.

`scripts/check-colors.mjs` iki kuralı denetliyor:

- **Web:** metin rengi ANLAMSAL jetondan gelmeli (`--color-mint`), sabit
  BASAMAKTAN değil (`--color-mint-600`). Basamak dolgu için: temayla
  değişmediği için koyu temada koyu kartın üstünde koyu yazı bırakıyor.
- **Mobil:** renk tema jetonundan (`colors.*`) gelmeli, ham onaltılıktan değil.

Ölçüm önce yapıldı, kapı sonra: kural bugün on iki istisna bırakıyor ve
hepsi SEBEBİYLE yazılı - üç web satırı (sabit dolgu üstünde sabit yazı; sayaç
rozetinde anlamsal jeton koyu temada 1.49 veriyordu, o yüzden bilerek sabit)
ve dokuz mobil değeri (gölge tinti, avatar zemini, varsayılan şapka rengi,
altı konfeti değeri). Yani gürültü tabanı on iki satır, hepsi bir kabul
kaydı. Beyaz ve siyah - saydamlıkları dahil (`#ffffffcc`) - hiç sayılmıyor:
marka gradyanının üstündeki yarı saydam katman bir jeton değil, zemin iki
temada da aynı. Çizim dosyaları (`icons`, `avatarParts`, `PersonAvatar`) ve
`theme/` dizini kapsam dışı.

Kapının GERÇEKTEN ölçtüğü doğrulandı, iki tarafa birer ihlal enjekte
edilerek: `PathScreen`e ham `#e11d48` ve `writings-card`a
`color: var(--color-rose-600)` - ikisini de yakaladı, çıkış kodu 2. Sonra
geri alındı.

Yorum ayıklama bir kez düzeltildi: satır satır "yorum mu" bakmak yetmiyordu,
`{/* ... */}` bloğunun ortasındaki satırlar düz metinle başlıyor ve §11.37
kaydında geçen ölçüm değerleri (`#7b746a`, `#7c6c5d`) ihlal sayılıyordu. Şimdi
yorumlar satır sayısı korunarak boşluğa çevriliyor - yani kaydın kendisi
kapıyı kırmıyor.

`package.json`da `check:colors`, CI'da "Renk kaynağı" adımı. Elle çağrılan bir
kapı, kapı değildir.

### 11.40 İki palet ne kadar aynı — ve birincil butonun koyu teması

Mobil paletin 41 değerinden **37'si** web `globals.css`te birebir duruyor.
Kalan dördü: üçü kademe ölçeği (`#a9683c` / `#8a8277` / `#aa8012` - webde
`achievement-badge.tsx`te, yani gene web değerleri, sadece CSS'te değil) ve
biri gerçek ayrım - `#1a1008`, mobilin koyu temadaki `onPrimary`ı.

Yani iki palet fiilen tek palet ve webin `palette-check`i ölçtüğü değerlerle
mobili de kapsıyor. Tek istisna o dördüncü değerdi ve altından gerçek bir
ayrım çıktı.

**Birincil buton koyu temada ayrışmıştı.**

    açık tema   web beyaz / #f87612 = 2.77     Android beyaz / #f87612 = 2.77
    koyu tema   web beyaz / #f87612 = 2.77     Android #1a1008 / #fb8f2a = 8.08

Açık temadaki 2.77 kayıtlı ve kabul edilmiş bir sapma (T-KARAR-1) ve
gerekçesi yazılı: *"iki uygulamanın birebir aynı görünmesi, bu tek
eşleşmedeki kontrast kazancının önüne geçti."* Ama o gerekçe KOYU TEMADA
TUTMUYORDU: Android koyu temada zaten farklı çiziyor - hem dolgu (400, 500
değil) hem yazı (mürekkep, beyaz değil) - ve 8.08 ölçüyor. Yani iki uygulama
koyu temada zaten ayrışmıştı ve web, ayrışan tarafta okunmayanı taşıyordu.
Kabul edilen şey "aynılık" idi; ortada aynılık yoktu.

Sebebi de §11.38'in aynısı: buton `--color-brand-500` yazıyordu, yani sabit
bir BASAMAK. `--color-brand` koyu temada 400'e geçiyor ve bunu web zaten
biliyor (koyu blokta yazılı: "mobilin koyu paletiyle aynı basamak"), ama
buton o jetonu kullanmıyordu.

Düzeltme: iki yeni jeton - `--brand-fill` (açık 500 / koyu 400) ve
`--on-brand` (açık beyaz / koyu `#1a1008`, Android'in değeri). `.btn-primary`
artık ikisini kullanıyor. Açık tema DEĞİŞMEDİ; orada iki platform zaten aynı.

Kapı da güncellendi: `palette-check` koyu buton çiftini artık ÖLÇÜYOR (8.08,
geçer). Eskiden o çift hiç ölçülmüyordu - bölüm yalnız "beyaz / turuncu"
satırlarını taşıyordu ve koyu temanın kendi çifti kapının görüş alanı
dışındaydı. Açık tema ayrıca ölçülmüyor, çünkü oradaki çift zaten kabul
satırının ta kendisi.

**Dokunulmayan, sebebiyle:** `.chip-filter.chip-active` de beyaz / brand-500
dolu çip. Android'in karşılığı DOLU değil YUMUŞAK çip (`primarySoft` zemin +
`onPrimarySoft` yazı), yani buradaki fark bir kontrast hatası değil iki ayrı
çip dili - ve zaten kayıtlı (globals.css, T-KARAR-1 notu). Butonla aynı
kefeye konamaz.

### 11.41 Dolu yüzeylerde beyaz yazı: Androidin kendi jetonu kullanılmıyordu

§11.40 web butonunu Android'e eşledi. Aynı soruyu Android'in kendisine
sorunca daha büyüğü çıktı: **mobilde dolu bir vurgu yüzeyine yazı koyan 60
yer `"#fff"` yazıyordu**, oysa palet bu iş için iki jeton taşıyor
(`onPrimary`, `onFill`) ve ikisi de yalnız on yerde kullanılıyordu.

Vurgu dolguları tema ile BASAMAK DEĞİŞTİRİYOR: koyu temada açılıyorlar.
Beyaz yazının koyu temadaki ölçümü:

    dolgu            beyaz    mürekkep (#1a1008)
    primary #fb8f2a   2.32      8.08
    success #6fd19b   1.86     10.05
    danger  #f79ba6   2.06      9.09
    streak  #ddb62c   1.94      9.63
    info    #6fd1e3   1.76     10.62
    accent  #cda6e8   2.06      9.11

Yani koyu temada bu altmış yüzeyin yazısı grafik eşiği olan 3.0'ı bile
tutmuyordu - "Devam", "Kontrol et", "Kaydet", ödeme ekranının düğmeleri,
yerleştirme sınavının puan dairesi. Jeton zaten vardı ve gerekçesi
`colors.ts`te yazılıydı ("Aynı fikir `onPrimary` ile zaten vardı, dolu karo
onu kullanmıyordu") - eksik olan kullanımdı.

Dönüştürme dolguya BAKARAK yapıldı, kör değiştirme değil: her `"#fff"` için
en yakın `backgroundColor` bulundu; `colors.primary` ise `onPrimary`,
öteki anlamsal tonlarsa `onFill`, sabit bir dolgu (kademe rengi, marka
gradyanı, `#ffffff2e` katmanları, avatar çizimi) ise DOKUNULMADI. 60 satır
değişti, 26 yarı saydam beyazdan yalnız 3'ü anlamsal dolgu üstündeydi.

**Yeni jeton: `onPrimaryMuted`.** O üç satır günün turu skor kartındaydı:
başlık `onPrimary`ye geçince altındaki etiketler `#ffffffcc` kalıyordu, yani
aynı kartın başlığı okunurken etiketi okunmuyordu (koyu temada 1.97).
Mürekkebin %80 saydamı 5.69 veriyor.

**Kaydedilen, düzeltilmeyen:** aynı etiket AÇIK temada da 2.27 veriyor.
Bu, T-KARAR-1'in doğrudan sonucu - açık temada dolu turuncu üstünde beyaz
yazı bilerek kabul edilmiş bir sapma (2.77) ve soluk hâli ondan daha iyi
olamaz. Açık temayı düzeltmek o kararı bozmak demek, o yüzden ölçüm buraya
yazıldı ve değer değiştirilmedi.

**`check:colors`un bilinen sınırı:** kapı `#ffffffcc` gibi saydam beyazları
koşulsuz geçiriyor, çünkü marka gradyanının üstündeki katmanlar meşru. Solid
bir anlamsal dolgunun üstündekini ondan ayırmak, kapının arka planı
çözmesini gerektirir - bu turda elle ölçüldü (26 satırdan 3'ü), kapıya
konmadı.

### 11.42 Kapı dolgu farkındalığı kazandı — ve sekiz kaçak daha

§11.41'in sonunda kapının bilinen sınırını yazmıştım: `check:colors` beyazı
koşulsuz geçiriyordu, çünkü marka gradyanının üstündeki beyaz meşru. Sınırı
kapatmak için kuralın satırın ÜSTÜNDEKİ en yakın `backgroundColor`a bakması
yetiyor - ve ölçüm bunun uygulanabilir olduğunu gösterdi: bu depoda gürültü
tabanı SIFIR. Bugün hiçbir meşru kullanım "anlamsal dolgu + beyaz yazı"
kalıbına düşmüyor, o yüzden bu kuralın istisna listesi de yok.

Kuralı yazarken §11.41'in kendi taramasının **sekiz ihlali kaçırdığı** çıktı.
Sebep pencere genişliğiydi: altı satır yetmiyordu. Kaçanların hepsi aynı
biçimdeydi -

    <View style={{ backgroundColor: canNext ? colors.primary : colors.surface2 }}>
      ...
      <Text color={canNext ? "#fff" : colors.textFaint}>

yani dolgu bir ternary ve beyaz dalı tam olarak ANLAMSAL dala denk geliyor.
Sekizi de düzeltildi: "Devam" (onboarding), "Gönder" (bildirme), "Abone ol"
ve "Uygula" (ödeme), "Hesabımı kalıcı olarak sil", kelime süzgeci çipi,
ders ilerleme oku, günün turu sıralamasındaki kendi avatarın.

İkisinin kendi içinde çelişkisi vardı ve teşhisi doğruluyor: ödeme
ekranındaki iki düğmede bekleme göstergesi zaten `colors.onPrimary`
kullanıyordu, yanındaki etiket `"#fff"` yazıyordu - aynı düğmede iki ayrı
kural.

Pencere sekiz satıra çıkarıldı ve kapı yeniden ölçüldü: temiz. Yakaladığı da
doğrulandı - `WordsScreen`in çip yazısı `"#fff"`e geri alındığında kapı tek
satırla kırıldı, sonra geri alındı.

Kapının hâlâ kesin bir çözümleme OLMADIĞI kayda geçsin: JSX ağacını çözmüyor,
"en yakın dolgu" bir sezgi. Yanlış pozitif üretirse çare istisna listesine
sebebiyle yazmak; yanlış negatif ise pencereyi büyütmek - bu turda tam olarak
o yapıldı.

### 11.43 Aynı hata webde de vardı: on beş yüzey

§11.41'i webde tekrarladım ve sonuç neredeyse birebir aynı çıktı.

Web'in dolgularının ÇOĞU sabit basamak (`--color-mint-500`) ve orada beyaz
doğru - basamak temayla değişmiyor, ölçüm iki temada aynı. Ama **on beş
yüzey** tema duyarlı jetonu dolgu olarak kullanıyor (`var(--color-brand)`,
`--color-mint`, `--color-rose`, `--color-sky` - basamak numarası YOK) ve
üstüne beyaz koyuyordu. O jetonlar açık temada 600/700, koyu temada 300/400:

    dolgu (koyu tema)    beyaz    mürekkep
    brand-400 #fb8f2a     2.32      ~7.9
    mint-300  #6fd19b     1.86     ~10
    rose-300  #f79ba6     2.06      ~9
    sky-300   #6fd1e3     1.76     ~10.5

Açık temada hepsi 5.3-6.1 ile geçiyor, yani hata YALNIZ koyu temada görünüyor:
mikrofon düğmeleri (ders, sınav), ödeme ekranının simge karosu ve düğmesi,
yerleştirme sınavının harf dairesi, lig tablosunun rozeti, yazma görevinin
onay işareti, patron turunun sonuç dairesi, yönetim panosunun sekmesi.

**Ve jeton zaten vardı.** `--on-fill` (açık beyaz, koyu `--color-ink-900`)
`globals.css`te tanımlı ve yorumu mobilin `onFill`ine atıf yapıyor - ama
TEK bir yerde kullanılıyordu (`empty-card`). Yani §11.41'in mobil hikâyesinin
aynısı: doğru soyutlama yazılmış, kullanılmamış. Bu turda `.on-fill` yardımcı
sınıfı eklendi (Tailwind `text-white` yerine geçsin diye) ve on beş yüzey ona
bağlandı.

İlk denemede jetonu yeniden TANIMLADIM - `globals.css`te zaten vardı ve iki
kopya oluştu. Ölçüp gördüm, kopyaları geri aldım; mevcut tanım duruyor.

**İki yedek düzeltildi, ayrı bir sebeple.** `intro-game` (artikel rozeti) ve
`player-shell` (seviye rozeti) dolguyu sabit basamaklardan alıyor ama YEDEĞİ
`?? "var(--color-brand)"` idi - yani beyaz yazı yalnız yedek yolda okunmuyordu.
Yedek sabit basamağa (`--color-brand-700`) çekildi; rozetin kendi rengi
sabit kaldığı için beyaz orada doğru.

Kapı da tamamlandı: `check:colors` artık webin bu kuralını da denetliyor
(tema duyarlı dolgu + beyaz içerik). Gürültü tabanı burada da SIFIR, istisna
listesi yok. Yakaladığı doğrulandı - `mic-disclosure` bir satır geri alındığında
kapı kırıldı, sonra geri alındı.

### 11.44 Yumuşak tint oranı: ölçülen %14, bileşenler %16-18'e kaymıştı

Yumuşak tint kalıbı iki platformda AYNI ve bu turda doğrulandı: zemin
tonun ~%14 saydamı, üstündeki içerik o tonun METİN varyantı. Mobilde
`tint + "22"` (0x22 = %13.3) ve `onTint(tint, colors)`; webde
`color-mix(... 14%, transparent)` ve `var(--color-mint)` gibi anlamsal
jetonlar. İki taraf birbirinden bağımsız aynı yere gelmiş.

Mobil temiz çıktı: on iki tint yüzeyinin hepsi metin varyantını kullanıyor -
yedisi `onTint` yardımcısıyla, beşi doğrudan `streakText` / `infoText` gibi
yazarak, ki `onTint`in döndürdüğü değerin ta kendisi.

**Webde oran kaymıştı.** `palette-check.mjs` 12. bölümü ("yumuşak rozet")
altı ailenin metin varyantını KENDİ %14 TİNTİ üstünde ölçüyor - yani
garanti edilen oran %14. Bileşenler ise %16 ve %18 kullanıyordu:

    tint            açık tema    eşik 4.5
    mint %18          4.34        KALIR
    mint %16          4.44        KALIR
    flame %16         4.47        KALIR
    brand %16         4.59        geçer (ama ölçülen oran değil)
    mint/flame %14    4.54/4.55   geçer

Beş yer %14'e çekildi: patika ünitesinin iki rozeti, arkadaşlar başlığının
üç sayacı. Marka ailesindeki ikisi tesadüfen eşiği geçiyordu ama garanti
edilen oran %14 olduğu için onlar da eşitlendi - "tesadüfen geçmek" bir
kural değil.

Kapıya kural eklendi: yazı taşıyan bir tint %14'ü aşamaz. Yazısız tint
yüzeylerinde oran serbest (rapor kutusunda %10, konuşma göstergesinde %22
var ve ikisinde de üstünde renk verilmiş bir içerik yok), o yüzden kural
ancak aynı stilde bir `color:` varsa işliyor.

**Kuralı yazarken yanlış bir eşik seçtim ve ölçüm düzeltti.** İlk hâli düz
bir "%14'ü aşma" idi ve marka ailesindeki iki yeri yanlış pozitif olarak
işaretledi (4.59, yani gerçekten okunuyorlar). Bir an ailelere göre ayrı
eşik yazmayı düşündüm; doğru cevap kapının kendisinde değildi -
`palette-check` yalnız %14'ü ölçtüğü için garanti edilen tek oran o, ve
bileşenleri ona eşitlemek hem kuralı hem ölçümü tek noktaya bağlıyor.
Ailelere göre eşik, kontrast matematiğini ikinci bir betiğe kopyalamak
demek olurdu.

### 11.45 Tipografi ve yarıçap eşleşiyordu — ama hiçbir şey ölçmüyordu

Renk ekseninden çıkıp tipografiye geçtim ve bu kez sapma bulamadım. Sekiz
punto varyantının hepsi birebir:

    display 32/800/-0.5px · h1 26/800/-0.3px · h2 20/700 · h3 16/700
    body 15/500 · bodyStrong 15/700 · caption 12.5/600 · micro 11/700/+0.4px

Web bunları `--text-*` jetonlarında aynı değerlerle taşıyor ve yorumları
mobilin piksel karşılığını yazıyor (`/* mobil: -0.5px @ 32 */`). Yarıçap da
aynı - adlar bilerek farklı (mobilin `sm/md/lg/xl/xxl`si Tailwind'in kendi
`rounded-*` adlarıyla çakışıyordu, web adları NEREDE kullanıldıklarını
söylüyor: chip 10, tile 14, panel 20, card 26, float 34) ama sayılar
mobildekiyle aynı. Boşluk ölçeği de öyle: 4/8/12/16/20/28/40, Tailwind'in
0.25rem tabanında 1/2/3/4/5/7/10.

**Bulunan eksik ölçüm değildi, ÖLÇEN yoktu.** Bu hizalama tamamen elle
yapılmış ve gerekçesi yazılı, ama hiçbir kapı bakmıyordu: mobilde `radii.lg`yi
20'den 18'e çeken bir düzenleme webi sessizce ayırır ve hata ancak iki ekranı
yan yana koyan biri fark ederse görünür. `check:parity` kayıt defterleri
(kurslar, oyunlar, seviyeler) için bu işi yapıyor; tasarım ölçekleri için
karşılığı yoktu.

`scripts/check-tokens.mjs`: `mobile/src/theme/tokens.ts`i okuyup
`globals.css`teki jetonlarla karşılaştırıyor - yirmi ölçüm (8 punto + ağırlık
+ harf aralığı, 5 yarıçap, 7 boşluk). Yön mobil → web, çünkü Android en
ileride olan taraf. Ad eşlemeleri (`bodyStrong`→`strong`, `sm`→`chip` …)
betikte sebebiyle yazılı. `package.json`da `check:tokens`, CI'da "Tasarım
jetonları" adımı.

Kapının ölçtüğü doğrulandı: mobil `radii.lg` 18'e ve `h2` puntosu 21'e
çekildiğinde ikisini de yakaladı (çıkış kodu 2), sonra geri alındı.

**Bir yanlış pozitifi ölçüm düzeltti.** İlk hâli harf aralıklarını `em`
cinsinden karşılaştırıyordu ve h1'i ayrışmış gösteriyordu: -0.3px @ 26 =
-0.011538em, web ise -0.012em yazıyor. Bu gerçek bir ayrım değil, üç haneye
yuvarlama - piksel cinsinden farkı 0.012px. Karşılaştırma piksele çevrildi ve
toleransı 0.05px oldu; ölçünün birimi neyse karşılaştırma da o birimde
olmalı.

### 11.46 Gölge formülü: bir basamak kendi türetiminden sapmıştı

§11.45'in kapsamadığı iki jeton ailesini ölçtüm.

**Gölge — ölçülebilir, ve bir sapma çıktı.** Mobil `softShadow(color,
elevation)` iOS'ta üç sabitle çalışıyor: y ofseti yüksekliğin 0.7'si,
bulanıklık 1.6'sı, opaklık 0.16. Web aynı formülü üç basamağa dondurmuş
halde taşıyor. Türetimi elle yürüttüm:

    elevation  y = 0.7e   bulanıklık = 1.6e   web değeri
    6          4.2 → 4     9.6 → 10           0 4px 10px … / 0.14   <-- opaklık
    10         7.0 → 7    16.0 → 16           0 7px 16px … / 0.16
    16        11.2 → 11   25.6 → 26           0 11px 26px … / 0.16

`--shadow-soft-sm` opaklığı 0.14 yazıyordu; formülün sabiti 0.16 ve öteki iki
basamak onu kullanıyor. Tek basamağın ayrı bir değer taşımasının yazılı bir
sebebi yoktu - görsel etkisi küçük ama kod kendi belgelediği türetime
uymuyordu, ki bu tam olarak "sayı doğru mu" sorusunu cevaplanamaz yapan şey.
Formüle eşitlendi.

Kapıya eklendi: `check:tokens` artık mobil `softShadow`un ÜÇ SABİTİNİ kaynaktan
okuyup üç basamağı yeniden türetiyor. Yani formül değişirse webin donmuş
değerleri sessizce eskimiyor. Doğrulandı - mobil opaklık 0.2'ye ve bulanıklık
çarpanı 1.8'e çekildiğinde altı ölçüm birden kırıldı, sonra geri alındı.

Kapsam dışı bırakılan iki şey, sebebiyle: `spread` (-2/-4/-6px) ve CSS
bulanıklığının iOS `shadowRadius`ıyla birebir olmayan anlamı - ikisi de webe
özgü, kayıtlı bir yaklaşım. Koyu tema gölgeleri de kapsam dışı: orada gölge
bilerek siyah ve daha opak (0.4/0.45/0.5), çünkü sıcak kahve bir gölge koyu
zeminde görünmüyor.

**Satır yüksekliği — karşılaştırılamıyor, kaydedildi.** Web sekiz varyantın
hepsine satır yüksekliği veriyor (1.15 … 1.5); mobil `typography` HİÇ
vermiyor, React Native punto başına yazı tipinin kendi metriğinden
hesaplıyor. Bu zaten `globals.css`te yazılı bir platform farkı ve bir sayı
karşılaştırmasına dönüşemez.

Yan gözlem, düzeltilmedi: mobilde satır yüksekliği çağrı yerlerinde elle
veriliyor ve tek tip değil - gövde metni için 21 ve 22 (15 punto üstünde 1.40
ve 1.47), açıklama metni için 20 (12.5 punto üstünde 1.60, webin caption'ı
1.40). Bunlar uzun paragraflar için tek tek verilmiş üstünü örtmeler, ölçeğin
parçası değil. Ölçeğe taşımak metin yoğunluğunu her ekranda değiştirir ve
sonucu yalnız iki uygulamayı yan yana görerek yargılanabilir - Sametin
kararı, benim ölçebileceğim bir şey değil.

### 11.47 Punto ölçeğini atlayan yerler — ve girdi puntosunun envanteri

Sistem yazı ölçeği davranışı iki platformda karşılaştırılamıyor ve bu
beklenen: mobil `Text` sistem ölçeğini 1.5 katla sınırlıyor
(`maxFontSizeMultiplier`, gerekçesi 2x'te kırpılan sabit yükseklikli tur
kartları); webde `rem` tabanı tarayıcı yazı ayarını kendiliğinden taşıyor ve
onu sınırlamak WCAG'ın %200 metin gereğini ihlal ederdi. Karşılaştırma
konusu değil.

Ama ölçmeye devam edince ÖLÇEĞİ ATLAYAN yerler çıktı.

**a) `TokenDiff` ham `RNText` kullanıyordu — kendi eklediğim kod.** Cümle
geri bildiriminin iki satırı `<RNText style={{ fontSize: 15 }}>` ve
`fontSize: 13` yazıyordu. İki şeyi birden atlıyordu: punto ölçeğini (13
ölçekte yok - `caption` 12.5) ve sistem yazı ölçeği sınırını. `Text` bileşeni
`maxFontSizeMultiplier`ı 1.5'te tutuyor, ham `RNText` tutmuyor - yani
kullanıcı yazıyı 2x'e aldığında bu iki satır ötekiler sabit kalırken büyümeye
devam ediyordu. `Text` bileşenine ve `body`/`caption` varyantlarına alındı.

**b) İki `variant` üstüne elle punto biniyordu.** `rounds.tsx`te iki satır
`variant="body"` deyip `fontSize: 12` ile eziyordu; 12 ölçekte yok. `caption`
(12.5) ile değiştirildi - yarım punto fark, ama artık ölçeğin içinde ve
varyantın ağırlığını da (600) doğru alıyor.

**c) Girdi puntosu: envanter çıkarıldı, DÜZELTİLMEDİ.**

    yuvarlaklık  punto  yer
    -            16     AuthScreen, Find
    md (14)      16     SettingsScreen, DeleteAccountScreen, SocialSettings
    lg (20)      16     LessonScreen (ders yazma alanı)
    md (14)      15     skillQuiz (5), ExamScreen (2)
    lg (20)      15     WordsScreen, skillLibrary
    lg (20)      18     rounds (3) - tur cevap alanları

Webde `.input` tek bir kural: punto `--text-body` (15), yarıçap
`--radius-panel` (20). Ama webin kendisi de her yüzeyde eziyor - ders yazma
alanı `text-sm` (14) yazıyor.

İki gerçek eşleşme var ve ikisi de doğru çıktı: tur cevap alanları iki
tarafta da 18 (webde `text-lg`), ve ölçeğin gövde puntosu iki tarafta 15.
Ama ORDİNARY girdilerde ne Android'in ne webin tek bir cevabı var - Android
15 ve 16'yı, web 15 ve 14'ü yan yana taşıyor; yuvarlaklık da mobilde
`md`/`lg` arasında bölünmüş, webde tek başına 20.

Bu yüzden düzeltilmedi: "Android'de şu var" diye izlenecek bir değer yok,
onaltı girdinin puntosunu ve yuvarlaklığını tek değere çekmek bir düzine
ekranın görünümünü değiştirir ve hangi değerin doğru olduğu ölçümle değil
bakışla kararlaştırılır. Envanter Samet karar verince tek turda uygulanacak
biçimde burada duruyor.

### 11.48 Dokunma hedefleri: hepsi eşti, biri hariç

Ölçüm, kare dokunma hedeflerinin dağılımı:

    mobil  44x44 43 kez · 46 6 · 48 3 · 42/40/38/36/34 birer-ikişer
    web    h-11 w-11 (44px) 18 kez · h-12 w-12 (48) 10 · h-9 w-9 (36) 5

Baskın değer iki tarafta da 44 ve bu tesadüf değil - webin `h-11 w-11`i
mobilin 44'ünün karşılığı olarak seçilmiş. Geri düğmeleri, kapatma
düğmeleri, satır ikonları hepsi eşleşiyor.

**Ayrışan tek denetim: hoparlör düğmesi.** Ve ayrım GÖRÜNEN boyutta değil,
DOKUNULABİLİR alanda:

    mobil  görünen 20 / 22 (x3) / 24 / 34   + hitSlop 8  → gerçek hedef 36-50
    web    görünen 28 (x7) / 36 (x1)        genişleme yok → hedef 28-36

Yani görünürde web daha büyük ama gerçekte daha küçük bir hedef sunuyordu -
ve bu, uygulamanın en çok dokunulan ikincil denetimi (her kelime, her cümle,
her şıkkın yanında bir tane var). WCAG 2.2'nin 24px asgarisi ikisinde de
tutuyor, yani ihlal değil; ama Android'in hedefi sistematik olarak ~8px daha
büyüktü.

`hitSlop`un web karşılığı yoktu; `.hit-8` yardımcı sınıfı eklendi ve
hoparlör düğmesine bağlandı. Dolgu DEĞİL yalancı öğe (`::after` + `inset:
-8px`) kullanılıyor: düğme metnin yanında satır içinde duruyor ve dolgu
eklemek çevresindeki hizalamayı kaydırırdı. Görünüm hiç değişmiyor, yalnız
tıklama alanı büyüyor.

Yan düzeltme: mobil `SpeakButton`ın varsayılan boyutu 40'tı ve hiçbir çağrı
yeri onu kullanmıyordu (altı çağrı 20/22/22/22/24/34 veriyor). Yeni bir çağrı
yeri ötekilerin hiçbirine benzemeyen bir düğme üretirdi; varsayılan çoğunluğa
(22) çekildi.

**Webde kalan iki küçük hedef, sebebiyle bırakıldı:** özel karakter ekleme
düğmeleri (ä ö ü ß) `min-h-9 min-w-9` (36px) ve hoparlörün küçük varyantı.
Karakter satırının Android'de karşılığı HİÇ YOK ve olmaması doğru - native
klavye o harfleri uzun basmayla veriyor, ayrıca cevap karşılaştırması umlaut
katlıyor (`textFold`), yani "ae" yazmak da kabul ediliyor. Webin kendine
özgü bir yüzeyi ve 36px WCAG asgarisinin üstünde.

### 11.49 Kalan `hitSlop` çağrıları: biri hariç hepsi zaten yeterliydi

§11.48'in açtığı soruyu sonuna kadar sürdüm: mobilde 55 `hitSlop` çağrısı var
(38'i 4, 10'u 6, 7'si 8), web'de hiçbir denetimde genişleme yoktu. Ama
ölçüm gösterdi ki genişleme ÇOĞUNLUKLA taşıyıcı değil:

    görünen boyutu 44 ve üstü olan     37   (hitSlop bir incelik, 44 zaten yeterli)
    görünen boyutu 44 altı olan          1   (skillLibrary, 36 + 8 → 52)
    boyutu koddan okunamayan            17   (metin bağlantıları, dolgulu satırlar)

Yani geri düğmelerinin, kapatma düğmelerinin, satır ikonlarının `hitSlop`u
44'ü 52'ye çıkarıyor - hoş ama webin 44'ü de asgariyi geçiyor. Burada
yapılacak bir şey yok ve 37 yere `hit-8` serpmek gürültü olurdu.

**Okunamayan 17'nin içinden üçü gerçekten geride kalmıştı** ve üçü de satır
içi mikro denetim - kodu satır satır okuyup doğruladım:

- **Ders baloncuğunun dinle düğmesi** (`lesson-player`): 28px daire,
  genişleme yok. Mobil karşılığı `hitSlop={8}` taşıyor. `hit-8` ile 44.
- **"Bu yanıtı bildir"** (`lesson-player`) ve **"Bu geri bildirimi bildir"**
  (`writings-card`): çıplak 11px yazı, dolgu yok - yani hedefin yüksekliği
  yazının kendisi kadardı, **WCAG 2.2'nin 24px asgarisinin altında**. Bu bir
  parite eksiği değil, doğrudan bir erişilebilirlik hatası; üstelik Play'in
  "yapay zekâ içeriği bildirilebilmeli" politikasını karşılayan denetim.
  `hit-8` ile ~29. Mobil ikisine de `hitSlop={8}` veriyor.

**Genel bir süpürme denemesi başarısız oldu ve sebebi kayda geçsin:** "küçük
puntolu, dolgusuz tıklanabilir öğe" arayan bir tarama 47 sonuç verdi ama
büyük kısmı yanlış - bir düğmenin İÇİNDEKİ açıklama `<span>`ı, düğmenin
kendisi dolguluyken. Metin taraması hangi öğenin tıklanabilir olduğunu
bilmiyor; doğrusunu ayırmak DOM gerektirir. O yüzden bu eksen kapıya
konmadı, üç denetim elle doğrulanıp düzeltildi.

### 11.50 Erişilebilirlik etiketleri temiz — ama paylaş düğmesi Türkçe yazıyordu

`accessibilityLabel` ↔ `aria-label` kapsamını ölçtüm: mobilde 92, webde 69
kullanım. Sayı farkı bir eksik DEĞİL - React Native'de dokunulabilir her
sarmalayıcı etiket istiyor, HTML'de `<button>` içindeki metin kendiliğinden
erişilebilir ad oluyor.

Aranan gerçek hata "ikon-only düğme, etiketsiz". Tarama dokuz aday verdi ve
**dokuzu da yanlış pozitif** çıktı: hepsinde ikonun yanında görünen bir metin
var (seçili işaretinin altındaki ses adı, "Sonucu paylaş"ın yanındaki bağlantı
ikonu, doğru/yanlış düğmelerindeki büyük yazı). Yani webde etiketsiz ikon
düğmesi yok; bu eksen temiz.

**Ama tarama başka bir şey buldu.** `share-result.tsx`teki düğmenin iki
etiketi elle Türkçe yazılıydı:

    {copied ? <>… Kopyalandı</> : <>… Sonucu paylaş</>}

Arayüzü İngilizce ya da Almanca olan kullanıcı bu düğmede Türkçe okuyordu.
Dosyanın kendi `tr()` yardımcısı var ama o PAYLAŞILAN METNİ çeviriyor,
bileşenin arayüzünü değil - yani makine hazırdı, bu iki dizge yanından
geçmişti.

Adlar Android'den alındı: orada aynı düğme `common.share` ("Paylaş") diyor,
"Sonucu paylaş" değil. Kopyalandı durumu webe özgü (Web Share API yoksa panoya
düşülüyor) ve karşılığı iki sözlükte de duran `referral.copied`. Yeni anahtar
uydurmak gerekmedi.

Cırcırlı taban 171'den **169'a** indi. `--baseline` yalnız gerçekten düştüğü
için yazıldı; sayı yalnız aşağı iniyor.

**Yan bulgu, kaydedildi:** tabandaki 169'un büyük kısmı Türkçe arayüz metni
DEĞİL. Tarayıcı Türk alfabesindeki harfleri arıyor ve Almanca umlautlar
(ä/ö/ü) o kümeyle çakışıyor - yani `voice-picker`ın Almanca örnek cümlesi,
tur ekranlarının "ä ö ü ß" karakter satırı, `courses.ts`teki "Züritüütsch"
hep sayılıyor. Bu yüzden taban sıfır değil ve olamaz; asıl iş bu gürültünün
içindeki gerçek arayüz metinlerini ayırmak - bu turda ikisi ayrıldı.

### 11.51 Tabandaki 169 ayıklandı: bileşen tarafında gerçek çeviri borcu YOK

§11.50'de tabanın büyük kısmının Almanca umlaut gürültüsü olduğunu yazmıştım.
Bu turda ayrımı ölçtüm. Önce kaba bölme:

    bileşen / sayfa   55 dizgi / 30 dosya
    lib + api        102 dizgi / 54 dosya
    öbür              12 dizgi /  3 dosya

Sonra gürültüyü ayırmak için TÜRKÇEYE ÖZGÜ harfleri kullandım: `ı ş ğ ç İ Ş
Ğ Ç` Almancada YOK, yani bir dizge bunlardan birini taşıyorsa gerçekten
Türkçedir. Bu ayrım umlaut yanılgısını tümden eledi.

İlk tarama 267 sonuç verdi ve büyük kısmı yanlıştı - çünkü satır satır
"yorum mu" bakmak `{/* … */}` bloklarının ortasını kaçırıyor (aynı hatayı
§11.42'de `check:colors`ta yapıp düzeltmiştim; burada tekrarladım). Yorumlar
düzgün ayıklanıp yönetim panosu, demo sayfaları ve `console.*` satırları da
çıkarılınca liste **25**'e indi. Yirmi beşin hepsini tek tek okudum ve
hepsi meşru:

- `lesson-player` `TRUE_WORD` / `FALSE_WORD` (doğru/richtig/true …):
  tanıyıcının dile göre beklediği KELİME. Sözlükten gelemez, üç dilin üçü de
  yazılı.
- `walk-player` `note("cebe alındı")` ve üç kardeşi: teşhis paneline yazılan
  geliştirici izi (`setDiag`), kullanıcı arayüzü değil.
- `roleplay-exam` `constraints: ["yardım yok"]`: yapay zekâya GİDEN istemin
  parçası, ekrana çıkan metin değil.
- `legal-shell`: kendi ÜÇ DİLLİ tablosunu taşıyor (tr/en/de tam çeviri).
  `t()` sözlüğünden geçmiyor ve geçmemesi bilinçli - hukuk metinlerinin
  çevresi metinlerin kendisiyle birlikte duruyor.
- `app-shell` `useShell yalnız AppShell içinde…`: geliştirici hatası.
- `screen-diag`: geliştirici katmanı.
- `layout.tsx` + `opengraph-image.tsx`: sitenin kök meta verisi ve OG
  görseli.

Yani §11.50'de düzelttiğim iki dizge, bileşen tarafındaki tek gerçek çeviri
borcuymuş. Kalan 169 bir borç listesi değil, bir kabul listesi.

**Kaydedilen tek açık soru:** kök meta verisi (site başlığı, açıklama, OG
görseli) yalnız Türkçe. Sayfa başlıkları `titleMeta` ile çevrilirken kök
sabit kalıyor. Bu bir hata değil - Türkiye pazarı için birincil dil Türkçe ve
kök meta verisi SEO'ya ait bir karar - ama üç dilli bir arayüzün kökünün tek
dilli olması Sametin görmesi gereken bir seçim. Değiştirmedim.

### 11.52 Patika'nın 11-18. üniteleri Androidde adsızdı

Mobil tarafta aynı harf süzgecini uyguladım. Mobilin tabanı (123 dizgi / 11
dosya) ayrıştı:

    data/moduleThemes.ts   54   müfredat: modül başlıkları
    data/firstWords.ts     40   öğretilen kelimelerin Türkçe karşılıkları
    lib/numbers.ts         10   sayı sözcükleri
    lib/courses.ts          7   dil adları (webin 7'siyle aynı)
    data/demoPlacement.ts   5   demo yerleştirme içeriği
    ui/VoicePicker.tsx      2   Almanca örnek cümle (webin 2'siyle aynı)
    dört dosya              5   "Türkçe" (x3, dil adı kendi dilinde), "Hören" (x2)

Yani mobilin 123'ü de webin 169'u gibi bir kabul listesi - arayüz borcu yok.
Beş arayüz dosyası dizgesinin hepsi meşru: dil adları kendi dilinde yazılır
(kural `SettingsScreen`de yazılı: arayüz yanlış dildeyken bile kullanıcı
kendi dilini tanıyabilsin) ve "Hören" bir Almanca sınav bölümü adı.

**Ama ayıklama sırasında canlı bir hata çıktı.** `moduleThemes.ts`in web
karşılığı `lib/lessons/modules.ts` ve iki kopya elle tutuluyor. Web B1'i
**2026-09-05'te on sekiz modüle genişletmiş** (kapsanmayan 1059 B1 maddesi
kümelendi, bkz. `docs/plan/b1-yeniden-kurgu.md`); mobil listede on tema
kalmıştı. Oysa `mobile/src/data/lessons/de-b1.json` **180 ders** taşıyor,
yani on sekiz modül: Patika'nın 11-18. üniteleri adını bulamayıp
`immersionTrack`in jenerik yedeğine ("B1 Ünite 11") düşüyordu. İçerik
yerindeydi, adı yoktu - sekiz ünite adsız açılıyordu.

Sekiz tema mobile birebir taşındı ve `check:parity`ye beş bölüm eklendi
(A1-C1 modül temaları). Doğrulandı: bir temayı elle bozunca kapı kırıldı,
sonra geri alındı. Karşılaştırma mobilin `de` dalıyla, çünkü webin tablosu
kurs boyutu TAŞIMIYOR - mobilde `de`/`en` var, webde yalnız seviye. `en`in
A1/A2 listeleri bugün `de` ile birebir aynı olduğu için görünür etkisi yok,
ama İngilizce kursunun temaları ayrıştığı gün web Almanca temaları gösterir.
Bu kayda geçti; webe kurs boyutu eklemek ayrı bir iş.

**Cırcırlı taban 123'ten 69'a indi** - ama düşüş bir borç ödemesi değil,
tanım düzeltmesi. Tarayıcıya `SKIP_CONTENT` listesi eklendi ve
`moduleThemes.ts` oraya girdi: dosyanın başlığında "kursun MÜFREDATINI
anlatır, arayüz metni değil" yazılı, sözlüğe taşımak yanlış olurdu ve aynı
müfredat webde de aynı biçimde duruyor. Liste DAR: yalnız başlığında içerik
olduğu yazılı, saf veri dosyaları. `firstWords`/`numbers`/`demoPlacement` de
aynı sınıfa giriyor ama bu turda taşınmadı - biri taşınıp ötekiler
bırakılmasın diye hepsi birlikte, ayrı bir turda değerlendirilecek.

### 11.53 "Birebir aynı kalmalı" diyen üç çift daha — şimdi ölçülüyor

§11.52'nin dersi şuydu: dosya başlığında "birebir aynı kalmalı" yazmak
drift'i durdurmuyor, ölçüm durduruyor. Kalan içerik dosyalarını o gözle
taradım.

    mobil dosya                web karşılığı              kapı var mıydı
    data/moduleThemes.ts       lib/lessons/modules.ts     yoktu → 11.52'de eklendi
    data/firstWords.ts         lib/first-words.ts         YOKTU
    data/demoPlacement.ts      lib/placement-demo.ts      YOKTU
    lib/numbers.ts             lib/numbers.ts             VARDI (gövde paritesi)

`first-words.ts`in başlığı bunu açıkça yazıyor: *"Veri mobil
`M/src/data/firstWords.ts` ile BİREBİR aynı ve öyle kalmalı… iki dosyadan
biri değişirse diğeri de değişmeli."* Aynı cümle modül temalarında da
yazılıydı ve beş gün ayrışık kaldı.

**İkisi de bugün eşit çıktı** - ısınma kelimelerinin veri blokları bayt
bayt aynı, demo yerleştirmede tek fark içe alma yolu (`@/lib/courses` ile
`../lib/courses`, ki zaten farklı olmak zorunda). Yani düzeltilecek bir
sapma yok; eksik olan yalnız kapıydı.

`check:parity`ye iki bölüm eklendi: "ilk kelimeler" (116 dizge) ve "demo
yerlestirme" (84 dizge). Karşılaştırma dizge dizge - iki dosyadaki tırnaklı
değerler sırayla, içe alma yolu elenerek. Doğrulandı: ısınma kelimelerinden
birinin Türkçe karşılığını bozunca kapı kırıldı ve hangi kelimede ayrıştığı
çıktıda görünüyor, sonra geri alındı.

Ancak bu kapılar kurulduktan SONRA dördü de tarayıcının `SKIP_CONTENT`
listesine alındı ve her satırın yanına hangi parite bölümünün onu koruduğu
yazıldı. Sıra önemliydi: sayımdan çıkarmak gözden çıkarmak olmasın.

**Mobil cırcırlı taban 69'dan 14'e indi.** Kalan on dört dizgenin hepsi
§11.52'de tek tek okunmuş ve meşru bulunmuştu: `courses.ts`in dil adları (7,
webin 7'siyle aynı), `VoicePicker`ın Almanca örnek cümleleri (2), üç dosyada
"Türkçe" (dil adı kendi dilinde) ve iki yerde "Hören" (Almanca sınav bölümü
adı). Bu sayı artık gerçekten bir taban: her satırı bilinen ve gerekçesi
yazılı.

### 11.54 Aynı soruyu web tarafına sordum: iki gövde çifti daha kapısız

`check:parity`nin gövde karşılaştırmaları neyi kapsıyordu: sayı sözcüğü
modülü, cümle hakemi, `errors` saf yardımcıları. Bu oturumda mobile taşınan
öteki gövdeleri ve webin "mobil ile BİREBİR" dediği dosyaları taradım.

**a) Deneme sınavı cevap katlaması — kapısı yoktu.**
`src/lib/mock-exams/scoring.ts` ile `mobile/src/game/mockExam.ts` içindeki
`foldAnswer` aynı kural olmak zorunda ve iki dosya da bunu yazıyor. Sonucu
mobil dosyanın yorumunda duruyor: *ayrılırlarsa öğrenci ekranda DOĞRU görünen
bir cevabın sunucuda yanlış sayıldığını görür.* Kesme işareti kuralının
eklenmesi tam bu hataydı - İngilizce boşluk doldurmada doğru cevap yanlış
sayılıyordu.

Bugün eşit. Kapı eklendi ve yalnızca işlevin GÖVDESİNİ karşılaştırıyor: iki
dosyanın geri kalanı tamamen farklı (biri sunucu puanlaması, öteki mobil
oturum çağrıları). Doğrulandı - mobilden kesme işareti satırını silince kapı
kırıldı ve eksik satır çıktıda göründü.

**b) Yürüyüş modunun ses tablosu — asimetrik kapı.**
Webin `lib/sfx.ts` `WALK_NOTES`u, mobil `SFX_NOTES`in üç girdisinin
(micon/micoff/premium) kopyası ve web dosyası bunu kendisi yazıyor. İlginç
olan şu: MOBİL tarafta tablonun üç kopyasını (Kotlin, Swift, mp3) koruyan bir
kapı VAR (`mobile/__tests__/sfxNotes.test.ts`), WEB kopyasını koruyan yoktu.
Yani nota tablosu değişince üç native çıktı kırılıp haber veriyor, web
sessizce eski sesi çalmaya devam ediyordu.

Bugün eşit. Üç ikili için sayı sayı kapı eklendi; bir frekansı bozunca
kırıldığı doğrulandı.

Kapıyı yazarken bir ölçüm hatası yaptım ve düzelttim: ilk sürüm nota
satırlarını ayıklarken dizinin AÇILIŞ ayracını da bir satır sanıyordu ve ilk
alan `NaN` çıkıyordu. İki tarafta aynı çıktığı için karşılaştırma yine
doğruydu ama ilk sayıdaki bir ayrımı gizleyebilirdi - ayıklama başlık
ayracından sonra başlatıldı ve ilk alanı değiştiren bir enjeksiyonla yeniden
doğrulandı.

**Kapı gerekmeyenler:** `mobile/src/lib/voiceMatch.ts` ve `textFold.ts`in web
karşılığı YOK - web aynı işi tanıyıcı yolunun içinde yapıyor, ayrı bir modül
değil. `stt.ts`teki "birebir" ise Azure kotasının yuvarlanmasıyla ilgili,
platformlar arası bir iddia değil.

### 11.55 Kapının kendi kapsamını ölçtüm: on beş sabit çifti kapısız, ikisi ayrışmış

`check:parity`nin otuz bölümü elle eklenmişti. Bu turda listeyi LİSTELEDİM:
iki ağaçta aynı adla duran `export const AD` sabitleri arandı - **23 eşleşme**
bulundu ve **18'i** kapıda hiç geçmiyordu. Sonra on sekizin değerleri
karşılaştırıldı: **on ikisi eşit** (yani sessizce doğru duruyorlardı),
**altısı** ayrı çıktı. Altının dördü biçim farkıydı (son virgul, `as const`,
webin `pkg.version` ifadesi - o zaten `version:check`in konusu), **ikisi
gerçek**:

**a) Efsane rozeti koyu temada iki uygulamada iki ayrı mordu.** Web
`TIER_COLOR`ın üç değeri sabit hex, dördüncüsü `var(--color-violet)` yazılıydı
- yani tema duyarlı. Rozet dolu zemin + BEYAZ ikon taşıyor:

    beyaz / violet-600 #77439d (açık tema)  6.83
    beyaz / violet-300 #ae79d4 (koyu tema)  3.24   ← dördün en kötüsü

Tablonun kendi yorumu bu dört değere "kimlik" diyor ve kimlik temayla dönmez;
mobil karşılığı dördünü de sabit tutuyor. Web'in değeri açık temada zaten
`violet-600`e çözülüyordu, o yüzden sabitlemek açık temayı hiç değiştirmedi -
koyu temayı Android'e eşledi.

**b) Ölü `speak` ünite türü webde duruyordu.** `ImmersionItemKind` yedi tür
sayıyor ve `speak` içinde yok - ne sunucu üretiyor ne yerel kurucu. Ama
`unit-pane.tsx`in üç tablosu `Record<string, …>` yazılıydı, yani derleyici
fazlalığı GÖRMÜYORDU ve `speak` üç yerde (sözlük anahtarı, renk, ikon
dallanması) duruyordu. Mobil bunu daha önce temizleyip tabloyu `data/unit`teki
tek tanıma bağlamıştı; web de artık öyle - `Record<ImmersionItemKind, …>`,
yani sunucunun kümesi değişince derleyici burayı zorluyor. Sözlük anahtarı
`unitkind.speaking` DURUYOR: Yapabildiklerim ve Yazılarım onu beceri adı
olarak kullanıyor.

Kapıya üç bölüm eklendi: on beş sabit çifti (metin normalize edilerek),
`KIND_TINT`in ANAHTAR kümesi (değerler bilerek farklı biçimde - webde CSS
değişkeni, mobilde palet jeton adı) ve ses kayıt defteri (kimlik + kurs;
etiket/not anahtarları iki tarafta farklı olabilir ama hangi ses hangi kursta
sorusu aynı cevabı vermeli).

Normalize ederken bir tuzağa düştüm ve düzelttim: ilk sürüm yorumları
ayıklamıyordu, yani (a)'daki gerekçeyi web dosyasına yazmak kapıyı kırdı.
Yorum ayıklaması artık normalize adımının parçası - iki taraf aynı kararı
kendi diliyle anlatabilir.

### 11.56 "Hareketi azalt" mobilde hiç onurlandırılmıyordu

Animasyon eksenini ölçtüm. Süreler karşılaştırılabilir değil (biri `Animated`
yayı, öteki CSS geçişi) ama ölçülebilir bir şey çıktı: **azaltılmış hareket
tercihi.**

    web    reducedMotion() 6 yerde + globals.css medya sorgusu
    mobil  AccessibilityInfo hiç çağrılmıyor

Yani Android'de "Animasyonları kaldır" açık olan kullanıcı yüz on parçacıklı
konfetiyi, her dokunuşta ölçek yayını ve iskelet nabzını olduğu gibi alıyordu.
Web tercihi altı yerde onurlandırıyor. Bu, referans platformun geride kaldığı
bir erişilebilirlik ayarı - ve sistem ayarı olduğu için kullanıcı zaten
"istemiyorum" demiş durumda.

`mobile/src/lib/reduceMotion.ts` eklendi, web `lib/fx` + `use-still` ikilisinin
karşılığı: açılışta bir kez okunuyor (`App.tsx` önyükleme zinciri, ilk
çizimden önce) ve `reduceMotionChanged` dinleniyor, yani kullanıcı ayarı
uygulama açıkken değiştirirse bir sonraki animasyon doğru kararı verir. Değer
SENKRON: animasyon kararı render sırasında veriliyor, Promise beklenemez.
Okunmadan önceki ilk anlarda `false` - webin `useStill()`ü de ilk render'da
`false` diyor ve aynı sebeple.

Üç yüzeye bağlandı:
- **Konfeti** hiç çizilmiyor (web `celebrate.tsx` de aynı kararı veriyor).
- **`PressableScale`** ölçek yayını atlıyor; düğmenin işi ve sistem basma
  vurgusu duruyor, yalnız hareket kalkıyor.
- **İskelet** nabzı hiç başlamıyor, sabit opaklıkta duruyor - iskeletin işi
  şekli ve yüksekliği göstermek, nabız süsleme.

**Bu turda ortak çalışma ağacı ilk kez ısırdı.** `mobile/src/lib/nativeContent.ts`
içinde ölü bir `eslint-disable` gördüm ve düzelttim; sonra `git status`
dosyanın İZLENMEYEN olduğunu gösterdi - yani başka bir Claude oturumunun
üzerinde çalıştığı, henüz commit edilmemiş dosyası. Düzeltmeyi geri alıp
dosyayı bulduğum hâle döndürdüm. Aynı sebeple mobil `lint`e
`--max-warnings 0` eklemekten de vazgeçtim: bayrak DOĞRU (web'de var, mobilde
yok - kapı asimetrisi) ama şu an yakaladığı tek uyarı o oturumun dosyasında
ve onların derlemesini kırardı. Ağaç temizlendiğinde ayrı bir turda.

Aynı sebeple `i18n:check` şu an kırmızı (18 dizge / taban 14) ve TABAN
YENİLENMEDİ: fazladan dört dizge o iki izlenmeyen dosyada, benim
değişikliğim sıfır dizge ekliyor. Başka bir oturumun yarım işini cırcıra
yazmak, onların borcunu benim kapımdan geçirmek olurdu.

### 11.57 Webin azaltılmış hareket bloğu framer-motion'ı hiç kapsamıyordu

§11.56'da mobili bağladım; bu turda webin kendi kapsamını ölçtüm ve simetrik
bir boşluk çıktı.

`globals.css`teki blok iyi yazılmış: `[data-stagger]` çocukları yerinde
gösteriliyor, `.animate-shake`/`.animate-glow` duruyor, `.pressable:active`
ölçeği kalkıyor ve sonunda genel bir süpürge var -
`*, *::before, *::after { animation-duration: 0.01ms; transition-duration: 0.01ms }`.
Blok CSS animasyonlarının hepsini kesiyor.

**Ama framer-motion CSS geçişi KULLANMIYOR.** Satır içi `transform`u kendi
zamanlayıcısıyla sürüyor, yani o süpürge ona hiç dokunmuyor. Ölçüm:

    framer-motion kullanan bileşen        49
    tercihi okuyan (useStill/reducedMotion) 8
    `whileTap` ölçeği (JS, CSS ile kapatılamaz)  11 çağrı / 7 dosya

Yani ders oynatıcısının mikrofon düğmesi, dinleme turunun düğmesi, sıralama ve
karıştırma karoları, doğru/yanlış düğmeleri, hoparlör - tercihi açık olan
kullanıcıda hepsi basınca hâlâ küçülüyordu.

Düzeltme tek yerden: `MotionProvider` (`MotionConfig reducedMotion="user"`)
kök yerleşime eklendi. Kütüphane tercihi kendisi okuyup dönüşüm ve düzen
animasyonlarını atlıyor, hareket İÇERMEYEN opaklık geçişlerini bırakıyor.
Kırk dokuz dosyaya `useStill()` serpmek yerine bir sarmalayıcı - ve yeni bir
bileşen eklendiğinde kimsenin bir şey hatırlamasına gerek yok.

İki platformun çözümü bu yüzden farklı biçimde: webde tek bir animasyon
kütüphanesi var ve tek sarmalayıcı hepsini kapsıyor; mobilde `Animated`
sürücüleri tek tek yazılmış, o yüzden sekiz yüzey tercihi tek tek okuyor
(§11.56). Sonuç aynı: tercih açıkken iki uygulamada da hareket kalkıyor,
bilgi kalıyor.

### 11.58 Ses cue'ları: §11.15'teki belirsiz erteleme ölçülüp keskinleşti

Erken bir turda "`danger`/`record` SFX cue'ları — üretilen sesi
doğrulayamam" diye kaydetmiştim. Bu turda ölçtüm ve kayıt hem BÜYÜDÜ hem
netleşti.

    web    13 cue: micon micoff premium correct wrong tap start stage
                   perfect record unlock finish danger
    mobil   7 cue: correct wrong tap micon micoff finish premium

Fark iki değil ALTI cue ve hepsi mobilin SAHİP OLDUĞU yüzeylerde çalıyor:

    start    tur açılışı — web `session-player` (iki yer), `boss-player`,
             `walk-player`, `challenge-player`. Mobilde GameScreen, BossScreen
             ve WalkModeScreen var ve üçü de başlarken SESSİZ.
    stage    etap bitti (`session-player:1146`)
    perfect  etabın tamamı doğru (`:1146`, `:1308`)
    record   yeni rekor — `boss-player:139`. Mobil `BossScreen` yalnız
             `finish`/`wrong` çalıyor, rekoru ayırmıyor.
    unlock   rozet açıldı (`achievement-unlock`, iki yer) ve görev tamamlandı
             (`quest-card`). Mobilde ikisi de var.
    danger   süre azaldı — `boss-player:172`. Mobil patron turu zamanlı ve
             süre azalınca hiçbir şey duyurmuyor.

**Yeni bilgi bir: dönüşüm ses YAZMAK değil, aritmetik.** Web bu cue'ları
`arpeggio(frekanslar, aralık, süre, tepe, dalga?)` ve `note(başlangıç, frekans,
süre, tepe, dalga?)` çağrılarıyla tanımlıyor; mobilin satır biçimi
`[freq, start, dur, peak, wave, glide, lp, attack, hold, release]`. `arpeggio`
frekans başına bir satır (`start = i * aralık`), `note` tek satır. Yani tablo
türetilebilir.

**Yeni bilgi iki: bu altı cue NATIVE kopya gerektirmiyor.** Kotlin ve Swift
tabloları yalnız EKRAN KAPALI yürüyüş yolu için var (testin kendi başlığı
söylüyor); ekran açıkken çalan iki yol (WebView köprüsü ve mp3) doğrudan
`SFX_NOTES`tan besleniyor. Altı cue'nun hepsi ekran AÇIKKEN çalıyor.

**Yine de eklenmedi, sebebi değişti.** Artık "üretemem" değil, iki gerçek
engel var: (1) hesaplayabilirim ama KULAKLA doğrulayamam - altı yeni sesin
ailenin geri kalanıyla uyduğunu ancak dinleyen biri söyler; (2)
`__tests__/sfxNotes.test.ts` `Object.keys(SFX_NOTES)` üzerinden dönüyor ve
HER türü iki native kopyada arıyor, yani köprüye özgü bir cue eklemek o kapıyı
kırar. Kapıyı "yürüyüş cue'ları" ile "ekran açık cue'ları" diye ikiye ayırmak
gerekir - ses tasarımına ait bir karar.

Bu arada fark DONDURULDU: `check:parity`ye "ses cue kümesi" bölümü eklendi ve
altı cue orada sebebiyle yazılı. Webe yedincisi eklenirse kapı kırılır ve
karar yeniden verilir; sessizce büyümez. Ters yön de ölçülüyor (mobilde olup
webde olmayan cue).

### 11.59 Klavye ve hata durumları: dört bulgu

**a) Klavyenin return tuşu hiçbir şey yapmıyordu.** Ölçüm: mobilde on üç
dosyada `TextInput` var ve return tuşuna tepki veren yalnız ikisiydi
(`rounds.tsx`). Webde aynı alanlar `<form onSubmit>` içinde, yani Enter cevabı
kontrol ediyor / girişi yapıyor. Mobilde tuş ölüydü; kullanıcı klavyeyi
kapatıp düğmeye basmak zorundaydı.

Dokuz tek satırlık alan bağlandı. **Eylem verenler:** skillQuiz kısa cevap
(Enter = Kontrol et, handler düğmenin ta kendisi), promo kodu (= Uygula),
AuthScreen şifre (= giriş/kayıt) ve şifre sıfırlama e-postası (= bağlantı
gönder), DeleteAccount şifre. **Yalnız klavyeyi kapatanlar:** Find ve
WordsScreen aramaları (liste canlı süzülüyor, arama tuşuna gerek yok),
SocialSettings kullanıcı adı, Settings ad, MockExam kısa cevap.

ÇOK SATIRLI alanlara dokunulmadı ve dokunulmamalı: orada return tuşu satır
atlamak için (ExamScreen yazma, LessonScreen, skillLibrary, skillQuiz cümle
alanları, SocialSettings biyografi, rounds serbest cümle).

**b) Promo kodunda ilk dokunuş kayboluyordu.** `PaywallScreen`in
kaydırılabilir yüzeyi `keyboardShouldPersistTaps` vermiyordu: kod yazan
kullanıcı "Uygula"ya bastığında ilk dokunuş yalnız klavyeyi kapatıyor, kodu
uygulamak için ikinci kez basmak gerekiyordu. Metinsel girdi taşıyan on iki
kaydırılabilir yüzeyin on ikisi bunu veriyor - bu ekran tek istisnaydı.

**c) Sınav yüklenemezse çıkmaktan başka yol yoktu.** İstek atan sekiz mobil
ekranın beşi tekrar deneme sunuyor, üçü sunmuyordu. İkisi için bu doğru:
`PathScreen`in `catch`i bilinçli sessiz (bölüm gösterilmiyor; webin patika
kabuğu da tekrar deneme sunmuyor) ve Paywall paket listesi aynı sınıfta.
`ExamScreen` gerçek eksikti - kâğıt isteği geçici bir kesintiyle düşerse tek
çıkış sınavdan ÇIKMAKTI ve haftanın kâğıdı böyle harcanabiliyordu. Kalıp
`AchievementsScreen`den: sayaç artıyor, yükleme etkisi yeniden koşuyor, hata
her denemede sıfırlanıyor.

**d) Ölçülüp temiz çıkan:** `windowSoftInputMode="adjustResize"` manifestte
duruyor, yani klavye alanı Android'de sistemce açılıyor ve ekran başına
`KeyboardAvoidingView` gerekmiyor (iki ekran `automaticallyAdjustKeyboardInsets`
kullanıyor, ikisi de çok satırlı alan taşıyan sohbet yüzeyleri).

### 11.60 Kapı yedek puan üretiyordu — ve iki kapı daha kuruldu

**a) Beceri kitaplığında premium kapısı işini yapmıyordu.** `skillLibrary`in
`catch`i şöyleydi:

    if (isPremiumRefusal(e)) setGated(true);
    setFailed(true);
    … kaba yedek puan …
    onDone(ok);

Süslü ayraç yok, `return` yok: bayrak konuyor ama akış yedek puan hesabına
DEVAM ediyor ve `onDone(ok)` uydurma bir sonuç bildiriyordu. Yani kapının
önlemek için yazıldığı şey - kullanıcıya gerçek olmayan bir not vermek - yine
oluyordu; kodun kendi yorumu tam bunu yasaklıyor ("uydurma bir yedek puan
vermek kapıyı görünmez kılar").

Aynı yerde ikinci eksik: adil kullanım kapısı (429 `quota`) hiç ayrılmıyordu.
`ExamScreen` ikisini baştan beri ayırıyor ve aynı iki sözlük anahtarını
kullanıyor (`assess.fail_premium`, `assess.fail_quota`); burada yalnız premium
vardı, yani günlük hakkı dolan kullanıcı da uydurma puan alıyordu. `gated`
bayrağı `gateNote` metnine çevrildi (iki kapı iki ayrı cümle), kapıda puan
üretilmiyor ve `onDone` çağrılmıyor - değerlendirilen bir şey yok.

**b) Deneme sınavı hata sınıflandırıcısı kapıya bağlandı.** Web `failOf` ile
mobil `failReason` aynı kararı veriyor ve iki dosya da aynı gerekçeyi yazıyor
(403 iki ayrı şey; ikisini birden "oturumun düşmüş" okumak kullanıcıyı boş
yere giriş ekranına gönderiyor). Kapısı yoktu.

**Kapıyı iki kez ölçtüm ve ilk hâli zayıftı.** İlk sürüm yalnız SEBEP
DİZİSİNİ karşılaştırıyordu; webden `|| st === 403` koşulunu çıkaran enjeksiyon
sırayı bozmadığı için yakalanmadı - kapı geçiyordu, oysa sınıflandırma
değişmişti. Şimdi her karar satırı "geçen durum kodları -> sebep" olarak
karşılaştırılıyor ve aynı enjeksiyon kırılıyor
(`401+403 -> unauthorized` ile `401 -> unauthorized`). Koşulun geri kalanı
bilerek dışarıda: biri `HttpError`, öteki `ApiError`.

**Ölçülüp temiz çıkanlar:** web `assess-client` on ayrı sebep döndürüyor
(premium, unauthorized, too_long, quota, invalid, not_configured, upstream,
timeout, aborted, bad_request) ve hepsinin sözlük anahtarı var; `/api/assess`
gerçekten 403/413/429/502/503 döndürüyor ve istemci hepsini ayırıyor. Mobil
tarafta kapılar çağrı yerinde ele alınıyor ve `ExamScreen` ikisini de doğru
ayırıyordu - eksik yalnız `skillLibrary`deydi.

### 11.61 Mobil isteklerin hiçbirinde zaman aşımı yoktu

Ölçüm: web `lib/assess-client` her değerlendirme çağrısını yirmi saniyede
kesiyor (`ASSESS_TIMEOUT_MS`) ve `timeout` sebebini `aborted`dan bile ayırıyor;
`chat-providers`, `tts/azure`, `walk-player` ve serbest cümle turu da
`AbortController` kullanıyor. **Mobilde tek bir zaman aşımı yoktu.**

Sonucu: yapay zekâ uçları (`/api/assess`, `/api/roleplay`) otuz saniyeyi
aşabiliyor ve RN'in `fetch`i işletim sistemi vazgeçene kadar bekliyor.
Kullanıcı dönmeyen bir spinner'a bakıyordu ve çıkış yolu yoktu.

`api()` artık varsayılan yirmi beş saniyede kesiyor - webin yirmisinden biraz
yukarı, çünkü mobil ses yükleyen uçları da (`/api/stt`) aynı istemciden
çağırıyor. Çağıran `timeoutMs` ile değiştirebilir, `0` kapatır. Kesildiğinde
`ApiError(0, "timeout")` atılıyor: durum 0, çünkü sunucudan yanıt gelmedi -
`failReason` gibi sınıflandırıcılar onu doğru biçimde "ulaşılamadı" sayıyor
ama mesaj artık sebebi söylüyor.

**Yan bulgu: altı çağrı paylaşılan istemciyi atlıyordu.** `ItemScreen` ve
`LessonScreen` ilerleme POST'ları, `game/roleplay` sohbet turu, `lib/auth`ın
üç oturum/hesap çağrısı. Her birinin atlama sebebi var (rol yapma METİN
döndürüyor, ilerleme POST'ları yanıtı hiç okumuyor, oturum uçları ham yanıtla
çalışıyor) ama ORTAK eksikleri zaman aşımıydı. `fetchWithTimeout` eklendi:
yanıtı olduğu gibi döndürüyor, yalnız süreyi bağlıyor. Rol yapma turu kırk
beş saniye alıyor (yapay zekâ üretimi, varsayılandan uzun).

Ölçüm doğrulandı: mobilde `api/client.ts` dışında zaman aşımsız `fetch`
kalmadı.

**Ölçülüp temiz çıkanlar:** `writings.ts` düz bir liste çağrısı ve hatayı
`WritingsScreen` ele alıyor (hata durumu + tekrar deneme var);
`/api/assess`in on sebebini web istemcisi tek tek ayırıyor ve mobil kapıları
çağrı yerinde ayırıyor (bkz. §11.60).

### 11.62 Boş durumlar: on iki web yüzeyi, sekiz mobil yüzey, bir gerçek eksik

Web `EmptyCard`ı on iki dosyada kullanıyor, mobilin karşılığı
(`social/common.tsx` `EmptyCard`) sekizde. Farkı tek tek okudum:

    web-only          mobil karşılığı              durum
    achievement-wall  AchievementsScreen           EŞİT - webin boş kartı
                                                   YÜKLENEMEDİ hâli için ve
                                                   mobilde de hata + tekrar
                                                   deneme var
    writings-card     WritingsScreen               EŞİT - kendi boş metni var
    session-player    GameScreen                   EŞİT - `game.nothing_to_review`
    cando-card        CandoScreen                  EKSİK

`CandoScreen` yalnız `loading` / `error` / `ready` biliyordu. Veri gelip de
içi boşsa (henüz ders/alıştırma bitirilmemiş) iki süzgeç de hiçbir şey
döndürüyor ve kullanıcı yalnız başlığı görüyordu: bir şeyin yüklenmediğini mi,
yapacak bir şey olmadığını mı anlayamıyor.

Boş durum eklendi. Ne bileşen ne metin uyduruldu: `EmptyCard` mobilde zaten
sekiz yerde kullanılıyor ve metnin anahtarı (`cando.sign_in_and_finish_lessons_and`)
mobil sözlükte DURUYORDU - webin aynı yerde gösterdiği cümle, mobilde
çevrilmiş ama hiç çağrılmamış.

### 11.63 Yükleme göstergesi: iki ekran kendi kuralını çiğniyordu

`ui/Skeleton`ın başlığı kuralı yazıyor: *"düz spinner yerine içeriğin ŞEKLİNİ
ve YÜKSEKLİĞİNİ gösterir… iskeleti gerçek bileşenle AYNI kaplardan kur"*, ve
rozet ekranı bu dönüşümü daha önce yapmıştı (gerekçesi kayıtlı: içerik gelince
rozetler ortadan yukarı sıçramasın).

Ölçüm: mobilde `ActivityIndicator` kullanan yedi dosya var. Dördü doğru
kullanıyor - üçü düğme içinde (`AuthScreen` "...", `PaywallScreen`,
`LessonScreen`) biri ilerlemede. **İkisi SAYFA yükleme durumu olarak ortada
dönen bir çark gösteriyordu** ve ikisinin de web karşılığı iskelet çiziyor:

    ExamScreen      → web `exam-player` yükleme yer tutucusu (animate-pulse)
    MockStatsScreen → web `app/(app)/mock-exams/stats/loading.tsx`

İkisi de kendi içeriğinin yapısında iskelete çevrildi: sınav kapağı (başlık +
alt başlık + odak satırları, sonra bölüm listesi ve süre) ve istatistik
sayfası (beceri kartı çubuklarıyla, seviye kartı, son denemeler).

**Yan bulgu: webin yorumu yanlıştı.** `mock-exams/stats/loading.tsx`in başlığı
*"Mobil `MockStatsScreen` aynı anda kendi iskeletini çiziyor"* diyordu - oysa
o ekran çark gösteriyordu. Kayıt kodu değil niyeti anlatıyordu; artık ikisi
aynı şeyi söylüyor.

**Bırakılan, sebebiyle:** `MockExamScreen`in çarkı PUANLAMA adımında ve
yanında "puanlanıyor" yazıyor - orada henüz bir içerik ŞEKLİ yok, sunucu
hesaplıyor. İskelet olmayan bir şeyin yerini tutamaz; bu bir ilerleme
göstergesi, yer tutucu değil.

### 11.64 Bildirim izni: reddedilen izin sessizce yutuluyordu

**Düzeltilen.** `NotifPrimeScreen`de "Hatırlat" düğmesi şöyleydi:

    try { await enableDailyReminder(time); } catch { /* izin reddi olsa da devam */ }
    await markNotifPrimed();
    toApp();

`enableDailyReminder` izin alınamazsa `false` DÖNÜYOR (`NotificationsScreen`
dönüşü kullanıyor) ama burada hem dönüş atılıyor hem hata yutuluyordu.
Kullanıcı basıyor, sistem reddediyor, ekran yine de "gösterildi" işaretini
yazıp uygulamaya geçiyordu. Sonuç iki kat kötü: kullanıcı hatırlatmanın AÇIK
olduğunu sanıyor VE ekran bir daha hiç gelmiyor (işaret kalıcı), yani yanlış
inanç kalıcı hâle geliyor.

Artık reddedilen izin düğmenin hemen üstünde söyleniyor
(`notifications.permission_off` - `NotificationsScreen`dekiyle aynı anahtar)
ve işaret YAZILMIYOR, yani ekran bir sonraki açılışta yeniden gelebilir. Web
aynı durumu ayrı gösteriyor (`PushSettings` reddedilen izni açılışta söylüyor).

**Ölçülüp KAYDEDİLEN, değiştirilmeyen: izin NE ZAMAN isteniyor.**

    web    oturum özetinin içinde — tur bitti, XP göründü, seri ekranda
    mobil  girişin hemen ardından — kullanıcı henüz hiçbir şey yapmadı

Web'in kendi yorumu bu farkı bir HATA olarak tanımlıyor: *"Girişte ya da ilk
açılışta sorulan izin, henüz hiçbir şey yaşamamış birine 'seni rahatsız
edebilir miyim' demektir ve reddedilir; reddedilen izin tarayıcıda kalıcıdır -
ikinci bir şans yoktur."* Android 13+ için de aynısı geçerli (iki ret =
"bir daha sorma").

Mobilin ekranı yine de bir PRIMING ekranı - sistem diyaloğundan önce değeri
anlatıyor, saat seçtiriyor ve atlanabiliyor - yani çıplak bir sistem sorusu
değil. Ama zamanlaması webin yanlış dediği an. Bunu tek başıma taşımadım:
priming ekranını girişten oturum sonrasına almak hunideki sırayı değiştirir ve
yanlış karar KALICI olarak reddedilmiş bir izne mal olur. Samet'in kararı.

İkinci ayrım da kayda geçti: web kartı reddedilirse yirmi bir gün sonra
yeniden soruyor (`DISMISS_DAYS`), mobil "şimdi değil"i KALICI işaretliyor.
İkisi aynı biçimde çözülemez - webin kartı özetin içinde küçük bir kart,
mobilin ekranı tam ekran; tam ekranı üç hafta sonra tekrar açmak kartı tekrar
göstermekten çok daha müdahaleci. Politikayı seçmek de aynı karara bağlı.

### 11.65 Ortak telefonda önceki hesabın verisi kalıyordu

Web `components/session-keeper.tsx` kullanıcı kimliği değişince hesaba ait
`localStorage` anahtarlarını siliyor - sekiz önek, gerekçesi yazılı: ortak
cihazda bir hesabın verisi ötekine görünmemeli. Hangilerinin CİHAZA ait olduğu
da yazılı ve bilerek dışarıda (tema, kurulum/bildirim uyarılarının kapatılması,
eller serbest tercihi).

**Mobilde bu hiç yoktu.** `signOut()` sunucuya çıkış atıyor, itme jetonunu
siliyor, Google SDK oturumunu kapatıyor, RevenueCat oturumunu ve bellekteki
premium durumunu temizliyor - `AsyncStorage`a hiç dokunmuyor. Yani aynı
telefonda A çıkıp B girdiğinde B şunları görüyordu:

    lernomi-avatar          A'nın avatar aksesuarları
    lernomi-streak          A'nın serisi
    lernomi-daily/-weekly   A'nın günün turu / haftalık önbelleği
    lernomi-items-done      A'nın bitirdiği ünite öğeleri
    lernomi-lesson-resume:  A'nın yarım kalmış dersi
    lernomi:mock-done       A'nın bitirdiği deneme kâğıtları
    lernomi:mock-run:       A'nın yarım deneme koşusu
    lernomi-voice           A'nın okuma sesi (webde de hesaba ait)

Bu, `AuthContext`in kendi yorumunun anlattığı sorunun KALICI katmanı: o yorum
bellek için yazılmış ("bir sonraki kullanıcı öncekinin yetkisini görmesin") ve
premium/RevenueCat için çözülmüş; depolama katmanı atlanmıştı.

`lib/accountScope.ts` eklendi ve çıkışta çağrılıyor. Cihazın tercihi olanlar
webdeki gibi dışarıda: arayüz dili, mikrofon onayı, analitik tercihi, bildirim
ayarları ve kimlikleri, "ilk açılış görüldü" işareti, misafir onboarding
tercihleri. Bunlar telefona ait; silinseler kullanıcı her çıkışta baştan kurar.

Bir uygulama ayrıntısı kayda geçsin: silme tek tek yapılıyor çünkü paketin bu
sürümünün tipinde `multiRemove` YOK (`AsyncStorage.d.ts` yalnız `removeItem`
ve `getAllKeys` sayıyor). Anahtar sayısı bir elin parmakları kadar.

**Ölçülüp temiz çıkanlar:** mobilde depolama anahtarlarının hepsi `lernomi`
önekli, öneksiz kalan yok. Webin `lernomi-skills` girdisi bir ÖNEK ve
`startsWith` ile eşleşiyor, yani `-v1` ve `-migrated` anahtarlarını da
kapsıyor - eksik silme yok. `lernomi:skills` ise bir CustomEvent adı, depolama
anahtarı değil (ilk okumada anahtar sanmıştım).

### 11.66 Hesap silme ve tazelik: iki yönde iki eksik

**a) Web hesabı silince cihazda her şey kalıyordu.** Mobil
`DeleteAccountScreen` silme başarılı olunca `AsyncStorage.clear()` çağırıyor ve
gerekçesi yazılı ("temiz başlangıç"). Webde bu adım YOKTU: silme başarılı
olunca yalnız `/`ye yönlendiriliyor ve silinen hesabın avatarı, okuma sesi,
beceri ve ders ilerlemesi, taslakları ve başlangıç önbelleği tarayıcıda
kalıyordu - kullanıcı unutulmak istedi, gizlilik politikası da bunu söz
veriyor.

`forgetDeviceStorage` `session-keeper`a eklendi (önek bilgisi orada duruyor) ve
silme yolundan çağrılıyor. `localStorage.clear()` DEĞİL, yalnız `lernomi`
önekli anahtarlar: aynı kökte başka bir şey varsa onu silmek bizim işimiz
değil.

İki temizliğin ayrımı kayda geçsin: `forgetPreviousAccount` yalnız HESABA ait
önekleri siliyor ve cihaz tercihlerini bırakıyor (orada iş hesap
değiştirmek); silmede her şey gidiyor.

**b) "Yapabildiklerim" ekranı bayat kalıyordu.** Veri bir kez, `user` değişince
yükleniyordu. Ama bu ekranın içeriğini DEĞİŞTİREN şey ders ve alıştırma
bitirmek: kullanıcı bir konuşmayı tamamlayıp buraya dönünce eski listeyi
görüyordu ve yenileme yolu yoktu (mobilde çekerek yenileme yalnız
`MockStatsScreen`de var). Webin karşılığı sunucu bileşeni ve `force-dynamic` -
oraya her gidişte taze geliyor.

`useFocusEffect` eklendi; kalıp bu depoda zaten kullanılıyor (`SkillsScreen`,
`MockExamsScreen`).

**Ölçülüp temiz çıkanlar:** veri çeken dokuz mobil ekranın altısı GÖREV ekranı
(tur, ders, sınav, giriş, ödeme) ve orada çekerek yenileme yanlış olurdu -
alıştırmanın ortasındasın. `MockExamsScreen` ve `SkillsScreen` odakta yeniden
çekiyor. `PathScreen`in ana verisi paketten ve yerel işaretlerden geliyor;
sunucudan çektiği tek şey modül sınavı listesi ve o seviyeye bağlı.

### 11.67 Sınav bitişinde iki alan hiç gönderilmiyordu

Bu turda ölçümü ters yöne çevirdim: sunucunun gövdeden OKUDUĞU alanlarla
istemcilerin GÖNDERDİĞİ alanları karşılaştırdım. `check-endpoints` her ucun
bir çağıranı olduğunu ölçüyor ama gövdenin İÇİNE bakmıyor - ve orada iki
gerçek eksik çıktı.

`/api/exam` `action:"finish"` okuduğu alanlar: `action, day, level, module,
seconds, sections, speakingScore, trial, vocabAnswers, writingScore`.

    web   action day level module seconds sections speakingScore trial vocabAnswers writingScore
    mobil action day level module seconds sections speakingScore   —        —        writingScore

**a) `vocabAnswers` hiç gitmiyordu.** Sunucu bu alanı SRS'e yazıyor ve kodun
kendi yorumu bunu söylüyor: *"Kelime cevapları SRS'e: sınav da bir tekrar
(hatalar tipleriyle)."* Mobil göndermediği için Android'de sınavda YANLIŞ
bilinen kelimeler tekrar kuyruğuna hiç girmiyordu - sınav öğrenmeye geri
beslenmiyordu. Web baştan beri gönderiyor.

Toplama `RoundView`ın bu oturumda genişletilen `onDone(correct, extra)`
imzasından geliyor: `extra.quality`, `errorType`, `detail` doğrudan sunucunun
süzgecine denk düşüyor. Üç kural web ile aynı: "bunu zaten biliyorum" (skip)
yolunda cevap KAYDEDİLMİYOR, çok kelimeli tur (eşleştirme) `batch` ile her
kelimeyi ayrı bildiriyor, `wordId` yoksa satır atlanıyor.

**b) `trial` hiç gitmiyordu.** Kapak zaten biliyor - `paper.trial` ekranda
uyarı olarak çiziliyor ("bu sonuç sayılmayacak") - ama geri gönderilmiyordu,
yani DENEME sayılması gereken sınav sunucuda GERÇEK sonuç olarak
kaydediliyordu. Kullanıcıya "sayılmayacak" denip sayılıyordu.

Bu, bu oturumda beş kez düzeltilen "sessizce düşen alan" sınıfının aynısı ama
TERS yönde: önceki beşi sunucunun DÖNDÜRDÜĞÜ alanların mobil tipinde
karşılığı olmamasıydı; bu ikisi mobilin GÖNDERMEDİĞİ alanlar.

### 11.68 Kalan POST uçlarının gövde süpürmesi: eksik yok, iki fark kayda geçti

§11.67'nin ölçümünü bütün POST uçlarına uyguladım - sunucunun gövdeden
OKUDUĞU alanlar ile iki istemcinin GÖNDERDİĞİ alanlar.

    uç              sunucu okuyor                          sonuç
    /api/answers    answers day seconds progress wager     mobil: wager yok - BİLEREK
    /api/skills     id correct score day seconds           EŞİT (beş alanın beşi)
    /api/weekly     answers day seconds                    EŞİT
    /api/mock-exam  action paper skill day id answers
                    open taskIx taskId text secondsLeft    EŞİT
    /api/session    day progress (POST)                    mobil POST etmiyor - aşağıda
    /api/exam       (bkz. §11.67)                           iki eksik DÜZELTİLDİ

**`wager` bilerek yok ve zaten yazılı.** `game/session.ts` söylüyor:
*"`wagerXp` mobilde okunmuyor: bahisli etap mobilde hiç yok"* ve tip alanı
"sözleşme için" tutuyor. Sözlük anahtarları da yalnız `src/i18n/web/*`
altında, yani web-only ad alanında - tutarlı.

**`/api/weekly`de `length` bir gövde alanı DEĞİL.** İlk taramam onu alan
sanmıştı; kaynağa bakınca `raw.length`, yani cevap dizisinin uzunluğu (kırktan
fazla cevap reddediliyor). Yanlış pozitif, kayda geçsin.

**`/api/session` POST'unu mobil çağırmıyor ve buna gerek de yok.** O uç tek bir
iş için var: webin toplu gönderiminde BEKLEYEN CEVAP YOKKEN ilerlemeyi
kaydetmek. Web her partiden sonra `pending.current`ı boşaltıyor, yani "ilerleme
var ama cevap yok" durumu gerçekten oluşuyor. Mobil ise cevapları BİRİKTİRİYOR
(`answers.current` yalnız tur başında sıfırlanıyor) ve ilerlemeyi her
gönderimde yanında taşıyor - kullanıcı bir şey cevapladıysa liste hiç boş
kalmıyor.

**Ama aynı ölçüm bir DAYANIKLILIK farkı gösterdi.** Web partiler hâlinde
gönderiyor: çökme hâlinde en çok bir parti kayıp. Mobil tek gönderim yapıyor -
tur sonunda ya da ekran temizlenirken - yani çökme (temizliğin hiç
koşmadığı durum) BÜTÜN turu kaybettiriyor. Çift sayım yok, bu doğrulandı:
`submitted` bayrağı iki yolu da tek gönderime kilitliyor.

Bunu değiştirmedim: mobile aralıklı gönderim eklemek XP'nin NE ZAMAN
düştüğünü değiştirir ve biriken listeyle birlikte çift sayıma açık kapı
bırakır (parti boşaltma kuralı da eklenmeli). Ölçüm ve sonucu burada; kararı
Samet verir.

### 11.69 Yanıt yönü: bir uçta gövde hiç okunmuyordu

§11.67-68 isteği ölçtü; bu tur yanıtı ölçtüm - sunucunun DÖNDÜRDÜĞÜ alanlar
ile iki istemcinin OKUDUĞU alanlar.

    uç                     sunucu döndürüyor   web okuyor   mobil okuyor
    /api/skills (POST)     9                   5            0   ← bulgu
    /api/me                15                  (sunucu bil.)  15  EŞİT
    /api/premium/status    10                  10           10  EŞİT

**Bulgu: `/api/skills` yanıtı mobilde HİÇ okunmuyordu.** İstek gönderiliyor,
gövde hiç açılmıyordu (`await fetchWithTimeout(...)`, `.json()` yok). Sunucu
dokuz alan döndürüyor: `xpGained, totalXp, currentStreak, longestStreak,
streakRepaired, bestCorrect, total, lastScore, repeat`.

Kullanıcıya değen sonuç: beceri alıştırmasını bitiren kişi **kazandığı XP'yi
görmüyordu**. Oysa aynı bilgi tur sonunda gösteriliyor (`GameScreen`,
`+N XP`) ve web burada da gösteriyor (`player-shell` beş alan okuyor, ayrıca
`lernomi:stats` olayıyla başlıktaki XP/seriyi anında güncelliyor).

`xpGained` okunup sonuç kartına eklendi, `GameScreen` ile aynı biçimde;
"yeniden dene"de sıfırlanıyor.

**Okunmayan kalan alanlar, sebepleriyle:**

- `repeat` — web "bu alıştırmayı daha önce tamamlamıştın, XP yalnız en iyi
  skorunu geçince eklenir" notunu gösteriyor. Mobile eklenmedi çünkü metnin
  anahtarı (`skillp.repeat_note`) YALNIZ `src/i18n/web/*` altında, yani
  web-only ad alanında. Mobile taşımak yeni bir paylaşılan anahtar demek ve
  köprünün yönü mobil → web; ayrı bir iş.
- `lastScore` — sunucunun yetkili puanı. Mobil yerel `score`unu kaydediyor;
  ikisi normalde aynı, ayrıştıklarında sunucu haklı. Değiştirmek yerel
  işaretleme sırasını da etkiliyor.
- `streakRepaired` — bu uçta İKİ platform da okumuyor (`GameScreen`
  `/api/answers` yanıtında okuyor). Tutarsız değil: seri onarımı tur
  sonucunda bildiriliyor.
- `totalXp` / `currentStreak` — mobilde başlığı güncelleyecek bir kanal yok
  (`useMe` bir kez çekiyor, geçersizleme yolu yok); web bunu bir CustomEvent
  ile yapıyor. Mimari bir ek; ölçüm burada.

### 11.70 Başlıktaki XP ve seri hiç güncellenmiyordu

§11.69 bir ucu ölçmüştü; sebebi bu turda çıktı. Web'in `lernomi:stats` olayı
yerleşik bir kanal: **altı yerden yayınlanıyor** (tur özeti, beceri
alıştırması, yürüyüş, ders, patron, görev kartı) ve **üç yerde dinleniyor** -
başlıktaki XP/seri (`app-shell`), rozet açılış tetikleyicisi
(`achievement-unlock`) ve başlangıç ekranının önbelleği (`lib/use-cached`).

**Mobilde bu kanalın hiçbiri yoktu.** `useMe` bir kez çekiyor, bağımlılığı
`[user]` ve o hiç değişmiyor; üstelik `AppHeader`ı taşıyan üç ekran SEKME,
yani hiç yeniden kurulmuyor. Sonucu:

    Kullanıcı uygulamayı açıyor       seri 5 · XP 1200
    Bir tur bitiriyor (+40 XP)        sunucuda 1240
    Öğren sekmesine dönüyor           başlık hâlâ 1200

Sayı ancak uygulama yeniden başlatılınca düzeliyordu. Aynı bayatlık `useMe`
okuyan yedi ekranın hepsinde vardı (profil, gelişim, ayarlar, beceriler,
alıştırma, deneme listesi).

`lib/statsSignal.ts` eklendi - `window` olmadığı için modül düzeyinde küçük bir
abone listesi. `useMe` sinyali bağımlılığına aldı. Sinyal DEĞER TAŞIMIYOR:
web başlığı olayın içindeki `{xp, streak}` ile yamalıyor, burada `useMe`
yeniden çekiyor - bir istek, karşılığında `mastered`, `dueCount`,
`reviewsToday` gibi öteki alanlar da tazeleniyor.

Yayın noktaları webin altısına denk geliyor: tur özeti (`GameScreen`), beceri
alıştırması (`ItemScreen`), ders (`LessonScreen`), yürüyüş
(`WalkModeScreen`), patron (`BossScreen`), günün turu (`DailyScreen`) ve
haftalık sınav (`WeeklyScreen`) - yedi yer, çünkü mobilde günün turu ve
haftalık ayrı ekranlar.

### 11.71 `/api/answers` yanıtı: on bir alan, iki tarafta da tam

§11.70'in kanalı kurulduktan sonra en büyük yanıt sözleşmesini de ölçtüm.
`/api/answers` on bir alan döndürüyor:

    wagerXp newlyMastered xpGained totalXp currentStreak longestStreak
    reviewsToday dailyGoal goalReached streakRepaired dueTomorrow

Mobil `SubmitResult` on birinin on birini taşıyor (bu oturumda §11.22'de
tamamlanmıştı) ve kullanıcıya değen hepsi çiziliyor: kazanılan XP, seri,
seri onarımı, günlük hedef ve ilerlemesi, bugünkü tekrar, pekişen kelime,
yarın gelecek tekrar sayısı. `wagerXp` webe özgü (bahisli etap mobilde yok,
§11.68). `totalXp` ve `longestStreak` bu ekranda çizilmiyor ve gerekmiyor:
başlıktaki toplam artık sinyalle tazeleniyor (§11.70) ve en uzun seri Gelişim
ekranında `me`den okunuyor.

**Ölçüm sırasında iki kez kendi yanlış okumamı düzelttim ve ikisi de aynı
sebepten:** tip tanımını satır penceresiyle kesiyordum. İlk okumada mobilin
`dueTomorrow`u web tipinde YOK sanmıştım - web `types.ts`ta 316. satırda
duruyor, penceremin dışında kalmış. İkincisinde `/api/premium/status`ın
`copy` alanı için aynı şey olmuştu (§11.69). Ders: alan listesini pencereyle
değil, bloğun sonuna kadar okumak gerekiyor.

`check:parity` bu çifti zaten ölçüyor ("cevap yaniti alanlari") ama YALNIZ
web→mobil yönünde: mobilde eksik alanı yakalıyor, mobilde FAZLA olanı
yakalamıyor. Bugün fazlası yok (`dueTomorrow` iki tarafta da var), o yüzden
kural değiştirilmedi - ama ters yön kapının kör noktası olarak kayda geçsin.

### 11.72 Günün görevlerinin ÖDÜLÜ Androidde hiç alınamıyordu

`lernomi:stats`ın kalan yayıncılarını ararken web `quest-card`ın ne yaptığına
baktım ve ödül yolunun mobilde HİÇ OLMADIĞI çıktı.

    web    GET /api/quests → pano · POST /api/quests {questId, day} → ödül
    mobil  GET /api/quests → pano · POST YOK

Mobil tip zaten tam: `Quest` `xp` ve `claimed` alanlarını, `QuestBoard`
`allClaimed`ı taşıyor. Yani sözleşme modellenmiş, alacak DÜĞME yazılmamış.
Kullanıcı günün görevini bitiriyor, satır "tamam" görünüyor ve XP hiç
alınmıyor - hesabına hiç geçmiyor. Web baştan beri alıyor.

Eklenenler:

- `game/quests.ts` `claimQuest(questId, day)` - aynı uç, POST. `questId: "all"`
  üçü birden bitince açılan toplu ödül; sunucu aynı yerden veriyor.
- `ui/DailyQuests.tsx` `QuestRow` artık üç durumu çiziyor, webdeki gibi:
  alındı → "+N XP", tamam → "al" düğmesi, sürüyor → ilerleme sayısı. Çift
  dokunuş `claiming` ile kilitli, çevrimdışında pano bozulmuyor.
- Ödül alınınca `bumpStats()` - başlıktaki toplam ve özet tazelensin (§11.70).

**Sözlük köprüsü de kullanıldı.** Webin düğme metni `questw.claim_xp` ve o ad
alanı WEB-ONLY (`src/i18n/web/*`). Mobile taşımak yerine paylaşılan bir
anahtar açtım: `dailyquests.claim_xp` mobilin üç sözlüğüne yazıldı (tr/en/de)
ve `node scripts/i18n-pull.mjs` ile `src/i18n/base/*`e çekildi - köprünün
yönü mobil → web, tersi değil.

**Toplu ödül (üçü birden, +300 XP) eklenmedi:** webin o satırı `quests.all_three_done`
ve `questw.claim_xp` ile çiziliyor ve mobilde o kutunun karşılığı hiç yok
(mobil panosu üç satırdan ibaret). Kutuyu eklemek yeni bir yüzey demek; ödül
yolunun kendisi (`questId: "all"`) hazır, yalnız düğmesi yok.

**Kayda geçen ikinci gözlem:** web rozet açılışını uygulama kabuğunda tek bir
kartla kutluyor ve tetikleyicisi `lernomi:stats` (gerekçesi orada yazılı: altı
ayrı yere kutlama koymak altı yerde unutulur). Mobilde rozet açılış kutlaması
HİÇ YOK - kullanıcı rozeti ancak Başarılar ekranına giderek görüyor. Sinyal
artık mobilde de var (§11.70), yani kart eklenebilir; ama bu yeni bir yüzey ve
kutlamanın ne zaman kesmemesi gerektiği (webin üç kuralı) ürün kararı.

### 11.73 Görev panosunun üç eksiği + tur tipinin iki yanlışı

Bir önceki tur toplu ödülü "yeni yüzey" diye dışarıda bırakmıştı (§11.72).
Yanlış karardı: yeni yüzey değil, panonun eksik parçası. Günün üçünü de
bitiren Android kullanıcısı sunucunun verdiği **300 XP'yi hiç alamıyordu**
ve pano `allDone` ile `allClaimed` alanlarını baştan beri taşıyordu — yine
"sözleşme modellenmiş, düğme yazılmamış".

Kapatılan üç eksik:

- **Toplu ödül kutusu.** Web kartıyla aynı: hediye ikonu, alındıysa
  "+300 XP", alınmadıysa düğme. `ALL_DONE_ID` ve `ALL_DONE_XP` mobil tarafta
  da adlandırıldı ki ekran 300 sayısını içine gömmesin.
- **Başlıktaki "tamam" KODA GÖMÜLÜ Türkçeydi** (`{n}/{m} tamam`): İngilizce
  ve Almanca hesapta da Türkçe çıkıyordu. `i18n:check` bunu göremez — sözcük
  Türkçeye özgü harf taşımıyor, tarayıcının ayırt edicisi o. Yerine webin iki
  durumu geldi: bekleyen ödül varsa sayısı, yoksa "gece yarısı yenilenir".
- **`href` bağlanmamıştı.** Alan tipte vardı, hiçbir şey okumuyordu; satır
  dokunulamazdı. Webin kartı bu yönlendirmeyi asıl işi sayıyor (ölçümde
  beceriler bölümünü yedi kullanıcıdan biri açmış). Eşleme adres değil
  KİMLİK üzerinden: webin `/immersion` sayfası mobilde ikiye ayrılmış
  (Patika = dersler, Beceriler = kütüphane), tek adres ikisini gösteremiyor.
  Learn'e giden altı görev dokunulmaz — kutular zaten Learn'in içinde.

Ayrıca `quest_claim` olayı mobil ad listesinde YOKTU (webde vardı): ödül
alınabilir hâle gelene kadar karşılığı da yoktu. Ses yok — `unlock` cue'su
mobilin yedi sesinin arasında değil (§11.15).

**Webin kartı sabiti içe ALAMIYOR** (`lib/quests` `server-only`), sayıyı elle
yazıyor. Yeni bir kapı bölümü kartın yazdığı iki sayıyı sunucunun sabitiyle
ölçüyor; ayrılırlarsa web kullanıcısına yanlış miktar yazar.

#### Tur tipi: iki `as unknown as` kaçışı ve üç ölü alan

Kapının kör noktasını (§11.71: "ters yön ölçülmüyor") kapatmaya çalışırken
gürültü tabanı beş alan çıktı. Ölçüm ikisinin **ayıklayıcı kusuru**, üçünün
**gerçek ölü alan** olduğunu gösterdi:

- `words` ve `direction` iki tarafta da var; webin birleşiminin o iki üyesi
  TEK SATIRDA yazılmış ve satır başı arayan desen onları hiç görmüyordu.
  Ayıklayıcı artık `{`/`;`/satır sonu ayırıcısıyla çalışıyor ve yorumları
  önce atıyor.
- `blank`, `correctOrder`, `prompt` sunucuda hiç yok ve mobilde hiç
  okunmuyordu — silindi. `prompt` yakın bir adın gölgesiydi: `ChoiceGame`in
  KENDİ `ChoiceRound` tipinde bir `prompt` var (yerleştirme sınavı onu
  kullanıyor), oturum turunun alanıyla ilgisi yok.

Temizlik sırasında iki alanın **tipi yanlış** çıktı; ikisi de `as unknown as`
ile kaçırılıyordu:

| alan | sunucu | mobil tip (eski) |
|---|---|---|
| `answer` | `order`da `string[]`, cloze/plural'da `string` | yalnız `string` |
| `sentence` | `translate`da `{ tr, de, en }`, cloze/scramble'da `string` | yalnız `string` |

İkisi de birleşim oldu, dört okuma yeri `typeof`/`Array.isArray` ile
daraltıldı. Kaçış çalışıyordu ama tip sözleşmeyi yanlış anlatıyor ve bir
sonraki okuyanı yanlış yönlendiriyordu.

Sonuç: üç bölümün de ters yönü kapıya bağlandı, **istisna listesi yok**.
Ters yönün gerçekten yakaladığı, mobil tipe bir alan eklenip denendi.

#### Aynı ağaçta çalışan öteki oturum

Bu turda yazdığım `mobile/src/i18n/*` değişiklikleri başka bir oturumun
commit'ine (`55fcfc9a`) karıştı — ortak indeks tehlikesi ters yönden ısırdı.
Anahtarlar doğru ve commit'li, geri alınacak bir şey yok; ama `GIT_INDEX_FILE`
yordamı yalnız BENİM commit'imi korur, dosyaların başkasının commit'ine
karışmasını engellemez.

### 11.74 Sosyal katman: sayı biçimleri ve kapıya bağlanması

Sosyal katman on iki uç ve beş ortak tip taşıyor; **hiçbir kapı bakmıyordu**.
Ölçüm iki sonuç verdi: yapı şaşırtıcı biçimde eşit, **sayı biçimleri değil**.

#### Eşit çıkanlar (artık kapıda)

Beş tipin (`PublicUser`, `FriendRow`, `ReactionSummary`, `FeedItem`,
`QuestView`) alan kümesi iki yönde de birebir. Üç cümle tablosunun `case`
kümesi de aynı — adlar farklı olsa bile:

| web | mobil | tur |
|---|---|---|
| `feedText` | `feedPhrase` | 7 |
| `describeShort` | `reactionTarget` | 6 |
| `notificationText` | `notificationText` | 9 |

Yirmi iki yeni ölçüm bağlandı; ayrıca iki tablonun sunucunun `ACTIVITY_TYPES`
ve `NOTIFICATION_TYPES` listesini **tam** kapsadığı da ölçülüyor: kapsamayan
tür sessizce varsayılan cümleye düşüyor ve kimse fark etmiyor. `reactionTarget`
`friend_streak` taşımıyor ama iki tarafta da taşımıyor — tepki verilebilen
olaylar `lib/social/reactions.ts` ile sınırlı, ortak seri onların arasında yok.

#### Sayı biçimi: üç ayrı kusur

**1. Mobilin binlik ayracı sabit noktaydı.** `formatXp` (api/social)
`replace(..., ".")` yapıyordu: İngilizce arayüzde 1240 "1.240" çıkıyordu,
oysa en-US'ta "1,240". Aynı kusur bir kez tarihlerde yaşanmış ve `dateLocale()`
tam bunun için açılmıştı — sayı biçimi de artık oradan geliyor.

**2. Kısaltılmış XP'nin ondalık ayracı da sabit noktaydı.** `formatXp`
(lib/useMe) `toFixed(1)` ile "1.2k" yazıyordu; Türkçe ve Almanca'da ayraç
virgül. Yuvarlak sayıda ondalık göstermeme davranışı korundu (2000 → "2k").

**3. Webde iki sayı ham basılıyordu.** `feedText` `quest_completed` ve
`notificationText` `quest_invite` `Number(...)` yazıyordu, oysa **hemen
yanlarındaki** `weekly_top` `formatNumber` ile ayraçlı yazıyor ve mobil üçünü
de ayraçlı yazıyor. Aynı cümle, aynı anahtar, aynı veri — iki platformda
farklı görünüyordu.

**Ad çakışması da çözüldü.** İki ayrı modülde `formatXp` adıyla iki ayrı
davranış vardı: biri binlik ayraç (1240 → "1.240"), öteki kısaltma
(1240 → "1.2k"). Hangi modülden geldiğine bakmayan okuyucuyu yanıltıyordu;
sosyal olan `groupXp` oldu, altı çağıran dosya yeni ada geçti.

#### Kayda geçen, değiştirilmeyen iki tasarım farkı

**Web kenar çubuğunda XP rozeti var, mobil başlığında yok.** Web `StatPills`
seri + XP çiziyor, mobil `AppHeader` yalnız seri. Bu bir yerleşim farkı: webin
kenar çubuğu her zaman görünür ve yeri var, mobil başlığı dört öğeyle
(seri, gelen kutusu, avatar) zaten dolu. Rozeti mobile eklemek başlığı
sıkıştırır, webden çıkarmak bilgi kaybı olur.

**Mobil ilerleme karosu XP'yi kısaltıyor, web tam yazıyor.** Aynı dört karolu
ızgarada mobil "12,5k", web "12.450" gösteriyor. Mobilin kendi içinde de
tutarsız: yanındaki "öğrenilen kelime" karosu ham sayı (`String(mastered)`,
gruplama yok). Doğrusu karo genişliğine bakmayı gerektiriyor — dar karoda tam
sayı taşabilir — o yüzden ölçülmeden değiştirilmedi. Sayı biçiminin kendisi
(ondalık ayraç) yukarıda düzeltildi, yani kısaltma kalsa da dili doğru.

### 11.75 Rozet kutlaması ve her rozetin kendi ikonu

İki tur önce (§11.72) rozet açılış kutlamasını "yeni yüzey, ürün kararı" diye
dışarıda bırakmıştım. Sinyal §11.70'te mobile gelmişti; eksik olan yalnız
karttı. Bu tur yazıldı.

**Kutlama.** Kullanıcı rozeti ancak Başarılar ekranına giderek görüyordu;
açıldığı **an** hiçbir yerde söylenmiyordu — kutlamanın tek varlık sebebi ise
o an. Web gibi tek yerde, uygulamanın kökünde duruyor: rozet altı ayrı yerde
kazanılıyor (kelime turu, ders, beceri, görev ödülü, günün turu, patron) ve
altısına ayrı kutlama koymak altı yerde unutulur.

Webin üç kuralı da geçerli, biri farklı yolla:

| kural | web | mobil |
|---|---|---|
| oyunun ortasını kesme | `lernomi:busy` olayı | **gezgin rotası** (`BUSY_ROUTES`) |
| toplu açılış tek kart | `MAX_SOLO`/`BATCH_SHOWN` | aynı |
| her zaman kapatılabilir | dokunuşla ilerler | aynı |

Rotaya bakmak sinyalden **daha sağlam**: sinyali göndermeyi unutan bir ekran
webde kutlamayı turun ortasında patlatabilir, mobilde patlatamaz. "Görüldü"
işareti kart **ekrana konduğunda** atılıyor, kontrol anında değil — web'de aynı
kusur bir kez yaşanmış ve orada da böyle çözülmüştü.

**Her rozetin kendi ikonu.** Kapıya yeni bir bölüm eklerken (`/api/me` ve
`/api/achievements` alanları) ilk çalıştırmada `icon` çıktı: sunucu her rozet
satırında ikon adını gönderiyor ve web yirmi dokuz ayrı ikon çiziyor. **Mobil
alanı hiç tanımıyordu** — tip taşımadığı için sessizce düşüyordu ve rozet
duvarında elli yedi rozetin hepsi **kupa** görünüyordu; iki rozeti birbirinden
ayıran tek şey kademe rengiydi. On beş ikon mobil sete eklendi (web gövdeleriyle
birebir), `ui/achievementIcon` webin `ICONS` haritasının karşılığı oldu.
Tanınmayan ad kupaya düşüyor, yani sunucu yeni bir ad gönderdiğinde yayımlanmış
sürümler boş kutu çizmiyor.

Bu, "sessizce düşen alan" sınıfının en pahalı örneği: derleyici susuyor, istek
başarılı, kimse hata görmüyor — yalnız elli yedi rozet aynı görünüyor.

**Kapı ayıklayıcısında bir kusur daha.** `/api/me` gövdesindeki kısa yazım
(`mastered,`) iki nokta arayan desenle görülmüyordu: sunucunun gönderdiği alan
"mobilde eksik" sayılıyordu. Ayrıca ucun **ilk** `NextResponse.json(`i 401 hata
gövdesi; kapsayan `{` artık geriye doğru aranıyor.

### 11.76 Rozet duvarı ve sosyal hata kodları

Bir önceki tur mobil rozet duvarını her rozetin kendi ikonuna geçirmişti
(§11.75). Bu tur webin duvarına bakınca aynı kusurun **webde de** durduğu
çıktı: ikon haritası `achievement-badge` içinde modül içinde kalıyor, duvar
(`achievement-wall`) ona ulaşamadığı için her rozete kupa koyuyordu. Yani aynı
uygulamanın kutlama kartı doğrusunu çiziyor, duvarı çizmiyordu. `BadgeIcon`
dışa açıldı; ikisi de aynı yerden geçiyor. Tanınmayan ad iki tarafta da
**yıldıza** düşüyor.

**Duvarın üç eksiği daha** (hepsi webde vardı, mobilde yoktu):

| eksik | ne yapıyor |
|---|---|
| ilerleme şeridi | kaçının açıldığı tek bakışta |
| "sıradaki" bölümü | bitmeye en yakın dört kilitli rozet, grupların üstünde |
| sunucunun sayaçları | `unlockedCount`/`total` cevapta geliyordu, ekran yeniden sayıyordu |

"Sıradaki" sırası tamamlanma **oranına** göre ve eşitlikte küçük hedef önde —
webin karşılaştırmasıyla birebir. Hepsi açıldıysa yerini "son kazanılan" alıyor.
Yerel sayımın sorunu şu: iki sayının aynı kalacağının garantisi yok; satır
listesi bir gün sayfalanırsa yerel sayım sessizce yanlışa döner.

Grup başlıklarının büyük harfe çevrilmesi de yerele bağlandı: `toUpperCase()`
Türkçede "i"yi "I" yapıyordu, "İ" değil. Web bunu `localeOf(lang)` ile zaten
doğru yapıyordu.

**Sosyal hata kodları kapıya bağlandı.** Sunucunun dönebildiği her kodun iki
istemcide de bir cümlesi olmalı; haritada olmayan kod ikisinde de "bağlantı
kurulamadı"ya düşüyor ve bu **yanlış teşhis** — kullanıcı sebebini bilmeden
aynı işlemi tekrar deniyor. Webde tam bu yaşanmış ve `bio_invalid` sonradan
eklenmiş. Bugün on altı kodun hepsi iki tarafta da eşli; kapı kodları üç
biçimden topluyor (`new SocialError`, `fail(...)`, doğrudan `error: "..."`) ve
iki haritayı birbirine karşı da ölçüyor.

**`groupXp` → `formatNumber`.** Geçen tur sosyal katmanda açtığım ad, sayı
biçiminin dilin bir parçası olduğu düşünülünce yanlış yerdeydi: rozet duvarının
sayacı da aynı biçimi istiyor ve bunun için sosyal modülü içe alması gerekirdi.
`lib/i18n`e taşındı ve adı webinkiyle aynı oldu.

### 11.77 Sosyal katmanın istek tarafı ve çizim tabloları

Sosyal katmanın **cevap** tipleri §11.74'te kapıya girmişti; bu tur geri kalan
üç yüzey ölçüldü ve hepsi kapıya bağlandı — toplam **elli iki yeni ölçüm**.

**İstek tarafı hiç ölçülmüyordu.** İki `social` nesnesi yirmi beş çağrıyı aynı
adla taşıyor ama yol, HTTP yöntemi ve gövdedeki alanlar hiçbir kapıya
girmiyordu. Bir tarafa alan eklenip ötekine eklenmezse sunucu onu sessizce
düşürüyor: derleme kırılmıyor, istek 200 dönüyor, yalnızca o ayar hiç
uygulanmıyor. Yirmi beşinin de yolu, yöntemi ve gövdesi bugün aynı.

**Görünüm tipleri ad yüzünden dışarıda kalmış.** §11.74'ün bölümü yalnız **adı
aynı** olan beş tipi ölçüyordu; geri kalan on tip webde `...View` sonekiyle
duruyor ve ayrı adlı oldukları için hiçbir kapıya girmiyorlardı — oysa hepsi
aynı ucun cevabı. `BoardView` istisnası kayıtlı: web satırı tipin içinde
yazıyor, mobil `BoardRow` diye ayırmış.

**İki çizim tablosu da ölçülmüyordu.** Tepki *rengi* (§14) ve tepki *türleri*
(§13) kapıdaydı ama **ikonu** değildi; akış kartının **olay karosu** (ikon +
renk) da "birebir" diye yazılıydı, kimse bakmıyordu. İkisi de eşit çıktı;
ikisi de artık ölçülüyor. Renk adları 14. bölümdeki aynı rol haritasıyla
çevriliyor (brand↔primary, flame↔streak, rose↔danger, sky↔info,
violet↔accent, mint↔success).

#### Tek gerçek kusur: boş akışta görünmeyen ağ hatası

Mobil `FeedList` ilk yükleme başarısız olunca `catch` içinde listeyi boş diziye
çekiyor (yoksa iskelet sonsuza kadar dönerdi) ve akış tam **boş duruma**
düşüyordu — orada hata metni hiç çizilmiyordu. Kullanıcı "akışın henüz boş"
görüyor, ağın koptuğunu hiç öğrenmiyordu; arkadaşı olan biri için bu, olmayan
bir boşluk. Web aynı kararı yorumunda yazılı taşıyor: "liste yokken ağ hatası
tek geri bildirim".

#### Kapının kendi bakımı

Bölüm numaralarından ikisi **çift yazılmıştı** (18 ve 19 ikişer kez) ve dosya
kendi yorumlarında numarayla atıf yapıyor — hangi bölüme bakılacağı belirsizdi.
Sondaki dokuz bölüm kaydırıldı, üç çapraz başvuru düzeltildi.

### 11.78 "Boş" ile "yüklenemedi" ayrımı ve istek kartı

§11.77'de akışta bulduğum kusuru (ağ hatası boş duruma düşüyor, kullanıcı
sebebini öğrenemiyor) bütün sosyal ekranlarda taradım. Bir tane daha çıktı ve
o **iki platformda birden** duruyordu.

**Arkadaş tablosu.** `.catch(() => setBoard({ rows: [], start: "", daysLeft: 0 }))`
— hata boş bir tabloya çevriliyor ve kart tam altındaki "henüz yarışacak kimse
yok"a düşüyordu. Arkadaşı olan kullanıcı, ağ koptuğunda arkadaşlarının
kaybolduğunu görüyor ve sebebini hiç öğrenmiyordu. Lig sekmesi aynı durumu
baştan beri ayrı bir kartla söylüyor; iki sekme artık aynı.

Taramada temiz çıkanlar, sebepleriyle:

| yüzey | durum |
|---|---|
| `LeagueBoard` / `league-board` | `err` boolean + ayrı kart — doğru örüntü, ikisinde de |
| `Quests`, `InboxScreen`, `UserScreen` | hata metni boş kartın **yanında** çiziliyor |
| `Find` (öneriler), `FriendPulse` | hata görünmez ama ikisi de ikincil kutu; yokluğu veri diye okunmuyor ve iki platformda aynı |

#### İstek kartı: iki fark

**Profile giden yol yoktu (mobil).** Kart ad, kullanıcı adı ve seviyeyi yazıyor
ama profile hiçbir yol taşımıyordu: kullanıcı **kimi kabul ettiğini görmeden**
karar veriyordu. Web satırı baştan beri açıyor. Yol avatar — akış kartının
kuralı ve iki uygulamada da aynı.

**Başlıkta sayı yoktu (web).** Android `SectionTitle` sağda kaç istek olduğunu
yazıyor; listeye bakmadan bilinmesi gereken tek şey o.

**Bağlantı addaydı (web).** Aynı uygulamanın akış kartı bunu avatardan yapıyor
ve gerekçesi orada yazılı: adın altı çizili hâli, adın kendisinin bir düğme
olduğunu söylemiyor ve erişilebilir ad bulanık kalıyor. İki liste artık aynı
kuralı izliyor.

Ayrıca zil (`InboxBell` / `notification-bell`) ölçüldü: ikon, 44'lük karo,
`surface-2` zemin, "9+" eşiği, kehribar zemin + mürekkep yazı, dakikalık
tazeleme ve öne gelince tazeleme — hepsi eşit. Değişiklik gerekmedi.

### 11.79 Yüzde işareti, geçmiş görev satırı ve kişi profilinin iki eksik karosu

**Yüzde işareti koda gömülüydü (mobil).** İşaretin yeri dile göre değişiyor —
Türkçe "%45", İngilizce "45%", Almanca "45 %" — ve iki sosyal yüzey
`${q.pct}%` yazıyordu: ortak görevin geçmiş satırı ve arkadaş nabzının
yüzdesi. Doğru uygulaması zaten vardı ama `LevelBadge` içinde modül içinde
duruyordu; `lib/i18n`e taşındı ve adı webinkiyle aynı oldu (`formatPercent`).
Sözlükteki `{pct}%` yazan anahtarlara **dokunulmadı**: onlarda işaret her dilin
kendi dizgesinde duruyor (`"%{pct}"` / `"{pct} %"`) ve zaten doğru.

Bu, `formatNumber` (§11.76) ile birlikte ikinci taşınma: sayı biçiminin her
parçası artık tek bir yerde ve iki uygulamada aynı adı taşıyor.

**Geçmiş ortak görev satırı (web).** Başarısız haftada yalnızca yüzde vardı.
Yüzdenin **paydası** hedef ve o satırın solunda yazıyor ("Ali ile 3.000 XP");
**payı** ise hiçbir yerde yoktu. Android ikisini birden yazıyor.

**Kişi profilinde iki karo eksikti (mobil).** Sunucu `stats.longestStreak` ve
`stats.lastActiveDay` gönderiyor, tip ikisini de taşıyor — ekran dördünü çizip
ikisini düşürüyordu. Web altısını da yazıyor. "Son aktif" bir arkadaşa dürtme
göndermeden önce bakılan şey; onsuz dürtme körlemesine gidiyordu.

Aynı sınıfın bu turdaki üçüncü örneği: **sözleşme modellenmiş, yüzey
yazılmamış**. Kapı bu sınıfı tipler düzeyinde yakalıyor (§11.77'de
`PublicProfileView` iki yönde de eşit çıkmıştı) ama tipin bir alanının
**çizilip çizilmediğini** ölçmüyor — bu, kapının bilinen sınırı.

**Not:** `mobile/src/screens/AuthScreen.tsx` şu an başka bir oturumun yarım
işini taşıyor (e-posta doğrulama arayüzü: içe alımlar ve durum eklenmiş, henüz
kullanılmıyor) ve mobil `lint` on bir hata veriyor. Benim dosyalarım temiz;
o dosyaya dokunulmadı.

### 11.80 Kelimenin türü ve çoğulu — Android'de hiç yoktu

§11.79'un sonunda "kapı tipleri ölçüyor ama alanın çizilip çizilmediğini
ölçmüyor" diye yazdığım sınırı sistemli aramaya çevirdim: mobil API tiplerinin
her alanını alıp `mobile/src` içinde başka hiçbir yerde geçmeyenleri listeledim.
On sekiz aday çıktı; çoğu meşru (`href` §11.73'te kimlikle değiştirildi,
`wagerXp` web-only, `payload` tip dosyasının kendi içinde okunuyor). Biri
değildi.

**`typ` ve `formen`.** Sunucu her kelimede türü (Nomen/Verb/…) ve çoğul
kalıbını gönderiyor, tip ikisini de taşıyor, mobil **ikisini de hiç
okumuyordu**. Web bunu üç yerde yazıyor: yeni kelime turu, yazma turu, kelime
listesi. Android'de öğrenci bir kelimenin isim mi fiil mi olduğunu ve çoğulunun
ne olduğunu hiçbir yerde görmüyordu — kelimenin yarısı eksikti.

`game/wordGrammar` webin `components/games/types.ts` içindeki iki işlevle
birebir aynı kuralları taşıyor:

| ham veri | ekranda |
|---|---|
| `(Sg.)` | çoğulu yok |
| `(Pl.)` | yalnızca çoğul |
| `¨-er` + artikel | çoğul: die Häuser |
| fiil çekimi | olduğu gibi |

`typ` boş gelirse Türkçe karşılığın mastar eki (-mek/-mak) fiili ele veriyor —
webin yedeği de o. Umlaut gövdesi (`Haus` → `Häus`) web `lib/german`
`umlautStem` ile aynı; "au" ikili ünlüsü tek parça umlautlanıyor.

**Kelime listesi ucu da eksikti.** Web listesi bu iki alanı sunucu bileşeninde
doğrudan tablodan okuyor; mobilin tek kaynağı `/api/words` ve uç ikisini de
göndermiyordu. Eklemesi katkısız: iki sütun daha seçiliyor.

**Kural kopyası kapıya bağlandı.** Bir kopya en çok kopyalandığı gün doğrudur;
sözlük anahtarları, düzenli ifadeler ve umlaut gövdesi artık ölçülüyor.

### 11.81 Ölü bayrak, ölü prop ve kapalı düğmenin sebebi

Aynı taramayı (§11.80) **web** tiplerine uyguladım: iki aday çıktı, biri
kayıtlı non-work (`pacing`, §11.22), öteki gerçek.

**`reuseOptions` ölü bayraktı.** Eşleştirmede varsayılan kural "her şık en fazla
bir kez" ve bu bayrak o kuralı kaldırıyor (İngilizce sınavların çoklu
eşleştirme görevlerinde soru sayısı metin sayısını aşıyor). İçerikte yirmi dört
görevde yazılı ve mobil dökümüne de doğru geçmiş — ama **iki oynatıcı da onu
hiç okumuyordu**, yani kural hiçbir yerde görünmüyordu: bir şıkkı ikinci kez
seçen öğrenci hatasını ancak sonuçta görüyordu.

Kâğıt sınavda bu bilgi zaten var; öğrenci kendi yazdıklarını aynı sayfada
görüyor. Ekranda her madde ayrı satır olduğu için kayboluyordu. Kullanılmış
şıklar artık soluk, ama **yine basılabilir**: cevabını taşımak isteyen öğrenci
engellenmemeli. `reuseOptions` açıkken hiçbir şık solmuyor.

İçerik yazarı açısından asıl kusur buydu: bayrağı yazan kişi bir şey
yaptığını sanıyordu.

#### Üç küçük fark daha

| ne | nerede | ne yapıldı |
|---|---|---|
| Kapalı "Ekle" düğmesinin sebebi | mobil | web `title` balonunda söylüyordu; mobilde balon yok, satır olarak yazıldı |
| İlişki düğmelerinin ikonu | web | Android pilleri `UserPlusIcon`/`CheckIcon` taşıyor, web düğmeleri çıplaktı |
| "Bul" listesinde avatar bağlantısı | web | akış ve istek listelerinde avatar profile götürüyor, burada götürmüyordu |

Kapalı düğme özellikle kötüydü: dokunup hata almak bile mümkün değil, çünkü
düğme kapalı — kullanıcı neden basamadığını hiçbir yoldan öğrenemiyordu.

`find.tsx` `PersonRow` ayrıca `onChanged` propunu **alıyor ama hiç
kullanmıyordu**; iki çağıran da boşuna geçiriyordu. Aynı sınıfın bileşen
düzeyindeki hâli.

### 11.82 Anahtar kümesi karşılaştırması: hangi yüzey nerede yok

Bu tur yeni bir ölçüm aracı: **taban sözlükteki bir anahtarı hangi tarafın
çağırdığı**. Taban sözlük mobilin sözlüğünden üretiliyor, yani orada olan bir
anahtarın mobilde bir karşılığı olması beklenir; yalnız webin çağırdığı bir
taban anahtarı, mobilde dizgesi olup **yüzeyi olmayan** bir şeye işaret eder.

Sonuç: 35 anahtar yalnız webde çağrılıyor. Çoğu meşru çıktı —

| küme | neden meşru |
|---|---|
| `plan.*` (10) | uç çağıransız, mobil karşılığı bilerek yok (§7) |
| `social.reaction_*` (6) | mobil anahtarı dinamik kuruyor (`social.reaction_${kind}`) |
| `paywall.*`, `premiumstate.*` | web satamıyor, mağazaya yönlendiriyor — platforma özgü |
| `mockexam.goal_*`, `mockexam.fail_*` | mobil bunları da dinamik kuruyor |

İki tanesi gerçekti.

**Hedef etiketi tanınmayan hedefte anahtarı yazıyordu.** Mobil `goal_${g.goal}`
kuruyor ve hedef **içerikten** geliyor, kapalı bir kümeden değil: sözlükte
karşılığı olmayan bir hedefte ekranda `mockexam.goal_xyz` görünüyordu. Web
tanımadığı hedefte ham adı yazıyor. `GOAL_KEYS` mobile de geldi ve iki harita
kapıya bağlandı.

**Web'de ikinci bir başarım girişi vardı.** `progress-view` içindeki kartın
yorumu "mobilde de ilerlemenin altında" diyordu — **artık doğru değil**:
Android onu bilerek kaldırmış ve gerekçesini yazmış ("rozet sayısı herkese açık
profilde görünüyor, yani statü işareti ve yeri profil; aynı ekrana iki giriş
olmasın diye"). Webde profil satırı duruyor, yani ekran erişilebilir kalıyor.

Bu ikincisi, yönü ters işleyen ilk bulgu: Android'in **kaldırma** kararı da bir
karar ve web onu izlemeliydi. Eski yorum kararı yanlış aktardığı için fark
görünmüyordu — yorumun kendisi drift etmişti.

#### Bu turda temiz çıkanlar

`SocialSettingsScreen` ile `social-settings`: anahtar kümeleri **birebir**.
`InboxScreen` ile `inbox`: beş fark var, hepsi mobilin oturum-kapalı boş
durumu ve ekran başlığı (webde başlık `page.tsx` içinde, bileşende değil).
Değişiklik gerekmedi.

Mobil tip taramasında (§11.80) kalan yedi alan (`weekStart`, `completedAt`,
`usernameChangedAt`, `wagerXp`, `taskId`, `taskNo`, `byTask`) **iki tarafta da**
çizilmiyor — parite farkı değil. `byTask` bir gün ikinci bir kırılım paneli
olabilir; bugün `byGoal` yeterli sayıldı.

### 11.83 Şıkkın sonucu ekran okuyucuya söylenmiyordu

§11.82'nin aracını ters yönde çalıştırdım: taban sözlükte olup **yalnız
mobilde** çağrılan anahtarlar. 274 aday; `walkmode` (31) ve `notifprime` (10)
gibi kümeler mobil-özgü ekranlar, `lesson` ve `item` mobilin kendi akışları.
`rounds` kümesindeki iki tanesi gerçekti.

**`rounds.a11y_correct` ve `rounds.a11y_wrong` webde hiç çağrılmıyordu.**
Ölçüm şunu gösterdi: yedi oyunun **beşinde** şıkkın doğru mu yanlış mı olduğu
yalnız **renkle** anlatılıyor; ikisinde simge var ama simgenin erişilebilir adı
yok (`icons.tsx` `aria-hidden="true"` veriyor). Yani cevabını verdikten sonra
şıklara dönen ekran okuyucu kullanıcısı hangisinin doğru olduğunu hiçbir yoldan
öğrenemiyordu. Sonuç şeridi (`round-sheet`) `aria-live` ile hükmü söylüyor ama
hangi **şıkkın** doğru olduğunu söylemiyor.

Android'de bu iş tek bir paylaşılan düğmede çözülü (`game/rounds`
`OptionButton`): her oyunda hem simge hem `accessibilityHint`. Webde ortak bir
düğme yok, o yüzden ortak olan işaret: `OptionMark` — simge + `role="img"` +
erişilebilir ad. Beş oyuna eklendi, ikisinde elle yazılmış simgelerin yerini
aldı. Renk körlüğü için de kazanç: beş oyunda artık simge de var.

#### Ölçülüp iş çıkmayanlar

**`speak` turu** mobilde ekranda çiziliyor, webde hiç çizilmiyor — ve bu doğru:
`composeWalk` dışında hiçbir yerde üretilmiyor, yani normal oturumda böyle bir
tur yok. Webin `types.ts`'teki "ekran oyunlarının hiçbiri bunu render etmez"
notu eksiksiz.

`rounds.got_it` / `rounds.struggled` / `rounds.show_answer` da o turun
parçaları; `rounds.hint` (web) ile `rounds.show_hint` (mobil) ise aynı düğmenin
iki ayrı anahtarı — metin aynı, yalnız ad ayrışmış. Bugün ikisi de doğru
çalışıyor, tek zararı sözlükte iki satır; birleştirmek yayımlanmış mobil
sürümleri kırar, o yüzden dokunulmadı.

### 11.84 Gramer türetmesinde iki Türkçe cümle ve Almanca şık çifti

`quiz.order_question` / `quiz.order_sentence` "yalnız mobilde çağrılıyor" diye
çıktı. Sebep, umduğumdan kötüydü: web aynı iki cümleyi **koda gömülü Türkçe**
yazıyordu.

```ts
text: step.expect.target.endsWith("?")
  ? "Soruyu doğru sıraya diz."
  : "Cümleyi doğru sıraya diz.",
```

İngilizce ya da Almanca arayüzde de bu cümleler çıkıyordu. Anahtarlar taban
sözlükte zaten duruyor ve mobil onları kullanıyor; web sunucu tarafında `t()`
olmadığı için `deriveQuiz`in kalıbı izlendi — metin çağırandan veriliyor.

**Aynı işlevde ikinci bir kusur:** hüküm şıkları `["Richtig", "Falsch"]` diye
**sabitti** ve İngilizce kursta da Almanca çıkıyordu — İngilizce derslerde
**yüz** tane hüküm adımı var. Deneme sınavı aynı çifti kursa göre veriyor
(`MOCK_LABELS[course].bool`); artık buraya da oradan geliyor. Mobil tarafta da
aynı sabit vardı, o da düzeltildi.

İkisi de `i18n:check`in göremeyeceği türden: eksik çıkacak bir **anahtar
çağrısı yok**; dizge doğrudan üretilen içeriğe giriyor. Anahtar kümesi
karşılaştırması (§11.82) tam bu boşluğu dolduruyor — "mobilde çağrılıp webde
çağrılmayan anahtar" bir kez de **webin o işi başka türlü yaptığını** gösterdi.

**Kural çifti kapıya bağlandı:** ünite gramer alıştırması iki tarafta da ders
adımlarından türetiliyor ve iki gerçekleştirme ayrı dosyada. Ayrışırlarsa aynı
ünite iki uygulamada başka sorular verir — öğrenci webde geçip mobilde
kalabilir. Ölçülen: dizme uzunluğunun alt/üst sınırı, hüküm/dizme bölüşmesi,
tohum etiketleri ve hangi şıkkın doğru sayıldığı.

#### Ölçülüp iş çıkmayanlar

- `prog.study_time` (web) ile `progress.time_total` (mobil) aynı karonun iki
  ayrı anahtarı; metin aynı. `rounds.hint`/`rounds.show_hint` gibi.
- `daily.*`, `game.*`, `weekly.*`, `settings.*` kümelerindeki "giriş yap"
  anahtarları: mobilde ekranlar oturumsuz da açılıyor, webde yönlendirme
  oturumdan önce oluyor — yapısal fark, eksik değil.
- `quiz.this_unit_has_no_questions_yet`: web boş ünitede `notFound()` çağırıyor.
  Patika boş bir quize bağlantı vermediği için bugün ulaşılamaz; kayda geçti.

### 11.85 Hangi kapı neyi göremiyor

§11.84'ün iki kusuru farklı sebeplerle gizlenmişti; bu tur onu kapıya çevirdim.

**Türkçe cümleler zaten sayılıyordu — kabul edilmiş borç olarak.** Projede
`scripts/i18n-hardcoded.mjs` diye bir cırcır var (taban 169 dizgi / 87 dosya)
ve `src/lib/immersion/grammar.ts` orada **2** ile yazılıydı. Yani kusur
görünmezdi değil, **kabul edilmişti**. Düzeltirken Türkçeyi varsayılan olarak
bıraktığım için taban da düşmüyordu; parametreyi zorunlu yaptım, iki dizge
modülden çıktı, taban **167**'ye indi.

**Almanca şık çifti hiçbir kapıda yoktu.** `["Richtig", "Falsch"]` Türkçe harf
taşımıyor (`i18n-hardcoded` atlıyor) ve sözlük anahtarı değil (`i18n:check`
atlıyor). Böyle bir kusurun tek imzası, kurs diline ait bir sözcük çiftinin
**kodda** geçmesi. Yeni bölüm dört çifti (`Richtig/Falsch`, `Ja/Nein`,
`True/False`, `Yes/No`) içerik ve tablo dosyaları dışında arıyor; yorumlar
ayıklanıyor, çünkü gerekçesini yazmak kapıyı kırmamalı.

#### Taramanın kalanı

`src/lib` genelinde Türkçeye özgü harf taraması 3347 ham eşleşme verdi;
daraltınca geriye kod (içerik değil) dosyalarından altı grup kaldı ve hepsi
meşru çıktı:

| dosya | ne |
|---|---|
| `chat-providers`, `native-server`, `plan`, `stt`, `tts/*` | sunucu günlüğü / hata metni, kullanıcıya çıkmıyor |
| `courses.ts` | kurs adları zaten dil başına (`label.tr/en/de`) |
| `speech-rules.ts` | kurallar **Türkçe konuşanın** Almancada yaptığı hatalar; tabanda yazılı |
| `module-exam/*`, `confusables`, `first-words`, `characters` | Türkçe içerik verisi, çeviri yolu `nativeExamText` üzerinden |

### 11.86 Kendi kırdığım kapı ve yorumların ikinci yalanı

**Önce kendi hatam.** §11.80'de eklediğim `wordGrammar` içindeki harf haritası
(`{ a: "ä", o: "ö", … }`) mobil `i18n-scan`i kırmıştı: tarayıcı tek harfli
dizgeleri çevrilmemiş metin sanıyor ve sayım 16'dan 20'ye çıkmıştı. Bu tur
yakalayıp kapattım.

Çözüm sayıyı büyütmek olmadı: harf tablosu arayüz metni değil, biçim kuralı.
`umlautStem` webdeki gibi `lib/german.ts`e taşındı — **aynı yer, aynı ad** — ve
o dosya `SKIP_CONTENT`e girdi. Listenin kendi kuralı gereği muafiyetin bir
kapısı olmalı: `check:parity` "umlaut govdesi" gövdeyi webinkiyle dizge dizge
karşılaştırıyor. Web tarafında aynı dört harf zaten ham metin tabanında yazılı
(`german.ts: 4`), yani iki taraf aynı yanlış pozitifi aynı şekilde kayda
geçiriyor.

**Sonra yorumun ikinci yalanı.** §11.82'de webin bir yorumu "mobilde de var"
diyordu ve yanlıştı. Bu tur aynısı ters yönde çıktı: mobil `BossScreen`

```ts
/** Son saniyeler — sayaç kırmızıya döner. Web `DANGER_SECONDS` ile aynı. */
const DANGER_SECONDS = 10;
```

Web'de o sabit **8**'di. Yorum parite iddia ediyor, ölçüm yok, ayrışma iki
taraftan da görünmüyor. Fark yalnız görsel de değil: webde bu eşik saniyede bir
"danger" tıkını da başlatıyor. Android'in değeri alındı.

**Kalıcı sonuç:** ortak sayısal sabitler artık **elle bakım istemeyen** bir
bölümde. 22. bölüm listeleri karşılaştırıyordu; tek başına duran sayılar
dışarıda kalıyordu. Yeni bölüm iki ağaçtaki her `const AD = <sayı>;` sabitini
toplayıp adı ikisinde de geçenleri karşılaştırıyor — bugün 24 çift. Yeni bir
ortak sabit yazıldığı an kapıya giriyor; listeye eklemek gerekmiyor.

Bu, "yorumda yazmak drift'i durdurmuyor, ölçüm durduruyor" kuralının üçüncü
kanıtı — ve ilk ikisinde de yorum, ölçümün yerini almaya çalışmıştı.

### 11.87 Mobil ham-metin tabanının 16'sı tek tek

Web tarafındaki taban (167) çok kalabalık; mobilinki 16 ve tümü elle
incelenebilir. Hepsini çıkardım — **hiçbiri kusur değil**, ve dördü zaten
webde de aynı biçimde duruyor:

| dosya | kaç | ne |
|---|---|---|
| `lib/courses.ts` | 7 | kurs adları; zaten dil başına (`label.tr/en/de`) — webde de öyle |
| `lib/native.ts` | 2 | dilbilgisi geri bildiriminin `{}` yer tutuculu kalıpları |
| `ui/VoicePicker.tsx` | 2 | ses önizlemesinin Almanca/İsviçre Almancası örnek cümleleri |
| `data/exams/index.ts` | 1 | `MOCK_LABELS[de].skill.listening` = "Hören" — tablonun kendisi |
| `screens/ExamScreen.tsx` | 1 | `SECTION_DE` tablosu; webde `SECTION_TITLE_DE` olarak birebir var |
| `lib/i18n.ts`, `OnboardingScreen`, `SettingsScreen` | 3 | "Türkçe" — dil adı kendi dilinde yazılır |

`SECTION_DE` özellikle kasıtlı: modül sınavı bölüm adlarını Almanca **ve**
çevirisiyle yan yana yazıyor ("Hören · Dinleme") ve webin yorumu gerekçeyi
söylüyor: "sınav havası kâğıdın dilinden başlıyor". Modül sınavı zaten yalnız
Almanca kursta açılıyor.

Webin `exam-player`i bu Almanca parçalara `lang="de"` işaretliyor (ekran
okuyucu Almanca telaffuz etsin); React Native `Text`te karşılığı yok, kayda
geçti.

**Sabit karşılaştırması dizgelere de genişledi.** Sayısal sabitlerin yanında
dizge ve mantıksal sabitler de ölçülüyor — bugün yedi çift. Depolama anahtarı
ya da işaret dizgesi ayrışırsa kullanıcının tercihi bir uygulamada okunmaz olur.
Genel adlar (`KEY`, `PREFIX`, `MAX`, …) listeden çıkarıldı: `KEY` webde beceri
ilerlemesinin depolama anahtarı, mobilde onboarding tercihlerininki — aynı ad,
ayrı iş, ve ad tek başına sözleşme taşımıyor.

### 11.88 Dizi sabitleri: dört fark, biri gerçek

Sabit karşılaştırmasını dizilere de uyguladım: iki ağaçta aynı adı taşıyan
**22** dizi sabiti var, dördü ayrışıyor. Üçü meşru, biri değildi.

**`ACCOUNT_SCOPED_PREFIXES` — gerçek.** İki liste zaten farklı, çünkü iki
platform farklı şeyler saklıyor; byte eşitliği burada yanlış ölçü. Doğru ölçü,
**her platformun kendi yazdığı anahtarların kendi listesinde olup olmadığı**.
İki tarafın yazdığı `lernomi-*` anahtarlarını çıkarınca `lernomi-avatar` webde
yazılıyor ama kapsanmıyordu: ortak bilgisayarda A çıkıp B girdiğinde B, A'nın
şapkasını ve gözlüğünü takmış görünüyordu. Android listesinde baştan beri
vardı.

**`CHEERS` — varlık farkı.** Maskotun kutlama klipleri: web'de on bir mood
(idle, happy, cheer, sad, think, wow, sleep, thumbsup, dance, wave, peek),
mobilde yedi (idle, happy, thumbsup, sad, celebrate, wave, sleep). Mobilde
`cheer`, `dance`, `think`, `wow`, `peek` klipleri **yok**; `celebrate` webin
`cheer`inin karşılığı. Kod farkı değil, varlık (asset) farkı — kayda geçti.

**`COURSES` ve `VOICES` — biçim farkı.** `COURSES` içeriği aynı, alan sırası
farklı. `Course` tipinde tek gerçek fark webin `descKey` alanı — ve o alan
**hiçbir yerde okunmuyor**: üç kursta da yazılı, üç sözlük anahtarı
(`onb.course_de/gsw/en`) üç dilde duruyor, kurs seçici `label` + `sub`
gösteriyor. Ölü alan; yazılmış metni silmek ürün kararı olduğu için
dokunulmadı, kayda geçti. `VOICES` yalnız alan adında ayrışıyor
(`noteKey` ↔ `note`).

**Bu yüzden diziler için topyekûn bir kapı EKLENMEDİ.** Sayı ve dizge
sabitlerinde byte eşitliği doğru kural; dizilerde değil — dördün üçü meşru
ayrışma. §22'nin elle seçilmiş çiftleri, "burada eşitlik sözleşmedir" denen
yerleri işaretlediği için daha doğru araç.

### 11.89 Ses kaydı, ham metin tabanı ve değerlendirme isteği

**`VOICES` ad ayrışması kapandı.** Webde `noteKey`, mobilde `note`. Ad yalnız
kozmetik değildi: mobilde `note` **başka yerlerde düz metin** taşıyor
(`skillLibrary`, `rounds`, `native`), burada ise bir **sözlük anahtarı** —
aynı adın iki işi okuyanı yanıltıyor. Webin adı zaten doğru kalıpta
(`descKey`, `titleKey`). Ad eşitlenince iki dizi birebir oldu ve
`check:parity`nin sabit listesine girdi.

**Web ham-metin tabanının 167'si açıldı.** Bileşen ve sayfa dosyalarındaki 90
dizgeyi tek tek gösterttim (tabanı geçici sıfırlayıp `--check` çalıştırarak).
Kullanıcıya çıkan **yeni bir kusur çıkmadı**:

| ne | nerede | neden meşru |
|---|---|---|
| "Niveauprüfung", "Modulprüfung", "Prüfung A1" | `exam-player` | modül sınavının Almanca havası (§11.87) |
| `ä ö ü ß` düğmeleri | `cloze-game` | Almanca harf ekleme tuşları |
| `.replace(/ö/g, …)` | beş oyun | metin katlama, arayüz değil |
| "cebe alındı", "ekran açıldı → tarayıcı" | `walk-player` | tanılama notları (`note()`) |
| `Çevir: …`, "en az N kelime" | `translate-game`, `exam-player` | **modele** giden istem; `locale: "tr"` ile tutarlı |

Son satır beklenmedik bir kapı fırsatı verdi.

**Aynı kompozisyon iki uygulamada aynı puanı almalı.** Puanı model veriyor ve
modele ne söylendiği istekte: görev metni, kısıtlar ve dil. Kısıt listesi
"en az N kelime" satırını **elle** ekliyor — iki taraftan birinde unutulursa
aynı yazı bir uygulamada geçer, ötekinde kalır ve sebebi hiçbir yerde
görünmez. Yeni bölüm sözcüğü sözcüğüne değil **isteğin şeklini** ölçüyor:
kısıt ifadesi ve `locale`.

Yapay zekâ geri bildiriminin Türkçe olması (`locale?: "tr"` — tipin izin
verdiği tek değer) iki platformda da aynı; ürün kararı, ayrışma değil.

### 11.90 Çeviri turunda ikinci şans

"Modele giden istek" karşılaştırmasını (§11.89) öteki değerlendirme
çağrılarına genişletirken çıktı: mobilde **iki** çağrı yeri var (sınav yazma,
beceri konuşma), webde **altı**. Farkların çoğu webde olup mobilde olmayan
yüzeyler (`free_sentence` turu §11.13'te kayıtlı, rol yapma sınavı ayrı bir
ekran). Biri değildi.

**Çeviri turunun ikinci şansı.** Yerel hakem (`lib/sentenceMatch`) kural
tabanlı: kabul listesinde olmayan ama **doğru** bir çeviri "yanlış" çıkabiliyor.
Web bu durumda — hüküm "yanlış" ve cevap üç sözcükten uzunsa — modele soruyor ve
model yeterince yüksek puan verirse cevabı kabul ediyor (kalite 4). Mobilde bu
yol **hiç yoktu**: aynı cevap webde doğru, Android'de yanlış sayılıyordu ve
üstelik kelimeyi geriye atıyordu (SRS kalitesi düşüyordu).

Eşikler webinkiyle aynı ada ve değere sahip (`ASSESS_WAIT_MS` 6000,
`ASSESS_ACCEPT` 75, en az üç sözcük), yani §11.86'da açılan "ortak sayısal
sabitler" kapısına **kendiliğinden** girdiler — kapının elle bakım istememesi
ilk meyvesini verdi.

**Ham metin tabanı 16 → 17.** Modele giden istem (`Çevir: …`) ham dizge ve
webin tabanında da öyle duruyor. Muafiyetin kapısı aynı turda yazıldı:
"ceviri ikinci sansi" istemi, iki eşiği ve en az sözcük sayısını iki tarafta
karşılaştırıyor — ayrışırlarsa aynı cevap bir uygulamada kabul edilir,
ötekinde edilmez ve sebebi hiçbir yerde görünmez.

**Kendi hatam:** ilk commit yalnızca taban dosyasını taşıdı; `git add` yoluna
var olmayan bir dosya adı yazdığım için komut hata verdi ve `2>/dev/null` onu
yuttu, kod indekse hiç girmedi. Ayrı bir commit'le düzeltildi.

### 11.91 Kalan değerlendirme çağrıları: kayıtlı sınır korundu

Webin altı değerlendirme çağrısından mobilde karşılığı olan ikisini (sınav
yazma §11.89, monolog konuşma) ölçtüm; kalan dördü zaten kayıtlı sınırın
içinde.

**Monolog isteği tıpatıp aynı** — `kind`, `level`, `task.prompt`
(`mono.promptTr`), `targets`, kısıt satırı (`${min}–${max} saniye` + varsa
rubrik ipucu), `answer`, `exerciseId`, `locale`, `lang` — ve geçme eşiği de
(60). Hiçbir şey bunu tutmuyordu; artık kapıda: aynı kayıt iki uygulamada aynı
puanı almalı ve "geçti mi" kararı ayrışırsa aynı kayıt bir uygulamada
egzersizi bitirir, ötekinde bitirmez.

#### Açık kalan sınıra dokunulmadı

Mobilin `skillQuiz` › `FreeCard`ı serbest yazma görevini **modele hiç
sormuyor**: `words >= minWords` sağlanınca doğru sayıyor ve örnek cevabı
gösteriyor. Web `writing-player` aynı görevi rubrikle puanlıyor
(`kind: "writing"`, `targets`, `constraints`).

Bu, §11.11'de kayıtlı sınırın içinde: mobilde tür başına oynatıcı yok, hepsi
tek ekranda; oradaki not "beş yeni oynatıcı ve elli civarı yeni metin demek,
yani ürün kararı — 'Android referanstır' kuralı bu alanda körlemesine
uygulanmasın" diyor. Tek bir kartı modele bağlamak teknik olarak küçük bir iş
(mobilin kendi `skillLibrary`si konuşma için aynısını zaten yapıyor), ama
kararı yeniden açmak bana ait değil. Buraya yazıldı ki sonraki tur da
yeniden keşfetmesin.

Değerlendirme kuyruğu (§11.12) da aynı sınırın parçası ve orada duruyor.

### 11.92 Derste isabet: mobil kendi ölçümüyle çelişiyordu

Ders akışının dört adım türü (`confirm`, `repeat`, `produce`, `truefalse`) iki
tarafta da işleniyor ve puanlanan adım yüklemi aynı (`produce` + `truefalse`),
yüzde formülü aynı. **İsabetin ne zaman sayıldığı** ayrışmıştı.

Web iki adım türünde de `ok && isFirstTry` istiyor. Mobil `gradeProduce` ise
**her doğruda** sayıyordu, kaçıncı denemede olduğuna bakmadan: aynı adımı
üçüncü denemede bilen öğrenci ilk denemede bilenle aynı yüzdeyi alıyordu.

Asıl çarpıcı yanı, ekranın **kendi ölçümünün ayrımı zaten bilmesi**:
`lesson_step` olayı değeri 2 (ilk denemede) ya da 1 (sonraki denemede) diye
yazıyor — puan onu görmezden geliyordu. Yani parite farkından önce mobil kendi
içinde tutarsızdı. Doğru/yanlış adımında fark yok: orada tek deneme var
(`answered` kilidi).

Sonuç: ders bitiş yüzdesi ve `lesson_finish` ölçümü artık iki uygulamada aynı
şeyi anlatıyor.

**Kapı üç kuralı birden ölçüyor** — hangi adımlar puanlanıyor, isabet ne zaman
sayılıyor, yüzde formülü. Yüklem mobilde ayrı dosyada (`data/lessons`
`scoredSteps`), webde oynatıcının içinde iki kez yazılı; kapı ikisini de kendi
yerinden okuyor.

### 11.93 Yürüyüşte gün: sessizce sunucunun UTC günü

Yürüyüş modunu karşılaştırırken tur kuyruğu, duyulmama eşikleri
(`UNHEARD_WINDOW` 4, `UNHEARD_LIMIT` 3 — ikisi de §11.86'nın otomatik sayısal
kapısında) ve bitiş sebep tablosu eşit çıktı. **Adres eşit değildi.**

Web yürüyüş oynatıcısı iki fetch'inde de `/api/session?walk=1` diyordu — `day`
yok. Uç gün gelmezse `clampDay` **sunucunun UTC gününe** düşüyor. Sonuç: UTC+3'te
01:30'da yürüyenin cevapları düne, UTC-5'te 21:00'de yürüyenin cevapları yarına
yazılıyordu — ve günlük istatistik ile seri o günden hesaplanıyor.

Kod tabanının kuralı bunu baştan beri söylüyor ("yerel gün gönderilir,
sunucunun UTC günü gece çalışanı yanlış güne yazar"); aynı sayfanın oturum
oynatıcısı ve mobilin yürüyüşü zaten öyle yapıyor. Yalnız bu iki çağrı dışarıda
kalmış.

Taramada ikinci bir tane çıktı: `/api/growth` da günü okuyup UTC'ye düşüyor ve
`progress-panel` göndermiyordu — gece yarısına yakın açılan büyüme raporu bir
gün kaymış seriyle çiziliyordu.

**Kapı:** `searchParams.get("day")` okuyan öğrenme uçlarına (session, quests,
daily, weekly, growth) tarayıcıdan giden her **sorgulu** adres `day=` taşımalı.
Sosyal uçlar dışarıda: haftayı sunucu belirliyor ve iki istemci de bilerek gün
göndermiyor (§11.77'de ölçüldü).

### 11.94 §11.86'nın düzeltmesi: yanlış çiftle karşılaştırma

Patron turunun süre kurallarını incelerken kendi hatamı buldum.

§11.86'da `DANGER_SECONDS`i webde 8'den 10'a çekmiş ve "Android'in değeri
alındı" demiştim. **Karşılaştırma yanlış çiftle yapılmıştı.** Web bu adı iki
dosyada taşıyor:

| dosya | ne | değer |
|---|---|---|
| `boss-player` | patron turu — mobil `BossScreen`in eşi | 10 |
| `challenge-player` | sürenin doğru cevapla **kazanıldığı** mod, mobilde karşılığı yok | 8 |

Kapı "son tanımı" aldığı için mobilin `BossScreen`ini webin `challenge-player`ı
ile karşılaştırdı. Gerçek eşte (patron turu) iki taraf **zaten eşitti** — yani
düzeltilecek bir ayrışma en baştan yoktu, ve ben web-özel bir modun ayarını
değiştirmiştim. Geri alındı; süre kazandıran modda eşiğin daha dar olması
mantıklı, orada süre yalnız azalmıyor.

**Kapı da düzeltildi.** Bir ad bir ağaçta birden çok yerde tanımlıysa
karşılaştırmaya girmiyor: hangi çiftin kastedildiğini kapı bilemez. Belirsizler
sessizce düşmüyor, yedisi de listede yazılı ve yenisi çıkarsa kapı kalıyor.
Bugünküler meşru — farklı uçların hız sınırları (`DAILY_LIMIT` 120/20/400),
farklı listelerin sayfa boyu (`PAGE_SIZE` 40 sayfa / 30 uç), farklı modların
eşikleri.

Ders: "adı aynı olan sabit" varsayımı, adın **tek** olduğu varsayımını gizlice
taşıyor. Otomatik kapı elle bakım istemiyor diye doğru olduğu anlamına gelmiyor;
eşleştirmenin kendisi de bir varsayım ve o da ölçülmeli.

### 11.95 Ders özetinde kullanılan kalıp

Rol yapma akışını karşılaştırırken çıktı. İki tarafta da ders üç evreli
(`lecture` → `roleplay` → `summary`) ve evre adları bile aynı; fark **özette**.

Web özeti konuşmada geçen kalıbı yeşil tikle işaretliyor, geçmeyeni soluk
bırakıyor ve gerekçesini yanında yazıyor: *"dersin asıl amacı kalıbı
kullanmak"*. Mobil özeti kalıpları **düz bir liste** olarak yazıyordu — her
kalıp aynı görünüyor ve öğrenci konuşmada hangisini gerçekten kullandığını
hiçbir yerden öğrenemiyordu. Dersin geri bildiriminin çekirdeği eksikti.

Kural webin `patternUsed`inin aynısı: gövde çıkarımı ("Ich möchte …" →
"ich möchte"), en az üç harf, yalnız kullanıcının turları. Konuşma hiç
olmadıysa (roleplay atlandı) işaret de yok — yanlış bir "yapmadın" damgası
vurmasın.

Kural iki tarafta ayrı dosyada kopyalandığı için kapıya bağlandı: ayrışırsa
aynı konuşma bir uygulamada kalıbı kullanmış, ötekinde kullanmamış sayılır.

**Dizge sabitlerinde de belirsizlik temizliği.** §11.94'ün kusurunun aynısı
dizge bölümünde de duruyordu ("son tanım kazanır"): webde `DISMISS_KEY` iki
ayrı "kapat" anahtarı, `TOKEN_URL` iki sağlayıcının jeton adresi. İkisi de
mobilde yok, yani bugün zarar vermiyorlardı — ama aynı tuzak oradaydı. Artık
karşılaştırmadan çıkıyor ve kayıtlı listede duruyorlar.

**Rol yapma SINAVI** (`/lessons/[id]/exam`) webe özel; mobilde karşılığı yok
ve bu §11.11'deki oynatıcı sınırının parçası.

### 11.96 §11.9 kapandı: sağlayıcı kapalıyken konuşma

Üç turda tamamlandı. §11.9'daki blokaj "port ölçülmedi"ydi ve ölçüm o
bölümün kendi içinde yapılmıştı; kalan iş yapmaktı.

**Neden önemliydi:** ders geçme koşulu konuşmanın **yapılmasını** istiyor
(`roleplayDone`). Sağlayıcı kapalıyken web derse ait senaryoya düşüp devam
ediyordu; mobil yalnız "yapay zekâ kapalı" deyip bırakıyordu — yani Android'de
**hiçbir konuşma dersi tamamlanamıyordu**.

| adım | ne geldi |
|---|---|
| 1/3 | `lib/speech` `normalizeSpoken`, `game/dialogue` `matchReply`/`usedTargets` |
| 2/3 | `game/offlineRoleplay` durum makinesi + `LessonRoleplay.script` alanı |
| 3/3 | döküme `script`, ekranın bu yola düşmesi, dört yönlendirme anahtarı |

Her adım kendi kapısıyla geldi: niyet eşleştirme (kısa kök sınırı, kök arama,
puanlama), sözlü metin normalizasyonu (noktalama kümesi, küçültme yereli) ve
çevrimdışı akış (kalıp eşiği, özet puanı, koç cümleleri tablosu).

**Döküm gerekçesi ölçülünce düştü.** Eski karar "paket şişmesin" diyordu;
senaryo 780 dersin **10'unda** var ve `de-a1.json` 613K'dan 676K'ya çıktı.
Kalan 770 ders zaten kalıp moduna düşüyor ve döküm gerekli iki alanı baştan
beri taşıyordu.

**İki yerde webden ayrıldım, ikisi de gerekçeli:**

- *Yönlendirme baloncuk olarak çiziliyor* (webde mikrofon etiketinde): mobilde
  o etiket tek satır ve kalıp cümlesi sığmıyor, üstelik ekranda zaten "ipucu"
  tonlu baloncuk var.
- *Karşı tarafın cümleleri hedef dile göre seçiliyor.* Web dördünü de Almanca
  sabit yazıyordu ve İngilizce kursta (iki yüz ders) Almanca çıkıyordu. Port
  sırasında çıktı; **web de düzeltildi** ve tablo kapıya bağlandı. `Richtig/
  Falsch` ile aynı sınıf (§11.84): Türkçe harf taşımadığı için
  `i18n-hardcoded` görmüyor, sözlük anahtarı olmadığı için `i18n:check`
  görmüyor.

### 11.97 Ölçüm pariteси: hangi olay hangi tarafta atılıyor

Yeni bir karşılaştırma ekseni: iki tarafın **istemciden** attığı olay adları.
Sunucudan atılanlar (`share`) zaten iki platforma da yazılıyor, o yüzden
ayrım yalnız istemci çağrılarında anlamlı.

Web istemcisinden atılıp mobilde hiç atılmayan **yirmi iki** ad çıktı. Beşinin
mobil yüzeyi vardı ve soru gerçekten cevapsız kalıyordu:

| olay | Android'de cevapsız kalan soru |
|---|---|
| `session_resume` | baştan mı başladı, devam mı etti |
| `session_stop` | kaç kişi turu bitirmeden çıkıyor, nerede çıkıyor |
| `first_practice_done` | kaç kişi ilk pratiği bitiriyor (huni adımının kendisi) |
| `placement_finish` | kaç kişi seviyesini yerleştirmeye göre ayarlıyor |
| `production_attempt` | konuşmada kalıpların kaçı kullanıldı |

Hiçbiri yeni yüzey istemedi — beşinin de olayı yazılacak yeri zaten vardı
(`session_stop` için çıkış onayı, `placement_finish` için "uygula" düğmesi).

**Kalan on yedisi web-özel** ve gerekçeleri kayıtlı: tarayıcı ölçüm katmanı
(`page_view`, `time_spent`, `panel_open`, `push_open`, `invite_open`),
PWA/tarayıcı yolları (`install_prompt`, `push_optin`, `client_error`),
mikrofon yolu tanılamaları (`walk_capture`, `walk_listen`, `walk_switch`),
mobilde karşılığı olmayan mod (`challenge_play`) ve mobilde farklı çizilen
yüzeyler — `sound_toggle` (mobilde ses anahtarı yok, sistem sesi kullanılıyor),
`coach_show` (koç baloncuğu yok), `feedback_why_opened` (mobil "neden"i
**her zaman** gösteriyor, açma eylemi yok), `stage_done` (mobilde etap
duraklaması yok).

**Tarayıcımın bir kusuru:** `exam_start` önce eksik göründü, oysa webin tek
geçtiği yer bir **yorum** satırıydı ("Burada `track("exam_start", …)`
yazıyordu"). Yorum ayıklamayan bir tarama yanlış pozitif üretiyor — §11.85'te
kapıya yazdığım kuralın (yorumlar ayıklanmalı) aynısı, bu kez ölçüm aracında.

### 11.98 Kapı yazılınca bir eksik daha çıktı

§11.97'nin listesini kapıya bağladım ve kapı ilk çalışmasında **altıncı**
eksiği gösterdi: `exam_start`.

Web yerleştirme testi **başlarken** yazıyor (`placement:A1`); mobil yalnız
bitişi yazıyordu. Yani "kaç kişi başlayıp bıraktı" hesaplanamıyordu — huninin
**payı** eksikti, paydası değil. Bir önceki tur `placement_finish`i eklemişti
ve bu, yarım bir ölçüm bırakmıştı.

Elle taramada gözden kaçmasının sebebi ilginç: aynı ad webin bir **yorum**
satırında da geçiyor (`weekly-player`: "Burada `track("exam_start", …)`
yazıyordu") ve elle bakarken onu gerçeğinden ayırmamıştım — tek geçiş sandım.
Kapı yorumları ayıkladığı için doğruyu gösterdi.

Ders: yanlış pozitif yalnız fazladan iş çıkarmaz, **gerçek bulguyu da
gizleyebilir**. §11.85'te kapıya yazdığım "yorumlar ayıklanmalı" kuralının
ikinci gerekçesi bu.

Kalan on altı ad web-özel ve her biri gerekçesiyle kapının listesinde duruyor;
yenisi çıkarsa kapı kalıyor ve "bunun mobil yüzeyi var mı" sorusu insana
geliyor.

### 11.99 Beceri listesi ve bitiş kartı: iki sessiz eksik

**Madde sayısı listede yoktu.** Web satırı "tür · süre · N madde" yazıyor;
mobil "tür · süre" ile kalıyordu — öğrenci egzersizi açmadan ne kadar iş
olduğunu göremiyordu. Veri zaten elde; `itemCount` kuralı üç satır ve konuşma
üç biçimde geliyor (söyleyiş görevleri / diyalog turları / tek monolog).

Portta bir tip eksiği çıktı: `dialogue` alanı mobil `SkillExercise` tipinde
**yoktu** ama veride var (Almanca pakette 212, İngilizcede 13 geçiş). Onsuz
konuşma alıştırmalarının sayısı yanlış çıkacaktı — tip eksikti, veri değil.

Kural kapıya bağlandı: ayrışırsa aynı egzersiz iki uygulamada başka madde
sayısı gösterir **ve XP tavanı da kayar** (`xpFor` aynı sayıyı kullanıyor).

**Sıfır XP'nin sebebi söylenmiyordu.** Aynı egzersizi tekrar bitiren kullanıcı
yalnız "hiçbir şey" görüyordu: XP satırı çıkmıyor, sebebi hiçbir yerde
yazmıyordu. Sebep sunucunun yanıtında duruyor (`repeat`) ve okunmuyordu; web
bunu bir satırla söylüyor. **Sessiz sıfır**, kapalı düğmenin sebepsizliğiyle
aynı sınıf (§11.81) — kullanıcı bir şey olmadığını görüyor ama neden
olmadığını öğrenemiyor. Seri de aynı yanıttan geliyordu ve okunmuyordu.

Bitiş kartında hâlâ webde olup mobilde olmayan iki şey var ve ikisi de
§11.11'in sınırında: **çevrimdışı kaydedildi** hâli ve **sıradaki egzersize**
bağlantı.

### 11.100 Kelime listesi: uç zaten söylüyordu, ekran sormuyordu

Üç eksik, üçü de **mevcut yeteneği kullanmıyordu**.

**Tekrar takvimi ve gerçek durum.** Web listesi her kelimede "tekrar zamanı
geldi / yarın / N gün sonra", kaç kez zorlanıldığı ve **beş durum** gösteriyor;
mobil üç durum gösteriyordu. Sebep uçtaydı: `/api/words` yalnız `intervalDays`
üzerinden türetilmiş üç değerlik bir `status` gönderiyordu, web ise sunucu
bileşeninde tabloyu doğrudan okuyor. Uç artık `dueAt`, `lapses` ve `leech` de
gönderiyor; mobil web `word-list` ile aynı eşikleri kullanıyor (leech
"zorlanıyorsun", üç günü geçen aralık "tanıdık", yirmi bir gün "öğrenildi").

Bunun önemi ölçüde değil öğrenmede: **tekrar tekrar unutulan kelime
öğrenilenden ayırt edilemiyordu** ve "bu kelime beni zorluyor" bilgisi
Android'de hiçbir yerde yoktu.

**Seviye süzgeci.** Uç `?level=` destekliyor ve web kullanıyor; mobil hiç
göndermiyordu. Yetenek vardı, ekran sormuyordu.

**İlerleme özeti.** "{n} pekişti · {n} görüldü · {n} tekrar sırada" satırı
webde başlığın altında. Sayılar mobilde **zaten geliyordu** (`useMe`:
`mastered`, `totalWords`, `dueCount`) ve hiçbiri gösterilmiyordu. Ek istek
yok.

Üçü de aynı kalıbın örneği: **veri ya da yetenek elde, yüzey sormuyor.**
§11.80'in "sözleşme modellenmiş, yüzey yazılmamış" sınıfının uç tarafındaki
hâli.

### 11.101 İlerleme ekranı: sunucu hesaplıyordu, uç göndermiyordu

`getProgress` seviye kırılımını, ileri tarihli tekrarları ve leech sayısını
zaten **aynı sorguda** hesaplıyor; `/api/me` yalnız toplamları gönderiyordu.
Mobil ilerleme ekranı "hangi seviyede kaç kelime", "kaçı ileri tarihe
planlandı", "kaçında zorlanıyorum" sorularının hiçbirini cevaplayamıyordu —
ek sorgu olmadan üçü de eklendi ve web `progress-view`daki iki kart mobile
taşındı (seviye çubuğu: koyu pekişmiş, açık görülmüş; tekrar kuyruğu).

**Etkinlik şeridi** de yalnız webdeydi. "Dün çalıştım mı, hafta sonları
düşüyor muyum" günlük alışkanlığı değiştiren soru; cevabı bir platformda
yoktu. `daily_stats` satırları uçtan gün + tekrar sayısı olarak gidiyor
(satırın geri kalanı mobilde kullanılmıyor, özet ucu sık çağrılıyor).

Isı basamakları elle kopyalanmış bir tablo olduğu için `HEAT_RAMP` adıyla iki
tarafta aynı biçimde yazıldı ve **parity 46** karşılaştırıyor; `STRIP_DAYS`
ile `STRIP_FLOOR_PCT` zaten 37'ye giriyor. Aynı çalışmanın iki uygulamada
başka yoğunlukta görünmesi, grafiği hiç olmamasından kötü yapardı.

### 11.102 Aynı metnin iki sözlükte iki kopyası

`prog.*`/`progw.*` ve `candow.*` altındaki dokuz + iki anahtar, mobil
sözlükteki cümlelerin **birebir ikinci kopyasıydı**. i18n köprüsü mobil
sözlüğü `src/i18n/base/*`'a çektiği için web zaten aynı anahtarları
kullanabiliyordu; iki kopya yalnız birinin düzeltilip ötekinin eski kalması
için bir yol açıyordu. Web tarafı mobil kaynaklı anahtarlara geçti, kopyalar
silindi.

### 11.103 Yapabildiklerim: eşleme yanlış anahtarla yazılmış

`/api/cando` beceriyi CEFR koduyla gönderiyor (`RD`, `LS`, `WR`, `SPK`, `GR`
— `lib/cando` `CandoSkill`), mobil tablo ise uzun adlarla yazılmıştı
(`reading`, `listening`). Arama **her satırda** boşa düşüyor ve ifadenin
altında çeviri yerine ham kod ("RD") yazıyordu. Tip `string` olduğu için ne
`tsc` ne `lint` görüyordu — **parity 47** iki tabloyu satır satır eşliyor.

Aynı ekranda kanıt kuralı ("bir ifade ... en az iki ... tamamlayınca kanıtlı
sayılır") yalnız webde yazılıydı: mobil kullanıcı tikin ne zaman geleceğini
bilmeden listeye bakıyordu.

### 11.104 İki tarayıcının ortak kör noktası

Seviye özetindeki `{b.proven}/{b.total} ifade` **hiçbir kurala düşmüyordu**.
Sebep: `{ifade}` ve etiketler çıkarıldıktan sonra geriye kalan `/` işareti
`CODEY`'e takılıyor ve parça **kod** sayılıyordu. Aynı boşluk web
tarayıcısında da vardı (ölçüldü: enjekte edilen aynı satırı o da görmüyordu).

Kural artık **yapısal işarete** bakıyor: parantez, eşittir, noktalı virgül
gibi bir şey duruyorsa parça koddur (`if (!izin)`) ve olduğu gibi sınanıyor;
yalnız metin noktalaması kalmışsa temizlenip metin olarak sınanıyor. İki
tarafta da yeni yanlış pozitif yok (166 / 17 aynı) ve enjekte edilen satır
ikisinde de yakalanıyor.

§11.96'nın kaydettiği ders bir kez daha: **yanlış negatif iş çıkarmıyor,
bulguyu gizliyor.**

### 11.105 Rozet duvarı: bilinmeyen grup sessizce düşüyordu

Web duvarı `GROUP_ORDER` üzerinde dönüp her grup için satırları süzüyordu.
Sunucu listede **olmayan** bir grup gönderirse o rozetler hesaplanıyor,
açılıyor, sayıya giriyor ve **hiçbir bölümde çıkmıyordu** — hata da vermeden.
`achievement-groups` dosyası bu kaybın *tanım kopyası* tarafını çözmüştü,
düşme yolunu değil. Android satırları kovalıyor ve bilinmeyen grubu atmıyor,
sona ekliyor; **parity 48** iki tarafta da o yolu arıyor.

Duvarın ikinci "Rozetler" başlığı kalktı: sayfanın kendi başlığı zaten
"Başarımlar" ve aynı şey iki kez yazılıyordu (Android başlığın altına yalnız
sayıyı koyuyor).

### 11.106 Kelime listesi: uç sayfayı gönderiyordu, ekran istemiyordu

`/api/words` **baştan beri** `page` ve `hasMore` döndürüyor; mobil ikisini de
atıyordu. Kullanıcı binlerce kelimenin ilk otuzunu görüyor, gerisine ulaşmanın
hiçbir yolu olmuyordu — liste sonunda "hepsi bu kadar" gibi duruyordu. §11.80
sınıfının en pahalı örneği: sözleşme tam, yüzey yarım.

**Örnek cümle hiç yoktu.** Web satırı dokununca açılıyor ve örneği çevirisiyle
gösteriyor; mobil kelime listesi kelimeyi **cümle içinde bir kez bile**
göstermiyordu. `en`, `beispiel`, `beispielTr`, `beispielEn` uçtan hiç
gitmiyordu.

**Aralık hatası.** Mobil "tanıdık" eşiğini `dueAt`ten türetiyordu, oysa o
**kalan gün sayısı**, aralık değil: on günlük aralığı dokuz gün önce görülmüş
bir kelime "yarın" diye okunup "öğreniyor"a düşüyordu. Uç `intervalDays`
gönderiyor, eşik artık web ile aynı.

### 11.107 Örnek cümle kuralının basitleştirilmiş kopyası

Mobil `firstExample` yalnız satır sonuna ve `" / "` ayracına bakıyordu. Havuzda
497 madde numaralı bir derleme ("1. … 2. …"), 53 madde cümleleri **boşluksuz**
eğik çizgiyle ayırıyor ve kısaltmalar noktayla bitiyor ("vor ca. 6000 Jahren").
Üçünde de aynı kelime iki uygulamada iki ayrı örnek gösteriyordu — ve bu
yalnız kelime listesini değil, cümle kuran **turları** da etkiliyordu.

Web kuralı `mobile/src/data/example.ts` olarak taşındı (kısaltma listesi
içerik olduğu için `SKIP_CONTENT`, karşılığında **parity 49** hem listeyi hem
üç ayıklama adımını eşliyor — muafiyetin kapısı).

### 11.108 Ayarlar: günde yeni kelime mobilde hiç yoktu

`updateProfile` alanı baştan beri taşıyor, `/api/profile` kabul ediyor (0–40)
— eksik olan hem mevcut değeri gönderen uç alanı hem de onu çizen yüzeydi.
Kullanıcı **günlük yükü belirleyen iki ayardan birini** yalnızca webden
değiştirebiliyordu. §11.80'in bir örneği daha: sözleşme uçtan uca yazılı,
ekran hiç sormuyor.

Çip aralığı ucun kırpmasıyla aynı ve **parity 50** üçünü (uç, web
kaydırıcısı, mobil çipleri) yan yana tutuyor: yüzey sunucunun kabul etmediği
bir sayı teklif ederse kullanıcı seçtiğini kaydedilmiş sanıyor, sunucu
sessizce kırpıyor ve ekran bir sonraki açılışta başka bir sayı gösteriyor.

Üç açıklama satırı da yalnız webdeydi — tekrar zamanlarının nasıl
hesaplandığı, kurs değişince kelimelerin taşındığı ama öteki kursun
**silinmediği**, ve seviyeyi yalnızca kullanıcının değiştirdiği. Üçü de
düğmeye basmadan önce bilinmesi gereken şeyler.

### 11.109 Büyük harf çevirisi yerelsizdi

Türkçede "i" nin büyüğü **"İ"**, "I" değil. Yedi yerde arayüz metni ya
`toUpperCase()` ile ya da elle yazılmış `"tr-TR"` ile büyütülüyordu ve hata
**iki yönde birden** çalışıyordu: Türkçe arayüzde "ILERLEME", İngilizce ve
Almanca arayüzde "PROMOTİON". İkisi (sosyal bölüm başlığı `SectionTitle` ve
lig kuşak etiketi) bütün sosyal ekranları etkiliyordu.

Kural zaten yazılıydı (`achievement-wall`: "Büyük harfe çevirme YEREL"),
uygulanmamıştı. **Parity 51** artık kaçakları sayıyor ve kapsamı bilerek dar:
çevirmen çıktısına uygulanan harf çevirisi ve `.tsx` içinde elle yazılmış
`"tr-TR"` büyütmesi. Veri üzerindeki `toLowerCase()` (e-posta, kullanıcı adı,
eşleştirme) meşru ve aranmıyor — o kadar geniş bir kural yalnızca gürültü
üretip **gerçek bulguyu gizlerdi** (§11.104).

### 11.110 Şikayet sebebi eksikti — o şikayet hiç gelmiyordu

Sunucu dört sebep kabul ediyor (`REPORT_REASONS`: spam, abuse, impersonation,
**other**) ve web dördünü de sunuyor; mobil `UserScreen` üçünü yazıyordu.
Şikayeti bu üçe girmeyen kullanıcının bildirebileceği **hiçbir yol yoktu** —
moderasyon yüzeyinde eksik bir sebep, o şikayetin hiç gelmemesi demek (Play/
Apple UGC gerekleri de bunu istiyor). **Parity 52** iki yüzeyi de sunucunun
listesiyle eşliyor.

### 11.111 "Bir üst lige çıktın" bildirimi akışa götürüyordu

`league_up` gerçek bir bildirim türü (`NOTIFICATION_TYPES`) ama web'in
`hrefFor`unda ele alınmamıştı ve `default` dalına düşüyordu: satır, anlattığı
şeyin bulunduğu yere değil akışa gidiyordu. Android sıralamaya götürüyor.

Kalıcı olan kısım şu: iki yönlendiricinin de bir `default` dalı var, yani
paylaşılan listeye yeni bir tür eklendiğinde **hiçbir şey kırılmıyor** —
satır sessizce yanlış yere gider. **Parity 53** artık açıkça ele alınan
türleri iki tarafta eşliyor; biri ötekine bir tür eklerse kapı kalıyor.

### 11.112 Profil kartında üçüncü sözlük kopyası dalgası

`socialw.stat_longest`, `socialw.stat_last_active`, `socialw.shared_quest` ve
`socialw.more` yalnız `public-profile` içinde kullanılıyordu ve dördü de mobil
sözlükteki cümlelerin ikinci kopyasıydı (§11.102). Web mobil kaynaklı
anahtarlara geçti.

"Daha fazla" düğmesi ayrıca **ne açtığını söylemiyordu**; açılan şey engelleme
ve şikayet. Android iki durumu da adıyla yazıyor ("Engelle / Şikayet et" ↔
"Gizle"), web de artık öyle.

### 11.113 Akışta iki olay türü karosuz kalıyordu

`friend_streak` ve `league_up` `ACTIVITY_TYPES` listesinde var ama **iki
tarafta da** `eventTile`ın `default` dalına düşüyordu. Karonun tek işi "ne
kutlanıyor" sorusunu bir bakışta cevaplamak — ve tam da bu iki olayda
yapmıyordu, ikisi de genel bir kıvılcımla çiziliyordu.

İkisine de kendi karosu verildi (ortak seri kalp, lig yükselişi taç).
**Parity 54** iki tarafı hem birbirine hem **paylaşılan listeye** bağlıyor:
§11.111'in dersi burada da geçerli — `default` dalı varken yeni bir tür
sessizce yanlış çiziliyor ve hiçbir kapı görmüyor.

### 11.114 Tepki satırında boş ad: tip aynı görünüyordu, değildi

Sunucu adsız kullanıcıyı `null` gönderiyor (`social/reactions`) ve web yedek
metni arayüz dilinde yazıyor. Mobil tipi `names: string[]` diyordu: `join`
boşluk basıyor ve tepki satırı **"Ali, , ve 2 kişi"** çıkıyordu.

Bulgunun asıl değeri kapıda: §26 sosyal tiplerin **alan adlarını** eşliyor,
tiplerini değil — ad kümesi aynı olduğu için bu ayrışma görünmüyordu.
**Parity 55** artık *null alınabilirliği* ölçüyor. Tam tip eşliği bilerek
ölçülmüyor: mobil kendi kısayollarını kullanıyor ve o karşılaştırma gürültü
üretip gerçek bulguyu gizlerdi (§11.104, §11.109) — ama "bu alan boş
gelebilir mi" sorusu iki tarafta aynı cevabı vermek zorunda.

### 11.115 Web iskeletleri düz bloktu

Ortak görev iki tane doksan altı piksellik düz satırla, kişi listeleri
(arkadaşlar, arama sonuçları, öneriler) göz kararı yükseklikte `RowSkeleton`
ile yer ayırıyordu: kart gelince yerleşim yerinden oynuyordu. İskeletin işi
yükseklik doldurmak değil **gelecek şeyin şeklini göstermek** — akış ve gelen
kutusu bu kuralı zaten uyguluyordu, bu üçü uygulamıyordu. Android'in
karşılıkları şekilli (`QuestsSkeleton`, `FriendCardSkeleton`,
`SearchResultSkeleton`).

Ortak görev kartında **hedef XP** alt satırın kuyruğuna `· 500 XP` diye
ekleniyordu: kartın en önemli sayısı, kimin kiminle olduğunu anlatan cümlenin
arkasında kalıyordu. Android sağ üstte büyük yazıp altına ne olduğunu
söylüyor.

### 11.116 Üçüncü kör nokta: süslü parantezin yuttuğu JSX

Arkadaş tablosunda kendi satırını işaretleyen rozet **`sen` diye elle
yazılıydı** — İngilizce ve Almanca arayüzde de "sen" çıkıyordu; anahtar taban
sözlükte hazırdı ve Android aynı satırda onu kullanıyor.

Sebep yine tarayıcıda: `{...}` içini komple atan desen, tek satırlık **koşullu
bir JSX**'i (`{x ? <span>sen</span> : null}`) tamamen yok ediyor ve gövde
metni hiçbir kurala düşmüyordu. İçinde etiket açılışı olan parantez artık
olduğu gibi bırakılıyor; etiket temizliği zaten gövdeyi ayırıp çıkarıyor.
Ölçüldü: iki tarafta da yeni yanlış pozitif yok (166 / 17 aynı) ve enjekte
edilen satır yakalanıyor.

§11.104 ve §11.109 ile birlikte üçüncü kez aynı ders: **yanlış negatif iş
çıkarmıyor, bulguyu gizliyor** — ve gizlediği şey her seferinde gerçek bir
kullanıcı hatası oldu.

### 11.117 Nabız satırı: çubuk tek başına bir şey söylemiyor

Öğren ekranındaki ortak görev satırı webde yalnız **çubuğu** çiziyordu: kaç XP
toplandığı, hedefin ne olduğu ve kaç gün kaldığı hiçbir yerde yazmıyordu.
Çubuk tek başına "ne kadar kaldı" sorusunu cevaplamıyor — anahtar
(`friendpulse.progress`) taban sözlükte hazırdı ve Android onu kullanıyordu.

Yüklenirken de yer ayrılmıyordu: `!q` yüklemeyi (`undefined`) ve "görev yok"u
(`null`) aynı sayıyor, cevap gelince satır araya girip altındaki bölümleri
aşağı itiyordu. Android bunu bilerek ayırıyor. §11.115'in aynı kuralı, bu kez
tek satırlık bir bileşende.

Ölçülüp **ayrışma çıkmayanlar** (kayda geçsin, tekrar bakılmasın): `Find`,
`Requests`, `InboxBell`/`useUnread` ve sosyal ayarların geri kalanı.

### 11.118 Kendi davet kodunu giren kullanıcıya yanlış şey söyleniyordu

`/api/premium/redeem` sebebi doğrudan sözlük anahtarı olarak gönderiyor ve iki
istemci de tanıdığı sebeplerin listesini **elle** yazıyordu. `self` (kendi
davet kodu) ikisinde de yoktu: kullanıcı "Kod uygulanamadı, daha sonra tekrar
dene" görüyordu — oysa yapması gereken belli ve **tekrar denemek hiçbir zaman
işe yaramayacak**.

**Parity 56** beklenen kümeyi elle yazılmış bir listeden değil **sunucudan**
türetiyor: promo katmanının `reason` birleşimi + `AttachResult`in kullanıcıya
dönen değerleri (`ok` ve `unknown_code` hariç — ilki hata değil, ikincisi uçta
`not_found`a çevriliyor) + hız sınırı. Sunucu yeni bir sebep eklerse iki
istemci de kapıya takılıyor.

### 11.119 KARAR BEKLİYOR — seviye testi mobilde yalnız kelime ölçüyor

Sunucu **dört aşamalı** bir test veriyor (`PlacementStage`: vocab, grammar,
reading, listening) ve web dördünü de oynatıyor: seviye aşama içinde
uyarlanarak yükseliyor (`nextLevel`), okuma ve dinleme kendi metinleriyle
geliyor. Mobil istemci tipi (`PlacementTest`) **yalnızca `vocab` taşıyor** —
Android'de seviye testi kelime ölçüyor, öteki üç beceri hiç sorulmuyor ve
`perSkill` üç alanı boş dönüyor.

Bu, alışılmış yönün tersi: burada **web ileride**. Bir tur içinde kapatılacak
bir açık da değil — mobil tarafta uyarlanan aşama makinesi, metin oynatıcı ve
dinleme sesi gerekiyor (kabaca üç ekran + ses yolu). **Samet'in kararı
bekliyor.**

**KAPANDI (bkz. §11.168).** Tahmin fazlaydı: gereken parçaların hepsi mobilde
zaten vardı (şıklı tur bileşeni, metin bloğu, TTS). Eklenen şey tip,
düzleştirme ve sorunun üstündeki bağlam bloğuydu. §57 kapısı artık muafiyetsiz.

**Parity 57** açığı kapatmıyor, **büyütmüyor**: sunucunun aşama listesi ile
"mobilde olan + kayıtlı eksik" kümesi eşleniyor. Sunucu beşinci bir aşama
eklerse ya da mobil bir aşama kazanırsa kapı kalıyor ve insan bakıyor —
muafiyetin kapısı kuralı (§11.107) burada da geçerli.

### 11.120 Deneme sınavı: mikrofonsuz konuşma yolu mobilde yoktu

Konuşma bölümünün **tek girişi** mikrofondu: izni reddeden ya da cihazında
tanıma çalışmayan kullanıcı "mikrofon gerekli" uyarısında **kalıyor** ve
bölümü hiç bitiremiyordu. Oysa yazılı döküm yolu **aynı bileşende zaten var**
(`done` adımı) ve değerlendirme metin üzerinden çalışıyor — web ikinci bir
düğmeyle o yolu açıyordu. §11.80'in bir örneği daha: yetenek elde, kapı yok.

Döküm kutusunun ipucu metni de mikrofon açılamadığında artık ayrı şeyi
söylüyor; genel döküm notu o durumda yanlış şeyi anlatıyordu.

### 11.121 Giriş metni davranışı yarım anlatıyordu

`mockexams.intro` iki sözlükte iki ayrı sürümdü ve **mobildeki eksik olanı**:
süre dolunca sıradaki göreve otomatik geçildiğini ve bitmiş göreve
dönülemediğini söylemiyordu. İkisi de mobil `MockExamScreen`de **uygulanmış**
kurallar (`advance`, `mockexam.no_back`) — yani metin, uygulamanın kendi
davranışını eksik anlatıyordu ve öğrenci sınava o bilgi olmadan giriyordu.

Aynı dalgada bölüm özeti (süre + madde sayısı) de birleşti: webde üç ayrı
anahtar, mobilde bölüm listesiyle ortak iki anahtar vardı — aynı olgu iki
ekranda iki ayrı metin.

### 11.122 Seviye sınavı sertifikası mobilde hiç yoktu

Uç aylardır hazırdı — ve **yorumu "bu ucu mobil de çağırıyor" diyordu**
(`api/certificate/[id]`, dili çerezden değil profilden okuma sebebi tam da
buydu). Mobilde onu çağıran hiçbir şey yoktu: sınavı geçen Android kullanıcısı
ödülünü hiç görmüyordu. Sunucu sınav kimliğini zaten döndürüyor, mobil `Result`
tipi alanı **sessizce düşürüyordu** — yani sertifikaya ulaşmanın yolu da
kapalıydı.

Sistem tarayıcısında açılmıyor, içeride çiziliyor: oturum çerezle taşınıyor ve
o çerez uygulamanın kendi ağ katmanında; bağlantıyı tarayıcıya vermek 401
döndürürdü. Kâğıt SVG olduğu için WebView'e olduğu gibi veriliyor. Geçilmemiş
ya da deneme sınavında aynı yerde ne yapılacağı yazıyor.

**Parity 58** düşen alanların listesini yazılı tutuyor: tam eşitlik istemiyor
(mobil seviye/modülü rota parametresinden biliyor) ama sunucu yeni bir alan
eklerse liste tutmuyor ve insan "bunu mobil de kullanmalı mı" diye bakıyor.
`id` tam olarak bu kapı olmadığı için kaybolmuştu.

### 11.123 Sınav sonucu neyi kaçırdığını söylemiyordu

Seviye sınavı mobilde yalnız **yüzde** gösteriyordu: öğrenci "%62" görüp neyi
kaçırdığını hiç öğrenmiyordu — oysa sınavın **öğreten kısmı tam olarak bu**.
Web `exam-player` her cevap noktasında kaçanı biriktirip sonuçta doğru
cevabıyla ve öğrencinin verdiği cevapla birlikte açıyor; mobilde hiçbiri
yoktu.

Altı cevap noktası da bildiriyor artık (kelime, dilbilgisi, üretim, okuma,
dinleme, konuşma). Kırılım **kapalı başlıyor** ki puanın önüne geçmesin —
webdeki karar da bu. Örnek cevap da kâğıtta zaten vardı (`task.sample`) ve hiç
gösterilmiyordu: yazma bölümünde öğrencinin karşılaştıracağı tek şey oydu.

**Parity 59** iki tarafın hangi bölümler için kayıt açtığını eşliyor. Kapının
sebebi: kaçanlar merkezî bir yerden değil, **her cevap noktasında elle**
toplanıyor — unutulan bir bölüm sessizce kırılımın dışında kalır ve kimse fark
etmez. Okuma ile dinleme iki tarafta da bölüm kimliğini değişkenden alıyor
(`section: id` / `section: kind`), kapı o deseni tanıyor.

### 11.124 Sınav kapağı: geçme eşiği hiçbir yerde yazmıyordu

Geri dönüş olmadığı, ipucu bulunmadığı, cevapların sınav bitmeden
gösterilmediği ve **geçme eşiği** (toplam %70, her bölüm %50) mobilde hiçbir
yerde yazmıyordu: öğrenci **neyi başarması gerektiğini bilmeden** sınava
giriyordu. Odak listesinin başlığı da yoktu — madde madde Almanca/Türkçe
çiftler, ne oldukları söylenmeden duruyordu.

**Ölçüldü, ayrışma değil:** webin kapağı bölüm listesini göstermiyor çünkü
kâğıt o aşamada henüz çekilmemiş (`start` çekiyor) — aynı bilgiyi kural satırı
veriyor ("Yedi bölüm, 45 dakika"). Yeniden yapılandırmaya değer bir açık değil.

### 11.125 Sonucun anlamı puan değil, kazanılan iş

Kâğıdın kapağı **`canDo`** listesini taşıyor (`lib/exam`) ve mobil `cover`
tipi alanı **sessizce düşürüyordu**: "artık şunları yapabiliyorsun" listesi
mobilde hiç görünmüyordu. Sertifika ucunun kendi yorumu da aynı şeyi söylüyor:
*"%78 bir hafta sonra hiçbir şey ifade etmiyor"* — sonucun anlamı puan değil,
kazanılan iş.

Bölüm satırı artık **ağırlığı** ve kendi çubuğunu da yazıyor: geçme kuralı
"her bölüm ≥ %50" diyor ama toplamı hangi bölümün taşıdığı ağırlıktan
okunuyor, ve alan sunucudan zaten geliyordu.

§11.122 ile aynı kalıbın üçüncü örneği: **sunucu gönderiyor, mobil tipi
düşürüyor, yüzey hiç bilmiyor.** Parity 58'in düşen-alan listesi bu yüzden
sonuç tipinde tutuluyor — ama kapak tipinde henüz böyle bir kapı yok.

### 11.126 Sözlük kopyaları geri geldi — ve neden geri geldiği

§11.102'de silinen dokuz `prog.*`/`progw.*` anahtarı, paralel bir oturum
tarafından **geri kondu** (9bcc0256): silinmelerini kazara sanmış, çünkü bu
depoda commit'ler ayrı bir `GIT_INDEX_FILE` ile kuruluyor ve commit edilen
içerik çalışma ağacına yansımıyor. Teşhis ettiği tehlike gerçek; ama o
commit'in sebebi o değildi — silme bilinçliydi.

Ölçüldü: dokuzunun da kodda **sıfır kullanımı** var (web `progress-view`
mobil kaynaklı `progress.*` anahtarlarını kullanıyor). Yani geri konan
anahtarlar ölü. İkinci kez silindi, commit mesajı sebebi yazıyor.

**Açık kalan kapı:** `i18n-check` "çağrılan ama sözlükte yok"u yakalıyor,
tersini — **sözlükte var ama hiç çağrılmıyor** — yakalamıyor. Bu olay tam da o
boşluktan geçti. Ölçüldü: düz metinle çağrılmayan 522 web anahtarı var ve
büyük çoğunluğu dinamik aile (`ach.*` rozet kimliğinden kuruluyor), yani
kuralın kendisi dikkatli kurulmalı — gürültülü bir kapı §11.109'un dersine
göre bulguyu gizler. Sıradaki turun ilk işi.

### 11.127 Ölü sözlük anahtarı kapısı

§11.126'nın açık bıraktığı iş. `i18n-check` "kodda çağrıldı, sözlükte yok"u
yakalıyordu; **tersini** — sözlükte durup hiç çağrılmayanı — kimse görmüyordu
ve olay tam o boşluktan geçti.

Kuralın şekli ölçümle bulundu, tahminle değil:

- `t()` çağrılarına bakan bir arama **522 anahtarı** ölü sayıyordu. Sebep:
  anahtarların çoğu bir tabloda duruyor (`titleKey: "ach.streak3.title"`) ve
  sonra çözülüyor — yüz sekiz rozet anahtarı dahil. Böyle bir kapı §11.109'un
  dersine göre yalnızca gürültü üretip gerçek bulguyu gizlerdi.
- **Düz metin** araması (anahtar adı kaynakta herhangi bir yerde geçiyor mu)
  on altı aday bıraktı. Dördü çalışma anında kuruluyor ve dosyada tam adıyla
  hiç geçmiyor: `band.*` (`lib/proficiency`: `` `band.${band}` ``) ve
  `push.rem_*_named` (`lib/push`: `` `${base}_named` ``). İkisi de kaynağıyla
  birlikte muaf yazıldı.

Kalan beş ölü anahtar silindi — ve biri **gerçek bir eksiği gösteriyordu**:
`lb.this_week` ölü duruyordu çünkü sıralama sayfasının alt başlığı hiç
yazılmamıştı; Android hangi haftaya bakıldığını başlığın altında söylüyor.
Ölü anahtar, yazılmamış yüzeyin izi çıktı.

### 11.128 Sözlük gölgelemesi: aynı anahtar iki platformda iki cümle

Sözlük `{ ...base, ...web }` diye kuruluyor. Aynı anahtar iki yerde tanımlıysa
**web kazanıyor** ve base'deki (mobil kaynaklı) metin sessizce gölgeleniyor:
aynı anahtar webde bir cümle, Android'de başka bir cümle gösteriyor ve hiçbir
denetim bunu söylemiyordu. §11.102'den beri süren kopya temizliğinin altında
duran asıl mekanizma buydu.

Ölçüldü: **yirmi sekiz** anahtar iki yerde birden tanımlıydı, **dördünün metni
farklıydı**. Üçü sözcük farkıydı (web kopyası silindi, Android referans).
Dördüncüsü gerçekten platforma özel: webde yapay zekâ hakkı dolunca kural
tabanlı yedek gösteriliyor (`fallbackAssessment`), mobilde puan hiç verilmiyor
— iki metin de kendi platformunda doğru. Ona **web'e özel bir ad** verildi
(`assessw.fail_quota`); fark artık görünür, gölgeleme yok.

Kapı **kopyaya** bakıyor, değere değil: aynı metni iki yere yazmak bugün
zararsız görünse de yarın birini düzeltip ötekini unutmanın yolu. Web'e özel
bir metin gerekiyorsa web'e özel bir ad alır.

### 11.129 Yürüyüş modunun iki sözlüğü — ölçüldü, ayrışma değil

`walkmode.*` (mobil) ile `walk.*` (web) ilk bakışta aynı ekranın iki kopyası
gibi duruyor. Ölçüldü: **rol bölünmesi**, kopya değil — `walk.*` iki platformun
paylaştığı **seslendirme** satırları (base'de), `walkmode.*` mobilin **ekran**
etiketleri. Mobil `walk.correct_is`, `walk.not_heard`, `walk.mic_silent`
anahtarlarını `tx()` ile zaten kullanıyor.

Davranış da eşleşiyor: duyulmayan tur iki tarafta da yanlış sayılmıyor ve
SRS'e yazılmıyor (`UNHEARD_IS_NOT_WRONG` / mobilin aynı dallanması), teslim
("bilmiyorum") ceza almıyor, ikisi de doğrusunu okuyup devam ediyor. Kayda
geçiyor ki bir sonraki tur aynı yeri tekrar ölçmesin.

### 11.130 Günün turu: boş havuz "oynadın" diye okunuyordu

Tur kurulamadığında (seviyedeki kelime havuzu yetmiyor) mobil ekran doğrudan
`done`a düşüyordu: kullanıcıya **0/0 puanla** "bugünkü turun bitti" deniyordu —
oynamadığı bir turdan sıfır aldığını sanıyor. Sebep ayrı ve söylenebilir; web
bunu ayrı bir durum olarak taşıyor (`status === "empty"`). §11.86'nın "yanlış
teşhis" sınıfı.

Sonuç ekranı artık sıralamadaki **yerini** de söylüyor (tablo altta ama
"kaçıncıyım" satır satır aranmamalı) ve **neden tekrar oynanamadığını**
yazıyor. İkisi de webde vardı.

Puan iki yerde `toLocaleString("tr-TR")` ile yazılıyordu: bin ayracı İngilizce
ve Almanca arayüzde de Türkçe kuruluyordu. §11.109'un aynı hatası, bu kez
sayıda — **parity 51** artık bu deseni de arıyor (yönetim panosu dışarıda:
orası yalnız Türkçe ve kullanıcıya açık değil).

**Ölçüldü, ayrışma değil:** `LearnScreen` ↔ `learn-hub` eşleşiyor; tek fark
"hayatta kalma" modu ve o zaten web'e özel olarak yazılı (`learn/challenge`
sayfası ve `pushRoute` yorumu). Tekrar ölçülmesin diye kayda geçti.

### 11.131 Haftalık sınav kurallar sorulmadan başlıyordu

Mobil doğrudan ilk soruya giriyordu. Söylenmeyenler: **yalnız yazarak, ipucu
yok, tek hak** ve — en önemlisi — **yanlış bilinen kelimenin tekrar kuyruğuna
döneceği**. Sınav bir ölçüm ve ölçümün kuralı önceden bilinmeli; §11.124'ün
aynı dersi, bu kez haftalık sınavda. Web bir tanıtım adımı gösteriyordu.

Sınav kurulamadığında sonuç ekranı **%0'lık bir halka** çiziyordu: "şu an sınav
yok" başlığının üstünde sıfır puan, oynanmamış bir sınavdan kalınmış gibi
okunuyordu — §11.130'un aynı hatası (boş havuz "oynadın" diye okunuyor), bu kez
görsel olarak.

Pratik ekranı da ne olduğunu söylemiyordu: turun kendi kelimelerinden
kurulduğu, oyun türünün sabit kaldığı ve pratiğin **kaldığı yerden sürmediği**
yalnız webdeydi. Üçü de mobilde uygulanan davranış — `GameScreen`in yükleme
yorumu bunu ayrıntısıyla anlatıyor, ekran kullanıcıya hiç söylemiyordu.

### 11.132 İlk kurulumda seviye seçeneğinin ne demek olduğu yazmıyordu

Seçici yalnız **"A1 A2 B1 B2 C1"** yazıyordu: kullanıcıdan seviyesini seçmesi
isteniyor ama seçebileceği bir şey verilmiyordu. Web her seçenek için bir
cümlelik karşılık gösteriyor ("Temel günlük dili biliyorum", "Kendimi genel
konularda ifade ederim" …) ve bu, kararın verildiği tek yer — yanlış seçilen
seviye bütün müfredatı kaydırıyor.

**Yöntem notu:** bu turda üç karşılaştırma (`BossScreen`/`boss-player`,
`ProfileScreen`/`profile-view`, `AvatarScreen`/`avatar-editor`) önce "eksik
anahtar" gibi göründü, üçü de yanlış alarmdı: anahtarlar üçnokta içinde
kullanılıyordu (`t(x ? "a" : "b")`) ve `t("…")` deseni onları görmüyor. Anahtar
kıyaslamasının bilinen kör noktası — dosyadaki tüm `"ns.key"` dizgilerini almak
doğru yöntem (ölü anahtar kapısında kullanılan yaklaşımın aynısı).

### 11.133 Düğmede "fp.see_meaning" yazıyordu

`translate` bulamadığı anahtarı **olduğu gibi döndürüyor** (`?? key`). İlk
pratik ekranının **birincil düğmesi** üç anahtarı üçnokta içinde çağırıyordu ve
üçü de hiçbir sözlükte yoktu: kullanıcı kayıt yolunun ortasında sırayla
`fp.see_meaning`, `fp.next_word`, `fp.create_account` yazan bir düğme
görüyordu. Karşılıkları mobil sözlükte hazırdı (`firstpractice.*`).

Kapı görmedi çünkü `i18n-check` anahtarı `t(`in **hemen ardında** arıyordu ve
`t(x ? "a.b" : "c.d")` biçimini hiç görmüyordu — §11.132'de kendi ölçüm
yöntemimde fark ettiğim kör noktanın **denetimin kendisinde** de bulunması.

Tarayıcı artık çağrı gövdesindeki bütün düz anahtarları alıyor ve açılır
açılmaz **aynı hatanın üç örneğini daha** buldu: can-do kartının durum ipucu
(`cando.proven` / `cando.progressing` / `cando.not_yet`) da hiçbir sözlükte
yoktu ve ipucunda ham anahtar yazıyordu. Üç anahtar eklendi; mobil aynı bilgiyi
ekran okuyucuya veriyor — dairenin rengi göreni bilgilendiriyordu, okuyucuya
hiçbir şey söylenmiyordu.

Kalıp üçüncü kez aynı: **kapının görmediği yer, hatanın biriktiği yer.**

### 11.134 Aynı hata mobilde: sözlükte olmayan anahtar, ve üçü benim

§11.133'ün kapısı webi kapattı. Mobilde **aynı denetim hiç yoktu** — `t()` de
bulamadığını olduğu gibi döndürüyor, yani yanlış yazılan bir anahtar ekranda
ham hâliyle yazıyor ve hiçbir şey itiraz etmiyor.

Kapıyı kurunca dört kaçak çıktı ve **üçü bu oturumda benim**: §11.123'te
`exam.pronunciation`, §11.131'de `plan.weekly_short` / `plan.weekly_exam`. Web
yüzeyini mobile taşırken anahtarların **mobil sözlükte olduğunu doğrulamadım**;
üçü de web-özel anahtardı. Dördüncüsü `lib/i18n.ts`in örnek yorumundaki eski
ad (`home.greeting`).

Üçü mobil sözlüğe eklendi — ve bu sefer **gölgeleme kapısı** (§11.128) hemen
itiraz etti: aynı anahtar artık hem base hem web'de duruyordu. Web kopyaları
silindi. İki kapı arka arkaya kendi işini yaptı.

**Ders:** bir yüzeyi karşı platforma taşırken metnin *varlığı* kadar
*bulunduğu sözlük* de kontrol edilmeli. Bu turdan sonra o kontrol elle değil,
kapıda.

### 11.135 Zayıf noktalar kartı mobilde hiç yoktu

Uç (`/api/errors`) ve rapor katmanı (`lib/error-analytics`) aylardır duruyor,
web profilinde bir kart onu okuyor — **Android'de onu çağıran hiçbir şey
yoktu**. Yani "neyi yanlış yapıyorum" sorusunun cevabı tek platformdaydı.
§11.80'in en pahalı örneklerinden biri: sözleşme uçtan uca yazılı, yüzey hiç
yazılmamış.

Üstelik **kendi eklemem bir çıkmaz yaratmıştı**: §11.122'de sınav sonucuna
taşıdığım ipucu "zayıf bölüm için profilde 'Zayıf noktaların' var" diyor ve
mobilde **olmayan** bir yeri gösteriyordu.

**Bulma yöntemi yeni ve tekrarlanabilir:** sunucunun uçlarından hangilerini
webin çağırıp mobilin çağırmadığını ölçtüm. Dokuz çıktı, yedisi meşru —
yönetim panosu (2), cron, mağaza webhook'u, tarayıcı push'u (mobil FCM
kullanıyor, ayrı uç), webe özel hayatta kalma modu. Kalan ikisi:
`/api/errors` (bu bölüm) ve `/api/assess/queue` (§11.12'de Samet'in kararı
bekliyor). `check-endpoints` "her ucun bir çağıranı var mı" diye soruyor; bu
ölçüm onun parite hâli — **"her ucun İKİ çağıranı var mı"**.

### 11.136 "Her ucun İKİ çağıranı var mı" — kapı ve iki yeni bulgu

§11.135'in elle yaptığım ölçümü kalıcı bir kapıya çevrildi. `check-endpoints`
"her ucun **bir** çağıranı var mı" diye soruyordu; parite hâli eksikti: bir uç
yalnız webden çağrılıyorsa ya bunun bir sebebi vardır ya da **Android'de o
yüzey hiç yok** — ve ikincisi sessizce oluyor.

Kapı kurulunca elle ölçümün **kaçırdığı iki uç** daha çıktı:

- **`/api/premium/referral`** — meşru: mobil aynı kodu `premium/status`
  içinden alıyor. Elle ölçümde "mobil kaynakta geçiyor" diye elenmişti, oysa
  yalnız bir **yorumda** geçiyordu. (Yorum çağıran değildir — betiğin kendisi
  bunu baştan beri biliyor, benim ad-hoc ölçümüm bilmiyordu.)
- **`/api/pronounce`** — meşru değil: web konuşma puanını sunucudan alıyor
  (gerçek telaffuz değerlendirmesi, `lib/pronounce-client`), mobil aynı puanı
  **cihazdaki tanıyıcının metnini eşleyerek** üretiyor (`spokenMatches`). Yani
  seviye sınavının konuşma bölümü iki platformda **başka bir şey ölçüyor**:
  webde söyleyiş, Android'de "doğru kelimeleri söyledi mi". Aynı kâğıt, aynı
  puan alanı, farklı ölçüm.

**Kayıtlı ve sıradaki iş:**
- `/api/growth` — gelişim paneli (yetkinlik + dört haftalık değişim, kanıt
  sayısı, sıradaki adım, kilometre taşları, sekiz haftalık seri, haftalık
  özet). Mobilde hiç yok. Web tarafı 250 satır ve grafik içeriyor; bir turda
  yapılacak iş değil, bölünerek taşınacak.
- `/api/pronounce` — mobil ses klibini sunucuya yükleyip puanı oradan almalı;
  altyapı var (`azureListenOnce`, `speakServerTts`, `/api/stt` yolu).

### 11.137 Gelişim paneli mobilde: ilk parça

§11.136'da kayda geçen açığın ölçüm yüzü taşındı: seviye + kanıt sayısı,
haftalık özet cümlesi, altı beceride yeterlik (şimdi, dört hafta öncesine göre
değişim, bant) ve **önerilen sıradaki adım**. Sekiz haftalık seri grafikleri
ile kilometre taşları ayrı bir turda — webde de kapalı bir ayrıntı bölümünde
duruyorlar, yani sıra doğru.

**Yeni bir sessiz kayıp yolu kapandı.** Önerilen adım sunucudan bir **web
adresiyle** geliyor (`nextStep.href`: `/learn/game`, `/immersion`,
`/immersion/skill/<id>`, `/lessons/<id>`) ve mobil onu ekrana çevirmek
zorunda. Eşleyici `routeFromHref` olarak `pushRoute`un yanına kondu — o
**bildirim** adreslerini çeviriyor, bu **yanıt gövdesindekileri**; ikisi ayrı
küme, aynı dosyada. Tanınmayan adres `null` dönüyor ve düğme hiç çizilmiyor,
yani kapı olmasa sunucunun ekleyeceği yeni bir biçim Android'de öneriyi
**sessizce yok ederdi**. **Parity 61** dört biçimi eşliyor.

**İki kapı kendi işini yaptı:** uç artık mobilde de çağrıldığı için
`check-endpoints` onu `WEB_ONLY` listesinden düşürmemi istedi; gölgeleme kapısı
(§11.128) da yeni eklenen altı anahtarın web kopyasını. İkisi de doğru
zamanda, doğru şeyi söyledi.

### 11.138 Gelişim panelinin ikinci parçası — ve kapının kendi yanlış pozitifi

Sekiz haftalık seri ile kilometre taşları taşındı; panel tamamlandı. Ayrıntı
kapalı geliyor (web de öyle): yukarıdaki çubuklar "neredeyim" sorusuna zaten
cevap veriyor.

Çizgi web `Spark` ile aynı geometride ve **parity 62** dört ölçüyü eşliyor —
en önemlisi **ölçülmemiş haftanın çizgiyi kesmesi**: boşluğu sıfır saymak,
ölçüm yapılmamış bir haftayı "puanın dibe vurdu" diye çizerdi.

**Kapının ilk hâli yanlış pozitif verdi:** kesmeyi ararken webin biçimini
(`if (!c)`) değil mobilinkini (`if (v === null)`) tanıyordu. İkisi de aynı
şeyi yapıyor — çizgiyi koparıyor — ve desen artık ona bakıyor. §11.104'ün
kuralı kapının kendisine de uygulanıyor: **yanlış pozitif iş çıkarmıyor,
gerçek ayrışmayı gizliyor.**

**Bu turda görülen, bana ait olmayan kırmızı kapı:** `check-endpoints --check`
`/api/turnstile` için kalıyor — çağıranı yok ve `ALLOW`da yazılı değil. Uç
başka bir oturumun commit'iyle geldi (127ade48, "Apple ile Giriş webde") ve
o işin ortasında; benim değişikliklerim hiçbir uç dosyasına dokunmadı. Karar
o oturumun: ya bir istemciye bağlanacak ya sebebiyle listeye yazılacak.

### 11.139 KARAR BEKLİYOR — konuşma puanı iki platformda başka şey ölçüyor

§11.136'da bulunan ayrışmanın ölçümü. Seviye sınavının konuşma bölümünde:

- **Web** klibi kaydedip `/api/pronounce`a gönderiyor: gerçek **söyleyiş**
  değerlendirmesi (sağlayıcıdan, kelime zamanlamasıyla). Ağ ya da sağlayıcı
  yoksa madde **0 sayılıyor** — iki denemede de sürerse sınav durmuyor ama
  puan gitmiş oluyor.
- **Mobil** cihazdaki tanıyıcının **metnini** `spokenMatches` ile eşliyor:
  "doğru kelimeleri söyledi mi". Çevrimdışı da çalışıyor, ücretsiz, ama
  söyleyişi hiç ölçmüyor.

Aynı kâğıt, aynı `speakingScore` alanı, **farklı ölçüm**.

**Altyapı hazır:** mobil zaten ham 16 kHz mono WAV kaydediyor
(`Native.startRecording`/`stopRecording`) ve yükleme yolu var; ekran AÇIK
olduğu için RN `fetch` + `FormData` yeterli (native yükleyici yalnız
ekran-kapalı yürüyüş modu için gerekliydi). Yani "evet" denirse iş küçük.

**Ama bu mekanik bir parite düzeltmesi değil, ürün kararı:**
1. Mikrofon aynı anda ya tanıyıcıya ya kaydediciye verilebiliyor — ikisi
   birden olmaz. Yani seçim "ya söyleyiş ölçülür ya çevrimdışı çalışır".
2. Sağlayıcı **paralı** ve klip başına ücretli; sınavın konuşma bölümü her
   maddede bir klip demek.
3. Webin bugünkü davranışı (ağ yoksa 0) mobil için kabul edilebilir mi ayrı
   bir soru — Android kullanıcısı sınava metroda giriyor olabilir.

**Samet'in kararı.** Karar "evet" ise mobil web ile aynı yola geçer; "hayır"
ise webin de mobil gibi bir yedeği olmalı (ağ yokken 0 yerine metin eşlemesi),
çünkü şu hâliyle aynı sınav iki platformda iki farklı şeyi ölçüyor ve bunu
kullanıcıya söyleyen bir yer yok.

**Yarısı kapandı (bkz. §11.169).** "Kullanıcıya söyleyen bir yer yok" kısmı
düzeldi: mobil sonuçta ne ölçtüğünü artık yazıyor (kelime eşlemesi, söyleyiş
değil). Webin arıza yolu zaten söylüyordu (`exam.audio_failed_retry/skip` +
yerinde tekrar). Karar bekleyen tek şey ÖLÇÜMÜN KENDİSİ.

### 11.140 Yüzde biçimi Türkçe yazımı koda gömüyordu

On üç yerde puan `%{n}` diye yazılıyordu — Türkçe yazım ("%62") koda gömülü,
oysa İngilizce arayüzde "62%", Almancada "62 %" olmalı. Yerler puanın
gösterildiği yerler: sınav sonucu, deneme sınavı istatistikleri, haftalık
sınav, ders sonu, beceri kütüphanesi.

Araç ikisinde de zaten vardı (`formatPercent` / `t("common.pct")`) ve ikisi de
yereli çalışma anında soruyor. **Parity 51** artık bu deseni de arıyor.

Bu, aynı sınıfın üçüncü örneği: §11.109 harf çevirisi, §11.130 sayı ayracı,
§11.140 yüzde. Ortak sebep: **yerel bir biçim kararı, koda sabit yazıldığında
sessizce yanlış dile taşınıyor** — ve üçü de ancak aranınca görünüyor, çünkü
Türkçe arayüzde hepsi doğru görünüyor.

### 11.141 Derste eller serbest mobilde hiç yoktu

Web derste kalıcı bir anahtar tutuyor (`lessonp.hands_free`) ve **varsayılan
açık**: açıkken öğretmen cümlesini bitirir bitirmez dinleme kendiliğinden
başlıyor. Mobilde hiç yoktu — her tekrar ve üretim adımında ekrana dokunmak
gerekiyordu.

Farkın telefonda webdekinden **büyük** olması gerekirdi: cihaz masaya dayalıyken
her tur için ekrana uzanmak, konuşma dersinin ritmini kesen tek şey.

**Sıralama, yürüyüş modunun kanıtlanmış kalıbı:** önce `speakAndWaitVoiced`,
sonra dinle. `speakTarget` bitişi bildirmiyor; onunla kurulsaydı mikrofon
öğretmenin sesinin üstüne açılırdı — sessiz ama kesin bir bozukluk. Anahtar
kapalıyken eski yol (fire-and-forget) korunuyor, yani hiçbir şey yavaşlamıyor.

**Cihazda doğrulanmadı:** ses zamanlaması bu ortamda çalıştırılamıyor. Kod
yolu, aynı depoda çalışan ve sahada denenmiş yürüyüş modu sıralamasının
aynısı; yine de ilk gerçek cihaz denemesinde bakılacak yer burası.

### 11.142 Ders özeti: kelimeler ve düzeltmeler toplu

**Dersin kelimeleri** kâğıtta zaten vardı (`lesson.vocab`) ve mobil özet onu
hiç göstermiyordu — dersin dili kapanışta toplu görünmeli. §11.80 sınıfı.

**Düzeltmeler** konuşma sırasında her balonun altında tek tek geçiyor ve akışta
kayboluyordu; kapanışta hepsi bir arada durmalı — dersin öğrettiği şey tam
olarak bunlar. Aynı kural ve aynı ayrıştırıcı (`parseReply`) iki tarafta.

**Ölçüldü, taşınmadı — sıradaki iş:** web özeti dersin **ne zaman geri
geleceğini** de yazıyor (`lessonp.next_in_days`, aralıklı tekrar merdiveni).
O sayı kaydetme yanıtından geliyor; mobil ilerlemeyi yalnız cihazda tutuyor
(`markItemDone` → AsyncStorage) ve sunucu yanıtını hiç görmüyor. Yani mobil
ders ilerlemesi **sunucuya yazılmıyor** — bu tek başına ayrı bir soru:
kullanıcı cihaz değiştirdiğinde ders ilerlemesi gidiyor mu? Bir sonraki tur
bunu ölçecek.

### 11.143 DÜZELTME — mobil ders ilerlemesi sunucuya yazılıyor

§11.142'nin sonunda "mobil ders ilerlemesi sunucuya yazılmıyor gibi görünüyor,
cihaz değişince gidiyor mu?" diye bir endişe yazmıştım. **Ölçüldü: yanlış.**
`LessonScreen` ders bitince `/api/lesson`a POST ediyor; yerel AsyncStorage seti
yalnızca Patika ekranının önbelleği ve `lessonProgress.ts`in kendi başlığı da
bunu söylüyor. Ucun kendi yorumu da açık: *"telefonda bitirilen ders
bilgisayarda da bitmiş sayılmalı."* Cihaz değiştiren kullanıcı ilerlemesini
kaybetmiyor.

Gerçek eksik daha küçüktü ve şimdi kapandı: **yanıt hiç okunmuyordu**. Uç
`passed`, `nextDays`, `xpGained`, `currentStreak`, `totalXp` döndürüyor; mobil
çağrıyı yapıp gövdeyi atıyordu, bu yüzden dersin **ne zaman geri geleceği**
(aralıklı tekrar merdiveni) hiçbir yerde yazmıyordu.

**Yöntem notu:** "yazılmıyor gibi görünüyor" ile "yazılmıyor" arasındaki fark,
bir `grep` kadar uzaktaydı. Bir sonraki tura devredilen her şüphe, devredilirken
şüphe olarak işaretlenmeli — burada öyle yapılmıştı ve düzeltme ucuz oldu; ölçüm
yapılmadan defterde "bulgu" diye dursaydı yanlış bir iş sırası doğururdu.

### 11.144 Beceri ilerlemesi cihaza hapsolmuştu

§11.143'ün tersi: derste sunucu kaynaktı, **beceri egzersizlerinde değildi**.
Mobilin "bitti" kümesi yalnız **o cihazda** bitirilenleri biliyordu. Sonucu:

- Webde çalışan kullanıcı Android'i açınca liste **hiç dokunulmamış** görünüyor.
- "Sıradaki egzersiz" önerisi baştan başlıyor — yani öneri de yanlış.
- Yeni cihaz / yeniden kurulum aynı sonuç.

Sunucu durumu (`GET /api/skills`) aylardır duruyor ve mobilde onu okuyan hiçbir
şey yoktu (web `syncSkillProgress` ile okuyor). Birleştirme tek yönlü değil:
sunucudan gelenler yerele ekleniyor, yerelde olup sunucuda olmayanlar
(çevrimdışı bitirilmiş) korunuyor. Önce yerel çiziliyor, sonra sunucu — liste
beklemiyor. Puan rozeti de eklendi: "bitti" ile "iyi bitti" aynı şey değil.

**Kapının kör noktası — kayda geçsin:** §11.136'da kurduğum "web çağırıyor,
mobil çağırmıyor" kuralı bunu **görmedi**, çünkü mobil aynı yolu POST için
zaten anıyordu. Kural **yolu** eşliyor, **yöntemi** değil. Aynı ucun bir
yönteminin tek platformda kalması, ucun tamamen tek platformda kalması kadar
sessiz. Yöntem ayrımını da ölçmek gerekiyor — bir sonraki turun işi.

### 11.145 Kendi yazısını silmenin yolu yoktu — ve kapı yöntem düzeyine indi

Uç (`DELETE /api/assessments?id=`) aylardır duruyor ve web kartı onu
kullanıyordu; mobilde **kendi yazısını silmenin hiçbir yolu yoktu**. Kendi
ürettiği içeriği kaldıramamak, kullanıcının kendi verisi üzerindeki en temel
denetimi eksik bırakıyor. Onay isteniyor (geri alınamaz), satır önce gidiyor
sunucu sonra — kullanıcı beklemiyor.

**§11.144'ün dersi kapıya yazıldı:** `check-endpoints` artık **yöntem
düzeyinde** de bakıyor. Aynı ucun bir yönteminin tek platformda kalması, ucun
tamamen tek platformda kalması kadar sessiz — `GET /api/skills` tam olarak
böyle kaçmıştı. Yeni kural bu silme eksiğini **kendiliğinden buldu**.

Çağrı yerindeki yöntem `method:` alanından okunuyor, yoksa GET. **İlk ölçümüm
yanlıştı:** pencere sabit 240 karakterdi ve komşu iki çağrı (önce GET, sonra
POST) aynı pencereye girip birbirinin yöntemini gölgeliyordu — üç yanlış
pozitif. Pencere artık çağrı ifadesinin sonunda kesiliyor.

`WEB_ONLY_METHOD` listesindeki her satır sebebiyle yazılı; ikisi kayıtlı karar
(`POST /api/pronounce` §11.139, `POST /api/assess/queue` §11.12), biri gerçek
bir teknik kısıt (`POST /api/stt` mobilde **native** çağrılıyor, JS kaynağında
görünmez).

**Yan etki, kayda geçsin:** üçnokta genişlemesinden sonra `i18n-check`,
`native-de.ts`teki **yerel bir `t` yardımcısını** çevirmen sandı
(`t("vocab.tr", v.tr)` bir alan adı). Dosya düzeyinde, gerekçeli muafiyet
yazıldı; asıl çözüm o yardımcının adını çevirmenden ayırmak — dosya başka bir
oturumun elinde.

### 11.146 Çevrimdışı bitirilen egzersiz sunucuya hiç ulaşmıyordu

§11.145'in yöntem listesini tek tek doğrularken çıktı. Egzersiz bitince sonuç
sunucuya yazılıyor, ama **ağ yoksa o istek düşüyor ve bir daha denenmiyordu**:
yerel işaret duruyor, sunucu o egzersizi hiç öğrenmiyor. Kullanıcı metroda
çalıştığı egzersizi cihaz değiştirince kaybediyordu — §11.144'ün kalan yarısı.

Sonuç artık kuyruğa alınıyor (`correct`/`total` ile — `PUT /api/skills` bunları
istiyor, yalnız puan yetmiyor) ve bir sonraki senkronda taşınıyor. Uç
idempotent, yeniden gönderim zararsız.

**Aynı uç, iki farklı sebeple:** web onu kendi `localStorage` geçmişini bir
kereliğine taşımak için kullanıyordu; mobilde taşınacak şey çevrimdışı
bitirilmiş egzersizler çıktı. `WEB_ONLY_METHOD` listesindeki "mobilde taşınacak
eski kayıt yok" satırı böylece yanlışa düştü — ve **kapı bunu kendisi söyledi**
("listede olup artık mobilde de çağrılan yöntem"). Listenin yalnız kısalabilir
olması tam da bu yüzden: her satır bir iddiadır ve iddia eskiyebilir.

**Ölçüldü, ayrışma değil:** `POST /api/session` (tur ortası ilerleme damgası)
mobilde gereksiz. Mobil ilerlemeyi cevaplarla birlikte `/api/answers`a yazıyor;
cevap yoksa saklanacak ilerleme de yok — `GameScreen`de tur ortası flush yok,
`answers` yalnızca yüklemede sıfırlanıyor. Web'in ayrı damgası kendi
toplu-gönderim modelinin gereği.


### 11.147 Çevrimdışı biten TUR da kaybolmuyor: cihazda kuyruk

§11.146 egzersizi kurtardı; aynı soruyu günün turu için sorunca daha büyük
bir kayıp çıktı. `GameScreen.finish()` yazma hatasını **boş bir catch ile**
yutuyordu ("ölçüm/yazma sessizce düşer"): tur boyunca verilen cevaplar, SRS
güncellemesi, XP ve seri sunucuya hiç ulaşmıyordu ve kullanıcıya bir şey de
söylenmiyordu — ekranda puan artıyor, sunucuda hiçbir şey değişmiyor.
`BossScreen` turu düşürüyordu, `WalkModeScreen` yalnız BELLEKTE tutuyordu
(uygulama kapanınca gidiyor).

Web bu noktada dikkatli: batch kuyruğa geri konuyor, `saveWarning` ile
kullanıcıya söyleniyor, 4xx bilerek düşürülüyor, `pagehide`da `sendBeacon`
gidiyor. Yani bu, mobilin webden geri kaldığı bir yerdi.

**Kuyruk `submitAnswers` içinde**, yani üç çağıranın üçüne birden hizmet
ediyor. Üç karar:

- **Batch kendi `day`ini taşıyor.** Seri kullanıcının O gününe ait; ertesi
  gün gönderilen turu bugüne yazmak seriyi yanlış hesaplardı.
- **Kalıcı hata kuyruğa girmiyor.** Sunucunun asla kabul etmeyeceği bir
  gövde, kuyruktaki her turu da batırırdı (web aynı ayrımı yapıyor).
- **401/403 kalıcı SAYILMIYOR.** İlk yazımda "4xx = kalıcı" demiştim; oturum
  düşmüşken atılan turu silmek, tam da korumaya çalıştığım veriyi atardı.
  Kullanıcı yeniden girince gidiyor.

**Çift gönderim tuzağı:** `WalkModeScreen` başarısız batch'i belleğe geri
koyuyordu. Kuyruk gelince ikisi birden çalışıp aynı cevapları İKİ KEZ
gönderecekti — SRS ve XP çift sayardı. Bellekteki geri koyma kaldırıldı;
kuyruk tek sahip.

**Sessiz kalan ekran da düzeldi:** özet artık iki durumu ayırıyor — kuyruğa
alındı (bağlantı dönünce gider) ve sunucu reddetti (gitmeyecek). İki metin
webde vardı, ortak sözlüğe taşındı.

**Yanında çıkan ikinci hata:** sınav sonucu gönderilemediğinde ekran
"Sonuç gönderilemedi" derken başlıkta **%0** yazıyordu (`result?.total ?? 0`)
— yirmi dakika sınav çözen öğrenci sıfır görüyordu. Puan zaten istemcide
toplanmış durumda; artık yüzde ve bölüm kırılımı çiziliyor. Geçti/kaldı
YAZILMIYOR: o karar sunucunun, eşik istemcide yok. Web'in yorumu "Android de
tam bunu yapıyor" diyordu — **yapmıyordu**; kapıyı yazarken karşılaştırma
yerine yoruma güvenmenin bedeli bu.

**Kapılar:** parity §63 (tur kaydı uyarıları: iki metin iki tarafta da var mı)
ve §64 (sınav çevrimdışı sonucu: yerel yüzde, bölüm kırılımı, metin, ve
geçti/kaldı YAZILMAMASI). İkisi de hatayı enjekte ederek sınandı, ikisi de
yakaladı. Ayrıca beş jest testi: kuyruğa alma, 400'ün girmemesi, 401'in
silmemesi, bağlantı dönünce boşalma, başarılı gönderimde bekleyenlerin de
gitmesi. Testlerin sebebi: buradaki hata SESSİZ — ne derleme ne gözle bakma
gösterir.

**Başka oturumun açık işi:** `autherrorw.invalid_code` şu an ölü anahtar
(iki adımlı doğrulama paketi yazılıyor, henüz bağlanmadı). Bana ait değil,
dokunulmadı.


### 11.148 Aynı sınıf hatanın kalan iki yeri: ders ve haftalık sınav

§11.147'nin sorusunu iki uca daha sordum. İkisi de aynı biçimde kaybediyordu.

**Ders (`/api/lesson`) — iki tarafta da.** Ders bitince sonuç yazılıyor, ağ
yoksa istek düşüyor ve bir daha denenmiyordu. Yerel işaret (`markItemDone`)
Patika'yı bitmiş gösterdiği için hata GÖRÜNMÜYOR: kullanıcı dersi bitmiş
sanıyor, sunucu onu hiç öğrenmiyor — XP verilmiyor, aralıklı tekrar merdiveni
kurulmuyor, cihaz değişince ders geri geliyor. Kayıt artık kendi günüyle
kuyruğa alınıyor; iki kuyruk ayrı teknolojide (AsyncStorage / localStorage)
ama aynı sözleşmeyi tutuyor ve §66 bunu ölçüyor: aynı depolama anahtarı, kendi
`day`i, ders başına tek kayıt, 4xx kuyruğa girmiyor, biri düşünce kalanı
kuyrukta kalıyor.

**Yanında çıkan web hatası:** web `/api/lesson`a `day` ve `seconds`i **hiç
göndermiyordu**. Yani her ders sunucuda sıfır saniye görünüyor, ve gece
yarısından sonra bitirilen ders kullanıcının değil SUNUCUNUN gününe (UTC)
yazılıyordu — seri yanlış güne düşüyor. Mobil ikisini de baştan beri
gönderiyor. Bunu kuyruğun gövdesini eşlerken kapının kendisi söyledi
("yalnız mobil: day, seconds").

**Haftalık sınav.** Haftada tek hak var. Sonuç yazılamayınca web hata kartına
düşüp puanı ekrandan siliyordu (on dakikalık sınav yok oluyor); mobil puanı
gösteriyor ama **kaydedilmediğini söylemiyordu** — bu da kullanıcıyı hakkını
harcadığı sanısına bırakıyor. İkisi de düzeldi: yerel puan + açık uyarı
(`weekly.not_sent`). Bu kez eksik olan taraf webdi, yani ölçüm yine yönü
kendisi seçti.

**Yöntem notu:** üç kapının üçü de hatayı enjekte ederek sınandı ve üçü de
yakaladı. §66'nın ilk yazımı iki YANLIŞ ayrışma gösterdi: web'in `slice(-LIMIT)`
sabiti (sayı arayan desen) ve nesne kısayol yazımı (`seconds` ile
`seconds: secs` aynı alan). İkisi de kapının kusuruydu, kodun değil —
düzeltilmeden bırakılsa gerçek bulguları gürültüye gömerdi.


### 11.149 Serbest yazma görevi Android'de hiç okunmuyordu (ve §11.12 kapandı)

Değerlendirme kuyruğunu ölçerken çıktı ve kuyruktan büyük bir hataydı.
`skillQuiz` `FreeCard` metni **hiç göndermiyordu**: `words >= minWords` olunca
"gönder" düğmesi `onSettle(true)` çağırıyor, örnek cevabı açıyor, görevi
bitmiş sayıyordu. Yani Android'de yazma egzersizi bir metin kutusuydu —
anlamsız bir harf dizisi de tam puan alıyordu. Web aynı görevi baştan beri
rubrikle puanlıyor (`skills/writing-player` → `/api/assess`), yüzdeyi, övgüyü,
ipucunu ve düzeltilmiş metni gösteriyor.

**Bu, "sözleşme var, yüzey bağlamamış" sınıfının en pahalı örneği:** uç
aylardır çalışıyor, mobil ekranda AI uyarısı (`AiNotice variant="output"`)
bile çiziliyordu — yani ekran kullanıcıya "bunu yapay zekâ değerlendirecek"
diyor, arkada hiçbir şey değerlendirmiyordu.

Port edilen üç davranış webin ayrımlarıyla aynı: rubrik puanı ≥60 ile görev
doğru; premium/kota reddi ağ hatası değil (uydurma puan yok); sağlayıcı ya da
ağ yoksa metin `/api/assess/queue`e bırakılıyor.

**§11.12 kapandı.** Kuyruğun mobile eklenmemesinin sebebi kararsızlık değil,
dosyanın başka bir oturumun açık işi olmasıydı; o iş commit edildi. Uç artık
iki taraftan çağrılıyor ve `WEB_ONLY` + `WEB_ONLY_METHOD` listelerinden düştü
— kapı bunu yine kendisi söyledi ("listede olup artık mobilde de çağrılan uç").

**Kapı:** parity §67 iki tarafın istek gövdesini (kind, targets, constraints,
exerciseId), kuyruk çağrısını ve kapı ayrımını karşılaştırıyor. İlk yazımı
webde "uç yok" diye yanlış ayrışma gösterdi: web `/api/assess`i ayrı bir
istemciden çağırıyor (`assess-client`), o yüzden kapı iki dosyayı birlikte
okuyor.


### 11.150 Tasarım denetimi: aynı veri iki uygulamada iki ayrı biçimde

Bu tur ölçüm konusu BİÇİMDİ. Dört ayrışma çıktı, dördü de "aynı şey iki yerde
başka türlü okunuyor" sınıfından.

- **Tur kaydı uyarısı** mobilde kırmızıydı. Ama bu bir uyarı, hata değil: tur
  oynandı, yalnız kaydı bekliyor. Kırmızı çizmek kullanıcıya turu kaybettiğini
  söyler. Web'in flame tonu ve uyarı simgesi alındı; simge mobilde YOKTU,
  `AlertIcon` web çizimiyle birebir eklendi.
- **Sınav bölüm satırı** webde iki durumda iki biçimdeydi: sonuç kartı şeritli,
  çevrimdışı kırılım şeritsiz düz liste. Üstelik geçen bölüm nötr renkteydi —
  "hangi bölümü geçtim" sorusu ancak yüzdeler tek tek okunarak
  cevaplanıyordu. Android ikisini de aynı çiziyor; web ona getirildi (§68).
- **Haftalık sınav puanı** webde dolu daireydi. Android üç sonuç yüzeyinde de
  (tur, yürüyüş, haftalık) halka kullanıyor ve halkanın doluluğu puanın
  kendisi; dolu daire aynı sayıyı taşıyor ama "yüzde kaç" bilgisini görselden
  düşürüyor.

**Ve biçim ölçerken iki yerelleştirme hatası çıktı:**

- Web tur özeti `%${accuracy}` ve `${streak}g` yazıyordu. İlki Türkçe yüzde
  yazımını koda gömüyor (Almanca "85 %", İngilizce "85%"), ikincisi ise "gün"
  kısaltmasını: Almanca ve İngilizce arayüzde ekranda **"5g"** yazıyordu.
- Mobil sınav bölüm ağırlığı da yüzdeyi koda gömüyordu (`%${s.weight}`).

**Kapının kör noktası tam oradaydı:** §51 yüzde biçimini yalnız JSX yazımında
arıyordu (`>%{`), şablon dizgisini değil. İki hata da bu yüzden aylarca
görünmedi. Desen eklendi; veritabanı LIKE kalıbı (`%${q}%`) ayrı tutuluyor,
yoksa kapı gerçek bulguları gürültüye gömerdi.

**Aynı düzeltmede sessiz bir kapı hatası daha:** ".tsx ile sınırla" kuralı
`DESENLER[3]` indisine bakıyordu; listenin başına yeni bir desen eklemek onu
sessizce BAŞKA bir desene uyguluyordu. Desenler artık adlarıyla seçiliyor.
Kapıların kendisi de kod ve aynı sınıf hatayı yapıyor.

**Ölçüldü, bu tur dokunulmadı:** web tur özeti üç `Stat` karosuyla (doğruluk,
kelime, seri) kuruluyor; Android aynı yerde büyük halka + maskot gösteriyor.
Bu, sonuç ekranının bütün hiyerarşisini değiştirmek demek — kendi turunda
ölçülüp yapılacak.


### 11.151 Tur özetindeki "zorlandıkların" listesi ve `unknown[]` tipin bedeli

§11.150'de "web özeti üç karo, Android halka" diye not düşmüştüm; o hiyerarşiyi
ölçerken karşılaştırmanın öteki yönü çıktı: **web'de olup Android'de olmayan**
bir bölüm var — turda yanlış bilinen kelimelerin listesi ve oradan kelime
listesine açılan kapı. Mobilde tur bitiyor, hangi kelimede takıldığın hiçbir
yerde yazmıyordu.

**Altındaki sessiz hata daha ilginç:** `SessionProgress.missed` mobil tipte
`unknown[]` yazılıydı. Yani alan TANINIYOR (tip derleniyor, kimse şikâyet
etmiyor) ama içine bakılamıyor: mobil onu ne gönderiyor ne okuyor. Sonuç,
"sunucu gönderiyor, mobil tipi düşürüyor" sınıfının sinsi bir çeşidi —
Android'de başlanan yarım tur webde sürdürülünce liste boş geliyordu.
`unknown[]`, alanı silmekten daha kötü: silinmiş bir alan gözle görünür,
`unknown[]` sözleşmeye uyuyormuş gibi durur.

Liste artık üç yerde de var: ekranda (altı satır + kalanın sayısı + not +
"Kelimelerim" kapısı), ilerlemeyle birlikte sunucuya giderken, ve sunucudan
geri okunurken.

**Webde de bir yerelleştirme hatası:** başlık koda gömülü Türkçeydi
("Zorlandıkların (3)") — Almanca ve İngilizce arayüzde de öyle yazıyordu.
Sözlüğe alındı ve iki komşu anahtar (`n_more_words`, `missed_note`) web'e özel
olmaktan çıkıp ortak sözlüğe taşındı; ham metin tabanı 166'dan **165**'e indi.

**Ölçüldü, ayrışma değil:** bahisli etap satırı (`wagerXp`) webde var,
mobilde yok - çünkü bahisli etap mekaniği mobilde hiç yok (`session.ts`
yorumunda yazılı). Tur özetinin halka/karo hiyerarşisi hâlâ açık: web üç
`Stat` karosu, Android halka + maskot. Bu, sonuç kartının bütününü
değiştirmek demek ve kendi turunu bekliyor.


### 11.152 iOS sürüm sayacı, tur özeti halkası ve `dialogue` ölçümü

**iOS'un sürümü Android'in gerçeğinden geride kalmıştı.** `check:ios` ve
`version:check` kırmızıydı: Android `versionCode 2` taşıyor (Play'e yüklenmiş),
kaynak 1 diyordu, iOS de 1'de kalmıştı. versionCode Play'e her yüklemede artar
ve GERİ ALINAMAZ — yani ayrışmanın tek doğru yönü kaynağı 2'ye çıkarmaktı;
Android'i 1'e düşürmek Play'in reddedeceği bir şey. `version:bump-code`
kaynağı 2 yaptı, iOS de aynı sayıya geldi. check:ios sekiz denetimin sekizini
de geçiyor. **check:ios bundan sonra tur kapı setinin parçası** — bu tura
kadar hiç çalıştırılmamıştı ve kırmızılığı kimseye görünmüyordu.

**Tur özeti halkası** (§11.150'de açık bırakılan iş): Android özetin ortasında
halka çiziyor, doluluk turun kendisi. Web'de halka yoktu; aynı bilgi yalnız
karoların içinde bir sayıydı. Halka başlığın koyu gradyanı içine kondu
(dolu yay beyaz, boş yay beyazın %28'i, iç daire başlığın zemininde) ve
içinde Android'deki aynı iki satır var. Karolar kaldı: halka başlık, karolar
ayrıntı.

**Ölçüldü, ayrışma değil:** mobil `SkillExercise.dialogue` alanı `unknown[]`
ve mobilde onu çizen hiçbir yüzey yok. §11.151'deki `missed` hatasının aynısı
gibi duruyordu — ama içerik ölçüldü: paketin 995 + 189 egzersizinin
**hiçbirinde** `dialogue` yok, web'in `BUNDLED_EXERCISES`inde de yok. Tip
(`SpeakingDialogueExercise`) modellenmiş ve `lib/lessons/roleplay` onu
kullanıyor, ama içerik henüz yazılmamış. İki tarafta da eşit derecede boş,
yani bu bir parite açığı değil — içerik geldiğinde mobilde oynatıcı da
gerekecek, o gün ItemScreen'in `dialogue` dalı yazılmalı.

iOS yapılandırmasının geri kalanı ölçüldü ve tam: mikrofon ve konuşma tanıma
açıklamaları, arka planda ses + uzak bildirim kipleri, Apple ile giriş
yetkisi, universal links, APNs ortamı, Google iOS istemcisi.


### 11.153 Sunucunun verdiği alanları kim okumuyor: uç uç tarama

Bu tur yöntem şuydu: her `/api/*` ucunun yanıt anahtarlarını çıkar, mobil
kaynakta o adın geçip geçmediğine bak. Dört aday çıktı, ikisi gerçek:

| Uç | Okunmayan alan | Sonuç |
|---|---|---|
| `/api/placement` | `canRetake`, `retakeDays` | **gerçek açık** |
| `/api/premium/redeem` | `retryAfter` | web de okumuyor — eşit |
| `/api/pronounce` | `hasWordTiming` | mobil ucu hiç çağırmıyor (§11.139) |
| `/api/stt` | `confidence` | mobil STT'yi NATIVE çağırıyor, JS görmüyor |

**Bekleme süresi bir kural ve kapıyı İSTEMCİ tutuyor.** Test 30 günde bir
alınabiliyor; sunucu bunu yalnız bildiriyor, `start`/`finish` üzerinde
zorlamıyor. Web tutuyordu, mobil hiç sormuyordu: Android'de test istenildiği
kadar tekrarlanabiliyor ve her bitiş yeni kayıt yazıp seviyeyi
değiştirebiliyordu. Sık tekrarın seviye tahminini "ezber"e çevirmesi kuralın
yazılı sebebi.

**Aynı ekranda ikinci açık:** `accept` hangi seviyenin kabul edildiğini AYRICA
alıyor — yani "önerine katılmıyorum, B1'den başlayacağım" baştan beri
mümkündü. Mobil her zaman öneriyi uyguluyordu. Beş seviye çip olarak geldi,
öneri işaretli, düğme metni seçime göre değişiyor.

**Tarama yöntemi hakkında:** kaba bir eşleşme (ad geçiyor mu) ve bu haliyle
bile iki gerçek bulgu verdi. Kusuru şu: alan adı mobilde BAŞKA bir bağlamda
geçiyorsa "okunuyor" sayar. Kapıya dönüştürmedim — yanlış pozitif üretme
eğilimi yüksek, ve bir turluk taramanın değeri zaten alındı. Betik
scratchpad'de kaldı, tekrarlanabilir.

**Bir yan ayrıntı:** durum isteği testle PARALEL gidiyor. Sıralı yapmak
ekranın açılışını iki gecikme kadar yavaşlatırdı ve bekleme süresi dolmuş
kullanıcı (çoğunluk) bunu her seferinde öderdi.


### 11.154 Ters yönlü tarama: istek gövdeleri ve "gün" yazma anahtarı

§11.153 yanıt alanlarını taradı; bu tur aynı şeyi ters yönde yaptım — her ucun
istek gövdesindeki anahtarları iki platformdan çıkarıp karşılaştırdım. Üç satır
çıktı, biri gerçek:

- `/api/answers` "yalnız web: progress, wager" — **yanlış pozitif**: mobil
  `progress`i koşullu yayılımla gönderiyor (`...(progress ? { progress } : {})`)
  ve çıkarıcı üçlü ifadeyi tanımıyor. `wager` gerçekten web'e özel (bahisli
  etap mobilde yok, yazılı).
- `/api/skills` "yalnız web: id, correct, score, day, seconds" — **yanlış
  pozitif**: çıkarıcı aynı ucun iki ayrı çağrısını (PUT `{records}` ve POST)
  tek kümede topluyor. Mobil POST'u beş alanın hepsini gönderiyor.
- `/api/assess` — **gerçek**.

**`day` bir YAZMA anahtarı.** Değerlendirme satırı o güne yazılıyor ve günlük
kota o günün satırları sayılarak bulunuyor; uçtaki yorum bunu açıkça söylüyor.
Web baştan beri gönderiyordu, mobil **dört çağrı yerinin hiçbirinde**
göndermiyordu. Sonuç: UTC+3'te gece yarısı ile 03:00 arasında yapılan her
değerlendirme dünkü güne düşüyor, kota da yanlış güne sayılıyordu — §11.148'de
web'de bulduğum ders hatasının aynısı, bu kez ters tarafta.

**Kapı sınıfı tutuyor (parity §73):** `clampDay(body.day)` yazan her uç "gün
isteyen uç" sayılıyor (dokuz uç) ve iki tarafın da o uca gün göndermesi
bekleniyor.

**Kapının ilk yazımı yanlış pozitif verdi** ve düzeltmesi öğretici: ölçü çağrı
YERİ başınaydı, `/api/mock-exam` `save` çağrısını "gün göndermiyor" diye
işaretledi. İki sebep birden: aynı ucun bazı eylemleri gün istemiyor, ve web
çağrıyı bir yardımcıdan (`post`) geçirdiği için uç adı çağrı yerinde hiç
geçmiyor — yani web tarafı "eksiği yok" görünüyordu, çünkü kapı onun
çağrılarını hiç görmüyordu. Ölçü uca taşındı: bir ucun yazma çağrılarından en
az biri gün taşıyorsa o platform gönderiyor sayılıyor. **Bir kapının iki
tarafı farklı görebilmesi, kapının kendisini yanıltıcı yapar.**


### 11.155 Ölçüm alanları eşit çıktı; asıl bulgu tipteki kaçıştı

Bu tur `errorType` / `quality` / `hintUsed` / `detail` sınıfını taradım —
§11.30'larda mobilin hiç göndermediği alanlar bunlardı. **Hepsi eşit:** iki
taraf da aynı beş hata tipini (`article`, `plural`, `spelling`, `meaning`,
`listening`) aynı yerlerde üretiyor, `classifyTyping`/`classifyOrder` iki
tarafta da var, `hintUsed` karşılıklı yerlerde doluyor. `ERROR_TYPES` listesi
zaten §-kapılı.

Mobil `errors.ts` webinkinden dört şey eksik (`ERROR_LABEL_KEYS`, `errorLabel`,
`ERROR_TARGET_GAME`, `srsWeightFor`) ama bu **doğru**: ilk ikisi etiket, mobil
onları sunucudan alıyor (`/api/errors` `label`/`href` döndürüyor, `WeakSpots`
onu çiziyor); son ikisi sunucu tarafı puanlama. Kopyalamak drift üretirdi.

**Asıl bulgu şıkların tipinde.** Sunucu şıkları iki biçimde gönderiyor:
`choice`/`listen` nesne (`{text, sub}`), `cloze`/`plural` düz dizge (o
turlarda ikinci dil satırı yok). Mobil tipi yalnız nesneyi biliyordu ve iki
çağrı yeri `as unknown as string[]` ile geçiştiriyordu.

**Kaçışın bedeli, hatanın nereye düşeceği:** alan biçimi değişirse derleme
susar, çalışma anında şık listesi boş görünür ve tur "kendini değerlendir"e
düşer — yani kullanıcı kendi puanını verir ve SRS ona göre yazılır. Sessiz
bozulmanın en pahalı biçimi. Web aynı şeyi oyun başına ayrı tiplerle söylüyor
(`Round` birleşimi), orada kaçış yok.

**Yapılmadı, ölçüldü:** mobilin `Round`u hâlâ tek gövdeli gevşek bir tip; web
oyun başına birleşim kullanıyor. Birleşime çevirmek `rounds`, `GameScreen`,
`WalkMode`, `Weekly`, `Boss` dosyalarını birden değiştirir. Şimdilik iki
yardımcı ve §74 (`as unknown as` sayısı sıfır) bu sınıfı tutuyor; birleşim
kendi turunu bekliyor.

**Ölçüldü, ayrışma değil:** `free_sentence` turu mobilde oynanamıyor ama
mobil bunu `skipGames` ile hem günlük tura hem haftalık sınava söylüyor —
sunucu o turu hiç üretmiyor. Yani "oynatıcısı yok" bir açık değil, yazılı bir
sözleşme.


### 11.156 Ünlem de bir kaçış: sekiz tur bileşeni ve yürüyüş kuyruğu

§11.155'te `as unknown as`i kaldırırken ikinci kaçış biçimi göze çarptı:
`const word = round.word!;` — sekiz tur bileşeninde. Tip "olmayabilir" diyor,
kod "vardır" diye kestiriyor. İkisi arasındaki farkı yalnız çalışma anı
gösterir ve orada da sessiz: kelimesiz bir tur boş ekran çizer.

Çözüm **cast değil**: kelime dağıtıcıda bir kez sınanıp bileşene ayrı bir
özellik olarak veriliyor. `round as WordRound` yazmak da aynı susturma
olurdu — kapı onu yakalamazdı ama hata yine çalışma anına kalırdı.

Yürüyüş modunda aynı kalıbın daha ince bir biçimi vardı:
`rs.filter((r) => r.word).map((r) => ... r.word! ...)`. Süzgeç ve ünlem
**ayrı iki iddia**: biri değişirse öteki sessizce yalan söylemeye başlar. Tek
geçişe (`flatMap`) indirildi.

**Kapı iki biçimi birden sayıyor** (§74: birleşim kaçışı + ünlem), ikisi de
iki tarafta sıfır. Web'de sıfır olmasının sebebi disiplin değil TİP: oyun
başına birleşim, kelimeyi zorunlu yapıyor.

**Hâlâ açık:** mobilin `Round`u tek gövdeli gevşek tip olmayı sürdürüyor.
Bu tur onun EN PAHALI iki sonucunu kapattı (şık biçimi, kelime varlığı);
birleşime çevirmek ayrı bir iş.


### 11.157 Yüzey envanteri eşit çıktı; erişilebilirlik kapısı ve kendi hatam

**Üç ölçüm, üçü de eşit:**

1. **Yüzey envanteri.** Web'in 39 rotası ile mobilin ekran + sekme kümesi
   birebir örtüşüyor. Web'de fazladan görünen üçü ölçüldü: `/analytics`
   (yönetime kapalı huni), `/learn/challenge` (webe özel, yazılı),
   `/immersion/grammar/[unit]` (mobilde `QuizScreen` çiziyor — gramer de ünite
   kimliğinden türetiliyor).
2. **Arkadaşlar merkezi.** Üç sekme, aynı sıra, aynı bileşenler, aynı boş
   durum: web ve mobil satır satır aynı. Sıralama da öyle (lig + arkadaşlar).
3. **Değerler için varsayılanlar** (`?? ""`, `?? 0`): taradım, hepsi zararsız
   arayüz varsayılanı — sunucu verisi gizleyen bir tane çıkmadı.

**Bulunan tek şey erişilebilirlikte:** yalnız simge taşıyan bir düğme ekran
okuyucuda "düğme" diye okunur. Mobilde bir tane etiketsiz kalmıştı (seviye
testinin kapatma düğmesi), webde sıfır. parity §75 iki tarafı da sıfırda
tutuyor — bu, "tasarımı da kontrol et" isteğinin ölçülebilir bir parçası.

**Kendi hatam, açıkça:** önceki iki commit lint HATASIYLA girdi (kullanılmayan
`round` parametresi ve eksik `onboarding` bağımlılığı). Sebebi şu: lint
çıktısını `tail -2` ile okuyordum ve o iki satır özet satırıydı — "0 errors"
demiyordu, kesilmişti. **Kapı zaten söylüyordu; ben kesip okumadım.** Bu turda
düzeltildi ve tur rutini değişti: lint çıktısı kesilmeden okunuyor.


### 11.158 Erişilebilirlik ikinci tur: metinsiz denetimlerin adı ve durumu

§11.157'de simge düğmelerini ölçtüm; bu tur aynı soruyu öteki metinsiz
denetimlere sordum.

**İki `Switch` adsızdı** (bildirim ayarları, sosyal ayarlar). Yaygın yanılgı
şu: anahtarın yanındaki başlık orada duruyor, "zaten okunur". Okunmuyor —
React Native o ilişkiyi kendiliğinden kurmuyor, ekran okuyucu "açık anahtar"
deyip geçiyor. Üçüncü anahtar (kullanım verisi) baştan beri doğruydu, yani
kural biliniyordu ama iki yerde uygulanmamıştı.

**Web'de iki çip durumunu bildirmiyordu.** Sebebi yapısal ve öğretici: mobil
çipi TEK bileşen (`ui/Chip`), durum orada bir kez yazılıyor ve çağrı yerinde
unutulamaz; web her çağrı yerinde kendi `aria-pressed`ini yazıyor — 35 çip
kullanımının 33'ünde yazılmış, ikisinde unutulmuş. **Merkezîleştirilmiş
bileşen bir erişilebilirlik kuralını da merkezîleştirir.**

**Ölçüldü, sorun yok:** dokunma hedefleri (44'ün altında `hitSlop`suz düğme
yok), roller ve durumlar (50 `accessibilityRole`, 19 durum bildirimi), web'in
simge düğmelerinin hepsi adlı.

İki yeni ölçü kapıya bağlandı: §75 artık adsız düğme + adsız anahtar sayıyor,
§76 çip durum bildirimini sayıyor.


### 11.159 Yükleme/hata durumları: seviye testi kayıt düşünce testi yok ediyordu

Bu tur "tekrar dene" yolu olan yüzeyleri iki tarafta saydım. Mobilde on dört,
webde on yedi dosya; kümeler büyük ölçüde örtüşüyor. Üç aday çıktı:

- **`/words`** — yanlış pozitif: web sayfası sunucu bileşeni, istemci isteği
  yok; hata `error.tsx`e düşüyor ve orada tekrar deneme zaten var. Mimari
  farkı, açık değil.
- **Arkadaşlar merkezi** — webde hata metni var, tekrar deneme yok. Küçük;
  sonraki tura kaldı.
- **Seviye testi** — gerçek ve büyük.

**Testi bitirmek yazılamayınca web hata kartına düşüyordu:** on dakikalık
testin sonucu ekrandan siliniyor, kullanıcı seviyesini hiç öğrenmiyordu.
Android aynı yerde yerel tahmine düşüyor. Web artık `scorePlacement` ile aynı
sonucu istemcide hesaplıyor — **bu uydurma değil**: puanlama saf bir işlev ve
sunucu da onu kullanıyor. Kabul edilecek bir kayıt satırı olmadığından seviye
doğrudan profile yazılıyor; Android'in aynı yerdeki yedeğiyle aynı yol.

**Ve mobil de eksikti:** kaydedilmediğini SÖYLEMİYORDU. Kayıt yok demek,
sonraki açılışta "son alma" satırının boş kalması ve bekleme süresinin
işlememesi demek — kullanıcının bunu bilmesi gerekiyor. Not iki tarafa da
eklendi.

Web'in hata ekranına "tekrar dene" (birincil) eklendi; çıkış ikincil kaldı —
haftalık sınavda zaten yazılı olan Android sırası. §77 dördünü birden
ölçüyor.

**Yöntem notu:** bu tur da bir ölçüm ayrışma göstermeyip mimariyle
açıklandı (`/words`). Böyle bir sonucu "açık" saymamak, kapı yazmamak ve
sebebini yazmak — listeyi gürültüden koruyan şey bu.


### 11.160 Gelen kutusu haritaları ve başka bir oturumun kırmızısı

Sunucu dokuz bildirim türü gönderiyor. İki harita var — tür → simge ve tür →
gidilen yer — ve ikisi de iki tarafta ELLE yazılıyor. Karşılaştırdım:
yönlendirme eşitti, simge haritasında `league_up` iki tarafta da genel gelen
kutusu simgesine düşüyordu. Bu satırın **aktörü de yok** (avatar çizilmiyor),
yani ekranda satırın neyle ilgili olduğunu söyleyen hiçbir şey kalmıyor. İki
tarafa da kürsü simgesi eklendi.

Arkadaşlar merkezinde (§11.159'da not ettiğim küçük iş) webde hata metni vardı
ama tekrar deneme yolu yoktu; eklendi.

**parity §78** iki haritayı da ölçüyor. Kapının ilk yazımı yine kendi hatasını
gösterdi: sabit uzunlukta bir pencere kullanıyordu ve yönlendirme haritası
KOMŞU işlevden bir `case` çalıyordu (`friend_milestone`). Pencere işlevin
kendisiyle sınırlandı. Bu, §73'te öğrendiğim şeyin aynısı — sabit pencere
kapıyı yanıltır.

**Paralel oturum notu:** bu turda web `tsc` beş hatayla, sonra web `lint` bir
uyarıyla, sonra mobil `tsc` bir hatayla kırmızı gördüm — hiçbiri benim
dosyalarımda değildi (`lessons/modules`, `immersion/*`, `deepLink`
auth-handoff). Başka bir oturum aynı ağaçta çalışıyor ve dakikalar içinde
düzeltti. **Yöntem:** kırmızıyı görünce önce kimin olduğunu ölçüyorum
(`git status`, hata dosyası benim dokunduklarımda mı), sonra karar veriyorum.
Commit'lerim zaten ayrı bir indeks üzerinden ve yalnız kendi yollarımı
alıyor, yani onların yarım işi benim commit'ime giremez.


### 11.161 Elle yazılmış eşlemeler turu: yazılarım listesi

§11.160'ta gelen kutusunun iki haritasını karşılaştırmak iş görmüştü; aynı
soruyu öteki elle yazılmış eşlemelere sordum.

**Eşit çıkanlar:** tepki simgeleri ve tonları (zaten §14 kapılı), ünite türü
haritaları (`unitkind.*`, yedi tür, iki tarafta birebir), gelen kutusu
yönlendirmesi.

**Yazılarım listesi ayrışıktı.** `/api/assessments` dört tür döndürüyor;
mobil haritası yalnız `writing` ve `speaking` biliyordu. Cümle kurma turundan
(`sentence`) ve rol yapmadan (`roleplay`) gelen satırlar **ham anahtarıyla**
çiziliyordu — ekranda "sentence" yazıyordu. Bu, sözlük eksikliğinden değil
HARİTA eksikliğinden geliyordu: anahtarlar webde vardı, mobil onları hiç
sormamıştı.

**Aynı satırda ikinci eksik:** gün yazmıyordu. "Ne zaman yazmıştım" sorusu
listede cevapsızdı ve satırlar birbirinden ayırt edilemiyordu; web tür ·
seviye · gün üçlüsünü baştan beri gösteriyor.

**Sınıf hakkında:** bu tur üç ayrı elle yazılmış eşleme ölçüldü, biri
ayrışıktı. Oran düşük ama bulunanın bedeli yüksek (ekranda ham anahtar
görmek), ve ölçüm ucuz. §79 iki ölçüyü birden tutuyor.


### 11.162 Renk de kimliktir: ilerleme şeridi ve paletteki yazılı eşleme

Eşleme taramasını sürdürdüm. **Eşit çıkanlar:** başarım simgeleri (29 ad, iki
tarafta birebir), rozet basamağı renkleri, ünite türü simgeleri.

**Ayrışan:** ilerleme ekranındaki seviye şeridi. Web her seviyeyi kendi
rengiyle çiziyor (görülen %40 saydam, pekişen tam ton); mobil beş seviyeyi de
yeşil çiziyordu. İlginç olan şu: eşleme zaten **mobilin kendi paletinin
yorumunda yazılı** ("mint=doğru/A1, rose=yanlış/C1, sky=A2, violet=B1") — yani
bilgi vardı, ekran onu kullanmıyordu. Renk burada süs değil kimlik: beş çubuk
aynı renkteyken seviyeler yalnızca yazıdan ayırt ediliyor.

§80 eşlemeyi jeton adlarını çevirerek karşılaştırıyor (mobil `success` ↔ web
`mint`), çünkü iki palette aynı renk iki ayrı adla duruyor.

**Paralel oturum, aynı dakikada aynı yerde:** §38 kapısı (sınav yazma
değerlendirme isteği) bu tur kırmızıya döndü — web `locale: "tr"` alanını
sekiz çağrı yerinden birden kaldırmıştı (`a85566ad`: değerlendirme artık
öğrencinin dilinde, dili sunucu profilden okuyor). Mobil tarafı da aynı
oturum düzeltirken ben ölçüyordum; kapı ikisi de bitince yeşile döndü.
**Ders:** kırmızı bir kapı her zaman "bir şey bozuldu" demek değil — bazen
"iki taraftan biri henüz gelmedi" demek. Ölçüp kimin işi olduğunu görmek,
düzeltmeye atılmaktan önce geliyor; yoksa aynı satırı iki oturum iki kez
yazar.


### 11.163 Simge de kimliktir: beş kavram, iki ayrı çizim

§11.162 rengi kimlik saydı; aynı ölçüt simgeye uygulanınca beş ayrışma çıktı.
Okuma, dinleme, yazma, dil bilgisi ve tekrar turu **iki uygulamada başka
çizimlerle** gösteriliyordu (kitap ↔ açık kitap, kulaklık ↔ başka kulaklık,
kalem ↔ başka kalem, harf ↔ yapboz, soru işareti ↔ hedef).

**Ayrışmanın sebebi eksiklik değil seçim:** mobilde iki simge ailesi de var —
`Read/Listen/Write` patika ve beceri yüzeylerinde, `BookOpen/Headphones/Pen`
başarım rozetlerinde. Web yalnız ikinci aileyi taşıyordu ve onu her iki iş
için kullanıyordu. Android'in üç çizimi ve `Quiz` webin kütüphanesine
eklendi; rozet ailesi olduğu gibi duruyor.

**Yan düzeltme:** web'in patika tür haritasında `lesson` varsayılana
bırakılmıştı. Aynı simgeyi veriyordu ama harita satır satır
karşılaştırılamıyordu — kapı "yalnız mobil: lesson" diyordu ve bu doğruydu:
**yazılmamış bir eşleme, doğru sonucu verse bile ölçülemez.** Tür artık açıkça
yazılı, varsayılan yalnızca tanınmayan tür için.

§81 iki haritayı da (beceri, patika türü) satır satır ölçüyor.


### 11.164 Boş ve hata durumlarının kabuğu

Bu tur "aynı durum aynı kabukta mı" diye baktım. Web `EmptyCard`ı yedi yerde
kullanıyor, mobil altı yerde; kesişimin dışında kalan tek gerçek fark başarım
duvarının HATA durumuydu: mobilde çıplak bir cümle ve bir düğme, webde kupa
simgeli kart. Çıplak cümle "ekran bozuk" gibi okunuyor — kabuk, mesajın
kendisi kadar bilgi taşıyor. §82 beş ölçüyle bağladı.

**Ölçüldü, eşit çıktı:**
- Lig tablosu: basamak listesi (bronz→elmas), yükselme/düşme bölge renkleri,
  başlık simgesi.
- Günün görevleri: üç durum (alındı → "+N XP", tamam → "al", sürüyor →
  ilerleme) iki tarafta aynı; satırın sol karosu farklı (web sayı, mobil
  şimşek) ama sayı iki tarafta da satırın içinde ayrıca yazıyor — bilgi
  kaybı yok, bu yüzden dokunmadım.
- Maskot: mobilde yedi klip, webde on bir. Kod farkı değil VARLIK farkı
  (§11.15'te kayıtlı, `cheer`in mobil karşılığı `celebrate`).

**Yöntem notu:** bu tur üç ölçümden ikisi "eşit" çıktı ve biri küçük bir
farkla kapandı. Ölçümün değeri bulduğu hatayla değil, ARADIĞI yerin
tükenmesiyle de ölçülüyor: elle yazılmış eşlemeler, renk kimlikleri, simge
kimlikleri ve durum kabukları artık taranmış durumda.


### 11.165 Beş ses ipucu: "varlık farkı" yanlış teşhisti (§11.15 kapandı)

Webde on üç ses ipucu, mobilde yedi. Aradaki beşi — turun açılışı, rozet
açılışı, süre uyarısı, rekor, kusursuz tur — kayıt defterinde **"varlık
(asset) farkı"** diye duruyordu ve Samet'i bekliyordu.

**Teşhis yanlıştı.** Mobilde ses dosyadan çalmıyor: üç yolun üçü de
(`sfxNotes.ts` → WebView köprüsü, Kotlin native sentez, Swift native sentez)
aynı NOTA TABLOSUNDAN sentezliyor; mp3'ler yalnız hata ayıklama yedeği. Yani
eksik olan ses dosyası değil, tablodaki beş satırdı. Web'in tarifleri
(`arpeggio`/`note` çağrıları) doğrudan on sayılık nota biçimine çevrildi.

**Tek kaynak beş yeri birden besliyor** ve hepsi güncellendi: tablo, iki
native kopya (`render-sfx.py --kotlin/--swift`), iki paketin mp3 yedekleri ve
iOS proje dosyasının kaynak girdileri (dosya başvurusu + kaynak fazı, elle
kimlik atayarak; `check:ios` doğruladı). Testin "yedi tür" kilidi on ikiye
çıktı.

**Çağrı yerleri de eklendi**, yoksa tablo sessiz kalırdı:
- `danger` patron turunun son on saniyesinde saniyede bir. Sayaç kırmızıya
  dönüyordu ama ses yoktu — telefona bakmayan kullanıcı süresinin bittiğini
  duymuyordu.
- `record` patron geçilince: mobil sıradan bitiş sesini çalıyordu, yani
  patronu geçmek günlük turu bitirmekle aynı sesi veriyordu.
- `perfect` hak edilmiş turda. Karar `finish()` içinde verilemiyor çünkü
  pekişen kelime sayısı sunucu yanıtıyla geliyor; özet açılınca veriliyor,
  konfetiyle aynı ölçütten.
- `start` üç turun açılışında, `unlock` rozet kartında ve görev ödülünde.

**Kapı iki soruyu birden soruyor (§83):** ipucu KÜMELERİ eşit mi, ve her
ipucu gerçekten ÇALINIYOR mu. İkincisi olmadan tablo büyür, ekran sessiz
kalır. Kapının ilk yazımı iki kez yanıldı: birleşimin son satırı noktalı
virgülle bittiği için her iki taraf da kendi son ipucunu kaybediyordu, ve web
mikrofon ipuçlarını bir sarmalayıcıdan (`walkCue`) çalıyor — düz `play(` araması
onları görmüyordu.

**`stage` webe özel kalıyor:** etap kartı mobilde yok, ses de olmamalı.


### 11.166 Haptik: sözleşme eşit, çağrı biçimi değildi

§11.165'in yöntemini titreşime uyguladım. **Sözleşme eşit çıktı:** üç tür
(doğru, yanlış, dokunuş), iki tarafta da haptik sarmalayıcısı sesi de çalıyor
(`haptic` → `sfx`, `vibrate` → `play`), uygulamalar platforma uygun (iOS
Taptic desenleri ↔ `navigator.vibrate` deseni) — biçim farkı meşru.

**Ayrışan çağrı biçimiydi:** mobilde dört yer ikisini birden yazıyordu
(`haptic("correct"); sfx("correct")`). Ses iki kez tetikleniyor ve yalnızca
`sfx` içindeki 120 ms yineleme penceresi sayesinde tek duyuluyordu. Bu,
**görünmez bir dengeye yaslanan kod**: pencere kısalsa ya da kalksa aynı ses
üst üste çalar ve sebebi hiçbir yerde yazmaz. Fazlalık çağrılar kalktı, §84
iki tarafta da sıfır bekliyor.

**Kapı yine kendi hatasını gösterdi:** ilk yazımı sarmalayıcının KENDİ
yorumundaki örneği (`haptic("correct"); sfx("correct")` diye yazan açıklama)
gerçek bir çağrı sandı. Yorumlar taranmadan önce atılıyor — bu turda üçüncü
kez aynı ders: **kapı kaynak metni okuyorsa, kaynağın yorumlarını da okur.**


### 11.167 Eskimiş kayıt: §11.11 çoktan kapanmıştı

Bekleyen "karar Samet'te" maddelerini teker teker ölçmeye başladım (§11.165'te
biri yanlış teşhis çıkmıştı). İlk sıradaki §11.11 — kelime listesi satırının
derinliği — **zaten kapanmış**: uç yedi alanı birden gönderiyor, Android satırı
açılıyor, örnek cümle, tekrar takvimi, unutma sayısı ve sülük işareti hepsi
yerinde. Kayıt eskimişti ve hâlâ "port edilmedi, karar Samet'in" diyordu.

**Eskimiş kayıt yanlış kayıttan daha tehlikeli:** yanlış kayıt ölçülünce
düzeltilir, eskimiş kayıt ise "bu iş bekliyor" diye durur ve kimse ona
dokunmaz. Girdiye kapanış notu eklendi ve §85 kapısı iki satırın aynı yedi
alanı gösterdiğini artık ölçüyor — kayıt değil kod konuşuyor.

**Kapı yazarken iki kusur çıktı ve ikisi de öğretici:**
1. İlk yazım alanın adını arıyordu; alan TİPTE geçtiği için satırdan silinse
   bile "var" diyordu. Ölçü çizim ifadesine taşındı (`\.lapses ?`,
   `firstExample(`, `{w.niveau}`), yani "tipte var" değil "ekranda var".
2. `typLabel` iki tarafta farklı sarmalanmış (mobil `grammarLine` içinde);
   desen ikisini de tanıyor.

**Yan bulgu:** aynı metin iki ayrı anahtarda duruyordu — `words.n_lapses`
(ortak) ve `wordsw.n_lapses` (web). Web kopyası silindi, kullanım ortak
anahtara geçti; üç dilde üç satır eksildi.


### 11.168 Seviye testinin dört aşaması — "üç ekran gerekiyor" tahmini fazlaydı

Bekleyen maddeleri ölçmeye devam: sıradaki §11.119, Android'de seviye testinin
yalnız kelime ölçmesi. Kayıt "uyarlanan aşama makinesi, metin oynatıcı ve
dinleme sesi gerekiyor (kabaca üç ekran + ses yolu), Samet'in kararı bekliyor"
diyordu.

**Ölçünce tahmin fazla çıktı.** Gereken parçaların hepsi mobilde zaten vardı:
şıklı tur bileşeni (`ChoiceGame`), metin bloğu ve TTS. Eklenen şey üç parçaydı
— tip (dört aşama), maddelerin tek sıraya düzleştirilmesi ve sorunun üstündeki
bağlam bloğu.

**Bir tasarım ayrımı korundu:** okuma sorusunun üstünde metin duruyor,
dinlemede metin **görünmüyor** — bölümler sesli okunuyor. Dinleme ölçümünün
anlamı bu; metni gösterirsek okuma ölçmüş oluruz. Web aynı ayrımı yapıyor.

**Uyarlanabilirlik bilerek alınmadı:** web aşama içinde seviye atlıyor
(`nextLevel`), mobil bütün maddeleri soruyor. Bu, Android'in kelime aşamasında
baştan beri yaptığı şey; puanlama sunucuda cevap başına seviyeye baktığı için
sonuç daha doğru oluyor, bedeli testin uzaması. Ayrışma değil, yazılı bir
seçim.

**§57 muafiyetten kurtuldu:** kapı "mobilde olan + kayıtlı eksik" diye
ölçüyordu; artık sunucunun aşama listesiyle mobil tipin alanları birebir
karşılaştırılıyor. **Muafiyet, kapının kendi borcudur** — kapanınca silinmeli,
yoksa kapı sonsuza kadar eksik bir gerçeği doğrular.

**Yan iş:** mobil i18n kapısı başka bir oturumun dosyasında yanlış pozitif
veriyordu (`lib/native-de.ts` içindeki `t(...)` i18n değil, ders içeriğinin
eşleme tablosunda bir arama). Web'deki eşdeğer denetimin aynı dosya için aynı
muafiyeti zaten vardı; mobil tarafına da yazıldı. **İki kapı aynı kuralı
uyguluyorsa aynı istisnaları da taşımalı.**


### 11.169 Konuşma puanı: kararı bekleyen kısım ile bekletmeyen kısım

§11.139 üç şeyi bir arada tutuyordu ve hepsi "Samet'in kararı" etiketiyle
duruyordu. Ayırdım:

1. **Hangi ölçüm kullanılacak** (sağlayıcıdan söyleyiş puanı ↔ cihazdaki
   tanıyıcının metin eşlemesi) — gerçekten ürün kararı: sağlayıcı klip başına
   ücretli, ve mikrofon aynı anda ya tanıyıcıya ya kaydediciye verilebiliyor.
   **Bekliyor.**
2. **Web'in arıza yolu** — kayıt "ağ yoksa madde 0 sayılıyor ve kullanıcıya
   söylenmiyor" diyordu. Ölçtüm: **söylüyor** (iki deneme hakkı, yerinde
   "tekrar dene", ve ikinci denemede de olmazsa "atlanıyor" metni). Kaydın bu
   cümlesi yanlıştı.
3. **Mobilin ne ölçtüğünü söylemesi** — bu gerçekten eksikti ve karar
   gerektirmiyordu. Sonuç satırının altına tek cümle eklendi: bu bölüm
   söylenen kelimeleri eşliyor, söyleyiş kalitesi ölçülmüyor.

Aynı `speakingScore` alanına iki farklı ölçüm yazılıyor olması sürüyor; ama
artık **kullanıcı hangisini gördüğünü biliyor**. Karar geldiğinde bu cümle ya
kalkar (mobil de söyleyişi ölçerse) ya da webe de bir eşi yazılır.

**Yöntem notu:** "karar bekliyor" etiketi bir maddeyi bütünüyle
dondurabiliyor. Üç turdur aynı şeyi görüyorum — §11.15 (ses ipuçları) yanlış
teşhisti, §11.11 eskimişti, §11.119'un tahmini fazlaydı. Bu turda madde
gerçekten karar gerektiriyordu ama **içindeki üç işten ikisi
gerektirmiyordu**. Karar bekleyen bir kayıt, kararla ilgisi olmayan alt işleri
de birlikte bekletiyor.


### 11.170 Rozet kutlaması da kapanmıştı; maskot klipleri gerçekten çizim işi

Kayıtlı maddeleri taramayı sürdürdüm.

**§11.15 (rozet açılış kutlaması) — kapanmış.** Mobilde kutlama var: aynı
`MAX_SOLO` eşiği, tekli kuyruk ve toplu kart, "görüldü" bildirimi, ve
§11.165'te eklenen `unlock` sesi. Kayıt hâlâ "mobilde HİÇ YOK, mobil ses
kümesinde `unlock` cue'su bile yok" diyordu — **iki cümlesi de artık
yanlıştı**. §86 kapısı beş ölçüyü tutuyor, yani kayıt bir daha eskimeyecek:
kutlamanın bir parçası düşerse kapı söyler.

**§11.16 (maskotun `think` ve `wow` klipleri) — gerçekten çizim işi.**
Ölçtüm: web `think`i altı yerde kullanıyor, mobilde o yüzeylerin ikisinde
(kurs onboardingi, haftalık sınav girişi) maskot hiç yok. Mevcut yedi klipten
biriyle doldurmak mümkün ama kaydın gerekçesi hâlâ geçerli: `think`
"düşünüyorum", `wow` "bak şuna" diyor; `idle`/`wave` ile koymak yanlış şeyi
söyler. **Ölçüm bir kaydı ancak yanlışsa çürütür; bu kayıt doğru.**

**Dört turluk taramanın toplamı:** beş kayıtlı maddeden üçü kapanmıştı ya da
yanlış teşhisti (§11.15, §11.11, §11.119), biri kısmen kapandı (§11.139), biri
gerçekten bekliyor (§11.16 — çizim). Oran şunu söylüyor: **"karar bekliyor"
etiketi zamanla çürüyor** ve düzenli olarak yeniden ölçülmesi gerekiyor.


### 11.171 Ölçüm turu: dört yüzey eşit, kapının kör noktası kapandı

Bu tur dört yüzeyi karşılaştırdım ve **dördü de eşit çıktı**: deneme sınavı
istatistikleri (süren sınavlar, beceri, seviye, son denemeler), profil menüsü
(sekiz satır, davet dahil), ayarlar (31 ortak anahtar) ve hesap bölümü
(bağlı hesaplar + etkin oturumlar, iki tarafta da aynı iç içe yapı).

Ayarlardaki fark yalnız platforma ait: webde "ana ekrana ekle" (PWA), kısa
birim etiketleri ve birleşik gizlilik satırı; mobilde oturum açmadan
kullanılabildiği için "giriş yap ve kaydet". Kapı yazmadım — muafiyet listesi
ölçülen şeyden uzun olurdu ve **muafiyet kapının borcudur** (§11.168).

**Asıl bulgu kendi ölçüm yöntemimdeydi.** Bu turda üç kez üst üste aynı hataya
düştüm: `t("...")` arayan bir grep, ekranların çoğunun kullandığı iki biçimi
GÖRMÜYOR — üçlü ifade (`t(copied ? "a" : "b")`) ve sabit tablo
(`{ label: "settings.theme_system" }`). Üçünde de "mobilde yok" sandım, üçü de
vardı.

Bu yalnız benim ölçümümün değil, **mobil i18n kapısının da kör noktasıydı**:
eksik anahtar denetimi yalnız `t()` çağrılarına bakıyordu, yani tablo
anahtarının yanlış yazılması ekranda ham anahtar olarak çıkar ve kapı susardı.
Denetim `label`/`labelKey`/`titleKey`/`subKey`/`promptKey` alanlarını da
okuyor artık; hata enjekte edilerek sınandı. (Web'in eşdeğer denetimi bu
biçimi zaten tanıyordu — §11.143'teki ölü anahtar taraması tablo anahtarlarını
da sayıyor.)


### 11.172 Aynı kör nokta webde de vardı

§11.171'de mobil kapısına eklediğim tablo-anahtarı denetimini webde de aradım:
**aynı kör nokta oradaydı.** Web'in eksik-anahtar denetimi `t()` çağrılarına ve
üçlü ifadelere bakıyordu; `{ labelKey: "words.filter_all" }` gibi tablo
anahtarları görünmüyordu. İlginç olan şu: ÖLÜ anahtar denetimi (5) düz
literalleri zaten tarıyordu — yani **aynı dosya iki denetim tarafından iki
farklı gözle okunuyordu**. Biri "bu anahtar kullanılıyor mu" diye bakarken
tabloları sayıyor, öteki "bu anahtar var mı" diye bakarken saymıyordu.

Bugün eksik bir tablo anahtarı yok (ölçüldü: sıfır), yani bu bir hata
düzeltmesi değil kapı düzeltmesi — ama enjekte edilen yanlış anahtar artık
yakalanıyor.

**Ölçüldü, ayrışma değil:** "Yapabildiklerim" iki tarafta da seviye, beceri ve
üç durumu (kanıtlı / gelişiyor / henüz yok) gösteriyor; düzen genişliğe göre
ayrışıyor (web seviye çipi + beceri sütunları, mobil seviye başlıkları +
ilerleme şeridi). Bilgi kümesi aynı, o yüzden dokunulmadı.


### 11.173 Günün turu: her platform tablonun yalnız bir hâlini söylüyordu

Günlük sıralamanın iki özel hâli var ve ikisi de kullanıcıya bir şey söylemek
zorunda — ama **her platform yalnız birini söylüyordu**:

| hâl | mobil | web |
|---|---|---|
| tablo boş | "ilk oynayan sen ol" | *hiçbir şey* |
| tabloda yalnız kendisi | *hiçbir şey* | "ilk sensin, tablo gün ilerledikçe dolacak" |

Boş tabloda web başlığın altında boşluk bırakıyordu (ekran bozuk görünüyor);
tek satırlı tabloda mobil susuyordu (kullanıcı "kimse oynamamış" sanıyor).
İkisi de iki tarafa eklendi.

**Bulmanın yolu ilginçti:** iki ekranın sözlük anahtarlarını yan yana koyunca
`be_first_to_play_today` (yalnız mobil) ve `first_today` (yalnız web) çıktı.
İlk bakışta **aynı şeyin iki adı** gibi duruyordu — bu turlarda üç kez öyle
çıkmıştı. Ama metinleri okuyunca iki AYRI durum oldukları görüldü. Anahtar
kümesi farkı bir ipucu, sonuç değil: **adlar değil metinler karşılaştırılmalı.**


### 11.174 Boş hâller taraması: dört liste, iki bulgu

§11.173'ün yöntemini (iki ekranın anahtar kümesini yan yana koy, sonra
METİNLERİ oku) dört listeye uyguladım: yazılarım, lig tablosu, arkadaş listesi,
akış.

**Yazılarım — gerçek açık.** Boş listede web üç parça gösteriyor (başlık, ne
düştüğünü anlatan paragraf, yazma alıştırmalarına götüren düğme); mobilde tek
cümle vardı. Boş bir ekranın işi kullanıcıyı bir yere göndermek; tek cümle
"nereye gideceğim" sorusunu cevapsız bırakıyor. Üçü de mobile geldi.

**Akış — anahtar ikizi.** `feedlist.find_friends` ile `friends.find_friends`
aynı metni taşıyordu; ilki silindi. Bu, bu turlardaki dördüncü ikiz
(`session.save_*`, `wordsw.n_lapses`, `common.listen`, şimdi bu).

**Kalan iki lead ölçüldü, açık değil:**
- Lig tablosunda web `social.unnamed` ve `user.report` taşıyor. İkisi de
  mobilde BAŞKA dosyada: isimsiz kullanıcı `social/common`de, şikâyet
  `UserScreen`de. Satır aynı şeyleri sunuyor.
- Arkadaş satırındaki `socialw.*_hint` anahtarları webin tooltip'leri;
  mobilde dokunmatikte tooltip yok, eylem adları zaten görünür. Aynı bilgi,
  platforma uygun biçim.

**İkiz anahtar sayısı arttıkça şu soru güçleniyor:** aynı metni iki ayrı
anahtarda tutmak neden kolay? Çünkü web sözlüğü ELLE yazılıyor ve mobil
sözlükte zaten var olan bir cümleyi aramak, yeni bir anahtar uydurmaktan
zahmetli. Kapı bunu yakalayamıyor — iki anahtar da "kullanılıyor" ve ikisi de
"var". Yakalamanın yolu metin karşılaştırması olurdu; sözlükler büyüdükçe
yanlış pozitif üretir (aynı kelime iki bağlamda meşru olabilir), o yüzden
yazmadım. Ölçüm turlarında elle bakmak şimdilik daha ucuz.


### 11.175 İkiz anahtarların ölçümü: 46 aday, 11 gerçek

§11.174'te "ikiz anahtar" sınıfını dördüncü kez elle bulunca sayıyı ölçtüm:
**web sözlüğündeki 46 anahtar, ortak sözlükteki bir anahtarla aynı metni
taşıyor.**

**Ama 46'sı da ikiz değil.** "Kelime" hem başarım grubu adı hem değerlendirme
kategorisi; "Görev" hem ortak görev hem yazma görevi. Bunları birleştirmek
**yanlış bir bağ** kurar: birinin metni değişince öteki de sessizce değişir.
Aynı metin ≠ aynı kavram.

Bu turda aynı kavramı taşıyan **on bir** tanesi birleştirildi (görev panosu,
değerlendirme üçlüsü, puanlanıyor, ödül satırları, tekrar notu, "Doğrusu:").
Kalan 35 bilerek duruyor.

**Neden önemli:** aynı cümlenin iki kopyası olduğunda birine yapılan düzeltme
ötekine ulaşmıyor. Bu oturumda dört ikizi tek tek buldum — her biri bir
yüzeyde eski metnin kalmasına yol açabilirdi.

**Kapı yazılmadı, sebebi yazıldı:** "aynı metin = hata" kuralı 35 meşru eş
sesliyi kırmızıya boyar. Ölçüm betiği tekrarlanabilir (scratchpad'de) ve
sözlük büyüdükçe elle bakmak hâlâ daha ucuz. Otomatikleştirilecekse doğru
kural "aynı metin VE aynı bağlam" olurdu; bağlamı kod bilmiyor.


### 11.176 İkiz anahtarlar bitti: 46 → 25, kalanlar gerekçeli

İkinci parti: on ikiz daha ortak anahtara indi — kelime listesinin dört tekrar
etiketi, parola sıfırlama formunun üç alanı, "Kopyalandı", "+{xp} XP kazandın",
"Bağlantı kurulamadı".

**Kalan 25 bilerek duruyor** ve üç sebepten:
1. **Eş sesli, ayrı kavram:** "Kelime" (başarım grubu ↔ değerlendirme
   kategorisi), "Görev" (ortak görev ↔ yazma görevi), "tekrar" (tur çipi ↔
   ayar birimi ↔ ders adımı).
2. **Ayrı yüzey:** e-posta şablonunun başlığı ile uygulamadaki ekran başlığı
   aynı cümle olabilir ama biri e-posta metni, öteki arayüz.
3. **Ayrı özellik:** sınavın "Bölüme başla"sı ile deneme sınavınınki.

**Kural olarak yazıyorum:** iki anahtarı birleştirmenin ölçütü metin eşitliği
DEĞİL, "bu iki yerde metin hep birlikte mi değişmeli" sorusu. Cevap hayırsa
ikiz değil, benzerlik.

Birleştirmenin kazancı somut: aynı cümlenin tek kopyası olduğunda bir
düzeltme her yüzeye ulaşıyor. Bu oturumda dört ikizi tek tek bulmuştum;
yirmi biri toplu ölçümle çıktı.


### 11.177 Ters yön: ortak sözlükte olup yalnız mobilde kullanılan anahtarlar

§11.175'in ölçümünü ters çevirdim: ortak sözlükte (yani mobil kaynağında) olup
**web kodunda hiç geçmeyen** 242 anahtar var. Çoğu meşru ve bir kalıp
gösteriyor:

- **Oturum-kapalı ekranlar** (`daily.sign_in_for_daily_round`,
  `weekly.sign_in_for_weekly_quiz`, `user.sign_in_required`): webde bu
  sayfalar zaten girişin arkasında, mobilde ekran açılıp "giriş yap" diyor.
- **Platform akışları**: bildirim izni hazırlığı (`notifprime.*`), hesap
  silmede yeniden giriş (`deleteaccount.sign_in_with_google_again_and`),
  yürüyüş modu (`walkmode.*` 31 anahtar).
- **Farklı ölçüm**: `exam.speak_missed` (§11.169).

**Gerçek bulgu iki anahtardı:** `exam.sections` ve `exam.minutes`. Android
sınav kapağında bölüm listesini ve toplam süreyi gösteriyor; web kapağı
göstermiyordu — kullanıcı yirmi beş dakikalık bir sınava süresini bilmeden
giriyordu.

**Uygulaması bir kısıtı korumak zorundaydı:** uç kapağı üretirken kâğıdı
HAZIRLAMIYOR ("kapağı açmak haftanın kâğıdını harcamamalı" — uçtaki kendi
yorumu). Madde sayıları ve süre sabit plandan geldiği için kâğıda dokunmadan
eklenebildi.

**Yöntem notu:** "hangi anahtar hangi tarafta kullanılıyor" ölçümü iki yönde
de iş görüyor. Web→mobil yönü ikiz anahtarları verdi (§11.175–176),
mobil→web yönü yüzey eksiğini. İkisi de sözlüğü bir **envanter** gibi okumaya
dayanıyor: her anahtar bir arayüz parçasının kanıtı.


### 11.178 Ölçüm de bir yüzey: Android'in ekran telemetrisi eksikti

Envanter taramasını olay adlarına uyguladım: web istemcisi 40 olay adı
yazıyor, mobil 28. Farkın çoğu meşru (web-özel yüzeyler, tarayıcı mikrofon
tanılaması), ama **üçü değildi**: `page_view`, `time_spent`, `client_error`.

Mobil yalnız sekme dokunuşunu (`nav`) ve günün ilk açılışını yazıyordu. Yani
profil, kelimeler, sınav, ayarlar, yazılarım gibi **yığın ekranları hiç
sayılmıyordu** ve "ekranda ne kadar kalınıyor" sorusu Android için cevapsızdı.

**Bunun bedeli veri yanlılığı:** panodaki ekran tablosu iki platformu
birlikte gösteriyor. Biri ölçmüyorsa tablo yanlı olur ve **bunu okuyan kimse
anlamaz** — eksik veri, yanlış veriden daha sinsi çünkü hiçbir yerde boşluk
görünmüyor.

Web'in dört soruyu tek yerden cevaplayan katmanının mobil karşılığı yazıldı;
süre GÖRÜNÜR süre (uygulama arkaya atılınca sayaç duruyor, üç saniyenin altı
yazılmıyor) ve hata kancası RN'inkini **zincirliyor** — değiştirseydim
geliştirmede kırmızı ekran, üretimde çökme raporu kaybolurdu.

**§44'ün muafiyet listesi üç satır kısaldı.** Listede bu üçü "tarayıcı ölçüm
katmanı" diye yazılmıştı — ama ölçülen şey tarayıcıya ait değil: hangi ekran
açıldı, ne kadar kalındı, hangi hata yakalanmadı. **Muafiyetin gerekçesi,
muafiyetin kendisinden daha çabuk eskiyor.**

**Kapı iki kez yazıldı:** ilk hâli yalnız olay adlarını arıyordu ve
`attachTelemetry()` çağrısı App'ten silinse bile yeşil kalıyordu. Olayın
TANIMLI olması yetmez, katmanın BAĞLI olması da gerek.


### 11.179 Muafiyet listesini tek tek ölçmek: iki satır daha düştü

§11.178'de §44'ün listesinden üç satır düşünce kalan on üçünü tek tek ölçtüm.
İkisi daha eskimişti — ve ikisi de **muafiyet diye yazılmış birer eksiklikti**.

**`sound_toggle`** — "mobilde ses anahtarı yok (sistem sesi)". Cümle doğruydu,
çıkarım yanlıştı: anahtarın olmaması bir muafiyet değil, eksiklik. Mobilde
sesleri susturmanın tek yolu telefonu kısmaktı ve bu **TTS'i de susturuyordu**
— sessiz bir yerde çalışmak isteyen kullanıcı telaffuzu da kaybediyordu. Web
ikisini ayırıyor ve ayrımı kullanıcıya da söylüyor ("telaffuz sesi ayrı — bu
kapalıyken de çalışır"). Aynı ayrım mobilde de var artık.

**`push_open`** — "tarayıcı ölçüm katmanı". Ölçülen şey tarayıcıya ait değil:
kaç kişi bildirimden dönüyor. Mobilde üç dokunuş yolu (arka plan, ön plan,
uygulama kapalıyken) tek bir yerden geçiyor; olay oraya yazıldı.

**Kalan on bir satır gerçekten web-özel:** süre-kazanma modu, koç baloncuğu,
PWA kurulum önerisi, tarayıcı mikrofon yolu tanılaması (`walk_capture`,
`walk_listen`, `walk_switch` — Web Speech'in kendi tuhaflıklarını ölçüyorlar),
etap duraklaması, panel açma (tarayıcıda tek bir tıklama dinleyicisiyle
toplanıyor), davet bağlantısı (mobilde derin bağlantı o adresi karşılamıyor).

**Üç turdur aynı kalıp:** listelerin kendisi denetlenmezse, içindeki gerekçeler
sessizce eskiyor. "Kayıtlı istisna" bir karar değil, bir **borç**; ödenip
ödenmediğine bakmak da ölçümün parçası.


### 11.180 Çağıransız uçların listesi: iki timer hiç kurulmamış

`check:endpoints`in dokuz "belgelenmiş çağıransız uç" satırını tek tek ölçtüm.
Yedisi doğruydu. İkisi bir muafiyet değil, **kurulmamış bir işti**.

`/api/cron/streak-alert` ve `/api/cron/weekly-reminder` deploy edilmişti -
`curl` ikisinden de 401 alıyor, yani yayındalar ve gizli anahtar bekliyorlar.
Ama `systemctl list-timers "lernomi-*"` dört timer gösteriyordu: onları çağıran
yoktu. AGENTS.md'de sebep de yazılıydı ("timer'lar deploy'dan SONRA kurulacak")
ve kurulmamıştı.

Görünen yüzü: iki uygulamanın ayarlarında "seri koruma" ve "haftalık sınav"
anahtarları açılabiliyor, karşılığında **hiçbir bildirim gitmiyordu**. Kapı
"çağıransız ama belgeli" diyerek bunu sessizce onaylıyordu.

İki systemd timer kuruldu (git dışı işletim işi): `lernomi-cron-streak` her
saat 17-21 UTC, `lernomi-cron-weekly` pazar 15-19 UTC - saatler `vercel.json`
daki eski cron'larla aynı. Uçlar kullanıcının KENDİ saatine bakıyor ve
`last_reminder_day` günde tek bildirim garantisi veriyor, o yüzden sık
çalışmaları sakıncasız. Elle tetiklemedim: gerçek bildirim giderdi.

`/api/premium/consume` yeniden ölçüldü, §11.24'teki teşhis geçerli: bugün
zarar yok, bağlamak ücretsiz kullanıcının yürüyüş modunu kapatırdı. Ürün
kararına bağlı, kayıt olduğu gibi duruyor.

### 11.181 Koyu temada kart gölgesi yoktu - ve o alan kapının kapsam dışıydı

`check:colors`ın dokuz mobil istisnasını tek tek ölçtüm. Sekizi doğruydu
(konfeti kimlik listesi webinkiyle birebir, avatar zemini webdeki satırla aynı
değer, varsayılan şapka rengi kullanıcı aksesuarı). Dokuzuncusu -
`#5a3418`, "gölge tinti, **iki temada da aynı olması bilinçli**" - yanlıştı.

Web bu ayrımı baştan yapıyor: `.dark` bloğunda gölge siyaha dönüyor ve 0.16'dan
0.45'e derinleşiyor, çünkü sıcak kahve bir gölge koyu zeminde görünmüyor.
Mobilde yedi kart çağrısı da sabit `#5a3418` geçiyordu. Sonuç: koyu temada
kartlar, sekme çubuğu, tur kartları ve ayarlardaki seçili tema düğmesi
yükseltilerini kaybediyordu - gölge vardı ama görünmüyordu.

Üstelik webin yanındaki yorum yanlış bir varsayım taşıyordu: "Android'in
`elevation`'ı koyu temada aynı şeyi zaten yapar". Yapmıyor - `elevation`
gölgeyi `shadowColor` ile boyuyor ve oraya sabit kahve geçiliyordu.

Palete iki jeton eklendi (`shadowTint`, `shadowStrength`) ve nötr gölge için
`cardShadow(colors, elevation)` yazıldı. Renkli gölgeler (`softShadow(
colors.primary, 8)`) bir vurgu, dokunulmadı.

**Kapının kör noktası tam da buydu:** `check:tokens` gölgenin y/bulanıklık/
opaklık formülünü ölçüyordu ama RENGİNİ ölçmüyordu ve koyu temayı "webe özgü"
diye kapsam dışı bırakmıştı. Artık iki temanın da tintini ve gücünü ölçüyor.
Dört enjeksiyonla denendi.

### 11.182 Ders sınavındaki iki düğme tıpatıp aynıydı

`i18n-hardcoded` tabanını denetlerken çıktı: web `lesson-player`da doğru/yanlış
düğmeleri ikisi de nötr `option` sınıfıydı. Android'de ikisi dolu ve anlamının
rengini taşıyor - yeşil onay, kırmızı çarpı. Ders akışında en hızlı okunması
gereken yer orası; web onu iki tıpatıp aynı düğmeyle soruyordu. Eşitlendi
(yazı `on-fill` jetonundan, çünkü dolgu koyu temada açılıyor).

Tabanların kendisi temiz çıktı: mobildeki on yedi dizginin ve webdeki 163'ün
hepsi meşru (kurs adları zaten üç dilde yazılı, içerik çözücünün desenleri,
Goethe'nin Almanca bölüm adları, model istemleri, konsol kayıtları, dil adının
kendi dilinde kalması). Gerekçeleri artık taban dosyasında yazılı - **sayı da
bir muafiyet listesi ve sebebi yazılmazsa eskiyor**, bu turun dört kaydının
ortak dersi bu.

Denetimi pahalı yapan şey webdeki tarayıcının `--hits` bayrağının olmamasıydı;
mobilde vardı, eklendi.


### 11.183 Aynı kelime webde daha kolaydı: kayıtsız bedava ipuçları

Web-özel sözlükteki (`src/i18n/web/*`) yirmi dört `rounds.*` anahtarını tek tek
ölçtüm. Her biri Android'de OLMAYAN bir satırın ekrana çıkması demek.

**Üçü bedava ipucuydu** ve üçü de `hintUsed` göndermiyordu:

| tur | webin fazladan verdiği |
|---|---|
| yazma | "12 harf · S ile başlıyor" (başlıkta, her zaman açık) |
| çeviri | odak kelimesinin chip'i + "{n} kelime" |
| boşluk doldurma | yer tutucunun içinde kelimenin ANLAMI |

Android'de üçü de yok: harf sayısı ancak ipucu düğmesine basınca (iskelet)
görülüyor ve o düğme `hintUsed` gönderip SRS kalitesini 3'e kırpıyor. Yani
**aynı kelime iki platformda farklı zorlukta soruluyordu ve sunucu iki cevabı
aynı kalitede sayıyordu**. Bir ipucunun kaydedilmemesi yalnız adaletsizlik
değil, ölçüm hatası: tekrar aralığı yanlış hesaplanıyor.

**Dördü etiketin tekrarıydı** - aynı soru üst üste iki kez: "DOĞRU MU?" +
"Bu eşleşme doğru mu?", "DİNLE · ANLAMINI SEÇ" + "Duyduğun kelime ne demek?",
"ÇOĞUL" + "— çoğulu hangisi?", hoparlör düğmesi + "Tekrar dinlemek için dokun".

**Biri ters yöndeydi.** `rounds.ai_accepted`: modelin kurtardığı çeviride web
"Anlamca doğru — başka bir kuruluş" yazıyor. Android hükmü `exact`e çevirip
"tam doğru" diyordu - kullanıcının kuruluşu hedefle aynı değilken aynıymış gibi.
Kalite 4 vermek doğru, BAŞLIK yanlıştı. Anahtar ortak sözlüğe taşındı.

Kapı: parity-check **§92** (yazma turu ipucu yüzeyi: bedava harf ipucu var mı,
iskelet düğmenin arkasında mı, düğme cezayı yazıyor mu) ve **§93** (tur
ekranlarındaki web-özel metinlerin gerekçeli listesi - kalan on beşi serbest
yazma turu, ekran okuyucu etiketleri ve tarayıcıda TTS olmama ihtimali).

**Kalıp:** "webin kendi sözlüğü" bir muafiyet listesi ve denetlenmeyen her
muafiyet listesi gibi sessizce büyümüş. Bu turun üçüncü örneği.


### 11.184 Android yanlış cevapta kuralı söylemiyordu

§11.183'te web-özel sözlüğün `rounds.` uzayını denetlemiştim. Aynı denetimi
öteki uzaylara uygulayınca en büyük ayrışma çıktı: **`why.*` 19, `whyrule.*`
25, `artrule.*` 12, `plrule.*` 6, `sphint.*` 9 — hepsi web-özel; mobilde
toplam DÖRT `why.*` anahtarı vardı.**

Sebebi `mobile/src/game/why.ts`in başında yazılıydı: "Tam gramer tabloları
(artikel eki, çoğul desenleri) taşınmadı. En sık hatalara yönelik yardımcı,
tek cümlelik ipucu." Yirmi dokuz satırlık dosya, yanlış cevapta yalnız doğru
cevabı tekrar ediyordu:

| | web | Android |
|---|---|---|
| artikel | "-ung, -heit, -keit ile bitenler dişil — die Wohnung." | "die Wohnung." |
| çoğul | "Umlaut + -er: das Buch → die Bücher." | "Doğrusu: Bücher." |
| yazım | "Kirche ch ile, Kirsche sch ile." | (yok) |
| cümle | "weil ile başlayan yan cümlede fiil sona gider." | (yok) |
| hâl | "mit, aus, bei, nach… Dativ ister." | (yok) |

**Üç turda hiç gerekçe yoktu:** boşluk doldurma, harf dizme ve cümle dizme
`why` alanını hiç doldurmuyordu.

Taşınanlar, gövdeleri webinkiyle birebir: `why.ts` (29 → 360 satır),
`whyRules.ts` (35 kural parçacığı), `confusables.ts` (148 karıştırma çifti),
`german.ts`e `parsePluralRule`/`pluralOf`, `errors.ts`e `ERROR_LABEL_KEYS`.
90 metin webin kendi sözlüğünden ortak sözlüğe geldi; eskiyen dört anahtar
düştü. Turlar da doğru hata tipini gönderiyor artık (dinleme turu "meaning"
yerine "listening", yazma turu `classifyTyping` ile).

Üç yeni kapı: §94 kural tabloları (artikel kurallarının SIRASI dahil — ilk
uyan kazanıyor), §95 kural parçacıkları, §96 karıştırma çiftleri. Üçü de
mobil `i18n-scan`in yeni muafiyetlerinin karşılığı: **muafiyet eklemek kapı
eklemeyi gerektiriyor**, bu depoda yazılı kural.

**Bu turun dersi:** "port edilmedi" diye yazılmış bir not, üzerinden zaman
geçince bir karar gibi okunuyor. Beş turdur ölçtüğüm şey hep aynı: yazılı
gerekçe denetlenmezse eskiyor. Bu seferki en pahalısıydı — öğrenme
uygulamasında "neden yanlış" açıklaması bir ayrıntı değil, ürünün kendisi.


### 11.185 Yürüyüş modunda ağ hatası "tur bitti" gibi gösteriliyordu

Web-özel sözlüğün `walk.` uzayını (45 anahtar, mobilde 13) denetlerken çıktı.
İki uygulamanın yürüyüş modu farklı adlandırma kullanıyor (mobil `walkmode.*`
+ `walk.*`, web yalnız `walk.*`) ve o ayrım tek başına bir hata değil; altında
duran şey hataydı.

Android'de walk kuyruğunu getiren **iki çağrının da `catch`i sessizdi**. İlkinin
yanındaki yorum eskimişti: "girişsiz/hatada demo kalır" - demo yolu kaldırılınca
geriye BOŞ kuyruk kalıyordu.

Sonuç: kullanıcı "Başla"ya basıyor, mikrofon izni isteniyor, ekran kilidi
açılıyor, arka plan servisi başlıyor, açılış sesi çalıyor, karşılama okunuyor
ve tur hemen **"Tur bitti! 0/0 · Kaydedildi"** ekranına düşüyor. Bir ağ hatası
bitmiş tur gibi gösteriliyordu; tekrar zamanı gelen kelime olmadığında da aynı
şey oluyordu. Web üç ayrı ekran çiziyor: hata, izin yok, boş.

Kapı: §97 dört çıkmaz durumu ölçüyor. `unsupported` ölçüm dışı - tarayıcının
konuşma tanıması olmayabilir, Android kendi tanıyıcısıyla geliyor.

### 11.186 Rol yapma sınavı Android'de hiç yoktu

`lessonp.` uzayının denetimi (43 web-özel anahtar, mobilde 6) WP-22'ye çıktı.
Web ders özetinde "Sınav olarak dene" düğmesi var ve `/lessons/[id]/exam`
yüzeyine gidiyor: aynı sahne, yardım yok, 5 tur, 3 dakika, sonunda BÜTÜN
turların tek seferde rubrikle puanlanması ve `assessments`'a yazılması.

Android'de bu yüzey hiç yoktu. Kayıt defterinde §11.34'te bir kenar notu olarak
duruyordu ("Android'de rol yapma dersin içinde bir aşama, ayrı sınav yüzeyi
yok") - bir eksik olarak değil, bir olay adının neden eşlenemediğinin gerekçesi
olarak. **Aynı dersi bitiren iki kullanıcıdan yalnız biri ölçülebiliyordu.**

Taşınan: beş fazlı sınav ekranı (giriş, konuşma, puanlama, sonuç, hata), geri
sayım, mikrofon tek atış + yazı yolu, rubrik kartı (görev/yapı/dilbilgisi/
kelime, 0-4), en iyi iki cümle, en sık iki hata tipi, yapabilirlik satırı;
`candoMap` (tablolar weble birebir, metin `/api/cando`dan); `roleplay.ts`e
`mode` parametresi; ders özetine giriş düğmesi. 25 metin ortak sözlüğe geldi.

**Bilinçli tek fark:** sağlayıcı kapalıyken web kural tabanlı bir yedek puan
gösteriyor (`fallbackAssessment`), mobil hiç puan vermiyor. Bu ayrım mobilde
zaten yerleşik (`ExamScreen` yazma adımı, `assess.fail_*`) ve ölçülmemiş bir
sınavı ölçülmüş gibi göstermemek daha doğru.

Kapılar: §98 sınavın sözleşmesi, §99 yapabilirlik eşlemesi.

**Kapının kendi hatası da kayda değer:** §98'in "gün anahtarı" ölçümü ilk
yazımda BİRLEŞİK gövdeye bakıyordu ve ders oynatıcısının kendi `day:` satırını
görüp yeşil kalıyordu - sınavdan `day` silindiğinde kırmızı olmadı. Bu, §73/§78
ile aynı sınıf: **ölçüm penceresi komşu dosyanın satırını çalıyor.** Her taraf
artık kendi isteği kuran dosyadan okunuyor.


### 11.187 Hayatta kalma turu Android'de hiç yoktu

`challenge.` uzayı: webde 22 anahtar, mobilde **bir** (`challenge.seconds`,
patron turunun sayacı ödünç alıyordu).

Web'de `/learn/challenge` baştan beri var: 40 saniyeyle başlayan, her doğru
cevapta süre kazandıran, yanlışta yakan, üst üste doğrularda puanı 3 katına
çıkaran, üç dalgada sertleşen mod. Uç (`/api/challenge`) ve dalga mantığı
sunucuda duruyordu. **Android'de ekran yoktu**, yani aynı rekor tablosuna
yalnız tarayıcıdan oynayanlar yazıyordu.

Bu sefer not tek yerde değil ÜÇ yerde duruyordu ve üçü de "bilinçli" gibi
okunuyordu:
- `challenge-player.tsx` başlığı: "Mobilde bu modun karşılığı YOK"
- `learn-hub.tsx`: "Hayatta kalma mobilde YOK — web'e özel bir mod"
- `mobile/lib/pushRoute.ts`: "`/learn/challenge` burada YOK, çünkü mobilde
  karşılığı olan bir ekran yok"

Üçüncüsünün bedeli ölçülebilirdi: bildirimden gelen `/learn/challenge` mobilde
ana sekmeye düşüyordu.

Bir de ters yönde bir yalan vardı: `learn/mode-screen.tsx` "Mobilde üçü de kök
yığında ayrı ekran (`RootStack`: Daily, Walk, Challenge karşılığı)" diyordu -
üçüncüsü yoktu.

Taşınan: altı fazlı ekran, zaman damgasından okunan geri sayım, kombo çarpanı,
dalga rozeti, kombo/dalga duyuruları, son saniyelerin tık sesi, sonuç kartı;
menü girişi; `pushRoute` yolu. Sayılar birebir (kapı §100 hepsini ölçüyor,
giriş noktası dahil - ekran varsa ama menüde yoksa kimse bulamaz).

`check:endpoints` bu işi kendisi haber verdi: "WEB_ONLY listesinde olup artık
mobilde de çağrılan uç: /api/challenge". **Kapı, taşımanın tamamlandığını
söyleyen ilk şey oldu.**

### 11.188 Patron turunda cevap süresi bütün turun süresiydi

Aynı dosya ailesini okurken çıktı: `BossScreen` her cevapta `latencyMs`i
`startedAt`ten hesaplıyordu ve o, bütün patron turunun başlangıcı. Onuncu
kelimenin gecikmesi "oyuna başlayalı kaç saniye oldu" diye gidiyordu. Gecikme
SRS'te ve hata çözümlemesinde okunuyor; `GameScreen` baştan beri tur başına
ölçüyor.

Aynı dosyanın başındaki "son saniyelerin tık sesi BURADA YOK" notu da
eskimişti - `danger` sesi ses tablosuna eklendiğinde kod düzelmiş, yorum
kalmıştı.


### 11.189 Yazma egzersizi kısa cevap yazanda bitirilemiyordu

`writp.` uzayı: webde 19 anahtar, mobilde bir. Beceri kütüphanesinin yazma
görevini karşılaştırınca beş ayrışma çıktı, biri **engelleyiciydi**.

**Gönder düğmesi asgari kelime sayısına bağlıydı** (`words >= minWords`) ve
atlama düğmesi yoktu. Asgariye ulaşamayan öğrencinin görevi kapatma yolu hiç
yoktu: `onSettle` çağrılmıyor, `onAllDone` gelmiyor, **egzersiz bitmiyordu.**
Web kısa metni de değerlendiriyor, yalnız görevi "tamamlandı" saymıyor
(`writp.min_words_note`) ve altında "bu görevi atla" duruyor.

Bu, aynı dosyada geçen turlarda bulunan sınıfın aynısı (`form` ve `rewrite`
kartlarının `minWords` alanı olmadığı için hiç kapanamaması, 356 egzersizin
190'ı) — bu sefer sebep eksik alan değil, fazla katı eşik.

Dördü daha:
- düşük puandan sonra **tekrar deneme yolu yoktu**; görev değerlendirme anında
  kapanıyordu. Artık sonuç ekranında kapanıyor (Devam / Bir daha dene), web de
  öyle yapıyor.
- 40 altı ve 40-60 arası için ayrı öneri satırı yoktu.
- **kalıp çipleri yalnız seslendiriyordu.** Yazma görevinde kalıp listesi bir
  telaffuz alıştırması değil, yazarken kullanılacak malzeme: webde dokununca
  metne ekleniyor. Ne yaptıklarını söyleyen satır da yoktu. Okuma yolu uzun
  basışta duruyor.
- cümle hükmü tek bir boole idi (`written`, bütün dizede levenshtein ≤ 1): iki
  harflik sapma da sıra hatası da "yanlış" oluyordu. Artık `matchSentence`:
  tam doğru / yazım sapması / sıra hatası ayrı söyleniyor ve geçme ölçütü web
  ile aynı (exact + spelling).

### 11.190 Cümle kurma görevi Android'de düz bir metin kutusuydu

Aynı karşılaştırmanın en büyük tasarım farkı: web `BuildTask` karışık
PARÇALAR veriyor (dokunarak kur, iki yanlıştan sonra cevap açılır); Android
kart aynı içeriği boş bir metin kutusuyla soruyordu. **"Cümleyi KUR" adının
karşılığı yalnız webde vardı** ve aynı görev iki platformda iki farklı
zorluktaydı.

Taşındı: parça çipleri, tohumlu diziliş, iki yanlışta açılma, ilk yanlıştan
sonra ipucu, temizle, doğruda onay satırı. `lib/shuffle` webin
`seededShuffle`inin birebir portu.

Kapılar: §101 yazma görevinin on bir noktası, §102 karıştırma gövdesi.

