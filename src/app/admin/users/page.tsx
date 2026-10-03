import type { Metadata } from "next";
import Link from "next/link";
import { adminGate } from "@/lib/admin";
import { listUsers, parseUsersQuery, USER_SORT_DEFAULT, USERS_PAGE_SIZE, type UsersQuery } from "@/lib/admin-users";
import { sortParam } from "@/lib/admin-sort";
import { AdminDenied, AdminPage, Badge, BTN, DataTable, FIELD, FIELD_STYLE, Notice, PageHeader, Panel, Segmented } from "../_ui/ui";

export const metadata: Metadata = { title: "Kullanıcılar" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/users — kullanıcı listesi, sunucu tarafı arama ve sayfalama.
 *
 * Arama bir GET formu, süzgeç ve sayfa düz bağlantı. Sıralama tablo başlığından
 * (her sütun, sunucuda; `lib/admin-sort`), hazır "Sırala" düğmesi yok.
 * Adres paylaşılabilir ("premium olanlar, XP'ye göre, 3. sayfa") ve geri tuşu
 * çalışıyor. Ayrıntı için satırdaki ada tıklanır (/admin/users/[id]).
 */
const KINDS: [UsersQuery["kind"], string][] = [["all", "Hepsi"], ["account", "Hesap"], ["guest", "Misafir"], ["premium", "Premium"], ["suspended", "Askıda"], ["testlab", "Test Lab"]];

function href(q: UsersQuery, patch: Partial<UsersQuery>): string {
  const n = { ...q, ...patch };
  const p = new URLSearchParams();
  if (n.q) p.set("q", n.q);
  if (n.kind !== "all") p.set("tur", n.kind);
  if (sortParam(n.sort) !== sortParam(USER_SORT_DEFAULT)) p.set("sira", sortParam(n.sort));
  if (n.page > 1) p.set("sayfa", String(n.page));
  const s = p.toString();
  return `/admin/users${s ? `?${s}` : ""}`;
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
          {sortParam(query.sort) !== sortParam(USER_SORT_DEFAULT) ? <input type="hidden" name="sira" value={sortParam(query.sort)} /> : null}
          <button type="submit" className={BTN.primary}>Ara</button>
          {query.q ? <Link href={href(query, { q: "", page: 1 })} className={BTN.secondary}>Temizle</Link> : null}
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Segmented label="Süzgeç" items={KINDS} value={query.kind} href={(k) => href(query, { kind: k, page: 1 })} />
        </div>
      </Panel>

      <Panel flush>
        <DataTable
          empty="Eşleşme yok."
          /* Sıralama SUNUCUDA: başlık bağlantısı bütün listeyi sıralıyor, yalnız bu sayfanın 50 satırını değil. */
          name="kullanicilar"
          server={{ sort: sortParam(query.sort), base: href(query, { page: 1 }) }}
          head={[
            { label: "Ad / e-posta", sortKey: "name" }, { label: "Kullanıcı adı", sortKey: "username" }, { label: "Çift", sortKey: "pair" }, { label: "Seviye", sortKey: "level" },
            { label: "Seri", align: "right", sortKey: "streak" }, { label: "XP", align: "right", sortKey: "xp" }, { label: "Kelime", align: "right", sortKey: "words" },
            { label: "Son aktif", sortKey: "active" }, { label: "Katıldı", sortKey: "joined" },
          ]}
          rows={rows.map((u) => [
            <div key="n" className="min-w-48">
              <div className="flex flex-wrap items-center gap-1.5">
                <a href={`/admin/users/${encodeURIComponent(u.userId)}`} className="text-strong underline-offset-2 hover:underline">{u.name || u.email || `${u.userId.slice(0, 8)}…`}</a>
                {u.guest ? <Badge>misafir</Badge> : null}
                {u.noProfile ? <Badge tone="warn">profil yok</Badge> : null}
                {u.premium ? <Badge tone="ok">premium</Badge> : null}
                {u.suspended ? <Badge tone="bad">askıda</Badge> : null}
                {/* Play yayın öncesi raporu robotu (lib/test-lab): ölçümde sayılmıyor, silme elle. */}
                {u.testLab ? <Badge tone="warn">Test Lab</Badge> : null}
              </div>
              {u.email && u.name ? <div className="muted">{u.email}</div> : null}
            </div>,
            u.username ? <span key="u" className="font-mono">@{u.username}</span> : <span key="u" className="faint">—</span>,
            <span key="p" className="muted font-mono">{u.pair || "—"}</span>,
            u.level || "—",
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
