"use client";

import { useState } from "react";
import { BTN, FIELD, FIELD_AREA, FIELD_STYLE, TONE } from "../../../admin/_ui/ui";
import { setAt, type Path } from "../fields";
import { playKey } from "./oynatici";

/**
 * YATAY SENARYO FORMU: bölüm verisi videonun akış sırasıyla (künye → kanca → konular/maddeler → uygulama → bitiş →
 * kapak → YouTube açıklaması → sabit yazılar). Seslendirilen her metin bir SATIR ({ v: ses, l: dil, t: metin }):
 * ses rozeti, kaydın durumu (✓ kayıt var · ses bekliyor), "dinle" ve "bu ana git". Satırın sesi ve dili kimlik
 * (sunucuda da kilitli, `lib/studio` lockedKey); yalnız metin değişir. Metni değişen satır yeni kayıt ister.
 * Alana tıklayınca önizleme o satırın söylendiği ya da yazının göründüğü ana gider.
 */

type Line = { v: string; l: string; t: string; x?: string };
const isLine = (o: unknown): o is Line => !!o && typeof o === "object" && !Array.isArray(o) && typeof (o as Line).v === "string" && typeof (o as Line).l === "string" && typeof (o as Line).t === "string";
export const keyOf = (l: Line) => `${l.v}|${l.l}|${l.t}${l.x ? `#${l.x}` : ""}`;
const LOCKED = ["v", "l", "x", "lv", "art", "who", "icon", "avatar", "key", "typ"];
/** auto: anlatıcı (ElevenLabs); kaydı işçi kaydedilen metinden kendiliğinden üretir, Mac talebi gerekmez. */
export const VOICE: Record<string, { name: string; color: string; auto?: boolean }> = { ahu: { name: "Ahu", color: "#b8577e", auto: true }, defne: { name: "Defne", color: "#d2783a" }, aras: { name: "Aras", color: "#5d80c4" }, can: { name: "Can", color: "#4f9a7c" }, mira: { name: "Mira", color: "#8f7bc4" } };
const LANG: Record<string, string> = { tr: "Türkçe", de: "Almanca", en: "İngilizce" };

const KEY_TR: Record<string, string> = {
  series: "Seri", ep: "Bölüm adı", hook: "Kanca (ilk saniyeler)", how: "Nasıl çalışır", sections: "Konular", words: "Kelimeler", review: "Hızlı tekrar",
  app: "Uygulama kartı", end: "Bitiş ekranı (son 20 sn)", cover: "Kapak (YouTube küçük resmi)", yt: "YouTube açıklaması", ui: "Sabit yazılar",
  lab: "Etiket", lines: "Büyük satırlar", sub: "Alt satır", pills: "Haplar", say: "Anlatım", steps: "Adımlar", stops: "Rotadaki duraklar",
  title: "Başlık", body: "Metin", where: "Ekran adı", link: "Bağlantı yazısı", note: "Not", panel: "Uygulama paneli", ok: "Onay yazısı",
  line: "Büyük soru", ask: "Yorum sorusu", slot: "Video yuvası etiketi", pill: "Hap", desc: "Açıklama (ilk paragraf)", tags: "Etiketler",
  de: "Almanca", tr: "Türkçe", ex: "Örnek cümle", exTr: "Örnek cümlenin Türkçesi", lv: "Seviye", parts: "Bölümler", items: "Maddeler",
  q: "Soru", opts: "Şıklar", exp: "Açıklama", trap: "Tuzak", sit: "Durum", role: "Rol", rounds: "Turlar", pairs: "Çiftler", rules: "Kurallar",
  text: "Metin", paragraphs: "Paragraflar", sentences: "Cümleler", questions: "Sorular", tip: "İpucu", kind: "Tür", name: "Ad", vocab: "Kelimeler",
  patterns: "Kalıplar", dialog: "Konuşma", practice: "Sıra sende", quiz: "Doğru mu yanlış mı", pocket: "Cep kartı", words2: "Kelimeler",
};
/**
 * Sıra: veritabanı (jsonb) anahtar sırasını korumuyor; alanlar videonun akış sırasıyla dizilir (bilinmeyen sonda).
 */
const ORDER = [
  "series", "ep", "hook", "how", "intro", "format", "rules", "sections", "parts", "rounds", "vocab", "patterns", "dialog", "practice", "quiz", "story", "paragraphs", "questions", "review", "final", "trap", "score", "pocket", "app", "end", "cover", "yt", "ui",
  "title", "name", "lab", "lines", "line", "sit", "q", "opts", "sub", "pills", "steps", "stops", "body", "where", "link", "note", "panel", "de", "tr", "ex", "exTr", "role", "say", "exp", "explain", "tip", "ask", "slot", "pill", "words", "items", "pairs", "desc", "tags",
];
const rank = (k: string) => {
  const i = ORDER.indexOf(k);
  return i < 0 ? ORDER.length : i;
};
export const ordered = (keys: string[]) => [...keys].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
const human = (k: string | number) => (typeof k === "number" ? `${k + 1}.` : KEY_TR[k] ?? k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toLocaleUpperCase("tr")));
/** Grubun başlığına konacak kısa ad (konu başlığı, kelime). */
const titleOf = (o: unknown): string => {
  if (!o || typeof o !== "object") return "";
  const r = o as Record<string, unknown>;
  for (const k of ["title", "name", "q", "sit"]) if (typeof r[k] === "string" && r[k]) return r[k] as string;
  if (isLine(r.de)) return r.de.t;
  if (isLine(r.say)) return r.say.t.slice(0, 60);
  return "";
};

