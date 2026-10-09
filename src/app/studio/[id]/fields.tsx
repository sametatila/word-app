"use client";

import { useState } from "react";
import { FIELD, FIELD_AREA, FIELD_STYLE } from "../../admin/_ui/ui";
import { playClip } from "./preview";

/**
 * İÇERİK FORMU — videonun akış sırasıyla: ① Açılış (kanca) → ② kartlar/turlar/satırlar (her biri kendi kutusunda)
 * → ③ ekrandaki diğer yazılar → ④ Kapanış → ⑤ Paylaşım (videoda görünmez). Altta iki kapalı bölüm: şablon yazıları
 * (copy.ui, boş = varsayılan) ve videoda görünmeyen veri alanları. Alana tıklayınca önizleme o yazının göründüğü
 * (ya da seslendirildiği) ana atlar. Yalnız metin değişir; yapı sabit (sunucu da denetler, `lib/studio` shapeError).
 */

export type Path = (string | number)[];
export const getAt = (o: unknown, p: Path): unknown => p.reduce<unknown>((a, k) => (a == null ? a : (a as Record<string | number, unknown>)[k]), o);
export function setAt<T>(o: T, p: Path, v: unknown): T {
  if (!p.length) return v as T;
  const [k, ...rest] = p;
  const src = o as Record<string | number, unknown> | unknown[];
  const copy = (Array.isArray(src) ? [...src] : { ...src }) as Record<string | number, unknown>;
  copy[k] = setAt(copy[k], rest, v);
  return copy as T;
}
/** Metin değil kimlik (sunucudaki lib/studio lockedKey ile aynı kural): gösterilmez, değiştirilemez. */
function locked(p: Path): boolean {
  const last = [...p].reverse().find((k) => typeof k === "string") as string | undefined;
  if (!last) return false;
  if (["who", "icon", "avatar", "key", "typ"].includes(last)) return true;
  return last === "scene" && typeof p[p.length - 2] === "number";
}
/** copy.ui ve kimlik alanları dışındaki bütün dizgi yaprakları. */
export function leaves(o: unknown, at: Path = []): { path: Path; value: string }[] {
  if (at.length === 2 && at[0] === "copy" && at[1] === "ui") return [];
  if (typeof o === "string") return locked(at) ? [] : [{ path: at, value: o }];
  if (o && typeof o === "object") return Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => leaves(v, [...at, Array.isArray(o) ? Number(k) : k]));
  return [];
}

const KEY_TR: Record<string, string> = {
  de: "Almanca", tr: "Türkçe", artikel: "Artikel", beispiel: "Örnek cümle", beispielTr: "Örnek cümlenin Türkçesi",
  label: "Etiket", text: "Metin", niveau: "Seviye", formen: "Çoğul", typ: "Tür", keyDe: "Anahtar kelime", keyTr: "Anahtar kelimenin Türkçesi",
  pre: "Baş", mid: "Fark eden harfler", post: "Son", stem: "Kök", sfx: "Ek", a: "A", b: "B", tip: "İpucu", scene: "Sahne", who: "Konuşan",
  summary: "Özet başlığı", series: "Seri sözü", ask: "Yorum sorusu", title: "Takvimdeki adı", caption: "Paylaşım metni", hook: "Kanca", me: "Sen etiketi",
};
const GROUP_TR: Record<string, string> = { items: "Kartlar", rounds: "Turlar", lines: "Satırlar", sentences: "Cümleler", pairs: "Çiftler", rules: "Kurallar", scenes: "Sahneler" };
const human = (k: string | number) => (typeof k === "number" ? `${k + 1}.` : KEY_TR[k] ?? k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toLocaleUpperCase("tr")));
const norm = (s: string) => s.trim().toLowerCase();
const isSpoken = (value: string, spoken: string[]) => value.trim().length > 1 && spoken.some((s) => norm(s).includes(norm(value)));

export type Visible = { s: string; t: number }[];
/** Videoda görünüyor ya da duyuluyor mu. visible null: henüz ölçülmedi (hepsi görünür sayılır). */
function onScreen(value: string, visible: Visible | null, spoken: string[]): boolean {
  if (!visible) return true;
  const v = norm(value);
  if (!v) return false;
  return isSpoken(value, spoken) || visible.some(({ s }) => {
    const x = norm(s);
    return x.includes(v) || (x.length > 2 && v.includes(x));
  });
}

type Leaf = { path: Path; value: string };
type Props = {
  data: Record<string, unknown>;
  saved: Record<string, unknown>;
  spoken: string[];
  visible: Visible | null;
  uiUsed: string[];
  uiDefaults: Record<string, string>;
  onChange: (next: Record<string, unknown>) => void;
  onFocusText: (value: string, path?: Path) => void;
  disabled: boolean;
};

