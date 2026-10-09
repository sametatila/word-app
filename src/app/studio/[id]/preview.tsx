"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { BTN } from "../../admin/_ui/ui";

/**
 * CANLI ÖNİZLEME: videoyu üretmeden, sunucudaki üretimle AYNI motorla (scripts/social/engine.js, /api/studio/engine)
 * tarayıcıda oynatır. Metin değiştikçe sahne yeniden kurulur; seslendirilen metinlerin Defne klipleri
 * /api/studio/clip'ten gelir, kaydı olmayan metin için tahmini süreli sessizlik çalar (ve "ses bekliyor" denir).
 * Yerleşim denetimi (E.audit, sunucuyla aynı kural) her değişiklikten ~1,5 sn sonra görünmez bir sahnede koşar.
 */

type Clip = { dur: number; b64: string };
type Plan = { duration: number; poster: number; caption: string; music?: { gain: number }; voice?: { t: number; text: string }[] };
type Instance = { plan: Plan; render: (t: number) => void; ui: HTMLElement; uiUsed: Set<string> };
type Engine = {
  videos: Record<string, { title: string; ui: Record<string, string> }>;
  spoken: (template: string, data: unknown) => string[];
  mount: (host: HTMLElement, template: string, data: unknown) => Instance;
  audit: (host: HTMLElement, I: Instance) => string[];
  texts: (host: HTMLElement, I: Instance) => { s: string; t: number }[];
  soundtrack: (plan: Plan) => Promise<AudioBuffer>;
  W: number;
};
declare global {
  interface Window {
    E?: Engine;
    CLIPS?: Record<string, Clip>;
    STUDIO_ENGINE_READY?: boolean;
  }
}

let engineLoad: Promise<Engine> | null = null;
export function loadEngine(): Promise<Engine> {
  engineLoad ||= new Promise((resolve, reject) => {
    if (window.STUDIO_ENGINE_READY && window.E) return resolve(window.E);
    const s = document.createElement("script");
    s.src = "/api/studio/engine";
    s.onload = () => (window.E && window.STUDIO_ENGINE_READY ? resolve(window.E) : reject(new Error("motor yüklenemedi")));
    s.onerror = () => reject(new Error("motor yüklenemedi"));
    document.head.appendChild(s);
  });
  return engineLoad;
}

// ---- klipler ----
const clipCache = new Map<string, Clip | "missing">();
let decoder: AudioContext | null = null;
function b64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
  return btoa(s);
}
/** Kaydı olmayan metin için sessizlik (WAV), süre metin uzunluğundan tahmin. */
function silence(text: string): Clip {
  const dur = Math.min(8, 0.6 + text.length * 0.065);
  const rate = 22050;
  const n = Math.round(dur * rate);
  const v = new DataView(new ArrayBuffer(44 + n * 2));
  const str = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + n * 2, true);
  str(8, "WAVEfmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, "data");
  v.setUint32(40, n * 2, true);
  return { dur: Math.round(dur * 1000) / 1000, b64: b64(v.buffer) };
}
async function ensureClips(texts: string[]): Promise<{ clips: Record<string, Clip>; missing: string[] }> {
  decoder ||= new AudioContext({ sampleRate: 48000 });
  await Promise.all(
    texts
      .filter((t) => !clipCache.has(t))
      .map(async (t) => {
        try {
          const r = await apiFetch(`/api/studio/clip?t=${encodeURIComponent(t)}`);
          if (!r.ok) throw new Error(String(r.status));
          const buf = await r.arrayBuffer();
          const audio = await (decoder as AudioContext).decodeAudioData(buf.slice(0));
          clipCache.set(t, { dur: Math.round(audio.duration * 1000) / 1000, b64: b64(buf) });
        } catch {
          clipCache.set(t, "missing");
        }
      }),
  );
  const clips: Record<string, Clip> = {};
  const missing: string[] = [];
  for (const t of texts) {
    const c = clipCache.get(t);
    if (c && c !== "missing") clips[t] = c;
    else {
      missing.push(t);
      clips[t] = silence(t);
    }
  }
  return { clips, missing };
}

