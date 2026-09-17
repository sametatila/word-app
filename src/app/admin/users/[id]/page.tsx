import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { getAdminUser, type Table } from "@/lib/admin-user";
import { activeSuspension, suspensionHistory } from "@/lib/account/suspension";
import { AccountActions } from "./account-actions";

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

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-h3">{title}</h2>
      {sub ? <p className="muted mt-1 max-w-[70ch] text-caption">{sub}</p> : null}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Grid({ data }: { data: Record<string, string | number | boolean> | null }) {
  if (!data) return <p className="muted text-caption">Kayıt yok.</p>;
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-caption sm:grid-cols-2">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 border-b py-1" style={{ borderColor: "var(--hairline)" }}>
          <dt className="muted font-mono">{k}</dt>
          <dd className="truncate text-right tabular-nums">{String(v) || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function DataTable({ t, empty = "Kayıt yok." }: { t: Table; empty?: string }) {
  if (!t.rows.length) return <p className="muted text-caption">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-caption" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="muted text-micro uppercase tracking-eyebrow">
            {t.columns.map((c) => <th key={c} className="px-2 py-1.5 text-left">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "var(--hairline)" }}>
              {r.map((v, j) => <td key={j} className="px-2 py-1.5 font-mono whitespace-nowrap tabular-nums">{v || "—"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Kullanıcı</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>
          {gate.email ? `Bu hesap (${gate.email}) yönetim yetkisine sahip değil.` : "Önce admin e-postasıyla giriş yap."}
        </p>
      </div>
    );
  }

  const { id } = await params;
  const userId = decodeURIComponent(id);
  const [u, suspension, history] = await Promise.all([getAdminUser(userId), activeSuspension(userId), suspensionHistory(userId)]);
  const title = u.profile?.display_name || u.profile?.username || u.account?.name || u.id.slice(0, 10);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6">
      <header className="flex flex-col gap-1">
        <a href="/admin" className="text-caption" style={{ color: "var(--text-muted)" }}>← Yönetim</a>
        <h1 className="text-h1">{title}</h1>
        <p className="muted font-mono text-caption">{u.id}</p>
        {u.issues.length ? (
          <p role="alert" className="text-caption" style={{ color: "var(--color-rose)" }}>
            {u.issues.length} sorgu başarısız, bazı bölümler eksik: {u.issues.map((i) => i.message).join(" · ").slice(0, 300)}
          </p>
        ) : null}
        {suspension ? (
          <p className="text-caption" style={{ color: "var(--color-rose)" }}>ASKIDA: {suspension.reason}</p>
        ) : null}
        {!u.account && !u.profile ? (
          <p className="text-caption" style={{ color: "var(--color-rose)" }}>Bu kimlikle hesap yok (silinmiş olabilir).</p>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-2">
          <a href="/admin/premium" className="chip h-8 px-3 text-caption">Premium ver/al</a>
          <a href="/admin/moderation" className="chip h-8 px-3 text-caption">Moderasyon</a>
        </div>
      </header>

      <Section title="Hesap" sub="Kimlik doğrulama tarafı (better-auth).">
        <Grid data={u.account ? {
          email: u.account.email, ad: u.account.name, "e-posta doğrulandı": u.account.verified, misafir: u.account.guest,
          "iki adımlı doğrulama": u.account.twoFactor, "giriş yolları": u.account.providers.join(", "),
          "açık oturum": u.account.activeSessions, "son oturum hareketi": u.account.lastSeen, oluşturuldu: u.account.createdAt,
        } : null} />
      </Section>

      {u.account ? (
        <Section title="Hesap işlemleri" sub="Askıya alma geri alınabilir; silme kalıcıdır.">
          <AccountActions userId={u.id} suspended={suspension ? { reason: suspension.reason, until: suspension.until } : null} />
          {history.length ? (
            <div className="mt-3">
              <DataTable
                t={{
                  columns: ["başlangıç", "gerekçe", "bitiş", "veren", "kaldırıldı", "kaldıran"],
                  rows: history.map((h) => [h.createdAt.slice(0, 16).replace("T", " "), h.reason, h.until ? h.until.slice(0, 16).replace("T", " ") : "süresiz", h.adminEmail, h.liftedAt ? h.liftedAt.slice(0, 16).replace("T", " ") : "", h.liftedBy]),
                }}
              />
            </div>
          ) : null}
        </Section>
      ) : null}

      <Section title="Uygulama sürümü" sub="Mobil uygulamanın bildirdiği son sürüm, platform başına.">
        <DataTable t={u.reach.clients} empty="Sürüm bildirimi yok (web kullanıcısı ya da eski build)." />
      </Section>

      <Section title="Profil & ayarlar">
        <Grid data={u.profile} />
      </Section>

      <Section title="Premium" sub="Hak defteri ve kim ne zaman verdi.">
        <Grid data={u.premium.entitlement} />
        <div className="mt-3"><DataTable t={u.premium.grants} empty="Elle/kodla verilmiş premium yok." /></div>
      </Section>

      <Section title="Etkinlik (30 gün)">
        <Grid data={{
          "aktif gün": u.activity.days30, tekrar: u.activity.reviews30, XP: u.activity.xp30,
          "çalışma (dk)": Math.round(u.activity.seconds30 / 60),
          ...Object.fromEntries(u.activity.wordsByState.map((w) => [`kelime · ${WORD_STATE[w.state] ?? w.state}`, w.count])),
          "rozet (toplam)": u.learning.achievements, "görev ödülü (30g)": u.learning.quests30,
        }} />
      </Section>

      <Section title="Dersler"><DataTable t={u.learning.lessons} /></Section>
      <Section title="Patika adımları"><DataTable t={u.learning.path} /></Section>
      <Section title="Beceri egzersizleri"><DataTable t={u.learning.skills} /></Section>
      <Section title="Sınavlar (seviye, modül, haftalık)"><DataTable t={u.learning.exams} /></Section>
      <Section title="Haftalık quiz"><DataTable t={u.learning.quiz} /></Section>
      <Section title="Deneme sınavları"><DataTable t={u.learning.mock} /></Section>
      <Section title="Modül sınavı (boss)"><DataTable t={u.learning.boss} /></Section>
      <Section title="Yerleştirme"><DataTable t={u.learning.placements} /></Section>

      <Section title="Sosyal">
        <Grid data={{
          arkadaş: u.social.friends, "bekleyen istek": u.social.pending, "okunmamış gelen kutusu": u.social.unreadInbox,
          "şikâyet ettiği": u.social.reportsBy, "engelleyen hesap": u.social.blockedBy, "engellediği": u.social.blocking,
          ...(u.social.league ? Object.fromEntries(Object.entries(u.social.league).map(([k, v]) => [`lig · ${k}`, v])) : {}),
        }} />
        <div className="mt-3"><DataTable t={u.social.reportsAgainst} empty="Bu hesap hakkında şikâyet yok." /></div>
      </Section>

      <Section title="Bildirim erişimi & rıza & kota">
        <Grid data={{ "web push aboneliği": u.reach.webPush }} />
        <div className="mt-3"><DataTable t={u.reach.devices} empty="Mobil cihaz jetonu yok." /></div>
        <div className="mt-3"><DataTable t={u.reach.consents} empty="Rıza kararı yok." /></div>
        <div className="mt-3"><DataTable t={u.reach.usage} empty="Kota sayacı yok." /></div>
      </Section>

      <Section title="Yapay zekâ kullanımı (30 gün)"><DataTable t={u.ai} /></Section>
      <Section title="İstemci hataları"><DataTable t={u.errors} empty="Hata yok." /></Section>
      <Section title="Son olaylar" sub="En yeni 60 telemetri olayı."><DataTable t={u.events} /></Section>
    </div>
  );
}
