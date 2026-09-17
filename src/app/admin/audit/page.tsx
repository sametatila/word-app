import type { Metadata } from "next";
import { sql } from "drizzle-orm";
import { adminGate } from "@/lib/admin";
import { queryRunner } from "@/lib/admin-query";
import { AdminDenied, AdminPage, DataTable, Notice, PageHeader, Panel, when } from "../_ui/ui";

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
  if (!gate.ok) return <AdminDenied title="İşlem kaydı" email={gate.email} />;
  const { rows, issues } = queryRunner("işlem kaydı");
  const list = await rows(sql`select id, created_at, admin_email, action, coalesce(target, '') target, detail, coalesce(ip, '') ip
    from admin_audit order by id desc limit 300`);
  return (
    <AdminPage>
      <PageHeader title="İşlem kaydı" description="Panelden yapılan her değişiklik: kim, ne zaman, hangi eylem, hangi hedef, hangi IP'den." meta={`Son ${list.length} kayıt`} />
      {issues.length ? <Notice tone="bad">Kayıt okunamadı: {issues[0].message}</Notice> : null}
      <Panel flush>
        <DataTable
          empty="Henüz kayıt yok."
          head={["Zaman", "Admin", "Eylem", "Hedef", "Ayrıntı", "IP"]}
          rows={list.map((r) => {
            const target = String(r.target);
            return [
              <span key="z" className="whitespace-nowrap">{when(String(r.created_at))}</span>,
              String(r.admin_email),
              <span key="e" className="font-mono">{String(r.action)}</span>,
              /^[\w-]{20,64}$/.test(target)
                ? <a key="h" href={`/admin/users/${encodeURIComponent(target)}`} className="font-mono underline-offset-2 hover:underline">{target.slice(0, 12)}…</a>
                : <span key="h" className="font-mono">{target || "—"}</span>,
              <span key="a" className="block max-w-xs break-all font-mono">{r.detail ? JSON.stringify(r.detail) : "—"}</span>,
              <span key="i" className="font-mono">{String(r.ip) || "—"}</span>,
            ];
          })}
        />
      </Panel>
    </AdminPage>
  );
}
