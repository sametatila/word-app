import type { Metadata } from "next";
import { sql } from "drizzle-orm";
import { adminGate } from "@/lib/admin";
import { queryRunner } from "@/lib/admin-query";

export const metadata: Metadata = { title: "İşlem kaydı" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/audit — admin işlem kaydı (son 300).
 *
 * Panelden yapılan her başarılı yazma (premium, hukuki metin, moderasyon,
 * uygulama işletimi, hesap işlemleri) buraya düşüyor: kim, ne zaman, hangi
 * eylem, hangi hedef, hangi IP'den (lib/admin `logAdminAction`).
 */
export default async function AdminAuditPage() {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">İşlem kaydı</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>Yönetim yetkisi gerekiyor.</p>
      </div>
    );
  }
  const { rows, issues } = queryRunner("işlem kaydı");
  const list = await rows(sql`select id, created_at, admin_email, action, coalesce(target, '') target, detail, coalesce(ip, '') ip
    from admin_audit order by id desc limit 300`);
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6">
      <h1 className="text-h1">İşlem kaydı</h1>
      <p className="muted text-body">Panelden yapılan her değişiklik: kim, ne, hangi hedef.</p>
      {issues.length ? <p role="status" className="text-caption" style={{ color: "var(--color-rose)" }}>Kayıt okunamadı: {issues[0].message}</p> : null}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-caption" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="muted text-micro uppercase tracking-eyebrow">
              {["Zaman", "Admin", "Eylem", "Hedef", "Ayrıntı", "IP"].map((h) => <th key={h} className="px-2 py-1.5 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => {
              const target = String(r.target);
              return (
                <tr key={String(r.id)} className="border-t align-top" style={{ borderColor: "var(--hairline)" }}>
                  <td className="whitespace-nowrap px-2 py-1.5 tabular-nums">{new Date(String(r.created_at)).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}</td>
                  <td className="px-2 py-1.5">{String(r.admin_email)}</td>
                  <td className="px-2 py-1.5 font-mono">{String(r.action)}</td>
                  <td className="px-2 py-1.5 font-mono">
                    {/^[\w-]{20,64}$/.test(target) ? <a href={`/admin/users/${encodeURIComponent(target)}`} className="underline-offset-2 hover:underline">{target.slice(0, 12)}…</a> : target || "—"}
                  </td>
                  <td className="max-w-xs break-all px-2 py-1.5 font-mono">{r.detail ? JSON.stringify(r.detail) : "—"}</td>
                  <td className="px-2 py-1.5 font-mono">{String(r.ip) || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {list.length === 0 ? <p className="muted mt-3 text-caption">Henüz kayıt yok.</p> : null}
      </div>
    </div>
  );
}
