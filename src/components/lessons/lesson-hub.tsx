"use client";

import { useEffect, useRef, useState } from "react";
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
  FlameIcon,
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
  TrophyIcon,
  UmbrellaIcon,
  WaveIcon,
  WeatherIcon,
  WrenchIcon,
} from "@/components/icons";
import { useStill } from "@/lib/use-still";
import { MODULE_SIZE, moduleTheme } from "@/lib/lessons/modules";
import type { Lesson, LessonIcon } from "@/lib/lessons/types";

/**
 * Ders yolu — liste değil harita; ve harita, etaplara bölünmüş bir yolculuk.
 *
 * Kurgu Duolingo'nun path modelinden uyarlandı ve üç fikre dayanıyor:
 *
 * 1. **Modül pankartları.** 100 derslik bir seviye tek kesintisiz şerit
 *    olarak ezici; müfredat zaten 10 derslik tematik modüllerden oluşuyor.
 *    Her modül, ne vadettiğini söyleyen renkli bir pankartla açılıyor
 *    ("A1 · 3. Modül — Yeme-içme") ve pankart modülün yerel ilerlemesini
 *    taşıyor (3/10, bitince kupa). 202 derste 4 bitirmiş birine "%2" demek
 *    cesaret kırıcı; "bu modülde 4/10" ise ulaşılabilir bir hedef.
 *
 * 2. **Yolun kendisi ilerlemeyi gösteriyor.** Düğümler arası her çizgi
 *    parçası ayrı çiziliyor: geçilmiş kenar nane yeşili, gerisi soluk.
 *    Duolingo'nun altın patikası gibi — kat edilen yol, haritada iz
 *    bırakıyor.
 *
 * 3. **Aktif düğüm konuşuyor.** Sıradaki dersin üstünde zıplayan bir
 *    "BAŞLA" balonu var (başlanmışsa "DEVAM", tekrarsa "TEKRAR") ve
 *    kullanıcı yoldan uzaklaşırsa alttan "Kaldığın yer" düğmesi çıkıp
 *    tek dokunuşla geri getiriyor — 500 düğümlük yolda kaybolmak yok.
 *
 * Durumlar düğümün kendisinde: bitenler işaretli, tekrarı gelen alevli,
 * sıradaki parlıyor, ilerisi kilit görünümünde. Kilit görsel bir sıralama
 * iması — dokunmayı ENGELLEMİYOR: içerik az ve deneme serbestken gerçek bir
 * kilit öğrenciyi değil test etmeyi durdururdu.
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
 * Modül pankartlarının vurgu renkleri — paletteki canlı tonlar sırayla
 * dönüyor, ardışık iki modül asla aynı renkte olmuyor. Renk yalnızca
 * pankartta: düğümler durum renklerini koruyor ki "bitti/sırada/tekrar"
 * dili sayfa boyunca sabit kalsın.
 */
const MODULE_ACCENTS = [
  "var(--color-brand)",
  "var(--color-sky)",
  "var(--color-violet)",
  "var(--color-flame)",
  "var(--color-rose)",
  "var(--color-mint)",
];

/**
 * Serpantin: her düğüm kendi satırında, x orta→sağ→orta→sol döngüsünde.
 * Modül başında sıfırlanıyor; böylece her modül aynı S kıvrımıyla başlayan
 * kendi küçük patikası gibi okunuyor.
 */
const XS = [50, 74, 50, 26];
const TOP = 44;
const ROW = 104;
const NODE = 72;

function positionOf(i: number): { x: number; y: number } {
  return { x: XS[i % 4], y: TOP + i * ROW };
}

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];
const levelIdx = (l: string) => Math.max(0, LEVEL_ORDER.indexOf(l));

type PathNode = { card: HubCard; state: NodeState };

