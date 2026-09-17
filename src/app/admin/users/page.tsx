import type { Metadata } from "next";
import Link from "next/link";
import { adminGate } from "@/lib/admin";
import { listUsers, parseUsersQuery, USERS_PAGE_SIZE, type UsersQuery } from "@/lib/admin-users";
import { AdminDenied, AdminPage, Badge, BTN, DataTable, FIELD, FIELD_STYLE, Notice, PageHeader, Panel } from "../_ui/ui";

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

/** Bağlantılı seçim grubu: süzgeç ve sıralama. Seçili olan `aria-current` taşıyor. */
function Segment({ items, current, to }: { items: [string, string][]; current: string; to: (k: string) => string }) {
  return (
    <div className="inline-flex flex-wrap gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
      {items.map(([k, label]) => (
        <Link
          key={k}
          href={to(k)}
          aria-current={current === k ? "page" : undefined}
          className="inline-flex h-8 items-center rounded-chip px-3 text-caption"
          style={current === k ? { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-soft)" } : { color: "var(--text-muted)" }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Kullanıcılar" email={gate.email} />;
  const query = parseUsersQuery(await searchParams);
  const { rows, total, issues } = await listUsers(query);
  const pages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE));

  return (
    <AdminPage>
      <PageHeader
        title="Kullanıcılar"
        description="Bütün hesaplar ve misafirler. Ayrıntı ve hesap işlemleri için ada tıkla."
        meta={`${total.toLocaleString("tr-TR")} kişi${query.q ? ` · "${query.q}" araması` : ""}`}
      />
      {issues.length ? <Notice tone="bad">Sorgu başarısız: {issues[0].message}</Notice> : null}

      <Panel>
        <form action="/admin/users" method="get" className="flex flex-wrap gap-2">
          <input name="q" defaultValue={query.q} placeholder="E-posta, ad, kullanıcı adı ya da kimlik" aria-label="Kullanıcı ara" className={`${FIELD} flex-1 basis-64`} style={FIELD_STYLE} />
          {query.kind !== "all" ? <input type="hidden" name="tur" value={query.kind} /> : null}
          {query.sort !== "active" ? <input type="hidden" name="sira" value={query.sort} /> : null}
          <button type="submit" className={BTN.primary}>Ara</button>
          {query.q ? <Link href={href(query, { q: "", page: 1 })} className={BTN.secondary}>Temizle</Link> : null}
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Segment items={KINDS} current={query.kind} to={(k) => href(query, { kind: k as UsersQuery["kind"], page: 1 })} />
          <span className="muted text-caption">Sırala</span>
          <Segment items={SORTS} current={query.sort} to={(k) => href(query, { sort: k as UsersQuery["sort"], page: 1 })} />
        </div>
      </Panel>

      <Panel flush>
        <DataTable
          empty="Eşleşme yok."
          head={["Ad / e-posta", "Çift", "Seviye", { label: "Seri", align: "right" }, { label: "XP", align: "right" }, { label: "Kelime", align: "right" }, "Son aktif", "Katıldı"]}
          rows={rows.map((u) => [
            <div key="n" className="min-w-48">
              <div className="flex flex-wrap items-center gap-1.5">
                <a href={`/admin/users/${encodeURIComponent(u.userId)}`} className="text-strong underline-offset-2 hover:underline">{u.name || u.username || u.email || u.userId.slice(0, 8)}</a>
                {u.guest ? <Badge>misafir</Badge> : null}
                {u.premium ? <Badge tone="ok">premium</Badge> : null}
                {u.suspended ? <Badge tone="bad">askıda</Badge> : null}
              </div>
              {u.email ? <div className="muted">{u.email}</div> : null}
            </div>,
            <span key="p" className="muted font-mono">{u.pair}</span>,
            u.level,
            u.streak,
            u.xp.toLocaleString("tr-TR"),
            u.words,
            <span key="a" className="whitespace-nowrap">{u.lastActive || "—"}</span>,
            <span key="j" className="whitespace-nowrap">{u.joined}</span>,
          ])}
        />
      </Panel>

      <nav aria-label="Sayfalar" className="flex items-center justify-center gap-3 text-caption">
        {query.page > 1 ? <Link href={href(query, { page: query.page - 1 })} className={BTN.small}>← Önceki</Link> : null}
        <span className="muted tabular-nums">Sayfa {query.page} / {pages}</span>
        {query.page < pages ? <Link href={href(query, { page: query.page + 1 })} className={BTN.small}>Sonraki →</Link> : null}
      </nav>
    </AdminPage>
  );
}
