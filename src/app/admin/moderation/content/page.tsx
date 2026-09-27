import type { Metadata } from "next";
import Link from "next/link";
import { adminGate } from "@/lib/admin";
import { CONTENT_PAGE_SIZE, contentFeedbackList, contentQueryParams, parseContentQuery, type ContentQuery } from "@/lib/moderation-admin";
import { AdminDenied, AdminPage, Badge, BTN, DataTable, Empty, Field, FIELD, FIELD_STYLE, Notice, PageHeader, Panel, Segmented, when } from "../../_ui/ui";
import { reasonText, surfaceText, targetText } from "./labels";

export const metadata: Metadata = { title: "İçerik geri bildirimi" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/moderation/content — her ekrandaki "Bildir"in kuyruğu
 * (docs/plan/content-feedback.md), HEDEFE GÖRE gruplu.
 *
 * Kullanıcılar sayfası gibi istemci kodu yok: süzgeç bir GET formu, sayfa ve
 * durum düz bağlantı; adres paylaşılabilir ve geri tuşu çalışıyor. Karar grup
 * ayrıntısında (`./group?g=…`), yazma ucu `/api/admin/moderation` (2FA + işlem kaydı).
 */
const STATUS: [ContentQuery["status"], string][] = [["open", "Açık"], ["closed", "Kapalı"], ["all", "Hepsi"]];

const href = (q: ContentQuery, patch: Partial<ContentQuery>) => {
  const s = contentQueryParams(q, patch).toString();
  return `/admin/moderation/content${s ? `?${s}` : ""}`;
};

function Select({ name, label, value, options, text = (v: string) => v }: { name: string; label: string; value: string; options: string[]; text?: (v: string) => string }) {
  /* Seçili değer tabloda artık yoksa (adres elle yazıldı) yine seçenek olarak görünsün. */
  const all = value && !options.includes(value) ? [value, ...options] : options;
  return (
    <Field label={label} className="basis-36">
      <select name={name} defaultValue={value} className={FIELD} style={FIELD_STYLE}>
        <option value="">Hepsi</option>
        {all.map((o) => (
          <option key={o} value={o}>{o === "-" ? "(yok, eski)" : text(o)}</option>
        ))}
      </select>
    </Field>
  );
}

export default async function ContentFeedbackPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="İçerik geri bildirimi" email={gate.email} />;
  const q = parseContentQuery(await searchParams);
  const data = await contentFeedbackList(q);
  const pages = Math.max(1, Math.ceil(data.total / CONTENT_PAGE_SIZE));
  const csv = `/api/admin/moderation/export?${contentQueryParams(q, { page: 1 }).toString()}`;
  const filtered = !!(q.surface || q.reason || q.course || q.native || q.platform || q.from || q.to || q.q);

  return (
    <AdminPage>
      <PageHeader
        crumb={["/admin/moderation", "Moderasyon"]}
        title="İçerik geri bildirimi"
        description="Kelime, alıştırma, sınav ve yapay zekâ çıktıları için kullanıcı bildirimleri, hedefe göre gruplu. Grup kapatılınca her bildirene tek sonuç bildirimi gider."
        meta={<>Açık: <b>{data.openReports}</b> bildirim · <b>{data.openGroups}</b> hedef · bu süzgeçte {data.total} grup</>}
        actions={<a href={csv} className={BTN.secondary} download>CSV</a>}
      />
      {data.error ? <Notice tone="bad" title="Sorgu başarısız">{data.error}</Notice> : null}

      <Panel>
        <div className="mb-3">
          <Segmented label="Durum" items={STATUS} value={q.status} href={(k) => href(q, { status: k, page: 1 })} />
        </div>
        <form action="/admin/moderation/content" method="get" className="flex flex-wrap items-end gap-2">
          {q.status !== "open" ? <input type="hidden" name="durum" value={q.status} /> : null}
          <Field label="Ara (hedef kimliği, anlık görüntü, açıklama)" className="flex-1 basis-64">
            <input name="q" aria-label="Ara" defaultValue={q.q} placeholder="ör. a1-r3, Hund, 1234" className={FIELD} style={FIELD_STYLE} />
          </Field>
          <Select name="yuzey" label="Yüzey" value={q.surface} options={[...data.options.surfaces, "-"]} text={surfaceText} />
          <Select name="neden" label="Neden" value={q.reason} options={data.options.reasons} text={reasonText} />
          <Select name="kurs" label="Kurs" value={q.course} options={data.options.courses} />
          <Select name="anadil" label="Anadil" value={q.native} options={data.options.natives} />
          <Select name="platform" label="Platform" value={q.platform} options={data.options.platforms} />
          <Field label="Başlangıç" className="basis-36">
            <input type="date" name="bas" aria-label="Başlangıç tarihi" defaultValue={q.from} className={FIELD} style={FIELD_STYLE} />
          </Field>
          <Field label="Bitiş" className="basis-36">
            <input type="date" name="son" aria-label="Bitiş tarihi" defaultValue={q.to} className={FIELD} style={FIELD_STYLE} />
          </Field>
          <button type="submit" className={BTN.primary}>Süz</button>
          {filtered ? <Link href={href({ ...q, surface: "", reason: "", course: "", native: "", platform: "", from: "", to: "", q: "" }, { page: 1 })} className={BTN.secondary}>Temizle</Link> : null}
        </form>
      </Panel>

      <Panel flush>
        {data.groups.length ? (
          <DataTable
            name="icerik-bildirimleri"
            empty="Eşleşme yok."
            /* Sıralama SUNUCUDA (son bildirim tarihi): başlıkla sıralamak yalnız bu sayfayı dizerdi. */
            head={[
              { label: "Hedef", sortable: false },
              { label: "Yüzey", sortable: false },
              { label: "En sık neden", sortable: false },
              { label: "Bildirim", align: "right", sortable: false },
              { label: "İlk / son", sortable: false },
              { label: "Kurs / anadil", sortable: false },
              { label: "Platform", sortable: false },
              { label: "Durum", sortable: false },
            ]}
            rows={data.groups.map((g) => [
              <div key="t" className="min-w-56 max-w-md">
                <a href={`/admin/moderation/content/group?g=${encodeURIComponent(g.key)}`} className="text-strong underline-offset-2 hover:underline">{targetText(g)}</a>
                {g.pack ? <div className="muted font-mono">{g.pack}:{g.item}</div> : null}
                {g.sample ? <div className="muted mt-0.5 line-clamp-2 break-words">{g.sample}</div> : null}
              </div>,
              <span key="s">{g.surfaces.length ? g.surfaces.map(surfaceText).join(", ") : "—"}</span>,
              <span key="r">{g.topReason ? reasonText(g.topReason) : "—"}{Object.keys(g.reasons).length > 1 ? <span className="muted"> +{Object.keys(g.reasons).length - 1}</span> : null}</span>,
              <span key="n" className="tabular-nums">{g.count}{g.open !== g.count && g.open > 0 ? <span className="muted"> ({g.open} açık)</span> : null}</span>,
              <span key="d" className="whitespace-nowrap tabular-nums">{when(g.first)}<br /><span className="muted">{when(g.last)}</span></span>,
              <span key="c" className="font-mono">{g.courses.join(", ") || "—"} / {g.natives.join(", ") || "—"}</span>,
              <span key="p">{g.platforms.join(", ") || "—"}</span>,
              g.open > 0 ? <Badge key="st" tone={g.count >= 3 ? "bad" : "warn"}>açık</Badge> : <Badge key="st" tone="ok">kapalı</Badge>,
            ])}
          />
        ) : (
          <div className="p-4"><Empty>{q.status === "open" && !filtered ? "Açık içerik bildirimi yok." : "Bu süzgeçte bildirim yok."}</Empty></div>
        )}
      </Panel>

      {pages > 1 ? (
        <nav aria-label="Sayfalar" className="flex items-center justify-center gap-3 text-caption">
          {q.page > 1 ? <Link href={href(q, { page: q.page - 1 })} className={BTN.small}>← Önceki</Link> : null}
          <span className="muted tabular-nums">Sayfa {q.page} / {pages}</span>
          {q.page < pages ? <Link href={href(q, { page: q.page + 1 })} className={BTN.small}>Sonraki →</Link> : null}
        </nav>
      ) : null}
    </AdminPage>
  );
}