export function LessonHub({
  cards,
  next,
  weak,
  total,
  userLevel,
  cleared = {},
  passed = {},
}: {
  cards: HubCard[];
  next: string | null;
  /** Tekrarı gelmiş ve son denemede geçilememiş kurallar. */
  weak: string[];
  total: number;
  /** Kullanıcının seçtiği seviye — yolun başlangıç noktası. */
  userLevel: string;
  /** Geçilmiş hız turları: "A1:2" → kalan en iyi süre. */
  cleared?: Record<string, number>;
  /** Geçilmiş modül sınavları: "A1:2" → en iyi toplam puan. */
  passed?: Record<string, number>;
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
  let moduleCounter = 0;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      {/*
        Sayfanın tepesinde ne tanıtım satırı ne de "Dersler" başlığı var.

        Başlık bir bilgi taşımıyordu: alt gezinmede "Dersler" sekmesi zaten
        vurgulu duruyor ve ekranın kendisi bir ders yolu. İkisi birlikte aynı
        kelimeyi iki kez söylüyor ve haritanın ilk ekranından bir düğüm
        çalıyordu. Geriye kalan tek satır bir açıklama değil, bir SAYI.
      */}
      <header>
        <div>
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
          style={{ background: "color-mix(in srgb, var(--color-flame) 10%, transparent)" }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--color-flame)" }}>
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

        // Katalog sırası = konu sırası olduğu için 10'arlı dilimler müfredat
        // modülleriyle örtüşüyor. (Eksik üretilmiş bir seviyede dilimler
        // kayabilir; içerik tamamlandığında kendiliğinden hizalanır.)
        const chunks: { card: HubCard; index: number }[][] = [];
        for (let i = 0; i < levelCards.length; i += MODULE_SIZE)
          chunks.push(levelCards.slice(i, i + MODULE_SIZE));

        return (
          <section key={level}>
            <LevelDivider level={level} />
            {chunks.map((chunk, mi) => {
              const accent = MODULE_ACCENTS[moduleCounter++ % MODULE_ACCENTS.length];
              const nodes: PathNode[] = chunk.map(({ card, index }) => ({
                card,
                state: stateOf(card, index),
              }));
              return (
                <div key={`${level}-${mi}`}>
                  <ModuleBanner
                    level={level}
                    moduleIdx={mi}
                    accent={accent}
                    done={nodes.filter((n) => n.card.done).length}
                    size={nodes.length}
                  />
                  <ModulePath nodes={nodes} />
                  {/* Modülün sonundaki sınav: yolun varış noktası. Modül
                      bitmeden de açık — yoldaki kilitler gibi bu da görsel bir
                      sıralama iması, engel değil. */}
                  <ModuleExit
                    level={level}
                    moduleIdx={mi}
                    accent={accent}
                    done={nodes.filter((n) => n.card.done).length}
                    size={nodes.length}
                    bestLeft={cleared[`${level}:${mi}`] ?? null}
                    score={passed[`${level}:${mi}`] ?? null}
                  />
                </div>
              );
            })}
          </section>
        );
      })}

      <ReturnToActive targetId={next ? `lesson-node-${next}` : null} />
    </div>
  );
}

/**
 * Modülün çıkış düğümü — yolun varış noktası.
 *
 * On ders bitince hiçbir şey OLMUYORDU: pankartta bir kupa beliriyor, yol
 * devam ediyordu. Buraya iki şey konuldu ve **sıraları bilinçli**:
 *
 *   1. **Modül sınavı** (asıl kapı). Yedi bölüm, 25 dakika: modülün
 *      kelimeleri, dilbilgisi odakları, üretim adımları, kendi diyaloğu ve
 *      metni, konuşma ve yazma. Geçince taç ve sertifika buradan geliyor.
 *   2. **Hız turu** (isteğe bağlı ısınma). Altmış saniyede on beş kelime
 *      turu; eğlencesi ve baskısı var ama bir şey KANITLAMIYOR — uzun süre
 *      modülün tek "sınavı" oydu ve kullanıcı modülü bitirdiğinde yalnızca
 *      kelime tanıdığını görüyordu.
 *
 * İkisi de modül bitmeden açık. Yoldaki kilitler gibi bu da görsel bir
 * sıralama iması, duvar değil: hazır olmayan girer, zorlanır, döner.
 */
