# Faz 2 — Konuşma

Rapor: 24 egzersiz; ASR metin eşleştirmesi, telaffuz puanı yok; öz-değerlendirme her drilde açık; diyaloglar anahtar kelimeyle dallanıyor; rol yapma AI'a bağlı. Hedef: ölçülebilir telaffuz ve konuşma üretimi, seviye başına yeterli içerik, sınav niteliğinde rol yapma.

---

## WP-20 · Telaffuz puanlama

**Amaç.** "Tanındı/tanınmadı" yerine kelime ve ses düzeyinde puan; kullanıcı neyi yanlış söylediğini görsün ve duysun.

**Mevcut kod.** `src/lib/speech.ts` (`judgeSpeech`, `confusions`, `normalizeSpoken`), `src/components/microphone.ts` (tarayıcı `SpeechRecognition`), `src/components/pocket-mic.ts` + `/api/stt` (`getUserMedia` kayıt → Deepgram), `src/components/skills/speaking-player.tsx`, `src/lib/coach.ts`.

**Tasarım — karar adımı (ilk gün).** İki aday, ölçülerek seçilir:
1. **Azure Speech Pronunciation Assessment**: fonem/kelime doğruluğu, akıcılık, bütünlük, prosodi; Almanca destekli; ücretli, yeni sağlayıcı.
2. **Deepgram** (zaten var): kelime güven skoru + zamanlama; fonem yok. Yedek/ucuz yol.
   Karar ölçütü: 20 kayıtlık küçük setle (5 konuşmacı × 4 cümle, biri bilerek hatalı) insan puanıyla korelasyon; maliyet/dk. Sonuç `docs/plan/pronunciation-eval.md`'ye.
- Mimari: istemci kaydeder (`pocket-mic.ts` deseni, 16 kHz mono, ≤ 15 sn) → `POST /api/pronounce {audio, target, level}` → `{ overall, words: [{w, score, phones?: [{p, score}]}], fluency, completeness, transcript }` → `assessments`'a kayıt (kind: speaking).
- UI: hedef cümle üzerinde kelime ısı haritası (yeşil/sarı/kırmızı), zayıf kelimeye dokununca doğru telaffuz (TTS) + kullanıcının kendi kaydı yan yana; `confusions` ipucu korunur; puan ≥ 80 geçer, altı "tekrar dene" (2 deneme sonra "devam").
- Öz-değerlendirme ("Doğru söyledim") yalnız `judge: "self"` egzersizlerde kalır; ASR'lı drillerde kaldırılır.
- Tarayıcı ASR'ı yedek olarak kalır (sağlayıcı yoksa mevcut davranış).

**Adımlar.**
1. Değerlendirme seti + sağlayıcı karşılaştırması; karar.
2. Sağlayıcı adaptörü (`chat-providers.ts` içine `pronounceProviders()`), route, kota.
3. `speaking-player` ısı haritası + kayıt oynatma.
4. Ders `repeat/produce` adımlarına aynı puanlama (opsiyonel bayrak; ders akışını yavaşlatmamalı — puan gösterilir, geçiş şartı ≥ 60).
5. Yürüyüş modunda puan yalnız kaydedilir (ekran yok).

**Kabul.** Bilerek yanlış söylenen ünlü uzunluğu kırmızı kelime olarak görünüyor; puanlar `assessments`'ta; sağlayıcı kapalıyken eski davranış.

**Süre.** 6–8 gün. **Bağımlılık.** WP-03 (kayıt tablosu), sağlayıcı kararı.

---

## WP-21 · Konuşma içeriği genişletme ve monolog görevleri

**Amaç.** 24 → seviye başına ≥ 10 drill (toplam ≥ 60) + her seviyede 30–60 sn monolog görevleri.

**Mevcut kod.** `src/lib/skills/content/speaking.ts`, `zh-speaking.ts`, `types.ts` (`SpeakingDrillExercise`, `SpeechConfusion`), WP-70 içerik hattı.

