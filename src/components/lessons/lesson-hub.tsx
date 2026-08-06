"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  ChatIcon,
  CheckIcon,
  CoffeeIcon,
  HomeIcon,
  LockIcon,
  RefreshIcon,
  StethoscopeIcon,
  UmbrellaIcon,
  WaveIcon,
} from "@/components/icons";
import { reducedMotion } from "@/lib/fx";
import type { Lesson, LessonIcon } from "@/lib/lessons/types";

/**
 * Ders yolu — liste değil harita.
 *
 * Dersler bir müfredatın adımları ve sıra anlamlı: her ders bir öncekinin
 * kelimeleriyle kurulmuş sahnenin üstüne biniyor. Liste bu sırayı "üstteki
 * önce" imasına sıkıştırıyordu; yol onu görünür yapıyor — düğümler bir
 * patikada zikzak diziliyor, seviye ayraçları etaplara bölüyor ve öğrencinin
 * nerede olduğu (parlayan düğüm) haritaya bakar bakmaz belli oluyor.
 *
 * Durumlar düğümün kendisinde: bitenler işaretli, tekrarı gelen alevli,
 * sıradaki parlıyor, ilerisi kilit görünümünde. Kilit görsel bir sıralama
 * iması — dokunmayı ENGELLEMİYOR: içerik az ve deneme serbestken gerçek bir
 * kilit öğrenciyi değil test etmeyi durdururdu. İçerik büyüyünce tek satırla
 * gerçek kilide çevrilebilir.
 */

export type HubCard = {
  lesson: Lesson;
  done: boolean;
  /** Başlanmış ama bitmemiş — anlatım yapılmış, konuşma kalmış. */
  started: boolean;
  due: boolean;
  correct: number;
  total: number;
  attempts: number;
};

type NodeState = "done" | "due" | "started" | "next" | "open" | "locked";

const ICONS: Record<LessonIcon, (p: { size?: number }) => React.ReactNode> = {
  greet: WaveIcon,
  cafe: CoffeeIcon,
  doctor: StethoscopeIcon,
  vacation: UmbrellaIcon,
  job: BriefcaseIcon,
  home: HomeIcon,
};

const LEVEL_LABELS: Record<string, string> = {
  A1: "Başlangıç",
  A2: "Temel",
  B1: "Eşik",
  B2: "İleri",
  C1: "Ustalık",
};

/**
 * Zikzak deseni: sol, sağ, orta; sonra tekrar. Learna'nın haritasıyla aynı
 * ritim — göz patikayı soldan sağa, sonra ortadan aşağı takip ediyor.
 */
const XS = [26, 74, 50];
const TOP = 46;
const ROW = 128;
const NODE = 72;

function positionOf(i: number): { x: number; y: number } {
  const p = i % 3;
  const row = Math.floor(i / 3) * 2 + (p === 2 ? 1 : 0);
  return { x: XS[p], y: TOP + row * ROW };
}

export function LessonHub({
  cards,
  next,
  weak,
  total,
}: {
  cards: HubCard[];
  next: string | null;
  /** Tekrarı gelmiş ve son denemede geçilememiş kurallar. */
  weak: string[];
  total: number;
}) {
  const doneCount = cards.filter((c) => c.done).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  // Sıradakinden ilerideki dokunulmamış dersler kilit görünümünde. Ölçü ilk
  // taze ders: tekrarı gelen bir ders "sıradaki" olsa bile ilk taze ders açık
  // kalıyor — daha önce ulaşılabilir olan bir şey geri kilitlenmez.
  const firstFresh = cards.findIndex((c) => !c.done && !c.started && !c.due);
  const stateOf = (card: HubCard, index: number): NodeState => {
    if (card.lesson.id === next) return "next";
    if (card.due) return "due";
    if (card.done) return "done";
    if (card.started) return "started";
    return firstFresh >= 0 && index > firstFresh ? "locked" : "open";
  };

  const levels = [...new Set(cards.map((c) => c.lesson.level))];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Dersler</h1>
        <p className="muted mt-1 text-sm">
          Her ders önce sesli anlatımla kelime ve kalıp öğretir, sonra seni onları
          kullanacağın bir konuşmaya sokar.
        </p>
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="muted tabular-nums">
              {doneCount} / {total} ders tamamlandı
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full surface-2">
            <motion.div
              className="brand-gradient h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 150, damping: 24 }}
            />
          </div>
        </div>
      </header>

      {weak.length ? (
        <section
          className="rounded-2xl px-4 py-3.5"
          style={{ background: "color-mix(in srgb, var(--color-flame-500) 10%, transparent)" }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--color-flame-500)" }}>
            Oturmamış kurallar
          </p>
          <p className="mt-1 text-xs">{weak.join(" · ")}</p>
        </section>
      ) : null}

      {!cards.length ? (
        <p className="muted rounded-2xl px-4 py-4 text-sm" style={{ background: "var(--surface-2)" }}>
          Bu kurs için dersler hazırlanıyor.
        </p>
      ) : null}

      {levels.map((level) => {
        const levelCards = cards
          .map((card, index) => ({ card, index }))
          .filter(({ card }) => card.lesson.level === level);
        return (
          <section key={level}>
            <LevelDivider level={level} />
            <LevelPath
              nodes={levelCards.map(({ card, index }) => ({
                card,
                state: stateOf(card, index),
              }))}
            />
          </section>
        );
      })}
    </div>
  );
}

