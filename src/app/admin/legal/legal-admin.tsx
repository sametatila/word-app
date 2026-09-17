"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { LEGAL_LOCALES, type LegalLocale } from "@/lib/legal";
import type { ConfigProcessor, LegalConfig } from "@/lib/legal/shape";
import { LegalStyles, renderLegalBody } from "@/lib/legal/markdown";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, Badge, BTN, DANGER, Field, FIELD, FIELD_AREA, FIELD_STYLE, Notice, PageHeader, Panel } from "../_ui/ui";

/**
 * Hukuki metin ve bilgi yönetimi.
 *
 * ÖNİZLEME GERÇEK. Sağdaki panel, yayına çıkan sayfanın kullandığı
 * `renderLegalBody`nin ta kendisiyle basılıyor — ayrı bir önizleyici yazmak
 * "panelde gördüğüm şey yayına çıkan şey değil" sınıfının tamamını açardı.
 * Belirteçler de yazarken çözülüyor: {{supportEmail}} yazan kişi, formun
 * üstünde ne değiştirdiyse onu görüyor.
 *
 * KAYDET → SUNUCU DOĞRULAR. Metin `validateDocument`ten geçmeden yazılmıyor;
 * tanınmayan belirteç, kapanmamış {{ifIos}} ve boş gövde reddediliyor. Buradaki
 * denetim yalnız erken uyarı.
 *
 * DEĞİŞİKLİK ANINDA GEÇERLİ: okuma tarafı 30 saniyelik önbellek kullanıyor,
 * yani en geç yarım dakikada yayında. Mağaza sürümü beklemeye gerek yok.
 */

type Doc = { title: string; description: string; summary: string[]; body: string; overridden: boolean; updatedBy: string | null; updatedAt: string | null };
type Docs = Record<"privacy" | "terms" | "support", Record<LegalLocale, Doc>>;
type Problem = { kind: string; tokens?: string[]; headings?: string[] };

const DOC_LABEL = { privacy: "Gizlilik politikası", terms: "Kullanım şartları", support: "Destek sayfası" } as const;
const LOC_LABEL: Record<LegalLocale, string> = { tr: "Türkçe", en: "English", de: "Deutsch" };
const ENTITY_LABEL: Record<string, string> = {
  controllerName: "Veri sorumlusu — ad",
  controllerAddress: "Veri sorumlusu — adres",
  publisherName: "Yayıncı — ad",
  publisherAddress: "Yayıncı — adres",
  publisherTaxOffice: "Yayıncı — vergi dairesi",
  trRepresentative: "Türkiye temsilcisi (KVKK)",
  privacyEmailTr: "KVKK başvuru adresi",
  privacyEmailEu: "GDPR başvuru adresi",
  supportEmail: "Destek adresi",
  court: "Yetkili mahkeme ili",
  backupRetentionDays: "Yedek saklama (gün)",
  supportResponseDays: "Destek yanıt süresi (iş günü)",
};

const PROBLEM_TEXT = (p: Problem): string => {
  if (p.kind === "empty") return "Gövde boş — kaydedilmiyor.";
  if (p.kind === "unknown_token") return `Tanınmayan belirteç: ${(p.tokens ?? []).join(", ")}`;
  if (p.kind === "unbalanced_ifios") return "{{ifIos}} ve {{/ifIos}} sayısı tutmuyor.";
  if (p.kind === "missing_sections") return `Varsayılanda olup burada olmayan bölümler: ${(p.headings ?? []).join(" · ")}`;
  return p.kind;
};

