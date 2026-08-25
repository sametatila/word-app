"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SKILL_LABELS, SKILL_ORDER, LEVEL_ORDER } from "@/lib/skills/meta";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { readSkillProgress, syncSkillProgress, type SkillProgress } from "@/lib/skills/progress";
import type { SpeechTopic } from "@/lib/speech-progress";
import { PROFICIENCY_LABELS, PROFICIENCY_SKILLS, weakestSkill, type Proficiency, type ProficiencySkill } from "@/lib/proficiency";
import type { NextStep } from "@/lib/proficiency-data";
import type { ExamResult } from "@/lib/exam";
import type { WeeklyStatus } from "@/lib/weekly";
import type { PlacementRecord } from "@/lib/placement";
import { describePerSkill } from "@/lib/placement-score";
import { BookOpenIcon, CheckIcon } from "@/components/icons";
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
  /** Egzersizin kanıt olduğu can-do ifadesi, Türkçe (WP-43 haritası). */
  cando?: string;
};

/** Sunucudan gelen (cihazlar arası senkron) tamamlanma durumu. */
export type ServerSkillProgress = Record<string, { correct: number; total: number; lastScore?: number | null; attempts?: number }>;

/** Yetkinlik panosu (WP-50) — sunucuda hesaplanır, sayfayla gelir. */
export type SkillsBoard = {
  proficiency: Proficiency;
  next: NextStep | null;
  evidenceCount: number;
};

/** Sınav sekmesinin verisi: geçmiş, haftalık durum, yerleştirme. */
export type ExamHubData = {
  history: ExamResult[];
  weekly: WeeklyStatus | null;
  placement: PlacementRecord | null;
  canRetake: boolean;
};

type Tab = SkillId | "grammar" | "exam";
type Filter = "all" | "todo" | "improve" | "done";

const TABS: { id: Tab; label: string }[] = [
  ...SKILL_ORDER.map((s) => ({ id: s as Tab, label: SKILL_LABELS[s] })),
  { id: "grammar", label: "Dilbilgisi" },
  { id: "exam", label: "Sınav" },
];

/** Egzersiz türü etiketi — kart başlığının altında, ne yapılacağını bir bakışta söyler. */
const TYPE_LABEL: Record<SkillId, string> = {
  reading: "çoktan seçmeli",
  listening: "dinle ve seç",
  writing: "serbest yazma",
  speaking: "söyleyiş / diyalog",
};

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Hepsi" },
  { id: "todo", label: "Yapılmamış" },
  { id: "improve", label: "Geliştir" },
  { id: "done", label: "Tamam" },
];

/** "Tamam" eşiği: son puan (yoksa en iyi doğru oranı) %70 — yetkinlik "sağlam" bandıyla aynı çizgi. */
const DONE_PCT = 70;

/** Seçili seviye/sekme oturum boyunca hatırlanır: egzersizden dönünce bakılan yere dönülür. */
const LEVEL_KEY = "wortspiel-skills-level";
const TAB_KEY = "wortspiel-skills-tab";

