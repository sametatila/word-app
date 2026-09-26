# Patika (immersion) — konuşmalara örülmüş beceriler

## Tez
Kelime tanımak cümle kurmayı sağlamıyor. Ürünün iki modu:

- **Öğren:** kelime öğrenme ve hatırlama (SRS turu, yürüyüş, pratik).
- **Patika (`/immersion`):** dili kullanma. Konuşmalar iskelet; okuma, dinleme, yazma, dil bilgisi
  ve quiz onların etrafına serpiştirilir.

## Model
- **Track** (kurs + seviye) = sıralı üniteler. Seviye başına 100 konuşma → ünite başına 4 konuşma
  → **25 ünite**. Ekranda üniteler modüle göre gruplanır (`immersion-hub.tsx` `moduleGroups`);
  `GROUP_SIZE` (10) yalnız veri alanı `group`u besler.
- **Ünite** = 13 adım, tam takım (`lib/immersion/build.ts` `slotPlan`):
  konuşma · okuma · konuşma · dinleme · konuşma · yazma · konuşma · okuma · dinleme · yazma ·
  dil bilgisi · quiz · ünite quizi. Tema ilk konuşmanın modülünden (`MODULE_THEMES`).
- **Beceri yuvaları** `unit` alanı taşıyan egzersiz havuzundan (`pathMetas`) liste sırasıyla dolar;
  havuz biterse yuva yer tutucu (`ref: null`) kalır. Kütüphane egzersizleri (`unit` yok) buraya girmez.

| Adım | İçerik nereden | Kod |
|---|---|---|
| konuşma | `lib/conversations/content` | `/conversations/[id]` |
| okuma, dinleme, yazma | `lib/skills/content/<seviye>-uNN.ts` | `/immersion/skill/[id]` |
| dil bilgisi | elle yazılmış varsa o (`lib/immersion/content/de-a1-u01.ts`), yoksa ünitenin konuşmalarından türetilir, 8 soru | `lib/immersion/grammar.ts` (`deriveGrammar`), `/immersion/grammar/[unit]` |
| quiz, ünite quizi | ünite özetinden türetilir, 8 ve 12 soru | `lib/immersion/quiz.ts` (`deriveQuiz`), `/immersion/quiz/[unit]` |

Mobil aynası: `mobile/src/game/immersionTrack.ts`, `immersionQuiz.ts`, `screens/UnitScreen.tsx`, `QuizScreen.tsx`.

## İçerik stratejisi
- **Konuşma tek iskelet.** Ünitenin teması ve kelimesi konuşmalardan gelir; öteki adımlar ona göre
  türetilir ya da yazılır.
- **Ünite özeti** `lib/immersion/brief.ts` (`buildUnitBriefs`): her üniteyi kendi 4 konuşmasından
  tema + hedef kelime + kalıp + can-do'ya indirger. Yeni ünite içeriğinin şartnamesi budur:
  `npm run briefs -- A1 de`.
- Türetilen adımlar (dil bilgisi, quiz, ünite quizi) içerik yazımı istemez; hep temaya hizalı.

## Gating
Saf katman `lib/immersion/state.ts` (`buildTrackState`), depolamayı bilmez.

- **Sonraki ünite açılır** ⇔ ünitenin konuşmaları bitti (`unlocksNext`). Beceri ve pratik adımları
  kapı değil: bu içerik seyrek ve değişiyor, onu zorunlu kılmak eksik içeriği kapı yapardı.
- **Ünite bitti** ⇔ kayıt tutan bütün adımları bitti (`complete`). Açılma ile bitme ayrı sorular.
- **Kayan pencere:** biten ve denenen her adım açık, artı sıradaki tek adım. Puanı yetmese de
  denenen adım sıradakini açar (bir beceride takılan öğrenci sonsuza dek kilitli kalmasın).
- Yer tutucular oynanmaz, sırayı harcamaz, kapıyı bloklamaz.
- İlk ünite her zaman açık.

## İlerleme kaydı

| Adım | Tablo | Yazan |
|---|---|---|
| konuşma | `user_conversations` | konuşma oynatıcısı |
| okuma, dinleme, yazma | `user_skills` | `/api/skills` |
| dil bilgisi, quiz, ünite quizi | `user_path_items` (en iyi/son puan, deneme, geçiş zamanı) | `/api/immersion/item` → `lib/immersion/practice.ts`; okuma `practiceProgress` |

Pratik adımda geçme eşiği %60 (`PRACTICE_PASS_PCT`, `lib/score-bands.ts`); geçiş bir kez kazanılınca
geri alınmaz. XP verilmez: sunucu cevapları görmüyor, XP'ye bağlansa çiftlenebilir kapı olurdu.
