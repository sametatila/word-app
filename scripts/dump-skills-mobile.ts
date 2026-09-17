/**
 * Beceri egzersizlerini mobil pakete döker — KAYNAKTAN.
 *
 * Eskisi (dump-skills-mobile.mjs) `data/skills/.exercises.json` adlı bir ara
 * dosyayı okuyordu: git'te izlenmiyordu, onu ÜRETEN hiçbir betik yoktu ve
 * elle bırakıldığı günden (24 Ağustos) kalmaydı. Yani kaynak `.ts` dosyaları
 * değiştiğinde mobil paket sessizce eski içerikte kalıyordu.
 *
 * Bu sürüm doğrudan BUNDLED_EXERCISES'i okur — web'in kullandığı aynı kaynak.
 *
 * Kullanım: npx tsx scripts/dump-skills-mobile.ts [kurs]   (varsayılan "de")
 */
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";

// Beş beceri: konuşma ve dil bilgisi Beceriler kütüphanesiyle (2026-09)
// geldi ve mobilde ItemScreen'de oynatıcıları var. Süzgeç yine de duruyor:
// tanınmayan bir beceri pakete girip mobilde boş ekran açmasın.
const SKILLS = ["reading", "listening", "writing", "speaking", "grammar"];

/**
 * Kursun mobil paketi: dosya yolu + yazılacak JSON.
 *
 * `check-dumps` aynı işlevi çağırıp dosyayla BAYT BAYT karşılaştırıyor —
 * yukarıdaki "sessizce eski içerikte kalıyordu" kusuru kimlik kümesi
 * eşitliğiyle görülemiyordu (gerekçe `check-dumps.ts`te).
 */
export function buildSkillDump(course: string) {
  const keep = BUNDLED_EXERCISES.filter(
    (e) => ((e as { course?: string }).course ?? "de") === course && SKILLS.includes(e.skill),
  );
  // Almanca paketi tarihsel adıyla kalıyor (mobil onu böyle import ediyor).
  const file =
    course === "de"
      ? "mobile/src/data/skills/exercises.json"
      : `mobile/src/data/skills/exercises-${course}.json`;
  return { file, json: JSON.stringify(keep), rows: keep };
}

/*
  DÖKÜM KOLU KALDIRILDI — yazılacak dosya kalmadı.

  `exercises.json` ve `exercises-en.json` (2,4 + 2,4 MB) mobil paketten
  çıkarıldı; egzersizler seviye paketi hâlinde iniyor
  (`skills/<kurs>-<seviye>`). `buildSkillDump` YAŞIYOR ve tek projeksiyon
  olarak kalıyor: `scripts/content-publish` yayını ondan üretiyor.
*/
