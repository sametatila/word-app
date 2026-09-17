"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import type { ModerationData, ModerationDecision, ModerationTarget, ReportedPerson } from "@/lib/moderation-admin";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, Badge, when as fmtWhen, BTN, Empty, FIELD, FIELD_STYLE, Notice, PageHeader, Panel, TONE } from "../_ui/ui";
import { TwoStep } from "../_ui/two-step";

/**
 * Şikâyet kuyruğu görünümü.
 *
 * SIRA: önce kullanıcı şikâyetleri, çünkü onlar başka bir KİŞİYE dokunuyor
 * (taciz, taklit) ve mağaza kuralı hızlı işlenmelerini bekliyor; yapay zekâ
 * çıktısı bildirimleri ikinci. Her satırda "bu kişi hakkında toplam kaç şikâyet
 * / kaç engel" yazıyor: tek bir şikâyet gürültü olabilir, beşinci değil.
 */

const USER_REASON: Record<string, string> = {
  spam: "Spam",
  abuse: "Taciz / hakaret",
  impersonation: "Taklit",
  other: "Diğer",
};
const CONTENT_REASON: Record<string, string> = {
  inappropriate: "Uygunsuz",
  offensive: "Saldırgan",
  wrong: "Yanlış",
  other: "Diğer",
};
const KIND: Record<string, string> = { roleplay: "Rol yapma yanıtı", assessment: "Değerlendirme", user: "Kullanıcı" };
const ERROR_TR: Record<string, string> = {
  not_found: "Şikâyet bulunamadı.",
  not_ready: "Karar tablosu canlıda yok: önce drizzle/0059_moderation_actions.sql uygulanmalı.",
  forbidden: "Yetki yok.",
  bad_input: "Geçersiz istek.",
};

/** ISO → yerel tarih/saat. Boşsa boş. */
const when = (v: string, withTime = true) => (v ? fmtWhen(v, withTime) : "");

function Person({ p }: { p: ReportedPerson }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
      <a href={`/admin/users/${encodeURIComponent(p.id)}`} className="text-strong underline-offset-2 hover:underline">{p.name || p.username || "adsız"}</a>
      {p.username ? <span className="muted font-mono">@{p.username}</span> : null}
      <span className="muted font-mono">{p.id.slice(0, 10)}…</span>
      {p.guest ? <Badge>misafir</Badge> : null}
      {p.joined ? <span className="muted">katıldı {when(p.joined, false)}</span> : null}
    </span>
  );
}

/**
 * Karar satırı. MODÜL DÜZEYİNDE: bileşen içinde tanımlanınca her çizimde yeni
 * tip doğuyor ve not alanı her tuşta sökülüp takılıyordu (bkz. users-table `Th`).
 */
function Actions({
  note,
  busy,
  onNote,
  onDecide,
  onResetName,
}: {
  note: string;
  busy: boolean;
  onNote: (v: string) => void;
  onDecide: (a: ModerationDecision) => void;
  /** Yalnız kullanıcı şikâyetinde: hedefin görünen adını ve kullanıcı adını sıfırlar. */
  onResetName?: () => void;
}) {
  /* Yıkıcı eylem İKİ ADIM, sistem kutusu değil (parite §255: kullanıcıya
     açık yüzeyde `confirm()` yok). */
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
      <input value={note} onChange={(e) => onNote(e.target.value)} placeholder="Not (isteğe bağlı): ne yapıldı" aria-label="Karar notu" className={`${FIELD} flex-1 basis-56`} style={FIELD_STYLE} />
      <button type="button" disabled={busy} onClick={() => onDecide("resolved")} className={BTN.secondary}>Gereği yapıldı</button>
      <button type="button" disabled={busy} onClick={() => onDecide("dismissed")} className={BTN.secondary}>Asılsız</button>
      {onResetName ? <TwoStep label="Adı sıfırla + kapat" confirm="Evet, ad ve kullanıcı adı silinsin" disabled={busy} onConfirm={onResetName} /> : null}
    </div>
  );
}