**Tasarım.**
- Drill temaları (Türkçe konuşana özgü sapmalar): ch (ich/ach), r (uvular), ü/ö, z=ts, w/v, sp/st, ei/eu, uzun/kısa ünlü, sözcük vurgusu, cümle tonlaması (soru/emir), bağlantılı konuşma.
- Yeni tür `SpeakingMonologueExercise`: `{ prompt_tr, bullets_tr[], targets (kalıplar), minSeconds, maxSeconds, sample_de, rubric_hint }`. Akış: hazırlık 30 sn (madde işaretleri) → kayıt → transkript (STT) → WP-03 `assess(kind:"speaking")` (içerik/dilbilgisi/kelime) + WP-20 telaffuz → birleşik kart.
- Seviye başına 4 monolog (A1: kendini tanıt, günün, ailen, hobin … C1: fikir savun).

**Adımlar.**
1. Tip + doğrulayıcı (WP-70).
2. İçerik: 40 drill + 20 monolog (WP-72 ile).
3. `monologue-player.tsx` (zamanlayıcı, kayıt, sonuç kartı).
4. Beceri merkezinde "Konuşma" sekmesine türler.

**Kabul.** Her seviyede en az 10 drill + 4 monolog; monolog sonucu puan + düzeltilmiş özet; sağlayıcısız: transkript yok → "kendi kaydını dinle + kontrol listesi" yedeği.

**Süre.** 5 gün (+ içerik). **Bağımlılık.** WP-03, WP-20, WP-70/72.

**Durum (2026-08-26).** Adım 1, 3, 4 bitti; adım 2'nin monolog yarısı bitti (20), drill yarısı (40) WP-72'de. `types.ts` `SpeakingMonologueExercise { monologue: { promptTr, bulletsTr, targets, minSeconds, maxSeconds, sampleDe, rubricHint? } }`; `check-content.ts` monolog kuralları (3–5 madde, süre 20–120, örnek ≥30 kelime); `content/monologue.ts` 20 görev (A1 kişisel bilgi → C1 savunma), `bundled.ts`'e eklendi, `db:seed:skills` ile üretimde (364 egzersiz). `monologue-player.tsx`: hazırlık (30 sn geri sayım, madde işaretleri, kalıplar) → kayıt (sayaç, alt/üst sınır, sürekli tanıyıcı + MediaRecorder) → kontrol (ses oynatıcı, düzenlenebilir transkript, kalıp kullanımı işaretleri) → `askAssess(kind: speaking)` → `AssessmentCard` + kalıp çipleri + örnek monolog; tanıyıcısızsa kontrol listesiyle öz değerlendirme. Beceri merkezinde Konuşma sekmesinde "Monolog" türü (genre). Kanıt: `reports/shots/wp21-monologue-{prep,record,review,result}.png`, `wp21-hub-card.png` (a1-m1 uçtan uca: rubrik 4/4, +400 XP).

---

## WP-22 · Rol yapma sınav modu

**Amaç.** Rol yapma alıştırma olarak var; sınav olarak da kullanılsın: puanlı, sınırlı turlu, can-do bağlı, hata raporlu.

**Mevcut kod.** `src/lib/lessons/roleplay.ts`, `/api/roleplay`, `roleplayLogs` tablosu, `lesson-player.tsx` rol yapma fazı, `coachDialogue`.

**Tasarım.**
- Mod parametresi `mode: "practice"|"exam"`: sınavda sistem istemi "yardım etme, yönlendirme, hata düzeltme; doğal muhatap ol"; 5 tur; süre 3 dk; konuşma bitince tüm kullanıcı turları WP-03 `assess(kind:"roleplay")` ile puanlanır (görev, dilbilgisi, kelime, uygunluk) + WP-20 telaffuz ortalaması.
- Sonuç: rubrik kartı, en iyi 2 cümle, en çok tekrar eden 2 hata, can-do rozeti (WP-43).
- Kullanım: WP-41 seviye sınavının konuşma bölümü; ders sonunda isteğe bağlı "sınav olarak dene".

**Adımlar.**
1. Route + istem varyantı; `roleplayLogs.mode`.
2. Sınav akışı bileşeni (zamanlayıcı, tur sayacı).
3. Toplu değerlendirme + sonuç kartı.

**Kabul.** 5 turluk sınav tamamlanıp puanlanıyor; yardım istemi yok; sonuç `assessments`'ta.

**Süre.** 4 gün. **Bağımlılık.** WP-03, WP-20, WP-43.

