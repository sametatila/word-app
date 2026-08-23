import type { Lesson } from "./types";
import { MODULE_SIZE } from "./modules";

/**
 * Ders dünyasının insanları.
 *
 * Rol yapma partnerleri isimsizdi: her derste "bir komşu", "bir iş arkadaşı",
 * "bir görevli". 202 dersin her birinde karşına yeni bir yabancı çıkıyordu.
 * Bunun bir öğretme maliyeti var — insan kelimeye değil, kişiye bağlanır ve
 * hatırlamak bağlanmayla kolaylaşır — ama asıl kaybedilen şey daha basitti:
 * bir dünya kurulabilecekken kurulmuyordu.
 *
 * Çözüm SUNUM katmanında, tıpkı modül pankartları gibi (`modules.ts`).
 * İçeriğin 202 dosyasına isim alanı eklemek, yalnızca iki ekranda kullanılan
 * bir alanı beş yüz kez tekrarlamak olurdu. Burada isimler dersin
 * kataloğdaki yerinden TÜRETİLİYOR:
 *
 *   - Her modül (10 ders) küçük bir kadroya sahip: aynı üç kişi o modül
 *     boyunca dönüyor. Yeme-içme modülünde tanıştığın garson, üç ders sonra
 *     yine karşına çıkıyor.
 *   - Kadrolar modülden modüle kayıyor, yani seviye ilerledikçe dünya
 *     genişliyor ama tamamen yenilenmiyor.
 *
 * Cinsiyet: partner açıklamaları Türkçe ve neredeyse tamamı cinsiyetsiz
 * ("bir komşu", "bir doktor"). 220 açıklamadan yalnızca dördü cinsiyet
 * belirtiyor; onlar için açıklamadaki ipucu okunuyor ve isim ona göre
 * seçiliyor. Yanlış eşleşen tek bir isim bile sahneyi bozardı.
 */

export type Character = {
  /** Konuşmada kullanılan ad — modelin istemine de bu giriyor. */
  name: string;
  /** Kısa bir renk: modelin sesini tutturması için, öğrenciye gösterilmez. */
  note: string;
};

type Cast = { name: string; note: string; gender: "f" | "m" };

/**
 * Almanca kursunun kadrosu.
 *
 * Adlar bilerek gündelik ve çağdaş: ders kitaplarının "Hans und Grete"
 * dünyası, öğrencinin Almanya'da gerçekten duyacağı adlarla aynı değil.
 */
const DE_CAST: Cast[] = [
  { name: "Frau Berger", note: "sıcak ama konuyu dağıtmaz", gender: "f" },
  { name: "Herr Kaufmann", note: "resmî konuşur, açık soru sorar", gender: "m" },
  { name: "Lena", note: "hızlı konuşur, esprilidir", gender: "f" },
  { name: "Tobias", note: "sakin, ayrıntı sever", gender: "m" },
  { name: "Frau Neumann", note: "meraklı, hemen soru sorar", gender: "f" },
  { name: "Herr Schuster", note: "kısa cümlelerle konuşur", gender: "m" },
  { name: "Miriam", note: "cesaretlendirir, sabırlıdır", gender: "f" },
  { name: "Jonas", note: "senli benli, samimi", gender: "m" },
  { name: "Frau Ziegler", note: "düzenli, işini bilir", gender: "f" },
  { name: "Herr Brandt", note: "biraz alaycı ama iyi niyetli", gender: "m" },
  { name: "Katrin", note: "enerjik, konuşmayı sürükler", gender: "f" },
  { name: "Emre", note: "Almanya'da büyümüş, iki dilli", gender: "m" },
  { name: "Frau Hoffmann", note: "anlayışlı, tekrar etmekten çekinmez", gender: "f" },
  { name: "Herr Vogel", note: "ölçüp biçer, sonra karar verir", gender: "m" },
  { name: "Sibel", note: "doğrudan konuşur, net", gender: "f" },
  { name: "Matthias", note: "yardımsever ama acelecidir", gender: "m" },
  { name: "Frau Krüger", note: "deneyimli, sakin", gender: "f" },
  { name: "Herr Lehmann", note: "kurallara düşkün", gender: "m" },
  { name: "Anna", note: "genç, hevesli", gender: "f" },
  { name: "David", note: "espriyi sever, rahat", gender: "m" },
  { name: "Frau Winkler", note: "kibar ama mesafeli", gender: "f" },
  { name: "Herr Roth", note: "sıcakkanlı, anlatmayı sever", gender: "m" },
  { name: "Yasemin", note: "pratik çözüm bulur", gender: "f" },
  { name: "Stefan", note: "dinlemeyi bilir", gender: "m" },
];

