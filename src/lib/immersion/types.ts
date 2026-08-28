import type { CefrLevel } from "@/lib/skills/types";
import type { LessonIcon } from "@/lib/lessons/types";

/**
 * Immersion — ikinci mod (bkz. docs/plan/immersion.md).
 *
 * "Beceriler" bölümü kalktı; içeriği derslerin arasına serpiliyor. Yeni yapı üç
 * katman: **Track** (kurs+seviye) → sıralı **Unit**'ler → sıralı **Item**'lar.
 * Item, altındaki mevcut içeriğe (ders ya da beceri egzersizi) `ref` ile bağlanır;
 * içeriği henüz kurulmamış slotlar `ref: null` taşır (yer tutucu — read/listen/
 * write/grammar/quiz içeriği ünite temasına göre sonradan doldurulacak).
 *
 * Bu dosya YALNIZ tip + saf yapı; DB'ye ya da Next'e dokunmaz. Builder da saf
 * (bkz. build.ts) — böylece DB'siz test edilebilir.
 */

export type ImmersionItemKind =
  | "lesson" // mevcut ders — üretim/roleplay omurgası (userLessons ilerlemesi)
  | "read" // okuma egzersizi (skill_exercises → reading)
  | "listen" // dinleme egzersizi
  | "write" // yazma egzersizi
  | "grammar" // odaklı dilbilgisi mini-drill — içerik sonra (ara sıra)
  | "quiz" // ünitenin kelime+kalıplarından kısa karışık hatırlama (ara sıra)
  | "checkpoint"; // ünite bitirme sınavı → sonraki üniteyi açar

/**
 * Ünitedeki tek düğüm. Alanlar tüm türler için ortak tutuldu (renderer ve
 * ilerleme anahtarı `kind` üzerinden dallanır) — ayrık birlik yerine düz biçim,
 * çünkü ilerleme kaydı ve yol-haritası çizimi her item'ı aynı anahtarla ele alır.
 */
export type ImmersionItem = {
  /** Track içinde kalıcı, benzersiz kimlik: `${unit.id}-${kind}${n}`. İlerleme buna bağlanır. */
  id: string;
  kind: ImmersionItemKind;
  /**
   * Altındaki içeriğin kimliği: `lesson` için ders id'si, read/listen/write için
   * skill_exercises id'si. `null` = boş slot (içerik henüz kurulmadı); grammar/
   * quiz/checkpoint bugün daima null (motorları var, içerikleri sonra).
   */
  ref: string | null;
  /** Almanca başlık — ders/egzersiz başlığı ya da tür etiketi ("Kontrol Noktası"). */
  title: string;
  /** Türkçe alt başlık — ders titleTr'i, egzersiz türü (genre) ya da kısa açıklama. */
  titleTr?: string;
  /** Yalnız `lesson`: yol-haritası düğüm simgesi. */
  icon?: LessonIcon;
};

export type ImmersionUnit = {
  /** `${course}-${levelLower}-u${NN}` — kalıcı kimlik. */
  id: string;
  /** Seviye içi 1-tabanlı sıra. */
  index: number;
  /** Görsel gruplama/sayfalama kümesi (0-tabanlı): floor((index-1)/groupSize). */
  group: number;
  level: CefrLevel;
  course: string;
  /** Tema — ünitenin ilk dersinin düştüğü modülden (moduleTheme). */
  theme: string;
  /** Sıralı item'lar; sonuncusu daima `checkpoint`. */
  items: ImmersionItem[];
  /** Dolu (ref'li) ders item sayısı — ünitenin iskeleti buna dayanır. */
  lessonCount: number;
};

export type ImmersionTrack = {
  course: string;
  level: CefrLevel;
  /** Seviyedeki tüm üniteler, sırayla. */
  units: ImmersionUnit[];
  /** Kaç ünitede bir sayfa/grup sınırı (gating + pagination — Duolingo "ilk 10"). */
  groupSize: number;
};
