"use client";

import { useState, useSyncExternalStore } from "react";
import { apiFetch } from "@/lib/api-fetch";
import type { PremiumConfig } from "@/lib/premium/gates";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, Linkify, BTN, DANGER, DataTable, Field, FIELD, FIELD_STYLE, PageHeader, Panel, TONE } from "../_ui/ui";
import { TwoStep } from "../_ui/two-step";

type CodeRow = {
  id: number;
  code: string;
  days: number;
  maxUses: number;
  uses: number;
  campaign: string | null;
  note: string | null;
  expiresAt: string | null;
  disabledAt: string | null;
  createdAt: string;
};
type Referrer = { userId: string; invited: number };
/**
 * Sunucu hata kodları → okunur cümle.
 *
 * Panel eskiden ham kodu basıyordu ("Hata: not_found"). Yönetici için de bir
 * arayüz bu: aranan hesabın bulunamaması bir çökme değil, olağan bir sonuç ve
 * öyle görünmeli.
 */
const ERROR_TR: Record<string, string> = {
  not_found: "Hesap bulunamadı — e-postayı ya da kullanıcı kimliğini kontrol et.",
  bad_input: "Eksik ya da geçersiz bilgi.",
  forbidden: "Bu hesabın yönetim yetkisi yok.",
  failed: "Sunucu isteği tamamlayamadı.",
  bad_json: "İstek okunamadı.",
};

/**
 * Premium yönetim ekranı.
 *
 * KAYDET → SUNUCU DOĞRULAR. Formdaki her sayı sunucuda `parsePremiumConfig`ten
 * geçiyor ve güvenli aralığa çekiliyor; panelde yanlışlıkla yazılan bir değer
 * ürünü ya da faturayı bozamıyor. Bu yüzden burada ağır bir istemci doğrulaması
 * yok — tek doğruluk kaynağı sunucu.
 *
 * DEĞİŞİKLİK ANINDA GEÇERLİ. Ayarlar `app_settings` tablosunda ve okuma tarafı
 * 30 saniyelik önbellek kullanıyor, yani en geç yarım dakikada üç platformda da
 * yürürlüğe giriyor. Mağaza sürümü beklemeye gerek yok.
 */
