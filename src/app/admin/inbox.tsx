"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { CATEGORY_LABEL, slaProgress, type Inbox as InboxData, type InboxCategory, type InboxItem } from "@/lib/admin-inbox-shared";
import { RESPONSE_SLA, REVIEW_TEMPLATES, slaState, slaText, type QueueId } from "@/lib/response-sla";
import { KIND_LABEL, REASON_LABEL } from "@/lib/content-feedback-labels";
import type { ReportedPerson } from "@/lib/moderation-admin";
import { Badge, BTN, Empty, FIELD, FIELD_AREA, FIELD_STYLE, KeyValue, Notice, Segmented, TONE, when } from "./_ui/ui";
import { TwoStep } from "./_ui/two-step";
import { ResponseGuide } from "./_ui/sla";
import { USER_REASON } from "./moderation/moderation-admin";
import { reasonText, sourceHint, surfaceText, targetText } from "./moderation/content/labels";

/**
 * GELEN İŞLER — panelin açılışı: dönülmesi gereken her şey tek kuyrukta,
 * geri dönüş süresine göre sıralı (veri `lib/admin-inbox`).
 *
 * Solda kuyruk (süre halkası: hedefin ne kadarı geçti), sağda seçili işin
 * ayrıntısı ve kararı. Kararlar kuyruğun kendi sayfasındakiyle AYNI uçtan
 * (`/api/admin/moderation`: 2FA, işlem kaydı, bildirene sonuç bildirimi);
 * yıkıcı olanlar iki adım (`TwoStep`). Mağaza yorumu burada cevaplanamıyor
 * (API yalnız okuma): şablon kopyalanıp konsolda verilir, cevaplanan yorum
 * bir sonraki okumada kuyruktan düşer. Uyarı koşul düzelince kendiliğinden kalkar.
 *
 * Klavye: j / k ya da ↓ / ↑ kuyrukta gezer. Tek tuşla karar YOK: kapatma
 * bildirene bildirim gönderiyor, yanlışlıkla basılacak kadar ucuz değil.
 */

type Filter = "hepsi" | "acil" | InboxCategory;
const FILTERS: Filter[] = ["hepsi", "acil", "sikayet", "yorum", "icerik", "sistem"];
const FILTER_LABEL: Record<Filter, string> = { hepsi: "Hepsi", acil: "Acil", ...CATEGORY_LABEL };
const isUrgent = (i: InboxItem) => i.rank <= 2;
const STORE = { ios: "App Store", android: "Google Play" } as const;
const CONSOLE = {
  ios: { url: "https://appstoreconnect.apple.com/apps/6810593275/distribution/activity/ios/ratingsResponses", label: "App Store Connect'te cevapla" },
  android: { url: "https://play.google.com/console/developers/app/user-feedback/reviews", label: "Play Console'da cevapla" },
} as const;
const stars = (n: number) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
const ERROR_TR: Record<string, string> = {
  not_found: "Kayıt bulunamadı: başka biri kapatmış olabilir.",
  not_ready: "Karar tablosu canlıda yok: önce drizzle/0059_moderation_actions.sql uygulanmalı.",
  no_target: "Bu grubun içerik paketi türetilemedi; kapatılacak madde yok.",
  bad_input: "Geçersiz istek.",
};

/* ---------- küçük parçalar ---------- */

const ICON: Record<InboxCategory, string> = {
  sikayet: "M5 21V4M5 4h12l-2.5 4L17 12H5",
  yorum: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
  icerik: "M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19",
  sistem: "M12 3.5l9.5 16.5h-19zM12 10v4.5M12 17.2h.01",
};

function Icon({ cat, size = 14 }: { cat: InboxCategory; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0" style={{ fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" }}>
      <path d={ICON[cat]} />
    </svg>
  );
}

/**
 * Durumun tek rengi: kritik/gecikmiş kırmızı, uyarı/yaklaşan sarı, süresi bol
 * olan nötr. Marka turuncusu burada yok: "acele yok" işi uyarı gibi okutuyordu.
 */
