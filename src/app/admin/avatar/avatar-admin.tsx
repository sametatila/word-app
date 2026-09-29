"use client";

import { useMemo, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { Checkbox } from "@/components/checkbox";
import { AVATAR_RARITY } from "@/lib/avatar-config";
import { AdminPage, AdminTabs, Badge, BTN, Notice, PageHeader, Panel } from "../_ui/ui";

/**
 * Avatar envanteri görünümü: yuva sekmeleri, her parça için ikon, ad,
 * nadirlik, açılış koşulu ve "kullanıcıya göster" kutusu. Yuva başına sınır
 * dolunca kapalı parçalar seçilemez. Kaydet tek istek (bütün liste).
 */
export type AdminPart = { id: string; slot: string; rarity: string; name: string; icon: string | null; unlock: string | null };

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
const RARITY_TR: Record<string, string> = { common: "Sıradan", rare: "Nadir", epic: "Epik", legendary: "Efsanevi" };
const ERR: Record<string, string> = {
  too_many: "Bu yuvada sınır aşıldı.",
  no_catalog: "Katalog okunamadı.",
};

export function AvatarAdmin({ parts, active, defaults, always, perSlot, catalogOn }: {
  parts: AdminPart[];
  active: string[];
  defaults: string[];
  always: string[];
  perSlot: number;
  catalogOn: boolean;
}) {
  const [slot, setSlot] = useState<Slot>("hat");
  const [on, setOn] = useState<Set<string>>(() => new Set(active));
  const [saved, setSaved] = useState<Set<string>>(() => new Set(active));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);

  const count = (s: string) => parts.filter((p) => p.slot === s && on.has(p.id)).length;
  const dirty = on.size !== saved.size || [...on].some((id) => !saved.has(id));
  const list = useMemo(() => {
    const order = ["common", "rare", "epic", "legendary"];
    return parts.filter((p) => p.slot === slot).sort((a, b) => Number(on.has(b.id)) - Number(on.has(a.id)) || order.indexOf(a.rarity) - order.indexOf(b.rarity));
    // Sıralama yalnız sekme değişince ve kayıttan sonra yenilensin: kutu
    // işaretlenince satır yer değiştirmesin.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parts, slot, saved]);

  const toggle = (id: string, v: boolean) => setOn((cur) => {
    const n = new Set(cur);
    if (v) n.add(id); else n.delete(id);
    return n;
  });

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/admin/avatar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "save_active", ids: [...on] }) });
      const data = (await res.json().catch(() => ({}))) as { ids?: string[]; error?: string; slot?: string };
      if (!res.ok || !data.ids) {
        setMsg({ tone: "bad", text: (ERR[data.error ?? ""] ?? adminErrorText(data.error ?? res.status)) + (data.slot ? ` (${SLOTS.find((s) => s[0] === data.slot)?.[1] ?? data.slot})` : "") });
      } else {
        const s = new Set(data.ids);
        setOn(s);
        setSaved(s);
        setMsg({ tone: "ok", text: "Kaydedildi. Kullanıcılarda birkaç dakika içinde yürürlükte." });
      }
    } catch {
      setMsg({ tone: "bad", text: "Bağlantı hatası." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminPage>
      <PageHeader
        title="Avatar parçaları"
        description={`Kullanıcı her yuvada en fazla ${perSlot} parça görür. Kapalı parçalar silinmez; zamanla buradan açılır. Takılı bir parça kapatılırsa kullanıcıda kalır, yalnız yeniden seçilemez.`}
        actions={
          <div className="flex gap-2">
            <button type="button" className={BTN.secondary} disabled={busy} onClick={() => setOn(new Set(defaults))}>Varsayılana dön</button>
            <button type="button" className={BTN.primary} disabled={busy || !dirty} onClick={save}>{busy ? "Kaydediliyor…" : "Kaydet"}</button>
          </div>
        }
      />
      {!catalogOn ? <Notice tone="warn" title="3B katalog kapalı">AVATAR_3D_BASE boş: kullanıcılar 2B maskotu görüyor, bu liste şu an etkisiz.</Notice> : null}
      {msg ? <Notice tone={msg.tone} role="status">{msg.text}</Notice> : null}
      <Panel title="Envanter">
        <AdminTabs
          label="Yuva"
          value={slot}
          onChange={setSlot}
          items={SLOTS.map(([k, label]) => [k, `${label} ${count(k)}/${Math.min(perSlot, parts.filter((p) => p.slot === k).length)}`] as const)}
        />
        <ul className="mt-3 grid gap-2 @xl:grid-cols-2 @4xl:grid-cols-3">
          {list.map((p) => {
            const checked = on.has(p.id);
            const locked = always.includes(p.id);
            const full = !checked && count(p.slot) >= perSlot;
            return (
              <li key={p.id} className="flex items-center gap-3 rounded-tile border p-2" style={{ borderColor: checked ? "var(--color-brand)" : "var(--border)", opacity: full ? 0.55 : 1 }}>
                {p.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.icon} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 object-contain" />
                ) : (
                  <span className="h-12 w-12 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-strong">{p.name}</p>
                  <p className="flex flex-wrap items-center gap-1.5 text-micro">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: AVATAR_RARITY[p.rarity] ?? "var(--border)" }} />
                    <span className="muted">{RARITY_TR[p.rarity] ?? p.rarity}</span>
                    {locked ? <Badge>her zaman açık</Badge> : null}
                  </p>
                  <p className="muted truncate text-micro">{p.unlock ?? "Herkese açık"}</p>
                </div>
                <Checkbox checked={checked} disabled={locked || full} onChange={(v) => toggle(p.id, v)}>
                  <span className="sr-only">{p.name} kullanıcıya gösterilsin</span>
                </Checkbox>
              </li>
            );
          })}
        </ul>
      </Panel>
    </AdminPage>
  );
}
