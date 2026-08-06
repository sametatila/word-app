"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon, SparkIcon } from "@/components/icons";
import type { Lesson } from "@/lib/lessons/types";

/**
 * Ders listesi.
 *
 * Sıralama bilerek "tekrar önce": zamanı gelmiş bir ders, yeni bir dersten
 * önce gösteriliyor. Yeni konu eklemek kolay, eskisini tutmak zor — tekrar
 * borcu varken yeni ders açmak öğrenciyi ilerliyormuş gibi hissettirip
 * aslında geride bırakıyor.
 */

export type HubCard = {
  lesson: Lesson;
  done: boolean;
  /** Başlanmış ama bitmemiş — alıştırmalar yapılmış, konuşma kalmış. */
  started: boolean;
  due: boolean;
  correct: number;
  total: number;
  attempts: number;
};

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
  const dueCards = cards.filter((c) => c.due);
  const halfCards = cards.filter((c) => !c.due && c.started);
  const freshCards = cards.filter((c) => !c.due && !c.done && !c.started);
  const doneCards = cards.filter((c) => c.done && !c.due);
  const doneCount = cards.filter((c) => c.done).length;
  const startedCount = cards.filter((c) => c.started).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Dersler</h1>
        <p className="muted mt-1 text-sm">
          Her ders tek bir kural öğretir, sonra o kuralı kullandığın bir konuşmaya sokar.
        </p>
        {/* İlerleme yalnızca artan bir ölçü: kaç ders bitti. Derecelendirme
            değil, biriktirdiğini gösteriyor.

            Yarım kalan ders ayrıca sayılıyor. Önce yalnızca tamamlanan sayısı
            yazıyordu ve alıştırmaları bitirip konuşmaya girmemiş bir öğrenci
            hiçbir ilerleme göremiyordu — ekran ona hiç başlamamış gibi
            davranıyordu. */}
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="muted tabular-nums">
              {doneCount} / {total} ders tamamlandı
            </span>
            {startedCount ? (
              <span className="tabular-nums" style={{ color: "var(--color-flame-500)" }}>
                {startedCount} ders yarım
              </span>
            ) : null}
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

      {/* Zayıf kurallar: tekrarı gelmiş ve son denemede geçilememiş olanlar.
          Kelimelerde bu bilgi vardı, dilbilgisinde yoktu — öğrenci aynı kuralı
          defalarca yanlış yapıp bunu hiç görmüyordu. */}
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

      {next ? (
        <Link href={`/lessons/${next}`} className="block">
          <motion.div
            whileTap={{ scale: 0.99 }}
            className="brand-gradient flex items-center gap-3 rounded-2xl px-4 py-4 text-white"
          >
            <SparkIcon size={22} />
            <div className="min-w-0">
              <p className="text-sm font-bold">
                {dueCards.length ? "Tekrar zamanı" : "Sıradaki ders"}
              </p>
              <p className="truncate text-xs opacity-90">
                {cards.find((c) => c.lesson.id === next)?.lesson.title}
              </p>
            </div>
          </motion.div>
        </Link>
      ) : (
        <p className="muted rounded-2xl px-4 py-4 text-sm" style={{ background: "var(--surface-2)" }}>
          Bu kurstaki bütün dersleri bitirdin. Tekrarlar zamanı gelince burada görünecek.
        </p>
      )}

      <Group title="Tekrar zamanı geldi" cards={dueCards} />
      <Group title="Yarım kalanlar" cards={halfCards} />
      <Group title="Yeni dersler" cards={freshCards} />
      <Group title="Tamamladıkların" cards={doneCards} muted />
    </div>
  );
}

/**
 * Dersin sağ kenarındaki durum.
 *
 * Üç ayrı hâl var ve üçü de görünmek zorunda: bitmiş, yarım kalmış, hiç
 * başlanmamış. Önce yalnızca "bitmiş / bitmemiş" gösteriliyordu; yarım kalan
 * ders hiç başlanmamış gibi duruyor ve öğrenci yaptığı alıştırmaların izini
 * göremiyordu.
 */
function Status({ card }: { card: HubCard }) {
  if (card.done)
    return (
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
        style={{ background: "var(--color-mint-500)" }}
      >
        <CheckIcon size={13} />
      </span>
    );
  if (card.started)
    return (
      <span className="shrink-0 text-right leading-tight">
        <span className="block text-xs font-bold tabular-nums" style={{ color: "var(--color-flame-500)" }}>
          {card.correct}/{card.total}
        </span>
        <span className="muted block text-[10px]">konuşma kaldı</span>
      </span>
    );
  return <span className="muted shrink-0 text-xs tabular-nums">{card.lesson.minutes} dk</span>;
}

function Group({ title, cards, muted }: { title: string; cards: HubCard[]; muted?: boolean }) {
  if (!cards.length) return null;
  return (
    <section>
      <h2 className="muted mb-2 text-xs font-bold uppercase tracking-wide">{title}</h2>
      <div className="grid gap-2">
        {cards.map((c) => (
          // `min-w-0` şart: ızgara çocuğunun en küçük genişliği kendiliğinden
          // içeriği kadar oluyor, o yüzden içerideki `truncate` hiç devreye
          // girmiyor ve kart ekranın sağından taşıyordu.
          <Link key={c.lesson.id} href={`/lessons/${c.lesson.id}`} className="block min-w-0">
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                opacity: muted ? 0.75 : 1,
              }}
            >
              <span className="chip shrink-0 px-2 py-0.5 text-[11px] font-bold">
                {c.lesson.level}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{c.lesson.title}</p>
                <p className="muted truncate text-xs">{c.lesson.summary}</p>
              </div>
              <Status card={c} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
