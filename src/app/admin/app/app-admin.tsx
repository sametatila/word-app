"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import type { AppControl } from "@/lib/app-control-shared";
import type { AppAdminData } from "@/lib/admin-app";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, Badge, BTN, DataTable, Field, FIELD, FIELD_STYLE, Notice, PageHeader, Panel, TONE, when as fmtWhen } from "../_ui/ui";
import { TwoStep } from "../_ui/two-step";

/**
 * Uygulama işletimi görünümü — dört bölüm, yazma olanlar önce:
 *   1. Güncelleme & mağaza   2. Bakım modu   3. Toplu bildirim
 *   4. Dayanak: sürüm dağılımı, silme kaydı, askıdaki hesaplar.
 */

type Broadcast = { id: number; at: string; title: string; audience: string; targeted: number; delivered: number; state: string; admin: string };
type Lang = "tr" | "en" | "de";
const LANGS: Lang[] = ["tr", "en", "de"];
const LANG_TR: Record<Lang, string> = { tr: "Türkçe", en: "İngilizce", de: "Almanca" };
const ERROR_TR: Record<string, string> = {
  cooldown: "Son toplu bildirimden bu yana 12 saat geçmedi.",
  empty: "En az bir dilde başlık ve metin gerekli.",
  no_targets: "Bu filtreyle bildirim alabilecek kullanıcı yok (metni dolu dillerde).",
  not_service: "Toplu bildirim yalnız hizmet duyurusu olabilir: onay kutusunu işaretle.",
  forbidden: "Yetki yok.",
};
const DELETE_SOURCE: Record<string, string> = { self: "Kullanıcı kendisi", admin: "Panelden", guest: "Misafir (atma/süre)" };

const when = (v: string) => (v ? fmtWhen(v) : "");

async function post(body: Record<string, unknown>): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  try {
    const res = await apiFetch("/api/admin/app", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { error: "network" } };
  }
}

