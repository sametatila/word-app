"use client";

import type { AdminData } from "@/lib/admin";
import type { ServerMetrics } from "@/lib/server-metrics";
import type { Coverage } from "@/lib/admin-coverage";
import type { Revenue } from "@/lib/premium/revenue";
import { BarList, Funnel, Meter, ScoreList, SeriesChart, ShareBar, Sparkline, BTN, DataTable, Dot, fmt, Notice, Panel, PanelGrid, Stat, Stats, TONE } from "./_ui/ui";

/**
 * Yönetim panelinin VERİ BÖLÜMLERİ — Durum, Gelir, Büyüme, Deneyim, Öğrenme ve
 * Sunucu sayfaları buradan çiziliyor.
 *
 * Bunlar eskiden tek panonun altı sekmesiydi. Sekmeler konuya göre değil
 * tarihsel olarak birikmişti: gelir Genel bakışta, satın alma hunileri
 * Deneyim'de, premium sayıları Büyüme'de duruyordu; sağlık dört ayrı yere
 * dağılmıştı. Bölümler artık menünün sayfalarıyla birebir (bkz. `_ui/nav`).
 * Veri sunucuda tek seferde ve önbellekli çekiliyor (`_data` `loadPanel`).
 */
const pct = (v: number) => Math.round(v * 100) + "%";
function dur(sec: number): string {
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60);
  return d ? `${d}g ${h}s` : h ? `${h}s ${m}dk` : `${m}dk`;
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
      <div className="mt-4 grid gap-5 border-t pt-4 @3xl:grid-cols-2" style={{ borderColor: "var(--hairline)" }}>
        <div>
          <Sub>Platforma göre brüt gelir</Sub>
          <ShareBar items={r.byPlatform.map((p) => ({ label: p.platform, value: p.grossUsd, right: `${usd(p.grossUsd)} · ${p.payments} ödeme · ${p.active} aktif` }))} empty="Henüz mağaza olayı yok." />
        </div>
        <div>
          <Sub>Ürüne göre brüt gelir</Sub>
          <ShareBar items={r.byProduct.map((p) => ({ label: p.product, value: p.grossUsd, right: `${usd(p.grossUsd)} · ${p.payments} ödeme` }))} empty="Henüz ödeme yok." />
        </div>
      </div>
      <p className="faint mt-4 text-micro">
        {"Kaynak: kendi defterimiz (mağaza webhook'u)"}{rc ? ` · RevenueCat resmî özeti: 28 günde ${rc.revenue28dUsd != null ? usd(rc.revenue28dUsd) : "?"}, yeni müşteri ${rc.newCustomers28d ?? "?"}` : ""}
        {rcError ? <span style={{ color: TONE.warn }}> · {rcError}</span> : null}
        {!r.revenuecat && !rcError ? " · RevenueCat API anahtarı yok (resmî MRR kapalı)" : ""}
      </p>
    </Panel>
  );
}

/** `days`: seçili aralık (7 / 30 / 90) — başlıklar ve pencereli metrikler ona göre. */
type Base = { data: AdminData; coverage: Coverage; days: number };

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
            <Sub>{`Kilide çarpma: ${fmt(d.premium.gates)} (özelliğe göre)`}</Sub>
            <BarList share empty="Kilide çarpma yok." items={d.premiumGates.map((g) => ({ label: g.feature, value: g.count }))} />
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
            <Sub>Premium hesap, mağaza platformu</Sub>
            <ShareBar items={c.premium.byPlatform.map((p) => ({ label: p.key, value: p.count }))} unit=" hesap" empty="Mağaza premium yok." />
          </Panel>
      </PanelGrid>
    </div>
  );
}

