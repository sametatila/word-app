"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon, GiftIcon, TargetIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { play } from "@/lib/sfx";

/**
 * Günün görevleri kartı.
 *
 * Görevler yalnızca bir ödül mekaniği değil, bir yönlendirme aracı: ölçümde
 * beceriler bölümünü yedi kullanıcıdan biri, dersleri üçü açmıştı. Günün üç
 * görevinden biri hep o bölümlerden birine götürüyor, böylece uygulamanın en
 * zengin içeriği ilk kez görünür oluyor.
 */

type Quest = {
  id: string;
  label: string;
  href: string;
  target: number;
  done: number;
  xp: number;
  claimed: boolean;
};

type Board = { quests: Quest[]; allDone: boolean; allClaimed: boolean };

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function QuestCard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/quests?day=${localDay()}`, { cache: "no-store" });
      if (res.ok) setBoard((await res.json()) as Board);
    } catch {
      /* görevler ikincil: yüklenemezse kart hiç görünmez */
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function claim(questId: string) {
    setBusy(questId);
    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ questId, day: localDay() }),
      });
      if (res.ok) {
        const out = (await res.json()) as Board & {
          xp: number;
          totalXp: number | null;
          currentStreak: number | null;
        };
        setBoard({ quests: out.quests, allDone: out.allDone, allClaimed: out.allClaimed });
        if (out.xp > 0) {
          track("quest_claim", out.xp);
          play("unlock");
          setFlash(out.xp);
          setTimeout(() => setFlash(0), 2400);
          // Üst bardaki XP rozeti anında güncellensin. Seri de gerçek
          // değeriyle gidiyor: olay iki alanı birden yazdığı için eksik
          // gönderilen bir seri rozeti sıfırlardı.
          if (out.totalXp !== null && out.currentStreak !== null) {
            window.dispatchEvent(
              new CustomEvent("wortspiel:stats", {
                detail: { xp: out.totalXp, streak: out.currentStreak },
              }),
            );
          }
        }
      }
    } finally {
      setBusy(null);
    }
  }

  if (!board) return null;

  const claimable = board.quests.filter((q) => q.done >= q.target && !q.claimed).length;

  return (
    <section
      /* Giriş animasyonu YOK: bu kart başlangıç ekranında bir zincirin halkası
         ve zinciri `Stagger` yönetiyor (bkz. components/reveal). Kendi başına
         belirdiğinde altı kart aynı anda ama farklı mesafelerle (kimi 8, kimi
         14 piksel) açılıyordu — hepsi birden oynayan ama aynı ritmi tutmayan
         bir hareket. */
      className="card mx-auto mt-4 w-full max-w-md overflow-hidden"
    >
      <div
        className="flex items-baseline justify-between border-b px-5 py-3.5"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="flex items-center gap-2 font-bold">
          <TargetIcon size={17} /> Bugünün görevleri
        </h2>
        {claimable > 0 ? (
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-bold"
            style={{
              background: "color-mix(in srgb, var(--color-mint) 18%, transparent)",
              color: "var(--color-mint)",
            }}
          >
            {claimable} ödül hazır
          </span>
        ) : (
          <span className="muted text-xs">gece yarısı yenilenir</span>
        )}
      </div>

      <ul>
        {board.quests.map((q) => {
          const done = q.done >= q.target;
          const pct = Math.min(100, Math.round((q.done / q.target) * 100));
          return (
            <li
              key={q.id}
              className="flex items-center gap-3 border-b px-5 py-3 last:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  background: done
                    ? "color-mix(in srgb, var(--color-mint) 18%, transparent)"
                    : "var(--surface-2)",
                  color: done ? "var(--color-mint)" : "var(--text-muted)",
                }}
              >
                {done ? <CheckIcon size={15} /> : `${q.done}`}
              </span>

              <div className="min-w-0 flex-1">
                {/* Tamamlanmamış görev bir bağlantı: dokununca o bölüme
                    götürüyor. Yönlendirme işi asıl burada yapılıyor. */}
                {done ? (
                  <p className="truncate text-sm font-semibold">{q.label}</p>
                ) : (
                  <Link href={q.href} className="block truncate text-sm font-semibold hover:underline">
                    {q.label}
                  </Link>
                )}
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full surface-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: done ? "var(--color-mint)" : "var(--color-brand)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {q.claimed ? (
                <span className="muted shrink-0 text-[11px] font-semibold">+{q.xp} XP</span>
              ) : done ? (
                <button
                  onClick={() => void claim(q.id)}
                  disabled={busy === q.id}
                  className="btn btn-primary shrink-0 px-3 py-1.5 text-xs disabled:opacity-60"
                >
                  {busy === q.id ? "…" : `+${q.xp} XP al`}
                </button>
              ) : (
                <span className="muted shrink-0 text-[11px] tabular-nums">
                  {q.done}/{q.target}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {board.allDone ? (
        <div
          className="flex items-center gap-3 px-5 py-3.5"
          style={{ background: "color-mix(in srgb, var(--color-mint) 10%, transparent)" }}
        >
          <GiftIcon size={20} />
          <p className="min-w-0 flex-1 text-sm font-semibold">
            {board.allClaimed ? "Günün üçü de tamam" : "Üçünü birden bitirdin"}
          </p>
          {board.allClaimed ? (
            <span className="muted shrink-0 text-[11px] font-semibold">+300 XP</span>
          ) : (
            <button
              onClick={() => void claim("all")}
              disabled={busy === "all"}
              className="btn btn-primary shrink-0 px-3 py-1.5 text-xs disabled:opacity-60"
            >
              {busy === "all" ? "…" : "+300 XP al"}
            </button>
          )}
        </div>
      ) : null}

      {flash > 0 ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 py-2 text-center text-sm font-bold"
          style={{ color: "var(--color-mint)" }}
        >
          +{flash} XP kazandın
        </motion.p>
      ) : null}
    </section>
  );
}
