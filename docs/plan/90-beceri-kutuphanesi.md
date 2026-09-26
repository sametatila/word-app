# Beceriler kütüphanesi — serbest çalışma (WP-90)

**Ne.** Patika öğrenciyi bir sıraya sokar (ünite → konuşma → yuva). Beceriler onun yanındaki
kütüphane: öğrenci seviyeyi ve beceriyi kendi seçer, her egzersizde geri bildirim alır, bitirince
"sıradaki"yi görür. İki kurs (Almanca, İngilizce) × beş seviye (A1–C1) × beş beceri (okuma,
dinleme, yazma, konuşma, dil bilgisi) × 20 = **1.000 egzersiz** (her kursta 500). Dört anadil
çiftinde oynanır: tr→de, tr→en, en→de, de→en. Web, Android ve iOS aynı içeriği oynatır.

**Neden ayrı.** Kütüphane egzersizlerinde `unit` alanı yok. Patika yalnız `unit` taşıyanları
kullanır (`pathMetas`, `lib/immersion/build.ts` `loadTrack`); Beceriler yalnız taşımayanları
gösterir (`libraryMetas`). Aksi hâlde kütüphane Patika'nın boş yuvalarına akardı.

## Yapı

| Katman | Nerede | Not |
|---|---|---|
| Tip | `src/lib/skills/types.ts` | `GrammarExercise`, `isLibraryExercise`, `targetLangOf` |
| İçerik | `src/lib/skills/content/library/<kurs>-<seviye>[-pN].ts` → `library/index.ts` → `bundled.ts` | Kimlik `<kurs>-<seviye>-lib-<r\|l\|w\|s\|g><n>`; `en-mobile-2026.ts` mobilden taşınan İngilizce egzersizler |
| Sunum | Web `skill_exercises` tablosundan; mobil içerik teslim hattından (paket `skills/<kurs>-<seviye>`, `content:publish`) | Tablo her deploy sonunda `db:seed:skills` ile tazelenir (`deploy.sh`); içerik uygulama sürümü beklemez |
| Web | `src/app/(app)/skills/page.tsx` + `components/skills/skill-browser.tsx`; oynatıcı `immersion/skill/[id]` | Beş beceri karosu (ad, n/20, ilerleme), seçili becerinin listesi, "bitenleri gizle" |
| Mobil | `mobile/src/screens/SkillsScreen.tsx`, `ItemScreen.tsx`, `game/skillLibrary.tsx`, `game/skillQuiz.tsx` | Söyleyiş drilli cihaz tanıyıcısıyla; monolog `listenOnce` döngüsü → `/api/assess` |
| Ses | Sunucu TTS (`/api/tts`) | Dinlemede konuşmacı başına ayrı ses (`lib/tts/speakers`, mobil aynası); gerçek kayıt (`segments[].audio`) yok |
| Doğrulama | `npm run test:content -- skills`, `check:libvocab -- <kurs> <seviye>`, `audit:skills`, `report:library` | Çeviri kapıları: `check:skills-native`, `check:native-de`, `check:skills-task`, `check:skills-task-de` |

Hedef dil `course` alanından türer: İngilizce kursta `de` alanı İngilizce metin taşır (tarihsel ad);
oynatıcılar sesi, tanıyıcıyı ve rubriği `targetLangOf` ile seçer; `/api/assess` `lang` alanını okur.

## İçerik kuralları

Şartname `data/content/SPEC.md`.

- **Kopya yok.** Patika konuşmaları, ünite egzersizleri ve deneme sınavlarıyla aynı sahne/metin yok.
  `report:library` sekiz kelimelik pencerelerle kopya denetler.
- **Havuza riayet.** Metin seviyenin ve alt seviyelerin kelime havuzunda kalır; havuz dışı hedef
  A1/A2 ≤ %10, B1 ≤ %15, B2/C1 ≤ %20 (`check:libvocab`, rapor; kapı değil).
- **Seviyeler arası tekrar yok.** Dil bilgisi odağı SPEC tablosunda hangi seviyedeyse orada kalır;
  daha derin bir katman (Futur I → Futur II) serbest. Yeni parti yazılırken öteki seviyelerin
  odakları, monolog soruları ve sahneleri de karşılaştırılır.
- **Geri bildirim her yerde.** Her soruda `explain`; yazma ve monologda rubrik (`/api/assess`);
  söyleyiş drillinde `confusions`.
- **Seviyeye göre biçim.** Konuşma A1–A2 söyleyiş drilli, B1–C1 monolog. Dil bilgisi: anlatım
  (Türkçeyle karşıtlık) + 8–10 soru.
- **Soru kökü tek dilde.** Hedef dildeki kökte Türkçe ipucu olmaz (öteki anadile sızar); öğrenciye
  görünen metinde iç numara ("parti 8'de gördün") olmaz.
- **Yazma görevleri** `build`, `free`, `reply`, `form`, `rewrite`, `summary`; mobil `reply` ve
  `summary`yi serbest yazma kartıyla oynatır.

## Sınavların yeri

| Sekme | İçindekiler |
|---|---|
| Öğren | deneme sınavları · haftalık quiz |
| Patika | konuşmalar · ünite egzersizleri · ünite quizi · modül sınavları · seviye sınavı |
| Beceriler | yalnız serbest çalışma kütüphanesi |

Modül sınavı Patika'da, çünkü soruları modülün konuşmalarından üretilir ve konuşmalar geçilmemişse
sınav "deneme" sayılır. Web `components/immersion/immersion-hub.tsx`, mobil `PathScreen`
(`ExamScreen`i açar). Mobil modül listesi `/api/exam?level=…`den gelir.

## Açık noktalar

- iOS'ta monolog `listenOnce` döngüsü cihazda doğrulanmadı.
- Dinleme için gerçek insan kaydı yok; ses TTS.
