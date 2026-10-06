import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { contentGroupDetail, isGroupKey, reporterRecords, type ContentReportDetail, type ReporterRecord } from "@/lib/moderation-admin";
import { AdminDenied, AdminPage, Badge, Empty, KeyValue, Notice, PageHeader, Panel, when } from "../../../_ui/ui";
import { reasonText, sourceHint, surfaceText, targetText } from "../labels";
import { GroupActions } from "./group-actions";

export const metadata: Metadata = { title: "Bildirim grubu" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/moderation/content/group?g=<grup anahtarı> — bir hedefin
 * bütün bildirimleri, önceki kararlar ve kapatma durumu; kararlar buradan.
 *
 * Anahtar yol parçası değil sorgu: `group_key` iki nokta ve eğik çizgi
 * taşıyabiliyor (`placement_item:r:…`, paket adları).
 *
 * KULLANICI METNİ DÜZ METİN. Açıklama ve anlık görüntü React metni olarak
 * basılıyor (kaçışlı); HTML ya da bağlantı olarak yorumlanmıyor.
 */

/** Anlık görüntü JSON ise girintili, değilse olduğu gibi. */
function pretty(s: string): string {
  const t = s.trim();
  if (!(t.startsWith("{") || t.startsWith("["))) return s;
  try {
    return JSON.stringify(JSON.parse(t), null, 2);
  } catch {
    return s;
  }
}

const DECISION: Record<string, string> = { resolved: "gereği yapıldı", dismissed: "asılsız" };

function Report({ r, rec }: { r: ContentReportDetail; rec?: ReporterRecord }) {
  const ctx: Record<string, string | number> = {};
  if (r.surface) ctx["Yüzey"] = surfaceText(r.surface);
  if (r.game) ctx["Oyun"] = r.game;
  if (r.platform) ctx["Platform"] = r.platform;
  if (r.appVersion) ctx["Sürüm"] = r.appVersion;
  if (r.course) ctx["Kurs"] = r.course;
  if (r.nativeLang) ctx["Anadil"] = r.nativeLang;
  if (r.contentVersion != null) ctx["İçerik sürümü"] = r.contentVersion;
  if (!r.targetType) ctx["Ref"] = r.ref;
  const p = r.reporter;
  return (
    <div className="rounded-tile border p-4 text-caption" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-strong">{reasonText(r.reason)}{r.targetSub ? <span className="muted"> · {r.targetSub}</span> : null}</span>
        <span className="muted font-mono tabular-nums">#{r.id} · {when(r.at)} · {r.status === "open" ? "açık" : "kapalı"}</span>
      </div>
      <div className="muted mt-1">
        Bildiren:{" "}
        <a href={`/admin/users/${encodeURIComponent(p.id)}`} className="text-strong underline-offset-2 hover:underline">{p.name || p.username || "adsız"}</a>
        {p.username ? <span className="font-mono"> @{p.username}</span> : null}
        <span className="font-mono"> {p.id.slice(0, 10)}…</span>
        {p.guest ? <> <Badge>misafir</Badge></> : null}
        {rec ? <span className="tabular-nums"> · {rec.reports} bildirim{rec.resolved ? ` · ${rec.resolved} gereği yapıldı` : ""}{rec.dismissed ? ` · ${rec.dismissed} asılsız` : ""}</span> : null}
      </div>
      {Object.keys(ctx).length ? <div className="mt-2"><KeyValue data={ctx} /></div> : null}
      {r.detail ? (
        <div className="mt-2">
          <div className="muted">Açıklama</div>
          <p className="mt-0.5 whitespace-pre-wrap break-words rounded-tile px-3 py-2 text-body" style={{ background: "var(--surface-2)" }}>{r.detail}</p>
        </div>
      ) : null}
      {r.content ? (
        <details className="mt-2">
          <summary className="muted cursor-pointer">Anlık görüntü ({r.content.length} karakter)</summary>
          <pre className="mt-1 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-tile px-3 py-2 font-mono text-caption" style={{ background: "var(--surface-2)" }}>{pretty(r.content)}</pre>
        </details>
      ) : null}
      {r.decision ? (
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <Badge tone={r.decision.action === "resolved" ? "ok" : undefined}>{DECISION[r.decision.action] ?? r.decision.action}</Badge>
          <span className="muted">{r.decision.actor} · {when(r.decision.at)}</span>
          {r.decision.note ? <span>· {r.decision.note}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export default async function ContentGroupPage({ searchParams }: { searchParams: Promise<{ g?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Bildirim grubu" email={gate.email} />;
  const { g } = await searchParams;
  const crumb: [string, string] = ["/admin/moderation/content", "İçerik geri bildirimi"];
  if (!isGroupKey(g)) {
    return (
      <AdminPage>
        <PageHeader crumb={crumb} title="Bildirim grubu" />
        <Notice tone="bad">Geçersiz grup anahtarı.</Notice>
      </AdminPage>
    );
  }
  const d = await contentGroupDetail(g);
  /* Bildirenin geçmişi: güvenilir bildireni sürekli asılsız bildirenden ayırmak için. */
  const recs = await reporterRecords(d.reports.map((r) => r.reporter.id)).catch(() => ({}) as Record<string, ReporterRecord>);
  const s = d.summary;
  if (!s) {
    return (
      <AdminPage>
        <PageHeader crumb={crumb} title="Bildirim grubu" />
        <Empty>Bu grupta bildirim yok (saklama süresi dolmuş ya da hesap silinmiş olabilir).</Empty>
      </AdminPage>
    );
  }
  const summary: Record<string, string | number> = {
    "Grup anahtarı": d.key,
    Bildirim: s.count,
    Açık: s.open,
    İlk: when(s.first),
    Son: when(s.last),
    Nedenler: Object.entries(s.reasons).map(([k, v]) => `${reasonText(k)} ×${v}`).join(", "),
  };
  if (s.surfaces.length) summary["Yüzeyler"] = s.surfaces.map(surfaceText).join(", ");
  if (s.courses.length || s.natives.length) summary["Kurs / anadil"] = `${s.courses.join(", ") || "—"} / ${s.natives.join(", ") || "—"}`;
  if (s.platforms.length) summary["Platformlar"] = s.platforms.join(", ");
  if (s.pack) summary["İçerik paketi"] = `${s.pack}:${s.item}`;
  const hint = sourceHint(s.targetType, s.pack);
  if (hint) summary["Kaynak"] = hint;

  return (
    <AdminPage>
      <PageHeader crumb={crumb} title={targetText(s)} meta={s.open > 0 ? `${s.open} açık bildirim` : "Bütün bildirimler kapalı"} />
      {d.flag ? (
        <Notice tone="warn" title="Madde yayından kaldırılmış">
          {d.flag.reason || "sebep yok"} · {d.flag.by || "?"} · {when(d.flag.at)}. Açmak için /admin/content.
        </Notice>
      ) : null}
      <Panel title="Özet">
        <KeyValue data={summary} />
      </Panel>
      <Panel title="Karar" hint="Gruptaki bütün AÇIK bildirimler aynı kararla kapanır; her bildirene tek sonuç bildirimi gider. 'İçeriği kapat' maddeyi yayından kaldırır (content_flags, sebep reported) ve grubu 'gereği yapıldı' diye kapatır.">
        <GroupActions group={d.key} open={s.open} canDisable={!!(s.pack && s.item) && !d.flag} ready={d.ready} />
      </Panel>
      <Panel title={`Bildirimler (${d.reports.length})`}>
        <div className="space-y-3">
          {d.reports.map((r) => (
            <Report key={r.id} r={r} rec={recs[r.reporter.id]} />
          ))}
        </div>
      </Panel>
    </AdminPage>
  );
}
