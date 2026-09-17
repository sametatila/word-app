"use client";

import { isValidElement, useMemo, useState, type ReactNode } from "react";

/**
 * PANEL TABLOSU — sıralanır, aranır, parça parça açılır, CSV'ye iner.
 *
 * Tablolar düz HTML'di: 60 satırlık bir listede en kötüyü bulmak için göz
 * gezdirmek, "şu sütuna göre" bakmak için veriyi dışarı kopyalamak gerekiyordu.
 * Artık:
 *   - başlığa tıklamak o sütuna göre sıralıyor (ikinci tık ters çeviriyor,
 *     `aria-sort` durumu söylüyor);
 *   - 12 satırdan uzun tabloda arama kutusu var;
 *   - ilk 25 satır, "daha fazla göster" ile 25'er;
 *   - "CSV" görünen satırları (arama sonrası, sıralı) indiriyor.
 *
 * SIRALAMA DEĞERİ HÜCREDEN türetiliyor: sayı ya da metin doğrudan; öğe
 * (`<span className="font-mono">{id}</span>`) ise içindeki metin. "%78",
 * "1.2k", "3/8" gibi biçimli metinler sayı olarak okunuyor. Türetilemeyen
 * sütun (düğme, rozet karışımı) sıralanmıyor.
 */

export type Column = string | { label: string; align?: "right"; sortable?: boolean };

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

/** "%78" · "1.2k" · "$4.5k" · "3/8" · "12 sa" → sayı; tarih ve kimlik metin kalır. */
function sortValue(node: ReactNode): number | string {
  if (typeof node === "number") return node;
  const t = textOf(node).trim();
  const m = /^[%$]?\s*(-?\d+(?:[.,]\d+)?)\s*([kKM])?\b/.exec(t.replace(/^[+−]/, (s) => (s === "−" ? "-" : "")));
  if (m && !/^\d{2}[./-]\d{2}[./-]\d{2,4}|^\d{4}-\d{2}-\d{2}/.test(t)) {
    const n = Number(m[1].replace(",", "."));
    return m[2] === "k" || m[2] === "K" ? n * 1_000 : m[2] === "M" ? n * 1_000_000 : n;
  }
  return t.toLocaleLowerCase("tr-TR");
}

function csvCell(v: string): string {
  return /[",\n;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

const PAGE = 25;

export function DataTable({ head, rows, empty = "Kayıt yok.", mono, name = "tablo" }: {
  head: Column[];
  rows: ReactNode[][];
  empty?: string;
  mono?: boolean;
  /** CSV dosya adının başı. */
  name?: string;
}) {
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 } | null>(null);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const cols = head.map((h) => (typeof h === "string" ? { label: h, align: undefined, sortable: h !== "" } : { sortable: h.label !== "", ...h }));

  const view = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase("tr-TR");
    const indexed = rows.map((r, i) => ({ r, i, text: needle ? r.map(textOf).join(" ").toLocaleLowerCase("tr-TR") : "" }));
    const found = needle ? indexed.filter((x) => x.text.includes(needle)) : indexed;
    if (!sort) return found;
    return [...found].sort((a, b) => {
      const av = sortValue(a.r[sort.col]);
      const bv = sortValue(b.r[sort.col]);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir || a.i - b.i;
      return String(av).localeCompare(String(bv), "tr") * sort.dir || a.i - b.i;
    });
  }, [rows, q, sort]);

  if (!rows.length) return <p className="muted rounded-tile border border-dashed px-4 py-5 text-center text-caption" style={{ borderColor: "var(--border)" }}>{empty}</p>;

  function download() {
    const lines = [cols.map((c) => csvCell(c.label)).join(","), ...view.map((x) => x.r.map((c) => csvCell(textOf(c).replace(/\s+/g, " ").trim())).join(","))];
    const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const stamp = new Date().toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `lernomi-${name}-${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const shown = view.slice(0, limit);
  return (
    <div>
      {/* Araç satırı yalnız 5 satırdan uzun tabloda: iki satırlık bir künyeye
          arama ve CSV düğmesi gürültü. */}
      {rows.length > 5 ? (
      <div className="mb-2 flex flex-wrap items-center gap-2 px-1 text-caption">
        {rows.length > 12 ? (
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
            placeholder="Tabloda ara"
            aria-label="Tabloda ara"
            className="h-8 min-w-0 flex-1 basis-40 rounded-tile border px-3 text-caption"
            style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }}
          />
        ) : null}
        <span className="muted tabular-nums">{q ? `${view.length} / ${rows.length} satır` : `${rows.length} satır`}</span>
        <button type="button" onClick={download} className="btn btn-ghost ml-auto h-8 px-3 text-caption">CSV</button>
      </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className={`w-full text-caption ${mono ? "font-mono" : ""}`} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="muted text-micro uppercase tracking-eyebrow">
              {cols.map((c, i) => {
                const on = sort?.col === i;
                return (
                  <th
                    key={i}
                    aria-sort={on ? (sort.dir === 1 ? "ascending" : "descending") : undefined}
                    className={`whitespace-nowrap px-3 py-2 font-bold ${c.align === "right" ? "text-right" : "text-left"}`}
                  >
                    {c.sortable ? (
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setSort((s) => (s?.col === i ? { col: i, dir: s.dir === 1 ? -1 : 1 } : { col: i, dir: c.align === "right" ? -1 : 1 }))}
                        className="inline-flex min-h-6 items-center gap-1 uppercase tracking-eyebrow"
                        style={on ? { color: "var(--text)" } : undefined}
                      >
                        {c.label}
                        <span aria-hidden>{on ? (sort.dir === 1 ? "↑" : "↓") : "↕"}</span>
                      </button>
                    ) : (
                      c.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {shown.map(({ r, i }) => (
              <tr key={i} className="border-t align-top" style={{ borderColor: "var(--hairline)" }}>
                {r.map((v, j) => (
                  <td key={j} className={`px-3 py-2 tabular-nums ${cols[j]?.align === "right" ? "text-right whitespace-nowrap" : ""}`}>
                    {v === "" || v == null ? "—" : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {view.length === 0 ? <p className="muted px-3 py-3 text-caption">Aramayla eşleşen satır yok.</p> : null}
      {view.length > limit ? (
        <div className="px-1 pt-2">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn btn-ghost h-8 px-3 text-caption">
            Daha fazla göster ({view.length - limit} kaldı)
          </button>
        </div>
      ) : null}
    </div>
  );
}
