/**
 * İÇERİK GERİ BİLDİRİMİ — `POST /api/reports` gövdesinin kuralları (docs/plan/content-feedback.md).
 *
 * Sözleşme tek yerde: uç gövdeyi burada doğruluyor, panel (`lib/moderation-admin`)
 * etiketleri ve grup anahtarını buradan okuyor. `server-only` DEĞİL ve veri
 * içe aktarmıyor: saf dize işi, istemci de neden listesini buradan alabilir.
 *
 * Süzgeç reddetmeyi tercih ediyor (bkz. `lib/content/ids`): tanınmayan bir
 * yüzey ya da hedef türü sessizce "diğer"e dönmüyor, istek 400 alıyor. Eski
 * istemcinin gövdesi (`{kind, ref, reason, content}`) aynen geçerli; yeni
 * alanların hepsi isteğe bağlı, yalnız `kind: "content"` hedef istiyor.
 */
import { conversationPack, levelOfId, packCourseOf, packCourseOfId, paperPack, quizPack, skillPack } from "@/lib/content/packs";
import { isItemId, isPackId } from "@/lib/content/ids";

/** Yapay zekâ çıktısı nedenleri (chat, assessment) — değişmedi. `impersonation` eski lig tablosu için. */
export const AI_REASONS = ["inappropriate", "offensive", "wrong", "impersonation", "other"] as const;
/** Öğrenme içeriği nedenleri (content). */
export const CONTENT_REASONS = ["wrong_answer", "typo", "translation", "audio", "unclear", "technical", "inappropriate", "other"] as const;
export const SURFACES = ["round", "practice", "walk", "path", "skill", "conversation", "scored", "exam", "mock", "quiz", "placement", "words", "writings"] as const;
export const TARGET_TYPES = ["word", "exercise", "conversation", "exam_item", "mock_task", "quiz_item", "placement_item", "assessment", "chat_turn"] as const;
export const REPORT_PLATFORMS = ["ios", "android", "web"] as const;
/** "user" yalnız eski sürümler için: uç onu `user_reports`a yönlendiriyor. */
export const REPORT_KINDS = ["chat", "assessment", "content", "user"] as const;

export type ReportKind = (typeof REPORT_KINDS)[number];
export type ReportSurface = (typeof SURFACES)[number];
export type ReportTargetType = (typeof TARGET_TYPES)[number];

export const MAX_SNAPSHOT = 4000;
export const MAX_DETAIL = 500;
export const MAX_ID = 120;


/**
 * Kimlik, alt kimlik: `r:<exId>`, `module:A1:3`, `de-a1-w01-g2`, `writing:…`. Biçimler
 * yüzeyden yüzeye değiştiği ve bazı değerlendirme kimlikleri sözcük taşıdığı için
 * kapalı küme DEĞİL: yalnız uzunluk, denetim karakteri yok, başta/sonda boşluk yok.
 * Kimlik yalnız parametreli sorguya ve kaçışlı metne gidiyor; içerik paketi kimliği
 * (`derivePackItem`) kendi kapalı süzgecinden geçiyor.
 */
const ID_RE = /^\S(?:[^\u0000-\u001F\u007F]{0,118}\S)?$/u;
const GAME_RE = /^[a-z][a-z0-9_-]{0,39}$/i;
/** "de", "en", "tr", "gsw-zh". */
const LANG_RE = /^[a-z]{2,3}(-[a-z]{2,4})?$/;
/** "1.0.0 (10)", "web-2026.09.28". */
const VERSION_RE = /^[\w.() +-]{1,40}$/;

export function groupKeyOf(type: string, id: string, sub?: string | null): string {
  return sub ? `${type}:${id}:${sub}` : `${type}:${id}`;
}

/**
 * Hedeften içerik hattının paketi/maddesi (`content_flags` ile eşleşme, "İçeriği
 * kapat"). Kural `lib/content/read`in kapatma denetimiyle AYNI: orada hangi
 * paketin arandığı burada türetilmezse kapatılan madde açık kalır. Türetilemezse null.
 */
export function derivePackItem(type: string, id: string, course?: string | null): { pack: string; item: string } | null {
  let pack = "";
  let item = id;
  if (type === "exercise" || type === "conversation") {
    const level = levelOfId(id);
    if (!level) return null;
    pack = type === "exercise" ? skillPack(packCourseOfId(id), level) : conversationPack(packCourseOfId(id), level);
  } else if (type === "mock_task") {
    /* Görev "de-a1-01-l1" → kâğıt "de-a1-01": deneme paketinin maddesi kâğıdın TAMAMI. */
    const m = /^((?:de|en)-[abc][12]-\d{1,3})-/i.exec(id);
    if (!m) return null;
    item = m[1].toLowerCase();
    pack = paperPack(packCourseOfId(item));
  } else if (type === "quiz_item") {
    /* QuizItem.id `<course>-<level>-w<NN>-…`: kurs önekten, yoksa bağlamdan. */
    const prefix = id.split("-")[0];
    const c = prefix === "de" || prefix === "en" ? prefix : course;
    if (!c) return null;
    pack = quizPack(packCourseOf(c));
  } else {
    return null;
  }
  return isPackId(pack) && isItemId(item) ? { pack, item } : null;
}

