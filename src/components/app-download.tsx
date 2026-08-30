"use client";

import { useEffect, useState } from "react";

/**
 * Android APK indirme düğmesi — GitHub release'inden. Bağlantı sürümden
 * bağımsız kalıcı (releases/latest/download): her zaman en son sürümü verir.
 * Sürüm numarası GitHub API'sinden okunur (yalnız etikette gösterilir); okuma
 * başarısızsa düğme yine çalışır (bağlantı statik).
 */
const REPO = "sametatila/word-app";
const APK_URL = `https://github.com/${REPO}/releases/latest/download/wortspiel.apk`;
const LATEST_API = `https://api.github.com/repos/${REPO}/releases/latest`;

export function AppDownload() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(LATEST_API, { headers: { accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { tag_name?: string } | null) => {
        if (alive && j?.tag_name) setVersion(j.tag_name.replace(/^v/, ""));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <a
      href={APK_URL}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-bold text-white sm:w-auto"
      style={{ background: "var(--color-brand)" }}
    >
      Android uygulamasını indir{version ? ` · v${version}` : ""}
    </a>
  );
}
