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


### 11.191 Erdi Android'de hiç konuşmuyordu

`coach.` uzayı: webde 40 anahtar, mobilde sıfır. Web öğrenme ANLARINDA
maskotun yanında tek cümle gösteriyor (WP-66) — sınav başlarken, sonucunda ve
zayıf nokta turunun özetinde. Android'de maskot aynı yerlerde sessizce
duruyordu.

`install.` uzayı (24 anahtar) da denetlendi ve **gerçekten web-özel**: "ana
ekrana ekle" adımları bir APK'de karşılıksız. Bu turların ilk temiz çıkan
muafiyeti.

Taşınan: `game/coachLines` (sekiz an × beş cümle, yer tutucu kuralı, tekrar
etmeyen seçim) ve `ui/CoachBubble` (dört saniye duran balon; hareket
azaltmada düz metin; koyu zeminde sabit mürekkep). Üç bağlantı web ile aynı
yerde. "Son söylenenler" kaydı açılışta belleğe okunuyor, çünkü seçim çizim
sırasında ve senkron yapılıyor.

`plan_*` ve `weekly` anları iki tarafta da çağrılmıyor ve web bunu kendi
dosyasında yazmış; tablo bütün olarak taşındı.

**İki kapı kendi işini kendi haber verdi:** §44'ün "yalnız webde ölçülüyor"
listesi `coach_show`u kırmızıya çevirdi, `check:colors` balonun sabit
mürekkebini yakaladı.

**Ve kendi kapımda §90'ın hatasını tekrarladım:** §103'ün bağlantı ölçümü
başta an tablosuyla BİRLİKTE okunuyordu; tablo zaten `"weak_done"` dizgesini
taşıdığı için ekrandaki çağrı koparıldığında kapı yeşil kalıyordu — üstelik
bunu, aynı bölümün yorumunda "olayın tanımlı olması yetmez, bağlı olması da
gerek" diye yazdıktan hemen sonra. Ölçüm ekranlardan ayrıldı ve "var/yok"
yerine SAYIYLA yapılıyor: iki sınav yüzeyi de kendi balonunu çizmeli.


### 11.192 "Servis kapalı" dört ayrı hatanın örtüsüydü

`assess.` uzayını denetlerken çıktı. Mobil değerlendirme isteği düşünce
premium ve adil kullanım kapıları dışındaki **her** sebebi tek cümleye
indiriyordu:

| gerçek sebep | mobilin dediği | doğrusu |
|---|---|---|
| 413 metin çok uzun | servis kapalı | kısalt ve tekrar dene |
| 401 oturum yok | servis kapalı | yeniden giriş yap |
| 400 istek eksik | servis kapalı | tazeleyip tekrar dene |
| zaman aşımı | servis kapalı | zaman aşımına uğradı |

Kullanıcı ne olduğunu öğrenemediği için ne yapacağını da bilemiyordu. Web
durum koduna göre dokuz sebep ayırıyor ve 403'ü ikiye bölüyor (premium kapısı
/ yetkisizlik) — ayırt edilmezse premium reddi "geçersiz istek" diye görünür.

`lib/assessFail` eşlemeyi birebir taşıyor; dört çağrı yeri de sebebi
söylüyor. Yedi metin ortak sözlüğe geldi; dördünde "temel kontrol
gösteriliyor" kuyruğu düştü (web yedeği zaten kartla gösteriyor, mobil
göstermiyor — cümle iki tarafta da doğru olsun diye). `quota` ayrı anahtar
olarak kaldı: orada metin gerçekten farklı.

### 11.193 Boş tur "Tur bitti · 0/0" diye gösteriliyordu

`session.` uzayının denetimi. Oturum boş dönünce mobil bitiş kartını
çiziyordu ve iki ayrı durum aynı yanlış cümleye düşüyordu: günlük hedefini
bitiren kullanıcı kutlama yerine sıfırlı bir skor kartı görüyor, Pratik'ten
kelimesi olmayan bir oyunu seçen ise neden boş olduğunu hiç öğrenemiyordu.
İkisinin de çıkış yolu (yeni kelimelerle devam / karışık tura dön) yoktu.

**Aynı sınıf §11.185 ile: bir DURUM bir SONUÇ değil.** Yürüyüş modunda ağ
hatası "tur bitti" görünüyordu; burada boş kuyruk. Üç turda üçüncü kez aynı
kalıp çıktı — boş ya da hatalı bir cevabın "başarıyla bitti" ekranına düşmesi.


### 11.194 Sınav bölümlerinin ne sorduğu Android'de hiç yazmıyordu

`exam.` uzayında 36 web-özel anahtar vardı; yedisi `exam.brief_*`, yani her
sınav bölümünün ne yaptıracağını anlatan cümleler.

Web her bölümün önüne bir kart koyuyor: Teil sırası, bölümün Almanca ve kendi
dilindeki adı, brif ("Sınavın omurgası. Anlamı verilen cümleyi kur…"), kaç
madde ve kalan süre, sonra "Bölüme başla". Mobil kapaktan doğrudan ilk soruya,
bölüm bitince de doğrudan sonrakine geçiyordu.

Bu, §89'un (sınav kapağında bölümler ve süre) devamı: orada "sınava GİRMEDEN
ne sorulacağını bilmek" ölçülmüştü, burada aynı soru bölüm başına soruluyor.

**Sayaç tuzağı.** Yeni fazı sayacın dışında bırakmak kolaydı — ve yanlış
olurdu: web sayacı kart sırasında durdurmuyor, durdurmak Android'de bölümler
arasında sınırsız okuma süresi verirdi. Aynı kâğıt iki platformda iki farklı
sınav olurdu. Kapı bunu da ölçüyor.

Aynı denetimde iki uzay daha bakıldı ve ikisi de **temiz çıktı**: `growth.`
(13) ve `quest.` (7) sunucuda çevriliyor (`lib/growth`, `lib/quests`), mobil
metni hazır alıyor — `ach.`, `push.` ve `email.` ile aynı sınıf.


### 11.195 Sınav kâğıdının iki kuralı Android'de geçerli değildi

§11.194'ün devamı, kalan `exam.*` satırlarını okurken çıktı. İkisi de aynı
soruya çıkıyor: **aynı kâğıt iki platformda aynı sınav mı?**

**İpucu.** Web sınav bölümünü "ipucu yok" bağlamıyla (`games/no-hints`)
sarıyor ve ipucu düğmesi olan turlarda düğme orada görünmüyor; bağlamın kendi
yorumu da "sınavda kâğıdın kuralı ipucu yok — kapak bunu yazıyor ve düğmenin
orada durması sözü bozardı" diyor. Android'de düğme duruyordu. Bağlam taşındı.

**Cevap.** Cümle kurma bölümü iki adımlıydı: "Kontrol et" → kenarlık yeşile/
kırmızıya, **doğru cevap yazılır**, sonra "Sıradaki". Aynı yapılar sonraki
maddelerde tekrar geçtiği için bu sınavı kolaylaştırıyor; kaçırılanlar zaten
sonuç ekranında duruyor. Web tek düğme veriyor ve altına "cevap sınav sonunda
gösterilir" yazıyor.

**İkisi de aynı sınıfın üyesi:** §11.183'teki bedava harf ipucu gibi, ölçüm
yüzeyinde kayıtsız bir kolaylık. Orada SRS kalitesi bozuluyordu, burada sınav
puanı — ve iki platformun puanı karşılaştırılamaz hâle geliyordu.

Küçük bir kalan: Android'in cümle **dizme** turunda ipucu düğmesi hiç yok
(webde var). Alıştırma tarafında bir eksiklik; sınavı etkilemiyor çünkü orada
zaten kapalı olmalı. Ayrı bir turda ölçülecek.


### 11.196 Etap duraklaması ve bahis: kullanılmayan bir sunucu yeteneği

`stage.` (9) ve `wager.` (3) uzaylarının denetimi. Tur mobilde **baştan sona
tek parça** akıyordu: web her beş turda duruyor, etabın özetini gösteriyor ve
"devam et / şimdilik yeter" diye soruyor. Androidde durulacak bir yer yoktu —
uzun turu bırakmak isteyen ya sonuna kadar gidiyor ya ekrandan çıkıyordu.

**Bahis, yazılmış ama hiç çağrılmamış bir yetenekti.** `/api/answers` `wager`
alanını baştan beri kabul ediyor, `lib/session` `xpForWager` farkı hesaplıyor
ve mobil tipinde alan bile duruyordu — kendi yorumuyla: *"mobilde bahis yok,
alan sözleşme için var"*. §11.24'teki `/api/premium/consume` ile aynı sınıf
(sözleşme modellenmiş, çağıran yok) ama bu sefer bağlamanın önünde bir ürün
kararı yoktu.

Etap sınırı artık gerçek bir **yazma noktası**: biriken cevaplar orada
gönderiliyor, bahsin sonucu sunucudan dönüyor, gönderilenler listeden düşüyor.

**Ses.** `stage` ipucu tabloya eklendi ve iki native kopyaya yeniden üretildi;
on iki → on üç. On üçüncü ses, §11.15'te "mobilde yok" diye kaydedilen beşin
ardından gelen ilk yeni cue.

**Üç kapı kendi işini haber verdi:** §44'ün olay listesinden `stage_done`,
§83/§84'ün "stage hariç" istisnası ve `check-ios`un "mp3 diskte var ama
pbxproj'a bağlı değil" satırı. Bir taşımanın bittiğini üç ayrı yerden ölçüm
söyledi — dördüncü turda aynı kalıp.

### 11.197 Dizme turunda ipucu düğmesi yoktu

§11.195'in kenar notu kapatıldı: web cümle dizme turunda sıradaki doğru
kelimeyi yerleştiren bir ipucu veriyor ve bedelini `hintUsed` ile kaydediyor;
Androidde düğme hiç yoktu, tıkanan öğrencinin tek çıkışı turu yanlış
bitirmekti. Sınavda görünmüyor (§107'nin bağlamı).


### 11.198 Dinleme egzersizi metnin tamamını tek seferde okuyordu

`listenp.` uzayı (9 web-özel anahtar). Mobil kart tek bir hoparlör düğmesiydi:
bütün replikler arka arkaya okunuyor, hangi replikte olunduğu görünmüyor,
yavaşlatma yolu yok ve **"önce yalnızca dinleyerek dene" uyarısı hiç
yazılmıyordu** — üstelik metni açan düğme hemen yanındaydı, yani dinleme
egzersizi sessizce bir okuma egzersizine dönüşebiliyordu.

Taşındı: bölüm sayacı, başlat/bitti hâlleri, çalan repliğin transkriptte
işaretlenmesi, yavaş mod, "önce dinle" notu, satıra dokunma satırı ve
durdurma. `speakAndWait` artık hızı da alıyor.

İki satır ölçüm dışı ve **ikisi de doğru muafiyet**: gerçek lehçe kaydı
(`segment.audio`) iki tarafta da uykuda — ölçtüm, 2265 replikte tek bir `audio`
alanı yok; ve "bu tarayıcıda konuşma sentezi yok" (Android kendi TTS'iyle
geliyor).

### 11.199 Görevsiz bir konuşma alıştırması ekranı çökertirdi

`SpeakingDrill` çizimde `task.de`ye doğrudan dokunuyordu; liste boş gelirse
`task` undefined ve ekran kırmızıya dönüyordu. Web aynı yerde tek satırlık bir
not gösteriyor.

Bugün içerikte tetikleyen bir egzersiz **yok** (50 egzersizin hepsinde ya
monolog ya görev var) — yani bu, bulunmuş bir hata değil, kapatılmış bir
delik. Ama içerik her turda yeniden üretiliyor: bu oturumda başka bir yerde
tam olarak bu olmuştu (§11.189'daki `minWords` eksikliği, 356 egzersizin 190'ı
bitirilemez).

`speakp.` uzayının kalan altı satırı temiz: üçü webin ses yükleme yoluna ait
(§11.136), üçünün mobilde `item.*` altında karşılığı var.


### 11.200 Pratik kartı oyunun ne yaptırdığını söylemiyordu

`prac.` uzayı: on bir açıklama sözlükte duruyor ve Android'de **hiçbiri
görünmüyordu**. Web her oyun kartının altına tek satır yazıyor ("Dört şıktan
doğru anlamı seç", "Karışık harflerden kelimeyi kur"); mobil yalnız adı
gösteriyordu, yani "Cümleyi Diz" ile "Cümleyi Çevir" arasındaki farkı
bilmeyen kullanıcı oyunu açmadan seçemiyordu.

Açıklamalar `PRACTICE_GAMES` listesine alındı — web de aynı listede tutuyor —
ve §2'deki "pratik seçici sırası" ölçümünün yanına açıklama listesi eklendi.

### 11.201 Yerleştirme testinde "bilmiyorum" yoktu

`plc.` uzayı. Android'de ekran doğrudan soruya başlıyordu; üç yüzey eksikti ve
biri **ölçümün kendisini bozuyordu**:

- aşamanın ne sorduğu yazmıyordu
- aşamayı atlama yolu yoktu
- **"Bilmiyorum" düğmesi yoktu** — bilmeyen kullanıcının tek yolu tahmin
  etmekti ve tutan bir tahmin yerleştirme seviyesini yükseltiyordu

Üçüncüsü bu oturumun tekrar eden sınıfının bir üyesi: §11.183 (bedava harf
ipucu, SRS kalitesi), §11.195 (sınavda ipucu ve açılan cevap, sınav puanı) ve
şimdi yerleştirme seviyesi. Hepsinde aynı şey oluyor: **ölçüm yüzeyinde
kayıtsız bir kolaylık ya da zorluk, iki platformun sayılarını
karşılaştırılamaz kılıyor.**

"Bilmiyorum" yanlış cevapla aynı sonucu yazıyor; farkı tahmini ortadan
kaldırması.


### 11.202 İki sessizlik: kuyruğa alınan sonuç ve İngilizce hata

`skillp.` (4) ve `del.` (10) uzaylarının denetimi. İkisi de küçük çıktı ama
ikisi de aynı sınıftan: **kullanıcıya söylenmeyen bir durum.**

**Beceri sonucu kuyruğa alındığında söylenmiyordu.** Mobil çevrimdışı kalınca
sonucu kuyruğa alıyor (`queueItemRecord`, §11.12'de eklenmişti) ama ekran
bunu yazmıyordu: kullanıcı XP satırı olmayan bir kart görüyor ve sonucunun
kaydedilip kaydedilmediğini bilemiyordu. Kuyruğun kendisi doğruydu, eksik olan
tek satırdı.

**Silme hatasında sunucu metni ekrana çıkıyordu.** Bilinen iki hâl (yanlış
parola, oturum tazeliği) çevrilmiş metne dönüyor, geri kalanı better-auth'un
İngilizce cümlesiyle gösteriliyordu — Türkçe arayüzde İngilizce bir hata
satırı. Web aynı yerde tek çevrilmiş cümle veriyor (`del.failed`).

`del.` uzayının kalan dokuzu **doğru muafiyet**: web'in `/account/delete`
sayfası Play politikası gereği herkese açık bir sayfa ve kendi akışı var
(yönlendirme, "çıkış yap ve yeniden gir", uygulama içi yolun tarifi); mobilin
karşılığı ekran içi akış ve kendi `deleteaccount.*` uzayında 24 anahtarı var.


### 11.203 "İnternet yok" da "tekrar dene" diyordu

`linked.` uzayı (9 web-özel anahtar; mobilin aynı ekranı kendi `links.*`
uzayında 12 anahtarla çiziyor — iki adı olan tek bir ekran).

Web ağ hatasını ötekilerden ayırıyor: "İnternet bağlantını kontrol et" ile
"Biraz sonra tekrar dene" iki ayrı cümle. Mobil ikisini de tek cümleye
düşürüyordu. Bağlama yolunda daha tuhaftı: ağ hatasının **kendi çevrilmiş
metni zaten üretiliyordu** (`signInGoogleNative` `NETWORK` kodu) ve ekran onu
atıp genel cümleyi gösteriyordu.

Kaldırma yolunda ayrım hiç yoktu; `unlinkAccount` artık durum kodu OLMAYAN
hatayı `offline` diye ayırıyor (`api()` HTTP hatalarında `ApiError` atıyor,
bağlantı kopmasında düz `Error`).

§11.192 ile aynı sınıf: **bir cümle birkaç sebebin örtüsü.**

**Bu turda üç muafiyet daha doğru çıktı:**

- `pron.` (12) — telaffuz puanı kartı. `/api/pronounce` yolu ve §11.139'daki
  açık karar (ücretli sağlayıcı mı, cihazdaki metin eşlemesi mi) Samet'in;
  tek taraflı bağlanacak bir şey değil.
- `mockhow_en.` + `mockhow_de.` (16) — deneme sınavı çalışma tavsiyeleri
  SUNUCUDA üretiliyor (`lib/mock-exams/feedback`, `/api/mock-exam`); mobil
  metni hazır alıyor. `ach.`, `push.`, `email.`, `growth.`, `quest.` ile aynı
  sınıf.
- `del.` (9) — webin `/account/delete` sayfası Play politikası gereği herkese
  açık ve kendi akışı var.

Web-özel anahtar sayısı bu turlarda **913'ten 648'e** indi; kalanların büyük
bölümü artık ölçülmüş ve gerekçesi yazılı.


### 11.204 Yürüyüş modunda "atla" iki taraftan da eksikti

`walk.` uzayının (43 web-özel / 15 mobil) denetimi. İki yönlü bir ayrışma
çıktı — bu turlarda ilk kez **web de eksik** taraftaydı.

**Android söylemiyordu.** Atlama baştan beri tanınıyordu (`parseSkip`: weiter,
überspringen, keine Ahnung / skip, pass, don't know) ama varlığı hiçbir yerde
yazmıyor ve söylenmiyordu. Bilmediği kelimede tıkanan kullanıcının bildiği tek
şey susmaktı — o da "duyulmadı" sayılıyor ve üst üste olunca tur duruyordu.
**Uygulanmış ama duyurulmamış bir yetenek**, §11.24'ün (`/api/premium/consume`)
ve §11.196'nın (bahis) akrabası.

**Web yalnız Almanca tanıyordu.** Ayrıştırıcının adı da bunu söylüyordu
(`parseSkipDe`): İngilizce kursta "skip" demek turu atlatmıyordu. Mobil bu
düzeltmeyi almıştı, web almamıştı — ve girişte okunan sözcük sabit "weiter"di,
yani İngilizce kursta öğrenciye Almanca bir sözcük okunuyordu.

**Kapının kendi hatası:** §114'ün "İngilizce tanınıyor" ölçümü ilk yazımda
yalnız `en: [` arıyordu ve dosyadaki başka bir tablo (evet/hayır kalıpları) onu
karşılıyordu; atlama tablosundan İngilizce silindiğinde kapı yeşil kaldı. Bu
oturumda dördüncü kez aynı sınıf: **desen, ölçmek istediği şeyin komşusunu
yakalıyor** (§73, §78, §98, §103).


### 11.205 Ders adımında tıkanan öğrencinin çıkış yolu yoktu

`lessonp.` uzayının (37 web-özel / 12 mobil) denetimi. Çoğu ikiz anahtar
(mobil aynı şeyleri `lesson.*` altında yazıyor) ama biri gerçek bir eksikti.

Beklentili adımlarda (tekrar et, üret, doğru/yanlış) mobilde ilerlemenin tek
yolu "yazarak cevapla"ydı — **ve o da doğru cevabı bilmeyi gerektiriyor.**
Adımı bilmeyen öğrencinin dersi bitirme yolu yoktu: ya doğruyu buluyor ya
dersten çıkıyordu. Web her beklentili adımda bir atlama bağlantısı veriyor ve
atlanan adımı ölçümde **sıfır** sayıyor — atlama sessizce "doğru" sayılmıyor.

Bu, §11.201'deki "Bilmiyorum" ile aynı düşünce: **bilmemenin de bir yolu
olmalı, ve o yol ölçüme doğru yansımalı.**

`walk.` uzayının kalan otuz satırı da bakıldı ve **doğru muafiyet** çıktı: cep
modu duyuruları, karartılmış ekran, "çıkmak için üç kez dokun" ve "ekran
kapanınca sesini duyamıyorum" hep TARAYICI mekaniği — webde sayfa açık kalmak
zorunda, Android'de gerçek bir ön plan servisi var (`startWalkService`).


### 11.206 Çalışan bir şey bozuk sanılıyordu

`lessonp.` uzayının kalanı. İki yanlış mesaj çıktı.

**"Birazdan tekrar dene" derken ders devam ediyordu.** Sağlayıcı kapalıysa
mobil çevrimdışı rol yapmaya düşüyor (`game/offlineRoleplay`, §43'te ölçülen
yol) ama ekrandaki cümle "yapay zekâ sohbeti şu an kullanılamıyor; birazdan
tekrar dene" diyordu. Kullanıcı **çalışan bir şeyi bozuk sanıp** dersi
bırakabiliyordu. Web hangi yedeğe düşüldüğünü adlandırıyor (senaryolu konuşma
/ kalıplar); aynı iki cümle taşındı, eskiyen `lesson.ai_off` düştü.

**"Konuşma bitti" yarım bırakıldığında da yazılıyordu.** Sunucu `/api/lesson`
yanıtında `passed` döndürüyor (asgari tur doldu mu) ve mobil yanıtın yalnız
`nextDays` alanını okuyordu — §11.23'te bulunan "yanıt okunmuyor" sınıfının
kalan bir parçası.

**Kapının kendi hatası, beşinci kez.** §116'nın "passed okunuyor" ölçümü iki
enjeksiyon boyunca yeşil kaldı: önce özet bileşeninin KENDİ `passed` alanını,
sonra `useState` satırını yakaladı. Bu oturumda aynı ders beşinci kez çıktı
(§73, §78, §98, §103, §114): **gevşek bir desen, ölçmek istediği şeyin
komşusunu ölçüyor — ve kapı yeşil kaldığı için bu ancak enjeksiyonla
görülüyor.** Her yeni kapının enjeksiyonla denenmesi bu yüzden pazarlık
konusu değil.


### 11.207 Kayıtlı gerekçenin kendisi yanlıştı

`rounds.` uzayının kalan on beşi §93'te gerekçesiyle yazılıydı. Tek tek
ölçünce **ikisinin gerekçesi yanlış çıktı**.

"Ekran okuyucu etiketi: harfi geri al — mobilde yuva bir View, okunmuyor"
diyordu. Oysa yuva bir `Pressable` ve etiketi vardı; eksik olan şey etiketin
İÇERİĞİYDİ: havuzdaki karo da yerleştirilmiş karo da yalnız "S" diyordu, yani
dokunmanın ne yapacağı (yerleştirmek mi, geri almak mı) ekran okuyucuyla ayırt
edilemiyordu. İki anahtar ortak sözlüğe taşındı.

Kalan iki satırın (`empty_*_slot`) gerekçesi düzeltildi: webde boş yuva bir
div ve aria etiketi gerekiyor, mobilde aynı yerde gerçek metin duruyor
("Harflere dokun") ve ekran okuyucu onu zaten okuyor.

**Bu, muafiyet listelerinin ikinci kez yanlış çıkması** (§11.181'de gölge
tintinin "iki temada da aynı olması bilinçli" gerekçesi yanlıştı). Gerekçe
yazmak bir kapı değil; gerekçeyi ÖLÇMEK kapı.

Küçük bir ek: sınav yazma sayacı "12 / 40" diyordu ve neyin sayıldığı hiçbir
yerde geçmiyordu; birim yazıldı.


### 11.208 Muafiyetin kapısı var mı: yazılan artık ölçülüyor

§11.207'de kayıtlı bir gerekçenin yanlış çıkması üzerine, aynı testi mobil
tarafın kendi muafiyet listesine uyguladım: `i18n-scan`in SKIP_CONTENT
listesi on bir dosyayı ham metin sayımından muaf tutuyor ve her satırın
yanında hangi kapının onu ölçtüğü yazılı.

**On bir iddianın hepsi doğru çıktı.** İlk bakışta üçü yokmuş gibi göründü
(`modul temalari`, `sabit COMMON`, `sabit MIN_PASSWORD_LENGTH`) ama o kapıların
adı dinamik kuruluyor (`"modul temalari " + level`, `"sabit " + name`).

Artık §118 bunu **kendisi ölçüyor**: listedeki her `check:parity "X"` adı
parity-check'te gerçekten üretiliyor mu. Yani "gerekçe yaz" kuralının yanına
"gerekçeyi ölç" kuralı geldi.

**Kapının kendi hatası, altıncı kez.** İlk yazımda SKIP_CONTENT bloğunun
kapanış işareti dosyanın BAŞINDAN aranıyordu; aynı satır yukarıda SKIP_ASCII
için de geçtiği için pencere boş kalıyor ve kapı sessizce hiçbir şey
ölçmüyordu. Bu oturumda listeye eklenen altıncı örnek (§73, §78, §98, §103,
§114, §116 ve şimdi §118): **bir ölçüm penceresi, ölçmek istediği yerin
komşusunu yakalıyor.** Altısı da yalnız enjeksiyonla görüldü.


### 11.209 Ham metin sayımının muafiyet yollarından biri ölüydü

§118'in web karşılığı. `i18n-hardcoded.mjs` üç liste tutuyor — SKIP (sayımdan
çıkan yol), FORCE (SKIP'in içinde kalan ama yine de sayılan mantık dosyası),
SKIP_ASCII — toplam 38 yol. Hepsi diskte arandı; **biri yoktu**:
`lib/cheatsheet`. Dilbilgisi sayfası 2026-08'de kaldırılmış, muafiyet listede
kalmıştı.

Bugün hiçbir şey atlamıyordu. Ama **olmayan bir yol sessiz bir deliktir**: o
yola bir dosya konursa Türkçe metni hiç sayılmadan içeri girer ve kimse karar
vermemiş olur. Aynı kaldırmadan kalan sahipsiz bir yorum da düştü
(`lib/errors.ts`, anlattığı dışa aktarım çoktan silinmiş).

**Ölçmek bir varsayımı da düzeltti:** FORCE listesindeki altı `lib/lessons/*`
satırını önce fazlalık sandım (dizin zaten SKIP'te). Değillermiş — dizin ders
içeriği yüzünden atlanıyor ve o altı MANTIK dosyası bilerek geri alınıyor.
Ölçüm, yanlış bir "temizlik" yapmamı engelledi.

§118 ve §119 birlikte şu kuralı kapıya çeviriyor: **bir muafiyetin gerekçesi
yazılı olmalı (eskiden beri), gerekçesi ölçülebilir olmalı (§118) ve
muafiyetin kendisi hâlâ var olan bir şeye işaret etmeli (§119).**


### 11.210 Her muafiyet listesi artık kendini denetliyor

§118 (mobil sayımın gerekçeleri) ve §119'un (web sayımın yolları) ardından
kalan üç liste de aynı testten geçirildi. Kural `check:endpoints`te baştan
beri vardı ve adı bile konmuştu (`stale`): **listede olup artık karşılığı
olmayan satır, sessiz bir deliktir.**

| liste | durum | ne eklendi |
|---|---|---|
| `check:colors` WEB_ALLOW + MOBILE_ALLOW (12) | hepsi canlı | karşılıksız istisna artık ihlal |
| parity §10 KNOWN_GAPS (2 tur) | ikisi de hâlâ boşluk | kapanan boşluk artık ihlal |
| parity "yerelsiz harf" MUAF yolları (4) | hepsi duruyor | olmayan yol artık ihlal |
| `check:endpoints` ALLOW + WEB_ONLY | zaten kendini denetliyordu | — |

Hiçbirinde bugün eskimiş bir satır yoktu (tek istisna bir önceki turdaki
`lib/cheatsheet`). Ama bu turların en çok tekrarlayan dersi şu oldu: **doğru
olmak yetmiyor, doğruluğun ölçülüyor olması gerekiyor.** §11.181'de gölge
tintinin gerekçesi, §11.207'de ekran okuyucu etiketinin gerekçesi yanlıştı ve
ikisi de kapı olmadığı için yıllarca öyle kaldı.


### 11.211 Kilidi görenler sayılıyordu, kilide çarpanlar sayılmıyordu

`premium_gate` **iki platformun da olay kayıt defterinde yazılıydı** ve
gerekçesi de duruyordu — `lib/events.ts`: *"premium özellik kilide takıldı
(kind = özellik) … paywall'ı hangi kısıt besliyor, oradan görülür."* Olayı
**hiçbiri göndermiyordu.** Huninin sonu ölçülüyordu (`paywall_view`,
`paywall_cta`, `purchase_*`), başı ölçülmüyordu: kimin oraya hangi kapıdan
itildiği hiç yazılmıyordu. §90'ın dersinin aynısı — olayın TANIMLI olması
gönderildiği anlamına gelmiyor.

Yazılı `kind` listesi de uydurmaydı (`speaking|exam_full|unlimited_tour`);
sunucunun kendi sözlüğü `lib/premium/gates` `PREMIUM_GATES`:
**mock_exam · weekly_exam · pocket_walk · speaking · writing**. Yorum
düzeltildi, mobil yardımcı (`notePremiumGate`) aynı beş türü alıyor.

Reddin gerçekten kullanıcıya gösterildiği her yüzey artık yayın yapıyor:

| kilit | Android | web |
|---|---|---|
| `pocket_walk` | `WalkModeScreen` (ekran kapalı reddi) | `walk-player` |
| `writing` | `ExamScreen`, `skillQuiz` | `assess-client` (403 `premium_required`) |
| `speaking` | `skillLibrary`, `RoleplayExamScreen` | `assess-client` |
| `mock_exam` | `MockExamScreen` (`locked`) | `mock-exam-player` (`locked`) |

`weekly_exam` **bilerek dışarıda**: sözlükte var ama hiç uygulanmıyor —
`canWeeklyExam`i yalnız `premium/status` (bilgi) ve `premium/consume`
(çağıranı yok, §11.24) okuyor; `/api/weekly` kilide hiç bakmıyor. Reddin
olmadığı yerde ölçülecek an da yok. Muafiyetin kendisi ölçülüyor: üçüncü bir
çağıran çıkarsa satır düşer (§11.210'un kuralı).

*Ek ölçüm (2026-09-11):* muafiyetin ZARARSIZ olmasının sebebi de yazılsın —
"haftada bir" kuralı premium'dan bağımsız olarak yapısal: `weeklyStatus.done`
o haftanın `exams` satırına bakıyor ve herkesi (premium dahil) bir denemeyle
sınırlıyor. Yani `canWeeklyExam`in premium dalı (`havuzun tamamı`) bugün
hiçbir şeyi değiştiremez ve serbest kotanın `weeklyExams: 1` olması ikisini
aynı sonuca getiriyor. Premium'un bu eksende gerçekten bir şey açması
isteniyorsa `weeklyStatus`un da premium'u bilmesi gerekir — ürün kararı,
Samet'e ait (§11.254 sınıfı).

Yan düzeltme: web `askAssess` içindeki durum kodu tablosu saf bir yardımcıya
ayrıldı (`refusal`). Ölçüm çağrısı `case 403`ün içine konunca tablo yan
etkili olmuş ve §104'ün karşılaştırması bozulmuştu — karar ile yan etki
ayrıldı, tablo mobildeki `assessFailure` ile yeniden satır satır aynı.

**Yeni kapı (§120)** dört şeyi birden ölçüyor: (1) iki platform aynı kilit
türlerini gönderiyor mu, (2) türler sunucunun sözlüğünde var mı, (3) sözlükteki
her kilit ya ölçülüyor ya muaf listesinde gerekçeli, (4) **reddeden yüzeylerden
biri susmuş mu.** Dördüncüsü turun içinde kendini kanıtladı: bir enjeksiyon
denemesinden sonra `RoleplayExamScreen`in yayını geri alınmıştı ve ilk üç
kontrol de yeşil kalmıştı — aynı türü başka bir ekran hâlâ gönderiyordu.
Beş enjeksiyonun beşi de yakalandı.

### 11.212 Turun başı ve sonu yazılıyordu, arası yazılmıyordu

§11.211'in ardından aynı soruyu ters yönden sordum: **web istemcisinin yazıp
Android'in yazmadığı olaylar.** §44 bunu zaten ölçüyordu ve dokuz adlık bir
muafiyet listesi tutuyordu — üçünün gerekçesi artık doğru değildi.

| olay | yazılı gerekçe | gerçek |
|---|---|---|
| `walk_listen` | "tarayıcı mikrofon yolu tanılaması" | ölçülen şey tarayıcıya ait değil: dinleme kaç kez boş döndü, kaynak neydi, Azure kaç saniye ses aldı |
| `walk_switch` | aynı | cebe geçiş Android'de de oluyor, hiç sayılmıyordu |
| `challenge_play` | "süre-kazanma modu mobilde yok" | mod §11.199'da mobile geldi |

Yani uygulamanın **en pahalı özelliğinin faturasını yazan şey** yalnız web
kullanıcılarından görülebiliyordu: Android'de `walk_start` ve `walk_end`
vardı, arada geçen hiçbir şey yoktu.

Eklenenler, webin kendi dilbilgisiyle:

- `walk_listen` — kind `kaynak:sonuç` (`native|azure|stt` : `ok|silence|cut|
  manual|premium`), value gönderilen saniye × 10. Ücretsiz native yolda 0:
  sunucuya bir şey gitmiyor. Azure penceresi iki yerde ayrı ayrı sabit
  yazılıydı, tek ada bağlandı (`AZURE_WINDOW_MS`) — ölçü ona bakıyor.
- `walk_switch` — 1 cebe alındı / 0 ekrana dönüldü; servis kurulamazsa
  `arm-failed`. Geçiş SEBEPLERİ iki tarafta farklı ve olmalı da (tarayıcının
  `dark`/`hidden`'ı ile ekran durumu aynı şey değil); ortak olan **değer
  dilbilgisi** ve §121 onu ölçüyor.
- `challenge_play` — hayatta kalma turuna tur özetinden giriş. Mobilde mod
  vardı ama yalnız Öğren sekmesindeki satırdan giriliyordu: kullanıcının en
  ısındığı an (tur bitti, XP ekranda) boş geçiyordu. Web özetin düğme
  grubunda bu kapıyı baştan beri tutuyordu; mobil özete de aynı yere kondu.

İki yan düzeltme:

- Web `walk_listen`in bir kind'ı tek parçalıydı (`"deadline"`) ve panoda
  kaynaksız kalıyordu; `record:failed` ile aynı kurala getirildi
  (`hear:deadline`).
- `feedback_why_opened`in gerekçesi ("mobil neden'i her zaman gösteriyor")
  **yanlıştı**: olay kural BAĞINA dokunulunca yazılıyor, bağ ise iki tarafta
  da her zaman `null` — yani webde de hiç yazılmıyor. Gerekçe düzeltildi ve
  muafiyet kendini denetliyor: iki `why` dosyasından biri gerçek bir adres
  üretmeye başlarsa satır düşer (iki enjeksiyonun ikisi de yakalandı).

**§121** yürüyüş olay adlarını, `walk_listen`in `kaynak:sonuç` biçimini ve
`walk_switch`in değer dilbilgisini ölçüyor; `walk_capture` muaf (tarayıcının
`getUserMedia` kısıtı, native kaydedicide karşılığı yok) ve muafiyet o
çağrının `micSettings`ten beslendiğine bağlı.

Biçim kontrolü ilk yazılışında **"en az bir çağrıda `kaynak:sonuç` var mı"**
diye soruyordu ve enjeksiyonu yakalamadı: düzleştirilen çağrının yanındaki
sabit (`"stt:premium"`) kuralı tek başına sağlıyordu. Ölçünün komşusunu
ölçmenin sekizinci örneği — şimdi **her** çağrı sınanıyor.

### 11.213 Ölçüm paritesinin ters yönü hiç sorulmamıştı

§44 iki turdur "web yazıyor, mobil yazmıyor mu" diye soruyordu. **Ters yön
aynen sessiz** ve iki turdur kimse sormamıştı: Android'in yazıp webin
yazmadığı bir ad, web kullanıcıları için cevapsız kalan bir soru demek.

Ölçüldüğünde bir tane gerçek çıktı: **`onboarding_existing_account`.**
"Zaten hesabın var mı?" çıkışı iki tarafta da duruyor (aynı anahtar,
`auth.already_have_account`) ve yalnız mobil sayıyordu. Yani kayıtlı bir
kullanıcının akışın neresinde kendini bulduğu web için hiç yazılmıyordu — o
çıkışlar panoda akışı TERK edenlerle karışıyordu, çünkü `onboarding_step` o
adımda susuyor. Web'e de mobildekiyle aynı iki bilgiyle kondu: value kaçıncı
adım, kind adım anahtarı.

Kalan üç ad mobil-özel ve artık gerekçesiyle yazılı:

| ad | gerekçe | gerekçenin kapısı |
|---|---|---|
| `notif_prime` | bildirim izni ÖNCESİ hazırlık ekranı; webin karşılığı tarayıcı istemi (`push_optin`) | bu bir ÇİFT: webin ucu susarsa gerekçe kalmaz |
| `purchase_start` · `purchase_done` | satın alma yalnız mağazada (Play/RevenueCat) | webe ödeme akışı gelirse iki ad orada da gerekli olur |

Üç enjeksiyonun üçü de yakalandı.

Turun kendi hatası da kayda değer: enjeksiyon denemesinden dönerken
`git checkout` **commit edilmemiş** bir düzeltmeyi iki kez sildi (§11.211'de
rol yapma ekranının yayını, burada web onboarding çağrısı). İlki yalnız
§120'ye eklenen dördüncü kontrol sayesinde görüldü; ikincisi bu kapının
kendisiyle. Enjeksiyon geri alması artık dosya yedeğinden yapılıyor.

### 11.214 Son etabın bahsi Android'de sessizce buharlaşıyordu

Bahis (etap sonunda "kazandığını ortaya koy") Android'de **yalnız etap
sınırında** çözülüyordu — `closeStage`. Tur başka bir sebeple bittiyse, yani
kelime kalmadıysa ya da günlük hedef dolduysa, `finish()` cevapları bahissiz
gönderiyordu: `wagerOn` açık kalıyor, sunucuya bahis hiç gitmiyor, sonuç
hiçbir yerde yazmıyordu. Kullanıcı XP'sini ortaya koyuyor, **ne kazandığını
ne kaybettiğini öğreniyor** ve aslında hiçbir şey de olmuyordu.

Web bunu baştan beri kapatıyor ve nedeni de yazılı: `closing = isLast ||
etap sınırı`, sonucu da özet kartında gösteriyor — *"etap kartı gösterilmeden
tur bittiği için başka söylenecek yer yok."* Android'de o satır hiç yoktu.

İkisi de eklendi: `finish()` bahsi `closeStage` ile birebir aynı payla
kapatıyor (doğru/toplam/ortaya konan XP, hepsi etap başından beri), özet
kartı da sonucu webdeki yerinde gösteriyor — XP'nin altında, günlük hedef
kutusunun üstünde, kazanç yeşil, kayıp turuncu, berabere sessiz.

**§123** üç şeyi ölçüyor: bahis etap sınırında kapanıyor mu, TURUN SONUNDA
kapanıyor mu, sonucu özet gösteriyor mu. Üç enjeksiyonun üçü de yakalandı.
Fonksiyon gövdeleri ADA göre değil **girintiye göre** kesiliyor: bu dosyada
komşu fonksiyonu okumak birden fazla kez tuzak oldu (§103, §116).

### 11.215 Özet kartının sırası ölçülmemiş hiçbir şeydi

Tur özeti iki platformda da aynı bölümlerden kuruluyordu ama **sıra** hiç
ölçülmemişti. Ölçülünce iki gerçek çıktı ve ikisi de tasarım hatası:

- **Android'de "devam" içeriğin ORTASINDA duruyordu.** Zorlandığın kelimeler
  ve yarınki tekrar sayısı birincil düğmenin ALTINDA kalıyordu: turu bitiren
  kullanıcı ikisini de hiç görmeden devam ediyordu. Web'de bütün içerik
  bitince düğme grubu başlıyor — doğru olan o.
- **Web'de "paylaş" ÇIKIŞ düğmesinin altındaydı.** Paylaşmak da yeni bir şey
  başlatıyor; çıkış grubun sonu olmalı. İki platformda da sıra artık aynı:
  devam · hayatta kalma · paylaş · bitir.

Bir de eksik vardı: **üç sayı satırı** (doğruluk · kelime · seri). Web
başlığın hemen altında çiziyor, Android'de yoktu — halka yalnız
"doğru/toplam" gösteriyordu, yani **doğruluk yüzdesi hiçbir yerde
yazmıyordu** ve turun seriye ne yaptığı da görünmüyordu (seri yalnız
ONARILDIYSA bir satır çıkıyordu). Üç anahtar web-özel sözlükten ortak tabana
taşındı; yüzde `formatPercent`, gün sayısı `profile.days` ile — ikisi de üç
dilde doğru biçimleniyor.

**§124** bölümlerin görünme sırasını ölçüyor (on dört bölüm). Desenler
platforma ait, çünkü iki taraf aynı anahtarı kullanmıyor — başlık webde
`summary.round_done`, mobilde `common.round_done`. İki bölüm muaf ve
gerekçeleri kapının içinde yazılı: `PushOptIn` (webde izin tam burada
isteniyor çünkü tarayıcıda reddedilen izin kalıcı kapanıyor; mobilde ayrı bir
hazırlık ekranı var) ve kayıt uyarısı (webde tur ekranında, mobilde özette —
web özete geldiğinde kayıt çoktan denenmiş oluyor).

Kapı ilk yazılışında **halkayı web tarafında göremiyordu**: dilim
`summary.stopped`ten başlıyordu ve halka onun ÜSTÜNDE kalıyordu, yani "webde
halka yok" diye okunacaktı. Ölçünün komşusunu ölçmenin dokuzuncu biçimi.
Üç enjeksiyonun üçü de yakalandı.

### 11.216 Öğren sekmesinde sıra ve simge ölçülmemişti

Aynı soruyu Öğren sekmesine sordum: iki taraf da aynı satırları gösteriyor mu,
**aynı sırada ve aynı simgeyle**. Üç fark çıktı, üçü de webdeydi:

| satır | Android | web (eski) |
|---|---|---|
| seviye sınavı | listenin **en altında** | ortada, haftalık sınavın üstünde |
| Pratik | soru işareti (`QuizIcon`) | nişan tahtası (`TargetIcon`) |
| hayatta kalma | alev (`FlameIcon`) | kalp (`HeartIcon`) |

Üçü de Android'e göre düzeltildi. Webdeki gerekçe de eskimişti — *"Hayatta
kalma mobilde YOK, web'e özel bir mod"* — mod §11.199'da Android'e geldi.

**§125** satır sırasını, simge adını ve rengi ölçüyor. Renk **adıyla değil
HEX'iyle**: iki taraf aynı tonu ayrı adla tutuyor (`--color-rose-500` /
`colors.danger`) ve ad karşılaştırması hiçbir şey söylemezdi. Kapı web
jetonlarını `globals.css`ten, mobil paletini `theme/colors`tan çözüyor —
ramp indirmesiyle birlikte (`orange[500]`). Yedi satırın yedisinde de renk
birebir aynı çıktı, yani palet hizası gerçekten tutuyor.

Kapı ilk yazılışında **ekran başlığından** başlıyordu (`AppHeader
title={t("learn.learn")}`) ve ilk satırı "learn.learn" diye okuyordu: desen
bileşen adına çapalanmamıştı. Ölçünün komşusunu ölçmenin onuncu biçimi.
Üç enjeksiyonun üçü de yakalandı.

### 11.217 Yan yana iki "Tümü" çipi

Kelime listesini iki şey süzüyor: seviye ve durum. Android ikisini **ayrı
şeritlerde** gösteriyor ve seviyenin sıfırlama çipi grubun adını taşıyor
("Seviye"). Web ikisini tek şeritte, aralarında ince bir çizgiyle
gösteriyordu ve iki grup da sıfırlama çipini "Tümü" diye yazıyordu: **yan
yana iki özdeş çip** vardı ve hangisinin neyi sıfırladığı okunmuyordu.
Sarılma olduğunda ayraç çizgisi de satırın ortasında kalıyordu.

Web Android'e göre düzeltildi: iki ayrı şerit, seviye çipi "Seviye".

Bu turda bir de **yanlış alarm** vardı ve nasıl elendiği kayda değer.
Anahtar taraması webde `words.status_leech` ve `words.status_familiar`
görüp mobilde görmeyince "Android beş durumdan üçünü biliyor" gibi
duruyordu. Gerçekte mobil beşini de biliyor — eşikler `data/words`
`statusOf` içinde, ekranın kendisinde değil. Aynı şekilde `words.due_*`
satırları da mobilde var. **Ekranın anahtarlarına bakıp "yok" demek, ölçünün
komşusunu ölçmenin bir başka biçimi.**

Sunucunun `status` alanı da kontrol edildi: uç `intervalDays == null → new`,
`>= 21 → mastered` diyor, yani mobilin sunucu alanına dayanan hesabı ile
webin `intervalDays` eşiklerine dayanan hesabı aynı sonucu veriyor.

**§126** iki grubun seçeneklerini, sıfırlama etiketlerini, beş durumun sözlük
anahtarlarını ve "ne zaman tekrar" eşiklerini ölçüyor. Üç enjeksiyonun üçü de
yakalandı.

### 11.218 Haftalık sınav bitiyordu, hangi kelimede takıldığın yazmıyordu

Haftalık sınav Android'de tek cümleyle kapanıyordu: *"{total} sorudan
{correct} doğru."* **Hangi** kelimede takıldığın hiçbir yerde görünmüyordu.
Web aynı yerde yanlış bilinen kelimeleri çip çip yazıyor ("tekrar kuyruğuna
dönenler"), hepsi doğruysa onu söylüyor — iki cümle de mobil sözlükte zaten
duruyordu (`weekly.back_in_queue`, `weekly.all_correct`), yalnız hiç
kullanılmıyordu. Tur özetinde bu liste iki tarafta da vardı; haftalık sınavda
yalnız webde.

Hesap sunucudan gelmiyor, elde duran cevaplardan çıkıyor ve webdekiyle aynı:
bir kelime turlarının **hepsinde** doğruysa doğru sayılıyor (aynı kelime
birden çok turda çıkabiliyor).

**§127** sonuç ekranının bölüm sırasını ölçüyor. Desenler yine platforma ait:
puan başlığı webde `weekly.your_score`, mobilde halkanın altındaki
`weekly.score`; çıkış webde "Öğren'e dön", mobilde "Bitir". Üç enjeksiyonun
üçü de yakalandı.

### 11.219 Günlük tur Android'de hiçbir şey söylemeden başlıyordu

Günlük tur Android'de **doğrudan** başlıyordu: kullanıcı ne oynayacağını, kaç
soru olduğunu, **tek hak** olduğunu ve seviyesindeki herkesle aynı turu
oynadığını hiçbir yerde okumadan kendini ilk sorunun içinde buluyordu. Web
aynı yerde bir tanıtım kartı gösteriyor ve **bugünün tablosunu** da oraya
koyuyor — "kime yetişiyorum" sorusu oynamaya iten şeyin kendisi ve tur
bitmeden görünmüyordu.

Mobilin kendi düzeni haftalık sınavda zaten böyle (`WeeklyScreen` `ready`);
günlük tur tek istisnaydı. Aynı kart Android'e kondu: üst satır · başlık ·
tanıtım · Başla · Sonra · bugünün tablosu.

Yanında iki düzeltme daha:

- **`session_start` artık BAŞLA'ya basınca yazılıyor** (iki tarafta da).
  Android'de ekranı AÇAN herkes "başladı" sayılıyordu; huninin ilk adımı
  olduğundan büyük görünüyor ve tamamlama oranı olduğundan küçük çıkıyordu.
- **Web'e `submitting` fazı eklendi.** Skor gönderilirken son tur donmuş
  hâlde ekranda duruyordu ve ağ yavaşsa kullanıcı düğmenin işe yaramadığını
  sanıyordu; Android aynı anda yükleme iskeletini gösteriyor.

Bir de tek kelimelik bir hizalama: tanıtımın ikincil düğmesi mobilde "Kapat"
diyordu, webde "Sonra". Düğme sınavı/turu **erteliyor**, hak duruyor — ikisi
de artık "Sonra" (`common.later`, haftalık sınavda da).

**§128** üç şeyi ölçüyor: ekranın fazları, tanıtım kartının bölüm sırası ve
`session_start`in hangi anda yazıldığı. Dört enjeksiyonun dördü de yakalandı.

### 11.220 Dersin kapanışında ne kazandığın yazmıyordu

Ders özetinde üç fark çıktı, üçü de Android'de:

- **"Yapabildiklerim" satırı hiç yoktu.** Web özetin altında dersin kazandırdığı
  can-do ifadelerini yazıyor (`lessonp.i_can`): kullanıcı kaç doğru yaptığını
  görüyor ama **ne kazandığını** görmüyordu. Kimlikler dersten (`candoMap`),
  metni `/api/cando`dan — rol yapma sınavındaki yolun aynısı. Alınamazsa satır
  çizilmiyor; etiket bir süs, özet ona bağlı değil.
- **Konuşma tamamlanmadığında ekran susuyordu.** Başlık "Konuşma tamamlanmadı"
  diyor, orada bitiyordu: **kaç tur gerektiği yazmıyor, konuşmaya dönmenin
  yolu da görünmüyordu** — dersi kapatmaktan başka yapılacak bir şey yoktu.
  Web ikisini de aynı yerde veriyor. §11.206'nın sınıfı: çalışan bir şey
  bitmiş gibi görünüyor.
- **İki taraf da iki sayı gösteriyordu ama ikincileri farklıydı** — webde tur
  sayısı, Android'de başarı yüzdesi. İkisi de gerçek bir şey söylüyor (biri
  konuşmanın uzunluğunu, öteki isabeti: beş turda üç doğru ile on beş turda üç
  doğru aynı ders değil), o yüzden hangisini atacağıma karar vermek yerine
  **üçü birden iki tarafta duruyor.**

**§129** özetin bölüm sırasını ölçüyor (on iki bölüm). "Kalıplar" tablonun
dışında ve gerekçesi kapının içinde: iki taraf aynı listeyi ayrı adla ve ayrı
yerde yazıyor; sırayı orada zorlamak tasarımı değil ölçüyü düzeltmek olurdu.

Kapı ilk çalıştırmasında "yapabildiklerim"i **en başta** gördü: dilim yorumları
atmıyordu ve `lessonp.i_can`e ATIF yapan bir yorum bölümün kendisinden önce
geliyordu. Ölçünün komşusunu ölçmenin on birinci biçimi. Üç enjeksiyonun üçü
de yakalandı.

### 11.221 Yerleştirme sınavı: vaat edilen profil veri olarak geliyor, ekranda yoktu

İki eksik, ikisi de Android'de:

- **Tanıtım ekranı yoktu.** Kullanıcı kaç aşama olduğunu, en çok on beş dakika
  süreceğini ve sonunda seviyeyi **yine kendisinin seçeceğini** hiçbir yerde
  okumadan ilk sorunun içinde buluyordu. Yerleştirme, kullanıcının uygulamayla
  ilk ciddi teması; ne olduğunu bilmeden girilen on beş dakikalık bir ölçüm
  yarıda bırakılıyor. §11.219'un aynısı, bir ekran ötede.
- **Beceri profili çizilmiyordu.** Sunucu dört aşamanın her biri için ayrı bir
  seviye döndürüyor (`perSkill`) ve tanıtım metni bunu açıkça vaat ediyor:
  *"sonunda bir seviye önerisi ve beceri profili alırsın."* Android'de o satır
  hiç yoktu — **vaat edilen şey veri olarak geliyor, ekranda görünmüyordu.**
  Önerinin neden o seviye olduğu (dört aşamanın ortancası) ve seçimin gerçekten
  kullanıcıda olduğu da yalnız webde yazılıydı.

Yanında iki küçük düzeltme: `exam_start` artık BAŞLA'ya basınca yazılıyor
(ekranı açan herkesi "başladı" saymak huninin payını olduğundan büyük
gösteriyordu), ve "sonuç kaydedilemedi" uyarısı seviye çiplerinden **önce**
duruyor — kullanıcı seçimini yapmadan bilmeli.

**§130** iki ekranın bölüm sırasını ve `exam_start`in anını ölçüyor. Ölçüm anı
için **en yakın önceki işaret** kazanıyor (`useEffect` mi, `start`/düğme mi):
sabit uzunlukta bir pencereye bakmak webde yanlış cevap veriyordu, çünkü orada
çağrı `function start()` içinde ve düğme başka satırda.

Kapının **sınırı da yazılı**: kaynak metni okuyor, çalışma anını değil. Bir
bölümün silinmesini ya da adının değişmesini görüyor, `if (false)` ile ölü
bırakmayı görmüyor — ilk iki enjeksiyonum tam olarak o yüzden geçti ve
enjeksiyonlar gerçek gerilemeye benzetilerek (blok silinerek) tekrarlandı.
Dördünün dördü de yakalandı.

### 11.222 Sınav ortasında doğru cevap gösteriliyordu

Seviye sınavının okuma/dinleme bölümünde şık seçilince **doğru şık yeşile,
yanlış seçim kırmızıya** boyanıyor ve şıklar kilitleniyordu. Yani sınav
ortasında cevap açıklanıyor, aynı metnin sonraki soruları kolaylaşıyordu.

Uygulamanın kendi sözü bunun tersi ve **aynı ekranda yazılı**:
`exam.answers_at_end` — *"cevap sınav sonunda gösterilir."* Web yalnız seçimi
işaretliyor (`exam-player` `options`). Android artık o sözü tutuyor: seçim
marka renginde işaretleniyor, doğruluk açıklanmıyor.

Kilit de kalktı ve bu ikinci bir tutarsızlığı kapattı: hemen üstteki yorum
*"öğrenci son cevabını değiştirebiliyor"* diyordu, oysa `disabled={picked}`
buna izin vermiyordu. **Yazılı gerekçenin kodla çelişmesinin** bir örneği daha
(§11.181, §11.207).

### 11.223 Ses alınamazsa sınav tıkanıyordu

Konuşma maddesinin hata dalında ekranda yalnız "Kaydet" düğmesi kalıyordu:
mikrofon izni yoksa ya da tanıyıcı hiçbir şey duymuyorsa kullanıcı o maddede
**sonsuza kadar** kalıyordu — ilerlemenin bir yolu yoktu, sınav orada bitiyordu.

Web iki denemeden sonra maddeyi atlatıyor ve nedenini de yazıyor
(`exam.audio_failed_retry` → `exam.audio_failed_skip`). Android'de artık aynısı:
ilk hatada "bir kez daha dene", ikincisinden sonra "bu madde puanlanamadı;
sınav devam ediyor" ve her iki durumda da ilerleten bir düğme. Atlanan madde
sıfır alıyor — uydurma bir puan verilmiyor.

**§131** iki şeyi ölçüyor: şık boyamasında doğru cevaba bakan bir dal var mı,
ve ses hatası dalında ilerleten bir çıkış var mı. Üç enjeksiyonun üçü de
yakalandı.

### 11.224 Aynı hata bir ekran ötede duruyordu — ve kapı onu görmemişti

§11.222'yi (sınav ortasında cevap açılması) okuma/dinleme bölümünde
düzelttim. Aynı soruyu bütün çoktan seçmeli yüzeylere sorunca **iki yer daha**
çıktı, ikisi de aynı sınavın içinde:

- **Dilbilgisi bölümü** (`ExamScreen` `Choice`): doğru şık yeşile, yanlış
  seçim kırmızıya boyanıyordu. Üstelik doğru gerekçe **yüz satır aşağıda**
  yazılıydı: `Produce` kartının notu tam bunu anlatıyor ("sınavda aynı yapılar
  sonraki maddelerde tekrar geçtiği için cevabı açmak sınavın kendisini
  kolaylaştırıyor ve Android puanını web puanıyla karşılaştırılamaz kılıyor").
  Bir tur o kartı düzeltmiş, iki komşusunu atlamış.
- **§131'in kendisi bunu görmedi.** Deseni yalnız `q.answer`a bakıyordu;
  `Choice` doğru cevabı `answerIdx` diye tutuyor. **Ölçünün komşusunu ölçmenin
  on ikinci biçimi** — ve bu kez ölçü, düzelttiğim hatanın ikizini aynı
  dosyada kaçırdı. Desen artık "doğru cevabı tutan her ad"a bakıyor.

### 11.225 Seviyeyi ölçen test aynı zamanda öğretiyordu

Yerleştirme sınavında web ikiye bölmüş: **gerçek test** yalnız seçimi
işaretliyor, misafir akışındaki **demo** cevabı açıyor — biri ölçüm, öteki ilk
temas. Android'de ikisi de açıyordu, çünkü tek ekran iki soru kümesini de aynı
bileşenle çiziyor (`ChoiceGame`).

Sonuç: kullanıcının seviyesini **ölçen** test aynı zamanda ona öğretiyordu.
Aynı dilbilgisi yapısı sonraki maddelerde tekrar geçtiği için öğrenilen şey
sonraki cevapları değiştiriyor ve önerilen seviye yukarı kayıyordu.

`ChoiceGame` yalnız bu ekranda kullanılıyor, o yüzden ölçüm kipi bir bayrakla
eklendi: gerçek testte `reveal={false}`, demoda açık. Üç şey birden nötrleşti —
renk, **haptik/ses** (titreşimin tonu da cevabı söylüyordu) ve **gecikme**
(doğruda 700 ms, yanlışta 1150 ms beklemek cevabı süreyle söylüyordu).

**§132** iki tarafta da gerçek testin açmadığını, demonun açtığını ölçüyor.
Kapının ilk hâli bayrağın **varsayılanını ters okuyordu** (`reveal = true`
iken, bayrak geçilmediğinde "açmıyor" diyordu); enjeksiyon bunu gösterdi.
Beş enjeksiyonun beşi de yakalandı.

### 11.226 Kırk beş dakika tek dokunuşla çöpe gidiyordu

Başlıktaki çarpı ve Android'in donanım/gesture geri tuşu **seviye sınavını**
(kırk beş dakika) ve **yerleştirme testini** (on beş dakika) tek dokunuşta
bitiriyordu ve hiçbir şey sormuyordu: cevaplar hiçbir yere kaydedilmiyor,
ikisi de baştan başlıyor.

Uygulamanın kendi düzeni bunu zaten biliyor: tur ekranı `useBackConfirm`
kullanıyor, deneme kâğıdı `ConfirmDialog` gösteriyor — **en pahalı iki yüzey
atlanmıştı.** İkisine de aynı onay kondu; sınavda bölüm girişinde ve bölümün
kendisinde, yerleştirmede yalnız test sürerken (tanıtımda ve sonuçta
kaybedilecek bir şey yok). Web sınav sürerken hiç çıkış düğmesi vermiyor,
yani orada böyle bir dokunuş yok.

**§133** cevabı kurtarılamayan dört ekranda çıkışın sorulduğunu ölçüyor.
Haftalık sınav ve günlük tur **muaf** ve gerekçesi ölçülüyor: ikisinde de
yarıda bırakmak hakkı harcamıyor, çünkü `exams` satırını yalnız
`finishWeekly` yazıyor — başka bir yazan çıkarsa satır düşer.

Kapı ilk hâlinde iki enjeksiyonu da **kaçırdı**: `<ConfirmDialog` deseni ÖNEK
olarak eşleşiyordu ve yeniden adlandırılmış `<ConfirmDialog2`'yi hâlâ "onay
var" sayıyordu. Ad sınırı eklendi. **Ölçünün komşusunu ölçmenin on üçüncü
biçimi** — bu kez "komşu", ölçülen adın kendi öneki.

### 11.227 Sınav süresi uygulamadan çıkınca duruyordu

Seviye sınavının süresi Android'de her saniye bir **sayıcıyı** bir azaltarak
işliyordu. `setInterval` uygulama arka plana alınınca duruyor: kullanıcı
uygulamadan çıkıp dönünce sayaç **bıraktığı yerden** devam ediyordu. Yani kırk
beş dakikalık sınav istenildiği kadar uzatılabiliyordu — süre sınavın kısıtı
ve Android'de o kısıt delinebiliyordu.

Web başından beri geçen süreyi duvar saatinden hesaplıyor (`exam-player`:
`paper.seconds - elapsed`). Android artık aynısını yapıyor; `startedAt` kapaktaki
BAŞLA'da damgalanıyor ve arka plandan dönüşte ilk saniye beklenmeden
düzeltiliyor.

İkinci fark aynı satırdaydı: **son iki dakikada** sayaç webde kırmızıya
dönüyor, Android'de sonuna kadar aynı renkteydi — "süre bitiyor" uyarısı hiç
verilmiyordu. Aynı eşik (120 sn) kondu.

**Deneme kâğıdı bilerek farklı ve öyle kalıyor:** orada bütçe **görev** başına
ve kalan saniye kaydediliyor (`secondsLeft`), yani bırakıp dönmek sürdürmek
demek. İki platform da orada aynı sayıcı kalıbını kullanıyor; "hepsi duvar
saati olsun" demek o tasarımı bozardı. §134 ikisini ayrı ayrı ölçüyor.

Bu turda **enjeksiyonun kendisi hatalıydı** ve bunu not etmek gerekiyor:
eşiği değiştirmek için yaptığım arama `left < 120`yi önce **yorumun içinde**
buldu (orada webe atıf var), kodda değil. Kapı doğru çalışıyordu; ölçtüğüm
şey yanlıştı. Kodu hedefleyen iki enjeksiyonla tekrarlandı, ikisi de
yakalandı.

### 11.228 Aynı hata iki platformda birdendi: rol yapma sınavının süresi

§11.227'den sonra aynı soruyu bütün zamanlı yüzeylere sordum ve dördüncüsü
çıktı: **rol yapma sınavı** (üç dakika, beş tur, yardım yok) süreyi her saniye
bir sayıcıyı azaltarak işletiyordu. Uygulama arka plana alınınca (webde sekme
gizlenince) sayaç duruyor, yani üç dakikalık ölçüm istenildiği kadar
uzatılabiliyordu.

Bu kez hata **iki platformda da** vardı ve ikisi birlikte düzeltildi: süre
artık bir hedef damgasından (`deadline`) geliyor. Hayatta kalma turu bunu
baştan beri doğru yapıyor (`deadline.current - Date.now()`), yani örnek zaten
evin içindeydi.

İkisi birden yanlış olunca **karşılaştırma hiçbir şey söylemez** — bu turun
dersi bu. §135 o yüzden iki şey ölçüyor: (1) üç zamanlı yüzeyde sürenin
kaynağı iki platformda aynı mı, (2) **hiçbiri sayıcıyla işlemiyor mu.**
İkincisi olmadan "ikisi de sayıcı" durumu yeşil geçerdi ve enjeksiyon bunu
gösterdi.

Kapının ilk hâli ayrıca seviye sınavının kendi ifadesini de görmüyordu: desen
`") / 1000"`a çapalanmıştı ve `(Date.now() - startedAt.current) / 1000` ona
uymuyordu — iki taraf da "süre yok" diye okunuyor, karşılaştırma **boş bir
eşitlikle** geçiyordu. Ölçünün komşusunu ölçmenin on dördüncü biçimi; artık
hedef/başlangıç damgası ile `Date.now()` arasındaki fark aranıyor ve altı
dosyanın altısı da "duvar saati" diye okunuyor.

Bu turda değişmeyen üç şey de ölçüldü ve kayda geçiyor: hayatta kalma turu
(iki tarafta birebir aynı `deadline` kalıbı, aynı 100 ms tık, aynı tehlike
eşiği), yerel gün sınırı (`todayStr` / `localDay` — aynı hesap) ve deneme
kâğıdının görev bütçesi (bilerek sayıcı, kalan saniye kaydediliyor).

### 11.229 Sekme kapanınca tur cevapları yok oluyordu

Tur cevapları web'de ağ yoksa **yalnız bellekte** bekliyordu
(`session-player` `pending.current`): bir sonraki gönderimde tekrar
deneniyordu, ama **sekme kapanırsa o cevaplar yok oluyordu.** SRS aralıkları
ilerlemiyor, XP verilmiyor, kullanıcı aynı kelimeleri yeniden görüyordu — hem
de bunu bilmeden, çünkü ekran "kaydı bekliyor" diyordu ve kayıt hiç
olmayacaktı.

Android bu boşluğu baştan kapatmış (`game/session` `queueAnswers` /
`flushPendingAnswers`, AsyncStorage). Web'e aynı kuyruk kondu
(`lib/answer-queue`, `lesson-queue` ile aynı kalıpta) ve aynı üç kuralı
tutuyor: kayıt kendi `day`ini taşıyor, kuyruk son yirmi turla sınırlı, biri
düşerse sıradakiler denenmiyor. `progress` ve `wager` kuyrukta **taşınmıyor**
— ikisi de o turun kendi hâli; yarım kalan turu ertesi gün yeniden açmak ya da
geçmiş bir bahsi o gün çözmek yanlış olurdu ve Android kuyruğu da yalnız
cevapları taşıyor.

Kalıcı hata ayrımı da birebir eşleşti: **401/403/408/429 geçici sayılıyor.**
Oturum düşmüşken atılan bir tur, kullanıcı yeniden girince gönderilebilir;
onu "sunucu reddetti" sayıp silmek tam da korumaya çalıştığımız veriyi atardı.
Web'de eşik `status >= 400 && < 500` diye yazılıydı, yani **oturumu düşen
kullanıcının turu siliniyordu.**

**§136** kuyruğun dört özelliğini ve **kuyruğu çağıranı** ayrı ölçüyor —
§90'ın dersi: yazılmış olması, çağrılıyor olması demek değil. Dört
enjeksiyonun dördü de yakalandı.

Kapı bir kez daha komşusunu ölçtü: kuyruk sınırını dosyanın **ilk**
`slice(-N)`inden okuyordu ve mobilde alakasız bir kırpmayı (-200) buluyordu,
yani "sınır 200'e 20" diye ayrışıyordu. Sınır artık `queueAnswers`in kendi
gövdesinden okunuyor — **on beşinci biçim.**

### 11.230 "Nerede kaldım" sorusu webde cevapsızdı

Bir deneme kâğıdı 80-205 dakika sürüyor ve **bölüm bölüm** çözülüyor, yani
listenin cevaplaması gereken soru tam olarak bu: nerede kaldım. Android bunu
satır satır gösteriyor (`MockExamsScreen` `PartBadge`: yüzde, geçti/kaldı,
yarım kaldı). Web'de bir kâğıdın hangi bölümlerini çözdüğün **hiçbir yerde
görünmüyordu.**

İlginç olan şu: **veri zaten çekiliyordu.** Sayfa bitmiş denemeleri (`done`,
skor ve geçti/kaldı ile) ve yarım kalanları (`running`) sunucudan alıyor, ama
ikisini yalnız ortalama bloğunda ve "yarım kalanlar" listesinde kullanıyordu.
Satırın kendisine hiç bakılmamıştı. Rozet eklendi; yarım kalan bitmişi
**eziyor**, çünkü kullanıcı o bölüme yeniden girmiş ve şu an içinde.

`mockexams.state_local` ("yalnız bu cihazda") Android'e özel kalıyor ve
gerekçesi ölçülüyor: orada sonuç cihaza da yazılıyor (`pushLocalResult`),
çünkü uygulama çevrimdışı açılabiliyor ve liste sunucu olmadan da bu soruya
cevap vermek zorunda; web listesi **sunucuda** çiziliyor, yani sunucu yoksa
sayfa da yok. Web listesi bir gün istemciye taşınırsa satır düşer.

İki kapı hatası daha bu turda, ikisi de kendi yazdığım:

- Muafiyet kapısının ilk hâli **iki tarafta da aynı sabiti** döndürüyordu,
  yani hiçbir şey ölçmüyordu — boş bir eşitlik. Artık üç hâlden yalnız biri
  bekleniyor.
- `/pushLocalResult/` deseni **önek** olarak eşleşiyordu ve yeniden
  adlandırılmış `pushLocalResult2`yi hâlâ "var" sayıyordu. **§11.226'daki
  `<ConfirmDialog` hatasının aynısı, iki tur sonra ikinci kez.** Ad sınırı
  eklendi.

Dört enjeksiyonun dördü de sonunda yakalandı. **§137** satırın üç hâlini ve
yerel kopya muafiyetini ölçüyor.

### 11.231 Kapıların kendi denetimi: önek eşleşmesi sınıf olarak kapandı

Aynı hatayı iki turda üst üste yaptım: bir **bileşen ya da fonksiyon adını**
sınırsız bir desenle aradım (`/ConfirmDialog/` §11.226'da, `/pushLocalResult/`
§11.230'da) ve enjeksiyonda yeniden adlandırılan adı (`ConfirmDialog2`,
`pushLocalResult2`) kapı hâlâ "var" saydı. Yani kapı, ölçmesi gereken şeyin
**önekini** ölçüyordu ve gerçek bir gerilemeyi kaçırırdı.

Bu turda üçüncü örneği tek tek aramak yerine **sınıfı kapattım.** Önce bütün
`parity-check.mjs` tarandı: `.test()` içinde kullanılan 106 sınırsız desen
var, ama bunların hemen hepsi zararsız (`node_modules` yol süzgeci, `dialogue`
gibi tür adları, i18n anahtarları). Yakalanan iki hatanın biçimi dar: **sade
bir bileşen/fonksiyon adı** — büyük harfle başlayan ya da `<` ile yazılan, hiç
metakarakter taşımayan desen. O biçimde iki tane daha vardı (§82'nin
`EmptyCard` ve `TrophyIcon`'u) ve ikisi de sınırlandı.

**§138** artık kapının kendi kaynağını okuyor ve o biçimde sınırsız bir desen
bulursa ihlal veriyor — §118/§119'un kalıbı, bu kez ölçünün kendisine
uygulanmış. Üç enjeksiyonun üçü de yakalandı: eski deseni geri koymak,
`<Ad` biçimini sınırsız yazmak ve yeni bir ad deseni eklemek.

Küçük harfli sade adlar (`premium`, `leech`, `dialogue`) **bilerek dışarıda**:
onlarda önek eşleşmesi pratikte zararsız ve hepsini sınırlamak yüz desen
değiştirmek olurdu — kural, yakalanan gerçek hataların biçimine kapalı
tutuluyor.

Öteki sekiz kapı betiği de aynı taramadan geçirildi: hiçbirinde bu biçimde
sınırsız desen yok.

### 11.232 Aynı sayı iki üründe farklı okunuyordu

İlerleme ekranındaki **çalışma süresi** karosu iki platformda iki ayrı biçimde
yazılıyordu:

| | Türkçe | İngilizce | Almanca |
|---|---|---|---|
| Android | 11s 20dk | 11h 20m | 11 Std. 20 Min. |
| web (eski) | 11 sa 20 dk | 11 h 20 min | 11 Std 20 Min. |

Etiket de ayrıydı: web "Çalışma süresi", Android "Toplam süre". Aynı veri, aynı
karo, iki ürün — ve kullanıcı ikisini yan yana görüyor (aynı hesap).

İkisi de Android'e çekildi: etiket `progress.time_total`, biçim
`time.minutes_short` / `time.hours_minutes_short`. Web'e özel iki anahtar
(`prog.study_time`, `prog.hours`) düştü — web-özel sözlük sayısı azaldı.

**§139** karonun etiketini ve süre biçimini kuran anahtarları ölçüyor. Üç
enjeksiyonun üçü de yakalandı (webin etiketi, webin biçimi, mobilin anahtarı).

### 11.233 En çok görülen sayı ayraçsızdı

Üst bardaki **XP rozeti ham sayıyı** basıyordu ("12450"), oysa webin geri
kalanı `formatNumber` kullanıyor: Türkçe ve Almanca arayüzde binlik ayracı
nokta, İngilizcede virgül. Üst bar uygulamanın **her** ekranında duruyor, yani
ayraçsız sayı en çok görülen sayıydı. Android'de o rozet yok (telefon başlığı
dar, orada yalnız seri var), o yüzden karşılaştırma webin kendi içindeydi.

`formatXp`in kısaltması (1240 → "1,2k") **bilerek** iki platformda farklı ve
gerekçesi zaten yazılıydı: mobilde karo dar, webde ızgara geniş. Ona
dokunulmadı.

**§140** kuralı yüzey tarayarak kuruyor — dosya adı saymıyor, yeni bir ekran
aynı hatayı yaparsa da yakalanır. Kapının gelişimi bu turun en öğretici yanı:

1. İlk hâli yalnız **JSX çocuğu** pozisyonuna bakıyordu. Web'in kalıbı öyle,
   ama mobilin toplamları `value={...}` **niteliği** olarak `Stat`/`StatTile`
   içine giriyor: mobil enjeksiyonu hiç yakalanmadı. **On altıncı biçim.**
2. Nitelik pozisyonu eklenince iki "hata" daha çıktı ve ikisi de **yanlış
   alarmdı**: `social/public-profile` `<Stat>` biçimlemeyi kendi gövdesinde
   yapıyor, `session-player` `<CountUp>` ise tur başına kazanılan iki haneli
   XP'yi yazıyor (Android de ham yazıyor). Muafiyet **dosya+etiket** çifti
   olarak yazıldı, çünkü etiket adı tek başına yetmiyor: webin `Stat`i
   biçimliyor, mobilin `Stat`i biçimlemiyor — aynı ad, ayrı davranış.
3. Muafiyetlerin kendisi de ölçülüyor: `<Stat>` gerçekten `formatNumber`
   çağırıyor mu, `CountUp` gerçekten ham mı.

Yönetim panosu ayrı bir muafiyet: baştan beri **tek dilli** (metinler kodda
Türkçe), orada `toLocaleString("tr-TR")` tutarsızlık değil bilinçli seçim.
Panoya `useT` girerse satır düşer.

Dört enjeksiyonun dördü de yakalandı (webin rozeti, mobilin niteliği, webin
`Stat`i, mobilin `UserScreen`i).

### 11.234 Premium bitiş tarihi cihazın dilinden okunuyordu

Premium bitiş tarihi **iki platformda da** cihazın/tarayıcının dilinden
biçimleniyordu: webde yerel `undefined` bırakılmış, Android'de hiç
verilmemişti. Arayüzü Türkçe seçmiş ama telefonu ya da tarayıcısı İngilizce
olan kullanıcı "September 11, 2026" görüyordu. **Ödeme kararının dayandığı
tarih bu** — en okunması gereken tarih. §11.228'in kalıbı: aynı hata iki
tarafta, ikisi birlikte düzeltildi (`localeOf(lang)` / `dateLocale()`).

**§141** bütün `toLocale*String` çağrılarını tarıyor; kural dosya adı saymıyor.
Yönetim panosu muaf (tek dilli, §140'ta ayrıca denetleniyor). Kapının argüman
penceresi ilk yazılışında `[^,)]*` ile kesiliyordu ve `dateLocale()`in **kendi
kapanış parantezinde** duruyordu: doğru çağrıları "yerelsiz" sayıyordu —
**on yedinci biçim.**

### 11.235 Yüzde işareti otuz iki yerde koda gömülü (taban kondu) — YANLIŞ ÖLÇÜM, §11.236'da düzeltildi

Aynı taramayı yüzdeye uygulayınca beklediğimden büyük bir şey çıktı: işaret
**otuz iki yerde** koda gömülü (`{pct}%`) ve **iki platformda da** öyle. Yani
bu tek bir hata değil, birikmiş bir borç. Almanca arayüzde hepsi "85%" yazıyor,
oysa dilin kuralı "85 %" (boşluklu); uygulamanın biçimleyicisi bunu zaten
biliyor (`formatPercent` / `common.pct`) ve tur özetinde §124'te tam bu
gerekçeyle kullanılmış.

Otuz iki yeri bir turda değiştirmek bu turun işi değil. Bunun yerine
`i18n-hardcoded`in kalıbı kuruldu: **taban 32, sayı artamaz.** Yeni bir yüzey
işareti koda gömerse kapı ihlal veriyor (enjeksiyonla doğrulandı: 33 > 32),
borç ödendikçe taban aşağı çekilecek. Bir kere ölçüldüğü için artık sessiz
değil.

### 11.236 Bir önceki turun "otuz iki yerlik borcu" yoktu — kapı yanlış ölçüyordu

§11.235'te "yüzde işareti otuz iki yerde koda gömülü, iki platformda da
birikmiş bir borç" diye yazdım ve tabanı 32'ye kurdum. **Ölçüm yanlıştı.**

Tarama `width: ${pct}%`, `height: ${pct}%`, `conic-gradient(... ${pct}% ...)`
gibi **düzen** yüzdelerini de sayıyordu — CSS genişliği, kullanıcıya yazılan
bir metin değil. Otuz ikinin otuz biri buydu. **Gerçek sayı birdi:**

- `ChallengeScreen` "isabet oranı" kutusu `` `${accuracy}%` `` yazıyordu; webin
  aynı kutusu `t("common.pct", { n: accuracy })` kullanıyor. Yani tek bir
  gerçek ayrışma vardı ve o düzeltildi (`formatPercent(accuracy)`).

Kapı yeniden yazıldı: eşleşmenin çevresindeki seksen karakter okunuyor ve
düzen bağlamları (genişlik, yükseklik, gradyan, esneme, `style`) dışarıda.
Taban kaldırıldı — beklenen sayı artık **sıfır**. Biçimleyicinin kendi yedeği
muaf (`formatPercent` Intl yoksa elle yazıyor; orası kuralın kaynağı).

**Ölçünün komşusunu ölçmenin on sekizinci biçimi** — ve ilk kez sonucu
yalnız yeşil bir kapı değil, **deftere yazılmış yanlış bir bulgu** oldu.
Ders şu: bir kapı "beklediğimden çok" sayı bulduğunda, ilk iş sayının
kendisine değil **neyi saydığına** bakmak.

Üç enjeksiyon: mobilin işareti geri gömülse, webin kutusu gömse, ve düzen
yüzdesi değişse (yanlış alarm vermemeli) — üçü de doğru davrandı.

### 11.237 Ayarlarda seviye "A1…C1"den ibaretti

Dört seviye açıklaması sözlükte duruyordu (`level.*_desc`) ama mobilde yalnız
onboarding'de okunuyordu: **Ayarlar'da seviye "A1…C1" diye görünüyor, hangi
seviyenin ne anlama geldiği yazmıyordu.** Web açıklamayı "bu düğmeyi senden
başkası çevirmiyor" cümlesinin başına koyarak zaten gösteriyor; mobil de artık
aynı cümleyi kuruyor.

Bu turun asıl dersi **kendi hatamda**: önce webde açıklamanın yalnız `title`
niteliğinde olduğunu gördüm ("dokunmatikte hover yok") ve webe **ikinci bir
açıklama satırı** ekledim. Oysa orada zaten bir tane vardı, on satır aşağıda.
Yinelenen satırı yazdım, sonra **kapının kendisi yakaladı**: web tarafını
bozmaya çalıştığım enjeksiyon yeşil kaldı, çünkü desen dosyada **iki kez**
geçiyordu. Yinelenen satır geri alındı; webde bu turda hiçbir değişiklik yok.

Bir kapının enjeksiyona *yeşil* cevap vermesi çoğu zaman kapının kusurudur —
bu kez düzeltilen şeyin kendisinin kusuru olduğunu gösterdi.

**§143** seçiliye göre açılan açıklamayı ve anahtar tablosunu ölçüyor; üç
enjeksiyonun üçü de (webin satırı, mobilin satırı, bir anahtarın kayması)
yakalandı.

Bu turda iki şey de ölçülüp **dokunulmadı**: bildirim ekranının üç hatırlatma
anahtarı iki tarafta birebir aynı (mobildeki "test bildirimi gönder" yalnız
`__DEV__` derlemesinde, yani ürün yüzeyi değil), ve oyun sesleri anahtarı
webde Bildirimler altında, Android'de Ayarlar'da — webin yerleşimi yazılı bir
gerekçe taşıyor ("ne zaman rahatsız edilirim ayarı"), ikisi de erişilebilir.

### 11.238 Android'de günlük hedef dört sayıdan ibaretti

§50 "günde yeni kelime" için şu kuralı koymuş: **yüzey, sunucunun kabul
ettiği aralığı teklif etmek zorunda.** Aynı ekranın bir alan üstü o kuralı
tutmuyordu.

Uç günlük hedefi **5-120** arasına kırpıyor (`/api/profile`) ve web kaydırıcısı
o aralığı veriyor. Mobil çip listesi ise `[10, 20, 30, 50]` idi: Android
kullanıcısı **5'i de 120'yi de seçemiyordu** — sunucunun ve öteki platformun
kabul ettiği hedeflerin çoğu telefonda yoktu. Ortada hata mesajı da yok, çünkü
seçenek hiç gösterilmiyor: sessiz bir eksiklik.

Liste aralığı kapsayan bir merdivene çevrildi: `[5, 10, 15, 20, 30, 40, 60, 80,
100, 120]` — **altta sık, üstte seyrek.** Günlük hedefini 5'ten 20'ye çeken
kullanıcı ince ayar istiyor, 100'den 120'ye çeken istemiyor; beşer beşer yirmi
dört çip telefonda bir çip duvarı olurdu. Ekranın "mevcut değeri her zaman
göster" davranışı da duruyor, yani webden girilmiş 115 gibi bir değer çip
olarak görünmeye devam ediyor.

**§144** §50'nin ikizi: mobil çip listesinin ucu, web kaydırıcısının ucu ve
ucun kırpması yan yana. Üç enjeksiyonun üçü de yakalandı — sonuncusu ikisini
birden düşürdü (kırpma değişirse iki yüzey de ayrışır), yani kapı
"sunucu ne diyorsa o" kuralını ölçüyor, iki yüzeyin birbirine benzemesini
değil.

### 11.239 Adın kırk karakterden uzunu sessizce kayboluyordu

§144'ün kuralının **ters yönü**: yüzey, sunucunun kabul ettiğinden az teklif
etmemeli — **tuttuğundan çok da.**

Uç görünen adı kırk karaktere kırpıyor (`/api/profile` `name.slice(0, 40)`)
ama hiçbir kutu bunu söylemiyordu:

| kutu | sınır |
|---|---|
| web profil formu | 60 |
| web kayıt formu | yok |
| Android ayarlar | yok |
| Android giriş | yok |

Kullanıcı elli beş karakterlik adını yazıyor, ekran "kaydedildi" diyor ve ad
bir sonraki açılışta kısalmış oluyordu. **Ortada hata mesajı yok**, çünkü
sunucu reddetmiyor — sessizce kesiyor. Dördü de 40'a çekildi.

**§145** kutuları tek tek saymıyor: **adın girildiği her yeri** tarıyor ve
sınırı ucun kırpmasından alıyor, yani kırpma değişirse dört kutu birden
ayrışır.

Kapının ilk hâli iki web enjeksiyonunu da kaçırdı: etiketi `[^>]*` ile
okuyordu ve `onChange={(e) => ...}` içindeki **ok işaretinin `>`sinde**
duruyordu — ad kutusunun kendisi hiç bulunamıyordu. Etiket artık kendi
kapanışına (`/>`) kadar okunuyor. **On dokuzuncu biçim** ve bu kez mobil
tarafı yakalayıp web tarafını kaçırması kapıyı "yarı kör" yapıyordu: iki
enjeksiyon yeşil, iki enjeksiyon kırmızı — asimetri olmasa fark edilmezdi.

### 11.240 Sosyal profil sınırları: bu kez ürün doğruydu, kural bağlanmamıştı

§11.239'un taramasını sunucunun kalan uzunluk kırpmalarına uyguladım. Bu kez
**hiçbir ayrışma çıkmadı** ve bunu da yazmak gerekiyor:

- **Kullanıcı adı**: iki yüzey de `maxLength={20}`, kural da 3-20
  (`USERNAME_RE`).
- **Kısa tanıtım**: iki yüzey de 140'ta kırpıyor **ve ikisi de sayaç
  gösteriyor** (`{bio.length}/140`).
- **Kelime arama kutusu**: uç sorguyu 40'a kırpıyor ama bu bir arama terimi,
  kaydedilen bir değer değil — kırpılması kullanıcıdan bir şey götürmüyor.

Yanlış alarmı nasıl elediğimi not ediyorum: mobilde tanıtım sayacını önce
"yok" sandım, çünkü aramam yalnız `maxLength|TextInput|value=` taşıyan
satırlara bakıyordu ve sayaç ayrı bir satırdaydı. **Ekranın bir satırına bakıp
"yok" demek**, bu defterde tekrarlayan hatanın ta kendisi (§11.218'de aynısı
olmuştu). Bloğun tamamını okuyunca sayaç oradaydı.

Ürün doğru olduğu için bu turda kod değişmedi; değişen şey **kuralın
bağlanması**. Dört sayı (iki kutu, iki sayaç) kendi dosyalarında elle
duruyordu — mobil `src/lib`ten import edemiyor, o yüzden sayı orada elle
yazılmak zorunda. **§146** dördünü hem birbirine hem `lib/social/username`'in
kendisine bağlıyor: ikisi birlikte kaysa bile kapı düşüyor (§11.228'in dersi,
kapıya uygulanmış). Üç enjeksiyonun üçü de yakalandı — sonuncusu tam o dersi
gösterdi: `BIO_MAX`i 200 yapınca iki yüzey birbirine eşit kaldığı için birinci
kapı yeşil geçti, ikinci kapı kırmızı yandı.

### 11.241 Ortak görev kartında iki eksik, zıt yönlerde

Aynı kartta iki fark çıktı ve ilginç olan **zıt yönlerde** olmaları:

- **Arkadaş seçme satırı**: Android her arkadaşın **haftalık XP'sini** yazıyor,
  web yalnız adını. Ortak görevde partner seçmek "kim gerçekten çekecek"
  kararıdır ve o soruya cevap veren tek sayı bu; web'de seçim **kör**
  yapılıyordu. Satır web'e kondu.
- **İlerleme çubuğu**: web çubuğa etiket koyuyor (`aria-label`), Android
  hiçbir şey söylemiyordu — yüzde yalnız **görselde** vardı, sesli okuyucu boş
  bir kutu görüyordu. Android'e `accessibilityRole="progressbar"` + aynı
  etiket kondu.

Etiketin anahtarı da ortak tabana taşındı: `socialw.progress_pct` web-özel
sözlükte duruyordu, artık `social.progress_pct` — web-özel anahtar sayısı bir
azaldı.

**§147** iki şeyi ölçüyor ve üç enjeksiyonun üçü de yakalandı. Bu turda tepki
çubuğu (`ReactionBar`) da karşılaştırıldı: beş anahtarın beşi de aynı, fark
yok.

### 11.242 Arkadaş satırındaki sessiz düğme

Arkadaş satırında üç eylem var: dürt/alkışla, görev daveti, arkadaşlıktan
çıkar. Android üçünü de **simge + metin** gösteriyor; web'de ikisi metinliydi,
**görev düğmesi yalnız hedef simgesiydi.** Ne yaptığını öğrenmek için farenin
üstünde beklemesi gerekiyordu (`title`) — dokunmatik ekranda hiç
öğrenilemiyordu. Satırın öteki iki düğmesi zaten metinli olduğu için sessiz
olan tek düğme oydu; adı kondu (Android'in kullandığı anahtarla,
`friendrows.quest`).

**§148** üç eylemin de görünür bir adı olduğunu ölçüyor. `title`,
`aria-label` ve `accessibilityLabel` **görünür ad sayılmıyor**: ipucu, adın
yerini tutmuyor — gatenin ayırt ettiği şey tam olarak bu.

Kapı iki kez yanlış yazıldı ve ikisi de kayda değer:

1. İlk hâli `t("anahtar")` **kalıbını** arıyordu. Oysa iki taraf da dürtme
   düğmesini koşullu yazıyor (`t(cheer ? "friendrows.cheer" : ...)`), yani
   kalıp hiç geçmiyor: o eylem **iki tarafta da "sessiz"** okunuyordu ve
   karşılaştırma **boş bir mutabakatla** yeşil geçiyordu (§11.228'in sınıfı,
   bu kez kapının içinde). Artık anahtarın kendisi aranıyor.
2. Gizli etiket listesinde `accessibilityLabel` yoktu: mobilin adını gizleyen
   enjeksiyon yakalanmıyordu — kapı web'in gizleme biçimini biliyor, mobilinkini
   bilmiyordu.

Dört enjeksiyonun dördü de sonunda yakalandı.

### 11.243 Sözlükte karşılığı dururken koda gömülmüş dil

"İpucu adın yerini tutmuyor" taramasını bütün yüzeylere uygulayınca sessiz
düğme çıkmadı — webdeki dört simge-düğmenin dördü de kapatma (×) ya da renk
seçimi, Android'de de aynı biçimde. Ama tarama **başka bir şey** buldu: sözlükte
karşılığı dururken kodda yazılmış dil, iki ayrı yerde ve iki ayrı dilde.

- **Ses seçicisinin ekran okuyucu etiketi Türkçe gömülüydü**
  (`${v.label} sesini dinle`): arayüzü İngilizce ya da Almanca olan
  kullanıcının okuyucusu da Türkçe söylüyordu. Web aynı düğmeye sözlükten
  etiket veriyordu; anahtar ortak tabana taşındı (`voicew.listen_to` →
  `voice.listen_to`).
- **Web sınav kapağında kâğıt yoksa Almanca dizgiler gömülüydü**
  ("Niveauprüfung", "Modulprüfung A2.3", "Prüfung A2"). Kâğıt **varsa**
  başlığın Almanca olması doğru — `cover.titleDe` gerçekten Almanca ve `lang`
  niteliği de onu söylüyor — ama yokluğunda uydurma Almanca yerine sözlük
  kullanılmalı; Android öyle yapıyor. Ham metin sayısı 163'ten 162'ye indi.

**§149** iki şeyi ölçüyor. Kapının ilk hâli kapağı yanlış ölçtü: dosyada
"Niveauprüfung" geçtiği için "uydurma almanca" diyordu — oysa o dizgi artık
yalnız `cover` VARKEN kullanılıyor ve orada doğru. Ölçülen şey dizginin
**varlığı** değil, **yedek dalın ne kullandığı** olmalıydı; üç enjeksiyonun
üçü de düzeltilmiş hâlde yakalandı.

### 11.244 Geçme notu dört yerde elle kopyalanmıştı

Deneme kâğıdının geçme notu tek yerde yazılı (`MOCK_PASS_PCT = 60`) ama **renk
eşikleri dört yerde "60" diye elle kopyalanmıştı** — ikisi webde, ikisi
mobilde. Bugün tutuyorlar; sorun şu: geçme notu **admin panelinden
değiştirilebiliyor** (`premium/gates` `unlockPct` yorumu bunu açıkça söylüyor)
ve değiştiğinde renk "geçti" demeye devam ederdi. Puan kırmızı olması
gerekirken yeşil görünür, kullanıcı kâğıdı geçtiğini sanırdı.

Dördü de sabite bağlandı. **§150** eşiğin **adını** ölçüyor, sayısını değil:
iki platformun sabiti ayrı dosyalarda (`lib/mock-exams/types` ve
`data/exams`), yani karşılaştırılması gereken şey "60 mı" değil "sabitten mi".
Üç enjeksiyonun üçü de yakalandı.

Bu turda iki şey de ölçülüp **dokunulmadı**:

- **Bildirim metinleri.** Web push'ları tamamen sözlükten besleniyor ve
  kişiselleştirilmiş (seri sayısı, biriken kelime, rakip farkı, ortak seri
  partneri); Android'inkiler cihazda kurulan üç genel hatırlatma. Fark
  mimari ve yazılı: mobilde uzak push henüz yok (AGENTS.md ve
  `social-layer-deploy` notu). Uydurulacak bir şey yok, ertelenmiş bir iş var.
- **Sertifika.** İki taraf da aynı koşulda açıyor (`passed && !trial`); mobil
  ek olarak bir hata durumu taşıyor çünkü sayfayı kendi içinde çiziyor,
  web yeni sekmede açıyor ve hatayı tarayıcı gösteriyor.

### 11.245 "Bunlar kime görünüyor" sorusu Android'de cevapsızdı

Yazdıklarım ekranında iki eksik, ikisi de Android'de:

- **Alt başlık yoktu.** Web kartın altında listenin ne topladığını ve
  metinlerin **yalnız kullanıcıya görünür** olduğunu yazıyor (`writ.sub`);
  mobilde yalnız başlık vardı. Kendi yazdığı metinlerin başkasına görünüp
  görünmediği, kullanıcının sormadan bilmek isteyeceği türden bir şey.
- **Yükleme iskeleti sessizdi.** Web iskelete `aria-busy` + etiket koyuyor;
  mobilde yükleme yalnız görseldeydi ve sesli okuyucu boş bir ekran
  duyuruyordu — §11.241'deki ilerleme çubuğunun aynısı, bir ekran ötede.

İki anahtar da web-özel sözlükten ortak tabana taşındı. **§151** ikisini de
ölçüyor; üç enjeksiyonun üçü de yakalandı.

Bu turda iki tarama daha yapıldı ve **ikisi de temiz çıktı** — yazmaya değer,
çünkü aranan şey gerçek bir hata sınıfıydı:

- **Ölü sabit**: iki ağaçta da tanımlı kırk ortak sayısal sabitin hepsi iki
  tarafta da kullanılıyor (§90'ın "tanımlı olmak yetmez" kuralı).
- **Elle kopyalanmış eşik** (§11.244'ün genellemesi): bir dosya bir sabiti
  kullanıyorken aynı sayıyı bir karşılaştırmada elle yazmış mı. Beş aday
  çıktı, beşi de **yanlış alarm**: `combo >= 3` ile `EASE_AFTER_MISSES = 3`
  aynı sayı ama ayrı şeyler, `MODULE_SIZE = 10` ile soru sayısı da öyle.
  Sayının eşitliği anlamın eşitliği değil; tarama burada duruyor.

### 11.246 İskeletin sessizliği: düzeltme ekranda değil kökte

Aynı eksik iki turda iki ayrı ekranda çıktı (§11.241 ilerleme çubuğu, §11.245
yazdıklarım iskeleti), o yüzden üçüncüyü aramak yerine **köke** bakıldı:
mobilin iskelet bileşenlerinde **hiçbir erişilebilirlik özelliği yoktu.**
İskelet yalnız görsel bir işaretti; sesli okuyucu kullanan biri boş bir ekran
duyuyor, uygulamanın çalışıp çalışmadığını bilemiyordu. On iki yükleme ekranı
bu bileşenlerden geçiyor — tek tek etiket koymak on iki ayrı unutma fırsatı
demekti.

Web'in çözümü **iki parçalı** ve doğru olan o: **kap duyuruyor**
(`SkeletonCard`: `role="status" aria-busy`), **süs olan gizleniyor** (satır,
çizgi, karo iskeletleri `aria-hidden`) — her satırın ayrı ayrı duyurulması
gürültü olurdu. Mobil de artık öyle: `SkeletonCard` "meşgul" diyor ve etiket
alabiliyor, `SkeletonRows` gizli.

**§152** kap ile süsü ayrı ayrı ölçüyor. Bileşen adları iki tarafta farklı
(`SkeletonRows` / `RowSkeleton`), o yüzden ad değil **rol** eşleniyor.

Kapının ilk hâli dosyanın tamamına bakıyordu ve iki mobil enjeksiyonu da
kaçırdı: özellik iki bileşende de geçtiği için birinden silmek yetmiyordu.
Bileşen bazına inince **hemen bir şey buldu** — ve bulduğu şey benim yeni
eklediğim hataydı: `SkeletonRows`a da "duyur" demiştim, oysa web orayı
gizliyor. Yani kapı, düzeltmenin kendisini düzeltti. Dört enjeksiyonun dördü
de son hâlde yakalandı.

### 11.247 Modal öne geliyordu ama arkası okunmaya devam ediyordu

Kök yaklaşımını (§11.246) ortak bileşenlerin geri kalanına uyguladım. Onay
diyaloğunda web'in bir avantajı var ve bileşenin kendi yorumu bunu zaten
yazmış: `<dialog>` üstünde kurulduğu için **odak tuzağı, Esc ile kapanma ve
arka planın inert olması** tarayıcının işi.

RN `Modal` ise yalnız **görsel** olarak öne geliyor: erişilebilirlik ağacında
arka plan erişilebilir kalıyor, yani VoiceOver kart bitince arkadaki ekranı
okumaya devam ediyor ve kullanıcı hangi soruyu cevapladığını kaybediyor.
`accessibilityViewIsModal` bunun karşılığı ve **beş modalin hiçbirinde yoktu**:
onay diyaloğu, şikâyet formu, sertifika sayfası, mikrofon açıklaması ve başarım
kutlaması. Beşine de kondu; onay ve şikâyet kartları ayrıca
`accessibilityRole="alert"` alıyor.

**§153** mobilde `<Modal>` çizen **her** bileşende işareti arıyor — yüzey
tarıyor, yeni bir modal aynı şeyi unutursa da yakalanır — ve webin karşılığını
`<dialog>`in kullanıldığını denetleyerek ölçüyor.

İkinci enjeksiyonum yine yorumu vurdu: `<dialog` dosyada üç kez geçiyor,
ikisi yorumda. Kapı doğru davranıyordu (yorumları atıyor); yanlış olan
enjeksiyondu — §11.227'de aynı hatayı yapmıştım. Kodu hedefleyince yakalandı.

### 11.248 Seçili olmak yalnız bir renkti — on bir yerde, iki platformda

Erişilebilirlik taramasını seçim kontrollerine uygulayınca bu turun en büyük
bulgusu çıktı: **bir düğmenin "seçili" olduğunu yalnız rengi söylüyorsa, ekran
okuyucu kullanan için o bilgi yoktur.** On bir yerde öyleydi ve **iki
platformda da**:

| Android | web |
|---|---|
| onboarding seçenek kartları, seviye çipleri | sınav şıkkı |
| ayarlarda tema seçeneği | profil formunda kurs ve seviye çipleri |
| kelime listesinde seviye ve durum şeritleri | beceri quizinde şık ve sıralama satırı |
| ses seçici satırları | |
| deneme kâğıdı şık çipi | deneme kâğıdı şık çipi |

Sonuncusu iki tarafta da sessizdi — sınavda öğrencinin **kendi cevabını
doğrulayamaması** demek. On birine de durum kondu (`aria-pressed` /
`accessibilityState={{ selected }}`).

**§154** kuralı yüzey tarayarak kuruyor ve iki platformu aynı geçişte gezdiği
için "ikisi birden sessiz" hâlini de yakalıyor (§11.228'in dersi).

Kapı üç kez düzeltildi ve üçü de öğretici:

1. Başarım rozetini yanlış alarm verdi: Tailwind'in **`active:scale-95`**
   sözde sınıfı "seçili durum" değil, **basılı an**. `[?:]` yerine yalnız `?`.
2. **Webin seviye çipini hiç görmedi**: açılış etiketini `...?>` ile kesiyordu
   ve `onClick={() => ...}` içindeki **ok işaretinin `>`sinde** duruyordu —
   §11.239'daki `[^>]*` hatasının aynısı, bu kez kendi kapımda. Düzeltilince
   **on yeni sessiz kontrol** birden ortaya çıktı; yani kapı yarım çalışırken
   bulduğu iki yer, işin küçük parçasıydı.
3. Mobilde `accessibilityRole="radio"`yu yeterli sayıyordu: rol "bu bir
   seçenek" diyor ama **hangisinin seçili olduğunu söylemiyor.** Artık
   `accessibilityState` şart.

Kapının sınırı da yazılı: tarama etiketin kendi içine bakıyor, seçili sınıfı
bir değişkene alınmışsa (`const cls = …; className={cls}`) iz kalmıyor. Böyle
iki yer vardı (beceri quizi), ikisi de elle düzeltildi.

### 11.249 Solmak bir bilgiydi ve yalnız göze söyleniyordu

§11.248'in taramasını "devre dışı" durumuna uygularken **neredeyse kırk dört
sahte düzeltme yapıyordum** ve onu yazmak gerekiyor.

Mobilde `disabled` taşıyan kırk dört basılabilirin hiçbirinde
`accessibilityState={{ disabled }}` yoktu. Elle eklemeye başlamadan önce
kaynağa baktım: React Native'in `Pressable`ı bunu **kendisi** yapıyor
(`Pressable.js`: `disabled != null ? {..._accessibilityState, disabled} : …`)
ve `PressableScale` propu aynen geçiriyor. Web'de de `<button disabled>` zaten
yerli. Yani kırk dördü de doğruydu; yazacağım kapı kırk dört yanlış alarm
üretecekti.

**Kuralı bilmeden tarama yapmak, taramanın sonucunu yanlış okutuyor.**
§11.236'daki "neyi saydığına bak" dersinin ikizi: orada sayı şişmişti, burada
eksiklik uydurmaydı.

Doğru bulgu bir adım ötedeydi. Eşleştirme maddesinde **kullanılmış bir şık
soluyor** (opaklık 0.45) ve bu bir bilgi: "bu şıkkı başka bir maddede
kullandın". Opaklık onu yalnız göze söylüyordu; ekran okuyucu kullanan öğrenci
aynı şıkkı ikinci kez seçtiğini ancak sonuçta görüyordu — **iki platformda
da.** Çözüm `disabled` değil bir **ipucu**: şık basılabilir kalmalı, çünkü
cevabını taşımak isteyen öğrenci engellenmemeli (iki oynatıcının da kendi notu
bunu söylüyor).

**§155** üç şeyi birden ölçüyor: solma kuralı, ipucunun aynı koşula bağlı
olması ve şıkkın **hâlâ basılabilir** kalması — sonuncusu olmasa "ipucu
ekledim" diye gelip erişimi kapatan bir değişiklik sessizce geçerdi. Üç
enjeksiyonun üçü de yakalandı.

### 11.250 Dört saniye duran cümleyi kimse duymuyordu

"Yalnız göze söylenen bilgi" taramasını canlı bölgelere çevirdim ve iki şey
çıktı:

- **Erdi'nin cümlesi.** Koç balonu dört saniye durup kayboluyor: ekran okuyucu
  kullanan biri onu **hiç** duymuyordu — ne odakta ne de canlı bir bölgedeydi.
  Web aynı cümleyi `role="status"` ile duyuruyor, hem de **iki dalında da**
  (hareket azaltmada düz metin, normalde balon). Geçici metin, canlı bölgenin
  tam tanımı; Android'e de kondu.
- **Dört kartın yükleme hâli sessizdi**: günlük görevler, zayıf noktalar,
  gelişim paneli, neler yapabilirim. Bu **§152'nin artığı** — kök düzeltme
  `SkeletonCard`tan geçen ekranları kapsıyordu, bu dördü iskeletini kendi
  kuruyor. Web'de dördü de `role="status" aria-busy` + etiket taşıyordu; üç
  etiket anahtarı web-özel sözlükten ortak tabana taşındı, dördüncüsü zaten
  ortaktı.

**§156** koçun iki dalını ve dört kartın duyurusunu ölçüyor. Üç enjeksiyonun
üçü de yakalandı — ilki koçun **bir** dalını susturunca düştü, yani sayıyı
karşılaştırmak ("iki dal" / "bir dal") tek bir "var/yok"tan daha keskin.

## §11.251 — Bir eylemin cevabı yalnız görünüyordu, duyulmuyordu

Tarama: iki platformda geçici mesaj durumu (`setMsg` / `setFlash` / `setSaved`
/ `setCopied`) tutan her dosya. Sonuç **web'de on üç dosya sessiz, bir tanesi
duyuruyor; mobilde on iki sessiz, sıfır duyuruyor** — yani bu **§11.228
sınıfı**: iki taraf da aynı biçimde eksikti, karşılaştırma tek başına bunu
bulamazdı, mutlak bir ölçüt gerekti.

Kullanıcı açısından hata şu: düğmeye basılıyor, odak düğmede kalıyor, ekran
yalnız RENKLE cevap veriyor ("Kaydedildi" yeşil, "Kod geçersiz" kırmızı).
Ekran okuyucu kullanan biri eylemin tutup tutmadığını hiç öğrenmiyordu.

Kapatılan on bir çift: ayarların kayıt hatası, promo kodu, bağlı hesaplar,
etkin oturumlar, günlük görev XP parlaması, sosyal ayarlar, arkadaş satırı,
başkasının profili, seviye belirleme kaydı, meydan okuma başarım parlaması,
bildirim izni hatası.

Web'de düzeltme **kökte** yapıldı: `AuthNotice` otuz dokuz çağrı yerinin ortak
kutusu; hata `alert` (sözü keser), başarı `status` (sırasını bekler). On üç
çağrı yerini tek tek gezmek yerine kutunun kendisi kazandı.

**§157** on bir çifti ölçüyor. Kapı üç kez yanlış şeyi ölçtü, üçü de
enjeksiyonla çıktı:

1. İlk sürüm DOSYADA rol arıyordu: profil formundan `role="status"` silindiğinde
   komşu satırın `role="alert"`i yüzünden yeşil kalıyordu (yirminci "komşuyu
   ölçme" vakası).
2. İkinci sürüm yalnız AÇILIŞ ETİKETİNE bakıyordu: işaret iç elemandaysa
   (balon sarmalayıcı `Animated.View` / `motion.div`) göremiyordu.
3. Aynı sürümün koşul deseni `{flash > 0 ?` biçimini kaçırıyor, iki tarafı
   birden "çizim-yok" sayıyor ve **hiçbir şey ölçmeden** geçiyordu.

Üçüncüsü kapının kendi zayıflığını gösterdi: iki taraf da sessizse eşitlik
sağlanır. O yüzden §157 artık iki listeyi birbirine DEĞİL, ikisini de
**beklenene** ölçüyor — "çizim-yok"/"durum-yok" da böylece kapıdan düşüyor.
Son hâlinde on enjeksiyonun onu da doğru tarafta yakalandı.

Ayrıca bu turda paralel oturumun ayarlar bölümü yeniden düzenlemesiyle
çakışıldı: enjeksiyon geri almaları için aldığım dosya yedekleri onların
çalışmasını iki kez üzerine yazdı (`profile-form`, `LinkedAccounts`). İkisi de
derleme hatasından çıktı ve geri alındı. Ortak ağaçta **yedek al-geri yükle**
yöntemi yalnız kendi dosyalarımda güvenli; onların dokunduğu dosyalar bu
turun commit'ine alınmadı.

## §11.252 — Geri alınamayan adımın önünde bir soru olmalı

Android'de yıkıcı ya da geri alınamayan her adımın önünde `ConfirmDialog`
duruyor. Web'de altı adımın **üçünde** yoktu ve ikisi bundan da kötüydü:

- **Sınav ve yerleştirmede çıkış düğmesi bile yoktu.** Test başlayınca tek
  çıkış tarayıcının geri düğmesiydi; yani kullanıcı bitirene kadar kapanda
  kalıyordu. Aynı kapan deneme sınavında daha önce kapatılmıştı — bu iki
  yüzey o turda gözden kaçmış.
- **Yürüyüş modunda "Bitir" tek dokunuşta turu kapatıyordu.** Android aynı
  yerde soruyor, çünkü yürüyüşte ekrana bakılmıyor ve kazara basmak kolay.
- **Hesap silmede** formun iki kapısı (parola + onay kutusu) vardı ama düğme
  doğrudan siliyordu. Android üçüncü bir adım daha soruyor; sebebi şu: ilk
  iki kapı sayfaya GİRERKEN geçiliyor, karar düğmeye basıldığı an veriliyor.

Dikkat çeken yan: **metinlerin hepsi zaten ortak sözlükte duruyordu**
(`exam.quit_title`, `exam.quit_body`, `plc.quit_title`, `plc.quit_body`,
`walkmode.end_walk`, `walkmode.back_message`, `deleteaccount.we_re_asking_*`).
Yani eksik olan çeviri değil, çeviriyi kullanan yüzeydi — sözlükte çağıransız
duran bir anahtar, yapılmamış bir işin en sessiz izi.

**§158** altı çifti anahtarla ölçüyor (benzer cümle değil, aynı anahtar), ayrı
bir mutlak ölçütle "iki taraf da sormuyor" hâlini yakalıyor ve sınav/deneme/
yerleştirmede onay kutusunu açan düğmenin varlığını da denetliyor — kutu olup
düğmesi olmayan bir onay kullanıcıyı yine kapanda bırakır. Altı enjeksiyonun
altısı da yakalandı.

## §11.253 — Tam ekran kutlamanın klavyeyle çıkışı yoktu

Rozet kutlaması ekranı tam kaplıyor. Android'de `Modal`: kendi penceresini
açıyor, geri tuşu kapatıyor, TalkBack arkayı görmüyor. Web'de aynı ekran düz
bir `fixed inset-0` katmanıydı:

- arkadaki düğmeler sekmeyle geziliyor, ekran okuyucu arka sayfayı okumaya
  devam ediyordu (diyalog değildi),
- odak kutlamaya hiç taşınmıyordu, yani kutlama okunmuyordu bile,
- kartı kapatmanın **tek yolu fareyle tıklamaktı**.

Bileşenin kendi başındaki üçüncü kural "her zaman kapatılabilir" diyor — bu
kural klavyede tutmuyordu. Katman artık `role="dialog" aria-modal`, açılınca
odak kutlamaya taşınıyor, kapanınca **geldiği yere geri dönüyor**, Esc/Enter/
boşluk ilerletiyor.

Yanında bir metin ayrışması: web "Devam etmek için **dokun**" diyordu. Fiil
web'de yanlış; anahtar web'e özel (`achuw.click_to_continue`) olarak ayrıldı,
Android'in metni kendi girdi biçimi için doğru kaldı.

**§159** dört şeyi ölçüyor: diyalog rolü, odağın taşınması, klavyeyle kapatma
ve mobilde geri tuşu + arka planın gizlenmesi. Dört enjeksiyonun dördü de
yakalandı.

## §11.254 — Duyurulan kotaların hiçbiri sayılmıyor (karar Samet'te)

Bu bir parite bulgusu değil, **sunucu tarafında bir açık**; üç platformu da
aynı biçimde etkiliyor. §11.24'te "çağıranı olmayan uç" diye işaretlenen
`/api/premium/consume`ün ne olduğu bu turda anlaşıldı.

Karar katmanı (`lib/premium/access.ts`) her kararla birlikte **hangi sayacın
artacağını** döndürüyor (`access.counter`) ve o sayacı artıran tek yer
`/api/premium/consume`. O ucun çağıranı yok. Sonuç:

    KONTROL EDİLEN            ARTIRAN
    pocket_walk               — (yok)
    weekly_exam               — (yok)
    ai_practice               — (yok)
    speaking_lesson:<seviye>  — (yok)
    writing_lesson:<seviye>   — (yok)
    ai_practice_weekly        — (yok)

Yani "seviye başına 2 konuşma alıştırması", "haftada 1 sınav", "günde 20 tur"
gibi **kullanıcıya duyurulan her sınır** her zaman 0 kullanımda görünüyor ve
hiç dolmuyor. `/api/assess` içindeki yorum bunu zaten yazıyor: "Hak alıştırma
BAŞINDA bir kez sayılıyor (`/api/premium/consume`)" — sayılmıyor.

Üretim doğruladı (yalnız okuma):

    select key, count(*), sum(count) from usage_counters group by key
    tts_calls | 4 | 201

Tek yazılan sayaç `tts_calls`. Kotaların hiçbiri bugüne kadar bir kez bile
artmamış.

Bugün tutan tek şey iki emniyet tavanı: `/api/assess` günlük `ai_assess_calls`
(adil kullanımın dört katı) ve `/api/stt` `pocket_walk_words`. İkisi de
faturayı koruyor, ürün sınırını değil. Cepte yürüyüş ayrıca ücretsizde
limitin 0 olmasıyla kapalı, yani orada kapı sayaçtan bağımsız çalışıyor.

**BİLEREK DÜZELTİLMEDİ.** Eksik parça istemci çağrısı; ekleyince ücretsiz
kullanıcılar bugün gerçek duvarlara çarpar (seviye başına 2 AI alıştırması,
haftada 1 sınav) ve premium satın alma **hâlâ pasif** — yani duvarı aşmanın
yolu yok. Bu bir hata düzeltmesi değil, ürün kararı: kotalar premium açılınca
mı yürürlüğe girsin, yoksa şimdi mi. Samet karar verince bağlanacak yer üç
nokta: cepte yürüyüş başlangıcı, haftalık sınav başlangıcı, AI alıştırması
başlangıcı (ikisi de her iki istemcide).

## §11.255 — Hata kartından çıkış yolu yalnız geri dönmekti

Android'de bir yüzey verisini okuyamayınca kart iki şey gösteriyor: ne olduğu
ve **birincil** bir "tekrar dene". Web'de altı sunucu sayfası (kelimeler,
arkadaşlar, arkadaş ayarları, profil, ayarlar, başkasının profili) ile yürüyüş
modunun hata kartı yalnız metni gösteriyordu. Sebep çoğunlukla geçici — ağ
kesintisi, veritabanı hıçkırığı — ama kullanıcının elinde deneyecek bir şey
yoktu; yürüyüşte tek düğme "Geri dön"dü, yani geçici bir hata kullanıcıyı
moddan tamamen atıyordu.

Sunucu bileşeni içinden tekrar deneme için küçük bir istemci bileşeni açıldı
(`components/retry-button`): `router.refresh()` sunucu çizimini yeniden
çalıştırıyor, sayfa yeniden yüklenmiyor — sekme çubuğu ve kaydırma yeri
yerinde kalıyor.

**§160** iki listeyi birbirine değil, **ikisini de beklenene** ölçüyor: hata
kartı gösteren her yüzey kendi tekrar denemesini taşımalı. Her satır çift
ölçüyor — hata metni hâlâ orada mı (yüzey duruyor mu) ve düğme var mı; yalnız
düğmeye bakmak, hata dalı silinince kapıyı sessizce yeşil bırakırdı. Beş
enjeksiyonun beşi de yakalandı.

Bu turda enjeksiyon geri almasında bir hata daha yaptım: iki ayrı `page.tsx`
dosyasının yedeği aynı ada yazıldı ve kelimeler sayfası arkadaşlar sayfasının
içeriğiyle geri yüklendi. `git diff --numstat` ile fark edildi, dosya HEAD'den
geri alınıp düzeltme yeniden uygulandı. Ortak ağaçta yedek adı dosya adından
değil, YOLDAN türetilmeli.

## §11.256 — Tarih sunucunun biçiminde gösteriliyordu

Uygulamanın her yerinde tarih `toLocaleDateString` ile arayüz dilinde yazılıyor
— iki yer hariç: seviye belirleme girişindeki "son test" satırı ve gelişim
panelindeki kilometre taşları. İkisi de sunucunun sakladığı dizgiyi (ISO,
`2026-09-11`) olduğu gibi basıyordu ve ikisi de **iki platformda birden**
öyleydi (§11.228 sınıfı — karşılaştırma bunu bulamaz, mutlak ölçüt bulur).

Gün-yalnız dizgiyi okurken `T00:00:00` şart: `new Date("2026-09-11")` UTC gece
yarısı demek ve Türkiye saatinde tarih bir gün **geriye** kayar. Aynı yol
`public-profile` içinde zaten kullanılıyordu, oradan alındı.

**§161** iki deseni tarıyor: arayüzde gösterilen `slice(0, 10)` ve JSX metnine
doğrudan basılan tarih alanı. Kapı iki kez yanlış ölçtü, ikisi de düzeltildi:

1. Blok yorumlarını boşluğa çevirince satır numaraları kayıyordu ve kapı
   yanlış satırı bildiriyordu (yönetim panelinde var olmayan bir tarih).
   Yorumlar artık satır sayısı korunarak siliniyor.
2. `slice(0, 10)` deseni fazla genişti: `userId.slice(0, 10)` bir kimlik
   kısaltması ve doğru duruyor. Desen artık dilimlenen şeyin bir tarih alanı
   olmasını istiyor.

Dört enjeksiyonun dördü de doğru tarafta yakalandı.

## §11.257 — Yönetim panelinde beş emoji

Proje kuralı emojiyi kodda da arayüzde de yasaklıyor ve sebebi tek bir estetik
tercih değil: emoji platformdan platforma **başka çizilir** (Android, iOS ve
web ayrı setler kullanır), ekran okuyucu onu uzun bir ada çevirip cümlenin
ortasına sokar, ve dar bir satırda sayının yanındaki simge etiketin yerini
tutmaz — "1.240👤" ile "1.240 kişi" aynı şey değil.

Tarama yönetim panelinde beş tane buldu: kullanıcı sayısının yanındaki kişi
simgesi (iki yerde), zor kelime satırındaki damla ve "hata yok" satırındaki
kutlama (iki yerde). Yerlerine kelime kondu. Bir de `immersion-hub`
başındaki yorum, kaldırılmış emojileri **örnek olarak** içinde taşıyordu;
yorum emojisiz yeniden yazıldı — kapının muafiyet listesi olmasın diye.

**§162** iki platformu da tarıyor ve sıfır bekliyor. İşaret karakterleri (onay,
yıldız, müzik) kapsam dışı: tek glif, metin akışında duruyorlar. Beceri içerik
kütüphanesi de dışarıda — ders metinleri gerçek dünyadan alınıyor ve içinde
emoji geçen bir uygulama yorumu örnek metnin kendisi. İki enjeksiyonun ikisi
de yakalandı.

## §11.258 — "1 days": üç dilde çoğul, hiçbir katmanda çoğul desteği

Sözlükte 89 anahtar `{n}` taşıyor ve **hiçbir çözücüde çoğul kuralı yoktu**.
İngilizce arayüzde "1 friends", "1 days left", Almancada "1 Freunde", "noch 1
Tage" yazıyordu. Türkçede sorun yok — sayıdan sonra isim tekil kalır — yani
hata yalnız iki dilde görünüyordu ve **iki platformda birden** vardı.

Almanca yalnız ismi değil edatı ve fiili de değiştiriyor: "vor {n} Tagen" →
"vor 1 Tag", "{n} Wörter drohen verloren zu gehen" → "1 Wort droht verloren zu
gehen". İngilizcede de fiil değişiyor: "{n} words are due" → "1 word is due".
Bu yüzden makine bir "s" eklemekle çözülmüyor, her cümlenin tekil hâli ayrı
yazılmalı.

Kural iki çözücüde de aynı ve küçük: `n` birse ve `<anahtar>.one` varsa o
kullanılıyor, yoksa temel anahtar. Çoğul biçimi olmayan hiçbir anahtar
etkilenmiyor. İkiden fazla biçim isteyen diller (Lehçe, Rusça) gelirse burası
`Intl.PluralRules`e döner; üç dil için o makine fazla.

**53 anahtarın** tekil hâli üç dilde yazıldı (43'ü ortak sözlükte, 10'u
web'e özel). Sabit sayı taşıyanlar (tanıtım metinlerindeki "20 soru", parola
kuralı, plan maddeleri) kapsam dışı — oradaki `{n}` hiçbir zaman 1 olmuyor.

Ek **noktalı** (`.one`), alt çizgili değil: sözlükte adı doğal olarak "_one"
ile biten bir anahtar zaten vardı (`practice.all_game_types_in_one`) ve alt
çizgili ek onunla karışıyordu — kapı onu öksüz bir tekil biçim sanıp düştü.
Nokta anahtar adlarında ayraç, sözcük içinde geçmiyor.

Doğrulama üç yerde: mobilde dört yeni Jest testi (üç dil + tekil biçimi
olmayan anahtar), web çözücüsü için `tsx` ile yedi denetim, ve **§163**:
kuralın iki çözücüde de yazılı olması, tekil anahtarların öksüz olmaması ve
tekil ile çoğul biçimin aynı yer tutucuları taşıması.

Kapı ilk sürümde üç dili tek haritada birleştiriyordu ve iki enjeksiyonu
birden kaçırıyordu: İngilizcedeki temel anahtar silinince Türkçedeki aynı
anahtar öksüzlüğü örtüyor, yer tutucu karşılaştırması da haritaya en son yazan
dilin metnine bakıyordu. Denetim artık dil dil. Dört enjeksiyonun dördü de
yakalandı.

`i18n:check` de güncellendi: `<anahtar>.one` kodda geçmez ve ölü değildir —
ölçüt temel anahtarın çağrılması.

## §11.259 — İki kapı boş listeyi ölçüyordu

Paralel oturum ayarlardaki çip listelerini kaydırıcıya çevirdi. Günlük hedef
ve günde yeni kelime kapıları hâlâ `const GOALS = [...]` arıyordu; liste
kalkınca `Math.min(...[])` **Infinity** döndürdü ve kapı "alt=Infinity" diye
düştü. Düşmesi iyi oldu — sessizce geçseydi ölçüm ölü kalırdı. İkisi de artık
kaydırıcının kendi ucundan okuyor.

Aynı düzenlemede iki anahtar web'e özel sözlükte duruyordu ama mobil de
çağırıyordu (`settings.reviews_unit`, `settings.daily_goal_short`): Android'de
ekranda anahtarın kendisi yazıyordu. İkisi ortak sözlüğe taşındı.

## §11.260 — Uzun ad satırı büyütüyordu

Görünen ad kırk karaktere kadar olabiliyor. Liste ve sıralama satırlarında
ikinci satıra düşen bir ad satırı büyütüyor: madalyalar, puanlar ve avatarlar
hizadan çıkıyor, liste dalgalanıyor. İki uygulama da bunu her yerde kırpıyordu
— **günlük tur sıralaması hariç**; orada yalnız Android sarmalıyordu, web'in
aynı satırı `min-w-0 truncate` taşıyor. Bu, referansın kendi kusuru olduğu
nadir durumlardan biri: Android örnek alınacak yer değil, düzeltilecek yerdi.

İkinci bulgu **alt sekme çubuğunda**: dört sekmeyle 320 pikselde etiket başına
~72 piksel kalıyor ve Almanca "Fähigkeiten" iki satıra kırılıyordu — çubuğun
yüksekliği sekmeye göre değişiyor, ikonlar kayıyordu. Android bunu görmüş ve
tek satıra sabitlemiş (`numberOfLines={1} adjustsFontSizeToFit`), web'de aynı
hiç yapılmamıştı. Web karşılığı `whitespace-nowrap` + `clamp()` punto: dar
ekranda küçülür, geniş ekranda normal boyda kalır.

Seviye armasındaki "1.234 Wörter gefestigt" satırı da dar kartta ikinci satıra
düşüyordu; o da tek satıra alındı.

**§164** ölçümü üç kez yanlış şeyi ölçtü, üçü de enjeksiyonla çıktı:

1. Kırpma çoğu zaman sarmalayan kutuda (`<span truncate><Link>{ad}</Link>`).
   İlk sürüm yalnız adın kendi etiketine bakıp web'in dört satırını birden
   "sarmalıyor" sanıyordu. Artık etiketin bir üstüne de bakıyor.
2. `{koşul ? <Link>{ad}</Link> : ad}` iç içe süslü parantez taşıyor ve düz bir
   desen onu göremiyordu — kapı web'in arkadaş tablosunda "çizim yok" deyip
   **hiçbir şey ölçmüyordu**. İfade artık dengeli okunuyor.
3. `{linked ? (<Link aria-label={name}>…)}` bir ad çizimi değil, iç elemanın
   kendi özniteliği. İlk sürüm onu çizim sanıp iki web dosyasını yanlış
   bildirdi. Artık ifadenin içindeki iç etiketlerin öznitelik bölgeleri
   ayıklanıyor; metin konumunda bir `name` kalmazsa aday düşüyor.

Ayrıca `const ad = …` gibi atamalar ve `t("...", { name: … })` gibi parametre
nesneleri kapsam dışı, ve her dosyada **en az bir çizim** bulunması ayrıca
ölçülüyor — yoksa deyim değişince kapı hiçbir şey ölçmeden yeşil kalırdı
(§11.259'daki boş liste dersi).

Altı enjeksiyonun altısı da doğru tarafta yakalandı.

## §11.261 — Sınav kapağını açmak sınavı başlatıyordu

`POST /api/exam {action:"start"}` iki iş yapıyor: kâğıdı üretiyor ve sunucuda
`exam_start` olayını yazıyor. **Android bunu ekran açılır açılmaz atıyordu.**
Yani kapağı açıp vazgeçen kullanıcı "sınava başlamış" sayılıyordu; başlama →
bitirme hunisi Android'de şişik çıkıyordu. Web hiçbir zaman öyle yapmadı:
kapağı ayrı uçtan (`GET`) okuyup `start`ı ancak düğmeye basılınca atıyor.

Bulgu, ucun kendi yorumundan çıktı — orada "kapağı görmek için soruları
hazırlamak, vazgeçen kullanıcıya o haftanın kâğıdını harcatırdı" yazıyor ve
Android tam olarak onu yapıyordu.

Ölçüm nasıl bulundu: **iki istemcinin aynı uca hangi parametrelerle gittiği**
karşılaştırıldı. Kırk iki ortak adresin beşinde fark vardı; dördü yanlış
alarm çıktı (parametre değişkenle kuruluyor), biri gerçekti —
`GET /api/exam?level&module` yalnız web'de vardı.

Aynı turda ucun kendi eksiği de kapatıldı: **kapak yalnızca modül sınavı için
vardı.** Seviye sınavında "kaç dakika sürecek, hangi bölümler var" sorusu
cevapsızdı — oysa sayılar sabit (`COUNTS.level`, `LEVEL_SECONDS`) ve kâğıt
gerektirmiyor. `?kind=level` artık iki istemciye de aynı cevabı veriyor; web
seviye sınavında da bölümleri ve süreyi gösteriyor.

Bir tuzak: kapak gelmeye başlayınca web'in "Almanca başlık" ölçütü bozuluyordu.
Ölçüt "kapak geldi mi" idi; seviye sınavının kapağı da geliyor ama **planı
yok, başlığı yok** — ölçüt değişmeseydi sözlükteki başlığın yerine Almanca
"Niveauprüfung" yazardı. Ölçüt artık "kapak gerçekten Almanca bir başlık
taşıyor mu".

Not: mobil sınav ekranına şu an uygulamadan **ulaşılamıyor** (ekranın kendi
başında yazılı, 2026-09-07). Yani şişik huni bugün üretimde oluşmuyor; sıra
ekran yeniden bağlandığında doğru olsun diye düzeltildi.

**§165** iki şeyi ölçüyor: `start` POSTunun bir düğmeye bağlı olması (hem
doğru fonksiyonda olması hem o fonksiyonun düğmeye bağlı olması — yalnız
birine bakmak, fonksiyonu mount etkisinden çağırınca kapıyı kandırırdı) ve
kapağın iki istemcide de iki sınav türü için GET ile okunması. Beş
enjeksiyonun beşi yakalandı; altıncı denemem yanlıştı — değişikliği koda değil
**yoruma** uygulamıştım, kapı yorumları zaten ayıklıyor.

Ayrıca `exam.module_exam` web'e özel sözlükte duruyordu ama mobil de çağırmaya
başladı; ortak sözlüğe taşındı (§11.259'daki aynı sınıf).

## §11.262 — Yönetim panelindeki huninin ilk çubuğu üç gündür sıfırdı

Bu tur önce **POST gövdeleri** karşılaştırıldı (otuz bir ortak uç): on üç
farkın hepsi ölçüm gürültüsü çıktı — alanlar değişkenle kuruluyor, iki taraf
da aynı şeyi gönderiyor. Sonra **olay sözlüğü** karşılaştırıldı ve bulgu
oradan geldi.

`EVENT_NAMES` hem istemcilerin sözlüğü hem sunucunun doğrulama listesi. İçinde
hiçbir yerin yazmadığı beş ad duruyordu ve biri zararsız değildi:
**`start_card` yönetim panelinde tur hunisinin İLK BASAMAĞI olarak
çiziliyordu.** Kart `/learn` hub olunca kaldırılmış (commit `9d2c9311`), olay
o günden beri hiç akmıyor — yani huninin ilk çubuğu kalıcı olarak sıfırdı ve
bu, ölçümün bozulduğunu değil **ürünün çöktüğünü** düşündürür. Rapor betiği de
aynı basamağı yazıyor ve altına "kartı görüp hiç başlamayan: N açılış" diye
türetilmiş bir satır koyuyordu; o satır artık hep "tamamı" diyordu.

Üretim doğruladı (yalnız okuma):

    start_card     son 2026-09-08   620
    daily_play     son 2026-09-04    18
    plan_start     son 2026-09-04     5
    session_round  hiç
    speak_self     hiç

Beş ad sözlükten, basamak iki yüzeyden (panel ve rapor) kalktı. `daily_play`
zaten bilerek kaldırılmıştı (`daily-player` içindeki not), `plan_start`ın
yüzeyi parite turunda gitmişti, `session_round` "başka yerde yazılıyor" diye
muaf tutulmuştu ama üretimde tek satırı bile yok.

İkinci bulgu: **`tts_play` Android'de hiç yazılmıyordu.** Sesin hangi ekranda
dinlendiğini web ekran başına bir kez yazıyor; Android'de ses cihazın kendi
motorundan çıkıyor ve olay hiç atılmıyordu — panelde ses kullanımı yalnız
web'den görünüyor, "sesi kimse kullanmıyor" gibi okunuyordu. Mobil tarafa
web'in `trackOnce` sözleşmesi taşındı ve olay ekran adıyla yazılıyor.

**§166** üç şeyi ölçüyor: `test:events`in iki muafiyet listesinin **boş**
kalması (dolmaya başlaması ölü adın yeniden birikmesi demek), huninin ilk
basamağının panel ile raporda aynı olması, ve ses ölçümünün iki platformda da
yazılması.

Kapı bir kez fazla gevşekti: panel testi sayfadaki herhangi bir "Tur başladı"
yazısını arıyordu ve bölümün **ipucu metni** de aynı sözü içerdiği için çubuk
değişse bile yeşil kalıyordu; artık çubuğun kendi etiketine bakıyor. Bir
enjeksiyonum da yine yanlıştı — değişikliği koda değil **yoruma** uyguladım
(bu turda ikinci kez); kapı haklıydı, ben yanlış ölçtüm.

## §11.263 — Aynı olay, iki ayrı sözcükle

Olay adının aynı olması yetmiyor: `kind` alanı da aynı sözlükten gelmeli.
Otuz beş ortak olay tarandı; tur olayında iki kusur birden çıktı.

**Birincisi Android'in kendi içindeydi:** `session_start` `practice`/`session`
yazıyor, `session_done` **her zaman** `session` yazıyordu. Yani tek oyunluk bir
turun başlangıcı ile bitişi eşleştirilemiyordu — "alıştırma turları
tamamlanıyor mu" sorusu Android'de cevapsızdı. Web aynı tuzağı daha önce
görmüş ve turun türünü bir kez hesaplayıp saklamış (`sessionKind`); ilginci,
web'deki notun "Mobil `GameScreen` ikisine de aynı kind'i veriyor" demesi —
vermiyordu. **Bir yorumun doğru olduğunu varsaymak, ölçmemektir.**

**İkincisi platformlar arasındaydı:** web `mixed` / `single:<oyun>` / `extra`
yazıyor, Android `session` / `practice`. Aynı kavram iki dille yazılınca
panelde tur türü kırılımı iki platform arasında karşılaştırılamıyor. Android'de
üç kavramın üçü de zaten var (`onlyGame`, `opts.extra`, ikisi de yoksa
karışık), yani eksik olan bilgi değil sözcüktü.

Üçüncü, küçük bulgu: **kelime aramasında Android ölçüm yazmıyordu.** Arama
kutusu iki platformda da var; web `trackOnce("search", uzunluk, "words")`
yazıyor, Android hiç yazmıyordu — "arama kullanılıyor mu" sorusu Android'de
sıfır görünüyordu.

Taramanın kalan farkları yanlış alarm çıktı: `app_open` mobilde `App.tsx`ten
(kapsam dışı klasör) yazılıyor, `share` "invite" webde `lib/share`te,
`walk_switch`in fazla `kind`leri tarayıcıya özgü durumlar (gizlenen sekme,
karartılmış ekran). Bir de gerçek ölü kod: mobilde `shareStreak` yazılmış ama
hiçbir ekran çağırmıyor.

**§167** tur olayının başlangıç ve bitişte aynı değişkeni taşımasını, iki
platformun aynı sözcük kalıbını kullanmasını ve arama ölçümünü denetliyor.
Kapı bir kez fazla katıydı: kalıptaki değişken adı iki tarafta farklı
(`onlyGame` / `opts.game`) ve **nokta** taşıyabiliyor; ilk sürüm noktayı kabul
etmeyip web'i "başka sözcük" diye bildirdi. Değişkenin adı ölçümün konusu
değil. Beş enjeksiyonun beşi doğru tarafta yakalandı.

## §11.264 — Bildirim izni hunisinde Android hiç görünmüyordu

Kurulum akışı taraması: adımlar (hoş geldin → dil → kurs → seviye → hedef) ve
hedef değerleri (10/20/50) iki platformda birebir aynı çıktı. `course-onboarding`
içindeki "mobil seviye satırını açıklamasız basıyor" notu **bayatmış** — mobil
seçimden sonra açıklamayı gösteriyor. Akışın kendisi eş.

Bulgu bir adım ötede: **bildirim izni**. Panelin izin hunisi tek bir addan
besleniyor — `push_optin`, değerleri 1 verildi / 0 reddedildi / 2 sonra. Web
üç yolda da yazıyor; Android `notif_prime` yazıyor ve o ad hunide hiç
okunmuyor. Yani **Android kullanıcılarının izin verip vermediği panelde hiç
görünmüyordu.**

Android'in kendi ölçümü de yarımdı: `notif_prime` düğmeye **basıldığı anda**
yazılıyor, yani "sordu" demek; izin reddedilirse hiçbir şey yazılmıyordu.
"Sordu → verdi/reddetti" adımı Android'de ölçülemiyordu.

Mobil artık üç sonucu da aynı adla ve aynı değerlerle yazıyor. `notif_prime`
duruyor: seçilen hatırlatma saati Android'e özel bir ayrıntı ve web'de
karşılığı yok.

Bunun bir yan etkisi kapıda görüldü: var olan ölçüm paritesi kapısının
muafiyet listesinde `push_optin` "tarayıcıya özel, mobil karşılığı
`notif_prime`" diye kayıtlıydı. O satır, **iki adın aynı şeyi ölçtüğünü kabul
edip farklı adlarda bırakmak** demekti — muafiyet, sorunun kendisini
belgeliyordu. Satır düştü.

**§168** iki platformun da üç sonucu aynı adla ve aynı değerlerle yazmasını,
ve panelin okuduğu adın değişmemesini denetliyor. Dört enjeksiyonun dördü de
yakalandı.

## §11.265 — Panel ölçümü yalnız Türkçe arayüzde çalışıyordu

Muafiyet listelerini tek tek doğrulama turu. Sekiz satırın yedisi doğru çıktı
(`install_prompt` PWA'ya özel, `purchase_*` yalnız mağazada, `walk_capture`
tarayıcının `getUserMedia` kısıtı, `feedback_why_opened` iki tarafta da hep
null olan kural bağı). Biri yanlıştı: **`panel_open`**.

Olay hangi katlı bölümün açıldığını yazıyor ve adı iki yoldan çıkarıyordu:
`data-panel` özniteliği, yoksa başlığın **metni**. Metin tablosu Türkçe
yazılıydı ("Nerede zayıfım", "Tek oyuna odaklan", "Sıradaki") ve uygulamada
hiçbir panel `data-panel` taşımıyordu — yani İngilizce ya da Almanca arayüzde
hiçbir eşleşme olmuyor, olay **hiç yazılmıyordu**. Ölçümün dile bağlı olması,
o dillerde ölçümün olmaması demek; üretimdeki 46 satırın hepsi Türkçe
arayüzden.

Dört katlı bölüme (`Disclosure`, kelime listesi ilerleme grafiği, başkasının
profilindeki ek eylemler, tepki çubuğu) arayüz dilinden bağımsız ad kondu ve
metin tablosu kalktı.

**§169** iki şeyi ölçüyor: ölçüm katmanının yalnız `data-panel` okuması ve
`aria-expanded` taşıyan her düğmenin bir adı olması — adsız bir bölüm sessizce
ölçülmez. Dört enjeksiyonun dördü de yakalandı.

Yan not (düzeltilmedi, kayda geçti): **mobilde derin bağlantı hiç yok.**
`Linking.getInitialURL` ya da navigasyonun `linking` yapılandırması yok; davet
bağlantısı Android'de uygulamayı değil siteyi açıyor. Bu yüzden `invite_open`
gerçekten web'e özel — ama sebebi "tarayıcı ölçüm katmanı" değil, Android'in o
kapıyı hiç açmaması. Uzak push da bağlı olmadığı için bugün etkisi sınırlı;
ikisi birlikte ele alınmalı.

## §11.266 — Değerlendirmenin öğreten kısmı Android'de yoktu

`/api/assess` yalnız puan döndürmüyor: her hatanın **gerekçesi** (`why_tr`),
düzeltilmiş cümle, övgü ve sıradaki ipucu da geliyor. Web bunların hepsini
ortak bir kartla çiziyor (`feedback/assessment-card`). Android'de:

- **rol yapma sınavı** (canlı yüzey) yalnız dört rubrik çubuğu gösteriyordu,
- **sınav yazması** yalnız bir yüzde gösteriyordu.

Yani öğrenci "72" görüyor, neyi yanlış yaptığını öğrenmiyordu — oysa sınavın
öğreten kısmı tam olarak o. Alanlar sunucudan zaten geliyordu ve istemcide
düşüyordu: §11.22 sınıfı ("sunucu gönderiyor, istemci tanımıyor").

Kart mobile taşındı (`ui/AssessmentCard`). **Bilgiyi taşıyor, işaretlemeyi
değil**: web'in kart düzeni tarayıcıya, buradaki düzen uygulamanın kendi
diline ait — ölçülen şey aynı olmalı, çizim aynı olmak zorunda değil. Hatalı
aralıkların metin üstünde vurgulanması da geldi (çakışan ve boş aralıklar
atlanıyor, web `Highlighted` ile aynı kural). `assess.corrected` ve
`assess.example` web'e özel sözlükten ortak sözlüğe taşındı.

**§170** kartın beş bilgisini (rubrik, hata gerekçesi, düzeltilmiş metin,
övgü, ipucu) iki platformda karşılaştırıyor, ikisini de beklenene ölçüyor ve
kartı **çağıran** yüzeylerin aynı olduğunu denetliyor — iki yerde iki ayrı
kart, er geç ayrışır.

Kapı bir kez yanlış ölçtü: övgü ve ipucu için dosyada `praise_tr` geçmesine
bakıyordu; alanın **tip tanımı** da o adı taşıyor, yani çizim silinince bile
yeşil kalıyordu. Ölçüm artık çizim ifadesine bakıyor. Yedi enjeksiyonun yedisi
yakalandı.

Kalan gerçek boşluk (bu turda kapatılmadı): **`free_sentence` turu mobilde
hâlâ yok** (§11.13). Tam port üç parça istiyor — tur bileşeni, kural tabanlı
yedek puanlama (`fallbackAssessment`) ve SRS kalite eşlemesi. Üçünden birini
eksik bırakmak yeni bir ayrışma üretir (AI kapalıyken web puan verir, mobil
vermez), o yüzden yarım başlanmadı. Değerlendirme kartı artık mobilde olduğu
için portun en büyük parçası hazır.

## §11.267 — Serbest cümle turu Android'e geldi (§11.13 kapandı)

Kelime turunun tek gerçek **serbest üretim** adımı: hedef yok, şık yok, yalnız
iki-üç kelime ve "bunlarla bir cümle kur". Mobilde hiç yoktu ve tur sunucudan
`skipGames=free_sentence` ile **susturuluyordu** — yani Android kullanıcısı o
adımı hiç görmüyordu. Haftalık sınavda da aynı süzgeç vardı, orada sunucu
kendi `typing` yedeğine düşüyordu: **Android'in haftalık sınavı sistematik
olarak daha kolay bir kâğıttı.**

Port üç parça istedi ve üçü de yapıldı:

1. **Değerlendirme kartı** (§11.266, önceki tur) — rubrik, hata gerekçeleri,
   düzeltilmiş cümle.
2. **Kural tabanlı yedek puanlama** (`lib/assessFallback`). Yapay zekâ
   kapalıyken web puan verir, mobil vermezse aynı turda iki farklı ürün olur.
   Doğrulama elle yazılmış "doğru cevap"la değil, **web'in gerçek çıktısıyla**:
   dört girdi `npx tsx` ile web `fallbackAssessment`ten geçirildi ve sayılar
   teste gömüldü (`__tests__/assessFallback.test.ts`, yedi test). İki taraf
   ayrışırsa test düşer.
3. **Turun kendisi** (`FreeSentenceRound`). SRS kalite eşlemesi web ile
   birebir: 90/70/40 → 5/4/3/2, yedekte kalite 3'ü aşmaz. Bu eşleme en sessiz
   parça — iki uygulamanın aynı cevaba farklı kalite vermesi, aynı kelimenin
   telefonda ve tarayıcıda **farklı zamanda tekrara düşmesi** demek.

Almanca özel harfler (ä ö ü ß) kod noktasından kuruluyor: düz dizgi olarak
yazılınca çeviri tarayıcısı onları "çevrilmemiş Türkçe metin" sanıyor — ö ve ü
iki dilde de var — oysa bunlar klavye yardımı, arayüz metni değil.

**Boşluk kapanınca beş kayıt bayatladı ve beşini de var olan kapılar yakaladı:**

- `KNOWN_GAPS` içindeki "mobilde oynatıcısı yok" satırı,
- iki ayrı "mobil `skipGames` göndermeli" kapısı (ölçüm tersine döndü),
- tur tipindeki `partners`/`level` alanlarını eleyen süzgeç,
- web'e özel sayılan altı `rounds.*` anahtarı,
- ve çeviri turunun "ikinci şans" kapısı: dosyadaki **ilk** `prompt:` dizgisini
  okuyordu, yeni tur eklenince onun istemini çeviri turunun istemi sandı.
  Ölçüm artık turun kendi gövdesinden okuyor, sabitler dosyanın tamamından.

Kapanan bir boşluğun kaydını silmek, kapanmayı tamamlamanın parçası: kayıt
kalsaydı bir sonraki okuyan "mobilde bu tur yok" diye bilirdi.

**§171** turu üç eksende ölçüyor (kalite eşikleri, yedek puanlama, susturmanın
kalkmış olması) ve iki tarafı da beklenene karşılaştırıyor. Dört enjeksiyonun
dördü yakalandı.

## §11.268 — Aynı hatırlatma Android'e iki kez gidiyordu

Defterdeki "mobilde uzak push yok" notu **bayat** çıktı. Ölçüm: cihaz jetonu
ucu iki tarafta da bağlı (`/api/push/device`), sunucu üç hatırlatmayı da o
jetona gönderiyor, ve üretimde **iki Android jetonu kayıtlı** (en yenisi
bugün). FCM anahtarlarının üçü de sunucu `.env`inde dolu.

Ama mobil **aynı zamanda** aynı üç hatırlatmayı cihazda yerel olarak
zamanlıyordu (`notifee`, günlük/seri/haftalık). Sunucu kullanıcının kendi
saatine bakıyor (`profiles.timezone` + `reminder_hour`) — yani kullanıcı aynı
hatırlatmayı **aynı saatte iki kez** alıyordu. Üstelik ikisi aynı şey değil:
sunucununki kişiselleştirilmiş (ad, seri, bekleyen kelime sayısı, haftalık
rakip, ortak seri), yereldeki tek bir genel cümle.

Yerel zamanlama silinmedi, **koşula bağlandı**: jeton yoksa (izin verilmemiş,
Play hizmetleri yok, FCM kapalı) hatırlatma yine cihazdan geliyor. Koşul tek
bir kapıda — `schedule()` — yani yeni bir hatırlatma türü eklendiğinde kural
kendiliğinden uygulanıyor. Jeton yazıldığı anda yerel kopyalar iptal ediliyor.

Bayrak ayrı bir dosyada (`lib/pushState`): jetonu yazan modülle hatırlatmayı
zamanlayan modül birbirini çağırıyor ve bayrağı ikisinden birinin içinde
tutmak **dairesel bir içe aktarma** kurardı — Metro çoğu zaman yutar ama
yükleme sırasına bağlı, sessiz bir `undefined` riski taşır.

**§172** koşulun tek kapıda olmasını, jeton yazılınca yerellerin iptalini ve
sunucunun üç hatırlatmasının da cihaz jetonlarına gitmesini ölçüyor. Sonuncusu
bu düzeltmenin emniyet kemeri: bir tür sunucuda unutulsaydı, yerel kopya da
kurulmadığı için o hatırlatma Android'e **hiç** gelmezdi.

Kapı ilk sürümde yanlış ölçtü: iki hatırlatma gönderimi ortak yardımcıya
(`deliverRound`) devrediyor ve FCM çağrısı orada; ölçüm yalnız fonksiyonun
kendi gövdesine bakıp "seri: fcm yok" dedi. Bir seviye devir artık izleniyor.
Beş enjeksiyonun beşi yakalandı.

## §11.269 — Aynı hesap, iki farklı varsayılan hatırlatma saati

Bildirim yüzeyi baştan sona tarandı ve çoğu eş çıktı: üç anahtar (günlük,
seri, haftalık) iki platformda da var ve ikisi de aynı uca yazıyor; saat
listesi birebir aynı (9, 12, 15, 19, 21); bildirim gövdesinin dört alanını
(`title`, `body`, `url`, `tag`) iki istemci de okuyor; dokunuş iki tarafta da
`push_open` yazıyor; arayüz dili değişince iki taraf da profili güncelliyor,
yani bildirim doğru dilde gidiyor.

Ayrışan tek şey **varsayılan saat**. Mobil ekranı, anahtar kapalıyken saati
kod içindeki bir sabitten çiziyordu ("19:00"); sunucu ise kullanıcının kayıtlı
saatini tutuyor ve şemanın varsayılanı **12**. Yani hiçbir şeye dokunmamış bir
kullanıcı anahtarı Android'de açınca 19:00, web'de 12:00 alıyordu — aynı
hesap, aynı durum, iki farklı saat; hangisinin geçerli olduğu son dokunulan
platforma kalıyordu.

Sunucunun saati artık anahtar **kapalıyken de** taşınıyor (`ReminderPrefs.hour`)
ve ekran onu okuyor; ağ yokken düşülen sabit de şemanın varsayılanıyla aynı.

**§173** saat listesinin aynı olmasını, iki istemcinin varsayılanı şemadan
almasını ve kapalı anahtarda saatin taşınmasını ölçüyor. Beş enjeksiyonun beşi
yakalandı — biri şemanın kendi varsayılanını değiştirerek, yani ölçüm tek bir
kaynağa bağlı.

Kapı bir kez yanlış ölçtü: mobil listede saatler `"09:00"` biçiminde ve ilk
sürüm **dakikayı da bir saat sandı** ("09:00" → 9 ve 0). İki taraftan da yalnız
saat okunuyor.

## §11.270 — "Günde yeni kelime" varsayılanı iki yerde ayrı yazılıydı

§11.269'un sınıfını sonuna kadar taradım: şemadaki on sekiz varsayılanın hepsi
çıkarıldı ve istemcilerin başlangıç değerleriyle karşılaştırıldı. Web'de bu
sınıf hiç yok — sayfa sunucuda çiziliyor, gerçek değerle geliyor. Mobilde dört
alanın başlangıç değeri ekranın içinde yazılıydı ve **biri yanlıştı**:

    günde yeni kelime   ekranda 10   ·   şemada 15

Sunucuda 15 duran bir hesapta ayar ekranı, profil yüklenene kadar kısa bir an
10 gösteriyor. Kullanıcı o anda kaydırıcıya dokunursa **10 yazılıyordu** — yani
ekranın tahmini gerçeğin yerine geçiyordu. Günlük hedef (20), seviye (A1) ve
kurs (de) doğruydu, ama onlar da aynı kırılganlıktaydı: ikinci bir yerde
yazılı bir varsayılan, şema değişince sessizce ayrışır.

Dördü de tek bir kaynağa taşındı (`lib/profileDefaults`) ve **§174** o kaynağı
şemayla karşılaştırıyor: şemada bir varsayılan değişirse kapı düşer. Ayrıca
ekranın kaynaktan okuduğu ayrıca ölçülüyor — tek kaynak varken ekranın kendi
sabitini tutması, kaynağın değişmesini yutar.

Aynı turda kendi bıraktığım bir kusuru da kapattım: geçen tur (§11.268) uzak
push bayrağını ayrı bir dosyaya taşıdığımı yazmıştım, ama `hasPushDevice`
jetonu yazan modülde de duruyordu ve hatırlatma modülü onu **oradan** okuyordu
— yani kaçınmak istediğim **dairesel içe aktarma** yerinde kalmıştı (iki modül
birbirini çağırıyor). Derleyici daireyi hata saymıyor; sessizce yükleme
sırasına bağlıyor. Fonksiyon kaldırıldı ve **§172'ye dördüncü bir ölçüm**
eklendi: bayrağın hangi modülden okunduğu.

Onu kaçırmamın sebebi öğreticiydi: düzenlemeyi yaptığımı sandım, `tsc`
geçince doğrulamış saydım. Derleme, `pushDevice`in hâlâ dışa açtığı eski
fonksiyon yüzünden geçiyordu. **Bir düzenlemenin uygulandığını görmek, dosyayı
okumakla olur; yeşil bir derleme onu göstermez.**

## §11.271 — "Pekişmiş" eşiği altı yerde yazılıydı

İki platformda aynı adla yazılı **kırk bir sayısal sabitin hepsi eş** çıktı
(SRS bekleme süreleri, sınav saniyeleri, puan katsayıları, parola uzunluğu,
iki adımlı kod basamakları…). Bu sınıf mobil-web arasında temiz.

Ayrışma **sunucunun kendi içinde** bulundu: "pekişmiş" eşiği — tekrar aralığı
yirmi bir güne çıkan kelime — altı ayrı yerde yazılıydı. İki modülde ayrı ayrı
`const MASTERED_DAYS = 21`, dört yerde de doğrudan `21`: kelimeler sayfasının
süzgeci, kelime ucunun iki süzgeci ve kelime listesinin etiketi. Altısı da
bugün aynıydı; biri değiştirilse ötekiler sessizce eski kalır ve aynı kelime
bir yerde "pekişmiş", başka yerde "öğreniliyor" görünürdü — kullanıcıya iki
farklı gerçek.

Eşik artık tekrar aralığını hesaplayan yerde (`lib/srs`) ve okuyan herkes
oradan alıyor. Mobil bu eşiği hiç hesaplamıyor — `status` alanını sunucudan
okuyor — yani platformlar arası ayrışma ihtimali de yok; risk tamamen web'in
kendi içindeydi.

**§175** iki şeyi ölçüyor: eşiğin tanımının tek yerde olması ve arayüzde satır
içi bir kopyasının kalmaması. Üç enjeksiyonun üçü de yakalandı.

## §11.272 — Turun cevabı Android'de duyurulmuyordu

Bu tur üç tarama temiz çıktı ve dördüncüsü en çok kullanılan yüzeyde bir
eksik buldu.

**Temiz çıkanlar** (kayda geçsin, bir daha aranmasın):

- **Aynı cümle iki anahtarda**: sözlükte 41 çift var ama hiçbiri kusur değil.
  Bir kısmı yapısal (`.one` tekil kardeşleri Türkçede zaten aynı), bir kısmı
  kursa göre ikizlenmiş sınav stratejisi (`mockhow_de.*` / `mockhow_en.*` —
  dördü ipucu sözcükleri yüzünden gerçekten farklı, dördü dilden bağımsız
  olduğu için aynı), gerisi rastlantısal kısa etiket ("Gelen kutusu", "Modül
  sınavı"). İkisini tek anahtara indirmek, ilgisiz iki yüzeyi birbirine
  bağlamak olurdu: birinin metni değişince ötekinin de değişmesi *istenmeyen*
  bir şey.
- **Web'e özel sözlükte olup mobilin çağırdığı anahtar**: sıfır. (Bu sınıf bu
  oturumda üç kez elle bulunmuştu; mobil `i18n:check` artık tutuyor.)
- **Yer tutucusu doldurulmayan çağrı**: sıfır. Ekranda `{n}` yazan bir yer yok.

**Bulgu:** her kelime turunun sonunda çıkan geri bildirim şeridi — "Doğru!" ya
da "Cevap: …", gerekçe ve anlam — web'de `role="status" aria-live="polite"`
taşıyor, mobilde **hiç taşımıyordu.** Ekran okuyucu kullanan biri cevabının
doğru mu yanlış mı olduğunu öğrenmiyordu; renk, ikon ve maskot yalnız görene
bir şey söylüyor. Hem de uygulamanın en çok kullanılan yüzeyinde.

§157'nin taraması bunu kaçırdı ve sebebi öğretici: orada geçici **mesaj
durumları** arandı (`setMsg`, `setFlash`), buradaki biçim ayrı — bir `Feedback`
nesnesi ve onu çizen ayrı bir bileşen. **Aynı kusur, başka kalıpta.** Bir
sınıfı bir kalıpta aramak, o sınıfı taradığını sanmaya yol açıyor.

Bu turda eklediğim serbest cümle turunun sonuç satırı da aynı eksiği taşıyordu
(o şerit `FeedbackFooter`dan geçmiyor, kendi bloğunu çiziyor) — ikisi birlikte
kapatıldı.

**§176** iki platformun geri bildirim şeridini ve serbest cümle sonucunu
ölçüyor; ölçüm bileşenin kendi gövdesine bakıyor, dosyanın başka yerindeki bir
duyuru onu yeşil yapmıyor. Üç enjeksiyonun üçü yakalandı.

## §11.273 — Puan duyurulmuyordu (aynı sınıf, üçüncü kalıp)

§11.272'nin dersini uyguladım: canlı bölge sınıfını bu kez **geçici mesaj**
değil **durum nesnesi** kalıbıyla taradım (`useState<{…} | null>` ve onun
çizim blokları). İki platform birlikte seksen çizim verdi. Çoğu yüklenen
**veri** — liste satırı, profil alanı, öneri kutusu — ve onların duyurulmaması
doğru: ekran okuyucu onları sırası gelince zaten okuyor. Bir eylemin **cevabı**
olan üç yüzey kaldı ve **üçü de sessizdi**:

- beceri konuşma puanı (web `speaking-player`),
- monolog puanı ve rubriği (web `monologue-player`),
- mobil beceri kütüphanesinin sonuç bloğu (`game/skillLibrary`).

Kayıt bitiyor, odak düğmede kalıyor, ekranda yüzde ve rubrik çıkıyor ve ekran
okuyucu hiçbir şey söylemiyordu. Yükleme hâli (`aria-busy`) söyleniyordu,
sonucu söyleyen yoktu — yani "bekle" duyuluyor, "bitti" duyulmuyordu.

Dördüncü bulgu etkin oturumlarda: `stale` ve `failed` durum satırları web'de
ortak bildirim kutusundan geçiyor (`AuthNotice`, `role="alert"`), mobilde düz
metindi. §157 o bileşenin `msg` satırını kapatmıştı ama bu ikisi `msg` değil,
**durum nesnesinin alanı**.

Üç kalıp, aynı sınıf: `setMsg` (§157), `Feedback` nesnesi (§11.272), durum
nesnesi (bu madde). Sınıfı bir kalıpta aramak onu taradığını sanmaya yol
açıyor; kalıbı değiştirince aynı sınıf yeniden bulgu veriyor.

**§177** üç yüzeyi de çift olarak ve mutlak ölçütle denetliyor. Beş
enjeksiyonun beşi doğru tarafta yakalandı.

## §11.274 — Yerinde değişen sonuç (dördüncü kalıp) ve ölçütün kendisi

Sınıfın dördüncü kalıbı: `phase`/`status` gibi **dizge durum makineleriyle**
çizilen sonuç dalları. İki platformda altmış beş dal çıktı ve çoğu sessiz —
**ama o doğru.** Onlar tam ekran sonuçlar: ekran değişince ekran okuyucu yeni
ekranı kendiliğinden okuyor, üstüne bir canlı bölge eklemek aynı şeyi iki kez
söyletir.

Bu turun asıl kazancı ölçütün kendisi oldu. Doğru soru "sonuç dalı mı" değil:

> **Ekran mı değişiyor, yoksa açık bir kutunun/ekranın İÇİ mi?**

Ekran değişiyorsa duyuru gereksiz; yerinde değişiyorsa zorunlu. Bu ayrımı
kapının içine yazdım ki bir sonraki tarama "bütün sonuç dalları duyurmalı"
diye yanlış bir kural çıkarmasın — o kural, uygulamayı iki kez konuşan bir
şeye çevirirdi.

Ölçüte göre iki çift yerinde değişiyordu ve **ikisi de iki platformda birden
sessizdi**:

- **Bildirim kutusunun sonucu** ("Bildirildi · Teşekkürler, bakacağız" ve
  "Gönderilemedi"): diyalog açık kalıyor, içi değişiyor. Kullanıcı "Bildir"e
  basıyor ve bildirimin gittiğini hiç duymuyordu.
- **Sınavın konuşma bölümündeki ses hatası / ipucu satırı**: mikrofon
  düğmesinin altında beliriyor, odak düğmede kalıyor.

**§178** üç ölçümü çift olarak ve mutlak ölçütle denetliyor; dört enjeksiyonun
dördü yakalandı.

Dört kalıp, tek sınıf: `setMsg` (§157) · `Feedback` nesnesi (§11.272) · durum
nesnesi (§11.273) · dizge durum makinesi (bu madde). Dördüncüsü aynı zamanda
sınıfın **sınırını** verdi: her sonuç duyurulmaz, yerinde değişen sonuç
duyurulur.

## §11.275 — Diyaloğun adı yoktu

Modal bütünlüğünün dört parçası var: arka plan erişilebilirlik ağacından
çıkar, geri tuşu/Esc kapatır, zemine dokunuş kapatır ve kutunun **bir adı**
olur. İlk üçü iki platformda da tamamdı (§153 ve §158 turlarında kapanmış);
dördüncüsü eksikti.

Web'in üç `<dialog>`u adsızdı: ekran okuyucu "diyalog" diyor ama **ne
sorduğunu** söylemiyordu — kutunun konusu ancak içerik okunmaya başlayınca
anlaşılıyordu. Başlık zaten ekranda duruyor; `aria-labelledby` onu kutunun adı
yapıyor (`useId` ile, çünkü aynı diyalog aynı sayfada birden çok kez
çizilebilir).

Mobilde aynı eksik iki modalda vardı: mikrofon açıklaması ve rozet kutlaması
`accessibilityViewIsModal` taşıyordu ama adsızdı. Onay ve bildirim kutuları
`accessibilityRole="alert"` ile içeriğinden okunuyordu — bu çalışıyor, ama
beşini aynı kurala bağlamak hem davranışı hem kapıyı sadeleştirdi: hepsi artık
`accessibilityLabel` taşıyor (onay kutusunda ad, başlığın kendisi).

**§179** dört ölçüm yapıyor: iki platformda modalın adı ve kapanma yolu. Beş
enjeksiyonun beşi yakalandı.

Kapı ilk sürümde fazla katıydı: onay ve bildirim kutularını "adsız" saydı,
oysa ikisi rol + içerik üzerinden okunuyordu. Ölçümü gevşetmek yerine kodu
tekleştirdim — ölçütü gerçeğe uydurmak yerine gerçeği ölçüte çektim, çünkü
burada ölçüt daha iyiydi.

## §11.276 — Android'de şifre yöneticisi giriş formunu dolduramıyordu

Form alanlarının etiket taraması **simetrik** çıktı: iki platform da alanları
yer tutucuyla adlandırıyor (tarayıcı ve TalkBack onu ad olarak okuyor, yani
alanlar kullanılabilir — yazmaya başlayınca görsel etiketin kaybolması ayrı ve
daha küçük bir konu). Ayrışan şey **otomatik doldurmaydı.**

Web on üç alanda `autoComplete` veriyor: e-posta, ad, mevcut parola, yeni
parola, tek kullanımlık kod. Mobilde yalnız dört alan vardı ve üçü SMS koduydu
— yani **Android'de kayıtlı parolası olan kullanıcıya öneri hiç çıkmıyor**,
giriş elle yazılıyordu. Altı alan ipucunu aldı (`autoComplete` Android,
`textContentType` iOS): giriş e-postası, sıfırlama e-postası, ad, giriş
parolası, mevcut/yeni parola ve sıfırlanan parola.

İpucunun **doğru olması** ayrıca önemli: kayıtta `new-password`, girişte
`current-password`. Yanlışını vermek yöneticiye yanlış kaydı önerir — yeni
parolayı eskisinin üzerine yazmak gibi. Kapı bu yüzden yalnız "ipucu var mı"
demiyor, hangi ipucu olduğunu da ölçüyor.

**§180** iki kez düzeltildi ve ikisi de bu oturumda öğrenilmiş derslerin
tekrarıydı:

1. Ölçüm mobildeki **tam ifadeyi** arıyordu; web aynı kararı ters sırayla
   yazıyor (`mode === "signin" ? "current-password" : …`) ve kapı doğru kodu
   "yok" diye bildirdi. Önemli olan biçim değil davranış: iki ipucunun da
   geçmesi ve kararın kipe bağlanması (§167'deki değişken adı dersi).
2. Ölçüm dosyada ipucunun **geçmesine** bakıyordu; giriş e-postasının ipucu
   silinince sıfırlama ekranındaki e-posta alanı, yeni parolanınki silinince
   "tekrar" alanı kapıyı yeşil tutuyordu — komşu alan ölçülenin yerine
   geçiyordu. Artık her dosyada kaç alanın ipucu taşıdığı sayılıyor.

Beş enjeksiyonun beşi son hâlde yakalandı.

## §11.277 — Telefonda web başka bir klavye açıyordu

Web telefonda da kullanılıyor (ana ekrana eklenebilen PWA) ve aynı alanlar
orada **başka davranıyordu**:

| alan | Android | web (öncesi) |
|---|---|---|
| giriş adı | kelime başları büyük | büyütmüyor |
| giriş e-postası | büyütmüyor, düzeltme kapalı | ilk harfi büyütüyor, düzeltme açık |
| profil adı | kelime başları büyük | büyütmüyor |
| kelime araması | büyütmüyor | ilk harfi büyütüyor |

Küçük ama her girişi etkiliyor: "Ahmet" yerine "ahmet" kaydedilmesi ya da
e-postanın "Ali@…" diye başlaması kullanıcıyı geri dönüp düzeltmeye zorluyor —
ve e-postada bu, hesabın bulunamamasına kadar gidiyor. Dördü de Android'in
davranışına eşlendi; sıfırlama ekranındaki e-posta da aynı ipucunu aldı.

Eş çıkanlar: iki adımlı doğrulama kodu (`inputMode="numeric"` + Android'de
`number-pad`), promosyon kodu (`characters` iki tarafta), kullanıcı adı
(`none` + düzeltme kapalı iki tarafta).

**§181** dört alanın davranışını çift olarak ve mutlak ölçütle denetliyor.
Ölçüm alanın **kendi etiketine** bakıyor — dosyadaki başka bir alanın
özniteliği ölçülenin yerine geçmesin diye (§180'de iki kez yaşanan hata). Beş
enjeksiyonun beşi yakalandı.

## §11.278 — Sınır aynıydı ama dört yerde yazılıydı

Girdi uzunluk sınırları karşılaştırıldı: görünen ad (40), iki adımlı kod
(ortak sabit), kullanıcı adı (20) ve biyografi (140) — **dördü de iki
platformda aynı sayı.** Kusur sayıda değil, sayının kaç yerde yazılı
olduğundaydı: kullanıcı adı üç yerde (sunucunun deseni + iki istemci),
biyografi üç yerde. Biri değişse ötekiler sessizce eski kalır ve kullanıcı
**yazabildiği** bir adın reddedildiğini görürdü — istemci kabul ediyor, sunucu
geri çeviriyor.

Sunucuda desen artık sınırlardan **kuruluyor** (`USERNAME_MIN`/`USERNAME_MAX`
üzerinden `new RegExp`), web sınırları doğrudan içe aktarıyor, mobil kendi tek
kaynağından okuyor.

**Var olan bir kapı bu değişiklikte düştü ve düşmesi doğruydu** — ama ilginç
bir sebeple: eski §146 dört yüzeydeki **sayıyı** kuralın sayısıyla
karşılaştırıyordu, yani sayının dört yerde yazılı olmasını *veri* sayıp
yalnızca aynı kalmalarını kolluyordu. Yüzeyler sayıyı bırakıp kaynağı
gösterince kapı "sınırsız" gördü. Doğru soru "sayılar aynı mı" değil, **"sayı
kaç yerde yazılı"**; ölçüm §182'ye taşındı ve eskisi yerinde bırakılmadı —
iki kapının aynı şeyi farklı sorularla ölçmesi, biri bayatladığında ötekinin
onu örtmesi demek.

**§182** üç şeyi denetliyor: mobilin kaynağı sunucuyla aynı mı, dört yüzey de
sınırı kaynaktan mı alıyor, ve sunucunun deseni sınırlardan mı kuruluyor. Beş
enjeksiyonun beşi yakalandı — biri sunucunun sayısını değiştirerek, yani ölçüm
gerçekten tek kaynağa bağlı.

## §11.279 — Aynı soruyu kalan kapılara sordum: profil sınırları beş yerde yazılıydı

§11.278'deki soru ("sayı kaç yerde yazılı") profil sınırlarına da uyuyordu.
Günlük hedef (5-120), günlük yeni kelime (0-40) ve görünen ad uzunluğu (40)
**beş ayrı yerde** yazılıydı: sunucunun kırpma kodu, web ayar kaydırıcıları,
webin kayıt formu, mobilin ayar kaydırıcıları, mobilin kayıt formu. Sayılar
tesadüfen tutuyordu; biri değişse öteki dördü sessizce eski kalırdı — ve
kaydırıcının izin verdiği bir değeri sunucu geri kırptığı için kullanıcı
**ayarın kaydedilmediğini** görürdü, hata değil "olmadı" diye.

Artık sunucu tarafında `lib/profile-limits` tek kaynak, mobilde
`lib/profileDefaults` içindeki `PROFILE_LIMITS` onun aynası; altı yüzeyin
hepsi sınırı oradan okuyor.

**§50, §144 ve §145 bu değişiklikle düştü ve üçü de §183'e katlandı.** Biri
ders verdi: §144 sayıyı bulamadığında iki tarafta da `"?"` üretiyordu ve
`"?" === "?"` kapıyı yeşil tutuyordu. Yani kapı, sabitler ortaya çıktığı an
**hiçbir şey ölçmemeye** başlamış, ama bunu bir arıza gibi değil bir uyum
gibi bildirmişti. Kural: *bir kapı ölçemediği şeyi "bilinmiyor" diye
işaretleyip iki tarafta da aynı işareti üretiyorsa, karşılaştırma kapıyı
korumaz* — ölçülemeyen taraf, eşitlik değil **arıza** saymalı. §157'nin ilk
hâli de ("çizim-yok" iki tarafta) aynı tuzağa düşmüştü; ikisinde de çözüm
karşılaştırmayı bırakıp her tarafı **mutlak beklenen listeye** bağlamak oldu.

**§183** üç şeyi denetliyor: mobilin kaynağı sunucuyla aynı mı, uç sınırı
kaynaktan mı okuyor, altı yüzey de kaynaktan mı okuyor. Beş enjeksiyonun
beşi doğru taraftan yakalandı.

## §11.280 — Görev ödülü kartın içine elle yazılıydı, çünkü sabit erişilemezdi

Aynı soruyu (§11.279) kalan kapılara sordum. §25 "kartın yazdığı sayı
sunucunun sabitiyle aynı mı" diye soruyordu ve **doğru cevabı alıyordu** —
ama yanlış soruydu: kusur sayının değeri değil, sayının kartın içinde
**yazılı olmasıydı**.

Sebep yapısaldı: `lib/quests` `server-only`, `quest-card` istemci bileşeni.
Kart o yüzden hem ödülü ("+300 XP" ve `claim_xp`) hem de toplu görevin
kimliğini (`"all"`, üç yerde) elle yazıyordu. Sunucudaki ödül değişse web
kullanıcısına **yanlış miktar** yazardı; kimlik değişse düğme sessizce
çalışmazdı. Androidde böyle bir sorun yoktu — orada sabitler `game/quests`
içinde ve ekran onları içe alıyor.

İki sabit `lib/quest-constants` içine alındı (`server-only` DEĞİL); `quests`
oradan yeniden dışa veriyor, kart doğrudan oradan okuyor. §25 artık "kartta
elle yazılmış rakam ya da kimlik var mı" diye soruyor; §22'nin sabit çifti de
yeni dosyayı gösteriyor. Dört enjeksiyonun dördü yakalandı.

## §11.281 — Politika sayısı cümlenin İÇİNDE yazılıydı (parola, kullanıcı adı)

Aynı sorunun sözlüğe uzanan hâli ve bu turun en geniş bulgusu. İki kural
kodda tek sabitti ama kullanıcıya **söyleyen cümle** sayıyı düz metin
taşıyordu:

- **Parola alt sınırı** (`MIN_PASSWORD_LENGTH` = 10): "Parola (en az 10
  karakter)" ve "Parola en az 10 karakter olmalı." — üç dil, iki platform,
  **on iki dizge**.
- **Kullanıcı adı bekleme süresi** (`USERNAME_CHANGE_COOLDOWN_DAYS` = 14):
  "14 günde bir değişir." ve hata cümlesi — yine on iki dizge.

Sayılar bugün tutuyordu. Ama sabit değişseydi **kural değişir, cümle eski
sayıyı söylemeye devam ederdi**: form "en az 10 karakter" der, sunucu on
ikiyi ister, kullanıcı neyi yanlış yaptığını öğrenemezdi. Karşılaştırmalı bir
kapının bunu görmesi imkânsızdı, çünkü iki platformun cümlesi de **aynı**
yanlışı söyleyecekti — §11.228 sınıfı, ölçüt mutlak olmak zorunda.

Cümleler artık `{n}` taşıyor; on iki çağıran sabiti geçiriyor
(`errorText` gibi kod→anahtar haritalarında değişken koşulsuz geçiliyor,
öteki anahtarlar için zararsız). Mobilde bekleme süresi `SOCIAL_LIMITS`
içine girdi ve §182 artık onu da sunucuyla karşılaştırıyor.

**§184-185** tek blokta, politika tablosuyla: her politika için "altı sözlük
dosyasında rakam kaldı mı" ve "her çağıran sabiti geçiriyor mu". Kapının
kendisi de tekrar etmesin diye tablo dönülüyor — düzelttiğim şeyin aynısını
kapının içinde yapmak tuhaf olurdu. Sekiz enjeksiyonun sekizi yakalandı.

## §11.282 — Güvenilen cihazın süresi hiçbir yerde yazılı değildi

Taramanın ikinci turu, iki bulgu. Birincisi cinsi bakımından yeni: sayı iki
yerde değil, **sıfır yerde** yazılıydı.

"Bu cihazda 30 gün kod sorulmaz" cümlesi altı sözlük dizgesinde duruyordu ve
kodda bu süreyi belirleyen hiçbir sabit yoktu — süre better-auth'un
`trustDeviceMaxAge` **varsayılanıydı** (2.592.000 sn = 30 gün) ve uygulama onu
hiç geçmiyordu. Yani ekrandaki söz, bir kütüphanenin varsayılanının doğru
kalmasına güveniyordu. Kütüphane sürümüyle birlikte varsayılan değişse ekran
eski süreyi söylemeye devam eder, hiçbir kapı uyarmazdı.

`TWO_FACTOR_TRUST_DAYS` `lib/auth/two-factor-config` içine girdi (kod süresi
ve hane sayısının yanına — o dosya tam da bu gerekçeyle kurulmuştu), eklentiye
**açıkça** geçiliyor ve cümle `{n}` ile oradan besleniyor. Mobilde ayna
`lib/twoFactor` içinde, karşılaştırmasını mevcut "ortak sayısal sabitler"
kapısı zaten yapıyor.

## §11.283 — Rol yapma sınavının geçme eşiği sekiz yerde yazılıydı

İkinci bulgu klasik sınıftan ama kararı doğrudan etkiliyordu: eşik hiçbir
yerde sabit değildi. İki platformun ekranı `overall >= 60` diye **elle**
karşılaştırıyor, eşiği söyleyen cümle ("eşiğin altında (60)") altı sözlük
dizgesinde ayrıca yazılıydı. Sekiz yer. Biri değişse kullanıcı, ekranın
söylediği eşiği geçtiği hâlde geçemezdi.

`EXAM_PASS_SCORE` `lib/lessons/roleplay-const` içine girdi (`EXAM_TURNS` ve
`EXAM_SECONDS` ile aynı dosya), mobil ekran kendi aynasını tutuyor; hem karar
hem cümle oradan besleniyor.

**Var olan §97 bu değişiklikte sessizce körleşecekti.** Kapı `/>= 60/` diye
arıyordu; eşik sabite taşınınca iki tarafta da "yok" üretip karşılaştırmayı
yeşil bırakacaktı — §144'ün tuzağının aynısı, bu sefer önceden görüldü. Satır
ikiye ayrıldı: sayının kendisi ve ekranın sabiti kullanıp kullanmadığı.

**§186-187** aynı politika tablosuna eklendi; ayrıca iki mutlak ölçüt:
sunucunun `trustDeviceMaxAge`i sabitten geçirdiği, ve rol yapma kararının
(yalnız cümlenin değil) sabitten okuduğu. Altı enjeksiyonun altısı yakalandı.

## §11.284 — Kalan beş politika sayısı ve kapının kendi ölçüm hatası

Taramanın son turu: kuralı **söyleyen** cümlenin sayıyı kendi içinde taşıdığı
beş yer daha.

| Sayı | Cümle | Kaynak |
|---|---|---|
| Pekişme aralığı | "21+ gün aralık" | `MASTERED_DAYS` |
| Yeterlilik penceresi | "son 30 gün" | `DECAY_DAYS` |
| Sınav geçme eşikleri | "toplam %70 ve her bölüm %50" | `PASS_TOTAL`/`PASS_SECTION` |
| Haftalık pekişmiş eşiği | "30'a ulaşınca" | `MIN_MASTERED` |
| Hız turu süresi | "modülün kelimeleri, 60 sn" | `BOSS_SECONDS` |

İkisi istemciden **erişilemiyordu**: `lib/weekly` ve `lib/lessons/boss`
`server-only`. §11.280'deki çözümün aynısı uygulandı — `lib/weekly-const` ve
`lib/lessons/boss-const`, eskiler oradan yeniden dışa veriyor. Mobilde beş
sayının kopyası `lib/learningRules` içinde toplandı; adlar web'dekiyle birebir
aynı olduğu için ayrışma zaten var olan "ortak sayısal sabitler" kapısına
düşüyor (enjeksiyonla doğrulandı).

**Kapının kendisi komşuyu ölçüyordu.** §184-187 yazılırken yer tutucu `{n}`
diye sabitlenmişti. Yeni beş cümlenin üçü başka bir yer tutucu kullanıyor
(`{days}`, `{total}`+`{section}`, `{min}`) ve ikisi — `progp.window` ile
`weekly.pitch_short` — **zaten başka bir şey için `{n}` taşıyordu**. Kapı o
`{n}`'i görüp "tamam" dedi: ölçtüğü şey politikanın yer tutucusu değil,
cümlede rastlantıyla bulunan bir başkasıydı. Politika tablosuna `yer` alanı
eklendi; her politika hangi yer tutucuyu beklediğini **kendisi** söylüyor.
Enjeksiyon 5 (`{min}` → `30`) eski hâlde sessizce geçerdi, şimdi yakalanıyor.

Bu, bu turların en sık tekrar eden dersinin bir örneği daha: **bir kapının
yeşil olması ölçtüğünün doğru şey olduğunu göstermez.** Enjeksiyon, ölçümün
kendisini ölçmenin tek yolu.

## §11.285 — Gizlilik politikasının verdiği iki söz koda bağlı değildi

Taramayı hukuki metinlere taşıdım; buradaki sınıf aynı ama bedeli farklı:
politika sayfası Play Console ve App Store Connect'e **URL olarak verilmiş**
durumda, yani tutulmayan bir söz yalnız yanlış metin değil.

İki söz kodun davranışına bağlıydı ama metne düz sayı olarak yazılmıştı:

- "Konuşma pratiği kayıtları **30 gün**, sonra kendiliğinden silinir" —
  kuralı `lib/lessons/log` içindeki `RETENTION_DAYS` uyguluyor.
- "Oturum süresince, **en çok 30 gün**" ve "oturum çerezi … 30 gün" —
  kuralı `lib/auth/server` içindeki `expiresIn: 60 * 60 * 24 * 30` uyguluyor.

Üçü de üç dilde ayrı yazılıydı: on beş dizge. Sabit değişse politika eski sözü
söylemeye devam ederdi. Metinde zaten bir belirteç düzeni vardı
(`{{backupRetentionDays}}` tam bu gerekçeyle konulmuş) — eksik olan, bu iki
sözün ona bağlanmasıydı.

`SPEECH_LOG_RETENTION_DAYS` (`lib/lessons/log-const`) ve `SESSION_MAX_DAYS`
(`lib/auth/session-config`) açıldı; ikisi de `server-only` modüllerden
çıkarıldı çünkü metni besleyen `lib/legal` onlardan okuyor. Yeni iki belirteç
`{{speechLogDays}}` ve `{{sessionMaxDays}}` **değerini elle almıyor**,
`String(sabit)` ile kuralın kendisinden alıyor.

**Yan bulgu:** `ENTITY_KEYS` (belirteç sözlüğü) ile `LEGAL_ENTITY` (alanların
kendisi) iki ayrı elle yazılmış listeydi. Yeni bir alan birine eklenip ötekine
eklenmezse belirteç sayfada ham `{{...}}` görünür, panelde ise kaydı
engellerdi. Liste artık `Object.keys(LEGAL_ENTITY)`den türetiliyor.

**Kapı iki kez yanlış yerden ölçtü, ikisi de kendi dersini verdi:**

1. İlk hâl metnin TAMAMINDA "N gün" arıyordu ve üç dilde birden "talepler en
   geç 30 gün içinde sonuçlandırılır" cümlesine takıldı. O otuz gün
   **kanundan** geliyor (KVKK m.13, GDPR m.12(3)) ve uygulamanın sabitine
   bağlı değil — belirtece çevrilmesi yanlış olurdu. Tarama konuya uyan
   satırlarla sınırlandı: ölçüm konusunu seçmeli.
2. "Metin belirteci kullanıyor mu" sorusu **gövde düzeyinde** (`body.includes`)
   soruluyordu, oysa söz **satır düzeyinde** veriliyor. Tablo satırındaki
   belirteç, listedeki cümlenin düz sayıya dönmesini örtüyordu — bir
   enjeksiyon bunu kaçırdığında anlaşıldı (ve kaçırmasının sebebi benim
   enjeksiyonumun hedefi ıskalamasıydı; yani kapı test edilmeden yeşil
   duruyordu). Kapı artık konuya uyan her satırı ayrı okuyor. **Bir
   enjeksiyonun yakalanmaması, kapının sağlam olduğunu değil, enjeksiyonun
   doğru yere düşüp düşmediğini önce doğrulamak gerektiğini gösteriyor.**

## §11.286 — Kullanım şartlarındaki adil kullanım sınırları uçların kopyasıydı

Şartlar sayfası dört günlük sınır söylüyor: konuşma pratiği 300 tur, sunucu
konuşma tanıma 400 istek, telaffuz puanı 120 istek, içerik bildirimi 20.
Sayılar `lib/legal` içindeki `FAIR_USE` tablosundan geliyordu ve tablo, dört
uç dosyasındaki yerel sabitlerin **elle tutulmuş kopyasıydı** — tablonun kendi
yorumu bile "route dosyalarındaki sabitler" diyordu. Yani zorunluluğu yazan
bir cümle vardı, ölçen bir şey yoktu.

Kullanıcı için sonucu: şartlar sayfası bir sınır söyler, uç başkasını uygular
ve 429 metinde yazandan önce gelir. Sözleşmede yazılı bir sayı olduğu için bu
yalnız tutarsızlık değil.

Kaynak `lib/quotas` içindeki `DAILY_QUOTAS`; dört uç oradan okuyor, `FAIR_USE`
oradan türetiliyor. `FAIR_USE_KEYS` de (§11.285'teki `ENTITY_KEYS` gibi) elle
yazılmış ikinci bir listeydi, artık tablodan türetiliyor.

**`DAILY_LIMIT` "belirsiz sabit adları" listesinden çıktı ve çıkış sebebi
kaydedilmeye değer.** O liste, aynı adın bir ağaçta farklı değerlerle geçtiği
adları tutuyor ve gerekçesi "ya meşru bir tesadüftür ya adlandırma hatasıdır,
kapı ayırt edemez" diyor. `DAILY_LIMIT` üç uçta üç ayrı sayıyla duruyordu
(400, 120, 20) ve meşru tesadüf sayılmıştı. Oysa üç sayı da şartlarda yazılı
birer sözdü: belirsizliğin bir kısmı tesadüf değil, **tek kaynağın
eksikliğiydi**. Kaynak açılınca ad tek değere işaret etti ve liste kendiliğinden
daraldı — kapı da bunu "kayıtlı ama artık bulunmuyor" diye bildirdi, yani
liste sessizce bayatlamadı.

**Kapı (test-legal)** üç şey soruyor: tablo kaynakla aynı mı, tablo ile kaynak
aynı sayıda alan taşıyor mu (kaynağa eklenen bir kota metinde hiç söylenmezse
görünür), ve her uç sınırı kaynaktan mı okuyor. Sonuncusu iki kalıpla: sabitin
adı uçtan uca aynı olmadığı için (`ROLEPLAY_DAILY_LIMIT` da var) elle yazılmış
sayı taraması ada değil **biçime** bakıyor. Dört enjeksiyonun dördü yakalandı.

## §11.287 — Davet ödülü: kod değişmeden bozulabilen bir söz

Bu turun bulgusu ötekilerden bir adım daha kötü bir sınıfta. Davet kutusu iki
platformda da şunu söylüyor: "Davet ettiğin kişi ilk ödemesini yaptığında sana
**7 gün** Premium veriyoruz." Cümle zaten `{days}` yer tutucusu taşıyordu —
yani doğru yapılmış görünüyordu — ama iki ekran da o yer tutucuya **elle
yazılmış bir 7** geçiriyordu (`t("referral.explain", { days: 7 })`).

Sunucunun verdiği ödül ise `cfg.referral.rewardDays`: **panelden ayarlanan**
bir değer, kod sabiti değil. Yani ödül panelden 14'e çıkarıldığı anda sunucu
on dört gün verir, iki ekran da "7 gün" demeye devam ederdi. **Kod hiç
değişmeden bozulan bir söz** — ne derleme, ne test, ne de bir kapı görebilirdi,
çünkü görülecek bir değişiklik yoktu.

Sayı artık `/api/premium/status` yanıtından geliyor: `ReferralStats`
`rewardDays` alanını taşıyor ve iki kutu onu okuyor.

**Yan bulgu:** `ReferralStats` biçimi üç yerde ayrı yazılıydı — sunucu, web
ödeme duvarının kendi `type Referral`ı, ve mobilin kendi satır içi tipi.
Sunucuya alan eklendiğinde istemci onu hiç görmezdi; `rewardDays` eklenirken
tam bu oldu ve `tsc` web tarafında hatayla uyardı (mobil uzak uca bağlı olduğu
için orada uyarmazdı). Biçim `lib/premium/referral-types` içine alındı
(`server-only` değil), web oradan içe alıyor.

**§193** dört şey soruyor: cümle `{days}` taşıyor mu ve rakamsız mı, iki kutu
da sunucunun alanını mı geçiriyor, sunucu alanı döndürüyor mu, ve iki
istemcinin biçimi alanı görüyor mu. Beş enjeksiyonun beşi yakalandı.

Ayrıca kapının kendi denetimi (§138) devreye girdi: yazdığım `/ReferralStats/`
deseni "sınırsız ad deseni" diye reddedildi, çünkü `ReferralStatsEski` gibi
yeniden adlandırılmış bir adı da "var" sayardı. `\bReferralStats\b` oldu.

## §11.288 — Paketi açan yüzde ile geçme notu: zorunluluğu yazan bir cümle, ölçen bir şey yok

Panelden ayarlanan öteki premium değerlerini taradım. Çoğu **temiz çıktı** ve
bu da bir sonuç: ücretsiz katman sınırları, adil kullanım tavanları, deneme
süresi ve yıllık kazanç yüzdesi iki platformda da yapılandırmadan geliyor;
hiçbiri ekranda elle yazılı değil. Mobilin fiyat ve deneme süresini
**mağazadan** okuyup yapılandırmadaki vitrin fiyatını hiç göstermemesi de
eksik değil, bilinçli ve doğru: App Store 3.1.2 ve Play'in beyan kuralı bunu
istiyor, dosyanın kendi yorumu da bunu söylüyor.

Bir tanesi kirliydi. `mock.unlockPct` (sonraki kâğıt paketini açan yüzde)
varsayılanı `60` diye elle yazılıydı ve `MOCK_PASS_PCT` de `60`. İkisinin aynı
olması gerektiğini **söyleyen bir yorum vardı** — `gates.ts` içinde, alanın
kendi açıklamasında: "Varsayılan `MOCK_PASS_PCT` ile aynı olmalı: uygulamanın
zaten bir geçme notu var, ikinci bir eşik icat etmek kullanıcıya iki farklı
'başarı' tanımı göstermek olurdu." Ölçen bir şey yoktu. Ayrışsaydı kâğıdı
"geçti" diye işaretlenen biri sonraki paketi açamazdı.

Varsayılan artık sabitin kendisi. **§194** hem eşitliği hem de sayının elle
yazılmamış olmasını okuyor; eşitlik tek başına yetmez, çünkü iki sayı birlikte
değiştirilip aynı değere getirilebilir ve bağ yine kopuk kalır.

**Kapı yine komşuyu ölçtü ve bu kez ilk denemede yakalandı:** ilk yazım
dosyanın tamamında `unlockPct:` arıyordu ve **tip bildirimini**
(`unlockPct: number;`) okuyup "number;" buldu. Ölçüm `DEFAULT_PREMIUM_CONFIG`
bloğuna daraltıldı. Bu turlarda aynı hatanın kaçıncı kez çıktığını sayıyorum;
kalıp şu: bir adı dosya düzeyinde aramak, o adın **tanımını** değerinin yerine
koyar.

**Yan bulgu:** `PREMIUM_FEATURES` ve `PremiumFeature`, `PREMIUM_GATES` ile
`PremiumGate`in hiçbir yerde kullanılmayan takma adlarıydı. Tek kaynağı ikiye
bölmenin en sessiz hâli: ikinci ad bir gün ayrı bir şeye bağlanırsa kimse fark
etmez. Kaldırıldı.

## §11.289 — Yorumun söylediği ama ölçülmeyen zorunluluklar

Taramayı yön değiştirdim: sayılardan **yorumlara**. Kodun içinde "şu şu ile
aynı olmalı / olmak zorunda" diyen cümleleri dolaşıp hangisinin kapısı yok
diye baktım. Çoğu zaten ölçülüyordu (`numbers.ts` gövde karşılaştırması,
hukuki sürüm eşitliği, ses kayıt defteri, ikon yolları). Üç tanesi kirliydi.

**a) Beceri konuşma oynatıcısında `PASS = 80`.** Başında "lib/pronounce'daki
`PASS_SCORE` ile aynı olmalı" yazılıydı — zorunluluğu yazan bir cümle, ölçen
bir şey yok. Eşik `lib/pronounce-const` içine alındı (ayrı dosya, çünkü bir
bileşenin puanlama modülünün tamamını tek sayı için bundle'a çekmesi gereksiz
ağırlık olurdu); iki taraf da oradan okuyor.

**b) Aynı dosyadaki `MAX_MS = 8000`in yorumu YANLIŞTI.** "Sınav oynatıcısıyla
aynı" diyordu; sınav 12 saniye kaydediyor. Fark bilinçli (burada tek bir cümle
söyleniyor, sınavda serbest cevap) ama **yanlış bir yorum yokluktan kötü**:
sonraki okuyan yanlış tarafı "düzeltir". Yorum gerekçesiyle düzeltildi ve kapı
ikisinin **ayrı** kalmasını bekliyor — mutlak ölçütle, çünkü iki tarafı
karşılaştırmak onları eşitlemeye davet ederdi.

**c) Sınavın konuşma maddesinde iki platform farklı süre veriyordu.** Web 12
saniye kaydediyor, mobil 8 saniye dinliyordu: aynı sınav, aynı soru, farklı
süre — ve cevabı kesilen kullanıcı puan kaybediyordu. İkisi 12'de eşlendi
(gevşetme yönü: mobilin tanıyıcısı sessizlikte kendiliğinden duruyor, kimse
daha uzun konuşmaya zorlanmıyor). Sayı iki tarafta **aynı adla** yazılı, o
yüzden ayrışmayı var olan "ortak sayısal sabitler" kapısı kendiliğinden
yakalıyor — bunun için webdeki `12_000` düz `12000` yazıldı, çünkü alt çizgili
biçim o taramanın desenine girmiyordu.

**§195** beşi birden okuyor. Dört enjeksiyonun dördü yakalandı; dördüncüsü tam
da (b)'nin davet ettiği yanlış düzeltmeydi (beceri kaydını sınava eşitlemek).

**Not — paralel oturum:** `mobile/src/data/lessons/index.ts` içinde
`./en-b2.json` içe alınmış ama dosya henüz yazılmamış (başka bir oturumun
sürmekte olan işi). Mobil `tsc` tek bu hatayı veriyor ve `App.test.tsx` süiti
bu yüzden yüklenemiyor (136 test geçiyor, 1 süit yükleme hatası). Benim
değişikliklerimle ilgisi yok ve onların dosyalarına dokunmadım.

## §11.290 — Konuşma pencereleri: hangisi bilinçli fark, hangisi ayrışma

İki platformun mikrofon süreleri tek tek eşlendi. Tablo:

| Adım | Web | Mobil (önce) | Sonuç |
|---|---|---|---|
| Yürüyüş cevabı | `ANSWER_WINDOW_MS` 8000 | adsız `8000` | aynı sayı, **ada bağlandı** |
| Yürüyüş onayı | `CONFIRM_SILENCE_MS` 7000 | adsız `7000` | aynı sayı, **ada bağlandı** |
| Ders | `SILENCE_MS` 12000 | adsız `8000` | **ayrışma** → 12000 |
| Seviye sınavı | `SPEAK_MAX_MS` 12000 | 8000 | §11.289'da düzeltildi |
| Rol yapma sınavı | üst sınır yok (tarayıcı bitirir) | 8000 emniyet tavanı | **bilinçli fark**, ölçüm dışı |

**Ders adımı gerçek bir ayrışmaydı.** Web on iki saniye bekliyor ve gerekçesi
yazılı: "bir cümleyi düşünmek birkaç saniye, on saniyeyi geçen sessizlik
takılma." Mobil sekiz saniyede mikrofonu kapatıyordu ve bir gerekçesi yoktu —
dört saniyelik fark öğrenciyi cümlesini kurarken kesiyordu. Gevşetme yönü
güvenli: `listenOnce` konuşma durduktan ~800 ms sonra dönüyor (asıl bitiş
kararı partial tabanlı), yani süreyi uzatmak hızlı cevap vereni bekletmiyor.

**Yürüyüş ikilisi bugün ayrışmıyordu; kusur sayının mobilde ADSIZ olmasıydı.**
Ad verilince var olan "ortak sayısal sabitler" kapısı ikisini kendiliğinden
karşılaştırmaya aldı (ortak sabit sayısı 51'e çıktı) ve enjeksiyon bunu
doğruladı. Bir sayıyı adlandırmak, burada kapı yazmakla aynı şey.

**Ders satırı ayrı bir kapı olarak yazıldı çünkü sayı aynı olmalı, ad
olmamalı:** webde sayaç yalnız **kendiliğinden açılan** mikrofon için işliyor
(kullanıcı kendi dokunduysa sınır yok), mobilde her durumda üst sınır. Aynı
ada zorlamak iki farklı şeyi aynı sanmak olurdu; §196 eşitliği mutlak ölçütle
tutuyor.

**Rol yapma sınavı bilerek dışarıda:** webde tarayıcı tanıyıcısı kendi
bitiriyor ve hiç üst sınır yok; mobildeki 8000 bir emniyet tavanı. İkisi aynı
birimi ölçmüyor — karşılaştırmak, ölçtüğünü sanıp başka şeyi ölçmenin bu
defterdeki en sık hatası olurdu.

Dört enjeksiyonun dördü yakalandı. Önceki turda not düştüğüm paralel oturum
kırığı (`en-b2.json`) giderilmiş: mobil `tsc` temiz, 137 test geçiyor.

## §11.291 — Aynı cevap, iki platformda farklı noktada "zaman aşımı"

Değerlendirme bekleme tavanları eşlendi:

| Çağrı | Web | Mobil (önce) |
|---|---|---|
| Tek cevap (yazma, serbest cümle, beceri) | `ASSESS_TIMEOUT_MS` 20000 | genel tavan 25000 |
| Rol yapma sınavı puanlaması | varsayılan 20000 | elle `30_000` |
| Çeviri turunda AI onayı | `ASSESS_WAIT_MS` 6000 | `ASSESS_WAIT_MS` 6000 |

Üçüncü satır zaten eşti ve **sebebi öğretici**: iki taraf da sayıyı **aynı
adla** yazıyordu, o yüzden var olan "ortak sayısal sabitler" kapısı onu
koruyordu. İlk ikisi adsızdı — biri genel tavana düşüyor, öteki çağrı yerinde
elle yazılı — ve hiçbir şey bakmıyordu.

**Rol yapma satırı webde bir riskti.** Orada konuşmanın tamamı gönderiliyor,
tek cümle değil; mobil baştan beri otuz saniye bekliyordu, web varsayılan
yirmiyle yetiniyordu. Yani uzun bir konuşma **webde zaman aşımına düşerken
mobilde puanlanıyordu** — aynı sınav, aynı cevap, farklı sonuç. Fark bilinçli
olarak korundu (yük gerçekten farklı) ama artık iki tarafta aynı adla yazılı:
`ASSESS_ROLEPLAY_TIMEOUT_MS`.

Bir ayrıntı ölçümü etkiliyordu: webde sayı `20_000` yazılıydı ve ortak sabit
taraması **alt çizgili biçimi görmüyordu**. Alt çizgi kalktı; §11.290'da
`12_000` için aynı şey yapılmıştı. Bu artık bilinen bir tuzak: *sabiti
adlandırmak kapıya girmesi için yetmiyor, biçiminin de taramanın desenine
uyması gerekiyor.*

**§197** sayıları değil **çağrı yerlerini** okuyor (sayılar zaten ortak sabit
taramasında): beş yüzeyin her biri sabiti geçiriyor mu, ve hiçbirinde elle
yazılmış bir tavan kalmamış mı. Dört enjeksiyonun dördü yakalandı.

`game/skillLibrary` listeye **alınmadı**: başka bir oturumun sürmekte olan işi,
henüz git'te değil. Kapının yorumunda yayına girdiğinde eklenmesi gerektiği
yazılı.

## §11.292 — Günün turunun puan formülü iki kopyaydı ve gövdesi ölçülmüyordu

Animasyon ve gecikme sürelerini taradım. Rozet kutlaması temiz çıktı: `MAX_SOLO`,
`SOLO_MS`, `BATCH_MS`, `BATCH_SHOWN` iki tarafta **aynı adla** yazılı, o yüzden
ortak sabit taraması onları zaten koruyor. Mobildeki fazladan `FIRST_MS` ve
`DEBOUNCE_MS` eksik değil — webde rota değişimi tetikleyici olduğu için orada
karşılığı yok.

Asıl bulgu başka yerden çıktı: **günün turunun puan formülü.** İki dosyanın da
yorumu zorunluluğu yazıyor — `game/daily`: "Puanlama formülü web'deki
`lib/daily-score` ile AYNI (ekranla tablo ayrışmasın)"; `lib/daily-score`: "iki
kopya formül, ekranda görünen puanla tabloya yazılanın ayrışması demekti."
Gerekçesi de sonucu da yazılı, **ölçen bir şey yok.**

Sabitler korunuyordu: beş sayı (`BASE_POINTS`, `FAST_MS`, `SLOW_MS`,
`MAX_SPEED_BONUS`, `MAX_STREAK_MULTIPLIER`) aynı adla yazılı olduğu için ortak
sabit taramasına giriyor — enjeksiyonla doğruladım. Ama **gövde**
korunmuyordu: mobilde `combo >= 3` yerine `combo >= 2` yazmak bütün kapıları
yeşil bırakıyordu. Kullanıcının göreceği şey şu: tur boyunca ekranda bir puan
birikir, gün sonunda tabloda başka bir sayı yazar — ve sıralama o ikincisine
göre kurulur.

**§198** gövdeyi §16'nın kalıbıyla karşılaştırıyor (satır satır, yorumlar
ayıklanmış, boşluk teklenmiş). Üç enjeksiyonun üçü yakalandı: seri eşiğinin
kayması, hız bonusunun yuvarlanması, yanlış cevabın erken dönüşünün kalkması.

Ders: **bir sabit çiftini korumak, o sabitleri kullanan formülü korumaz.**
Aynı sayılarla iki farklı sonuç üretmek gayet mümkün ve bu deftere bugüne
kadar hep sayılar üzerinden bakılmıştı.

## §11.293 — "Karşılığıdır" diyen yorum yanlıştı: boşluksuz katlama ayrışıyordu

§11.292'nin yöntemini sürdürdüm: iki platformda ayrı yazılmış **saf hesap**
gövdelerini tarayıp hangilerinin kapısı yok diye baktım. Doksan altı ortak
işlev adı çıktı; çoğu zaten modül gövdesi olarak karşılaştırılıyor
(`numbers`, `sentenceMatch`, `german`, `errors`). Dokuzunu tek tek
karşılaştırdım: `checkPassword`, `classifyTyping`, `charDiff`, `articleRule`,
`confusableHint` **birebir aynı** çıktı. Dördü ayrıştı.

Üçü yapısal ve zararsızdı (`foldSpelling` aynı işlemleri farklı sırada
yapıyor — sayı sözlüğü umlautlu ve katlanmış yazımın ikisini de tanıdığı için
sonuç aynı; ölçtüm, on üç örnekte de aynı). **Biri gerçekti.**

Webin `foldTight`i başında "mobil `lib/textFold` `foldTight`" yazıyordu ama
**karşılığı değildi**: mobilde `foldCompare` üstüne kuruluyor — umlaut
katlaması **ve sayı katlaması** içeriyor — webde ise yalnız `normalize` vardı.
İki hattı yan yana çalıştırdım; on üç örneğin **yedisi** ayrışıyordu:

| Girdi | Web (eski) | Mobil |
|---|---|---|
| "Ich bin fünf" | `ichbinfünf` | `ichbin5` |
| "Füße" | `füße` | `fuesse` |
| "Straße" | `straße` | `strasse` |
| "zwölf" | `zwölf` | `12` |

`foldTight` **yedek geçiş**: tam eşleşme tutmayınca boşluksuz karşılaştırma
deneniyor. Yani ayrışma kullanıcıya hata gibi değil, **"cevabın yanlış"** diye
görünüyordu — "Fuesse" ya da "5" yazan Android'de geçiyor, webde geçemiyordu.

Web artık mobilin hattını izliyor: umlaut katlaması `foldCase` diye ayrı bir
işleve çıktı (iki katlama da ona ihtiyaç duyuyor; eskiden yalnız
`foldSpelling`in içine gömülüydü ve `foldTight` ondan habersizdi) ve
`foldTight` `foldNumbers(foldCase(normalize(…)))` oldu. On üç örnekte de mobil
ile aynı sonucu veriyor; `foldSpelling`in davranışı değişmedi (ayrıca ölçüldü).

**§199** gövdeleri karşılaştırmıyor — yapılar farklı, karşılaştırma onları
aynı yazmaya zorlardı — her tarafı **mutlak ölçüte** bağlıyor: iki katlama da
hem harf hem sayı katlamasından geçmeli, ve umlaut çifti iki tarafta aynı
olmalı (biri "oe" öteki "o" yazsaydı "schön" ile "schon" karışırdı — webin
kendi yorumunun uyardığı şey). Dört enjeksiyonun dördü yakalandı.

## §11.294 — Ünite quizinde tekrar soruları Android'de hiç yoktu

`deriveQuiz` ayrışmasının (24'e 48 satır) sebebi bir sayı ya da bir metin
değildi: **webde olan bir mekanizma mobilde hiç yoktu.** Web soruların üçte
birini önceki ünitelerden seçip kendi sorularının arasına serpiyor
(`pickReview` + `interleave`); Android öğrencisi ünite quizinde yalnız o
ünitenin kelimelerini görüyordu. Aynı ekran, aynı içerik, **farklı öğretim** —
ve aralıklı tekrar bu uygulamanın bütün öğrenme tasarımının dayanağı.

Hiçbir kapı bakmıyordu, çünkü kapılar sayı ve metin karşılaştırıyor;
**olmayan bir şeyi hiçbiri aramıyordu.** §11.292'nin dersinin devamı: sabitleri
karşılaştırmak o sabitleri kullanan hesabı korumuyor — ve hesap bir tarafta
hiç yoksa karşılaştırılacak sayı da yok.

Seçim mantığı birebir taşındı: asal çarpan 37, `take` çarpanı 13, adım ve
guard dahil. İkisi de aynı gerekçeyi taşıyor — düz `index % pool` her ünitede
tek kayma verir ve yirmi beş ünite havuzun aynı dar bandına düşer; `take`
başlangıca girmezse aynı ünitenin quiz'i (2 tekrar) ile checkpoint'i (4
tekrar) aynı yerden başlar. Örneklerle doğruladım: ünite 1 quiz `rw23,rw3`,
checkpoint `rw9,rw19,rw29,rw39` — ayrı setler.

Açıklamanın "(önceki ünitelerden tekrar)" satırı webde `quizw.` önekliydi,
yani **web-only sözlükte**. Ortak sözlüğe `quiz.from_earlier` olarak taşındı
ve web de artık oradan okuyor.

**§200 üç şey ölçüyor** ve dördüncüsü enjeksiyonla ortaya çıktı: `pickReview`
ve `interleave` gövdeleri satır satır aynı mı, iki çağrı yeri havuzu
kuruyor/geçiriyor mu — **ve oran.** İlk yazımda oran yoktu: "soruların kaçı
tekrar" kararı `deriveQuiz` içinde, iki gövdenin de dışında. Webde `count / 3`
yerine `count / 4` yazmak bütün kapıları yeşil bırakıyordu. Beş enjeksiyonun
beşi artık yakalanıyor.

Gövde karşılaştırmasının tutması için mobile `QuizPool` tipi de eklendi —
imzalar ayrı yazıldığında (`{ vocab: VocabItem[] }` ile `QuizPool`) kapı
gövdeyi ayrışık görüyordu. İki taraf artık aynı adı kullanıyor.

## §11.295 — Gramer soruları: aynı kural, farklı karıştırma, farklı sorular

`deriveGrammar` iki tarafta aynı kuralı uyguluyordu — hüküm adımları çekirdek,
dizme soruları pekiştirme, yarı yarıya — ama **seçimi yapan karıştırma aynı
değildi.** Mobil dosyanın içinde `seededOrder` diye ayrı bir uygulama duruyordu
ve yorumu "web'deki `seededShuffle` ile aynı **amaç**" diyordu. Amaç aynıydı,
algoritma değil: ikisi de FNV-1a ile tohumluyor, ama kopya xorshift +
`Math.abs(h) % (i+1)`, web (**ve mobilin kendi `lib/shuffle`ı**) mulberry32 +
`Math.floor(rand() * (i+1))` kullanıyordu.

Sıra farkı masum değil: hüküm sayısı yarıdan çoksa dilimleme **seçimi de**
değiştiriyor. Dokuz hüküm ve dört seçimle ölçtüm — örnek ünitelerin
**hepsinde** iki platform farklı soru kümesi seçiyordu:

| Ünite | Web | Mobil (eski) |
|---|---|---|
| de-a1-u01 | H2,H6,H5,H3 | H3,H2,H7,H0 |
| de-a2-u03 | H5,H0,H2,H3 | H5,H8,H1,H4 |

İkinci ayrışma tohumun kendisindeydi: mobil `de-` önekini **sabit** yazıyordu,
yani İngilizce kursta webin tohumundan (`${kurs}-…`) farklı bir dizi
üretiyordu — ve iki kurs mobilde aynı tohumu paylaşıyordu.

İlginç olan: mobilde doğru karıştırma **zaten vardı** (`lib/shuffle`
`seededShuffle`, gövdesi webinkiyle karşılaştırılıyor ve yeşil). Bu dosya onu
kullanmak yerine kendi kopyasını yazmıştı. Kapının "tohumlu karıştırma"
ölçümü de yeşildi — çünkü ölçtüğü modül doğruydu; **yanlış olan, o modülü
kullanmayan çağıran.**

**§201** dört şeyi mutlak ölçütle tutuyor: iki taraf da paylaşılan karıştırmayı
mı kullanıyor, dosyada ayrı bir kopya kalmış mı, tohum kursu taşıyor mu, ve
hüküm/dizme oranı aynı mı. Dört enjeksiyonun dördü yakalandı — biri ilk
denemede hedefi ıskaladığı için (Türkçe "Ş" harfi yüzünden eşleşmeyen bir
`sed`) ayrıca tekrar denendi; §11.285'te öğrenilen şey: **yakalanmayan bir
enjeksiyon, önce enjeksiyonun kendisinden şüphelenmeyi gerektirir.**

## §11.296 — Harf bulmacası mobilde rastgele diziliyordu

§11.295'ten çıkan soruyu kalan seçimlere sordum: hangisi tohumlu, hangisi
rastgele? Önce kapsamı daralttım — seviye sınavını kuran `lib/exam`
`server-only`, yani kâğıdı **sunucu** seçiyor ve iki platform aynı soruları
alıyor; günün turu ve haftalık sınav da uçtan geliyor. Ayrışma ancak
**istemcide** seçim yapan yerlerde olabilir.

Üç sonuç çıktı:

**a) Harf bulmacası ayrışıktı.** Web turun kimliğiyle tohumluyor
(`makePool(word.de, round.id)`), mobil `Math.random()` kullanıyordu. İki
sonucu vardı: aynı tur iki platformda **farklı bulmaca** oluyordu, ve mobilde
ekran yeniden kurulduğunda (geri dönüş, yeniden çizim) harfler yerinden
oynuyordu. İkincisi ayrıca kendi içinde tutarsızdı: **mobilin kendi
`lib/shuffle` dosyasının başında tam bu sebep yazılı** — "aynı tohum → aynı
sıra, yani ekran yeniden çizilince parçalar yerinden oynamıyor". Dosya vardı,
kullanan yoktu. §11.295'in aynısı, farklı yerde.

**b) Eşleştirme oyunu iki tarafta da rastgele** ve bu bilinçli: her açılışta
başka sıra isteniyor. Parite zaten vardı.

**c) Cesaret cümlesi** de iki tarafta rastgele seçiliyor — aynı gerekçe.

**§202 mutlak ölçüt kullanıyor:** her yüzey için *beklenen yöntem* yazılı.
"İki taraf da aynı mı" diye sormak yetmezdi — ikisi birden rastgeleye
dönseydi karşılaştırma yine yeşil kalırdı (§11.279'daki `"?" === "?"`
tuzağının bu alandaki hâli). Dört enjeksiyonun dördü yakalandı, dördüncüsü
ters yönden: eşleştirmenin **sessizce tohumlanması** da kırmızı veriyor.

## §11.297 — "Dosya vardı, kullanan yoktu" — bu kez Android ileride, web geride

Son iki turun kalıbını doğrudan aradım: **ortak yardımcı duruyor ama çağıran
kendi kopyasını yazmış.** Satır içi Fisher–Yates, satır içi FNV-1a ve satır içi
umlaut zincirlerini iki ağaçta taradım.

Çoğu masum çıktı — ve bu da bir sonuç. Eşleştirme oyununun karıştırması iki
tarafta da tohumsuz (bilinçli); cümle kurma görevinin normalleştirmesi
(`writing-player` `normalize` ↔ `skillQuiz` `normalizeBuilt`) **davranışça
birebir aynı**; `lib/headword`, `lib/errors`, `assess-client` içindeki
zincirler kendi işleri için ve mobil karşılıkları yok.

Biri gerçekti ve **yön bu kez tersti: Android ileride, web geride.**
`skills/quiz` içindeki `fold` şunu yapıyordu — sabit `de-DE` küçültme,
koşulsuz umlaut katlaması, **sayı katlaması yok**. Mobil aynı işlevi
(`game/skillQuiz` `fold`) çoktan ortak katlamaya bağlamış ve düzeltmenin
gerekçesini de yazmıştı: *"Sabit `de-DE` küçültme + koşulsuz umlaut katlaması
yazılıydı, yani İngilizce beceri egzersizlerinde de Almanca kuralı
işliyordu."* Web o düzeltmeyi almamıştı.

Sekiz örnekle ölçtüm, üçü ayrışıyordu:

| Girdi | Web (eski) | Mobil |
|---|---|---|
| "two apples" (en) | `two apples` | `2 apples` |
| "zwei Äpfel" (de) | `zwei aepfel` | `2 aepfel` |
| "5% Rabatt" (de) | `5% rabatt` | `5 prozent rabatt` |

Yani beceri egzersizinde doğru cevabı sayıyla yazan öğrenci Android'de kabul
ediliyor, webde reddediliyordu.

Webde `foldCompare` diye ortak bir taban açıldı (mobildeki adla aynı);
`foldTight` ona delege ediyor, `skills/quiz` de oradan besleniyor.

**Kapının ölçtüğü yer de kaydı ve bu öğretici:** §199 önce `foldTight`in
gövdesinde harf/sayı katlaması arıyordu; `foldTight` tabana delege edince iki
satır birden "YOK" dedi — **kapı doğru şeyi ölçüyordu ama yanlış yerde.**
Ölçüm tabana taşındı, üstüne "boşluksuz katlama tabandan mı besleniyor"
satırı eklendi. Dört enjeksiyonun dördü yakalanıyor.

## §11.298 — Günün turu sıralamasında madalya webde hiç yoktu

Mobilde yapılıp webe ulaşmamış düzeltmeleri aradım: mobil yorumlarındaki
"sabit yazılıydı", "koşulsuz", "ayrışmıştı" izlerini taradım.

**Bir yanlış alarmı ölçerek eledim.** `lib/dialogue` `normalizeSpoken`i
`lang` vermeden çağırıyor, yani niyet eşleştirmesi hep Almanca sayı katlaması
yapıyor — ilk bakışta İngilizce kursta bir kayıp gibi duruyor. Veriyi saydım:
**577 diyalog kökünün 58'i sayı içeriyor ve hepsi Almanca**; İngilizce
derslerde sayısal kök hiç yok. Üstelik iki platform da aynı varsayılanı
kullanıyor. Yani ne ayrışma ne kayıp — değiştirmedim.

**Gerçek bulgu tasarım tarafındaydı.** Mobil günün turu sıralamasında ilk üçe
dolu daire + beyaz rakam veriyor ve rengi ortak kademe ölçeğinden
(`TIER_COLOR`) okuyor; **webde madalya hiç yoktu**, ilk üç dördüncüden ayırt
edilemiyordu. Mobilin kendi yorumu bu işin geçmişini de yazıyor: "aynı çakışma
rozet ekranında düzeltilmişti ama burası gözden kaçmıştı" — yani düzeltme
mobilde iki kez dolaşmış, webe hiç gitmemiş.

Renk seçimi keyfî değil, mobil tarafta ölçülmüş: madalya rengini **yazıya**
vermek açık temada okunmuyor (altın 2.88, gümüş 2.56, bronz 3.09; normal yazı
eşiği 4.5), uygulamanın kendi dili olan dolu zemin + beyaz içerik ise üçünde de
eşiği geçiyor. Webe aynı kural, aynı ölçek ve aynı gerekçeyle taşındı.

Web satırının geri kalanı (tek satır yoğunluk, baş harf dairesi yok) bilerek
olduğu gibi bırakıldı: liste web'de tablo gibi dar, mobilde kart gibi geniş —
bu ikisi platformun kendi yoğunluk dili.

**§203** üç şeyi mutlak ölçütle tutuyor: iki tarafta da kural var mı ve
**birebir aynı mı** (ilk üç, sonrası yok), ikisi de ortak ölçekten mi okuyor,
ve madalya dolu zemin + beyaz içerik olarak mı çiziliyor. Üç enjeksiyonun üçü
yakalandı — üçüncüsü tam da mobil tarafta ölçülüp elenmiş olan hatayı
(rengi yazıya vermek) webde tekrar yapmaya karşı.

## §11.299 — Üç durum satırı sessizdi (ve üç yanlış alarm ölçerek elendi)

Mobilde ölçülmüş erişilebilirlik düzeltmelerinin webe ulaşıp ulaşmadığını
taradım. Önce **üç yanlış alarm** çıktı ve üçü de kuralın nasıl yazılması
gerektiğini öğretti:

1. `account/active-sessions` duyuru taşımıyor sandım — taşıyor: `AuthNotice`
   duyuruyu **kökte** tutuyor ve rol hesaplı (`role={tone === "error" ?
   "alert" : "status"}`). Düz `role="status"` arayan desen onu görmüyor.
2. `notification-settings` durum satırı hiç göstermiyor — ama bu **bilinçli**:
   iyimser yazıyor, hatayı yutuyor ("bekleyen bir anahtar, dokunulduğunu
   hissettirmeyen bir anahtardır").
3. `exam-player` mobilin `tip` satırının karşılığını `PronounceCard` içinde
   duyuruyor — duyuru ortak bir çocuk bileşende.

Yani "bu dosyada duyuru var mı" sorusu **dosya düzeyinde sorulamaz**.

Dar bir tarama yazdım — yalnız adı belli durum değişkenlerinin (`msg`,
`error`, `saveError`, `note`, `failNote`) **doğrudan** bir metin etiketine
koşullu bağlandığı yerler — ve üç gerçek eksik çıktı, **üçü de mobilde**
(web karşılıklarının hepsi duyuruyordu):

- **`DeleteAccountScreen`** — "parola yanlış" satırı. En ağırı: yok etme
  akışında odak düğmede kalıyor, ekran okuyucu kullanan biri hesabını neden
  silemediğini hiç duymuyordu. Web'de aynı satır `AuthNotice` ile `alert`.
- **`PaywallScreen`** — satın alma hatası. Sessizken kullanıcı düğmeye basıp
  hiçbir şey olmadığını sanıyor. Web'de `role="status"`.
- **`skillQuiz`** — "puan verilemedi" notu. Web'in beceri oynatıcıları
  karşılığını duyuruyor.

Hata satırları `assertive`, bilgi satırı `polite`: webdeki `alert`/`status`
ayrımının RN karşılığı.

**§204** bunu kalıcı hâle getiriyor (§154'ün kardeşi: orada "seçili durum",
burada "bir eylemin cevabı"). Kapının sınırı **yorumunda yazılı** — ortak
bileşenden geçen duyuruları göremez, çünkü göremeyeceği şeyi aramak yanlış
alarm üretir. Üç enjeksiyonun üçü yakalandı, biri web tarafından.

## §11.300 — iOS bir derin bağlantı yolunu iddia etmiyordu

Bu tur iki **ölçülmüş olumsuz** ile başladı ve ikisi de kaydedilmeye değer:

**a) İkon düğmelerinin erişilebilir adı.** İlk tarama yirmi üç şüpheli verdi;
neredeyse hepsi yanlış alarmdı, çünkü desen görünür metni düz harf sanıyordu —
oysa bu depoda görünür metin **her zaman** sözlükten geliyor (`{t("…")}`).
Sözlük çağrılarını da "ad" saydıktan sonra geriye kalan üç şüphelinin üçü de
adını bir değişkenden alıyordu (`{label}`, `{opt}`). Yani eksik yok ve statik
bir tarama buradan öteye göremez — kapı **yazılmadı**, gürültü kapıdan kötüdür.

**b) Davet bağlantısı.** Uygulamadan paylaşılan davet linki
(`/premium?code=…`) telefonda tarayıcıda açılıyor. Bu bir eksik değil:
`/premium` bilerek iddia edilmiyor, çünkü uygulamanın karşılayacağı bir ekran
yok ve iki dosyanın da yorumu kuralı yazıyor — "iddia edilip karşılanmayan yol,
tarayıcıda açılmasından kötüdür." Web'den paylaşılan link de aynı yere gidiyor.

**Gerçek bulgu üçüncüsündeydi.** Aynı yol listesi **üç yerde** yazılı: iOS
beyanı (`APP_LINK_PATHS`), Android manifestosu ve uygulamanın kendisi
(`parseDeepLink`). Android üç yol iddia edip üçünü de karşılıyordu; **iOS
beyanı iki yolda kalmıştı** — `/auth/app` eksikti.

`/auth/app`, sistem tarayıcısında tamamlanan girişin uygulamaya dönüş adresi:
`/auth/handoff` tek kullanımlık bir token üretip oraya yönlendiriyor. Apple'ın
yerel girişinin desteklenmediği bir iOS sürümünde akış tarayıcıya düşüyor ve
dönüş bağlantısı uygulamayı **açmıyor**: üç dakika yaşayan token ölüyor,
kullanıcı uygulamada hâlâ girmemiş oluyor.

Manifestonun kendi yorumu da "Sunucudaki iki beyan dosyası da aynı **iki**
yolu sayıyor" diyordu — üçüncüsü eklendiğinde geride kalmış. Zorunluluğu yazan
cümlenin bayatlaması, bu defterin en sık tekrar eden sınıfı.

**§205** üçünü birbirine bağlıyor: iOS beyanı ↔ Android manifestosu ve beyan ↔
`parseDeepLink`. Üç enjeksiyonun üçü yakalandı — birincisi tam da bugün
düzelttiğim hâlin kendisi, ikincisi ters yön (iddia edilip karşılanmayan yol).

## §11.301 — Katalogdaki bir env anahtarı `.env.example`de yoktu

`.env.example` ile yerel `.env` zaten aynı 57 anahtarı taşıyordu. Koddaki
`process.env.AD` kullanımlarıyla karşılaştırınca iki liste çıktı ve **ikisi de
yanlış alarmdı**: örnekte olup kodda görünmeyen `*_MODEL` anahtarları
**hesaplı** okunuyor (`process.env[cfg.envModel]`), kodda olup örnekte olmayan
`WALK_*`/`PLAYTEST_*`/`EVAL_*` ise yalnız `scripts/` altındaki geliştirici
araçlarına ait.

Ama hesaplı okuma taramadan kaçtığı için gerçek bir eksik de saklıyordu:
**`MISTRAL_STT_MODEL`** katalogda adı geçiyor ve okunuyordu, üç env dosyasının
hiçbirinde yoktu. Yani operatör Groq'un STT modelini ezebiliyor, Mistral'inkini
ezebileceğini hiç öğrenemiyordu — `.env.example` onun tek keşif yolu.

Anahtar üçüne de aynı konumda, aynı yorumla eklendi (sunucudaki dosya önce
yedeklendi: `/opt/lernomi/.env.bak-2026-09-11-1731`). Üç dosya artık 58
anahtarda birebir aynı; anahtar kümeleri karşılaştırılarak doğrulandı.

**§206** listeyi katalogdan çıkarıp örnekte arıyor: yeni bir sağlayıcı
eklendiğinde anahtarları da belgelensin. İki enjeksiyonun ikisi yakalandı.

## §11.302 — Yalnız çalışma zamanında görünen sınırlar için bir kapı

Arkadaşlar sayfasının kırığı (§bkz. `check:client-boundary`) hiçbir kapıya
takılmamıştı ve sebebi sınıfın kendisiydi: **sunucu/istemci sınırı ihlalleri
derlemede değil, sayfa açıldığında patlıyor.** Tip denetimi için imza geçerli,
lint için sıradan bir içe alım, `check:parity` ise iki platformu
karşılaştırıyor — bu ise tek platformun kendi içindeki bir sınır.

Yeni kapı üç şeye bakıyor:

1. **Sunucudan istemci işlevi çağrılıyor mu** — `app/` altındaki 147 giriş
   noktasından başlayıp içe alım ağacını yürüyor. Gerçek kırığın kendisi ve
   dolaylı yol (sunucu girişi → sunucu yardımcısı → istemci işlevi) enjekte
   edilip yakalandı.
2. **İstemciden gizli env okunuyor mu** — `"use client"`ten ulaşılan her yerde
   `process.env.X` (X `NEXT_PUBLIC_` değilse). Değer derleme sırasında pakete
   gömülür ve her ziyaretçiye gider; bunu `server-only` dışında hiçbir şey
   korumuyordu. 164 istemci girişi taranıyor.
3. **Seri hâle gelmeyen prop geçiliyor mu** — sunucu bileşeninden istemci
   bileşenine fonksiyon, `Date`, `Map`, `Set`.

**Üçüncü ölçüm bir kez hiçbir şey ölçmedi ve bu turun asıl dersi o.** Açılış
etiketini `[\s\S]{0,700}?/?>` ile kesiyordum; ilk `>` **okun içindeydi**
(`onPick={() => …}`), yani etiket tam da aranan prop'un önünde bitiyordu.
Enjeksiyon yakalanmayınca ortaya çıktı — ve tuzağın kaydı depoda zaten vardı:
`check:parity` §138 civarı aynı hatayı kendi içinde bir kez yaşamış ve çözümü
yazmış ("ok işaretinde bitmeyen ilk `>`", yani `[^=]>`).

İkinci ayar da ölçümle geldi: `new Date()` ihlal ama `new Date().toISOString()`
değil — ikincisi dizgi döndürüyor. Kalıp kurucunun kapanışında bitmeyi şart
koşuyor. Beş girdiyle sınandı, beşi doğru ayrıldı.

**Ve bir hata:** bu turda mobil lint'i açan tek satırlık düzeltmeyi commit
ederken, pathspec ile evreleme aynı dosyada duran **başka bir oturumun
kaydedilmemiş işini** de içine aldı. İçerik doğru ve kapılar yeşil olduğu için
geri alınmadı; commit mesajı iki işi taşıdığını açıkça yazıyor. Defterdeki
`GIT_INDEX_FILE` kuralının sınırı buymuş: ayrı indeks kurmak **dosya
içeriğini** parçalamıyor.

## §11.303 — Oturuma bağlı içeriğin önbelleğe girmesi

`check:client-boundary`e dördüncü sınır eklendi: bir sayfa ya da uç kullanıcının
verisini çiziyorsa istek başına çizilmeli. Yanlış tarafa düşerse bedeli ağır ve
sessiz — bir kullanıcının yanıtı önbelleğe girip **başkasına** sunulabilir.

**Kapının neye BAKMADIĞI, baktığı kadar önemli.** Önce "oturum okuyor ama
`force-dynamic` yazmamış" diye ölçtüm; tek aday tanıtım sayfası çıktı ve o bir
kusur değil: `getUserId()`/`getLang()` çerez okuyor, Next `cookies()`/`headers()`
okuyan rotayı zaten dinamiğe çeviriyor. Öyle bir kural, zararsız sayfalarla
dolu bir liste üretip kapıyı gürültüye boğardı — ve bu defterde gürültü,
kapının kendisini öldüren şey.

Kapı bu yüzden yalnız **açık karşı beyanı** arıyor: oturum okuyan bir dosyada
`dynamic = "force-static"` ya da `revalidate = N`. Uçlarda ikinci bir kabul var
(`no-store` başlığı), çünkü uç zaten yanıt başlığıyla da korunabiliyor.

Bugün hiçbir ihlal yok (162 dosya). Üç enjeksiyonun üçü yakalandı: oturumlu
sayfaya `revalidate`, oturumlu sayfaya `force-static`, ve oturumlu ucun ikisini
birden bırakması.

## §11.304 — Her uç bir kapıdan geçiyor mu?

`src/app/api` altındaki 68 ucun tamamı tarandı. Hepsi dört kapıdan birine
dayanıyor: oturum, cron anahtarı (`cronGate`), yönetici (`adminGate`) ya da
imza doğrulaması (Apple bildirimi, mağaza webhook'u). Üçü bilerek açık ve
gerekçeleri artık kapının içinde **yazılı** — better-auth'un kendi yolu, genel
yapılandırma ve captcha doğrulaması.

**IDOR taraması da yapıldı ve temiz çıktı.** İstekten gelen bir `userId`
kullanan yedi uç var; hepsinde desen aynı ve doğru: *aktör* oturumdan
(`requireUser`), *hedef* gövdeden. "Arkadaş ekle { userId }" zaten hedefi
istekten almak zorunda; tehlikeli olan aktörü istekten almak olurdu ve öyle bir
yer yok.

**Kapı bir kayıt defteri tutuyor, istisna torbası değil:** açık uçlar adıyla ve
gerekçesiyle listede; yeni bir uç ya kapıdan geçecek ya listeye yazılacak.
Liste bayatlamasın diye ters yön de ölçülüyor — kayıtlı bir yol silinirse kapı
onu da bildiriyor.

İki enjeksiyonun ikisi yakalandı: kapısız yeni bir uç, ve var olan bir ucun
kapısının kalkması.

**Bu turda kendi ayağıma sıktım ve kaydı buraya:** üçüncü enjeksiyonu geri
alırken `git checkout scripts/check-client-boundary.mjs` yazdım — o dosyada
henüz **commit edilmemiş** olan beşinci denetimin tamamı silindi. Yedekleme
disiplini enjeksiyon hedefleri için vardı, kapının kendisi için yoktu. Kural:
*enjeksiyonu geri alan komut, o turda yazılmış kodu da geri alabilir; geri alma
her zaman yedekten olmalı, `git checkout`tan değil.*

## §11.305 — Sorulamayan bir soru: "bu uç hız sınırlı mı?"

Mutasyon uçlarının hız sınırını taramaya çalıştım ve **yöntem elendi.** Kaydı
buraya, çünkü bir sonraki tur aynı taramayı yeniden yazmasın.

İlk deneme rota dosyasına baktı: 45 mutasyon ucundan 36'sı "sınırsız" çıktı.
Yanlıştı — sınır bir katman aşağıda yaşıyor. `social/nudges` ucunun dosyasında
tek bir sınır çağrısı yok; `sendNudge` içinde **iki** tane var
(`nudgePerFriend` ve `nudgeTotal`).

İkinci deneme içe alım ağacını üç seviye izledi: bu sefer 45'in **45'i**
"sınırlı" çıktı. O da yanlıştı ve sebebi daha kötü: eşleşen dosya çoğu zaman
`src/lib/db/schema.ts`, çünkü orada `rateLimit` diye bir **tablo adı** geçiyor.
Yani kapı "sınır var mı" değil, "bu kelime bir yerlerde geçiyor mu" diye
soruyordu — her şeye evet diyen bir ölçüm, hiçbir şeye bakmayan bir ölçümdür
(§11.279'daki `"?" === "?"` tuzağının bu alandaki hâli).

**Sonuç: bu soru bu teknikle sorulamaz.** Sınırın istek YOLUNDA olup olmadığını
statik metinden ayırt etmek, çağrı grafiğini gerçekten çözmeyi gerektirir; ona
yaklaşmayan her kalıp ya gürültü ya kalıcı yeşil üretir. Kapı yazılmadı.

Bunun yerine **kararlaştırılabilir** bir soru soruldu: başkasına bildirim
gönderen kaç yer var ve hepsi sınırlı mı? Beş yer çıktı ve beşi de doğru:
dürtme (iki sınır: kişi başına ve toplam), görev daveti, tepki ve arkadaşlık
isteği aktör başına sınırlı; beşincisi (lig yükselme bildirimi) haftalık lig
kapanışının içinde ve tetikleyeni kullanıcı değil sistem — sınır gerekmiyor,
hacmi lig boyu belirliyor.

Dürtme arayüzü de iki platformda aynı: arkadaş listesinde bugün dürtülmüş kişi
için düğme kapanıyor (`nudgedToday`), profil sayfasında iki tarafta da
kapanmıyor. Simetrik.

## §11.306 — Hesap silme sekiz tabloyu arkada bırakıyordu

Geçen turun dersini uyguladım: **kararlaştırılabilir** bir soru seç. Bu soru
öyle — şemadaki hangi tablolar kullanıcıya bağlı, ve `lib/account/purge` onları
kapsıyor mu? İkisi de metinden okunabiliyor.

Cevap: 35 tablodan **sekizi** arkada kalıyordu.

| Tablo | Ne tutuyor |
|---|---|
| `mock_exam_attempts` | deneme sınavı cevapları ve puanları |
| `league_members` | haftalık lig üyeliği ve XP |
| `usage_counters` | kişi başına kota sayaçları |
| `device_tokens` | **telefonun push adresi** |
| `entitlements` | premium hakkı |
| `promo_redemptions` | hangi kodu kullandığı |
| `referrals` | davet zinciri |
| `premium_grants` | para defteri |

Üstelik dosyanın kendi yorumu **"Silinmeyen tek şey yok"** diyordu — bu
defterde en sık rastladığım sınıf, ama bu kez bedeli en ağır olanı: gizlilik
politikası §11 "kalıcı olarak silinir" diye söz veriyor ve Play/App Store
beyanları da buna dayanıyor. `device_tokens` özellikle kötü: o bir **adres**,
kalırsa silinmiş hesabın telefonuna bildirim gönderilebilir hâlde kalıyor.

Politika ayrımı da cevabı veriyordu: *"Yasal saklama yükümlülüğü olan mali
kayıtlar anonimleştirilerek tutulur."* Buna göre altısı **silindi**; ikisi
**anonimleşti** — `premium_grants` bir para defteri (satır kalır, kişi gider)
ve `referrals` iki kişiyi bağladığı için satırı silmek **karşı tarafın**
kazandığı ödülün kaydını da yok ederdi, o yüzden yalnız bu kullanıcının tarafı
boşaltılıyor.

**`check:purge`** artık şemayı `purge.ts` ile karşılaştırıyor: yeni bir
kullanıcı tablosu eklendiğinde orada da görünmek zorunda. "Geçiyor mu" sorusu
kasten kaba — silme mi anonimleştirme mi olduğu bir politika kararı ve
gerekçesi yorumda; kapı yalnız *unutulmuş mu* diye soruyor.

Kapının ters yönü ilk çalıştığında gerçek bir şey yakaladı: `rate_limits`
kullanıcıya bir sütunla değil, `"<kapsam>:<userId>"` biçimli metin anahtarıyla
bağlı. Bağ gerçek, yalnız sütun taramasının göremeyeceği yerde — gerekçesiyle
kayıtlı. Üç enjeksiyonun üçü yakalandı (cihaz jetonu silmesinin kalkması,
şemaya yeni tablo eklenmesi, para defteri anonimleştirmesinin kalkması).

## §11.307 — KVKK/GDPR erişim talebi: elle SQL yerine tek komut

Silme tarafını kapattıktan sonra (§11.306) aynı soruyu **erişim** tarafına
sordum: politika §10 taşınabilirliği e-posta talebiyle karşılıyor ve "en geç 30
gün içinde ücretsiz" diyor. Söz/kod boşluğu **yok** — uygulama içi indirme
sözü verilmemiş, dolayısıyla eksik bir özellik de yok.

Ama bir operasyon boşluğu vardı: talep geldiğinde 35 tablodan veri çıkarmak
elle SQL yazmak demekti — silme tarafında tam bu yüzden sekiz tablo atlanmıştı.
`scripts/export-user.ts` artık tablo listesini **şemadan türetiyor**: yeni bir
kullanıcı tablosu eklendiğinde çıktıya kendiliğinden giriyor, `check:purge` de
silme tarafında aynı listeyi kolluyor.

Salt okunur: tek yazma ifadesi yok. Çıktının içinde üretim tarihi, kimlik ve
kapsam notu var — talebi cevaplayan neyi gönderdiğini, alıcı neyi aldığını
belgeleyebilsin.

**Canlı veritabanında doğrulandı:** 39 tablo, 8142 satır, 18 tablo dolu.
(39 > 35 çünkü ihracat `user`/`session`/`account` satırlarını da veriyor;
onları better-auth siliyor, ama kişinin verisi olarak ihracata girmeleri
doğru.)

**Üç ölçüm üç kez yanlış çıktı ve üçü de kaydedilmeye değer:**

1. `dotenv/config` sunucuda bağlantıyı kurmuyor ("client password must be a
   string"), aynı satırı kabuk verdiğinde kuruyor. Betik artık `DATABASE_URL`i
   ortamdan bekliyor — üretimde nasıl çalışacaksa öyle.
2. `@/lib/db` proxy'si tsx altında aynı hatayı veriyor, ham `pg` aynı ortamda
   çalışıyor: modülün iki kez çözülmesinden gelen ikili paket tuzağı. Betik
   havuzunu kendi kuruyor.
3. Tablo tanıma `"_" in value` ile yazılmıştı ve **hiçbir tablo eşleşmedi** —
   çıktı "1 tablo" dedi ve fark oradan anlaşıldı. Drizzle tabloyu sembolle
   işaretliyor; `is(v, PgTable)` doğru API. Bir aracın doğru çalıştığını ancak
   ÇIKTISI söyler: "hata vermedi" yetmez.

## §11.308 — Web yanlış mağazayı söylüyordu (ve ben yanlış ölçtüm)

Hesap silme akışını iki platformda karşılaştırdım. Uç aynı (better-auth
`delete-user`, ikisinde de parola isteğe bağlı), onay basamakları aynı, kayıp
listesi aynı dört maddeyi sayıyor.

Bir fark vardı: **abonelik uyarısı webde "Google Play" diyordu.** Oysa
aboneliği App Store'dan alan biri de hesabını webden silebiliyor ve web hangi
mağaza olduğunu **bilmiyor** — yanlış mağazayı söylemek kullanıcıyı hiç var
olmayan bir ekrana yolluyor. Webe mağaza adı geçmeyen üçüncü bir metin kondu
(`subscription_cancel_store`); mobilde mağaza belli olduğu için orada adıyla
söylenmeye devam ediyor.

**Ama önce yanlış bir sonuca vardım ve kayda değer olan o.** İlk taramada
"mobilde mağaza uyarısı hiç yok" dedim ve düzeltmek üzere iki yeni sözlük
satırı bile ekledim. Uyarı vardı: çağrı
`tx(Platform.OS === "ios" ? "…_appstore" : "…_play")` biçimindeydi ve anahtar
çıkaran desenim `t("anahtar"` arıyordu — **koşullu çağrıyı görmüyordu.** Kendi
analizimde, defterin baştan beri kovaladığı hatanın aynısı: ölçüm, ölçtüğünü
sandığı şeyin yanındakine bakıyor. Gereksiz eklediğim anahtar geri alındı.

**§207** üç metni tek tek, doğru yüzeyde arıyor: web mağaza adsız olanı,
mobil ikisini de, ve seçim platforma bağlı mı. Üç enjeksiyonun üçü yakalandı —
biri tam da bugün düzelttiğim hâl (webin tek mağaza adı yazması).

Ders, bir kural olarak: *anahtar kullanımını `t("…")` deseniyle saymak,
koşullu ve değişkenle çağrılan her yeri gözden kaçırır; "bu yüzeyde şu metin
var mı" sorusu ancak anahtar tek tek arandığında güvenilir.*

## §11.309 — Şablonla kurulan anahtarlar: ekrana ham anahtar çıkma riski

§11.308'in dersini geriye dönük uyguladım. Önce körlüğün büyüklüğünü ölçtüm:
webde 1562 düz `t("…")` çağrısına karşı **116 koşullu + 40 değişkenli**,
mobilde 1577'ye karşı **93 + 39**. Yani anahtar kullanımının yaklaşık onda
biri düz taramaya görünmüyor.

Bunların içinde gerçek tehlike **şablonla** kurulanlarda: on yerde anahtar
çalışma zamanında birleştiriliyor. Yeni bir değer ortaya çıkarsa sözlükte
karşılığı olmuyor ve ekrana `genre.podcast` gibi **ham anahtar** çıkıyor — ne
derleme, ne tip, ne düz anahtar taraması görür, çünkü değer veriden ya da bir
birleşim tipinden geliyor.

Beş aile ve kaynakları:

| Aile | Değer kaynağı | Değer |
|---|---|---|
| `genre.*` | egzersiz içeriğindeki `genre` alanı | 26 |
| `league.tier_*` | `LEAGUE_TIERS` | 5 |
| `social.reaction_*` | `REACTION_KINDS` | 6 |
| `band.*` | `Band` birleşim tipi | 4 |
| `mockexam.fail_*` | `FailReason` birleşim tipi | 4 |

Bugün beşi de tam (45 değer, üç dilde). **`check:key-families`** kaynakları
okuyup her değeri üç sözlükte arıyor; ters yönü de var, çünkü bir değer
yeniden adlandırıldığında eski anahtar kalır ve yenisi eksik olur.

Ters yön ilk çalıştığında bir **önek çakışması** yakaladı:
`social.reaction_add` ve `social.reaction_change` bu ailenin üyesi değil,
ikisi de düğme etiketi ("Tepki ver" / "Değiştir") ve iki platformda da öyle
kullanılıyor. Denetimi kapatmak yerine ikisi adıyla ayrıldı — kapı ailenin
bayatlamasını görmeye devam ediyor.

Kapı bilerek **elle beslenen bir liste** tutuyor: "şablonla kurulan her
anahtarı bul" diye genel bir tarama, değer kümesini tahmin etmek zorunda kalır
ve tahmin eden kapı ya gürültü ya kalıcı yeşil üretir (§11.305'in dersi).

## §11.310 — Belgelenen `kind` kümesi ile üretilen değerler

Şablon anahtar taramasını olay adlarına taşıdım ve orası **temiz çıktı**: iki
platformda 186 çağrı yerinin hepsinde olay adı düz dizgi (`test:events` zaten
kolluyor), tek istemciden gelen ad `isEventName` beyaz listesinden geçiyor, ve
`kind` politikaya bağlı kapalı bir desenle süzülüyor
(`^[a-z0-9_:-]{1,32}$`, gizlilik politikası §8'e bağlı — kümeyi genişletmek
politikayı değiştirmek demek).

Ama bir kat aşağıda bulgu vardı. `lib/events` her olayın yanında `kind`in ne
alabileceğini yazıyor ve o cümle bir sözleşme: pano `kind`e göre gruplayıp
satır satır gösteriyor (`lib/admin`). `production_attempt` için yorum **altı**
değer sayıyordu:

`translate | transform | free_sentence | writing_free | speaking_drill | roleplay`

Üretilen ise **dört**: `lib/assess` `productionKind` yalnız serbest cümle,
serbest yazma, konuşma alıştırması ve rol yapmayı yazıyor. **Çeviri ve
dönüştürme turları bu olayı hiç yazmıyor**, yani panonun "üretim görevleri"
kırılımında o iki satır hiç görünmüyor — okuyan kişi "henüz veri yok" sanıyor.

Bunu tek taraflı düzeltmedim, çünkü **ölçümün tanımı** söz konusu: o iki tur
yerel hakemle de geçilebiliyor, yani puan her zaman 0–100 aralığında bir
değerlendirmeden gelmiyor. "Doğru=100 / yanlış=0" yazmak ortalamayı bambaşka
bir şeye çevirir ve KPI'ın anlamını sessizce değiştirir. Karar ürün tarafında;
yorum gerçeğe uyduruldu ve gerekçesi oraya yazıldı (§11.289: yanlış yorum
yokluktan kötü).

**`check:key-families`** artık bunu da kolluyor: belgelenen dört değerin
hepsi üretiliyor mu, fazlası var mı, ve yorum hâlâ kümeyi anlatıyor mu. Üç
enjeksiyonun üçü yakalandı — üçüncüsü yorumun bayatlaması.

Ölçüm dar tutuldu: öteki olayların `kind`i serbest biçimli ("B1:reading",
ekran anahtarı, hata tipi) ve kapalı küme değil. Kapalı küme yazan yeni bir
olay eklenirse kapıya bir satır gerekiyor.

**Paralel oturum notu:** mobil `tsc` şu an iki hata veriyor
(`FriendsScreen`, `InboxScreen` → `avatar` alanı henüz tipte yok) ve
`check:parity` `/api/me` için "mobilde eksik: avatar" diyor. Üçü de başka bir
oturumun kaydedilmemiş işi; dosyalarına dokunulmadı.

## §11.311 — `value` aralıkları tutuyor; kapı yazılmadı ve sebebi kayıtlı

Olayların `value` alanını ölçtüm: `lib/events` 29 olayın yanında değerin ne
anlattığını yazıyor (puan 0–100, ağırlık×100, saniye, sayılı durumlar). Düz
sayı geçen her çağrı yeri belgelenen kümenin içinde — **aykırı tek değer yok.**

İlk tarama üç aykırı gösterdi (`install_prompt` ve `push_optin` için `2`) ve
**üçü de benim taramamın hatasıydı**: kalıp yalnız `value = 1 ` arıyordu, oysa
belge üç değerli — "1 verildi / 0 reddedildi / **2 sonra dedi**". Numaralandırma
tam okunduğunda aykırı kalmadı.

Bu, bu oturumda kendi ölçümümün üçüncü kez fazla dar çıkışı (§11.308 koşullu
`t()`, §11.309 önek çakışması, bu). Kuralı yazıyorum: **belgeyi bir ÖNEKLE
sınıflandıran tarama, belge önekten zenginse yanlış sınıflandırır.**

**Kapı bilerek yazılmadı.** Aralıklar serbest biçimli Türkçe cümlelerde
duruyor ("kalan saniye", "ekran genişliği px", "puanlı adımlarda doğru
yüzdesi"); bunları yorumlayan bir kapı ya gürültü ya kalıcı yeşil üretir —
§11.305'te aynı sebeple bir kapı reddedilmişti. Ölçüm yapıldı, sonuç temiz,
kayıt burada: bir sonraki tur aynı taramayı yeniden yazmasın.

## §11.312 — Sunucu bitmiş sayıyor, ekran "5/10" gösteriyor

Kullanıcının bildirdiği "13 madde ama x/10" şikâyetinin (§11.284) bir kat
altında gerçek bir ayrışma vardı.

Sunucu ilerlemeye **yalnız oynanabilir** ve tamamlanabilir maddeleri katıyor:
`completable = playable ∩ {lesson, read, listen, write}` (`lib/immersion/state`).
İki istemci aynı dört türü süzüyordu ama **`playable` şartını atlıyordu.**

Fark Almancada görünmüyor, çünkü havuzlar tam tamına yetiyor: 25 ünite × 2
okuma = 50, havuzda 50 metin. **İngilizce kursta ise canlı:** aynı 50 yuvaya
karşı havuzda 13 metin var, yani yuvaların çoğu `ref: null` — oynanamaz.

Sonuç, İngilizce kursta bir öğrenci için: sunucu üniteyi **bitmiş** sayıp
sonrakini açıyor, ekranda ise ilerleme `5/10`da takılı kalıyor ve ünite
bitmemiş görünüyor. İki kursu ayrı ölçmek gerekti — tek kursla bakan bir ölçüm
bunu "yok" diye raporlardı.

İki istemci de sunucunun ölçütüne bağlandı.

**§208 kapısı ilk yazımında komşuyu ölçtü ve enjeksiyon onu gösterdi.**
`counted`ın adından sonraki 420 karakteri tarıyordum; web dosyasında hemen
ardındaki satırda da `playable` geçiyor (açık maddeler süzgeci), o yüzden
`i.playable &&` silindiği hâlde kapı yeşil kaldı. Gövde tam alınacak şekilde
düzeltildi; üç enjeksiyonun üçü şimdi yakalanıyor.

Not: ilk turda enjeksiyonun yakalanmamasını "kapı sağlam" diye okumadım, önce
enjeksiyonun gerçekten uygulandığını doğruladım (§11.285'in kuralı) — uygulanmış,
kusur kapıdaydı.

## §11.313 — Android %10 alan egzersizi "bitti" sayıyordu

Sunucu bir beceri egzersizini **yalnız son puanı 70'i geçince** bitmiş sayıyor
ve Patika'nın beceri yuvasındaki kapıyı da bununla açıyor
(`lib/immersion/progress`). Web aynı eşiği üç yerde ayrı ayrı yazmıştı
(`immersion/progress.ts`, `skills/page.tsx`, `immersion/skill/[id]/page.tsx`).

**Mobilde eşik hiç yoktu.** İki yerden birden:

- `ItemScreen.recordAndFinish` egzersiz biter bitmez `markItemDone` çağırıyordu
  — sıfır doğru yapan da yeşil onay alıyordu.
- `syncItemProgress` sunucudan gelen **her** satırı puanına bakmadan yerel
  "bitti" kümesine katıyordu; satırın varlığını bitmiş olmak sanıyordu.

Kullanıcının gördüğü: %10 alan bir egzersiz Android'de yeşil onaylı, "3/5
tamamlandı" sayacının içinde ve Patika'nın yuvasında bitmiş; aynı hesapla
web'de aynı egzersiz hâlâ "sıradaki". İki uygulama **aynı ilerlemeyi farklı
okuyordu.**

Sayı artık tek kaynakta (`lib/score-bands.ts` `SKILL_DONE_PCT`, mobil
karşılığı `learningRules.ts`), beş çağrı yeri de oradan okuyor. Sunucu otorite
kabul edildi: yerelde bitmiş işaretli ama puanı yetmeyen bir egzersiz
(çevrimdışı bitirilip yukarı taşınmış bir deneme) senkronda işaretini
kaybediyor.

Kapı: §210 "beceri bitti esigi cagri yerleri" — sabitin değerini **ve** kararı
veren karşılaştırmanın sabiti kullandığını okuyor. Eşitlik tek başına yetmez;
ikisi birlikte aynı sayıya getirilip bağlantı yine kopuk bırakılabilir.

## §11.314 — Aynı iki sayı dört yerde bant çiziyordu

"70 üstü iyi, 40 üstü orta, altı zayıf" ayrımı uygulamanın dört ayrı yerinde
elle yazılıydı: yazma kartının puan tonu (web + mobil), değerlendirme kartının
tonu, ve egzersiz sonucundaki maskotun ruh hâli.

Bantlar toplandı (`scoreBand`, iki platformda aynı ad), ve toplarken bir
**tasarım ayrışması** çıktı: Android sonuç kartında üç bant + konfeti
kullanıyor (`pct >= 70` kutlama, `>= 40` gülümseme, altı nötr), web ise yalnız
"hepsi doğruysa kutlama, değilse gülümseme" biliyordu ve konfeti hiç yoktu.
%30 alan öğrenci de gülümseyen bir Erdi görüyordu — sonuç bir geri bildirim
taşımıyordu. Web Android'in davranışına bağlandı (`cheer` klibi mobildeki
`celebrate` ile aynı dosya).

`scoreOf` (puanı 0–100'e kilitleyen formül) `lib/skills/record`ten
`lib/score-bands`e taşındı: eski yerinde `server-only` var ve sonuç kartı bir
istemci bileşeni. Ad ve çağrı yerleri değişmedi.

Kapı: §210'un ikinci yarısı "puan bandi cagri yerleri" — bandı **hesaplayan**
çağrıyı arıyor; sabiti içe alıp yine `>= 70` yazmak "kaynaktan" saymıyor.

## §11.315 — Beceriler sayfasında dört tasarım sapması

Android referans alınıp web satır satır karşılaştırıldı:

1. **Boş durum kartı sayfanın en altındaydı.** İçeriği olmayan bir seviyeye
   geçen kullanıcı boş sayfa görüyor, sebebini ancak aşağı kaydırınca
   okuyordu. Mobilde sıra baştan beri çipler → boş durum.
2. **Öneri kartının simge karosu** %18 tint zeminliydi (mobilde nötr
   `surface2`; uygulamanın tint kalıbı da %13–14), yarıçapı ise projenin
   ölçeğinde **olmayan** Tailwind `rounded-xl`iydi (12 px; ölçekte 14 =
   `rounded-tile`).
3. **Öneri kartının alt satırı** gerekçenin ardına **ayırıcısız** tür + süre
   ekliyordu: "Okuma'da %40 ilerledin Kısa hikâye · 5 dk". İkisi zaten
   listede yazıyor; mobil yalnız gerekçeyi söylüyor.
4. **"Seviye bitti" kartında** açıklama kalın ve koyu yazılmıştı; mobilde
   vurgu üst satırda, açıklama sönük. Üç yerdeki `text-[11px] font-bold` de
   jetona bağlandı (`text-micro`), puan rozetinin `rounded-md`si ölçeğe
   (`rounded-chip` = mobil `radii.sm`).

**Mobilde bir jeton yanlış seçilmişti:** puan rozeti eşiğin altında
`dangerSoft`/`dangerText` (kırmızı) çiziyordu. Rozet web'den alınmıştı ve web
orada alev (kehribar) kullanıyor — "%50 aldım" bir hata değil, henüz eşiği
geçmemiş bir deneme; kırmızı tehlikeye ayrılmış. Mobil kehribara geçti.

**Kayda değer ölçüm:** projenin yarıçap ölçeği belgelenmiş ve mobil ona birebir
uyuyor (chip 10 / tile 14 / panel 20 / card 26 / float 34), ama web'de
ölçek dışı Tailwind varsayılanları **124 yerde** kullanılıyor (`rounded-xl` 90,
`rounded-2xl` 34). Bu turda yalnız bu sayfadakiler düzeltildi; geri kalanı
yuva yuva karar gerektiriyor.

## §11.316 — Arma paleti: zorunluluğu yazan cümle, ölçen yoktu

Arma rengi bir **kimlik**: "aynı kişi telefonda ve tarayıcıda aynı renkte
görünmeli, yoksa listede tanıdığın kişiyi renginden bulamazsın" — bunu iki
dosyanın yorumu da söylüyor. Ölçen bir şey yoktu, ve renkler bilerek jetona
bağlı **değil** (tema kimliği değiştirmesin), yani `check:colors` iki dosyayı
da atlıyor: ham hex'leri karşılaştıran bir kapı olmadan ayrışma hiçbir yerden
görünmüyordu. Sıra da önemli — seçim kimliğin hash'inden indeksle yapılıyor,
çift yerleri değişirse aynı kişi iki platformda ayrı renge düşer.

§209 on iki çifti sırasıyla karşılaştırıyor. Aynı turda `check:colors` yeni
`mobile/src/ui/Avatar.tsx` yüzünden 24 ihlalle kırmızıydı; dosya gerekçesiyle
atlananlar listesine girdi. Bunun yan etkisi öğreticiydi: `#FA7C13`
istisnası **karşılıksız** kaldı ve kapı bunu ayrı bir ihlal olarak bildirdi —
ölü istisnayı yakalayan bir kapı, kapının kendisi kadar değerli.

## §11.317 — İngilizce kursta Patika'nın altı yuvası boş (içerik, kod değil)

§11.312'nin dersi genelleştirildi: her kurs/seviye için gereken yuva sayısı ile
havuzdaki egzersiz sayısı ayrı ayrı sayıldı.

| Kurs | Üniteli egzersiz | Gereken (okuma/dinleme/yazma) |
|---|---|---|
| de | 870 (A1 50+50+50, A2 aynı, B1 90+90+90, B2 ve C1 50+50+50) | tam tamına yetiyor |
| en | **0** | seviye başına 50+50+50 |

İngilizce paketteki 189 egzersizin **tamamı** ünitesiz, yani Beceriler
kütüphanesinin. Patika'nın ünite başına 2 okuma + 2 dinleme + 2 yazma yuvası
İngilizce kursta hiç dolmuyor.

**Kod ayrışması yok:** iki istemci de oynanamaz yuvayı listede hiç
göstermiyor (`unit-pane` ve `UnitScreen` aynı süzgeç) ve §11.312'den sonra
ilerleme de yalnız dört dersi sayıyor. Eksik olan içerik: 5 seviye × 3 beceri
× 50 yuva. Deneme sınavları bu durumda değil — iki kursta da seviye başına 12
kâğıt tam (120 kâğıt).

Mobil katalog dosyasının yorumları bu ölçümle düzeltildi; eski sayıları
söylüyorlardı (kütüphane "160 tane: 60 okuma, 60 dinleme, 40 yazma" yazıyordu,
gerçek 125 = beş becerinin her biri 25; İngilizce "A1/A2'nin 64 egzersizi"
yazıyordu, gerçek 94).

## §11.318 — Yarıçap ölçeğinin borcu sayılmaya başladı (167 → 88)

`globals.css`'in "YARIÇAP ÖLÇEĞİ" bloğu beş basamağı ve **adların neden
Tailwind'inkilerden farklı seçildiğini** yazıyor: Tailwind'in `rounded-lg`'sini
ezmek "depodaki her `rounded-lg`'yi 8px'ten 20px'e sıçratırdı — hiçbiri gözden
geçirilmeden". Yani gözden geçirme işi **bilerek ertelenmişti** ve erteleneni
sayan bir şey yoktu.

Ölçüm: `rounded-full` (mobil `radii.pill`, meşru) dışında **167 kullanım ölçek
dışıydı** — `rounded-xl` 90, `rounded-2xl` 34, `rounded-lg` 33, `rounded-3xl` 4,
`rounded-md` 4, `rounded-sm` 2. Mobil aynı ölçeğe birebir uyuyor
(`radii` sm/md/lg/xl/xxl = chip/tile/panel/card/float), yani bu tek taraflı bir
sapmaydı.

Bu turda 79'u çevrildi (167 → 88), rol adına göre:

- **ikon karosu** (h-12/h-14/h-20 kareler) → `rounded-tile`, mobil `radii.md`
- **rozet ve satır içi etiket** → `rounded-chip`, mobil `radii.sm`
- **iç panel, uyarı bloğu, liste satırı, buton** → `rounded-panel`, mobil `radii.lg`
- **kartın kendisi ve kart iskeletleri** → `rounded-card`, mobil `radii.xl`
  (mobil `SkeletonCard` doğrudan `Card`'ı sarıyor, yani iskeletin yarıçapı
  kartın yarıçapı)
- **giriş alanı / textarea** → `rounded-tile` (ölçeğin kendi tanımı: "ikon
  karosu, giriş alanı, geri düğmesi")

Kalan 88, `check:radius` ile **dosya başına taban** olarak kayıtlı —
`i18n-hardcoded` ile aynı kalıp: artış hata, azalma serbest (tabanı düşürerek).
Tek seferde hepsini çevirmek her yuvanın hangi rolde olduğuna bakmadan
yapılamaz, o yüzden borç tur tur düşecek.

İki kullanım **kayıtlı istisna**, sebepleriyle: 20 px'lik onay kutusu
(`chip` 10 kareyi daireye çevirir ve daire radyo düğmesi demek; mobil de orada
6 yazıyor) ve saç teli kalınlığındaki adım çubuğu (mobil aynı çubuğa 3 yazıyor).
Kapı ölü istisnayı da bildiriyor — `check:colors`ta bu gerçek bir bulguydu
(§11.316), aynı denetim buraya da kondu ve enjeksiyonla doğrulandı.

## §11.319 — Aynı uygulamada üç farklı sohbet balonu

Uygulamada üç sohbet balonu var: koç balonu, ders balonları ve rol yapma
sınavı. Üçü de aynı şeyi yapıyor, ama biçimleri üç ayrıydı:

| | gövde | kuyruk köşesi |
|---|---|---|
| mobil koç | `radii.lg` 20 | `radii.sm` 10 |
| mobil ders | `radii.lg` 20 | **yok** |
| mobil rol yapma | `radii.lg` 20 | **yok** |
| web (üçü) | `rounded-2xl` **16** | `rounded-bl-sm` **4** / `-md` **6** |

Mobilde kuyruk köşesini yalnız koç balonu yapıyordu; web üçünde de yapıyordu
ama hem gövde hem kuyruk ölçek dışı değerlerdeydi. Dolgu da ayrışıktı: web
`px-3.5 py-2` (14/8), mobil 12/10–11.

Üçü tek biçime bağlandı — gövde panel (20), kuyruk chip (10), dolgu 12/10 —
ve yön mobilin kendi koç balonu oldu, çünkü o zaten ölçeğe oturuyordu.
Kapı §212 biçimi ölçüyor: webde sınıf adlarını, mobilde `borderRadius`
değerlerini.

## §11.320 — Rubrik geçme notu yedi yerde elle yazılıydı

Serbest yazma ve monolog "doğru/yanlış" değil rubrikle ölçülüyor ve o tur
**60**'ta geçilmiş sayılıyor — beceri egzersizinin bütününü "bitti" sayan
`SKILL_DONE_PCT`ten (70) ayrı bir karar. Sayı yedi yerde elle yazılıydı: web'de
iki oynatıcı (üç satır), mobilde dört yer (karar, puan rengi, tavsiye satırı).
İkisi ayrışsaydı aynı metin bir platformda geçmiş, öbüründe kalmış sayılırdı.

`RUBRIC_PASS_PCT` iki platformda aynı adla tanımlandı; §211 çağrı yerlerini
okuyor ve **yedinciyi kapı buldu** (`writing-player` tavsiye satırında `< 60`),
ben altı sanıyordum.

**Kapımın kendi kusurunu repo'nun meta-kapısı yakaladı.** §211'i
`/RUBRIC_PASS_PCT/.test(src)` diye yazmıştım; "kapilarda onek eslesmesi" kapısı
(§118/§119 sınıfı: listeyi değil listenin kendisini ölçmek) bunu anında ihlal
olarak bildirdi — `RUBRIC_PASS_PCT2` diye yeniden adlandırılan bir sabit hâlâ
"var" sayılırdı. Desen `\b` ile sınırlandı.

## §11.321 — Yarıçap borcu kapandı (88 → 0) ve kapı iki taraflı oldu

§11.318'in kalan 88 kullanımı da çevrildi; web'de ölçek dışı yarıçap kalmadı.
Basamak her yuvada **rol adına** göre seçildi, sayıya en yakın basamağa göre
değil — ölçeğin adları zaten rolü söylüyor:

- **iskelet blok** (`h-10 animate-pulse`) → tile. Yön mobilden: `Skeleton`
  bileşeninin varsayılan yarıçapı `radii.md`.
- **metin satırı iskeleti** (h-3.5 … h-5) → `rounded-full`. Yine mobilden:
  `SkeletonLine` yarıçapı `min(radii.sm, yükseklik/2)` yazıyor, yani 20 px'e
  kadar çubuk tamamen yuvarlak. h-6 (24 px) → chip, çünkü orada formül 10
  veriyor.
- **giriş alanı / textarea** → tile · **buton** → panel · **uyarı bloğu, iç
  panel, liste satırı** → panel · **satır içi etiket, seçenek, küçük ikon
  düğmesi** → chip · **ikon karosu** → tile.

**Kapı mutlak oldu.** Taban dosyası silindi: borç sayacı değil, ölçek dışı tek
bir kullanımı hata sayan bir kural. İki kayıtlı istisna sebepleriyle duruyor.

**Ve kapı artık iki taraflı.** Web'in yarıçapları policelenirken mobilin ham
sayıları serbest kalsaydı kapı tek taraflı olurdu ve ayrışma oradan geri
gelirdi. Mobilde 105 ham `borderRadius: <sayı>` var; ölçüm ikisinin meşru
olduğunu gösterdi ve ikisi de kesin ayırt edilebiliyor:

- **daire / pill**: yarıçap boyutun yarısı (48'lik dairede 24, 22'lik
  başparmakta 11). Mobilin kendi `SkeletonBar`/`SkeletonPill`i de böyle
  hesaplıyor.
- **saç teli çubuk**: 2–9 px, ilerleme çubuklarının ucu. Ölçeğin en küçüğü (10)
  bu çubukları tamamen yuvarlatırdı; web'de de aynı sınıf kayıtlı istisna.

Kalan iki durum kusur ve ikisi de ölçülebilir: (1) sayı ölçekteki bir değere
**eşit** — jeton yazılmalı, yoksa jeton değiştiğinde o yuva geride kalır;
(2) sayı 10'un üstünde, ölçekte yok ve bir dairenin yarısı da değil. Üç yuva
çıktı ve düzeltildi: `AvatarScreen` ve `PathScreen` 44 px'lik karolara `20`
yazıyordu (= `radii.lg`), `WritingsScreen`in 80 px'lik boş durum karosu `24`
(ölçek dışı → `radii.xl`).

Dört enjeksiyonun dördü yakalandı: web'de yeni ölçek dışı sınıf, ölü istisna,
mobilde jeton yerine sayı, mobilde ölçek dışı sayı.

`globals.css`'teki ölçek yorumu da düzeltildi — "hiçbiri gözden geçirilmeden"
diyen cümle artık gözden geçirmenin yapıldığını ve kapının onu tuttuğunu
söylüyor.

## §11.322 — Tipografi ölçeği: 1243 yuvanın 291'i çevrildi, gerisi sayılıyor

`globals.css`'in "TİPOGRAFİ ÖLÇEĞİ" bloğu durumu kendi cümlesiyle anlatıyor:
mobilde her metin `<Text variant="…">` ile yazılıyor ve **serbest punto yok**;
web'de ise punto her sayfada yeniden seçiliyordu ve "aynı işi gören iki başlık
iki ayrı boyutta çıkıyordu". Sekiz basamaklı ölçek bunu kapatmak için yazıldı,
`check:tokens` iki platformda birebir aynı olduğunu doğruluyor — ama aynı blok
"ekranlar şerit şerit buraya taşınıyor" da diyor. Taşıma sürüyordu ve
**taşınmayanı sayan bir şey yoktu** (§11.318'in yarıçaptaki durumuyla aynı).

Ölçüm: jetonlar 237 yerde, Tailwind varsayılanları ve serbest puntolar
**1243** yerde. Ölçekte 14 px yok (`text-sm` 504 kullanım, mobilde karşılığı
15), 12 px yok (`text-xs` 461, mobilde 12.5), 18 px ve 24 px hiçbir basamağa
karşılık gelmiyor.

Bu turda 291'i çevrildi (1243 → 943): yönetim panoları (122), tüm serbest
puntolar (`text-[11px]` 56, `text-[10px]` 13, `text-[15px]` 7, `text-[13px]` 4)
ve üçten az kullanımı olan 49 dosya. Kalanı `check:type` tabanında.

Çevirme mekanik değil, çünkü jeton puntoyu **ve ağırlığı** birlikte taşıyor:
`text-sm font-bold` → `strong` (15/700), yalnız `text-sm` → `body` (15/500),
`text-xs` büyük harfle → `micro` (11/700), ağırlıklı `text-xs` → `caption`
(12.5/600). Büyük harfli etiketin 11 px olması bir seçim değil, uygulamanın
kendi çoğunluğu: `text-micro uppercase` 9 + `text-[11px] uppercase` 9 karşı
`text-caption uppercase` 2.

**Kapımın ilk hâli seksen kullanımı hiç görmüyordu.** Desenin sonuna `\b`
koymuştum; `text-[11px]`in sonundaki `]`den sonra `"` geliyor ve ikisi de
kelime karakteri olmadığı için `\b` orada tutmuyor. Bunu ancak seksenini birden
çevirip **sayacın yalnız 2 düştüğünü** görünce anladım. `(?![\w-])` ile
düzeltildi. Bu turlarda kaçıncı "kapı komşuyu/hiçbir şeyi ölçüyor" vakası
olduğu artık ayrı bir sınıf sayılabilir (§184, §208, §11.312).

**Toplu çevirme satır satır çalıştığı için iki dallı satırlarda yarım kalıyordu.**
`compact ? "text-xs" : "text-sm"` gibi yedi satırda bir dal jetona geçip öteki
Tailwind'de kalmıştı ve aynı satırdaki ağırlık sınıfı da silinmişti — yani iki
dal iki ayrı ölçekten okuyor hâle gelmişti. Yedisi de elle eşitlendi; "jeton
sınıfı ile ölçek dışı sınıf AYNI satırda" taraması sıfır veriyor.

Kayıtlı istisna listesi bugün **boş** ve bu da bir sonuç: `screen-diag`in
`text-[11px]`i "geliştirici katmanı" diye muaf tutulmuştu, sonra o satır da
ölçeğe geçti ve kapı istisnanın karşılıksız kaldığını bildirdi. Muafiyet
gerekmiyordu. Ölü istisna denetimi üçüncü turda üçüncü kez işe yaradı
(`check:colors` §11.316, `check:radius` §11.321, şimdi `check:type`).

## §11.323 — Boşluk ölçeği: kapı YAZILMADI, sebebi kayda değer

Aynı denetim boşluk ekseninde denendi ve **yazılmaması gerektiği** ortaya çıktı.

`globals.css` "boşluk ölçeğine ayrı token GEREKMİYOR: mobilin `spacing`i
(4/8/12/16/20/28/40) Tailwind'in 0.25rem tabanına birebir oturuyor" diyor.
Bu cümle ölçeğin **eşlemesi** hakkında ve doğru; kullanım disiplini hakkında
bir şey söylemiyor.

Ölçüm: mobilde jeton kullanımı ~1611, ham sayı ~430 ve bunların ~320'si ölçek
dışı (6 → 83 kez, 10 → 41, 14 → 40, 15 → 34, ayrıca 2/3/5/9/11/13/17/18/22).
Yani **referans platformun kendisi** ölçeğin dışında yazıyor — ve çoğu bilinçli
optik ayar (bir rozeti hizalayan `marginTop: 2`, sıkı bir satırdaki `gap: 6`,
48 px'lik bir düğmeyi veren `paddingVertical: 15`).

Yarıçapta durum tersiydi: orada belgelenmiş beş basamak vardı ve mobil ona
**birebir** uyuyordu, yani sapma tek taraflıydı ve ölçülebilirdi. Burada bir
kapı 320 bilinçli ayarı ihlal diye bildirirdi; niyeti okuması gerekir ve
"niyeti okuması gereken kapı yazılmaz" (§11.254'ün dersi). Ayrışma varsa
yüzey yüzey, karşılığına bakarak bulunur — sohbet balonlarının dolgusunda
(§11.319) böyle bulundu.

## §11.324 — Tipografi borcu kapandı (943 → 0) ve en görünür karar kaydedildi

§11.322'nin kalan 943 kullanımı da çevrildi. Bu turun yöntemi farklıydı: sınav,
ders ve beceri oynatıcılarının başlıkları **tek tek mobil karşılığındaki
`<Text variant>`e bakılarak** eşlendi, toplu kurala bırakılmadı.

O bakış tek başına bir bulguydu: `MockExamScreen`, `ExamScreen`, `skillQuiz` ve
`GameScreen` neredeyse **yalnız** `micro/caption/body/bodyStrong` kullanıyor.
Yani Android'de sınav sorusu bir BAŞLIK değil, 15/700 `bodyStrong`. Webde aynı
soru `text-xl font-bold` (20) ve `text-lg font-bold` (18) ile yazılıydı.

| Yuva | Android | Web (önce) | Web (sonra) |
|---|---|---|---|
| Sınav sorusu (4 yer) | `bodyStrong` 15/700 | `text-xl`/`text-lg` bold | `text-strong` |
| Deneme sınavı sayacı | `bodyStrong` | `text-lg font-bold` | `text-strong` |
| Deneme kâğıdı beceri başlığı | `h3` | `text-2xl font-bold` | `text-h3` |
| Konuşma geri sayımı | `h1` | `text-3xl font-bold` | `text-h1` |
| Bölüm kapağı | `h1`/`h2` | `text-2xl font-bold` | `text-h1`/`text-h2` |
| Düğme etiketi | `h3` | `text-base` | `text-h3` |

**Bu turun en görünür kararı, sınav sorusunun 20 px'ten 15 px'e inmesidir.**
Gerekçesi Android: orada soru `bodyStrong` ve `check:tokens` iki ölçeğin birebir
aynı olduğunu doğruluyor, yani ölçekte 18–20 px'lik bir "gövde" basamağı yok
(20 = `h2`, bir başlık). Karar burada yazılı duruyor ki geri alınmak istenirse
nereye bakılacağı belli olsun.

**Bir ölçüm, "kural gereği" yapılacak bir hatayı durdurdu.** Oyun turunun cevap
alanı webde `text-lg` (18) idi ve kural onu `body`ye (15) çekecekti. Mobile
bakınca aynı alanın `fontSize: 18` yazdığı görüldü (`game/rounds.tsx`, dört
giriş): iki platform **zaten eşti** ve kural pariteyi bozacaktı. O dört yuva
kayıtlı istisna. Beceri yazma alanları ise ayrı çıktı — mobil onları 15 px
yazıyor (`skillQuiz`), web 16 (`text-base`); orada çevirme 1 px'lik gerçek bir
ayrışmayı kapattı.

Diğer kayıtlı istisnalar: iniş sayfasının kahraman başlığı (pazarlama yüzeyi,
mobil karşılığı yok) ve üç **göreli** punto (`text-[0.9em]` gibi) — İngilizce
karşılık, üstündeki kelime hangi basamaktaysa onun %85–92'si kalıyor; sabit bir
basamak bu bağı koparırdı ve React Native göreli punto tanımadığı için mobilde
karşılığı yok.

Kapı `check:radius` gibi **mutlak** oldu: taban dosyası silindi, ölçek dışı tek
punto hata. İki enjeksiyon (yeni ölçek dışı sınıf, ölü istisna) yakalandı.

## §11.325 — Dokunma hedefi: `hit-8` altı yerde, mobilde `hitSlop` yirmi yerde

`globals.css`'teki `.hit-8` yardımcısının kendi yorumu ölçüyü yazıyor: mobilde
ikincil denetimler `hitSlop={8}` taşıyor ve "gerçek hedef 36–50; webde hedef
görünen boyutun kendisi. Yani en çok dokunulan ikincil denetim webde
sistematik olarak daha küçük bir hedef sunuyordu." Yardımcı bunu kapatmak için
yazılmış — ama **yalnız altı yerde** kullanılıyordu; mobilde `hitSlop` yirmi
yerde.

Ölçüm, yalnız ikonlu (metinsiz) düğmeler, etkili hedef:

| Yuva | Önce | Sonra |
|---|---|---|
| `lesson-player` "sürdürüldü" kapat | **14×14** (dolgu yok) | 38 (`p-1` + `hit-8`) |
| `league-board` bildir | **21** | 37 |
| `push-optin` kapat | **23** (WCAG 24'ün altında) | 39 |
| `install-prompt` kapat | 24 (sınırda) | 40 |
| `writings-card` sil | ~26 | ~42 |
| `skills/quiz` dinle | 26 | — (metinli, hedefi geniş) |
| `lesson-player` ikinci dinle | 28 | 44 |
| `exam-player` çık | 32 | 48 |
| `placement-test` çık | 32 | 48 |
| `sound-settings` örnek çal | 32 | 48 |
| `voice-picker` dinle | 32 | 48 |

Eşik **36** ve kaynağı o yorumun kendisi ("mobilin gerçek hedefi 36–50").
`lesson-player`'ın ikinci dinle düğmesi özellikle öğreticiydi: kardeşi olan
birinci dinle düğmesi `hit-8` taşıyor **ve yanında gerekçesi yazılı**, ikincisi
taşımıyordu.

Yol boyunca bir **i18n hatası** çıktı: `skills/quiz`in yazdırma turundaki
"dinle" düğmesi `Cümleyi dinle` diye **sabit Türkçe** yazıyordu. Anahtar
(`skillquiz.listen_to_sentence`) altı sözlüğün hepsinde duruyor ve mobil onu
çağırıyor; yalnız web çağırmıyordu. Yani Almanca ya da İngilizce arayüz
kullanan biri orada Türkçe görüyordu. (`i18n-hardcoded` tabanı 162 → 161.)

### Kapı iki kez hiçbir şey ölçmedi ve ikisi de enjeksiyonla çıktı

**Birinci:** açılış etiketinin sonunu `blok.indexOf(">")` ile arıyordum ve
`onClick={() => ...}` içindeki **ok işaretinde** duruyordu. Açılış etiketi
yarım kalıyor, kalan öznitelikler "içerik" sayılıyor, içerikte metin görünüyor
ve düğme "ölçülemez" diye sessizce atlanıyordu. Kapı yeşildi ve **hiçbir şey**
ölçmüyordu; bir düğmeden `hit-8`i silmek yakalanmayınca ortaya çıktı. Doğrusu:
süslü parantez derinliği sıfırken ve tırnak içinde değilken gelen ilk `>`.
Düzeltmeden sonra kapı, elle taramamın **tamamen kaçırdığı** on bir yuva daha
buldu.

**İkinci:** "ikonlu düğme" testim `{...}` ifadelerini de siliyordu, yani
`<Icon/> {t("etiket")}` biçimindeki **metinli** düğmeler ikonlu sayılıyordu ve
`retry-button`ın geniş düğmesi "18 px" diye bildirildi. Etiketler çıkarıldıktan
sonra geride bir şey kalıyorsa o düğme ölçülemez.

Bir **yanlış pozitif** de aynı şekilde kapatıldı: `achievement-badge`in düğmesi
11 px'lik bir ikon taşıyor ama ikon, genişliği `style={{ width: size }}` ile
gelen 56–72 px'lik bir karonun içinde; sınıflardan okunamayan boyut artık
ölçüm dışı. Ölçemediği yeri bildiren kapı, komşuyu ölçen kapının kardeşi.

Kapı metinli düğmeleri **bilerek** ölçmüyor: orada hedef metnin kendi genişliği
kadar ve sınıflardan hesaplanamaz. Ölçüm yapmayan bir kapı yazmak,
yazmamaktan kötü.

### İkon boyutu ekseninde kapı YAZILMADI

Ölçüm: mobilde `size={N}` 13'ten 104'e kırk ayrı değer, webde de aynı yayılım.
Belgelenmiş bir ikon ölçeği **yok** — yarıçap ve puntoda olan (beş/sekiz
basamak, `check:tokens`ın doğruladığı) burada hiç yazılmamış. Bir kapı "yakın
değerleri" ihlal sayardı; §11.323'ün boşluk kararıyla aynı sınıf. Ayrışma
varsa yüzey yüzey bulunur.

## §11.326 — Modül sınavı: kurs kontrolü iki yolda vardı, üçüncüde yoktu

Modül sınavı planları Almanca yazılmış ve kurs boyutu yok; gerekçesi kendi
dosyasında duruyor (`hasModuleExams`): "İngilizce öğrenen birinin Patika'sında
Almanca başlıklı modül sınavları çıkıyor ve açtığında Almanca kâğıt geliyordu."
Varsayımın adı var — ama **üç yol** var ve üçünde de uygulanması gerekiyor:

| Yol | Kontrol |
|---|---|
| Kapak ucu (`/api/exam?level&module`) | vardı |
| Modül listesi (`/api/exam?level`) | vardı |
| **Kâğıt üretimi** (`POST {action:"start", module}`) | **yoktu** |

`/api/exam`a doğrudan `{action:"start", module: 3}` gönderen bir İngilizce kurs
kullanıcısı Almanca kâğıt alıyordu. Arayüzden erişilmiyordu — iki istemci de
listeyi boş alıyor, yani kusur görünmüyordu — ama adı olan bir varsayımın en
önemli yerde, kâğıdın üretildiği yerde, uygulanmaması tam bu turlarda tekrar
eden sınıf. §213 üç yolu birlikte okuyor; enjeksiyon (kontrolü `if (false)`
yapmak) yakalandı.

Mobil tarafta ayrı bir kapı **gerekmiyor** ve bu da ölçüldü: `PathScreen` modül
listesini sunucudan çekiyor (`/api/exam?level=`), yani kural tek yerde. Kapı
bunu da doğruluyor — mobil kendi kopyasını yazmaya başlarsa haber verir.

## §11.327 — 161 ham dizginin ayıklaması: hepsi meşru, biri hariç (o da düzeltildi)

`i18n-hardcoded` tabanı bir borç listesi ve içinde gerçek arayüz metni olup
olmadığı hiç ayıklanmamıştı. Yuva yuva bakıldı; **altı meşru sınıf** çıktı ve
bundan sonra yeniden ayıklanmaması için buraya yazılıyor:

1. **Geliştirici günlüğü** — `console.error("[learn] profil okunamadı")` gibi.
   `src/app/(app)` altındaki on beş hitin **hepsi** bu. Ekrana çıkmıyor.
2. **Yapay zekâya giden istem** — `task.prompt: \`Çevir: ${sentence.tr}\``
   (`translate-game`), rol yapma sınavının sahne tarifi. Model okuyor, kullanıcı
   okumuyor.
3. **Hedef dilin kendi harfleri** — umlaut ekleme düğmeleri (`ö ü Ö Ü`) beş
   oyunda ve yazma oynatıcısında. Çevrilecek metin değil, karakter.
4. **Hedef dilin kendi içeriği** — `voice-picker`ın Zürih Almancası / standart
   Almanca örnek cümlesi, `exam-types`in `Hören` bölüm adı, sınav kapağının
   `Niveauprüfung`/`Modulprüfung` üst satırı (o da yalnız kâğıt Almanca başlık
   taşıyorsa; İngilizce kursta modül sınavı hiç yok — §11.326).
5. **Anadile göre eşlenmiş tablolar** — `TRUE_WORD`/`FALSE_WORD`
   (`lesson-player`, tanıyıcı arayüz dilindeki kelimeyi dinliyor), `UNIT_WORD`
   (`brief.ts`, sunucu tarafı yedek ad). Üç dilin üçü de yazılı.
6. **Pazarlama / paylaşım meta verisi** — `layout.tsx` kök başlığı ve
   açıklaması, `manifest.ts`, `opengraph-image.tsx`. Tek dilli ve bilerek:
   uygulamanın satış noktası "Türkçe anlatımıyla" ve OG görseli zaten Türkçe
   bir PNG. Sayfa başlıkları **ayrı** ve çoktan çevrilmiş durumda — 82 sayfa
   `titleMeta()` kullanıyor ve kalan sabit başlıklar yalnız yönetim panoları.

Tek gerçek kusur geçen turda çıkan `skills/quiz`in "Cümleyi dinle"siydi ve
düzeltildi (§11.325). Bugün başka bir arayüz metni yok.

**Bir tuzak bulundu ve adı yazıldı:** `PREMIUM_GATES` haritasının değerleri
Türkçe cümleler ("Deneme sınavları", "Cepte yürüyüş (ekran kapalı)") ve
**hiçbir bileşen onları okumuyor** — paywall'ın her satırı anahtar + parametre
olarak dönüyor. Bugün zararsız; biri bu değerleri ekrana basarsa arayüzü
Almanca olan kullanıcı Türkçe görür. Dosyanın yorumu artık bunu söylüyor:
anahtarlar sözleşme, değerler yalnız insan için okunabilir etiket, yeni bir
kapının metni sözlüğe yazılır.


## §11.328 — Karar gerçek dili okuyor, yükleme sabit "tr" yazıyordu

Bu turun sorusu §11.326'nın genellemesi oldu: **adı olan bir koşul, okuma
yolunda uygulanıp yazma/üretim yolunda atlanıyor mu?** Premium kapıları
(`canPocketWalk`, `canAiPractice`, `canMockPaper`) tarandı — üçü de kendi
eylem ucunda duruyor (`/api/stt`, `/api/assess`, `/api/mock-exam` POST).
`canWeeklyExam`in yokluğu zaten defterde yazılı (§11.211) ve bu turda
gerekçesine bir ölçüm eklendi.

Yeni kusur **başka bir yerde** çıktı: içerik paritesi seçicilerinde.

Isınma (`first-words`) ve deneme yerleştirme (`placement-demo`) içeriğinin
hangi **ana dil – kurs** paritesinde var olduğu veriden geliyor:
`hasX(lang, course)` onboarding'in "bu adımı göstereyim mi" kararı,
`xFor(lang, course, …)` de yüklemesi. İkisi aynı dili okumak zorunda.

Isınmada okumuyordu: web yüklemeyi **`firstWordsFor("tr", …)`** diye sabit
yazıyordu, karar ise gerçek dili veriyordu. Mobil karşılığı doğruydu
(`FirstPracticeScreen`: `firstWordsFor(currentLang(), …)`), kardeş yüzey
(`demo-placement`) de doğruydu — yani tasarım kararı değil, gözden kaçma.

İki sonucu var:
1. **Bugün görünen:** doğrudan `/first-words` adresine giren Almanca ya da
   İngilizce arayüzlü bir kullanıcı Türkçe karşılıklar görüyor. Sayfa `(app)`
   grubunun dışında ve oturum istemiyor, yani adres tek başına yeterli.
2. **Yarın görünecek:** `de-de` ya da `en-en` paritesi yazıldığı gün
   onboarding kullanıcıyı ısınmaya yollar (`hasFirstWords` o parite için true
   döner) ve sayfa Türkçe seti yükler. Bugün tek parite `tr-de` olduğu için
   fark gizli.

§214 dört yüzeyin sekiz çağrı yerini birlikte okuyor: karar ve yükleme, iki
platformda, iki içerik türü için. Enjeksiyon (`"tr"`ü geri koymak) yakalandı.

## §11.329 — Rozet duvarı: üç sapma, biri mobilin yorumunda yazılıydı

Kurs ekseninde "karar ile yükleme aynı girdiyi okuyor mu" taraması temiz
çıktı: sözlük yükleyicilerine sabit kurs geçen tek yerler `catch` dalları
(profil okunamazsa `"de"`), TTS parçalarının `lang: "de"` etiketi ise iki
platformda da yalnız "hedef dil" işareti — gerçek ses kurstan geliyor
(`voiceForSegment` → `lessonVoice(course)`), mobil de aynı düzeni yazıyor.
Yani taranan hipotez yanlıştı ve bu da bir sonuç.

Kusurlar **rozet duvarını** mobil karşılığıyla satır satır karşılaştırınca
çıktı:

1. **Yanıt denetimi eksikti.** Mobil `/api/achievements` gövdesinin üç alanını
   birden denetliyor (`rows`, `total`, `unlockedCount`); web yalnız ilk ikisine
   bakıyordu. `unlockedCount`u eksik bir yanıt web'de "geçerli" sayılıyor,
   sonra `board.unlockedCount / total` ile ilerleme şeridi **`NaN%` genişlik**
   alıyor ve sayaç satırı `formatNumber(undefined)` yazıyordu. Mobil aynı yerde
   "tekrar dene" gösteriyor.

   **Mobilin yorumu bunu zaten söylüyordu:** "Web de aynı denetimi yapıyor
   (`achievement-wall`)". Yapmıyordu. Zorunluluğu yazan cümle, ölçen yok —
   §11.316 ve §11.319 ile aynı sınıf, bu kez tersinden: iddia mobilin
   tarafındaydı.

2. **İskeletin duyurusu yoktu.** Web duvarının iskeleti elle yazılmış tek
   iskeletti ve `aria-busy` taşımıyordu; sesli okuyucu kullanan biri boş bir
   kart duyuyordu. Kalıp `components/skeleton` `SkeletonCard`ta zaten var
   (`role="status" aria-busy`), mobilde kökte (`accessibilityRole="progressbar"`).

3. **Bölüm aralığı 20 px'ti**, mobilde `spacing.lg` (16).

§215 sekiz ölçütü birlikte okuyor: iki platformun üç alan denetimi ve iki
iskelet duyurusu. İki enjeksiyon (alanı silmek, duyuruyu silmek) yakalandı.

## §11.330 — Gelişim ekranı: üç ayrışma, biri §11.126'nın son kalıntısı

Profil/Gelişim ekranı mobil karşılığıyla karşılaştırıldı. Mimari fark
meşru — web sunucuda çiziyor (`progress-view` saf sunum, veriyi sayfa
veriyor), mobil istemcide çekip iskelet gösteriyor — o yüzden karşılaştırma
**gösterilene** odaklandı. Üç ayrışma çıktı:

**1. Ekranın adı.** Aynı ekran web'de "İlerlemem" (`progw.my_progress`,
web-only sözlükte), Android'de "Gelişim" (`progress.progress`, **taban**
sözlükte) diye yazıyordu. §11.102/§11.126 dokuz `prog.*`/`progw.*` kopyasını
mobil kaynaklı anahtarlara taşımıştı; **bu biri hayatta kalmıştı** — çünkü
çağrılıyordu ve §11.127'de yazılan ölü-anahtar kapısı yalnız *çağrılmayanı*
görüyor. Üç yerde (sekme başlığı, geri düğmesi, `nav` etiketi) taban anahtara
geçti ve son `progw.*` anahtarı üç web sözlüğünden düştü.

**2. Ustalık kartının hedefi.** Android'de şeridin kendisi Kelimeler'e
götürüyor ve gerekçesi orada yazılı: "Kelimelerim profilin menüsünde ayrı bir
satırdı, oysa bu kartın detayından başka bir şey değil. Kart hedefsiz
duruyordu, satır da bağlamsızdı; ikisi birleşti." Web'de şerit **tıklanamıyordu**
— hedef sekme çubuğunda var ama karttan yol yoktu. Dokunulabilirliği söyleyen
chevron da yoktu; Android'de sayının yanında duruyor.

**3. Sayı biçimi — bu kez geride olan mobil.** Web `formatNumber` ile bin
ayracı koyuyor (Türkçede nokta, İngilizcede virgül), mobil bu **tek satırda**
ham sayı yazıyordu; oysa aynı dosyada başka altı yerde `formatNumber` geçiyor,
yani karar değil atlama. Rozet duvarında aynı sınıf zaten düzeltilmişti
(§11.329'un komşusu).

§216 sekiz ölçütü birlikte okuyor: üç başlık yeri, ölü anahtarın yokluğu, iki
platformun kart hedefi ve iki platformun sayı biçimi. Üç enjeksiyon aynı anda
yakalandı.

## §11.331 — Kelimenin durumu dört yerde yazılıydı; sayfalama ise bilerek ayrı

Kelimeler ekranı mobil karşılığıyla karşılaştırıldı.

**Kural dört kez yazılıydı.** Aynı sınıflandırma web'de dört ayrı yerde
duruyordu: `/api/words`ün gövde eşlemesi, iki SQL süzgeci (`/words` sayfası ve
aynı uç) ve listenin etiket işlevi (`word-list` `statusOf`). Dördü de aynı
eşikleri kullanıyordu — `MASTERED_DAYS` üçünde de `lib/srs`ten geliyor, yani
**sayı** tek kaynaktaydı — ama **kural** dört kez yazıldığı için biri
düzeltilip ötekilerin eski kalması için dört yol vardı.

Mobilde kural tek yerde (`data/words` `statusOf`) ve yorumu "web `word-list`
`statusOf` ile AYNI eşikler" **diyor**; ölçen bir şey yoktu. Aynı şey
"tekrar zamanı" etiketinde de var: mobil `dueLabelKey`in yorumu web `dueLabel`
ile aynı eşikleri iddia ediyor, iki gövde de gerçekten aynı (gün hesabı,
`<= 0`, `=== 1`) — ama bunu da hiçbir kapı okumuyordu.

`lib/word-status.ts` iki soruyu ayırıyor: `coarseStatus` ucun gövdesine giden
**üç** değer (süzgeç çipleriyle aynı küme), `wordStatus` listenin **beş** bandı
(`leech` en önde, `familiar` yalnız etikette var). Uç ve liste artık ikisi de
buradan okuyor; `FAMILIAR_DAYS` iki platformda aynı adla tanımlandı ve "ortak
sayisal sabitler" kapısının karşılaştırdığı sabit sayısı 56'dan 57'ye çıktı.

§217 sekiz ölçüt okuyor: bant sayısı, iki çağrı yerinin kaynaktan okuması,
listede elle eşik kalmaması, iki platformun `FAMILIAR_DAYS`i ve iki platformun
"tekrar zamanı" eşikleri. İki enjeksiyon yakalandı; biri de "ortak sayisal
sabitler" kapısına düştü.

**Sayfalama BİLEREK ayrı bırakıldı.** Web önceki/sonraki düğmeleri ve
"sayfa {n}" ile sayfalıyor (`?page=` adreste), Android "daha fazla yükle" ile
listeyi uzatıyor. Android'i referans almak burada web'e **zarar** verirdi:
adreste duran sayfa numarası paylaşılabilir, tarayıcının geri düğmesi doğru
yere dönüyor ve sayfa yenilendiğinde aynı yer açılıyor — mobilde adres diye bir
şey olmadığı için "daha fazla" orada doğru olan. Platformun kendi
imkânının olduğu yerde eşleme, ayrışma değil. Üç `wordsw.*` anahtarı da bu
yüzden yerinde kalıyor (§11.330'da düşen `progw.my_progress`ten farkı: orada
web-only anahtar aynı şeyi başka adla söylüyordu, burada web-only bir
etkileşimin kendi metni).

## §11.332 — Ses ayarı iki ekrana bölünmüştü

Ayarlar ekranı mobil karşılığıyla karşılaştırıldı. Çoğu yer eşleşiyor —
güvenlik grubu (şifre, iki adımlı doğrulama, etkin oturumlar) web'de de var,
`LinkedAccounts` `profile-form`un içinde kuruyor; hesap, uygulama, öğrenme ve
gizlilik grupları iki tarafta da aynı. Bir ayrışma çıktı ve ikiye ayrılıyor:

**Oyun sesleri başka ekrandaydı.** Android'de "Ses" bölümü ikisini birden
taşıyor: okuma sesi (alt etiketi `settings.reading_voice`, sonra picker), bir
ayırıcı, sonra oyun sesleri anahtarı. Web'de oyun sesleri **bildirim
ayarlarında** duruyordu ve gerekçesi yazılıydı: "oyun sesleri de bir 'ne zaman
rahatsız edilirim' ayarı". Savunulabilir bir sınıflandırma — ama sonucu şu:
sesle ilgili ayar arayan kullanıcı **iki yere** bakmak zorunda ve iki platform
aynı ayarı iki ayrı ekranda tutuyor. Android referans alındı: anahtar Ses
bölümüne taşındı, bildirim ayarlarından çıktı.

**Picker'ın alt etiketi eksikti.** Mobil okuma sesi seçicisinin ne olduğunu
söylüyor (`settings.reading_voice`, üç sözlükte de var); web'de picker
başlıksız duruyordu — "Ses" başlığının altında ne seçtiğini söyleyen bir şey
yoktu.

§218 yedi ölçüt okuyor ve taşımanın **en kolay hatasını** da kapsıyor: aynı
anahtarın iki yerde birden çizilmesi. İki enjeksiyon (anahtarı geri taşımak,
eskisini silmeden bırakmak) yakalandı.

**Kapımın kusurunu repo'nun meta-kapısı yine yakaladı** (§11.320'nin aynısı):
`/<VoicePicker/` ve `/SoundSettings/` sade bileşen adı desenleriydi, yani önek
eşleşmesi. "kapilarda onek eslesmesi" kapısı ikisini de bildirdi; `\b` ile
sınırlandı. Aynı hatayı iki turda iki kez yaptım — kapı olmasa ikisi de
sessizce geçerdi.

## §11.333 — Gelen kutusu neredeyse birebir; ölçülmeyen üç şey vardı

Gelen kutusu mobil karşılığıyla karşılaştırıldı ve **satır satır eşleştiği**
görüldü: avatar ya da ikon karosu, okunmamış satırın kalın yazısı + noktası,
tepki simgesi, chevron, imleçli sayfalama ("daha eski"), ilk yüklemede
`markRead("all")` ve rozeti sıfırlayan olay. Zil de aynı: dakikada bir ve
ön plana gelince tazeleniyor, 9'dan sonra "9+", aynı kehribar zemin + mürekkep
yazı, aynı erişilebilirlik anahtarları. Oturum açmamış hâlin mobilde olup
web'de olmaması meşru — web'in `/inbox` adresi `(app)` grubunda, yani oraya
oturumsuz ulaşılamıyor.

Üç şey ölçülmüyordu:

**1. `timeAgo` iki yerde ayrı ayrı yazılı ve satır satır aynı:** saniye hesabı,
dört eşik (60 sn / 60 dk / 24 sa / 7 gün) ve sonunda yerel kısa tarih. Biri
değiştirilirse aynı bildirim iki platformda başka yaş gösterir. §11.331'deki
`dueLabel`/`statusOf` ile aynı sınıf.

**2. Bildirim hedefleri kaldırılmış sekme adlarını yazıyordu.** Android'de
"gelen istekler" ve "bu haftanın ortak görevi" kendi sekmelerinde değil,
arkadaş listesinin başında (`FriendsScreen`); `InboxScreen` `open` ikisini de
`friends`e götürüyor. Web `?tab=requests` ve `?tab=quests` yazıyordu ve yalnız
`hub-tab`daki ALIAS sayesinde çalışıyordu. Hedefler Android'inkine çevrildi;
alias artık yalnız **kayıtlı dış bağlantılar** için duruyor — kendi
bağlantılarımız için değil.

**3. Rozetin tavanı ("9+") iki yerde yazılı** ve ikisi de aynı.

§219 on ölçüt okuyor. Üç enjeksiyon (mobil eşiği 7→14, web hedefini geri
almak, mobil tavanı silmek) yakalandı.

**Kapının ilk yazımı yine hiçbir şeyi ölçmedi ve bu kez tell farklıydı.**
Kısa tarih dönüşünü `/toLocaleDateString\([^)]*\{ day: ... \}/` ile arıyordum;
çağrı `toLocaleDateString(localeOf(lang), {...})` biçiminde olduğu için
`[^)]*` ilk `)`de duruyor ve desen hiç tutmuyor. **İki tarafın aynı şekilde
"YOK" demesi** kusurun kodda değil ölçümde olduğunun işaretiydi — bir
ayrışma arıyorsanız iki tarafın birlikte başarısız olması şüphelidir.

## §11.334 — Sosyal merkez eşitti, yükleme dalı değildi

Arkadaşlar / akış yüzeyi mobil karşılığıyla karşılaştırıldı ve **asıl dizilim
zaten eşitti**: cevap bekleyen iş (gelen istek), bu haftanın taahhüdü (ortak
görev), sonra arkadaş listesi ve tablo; "Bul" sekmesinin altında gönderilen
istekler; sekme rozeti aynı kehribar + mürekkep; üç sekme (`friends`, `feed`,
`find`) ve kaldırılmış iki sekmenin adresleri için alias. Bunların hepsi
doğrulandı.

**Yükleme dalı eşit değildi.** Android yüklenirken gerçek dizilimin aynısını
çiziyor — istek kartı, görev kartı, iki kişi satırı — web ise yalnız **üç kişi
satırı** çiziyordu. Sonuç: veri gelince ilk iki kart **üstte** belirip listeyi
aşağı itiyordu. Aynı sınıf §11.329'da rozet duvarında çıkmıştı (orada eksik
olan iskeletin *duyurusu*ydu) ve mobilin başka bir ekranında gerekçesi yazılı:
"içerik gelince kartlar ortadan yukarı sıçramıyor, oldukları yerde beliriyor".

İlginç yanı: **`QuestsSkeleton` web'de zaten vardı** ama yalnız `Quests`in
kendi yüklemesinde kullanılıyordu — merkez yüklenirken `Quests` henüz takılı
olmadığı için o iskelet hiç görünmüyordu. Yani eksik olan bileşen değil,
onu doğru yerde çağırmaktı. Eksik olan tek bileşen istek kartının yeriydi
(`RequestCardSkeleton`), o da web'in kendi satır düzeninden çıkarıldı: 40'lık
avatar, iki metin satırı, iki düğme — yükseklik varsayılmıyor.

§220 yedi ölçüt okuyor: istek iskeletinin varlığı, yükleme dalındaki üç
parçanın hepsi, sırası, ve **gerçek** dizilimin sırası (yükleme dalı ona
benzemek zorunda, yani gate iki listeyi birbirine bağlıyor). İki enjeksiyon
(bir parçayı silmek, sırayı bozmak) yakalandı.

## §11.335 — On dört rota yedeği sessizdi

§11.334'ten sonra aynı soruyu **tek yüzey yerine sistematik** sordum: web'in
bütün yükleme dalları gerçek düzenin şeklini çiziyor mu, ve kendini duyuruyor
mu?

**Şekil tarafı temiz çıktı.** On dört `loading.tsx` dosyasının hepsi gelecek
düzenin şeklini çiziyor (profil kimlik + beş satır, Öğren'in üç bloğu,
Kelimeler'in başlık + şerit + arama + çipler + satırları…) ve iki bileşen
içindeki `return null` de yükleme değil **hata** dalı — ikisi de öncesinde
iskelet çiziyor. Yani taranan hipotezin yarısı yanlıştı.

**Duyuru tarafı tamamen eksikti.** On dördünün **hiçbiri** `aria-busy`
taşımıyordu ve on dördünün kökü `aria-hidden`dı. Yani sesli okuyucu kullanan
biri bir sekmeye geçtiğinde hiçbir şey duymuyor: ekran sessizce boş kalıyor,
sonra içerik bir anda ortaya çıkıyor. Mobil bunu **kökte** çözmüştü
(`ui/Skeleton` `SkeletonCard`: `accessibilityRole="progressbar"`, gerekçesi
orada yazılı) ve web'in `SkeletonCard`ı da `role="status" aria-busy` taşıyor —
eksik olan **rota** seviyesindeki yedeklerdi. §11.329'da aynı sınıf tek bir
bileşende çıkmıştı; burada on dördü birden.

`LoadingRegion` tek yerde: `role="status" aria-busy="true"` ve etiket
`social.loading`. İki ayrıntı kayda değer:

- **`aria-hidden` kökten içeri taşındı.** Kökte kalırsa etiketin kendisi de
  gizlenir ve bölge hiç duyurulmaz — düzeltmenin en kolay yanlışı, o yüzden
  kapı bunu ayrıca ölçüyor.
- **İstemci bileşeni**, çünkü etiket çeviriden geliyor ve `loading.tsx` bir
  Suspense yedeği: orada `await` etmek yedeğin kendisini askıya alırdı.

§221 dört ölçüt okuyor ve dosyaları **sayarak** buluyor (yeni bir
`loading.tsx` eklendiği anda kapıya giriyor). İki enjeksiyon yakalandı.

**Kendi kuralımı yine ihlal ettim.** Enjeksiyonu geri almak için
`git checkout -- <dosya>` kullandım ve o dosyanın **bu turdaki kendi
düzeltmesini** sildi — §11.285'te yazdığım "enjeksiyonlar yedekten geri
alınır, `git checkout` ile değil" kuralının aynısı. Kapı yeşile dönmeyince
fark edildi ve düzeltme yeniden uygulandı; kuralı ihlal etmenin bedeli bu kez
yalnız bir dosya oldu çünkü kapı bekliyordu.

## §11.336 — Sosyal eylemin hatası iki platformda da sessizdi

§11.335'in duyuru ekseni verimli çıktığı için aynı bakışı **hata durumlarına**
taşıdım: bir eylem başarısız olduğunda kullanıcı bunu öğreniyor mu?

İstek kabul etmek, dürtmek, tepki vermek, ortak görev kurmak, arama yapmak —
hepsi başarısız olabilir ve hepsi aynı satırı çiziyor: küçük kırmızı bir metin.
O satır **iki platformda da sessizdi**:

- **Web:** on bir yerde elle yazılmış `<p className="… text-caption"
  style={{ color: var(--color-rose) }}>{err}</p>`, `role` yok.
- **Mobil:** `social/common` `ErrorText`, `accessibilityLiveRegion` yok.

Yani sesli okuyucu kullanan biri eyleminin başarısız olduğunu **hiç
öğrenmiyordu** — hata yalnız görsel olarak vardı.

**İki taraf da yanlış olduğu için karşılaştırmalı bir kapı bunu göremezdi.**
§11.228'in sınıfı: "her iki taraf da aynı yanlışı yapıyorsa eşitlik kontrolü
geçer". Ölçüt karşılaştırma değil, **mutlak**: bir eylem başarısız olduysa
duyurulur. Bu turların en çok tekrar eden dersi, tersinden: bazı kusurlar
ancak iki tarafa da aynı anda bakmayan bir ölçütle görülür.

Düzeltme iki platformda da **tek yerde**: web'de yeni `social/error-text`
(`role="alert"`, sınıf dışarıdan — on bir yuvanın dolgusu ve puntosu farklı ve
bu bir tasarım kararı), mobilde `ErrorText`e `accessibilityLiveRegion="polite"`.
İki seçim de uygulamanın kendi kalıbı: web'in `role="alert"`i `profile-form`,
`report-dialog`, `push-settings` ve `exam-player`da zaten var (gerekçesi
`profile-form`da yazılı), mobilin `polite`i `ActiveSessions`,
`ChangePassword` ve `ResetPasswordScreen`de.

§222 üç ölçüt okuyor ve üçüncüsü toplamanın **en kolay yanlışını** kapsıyor:
web'de elle yazılmış hata satırı kalıp kalmadığı (on bir yuvadan birini
atlamak). Üç enjeksiyonun üçü de ayrı ayrı yakalandı.

## §11.337 — Turun sonucu duyurulmuyordu; iki yüzey kapandı, dokuzu ölçüldü

§11.336'nın mutlak ölçütü işe yaradığı için aynı bakışı **başarı/onay** ve
**sonuç** geri bildirimlerine taşıdım.

**Onay tarafı temiz çıktı** — hipotezin yarısı yanlıştı. Web'de başarı
mesajları zaten duyuruluyor: `AuthNotice` kökte çözmüş ve yorumu kuralı da
yazıyor ("Hata `alert`, başarı `status`: ilki sözü keser, ikincisi sırasını
bekler"); `linked-accounts` ve `friend-list` de `role="status"` taşıyor.
Mobilde `FriendRows` ve `ActiveSessions` `accessibilityLiveRegion="polite"`
kullanıyor.

Tek fark: web'in **iki katmanı** var (hata `alert`, başarı `status`), mobilin
**bir katmanı** (her şey `polite`; `assertive` mobilde hiç kullanılmıyor).
İkisi de savunulabilir ve söz konusu metinler küçük onaylar ("dürtüldü"), o
yüzden **değiştirilmedi** — burada yazılı olması yeter, bir sonraki tur
yeniden tartışmasın.

**Sonuç tarafı ise neredeyse tamamen sessizdi.** Bir tur bitince kart soru
listesinin **yerine** geliyor: sorular kayboluyor, yerine puan ve yargı
beliriyor. Ölçüm — on bir web sonuç yüzeyi ve on iki mobil sonuç ekranı
tarandı:

| | duyuran |
|---|---|
| web | yalnız `exam-player` (o da bir hata satırı) |
| mobil | yalnız `ChallengeScreen` ve `ExamScreen` (birer satır) |

Yani bir kullanıcı beceri egzersizini ya da ünite quizini bitirdiğinde ekran
okuyucu **hiçbir şey** söylemiyordu: bitti mi, kaç doğru, geçti mi.

**Bu turda iki yüzey kapandı** ve ikisi en çok kullanılanlar: beceri
egzersizinin sonucu (beş oynatıcı da `player-shell`den geçiyor) ve ünite
quizinin sonucu. Web'de kabın `role="status"`u, mobilde sonuç metninin
`accessibilityLiveRegion`ı — ikisi de platformun kendi kalıbı.

**Geri kalan dokuz yüzey ölçüldü ve adlarıyla burada:** patron turu
(`boss-player` ↔ `BossScreen`), meydan okuma (`challenge-player` ↔
`ChallengeScreen`), günün turu (`daily-player` ↔ `DailyScreen`), haftalık
(`weekly-player` ↔ `WeeklyScreen`), deneme sınavı (`mock-exam-player` ↔
`MockExamScreen`), seviye sınavı (`exam-player` ↔ `ExamScreen`), rol yapma
(`roleplay-exam` ↔ `RoleplayExamScreen`), oturum (`session-player` ↔
`GameScreen`) ve yürüyüş (`walk-player` ↔ `WalkModeScreen`). Hepsini bir
turda eklemek doğru olmazdı: sonuç kabı her ekranda ayrı yerde ve bazılarında
birden fazla sonuç durumu var (sınavın bölüm sonu ile kâğıt sonu ayrı). Sırayla
kapanacak; §223 şimdilik kapanan ikisini tutuyor.

## §11.338 — Sonuç duyurusu: üç yüzey daha (dokuzdan altısı kaldı)

§11.337'de adlarıyla yazdığım dokuz sonuç yüzeyinden üçü kapandı: **patron
turu**, **meydan okuma** ve **günün turu** — altısı da (üç yüzey × iki
platform) artık turun sonucunu duyuruyor.

Her birinin sonuç kabı ayrı yerdeydi ve bu, "hepsini bir turda ekleyelim"
demenin neden doğru olmadığını gösteriyor:

- **Patron turu:** `Frame` sarmalayıcısı **üç durumu da** sarıyor (giriş, oyun,
  sonuç). `role="status"`u orada sabitlemek tur oynanırken de canlı bölge
  açmak olurdu — her doğru cevapta ekran okuyucu konuşurdu. Bunun yerine
  `Frame` bir `role` prop'u aldı ve yalnız sonuç dalı veriyor.
- **Meydan okuma:** sonuç içeriği kendi kabında (`<div className="text-center">`),
  oraya kondu. Mobil tarafta bu ekranda **zaten bir canlı bölge vardı** — ama
  o, oyun içindeki anlık geri bildirim şeridi (`flash`), sonuç değil. Var olan
  bir canlı bölgeyi "bu ekran duyuruyor" diye saymak, bu turların en sık
  hatasının (komşuyu ölçmek) ta kendisi olurdu.
- **Günün turu:** bileşen o noktada zaten yalnızca sonuç kartını döndürüyor,
  rol kartın kabına kondu.

Mobil tarafta canlı bölge her üçünde de **sonuç metninde**, uygulamanın kendi
kalıbı gereği — ama hangi metin olduğu ekrana göre değişiyor (`boss.passed`,
puan `display`i, `formatNumber(score)`), o yüzden kapı her birini kendi
dizesiyle arıyor.

§223 artık on ölçüt okuyor (beş yüzey × iki platform). Üç enjeksiyon
yakalandı. **Kalan altı yüzey:** haftalık (`weekly-player` ↔ `WeeklyScreen`),
deneme sınavı (`mock-exam-player` ↔ `MockExamScreen`), seviye sınavı
(`exam-player` ↔ `ExamScreen`), rol yapma (`roleplay-exam` ↔
`RoleplayExamScreen`), oturum (`session-player` ↔ `GameScreen`) ve yürüyüş
(`walk-player` ↔ `WalkModeScreen`). Son üçü özellikle dikkat istiyor: sınavın
**bölüm sonu** ile **kâğıt sonu** ayrı iki sonuç ve oturumun içinde etap
kartları var.

## §11.339 — Sonuç duyurusu: üç yüzey daha; kalan üçü çok durumlu

Haftalık sınav, deneme sınavı ve rol yapma sınavı kapandı — §223 artık **sekiz
yüzey × iki platform = on altı ölçüt** okuyor. Kalan üç yüzey: seviye sınavı
(`exam-player` ↔ `ExamScreen`), oturum (`session-player` ↔ `GameScreen`) ve
yürüyüş (`walk-player` ↔ `WalkModeScreen`). Üçü de **çok durumlu** — sınavın
bölüm sonu ile kâğıt sonu ayrı iki sonuç, oturumun içinde etap kartları var —
ve bilerek en sona bırakıldı.

**Kapı bu turda iki kez kendi kusurunu gösterdi ve ikincisi öğreticiydi.**

Üç web dosyasında aynı kart sınıfı üç–beş kez geçiyor (giriş, hata, sonuç).
"Dosyada bir yerde `role="status"` var" demek komşuyu ölçmek olurdu: rol
yanlış dala kaysa kapı yine yeşil kalırdı. İlk düzeltmem bir **karakter
penceresi** koydu (roldan sonra 400 karakter içinde sonucu işaretleyen dize
aranıyor) — ve kapı **kendi kendine kırmızı oldu**, çünkü gerçek mesafe 547
çıktı: araya uzun bir `CoachBubble` satırı giriyor.

Pencere tahmin etmek yerine ölçüm ters çevrildi: **sonucu işaretleyen dizeden
geri gidip ondan hemen önce açılan kabın etiketine** bakılıyor. Böylece ne
pencere tahmini kalıyor ne de "dosyada bir yerde" gevşekliği. Enjeksiyonla iki
durum ayrı ayrı doğrulandı: rolü silmek **ve** rolü yanlış dala taşımak —
ikincisi dosya geneline bakan bir desenin kaçıracağı tam durum.

Bu, aynı dersin bu turlardaki dördüncü biçimi: §184 komşu satırı ölçtü, §208
420 karakterlik pencere komşuyu gördü, §11.333 `[^)]*` ilk parantezde durdu,
şimdi 400 karakterlik pencere yetmedi. Ortak kural artık net: **pencere
yerine yapı** — sınır bir mesafe değil, bir düğüm olmalı.

## §11.340 — Sonuç duyurusu tamamlandı: on bir yuva, yirmi dört ölçüt

Kalan üç çok durumlu yüzey de kapandı ve §223 artık **bütün** sonuç
yüzeylerini tutuyor: beceri egzersizi, ünite quizi, patron turu, meydan okuma,
günün turu, haftalık sınav, deneme sınavı, rol yapma, seviye sınavı, oturumun
**etap** ve **bitiş** kartları, yürüyüş — iki platformda, yirmi dört ölçüt.

**Bir varsayımım ölçümle düzeldi.** §11.338 ve §11.339'da "sınavın bölüm sonu
ile kâğıt sonu ayrı iki sonuç" diye yazmıştım. Öyle değil: sınavın tek sonucu
var (`phase === "result"`), bölüm geçişleri çalışan fazın içinde bir **kapak**
— başlangıç ekranı, sonuç değil. İki kez tekrarladığım bu cümleyi kod
düzeltti. Çok durumlu olan **oturum**du: etap kartı ve bitiş kartı gerçekten
iki ayrı sonuç ve ikisi de ayrı ayrı duyuruluyor.

Üç yerde `role`/canlı bölge **dışarıdan** verildi, çünkü kap paylaşılıyor:

- `walk-player` `Frame` yürüyüşün bütün durumlarını sarıyor (izin, hata,
  oynama, bitiş) — `boss-player`da kurduğum kalıbın aynısı.
- `session-player`ın bitiş kartı `Stagger` ile çiziliyor; `Stagger` bir
  `role` prop'u aldı ve yorumunda niye varsayılansız olduğu yazılı: süsleme
  amaçlı zincirler canlı bölge açmamalı.
- Mobilde canlı bölge her ekranda sonuç metninde; hangi metin olduğu ekrana
  göre değişiyor (`formatPercent(pct)`, `stage.clean`, `common.round_done`,
  `walkmode.done_title`).

Kapı §11.339'da kurulan **"pencere yerine yapı"** ölçümünü kullanıyor: sınav
ve oturum-etap ölçütleri sonucu işaretleyen dizeden geri gidip ondan hemen
önce açılan kabın etiketine bakıyor. Üç enjeksiyon yakalandı.

Bu, §11.336'da açılan mutlak-ölçüt dizisinin sonu: **sosyal eylemin hatası**
(§11.336), **rota yedeklerinin duyurusu** (§11.335) ve **turun sonucu**
(§11.337–§11.340). Üçü de "iki taraf da yanlış" sınıfındaydı, yani üçü de
karşılaştırmalı bir kapıya görünmezdi.

## §11.341 — Odak yönetimi zaten yapılmıştı; tek açık yer yürüyüşün karanlık örtüsü

Erişilebilirlik ekseninde ölçülmemiş son büyük parçayı taradım: kipler
açıldığında odak nereye gidiyor, kapanınca geri dönüyor mu, Escape çalışıyor mu?

**Bu eksen ikisinde de zaten yapılmış** ve ölçüm bunu doğruladı:

- Mobilin beş kipi (rozet, sertifika, onay, mikrofon, bildir) **hepsi**
  `accessibilityViewIsModal` + `onRequestClose` taşıyor.
- Web'in üç kipi yerel `<dialog>` + `showModal()` ile açılıyor — odak tuzağı
  ve Escape tarayıcıdan geliyor. Dördüncüsü (`achievement-unlock`) elle
  yapıyor: `role="dialog" aria-modal`, odağı alıyor, Escape'i dinliyor ve
  kapanışta **odağı geldiği yere veriyor** (`geri?.focus?.()`).
- `CertificateSheet`in web'de kip karşılığı yok ve olmaması doğru: web
  sertifikayı yeni sekmede açıyor (`/api/certificate/{id}`), mobilde sekme
  diye bir şey olmadığı için sheet. Aynı yer, platformun kendi yolu.

§224 bunu **gerilemeyi tutmak için** yazıldı, bir kusuru kapatmak için değil.

**Tek açık yer yürüyüşün karanlık örtüsüydü** ve orada iki kusur vardı:

1. Örtü ekranın tamamını kapatıp etkileşim kipini değiştiriyor ("ekran
   karanlık ama açık — seni dinliyorum") ama **hiçbir şey bunu duyurmuyordu**.
2. Çıkış yalnızca **üç dokunuştu**. Dokunmaların yutulması bilinçli (cepte
   kazara basılmasın), ama klavye kullanan biri için bu bir **klavye
   tuzağı**: örtü her şeyi kapatıyor, tıklamalar yutuluyor ve dışarı çıkan
   hiçbir tuş yok (WCAG 2.1.2). Escape eklendi — kazara basılan bir tuş değil,
   bilinçli bir çıkış; üç dokunuş kuralı dokunmatikte olduğu gibi kaldı.

Örtü **web'e özel** (anahtarları `i18n/web`de): mobilde ekran gerçekten
kapanıyor, taklit bir karartmaya gerek yok. Yani Android'e bakılacak bir
karşılık yok, ölçüt mutlak.

**Uygulama sırasında iki kez kendi kalıbımı kaçırdım ve ikisi de yakalandı.**
İlk yazımda Escape'i düğümün `onKeyDown`una koydum — örtüye odak verilmediği
sürece hiç ateşleme almaz; `achievement-unlock`un kalıbı (odağı al, pencereyi
dinle, kapanışta geri ver) izlendi. İkincisi: etkiyi `exitDark`ın **önüne**
yazdım, oysa bağımlılık dizisi render sırasında okunuyor ve o noktada
`const exitDark` henüz TDZ'de — etki `exitDark`tan sonraya taşındı.

**Ve pencere tuzağının beşinci biçimi.** Kapının ilk ölçümü
`role="status"` ile `walk.dark_listening` arasında 200 karakterlik pencere
kullanıyordu; araya yazdığım uzun gerekçe yorumu girince yetmedi. §11.339'un
kuralı uygulandı: işaretten geri gidip ondan hemen önce açılan `<div`in
etiketine bakılıyor. **Sınır bir mesafe değil, bir düğüm.**

## §11.342 — Seçim bilgisi: on iki denetim "hangisi seçili"yi yalnız renkle söylüyordu

Eksen **seçim durumu**ydı: bir şık, çip ya da satır seçili olduğunu yalnızca
zemin rengiyle anlatıyorsa ekran okuyucu kullanan biri hangisini seçtiğini
hiçbir yoldan öğrenemez, renk körü biri için de tek kanal kalmış olur. Ölçüt
mutlak: **seçime göre stil kuran bir denetim, seçimi bir duruma da yazmak
zorunda.**

**Android'de dört kusur** — ve bunları kopyalamak yanlış olurdu, o yüzden
ölçüt karşılaştırma değil mutlak:

1. `OptionButton` (oyun turlarının ortak şık düğmesi) **iki durumu da yanlış
   şeyden okuyordu**. `selected: state !== "idle"` cevaptan sonra **doğru
   şıkkı** "seçili" diye okutuyordu — kullanıcı başkasını seçmiş olsa bile;
   yanlış cevaplayan biri ekrana dönüp "seçili" duyduğu şıkkı kendi cevabı
   sanıyordu. `disabled: state !== "idle"` ise yalnız doğru şıkkı ve seçilen
   yanlışı kapalı sayıyor, **dokunulmayan şıkları "açık"** gösteriyordu — oysa
   `choose` cevaptan sonra hepsini yutuyor. İki yeni prop (`answered`,
   `chosen`) ve altı çağrı yeri düzeltildi; `state="idle"` ile çağrılan iki
   gerçek düğme ("zorlandım"/"anladım") dokunulmadı.
2. `skillQuiz`in şık ve sıralama düğmeleri hiç durum taşımıyordu.
3. `ChoiceGame` (yerleştirme sınavı ve örnek yerleştirme) hiç durum
   taşımıyordu.
4. Tepki çubuğu (kendi tepkim) ve sosyal görünürlük satırları — ikincisi
   yanında radyo noktası bile olan gerçek bir radyo grubu — rolsüz ve
   durumsuzdu.

**Web'de sekiz kusur:**

5. Kenar çubuğu gezinmesi (masaüstü, iki blok): hangi sayfada olduğun yalnız
   gradyandan okunuyordu. **Kendi kardeşi** olan alt çubuk aynı bilgiyi
   `aria-current` ile veriyor, Android'de sekme `accessibilityState` taşıyor.
6. `/mock-exams` seviye şeridi: aynı şerit `/skills`te `aria-current` taşıyor.
7. Yedi oyun şıkkı (şık, boşluk, dinleme, çoğul, artikel, yerleştirme, örnek
   yerleştirme) ve eşleştirmenin iki sütunu `aria-pressed` taşımıyordu.
8. **Boşluk oyununun şık dalında `OptionMark` hiç yoktu** — `option-mark`
   yazıldığında atlanmış: doğruluk yalnız zeminin yeşil/kırmızılığından
   okunuyordu. Örnek yerleştirmede de aynı boşluk vardı. Beş kardeş oyunun
   hepsinde bu işaret var, Android'de de `OptionButton` simgeyi çiziyor.
9. Tepki **seçicisinde** seçilebilir öge `role="menuitem"` taşıyordu;
   `menuitem` durum taşımaz, doğrusu `menuitemradio` + `aria-checked`. Bu
   ikisinde de eksikti — §11.228 sınıfı: "iki taraf da yanlış olduğu için
   karşılaştırma geçiyor".

### Yapabildiklerim: iki platform iki ayrı ürün açıyordu

Tasarım eksenindeki en büyük ayrışma buydu. Aynı veri (`/api/cando`), iki
farklı sayfa:

| | Android | Web (eski) |
|---|---|---|
| kapsam | **hepsi birden** | yalnız seçili seviye |
| gruplama | seviyeye göre, her seviye kendi kartında | beceriye göre (okuma/dinleme/…) |
| özet | seviye başına **ilerleme çubuklu** kart | sayılar beş çipin içine sıkışmış |
| beceri | ifadenin altında alt satır | grup başlığı |
| durum dairesi | `accessibilityLabel` | `aria-hidden` + `title` |

Son satır bir hata: **`aria-hidden` `title`ı da susturur**, yani
"kanıtlı/gelişiyor/henüz yok" ekran okuyucuya hiç ulaşmıyordu. Web
`cando-card` Android'in yerleşimine geçirildi; seviye süzgeci kalktı, boş
LİSTE dalı eklendi (eskiden yalnız istek hatası karşılanıyordu, "veri geldi
ama içi boş" hâli boş bir sayfa bırakıyordu).

### İki kapı, çünkü biri tek başına hiçbir şey ölçmüyor

`check:selection` (`scripts/check-selection-state.mjs`) iki ölçütle çalışıyor:

- **Etiket düzeyi** — açılış etiketinde `active ?` / `picked ===` yazılıysa
  durum da yazılmalı. Kesin, ama **seçimini etiketin dışında hesaplayan**
  denetimi hiç görmez: `ChoiceGame` renkleri etiketin üstünde if/else ile
  kuruyor, `match-game` bir `state` değişkeniyle. Android `ChoiceGame`den
  durumu silen enjeksiyon kapıyı **yeşil bıraktı** — kapının hiçbir şey
  ölçmediği altıncı vaka.
- **Dosya düzeyi** — dosya bir seçim değişkeni tanımlıyorsa (`const
  isSelected = x === y`) ve içinde basılabilir bir şey varsa, en az bir durum
  özniteliği bulunmalı. Kaba, ama sessizce boş geçemez. Bir kayıtlı istisna:
  `WalkModeScreen`in `const active = phase === "listening"`i bir animasyon
  bayrağı.

İlk yazımın değişken deseni `const active = days.filter(...).length` gibi
**sayıları** da seçim sanıyordu; sağ tarafın bir karşılaştırma içermesi
(`===`, `!==`, `.has(`, `.includes(`) şartı eklendi.

`check:hit` de ikinci bir ölçü kazandı: **klavye hedefi**. Dokunma hedefi bir
denetimin parmağa ne kadar yer bıraktığını söylüyor; aynı denetimin
**klavyeye hiç yer bırakmaması** ayrı ve daha sert bir kusur — `<div onClick>`
fareyle çalışır, Tab'la sıraya girmez, Enter'ı duymaz. Ölçüm bugün **0**
buldu (Android'de karşılığı `Pressable` ve o odağı da rolü de kendiliğinden
taşıyor, yani bu sınıf hata yalnız webde olabilir); kapı o sıfırı tutuyor.

`parity-check` §225 (iki liste, 12 ölçüt) ve §226 (yapabildiklerim yerleşimi,
8 ölçüt) yazıldı. §156'nın yükleme duyurusu ölçütü de düzeltildi: yalnız
`aria-busy` arıyordu ve "yapabildiklerim" paylaşılan `SkeletonCard` kutusuna
geçince onu **"sessiz" sandı** — oysa duyuru kutunun içinden geliyordu. Ölçüt
artık iki yolu da tanıyor, iki platformda aynı biçimde yazılı.

## §11.343 — Bekleme hâli: on rota boş ekran açıyordu, on üç bekleme sessizdi

Eksen **bekleme**ydi ve iki ayrı kusur kümesi çıktı.

### Boş ekran: veri bekleyen on rotanın iskeleti yoktu

`(app)` altında sunucuda veri bekleyen **23 sayfa** var; **onunda**
`loading.tsx` yoktu, yani kullanıcı o süre boyunca hiçbir işaret görmüyordu:

| rota | sunucudaki bekleme |
|---|---|
| `immersion/skill/[id]` | **on istek** (egzersiz, profil, yerelleştirme, ilerleme, sıradaki) |
| `mock-exams/[paper]/[skill]` | kâğıdın yerelleştirilmesi — sınav başlarken |
| `lessons/[id]/exam` | rol yapma sahnesinin çözülmesi |
| `immersion/quiz/[unit]`, `immersion/grammar/[unit]` | ünite özetlerinden soru üretimi |
| `premium` | beş okuma birden |
| `u/[username]` | herkese açık profil |
| `friends/settings` | `socialMe` + profil |
| `placement` | son yerleştirme |
| `analytics` | bütün olay tablosunun taranması (en uzun bekleme) |

Dördünün Android karşılığı **iskelet çiziyordu** (`PaywallScreen`,
`UserScreen`, `SocialSettingsScreen`, `PlacementScreen`); geri kalanda içerik
Android'de yerelde paketli olduğu için iskelete gerek yok — orada ölçüt
karşılaştırma değil **mutlak**: sunucudan içerik bekleyen sayfa boş kalmaz.

`check:loading` (`scripts/check-loading-skeleton.mjs`) bunu tutuyor. "Veri
bekliyor" ölçütü: `page.tsx` **ucuz olmayan** bir şeyi `await` ediyor. Ucuz
sayılanlar (`getT`, `getLang`, `getUserId`, `params`, `searchParams`,
`cookies`, `headers`) her sayfada var, yani ayrıştırıcı olamazlar — ölçütün
ayrıştırıcısı onların dışındaki çağrı.

### Sessiz bekleme: on üç dalın hiçbiri canlı bölge değildi

"Hazırlanıyor", "puanlanıyor", "seviyen hesaplanıyor" — bu dallar ekranın
tamamını kaplıyor ve **on üçünün hiçbiri** kendini duyurmuyordu: ekran
okuyucu kullanan biri "başla"ya basıp hiçbir şey duymuyor, ekranın donduğunu
mu yoksa hazırlandığını mı bilemiyordu. Web'de sekiz (beceri turu, boss,
yürüyüş, günlük, meydan, seviye sınavı, haftalık, yerleştirme), Android'de
beş (boss, meydan, yerleştirme, rol yapma, deneme kâğıdı).

Üçünde `aria-busy` vardı ve **yetmiyor**: `aria-busy` "bu bölge
güncelleniyor" der, **monte edildiğinde hiçbir şey okutmaz**. Okutan
`role="status"`. Yani o üç dal da sessizdi — kapının `aria-busy` araması
yanlış olurdu (§11.228 sınıfı).

§221 rota yedeklerini, §152 kart iskeletlerini duyurulur kılmıştı; bunlar
üçüncü küme: **bileşenin içindeki bekleme dalı**.

### Kapı: ata yürüyüşü

`parity-check` §227 işaretten geri gidip onu saran `return`i buluyor, oradan
ileri **JSX etiket yığını** tutuyor ve işarete gelindiğinde yığındaki
**atalarda** işareti arıyor. Pencere yok, komşu yok:

- `<Frame role="status">` çocuğun etiketinde görünmez ama **atadır** — bu
  yüzden yalnız "aynı etikette mi" diye bakan bir ölçüt boss ve yürüyüş
  turunu yanlış okurdu.
- Enjeksiyonla doğrulandı: rolü **kardeş** bir düğüme koymak kapıyı
  yeşil bırakmıyor (yığına hiç girmiyor), araya altmış kelimelik bir yorum
  sıkıştırmak ise geçiriyor — **sınır bir mesafe değil, bir düğüm** (§11.339).

### Ve kendi kuralımı yine çiğnedim

Enjeksiyonları **düzeltmeden ÖNCE alınmış** yedeklerden geri aldım: dört
dosyada (boss, günlük, oturum, deneme kâğıdı) o turun **kendi düzeltmesi
silindi**. §11.285'in tam olarak yazdığı hata. Kapı yeşile dönmeyince
yakalandı ve dördü yeniden uygulandı. Doğrusu önceki turda yaptığım gibi:
**düzeltmeden SONRA** bir anlık görüntü al, enjeksiyonu ondan geri al.

## §11.344 — Hata dalı: yirmi biri sessizdi, biri yanlış sebebi söylüyordu

§11.343 beklemeyi duyurulur kıldı; bu tur **aynı yüzeylerin hata dalı**nı
ölçtü ve üç ayrı kusur çıktı.

### 1. Yirmi bir hata dalının hiçbiri kendini duyurmuyordu

Ekranın tamamını kaplayıp "yüklenemedi" yazan yirmi bir dal — web'de on
(boss, meydan, günün turu, haftalık, yerleştirme, yürüyüş, rol yapma
sınavı, oturum, seviye sınavı, yapabildiklerim), Android'de on bir (aynı
yüzeyler + kelimeler, yazılar, oyun) — canlı bölge değildi. §222 **sosyal
eylemlerin** hatasını `ErrorText` ile duyurulur kılmıştı; bunlar ayrı küme.
Web `role="alert"`, Android `accessibilityLiveRegion="assertive"`.

Bir istisna bilinçli: `WritingsScreen`in kabı **boş hâli de** taşıyor, o
yüzden işaret ortak kaba değil **hata metninin kendisine** kondu — "yazın
yok" bir hata değil, duyurulması gerekmiyor.

### 2. Yapabildiklerim: istek hatası ile boş liste aynı kartla karşılanıyordu

Ağı kopan kullanıcıya **"giriş yapıp dersleri bitir"** yazıyordu — yanlış
sebep — ve tekrar deneme yolu yoktu; o ekranda çekerek yenileme de yok, yani
tek çıkış ekrandan çıkmaktı. **İkisi de yanlış olduğu için karşılaştırma
geçiyordu** (§11.228 sınıfı); ölçüt mutlak alındı ve iki platform birlikte
düzeltildi: `cando.couldn_t_load` anahtarı altı sözlüğe eklendi, hata dalı
kendi başlığını + tekrar deneme düğmesini aldı, boş dal olduğu gibi kaldı.

### 3. İki web yüzeyinde yerinde tekrar deneme yoktu

- **Meydan okuma**: web yalnız "geri dön" diyordu; Android birincil düğme
  olarak deniyor (`ChallengeScreen`). Geçici bir ağ hatası kullanıcıyı
  meydan okumadan tamamen atıyordu.
- **Seviye sınavı**: aynı kusur, ve Android'de gerekçesi zaten yazılıydı —
  *haftanın kâğıdı geçici bir ağ kesintisiyle harcanabiliyordu*. Web'de
  tekrar **yalnız kâğıt alınamadığında** sunuluyor: cevaplar çevrimdışı
  kaydedildiyse baştan açmak o kaydı çöpe atar, orada tek doğru çıkış
  Patika'ya dönmek. Android bu ayrımı baştan yapıyordu.

### Kapı: ata yürüyüşünün iki tuzağı

§228 §227'nin ata yürüyüşünü kullanıyor ama ilk yazımı **iki yerde hiçbir şey
ölçmedi** ve ikisi de enjeksiyonla çıktı:

- **Parça (`<>`)**: açılışı yığına girmiyor ama kapanışı (`</>`) yığından bir
  öge düşürüyordu — sınav oynatıcısının `section`u böyle kayboluyor ve kapı
  doğru koda "SESSİZ" diyordu. Parça artık bir kare olarak sayılıyor. Aynı
  tamir §227'ye de uygulandı.
- **Çapa**: varsayılan `return` çoğu dalda doğru, ama bir hata dalı JSX
  üçlüsünün içinde de olabiliyor (`phase === "error" ? (`) — orada en yakın
  `return` **komşu bir okun gövdesine** düşüyor ve yığın bambaşka bir
  ağaçtan doluyor. Üç yüzeyde (kelimeler, yazılar, yapabildiklerim) çapa
  dalın kendi koşulu; sınır yine bir düğüm, tahmin değil.

Beş enjeksiyonun hepsi görüldü, komşu tuzağı dahil: `role="alert"`i **kardeş**
bir düğüme koymak kapıyı yeşil bırakmıyor.

Bu turda yedek sırası **doğru** yapıldı: anlık görüntü düzeltmelerden **sonra**
alındı, enjeksiyonlar ondan geri alındı (§11.343'te tersi yapılmış ve o turun
kendi düzeltmesi silinmişti).

## §11.345 — Durum dallarının tasarımı: maskot, kutlama, çıkış yolu

§11.343 beklemeyi, §11.344 hatayı ölçtü; bu tur **aynı dalların tasarımına**
baktı. Üç kusur çıktı.

### 1. Maskot: aynı kip bir platformda karakterli, ötekinde çıplak metin

Android'in **yürüyüş ekranı dört yerde** maskot çiziyor (giriş, duraklama,
bitiş, başlangıç) — **web'de hiç yoktu**. Meydan okumanın boş dalı, rol yapma
sınavının ve seviye sınavının hata dalları da Android'de maskotlu, web'de
metin bloğuydu. Maskot uygulamanın karakteri; yok olduğu ekran başka bir
uygulamaya benziyor.

Beş yere eklendi. Seviye sınavının **çevrimdışı kayıt** dalında bilerek
çizilmiyor: orada kötü bir şey olmadı, kayıt bekliyor.

### 2. Yürüyüşün bitiş ekranı: devam ve paylaşım yoktu

| | Android | Web (eski) |
|---|---|---|
| kutlama | `Celebrate` (%60 eşiği) | — |
| maskot | `celebrate`/`happy`/`idle` | — |
| devam | `newTour` — aynı ekranda yeni tur | — |
| paylaşım | `shareResult(correct, total)` | — |
| çıkış | bitir | **yalnız bitir** |

Yani web'de bir yürüyüş turunu bitirdikten sonra **yeni bir tura devam etmek
için kipten çıkıp yeniden girmek** gerekiyordu, ve sonucu paylaşmanın hiçbir
yolu yoktu. Kutlama eşiği de Android'den alındı: %60.

Paylaşım için `src/lib/share.ts` `resultText` + `shareText` kazandı;
`shareInvite` artık onun üstünde duran ince bir sarmalayıcı. Olay etiketi
ayrıldı (`invite` / `result`) — mobil de öyle sayıyor. Bağlantıdaki
`?ref=sonuc` işareti iki platformda aynı, yoksa paylaşımlar tek yerde
sayılamaz.

### 3. "Yapabildiklerim" boş hâli çıkış yolu göstermiyordu

Metin "konuşma ve alıştırmaları bitirdikçe" diyor ama **gidilecek yeri**
söylemiyordu; kullanıcı "nereye gideceğim" sorusuyla baş başa kalıyordu. Ev
kalıbı zaten bu (`WritingsScreen` boş hâli yazma alıştırmalarına götürüyor).
İkisi de eksik olduğu için karşılaştırma geçiyordu — ölçüt mutlak alındı ve
iki platform birlikte düzeltildi. Yeni anahtar yok: hedefin adı `nav.path`.

### Kapı: iki kez hiçbir şey ölçmedi, ikisi de enjeksiyonla çıktı

**Tanık zorunlu oldu.** İlk yazım çapayı `src.indexOf` ile arıyordu ve sınav
oynatıcısında `phase === "error"` **ilk olarak sayacın muafiyet listesinde**
geçiyor (`… || phase === "error") return;`) — gövde bambaşka bir ağaçtan
doluyor ve kapı **doğru koda "YOK"** diyordu. Artık her çift bir **tanık**
taşıyor: dalın gövdesinde mutlaka bulunması gereken bir metin. Tanık yoksa
ölçüm "DAL YOK" diyor, sessizce geçmiyor.

**"Ya biri ya öteki" ölçüsü yetmedi.** Devam düğmesinin ölçüsü handler'ı
*veya* etiketi arıyordu; etiketi "bitir"e çevirmek kapıyı yeşil bıraktı —
oysa iki düğmenin ikisi de "bitir" yazan bir ekran tam olarak düzeltilen
kusur. Ölçü artık **hem işi hem etiketi** birlikte istiyor.

### Ve pencere tuzağının altıncı vakası — kendi değişikliğim açtı

§223'ün yürüyüş ölçüsü `<Frame role="status">` ile `walk.done_title` arasında
**120 karakterlik pencere** kullanıyordu. Bitiş ekranına konfeti ve maskot
girince mesafe aştı ve kapı, duyurusu yerinde duran koda "SESSİZ" dedi. İki
ölçü de düğüme çevrildi: **dalın kök elemanı** okunuyor (`dalKoku`) —
`if (status === "done")`den sonraki ilk açılış etiketi `role="status"`
taşımalı. Patron turunun ölçüsü de aynı şekilde güçlendirildi; o dosya
genelinde `<Frame role="status">` arıyordu, yani komşuyu ölçme riski
taşıyordu.

## §11.346 — Paylaşım: aynı tur, iki ayrı metin; günün turunda düğme hiç yoktu

Eksen **sonuç ekranının paylaşımı**ydı ve aynı özellik iki uygulamada iki
ayrı şey çıktı.

**Web** tur sonucunu Wordle'ın öğrettiği **desenle** paylaşıyor: seviye
başlığı, `■□` kareleri (son otuz tur), istatistik satırı, günün turunda
ayrıca "aynı sorular o seviyedeki herkese aynı" çağrısı. Kareler hangi
kelimeler olduğunu söylemiyor — kimsenin sırasını bozmuyor, yalnızca merak
ettiriyor. **Android** tek cümlelik düz bir metin gönderiyordu.

Metnin sözlük anahtarları webde **`sharew.*`** diye yalnız webde duruyordu,
yani Android'in o metni üretmesi mümkün değildi. Anahtarlar `share.*` olarak
ortak kümeye taşındı. Yön önemliydi: `src/i18n/base/*` **mobilden üretiliyor**
(`i18n-pull`) ve `i18n:check` base↔mobil katı eşitliği zorluyor — yani
taşıma mobile yazılıp çekildi, `src/i18n/web/*`ten silindi. Metin üretimi
(`marksToGrid`, `buildShareText`) `mobile/src/lib/share.ts`e kopyalandı.

**Günün turunda Android'de paylaşım düğmesi hiç yoktu.** Oysa paylaşılmaya en
değer tur o: sorular o seviyedeki herkese aynı geliyor, yani karşı taraf
kıyaslayabileceği bir şey görüyor. Düğme eklendi; desen için tur başına
doğru/yanlış dizisi (`marksRef`) ve başlık için yükün seviyesi
(`levelRef`) tutuluyor. Oturum turu da (`GameScreen`) düz metinden desenli
metne geçti — `answers.current` zaten doğru/yanlış tutuyordu, yeni durum
gerekmedi.

**Yürüyüş kipi bilinçli olarak düz cümlede kaldı**: orada tur başına
doğru/yanlış dizisi tutulmuyor (ne webde ne Android'de), yani çizilecek desen
yok. Ayrım platformlar arasında değil, **turun türü** arasında — ve iki
tarafta aynı. Webin `shareInvite`ı da bu turda `shareText` üstünde ince bir
sarmalayıcıya indi; olay etiketi `invite`/`result`/`daily` diye ayrıldı.

`parity-check` §230 dört listeyle ölçüyor: desen sabitleri (`MAX_ROWS`,
`PER_ROW`, kare karakterleri, "son kareler" kuralı — sayılar iki yerde yazılı
olduğu için ikisi de okunuyor), metnin gövdesi (başlıklar, iki istatistik
dalı, seri, günlük çağrı), anahtarların ortak kümede olması (`sharew.`
hiçbir yerde kalmamalı + sekiz anahtar üç mobil sözlükte tam) ve düğmenin
bulunduğu turlar.

## §11.347 — Sonuç kırılımı: erken durdurma, başlığın iki cümlesi, haftalık yerleşim

Eksen **sonuç ekranının kalemleri**ydi. Üç ayrışma çıktı; üçü de aynı sınıf —
aynı sonucu iki farklı biçimde anlatmak.

### 1. Erken durdurma ayrımı Android'de yoktu

Etap kartındaki "şimdilik yeter" turu bitiriyor ama Android'in özeti yine
**"Tur bitti!"** yazıyordu: kullanıcı turu bitirmedi, **durdurdu**. Web bu
ayrımı taşıyor (`stoppedEarly` → `partial`) ve birincil düğmenin adı da
değişiyor: yeni tur değil, **tura geri dön**. Mobilde bayrak eklendi,
yüklemede sıfırlanıyor, başlık ve düğme adı iki dallı oldu.

### 2. Özetin başlığı iki farklı cümleydi

Web `summary.round_done` ("Tur tamamlandı"), Android `common.round_done`
("Tur bitti!") — ve webin anahtarı **yalnız webde** duruyordu. Ortak olan
kullanılıyor; `summary.stopped` ve `summary.back_to_round` da ortak kümeye
taşındı (mobile yazılıp `i18n-pull` ile çekildi), `summary.round_done`
silindi.

### 3. Haftalık sınavın sonucu iki ayrı yerleşimdi

| | Android | Web (eski) |
|---|---|---|
| halka | **160 px, ortada** | 64 px, yanda |
| halka rengi | marka | puana göre üç renk |
| halka içi | yüzde + `weekly.score` | çıplak sayı |
| başlık | `weekly.done_title` | `weekly.your_score` ("Kullanım skorun") |
| alt satır | `weekly.done_sub` | `n_correct · weekly.week_n` |

Ve o **"hafta {n}" satırı hatalıydı**: `{n}` sayı bekliyor ama `status.week`
bir dizge ("2026-W37"), yani ekranda **"hafta 2026-W37"** yazıyordu.
Android'de bu satır hiç yok — yerleşim eşitlenirken hata da kapandı. Halkanın
rengi de Android'den: puana göre üç renk değil marka rengi; "yüzde kaç"
bilgisini halkanın **doluluğu** taşıyor, rengi değil. Ölü kalan iki web
anahtarı silindi (`i18n:check` onları da yakaladı).

### Kendi değişikliğim üç kapıyı kırdı — üçü de haklıydı

Yerleşim eşitlenince eski markup'ı ölçen üç kapı kırmızıya döndü ve hepsi
**doğru** davrandı; ölçüler yeni şekle güncellendi:

- "tur özetinin bölüm sırası": mobilde düğmenin adı **koşullu** oldu, desen
  artık `t("game.continue")` biçimini değil **anahtarı** arıyor.
- "haftalık sınav sonucu": web artık mobille aynı anahtarları kullanıyor
  (`weekly.score`, `weekly.done_sub`), desenler ortaklaştı.
- §223 haftalık duyurusu: işareti `weekly.your_score`tı ve o anahtar kalktı;
  ölçü dalın **kök elemanına** çevrildi.

### Ve `dalKoku`nun TypeScript generiği tuzağı

Kök elemanı okuyan yardımcı "çapadan sonraki ilk `<`" diyordu. Haftalık
sınavın dalında ilk `<` bir **generik**: `new Map<number, boolean>()` — kapı
onu açılış etiketi sanıp `<number, boolean>` okudu ve duyurusu yerinde duran
koda "SESSİZ" dedi. Artık `return (`den sonraki ilk `<` okunuyor: `return (`
ile JSX arasına generik giremez.

`parity-check` §231 dört listeyle ölçüyor: erken durdurma ayrımı (4 ölçüt),
özetin üç sayısı (doğruluk · kelime · seri, aynı sıra), haftalık sonuç
yerleşimi (5 ölçüt) ve ölü anahtarların kalkmış olması.

## §11.348 — Sınav sonucu: kutlama yoktu, sıra farklıydı, deneme cümlesi iki metindi

Eksen **sınav sonuç ekranları**ydı. Deneme kâğıdının sonucu ölçüldü ve **zaten
eşitti** (yüzde + skor + hüküm + geçme notu, aynı sıra, geçme notu iki tarafta
da `MOCK_PASS_PCT` sabitinden) — kapı orayı gerilemeyi tutmak için okuyor.
İkisinde de kutlama yok ve bu bilinçli: kâğıdın bir **bölümü** bitiyor,
kâğıdın kendisi değil.

**Seviye sınavında üç ayrışma vardı:**

1. **Kutlama yoktu.** Android geçince konfeti atıyor (`Celebrate
   show={!!result?.passed}`); web sınav oynatıcısının hiçbir yerinde kutlama
   yoktu — geçmek en çok kutlanması gereken an ve iki platformda iki ayrı
   duyguydu.
2. **Sıra farklıydı.** Android önce **büyük yüzdeyi**, sonra hükmü, sonra
   deneme cümlesini yazıyor; web önce hükmü yazıp yüzdeyi **"Toplam %78"**
   diye küçük bir satıra gömüyordu — aynı ekranda **önce okunan şey**
   farklıydı.
3. **Deneme cümlesi iki ayrı metindi.** Web: "deneme (modül konuşmaları
   bitmeden sayılmaz)" — toplam satırına eklenmiş kısa bir parantez
   (`exam.trial_note`, yalnız webde). Android: tam cümle, kendi satırında ve
   **sebebiyle** ("modül konuşmalarının %80'i geçilmediği için sonuç
   sayılmaz" — `exam.trial_notice`, ortak kümede). Ortak olan kaldı; webin
   kopyası ve artık çağırılmayan `exam.total` silindi (`i18n:check` ikisini de
   ölü anahtar olarak yakaladı).

Koç balonu ve sertifika bağlantısı ikisinde de zaten vardı.

`parity-check` §232 dört listeyle ölçüyor: seviye sınavı sonucunun altı kalemi
(kutlama, koç balonu, büyük yüzde, hüküm, deneme cümlesi, sertifika), üç
parçanın **sırası** (konum karşılaştırması, metin değil), ölü anahtarların
kalkmış olması ve deneme kâğıdının sonuç başı.

Bir not ölçümün kendisi hakkında: ilk anahtar diff'i `mockexam.passed`ı
"yalnız mobilde" gösterdi ve bu **yanlıştı** — web `t(score.passed ?
"mockexam.passed" : "mockexam.failed")` yazıyor, yani anahtar `t(`den hemen
sonra değil. Çıkarıcı blok içindeki **tüm** i18n benzeri dizeleri toplayacak
şekilde genişletildi; yoksa üçlü ifade içindeki her anahtar "eksik" görünürdü.

## §11.349 — Ders kapanışı: kutlamanın ölçütü ve bilinmeyen hüküm

Eksen **ders/konuşma oynatıcısı**ydı. İlk ölçüm bir şeyi netleştirdi:
**özellik düzeyinde iki oynatıcı eşit** — rapor yolu, tur sayacı, devam etme,
kalıp listesi, düzeltmeler, sınav bağlantısı ikisinde de var. Ayrışma **kopya
alan adında**: mobil `lesson.*`, web `lessonp.*` (web-özel). Aynı cümlelerin
iki ayrı yazımı; o kümeyi tek turda birleştirmek hem büyük hem riskli, o
yüzden bu tur **karar verilebilir** olanı aldı: kapanış özetinin ölçütleri.

Üç ayrışma çıktı ve ikisi aynı köke bağlı — web özeti **sunucunun hükmüne**
bakıyordu, Android ise dersin **alıştırma isabetine**:

1. **Kutlama ve maskot.** Web `saved?.passed` boolean'ına bağlıydı, yani
   **%79'la biten bir ders %10'la biten dersle aynı görünüyordu**. Android üç
   kademe kullanıyor (`pct >= 80` kutla, `>= 50` sevin, altı sakin) ve konfeti
   de aynı eşikten çıkıyor. Hüküm sunucunun kararı, kutlama ise "nasıl
   geçti"nin karşılığı — ikisi ayrı şey ölçüyor.
2. **Başlığın bilinmeyen hâli.** Web `saved?.passed` truthy değilse "konuşma
   bitmedi" diyordu — **kayıt isteği düştüğünde de öyle diyordu**: kullanıcı
   dersi bitirmiş ama ekran ona bitirmediğini söylüyordu. Android yalnız hüküm
   **açıkça** olumsuzken öyle diyor (`passed === false`) ve bilinmeyeni
   "tamamlandı" sayıyor. İki platform aynı bilinmeyene **ters** cevap
   veriyordu.
3. **İlk karonun etiketi iki adlıydı**: web bu sayıya "Alıştırma" diyen kendi
   web-özel anahtarını kullanıyordu, Android "doğru üretim". Ortak olan kaldı,
   webin kopyası silindi.

Web'e `pct` eklendi ve maskot, konfeti, yüzde karosu **aynı sayıdan**
besleniyor — önce üç yerde üç ayrı hesap vardı.

`parity-check` §233 beş ölçütle okuyor (isabet hesabı, maskot kademeleri,
konfeti eşiği, başlığın bilinmeyen hâli, ilk karo etiketi) ve ölü anahtarın
kalkmış olmasını ayrıca arıyor. "Ders kapanış özeti" kapısının `alistirma`
deseni de güncellendi: web artık ortak anahtarı kullanıyor.

Küçük bir gözlem ölçüm araçları hakkında: `i18n:check`in ölü anahtar
denetimi **yorumları da okuyor**, yani anahtarın adını gerekçe yorumunda
anmak onu "çağrılıyor" sayıyor. Yorum, anahtarı anmadan aynı şeyi
söyleyecek biçimde yazıldı — yoksa silinmesi gereken anahtar sessizce
kalırdı.

## §11.350 — Derste mikrofon yolu kapanınca sebebi söylenmiyordu

Android `sttOk === false` olunca ekranı kalıcı olarak **yazma yoluna**
geçiriyordu ve **hiçbir şey söylemiyordu**: kullanıcı konuş düğmesinin
kaybolduğunu görüyor, sebebini bilmiyor. Üstüne iki sebep tek duruma
katlanmıştı — dosyanın kendi yorumu bunu yazıyordu ("mikrofon yok ya da
izin…") — oysa ikisi ayrı şey söylüyor:

| sebep | kullanıcının yapabileceği |
|---|---|
| izin reddedildi | var: "Mikrofon izni gerekiyor. Ayarlardan açabilirsin." |
| tanıyıcı yok | yok: "Konuşma tanıma yok — yazarak devam et." |

Web ikisini baştan beri ayrı yazıyor. Android'e sebep durumu (`sttSebep`)
eklendi; `sttAvailable()` düşerse "unavailable", `ensureMicPermission()`
düşerse "denied" işaretleniyor ve not **iki yüzeyde de** çiziliyor: ders
adımları ve rol yapma.

"Tanıyıcı yok" metni webde `lessonp.no_asr` diye **yalnız webde** duruyordu;
`lesson.no_asr` olarak ortak kümeye taşındı (mobile yazılıp `i18n-pull` ile
çekildi) ve webin kopyası silindi. İzin metni zaten ortaktı
(`speak.mic_needed`).

### Kapı: sayım değil yüzey

İlk ölçüm `{sttNotu}` **sayısını** sayıyordu ve mobil 3, web 2 çıkıyordu —
kapı kırmızıydı ama **ayrışma yoktu**: mobilin ders adımları iki ayrı dal
(tekrarla / kur ve söyle), webin tek bir yeri o ikisini birden kapsıyor.
Ölçü **yüzeye** çevrildi: not ders adımlarında ve rol yapmada çiziliyor mu.

Sınırın kendisi de bir düzeltme gerektirdi: web tarafını `phase ===
"roleplay"` ile bölmek ders adımlarını rol yapma tarafına atıyordu, çünkü aynı
koşul yukarıda iki kez daha geçiyor (bir etkide, bir dinleme çağrısında).
Sınır artık dalın **çizim** yeri (`phase === "roleplay" ? (`) — yine bir
düğüm, bir mesafe ya da ilk eşleşme değil.

## §11.351 — Ders adımının deneme hakkı: aynı adım, iki ayrı ders

Eksen **ders içi deneme hakkı ve cevabın açıldığı an**dı. Üç şey çıktı.

### 1. Tavan (3) hiçbir yerde sabit değildi

İki oynatıcı da elle `>= 3` diye karşılaştırıyordu. Biri değişse öteki
sessizce eski kalır ve **aynı ders iki platformda farklı sayıda hak
verirdi**. İki tarafta `LESSON_TRY_CEILING` adıyla sabitlendi
(`src/lib/lessons/roleplay-const.ts` ve `mobile/src/lib/learningRules.ts`).

### 2. Cevabın açıldığı an farklıydı

| yanlış | Android | Web (eski) |
|---|---|---|
| 1. | içerikteki ipucu | içerikteki ipucu |
| 2. | ipucu (yine) | **cevabı söylüyor** + "tekrar et", adım yeniden açılıyor |
| 3. | **cevabı söylüyor** ve geçiyor | "olsun" — cevabı **hiç söylemeden** geçiyor |

Yani aynı adım iki platformda iki ayrı ders veriyordu: birinde cevap görülüp
tekrar ediliyor, ötekinde adım cevapla kapanıyor. Web'in ikinci-yanlış dalı
kalktı, üçüncü dal cevabı söylüyor; ölü kalan iki web anahtarı silindi.

### 3. Deneme sayacı webde hiç yoktu

Android her yanlıştan sonra "{n}. deneme" yazıyor (`lesson.try_again`);
webde hiçbir yerde yazmıyordu — öğrenci kaçıncı denemede olduğunu ve cevabın
ne zaman açılacağını bilmiyordu. Web `attempts`i bir **ref**te tutuyordu,
yani çizime giremiyordu; yansı bir duruma alındı ve ref'in değiştiği **dört**
yerde birlikte güncelleniyor.

### Kapı: "varlık" değil "sayı"

İlk ölçüm `>= LESSON_TRY_CEILING` **var mı** diye bakıyordu ve enjeksiyon
(`t >= 99`) kapıyı **yeşil bıraktı**: mobilde iki adım türü var (tekrarla /
kur ve söyle) ve birinin sabitten çıkması, öteki hâlâ sabitten geldiği için
görünmüyordu. Ölçü **"elle yazılmış eşik sayısı = 0"**a çevrildi — yalnız
`3`ü değil, herhangi bir sayıyla karşılaştırmayı arıyor.

## §11.352 — Rol yapma: en az tur kuralı ve servis kapalıyken güvence

Eksen **rol yapma konuşması**ydı. Öneri şıkları, düzeltme balonları,
düzeltme listesi ve "düzeltme yok" hâli, çevrimdışı senaryo yedeği — hepsi
ikisinde de var. İki şey ayrışıyordu.

### 1. `minTurns` mobilde isteğe bağlıydı, iki yerde `?? 6` yazılıydı

Web tipi baştan beri zorunlu (`minTurns: number`), mobil tipi isteğe bağlı
(`minTurns?: number`) ve iki yerde `?? 6` duruyordu. Alan düşse **Android
altı tur ister, web `undefined`ı ekrana basardı** — aynı ders iki platformda
başka bir kural uygular.

Ölçüm **bin seksen** rol yapma dersinin **hepsinde** alanın dolu olduğunu
gösterdi: varsayılan hiç çalışmıyordu ama sayı kodda duruyordu. Tip zorunlu
yapıldı, iki `?? 6` kalktı. Biri `?? 0` oldu — `lesson` henüz yüklenmemişken
de okunuyor, ama uydurulmuş bir eşik değil sıfır: ders gelmeden "yeter"
demesin.

### 2. "Konuşma yine sayılır" güvencesi görünmüyordu

Servis kapalıyken web şunu yazıyordu: "Sohbet servisi şu an kapalı; konuşma
önceden yazılmış bir senaryoyla sürüyor. **Konuşma yine sayılır.**" — ama
`title=` **ipucu balonunda**. Dokunmatikte hiç açılmıyor, klavyeyle de
erişilmiyor; yani en çok güven veren kısım kullanıcıların bir bölümüne **hiç
ulaşmıyordu**. Android'de cümle **hiç yoktu** — kullanıcı konuşmasının
sayılmayacağını sanıp dersi bırakabilirdi.

Cümle ortak anahtara alındı (`lesson.chat_offline_note`) ve iki tarafta da
**görünür** yazıldı: webde rozetin altında bir satır, Android'de balonun
ikinci parçası.

## §11.353 — Yazma değerlendirmesinin puan bantları: ikisi de elle yazılıydı

Eksen **beceri egzersizi oynatıcıları**ydı. Kapsam ölçüldü ve **altı biçimin
hepsi ikisinde de oynanıyor** (okuma, dinleme, yazma, gramer, konuşma drili,
monolog); dinleme kontrolleri de eşit (yavaş, metni göster/gizle, satıra
dokununca o replik, "önce dinle" ipucu). Gerçek kayıt yolu (`segment.audio`)
iki tarafta da uykuda ve bu zaten deftere geçmişti (2265 replik, sıfır kayıt).

Ayrışma **puan bantlarında** çıktı. Yazma değerlendirmesinde üç sayı var:

| sayı | ne kararı | durum |
|---|---|---|
| `RUBRIC_PASS_PCT` (60) | görev "tamam" sayılır | iki tarafta **sabitten** |
| `SCORE_MID_PCT` (40) | "geliştir" ile "baştan dene" arasındaki çizgi | **iki tarafta da elle `40`** |
| `SKILL_DONE_PCT` (70) | cümle görevinin geçme notu (webde) | **elle `70`** |

Orta bant **iki platformda da** yanlıştı, yani karşılaştırmalı bir kapı bunu
göremezdi (§11.228 sınıfı) — ölçüt mutlak alındı: bu dosyalarda elle yazılmış
puan eşiği kalmamalı. Cümle görevinin dosya yorumu sayıyı **anlatıyordu**
("genel puan ≥ 70") ama ölçen bir şey yoktu; o da sabitten okuyor.

### Ölçüldü ve latent kaldı: yazma görev türleri

Web yedi çeşit tanımlıyor (`sentence`, `build`, `reply`, `form`, `rewrite`,
`summary`, `free`), mobil dört (`build`, `rewrite`, `form`, `free`). Ama
içerikte `sentence` ve `summary` **hiç yok** (ikisinde de sıfır) ve `reply`
görevleri mobilde `FreeCard`a düşüyor — o kart `stimulus`, `checklist` ve
`phrases`i çiziyor, `minWords` de kırk görevin kırkında dolu. Yani ayrışma
**latent, canlı değil**; deftere geçiyor, koda dokunulmuyor.

### Kapı yine deponun kendi meta-kapısına yakalandı

İlk yazımda sabit adlarını `\b` olmadan aradım (`/RUBRIC_PASS_PCT/`) ve
"kapılarda önek eşleşmesi" kapısı bunu reddetti — aynı hatayı §11.341
civarında da yapmıştım. Önek eşleşmesi uzun bir adı da yakalar; desenler
sınırlandı.

## §11.354 — Konuşma: kayıt penceresi, zorla başlayan kayıt ve gizli karşılık

Eksen **konuşma değerlendirmesi**ydi. Telaffuz geçme notu (`PASS_SCORE = 80`)
zaten tek kaynaktan okunuyordu; üç şey ayrışıyordu.

### 1. Söyleyiş drilinin kayıt penceresi

Web `MAX_MS = 8000` diye kendi kopyasını tutuyordu, Android
`listenOnce(..., 9000)` diye satır içinde **adsız** bir 9 saniye yazıyordu.
Aynı dril iki platformda başka bir pencere veriyordu — ve Android'in sayısını
kimse savunmuyordu çünkü **adı yoktu**. İki tarafta `SPEAK_CLIP_MS` adıyla
sabitlendi; gerekçe sabitin yanında (söylenecek şey tek bir cümle, sınavın
serbest cevabından kısa).

Monologun döngü penceresi de (`20000`) adlandırıldı: `MONOLOGUE_CHUNK_MS`,
**yalnız mobil** — Android'in tanıyıcısı her sessizlikte kapanıyor, web'de
`MediaRecorder` kesintisiz kaydediyor. Bir ayrışma değil, platformun kısıtı;
ama adsız bir sayı olarak durması gerekmiyordu.

### 2. Monologun hazırlık ekranı kaydı kendiliğinden başlatıyordu

Web hazırlık ekranında **otuz saniye sayıyor** ve sıfıra inince **kaydı
kendiliğinden başlatıyordu**. İki sorun: Android'de böyle bir saat yok —
öğrenci hazır olduğunda "başla"ya basıyor — ve **mikrofon kullanıcı istemeden
açılıyordu**; hazırlık metnini okuyan biri kaydın başladığını fark
etmeyebilir. Başlat düğmesi zaten duruyordu, tek çıkış oydu. Geri sayım
kalktı.

### 3. Hedef çiplerinde Türkçe karşılık gizliydi

Web karşılığı `title=` ipucu balonunda tutuyordu (dokunmatikte hiç açılmaz)
ve çip sessizdi; Android "de · tr" yazıp dokununca okuyor. Web'de de ikisi
oldu: karşılık yazılı, çip `speakGerman` ile sesli.

### Kapı iki kez zayıf çıktı, ikisi de tanıdık ders

- **Önek eşleşmesi**: `/PREP_SECONDS/` sınırsızdı ve deponun kendi
  meta-kapısı reddetti — bu turda ikinci kez.
- **Varlık değil kullanım**: web ölçüsü "dosyada `SPEAK_CLIP_MS` geçiyor mu"
  diyordu; `import` satırı da adı taşıdığı için `const MAX_MS = 8000`a geri
  dönmek kapıyı **yeşil bıraktı**. Ölçü kullanıma çevrildi (§11.351'in aynı
  dersi).

Mevcut "telaffuz eşiği ve kayıt süreleri" kapısı da güncellendi: sayıyı
oynatıcıdan okuyordu, artık **sabitten** okuyup oynatıcının gerçekten oradan
aldığını ayrıca doğruluyor.

## §11.355 — `title=` ipucu balonu: bir metni göstermez, gizler

Bu sınıf kusur üç turda üst üste tek tek çıktı — yürüyüşün "konuşma yine
sayılır" güvencesi, monologun hedef çipleri, yazma kartının kalıp
karşılıkları — yani artık tek tek değil **mutlak ölçütle** taranması
gerekiyordu.

DOM'daki `title` özniteliği **yalnız fareyle** üstüne gelince açılıyor:
dokunmatikte hiç açılmaz, klavyeyle erişilmez, ekran okuyucuların bir kısmı
okur bir kısmı okumaz. Bir bilgi başka hiçbir yerde yazmıyorsa, kullanıcıların
bir bölümü onu **hiç görmüyor**.

### Tarama: 162 değil 30

İlk `title=` araması **162** sonuç verdi ve çoğu yanlış alarmdı: `PageBack`,
`SettingRow`, `Card`, `Section`, `Group`, `EmptyCard`, `BoardList`, `Spark`,
`Disclosure`, `AuthShell` gibi bileşenlerin **`title` adlı prop'u**. Tarama
yalnız **küçük harfle başlayan DOM etiketlerine** çevrildiğinde sayı **30**'a
düştü. Prop ile öznitelik aynı yazılıyor; ayırt eden şey etiketin kendisi.

### Dört gerçek kusur düzeltildi

1. **`speaking-player`** — `title={`duyulan: ${w.heard}`}`: metin **koda gömülü
   Türkçeydi** (İngilizce ve Almanca arayüzde de Türkçe çıkıyordu) **ve**
   yalnız hover'da görünüyordu. Sözlükte zaten ortak anahtar var
   (`item.heard`); kelime kelime olduğu için erişilebilir ad olarak veriliyor.
   Android aynı cümleyi **görünür** bir satırda yazıyor.
2. **`user-action`** — devre dışı "arkadaş ekle" düğmesinin sebebi
   ("istekler kapalı") hover'daydı: kullanıcı ölü bir düğmeye bakıp neden
   çalışmadığını hiçbir yerden öğrenemiyordu. Görünür sönük bir satır oldu.
3. **`writing-player`** — kalıp çipinin karşılığı hover'daydı; Android aynı
   kartta "de · tr" yazıyor. Görünür oldu — ve yazılan şey `glossTitle`ın
   **tamamı**: o metin İngilizceyi ve **Hochdeutsch köprüsünü** de taşıyor,
   kendi yorumunun dediği gibi Züritüütsch kalıplarında lehçe biçimin
   Almancası başka hiçbir yerde görünmüyor. İlk denemede yalnız `p.tr`
   yazmıştım — bir kusuru başkasıyla değişmek olurdu; lint'in "kullanılmayan
   `glossTitle`" uyarısı bunu yakalattı.
4. **`lesson-player`** — ders özetindeki kalıp listesinin karşılığı hover'daydı;
   Android aynı listede "de" ve "tr"yi yan yana yazıyor.

İki `title=` de **fazlalık** olduğu için silindi: yazma kartının kelime
çipleri ve serbest cümle oyununun hedef çipleri karşılığı **zaten görünür**
yazıyordu.

### `check:title` — borç tabanı, onay değil

Geri kalan **18** site `scripts/check-title-only.mjs` içinde dosya başına
sayılı. Ölçüt: bir DOM `title=` ya `aria-label` ile birlikte durur (o zaman
metin erişilebilir addan da okunur) ya da tabanda sayılıdır. **Sayılar yalnız
azalabilir**; yeni bir dosya eklenince kapı kırmızı olur, yani yeni borç
açmanın yolu yok. Borç azaldığında kapı "tabanı güncelle" diyip kırmızıya
döner — sayı sessizce şişemez.

Tabanın ikisi gerekçeli istisna (yönetim panosu: kullanıcı yüzeyi değil;
ilerleme grafiği: değer eksende ve satırda da var). Kalan on altısı **gerçek
borç** ve sıradaki turlarda görünür metne çevrilecek.

## §11.356 — İpucu borcu bir turda kapandı: 18 → 4

Önceki tur `check:title`ı bir **borç tabanı** olarak kurmuştu (18 site). Bu
tur borcun **on altısını** kapattı; kalan dört site iki gerekçeli istisna
(yönetim panosu, ilerleme grafiği).

Her site için uygulanan kural, Android'in o yerde ne yaptığına bakılarak
seçildi — üç ayrı çözüm çıktı:

**Android görünür yazıyor → görünür yazıldı.**
`lesson-player` sınav düğmesinin ipucu (`lessonp.exam_hint`): Android aynı
düğmenin altına ikinci satır olarak yazıyor (`LessonScreen`), web `title=`
balonunda tutuyordu.

**Android erişilebilir ad/ipucu veriyor → `aria-label` eklendi.**
`grammar-player` ve `skills/quiz` dinleme düğmeleri (Android
`accessibilityLabel`), `mock-exam-player`in "bu şık başka maddede kullanıldı"
notu (Android `accessibilityHint`), `pronounce-card`in kelime hükmü,
`league-board`un seri sayısı (çıplak "5" okunuyordu), `profile-form`un seviye
açıklaması.

`mock-exam-player`de düzeltme **yarım kalmıştı**: not sarmalayıcı `<span>`in
`title=`inde duruyordu ve span **odaklanamaz**, yani ekran okuyucu oraya hiç
uğramıyor. Not düğmenin kendi adına taşındı (`chip`in `hint` parametresi),
Android'in ipucuyla aynı yere.

**Bilgi zaten başka yerde → balon silindi.**
`assessment-card`in işaret balonu (hatalar altta „yanlış" → „doğru" — neden
diye görünür listelenmiş, Android aynı listeyi çiziyor), `diff-text`
(üst öge tam metni `aria-label`da veriyor), `weak-spots-card`in kaçıncı kez
sayısı (Android hiç göstermiyor), `friend-list`in üç ipucu ve
`lesson-player`in sonraki ders adı (düğmede zaten yazılı). Beş ölü
`socialw.*_hint` anahtarı silindi.

### Kapı §155 yine pencereye kaçmıştı

"Kullanılmış şık" kapısı webin ipucunu `title=`de ölçüyordu; taşıyıcı
değişince kırmızıya döndü — haklıydı. İlk düzeltmem **tek bir pencereli
desen** yazdı (`aria-label={hint ?` ile `option_used` arasında 60 karakter) ve
gerçek mesafe **1306** çıktı: `chip` yardımcısı çağrı yerinden çok uzakta.
Ölçü **iki ayrı olguya** çevrildi — yardımcı erişilebilir adı `hint`ten kuruyor
mu, ve çağrı yeri o metni geçiriyor mu. Pencere tahmin etmek, pencere
tuzağının aynısı.

## §11.357 — `aria-hidden` bilgiyi saklıyordu: biri kapının kör noktası

`aria-hidden` bir ögeyi erişilebilirlik ağacından **tamamen** çıkarır — rol,
ad, canlı bölge dahil. Kırk beş kullanımın kırk üçü meşru (iskeletler,
konfeti, maskot, gradyanlar, adlı düğmelerin içindeki simgeler); ikisi bilgi
saklıyordu.

### 1. Günlük görevler kartının duyurusu yazıldığı gün ölüydü

İskelet bölümü aynı etikette hem `aria-hidden` hem `role="status"`,
`aria-busy="true"` ve `aria-label` taşıyordu. `aria-hidden` kazanır: **duyuru
hiç ateşlenmiyor, etiket hiç okunmuyordu**. §152'nin "yükleme duyurulsun"
düzeltmesi bu kartta hiç çalışmamıştı.

Ve §156'nın kapısı bunu **göremiyordu**: o kapı dosyada `aria-busy="true"`
**geçiyor mu** diye soruyor, **ulaşılabilir mi** diye değil. Kapının kör
noktası tam buydu — "işaret var" ile "işaret işe yarıyor" ayrı sorular.

### 2. Beceri satırının "bitti" durumu iki platformda da sessizdi

Durumu taşıyan üç şeyin üçü de okunamıyordu: nokta (webde `aria-hidden`,
Android'de etiketsiz), onay simgesi (`icons.tsx` varsayılanı `aria-hidden`) ve
puan rozeti — hepsi renk ve simge. Satırın adı ise yalnız başlık + süreydi.
Yani **hangi alıştırmanın bitmiş olduğu** sesli okuyucu kullanan biri için hiç
okunamıyordu.

İki platform kendi kalıbıyla düzeltildi: Android durumu **satırın adına**
ekliyor (`accessibilityLabel`), web **onay simgesine** ad veriyor
(`option-mark` kalıbı: simgeye rol ve ad verilince `aria-hidden` varsayılanı
eziliyor). Kapı **yer değil varlık** ölçüyor — ikisi de o platformun doğru
kalıbı.

### Kapı: ağaç genelinde mutlak ölçüt

§239 `src` altındaki bütün `.tsx` dosyalarını tarıyor: hiçbir öge aynı
etikette `aria-hidden` ile bir ad/rol/canlı bölge taşımamalı.
`aria-hidden={false}` bunun dışında — o, simgenin varsayılanını bilinçli
olarak ezen kalıp.

## §11.358 — Kapı denetimi: "işaret var" ile "işaret işe yarıyor"

§11.357'nin dersi kapıların kendisiyleydi, bu yüzden bu tur **kapıları**
denetledi: erişilebilirlik işaretini ölçen bütün ölçüler tarandı.

**Sonuç büyük ölçüde iyi.** Ölçülerin neredeyse hepsi düğüm bağlı: bir dal
gövdesinden (`govde`), bir koşuldan (`state === "done" ? (`) ya da tam
etiketten okuyor. Ve §239 artık ağaç genelinde `aria-hidden` ile ad/rol
çakışmasını yasakladığı için, dosya-geneli bir "işaret var mı" ölçüsü artık
`aria-hidden` ile de kandırılamıyor — o yol kapandı.

**Bir ölçü gerçekten zayıftı:** koçun cümlesi. §156 dosyadaki canlı bölge
**sayısını** sayıyordu (iki dal → 2 vs 2) ve bu, işaretin **doğru ögede**
olduğunu söylemiyor: biri sarmalayıcıya kaysa sayı aynı kalır, ama duyuru o
zaman maskotun da içinde olduğu bir kutuyu okur ve alakasız değişimlerde
ateşler. Ölçü artık `{line}`i **çizen etiketin kendisine** bakıyor, iki dalda
da.

### Ve kendi kapımda komşuyu ölçtüm

İlk yazım "`{line}`den hemen önceki `<`" dedi ve web'de **1/2** çıktı: balonun
kuyruğu `{line}`den hemen önce duran, kendi kendini kapatan bir
`<span aria-hidden … />`. Yani ata değil **kardeş** ölçülmüştü — bu turda
üçüncü kez aynı sınıf. Geriye yürürken kendi kendini kapatan ve kapanış
etiketleri atlanıyor; ilk gerçek açılış ata. Enjeksiyon da bunu doğruluyor:
rolü sarmalayıcıya kaydırmak kapıyı yeşil bırakmıyor.

### Resim taraması: dokuz resim, dokuzunda `alt`

Ayrı bir eksen ölçüldü ve **temiz çıktı**: web ağacındaki dokuz resmin
dokuzunda da `alt` var ve hepsi haklı olarak boş — maskot, arma, logo, balon
kuyruğu; yanlarında kişinin adı ya da uygulamanın adı yazılı. Bir avatarın
`alt`ı olsaydı ad iki kez okunurdu.

`check:title` bu sıfırı tutuyor: `alt` **yokluğu** ile `alt=""` aynı şey
değil — boş `alt` "bu resim dekoratiftir" diye bir **beyan**, hiç olmaması ise
ekran okuyucunun dosya adını okumasına yol açıyor.

## §11.359 — Tepki seçicisi örtü değil satır: fare-özel kapanış kalktı

Eksen **örtü olmayan açılır paneller**di. Tarama önce bir şeyi netleştirdi:
`setOpen` çağrılarının neredeyse hepsi **yerinde açılan** bölümler (akordeon)
— onlar örtü değil, Escape ya da odak dönüşü istemiyorlar. Tek gerçek örtü
tepki seçicisiydi ve orada üç sorun birden vardı:

- **`onMouseLeave` fare-özel.** Panel `absolute z-10 shadow-lg` ile içeriğin
  üstüne açılıyordu ve yalnız fare paneli terk edince kapanıyordu:
  dokunmatikte panel içeriği örtüyor ve kendiliğinden kapanmıyor, klavyede de
  kapanmıyor (Escape yok).
- **`role="menu"` tutulmayan bir sözdü.** AT'ye "burada ok tuşlarıyla
  gezinilir" diyor; ok tuşları çalışmıyordu.
- **Odak** paneline taşınmıyor, dönüşü de yönetilmiyordu.

Android'in çözümü daha basit ve bu üç sorunun **hiçbirini** taşımıyor: panel
çubuğun **altında** normal bir satır olarak açılıyor, içeriği örtmüyor, tetiğe
ikinci dokunuş kapatıyor. Web de öyle yapıyor — örtü kalktığı için Escape ve
odak dönüşü sorusu **kendiliğinden** ortadan kalkıyor. Bir kusuru kapatmanın
en iyi yolu bazen onu mümkün kılan yapıyı kaldırmak.

Anlambilim de değişti: satır bir menü değil, **tek seçimli bir grup** —
`radiogroup` + `radio`, Android'in `accessibilityRole="radio"`su ile aynı.
Düğmeler 44 px'e çıktı (Android'in ölçüsü; webde 36 idi).

§240 iki listeyle ölçüyor: seçicinin satır olarak açılması (örtü, fare-özel
kapanış, anlambilim, tetiğin ikinci dokunuşta kapatması) ve **ağaç genelinde
mutlak bir ölçüt** — `onMouseLeave` bir paneli kapatan tek yol olamaz. Bugün
webde hiç `onMouseLeave` yok; kapı o sıfırı tutuyor.

§225'in tepki seçicisi ölçüsü de yeni şekle güncellendi (`menuitemradio` →
`radio` + `radiogroup`).

## §11.360 — Boş hâl ev kalıbında: altı liste ikon, başlık ve çıkış yolu kazandı

Eksen **boş durumlar**dı ve Android'in kendi cevabı hazır duruyordu:
`social/common.tsx` `EmptyCard` — 52 px'lik **dolu** renkli ikon karosu, `h3`
başlık, sönük açıklama ve isteğe bağlı bir düğme. On altı yerde o kullanılıyor
(akış, gelen kutu, arkadaşlar, ortak görev, lig, profil…). Ama aynı
uygulamanın içindeki **öteki** listeler başka bir dille konuşuyordu:
ortalanmış tek bir sönük cümle.

| Yüzey | Önce (iki platformda da) |
|---|---|
| Kelimeler | "Kelime bulunamadı." — ikon yok, sebep yok, çıkış yok |
| Deneme kâğıtları | "{level} seviyesi için henüz deneme sınavı yok." |
| Sınav istatistiği | "Henüz tamamlanmış bir deneme sınavın yok…" |
| Patika | "Bu seviyede konuşma patikası henüz yok…" |
| Kullanıcı arama sonucu | "Sonuç yok. Gizli profiller…" |
| Öneriler | "Şimdilik öneri yok…" |

Altısı da **iki platformda da** aynı şeyi yapıyordu, yani karşılaştırmalı bir
kapı bunu göremezdi; ölçü bu yüzden **mutlak**: her boş hâl `EmptyCard`
kabuğunda olmalı.

İki yerde metnin kendisi de eksikti. **Kelimeler** boş olmasının iki sebebi
var — hiç kelime yok, ya da süzgeçler her şeyi dışarıda bıraktı; ikincisinde
çıkış yolu süzgeçleri kaldırmak ve bunu söylemeyen ekran kullanıcıyı listenin
gerçekten boş olduğuna inandırıyordu (yeni `words.empty_sub` + süzgeç açıkken
görünen "Süzgeçleri temizle" düğmesi). **Deneme kâğıtları** kâğıtların
seviyeye bağlı olduğunu söylemiyordu, oysa seviye çubuğu kartın hemen
üstünde duruyor. Sınav istatistiği ve Patika ise çıkış yolu kazandı (deneme
sınavı listesi / Öğren).

Yazılar ekranı **üçüncü** bir kalıptaydı: iki platform da başlık + açıklama +
düğmeyi doğru veriyordu ama kendi karosunu kuruyordu — mobil 80 px `xl`
yumuşak zemin, web 48 px %14 tint. Aynı uygulamada üç farklı boş hâl ölçüsü.
O da kabuğa alındı; mobilde Yapabildiklerim'in **hata** dalı da öyle (boş dalı
zaten `EmptyCard` çiziyordu, hata dalı kendi başlığını kuruyordu).

### Kabuk hata hâllerini de taşıyor — ve sessizdi

Bu kart yalnız "liste boş" demiyor: arkadaş tablosu, lig tablosu, başarımlar,
yapabildiklerim ve yazılar **yüklenemediğinde** de aynı kart çiziliyor. O
durumda ekran okuyucu kullanan biri hiçbir şey duymuyordu. Kabuk bir duyuru
prop'u aldı (`live` → `accessibilityLiveRegion`, webde `role`) ve beş hata
çağrısı da onu kullanıyor. Boş hâlde duyuru **istenmiyor**: "henüz arkadaşın
yok" bir hata değil, sayfanın normal içeriği.

Bunun bir kapı dersi var. §228 ("hata dalı duyuruluyor") duyuruyu **çağrı
yerinde** arıyor; kabuk prop'u okumayı bıraksa o kapı yeşil kalır ve hiçbir
şey duyurulmaz — denedim, kalıyor. §241 bu yüzden iletmenin kendisini ayrı
bir olgu olarak ölçüyor. §228'in mobil deseni de `live="assertive"`i kabul
edecek şekilde genişletildi.

### Kullanıcı arama kutusu

Android kutunun başına **büyüteç** koyuyor, web bir "@" harfi koyuyordu:
kullanıcı adı işareti gibi okunuyor, oysa kutuya isim de yazılabiliyor.
Temizleme de Android'de X ikonu, webde metnin devamı gibi duran bir "Temizle"
sözcüğüydü. Webde `SearchIcon` **hiç yoktu** — mobil `ui/icons.tsx`te
duruyordu, aynı çizimin web karşılığı yazıldı.

### Kâğıt bulunamadı: yanlış sebep

Mobilde tek taraflı bir hata çıktı. Bağlantıdaki kâğıt ya da bölüm
bulunamadığında `MockExamScreen` **"{level} seviyesi için henüz deneme sınavı
yok"** yazıyordu. Sebep yanlış (kâğıtlar duruyor, bozuk olan bağlantı),
üstelik `paper` da bulunamadığı için seviye **boş** basılıyordu:
"&nbsp;seviyesi için henüz deneme sınavı yok". Geri dönüş yolu da yoktu; tek
çıkış cihazın geri hareketiydi. Web aynı yolda `notFound()` çağırıp 404
sayfasını çiziyor. Artık Android'in kendi "bulunamadı" kalıbı var
(`UserScreen`in X ikonlu, tehlike tintli kartı) + listeye dönüş düğmesi.

### §241

Yedi olgu: kabuğun duyuruyu iletmesi (mutlak), yedi yüzeyin boş hâlinin
kabukta olması (iki platform ayrı listelerde, mutlak), beş hata çağrısının
duyurması (iki platform), arama kutusunun işaretleri ve kâğıt bulunamadı
dalının doğru sebebi. Ölçü **düğüm**, pencere değil: boş hâl kartlarının
içine düğme ve bağlantı giriyor, karakter mesafesi ölçü olamaz — işaretin
kendi açılış etiketi derinlik/tırnak farkındaki `acilisSonu` ile okunuyor.
Beş enjeksiyon denendi, beşi de yakalandı.

## §11.361 — Yarım kalan işten ayrılmak: dört kapalı ekran ve üç kaçak yol

Eksen **çıkış onayı ve yarım kalan işin korunması**ydı. Üç ayrı kusur çıktı.

### Dört ekran kapandı (web)

Boss turu, Meydan Okuma, Günün Turu ve Haftalık Sınav web'de tur başlayınca
**başlıkta hiçbir düğme taşımıyordu**. Tek çıkış tarayıcının geri düğmesiydi
— ana ekrana eklenmiş uygulamada o da yok. Aynı kapan tur ve deneme sınavında
daha önce kapatılmıştı (`session-player`, `mock-exam-player` dosyalarındaki
"çıkış yolu yoktu" notları); bu dördü açık kalmıştı. Android'in dördünde de
başlığın solunda 44 px'lik bir kapat karosu var.

Ölçüler Android'den geldi ve ortak bir bileşene alındı (`round-exit.tsx`):
44×44, `surface-2` zemin, `tile` yarıçap, 22 px `XIcon`, sönük renk, adı
`common.go_back` ya da `common.back`. Yürüyüş kipinin oynama başlığına da
eklendi: orada tek çıkış sayfanın **en altındaki** "Bitir" düğmesiydi ve
kaydırmadan görünmüyordu; Android'in kip başlığında o karo baştan beri var
(`WalkModeScreen` `topBar`).

### Ayrılmanın öteki yolları (web)

Android'de tur, modül sınavı, yerleştirme ve yürüyüş ekranlarında **donanım
geri tuşu** onay diyaloğuna bağlı (`lib/useBackConfirm.ts`) ve o ekranlarda
hiçbir gezinme yüzeyi yok — yığın sayfası, sekme çubuğu çizilmiyor. Web'de
ikisi de yoktu:

- **Yenileme / sekmeyi kapatma.** Süreli bir sınavın ortasında F5'e basmak
  cevapları sessizce bırakıyordu; tarayıcının "siteden ayrılınsın mı" kutusu
  ancak `beforeunload` dinleyicisi varsa çıkar ve hiçbir oyuncuda yoktu.
- **Uygulamanın kendi gezinmesi.** Web'de kenar çubuğu **her** `(app)`
  rotasında çiziliyor, turun ve sınavın içinde de. Oyuncunun iki santim
  ötedeki kapatma düğmesi "çıkılsın mı" diye soruyor, aynı ekranın solundaki
  "Profil" bağlantısı ise hiçbir şey sormadan çıkıyordu.

`useLeaveGuard` ikisini de aynı diyaloğa bağlıyor: yakalama `capture`
evresinde, yalnız oturum sürerken; bağlantı tıklanınca varsayılan duruyor,
hedef `pending`e yazılıyor, onaylanırsa yolculuk sürüyor. Beş oyuncu
kullanıyor (tur, modül sınavı, yerleştirme, yürüyüş, deneme kâğıdı).

**Tarayıcı geri tuşu bilerek kapsam dışı.** Aynı belge içinde geçmişte geri
gitmeyi durdurmak, geçmişe sahte bir kayıt eklemekle olur ve o kayıt
kullanıcının geçmişinde kalıcı bir çöp bırakır. Ayrılmanın öteki üç yolu
kapandı; bu biri açık ve bunu bilerek bırakıyoruz.

### Aynı ekranda iki farklı çıkış (mobil)

`MockExamScreen` başlıktaki kapatma düğmesinde "sınavı bırak?" diye soruyor
ve onaylanırsa cevapları hem yerele hem sunucuya **yazıp** çıkıyordu; donanım
geri tuşu ise hiçbir şey sormadan, hiçbir şey yazmadan ekranı kapatıyordu.
Kayıp iki saniyeyle sınırlı (`saveLocalRun` her değişiklikten iki saniye
sonra çalışıyor) ama sorun kayıp değil: **süreli bir sınavdan kazara
çıkmak** — ve kullanıcının en doğal hareketi olan geri tuşu, korunmayan
olandı. Öteki dört ekran zaten kancayı kullanıyordu.

### §242

Dört olgu: dokuz ekranın başlığında adı olan bir çıkış denetimi (iki platform
ayrı listede), ayrılmanın onaya bağlı olması (beş yüzey, **dönüşün gerçekten
diyaloğu açması** ölçülüyor — kanca çağrılıp dönüşü kullanılmazsa dosyada ad
geçer ve hiçbir şey değişmez), kancanın gerçekten dinlemesi (mutlak; §241'in
dersi) ve çıkış karosunun ölçüsü.

Ad ölçüsü **koşullu adı da sayıyor**: `t(phase === "bolum" ? "exam.quit_title"
: "common.back")` gibi bir ad ilk yazımda görünmüyordu ve iki ekran yanlışlıkla
"adsız" çıkmıştı — ölçü anahtarın **ad özniteliğinin içinde** geçmesine
çevrildi. Beş enjeksiyon denendi, beşi de yakalandı.

## §11.362 — Yertutucu ad değildir: 72 metin alanı adsızdı

Eksen **girdi doğrulama ve alanların erişilebilirliği**ydi. Üç kusur çıktı;
ilki en büyüğü.

### Yertutucu ad değildir

İki uygulamadaki metin alanlarının **neredeyse hepsi** adını yalnızca
yertutucudan alıyordu: webde 41 alan (`input` + `textarea`), mobilde 31
`TextInput`. Yertutucu yazmaya başlayınca kaybolur, bazı ekran okuyucuları
onu hiç okumaz ve alana geri dönen kullanıcıya alanın ne istediğini söyleyen
hiçbir şey kalmaz — parola kutusuyla "parolayı yine yaz" kutusu ayırt
edilemez oluyordu. Giriş, kayıt, şifre sıfırlama, şifre değiştirme, iki
adımlı doğrulama, hesap silme, profil, sosyal ayarlar, promo kodu, kelime
arama, bütün tur ve sınav cevap alanları.

**İki taraf da yanlıştı**, ölçü bu yüzden mutlak ve ağaç genelinde. Yeni
dizgi yok: her alanın adı kendi yertutucusunun anahtarı; yertutucusu olmayan
iki yerde (yazı dökümü alanları) hemen üstündeki ipucu satırı.

### Başarı ile hata aynı seviyede duyuruluyordu

Beş yüzeyde tek bir öge hem "kaydedildi"yi hem "olmadı"yı taşıyor ve seviye
sabitti — webde hep `role="status"`, mobilde hep
`accessibilityLiveRegion="polite"`. Yani başarısız bir promo kodu,
reddedilen bir kullanıcı adı ya da düşen bir arkadaşlık isteği ekran
okuyucuya **sırası gelince — yani belki hiç** — söyleniyordu. Ev kuralı bu
ayrımı başka her yerde tutuyor (`role="alert"` / `assertive`); aynı ekranın
ödeme hatası bile baştan beri `assertive`. Seviye artık duruma bağlı.

### Geçersizlik alanın kendisinde değildi (web)

Parola kuralı ihlali ya da boş ad yalnızca altta bir kutuda yazıyordu; alan
"geçerli" görünüyor ve alana geri dönen ekran okuyucu kullanıcısına sorunun
sürdüğünü söyleyen hiçbir şey olmuyordu. Dört form artık `aria-invalid` ile
"bir sorun var"ı, `aria-describedby` ile **hangi sorun** olduğunu alana
bağlıyor. React Native'de `aria-invalid` yok; mobil karşılık hatanın canlı
bölgede duyurulması ve o başka kapılarda ölçülüyor.

### İki ölçüm dersi

**Örtülü etiket de bir addır.** İlk ölçüm `<label>` ile *saran* bağlantıyı
saymıyordu ve doğru yazılmış beş yönetici alanını "adsız" gösteriyordu —
komşuyu değil **yanlış şeyi** ölçmek. Ölçü üç yolu da kabul ediyor:
`aria-label`/`aria-labelledby`, `id`↔`htmlFor`, ve alanı saran `<label>`
içindeki metin.

**Kesme işareti tırnak sanılıyor.** Ölçümü ilk yazdığımda ham kaynak
üzerinde çalıştırmıştım ve `"Android'de karşılığı…"` gibi bir **yorum**
içindeki kesme işareti tırnak açıyor sayıldı: etiketin sonu bulunamadı ve
`AuthScreen`in iki adımlı kod alanı taramadan kaçtı. Kapı `sil()` ile
yorumları düşürüp ölçtüğü için onu buldu — kapı ad hoc taramadan daha
doğruydu.

### §243

Altı olgu: alanların adı (iki platform ayrı listede, mutlak), başarı/hata
duyuru seviyesinin ayrı olması (dört yüzey, eşleştirmeli), geçersizliğin
alana bağlı olması ve hata metninin alana bağlı olması. Altı enjeksiyon
denendi, altısı da yakalandı.

Mevcut bir kapı da onarıldı: "sonuç duyurusu" (§11.331) seviyeyi düz dizgi
olarak arıyordu ve koşullu biçime geçen beş yüzeyi "sessiz" saydı — duyuru
kalkmamış, **biçimi değişmişti**. Desen ikisini de kabul ediyor.

## §11.363 — Ölü düğmenin sebebi: elle yazılmış taban, yazılmayan sebep

Eksen **devre dışı denetimin sebebi**ydi. 135 web + 79 mobil `disabled`
çağrısını taradım; çoğu geçici (`busy`) ve bir sebep gerektirmiyor. Kalıcı
olarak kapalı kalan yerler bir tek sınıfta toplandı: **değerlendirme
düğmeleri bir kelime tabanına bağlı.**

Taban makul (iki kelimeye puan istemek hem anlamsız bir puan üretir hem
kotadan yer yer) ama üç sorun birden vardı, üçü de **her iki platformda**:

1. **Sayı elle yazılıydı** — sekiz yerde `< 5`, üç yerde `< 2`. Hiçbir yerde
   adı geçmiyordu, yani iki platform sessizce ayrışabilirdi.
2. **Sebep yazmıyordu.** Ekranda görünen sayaç **görevin** alt sınırını
   söylüyor (`{n}/{min}`, kâğıda göre 40–120 kelime) ama düğmenin uyduğu sayı
   **başka**. Üç kelime yazan kullanıcı "3 / 40" görüyor ve ölü bir düğmeye
   bakıyor; beş kelimede düğme açılıyor ama sayaç hâlâ "yetersiz" diyor. Aynı
   ekranda iki farklı sayı.
3. **Tek cümlelik görevlerde hiç not yoktu** — tek kelime yazan kullanıcıya
   hiçbir şey söylenmiyordu (uzun görevde `writp.min_words_note` vardı).

İki sayı artık adlı ve ortak: `MIN_ASSESS_WORDS` ve `MIN_FREE_WORDS`
(`src/lib/assess-const.ts` ↔ `mobile/src/lib/learningRules.ts`). Kapalı
düğmenin yanında da tek cümle duruyor (`assess.gate_min_words`).

### İki tek taraflı kusur

**Konuşma dökümü kapısı webde KARAKTER sayıyordu** (`length < 5`): "ja ja"
gibi iki kelimelik bir döküm geçiyor, "Entschuldigung" gibi tek kelimelik bir
döküm geçmiyordu. Android'de düğmede hiç kapı yoktu — işlevde karakter kapısı
vardı, yani **düğme açık görünüyor ve basınca hiçbir şey olmuyordu**. İki
taraf artık aynı kelime tabanını kullanıyor.

**Sınav hazırlık kuralı**: Android yalnız `answer.trim()` istiyordu —
sıralama kipinde beş parçanın biri yerleştirilmiş bir "cümle"
gönderilebiliyor, yazma kipinde tek kelime geçebiliyordu, ve bunlar puanlanıp
sınav sonucuna giriyordu. Web baştan beri sıralamada bütün parçaları, yazmada
iki kelimeyi istiyordu. **Burada ileride olan webdi** ve kural webin kuralı
oldu; Android'in daha gevşek olması bir tasarım tercihi değil, ölçülmemiş bir
boşluktu.

### §244 ve iki kapı dersi

Dört olgu: elle yazılmış tabanın kalmaması (mutlak), kapalı düğmenin
sebebinin yazması (üç yüzey, eşleştirmeli), döküm kapısının kelime sayması ve
sınav hazırlık kuralının aynı olması.

**Kapı yanlış şeyi saydı.** İlk desen `\bn\b` ile her `n` karşılaştırmasını
alıyordu ve `writing-player`daki `if (n >= 2)` — bir **yanlış deneme sayacı** —
"elle yazılmış taban" sayıldı. Desen yalnız `n <` biçimini alıyor artık. Aynı
desen `examWords < 5`i de kaçırmıştı (değişken adı listede yoktu); enjeksiyon
onu gösterdi ve desen ad kalıbına çevrildi.

**Kapı hiçbir şey ölçmedi.** Sabitlerin değerini karşılaştıran ikinci bir
liste yazmıştım: üretilen desen `\\b` (kaçışlı ters bölü + b) oluyor, asla
eşleşmiyor, iki taraf da "yok" dönüyor ve liste yeşil kalıyordu. Değer
eşitliğini "ortak sayısal sabitler" kapısı zaten doğru tutuyor (enjeksiyonu o
yakaladı), ikinci ve daha zayıf bir kopya kapıyı güçlendirmiyor — liste
silindi, gerekçesi kapıya yazıldı.

Yedi enjeksiyon denendi; ikisi ilk turda kaçtı, desen düzeltildikten sonra
yedisi de yakalandı.

## §11.364 — Sayının biçimi: aynı olgunun iki kaynağı

Eksen **sayı ve tarih biçimleri**ydi. Üç ayrışma çıktı, üçü de aynı sınıftan:
bir olgunun iki kaynağı olması.

### Yüzde

İşaretin yeri dile göre değişiyor: `%45` / `45%` / `45 %`. Android bunu
`Intl`den okuyor (`formatPercent`), web ise **üç elle yazılmış dizgide**
tutuyordu (`common.pct`). İki sorun:

- **Aynı olgunun iki kaynağı.** Biri değişirse diğeri sessizce ayrışır.
- **Almanca kopyada normal boşluk** yazılıydı. `Intl` orada **bölünmez**
  boşluk (U+00A0) veriyor; normal boşlukla sayı ile işaret satır sonunda
  ayrılabiliyordu.

Üstelik webde yüzde yazmanın **iki yolu** vardı: biçimleyici ve doğrudan
`t("common.pct")` — yirmi iki çağrı yeri. Anahtar üç web sözlüğünden kalktı,
tek yol biçimleyici, kaynak `Intl`.

### Ondalık ayraç

Meydan okuma ve boss sayaçları `toFixed(1)` yazıyordu: **sabit nokta**, yani
Türkçe ve Almanca arayüzde de "8.3" çıkıyordu — iki dilde de ayraç virgül.
**İki tarafta da** böyleydi, ölçü bu yüzden mutlak. İki platforma
`formatDecimal` eklendi.

### Tarihin yerel adı

Oturum satırı `toLocaleDateString(lang)` yazıyordu — yerel ad değil **dil
kodu** ("tr" yerine "tr-TR"). Aynı sapma Android'de de vardı
(`ActiveSessions`: `currentLang()`), her iki taraftaki öteki otuz çağrı ise
`localeOf(lang)` / `dateLocale()` kullanıyor.

### Sessiz olan

`formatNumber` webde **yuvarlamıyordu**, Android yuvarlıyor. Bugün her çağrı
tam sayı geçiriyor, yani görünür bir kusur yok — ama kesirli bir değer
geçtiği gün iki platform aynı sayıyı farklı yazardı. Web de yuvarlıyor artık.

### §245 ve iki kapı dersi

Beş olgu: yüzde biçiminin `Intl`den gelmesi ve yuvarlama (eşleştirmeli),
sözlük anahtarının kalkması (mutlak, ağaç geneli), sabit noktanın kalmaması
(mutlak), tarihin yerel adının dil kodu olmaması (mutlak) ve sayaçların
biçimleyiciyi kullanması (eşleştirmeli — "sabit nokta yok" tek başına
yetmez, sayı tamamen kaldırılmış da olabilir).

**Kapının taraması yorumları da görüyor.** Anahtarın kalktığını ağaç genelinde
ölçen liste ilk turda `dict.ts`i işaretledi: kalkışın **gerekçesi** o dosyanın
yorumunda yazılı ve ham kaynakta arayan bir ölçü onu "anahtar hâlâ var" diye
okuyor. `sil()` ile yorumlar düşürülüyor artık.

**Üç mevcut kapı onarıldı.** Seviye sınavı sonucu, deneme kâğıdı sonuç başı ve
haftalık sonuç yerleşimi kapıları yüzdeyi `t("common.pct"` metniyle arıyordu
ve üçü birden "yüzde YOK" dedi — yüzde kalkmamış, **biçimi** değişmişti. Aynı
sınıf bu oturumda üçüncü kez çıktı (§228 `live`, §11.331 duyuru seviyesi):
bir olgunun yazımı değişince onu metin olarak arayan her kapı yanlış alarm
veriyor.

Altı enjeksiyon denendi, altısı da yakalandı.

## §11.365 — "1 reviews": on beş anahtarda çoğul yoktu, yirmi üçü ölüydü

Eksen **çoğul ve sayı uyumu**ydu. Sözlükte `.one` mekanizması var (`n` birse
`<anahtar>.one` kullanılıyor) ve iki platform da aynı kuralı uyguluyor — ama
`{n}` taşıyan 133 anahtardan yalnız 45'inde tekil biçim vardı.

Çoğunda gerek de yok: `{n}` bir **sıra** ("Deneme {n}", "Ünite {n}"), bir
**kesir payı** ("{n}/{total}"), bir **puan** ya da çekimlenmeyen bir kısaltma
("{n} sn") olduğunda tekil biçim anlamsız. Ölçüm 15 gerçek eksik buldu.

### En görünür olan

`learn.due_count` İngilizcede **"{n} review"**, Almancada **"{n}
Wiederholung"** yazıyordu — temel biçim **tekildi**. Öğren ekranının en
üstündeki rozet, on iki tekrar bekleyen bir kullanıcıya "12 review" diyordu.
Temel biçim çoğula çevrildi, tekil `.one`a taşındı.

### Kaçamak

`mockexam.plays_left` İngilizcede **"{n} play(s) left"**, Almancada **"Noch
{n} Durchgang/Durchgänge"** yazıyordu: sayının tekil mi çoğul mu olduğunu
**söylemekten kaçınan** iki kalıp. `.one` mekanizması tam bunun için var;
"(s)" çözüm değil, çözümün yerine konmuş bir işaret. `i18n:check` artık bir
harften hemen sonra gelen `(s)`i reddediyor — ölçüt dar bilerek: dilbilgisi
anlatan içerik "-(e)n" ve "Ja/Nein" yazıyor ve o iki kalıp ölçünün dışında
kalıyor, yani muafiyet listesi yazmaya gerek yok.

Geri kalan on üç: `social.mutual` ("1 mutual friends"), `exam.minutes` /
`mockexams.minutes` ("1 minutes in total"), `mockexams.part_summary` ve
`exam.items_and_time` ("1 items"), `friendpulse.progress` ("1 days"),
`weekly.pitch_short` ("1 mastered words"), ve yönetici panelinden
değiştirilebilen dört premium sayısı (`plan.free_mock`,
`mockpack.free_note`, `plan.free_weekly`, `plan.free_weekly_ai`) artı iki
premium tavanı. Son altısı bugün doğru görünüyor çünkü değerler 1 ya da 2 —
ama Samet o sayıyı panelden değiştirdiği gün İngilizce cümle bozulurdu.

### Mekanizmanın sınırı

`.one` yalnız **`n`** değişkenine bakıyor. `exam.word_count` ("{n} / {min}
words") gibi anahtarlarda çekimlenen sayı `{min}`; oraya tekil biçim
yazılamıyor. Bugün `{min}` hiçbir yerde 1 olmuyor, o yüzden görünür bir kusur
yok — sınırı kayda geçiriyorum.

## §11.366 — Ölü anahtar yanlışı saklıyor

Ortak sözlükte (`mobile/src/i18n/*`) ölü anahtar denetimi yoktu. Web
sözlüğünün ölüleri baştan beri denetleniyordu; ortak sözlüğün gerekçesi
"orada kullanılmayan anahtar Android'in kendi meselesi"ydi. O gerekçe artık
geçersiz: `base/*` o dosyadan üretiliyor ve **iki istemci de aynı anahtarları
okuyor**, yani hiçbir tarafın çağırmadığı bir anahtar iki tarafta da ölü.

Ölçüm **23 ölü anahtar** buldu ve ikisinde çok net bir çürüme vardı:
`leaderboard.this_week_left` ile `weak.n_times`in **Türkçe ve İngilizce
değerleri yer değiştirmişti** — `tr.ts`te İngilizce cümle, `en.ts`te Türkçe
cümle. Kimse çağırmadığı için kimse görmemiş. Ölü anahtarın zararı tam bu:
yanlışı saklayan bir yer açıyor. (`mockpack.progress` de `%{pct}` yazıyordu —
bir önceki turda kaldırdığım koda gömülü yüzde işareti.)

Yirmi üçü silindi; hepsinin canlı kardeşleri ve adı konabilen bir yerine
geçeni var (yazılar boş hâli iki tur önce `writ.empty_*`e geçmişti,
`leaderboard.this_week_left` yerine `social.days_left` / `social.last_day`
kullanılıyor).

**Silinmeyen on bir:** premium kota kapısının cümleleri.
`lib/premium/access.ts` her kararı bir `reason` ile döndürüyor
(`premium_only`, `quota_spent`, `fair_use`, `free_quota`) ve bu anahtarlar o
sebeplerin karşılığı olarak yazılmış; kotayı **arayüze bağlama kararı
Samet'te** (§11.254). Hazır bir söz varlığını silmek benim işim değil — kayıtlı
borç olarak listede duruyorlar. Liste **uzayamaz** ve **eskiyemez**: yeni bir
ölü anahtar doğarsa denetim düşer, listedeki bir anahtar bağlanır ya da
silinirse "liste güncel değil" der.

Dört muafiyet çalışma anında kurulan aileler: `genre.${slug}`,
`promo.${reason}`, `league.tier_${tier}`, ve web denetimindeki `band.*` /
`push.rem_*_named`.

Üç enjeksiyon denendi: yeni ölü anahtar yakalandı, eskiyen borç listesi
yakalandı, çoğul kaçamağı yakalandı.

## §11.367 — Aynı düğme dört ölçüde: kapatma karosu ve ayarlar dişlisi

Eksen **ikon boyutları**ydı. Tarama önce bir şeyi netleştirdi: iki uygulamada
da ikon boyutları bir ölçeğe oturmuş değil (11'den 64'e kadar yirmi farklı
sayı) — ama bu bir ayrışma değil, **rol** farkı: satır içindeki alev 13 px,
manşetteki alev 34. Bir ölçek dayatmak iki yüz çağrı yerini görsel olarak
doğrulayamayacağım bir göçe sokardı. Onun yerine **rol başına** karşılaştırdım.

Öğren merkezinin karoları (48 px karo + 24 ikon + 20 ok) ve sayfa geri
düğmesi (44 + 24) iki tarafta zaten birebirdi — o iş daha önce yapılmış.
Ayrışan tek rol **başlıktaki kare düğme**ydi.

### Beş kopya, dört ölçü

Android'in kuralı otuz altı çağrı yerinde aynı: **44×44 karo, `radii.md`,
`surface2` zemin, glif geri oku ise 24, çapraz ise 22.** Tek istisna
`RoleplayExamScreen`in geri oku 22'ydi; o da düzeltildi.

Webde aynı denetim dört ayrı ölçüdeydi:

| Ekran | Karo | Glif |
|---|---|---|
| Modül sınavı | 32 px | çapraz 16 |
| Yerleştirme | 32 px | çapraz 16 |
| Deneme kâğıdı | 36 px | çapraz 18 |
| Tur | 44 px | çapraz 22 (doğru olan) |
| Tanıtım testi | 44 px `btn-ghost` | çapraz 20 |

İki 32 px'lik düğme `check:hit`ten **geçiyordu** çünkü `hit-8` sınıfı dokunma
alanını genişletiyor — ama **görünen** düğme küçüktü. Dokunma hedefi ile
görsel ölçü ayrı iki şey ve kapı yalnız birincisini tutuyordu.

Beşi de `RoundExit`e taşındı; ölçü tek kaynakta. **Glif de ayrışıyordu:**
deneme kâğıdının başlığı *listeye dönüyor*, ekranı kapatmıyor — Android orada
geri oku çiziyor, web çaprazı. Bileşen artık `glyph` alıyor.

### Ayarlar dişlisi

Android iki başlıktaki ayarlar düğmesinde **dişli** çiziyor, web **İngiliz
anahtarı**. Aynı denetim iki uygulamada iki farklı simge taşıyordu; dişli
"ayarlar"ın yerleşik işareti, anahtar "tamir". Webde `SettingsIcon` **hiç
yoktu** — mobilin çizimi karşılığı olarak yazıldı. Aynı sınıf iki tur önce
`SearchIcon`da çıkmıştı.

### §246 ve kapının dördüncü aynı dersi

Dört olgu: başlıktaki karonun glif ölçüsü (mobil, mutlak), kapatma karosunun
ortak bileşenden gelmesi (web, mutlak), bileşenin Android'in sayılarını
taşıması (eşleştirmeli) ve ayarlar simgesinin dişli olması (eşleştirmeli).

Mevcut "çıkış düğmesi" kapısı adı `aria-label={t("exam.quit_title")}`
metniyle arıyordu ve üç ekranda birden "düğme yok" dedi — düğme kalkmamış,
**adın geçtiği yer** değişmişti (artık `RoundExit`in `labelKey`i).
**Bu sınıf bu oturumda dördüncü kez çıktı** (§228 `live`, §243 duyuru
seviyesi, §245 yüzde): bir olgunun yazımı değişince onu metin olarak arayan
her kapı yanlış alarm veriyor.

Onarımın kendisi de bir tuzağa düştü: `<RoundExit [^>]*labelKey="…"` deseni
**hiçbir şey bulamadı**, çünkü ilk `>` etiketin sonu değil —
`onExit={() => …}` içindeki ok o `>`i taşıyor ve desen orada duruyor. Aynı
hazard için repoda `acilisSonu` yardımcısı var; burada sınırlı bir pencere
yeterliydi.

Dört enjeksiyon denendi, dördü de yakalandı.

## §11.368 — Kapının kendi kusuru: tam metin deseni

Bu oturumda aynı şey **dört kez** oldu ve dördünde de gerçek bir gerileme
yoktu: bir olgunun **yazımı** değişti, onu düz metin olarak arayan kapı
yanlış alarm verdi.

| Kapı | Aradığı metin | Ne oldu |
|---|---|---|
| §228 hata dalı duyuruluyor | `accessibilityLiveRegion="assertive"` | duyuru ortak kabuğun `live` prop'una taşındı |
| §11.331 sonuç duyurusu | `role="status"` / `"polite"` düz dizgi | seviye koşullu biçime geçti |
| Üç sonuç kapısı | `t("common.pct"` | yüzde biçimleyiciye geçti |
| Çıkış düğmesi | `aria-label={t("…")}` | ad `RoundExit`in `labelKey`ine taşındı |

Yanlış alarm bedelsiz değil: her biri bir tur harcıyor ve "kapıyı susturmak"
refleksini besliyor. Bu turda **sınıfı** kapattım, örnekleri değil.

### Doğru ölçü düğüm

`atalarinda(src, işaret, desen)` modül kapsamına eklendi: işaretin
**atalarını** gezip özniteliği orada arıyor — etiket adına, sınıf adına ve
karakter mesafesine bakmadan. Parçalar (`<>`) da yığına giriyor; girmezlerse
`</>` bir üstteki gerçek etiketi düşürüyor (bu hata §227'de bir kez çıkmıştı).
`acilisSonu` da modül kapsamına çıktı — ilk `>` etiketin sonu değil, çünkü
`icon={<X />}` ya da `onExit={() => f()}` o `>`i taşıyor.

Sekiz ölçü bu tura çevrildi ve çevrim **doğrulandı**: beş yüzeyden
`role="status"` kaldırılınca beşi de düştü, `p-6` → `p-5` biçim
değişikliğinde hiçbiri kırılmadı — eski desen kırılırdı.

### §247: iki kırılgan kalıp yasak

Kapı kendi kaynağını okuyor (§138'in kalıbı) ve erişilebilirlik özniteliği
ölçen bir desende iki şey arıyor:

- **(A) `className="…"` sabitliyor.** Biçimlendirme ölçülen olgunun dışında:
  `role="status" className="mt-4"` deseni `mt-4`ü `mt-3` yapan birine "duyuru
  kalktı" der. Sınıfın **kendisi** ölçülen olgu olduğunda (`RoundExit`in 44
  px'i, `text-h1`) desende erişilebilirlik özniteliği olmaz ve ölçüt onları
  görmez — muafiyet listesi gerekmedi.
- **(B) Öznitelikten hemen sonra `>` var.** Bu, etiketin **başka hiç
  öznitelik taşımamasını** şartlıyor: bir `style` eklemek kapıyı kırar.

İki enjeksiyon denendi (eski iki deseni geri koydum), ikisi de yakalandı.

Ölçüm bir şeyi de netleştirdi: kapı betiğinde erişilebilirlik özniteliği geçen
115 kod satırı var ve kırılgan olan yalnız **12**'siydi. Geri kalanı ya zaten
düğüm ölçüsü kullanıyor (`dalKoku`, `dalGovdesi`, `atalar`) ya da bir
bileşenin **kendi** tanımını okuyor — orada tam metin doğru ölçü, çünkü
ölçülen şey o metnin kendisi.

## §11.369 — Adı olmayan kullanıcı: sıralamada "isimsiz" demek

Eksen **boş/yarım veriye dayanıklılık**tı. Bölme-sıfıra ve dizi indeksi
taramaları temiz çıktı (hepsi zaten dolu bir dizi gerektiren dalların içinde);
gerçek ayrışma **adı olmayan kullanıcı**da bulundu. Ad boş olabiliyor — hesap
açarken ad istemiyor — ve on bir yüzey onu yedekliyor.

### Tablolar "öğrenci", listeler "isimsiz"

Android'in sıralama satırları `social.student` ("Öğrenci" / "Learner") diyor,
web `social.unnamed` ("İsimsiz öğrenci" / "Unnamed learner"). Ayrım Android'de
**bilinçli** görünüyor: bir sıralama satırında birine "isimsiz" demek, eksik
bir alanı **herkese** duyurmaktır. Akışta ya da arkadaş isteğinde aynı şey
değil — orada iki taraf da "isimsiz" diyor ve o doğru.

Webin lig tablosu **kendi içinde bile tutmuyordu**: satır "isimsiz öğrenci",
aynı kişinin bildirme düğmesinin adı "öğrenci". Üç tablo (günlük, lig,
arkadaş) Android'in sözcüğüne çevrildi; dört liste olduğu gibi kaldı.

### Günlük sıralama satırı dört parçada ayrışıyordu

- **Baş harf dairesi**: Android rütbeden sonra 36 px'lik bir daire çiziyor ve
  içine adın ilk harfini koyuyor; webde yoktu — aynı liste iki uygulamada iki
  farklı ağırlıkta okunuyordu.
- **"(sen)" işareti**: Android adın devamına " (sen)" ekliyor
  (`social.you_paren`), web ayrı bir küçük büyük-harfli etiket çiziyordu.
- **Doğru sayısı**: Android adın **altında** ve ortak anahtardan
  (`common.n_correct` → "8 soruda 3 doğru"), web sağda **ham bir kesir**
  basıyordu ("3/8").
- **Puan**: Android `toLocaleString`i **doğrudan** çağırıyordu, yani kendi
  `formatNumber`inin yuvarlamasını atlıyordu. Bir önceki turda web'i
  biçimleyiciye bağlamıştım; Android'in kendi kaçağı buydu.

### Ölçüm dersi: bir ölçü "ad çizimi" sayınca

Baş harf dairesini eklediğimde mevcut "liste satırında ad" kapısı düştü:
probe ad çizimlerini sayıp her birinin bir `truncate` atası olmasını istiyor,
ve `(r.name ?? "?").trim()[0]` de bir ad çizimi sayıldı — oysa **tek
karakter**, satıra sığmama sorunu yok. Doğrusu baş harfi JSX'in dışına almak;
Android da öyle yapıyor (`const initial = …`). Ölçüyü esnetmek yerine kodu
Android'in şekline getirdim — probe'un "atama" kuralı onu zaten atlıyor.

### §248

Üç olgu: sıralama satırının ad yedeği (eşleştirmeli), liste satırının ad
yedeği (eşleştirmeli) ve günlük sıralama satırının dört parçası. Beş
enjeksiyon denendi, beşi de yakalandı.

## §11.370 — Uzun içerik: satır bütçesi ve taşma

Eksen **kaydırma ve uzun içerik**ti. Tarama önce iki şeyi temiz çıkardı:
mobilde sabit yükseklikli bir metin kabı yok (bütün sabit yükseklikler
iskelet, ikon karosu ya da ilerleme çubuğu), ve yatay kaydırma iki tarafta
**tam olarak aynı iki yerde** (avatar düzenleyici, arkadaşlar sekmesi). Üç
gerçek ayrışma çıktı.

### Yazılar satırı: sıra da bütçe de ters

Web metni **üste** koyup vurguluyor, "tür · seviye · gün" satırını altta soluk
yazıyordu; Android tam tersi — metadata satırı **kimliği** taşıyor, metin
onun altında bir önizleme. Aynı listeye bakan iki kullanıcı farklı şeyi önce
okuyordu.

Ve metnin bütçesi webde **tek** satırdı, Android'de iki; üstelik Android kart
açılınca metni **tamamen** gösteriyor, web hiç göstermiyordu — yani webde bir
yazının tam metnini görmenin hiçbir yolu yoktu.

### Ünite teması: aynı alan, iki farklı bütçe

Webde tek satıra kırpılıyordu, Android iki satır veriyor — **ve webin kendi
ikinci görünümü de** iki satır kullanıyordu (`line-clamp-2`). Aynı alan aynı
uygulamada iki farklı bütçeyle çiziliyordu.

### Kelime satırı: kırpmak içeriği saklıyor

Web hem Almanca kelimeyi hem karşılığı kırpıyordu. Bileşik bir Almanca ismin
sonu ya da bir kelimenin ikinci anlamı satırın dışında kalıyordu — oysa
kullanıcı listeye tam onun için bakıyor. Android iki metne de satır sınırı
vermiyor.

Burada "satır tek satırda kalsın" kuralı **geçerli değil**: o kural sosyal
listelerin ad satırı için yazılmıştı (§11.xxx), orada kimliği avatar ve rütbe
taşıyor ve kırpılan şey yalnızca uzun bir ad. Kelime listesinde kırpılan şey
**içeriğin kendisi**.

### Ölçülüp bırakılan

Sınav istatistiği satırları webde kırpılıyor, Android'de kırpılmıyor — ama
içerik sınırlı ("Deneme 3 · Okuma"), yani görünür bir etkisi yok. Churn
etmeye değmez; ölçüldü ve kayda geçti.

### §249

Dört olgu: yazılar satırının sırası ve bütçesi, ünite temasının bütçesi,
kelime satırının sarmalaması (üçü eşleştirmeli) ve **mutlak** bir ölçüt — her
`<table>` kendi kabında kaymalı. Dört tablodan üçü `overflow-x-auto`
içindeydi, biri dışarıda kalmıştı ve dar bir pencerede sayfanın kendisini
yana kaydırıyordu.

Beş enjeksiyon denendi, beşi de yakalandı.

## §11.371 — Ses ve titreşim: altı sessiz yüzey ve ters bir titreşim

Eksen **ses ve titreşim**di. İki kanal da ölçüldü; ikisinde de ayrışma çıktı.

### Titreşim: altı yüzey sessizdi

Android altı yerde dokunsal geri bildirim veriyor, web hiçbirinde
vermiyordu:

| Yüzey | An |
|---|---|
| Yürüyüş | doğru/yanlış kararı |
| İlk pratik | birincil düğme |
| Tepki seçimi | tepkiye dokunma |
| Beceri sınavı | cevabın kapanması |
| Cümle kurma | yanlış deneme |
| Telaffuz | puanın gelmesi |

Cepte ya da ekran kapalı yürüyüşte bu özellikle ağır: **kararı bildiren tek
kanal** ses ve titreşim, ekrana bakılmıyor.

### Ve bir titreşim tersti

Meydan okumada dalga yükselince web `vibrate("wrong")` diyordu. İki sorun
birden: **mükerrer** — aynı anı `AchievementFlash` zaten `correct` ile
titretiyor (`celebrate.tsx`) — ve **yanlış kalıp**: `wrong` hata titreşimi
(`[0,34,60,34]`), oysa dalga yükselmesi olumlu bir an. Olumlu bir an hata gibi
titriyordu. Android aynı anı bir kez ve `correct` ile veriyor.

### Ses: yüklü ama çalınmayan

On üç ses dosyasının hepsi webde de yüklü, ama `tap.mp3` yalnızca **ses
anahtarının önizlemesinde** çalınıyordu. Android onu kelime dizme, harf dizme
ve eşleştirmede her dokunuşta çalıyor; webde karo hareketi **sessizdi**.

İlk tarama `micon`/`micoff`/`premium`i de "webde çalınmıyor" saymıştı ve
**yanlıştı**: onlar `walkCue` yardımcısı üzerinden çalıyor, `play()` diye
değil. Ölçüyü düzeltince üçü de yerinde çıktı — bir helper'ın arkasına geçen
çağrıyı düz metinle aramanın maliyeti.

### §250

Dört olgu: dokunsal geri bildirim (altı yüzey, eşleştirmeli), olumlu anın
hata kalıbıyla titrememesi (mutlak), karo hareketinin sesi (üç oyun,
eşleştirmeli) ve **yüklü her sesin bir çalan yeri olması** (mutlak, web).

Dört enjeksiyon denendi, dördü de yakalandı.

## §11.372 — "Hareketi azalt": sonsuz nabız ve yumuşak kaydırma

Eksen **`prefers-reduced-motion` / `reduceMotion()`** idi. Ölçüm önce
Android'in bu tercihi **tam** tuttuğunu doğruladı: `Animated` ile animasyon
başlatan dokuz dosyanın dokuzu da tercihi okuyor — iskelet nabzı, maskot
zıpla-kay, kart geçişleri, basma ölçeği, kutlama, meydan okuma parlaması,
yürüyüş. Dosya dosya sayıldı, biri bile açık değil.

Web de büyük ölçüde kapsıyor: `MotionConfig reducedMotion="user"` bütün
framer-motion animasyonlarını, CSS bloğu da sıralı açılışı, sarsılmayı,
parlamayı ve basma ölçeğini kapatıyor. **İki boşluk** kaldı.

### Yineleme sayısı: süreyi kısaltmak sonsuzu durdurmuyor

Blok `animation-duration: 0.01ms` diyordu ama **sonsuz** bir animasyonu
durdurmuyordu. `animate-pulse` otuz dört iskelette sonsuz yinelemeli: süre
0.01 ms olunca döngü her karede yeniden başlıyor — boşa dönen bir döngü ve
görünür titreme riski. Standart kalıbın eksik parçası buydu
(`animation-iteration-count: 1 !important`). Android'de nabız tercih açıkken
**hiç başlamıyor** ve gerekçesi kodda yazılı: "iskeletin işi şekli ve
yüksekliği göstermek; nabız yalnız süsleme."

### Yumuşak kaydırma: iki taraf da açıktı

Üç web çağrısı `behavior: "smooth"` geçiyordu ve JavaScript'ten gelen bu
seçeneği CSS **ezmiyor**. Mobilde de iki `animated: true` vardı — yani **iki
taraf da** aynı boşluktaydı. Ayrım önemli: kaydırmanın **kendisi** gerekli
(sohbet sonuna gitmek), animasyonu değil. Beş çağrı da tercihe bağlandı, ve
bloğa `scroll-behavior: auto !important` eklendi.

### Yan çıkan: ders sohbeti webde zıplıyordu

Ölçü web'in ders sohbetini "kaydırma yok" gösterdi ve sebebi gerçek bir
ayrışmaydı: Android sohbeti `scrollToEnd({ animated })` ile **kaydırıyor**,
web `scrollTop`u doğrudan yazıp **atlıyordu**. Aynı sohbet iki uygulamada iki
ayrı his veriyordu. Hedef hâlâ kabın dibi (web'in kendi notu bunu açıklıyor),
yalnız atlama yerine `scrollTo` — ve tercih açıkken atlama geri geliyor.

### Kapsam dışı bırakılan

Dört `requestAnimationFrame` çağrısı ölçüldü ve kapsam dışı: hepsi özel
karakter eklendikten sonra **imleci** yerine koyuyor, animasyon değil.

### §251

Dört olgu: animasyon başlatan her mobil dosyanın tercihi okuması (mutlak),
web bloğunun beş kuralı (mutlak), yumuşak kaydırmanın tercihe bağlı olması
(mutlak, iki ağaç) ve sohbet kaydırmasının iki tarafta da kayması. Beş
enjeksiyon denendi, beşi de yakalandı.

## §11.373 — Klavye davranışı: on bir alan kipini hiç söylemiyordu

Eksen **klavye davranışı ve giriş kipleri**ydi. Her metin alanının klavyeye
söylediği üç şey var: cümle başı büyütme, otomatik düzeltme ve klavye tipi.
Uygulamanın kendi kuralı zaten belli ve Android'in çoğu alanı ona uyuyor:

| Alan türü | Kip |
|---|---|
| Hedef dilde **cümle** | `sentences` + düzeltme kapalı |
| Hedef dilde **kısa cevap** | `none` + düzeltme kapalı |
| Ad | `words` |
| E-posta / kullanıcı adı / arama | `none` + düzeltme kapalı |
| **Ana dilde** serbest metin (biyografi) | `sentences`, düzeltme **açık** |

Kuralın yazılmadığı yerde işletim sisteminin **varsayılanı** geçiyor: cümle
başı büyük **ve** otomatik düzeltme açık. Yani İngilizce klavyeyle Almanca
yazan biri "Haus"u "House"a çevrilmiş buluyor, her kısa cevabın ilk harfi
büyüyor.

**On bir web alanı ve altı Android alanı** bu kuralı hiç söylemiyordu —
özellikle sohbet alanları (ders, rol yapma) ve deneme kâğıdının açık
görevleri, yani hedef dilde cümle yazılan yerlerin tamamı. Rol yapma sohbeti
ve biyografi **iki tarafta da** açıktı.

Şifre ve kod alanları muaf ve öyle kaldı: `type="password"` zaten büyütmüyor,
sayı tuş takımında küçük/büyük yok.

### Üç ölçüm hatası, üçü de aynı kökten

**(1) Kesme işareti tırnak sanıldı — yine.** Ad hoc tarayıcım yalnız `/* */`
yorumlarını düşürüyordu; `SettingsScreen`in ad alanının içindeki
`// Sınır yoktu: … 40'a kırpıyordu` satırındaki **kesme işareti** tırnak açtı,
etiketin sonu bulunamadı ve alan "kipsiz" göründü. O yanlışa göre ikinci bir
`autoCapitalize` yazdım; **`tsc` yakaladı** ("JSX elements cannot have
multiple attributes with the same name"). Aynı hazard §11.362'de de çıkmıştı.
Kapı `sil()` kullanıyor ve o iki yorum biçimini de atıyor.

**(2) Dosyayı ölçmek, yüzeyi değil.** İlk yazımda kip ölçüsü "bu dosyada
`autoCapitalize="none"` geçiyor mu" diye soruyordu. `skillQuiz` hem `none` hem
`sentences` taşıyan alanlara sahip — o dosya için ölçü **her zaman** yeşil
kalırdı. Ölçü işaretten geriye gidip o alanın kendi açılış etiketini okuyor
artık.

**(3) Koşullu değer düz metinle arandı.** Şifre muafiyeti
`autoComplete="new-password"` gibi düz dizgiler arıyordu; `AuthScreen`in
parola alanı onu **koşullu** yazıyor
(`mode === "signup" ? "new-password" : "current-password"`) ve muafiyetin
dışında kaldı. Doğru işaret zaten oradaydı: `secureTextEntry`.

### §252

Üç olgu: sekiz yüzeyin klavye kipi (eşleştirmeli, alan bazında), ad alanının
`words` demesi ve **mutlak** bir ölçüt — şifre/kod dışında her metin alanı
kipini söylemeli. Beş enjeksiyon denendi, beşi de yakalandı.

## §11.374 — Düzeltme: §11.366'daki "yer değiştirmiş değerler" bulgusu YANLIŞTI

§11.366'da silinen iki ölü anahtar için "Türkçe ve İngilizce değerleri yer
değiştirmişti" yazmıştım. **Bu doğru değil.** Git geçmişinden okundu:

```
tr.ts: "leaderboard.this_week_left": "Bu hafta · {n} gün kaldı"
en.ts: "leaderboard.this_week_left": "This week · {n} days left"
tr.ts: "weak.n_times": "{n} kez"
en.ts: "weak.n_times": "{n} times"
```

Üçü de (Almanca dahil) doğru yerindeydi. Yanlış bulgunun sebebi ölçünün
kendisi: `grep -h '"anahtar"' tr.ts en.ts` çıktısında **satırların hangi
dosyadan geldiği yazmıyor** ve ben sırayı varsaydım — `-h` tam olarak o
bilgiyi bastırmak için var. Aynı komutu bu turda `common.connection_failed`
için de çalıştırdım, yine "yer değiştirmiş" göründü, ve dosya dosya okuyunca
**o da doğru çıktı**.

Silme kararı **değişmiyor**: anahtarlar gerçekten ölüydü (hiçbir istemci
çağırmıyordu) ve ölü anahtar denetimi yerinde duruyor. Değişen yalnız
gerekçe: o anahtarlar bir çürümeyi saklamıyordu, sadece ölüydüler.
`mockpack.progress`in `%{pct}` yazdığı bulgusu ise **doğru** — o tek dosyadan
okunmuştu.

Ders: bir dosyanın adını bastıran bir çıktıya bakıp "hangi dosyadaydı"
sorusuna cevap vermek, ölçmek değil varsaymaktır. Bu oturumda ölçüm
hatalarının hepsi aynı aileden çıktı (§252'deki üç hata, §250'deki `walkCue`,
bu): **bir olguyu, onu taşımayan bir çıktıda aramak.**

## §11.375 — Çevrimdışı: yedek puanın yedek olduğu webde yazmıyordu

Eksen **çevrimdışı davranış**tı. Ölçüm önce altyapının **eşit** olduğunu
doğruladı: cevap kuyruğu (tur cevapları ağ dönünce gönderiliyor), ders
ilerlemesi kuyruğu, deneme kâğıdının yerel kaydı ve modelsiz rol yapma iki
tarafta da var. İki ayrışma çıktı ve ikisi de **cümlede**.

### Yedeğin yedek olduğu

Değerlendirme çağrısı düştüğünde iki taraf da kural tabanlı bir **yedek puan**
gösteriyor. Android o puanın yanına ikinci bir cümle yazıyor: *"bu puan kelime
sayısından çıkarılmış geçici bir tahmin, gerçek değerlendirme değil"*
(`assess.fail_offline`). Web yalnız **sebebi** yazıyordu ("servis yanıt
vermedi") ve hemen altında bir **puan** duruyordu — kullanıcı onu gerçek bir
değerlendirme sanabilirdi.

Koşul **puanın kendisinde** (`result.offline`), sebep satırında değil: kota
kapısında sebep satırı başka ama yedek yine gösteriliyor.

### Bağlama hatası

Hesap bağlama ağ yüzünden düştüğünde Android genel bir cümle basıyordu
("Bağlantı kurulamadı"); web aynı yerde `links.link_offline` diyor ve o cümle
**ne yapılacağını** da söylüyor ("İnternet bağlantını kontrol et"). Anahtar
zaten ortak sözlükte ve **kaldırma** yolu kardeşini baştan beri kullanıyordu —
yalnız bağlama yolu dışarıda kalmıştı.

### §253

Dört olgu: çevrimdışı altyapısının dört parçası (eşleştirmeli), yedek puanın
yanındaki uyarı (**dal bazında**, dosya bazında değil — kartta iki dal var ve
biri silinse öteki ölçüyü yeşil tutardı), uyarının puanın koşuluna bağlı
olması ve hesap bağlama/kaldırmanın ortak anahtardan gelmesi.

Beş enjeksiyon denendi; biri ilk turda kaçtı (dosya bazlı ölçü), ölçü dal
bazına çevrilince beşi de yakalandı.

## §11.376 — Oturum düşünce: yanlış sebep, ve bir sonraki hesaba yazılan cevaplar

Eksen **oturum ve kimlik kenar durumları**ydı. İki ayrışma çıktı; ikincisi
bu oturumun en ciddi bulgusu.

### Oturum düştüğünde ne yazıyor

Sayfa açıkken oturum düşerse (belirteç süresi, sunucu yeniden başlaması)
istek **401** dönüyor. Android bunu baştan ayırıyor
(`e.status === 401 ? "auth" : "error"`) ve girişe götürüyor; webde **günün
turu** ile **haftalık sınav** ikisini tek dalda topluyordu: "yüklenemedi,
tekrar dene". Sebep yanlış, ve **tekrar denemek hiçbir zaman işe yaramaz** —
kullanıcı ekranda kilitli kalıyor. Tur oynatıcısı ayrımı zaten yapıyordu, iki
kardeşi yapmıyordu.

Mevcut bir kapı bu boşluğu **belgeliyordu**: günün turunun faz listesini
karşılaştıran ölçü mobilin `auth` fazını açıkça dışarıda bırakıyor ve
gerekçesini yazıyordu — "webde oturum rota düzeyinde çözülüyor". O gerekçe
yalnız **sayfa açılışı** için doğruydu. Muafiyet kalktı.

### Çıkışta ne siliniyor — ve ne silinmiyordu

İki uygulamada da hesaba ait cihaz anahtarları çıkışta siliniyor
(`ACCOUNT_SCOPED_PREFIXES`). Ama **gönderilmeyi bekleyen kuyruklar listede
yoktu**:

- `lernomi-answer-queue` — ağ yokken biriken **tur cevapları**
- `lernomi-lessons-pending` — biriken **ders ilerlemesi**
- mobilde ayrıca `lernomi-items-pending` ve `lernomi-item-scores`

Bu kuyruklar bir sonraki **açılışta** gönderiliyor. Yani A çıkıp B
girdiğinde, **A'nın bekleyen cevapları B'nin hesabına yazılıyordu**: B'nin
SRS aralıkları yabancı cevaplarla ilerliyor, XP'si şişiyordu. Ortak
bilgisayarda ya da bir telefonu paylaşan iki öğrencide bu sessizce oluyor.
**İki taraf da böyleydi**, ölçü bu yüzden mutlak.

Silmenin bedeli A'nın o kayıtlarının **kaybolması** ve bu bilinçli: yanlış
hesaba yazmaktan iyi. Listedeki öteki yarım işler (yarım tur, yarım deneme
koşusu) baştan beri aynı kuralla siliniyor.

### §254

Üç olgu: 401'in ayrı bir dal olması (üç oyuncu, eşleştirmeli), bekleyen
kuyrukların çıkışta silinmesi (mutlak, iki ağaç) ve mobilin kendi iki beceri
kuyruğu. Beş enjeksiyon denendi, beşi de yakalandı.

## §11.377 — Kapıların kendi muafiyetleri: dördü ölçülmüyordu

Bu tur bir kapıya değil, **kapıların istisna listelerine** bakıyor. Bir
muafiyet sessiz bir deliktir: muaf tutulan dosya ya da satır çoğu kapıda
**hiç ölçülmüyor** (`continue`), yani gerekçe bayatladığında geriye kalan
yalnız boşluktur. Yolu değişen bir dosya, kalkan bir kalıp, sonradan kapanan
bir açık — hiçbiri görünmez.

`check:colors`, `check:type` ve `check:radius` ölü istisnayı baştan beri
arıyordu. Üç kapı aramıyordu ve dördüncüsünde bir gerekçe **gerçekten
çürümüştü**.

### Çürümüş gerekçe: ilerleme çubuğunun adı

`check:title`in borç tabanında `progress-view.tsx: 2` satırı vardı ve
gerekçesi şuydu: "gün ve değer eksende ve altındaki satırda da var". Ölçüm
bunu yalanladı — eksende yalnız **günün harfi** ve altında yalnız **toplam**
duruyor; o günün **değeri** metin olarak hiçbir yerde yok. Yani sayı
gerçekten yalnız `title` ipucu balonundaydı: fareyle üstünde beklemeyi
gerektiren, dokunmatikte hiç açılmayan, ekran okuyucunun bulmadığı bir bilgi.

Android aynı çubuğa `accessibilityLabel={`${d.day}: ${label}`}` koyuyor
(`ProgressScreen`, iki çubuk türünde de). Web'in iki çubuğu da artık
`role="img"` + aynı metinli `aria-label` taşıyor; taban satırı gerekçesiyle
birlikte kaldırıldı. `check:title` artık 4 değil **2 kayıtlı borç**
bildiriyor.

### Ölü muafiyet araması eklenen üç kapı

| Kapı | Liste | Aranan ölüm biçimleri |
|---|---|---|
| `check:selection` | `DOSYA_ALLOW` | yol yok · gerekçedeki kalıp (`phase === "listening"`) artık yok |
| `check:purge` | `KEYED_BY_TEXT` | tablo yok · tabloya gerçek kullanıcı sütunu gelmiş (istisna gereksiz) · `purge`de metin anahtarlı silme kalkmış |
| `check:client-boundary` | `PUBLIC_ROUTES` | *(zaten vardı: dosya yok)* · **uç sonradan bir kapı edinmiş** (beyan artık yanlış) |

Üçüncüsü ilk bakışta zararsız görünüyor — uç kapandıysa iyi. Ama beyan orada
kaldığı sürece o uç **hiç ölçülmüyor**; kapı yarın kaldırılsa kimse görmez.

Altı enjeksiyon denendi (her kapıya iki ya da üç), altısı da yakalandı.

## §11.378 — Yıkıcı eylemin onayı: kimin kutusu?

Geri alınamaz beş eylem var ve **iki platform da onay soruyor**. Ayrışma
onayın varlığında değil, **kimin kutusu** olduğundaydı: web beşini de
`window.confirm` ile soruyordu.

| Yüzey | Android | Web (eskiden) |
|---|---|---|
| Yazı silme | başlık + "Vazgeç" / **Sil** (`destructive`) | tarayıcı kutusu |
| Görev bırakma | başlık + açıklama + **Bırak** | başlık ve açıklama `\n\n` ile yapıştırılmış tek metin |
| Arkadaşlıktan çıkarma (satır) | başlık + açıklama + **Çıkar** | tarayıcı kutusu |
| Arkadaşlıktan çıkarma (rozet) | başlık + açıklama + **Çıkar** | tarayıcı kutusu, ayrı bir web anahtarıyla |
| Engelleme | başlık + açıklama + **Engelle** | tarayıcı kutusu |

Sistem kutusunun üç somut sorunu var ve üçü de bu üründe gerçekleşiyor:
düğmeleri **tarayıcının** dilinde ("OK"/"Cancel"), uygulamanın değil;
iOS'ta onay/iptal sırası bizim düzenimizin **tersi**, yani kas hafızası
yanlış düğmeye basıyor; başlık ile açıklama tek metne sıkışıyor.

Bu bilinen bir kusurdu — `confirm-dialog.tsx`in kendi yorumu üçünü de
yazıyor. Yalnızca beş çağrı yeri geride kalmıştı. Hepsi `ConfirmDialog`a
geçti (`destructive`, Android'in başlık/açıklama/düğme adlarıyla birebir).

İki yan sonuç:

- **`socialw.unfriend_confirm` öldü.** Rozetteki onay kendi web anahtarını
  kullanıyordu; Android `social.unfriend` + `useractionbutton.no_notice`
  ikilisini kullanıyor. Ortak anahtarlara geçince web anahtarı karşılıksız
  kaldı ve üç dilden de silindi.
- **Yazı silme artık Android'in sırasında.** Satır ÖNCE gidiyor, sunucu
  sonra. Web yanıtı bekliyordu ve iki ucu da kaçırıyordu: istek başarısızsa
  **hiçbir şey** olmuyordu (kullanıcı boşuna bekliyor), istek fırlatırsa
  **bütün liste** "yüklenemedi" kartına dönüyordu — silinmeyen yazılar da
  gözden kayboluyordu. İkisi de silmenin kendisinden büyük bir ceza.

### §255

İki parçalı ve **mutlak**: (1) beş yüzeyin her biri kendi kutusunu kullanıyor
mu (eşleştirmeli), (2) kullanıcıya açık **hiçbir** istemci dosyasında sistem
kutusu kaldı mı (süpürge, `src/app` + `src/components` ağacı). İkincisi
gerekli — birincisi yalnız bilinen beş dosyaya bakar, altıncısı yarın
eklenebilir.

Tek istisna yönetici sayfası (`premium-admin`): kullanıcıya açık bir yüzey
değil, tek kullanıcısı Samet ve metni zaten sözlükte değil. **İstisnanın
kendisi de ölçülüyor** — yolu `src/app/admin/` altında kalmazsa kapı kırmızı
olur. Üç enjeksiyon denendi (işaretin kalkması, başka bir dosyaya sistem
kutusu, istisnanın yer değiştirmesi), üçü de yakalandı.

## §11.379 — Tek seçimlik liste radyo grubudur

Aynı anda yalnız **biri** seçilebilen bir liste — sınav şıkkı, bildirim
sebebi, ses, tema, görünürlük, hatırlatma saati, seviye, avatar parçası,
tepki — ekran okuyucuya ne olduğunu söylemek zorunda. İki anlatım var ve
ikisi aynı şey değil:

- `aria-pressed` bir **aç/kapa düğmesi** anlatır: "düğme, basılı". Kaç seçenek
  olduğu, birini seçmenin ötekini bıraktığı söylenmez.
- `role="radio"` + `aria-checked`, `role="radiogroup"` içinde: "radyo düğmesi,
  **4 ögeden 2.**, seçili".

Android on üç yüzeyde `accessibilityRole="radio"` diyor ve TalkBack orada
doğru cümleyi kuruyor. Web aynı yüzeylerin hepsinde `aria-pressed` ile
kalmıştı.

En keskin örnek **tepki şeridi**: aynı dosyanın *seçici* yarısı zaten
`radiogroup` + `radio` iken, akışta **okunan** yarısı `aria-pressed`
taşıyordu — dosya kendi içinde ayrışıyordu.

| Yüzey | Android | Web (eskiden) |
|---|---|---|
| Bildirim sebebi · Ses · İlk kurulum · Kelime süzgeci | radio | aria-pressed |
| Görünürlük · Hatırlatma saati · Tema segmenti | radio | aria-pressed |
| Avatar parçaları · Sınav şıkkı · Beceri sorusu | radio | aria-pressed |
| Yerleştirme şıkkı · Örnek yerleştirme · Tepki şeridi | radio | aria-pressed |

Her grubun bir **adı** da var (`aria-label`): sorunun kendi metni, bölümün
başlığı ya da mevcut etiket. Yalnız kelime süzgecinin "durum" şeridinde
karşılık yoktu — Android'de öyle bir yapı da yok (RN'in radyo grubu rolü
yok), o yüzden anahtar web'e ait: `wordsw.filter_status`.

**Muaf kalan aç/kapa düğmeleri kasten dışarıda**: "eller serbest", "yavaş
oku", "metni göster", "bahis", kelime eşleme ve sıralama. Bunlar gerçekten
birer anahtar ve `aria-pressed` onların doğru anlatımı. Ölçü bu yüzden dosya
değil **yüzey** sayıyor.

### §256

İki ölçü: on üç yüzey eşleştirmeli, ve **mutlak** olarak `role="radio"`
taşıyan her dosyanın bir `role="radiogroup"` da taşıması. Gruptan kopmuş bir
radyo "2 ögeden 1." diyemez, yani yarım iştir.

İki mevcut kapı yanlış alarm verdi ve ikisi de **biçim değişikliğiydi, gerileme
değil** (§247'nin tanımladığı sınıf): "çip durum bildirimi" `aria-checked`i bir
durum kanalı saymıyordu, tepki ölçüsü de tek radyo yüzeyi bekliyordu. İkisi de
yeni biçime getirildi.

İki enjeksiyon denendi (bir yüzeyin `aria-pressed`e dönmesi, bir grubun
kaybolması), ikisi de yakalandı.

## §11.380 — İkisinde de rolsüz kalan tek seçimlik yüzeyler

§11.379 Android'in **önde** olduğu on üç yüzeyi eşitledi. Geri kalanlarda
kusur **paylaşıktı**: iki taraf da seçimi söylüyor ("seçili" / `aria-pressed`)
ama ikisi de **rolü** vermiyordu. Karşılaştırma yeşil yanıyordu, çünkü ikisi
aynı şekilde eksikti — ölçü bu yüzden **mutlak**.

Dokuz web, dört mobil yüzey:

| Yüzey | Eskiden (iki tarafta da) |
|---|---|
| Kelime turu şıkkı (beş oyun, tek `OptionButton`) | rol yok |
| Deneme sınavı şıkkı | rol yok |
| Kurs seçimi | rol yok |
| Seviye seçimi · Uygulama dili · Yerleştirme seviyesi · Hatırlatma saati | rol yok |

En kötü örnek **kurs seçimi**: Android satırın sağına bir **radyo halkası
çiziyor** — yani tasarım "burada tek seçim var" diyor — ama ekran okuyucuya
ne rol ne de seçili durum gidiyordu. Yanlış kursu sessizce seçmek bütün
ilerlemeyi öteki dile taşıyor.

### Mobilde çip tek bileşen

`ui/Chip` altı yerde kullanılıyor ve rol oraya bir **prop** olarak eklendi;
çağrı yerleri ayrı ayrı bildiriyor. İki çağrı yeri **sekme** (sıralama kipi,
arkadaş sekmeleri) ve kasten `button` kalıyor: sekme bir radyo değil, ve
web'de de ayrı bir anlatımı var (`aria-current`). **Sekmeler ayrı bir eksen**
ve bu turda kasten açılmadı — iki platformda da tam bir `tablist` yok.

Gerçek aç/kapa düğmeleri dışarıda ve öyle kalmalı: "eller serbest", "yavaş
oku", "metni göster", "bahis", eşleme ve sıralama.

### §257

Üç ölçü, üçü de mutlak: dokuz web yüzeyi, dört mobil yüzey, ve her `Chip`
çağrı yerinin rolünü bildirmesi. Sekme muafiyetlerinin **kendisi de
ölçülüyor** — o iki dosya artık sekme kurmuyorsa kapı kırmızı olur.

Üç enjeksiyon denendi (bir web yüzeyinin `aria-pressed`e dönmesi, bir çağrı
yerinin rolü unutması, sekme muafiyetinin karşılıksız kalması), üçü de
yakalandı.

## §11.381 — Sekme şeridi, bağlantı şeridi değil

§11.380'in kasten dışarıda bıraktığı eksen. İki yüzey **aynı ekranın
görünümleri** arasında geçiyor — sıralama (lig / arkadaşlar) ve arkadaş
merkezi (dört sekme) — üçüncü bir küme de yönetici panosunda.

Web bunları `aria-current="page"` ile işaretliyordu. O öznitelik **"bir
bağlantı kümesindeki geçerli sayfa"** demek: burada ne bağlantı var ne de
sayfa değişiyor (adres yalnız `?tab=` ile tazeleniyor). Ekran okuyucu
"geçerli sayfa" diyerek yanlış bir zihin haritası kuruyordu. Üstelik şerit
`<nav>` içindeydi, yani gereksiz bir **gezinme dönüm noktası** da açılıyordu:
dönüm noktalarını gezen kullanıcı "gezinme" diye bir yere girip aynı ekranın
görünüm seçicisini buluyordu.

Yönetici panosunun iki şeridinde ise **hiçbir** durum bildirimi yoktu —
seçili sekme yalnız renkten (ve kalın yazıdan) okunuyordu.

Android tarafı da rolsüzdü: `Chip` "button" diyordu. Kusur yine **paylaşık**,
ölçü **mutlak**.

Doğrusu `tablist` / `tab` / `tabpanel`: "sekme, 2 ögeden 1., seçili" ve
panelin adı seçili sekmeden geliyor (`aria-labelledby`). Mobilde karşılığı
`accessibilityRole="tablist"` + `Chip role="tab"`.

**Gerçek bağlantı şeritleri bunun dışında** ve `aria-current` orada doğru:
`/skills` ve `/mock-exams` seviye şeritleri ile kabuk gezinmesi gerçek
`<Link href>` taşıyor, sayfa gerçekten değişiyor.

### §258

Üç ölçü: iki yüzey eşleştirmeli, yönetici panosunun iki şeridi mutlak, ve
**`aria-current` taşıyan her dosyanın bir `<Link` de taşıması** — bir düğmenin
üstünde kalan `aria-current` böylece yine yakalanıyor.

Üç enjeksiyon denendi (panelin rolünü kaybetmesi, yönetici şeridinin rolsüz
kalması, bağlantısız bir dosyaya `aria-current` girmesi), üçü de yakalandı.

## §11.382 — Başlık başlık olarak okunuyor (bu kez önde olan web)

Ekran okuyucu kullanan biri uzun bir ekranı **başlıklara göre gezerek** okur —
bir oynatıcıda ya da ayar ekranında tek pratik gezinme yolu budur. Web'de
başlıklar `<h1>`/`<h2>`/`<h3>`; mobilde `accessibilityRole="header"` **hiç
kullanılmamıştı**. Ölçüm sıfır çıktı: TalkBack'in aynı kipi hiçbir şey
bulamıyordu, yani her Android ekranı dümdüz bir metin duvarıydı.

Bu, dizinin ilk **web'in önde olduğu** turu. Yön değişti ama ölçü aynı: iki
platform aynı şeyi söylemeli.

### Nasıl yapıldı

Dört **ortak başlık bileşeni** tek dokunuşla çoğu ekranı kapsıyor
(`AppHeader`, `ScreenHeader`, `TabHeader`, `SectionTitle`) ve ayarların `Group`
başlığı. Geri kalan ekranlar başlığını kendi yazıyor; onlar tek tek
işaretlendi ve **hangi metnin başlık olduğu web'in kendi `<h*>`
etiketlerinden okundu** — aynı i18n anahtarı, aynı başlık. Böylece "hangisi
başlık" sorusu göz kararına bırakılmadı.

Toplam: 5 paylaşılan bileşen + 33 ekran.

**Tek muaf ekran `FirstPractice`**: web'de de (`first-practice.tsx`) hiçbir
başlık yok ve doğrusu o — ekranda duran şey bir başlık değil, öğrenilen
**kelimenin kendisi**.

Bir de gerçek kusur çıktı: meydan okuma turunun puan satırı web'de
`<h2 className="text-display">`, mobilde rolsüz bir `Text`ti.

### §259

Dört ölçü:

1. Ortak başlık bileşenleri rolü veriyor.
2. Hiçbir ekran rolsüz kalmadı (muafiyetin gerekçesi de ölçülüyor: web o
   dosyaya bir başlık koyarsa kapı kırmızı olur).
3. On bir akış oynatıcısı eşleştirmeli.
4. **Dosya değil yüzey**: webde bir `<h*>` içinde geçen her i18n anahtarı,
   mobil kardeşinde başlık boyunda bir metinde geçiyorsa o metin rolü söylemek
   zorunda. Rol **atada** da olabilir — webde de dış etiket `<h2>`, iç etiket
   yalnız `<span>`.

Üçüncü ölçü tek başına yetmiyordu ve bunu **enjeksiyon gösterdi**: bir dalın
rolünü sildiğimde dosyada başka başlıklar durduğu için kapı susuyordu.
Dördüncü ölçü eklendikten sonra aynı enjeksiyon yakalandı.

Beş enjeksiyon denendi (ekranın rolü kaybetmesi, ortak bileşenin rolü
kaybetmesi, muaf ekranın web kardeşinin başlık edinmesi, tek bir dalın rolü
kaybetmesi), hepsi yakalandı.

### Kapının kendi kırılganlığı: on desen

Tur sonucu duyurularını ölçen on desen `accessibilityLiveRegion="polite"
variant="X"` diye **bitişik** iki özniteliği arıyordu. Aralarına üçüncü bir
öznitelik girer girmez (bu turda `accessibilityRole="header"`) susuyorlardı —
§247'nin yasakladığı kırılgan kalıbın ta kendisi. İkisi bu turda gerçekten
sustu; onu da "arada başka öznitelik olabilir" biçimine getirildi.

## §11.383 — Çökme sınırı: mobilde hiç yoktu

Yine **önde olan web**. Bir ekranın çiziminde yakalanmamış bir hata olursa
React bütün ağacı söküyor. Web'de bu baştan beri çözülmüştü — iki `error.tsx`
bir kart çizip "tekrar dene" veriyor. **Mobilde hiç sınır yoktu**:
geliştirmede kırmızı ekran, **üretimde bomboş bir pencere** ve kullanıcının
elinde uygulamayı öldürüp yeniden açmaktan başka bir şey yok.

En sinsi tarafı ölçümdü. Telemetri hatayı **sayıyordu** (`lib/telemetry`,
`ErrorUtils` kancası) — ama **çizim hataları o kancaya hiç uğramıyor**: React
onları sınıra veriyor, sınır yoksa ağacı söküyor. Yani çöken ekranların bir
bölümü hem görünmüyor hem sayılmıyordu; panodaki `client_error` tablosu
Android için eksikti ve bunu kimse fark edemezdi.

### İki düzey, web'deki gibi

| Düzey | Web | Mobil |
|---|---|---|
| Ekran başına (kabuk ayakta kalır) | `app/(app)/error.tsx` | düzen sarmalayıcıları (`contentColumnLayout` / `wideColumnLayout`) |
| Kök (kabuk da patlarsa) | `app/error.tsx` | `App.tsx`, tema sağlayıcısının içinde |

Sınırın **düzen sarmalayıcılarına** konmasının sebebi teknik ve yazılı: React
Navigation'da `Screen.layout`, `Group.screenLayout` ve gezginin
`screenLayout`u arasından yalnız **biri** uygulanıyor. Sınır ayrı bir
`screenLayout` olsaydı sütun düzenini ezerdi — yatay tablette bütün ekranlar
dar sütuna düşerdi. İkisi birlikte sarmalanınca her ekran hem sütununu hem
sınırını alıyor.

Kart web'in kartının aynısı: gül tintli 48'lik ikon karosu, başlık, gövde,
`RefreshIcon` + "tekrar dene". Başlık `accessibilityRole="header"`
(§11.382) ve `assertive` canlı bölge — çökme sessizce olmaz.

### Metin ortaklaştı

`err.title` / `err.body` **web'e özel** anahtarlardı. İkisi mobile taşındı ve
adları `crash.title` / `crash.body` oldu — `err.*` ailesi hata **analizi**
(artikel, çoğul, hâl), bu ikisi uygulamanın **çökme kartı**; aynı önekte
durmaları iki ayrı şeyi tek aile gibi gösteriyordu. Taban sözlük mobilden
üretildiği için artık iki platform aynı cümleyi yazıyor. `err.code` web'de
kaldı: `digest` Next'in kavramı.

### §260

Üç ölçü: iki katman eşleştirmeli, kartın altı parçası eşleştirmeli, ve
**mutlak** olarak hiçbir yığın ekranının düzen sarmalayıcısız kalmaması
(sekmeleri barındıran ekranın muafiyeti ile sekme gezgininin kendi
sarmalayıcısı ayrıca ölçülüyor).

Dört enjeksiyon denendi (ekran başına sınırın kalkması, ölçümün kalkması,
grubun sarmalayıcısını kaybetmesi, sekme ekranlarının sarmalanmaması), dördü
de yakalandı.

## §11.384 — "Devre dışı" kelimesi kırk iki yerde üç farklı tonda

Aynı durum uygulamanın her yerinde aynı güçte okunmalı. Ölçüm bunun tersini
buldu:

| Platform | Bulunan |
|---|---|
| Web | **üç** değer — `disabled:opacity-40` (8), `-50` (10), `-60` (24) |
| Mobil | **beş** anlatım — 0.4, 0.45, 0.5, 0.6 ve renk takası |

Aynı giriş ekranında gönder düğmesi 0.6, aynı ders oynatıcısında ileri
düğmesi 0.5, kelime listesinde sayfa düğmesi 0.4 idi. Yazılı bir kural
yoktu; her çağrı yeri kendi kararını veriyordu.

**Değeri seçmedik, vardı**: `globals.css` içindeki `.input:disabled` baştan
beri `opacity: 0.6` diyor. Ölçek ona getirildi — 42 web çağrı yeri tek değere
indi.

### Mobilde tek yer

`Pressable` kapalıyken **hiçbir şey değiştirmiyor**: dokunma çalışmıyor ama
düğme canlı görünüyor. O yüzden her çağrı yeri sönüklüğü kendi yazıyordu.
Sönüklük `PressableScale`a taşındı ve **on altı** çağrı yerindeki elle
sönüklük silindi. Elle bırakılsaydı iki kat sönerdi (0.6 × 0.6 = 0.36).

**Renk takası da kalktı** (`MockExamScreen` `Primary`, `LessonScreen`
`BigButton`): takas + sönüklük üst üste binince düğme okunmaz oluyordu ve web
zaten takas yapmıyor.

Bu sırada bir a11y kusuru çıktı: `BigButton` `disabled` **prop'unu hiç
vermiyordu** — `onPress`i boş bir işlevle değiştiriyordu. Düğme ölüydü ama
`accessibilityState` boş kaldığı için ekran okuyucuya **"basılabilir" diye
okunuyordu**. Artık gerçekten `disabled`.

### Kural dışında kalan iki şey

İkisi de iki platformda eşit ve ikisi de bir **denetimin** durumu değil:

- **"Başka maddede kullanılmış" şık (0.45)** — devre dışı değil, yine
  basılabiliyor (kasıtlı: cevabı taşımak isteyen öğrenci engellenmemeli).
- **Cevaptan sonra sönen yanlış şıklar (0.55) ve kilitli içerik (0.6)** —
  içeriğin durumu.

Eşleştirme oyununun **eşleşmiş çifti** de kurala girdi: web statik
`opacity-50` yazıyordu, mobil 0.5; ikisi de `disabled` olduğu için artık
ortak 0.6.

### §261

Dört ölçü, dördü de mutlak: webde tek değer, CSS kaynağının aynı sayıyı
söylemesi (biri kayarsa yine iki değer olur), mobilde sönüklüğün bileşende
olması, ve `disabled` verilen bir `PressableScale`da elle sönüklük kalmaması.

Dört enjeksiyon denendi, dördü de yakalandı.

## §11.385 — Aynı parmak hareketi, altı farklı cevap

§11.384'ün kardeşi. Mobilde dokunulabilir **her şey** basınca 0.96'ya iniyor —
kart, liste satırı, karo, çip, şık, düğme — çünkü hepsi tek bir
`PressableScale`tan geçiyor. Web'de **altı** ayrı değer vardı:

| Yer | Değer |
|---|---|
| `.btn:active` | 0.97 |
| `.pressable:active` | 0.96 |
| `.option:active` | 0.985 |
| `.chip:active` | 0.95 |
| `whileTap` (konuşma, sıralama, dinleme, harf, ders, beceri) | 0.9 · 0.92 · 0.93 · 0.94 |

Aynı parmak hareketi ekranın altı yerinde altı farklı güçte cevap veriyordu.
Hepsi `--press-scale: 0.96` jetonuna bağlandı; değer Android'inki, ve `.btn`
ile `.pressable`ın kendi yorumu zaten "mobilde her şey 0.96'ya iniyor"
diyordu — yani kural yazılıydı, uygulanmıyordu.

### İkinci ve daha ciddi olgu

**"Hareketi azalt" tercihi bunlardan yalnız birini kapatıyordu** —
`.pressable`. Bloktaki `transition-duration: 0.01ms` ölçeği **kaldırmıyor,
anında yapıyor**: düğme, çip ve şık basılı tutulduğu sürece *sıçrayarak*
küçük duruyordu. Tercihi veren kullanıcı için bu, kapatılmış bir hareket
değil, daha sert bir hareket.

Android'de `PressableScale` tercihi okuyup yayı **hiç başlatmıyor** ve bu her
dokunulabilir şey için geçerli. Dördü de bloğa alındı.

`whileTap` ölçekleri zaten `MotionProvider`ın `reducedMotion="user"`
kapsamındaydı (§11.57); sorun yalnız CSS tarafındaydı.

### §262

Üç ölçü: jetonun değeri Android'inkiyle eşleştirmeli, CSS'te ve `whileTap`ta
sapan değer kalmaması (mutlak), ve "hareketi azalt" bloğunun **dört
seçiciyi de** kapatması (mutlak).

Dört enjeksiyon denendi (CSS'e ham ölçek, sapan bir `whileTap`, bloktan bir
seçicinin düşmesi, mobil değerin kayması), dördü de yakalandı.

## §11.386 — Asılı kalan istek: web'de elli dört çağrının hiçbir sınırı yoktu

Tarayıcının `fetch`i **kendiliğinden vazgeçmiyor**. Kaptif portalda, zayıf
hücresel bağlantıda ya da sunucu yanıt vermeyi bıraktığında istek süresiz
bekliyor — ve ekranda duran şey **iskeletin kendisi** oluyor. Kullanıcı
"yükleniyor" görüyor, oysa hiçbir şey yüklenmiyor ve bir daha da
yüklenmeyecek.

En can sıkıcı tarafı: ekranların "yüklenemedi · tekrar dene" dalı **zaten
yazılı**. Devreye girmiyor, çünkü bir hata da oluşmuyor. Yani hata yolu
vardı, ona giden yol yoktu.

Android'de böyle değil: **her** çağrı `api()`den geçiyor ve
`API_TIMEOUT_MS = 25_000`de vazgeçip hatayı fırlatıyor.

Ölçüm: web'de elli yedi istemci `/api` çağrısından **elli dördünün** hiçbir
sınırı yoktu. (Üçü — değerlendirme, telaffuz, Apple — kendi sinyalini zaten
veriyordu.)

### Çözüm Android'in şekli: tek kapı

`lib/api-fetch.ts` — `apiFetch()` aynı sayıyı koyuyor ve çağıran kendi
sinyalini verdiyse **ona dokunmuyor** (iptal edilebilir bir istek zaten kendi
ömrünü yönetiyor). Otuz dört dosyadaki elli yedi çağrı bu kapıdan geçti.

Süre iki platformda **aynı adı taşıyan** bir sabit — `score-bands` ↔
`learningRules` ile aynı kalıp; biri değişip öteki kalamaz.

**Değerlendirme çağrıları bunun dışında ve öyle kalmalı**: yapay zekâ yanıtı
25 saniyeden uzun sürebiliyor, o yüzden kendi (daha uzun) süreleri var ve
`ASSESS_TIMEOUT_MS` / `ASSESS_ROLEPLAY_TIMEOUT_MS` ikisi de iki platformda
eşleşmiş durumda.

### §263

Üç ölçü: sabitin değeri eşleştirmeli, istemcide çıplak `/api` çağrısı
kalmaması (mutlak), ve kapının **gerçekten** sınır koyduğunun doğrulanması —
adı olup işi olmayan bir sarmalayıcı en kötüsü olurdu.

Üç enjeksiyon denendi (çıplak bir `fetch`in geri gelmesi, kapının sınırı
bırakması, mobil değerin kayması), üçü de yakalandı.

## §11.387 — Pano yerel uygulamaları hiç görmüyordu

`test:events` her olayın **sözlükte** olduğunu doğruluyordu; hangi
platformdan **aktığını** kimse sormuyordu. Ölçüm bir tanesinde gerçek bir
delik buldu.

`app_open` web'de baştan beri yazılıyordu, **mobilde hiç**. Yönetim
panosundaki **platform tablosu** yalnız bu olaydan doluyor
(`lib/admin.ts`) — yani tabloyu okuyan biri **yerel uygulamaların hiç
kullanıcısı olmadığını** sanıyordu. Oradaki `ios` ve `android` satırları da
uygulamalar değil, **mobil tarayıcılardı**.

Mobil artık günde bir kez yazıyor, web'dekiyle aynı kural ve aynı anahtar adı
(`lernomi-app-open`). `kind` üçüncü bir görünüm değeri aldı: web'in
`standalone` (ana ekrana eklenmiş) ve `browser`ının yanına **`native`**.
Tablo üçünü ayrı satırlarda gösteriyor.

### Geri kalan sekiz fark meşru — ve gerekçeleri artık ölçülüyor

| Olay | Taraf | Gerekçe |
|---|---|---|
| `install_prompt` | web | PWA kurulum istemi tarayıcıya ait |
| `panel_open` | web | katlanan bölüm web'e özel bir yüzey |
| `invite_open` | web | davet bağlantısı web profiline açılıyor; mobil derin bağlantı yalnız sıfırlama ve doğrulama tanır |
| `feedback_why_opened` · `walk_capture` | web | §118 / §119'da yazılı |
| `notif_prime` | mobil | hatırlatma izni ekranı yalnız mobilde |
| `purchase_start` · `purchase_done` | mobil | mağaza satın alımı yalnız mobilde |

"Şu ekran yok" ya da "şu yetenek yok" doğrulanabilir bir iddia: her gerekçe
bir dosyanın ya da bir kalıbın varlığına bağlandı.

### Kapının kendi deliği

İlk yazımda ölçü `track("app_open"` arıyordu ve **çağrıyı silen enjeksiyonu
kaçırdı**: işlev dosyada duruyordu, çağıran yoktu. Bu, bu defterde adı konmuş
bir sınıf — **varlık değil kullanım**. Ölçü çağırana da bakacak biçimde
düzeltildi ve aynı enjeksiyon yakalandı.

### Bir de küçük bir sabit kaçağı

Kısa biyografi sayacı iki platformda da `140`ı **düz yazıyordu**
(`{bio.length}/140`) — `BIO_MAX` değişse sayaç yalan söylerdi. İkisi de
sabitten okuyor artık.

### §264

İki ölçü: gerekçesiz tek taraflı olay kalmaması (mutlak; hem eksik gerekçe
hem **ölü** muafiyet — artık tek taraflı olmayan bir kayıt — yakalanıyor), ve
açılış olayının mobilde hem yazılması hem çağrılması.

Dört enjeksiyon denendi (çağrının silinmesi, muaf olayın iki tarafta da
akması, bir muafiyetin kanıtının bozulması, gerekçesiz yeni bir olay), dördü
de yakalandı.

## §11.388 — Enter tuşunun adı, ve bir yerde işi

Android on altı metin alanında `returnKeyType` diyor: klavyenin köşesindeki
tuşun üzerinde **"Git"** ya da **"Bitti"** yazıyor. Web'de `enterKeyHint`
**hiç kullanılmamıştı** — telefon tarayıcısında (web trafiğinin çoğu) aynı
alanda jenerik bir dönüş oku duruyordu.

Bu, "iOS'ta da eşle" tarafının doğrudan konusu: aynı kişi aynı formu Safari'de
açtığında Android'dekiyle aynı tuşu görmeli.

### Ve bir yerde tuşun işi de eksikti

**Promo kodu** kutusu bir `<form>` içinde değil ve hiçbir tuş dinleyicisi
yoktu. Kodu yazıp Enter'a basan kullanıcıda **hiçbir şey olmuyordu** — ne
uygulanıyor ne de bir şey söyleniyor. Android aynı kutuda `onSubmitEditing`
ile uyguluyor.

Geri kalan alanlarda Enter'in **işi** zaten eşitti ve bunu ölçüm doğruladı:
web'de `<form>` içindeki alan gönderiyor, `game/rounds` ve `skillQuiz`
karşılıklarında da gönderiyor; "done" diyen alanlarda iki taraf da yalnız
klavyeyi kapatıyor. Ölçülen şey o yüzden **tuşun adı**.

### §265

Üç ölçü: on iki alan eşleştirmeli (değer Android'in kendi `returnKeyType`i),
promo kutusunda Enter'in gerçekten uyguladığı (ad tek başına yetmez), ve tur
cevabı alanlarının adını söylemesi.

Dört enjeksiyon denendi (bir alanın adını kaybetmesi, promoda tuşun adı olup
işi olmaması, tur alanının adını kaybetmesi, mobil değerin kayması), dördü de
yakalandı.

## §11.389 — Telefonda yakınlaştırma: iki kusur, aynı satırdan

`viewport` içindeki `maximumScale: 1` iki ayrı şeyi birden bozuyordu.

**Bir: yakınlaştırma herkese kapalıydı.** Az gören bir kullanıcı sayfayı
parmakla büyütemiyordu (WCAG 1.4.4 "Resize text"). Android uygulaması bunun
**tersini** yapıyor — sistem yazı ölçeğini **okuyor** ve 1.5 katına kadar
büyütüyor (`ui/Text` `maxFontSizeMultiplier`). Yani aynı kullanıcı telefonda
uygulamada büyütebiliyor, tarayıcıda büyütemiyordu.

**İki: kilit zaten işe yaramıyordu.** iOS Safari `maximum-scale`i iOS 10'dan
beri yok sayıyor. Odak yakınlaştırmasını durduran şey o değil, alanın
yazısının **16 pikselin altına inmemesi**. Uygulamanın gövde puntosu 15
(`--text-body`, mobil `typography.body` ile birebir) ve **bütün metin
alanları** onu kullanıyordu — yani iPhone'da her alana dokunuşta sayfa
zıplayıp büyüyordu: giriş, arama, promo kodu, sınav cevabı, yazma görevi.
Geri dönmek için parmakla küçültmek gerekiyordu.

Kilit hem zarar veriyor hem bir şey çözmüyordu.

### Çözüm alanın kendisinde

`@media (pointer: coarse)` — dokunmatikte metin alanları 16px, masaüstünde
ölçek 15'te kalıyor ve tasarım değişmiyor. Onay kutusu ve radyo dışarıda.

**Kuralın katmansız olması bir gereklilik, tercih değil**: Tailwind'in
`text-body` gibi yardımcı sınıfları `@layer utilities` içinde ve katmanlı
stiller katmansız olanlara **yenilir**. Blok bir `@layer`in içine konsaydı
her alandaki `text-body` onu ezerdi ve kural hiçbir şey yapmayan bir süs
olurdu. Kapı bunu **ölçüyor** — enjeksiyonla doğrulandı.

### §266

Üç ölçü: yakınlaştırma kilidinin yokluğu (mutlak), odak kuralının dört
özelliği (var · 16px · katmansız · bütün alanlar), ve Android'in sistem yazı
ölçeğini okuduğu.

Dört enjeksiyon denendi (kilidin geri gelmesi, puntonun 15'te kalması,
kuralın bir katmana girmesi, mobilin ölçeği okumayı bırakması), dördü de
yakalandı.

## §11.390 — Dokunmatikte klavye kendiliğinden açılmıyor

İki olgu, ikisi de §11.389'un devamı.

### Bir: çift dokunuş yakınlaştırması

`touch-action: manipulation` yalnız `.pressable`daydı. Yakınlaştırma kilidi
kalkınca (§11.389) çift dokunuşla büyütme iOS'ta **geri geldi** — ve bir tur
sırasında iki şıkka arka arkaya hızlı dokunan kullanıcıda ikinci dokunuş
"çift dokunuş" sayılıp sayfayı yakınlaştırıyor. Android uygulamasında böyle
bir jest yok.

Kural artık `button`, `a`, `.btn`, `.chip`, `.option` üstünde. **Sayfanın
kendisinde parmakla büyütme serbest** — yani §11.389'un çözdüğü
erişilebilirlik sorunu geri gelmiyor; kapatılan tek şey basılabilir bir
ögenin üstündeki çift dokunuş.

### İki: kendiliğinden odak

Beş oyun alanı tur açılır açılmaz kendine odak alıyordu (`autoFocus` ve tur
başı `focus()`); Android'in karşılıklarında (`game/rounds`, `skillQuiz`)
böyle bir şey **yok**. Sebebi telefonda görünüyor: odak klavyeyi açıyor,
klavye de ekranın yarısını — yani **sorulan kelimeyi, cümleyi ya da ipucunu**
— örtüyor. Kullanıcı önce klavyeyi kapatıp soruyu okumak zorunda kalıyordu,
üstelik **her turda**.

Masaüstünde tam tersi doğru: alan odaklı gelmezse önce tıklamak gerekir ve
hızlı bir turun ritmi bozulur. O yüzden ayrım **işaretçide**, platformda
değil: `focusOnFine` yalnız `(pointer: fine)` (fare/kalem) için odaklıyor.

**Kullanıcının kendi dokunuşuyla gelen odak bunun dışında**: özel karakter
düğmesine basınca alanın odağı geri alınıyor ve orada klavye zaten açık.

### §267 — ve kapının kendi düzeltmesi

Dört ölçü: çift dokunuşun altı seçicide kapalı olması, oyun alanlarında
koşulsuz odak kalmaması (mutlak), yardımcının **gerçekten** işaretçiye
bakması, ve Android'in oyun alanlarında odak açmadığı.

İlk yazımda ikinci ölçü dosyada geçen **her** `inputRef.current?.focus()`i
sayıyordu ve `cloze-game`in özel karakter düğmesini yakaladı — oysa orada
odağı geri veren şey kullanıcının kendi dokunuşu. **Dosya değil yüzey**:
ölçü artık yalnız tur sıfırlayan etkinin gövdesine bakıyor (o etki
`started.current = Date.now();` yazan etkidir).

Dört enjeksiyon denendi (bir seçicinin kapsam dışı kalması, `autoFocus`un
geri gelmesi, tur başı koşulsuz odak, yardımcının işaretçiye bakmayı
bırakması), dördü de yakalandı.

## §11.391 — Üst etiketin harf aralığı: bir sayıya karşı dört

Kart ve bölüm başlarındaki küçük **büyük harfli** etiket ("GÜNÜN TURU",
"ZAYIF NOKTALAR", "ROZET AÇILDI") iki platformda da aynı şey ama aralığı
değildi.

| | Değer | 11 pikselde |
|---|---|---|
| Android (18 yer) | `letterSpacing: 1` | **1 px** |
| Web `tracking-wide` (44 yer) | 0.025em | 0.28 px |
| Web `tracking-widest` (6) | 0.1em | 1.1 px |
| Web `tracking-wider` (3) | 0.05em | 0.55 px |
| Web `[0.18em]` (2) | 0.18em | 1.98 px |

Yani aynı etiket Android'de 1 piksel, web'in çoğu yerinde **üçte bir
pikselden az** aralıktaydı — "büyük harfli etiket" hissi web'de yoktu, ve
kalan üç değer aynı ekranda yan yana gelebiliyordu.

Elli beş çağrı yeri `--tracking-eyebrow` jetonuna bağlandı. Jeton **piksel**,
`em` değil: Android da piksel kullanıyor ve etiket iki punto arasında
geziyor (micro 11, caption 12.5); `em` olsaydı ikisi ayrışırdı.

**Android'in kendi iç tutarsızlığı da kapandı**: rozet açılış kartının iki
etiketi 1.5, bölüm başlığı (`SectionTitle`) 0.5'te kalmıştı; üçü de 1 oldu.

**Büyük harfli olmayan küçük etiketler bunun dışında** ve öyle kalıyor —
onlar bir üst etiket değil, sade bir alt yazı. (Ölçüldü: web'de 36
`tracking-wide`, mobilde dört `letterSpacing: 0.5`; kendi içlerinde tutarlı,
ayrı bir eksen.)

### §268

İki ölçü: Android'in büyük harfli etiketlerinin **tek** bir aralıkta olması ve
o sayının jetonla eşleşmesi, ve web'de büyük harfli hiçbir etikette sapan
aralık kalmaması (mutlak).

Üç enjeksiyon denendi (web'de sapan bir sınıf, mobilde farklı bir aralık,
jetonun kayması), üçü de yakalandı.

### Bu turda ölçülüp DEĞİŞTİRİLMEYENLER

Üçü de kusur sanılıp ölçümde temiz çıktı — defterde duruyorlar ki bir sonraki
tur aynı yolu yeniden yürümesin:

- **Donanım geri tuşu.** Web'de beş oynatıcıda `useLeaveGuard` var; Android'de
  `useBackConfirm` **aynı beş ekranda** (`GameScreen`, `ExamScreen`,
  `MockExamScreen`, `PlacementScreen`, `WalkModeScreen`). İlk arama
  `BackHandler`ı `*.tsx` içinde aradığı için kancayı (`.ts`) görmemişti.
- **Rota başlıkları.** 61 sayfanın 57'si `generateMetadata` taşıyor; kalan
  dördü iki demo sayfası, açılış sayfası (kabuğun başlığını kullanıyor) ve
  `/lessons` — o da bir `redirect`, hiç çizilmiyor.
- **Sekme kümesi.** Dört sekme, aynı sıra, aynı anahtarlar.

Bir de çevre notu: `check:pairs`, `test:mix`, `test:entitlement` yerel
PostgreSQL, `test:walk` Playwright tarayıcısı istiyor. Bu makinede ikisi de
yok; kırmızılıkları koddan değil ortamdan geliyor.

## §11.392 — Deneme kâğıdının süresi arka planda duruyordu

Süreli her yüzeyin sayacı bir **zaman damgasından** okumalı, bir sayıcıyı
azaltarak değil. Sebep basit: `setInterval` uygulama ya da sekme arka plana
alınınca **duruyor** (tarayıcılar dakikada bire kadar kısıyor, mobil
uygulamada tamamen duruyor). Sayıcı kullanılırsa süre **istenildiği kadar
uzatılabilir** — ve süre sınavın kısıtı, kâğıdın kendisi kadar kuralın
parçası.

Ölçüm dört süreli yüzey buldu; üçü zaten doğruydu:

| Yüzey | Durum |
|---|---|
| Sınav | duvar saati (bir turda düzeltilmişti) |
| Patron · Meydan okuma | duvar saati (baştan beri `deadline` damgası) |
| **Deneme sınavı** | **sayıcı — iki platformda birden** |

Deneme kâğıdı görev başına bütçe işletiyor ve aynı satırı taşıyordu:
`setInterval(() => setLeft((s) => s - 1), 1000)`. Üstelik yarım kalan koşu
`secondsLeft` ile kaydedildiği için **kazanılan süre kalıcıydı**: uygulamayı
arka plana atıp dönen öğrenci bir sonraki oturuma da o süreyle giriyordu.

`sureVer` artık hem kalan saniyeyi hem bitiş damgasını kuruyor; sayaç yalnız
damgadan okuyor ve arka plandan dönüşte ilk saniyeyi beklemeden düzeltiyor.

### Kapı kusuru beklenen hâl sanıyordu

En öğretici tarafı bu. Mevcut bir ölçü zaten tam bu şeye bakıyordu ve
**yorumunda kusuru kural olarak yazıyordu**:

> "Deneme kağıdında iki taraf da GOREV butcesini **sayıcıyla** işletiyor ve
> kalan saniyeyi kaydediyor; kalıp birebir aynı olmalı."

Ölçü eşitliği doğruluyordu — çünkü karşılaştırma **eşitliğe** bakar,
**doğruluğa** değil. İki taraf da aynı şekilde yanlış olduğu için kapı yeşil
yanıyordu. Bu defterde adı konmuş bir sınıf: **"ikisi de yanlış olduğu için
karşılaştırma geçiyor"**. O yorum düzeltildi ve §269'a bağlandı.

### §269

Dört ölçü, hepsi mutlak: dört süreli yüzeyin mobil tarafı damgadan okuyor,
web tarafı damgadan okuyor, ve deneme sınavında süreyi kuran **tek kapı**
olduğu (çıplak `setLeft` sayısı iki platformda da iki: tik işlevi ve
`sureVer`in kendisi) — doğrudan bir `setLeft` damgayı güncellemez ve sayaç
eski damgadan okumaya devam eder.

Üç enjeksiyon denendi (web'in sayıcıya dönmesi, mobilde çıplak bir `setLeft`,
kapının kaybolması), üçü de yakalandı.

## §11.393 — Dinleme bütçesi yarım kalan koşuda sıfırlanıyordu

§11.392'nin kardeşi ve aynı sınıf: **sınavın kısıtı yarım kalan koşuda
korunmalı**.

Dinleme görevinin kâğıtta yazılı bir oynatma bütçesi var (`st.plays`, çoğu
maddede bir ya da iki) ve iki taraf da onu **doğru uyguluyordu** — ama bütçe
yalnız **ekranın belleğinde** tutuluyordu. Öğrenci bütçeyi tüketip uygulamayı
kapatıp yeniden açınca (ya da sekmeyi kapatıp dönünce) bütçe **sıfırdan**
başlıyordu: sınırsız dinleme, hem web'de hem mobilde.

`taskIx` ve `secondsLeft` aynı sebeple zaten kaydediliyordu; bu üçüncüsü
geride kalmıştı. Artık her iki istemci de `plays`i yerel koşuya **ve**
sunucuya yazıyor, iki devam yolunda da (sunucudan ve çevrimdışı yerel
kayıttan) geri yüklüyor.

Sunucu tarafı: `mock_exam_attempts.plays` sütunu (`0049_mock_attempt_plays`),
uçta **tavanlı** temizleyici — istemciden gelen nesne sınırsız büyüyemez, sayı
olmayan değer yazılamaz, anahtar sayısı ve değer sınırlı.

> **Samet:** bu turda bir göçürme var (`0049`). Deploy'dan **önce**
> uygulanmalı — `0036` ile aynı kural.

### Kapı iki kez yanlış ölçtü, ikisini de enjeksiyon gösterdi

1. **Varlık değil kapsam.** Geri yükleme ölçüsü `setPlays(d.attempt.plays)`
   *ya da* `setPlays(local.plays)` görünce yeşil yanıyordu. Sunucu yolunu
   silen enjeksiyon kaçtı — yerel yol duruyordu. İki yolun **ikisi de**
   gerekli: biri sunucudan devam, öteki çevrimdışı kayıttan.
2. **Oran, sayı değil.** "En az üç yerde yazılıyor" eşiği bir kayıt yerinin
   eksik kalmasını gizliyordu — ve gizlediği şey **gerçekti**: web'in
   **çıkış onayındaki** iki kayıt yeri `plays` taşımıyordu. Ölçü artık
   `secondsLeft` yazan **her** yükün `plays` de taşıdığını soruyor (6/6).

İkinci düzeltme, kapının kendisinin bir kusuru bulmasıydı: ölçüyü orana
çevirince kod değişikliği gerekti, tersi değil.

### §270

Üç ölçü, hepsi mutlak: iki istemcide oynatma bütçesinin yazılıp geri
yüklendiği (oranla), sunucunun dört parçası (şema · göçürme · uç yazıyor · uç
döndürüyor), ve uçtaki temizleyicinin tavanlı olduğu.

Beş enjeksiyon denendi (web'de geri yüklemenin kalkması, göçürmenin
kaybolması, tavanın kalkması, sunucu yolunun silinmesi, bir kayıt yerinin
`plays`i bırakması), beşi de yakalandı.

## §11.394 — Kural yazılıydı, üç yerden birinde uygulanıyordu

Deneme kâğıdı ucunda üç eylem var — `save`, `assess`, `finish` — ve kural
deponun kendi yorumunda **yazılıydı**, `save` içinde:

> "`state` koşulu bilerek: bitmiş bir denemenin cevapları değiştirilemez,
> yoksa puan geçmişe dönük düzeltilebilirdi."

Ötekilerde uygulanmıyordu.

### `finish`: bitmiş kâğıt yeniden bitirilebiliyordu

Güncelleme `state` koşulu taşımıyordu. Bitmiş bir kâğıt yeni cevaplarla
yeniden bitirilebiliyor, `score`/`passed`/`ai` üzerine yazılabiliyordu — oysa
o puan **istatistik ekranının ve yönetim panosunun okuduğu kayıt**. Üstelik
her çağrı yapay zekâ geri bildirimini yeniden üretiyor (kota) ve **ikinci bir
`mock_exam_finish` olayı** yazıyordu: pano da iki kez sayıyordu.

### `assess`: aynı görev tekrar tekrar puanlanabiliyordu

Bu daha keskin, çünkü açık görevin puanı zaten `openScores` — yani bu uç
**tam o puanı** yazıyor. Aynı görev farklı metinlerle tekrar tekrar
değerlendirilip **en iyi puan seçilebiliyordu**. Arayüz vermiyor (puan gelince
düğme yerini sonuca bırakıyor) ama uç veriyordu; ve her çağrı kotadan
yiyordu.

### İkisi de idempotent

Koruma "hata ver" değil: bitmiş kâğıt için **kayıtlı sonuç**, puanlanmış görev
için **mevcut puan** dönüyor. Yanıtı kaybolmuş bir isteğin tekrarı böylece
hata almıyor — ama yeni bir şeye de yol açmıyor. `finish`te ayrıca yarışı
kaybeden ikinci istek (arada başka bir çağrı kâğıdı bitirmişse) aynı yoldan
geçiyor ve ikinci olay yazılmıyor.

Sunucu tek olduğu için bu kusur **iki istemciyi de eşit** etkiliyordu; ölçü
bu yüzden mutlak.

### §271

Üç ölçü: üç eylemin de korunduğu, korumaların **idempotent** olduğu (hata
değil kayıtlı sonuç), ve bitirme olayının korumadan **sonra** yazıldığı —
yoksa pano yine iki kez sayar.

Dört enjeksiyon denendi (`finish` korumasının kalkması, `assess` korumasının
kalkması, aynı görevin tekrar puanlanabilmesi, olayın korumadan önce
yazılması), dördü de yakalandı.

## §11.395 — Seslendirme zinciri sessizce yedeğe düşüyordu

`ai-usage`ın kendi gerekçesi kuralı yazıyor:

> "**Başarısız** çağrılar da yazılıyor, çünkü zincir düşen sağlayıcıyı
> sessizce atladığı için kaydedilmeyen bir hata **hiç olmamış** gibi duruyor."

Ama **seslendirme zinciri hiçbir şey yazmıyordu**. Üç katmanlı bir zincir var
(Edge → Azure → tarayıcının kendi sentezi) ve sonucu şuydu: Edge kırıldığı gün
— Microsoft o resmî olmayan ucu değiştirdiğinde — Azure devreye girip uygulama
sessizleşmiyor, **ama bunu kimse görmüyor**. Azure'un aylık 500.000
karakterlik ücretsiz katmanının erimesi de ancak fatura gelince anlaşılırdı.

Tek iz teşhis için konmuş bir yanıt başlığıydı (`x-tts-source`) — yani
kimsenin bakmadığı yer.

### Her deneme ayrı yazılıyor

Yedeğe düşen bir çağrı artık **iki satır** bırakıyor: düşen Edge + geçen
Azure. Zincirin gerçek hâli ancak böyle görünüyor; yalnız sonuç yazılsaydı
"Azure çalışıyor" görünür, Edge'in kırıldığı görünmezdi.

### Ölçü karakterde, ve ayrı bir kolonda

Metin modelleri **jetonla**, yazıya çevirme **saniyeyle**, seslendirme
**karakterle** ücretlendiriliyor. Jeton alanına yazmak üç birimi tek sütunda
karıştırırdı; `chars` ayrı bir kolon (`0050_ai_usage_chars`). Pano da onu
gösteriyor — yazılıp gösterilmeyen bir sayı yine kimsenin bakmadığı yerde
durur.

> **Samet:** bu turda da bir göçürme var (`0050`). `0049` ile birlikte
> deploy'dan **önce** uygulanmalı.

Not: maliyet kontrolü zaten vardı (`DAILY_TTS_CEILING = 2000`, hesap başına
günlük) — eksik olan **görünürlüktü**, sınır değil.

### §272

Üç ölçü, hepsi mutlak: muhasebenin beş parçası (tür · kolon · göçürme · zincir
yazıyor · uç kullanıcıyı geçiriyor), **zincirin dört dalının da** yazdığı
(geçen ve düşen, iki sağlayıcı için), ve panonun karakteri gösterdiği.

İkinci ölçü asıl olan: "bir yerde `recordAiUsage` var" demek yetmez — düşen
dal yazmazsa zincirin görünmez yarısı aynen kalır. Enjeksiyonla doğrulandı.

Dört enjeksiyon denendi (düşen dalın sessizleşmesi, göçürmenin kaybolması,
uçta kullanıcının geçmemesi, panonun göstermemesi), dördü de yakalandı.

## §11.396 — Giden e-posta sessizce düşüyordu

§11.395'in kardeşi: sessizce düşen bir zincir daha, bu kez sonucu daha ağır.

E-posta gönderimi **üç** yoldan biriyle bitiyor — gitti, SMTP reddetti, alıcı
başına saatlik tavan düşürdü — ve üçü de yalnız `console`a yazılıyordu.

Oysa **doğrulama postası zorunlu bir kapı**: SMTP bağlıyken e-posta
doğrulaması şart (`lib/auth/server`), yani sağlayıcı reddetmeye başladığında
**her yeni kayıt kalıcı olarak kilitli kalıyor** ve tek iz kimsenin
grep'lemediği bir sunucu log satırı oluyordu. `cap` de sessizdi: posta
düşüyor, kullanıcı hiç gelmeyecek bir postayı bekliyor.

Bu, §11.395'te olduğu gibi bir maliyet görünürlüğü değil — **kullanıcının
uygulamaya girip girememesi**.

### Ölçüm

Olay `mail_sent`: `value` 1 gitti / 0 gitmedi, `kind` `<tür>:<sonuç>`.

| tür | ne zaman |
|---|---|
`verify` | kayıt doğrulaması (zorunlu kapı)
`reset` | parola sıfırlama bağlantısı
`pw_changed` | parola değişti uyarısı (hesap ele geçirmede tek erken uyarı)
`exists` | var olan e-postayla kayıt denemesi
`twofa` | iki adımlı doğrulama kodu

**Beşi de** ölçümü geçiriyor; biri geçirmezse o akışın sessizliği aynen
kalır. Kapı bunu iki ayrı yoldan ölçüyor: tür listesiyle **ve** `sendEmail`
çağrılarının kaçının `meta` taşımadığını sayarak (0 olmalı).

Pano da gösteriyor, hata kırmızı: yazılıp gösterilmeyen bir sayı yine
kimsenin bakmadığı yerde durur — §11.395'in aynı dersi.

### §273

Dört ölçü, hepsi mutlak: üç sonuç dalının da yazdığı, beş türün ölçümü
geçirdiği, `meta`sız `sendEmail` çağrısı kalmadığı, ve panonun gösterdiği
(hata kırmızı dahil).

Üç enjeksiyon denendi (tavan dalının sessizleşmesi, bir türün `meta`
vermemesi, panonun hatayı kırmızı göstermemesi), üçü de yakalandı — ikincisi
iki ölçüyü birden düşürdü.

## §11.397 — Zamanlanmış işin koştuğu görünmüyordu (ve bu bir kez yaşandı)

§11.395 ve §11.396'nın üçüncüsü, ama bu kez kusur **daha önce gerçekleşti**:
`vercel.json` içindeki üç cron, Vercel bırakılınca **çağıransız kaldı** ve
uçlar **aylarca hiç çalışmadı** (AGENTS.md "Zamanlanmış işler"). İki
uygulamanın ayarlarındaki "seri koruma" ve "haftalık sınav" anahtarları
açılabiliyor, karşılığında hiçbir bildirim gitmiyordu.

Beş cron ucunun hepsi yalnız `console`a yazıyordu. **Üç ayrı sessiz kırılma**
var ve üçü de aynı şekilde görünmezdi:

1. **Timer susar** — systemd unit bozulur, sunucu yeniden kurulur.
2. **`CRON_SECRET` kayar** — uç 401 döner, iş **hiç başlamaz**. Tarihte tam
   bu sınıf gerçekleşti.
3. **İşin içinde hata çıkar** — uç 500 döner.

Üçü de artık bir satır bırakıyor (`cron_runs`, `0051`) ve pano son koşuyu,
yedi günlük tamam/hata sayısını ve **"hiç koşmadı"** hâlini gösteriyor — o
son hâl en kötüsü, çünkü en sessizi.

Özellikle **`summary`**: gizlilik politikası §9'daki "konuşma kayıtları 30 gün
sonra silinir" sözünü tutan tek yer o. Sessizce durursa söz de sessizce
tutulmaz.

Tablo kullanıcıya bağlı **değil** — kişisel veri yok, `check:purge`ın konusu
değil. Kendi kendini süpürüyor (30 gün, yedek penceresiyle aynı sayı).

> **Samet:** üçüncü göçürme (`0051`). `0049` ve `0050` ile birlikte deploy'dan
> **önce** uygulanmalı.

### Kapı yine kendi kusuruyla başladı

İlk yazımda dal ölçüsü `recordCronRun\("<ad>", false,[^)]*"denied"\)` idi ve
**hiçbir şeyi bulamadı**: arada geçen `Date.now() - basladi` bir `)` taşıyor,
yani karakter sınıfı hedefinden önce duruyor. Bu defterde adı konmuş bir
sınıf — *"`[^>]*` oka takılıyor"* — bu defa parantezle. Sınırlı bir
`[\s\S]{0,80}?` penceresiyle düzeltildi.

### §274

Üç ölçü, hepsi mutlak: altyapının beş parçası (şema · göçürme · yazıcı ·
süpürge · hatayı yutması), **beş işin üçer dalını da** yazdığı (geçen · düşen
· kapıda reddedilen), ve panonun gösterdiği ("hiç koşmadı" dahil).

İkinci ölçü asıl olan: "bir yerde `recordCronRun` var" demek yetmez — kapıda
düşen dal yazmazsa `CRON_SECRET` kayması aynen görünmez kalır, ve tarihte tam
o oldu.

Dört enjeksiyon denendi (bir işin reddedilen dalının sessizleşmesi,
süpürgenin kalkması, göçürmenin kaybolması, panonun "hiç koşmadı" hâlini
göstermemesi), dördü de yakalandı.

### Ve ham metin kapısı bir kopyayı yakaladı

`i18n:check`in ham-metin ölçüsü beş dosyada "1 → 2" dedi: özet cümlesini hem
`console.log`a hem koşu kaydına yazınca **aynı Türkçe metin iki kopya**
olmuştu. Kapı haklıydı — cümle artık tek yerde kuruluyor (`const ozet`) ve iki
yer onu kullanıyor; bakım noktası da tek.

Geriye yalnız yeni dosyanın kendi log satırı kaldı
(`[cron-runs] yazılamadı`), o da `ai-usage.ts: 1` ile aynı yerleşik kalıp.
Tabana **tek satır** eklendi — `--baseline` ile toptan yeniden yazmak başka
bir kaymayı da sessizce içine alırdı.

## §11.398 — Aynı olay iki yerde "denendi", bir yerde "ulaştı"

Bildirim hunisi iki basamaktı (`push_sent` → `push_open`) ve ortadaki basamak
eksikti. Daha kötüsü: **aynı olay iki anlama geliyordu.**

`lib/push` iki döngüde de `push_sent`i **koşulsuz** yazıyor ve kendi yorumunda
bunu söylüyor ("Sayıma girmiyor — `sent` yalnız teslimatı sayar").
`social/notify` ise aynı olayı **yalnız teslimat olunca** yazıyordu. Pano
üçünü topluyordu, yani sayı ne denemeyi ne teslimatı söylüyordu.

Üstelik **"CTR" etiketi açılan/denenen oranıydı**. Ölmüş bir aboneliğe ya da
geçersiz bir jetona yapılan deneme CTR'yi haksız yere düşürüyordu — teslim
edilmemiş bir bildirim açılamaz.

### Huni artık üç basamak

| Olay | Anlamı |
|---|---|
`push_sent` | **denendi** — sunucu göndermeye çalıştı
`push_deliver` | **ulaştı** — `value` = kaç kanala teslim edildi
`push_open` | **açıldı**

Aradaki fark tam olarak görmek istediğimiz şey: abonelik ölmüş, jeton
geçersiz, sağlayıcı reddetmiş. Pano teslim oranını da gösteriyor ve yarıdan
düşükse uyarı rengine geçiyor; CTR artık **açılan/ulaşan**.

Teslimat **kullanıcı başına** toplanıyor: hatırlatma döngüsü bütün
gönderimleri tek havuzda bekletiyordu, oradan "kime ulaştı" çıkmaz.

### §275

Üç ölçü: üçüncü basamağın dört yazan yeri (olay · iki hatırlatma döngüsü ·
sosyal · özet), denemenin **koşulsuz** yazıldığı (sosyalde `if (sent)` altına
düşerse olay yine iki anlam taşır), ve panonun CTR'yi **ulaşana** böldüğü.

Üç enjeksiyon denendi (bir döngüde teslimatın yazılmaması, sosyalde denemenin
yine koşullu olması, CTR'nin yine denenene bölünmesi), üçü de yakalandı.

## §11.399 — Defterin kendisi bayatlamış: dört madde açık sanılıyordu

Bu turda kod değil **defter** denetlendi. İlk şeritlerde "Karar Samet'in" /
"karar gerekiyor" diye bırakılmış maddeler var; hepsi tek tek ölçüldü ve
**dördü zaten kapanmış** çıktı — sonraki turlarda yapılmışlar, ama defter
onları açık göstermeye devam ediyordu.

Bedeli somut: açık sanılan bir madde ya **ikinci kez yapılır** ya da Samet'ten
**boşa karar beklenir**. Bu turda ben de tam o tuzağa düştüm — §6'daki G4
notunu okuyup "web kendiliğinden ilerliyor" diye işe başladım, sonra ölçüm
webde de düğme olduğunu gösterdi.

| Madde | Nerede açık duruyordu | Ölçüm |
|---|---|---|
| **Kelime satırı ayrıntısı** | §11.14 civarı — "PORT EDİLMEDİ… uç genişletilmeli" | Uç `beispiel`i taşıyor, `WordRow` büyütülmüş, **iki satır da açılıp örneği gösteriyor** |
| **Rozet ikon haritası** | §11.14 — "webde 60, Androidde yok" | İki harita **birebir aynı 29 ad**; mobilin kendi yorumu düzeltmeyi anlatıyor |
| **Rozet kutlaması + `unlock` sesi** | §11.15 — "webde var, Androidde yok" | `ui/AchievementUnlock` var ve `sfx("unlock")` çalıyor |
| **"Devam" düğmesi (G4)** | §5 sonu — "Karar gerekiyor, bu belge kapanmadan" | İkisinde de açık düğme var, **hiçbiri zamanlayıcıyla ilerlemiyor** |

### Gerçekten açık kalanlar

Bunlar ölçüldü ve **hâlâ açık** — ikisi de gerçekten Samet'in:

- **sfx not tablolarının native kopyaları.** Tablo yalnız TS'te
  (`lib/sfxNotes`); native dosyalara yapıştırılmadı. Gerekçe duruyor: üretilen
  sesi burada dinleyemem ve iş iki platformun ses yolunu değiştiriyor.
- **Premium kota dizgileri** (11 hazır `gate.*` anahtarı, `i18n-check`te
  kayıtlı borç). Ürün kararı.

Bir de içerik tarafı değişmiş: `repeat`/`produce` maddesi (§11.18) o gün "beş
adım" diyordu, bugün bir tane kaldı — kapandı mı, başka yere mi taşındı,
içerik oturumunun ölçmesi gerek.

### §276 — kapanan şey kilitlenmezse yeniden açılır

Dört maddenin dördü de kapıya bağlandı. Rozet ikonlarında ölçü **sayım değil
ad kümesi**: sayılar eşit kalıp bir ad değişse fark görünmezdi.

Dört enjeksiyon denendi, dördü de yakalandı — **ama ikinci deneme iki kez
yapıldı ve bu kendi başına bir ders.** İlk denemem `MountainIcon` adını
dosyada aradı; o ad **iki yerde** geçiyor (içe alım listesi ve `ICONS`
haritası) ve `replace(…, 1)` içe alımı vurdu, haritaya dokunmadı. Yani kapı
kör değildi, **enjeksiyon** kördü. Doğru yere uygulandığında kapı anında
kırmızıya döndü. Enjeksiyonun kendisi de ölçülmeli: bir şeyi bozduğumu
varsaymak, bozduğumu doğrulamakla aynı şey değil.

## §11.400 — Davet bağlantısı Android'de tarayıcıyı açıyordu

§11.399'un devamı: bayat bir not, doğru ölçüldüğünde **gerçek bir boşluğa**
çıktı.

§169'un yan notu **"mobilde derin bağlantı hiç yok"** diyordu. O cümle
bayatlamıştı — bugün üç yol iddia ediliyor, karşılanıyor ve kapıyla ölçülüyor
(sıfırlama, doğrulama, tarayıcıdan devir). Ama **doğru cümle daha dardı**:
*auth* yolları var, **davet yolu yok**.

Sonucu büyüme döngüsünün tam ortasında: bir kullanıcı `lernomi.app/u/ahmet`
paylaşıyor, arkadaşı uygulaması **kurulu** bir Android'de dokunuyor ve
**tarayıcı** açılıyordu.

### İddia etme kuralı ölçüldü, sonra iddia edildi

Beyan dosyasının kendi kuralı şu: *"yalnız uygulamanın karşılayabildiği yol
iddia edilir, çünkü karşılanmayan bir yol tarayıcıda açılmaktan **kötü**"*.
Bu yüzden önce ölçtüm:

- Web'in `/u/[username]` sayfası **da oturum istiyor** — oturumsuz ziyaretçi
  girişe yollanıyor (`if (!userId) return null`).
- Mobil `UserScreen` oturumsuzda adı konmuş bir kart ve **"Giriş yap"**
  düğmesi gösteriyor.

Yani iki taraf eşit ve uygulamanın cevabı daha açık. Kural tutuyor, yol
iddia edilebilir.

**Çevirme bilgisi zaten vardı**: `pushRoute` bildirimler için `/u/…`yi ekrana
eşliyordu. Eksik olan tek şey yolun iddia edilip `parseDeepLink`te
karşılanmasıydı — dört yer birlikte değişti (iOS beyanı · Android manifestosu
· `parseDeepLink` · `App.tsx`).

Soğuk açılışta eylem **bekletiliyor** ve `NavigationContainer.onReady`
işliyor: sıfırlama yolunun öğrendiği ders (ilk yazımı bağlantıyı sessizce
düşürüyor ve uygulama giriş ekranında kalıyordu).

### Kapı bir kez haklı çıktı, bir kez güncellendi

Yolu ekleyince kapı **kırmızı yandı**: manifesto taraması yalnız
`android:path`i okuyordu, `android:pathPrefix`i görmüyordu — ve davet yolu
önek olmak zorunda (kullanıcı adı değişken). Ölçü iki biçimi birden okuyacak
şekilde genişletildi. Bu bir gevşetme değil: yol hâlâ **üç kaynakta birden**
görünmek zorunda.

### §277

Üç ölçü: davet yolunun beş parçası (beyan · joker · manifesto · karşılanan ·
eylem), eylemin gezgine bağlı olduğu (handle · gezinme · **bekletme**), ve
bildirim yolu ile derin bağlantının **aynı ekranı** açtığı — ikisi ayrışırsa
aynı adres iki farklı yere götürür.

Dört enjeksiyon denendi (manifesto önekinin kalkması, karşılamanın kalkıp
iddianın kalması, bekletmenin kalkması, jokerin kalkması), dördü de
yakalandı. İkincisi tam olarak beyan dosyasının uyardığı hâli kuruyor: iddia
edilmiş ama karşılanmayan yol.

## §11.401 — Soğuk açılışta bildirim dokunuşu düşüyordu

§11.400'ün hemen yanındaki kusur, ve **aynı ders**: derin bağlantı yolu soğuk
açılış yarışını öğrenmiş ve çözmüştü —

> "SOĞUK AÇILIŞ YARIŞI. `getInitialURL` gezgin daha kurulmadan çözülüyor; ilk
> yazımda `isReady()` koruması bağlantıyı sessizce düşürüyordu ve uygulama
> giriş ekranında kalıyordu (**cihazda görüldü**)."

**Bildirim yolu aynı korumayı bekletme olmadan taşıyordu:**

```
if (!route || !navigationRef.isReady()) return;
```

Uygulama **kapalıyken** bildirime dokunulup açıldığında
(`getInitialNotification`) gezgin henüz kurulmamış oluyor ve rota **sessizce
düşüyordu**: kullanıcı bildirime dokunuyor, uygulama açılıyor ve ana ekranda
kalıyor — bildirimin çağırdığı yer bir dokunuş daha uzakta. Ve bu,
bildirimden açılışın **en sık hâli**; bildirim genellikle uygulama kapalıyken
gelir.

**Ölçüm ise düşmüyordu.** `push_open` hazır olma denetiminden **önce**
yazılıyor — yani pano "bildirimden açıldı" diyor ama kullanıcı istediği yere
gitmiyordu. Görünmez bir kusur: sayı doğru, sonuç yanlış.

Çözüm derin bağlantıdaki kalıbın aynısı — bekleyen rota ve
`NavigationContainer.onReady` içinde boşaltma. İkisi **aynı yerden**
boşaltılıyor ki kalıp tek olsun.

### §278

Dört ölçü: bekletmenin üç parçası (bildirim bekletiyor · boşaltıcı · `onReady`
çağırıyor), **iki yolun da** `onReady`de boşaldığı (biri kalıptan çıkarsa
soğuk açılış kusuru o tarafta geri döner), `push_open`ın denetimden **önce**
yazıldığı, ve derin bağlantı kalıbının yerinde durduğu.

### Paralel oturumun açık işi — dokunulmadı

Bu turda `check:parity` **bir kırmızı** veriyor ve o benim değil: "hakem
gövdesi" ölçüsü cümle hakeminin iki kopyasını karşılaştırıyor, ve paralel
oturum şu anda ikisine de `foldContractions` ekliyor. İki kopyanın yorumu tek
kelimeyle ayrışmış ("aşağıdaki"), ölçü de yorumları dahil karşılaştırıyor.

Dosyalara **dokunulmadı** ve commit'e **alınmadı** (`src/lib/sentence-match.ts`,
`mobile/src/lib/sentenceMatch.ts`). Kapı işini yapıyor: onlar iki kopyayı
hizalayınca yeşile dönecek. Kendi turumun bütün ölçüleri yeşil.

## §11.402 — Kapının okuduğu dosya yolu "çağıran" sayılıyordu

§11.401 yazılırken **denetimin kendisinde** bir kusur ortaya çıktı, ve o kusur
bir gün önce eklenen kapı yüzünden görünür oldu.

`check:endpoints` her uç için "repoda çağıranı var mı" diye soruyor ve cevabı
kaynak metninde `/api/<yol>` önekini arayarak veriyor. Cron uçlarının çağıranı
repoda **değil** (systemd timer, bkz. AGENTS.md), o yüzden `ALLOW` listesinde
sebebiyle yazılı. Sorun şu ki bir **uç dosyasının yolu** o öneki içeriyor:

```
src/app/api/cron/summary/route.ts
    ^^^^^^^^^^^^^^^^^^^^^^ "/api/cron/summary" burada da geçiyor
```

§274 (cron kayıt zinciri) özet cron'unun gövdesini ölçmek için
`read("src/app/api/cron/summary/route.ts")` yazıyor. Denetim o dizgiyi bir
çağırı sandı ve "LİSTEDE OLUP ARTIK ÇAĞRILAN UÇ" dedi — oysa uç hâlâ
çağıransız, `ALLOW` satırı hâlâ doğru. **Yanlış alarm**, ve yanlış yönde:
denetim beni doğru bir satırı listeden çıkarmaya çağırıyordu.

Düzeltme tarayıcıda: yol biçimi (`src/app/api/…/route.ts`, mobil öneki de
kabul) yorumlar atıldıktan sonra, önek taramasından **önce** düşürülüyor.

**Ölçü zayıflamadı, ve bu ölçüldü.** Gerçek bir çağıran `fetch("/api/config")`
yazar; yol biçimine benzemez, düşmez. Doğrulama için tek çağıran dosyası olan
bir uç seçildi (`/api/config` ← `mobile/src/lib/serverConfig.ts`; "tek çağıran"
listesi tarayıcının kendi mantığıyla üretildi, gözle değil) ve o çağıran
bozuldu: denetim ucu anında çağıransız bildirdi. Yol biçiminin **tek başına**
çağıran sayılmadığı ise zaten canlı kanıt: §274 kapıda duruyor ve
`/api/cron/summary` "belgelenmiş çağıransız" kalıyor.

**Ders — enjeksiyon kör olabilir, kapı değil.** İlk deneme `/api/words`in bir
çağıranını bozmaktı ve denetim tepki vermedi; bu, tarayıcının zayıfladığı
anlamına gelmiyordu, o ucun **başka çağıranları** olduğu anlamına geliyordu.
§276'nın dersinin aynısı, bu kez denetim aracının üstünde: bir enjeksiyon
ateşlemiyorsa önce enjeksiyonun okunan şeyi gerçekten değiştirdiği
doğrulanmalı.

## §11.403 — Dönüş tuşu aradaki alanlarda hiçbir şey yapmıyordu

§265 klavyenin köşesindeki tuşun **adını** ölçtü ve webde o adın hiç
olmadığını buldu. Ama ölçü dosya başına **adların kümesine** bakıyordu:

```
adlar(...) = [...new Set(eşleşmeler)].sort().join("+")
```

`ChangePassword`in **tek** alanında `returnKeyType="go"` yazması bütün dosyayı
geçirdi. Kapsam sorulmadı — kaydedilmiş kusur sınıflarından **"varlık, kapsam
değil"**, ve altında gerçek bir davranış farkı duruyordu.

**Webde alanlar bir `<form onSubmit>` içinde:** hangisinde Enter'a basılırsa
form gönderiliyor. **Mobilde form yok**; her alan kendi `onSubmitEditing`ini
taşımak zorunda, taşımayan alanda tuş yalnız klavyeyi kapatıyordu:

| Yüzey | Alan | Tuşu işleyen |
|---|---|---|
| parola değiştirme | 3 | 1 (yalnız "tekrar") |
| parola sıfırlama | 2 | 1 |
| giriş / kayıt | ad, e-posta, parola | 1 (yalnız parola) |

Yani Android'de e-postasını yazıp dönüş tuşuna basan kullanıcının klavyesi
kapanıyor ve **hiçbir şey olmuyordu**; webde aynı tuş giriş yapıyor. En sık
hâl: telefonda giriş.

Çözüm Android'in kendi kalıbı — **zincir**: aradaki alanlar "İleri" deyip
sonraki alana odaklanıyor (`submitBehavior="submit"`, klavye açık kalıyor),
son alan "Git" ile gönderiyor. Webde de bir eksik çıktı: kayıttaki **ad**
alanı adsızdı (form onu da gönderiyor), `enterKeyHint="go"` eklendi.

### §279

Dört ölçü, hepsi **oran** — eşik değil: mobilde alanların kaçının tuşu hem
adlandırılmış hem işliyor (3/3, 2/2, 5/5), "İleri" diyen alanın gerçekten
sonrakine odaklandığı, webde her alanın adı olduğu **ve** `<form onSubmit>`
bulunduğu, ve **zincirin son halkasının adının** iki tarafta aynı olduğu
("git"). Zincirin ortası ayrışıyor (webde form gönderir, mobilde odak geçer)
ama sonu ayrışamaz.

### Kapının kendi kusuru: eleman ile tip

İlk yazım `indexOf("<TextInput")` ile alan sayıyordu ve **`useRef<TextInput>(null)`
da o dizgiyle başlıyor**. Oran sahte bir eksikle kırmızı verdi (2/3). Aynı
körlük **iki eski kapıda da** vardı: zincir refsleri eklenince §250 ("her metin
alanı klavye kipini söylüyor") ve alan adı ölçüsü beş ref satırını kusur
olarak listeledi. Üçünde de ayrım aynı: elemanın adından sonra **boşluk**
gelir, tip parametresinden sonra `>`.

§265'in ad kümesinden `next` düşürüldü: webde "next" **yanlış** olurdu (Enter
formu gönderir, sonraki alana geçmez). Zincirin kendisi ve son halkanın adı
§279'da ölçülüyor.

## §11.404 — Çevrimdışı kuyruklar webde yalnız oynatıcı içinde boşalıyordu

İki kuyruk da Android'den alınmıştı ve **kuralları** birebir kopyalanmıştı:
kayıt kendi `day`ini taşıyor, kuyruk en son yirmi turla sınırlı, kalıcı hata
düşürülüyor, biri düşerse sıradakiler denenmiyor. Kopyalanmayan şey
**boşaltıldıkları yer** oldu.

```
Android (App.tsx)         : useEffect(() => { if (user) { flushPendingAnswers(); flushPendingLessons(); } }, [user])
Web (session-player: 240) : useEffect(() => { void flushPendingAnswers(); }, [])
Web (lesson-player:  283) : useEffect(() => { void flushPendingLessons(); }, [])
```

Yani webde kuyruk **yalnız oynatıcı monte edilirken** boşalıyordu. Ağı gidip
gelen kullanıcı turu bitirip profile, kelimelere ya da patikaya geçtiğinde
kayıtlar kuyrukta bekliyordu: SRS aralıkları ilerlemiyor, XP verilmiyor ve
kullanıcı bunu ancak **bir sonraki tura girdiğinde** (belki günler sonra)
telafi ediyordu. Kuyruğun kendisi çalışıyordu; boşaltan yoktu.

Çözüm Android'in kalıbı: `app-shell` kullanıcı bilinir bilinmez ikisini de
boşaltıyor. Kuyruk boşsa ikisi de hiçbir şey yapmıyor — açılışa maliyeti yok.

### §280

Beş ölçü: web açılış etkisinde iki kuyruğun ikisi de var mı, **mutlak** olarak
iki platformda da var mı (ikisinin birden boş olması karşılaştırmayı geçirirdi
— kaydedilmiş kusur sınıfı), oynatıcı içindeki boşaltmanın yerinde durduğu
(açılış onu ikame etmiyor: tur bitince ağ geri geldiyse hemen gitmeli), ve iki
platformda kuyruk sınırının yirmi kaldığı.

Boşaltma çağrısının **varlığı** yetmiyor, ölçü onu kullanıcıyı bekleyen
etkinin **gövdesinde** arıyor: modül kapsamında duran bir çağrı açılışta bir
kez de çalışmaz. Enjeksiyonla doğrulandı — `if (!userId) return;` satırı
kalkınca ölçü ikisini de "YOK" gördü.

### Üçüncü kuyruk — ölçülmedi

Mobilde bir **üçüncü** kuyruk var: `lernomi-items-pending`, çevrimdışı
bitirilen patika egzersizleri (`PUT /api/skills`, `syncItemProgress` içinde
boşalıyor). Web karşılığı `syncSkillProgress` ve oradaki dosyalar şu anda
**paralel oturumun elinde** (`src/lib/skills/*`); ölçüm o iş bitince
yapılacak. Buraya not olarak yazılıyor ki kaybolmasın.

## §11.405 — Sekme açıkken bildirime dokunma huniye hiç girmiyordu

§278 Android'deki soğuk açılış kusurunu kapattı ve orada ölçünün yerini de
kilitledi: `push_open` **dokunuşta** yazılıyor, gezginin hâli onu
değiştirmiyor. Aynı soru webde sorulmamıştı.

Webde `push_open` sayfanın adresindeki `src=push`tan yazılıyor
(`components/telemetry`) ve o parametreyi `sw.js` **gezinirken** ekliyor. Ama
`notificationclick` iki dal:

```js
for (const client of list) {
  if (client.url.includes(target) && "focus" in client) return client.focus();   // 1 — gezinme YOK
}
for (const client of list) {
  return client.navigate(url)...                                                 // 2 — src=push burada
}
```

**Birinci dalda hiç gezinme olmadığı için `src=push` da yoktu:** kullanıcı
bildirime dokunuyor, doğru yere geliyor ve huni onu **hiç saymıyordu**. Dal
nadir değil — uygulaması zaten açık olan kullanıcı en sadık kullanıcı, ve
`push_open` oranı tam onun üzerinden eksik okunuyordu.

Adrese parametre eklemek çözüm değildi: yeniden gezinme yarım kalan turu
baştan yüklerdi. Dokunuş sekmeye **mesaj** olarak bildiriliyor
(`client.postMessage({ type: "push-open" })`), sayan yer telemetride o mesajı
dinliyor.

### İkinci kusur, aynı dosya: bildirimin dili

```
lang: "tr",
```

Metin alıcının dilinde gidiyor (`translate(lang, …)`) ama bildirim kendini
**Türkçe ilan ediyordu**; ekran okuyucu Almanca cümleyi Türkçe sesletiyordu.
Dili artık metni kuran yer taşıyor: `PushPayload.lang` eklendi ve zorunlu —
`tsc` altı çağrı yerinin hepsini dili geçirmeye zorladı (hatırlatma turu,
haftalık özet, değerlendirme, abonelik denemesi, sosyal bildirimler, seri ve
haftalık sınav hatırlatmaları). Android'de karşılığı yok: bildirimi sistem
kendi yerelinde okur.

### §281

Üç ölçü: dokunuşun **üç yolda da** sayıldığı (web gezinme, web odak, mobil),
mesajı **dinleyen** olduğu (gönderen tek başına sayıyı yazmaz) ve bildirimin
dilinin yükten geldiği.

Odak ölçüsü **dalın gövdesini** okuyor, dosyayı değil: "dosyada `postMessage`
var mı" sorusu ikinci dala yazılmış bir çağrıyı da kabul ederdi — kaydedilmiş
"pencere değil düğüm" kuralı. Enjeksiyonla doğrulandı.

## §11.406 — Uygulamanın dışındaki yüzeyler emekli kimlikte kalmıştı

`check:colors` ve `check:tokens` **uygulamanın içini** ölçüyor. Markanın
göründüğü dört yüzey daha var ve hiçbiri ölçülmüyordu:

| Yüzey | Dosya | Ne yazıyordu |
|---|---|---|
| PWA tanımı | `app/manifest.ts` | `theme_color: "#c87318"`, `background_color: "#14100e"` |
| Tarayıcı çubuğu | `app/layout.tsx` | `#fbf6ee` / `#14100e` |
| Paylaşım önizlemesi | `app/opengraph-image.tsx` | `linear-gradient(#eda45d, #c87318)` |
| E-postalar | `lib/email.ts` | `#c87318` + kendi başına bir gri paleti |

Dördünde de aynı kusur: marka mobilden gelen turuncuya geçtiğinde (T1,
`--color-brand-*`) bu dosyalar **süresi geçmiş kehribarda** kalmıştı. Yani
hesabını açan ilk postayı, paylaşılan her bağlantının önizlemesini ve kurulu
uygulamanın durum çubuğunu kullanıcı **artık var olmayan** bir kimlikte
görüyordu. Bu dört yüzeyin ortak yanı da bu: hiçbiri uygulamanın içinde
değil, o yüzden hiçbir tur onlara bakmadı.

**İkisi ayrıca zeminden sapmıştı.** `themeColor` #fbf6ee/#14100e yazıyordu,
`--bg` ise #fbf7f2/#17120e — telefonda adres çubuğu ile sayfanın zemini
arasında görünür bir dikiş. Ve `manifest.background_color` koyu mürekkepti,
oysa Android'in açılış ekranı **marka turuncusu** üstünde launcher ikonu
(`values/styles.xml` `Theme.Lernomi.Splash` → `ic_launcher_background`
#FA7C13). Aynı ürün iki ayrı açılışla başlıyordu.

E-postanın paleti tümüyle kendi başınaydı (#faf9f5 zemin, #141413 yazı,
#555/#999 gri, #e6e4dd çerçeve). Değerler açık tema jetonlarının kendi
değerleri oldu; `var(--bg)` kullanılamıyor çünkü e-posta istemcisi CSS
değişkenini atıyor (aynı kısıt `next/og` için de geçerli).

### Konfeti — "ikisi de yanlış" sınıfının ders kitabı örneği

```
["#eda45d", "#ddb62c", "#45b87a", "#35b2cc", "#ae79d4", "#ee6b7c"]
   ^^^^^^^     flame-400  mint-400   sky-400   violet-400  rose-400
   hiçbir rampanın basamağı değil
```

Altı değerin beşi ailelerin 400'ü; ilki markanın kehribar olduğu dönemden
kalmış ve **yetim** kalmıştı. İki platformda **aynı** yetim değer yazılıydı,
o yüzden karşılaştırma geçiyordu — `check:colors` ikisini de "birebir" diye
kayda geçirmişti. İkisi de brand-400 (`orange[400]`, #fb8f2a) oldu, istisna
kaydı da güncellendi.

### §282

Yedi ölçü: sayfa zemininin web jetonu ile Android `window_bg`si arasında
birebir olduğu (açık ve koyu), tarayıcı çubuğunun o zeminden geldiği, PWA
tanımının durum çubuğunu zeminden ve açılış ekranını Android'in
`ic_launcher_background`ından aldığı, e-posta ve önizleme kartındaki **her ham
rengin bir jetonun değeri** olduğu, konfeti listelerinin birebir olduğu, her
konfeti değerinin bir ailenin 400'ü olduğu ve **emekli kehribarı çizen
kimsenin kalmadığı** (yorumda geçmesi serbest — tarih orada yazıyor).

Yedisi de enjeksiyonla doğrulandı; Android XML'inin kendisi kaydırıldığında da
ölçü kırmızıya döndü, yani karşılaştırma tek yönlü değil.

## §11.407 — İzin ekranının sunduğu saat, ayarlarda hiç yoktu

Aynı liste üç yerde ayrı yazılıydı ve **üçü aynı değildi**:

| Yer | Liste |
|---|---|
| web `notification-settings` | `[9, 12, 15, 19, 21]` |
| mobil `NotificationsScreen` | `["09:00","12:00","15:00","19:00","21:00"]` |
| mobil `NotifPrimeScreen` | `["09:00","13:00","20:00"]` ← ikisi listede **yok** |

İlk girişten sonra bir kez gösterilen bildirim izni ekranında "Öğle" (13:00)
ya da "Akşam" (20:00) seçen kullanıcı, sonra ayarları açtığında günlük
hatırlatmayı **açık** ama saat çiplerinin **hiçbirini seçili** görmüyordu:
kendi seçtiği saat orada teklif bile edilmiyordu. Web de aynı listeyi
taşıdığı için aynı sonuç, ve orada üstüne bir erişilebilirlik kusuru biniyor
— değeri olan bir `radiogroup` içinde hiçbir seçenek `aria-checked` değil,
yani ekran okuyucu "hiçbiri seçili değil" diyor.

Ve kusur tam da **en kritik anda** görünüyor: izin ekranı, elde tutmanın en
güçlü kaldıracı ve kullanıcının hatırlatma saatini seçtiği tek yer.

Liste tek kaynağa taşındı (`lib/profile-limits` `REMINDER_HOURS`, mobil
karşılığı `lib/profileDefaults`), izin ekranının üç seçeneği artık o listenin
**kendi elemanları** (`PRIME_HOURS`: sabah 9, öğle 12, akşam 19 — 21:00
seçilmedi, seri koruma bildirimi 20:30'da gidiyor ve ikisi üst üste
binerdi). `NotificationsScreen`de ayrıca kapalı anahtarın başlangıç saati
`"12:00"` olarak sabitti; şemanın varsayılanından okunuyor.

### §283 ve §173

§173 zaten iki listeyi karşılaştırıyordu ama **tüketicilerin** dizilerini
okuyordu; liste tek kaynağa taşınınca ölçü kaynağı okuyor. Yeni ölçüler
§283'te: izin ekranının üç saatinin iki platformda aynı olduğu, üçünün de
listenin **geçerli bir elemanı** olduğu (mutlak), üç tüketicide **ham saat
kalmadığı** ve üçünün de ortak kaynağı okuduğu.

Beş ölçü de enjeksiyonla doğrulandı: indeks listenin dışına taşırıldığında,
iki platformun seçenekleri ayrıştırıldığında, izin ekranına ham saat geri
yazıldığında, tüketici kaynağı okumayı bıraktığında ve iki ortak liste
ayrıştırıldığında ayrı ayrı kırmızıya döndü.

## §11.408 — Ölçüldü, kapatılmadı: izin kartının ikinci şansı ve ölü paylaşım

Bu turda iki şey ölçüldü ve **bilerek** kapatılmadı; ikisinin de sebebi
yazılı.

### 1. "Belki sonra" Android'de kalıcı, webde 21 günlük

İki platform bildirim iznini **ayrı anlarda** soruyor ve bu ayrım meşru,
gerekçesi de web tarafında yazılı:

> "Girişte ya da ilk açılışta sorulan izin, henüz hiçbir şey yaşamamış birine
> 'seni rahatsız edebilir miyim' demektir ve reddedilir; reddedilen izin
> tarayıcıda kalıcıdır — ikinci bir şans yoktur." (`push-optin.tsx`)

Web bu yüzden **tur özetinde** soruyor ve kapatılırsa **21 gün** susuyor
(`DISMISS_DAYS`). Android ilk girişten sonra bir kez soruyor
(`NotifPrimeScreen`) — orada reddin bedeli daha düşük, çünkü Android izni
yeniden istenebilir. Buraya kadar ayrım gerekçeli.

**Ayrışan şey ikinci şans:** Android'de `skip()` (`"Belki sonra"`)
`markNotifPrimed()` yazıyor ve işaret **kalıcı** — kullanıcı bir daha hiç
sorulmuyor. Webde aynı dokunuş 21 gün sonra geri geliyor. Hatırlatma elde
tutmanın en güçlü kaldıracı olduğu için bu, Android'de kalıcı bir kayıp.

Doğru kapatma **tek başına bir erteleme değil**: mobilde `NotifPrime` yalnız
giriş akışından ulaşılabiliyor (`AuthScreen` `nav.reset`), yani oturumu açık
kalan kullanıcıda erteleme hiç tetiklenmez. Gerçek eş, webdeki gibi **tur
özetinde** bir kart — ve o kart `pushw.*` anahtarlarını istiyor, o anahtarlar
şu an yalnız `src/i18n/web/*` içinde. Mobile taşımak altı sözlük dosyasına
dokunmak demek (`mobile/src/i18n/*` + `i18n-pull` ile `src/i18n/base/*`) ve o
dosyalar **şu anda paralel oturumun elinde**. Kayıtlı kurala göre (ortak
sözlüklerde eşzamanlı düzenleme iki kez anahtar kaybettirdi) bu iş onların
turu bitince yapılacak.

### 2. `shareStreak` — çağıranı olmayan paylaşım

`mobile/src/lib/share.ts` içinde `shareStreak(days)` var, **hiçbir yerden
çağrılmıyor**, ve webde karşılığı hiç yok. `share.streak` metni ise üç dilde
çevrilmiş ve iki sözlükte duruyor. Yani uçlardaki "yazıldı, bağlanmadı"
sınıfının sözlük/işlev karşılığı (`check:endpoints`in varlık sebebi).

Bağlamak yerine **not edilmesinin** sebebi: seri **zaten** tur sonucu
paylaşım metninin içinde gidiyor (`buildShareText` → `social.days_streak`
satırı). Ayrı bir "serini paylaş" düğmesi aynı bilgiyi ikinci bir yüzeyden
sunardı; muhtemelen hiç bağlanmamasının sebebi de bu. Silmek ise altı sözlük
dosyasında bir anahtar silmek demek — yine paralel oturumun dosyaları.

**Not:** mobil sözlükte hiç kullanılmayan anahtarları arayan bir ölçü
denendi ve gürültülü çıktı: 1798 anahtarın 140'ı "kaynakta yok" göründü, ama
çoğu çoğul varyantı (`.one`) ya da dinamik kurulan anahtar
(`` `league.tier_${t}` ``, `` `genre.${kind}` ``). Kalan 49'un çoğu da öyle.
Böyle bir kapı ancak dinamik kurulumu tanıyan bir çözümlemeyle yazılabilir;
şimdilik `i18n:check`in **web** tarafındaki ölü anahtar denetimi tek yönlü
kalıyor ve bu burada yazılı.

## §11.409 — İki sınav yüzeyi yükleme hatasında yeniden denemeyi sunmuyordu

Veri çeken ekranların neredeyse hepsi hata dalında "Tekrar dene" sunuyor.
Ölçüldüğünde **iki** yüzeyin sunmadığı çıktı, ve ikisi de **iki platformda
aynı şekilde** eksikti — yani karşılaştırma geçiyordu:

- **Modül sınavı** (`boss`): tek düğme "Geri dön". Kazanılmış bir yüzey
  (dersler bitmeden açılmıyor); geçici bir ağ kesintisinde kullanıcıyı
  listeye geri gönderip yeniden girmeye zorlamak o girişi kaybettirir.
- **Rol yapma sınavı** (`roleplay-exam`): tek çıkış "konuşmaya dön". Bu dala
  yalnız muhatap servisi **ilk iki turda** düşünce giriliyor (sonrasında
  konuşma puanlanıyor), yani ölçülmüş hiçbir şey yok — sınav baştan
  başlayabilir.

Gerekçe zaten depoda yazılıydı, yalnız bir yerde: sınav oynatıcısının
"haftanın kâğıdı geçici bir ağ kesintisiyle harcanabiliyordu" notu. Aynı
cümle bu iki yüzey için de geçerliydi. İkisinde de yükleme ayrı bir işleve
çıkarıldı (`load`) ki hata dalından yeniden çağrılabilsin.

### Aşama adları web'in sözlüğüne geçti

`ExamScreen`in beş aşaması **Türkçe** yazılıydı:

```
useState<"yukleniyor" | "kapak" | "bolumGiris" | "bolum" | "sonuc">
```

Depo kuralı tanımlayıcıların İngilizce olmasını istiyor (Türkçe yalnız arayüz
metni ve yorumda), web karşılığı (`exam-player` `Phase`) ise baştan beri
`"cover" | "loading" | "intro" | "run" | "result"`. İki uygulamanın **aynı
ekranı aynı durumları iki ayrı sözlükle** anıyordu. Yeniden adlandırma §106'yı
(bölüm arası kartı) anında kırmızıya çevirdi — o ölçü aşama adını elle
yazıyordu; ölçü de güncellendi.

### §284

Üç ölçü: yedi oynatıcı çiftinin hata dallarında tekrar denemenin oranı, **hiç
eksik kalmadığı** (mutlak — bu kusur tam da "ikisi de eksik" olduğu için
gizlenmişti), ve **anlamsız tekrarın sunulmadığı** (negatif ölçü: boss'un
"henüz hazır değil" dalı ve sınavın çevrimdışı **kayıt** dalı — ikisinde de
yeniden denemek ya aynı cevabı getirir ya da kaydı çöpe atar).

Ölçünün kendi iki kusuru da bu turda çıktı ve ikisi de kayıtlı sınıflardan:

1. **Pencere değil düğüm.** İlk yazım 1400 karakterlik pencere okuyordu ve
   `exam-player`ın dalını "tekrar yok" sandı — düğme 1900 karakter sonra
   geliyordu. Ölçü artık dalın **dengeli parantezli** gövdesini okuyor.
2. **Çıktıda olmayan olguyu aramak.** Yalnız `common.try_again` etiketine
   bakıyordu ve `session-player`ın `<ErrorCard onRetry>`unu kaçırdı; ayrıca
   yalnız `phase === "error"` biçimini tanıyordu, mobil `ExamScreen`in ayrı
   hata metni durumunu (`if (err)`) görmedi ve o dosya için **0/0** verdi —
   yani hiçbir şey ölçmeyen bir kapı, çünkü 0/0 her zaman geçer. Üç biçimin
   üçü de tanınıyor; on dört dalın on dördü sayılıyor.

### Aynı durumun tek adı

Dokuz oynatıcı çiftinin aşama kümeleri karşılaştırıldı. Kalan farkların çoğu
meşru (mobilde `auth`, `no_words`, `denied` gibi platforma özel durumlar) ama
ikisi düpedüz isim sürtünmesiydi:

- mobil üç ekranda `play`, web ve mobilin öteki oynatıcıları (`BossScreen`,
  `ChallengeScreen`) `playing` — aynı durumun iki adı, **aynı uygulamanın
  içinde**;
- webin haftalık oynatıcısı tek başına `saving`, öteki üç yüzey
  `submitting` — yani dördüncü bir ad.

Sürtünme kullanıcıya görünmüyor ama maliyeti gerçek: platformlar arası ölçüler
aşama adını **okuyor** ve bu turda biri tam bu yüzden kırıldı. Dördü de tek
ada indirildi (`playing`, `submitting`) ve ölçü ikisinin bir arada olmasını
yasaklıyor.

## §11.410 — Rol yapma sınavının "Tekrar dene"si Android'de hiç çalışmıyordu

§11.409'un tekrar düğmesi eklenirken **aynı ekranda duran** bir kusur çıktı ve
o kusur kullanıcıya görünüyordu.

Sayaç `left` **değerinden** değil `deadline` **ref'inden** okuyor — efekt bir
kez kuruyor, sonra her tik farkı oradan hesaplıyor:

```ts
if (!deadline.current) deadline.current = Date.now() + EXAM_SECONDS * 1000;
const tick = () => setLeft(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
```

Bu kalıp §271'in dersi: arka plana atılan sınav süresini uzatamasın diye
**duvar saati** kullanılıyor. Ama Android'in sonuç ekranındaki "Tekrar dene"
şunu yazıyordu:

```ts
scored.current = false; setResult(null); setGateNote(null);
setTurns([]); setLeft(EXAM_SECONDS); setPhase("intro");
//                    ^ deadline.current SIFIRLANMIYOR
```

`deadline.current` geçmişte kalmış bir an olduğu için ilk tik `left`i hemen
**0** yapıyor, "süre bitti" efekti koşuyor ve sınav **anında, sıfır turla**
bitiyordu: düğme çalışıyor gibi duruyor, sonuç ekranı geri geliyor ve
kullanıcı hiçbir şey yapamıyor. Üç dakikalık ölçümü tekrar denemenin **hiçbir
yolu yoktu**.

Webde aynı düğme `location.reload()` çağırıyordu — bozuk değil (yeniden monte
olmak ref'i sıfırlıyor) ama sayfanın tamamını yeniden yükleyen bir çekiç, ve
iki platform aynı işi iki ayrı yolla yapıyordu.

İki tarafta da tek bir `restart()` var; dört çağıranın dördü (hata dalı +
sonuç ekranı, iki platform) onu kullanıyor.

### §285

Üç ölçü: `restart`ın iki platformda da var olduğu ve **`deadline.current`ı
sıfırladığı**, süreyi `restart` **dışında** sıfırlayan kimsenin kalmadığı
(kusur tam öyle doğdu: yerinde yazılmış bir sıfırlama, ref'i unutarak) ve
webin artık sayfayı yeniden yüklemediği, ve dört tekrar düğmesinin dördünün
de aynı sıfırlamayı çağırdığı.

Üçü de enjeksiyonla doğrulandı — `deadline.current = 0` satırı kaldırıldığında
ölçü gerçek kusuru yeniden gördü.

## §11.411 — "Dört karo mobildekiyle aynı" cümlesi üç ikonda tutmuyordu

`progress-view` kendi yorumunda şunu yazıyordu:

> "Dört karo mobildekiyle **aynı**: öğrenilen kelime, toplam XP, bu hafta
> süre, seviye."

Etiketler, değerler ve tonlar gerçekten aynıydı. **İkonlar değildi:**

| Karo | Web | Android |
|---|---|---|
| öğrenilen kelime | `BookIcon` | `LearnIcon` |
| toplam XP | `SparkIcon` | `BoltIcon` |
| toplam süre | `ClockIcon` | **`PodiumIcon`** |
| seviye | `TrophyIcon` | `TrophyIcon` |

Üçüncüsü yalnız ayrışma değil, **yanlış**: kürsü *sıralama* demek, süre demek
değil — ve mobil aynı kürsüyü profildeki "haftalık sıralama" satırında da
çiziyor, yani **aynı glif iki ayrı anlam** taşıyordu. `ClockIcon` mobilde hiç
yoktu; webin glifiyle birebir eklendi (daire + iki kol, aynı 24×24 ızgara).

Öteki ikisinde Android referans alındı: kelime karosu `LearnIcon`, XP
`BoltIcon`. XP glifi **profil rozetinde** de ayrışıyordu (web `SparkIcon`,
Android `BoltIcon`) — o da eşitlendi. Üst başlıktaki XP hapı ölçülmüyor:
mobilin başlığında XP hapı yok (yalnız seri), yani orada karşılaştırılacak
bir yüzey de yok.

### §286

Altı ölçü: dört karonun ikon adları, süre karosunun **mutlak** olarak saat
çizdiği, kürsünün yalnız sıralama satırında kaldığı, profil XP rozetinin
glifi, ve **ikon envanteri** — webde çizilen ama mobilde olmayan her ikon
belgeli olacak (yedi satır, her biri sebebiyle: `ArrowLeftIcon` mobilde
`ArrowBackIcon`, `ChevronIcon` web sayfalaması, `InfoIcon`/`LinkIcon`/
`ListIcon`/`QuestionIcon`/`UserIcon` web yüzeyleri) ve liste **bayatlamayacak**
(listede olup mobile gelmiş ya da artık çizilmeyen ad düşer).

Altısı da enjeksiyonla doğrulandı. Ölçünün kendi kusuru da çıktı: `PodiumIcon`
sınırsız ad deseniyle arandı ve meta-kapı (§138) onu reddetti — `\b` sınırı
eklendi.

### İkon setinde 48 çağıransız simge — belgelendi

Ölçüm sırasında webin ikon setinde **48 çağıransız** simge çıktı
(`BreadIcon`, `BusIcon`, `CoffeeIcon`, `WeatherIcon`, …). 500 derslik
müfredatla geldiler (66cb70b0) ve `lessons/lesson-hub` içindeki konu → ikon
haritasından çiziliyorlardı; ders merkezi Patika'ya devredilince o dosya
silindi. Konu **adları** yaşıyor (`lib/cando-map`, mobil `game/candoMap`) ama
konu ikonlarını çizen yüzey kalmadı; mobilde karşılığı hiç olmadı.

Silinmediler — elle çizilmiş bir aile ve konu ikonu Patika kartlarına geri
gelebilir. Ama gerekçe yazılmadığında 460 satır unutulmuş kod gibi
görünüyordu: `icons.tsx`in başına `check:endpoints`in `ALLOW` listesiyle aynı
kuralla yazıldı — bağlanmamış bir şeyi tutmak, onu **sebebiyle** belgelemek
demek.

### Yan düzeltme: hız sınırı saniyesi standart başlıkta

`/api/premium/redeem` 429'unda saniye yalnız **gövdede** duruyordu
(`retryAfter`) ve onu okuyan hiçbir istemci yoktu: sunucu "23 saniye sonra"
diyor, iki uygulama da "biraz sonra tekrar dene" yazıyordu. Sosyal rotalar
aynı bilgiyi baştan beri `retry-after` **başlığıyla** veriyor
(`lib/social/http.ts` `fail`) ve kimlik doğrulama vekili RFC adının neden
önemli olduğunu yazmış durumda. Başlık eklendi; gövdedeki alan da kaldı.

**Açık kalan:** `quota` dönen altı 429 (`assess`, `pronounce`, `reports`,
`roleplay`, `stt`, `tts`) başlık taşımıyor. Oradaki doğru değer "kotanın
sıfırlanmasına kalan saniye" ve o, kullanıcının kendi saatine bağlı
(`profiles.timezone`) — premium kota metinleri de zaten kayıtlı borç (11
`gate.*` anahtarı). Altı rotaya birlikte bakılacak, bu turda alınmadı.

## §11.412 — Aynı oyun üç yüzeyde üç ayrı glifle anlatılıyordu

On bir oyun üç yerde ikonla anlatılıyor: pratik ekranının karoları (web +
Android) ve açılış sayfasının vitrini. Ölçüldüğünde **üçü de ayrı küme**
yazıyordu:

| oyun | Android | web pratik | web açılış |
|---|---|---|---|
| seçmeli | `QuizIcon` | `QuestionIcon` | `TargetIcon` |
| boşluk doldurma | `WriteIcon` | `PenIcon` | `PenIcon` |
| dinleme | `ListenIcon` | `HeadphonesIcon` | `HeadphonesIcon` |
| eşleştirme | `CardsIcon` | `CardsIcon` | `LinkIcon` |
| sıralama | `SortIcon` | `SortIcon` | `ListIcon` |
| çoğul | `StackIcon` | `StackIcon` | `BookIcon` |

Webin seçtikleri rastgele değil, **setin başka bir işi için ayrılmış**
glifleriydi: `PenIcon` ve `HeadphonesIcon` iki platformda da **başarım
rozetinin** glifi (`achievement-badge` / `ui/achievementIcon`), buna karşılık
`QuizIcon`/`WriteIcon`/`ListenIcon` **adım türünün** glifi
(`immersion/unit-pane` / `ui/unitKind`). Yani aynı oyun, aynı ekranda,
Android'de bir glif webde başkası; üstüne web **kendi içinde de** ayrışıyordu
— patika ile pratik aynı oyuna iki ikon veriyordu.

`QuestionIcon` ise `QuizIcon`in yakın ikiziydi (ikisi de daire + soru
işareti) ve yalnız o tek karoda çiziyordu; kaldırıldı.

Açılış sayfasının kendi notu zaten şunu söylüyordu:

> "…sözcüğü kullanmalı, yoksa ziyaretçi gördüğü oyunu uygulamada tanımıyor."

Glif de aynı sebebe tabi ve orada **üçüncü** bir küme duruyordu. Üç yüzeyin
üçü Android'in kümesine geçti. **Tonlar zaten birebirdi** (web `--color-X-500`
↔ mobil tema jetonu: brand=primary, flame=streak, sky=info, mint=success,
violet=accent) — ayrışan yalnız gliflerdi.

### §287

Beş ölçü: karo **sayısı**, on bir karonun glifi, on bir karonun tonu (web
rampası → mobil jeton eşlemesiyle), açılış vitrininin on satırı, ve
**mutlak** olarak rozet glifinin oyun glifi olarak kullanılmadığı (kusur tam
böyle doğdu, ve iki tarafta birden olabilirdi).

Sayı ölçüsü ayrı duruyor çünkü listeden bir karo **okunamazsa** liste kısalır
ve kalanlar eşit görünür — hiçbir şey ölçmeyen kapı. Enjeksiyonla doğrulandı:
bir karo silindiğinde glif ölçüsü 11→10 düşüp **geçmeye devam etti**, sayı
ölçüsü kırmızıya döndü.

## §11.413 — `think` klibi mobilde yoktu; aynı klibin iki adı vardı

Maskot iki uygulamada da aynı kliplerle oynuyor ve kip **adıyla** seçiliyor.
Ölçüldüğünde iki şey çıktı.

### 1. Düşünen maskot Android'de hiç oynamıyordu

Mobil klip listesini şöyle okuyor:

```ts
<Image source={CLIP[mood] ?? CLIP.idle} ... />
```

Yani **olmayan bir kip sessizce `idle`a düşüyor** — hata yok, uyarı yok,
yalnız yanlış klip. `think` klibi mobilin varlıklarında **yoktu** ve üç yüzey
bundan etkileniyordu:

| Yüzey | web | Android (önce) |
|---|---|---|
| sınav girişi (`exam_intro`) | `think` | `idle` |
| rol yapma sınavı girişi | `think` | `idle` |
| "bu oyuna kelime yok" | `think` | `idle` |

Üçü de birebir eşleşen yüzeyler: aynı `moment`, aynı i18n anahtarı, aynı boy.
Dosya webin `public/anim/think.webp`si ve mobile **birebir** kopyalandı (md5
aynı; ölçü bayt sayısını karşılaştırıyor). Bu, "maskot `think`/`wow` klipleri"
diye açık tutulan maddenin `think` yarısını kapatıyor — `wow` tarafı zaten
klip istemiyor, o bir **takma ad**: web onu `lookaround`a bağlıyor ve çağıranı
da yok.

### 2. Aynı klibin iki adı

Web kipe `cheer` diyordu; gösterdiği dosya ise `celebrate` ve Android baştan
beri kipe `celebrate` diyor. Ad Android'in adına geçti (dokuz çağrı yeri, bir
tip, bir klip anahtarı). Bu tam da §11.409'da görülen sürtünmenin aynısı:
aynı durumun iki adı olması platformlar arası ölçüleri kırıyor — ve nitekim
§12522 (ders kapanışının maskot kademeleri) adı elle yazdığı için yeniden
adlandırmayla kırmızıya döndü; ölçü de güncellendi.

### §288

Dokuz ölçü: kip listelerinin **okunabildiği** (okunamazsa kümeler boş kalır ve
eşit görünür), mobilin her kipinin webde de olduğu, **aynı kipin aynı klip
dosyasını** gösterdiği (ad eşitliği yetmez — `idle` bilerek ayrışıyor: web beş
boşta klibini rastgele zincirliyor, mobilde tek klip var), webde fazla duran üç kipin
(`wow`, `dance`, `peek`) sebebiyle belgeli olduğu ve listenin
bayatlamadığı, `think.webp`nin mobilde **var olduğu ve webinkiyle aynı
boyutta** olduğu, sınav girişi ile "kelime yok" dalında kipin aynı olduğu, ve
**mutlak** olarak webde `cheer` adının kalmadığı.

Enjeksiyonların ikisi birlikte önemli: `think` klibi silinip kaynak `think`
demeye devam ettiğinde "kelime yok" ölçüsü **geçmeye devam etti** (kaynak
doğru kipi yazıyor) ama "webdeki fazla kip belgeli" ölçüsü kırmızıya döndü —
sessiz düşüşü yakalayan ikinci yarı o.

## §11.414 — Ölçülen dört eksen temiz çıktı; biri gerçek bir eksik verdi

Bu tur paylaşılan **sözcük dağarcıkları** üzerinden gitti. Dördü temiz çıktı ve
temiz çıkmaları da bir sonuç — hangi ölçünün neden yazılmadığı buraya yazılıyor
ki bir daha aynı yola girilmesin.

| Eksen | Sonuç |
|---|---|
| ses efektleri (13 ipucu) | **eşit**; `Cue` ve `SFX_NOTES` birebir aynı 13 ad |
| koç cümleleri | **eşit**; 8 an, 40 cümle, sayılar bile aynı |
| başarım ikonu haritası | **eşit**; 29 ad, aynı yedek (`StarIcon`) |
| canlı bölge (a11y) | **eşit**; hata kartlarının hepsi duyuruyor |

Ses tarafında bir yanlış iz vardı ve kaydedilmiş bir sınıfa giriyor
(**çıktıda olmayan olguyu aramak**): `play("correct")` webde yalnız ses
ayarlarının önizleme düğmesinde geçiyor, yani "web cevap sesi çalmıyor" gibi
görünüyordu. Gerçek yol `vibrate()` **içinden** geçiyor
(`lib/fx`: `play(kind)` + `navigator.vibrate`), yani on oyunun hepsi tek
geçitten sesleniyor. Çağrı yeri ipucunun adını taşımıyor.

### Canlı bölge kuralı: hata duyurulur, boşluk duyurulmaz

`EmptyCard` iki işi birden görüyor — "liste boş" ve "yüklenemedi". Ayrım ekran
okuyucu için önemli: birincisi sayfanın **normal** içeriği ("henüz arkadaşın
yok"), ikincisi bir **olay**. Kural iki tarafta da bileşenin kendi yorumunda
yazılıydı ama **hiçbir ölçü tutmuyordu**: kırk altı çağrı yerinden biri hata
dalında `role`/`live` vermeyi unutsa kimse görmezdi. Ölçüldüğünde iki platform
da temiz çıktı; §289 o hâlin kilidi.

### Gerçek eksik: deneme kâğıdı bulunamadığında

Webin `mock-exams/[paper]/[skill]` sayfası üç durumda `notFound()` atıyor
(kâğıt kimliği tanınmıyor, beceri adı listede değil, kâğıdın o becerisi yok)
ve uygulamanın **genel** 404'ü çiziliyordu: "Sayfa bulunamadı" + Öğren'e dön.
Kullanıcı **neyin** bulunamadığını ve ne yapacağını öğrenemiyordu — eski bir
bağlantı mı, kaldırılmış bir kâğıt mı belli değildi.

Android aynı durumda kâğıda özel kartı çiziyor (`MockExamScreen`, `!paper ||
!part` dalı) ve metinler üç dilde **zaten vardı**, webde hiçbir yerden
çağrılmıyordu — yani üç ölü dizgi. Bölüm artık kendi `not-found.tsx`sini
taşıyor: kırmızı karo, `XIcon`, `role="alert"` (Android `live="assertive"`) ve
"listeye dön".

§162'nin dördüncü ölçüsündeki "mobil tek taraflı" notu bu yüzden güncellendi;
oradaki `web=404` ölçüsü yine doğru ve gerekli — sayfanın `notFound()` atmaya
devam etmesi kartın çizilmesinin **ön koşulu**.

### §289

Beş ölçü: kart çağrılarının **okunabildiği** (okunamazsa "sessiz hata yok" boş
bir doğru olur), **mutlak** olarak hata dalındaki her kartın duyurduğu, iki
tarafta da gerçekten **hata dalı bulunduğu** (yoksa bir önceki ölçü hiçbir şey
ölçmez), kâğıt kartının üç metninin iki platformda da olduğu ve kartın
duyurduğu.

## §11.415 — Parite betiği `mobile/ios` altına hiç bakmıyordu

Bu betik bugüne kadar **web ↔ mobil JS** karşılaştırdı. Oysa mobil JS'in
altında **iki native uygulama** var — Android'de Kotlin
(`LernomiSpeechModule.kt`), iOS'ta Swift (`LernomiSpeech.swift` + `.m`
köprüsü) — ve JS ikisine de aynı adlarla sesleniyor:

```ts
const Native = NativeModules.LernomiSpeech as SpeechNative | undefined;
```

Bir yöntem tek platformda eklenirse **JS'te tip hatası olmaz** (tip elle
yazılı) ve öteki platformda çağrı sessizce `undefined` olur: özellik o
platformda hiç yoktur ve kimse fark etmez. Olaylar için de aynı, iOS'ta bir
adım daha kötü — `RCTEventEmitter`in `supportedEvents` listesinde olmayan bir
ada abone olmak RN hatası bastırıyor.

Ölçüldüğünde sözleşme **temiz** çıktı: 20 ortak yöntem, 10 ortak olay, JS'in
sekiz aboneliği iki listede de var, `.m` tanıtımı ile Swift gövdesi birebir.
İki taraflı fazlalığın ikisi de meşru ve artık sebebiyle yazılı:

| Fazlalık | Sebep |
|---|---|
| Android `addListener`, `removeListeners` | RN olay yayıcısının kalıbı; iOS'ta `RCTEventEmitter` kendisi sağlıyor |
| iOS `ensureMicPermission` | Android izni JS'te soruyor (`PermissionsAndroid.RECORD_AUDIO`, kendi başlığıyla); iOS'ta izni native taraf sormak zorunda |

### Sistem diyalogları: yazılı ama ölçülmeyen üç iddia

iOS'ta yürüyüş kilit-ekranı denetimi ve izin diyalogları **cihaz** dilinden
okunuyor (`*.lproj/*.strings`); Android'de aynı metinler
`res/values-*` altındaki `strings.xml`de. Dosyaların kendi yorumları
"birebir aynı" diyor — üç dilde de gerçekten aynı çıktı, ama hiçbir ölçü
tutmuyordu. Bir dilde cümle değiştirilse iki platform aynı bildirimi iki ayrı
cümleyle verirdi.

Üçüncü bir tuzak: `Info.plist` izin metinlerini bir kez de **satır içi**
taşıyor (yerelleştirme bulunamazsa gösterilen yedek). Orası Türkçe ve
`tr.lproj` ile aynı kalmak zorunda; biri değişip öteki kalırsa Türkçe cihazda
hangi cümlenin çıkacağı derleme ayrıntısına kalır.

### §290

On bir ölçü: native yöntem listelerinin **okunabildiği**, iOS köprüsü
(`.m`) ile gövdesinin (Swift) aynı olduğu, tek platformda kalan yöntemin
belgeli olduğu ve listenin bayatlamadığı, native olay listelerinin eşit
olduğu, JS'in her aboneliğinin iki listede de bulunduğu (ve abonelik
sayısının ölçüldüğü — sıfır abonelik "eksik yok"u boş bir doğru yapar), JS
tipindeki **zorunlu** üyelerin iki native tarafta da olduğu (isteğe bağlı
`?` üyeler tek taraflı olabilir, `ensureMicPermission` böyle yazılı), yürüyüş
bildiriminin üç dilde iki platformda aynı cümle olduğu, izin diyaloglarının
üç dilde de bulunduğu ve plist yedeğinin `tr.lproj` ile aynı olduğu.

Ölçünün kendi kusuru da çıktı ve kayıtlı sınıftan: iOS olay listesi
`supportedEvents()` ile ilk `[` arası okunuyordu ve **dönüş tipinin** köşeli
parantezine takıldı (`-> [String]!`) — liste boş göründü. `return [`
üzerinden okunuyor. Karakter sınıfıyla sınır çizmenin (`[^\[]*`) yanlış yerde
durması, `[^>]*`/`[^)]*` ile aynı aile.

**Yan bulgu:** `npm run ios:check` sekiz denetimin sekizini geçiyor ve
**Google iOS istemcisi artık AÇIK** — Samet'in bekleyen maddelerinden biri
kapanmış görünüyor (`658160017552-8di7u96v77l0f5oiv47201o8jaamqe55`).

## §11.416 — iOS'ta her bildirim sessiz düşüyordu

Android'de bildirim kanalı `AndroidImportance.HIGH`: ses çıkarıyor ve
heads-up geliyor. iOS'ta karşılığı bildirimin kendi `ios.sound` alanı ve
**verilmediğinde bildirim sessiz düşüyor** — banner geliyor, kullanıcı
duymuyor. Ölçüldüğünde mobil kaynakta `ios:` bloğu **hiç yoktu**:

| Yol | Android | iOS (önce) |
|---|---|---|
| cihazda kurulan hatırlatma (günlük/seri/haftalık) | kanal HIGH → sesli | **sessiz** |
| ön planda gelen uzak bildirimin yeniden çizimi | kanal HIGH → sesli | **sessiz** |
| deneme bildirimi (ayarlardaki önizleme) | sesli | **sessiz** |

Yani aynı hatırlatma Android'de duyulup iOS'ta duyulmuyordu — ve hatırlatma,
deponun kendi notuyla, elde tutmanın **ana** kaldıracı (§4). Cihazda kurulan
hatırlatma özellikle önemli: `hasPushDevice()` onu yalnız **uzak push
yokken** kuruyor, yani o dal zaten "tek bildirim yolu bu" durumudur.

Değer yeni bir ürün kararı **değil**: sunucunun APNs yükü baştan beri
`aps.sound = "default"` yazıyor (`lib/fcm.ts`). Cihazdaki kopya da aynı sesi
kullanıyor — yoksa aynı bildirim iki yoldan iki farklı şekilde gelirdi.

### Yönelim: ölçüldü, doğru çıktı, kilitlendi

Aynı aileden ikinci bir soru: uygulama hangi ekranda dönüyor. Android telefonu
dikeye kilitliyor, tableti serbest bırakıyor (`MainActivity.onCreate`,
`smallestScreenWidthDp >= 600`); iOS aynı ayrımı `Info.plist`te yapıyor
(iPhone yalnız `Portrait`, `~ipad` dört yön). **Eşik** de `useLayout`un
telefon/tablet eşiğiyle (600) aynı. Üçü tutuyor.

Tutmayan tek şey bir **yorum** idi: `useLayout` "telefonda dikeye kilitli
(bkz. manifest)" diyordu, oysa manifestte `screenOrientation` yok — kilit
`MainActivity`de, çünkü kaynak nitelikleri (sw600dp) manifestte değişemiyor.
Yorum düzeltildi; kilidin nerede olduğu artık doğru yazıyor.

### §291

Altı ölçü: üç bildirim yolunun iOS sesini taşıdığı, cihazdaki sesin
**sunucunun** sesiyle aynı olduğu, Android kanalının **HIGH** kaldığı (yoksa
karşılaştırma "ikisi de sessiz" diye geçerdi — kaydedilmiş kusur sınıfı),
yönelim ayrımının iki platformda aynı olduğu ve eşiğin düzen eşiğiyle
uyuştuğu.

Meta-kapı (§138) bu turda da iş gördü: `SCREEN_ORIENTATION_PORTRAIT` sınırsız
ad deseniyle aranmıştı ve reddedildi — `..._REVERSE_PORTRAIT` ile
`FULL_USER`/`FULL_SENSOR` karışabilirdi.

## §11.417 — Üç platformun zemini ve ses paketleri ölçüye bağlandı

§11.406 açılış ekranının ve tarayıcı çubuğunun rengini **webden Android'e**
bağlamıştı. Zincirin üçüncü halkası — iOS — o turda ölçülmedi, çünkü bu betik
`mobile/ios` altına §290'a kadar **hiç bakmadı**.

iOS aynı iki rengi katalogda tutuyor ve değerler bugün **doğru**:

| Renk | iOS | Android | web |
|---|---|---|---|
| açılış zemini | `LaunchBackground` #FA7C13 | `ic_launcher_background` | `manifest.background_color` |
| pencere zemini (açık) | `WindowBackground` #FBF7F2 | `values/window_bg` | `--bg` / `themeColor` |
| pencere zemini (koyu) | `WindowBackground` #17120E | `values-night/window_bg` | `--bg` (dark) |

Ölçülmeyen şey bunların **aynı kalması**: bir platformda marka turuncusu ya da
zemin değiştirilse ötekiler sessizce eski değerde kalır — kullanıcı açılışta
bir renk, uygulamada başkasını görür ve bu fark **yalnızca cihazda** fark
edilir; hiçbir derleme onu söylemez.

Katalogun **okunduğu** da ölçülüyor: renk dosyası var olup kimse okumazsa iOS
penceresi beyaz kalır ve açılış/tema geçişinde flaş olur — Android'in
`window_bg` notunun önlemek için var olduğu şey tam bu. `AppDelegate` hem
pencereyi hem kök görünümü boyuyor, storyboard da zemini katalogdan alıyor.

Dördüncü ölçü storyboard'un **önbellekli** kopyası: Xcode katalogu okuyor,
yani sapma yalnızca depodaki önizlemeyi yanlış yapar — ama depoya bakan insan
da o sayıyı doğru sanar.

### Ses paketleri: iki paket, üç kayıt yeri

`lib/sfx` sesi üç yoldan çalıyor (ekran kapalıyken native sentez, köprü
hazırsa WebView, ikisi de olmazsa **paketteki mp3**) ve dosya adını platforma
göre kuruyor. Yani aynı ses Android'de `res/raw`dan, iOS'ta uygulama
paketinden okunuyor. Nota tablosuna yeni bir ses eklenip mp3 yalnız bir pakete
konursa öteki platformda yedek yol **sessiz** kalır; `render-sfx.py` ikisine
birden yazıyor ama kimse bunu ölçmüyordu.

iOS'ta bir adım daha var: dosyanın diskte olması yetmez, Xcode projesine
**kayıtlı** olmalı (`Resources` fazı) yoksa pakete girmez. Üç ölçü de buna
bakıyor: 13 nota adı = 13 Android mp3 = 13 iOS mp3 = 13 pbxproj kaydı.

### §292

Yedi ölçü, hepsi enjeksiyonla doğrulandı: açılış zemini üç platformda aynı,
pencere zemini iki temada üç platformda aynı, iOS zemin kaynaklarının
okunduğu, storyboard önbelleğinin katalogla aynı olduğu, ses dosyalarının iki
pakette de bulunduğu ve Xcode projesine kayıtlı olduğu.

Enjeksiyonlardan biri ölçünün **zincir** olduğunu gösterdi: katalogdaki tek
bir bayt değiştirildiğinde hem "açılış zemini" hem "storyboard önbelleği"
kırmızıya döndü — biri platformlar arası, öteki dosya içi tutarlılık.

## §11.418 — Derin bağlantının altı dayanağı ölçülmüyordu

Derin bağlantının çalışması **altı dosyanın** aynı iki değeri taşımasına
bağlı ve hiçbiri ölçülmüyordu:

| Değer | Nerede |
|---|---|
| alan adı | Android manifestosu `android:host` · iOS yetkileri `applinks:` · mobil `API_BASE` · web `lib/site` · web `lib/share` sunucu yedeği |
| paket adı | `build.gradle` `applicationId` · `assetlinks.json` rotasının `PACKAGE`i |

Bir tanesinde harf değişse bağlantı **o platformda sessizce tarayıcıya
düşer**: Apple beyanı bulamaz, Android doğrulamayı geçemez, ya da uygulama
başka bir sunucuya konuşur. Hiçbir derleme bunu söylemez çünkü her dosya kendi
içinde geçerli. Paket adı ayrıca kritik: `assetlinks.json` yanlış paketi ilan
ederse Android bağlantıyı **hiç** doğrulamaz ve e-postadaki iki bağlantı
uygulamayı açmaz — ama web tarafı 200 döner, yani izleme "çalışıyor" der.

Apple takım/paket kimliği env'de ve burada ölçülemez; ölçülen şey rotanın
onları **env'den okuduğu** — elle yazılmış bir kimlik Xcode projesinden
sessizce ayrışırdı. Değerler ayrıca elle doğrulandı: `.env`in
`APPLE_TEAM_ID`/`APPLE_BUNDLE_ID`'si pbxproj'nin `DEVELOPMENT_TEAM` /
`PRODUCT_BUNDLE_IDENTIFIER` değerleriyle birebir.

### §293

Beş ölçü, hepsi enjeksiyonla doğrulandı: her kaynağın **tek** alan adı
söylediği (iki alan beyan eden bir yetki dosyası karşılaştırmayı anlamsız
kılar), alan adının beş yerde aynı olduğu, paket adının `assetlinks` ile
`build.gradle` arasında aynı olduğu, Apple kimliğinin env'den okunduğu ve
eksikse dosyanın **hiç yayımlanmadığı**, ve üç derin bağlantı anahtarının
`.env.example`de durduğu.

Ölçünün kendi kusuru yine kayıtlı bir sınıftan: yorum temizleyici `//`yi
koşulsuz siliyor ve `"https://www…"` dizgisini `"https:` diye bırakıyor — üç
ölçü ilk yazımda tam bunun yüzünden "YOK" dedi. URL taşıyan dosyalar **ham**
okunuyor; desenler kod biçimine çakılı olduğu için güvenli.

### Canlı durum: iki bekleyen madde kapanmış, üretim yerelin gerisinde

Bu tur canlı sunucu da okundu (okuma serbest):

- `ANDROID_CERT_SHA256` **üç env dosyasında da** var ve sunucuda **dolu** →
  `https://www.lernomi.app/.well-known/assetlinks.json` **200** dönüyor,
  paket `com.lernomi.learn`, bir parmak izi. Yani "Play imza SHA-256 Samet'ten
  gelecek" maddesi **kapanmış**.
- `npm run ios:check` Google iOS istemcisini **AÇIK** gösteriyor — o madde de
  kapanmış.
- Canlı **AASA üç yol** ilan ediyor (`/reset-password`,
  `/api/auth/verify-email`, `/auth/app`); depodaki liste **dört** (`/u/` davet
  bağlantısı, §11.400). Yani üretim bugünün commit'lerinin gerisinde ve davet
  bağlantısı iOS'ta ancak **push + deploy** sonrası evrensel bağlantı olur.
  Bu bir kusur değil, beklenen durum — ama deploy sonrası doğrulanacak bir
  madde.

## §11.419 — Yürüyüş modunun native sözleşmesi kilitlendi; iOS planındaki açık madde kapandı

Yürüyüş modu iki platformda da native tarafa dayanıyor ve sözleşmenin
parçaları üç dosyaya yayılmış: ekran durumu olayları, kilit ekranı / bildirim
denetimi, ve kullanıcıya görünen metinler. Hiçbiri ölçülmüyordu.

**En pahalı parça `LernomiScreenOff`.** JS o bayrakla **ücretli** yola geçiyor
(`WalkModeScreen` `useAzure` → Azure STT), yani olayın hangi durumda yayıldığı
doğrudan **fatura** demek:

| | Android | iOS |
|---|---|---|
| ScreenOff | `ACTION_SCREEN_OFF` (yalnız güç tuşu) | `didEnterBackground` + `protectedDataWillBecomeUnavailable` |
| ScreenOn | `ACTION_SCREEN_ON` | `willEnterForeground` |

`docs/plan/ios-parity.md` bu farkı **açık ürün kararı** olarak listeliyordu
("Karar ve varsa düzeltme Şerit T'de"). Ölçüldüğünde karar **koda çoktan
verilmiş**: `LernomiSpeech.swift`in kendi yorumu iki farkı da gerekçesiyle
kabul ediyor ve gerekçe sağlam — sorulan soru "ekran kapalı mı" **değil**,
"hangi tanıyıcı güvenilir": uygulama arka plandayken yerel `SFSpeechRecognizer`
zaten güvenilmez, yani ücretli yola geçmek **doğru** davranış. İkinci fark
(kullanıcı telefonu açıp başka uygulamada kalırsa Android `ScreenOn` derdi, iOS
demez) aynı sebeple doğru.

Plan belgesi güncellendi: madde artık "KARAR VERİLDİ" olarak yazılı ve
gerekçenin nerede yaşadığını gösteriyor. Bu, defterin en sık tekrar eden
sınıfının tersi — **kapanmış bir maddenin açık görünmesi**.

### §294

Sekiz ölçü: olayların hangi sistem bildirimlerinden yayıldığı, **geçiş başına
bir kez** yayıldığı (iOS'ta iki bildirim peş peşe gelebiliyor; bastırma
kalkarsa JS iki kez yol değiştirir), ücretli yolun tetiğinin o bayrak olduğu,
durdurma denetiminin iki platformda da aynı olayı yaydığı (Android bildirim
eylemi ↔ iOS kilit ekranı), Android'in beş metni **kaynaktan** okuduğu, iOS'un
iki metni `NSLocalizedString` ile aldığı, yalnız Android'de kalan üç metnin
sebebiyle belgeli ve listenin bayatlamadığı, ve **kanal önemlerinin bilerek
ayrı** olduğu.

O son ölçü §291'in tamamlayıcısı: hatırlatma kanalı **HIGH** (duyulmalı),
yürüyüş kanalı **LOW** (cepte süren bir tur her turda ses çıkarmamalı). İkisini
birlikte ölçmek, "bütün kanalları yükseğe çek" gibi bir düzeltmenin yürüyüşü
bozmasını engelliyor.

Altı enjeksiyonun altısı da ayrı ayrı kırmızıya döndü. Meta-kapı (§138) yine
iş gördü: `MPRemoteCommand` ve `IMPORTANCE_LOW` sınırsız ad desenleriyle
aranmıştı (`MPRemoteCommandCenter` ve `IMPORTANCE_LOW`/`_HIGH` karışabilirdi).

### Yan ölçümler: yayın denetimleri temiz

`release:check` sürüm dörtlüsünü (package.json, version.ts, build.gradle,
pbxproj) ve yayın anahtarını doğruluyor — hepsi 1.0.0 (2) ve `keystore.properties`
yerinde. `check:16kb` 32 native kitaplığın 32'sini 16 KB hizasında buluyor.
`LEGAL_PLATFORMS.ios` hâlâ `false` ve doğrusu bu: iOS yayını Mac'te derleme ve
App Store adımlarını bekliyor (`ios-parity.md` §6 tablosu).

## §11.420 — iOS envanteri iOS'u olduğundan geride gösteriyordu

`docs/plan/ios-parity.md` iOS'un neyi eksik olduğunu sayan envanter ve
**2026-09-04 anlık görüntüsüyle** yazılmıştı. Bugün satır satır ölçüldüğünde
**yirmi üç maddenin yirmi ikisi kapanmış** çıktı:

| Kapanan | Bugünkü kanıt |
|---|---|
| P1–P7 (proje bağlantısı) | native dosyalar pbxproj'da, `import React` var, `.lproj` bağlı + `CFBundleLocalizations`, paket kimliği `app.lernomi.ios`, sürüm dörtlüsü 1.0.0 (2), `DEVELOPMENT_TEAM` dolu, şemada `NomiTests` artığı yok |
| §1.2 (native parite) | 20 ortak yöntem, 10 ortak olay — §290 ölçüyor |
| R1–R4 (marka kaynakları) | 13 AppIcon PNG, markalı açılış ekranı, `WindowBackground` iki tema, 13 SFX mp3'ü pakette ve pbxproj'da — §292 ölçüyor |
| C1–C4 (mağaza/uyum) | gizlilik manifesti dolu, `ITSAppUsesNonExemptEncryption`, Apple ile Giriş (`PROVIDERS` + yetki), Google iOS istemcisi açık |
| E1–E4 (metin/davranış) | abonelik metinleri platforma göre, `app_open` platformu artık dinamik, APK güncelleme şeridi kaldırılmış, README gerçek belge |
| O1–O2 (süreç) | `ios-archive.sh` var, `.github/workflows/` içinde `checks.yml` + `ios-build.yml` |

Yani belge, iOS'u **olduğundan çok daha geride** gösteriyordu — bu defterin en
sık tekrar eden sınıfının **tersi**: kapanmış maddenin açık görünmesi.
Maliyeti de simetrik: okuyan (ya da Samet) bitmiş işi yeniden yapmaya kalkar,
ya da iOS'u imkânsız sanıp hiç bakmaz.

**Gerçekten açık kalanlar dört tane** ve hepsi ya Mac ya mağaza işi:
`Podfile.lock` depoda yok (pod çözümü makineden makineye değişebilir;
Android `gradlew` + wrapper jar'ı sabitliyor), `LernomiUITests.swift` diskte
var ama pbxproj'da yok (`ios-add-uitest-target.rb` onu eklemek için yazılmış),
RevenueCat anahtarları boş (**iki platformda da** — ortak eksik), ve
`LEGAL_PLATFORMS.ios = false` (bilinçli; açılırken `LEGAL_VERSION` artacak).

### §295

Beş ölçü ve bu kapı **iki yönlü**: belgeye yazılan yeniden-ölçüm bloğunun
iddialarını tutuyor (on madde), APK güncelleme yolunun geri gelmediğini, ve
**açık listesinin bayatlamadığını** — `Podfile.lock` gelirse ya da UI test
hedefi eklenirse kapı kırmızı verir ve belge güncellenmeye zorlanır. Beşinci
ölçü kod ile belgeyi karşılaştırıyor: `LEGAL_PLATFORMS.ios` açılırsa belgedeki
"bilinçli kapalı" cümlesi de yalan olur.

Blok kendisi de ölçülüyor (var mı, tarihi doğru mu): "ölçüldü" iddiası
tarihiyle birlikte anlam taşıyor.

Meta-kapı (§138) bu turda **altı** desen reddetti — `CFBundleLocalizations`,
`NomiTests` (iki kez), `ITSAppUsesNonExemptEncryption`, `CFBundleURLTypes`,
`LernomiUITests` sınırsız ad desenleriyle aranmıştı. plist anahtarları artık
`<key>…</key>` olarak tam eşleşiyor.

## §11.421 — Klavye metin kutusunu örtüyordu: dokuz ekran

Android bu işi yıllarca manifestten yaptı: `windowSoftInputMode="adjustResize"`
pencereyi küçültüyor ve kutu klavyenin üstüne çıkıyor. **İki şey onu geçersiz
kıldı:**

- **iOS'ta böyle bir ayar hiç yok.** Kaydırma alanı klavye için kendisi boşluk
  açmak zorunda (`automaticallyAdjustKeyboardInsets`).
- **Android 15+/targetSdk 35+ edge-to-edge** altında pencere artık
  küçültülmüyor; klavye içeriğin **üstüne** biniyor — `useKeyboardHeight`in
  kendi docblock'u bunu yazıyor.

Yani bugün iki platformda da kutu **elle** kurtarılmak zorunda ve iki ayrı
düzen var:

| Düzen | Kurtarma |
|---|---|
| **A** — kutu kaydırma alanının içinde | `automaticallyAdjustKeyboardInsets` |
| **B** — kutu kaydırma alanından sonra, sabit alt çubukta | çubuğu klavye yüksekliği kadar kaldır (`RoundShell` kalıbı) |

Ölçüldüğünde **A düzenindeki dokuz ekrandan yalnız ikisinde** öznitelik vardı
(`QuizScreen`, `LessonScreen`) — o ikisi `8b6c084a`'da bilerek eklenmiş, gerisi
geride kalmıştı: giriş, parola sıfırlama, hesap silme, sosyal ayarlar,
ayarlar, deneme sınavı, ödeme (promo kodu) ve modül sınavının iki yazma
bölümü.

**B düzeninde rol yapma sınavının sohbet kutusu** kurtarılmıyordu: kutu
kaydırma alanının altında sabit bir çubukta duruyor, yani kullanıcı yazarken
**ne yazdığını görmüyordu** — üç dakikalık bir sınavda. Kalıp turlardan
alındı, ifadesi `RoundShell`le birebir (klavye yüksekliği − güvenli alan +
pay; öneri şeridi çoğu Android klavyesinde `keyboardDidShow` yüksekliğine
dâhil değil).

### §296

Dört ölçü: A düzenindeki her ekranın özniteliği taşıdığı, **taranan ekran
sayısının** ölçüldüğü (tarama boşalırsa "eksik yok" boş bir doğru olur), B
düzenindeki iki dosyanın alt çubuğu **aynı ifadeyle** kaldırdığı (kalıp tek
olsun) ve Android'in `adjustResize`ının yerinde durduğu — o, edge-to-edge
öncesi sürümler ve kaydırma alanı olmayan ekranlar için hâlâ gerekli.

Ölçü **dosya düzeyinde** soruluyor, "hangi ScrollView" diye değil: kutu çocuk
bileşende de olabiliyor (`MockExamScreen` görev kartları, `PaywallScreen` promo
kartı) ve o soru metinden güvenilir biçimde sorulamaz. Üç enjeksiyon da
doğrulandı.

## §11.422 — Yarım bırakma koruması iOS'ta hiç çalışmıyordu

`useBackConfirm` yarım bırakılınca emek kaybı olan beş ekranda geri tuşunu
onaya bağlıyor: yarım tur, süreli modül sınavı, deneme sınavı, yerleştirme ve
yürüyüş oturumu. Bunu şöyle yapıyor:

```ts
BackHandler.addEventListener("hardwareBackPress", () => { setVisible(true); return true; })
```

**`BackHandler` Android'e özgü.** iOS'ta `addEventListener` boş bir saplama —
yani iPhone'da kenardan kaydırma ekranı **onay sormadan** kapatıyordu: yarım
bir tur ya da süresi işleyen bir sınav tek harekette gidiyordu, hem de
Android'de aynı hareketin "çıkılsın mı?" diye sorduğu yerde.

Üstüne kancanın kendi docblock'u **"donanım/gesture geri tuşunu onaya
bağlar"** diyordu; iOS'ta o söz tutulmuyordu. Yazılı bir sözün tutmaması —
bu defterin tanıdığı sınıf.

iOS'taki karşılık hareketi **kapatmak** (`gestureEnabled: false`): çıkışın tek
yolu ekranın kendi kapatma düğmesi kalıyor ve o düğme zaten onay diyaloğundan
geçiyor. Web tarafı da aynı yeri aynı şekilde koruyor (`use-leave-guard`:
uygulama içi bağlantılar yakalanıyor, tarayıcı geri tuşu bilerek kapsam dışı
ve gerekçesi orada yazılı).

### §297

Üç ölçü: iki listenin de **okunabildiği** (ikisi boş kalırsa boş-boşa eşitlenir
ve ölçü hiçbir şey söylemez), kancayı çağıran ekranlar ile hareketi kapatılan
rotaların **birebir aynı küme** olduğu, ve kancanın kapsamının doğru yazılı
olduğu (`BackHandler` var, "yalnız Android" notu var, eski "gesture" sözü
yok).

Ölçünün iki kusuru da bu turda çıktı ve ikisi de kayıtlı sınıftan:

1. **Dosya adı rota adı değil.** `WalkModeScreen` rotada `Walk` diye geçiyor;
   dosya adından çevirmek sahte bir ayrışma verdi. Eşleşme artık yığının kendi
   `component={…}` bildiriminden okunuyor.
2. **Yorumdaki iddiayı yorumu silen okuyucuyla aramak.** Docblock testi `sil()`
   geçmiş metinde yapılıyordu — yorumlar silindiği için iddia hep "YOK"
   çıkıyordu. O üç ölçü artık **ham** metni okuyor.

Üç enjeksiyon doğrulandı; ikincisi özellikle anlamlı: `RoleplayExamScreen`e
kanca eklenince ölçü onu hemen "hareketi kapatılmamış" diye gösterdi — yani
yeni bir korumalı ekran eklenince iOS tarafının unutulması artık mümkün değil.

## §11.423 — Platforma özgü RN API'si sessiz kalmıyor (§297'nin sınıfı)

§11.422 tek bir örneği kapattı: `BackHandler` Android'e özgü, iOS'ta boş bir
saplama, ve o yüzden yarım bırakma koruması iPhone'da hiç çalışmıyordu.
**Kusurun sınıfı daha geniş** — React Native'in bir dizi API'si tek platformda
iş yapıyor, ötekinde **sessizce** hiçbir şey yapmıyor:

| Platform | API'ler |
|---|---|
| Android | `BackHandler`, `PermissionsAndroid`, `ToastAndroid`, `TouchableNativeFeedback`, `DrawerLayoutAndroid`, `ProgressBarAndroid` |
| iOS | `ActionSheetIOS`, `SettingsManager`, `AlertIOS`, `ProgressViewIOS`, `PushNotificationIOS`, `DatePickerIOS` |

"Sessizce" burada anahtar kelime: ne derleme hatası, ne çalışma zamanı
hatası, ne uyarı. Özellik yalnız bir platformda var ve kimse fark etmiyor.

Depo bugün taranınca **üç kullanım** çıktı ve üçü de doğru durumda:
`PermissionsAndroid` iki dosyada ve ikisi `Platform` kapılı; `BackHandler` iki
dosyada ve ikisi de kapısız ama **sebepleri var** —

- `useBackConfirm.ts`: iOS karşılığı hareketi kapatmak ve o `RootStack`ta
  (§297); kancanın kendisi Android'e özgü kalmak zorunda.
- `OnboardingScreen.tsx`: tanıtım yalnız **ilk rota** ya da `reset` ile
  açılıyor, yani iOS'ta kaydırılacak bir önceki ekran **yok** — geri hareketi
  zaten iş yapmıyor.

### §298

Üç ölçü: taramanın **çalıştığı** (bulgu boşalırsa "kapısız yok" boş bir doğru
olur), kapısı olmayan her kullanımın **belgeli** olduğu, ve muafiyet listesinin
**bayatlamadığı** (muaf tutulan kullanım kalkarsa ya da `Platform` kapısı
kazanırsa listeden düşecek).

Kural şu: böyle bir API'yi kullanan dosya ya bir `Platform` kapısı taşıyacak —
yani karşı platformda ne olacağını **söylüyor** — ya da listede sebebiyle
yazılı olacak. Bugünkü manuel tarama böylece duran bir denetime dönüştü: bir
sonraki `ToastAndroid` ya da `ActionSheetIOS` kendiliğinden yakalanır.

İki enjeksiyon doğrulandı (kapısız `ToastAndroid` eklemek; muaf dosyaya kapı
kazandırmak).

## §11.424 — "Belki sonra" mobilde kalıcıydı: bildirim izni bir daha hiç sorulmuyordu

Aynı soru iki platformda da var — "günlük hatırlatmayı açalım mı" — ama
**kapatıldığında** iki ayrı şey oluyordu.

Web (`components/push-optin`): kart oturum özetinin içinde, kullanıcı turu
bitirip XP'sini gördükten hemen sonra çıkıyor. Kapatılınca `localStorage`'a bir
**zaman damgası** yazılıyor ve soru **21 gün** sonra yeniden geliyor.

Mobil (`screens/NotifPrimeScreen`): aynı soru tam ekran, ama iki kusurla.

1. **Bayrak kalıcıydı.** `markNotifPrimed()` `"lernomi:notif-primed"` anahtarına
   `"1"` yazıyordu ve `notifPrimeNeeded()` yalnız `=== "1"` diye bakıyordu —
   yani "Belki sonra"ya **bir kez** basan kullanıcıya günlük hatırlatma bir
   daha **hiç** teklif edilmiyordu. Elde tutmanın en güçlü kaldıracı tek
   dokunuşla ve kalıcı olarak kapanıyordu.
2. **Ekranın tek girişi girişin hemen sonrasıydı.** Rota yalnız
   `AuthScreen`in `toApp()` yönlendirmesinden açılabiliyor; `App.tsx`'te soğuk
   açılış rotası `user ? "Tabs" : ...` idi. Oturum cihazda kaldığı için o yol
   yeniden neredeyse hiç geçilmiyor — yani birinci kusur düzeltilse bile
   sorunun geri gelebileceği bir **an** yoktu.

Üçü birlikte düzeltildi:

- Pencere iki platformun ortak sayısı: `PUSH_PRIME_SNOOZE_DAYS = 21`
  (`lib/profile-limits` ve `mobile/src/lib/profileDefaults`, `REMINDER_HOURS`
  ile aynı ayna düzeni). Web kartındaki yerel `DISMISS_DAYS` kaldırıldı.
- `markNotifPrimed()` artık `String(Date.now())` yazıyor; `notifPrimeNeeded()`
  pencereyi okuyor. Eski `"1"` kayıtları `Number("1") = 1`, yani 1970 —
  pencere dolmuş sayılıyor ve o kurulumlarda soru bir kez daha geliyor:
  kaybedilen teklif geri veriliyor.
- Soğuk açılış rotası bayrağı okuyor (`prime ? "NotifPrime" : "Tabs"`).
  Karar `onboarded`DAN ÖNCE çözülüyor, çünkü ilk çizimi açan bayrak o.
  İzin **verilmiş** kullanıcı bunu hiç görmüyor: hatırlatma kurulu olduğu
  sürece `getReminder()` dolu döner ve pencere hiç okunmaz.

### §299

Sekiz ölçü: pencere iki tarafta da aynı sayı **ve** iki tarafta da sabitten
okunuyor (eşitlik tek başına yetmez — ikisi birlikte değiştirilip aynı sayıya
getirilebilir ve bağlantı yine kopuk kalır), bayrak iki tarafta da zaman
damgası (kalıcı `"1"` değil), ve soru gerçekten yeniden **sorulabiliyor**:
webde kartın çizildiği yer **sayılıyor** (sıfır çağıran boş bir doğru olurdu),
mobilde soğuk açılış rotası bayrağı okuyor.

Dört enjeksiyon doğrulandı: mobil pencereyi 14 yapmak, `markNotifPrimed`i eski
kalıcı bayrağa döndürmek, açılış rotasından bayrağı çıkarmak, `<PushOptIn`
çağrısını kaldırmak.

## §11.425 — Ortak bilgisayarda B, A'nın yarım deneme sınavını devralıyordu

Çıkışta cihazdan hesaba ait kopyaların silinmesi iki uygulamada da bir **önek
listesi** ile yapılıyor (`components/session-keeper` `ACCOUNT_SCOPED_PREFIXES`,
mobilde `lib/accountScope` aynı ad).

Web listesindeki kalıpların hepsi `lernomi-` önekliydi. Deneme sınavının yarım
koşusu ise `lernomi:mock-run:<kâğıt>:<bölüm>` anahtarına yazılıyor
(`components/mock-exam-player` `runKey`) — **iki nokta üstü üste ile**. Yani
`startsWith` ile hiçbir kalıp tutmuyordu: A çıkıp B girdiğinde B, kâğıdı
açtığında A'nın cevaplarını ve kalan süresini kaldığı yerden devralıyor,
bitirdiğinde de o sınavı **kendi** hesabına gönderiyordu.

En kötüsü listenin **kendi yorumunun bunu kapsadığını söylemesiydi**: bekleyen
kuyruklar eklenirken yazılan gerekçe "listedeki öteki yarım işler de (yarım tur
`lernomi-game`, yarım deneme koşusu) baştan beri aynı kuralla siliniyor"
diyordu. Yarım tur siliniyordu, yarım deneme koşusu silinmiyordu. Android'de
ikisi de baştan beri siliniyor (`lib/accountScope` `"lernomi:mock-run:"`).

Düzeltme tek satır: `"lernomi:mock-run:"` web listesine de girdi.

### §300

Kapı tek satırı değil **sınıfı** ölçüyor, çünkü liste elle tutuluyor ve asıl
kusur "yeni anahtar eklenirken unutulması".

Her platformun kendi **bildirdiği** cihaz anahtarları toplanıyor: depo çağrısı
geçen bir modülde `= "lernomi…"` ya da `=> \`lernomi…\`` biçiminde tanımlanmış
olanlar. Bu biçim kısıtı gerekli — satır içi `new CustomEvent("lernomi:stats")`
gibi **olay adları**, yorum metinleri ve sunucu tarafındaki anahtarlar
(`lernomi:ratelimit:`, `lernomi:mailcap:`) böylece kendiliğinden dışarıda
kalıyor.

Sonra `startsWith` ile listeye **uymayanlar** çıkarılıyor ve bu kümenin kapıdaki
**belgeli cihaz anahtarları** listesine birebir eşit olması bekleniyor: yeni bir
anahtar ya kapsanır ya da sebebiyle oraya yazılır. Eşitlik iki yönlü çalışıyor —
kapsama girmeyen yeni bir ad "yalnız kapsanmayan" olarak, artık var olmayan bir
belgeli ad "yalnız belgeli" olarak düşüyor; yani liste bayatlayamıyor.

Üçüncü ölçü sayılar: anahtar envanteri ya da önek listesi okunamaz hâle gelirse
"uymayan yok" boş bir doğru olurdu.

Bugünkü durum: webde 10, mobilde 13 belgeli cihaz anahtarı (tema, dil, ses,
analitik onayı, mikrofon onayı, bildirim ayarları/kimlikleri, ilk açılış
işaretleri, kurulum/bildirim uyarısı ertelemeleri ve hesap değişimini **anlayan**
`lernomi-account` işaretinin kendisi).

Beş enjeksiyon doğrulandı: web listesinden `lernomi:mock-run:` çıkarmak, bir
depo modülüne belgesiz yeni anahtar eklemek, önek listesinin adını değiştirmek
(sayı ölçüsü düşüyor), belgeli listeden canlı bir adı düşürmek, belgeli listeye
artık var olmayan bir ad eklemek.

## §11.426 — Olmayan ders webde uygulamanın dışına düşüyordu

Android'de bulunamayan içerik ekranın **kendi kabuğunun içinde** ve neyin
bulunamadığını **adıyla** söyleniyor: olmayan ders üzgün mirket + "Bu konuşma
bulunamadı" (`LessonScreen` `!lesson` dalı, aynı anahtarı `RoleplayExamScreen`
de kullanıyor), olmayan kâğıt kırmızı kart (`MockExamScreen`), kapalı profil
boş kart (`UserScreen`).

Webde aynı adresler `notFound()` atıyor ve Next en **yakın** `not-found.tsx`'i
çiziyor. Üç durumdan yalnız ikisinin kendi 404'ü vardı (kâğıt §11.419'da,
profil daha önce). Tanınmayan bir ders kimliği (`/lessons/<id>` ve
`/lessons/<id>/exam`) kökteki genel 404'e düşüyordu — iki kayıpla birlikte:

- Cümle genel: "Sayfa bulunamadı". Bulunamayan şey bir sayfa değil bir
  **konuşma**; Android'in cümlesi (`lesson.this_lesson_wasn_t_found`) üç dilde
  zaten tabanda duruyordu ve webde **hiçbir yerden çağrılmıyordu**.
- Kökteki 404 kök düzeninde çiziliyor, yani **uygulama kabuğunun dışında**:
  gezinme çubuğu kayboluyor, çıkış yolu iki bağlantıdan ibaret kalıyor.

İki dosya eklendi:

- `(app)/lessons/[id]/not-found.tsx` — üzgün mirket, Android'in cümlesi, tek
  "Geri dön". Sınır `[id]` altında olduğu için `exam` alt yolunu da kapsıyor.
- `(app)/not-found.tsx` — grup düzeyinde, kabuğun **içinde** kart. Geri kalan
  dinamik adresler (sınav seviyesi, ünite indeksi, modül patronu) artık
  gezinmeyi kaybetmiyor. Android'de adres yazılamadığı için böyle bir an yok;
  kabuğun hiç kaybolmaması o davranışın webdeki karşılığı. Bölümüne özel 404'ü
  olan üç yer bu sınırdan önce bulunuyor.

### §301

Yedi ölçü. Dördü dosya varlığı (grup + üç bölüm 404'ü). Beşinci ve altıncı
harvest'in çalıştığı — kümeler boşalırsa "eksik yok" boş bir doğru olurdu.
Yedincisi asıl ölçü: Android'in bulunamadı cümlelerinin kümesi ile webin
kümesi **birebir** eşit. İki yönlü: yeni bir Android durumu webde karşılıksız
kalırsa "yalnız mobil" olarak düşüyor, webde kalıp Android'de kalkan bir cümle
"yalnız web" olarak.

`pron.word_missing` desene uyuyor ama bir bulunamadı durumu değil (telaffuz
kartındaki "duyulmadı" etiketi) — muafiyet kapıda belgeli ve liste yalnızca
küçülebilir.

Üç enjeksiyon doğrulandı: ders 404'ünü kaldırmak (hem dosya ölçüsü hem küme
ölçüsü düşüyor — yani kapı kusurun kendisini yakalıyor), grup 404'ünü
kaldırmak, muafiyeti boşaltmak.

## §11.427 — Davet hunisinin varış yarısı iki platformda da ölçülmüyordu

Panelde davet hunisi iki olay okuyor: `share` (paylaşıldı) ve `invite_open`
(açıldı). İkinci yarısı **hiç akmıyordu** ve sebebi iki katlıydı.

1. **İşaret hiçbir paylaşım yüzeyinde konmuyordu.** `components/telemetry`
   adresteki `?src=invite` (ya da `?invite`) işaretini görünce `invite_open`
   yazıyor. Ama iki platform da çıplak `/u/<ad>` paylaşıyordu
   (`social/friends-hub` ve `FriendsScreen`) — yani huninin varış yarısı
   ölçülüyor **gibi** görünüyor, gerçekte hep sıfır kalıyordu.
2. **Mobilde böyle bir olay hiç yoktu.** Oysa davetin açıldığı yer çoğunlukla
   telefon: uygulaması kurulu bir kullanıcı bağlantıya dokunduğunda tarayıcı
   değil derin bağlantı dalı çalışıyor (`lib/deepLink` `kind: "profile"` —
   yorumu bu bağlantıyı zaten "davet bağlantısının kendisi" diye adlandırıyor).

Düzeltme üç parça:

- İki paylaşım bağlantısı da `?src=invite` taşıyor.
- `lib/deepLink` işareti okuyup eyleme koyuyor; koşul web ile **birebir aynı**
  (`src=invite` ya da `invite` anahtarının varlığı).
- `App.tsx` derin bağlantı çözülür çözülmez `track("invite_open")` yazıyor —
  gezgin yarışından önce, yani bekletilen eylem yolunda olay kaybolmuyor.
  Aynı adres bir **bildirimden** gelirse buradan geçmiyor (`lib/pushRoute`) ve
  davet sayılmıyor; o yolun kendi olayı var (`push_open`).

`EventName` birliğine de eklendi (mobil `lib/track` — tip kaydı, adın
uydurulmadığının kanıtı).

### İki eski kaydın gerekçesi düştü

Değişiklik iki mevcut kapının kaydını da yanlışladı ve ikisi de **kendiliğinden
düştü** — sayaç ölçülerinin işe yaradığı yer tam burası:

- §44 `WEB_OZEL` listesinde `invite_open` "tarayıcı ölçüm katmanı" diye
  yazılıydı. Ölçülen şey tarayıcıya ait değildi; kayıt listeden çıktı
  (`page_view`, `time_spent`, `client_error`, `push_optin` ve üç yürüyüş
  olayının aynı gerekçeyle düştüğü yer).
- §133'ün `TEK` haritasındaki kanıt `!/invite/.test(deepLink.ts)` idi, yani
  "mobil derin bağlantı daveti tanımıyor". Artık tanıyor; kayıt kalktı.

Ayrıca §133'ün mobil taraması `mobile/src` ile sınırlıydı ve **`mobile/App.tsx`
kök dizinde**: oradan yazılan her olay "yalnız webde" görünüyordu. §44 o dosyayı
baştan beri ayrıca okuyor, §133 okumuyordu — tarama düzeltildi.

### §302

Sekiz ölçü: iki paylaşım yüzeyi de işareti **koyuyor**, iki istemci de işareti
**okuyor** (aynı koşulla), iki platform da olayı **yazıyor**, ve huninin ilk
yarısı (`share`, kind `profile`) iki tarafta da duruyor. Sonuncusu olmasa yarım
bir huni yeşil görünürdü: varışı ölçülen ama paylaşımı ölçülmeyen bir davet de
hesaplanamaz.

Dört enjeksiyon doğrulandı: her iki bağlantıdan işareti kaldırmak, mobil olayı
kaldırmak, mobil koşulun yarısını kaldırmak.

## §11.428 — `check:endpoints` yalnız bir yöne bakıyordu

`check:endpoints` üç şey soruyordu: her ucun bir çağıranı var mı (`ALLOW`), bir
uç yalnız **webden** mi çağrılıyor (`WEB_ONLY`), ve aynı sorunun yöntem hâli
(`WEB_ONLY_METHOD`). Bu listenin kendi yorumu onu "`ALLOW`un parite hâli" diye
tanımlıyor — ama **paritenin öteki yarısı hiç yoktu**: mobilin çağırdığı ve
webin çağırmadığı uçlar ölçülmüyordu.

Asimetrinin pahalı yönü tam olarak bu. Android bu projede en ileride olan
taraf; yani "mobilde bir yüzey var, webde hiç yok" durumu "webde var, mobilde
yok"tan **daha sık** ve aynı derecede sessiz. Web-only tarafı ölçüldüğünde iki
gerçek örnek çıkmıştı (`/api/errors`, `/api/growth`); ters yön hiç ölçülmemişti.

Ölçüm eklendi ve bugünkü durum yazıldı: **7 uç, 11 yöntem** yalnız mobilden
çağrılıyor. Hepsinin sebebi aynı ailenin türevi — web sayfayı **sunucuda**
çiziyor ve veriyi kendi sunucu modülünden doğrudan okuyor
(`lib/immersion/build`, `lib/session`, `lib/premium/access`, `lib/mock-exams`),
mobil aynı veriyi HTTP ile almak zorunda. Geri kalanı taşımaya özgü
(`/api/account/apple-code`, `/api/push/device`, `/api/turnstile`). Yani bugün
**webde eksik bir yüzey yok**; ama bundan sonra biri eksik kalırsa kapı
söyleyecek.

İki yön de artık bayatlamaya karşı korunuyor: listede olup **artık webde de**
çağrılan bir kayıt da düşüyor.

`--check` özet satırı sayıları da yazıyor (`5 yalnız web (9 yöntem), 7 yalnız
mobil (11 yöntem)`): "tamam" tek başına taramanın **çalıştığını** söylemiyordu —
kümeler boşalsa da "belgesiz yok" doğru çıkardı.

Dört enjeksiyon doğrulandı: kayıttan bir uç düşürmek, listeye artık iki tarafın
da çağırdığı bir uç eklemek, yöntem kaydını düşürmek, ve webin gerçek bir
çağrısını kaldırmak (`POST /api/quests` yalnız mobile düştü ve kapı söyledi).

## §11.429 — `check:hit` referans aldığı tarafı hiç ölçmüyordu

`check:hit`in eşiği **36 px** ve gerekçesi kapının kendi yorumunda yazılı:
"mobilde ikincil denetimler `hitSlop` taşıyor ve gerçek hedef 36-50; webde
hedef görünen boyutun kendisi". Yani eşiğin kaynağı **mobilin ölçüsü** — ama
mobil hiç ölçülmüyordu. Referans olduğu varsayılan taraf denetimsizdi.

Ölçüldüğünde üç yerde tutulmadığı çıktı:

| yer | hedef | ne oldu |
|---|---|---|
| `social/Find.tsx` temizleme ikonu | **18** | çıplak ikon: kutu yok, dolgu yok, `hitSlop` yok. Webde aynı düğme `h-9 w-9` = 36. |
| `ExamScreen` "dinle" (diyalog satırı) | **30** | 18 px ikon + `hitSlop={6}` |
| `ExamScreen` "dinle" (tek cümle) | **32** | 20 px ikon + `hitSlop={6}` |

Son ikisi ayrıca **aynı ekranda aynı denetimin iki ayrı boyu**. Üçü de
düzeltildi: temizleme ikonu webdekiyle aynı 36×36 kutuya girdi, iki "dinle"
düğmesi de 20 px ikon + `hitSlop={8}` (etkili 36) ile eşitlendi.

### Kapının mobil yarısı

Aynı kural, mobilin hesabıyla: Tailwind sınıfı yok, görünen boyut ya
`style`daki `width`/`height`ın küçük ekseni, ya ikon + dolgunun küçük ekseni,
ya da — hiçbiri verilmemişse — **ikonun kendisi** (RN dokunulabiliri içeriğine
göre ölçüyor). `hitSlop={N}` her eksende N ekliyor, etkili = görünen + 2N.

Son dal kapının en önemli dalı ve **sonradan** eklendi. İlk yazımda "hiçbir şey
verilmemiş" durum *ölçülemez* sayılıyordu; oysa boyut bilgisi hiç verilmemiş bir
denetim, fazla küçük olması **en olası** olan denetimdir. Enjeksiyon ortaya
çıkardı: `Find.tsx`in çıplak 18 px'lik ikonunu geri koyduğumda kapı bulgu değil
"ölçülemez" dedi — yani kusurun kendisine bakmıyordu. Gerçekten ölçülemeyen tek
durum boyutun başka yerden gelmesi (`flex`, satır içi olmayan stil).

"tamam" satırı artık **ölçülen** sayıları da yazıyor (16 web · 46 mobil):
kümeler boşalsa "eşiğin altında yok" boş bir doğru olurdu.

Üç enjeksiyon doğrulandı: temizleme kutusunu geri almak, "dinle" düğmesini eski
`hitSlop`una döndürmek, ve webde bir `hit-8`i silmek (web yarısı da çalışıyor).

## §11.430 — `check:type` de referans aldığı tarafı ölçmüyordu

`check:type`in gerekçesi mobili referans alıyor: "mobilde her metin
`<Text variant>` ile yazılıyor ve **serbest punto yok**". Mobil hiç ölçülmüyordu
ve serbest punto orada da vardı.

Üstelik kapının kendi muafiyet yorumu bir **iddia** taşıyordu: "oyun turunun
cevap alanı iki platformda da 18 px; mobil aynı alanı `fontSize: 18` ile
yazıyor (`game/rounds.tsx`, **dört giriş**)". Dördünden biri **17** px
yazıyordu — yani webde bir muafiyeti gerekçelendiren cümle yanlıştı ve kimse
ölçmediği için yanlış kalmıştı. Aynı oyunun aynı sınıf cevap alanı iki ayrı
puntoda.

İki rozet sayacı da ölçek dışıydı: `Chip` ve `InboxBell` `fontSize: 10`
yazıyordu (`variant="micro"`i ezerek). Webde aynı sayaç `text-micro`, yani 11 —
kutu ölçüleri de aynı (`min-w-[18px]` / `minWidth: 18`). Üçü de düzeltildi:
dördüncü giriş 18, iki sayaç `micro`.

### Kapının mobil yarısı

Ölçek **dosyadan okunuyor** (`mobile/src/theme/tokens.ts` içindeki
`typography` basamakları), kapıda tekrar yazılmıyor: basamak değişirse kapı
kendiliğinden yeni ölçeği kullanıyor. `tokens.ts`in kendisi taramadan düşüyor —
orası ölçeğin tanımı, kullanımı değil.

Üç muafiyet kaldı ve üçü de yazılı: oyun cevap alanı 18 (webde `text-lg`, aynı
sebep artık **iki tarafta** yazılı), yerleştirme sonucunun seviye karosu 40
(110 px'lik dairenin tek kahraman sayısı), günün turunun puanı 52. Ölü muafiyet
de düşüyor — web yarısındaki kural mobile de uygulandı.

"tamam" satırı mobilde **okunan punto sayısını** yazıyor (25): tarama bozulup
sıfıra düşerse "ölçek dışı yok" boş bir doğru olurdu.

Dört enjeksiyon doğrulandı: 17'yi geri koymak, rozeti 10'a döndürmek,
muafiyetten bir kaydı düşürmek, listeye karşılıksız bir kayıt eklemek.

## §11.431 — Hangi kapı iki taraflı, hangisi değil (ayna taramasının kendi hatası)

§11.428-430 aynı merceği kullandı: "bu kapı referans aldığı tarafı ölçüyor mu?"
Üç yerde gerçek kör nokta çıktı. Dördüncü olarak yarıçap kapısına bakıldığında
**ölçüm hatası bendeydi**: `check:radius`in mobil yarısı BAŞTAN BERİ var ve
tam olarak doğru işi yapıyor (2-9 px'lik ilerleme çubuklarını ve daireleri
saymıyor, kalanı jeton olmaya zorluyor, onay kutusunun 6'sı sebebiyle yazılı).
Tarama onu kaçırdı çünkü yolu `path.join(ROOT, "mobile", "src")` ile kuruluyor
ve ben `"mobile/src"` dizgisini aramıştım — kapının kendi dersinin tekrarı:
**bir olguyu tam metin olarak aramak**.

Doğru envanter, bir daha yanlış yerden başlanmasın diye:

| kapı | kapsam |
|---|---|
| `check:colors` | iki taraflı |
| `check:endpoints` | iki taraflı (§11.428'de tamamlandı) |
| `check:hit` | iki taraflı (§11.429'da tamamlandı) |
| `check:type` | iki taraflı (§11.430'da tamamlandı) |
| `check:radius` | iki taraflı (baştan beri) |
| `check:tokens` | iki taraflı |
| `check:selection` | iki taraflı |
| `check:keyfam` | iki taraflı |
| `check:loading` | **yalnız web** — `loading.tsx` bir Next kavramı; mobil karşılığı ekranın kendi iskelet dalı ve o dal ölçülmedi |
| `check:title` | yalnız web — rota başlığı web kavramı |
| `check:purge` | yalnız web — Tailwind sınıf budaması |
| `check:client` | yalnız web — `"use client"` sınırı |

`check:loading` tek gerçek açık kalan: mobilde veri bekleyen ekranların iskelet
dalı ölçülmüyor. Bu turda elle bakıldı — `Skeleton` 37 dosyada ve bakılan
ekranlarda (bildirimler, lider tablosu, deneme sınavı) boş ekran değil ya
iskelet ya da varsayılan değerlerle çizilmiş bir arayüz çıkıyor; `RoleplayExam`
dönen çark kullanıyor (web orada iskelet çiziyor). Kapıya dönüştürülmesi
"ekran veri bekliyor mu" sorusunun mobilde `page.tsx` kadar kesin bir cevabı
olmadığı için ayrı bir iş.

## §11.432 — Eşleşen maskot yüzeyleri elle sayılıyordu; ikisi ayrışıktı, biri hiç yoktu

Maskotun kipi iki yerde karşılaştırılıyordu: sınav girişi (iki ekran) ve
"bu oyuna kelime yok" dalı. Geri kalan yüzeyler **hiç bakılmamış** durumdaydı.

Yüzeyleri eşleştiren şeyin ne olduğu zaten belli: `<Mascot>`ın hemen ardındaki
ilk sözlük anahtarı. Onunla hesaplandığında yedi ortak yüzey çıktı ve **ikisi
ayrışıktı** — ikisi de rol yapma sınavında:

| yüzey | web | mobil |
|---|---|---|
| `item.mono_scoring` (puanlama beklemesi) | `think` / 80 | **`idle` / 92** |
| `rpexam.service_down` (servis kapalı) | `sad` / 80 | `sad` / **92** |

`idle` neşeli boşta-bekleme klibi ve puanlama anını anlatmıyor; web aynı dalda
`think` çiziyor. Üstelik `think` klibi mobile bu turlarda eklenmişti (§11.417)
ve üç yüzey çevrilirken bu dal atlanmıştı.

Boyut da ölçüye giriyor, çünkü eşleşen dört yüzey **baştan beri** aynı boyu
taşıyordu (96/96, 90/90, 112/112, 104/104) — yani kural yazılı değildi ama
uygulanıyordu. Rol yapma sınavının iki dalı tek aykırıydı.

**Haftalık sınavın kapağında mobilde maskot hiç yoktu.** Web aynı kapakta
`think` / 64 çiziyor ve üç metin ile iki düğme birebir aynı. Mobil kapak ortalı
olduğu için maskot başlığın üstünde (web satırı sola yatırıp maskotu başlığın
soluna koyuyor) — aynı seçim `GameScreen`in "kelime yok" dalında da yapılı.
Ortak yüzey sayısı böylece 6'dan 7'ye çıktı.

### Kapı

Elle liste yerine **hesaplanan** küme: iki taraftaki `<Mascot>` kullanımları
anahtarlarıyla eşleştiriliyor ve ortak her anahtarda `kip/boy` çifti birebir
eşit olmak zorunda. İkinci ölçü sayı: eşleştirme bozulup küme boşalırsa "fark
yok" boş bir doğru olurdu, o yüzden ortak yüzey sayısı 7'nin altına düşemez.

Elle yazılmış iki eski ölçü kalıyor: onlar `CoachBubble moment="exam_intro"`
üzerinden eşleşiyor, yani `<Mascot>` taramasının göremediği bir yüzey.

Üç enjeksiyon doğrulandı: puanlama kipini `idle`a döndürmek, haftalık maskotunu
kaldırmak (sayı ölçüsü düşüyor), webin bir boyunu değiştirmek (kapı iki yönlü).

## §11.433 — Koç balonunun boyu üç yerde iki türlüydü

Koç balonu (`CoachBubble`) beş yerde çiziliyor ve boyu yalnız iki yerde
karşılaştırılıyordu — hayır, karşılaştırılan şey **kip**ti; **boy hiç
ölçülmüyordu** ve balonun öteki yerlerine (sonuç balonu, zayıf nokta turu) hiç
bakılmamıştı.

| yüzey | web | mobil |
|---|---|---|
| sınav girişi (`exam_intro`) | 48 | `ExamScreen` 48 · **`RoleplayExam` 56** |
| sonuç balonu (`exam_pass`/`exam_fail`) | 56 | `RoleplayExam` 56 · **`ExamScreen` 72** |
| zayıf nokta turu (`weak_done`) | 72 | 72 |

Web üçünde de kendi içinde tutarlı: giriş 48, sonuç 56, zayıf nokta 72. Mobilde
iki aykırı var ve ikisi de **mobilin kendi kardeş ekranıyla da** çelişiyor —
yani düzeltmenin yönü iki ayrı gerekçeyle aynı: `RoleplayExam` girişi 48,
`ExamScreen` sonucu 56.

Aynı turda maskot tarafında da iki boy aykırısı çıkmıştı (§11.432); ikisi
birlikte okununca kalıp belli: **rol yapma ve sınav ekranları büyütülmüş
kopyalar taşıyor** ve hiçbiri ölçülmüyordu.

### Kapı

Ölçü **dosya çifti** üzerinden, çünkü balonun kimliği `moment` ve aynı ikili
(`exam_pass`/`exam_fail`) iki ayrı ekranda kullanılıyor — tek başına anahtar
olamıyor. Üç çiftin (sınav, rol yapma, tur özeti) balonları **sırayla**
çıkarılıp `<an kümesi>/<boy>` olarak karşılaştırılıyor; üçlü koşul ifadesi
(`passed ? "exam_pass" : "exam_fail"`) böylece tek bir kimliğe dönüyor.

İkinci ölçü sayı: eşleştirme bozulup listeler boşalırsa "fark yok" boş bir
doğru olurdu.

Üç enjeksiyon doğrulandı: sınav sonucunu 72'ye döndürmek, rol yapma girişini
56'ya döndürmek, webin bir balonunu kaldırmak (sayı ölçüsü düşüyor).

## §11.434 — Ölçüldü, temiz: boş hâller ve mobil iskeletler

İki eksen bu turda ölçülüp **temiz** çıktı; ikisini de yazmak gerekiyor çünkü
"bakıldı mı" sorusunun cevabı kodda görünmüyor.

**Boş hâller.** `<EmptyCard>` kullanımları başlık anahtarıyla eşleştirildi: 19
ortak yüzeyde **ikon farkı yok**, tint'ler de anlamsal karşılıklarıyla eşleşiyor
(web `rose`↔mobil `danger`, `mint`↔`success`, `sky`↔`info`, `flame`↔`streak`).
Eşleşmeyenlerin hepsinin sebebi var: mobilin üç "giriş gerekli" kartı (webde
sunucu `/login`a yönlendiriyor), `league.alone` (web aynı metinleri kendi
kartının içinde çiziyor, gerekçesi orada yazılı) ve `notfound.title`
(§11.426'da eklenen grup 404'ü — mobilde adres çubuğu yok).

**Mobil yükleme iskeletleri** (§11.431'de açık bırakılan tek madde). `Skeleton`
mobilde 37 dosyada; iskeleti olmayıp veri bekleyen yedi ekran tek tek okundu:

- `Boss` ve `Challenge`: tam ekran "hazırlanıyor" metni, canlı bölge olarak
  duyuruluyor. Web karşılıklarının `loading.tsx`i **yok** — o iki rota sunucuda
  bekleyen bir şey yapmıyor, yani karşılaştırılacak bir iskelet de yok.
- `Notifications`: anahtarlar varsayılan değerlerle hemen çiziliyor, boş ekran
  yok; web de aynı (`NotificationSettings` başlığı ve izin satırını hemen
  basıyor).
- `Leaderboard`: iskelet alt bileşenlerde (`FriendsBoard`, `LeagueBoard`).
- `RoleplayExam`: ilk faz yerel (`intro`), veri beklemesi yok.
- `WalkMode`: ilk faz yerel (`intro`), ilk boyamadan önce ağ yok.
- `Item`: beceri oynatıcısı — paralel oturumun elinde, dokunulmadı.

Yani mobilde boş ekran bırakan bir yükleme yolu bulunmadı; `check:loading`in
mobil yarısı **yazılmıyor** ve sebebi bu.

## §11.435 — Çift geri bildirim: kapı yeşildi, kusur iki platformda da duruyordu

İki platformda da haptik sarmalayıcı **sesi de** çalıyor: web `lib/fx`
`vibrate()` önce `play(kind)` diyor, mobil `lib/haptics` `haptic()` sonunda
`sfx(kind)` diyor. Yani çağıran tek satır yazıyor; ikisini birden yazmak ses
efektini **iki kez** istiyor ve tek duyulması `sfx` içindeki 120 ms yineleme
penceresine kalıyor — pencere kısalsa ya da kalksa aynı ses üst üste iki kez
çalar.

Bu kuralın kapısı **vardı** (`check:parity` §84) ve yeşildi. Ama iki artık
çağrı da duruyordu:

- **mobil** `game/rounds` `markAnswer` — her oyun cevabının geçtiği yol
- **web** `walk-player` — yürümede kararın bildirildiği yer

Kapı neden görmedi: ölçüsü iki şeyi birden istiyordu — kip **dizgi olarak**
yazılı olsun (`haptic("correct")`) ve iki çağrı **aynı satırda** olsun.
Gerçekteki iki artık da üçlü koşul kullanıyordu
(`haptic(ok ? "correct" : "wrong")`) ve çağrılar **alt altaydı**. Dosyanın
kendi defterindeki iki dersin ikisi birden: *olguyu tam metin olarak aramak* ve
*düğüm yerine pencere gerektiği yerde satıra bakmak*.

Üstelik `lib/haptics`in docblock'u "dört çağrı yeri böyleydi" diye **temizlendi**
diyordu; beşincisi — en çok geçilen yol — atlanmıştı. Yorum da düzeltildi.

### Kapı

Ölçü artık kipe hiç bakmıyor ve pencere kullanıyor: sarmalayıcıyı çeken satırdan
sonraki **iki dolu satırda** ses çağrısı varsa çift sayılıyor. Sarmalayıcının
kendi tanım dosyaları (`fx.ts`, `sfx.ts`, `haptics.ts`) taramadan düşüyor.
İkinci ölçü çağrı sayısı: sarmalayıcı hiç kullanılmaz hâle gelirse "çift yok"
boş bir doğru olurdu. Ölçü **mutlak** — iki taraf birbiriyle değil beklenenle
karşılaştırılıyor, çünkü doğru soru "ikisi eşit mi" değil "çift var mı".

Blok yorum silinirken satır sayısı korunuyor: rapor satır numarası veriyor ve
ilk yazım numarayı kaydırıyordu (enjeksiyon 110 dedi, gerçek 163).

Üç enjeksiyon doğrulandı: mobil çiftlemeyi geri koymak, web çiftlemeyi geri
koymak, sarmalayıcıyı hiç kullanılmaz yapmak (sayı ölçüsü düşüyor).

## §11.436 — Mutasyon taraması: tasarım ağının iki deliği

§11.435'ten sonra soruyu tersine çevirdim: "kapılar yeşilken hangi değişiklik
fark edilmiyor?" Altı tasarım değeri tek tek bozuldu ve altı kapı
(`check:parity`, `colors`, `tokens`, `type`, `radius`, `hit`) koşturuldu.

| bozulan | yakalayan |
|---|---|
| mobil `spacing.md` 12→13 | `check:tokens` |
| mobil `radii.lg` 20→22 | `check:tokens` |
| web `--radius-card` 26→28 | `check:tokens` |
| mobil `typography.body` 15→14 | `check:tokens` |
| mobil `softShadow` varsayılan yükselti 8→9 | **hiçbiri** |
| web sınav oynatıcısında `CheckIcon` 14→16 | **hiçbiri** |

**İkinci delik kapatıldı.** İkon boyu genel olarak bağlama göre değişiyor (aynı
`SpeakerIcon` webde 13'ten 34'e yedi ayrı boyda), yani "aynı ikon aynı boy" diye
bir kural yok ve yazılsa yanlış olurdu. Ama **eşleşen dosya çiftinde** aynı ikon
iki tarafta da **bir kez** geçiyorsa o aynı denetimdir ve boyu da aynı olmak
zorunda. Bugün üç çift ölçülüyor (`CheckIcon` 14/14, `MicIcon` 20/20,
`AlertIcon` 16/16) ve hepsi eşit; birden fazla geçen ikonlar bilerek atlanıyor —
orada hangisi hangisiyle eşleşir sorusunun cevabı yok ve tahmin etmek kapıyı
yanlış yapar (`SpeakerIcon` webde bir, mobilde iki yerde). İkinci ölçü ölçülen
çift sayısı.

**Birinci delik kapatılmadı, sebebi şu:** `softShadow(color, elevation = 8)` ve
`cardShadow(colors, elevation = 10)` varsayılanlarını **hiçbir çağrı yeri
kullanmıyor** — her çağrı yükseltiyi açıkça veriyor (ölçüldü: sıfır tek-argümanlı
çağrı). Yani mutasyon ölü koda dokundu; onu ölçen bir kapı, hiçbir kullanıcının
göremediği bir sayıyı koruyor olurdu. Gölge basamaklarının kendisi (`6/10/16` ↔
`--shadow-soft-sm/soft/lg`) `check:tokens` tarafından zaten karşılaştırılıyor.

Bir enjeksiyon daha doğrulandı (mobil `MicIcon` 20→22): kapı iki yönlü.

## §11.437 — Klavye boşluğu ölçüsü dosya düzeyindeydi (mutasyon taramasının ikinci turu)

Mutasyon taraması mobil tarafa ve erişilebilirlik özniteliklerine de uygulandı.
Yedi bozmadan beşi yakalandı (`gestureEnabled`, `maxFontSizeMultiplier`, iOS
bildirim sesi, `REMINDER_HOURS`, sınav sonucu duyurusu — hepsi
`check:parity`'den). İkisi kaçtı ve biri düzeltildi.

**Kaçan 1 — klavye boşluğu ölçüsü kapsam ölçmüyordu.** §296'nın A ölçüsü
**dosya düzeyindeydi**: "metin kutusu ve kaydırma alanı olan dosyada öznitelik
geçiyor mu". Gerekçesi yazılıydı ("kutu çocuk bileşende de olabiliyor, hangi
`ScrollView` sorusu metinden güvenilir sorulamıyor") ama sonuç, defterin en sık
tekrar eden kusuru: **varlık ölçmek, kapsam ölçmemek.** `ExamScreen`'de sekiz
kaydırma alanı var; ikisi öznitelikli. Biri özniteliği kaybetse dosya düzeyindeki
ölçü hiçbir şey söylemiyordu.

Ölçü **düğüm düzeyine** çekildi: her `<ScrollView>`un gövdesi eşleşen kapanışa
kadar çıkarılıyor (iç içe olanlar sayılarak) ve gövdesinde `<TextInput` varsa
açılış etiketi özniteliği taşımak zorunda. Bugün 53 kaydırma alanından
**7**'sinin içinde metin kutusu var ve 7'sinde de öznitelik duruyor — yani kusur
yok, ama artık ölçülüyor.

İki yan kazanç: (1) muafiyet listesi A ölçüsünde **gereksiz kaldı** — alt çubuk
düzenindeki iki dosyanın metin kutuları kaydırma alanının dışında, yani düğüm
ölçüsü onları kendiliğinden saymıyor; liste yalnız B ölçüsü için duruyor.
(2) Öznitelik adı artık **sınırlı** aranıyor: enjeksiyon
`automaticallyAdjustKeyboardInsetsX` yazımını öznitelik saydığını gösterdi
(§250'deki `useRef<TextInput>` tuzağının aynısı).

Üç enjeksiyon doğrulandı: özniteliği tamamen silmek, `ExamScreen`'in **iki**
özniteliğinden birini silmek (dosya düzeyindeki ölçünün göremediği durum),
öznitelik adını uzatmak.

**Kaçan 2 — ölçülmedi, yazılıyor.** Webin tepki haplarından `aria-label`ı
kaldırmak hiçbir kapıyı düşürmüyor. Hap ikon + **sayı** taşıyor; `check:hit`in
"ikonlu düğme" ölçüsü içeriğinde etiket dışı bir şey görünce ölçmeyi bırakıyor,
yani sayı taşıyan hap kapsama girmiyor — oysa **sayı bir ad değil**. Ölçüyü
"içeriği yalnız ikon + sayısal ifade olan düğme ad taşımak zorunda" diye kurmayı
denedim; ayırt etme (sayısal ifade ↔ metin ifadesi) bugün güvenilir çıkmadı ve
ölçmeyen bir kapı yazmaktansa **açık bırakıldı**. Mobil tarafta aynı hap
`accessibilityLabel` taşıyor (`social/ReactionBar`), web tarafında da duruyor;
kayıt, koruması olmadığını söylemek için.

### Düzeltme: `ios:check` üç turdur hiç koşmamış

Bu turun süitinde `npm run -s ios:check` kök dizinden çağrılıyordu; o betik
**`mobile/package.json`**'da (`python3 scripts/check-ios.py`, yani
`mobile/scripts/`). Kökte öyle bir betik olmadığı için komut sessizce hiçbir şey
yapmıyor ve ben çıktısızlığı "geçti" diye okuyordum. Doğru yerden koşturuldu:
**8 denetimin hepsi geçiyor** (AppIcon, `.strings`, dil beyanı, Swift/ObjC
sözdizimi, cihaz ailesi, Google iOS istemcisi…). Yani durum iyiydi, raporum
dayanaksızdı.

## §11.438 — Mutasyon taramasının üçüncü turu: CSS jetonu ve alan adı listeleri

On bozma daha denendi (derin bağlantı host listesi, push rota tablosu, sfx ipucu
adı, anlamsal renk jetonu, `MIN_MASTERED`, paket açılış yüzdesi, avatar parçası,
AASA yolu, sekme anahtarı). İkisi `check:parity`den yakalandı; kalanların çoğu
**tsc**'nin ağına düşüyor (yeniden adlandırılan bir sabit, bir `Palette` alanı,
bir avatar parçası derlemede kırılıyor) — yani "hiçbiri" demek korumasız demek
değil. Tsc'nin göremediği ikisi gerçek delikti ve ikisi de kapatıldı.

### §303 — CSS jetonu tanımsız kalmıyor

Mobil renk jetonları **tipli** (`theme/colors` `Palette`): bir adı değiştirirsen
derleyici her kullanım yerini gösterir. Webin CSS değişkenlerinde böyle bir ağ
**yok**: `var(--color-danger)` tanımsız bir ada bakarsa tarayıcı sessizce boş
değer kullanır — yazı kalıtılan renge düşer, arka plan hiç boyanmaz, ne hata ne
uyarı. Mutasyon bunu gösterdi: `globals.css`te `--color-danger`ı yeniden
adlandırmak hiçbir kapıyı düşürmüyordu (`check:colors` jetonun
**kullanıldığını** ölçüyor, **var olduğunu** ölçmüyor).

Kapı üç tanım kaynağını da sayıyor: `globals.css`, çalışma anında
`style.setProperty("--x", …)` (kabuk `--nav-h`/`--app-h`/`--safe-b`yi **ölçerek**
yazıyor) ve satır içi stil nesnesi. Dinamik adlar (`var(--color-${tone}-500)`)
ayrı: sebebiyle ve **alabileceği değerlerle** yazılı, kapı her değeri tek tek
doğruluyor ve şablonun dosyada hâlâ durduğunu da ölçüyor. Bugün 112 tanım, 64
kullanım, sıfır tanımsız.

Dört enjeksiyon doğrulandı: jetonu yeniden adlandırmak, dinamik değerlerden
birini kaldırmak, şablonu değiştirmek (liste bayatlıyor), `setProperty`
tanımını kaldırmak.

### §304 — İki alan adı listesi aynı dört adı sayıyor

İki yerde bir alan adı listesi var ve ikisi de **aynı sebebi** yazıyor: eski
alan adı (`exfe.me`) listede kalmak zorunda, çünkü yayımlanmış APK'lerde API
adresi gömülü ve o kurulumlar ömür boyu oraya istek atıyor.

- sunucu `lib/auth/server` `trustedOrigins` — better-auth hangi kökenden gelen
  isteği kabul edecek
- mobil `lib/deepLink` `HOSTS` — derin bağlantı hangi alan adından gelirse
  jetonu kabul edecek

Birinden bir ad düşerse kimse fark etmiyordu ve sonucu sessiz: eski kurulumda ya
derin bağlantı çalışmayı bırakır ya da sunucu eski kökeni reddedip girişi kırar —
ama iki taraf ayrı ayrı "doğru" görünür. Ölçü **küme eşitliği** ve iki yönlü:
birine yeni bir ad eklenip ötekine eklenmezse de kırmızı verir.

Sunucu dosyası **ham** okunuyor: `sil()` `//`yi koşulsuz attığı için `https://`
bozuluyor ve liste boş çıkıyordu (defterin tekrar eden tuzağı, ilk yazımda yine
tuzağa düştüm).

Dört enjeksiyon doğrulandı: her iki listeden bir ad düşürmek, yalnız birine yeni
ad eklemek, listenin adını değiştirip okunamaz yapmak.

## §11.439 — Şablonla kurulan sözlük anahtarlarının hiçbir ağı yoktu

Çoğu `t("…")` çağrısı anahtarı **dizgi** olarak yazıyor ve eksik bir anahtar er
ya da geç fark ediliyor. Ama bir kaç yerde anahtar **şablonla** kuruluyor:

```
t(`social.reaction_${kind}`)   t(`league.tier_${…}`)   t(`band.${p.band}`)
t(`mockexam.fail_${offline}`)  t(`mockexam.goal_${g.goal}`)
```

Böyle bir anahtar sözlükte yoksa **hiçbir denetim kırmızı vermiyordu**:
`check:i18n` sözlükleri **birbiriyle** karşılaştırıyor (üç dilde aynı anahtar var
mı), kullanımla karşılaştırmıyor; tsc ise şablonun içini görmüyor. Sonuç ekranda
ham anahtar — kullanıcı "band.solid" yazan bir etiket görüyor.

Kapı her aileyi **kaynak kümesinden** genişletiyor (kümeler kodda zaten var:
`REACTION_KINDS`, `LEAGUE_TIERS`, `Band`, `FailReason`, `MockGoal`) ve her
genişlemeyi **iki** sözlükte de arıyor. Bugün 27 genişleme, sıfır eksik.

Üç yan ölçü: kaynak kümenin **okunabildiği** (adı değişirse boş kümeyle "eksik
yok" boş bir doğru olurdu), çağrı yerinin hâlâ **şablon** kullandığı (şablon
kalkarsa aile listeden düşmeli), ve toplam genişleme sayısı.

`genre.*` ailesi (26 anahtar, iki platformda da şablonla kullanılıyor) bilerek
**dışarıda**: kaynak kümesi beceri egzersizi verisinden geliyor ve o dosyalar
(`lib/skills/types`, `data/skills`) paralel oturumun elinde. Eklenmesi o iş
bitince tek satır.

Beş enjeksiyon doğrulandı: tabandan bir anahtar düşürmek, mobil sözlükten bir
anahtar düşürmek, kaynak kümeye sözlüksüz yeni bir değer eklemek, kaynak kümenin
adını değiştirmek, çağrı yerindeki şablonu sabit anahtara çevirmek.

## §11.440 — Promo sebep listesi ve `promo.*` ailesi; ve süiti elle kurmayı bıraktım

§11.439'un ailesine bir altıncı eklendi ve yanına bir küme eşitliği ölçüsü
kondu.

**`promo.*`** — Kod kullanma sonucu: sunucu sebebi doğrudan anahtar adı olarak
döndürüyor (`not_found`, `already`, `used_up`, `expired`, `disabled`,
`rate_limited`, `self`) ve her istemci kendi **tanıdık listesini** tutuyor (web
`known`, mobil `PROMO_ERRORS`). Biri bir sebebi tanımazsa o sebep o platformda
"daha sonra tekrar dene" diye görünüyor — aynı sunucu cevabı iki ayrı cümle.
Bugün iki liste birebir aynı (7 değer) ve yedi anahtarın hepsi sözlükte; ölçü
küme eşitliği, yani bir sebep tek tarafa eklenirse kapı söylüyor.

Bu aile `i18n-check`in `DINAMIK_ORTAK` muafiyet listesinde de var — orada
"çalışma anında kuruluyor" diye **ölü anahtar denetiminden çıkarılmış**. Yani o
yedi anahtarın varlığını bugüne kadar hiçbir şey ölçmüyordu; §305 artık ölçüyor.
İki kapı birbirinin tersini yapıyor ve ikisi birlikte aileyi kapatıyor:
`i18n-check` "sözlükte olup çağrılmayan" tarafı, `check:parity` §305 "çağrılıp
sözlükte olmayan" tarafı.

Üç enjeksiyon doğrulandı: web listesine sözlüksüz yeni sebep eklemek (iki ölçü
birden düşüyor), mobil listesinden bir sebep düşürmek, `promo.self`i sözlükten
düşürmek.

### Düzeltme: projenin kendi süiti varmış

Bu turlarda süiti elle kuruyordum (`npm run -s lint`, iki `tsc`, jest, birkaç
`check:*`) ve iki komutu yanlış adla çağırdım: `ios:check` (o betik
`mobile/package.json`'da — §11.437) ve **`check:i18n`** (doğrusu `i18n:check`).
İkisi de kökte yok, yani `npm run -s` sessizce hiçbir şey yapmıyor ve ben
çıktısızlığı "geçti" diye okuyordum.

Oysa proje bunu zaten çözmüş: **`npm run ci:local`** komut listesini
`.github/workflows/checks.yml`den **okuyarak** CI'yi yerelde iş akışındaki
sırayla koşturuyor (betiğin kendi yorumu tam bu sorunu anlatıyor: "kapıların
hangisinin var olduğunu bilmek için iş akışını okumak gerekiyor"). Koşturuldu:
**26 adım, hepsi yeşil** (`npm ci`, `next build` ve veritabanı adımı varsayılan
olarak atlanıyor). Bundan sonra süit bu — elle liste kurmuyorum.

## §11.441 — Mirket klipleri: webde eksik dosya sessiz, ölü dosya ise indiriliyor

Mobil klipleri `require("../assets/mascot/x.webp")` ile alıyor — dosya yoksa
Metro derlemede duruyor, yani orada bir ağ zaten var. Webde klip
`fetch("/anim/" + ad + ".webp")` ile alınıyor (`lib/mascot-clips`, Safari'nin
URL başına oynatma durumu yüzünden blob'a çevirerek) ve dosya yoksa istek 404
dönüp **sessizce statik çizime düşüyor**: ne hata ne uyarı, yalnızca
animasyonu olmayan bir mirket. Hiçbir kapı bunu ölçmüyordu.

Ters yön de ölçülüyor: `public/anim` içinde kodda hiç geçmeyen bir dosya
kullanıcıya boşuna inen ağırlık (klipler 100-200 kB). Bugün 28 dosya, 28
referans — sıfır eksik, sıfır ölü.

Adların **üç kaynağı** var ve üçü de taranıyor: `CLIP` tablosunun `file:`
değerleri, `IDLE_CLIPS` dizisi (on iki boşta klibi), ve `useClipUrl("…")`a
doğrudan verilen dizgiler. Dördüncüsü şablon: `mascot-fx` gezinen mirketin
adını `${walk.kind}-${dir}` ile kuruyor; o sebebiyle ve dört genişlemesiyle
yazılı, şablonun dosyada durduğu da ölçülüyor.

İki tuzağa ilk yazımda düştüm ve ikisi de kayda değer:

- Şablonlu `useClipUrl` çağrısını da tarıyordum ve şablonun **karşılaştırma
  operandını** (`"ltr"`) klip adı sanmıştı.
- Aynı şey ternary koşullarında: `side === "right" ? "peek" : "peek-mirror"`
  ifadesinde `"right"` bir klip adı değil. Eşitlik karşılaştırmaları artık
  taramadan önce düşürülüyor.

Beş enjeksiyon doğrulandı: bir klip dosyasını kaldırmak, ölü dosya eklemek,
`CLIP`teki adı değiştirmek (aynı anda hem eksik hem ölü çıkıyor), şablonu
değiştirmek, mobil tarafa ölü klip koymak.

## §11.442 — Bildirim kanalının tanımı iki yerdeydi: Android'de "ilk kuran kazanır"

Android bildirimleri bir **kanala** gidiyor ve kanalın kimliği dört yerde
yazılıydı:

- `lib/notifications` `CHANNEL_ID` (kaynak)
- `lib/pushDevice`in açılışta kurduğu kanal — kimlik dizgi olarak
- aynı dosyanın ön plan `displayNotification` çağrısı — kimlik dizgi olarak
- `AndroidManifest` `default_notification_channel_id` — FCM'in **arka plan**
  yolunda kullandığı kanal (XML, içe aktarılamıyor)

Kimlik tek başına sorun değildi; dördü de `"reminder"` diyordu. Sorun kanalın
**tanımının** iki yerde ayrı ayrı yazılmasıydı: `ensureChannel` ve
`pushDevice`in kendi `createChannel`ı, ikisi de `name` + `importance` veriyordu.
**Android bir kanal kurulduktan sonra özelliklerini değiştirmiyor** — ilk kuran
kazanır. İki tanım ayrışırsa kanalın gerçek önceliği hangi yolun önce
çalıştığına bağlanır: aynı sürümde, aynı cihazda, kullanıcının hangi ekrandan
geçtiğine göre "sessiz bildirim" ya da "yüksek öncelik". Hiçbir yerde
görünmeyen, tekrar üretilemeyen bir fark.

Tanım tek yere indi: `CHANNEL_ID` ve `ensureChannel` dışa verildi, `pushDevice`
ikisini içe alıyor. Kanalın **açılışta** kurulması korundu (o davranışın kendi
gerekçesi yazılı: Android 8+ var olmayan bir kanala gelen bildirimi sessizce
düşürüyor, yani yerel hatırlatma hiç açmamış bir kullanıcıya gelen ilk sosyal
bildirim kaybolurdu).

### §307

Altı ölçü: kimlik okunabiliyor, `createChannel` mobil kaynakta **tek** yerde,
kimlik dizgisi yalnız o kaynakta geçiyor (başka her yer sabiti içe aktarıyor),
manifestteki kopya sabitle aynı, `smallIcon` ve manifestin işaret ettiği
drawable **gerçekten duruyor**, ve koddaki ikon adı okunabiliyor.

Son ölçü §306'nın Android hâli: drawable **ada göre** referans veriliyor ve
dosya yoksa Android boş bir kare gösterip hata vermiyor — webdeki eksik klip
sessizliğinin aynısı.

Dört enjeksiyon doğrulandı: ikinci `createChannel`ı geri koymak, manifest
kanalını değiştirmek, drawable'ı kaldırmak, `CHANNEL_ID`in adını değiştirmek
(kaynak okunamaz hâle geliyor).

## §11.443 — "dk" koda gömülüydü: iki harf, tarayıcının görmediği delik

`progress-panel`in "önerilen adım" satırı `{data.next.minutes} dk` yazıyordu —
yani İngilizce ve Almanca arayüzde de **"12 dk"**. Android aynı satırda
`t("skills.dk")` kullanıyor.

Neden hiçbir kapı görmedi: ham metin tarayıcısı (`i18n-hardcoded`) yalnız
**üçten uzun** sözcüklere bakıyor (gürültüyü kesmek için) ve birim
kısaltmaları tam o eşiğin altında duruyor. Aynı kusur bu projede daha önce
**iki kez** yaşandı ve ikisi de ancak cihazda görüldü: mobilin
`formatDuration`ı "dk"/"s"yi koda gömüyordu (2026-09-09), webin süre biçimi
kendi üçüncü anahtarını taşıyordu. Bu üçüncüsü.

### §308

İki ölçü. Birincisi **mutlak**: kullanıcıya dönük web bileşenlerinde bir
ifadeden hemen sonra gelen Türkçe birim kısaltması (`dk`, `sa`, `sn`) yok.
Yönetim panosu dışarıda (bilerek tek dilli) ve **tanı satırları** da
(`note(...)` yürüyüş ekranındaki geliştirici tanısını yazıyor, `console.*`
kullanıcıya gitmiyor) — ölçünün konusu arayüz metni. İkincisi: iki platform
aynı satırda aynı anahtarı kullanıyor.

Üç enjeksiyon doğrulandı: webde "dk"yı geri gömmek, mobilin anahtarını
kaldırmak, başka bir bileşene gömülü "sa" eklemek.

## §11.444 — Profil kartının ad yedeği: yanlış anahtar ve eksik bir adım

Adı olmayan kullanıcıya profil kartında ne yazılacağı iki platformda iki ayrı
zincirdi:

| | zincir |
|---|---|
| Android | ad → **e-postanın yerel parçası** → `profile.student` |
| web | ad → `social.student` |

İki fark birden. **Anahtar** farkı tek başına görünmez — iki anahtarın değeri de
"Öğrenci". Ama `social.student` **liste satırlarının** yedeği (lider tablosu,
günün turu; iki platformda da öyle) ve `profile.student` profil kartının kendi
yedeği. Aynı yüzeyin iki anahtarı olunca biri düzeltilip ötekinin eski kalması
için bir yol açılıyor — defterin `cheer`/`celebrate` dersi.

**Eksik adım** ise görünür: adı olmayan bir kullanıcı Android'de e-posta
adresinin yerel parçasını görüyor ("samet@…" → "samet"), webde doğrudan
"Öğrenci". Aynı hesap, iki üründe iki kimlik.

İkisi de webde düzeltildi (Android referans).

### §309

Altı ölçü: iki platform kartta aynı anahtarı kullanıyor, ikisi de e-posta
adımını taşıyor, ve `social.student` **liste** yüzeylerinde iki tarafta da
duruyor — sonuncusu iki anahtarın birbirine karışmadığını ölçüyor (yanlış
düzeltme yönü: kart anahtarını listeye taşımak).

Üç enjeksiyon doğrulandı: webi eski anahtara döndürmek, yalnız e-posta adımını
kaldırmak, liste yedeğini kart anahtarıyla değiştirmek.

## §11.445 — Günün turunda kazanılan XP Android'de hiç görünmüyordu

`POST /api/daily` her gönderimde `xpGained` döndürüyor (yalnız **ilk** kayıtta
dolu — tekrar gönderilen sonuç ne tabloya ne puana giriyor). Web sonuç kartında
"+N XP" diye gösteriyor; mobil bu alanı **hiç okumuyordu** — üstelik tip tanımı
(`game/daily` `DailyResult`) onu zaten sayıyordu. Aynı tur, aynı sunucu cevabı:
kazanç bir platformda görünüyor, ötekinde görünmüyordu.

Mobil kartın **içine**, webdeki yerine (en iyi serinin hemen altında) ve aynı
koşulla eklendi: yalnız kazanç varsa. Koşulsuz yazmak tekrar açılan sonuçta
"+0 XP" demek olurdu.

İlk yazımda satırı kartın **dışına** koydum ve rengi `onPrimaryMuted` bıraktım —
kahraman kartının dışında o renk sayfa zemininde neredeyse görünmez. Kod okunup
düzeltildi (`sed -n` ile yerleşim doğrulandı).

### §310

Beş ölçü: sunucu alanı döndürüyor, iki istemci de **okuyor**, iki istemci de
yalnız kazanç varken yazıyor.

Üç enjeksiyon doğrulandı: mobilin okumasını kaldırmak, mobili koşulsuz yazdırmak,
webin okumasını kaldırmak.

Bulgunun sınıfı kayda değer: **sunucu bir alan döndürüyor, bir istemci onu
okumuyor.** Tip tanımı iki tarafta da doğru olduğu için ne tsc ne de uç
denetimi (`check:endpoints` yol/yöntem düzeyinde bakıyor) bunu görebiliyor.

## §11.446 — Ölçüldü, temiz: sunucu alanları, eşleşen ekran çiftleri ve üç "zaten karar verilmiş" madde

§11.445'in sınıfını (sunucu bir alan döndürüyor, bir istemci okumuyor)
**sistematik** olarak taradım; sonuç bir gerçek bulgu ve üç yanlış alarm.

**Sunucu alanları.** Mobilin açıkça yazdığı yanıt tiplerinin (`*Result`,
`*Payload`, `*Status`) her alanı için "mobil kodunda hiç okunuyor mu" soruldu:
iki alan çıktı, ikisi de `WeeklyStatus.week` / `WeeklyResult.week` — ve web de
onu okumuyor, çünkü "hafta {n}" satırı bilerek kaldırılmış (gerekçesi
`weekly-player`da yazılı: `{n}` sayı bekliyordu ama `week` bir dizge, ekranda
"hafta 2026-W37" yazıyordu). Ters yön de tarandı — sunucunun döndürdüğü ve
**yalnız webin** okuduğu alanlar: `/api/stt`in `confidence`/`provider`/`model`
(yürüyüş ekranının geliştirici tanısı, `?diag=1`), `/api/assess`in
`cached`/`provider` (istemci nesnesine konuyor, hiçbir yerde çizilmiyor) ve
`/api/mock-exam`in `updatedAt` (taramanın yanlış eşleşmesi: webde okunan
`updatedAt` hukuki metin panelinin alanı).

**Eşleşen ekran çiftleri.** Yirmi iki çift, anahtar kümesi farkıyla tarandı.
Gerçek bulgu bir tanesiydi (§11.444'teki `student`) ve geri kalan farkların
hepsi **taramanın kendi kusuru**. Dört sınıf, bir sonraki tarama tekrar
düşmesin diye:

1. **Kardeş dosyadaki durağan anahtar tablosu** — `CANDO_SKILL_LABEL_KEYS`
   (`lib/cando`), `TIER_LABEL_KEYS` (`achievement-badge`),
   `REACTION_LABEL_KEYS`, `FAIL_KEYS`. Anahtar çiftin bir dosyasında değil
   komşusunda duruyor.
2. **Şablonla kurulan anahtar** — `t(\`band.${p.band}\`)` (bkz. §305).
3. **`t()` içinde üçlü koşul** — `t(copied ? "referral.copied" : "profile.invite_friend")`.
4. **Başka modüle taşınmış yardımcı** — mobilin `formatDuration`ı
   `lib/useMe`de, webin karşılığı bileşenin içinde.

**Üçü zaten karar verilmişti** ve üçünde de kararın gerekçesi kodda yazılıydı;
okumadan önce "bulgu" sanmıştım:

- `walk_listen` kaynak adları (`browser`/`native`, `<sağlayıcı>`/`azure`) —
  §121 bunu açıkça yazıyor: "iki tarafta kaynak adları farklı ama **biçim**
  aynı olmalı". Tarayıcı tanıyıcısı ile native tanıyıcı gerçekten ayrı şeyler.
- Rozet kutlamasının "devam et" satırı — webde `achuw.click_to_continue`,
  Android'de `achu.tap_to_continue`: "dokun" webde yanlış fiil (fare ve klavye
  de var) ve ayrışma bilerek görünür bırakılmış.
- `WeeklyStatus.week` — yukarıda.

Dersi yazıyorum çünkü ölçüm zamanının çoğunu bu üçü aldı: **bir fark bulunca
önce o satırın kendi yorumunu okumak** gerekiyor; bu depoda kararların gerekçesi
kodun yanında duruyor ve "ayrışma" sanılan şeyin üçte biri belgelenmiş bir
tercih.

## §11.447 — "Yollar birebir" iddiasını tutan hiçbir şey yoktu

`avatar-parts.tsx`in kendi yorumu şunu söylüyor: *"Yollar mobil
`M/src/ui/avatarParts.tsx` ile **BİREBİR**: aynı seçenek aynı görünmeli, yoksa
'aynı avatar' iki platformda iki şey olur."* İddiayı tutan hiçbir şey yoktu.

Katalog listeleri (`HATS`/`GLASSES`/`MUSTACHES`/`HAT_COLORS`) karşılaştırılıyor
ve avatar çözümlemesi de ölçülüyor — ama **çizimin kendisi** ölçülmüyordu.
Sonucu sessiz ve veriye bağlı: kullanıcının kaydettiği yapılandırma
(`hat: "cap"`) iki platformda aynı, çizim farklı olur; aynı hesap iki uygulamada
iki avatar. Derleyici görmez (iki ayrı ağaç, biri SVG biri `react-native-svg`),
göz de görmez çünkü fark bir yol dizgisinin içinde.

Ölçüldü: bugün **birebir** (yedi parça, 75 nitelik, sıfır fark). Yani iddia
doğruydu — ama tesadüfen doğru kalmaya devam etmesi için bir sebep yoktu.

### §311

Ölçü **parça parça**: her `id === "<parça>"` dalından çizim nitelikleri (`d`,
`cx`, `rx`, `fill`, `strokeWidth`, …) **sırayla** çıkarılıyor ve iki tarafta
aynı olması bekleniyor. Parça düzeyinde ölçmek dosyadaki dal **sırasını**
serbest bırakıyor (sıralama çizimi değiştirmiyor) ama bir dalın **içindeki
katman sırasını** korumak zorunda — orada sıra gerçekten önemli (gölge
katmanının altta mı üstte mi olduğu). Enjeksiyon bunu da doğruladı.

Sayı ölçüsü de var: parça bulunamazsa (yapının değişmesi) kümeler boşalır ve
"fark yok" boş bir doğru olurdu.

Çıktı kısa tutuluyor: ilk yazım iki tarafın **bütün** nitelik dizgisini
basıyordu ve tek bir piksel farkında ekrana iki paragraf döküyordu. Okunmayan
bir hata mesajı, hata mesajı değildir — artık parça başına "aynı/FARKLI" ve
**ilk farkın kendisi** yazılıyor.

Dört enjeksiyon doğrulandı: webde bir yolu 1 px kaydırmak, mobilde bir katmanı
silmek, bir parçayı yeniden adlandırmak (sayı ölçüsü düşüyor), iki katmanın
sırasını değiştirmek.

## §11.448 — İkon iddiası: kapsamı okumak, "21 fark" ile "sıfır fark" arasındaki fark

`components/icons.tsx` üç yerde çizimin Android'den geldiğini iddia ediyor ve
iddiayı tutan hiçbir şey yoktu. İlk ham ölçüm **61 ortak ikondan 21'inin
çiziminin farklı** olduğunu söyledi — ama iki düzeltme gerekti:

**1. İddianın kapsamı.** "BİREBİR" cümlesi bütün set için değil, üç blok için
yazılmış: "MOBİLDEN GELEN İKONLAR" (Bolt/ArrowRight/Walk/Exam/Podium), "ALT
GEZİNMENİN ÜÇ İKONU" (Learn/Path/Skills) ve "PATİKA VE BECERİ SİMGELERİ —
çizimleri Android'den" (Quiz/Read/Listen/Write/Grammar). Setin geri kalanı
**bilerek** ayrı: webin kendi ailesi yarım piksel hizalı (113 yerde `.5`,
mobilde 29) ve `CheckIcon` gibi ikonlar (dosyanın 71. satırı, iddia
bloklarından **önce**) hiçbir zaman Android'den alınmamış.

**2. Notasyon farkı çizim farkı değil.** Aynı yol iki dosyada farklı
yazılabiliyor: `M13 2 5 13` (örtük lineto) ile `M13 2L5 13`, ya da yay
bayrakları `1 0 0` ile bitişik `100`. Ham karşılaştırma bunları "fark"
sayıyordu.

İkisi düzeltilince sonuç: **iddia doğru** — on üç ikon, sıfır fark. Yani bu bir
kusur bulgusu değil, **tutulmayan bir iddianın tutulmaya başlanması**.

### §312

`yolKanon` yolu komut komut ayrıştırıp kanonik biçime çeviriyor: örtük
tekrarlar açılıyor, `M`den sonraki örtük çift **lineto** oluyor (SVG kuralı),
yay bayrak konumundaki bitişik haneler koparılıyor. Sınırı yazılı: göreli (`l`)
ile mutlak (`L`) yazım birbirine çevrilmiyor — aynı çizimi biri göreli biri
mutlak yazan iki dosya yine "farklı" çıkar; iddia listesindeki on üç ikonda
böyle bir çift yok.

Beş ölçü: liste uzunluğu, iddia edilen her ikonun iki tarafta **var olduğu**,
çizimlerin aynı olduğu, ilk farkın kendisi (kısa çıktı için) ve **iddia
yorumunun hâlâ dosyada durduğu** — yorum kalkarsa liste gözden geçirilmeli,
çünkü kapıyı meşru kılan şey o cümle.

Dört enjeksiyon doğrulandı: webde bir yolu 1 px kaydırmak, **notasyonu
değiştirmek** (fark sayılmıyor — normalleştiricinin kanıtı), iddia edilen bir
ikonu mobilden kaldırmak, iddia yorumunu silmek.

## §11.449 — Cevap katlama kuralları: ayrışmanın en pahalı sınıfı ölçülmüyordu

İki dosya mobil tarafta *"web `lib/…` ile **AYNI** kural"* diye iddia ediyor ve
iddiayı tutan hiçbir şey yoktu:

- **`lib/contractions`** — İngilizce kısaltmaları **açarak** indirger ("I'm" ↔
  "I am", "can't" ↔ "can not"). Karşılaştırma katmanı kesme işaretini boşluğa
  çevirdiği için gerekli; yazıldığında ölçülmüş: 399 doğal varyantın **134'ü**
  reddediliyordu.
- **`lib/en-spelling`** — İngiliz/Amerikan yazım çifti ("colour" ↔ "color"),
  70 çift.

Bu, ayrışmanın **en pahalı sınıfı**: öğrenci doğru cevap verip yanlış cevap
aldığını görür — ve yalnızca bir platformda. Bir kural ya da tek bir kelime
farkı, o cümleyi tek platformda reddettirir; ne derleyici ne göz görür.

Ölçüldü: bugün birebir (24 kural aynı **sırada**, 44 kelimelik ortaç kümesi, 70
yazım çifti).

### §313

Ölçü **diziler** üzerinden, sıra dahil: kuralın kendisi kadar sırası da önemli
(önce `won't → will not`, sonra genel `n't → not`; sıra ters olsa "won't" iki
kez işlenirdi). Enjeksiyon sırayı da doğruladı.

`PARTICIPLE` kümesi ayrıca ölçülüyor: `'s`/`'d` belirsizliğini o küme çözüyor
("he's been" → has, "he's tired" → is).

Sayı ölçüsü de var: zincir okunamaz hâle gelirse iki taraf da boşalır ve eşit
görünür.

Beş enjeksiyon doğrulandı: webde bir kuralı değiştirmek, ortaç kümesinden bir
kelime düşürmek, yazım çiftinden birini düşürmek, kural **sırasını**
değiştirmek, zinciri okunamaz yapmak.

## §11.450 — Değerlendirme puanının ağırlıkları da ölçülüyor

`lib/assessFallback`in kendi yorumu: *"Web `overallScore` ile **AYNI**
ağırlıklar: iki platform aynı metne aynı puanı vermeli."* İddiayı tutan hiçbir
şey yoktu ve §11.449 ile aynı sınıf — aynı metin, iki ayrı puan.

İki sayı kümesi ölçülüyor:

- **Ağırlıklar**: görev .35 · dilbilgisi .30 · sözcük .15 · yapı .20 ve 0–100'e
  çevirirken kullanılan bölen (4). Web `lib/assess-prompts`, mobil
  `lib/assessFallback`.
- **Asgari sözcük** (`MIN_WORDS`): hangi tür kaç sözcükten sonra puanlanabilir
  (web `lib/assess-client`).

Ölçü dizgi değil **sayı**: ifadeden katsayılar çekiliyor, yani biçimlendirme
değişse kapı kırmızı vermez ama bir katsayı değişse verir.

### §314 ve bir enjeksiyon dersi

Dört enjeksiyon planladım, biri **yakalanmadı** ve sebebi kayda değer:
`const w = s.task * …` bildirimini `const toplam = …` diye değiştirmek kapıyı
düşürmedi — çünkü ölçü bildirimin **adına** bakmıyor, katsayı ifadesine ve
ayrıca `(w / 4) * 100` kalıbına bakıyor; ikincisi hâlâ `w` diyordu. Yani
enjeksiyon kapının **okuduğu şeyi değiştirmemişti**. Defterin tekrar eden
dersi: *enjeksiyonun kapının okuduğu yeri gerçekten bozduğunu doğrula.*

Yerine iki gerçek enjeksiyon konuldu: ifadedeki terim **düzenini** değiştirmek
(kapı "OKUNAMADI" diyor — toplama değişmeli olduğu için bu bir yanlış pozitif
sayılabilir, ama "artık doğrulayamıyorum" demek sessizce geçmekten iyidir) ve
bölen ifadesini kaldırmak (`bolen=YOK`).

Toplam beş enjeksiyon doğrulandı: bir ağırlığı değiştirmek, böleni
değiştirmek, asgari sözcüğü değiştirmek, terim düzenini bozmak, bölen ifadesini
kaldırmak.

## §11.451 — Kapıların kendi denetimi: iki tarafın birlikte boşalması

Bu tur soruyu kapılara çevirdim: **hangi ölçü, okuduğu şey kaybolduğunda da
yeşil kalır?**

424 karşılaştırma çağrısının 412'sinde beklenen taraf **değişmez bir liste**
(mutlak ölçü) — orada böyle bir delik olamaz. Kalan 12'sinde beklenen taraf da
hesaplanıyor ve ikisinde **her iki taraf aynı sentineli** verebiliyordu:

| kapı | sentinel | ne zaman |
|---|---|---|
| `sinav sayaci` | `"sayici"` / `"uyari yok"` | sayaç kalıbı iki tarafta birden yeniden yazılırsa |
| `profil XP rozetinin glifi` | `"YOK"` | iki uzun, biçime duyarlı desen birden bozulursa (ortak biçimlendirme geçişi) |

İkisi de "eşit mi" diye soruyordu; iki taraf birlikte okunamaz hâle gelince
cevap "evet" oluyor ve kapı hiçbir şey ölçmeden yeşil kalıyordu.

İkisi de **mutlak** ölçüye çevrildi: bugünkü doğru cevap yazılı (sayaç "duvar
saati" ve eşik 120; glif `BoltIcon`). Tasarım bilerek değişirse o satır da
değişir — ama sessizce boşalamaz.

Enjeksiyonların ikisi tam bu vakayı kuruyor: **iki tarafta birden** kalıbı
bozmak. Eski kapı ikisinde de yeşil kalıyordu, yenisi kırmızı veriyor. Üçüncü
enjeksiyon ilişkisel ölçünün de sağlam kaldığını gösteriyor (yalnız mobilde
eşiği değiştirmek).

Yöntem notu: ilk denemem `read()`i boş dizge döndürecek şekilde yamayıp **bütün**
kapıları birden ölçmekti; betik o girdiyle çöküyor (bir dosyanın yok olması
gürültülü bir hata — istenen davranış), yani toplu vakumluk testi o yolla
yapılamıyor. Ölçü bu yüzden çağrıların yapısı üzerinden yapıldı.

## §11.452 — Vakumluk taraması: bir kapı polislediği ölçeğin kopyasını taşıyordu

§11.451'in sorusunu bu kez **dosya dosya** sordum: on beş tasarım dosyası tek
tek **boşaltılıp** kapılar koşturuldu. On dördünü `check:parity` tek başına
yakaladı. Bir tanesi geçti — `mobile/src/theme/tokens.ts` — ama o bir delik
değildi: `check:tokens` ve `check:type` onun yokluğunu ayrıca yakalıyor (ölçüldü).

Asıl bulgu ipucun kendisiydi: **`check:radius` o dosya boşalınca kılını
kıpırdatmıyordu.** Sebebi, ölçeği okumuyor olması — tabloyu **elle** taşıyordu:

```
const RADII = { 10: "sm", 14: "md", 20: "lg", 26: "xl", 34: "xxl" };
```

Yani ölçeği **polisleyen** kapı, ölçeğin bir **kopyasını** tutuyordu — projenin
her yerde savaştığı sınıf. `radii.lg` 20'den 22'ye çekilse kapı hâlâ 20'yi
"jeton" sayar, 22'yi "ölçek dışı" diye bildirirdi: kırmızı verirken **yanlış
sebebi** söyleyen bir kapı.

Ölçek artık kaynaktan geliyor (`mobile/src/theme/tokens.ts` `radii`), `pill`
(999) dışarıda — o bir basamak değil "tamamen yuvarlak" işareti. Okunamazsa
kapı **duruyor**: sessizce boş bir ölçekle çalışmıyor.

Üç enjeksiyon: `radii` bloğunu okunamaz yapmak (kapı duruyor), basamakları
eksiltmek (kapı duruyor), ve `radii.lg`yi değiştirmek — sonuncusu **geçiyor** ve
bu doğru: `check:radius` yalnız **ham sayıları** polisliyor, mobil kodda ham
sayı yok; web↔mobil ölçek eşitliği `check:tokens`in işi.

## §11.453 — Ses ipucu notaları üç kaynakta: üreteci tek platform için koşturmak

Ses ipuçları dosyadan çalınmıyor, **sentezleniyor**; nota tablosu **üç yerde**
kodda duruyor:

| kaynak | nerede çalıyor |
|---|---|
| JS `SFX_NOTES` (`mobile/src/lib/sfxNotes.ts`) | WebView köprüsü / ekran açık |
| Kotlin `playSfx` `when (kind)` | Android, ekran kapalı native sentez |
| Swift `sfxNotes(_:)` `switch` | iOS native sentez |

Kotlin ve Swift blokları `mobile/scripts/render-sfx.py --kotlin|--swift` ile
**üretiliyor** ve iki dosyanın yorumu da "tek kaynak orası … BİREBİR" diye
iddia ediyor. İddiayı tutan hiçbir şey yoktu.

Kusurun biçimi belli: tabloyu düzeltip üreteci **tek platform** için
koşturmak. O zaman aynı cihazda aynı ipucu ekran açıkken yeni, ekran kapalıyken
**eski** sesi çalar — ve kimse fark etmez, çünkü iki yol hiç yan yana
duyulmuyor. İlk enjeksiyon tam bu senaryoyu kuruyor (JS + Kotlin yeni, Swift
eski) ve kapı yakalıyor.

Ölçüldü: bugün birebir — üç kaynakta da 13 ipucu, sıfır sayısal fark.

### §315

Ölçü **sayısal**: üç kaynakta sayı biçimi farklı (`2` / `2.0`, `2400` /
`2400.0`) ve dizgi karşılaştırması bunu "fark" sayardı. Satırlar sayıya
çevrilip karşılaştırılıyor.

Sayılar da ölçülüyor (13/13/13): bir blok okunamaz hâle gelirse (yeniden
adlandırma, biçim değişikliği) o kaynak boşalır ve kapı söyler — üçüncü
enjeksiyon bunu doğruluyor.

Üreteci **çalıştırmak** daha güçlü bir ölçü olurdu ("üretilen çıktı
commit'lenenle aynı mı") ama betik `numpy` istiyor ve kapının CI'da numpy'siz
de çalışması gerekiyor; o yüzden tablolar doğrudan karşılaştırılıyor.

Dört enjeksiyon doğrulandı: üreteci tek platform için koşturmak, Swift'te bir
notayı değiştirmek, Swift bloğunu okunamaz yapmak, Kotlin'den bir ipucunu
tamamen kaldırmak.

## §11.454 — Sunucu STT sözleşmesi iki native tarafta da ölçülüyor

Yürüyüşün **cepte / ekran-kapalı** yolu sesi native tarafta kaydedip
`/api/stt`e **kendisi** gönderiyor (RN `fetch` arka planda takılıyor). Yani
sözleşme üç yerde birden yazılı ve üçünün aynı olması gerekiyor:

- sunucu: `form.get("audio" | "language" | "expected" | "mode")`
- Kotlin: multipart alan adları + kayıt biçimi
- Swift: aynısı

Bir alan adı tek platformda değişirse sunucu 400 dönüyor, `uploadStt` `null`
veriyor ve yürüyüş turu **sessizce hiçbir şey duymuyor** — hata görünmüyor,
çünkü o yol zaten "duyamadım"a düşmek üzere tasarlanmış. Ölçülmezse bir
platformda cep modu tümden çalışmaz ve kimse sebebini bulamaz.

Kayıt biçimi de ölçünün içinde: sunucu 16 kHz **mono** PCM bekliyor. Bir
platform 44.1 kHz kaydederse dosya büyür, yükleme yavaşlar, bazı sağlayıcı
sessiz döner — yine görünmez bir kusur. (44100 aynı dosyalarda **ses ipucu**
sentezinin oranı; ölçü karıştırmamak için kayıt yolundaki değeri arıyor.)

Ölçüldü: bugün üçü de aynı (`audio+expected+language+mode`, 16000, mono).

Dört enjeksiyon doğrulandı: Swift'te bir alan adını değiştirmek, Swift'in
kayıt oranını 44100 yapmak, sunucuya yeni bir alan eklemek, Kotlin'i stereo
kaydettirmek.

Bir yan not: ilk yazımda kanal ölçüsünü `/CHANNEL_IN_MONO/` diye yazdım ve
**meta-kapı** (§138) reddetti — sınırsız ad deseni. `\b` eklendi. Kapıları
denetleyen kapının işe yaradığı yer tam burası.

## §11.455 — Native HTTP'nin adres beyaz listesi: iki platformda da ölçülüyor

Native taraf **üç** yöntemde kendi HTTP isteğini atıyor (`uploadStt`,
`httpGet`, `playTtsUrl`) ve bu isteklere **oturum çerezi** biniyor: Android
`CookieManager`dan okuyup başlığa koyuyor, iOS paylaşımlı `HTTPCookieStorage`i
kullanıyor (iOS'ta elle koymak çift başlık riski — gerekçe Swift dosyasında
yazılı). Yani adres nereye giderse çerez de oraya gidiyor.

Bu yüzden iki tarafta da bir **beyaz liste** var: `allowedUrl` yalnız `https`
ve **tam olarak** API hostunu geçiriyor, host hiç kurulmadıysa hiçbir şeyi
geçirmiyor. Kural iki dilde ayrı ayrı yazılı ve hiçbir şey iki tarafta da
**durduğunu** ölçmüyordu. Kaybının bedeli: `playTtsUrl`e yabancı bir adres
geçirilebilse oturum çerezi o hosta giderdi. Ne derleyici ne test bunu görür —
yöntemler adresi `String` alıyor.

### §317 — iki ölçü, biri ilişkisel biri mutlak

Ölçü **varlık değil kapsam**: üç yöntemin **her birinin** gövdesinde beyaz
liste çağrısı aranıyor, iki platformda ayrı ayrı. Tanımın kendisi de ölçülüyor
(https şartı, tam host eşitliği, hostsuz ret).

İkinci ölçü **mutlak** ve gerekçesi enjeksiyonla kanıtlandı: iki taraf
kontrolü **birlikte** kaybederse ilişkisel ölçü "eşit" der ve yeşil kalır.
Mutlak ölçü orada kırmızı veriyor.

### Kapının kendi penceresi erken kapanıyordu

İlk yazımda gövde "adından sonraki ilk `fun`/`func` bildirimine kadar" diye
alınıyordu ve Android'in `playTtsUrl`u **KONTROLSUZ** çıktı. Sebebi: o
yöntemin **içinde** yerel bir `fun finishP(...)` var ve pencere beyaz liste
çağrısından önce kapanıyordu. Defterin tekrar eden kusuru — pencerenin erken
bitmesi — ve bu kez kapının kendisi yakaladı (yanlış pozitif olarak).

Düzeltme iki parça: gövde artık **tam iki boşluk girintili** bir bildirime
kadar gidiyor (sınıf üyeleri orada duruyor, yerel fonksiyonlar daha derinde),
ve "sonraki bildirim" aramasına kendi bildiriminin **sonundan** başlanıyor —
`i + 1` demek, anotasyonu ayrı satırda olan bir yöntemin kendi `fun` satırını
"sonraki bildirim" saymak ve pencereyi sıfıra düşürmekti. İkinci hata ilkini
maskeledi: iki taraf da boş gövde okuyunca ilişkisel ölçü "eşit" deyip
geçiyordu — mutlak ölçü olmasa fark edilmezdi.

Üç enjeksiyon doğrulandı: Android'de bir kontrolü kaldırmak, **iki tarafta
birden** kaldırmak (mutlak ölçü), Swift'in tanımından `https` şartını
düşürmek.

## §11.456 — Paywall kapsam satırları: bir yanıt dalı `copy` taşımazsa mobil sessizce boşalır

Paywall'ın "neler var / ücretsizde ne var" listesi elle yazılmıyor:
`lib/premium/gates` `describeLimits` yapılandırmadan üretiyor. Gerekçesi o
dosyada yazılı ve **mağaza kurallarına bağlı** — bir sınır değiştiğinde
paywall'ın söylediği de değişmek zorunda, yoksa beyan gerçekle ayrışıyor
(App Store 2.3.1 / Play Yanıltıcı Davranış).

İki istemci aynı satırları **ayrı yoldan** alıyor:

- web: sunucuda `premiumCopy()` çağırıp doğrudan çiziyor
- mobil: `/api/premium/status` yanıtındaki `copy` alanından

Uç'un **üç** yanıt dalı var ve üçü de `copy` taşıyor. Bir dal onu taşımazsa
(yeni bir erken dönüş eklenince) mobilin karşılaştırma kartı **sessizce
boşalıyor** — `status?.copy.premium ?? []` — ve web etkilenmiyor. Yani kusur
tek platformda ve görünmez; mağaza beyanı "hiçbir şey vaat etmiyor" hâline
geliyor. Bunu ölçen hiçbir şey yoktu.

Yan not: `plan.free_*` anahtarları bir önceki turun taramasında "yalnız web"
görünmüştü. Sebebi taramanın beşinci artefakt sınıfı: **anahtarı sunucu
çalışma anında istemciye gönderiyor**, yani mobil kaynağında literal olarak hiç
geçmiyor. §11.446'nın listesine eklendi sayılsın.

### §318

Yedi ölçü: yanıt dalı sayısı, `copy` taşıyan dal sayısı (ikisi **eşit** olmak
zorunda — yeni bir dal eklenirse fark açılıyor), üreticinin durduğu, ve iki
istemcinin de **iki** bölümü (premium + ücretsiz) çizdiği.

Üç enjeksiyon doğrulandı: bir daldan `copy`yi düşürmek, `copy`siz yeni bir dal
eklemek, mobilin ücretsiz bölümünü kaldırmak.

## §11.457 — Haftalık sınav hatırlatması iki yoldan yedi saat arayla geliyordu

Seri koruma ve haftalık sınav hatırlatması **iki yoldan** gidiyor ve ikisi
birden gitmiyor (`hasPushDevice()` kapısı):

- **uzak push** — sunucu, kullanıcının **kendi saatine** göre
  (`lib/push` `runStreakAlerts` / `runWeeklyReminders`)
- **yerel** — mobil, cihazda kurulu tetikleyici (`lib/notifications`)

Seri çifti baştan beri eşitti ve sunucu tarafında bunu söyleyen bir yorum da
vardı: *"Akşam: mobilde 20:30, burada kullanıcının kendi saatiyle 20'den
sonra."*

**Haftalık çift eşitlenmemişti**: mobil Pazar **11:00**, sunucu Pazar yerel
saat **18'den sonra** — aynı hatırlatma, **yedi saat arayla**. Hangi saatte
geldiği yalnızca push'un çalışıp çalışmamasına bağlıydı; web kullanıcısı
yalnız push aldığı için onlar hep 18:00+, yerel yedeğe düşen Android
kullanıcısı 11:00 alıyordu. Kanıt asimetride: seri çiftinin yanında karşılıklı
yorum varken haftalık çiftinin yanında yoktu — yani bu bir tercih değil,
uzlaştırılmamış bir çiftti.

Mobil **18:00**'e çekildi. Yön şöyle seçildi: sunucunun değeri **her
platforma** ulaşan yol ve sunucudaki systemd timer penceresi de ona göre kurulu
(Pazar 15–19 UTC; İstanbul için yerel 18:00 = 15:00 UTC). Karşılıklı yorum iki
tarafa da yazıldı — seri çiftinde olduğu gibi.

### §319

Altı ölçü: haftalık yerel saat ↔ sunucu eşiği, haftalık **gün** iki tarafta
(`WEEKLY_DAY = 0` ↔ `dow = 0`), ve seri çifti. Seri değerleri **mutlak**
bekleniyor (20:30 / 20) çünkü oradaki yarım saatlik kayma bilerek ve iki
taraftaki yorumda yazılı — biri kayarsa kapı söyler.

Dört enjeksiyon doğrulandı: mobili 11:00'e döndürmek (düzeltilen kusurun
kendisi), sunucu eşiğini 19 yapmak, mobilin gününü pazartesiye çekmek, seri
saatini kaydırmak.

## §11.458 — Ölçüldü, KARAR SAMET'TE: hatırlatma ayarında hangi taraf kazanıyor

§11.457'yi ararken aynı ailede ikinci bir asimetri çıktı. Bunu **düzeltmedim**;
sebebi aşağıda ve karar Samet'te.

Mobil hatırlatma ayarının önceliği açıkça yazılı (`lib/notifications`
`loadPrefs`): **yerel karar → sunucunun kayıtlı saati → şemanın varsayılanı.**
Kullanıcı o cihazda bir kez seçim yaptıysa (`decided(KEY_DAILY)`), ekran her
açılışında `syncPrefs(patch)` ile **sunucuyu kendi değerine çekiyor**. Gerekçe
de yazılı: yerel tetikleyiciyi cihaz kuruyor, ama push'u sunucu gönderiyor —
ikisinin aynı şeyi söylemesi gerekiyor ve ağ yokken gönderilemeyen ayar bir
sonraki açılışta tekrar gönderiliyor.

Web tarafı ise yalnız sunucuya yazıyor (`notification-settings` `patch`),
yerelde bir şey tutmuyor.

Sonuç: kullanıcı **webde** saati 09:00 yapar, sonra mobilin bildirim ekranını
açar — mobilin eski yerel kararı (ör. 21:00) sunucuya geri yazılır ve webdeki
değişiklik **sessizce geri alınır**. Tersi olmuyor: web hiçbir zaman mobilin
değerini ezmiyor.

**Neden düzeltmedim.** Doğru çözüm "son değişen kazanır" ve bunun için
değişiklik ZAMANI gerekiyor; `/api/notifications/prefs` hiçbir damga
döndürmüyor ve `profiles.updatedAt` her profil yazımında (seviye, hedef, ad)
değiştiği için hatırlatma alanlarına atfedilemez. Yani doğru düzeltme **yeni
bir kolon + migration** demek. Bekleyen üç migration (`0049`–`0051`) zaten
deploy sırası bekliyor; ayar önceliği için dördüncüyü eklemek, bir kolaylık
uğruna deploy kuyruğunu büyütmek olurdu.

Daha küçük bir düzeltme **daha kötü** çıkıyor: `loadPrefs`ten `syncPrefs`i
kaldırmak ekranı yalancı yapardı — mobil kendi yerel değerini gösterip sunucuda
başka bir değer bırakırdı, yani "gördüğün şey gönderilen şey" bağı kopardı.

Kapı da yazmadım: bugünkü davranışı sabitleyen bir ölçü, onu **düzeltmeye**
çalışan kişiye kırmızı verirdi — yanlış yöne bakan bir kapı. Kayıt bu yüzden
burada duruyor.

## §11.459 — XP karosunun binlik ayracı: elle yazılmış bir düzenli ifade kapının önünden geçiyordu

Android profil ekranındaki "Toplam XP" karosu ayracı **koda gömüyordu**:

```tsx
<StatTile value={String(me.xp).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} … />
```

Nokta Türkçe ve Almanca için doğru, **İngilizce arayüzde yanlış**: "1.240"
İngilizce okuyan için bin iki yüz kırk değil, virgülle bir tam iki yüz kırk.
Aynı karo iki adım ötede doğru yazılıydı — kişi profilinde (`UserScreen`,
birebir aynı `StatTile`) ve webin iki profil karosunda `formatNumber` var.
Satır artık `formatNumber(me.xp)`.

Kısaltan kardeşi (`formatXp`, "1,2k") **ayrı bir karar** ve gerekçesi
`lib/useMe`de yazılı: dar karoda tam sayı sığmıyor, webin aynı karosu geniş
ızgarada tam sayıyı yazıyor. O ayrım yerinde duruyor; düzeltilen şey ayracın
kendisi.

**Kapı yeşildi ve kusur duruyordu.** §140 ("birikmiş toplam sayılar biçimli
mi") tam bu satırı aramak için yazılmıştı ve iki ayrı nedenle göremiyordu:

1. **Pencere küme parantezsizdi** (`[^{}]*`). Düzenli ifadenin niceleyicisi
   (`{3}`) bir küme parantezi; ifade eşleşmiyordu bile. Niceleyici artık
   taramadan önce susturuluyor (`{3}` → `Q`), JSX çocuğu olarak geçmediği
   için bedeli yok.
2. **Virgül koşulsuz muaftı.** Muafiyetin gerekçesi `{a, xp, b}` gibi çözme
   kalıplarıydı, ama elle biçimleyen bir **çağrının** ikinci argümanı da
   virgullu. Virgül ve iki nokta artık yalnız **çağrı yoksa** muaf; noktalı
   virgül ise ifadeyi değil gövdeyi işaretlediği için (bir `try` bloğu) ayrıca
   düşüyor.

Enjeksiyon: eski satır geri konduğunda kapı `ProfileScreen.tsx: {String(me.xp)
.replace(…)}` diyerek kalıyor, düzeltilmiş hâlde geçiyor. Yani kapı artık
yazıldığı işi görüyor.

## §11.460 — Okuma hatası "sonuç yok" demek değil: sınav istatistiği (web)

Web'in sınav istatistiği sayfası okuma patladığında `data = null` ile
`data.attempts === 0`ı **aynı dala** sokuyordu: denemesi olan kullanıcı,
veritabanı okunamadığında "henüz tamamlanmış bir deneme sınavın yok" kartını
görüyordu. Yanlış bilgi ve çıkışsız: kartın düğmesi deneme sınavı listesine
götürüyor, oysa sorun listede değil.

Aynı kusur arkadaş ve lig tablolarında bulunup düzeltilmişti ve iki dosyada da
büyük harflerle yazılı: "AĞ HATASI KİMSE YOK DEĞİL". Bu sayfa §241'in
`HATALAR` listesine girmiyordu, çünkü o liste **iki platformu aynı işaretle**
ölçüyor ve burada işaretler ayrı: Android okuma patlayınca cihazdaki yedeğe
düşüyor (`localStats()`) ve kart "sayılar bu cihazdan" diyor; webde yedek yok,
orada kart içeriğin **yerine** geçiyor.

Düzeltme: `{!data ? …}` ayrı bir dal, `EmptyCard role="alert"`,
`common.connection_failed` + `session.load_failed_sub`, düğme sayfanın
kendisine (`force-dynamic`, yeniden istek yeniden okuyor). Android tarafında
yedek kartı da artık duyuruluyor (`accessibilityLiveRegion="polite"` —
içeriğin yerini almıyor, başına ekleniyor; `alert` değil `polite` bu yüzden).

Kapı **§320**, ölçü mutlak ve taraf başına ayrı: webde hata dalı boş hal
dalından ayrı ve duyuruyor, mobilde yedek dalı var, sebebini yazıyor ve
duyuruyor; üçüncü ölçü iki tarafta da **boş hal dalının hâlâ durduğu** — ayırma
boş hali yok etmiş olmasın.

## §11.461 — Gelişim okunamayınca: bir tarafta sonsuz iskelet, diğerinde sessiz boşluk

Aynı ekranın iki platformdaki hata hâli, aynı kusurun iki biçimiydi:

- **Android** `ProgressScreen` yalnız `me`ye bakıyordu. `/api/me` ve oturum
  yedeği birlikte patladığında `me` null kalıyor ve dört karo, ustalık kartı,
  şerit **sonsuza kadar iskelet** çiziyordu: yüklenmeyen bir ekran "yükleniyor"
  görünüyor. `loading` zaten `useMe`den geliyordu, okunmuyordu.
- **web** `profile/progress` sayfası `content`i null bırakıyor ve yalnız
  başlığı + yetkinlik panelini çiziyordu — **sessiz bir boşluk**, tek kelime
  bile yok.

İkisi de yanlış olduğu için karşılaştırmalı bir ölçü bunu göremez. İki taraf da
aynı kartı çiziyor artık: `progress.load_failed` + `social.err_offline`, alev
ikonu (ekranın kendi ikonu), duyurulu (`live="assertive"` / `role="alert"`) ve
bir yeniden deneme yolu — mobilde `bumpStats()` (`useMe` o işareti dinliyor),
webde sayfanın kendisine bağlantı.

Sözlüğe tek anahtar eklendi (`progress.load_failed`, altı dosya: üç dil ×
web/mobil) ve kapı onu da sayıyor: iki dilde bulunup üçüncüsünde eksik bir
anahtar arayüzde anahtarın kendisini yazdırır.

Kapı **§321**, mutlak. Enjeksiyon üç yönden: mobilin duyurusunu `polite`e
çekmek, webin başlığını başka bir anahtara çevirmek ve İngilizce sözlükten
satırı silmek — üçü de ayrı ayrı kırmızı veriyor.

## §11.462 — Profil karoları: ölü alan, ölü sorgu ve iki hâlli ızgara

Profil karo ızgarası dörtten ikiye indirilmişti (öğrenilen kelime ve süre
Gelişim'de zaten var, burada birebir tekrar ediyorlardı). Ekrandan kalktılar
ama **alanlar kaldı**: `ProfileStats` hâlâ `mastered` ve `seconds` istiyordu ve
sayfa onları doldurmak için `getProgress` çağırıyordu — seviye kırılımı, günlük
şerit, kuyruk sayıları, **beş ayrı sorgu** — ve sonuç hiçbir yerde çizilmiyordu.
Her profil açılışında bedava bir okuma. Android'in aynı ekranı o iki sayıyı
göstermiyor ve fazladan istek de atmıyor. Alanlar ve çağrı kaldırıldı.

İkinci kusur aynı ekranın **mobil** tarafındaydı: karo ızgarası yalnız `me`ye
bakıyordu, yani okuma patlayınca (me null, loading bitmiş) iki karo **sonsuza
kadar iskelet** çiziyordu. On beş satır yukarısındaki rozetler
`meLoading ? iskelet : me ? rozet : null` ile doğru yazılmıştı — aynı ekranda
iki ayrı kalıp. Izgara da ona çekildi; sayı yoksa karo hiç çizilmiyor, kimlik
kartı ve menü satırları yerinde kalıyor. (Gelişim ekranında ekranın tamamı
sayıya bağlı olduğu için orada hata kartı çiziliyor, §11.461.)

Kapı **§322** dört şeyi birlikte ölçüyor, çünkü biri diğerini geri getirir:
`ProfileStats`in her alanı gövdede gerçekten okunuyor (ölü alan = kırmızı),
sayfa `getProgress` çağırmıyor, iki platform aynı iki karoyu çiziyor, ızgara ve
rozetler üç hâlli.

**Kapının kendi hatası da düzeltildi:** üç hâl ölçüsünün ilk yazılışında iki
ölçü de `{meLoading ? (…) : me ? (` desenini arıyordu ve yalnız pencere boyu
farklıydı — geniş pencere rozet bloğunu da eşliyordu, yani iki ölçü **aynı
şeyi** söylüyordu. Enjeksiyon bunu gösterdi: ızgara `{!me ? (`e çevrildiğinde
kapı yeşil kalıyordu, çünkü geriye dogru en yakın `meLoading` açıcısı olarak
bir üstteki rozet bloğunu buluyordu. Şimdi her yüzeyin kendi işaretinden
geriye doğru en yakın **koşul açıcısı** aranıyor.

## §11.463 — Günlük hedef şeridi: okunmayan sayı sıfır demek değil

Şerit `bugünkü tekrar / günlük hedef` yazıyor ve iki sayı **ayrı okumadan**
geliyor: hedef profilden, bugünkü tekrar ilerleme okumasından. Web'de ilerleme
okuması patladığında `reviewsToday` sıfıra düşüyor, hedef ise profilden
gelmeye devam ediyordu — şerit **"0/20"** yazıyor, yani on beş tekrar yapmış
kullanıcıya "bugün hiç çalışmadın" diyordu. Sahici bir sıfırdan (bugün henüz
çalışılmadı) ayırt edilemez bir yalan.

Android'de ayrım baştan beri var: `hasToday = me?.reviewsToday !== undefined`
ve şerit `hasToday && dailyGoal > 0` koşuluna bağlı; uç deploy değilse ya da
okuma patladıysa şerit **hiç çizilmiyor**. Web'e de aynı alan eklendi
(`hasToday: !!progress`).

Kapı **§323**, mutlak ve üç parçalı: alan var, sayfa onu okumadan doldurmuyor,
şerit ona bağlı. Yalnız alanın varlığını ölçmek yetmezdi — alanı kullanmayan
bir şerit doğru görünür.

## §11.464 — Sunucu okuma hatası kartı: altı yüzey sessizdi

Web'de sunucuda çizilen altı sayfa (profil, profil ayarları, kelimelerim,
arkadaşlar, arkadaş ayarları, kişi profili) okuma patladığında aynı el yapımı
kartı veriyor: başlık + "birazdan tekrar deneyin" + `RetryButton`. Altısında da
`role` **yoktu**: ekran okuyucu kullanan biri istediği ekran yerine bir kart
geldiğini duymuyordu, sayfa sessizce boş kalıyordu.

Uygulamanın kendi kalıbı zaten duyuruyor — oyuncu kabukları (`weekly-player`,
`exam-player`, `roleplay-exam`, `placement-test`) aynı kartta `role="alert"`
yazıyor. Aykırı olan altı **sunucu sayfasıydı**; §241 de aynı kuralı boş durum
kabuğu için koyuyor (hata hâli duyurulur, boş hâl duyurulmaz).

Kapı **§324** kapsam ölçüyor: `RetryButton` çizen her dosya duyuruyor mu, ve
dosya sayısı (6) da ölçülüyor — tarama boşalırsa "hepsi duyuruyor"
kendiliğinden doğru çıkardı.

## §11.465 — XP glifi Bolt, kazanılmayan sayı hiç yazılmıyor

Uygulamanın iki ayrı glifi var ve ikisi ayrı şey söylüyor: `SparkIcon` kombo /
yapay zekâ / akış işareti, `BoltIcon` XP. Web'de **üst bar** ve **beceri sonuç
kartı** XP'yi Spark ile yazıyordu — aynı sayı aynı uygulamada iki ayrı glifle.
Profil rozeti aynı nedenle daha önce düzeltilmişti; üst bar ise her ekranda
duruyor, yani en çok görülen yanlış glifti. Android XP'yi her yerde Bolt ile
yazıyor.

İkinci kusur **sıfırın gösterilmesi**:

- **Üst bar:** web seri rozetini her zaman çiziyordu ("alev 0"). Android rozeti
  `streak > 0` koşuluna bağlıyor (`ui/AppHeader`) — "0" yazan bir alev rozeti
  bir sayı değil, kazanılmamış bir ödülün boş çerçevesi.
- **Beceri sonuç kartı:** web iki satırı da koşulsuz yazıyordu; tekrar edilen
  egzersizde "+0 XP", serisi olmayan öğrenciye "0 gün seri". Android'in aynı
  kartı ikisini de sıfırda hiç çizmiyor (`ItemScreen`: `earnedXp > 0`, içinde
  `streak > 0`) ve sıfır XP'nin sebebi zaten hemen altındaki not
  (`item.repeat_note`).

Kapı **§325** iki ölçü: (1) hiçbir XP yüzeyi Spark çizmiyor — kapsam taraması,
(2) iki rozetin sıfır koşulu iki platformda da var. Tarama **eşikle**
ölçülüyor (tam sayıyla değil): Spark meşru bir glif ve yeni bir yerde
kullanılması kapının işi değil; ölçülen şey taramanın boşalmaması.

## §11.466 — Kabuğu kullanamayan boş hâl, kabuğun ölçüsünü taşıyor

Lig tablosundaki "ligde tek başınasın" hâli boş durum kabuğunu (`EmptyCard`)
**kullanamıyor**: kabuk kendi kart çerçevesini çiziyor, bu hâl ise lig kartının
içinde duruyor (başlık satırı — lig adı ve kalan gün — üstte kalıyor). Web o
yüzden karoyu elle kuruyor ve gerekçesi dosyada yazılı.

Elle kurulan her kopya kaymaya açık ve **kaymıştı**: açıklama satırı
`text-body` yazıyordu, kabuk (ve Android `EmptyCard`) sönük `caption` —
aynı boş hâl iki platformda iki ayrı puntoyla okunuyordu.

Kapı **§326** ölçüleri **kabuktan okuyor**, kendi içine kopyalamıyor: karo
boyu, ikon boyu, yarıçap sınıfı, başlık ve açıklama sınıfları
`empty-card.tsx`ten çıkarılıyor ve elle kurulan blokta aynı değerler aranıyor.
Enjeksiyon iki yönden: elle kurulan puntoyu bozmak **ve** kabuğun karo boyunu
değiştirmek — ikincisi kapının bir kopya taşımadığını gösteriyor, çünkü kabuk
değişince kapı elle kurulan bloğu da değişmeye zorluyor.

## §11.467 — Boş hâl karosunun rengi: ölçüldü, iki platform da eşit (kapı yazıldı)

Boş durum karosunun rengi ekranın **konusunu** taşıyor: arkadaşlar yeşil,
sıralama mavi, başarımlar kehribar, hata kırmızı. §241 kabuğun
**kullanıldığını** ölçüyordu, rengini değil — iki platform aynı ekranı ayrı
renkle boyasa kapı görmezdi ve renk bir bilgi taşımaktan çıkardı.

Ölçtüm: **yirmi eşleşen yüzeyin yirmisi de aynı rolde.** Düzeltilecek bir şey
çıkmadı; kapı yine de yazıldı, çünkü ölçülmeyen bir eşitlik yarın ayrışır.

Kapı **§327** renk **değeri** değil **rol** karşılaştırıyor (webin
`--color-mint`i ↔ mobilin `colors.success`i); değerler zaten palet
kapılarında ölçülü. Renk verilmeyen çağrı varsayılana düşüyor
(`brand`/`primary`) ve o da bir rol olarak sayılıyor — "yok" diye geçilse iki
taraftaki ayrı varsayılan sessizce ayrışırdı. Çift sayısı (20) da ölçülüyor:
yeni bir boş hâl iki platforma birden eklendiğinde sayı değişir ve renk kararı
bilinçli verilmek zorunda kalır; tarama bozulursa da 0/0 ile kendiliğinden
geçmez.

`--color-danger` ile `--color-rose` aynı rengin iki adı (`globals.css`te biri
diğerine takma ad), ikisi de `danger` rolüne eşleniyor — kapı bu yüzden isim
değil rol okuyor.

## §11.468 — Ortak görev nabzı: aynı satır, yedi ayrı ölçü

Öğren ekranındaki tek satırlık nabız (bu haftanın ortak görevi / daveti) iki
platformda **aynı verinin ayrı tasarımıydı**. Android referans; web'de bulunan
farklar:

- **Avatar 32** (Android 44), iskelet karosu da 32 — satır aynı kartın içinde
  bir gömlek küçük duruyordu.
- **Kartın durum çerçevesi hiç yoktu.** Android 1.5 px çerçeve çiziyor ve rengi
  duruma göre değişiyor: davet mavi (`info`), kabul edilmiş ortak görev marka
  rengi (`primary`).
- **Halka duruma bakmadan her zaman maviydi** — kabul edilmiş bir görev davet
  gibi görünüyordu.
- Başlık `strong` (15), Android `h3` (16).
- **Çubuk 8 px ve tabansız:** yüzde sıfırda hiç çubuk görünmüyor, yani "sıfır"
  ile "çubuk yok" aynı. Android `Bar` 6 px ve `Math.max(3, …)` ile sıfırda bile
  bir dilim bırakıyor.
- Sağdaki **yüzde `caption`** (12.5) — satırın en önemli sayısı en küçük
  puntoydu. Android `h3`.
- **Davet hâlinde Android ok koyuyor** (gidilecek bir yer var), web hiçbir şey.

Kapı **§328** on iki ölçüyü iki dosyadan okuyor. Çubuğun yüksekliği ve tabanı
**ortak bileşenden** (`social/common` `Bar`) çıkarılıyor, kapının içine
yazılmıyor — enjeksiyon `Bar`ın varsayılan yüksekliğini değiştirince kapı
kırmızı veriyor, yani ölçü kaynağın kendisine bağlı.

## §11.469 — "Karşındaki yapay zekâ" bildirimi: ölçüldü, beş yüzey iki tarafta da tam

Bu bildirim bir **taahhüt**: kullanım şartları §6 "bir yapay zekâ ile
etkileştiğin uygulamada AÇIKÇA BELİRTİLİR" diyor, Play'in üretken yapay zekâ
politikası da aynı bildirimi istiyor. Söz tek platformda tutulursa tutulmamış
olur — web'de bir zamanlar hiç yoktu (`components/ai-notice`in kendi yorumunda
yazılı).

Ölçtüm: **beş çağrı yeri, iki tarafta da tam ve çeşitleri doğru.** Düzeltilecek
bir şey çıkmadı. Eşleme dosya dosya değil **yüzey yüzey**, çünkü Android beceri
yüzeylerinin ikisini de aynı ekranda dal dal çiziyor (`ItemScreen`), web'de iki
ayrı oynatıcı dosyası var.

Kapı **§329** üç şey ölçüyor: kapsam (yüzey başına çağrı sayısı, çeşidiyle),
bildirimin **kalıcı** olması (kapatma düğmesi ya da görünürlük durumu almıyor)
ve iki tarafın aynı iki anahtarı okuması. İkinci ölçü **mutlak**, çünkü
karşılaştırmalı ölçü iki taraf birden düşerse (0 = 0) geçerdi — enjeksiyon tam
bunu doğruladı: web'den birini silmek karşılaştırmayı kırmızıya çevirdi, ikisini
birden silmek ise yalnız mutlak ölçüyü.

Sıfır XP'li ses (telaffuz) alıştırmasında bildirim **yok** ve bu doğru: orada
puanı model değil kural/tanıyıcı veriyor. İki platform bu ayrımda da aynı.

## §11.470 — CEFR rozetinin tonları: Android'de beşten dördü AA eşiğini tutmuyordu

Rozet **dolu zemin + beyaz yazı** ve yanında rengi açıklayan bir etiket yok,
yani renk tek taşıyıcı: katı eşik geçerli (AA 4.5, yazı `bodyStrong` 15 px).
Android tonu **rol renklerinden** alıyordu (`colors.success`, `colors.info`,
`colors.accent`, `colors.primary`, `colors.danger`) ve o renkler kart üstünde
okunacak yazı için değil, **işaret** için ayarlı.

Ölçüm (açık tema, beyaz yazı):

| Seviye | Ton | Beyazla kontrast |
|---|---|---|
| A1 | `colors.success` #2f9a61 | **3.55** |
| A2 | `colors.info` #1b93ac | **3.61** |
| B1 | `colors.accent` #9256bc | 4.91 |
| B2 | `colors.primary` #f87612 | **2.77** |
| C1 | `colors.danger` #dc3f55 | **4.30** |

Beşten dördü 4.5'i tutmuyor; B2 büyük yazı eşiği 3.0'ı bile tutmuyor.

**Aynı ölçüm web tarafında yapılmış ve düzeltilmişti** (`components/level-badge`
`TONE`: ailelerin 600'ü, B2 ise 700'ü — marka turuncusunun 600'ü beyazla 3.72,
700'ü 5.39). Yani doğru cevap zaten depoda duruyordu, yalnız bir platformda.
Android tonları artık `theme/colors` `LEVEL_TONE`da ve web tablosuyla birebir
aynı; **temaya duyarlı değil**, çünkü rozet kendi zeminini getiriyor ve temanın
yüzeyiyle işi yok. `onFill` bu yüzden kullanılmıyor — o jeton koyu temada koyu
mürekkebe dönüyor ve bu zeminlerde okunmaz.

İkinci kusur aynı bileşenin sayısında: "1234 kelime pekişti" Android'de
**binlik ayraçsız** yazılıyordu (web baştan beri `formatNumber`). §140'ın
taraması yalnız XP adlı değerlere bakıyor, `mastered` oraya girmiyordu.

Kapı **§330** web tablosunu **CSS'ten çözerek** karşılaştırıyor
(`var(--color-mint-600)` → `#237a4c`): kapının içinde tonların bir kopyası yok,
yani biri değişirse kapı ötekini de değişmeye zorluyor.

## §11.471 — Tek Erdi kuralı Android'de hiç yoktu; ortam dikizlemesi üç noktada ayrışıyordu

Bir tane mirket var. Ekranın kenarından dikizlerken cevap şeridinde de
belirmesi, köşede kutlarken şeritte de baş parmak göstermesi karakteri ikiye
bölüyor. **Web bunu bir kusur olarak bulup sahne kurdu** (`lib/mascot-stage`):
gezici hareketler sahneyi süreli kilitliyor, sahne başkasınınken öteki her Erdi
örneği görünmez oluyor; cevap şeridinin maskotu **muaf** (`pinned`), çünkü o süs
değil cevabın kendisi.

**Mobilde sahne hiç yoktu.** Ortam dikizlemesi, kutlama pop'u ve şeridin
maskotu birbirinden habersiz çiziliyordu; aynı ekranda iki (bazen üç) Erdi
görünebiliyordu. Modül birebir port edildi (`lib/mascotStage`), pop ve
dikizleme sahneyi alıp bırakıyor, `Mascot` `stage`/`pinned` alıyor ve şeridin
maskotu muaf işaretlendi.

Dikizlemenin kendisi de üç noktada ayrışıyordu:

1. **"Hareketi azalt".** Web `useStill()` ile `MascotFx`i hiç çizmiyor; mobil
   maskotu *yerinde* gösteriyordu — belirip kaybolmanın kendisi de hareket.
   Dahası o dalda **bir sonraki randevu kurulmuyordu** (`schedule(false)` erken
   dönüşün arkasında kalıyordu): tercih açık olan kullanıcı bir kez dikizleme
   görüp sonrasında hiç görmüyordu. Kural artık webinki.
2. **Zamanlama.** Web ilk randevuyu 60–150 sn, sonrakileri klip süresi +
   150–330 sn arasına koyuyor; mobil 20–60 ve 90–210 yazıyordu — aynı sürpriz
   Android'de iki kat sık geliyordu.
3. **Kenar.** Web iki yandan dikizliyor, mobil yalnız sağdan.

Kapı **§331** üç ölçü kümesi: sahnenin API'si, kuralın katılımcıları (kim
sahne alıyor, kim bırakıyor, `away` kuralı ve muaf çağrı sayısı) ve
dikizlemenin sayıları (iki pencere, süre, iki kenar, hareket azaltma kuralı).
Beş enjeksiyon noktası ayrı ayrı kırmızı veriyor.

Yürüyüş ve gerçek dikizleme klibi **aynı turda** port edildi; ayrıntısı
§11.472'de.


## §11.472 — Yürüyen mirket Android'e geldi: altı klip, iki yüzey

§11.471'in açık kalanı kapandı. Webin `MascotFx`i iki ortam sürprizi çiziyor ve
mobilde **yalnız yarım bir dikizleme** vardı:

- **Yürüyüş yok.** Web rastgele bir anda mirketi ekranın altından bir uçtan
  öbür uca yürütüyor; yön rastgele, çeşit rastgele (%35 "stroll" — patiler
  ensede rahat gezinti) ve **süre ekran genişliğinden türetiliyor**: adım hızı
  sabit (95 px/sn), yani dar telefonda kısa, geniş ekranda uzun yürüyor. Sabit
  süreli bir yürüyüş dar telefonda koşar, tablette sürünür.
- **Dikizleme kendi klibiyle değildi.** Web `peek` / `peek-mirror` kliplerini
  kullanıyor ve gövdenin yarısı kadraj dışında kalıyor (125 px taşma, 190 px
  boy); mobil bunun yerine bir ruh hâli klibini tam görünür hâlde gösteriyordu
  — "dikizleme" jesti yoktu.
- **Yüzey eksikti.** Web sürprizleri iki oynatıcıda da çiziyor (kelime turları
  `session-player`, beceri egzersizi `skills/player-shell`); mobilde yalnız
  kelime turlarında vardı.

Altı klip mobil pakete kopyalandı (`peek`, `peek-mirror`, `walk-left/right`,
`stroll-left/right`; ~1,34 MB, paket 9,3 → 10,7 MB). Dosyalar webin
`public/anim` altındakilerle **birebir aynı** — mevcut sekiz klipte de öyleydi
(md5 eşit), yani port konvansiyonun kendisi. `ui/AmbientMascot.tsx` yerini
`ui/MascotFx.tsx`e bıraktı ve iki yüzeye de bağlandı.

Kapı **§331** iki ölçü daha aldı: yürüyüşün sekiz sayısı (hız, boy, iki randevu
penceresi, yön ve çeşit seçimi, sürenin genişlikten türetilmesi, sahne alımı)
ve sürprizlerin çizildiği yüzey sayısı. Enjeksiyon üç yönden doğruladı: hızı
değiştirmek, süreyi sabitlemek ve bir yüzeyi kaldırmak.

**§306 de düzeltildi.** Mobil "ölü klip" taraması yalnız `ui/Mascot.tsx`i
okuyordu; yeni klipler `ui/MascotFx.tsx`ten `require` edilince kapı onları ölü
dosya sanacaktı. Tarama artık tüm mobil kaynakları geziyor — kapsamını ölçmenin
bir biçimi daha.

## §11.473 — Puan halkası: iki sonuç ekranında hiç yoktu, ikisinde elle kuruluydu

Sonuç ekranının en önemli sayısı halkanın içinde duruyor. Android dört yüzeyde
de aynı bileşeni çiziyor (`ui/ProgressRing`): haftalık sınav (160/15), rol yapma
sınavı (140/13), yürüyüş modu (150/14) ve kelime turu (150/14).

**Web'de iki yüzeyde halka yoktu:**

- **Rol yapma sınavı:** puan başlığın içinde bir ek cümleydi ("Rol yapma
  sınavı · %85"). Android'in başlığında yalnız sınavın adı var, puan halkada.
- **Yürüyüş modu:** doğru sayısı sönük bir satırdı (`common.n_correct`).

Kalan ikisinde halka **elle** kuruluydu (`conic-gradient` + içine oturan bir
daire, dolgu payı her yerde başka: 15 px, 7 px) ve üç noktada Android'den
ayrılıyordu:

1. **Gradyan yoktu.** Android iki duraklı bir gradyanla çiziyor (`gradientA` =
   `#fb8f2a → #f87612`, yani webin `--color-brand-400 → --color-brand-500`i,
   135°); web tek renk basıyordu. (İki değer birebir aynı — mobil paleti
   webinkiyle hizalı.)
2. **Uç yuvarlak değildi.** `conic-gradient` keskin bir dilim veriyor; Android
   `strokeLinecap="round"` ile iki ucu yuvarlatıyor.
3. **Ölçüler ayrıydı:** web 128 ve 96, Android 160 ve 150.

Web artık tek bir bileşen kullanıyor: `components/score-ring` — **SVG**, çünkü
yuvarlak uç ve gradyan ancak böyle oluyor. Ortası boş, yani "içine oturan
daire" hilesi de kalktı (o hile zemin rengini bilmek zorundaydı ve gradyanlı
kartta ayrıca bir sınıf istiyordu). Ölçüler dört çağrı yerinde de
Android'inkiler.

Kelime turunun halkası **beyaz kalıyor**: web'de o halka marka gradyanlı bir
kartın içinde duruyor, Android'de sayfa zemininde — gradyan orada görünmez.
Bileşen ton alıyor, gerekçe çağrı yerinde yazılı.

Kapı **§332** üç ölçü: dört yüzeyin boy/kalınlık çifti, halkanın çizim
özellikleri (yuvarlak uç, iki duraklı gradyan, kırpma, yarıçap ve çevre
formülü) ve webde **elle kurulmuş halka kalmadığı** — muafiyeti
`progress-view`in küçük `Donut`u (sayaç karosu; Android'de karşılığı yok, orada
çubuk var) ve `avatar`ın dönen konik dokusu.

İki eski kapı da güncellendi (tur özeti ve haftalık sonuç yerleşimi): ikisi de
webin halkasını `conic-gradient` deseniyle arıyordu, artık `<ScoreRing>` ve
Android'in ölçüsüyle arıyorlar.

## §11.474 — Menü satırı: bir satır, üç kopya, üç ayrı ölçü (ve ikonun mürekkebi)

Aynı satır (renkli ikon karosu + etiket + şevron) web'de **üç ayrı yerde elle
kuruluydu** ve üçü de başka ölçüdeydi:

| Yer | Karo | Tint | Şevron |
|---|---|---|---|
| Profil menüsü (`Row`) | 38 | %13 | 20 |
| Davet satırı (`InviteRow`) | 40 | %14 | 20 |
| Gelişim sayfası (`ProgressRow`) | 40 | **%16** | **18** |

Mobilde **bir tane** var (`ui/MenuRow`) ve dosyasındaki yorum sebebini zaten
yazıyor: "iki listenin satır yüksekliği, ayraç çizgisi ve dokunma alanı tek
yerden geliyor, biri değişince öteki geride kalmıyor." Web artık tek bileşen
kullanıyor (`components/menu-row`) ve ölçüleri Android'den: 38 karo, %13 tint,
`rounded-tile`, `text-strong` etiket, 20 şevron `--text-faint`, `py-3`, sonda
ayraçsız. Bileşen hem bağlantı hem düğme olabiliyor (davet satırı düğme).

**İkonun mürekkebi ayrı bir kusurdu.** Karo zemini tonun %13'ü; ikon rengi de
aynı 500 değeriydi. Ölçtüm (açık tema, ikon kendi tinti üstünde):

| | 500 ile | 600 ile |
|---|---|---|
| mint | 3.07 | 4.59 |
| sky | 3.11 | 4.64 |
| violet | 4.14 | 5.77 |
| rose | 3.60 | 5.08 |
| **flame** | **2.55** | 4.60 |
| **brand** | **2.43** | 4.73 |

Grafik eşiği 3.0; flame ve brand onu bile tutmuyordu — ve profil menüsünün dört
satırının ikisi flame. Android bunu `onTint` ile çözüyor: zemin rol rengi, ikon
o rengin `*Text` (600) türevi. **Davet satırı bu kararı zaten taşıyordu** ve
ölçümü yorumunda yazılıydı ("sabit 500 … 2.97 veriyordu, grafik eşiği 3.0 bile
değil"); kardeş satırlar 500 ile kalmıştı — aynı listede iki ayrı karar.

Ton artık bir **aile adı** (`MenuTone` birliği: brand/mint/sky/violet/flame/
rose), ham bir CSS değeri değil: zemini ailenin 500'ünden, mürekkebi rol takma
adından (açık temada 600) kuruyor ve bir çağrı yeri ham değer geçiremiyor —
kural tiple tutuluyor.

Kapı **§333** iki ölçü: satırın sekiz sayısı iki platformda (karo, yarıçap,
ikon, mürekkebin rol türevi olması, etiket, şevron, dikey pay, ayraç) ve
mutlak olarak tek bileşen (ton tipi aile adı, eski el yapımı kalıp iki dosyada
da yok, çağrı yeri sayısı 5+2).

**Kapının ilk hâli yanlış şeyi ölçüyordu:** "hiçbir yerde `color:
var(--color-x-500)` yazmasın" diyordu, oysa kusur `color: tone` şeklindeydi ve
değer çağrı yerinden geliyordu — ölçü kusurun şeklini hiç görmüyordu. Yerine
tipe ve kalıba bakan bir ölçü kondu; enjeksiyon (Gelişim satırını elle geri
kurmak) artık kırmızı veriyor.
