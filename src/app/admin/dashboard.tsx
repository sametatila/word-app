"use client";

import { useState } from "react";
import type { AdminData } from "@/lib/admin";
import type { ServerMetrics } from "@/lib/server-metrics";
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
    <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="mt-1 text-2xl font-extrabold" style={{ color }}>{value}</div>
      {sub && <div className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</div>}
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
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-44 shrink-0 truncate" style={{ color: "var(--text)" }} title={it.label}>{it.label}</span>
          <Bar frac={it.value / top} tone={it.tone} />
          <span className="w-20 shrink-0 text-right text-xs font-bold tabular-nums">{it.right ?? fmt(it.value) + (unit ?? "")}</span>
        </div>
      ))}
      {items.length === 0 && <div className="text-sm" style={{ color: "var(--text-muted)" }}>Henüz veri yok.</div>}
    </div>
  );
}

function Section({ title, hint, children, full }: { title: string; hint?: string; children: React.ReactNode; full?: boolean }) {
  return (
    <section className={`rounded-2xl border p-5 ${full ? "lg:col-span-2" : ""}`} style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h2 className="text-sm font-extrabold uppercase tracking-wide">{title}</h2>
      {hint && <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>{hint}</p>}
      <div className={hint ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

function Gauge({ label, pctVal, detail }: { label: string; pctVal: number; detail: string }) {
  const tone = pctVal >= 90 ? "#dc2626" : pctVal >= 75 ? "#d97706" : "#16a34a";
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color: tone }}>{pctVal}%</span>
      </div>
      <div className="mt-1"><Bar frac={pctVal / 100} tone={tone} /></div>
      <div className="mt-0.5 text-[11px]" style={{ color: "var(--text-muted)" }}>{detail}</div>
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
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
        <span>{trend[0]?.day ?? ""}</span><span>günlük tekrar · son 30 gün</span><span>{trend[trend.length - 1]?.day ?? ""}</span>
      </div>
    </div>
  );
}

const PLATFORM_LABEL: Record<string, string> = {
  "desktop:browser": "Masaüstü · web", "desktop:standalone": "Masaüstü · uygulama",
  "android:browser": "Android · web", "android:standalone": "Android · uygulama",
  "ios:browser": "iOS · web", "ios:standalone": "iOS · uygulama",
};
const WALK_REASON: Record<number, string> = {
  1: "Kullanıcı bitirdi", 2: "Tur kalmadı", 3: "Duyulmama sınırı", 4: "Mikrofon yok", 5: "Ekran kapandı", 6: "Elle duraklatıldı / çıkıldı",
};
const ONB_ORDER = ["welcome", "goal", "level", "ready"];
const ONB_LABEL: Record<string, string> = { welcome: "Karşılama", goal: "Hedef", level: "Seviye", ready: "Hazır" };

const TABS = ["Genel Bakış", "Sunucu & Ops", "Kullanıcı Deneyimi", "Öğrenme & İçerik", "Kullanıcılar", "Loglar"] as const;

