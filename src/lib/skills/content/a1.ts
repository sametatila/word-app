import type { SkillExercise } from "../types";
import { a1U01 } from "./a1-u01";
import { a1U02 } from "./a1-u02";
import { a1U03 } from "./a1-u03";
import { a1U04 } from "./a1-u04";
import { a1U05 } from "./a1-u05";
import { a1U06 } from "./a1-u06";
import { a1U07 } from "./a1-u07";
import { a1U08 } from "./a1-u08";
import { a1U09 } from "./a1-u09";
import { a1U10 } from "./a1-u10";
import { a1U11 } from "./a1-u11";
import { a1U12 } from "./a1-u12";
import { a1U13 } from "./a1-u13";
import { a1U14 } from "./a1-u14";
import { a1U15 } from "./a1-u15";
import { a1U16 } from "./a1-u16";
import { a1U17 } from "./a1-u17";
import { a1U18 } from "./a1-u18";
import { a1U19 } from "./a1-u19";
import { a1U20 } from "./a1-u20";
import { a1U21 } from "./a1-u21";
import { a1U22 } from "./a1-u22";
import { a1U23 } from "./a1-u23";
import { a1U24 } from "./a1-u24";
import { a1U25 } from "./a1-u25";

/** A1 — okuma, dinleme ve yazma egzersizleri. */
/*
 * BECERİLER'İN KENDİ EGZERSİZLERİ 2026-09-07'DE KALDIRILDI.
 *
 * Bu dosyada, ünite dosyalarının yayılmasından sonra 32 egzersiz daha elle
 * yazılıydı (id'leri ünite öneksiz: "a1-r1", "a1-l1", "a1-w1"). Onlar Patika'ya
 * bağlı değildi; Beceriler sekmesinin kendi listesiydi ve kalitesi yetersiz
 * bulundu (denetimde 160 egzersizin 73'ünde bulgu vardı, neredeyse hepsi
 * "sözlükçe metinde geçmiyor"). Yerlerine yeni içerik yazılacak.
 *
 * Ünite içeriği ETKİLENMEDİ: aşağıdaki yayılmalar duruyor ve Patika bugünkü
 * egzersizlerin aynısını gösteriyor. Yeni Beceriler içeriği buraya, `unit`
 * alanı OLMADAN eklenir — mobil `listOwnSkillMeta`, ayrımı o alandan yapıyor.
 */
export const a1: SkillExercise[] = [
  // Ünite 1 "Tanışma ve ben" tema-hizalı içerik EN BAŞTA durur → immersion
  // builder ünite 1'in okuma/dinleme/yazma slotlarını (konuma göre) bunlarla
  // doldurur. Eski genel A1 içeriği sonraki ünitelere kayar (köprü).
  ...a1U01,
  ...a1U02,
  ...a1U03,
  ...a1U04,
  ...a1U05,
  ...a1U06,
  ...a1U07,
  ...a1U08,
  ...a1U09,
  ...a1U10,
  ...a1U11,
  ...a1U12,
  ...a1U13,
  ...a1U14,
  ...a1U15,
  ...a1U16,
  ...a1U17,
  ...a1U18,
  ...a1U19,
  ...a1U20,
  ...a1U21,
  ...a1U22,
  ...a1U23,
  ...a1U24,
  ...a1U25,
];