export function AppAdmin({
  control,
  data,
  broadcasts,
  nextBroadcastAt,
}: {
  control: AppControl;
  data: AppAdminData;
  broadcasts: Broadcast[];
  nextBroadcastAt: string | null;
}) {
  const [cfg, setCfg] = useState<AppControl>(control);
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(next: AppControl, note: string) {
    setBusy(true);
    setMsg(null);
    const r = await post({ action: "save_control", control: next });
    setBusy(false);
    if (r.ok && r.data.control) {
      setCfg(r.data.control as AppControl);
      setMsg({ tone: "ok", text: note });
    } else setMsg({ tone: "bad", text: `Kaydedilemedi: ${adminErrorText(String(r.data.error ?? ""))}` });
  }

  const setNum = (group: "minBuild" | "latestBuild", p: "ios" | "android", v: string) =>
    setCfg((c) => ({ ...c, [group]: { ...c[group], [p]: Math.max(0, Math.round(Number(v) || 0)) } }));

  const maxBuild = (p: string) => Math.max(0, ...data.versions.filter((v) => v.platform === p).map((v) => v.build));
  const affected = (p: "ios" | "android", below: number) =>
    data.versions.filter((v) => v.platform === p && v.build < below).reduce((a, v) => a + v.users, 0);

  return (
    <AdminPage>
      <PageHeader
        title="Uygulama işletimi"
        description="Güncelleme zorunluluğu, bakım modu, mağaza bağlantıları ve toplu bildirim. Kayıt en geç 5 dakikada uygulamalara ulaşır."
        meta={<>Bakım: <b style={{ color: cfg.maintenance.enabled ? TONE.bad : TONE.ok }}>{cfg.maintenance.enabled ? "AÇIK" : "kapalı"}</b> · Android min {cfg.minBuild.android || "—"} · iOS min {cfg.minBuild.ios || "—"}</>}
      />
      {data.issues.length ? (
        <Notice tone="bad" title={`${data.issues.length} sorgu başarısız`}>
          <span className="text-caption">{data.issues.map((i) => i.message).join(" · ").slice(0, 300)}</span>
        </Notice>
      ) : null}
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}

      <Panel
        title="Güncelleme ve mağaza"
        hint="Build = versionCode. En düşüğün altındaki uygulama açılışta güncelleme ekranında kalır; en sonun altındaki kapatılabilir şerit görür. Yalnız bu özelliği taşıyan build'lerde çalışır; daha eskiler etkilenmez."
        actions={<button type="button" disabled={busy} onClick={() => save(cfg, "Kaydedildi — en geç 5 dakikada uygulamalarda.")} className={BTN.primary}>Kaydet</button>}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {(["android", "ios"] as const).map((p) => (
            <div key={p} className="space-y-3 rounded-tile border p-4 text-caption" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between gap-2">
                <b className="text-strong">{p === "ios" ? "iOS" : "Android"}</b>
                <span className="muted">görülen en yeni build: {maxBuild(p) || "—"}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="En düşük build (zorunlu)">
                  <input aria-label={`${p} en düşük build`} type="number" min={0} value={cfg.minBuild[p]} onChange={(e) => setNum("minBuild", p, e.target.value)} className={`${FIELD} text-right tabular-nums`} style={FIELD_STYLE} />
                </Field>
                <Field label="En son build (önerilen)">
                  <input aria-label={`${p} en son build`} type="number" min={0} value={cfg.latestBuild[p]} onChange={(e) => setNum("latestBuild", p, e.target.value)} className={`${FIELD} text-right tabular-nums`} style={FIELD_STYLE} />
                </Field>
              </div>
              {cfg.minBuild[p] > 0 ? <p style={{ color: TONE.bad }}>Zorunlu güncelleme ekranı görecek: {affected(p, cfg.minBuild[p])} kullanıcı</p> : null}
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cfg.store[p].live} onChange={(e) => setCfg((c) => ({ ...c, store: { ...c.store, [p]: { ...c.store[p], live: e.target.checked } } }))} />
                <span>Mağazada yayında (web satın almayı buraya yönlendirir)</span>
              </label>
              <Field label="Mağaza adresi">
                <input aria-label={`${p} mağaza adresi`} value={cfg.store[p].url} onChange={(e) => setCfg((c) => ({ ...c, store: { ...c.store, [p]: { ...c.store[p], url: e.target.value } } }))} className={`${FIELD} font-mono text-caption`} style={FIELD_STYLE} />
              </Field>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="Bakım modu"
        tone={cfg.maintenance.enabled ? "bad" : undefined}
        hint="Açıkken web uygulaması ve mobil uygulama bakım ekranı gösterir. Admin hesabı webde uygulamaya girmeye devam eder. Mesaj boşsa varsayılan metin gösterilir."
        actions={
          <TwoStep
            label={cfg.maintenance.enabled ? "Bakımı kapat" : "Bakımı aç"}
            confirm={cfg.maintenance.enabled ? "Evet, uygulamayı aç" : "Evet, herkes için bakım ekranı"}
            danger={!cfg.maintenance.enabled}
            disabled={busy}
            onConfirm={() => {
              const next = { ...cfg, maintenance: { ...cfg.maintenance, enabled: !cfg.maintenance.enabled } };
              void save(next, next.maintenance.enabled ? "Bakım AÇIK — en geç 5 dakikada herkes bakım ekranında." : "Bakım kapatıldı.");
            }}
          />
        }
      >
        <div className="mb-3 flex items-center gap-2 text-caption">
          Durum: {cfg.maintenance.enabled ? <Badge tone="bad">BAKIMDA</Badge> : <Badge tone="ok">kapalı</Badge>}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {LANGS.map((l) => (
            <Field key={l} label={`${LANG_TR[l]} mesaj`}>
              <input aria-label={`${LANG_TR[l]} bakım mesajı`} value={cfg.maintenance.message[l]} maxLength={400} onChange={(e) => setCfg((c) => ({ ...c, maintenance: { ...c.maintenance, message: { ...c.maintenance.message, [l]: e.target.value } } }))} className={FIELD} style={FIELD_STYLE} />
            </Field>
          ))}
        </div>
      </Panel>

      <Broadcaster broadcasts={broadcasts} nextAt={nextBroadcastAt} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Sürüm dağılımı" hint="Mobil uygulamanın her isteğinde gönderdiği sürüm bilgisinden. Bu özelliği taşımayan eski build'ler burada görünmez." flush>
          <DataTable
            empty="Henüz sürüm bildiren uygulama yok (yeni build yayımlanınca dolacak)."
            head={["Platform", "Sürüm", { label: "Build", align: "right" }, { label: "Kullanıcı", align: "right" }, { label: "7 günde aktif", align: "right" }]}
            rows={data.versions.map((v) => [v.platform, v.version, v.build, v.users, v.active7])}
          />
        </Panel>

        <Panel title="Hesap silmeleri" hint="Kimlik tutulmaz; yalnız yol, hesabın yaşı ve panel silmelerinde gerekçe." flush>
          <DataTable
            head={["Yol", { label: "30 gün", align: "right" }, { label: "Toplam", align: "right" }, { label: "Ort. yaş (gün)", align: "right" }, "Gerekçeler"]}
            rows={data.deletions.map((d) => [DELETE_SOURCE[d.source] ?? d.source, d.count30, d.total, d.avgAgeDays, d.reasons || "—"])}
          />
        </Panel>
      </div>

      <Panel title="Askıdaki hesaplar" hint="Askıya alma ve kaldırma kullanıcı detay sayfasından yapılır." flush>
        <DataTable
          empty="Askıda hesap yok."
          head={["Hesap", "Gerekçe", "Bitiş", "Başlangıç", "Veren"]}
          rows={data.suspensions.map((s) => [
            <a key="n" href={`/admin/users/${encodeURIComponent(s.userId)}`} className="text-strong underline-offset-2 hover:underline">{s.name || s.userId.slice(0, 10)}</a>,
            s.reason, s.until ? when(s.until) : "süresiz", when(s.at), s.admin,
          ])}
        />
      </Panel>
    </AdminPage>
  );
}

function Broadcaster({ broadcasts, nextAt }: { broadcasts: Broadcast[]; nextAt: string | null }) {
  const [text, setText] = useState<Record<Lang, { title: string; body: string }>>({ tr: { title: "", body: "" }, en: { title: "", body: "" }, de: { title: "", body: "" } });
  const [url, setUrl] = useState("/learn");
  const [native, setNative] = useState("");
  const [course, setCourse] = useState("");
  const [platform, setPlatform] = useState("all");
  const [service, setService] = useState(false);
  const [counts, setCounts] = useState<Record<Lang, number> | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [list, setList] = useState(broadcasts);

  const audience = (test: boolean) => ({ native, course, platform, test, service });
  const cooling = nextAt && new Date(nextAt).getTime() > Date.now();

  async function preview() {
    setBusy(true);
    const r = await post({ action: "preview_broadcast", audience: audience(false) });
    setBusy(false);
    if (r.ok) setCounts(r.data.counts as Record<Lang, number>);
  }
  async function send(test: boolean) {
    setBusy(true);
    setMsg(null);
    const r = await post({ action: "send_broadcast", text, url, audience: audience(test) });
    setBusy(false);
    if (!r.ok) {
      setMsg({ tone: "bad", text: ERROR_TR[String(r.data.error)] ?? adminErrorText(String(r.data.error ?? "")) });
      return;
    }
    setMsg({ tone: "ok", text: test ? "Test bildirimi kendi hesabına gönderildi." : `Gönderim başladı: ${String(r.data.targeted)} kullanıcı.` });
    setList((l) => [{ id: Number(r.data.id), at: new Date().toISOString(), title: text.tr.title || text.en.title || text.de.title, audience: test ? "TEST" : "yeni", targeted: Number(r.data.targeted), delivered: 0, state: "sending", admin: "" }, ...l]);
  }

  const reach = counts ? LANGS.filter((l) => text[l].title && text[l].body).reduce((a, l) => a + counts[l], 0) : null;

  return (
    <Panel
      title="Toplu bildirim"
      hint="Bildirim kanalı çalışan ve bildirimleri kapatmamış kullanıcılara, kendi dillerinde gider; metni boş dildekine gitmez. Önce kendine test gönder. Test dışı gönderim 12 saatte bir."
    >
      <Notice tone="warn" title="Yalnız hizmet duyurusu">
        Bakım, güvenlik, hesabı ya da kullanımı etkileyen önemli değişiklik. Tanıtım, kampanya, indirim ve &quot;geri dön&quot; mesajı gönderilmez (Elektronik Ticaret Kanunu ve App Store 4.5.4 önceden onay istiyor).
      </Notice>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {LANGS.map((l) => (
          <div key={l} className="space-y-2 rounded-tile border p-3" style={{ borderColor: "var(--border)" }}>
            <div className="text-strong">{LANG_TR[l]}</div>
            <input value={text[l].title} maxLength={60} placeholder="Başlık (60)" aria-label={`${LANG_TR[l]} başlık`} onChange={(e) => setText((t) => ({ ...t, [l]: { ...t[l], title: e.target.value } }))} className={FIELD} style={FIELD_STYLE} />
            <textarea value={text[l].body} maxLength={180} rows={3} placeholder="Metin (180)" aria-label={`${LANG_TR[l]} metin`} onChange={(e) => setText((t) => ({ ...t, [l]: { ...t[l], body: e.target.value } }))} className="w-full min-w-0 rounded-tile border px-3 py-2 text-body" style={FIELD_STYLE} />
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Açılacak yol">
          <input aria-label="Açılacak yol" value={url} onChange={(e) => setUrl(e.target.value)} className={`${FIELD} font-mono`} style={FIELD_STYLE} />
        </Field>
        <Field label="Anadil">
          <select value={native} onChange={(e) => { setNative(e.target.value); setCounts(null); }} className={FIELD} style={FIELD_STYLE}>
            <option value="">Tüm diller</option><option value="tr">tr</option><option value="en">en</option><option value="de">de</option>
          </select>
        </Field>
        <Field label="Kurs">
          <select value={course} onChange={(e) => { setCourse(e.target.value); setCounts(null); }} className={FIELD} style={FIELD_STYLE}>
            <option value="">Tüm kurslar</option><option value="de">de</option><option value="en">en</option><option value="gsw-zh">gsw-zh</option>
          </select>
        </Field>
        <Field label="Kanal">
          <select value={platform} onChange={(e) => { setPlatform(e.target.value); setCounts(null); }} className={FIELD} style={FIELD_STYLE}>
            <option value="all">Tüm kanallar</option><option value="android">Android</option><option value="ios">iOS</option><option value="web">Web push</option>
          </select>
        </Field>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-caption">
        <button type="button" disabled={busy} onClick={preview} className={BTN.secondary}>Kaç kişiye gider?</button>
        {counts ? <span>tr {counts.tr} · en {counts.en} · de {counts.de} → metni dolu dillerde <b>{reach}</b> kişi</span> : null}
      </div>
      <label className="mt-3 flex items-start gap-2 text-caption">
        <input type="checkbox" checked={service} onChange={(e) => setService(e.target.checked)} className="mt-0.5" />
        <span>Bu bir <b>hizmet duyurusudur</b>; tanıtım, kampanya, indirim ya da uygulamaya geri çağırma içermez.</span>
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3 text-caption" style={{ borderColor: "var(--hairline)" }}>
        <button type="button" disabled={busy} onClick={() => send(true)} className={BTN.secondary}>Kendime test gönder</button>
        {cooling ? (
          <span className="muted">Sonraki gönderim: {when(nextAt ?? "")}</span>
        ) : (
          <TwoStep label="Herkese gönder" confirm={`Evet, ${reach ?? "?"} kişiye gönder`} disabled={busy || !service || reach == null || reach === 0} onConfirm={() => void send(false)} />
        )}
      </div>
      {msg ? <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div> : null}
      {list.length ? (
        <div className="mt-4">
          <div className="muted mb-1.5 text-micro uppercase tracking-eyebrow">Geçmiş</div>
          <DataTable
            head={["Zaman", "Başlık", "Kitle", { label: "Hedef", align: "right" }, { label: "Ulaşan kanal", align: "right" }, "Durum"]}
            rows={list.map((b) => [when(b.at), b.title, b.audience, b.targeted, b.delivered, <Badge key="s" tone={b.state === "done" ? "ok" : b.state === "failed" ? "bad" : undefined}>{b.state}</Badge>])}
          />
        </div>
      ) : null}
    </Panel>
  );
}
