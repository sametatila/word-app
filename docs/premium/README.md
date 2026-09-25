# Premium — mimari, mağaza kurulumu ve yönetim

Bu belge üç şeyi anlatıyor: yapının **neden** böyle kurulduğu, RevenueCat ve
mağazalarda **adım adım** ne yapman gerektiği, ve bir gün RevenueCat'ten
**nasıl çıkacağın**.

---

## 1. Mimari — neden sağlayıcıya bağlı değiliz

Tek cümle: **yetkinin kaynağı bizim veritabanımız, mağaza değil.**

```
  Mağaza (Apple / Google)
        │  satın alma
        ▼
  RevenueCat ──webhook──▶  /api/premium/webhook/revenuecat
                                    │  adaptör → StoreEvent
                                    ▼
                        entitlements + premium_grants   ◀── promo kodu
                          (TEK YETKİ KAYNAĞI)           ◀── davet ödülü
                                    │                   ◀── elle verilen süre
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                  web            Android           iOS
             (hepsi /api/premium/status'a sorar)
```

Üç somut sonucu var:

1. **Sağlayıcı değiştirilebilir.** Uygulamanın hiçbir ekranı "premium miyim"
   sorusunu RevenueCat'e sormuyor. `RevenueCat` adı yalnız iki yerde geçiyor:
   `src/lib/premium/providers/revenuecat.ts` (sunucu) ve
   `mobile/src/lib/billing.ts` + `billingConfig.ts` (satın alma arayüzü).
2. **Mağazadan gelmeyen yetki mümkün.** Promo kodu, davet ödülü ve elle verilen
   süre mağazada yok. Sağlayıcıya sorulsaydı bunları kazanan kullanıcı
   uygulamada ücretsiz görünürdü.
3. **Denetlenebilir.** Her hareket `premium_grants` defterinde: kim, ne zaman,
   hangi kaynaktan, ne kadar.

### Yetkinin iki bileşeni

| | Nereden | Nasıl yazılır |
|---|---|---|
| **Mağaza penceresi** (`store_until`) | sağlayıcı bildirir | her olayda **üzerine yazılır** |
| **Bonus** (`bonus_minutes` + `bonus_until`) | promo / davet / elle | **bakiyeye eklenir**, birikir |

Ayrı tutulmalarının sebebi: sağlayıcı her yenilemede **mutlak bir bitiş tarihi**
bildiriyor. Tek sütunda toplansalardı her yenileme biriken hediye günlerini
sessizce silerdi. Ayrı tutulunca yenileme bonusa dokunmuyor.

Bonus, mağaza kapsamı **yokken** harcanmaya başlıyor; abonelik varken bekliyor,
yanmıyor. Kullanıcı hediye süresi çalışırken abone olursa kalan hediye bakiyeye
**geri dönüyor** (`applyStoreEvent`).

### Aynı olay iki kez gelirse

Ödeme sağlayıcıları teslimatı **en az bir kez** garanti eder, tam bir kez değil:
ağ koptuğunda ya da yanıt geç döndüğünde aynı olayı tekrar gönderirler. Yani
"iki kez gelmez" diye bir varsayım kurulamaz.

Eleme anahtarı **olay kimliği**, ve kısıt kodda değil veritabanında:
`premium_grants(ref) where source='store'` BENZERSİZ. `applyStoreEvent` deftere
yazmayı **kapı** olarak kullanıyor — satır dönmezse olay zaten işlenmiştir, çık —
ve yazma ile durum güncellemesi **tek işlemde**.

Bu ayrım önemli: "önce SELECT, satır yoksa uygula" bugünkü kodda çoğu zaman
doğru sonuç verir, ama bir yarıştır ve `applyStoreEvent`e artıran tek bir yazma
eklendiği gün sessizce delinir. Ödeme akışında hatanın para tarafına düştüğü
yer tam burasıdır, o yüzden garanti kısıtta duruyor.

### Dosya haritası

| Dosya | Ne yapar |
|---|---|
| `src/lib/premium/gates.ts` | Sınırların **tipi ve varsayılanı** — tek kaynak |
| `src/lib/premium/config.ts` | Yürürlükteki değerler (panelden gelen üstyazım) |
| `src/lib/premium/entitlement.ts` | Yetkinin hesabı ve yazılması |
| `src/lib/premium/access.ts` | "Bu kullanıcı bunu yapabilir mi" kararları |
| `src/lib/premium/quota.ts` | Kota sayaçları (gün / hafta / ömürlük) |
| `src/lib/premium/promo.ts` | Kod üretimi ve bozdurma |
| `src/lib/premium/referral.ts` | Davet zinciri ve ödül |
| `src/lib/premium/ports.ts` | **Sağlayıcı sözleşmesi** — bağımsızlığın durduğu yer |
| `src/lib/premium/providers/*` | Adaptörler (bugün yalnız RevenueCat) |
| `mobile/src/lib/premium.ts` | Mobilde durum — **sunucudan** |
| `mobile/src/lib/billing.ts` | Mobilde **yalnız satın alma** |

---

## 2. Ürün yapısı ve kota kararları — 2026-09-25 (GEÇERLİ)

