"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { CrownIcon, CheckIcon } from "@/components/icons";

type Plan = { key: string; label: string; monthly: string; note: string; badge: string | null };

/**
 * Premium paywall (dönüşüm planı §4) — mobil app'teki paywall ile aynı tasarım
 * dili. Açılışta `paywall_view` (kind = kaynak) yazılır, plan seçilince/CTA'ya
 * basılınca `purchase_start`. Gerçek satın alma yolu (web ödeme / mağaza) henüz
 * bağlı değil (bkz. lib/premium `isPremium` = false); ekran huniyi kurar.
 */
export function PremiumPaywall({
  plans,
  benefits,
  source = "other",
  alreadyPremium = false,
}: {
  plans: Plan[];
  benefits: string[];
  source?: string;
  alreadyPremium?: boolean;
}) {
  const [plan, setPlan] = useState(plans[0]?.key ?? "yearly");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!alreadyPremium) track("paywall_view", 0, source);
  }, [source, alreadyPremium]);

  if (alreadyPremium) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-white" style={{ background: "var(--color-brand)" }}>
          <CrownIcon size={40} />
        </div>
        <h1 className="text-2xl font-extrabold">Premium'dasın 🎉</h1>
        <p className="mt-2 muted">Tüm özellikler açık — sınırsız öğren.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-10 pt-6">
      {/* hero */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl text-white" style={{ background: "var(--color-brand)", boxShadow: "0 12px 24px -10px var(--color-brand)" }}>
          <CrownIcon size={42} />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold">Lernomi Premium</h1>
        <p className="mt-1 muted">Sınırsız öğren, sınavına tam hazırlan</p>
      </div>

      {/* avantajlar */}
      <div className="mt-7 rounded-3xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-3 py-1.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "color-mix(in srgb, var(--color-mint-500) 18%, transparent)", color: "var(--color-mint-600)" }}>
              <CheckIcon size={16} />
            </span>
            <span className="text-[15px]">{b}</span>
          </div>
        ))}
      </div>

      {/* planlar */}
      <div className="mt-6 flex flex-col gap-3">
        {plans.map((p) => {
          const active = plan === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setPlan(p.key)}
              className="flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors"
              style={{ borderColor: active ? "var(--color-brand)" : "var(--border)", background: active ? "color-mix(in srgb, var(--color-brand) 10%, transparent)" : "var(--surface)" }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2" style={{ borderColor: active ? "var(--color-brand)" : "var(--border)" }}>
                {active && <span className="h-3 w-3 rounded-full" style={{ background: "var(--color-brand)" }} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-bold">{p.label}</span>
                  {p.badge && (
                    <span className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: "var(--color-mint-500)" }}>{p.badge}</span>
                  )}
                </span>
                <span className="block text-xs muted">{p.note}</span>
              </span>
              <span className="font-bold" style={{ color: active ? "var(--color-brand)" : "var(--text)" }}>{p.monthly}</span>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          track("purchase_start", 0, plan);
          setPending(true);
        }}
        className="brand-gradient mt-6 block w-full rounded-2xl py-4 text-center text-base font-extrabold text-white disabled:opacity-70"
      >
        {pending ? "Ödeme yakında bağlanacak" : "Premium'a geç"}
      </button>
      <p className="mt-2 text-center text-xs muted">İstediğin zaman iptal edebilirsin · Otomatik yenilenir</p>
    </div>
  );
}
