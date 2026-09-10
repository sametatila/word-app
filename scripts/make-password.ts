/**
 * Parola üretici — `npm run make:password [adet]`
 *
 * Uygulamanın KENDİ kuralıyla (`lib/auth/password-policy`) doğrulanmış, anlamlı
 * sözcük içermeyen parolalar üretir. Varsayılan iki tane; inceleme hesapları
 * için düşünüldü ama her yerde kullanılabilir.
 *
 * NEDEN `crypto.randomInt`. `Math.random()` kriptografik değil: tohumdan
 * türetiliyor ve çıktısı tahmin edilebilir. Parola üretmek onun işi değil.
 *
 * NEDEN BU ALFABE. Benzeyen karakterler ATILDI — `l` `I` `O` `0` `1`. Parola
 * elle yazılacak (mağaza inceleyicisi fiziksel cihazda okuyup giriyor) ve
 * "sıfır mı büyük O mu" sorusu en sık yazım hatası. Sembol de yok: mobil
 * klavyede sembol için sekme değiştirmek aynı hatayı üretiyor. Tire ayraç
 * olarak kalıyor çünkü okumayı kolaylaştırıyor ve her klavyede ön yüzde.
 *
 * NEDEN ÜRETİLEN PAROLA DOĞRULANIYOR. Rastgele bir dize kuralı neredeyse her
 * zaman geçer, ama "neredeyse" yeterli değil: alfabe ya da biçim değişirse
 * üretici sessizce kuralı ihlal eden çıktı vermeye başlar. Doğrulama bunu
 * anında görünür kılıyor — ve aynı zamanda kuralın kendisini sınıyor.
 */
import { randomInt } from "node:crypto";
import { checkPassword, MIN_PASSWORD_LENGTH } from "../src/lib/auth/password-policy";

/** Benzeyen karakterler yok: l, I, O, 0, 1 atıldı. */
const ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const GROUPS = 4;
const GROUP_SIZE = 4; // 4×4 + 3 tire = 19 karakter

function generate(): string {
  const groups: string[] = [];
  for (let g = 0; g < GROUPS; g++) {
    let group = "";
    for (let i = 0; i < GROUP_SIZE; i++) group += ALPHABET[randomInt(ALPHABET.length)];
    groups.push(group);
  }
  return groups.join("-");
}

function main(): void {
  const count = Math.max(1, Math.min(20, Number(process.argv[2]) || 2));
  const out: string[] = [];

  for (let n = 0; n < count; n++) {
    let password = "";
    // Kuralı geçene kadar dene. Pratikte ilk denemede geçiyor; döngü, alfabe ya
    // da biçim ileride değişirse üreticinin sessizce bozulmasını engelliyor.
    for (let attempt = 0; attempt < 50; attempt++) {
      const candidate = generate();
      if (checkPassword(candidate) === null) {
        password = candidate;
        break;
      }
    }
    if (!password) {
      console.error("üretici kuralı geçen bir parola bulamadı — alfabe ya da biçim bozulmuş olabilir");
      process.exit(1);
    }
    out.push(password);
  }

  console.log();
  for (const p of out) console.log(`  ${p}`);
  console.log(`\n  ${out[0].length} karakter · asgari ${MIN_PASSWORD_LENGTH} · benzeyen karakter yok (l I O 0 1)`);
  console.log("  Depoya YAZMA: depo public. Yalnız mağaza konsollarına gir.\n");
}

main();
