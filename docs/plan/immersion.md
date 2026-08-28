# Immersion — ikinci mod (skills → derslere harmanlanmış)

Durum: KOD TAMAM (Faz 1/2/3/4 + gating + quiz/checkpoint türetme). 2026-08-28.
`/immersion` gezilebilir: dersler (iskelet, gating) + beceriler (köprü/placeholder)
+ quiz/checkpoint (ünitenin kendi kelime/kalıbından TÜRETİLEN oynanabilir pratik).
Kalan: içerik authoring (temalı read/listen/write + gramer) + quiz tamamlanma
sunucu kaydı (follow-up) + opsiyonel `user_skills` DELETE (senin elinle).

## Tez
Duolingo Almanca-Türkçe B1'i bitirdi ama **cümle kurmayı / kendini ifade etmeyi
sağlamadı**. Bu ürünün tezi tam o boşluk: **kullanıcının kendi cümlelerini
kurmasına yardım.** İki mod:

- **Mod 1 — Learn:** kelime öğrenme + hatırlama (mevcut SRS/oyun çekirdeği). Değişmiyor.
- **Mod 2 — Immersion:** dili özümseme + üretim. Mevcut "Dersler"in genişletilmiş,
  beceri+sınav-harmanlı hâli. "Beceriler" bölümü tamamen kalkar; içeriği buraya serpilir.

## Mevcut yapı (göçün üzerine kurulacağı zemin)
- **Ders** = anlatım adımları (`say` + `produce`=kendi cümleni kur + `truefalse`) + roleplay.
  Zaten üretim/immersion birimi. (`lib/lessons/types.ts`)
