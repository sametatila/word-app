"use client";

import type { AdminData } from "@/lib/admin";
import type { ServerMetrics } from "@/lib/server-metrics";
import type { Coverage } from "@/lib/admin-coverage";
import type { Revenue } from "@/lib/premium/revenue";
import { trendDelta, type TrendMetric } from "@/lib/admin-trends-shared";
import { alertLinks } from "@/lib/admin-links";
import { BarList, Funnel, SeriesChart, Sparkline, BTN, DataTable, Dot, fmt, Notice, Panel, PanelGrid, Stat, Stats, TONE, type Tone } from "./_ui/ui";

/**
 * Yönetim panelinin VERİ BÖLÜMLERİ — Durum, Gelir, Büyüme, Deneyim, Öğrenme ve
 * Sunucu sayfaları buradan çiziliyor.
 *
 * Bunlar eskiden tek panonun altı sekmesiydi. Sekmeler konuya göre değil
 * tarihsel olarak birikmişti: gelir Genel bakışta, satın alma hunileri
 * Deneyim'de, premium sayıları Büyüme'de duruyordu; sağlık dört ayrı yere
 * dağılmıştı. Bölümler artık menünün gruplarıyla birebir (bkz. `_ui/nav`).
 * Veri sunucuda tek seferde ve önbellekli çekiliyor (`_data` `loadPanel`).
 */
const pct = (v: number) => Math.round(v * 100) + "%";
function dur(sec: number): string {
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60);
  return d ? `${d}g ${h}s` : h ? `${h}s ${m}dk` : `${m}dk`;
}

