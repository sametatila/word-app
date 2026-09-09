import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { legalDocuments } from "@/lib/db/schema";
import { PRIVACY_DEFAULT } from "@/content/legal/defaults/privacy";
import { TERMS_DEFAULT } from "@/content/legal/defaults/terms";
import { SUPPORT_DEFAULT } from "@/content/legal/defaults/support";
import type { LegalDocDefault } from "@/content/legal/defaults/types";
import { LEGAL_LOCALES, type LegalLocale } from "./index";
import { unbalancedConditionals, unknownTokens } from "./markdown";

/**
 * Hukuki belgelerin gövdesi: koddaki varsayılan + veritabanındaki üstyazım.
 *
 * OKUMA ASLA PATLAMAZ ve bu, buradaki en önemli özellik. Gizlilik politikası
 * sayfasının adresi Play Console'a ve App Store Connect'e verilmiş durumda;
 * bir veritabanı kesintisinde o sayfanın 500 vermesi, inceleme sırasında
 * olabilecek en pahalı arıza. Okuma düşerse koddaki metin basılıyor — eski
 * olabilir ama eksiksiz ve doğru.
 *
 * ÜSTYAZIM BELGE BAZINDA. Panelden yalnız Almanca şartlar düzenlenmişse
 * veritabanında yalnız o satır oluşuyor; kalan sekiz belge varsayılandan
 * geliyor. "Varsayılana dön" de bu yüzden basit: satırı sil.
 */

export const LEGAL_DOC_IDS = ["privacy", "terms", "support"] as const;
export type LegalDocId = (typeof LEGAL_DOC_IDS)[number];

const DEFAULTS: Record<LegalDocId, Record<LegalLocale, LegalDocDefault>> = {
  privacy: PRIVACY_DEFAULT,
  terms: TERMS_DEFAULT,
  support: SUPPORT_DEFAULT,
};

export function defaultDocument(doc: LegalDocId, locale: LegalLocale): LegalDocDefault {
  return DEFAULTS[doc][locale];
}

export function isLegalDocId(v: string): v is LegalDocId {
  return (LEGAL_DOC_IDS as readonly string[]).includes(v);
}

/** Panelde "bu belge değiştirilmiş mi" rozetini basmak için. */
export type StoredDocument = LegalDocDefault & { overridden: boolean; updatedBy: string | null; updatedAt: string | null };

const TTL_MS = 30_000;
let cache: { at: number; value: Map<string, StoredDocument> } | null = null;

const cacheKey = (doc: string, locale: string) => `${doc}.${locale}`;