export type ParsedReport = {
  kind: ReportKind;
  reason: string;
  ref: string;
  content: string | null;
  surface: string | null;
  targetType: string | null;
  targetId: string | null;
  targetSub: string | null;
  game: string | null;
  detail: string | null;
  platform: string | null;
  appVersion: string | null;
  course: string | null;
  nativeLang: string | null;
  contentVersion: number | null;
  groupKey: string | null;
};

const has = <T extends string>(list: readonly T[], v: unknown): v is T => typeof v === "string" && (list as readonly string[]).includes(v);
/** Denetim karakterleri (satır sonu ve sekme hariç) düşer; düz metin kalır. */
const clean = (v: string) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

/**
 * Gövdeyi doğrular. Hata = hangi alanın düştüğü (yalnız sunucu günlüğü ve test
 * için; istemciye `bad_request` gidiyor).
 */
export function parseReportBody(body: unknown): { ok: true; value: ParsedReport } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, error: "body" };
  const b = body as Record<string, unknown>;
  const kind = has(REPORT_KINDS, b.kind) ? b.kind : null;
  if (!kind) return { ok: false, error: "kind" };
  const reasons: readonly string[] = kind === "content" ? CONTENT_REASONS : AI_REASONS;
  if (typeof b.reason !== "string" || !reasons.includes(b.reason)) return { ok: false, error: "reason" };
  const reason = b.reason;

  let content: string | null = null;
  if (b.content != null) {
    if (typeof b.content !== "string") return { ok: false, error: "content" };
    content = clean(b.content).slice(0, MAX_SNAPSHOT) || null;
  }

  let surface: string | null = null;
  if (b.surface != null) {
    if (!has(SURFACES, b.surface)) return { ok: false, error: "surface" };
    surface = b.surface;
  }

  let targetType: string | null = null;
  let targetId: string | null = null;
  let targetSub: string | null = null;
  let game: string | null = null;
  if (b.target != null) {
    const t = b.target as Record<string, unknown>;
    if (typeof t !== "object" || Array.isArray(t)) return { ok: false, error: "target" };
    if (!has(TARGET_TYPES, t.type)) return { ok: false, error: "target.type" };
    if (typeof t.id !== "string" || !ID_RE.test(t.id.trim())) return { ok: false, error: "target.id" };
    targetType = t.type;
    targetId = t.id.trim();
    if (t.sub != null && t.sub !== "") {
      const sub = typeof t.sub === "number" && Number.isInteger(t.sub) ? String(t.sub) : t.sub;
      if (typeof sub !== "string" || !ID_RE.test(sub.trim())) return { ok: false, error: "target.sub" };
      targetSub = sub.trim();
    }
    if (t.game != null && t.game !== "") {
      if (typeof t.game !== "string" || !GAME_RE.test(t.game)) return { ok: false, error: "target.game" };
      game = t.game;
    }
  }
  if (kind === "content" && !targetType) return { ok: false, error: "target" };

  let detail: string | null = null;
  if (b.detail != null) {
    if (typeof b.detail !== "string") return { ok: false, error: "detail" };
    const d = clean(b.detail);
    if (d.length > MAX_DETAIL) return { ok: false, error: "detail" };
    detail = d || null;
  }

  let platform: string | null = null;
  let appVersion: string | null = null;
  let course: string | null = null;
  let nativeLang: string | null = null;
  let contentVersion: number | null = null;
  if (b.context != null) {
    const c = b.context as Record<string, unknown>;
    if (typeof c !== "object" || Array.isArray(c)) return { ok: false, error: "context" };
    if (c.platform != null) {
      if (!has(REPORT_PLATFORMS, c.platform)) return { ok: false, error: "context.platform" };
      platform = c.platform;
    }
    if (c.appVersion != null && c.appVersion !== "") {
      if (typeof c.appVersion !== "string" || !VERSION_RE.test(c.appVersion.trim())) return { ok: false, error: "context.appVersion" };
      appVersion = c.appVersion.trim();
    }
    if (c.course != null && c.course !== "") {
      if (typeof c.course !== "string" || !LANG_RE.test(c.course)) return { ok: false, error: "context.course" };
      course = c.course;
    }
    if (c.nativeLang != null && c.nativeLang !== "") {
      if (typeof c.nativeLang !== "string" || !LANG_RE.test(c.nativeLang)) return { ok: false, error: "context.nativeLang" };
      nativeLang = c.nativeLang;
    }
    if (c.contentVersion != null) {
      if (typeof c.contentVersion !== "number" || !Number.isInteger(c.contentVersion) || c.contentVersion < 0 || c.contentVersion > 2_147_483_647) {
        return { ok: false, error: "context.contentVersion" };
      }
      contentVersion = c.contentVersion;
    }
  }

  const groupKey = targetType && targetId ? groupKeyOf(targetType, targetId, targetSub) : null;
  /* Eski gövdede `ref` zorunlu; yeni gövdede istemci göndermese de hedeften kuruluyor. */
  const rawRef = typeof b.ref === "string" ? clean(b.ref).slice(0, MAX_ID) : "";
  const ref = rawRef || groupKey || "";
  if (!ref) return { ok: false, error: "ref" };

  return {
    ok: true,
    value: { kind, reason, ref, content, surface, targetType, targetId, targetSub, game, detail, platform, appVersion, course, nativeLang, contentVersion, groupKey },
  };
}
