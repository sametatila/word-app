import type { AlertLinks } from "@/lib/admin-links";
import type { ContentGroupRow, ContentReportRow, ReporterRecord, UserReportRow } from "@/lib/moderation-admin";
import type { StoreReview } from "@/lib/store-reviews";
import { slaState, type QueueId, type SlaLevel } from "@/lib/response-sla";

/** "Sonraki sürümde düzelecek" beklemesi (`lib/release-holds`): build, kaç bildiren kaldı, kaçı güncelledi. */
export type InboxHold = { build: number; note: string | null; at: string; open: number; reporters: number; updated: number };

/** Claude'a bırakılmış işin görünümü (`lib/claude-tasks`); istemcide de kullanılıyor. */
export type InboxClaude = { status: "waiting" | "done"; note: string | null; result: string | null; at: string; doneAt: string | null };

/**
 * GELEN İŞLER — panelin açılış kuyruğunun istemciyle PAYLAŞILAN kısmı (tipler,
 * sıralama, kategori). Veri `admin-inbox.ts`te (server-only).
 *
 * Dönülmesi gereken her şey tek listede: kullanıcı şikâyetleri, yapay zekâ
 * bildirimleri, içerik bildirimi grupları, cevapsız 1-2★ mağaza yorumları ve
 * uyarı motorunun (Telegram'la aynı) sistem uyarıları. Eskiden bunlar dört
 * sayfaya dağılmıştı ve "önce hangisi" sorusunu okuyan kişi kendisi
 * cevaplıyordu; sıra artık geri dönüş süresine göre (`lib/response-sla`).
 */
export type InboxCategory = "sikayet" | "yorum" | "icerik" | "sistem";

type Base = {
  id: string;
  cat: InboxCategory;
  /** Aciliyet kademesi (`rankOf`); küçük olan üstte. */
  rank: number;
  /** Geri dönüş süresinin dolduğu an (ms); uyarıda yok. */
  due: number | null;
  /** İşin başladığı an (süre halkası için); uyarıda yok. */
  created: string | null;
  /** Claude'a bırakıldıysa (içerik, yapay zekâ bildirimi, şikâyet). */
  claude?: InboxClaude | null;
  /** Sürüm bekliyorsa (içerik, yapay zekâ bildirimi): süre durur, iş alttaki bölümde. */
  hold?: InboxHold | null;
};

export type InboxItem =
  | (Base & { kind: "alert"; level: "kritik" | "uyari"; text: string; links: AlertLinks })
  | (Base & { kind: "user_report"; queue: "user_report"; report: UserReportRow })
  | (Base & { kind: "ai_report"; queue: "ai_report"; report: ContentReportRow })
  | (Base & { kind: "content"; queue: "content_feedback"; group: ContentGroupRow })
  | (Base & { kind: "review"; queue: "store_review"; review: StoreReview });

export type Inbox = {
  items: InboxItem[];
  /** `moderation_actions` var mı: yoksa şikâyetler okunur ama kapatılamaz. */
  ready: boolean;
  /** Hesaplama anı: sunucu ve tarayıcı çizimi aynı kalan süreyi yazsın (hidrasyon). */
  now: number;
  /** Okunamayan kaynaklar: kuyruk "boş" değil EKSİK görünsün. */
  errors: string[];
  /** Bildirenler: kim + geçmişi (kaç bildirim, kaçı asılsız), kimliğe göre. */
  reporters: Record<string, ReporterRecord>;
  /** "Sonraki sürümde düzelecek"in önerdiği build: görülen en yüksek + 1. */
  suggestedBuild: number;
};

/**
 * Kuyrukta zaten iş olarak duran konuların uyarıları. Uyarı motoru bunları
 * Telegram için ayrıca üretiyor ("3 şikâyetin süresi doluyor", "yeni 1★
 * yorum"); kuyrukta ikinci kez görünmeleri aynı işi iki satır yapardı.
 */
export const QUEUE_ALERT_FAMILIES = new Set(["reports", "sla-late", "sla-soon", "err-review", "err-reportnew", "err-reporthot", "claude", "err-releasehold"]);

/**
 * Aciliyet: kritik uyarı → süresi geçen → süresi yaklaşan → uyarı → süresi olan.
 * Aynı kademede süresi önce dolan üstte.
 */
export function rankOf(x: { kind: "alert"; level: "kritik" | "uyari" } | { kind: "queue"; level: SlaLevel }): number {
  if (x.kind === "alert") return x.level === "kritik" ? 0 : 3;
  return x.level === "late" ? 1 : x.level === "soon" ? 2 : 4;
}

export function sortInbox(items: InboxItem[]): InboxItem[] {
  return [...items].sort((a, b) => a.rank - b.rank || (a.due ?? Infinity) - (b.due ?? Infinity) || a.id.localeCompare(b.id));
}

/** Halka ve kalan süre: geçen sürenin hedefe oranı (0-1, gecikmişte 1). */
export function slaProgress(queue: QueueId, created: string, now: number): { level: SlaLevel; ratio: number; leftMs: number } | null {
  const s = slaState(queue, created, now);
  if (!s) return null;
  const start = Date.parse(created);
  const total = s.due - start;
  const ratio = total > 0 ? Math.min(1, Math.max(0, (now - start) / total)) : 1;
  return { level: s.level, ratio, leftMs: s.leftMs };
}

export const CATEGORY_LABEL: Record<InboxCategory, string> = { sikayet: "Şikâyet", yorum: "Yorum", icerik: "İçerik", sistem: "Sistem" };
