"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCachedJson } from "@/lib/use-cached";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ChevronIcon, ChevronRightIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { CoachBubble } from "@/components/coach-bubble";
import { planMoment } from "@/lib/coach-lines";
import type { Plan, PlanItem } from "@/lib/plan";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * "Bugünkü planın" — artık kart değil, "Bugün" kartının içinde tek satır.
 *
 * Ayrı bir kart olarak ekranın en değerli yerinde, birincil kartın hemen
 * altında duruyordu ve orayı hak etmiyordu: ölçüm dört gün boyunca 307
 * görüntülemeye karşı 4 tıklama gösterdi (binde on üç). Kartın kendisi değil
 * YERİ yanlıştı — plan, "başla"nın rakibi değil gerekçesi.
 *
 * Şimdi kapalıyken tek satır: sıradaki öğenin adı ve planın süresi. Liste
 * duruyor, dokununca açılıyor — yani kullanan kaybetmiyor, kullanmayan da
 * dört satır ödemiyor.
 *
 * Durumu kendisi çekiyor (`/api/plan`). Sunucuya ulaşılamazsa hiç görünmüyor:
 * planın yokluğu turu engellemez.
 */
export function PlanCard({ onStartSession, name }: { onStartSession: () => void; name?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  /*
    Önce önbellek, sonra tazeleme (bkz. lib/use-cached). Plan her açılışta
    sıfırdan isteniyordu ve her açılışta geç geliyordu; oysa gün içinde nadiren
    değişiyor ve değiştiğinde bunu haber veren bir olay zaten var.
  */
  const { data: plan } = useCachedJson<Plan>(
    `plan:${localDay()}`,
    `/api/plan?day=${localDay()}`,
    (body) => {
      const p = body as Partial<Plan>;
      return Array.isArray(p?.items) ? (p as Plan) : null;
    },
  );

  if (plan === null) return null;

  function go(item: PlanItem, index: number) {
    track("plan_start", index, item.id);
    if (item.action === "session") onStartSession();
    else if (item.href) router.push(item.href);
  }

  // Yüklenirken satırın YERİ duruyor: veri gelince altındaki düğme zıplamasın.
  if (!plan) {
    return <div className="h-11 animate-pulse rounded-xl surface-2" aria-busy />;
  }

  const next = plan.items.find((i) => !i.done);
  const doneCount = plan.items.filter((i) => i.done).length;
  // Haftanın başında (Pzt–Sal) geçen haftanın tek satırlık özeti (WP-52).
  const dow = new Date().getDay();
  const showSummary = plan.summary && (dow === 1 || dow === 2);

  return (
    <div className="rounded-xl surface-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left"
      >
        <span className="muted shrink-0 text-[11px] font-bold uppercase tracking-wide">
          {plan.complete ? "Plan" : "Sıradaki"}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">
          {plan.complete
            ? "Bugünün planı tamam"
            : (next?.title ?? "").replace(/^(Ders tekrarı|Ders|Zayıf nokta): /, "")}
        </span>
        <span className="muted shrink-0 text-xs font-semibold tabular-nums">
          {plan.complete ? `${plan.items.length}/${plan.items.length}` : `${doneCount}/${plan.items.length} · ~${plan.minutes} dk`}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="muted shrink-0"
        >
          <ChevronIcon size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t px-2 pb-2 pt-1.5" style={{ borderColor: "var(--border)" }}>
              {/*
                Erdi koç (WP-66): günün saatine göre selam; haftanın başında
                özet varsa selam yerine "bak ne oldu" dikizlemesi. Kapalıyken
                çizilmiyor — "Bugün" kartının başında zaten bir Erdi var ve
                ikisi aynı anda görünürse tek maskot kuralı bozulur.
              */}
              {showSummary ? (
                <CoachBubble moment="weekly" mood="peek" size={44} className="mb-1.5 px-1" />
              ) : (
                <CoachBubble moment={planMoment()} mood="wave" vars={{ name }} size={44} className="mb-1.5 px-1" />
              )}
              <ol className="space-y-1">
                {plan.items.map((item, i) => {
                  const inner = (
                    <>
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                        style={{
                          background: item.done ? "var(--color-mint)" : "color-mix(in srgb, var(--color-brand) 14%, transparent)",
                          color: item.done ? "white" : "var(--color-brand)",
                        }}
                        aria-hidden
                      >
                        {item.done ? <CheckIcon size={13} /> : i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-semibold leading-tight ${item.done ? "line-through opacity-60" : ""}`}>
                          {item.title}
                        </span>
                        <span className="muted block text-xs">
                          {item.detail} · {item.minutes} dk
                        </span>
                      </span>
                      {!item.done ? <ChevronRightIcon size={14} className="muted shrink-0" /> : null}
                    </>
                  );
                  const cls = "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left";
                  return (
                    <li key={item.id}>
                      {item.done ? (
                        <div className={cls}>{inner}</div>
                      ) : item.action === "session" ? (
                        <button type="button" onClick={() => go(item, i)} className={cls}>
                          {inner}
                        </button>
                      ) : (
                        <Link href={item.href ?? "#"} onClick={() => track("plan_start", i, item.id)} className={cls}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
              {showSummary ? (
                /* Gelişim özeti profildeki yetkinlik/gelişim panosuna götürür. */
                <Link href="/profile" className="muted mt-1.5 block rounded-lg px-3 py-2 text-xs">
                  {plan.summary}
                </Link>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
