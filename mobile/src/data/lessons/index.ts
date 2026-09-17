import type { DialogueTurn } from "../../lib/native";
/**
 * Ders kataloğu — A1 İKİLİDE, gerisi iniyor.
 *
 * On JSON (7,2 MB) pakette duruyordu ve kullanıcı aynı anda tek seviyede
 * çalışıyor. Artık yalnız A1 tohumu ikilide: uygulama ağ olmadan da açılıyor,
 * ilk ders hemen başlıyor, üst seviyeler girildiğinde inip diskte kalıyor.
 *
 * TOHUM NEDEN A1 VE NEDEN İKİ KURS BİRDEN: ikili hangi kursun seçileceğini
 * bilmiyor (kurs hesapta), o yüzden ikisinin de A1'i gömülü — brotli ile
 * ~250 KB. İlk açılışın ağa bağlı olmaması bu tohuma bağlı.
 *
 * Kaynak yine tek: `scripts/dump-lessons-mobile` projeksiyonu hem tohumu
 * yazıyor hem yayını besliyor (`content:publish`).
 */
import { courseOrDefault, currentCourseId } from "../../lib/courses";
import { nativeLesson } from "../../lib/nativeContent";
import { ensurePack, getContentItem, listContentItems } from "../../content/store";
import a1 from "./de-a1.json";
import enA1 from "./en-a1.json";

/**
 * Anlatım segmenti.
 *
 * `lang` ANLATIM mı HEDEF dil mi olduğunu ayırır: "tr" öğretmenin (anadil)
 * sesi, diğerleri öğrenilen dil. Bu yüzden okuyucular "=== de" diye değil
 * "!== tr" diye bakmalı — yoksa İngilizce dersler hedef dil sayılmaz ve ne
 * seslendirilir ne de vurgulanır.
 */
export type Segment = { lang: "tr" | "de" | "en"; text: string };
export type Expectation =
  | { kind: "confirm" }
  | { kind: "repeat"; target: string }
  | { kind: "produce"; target: string; accept?: string[]; hint: Segment[] }
  | { kind: "truefalse"; statement: string; answer: boolean; why: Segment[] };
export type LectureStep = { say: Segment[]; expect?: Expectation };
export type VocabItem = { de: string; tr: string };
export type PatternItem = { de: string; tr: string };
export type LessonRoleplay = {
  /*
   * `minTurns` ZORUNLU. Tip isteğe bağlı tanımlıydı ve iki yerde `?? 6`
   * yazılıydı: alan düşse Android altı tur ister, web `undefined`ı ekrana
   * basardı - yani aynı ders iki platformda başka bir kural uygular. Web tipi
   * baştan beri zorunlu (`src/lib/lessons/types.ts`) ve içerik webden
   * dökülüyor; ölçüm bin seksen rol yapma dersinin HEPSİNDE alanın dolu
   * olduğunu gösterdi, yani varsayılan hiç çalışmıyordu ama sayı kodda
   * duruyordu.
   */
  scene: string; partner: string; opening: string; openingTr: string; goal: string; minTurns: number;
  /**
   * Dallanan senaryo — yalnız 780 dersin 10'unda var. Sağlayıcı kapalıyken
   * konuşma bundan oynanıyor (`game/offlineRoleplay`); yoksa dersin kalıpları
   * sırayla isteniyor. Tip `lib/native` içindekiyle aynı (döküm yolu onu
   * çevirmek için zaten tanıyor).
   */
  script?: DialogueTurn[];
};
export type Lesson = {
  id: string; level: string; course: string; icon: string;
  title: string; titleTr: string; summary: string; minutes: number; focusId: string;
  vocab: VocabItem[]; patterns: PatternItem[]; lecture: LectureStep[]; roleplay: LessonRoleplay;
};

/**
 * İKİLİDEKİ TOHUM — yalnız A1, iki kurs için.
 *
 * Seviye anahtarı olmayan ve inmemiş seviye boş dönüyor; Patika o ünitelerde
 * "Yakında" gösteriyor ve farklı bir dilin derslerine ASLA düşmüyor
 * (gsw-zh → de meşru, çünkü ikisinin hedefi de Almanca).
 */
const SEED: Record<string, Record<string, Lesson[]>> = {
  de: { A1: a1 as Lesson[] },
  en: { A1: enA1 as Lesson[] },
};

/** İnen seviyeler — anahtar `"<paketKursu>-<SEVİYE>"`. */
const pools = new Map<string, Lesson[]>();

