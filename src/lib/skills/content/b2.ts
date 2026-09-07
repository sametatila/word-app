import type { SkillExercise } from "../types";
import { b2U01 } from "./b2-u01";
import { b2U02 } from "./b2-u02";
import { b2U03 } from "./b2-u03";
import { b2U04 } from "./b2-u04";
import { b2U05 } from "./b2-u05";
import { b2U06 } from "./b2-u06";
import { b2U07 } from "./b2-u07";
import { b2U08 } from "./b2-u08";
import { b2U09 } from "./b2-u09";
import { b2U10 } from "./b2-u10";
import { b2U11 } from "./b2-u11";
import { b2U12 } from "./b2-u12";
import { b2U13 } from "./b2-u13";
import { b2U14 } from "./b2-u14";
import { b2U15 } from "./b2-u15";
import { b2U16 } from "./b2-u16";
import { b2U17 } from "./b2-u17";
import { b2U18 } from "./b2-u18";
import { b2U19 } from "./b2-u19";
import { b2U20 } from "./b2-u20";
import { b2U21 } from "./b2-u21";
import { b2U22 } from "./b2-u22";
import { b2U23 } from "./b2-u23";
import { b2U24 } from "./b2-u24";
import { b2U25 } from "./b2-u25";

/**
 * B2 — okuma, dinleme ve yazma egzersizleri.
 *
 * Ünite dosyaları listenin BAŞINDA durur. buildTrack havuzları liste sırasıyla
 * imleçle tüketiyor (unit etiketine bakmıyor), yani ilk 50 yuvayı ünite hizalı
 * içerik kapar; aşağıdaki eski 32 egzersiz 50. yuvanın ötesine düşer. Silinmez
 * ve kimlikleri değişmez — user_skills birincil anahtarı (user_id, exercise_id)
 * ve canlı ilerleme onlara bağlı.
 */
/*
 * BECERİLER'İN KENDİ EGZERSİZLERİ 2026-09-07'DE KALDIRILDI.
 *
 * Bu dosyada, ünite dosyalarının yayılmasından sonra 32 egzersiz daha elle
 * yazılıydı (id'leri ünite öneksiz: "b2-r1", "b2-l1", "b2-w1"). Onlar Patika'ya
 * bağlı değildi; Beceriler sekmesinin kendi listesiydi ve kalitesi yetersiz
 * bulundu (denetimde 160 egzersizin 73'ünde bulgu vardı, neredeyse hepsi
 * "sözlükçe metinde geçmiyor"). Yerlerine yeni içerik yazılacak.
 *
 * Ünite içeriği ETKİLENMEDİ: aşağıdaki yayılmalar duruyor ve Patika bugünkü
 * egzersizlerin aynısını gösteriyor. Yeni Beceriler içeriği buraya, `unit`
 * alanı OLMADAN eklenir — mobil `listOwnSkillMeta`, ayrımı o alandan yapıyor.
 */
export const b2: SkillExercise[] = [
  ...b2U01,
  ...b2U02,
  ...b2U03,
  ...b2U04,
  ...b2U05,
  ...b2U06,
  ...b2U07,
  ...b2U08,
  ...b2U09,
  ...b2U10,
  ...b2U11,
  ...b2U12,
  ...b2U13,
  ...b2U14,
  ...b2U15,
  ...b2U16,
  ...b2U17,
  ...b2U18,
  ...b2U19,
  ...b2U20,
  ...b2U21,
  ...b2U22,
  ...b2U23,
  ...b2U24,
  ...b2U25,
];
