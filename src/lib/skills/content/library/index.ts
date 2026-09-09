import type { SkillExercise } from "../../types";
import { deA1 } from "./de-a1";
import { deA2 } from "./de-a2";
import { deB1 } from "./de-b1";
import { deB2 } from "./de-b2";
import { deC1 } from "./de-c1";
import { enA1 } from "./en-a1";
import { enA2 } from "./en-a2";
import { enB1 } from "./en-b1";
import { enB2 } from "./en-b2";
import { enC1 } from "./en-c1";
import { enMobile2026 } from "./en-mobile-2026";

/**
 * BECERİLER KÜTÜPHANESİ — Patika'dan bağımsız, öğrencinin kendi seçtiği içerik.
 *
 * NEDEN AYRI BİR KLASÖR. Patika ünite başına iki okuma, iki dinleme, iki yazma
 * yuvası açıyor ve havuzu LİSTE SIRASIYLA tüketiyor (immersion/build.ts). Ünite
 * dosyalarının (`a1-uNN.ts`) içine ünitesiz egzersiz eklemek, o egzersizi bir
 * sonraki boş yuvaya düşürürdü. Beceriler'in eski kendi egzersizleri tam bu
 * yüzden ünite dosyalarının sonunda duruyordu ve 2026-09-07'de kalite
 * gerekçesiyle silindi. Bu klasördeki hiçbir egzersizin `unit` alanı yoktur ve
 * `build.ts` bu havuza hiç bakmaz.
 *
 * NE VAR. Kurs × seviye başına bir dosya; her dosyada beş beceri
 * (okuma, dinleme, yazma, konuşma, dil bilgisi). Hedef seviye başına beceri
 * başına 25; ilk parti (2026-09-08) her hücrede bir egzersiz — kalite kontrol
 * turundan sonra genişletilecek.
 *
 * KİMLİK. `<kurs>-<seviye>-lib-<r|l|w|s|g><n>` — "lib" kütüphane; eski
 * Beceriler kimlikleri (`a1-r1`) ve ünite kimlikleri (`a1-u1-r1`) ile
 * çakışmaz. Kimlik kalıcıdır: `user_skills` ilerlemesi buna bağlı.
 *
 * KURALLAR (özet; tamamı data/content/SPEC.md ve check-content.ts):
 *   - Kopya yok: Patika ünitelerinin, derslerin ve deneme sınavlarının
 *     metinleri, sahneleri ve soruları burada tekrar edilmez; konu yakın
 *     olsa bile metin özgündür.
 *   - Kelime havuzuna riayet: metin, seviyenin ve altındaki seviyelerin
 *     havuz katmanında kalır (`npm run check:libvocab`).
 *   - Her soru `explain` ile "neden"i söyler; yazma ve monolog rubrikle,
 *     söyleyiş drilli `confusions` ile geri bildirim verir.
 */
export const library: SkillExercise[] = [
  ...deA1,
  ...deA2,
  ...deB1,
  ...deB2,
  ...deC1,
  ...enMobile2026,
  ...enA1,
  ...enA2,
  ...enB1,
  ...enB2,
  ...enC1,
];
