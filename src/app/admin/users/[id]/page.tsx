import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { getAdminUser, type Table } from "@/lib/admin-user";
import { activeSuspension, suspensionHistory } from "@/lib/account/suspension";
import { AccountActions } from "./account-actions";
import { AdminDenied, AdminPage, Badge, BTN, DataTable, KeyValue, Notice, PageHeader, Panel, PanelGrid } from "../../_ui/ui";

export const metadata: Metadata = { title: "Kullanıcı" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/users/[id] — tek hesabın bütün izi.
 *
 * Sayfanın tamamı sunucuda çiziliyor; tek istemci parçası hesap işlemleri
 * (askıya al, sil — `account-actions`). Premium ve şikâyet yazma işleri kendi
 * sayfalarında.
 */

const WORD_STATE: Record<number, string> = { 0: "yeni", 1: "öğreniliyor", 2: "tekrar", 3: "yeniden öğreniliyor" };

/** Tablo verisi (`lib/admin-user` Table) → ortak tablo. */
function T({ t, empty }: { t: Table; empty?: string }) {
  return <DataTable head={t.columns} rows={t.rows} empty={empty} mono />;
}

export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Kullanıcı" email={gate.email} />;

  const { id } = await params;
  const userId = decodeURIComponent(id);
  const [u, suspension, history] = await Promise.all([getAdminUser(userId), activeSuspension(userId), suspensionHistory(userId)]);
  const title = u.profile?.display_name || u.profile?.username || u.account?.name || u.id.slice(0, 10);
  const premiumUntil = u.profile?.premium_until ? Date.parse(u.profile.premium_until.replace(" ", "T")) : 0;
  const stamp = (v: string) => v.slice(0, 16).replace("T", " ");

  return (
    <AdminPage>
      <PageHeader
        crumb={["/admin/users", "Kullanıcılar"]}
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {title}
            {u.account?.guest ? <Badge>misafir</Badge> : null}
            {premiumUntil && premiumUntil > Date.now() ? <Badge tone="ok">premium</Badge> : null}
            {suspension ? <Badge tone="bad">askıda</Badge> : null}
          </span>
        }
        meta={<span className="font-mono">{u.id}{u.account?.email ? ` · ${u.account.email}` : ""}</span>}
        actions={
          <>
            <a href={`/admin/premium?q=${encodeURIComponent(u.id)}`} className={BTN.secondary}>Premium ver / al</a>
            <a href="/admin/moderation" className={BTN.secondary}>Moderasyon</a>
          </>
        }
      />
      {u.issues.length ? (
        <Notice tone="bad" title={`${u.issues.length} sorgu başarısız, bazı bölümler eksik`}>
          <span className="text-caption">{u.issues.map((i) => i.message).join(" · ").slice(0, 300)}</span>
        </Notice>
      ) : null}
      {suspension ? <Notice tone="bad" title="Hesap askıda">{suspension.reason}</Notice> : null}
      {!u.account && !u.profile ? <Notice tone="warn">Bu kimlikle hesap yok (silinmiş olabilir).</Notice> : null}

      <PanelGrid>
        <Panel title="Hesap" hint="Kimlik doğrulama tarafı (better-auth).">
          <KeyValue data={u.account ? {
            "e-posta": u.account.email, ad: u.account.name, "e-posta doğrulandı": u.account.verified, misafir: u.account.guest,
            "iki adımlı doğrulama": u.account.twoFactor, "giriş yolları": u.account.providers.join(", "),
            "açık oturum": u.account.activeSessions, "son oturum hareketi": u.account.lastSeen, oluşturuldu: u.account.createdAt,
          } : null} />
        </Panel>

        <Panel title="Etkinlik (30 gün)">
          <KeyValue data={{
            "aktif gün": u.activity.days30, tekrar: u.activity.reviews30, XP: u.activity.xp30,
            "çalışma (dk)": Math.round(u.activity.seconds30 / 60),
            ...Object.fromEntries(u.activity.wordsByState.map((w) => [`kelime · ${WORD_STATE[w.state] ?? w.state}`, w.count])),
            "rozet (toplam)": u.learning.achievements, "görev ödülü (30g)": u.learning.quests30,
          }} />
        </Panel>

        {u.account ? (
          <Panel title="Hesap işlemleri" hint="Dışa aktarma ve askıya alma geri alınabilir; silme kalıcıdır. Hepsi işlem kaydına düşer." span>
            <AccountActions userId={u.id} suspended={suspension ? { reason: suspension.reason, until: suspension.until } : null} />
            {history.length ? (
              <div className="mt-4">
                <div className="muted mb-1.5 text-micro uppercase tracking-eyebrow">Askı geçmişi</div>
                <DataTable
                  head={["Başlangıç", "Gerekçe", "Bitiş", "Veren", "Kaldırıldı", "Kaldıran"]}
                  rows={history.map((h) => [stamp(h.createdAt), h.reason, h.until ? stamp(h.until) : "süresiz", h.adminEmail, h.liftedAt ? stamp(h.liftedAt) : "", h.liftedBy])}
                />
              </div>
            ) : null}
          </Panel>
        ) : null}

        <Panel title="Profil ve ayarlar"><KeyValue data={u.profile} /></Panel>

        <Panel title="Premium" hint="Hak defteri ve kim ne zaman verdi.">
          <KeyValue data={u.premium.entitlement} />
          <div className="mt-3"><T t={u.premium.grants} empty="Elle/kodla verilmiş premium yok." /></div>
        </Panel>

        <Panel title="Uygulama sürümü" hint="Mobil uygulamanın bildirdiği son sürüm, platform başına." span>
          <T t={u.reach.clients} empty="Sürüm bildirimi yok (web kullanıcısı ya da eski build)." />
        </Panel>

        <Panel title="Dersler" span><T t={u.learning.lessons} /></Panel>
        <Panel title="Patika adımları"><T t={u.learning.path} /></Panel>
        <Panel title="Beceri egzersizleri"><T t={u.learning.skills} /></Panel>
        <Panel title="Sınavlar (seviye, modül, haftalık)"><T t={u.learning.exams} /></Panel>
        <Panel title="Haftalık quiz"><T t={u.learning.quiz} /></Panel>
        <Panel title="Deneme sınavları"><T t={u.learning.mock} /></Panel>
        <Panel title="Modül sınavı (boss)"><T t={u.learning.boss} /></Panel>
        <Panel title="Yerleştirme"><T t={u.learning.placements} /></Panel>

        <Panel title="Sosyal">
          <KeyValue data={{
            arkadaş: u.social.friends, "bekleyen istek": u.social.pending, "okunmamış gelen kutusu": u.social.unreadInbox,
            "şikâyet ettiği": u.social.reportsBy, "engelleyen hesap": u.social.blockedBy, "engellediği": u.social.blocking,
            ...(u.social.league ? Object.fromEntries(Object.entries(u.social.league).map(([k, v]) => [`lig · ${k}`, v])) : {}),
          }} />
          <div className="mt-3"><T t={u.social.reportsAgainst} empty="Bu hesap hakkında şikâyet yok." /></div>
        </Panel>

        <Panel title="Bildirim, rıza ve kota" span>
          <KeyValue data={{ "web push aboneliği": u.reach.webPush }} />
          <div className="mt-3 space-y-3">
            <T t={u.reach.devices} empty="Mobil cihaz jetonu yok." />
            <T t={u.reach.consents} empty="Rıza kararı yok." />
            <T t={u.reach.usage} empty="Kota sayacı yok." />
          </div>
        </Panel>

        <Panel title="Yapay zekâ kullanımı (30 gün)"><T t={u.ai} /></Panel>
        <Panel title="İstemci hataları"><T t={u.errors} empty="Hata yok." /></Panel>
        <Panel title="Son olaylar" hint="En yeni 60 telemetri olayı." span><T t={u.events} /></Panel>
      </PanelGrid>
    </AdminPage>
  );
}