/* ── BÜYÜME ── */
/*
  Biçimler: dağılım (seviye, dil çifti, platform, giriş yolu, kurulum yanıtı)
  pay çubuğu; tek sayı kutu; birden çok sütunlu küçük liste tablo. İlerleme
  çubuğu yok: hiçbiri bir hedefe göre doluluk değil.
*/
export function GrowthSection({ days, data: d, coverage: c, deletions }: Base & { deletions: { source: string; count30: number; total: number; avgAgeDays: number; reasons: string }[] }) {
  const g = c.growth;
  const warm = g.warmup;
  const inboxRows = c.engagement.inbox.filter((i) => i.total > 0);
  return (
    <PanelGrid>
        <Panel title="Seviye" hint="Profildeki seviye, A1 → C2.">
          <ShareBar ordinal items={[...d.levels].sort((a, b) => a.level.localeCompare(b.level)).map((l) => ({ label: l.level, value: l.count }))} unit=" kişi" />
        </Panel>

        <Panel title="Dil çifti" hint="Anadil → kurs." flush>
          <DataTable
            empty="Henüz veri yok."
            head={["Çift", { label: "Kişi", align: "right" }, { label: "7 günde aktif", align: "right" }, { label: "Misafir", align: "right" }]}
            rows={c.pairs.map((p) => [pairLabel(p.native, p.course), p.users, p.active7, p.guests])}
          />
        </Panel>

        <Panel title="Misafir modu" hint="Hesapsız kullanım (yalnız mobil). 30 gün kullanılmayan silinir; 20+ gün sessiz olan silinmeye yakın.">
          <Stats cols={4}>
            <Stat label="Toplam" value={fmt(g.guests.total)} />
            <Stat label="Aktif 7g" value={fmt(g.guests.active7)} />
            <Stat label="Silinmeye yakın" value={fmt(g.guests.stale20)} tone={g.guests.stale20 ? "warn" : undefined} />
            <Stat label={`Başlayan ${days}g`} value={fmt(g.guests.starts30)} />
          </Stats>
          <Sub>{`Hesaba geçiş (${days}g)`}</Sub>
          <ShareBar items={g.guests.upgrades.map((u) => ({ label: GUEST_UPGRADE_LABEL[u.key] ?? u.key, value: u.count }))} empty="Geçiş yok." />
          {g.guests.nudges.length ? (
            <>
              <Sub>Hesap çağrısı gösterildi (kilometre taşı)</Sub>
              <BarList items={g.guests.nudges.map((n) => ({ label: n.key, value: n.count, right: `${fmt(n.count)} · ${fmt(n.users)} kişi` }))} />
            </>
          ) : null}
        </Panel>

        <Panel title={`Giriş öncesi (${days}g)`} hint="Hesap açmadan önceki ısınma turu ve ana ekrana ekleme istemi.">
          <Stats cols={3}>
            <Stat label="Isınmayı gördü" value={fmt(warm.seen)} sub="kişi" />
            <Stat label="Bitirdi" value={fmt(warm.done)} sub={warm.seen ? `%${Math.round((warm.done / warm.seen) * 100)} tamamladı` : undefined} />
            <Stat label="Zaten hesabı var" value={fmt(warm.existingAccount)} sub={warm.seen ? `%${Math.round((warm.existingAccount / warm.seen) * 100)} girişe geçti` : undefined} />
          </Stats>
          <Sub>Ana ekrana ekleme istemi</Sub>
          <ShareBar items={g.installPrompt.map((i) => ({ label: INSTALL_LABEL[i.key] ?? i.key, value: i.count, tone: i.key === "1" ? "ok" : undefined }))} empty="İstem gösterilmedi." />
        </Panel>

        <Panel title="Sosyal" hint="Arkadaşlık, lig, dürtme, tepki." actions={<a href="/admin/moderation" className={BTN.small}>Şikâyetler</a>}>
          <Stats cols={3}>
            <Stat label="Kullanıcı adı" value={fmt(g.social.usernames)} sub={`${fmt(g.social.publicProfiles)} herkese açık`} />
            <Stat label="Arkadaşlık" value={fmt(g.social.friendsAccepted)} sub={`${fmt(g.social.friendsPending)} bekleyen istek`} />
            <Stat label="Bu hafta ligde" value={fmt(g.social.leagueThisWeek)} sub={`${fmt(g.social.leagueUps30)} yükselme ${days}g`} />
            <Stat label={`Dürtme ${days}g`} value={fmt(g.social.nudges30)} />
            <Stat label={`Tepki ${days}g`} value={fmt(g.social.reactions30)} sub={`${fmt(g.social.feedViews30)} akış açılışı`} />
            <Stat label="Engelleme" value={fmt(g.social.blocks)} sub={`${fmt(g.social.questsActive)} aktif ortak görev`} tone={g.social.blocks ? "warn" : undefined} />
          </Stats>
        </Panel>

        <Panel title="Bildirim erişimi" hint="Bugün bildirim alabilecek cihaz (3+ başarısız teslimli jetonlar hariç) ve açık hatırlatmalar.">
          <ShareBar items={g.pushReach.map((p) => ({ label: p.key, value: p.count }))} unit=" cihaz" empty="Bildirim alabilecek cihaz yok." />
          <div className="mt-4">
            <Stats cols={3}>
              <Stat label="Hatırlatma açık" value={fmt(g.remindersOn.reminders)} />
              <Stat label="Seri koruma" value={fmt(g.remindersOn.streakAlert)} />
              <Stat label="Haftalık sınav" value={fmt(g.remindersOn.weeklyReminder)} />
            </Stats>
          </div>
        </Panel>

        <Panel title="Gelen kutusu ve akış" hint={`Okunmamış sosyal bildirim birikimi (tür başına) ve son ${days} günde akışa düşen olaylar.`} flush>
          <DataTable
            empty="Gelen kutusunda bildirim yok."
            head={["Tür", { label: "Okunmamış", align: "right" }, { label: "Toplam", align: "right" }, { label: "Okunmamış payı", align: "right" }]}
            rows={inboxRows.map((i) => [i.type, i.unread, i.total, <span key="p" style={i.unread / i.total > 0.8 ? { color: TONE.warn } : undefined}>%{Math.round((i.unread / i.total) * 100)}</span>])}
          />
          {c.engagement.feed.length ? (
            <div className="px-3 pb-2 pt-3">
              <Sub>{`Akış olayları (${days}g)`}</Sub>
              <BarList share items={c.engagement.feed.map((f) => ({ label: f.type, value: f.count }))} />
            </div>
          ) : null}
        </Panel>

        <Panel title="Giriş ve güvenlik" hint="Hesap (misafir hariç), giriş yolları, iki adımlı doğrulama, açık oturum.">
          <Stats cols={4}>
            <Stat label="Hesap" value={fmt(c.auth.accounts)} />
            <Stat label="Doğrulanmamış" value={fmt(c.auth.unverified)} tone={c.auth.unverified ? "warn" : undefined} />
            <Stat label="2FA açık" value={fmt(c.auth.twoFactor)} />
            <Stat label="Açık oturum" value={fmt(c.auth.activeSessions)} />
          </Stats>
          <Sub>Giriş yolu</Sub>
          <ShareBar items={c.auth.providers.map((p) => ({ label: p.key, value: p.count }))} />
        </Panel>

        <Panel title="Yapay zekâ rızası" hint="Kişi başına son karar.">
          {g.consents.length ? (
            <div className="space-y-4">
              {g.consents.map((x) => (
                <div key={x.purpose}>
                  <div className="mb-1.5 text-caption text-strong">{CONSENT_LABEL[x.purpose] ?? x.purpose}</div>
                  <ShareBar ordinal items={[{ label: "Evet", value: x.granted, tone: "ok" }, { label: "Hayır", value: x.denied }]} />
                </div>
              ))}
            </div>
          ) : <p className="muted text-caption">Henüz karar yok.</p>}
        </Panel>

        <Panel title={`Ücretsiz kota (${days}g)`} hint="Kota anahtarı başına tüketilen hak ve kişi.">
          <BarList empty="Kota tüketimi yok." items={g.quota.map((q) => ({ label: q.key, value: q.total, right: `${fmt(q.total)} · ${fmt(q.users)} kişi` }))} />
        </Panel>

      {/* Hesap silmeleri Uygulama sayfasındaydı: kaybın ölçüsü büyümenin
          yanında okunur, sürüm ve bakım ayarının yanında değil. */}
      <Panel title="Hesap silmeleri" hint="Kimlik tutulmaz; yalnız yol, hesabın yaşı ve panel silmelerinde gerekçe." span flush>
        <DataTable
          empty="Silme kaydı yok."
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
  const n = d.notifications;
  const screenViews = d.screens.reduce((a, sc) => a + sc.views, 0);
  const eventTotal = d.events30.reduce((a, e) => a + e.count, 0);
  const share = (v: number, of: number) => (of ? `%${Math.round((v / of) * 100)}` : "—");
  return (
    <PanelGrid>
        <Panel title={`Platform dağılımı (${days}g)`} hint={`${fmt(appOpens)} açılış · %${appOpens ? Math.round((installed / appOpens) * 100) : 0} ana ekrana eklenmiş web uygulaması olarak.`}>
          <ShareBar items={d.platform.map((p) => ({ label: PLATFORM_LABEL[p.key] ?? p.key, value: p.count, right: `${fmt(p.count)} · ${fmt(p.users)} kişi` }))} />
        </Panel>

        <Panel title={`Tur tamamlama (${days}g)`}>
          <Funnel unit="tur" steps={[
            { label: "Tur başladı", value: sess.started },
            { label: "Tamamlandı", value: sess.done },
          ]} />
          <p className="muted mt-3 text-caption">{`"Şimdilik yeter" ile bırakılan: ${fmt(sess.stopped)} tur (${share(sess.stopped, sess.started)})`}</p>
        </Panel>

        <Panel title="Onboarding hunisi" hint="Adım başına ulaşan tekil kullanıcı: nerede düşüyorlar.">
          <Funnel steps={[...d.onboarding].sort((a, b) => ONB_ORDER.indexOf(a.step) - ONB_ORDER.indexOf(b.step)).map((o) => ({ label: ONB_LABEL[o.step] ?? o.step, value: o.users }))} />
        </Panel>

        <Panel id="bildirimler" title={`Bildirimler (${days}g)`} hint="İzin kararı ve gönderilen bildirimin yolu: denendi → cihaza ulaştı → açıldı. Denenip ulaşmayan: abonelik ölmüş, jeton geçersiz ya da sağlayıcı reddetmiş.">
          <Sub>İzin kararı</Sub>
          <ShareBar ordinal items={[{ label: "İzin verdi", value: n.optinYes, tone: "ok" }, { label: "Reddetti", value: n.optinNo }]} empty="İzin sorulmadı." />
          <Sub>Teslim</Sub>
          <Stats cols={3}>
            <Stat label="Denendi" value={fmt(n.sent)} />
            <Stat label="Ulaştı" value={fmt(n.delivered)} sub={n.sent ? `${pct(n.delivered / n.sent)} teslim` : undefined} tone={n.sent > 0 && n.delivered < n.sent / 2 ? "warn" : undefined} />
            <Stat label="Açıldı" value={fmt(n.opened)} sub={d.notifications.delivered ? `${pct(d.notifications.opened / d.notifications.delivered)} ulaşanın` : undefined} />
          </Stats>
        </Panel>

        <Panel title={`Sesli okuma (${days}g)`} hint="Nöral ses çalınamayınca düşülen basamak. Artarsa TTS ucu ya da önbellek sorunlu.">
          <Stats cols={2}>
            <Stat label="Çalma" value={fmt(c.learning.tts.plays)} />
            <Stat
              label="Yedeğe düşen"
              value={fmt(c.learning.tts.fallbacks.reduce((a, f) => a + f.count, 0))}
              sub={share(c.learning.tts.fallbacks.reduce((a, f) => a + f.count, 0), c.learning.tts.plays)}
              tone={c.learning.tts.fallbacks.length ? "warn" : "ok"}
            />
          </Stats>
          {c.learning.tts.fallbacks.length ? (
            <div className="mt-3"><BarList items={c.learning.tts.fallbacks.map((f) => ({ label: `yedek: ${f.key}`, value: f.count, tone: "warn" }))} /></div>
          ) : null}
        </Panel>

        <Panel title={`Yürüyüş: dinleme sonuçları (${days}g)`} hint="Her dinlemenin yolu ve sonucu: tanıma kalitesi. Yeşil başarılı, kırmızı ağ/izin/kod çözme.">
          <BarList share items={c.learning.walkListen.map((w) => ({ label: w.key, value: w.count, tone: /:ok$/.test(w.key) ? "ok" : /network|decode|not-allowed|deadline/.test(w.key) ? "bad" : undefined }))} />
        </Panel>

        <Panel title="Yürüyüş: tur nasıl bitti" hint="Ekransız tur. Kırmızı: cihaz ya da mikrofon kaynaklı bitiş.">
          <BarList share items={d.walk.map((w) => ({ label: WALK_REASON[w.reason] ?? `sebep ${w.reason}`, value: w.count, tone: w.reason >= 4 ? "bad" : undefined }))} />
        </Panel>

        <Panel title={`Giden e-posta (${days}g)`} id="e-posta" hint="Doğrulama postası hesap açmanın kapısı: hata kırmızı. Tavan = alıcı başına saatlik sınır." flush>
          <DataTable
            empty="Kayıt yok."
            head={["Tür", { label: "Gitti", align: "right" }, { label: "Hata", align: "right" }, { label: "Tavana takıldı", align: "right" }]}
            rows={d.mail.map((m) => [m.kind, m.ok, <span key="f">{m.fail > 0 && <b style={{ color: TONE.bad }}>{m.fail}</b>}{m.fail === 0 ? 0 : null}</span>, <span key="c" style={m.cap ? { color: TONE.warn } : undefined}>{m.cap}</span>])}
          />
        </Panel>

        <Panel title={`Ekran kullanımı (${days}g)`} hint="Görüntülenme ve ortalama görünür süre. Çok bakılıp az kalınan ekran soğuk ekrandır." span flush>
          <DataTable
            name="ekranlar"
            empty="Ekran kaydı yok."
            head={["Ekran", { label: "Görüntülenme", align: "right" }, { label: "Pay", align: "right" }, { label: "Ort. süre (sn)", align: "right" }]}
            rows={d.screens.map((sc) => [sc.screen, sc.views, share(sc.views, screenViews), sc.avgSec])}
          />
        </Panel>

        <Panel title={`Telemetri olayları (${days}g)`} hint="Ada göre olay sayısı ve tekil kullanıcı." span flush>
          <DataTable
            name="olaylar"
            empty="Olay yok."
            head={["Olay", { label: "Sayı", align: "right" }, { label: "Pay", align: "right" }, { label: "Kişi", align: "right" }]}
            rows={d.events30.map((e) => [<span key="n" className="font-mono">{e.name}</span>, e.count, share(e.count, eventTotal), e.users])}
          />
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
/*
  Ortalama puanlar (0-100) ScoreList: eksende nokta + 60 eşiği, en zayıf üstte.
  Hacim (kaç deneme, kaç kişi) puanın yanında metin: az denemeli bir %40
  ile çok denemeli bir %40 aynı alarm değil.
*/
export function LearningSection({ days, data: d, coverage: c }: Base) {
  const conv = c.learning.conversations;
  const path = c.learning.path;
  const boss = c.engagement.bossEvents;
  const ch = c.engagement.challenge;
  return (
    <PanelGrid>
        <Panel title={`Konuşmalar · Patika (${days}g)`} hint="Konuşma başına ortalama puan, en zayıftan.">
          <Stats cols={4}>
            <Stat label="Başladı" value={fmt(conv.started)} />
            <Stat label="Bitti" value={fmt(conv.finished)} sub={conv.started ? `%${Math.round((conv.finished / conv.started) * 100)}` : undefined} />
            <Stat label="Kişi" value={fmt(conv.users)} />
            <Stat label="Kural tekrarı" value={fmt(conv.rulesDue)} sub={`vadesi geldi · ${fmt(conv.rulesTracked)} izleniyor`} />
          </Stats>
          <Sub>Konuşma puanları</Sub>
          <ScoreList items={c.learning.topConversations.map((l) => ({ label: l.conversation, score: l.avgPct, right: `${fmt(l.users)} kişi` }))} />
        </Panel>

        <Panel title="Patika adımları" hint="En az 2 kişinin denediği öğelerde en iyi puan ortalaması, en zayıftan.">
          <Stats cols={4}>
            <Stat label="Öğe" value={fmt(path.items)} sub={`${fmt(path.users)} kişi`} />
            <Stat label="Deneme" value={fmt(path.attempts)} />
            <Stat label="Geçildi" value={fmt(path.passed)} />
            <Stat label="Ort. en iyi" value={`%${path.avgBest}`} tone={path.avgBest && path.avgBest < 60 ? "warn" : undefined} />
          </Stats>
          <Sub>En zayıf öğeler</Sub>
          <ScoreList items={c.learning.pathWeakest.map((i) => ({ label: i.item, score: i.avgBest, right: `geçen %${i.passRate}` }))} />
        </Panel>

        <Panel title={`Beceri egzersizleri (${days}g)`} hint="Beceri · seviye başına ortalama puan.">
          <ScoreList items={c.learning.skills.map((x) => ({ label: x.key, score: x.avg, right: `${fmt(x.count)} deneme · ${fmt(x.users)} kişi` }))} />
        </Panel>

        <Panel title="Beceri ilerlemesi" hint="Beceri · seviye: son puan ortalaması (çevrimdışı gönderilenler dahil).">
          <ScoreList items={c.engagement.skillProgress.map((x) => ({ label: `${x.skill} · ${x.level}`, score: x.avgScore, right: `${fmt(x.exercises)} egzersiz · ${fmt(x.users)} kişi` }))} />
        </Panel>

        <Panel title={`Sınavlar (${days}g)`} hint="Seviye, modül ve haftalık sınav: tür başına ortalama puan.">
          <ScoreList items={c.learning.exams.map((x) => ({ label: x.key, score: x.avg, right: `${fmt(x.count)} sınav · ${fmt(x.users)} kişi` }))} />
        </Panel>

        <Panel title={`Üretim görevleri (${days}g)`} hint="Çeviri, dönüştürme, serbest yazma, konuşma: ortalama puan.">
          <ScoreList items={d.production.map((p) => ({ label: p.task, score: p.avgScore, right: `${fmt(p.count)} görev` }))} />
        </Panel>

        <Panel title="Oyun doğruluğu" hint="Oyun türüne göre doğru cevap oranı ve hacim.">
          <ScoreList items={d.games.map((g) => ({ label: g.game, score: g.accuracy * 100, right: `${fmt(g.count)} cevap` }))} />
        </Panel>

        <Panel title="Deneme sınavları" hint="Seviye · bölüm: başlayan → biten → geçen; ortalama bitenlerin." flush>
          <DataTable
            empty="Henüz deneme yok."
            head={["Seviye · bölüm", { label: "Başlayan", align: "right" }, { label: "Biten", align: "right" }, { label: "Geçen", align: "right" }, { label: "Ortalama", align: "right" }]}
            rows={c.learning.mock.map((m) => [
              <span key="l" className="font-mono">{m.level} · {m.skill}</span>, fmt(m.started), fmt(m.finished),
              <span key="p" style={{ color: TONE.ok }}>{fmt(m.passed)}</span>, m.finished ? `%${m.avgScore}` : "—",
            ])}
          />
        </Panel>

        <Panel title={`Modül sınavı (${days}g)`} hint="Boss sınavı: seviye başına kişi, geçilen modül ve ortalama deneme." flush>
          <div className="px-3 pt-2">
            <Stats cols={2}>
              <Stat label="Giriş" value={fmt(boss.plays)} />
              <Stat label="Geçiş" value={fmt(boss.clears)} sub={boss.plays ? `%${Math.round((boss.clears / boss.plays) * 100)}` : undefined} />
            </Stats>
          </div>
          <div className="mt-3">
            <DataTable
              empty="Henüz boss sınavı yok."
              head={["Seviye", { label: "Kişi", align: "right" }, { label: "Geçilen modül", align: "right" }, { label: "Ort. deneme", align: "right" }]}
              rows={c.engagement.boss.map((b) => [b.level, b.users, b.cleared, b.avgAttempts])}
            />
          </div>
        </Panel>

        <Panel title="Yerleştirme testi" hint="Önerilen seviye ve öneriyi kabul eden." flush>
          <DataTable
            empty="Henüz test yok."
            head={["Önerilen seviye", { label: "Test", align: "right" }, { label: "Kabul", align: "right" }, { label: "Kabul oranı", align: "right" }]}
            rows={[...c.learning.placements].sort((a, b) => a.level.localeCompare(b.level)).map((p) => [p.level, p.count, p.accepted, p.count ? `%${Math.round((p.accepted / p.count) * 100)}` : "—"])}
          />
        </Panel>

        <Panel title={`Sohbet ve değerlendirme (${days}g)`} hint="Yapay zekâ sohbeti (kipe göre) ve değerlendirme çağrıları (tür · sağlayıcı).">
          <Stats cols={3}>
            <Stat label="Sohbet turu" value={fmt(c.learning.chat.turns30)} sub={`${fmt(c.learning.chat.users30)} kişi`} />
            <Stat label="Telaffuz ölçümü" value={fmt(c.learning.pronounce.count)} />
            <Stat label="Ort. telaffuz" value={c.learning.pronounce.count ? `%${c.learning.pronounce.avg}` : "—"} />
          </Stats>
          <Sub>Sohbet kipi</Sub>
          <ShareBar items={c.learning.chat.byMode.map((m) => ({ label: m.key, value: m.count }))} unit=" tur" />
          <Sub>Değerlendirme</Sub>
          <BarList share items={c.learning.assessments.map((a) => ({ label: `${a.kind} · ${a.provider}`, value: a.count }))} />
        </Panel>

        <Panel title="Hata tipleri" hint="Yanlış cevapların sınıflandırması.">
          <BarList share items={d.errors.map((e) => ({ label: e.type, value: e.count }))} />
        </Panel>

        <Panel title="En zorlanılan kelimeler" hint="En çok unutulan (lapse) ve sülük: içerik iyileştirme için." flush>
          <DataTable
            empty="Henüz veri yok."
            head={["Kurs", "Kelime", "Anlam", { label: "Unutma", align: "right" }, { label: "Sülük", align: "right" }]}
            rows={d.hardWords.map((w) => [LANG_SHORT[w.course] ?? w.course, <b key="w">{w.word}</b>, <span key="g" className="muted">{w.gloss}</span>, w.lapses, w.leeches])}
          />
        </Panel>

        <Panel title="Rozetler" hint={`Kaç kişide var; son ${days} günde açılan.`}>
          <BarList items={c.engagement.achievements.map((a) => ({ label: a.id, value: a.users, right: `${fmt(a.users)} kişi · +${fmt(a.last30)}` }))} />
        </Panel>

        <Panel title={`Günlük görevler ve hayatta kalma (${days}g)`}>
          <Stats cols={3}>
            <Stat label="Hayatta kalma" value={fmt(ch.plays30)} sub={`oyun · ${fmt(ch.users30)} kişi`} />
            <Stat label="Ort. rekor" value={fmt(ch.avgBest)} sub={`${fmt(ch.withBest)} kişinin rekoru var`} />
            <Stat label="En iyi" value={fmt(ch.maxBest)} />
          </Stats>
          <Sub>Görev ödülü alınan</Sub>
          <BarList items={c.engagement.quests.map((q) => ({ label: q.id, value: q.claims, right: `${fmt(q.claims)} · ${fmt(q.users)} kişi` }))} />
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
          <div className="space-y-4">
            <Meter label="CPU" value={s.host.cpuPct} detail={`${s.host.cpuCount} çekirdek`} />
            <Meter label="RAM" value={s.mem.usedPct} detail={`${fmt(s.mem.totalMB - s.mem.availMB)} / ${fmt(s.mem.totalMB)} MB`} warnAt={80} badAt={92} />
            <Meter label="Disk" value={s.disk.usedPct} detail={`${s.disk.freeGB} GB boş / ${s.disk.totalGB} GB`} warnAt={85} badAt={95} />
          </div>
          <p className="faint mt-3 text-micro">Çizgiler sarı ve kırmızı eşik. RAM %92 ile disk %85 / %95 uyarı motorunun (Telegram) eşikleri; CPU için uyarı yok.</p>
        </Panel>

        <Panel id="deploy" title="Uygulama ve deploy" hint={`Aktif renk: ${s.app.activeColor} · canlı commit ${s.app.liveCommit || "?"}`}>
          <div className="grid grid-cols-2 gap-2 @xl:grid-cols-3">
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

        <Panel id="veritabani" title="PostgreSQL" hint={`Bağlantı ${s.pg.total}/${s.pg.maxConn} · veritabanı ${fmt(s.pg.dbSizeMB)} MB`}>
          <Stats cols={3}>
            <Stat label="Aktif" value={s.pg.active} />
            <Stat label="Boşta" value={s.pg.idle} />
            <Stat label="Önbellek isabeti" value={`%${s.pg.cacheHitPct}`} tone={s.pg.cacheHitPct >= 95 ? "ok" : "warn"} />
          </Stats>
          {s.pg.maxConn ? <div className="mt-4"><Meter label="Bağlantı" value={(s.pg.total / s.pg.maxConn) * 100} detail={`${s.pg.total} / ${s.pg.maxConn}`} warnAt={80} badAt={90} /></div> : null}
          <Sub>En büyük tablolar</Sub>
          <BarList items={s.pg.topTables.map((t) => ({ label: t.name, value: t.mb, right: `${fmt(t.mb)} MB` }))} />
        </Panel>

        {/* UÇTAN UCA: uygulamanın kendi kaydı değil, nginx'in gördüğü. */}
        <Panel id="istek-sagligi" title="İstek sağlığı (bugün, nginx)" hint={`${s.http.since ? `${s.http.since.slice(0, 17)}'den beri` : "log okunamadı"} · ${fmt(s.http.total)} istek · ${fmt(s.http.api)} API`}>
          <Stats cols={3}>
            <Stat label="5xx" value={fmt(s.http.s5xx)} tone={s.http.s5xx ? "bad" : "ok"} />
            <Stat label="4xx" value={fmt(s.http.s4xx)} />
            <Stat label="Tarama (404)" value={fmt(s.http.probes)} sub="wp-admin, .env…" />
          </Stats>
          <Sub>5xx dönen uçlar</Sub>
          <BarList empty="5xx yok." items={s.http.errors.map((e) => ({ label: `${e.status} ${e.route}`, value: e.count, tone: "bad" }))} />
          <Sub>En yoğun API uçları</Sub>
          <BarList share items={s.http.topApi.map((a) => ({ label: a.route, value: a.count }))} />
        </Panel>

        <Panel id="yapay-zeka" title="Yapay zekâ sağlığı (7g)" hint="Sağlayıcı başına çağrı, başarı, gecikme ve hacim: sohbet, STT ve telaffuz." flush>
          {/* Etkin zincir koddan ve env'den (lib/ai-providers): tablodaki geçmişte zincirden çıkmış sağlayıcılar da var. */}
          <div className="px-4 py-3 text-body flex flex-col gap-1">
            {(["chat", "stt", "tts"] as const).map((role) => {
              const list = d.aiActive.filter((p) => p.role === role);
              return (
                <div key={role}>
                  <b>{role === "chat" ? "Dil modeli" : role === "stt" ? "Konuşma tanıma" : "Seslendirme"}:</b>{" "}
                  {list.length ? list.map((p) => `${p.name} (${p.model})`).join(" → ") : <span style={{ color: TONE.bad }}>yapılandırılmamış</span>}
                </div>
              );
            })}
            {d.azureMonth && (
              <div>
                <b>Azure Speech bu ay (ücretsiz katman):</b> konuşma tanıma {Math.round(d.azureMonth.sttSeconds / 60)} / {Math.round(d.azureMonth.sttCap / 60)} dk · seslendirme {fmt(d.azureMonth.ttsChars)} / {fmt(d.azureMonth.ttsCap)} karakter
              </div>
            )}
          </div>
          <DataTable
            empty="Son 7 günde yapay zekâ çağrısı yok."
            head={["Sağlayıcı", { label: "Çağrı", align: "right" }, { label: "Başarı", align: "right" }, { label: "Hata", align: "right" }, { label: "Ort. ms", align: "right" }, { label: "Jeton (giriş+çıkış) / karakter", align: "right" }]}
            rows={d.ai.map((a) => [
              a.active ? <b key="p">{a.provider}</b> : <span key="p" style={{ opacity: 0.55 }}>{a.provider} (zincirde değil)</span>,
              a.calls,
              <span key="o" style={{ color: TONE[a.okPct >= 95 ? "ok" : a.okPct >= 80 ? "warn" : "bad"] }}>%{a.okPct}</span>,
              <span key="e" style={a.errors ? { color: TONE.bad } : undefined}>{a.errors}</span>,
              a.avgMs,
              <span key="t">{a.tokens > 0 && `${fmt(a.tokens)} tok`}{a.tokens > 0 && a.chars > 0 && " · "}{a.chars > 0 && `${fmt(a.chars)} kr`}{!a.tokens && !a.chars ? "—" : null}</span>,
            ])}
          />
        </Panel>

        {/* KOTA VE BÜTÇE (lib/ai-budget): ücretsiz kotalar dolmadan ve fatura büyümeden görmek için.
            Devre kesici yok; uyarı motoru aynı sayılarla %80'de Telegram'a yazıyor. */}
        <Panel id="yapay-zeka-butce" title="Yapay zekâ bütçesi" hint="Bugün (UTC) ücretsiz kotalar, bu ay tahmini maliyet. Sayılar bu uygulamanın kaydından: alt sınır (aynı hesabı başka işler de kullanıyorsa gerçek daha yüksek). Plan değişince lib/ai-budget-limits." flush>
          {d.budget ? (() => {
            const b = d.budget;
            const usd = (n: number) => `${n.toFixed(2)} $`;
            const pct = (v: number, cap: number) => (cap > 0 ? (v / cap) * 100 : 0);
            const planLabel = (p: "free" | "paid") => (p === "free" ? "ücretsiz plan" : "ücretli plan");
            return (
              <div className="px-4 py-3 flex flex-col gap-4">
                <Stats cols={3}>
                  <Stat label="Bu ay" value={usd(b.monthUsd)} sub="sabit plan ücretleri hariç" tone={b.budgetUsd && b.monthUsd >= b.budgetUsd ? "bad" : undefined} />
                  <Stat label="Ay sonu tahmini" value={usd(b.projectedUsd)} tone={b.budgetUsd && b.projectedUsd >= b.budgetUsd ? "warn" : undefined} />
                  <Stat label="Bütçe" value={b.budgetUsd ? usd(b.budgetUsd) : "—"} sub={b.budgetUsd ? "AI_MONTHLY_BUDGET_USD" : "AI_MONTHLY_BUDGET_USD boş: bütçe uyarısı yok"} />
                </Stats>
                {b.cloudflare.plan === "free" ? (
                  <Meter label={`Cloudflare bugün (${planLabel(b.cloudflare.plan)}, dolunca reddeder)`} value={pct(b.cloudflare.neuronsToday, b.cloudflare.freePerDay)} detail={`~${fmt(b.cloudflare.neuronsToday)} / ${fmt(b.cloudflare.freePerDay)} neuron`} warnAt={80} badAt={100} />
                ) : (
                  <div className="text-body"><b>Cloudflare bugün:</b> ~{fmt(b.cloudflare.neuronsToday)} neuron ({fmt(b.cloudflare.freePerDay)} ücretsiz, üstü faturalanır)</div>
                )}
                <div className="text-caption muted -mt-2">
                  Bu ay ~{fmt(b.cloudflare.monthNeurons)} neuron · {usd(b.cloudflare.monthUsd)}
                  {b.cloudflare.missingTokens > 0 && ` · ${b.cloudflare.missingTokens} çağrı jetonsuz (tahmin alt sınır)`}
                  {b.cloudflare.unknownModels.length > 0 && <span style={{ color: TONE.bad }}> · tarifede yok: {b.cloudflare.unknownModels.join(", ")}</span>}
                </div>
                {b.groq.models.map((m) =>
                  m.limit ? (
                    <Meter key={m.model} label={`Groq ${m.model} bugün (${planLabel(b.groq.plan)})`} value={pct(m.tokensToday, m.limit)} detail={`${fmt(m.tokensToday)} / ${fmt(m.limit)} jeton`} warnAt={80} badAt={100} />
                  ) : (
                    <div key={m.model} className="text-body"><b>Groq {m.model} bugün:</b> {fmt(m.tokensToday)} jeton</div>
                  ),
                )}
                <Meter label="Groq Whisper bugün (ücretsiz katman)" value={Math.max(pct(b.groq.sttRequestsToday, b.groq.sttRequestsLimit), pct(b.groq.sttSecondsToday, b.groq.sttSecondsLimit))} detail={`${b.groq.sttRequestsToday} / ${fmt(b.groq.sttRequestsLimit)} istek · ${Math.round(b.groq.sttSecondsToday / 60)} / ${Math.round(b.groq.sttSecondsLimit / 60)} dk`} warnAt={80} badAt={100} />
                {d.azureMonth && (
                  <>
                    <Meter label="Azure konuşma tanıma bu ay (F0, kod tavanı)" value={pct(d.azureMonth.sttSeconds, d.azureMonth.sttCap)} detail={`${Math.round(d.azureMonth.sttSeconds / 60)} / ${Math.round(d.azureMonth.sttCap / 60)} dk`} warnAt={80} badAt={100} />
                    <Meter label="Azure seslendirme bu ay (F0)" value={pct(d.azureMonth.ttsChars, d.azureMonth.ttsCap)} detail={`${fmt(d.azureMonth.ttsChars)} / ${fmt(d.azureMonth.ttsCap)} karakter`} warnAt={80} badAt={100} />
                  </>
                )}
                <div className="text-body"><b>Deepgram bu ay:</b> {fmt(b.deepgram.monthMinutes)} dk · {usd(b.deepgram.monthUsd)} <span className="muted">(200 $ başlangıç kredisinden düşer; bakiye yalnız Deepgram konsolunda)</span></div>
                {b.resend.plan === "free" ? (
                  <>
                    <Meter label="Resend son 24 saat (ücretsiz plan, dolunca doğrulama postası gitmez)" value={pct(b.resend.last24h, b.resend.perDay)} detail={`${b.resend.last24h} / ${b.resend.perDay} posta`} warnAt={70} badAt={90} />
                    <Meter label="Resend bu ay" value={pct(b.resend.month, b.resend.perMonth)} detail={`${fmt(b.resend.month)} / ${fmt(b.resend.perMonth)} posta`} warnAt={80} badAt={95} />
                  </>
                ) : (
                  <div className="text-body"><b>Resend:</b> son 24 saat {b.resend.last24h}, bu ay {fmt(b.resend.month)} posta</div>
                )}
              </div>
            );
          })() : <div className="px-4 py-3 text-body" style={{ color: TONE.bad }}>Bütçe verisi okunamadı (sunucu günlüğünde “[admin] yapay zekâ bütçesi”).</div>}
        </Panel>

        <Panel title={`Yapay zekâ kullanımı (${days}g)`} hint="Özellik başına: hangisi ne kadar harcıyor." flush>
          <DataTable
            empty="Kullanım yok."
            head={["Özellik", { label: "Çağrı", align: "right" }, { label: "Hata", align: "right" }, { label: "Token", align: "right" }, { label: "Ses (dk)", align: "right" }, { label: "Karakter", align: "right" }]}
            rows={c.engagement.aiByKind.map((a) => [
              a.kind, a.calls, <span key="e" style={a.errors ? { color: TONE.bad } : undefined}>{a.errors}</span>, a.tokens ? fmt(a.tokens) : "—", a.audioSec ? fmt(a.audioSec / 60) : "—", a.chars ? fmt(a.chars) : "—",
            ])}
          />
        </Panel>

        {/* ZAMANLANMIŞ İŞLER. Cron'lar bir kez çağıransız kalıp aylarca hiç
            çalışmadı. Liste artık BEKLENEN işlerden kuruluyor: hiç koşmamış
            iş de satır olarak görünüyor ve beklenen aralığı aşan kırmızı. */}
        <Panel id="zamanlanmis-isler" title="Zamanlanmış işler" hint="Kırmızı = beklenen aralıkta koşmadı ya da son koşu hata · yetkisiz = sırsız çağrı (CRON_SECRET yok ya da yanlış), son koşu sayılmaz" span flush>
          <DataTable
            head={["", "İş", "Ne yapar", "Son koşu", { label: "7 gün", align: "right" }, "Ayrıntı"]}
            rows={c.cron.map((j) => {
              const bad = j.stale || (j.lastAt != null && !j.lastOk);
              return [
                <Dot key="d" tone={bad ? "bad" : "ok"} />,
                <span key="n" className="font-mono">{j.name}</span>,
                <span key="l" className="muted">{j.label}</span>,
                <span key="t" className="font-mono whitespace-nowrap" style={j.stale ? { color: TONE.bad } : undefined}>{j.lastAt ? `${j.lastAt.slice(0, 16)} (${Math.round(j.ageH ?? 0)} sa)` : "hiç koşmadı"}</span>,
                <span key="o">{fmt(j.ok7)} tamam{j.fail7 > 0 && <span style={{ color: TONE.bad }}> · {fmt(j.fail7)} hata</span>}{j.denied7 > 0 && <span className="muted"> · {fmt(j.denied7)} yetkisiz</span>}</span>,
                <span key="x" className="muted">{j.detail}</span>,
              ];
            })}
          />
        </Panel>
    </PanelGrid>
  );
}

/* ── HATALAR sayfasının üst bandı ── */
/** Ne zaman (14 günlük günlük dizi, gösterge şeridiyle aynı kaynak) ve nerede (ekran). */
export function ClientErrorsOverview({ data: d, days, daily }: { data: AdminData; days: number; daily: { day: string; errors: number }[] }) {
  return (
    <div className="grid items-start gap-5 @4xl:grid-cols-2">
      <Panel title="Günlük istemci hatası" hint="Bugün hariç son 14 tam gün; yakalanmamış JS hatası, mobil + web.">
        <SeriesChart height={112} empty="Son 14 günde hata yok." days={daily.map((x) => x.day)} series={[{ key: "errors", label: "Hata", values: daily.map((x) => x.errors) }]} />
      </Panel>
      <Panel title={`Ekrana göre (${days}g)`} hint="Hatanın yakalandığı ekran.">
        <BarList share empty="Hata kaydı yok." items={d.clientErrors.map((e) => ({ label: e.screen, value: e.count, tone: "bad" }))} />
      </Panel>
    </div>
  );
}