export function Fields(p: Props) {
  const { data, spoken, visible } = p;
  const every = leaves(data);
  const share = (l: Leaf) => l.path[0] === "copy" && (l.path[1] === "title" || l.path[1] === "caption");
  const shown = every.filter((l) => share(l) || onScreen(l.value, visible, spoken));
  const hidden = every.filter((l) => !shown.includes(l));

  const copy = (data.copy ?? {}) as Record<string, unknown>;
  const hook = shown.filter((l) => l.path[0] === "copy" && l.path[1] === "hook");
  const outro = shown.filter((l) => l.path[0] === "copy" && l.path[1] === "outro");
  const shareLeaves = shown.filter(share);
  const otherCopy = shown.filter((l) => l.path[0] === "copy" && !["hook", "outro", "title", "caption"].includes(String(l.path[1])));
  // kartlar: üst düzeyde nesne dizileri (items, rounds, lines…)
  const lists = Object.entries(data).filter(([k, v]) => k !== "copy" && Array.isArray(v) && v.some((x) => x && typeof x === "object"));
  const listKeys = new Set(lists.map(([k]) => k));
  const otherData = shown.filter((l) => l.path[0] !== "copy" && !listKeys.has(String(l.path[0])));

  let step = 0;
  const num = () => ++step;
  return (
    <div className="space-y-6">
      <p className="faint text-caption">Bir alana tıkla: önizleme o yazının göründüğü ana gider. <Chip tone="voice">dinle</Chip> düğmesi Defne&apos;nin kaydını çalar; bu Almanca metinler seslendiriliyor, değişirse Defne&apos;nin yeni kaydı gerekir (Mac her sabah üretir, sonra onay açılır).</p>

      {hook.length ? (
        <Section n={num()} title="Açılış" hint="İlk karede okunan kanca: kaydırmayı durduran cümle.">
          {hook.map((l, i) => <Field key={l.path.join(".")} {...p} leaf={l} label={hook.length > 1 ? `Satır ${i + 1}` : "Kanca"} big />)}
        </Section>
      ) : null}

      {lists.map(([k, arr]) => {
        const items = (arr as unknown[]).map((el, i) => ({ i, leaves: shown.filter((l) => l.path[0] === k && l.path[1] === i) })).filter((x) => x.leaves.length);
        if (!items.length) return null;
        return (
          <Section key={k} n={num()} title={GROUP_TR[k] ?? human(k)} hint={`${items.length} öğe, videodaki sırayla.`}>
            <div className="grid gap-3">
              {items.map(({ i, leaves: ls }) => (
                <Card key={i} title={`${i + 1}`} subtitle={cardTitle((arr as unknown[])[i])}>
                  <CardFields {...p} el={(arr as unknown[])[i]} leaves={ls} />
                </Card>
              ))}
            </div>
          </Section>
        );
      })}

      {otherCopy.length || otherData.length ? (
        <Section n={num()} title="Ekrandaki diğer yazılar" hint="Başlıklar, ipuçları, özet ve kural kartları.">
          <div className="grid gap-3 @lg:grid-cols-2">
            {[...otherData, ...otherCopy].map((l) => <Field key={l.path.join(".")} {...p} leaf={l} label={(l.path[0] === "copy" ? l.path.slice(1) : l.path).map(human).join(" · ")} wide={l.value.length > 28} />)}
          </div>
        </Section>
      ) : null}

      {outro.length ? (
        <Section n={num()} title="Kapanış" hint="Son ekran: seri sözü ve yorum sorusu (imza otomatik).">
          <div className="grid gap-3">{outro.map((l) => <Field key={l.path.join(".")} {...p} leaf={l} label={human(l.path[l.path.length - 1])} />)}</div>
        </Section>
      ) : null}

      {shareLeaves.length ? (
        <Section n={num()} title="Paylaşım" hint="Videoda görünmez: açıklama iki platformda aynı; takvimdeki adı yalnız burada.">
          <div className="grid gap-3">
            {shareLeaves
              .sort((a) => (a.path[1] === "caption" ? -1 : 1))
              .map((l) => <Field key={l.path.join(".")} {...p} leaf={l} label={l.path[1] === "caption" ? "Açıklama ve etiketler" : "Takvimdeki adı"} counter={l.path[1] === "caption" ? 2200 : undefined} />)}
          </div>
        </Section>
      ) : null}

      <UiTexts {...p} copy={copy} />

      {hidden.length ? (
        <Fold title={`Videoda görünmeyen veri (${hidden.length})`} hint="Bu bölümde ekrana çıkmıyor ve seslendirilmiyor; değiştirmek videoyu etkilemez.">
          <div className="grid gap-3 @lg:grid-cols-2">
            {hidden.map((l) => <Field key={l.path.join(".")} {...p} leaf={l} label={l.path.filter((k) => k !== "copy").map(human).join(" · ")} />)}
          </div>
        </Fold>
      ) : null}
    </div>
  );
}