function Gauge({ label, pctVal, detail }: { label: string; pctVal: number; detail: string }) {
  const tone: Tone = pctVal >= 90 ? "bad" : pctVal >= 75 ? "warn" : "ok";
  return (
    <div>
      <div className="flex items-baseline justify-between text-body">
        <span className="text-strong">{label}</span>
        <span className="text-caption tabular-nums" style={{ color: TONE[tone] }}>{pctVal}%</span>
      </div>
      <div className="mt-1 h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <div className="h-full rounded-full" style={{ width: `${Math.max(2, pctVal)}%`, background: TONE[tone] }} />
      </div>
      <div className="muted mt-0.5 text-caption">{detail}</div>
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
const DELETE_SOURCE: Record<string, string> = { self: "Kullanıcı kendisi", admin: "Panelden", guest: "Misafir (atma/süre)" };
const CONSENT_LABEL: Record<string, string> = { ai_text: "Yapay zekâ · metin", ai_voice: "Yapay zekâ · ses" };

/** Sayıların yanındaki küçük etiket listesi (sağlayıcı, tür). */
function Pills({ items }: { items: { key: string; text: React.ReactNode }[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => <span key={i.key} className="rounded-chip px-2 py-0.5 text-caption" style={{ background: "var(--surface-2)" }}>{i.text}</span>)}
    </div>
  );
}

/** Panel içi alt başlık. */
function Sub({ children }: { children: React.ReactNode }) {
  return <div className="muted mb-1.5 mt-4 text-micro uppercase tracking-eyebrow">{children}</div>;
}

/**
 * GELİR — kompakt: tek KPI satırı + tek kırılım satırı + kaynak notu.
 * Ayrıntılı tablo yerine sayılar yan yana: "bu ay ne kazandık, kaçı kalıyor,
 * denemeler dönüşüyor mu, iade/ödeme sorunu var mı" tek bakışta. Kaynaklar
 * `lib/premium/revenue` başında; tutarlar brüt USD (mağaza payı düşülmemiş).
 */
const usd = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`);
function RevenueCard({ r, days }: { r: Revenue; days: number }) {
  const w = r.window;
  const conv = w.trialsStarted ? Math.round((w.trialConversions / w.trialsStarted) * 100) : null;
  const rc = r.revenuecat && !("error" in r.revenuecat) ? r.revenuecat : null;
  const rcError = r.revenuecat && "error" in r.revenuecat ? r.revenuecat.error : null;
  return (
    <Panel title={`Gelir · son ${days} gün`} hint="Brüt USD, mağaza payı düşülmemiş." actions={<a href="/admin/premium" className={BTN.small}>Premium ayarları</a>}>
      {!r.webhookConfigured ? (
        <div className="mb-3"><Notice tone="bad">{"Mağaza webhook'u kapalı: satın almalar hiçbir hesaba yazılmıyor. Sunucu /opt/lernomi/.env içinde REVENUECAT_WEBHOOK_AUTH boş; değeri RevenueCat › Integrations › Webhooks'taki Authorization ile aynı olmalı: https://app.revenuecat.com/"}</Notice></div>
      ) : null}
      <Stats cols={7}>
        <Stat label="MRR" value={usd(rc?.mrrUsd ?? r.now.mrrUsd)} sub={rc?.mrrUsd != null ? "RevenueCat" : "defterden tahmin"} />
        <Stat label="Net gelir" value={usd(w.netUsd)} sub={`brüt ${usd(w.grossUsd)}${w.refundsUsd ? ` · iade ${usd(w.refundsUsd)}` : ""}`} spark={<Sparkline tone="ok" label="Günlük brüt gelir" values={r.daily.map((x) => x.grossUsd)} />} />
        <Stat label="Aktif abone" value={String(r.now.activePaid)} sub={`${r.now.willNotRenew} yenilemeyecek${r.now.inGrace ? ` · ${r.now.inGrace} ödeme bekliyor` : ""}`} tone={r.now.willNotRenew > r.now.activePaid / 3 ? "warn" : undefined} />
        <Stat label="Deneme" value={String(r.now.activeTrials)} sub={`${w.trialsStarted} başladı · ${w.trialConversions} dönüştü${conv != null ? ` (%${conv})` : ""}`} />
        <Stat label="Yeni ücretli" value={String(w.newPaid)} sub={`${w.renewals} yenileme`} />
        <Stat label="Kayıp" value={String(w.cancellations)} sub={`iptal · ${w.expirations} sona erdi`} tone={w.cancellations ? "warn" : undefined} />
        <Stat label="Sorun" value={String(w.refunds + w.billingIssues)} sub={`${w.refunds} iade · ${w.billingIssues} ödeme sorunu`} tone={w.refunds + w.billingIssues ? "bad" : undefined} />
      </Stats>
      {/* GÜN GÜN: toplamlar "ne oldu"yu, bu grafik "ne zaman oldu"yu söylüyor —
          bir fiyat, paywall ya da sürüm değişikliğinin etkisi burada okunur. */}
      <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--hairline)" }}>
        <SeriesChart
          height={112}
          empty="Bu aralıkta mağaza olayı yok."
          days={r.daily.map((x) => x.day)}
          series={[
            { key: "gross", label: "Brüt gelir", values: r.daily.map((x) => x.grossUsd), format: (v) => usd(v) },
            { key: "newPaid", label: "Yeni ücretli", values: r.daily.map((x) => x.newPaid) },
            { key: "trials", label: "Deneme", values: r.daily.map((x) => x.trials) },
            { key: "cancellations", label: "İptal", values: r.daily.map((x) => x.cancellations) },
          ]}
        />
      </div>
      <p className="muted mt-4 border-t pt-3 text-caption" style={{ borderColor: "var(--hairline)" }}>
        {r.byPlatform.length ? r.byPlatform.map((p) => `${p.platform}: ${usd(p.grossUsd)} · ${p.payments} ödeme · ${p.active} aktif`).join("  |  ") : "Henüz mağaza olayı yok."}
        {r.byProduct.length ? `  ·  ${r.byProduct.map((p) => `${p.product} ${usd(p.grossUsd)}`).join(", ")}` : ""}
        {rc ? `  ·  RevenueCat 28g gelir ${rc.revenue28dUsd != null ? usd(rc.revenue28dUsd) : "?"}, yeni müşteri ${rc.newCustomers28d ?? "?"}` : ""}
        {rcError ? <span style={{ color: TONE.warn }}>  ·  {rcError}</span> : null}
        {!r.revenuecat && !rcError ? "  ·  RevenueCat API anahtarı yok (resmi MRR kapalı)" : ""}
      </p>
    </Panel>
  );
}

/**
 * HAFTALIK KARŞILAŞTIRMA — son 7 tam gün / önceki 7 gün, tek satır.
 * Renk yöne göre: kullanıcı artışı yeşil, hata artışı kırmızı (lib/admin-trends).
 */
function TrendRow({ trends }: { trends: TrendMetric[] }) {
  const tone = { good: "ok", bad: "bad", flat: undefined } as const;
  return (
    <Panel title="Son 7 gün" hint="Önceki 7 güne göre değişim.">
      <Stats cols={8}>
        {trends.map((m) => {
          const d = trendDelta(m);
          const fmtV = (v: number) => (m.unit === "pct" ? `%${v}` : m.unit === "min" ? `${fmt(v / 60)} sa` : fmt(v));
          return (
            <Stat
              key={m.key}
              label={m.label}
              value={fmtV(m.current)}
              sub={<><span style={tone[d.tone] ? { color: TONE[tone[d.tone]!] } : undefined}>{d.text}</span> · önce {fmtV(m.previous)}</>}
            />
          );
        })}
      </Stats>
    </Panel>
  );
}

/** `days`: seçili aralık (7 / 30 / 90) — başlıklar ve pencereli metrikler ona göre. */
type Base = { data: AdminData; coverage: Coverage; days: number };


export type StatusAlert = { key: string; level: "kritik" | "uyari"; text: string };

/* ── DURUM ── */
export function StatusSection({ days, data: d, coverage: c, openReports, trends, alerts }: Base & { openReports: number; trends: TrendMetric[]; alerts: StatusAlert[] }) {
  const k = d.kpi;
  const sess = d.sessionFunnel;
  const sessRate = sess.started ? sess.done / sess.started : 0;
  const critical = alerts.filter((a) => a.level === "kritik");
  const warning = alerts.filter((a) => a.level === "uyari");
  /* Her uyarı NEREYE bakılacağını söylüyor: panel bölümünün adı ve adresi,
     varsa cevabın verildiği dış konsol (`lib/admin-links`, Telegram'la aynı). */
  const list = (items: StatusAlert[]) => (
    <ul className="space-y-2.5">
      {items.map((a) => {
        const l = alertLinks(a.key);
        return (
          <li key={a.key}>
            <div>{a.text}</div>
            <div className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5 text-caption">
              <a href={l.panel.path} className="underline underline-offset-2">→ {l.panel.label}</a>
              {l.external ? <a href={l.external.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">↗ {l.external.label}</a> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="space-y-5">
      {/* UYARILAR — Telegram'a giden motorla AYNI liste (`_data` `loadAlerts`).
          Pano eskiden kendi kurallarıyla ayrı bir liste kuruyordu ve yeni hata
          grubu, çökme eşiği, düşük puanlı yorum, bekleyen şikâyet orada yoktu. */}
      {critical.length ? <Notice tone="bad" title={`${critical.length} kritik sorun`}>{list(critical)}</Notice> : null}
      {warning.length ? <Notice tone="warn" title={`${warning.length} uyarı`}>{list(warning)}</Notice> : null}
      {!alerts.length ? <Notice tone="ok">Sorun yok: uyarı motorunun bütün kontrolleri temiz (sunucu, yedek, zamanlanmış işler, hatalar, mağaza, yapay zekâ, şikâyetler).</Notice> : null}
      <TrendRow trends={trends} />
          <Panel title="Kullanıcı ve kullanım" hint={`Tüm zamanlar; aksi yazılıysa son ${days} gün.`}>
            <Stats cols={6}>
              <Stat label="Toplam kullanıcı" value={fmt(k.totalUsers)} sub={`+${k.new1d} bugün · +${k.new7d} 7g · +${k.new30d} 30g`} />
              <Stat label="DAU / WAU / MAU" value={`${fmt(k.dau)}/${fmt(k.wau)}/${fmt(k.mau)}`} sub="günlük / haftalık / aylık" spark={<Sparkline label="Günlük aktif kişi" values={d.trend.map((t) => t.active)} />} />
              <Stat label="Seri tutan" value={fmt(k.streakUsers)} sub={`ort. ${Math.round(k.avgStreak)} gün`} />
              <Stat label="Toplam tekrar" value={fmt(k.totalReviews)} sub={`${fmt(k.reviews1d)} bugün · ${fmt(k.totalXp)} XP`} spark={<Sparkline label="Günlük tekrar" values={d.trend.map((t) => t.reviews)} />} />
              <Stat label="Doğruluk" value={pct(k.accuracy)} sub="tüm günlük istatistik" tone={k.accuracy >= 0.7 ? "ok" : "warn"} />
              <Stat label={`Çalışma (${days}g)`} value={`${fmt(k.seconds30d / 3600)} sa`} />
              <Stat label="Tur tamamlama" value={pct(sessRate)} sub={`${fmt(sess.done)}/${fmt(sess.started)} tur`} tone={sessRate >= 0.6 ? "ok" : "warn"} />
              <Stat label={`Konuşma (${days}g)`} value={`${fmt(c.learning.conversations.finished)}/${fmt(c.learning.conversations.started)}`} sub={`bitti/başladı · ${fmt(c.learning.conversations.users)} kişi`} />
              <Stat label="Premium" value={fmt(c.premium.active)} sub={`${fmt(c.premium.store)} mağaza · ${fmt(c.premium.bonus)} hediye`} />
              <Stat label="Misafir" value={fmt(c.growth.guests.total)} sub={`${fmt(c.growth.guests.active7)} aktif 7g · ${fmt(c.growth.guests.stale20)} silinmeye yakın`} tone={c.growth.guests.stale20 > 0 ? "warn" : undefined} />
              <Stat label="Açık şikâyet" value={fmt(openReports)} sub={<a href="/admin/moderation" className="underline-offset-2 hover:underline">Moderasyon →</a>} tone={openReports > 0 ? "bad" : "ok"} />
              <Stat label="Hesap" value={fmt(c.auth.accounts)} sub={`${fmt(c.auth.twoFactor)} 2FA · ${fmt(c.auth.unverified)} doğrulanmamış`} />
            </Stats>
          </Panel>
          {/* Aktivite: dört günlük dizi tek grafikte, seçilebilir; seçili günün
              değeri metin olarak yazıyor (fare, dokunma, ← → ile gün gün). */}
          <Panel title="Aktivite" hint={`Son ${days} gün, günlük. Kesik çizgi ortalama.`}>
            <SeriesChart
              days={d.trend.map((t) => t.day)}
              series={[
                { key: "reviews", label: "Tekrar", values: d.trend.map((t) => t.reviews) },
                { key: "active", label: "Aktif kişi", values: d.trend.map((t) => t.active) },
                { key: "xp", label: "XP", values: d.trend.map((t) => t.xp) },
                { key: "newWords", label: "Yeni kelime", values: d.trend.map((t) => t.newWords) },
              ]}
            />
          </Panel>
    </div>
  );
}

/* ── GELİR ── */
export function RevenueSection({ days, data: d, coverage: c, revenue: r }: Base & { revenue: Revenue }) {
  return (
    <div className="space-y-5">
      <RevenueCard r={r} days={days} />
      <PanelGrid>
          {/* Tutma oranları `lib/funnel`de ZATEN yüzde (0-100); eskiden
              bir kez daha tabana bölünüp 100'le çarpılıyordu ve D1 %104
              gibi imkânsız değerler çıkıyordu. */}
          <Panel title="Dönüşüm hunisi ve tutma" hint={`Tutma kohort tabanı: ${d.funnel.retentionBase} kullanıcı.`}>
            <Funnel steps={[
              { label: "Kaydolan", value: d.funnel.totalUsers },
              { label: "Aktive (ilk tur)", value: d.funnel.activated },
              { label: "Paywall gördü", value: d.funnel.paywallView },
              { label: "Satın alma başlattı", value: d.funnel.purchaseStart },
              { label: "Satın aldı", value: d.funnel.purchaseDone },
            ]} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {([["D1", d.funnel.d1], ["D7", d.funnel.d7], ["D30", d.funnel.d30]] as const).map(([lbl, v]) => (
                <div key={lbl} className="rounded-tile px-3 py-2" style={{ background: "var(--surface-2)" }}>
                  <Stat label={`${lbl} tutma`} value={`%${v}`} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={`Premium hunisi (${days}g)`} hint="Paywall → satın alma. Hangi özellik kilidi besliyor.">
            <Funnel unit="olay" steps={[
              { label: "Paywall gördü", value: d.premium.views },
              { label: "Satın alma başlattı", value: d.premium.starts },
              { label: "Satın aldı", value: d.premium.done },
            ]} />
            <Sub>Kilide çarpma (premium gate): {fmt(d.premium.gates)}</Sub>
            {d.premiumGates.length > 0 && (
              <div className="mt-3"><Pills items={d.premiumGates.map((g) => ({ key: g.feature, text: `${g.feature}: ${g.count}` }))} /></div>
            )}
          </Panel>

          <Panel title={`Web → uygulama satın alma (${days}g, kişi)`} hint="Web satmıyor; paywall uygulamaya/mağazaya yönlendiriyor. Son basamak: web paywall'ını gördükten sonra uygulamada satın alanlar.">
            <Funnel steps={[
              { label: "Web paywall gördü", value: c.premium.webFunnel.webViews },
              { label: "Yönlendirmeye dokundu", value: c.premium.webFunnel.taps },
              { label: "Sunucu mağazaya yolladı", value: c.premium.webFunnel.redirects },
              { label: "Uygulamada paywall (web bağlantısı)", value: c.premium.webFunnel.appViews },
              { label: "Uygulamada satın aldı", value: c.premium.webFunnel.purchases },
            ]} />
          </Panel>

          <Panel title="Premium ve davet" actions={<a href="/admin/premium" className={BTN.small}>Premium</a>}>
            <Stats cols={3}>
              <Stat label="Premium şu an" value={fmt(c.premium.active)} sub={`${fmt(c.premium.store)} mağaza · ${fmt(c.premium.bonus)} hediye`} />
              <Stat label="Davet" value={fmt(c.growth.referrals.total)} sub={`${fmt(c.growth.referrals.last30)} son ${days}g`} />
              <Stat label={`Promo kullanımı ${days}g`} value={fmt(c.engagement.promoRedemptions30)} />
            </Stats>
            <Sub>Mağaza platformu</Sub>
            <Pills items={c.premium.byPlatform.map((p) => ({ key: p.key, text: `${p.key}: ${p.count}` }))} />
          </Panel>
      </PanelGrid>
    </div>
  );
}

/* ── BÜYÜME ── */
export function GrowthSection({ days, data: d, coverage: c, deletions }: Base & { deletions: { source: string; count30: number; total: number; avgAgeDays: number; reasons: string }[] }) {
  return (
    <PanelGrid>
        <Panel title="Seviye ve dil çifti" hint="Çift = anadil → kurs. Sağda: kişi · 7 günde aktif · misafir.">
          <BarList share max={Math.max(1, ...d.levels.map((l) => l.count))} items={d.levels.map((l) => ({ label: l.level, value: l.count }))} />
          <Sub>Dil çifti</Sub>
          <BarList share max={Math.max(1, ...c.pairs.map((p) => p.users))} items={c.pairs.map((p) => ({
            label: pairLabel(p.native, p.course), value: p.users, right: `${fmt(p.users)} · ${fmt(p.active7)} · ${fmt(p.guests)}`,
          }))} />
        </Panel>

        <Panel title="Misafir modu" hint="Hesapsız kullanım (yalnız mobil). 30 gün kullanılmayan misafir silinir; 20+ gün sessiz olanlar silinmeye yakın.">
          <Stats cols={4}>
            <Stat label="Toplam" value={fmt(c.growth.guests.total)} />
            <Stat label="Aktif 7g" value={fmt(c.growth.guests.active7)} />
            <Stat label="Silinmeye yakın" value={fmt(c.growth.guests.stale20)} tone={c.growth.guests.stale20 ? "warn" : undefined} />
            <Stat label={`Başlayan ${days}g`} value={fmt(c.growth.guests.starts30)} />
          </Stats>
          <Sub>{`Hesaba geçiş (${days}g)`}</Sub>
          <BarList max={Math.max(1, c.growth.guests.starts30, ...c.growth.guests.upgrades.map((u) => u.count))} items={c.growth.guests.upgrades.map((u) => ({ label: GUEST_UPGRADE_LABEL[u.key] ?? u.key, value: u.count, tone: "ok" }))} />
          <Sub>Hesap çağrısı gösterildi (kilometre taşı)</Sub>
          <BarList max={Math.max(1, ...c.growth.guests.nudges.map((n) => n.count))} items={c.growth.guests.nudges.map((n) => ({ label: n.key, value: n.count, right: `${fmt(n.count)} · ${fmt(n.users)} kişi` }))} />
        </Panel>

        <Panel title={`Giriş öncesi (${days}g)`} hint="Hesap açmadan önceki ısınma ve kurulum istemi.">
          <BarList max={Math.max(1, c.growth.warmup.seen)} items={[
            { label: "Isınmayı gördü (kişi)", value: c.growth.warmup.seen },
            { label: "Isınmayı bitirdi", value: c.growth.warmup.done, tone: "ok" },
            { label: `"Zaten hesabım var"`, value: c.growth.warmup.existingAccount },
          ]} />
          <Sub>Ana ekrana ekleme</Sub>
          <BarList max={Math.max(1, ...c.growth.installPrompt.map((i) => i.count))} items={c.growth.installPrompt.map((i) => ({ label: INSTALL_LABEL[i.key] ?? i.key, value: i.count }))} />
        </Panel>

        <Panel title="Sosyal" hint="Arkadaşlık, lig, dürtme, tepki." actions={<a href="/admin/moderation" className={BTN.small}>Moderasyon</a>}>
          <Stats cols={3}>
            <Stat label="Kullanıcı adı" value={fmt(c.growth.social.usernames)} sub={`${fmt(c.growth.social.publicProfiles)} herkese açık`} />
            <Stat label="Arkadaşlık" value={fmt(c.growth.social.friendsAccepted)} sub={`${fmt(c.growth.social.friendsPending)} bekleyen istek`} />
            <Stat label="Bu hafta ligde" value={fmt(c.growth.social.leagueThisWeek)} sub={`${fmt(c.growth.social.leagueUps30)} yükselme ${days}g`} />
            <Stat label={`Dürtme ${days}g`} value={fmt(c.growth.social.nudges30)} />
            <Stat label={`Tepki ${days}g`} value={fmt(c.growth.social.reactions30)} sub={`${fmt(c.growth.social.feedViews30)} akış açılışı`} />
            <Stat label="Engelleme" value={fmt(c.growth.social.blocks)} sub={`${fmt(c.growth.social.questsActive)} aktif ortak görev`} tone={c.growth.social.blocks ? "warn" : undefined} />
          </Stats>
        </Panel>

        <Panel title="Bildirim erişimi" hint="Bugün bildirim alabilecek cihaz (3+ başarısız teslimli jetonlar hariç) ve açık anahtarlar.">
          <BarList share max={Math.max(1, ...c.growth.pushReach.map((p) => p.count))} items={c.growth.pushReach.map((p) => ({ label: p.key, value: p.count }))} />
          <div className="mt-3">
            <Pills items={[
              { key: "r", text: `Hatırlatma açık: ${fmt(c.growth.remindersOn.reminders)}` },
              { key: "s", text: `Seri koruma: ${fmt(c.growth.remindersOn.streakAlert)}` },
              { key: "w", text: `Haftalık sınav: ${fmt(c.growth.remindersOn.weeklyReminder)}` },
            ]} />
          </div>
        </Panel>

        <Panel title="Gelen kutusu ve akış" hint={`Okunmamış sosyal bildirim birikimi (tür başına) ve son ${days} günde akışa düşen olaylar.`}>
          <BarList max={Math.max(1, ...c.engagement.inbox.map((i) => i.total))} items={c.engagement.inbox.map((i) => ({ label: i.type, value: i.unread, right: `${fmt(i.unread)} okunmamış / ${fmt(i.total)}`, tone: i.total && i.unread / i.total > 0.8 ? "warn" : undefined }))} />
          <div className="mt-3"><Pills items={c.engagement.feed.map((f) => ({ key: f.type, text: `${f.type}: ${fmt(f.count)}` }))} /></div>
        </Panel>

        <Panel title="Giriş ve güvenlik" hint="Hesap (misafir hariç), giriş yolları, iki adımlı doğrulama, açık oturum.">
          <Stats cols={4}>
            <Stat label="Hesap" value={fmt(c.auth.accounts)} />
            <Stat label="Doğrulanmamış" value={fmt(c.auth.unverified)} tone={c.auth.unverified ? "warn" : undefined} />
            <Stat label="2FA açık" value={fmt(c.auth.twoFactor)} />
            <Stat label="Açık oturum" value={fmt(c.auth.activeSessions)} />
          </Stats>
          <div className="mt-3"><Pills items={c.auth.providers.map((p) => ({ key: p.key, text: `${p.key}: ${fmt(p.count)}` }))} /></div>
        </Panel>

        <Panel title="Rıza ve kota" hint={`Yapay zekâ rızası (kişi başına son karar) ve ${days} günlük ücretsiz kota tüketimi.`}>
          <BarList max={Math.max(1, ...c.growth.consents.map((x) => x.granted + x.denied))} items={c.growth.consents.map((x) => ({
            label: CONSENT_LABEL[x.purpose] ?? x.purpose, value: x.granted, right: `${fmt(x.granted)} evet · ${fmt(x.denied)} hayır`, tone: "ok",
          }))} />
          <Sub>Kota</Sub>
          <BarList max={Math.max(1, ...c.growth.quota.map((q) => q.total))} items={c.growth.quota.map((q) => ({ label: q.key, value: q.total, right: `${fmt(q.total)} · ${fmt(q.users)} kişi` }))} />
        </Panel>

      {/* Hesap silmeleri Uygulama sayfasındaydı: kaybın ölçüsü büyümenin
          yanında okunur, sürüm ve bakım ayarının yanında değil. */}
      <Panel title="Hesap silmeleri" hint="Kimlik tutulmaz; yalnız yol, hesabın yaşı ve panel silmelerinde gerekçe." span flush>
        <DataTable
          head={["Yol", { label: "30 gün", align: "right" }, { label: "Toplam", align: "right" }, { label: "Ort. yaş (gün)", align: "right" }, "Gerekçeler"]}
          rows={deletions.map((x) => [DELETE_SOURCE[x.source] ?? x.source, x.count30, x.total, x.avgAgeDays, x.reasons || "—"])}
        />
      </Panel>
    </PanelGrid>
  );
}

/* ── DENEYİM ── */
export function ExperienceSection({ days, data: d, coverage: c }: Base) {
  const appOpens = d.platform.reduce((a, p) => a + p.count, 0);
  const installed = d.platform.filter((p) => p.key.includes("standalone")).reduce((a, p) => a + p.count, 0);
  const sess = d.sessionFunnel;
  const sessRate = sess.started ? sess.done / sess.started : 0;
  return (
    <PanelGrid>
        <Panel title={`Platform dağılımı (${days}g)`} hint={`${fmt(appOpens)} açılış · %${appOpens ? Math.round((installed / appOpens) * 100) : 0} uygulama olarak (standalone).`}>
          <BarList share max={Math.max(1, ...d.platform.map((p) => p.count))} items={d.platform.map((p) => ({ label: PLATFORM_LABEL[p.key] ?? p.key, value: p.count, right: `${fmt(p.count)} · ${fmt(p.users)} kişi` }))} />
        </Panel>

        <Panel title={`Tur tamamlama (${days}g)`} hint={`Tamamlama oranı %${Math.round(sessRate * 100)}.`}>
          <Funnel unit="tur" steps={[
            { label: "Tur başladı", value: sess.started },
            { label: "Tamamlandı", value: sess.done },
          ]} />
          <Sub>{`"Şimdilik yeter" ile bırakılan: ${fmt(sess.stopped)} tur (%${sess.started ? Math.round((sess.stopped / sess.started) * 100) : 0})`}</Sub>
        </Panel>

        <Panel title={`Ekran kullanımı (${days}g)`} hint="Görüntülenme + ortalama görünür süre. Soğuk ekranları (çok bakış, az süre) yakalar." span>
          <BarList share max={Math.max(1, ...d.screens.map((sc) => sc.views))} items={d.screens.map((sc) => ({ label: sc.screen, value: sc.views, right: `${fmt(sc.views)} · ${sc.avgSec}sn` }))} />
        </Panel>

        <Panel title="Onboarding hunisi" hint="Adım başına ulaşan tekil kullanıcı — nerede düşüyorlar.">
          <Funnel steps={[...d.onboarding].sort((a, b) => ONB_ORDER.indexOf(a.step) - ONB_ORDER.indexOf(b.step)).map((o) => ({ label: ONB_LABEL[o.step] ?? o.step, value: o.users }))} />
        </Panel>

        <Panel title={`Sesli okuma (${days}g)`} hint={`${fmt(c.learning.tts.plays)} çalma. Nöral ses çalınamayınca düşülen basamak — artarsa TTS ucu ya da önbellek sorunlu.`}>
          <BarList empty="Düşüş yok." max={Math.max(1, c.learning.tts.plays)} items={c.learning.tts.fallbacks.map((f) => ({ label: `yedek: ${f.key}`, value: f.count, tone: "warn" }))} />
        </Panel>

        <Panel title={`Yürüyüş dinleme sonuçları (${days}g)`} hint="Her dinlemenin yolu ve sonucu — tanıma kalitesi burada.">
          <BarList share max={Math.max(1, ...c.learning.walkListen.map((w) => w.count))} items={c.learning.walkListen.map((w) => ({ label: w.key, value: w.count, tone: /:ok$/.test(w.key) ? "ok" : /network|decode|not-allowed|deadline/.test(w.key) ? "bad" : undefined }))} />
        </Panel>

        <Panel title="Yürüyüş modu sonuçları" hint="Ekransız tur nasıl bitti (cihaz/mikrofon teşhisi).">
          <BarList share max={Math.max(1, ...d.walk.map((w) => w.count))} items={d.walk.map((w) => ({ label: WALK_REASON[w.reason] ?? `sebep ${w.reason}`, value: w.count, tone: w.reason >= 4 ? "bad" : undefined }))} />
        </Panel>

        {/* HUNİ ÜÇ BASAMAK. "Denendi" ile "ulaştı" arasındaki fark tam
            olarak görmek istediğimiz şey: abonelik ölmüş, jeton geçersiz,
            sağlayıcı reddetmiş. CTR de artık açılan/ULAŞAN. */}
        <Panel title={`Bildirim hunisi (${days}g)`} span>
          <Stats cols={5}>
            <Stat label="İzin verildi" value={fmt(d.notifications.optinYes)} tone="ok" />
            <Stat label="İzin reddedildi" value={fmt(d.notifications.optinNo)} tone={d.notifications.optinNo > d.notifications.optinYes ? "warn" : undefined} />
            <Stat label="Denendi" value={fmt(d.notifications.sent)} />
            <Stat
              label="Ulaştı"
              value={fmt(d.notifications.delivered)}
              sub={d.notifications.sent ? pct(d.notifications.delivered / d.notifications.sent) + " teslim" : undefined}
              tone={d.notifications.sent > 0 && d.notifications.delivered < d.notifications.sent / 2 ? "warn" : undefined}
            />
            <Stat label="Bildirimden açıldı" value={fmt(d.notifications.opened)} sub={d.notifications.delivered ? pct(d.notifications.opened / d.notifications.delivered) + " CTR" : undefined} />
          </Stats>
          <div className="mt-4">
            <Funnel unit="bildirim" steps={[
              { label: "Gönderim denendi", value: d.notifications.sent },
              { label: "Cihaza ulaştı", value: d.notifications.delivered },
              { label: "Bildirimden açıldı", value: d.notifications.opened },
            ]} />
          </div>
        </Panel>

        {/* Giden e-posta: doğrulama postası ZORUNLU bir kapı, o yüzden
            başarısızlık burada kırmızı. */}
        <Panel id="e-posta" title={`Giden e-posta (${days}g)`} hint="fail = SMTP reddi · cap = alıcı başına saatlik tavan" span>
          {d.mail.length === 0 ? <p className="muted text-caption">Kayıt yok.</p> : (
            <Pills items={d.mail.map((m) => ({
              key: m.kind,
              text: <>{m.kind}: {fmt(m.ok)} gitti{m.fail > 0 && <span style={{ color: TONE.bad }}> · {fmt(m.fail)} hata</span>}{m.cap > 0 && <span style={{ color: TONE.warn }}> · {fmt(m.cap)} tavan</span>}</>,
            }))} />
          )}
        </Panel>

        <Panel title={`Telemetri olayları (${days}g)`} hint="Ada göre olay sayısı ve tekil kullanıcı." span>
          <BarList share max={Math.max(1, ...d.events30.map((e) => e.count))} items={d.events30.map((e) => ({ label: e.name, value: e.count, right: `${fmt(e.count)} · ${fmt(e.users)} kişi` }))} />
        </Panel>

        <Panel title="Son olaylar" hint="En yeni 40 telemetri olayı (ham)." span flush>
          <DataTable
            head={["Gün", "Olay", "Etiket", { label: "Değer", align: "right" }, "Kullanıcı"]}
            rows={d.recentEvents.map((e) => [
              e.day, <b key="n">{e.name}</b>, <span key="k" className="muted">{e.kind || "—"}</span>, e.value,
              <a key="u" href={`/admin/users/${encodeURIComponent(e.userId)}`} className="muted font-mono underline-offset-2 hover:underline">{e.userId.slice(0, 10)}…</a>,
            ])}
          />
        </Panel>
    </PanelGrid>
  );
}

/* ── ÖĞRENME (metrikler; madde analizi `learning/learning-analysis`) ── */
export function LearningSection({ days, data: d, coverage: c }: Base) {
  return (
    <PanelGrid>
        {/* ── 31 Ağustos sonrası gelen öğrenme yüzeyleri ── */}
        <Panel title="Konuşmalar (Patika)" hint={`${days}g: ${fmt(c.learning.conversations.started)} başladı · ${fmt(c.learning.conversations.finished)} bitti · ${fmt(c.learning.conversations.users)} kişi. Kural tekrarı: ${fmt(c.learning.conversations.rulesTracked)} izleniyor, ${fmt(c.learning.conversations.rulesDue)} vadesi geldi · ${fmt(c.learning.conversations.chatDone)} konuşma fazı bitti.`}>
          <BarList max={100} items={c.learning.topConversations.map((l) => ({ label: l.conversation, value: l.avgPct, right: `%${l.avgPct} · ${fmt(l.users)} kişi`, tone: l.avgPct < 60 ? "warn" : "ok" }))} />
        </Panel>

        <Panel title={`Beceri egzersizleri (${days}g)`} hint="beceri:seviye — ortalama puan, deneme ve kişi.">
          <BarList max={100} items={c.learning.skills.map((x) => ({ label: x.key, value: x.avg, right: `%${x.avg} · ${fmt(x.count)} · ${fmt(x.users)} kişi`, tone: x.avg < 60 ? "warn" : "ok" }))} />
        </Panel>

        <Panel title={`Sınavlar (${days}g)`} hint="Seviye/modül/haftalık sınavlar — tür başına ortalama puan.">
          <BarList max={100} items={c.learning.exams.map((x) => ({ label: x.key, value: x.avg, right: `%${x.avg} · ${fmt(x.count)} · ${fmt(x.users)} kişi`, tone: x.avg < 60 ? "warn" : "ok" }))} />
        </Panel>

        <Panel title="Deneme sınavları" hint="Seviye · bölüm: başlayan → biten → geçen, bitenlerin ortalaması." flush>
          <DataTable
            empty="Henüz deneme yok."
            head={["Seviye · bölüm", { label: "Başlayan", align: "right" }, { label: "Biten", align: "right" }, { label: "Geçen", align: "right" }, { label: "Ortalama", align: "right" }]}
            rows={c.learning.mock.map((m) => [
              <span key="l" className="font-mono">{m.level} · {m.skill}</span>, fmt(m.started), fmt(m.finished),
              <span key="p" style={{ color: TONE.ok }}>{fmt(m.passed)}</span>, m.finished ? `%${m.avgScore}` : "—",
            ])}
          />
        </Panel>

        <Panel title="Patika adımları" hint={`${fmt(c.learning.path.items)} öğe · ${fmt(c.learning.path.users)} kişi · ${fmt(c.learning.path.attempts)} deneme · ${fmt(c.learning.path.passed)} geçildi · ort. en iyi %${c.learning.path.avgBest}. Aşağıda: en az 2 kişinin denediği en zayıf öğeler.`}>
          <BarList max={100} items={c.learning.pathWeakest.map((i) => ({ label: i.item, value: i.avgBest, right: `%${i.avgBest} · geçen %${i.passRate}`, tone: i.avgBest < 60 ? "warn" : undefined }))} />
        </Panel>

        <Panel title="Beceri ilerlemesi" hint="user_skills'ten — çevrimdışı gönderilenler dahil. Beceri · seviye: kişi, egzersiz, ort. son puan.">
          <BarList max={100} items={c.engagement.skillProgress.map((x) => ({ label: `${x.skill} · ${x.level}`, value: x.avgScore, right: `%${x.avgScore} · ${fmt(x.exercises)} · ${fmt(x.users)} kişi`, tone: x.avgScore < 60 ? "warn" : "ok" }))} />
        </Panel>

        <Panel title="Modül sınavı (boss)" hint={`${days}g: ${fmt(c.engagement.bossEvents.plays)} giriş · ${fmt(c.engagement.bossEvents.clears)} geçiş. Seviye başına: kişi, geçilen modül, ort. deneme.`}>
          <BarList max={Math.max(1, ...c.engagement.boss.map((b) => b.users))} items={c.engagement.boss.map((b) => ({ label: b.level, value: b.users, right: `${fmt(b.users)} kişi · ${fmt(b.cleared)} geçildi · ${b.avgAttempts} deneme` }))} />
        </Panel>

        <Panel title="Yerleştirme testi" hint="Önerilen seviye — kaçı öneriyi kabul etti.">
          <BarList share max={Math.max(1, ...c.learning.placements.map((p) => p.count))} items={c.learning.placements.map((p) => ({ label: p.level, value: p.count, right: `${fmt(p.count)} · ${fmt(p.accepted)} kabul` }))} />
        </Panel>

        <Panel title={`Konuşma ve değerlendirme (${days}g)`} hint={`Sohbet: ${fmt(c.learning.chat.turns30)} tur · ${fmt(c.learning.chat.users30)} kişi · telaffuz ${fmt(c.learning.pronounce.count)} ölçüm, ort. %${c.learning.pronounce.avg}`}>
          <Pills items={c.learning.chat.byMode.map((m) => ({ key: m.key, text: `${m.key}: ${fmt(m.count)}` }))} />
          <div className="mt-3">
            <BarList share max={Math.max(1, ...c.learning.assessments.map((a) => a.count))} items={c.learning.assessments.map((a) => ({ label: `${a.kind} · ${a.provider}`, value: a.count }))} />
          </div>
        </Panel>

        <Panel title="Oyun / mekanik performansı" hint="Oyun türüne göre hacim ve doğruluk.">
          <BarList share max={Math.max(1, ...d.games.map((g) => g.count))} items={d.games.map((g) => ({ label: g.game, value: g.count, right: `${fmt(g.count)} · ${pct(g.accuracy)}`, tone: g.accuracy < 0.6 ? "warn" : undefined }))} />
        </Panel>

        <Panel title={`Üretim görevleri kalitesi (${days}g)`} hint="Çeviri/dönüştürme/serbest/yazma/konuşma — ortalama puan.">
          <BarList max={100} items={d.production.map((p) => ({ label: p.task, value: p.avgScore, right: `${p.avgScore}/100 · ${fmt(p.count)}`, tone: p.avgScore < 60 ? "warn" : "ok" }))} />
        </Panel>

        <Panel title="En zorlanılan kelimeler" hint="En çok unutulan (lapse) / sülük — içerik iyileştirme için.">
          <BarList max={Math.max(1, ...d.hardWords.map((w) => w.lapses))} items={d.hardWords.map((w) => ({ label: `${LANG_SHORT[w.course] ?? w.course} · ${w.word} · ${w.gloss}`, value: w.lapses, right: `${w.lapses}${w.leeches ? ` · ${w.leeches} sülük` : ""}` }))} />
        </Panel>

        <Panel title="Hata tipleri" hint="Yanlış cevapların sınıflandırması.">
          <BarList share max={Math.max(1, ...d.errors.map((e) => e.count))} items={d.errors.map((e) => ({ label: e.type, value: e.count }))} />
        </Panel>

        <Panel title="Rozetler" hint={`Kaç kişide var · son ${days} günde açılan.`}>
          <BarList max={Math.max(1, ...c.engagement.achievements.map((a) => a.users))} items={c.engagement.achievements.map((a) => ({ label: a.id, value: a.users, right: `${fmt(a.users)} · +${fmt(a.last30)}` }))} />
        </Panel>

        <Panel title={`Günlük görevler ve hayatta kalma (${days}g)`} hint={`Hayatta kalma: ${fmt(c.engagement.challenge.plays30)} oyun · ${fmt(c.engagement.challenge.users30)} kişi · rekoru olan ${fmt(c.engagement.challenge.withBest)} · ort. ${c.engagement.challenge.avgBest} · en iyi ${c.engagement.challenge.maxBest}`}>
          <BarList max={Math.max(1, ...c.engagement.quests.map((q) => q.claims))} items={c.engagement.quests.map((q) => ({ label: q.id, value: q.claims, right: `${fmt(q.claims)} · ${fmt(q.users)} kişi` }))} />
        </Panel>
    </PanelGrid>
  );
}

/* ── SUNUCU ── */
export function OpsSection({ days, data: d, coverage: c, server: s }: Base & { server: ServerMetrics }) {
  return (
    <PanelGrid>
        <Panel id="yedek" title="Yedek ve işletim" hint={`Gecelik pg_dump · ${s.ops.backup.files} günlük kopya · TTS önbelleği ${fmt(s.ops.ttsCacheMB)} MB / 1 GB`} span>
          <Stats cols={5}>
            <Stat
              label="Son yedek"
              value={s.ops.backup.ageH != null ? `${Math.round(s.ops.backup.ageH)} sa önce` : "yok"}
              sub={s.ops.backup.lastAt ? `${s.ops.backup.lastAt.slice(0, 16)} · ${s.ops.backup.sizeMB} MB · ${s.ops.backup.result || "?"}` : undefined}
              tone={s.ops.backup.ageH == null || s.ops.backup.ageH > 26 || (s.ops.backup.result && s.ops.backup.result !== "success") ? "bad" : "ok"}
            />
            <Stat
              label="Harici kopya (R2)"
              value={s.ops.backup.offsiteAgeH != null ? `${Math.round(s.ops.backup.offsiteAgeH)} sa önce` : "yok"}
              sub="şifreli, Cloudflare R2"
              tone={s.ops.backup.offsiteAgeH == null || s.ops.backup.offsiteAgeH > 26 ? "bad" : "ok"}
            />
            <Stat label="Çökmüş servis" value={String(s.ops.failedUnits.length)} sub={s.ops.failedUnits.join(", ") || "systemctl --failed boş"} tone={s.ops.failedUnits.length ? "bad" : "ok"} />
            <Stat label="TTS önbelleği" value={`${fmt(s.ops.ttsCacheMB)} MB`} sub="nginx, 60 gün" tone={s.ops.ttsCacheMB > 900 ? "warn" : undefined} />
            <Stat label="HTTPS sertifikası" value={s.ops.certDaysLeft != null ? `${s.ops.certDaysLeft} gün` : "?"} sub="certbot oto-yenileme" tone={s.ops.certDaysLeft == null ? undefined : s.ops.certDaysLeft < 21 ? "bad" : "ok"} />
          </Stats>
        </Panel>

        <Panel id="kaynak" title="Kaynak kullanımı" hint={`${s.host.cpuCount} vCPU · yük ${s.host.load1.toFixed(2)} / ${s.host.load5.toFixed(2)} / ${s.host.load15.toFixed(2)} · uptime ${dur(s.host.uptimeSec)}`}>
          <div className="space-y-3">
            <Gauge label="CPU" pctVal={s.host.cpuPct} detail={`${s.host.cpuCount} çekirdek`} />
            <Gauge label="RAM" pctVal={s.mem.usedPct} detail={`${fmt(s.mem.totalMB - s.mem.availMB)} / ${fmt(s.mem.totalMB)} MB kullanımda`} />
            <Gauge label="Disk" pctVal={s.disk.usedPct} detail={`${s.disk.freeGB} / ${s.disk.totalGB} GB boş`} />
          </div>
        </Panel>

        <Panel id="deploy" title="Uygulama ve deploy" hint={`Aktif renk: ${s.app.activeColor} · canlı commit ${s.app.liveCommit || "?"}`}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {s.app.instances.map((i) => (
              <div key={i.name} className="flex items-center gap-2 rounded-tile px-2.5 py-2 text-caption" style={{ background: "var(--surface-2)" }}>
                <Dot tone={i.up ? "ok" : "off"} />
                <span className="font-mono">{i.name}</span>
              </div>
            ))}
          </div>
          <p className="muted mt-2 text-caption">Yeşil = çalışan instance (aktif renk yük dengeleme arkasında).</p>
          <Sub>Deploy geçmişi</Sub>
          {s.deploys.length === 0 ? <p className="muted text-caption">Kayıt yok.</p> : (
            <div className="space-y-1">
              {s.deploys.map((dp, i) => (
                <div key={i} className="flex items-center gap-2 text-caption">
                  <Dot tone={dp.status === "ok" ? "ok" : dp.status === "fail" ? "bad" : "info"} />
                  <span className="muted w-36 shrink-0 font-mono tabular-nums">{dp.time}</span>
                  <span className="truncate">{dp.detail}</span>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* ZAMANLANMIŞ İŞLER. Cron'lar bir kez çağıransız kalıp aylarca hiç
            çalışmadı. Liste artık BEKLENEN işlerden kuruluyor: hiç koşmamış
            iş de satır olarak görünüyor ve beklenen aralığı aşan kırmızı. */}
        <Panel id="zamanlanmis-isler" title="Zamanlanmış işler" hint="Kırmızı = beklenen aralıkta koşmadı ya da son koşu hata · denied = CRON_SECRET uyuşmadı" span flush>
          <DataTable
            head={["", "İş", "Ne yapar", "Son koşu", { label: "7 gün", align: "right" }, "Ayrıntı"]}
            rows={c.cron.map((j) => {
              const bad = j.stale || (j.lastAt != null && !j.lastOk);
              return [
                <Dot key="d" tone={bad ? "bad" : "ok"} />,
                <span key="n" className="font-mono">{j.name}</span>,
                <span key="l" className="muted">{j.label}</span>,
                <span key="t" className="font-mono whitespace-nowrap" style={j.stale ? { color: TONE.bad } : undefined}>{j.lastAt ? `${j.lastAt.slice(0, 16)} (${Math.round(j.ageH ?? 0)} sa)` : "hiç koşmadı"}</span>,
                <span key="o">{fmt(j.ok7)} tamam{j.fail7 > 0 && <span style={{ color: TONE.bad }}> · {fmt(j.fail7)} hata</span>}</span>,
                <span key="x" className="muted">{j.detail}</span>,
              ];
            })}
          />
        </Panel>

        <Panel id="veritabani" title="PostgreSQL" hint={`Bağlantı ${s.pg.total}/${s.pg.maxConn} · veritabanı ${fmt(s.pg.dbSizeMB)} MB`}>
          <Stats cols={3}>
            <Stat label="Aktif" value={s.pg.active} />
            <Stat label="Boşta" value={s.pg.idle} />
            <Stat label="Önbellek isabeti" value={`%${s.pg.cacheHitPct}`} tone={s.pg.cacheHitPct >= 95 ? "ok" : "warn"} />
          </Stats>
          <Sub>En büyük tablolar</Sub>
          <BarList max={Math.max(1, ...s.pg.topTables.map((t) => t.mb))} items={s.pg.topTables.map((t) => ({ label: t.name, value: t.mb, right: `${t.mb} MB` }))} />
        </Panel>

        {/* UÇTAN UCA: uygulamanın kendi kaydı değil, nginx'in gördüğü. */}
        <Panel id="istek-sagligi" title="İstek sağlığı (bugün, nginx)" hint={`${s.http.since ? `${s.http.since.slice(0, 17)}'den beri` : "log okunamadı"} · ${fmt(s.http.total)} istek · ${fmt(s.http.api)} API`}>
          <Stats cols={3}>
            <Stat label="5xx" value={fmt(s.http.s5xx)} tone={s.http.s5xx ? "bad" : "ok"} />
            <Stat label="4xx" value={fmt(s.http.s4xx)} />
            <Stat label="Tarama (404)" value={fmt(s.http.probes)} sub="wp-admin, .env…" />
          </Stats>
          <Sub>5xx dönen uçlar</Sub>
          <BarList empty="5xx yok." max={Math.max(1, ...s.http.errors.map((e) => e.count))} items={s.http.errors.map((e) => ({ label: `${e.status} ${e.route}`, value: e.count, tone: "bad" }))} />
          <Sub>En yoğun API uçları</Sub>
          <BarList share max={Math.max(1, ...s.http.topApi.map((a) => a.count))} items={s.http.topApi.map((a) => ({ label: a.route, value: a.count }))} />
        </Panel>

        <Panel id="yapay-zeka" title="Yapay zekâ sağlığı (7g)" hint="Sağlayıcı başına çağrı, başarı, gecikme, token — sohbet ve STT/telaffuz.">
          {d.ai.length === 0 ? <p className="muted text-caption">Son 7 günde AI çağrısı yok.</p> : (
            <div className="space-y-2">
              {d.ai.map((a) => (
                <div key={a.provider} className="rounded-tile px-3 py-2 text-body" style={{ background: "var(--surface-2)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-strong">{a.provider}</span>
                    <span className="text-caption" style={{ color: TONE[a.okPct >= 95 ? "ok" : a.okPct >= 80 ? "warn" : "bad"] }}>%{a.okPct} başarı</span>
                  </div>
                  <div className="muted mt-0.5 flex flex-wrap gap-x-3 text-caption tabular-nums">
                    <span>{fmt(a.calls)} çağrı</span><span>{fmt(a.avgMs)} ms ort.</span>{a.errors > 0 && <span style={{ color: TONE.bad }}>{a.errors} hata</span>}{a.tokens > 0 && <span>{fmt(a.tokens)} token</span>}{a.chars > 0 && <span>{fmt(a.chars)} karakter</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title={`Yapay zekâ kullanımı özellik başına (${days}g)`} hint="Hangi özellik ne kadar harcıyor.">
          <BarList share max={Math.max(1, ...c.engagement.aiByKind.map((a) => a.calls))} items={c.engagement.aiByKind.map((a) => ({
            label: a.kind, value: a.calls,
            right: `${fmt(a.calls)} çağrı${a.errors ? ` · ${fmt(a.errors)} hata` : ""}${a.tokens ? ` · ${fmt(a.tokens)} tok` : ""}${a.audioSec ? ` · ${fmt(a.audioSec / 60)} dk ses` : ""}${a.chars ? ` · ${fmt(a.chars)} kr` : ""}`,
            tone: a.errors ? "warn" : undefined,
          }))} />
        </Panel>

        <Panel title="Yapay zekâ hataları (7g)" hint="Başarısız sağlayıcı çağrıları.">
          <BarList empty="Hata yok." max={Math.max(1, ...d.ai.map((a) => a.errors))} items={d.ai.filter((a) => a.errors > 0).map((a) => ({ label: a.provider, value: a.errors, right: `${a.errors} / ${fmt(a.calls)}`, tone: "bad" }))} />
        </Panel>
    </PanelGrid>
  );
}

/* ── HATALAR sayfasının üst paneli ── */
export function ClientErrorsByScreen({ data: d, days }: { data: AdminData; days: number }) {
  return (
      <Panel title={`İstemci hataları (${days}g)`} hint="Yakalanmamış hata — ekrana göre. Mobil + web." span>
        <BarList share empty="Hata kaydı yok." max={Math.max(1, ...d.clientErrors.map((e) => e.count))} items={d.clientErrors.map((e) => ({ label: e.screen, value: e.count, tone: "bad" }))} />
      </Panel>
  );
}