export type PreviewState = {
  ready: boolean;
  error: string | null;
  spoken: string[];
  missing: string[];
  uiUsed: string[];
  uiDefaults: Record<string, string>;
  audit: { running: boolean; issues: string[] | null; forKey: string | null };
  /** Ekranda görünen yazılar ve ilk göründükleri an (denetimle aynı geçişte); null: henüz ölçülmedi */
  visible: { s: string; t: number }[] | null;
  /** Seslendirmelerin zamanı */
  voice: { t: number; text: string }[];
  duration: number;
};

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/** focus: alana tıklanınca önizleme o ana gider (n her tıklamada artar). */
export function Preview({ template, data, onState, focus }: { template: string; data: Record<string, unknown>; onState: (s: PreviewState) => void; focus?: { t: number; n: number } }) {
  const frame = useRef<HTMLDivElement>(null);
  const inst = useRef<Instance | null>(null);
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [overlay, setOverlay] = useState<"off" | "tt" | "ig">("off");
  const [music, setMusic] = useState(true);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const audio = useRef<{ ctx: AudioContext | null; src: AudioBufferSourceNode | null; startedAt: number; buf: AudioBuffer | null; key: string }>({ ctx: null, src: null, startedAt: 0, buf: null, key: "" });
  const raf = useRef(0);
  const state = useRef<PreviewState>({ ready: false, error: null, spoken: [], missing: [], uiUsed: [], uiDefaults: {}, audit: { running: false, issues: null, forKey: null }, visible: null, voice: [], duration: 0 });
  const push = useCallback((p: Partial<PreviewState>) => {
    state.current = { ...state.current, ...p };
    onState(state.current);
  }, [onState]);
  const dataKey = JSON.stringify(data);

  // telefonda müzik sentezi ağır (Safari çöküyordu): dar ekranda varsayılan yalnız konuşma
  useEffect(() => {
    if (window.matchMedia("(max-width: 700px)").matches) setMusic(false);
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    try {
      audio.current.src?.stop();
    } catch {
      /* zaten durmuş */
    }
    audio.current.src = null;
    setPlaying(false);
  }, []);

  // sahneyi kur (metin değişince, ~300 ms sonra)
  useEffect(() => {
    let dead = false;
    const timer = setTimeout(async () => {
      try {
        const E = await loadEngine();
        if (dead) return;
        const spoken = E.spoken(template, data);
        const { clips, missing } = await ensureClips(spoken);
        if (dead || !frame.current) return;
        window.CLIPS = { ...(window.CLIPS ?? {}), ...clips };
        stop();
        const host = document.createElement("div");
        host.style.cssText = "position:absolute;inset:0";
        frame.current.replaceChildren(host);
        const I = E.mount(host, template, data);
        inst.current = I;
        const d = I.plan.duration;
        setDuration(d);
        const at = Math.min(tRef.current, d);
        I.render(at);
        I.ui.hidden = overlay === "off";
        if (overlay !== "off") I.ui.dataset.v = overlay;
        setLoading(false);
        push({ ready: true, error: null, spoken, missing, uiUsed: [...I.uiUsed], uiDefaults: E.videos[template]?.ui ?? {}, voice: I.plan.voice ?? [], duration: d });
      } catch (err) {
        if (!dead) {
          setLoading(false);
          push({ ready: false, error: err instanceof Error ? err.message : String(err) });
        }
      }
    }, 300);
    return () => {
      dead = true;
      clearTimeout(timer);
    };
    // overlay/music burada bilerek yok: sahneyi yeniden kurmaz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, dataKey]);

  // yerleşim denetimi: değişiklikten ~1,5 sn sonra, görünmez sahnede
  useEffect(() => {
    let dead = false;
    push({ audit: { running: true, issues: null, forKey: dataKey } });
    const timer = setTimeout(async () => {
      try {
        const E = await loadEngine();
        // klipler önizleme kurulumunda yüklendi; denetim aynı CLIPS'i kullanır
        await ensureClips(E.spoken(template, data)).then(({ clips }) => (window.CLIPS = { ...(window.CLIPS ?? {}), ...clips }));
        if (dead) return;
        const host = document.createElement("div");
        host.style.cssText = "position:fixed;left:-20000px;top:0;width:540px;height:960px;pointer-events:none";
        document.body.appendChild(host);
        try {
          const I = E.mount(host, template, data);
          const issues = E.audit(host, I);
          const visible = E.texts(host, I);
          if (!dead) push({ audit: { running: false, issues, forKey: dataKey }, visible });
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

  useEffect(() => () => stop(), [stop]);

  useEffect(() => {
    if (!focus || !inst.current) return;
    stop();
    const at = Math.max(0, Math.min(focus.t, duration));
    tRef.current = at;
    setT(at);
    inst.current.render(at);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.n]);

  const seek = (v: number) => {
    const at = Math.max(0, Math.min(v, duration));
    tRef.current = at;
    setT(at);
    inst.current?.render(at);
    if (playing) void play(at);
  };

  async function play(from = tRef.current >= duration - 0.05 ? 0 : tRef.current) {
    const I = inst.current;
    const E = window.E;
    if (!I || !E) return;
    stop();
    const a = audio.current;
    a.ctx ||= new AudioContext({ sampleRate: 48000 });
    await a.ctx.resume();
    const k = `${dataKey}|${music}`;
    if (a.key !== k || !a.buf) {
      a.buf = await E.soundtrack(music ? I.plan : { ...I.plan, music: { ...(I.plan.music ?? { gain: 0 }), gain: 0 } });
      a.key = k;
    }
    const src = a.ctx.createBufferSource();
    src.buffer = a.buf;
    src.connect(a.ctx.destination);
    src.start(0, from);
    a.src = src;
    a.startedAt = a.ctx.currentTime - from;
    setPlaying(true);
    const tick = () => {
      const now = (a.ctx as AudioContext).currentTime - a.startedAt;
      if (now >= duration) {
        tRef.current = duration;
        setT(duration);
        I.render(duration);
        stop();
        return;
      }
      tRef.current = now;
      setT(now);
      I.render(now);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  const cycleOverlay = () => {
    const next = overlay === "off" ? "tt" : overlay === "tt" ? "ig" : "off";
    setOverlay(next);
    const I = inst.current;
    if (I) {
      I.ui.hidden = next === "off";
      if (next !== "off") I.ui.dataset.v = next;
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative mx-auto overflow-hidden rounded-[28px] border" style={{ width: "min(100%, 340px)", aspectRatio: "9 / 16", borderColor: "var(--border)", background: "#000" }}>
        <div ref={frame} className="absolute inset-0" />
        <button type="button" aria-label={playing ? "Duraklat" : "Oynat"} className="absolute inset-0 cursor-pointer" onClick={() => (playing ? stop() : void play())} />
        {loading ? <div className="absolute inset-0 grid place-items-center text-caption text-white/70">Önizleme hazırlanıyor…</div> : null}
      </div>
      <div className="mx-auto flex items-center gap-2" style={{ width: "min(100%, 340px)" }}>
        <button type="button" className={BTN.small} onClick={() => (playing ? stop() : void play())} aria-label={playing ? "Duraklat" : "Oynat"}>{playing ? "❚❚" : "▶"}</button>
        <input type="range" aria-label="Zaman" className="min-w-0 flex-1" min={0} max={1000} value={duration ? Math.round((t / duration) * 1000) : 0} onChange={(ev) => seek((Number(ev.target.value) / 1000) * duration)} />
        <span className="muted shrink-0 font-mono text-caption tabular-nums">{fmt(t)} / {fmt(duration)}</span>
      </div>
      <div className="mx-auto flex flex-wrap items-center justify-center gap-2" style={{ width: "min(100%, 340px)" }}>
        <button type="button" className={BTN.small} onClick={cycleOverlay}>{overlay === "off" ? "Arayüz: kapalı" : overlay === "tt" ? "Arayüz: TikTok" : "Arayüz: Instagram"}</button>
        <button type="button" className={BTN.small} onClick={() => { stop(); setMusic((m) => !m); }}>{music ? "Müzik: açık" : "Müzik: kapalı"}</button>
      </div>
    </div>
  );
}
