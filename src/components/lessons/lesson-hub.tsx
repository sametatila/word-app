"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArtIcon,
  BabyIcon,
  BedIcon,
  BikeIcon,
  BookIcon,
  BreadIcon,
  BriefcaseIcon,
  BusIcon,
  CakeIcon,
  CalendarIcon,
  CameraIcon,
  CarIcon,
  CartIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  CityIcon,
  ClockIcon,
  CoffeeIcon,
  DogIcon,
  FamilyIcon,
  FilmIcon,
  FlagIcon,
  FlowerIcon,
  FoodIcon,
  GiftIcon,
  GlobeIcon,
  HandshakeIcon,
  HeartIcon,
  HomeIcon,
  IdeaIcon,
  KeyIcon,
  LawIcon,
  LockIcon,
  MailIcon,
  MapIcon,
  MediaIcon,
  MoneyIcon,
  MountainIcon,
  MusicIcon,
  NatureIcon,
  OfficeIcon,
  PartyIcon,
  PenIcon,
  PhoneIcon,
  PillIcon,
  PlaneIcon,
  QuestionIcon,
  RainIcon,
  RecycleIcon,
  RefreshIcon,
  RingIcon,
  RunIcon,
  SchoolIcon,
  ShirtIcon,
  SnowIcon,
  SportIcon,
  StarIcon,
  StethoscopeIcon,
  SuitcaseIcon,
  SunIcon,
  TechIcon,
  TicketIcon,
  ToothIcon,
  TrainIcon,
  UmbrellaIcon,
  WaveIcon,
  WeatherIcon,
  WrenchIcon,
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
  shopping: CartIcon,
  transport: BusIcon,
  family: FamilyIcon,
  phone: PhoneIcon,
  school: SchoolIcon,
  food: FoodIcon,
  weather: WeatherIcon,
  money: MoneyIcon,
  calendar: CalendarIcon,
  sport: SportIcon,
  nature: NatureIcon,
  city: CityIcon,
  media: MediaIcon,
  feelings: HeartIcon,
  culture: GlobeIcon,
  repair: WrenchIcon,
  office: OfficeIcon,
  music: MusicIcon,
  mail: MailIcon,
  party: PartyIcon,
  tech: TechIcon,
  clock: ClockIcon,
  bed: BedIcon,
  car: CarIcon,
  train: TrainIcon,
  plane: PlaneIcon,
  map: MapIcon,
  camera: CameraIcon,
  book: BookIcon,
  pen: PenIcon,
  gift: GiftIcon,
  cake: CakeIcon,
  ring: RingIcon,
  baby: BabyIcon,
  dog: DogIcon,
  flower: FlowerIcon,
  sun: SunIcon,
  snow: SnowIcon,
  rain: RainIcon,
  tooth: ToothIcon,
  pill: PillIcon,
  run: RunIcon,
  bike: BikeIcon,
  film: FilmIcon,
  art: ArtIcon,
  law: LawIcon,
  flag: FlagIcon,
  suitcase: SuitcaseIcon,
  ticket: TicketIcon,
  chart: ChartIcon,
  idea: IdeaIcon,
  handshake: HandshakeIcon,
  recycle: RecycleIcon,
  shirt: ShirtIcon,
  bread: BreadIcon,
  mountain: MountainIcon,
  star: StarIcon,
  question: QuestionIcon,
  key: KeyIcon,
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

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];
const levelIdx = (l: string) => Math.max(0, LEVEL_ORDER.indexOf(l));

export function LessonHub({
  cards,
  next,
  weak,
  total,
  userLevel,
}: {
  cards: HubCard[];
  next: string | null;
  /** Tekrarı gelmiş ve son denemede geçilememiş kurallar. */
  weak: string[];
  total: number;
  /** Kullanıcının seçtiği seviye — yolun başlangıç noktası. */
  userLevel: string;
}) {
  const doneCount = cards.filter((c) => c.done).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  /**
   * Kilit, kullanıcının SEVİYESİNDEN başlayan zincire göre hesaplanıyor:
   * B1 seçen biri için A1-A2 düğümleri kilitli değil "açık" — isteğe bağlı
   * geri dönüş. Kendi seviyesindeki ilk taze dersten sonrası kilit
   * görünümünde. Tekrarı gelen ya da başlanmış ders hiçbir zaman kilitlenmez.
   */
  const startIdx = cards.findIndex((c) => levelIdx(c.lesson.level) >= levelIdx(userLevel));
  const firstFresh = cards.findIndex(
    (c, i) => i >= Math.max(0, startIdx) && !c.done && !c.started && !c.due,
  );
  const stateOf = (card: HubCard, index: number): NodeState => {
    if (card.lesson.id === next) return "next";
    if (card.due) return "due";
    if (card.done) return "done";
    if (card.started) return "started";
    return firstFresh >= 0 && index > firstFresh ? "locked" : "open";
  };

  /**
   * Harita açılınca göz aktif düğümde başlamalı: 500 derslik yolda B1
   * kullanıcısına A1'in tepesini göstermek, her girişte elle kaydırma
   * borcu yüklerdi. Kaydırma animasyonsuz — sayfa "orada açılmış" hissi
   * vermeli, göz önünde yolculuk yapmamalı.
   */
  useEffect(() => {
    if (!next) return;
    const el = document.getElementById(`lesson-node-${next}`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Zaten görünürdeyse dokunma: sayfayı boşuna oynatmak dikkat dağıtır.
    if (r.top >= 0 && r.bottom <= window.innerHeight) return;
    el.scrollIntoView({ block: "center", behavior: "auto" });
  }, [next]);

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
      id={`lesson-node-${card.lesson.id}`}
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
        {/* Sıradaki düğüm nefes alıyor: haritada gözün ilk bulacağı yer.
            İki halka yarım tur arayla — radar hissi, tek halkanın yeniden
            başlama sıçraması duyulmuyor. Animasyon saf CSS (bkz. globals). */}
        {state === "next" && !still ? (
          <>
            <span
              aria-hidden
              className="lesson-ping absolute -inset-1.5 rounded-full"
              style={{ border: "2px solid var(--color-brand-500)" }}
            />
            <span
              aria-hidden
              className="lesson-ping absolute -inset-1.5 rounded-full"
              style={{ border: "2px solid var(--color-brand-500)", animationDelay: "1s" }}
            />
          </>
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