Samet'le soru-cevapla verildi. Aşağıdaki 2026-09-08 bölümünü ve "tek havuz" anlatımını
**geçersiz kılar**; o bölüm tarihçe olarak duruyor. Uygulama bu kararlara göre değiştiriliyor
(2026-09-25'ten itibaren); iş bitene kadar kod ile bu tablo ayrışabilir, kesin kaynak burası.

**Sözlük (ürünün dili — kodda, arayüzde, paywall'da, mağazada aynı):**

| Yer | Parçalar | Not |
|---|---|---|
| **Öğren** | Kelime çalışma (günlük tur) · Pratik (aynı oyun türüyle kelime tekrarı) · Haftalık quiz (her hafta farklı; şu an 5, artacak) · Deneme sınavları · Yürüyüş modu | Deneme sınavları YALNIZ burada, Patika'dan bağımsız |
| **Patika** | Okuma · Dinleme · **Konuşma** · Yazma · Dil bilgisi · **Quiz** · **Sınav** | İçerik yalnız Patika'ya ait. "Ders" ve "rol yapma" kavramı YOK: bugünkü ders (Türkçe anlatım + yapay zekâ sohbeti) Patika'nın **Konuşma** adımıdır; içerik değişmedi, adı değişti. Sohbet sonundaki puanlı 5 tur ("Sınav olarak dene") Konuşma adımının isteğe bağlı **puanlı kısmıdır**, ayrı bir "sınav" adı taşımaz. Tekrar + Kontrol → **Quiz**. Modül sınavı + seviye sınavı → **Sınav** (seviye sınavı Öğren'den Patika'ya taşınır) |
| **Beceriler** | Okuma · Dinleme · Konuşma · Yazma · Dil bilgisi | Dili bir miktar bilen kullanıcı için; CEFR seviyesi serbestçe değişir |

"Ders", "lesson", "rol yapma", "roleplay" adları **her yerden** kalkar: dosya adları, fonksiyon
ve değişken adları, yorumlar, i18n anahtarları, içerik kimlikleri. API adresleri yeni adla açılır,
eski adres testteki eski build'ler için geçici yönlendirilir; veritabanı tabloları veri kaybı
olmadan (ALTER … RENAME, deploy'dan önce yedekli) yeniden adlandırılır — `deploy.sh`'taki
`drizzle-kit push --force` şemada olmayan tabloyu SİLER, sıra buna göre kurulur.

**Kotalar:**

| | Ücretsiz | Premium |
|---|---|---|
| Kelime çalışma, pratik, okuma, dinleme, dil bilgisi, quiz | sınırsız | sınırsız |
| Haftalık quiz | haftada 1 | haftada 1 |
| **Yürüyüş modu** | **günde 3 tur**, yalnız ekran açıkken (tur sonundaki "devam" da bir tur) | ekran kapalı dahil; kötüye kullanım tavanı günde 20 tur |
| **Deneme sınavları** (Öğren) | her seviyede **1** kâğıt açık; o kâğıdı **bitirip 7 günlük seri** yapınca **+1**, sonra her 7 günlük seride +1 | **3'lü paketler**: paketteki 3 kâğıdı **tamamlayınca** sonraki 3 açılır |
| **Patika Konuşma** (anlatım + yapay zekâ sohbeti + puanlı kısım) | **seviye başına 2** açık; ikisini **tamamlayıp 7 günlük seri** yapınca **+2**, sonra her 7 günlük seride +2. Hak yoksa adım **kilitli, Premium ister** | yalnız kötüye kullanım tavanı |
| **Patika Yazma** (yapay zekâ değerlendirmesi) | aynı: seviye başına 2 + (tamamla + 7 gün seri) → +2 | yalnız kötüye kullanım tavanı |
| **Beceriler Konuşma / Yazma** (yapay zekâ değerlendirmesi) | **seviye başına** 2'şer + (tamamla + 7 gün seri) → +2'şer | yalnız kötüye kullanım tavanı |

**Kalkanlar:** deneme sınavındaki %60 başarı koşulu (iki katmanda); haftada 2 yenilenen
ortak hak; "Patika ve Beceriler ortak / tek havuz" anlatımı; kotasız Patika sohbeti; Cepte
yürüyüşteki sayılmayan "günde 20 tur".

**Yönlendirme ilkesi (Samet, zorunlu):** arayüz kullanıcıyı doğru bilgilendirir ve YÖNLENDİRİR;
hiçbir kilitte kullanıcı "ne yapacağım" diye kalmaz, kendi kendine ilerler ve takip eder. Her
kotalı yüzeyde (deneme sınavı, Patika Konuşma/Yazma, Beceriler Konuşma/Yazma, yürüyüş modu,
paywall) bir sonraki hakkın koşulları ve durumu görünür — ör. "Deneme sınavını tamamladın ✓ ·
7 günlük seri 3/7 · 4 gün sonra ikinci deneme sınavı ücretsiz açılır" — yanında "Premium'la hemen
aç". Hak açılınca kısa bir kutlama efekti (reduceMotion'a saygılı). Durum sunucuda tek bir saf
fonksiyonla hesaplanır, web ve mobil aynı bilgiyi gösterir.

**Paywall (web, iOS, Android):** her satır bu tabloyla birebir; hakların **nasıl kazanıldığı**
(tamamla + 7 günlük seri) açıkça yazılır. Premium'daki sınırlar "sınırsız" denmeden "kötüye
kullanımı önleyen günlük üst sınır" diye anılır (App Store 3.1.2), sayıları Premium ekranında.

### 2.1 Uygulama (2026-09-25) — kod bu kararları nasıl tutuyor

**Formül (tek yer `src/lib/premium/unlock.ts`, saf, `test:premium`):**
izin verilen = taban + bonus × k, k = min(⌊en uzun seri ÷ 7⌋, tam bitirilmiş dilim
sayısı[, `maxTiers`]). İlk dilim tabandır; ikinci dilim ancak tabandaki hakların HEPSİ
bitirilince VE en uzun seri 7'ye varınca açılır, üçüncüsü ikinci dilim de bitince ve seri
14'e varınca. Seri tek başına açmaz, bitirmek tek başına açmaz. Ölçü `longest_streak`:
kazanılan hak geri alınmaz. Kademe tavanı `maxTiers` (panel), varsayılan **0 = sınırsız**
(karar yok).

**Sayaçlar — hepsi `usage_counters`, hepsi ayrı:**

| Yüzey | Kullanılan hak (ömürlük) | Sahiplenme işareti | "Bitirmek" |
|---|---|---|---|
| Patika Konuşma | `conversation:<SEVİYE>` | `conversation_owned:<SEVİYE>:<konuşma>` | Konuşma adımının bitmesi (`user_conversations` satırı, `/api/conversation`) |
| Patika Yazma | `path_writing:<SEVİYE>` | `path_writing_owned:<egzersiz>` | ilk değerlendirme (sahiplenmek = değerlendirilmiş gönderim) |
| Beceriler yazma | `skill_writing:<SEVİYE>` | `skill_owned:<egzersiz>` | ilk değerlendirme |
| Beceriler konuşma (B1+ monolog) | `skill_speaking:<SEVİYE>` | `skill_owned:<egzersiz>` | ilk değerlendirme |
| Deneme sınavı | — (açık kâğıt = sıradaki ilk N) | — | kâğıdın bitmesi (`mock_exam_attempts.finished_at`) |
| Yürüyüş modu | `walk_rounds` (gün, UTC) | — | — |

Hak maddenin İLK yapay zekâ kullanımında düşer ve madde sahiplenilir; sahiplenilmiş madde
hak bitse de açık kalır, yeniden açmak hak yemez (`claimTiered`: önce işaret, sonra seviye
sayacı izin verilen sayıyla atomik; sayaç doluysa işaret geri alınır). Seviye maddenin
KENDİ seviyesi, istemcinin gönderdiği değil. Sahiplenilmemiş (senaryolu) bir konuşmayı bitirmek
dilimi doldurmaz.

**Nerede düşüyor:**
- Patika Konuşma: `/api/chat` ilk turu (konuşma kimliğiyle). Puanlı kısım ("Kendini puanla",
  `/api/assess` `kind: chat`) AYNI hakkı kullanır, ayrı hak düşmez.
- Patika Yazma ve Beceriler: `/api/assess`, madde `exerciseId`den çözülür.
- **Modül/seviye sınavı yazma bölümü hak DÜŞÜRMEZ** (web kimlik gönderse de mobil göndermese
  de): sınav Patika'nın ölçme adımı, tablo onu kotaya bağlamıyor; yalnız kötüye kullanım
  tavanları (günde 120 çağrı, 60 değerlendirme).
- Yürüyüş: birim **TUR** (2026-09-25 düzeltmesi, Samet; ilk uygulamadaki "oturum" ve 30
  dakikalık pencere kalktı). Her `/api/session?walk=1` isteği — tur sonundaki "devam" dahil —
  bir tur ve günlük haktan bir düşer (`openWalkRound`, tek SQL ifadesi). Yalnız son sayılan
  turdan 2 saniye içinde gelen istek aynı turun çift gönderimi sayılır (eşzamanlı çift istek
  iki tur yakmasın); istemcinin tur kimliğine güvenilmez. Kuyruk kurulamazsa (500) tur geri
  verilir. 4. tur 403 → kilit + paywall. Ekran kapalı yol (`/api/stt`) yalnız premium; kelime
  tavanı tur tavanı × 40. Eski `walk_sessions` sayacı gün sınırlıydı, taşınmadı.
  Not: iki istemci de yürüyüş ekranı açılınca kuyruğu yüklüyor, yani ekranı açmak bir tur
  sayılıyor.

**SENARYOLU YOL İSTİSNASI.** Misafir ve yapay zekâ iznini REDDEDEN (`declined`) kullanıcı
Konuşma adımını bugünkü gibi senaryolu (yapay zekâsız) konuşmayla yapar; adım kilitlenmez ve
hak düşmez. Sebep: izin zorlanamaz (App Store 5.1.2(i)) ve senaryolu yolun maliyeti yok.
Hakkı bitmiş ama izin vermiş kullanıcı senaryoluya DÜŞMEZ, kilidi görür (paywall + "nasıl
açılır"). Kapı sunucuda: misafir `/api/chat`e hiç giremiyor (403 account_required), izni
reddeden rıza kapısında duruyor (403 consent); ikisi de kotaya varmıyor.

**Premium:** kademe yok. Yazma/konuşma değerlendirmesi alıştırma başına bir kez günlük
`aiPracticePerDay` (30) tavanına sayılır; Konuşma adımının tavanı sohbet mesajı (günde 300,
`lib/quotas`); yürüyüş `fairUse.walkRoundsPerDay` (20) tur, AYNI sayaçla gerçekten
sayılıyor (eski "günde 20 tur" hiçbir yerde sayılmıyordu). Paywall bunları "kötüye kullanımı
önleyen günlük üst sınır" diye yazar (`plan.pro_fair_use`).

**Kilit açma görünümü:** `/api/premium/status` → `unlock` (bütün seviyeler tek çağrıda:
kalan hak, bitir x/y, seri x/7, tahmini gün, sahiplenilmiş maddeler). Web ve mobil aynı
sayıdan aynı cümleyi kurar.

**Geriye uyum:** üretimde `app_settings` › `premium.config` satırı yok (2026-09-25 ölçüldü),
kod varsayılanı geçerli. Eski kayıttaki `weeklyAiPractice`, `streakMaxTiers`,
`free.pocketWalksPerDay`, `fairUse.pocketWalksPerDay`, `mock.unlockPct`,
`mock.unlockOnComplete` yok sayılır. Durum ucu eski sürümler için `fairUse.pocketWalksPerDay`
takma adını ve `gates.pocket_walk`u taşımaya devam ediyor.

### 2.2 Adlandırma (2026-09-25, aşama 2) — kod sözlüğü, göç ve geçici takma adlar

Yukarıdaki sözlük kodda şöyle yazılıyor. Seçim tek kök: **Patika'nın Konuşma adımı
`conversation`, adımın yapay zekâ sohbeti `chat`**. `speaking` bilerek seçilmedi: o ad zaten
Beceriler'in Konuşma alıştırmasına ait (egzersiz türü `speaking`, değerlendirme türü
`speaking`, sayaç `skill_speaking:`); aynı kök iki ayrı yüzeyi adlandırsaydı sayaçlar ve
değerlendirme türleri birbirine karışırdı. Aşama 1'in sayaç adı (`conversation:<SEVİYE>`)
da bu seçimle aynı.

| Kavram (arayüz) | Kodda | Not |
|---|---|---|
| Konuşma adımı (Patika) | `conversation` — tip `Conversation`, `lib/conversations/`, `/conversations/<id>` | Bugünkü içeriğin kendisi, içerik değişmedi |
| Anlatım fazı | `lecture` | Değişmedi: yasaklı ad değil ve anadil sözlüğünün yayınlanan maddesi (`native/en` › `lecture`); adı değiştirmek build 6'yı kırardı |
| Sohbet fazı | `chat` — `lib/conversations/chat.ts`, `/api/chat`, içerik alanı `chat` | Eskiden `roleplay` |
| Puanlı kısım ("Kendini puanla") | `scored` — `/conversations/<id>/scored`, sohbet kipi `scored`, madde `<id>:scored` | Eskiden "Sınav olarak dene", `exam`; arayüzde "sınav" demiyor |
| Quiz (eski "Tekrar") | `quiz` | |
| Ünite quizi (eski "Kontrol") | `unitQuiz` — öğe `<ünite>-unitQuiz1` | Eskiden `checkpoint` |
| Sınav (modül + seviye) | `exam` — `/exam/<sv>/<modül>`, `/exam/<sv>` | Seviye sınavı Öğren'den Patika'nın sonuna taşındı |
| Modül hız turu | `boss` — `/boss/<sv>/<modül>` | Eskiden `/lessons/boss/…` |

**Eski → yeni (tam liste):**

| Alan | Eski | Yeni |
|---|---|---|
| API | `/api/lesson` · `/api/roleplay` | `/api/conversation` · `/api/chat` |
| Sayfa | `/lessons/<id>` · `/lessons/<id>/exam` · `/lessons/boss/<sv>/<m>` · `/lessons` | `/conversations/<id>` · `/conversations/<id>/scored` · `/boss/<sv>/<m>` · `/immersion` (308) |
| Tablo | `user_lessons` · `roleplay_logs` | `user_conversations` · `chat_logs` |
| Sütun | `lesson_id` · `roleplay_done` | `conversation_id` · `chat_done` |
| Kısıt/indeks/dizi | `user_lessons_user_id_lesson_id_pk` · `roleplay_logs_pkey` · `roleplay_logs_user_idx` · `roleplay_logs_id_seq` | `user_conversations_user_id_conversation_id_pk` · `chat_logs_pkey` · `chat_logs_user_idx` · `chat_logs_id_seq` |
| Sayaç (`usage_counters.key`) | `writing_lesson:<SV>` · `owned_lesson:<id>` · `writing_skill:<SV>` · `speaking_skill:<SV>` · `skill_ai:<id>` · `roleplay_turns` (gün) | `path_writing:<SV>` · `path_writing_owned:<id>` · `skill_writing:<SV>` · `skill_speaking:<SV>` · `skill_owned:<id>` · `chat_turns` (gün) |
| Tür değeri | `ai_usage.kind`, `assessments.kind`, `content_reports.kind` = `roleplay` | `chat` |
| Olay | `lesson_start/step/finish`; tür `roleplay`, `first_lesson`, `roleplay_exam[:…]`, ekran `lesson`/`lessons`/`Lesson`/`RoleplayExam` | `conversation_*`; `chat`, `first_conversation`, `conversation_scored[:…]`, `conversation`/`conversations`/`Conversation`/`ConversationScored` |
| Rozet / görev | `lesson1/10/50/100` · görev `lesson1` | `conversation1/10/50/100` · `conversation1` |
| Puanlı kısım | sohbet kipi `exam`, madde `<id>:exam`, bildirim `<id>:exam:<tur>` | `scored`, `<id>:scored`, `<id>:scored:<tur>` |
| Patika öğesi | tür `lesson` · `checkpoint`, kimlik `<ünite>-checkpoint1` | `conversation` · `unitQuiz`, `<ünite>-unitQuiz1` |
| İçerik paketi | `lessons/<kurs>-<sv>` (alan `roleplay`) | `conversations/<kurs>-<sv>` (alan `chat`) |
| Anadil maddesi | `native/en` › `roleplay` · `native/de` › `lesson` | `chat` · `conversation` |
| Hukuki yapılandırma | `fairUse.roleplayTurnsPerDay`, `DAILY_QUOTAS.roleplayTurns` | `fairUse.chatTurnsPerDay`, `DAILY_QUOTAS.chatTurns` |
| i18n aileleri | `lesson.*` · `lessonp.*` · `lessonw.*` · `roleplay.*` · `rpexam.*` · `*_checkpoint` · `learn.level_exam*` | `conversation.*` · `conversationp.*` · `conversationw.*` · `chat.*` · `scored.*` · `*_unit_quiz` · `path.level_exam*` |
| Mobil ekran/rota | `LessonScreen`/`Lesson` · `RoleplayExamScreen`/`RoleplayExam` | `ConversationScreen`/`Conversation` · `ConversationScoredScreen`/`ConversationScored` |
| Cihaz deposu | `lernomi-lesson-resume:<id>` · `lernomi-lessons-pending` (mobil) · `lernomi-lesson-progress:<id>` (web) | `lernomi-conversation-resume:<id>` · `lernomi-conversations-pending` · `lernomi-conversation-progress:<id>` |
| Dizin | `src/lib/lessons`, `src/components/lessons`, `data/lessons` (`roleplay/` hattı `chat/`), `data/lessons-plan`, `mobile/src/data/lessons`, `mobile/src/game/lessonProgress` | `…/conversations`, `data/conversations-plan`, `mobile/src/game/pathProgress` |
| npm betiği | `lessons:apply(-de)`, `check:lessons*`, `dump:lessons`, `test:roleplay`, `logs:roleplay` | `conversations:apply(-de)`, `check:conversations*`, `dump:conversations`, `test:chat`, `logs:chat` |

**Veritabanı göçü — `drizzle/0069_rename_conversation.sql`.** Yalnız RENAME ve UPDATE, idempotent,
tek transaction. `deploy.sh`'taki `drizzle-kit push --force` şemada olmayan tabloyu VERİSİYLE
sildiği için sıra: (1) yedek, (2) 0069 elle, (3) deploy (push artık boş fark görür),
(4) deploy bitince 0069 bir kez daha (eski rengin swap'e kadar eski adla yazdığı artıklar
birleşir). Yerelde kanıtlandı: 0068'e kadar göçlü iki karalama veritabanında eski şema ile
yeni şema + 0069 için `drizzle-kit push` ifade listeleri birebir aynı.

**GEÇİCİ TAKMA ADLAR — build 7 herkese ulaşınca silinecek.** Testteki iOS/Android build 6 eski
adlarla konuşuyor; aşağıdakiler yalnız onun için duruyor (hepsi yorumla işaretli):

- `src/app/api/lesson/route.ts`, `src/app/api/roleplay/route.ts` (yeni uçları yeniden dışa
  aktaran ince rotalar) ve `scripts/check-endpoints.mjs` ALLOW'daki iki satırı
- `src/lib/legacy-names.ts` ve çağrıları: istek gövdesi (`lessonId`, `roleplayDone`), tür
  (`roleplay`), sohbet kipi (`exam`), puanlı kısım kimlikleri (`:exam`), öğe kimliği
  (`-checkpoint1`), olay adları/türleri; `x-lernomi-client` build ≤ 6 olan istemciye
  `/api/immersion`, `/api/boss`, `/api/achievements` cevabında eski tür ve alan adları;
  anadil manifestinde eski madde adları (aynı hash); göstergede eski paket adıyla kapatma;
  tarayıcı deposu taşıması; hukuki yapılandırmada eski `roleplayTurnsPerDay` anahtarı
- `scripts/content-publish.ts`: eski adlı `lessons/<kurs>-<sv>` paketleri (eski projeksiyon)
- `src/lib/content/serve.ts`: deploy penceresi — canlı sürümde yeni adlı paket yoksa eski
  adlısı okunup yeni biçime çevriliyor (`deploy.sh` yayını en sonda yaptığı için)
- `mobile/src/lib/legacyNames.ts` (+ `accountScope`taki iki eski anahtar): cihazdaki eski
  kayıtların bir kez taşınması, eski paket dizininin silinmesi

KALICI (silinmeyecek): `next.config.ts`teki `/lessons…` → yeni yol 308 yönlendirmeleri
(dışarıya verilmiş bağlantılar) ve eski göç dosyaları (`drizzle/00xx`).

## 2a. Ürün kararları (2026-09-08'de verildi) — TARİHÇE, yerini §2 aldı

| | Ücretsiz | Premium |
|---|---|---|
| Kelime turu, okuma, dinleme | sınırsız | sınırsız |
| Yürüyüş modu **ekran açık** | sınırsız | sınırsız |
| Yürüyüş modu **cepte / ekran kapalı** | yok | var (günlük adil kullanım tavanı) |
| Deneme sınavı | seviye başına 1 | tamamı, 3'lü paketler hâlinde |
| Haftalık quiz | herkese açık, haftada 1 (takvim haftası) | aynısı |
| Konuşma/yazma alıştırması | 2 + 2 · **her 7 günlük seri +2/+2** | adil kullanım tavanına kadar |
| Ömürlük hak bitince | haftada 2 yenilenen hak | — |

**TEK HAVUZ, İKİ GİRİŞ KAPISI.** Patika ünitesindeki ve Beceriler
kütüphanesindeki konuşma/yazma alıştırması AYNI içerik
(`src/lib/skills/content`); kota alıştırmanın kimliğine düşüyor
(`claimSkillAi`), hangi kapıdan açıldığına değil. Paywall bir dönem bunları iki
ayrı satır olarak sayıyordu ("seviye başına 2 konuşma" + "kütüphanede 2") ve
birincinin karşılığı olan ayrı bir hak hiç yoktu — vaat, olmayan bir yüzeyi
anlatıyordu (2026-09-17'de tek satıra indirildi). Konuşma yolundan geçen tek
gerçek yüzey **puanlı kısım** ve o da aynı konuşma havuzundan yiyor
(`claimConversationAi`).

**KAPASİTE KARARLILIĞA BAĞLI.** Taban hak müfredatın tadına bakmaya yetiyor,
bitirmeye yetmiyor. Üstüne her `streakStep` (7) günlük seri kademesi
`streakBonus` (2) kadar konuşma VE yazma hakkı açıyor, `streakMaxTiers` (5)
kademeye kadar. Fikir deneme sınavı ilerlemesiyle aynı: hak edilen şey
açılıyor. Kilidi "paran yetmiyor" diye değil "devam edersen açılır" diye
kurmak hem doğru hem de kullanıcıyı uygulamada tutan şey; paywall bunu
`plan.free_streak_ai` satırıyla söylüyor.

Ölçü **`longest_streak`**, `current_streak` değil: kazanılan hak geri
alınmıyor. Bir gün kaçıran kullanıcı elindekini kaybetseydi kilit,
ödüllendirmek yerine cezalandıran bir şeye dönerdi.

**KOTA GERÇEKTEN HARCANIYOR.** 2026-09-16 denetiminin 2. bulgusu buydu: konuşma
yolu `canAiPractice` ile yalnız KONTROL ediyordu, sayaç hiç artmıyordu, yani
kontrol her zaman geçiyordu ve duyurulan hak fiilen sınırsızdı. Birim çağrı
değil **alıştırma**: hak ilk değerlendirmede düşüyor, aynı alıştırmayı tekrar
puanlatmak yeni hak yakmıyor.

**Yürüyüş bölmesi neden "ekran kapalı" üzerinden:** maliyetin tamamı orada.
Ekran açıkken cihazın kendi tanıyıcısı çalışıyor ve bize hiçbir şeye mal olmuyor;
ekran kapanınca sunucu STT'ye (Azure) düşülüyor. Bölme özelliğin kendisinde
değil, faturayı üreten yolda — ücretsiz kullanıcı yürüyüş modunu her gün
kullanabiliyor, premium'un ne olduğunu her gün görüyor.

**Deneme sınavı paketleri:** ilk paket her zaman açık. Sonraki paket iki yoldan
açılıyor — pakette **%60** başarı (başarı hızlandırır) **ya da** paketteki tüm
kâğıtların bitirilmesi (çaba da açar). İkincisi bir emniyet supabı: onsuz %60'ı
tutturamayan bir **ödeme yapmış** kullanıcı hiçbir yeni kâğıt göremez ve bu,
iadenin ve tek yıldızın en sık sebebidir. Panelden kapatılabilir; kapatılırsa
paywall metnine "puan yetmezse paket açılmaz" cümlesi eklenmeli.

**Davetin karşılığı premium süresi DEĞİL** (2026-09-17). Bir dönem davet
edilenin ilk ödemesinde davetçiye 7 gün yazılıyordu; iki yerden birden
kırılıyordu. (1) Teslim edilemiyordu: süre bakiyeye yazılıyor, ödeyen bir
davetçide ancak aboneliğini bırakırsa işe yarıyordu — mağaza tarafında gerçekten
teslim etmenin yolu var (Apple *extend renewal date*, Google *defer*) ama Apple
müşteri başına yılda iki çağrıyla sınırlı ve amaç olarak iyi niyet/kesinti
telafisi diye tarif edilmiş. (2) Teşvik gücü yoktu: 7 gün için getirilen kişinin
hem kurması hem ödemesi gerekiyordu, beklenen değer birkaç saatlik premium ve bir
ay gecikmeli.

Karşılık artık bir **bağlantı**: bağ kurulunca davet edilenden davetçiye
arkadaşlık isteği gidiyor, kabul edilince ortak seri başlıyor
(`lib/referral-link`, `lib/social/streaks`). İlk günden karşılığı var, mağaza
yüzeyi sıfır ve farm edilemiyor — değeri karşı tarafın gerçek ve aktif
olmasından geliyor. Davet bağlantısı yalnız **yeni hesaplar** için çalışıyor
(`INVITE_WINDOW_DAYS`); mevcut kullanıcılar birbirini arkadaş aramasından
ekliyor.

`grantBonus` duruyor ama davete bağlı değil: promo kodu, elle telafi ve destek
jesti onu kullanıyor. Aradaki fark, bunların **otomatik bir program olmaması** —
seyrek ve kasıtlı kullanımda "askıda kalan süre" vaka bazında yönetilebilir,
herkese vaat edilen bir mekanizmada yönetilemez.

**PAYWALL SATIRLARINA YENİ ANAHTAR EKLEMEK GERİYE UYUMLU DEĞİL.** Satırlar
sunucudan ANAHTAR + PARAMETRE olarak iniyor (`describeLimits`), çeviri
istemcinin GÖMÜLÜ sözlüğünden geliyor ve bilinmeyen anahtar ham hâliyle
basılıyor (`lib/i18n` `bul(key) ?? key`). Yani sunucuya yeni bir anahtar
eklemek, o anahtarı bilmeyen KURULU sürümlerde paywall'a "plan.free_practice"
gibi bir dizgi bastırıyor — emülatörde görüldü (2026-09-17). İki kural:

- **Mümkünse var olan anahtarı yeniden kullan**, metnini değiştir. Eski sürüm
  okunur bir cümle gösterir, yeni sürüm doğrusunu.
- **Parametre ÇIKARMA.** Fazladan parametre zararsız (yer tutucu yoksa yok
  sayılır), eksik parametre ekrana literal `{n}` bastırır. Bu yüzden
  `plan.free_weekly` metni `{n}` kullanmadığı hâlde parametre almaya devam
  ediyor.

Gerçekten yeni bir satır şartsa (ör. `plan.free_streak_ai`) bunu bilerek yap:
o satır ancak eklendikten SONRA derlenen sürümlerde görünür.

**"Sınırsız" denmiyor.** Premium'un da adil kullanım tavanı var ve paywall'da
yazılı. Tavanı olan bir şeyi sınırsız diye pazarlamak App Store 3.1.2 ve Play'in
abonelik beyanı kurallarına aykırı.

---

## 3. RevenueCat kurulumu — adım adım

> Sıra önemli: **önce mağazalarda ürünler**, sonra RevenueCat. RevenueCat
> ürünleri mağazadan okuyor; ürün yoksa bağlayacak bir şey de yok.

### 3.1 App Store Connect (iOS)

> **ÜRÜN KİMLİĞİ TEK KULLANIMLIK.** Apple bir kimliği silsen bile serbest
> bırakmıyor: aynı adla yeniden oluşturmaya çalışınca "already being used by
> another subscription" diyor. Yani yanlış kurulmuş bir aboneliği silip
> düzeltmek YOK — kimlik yanarsa yenisini seçmek ve kodu ona göre güncellemek
> gerekiyor (`src/lib/premium/gates.ts` → `plans.productMonthly/Yearly`).
>
> Bu bir kez yaşandı: `premium_monthly` / `premium_yearly` seviye sırasını
> düzeltmek için silindi ve iki kimlik birden yandı. **Seviye sırası silmeden
> değişiyor** — Subscriptions listesindeki *Edit* düğmesi yeterli.

1. **My Apps → Lernomi → Subscriptions** → **Create** bir *Subscription Group*:
   ad `Lernomi Premium`. (Aynı gruptaki ürünler arasında kullanıcı yükseltme /
   düşürme yapabiliyor; aylık ve yıllık **aynı** grupta olmalı.)
2. Gruba iki abonelik ekle. **Seviye sırası baştan doğru kurulmalı** (silmeden
   düzeltilebilir ama kimlik yakmamak için baştan doğru kur): üst seviye
   YÜKSELTME sayılıyor ve anında gerçekleşiyor, alt/aynı seviye dönem sonunu
   bekliyor. İçerik ikisinde aynı olduğu için ayrım süre — yıllık üstte:
   - **Level 1** · Product ID `lernomi_premium_yearly`, süre **1 Year**
   - **Level 2** · Product ID `lernomi_premium_monthly`, süre **1 Month**
   Ürün kimlikleri panelde yazılı olanla aynı olmalı (`/admin/premium` →
   *Planlar*), yoksa RevenueCat offering'i boş döner.
3. **Fiyat**: her ürün için *Subscription Prices* → önce **taban ülke** (US)
   fiyatı, sonra Apple'ın önerdiği ülke tablosunu aç ve şunları **elle** düzelt:

   | Bölge | Aylık | Yıllık |
   |---|---|---|
   | Türkiye | 199,99 ₺ | 1.199,99 ₺ |
   | Euro bölgesi | 4,99 € | 29,99 € |
   | Taban (US) ve diğer her yer | 4,99 $ | 29,99 $ |

   Apple listede olmayan ülkeleri tabandan dönüştürüyor; taban fiyat bu yüzden
   "global" satır.
4. **Ücretsiz deneme**: her ürün için *Subscription Prices → Introductory
   Offers* → **Free Trial**, süre **1 Month**, hedef *New Subscribers*.
   Panelde de aynı sayı yazılı olmalı (`Ücretsiz deneme (gün)` = 30).
5. **Localizations**: tr, en, de için görünen ad ve açıklama. Açıklama ne
   verdiğini SÖYLEMELİ (paketli deneme sınavları, cepte yürüyüş, adil kullanım);
   uygulamadaki paywall ile ayrışmamalı.
6. **App-Specific Shared Secret**: App Information → *App-Specific Shared
   Secret* → üret ve kopyala (RevenueCat isteyecek).
7. **In-App Purchase Key**: Users and Access → Integrations → In-App Purchase →
   anahtar üret, `.p8` dosyasını indir (RevenueCat'e yükleyeceksin; Apple'ın
   sunucu bildirimleri V2 için gerekiyor).

### 3.2 Play Console (Android)

> **DURUM (2026-09-23): 1–4. adımlar YAPILDI (API ile).** İki ürün, base plan'lar
> (`monthly-autorenew` P1M, `yearly-autorenew` P1Y) ve `free-trial-1m` teklifleri
> ACTIVE, 173 bölge, fiyatlar App Store ile aynı (ayrıntı AGENTS.md › Google Play ›
> Abonelik ürünleri). Kalan: 5. adım (RevenueCat servis hesabı) ve §3.3 panosu.

> **ÖN KOŞUL — bu bölüm bir yapı yüklenmeden AÇILMAZ.** Play, abonelik
> ürünlerini ancak imzalı bir AAB en az bir sürüm kanalına (en hızlısı
> *Internal testing*) yüklendikten sonra gösteriyor. Menüde *Subscriptions*
> soluk ya da boş görünüyorsa sebebi budur, hesap ya da yetki değil. iOS'ta
> böyle bir kısıt yok: App Store Connect'te uygulama kaydı yeterli.

1. **Monetise → Products → Subscriptions → Create subscription**
   - Product ID `lernomi_premium_monthly` → *base plan* `monthly-autorenew`,
     billing period **P1M**, **auto-renewing**
   - Product ID `lernomi_premium_yearly` → *base plan* `yearly-autorenew`,
     billing period **P1Y**, **auto-renewing**
2. Her base plan için **Offer** ekle: *Free trial*, süre **P1M**, uygunluk
   *New customers only*.
3. **Fiyat**: base plan → *Set prices* → Türkiye ve Euro ülkeleri yukarıdaki
   tabloya göre; kalan ülkeler için USD tabanından dönüştür.
4. **Aktifleştir** (Activate). Etkin olmayan bir base plan RevenueCat'e
   görünmez.
5. **Service account** — RevenueCat'in satın almaları Google'a doğrulatmasını
   sağlayan şey. Eksikse hiçbir Android aboneliği doğrulanmaz.

   a. **Google Cloud** (Play hesabına bağlı proje) → *APIs & Services* → şu **üç**
      API'yi etkinleştir: **Android Publisher API**, **Google Play Developer
      Reporting API**, **Cloud Pub/Sub API** (sonuncusu platform sunucu
      bildirimleri için).
   b. *IAM & Admin → Service Accounts* → yeni servis hesabı, **iki** rol:
      **Pub/Sub Editor** (bildirimler) ve **Monitoring Viewer** (bildirim
      kuyruğunun izlenmesi).
   c. Servis hesabı → *Keys → Add key → **JSON*** → inen dosya RevenueCat'e
      yüklenir. **Bu dosya SIR**: depoya da `.env`'e de girmez, yüklendikten
      sonra yerel kopyası silinir.
   d. **Play Console → Users and permissions** → servis hesabının e-postasını
      davet et ve **dört** yetkiyi ver:
      *View app information and download bulk reports (read-only)* ·
      *View financial data, orders, and cancellation survey responses* ·
      *Manage orders and subscriptions* ·
      *Manage store presence* (ürün oluşturma/güncelleme için).
   e. **36 saate kadar sürebilir.** Hemen çalışmazsa bozuk değil. Hızlandırma:
      *Monetize → Products*'ta bir ürün açıklamasını değiştir — bu genelde
      kimlik bilgilerini hemen ya da 24 saat içinde aktive ediyor.

### 3.3 RevenueCat panosu

> **DURUM (2026-09-23): kuruldu (API v2 ile).** Play ürünleri (`…:monthly-autorenew`,
> `…:yearly-autorenew`) `lernomi_premium` entitlement'ına ve geçerli offering
> **`lernomi_default`**'un `$rc_monthly` / `$rc_annual` paketlerine iOS ürünlerinin
> yanına bağlandı. Dikkat: geçerli offering `default` DEĞİL `lernomi_default`.
> Webhook ortamı yalnız production; sandbox için önce sunucu tarafı (IAP-1).

> **Pano 2025–26'da yeniden tasarlandı.** Dikey menüye geçildi, projeler üst
> düzeye çıktı ve **Product catalog** diye birleşik bir bölüm geldi (Products,
> Offerings, Entitlements, Virtual Currencies). API anahtarları ve entegrasyonlar
> eskiden "Apps" altındaydı, artık **Platforms** başlığı altında. Aşağıdaki adlar
> yeni panoya göre; eski düzendeysen adlar farklı görünür. Değişirse kaynak:
> [Product catalog](https://www.revenuecat.com/docs/getting-started/entitlements) ·
> [Webhooks](https://www.revenuecat.com/docs/integrations/webhooks) ·
> [API keys](https://www.revenuecat.com/docs/projects/authentication).

1. **Proje**: panonun üstündeki proje açılırından **+ Create new project** →
   `Lernomi`.

2. **Uygulamaları bağla** — proje panosunda **Apps** (yeni düzende **Platforms**
   altında; web sağlayıcıları için ayrıca **Web**):
   - **Google Play Store**: uygulama adı, paket adı `com.lernomi.learn`
     (`build.gradle`'daki **`applicationId`** — `namespace` olan `com.lernomi`
     DEĞİL), §3.2'deki **Service Credentials** (servis hesabı JSON'u).

     Aynı ekrandaki üç alan **boş bırakılır** ve üçünün de sebebi ayrı:
     · **Custom URL Scheme** — RevenueCat'in kendi hazır paywall'ının
       önizlemesi için. Biz onu kullanmıyoruz (paywall bizim kodumuzda),
       doldurmak AndroidManifest'e çalışmayan bir intent-filter eklemek olurdu.
     · **Financial reports bucket ID** — yalnız GEÇMİŞ finansal veriyi içe
       aktarmak için; yeni uygulamada geçmiş yok. Gerekirse Play Console →
       *Download reports → Financial* altındaki `gs://pubsite_prod_…`.
     · **Google Apps Experience / Games Level Up Program** — 1M doları aşan
       TEKRARLANMAYAN satın almalarda hizmet bedelini düşüren program. Biz
       yalnız abonelik satıyoruz; programa gerçekten katılmadan tarih yazmak
       komisyon hesabını bozar.
   - **Apple App Store**: uygulama adı, bundle `app.lernomi.ios`,
     **Shared Secret** ve **In-App Purchase Key** (.p8).
     İsteğe bağlı ama **işini kolaylaştırır**: **App Store Connect API Key** —
     bunu da verirsen RevenueCat ürünleri mağazadan doğrudan çekebiliyor, elle
     ürün girmen gerekmiyor.

3. **Ürünler** — **Product catalog → Products**:
   `+ New` → **Import Products** (mağazadan okur) ya da `+ New product` ile elle.
   İki uygulama için de `lernomi_premium_monthly` ve `lernomi_premium_yearly` görünmeli.
   Ürün kimlikleri panelde yazılı olanla aynı olmalı (`/admin/premium` →
   *Planlar*), yoksa offering boş kalır.

4. **Entitlement** — **Product catalog → Entitlements** → `+ New entitlement`,
   identifier **`lernomi_premium`**.
   (`premium` kullanılamıyor: RevenueCat yeni projeye örnek bir entitlement
   kuruyor ve o kimliği tutuyor. Yazım önemsiz, iki tarafın aynı olması önemli.)
   Bu değer `mobile/src/lib/billingConfig.ts` içindeki `entitlementId` ile
   **birebir** aynı olmalı.
   Entitlement'ı açıp **Attach** düğmesiyle dört ürünün (2 platform × 2 süre)
   hepsini bağla.

5. **Offering** — **Product catalog → Offerings** → `+ New`, identifier
   **`default`**. İçine gir, **+ Add package** ile iki paket ekle; **Identifier**
   alanı serbest metin değil, süreye göre bir **açılır liste**:
   - *Monthly* (RevenueCat'in ayırdığı kimlik: `$rc_monthly`) → `lernomi_premium_monthly`
   - *Annual* (`$rc_annual`) → `lernomi_premium_yearly`

   Sonra bu offering'i projenin **Default Offering**'i yap. Paywall fiyatları
   buradan okuyor; offering boşsa ya da varsayılan değilse fiyat gösterilemez.

6. **Webhook** — sol menüde **Integrations → Webhooks** → *Add new configuration*:
   - **Webhook Name**: serbest, ör. `Lernomi sunucu`
   - **URL**: `https://www.lernomi.app/api/premium/webhook/revenuecat`
   - **Authorization Header**: uzun rastgele bir sır üret
     (`openssl rand -hex 32`) ve **aynı değeri** üç env dosyasına da yaz:
     `.env.example` (boş bırak), yerel `.env`, sunucu `/opt/lernomi/.env` —
     anahtar adı `REVENUECAT_WEBHOOK_AUTH`.
   - **Environment filter**: **Production ve Sandbox (ikisi)**. 2026-09-23'ten
     beri sunucu sandbox olaylarını (TestFlight, Play iç test, lisans testçisi)
     KABUL ediyor: yetki yazılıyor ama `entitlements.store_environment` ve
     `store_events.environment` "sandbox" işaretleniyor, gelir ve abone
     sayıları onu dışarıda bırakıyor (denetim IAP-1: sandbox reddedilince test
     eden kişi satın almanın premium açtığını hiç göremiyordu). Kapatmak için
     sunucuda `REVENUECAT_ALLOW_SANDBOX=0`.
   - **App scope**: tüm uygulamalar — tek uç iki platformu da karşılıyor.
   - **Event type filters**: boş bırak. Adaptör tanımadığı olayı zaten sessizce
     geçiyor ve filtre koymak, ileride eklenecek bir olay türünü sessizce
     kaybettirir.

   RevenueCat 200 dışını **beş kez** yeniden deniyor. Uç bu yüzden yalnız gerçek
   hatada (401 yetkisiz, 503 yapılandırılmamış) 2xx dışı dönüyor; "bizim işimize
   yaramayan ama geçerli" olaylar 200 ile kapanıyor.

7. **SDK anahtarları** — **API keys** (yeni düzende **Platforms** altında; tek
   bir uygulamanınkine **Apps** → uygulamayı seçerek de bakılabilir). Android
   (`goog_…`) ve iOS (`appl_…`) **public** anahtarlarını
   `mobile/src/lib/billingConfig.ts` içine yaz. Bunlar **sır değil**, uygulama
   paketinde zaten gömülü; gizli olan `sk_…` ile başlayan secret anahtarlar ve
   onlara bu projede hiç ihtiyaç yok.

### 3.4 Sunucu tarafı

```bash
# üç env dosyasında da aynı anahtar kümesi olmalı (AGENTS.md senkron kuralı)
REVENUECAT_WEBHOOK_AUTH="…"      # §3.3-6'daki sır
REVENUECAT_ALLOW_SANDBOX=""      # boş = sandbox işaretli kabul; "0" = yok say
```

Sonra migration:

```bash
npx tsx scripts/apply-migration.ts drizzle/0041_premium_entitlements.sql
npm run db:check                 # şema ↔ kod sapması var mı
```

### 3.5 Doğrulama

- `curl -sI https://www.lernomi.app/api/premium/status` → 200
- RevenueCat panelinde webhook satırında **Send test event** → sunucu günlüğünde
  `[premium/webhook]` hatası olmamalı, yanıt 200 (`skipped: ignored_type`).
- Sandbox/test hesabıyla satın alma yap; `premium_grants` tablosunda `source =
  'store'` satırı görünmeli.

---

## 4. Yönetim paneli — `/admin/premium`

Buradaki her değer **canlıda geçerli**; kod değişikliği veya mağaza sürümü
gerekmiyor (en geç 30 saniyede üç platformda yürürlükte).

- **Ücretsiz katman**: seviye başına tabanlar (Patika Konuşma, Patika Yazma,
  Beceriler konuşma/yazma, deneme sınavı), dilim başına ek hak, seri adımı, kademe
  tavanı (0 = sınırsız), günde yürüyüş turu. `0` = "bu özellik ücretsizde hiç yok".
- **Kötüye kullanım tavanı**: premium'un günlük tavanı (yürüyüş turu,
  değerlendirme). Paywall'da kullanıcıya yazılıyor — değiştirirsen metin de
  kendiliğinden değişir. Sohbet mesajı tavanı kodda sabit (300).
- **Deneme sınavı paketleri**: paket boyu (paketi bitirince sonraki açılır).
- **Referans**: ödül günü, kişi başı tavan.
- **Planlar ve fiyat bilgisi**: ürün kimlikleri, deneme süresi ve **vitrin**
  fiyatları. ⚠️ Buradaki fiyatlar **mağazadaki fiyatı değiştirmez**; mobilde
  fiyat mağazadan gelir (politika gereği). Değiştirirsen App Store Connect ve
  Play Console'daki tutarları da elle eşitle.
- **Promo kodları**: üretim, listeleme, kapatma.
- **Davet sıralaması**: kim kaç kişi getirdi.

### Promo kodu ile 2–3 ay premium verme

1. `/admin/premium` → *Promo kodları*
2. `Kaç gün premium` = 60 ya da 90 · `Kaç kod üretilsin` = kaç kişiye
   vereceksen · `Kod başına kullanım` = 1 (tek kişilik) veya büyük bir sayı
   (kampanya kodu) · `Kampanya adı` = raporlama için
3. **Kod üret** → çıkan listeyi kopyala. Her satırda kodun yanında dağıtım
   bağlantısı var:
   `https://www.lernomi.app/premium?code=KOD`
   Bağlantıya tıklayan kullanıcıda kod alanı dolu geliyor.
4. Kod üç platformda da geçerli; mağazadan bağımsız. Süre kullanıcının
   bakiyesine ekleniyor — abonesi varsa yanmıyor, aboneliği bitince başlıyor.

Kodlar **silinmiyor**, kapatılıyor: kullananların geçmişi ayakta kalsın.

### Davet (referans)

- Her kullanıcının ömür boyu sabit bir kodu var (`profiles.referral_code`,
  ilk istendiğinde üretiliyor).
- Davet edilen kişi kodla kayıt olunca bağ kuruluyor (`referrals`), **ödül
  verilmiyor**.
- Davet edilenin **ilk gerçek ödemesi** alındığında davetçiye 7 gün düşüyor.
  Ödüller bakiyede **birikiyor**: üç davet = 21 gün.
- Bir kişi yalnız **bir kez** davet edilmiş sayılıyor; ilk davetçi kazanıyor.

---

## 5. RevenueCat'ten ayrılmak

Mimarinin sınavı bu. Yapılacaklar:

1. **Yeni adaptör**: `src/lib/premium/providers/<ad>.ts` — `StoreAdapter`
   arayüzünü uygula (`configured()` ve `parse()`). Sağlayıcının olaylarını
   `StoreEvent`e çevir; `ports.ts` ne beklendiğini alan alan anlatıyor.
2. **Kayda ekle**: `providers/index.ts` içindeki `ADAPTERS` haritasına bir
   satır. Webhook ucu `/api/premium/webhook/<ad>` olarak kendiliğinden açılır.
3. **Mobil satın alma**: `mobile/src/lib/billing.ts` içindeki beş fonksiyonu
   yeni SDK ile yaz (`configureBilling`, `getPackages`, `purchase`, `restore`,
   `billingLogout`). Ekranlar bu imzaları çağırıyor; imzalar korunursa hiçbir
   ekran değişmez.
4. **Geçiş**: iki sağlayıcı bir süre **aynı anda** açık kalabilir — ikisi de
   aynı deftere yazıyor. Eski aboneler eski sağlayıcıdan yenilenmeye devam
   eder, yeni satın almalar yenisinden gelir. Kimse yetkisini kaybetmez.
5. **Değişmeyenler**: `entitlements`, `premium_grants`, promo, davet, kotalar,
   admin paneli, `/api/premium/*` uçları, web ve mobil arayüzler.

Web'e kendi ödeme yolunu (Stripe) eklemek de aynı iş: bir adaptör. Web
**komisyonsuz** tek kanal — Apple ve Google %15–30 alıyor. Bugün web'de satın
alma yok ve sayfa bunu açıkça söylüyor ("yükseltme uygulamadan yapılıyor");
kilit gösterip satın alma yolu sunmamak kullanıcıyı çıkmaza sokardı.

---

## 6. Yerelde testi koşturmak

Yetki katmanının 32 doğrulaması **gerçek** Postgres istiyor; sınadıklarının
yarısı veritabanının kendi davranışı (benzersiz kısıtın çakışması, kayıp
güncelleme, `now()`un cümle içinde değerlendirilmesi). CI bunu bir servis
kabıyla koşuyor; yerelde bir kap yetiyor:

```bash
docker run -d --name lernomi-pgtest --network host \
  -e POSTGRES_PASSWORD=test -e POSTGRES_DB=lernomi \
  -e PGPORT=55432 postgres:17-alpine

export DATABASE_URL=postgres://postgres:test@127.0.0.1:55432/lernomi
export TEST_DATABASE_URL=$DATABASE_URL
npx tsx scripts/migrate-all.ts     # 45 migration, sıra _journal.json'dan
npx tsx scripts/schema-check.ts    # şema ile veritabanı uyumlu mu
npm run test:entitlement           # 32 doğrulama
```

`--network host` tercih değil zorunluluk: bu makinede docker'ın köprü ağı
(`veth` çifti) desteklenmiyor, varsayılan ağla kap ayağa kalkmıyor. Port
5432 yerine 55432 seçilmesinin sebebi de bu — host ağında yerel Postgres ile
çakışmasın.

`migrate-all.ts` adres localhost değilse **baştan reddediyor**; test de aynı
şekilde. Üretim veritabanına yanlışlıkla bağlanmak bu iki kapının arkasında.

---

## 7. Sınanacaklar (mağaza hesapları gerektirir)

- [ ] Sandbox satın alma → `premium_grants`'e `store` satırı düşüyor mu
- [ ] Deneme başlangıcı → yetki açılıyor, `store_paid_at` **boş** kalıyor
- [ ] Deneme → ücretli geçiş → `store_paid_at` doluyor, davetçiye 7 gün düşüyor
- [ ] İptal → süre sonuna kadar erişim sürüyor (`canceled`)
- [ ] İade → erişim **derhal** kapanıyor (`refunded`)
- [ ] Promo kodu → üç platformda da aynı anda açılıyor
- [ ] Hediye süresi çalışırken abone olmak → kalan hediye bakiyeye dönüyor
- [ ] Ücretsiz hesapta cepte yürüyüş → 403 `premium_required`
- [ ] Ücretsiz hesapta taban hak bitince → haftalık hakka düşüyor
- [ ] 7 günlük seriden sonra hak sayısı artıyor (taban + kademe)
- [ ] Kilitli deneme kâğıdının kimliğini doğrudan uca göndermek → 403
- [ ] Abonelik bitince premium ekranlar kilitleniyor, **ilerleme silinmiyor**
