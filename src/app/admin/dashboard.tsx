"use client";

import { useState } from "react";
import type { AdminData } from "@/lib/admin";
import type { ServerMetrics } from "@/lib/server-metrics";
import type { Coverage } from "@/lib/admin-coverage";
import type { Revenue } from "@/lib/premium/revenue";
import { UsersTable } from "./users-table";

/**
 * Yönetim panosu — sekmeli client kabuk. Sunucu bileşeni (page.tsx) veriyi
 * çeker, buraya prop olarak verir; sekmeler istemcide gezilir (tek fetch).
 */
function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(Math.round(n));
}
const pct = (v: number) => Math.round(v * 100) + "%";
function dur(sec: number): string {
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60);
  return d ? `${d}g ${h}s` : h ? `${h}s ${m}dk` : `${m}dk`;
}

function Kpi({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "ok" | "warn" | "bad" }) {
  const color = tone === "bad" ? "#dc2626" : tone === "warn" ? "#d97706" : tone === "ok" ? "#16a34a" : "var(--text)";
  return (
    <div className="rounded-card border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="text-micro uppercase tracking-eyebrow" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="mt-1 text-h1" style={{ color }}>{value}</div>
      {sub && <div className="text-caption" style={{ color: "var(--text-muted)" }}>{sub}</div>}
    </div>
  );
}

function Bar({ frac, tone }: { frac: number; tone?: string }) {
  return (
    <span className="relative h-4 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(2, Math.round(frac * 100))}%`, background: tone ?? "var(--color-brand)" }} />
    </span>
  );
}
function BarList({ items, max, unit }: { items: { label: string; value: number; right?: string; tone?: string }[]; max: number; unit?: string }) {
  const top = Math.max(max, 1);
  return (
    <div className="space-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2 text-body">
          <span className="w-44 shrink-0 truncate" style={{ color: "var(--text)" }} title={it.label}>{it.label}</span>
          <Bar frac={it.value / top} tone={it.tone} />
          <span className="w-20 shrink-0 text-right text-caption tabular-nums">{it.right ?? fmt(it.value) + (unit ?? "")}</span>
        </div>
      ))}
      {items.length === 0 && <div className="text-body" style={{ color: "var(--text-muted)" }}>Henüz veri yok.</div>}
    </div>
  );
}