export function AdminDashboard({ data: d, server: s }: { data: AdminData; server: ServerMetrics }) {
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
          <h1 className="text-3xl font-extrabold tracking-tight">Yönetim panosu</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Canlı veriler — web + mobil · sunucu · telemetri</p>
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{new Date(d.generatedAt).toLocaleString("tr-TR")}</span>
      </header>

      {/* Sekmeler */}
      <div className="flex flex-wrap gap-1.5 border-b pb-2" style={{ borderColor: "var(--border)" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="rounded-full px-3.5 py-1.5 text-sm font-bold transition"
            style={tab === t ? { background: "var(--color-brand)", color: "#fff" } : { background: "var(--surface-2)", color: "var(--text-muted)" }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── GENEL BAKIŞ ── */}
      {tab === "Genel Bakış" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Kpi label="Toplam kullanıcı" value={fmt(k.totalUsers)} sub={`+${k.new1d} bugün · +${k.new7d} 7g · +${k.new30d} 30g`} />
            <Kpi label="Aktif DAU/WAU/MAU" value={`${fmt(k.dau)}/${fmt(k.wau)}/${fmt(k.mau)}`} sub="günlük / haftalık / aylık" />
            <Kpi label="Seri tutan" value={fmt(k.streakUsers)} sub={`ort. ${Math.round(k.avgStreak)} gün`} />
            <Kpi label="Toplam XP" value={fmt(k.totalXp)} />
            <Kpi label="Toplam tekrar" value={fmt(k.totalReviews)} sub={`${fmt(k.reviews1d)} bugün`} />
            <Kpi label="Doğruluk" value={pct(k.accuracy)} sub="tüm günlük istatistik" tone={k.accuracy >= 0.7 ? "ok" : "warn"} />
            <Kpi label="Çalışma (30g)" value={`${fmt(k.seconds30d / 3600)} sa`} />
            <Kpi label="Tur tamamlama" value={pct(sessRate)} sub={`${fmt(sess.done)}/${fmt(sess.started)} tur`} tone={sessRate >= 0.6 ? "ok" : "warn"} />
          </div>
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
                  <div key={String(lbl)} className="rounded-xl border p-2" style={{ borderColor: "var(--border)" }}>
                    <div className="text-lg font-extrabold" style={{ color: "var(--color-brand)" }}>{pct(d.funnel.retentionBase ? (v as number) / d.funnel.retentionBase : 0)}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{lbl} retention</div>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Seviye & kurs dağılımı">
              <BarList max={Math.max(1, ...d.levels.map((l) => l.count))} items={d.levels.map((l) => ({ label: l.level, value: l.count }))} />
              <div className="mt-3 flex flex-wrap gap-2">
                {d.courses.map((c) => (
                  <span key={c.course} className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "var(--surface-2)" }}>
                    {c.course === "gsw-zh" ? "Zürih Almancası" : "Almanca"}: {fmt(c.count)}
                  </span>
                ))}
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
                <div key={i.name} className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-xs" style={{ borderColor: "var(--border)" }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: i.up ? "#16a34a" : "#9ca3af" }} />
                  <span className="font-mono">{i.name}</span>
                </div>
              ))}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Yeşil nokta = çalışan instance (aktif renk yük dengeleme arkasında).</div>
          </Section>

          <Section title="PostgreSQL" hint={`Bağlantı ${s.pg.total}/${s.pg.maxConn} · veritabanı ${fmt(s.pg.dbSizeMB)} MB · önbellek isabeti %${s.pg.cacheHitPct}`}>
            <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border p-2" style={{ borderColor: "var(--border)" }}><div className="text-lg font-extrabold">{s.pg.active}</div><div style={{ color: "var(--text-muted)" }}>aktif</div></div>
              <div className="rounded-xl border p-2" style={{ borderColor: "var(--border)" }}><div className="text-lg font-extrabold">{s.pg.idle}</div><div style={{ color: "var(--text-muted)" }}>boşta</div></div>
              <div className="rounded-xl border p-2" style={{ borderColor: "var(--border)" }}><div className="text-lg font-extrabold" style={{ color: s.pg.cacheHitPct >= 95 ? "#16a34a" : "#d97706" }}>%{s.pg.cacheHitPct}</div><div style={{ color: "var(--text-muted)" }}>cache hit</div></div>
            </div>
            <BarList max={Math.max(1, ...s.pg.topTables.map((t) => t.mb))} items={s.pg.topTables.map((t) => ({ label: t.name, value: t.mb, right: `${t.mb} MB` }))} />
          </Section>

          <Section title="Yapay zekâ sağlığı (7g)" hint="Sağlayıcı başına çağrı, başarı, gecikme, token — /sohbet ve STT/telaffuz.">
            {d.ai.length === 0 ? <div className="text-sm" style={{ color: "var(--text-muted)" }}>Son 7 günde AI çağrısı yok.</div> : (
              <div className="space-y-2">
                {d.ai.map((a) => (
                  <div key={a.provider} className="rounded-lg border p-2.5 text-sm" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{a.provider}</span>
                      <span className="text-xs font-bold" style={{ color: a.okPct >= 95 ? "#16a34a" : a.okPct >= 80 ? "#d97706" : "#dc2626" }}>%{a.okPct} başarı</span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
                      <span>{fmt(a.calls)} çağrı</span><span>{fmt(a.avgMs)} ms ort.</span>{a.errors > 0 && <span style={{ color: "#dc2626" }}>{a.errors} hata</span>}<span>{fmt(a.tokens)} token</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Deploy geçmişi" hint="GitHub push → webhook → sıfır-kesinti deploy." full>
            {s.deploys.length === 0 ? <div className="text-sm" style={{ color: "var(--text-muted)" }}>Kayıt yok.</div> : (
              <div className="space-y-1">
                {s.deploys.map((dp, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
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
            <BarList max={Math.max(1, ...d.platform.map((p) => p.count))} items={d.platform.map((p) => ({ label: PLATFORM_LABEL[p.key] ?? p.key, value: p.count, right: `${fmt(p.count)} · ${fmt(p.users)}👤` }))} />
          </Section>

          <Section title="Tur tamamlama akışı (30g)" hint="Başlangıç kartı → tur başladı → tamamlandı.">
            <BarList max={Math.max(sess.startCard, sess.started, 1)} items={[
              { label: "Başlangıç kartı", value: sess.startCard },
              { label: "Tur başladı", value: sess.started },
              { label: "Tamamlandı", value: sess.done, tone: "#16a34a" },
              { label: `"Şimdilik yeter"`, value: sess.stopped, tone: "#d97706" },
            ]} />
            <div className="mt-3 text-center text-sm">Tamamlama oranı: <b style={{ color: sessRate >= 0.6 ? "#16a34a" : "#d97706" }}>{pct(sessRate)}</b></div>
          </Section>

          <Section title="Ekran kullanımı (30g)" hint="Görüntülenme + ortalama görünür süre. Soğuk ekranları (çok bakış, az süre) yakalar." full>
            <BarList max={Math.max(1, ...d.screens.map((sc) => sc.views))} items={d.screens.map((sc) => ({ label: sc.screen, value: sc.views, right: `${fmt(sc.views)} · ${sc.avgSec}sn` }))} />
          </Section>

          <Section title="Onboarding hunisi" hint="Adım başına ulaşan tekil kullanıcı — nerede düşüyorlar.">
            <BarList max={Math.max(1, ...d.onboarding.map((o) => o.users))}
              items={[...d.onboarding].sort((a, b) => ONB_ORDER.indexOf(a.step) - ONB_ORDER.indexOf(b.step)).map((o) => ({ label: ONB_LABEL[o.step] ?? o.step, value: o.users }))} />
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
                {d.premiumGates.map((g) => <span key={g.feature} className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: "var(--surface-2)" }}>{g.feature}: {g.count}</span>)}
              </div>
            )}
          </Section>

          <Section title="Bildirim hunisi (30g)" full>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi label="İzin verildi" value={fmt(d.notifications.optinYes)} tone="ok" />
              <Kpi label="İzin reddedildi" value={fmt(d.notifications.optinNo)} tone={d.notifications.optinNo > d.notifications.optinYes ? "warn" : undefined} />
              <Kpi label="Bildirim gönderildi" value={fmt(d.notifications.sent)} />
              <Kpi label="Bildirimden açıldı" value={fmt(d.notifications.opened)} sub={d.notifications.sent ? pct(d.notifications.opened / d.notifications.sent) + " CTR" : undefined} />
            </div>
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
            <BarList max={Math.max(1, ...d.hardWords.map((w) => w.lapses))} items={d.hardWords.map((w) => ({ label: `${w.de} · ${w.tr}`, value: w.lapses, right: `${w.lapses}${w.leeches ? ` · ${w.leeches}🩸` : ""}` }))} />
          </Section>
          <Section title="Hata tipleri" hint="Yanlış cevapların sınıflandırması.">
            <BarList max={Math.max(1, ...d.errors.map((e) => e.count))} items={d.errors.map((e) => ({ label: e.type, value: e.count }))} />
          </Section>
          <Section title="Telemetri — olaylar (30g)" hint="Ada göre olay sayısı ve tekil kullanıcı." full>
            <BarList max={Math.max(1, ...d.events30.map((e) => e.count))} items={d.events30.map((e) => ({ label: e.name, value: e.count, right: `${fmt(e.count)} · ${fmt(e.users)}👤` }))} />
          </Section>
        </div>
      )}

      {/* ── KULLANICILAR ── */}
      {tab === "Kullanıcılar" && (
        <Section title={`Kullanıcılar (${d.users.length})`} hint="Ara, sütuna tıklayıp sırala. Son aktif olana göre; en fazla 500.">
          <UsersTable users={d.users} />
        </Section>
      )}

      {/* ── LOGLAR ── */}
      {tab === "Loglar" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="İstemci hataları (30g)" hint="Yakalanmamış hata — ekrana göre. Mobil + web.">
              {d.clientErrors.length === 0 ? <div className="text-sm" style={{ color: "var(--text-muted)" }}>Hata kaydı yok. 🎉</div> :
                <BarList max={Math.max(1, ...d.clientErrors.map((e) => e.count))} items={d.clientErrors.map((e) => ({ label: e.screen, value: e.count, tone: "#dc2626" }))} />}
            </Section>
            <Section title="AI hataları (7g)" hint="Başarısız sağlayıcı çağrıları.">
              {d.ai.filter((a) => a.errors > 0).length === 0 ? <div className="text-sm" style={{ color: "var(--text-muted)" }}>Hata yok. 🎉</div> :
                <BarList max={Math.max(1, ...d.ai.map((a) => a.errors))} items={d.ai.filter((a) => a.errors > 0).map((a) => ({ label: a.provider, value: a.errors, right: `${a.errors} / ${fmt(a.calls)}`, tone: "#dc2626" }))} />}
            </Section>
          </div>
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
      )}
    </div>
  );
}
