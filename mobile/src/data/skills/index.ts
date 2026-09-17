/**
 * Beceri egzersizi kataloğu — SEVİYE PAKETLERİ hâlinde sunucudan iniyor.
 *
 * İki JSON ikilinin içindeydi (2,4 MB + 2,4 MB) ve kullanıcı aynı anda tek
 * seviyede çalışıyor: A1'deki biri C1'in egzersizlerini de taşıyordu. Paket
 * artık seviye başına (`skills/<kurs>-<seviye>`), girildiğinde iniyor ve
 * diskte kalıyor — inen seviye çevrimdışı çalışmaya devam ediyor.
 *
 * Kaynak yine tek: `src/lib/skills/content/`, döküm projeksiyonu yine
 * `scripts/dump-skills-mobile` (`content:publish` onu kullanıyor).
 *
 * İki kurs, iki dosya ve İKİSİ AYNI ŞEY DEĞİL (ölçüm, 2026-09-11):
 * Almanca paket 995 egzersiz taşıyor, 870'i bir Patika ünitesine bağlı ve
 * 125'i kütüphanenin; İngilizce paket 189 egzersizin TAMAMI kütüphane,
 * ünitesi olan tek egzersiz yok. Yani İngilizce kursta Patika'nın
 * okuma/dinleme/yazma yuvaları boş kalıyor (`ref: null`) ve listede hiç
 * görünmüyor - eksik olan kod değil içerik, üç beceri × beş seviye ×
 * 50 yuva. Web'de de aynısı; iki platform ayrışmıyor.
 *
 * Beş beceri var: okuma, dinleme, yazma (Patika + kütüphane), konuşma ve
 * dil bilgisi (yalnız kütüphane).
 */
import { courseOrDefault, currentCourseId } from "../../lib/courses";
import { nativeExercise } from "../../lib/nativeContent";
import { ensurePack, getContentItem, listContentItems } from "../../content/store";

export type Gloss = { de: string; tr: string; en?: string; hd?: string; note?: string };
export type SkillQuestion = {
  kind?: "mcq" | "truefalse" | "gapfill" | "produce" | "short_answer" | "order" | "dictation";
  text: string; options: string[]; answer: number; accept?: string[]; items?: string[]; explain: string;
};
export type ListeningSegment = { speaker?: string; text: string; audio?: string };
export type SkillKey = "reading" | "listening" | "writing" | "speaking" | "grammar";
/**
 * Web'deki `SkillExercise` birleşiminin düz (gevşek) mobil karşılığı: paket
 * JSON ve alanlar beceriye göre dolu/boş. Beceriler kütüphanesiyle (2026-09)
 * gelen alanlar: `course`, `focus` + `explanation` (dil bilgisi), `monologue`
 * (konuşma, B1+), `tasks` (yazma görevleri ya da söyleyiş cümleleri).
 */
export type SkillExercise = {
  id: string; level: string; skill: SkillKey; course?: string;
  title: string; genre: string; intro: string; gloss: Gloss[]; minutes: number; unit?: number;
  text?: string; segments?: ListeningSegment[]; questions?: SkillQuestion[]; tasks?: unknown[];
  focus?: string;
  explanation?: { heading?: string; tr: string; examples?: { de: string; tr: string; note?: string }[] }[];
  monologue?: { promptTr: string; bulletsTr: string[]; targets: Gloss[]; minSeconds: number; maxSeconds: number; sampleDe: string; rubricHint?: string };
  /** Konuşma alıştırmasının tur listesi (A1-A2); madde sayısı buradan. */
  dialogue?: unknown[];
};

/**
 * İNEN SEVİYE PAKETLERİ — anahtar paket kimliği, değer o seviyenin havuzu.
 *
 * Almanca paketin id'leri kurs öneksiz ("a1-u1-r1", üretici `course` alanını
 * düşürüyor); İngilizce paket kurs önekli ("en-a1-u1-r1") — aynı id iki
 * kursta birden var olsaydı tek dizin ikisini karıştırırdı.
 */
const pools = new Map<string, SkillExercise[]>();

/**
 * Kursun paket adı. Ders yükleyicisiyle aynı kural: aynı hedef dili paylaşan
 * kursa düşmek meşru (gsw-zh → de), farklı dile ASLA düşülmez.
 */
function packOf(course: string, level: string): string {
  const target = courseOrDefault(course).targetLang;
  return `skills/${target === "en" ? "en" : "de"}-${level.toLowerCase()}`;
}

/**
 * Kimlikten seviye: "a1-u1-r1" → A1, "de-a1-lib-r1" → A1, "en-c1-u2-w1" → C1.
 *
 * Üç biçim de dolaşıyor ve hiçbiri seviyeyi sabit bir konumda tutmuyor; kapalı
 * bir kalıp aramak (`^[abc][12]$`) konuma güvenmekten sağlam. Egzersizi
 * kimliğiyle isteyen ekran hangi paketi indireceğini böyle biliyor.
 */
export function skillLevelOf(id: string): string | null {
  for (const part of id.split("-")) if (/^[abc][12]$/.test(part)) return part.toUpperCase();
  return null;
}