/** Kursun ders paketinin kursu: hedef dile göre, kurs kimliğine göre değil. */
function packCourse(course: string): "de" | "en" {
  return courseOrDefault(course).targetLang === "en" ? "en" : "de";
}

function packOf(course: string, level: string): string {
  return `lessons/${packCourse(course)}-${level.toLowerCase()}`;
}

/** Kimlikten seviye: "de-b1-bewerbung" → B1, "en-c1-weight" → C1. */
export function lessonLevelOf(id: string): string | null {
  const part = id.split("-")[1];
  return part && /^[abc][12]$/i.test(part) ? part.toUpperCase() : null;
}

/** Kimlikten kurs: kimliğin ilk parçası zaten paket kursu. */
function courseOfId(id: string): "de" | "en" {
  return id.split("-")[0] === "en" ? "en" : "de";
}

/**
 * Seviye derslerini indirir ve belleğe alır — ekran çizmeden ÖNCE.
 *
 * A1 tohumdan geliyor, indirme hiç yapılmıyor. Sync okuyucular paket inmeden
 * boş dönüyor: Patika "Yakında" gösteriyor, uydurma bir ders göstermiyor.
 *
 * @returns Havuz KULLANILABİLİR mi (tohum ya da inen paket). Çağıran ekran
 * "paket inemedi" ile "ders gerçekten yok" arasını buna bakarak ayırıyor;
 * ikisi de eli boş bırakıyor ama biri ağ hatası, öteki eksik içerik.
 */
export async function ensureLessons(level: string, course: string = currentCourseId()): Promise<boolean> {
  const lv = level.toUpperCase();
  const c = packCourse(course);
  if (SEED[c]?.[lv]) return true;
  const key = `${c}-${lv}`;
  if (pools.has(key)) return true;
  const pack = packOf(course, lv);
  const ok = await ensurePack(pack);
  if (!ok) return false;
  const ids = await listContentItems(pack);
  const out: Lesson[] = [];
  for (const id of ids) {
    const lesson = await getContentItem<Lesson>(pack, id);
    if (lesson) out.push(lesson);
  }
  /* SIRA `listContentItems`ten geliyor: paket kaynak sırasını ayrı bir
     maddede taşıyor (bkz. `content/store` ORDER_ITEM). Kimliğe göre
     sıralamak YANLIŞ olurdu — ölçüldü, hiçbir seviyede kaynak sırası kimlik
     sırasıyla aynı değil ve patika üniteleri listeyi sırayla tüketiyor. */
  pools.set(key, out);
  return true;
}

function poolOf(course: string, level: string): Lesson[] {
  const lv = level.toUpperCase();
  const c = packCourse(course);
  return SEED[c]?.[lv] ?? pools.get(`${c}-${lv}`) ?? [];
}

/*
  ANA DİL BURADA UYGULANIYOR, çağıranda değil.

  Ders içeriğini okuyan her yer (Patika listesi, oynatıcı, ilerleme, tekrar
  kuyruğu) buradan geçiyor; çeviriyi çağıranlara dağıtmak, birini unutunca
  aynı dersin bir ekranda İngilizce bir ekranda Türkçe görünmesi demekti.
  Çeviri gerekmiyorsa (`native_lang` Türkçe) `nativeLesson` nesneyi aynen
  döndürüyor ve 4,62 MB'lık sözlük hiç açılmıyor.
*/
export function lessonsForLevel(level: string, course: string = currentCourseId()): Lesson[] {
  return poolOf(course, level).map(nativeLesson);
}

/**
 * Dersi kimliğinden bulur — kurs ve seviye kimliğin İÇİNDE.
 *
 * Eskiden bütün paketlerden kurulmuş tek bir dizin vardı; paketler indiğine
 * göre öyle bir dizin ya eksik olur ya da her şeyi indirmeyi gerektirir.
 * Kimlik zaten "kurs-seviye-slug": doğru havuza doğrudan gidiliyor.
 */
export function findLesson(id: string): Lesson | undefined {
  const level = lessonLevelOf(id);
  if (!level) return undefined;
  const l = poolOf(courseOfId(id), level).find((x) => x.id === id);
  return l ? nativeLesson(l) : undefined;
}

/** Puanlanan adım sayısı — ders kaydının paydası (üretim + doğru/yanlış). */
export function scoredSteps(l: Lesson): number {
  return l.lecture.filter((s) => s.expect?.kind === "produce" || s.expect?.kind === "truefalse").length;
}
