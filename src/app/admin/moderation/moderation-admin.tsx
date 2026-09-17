"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import type { ModerationData, ModerationDecision, ModerationTarget, ReportedPerson } from "@/lib/moderation-admin";
import { adminErrorText } from "@/lib/admin-errors";

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
const when = (v: string, withTime = true) =>
  v ? (withTime ? new Date(v).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" }) : new Date(v).toLocaleDateString("tr-TR")) : "";

function Person({ p }: { p: ReportedPerson }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
      <a href={`/admin/users/${encodeURIComponent(p.id)}`} className="font-bold underline-offset-2 hover:underline">{p.name || p.username || "adsız"}</a>
      {p.username ? <span className="font-mono" style={{ color: "var(--text-muted)" }}>@{p.username}</span> : null}
      <span className="font-mono text-micro" style={{ color: "var(--text-muted)" }}>{p.id.slice(0, 10)}…</span>
      {p.guest ? <span className="chip h-5 px-1.5 text-micro">misafir</span> : null}
      {p.joined ? <span className="text-micro" style={{ color: "var(--text-muted)" }}>katıldı {when(p.joined, false)}</span> : null}
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
     açık yüzeyde `confirm()` yok). İlk basış silahı kurar, ikincisi siler. */
  const [armed, setArmed] = useState(false);
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <input
        value={note}
        onChange={(e) => onNote(e.target.value)}
        placeholder="Not (isteğe bağlı): ne yapıldı"
        aria-label="Karar notu"
        className="h-8 min-w-0 flex-1 rounded-tile border px-2 text-caption"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" }}
      />
      <button type="button" disabled={busy} onClick={() => onDecide("resolved")} className="chip h-8 px-3 text-caption">
        Gereği yapıldı
      </button>
      <button type="button" disabled={busy} onClick={() => onDecide("dismissed")} className="chip h-8 px-3 text-caption">
        Asılsız
      </button>
      {onResetName ? (
        armed ? (
          <>
            <button type="button" disabled={busy} onClick={onResetName} className="chip h-8 px-3 text-caption" style={{ color: "var(--color-rose)" }}>
              Evet, ad ve kullanıcı adı silinsin
            </button>
            <button type="button" onClick={() => setArmed(false)} className="chip h-8 px-3 text-caption">Vazgeç</button>
          </>
        ) : (
          <button type="button" disabled={busy} onClick={() => setArmed(true)} className="chip h-8 px-3 text-caption" style={{ color: "var(--color-rose)" }}>
            Adı sıfırla + kapat
          </button>
        )
      ) : null}
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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6">
      <header className="flex flex-col gap-1">
        <a href="/admin" className="text-caption" style={{ color: "var(--text-muted)" }}>← Yönetim</a>
        <h1 className="text-h1">Moderasyon</h1>
        <p className="muted text-body">
          Açık: <b>{userReports.length}</b> kullanıcı şikâyeti · <b>{contentReports.length}</b> içerik bildirimi. Otomatik yaptırım yok; karar burada.
        </p>
        {!data.ready ? (
          <p className="text-caption" style={{ color: "var(--color-rose)" }}>
            Karar tablosu (moderation_actions) canlıda yok: kullanıcı şikâyetleri okunabiliyor ama kapatılamıyor.
          </p>
        ) : null}
        {msg ? <p className="text-caption" style={{ color: "var(--color-rose)" }} role="status">{msg}</p> : null}
      </header>

      <Section title="Kullanıcı şikâyetleri" sub="Sosyal özelliklerden: bir hesap başka bir hesabı şikâyet etti. Ad/kullanıcı adı ihlalse 'Adı sıfırla' ikisini de siler ve şikâyeti kapatır.">
        {userReports.length ? (
          <div className="space-y-2">
            {userReports.map((r) => (
              <div key={r.id} className="card px-3 py-3 text-caption">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold">{USER_REASON[r.reason] ?? r.reason}</span>
                  <span className="font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>#{r.id} · {when(r.at)}</span>
                </div>
                <div className="mt-1">Şikâyet edilen: <Person p={r.reported} /></div>
                <div className="mt-0.5" style={{ color: r.reportsAgainst > 1 || r.blockedBy > 1 ? "var(--color-rose)" : "var(--text-muted)" }}>
                  Bu hesap hakkında toplam {r.reportsAgainst} şikâyet · {r.blockedBy} engel
                </div>
                <div className="mt-0.5" style={{ color: "var(--text-muted)" }}>Şikâyet eden: <Person p={r.reporter} /></div>
                {r.detail ? <p className="mt-1 whitespace-pre-wrap">{r.detail}</p> : null}
                {data.ready ? <Actions note={notes[`user_report:${r.id}`] ?? ""} busy={busy === `user_report:${r.id}`} onNote={(v) => setNotes((n) => ({ ...n, [`user_report:${r.id}`]: v }))} onDecide={(a) => decide("user_report", r.id, a)} onResetName={() => void decide("user_report", r.id, "reset_name")} /> : null}
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Açık kullanıcı şikâyeti yok." />
        )}
      </Section>

      <Section title="İçerik bildirimleri" sub="Yapay zekâ yanıtı ya da değerlendirme çıktısı için. Play üretken yapay zekâ politikası: insan inceler.">
        {contentReports.length ? (
          <div className="space-y-2">
            {contentReports.map((r) => (
              <div key={r.id} className="card px-3 py-3 text-caption">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold">{KIND[r.kind] ?? r.kind} · {CONTENT_REASON[r.reason] ?? r.reason}</span>
                  <span className="font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>#{r.id} · {when(r.at)}</span>
                </div>
                <div className="mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>{r.ref}</div>
                <div className="mt-0.5" style={{ color: "var(--text-muted)" }}>Bildiren: <Person p={r.reporter} /></div>
                {r.content ? <p className="mt-1 whitespace-pre-wrap">{r.content}</p> : null}
                <Actions note={notes[`content_report:${r.id}`] ?? ""} busy={busy === `content_report:${r.id}`} onNote={(v) => setNotes((n) => ({ ...n, [`content_report:${r.id}`]: v }))} onDecide={(a) => decide("content_report", r.id, a)} />
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Açık içerik bildirimi yok." />
        )}
      </Section>

      <Section title="En çok engellenen hesaplar" sub="Şikâyet gelmese de bakılacak yer: engellemek şikâyet etmekten kolay.">
        {data.mostBlocked.length ? (
          <div className="space-y-1 text-caption">
            {data.mostBlocked.map((b) => (
              <div key={b.person.id} className="flex items-baseline gap-2">
                <span className="w-10 shrink-0 text-right tabular-nums font-semibold">{b.count}</span>
                <Person p={b.person} />
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Engelleme yok." />
        )}
      </Section>

      <Section title="Son kararlar" sub="Kim, neyi, hangi notla kapattı.">
        {data.closed.length ? (
          <div className="space-y-1 text-caption">
            {data.closed.map((c) => (
              <div key={`${c.target}:${c.refId}`} className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>{when(c.at)}</span>
                <span>{c.target === "user_report" ? "Kullanıcı" : "İçerik"} #{c.refId}</span>
                <b>{c.action === "resolved" ? "gereği yapıldı" : "asılsız"}</b>
                <span style={{ color: "var(--text-muted)" }}>{c.actor}</span>
                {c.note ? <span>· {c.note}</span> : null}
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Henüz karar yok." />
        )}
      </Section>
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
  return (
    <div className="card px-3 py-4 text-caption" style={{ color: "var(--text-muted)" }}>
      {text}
    </div>
  );
}