/**
 * Seviye paketini indirir ve belleğe alır — ekran çizmeden ÖNCE çağrılıyor.
 *
 * Sync okuyucular (`listOwnSkillMeta`, `getExercise`) paket inmeden boş
 * dönüyor: liste ekranları boş durumu zaten çizebiliyor ve uydurma bir
 * içerik göstermektense boş göstermek doğru. İnen paket bir daha istenmiyor.
 *
 * @returns Havuz KULLANILABİLİR mi. Dönüş değeri var çünkü çağıran ekranın
 * "paket inemedi" ile "paket indi, içinde bir şey yok" arasını ayırması
 * gerekiyor: ikisi de boş liste demek ama biri ağ hatası, öteki içerik
 * eksikliği. Karıştırıldığında ekran çevrimdışı kullanıcıya "bu kursta
 * egzersiz yok" diyor.
 */
export async function ensureSkills(level: string, course: string = currentCourseId()): Promise<boolean> {
  const pack = packOf(course, level);
  if (pools.has(pack)) return true;
  const ok = await ensurePack(pack);
  if (!ok) return false;
  const ids = await listContentItems(pack);
  const out: SkillExercise[] = [];
  for (const id of ids) {
    const ex = await getContentItem<SkillExercise>(pack, id);
    if (ex) out.push(ex);
  }
  pools.set(pack, out);
  return true;
}

function poolFor(course: string, level: string): SkillExercise[] {
  return pools.get(packOf(course, level)) ?? [];
}

/*
  ANA DİL BURADA. Egzersizin içeriğini okuyan TEK yol bu; oynatıcılar,
  puanlama ve kayıt hepsi `getExercise`ten geçiyor. `listMeta` çevirmiyor
  ve çevirmemeli: liste satırı yalnız `title`/`genre` taşıyor, ikisi de
  öğrenilen dilde.
*/
export function getExercise(id: string, course: string = currentCourseId()): SkillExercise | undefined {
  const level = skillLevelOf(id);
  if (!level) return undefined;
  const e = poolFor(course, level).find((x) => x.id === id);
  return e ? nativeExercise(e) : undefined;
}

export type SkillMeta = { id: string; level: string; skill: string; title: string; genre: string; minutes: number; items: number };

/**
 * Egzersizin MADDE sayısı — web `lib/skills/meta` `itemCount` ile aynı kural.
 *
 * Liste satırı bunu yazıyor ("3 madde"): öğrenci açmadan önce ne kadar iş
 * olduğunu görüyor. Mobil listede hiç yoktu, oysa veri elde ve kural üç
 * satır. Konuşma üç biçimde gelir - söyleyiş görevleri, diyalog turları ya
 * da tek monolog - ve üçü ayrı sayılır.
 */
export function itemCount(ex: SkillExercise): number {
  if (ex.skill === "writing") return ex.tasks?.length ?? 0;
  if (ex.skill === "speaking") return ex.dialogue ? ex.dialogue.length : ex.monologue ? 1 : (ex.tasks?.length ?? 0);
  return ex.questions?.length ?? 0;
}

/**
 * Havuz İKİYE AYRILDI ve iki taraf birbirinin egzersizini görmüyor.
 *
 * Ayrımı veri zaten taşıyordu: `unit` alanı dolu olan egzersiz bir Patika
 * ünitesine aittir (Almanca havuzda 870 tane), boş olan yalnız Beceriler
 * sekmesinindir (Almanca 125: beş becerinin her biri için 25; İngilizce 189).
 * Bu alan bir süre mobilde hiç okunmuyordu: Beceriler havuzun TAMAMINI
 * listeliyordu, yani Patika'daki her egzersiz orada bir kez daha
 * görünüyordu.
 *
 * Patika tarafı sırayla tüketiyor (ünite başına 2). Bugün fark yaratmıyor —
 * havuz zaten ünite sırasına dizili ve bağsızlar sonda — ama süzgeç yine de
 * konuldu: bir seviyede ünite sayısı bağlı egzersizden fazla olursa üretici
 * Beceriler'in içeriğine taşardı ve ayrım sessizce bozulurdu.
 */
function metaOf(e: SkillExercise): SkillMeta {
  return { id: e.id, level: e.level, skill: e.skill, title: e.title, genre: e.genre, minutes: e.minutes, items: itemCount(e) };
}

function listMeta(
  level: string,
  skill: SkillKey,
  course: string,
  keep: (e: SkillExercise) => boolean,
): SkillMeta[] {
  return poolFor(course, level).filter((e) => e.level === level && e.skill === skill && keep(e)).map(metaOf);
}

/** Patika üretici havuzu — yalnız bir üniteye bağlı egzersizler. */
export function listPathSkillMeta(
  level: string,
  skill: SkillKey,
  course: string = currentCourseId(),
): SkillMeta[] {
  return listMeta(level, skill, course, (e) => e.unit != null);
}

/** Beceriler sekmesi — yalnız Patika'da yeri olmayan, sekmenin kendi egzersizleri. */
export function listOwnSkillMeta(
  level: string,
  skill: SkillKey,
  course: string = currentCourseId(),
): SkillMeta[] {
  return listMeta(level, skill, course, (e) => e.unit == null);
}
