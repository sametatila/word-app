/**
 * PAKET KİMLİKLERİ — içeriğin hangi pakete düştüğünü söyleyen tek yer.
 *
 * Yayın betiği paketleri bu kurala göre kuruyor, web kapatılmış maddeyi bu
 * kurala göre arıyor, mobil aynı adları kendi tarafında üretiyor. Kural üç
 * yerde ayrı yazılsaydı, kapatılan bir madde webde "başka bir pakette" aranır
 * ve sessizce açık kalırdı — kapatma anahtarının en kötü kırılma biçimi.
 *
 * `server-only` DEĞİL: saf dize işi, istemci de kullanabilir.
 */

/** Hedef dil paket kursunu belirliyor: gsw-zh de Almanca kâğıtları çözüyor. */
export type PackCourse = "de" | "en";

export function packCourseOf(targetLang: string): PackCourse {
  return targetLang === "en" ? "en" : "de";
}

export function conversationPack(course: PackCourse, level: string): string {
  return `conversations/${course}-${level.toLowerCase()}`;
}

export function skillPack(course: PackCourse, level: string): string {
  return `skills/${course}-${level.toLowerCase()}`;
}

export function paperPack(course: PackCourse): string {
  return `papers/${course}`;
}

export function mockIndexPack(course: PackCourse, level: string): string {
  return `mockindex/${course}-${level.toLowerCase()}`;
}

/**
 * Haftalık quiz — içeriği yayın hattında DEĞİL, sunucuda kuruluyor.
 *
 * Yine de bir paket adı var: kapatma listesi sürümden bağımsız olduğu için
 * hiç yayınlanmamış bir paketin maddesi de kapatılabiliyor. Bozuk bir quiz
 * sorusu böylece bir sonraki içerik yayınını beklemeden düşüyor.
 */
export function quizPack(course: PackCourse): string {
  return `quiz/${course}`;
}

/**
 * Haftalık quizin ANA DİL sözlüğü — `quiznative/en`, `quiznative/de`.
 *
 * `native/<dil>` paketinin İÇİNDE DEĞİL ve KAPILI (`lib/content/ids`
 * `GATED_PREFIXES`). Sözlük quizin açıklamalarını (`why`) taşıyor ve quiz
 * açıklamayı ancak gönderimden sonra veriyor: cevap anahtarı istemciye hiç
 * inmiyor (bkz. `weekly-quiz/scoring`). Herkese açık `native/en` manifestinde
 * dursaydı her açıklama — yani her maddenin "neden doğru"su — tek bir liste
 * okumasıyla dışarıdaydı. Sözlüğü yalnız sunucu okuyor (`/api/quiz`).
 */
export function quizNativePack(lang: "en" | "de"): string {
  return `quiznative/${lang}`;
}

/**
 * Kimlikten seviye — üç biçim de dolaşıyor ve hiçbiri seviyeyi sabit konumda
 * tutmuyor: "a1-u1-r1", "de-a1-lib-r1", "en-c1-u2-w1". Kapalı bir kalıp aramak
 * konuma güvenmekten sağlam.
 */
export function levelOfId(id: string): string | null {
  for (const part of id.split("-")) if (/^[abc][12]$/i.test(part)) return part.toUpperCase();
  return null;
}

/** Kimlikten paket kursu: önek varsa o, yoksa Almanca (önekini düşüren döküm). */
export function packCourseOfId(id: string): PackCourse {
  return id.split("-")[0] === "en" ? "en" : "de";
}