export function SkillsHub({
  items,
  activeLevel,
  serverProgress = {},
  weakSounds = [],
  board = null,
  exams = null,
}: {
  items: SkillItem[];
  activeLevel: CefrLevel;
  serverProgress?: ServerSkillProgress;
  /** Telaffuzda zorlanılan ses konuları — sunucuda hesaplanıyor. */
  weakSounds?: SpeechTopic[];
  board?: SkillsBoard | null;
  exams?: ExamHubData | null;
}) {
  const [level, setLevel] = useState<CefrLevel>(activeLevel);
  /*
    Varsayılan sekme en zayıf egzersiz becerisi (WP-63: "en az çalışılan
    beceri önde"): ölçülmemiş olan en önde, sonra en düşük puan. Kullanıcı
    bir sekme seçtiyse o kazanır (oturum boyunca).
  */
  const defaultTab: Tab = board ? weakestSkill(board.proficiency, activeLevel, SKILL_ORDER as ProficiencySkill[]) as Tab : "reading";
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [filter, setFilter] = useState<Filter>("all");

  // sessionStorage sunucu render'ında yok; hidrasyon uyuşmazlığı olmasın diye
  // kayıtlı seçim mount sonrasında geri yüklenir.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(LEVEL_KEY) as CefrLevel | null;
      if (saved && LEVEL_ORDER.includes(saved)) setLevel(saved);
      const savedTab = sessionStorage.getItem(TAB_KEY) as Tab | null;
      if (savedTab && TABS.some((t) => t.id === savedTab)) setTab(savedTab);
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
  function pickTab(t: Tab) {
    setTab(t);
    try {
      sessionStorage.setItem(TAB_KEY, t);
    } catch {
      /* depolama kapalıysa yalnızca bu ekran için geçerli olur */
    }
  }

  // Sunucu kaydı temel alınır (sayfa render'ında geliyor); localStorage
  // çevrimdışı tamamlamaları ekler ve hidrasyondan sonra bir kez daha sunucuyla
  // eşitlenir — eski cihaz kayıtları bu ilk eşitlemede sunucuya taşınır
  // (bkz. lib/skills/progress.ts). Egzersizden dönüşte `wortspiel:skills`
  // olayı listeyi tazeler.
  const [progress, setProgress] = useState<SkillProgress>(() => {
    const merged: SkillProgress = {};
    for (const [id, rec] of Object.entries(serverProgress)) {
      merged[id] = { correct: rec.correct, total: rec.total, at: "" };
    }
    return merged;
  });

  useEffect(() => {
    const merge = (incoming: SkillProgress) =>
      setProgress((prev) => {
        const merged = { ...prev };
        for (const [id, rec] of Object.entries(incoming)) {
          const cur = merged[id];
          if (!cur || rec.correct > cur.correct) merged[id] = rec;
        }
        return merged;
      });
    merge(readSkillProgress());
    void syncSkillProgress().then(merge);
    const onChange = (e: Event) => merge((e as CustomEvent<SkillProgress>).detail ?? {});
    window.addEventListener("wortspiel:skills", onChange);
    return () => window.removeEventListener("wortspiel:skills", onChange);
  }, []);

  /** Egzersizin durumu: yapılmamış / geliştir (<%70) / tamam. */
  function statusOf(id: string): { state: Exclude<Filter, "all">; pct: number | null; last: number | null } {
    const rec = progress[id];
    if (!rec) return { state: "todo", pct: null, last: null };
    const last = serverProgress[id]?.lastScore ?? null;
    const pct = last ?? (rec.total ? Math.round((rec.correct / rec.total) * 100) : 0);
    return { state: pct >= DONE_PCT ? "done" : "improve", pct, last };
  }

  const atLevel = useMemo(() => items.filter((i) => i.level === level), [items, level]);
  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: 0, todo: 0, improve: 0, done: 0 };
    const list = tab === "grammar" || tab === "exam" ? [] : atLevel.filter((i) => i.skill === tab);
    for (const i of list) {
      c.all++;
      c[statusOf(i.id).state]++;
    }
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atLevel, tab, progress, serverProgress]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Beceriler</h1>
      </header>

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

      {/*
        Yetkinlik panosu (WP-63/50): seçili seviyede altı becerinin kanıt
        puanı ve "önerilen sıradaki". Liste artık panonun altında; sayfa bir
        "ne var" listesi değil "neredeyim, sırada ne var" ekranı.
      */}
      {board ? <Board board={board} level={level} activeLevel={activeLevel} /> : null}

      {/* Telaffuzda zorlanılan sesler — konuşma sekmesinde. */}
      {tab === "speaking" && weakSounds.length ? (
        <section
          className="rounded-2xl px-4 py-3.5"
          style={{ background: "color-mix(in srgb, var(--color-flame) 10%, transparent)" }}
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

      {/* Sekmeler: dört egzersiz becerisi + dilbilgisi + sınav. */}
      <div role="tablist" aria-label="Beceri" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {TABS.map((t) => {
          const Icon = t.id in SKILL_ICON ? SKILL_ICON[t.id as SkillId] : null;
          const count = t.id === "grammar" || t.id === "exam" ? null : atLevel.filter((i) => i.skill === t.id).length;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => pickTab(t.id)}
              className={`chip flex shrink-0 items-center gap-1.5 px-3.5 py-1.5 text-sm ${tab === t.id ? "chip-active" : ""}`}
            >
              {Icon ? <Icon size={14} /> : t.id === "grammar" ? <BookOpenIcon size={14} /> : null}
              {t.label}
              {count ? <span className="muted text-xs font-semibold">{count}</span> : null}
            </button>
          );
        })}
      </div>

      {tab === "grammar" ? (
        <GrammarTab level={level} board={board} />
      ) : tab === "exam" ? (
        <ExamTab level={level} data={exams} />
      ) : (
        <ExerciseList
          skill={tab}
          level={level}
          list={atLevel.filter((i) => i.skill === tab)}
          filter={filter}
          counts={counts}
          onFilter={setFilter}
          statusOf={statusOf}
          attempts={(id) => serverProgress[id]?.attempts ?? 0}
        />
      )}
    </div>
  );
}

/* ---------- Pano ---------- */

function tone(score: number | null) {
  return score === null
    ? "var(--surface-2)"
    : score >= 85
      ? "var(--color-mint)"
      : score >= 70
        ? "var(--color-brand)"
        : score >= 40
          ? "var(--color-flame)"
          : "var(--color-rose)";
}

