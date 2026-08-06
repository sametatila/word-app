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
  due: boolean;
  correct: number;
  total: number;
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
  const freshCards = cards.filter((c) => !c.due && !c.done);
  const doneCards = cards.filter((c) => c.done && !c.due);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Dersler</h1>
        <p className="muted mt-1 text-sm">
          Her ders tek bir kural öğretir, sonra o kuralı kullandığın bir konuşmaya sokar.
        </p>
        {/* İlerleme yalnızca artan bir ölçü: kaç ders bitti. Derecelendirme
            değil, biriktirdiğini gösteriyor. */}
        <p className="muted mt-2 text-xs tabular-nums">
          {cards.filter((c) => c.done).length} / {total} ders tamamlandı
        </p>
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
      <Group title="Yeni dersler" cards={freshCards} />
      <Group title="Tamamladıkların" cards={doneCards} muted />
    </div>
  );
}

function Group({ title, cards, muted }: { title: string; cards: HubCard[]; muted?: boolean }) {
  if (!cards.length) return null;
  return (
    <section>
      <h2 className="muted mb-2 text-xs font-bold uppercase tracking-wide">{title}</h2>
      <div className="grid gap-2">
        {cards.map((c) => (
          <Link key={c.lesson.id} href={`/lessons/${c.lesson.id}`} className="block">
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
              {c.done ? (
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--color-mint-500)" }}
                >
                  <CheckIcon size={13} />
                </span>
              ) : (
                <span className="muted shrink-0 text-xs tabular-nums">{c.lesson.minutes} dk</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
