"use client";

import { useMemo, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { Checkbox } from "@/components/checkbox";
import { MascotAvatar } from "@/components/avatar";
import { AvatarCatalogProvider } from "@/lib/avatar-catalog-client";
import { AVATAR_RARITY, DEFAULT_AVATAR, EXTRA_SLOTS, type AvatarConfig, type ExtraSlot } from "@/lib/avatar-config";
import type { AvatarRules } from "@/lib/avatar-items";
import type { AvatarUsage } from "@/lib/avatar-admin";
import { AdminPage, AdminTabs, Badge, BTN, Empty, FIELD, FIELD_STYLE, Notice, PageHeader, Panel, Segmented, TONE, when } from "../_ui/ui";

/**
 * Avatar envanteri ve kuralları (`/admin/avatar`).
 *
 *   Solda yuva sekmeleri, arama, nadirlik ve durum süzgeci, toplu aç/kapat;
 *   parça kartında ikon, ad, nadirlik, koşul ve kullanım (takan · açık · verilen).
 *   Sağda seçili parçanın ayrıntısı: uygulamanın kendi çizimiyle önizleme,
 *   açılış koşulu (değiştirilebilir), bir hesaba verme ve verilenleri geri alma.
 *
 * Gösterme ve koşul değişiklikleri "Kaydet"e kadar yerelde; verme/geri alma
 * anında yazılır (tek hesabı etkiliyor, işlem kaydına düşer).
 */
export type AdminPart = { id: string; slot: string; rarity: string; name: string; icon: string | null; defaultUnlock: string };
type Seed = Parameters<typeof AvatarCatalogProvider>[0]["seed"];

const SLOTS = [
  ["hat", "Şapka"],
  ["glasses", "Gözlük"],
  ["mustache", "Bıyık"],
  ["neck", "Boyun"],
  ["face", "Yüz"],
  ["ear", "Küpe"],
  ["back", "Sırt"],
  ["bg", "Arka plan"],
] as const;
type Slot = (typeof SLOTS)[number][0];
const RARITIES = ["common", "rare", "epic", "legendary"] as const;
const RARITY_TR: Record<string, string> = { common: "Sıradan", rare: "Nadir", epic: "Epik", legendary: "Efsanevi" };
type Rar = "all" | (typeof RARITIES)[number];
type State = "all" | "on" | "off" | "premium";
const ERR: Record<string, string> = {
  too_many: "Bu yuvada sınır aşıldı.",
  no_catalog: "Katalog okunamadı.",
  bad_unlock: "Geçersiz açılış koşulu.",
  not_found: "Hesap bulunamadı (kimlik, e-posta ya da kullanıcı adı tam yazılmalı).",
  ambiguous: "Birden çok hesap eşleşti: kimlikle dene.",
  unknown_item: "Parça katalogda yok.",
  bad_input: "Geçersiz değer.",
};
const slotName = (s: string) => SLOTS.find((x) => x[0] === s)?.[1] ?? s;

/** Önizleme: varsayılan avatar + yalnız bu parça, kendi yuvasında. */
function previewConfig(p: AdminPart): AvatarConfig {
  const c: AvatarConfig = { ...DEFAULT_AVATAR, extra: {} };
  if (p.slot === "hat") c.hat = p.id;
  else if (p.slot === "glasses") c.glasses = p.id;
  else if (p.slot === "mustache") c.mustache = p.id;
  else if (p.slot === "bg") c.bg = p.id;
  else if ((EXTRA_SLOTS as readonly string[]).includes(p.slot)) c.extra = { [p.slot as ExtraSlot]: { id: p.id, color: null } };
  return c;
}

export function AvatarAdmin({ parts, active, defaults, always, rules, usage, options, seed, catalogOn }: {
  parts: AdminPart[];
  active: string[];
  defaults: string[];
  always: string[];
  rules: AvatarRules;
  usage: AvatarUsage;
  options: { key: string; label: string }[];
  seed: Seed;
  catalogOn: boolean;
}) {
  const [slot, setSlot] = useState<Slot>("hat");
  const [rar, setRar] = useState<Rar>("all");
  const [state, setState] = useState<State>("all");
  const [q, setQ] = useState("");
  const [on, setOn] = useState<Set<string>>(() => new Set(active));
  const [saved, setSaved] = useState<Set<string>>(() => new Set(active));
  const [perSlot, setPerSlot] = useState(rules.perSlot);
  const [savedPerSlot, setSavedPerSlot] = useState(rules.perSlot);
  const [unlocks, setUnlocks] = useState<Record<string, string>>(rules.unlocks);
  const [savedUnlocks, setSavedUnlocks] = useState<Record<string, string>>(rules.unlocks);
  const [grants, setGrants] = useState(usage.grants);
  const [sel, setSel] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);

  const label = useMemo(() => new Map(options.map((o) => [o.key, o.label])), [options]);
  const unlockOf = (p: AdminPart) => (p.id in unlocks ? unlocks[p.id] : p.defaultUnlock);
  const openCount = (p: AdminPart) => {
    const k = unlockOf(p);
    return k ? (usage.keyUsers[k] ?? 0) : usage.profiles;
  };
  const grantCount = (id: string) => grants.filter((g) => g.itemId === id).length;
  /* PREMIUM SETİ: koşulu "premium" olan parça her zaman gösterilir ve yuva
     sınırına sayılmaz (satın alma ekranı bu seti vaat ediyor; bkz.
     `avatar-items` `premiumSetIds`). Koşulu değiştirmek seti değiştirir. */
  const isPremium = (p: AdminPart) => unlockOf(p) === "premium";
  const count = (s: string) => parts.filter((p) => p.slot === s && on.has(p.id) && !isPremium(p)).length;
  const premiumCount = (s?: string) => parts.filter((p) => (!s || p.slot === s) && isPremium(p)).length;

  const activeDirty = on.size !== saved.size || [...on].some((id) => !saved.has(id));
  const rulesDirty = perSlot !== savedPerSlot || JSON.stringify(unlocks) !== JSON.stringify(savedUnlocks);
  const changes = [...on].filter((id) => !saved.has(id)).length + [...saved].filter((id) => !on.has(id)).length
    + Object.keys({ ...unlocks, ...savedUnlocks }).filter((id) => unlocks[id] !== savedUnlocks[id]).length + (perSlot !== savedPerSlot ? 1 : 0);

  const needle = q.trim().toLocaleLowerCase("tr-TR");
  const list = useMemo(() => {
    const order = ["common", "rare", "epic", "legendary"];
    return parts
      .filter((p) => p.slot === slot)
      .filter((p) => rar === "all" || p.rarity === rar)
      .filter((p) => state === "all" || (state === "premium" ? isPremium(p) : state === "on" ? saved.has(p.id) || isPremium(p) : !saved.has(p.id) && !isPremium(p)))
      .filter((p) => !needle || p.name.toLocaleLowerCase("tr-TR").includes(needle) || p.id.includes(needle))
      .sort((a, b) => Number(saved.has(b.id)) - Number(saved.has(a.id)) || order.indexOf(a.rarity) - order.indexOf(b.rarity));
    /* Sıra kayıtla ve süzgeçle yenileniyor, kutu işaretlenince değil: satır yer değiştirmesin. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parts, slot, rar, state, needle, saved, savedUnlocks]);
  const current = parts.find((p) => p.id === sel) ?? list[0] ?? null;

  const toggle = (id: string, v: boolean) => setOn((cur) => {
    const n = new Set(cur);
    if (v) n.add(id); else n.delete(id);
    return n;
  });
  /** Görünenleri sırayla açar, yuva sınırına kadar; kapatırken her-zaman-açıkları bırakır. */
  function bulk(v: boolean) {
    setOn((cur) => {
      const n = new Set(cur);
      let left = perSlot - parts.filter((p) => p.slot === slot && n.has(p.id)).length;
      for (const p of list) {
        if (isPremium(p)) continue;                                // Premium seti her zaman açık
        if (v && !n.has(p.id) && left > 0) { n.add(p.id); left--; }
        if (!v && !always.includes(p.id)) n.delete(p.id);
      }
      return n;
    });
  }

  async function post(body: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    const res = await apiFetch("/api/admin/avatar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      const code = String(data.error ?? res.status);
      setMsg({ tone: "bad", text: (ERR[code] ?? adminErrorText(code)) + (data.slot ? ` (${slotName(String(data.slot))})` : "") });
      return null;
    }
    return data;
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      /* Sınır küçülüyorsa önce parçalar kapanmalı: önce gösterme listesi,
         büyüyorsa önce kurallar. */
      const shrinking = perSlot < savedPerSlot;
      const steps: (() => Promise<boolean>)[] = [];
      const saveActive = async () => {
        if (!activeDirty) return true;
        const d = await post({ action: "save_active", ids: [...on] });
        if (!d) return false;
        const s = new Set(d.ids as string[]);
        setOn(s);
        setSaved(s);
        return true;
      };
      const saveRules = async () => {
        if (!rulesDirty) return true;
        const d = await post({ action: "save_rules", perSlot, unlocks: Object.fromEntries(parts.map((p) => [p.id, unlockOf(p)])) });
        if (!d) return false;
        const r = d.rules as AvatarRules;
        setPerSlot(r.perSlot);
        setSavedPerSlot(r.perSlot);
        setUnlocks(r.unlocks);
        setSavedUnlocks(r.unlocks);
        return true;
      };
      steps.push(...(shrinking ? [saveActive, saveRules] : [saveRules, saveActive]));
      for (const st of steps) if (!(await st())) return;
      setMsg({ tone: "ok", text: "Kaydedildi. Kullanıcılarda birkaç dakika içinde yürürlükte." });
    } catch {
      setMsg({ tone: "bad", text: "Bağlantı hatası." });
    } finally {
      setBusy(false);
    }
  }

  function discard() {
    setOn(new Set(saved));
    setPerSlot(savedPerSlot);
    setUnlocks(savedUnlocks);
    setMsg(null);
  }

  return (
    <AvatarCatalogProvider seed={seed}>
      <AdminPage>
        <PageHeader
          title="Avatar parçaları"
          description="Kullanıcıya gösterilen parçalar, açılış koşulları, kullanım ve tek hesaba verme. Kapalı parça silinmez; takılıysa kullanıcıda kalır, yalnız yeniden seçilemez."
          actions={
            <>
              <button type="button" className={BTN.secondary} disabled={busy} onClick={() => setOn(new Set(defaults))}>Gösterilenler: varsayılan</button>
              {changes ? <button type="button" className={BTN.secondary} disabled={busy} onClick={discard}>Vazgeç</button> : null}
              <button type="button" className={BTN.primary} disabled={busy || !changes} onClick={save}>{busy ? "Kaydediliyor…" : changes ? `Kaydet (${changes} değişiklik)` : "Kaydet"}</button>
            </>
          }
        />
        {!catalogOn ? <Notice tone="warn" title="3B katalog okunamadı">Katalog okunamadığı için parça listesi boş ya da eksik.</Notice> : null}
        {msg ? <Notice tone={msg.tone} role="status">{msg.text}</Notice> : null}

        <div className="grid items-start gap-5 @5xl:grid-cols-[minmax(0,1fr)_24rem]">
          <Panel
            title="Envanter"
            hint="Kart: takan · koşulu sağlayan · ayrıca verilen kişi. Koşulu Premium olan parça Premium setindedir: her zaman gösterilir, yuva sınırına sayılmaz. Karta tıkla: önizleme, koşul ve verme sağda."
            actions={
              <label className="flex items-center gap-2 text-caption">
                <span className="muted">Yuva sınırı</span>
                <input id="avatar-per-slot" type="number" min={1} max={60} value={perSlot} onChange={(e) => setPerSlot(Math.max(1, Math.min(60, Number(e.target.value) || 1)))} className={`${FIELD} w-20`} style={FIELD_STYLE} aria-label="Yuva başına en fazla parça" />
              </label>
            }
          >
            <AdminTabs
              label="Yuva"
              value={slot}
              onChange={(s) => { setSlot(s); setSel(null); }}
              items={SLOTS.map(([k, name]) => {
                const n = count(k);
                const pc = premiumCount(k);
                const total = parts.filter((p) => p.slot === k).length - pc;
                return [k, <span key={k}>{name} <span className="tabular-nums" style={n > perSlot ? { color: TONE.bad } : { opacity: 0.7 }}>{n}/{Math.min(perSlot, total)}</span>{pc ? <span className="tabular-nums" style={{ opacity: 0.7 }} title="Premium seti: her zaman açık, sınıra sayılmaz"> +{pc}</span> : null}</span>] as const;
              })}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input id="avatar-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Parça ara" aria-label="Parça ara" className={`${FIELD} min-w-0 flex-1 basis-40`} style={FIELD_STYLE} />
              <Segmented label="Nadirlik" items={[["all", "Hepsi"], ...RARITIES.map((r) => [r, RARITY_TR[r]] as const)] as const} value={rar} onChange={setRar} />
              <Segmented label="Durum" items={[["all", "Hepsi"], ["on", "Gösterilen"], ["off", "Kapalı"], ["premium", `Premium seti ${premiumCount()}`]] as const} value={state} onChange={setState} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-caption">
              <span className="muted">{list.length} parça görünüyor ·</span>
              <button type="button" className={BTN.small} onClick={() => bulk(true)} disabled={!list.length}>Görünenleri aç (sınıra kadar)</button>
              <button type="button" className={BTN.small} onClick={() => bulk(false)} disabled={!list.length}>Görünenleri kapat</button>
            </div>

            {list.length ? (
              <ul className="mt-3 grid gap-2 @xl:grid-cols-2 @4xl:grid-cols-3 @[80rem]:grid-cols-4">
                {list.map((p) => {
                  const prem = isPremium(p);
                  const checked = on.has(p.id) || prem;
                  const locked = always.includes(p.id) || prem;
                  const full = !checked && count(p.slot) >= perSlot;
                  const k = unlockOf(p);
                  const edited = p.id in unlocks && unlocks[p.id] !== savedUnlocks[p.id] || (p.id in unlocks) !== (p.id in savedUnlocks);
                  const isSel = current?.id === p.id;
                  return (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-tile border p-2 transition-colors"
                      style={{ borderColor: isSel ? "var(--color-brand)" : "var(--border)", boxShadow: isSel ? "inset 0 0 0 1px var(--color-brand)" : undefined, background: checked ? "var(--surface)" : "var(--surface-2)" }}
                    >
                      <button type="button" onClick={() => setSel(p.id)} aria-pressed={isSel} className="flex min-w-0 flex-1 items-center gap-3 text-left" style={{ opacity: checked ? 1 : 0.7 }}>
                        {p.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.icon} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-tile object-contain" style={{ background: "var(--surface-2)" }} />
                        ) : (
                          <span className="h-14 w-14 shrink-0 rounded-tile" style={{ background: "var(--surface-2)" }} />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-strong">{p.name}</span>
                          <span className="flex flex-wrap items-center gap-1.5 text-micro">
                            <span className="inline-block h-2 w-2 rounded-full" style={{ background: AVATAR_RARITY[p.rarity] ?? "var(--border)" }} />
                            <span className="muted">{RARITY_TR[p.rarity] ?? p.rarity}</span>
                            {prem ? <Badge tone="ok">Premium seti</Badge> : locked ? <Badge>her zaman açık</Badge> : null}
                            {edited ? <Badge tone="warn">koşul değişti</Badge> : null}
                          </span>
                          <span className="muted block truncate text-micro" title={k ? label.get(k) ?? k : undefined} aria-label={k ? label.get(k) ?? k : undefined}>{k ? label.get(k) ?? k : "Herkese açık"}</span>
                          <span className="faint block text-micro tabular-nums">{usage.equipped[p.id] ?? 0} takıyor · {openCount(p)} açık · {grantCount(p.id)} verildi</span>
                        </span>
                      </button>
                      <Checkbox checked={checked} disabled={locked || full} onChange={(v) => toggle(p.id, v)}>
                        <span className="sr-only">{p.name} kullanıcıya gösterilsin</span>
                      </Checkbox>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="mt-3"><Empty>Bu süzgeçte parça yok.</Empty></div>
            )}
          </Panel>

          <div className="min-w-0 @5xl:sticky @5xl:top-20">
            {current ? (
              <PartDetail
                key={current.id}
                part={current}
                unlock={unlockOf(current)}
                onUnlock={(k) => setUnlocks((u) => {
                  const n = { ...u };
                  if (k === current.defaultUnlock) delete n[current.id];
                  else n[current.id] = k;
                  return n;
                })}
                options={options}
                label={label}
                shown={on.has(current.id) || isPremium(current)}
                equipped={usage.equipped[current.id] ?? 0}
                open={openCount(current)}
                grants={grants.filter((g) => g.itemId === current.id)}
                busy={busy}
                onGrant={async (user) => {
                  setBusy(true);
                  setMsg(null);
                  try {
                    const d = await post({ action: "grant_item", user, itemId: current.id });
                    if (!d) return false;
                    setGrants((g) => [{ itemId: current.id, userId: String(d.userId), label: String(d.label), source: "admin", at: new Date().toISOString() }, ...g.filter((x) => !(x.itemId === current.id && x.userId === d.userId))]);
                    setMsg({ tone: "ok", text: `${current.name} verildi: ${String(d.label)}.` });
                    return true;
                  } finally {
                    setBusy(false);
                  }
                }}
                onRevoke={async (userId) => {
                  setBusy(true);
                  setMsg(null);
                  try {
                    const d = await post({ action: "revoke_item", userId, itemId: current.id });
                    if (!d) return;
                    setGrants((g) => g.filter((x) => !(x.itemId === current.id && x.userId === userId)));
                    setMsg({ tone: "ok", text: `${current.name} geri alındı.` });
                  } finally {
                    setBusy(false);
                  }
                }}
              />
            ) : (
              <Panel><Empty>Parça seçilmedi.</Empty></Panel>
            )}
          </div>
        </div>
      </AdminPage>
    </AvatarCatalogProvider>
  );
}

function PartDetail({ part, unlock, onUnlock, options, label, shown, equipped, open, grants, busy, onGrant, onRevoke }: {
  part: AdminPart;
  unlock: string;
  onUnlock: (k: string) => void;
  options: { key: string; label: string }[];
  label: Map<string, string>;
  shown: boolean;
  equipped: number;
  open: number;
  grants: AvatarUsage["grants"];
  busy: boolean;
  onGrant: (user: string) => Promise<boolean>;
  onRevoke: (userId: string) => Promise<void>;
}) {
  const [user, setUser] = useState("");
  const [armed, setArmed] = useState<string | null>(null);
  return (
    <Panel title={part.name} hint={`${slotName(part.slot)} · ${RARITY_TR[part.rarity] ?? part.rarity} · ${part.id}`}>
      <div className="flex items-center gap-4">
        <MascotAvatar config={previewConfig(part)} size={128} />
        <dl className="grid flex-1 grid-cols-1 gap-2 text-caption">
          <div><dt className="muted">Durum</dt><dd className="text-strong" style={{ color: shown ? TONE.ok : undefined }}>{shown ? "Kullanıcıya gösteriliyor" : "Kapalı"}</dd></div>
          <div><dt className="muted">Takan</dt><dd className="text-strong tabular-nums">{equipped} kişi</dd></div>
          <div><dt className="muted">Koşulu sağlayan</dt><dd className="text-strong tabular-nums">{open} kişi</dd></div>
        </dl>
      </div>

      <div className="mt-5">
        <label htmlFor="avatar-unlock" className="muted mb-1 block text-micro uppercase tracking-eyebrow">Açılış koşulu</label>
        <select id="avatar-unlock" value={unlock} onChange={(e) => onUnlock(e.target.value)} className={FIELD} style={FIELD_STYLE}>
          <option value="">Herkese açık (koşul yok)</option>
          {options.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
        <p className="faint mt-1 text-micro">
          Varsayılan: {part.defaultUnlock ? label.get(part.defaultUnlock) ?? part.defaultUnlock : "herkese açık"}
          {unlock !== part.defaultUnlock ? <> · <button type="button" className="underline" onClick={() => onUnlock(part.defaultUnlock)}>varsayılana dön</button></> : null}
          {". Kaydet'e basınca yürürlüğe girer."}
        </p>
      </div>

      <div className="mt-5">
        <div className="muted mb-1 text-micro uppercase tracking-eyebrow">Bir hesaba ver</div>
        <form
          className="flex gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (user.trim() && (await onGrant(user.trim()))) setUser("");
          }}
        >
          <input id="avatar-grant-user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="E-posta, kullanıcı adı ya da kimlik" aria-label="Parça verilecek hesap" className={`${FIELD} min-w-0 flex-1`} style={FIELD_STYLE} />
          <button type="submit" className={BTN.secondary} disabled={busy || !user.trim()}>Ver</button>
        </form>
        <p className="faint mt-1 text-micro">Koşuldan bağımsız açılır; işlem kaydına düşer.</p>
      </div>

      <div className="mt-5">
        <div className="muted mb-1 text-micro uppercase tracking-eyebrow">Ayrıca verilen ({grants.length})</div>
        {grants.length ? (
          <ul className="divide-y text-caption" style={{ borderColor: "var(--hairline)" }}>
            {grants.map((g) => (
              <li key={g.userId} className="flex items-center gap-2 py-1.5" style={{ borderColor: "var(--hairline)" }}>
                <a href={`/admin/users/${encodeURIComponent(g.userId)}`} className="min-w-0 flex-1 truncate underline-offset-2 hover:underline">{g.label || `${g.userId.slice(0, 10)}…`}</a>
                <span className="faint shrink-0 text-micro">{g.source} · {when(g.at, false)}</span>
                {armed === g.userId ? (
                  <>
                    <button type="button" className={BTN.small} disabled={busy} onClick={() => { setArmed(null); void onRevoke(g.userId); }} style={{ color: TONE.bad }}>Evet, geri al</button>
                    <button type="button" className={BTN.small} onClick={() => setArmed(null)}>Vazgeç</button>
                  </>
                ) : (
                  <button type="button" className={BTN.small} disabled={busy} onClick={() => setArmed(g.userId)}>Geri al</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted text-caption">Kimseye ayrıca verilmedi.</p>
        )}
      </div>
    </Panel>
  );
}
