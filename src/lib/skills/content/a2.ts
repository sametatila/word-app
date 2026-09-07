import type { SkillExercise } from "../types";
import { a2U01 } from "./a2-u01";
import { a2U02 } from "./a2-u02";
import { a2U03 } from "./a2-u03";
import { a2U04 } from "./a2-u04";
import { a2U05 } from "./a2-u05";
import { a2U06 } from "./a2-u06";
import { a2U07 } from "./a2-u07";
import { a2U08 } from "./a2-u08";
import { a2U09 } from "./a2-u09";
import { a2U10 } from "./a2-u10";
import { a2U11 } from "./a2-u11";
import { a2U12 } from "./a2-u12";
import { a2U13 } from "./a2-u13";
import { a2U14 } from "./a2-u14";
import { a2U15 } from "./a2-u15";
import { a2U16 } from "./a2-u16";
import { a2U17 } from "./a2-u17";
import { a2U18 } from "./a2-u18";
import { a2U19 } from "./a2-u19";
import { a2U20 } from "./a2-u20";
import { a2U21 } from "./a2-u21";
import { a2U22 } from "./a2-u22";
import { a2U23 } from "./a2-u23";
import { a2U24 } from "./a2-u24";
import { a2U25 } from "./a2-u25";

/**
 * A2 — okuma, dinleme ve yazma egzersizleri.
 *
 * Ünite hizalı içerik EN BAŞTA durur: immersion yerleşimi `unit` etiketine
 * değil LİSTE SIRASINA bakıyor (buildTrack havuzları imleçle tüketir), o yüzden
 * ünite 1'in okuma/dinleme/yazma slotlarını a2U01 doldurur. Eski genel A2
 * içeriği sonraki ünitelere kayar ve köprü olur — A1 tarafındaki düzenin aynısı.
 */
/*
 * BECERİLER'İN KENDİ EGZERSİZLERİ 2026-09-07'DE KALDIRILDI.
 *
 * Bu dosyada, ünite dosyalarının yayılmasından sonra 32 egzersiz daha elle
 * yazılıydı (id'leri ünite öneksiz: "a2-r1", "a2-l1", "a2-w1"). Onlar Patika'ya
 * bağlı değildi; Beceriler sekmesinin kendi listesiydi ve kalitesi yetersiz
 * bulundu (denetimde 160 egzersizin 73'ünde bulgu vardı, neredeyse hepsi
 * "sözlükçe metinde geçmiyor"). Yerlerine yeni içerik yazılacak.
 *
 * Ünite içeriği ETKİLENMEDİ: aşağıdaki yayılmalar duruyor ve Patika bugünkü
 * egzersizlerin aynısını gösteriyor. Yeni Beceriler içeriği buraya, `unit`
 * alanı OLMADAN eklenir — mobil `listOwnSkillMeta`, ayrımı o alandan yapıyor.
 */
export const a2: SkillExercise[] = [
  ...a2U01,
  ...a2U02,
  ...a2U03,
  ...a2U04,
  ...a2U05,
  ...a2U06,
  ...a2U07,
  ...a2U08,
  ...a2U09,
  ...a2U10,
  ...a2U11,
  ...a2U12,
  ...a2U13,
  ...a2U14,
  ...a2U15,
  ...a2U16,
  ...a2U17,
  ...a2U18,
  ...a2U19,
  ...a2U20,
  ...a2U21,
  ...a2U22,
  ...a2U23,
  ...a2U24,
  ...a2U25,
];