function cardTitle(el: unknown): string {
  if (!el || typeof el !== "object") return "";
  const o = el as Record<string, unknown>;
  if (typeof o.label === "string") return o.label;
  if (typeof o.de === "string") return `${typeof o.artikel === "string" && o.artikel ? `${o.artikel} ` : ""}${o.de}`;
  const a = o.a as Record<string, unknown> | undefined;
  const b = o.b as Record<string, unknown> | undefined;
  if (a && b) return `${String(a.label ?? a.de ?? "")} / ${String(b.label ?? b.de ?? "")}`;
  const first = leaves(o)[0];
  return first ? first.value : "";
}

/** Kartın asıl metinleri önde; vurgu parçaları, tekrarlayan etiket, seviye gibi alanlar "Ayrıntılar"da. */
const PRIMARY = new Set(["de", "tr", "artikel", "beispiel", "beispielTr", "text", "keyDe", "keyTr", "label", "tip"]);
function CardFields(p: Props & { el: unknown; leaves: Leaf[] }) {
  const isExtra = (l: Leaf) => {
    const k = String(l.path[l.path.length - 1]);
    if (!PRIMARY.has(k)) return true;
    if (k === "label") {
      // etiket, Almanca + artikelin tekrarıysa (seslendirilen biçim) ayrıntıda
      const owner = getAt(p.data, l.path.slice(0, -1)) as Record<string, unknown> | undefined;
      const full = owner && typeof owner.de === "string" ? `${typeof owner.artikel === "string" && owner.artikel ? `${owner.artikel} ` : ""}${owner.de}` : null;
      return full !== null && (l.value === full || l.value === owner?.de);
    }
    return false;
  };
  const main = p.leaves.filter((l) => !isExtra(l));
  const extra = p.leaves.filter(isExtra);
  const label = (l: Leaf) => l.path.slice(2).map(human).join(" · ");
  return (
    <div className="space-y-3">
      <div className="grid gap-3 @lg:grid-cols-2">
        {main.map((l) => <Field key={l.path.join(".")} {...p} leaf={l} label={label(l)} wide={l.value.length > 28} />)}
      </div>
      {extra.length ? (
        <details>
          <summary className="cursor-pointer text-caption muted">Ayrıntılar ({extra.length}): vurgu parçaları, etiket, seviye…</summary>
          <p className="faint mt-1 text-caption">Kelimeyi değiştirirsen bunları da uyumlu tut (ör. parçalar birleşince kelimeyi vermeli).</p>
          <div className="mt-2 grid gap-3 @lg:grid-cols-2">
            {extra.map((l) => <Field key={l.path.join(".")} {...p} leaf={l} label={label(l)} />)}
          </div>
        </details>
      ) : null}
    </div>
  );
}

