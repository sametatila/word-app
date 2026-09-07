import type { SkillExercise } from "../types";
import { c1U01 } from "./c1-u01";
import { c1U02 } from "./c1-u02";
import { c1U03 } from "./c1-u03";
import { c1U04 } from "./c1-u04";
import { c1U05 } from "./c1-u05";
import { c1U06 } from "./c1-u06";
import { c1U07 } from "./c1-u07";
import { c1U08 } from "./c1-u08";
import { c1U09 } from "./c1-u09";
import { c1U10 } from "./c1-u10";
import { c1U11 } from "./c1-u11";
import { c1U12 } from "./c1-u12";
import { c1U13 } from "./c1-u13";
import { c1U14 } from "./c1-u14";
import { c1U15 } from "./c1-u15";
import { c1U16 } from "./c1-u16";
import { c1U17 } from "./c1-u17";
import { c1U18 } from "./c1-u18";
import { c1U19 } from "./c1-u19";
import { c1U20 } from "./c1-u20";
import { c1U21 } from "./c1-u21";
import { c1U22 } from "./c1-u22";
import { c1U23 } from "./c1-u23";
import { c1U24 } from "./c1-u24";
import { c1U25 } from "./c1-u25";

/**
 * C1 — okuma, dinleme ve yazma egzersizleri.
 *
 * Ünite hizalı içerik EN BAŞTA durur: immersion yerleşimi `unit` etiketine
 * değil LİSTE SIRASINA bakıyor (buildTrack havuzları imleçle tüketir). Eski
 * genel C1 içeriği sonraki ünitelere kayar ve köprü olur — A1 ve A2 tarafındaki
 * düzenin aynısı. Eski kimlikler silinmez: user_skills birincil anahtarı
 * (user_id, exercise_id) ve silinen kimlik canlı ilerlemeyi götürür.
 */
/*
 * BECERİLER'İN KENDİ EGZERSİZLERİ 2026-09-07'DE KALDIRILDI.
 *
 * Bu dosyada, ünite dosyalarının yayılmasından sonra 32 egzersiz daha elle
 * yazılıydı (id'leri ünite öneksiz: "c1-r1", "c1-l1", "c1-w1"). Onlar Patika'ya
 * bağlı değildi; Beceriler sekmesinin kendi listesiydi ve kalitesi yetersiz
 * bulundu (denetimde 160 egzersizin 73'ünde bulgu vardı, neredeyse hepsi
 * "sözlükçe metinde geçmiyor"). Yerlerine yeni içerik yazılacak.
 *
 * Ünite içeriği ETKİLENMEDİ: aşağıdaki yayılmalar duruyor ve Patika bugünkü
 * egzersizlerin aynısını gösteriyor. Yeni Beceriler içeriği buraya, `unit`
 * alanı OLMADAN eklenir — mobil `listOwnSkillMeta`, ayrımı o alandan yapıyor.
 */
export const c1: SkillExercise[] = [
  ...c1U01,
  ...c1U02,
  ...c1U03,
  ...c1U04,
  ...c1U05,
  ...c1U06,
  ...c1U07,
  ...c1U08,
  ...c1U09,
  ...c1U10,
  ...c1U11,
  ...c1U12,
  ...c1U13,
  ...c1U14,
  ...c1U15,
  ...c1U16,
  ...c1U17,
  ...c1U18,
  ...c1U19,
  ...c1U20,
  ...c1U21,
  ...c1U22,
  ...c1U23,
  ...c1U24,
  ...c1U25,
];