type Props = {
  data: Record<string, unknown>;
  saved: Record<string, unknown>;
  missing: string[];
  onChange: (next: Record<string, unknown>) => void;
  onFocus: (p: { key?: string; text: string }) => void;
  disabled: boolean;
};

export function Script(p: Props) {
  const top = ordered(Object.keys(p.data));
  const head: string[] = top.filter((k) => k === "series" || k === "ep");
  const tail = ["cover", "yt", "ui"].filter((k) => top.includes(k));
  const body = top.filter((k) => !head.includes(k) && !tail.includes(k));
  return (
    <div className="space-y-3">
      <Box title="Künye" open>
        <div className="grid gap-3 @2xl:grid-cols-2">{head.map((k) => <Node key={k} {...p} path={[k]} />)}</div>
      </Box>
      {body.map((k, i) => (
        <Box key={k} title={human(k)} open={i < 2} count={count(p.data[k])}>
          <Node {...p} path={[k]} bare />
        </Box>
      ))}
      {tail.map((k) => (
        <Box key={k} title={human(k)} count={count(p.data[k])}>
          <Node {...p} path={[k]} bare />
        </Box>
      ))}
    </div>
  );
}
/** Gruptaki düzenlenebilir alan sayısı (kapalı başlıkta görünür). */
function count(o: unknown): number {
  if (typeof o === "string") return 1;
  if (isLine(o)) return 1;
  if (Array.isArray(o)) return o.reduce((s: number, x) => s + count(x), 0);
  if (o && typeof o === "object") return Object.entries(o).reduce((s, [k, v]) => s + (LOCKED.includes(k) ? 0 : count(v)), 0);
  return 0;
}

function Box({ title, open, count: n, children }: { title: string; open?: boolean; count?: number; children: React.ReactNode }) {
  return (
    <details open={open} className="rounded-panel border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-3">
        <span className="text-strong">{title}</span>
        {n ? <span className="faint text-caption">{n} alan</span> : null}
      </summary>
      <div className="space-y-3 border-t px-4 pb-4 pt-3" style={{ borderColor: "var(--border)" }}>{children}</div>
    </details>
  );
}

const get = (o: unknown, path: Path): unknown => path.reduce<unknown>((a, k) => (a == null ? a : (a as Record<string | number, unknown>)[k]), o);

