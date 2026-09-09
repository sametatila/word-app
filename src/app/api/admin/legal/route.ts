import { NextResponse } from "next/server";
import { adminGate } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { isLegalLocale, type LegalLocale } from "@/lib/legal";
import { legalConfig, saveLegalConfig } from "@/lib/legal/config";
import {
  allLegalDocuments,
  isLegalDocId,
  resetLegalDocument,
  saveLegalDocument,
  validateDocument,
} from "@/lib/legal/documents";
import { knownTokens } from "@/lib/legal/markdown";

export const dynamic = "force-dynamic";

/**
 * Hukuki metin ve bilgi yönetimi — panelin yazma ucu.
 *
 * `/api/admin/premium` ile AYNI kalıp: tek uç, `action` ile ayrılıyor, aynı-köken
 * denetimi yetkiden önce. Sebep orada yazılı — kopyalanan bir yetki kontrolü er
 * geç birinde eksik kalır.
 *
 * DOĞRULAMA SUNUCUDA. Metin `validateDocument`ten geçmeden yazılmıyor:
 * tanınmayan belirteç, kapanmamış `{{ifIos}}` ve boş gövde REDDEDİLİYOR. Bunlar
 * "kullanıcı hatası" değil, yayına çıkmış bir sözleşme sayfasını bozan şeyler —
 * ilki sayfada ham `{{...}}` gösterir, ikincisi metnin geri kalanını yutar,
 * üçüncüsü politikayı yayından kaldırır.
 *
 * Bölüm kaybı UYARI olarak dönüyor, engel değil: bir bölümü bilerek kaldırmak
 * meşru. Ama sessiz de kalmıyor — panelde CI kapısı yok ve bir maddenin
 * yanlışlıkla silinmesi bu işin en pahalı hatası.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const gate = await adminGate();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const action = String(body.action ?? "");

  /** Belge eylemlerinin ortak girdisi: hangi belge, hangi dil. */
  function target(): { doc: string; locale: LegalLocale } | null {
    const doc = String(body.doc ?? "");
    const locale = String(body.locale ?? "");
    if (!isLegalDocId(doc) || !isLegalLocale(locale)) return null;
    return { doc, locale };
  }

  try {
    switch (action) {
      case "save_config": {
        const cfg = await saveLegalConfig(body.config, gate.email);
        return NextResponse.json({ ok: true, config: cfg });
      }
      case "reset_config": {
        // Boş nesne = her alan koddaki varsayılana düşer (ayrıştırıcıya bakılırsa).
        const cfg = await saveLegalConfig({}, gate.email);
        return NextResponse.json({ ok: true, config: cfg });
      }
      case "save_document": {
        const t = target();
        if (!t) return NextResponse.json({ error: "bad_target" }, { status: 400 });
        const d = (body.document ?? {}) as Record<string, unknown>;
        const result = await saveLegalDocument(
          t.doc as Parameters<typeof saveLegalDocument>[0],
          t.locale,
          {
            title: String(d.title ?? ""),
            description: String(d.description ?? ""),
            summary: Array.isArray(d.summary) ? d.summary.map(String) : [],
            body: String(d.body ?? ""),
          },
          gate.email,
        );
        if (!result.ok) return NextResponse.json({ error: "invalid", problems: result.problems }, { status: 400 });
        return NextResponse.json({ ok: true, warnings: result.warnings, documents: await allLegalDocuments() });
      }
      case "reset_document": {
        const t = target();
        if (!t) return NextResponse.json({ error: "bad_target" }, { status: 400 });
        await resetLegalDocument(t.doc as Parameters<typeof resetLegalDocument>[0], t.locale);
        return NextResponse.json({ ok: true, documents: await allLegalDocuments() });
      }
      case "check_document": {
        // Kaydetmeden denetim: panel yazarken uyarıları gösterebilsin.
        const t = target();
        if (!t) return NextResponse.json({ error: "bad_target" }, { status: 400 });
        const v = validateDocument(
          t.doc as Parameters<typeof validateDocument>[0],
          t.locale,
          String((body.document as Record<string, unknown>)?.body ?? ""),
        );
        return NextResponse.json({ ok: true, ...v });
      }
      default:
        return NextResponse.json({ error: "unknown_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/legal]", action, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

/** Panelin okuduğu her şey: yapılandırma, dokuz belge, belirteç sözlüğü. */
export async function GET() {
  const gate = await adminGate();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const [config, documents] = await Promise.all([legalConfig(), allLegalDocuments()]);
  return NextResponse.json(
    { config, documents, tokens: knownTokens() },
    { headers: { "cache-control": "no-store" } },
  );
}