/** Zürih kursunun kadrosu — adlar da yerelleşiyor. */
const ZH_CAST: Cast[] = [
  { name: "Frau Bachmann", note: "Zürihli, sıcak ve doğrudan", gender: "f" },
  { name: "Herr Stucki", note: "sakin, ağır konuşur", gender: "m" },
  { name: "Andrea", note: "hızlı konuşur, lehçeyi bırakmaz", gender: "f" },
  { name: "Reto", note: "esprili, senli benli", gender: "m" },
  { name: "Frau Gerber", note: "işini bilir, kısa keser", gender: "f" },
  { name: "Beat", note: "meraklı, soru sorar", gender: "m" },
  { name: "Silvia", note: "sabırlı, tekrar eder", gender: "f" },
  { name: "Marco", note: "genç, rahat", gender: "m" },
  { name: "Frau Furrer", note: "kibar, mesafeli", gender: "f" },
  { name: "Urs", note: "deneyimli, güven verir", gender: "m" },
  { name: "Nadja", note: "enerjik, cesaretlendirir", gender: "f" },
  { name: "Christoph", note: "resmî konuşur", gender: "m" },
];

/** Bir modülde kaç kişi dönüyor. Üç: tanımaya yeter, ezberlemeye değil. */
const CAST_PER_MODULE = 3;

/** Açıklamada geçen cinsiyet ipuçları — yalnızca dördü için gerekiyor. */
const FEMALE_HINTS = ["kadın", "anne", "büyükanne", "abla", "teyze", "hanım", "kız"];
const MALE_HINTS = ["adam", "baba", "büyükbaba", "ağabey", "abi", "amca", "bey ", "erkek", "oğlan"];

function genderHint(partner: string): "f" | "m" | null {
  const s = partner.toLocaleLowerCase("tr-TR");
  if (FEMALE_HINTS.some((h) => s.includes(h))) return "f";
  if (MALE_HINTS.some((h) => s.includes(h))) return "m";
  return null;
}

/**
 * Dersin karakteri.
 *
 * @param lesson        ders
 * @param indexInLevel  dersin kendi seviyesindeki sırası (0 tabanlı) —
 *                      modül ve kadro buradan çıkıyor
 */
export function characterFor(lesson: Lesson, indexInLevel: number): Character {
  const pool = lesson.course === "gsw-zh" ? ZH_CAST : DE_CAST;
  const moduleIndex = Math.floor(Math.max(0, indexInLevel) / MODULE_SIZE);
  const inModule = Math.max(0, indexInLevel) % MODULE_SIZE;

  // Modülün kadrosu: havuzda kayan bir pencere. Kayma adımı kadro
  // büyüklüğünden küçük olsaydı komşu modüller neredeyse aynı kişileri
  // paylaşırdı; eşit olması dünyayı düzenli biçimde genişletiyor.
  const cast: Cast[] = Array.from(
    { length: CAST_PER_MODULE },
    (_, i) => pool[(moduleIndex * CAST_PER_MODULE + i) % pool.length],
  );

  const want = genderHint(lesson.roleplay.partner);
  const ordered = want ? [...cast.filter((c) => c.gender === want), ...cast] : cast;
  // Havuzda o cinsiyetten kimse yoksa (kadro üç kişilik, olabilir) tüm
  // havuzdan ilk uyanı al: sahnenin tutarlılığı kadronun tutarlılığından
  // önce gelir.
  const fallback = want ? pool.find((c) => c.gender === want) : undefined;
  const picked = ordered[inModule % ordered.length];
  const chosen = want && picked.gender !== want ? (fallback ?? picked) : picked;

  return { name: chosen.name, note: chosen.note };
}
