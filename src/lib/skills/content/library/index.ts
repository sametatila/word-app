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
import { deA1P2 } from "./de-a1-p2";
import { deA1P3 } from "./de-a1-p3";
import { deA1P4 } from "./de-a1-p4";
import { deA1P5 } from "./de-a1-p5";
import { deA2P2 } from "./de-a2-p2";
import { deA2P3 } from "./de-a2-p3";
import { deA2P4 } from "./de-a2-p4";
import { deA2P5 } from "./de-a2-p5";
import { deB1P2 } from "./de-b1-p2";
import { deB1P3 } from "./de-b1-p3";
import { deB1P4 } from "./de-b1-p4";
import { deB1P5 } from "./de-b1-p5";
import { deB2P2 } from "./de-b2-p2";
import { deB2P3 } from "./de-b2-p3";
import { deB2P4 } from "./de-b2-p4";
import { deB2P5 } from "./de-b2-p5";
import { deC1P2 } from "./de-c1-p2";
import { deC1P3 } from "./de-c1-p3";
import { deC1P4 } from "./de-c1-p4";
import { deC1P5 } from "./de-c1-p5";
import { enA1P2 } from "./en-a1-p2";
import { enA1P3 } from "./en-a1-p3";
import { enA1P4 } from "./en-a1-p4";
import { enA1P5 } from "./en-a1-p5";
import { enA2P2 } from "./en-a2-p2";
import { enA2P3 } from "./en-a2-p3";
import { enA2P4 } from "./en-a2-p4";
import { enA2P5 } from "./en-a2-p5";
import { enB1P2 } from "./en-b1-p2";
import { enB1P3 } from "./en-b1-p3";
import { enB1P4 } from "./en-b1-p4";
import { enB1P5 } from "./en-b1-p5";
import { enB2P2 } from "./en-b2-p2";
import { enB2P3 } from "./en-b2-p3";
import { enB2P4 } from "./en-b2-p4";
import { enB2P5 } from "./en-b2-p5";
import { enC1P2 } from "./en-c1-p2";
import { enC1P3 } from "./en-c1-p3";
import { enC1P4 } from "./en-c1-p4";
import { enC1P5 } from "./en-c1-p5";

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
 * NE VAR. Kurs × seviye × parti başına bir dosya; her dosyada beş beceri
 * (okuma, dinleme, yazma, konuşma, dil bilgisi). Parti 1 `<kurs>-<seviye>.ts`,
 * sonrakiler `<kurs>-<seviye>-pN.ts`. Hedef: hücre başına beş egzersiz, yani
 * kurs × seviye × beceri için 5 (kurs başına 125).
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
  // Parti 2–5: hücre başına beşe tamamlayan setler. Ayrı dosyada duruyorlar
  // çünkü paralel yazılıyorlar ve tek dosyada çakışırlardı; kimlik sonu
  // dosyanın parti numarasıyla aynı (de-a1-lib-r2 → de-a1-p2.ts).
  ...deA1P2,
  ...deA1P3,
  ...deA1P4,
  ...deA1P5,
  ...deA2P2,
  ...deA2P3,
  ...deA2P4,
  ...deA2P5,
  ...deB1P2,
  ...deB1P3,
  ...deB1P4,
  ...deB1P5,
  ...deB2P2,
  ...deB2P3,
  ...deB2P4,
  ...deB2P5,
  ...deC1P2,
  ...deC1P3,
  ...deC1P4,
  ...deC1P5,
  ...enA1P2,
  ...enA1P3,
  ...enA1P4,
  ...enA1P5,
  ...enA2P2,
  ...enA2P3,
  ...enA2P4,
  ...enA2P5,
  ...enB1P2,
  ...enB1P3,
  ...enB1P4,
  ...enB1P5,
  ...enB2P2,
  ...enB2P3,
  ...enB2P4,
  ...enB2P5,
  ...enC1P2,
  ...enC1P3,
  ...enC1P4,
  ...enC1P5,
];
