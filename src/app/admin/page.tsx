import type { Metadata } from "next";
import { adminGate, getAdminData, type AdminData } from "@/lib/admin";
import { UsersTable } from "./users-table";

export const metadata: Metadata = { title: "Yönetim" };
export const dynamic = "force-dynamic";

/**
 * exfe.me/admin — sahibin yönetim panosu. Aktivasyon, retention, gelir hunisi,
 * içerik/öğrenme detayı, kullanıcı istatistikleri ve ham telemetri tek yerde.
 * Erişim ADMIN_EMAILS ile sınırlı; admin olmayan için 404 (varlığı gizli).
 */
function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(Math.round(n));
}
function pct(v: number): string {
  return Math.round(v * 100) + "%";
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
      {sub && <div className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</div>}
    </div>
  );
}

function BarList({ items, max, unit }: { items: { label: string; value: number; right?: string }[]; max: number; unit?: string }) {
  const top = Math.max(max, 1);
  return (
    <div className="space-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-40 shrink-0 truncate" style={{ color: "var(--text)" }}>{it.label}</span>
          <span className="relative h-4 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
            <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(2, Math.round((it.value / top) * 100))}%`, background: "var(--color-brand)" }} />
          </span>
          <span className="w-16 shrink-0 text-right text-xs font-bold">{it.right ?? fmt(it.value) + (unit ?? "")}</span>
        </div>
      ))}
      {items.length === 0 && <div className="text-sm" style={{ color: "var(--text-muted)" }}>Henüz veri yok.</div>}
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h2 className="text-sm font-extrabold uppercase tracking-wide">{title}</h2>
      {hint && <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>{hint}</p>}
      <div className={hint ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

function TrendChart({ trend }: { trend: AdminData["trend"] }) {
  const max = Math.max(1, ...trend.map((t) => t.reviews));
  return (
    <div>
      <div className="flex h-32 items-end gap-[3px]">
        {trend.map((t) => (
          <div key={t.day} className="group relative flex-1" title={`${t.day} · ${t.active} aktif · ${t.reviews} tekrar`}>
            <div className="w-full rounded-t" style={{ height: `${Math.max(2, Math.round((t.reviews / max) * 100))}%`, background: "var(--color-brand)" }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
        <span>{trend[0]?.day ?? ""}</span>
        <span>günlük tekrar · son 30 gün</span>
        <span>{trend[trend.length - 1]?.day ?? ""}</span>
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Yönetim panosu</h1>
        {gate.email ? (
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Bu hesap (<b>{gate.email}</b>) yönetim yetkisine sahip değil. Admin e-postasıyla giriş yap.
            Ek admin eklemek için <code>ADMIN_EMAILS</code>&apos;e ekle ve <b>yeniden deploy et</b>
            (ortam değişkeni değişikliği ancak yeni deploy&apos;da etkinleşir).
          </p>
        ) : (
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Önce giriş yap, sonra admin e-postasıyla bu sayfaya dön.
          </p>
        )}
      </div>
    );
  }

  const d = await getAdminData();
  const k = d.kpi;
  const maxLevel = Math.max(1, ...d.levels.map((l) => l.count));
  const maxEvent = Math.max(1, ...d.events30.map((e) => e.count));
  const maxGame = Math.max(1, ...d.games.map((g) => g.count));
  const maxErr = Math.max(1, ...d.errors.map((e) => e.count));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Yönetim panosu</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Canlı veriler — web + mobil. Detay için aşağı in.</p>
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {new Date(d.generatedAt).toLocaleString("tr-TR")}
        </span>
      </header>

      {/* KPI'lar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Kpi label="Toplam kullanıcı" value={fmt(k.totalUsers)} sub={`+${k.new1d} bugün · +${k.new7d} 7g · +${k.new30d} 30g`} />
        <Kpi label="Aktif (DAU/WAU/MAU)" value={`${fmt(k.dau)}/${fmt(k.wau)}/${fmt(k.mau)}`} sub="günlük / haftalık / aylık" />
        <Kpi label="Seri tutan" value={fmt(k.streakUsers)} sub={`ort. ${Math.round(k.avgStreak)} gün`} />
        <Kpi label="Toplam XP" value={fmt(k.totalXp)} />
        <Kpi label="Toplam tekrar" value={fmt(k.totalReviews)} sub={`${fmt(k.reviews1d)} bugün`} />
        <Kpi label="Doğruluk" value={pct(k.accuracy)} sub="tüm günlük istatistikler" />
        <Kpi label="Çalışma süresi (30g)" value={`${fmt(k.seconds30d / 3600)} sa`} />
        <Kpi label="Premium üye" value="0" sub="RevenueCat bağlanınca" />
      </div>

      {/* Aktivite trendi */}
      <Section title="Aktivite trendi" hint="Günlük tekrar hacmi — son 30 gün.">
        <TrendChart trend={d.trend} />
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Retention + funnel */}
        <Section title="Dönüşüm hunisi & retention" hint={`Kohort tabanı: ${d.funnel.retentionBase} kullanıcı.`}>
          <BarList max={d.funnel.totalUsers} items={[
            { label: "Kaydolan", value: d.funnel.totalUsers },
            { label: "Aktive olan (ilk tur)", value: d.funnel.activated },
            { label: "Paywall gördü", value: d.funnel.paywallView },
            { label: "Satın alma başlattı", value: d.funnel.purchaseStart },
            { label: "Satın aldı", value: d.funnel.purchaseDone },
          ]} />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[["D1", d.funnel.d1], ["D7", d.funnel.d7], ["D30", d.funnel.d30]].map(([lbl, v]) => (
              <div key={String(lbl)} className="rounded-xl border p-2" style={{ borderColor: "var(--border)" }}>
                <div className="text-lg font-extrabold" style={{ color: "var(--color-brand)" }}>{pct(d.funnel.retentionBase ? (v as number) / d.funnel.retentionBase : 0)}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{lbl} retention</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Seviye + kurs dağılımı */}
        <Section title="Seviye & kurs dağılımı">
          <BarList max={maxLevel} items={d.levels.map((l) => ({ label: l.level, value: l.count }))} />
          <div className="mt-3 flex flex-wrap gap-2">
            {d.courses.map((c) => (
              <span key={c.course} className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "var(--surface-2)" }}>
                {c.course === "gsw-zh" ? "Zürih Almancası" : "Almanca"}: {fmt(c.count)}
              </span>
            ))}
          </div>
        </Section>

        {/* Oyun performansı */}
        <Section title="Oyun / mekanik performansı" hint="Oyun türüne göre hacim ve doğruluk.">
          <BarList max={maxGame} items={d.games.map((g) => ({ label: g.game, value: g.count, right: `${fmt(g.count)} · ${pct(g.accuracy)}` }))} />
        </Section>

        {/* En zorlanılan kelimeler */}
        <Section title="En zorlanılan kelimeler" hint="En çok unutulan (lapse) / leech kelimeler — içerik iyileştirme için.">
          <BarList max={Math.max(1, ...d.hardWords.map((w) => w.lapses))} items={d.hardWords.map((w) => ({ label: `${w.de} · ${w.tr}`, value: w.lapses, right: `${w.lapses} lapse${w.leeches ? ` · ${w.leeches}🩸` : ""}` }))} />
        </Section>

        {/* Hata tipleri */}
        <Section title="Hata tipleri" hint="Yanlış cevapların sınıflandırması.">
          <BarList max={maxErr} items={d.errors.map((e) => ({ label: e.type, value: e.count }))} />
        </Section>

        {/* Telemetri: olay sayıları */}
        <Section title="Telemetri — olaylar (30g)" hint="Ada göre olay sayısı ve tekil kullanıcı.">
          <BarList max={maxEvent} items={d.events30.map((e) => ({ label: e.name, value: e.count, right: `${fmt(e.count)} · ${fmt(e.users)}👤` }))} />
        </Section>
      </div>

      {/* Kullanıcılar tablosu */}
      <Section title={`Kullanıcılar (${d.users.length})`} hint="Ara, sütuna tıklayıp sırala. Son aktif olana göre sıralı; en fazla 500.">
        <UsersTable users={d.users} />
      </Section>

      {/* Ham olay akışı */}
      <Section title="Son olaylar" hint="En yeni 40 telemetri olayı (ham).">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead style={{ color: "var(--text-muted)" }}>
              <tr><th className="py-1 pr-3">Gün</th><th className="pr-3">Olay</th><th className="pr-3">Etiket</th><th className="pr-3">Değer</th><th>Kullanıcı</th></tr>
            </thead>
            <tbody>
              {d.recentEvents.map((e, i) => (
                <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="py-1 pr-3 tabular-nums">{e.day}</td>
                  <td className="pr-3 font-semibold">{e.name}</td>
                  <td className="pr-3" style={{ color: "var(--text-muted)" }}>{e.kind || "—"}</td>
                  <td className="pr-3 tabular-nums">{e.value}</td>
                  <td className="font-mono" style={{ color: "var(--text-muted)" }}>{e.userId.slice(0, 10)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