**Durum (2026-08-26).** Adım 1–3 bitti (telaffuz ortalaması WP-20'ye bağlı, yok). `lib/lessons/roleplay.ts`: `RoleplayMode`, `examPrompt` (doğal muhatap, yardım/düzeltme/Türkçe/işaret yok, 2 cümle + soru, `EXAM_TURNS`=5'te kapanış); `streamRoleplay(..., mode)`; `/api/roleplay` `mode` alır ve `roleplay_logs.mode`'a yazar (migrasyon 0034, üretime uygulandı). `components/lessons/roleplay-exam.tsx` + `/lessons/[id]/exam`: giriş kartı (sahne, kurallar, kalıplar) → konuşma (tur sayacı, 3 dk sayaç, tek atış mikrofon ya da yazı, TTS) → puanlama (`askAssess` kind `roleplay`, `exerciseId` `<ders>:exam`, `answer.transcript` turlar) → sonuç (`AssessmentCard`, hatasız en uzun 2 cümle, en sık 2 hata tipi, can-do etiketi, Erdi koç). Ders özetinde "Sınav olarak dene". Kanıt: `reports/shots/wp22-exam-{intro,talk,result}.png`; üretimde `assessments` satırı (%88) ve 5 `mode=exam` log satırı doğrulandı.

---

## WP-23 · Açık diyalog motoru (LLM + senaryo yedeği)

**Amaç.** Beceri diyalogları (7) anahtar kelimeyle dallanıyor. Sağlayıcı varken açık uçlu, temaya bağlı LLM diyalogu; yoksa mevcut senaryo.

**Mevcut kod.** `src/lib/dialogue.ts`, `src/components/skills/dialogue-player.tsx`, `/api/roleplay` (ders kimliği zorunlu — beceri diyalogları için `exerciseId` desteği eklenir).

**Tasarım.**
- `SpeakingDialogueExercise`'e `theme_prompt` (LLM için tema/rol/hedef kalıplar/sınır) alanı; senaryo (`dialogue`) yedek olarak kalır.
- `/api/roleplay` `exerciseId` kabul eder; tema istemi + "kullanıcı hedef kalıpları kullanınca işaretle" çıktısı (`usedTargets` yerini LLM işaretlemesi + yerel eşleştirme birleşimi alır).
- Tamamlama: hedef kalıplardan ≥ 3 kullanıldı ve ≥ 4 tur.
- İçerik: 7 → 25 diyalog (seviye başına 5; WP-72).

**Adımlar.**
1. Route genişletme + tema istemi.
2. `dialogue-player` LLM/senaryo anahtarı, aynı UI.
3. İçerik.

**Kabul.** Sağlayıcı açıkken senaryoda olmayan bir cevap ("Ich nehme einen Cappuccino, aber ohne Zucker") anlaşılıp konuşma sürüyor; kapalıyken senaryo çalışıyor.

**Durum (2026-08-26).** Adım 1–2 bitti, 3 (7 → 25 diyalog) WP-72'de. `types.ts` `DialogueTheme { role, goal, limits? }` + `SpeakingDialogueExercise.theme?`; 7 diyaloga tema yazıldı (`content/dialogue.ts`), doğrulayıcı tema kontrolü. `lib/dialogue.ts`: `targetsUsed`, `dialogueDone` (≥4 tur ve ≥3 kalıp, en çok 8), sabitler. `lib/lessons/roleplay.ts`: ortak `streamSystem`, `dialoguePrompt` (rol, sahne = intro, hedef, kalıplar; düzeltme ve öneri yok; kapanış turu), `streamDialogue`. `/api/roleplay` `exerciseId` kabul ediyor (`getExercise`, temalı konuşma diyaloğu), log kimliği egzersiz. `dialogue-player.tsx`: tema + sağlayıcı → `mode: llm`; `askModel` (akış, `parseReply`, kalıp eşiğinde kapanış), hata → senaryoya dönüş; "Yazarak cevapla" alanı iki modda; açık modda payda 4. Kanıt: `reports/shots/wp23-dialogue-{open,done}.png` — "Ich nehme einen Cappuccino, aber ohne Zucker" anlaşıldı ve konuşma sürdü; 4 turda 5/5 kalıp, 4/4.

**Süre.** 4 gün. **Bağımlılık.** WP-03, WP-72.
