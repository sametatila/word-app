"use client";

import { useEffect, useState } from "react";

/**
 * Ekran ölçüleri paneli — `?diag=1` ile açılıyor.
 *
 * Alt gezinmenin altındaki boşluk iki turdur yanlış teşhis edildi ve sebebi
 * şu: hata yalnızca elimde OLMAYAN bir cihazda görünüyor ve orada ölçüm
 * yapamıyorum. Tahmin etmek yerine cihazın kendisi ölçsün — tek bir ekran
 * görüntüsü, hangi sayının beklenenden saptığını kesin olarak söylüyor.
 *
 * Sorgu parametresiyle açılıyor, yani normal kullanımda hiç kurulmuyor ve
 * hiçbir maliyeti yok.
 */
type Row = [string, string];

export function ScreenDiag() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("diag")) return;

    /** env() değerleri JS'ten okunamıyor; görünmez sondalarla ölçülüyor. */
    const measure = (css: string) => {
      const el = document.createElement("div");
      el.style.cssText = `position:fixed;left:0;top:0;width:0;visibility:hidden;pointer-events:none;height:${css}`;
      document.body.appendChild(el);
      const h = el.getBoundingClientRect().height;
      el.remove();
      return Math.round(h * 10) / 10;
    };

    const update = () => {
      const nav = document.querySelector("nav.safe-bottom");
      const navBox = nav?.getBoundingClientRect();
      const root = getComputedStyle(document.documentElement);
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as { standalone?: boolean }).standalone === true;

      setRows([
        ["innerHeight", String(window.innerHeight)],
        ["visualViewport", String(Math.round(window.visualViewport?.height ?? 0))],
        ["screen h×w", `${window.screen.height}×${window.screen.width}`],
        ["100dvh / 100vh", `${measure("100dvh")} / ${measure("100vh")}`],
        ["env alt / üst", `${measure("env(safe-area-inset-bottom)")} / ${measure("env(safe-area-inset-top)")}`],
        ["--app-h", root.getPropertyValue("--app-h").trim() || "(yok)"],
        ["--safe-b", root.getPropertyValue("--safe-b").trim() || "(yok)"],
        [
          "nav üst→alt",
          navBox ? `${Math.round(navBox.top)} → ${Math.round(navBox.bottom)}` : "(yok)",
        ],
        ["nav yükseklik", navBox ? String(Math.round(navBox.height)) : "(yok)"],
        ["nav alt dolgu", nav ? getComputedStyle(nav).paddingBottom : "(yok)"],
        ["nav altı açıklık", navBox ? String(Math.round(window.innerHeight - navBox.bottom)) : "-"],
        ["standalone / dpr", `${standalone ? "evet" : "hayır"} / ${window.devicePixelRatio}`],
      ]);
    };

    // İlk ölçüm kabuğun kendi ölçümünden SONRA olmalı, yoksa --app-h henüz boş.
    const t = setTimeout(update, 300);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!rows) return null;

  return (
    <div
      className="fixed left-2 top-2 z-50 rounded-xl px-3 py-2 font-mono text-[11px] leading-tight"
      style={{ background: "rgba(20,16,14,0.92)", color: "#f4eee4" }}
    >
      {rows.map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <span style={{ opacity: 0.6 }}>{k}</span>
          <span className="ml-auto font-bold">{v}</span>
        </div>
      ))}
    </div>
  );
}
