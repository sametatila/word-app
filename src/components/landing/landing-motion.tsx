"use client";

import { useEffect } from "react";

/**
 * Tanıtım sayfasının tek hareket fikri: kaydırdıkça çizilen iz ve yapışkan telefon.
 *
 * Sayfa sunucuda eksiksiz çiziliyor; bu bileşen yalnız üstüne hareket ekliyor ve
 * kendisi hiçbir şey çizmiyor. JavaScript yoksa iz ve telefon geçişi yok ama
 * içerik eksiksiz (mobildeki satır içi telefonlar zaten sunucu çizimi); hareket
 * azaltılmışsa iz baştan tam çizili ve düğümler yanık.
 *
 *  - İZ: her bölümün düğümünden (`data-node`) geçen tek bir SVG yolu. Okuma
 *    çizgisi (ekranın %62'si) yolun neresindeyse oraya kadar turuncu çiziliyor;
 *    çizginin geçtiği düğüm yanıyor (`litClass`).
 *  - TELEFON (≥960 px): her bölüm `data-show` ile bir ekran istiyor; ekranın
 *    ortasını geçen son bölümün ekranı öne geliyor, öncekiler sola kayıyor.
 *
 * Sınıf adları CSS modülünden geliyor, o yüzden prop olarak veriliyor.
 */
export function LandingMotion({
  scopeId,
  classes,
}: {
  scopeId: string;
  classes: { lit: string; on: string; past: string; base: string; walk: string; dock: string; cap: string };
}) {
  useEffect(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) return;
    const svg = scope.querySelector<SVGSVGElement>("svg[data-trail]");
    const base = svg?.querySelector<SVGPathElement>(`.${classes.base}`);
    const walk = svg?.querySelector<SVGPathElement>(`.${classes.walk}`);
    if (!svg || !base || !walk) return;
    // SVG yol ölçümü olmayan tarayıcı/bot (2026-10-08, hata 60ddc0ca): süs animasyonu sessizce atlanır.
    if (typeof walk.getTotalLength !== "function" || typeof walk.getPointAtLength !== "function") return;
    const legs = [...scope.querySelectorAll<HTMLElement>("[data-leg]")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let total = 0;
    let samples: [number, number][] = [];
    let nodeLens: { leg: HTMLElement; len: number }[] = [];

    /* Yol koordinatı (ekranda sayı olarak görünmüyor): onda bire yuvarla. */
    const r = (v: number) => String(Math.round(v * 10) / 10);
    const center = (el: Element, r0: DOMRect) => {
      const b = el.getBoundingClientRect();
      return { x: b.left + b.width / 2 - r0.left, y: b.top + b.height / 2 - r0.top };
    };

    function build() {
      const r0 = scope!.getBoundingClientRect();
      const w = r0.width;
      const h = scope!.scrollHeight;
      svg!.setAttribute("width", String(w));
      svg!.setAttribute("height", String(h));
      svg!.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg!.style.height = `${h}px`;

      // Dayanak noktaları: her bölümün düğümü, sonra içeriğinin bittiği yerde bir dönüş noktası.
      const pts: { x: number; y: number; leg?: HTMLElement }[] = [];
      legs.forEach((leg, i) => {
        const node = leg.querySelector("[data-node]");
        if (!node || (node as HTMLElement).offsetParent === null) return;
        const c = center(node, r0);
        pts.push({ ...c, leg });
        if (i < legs.length - 1) {
          let last = leg.lastElementChild as HTMLElement | null;
          while (last && last.offsetParent === null) last = last.previousElementSibling as HTMLElement | null;
          if (last) {
            const lb = last.getBoundingClientRect().bottom - r0.top + 28;
            if (lb > c.y + 24) pts.push({ x: c.x, y: lb });
          }
        }
      });
      if (pts.length < 2) return;

      let d = `M${r(pts[0].x)} ${r(pts[0].y)}`;
      const prefixes = [d];
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        if (Math.abs(a.x - b.x) < 1) d += ` L${r(b.x)} ${r(b.y)}`;
        else {
          const k = (b.y - a.y) * 0.5;
          d += ` C${r(a.x)} ${r(a.y + k)} ${r(b.x)} ${r(b.y - k)} ${r(b.x)} ${r(b.y)}`;
        }
        prefixes.push(d);
      }
      base!.setAttribute("d", d);
      walk!.setAttribute("d", d);
      total = walk!.getTotalLength();

      // Yol boyunca her düğüme ulaşılan uzunluk.
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg!.appendChild(probe);
      nodeLens = [];
      pts.forEach((p, i) => {
        if (!p.leg) return;
        probe.setAttribute("d", prefixes[i]);
        nodeLens.push({ leg: p.leg, len: i === 0 ? 0 : probe.getTotalLength() });
      });
      probe.remove();

      samples = [];
      for (let l = 0; l <= total; l += 6) samples.push([walk!.getPointAtLength(l).y, l]);
      samples.push([walk!.getPointAtLength(total).y, total]);
      walk!.style.strokeDasharray = `${total} ${total}`;
      update();
    }

    function lenAtY(y: number) {
      if (!samples.length) return 0;
      if (y <= samples[0][0]) return 0;
      let lo = 0;
      let hi = samples.length - 1;
      if (y >= samples[hi][0]) return total;
      while (hi - lo > 1) {
        const m = (lo + hi) >> 1;
        if (samples[m][0] < y) lo = m;
        else hi = m;
      }
      const [y0, l0] = samples[lo];
      const [y1, l1] = samples[hi];
      return l0 + (l1 - l0) * ((y - y0) / Math.max(1e-6, y1 - y0));
    }

    function update() {
      const len = reduce.matches ? total : lenAtY(innerHeight * 0.62 - scope!.getBoundingClientRect().top);
      walk!.style.strokeDashoffset = String(Math.max(0, total - len));
      for (const { leg, len: nl } of nodeLens) leg.classList.toggle(classes.lit, len >= nl - 1);
    }

    // Yapışkan telefon: okuma çizgisini geçen son bölüm kazanır.
    const dock = document.querySelector<HTMLElement>(`.${classes.dock}`);
    const frames = [...document.querySelectorAll<HTMLElement>("[data-screen]")];
    const cap = document.querySelector<HTMLElement>(`.${classes.cap}`);
    const triggers = [...scope.querySelectorAll<HTMLElement>("[data-show]")];
    let current = frames[0]?.dataset.screen ?? "";
    function swap() {
      if (!dock || !frames.length || !triggers.length || getComputedStyle(dock).display === "none") return;
      const line = innerHeight * 0.5;
      let name = triggers[0].dataset.show ?? "";
      for (const t of triggers) if (t.getBoundingClientRect().top < line) name = t.dataset.show ?? name;
      if (name === current) return;
      current = name;
      const idx = frames.findIndex((f) => f.dataset.screen === name);
      if (idx < 0) return;
      frames.forEach((f, i) => {
        f.classList.toggle(classes.on, i === idx);
        f.classList.toggle(classes.past, i < idx);
        f.setAttribute("aria-hidden", i === idx ? "false" : "true");
      });
      if (cap) cap.textContent = frames[idx].dataset.cap ?? "";
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
        swap();
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    reduce.addEventListener?.("change", update);
    const ro = new ResizeObserver(() => build());
    ro.observe(scope);
    void document.fonts?.ready.then(build);
    build();
    swap();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      reduce.removeEventListener?.("change", update);
      ro.disconnect();
    };
  }, [scopeId, classes]);

  return null;
}