function toneOf(i: InboxItem, now: number): string {
  if (i.kind === "alert") return i.level === "kritik" ? TONE.bad : TONE.warn;
  const p = i.created ? slaProgress(i.queue, i.created, now) : null;
  return p?.level === "late" ? TONE.bad : p?.level === "soon" ? TONE.warn : "var(--text-muted)";
}

/** Süre halkası: hedefin geçen kısmı dolu. Uyarıda halka tam, rengi seviyesi. */
function Ring({ item, now }: { item: InboxItem; now: number }) {
  const R = 15, C = 2 * Math.PI * R;
  const ratio = item.kind === "alert" ? 1 : item.created ? (slaProgress(item.queue, item.created, now)?.ratio ?? 0) : 0;
  const tone = toneOf(item, now);
  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center" style={{ color: tone }}>
      <svg width={36} height={36} viewBox="0 0 36 36" aria-hidden className="absolute inset-0 -rotate-90">
        <circle cx={18} cy={18} r={R} strokeWidth={3} style={{ fill: "none", stroke: "var(--hairline)" }} />
        <circle cx={18} cy={18} r={R} strokeWidth={3} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - Math.max(0.04, ratio))} style={{ fill: "none", stroke: tone }} />
      </svg>
      <Icon cat={item.cat} />
    </span>
  );
}

/** Kartın sağındaki kısa durum: "6 sa kaldı", "2 sa gecikti", "kritik". */
function statusText(i: InboxItem, now: number): string {
  if (i.kind === "alert") return i.level === "kritik" ? "kritik" : "uyarı";
  const s = i.created ? slaState(i.queue, i.created, now) : null;
  return s ? slaText(s) : "";
}

function personName(p: ReportedPerson) {
  return p.name || (p.username ? `@${p.username}` : "adsız");
}

function Person({ p }: { p: ReportedPerson }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
      <a href={`/admin/users/${encodeURIComponent(p.id)}`} className="text-strong underline-offset-2 hover:underline">{p.name || p.username || "adsız"}</a>
      {p.username ? <span className="muted font-mono">@{p.username}</span> : null}
      {p.guest ? <Badge>misafir</Badge> : null}
      {p.joined ? <span className="muted">katıldı {when(p.joined, false)}</span> : null}
    </span>
  );
}

/** Kartın üç satırı: tür, başlık, ayrıntı. */
function summary(i: InboxItem): { kind: string; title: string; meta: string } {
  switch (i.kind) {
    case "user_report": {
      const r = i.report;
      return { kind: "Kullanıcı şikâyeti", title: `${USER_REASON[r.reason] ?? r.reason}: ${personName(r.reported)}`, meta: `${r.reportsAgainst} şikâyet · ${r.blockedBy} engel · bildiren ${personName(r.reporter)}` };
    }
    case "ai_report": {
      const r = i.report;
      return { kind: "Yapay zekâ bildirimi", title: `${KIND_LABEL[r.kind] ?? r.kind} · ${REASON_LABEL[r.reason] ?? r.reason}`, meta: r.detail || r.ref };
    }
    case "content": {
      const g = i.group;
      return { kind: `İçerik bildirimi · ${g.open} bildirim`, title: targetText(g), meta: [g.topReason ? reasonText(g.topReason) : "", g.courses.join(", "), g.sample].filter(Boolean).join(" · ") };
    }
    case "review": {
      const r = i.review;
      return { kind: `${STORE[r.store]} · ${stars(r.rating)}`, title: r.title || r.body.slice(0, 120), meta: [r.author, r.version, r.territory].filter(Boolean).join(" · ") };
    }
    case "alert":
      return { kind: "Sistem uyarısı", title: i.text, meta: i.links.panel.label };
  }
}

/* ---------- ayrıntı ---------- */

type Send = (body: Record<string, unknown>, done: string) => Promise<void>;