function Node(props: Props & { path: Path; bare?: boolean }) {
  const { data, path } = props;
  const v = get(data, path);
  const last = path[path.length - 1];
  if (typeof last === "string" && LOCKED.includes(last)) return null;
  if (typeof v === "string") return <TextField {...props} value={v} />;
  if (isLine(v)) return <LineField {...props} line={v} />;
  if (Array.isArray(v)) {
    // dizgi dizisi (haplar, büyük satırlar) ya da çift dizisi (adımlar): sıralı alanlar
    if (v.every((x) => typeof x === "string" || (Array.isArray(x) && x.every((y) => typeof y === "string")))) {
      return (
        <div className="space-y-2">
          {!props.bare ? <div className="muted text-caption">{human(last)}</div> : null}
          {v.map((_, i) => (Array.isArray(v[i]) ? (
            <div key={i} className="grid gap-2 @2xl:grid-cols-2">{(v[i] as string[]).map((__, j) => <Node key={j} {...props} path={[...path, i, j]} bare />)}</div>
          ) : <Node key={i} {...props} path={[...path, i]} bare />))}
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {!props.bare ? <div className="muted text-caption">{human(last)} ({v.length})</div> : null}
        {v.map((x, i) => {
          const tt = titleOf(x);
          const big = count(x) > 6;
          return big ? (
            <details key={i} className="rounded-tile border" style={{ borderColor: "var(--border)" }} open={false}>
              <summary className="cursor-pointer px-3 py-2 text-caption"><span className="text-strong">{i + 1}.</span> {tt}</summary>
              <div className="space-y-3 border-t px-3 pb-3 pt-2" style={{ borderColor: "var(--border)" }}><Node {...props} path={[...path, i]} bare /></div>
            </details>
          ) : (
            <div key={i} className="rounded-tile border px-3 pb-3 pt-2" style={{ borderColor: "var(--border)" }}>
              <div className="mb-2 text-caption"><span className="text-strong">{i + 1}.</span> <span className="muted">{tt}</span></div>
              <Node {...props} path={[...path, i]} bare />
            </div>
          );
        })}
      </div>
    );
  }
  if (v && typeof v === "object") {
    const keys = ordered(Object.keys(v as Record<string, unknown>).filter((k) => !LOCKED.includes(k)));
    const inner = (
      <div className="grid gap-3 @2xl:grid-cols-2">
        {keys.map((k) => {
          const child = (v as Record<string, unknown>)[k];
          const wide = isLine(child) || (typeof child === "string" && child.length > 40) || (child && typeof child === "object");
          return <div key={k} className={wide ? "@2xl:col-span-2" : ""}><Node {...props} path={[...path, k]} bare={false} /></div>;
        })}
      </div>
    );
    if (props.bare) return inner;
    return (
      <div className="space-y-2 rounded-tile border px-3 pb-3 pt-2" style={{ borderColor: "var(--border)" }}>
        <div className="muted text-caption">{human(last)}</div>
        {inner}
      </div>
    );
  }
  return null;
}

function TextField({ data, saved, path, value, onChange, onFocus, disabled, bare }: Props & { path: Path; value: string; bare?: boolean }) {
  const was = get(saved, path);
  const changed = was !== value;
  const long = value.length > 60 || value.includes("\n");
  const last = path[path.length - 1];
  return (
    <label className="block min-w-0 space-y-1">
      {!bare || typeof last === "string" ? (
        <span className="flex items-center gap-2 text-caption">
          <span className="muted">{human(last)}</span>
          {changed ? <span style={{ color: "var(--color-flame)" }}>değişti</span> : null}
        </span>
      ) : null}
      {long ? (
        <textarea aria-label={String(human(last))} className={FIELD_AREA} style={FIELD_STYLE} rows={Math.min(6, Math.ceil(value.length / 70) + 1)} value={value} disabled={disabled} onFocus={() => onFocus({ text: value })} onChange={(e) => onChange(setAt(data, path, e.target.value))} />
      ) : (
        <input aria-label={String(human(last))} className={FIELD} style={FIELD_STYLE} value={value} disabled={disabled} onFocus={() => onFocus({ text: value })} onChange={(e) => onChange(setAt(data, path, e.target.value))} />
      )}
    </label>
  );
}

function LineField({ data, saved, path, line, missing, onChange, onFocus, disabled }: Props & { path: Path; line: Line }) {
  const [playing, setPlaying] = useState<"idle" | "on" | "none">("idle");
  const key = keyOf(line);
  const was = get(saved, path) as Line | undefined;
  const changed = !!was && was.t !== line.t;
  const has = !missing.includes(key);
  const voice = VOICE[line.v] ?? { name: line.v, color: "var(--text-muted)" };
  const last = path[path.length - 1];
  const tPath = [...path, "t"];
  return (
    <div className="min-w-0 space-y-1">
      <div className="flex flex-wrap items-center gap-2 text-caption">
        {typeof last === "string" ? <span className="muted">{human(last)}</span> : null}
        <span className="rounded-full px-2 py-0.5 text-micro text-strong" style={{ background: `color-mix(in srgb, ${voice.color} 10%, transparent)`, color: voice.color }}>{voice.name} · {LANG[line.l] ?? line.l}{line.x ? ` · ${line.x === "listen" ? "dinleme" : line.x === "listenSlow" ? "yavaş" : line.x}` : ""}</span>
        {has ? <span style={{ color: TONE.ok }}>✓ kayıt var</span> : <span style={{ color: TONE.warn }}>{changed ? "değişti · yeni kayıt gerekir" : "ses bekliyor"}</span>}
        <span className="ml-auto flex gap-1">
          <button type="button" className={`${BTN.small} h-7 px-2`} disabled={!has || playing === "on"} onClick={async () => { setPlaying("on"); setPlaying((await playKey(key)) ? "idle" : "none"); }}>{playing === "none" ? "kayıt yok" : "dinle"}</button>
          <button type="button" className={`${BTN.small} h-7 px-2`} onClick={() => onFocus({ key, text: line.t })} aria-label="Önizlemede bu ana git">⏱</button>
        </span>
      </div>
      <textarea
        aria-label={`${voice.name}, ${LANG[line.l] ?? line.l}: ${typeof last === "string" ? human(last) : `${Number(last) + 1}.`}`}
        className={FIELD_AREA}
        style={{ ...FIELD_STYLE, ...(line.l === "de" ? { fontStyle: "italic" } : {}) }}
        rows={Math.min(5, Math.ceil(line.t.length / 70) || 1)}
        value={line.t}
        disabled={disabled}
        lang={line.l}
        onFocus={() => onFocus({ key, text: line.t })}
        onChange={(e) => onChange(setAt(data, tPath, e.target.value.replace(/\n/g, " ")))}
      />
    </div>
  );
}
