"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { BTN } from "../../../admin/_ui/ui";

/**
 * YATAY ÖNİZLEME (YouTube uzun video): videoyu üretmeden, sunucudaki üretimle AYNI motorla
 * (scripts/social/yatay/motor.js, /api/studio/engine?f=yatay) tarayıcıda oynatır. Metin değiştikçe sahne yeniden
 * kurulur. Sesler: bölümün her satırının kaydı /api/studio/clip?k=<ses|dil|metin>'den; kaydı olmayan satır sessiz,
 * süresi metinden tahmin (kayıt gelince çizelge kendiliğinden kayar). Ses izi önceden karışmaz (12 dakikalık iz
 * tarayıcıyı boğardı): oynatırken her kayıt zamanında başlatılır, efektler motorun formülüyle.
 * Yerleşim denetimi (Y.audit, sunucuyla aynı kural) değişiklikten ~1,5 sn sonra görünmez, ölçeksiz bir sahnede koşar.
 */

export type LongPlan = { duration: number; chapters: { t: number; title: string }[]; voice: { t: number; d: number; key: string; v: string; l: string; text: string }[]; sfx: { t: number; kind: string }[] };
type LongInst = { plan: LongPlan; render: (t: number) => void; showCover: (on: boolean) => void; cv: HTMLElement };
type LongEngine = {
  mount: (host: HTMLElement, id: string, data: unknown, o?: { scale?: boolean }) => LongInst;
  spoken: (id: string, data: unknown) => string[];
  audit: (I: LongInst) => string[];
  texts: (I: LongInst) => { s: string; t: number }[];
  chapterList: (p: LongPlan) => string[];
  envFrom: (b: AudioBuffer) => Float32Array;
  ENV: Record<string, Float32Array>;
  SFX: Record<string, { dur: number; f: (t: number) => number }>;
};
declare global {
  interface Window {
    Y?: LongEngine;
    STUDIO_LONG_READY?: boolean;
  }
}

let engineLoad: Promise<LongEngine> | null = null;
function loadEngine(): Promise<LongEngine> {
  engineLoad ||= new Promise((resolve, reject) => {
    if (window.STUDIO_LONG_READY && window.Y) return resolve(window.Y);
    const s = document.createElement("script");
    s.src = "/api/studio/engine?f=yatay";
    s.onload = () => (window.Y && window.STUDIO_LONG_READY ? resolve(window.Y) : reject(new Error("motor yüklenemedi")));
    s.onerror = () => reject(new Error("motor yüklenemedi"));
    document.head.appendChild(s);
  });
  return engineLoad;
}

