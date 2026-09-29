"use client";

import { useState } from "react";
import type { Table } from "@/lib/admin-user";
import { AdminTabs, DataTable } from "../../_ui/ui";

/**
 * Kullanıcının öğrenme izi TEK kartta, sekmeli: konuşma, patika, beceri,
 * sınav, quiz, deneme, boss, yerleştirme. Eskiden sekiz ayrı kart vardı ve
 * çoğu kullanıcıda yarısı boştu; sayfa boş kutularla uzuyordu. Sekme adında
 * satır sayısı var, boş sekme sona düşüyor; ilk açılan dolu olan.
 */
export function LearningTabs({ tabs }: { tabs: { key: string; label: string; table: Table }[] }) {
  const ordered = [...tabs.filter((t) => t.table.rows.length), ...tabs.filter((t) => !t.table.rows.length)];
  const [key, setKey] = useState(ordered[0]?.key ?? "");
  const current = ordered.find((t) => t.key === key) ?? ordered[0];
  if (!current) return null;
  return (
    <div>
      <AdminTabs
        label="Öğrenme"
        className="mb-3"
        items={ordered.map((t) => [t.key, <span key={t.key} className={t.table.rows.length ? undefined : "faint"}>{t.label} <span className="tabular-nums opacity-70">{t.table.rows.length}</span></span>] as const)}
        value={current.key}
        onChange={setKey}
      />
      <DataTable head={current.table.columns} rows={current.table.rows} empty={`${current.label}: kayıt yok.`} mono />
    </div>
  );
}
