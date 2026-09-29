import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { getAdminUser, type Table } from "@/lib/admin-user";
import { activeSuspension, suspensionHistory } from "@/lib/account/suspension";
import { AccountActions } from "./account-actions";
import { PremiumActions } from "./premium-actions";
import { findPremiumAccount } from "@/lib/premium";
import { AdminDenied, AdminPage, Badge, BTN, DataTable, KeyValue, Notice, PageHeader, Panel, Stat, Stats } from "../../_ui/ui";
import { LearningTabs } from "./learning-tabs";

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
  const [u, suspension, history, premium] = await Promise.all([getAdminUser(userId), activeSuspension(userId), suspensionHistory(userId), findPremiumAccount(userId).catch(() => null)]);
  const title = u.profile?.display_name || u.profile?.username || u.account?.name || u.id.slice(0, 10);
  const premiumUntil = u.profile?.premium_until ? Date.parse(u.profile.premium_until.replace(" ", "T")) : 0;
  const stamp = (v: string) => v.slice(0, 16).replace("T", " ");
  const prof = u.profile ?? {};

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
            <a href="/admin/moderation" className={BTN.secondary}>Şikâyetler</a>
          </>
        }
      />
      {u.issues.length ? (
        <Notice tone="bad" title={`${u.issues.length} sorgu başarısız, bazı bölümler eksik`}>
          <span className="text-caption">{u.issues.map((i) => i.message).join(" · ").slice(0, 300)}</span>
        </Notice>
      ) : null}
      {suspension ? <Notice tone="bad" title="Hesap askıda">{suspension.reason}</Notice> : null}
      {!u.account && !u.profile ? <Notice tone="warn">{"Bu kimlikle hesap yok (silinmiş olabilir). Silme kaydı: /admin/growth · işlem kaydı: /admin/audit"}</Notice> : null}

      {/* Özet: bu kişi kim ve ne kadar kullanıyor, tek satırda. */}
      <Panel>
        <Stats cols={6}>
          <Stat label="Katıldı" value={<span className="text-h3">{prof.created_at?.slice(0, 10) || "—"}</span>} sub={u.account?.guest ? "misafir" : u.account?.providers.join(", ") || undefined} />
          <Stat label="Son aktif gün" value={<span className="text-h3">{prof.last_active_day || "—"}</span>} sub={u.account?.lastSeen ? `oturum ${u.account.lastSeen.slice(0, 16)}` : undefined} />
          <Stat label="Kurs" value={<span className="text-h3">{prof.course ? `${prof.course.toUpperCase()} · ${prof.level || "?"}` : "—"}</span>} sub={prof.native_lang ? `anadil ${prof.native_lang}` : undefined} />
          <Stat label="Seri" value={prof.current_streak || "0"} sub={`en uzun ${prof.longest_streak || 0} gün`} />
          <Stat label="XP" value={prof.total_xp || "0"} sub={`${u.activity.xp30} son 30g`} />
          <Stat label="Aktif gün (30g)" value={u.activity.days30} sub={`${u.activity.reviews30} tekrar · ${Math.round(u.activity.seconds30 / 60)} dk`} />
        </Stats>
      </Panel>

      {/* İki sütun: solda ne YAPIYOR (öğrenme, etkinlik, olaylar), sağda
          hesabın KENDİSİ (kimlik, premium, işlemler, ayarlar). Dar ekranda
          önce sağ sütunun işlemleri değil, özet ve öğrenme geliyor. */}
      <div className="grid items-start gap-5 @5xl:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
        <div className="min-w-0 space-y-5">
          <Panel title="Öğrenme" hint="Sekme adında satır sayısı; boş sekmeler sonda.">
            <LearningTabs tabs={[
              { key: "conv", label: "Konuşma", table: u.learning.conversations },
              { key: "path", label: "Patika", table: u.learning.path },
              { key: "skills", label: "Beceri", table: u.learning.skills },
              { key: "exams", label: "Sınav", table: u.learning.exams },
              { key: "quiz", label: "Haftalık quiz", table: u.learning.quiz },
              { key: "mock", label: "Deneme", table: u.learning.mock },
              { key: "boss", label: "Boss", table: u.learning.boss },
              { key: "place", label: "Yerleştirme", table: u.learning.placements },
            ]} />
          </Panel>

          <Panel title="Kelimeler ve ödüller">
            <Stats cols={4}>
              {u.activity.wordsByState.map((w) => <Stat key={w.state} label={WORD_STATE[w.state] ?? String(w.state)} value={w.count} sub="kelime" />)}
              <Stat label="Rozet" value={u.learning.achievements} sub="toplam" />
              <Stat label="Görev ödülü" value={u.learning.quests30} sub="son 30g" />
            </Stats>
          </Panel>

          <Panel title="Yapay zekâ kullanımı (30 gün)" flush><T t={u.ai} empty="Yapay zekâ kullanımı yok." /></Panel>
          <Panel title="İstemci hataları" flush><T t={u.errors} empty="Hata yok." /></Panel>
          <Panel title="Son olaylar" hint="En yeni 60 telemetri olayı." flush><T t={u.events} empty="Olay yok." /></Panel>
        </div>

        <div className="min-w-0 space-y-5">
          <Panel title="Hesap" hint="Kimlik doğrulama tarafı (better-auth).">
            <KeyValue data={u.account ? {
              "e-posta": u.account.email, ad: u.account.name, "e-posta doğrulandı": u.account.verified, misafir: u.account.guest,
              "iki adımlı doğrulama": u.account.twoFactor, "giriş yolları": u.account.providers.join(", "),
              "açık oturum": u.account.activeSessions, "son oturum hareketi": u.account.lastSeen, oluşturuldu: u.account.createdAt,
            } : null} />
          </Panel>

          <Panel title="Premium" hint="Verilen süre bonus olarak yazılır; mağaza aboneliğine dokunulmaz. İşlem kaydına düşer.">
            {premium ? <PremiumActions account={premium} /> : <p className="muted text-caption">Premium hesabı okunamadı (hesap yok ya da silinmiş).</p>}
            <details className="mt-3">
              <summary className="muted cursor-pointer text-caption">Ham hak satırı (entitlements)</summary>
              <div className="mt-2"><KeyValue data={u.premium.entitlement} /></div>
            </details>
          </Panel>

          {u.account ? (
            <Panel title="Hesap işlemleri" hint="Dışa aktarma ve askıya alma geri alınabilir; silme kalıcıdır. İşlem kaydına düşer.">
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

          <Panel title="Sosyal">
            <KeyValue data={{
              arkadaş: u.social.friends, "bekleyen istek": u.social.pending, "okunmamış gelen kutusu": u.social.unreadInbox,
              "şikâyet ettiği": u.social.reportsBy, "engelleyen hesap": u.social.blockedBy, "engellediği": u.social.blocking,
              ...(u.social.league ? Object.fromEntries(Object.entries(u.social.league).map(([k, v]) => [`lig · ${k}`, v])) : {}),
            }} />
            {u.social.reportsAgainst.rows.length ? <div className="mt-3"><T t={u.social.reportsAgainst} /></div> : <p className="muted mt-3 text-caption">Bu hesap hakkında şikâyet yok.</p>}
          </Panel>

          <Panel title="Profil ve ayarlar"><KeyValue data={u.profile} /></Panel>

          <Panel title="Cihaz, bildirim, rıza ve kota">
            <KeyValue data={{ "web push aboneliği": u.reach.webPush }} />
            <div className="mt-3 space-y-3">
              <T t={u.reach.clients} empty="Uygulama sürümü bildirimi yok (web kullanıcısı ya da eski build)." />
              <T t={u.reach.devices} empty="Mobil cihaz jetonu yok." />
              <T t={u.reach.consents} empty="Rıza kararı yok." />
              <T t={u.reach.usage} empty="Kota sayacı yok." />
            </div>
          </Panel>
        </div>
      </div>
    </AdminPage>
  );
}