/** Karar satırı: not + düğmeler. Not alanı işe özel (başka işe geçince boşalır). */
function Decide({ busy, disabled, children, note, onNote }: { busy: boolean; disabled?: boolean; children: React.ReactNode; note: string; onNote: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <input
        id="inbox-note"
        value={note}
        onChange={(e) => onNote(e.target.value)}
        maxLength={500}
        disabled={busy || disabled}
        placeholder="Not (isteğe bağlı): ne yapıldı"
        aria-label="Karar notu"
        className={FIELD}
        style={FIELD_STYLE}
      />
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return <p className="whitespace-pre-wrap break-words rounded-tile px-3.5 py-2.5 text-body" style={{ background: "var(--surface-2)" }}>{children}</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="muted text-micro uppercase tracking-eyebrow">{title}</h3>
      {children}
    </section>
  );
}

/** Yorum cevabı: şablon + dil, düzenlenebilir metin, kopyala, konsola git. */
function ReviewReply({ lang: initial, store, template }: { lang: "tr" | "en" | "de"; store: "ios" | "android"; template: string }) {
  const [tpl, setTpl] = useState(template);
  const [lang, setLang] = useState(initial);
  const base = REVIEW_TEMPLATES.find((t) => t.id === tpl);
  const [text, setText] = useState(base?.[lang] ?? "");
  const [copied, setCopied] = useState(false);
  const pick = (id: string, l: "tr" | "en" | "de") => {
    setTpl(id);
    setLang(l);
    setText(REVIEW_TEMPLATES.find((t) => t.id === id)?.[l] ?? "");
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }
  const limit = store === "android" ? 350 : 5970;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <select id="inbox-template" aria-label="Yanıt şablonu" value={tpl} onChange={(e) => pick(e.target.value, lang)} className={`${FIELD} w-auto flex-1 basis-48`} style={FIELD_STYLE}>
          {REVIEW_TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <Segmented label="Dil" items={[["tr", "TR"], ["en", "EN"], ["de", "DE"]] as const} value={lang} onChange={(l) => pick(tpl, l)} />
      </div>
      <textarea id="inbox-reply" aria-label="Yanıt metni" value={text} onChange={(e) => setText(e.target.value)} rows={5} className={FIELD_AREA} style={FIELD_STYLE} />
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => void copy()} className={BTN.primary}>{copied ? "Kopyalandı" : "Metni kopyala"}</button>
        <a href={CONSOLE[store].url} target="_blank" rel="noopener noreferrer" className={BTN.secondary}>{CONSOLE[store].label} ↗</a>
        <span className="muted text-caption tabular-nums" style={text.length > limit ? { color: TONE.bad } : undefined}>{text.length} / {limit} karakter</span>
      </div>
      <p className="muted text-caption">Cevap konsolda veriliyor (mağaza API anahtarı yalnız okuma). Cevaplanan yorum bir sonraki okumada kuyruktan düşer.</p>
    </div>
  );
}

/** 1-2★ yoruma "teşekkür" değil: ödeme/abonelik geçiyorsa fatura şablonu, yoksa hata şablonu. */
const BILLING_RE = /abonelik|iptal|ödeme|ücret|para|subscri|cancel|refund|charge|abo|kündig|zahl|geld/i;
const templateFor = (text: string) => {
  const id = BILLING_RE.test(text) ? "billing" : "bug";
  return REVIEW_TEMPLATES.some((t) => t.id === id) ? id : (REVIEW_TEMPLATES[0]?.id ?? "");
};

const langOf = (territory: string): "tr" | "en" | "de" => {
  const t = territory.toLowerCase();
  if (t.startsWith("tr")) return "tr";
  if (t.startsWith("de") || t === "aut" || t === "che") return "de";
  return "en";
};