function Board({ board, level, activeLevel }: { board: SkillsBoard; level: CefrLevel; activeLevel: CefrLevel }) {
  return (
    <section className="card p-4" aria-label="Yetkinlik">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold">Yetkinlik · {level}</h2>
        <span className="muted text-xs font-semibold">son 30 gün · {board.evidenceCount} kanıt</span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {PROFICIENCY_SKILLS.map((skill: ProficiencySkill) => {
          const cell = board.proficiency[skill]?.[level];
          return (
            <div key={skill}>
              <dt className="flex items-center justify-between text-xs">
                <span className="font-semibold">{PROFICIENCY_LABELS[skill]}</span>
                <span className="muted tabular-nums">{cell ? `${cell.score} · ${cell.band}` : "ölçülmedi"}</span>
              </dt>
              <dd className="mt-1 h-1.5 overflow-hidden rounded-full surface-2">
                <div className="h-full rounded-full" style={{ width: `${cell?.score ?? 0}%`, background: tone(cell?.score ?? null) }} />
              </dd>
            </div>
          );
        })}
      </dl>
      {/* Öneri yalnız çalışma seviyesi için hesaplanıyor; başka seviyeye bakarken yanıltmasın. */}
      {board.next && level === activeLevel ? (
        <Link href={board.next.href} className="mt-3 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 surface-2">
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Önerilen sıradaki: {board.next.title}</span>
            <span className="muted block text-xs">{board.next.reason} · {board.next.minutes} dk</span>
          </span>
          <span className="btn btn-primary shrink-0 px-3 py-1.5 text-xs">Başla</span>
        </Link>
      ) : null}
    </section>
  );
}

/* ---------- Egzersiz listesi ---------- */

