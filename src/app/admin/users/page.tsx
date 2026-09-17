import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { listUsers, parseUsersQuery, USERS_PAGE_SIZE, type UsersQuery } from "@/lib/admin-users";

export const metadata: Metadata = { title: "Kullanıcılar" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/users — kullanıcı listesi, sunucu tarafı arama ve sayfalama.
 *
 * İstemci kodu yok: arama bir GET formu, süzgeç/sıralama/sayfa düz bağlantı.
 * Adres paylaşılabilir ("premium olanlar, XP'ye göre, 3. sayfa") ve geri tuşu
 * çalışıyor. Ayrıntı için satırdaki ada tıklanır (/admin/users/[id]).
 */
const KINDS: [UsersQuery["kind"], string][] = [["all", "Hepsi"], ["account", "Hesap"], ["guest", "Misafir"], ["premium", "Premium"], ["suspended", "Askıda"]];
const SORTS: [UsersQuery["sort"], string][] = [["active", "Son aktif"], ["joined", "Yeni katılan"], ["xp", "XP"], ["streak", "Seri"]];

function href(q: UsersQuery, patch: Partial<UsersQuery>): string {
  const n = { ...q, ...patch };
  const p = new URLSearchParams();
  if (n.q) p.set("q", n.q);
  if (n.kind !== "all") p.set("tur", n.kind);
  if (n.sort !== "active") p.set("sira", n.sort);
  if (n.page > 1) p.set("sayfa", String(n.page));
  const s = p.toString();
  return `/admin/users${s ? `?${s}` : ""}`;
}

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Kullanıcılar</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>Yönetim yetkisi gerekiyor.</p>
      </div>
    );
  }
  const query = parseUsersQuery(await searchParams);
  const { rows, total, issues } = await listUsers(query);
  const pages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE));
  const on = { background: "var(--color-brand)", color: "var(--on-fill)" };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
      <h1 className="text-h1">Kullanıcılar</h1>
      <p className="muted text-body">{total.toLocaleString("tr-TR")} kişi{query.q ? ` · "${query.q}" araması` : ""}</p>
      {issues.length ? <p role="alert" className="text-caption" style={{ color: "var(--color-rose)" }}>Sorgu başarısız: {issues[0].message}</p> : null}

      <form action="/admin/users" method="get" className="mt-4 flex flex-wrap gap-2">
        <input name="q" defaultValue={query.q} placeholder="E-posta, ad, kullanıcı adı ya da kimlik" aria-label="Kullanıcı ara" className="h-10 min-w-0 flex-1 rounded-tile border px-3 text-body" style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }} />
        {query.kind !== "all" ? <input type="hidden" name="tur" value={query.kind} /> : null}
        {query.sort !== "active" ? <input type="hidden" name="sira" value={query.sort} /> : null}
        <button type="submit" className="btn btn-primary h-10 px-4">Ara</button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-caption">
        {KINDS.map(([k, label]) => (
          <a key={k} href={href(query, { kind: k, page: 1 })} aria-current={query.kind === k ? "page" : undefined} className="chip h-8 px-3" style={query.kind === k ? on : undefined}>{label}</a>
        ))}
        <span className="mx-1 muted">·</span>
        {SORTS.map(([k, label]) => (
          <a key={k} href={href(query, { sort: k, page: 1 })} aria-current={query.sort === k ? "page" : undefined} className="chip h-8 px-3" style={query.sort === k ? on : undefined}>{label}</a>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-body">
          <thead className="muted text-caption">
            <tr>
              {["Ad / e-posta", "Çift", "Seviye", "Seri", "XP", "Kelime", "Son aktif", "Katıldı"].map((h) => <th key={h} className="py-1 pr-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.userId} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-1.5 pr-3">
                  <a href={`/admin/users/${encodeURIComponent(u.userId)}`} className="font-semibold underline-offset-2 hover:underline">{u.name || u.username || u.email || u.userId.slice(0, 8)}</a>
                  {u.guest ? <span className="ml-1.5 text-micro muted">misafir</span> : null}
                  {u.premium ? <span className="ml-1.5 text-micro" style={{ color: "#16a34a" }}>premium</span> : null}
                  {u.suspended ? <span className="ml-1.5 text-micro" style={{ color: "#dc2626" }}>askıda</span> : null}
                  {u.email ? <div className="text-caption muted">{u.email}</div> : null}
                </td>
                <td className="pr-3 font-mono text-caption muted">{u.pair}</td>
                <td className="pr-3">{u.level}</td>
                <td className="pr-3 tabular-nums">{u.streak}</td>
                <td className="pr-3 tabular-nums">{u.xp.toLocaleString("tr-TR")}</td>
                <td className="pr-3 tabular-nums">{u.words}</td>
                <td className="pr-3 tabular-nums">{u.lastActive || "—"}</td>
                <td className="tabular-nums">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="muted mt-3 text-caption">Eşleşme yok.</p> : null}
      </div>

      <nav aria-label="Sayfalar" className="mt-4 flex items-center gap-2 text-caption">
        {query.page > 1 ? <a href={href(query, { page: query.page - 1 })} className="chip h-8 px-3">← Önceki</a> : null}
        <span className="muted">Sayfa {query.page} / {pages}</span>
        {query.page < pages ? <a href={href(query, { page: query.page + 1 })} className="chip h-8 px-3">Sonraki →</a> : null}
      </nav>
    </div>
  );
}
