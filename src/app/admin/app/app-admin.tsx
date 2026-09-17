"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import type { AppControl } from "@/lib/app-control-shared";
import type { AppAdminData } from "@/lib/admin-app";
import { adminErrorText } from "@/lib/admin-errors";

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

const when = (v: string) => (v ? new Date(v).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" }) : "");

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
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(next: AppControl, note: string) {
    setBusy(true);
    setMsg("");
    const r = await post({ action: "save_control", control: next });
    setBusy(false);
    if (r.ok && r.data.control) {
      setCfg(r.data.control as AppControl);
      setMsg(note);
    } else setMsg(`Kaydedilemedi: ${adminErrorText(String(r.data.error ?? ""))}`);
  }

  const setNum = (group: "minBuild" | "latestBuild", p: "ios" | "android", v: string) =>
    setCfg((c) => ({ ...c, [group]: { ...c[group], [p]: Math.max(0, Math.round(Number(v) || 0)) } }));

  const maxBuild = (p: string) => Math.max(0, ...data.versions.filter((v) => v.platform === p).map((v) => v.build));
  const affected = (p: "ios" | "android", below: number) =>
    data.versions.filter((v) => v.platform === p && v.build < below).reduce((a, v) => a + v.users, 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6">
      <header className="flex flex-col gap-1">
        <a href="/admin" className="text-caption" style={{ color: "var(--text-muted)" }}>← Yönetim</a>
        <h1 className="text-h1">Uygulama işletimi</h1>
        <p className="muted text-body">Güncelleme zorunluluğu, bakım modu, mağaza bağlantıları ve toplu bildirim. Kayıt en geç 5 dakikada uygulamalara ulaşır.</p>
        {msg ? <p role="status" className="text-caption" style={{ color: msg.startsWith("Kaydedilemedi") ? "var(--color-rose)" : "var(--color-mint)" }}>{msg}</p> : null}
      </header>

      <Section title="Güncelleme & mağaza" sub="Build = versionCode. En düşüğün altındaki uygulama açılışta güncelleme ekranında kalır; en sonun altındaki kapatılabilir şerit görür. Yalnız bu özelliği taşıyan build'lerde çalışır; daha eskiler etkilenmez.">
        <div className="grid gap-3 sm:grid-cols-2">
          {(["android", "ios"] as const).map((p) => (
            <div key={p} className="card space-y-2 px-3 py-3 text-caption">
              <div className="flex items-baseline justify-between">
                <b>{p === "ios" ? "iOS" : "Android"}</b>
                <span className="muted">görülen en yeni build: {maxBuild(p) || "—"}</span>
              </div>
              <label className="flex items-center justify-between gap-2">
                <span>En düşük build (zorunlu)</span>
                <input type="number" min={0} value={cfg.minBuild[p]} onChange={(e) => setNum("minBuild", p, e.target.value)} className="h-8 w-24 rounded-tile border px-2 text-right" style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }} />
              </label>
              {cfg.minBuild[p] > 0 ? <p style={{ color: "var(--color-rose)" }}>Etkilenecek: {affected(p, cfg.minBuild[p])} kullanıcı</p> : null}
              <label className="flex items-center justify-between gap-2">
                <span>En son build (önerilen)</span>
                <input type="number" min={0} value={cfg.latestBuild[p]} onChange={(e) => setNum("latestBuild", p, e.target.value)} className="h-8 w-24 rounded-tile border px-2 text-right" style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }} />
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cfg.store[p].live} onChange={(e) => setCfg((c) => ({ ...c, store: { ...c.store, [p]: { ...c.store[p], live: e.target.checked } } }))} />
                <span>Mağazada yayında (web satın almayı buraya yönlendirir)</span>
              </label>
              <input value={cfg.store[p].url} onChange={(e) => setCfg((c) => ({ ...c, store: { ...c.store, [p]: { ...c.store[p], url: e.target.value } } }))} aria-label={`${p} mağaza adresi`} className="h-8 w-full rounded-tile border px-2 font-mono" style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }} />
            </div>
          ))}
        </div>
        <button type="button" disabled={busy} onClick={() => save(cfg, "Kaydedildi — en geç 5 dakikada uygulamalarda.")} className="btn btn-primary mt-3 px-4 py-2 text-caption">Kaydet</button>
      </Section>

      <Section title="Bakım modu" sub="Açıkken web uygulaması ve mobil uygulama bakım ekranı gösterir. Admin hesabı webde uygulamaya girmeye devam eder. Mesaj boşsa varsayılan metin gösterilir.">
        <div className="card space-y-2 px-3 py-3 text-caption">
          <p>
            Durum: <b style={{ color: cfg.maintenance.enabled ? "var(--color-rose)" : "var(--color-mint)" }}>{cfg.maintenance.enabled ? "BAKIMDA" : "kapalı"}</b>
          </p>
          {LANGS.map((l) => (
            <label key={l} className="block">
              <span className="muted">{LANG_TR[l]} mesaj</span>
              <input value={cfg.maintenance.message[l]} maxLength={400} onChange={(e) => setCfg((c) => ({ ...c, maintenance: { ...c.maintenance, message: { ...c.maintenance.message, [l]: e.target.value } } }))} className="mt-1 h-8 w-full rounded-tile border px-2" style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }} />
            </label>
          ))}
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
        </div>
      </Section>

      <Broadcaster broadcasts={broadcasts} nextAt={nextBroadcastAt} />

      <Section title="Sürüm dağılımı" sub="Mobil uygulamanın her isteğinde gönderdiği sürüm bilgisinden. Bu özelliği taşımayan eski build'ler burada görünmez.">
        {data.versions.length ? (
          <Table
            head={["Platform", "Sürüm", "Build", "Kullanıcı", "7 günde aktif"]}
            rows={data.versions.map((v) => [v.platform, v.version, String(v.build), String(v.users), String(v.active7)])}
          />
        ) : (
          <Empty text="Henüz sürüm bildiren uygulama yok (yeni build yayımlanınca dolacak)." />
        )}
      </Section>

      <Section title="Hesap silmeleri" sub="Kimlik tutulmaz; yalnız yol, hesabın yaşı ve panel silmelerinde gerekçe.">
        {data.deletions.length ? (
          <Table
            head={["Yol", "30 gün", "Toplam", "Ort. hesap yaşı (gün)", "Gerekçeler"]}
            rows={data.deletions.map((d) => [DELETE_SOURCE[d.source] ?? d.source, String(d.count30), String(d.total), String(d.avgAgeDays), d.reasons || "—"])}
          />
        ) : (
          <Empty text="Kayıt yok." />
        )}
      </Section>

      <Section title="Askıdaki hesaplar" sub="Askıya alma ve kaldırma kullanıcı detay sayfasından yapılır.">
        {data.suspensions.length ? (
          <div className="space-y-1 text-caption">
            {data.suspensions.map((s) => (
              <div key={s.userId} className="flex flex-wrap items-baseline gap-x-2">
                <a href={`/admin/users/${encodeURIComponent(s.userId)}`} className="font-semibold underline-offset-2 hover:underline">{s.name || s.userId.slice(0, 10)}</a>
                <span>{s.reason}</span>
                <span className="muted">{s.until ? `bitiş ${when(s.until)}` : "süresiz"} · {when(s.at)} · {s.admin}</span>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Askıda hesap yok." />
        )}
      </Section>
    </div>
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
  const [msg, setMsg] = useState("");
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
    setMsg("");
    const r = await post({ action: "send_broadcast", text, url, audience: audience(test) });
    setBusy(false);
    if (!r.ok) {
      setMsg(ERROR_TR[String(r.data.error)] ?? adminErrorText(String(r.data.error ?? "")));
      return;
    }
    setMsg(test ? "Test bildirimi kendi hesabına gönderildi." : `Gönderim başladı: ${String(r.data.targeted)} kullanıcı.`);
    setList((l) => [{ id: Number(r.data.id), at: new Date().toISOString(), title: text.tr.title || text.en.title || text.de.title, audience: test ? "TEST" : "yeni", targeted: Number(r.data.targeted), delivered: 0, state: "sending", admin: "" }, ...l]);
  }

  const reach = counts ? LANGS.filter((l) => text[l].title && text[l].body).reduce((a, l) => a + counts[l], 0) : null;
  const field = { borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" };

  return (
    <Section title="Toplu bildirim" sub="YALNIZ HİZMET DUYURUSU: bakım, güvenlik, hesabı ya da kullanımı etkileyen önemli değişiklik. Tanıtım, kampanya, indirim ve 'geri dön' mesajı gönderilmez (Elektronik Ticaret Kanunu ve App Store 4.5.4 önceden onay istiyor). Bildirim kanalı çalışan ve bildirimleri kapatmamış kullanıcılara, kendi dillerinde gider; metni boş dildekine gitmez. Önce kendine test gönder. Test dışı gönderim 12 saatte bir.">
      <div className="card space-y-3 px-3 py-3 text-caption">
        {LANGS.map((l) => (
          <div key={l} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <span className="muted pt-1.5">{LANG_TR[l]}</span>
            <div className="space-y-1">
              <input value={text[l].title} maxLength={60} placeholder="Başlık (60)" aria-label={`${LANG_TR[l]} başlık`} onChange={(e) => setText((t) => ({ ...t, [l]: { ...t[l], title: e.target.value } }))} className="h-8 w-full rounded-tile border px-2" style={field} />
              <input value={text[l].body} maxLength={180} placeholder="Metin (180)" aria-label={`${LANG_TR[l]} metin`} onChange={(e) => setText((t) => ({ ...t, [l]: { ...t[l], body: e.target.value } }))} className="h-8 w-full rounded-tile border px-2" style={field} />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-1">Açılacak yol <input value={url} onChange={(e) => setUrl(e.target.value)} aria-label="Açılacak yol" className="h-8 w-32 rounded-tile border px-2 font-mono" style={field} /></label>
          <select value={native} onChange={(e) => { setNative(e.target.value); setCounts(null); }} aria-label="Anadil" className="h-8 rounded-tile border px-2" style={field}>
            <option value="">Tüm diller</option><option value="tr">tr</option><option value="en">en</option><option value="de">de</option>
          </select>
          <select value={course} onChange={(e) => { setCourse(e.target.value); setCounts(null); }} aria-label="Kurs" className="h-8 rounded-tile border px-2" style={field}>
            <option value="">Tüm kurslar</option><option value="de">de</option><option value="en">en</option><option value="gsw-zh">gsw-zh</option>
          </select>
          <select value={platform} onChange={(e) => { setPlatform(e.target.value); setCounts(null); }} aria-label="Platform" className="h-8 rounded-tile border px-2" style={field}>
            <option value="all">Tüm kanallar</option><option value="android">Android</option><option value="ios">iOS</option><option value="web">Web push</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={busy} onClick={preview} className="chip h-8 px-3 text-caption">Kaç kişiye gider?</button>
          {counts ? <span>tr {counts.tr} · en {counts.en} · de {counts.de} → metni dolu dillerde <b>{reach}</b> kişi</span> : null}
        </div>
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={service} onChange={(e) => setService(e.target.checked)} className="mt-0.5" />
          <span>Bu bir <b>hizmet duyurusudur</b>; tanıtım, kampanya, indirim ya da uygulamaya geri çağırma içermez.</span>
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={busy} onClick={() => send(true)} className="chip h-8 px-3 text-caption">Kendime test gönder</button>
          {cooling ? (
            <span className="muted">Sonraki gönderim: {when(nextAt ?? "")}</span>
          ) : (
            <TwoStep label="Herkese gönder" confirm={`Evet, ${reach ?? "?"} kişiye gönder`} danger disabled={busy || !service || reach == null || reach === 0} onConfirm={() => void send(false)} />
          )}
        </div>
        {msg ? <p role="status">{msg}</p> : null}
      </div>
      {list.length ? (
        <div className="mt-3">
          <Table head={["Zaman", "Başlık", "Kitle", "Hedef", "Ulaşan kanal", "Durum"]} rows={list.map((b) => [when(b.at), b.title, b.audience, String(b.targeted), String(b.delivered), b.state])} />
        </div>
      ) : null}
    </Section>
  );
}

/** Yıkıcı ya da geniş etkili eylem: ilk basış silahı kurar, ikincisi yapar. Sistem kutusu yok (parite §255). */
function TwoStep({ label, confirm, onConfirm, danger = false, disabled = false }: { label: string; confirm: string; onConfirm: () => void; danger?: boolean; disabled?: boolean }) {
  const [armed, setArmed] = useState(false);
  const color = danger ? { color: "var(--color-rose)" } : undefined;
  if (!armed) {
    return <button type="button" disabled={disabled} onClick={() => setArmed(true)} className="chip h-8 px-3 text-caption" style={color}>{label}</button>;
  }
  return (
    <span className="inline-flex flex-wrap gap-2">
      <button type="button" disabled={disabled} onClick={() => { setArmed(false); onConfirm(); }} className="chip h-8 px-3 text-caption" style={color}>{confirm}</button>
      <button type="button" onClick={() => setArmed(false)} className="chip h-8 px-3 text-caption">Vazgeç</button>
    </span>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-caption" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="muted text-micro uppercase tracking-eyebrow">{head.map((h) => <th key={h} className="px-2 py-1.5 text-left">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "var(--hairline)" }}>
              {r.map((v, j) => <td key={j} className="px-2 py-1.5 tabular-nums">{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-h3">{title}</h2>
      {sub ? <p className="muted mt-1 max-w-[70ch] text-caption">{sub}</p> : null}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="card px-3 py-4 text-caption" style={{ color: "var(--text-muted)" }}>{text}</div>;
}