function Detail({ item, ready, busy, send, note, onNote }: { item: InboxItem; ready: boolean; busy: boolean; send: Send; note: string; onNote: (v: string) => void }) {
  switch (item.kind) {
    case "alert":
      return (
        <div className="space-y-5">
          <Section title="Nereye bakılır">
            <div className="flex flex-wrap gap-2">
              <a href={item.links.panel.path} className={BTN.primary}>{item.links.panel.label} →</a>
              {item.links.external ? <a href={item.links.external.url} target="_blank" rel="noopener noreferrer" className={BTN.secondary}>{item.links.external.label} ↗</a> : null}
            </div>
          </Section>
          <p className="muted text-caption">Uyarılar Telegram&apos;a gidenlerle aynı listeden. Koşul düzelince kuyruktan kendiliğinden kalkar; burada kapatılmaz.</p>
        </div>
      );
    case "user_report": {
      const r = item.report;
      const repeat = r.reportsAgainst > 1 || r.blockedBy > 1;
      return (
        <div className="space-y-5">
          <Section title="Şikâyet edilen">
            <div className="text-body"><Person p={r.reported} /></div>
            <div className="text-caption" style={{ color: repeat ? TONE.bad : "var(--text-muted)" }}>Bu hesap hakkında toplam {r.reportsAgainst} şikâyet · {r.blockedBy} engel</div>
          </Section>
          <Section title="Şikâyet eden">
            <div className="text-caption"><Person p={r.reporter} /></div>
          </Section>
          {r.detail ? <Section title="Açıklama"><Quote>{r.detail}</Quote></Section> : null}
          <Section title="Karar">
            {ready ? (
              <Decide busy={busy} note={note} onNote={onNote}>
                <>
                    <button type="button" disabled={busy} onClick={() => void send({ target: "user_report", refId: r.id, action: "resolved" }, "Şikâyet kapandı: gereği yapıldı")} className={BTN.primary}>Gereği yapıldı</button>
                    <button type="button" disabled={busy} onClick={() => void send({ target: "user_report", refId: r.id, action: "dismissed" }, "Şikâyet kapandı: asılsız")} className={BTN.secondary}>Asılsız</button>
                    <TwoStep label="Adı sıfırla + kapat" confirm="Evet, ad ve kullanıcı adı silinsin" disabled={busy} onConfirm={() => void send({ target: "user_report", refId: r.id, action: "reset_name" }, "Ad sıfırlandı, şikâyet kapandı")} />
                  </>
              </Decide>
            ) : (
              <Notice tone="warn">Karar tablosu (moderation_actions) canlıda yok: şikâyet okunabiliyor ama kapatılamıyor.</Notice>
            )}
          </Section>
          <ResponseGuide queue="user_report" />
        </div>
      );
    }
    case "ai_report": {
      const r = item.report;
      return (
        <div className="space-y-5">
          <Section title="Hedef">
            <a href={`/admin/moderation/content/group?g=${encodeURIComponent(r.group)}`} className="font-mono text-caption underline-offset-2 hover:underline">{r.ref}</a>
          </Section>
          <Section title="Bildiren"><div className="text-caption"><Person p={r.reporter} /></div></Section>
          {r.detail ? <Section title="Açıklama"><Quote>{r.detail}</Quote></Section> : null}
          {r.content ? <Section title="Yapay zekâ çıktısı"><Quote>{r.content}</Quote></Section> : null}
          <Section title="Karar">
            <Decide busy={busy} note={note} onNote={onNote}>
              <>
                  <button type="button" disabled={busy} onClick={() => void send({ target: "content_report", refId: r.id, action: "resolved" }, "Bildirim kapandı: gereği yapıldı")} className={BTN.primary}>Gereği yapıldı</button>
                  <button type="button" disabled={busy} onClick={() => void send({ target: "content_report", refId: r.id, action: "dismissed" }, "Bildirim kapandı: asılsız")} className={BTN.secondary}>Asılsız</button>
                </>
            </Decide>
          </Section>
          <ResponseGuide queue="ai_report" />
        </div>
      );
    }
    case "content": {
      const g = item.group;
      const info: Record<string, string | number> = {
        Bildirim: g.open,
        Nedenler: Object.entries(g.reasons).map(([k, v]) => `${reasonText(k)} ×${v}`).join(", "),
        İlk: when(g.first),
        Son: when(g.last),
      };
      if (g.surfaces.length) info["Yüzey"] = g.surfaces.map(surfaceText).join(", ");
      if (g.courses.length || g.natives.length) info["Kurs / anadil"] = `${g.courses.join(", ") || "—"} / ${g.natives.join(", ") || "—"}`;
      if (g.platforms.length) info["Platform"] = g.platforms.join(", ");
      if (g.pack) info["Paket"] = `${g.pack}:${g.item}`;
      const hint = sourceHint(g.targetType, g.pack);
      return (
        <div className="space-y-5">
          {g.sample ? <Section title="Son bildirimin görüntüsü"><Quote>{g.sample}</Quote></Section> : null}
          <KeyValue data={info} />
          {hint ? <p className="muted text-caption">Düzeltme yeri: {hint}</p> : null}
          <Section title="Karar">
            <Decide busy={busy} note={note} onNote={onNote}>
              <>
                  <button type="button" disabled={busy} onClick={() => void send({ action: "close_group", decision: "resolved", group: g.key }, "Grup kapandı: gereği yapıldı")} className={BTN.primary}>Gereği yapıldı</button>
                  <button type="button" disabled={busy} onClick={() => void send({ action: "close_group", decision: "dismissed", group: g.key }, "Grup kapandı: asılsız")} className={BTN.secondary}>Asılsız</button>
                  {g.pack && g.item ? <TwoStep label="İçeriği kapat" confirm="Evet, madde yayından kalksın" disabled={busy} onConfirm={() => void send({ action: "disable_content", group: g.key }, "Madde yayından kalktı, grup kapandı")} /> : null}
                </>
            </Decide>
            <p className="muted text-caption">Gruptaki bütün açık bildirimler aynı kararla kapanır; her bildirene tek sonuç bildirimi gider.</p>
          </Section>
          <a href={`/admin/moderation/content/group?g=${encodeURIComponent(g.key)}`} className="inline-block text-caption underline underline-offset-2">Bildirimlerin tamamı ve önceki kararlar →</a>
        </div>
      );
    }
    case "review": {
      const r = item.review;
      return (
        <div className="space-y-5">
          <Section title={`${STORE[r.store]} · ${stars(r.rating)}`}>
            {r.title ? <div className="text-strong">{r.title}</div> : null}
            <Quote>{r.body}</Quote>
            <div className="muted text-caption">{[r.author, r.version && `sürüm ${r.version}`, r.territory, when(r.at)].filter(Boolean).join(" · ")}</div>
          </Section>
          <Section title="Yanıt">
            <ReviewReply key={item.id} lang={langOf(r.territory)} store={r.store} template={templateFor(`${r.title} ${r.body}`)} />
          </Section>
          <ResponseGuide queue="store_review" />
        </div>
      );
    }
  }
}