function ExerciseList({
  skill,
  level,
  list,
  filter,
  counts,
  onFilter,
  statusOf,
  attempts,
}: {
  skill: SkillId;
  level: CefrLevel;
  list: SkillItem[];
  filter: Filter;
  counts: Record<Filter, number>;
  onFilter: (f: Filter) => void;
  statusOf: (id: string) => { state: Exclude<Filter, "all">; pct: number | null; last: number | null };
  attempts: (id: string) => number;
}) {
  const Icon = SKILL_ICON[skill];
  const shown = list.filter((i) => filter === "all" || statusOf(i.id).state === filter);
  return (
    <motion.section key={`${skill}-${level}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="flex items-center gap-2 font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white" style={{ background: LEVEL_TONE[level] }}>
            <Icon size={16} />
          </span>
          {SKILL_LABELS[skill]}
        </h2>
        <span className="muted text-xs font-semibold">
          {counts.done} / {counts.all} tamam
        </span>
      </div>

      {/* Süzgeç: yapılmamış / geliştir / tamam. Boş süzgeç çipi gösterilmez. */}
      {list.length ? (
        <div className="mb-2 flex flex-wrap gap-1.5 px-1">
          {FILTERS.map((f) =>
            f.id !== "all" && !counts[f.id] ? null : (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`chip px-2.5 py-1 text-xs ${filter === f.id ? "chip-active" : ""}`}
              >
                {f.label}
                <span className="muted ml-1 font-semibold">{counts[f.id]}</span>
              </button>
            ),
          )}
        </div>
      ) : null}

      {!list.length ? (
        <p className="muted px-1 text-sm">Bu seviyede {SKILL_LABELS[skill].toLowerCase()} egzersizi henüz yok.</p>
      ) : !shown.length ? (
        <p className="muted px-1 text-sm">Bu süzgeçte egzersiz yok.</p>
      ) : (
        <div className="card divide-y" style={{ borderColor: "var(--border)" }}>
          {shown.map((item) => {
            const st = statusOf(item.id);
            const n = attempts(item.id);
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
                    {item.genre} · {TYPE_LABEL[skill]} · {item.minutes} dk ·{" "}
                    {skill === "writing" || skill === "speaking" ? `${item.items} görev` : `${item.items} soru`}
                  </p>
                  {item.cando ? (
                    <p className="muted mt-0.5 truncate text-[11px]" title={item.cando}>
                      ✓ {item.cando}
                    </p>
                  ) : null}
                </div>
                {st.state === "todo" ? (
                  <span className="muted shrink-0 text-lg leading-none">›</span>
                ) : (
                  <span
                    className="flex shrink-0 flex-col items-end gap-0.5 text-xs font-bold tabular-nums"
                    style={{ color: st.state === "done" ? "var(--color-mint)" : "var(--color-flame)" }}
                  >
                    <span className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: `color-mix(in srgb, ${st.state === "done" ? "var(--color-mint)" : "var(--color-flame)"} 15%, transparent)` }}>
                      {st.state === "done" ? <CheckIcon size={13} /> : null}
                      {st.state === "done" ? "tamam" : "geliştir"}
                    </span>
                    <span className="muted font-semibold">
                      {st.last !== null ? `son %${st.last}` : `%${st.pct}`}
                      {n > 1 ? ` · ${n} deneme` : ""}
                    </span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}

/* ---------- Dilbilgisi ---------- */

function GrammarTab({ level, board }: { level: CefrLevel; board: SkillsBoard | null }) {
  const [due, setDue] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cheat", { cache: "no-store" });
        if (!res.ok) return;
        const d = (await res.json()) as { due: number };
        if (alive) setDue(d.due);
      } catch {
        /* çevrimdışı: sayı yok, bağlantı çalışır */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  const cell = board?.proficiency.grammar?.[level];
  return (
    <section className="space-y-3">
      <Link href="/cheatsheet" className="card flex items-center gap-3 p-4 transition-colors hover:bg-[color:var(--surface-2)]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: LEVEL_TONE[level] }}>
          <BookOpenIcon size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">Dilbilgisi tabloları</span>
          <span className="muted block text-xs">
            {level} tabloları, hücre hücre çalışma ve sınav
            {due ? ` · ${due} tekrar bekliyor` : ""}
          </span>
        </span>
        <span className="muted shrink-0 text-lg leading-none">›</span>
      </Link>
      <p className="muted px-1 text-xs">
        {cell ? `Dilbilgisi ${level}: ${cell.score} · ${cell.band} (${cell.n} kanıt).` : `Dilbilgisi ${level} henüz ölçülmedi — tablo sınavı ve seviye sınavının dilbilgisi bölümü kanıt sayılır.`}
        {" "}Konu drill'leri (WP-11) içerik geldikçe buraya eklenecek.
      </p>
    </section>
  );
}

/* ---------- Sınav ---------- */

function ExamTab({ level, data }: { level: CefrLevel; data: ExamHubData | null }) {
  const rows: { href: string; title: string; detail: string; cta: string }[] = [
    {
      href: `/exam/${level}`,
      title: `${level} seviye sınavı`,
      detail: "45 dk · beş bölüm · geçince sertifika",
      cta: "Gir",
    },
    {
      href: "/learn/haftalik",
      title: "Haftalık kullanım sınavı",
      detail: data?.weekly?.done
        ? `bu hafta yapıldı · %${data.weekly.score ?? 0}`
        : data?.weekly?.short
          ? "bu hafta kısa (az pekişmiş kelime)"
          : "15 tur · pekişmiş kelimeler cümle içinde",
      cta: data?.weekly?.done ? "Tekrar" : "Başla",
    },
    {
      href: "/placement",
      title: "Seviye testi",
      detail: data?.placement
        ? `${data.placement.at.slice(0, 10)} · öneri ${data.placement.suggested} · ${describePerSkill(data.placement.perSkill)}`
        : "15 dk · dört beceride seviye önerisi",
      cta: data && !data.canRetake ? "30 günde bir" : data?.placement ? "Yeniden" : "Ölç",
    },
  ];
  return (
    <section className="space-y-3">
      <div className="card divide-y" style={{ borderColor: "var(--border)" }}>
        {rows.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="flex items-center gap-3 px-4 py-3.5 transition-colors first:rounded-t-[var(--radius-xl2)] last:rounded-b-[var(--radius-xl2)] hover:bg-[color:var(--surface-2)]"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{r.title}</span>
              <span className="muted block text-xs">{r.detail}</span>
            </span>
            <span className="btn btn-ghost shrink-0 px-3 py-1.5 text-xs">{r.cta}</span>
          </Link>
        ))}
      </div>

      {data?.history.length ? (
        <div>
          <p className="muted mb-1.5 px-1 text-[11px] font-bold uppercase tracking-wide">Sınavlarım</p>
          <ul className="card divide-y" style={{ borderColor: "var(--border)" }}>
            {data.history.map((e) => (
              <li key={e.id} className="flex items-center gap-3 px-4 py-3 text-sm" style={{ borderColor: "var(--border)" }}>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">
                    {e.kind === "level" ? `${e.level} seviye sınavı` : `${e.level} · Modül ${(e.module ?? 0) + 1}`}
                    {e.trial ? <span className="muted font-normal"> · deneme</span> : null}
                  </span>
                  <span className="muted block text-xs">{e.at.slice(0, 10)}</span>
                </span>
                <span className="tabular-nums font-bold" style={{ color: e.passed ? "var(--color-mint)" : "var(--color-rose)" }}>
                  %{e.total}
                </span>
                {e.passed && !e.trial ? (
                  <a href={`/api/certificate/${e.id}`} target="_blank" rel="noreferrer" className="btn btn-ghost shrink-0 px-2.5 py-1 text-xs">
                    Sertifika
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
