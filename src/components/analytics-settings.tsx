"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SettingRow, Switch } from "@/components/setting-row";
import { analyticsEnabled, setAnalyticsEnabled, setAnalyticsMirror } from "@/lib/track";
import { LEGAL_PATHS } from "@/lib/legal";
import { useT } from "@/lib/i18n/client";
import { apiFetch } from "@/lib/api-fetch";

/**
 * Ürün analitiği anahtarı (Gizlilik Politikası §8). Olaylar birinci taraf ve
 * kimliksiz; yine de kapatma yolu olmalı — meşru menfaate itiraz hakkı.
 * Tercih HESAPTA (hukuk denetimi LEG-9): açılışta sunucudan okunuyor, anahtar
 * `POST /api/profile { analyticsOptOut }` yazıyor ve bütün cihazlarda geçerli.
 * Tarayıcıdaki anahtar yalnız ayna (bkz. lib/track).
 */
export function AnalyticsSettings({ bare = false }: { bare?: boolean } = {}) {
  const t = useT();
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setOn(analyticsEnabled());
    let alive = true;
    void apiFetch("/api/profile?prefs=1", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ analyticsOptOut?: boolean }>) : null))
      .then((p) => {
        if (!alive || !p || typeof p.analyticsOptOut !== "boolean") return;
        setOn(!p.analyticsOptOut);
        setAnalyticsMirror(p.analyticsOptOut ? "server" : null);
      })
      .catch(() => { /* çevrimdışı: aynadaki değer kalır */ })
      .finally(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);
  const body = (
    <SettingRow title={t("settings.send_usage_data")} sub={t("settings.analytics_sub")}>
      <Link href={LEGAL_PATHS.privacy} className="chip h-8 px-2.5 text-caption" prefetch={false}>{t("settings.privacy_policy_short")}</Link>
      <Switch on={on} onChange={(next) => { setOn(next); void setAnalyticsEnabled(next); }} disabled={!ready} label={t("settings.send_usage_data")} />
    </SettingRow>
  );
  return bare ? body : <section className="card">{body}</section>;
}
