"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SettingRow, Switch } from "@/components/setting-row";
import { analyticsEnabled, setAnalyticsEnabled } from "@/lib/track";
import { LEGAL_PATHS } from "@/lib/legal";

/**
 * Ürün analitiği anahtarı (Gizlilik Politikası §8). Olaylar birinci taraf ve
 * kimliksiz; yine de kapatma yolu olmalı — meşru menfaate itiraz hakkı.
 * Tercih cihazda (localStorage); hesaba yazılmaz.
 */
export function AnalyticsSettings({ bare = false }: { bare?: boolean } = {}) {
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => { setOn(analyticsEnabled()); setReady(true); }, []);
  const body = (
    <SettingRow title="Kullanım verisi gönder" sub="Hangi özelliklerin kullanıldığı; üçüncü tarafa gitmez">
      <Link href={LEGAL_PATHS.privacy} className="chip h-8 px-2.5 text-xs" prefetch={false}>Politika</Link>
      <Switch on={on} onChange={(next) => { setOn(next); setAnalyticsEnabled(next); }} disabled={!ready} label="Kullanım verisi gönder" />
    </SettingRow>
  );
  return bare ? body : <section className="card">{body}</section>;
}
