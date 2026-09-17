"use client";
import { useCallback, useMemo, useState } from "react";
import type { AdminData } from "@/lib/admin";

type U = AdminData["users"][number];
type SortKey = "name" | "level" | "streak" | "xp" | "words" | "lastActive" | "joined";

/** Admin kullanıcı tablosu — istemci tarafı arama + sütun sıralama. */
/**
 * Sıralanabilir başlık hücresi.
 *
 * MODÜL DÜZEYİNDE, bilerek: bileşenin İÇİNDE tanımlıyken her çizimde yeni bir
 * bileşen tipi doğuyordu ve React eskisini söküp yenisini takıyordu (React
 * Compiler kuralı `static-components` tam bunu söylüyor). Tabloda somut
 * sonucu, her tuşa basışta başlık hücrelerinin sıfırdan kurulmasıydı.
 */
function Th({
  k,
  label,
  sort,
  dir,
  onSort,
}: {
  k: SortKey;
  label: string;
  sort: SortKey;
  dir: 1 | -1;
  onSort: (k: SortKey) => void;
}) {
  return (
    <th className="cursor-pointer select-none py-1 pr-3" onClick={() => onSort(k)}>
      {label}{sort === k ? (dir === 1 ? " ↑" : " ↓") : ""}
    </th>
  );
}

const LANG_SHORT: Record<string, string> = { tr: "tr", en: "en", de: "de", "gsw-zh": "gsw" };
/** Anadil → kurs. Eskiden kurs `gsw-zh` değilse "de" yazıyordu; İngilizce kurs görünmüyordu. */
const pairOf = (u: U) => `${LANG_SHORT[u.native] ?? u.native}→${LANG_SHORT[u.course] ?? u.course}`;

type Kind = "all" | "account" | "guest" | "premium";
const KINDS: { k: Kind; label: string }[] = [
  { k: "all", label: "Hepsi" },
  { k: "account", label: "Hesap" },
  { k: "guest", label: "Misafir" },
  { k: "premium", label: "Premium" },
];

export function UsersTable({ users }: { users: U[] }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<Kind>("all");
  const [sort, setSort] = useState<SortKey>("lastActive");
  const [dir, setDir] = useState<1 | -1>(-1);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const byKind = users.filter((u) =>
      kind === "all" ? true : kind === "guest" ? u.guest : kind === "account" ? !u.guest : u.premium,
    );
    const list = s
      ? byKind.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.userId.toLowerCase().includes(s) || u.level.toLowerCase().includes(s) || pairOf(u).includes(s))
      : byKind;
    return [...list].sort((a, b) => {
      const av = a[sort] as string | number, bv = b[sort] as string | number;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [users, q, kind, sort, dir]);


  const onSort = useCallback((k: SortKey) => {
    setSort((cur) => {
      if (cur === k) setDir((x) => (x === 1 ? -1 : 1));
      else setDir(-1);
      return k;
    });
  }, []);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ara: ad, e-posta, kimlik, seviye, çift (tr→en)…"
        aria-label="Ara: ad, e-posta, kimlik, seviye, çift"
        className="mb-3 w-full rounded-tile border px-3 py-2 text-body"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }}
      />
      <div role="tablist" aria-label="Hesap türü" className="mb-3 flex flex-wrap gap-1.5">
        {KINDS.map((x) => (
          <button
            key={x.k}
            type="button"
            role="tab"
            aria-selected={kind === x.k}
            onClick={() => setKind(x.k)}
            className="chip h-8 px-3 text-caption"
            style={kind === x.k ? { background: "var(--color-brand)", color: "var(--on-fill)" } : undefined}
          >
            {x.label} ({users.filter((u) => (x.k === "all" ? true : x.k === "guest" ? u.guest : x.k === "account" ? !u.guest : u.premium)).length})
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-body">
          <thead style={{ color: "var(--text-muted)" }}>
            <tr>
              <Th k="name" label="Ad" sort={sort} dir={dir} onSort={onSort} />
              <Th k="level" label="Seviye" sort={sort} dir={dir} onSort={onSort} />
              <th className="pr-3">Çift</th>
              <Th k="streak" label="Seri" sort={sort} dir={dir} onSort={onSort} />
              <Th k="xp" label="XP" sort={sort} dir={dir} onSort={onSort} />
              <Th k="words" label="Kelime" sort={sort} dir={dir} onSort={onSort} />
              <Th k="lastActive" label="Son aktif" sort={sort} dir={dir} onSort={onSort} />
              <Th k="joined" label="Katıldı" sort={sort} dir={dir} onSort={onSort} />
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((u) => (
              <tr key={u.userId} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-1 pr-3 font-semibold">
                  <a href={`/admin/users/${encodeURIComponent(u.userId)}`} className="underline-offset-2 hover:underline">
                    {u.name || u.email || u.userId.slice(0, 8)}
                  </a>
                  {u.guest ? <span className="ml-1.5 text-micro font-normal" style={{ color: "var(--text-muted)" }}>misafir</span> : null}
                  {u.premium ? <span className="ml-1.5 text-micro" style={{ color: "#16a34a" }}>premium</span> : null}
                </td>
                <td className="pr-3">{u.level}</td>
                <td className="pr-3 font-mono" style={{ color: "var(--text-muted)" }}>{pairOf(u)}</td>
                <td className="pr-3 tabular-nums">{u.streak}{u.longest > u.streak ? ` (${u.longest})` : ""}</td>
                <td className="pr-3 tabular-nums">{u.xp.toLocaleString("tr-TR")}</td>
                <td className="pr-3 tabular-nums">{u.words}</td>
                <td className="pr-3 tabular-nums">{u.lastActive || "—"}</td>
                <td className="tabular-nums">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <div className="mt-2 text-body" style={{ color: "var(--text-muted)" }}>Eşleşme yok.</div>}
      {filtered.length > 200 && <div className="mt-2 text-caption" style={{ color: "var(--text-muted)" }}>İlk 200 gösteriliyor ({filtered.length} eşleşme). Aramayı daralt.</div>}
    </div>
  );
}
