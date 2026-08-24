"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SKILL_LABELS, SKILL_ORDER, LEVEL_ORDER } from "@/lib/skills/meta";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { readSkillProgress, type SkillProgress } from "@/lib/skills/progress";
import type { SpeechTopic } from "@/lib/speech-progress";
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

/** Sunucudan gelen (cihazlar arası senkron) tamamlanma durumu. */
export type ServerSkillProgress = Record<string, { correct: number; total: number }>;

/** Seçili seviye sekme oturumu boyunca hatırlanır: egzersizden dönünce
 *  kullanıcı "seviyene dön" durumuna değil, baktığı seviyeye geri gelir. */
const LEVEL_KEY = "wortspiel-skills-level";
/** Seçili beceri süzgeci de hatırlanır: alıştırma sayısı arttıkça liste uzuyor. */
const SKILL_KEY = "wortspiel-skills-skill";

export function SkillsHub({
  items,
  activeLevel,
  serverProgress = {},
  weakSounds = [],
}: {
  items: SkillItem[];
  activeLevel: CefrLevel;
  serverProgress?: ServerSkillProgress;
  /** Telaffuzda zorlanılan ses konuları — sunucuda hesaplanıyor. */
  weakSounds?: SpeechTopic[];
}) {
  const [level, setLevel] = useState<CefrLevel>(activeLevel);
  const [skillFilter, setSkillFilter] = useState<SkillId | "all">("all");

  // sessionStorage sunucu render'ında yok; hidrasyon uyuşmazlığı olmasın diye
  // kayıtlı seçim mount sonrasında geri yüklenir.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(LEVEL_KEY) as CefrLevel | null;
      if (saved && LEVEL_ORDER.includes(saved)) setLevel(saved);
      const savedSkill = sessionStorage.getItem(SKILL_KEY) as SkillId | null;
      if (savedSkill && SKILL_ORDER.includes(savedSkill)) setSkillFilter(savedSkill);
    } catch {
      /* depolama kapalıysa aktif seviye kalır */
    }
  }, []);

  function pickLevel(l: CefrLevel) {
    setLevel(l);
    try {
      sessionStorage.setItem(LEVEL_KEY, l);
    } catch {
      /* depolama kapalıysa yalnızca bu ekran için geçerli olur */
    }
  }
  // Sunucu kaydı temel alınır; localStorage çevrimdışı tamamlamaları ekler.
  // localStorage sunucu render'ında yok; birleştirme hidrasyondan sonra yapılır.
  const [progress, setProgress] = useState<SkillProgress>(() => {
    const merged: SkillProgress = {};
    for (const [id, rec] of Object.entries(serverProgress)) {
      merged[id] = { correct: rec.correct, total: rec.total, at: "" };
    }
    return merged;
  });

  useEffect(() => {
    setProgress((prev) => {
      const merged = { ...prev };
      for (const [id, rec] of Object.entries(readSkillProgress())) {
        const cur = merged[id];
        if (!cur || rec.correct > cur.correct) merged[id] = rec;
      }
      return merged;
    });
  }, []);

  function pickSkill(s: SkillId | "all") {
    setSkillFilter(s);
    try {
      if (s === "all") sessionStorage.removeItem(SKILL_KEY);
      else sessionStorage.setItem(SKILL_KEY, s);
    } catch {
      /* depolama kapalıysa yalnızca bu ekran için geçerli olur */
    }
  }

  const atLevel = items.filter((i) => i.level === level);
  const shown = SKILL_ORDER.filter((s) => skillFilter === "all" || s === skillFilter);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      {/* Başlığın altında "gerçek hayat Almancasıyla okuma, dinleme ve yazma
          pratiği" diye bir tanıtım satırı vardı. Sayfaya ilk kez girenin bir
          kez okuyacağı, her gün girenin hiç okumayacağı bir cümle — ve altında
          zaten okuma/dinleme/yazma kartları duruyor. */}
      <header>
        <h1 className="text-2xl font-bold">Beceriler</h1>
      </header>

      {/* Telaffuzda zorlanılan sesler.
          Kelimeler için tekrar algoritması hangi kelimeye dönüleceğini
          söylüyordu; seslerde böyle bir şey yoktu ve öğrenci hangi sesi
          ısrarla kaçırdığını hiç görmüyordu. Aynı veri zaten kayıtlıydı —
          eksik olan onu bu gözle okumaktı. */}
      {weakSounds.length ? (
        <section
          className="rounded-2xl px-4 py-3.5"
          style={{
            background: "color-mix(in srgb, var(--color-flame) 10%, transparent)",
          }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--color-flame)" }}>
            Telaffuzda zorlandıkların
          </p>
          <ul className="mt-2 space-y-1.5">
            {weakSounds.map((t) => (
              <li key={t.exerciseId} className="flex items-center justify-between gap-3">
                <Link href={`/skills/${t.exerciseId}`} className="text-sm font-semibold underline">
                  {t.title}
                </Link>
                <span className="muted shrink-0 text-xs tabular-nums">
                  {t.correct}/{t.total} · {t.attempts} deneme
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        {LEVEL_ORDER.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => pickLevel(l)}
            className={`chip relative px-3.5 py-1.5 text-sm ${level === l ? "chip-active" : ""}`}
          >
            {l}
            {l === activeLevel ? (
              <span
                title="Çalışma seviyen"
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
                style={{ background: "var(--color-flame)" }}
              />
            ) : null}
          </button>
        ))}
        {level !== activeLevel ? (
          <button
            type="button"
            onClick={() => pickLevel(activeLevel)}
            className="muted text-xs font-semibold underline-offset-2 hover:underline"
          >
            Seviyene dön ({activeLevel})
          </button>
        ) : (
          <span className="muted text-xs">Çalışma seviyendesin.</span>
        )}
      </div>

      {/* Beceri süzgeci: içerik büyüdükçe tek beceriye odaklanmak şart oluyor. */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => pickSkill("all")}
          className={`chip px-3.5 py-1.5 text-sm ${skillFilter === "all" ? "chip-active" : ""}`}
        >
          Tümü
          <span className="muted ml-1.5 text-xs font-semibold">{atLevel.length}</span>
        </button>
        {SKILL_ORDER.map((s) => {
          const count = atLevel.filter((i) => i.skill === s).length;
          if (!count) return null;
          const Icon = SKILL_ICON[s];
          return (
            <button
              key={s}
              type="button"
              onClick={() => pickSkill(s)}
              className={`chip flex items-center gap-1.5 px-3.5 py-1.5 text-sm ${
                skillFilter === s ? "chip-active" : ""
              }`}
            >
              <Icon size={14} />
              {SKILL_LABELS[s]}
              <span className="muted text-xs font-semibold">{count}</span>
            </button>
          );
        })}
      </div>

      {shown.map((skill, si) => {
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
                        {skill === "writing" || skill === "speaking"
                          ? `${item.items} görev`
                          : `${item.items} soru`}
                      </p>
                    </div>
                    {rec ? (
                      <span
                        className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold"
                        style={{
                          background: "color-mix(in srgb, var(--color-mint) 15%, transparent)",
                          color: "var(--color-mint)",
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
