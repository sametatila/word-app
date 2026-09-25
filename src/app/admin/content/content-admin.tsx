"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import type { ContentAdminData, ContentFlag } from "@/lib/admin-content";
import { AdminPage, Badge, BTN, DataTable, Field, FIELD, FIELD_STYLE, Notice, PageHeader, Panel, Stat, Stats, TONE, when, type Tone } from "../_ui/ui";
import { TwoStep } from "../_ui/two-step";
import { isGatedPack } from "@/lib/content/ids";

/**
 * İçerik sürümü — panelin içerik hattındaki İKİ yetkisi.
 *
 *   1. SÜRÜM ÇEVİRMEK: listeden bir sürümü canlıya almak. Geri almanın tek
 *      yolu bu; gövdeler zaten tabloda, hiçbir şey yeniden yayınlanmıyor.
 *   2. MADDE KAPATMAK: bozuk bir konuşmayı, egzersizi ya da deneme sınavını
 *      düzeltmesi git'te yazılıp yayınlanana kadar gizlemek.
 *
 * İçerik burada DÜZENLENMİYOR (Samet'in kararı, AGENTS.md "İçerik teslim
 * hattı"): doğruluk kaynağı `data/**`, yayın `npm run content:publish`.
 */
const REASON_TR: Record<string, string> = { broken: "Bozuk", reported: "Şikâyet", legal: "Hukuki", other: "Diğer" };
const STATUS_TONE: Record<string, Tone | undefined> = { live: "ok", draft: "info", retired: undefined };
const STATUS_TR: Record<string, string> = { live: "canlı", draft: "taslak", retired: "emekli" };

async function post(body: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await apiFetch("/api/admin/content", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) return null;
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return data.error === "not_found" ? "Bu madde canlı sürümde yok: paket ve madde kimliğini kontrol et." : adminErrorText(data.error ?? res.status);
  } catch {
    return adminErrorText("network");
  }
}

const kb = (b: number) => (b >= 1_048_576 ? `${Math.round(b / 104_857.6) / 10} MB` : `${Math.round(b / 1024)} KB`);