function ModuleExit({
  level,
  moduleIdx,
  accent,
  done,
  size,
  bestLeft,
  score,
}: {
  level: string;
  moduleIdx: number;
  accent: string;
  done: number;
  size: number;
  /** Hız turu geçildiyse kalan en iyi süre. */
  bestLeft: number | null;
  /** Modül sınavı geçildiyse en iyi toplam puan. */
  score: number | null;
}) {
  const ready = size > 0 && done >= size;
  const cleared = score !== null;
  const tone = cleared ? "var(--color-mint)" : ready ? accent : "var(--text-muted)";

  return (
    <div className="mb-6 flex flex-col items-center">
      {/* Yolun son parçası sınava bağlanıyor: düğüm havada durmasın. */}
      <span
        className="h-6 w-1 rounded-full"
        style={{ background: ready ? tone : "var(--border)", opacity: ready ? 0.5 : 1 }}
      />
      <Link
        href={`/exam/${level}/${moduleIdx}`}
        className="flex w-full max-w-sm items-center gap-3 rounded-2xl px-4 py-3 transition-transform active:scale-[0.98]"
        style={{
          background: cleared
            ? "color-mix(in srgb, var(--color-mint) 12%, var(--surface))"
            : ready
              ? `color-mix(in srgb, ${accent} 12%, var(--surface))`
              : "var(--surface-2)",
          border: `1px solid color-mix(in srgb, ${tone} 30%, transparent)`,
          opacity: ready || cleared ? 1 : 0.75,
        }}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in srgb, ${tone} 18%, transparent)`, color: tone }}
        >
          {cleared ? <TrophyIcon size={20} /> : <FlagIcon size={20} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold">Modül sınavı</span>
          <span className="muted block text-xs">
            {cleared
              ? `Geçildi · %${score}`
              : ready
                ? "Yedi bölüm, 25 dk — konuşma ve yazma dahil"
                : `Önce dersler: ${done}/${size}`}
          </span>
        </span>
        <span className="shrink-0 text-xs font-bold" style={{ color: tone }}>
          {cleared ? "tekrar" : "gir"}
        </span>
      </Link>
      <Link
        href={`/lessons/sinav/${level}/${moduleIdx}`}
        className="muted mt-1.5 flex items-center gap-1.5 px-3 py-1 text-xs font-semibold underline-offset-2 hover:underline"
      >
        <FlameIcon size={12} />
        {bestLeft !== null ? `Hız turu · en iyi ${bestLeft} sn kalan` : "Hız turu · 60 saniye, 15 kelime"}
      </Link>
    </div>
  );
}

/** Seviye ayracı — etabın adı, iki yanında çizgi. */
function LevelDivider({ level }: { level: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 px-2">
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
 * Modül pankartı — etabın kapısı. Sol tarafta modül künyesi ve teması,
 * sağda yerel ilerleme; modül bitince ilerlemenin yerini kupa alıyor.
 * Renk yalnızca zemin tonu ve künye — yazı gövdesi tema renklerinde
 * kalıyor ki karanlık/aydınlık iki modda da okunur olsun.
 */
function ModuleBanner({
  level,
  moduleIdx,
  accent,
  done,
  size,
}: {
  level: string;
  moduleIdx: number;
  accent: string;
  done: number;
  size: number;
}) {
  const theme = moduleTheme(level, moduleIdx);
  const complete = size > 0 && done >= size;
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
      style={{
        background: complete
          ? "color-mix(in srgb, var(--color-mint) 12%, var(--surface))"
          : `color-mix(in srgb, ${accent} 12%, var(--surface))`,
        border: `1px solid color-mix(in srgb, ${complete ? "var(--color-mint)" : accent} 30%, transparent)`,
      }}
    >
      <div className="min-w-0">
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: complete ? "var(--color-mint)" : accent }}
        >
          {level} · {moduleIdx + 1}. Modül
        </p>
        {theme ? <p className="truncate text-sm font-bold leading-snug">{theme}</p> : null}
      </div>
      {complete ? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: "var(--color-mint-600)" }}
        >
          <TrophyIcon size={18} />
        </span>
      ) : (
        <span className="muted shrink-0 text-xs font-bold tabular-nums">
          {done}/{size}
        </span>
      )}
    </div>
  );
}

/**
 * Bir modülün patikası: serpantin üzerinde düğümler. Çizgi kenar kenar
 * çiziliyor ve geçilmiş kenarlar (başlangıcı bitmiş ders) nane yeşili —
 * ilerleme yolun kendisinde görünüyor. Çizgi SVG, düğümler mutlak konumlu
 * bağlantılar; ikisi de aynı yüzde-koordinat uzayını kullandığı için her
 * genişlikte hizalı.
 */
function ModulePath({ nodes }: { nodes: PathNode[] }) {
  const points = nodes.map((_, i) => positionOf(i));
  const last = points[points.length - 1] ?? { x: 50, y: TOP };
  const height = last.y + NODE / 2 + 56;

  const edges = points.slice(1).map((p, i) => {
    const prev = points[i];
    const midY = (prev.y + p.y) / 2;
    return {
      d: `M ${prev.x} ${prev.y} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`,
      passed: nodes[i].card.done,
    };
  });

  return (
    <div className="relative" style={{ height }}>
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        {edges.map((e, i) => (
          <path
            key={i}
            d={e.d}
            fill="none"
            stroke={e.passed ? "var(--color-mint)" : "var(--border)"}
            strokeOpacity={e.passed ? 0.55 : 1}
            strokeWidth={4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
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
  const still = useStill();

  const circle: React.CSSProperties =
    state === "done"
      ? { background: "var(--color-mint-600)", color: "#fff" }
      : state === "due"
        ? {
            background: "var(--color-flame-600)",
            color: "#fff",
            boxShadow: "0 10px 26px -10px var(--color-flame-600)",
          }
        : state === "started"
          ? {
              background: "var(--surface)",
              border: "2px solid var(--color-brand)",
              color: "var(--color-brand)",
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
      {/* Duolingo'nun imza öğesi: aktif düğümün üstünde zıplayan çağrı
          balonu. Metin duruma göre — taze derse BAŞLA, konuşması kalan
          derse DEVAM, tekrarı gelene TEKRAR. */}
      {state === "next" ? (
        <motion.span
          className="absolute -top-9 z-20 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide text-white brand-gradient"
          style={{ boxShadow: "0 6px 16px -6px var(--color-brand)" }}
          animate={still ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {card.due ? "TEKRAR" : card.started ? "DEVAM" : "BAŞLA"}
          <span
            aria-hidden
            className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
            style={{ background: "var(--color-brand)" }}
          />
        </motion.span>
      ) : null}
      <motion.div
        whileTap={{ scale: 0.93 }}
        className={`relative flex items-center justify-center rounded-full ${
          state === "next" ? "brand-gradient" : ""
        }`}
        style={{
          width: NODE,
          height: NODE,
          ...(state === "next"
            ? { boxShadow: "0 14px 32px -10px var(--color-brand)" }
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
              style={{ border: "2px solid var(--color-brand)" }}
            />
            <span
              aria-hidden
              className="lesson-ping absolute -inset-1.5 rounded-full"
              style={{ border: "2px solid var(--color-brand)", animationDelay: "1s" }}
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
      ? ["var(--color-mint)", <CheckIcon key="i" size={12} />]
      : state === "due"
        ? ["var(--color-flame)", <RefreshIcon key="i" size={12} />]
        : state === "started"
          ? ["var(--color-brand)", <ChatIcon key="i" size={12} />]
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

/**
 * "Kaldığın yer" — Duolingo'nun yüzen okunun karşılığı. Aktif düğüm ekrandan
 * çıkınca alttan bir hap beliriyor; dokununca yol aktif düğüme kayıyor.
 * 500 düğümlük bir haritada yukarı-aşağı gezinen kullanıcıyı tek dokunuşla
 * eve döndürmenin en ucuz yolu. IntersectionObserver ile izleniyor; sabit
 * konum, alt gezinme çubuğunun üstünde.
 */
function ReturnToActive({ targetId }: { targetId: string | null }) {
  const [away, setAway] = useState(false);
  const dirRef = useRef<"up" | "down">("down");

  useEffect(() => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          dirRef.current = entry.boundingClientRect.top < 0 ? "up" : "down";
          setAway(true);
        } else {
          setAway(false);
        }
      },
      // Küçük bir tampon: düğüm ekranın tam kıyısındayken düğme titremesin.
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  if (!targetId || !away) return null;
  return (
    <button
      type="button"
      onClick={() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      }}
      className="fixed left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold text-white brand-gradient"
      style={{
        // Alt gezinme çubuğunun hemen üstü; çubuk olmayan ekranlarda kıyıya iner.
        bottom: "calc(var(--nav-h, 0px) + 1rem)",
        boxShadow: "0 10px 26px -8px var(--color-brand-600)",
      }}
    >
      <span aria-hidden className="text-sm leading-none">
        {dirRef.current === "up" ? "↑" : "↓"}
      </span>
      Kaldığın yer
    </button>
  );
}