// ---- kayıtlar: anahtar → AudioBuffer (bir kez çözülür, sayfa boyunca) ----
const bufs = new Map<string, AudioBuffer | "missing">();
let audioCtx: AudioContext | null = null;
const ctx = () => (audioCtx ||= new AudioContext({ sampleRate: 48000 }));
/** Eksik kayıtları getir (6'şar paralel); her biri gelince onTick. Dönüş: kaydı olmayanlar. */
async function ensureClips(keys: string[], onTick: (done: number, total: number) => void): Promise<string[]> {
  const todo = keys.filter((k) => !bufs.has(k));
  let done = keys.length - todo.length;
  onTick(done, keys.length);
  let i = 0;
  const worker = async () => {
    while (i < todo.length) {
      const k = todo[i++];
      try {
        const r = await apiFetch(`/api/studio/clip?k=${encodeURIComponent(k)}`);
        if (!r.ok) throw new Error(String(r.status));
        bufs.set(k, await ctx().decodeAudioData(await r.arrayBuffer()));
      } catch {
        bufs.set(k, "missing");
      }
      onTick(++done, keys.length);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  const Y = window.Y as LongEngine;
  window.CLIPS ||= {};
  const missing: string[] = [];
  for (const k of keys) {
    const b = bufs.get(k);
    if (b && b !== "missing") {
      window.CLIPS[k] = { dur: Math.round(b.duration * 1000) / 1000, b64: "" };
      Y.ENV[k] ||= Y.envFrom(b);
    } else {
      delete window.CLIPS[k];
      missing.push(k);
    }
  }
  return missing;
}
const sfxBufs = new Map<string, AudioBuffer>();
function sfxBuf(kind: string): AudioBuffer | null {
  const fx = window.Y?.SFX[kind];
  if (!fx) return null;
  if (!sfxBufs.has(kind)) {
    const c = ctx();
    const n = Math.round(fx.dur * c.sampleRate);
    const b = c.createBuffer(1, n, c.sampleRate);
    const ch = b.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = fx.f(i / c.sampleRate);
    sfxBufs.set(kind, b);
  }
  return sfxBufs.get(kind) as AudioBuffer;
}
/** Tek satırın kaydını çal (senaryodaki "dinle"); aynı anda tek ses. Kayıt yoksa false. */
let solo: AudioBufferSourceNode | null = null;
export async function playKey(key: string): Promise<boolean> {
  try {
    solo?.stop();
  } catch {
    /* durmuş */
  }
  if (!bufs.has(key)) {
    try {
      const r = await apiFetch(`/api/studio/clip?k=${encodeURIComponent(key)}`);
      if (!r.ok) throw new Error(String(r.status));
      bufs.set(key, await ctx().decodeAudioData(await r.arrayBuffer()));
    } catch {
      bufs.set(key, "missing");
    }
  }
  const b = bufs.get(key);
  if (!b || b === "missing") return false;
  await ctx().resume();
  const s = ctx().createBufferSource();
  s.buffer = b;
  s.connect(ctx().destination);
  s.start();
  solo = s;
  return true;
}

export type LongState = {
  ready: boolean;
  error: string | null;
  spoken: string[];
  missing: string[];
  plan: LongPlan | null;
  chapters: string[];
  texts: { s: string; t: number }[] | null;
  audit: { running: boolean; issues: string[] | null; forKey: string | null };
};
const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

export function LongPreview({ template, data, onState, focus }: { template: string; data: Record<string, unknown>; onState: (s: LongState) => void; focus?: { t: number; n: number } }) {
  const frame = useRef<HTMLDivElement>(null);
  const inst = useRef<LongInst | null>(null);
  // ilk kare 0. saniye değil: sahne girişleri o anda henüz başlamamış olur, önizleme 3. saniyeden açılır
  const [t, setT] = useState(3);
  const tRef = useRef(3);
  const [playing, setPlaying] = useState(false);
  const [dur, setDur] = useState(0);
  const durRef = useRef(0);
  const [chapters, setChapters] = useState<{ t: number; title: string }[]>([]);
  const [cover, setCover] = useState(false);
  const [loading, setLoading] = useState<string | null>("Önizleme hazırlanıyor…");
  const srcs = useRef<AudioBufferSourceNode[]>([]);
  const raf = useRef(0);
  const clock = useRef({ at: 0, from: 0 });
  const token = useRef(0);
  const state = useRef<LongState>({ ready: false, error: null, spoken: [], missing: [], plan: null, chapters: [], texts: null, audit: { running: false, issues: null, forKey: null } });
  const push = useCallback((p: Partial<LongState>) => {
    state.current = { ...state.current, ...p };
    onState(state.current);
  }, [onState]);
  const dataKey = JSON.stringify(data);

  const show = (at: number) => {
    tRef.current = at;
    setT(at);
    inst.current?.render(at);
  };
  const halt = useCallback(() => {
    token.current++;
    cancelAnimationFrame(raf.current);
    for (const s of srcs.current) {
      try {
        s.stop();
      } catch {
        /* durmuş */
      }
    }
    srcs.current = [];
  }, []);
  const pause = useCallback(() => {
    halt();
    setPlaying(false);
  }, [halt]);
  const play = useCallback(async (from: number) => {
    const I = inst.current;
    if (!I) return;
    halt();
    const my = token.current;
    setPlaying(true);
    const c = ctx();
    await c.resume();
    if (my !== token.current) return;
    const base = c.currentTime + 0.08;
    for (const v of I.plan.voice) {
      const b = bufs.get(v.key);
      if (!b || b === "missing" || v.t + b.duration <= from) continue;
      const s = c.createBufferSource();
      s.buffer = b;
      s.connect(c.destination);
      s.start(base + Math.max(0, v.t - from), Math.max(0, from - v.t));
      srcs.current.push(s);
    }
    for (const x of I.plan.sfx) {
      if (x.t < from) continue;
      const b = sfxBuf(x.kind);
      if (!b) continue;
      const s = c.createBufferSource();
      s.buffer = b;
      s.connect(c.destination);
      s.start(base + (x.t - from));
      srcs.current.push(s);
    }
    clock.current = { at: base, from };
    const tick = () => {
      if (my !== token.current) return;
      const now = clock.current.from + Math.max(0, c.currentTime - clock.current.at);
      if (now >= durRef.current) {
        show(durRef.current);
        pause();
        return;
      }
      show(now);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [halt, pause]);

  // sahneyi kur (metin değişince, ~500 ms sonra); ilk kurulumda kayıtlar iner
  useEffect(() => {
    let dead = false;
    const timer = setTimeout(async () => {
      try {
        const Y = await loadEngine();
        if (dead) return;
        const spoken = Y.spoken(template, data);
        const first = !inst.current;
        const missing = await ensureClips(spoken, (d, n) => first && !dead && setLoading(`Sesler yükleniyor ${d}/${n}`));
        if (dead || !frame.current) return;
        const was = tRef.current;
        pause();
        const host = document.createElement("div");
        host.style.cssText = "position:absolute;inset:0";
        frame.current.replaceChildren(host);
        const I = Y.mount(host, template, data);
        inst.current = I;
        durRef.current = I.plan.duration;
        setDur(I.plan.duration);
        setChapters(I.plan.chapters);
        I.showCover(cover);
        show(Math.min(was, I.plan.duration));
        setLoading(null);
        push({ ready: true, error: null, spoken, missing, plan: I.plan, chapters: Y.chapterList(I.plan) });
      } catch (err) {
        if (!dead) {
          setLoading(null);
          push({ ready: false, error: err instanceof Error ? err.message : String(err) });
        }
      }
    }, 500);
    return () => {
      dead = true;
      clearTimeout(timer);
    };
    // cover burada bilerek yok: sahneyi yeniden kurmaz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, dataKey]);

  // yerleşim denetimi + ekrandaki yazılar: değişiklikten ~1,5 sn sonra, ölçeksiz görünmez sahnede
  useEffect(() => {
    let dead = false;
    push({ audit: { running: true, issues: null, forKey: dataKey } });
    const timer = setTimeout(async () => {
      try {
        const Y = await loadEngine();
        await ensureClips(Y.spoken(template, data), () => undefined);
        if (dead) return;
        const host = document.createElement("div");
        host.style.cssText = "position:fixed;left:-30000px;top:0;width:1920px;height:1080px;pointer-events:none";
        document.body.appendChild(host);
        try {
          const I = Y.mount(host, template, data, { scale: false });
          const issues = Y.audit(I);
          const texts = Y.texts(I);
          if (!dead) push({ audit: { running: false, issues, forKey: dataKey }, texts });
        } finally {
          host.remove();
        }
      } catch (err) {
        if (!dead) push({ audit: { running: false, issues: [`KURULAMADI ${err instanceof Error ? err.message : String(err)}`], forKey: dataKey } });
      }
    }, 1500);
    return () => {
      dead = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, dataKey]);

  useEffect(() => () => halt(), [halt]);

  // alana tıklanınca o ana git (duraklatır)
  useEffect(() => {
    if (!focus || !inst.current) return;
    pause();
    setCover(false);
    inst.current.showCover(false);
    show(Math.max(0, Math.min(focus.t, durRef.current)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.n]);

  // boşluk: oynat/durdur, ← →: 5 sn (yazı alanında değilken)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable)) return;
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        seek(tRef.current + (e.key === "ArrowRight" ? 5 : -5));
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const seek = (x: number) => {
    const to = Math.max(0, Math.min(durRef.current, x));
    const was = playing;
    if (was) halt();
    show(to);
    if (was) void play(to);
  };
  const toggle = () => (playing ? pause() : void play(tRef.current >= durRef.current - 0.05 ? 0 : tRef.current));
  const ci = chapters.reduce((a, c, i) => (t >= c.t ? i : a), -1);
  const setCoverOn = (on: boolean) => {
    setCover(on);
    if (on) pause();
    inst.current?.showCover(on);
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full overflow-hidden rounded-tile border" style={{ aspectRatio: "16 / 9", borderColor: "var(--border)", background: "#000" }}>
        <div ref={frame} className="absolute inset-0" />
        <button type="button" aria-label={playing ? "Duraklat" : "Oynat"} className="absolute inset-0 cursor-pointer" onClick={toggle} />
        {loading ? <div className="pointer-events-none absolute inset-0 grid place-items-center text-caption text-white/80">{loading}</div> : null}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={BTN.small} onClick={toggle} aria-label={playing ? "Duraklat" : "Oynat"}>{playing ? "❚❚" : "▶"}</button>
        <div className="relative min-w-0 flex-1">
          <input type="range" aria-label="Zaman" className="w-full" min={0} max={Math.max(1, dur)} step={0.1} value={t} onChange={(e) => seek(Number(e.target.value))} />
          <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-1.5">
            {chapters.map((c) => <span key={c.t} className="absolute top-0 h-1.5 w-px" style={{ left: `${(c.t / Math.max(1, dur)) * 100}%`, background: "var(--text-muted)" }} />)}
          </div>
        </div>
        <span className="muted shrink-0 font-mono text-caption tabular-nums">{fmt(t)} / {fmt(dur)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={BTN.small} disabled={ci <= 0} onClick={() => seek(chapters[ci - 1]?.t ?? 0)} aria-label="Önceki bölüm">‹</button>
        <select aria-label="Bölüm" className="h-8 min-w-0 flex-1 rounded-tile border px-2 text-caption" style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }} value={ci} onChange={(e) => seek((chapters[Number(e.target.value)]?.t ?? 0) + 0.01)}>
          {chapters.map((c, i) => <option key={c.t} value={i}>{fmt(c.t)} · {c.title}</option>)}
        </select>
        <button type="button" className={BTN.small} disabled={ci >= chapters.length - 1} onClick={() => seek((chapters[ci + 1]?.t ?? 0) + 0.01)} aria-label="Sonraki bölüm">›</button>
        <button type="button" className={BTN.small} aria-pressed={cover} onClick={() => setCoverOn(!cover)}>{cover ? "Kapak: açık" : "Kapak"}</button>
      </div>
      <p className="faint text-micro">Boşluk: oynat/durdur · ← →: 5 sn. Kesikli çerçeveli altyazı etiketi: o satırın kaydı henüz yok (sessiz, süresi tahmin).</p>
    </div>
  );
}
