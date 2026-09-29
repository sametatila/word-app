import "server-only";
import { hyphenateSync as hyphenateDe } from "hyphen/de-1996";
import { hyphenateSync as hyphenateEn } from "hyphen/en-us";

/**
 * Hedef dildeki başlıklara yumuşak tire (U+00AD) — yalnız GÖRÜNTÜ için.
 *
 * Patika'nın ünite kartı dar (telefonda iki sütun) ve Almanca başlıklarda tek
 * sözcük satırdan uzun olabiliyor: "Das Vorstellungsgespräch". Web bunu
 * tarayıcıya bırakıyor (`hyphens-auto` + `lang={course}`). Mobilde metne dil
 * verilemiyor: Android cihaz dilinin sözlüğüyle heceliyor (Türkçe cihazda
 * Almanca sözlük yok, sözcüğü harf ortasından bölüyordu: "Vorstellungsgesp räch",
 * Play karesi 2026-09-29), iOS sözcüğü kesiyordu ("Vorstellungsgesprä…").
 * Sözlük (de 746 KB) mobil pakete girmesin diye heceleme sunucuda; istemci
 * yumuşak tireyi satır sonunda tireye çeviriyor, satır içinde görünmüyor.
 *
 * Alan ayrı (`topicsHyph`): başlığın kendisi arama, karşılaştırma ve ekran
 * okuyucu için tiresiz kalıyor.
 */
export function hyphenateTitle(text: string, course: string): string {
  const fn = course === "en" ? hyphenateEn : hyphenateDe;
  // Kısa sözcükler satıra zaten sığıyor; bölmek yalnız okumayı zorlaştırır.
  return fn(text, { minWordLength: 10 });
}