export function PremiumAdmin({
  config,
  codes,
  referrers,
}: {
  config: PremiumConfig;
  codes: CodeRow[];
  referrers: Referrer[];
}) {
  const [cfg, setCfg] = useState<PremiumConfig>(config);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function post(body: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    setBusy(true);
    setMsg("");
    try {
      const res = await apiFetch("/api/admin/premium", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        const code = String(data.error ?? res.status);
        setMsg(ERROR_TR[code] ?? adminErrorText(code));
        return null;
      }
      return data;
    } catch {
      setMsg("Ağ hatası");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    const r = await post({ action: "save_config", config: cfg });
    if (r?.config) {
      // Sunucunun DÖNDÜRDÜĞÜ yapılandırma yazılıyor, gönderdiğimiz değil:
      // sınır dışına taşan bir değer kırpılmışsa formda kırpılmış hâli görünmeli,
      // yoksa kullanıcı kaydettiğini sanıp başka bir değerle çalışır.
      setCfg(r.config as PremiumConfig);
      setMsg("Kaydedildi — en geç 30 saniyede üç platformda geçerli.");
    }
  }

  const num = (path: string[], value: number) => {
    setCfg((prev) => {
      const next = structuredClone(prev) as unknown as Record<string, Record<string, number>>;
      next[path[0]][path[1]] = value;
      return next as unknown as PremiumConfig;
    });
  };

  const bad = msg && !/^Kaydedildi|^Varsayılanlara/.test(msg);

  return (
    <AdminPage>
      <PageHeader
        title="Premium"
        description="Ücretsiz kotalar, adil kullanım tavanı, deneme sınavı paketleri, plan bilgisi ve promo kodları. Her değer canlıda geçerli, kod ya da mağaza sürümü gerekmez. Tek bir hesaba premium vermek o kullanıcının sayfasında (listeden seç: /admin/users). Gelir ve huniler: /admin/revenue"
      />

      {/* SINIRLAR — kaydet çubuğu yalnız bu grubun içinde yapışkan: form
          bitince yerine oturuyor, alttaki hesap ve kod bölümlerinin üstüne
          binmiyor (eskiden bütün sayfa boyunca kartların üstünü örtüyordu). */}
      <div className="space-y-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title="Ücretsiz katman" hint="Ücretsiz hesabın hakları. 0 yazmak “bu özellik ücretsizde hiç yok” demek — cepte yürüyüşün varsayılanı tam olarak bu." span>
            <Grid>
              <Num label="Seviye başına deneme sınavı" v={cfg.free.mockPapersPerLevel} on={(n) => num(["free", "mockPapersPerLevel"], n)} />
              <Num label="Günde cepte yürüyüş turu" v={cfg.free.pocketWalksPerDay} on={(n) => num(["free", "pocketWalksPerDay"], n)} />
              <Num label="Seri adımı (gün)" v={cfg.free.streakStep} on={(n) => num(["free", "streakStep"], n)} />
              <Num label="Kademe başına ek hak" v={cfg.free.streakBonus} on={(n) => num(["free", "streakBonus"], n)} />
              <Num label="En fazla kademe" v={cfg.free.streakMaxTiers} on={(n) => num(["free", "streakMaxTiers"], n)} />
              <Num label="Konuşma becerisi (ömürlük)" v={cfg.free.speakingSkills} on={(n) => num(["free", "speakingSkills"], n)} />
              <Num label="Yazma becerisi (ömürlük)" v={cfg.free.writingSkills} on={(n) => num(["free", "writingSkills"], n)} />
              <Num label="Haftada yenilenen AI alıştırması" v={cfg.free.weeklyAiPractice} on={(n) => num(["free", "weeklyAiPractice"], n)} />
            </Grid>
          </Panel>

          <Panel title="Premium — adil kullanım tavanı" hint={<>Bu sayılar paywall’da kullanıcıya <b>yazılıyor</b>. Tavanı olan bir şeyi “sınırsız” diye sunmak App Store 3.1.2 ve Play’in beyan kurallarına aykırı. Amaç normal kullanıcıyı durdurmak değil, tek bir hesabın bütçeyi yakmasını engellemek.</>}>
            <Grid>
              <Num label="Günde cepte yürüyüş turu" v={cfg.fairUse.pocketWalksPerDay} on={(n) => num(["fairUse", "pocketWalksPerDay"], n)} />
              <Num label="Günde AI değerlendirmesi" v={cfg.fairUse.aiPracticePerDay} on={(n) => num(["fairUse", "aiPracticePerDay"], n)} />
            </Grid>
          </Panel>

          <Panel title="Deneme sınavı paketleri">
            <Grid>
              <Num label="Paket boyu (kâğıt)" v={cfg.mock.packSize} on={(n) => num(["mock", "packSize"], n)} />
              <Num label="Sonraki paketi açan yüzde" v={cfg.mock.unlockPct} on={(n) => num(["mock", "unlockPct"], n)} />
            </Grid>
            <label className="mt-3 flex items-start gap-2 text-body">
              <input
                type="checkbox"
                checked={cfg.mock.unlockOnComplete}
                onChange={(e) => setCfg({ ...cfg, mock: { ...cfg.mock, unlockOnComplete: e.target.checked } })}
                className="mt-1"
              />
              <span>
                <b>Paketi bitirmek de açsın</b> (puan yetmese bile)
                <span className="muted block text-caption">
                  Kapatırsan yüzdeyi tutturamayan bir <b>ödeme yapmış</b> kullanıcı hiçbir yeni
                  kâğıt göremez. İadenin ve tek yıldızın en sık sebebi budur. Kapatacaksan paywall
                  metnine “puan yetmezse paket açılmaz” cümlesi eklenmeli.
                </span>
              </span>
            </label>
          </Panel>

          <Panel title="Planlar ve fiyat bilgisi" hint={<><b>Buradaki fiyatlar mağazadaki fiyatı değiştirmez.</b> Mobilde fiyat mağazadan gelir (politika gereği); bu tablo web vitrini ve mağaza kurulumunda referans. Değiştirirsen App Store Connect ve Play Console’daki tutarları da elle eşitle.</>} span>
            <Grid>
              <Txt label="Aylık ürün kimliği" v={cfg.plans.productMonthly} on={(v) => setCfg({ ...cfg, plans: { ...cfg.plans, productMonthly: v } })} />
              <Txt label="Yıllık ürün kimliği" v={cfg.plans.productYearly} on={(v) => setCfg({ ...cfg, plans: { ...cfg.plans, productYearly: v } })} />
              <Num label="Ücretsiz deneme (gün)" v={cfg.plans.trialDays} on={(n) => setCfg({ ...cfg, plans: { ...cfg.plans, trialDays: n } })} />
            </Grid>
            <div className="mt-3 flex flex-col gap-2">
              {cfg.plans.prices.map((p, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Txt label="Bölge" v={p.region} on={(v) => editPrice(i, { region: v })} />
                  <Txt label="Aylık" v={p.monthly} on={(v) => editPrice(i, { monthly: v })} />
                  <Txt label="Yıllık" v={p.yearly} on={(v) => editPrice(i, { yearly: v })} />
                  <Num label="Kazanç %" v={p.yearlySavePct} on={(n) => editPrice(i, { yearlySavePct: n })} />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="sticky bottom-3 z-10 flex flex-wrap items-center gap-3 rounded-panel border p-3" style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-soft)" }}>
          <button type="button" onClick={save} disabled={busy} className={BTN.primary}>Sınırları kaydet</button>
          <TwoStep
            label="Varsayılanlara dön"
            confirm="Evet, tüm premium ayarları sıfırlansın"
            disabled={busy}
            onConfirm={async () => {
              const r = await post({ action: "reset_config" });
              if (r?.config) {
                setCfg(r.config as PremiumConfig);
                setMsg("Varsayılanlara dönüldü.");
              }
            }}
          />
          {msg ? <span className="text-strong" role="status" style={{ color: bad ? TONE.bad : TONE.ok }}><Linkify text={msg} /></span> : null}
        </div>
      </div>

      <CodesSection codes={codes} post={post} busy={busy} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Referans (davet)">
          <p className="muted text-caption">
            Burada ayarlanacak bir şey yok. Davetin karşılığı <b>premium süresi değil</b>:
            bağ kurulunca davet edilenden davetçiye arkadaşlık isteği gidiyor, kabul
            edilince ortak seri başlıyor. Ödül olarak premium gün verilmesi
            2026-09-17&apos;de kaldırıldı — ödeyen bir davetçide o süre bakiyede bekliyor
            ve ancak aboneliği bıraktığında işe yarıyordu, yani teslim edilemeyen bir
            vaatti. Davet sayıları: <a className="underline" href="/admin/revenue">/admin/revenue</a> (Premium ve davet).
          </p>
        </Panel>

        <Panel title="Davet sıralaması" flush>
          <DataTable
            empty="Henüz davet yok."
            head={["Kullanıcı", { label: "Davet", align: "right" }]}
            rows={referrers.map((r) => [
              <a key="u" href={`/admin/users/${encodeURIComponent(r.userId)}`} className="font-mono underline-offset-2 hover:underline">{r.userId.slice(0, 12)}…</a>,
              r.invited,
            ])}
          />
        </Panel>
      </div>
    </AdminPage>
  );

  function editPrice(i: number, patch: Partial<PremiumConfig["plans"]["prices"][number]>) {
    setCfg((prev) => {
      const prices = prev.plans.prices.map((p, ix) => (ix === i ? { ...p, ...patch } : p));
      return { ...prev, plans: { ...prev.plans, prices } };
    });
  }
}

const noSubscribe = () => () => {};


/** Kod üretimi ve listesi. */
function CodesSection({
  codes,
  post,
  busy,
}: {
  codes: CodeRow[];
  post: (b: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  busy: boolean;
}) {
  const [days, setDays] = useState(90);
  const [count, setCount] = useState(10);
  const [maxUses, setMaxUses] = useState(1);
  const [campaign, setCampaign] = useState("");
  const [made, setMade] = useState<string[]>([]);
  const [rows, setRows] = useState(codes);

  /* Alan adı yalnız tarayıcıda bilinir. Doğrudan `window` okumak sunucu
     çizimiyle (boş) istemcinin ilk çizimini ayırıyordu: React #418. Sunucu
     anlık görüntüsü boş, hidrasyondan sonra gerçek değer geliyor. */
  const origin = useSyncExternalStore(noSubscribe, () => window.location.origin, () => "");

  return (
    <Panel title="Promo kodları" hint={<>Kod üç platformda da geçerli ve mağazadan bağımsız. Dağıtım bağlantısı: <code>{origin}/premium?code=KOD</code> — bağlantıya tıklayan kullanıcıda kod alanı dolu gelir.</>}>
      <Grid>
        <Num label="Kaç gün premium" v={days} on={setDays} />
        <Num label="Kaç kod üretilsin" v={count} on={setCount} />
        <Num label="Kod başına kullanım" v={maxUses} on={setMaxUses} />
        <Txt label="Kampanya adı" v={campaign} on={setCampaign} />
      </Grid>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          const r = await post({ action: "create_codes", days, count, maxUses, campaign });
          if (r?.codes) {
            const list = r.codes as string[];
            setMade(list);
            setRows((prev) => [
              ...list.map((code, i) => ({
                id: -1 - i,
                code,
                days,
                maxUses,
                uses: 0,
                campaign: campaign || null,
                note: null,
                expiresAt: null,
                disabledAt: null,
                createdAt: new Date().toISOString(),
              })),
              ...prev,
            ]);
          }
        }}
        className={`${BTN.primary} mt-3`}
      >
        Kod üret
      </button>

      {made.length > 0 && (
        <div className="mt-3 rounded-tile p-3" style={{ background: "var(--surface-2)" }}>
          <p className="mb-2 text-caption">Üretilen kodlar — bu listeyi şimdi kopyala.</p>
          <textarea
            readOnly
            aria-label="Üretilen kodlar"
            rows={Math.min(10, made.length + 1)}
            className="w-full rounded-tile p-2 font-mono text-caption"
            style={{ background: "var(--surface)" }}
            value={made.map((c) => `${c}\t${origin}/premium?code=${c}`).join("\n")}
          />
        </div>
      )}

      <div className="mt-4">
        <DataTable
          empty="Henüz kod yok."
          head={["Kod", { label: "Gün", align: "right" }, { label: "Kullanım", align: "right" }, "Kampanya", "Durum", ""]}
          rows={rows.slice(0, 100).map((c) => [
            <span key="c" className="font-mono">{c.code}</span>,
            c.days,
            `${c.uses}/${c.maxUses}`,
            <span key="k" className="muted">{c.campaign ?? "—"}</span>,
            c.disabledAt ? <span key="d" style={{ color: TONE.bad }}>kapalı</span> : <span key="d" style={{ color: TONE.ok }}>açık</span>,
            c.id > 0 ? (
              <button
                key="b"
                type="button"
                disabled={busy}
                onClick={async () => {
                  const next = !c.disabledAt;
                  const r = await post({ action: "toggle_code", id: c.id, disabled: next });
                  if (r?.ok) {
                    setRows((prev) =>
                      prev.map((x) => (x.id === c.id ? { ...x, disabledAt: next ? new Date().toISOString() : null } : x)),
                    );
                  }
                }}
                className={BTN.small}
                style={c.disabledAt ? undefined : DANGER}
              >
                {c.disabledAt ? "Aç" : "Kapat"}
              </button>
            ) : "",
          ])}
        />
      </div>
    </Panel>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-3">{children}</div>;
}

function Num({ label, v, on }: { label: string; v: number; on: (n: number) => void }) {
  return (
    <Field label={label}>
      <input aria-label={label} type="number" value={v} onChange={(e) => on(Number(e.target.value))} className={`${FIELD} tabular-nums`} style={FIELD_STYLE} />
    </Field>
  );
}

function Txt({ label, v, on }: { label: string; v: string; on: (s: string) => void }) {
  return (
    <Field label={label}>
      <input aria-label={label} type="text" value={v} onChange={(e) => on(e.target.value)} className={FIELD} style={FIELD_STYLE} />
    </Field>
  );
}
