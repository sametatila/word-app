"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SKILL_LABELS, SKILL_ORDER, LEVEL_ORDER } from "@/lib/skills/meta";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { readSkillProgress, type SkillProgress } from "@/lib/skills/progress";
import { CheckIcon } from "@/components/icons";
import { LEVEL_TONE, SKILL_ICON } from "./theme";

/** Hub'a inen hafif liste satırı — egzersizin tam içeriği yalnızca kendi sayfasına gider. */
export type SkillItem = {
  id: string;
  skill: SkillId;
  level: CefrLevel;
  title: string;
  genre: string;
  minutes: number;
  items: number;
};

export function SkillsHub({
  items,
  activeLevel,
}: {
  items: SkillItem[];
  activeLevel: CefrLevel;
}) {
  const [level, setLevel] = useState<CefrLevel>(activeLevel);
  // localStorage sunucuda yok; tamamlanma işaretleri hidrasyondan sonra dolar.
  const [progress, setProgress] = useState<SkillProgress>({});

  useEffect(() => {
    setProgress(readSkillProgress());
  }, []);

  const atLevel = items.filter((i) => i.level === level);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 pb-8">
      <header>
        <h1 className="text-2xl font-bold">Beceriler</h1>
        <p className="muted mt-1 text-sm">
          Gerçek hayat Almancasıyla okuma, dinleme ve yazma pratiği — seviyene göre.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {LEVEL_ORDER.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`chip relative px-3.5 py-1.5 text-sm ${level === l ? "chip-active" : ""}`}
          >
            {l}
            {l === activeLevel ? (
              <span
                title="Çalışma seviyen"
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
                style={{ background: "var(--color-flame-500)" }}
              />
            ) : null}
          </button>
        ))}
        {level !== activeLevel ? (
          <button
            type="button"
            onClick={() => setLevel(activeLevel)}
            className="muted text-xs font-semibold underline-offset-2 hover:underline"
          >
            Seviyene dön ({activeLevel})
          </button>
        ) : (
          <span className="muted text-xs">Çalışma seviyendesin.</span>
        )}
      </div>

      {SKILL_ORDER.map((skill, si) => {
        const list = atLevel.filter((i) => i.skill === skill);
        if (!list.length) return null;
        const doneCount = list.filter((i) => progress[i.id]).length;
        const Icon = SKILL_ICON[skill];
        return (
          <motion.section
            key={`${skill}-${level}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.05 }}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-2 font-bold">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                  style={{ background: LEVEL_TONE[level] }}
                >
                  <Icon size={16} />
                </span>
                {SKILL_LABELS[skill]}
              </h2>
              <span className="muted text-xs font-semibold">
                {doneCount} / {list.length} tamamlandı
              </span>
            </div>
            <div className="card divide-y" style={{ borderColor: "var(--border)" }}>
              {list.map((item) => {
                const rec = progress[item.id];
                return (
                  <Link
                    key={item.id}
                    href={`/skills/${item.id}`}
                    className="flex items-center gap-3 px-4 py-3.5 transition-colors first:rounded-t-[var(--radius-xl2)] last:rounded-b-[var(--radius-xl2)] hover:bg-[color:var(--surface-2)]"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold" lang="de">
                        {item.title}
                      </p>
                      <p className="muted mt-0.5 text-xs">
                        {item.genre} · {item.minutes} dk ·{" "}
                        {skill === "writing" ? `${item.items} görev` : `${item.items} soru`}
                      </p>
                    </div>
                    {rec ? (
                      <span
                        className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold"
                        style={{
                          background: "color-mix(in srgb, var(--color-mint-500) 15%, transparent)",
                          color: "var(--color-mint-500)",
                        }}
                      >
                        <CheckIcon size={13} />
                        {rec.correct}/{rec.total}
                      </span>
                    ) : (
                      <span className="muted shrink-0 text-lg leading-none">›</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
