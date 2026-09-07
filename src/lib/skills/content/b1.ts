import type { SkillExercise } from "../types";
import { b1U01 } from "./b1-u01";
import { b1U02 } from "./b1-u02";
import { b1U03 } from "./b1-u03";
import { b1U04 } from "./b1-u04";
import { b1U05 } from "./b1-u05";
import { b1U06 } from "./b1-u06";
import { b1U07 } from "./b1-u07";
import { b1U08 } from "./b1-u08";
import { b1U09 } from "./b1-u09";
import { b1U10 } from "./b1-u10";
import { b1U11 } from "./b1-u11";
import { b1U12 } from "./b1-u12";
import { b1U13 } from "./b1-u13";
import { b1U14 } from "./b1-u14";
import { b1U15 } from "./b1-u15";
import { b1U16 } from "./b1-u16";
import { b1U17 } from "./b1-u17";
import { b1U18 } from "./b1-u18";
import { b1U19 } from "./b1-u19";
import { b1U20 } from "./b1-u20";
import { b1U21 } from "./b1-u21";
import { b1U22 } from "./b1-u22";
import { b1U23 } from "./b1-u23";
import { b1U24 } from "./b1-u24";
import { b1U25 } from "./b1-u25";
import { b1U26 } from "./b1-u26";
import { b1U27 } from "./b1-u27";
import { b1U28 } from "./b1-u28";
import { b1U29 } from "./b1-u29";
import { b1U30 } from "./b1-u30";
import { b1U31 } from "./b1-u31";
import { b1U32 } from "./b1-u32";
import { b1U33 } from "./b1-u33";
import { b1U34 } from "./b1-u34";
import { b1U35 } from "./b1-u35";
import { b1U36 } from "./b1-u36";
import { b1U37 } from "./b1-u37";
import { b1U38 } from "./b1-u38";
import { b1U39 } from "./b1-u39";
import { b1U40 } from "./b1-u40";
import { b1U41 } from "./b1-u41";
import { b1U42 } from "./b1-u42";
import { b1U43 } from "./b1-u43";
import { b1U44 } from "./b1-u44";
import { b1U45 } from "./b1-u45";

/**
 * B1 — okuma, dinleme, yazma ve konuşma egzersizleri.
 *
 * Ünite hizalı dosyalar (`b1-uNN.ts`) dizinin BAŞINDA spread edilir: immersion
 * builder ünite slotlarını konuma göre dolduruyor, o yüzden ünite 1'in
 * okuma/dinleme/yazma slotlarını b1U01 doldurur. Eski genel B1 egzersizleri
 * arkada kalıp sonraki ünitelerin slotlarına akıyor.
 */
/*
 * BECERİLER'İN KENDİ EGZERSİZLERİ 2026-09-07'DE KALDIRILDI.
 *
 * Bu dosyada, ünite dosyalarının yayılmasından sonra 32 egzersiz daha elle
 * yazılıydı (id'leri ünite öneksiz: "b1-r1", "b1-l1", "b1-w1"). Onlar Patika'ya
 * bağlı değildi; Beceriler sekmesinin kendi listesiydi ve kalitesi yetersiz
 * bulundu (denetimde 160 egzersizin 73'ünde bulgu vardı, neredeyse hepsi
 * "sözlükçe metinde geçmiyor"). Yerlerine yeni içerik yazılacak.
 *
 * Ünite içeriği ETKİLENMEDİ: aşağıdaki yayılmalar duruyor ve Patika bugünkü
 * egzersizlerin aynısını gösteriyor. Yeni Beceriler içeriği buraya, `unit`
 * alanı OLMADAN eklenir — mobil `listOwnSkillMeta`, ayrımı o alandan yapıyor.
 */
export const b1: SkillExercise[] = [
  ...b1U01,
  ...b1U02,
  ...b1U03,
  ...b1U04,
  ...b1U05,
  ...b1U06,
  ...b1U07,
  ...b1U08,
  ...b1U09,
  ...b1U10,
  ...b1U11,
  ...b1U12,
  ...b1U13,
  ...b1U14,
  ...b1U15,
  ...b1U16,
  ...b1U17,
  ...b1U18,
  ...b1U19,
  ...b1U20,
  ...b1U21,
  ...b1U22,
  ...b1U23,
  ...b1U24,
  ...b1U25,
  ...b1U26,
  ...b1U27,
  ...b1U28,
  ...b1U29,
  ...b1U30,
  ...b1U31,
  ...b1U32,
  ...b1U33,
  ...b1U34,
  ...b1U35,
  ...b1U36,
  ...b1U37,
  ...b1U38,
  ...b1U39,
  ...b1U40,
  ...b1U41,
  ...b1U42,
  ...b1U43,
  ...b1U44,
  ...b1U45,
];