export function ModerationAdmin({ data }: { data: ModerationData }) {
  const [gone, setGone] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function decide(target: ModerationTarget, refId: number, action: ModerationDecision | "reset_name") {
    const key = `${target}:${refId}`;
    setBusy(key);
    setMsg("");
    try {
      const res = await apiFetch("/api/admin/moderation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ target, refId, action, note: notes[key] ?? "" }),
      });
      if (!res.ok) {
        const code = String(((await res.json().catch(() => ({}))) as { error?: string }).error ?? res.status);
        setMsg(ERROR_TR[code] ?? adminErrorText(code));
        return;
      }
      setGone((s) => new Set(s).add(key));
    } catch {
      setMsg("Ağ hatası");
    } finally {
      setBusy("");
    }
  }

  const userReports = data.userReports.filter((r) => !gone.has(`user_report:${r.id}`));
  const contentReports = data.contentReports.filter((r) => !gone.has(`content_report:${r.id}`));

  const card = "rounded-tile border p-4 text-caption";
  const cardStyle = { borderColor: "var(--border)" };

  return (
    <AdminPage>
      <PageHeader
        title="Moderasyon"
        description="Kullanıcı şikâyetleri ve yapay zekâ içerik bildirimleri. Otomatik yaptırım yok; karar burada."
        meta={<>Açık: <b>{userReports.length}</b> kullanıcı şikâyeti · <b>{contentReports.length}</b> içerik bildirimi</>}
      />
      {!data.ready ? <Notice tone="warn">Karar tablosu (moderation_actions) canlıda yok: kullanıcı şikâyetleri okunabiliyor ama kapatılamıyor.</Notice> : null}
      {msg ? <Notice tone="bad">{msg}</Notice> : null}

      <Panel title="Kullanıcı şikâyetleri" hint="Sosyal özelliklerden: bir hesap başka bir hesabı şikâyet etti. Ad/kullanıcı adı ihlalse 'Adı sıfırla' ikisini de siler ve şikâyeti kapatır.">
        {userReports.length ? (
          <div className="space-y-3">
            {userReports.map((r) => (
              <div key={r.id} className={card} style={cardStyle}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-strong">{USER_REASON[r.reason] ?? r.reason}</span>
                  <span className="muted font-mono tabular-nums">#{r.id} · {when(r.at)}</span>
                </div>
                <div className="mt-1.5">Şikâyet edilen: <Person p={r.reported} /></div>
                <div className="mt-0.5" style={{ color: r.reportsAgainst > 1 || r.blockedBy > 1 ? TONE.bad : "var(--text-muted)" }}>
                  Bu hesap hakkında toplam {r.reportsAgainst} şikâyet · {r.blockedBy} engel
                </div>
                <div className="muted mt-0.5">Şikâyet eden: <Person p={r.reporter} /></div>
                {r.detail ? <p className="mt-2 whitespace-pre-wrap rounded-tile px-3 py-2 text-body" style={{ background: "var(--surface-2)" }}>{r.detail}</p> : null}
                {data.ready ? <Actions note={notes[`user_report:${r.id}`] ?? ""} busy={busy === `user_report:${r.id}`} onNote={(v) => setNotes((n) => ({ ...n, [`user_report:${r.id}`]: v }))} onDecide={(a) => decide("user_report", r.id, a)} onResetName={() => void decide("user_report", r.id, "reset_name")} /> : null}
              </div>
            ))}
          </div>
        ) : (
          <Empty>Açık kullanıcı şikâyeti yok.</Empty>
        )}
      </Panel>

      <Panel title="İçerik bildirimleri" hint="Yapay zekâ yanıtı ya da değerlendirme çıktısı için. Play üretken yapay zekâ politikası: insan inceler.">
        {contentReports.length ? (
          <div className="space-y-3">
            {contentReports.map((r) => (
              <div key={r.id} className={card} style={cardStyle}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-strong">{KIND[r.kind] ?? r.kind} · {CONTENT_REASON[r.reason] ?? r.reason}</span>
                  <span className="muted font-mono tabular-nums">#{r.id} · {when(r.at)}</span>
                </div>
                <div className="muted mt-0.5 font-mono">{r.ref}</div>
                <div className="muted mt-0.5">Bildiren: <Person p={r.reporter} /></div>
                {r.content ? <p className="mt-2 whitespace-pre-wrap rounded-tile px-3 py-2 text-body" style={{ background: "var(--surface-2)" }}>{r.content}</p> : null}
                <Actions note={notes[`content_report:${r.id}`] ?? ""} busy={busy === `content_report:${r.id}`} onNote={(v) => setNotes((n) => ({ ...n, [`content_report:${r.id}`]: v }))} onDecide={(a) => decide("content_report", r.id, a)} />
              </div>
            ))}
          </div>
        ) : (
          <Empty>Açık içerik bildirimi yok.</Empty>
        )}
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="En çok engellenen hesaplar" hint="Şikâyet gelmese de bakılacak yer: engellemek şikâyet etmekten kolay.">
          {data.mostBlocked.length ? (
            <div className="space-y-1.5 text-caption">
              {data.mostBlocked.map((b) => (
                <div key={b.person.id} className="flex items-baseline gap-3">
                  <span className="w-8 shrink-0 text-right text-strong tabular-nums">{b.count}</span>
                  <Person p={b.person} />
                </div>
              ))}
            </div>
          ) : (
            <Empty>Engelleme yok.</Empty>
          )}
        </Panel>

        <Panel title="Son kararlar" hint="Kim, neyi, hangi notla kapattı.">
          {data.closed.length ? (
            <div className="space-y-1.5 text-caption">
              {data.closed.map((c) => (
                <div key={`${c.target}:${c.refId}`} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="muted font-mono tabular-nums">{when(c.at)}</span>
                  <span>{c.target === "user_report" ? "Kullanıcı" : "İçerik"} #{c.refId}</span>
                  <Badge tone={c.action === "resolved" ? "ok" : undefined}>{c.action === "resolved" ? "gereği yapıldı" : "asılsız"}</Badge>
                  <span className="muted">{c.actor}</span>
                  {c.note ? <span>· {c.note}</span> : null}
                </div>
              ))}
            </div>
          ) : (
            <Empty>Henüz karar yok.</Empty>
          )}
        </Panel>
      </div>
    </AdminPage>
  );
}
