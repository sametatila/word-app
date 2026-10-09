import { translate, type NativeLang } from "@/lib/i18n/dict";
import { apiFetch } from "@/lib/api-fetch";

/**
 * İçerik bildirimi — mobil `M/src/lib/report.ts`in karşılığı.
 *
 * UÇ AYLARDIR VARDI, ÇAĞIRAN YOKTU. `POST /api/reports` yazıldı, sınırları
 * kondu, yönetim panosuna bağlandı; ama web'de hiçbir düğme onu çağırmıyordu.
 * Mobilde üç yerde var: sohbet yanıtı, yazma değerlendirmesi ve sıralamada
 * bir kullanıcı adı. Play'in "yapay zekâ ile üretilen içerik" politikası da
 * bunu istiyor: kullanıcı rahatsız edici bir yanıtı uygulamadan çıkmadan
 * bildirebilmeli.
 */
/**
 * Türler — sunucu listesi `api/reports` KINDS ile aynı, mobil aynı dizgeleri
 * kullanıyor. Yeni yüzeyler yeni tür açmıyor, `ref` önekiyle ayrılıyor:
 *   chat    konuşma sohbeti "<conversationId>:<turn>" · sohbet SINAVI "<conversationId>:scored:<turn>"
 *   assessment  kayıtlı değerlendirme (Yazdıklarım) kayıt kimliği · anlık
 *               değerlendirme "<yüzey>:<kimlik>" (ör. "writing:<alıştırma>",
 *               "speaking:<alıştırma>", "exam:<konuşma>", "word:<kelime>")
 *   user        kullanıcı adı (sıralama) kullanıcı kimliği
 *   content     öğrenme içeriği (kelime, alıştırma, sınav maddesi, …): `ref`
 *               hedeften türetiliyor, asıl kimlik yapısal `target`ta
 *               (sözleşme: `docs/plan/content-feedback.md`)
 */
export type ReportKind = "chat" | "assessment" | "user" | "content";
export type ReportReason =
  | "inappropriate"
  | "offensive"
  | "wrong"
  | "abuse"
  | "spam"
  | "impersonation"
  | "other"
  | "wrong_answer"
  | "typo"
  | "translation"
  | "audio"
  | "unclear"
  | "technical";
export type Reason = { key: ReportReason; label: string; sub?: string };

/** İçerik bildiriminin geldiği ekran — sunucu listesiyle aynı dizgeler. */
export type ReportSurface =
  | "round"
  | "practice"
  | "walk"
  | "path"
  | "skill"
  | "conversation"
  | "scored"
  | "exam"
  | "mock"
  | "quiz"
  | "placement"
  | "words"
  | "writings";

/**
 * Bildirilen şeyin KALICI kimliği. Panel bildirimleri bununla grupluyor;
 * aynı hedef (+ `sub`) 24 saat içinde ikinci kez gelirse sunucu yeni satır
 * açmıyor, `duplicate` dönüyor.
 */
export type ReportTarget = {
  type:
    | "word"
    | "exercise"
    | "conversation"
    | "exam_item"
    | "mock_task"
    | "quiz_item"
    | "placement_item"
    | "assessment"
    | "chat_turn";
  id: string;
  /** Soru sırası, tur, madde no. */
  sub?: string;
  /** Oyun (`GameId`) — yalnız tur, pratik ve yürüyüş. */
  game?: string;
};

/** Bildirimin bağlamı: panelde kurs/dil/platform süzgeçleri bundan. */
export type ReportContext = {
  course?: string;
  nativeLang?: NativeLang;
  contentVersion?: number;
};

/** Gönderimin sonucu: `duplicate` = aynı hedef 24 saat içinde zaten bildirilmiş. */
export type ReportResult = "ok" | "duplicate" | "too_fast" | "error";

/** Serbest ayrıntının üst sınırı — sunucu da aynı sınırı uyguluyor. */
export const REPORT_DETAIL_MAX = 500;

/** Eski `ref` alanı içerikte hedeften türetiliyor: `type:id[:sub]`. */
export function targetRef(target: ReportTarget): string {
  return `${target.type}:${target.id}${target.sub ? `:${target.sub}` : ""}`;
}