/* ---------- kuyruk ---------- */

export function Inbox({ inbox }: { inbox: InboxData }) {
  const router = useRouter();
  const { now, ready } = inbox;
  const [filter, setFilter] = useState<Filter>("hepsi");
  const [gone, setGone] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [flash, setFlash] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const live = useMemo(() => inbox.items.filter((i) => !gone.has(i.id)), [inbox.items, gone]);
  const count = (f: Filter) => live.filter((i) => (f === "hepsi" ? true : f === "acil" ? isUrgent(i) : i.cat === f)).length;
  const visible = useMemo(() => live.filter((i) => (filter === "hepsi" ? true : filter === "acil" ? isUrgent(i) : i.cat === filter)), [live, filter]);
  const current = visible.find((i) => i.id === selected) ?? visible[0] ?? null;
  const late = live.filter((i) => i.rank === 1).length;
  const soon = live.filter((i) => i.rank === 2).length;
  const critical = live.filter((i) => i.rank === 0).length;

  /** `focus`: klavyeyle gezerken odak da yeni karta geçsin (eski kartta çerçeve kalmasın). */
  function select(id: string, open = false, focus = false) {
    setSelected(id);
    if (open) setSheet(true);
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"] button`);
    el?.scrollIntoView({ block: "nearest" });
    if (focus) el?.focus({ preventScroll: true });
  }

  /* j / k ve oklar: yazı alanındayken değil. */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey || (t && (t.closest("input, textarea, select, [contenteditable=true]")))) return;
      if (e.key === "Escape") {
        setSheet(false);
        return;
      }
      const dir = e.key === "j" || e.key === "ArrowDown" ? 1 : e.key === "k" || e.key === "ArrowUp" ? -1 : 0;
      if (!dir || !visible.length) return;
      e.preventDefault();
      const at = current ? visible.indexOf(current) : -1;
      const next = visible[Math.min(visible.length - 1, Math.max(0, at + dir))];
      if (next) select(next.id, false, true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const send: Send = async (body, done) => {
    if (!current) return;
    const id = current.id;
    setBusy(true);
    setFlash(null);
    try {
      const res = await apiFetch("/api/admin/moderation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, note: notes[id] ?? "" }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string; closed?: number; notified?: number };
      if (!res.ok) {
        const code = String(j.error ?? res.status);
        setFlash({ tone: "bad", text: ERROR_TR[code] ?? adminErrorText(code) });
        return;
      }
      /* Sıradaki iş seçilsin: kapanan kartın yerindeki. */
      const at = visible.findIndex((i) => i.id === id);
      const next = visible[at + 1] ?? visible[at - 1] ?? null;
      setGone((s) => new Set(s).add(id));
      setSelected(next?.id ?? null);
      setSheet(false);
      setFlash({ tone: "ok", text: j.closed != null ? `${done} (${j.closed} bildirim, ${j.notified ?? 0} kişiye sonuç gitti).` : `${done}.` });
      router.refresh();
    } catch {
      setFlash({ tone: "bad", text: "Ağ hatası: karar kaydedilmedi." });
    } finally {
      setBusy(false);
    }
  };

  const head = current ? summary(current) : null;
  const queuePath = (q: QueueId) => RESPONSE_SLA[q].path;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(20rem,27rem)_minmax(0,1fr)]">
      {/* KUYRUK */}
      <div className="min-w-0 px-4 pb-16 pt-5 sm:px-6 lg:border-r lg:px-5" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h1 className="text-h2">Gelen işler</h1>
          <span className="muted text-caption tabular-nums">
            {live.length} iş
            {critical ? <> · <span style={{ color: TONE.bad }}>{critical} kritik</span></> : null}
            {late ? <> · <span style={{ color: TONE.bad }}>{late} gecikmiş</span></> : null}
            {soon ? <> · <span style={{ color: TONE.warn }}>{soon} yaklaşan</span></> : null}
          </span>
        </div>
        <div role="group" aria-label="Süzgeç" className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {FILTERS.map((f) => {
            const n = count(f);
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-caption whitespace-nowrap"
                style={on ? { borderColor: "var(--color-brand)", background: "var(--brand-soft)", color: "var(--on-brand-soft)" } : { borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                {FILTER_LABEL[f]}
                <span className="tabular-nums opacity-80">{n}</span>
              </button>
            );
          })}
        </div>
        {inbox.errors.length ? (
          <div className="mt-3">
            <Notice tone="bad" title="Kuyruk eksik: bazı kaynaklar okunamadı">
              <ul className="list-disc pl-5 text-caption">{inbox.errors.slice(0, 4).map((e) => <li key={e}>{e}</li>)}</ul>
            </Notice>
          </div>
        ) : null}
        {flash ? <div className="mt-3"><Notice tone={flash.tone}>{flash.text}</Notice></div> : null}

        {visible.length ? (
          <ol ref={listRef} className="mt-3 space-y-2" aria-label="İşler">
            {visible.map((i) => {
              const s = summary(i);
              const on = current?.id === i.id;
              return (
                <li key={i.id} data-id={i.id}>
                  <button
                    type="button"
                    onClick={() => select(i.id, true)}
                    aria-pressed={on}
                    className="grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-3 rounded-tile border p-3 text-left transition-colors hover:border-[var(--text-faint)]"
                    style={on ? { borderColor: "var(--color-brand)", background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--color-brand)" } : { borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <Ring item={i} now={now} />
                    <span className="min-w-0">
                      <span className="muted block truncate text-micro">{s.kind}</span>
                      <span className="line-clamp-2 break-words text-caption" style={{ color: "var(--text)" }}>{s.title}</span>
                      {s.meta ? <span className="faint mt-0.5 block truncate text-micro">{s.meta}</span> : null}
                    </span>
                    <span className="pt-0.5 text-micro whitespace-nowrap tabular-nums" style={{ color: toneOf(i, now) }}>{statusText(i, now)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden style={{ fill: "none", stroke: "var(--color-mint)", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
              <circle cx={12} cy={12} r={9.5} />
              <path d="M7.5 12.5l3 3 6-6.5" />
            </svg>
            <div className="text-h3">{filter === "hepsi" ? "Kuyruk boş" : `${FILTER_LABEL[filter]} kuyruğu boş`}</div>
            <p className="muted max-w-[34ch] text-caption">Dönülmesi gereken iş yok. Yeni şikâyet, cevapsız 1-2★ yorum, içerik bildirimi ya da uyarı gelince burada görünür.</p>
          </div>
        )}
        <p className="faint mt-4 hidden text-micro lg:block">
          <kbd className="font-mono">j</kbd> / <kbd className="font-mono">k</kbd> kuyrukta gez · kararlar sağdaki bölmede
        </p>
      </div>

      {/* AYRINTI: genişte yapışkan sütun, dar ekranda tam ekran sayfa */}
      <div
        className={`${sheet ? "fixed inset-0 z-40 block overflow-y-auto" : "hidden"} lg:sticky lg:top-14 lg:z-auto lg:block lg:h-[calc(100dvh-3.5rem)] lg:overflow-y-auto`}
        style={{ background: "var(--surface)" }}
      >
        {current && head ? (
          <div className="max-w-3xl px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pt-6">
            <div className="flex flex-wrap items-center gap-2 text-caption">
              <button type="button" onClick={() => setSheet(false)} className={`${BTN.small} lg:hidden`}>← Kuyruk</button>
              <span className="inline-flex items-center gap-1.5 rounded-chip px-2 py-0.5 text-micro" style={{ background: "var(--surface-2)", color: toneOf(current, now) }}>
                <Icon cat={current.cat} size={12} />
                {CATEGORY_LABEL[current.cat]}
              </span>
              <span className="muted">{head.kind}</span>
              {current.kind !== "alert" ? (
                <span className="ml-auto tabular-nums" style={{ color: toneOf(current, now) }}>
                  {statusText(current, now)} <span className="muted">· hedef {RESPONSE_SLA[current.queue].target}</span>
                </span>
              ) : null}
            </div>
            <h2 className="mt-3 text-h2 break-words" style={{ textWrap: "balance" }}>{head.title}</h2>
            {current.created ? <p className="muted mt-1 text-caption">Geldi: {when(current.created)}</p> : null}
            <div className="mt-6">
              <Detail
                key={current.id}
                item={current}
                ready={ready}
                busy={busy}
                send={send}
                note={notes[current.id] ?? ""}
                onNote={(v) => setNotes((n) => ({ ...n, [current.id]: v }))}
              />
            </div>
            {current.kind !== "alert" ? (
              <a href={queuePath(current.queue)} className="muted mt-8 inline-block text-caption underline underline-offset-2">Bu kuyruğun sayfası →</a>
            ) : null}
          </div>
        ) : (
          <div className="hidden p-8 lg:block">
            <Empty>Seçili iş yok.</Empty>
          </div>
        )}
      </div>
    </div>
  );
}