function Section({ title, hint, children, full }: { title: string; hint?: string; children: React.ReactNode; full?: boolean }) {
  return (
    <section className={`rounded-card border p-5 ${full ? "lg:col-span-2" : ""}`} style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h2 className="text-micro uppercase tracking-eyebrow">{title}</h2>
      {hint && <p className="mb-3 text-caption" style={{ color: "var(--text-muted)" }}>{hint}</p>}
      <div className={hint ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

function Gauge({ label, pctVal, detail }: { label: string; pctVal: number; detail: string }) {
  const tone = pctVal >= 90 ? "#dc2626" : pctVal >= 75 ? "#d97706" : "#16a34a";
  return (
    <div>
      <div className="flex items-baseline justify-between text-body">
        <span className="font-semibold">{label}</span>
        <span className="text-caption tabular-nums" style={{ color: tone }}>{pctVal}%</span>
      </div>
      <div className="mt-1"><Bar frac={pctVal / 100} tone={tone} /></div>
      <div className="mt-0.5 text-micro" style={{ color: "var(--text-muted)" }}>{detail}</div>
    </div>
  );
}

function TrendChart({ trend }: { trend: AdminData["trend"] }) {
  const max = Math.max(1, ...trend.map((t) => t.reviews));
  return (
    <div>
      <div className="flex h-32 items-end gap-[3px]">
        {trend.map((t) => (
          <div key={t.day} className="group relative flex-1" title={`${t.day} · ${t.active} aktif · ${t.reviews} tekrar · ${t.xp} XP`}>
            <div className="w-full rounded-t" style={{ height: `${Math.max(2, Math.round((t.reviews / max) * 100))}%`, background: "var(--color-brand)" }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-micro" style={{ color: "var(--text-muted)" }}>
        <span>{trend[0]?.day ?? ""}</span><span>günlük tekrar · son 30 gün</span><span>{trend[trend.length - 1]?.day ?? ""}</span>
      </div>
    </div>
  );
}

const PLATFORM_LABEL: Record<string, string> = {
  "desktop:browser": "Masaüstü · web", "desktop:standalone": "Masaüstü · uygulama",
  "android:browser": "Android · web", "android:standalone": "Android · web uygulaması",
  "ios:browser": "iOS · web", "ios:standalone": "iOS · web uygulaması",
  "android:native": "Android · mağaza uygulaması", "ios:native": "iOS · mağaza uygulaması",
};
const WALK_REASON: Record<number, string> = {
  1: "Kullanıcı bitirdi", 2: "Tur kalmadı", 3: "Duyulmama sınırı", 4: "Mikrofon yok", 5: "Ekran kapandı", 6: "Elle duraklatıldı / çıkıldı",
};
/*
  Onboarding hunisi — web ve mobil AYNI beş adımı yayınlıyor. Liste eskiden
  webin kendi akışını yansıtıyordu (`ready` yalnız webde vardı, mobilin `lang`
  ve `course` adımları hiç görünmüyordu) ve `goal` kovası iki platformda iki
  ayrı soruyu topluyordu: webde "neden öğreniyorsun", mobilde günlük hedef.
*/
const ONB_ORDER = ["welcome", "lang", "course", "level", "goal"];
const ONB_LABEL: Record<string, string> = { welcome: "Karşılama", lang: "Anlatım dili", course: "Kurs", level: "Seviye", goal: "Günlük hedef" };

/*
  Dil çifti etiketi. Eskiden kurs `gsw-zh` değilse "Almanca" yazılıyordu:
  İngilizce kursun öğrencileri Almanca sayılıyordu ve anadil hiç görünmüyordu.
*/
const LANG_SHORT: Record<string, string> = { tr: "TR", en: "EN", de: "DE", "gsw-zh": "Zürih" };
const pairLabel = (native: string, course: string) => `${LANG_SHORT[native] ?? native} → ${LANG_SHORT[course] ?? course}`;

const INSTALL_LABEL: Record<string, string> = { "0": "Reddetti", "1": "Ekledi", "2": "iOS ipucu gösterildi" };
const GUEST_UPGRADE_LABEL: Record<string, string> = {
  moved: "Yeni hesaba taşındı", merged: "Var olan hesapla birleşti", discarded: "Misafir verisi bırakıldı", upgraded: "Yerinde hesap oldu",
};
const CONSENT_LABEL: Record<string, string> = { ai_text: "Yapay zekâ · metin", ai_voice: "Yapay zekâ · ses" };

/**
 * GELİR — kompakt: tek KPI satırı + tek kırılım satırı + kaynak notu.
 * Ayrıntılı tablo yerine sayılar yan yana: "bu ay ne kazandık, kaçı kalıyor,
 * denemeler dönüşüyor mu, iade/ödeme sorunu var mı" tek bakışta. Kaynaklar
 * `lib/premium/revenue` başında; tutarlar brüt USD (mağaza payı düşülmemiş).
 */
const usd = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`);
function RevenueCard({ r }: { r: Revenue }) {
  const w = r.window;
  const conv = w.trialsStarted ? Math.round((w.trialConversions / w.trialsStarted) * 100) : null;
  const rc = r.revenuecat && !("error" in r.revenuecat) ? r.revenuecat : null;
  const rcError = r.revenuecat && "error" in r.revenuecat ? r.revenuecat.error : null;
  return (
    <section className="rounded-card border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }} aria-label="Gelir">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-micro uppercase tracking-eyebrow">Gelir · son 30 gün</h2>
        {!r.webhookConfigured ? (
          <span className="text-caption" style={{ color: "#dc2626" }}>Mağaza webhook&apos;u kapalı (REVENUECAT_WEBHOOK_AUTH): satın almalar kaydedilmiyor</span>
        ) : null}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 lg:grid-cols-7">
        <Mini label="MRR" value={usd(rc?.mrrUsd ?? r.now.mrrUsd)} sub={rc?.mrrUsd != null ? "RevenueCat" : "defterden tahmin"} />
        <Mini label="Net gelir" value={usd(w.netUsd)} sub={`brüt ${usd(w.grossUsd)}${w.refundsUsd ? ` · iade ${usd(w.refundsUsd)}` : ""}`} />
        <Mini label="Aktif abone" value={String(r.now.activePaid)} sub={`${r.now.willNotRenew} yenilemeyecek${r.now.inGrace ? ` · ${r.now.inGrace} ödeme bekliyor` : ""}`} tone={r.now.willNotRenew > r.now.activePaid / 3 ? "warn" : undefined} />
        <Mini label="Deneme" value={String(r.now.activeTrials)} sub={`${w.trialsStarted} başladı · ${w.trialConversions} dönüştü${conv != null ? ` (%${conv})` : ""}`} />
        <Mini label="Yeni ücretli" value={String(w.newPaid)} sub={`${w.renewals} yenileme`} />
        <Mini label="Kayıp" value={String(w.cancellations)} sub={`iptal · ${w.expirations} sona erdi`} tone={w.cancellations ? "warn" : undefined} />
        <Mini label="Sorun" value={String(w.refunds + w.billingIssues)} sub={`${w.refunds} iade · ${w.billingIssues} ödeme sorunu`} tone={w.refunds + w.billingIssues ? "bad" : undefined} />
      </div>
      <p className="mt-3 text-caption" style={{ color: "var(--text-muted)" }}>
        {r.byPlatform.length ? r.byPlatform.map((p) => `${p.platform}: ${usd(p.grossUsd)} · ${p.payments} ödeme · ${p.active} aktif`).join("  |  ") : "Henüz mağaza olayı yok."}
        {r.byProduct.length ? `  ·  ${r.byProduct.map((p) => `${p.product} ${usd(p.grossUsd)}`).join(", ")}` : ""}
        {rc ? `  ·  RevenueCat 28g gelir ${rc.revenue28dUsd != null ? usd(rc.revenue28dUsd) : "?"}, yeni müşteri ${rc.newCustomers28d ?? "?"}` : ""}
        {rcError ? <span style={{ color: "#d97706" }}>  ·  {rcError}</span> : null}
        {!r.revenuecat && !rcError ? "  ·  RevenueCat API anahtarı yok (resmi MRR kapalı)" : ""}
      </p>
    </section>
  );
}

function Mini({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "warn" | "bad" }) {
  const color = tone === "bad" ? "#dc2626" : tone === "warn" ? "#d97706" : "var(--text)";
  return (
    <div className="min-w-0">
      <div className="text-micro uppercase tracking-eyebrow" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="text-h2 tabular-nums" style={{ color }}>{value}</div>
      {sub ? <div className="text-micro" style={{ color: "var(--text-muted)" }}>{sub}</div> : null}
    </div>
  );
}

const TABS = ["Genel Bakış", "Sunucu & Ops", "Kullanıcı Deneyimi", "Öğrenme & İçerik", "Büyüme & Sosyal", "Kullanıcılar", "Loglar"] as const;

export function AdminDashboard({ data: d, server: s, coverage: c, openReports, revenue: r }: { data: AdminData; server: ServerMetrics; coverage: Coverage; openReports: number; revenue: Revenue }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Genel Bakış");
  const k = d.kpi;

  const appOpens = d.platform.reduce((a, p) => a + p.count, 0);
  const installed = d.platform.filter((p) => p.key.includes("standalone")).reduce((a, p) => a + p.count, 0);
  const sess = d.sessionFunnel;
  const sessRate = sess.started ? sess.done / sess.started : 0;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-display tracking-tight">Yönetim panosu</h1>
          <p className="text-body" style={{ color: "var(--text-muted)" }}>Canlı veriler — web + mobil · sunucu · telemetri</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Ayrı sayfada duran yönetim ekranları: panonun sekmeleri okuma,
              bunlar YAZMA. Karıştırmamak için görsel olarak da ayrı. */}
          <a href="/admin/moderation" className="chip h-8 px-3 text-caption" style={openReports ? { color: "#dc2626" } : undefined}>
            Moderasyon{openReports ? ` (${openReports})` : ""}
          </a>
          <a href="/admin/app" className="chip h-8 px-3 text-caption">Uygulama</a>
          <a href="/admin/premium" className="chip h-8 px-3 text-caption">Premium</a>
          <a href="/admin/quiz" className="chip h-8 px-3 text-caption">Haftalık quiz</a>
          <a href="/admin/legal" className="chip h-8 px-3 text-caption">Hukuki metinler</a>
          <span className="text-caption" style={{ color: "var(--text-muted)" }}>{new Date(d.generatedAt).toLocaleString("tr-TR")}</span>
        </div>
      </header>

      {/* Sekmeler — seçili olan yalnız RENKTEN okunuyordu, hiçbir durum
          bildirimi yoktu. `tablist`/`tab` (bkz. parity 258). */}
      <div role="tablist" aria-label="Bölümler" className="flex flex-wrap gap-1.5 border-b pb-2" style={{ borderColor: "var(--border)" }}>
        {TABS.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className="rounded-full px-3.5 py-1.5 text-strong transition"
            style={tab === t ? { background: "var(--color-brand)", color: "var(--on-fill)" } : { background: "var(--surface-2)", color: "var(--text-muted)" }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── GENEL BAKIŞ ── */}
      {tab === "Genel Bakış" && (
        <div className="space-y-6">
          <RevenueCard r={r} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Kpi label="Toplam kullanıcı" value={fmt(k.totalUsers)} sub={`+${k.new1d} bugün · +${k.new7d} 7g · +${k.new30d} 30g · ${fmt(k.guestUsers)} misafir`} />
            <Kpi label="Aktif DAU/WAU/MAU" value={`${fmt(k.dau)}/${fmt(k.wau)}/${fmt(k.mau)}`} sub="günlük / haftalık / aylık" />
            <Kpi label="Seri tutan" value={fmt(k.streakUsers)} sub={`ort. ${Math.round(k.avgStreak)} gün`} />
            <Kpi label="Toplam XP" value={fmt(k.totalXp)} />
            <Kpi label="Toplam tekrar" value={fmt(k.totalReviews)} sub={`${fmt(k.reviews1d)} bugün`} />
            <Kpi label="Doğruluk" value={pct(k.accuracy)} sub="tüm günlük istatistik" tone={k.accuracy >= 0.7 ? "ok" : "warn"} />
            <Kpi label="Çalışma (30g)" value={`${fmt(k.seconds30d / 3600)} sa`} />
            <Kpi label="Tur tamamlama" value={pct(sessRate)} sub={`${fmt(sess.done)}/${fmt(sess.started)} tur`} tone={sessRate >= 0.6 ? "ok" : "warn"} />
            <Kpi label="Premium (şu an)" value={fmt(c.premium.active)} sub={`${fmt(c.premium.store)} mağaza · ${fmt(c.premium.bonus)} hediye/davet`} />
            <Kpi label="Ders (30g)" value={`${fmt(c.learning.lessons.finished)}/${fmt(c.learning.lessons.started)}`} sub={`bitti/başladı · ${fmt(c.learning.lessons.users)} kişi`} />
            <Kpi label="Misafir" value={fmt(c.growth.guests.total)} sub={`${fmt(c.growth.guests.active7)} aktif 7g · ${fmt(c.growth.guests.stale20)} silinmeye yakın`} tone={c.growth.guests.stale20 > 0 ? "warn" : undefined} />
            <Kpi label="Açık şikâyet" value={fmt(openReports)} sub="kullanıcı + içerik" tone={openReports > 0 ? "bad" : "ok"} />
          </div>
          {/* ALARM ŞERİDİ. Sessiz kırılmalar: koşmayan zamanlanmış iş, eskiyen
              yedek, çökmüş servis. Hepsi başka sekmede ayrıntılı; burada yalnız
              "bir şey mi var" sorusu. */}
          {(() => {
            const alarms: string[] = [];
            for (const j of c.cron) if (j.stale) alarms.push(`Zamanlanmış iş koşmuyor: ${j.name}${j.ageH != null ? ` (${Math.round(j.ageH)} sa)` : " (hiç)"}`);
            for (const j of c.cron) if (!j.stale && j.lastAt && !j.lastOk) alarms.push(`Son koşu başarısız: ${j.name}`);
            if (s.ops.backup.ageH == null || s.ops.backup.ageH > 26) alarms.push(`Yedek eski ya da yok${s.ops.backup.ageH != null ? ` (${Math.round(s.ops.backup.ageH)} sa)` : ""}`);
            const api5xx = s.http.errors.filter((e) => e.route.startsWith("/api/")).reduce((a, e) => a + e.count, 0);
            if (api5xx > 0) alarms.push(`Bugün API ${api5xx} kez 5xx döndü (Sunucu & Ops › İstek sağlığı)`);
            if (s.ops.failedUnits.length) alarms.push(`Çökmüş servis: ${s.ops.failedUnits.join(", ")}`);
            if (s.ops.certDaysLeft != null && s.ops.certDaysLeft < 21) alarms.push(`Sertifika ${s.ops.certDaysLeft} gün içinde bitiyor`);
            if (s.app.instances.some((i) => i.name.startsWith(s.app.activeColor) && !i.up)) alarms.push("Aktif renkte duran instance var");
            return alarms.length ? (
              <div className="rounded-card border p-4 text-body" style={{ borderColor: "#dc2626", background: "var(--surface)" }} role="status">
                <div className="text-micro uppercase tracking-eyebrow" style={{ color: "#dc2626" }}>Dikkat</div>
                <ul className="mt-1 list-disc pl-5">{alarms.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            ) : null;
          })()}
          <Section title="Aktivite trendi" hint="Günlük tekrar hacmi — son 30 gün.">
            <TrendChart trend={d.trend} />
          </Section>
          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="Dönüşüm hunisi & retention" hint={`Kohort tabanı: ${d.funnel.retentionBase} kullanıcı.`}>
              <BarList max={d.funnel.totalUsers} items={[
                { label: "Kaydolan", value: d.funnel.totalUsers },
                { label: "Aktive (ilk tur)", value: d.funnel.activated },
                { label: "Paywall gördü", value: d.funnel.paywallView },
                { label: "Satın alma başlattı", value: d.funnel.purchaseStart },
                { label: "Satın aldı", value: d.funnel.purchaseDone },
              ]} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[["D1", d.funnel.d1], ["D7", d.funnel.d7], ["D30", d.funnel.d30]].map(([lbl, v]) => (
                  <div key={String(lbl)} className="rounded-panel border p-2" style={{ borderColor: "var(--border)" }}>
                    <div className="text-h2" style={{ color: "var(--color-brand)" }}>{pct(d.funnel.retentionBase ? (v as number) / d.funnel.retentionBase : 0)}</div>
                    <div className="text-caption" style={{ color: "var(--text-muted)" }}>{lbl} retention</div>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Seviye & dil çifti dağılımı" hint="Çift = anadil → kurs. Sağda: 7 günde aktif · misafir.">
              <BarList max={Math.max(1, ...d.levels.map((l) => l.count))} items={d.levels.map((l) => ({ label: l.level, value: l.count }))} />
              <div className="mt-4">
                <BarList max={Math.max(1, ...c.pairs.map((p) => p.users))} items={c.pairs.map((p) => ({
                  label: pairLabel(p.native, p.course), value: p.users, right: `${fmt(p.users)} · ${fmt(p.active7)} · ${fmt(p.guests)}`,
                }))} />
              </div>
            </Section>
          </div>
        </div>
      )}

      {/* ── SUNUCU & OPS ── */}
      {tab === "Sunucu & Ops" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Kaynak kullanımı" hint={`${s.host.cpuCount} vCPU · yük ${s.host.load1.toFixed(2)} / ${s.host.load5.toFixed(2)} / ${s.host.load15.toFixed(2)} · uptime ${dur(s.host.uptimeSec)}`}>
            <div className="space-y-3">
              <Gauge label="CPU" pctVal={s.host.cpuPct} detail={`${s.host.cpuCount} çekirdek`} />
              <Gauge label="RAM" pctVal={s.mem.usedPct} detail={`${fmt(s.mem.totalMB - s.mem.availMB)} / ${fmt(s.mem.totalMB)} MB kullanımda`} />
              <Gauge label="Disk" pctVal={s.disk.usedPct} detail={`${s.disk.freeGB} / ${s.disk.totalGB} GB boş`} />
            </div>
          </Section>

          <Section title="Uygulama & deploy" hint={`Aktif renk: ${s.app.activeColor} · canlı commit ${s.app.liveCommit || "?"}`}>
            <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {s.app.instances.map((i) => (
                <div key={i.name} className="flex items-center gap-2 rounded-chip border px-2 py-1.5 text-caption" style={{ borderColor: "var(--border)" }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: i.up ? "#16a34a" : "#9ca3af" }} />
                  <span className="font-mono">{i.name}</span>
                </div>
              ))}
            </div>
            <div className="text-caption" style={{ color: "var(--text-muted)" }}>Yeşil nokta = çalışan instance (aktif renk yük dengeleme arkasında).</div>
          </Section>

          <Section title="PostgreSQL" hint={`Bağlantı ${s.pg.total}/${s.pg.maxConn} · veritabanı ${fmt(s.pg.dbSizeMB)} MB · önbellek isabeti %${s.pg.cacheHitPct}`}>
            <div className="mb-3 grid grid-cols-3 gap-2 text-center text-caption">
              <div className="rounded-panel border p-2" style={{ borderColor: "var(--border)" }}><div className="text-h2">{s.pg.active}</div><div style={{ color: "var(--text-muted)" }}>aktif</div></div>
              <div className="rounded-panel border p-2" style={{ borderColor: "var(--border)" }}><div className="text-h2">{s.pg.idle}</div><div style={{ color: "var(--text-muted)" }}>boşta</div></div>
              <div className="rounded-panel border p-2" style={{ borderColor: "var(--border)" }}><div className="text-h2" style={{ color: s.pg.cacheHitPct >= 95 ? "#16a34a" : "#d97706" }}>%{s.pg.cacheHitPct}</div><div style={{ color: "var(--text-muted)" }}>cache hit</div></div>
            </div>
            <BarList max={Math.max(1, ...s.pg.topTables.map((t) => t.mb))} items={s.pg.topTables.map((t) => ({ label: t.name, value: t.mb, right: `${t.mb} MB` }))} />
          </Section>

          <Section title="Yapay zekâ sağlığı (7g)" hint="Sağlayıcı başına çağrı, başarı, gecikme, token — /sohbet ve STT/telaffuz.">
            {d.ai.length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>Son 7 günde AI çağrısı yok.</div> : (
              <div className="space-y-2">
                {d.ai.map((a) => (
                  <div key={a.provider} className="rounded-panel border p-2.5 text-body" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{a.provider}</span>
                      <span className="text-caption" style={{ color: a.okPct >= 95 ? "#16a34a" : a.okPct >= 80 ? "#d97706" : "#dc2626" }}>%{a.okPct} başarı</span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-x-3 text-caption tabular-nums" style={{ color: "var(--text-muted)" }}>
                      <span>{fmt(a.calls)} çağrı</span><span>{fmt(a.avgMs)} ms ort.</span>{a.errors > 0 && <span style={{ color: "#dc2626" }}>{a.errors} hata</span>}{a.tokens > 0 && <span>{fmt(a.tokens)} token</span>}{a.chars > 0 && <span>{fmt(a.chars)} karakter</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ZAMANLANMIŞ İŞLER. Cron'lar bir kez çağıransız kalıp aylarca hiç
              çalışmadı. Liste artık BEKLENEN işlerden kuruluyor: hiç koşmamış
              iş de satır olarak görünüyor ve beklenen aralığı aşan kırmızı. */}
          <Section title="Zamanlanmış işler" hint="Kırmızı = beklenen aralıkta koşmadı ya da son koşu hata · denied = CRON_SECRET uyuşmadı" full>
            <div className="space-y-1">
              {c.cron.map((j) => {
                const bad = j.stale || (j.lastAt != null && !j.lastOk);
                return (
                  <div key={j.name} className="flex flex-wrap items-center gap-x-2 text-caption">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: bad ? "#dc2626" : "#16a34a" }} />
                    <span className="w-32 shrink-0 font-mono">{j.name}</span>
                    <span className="w-56 shrink-0" style={{ color: "var(--text-muted)" }}>{j.label}</span>
                    <span className="w-40 shrink-0 font-mono tabular-nums" style={{ color: j.stale ? "#dc2626" : "var(--text-muted)" }}>
                      {j.lastAt ? `${j.lastAt.slice(0, 16)} (${Math.round(j.ageH ?? 0)} sa)` : "hiç koşmadı"}
                    </span>
                    <span className="shrink-0">7g: {fmt(j.ok7)} tamam{j.fail7 > 0 && <span style={{ color: "#dc2626" }}> · {fmt(j.fail7)} hata</span>}</span>
                    <span className="truncate" style={{ color: "var(--text-muted)" }}>{j.detail}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* GİT DIŞI İŞLETİM. Yedek, systemd, TTS önbelleği, sertifika:
              hepsi sunucuda kurulu, hiçbiri panoda görünmüyordu. */}
          <Section title="Yedek & işletim" hint={`Gecelik pg_dump · ${s.ops.backup.files} günlük kopya · TTS önbelleği ${fmt(s.ops.ttsCacheMB)} MB / 1 GB`} full>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi
                label="Son yedek"
                value={s.ops.backup.ageH != null ? `${Math.round(s.ops.backup.ageH)} sa önce` : "yok"}
                sub={s.ops.backup.lastAt ? `${s.ops.backup.lastAt.slice(0, 16)} · ${s.ops.backup.sizeMB} MB · ${s.ops.backup.result || "?"}` : undefined}
                tone={s.ops.backup.ageH == null || s.ops.backup.ageH > 26 || (s.ops.backup.result && s.ops.backup.result !== "success") ? "bad" : "ok"}
              />
              <Kpi label="Çökmüş servis" value={String(s.ops.failedUnits.length)} sub={s.ops.failedUnits.join(", ") || "systemctl --failed boş"} tone={s.ops.failedUnits.length ? "bad" : "ok"} />
              <Kpi label="TTS önbelleği" value={`${fmt(s.ops.ttsCacheMB)} MB`} sub="nginx, 60 gün" tone={s.ops.ttsCacheMB > 900 ? "warn" : undefined} />
              <Kpi label="HTTPS sertifikası" value={s.ops.certDaysLeft != null ? `${s.ops.certDaysLeft} gün` : "?"} sub="certbot oto-yenileme" tone={s.ops.certDaysLeft == null ? undefined : s.ops.certDaysLeft < 21 ? "bad" : "ok"} />
            </div>
          </Section>

          {/* UÇTAN UCA: uygulamanın kendi kaydı değil, nginx'in gördüğü. */}
          <Section title="İstek sağlığı (bugün, nginx)" hint={`${s.http.since ? `${s.http.since.slice(0, 17)}'den beri` : "log okunamadı"} · ${fmt(s.http.total)} istek · ${fmt(s.http.api)} API · ${fmt(s.http.s4xx)} 4xx · ${fmt(s.http.probes)} tarama`}>
            <div className="mb-3 grid grid-cols-3 gap-2">
              <Kpi label="5xx" value={fmt(s.http.s5xx)} tone={s.http.s5xx ? "bad" : "ok"} />
              <Kpi label="4xx" value={fmt(s.http.s4xx)} />
              <Kpi label="Tarama (404)" value={fmt(s.http.probes)} sub="wp-admin, .env…" />
            </div>
            {s.http.errors.length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>5xx yok.</div> :
              <BarList max={Math.max(1, ...s.http.errors.map((e) => e.count))} items={s.http.errors.map((e) => ({ label: `${e.status} ${e.route}`, value: e.count, tone: "#dc2626" }))} />}
          </Section>

          <Section title="En yoğun API uçları (bugün)" hint="Beklenmedik yoğunluk = istemcide sık yoklama ya da döngü.">
            <BarList max={Math.max(1, ...s.http.topApi.map((a) => a.count))} items={s.http.topApi.map((a) => ({ label: a.route, value: a.count }))} />
          </Section>

          <Section title="Yapay zekâ kullanımı özellik başına (30g)" hint="Sağlık sağlayıcı başına üstte; burada hangi özellik ne kadar harcıyor." full>
            <BarList max={Math.max(1, ...c.engagement.aiByKind.map((a) => a.calls))} items={c.engagement.aiByKind.map((a) => ({
              label: a.kind, value: a.calls,
              right: `${fmt(a.calls)} çağrı${a.errors ? ` · ${fmt(a.errors)} hata` : ""}${a.tokens ? ` · ${fmt(a.tokens)} tok` : ""}${a.audioSec ? ` · ${fmt(a.audioSec / 60)} dk ses` : ""}${a.chars ? ` · ${fmt(a.chars)} kr` : ""}`,
              tone: a.errors ? "#d97706" : undefined,
            }))} />
          </Section>

          <Section title="Deploy geçmişi" hint="GitHub push → webhook → sıfır-kesinti deploy." full>
            {s.deploys.length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>Kayıt yok.</div> : (
              <div className="space-y-1">
                {s.deploys.map((dp, i) => (
                  <div key={i} className="flex items-center gap-2 text-caption">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dp.status === "ok" ? "#16a34a" : dp.status === "fail" ? "#dc2626" : "#6366f1" }} />
                    <span className="w-40 shrink-0 font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>{dp.time}</span>
                    <span className="truncate">{dp.detail}</span>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      )}

      {/* ── KULLANICI DENEYİMİ ── */}
      {tab === "Kullanıcı Deneyimi" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Platform dağılımı (30g)" hint={`${fmt(appOpens)} açılış · ${appOpens ? Math.round((installed / appOpens) * 100) : 0}% uygulama olarak (standalone).`}>
            <BarList max={Math.max(1, ...d.platform.map((p) => p.count))} items={d.platform.map((p) => ({ label: PLATFORM_LABEL[p.key] ?? p.key, value: p.count, right: `${fmt(p.count)} · ${fmt(p.users)} kişi` }))} />
          </Section>

          <Section title="Tur tamamlama akışı (30g)" hint="Tur başladı → tamamlandı.">
            <BarList max={Math.max(sess.started, 1)} items={[
              { label: "Tur başladı", value: sess.started },
              { label: "Tamamlandı", value: sess.done, tone: "#16a34a" },
              { label: `"Şimdilik yeter"`, value: sess.stopped, tone: "#d97706" },
            ]} />
            <div className="mt-3 text-center text-body">Tamamlama oranı: <b style={{ color: sessRate >= 0.6 ? "#16a34a" : "#d97706" }}>{pct(sessRate)}</b></div>
          </Section>

          <Section title="Ekran kullanımı (30g)" hint="Görüntülenme + ortalama görünür süre. Soğuk ekranları (çok bakış, az süre) yakalar." full>
            <BarList max={Math.max(1, ...d.screens.map((sc) => sc.views))} items={d.screens.map((sc) => ({ label: sc.screen, value: sc.views, right: `${fmt(sc.views)} · ${sc.avgSec}sn` }))} />
          </Section>

          <Section title="Onboarding hunisi" hint="Adım başına ulaşan tekil kullanıcı — nerede düşüyorlar.">
            <BarList max={Math.max(1, ...d.onboarding.map((o) => o.users))}
              items={[...d.onboarding].sort((a, b) => ONB_ORDER.indexOf(a.step) - ONB_ORDER.indexOf(b.step)).map((o) => ({ label: ONB_LABEL[o.step] ?? o.step, value: o.users }))} />
          </Section>

          <Section title="Sesli okuma (30g)" hint={`${fmt(c.learning.tts.plays)} çalma. Nöral ses çalınamayınca düşülen basamak — artarsa TTS ucu ya da önbellek sorunlu.`}>
            {c.learning.tts.fallbacks.length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>Düşüş yok.</div> :
              <BarList max={Math.max(1, c.learning.tts.plays)} items={c.learning.tts.fallbacks.map((f) => ({ label: `yedek: ${f.key}`, value: f.count, tone: "#d97706" }))} />}
          </Section>

          <Section title="Yürüyüş dinleme sonuçları (30g)" hint="Her dinlemenin yolu ve sonucu — tanıma kalitesi burada.">
            <BarList max={Math.max(1, ...c.learning.walkListen.map((w) => w.count))} items={c.learning.walkListen.map((w) => ({ label: w.key, value: w.count, tone: /:ok$/.test(w.key) ? "#16a34a" : /network|decode|not-allowed|deadline/.test(w.key) ? "#dc2626" : undefined }))} />
          </Section>

          <Section title="Yürüyüş modu sonuçları" hint="Ekransız tur nasıl bitti (cihaz/mikrofon teşhisi).">
            <BarList max={Math.max(1, ...d.walk.map((w) => w.count))} items={d.walk.map((w) => ({ label: WALK_REASON[w.reason] ?? `sebep ${w.reason}`, value: w.count, tone: w.reason >= 4 ? "#dc2626" : undefined }))} />
          </Section>

          <Section title="Premium hunisi (30g)" hint="Paywall → satın alma. Hangi özellik kilidi besliyor.">
            <BarList max={Math.max(d.premium.views, d.premium.gates, 1)} items={[
              { label: "Premium kilidi (gate)", value: d.premium.gates },
              { label: "Paywall gördü", value: d.premium.views },
              { label: "Satın alma başlattı", value: d.premium.starts },
              { label: "Satın aldı", value: d.premium.done, tone: "#16a34a" },
            ]} />
            {d.premiumGates.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.premiumGates.map((g) => <span key={g.feature} className="rounded-full px-2.5 py-0.5 text-caption" style={{ background: "var(--surface-2)" }}>{g.feature}: {g.count}</span>)}
              </div>
            )}
          </Section>

          <Section title="Web → uygulama satın alma hunisi (30g, kişi)" hint="Web satmıyor; paywall uygulamaya/mağazaya yönlendiriyor. Son basamak: web paywall'ını gördükten sonra uygulamada satın alanlar.">
            <BarList max={Math.max(1, c.premium.webFunnel.webViews)} items={[
              { label: "Web paywall gördü", value: c.premium.webFunnel.webViews },
              { label: "Yönlendirmeye dokundu", value: c.premium.webFunnel.taps },
              { label: "Sunucu mağazaya yolladı", value: c.premium.webFunnel.redirects },
              { label: "Uygulamada paywall (web bağlantısı)", value: c.premium.webFunnel.appViews },
              { label: "Uygulamada satın aldı", value: c.premium.webFunnel.purchases, tone: "#16a34a" },
            ]} />
          </Section>

          {/* HUNİ ÜÇ BASAMAK. "Denendi" ile "ulaştı" arasındaki fark tam
              olarak görmek istediğimiz şey: abonelik ölmüş, jeton geçersiz,
              sağlayıcı reddetmiş. CTR de artık açılan/ULAŞAN. */}
          <Section title="Bildirim hunisi (30g)" full>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <Kpi label="İzin verildi" value={fmt(d.notifications.optinYes)} tone="ok" />
              <Kpi label="İzin reddedildi" value={fmt(d.notifications.optinNo)} tone={d.notifications.optinNo > d.notifications.optinYes ? "warn" : undefined} />
              <Kpi label="Denendi" value={fmt(d.notifications.sent)} />
              <Kpi
                label="Ulaştı"
                value={fmt(d.notifications.delivered)}
                sub={d.notifications.sent ? pct(d.notifications.delivered / d.notifications.sent) + " teslim" : undefined}
                tone={d.notifications.sent > 0 && d.notifications.delivered < d.notifications.sent / 2 ? "warn" : undefined}
              />
              <Kpi label="Bildirimden açıldı" value={fmt(d.notifications.opened)} sub={d.notifications.delivered ? pct(d.notifications.opened / d.notifications.delivered) + " CTR" : undefined} />
            </div>
          </Section>

          {/* Giden e-posta: doğrulama postası ZORUNLU bir kapı, o yüzden
              başarısızlık burada kırmızı. */}
          <Section title="Giden e-posta (30g)" hint="fail = SMTP reddi · cap = alıcı başına saatlik tavan" full>
            {d.mail.length === 0 ? (
              <p className="muted text-caption">Kayıt yok.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {d.mail.map((m) => (
                  <span key={m.kind} className="rounded-full px-2.5 py-0.5 text-caption" style={{ background: "var(--surface-2)" }}>
                    {m.kind}: {fmt(m.ok)} gitti
                    {m.fail > 0 && <span style={{ color: "#dc2626" }}> · {fmt(m.fail)} hata</span>}
                    {m.cap > 0 && <span style={{ color: "#d97706" }}> · {fmt(m.cap)} tavan</span>}
                  </span>
                ))}
              </div>
            )}
          </Section>
        </div>
      )}

      {/* ── ÖĞRENME & İÇERİK ── */}
      {tab === "Öğrenme & İçerik" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Oyun / mekanik performansı" hint="Oyun türüne göre hacim ve doğruluk.">
            <BarList max={Math.max(1, ...d.games.map((g) => g.count))} items={d.games.map((g) => ({ label: g.game, value: g.count, right: `${fmt(g.count)} · ${pct(g.accuracy)}`, tone: g.accuracy < 0.6 ? "#d97706" : undefined }))} />
          </Section>
          <Section title="Üretim görevleri kalitesi (30g)" hint="Çeviri/dönüştürme/serbest/yazma/konuşma — ortalama puan.">
            <BarList max={100} items={d.production.map((p) => ({ label: p.task, value: p.avgScore, right: `${p.avgScore}/100 · ${fmt(p.count)}`, tone: p.avgScore < 60 ? "#d97706" : "#16a34a" }))} />
          </Section>
          <Section title="En zorlanılan kelimeler" hint="En çok unutulan (lapse) / leech — içerik iyileştirme için.">
            <BarList max={Math.max(1, ...d.hardWords.map((w) => w.lapses))} items={d.hardWords.map((w) => ({ label: `${LANG_SHORT[w.course] ?? w.course} · ${w.word} · ${w.gloss}`, value: w.lapses, right: `${w.lapses}${w.leeches ? ` · ${w.leeches} sülük` : ""}` }))} />
          </Section>
          <Section title="Hata tipleri" hint="Yanlış cevapların sınıflandırması.">
            <BarList max={Math.max(1, ...d.errors.map((e) => e.count))} items={d.errors.map((e) => ({ label: e.type, value: e.count }))} />
          </Section>
          {/* ── 31 Ağustos sonrası gelen öğrenme yüzeyleri ── */}
          <Section title="Dersler (Patika)" hint={`30g: ${fmt(c.learning.lessons.started)} başladı · ${fmt(c.learning.lessons.finished)} bitti · ${fmt(c.learning.lessons.users)} kişi. Kural tekrarı: ${fmt(c.learning.lessons.rulesTracked)} izleniyor, ${fmt(c.learning.lessons.rulesDue)} vadesi geldi · ${fmt(c.learning.lessons.roleplayDone)} konuşma fazı bitti.`}>
            <BarList max={100} items={c.learning.topLessons.map((l) => ({ label: l.lesson, value: l.avgPct, right: `%${l.avgPct} · ${fmt(l.users)} kişi`, tone: l.avgPct < 60 ? "#d97706" : "#16a34a" }))} />
          </Section>
          <Section title="Patika adımları" hint={`${fmt(c.learning.path.items)} öğe · ${fmt(c.learning.path.users)} kişi · ${fmt(c.learning.path.attempts)} deneme · ${fmt(c.learning.path.passed)} geçildi · ort. en iyi %${c.learning.path.avgBest}. Aşağıda: en az 2 kişinin denediği en zayıf öğeler.`}>
            <BarList max={100} items={c.learning.pathWeakest.map((i) => ({ label: i.item, value: i.avgBest, right: `%${i.avgBest} · geçen %${i.passRate}`, tone: i.avgBest < 60 ? "#d97706" : undefined }))} />
          </Section>
          <Section title="Beceri egzersizleri (30g)" hint="beceri:seviye — ortalama puan, deneme ve kişi.">
            <BarList max={100} items={c.learning.skills.map((k) => ({ label: k.key, value: k.avg, right: `%${k.avg} · ${fmt(k.count)} · ${fmt(k.users)} kişi`, tone: k.avg < 60 ? "#d97706" : "#16a34a" }))} />
          </Section>
          <Section title="Sınavlar (30g)" hint="Seviye/modül/haftalık sınavlar — tür başına ortalama puan.">
            <BarList max={100} items={c.learning.exams.map((k) => ({ label: k.key, value: k.avg, right: `%${k.avg} · ${fmt(k.count)} · ${fmt(k.users)} kişi`, tone: k.avg < 60 ? "#d97706" : "#16a34a" }))} />
          </Section>
          <Section title="Deneme sınavları" hint="Seviye · bölüm: başlayan → biten → geçen, bitenlerin ortalaması.">
            {c.learning.mock.length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>Henüz deneme yok.</div> : (
              <div className="space-y-1 text-caption">
                {c.learning.mock.map((m) => (
                  <div key={`${m.level}:${m.skill}`} className="flex items-center gap-2 tabular-nums">
                    <span className="w-32 shrink-0 font-mono">{m.level} · {m.skill}</span>
                    <span className="flex-1">{fmt(m.started)} → {fmt(m.finished)} → <b style={{ color: "#16a34a" }}>{fmt(m.passed)}</b></span>
                    <span className="w-16 shrink-0 text-right">{m.finished ? `%${m.avgScore}` : "—"}</span>
                  </div>
                ))}
              </div>
            )}
          </Section>
          <Section title="Yerleştirme testi" hint="Önerilen seviye — kaçı öneriyi kabul etti.">
            <BarList max={Math.max(1, ...c.learning.placements.map((p) => p.count))} items={c.learning.placements.map((p) => ({ label: p.level, value: p.count, right: `${fmt(p.count)} · ${fmt(p.accepted)} kabul` }))} />
          </Section>
          <Section title="Konuşma & değerlendirme (30g)" hint={`Rol yapma: ${fmt(c.learning.roleplay.turns30)} tur · ${fmt(c.learning.roleplay.users30)} kişi · telaffuz ${fmt(c.learning.pronounce.count)} ölçüm, ort. %${c.learning.pronounce.avg}`}>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {c.learning.roleplay.byMode.map((m) => <span key={m.key} className="rounded-full px-2.5 py-0.5 text-caption" style={{ background: "var(--surface-2)" }}>{m.key}: {fmt(m.count)}</span>)}
            </div>
            <BarList max={Math.max(1, ...c.learning.assessments.map((a) => a.count))} items={c.learning.assessments.map((a) => ({ label: `${a.kind} · ${a.provider}`, value: a.count }))} />
          </Section>
          <Section title="Beceri ilerlemesi (tablo)" hint="user_skills'ten — çevrimdışı gönderilenler dahil. Beceri · seviye: kişi, egzersiz, ort. son puan.">
            <BarList max={100} items={c.engagement.skillProgress.map((k) => ({ label: `${k.skill} · ${k.level}`, value: k.avgScore, right: `%${k.avgScore} · ${fmt(k.exercises)} · ${fmt(k.users)} kişi`, tone: k.avgScore < 60 ? "#d97706" : "#16a34a" }))} />
          </Section>
          <Section title="Modül sınavı (boss)" hint={`30g: ${fmt(c.engagement.bossEvents.plays)} giriş · ${fmt(c.engagement.bossEvents.clears)} geçiş. Seviye başına: kişi, geçilen modül, ort. deneme.`}>
            <BarList max={Math.max(1, ...c.engagement.boss.map((b) => b.users))} items={c.engagement.boss.map((b) => ({ label: b.level, value: b.users, right: `${fmt(b.users)} kişi · ${fmt(b.cleared)} geçildi · ${b.avgAttempts} deneme` }))} />
          </Section>
          <Section title="Rozetler" hint="Kaç kişide var · son 30 günde açılan.">
            <BarList max={Math.max(1, ...c.engagement.achievements.map((a) => a.users))} items={c.engagement.achievements.map((a) => ({ label: a.id, value: a.users, right: `${fmt(a.users)} · +${fmt(a.last30)}` }))} />
          </Section>
          <Section title="Günlük görevler & hayatta kalma (30g)" hint={`Hayatta kalma: ${fmt(c.engagement.challenge.plays30)} oyun · ${fmt(c.engagement.challenge.users30)} kişi · rekoru olan ${fmt(c.engagement.challenge.withBest)} · ort. ${c.engagement.challenge.avgBest} · en iyi ${c.engagement.challenge.maxBest}`}>
            <BarList max={Math.max(1, ...c.engagement.quests.map((q) => q.claims))} items={c.engagement.quests.map((q) => ({ label: q.id, value: q.claims, right: `${fmt(q.claims)} · ${fmt(q.users)} kişi` }))} />
          </Section>
          <Section title="Telemetri — olaylar (30g)" hint="Ada göre olay sayısı ve tekil kullanıcı." full>
            <BarList max={Math.max(1, ...d.events30.map((e) => e.count))} items={d.events30.map((e) => ({ label: e.name, value: e.count, right: `${fmt(e.count)} · ${fmt(e.users)} kişi` }))} />
          </Section>
        </div>
      )}

      {/* ── BÜYÜME & SOSYAL ── */}
      {tab === "Büyüme & Sosyal" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Misafir modu" hint="Hesapsız kullanım. 30 gün kullanılmayan misafir silinir; 20+ gün sessiz olanlar silinmeye yakın.">
            <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Kpi label="Toplam" value={fmt(c.growth.guests.total)} />
              <Kpi label="Aktif 7g" value={fmt(c.growth.guests.active7)} />
              <Kpi label="Silinmeye yakın" value={fmt(c.growth.guests.stale20)} tone={c.growth.guests.stale20 ? "warn" : undefined} />
              <Kpi label="Başlayan 30g" value={fmt(c.growth.guests.starts30)} />
            </div>
            <div className="text-micro uppercase tracking-eyebrow" style={{ color: "var(--text-muted)" }}>Hesaba geçiş (30g)</div>
            <div className="mt-1">
              <BarList max={Math.max(1, c.growth.guests.starts30, ...c.growth.guests.upgrades.map((u) => u.count))} items={c.growth.guests.upgrades.map((u) => ({ label: GUEST_UPGRADE_LABEL[u.key] ?? u.key, value: u.count, tone: "#16a34a" }))} />
            </div>
            <div className="mt-3 text-micro uppercase tracking-eyebrow" style={{ color: "var(--text-muted)" }}>Hesap çağrısı gösterildi (kilometre taşı)</div>
            <div className="mt-1">
              <BarList max={Math.max(1, ...c.growth.guests.nudges.map((n) => n.count))} items={c.growth.guests.nudges.map((n) => ({ label: n.key, value: n.count, right: `${fmt(n.count)} · ${fmt(n.users)} kişi` }))} />
            </div>
          </Section>

          <Section title="Giriş öncesi (30g)" hint="Hesap açmadan önceki ısınma ve kurulum istemi.">
            <BarList max={Math.max(1, c.growth.warmup.seen)} items={[
              { label: "Isınmayı gördü (kişi)", value: c.growth.warmup.seen },
              { label: "Isınmayı bitirdi", value: c.growth.warmup.done, tone: "#16a34a" },
              { label: `"Zaten hesabım var"`, value: c.growth.warmup.existingAccount },
            ]} />
            <div className="mt-4 text-micro uppercase tracking-eyebrow" style={{ color: "var(--text-muted)" }}>Ana ekrana ekleme</div>
            <div className="mt-1">
              <BarList max={Math.max(1, ...c.growth.installPrompt.map((i) => i.count))} items={c.growth.installPrompt.map((i) => ({ label: INSTALL_LABEL[i.key] ?? i.key, value: i.count }))} />
            </div>
          </Section>

          <Section title="Sosyal" hint="Arkadaşlık, lig, dürtme, tepki. Şikâyetler Moderasyon sayfasında.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Kpi label="Kullanıcı adı" value={fmt(c.growth.social.usernames)} sub={`${fmt(c.growth.social.publicProfiles)} herkese açık`} />
              <Kpi label="Arkadaşlık" value={fmt(c.growth.social.friendsAccepted)} sub={`${fmt(c.growth.social.friendsPending)} bekleyen istek`} />
              <Kpi label="Bu hafta ligde" value={fmt(c.growth.social.leagueThisWeek)} sub={`${fmt(c.growth.social.leagueUps30)} yükselme 30g`} />
              <Kpi label="Dürtme 30g" value={fmt(c.growth.social.nudges30)} />
              <Kpi label="Tepki 30g" value={fmt(c.growth.social.reactions30)} sub={`${fmt(c.growth.social.feedViews30)} akış açılışı`} />
              <Kpi label="Engelleme" value={fmt(c.growth.social.blocks)} sub={`${fmt(c.growth.social.questsActive)} aktif ortak görev`} tone={c.growth.social.blocks ? "warn" : undefined} />
            </div>
          </Section>

          <Section title="Premium & davet" hint="Ayrıntı ve yazma işleri Premium sayfasında.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Kpi label="Premium şu an" value={fmt(c.premium.active)} sub={`${fmt(c.premium.store)} mağaza · ${fmt(c.premium.bonus)} hediye`} />
              <Kpi label="Davet" value={fmt(c.growth.referrals.total)} sub={`${fmt(c.growth.referrals.last30)} son 30g`} />
              <Kpi label="Promo kullanımı 30g" value={fmt(c.engagement.promoRedemptions30)} />
              <Kpi label="Mağaza platformu" value={c.premium.byPlatform.map((p) => `${p.key} ${p.count}`).join(" · ") || "—"} />
            </div>
          </Section>

          <Section title="Bildirim erişimi" hint="Bugün bildirim alabilecek cihaz (3+ başarısız teslimli jetonlar hariç) ve açık anahtarlar.">
            <BarList max={Math.max(1, ...c.growth.pushReach.map((p) => p.count))} items={c.growth.pushReach.map((p) => ({ label: p.key, value: p.count }))} />
            <div className="mt-3 flex flex-wrap gap-1.5 text-caption">
              <span className="rounded-full px-2.5 py-0.5" style={{ background: "var(--surface-2)" }}>Hatırlatma açık: {fmt(c.growth.remindersOn.reminders)}</span>
              <span className="rounded-full px-2.5 py-0.5" style={{ background: "var(--surface-2)" }}>Seri koruma: {fmt(c.growth.remindersOn.streakAlert)}</span>
              <span className="rounded-full px-2.5 py-0.5" style={{ background: "var(--surface-2)" }}>Haftalık sınav: {fmt(c.growth.remindersOn.weeklyReminder)}</span>
            </div>
          </Section>

          <Section title="Gelen kutusu & akış" hint="Okunmamış sosyal bildirim birikimi (tür başına) ve son 30 günde akışa düşen olaylar.">
            <BarList max={Math.max(1, ...c.engagement.inbox.map((i) => i.total))} items={c.engagement.inbox.map((i) => ({ label: i.type, value: i.unread, right: `${fmt(i.unread)} okunmamış / ${fmt(i.total)}`, tone: i.total && i.unread / i.total > 0.8 ? "#d97706" : undefined }))} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.engagement.feed.map((f) => <span key={f.type} className="rounded-full px-2.5 py-0.5 text-caption" style={{ background: "var(--surface-2)" }}>{f.type}: {fmt(f.count)}</span>)}
            </div>
          </Section>

          <Section title="Giriş & güvenlik" hint="Hesap (misafir hariç), giriş yolları, iki adımlı doğrulama, açık oturum.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Kpi label="Hesap" value={fmt(c.auth.accounts)} />
              <Kpi label="Doğrulanmamış" value={fmt(c.auth.unverified)} tone={c.auth.unverified ? "warn" : undefined} />
              <Kpi label="2FA açık" value={fmt(c.auth.twoFactor)} />
              <Kpi label="Açık oturum" value={fmt(c.auth.activeSessions)} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.auth.providers.map((p) => <span key={p.key} className="rounded-full px-2.5 py-0.5 text-caption" style={{ background: "var(--surface-2)" }}>{p.key}: {fmt(p.count)}</span>)}
            </div>
          </Section>

          <Section title="Rıza & kota" hint="Yapay zekâ rızası (kişi başına son karar) ve 30 günlük ücretsiz kota tüketimi.">
            <BarList max={Math.max(1, ...c.growth.consents.map((x) => x.granted + x.denied))} items={c.growth.consents.map((x) => ({
              label: CONSENT_LABEL[x.purpose] ?? x.purpose, value: x.granted, right: `${fmt(x.granted)} evet · ${fmt(x.denied)} hayır`, tone: "#16a34a",
            }))} />
            <div className="mt-4">
              <BarList max={Math.max(1, ...c.growth.quota.map((q) => q.total))} items={c.growth.quota.map((q) => ({ label: q.key, value: q.total, right: `${fmt(q.total)} · ${fmt(q.users)} kişi` }))} />
            </div>
          </Section>
        </div>
      )}

      {/* ── KULLANICILAR ── */}
      {tab === "Kullanıcılar" && (
        <Section title={`Kullanıcılar (${d.users.length})`} hint="Ara (e-posta dahil), sütuna tıklayıp sırala, ada tıklayıp hesabın tüm izini aç. Son aktif olana göre; en fazla 500.">
          <UsersTable users={d.users} />
        </Section>
      )}

      {/* ── LOGLAR ── */}
      {tab === "Loglar" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="İstemci hataları (30g)" hint="Yakalanmamış hata — ekrana göre. Mobil + web.">
              {d.clientErrors.length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>Hata kaydı yok.</div> :
                <BarList max={Math.max(1, ...d.clientErrors.map((e) => e.count))} items={d.clientErrors.map((e) => ({ label: e.screen, value: e.count, tone: "#dc2626" }))} />}
            </Section>
            <Section title="AI hataları (7g)" hint="Başarısız sağlayıcı çağrıları.">
              {d.ai.filter((a) => a.errors > 0).length === 0 ? <div className="text-body" style={{ color: "var(--text-muted)" }}>Hata yok.</div> :
                <BarList max={Math.max(1, ...d.ai.map((a) => a.errors))} items={d.ai.filter((a) => a.errors > 0).map((a) => ({ label: a.provider, value: a.errors, right: `${a.errors} / ${fmt(a.calls)}`, tone: "#dc2626" }))} />}
            </Section>
          </div>
          {/* Şikâyetler kendi sayfasına taşındı: orada kullanıcı şikâyetleri de
              görünüyor ve ikisi de kapatılabiliyor. */}
          <Section title="Şikâyetler" hint="Kullanıcı şikâyetleri ve yapay zekâ içerik bildirimleri.">
            <a href="/admin/moderation" className="chip h-8 px-3 text-caption" style={openReports ? { color: "#dc2626" } : undefined}>
              Moderasyon sayfası · {openReports} açık
            </a>
          </Section>
          <Section title="Son olaylar" hint="En yeni 40 telemetri olayı (ham).">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-caption">
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
      )}
    </div>
  );
}