/**
 * İçerik sebepleri — sunucunun içerik listesiyle aynı sekiz dizge. Alt satır
 * yok: etiketler kendi başına açık ve liste sekiz satır; ikinci satır sayfayı
 * küçük ekranda kaydırmaya zorluyordu.
 */
function contentReasons(lang: NativeLang): Reason[] {
  const c = (key: ReportReason, label: string): Reason => ({ key, label: translate(lang, label) });
  return [
    c("wrong_answer", "report.r_wrong_answer"),
    c("typo", "report.r_typo"),
    c("translation", "report.r_translation"),
    c("audio", "report.r_audio"),
    c("unclear", "report.r_unclear"),
    c("technical", "report.r_technical"),
    c("inappropriate", "report.inappropriate_content"),
    c("other", "report.something_else"),
  ];
}

/**
 * Sebepler türe göre değişiyor: bir yapay zekâ yanıtı "yanlış bilgi"
 * verebilir ama kimliğe bürünemez; bir kullanıcı adı bunun tersi.
 */
export function reasonsFor(kind: ReportKind, lang: NativeLang): Reason[] {
  if (kind === "content") return contentReasons(lang);
  const r = (key: ReportReason, label: string, sub: string): Reason => ({
    key,
    label: translate(lang, label),
    sub: translate(lang, sub),
  });
  return kind === "user"
    ? [
        r("inappropriate", "report.inappropriate_name", "report.sexual_violent_or_illegal"),
        r("abuse", "report.insult_or_hate", "report.degrading_or_discriminatory"),
        r("spam", "user.report_spam", "report.spam_sub"),
        r("impersonation", "report.impersonation", "report.someone_else_s_name_or_brand"),
        r("other", "report.something_else", "report.none_of_above_fits"),
      ]
    : [
        r("inappropriate", "report.inappropriate_content", "report.sexual_violent_or_illegal"),
        r("offensive", "report.offensive", "report.insults_degradation_hate_speech"),
        r("wrong", "report.incorrect_information", "report.wrong_grammar_or_wrong_content"),
        r("other", "report.something_else", "report.none_of_above_fits"),
      ];
}

export async function sendReport(
  kind: ReportKind,
  ref: string,
  reason: ReportReason,
  content: string,
  extra?: { surface?: ReportSurface; target?: ReportTarget; detail?: string; context?: ReportContext },
): Promise<ReportResult> {
  try {
    /* Kullanıcı şikâyeti sosyal uca: tek kuyruk (`user_reports`), kendini
       bildirme engeli, hız sınırı ve karar bildirimi orada. Ad o anki hâliyle
       not olarak gidiyor; kullanıcı adını sonra değiştirse de panel görür. */
    if (kind === "user") {
      const res = await apiFetch("/api/social/reports", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: ref, reason, detail: content.slice(0, 500) || undefined }),
      });
      return res.ok ? "ok" : "error";
    }
    /* Yeni alanlar YALNIZ varsa ekleniyor: yapay zekâ bildirimlerinin gövdesi
       eskisiyle birebir kalıyor (sunucu eski gövdeyi aynen kabul ediyor). */
    const detail = extra?.detail?.trim().slice(0, REPORT_DETAIL_MAX);
    const body = {
      kind,
      ref: extra?.target ? targetRef(extra.target) : ref,
      reason,
      content: content.slice(0, 4000),
      ...(extra?.surface ? { surface: extra.surface } : {}),
      ...(extra?.target ? { target: extra.target } : {}),
      ...(detail ? { detail } : {}),
      ...(extra?.context ? { context: { platform: "web", ...extra.context } } : {}),
    };
    const res = await apiFetch("/api/reports", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    /* 429 yalnız sel korumasından gelir (günlük kota yok): "biraz bekle", genel hata değil. */
    if (res.status === 429) return "too_fast";
    if (!res.ok) return "error";
    const data = (await res.json().catch(() => null)) as { duplicate?: boolean } | null;
    return data?.duplicate ? "duplicate" : "ok";
  } catch {
    return "error";
  }
}