export function LegalAdmin({ config, documents, tokens }: { config: LegalConfig; documents: Docs; tokens: string[] }) {
  const [tab, setTab] = useState<"docs" | "identity" | "version" | "processors" | "platform">("docs");
  const [cfg, setCfg] = useState(config);
  const [docs, setDocs] = useState(documents);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgBad, setMsgBad] = useState(false);

  async function post(body: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    setBusy(true);
    setMsg("");
    setMsgBad(false);
    try {
      const res = await apiFetch("/api/admin/legal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        const problems = (data.problems as Problem[] | undefined) ?? [];
        setMsg(problems.length ? problems.map(PROBLEM_TEXT).join(" · ") : adminErrorText(String(data.error ?? res.status)));
        setMsgBad(true);
        return null;
      }
      return data;
    } catch {
      setMsg("Ağ hatası");
      setMsgBad(true);
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function saveConfig() {
    const d = await post({ action: "save_config", config: cfg });
    if (d) {
      setCfg(d.config as LegalConfig);
      setMsg("Kaydedildi. En geç 30 saniyede yayında.");
    }
  }

  return (
    <AdminPage>
      <PageHeader
        title="Hukuki metinler"
        description={<>Gizlilik politikası, kullanım şartları, destek sayfası ve onları besleyen bilgiler. Her şey <b>anında</b> yayına giriyor (en geç 30 sn). Metinler <code>legal_documents</code>, bilgiler <code>app_settings</code> tablosunda; kayıt yoksa koddaki varsayılan basılıyor.</>}
      />

      {/* Sekmeler — seçili olan yalnız kalın yazıdan okunuyordu (bkz. parity 258). */}
      <div role="tablist" aria-label="Bölümler" className="-mx-1 flex gap-1 overflow-x-auto border-b px-1" style={{ borderColor: "var(--border)" }}>
        {([
          ["docs", "Belgeler"],
          ["identity", "Kimlik"],
          ["version", "Sürüm ve geçmiş"],
          ["processors", "Alıcılar"],
          ["platform", "Platform ve sınırlar"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className="-mb-px h-10 shrink-0 border-b-2 px-3 text-strong whitespace-nowrap"
            style={tab === k ? { borderColor: "var(--color-brand)", color: "var(--text)" } : { borderColor: "transparent", color: "var(--text-muted)" }}
          >
            {label}
          </button>
        ))}
      </div>

      {msg ? <Notice tone={msgBad ? "bad" : "ok"}>{msg}</Notice> : null}

      {tab === "docs" ? (
        <DocumentsTab docs={docs} setDocs={setDocs} cfg={cfg} tokens={tokens} post={post} busy={busy} setMsg={setMsg} />
      ) : null}

      {tab === "identity" ? (
        <Card title="Kimlik ve iletişim" note="Metinlerde {{controllerName}} gibi belirteçlerle geçiyor. Boş bırakılan alan hiç basılmaz — olmayan bir yükümlülük varmış gibi görünmesin diye.">
          <div className="flex flex-wrap gap-3">
            {Object.keys(cfg.entity).map((k) => (
              <Txt
                key={k}
                label={ENTITY_LABEL[k] ?? k}
                v={(cfg.entity as Record<string, string>)[k]}
                w={k.includes("Address") || k === "trRepresentative" ? "100%" : "16rem"}
                on={(v) => setCfg({ ...cfg, entity: { ...cfg.entity, [k]: v } })}
              />
            ))}
          </div>
          <SaveRow onSave={saveConfig} busy={busy} />
        </Card>
      ) : null}

      {tab === "version" ? (
        <Card title="Sürüm ve yürürlük" note="Sürüm ve tarih, en yeni geçmiş kaydıyla AYNI olmak zorunda — sayfa ikisini yan yana basıyor ve test:legal kapısı bunu denetliyor.">
          <div className="flex flex-wrap gap-3">
            <Txt label="Sürüm (1.0 / 1.2.3)" v={cfg.version} w="10rem" on={(v) => setCfg({ ...cfg, version: v })} />
            <Txt label="Yürürlük (YYYY-AA-GG)" v={cfg.effectiveDate} w="12rem" on={(v) => setCfg({ ...cfg, effectiveDate: v })} />
          </div>
          <h3 className="mt-6 text-strong">Sürüm geçmişi</h3>
          <p className="muted text-caption">En yeni kayıt en üstte. Sayfada son iki kayıt gösteriliyor.</p>
          {cfg.changelog.map((e, i) => (
            <div key={i} className="mt-3 rounded-tile border p-3" style={{ borderColor: "var(--border)" }}>
              <div className="flex flex-wrap items-end gap-3">
                <Txt label="Sürüm" v={e.version} w="8rem" on={(v) => setCfg({ ...cfg, changelog: cfg.changelog.map((x, j) => (j === i ? { ...x, version: v } : x)) })} />
                <Txt label="Tarih" v={e.date} w="10rem" on={(v) => setCfg({ ...cfg, changelog: cfg.changelog.map((x, j) => (j === i ? { ...x, date: v } : x)) })} />
                <button type="button" className={BTN.small} style={DANGER} onClick={() => setCfg({ ...cfg, changelog: cfg.changelog.filter((_, j) => j !== i) })}>
                  Kaydı sil
                </button>
              </div>
              {LEGAL_LOCALES.map((l) => (
                <Area
                  key={l}
                  label={`${LOC_LABEL[l]} — her satır bir madde`}
                  rows={3}
                  v={e.changes[l].join("\n")}
                  on={(v) => setCfg({ ...cfg, changelog: cfg.changelog.map((x, j) => (j === i ? { ...x, changes: { ...x.changes, [l]: v.split("\n") } } : x)) })}
                />
              ))}
            </div>
          ))}
          <button
            type="button"
            className={`${BTN.small} mt-3`}
            onClick={() => setCfg({ ...cfg, changelog: [{ version: cfg.version, date: cfg.effectiveDate, changes: { tr: [""], en: [""], de: [""] } }, ...cfg.changelog] })}
          >
            + Kayıt ekle
          </button>
          <SaveRow onSave={saveConfig} busy={busy} />
        </Card>
      ) : null}

      {tab === "processors" ? (
        <Card title="Alıcılar tablosu" note="Gizlilik politikasında {{processorsTable}} belirtecinin bastığı tablo. Bir sağlayıcıyı buradan silmek, onun veri aldığı iddiasını da siler — silmeden önce gerçekten kullanılmadığından emin ol.">
          {cfg.processors.map((p, i) => (
            <ProcessorRow
              key={i}
              p={p}
              onChange={(np) => setCfg({ ...cfg, processors: cfg.processors.map((x, j) => (j === i ? np : x)) })}
              onDelete={() => setCfg({ ...cfg, processors: cfg.processors.filter((_, j) => j !== i) })}
            />
          ))}
          <button
            type="button"
            className={`${BTN.small} mt-3`}
            onClick={() => setCfg({ ...cfg, processors: [...cfg.processors, emptyProcessor()] })}
          >
            + Sağlayıcı ekle
          </button>
          <SaveRow onSave={saveConfig} busy={busy} />
        </Card>
      ) : null}

      {tab === "platform" ? (
        <Card title="Platform ve adil kullanım" note="iOS anahtarı açılınca metinlerin kapsam cümlesi değişiyor, Apple maddeleri basılıyor ve alıcılar tablosuna iki Apple satırı giriyor.">
          <label className="flex items-center gap-2 text-body">
            <input
              type="checkbox"
              checked={cfg.platforms.ios}
              onChange={(e) => setCfg({ ...cfg, platforms: { ...cfg.platforms, ios: e.target.checked } })}
            />
            <span>
              Metinler iOS uygulamasını da kapsıyor
              <span className="muted block text-caption">
                Yalnız uygulama gerçekten Apple&apos;a gittiğinde açılmalı: kapalıyken Apple satırları basılmıyor,
                açıkken &quot;Apple ile giriş&quot; bir alıcı olarak beyan ediliyor.
              </span>
            </span>
          </label>
          <h3 className="mt-5 text-strong">Adil kullanım tavanları (günlük)</h3>
          <p className="muted text-caption">Şartlarda {"{{fairUse:…}}"} belirteçleriyle geçiyor; koddaki gerçek kotalarla aynı olmalı.</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {Object.keys(cfg.fairUse).map((k) => (
              <Num
                key={k}
                label={k}
                v={(cfg.fairUse as Record<string, number>)[k]}
                on={(n) => setCfg({ ...cfg, fairUse: { ...cfg.fairUse, [k]: n } })}
              />
            ))}
          </div>
          <h3 className="mt-5 text-strong">Sunucu konumu ({"{{hosting}}"})</h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {LEGAL_LOCALES.map((l) => (
              <Txt key={l} label={LOC_LABEL[l]} v={cfg.hosting[l]} w="16rem" on={(v) => setCfg({ ...cfg, hosting: { ...cfg.hosting, [l]: v } })} />
            ))}
          </div>
          <SaveRow onSave={saveConfig} busy={busy} />
        </Card>
      ) : null}
    </AdminPage>
  );
}

/* ── belgeler sekmesi ───────────────────────────────────────────────────── */

function DocumentsTab({ docs, setDocs, cfg, tokens, post, busy, setMsg }: {
  docs: Docs; setDocs: (d: Docs) => void; cfg: LegalConfig; tokens: string[];
  post: (b: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  busy: boolean; setMsg: (s: string) => void;
}) {
  const [doc, setDoc] = useState<keyof Docs>("privacy");
  const [locale, setLocale] = useState<LegalLocale>("tr");
  const [preview, setPreview] = useState(true);
  const cur = docs[doc][locale];

  const patch = (p: Partial<Doc>) =>
    setDocs({ ...docs, [doc]: { ...docs[doc], [locale]: { ...cur, ...p } } });

  async function save() {
    const d = await post({ action: "save_document", doc, locale, document: { title: cur.title, description: cur.description, summary: cur.summary, body: cur.body } });
    if (!d) return;
    setDocs(d.documents as Docs);
    const warns = (d.warnings as Problem[] | undefined) ?? [];
    setMsg(warns.length ? `Kaydedildi. UYARI — ${warns.map(PROBLEM_TEXT).join(" · ")}` : "Kaydedildi. En geç 30 saniyede yayında.");
  }

  async function reset() {
    const d = await post({ action: "reset_document", doc, locale });
    if (d) {
      setDocs(d.documents as Docs);
      setMsg("Bu belge koddaki varsayılana döndü.");
    }
  }

  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex flex-wrap gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
        {(Object.keys(DOC_LABEL) as (keyof Docs)[]).map((d) => (
          <button key={d} type="button" aria-pressed={doc === d} onClick={() => setDoc(d)} className="inline-flex h-8 items-center rounded-chip px-3 text-caption" style={doc === d ? SEG_ON : SEG_OFF}>
            {DOC_LABEL[d]}
          </button>
        ))}
        </div>
        <div className="inline-flex flex-wrap gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
        {LEGAL_LOCALES.map((l) => (
          <button key={l} type="button" aria-pressed={locale === l} onClick={() => setLocale(l)} className="inline-flex h-8 items-center rounded-chip px-3 text-caption" style={locale === l ? SEG_ON : SEG_OFF}>
            {LOC_LABEL[l]}
            {docs[doc][l].overridden ? " ●" : ""}
          </button>
        ))}
        </div>
      </div>
      <p className="muted mt-2 text-caption">
        {cur.overridden
          ? `Bu belge panelden düzenlenmiş${cur.updatedBy ? ` (${cur.updatedBy})` : ""}${cur.updatedAt ? ` · ${cur.updatedAt.slice(0, 16).replace("T", " ")}` : ""}. ● işareti değiştirilmiş dilleri gösteriyor.`
          : "Bu belge koddaki varsayılandan basılıyor."}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Txt label="Başlık (H1 ve sekme adı)" v={cur.title} w="24rem" on={(v) => patch({ title: v })} />
        <Txt label="Meta açıklama" v={cur.description} w="100%" on={(v) => patch({ description: v })} />
      </div>
      <Area label={`"Kısaca" maddeleri — her satır bir madde (boş bırakılırsa kutu hiç basılmaz)`} rows={4} v={cur.summary.join("\n")} on={(v) => patch({ summary: v.split("\n") })} />

      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-strong">Gövde (markdown)</h3>
        <label className="flex items-center gap-2 text-caption">
          <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} />
          Önizleme
        </label>
      </div>
      <div className={`mt-2 grid gap-4 ${preview ? "md:grid-cols-2" : ""}`}>
        <textarea
          value={cur.body}
          onChange={(e) => patch({ body: e.target.value })}
          aria-label="Gövde (markdown)"
          spellCheck={false}
          className="w-full rounded-tile border p-3 font-mono text-caption leading-relaxed"
          style={{ ...FIELD_STYLE, minHeight: "32rem" }}
        />
        {preview ? (
          <div className="rounded-tile border p-4" style={{ borderColor: "var(--border)", maxHeight: "32rem", overflow: "auto" }}>
            <article className="legal">{renderLegalBody(cur.body, { cfg, locale })}</article>
            <LegalStyles />
          </div>
        ) : null}
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-caption" style={{ color: "var(--text-muted)" }}>Kullanılabilir belirteçler ({tokens.length})</summary>
        <p className="mt-2 flex flex-wrap gap-1.5">
          {tokens.map((t) => <code key={t} className="rounded px-1.5 py-0.5 text-micro" style={{ background: "var(--surface-2)" }}>{`{{${t}}}`}</code>)}
        </p>
        <p className="muted mt-2 text-caption">
          Başlık <code>## </code>, alt başlık <code>### </code>, liste <code>- </code>, kalın <code>**…**</code>,
          bağlantı <code>[metin](adres)</code>. Tablo: başlık satırı + <code>|---|---|</code>; başlıksız tablo için
          doğrudan <code>|---|---|</code> ile başla. {"{{entityBlock:…}}"} ve {"{{processorsTable}}"} kendi satırlarında durmalı.
        </p>
      </details>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4" style={{ borderColor: "var(--hairline)" }}>
        <button type="button" className={BTN.primary} disabled={busy} onClick={save}>Kaydet</button>
        <button type="button" className={BTN.secondary} disabled={busy || !cur.overridden} onClick={reset}>Varsayılana dön</button>
      </div>
    </Panel>
  );
}

const SEG_ON = { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-soft)" };
const SEG_OFF = { color: "var(--text-muted)" };

/* ── küçük parçalar ─────────────────────────────────────────────────────── */

function emptyProcessor(): ConfigProcessor {
  const e = { tr: "", en: "", de: "" };
  return { name: { ...e }, purpose: { ...e }, data: { ...e }, region: { ...e }, safeguard: { ...e }, when: { ...e } };
}

function ProcessorRow({ p, onChange, onDelete }: { p: ConfigProcessor; onChange: (p: ConfigProcessor) => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const fields: [keyof ConfigProcessor, string][] = [
    ["name", "Sağlayıcı"], ["purpose", "Ne için"], ["data", "Hangi veri"],
    ["region", "Bölge"], ["safeguard", "Güvence"], ["when", "Ne zaman"],
  ];
  return (
    <div className="mt-3 rounded-tile border p-3" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" aria-expanded={open} className="text-strong" onClick={() => setOpen(!open)}>
          {open ? "▾" : "▸"} {p.name.tr || p.name.en || "(adsız)"}
        </button>
        <span className="muted text-caption">{p.purpose.tr}</span>
        {p.iosOnly ? <Badge>yalnız iOS</Badge> : null}
        <span className="flex-1" />
        <button type="button" className={BTN.small} style={DANGER} onClick={onDelete}>Sil</button>
      </div>
      {open ? (
        <div className="mt-3 flex flex-col gap-3">
          {fields.map(([f, label]) => (
            <div key={String(f)} className="flex flex-wrap gap-2">
              {LEGAL_LOCALES.map((l) => (
                <Txt
                  key={l}
                  label={`${label} · ${LOC_LABEL[l]}`}
                  v={(p[f] as Record<LegalLocale, string>)[l]}
                  w="15rem"
                  on={(v) => onChange({ ...p, [f]: { ...(p[f] as Record<LegalLocale, string>), [l]: v } })}
                />
              ))}
            </div>
          ))}
          <label className="flex items-center gap-2 text-caption">
            <input type="checkbox" checked={Boolean(p.iosOnly)} onChange={(e) => onChange({ ...p, iosOnly: e.target.checked })} />
            Yalnız iOS yayındayken bas
          </label>
        </div>
      ) : null}
    </div>
  );
}

function Card({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return <Panel title={title} hint={note}>{children}</Panel>;
}

function SaveRow({ onSave, busy }: { onSave: () => void; busy: boolean }) {
  return (
    <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--hairline)" }}>
      <button type="button" className={BTN.primary} disabled={busy} onClick={onSave}>Kaydet</button>
    </div>
  );
}

/** Genişlik dar ekranda satırı aşmasın: `min(100%, w)`. */
function Txt({ label, v, on, w = "12rem" }: { label: string; v: string; on: (s: string) => void; w?: string }) {
  return (
    <div style={{ width: `min(100%, ${w})` }}>
      <Field label={label}>
        <input aria-label={label} type="text" value={v} onChange={(e) => on(e.target.value)} className={FIELD} style={FIELD_STYLE} />
      </Field>
    </div>
  );
}

function Num({ label, v, on }: { label: string; v: number; on: (n: number) => void }) {
  return (
    <Field label={label} className="w-48 max-w-full">
      <input aria-label={label} type="number" value={v} onChange={(e) => on(Number(e.target.value))} className={`${FIELD} tabular-nums`} style={FIELD_STYLE} />
    </Field>
  );
}

function Area({ label, v, on, rows = 3 }: { label: string; v: string; on: (s: string) => void; rows?: number }) {
  return (
    <Field label={label} className="mt-3">
      <textarea aria-label={label} value={v} rows={rows} onChange={(e) => on(e.target.value)} className={FIELD_AREA} style={FIELD_STYLE} />
    </Field>
  );
}