- Her CEFR seviyesi → **10 tematik modül × 10 ders = 100/seviye** (de KURULU: 500 ders).
  buildTrack bunu 4'erli böler → **seviye başına 25 ünite** (gating grupları 1–10, 11–20, 21–25).
  Temalar `modules.ts` `MODULE_THEMES`. Modül = sunum kavramı (katalog 10'arlı dilimlenir).
- **Modül sınavı** + `moduleClears` → gating altyapısı hazır (`/lessons/sinav/[level]/[module]`).
- Beceri okuma/dinleme/yazma egzersizleri: `skill_exercises` (DB, 120/120/80) + `userSkills`.
  Oynatıcılar iyi: `reading-player`, `listening-player`, `writing-player` — KORUNUR, item render eder.

## Yeni model
- **Track** (kurs+seviye başına) = sıralı **Unit**'ler.
- **Unit** (≈ mevcut modül, temalı) = sıralı **Item**'lar + sonda **checkpoint**.
- **Item tipleri** (harman — Duolingo'daki farklı düğümler gibi):
  - `lesson`  → mevcut ders (üretim/roleplay omurgası)
  - `read` / `listen` / `write` → mevcut beceri egzersizleri (oynatıcılar yeniden kullanılır)
  - `grammar` → odaklı dilbilgisi mini-drill (cheatsheet/drill'den; içerik sonra)
  - `quiz`   → kısa karışık hatırlama (ünitenin kelime+kalıpları)
  - `checkpoint` → ünite/grup bitirme sınavı → sonraki grubu açar
- İçerik ince; plan **slotları** tanımlar, içerik zamanla dolar (A1 100 başlık gibi).

**Serpiştirme deseni (sahibin kararı):** ünite = **4 `lesson` + 2 `read` + 2 `listen`
+ 2 `write`** (+ ara sıra `grammar`/`quiz`), sonda `checkpoint`. Beceriye ağırlık verilmiş
(4/2/2/2), tek yönlü değil dört yönlü.

## İçerik stratejisi (sahibin kararı)
- **KALIR (TEK iskelet):** yalnız `lesson` içeriği. **Her şey lessonların üzerine inşa edilir** —
  lesson, ünitenin iskeletini ve temasını belirler; diğer item tipleri ona göre türetilir.
- **SİLİNİR + sıfırdan kurulur:** `read`/`listen`/`write` (120/120/80), **`grammar`**, `exam`, `quiz`
  içeriğinin TAMAMI. Hepsi yetersiz; grammar↔lesson bağlanma noktaları sınırlı olduğu için grammar
  da dâhil. **Motor/oynatıcılar korunur, yalnız İÇERİK silinir.**
- Yeni read/listen/write/grammar/quiz/checkpoint içeriği **ünitenin lesson içeriğine göre başlık
  belirlenip** ona göre şekillenir — bir sonraki (içerik) adımda, zamanla.
  - **ARAÇ HAZIR:** `lib/immersion/brief.ts` (`unitBriefs`/`buildUnitBriefs`) her üniteyi kendi
    4 dersinden **tema + hedef kelime + kalıp + cando**'ya indirger — temalı içeriğin ŞARTNAMESİ.
    `npm run briefs -- A1 de` insan-okur döküm verir. Yeni içerik bu havuzu kullanmalı ki
    ünite dersleriyle aynı dünyada olsun. ("lesson'a göre türetilir" bunun somut hâli.)
- Göç sonrası track: ünitelerde 4 lesson + boş/placeholder (read/listen/write/grammar/quiz) slotları
  + checkpoint; slotlar yeni içerikle dolar.

## Gating / ilerleme (Duolingo mantığı)
- Kullanıcının CEFR'i (`profiles.level`) → **başlangıç ünitesi**.
- Altındaki üniteler açık (tekrar/serbest); seviyesinden itibaren **kilitli**:
  bir üniteyi bitirince sonraki açılır.
- Ekranda ilk N ünite; gerisi kilitli + **sayfalı** ("ilk 10, sonra 11–25…").
- Checkpoint geçme eşiği (örn. ≥%70) grup→grup geçişi kapısı.

**Gating ölçütü — AŞAMALI (uygulama kararı, `state.ts`):**
- **Şimdi (interim): İSKELETE bağlı** — ünite, DERSLERİ bitince tamamlanır ve
  sonrakini açar. Beceri/gramer/quiz **opsiyonel zenginleştirme**, bloklamaz.
  Gerekçe: bu içerik seyrek ve temaya göre yeniden kuruluyor; tematik olarak
  rastgele/eksik içeriği kapı yapmak yanlış olurdu. "lesson = iskelet" kararıyla
  birebir. Placeholder (ref=null) item'lar zaten hiç saymıyor.
- **Sonra (temalı içerik oturunca): "tüm item'lar"a sıkılaştırılır** — o zaman her
  ünitede tekdüze temalı beceri+checkpoint olacağı için kapı adil olur.

## Nereye ne gidiyor
| Eski | Yeni |
|---|---|
| Dersler `de-a1-b01`… | `lesson` item'ları — track omurgası |
| Beceri okuma/dinleme/yazma **içeriği** (`skill_exercises`) | **SİLİNİR**; `read`/`listen`/`write` item slotları ünite içeriğine göre sıfırdan kurulur (oynatıcılar korunur) |
| Dilbilgisi içeriği (cheatsheet/drill) | **SİLİNİR**; `grammar` item'ları lessonlara göre sıfırdan (bağlama noktaları sınırlıydı) |
| Sınav + quiz **içeriği** | **SİLİNİR**; `checkpoint`/`quiz` ünite içeriğine göre yeniden (motor korunur) |
| Modül sınavı düzeni + seviye | `checkpoint` (motor yeniden kullanılır) |
| **Skills bölümü / `/skills` slug / hub / meta / `SkillId` kavramı** | **tamamen kaldırılır** |
| reading/listening/writing **oynatıcıları** | KORUNUR, immersion item renderer olur |

## Progress (BASİTLEŞTİRİLDİ — sahibin kararı)
- **`userLessons` KALIR** — ders (lesson item) ilerlemesi + SRS `dueAt` dokunulmaz.
- **`userSkills` eski verisi (opsiyonel) SİLİNEBİLİR** (yalnız Samet'in testi). ZORUNLU değil:
  aynı exercise id'leriyle tablo yeniden kullanıldığından eski ilerleme immersion'da geçerli kalır. Tablo,
  immersion beceri-item ilerlemesi için **yeniden kullanılır** (ileride `user_items`'a
  yeniden adlandırma opsiyonel bir temizlik; şart değil).
- **Karmaşık birleşik-göç YOK.** Sadece: userSkills DELETE + userLessons'a dokunma.
- Gating: `moduleClears` checkpoint kaynağı olarak kalır (ya da checkpoint item'ına devrolur).

## Fazlar (her biri tsc+build doğrulanıp commit'lenir)
1. **Model + builder:** ✅ TAMAM (commit sonrası). `src/lib/immersion/{types,build}.ts` —
   `ImmersionItem`/`Unit`/`Track` + saf `buildTrack(input)` (4/2/2/2 + ara sıra grammar/quiz +
   checkpoint, grup=10) ve DB sarmalayıcı `loadTrack(course, level)`. `test:track` 16 kontrol.
   DB değişmedi. Bugün: de her seviye 25 ünite.
2. **UI:** ✅ TAMAM. `/immersion` sayfası (`app/(app)/immersion/{page,loading}.tsx`) +
   `components/immersion/immersion-hub.tsx` (sunucu bileşeni, JS yok): seviye çipleri →
   gruplar (10 ünite, pagination kapısı) → ünite kartları → item satırları. Item'lar
   MEVCUT oynatıcılara köprüyle bağlanır (ders→`/lessons/[id]`, beceri→`/skills/[id]`);
   yer tutucular (grammar/quiz/checkpoint + boş beceri slotları) "yakında", tıklanmaz,
   gating'i bloklamaz. Nav 2 moda indi: **Öğren + Immersion** ("Dersler" ve "Beceriler"
   sekmeleri kalktı; rotalar Faz 4'e kadar köprü hedefi olarak duruyor). Checkpoint motoru
   (module-exam/boss) içerik gelince Faz 3'te bağlanır.
3. **Progress bağlama:** lesson item → userLessons; read/listen/write/grammar/quiz item →
   userSkills (eski veri silinmiş). Checkpoint geçme → gating.
4. **Kaldırma:** ✅ TAMAM (kod). `/skills` UI rotaları (page/[id]/loading) + `skills-hub`
   silindi; skill oynatıcıları `app/(app)/immersion/skill/[id]` altına taşındı (aynı oynatıcı
   bileşenleri). Tüm `/skills` bağlantıları `/immersion`e, tüm `/skills/[id]` üretimleri
   (`nextStep`, plan, immersion) `/immersion/skill/[id]`e çevrildi; oynatıcı "geri" linki
   `/immersion`. **KORUNDU:** `lib/skills/*` (types/index/bundled/content/record/progress),
   oynatıcılar, `/api/skills` (ilerleme yazımı), `SkillId` TİPİ — roleplay/exam/proficiency/
   immersion bunlara dayanıyor; kaldırılan yalnız kullanıcıya dönük skills BÖLÜMÜ.
   **BEKLEYEN (opsiyonel, elle):** `user_skills` eski satırlarının DELETE'i — DB bu oturumdan
   erişilemiyor; ayrıca ZORUNLU değil: tablo aynı exercise id'leriyle yeniden kullanıldığından
   eski ilerleme immersion'da zararsızca korunur. Temiz sayfa istenirse: `DELETE FROM user_skills;`

## Kararlar (SONUÇLANDIRILDI — 2026-08-28)
- **Slot deseni:** 4 lesson + 2 read + 2 listen + 2 write; grammar `index%3==0`,
  quiz `index%2==0`; sonda checkpoint. (UYGULANDI — `build.ts`.)
- **Grup boyutu:** 10 ünite/grup. Seviye(25) → gruplar 1–10, 11–20, 21–25. (UYGULANDI.)
- **Unlock eşiği (AŞAMALI):**
  - Ünite geçildi = dersleri bitti (iskelet). (UYGULANDI — interim.)
  - Grup→grup = önceki grubun tüm üniteleri complete → sonraki grup görünür. (UYGULANDI — hub.)
  - İleride (checkpoint gelince): checkpoint ≥%70 → ünite geçildi (kural sıkılaştırılır).
- **Quiz biçimi:** ünite brief'inden **OTOMATİK TÜRETİLİR** — 6–8 karışık hatırlama
  (de↔tr kelime, kalıp eşleştirme), mevcut `SkillQuestion` + `quiz.tsx` UI'siyle.
  İÇERİK YAZIMI GEREKMEZ, hep tema-hizalı. Distraktörler diğer ünitelerin havuzundan.
- **Checkpoint biçimi:** ünite-sonu hatırlama sınavı — aynı brief-türetme, daha uzun
  (~10–12), geçme ≥%70 → ünite cleared. quiz UI yeniden kullanılır; 10-derslik
  modül-sınavı DEĞİL (ünite≠modül). Geçiş `userSkills`e checkpoint item id'siyle yazılır.
- **Grammar biçimi:** ünitenin baskın kalıbına (brief.patterns) odaklı kısa mini-drill —
  ünite başına hafif elle ya da türetme. En düşük öncelik (gramer en zayıf halkaydı).
- **Çok dillilik:** motor dil-parametrik (`course` zemini var), içerik tek çifte odaklı;
  PMF/tek-çift kanıtından sonra genişletilir (ayrı iş).

## İçerik pilotu: A1 Ünite 1 "Tanışma ve ben" — TAM (2026-08-28)
İlk eksiksiz tema-hizalı ünite (13 item hepsi oynanır):
- **read/listen/write ×2/2/2** (`content/a1-u01.ts`) — yalnız ünitenin 20 kelimesi +
  12 kalıbı; A1 başlangıç için çoğu MCQ + boşluk-doldurma/sıralama (dikte/serbest yok).
  Dizinin başında → builder ünite 1'e yerleştirir (konum). Eski genel A1 sonraki ünitelere kaydı.
- **grammar + quiz + bitiş sınavı** (`lib/immersion/content/de-a1-u01.ts`, 8+8+10 soru) — elle
  yazılmış; gramer artık gerçek-oynanabilir (`/immersion/grammar/[unit]`), quiz/checkpoint
  elle-yazılmış öncelikli yoksa deriveQuiz.
- **Slot deseni değişti:** her ünite TAM TAKIM (grammar+quiz+checkpoint her ünitede). `unit`
  alanı egzersizlere eklendi (belgeleme; ileride konum-bağımsız yerleşim).
- test:content: benim içeriğim bütçeye SIFIR yeni borç ekledi (kalan aşımlar eski lessons borcu).

Sıradaki ünitelerin şablonu bu. İçerik-yerleşim ileride `unit` tag'iyle konum-bağımsız olabilir.

## Kalan iş
- **Kod:** ✅ quiz/checkpoint OTOMATİK TÜRETME (generator + oynatıcı rota) TAMAM — item'lar
  "yakında"dan gerçek-oynanabilire döndü (`/immersion/quiz/[unit]`, brief'ten türetilen pratik).
  - Follow-up (opsiyonel): quiz tamamlanma SUNUCU kaydı — hafif yeni uç nokta gerekir
    (`/api/skills` gerçek exercise ister, türetilene uymaz); şimdilik pratik gating yapmıyor.
  - `grammar` item'ı hâlâ "yakında" — türetilemez (gerçek dilbilgisi anlatımı ister).
- **İçerik authoring (ayrı, zamanla — senin pipeline'ın):** `read`/`listen`/`write`
  gerçek metin/ses ister, türetilemez. `npm run briefs -- <LEVEL> de` şartnamedir; yeni
  içerik ünitenin brief havuzunu (tema+kelime+kalıp) kullanmalı. Gramer içeriği isteğe bağlı.
- **DB (senin elinle, opsiyonel):** `DELETE FROM user_skills;` temiz sayfa istenirse.
