/**
 * "Kelimelerim" ekranının paylaşılan tipleri. Liste /api/words'ten gelir —
 * burada veri YOK; misafir modu kalktığında demo liste de kaldırılmıştı ama
 * bu başlık hâlâ onu anlatıyordu. Durum SRS'ten türer: new/learning/mastered.
 */
export type WordStatus = "new" | "learning" | "familiar" | "mastered" | "leech";
export type WordRow = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  niveau: string;
  /** Tür ("Nomen"/"Verb"/...) ve çoğul kalıbı — `ui/wordGrammar` ile etikete çevrilir. */
  typ: string;
  formen: string | null;
  /** İngilizce karşılık — satırda Türkçenin yanında ayraçla. */
  en?: string | null;
  beispiel?: string | null;
  beispielTr?: string | null;
  beispielEn?: string | null;
  status: WordStatus;
  /** SRS aralığı (gün) — "tanıdık" eşiği buna bakıyor. */
  intervalDays?: number | null;
  /** Tekrar takvimi — uç yeni gönderiyor; eski sürümlerde yok. */
  dueAt?: string | null;
  lapses?: number;
  leech?: boolean;
};

/**
 * Kelimenin gerçek durumu — web `word-list` `statusOf` ile AYNI eşikler.
 *
 * Uç yalnız üç değer gönderiyor (`new`/`learning`/`mastered`) ve web listesi
 * BEŞ değer gösteriyor: aradaki ikisi "tanıdık" (3 günü geçen aralık) ve
 * "zorlanıyorsun" (leech). Mobil üçle kalıyordu, yani tekrar tekrar unutulan
 * kelime öğrenilenden ayırt edilemiyordu.
 */
/** "Tanıdık" bandının tabanı (gün) — web `lib/word-status.ts` `FAMILIAR_DAYS`. */
export const FAMILIAR_DAYS = 3;

export function statusOf(w: WordRow): WordStatus {
  if (w.leech) return "leech";
  if (w.status === "new") return "new";
  if (w.status === "mastered") return "mastered";
  /* Sayı artık ADLI: web tarafında da `FAMILIAR_DAYS` ve "ortak sayisal
     sabitler" kapısı ikisini ada bakarak karşılaştırıyor. Eşiğin kendisi
     ucun üç değerinde yok — `familiar` yalnız etikette var. */
  return (w.intervalDays ?? 0) >= FAMILIAR_DAYS ? "familiar" : "learning";
}

/**
 * "Tekrar zamanı geldi" / "yarın tekrar" / "3 gün sonra tekrar" — web
 * `word-list` `dueLabel` ile aynı eşikler.
 */
export function dueLabelKey(dueAt: string | null | undefined): { key: string; n?: number } {
  if (!dueAt) return { key: "words.not_studied" };
  const days = Math.round((new Date(dueAt).getTime() - Date.now()) / 86400000);
  if (days <= 0) return { key: "words.due_now" };
  if (days === 1) return { key: "words.due_tomorrow" };
  return { key: "words.due_in_days", n: days };
}

/** Durum -> sözlük anahtarı; etiket kullanım anında t() ile çözülür. */
export const STATUS_KEY: Record<WordStatus, string> = {
  new: "words.status_new",
  learning: "words.status_learning",
  familiar: "words.status_familiar",
  mastered: "words.status_mastered",
  leech: "words.status_leech",
};