/** Seviye ayracı — etabın adı, iki yanında çizgi. */
function LevelDivider({ level }: { level: string }) {
  return (
    <div className="mb-1 flex items-center gap-3 px-2">
      <span className="h-px flex-1" style={{ background: "var(--border)" }} />
      <span className="muted text-xs font-bold uppercase tracking-widest">
        {level}
        {LEVEL_LABELS[level] ? ` · ${LEVEL_LABELS[level]}` : ""}
      </span>
      <span className="h-px flex-1" style={{ background: "var(--border)" }} />
    </div>
  );
}

/**
 * Bir seviyenin patikası: düğümlerin arasından geçen kıvrımlı çizgi ve
 * üstünde düğümler. Çizgi SVG, düğümler mutlak konumlu bağlantılar; ikisi de
 * aynı yüzde-koordinat uzayını kullandığı için her genişlikte hizalı.
 */
function LevelPath({ nodes }: { nodes: { card: HubCard; state: NodeState }[] }) {
  const points = nodes.map((_, i) => positionOf(i));
  const last = points[points.length - 1] ?? { x: 50, y: TOP };
  const height = last.y + NODE / 2 + 58;

  let d = "";
  points.forEach((p, i) => {
    if (i === 0) {
      d = `M ${p.x} ${p.y}`;
      return;
    }
    const prev = points[i - 1];
    if (prev.y === p.y) {
      d += ` L ${p.x} ${p.y}`;
      return;
    }
    // Dikey iniş: yatayda kıvrılan yumuşak bir S — patikanın "yol" hissi.
    const midY = (prev.y + p.y) / 2;
    d += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
  });

  return (
    <div className="relative" style={{ height }}>
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        <path
          d={d}
          fill="none"
          stroke="var(--border)"
          strokeWidth={4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {nodes.map(({ card, state }, i) => (
        <LessonNode key={card.lesson.id} card={card} state={state} at={points[i]} />
      ))}
    </div>
  );
}

function LessonNode({
  card,
  state,
  at,
}: {
  card: HubCard;
  state: NodeState;
  at: { x: number; y: number };
}) {
  const Icon = ICONS[card.lesson.icon];
  const still = reducedMotion();

  const circle: React.CSSProperties =
    state === "done"
      ? { background: "var(--color-mint-500)", color: "#fff" }
      : state === "due"
        ? {
            background: "var(--color-flame-500)",
            color: "#fff",
            boxShadow: "0 10px 26px -10px var(--color-flame-500)",
          }
        : state === "started"
          ? {
              background: "var(--surface)",
              border: "2px solid var(--color-brand-500)",
              color: "var(--color-brand-500)",
            }
          : state === "locked"
            ? { background: "var(--surface-2)", color: "var(--text-muted)" }
            : state === "open"
              ? {
                  background: "var(--surface)",
                  border: "1.5px solid var(--border)",
                  color: "var(--text-muted)",
                }
              : {}; // next: brand-gradient sınıfı hallediyor

  return (
    <Link
      href={`/lessons/${card.lesson.id}`}
      className="absolute z-10 flex w-[128px] -translate-x-1/2 flex-col items-center"
      style={{ left: `${at.x}%`, top: at.y - NODE / 2 }}
    >
      <motion.div
        whileTap={{ scale: 0.93 }}
        className={`relative flex items-center justify-center rounded-full ${
          state === "next" ? "brand-gradient text-white" : ""
        }`}
        style={{
          width: NODE,
          height: NODE,
          ...(state === "next"
            ? { boxShadow: "0 14px 32px -10px var(--color-brand-500)" }
            : circle),
        }}
      >
        {/* Sıradaki düğüm nefes alıyor: haritada gözün ilk bulacağı yer. */}
        {state === "next" && !still ? (
          <motion.span
            aria-hidden
            className="absolute -inset-1.5 rounded-full"
            style={{ border: "2px solid var(--color-brand-500)" }}
            animate={{ scale: [1, 1.22], opacity: [0.55, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
          />
        ) : null}
        <span style={state === "locked" ? { opacity: 0.55 } : undefined}>
          <Icon size={30} />
        </span>
        <NodeBadge state={state} />
      </motion.div>
      <p
        className={`mt-2 max-w-[128px] text-center text-xs font-bold leading-tight ${
          state === "locked" ? "muted" : ""
        }`}
      >
        {card.lesson.title}
      </p>
      <p className="muted max-w-[128px] text-center text-[10px] leading-tight">
        {state === "started"
          ? "konuşma kaldı"
          : state === "due"
            ? "tekrar zamanı"
            : card.lesson.titleTr}
      </p>
    </Link>
  );
}

/** Düğümün sağ alt köşesindeki durum rozeti. */
function NodeBadge({ state }: { state: NodeState }) {
  if (state === "next" || state === "open") return null;
  const [bg, icon] =
    state === "done"
      ? ["var(--color-mint-500)", <CheckIcon key="i" size={12} />]
      : state === "due"
        ? ["var(--color-flame-500)", <RefreshIcon key="i" size={12} />]
        : state === "started"
          ? ["var(--color-brand-500)", <ChatIcon key="i" size={12} />]
          : ["var(--text-muted)", <LockIcon key="i" size={12} />];
  return (
    <span
      className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white"
      style={{ background: bg, border: "2px solid var(--surface)" }}
    >
      {icon}
    </span>
  );
}