function Section({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full text-micro text-strong" style={{ background: "var(--brand-soft)", color: "var(--color-brand)" }}>{n}</span>
        <h3 className="text-strong">{title}</h3>
        {hint ? <span className="faint text-caption">{hint}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-tile border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-mono text-caption text-strong">{title}</span>
        <span className="truncate text-caption muted">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

function Fold({ title, hint, children, open = false }: { title: string; hint: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="rounded-tile border p-3" style={{ borderColor: "var(--border)" }} open={open}>
      <summary className="cursor-pointer text-caption text-strong">{title}</summary>
      <p className="faint mt-1 text-caption">{hint}</p>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function Speaker() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" className="mr-1" fill="currentColor">
      <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
    </svg>
  );
}

function Chip({ children, tone }: { children: React.ReactNode; tone: "voice" | "dirty" }) {
  const c = tone === "voice" ? "var(--color-brand)" : "var(--color-flame)";
  return <span className="inline-flex h-5 items-center rounded-chip px-1.5 text-micro" style={{ color: c, background: `color-mix(in srgb, ${c} 12%, transparent)` }}>{tone === "voice" ? <Speaker /> : "● "}{children}</span>;
}

/** "Sesli" düğmesi: alanın içinde geçtiği seslendirilen metnin Defne kaydını çalar (tam eşleşme önce). */
function VoiceButton({ value, spoken }: { value: string; spoken: string[] }) {
  const [st, setSt] = useState<"idle" | "playing" | "missing">("idle");
  const text = spoken.find((x) => norm(x) === norm(value)) ?? spoken.find((x) => norm(x).includes(norm(value)));
  if (!text) return null;
  return (
    <button
      type="button"
      title={`Defne: „${text}“`}
      className="inline-flex h-5 items-center rounded-chip px-1.5 text-micro hover:opacity-80"
      style={{ color: st === "missing" ? "var(--color-flame)" : "var(--color-brand)", background: `color-mix(in srgb, ${st === "missing" ? "var(--color-flame)" : "var(--color-brand)"} 12%, transparent)` }}
      onClick={async (e) => {
        e.preventDefault(); // etiketin içinde: alana odaklanmasın
        setSt("playing");
        const r = await playClip(text).catch(() => "missing" as const);
        setSt(r === "missing" ? "missing" : "idle");
      }}
    >
      <Speaker />
      {st === "playing" ? "çalıyor…" : st === "missing" ? "Defne kaydı yok" : "dinle"}
    </button>
  );
}

function Field({ leaf, label, data, saved, spoken, onChange, onFocusText, disabled, big, wide, counter }: Props & { leaf: Leaf; label: string; big?: boolean; wide?: boolean; counter?: number }) {
  const changed = getAt(saved, leaf.path) !== leaf.value;
  const voice = isSpoken(leaf.value, spoken);
  const long = leaf.value.length > 70 || leaf.value.includes("\n");
  const set = (v: string) => onChange(setAt(data, leaf.path, v));
  return (
    <label className={`flex min-w-0 flex-col gap-1 text-caption ${wide ? "@lg:col-span-2" : ""}`}>
      <span className="flex flex-wrap items-center gap-1.5">
        <span className="muted">{label}</span>
        {voice ? <VoiceButton value={leaf.value} spoken={spoken} /> : null}
        {changed ? <Chip tone="dirty">değişti</Chip> : null}
        {counter ? <span className="faint ml-auto tabular-nums">{leaf.value.length}/{counter}</span> : null}
      </span>
      {long ? (
        <textarea aria-label={label} disabled={disabled} className={FIELD_AREA} style={FIELD_STYLE} rows={Math.min(10, Math.max(2, Math.ceil(leaf.value.length / 70) + (leaf.value.match(/\n/g)?.length ?? 0)))} value={leaf.value} onFocus={() => onFocusText(leaf.value, leaf.path)} onChange={(e) => set(e.target.value)} />
      ) : (
        <input aria-label={label} disabled={disabled} className={`${FIELD} ${big ? "text-strong" : ""}`} style={FIELD_STYLE} value={leaf.value} onFocus={() => onFocusText(leaf.value, leaf.path)} onChange={(e) => set(e.target.value)} />
      )}
    </label>
  );
}

function UiTexts({ data, saved, uiUsed, uiDefaults, onChange, onFocusText, disabled, copy }: Props & { copy: Record<string, unknown> }) {
  const ui = (copy.ui ?? {}) as Record<string, string>;
  const savedUi = (((saved.copy as Record<string, unknown> | undefined)?.ui ?? {}) as Record<string, string>);
  const edited = Object.keys(ui).length > 0;
  const [open] = useState(edited);
  if (!uiUsed.length) return null;
  const setUi = (k: string, v: string) => {
    const nextUi = { ...ui };
    if (v === "") delete nextUi[k];
    else nextUi[k] = v;
    const c = { ...copy };
    if (Object.keys(nextUi).length) c.ui = nextUi;
    else delete c.ui;
    onChange({ ...data, copy: c });
  };
  return (
    <Fold open={open} title={`Şablon yazıları (${uiUsed.length}${edited ? `, ${Object.keys(ui).length} değişti` : ""})`} hint="Tasarımın sabit yazıları (ör. “Ne demek?”, sayaçlar). Burada değiştirmek yalnız bu bölümü etkiler; boş bırakılan varsayılanı gösterir. {n} gibi yer tutucular sayıyla dolar: silme.">
      <div className="grid gap-3 @lg:grid-cols-2">
        {uiUsed.map((k) => {
          const label = uiDefaults[k] ?? k;
          return (
            <label key={k} className="flex min-w-0 flex-col gap-1 text-caption">
              <span className="flex items-center gap-1.5">
                <span className="muted truncate">{label}</span>
                {(ui[k] ?? "") !== (savedUi[k] ?? "") ? <Chip tone="dirty">değişti</Chip> : null}
              </span>
              <input aria-label={`Şablon yazısı: ${label}`} disabled={disabled} className={FIELD} style={FIELD_STYLE} value={ui[k] ?? ""} placeholder={uiDefaults[k] ?? ""} onFocus={() => onFocusText(uiDefaults[k] ?? "")} onChange={(e) => setUi(k, e.target.value)} />
            </label>
          );
        })}
      </div>
    </Fold>
  );
}