/** Kayıtlı satırdan tam bir belge kurar; eksik alan varsayılandan tamamlanır. */
function merge(doc: LegalDocId, locale: LegalLocale, row: {
  title: string; description: string; summary: unknown; body: string;
  updatedBy: string | null; updatedAt: Date;
} | undefined): StoredDocument {
  const d = defaultDocument(doc, locale);
  if (!row) return { ...d, overridden: false, updatedBy: null, updatedAt: null };
  return {
    title: row.title.trim() || d.title,
    description: row.description ?? "",
    summary: Array.isArray(row.summary) ? (row.summary as unknown[]).map(String).filter(Boolean) : d.summary,
    // Gövde boşsa varsayılana düşülüyor: panelde yanlışlıkla temizlenen bir
    // metin yüzünden boş bir gizlilik politikası yayımlanmasın.
    body: row.body.trim() || d.body,
    overridden: true,
    updatedBy: row.updatedBy,
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function loadAll(): Promise<Map<string, StoredDocument>> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.value;
  const map = new Map<string, StoredDocument>();
  try {
    const rows = await db.select().from(legalDocuments);
    for (const r of rows) {
      if (!isLegalDocId(r.doc) || !(LEGAL_LOCALES as readonly string[]).includes(r.locale)) continue;
      map.set(cacheKey(r.doc, r.locale), merge(r.doc, r.locale as LegalLocale, r));
    }
    cache = { at: now, value: map };
    return map;
  } catch {
    // Önbelleğe ALINMIYOR: geçici bir kesinti yüzünden yarım dakika boyunca
    // panelden yapılmış düzenlemeleri görmezden gelmeyelim.
    return map;
  }
}

export async function legalDocument(doc: LegalDocId, locale: LegalLocale): Promise<StoredDocument> {
  const map = await loadAll();
  return map.get(cacheKey(doc, locale)) ?? { ...defaultDocument(doc, locale), overridden: false, updatedBy: null, updatedAt: null };
}

/** Panelin okuduğu tam liste: 3 belge × 3 dil. */
export async function allLegalDocuments(): Promise<Record<LegalDocId, Record<LegalLocale, StoredDocument>>> {
  const map = await loadAll();
  const out = {} as Record<LegalDocId, Record<LegalLocale, StoredDocument>>;
  for (const doc of LEGAL_DOC_IDS) {
    out[doc] = {} as Record<LegalLocale, StoredDocument>;
    for (const locale of LEGAL_LOCALES) {
      out[doc][locale] = map.get(cacheKey(doc, locale))
        ?? { ...defaultDocument(doc, locale), overridden: false, updatedBy: null, updatedAt: null };
    }
  }
  return out;
}

/* ── doğrulama ──────────────────────────────────────────────────────────── */

export type DocProblem =
  | { kind: "empty" }
  | { kind: "unknown_token"; tokens: string[] }
  | { kind: "unbalanced_ifios" }
  | { kind: "missing_sections"; headings: string[] };

const headings = (md: string) =>
  md.split("\n").filter((l) => l.startsWith("## ")).map((l) => l.slice(3).trim());

/**
 * Kaydetmeden önceki denetim.
 *
 * İlk üçü ENGELLEYİCİ: bilinmeyen bir belirteç sayfada ham `{{...}}` olarak
 * görünür, kapanmamış bir `{{ifIos}}` metnin geri kalanını yutar, boş gövde
 * politikayı yayından kaldırır.
 *
 * Sonuncusu UYARI: varsayılanda olup düzenlenen metinde olmayan başlıklar.
 * Engellemiyor çünkü bir bölümü bilerek kaldırmak meşru; ama sessiz de
 * kalmıyor, çünkü bir maddenin yanlışlıkla silinmesi bu işin en pahalı hatası
 * ve panelde CI kapısı yok.
 */
export function validateDocument(doc: LegalDocId, locale: LegalLocale, body: string): {
  blocking: DocProblem[];
  warnings: DocProblem[];
} {
  const blocking: DocProblem[] = [];
  const warnings: DocProblem[] = [];
  if (!body.trim()) blocking.push({ kind: "empty" });
  const unknown = unknownTokens(body);
  if (unknown.length) blocking.push({ kind: "unknown_token", tokens: unknown });
  if (unbalancedConditionals(body)) blocking.push({ kind: "unbalanced_ifios" });

  const have = new Set(headings(body));
  const missing = headings(defaultDocument(doc, locale).body).filter((h) => !have.has(h));
  if (missing.length) warnings.push({ kind: "missing_sections", headings: missing });
  return { blocking, warnings };
}

/* ── yazma ──────────────────────────────────────────────────────────────── */

export async function saveLegalDocument(
  doc: LegalDocId,
  locale: LegalLocale,
  input: { title: string; description: string; summary: string[]; body: string },
  actor: string | null,
): Promise<{ ok: true; warnings: DocProblem[] } | { ok: false; problems: DocProblem[] }> {
  const body = String(input.body ?? "");
  const { blocking, warnings } = validateDocument(doc, locale, body);
  if (blocking.length) return { ok: false, problems: blocking };

  const d = defaultDocument(doc, locale);
  const value = {
    doc,
    locale,
    title: String(input.title ?? "").trim().slice(0, 200) || d.title,
    description: String(input.description ?? "").trim().slice(0, 400),
    summary: (Array.isArray(input.summary) ? input.summary : [])
      .map((x) => String(x).trim())
      .filter(Boolean)
      .slice(0, 20)
      .map((x) => x.slice(0, 400)),
    body,
    updatedBy: actor,
  };
  await db
    .insert(legalDocuments)
    .values(value)
    .onConflictDoUpdate({
      target: [legalDocuments.doc, legalDocuments.locale],
      set: { ...value, updatedAt: new Date() },
    });
  cache = null;
  return { ok: true, warnings };
}

/** "Varsayılana dön": satırı siler, sayfa yeniden koddaki metni basar. */
export async function resetLegalDocument(doc: LegalDocId, locale: LegalLocale): Promise<void> {
  await db.delete(legalDocuments).where(and(eq(legalDocuments.doc, doc), eq(legalDocuments.locale, locale)));
  cache = null;
}

export function clearLegalDocumentCache(): void {
  cache = null;
}