export function ContentAdmin({ data }: { data: ContentAdminData }) {
  const [live, setLive] = useState(data.live);
  const [flags, setFlags] = useState<ContentFlag[]>(data.flags);
  const [pack, setPack] = useState(data.packs[0]?.pack ?? "");
  const [item, setItem] = useState("");
  const [reason, setReason] = useState("broken");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: Tone; text: string } | null>(null);

  async function run(body: Record<string, unknown>, ok: string, after: () => void) {
    setBusy(true);
    setMsg(null);
    const err = await post(body);
    setBusy(false);
    if (err) setMsg({ tone: "bad", text: err });
    else {
      after();
      setMsg({ tone: "ok", text: ok });
    }
  }

  const liveRelease = data.releases.find((r) => r.version === live);

  return (
    <AdminPage>
      <PageHeader
        title="İçerik sürümü"
        description="Konuşmalar, beceri egzersizleri, deneme sınavları ve anadil sözlükleri veritabanından servis ediliyor. Burada sürüm çevrilir ve bozuk madde kapatılır; içerik git'te düzenlenip npm run content:publish ile yayınlanır."
      />
      {data.issues.length ? (
        <Notice tone="bad" title={`${data.issues.length} sorgu başarısız`}>
          <span className="text-caption">{data.issues.map((i) => `${i.source}: ${i.message}`).join(" · ")}</span>
        </Notice>
      ) : null}
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}

      <Panel title="Canlı durum">
        <Stats cols={4}>
          <Stat label="Canlı sürüm" value={live ? `v${live}` : "yok"} sub={liveRelease?.liveAt ? `canlıya alındı ${when(liveRelease.liveAt)}` : undefined} tone={live ? "ok" : "bad"} />
          <Stat label="Paket" value={data.packs.length} sub={`${data.packs.reduce((a, p) => a + p.items, 0)} madde`} />
          <Stat label="Boyut" value={kb(data.packs.reduce((a, p) => a + p.bytes, 0))} sub="sıkıştırılmamış" />
          <Stat label="Kapalı madde" value={flags.length} tone={flags.length ? "warn" : undefined} sub="sürümden bağımsız" />
        </Stats>
      </Panel>

      <Panel
        title="Madde kapat"
        hint="Kapatma göstergeye en geç 30 saniyede düşer; cihazında gövdesi olan istemci de maddeyi gizler. Konuşma ve egzersizde madde kimliği konuşmanın/egzersizin kimliği (de-a1-hallo), deneme sınavında sınavın kimliği (de-b1-01). Hangi maddenin sorunlu olduğunu madde analizi gösteriyor: /admin/learning — haftalık quiz maddeleri: /admin/quiz"
      >
        <form
          className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_10rem_auto] sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            const id = item.trim();
            if (!pack || !id) return;
            void run({ action: "disable", pack, item: id, reason }, `${pack} › ${id} kapatıldı.`, () => {
              setFlags((f) => [{ pack, item: id, reason, by: "sen", at: new Date().toISOString() }, ...f.filter((x) => !(x.pack === pack && x.item === id))]);
              setItem("");
            });
          }}
        >
          <Field label="Paket">
            <select aria-label="Paket" value={pack} onChange={(e) => setPack(e.target.value)} className={FIELD} style={FIELD_STYLE}>
              {data.packs.map((p) => <option key={p.pack} value={p.pack}>{p.pack} ({p.items})</option>)}
              <option value="quiz/de">quiz/de (haftalık quiz)</option>
              <option value="quiz/en">quiz/en (haftalık quiz)</option>
            </select>
          </Field>
          <Field label="Madde kimliği">
            <input aria-label="Madde kimliği" value={item} onChange={(e) => setItem(e.target.value)} placeholder="de-a1-hallo" className={`${FIELD} font-mono`} style={FIELD_STYLE} />
          </Field>
          <Field label="Sebep">
            <select aria-label="Sebep" value={reason} onChange={(e) => setReason(e.target.value)} className={FIELD} style={FIELD_STYLE}>
              {Object.entries(REASON_TR).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </Field>
          <button type="submit" disabled={busy || !pack || !item.trim()} className={BTN.primary}>Kapat</button>
        </form>
      </Panel>

      <Panel title="Kapalı maddeler" hint="Düzeltmesi yayınlanınca buradan yeniden aç: kapatma sürüm değişince kendiliğinden kalkmaz." flush>
        <DataTable
          empty="Kapalı madde yok."
          head={["Paket", "Madde", "Sebep", "Kapatan", "Zaman", ""]}
          rows={flags.map((f) => [
            <span key="p" className="font-mono">{f.pack}</span>,
            <span key="i" className="font-mono">{f.item}</span>,
            REASON_TR[f.reason] ?? (f.reason || "—"),
            f.by || "—",
            <span key="t" className="whitespace-nowrap">{when(f.at)}</span>,
            <button
              key="a"
              type="button"
              disabled={busy}
              className={BTN.small}
              onClick={() => void run({ action: "enable", pack: f.pack, item: f.item }, `${f.pack} › ${f.item} yeniden açıldı.`, () => setFlags((x) => x.filter((y) => !(y.pack === f.pack && y.item === f.item))))}
            >
              Aç
            </button>,
          ])}
        />
      </Panel>

      <Panel title="Sürümler" hint="Geri almak için eski bir sürümü canlıya al. Gövdeler tabloda duruyor; istemci yalnız değişen maddeleri indirir." flush>
        <DataTable
          empty="Henüz yayın yok: sunucuda npm run content:publish."
          head={["Sürüm", "Durum", { label: "Madde", align: "right" }, "Not", "Commit", "Yayınlayan", "Oluşturuldu", ""]}
          rows={data.releases.map((r) => {
            const status = r.version === live ? "live" : r.status === "live" ? "retired" : r.status;
            return [
              <b key="v">v{r.version}</b>,
              <Badge key="s" tone={STATUS_TONE[status]}>{STATUS_TR[status] ?? status}</Badge>,
              r.items,
              <span key="n" className="block max-w-xs truncate">{r.note || "—"}</span>,
              <span key="c" className="font-mono">{r.commit ? r.commit.slice(0, 8) : "—"}</span>,
              r.by || "—",
              <span key="t" className="whitespace-nowrap">{when(r.createdAt)}</span>,
              r.version === live ? (
                <span key="a" style={{ color: TONE.ok }}>canlı</span>
              ) : (
                <TwoStep
                  key="a"
                  small
                  label={r.version < live ? "Geri al" : "Canlıya al"}
                  confirm={`Evet, v${r.version} canlıya`}
                  disabled={busy}
                  onConfirm={() => void run({ action: "promote", version: r.version }, `v${r.version} canlıda: istemciler en geç 30 saniyede geçer.`, () => setLive(r.version))}
                />
              ),
            ];
          })}
        />
      </Panel>

      {/* GERİ ALMANIN DAYANAĞI. Sürüm listesi "geri al" düğmesini veriyordu
          ama neyin geri alınacağını söylemiyordu; neyi geri aldığını bilmeden
          basılan bir düğme, olmayan düğmeden kötü. */}
      <Panel
        title="Canlı sürümde ne değişti"
        hint={
          data.diff.from
            ? `v${data.diff.from} → v${data.diff.to}. "Geri al" bu farkı tersine çeviriyor.`
            : "Karşılaştırılacak önceki sürüm yok."
        }
        flush
      >
        <DataTable
          empty={data.diff.from ? "Bu sürümde içerik değişmedi." : "İlk yayın: karşılaştırılacak sürüm yok."}
          head={["Paket", { label: "Eklendi", align: "right" }, { label: "Değişti", align: "right" }, { label: "Düştü", align: "right" }, "Maddeler"]}
          rows={data.diff.packs.map((d) => [
            <span key="p" className="font-mono">{d.pack}</span>,
            d.added.length || "—",
            d.changed.length || "—",
            d.removed.length ? <b key="r" style={{ color: TONE.bad }}>{d.removed.length}</b> : "—",
            /* İlk beş madde adıyla: karar "hangi maddeler" sorusuna dayanıyor,
               yalnız sayıya değil. Gerisi sayı olarak söyleniyor. */
            <span key="i" className="font-mono line-clamp-2">
              {[...d.changed, ...d.added, ...d.removed].slice(0, 5).join(", ")}
              {[...d.changed, ...d.added, ...d.removed].length > 5
                ? ` +${[...d.changed, ...d.added, ...d.removed].length - 5}`
                : ""}
            </span>,
          ])}
        />
      </Panel>

      <Panel title="Canlı sürümün paketleri" flush>
        <DataTable
          empty="Canlı sürüm yok."
          head={["Paket", { label: "Madde", align: "right" }, { label: "Boyut", align: "right" }, "Erişim"]}
          rows={data.packs.map((p) => [
            <span key="p" className="font-mono">{p.pack}</span>,
            p.items,
            kb(p.bytes),
            /* Kapı kararı `isGatedPack`ta: burada öneki ayrıca yazmak, yeni bir
               kapılı paketi panelde "açık" gösterirdi. */
            isGatedPack(p.pack) ? (
              <Badge key="g" tone="warn">{p.pack.startsWith("papers/") ? "kapılı (premium)" : "kapılı (yalnız sunucu)"}</Badge>
            ) : (
              <Badge key="g">açık</Badge>
            ),
          ])}
        />
      </Panel>
    </AdminPage>
  );
}
