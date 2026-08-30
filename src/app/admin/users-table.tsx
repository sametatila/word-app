"use client";
import { useMemo, useState } from "react";
import type { AdminData } from "@/lib/admin";

type U = AdminData["users"][number];
type SortKey = "name" | "level" | "streak" | "xp" | "words" | "lastActive" | "joined";

/** Admin kullanıcı tablosu — istemci tarafı arama + sütun sıralama. */
export function UsersTable({ users }: { users: U[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("lastActive");
  const [dir, setDir] = useState<1 | -1>(-1);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s
      ? users.filter((u) => u.name.toLowerCase().includes(s) || u.userId.toLowerCase().includes(s) || u.level.toLowerCase().includes(s) || u.course.includes(s))
      : users;
    return [...list].sort((a, b) => {
      const av = a[sort] as string | number, bv = b[sort] as string | number;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [users, q, sort, dir]);

  function Th({ k, label }: { k: SortKey; label: string }) {
    return (
      <th className="cursor-pointer select-none py-1 pr-3" onClick={() => (sort === k ? setDir((x) => (x === 1 ? -1 : 1)) : (setSort(k), setDir(-1)))}>
        {label}{sort === k ? (dir === 1 ? " ↑" : " ↓") : ""}
      </th>
    );
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ara: ad, kimlik, seviye, kurs…"
        className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead style={{ color: "var(--text-muted)" }}>
            <tr>
              <Th k="name" label="Ad" />
              <Th k="level" label="Seviye" />
              <th className="pr-3">Kurs</th>
              <Th k="streak" label="Seri" />
              <Th k="xp" label="XP" />
              <Th k="words" label="Kelime" />
              <Th k="lastActive" label="Son aktif" />
              <Th k="joined" label="Katıldı" />
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((u) => (
              <tr key={u.userId} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-1 pr-3 font-semibold">{u.name || u.userId.slice(0, 8)}</td>
                <td className="pr-3">{u.level}</td>
                <td className="pr-3" style={{ color: "var(--text-muted)" }}>{u.course === "gsw-zh" ? "gsw" : "de"}</td>
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
      {filtered.length === 0 && <div className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>Eşleşme yok.</div>}
      {filtered.length > 200 && <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>İlk 200 gösteriliyor ({filtered.length} eşleşme). Aramayı daralt.</div>}
    </div>
  );
}
