"use client";

import { useState } from "react";
import type { PremiumConfig } from "@/lib/premium/gates";

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
type Referrer = { userId: string; invited: number; rewarded: number };

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
      const res = await fetch("/api/admin/premium", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        setMsg(`Hata: ${String(data.error ?? res.status)}`);
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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-extrabold">Premium yönetimi</h1>
      <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
        Buradaki her değer canlıda geçerli. Kod değişikliği ya da mağaza sürümü gerekmez.
      </p>

      <Card title="Ücretsiz katman">
        <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
          Ücretsiz hesabın hakları. 0 yazmak “bu özellik ücretsizde hiç yok” demek — cepte
          yürüyüşün varsayılanı tam olarak bu.
        </p>
        <Grid>
          <Num label="Seviye başına deneme sınavı" v={cfg.free.mockPapersPerLevel} on={(n) => num(["free", "mockPapersPerLevel"], n)} />
          <Num label="Haftada haftalık sınav" v={cfg.free.weeklyExams} on={(n) => num(["free", "weeklyExams"], n)} />
          <Num label="Günde cepte yürüyüş turu" v={cfg.free.pocketWalksPerDay} on={(n) => num(["free", "pocketWalksPerDay"], n)} />
          <Num label="Seviye başına konuşma dersi" v={cfg.free.speakingLessonsPerLevel} on={(n) => num(["free", "speakingLessonsPerLevel"], n)} />
          <Num label="Seviye başına yazma dersi" v={cfg.free.writingLessonsPerLevel} on={(n) => num(["free", "writingLessonsPerLevel"], n)} />
          <Num label="Konuşma becerisi (ömürlük)" v={cfg.free.speakingSkills} on={(n) => num(["free", "speakingSkills"], n)} />
          <Num label="Yazma becerisi (ömürlük)" v={cfg.free.writingSkills} on={(n) => num(["free", "writingSkills"], n)} />
          <Num label="Haftada yenilenen AI alıştırması" v={cfg.free.weeklyAiPractice} on={(n) => num(["free", "weeklyAiPractice"], n)} />
        </Grid>
      </Card>

      <Card title="Premium — adil kullanım tavanı">
        <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
          Bu sayılar paywall’da kullanıcıya <b>yazılıyor</b>. Tavanı olan bir şeyi “sınırsız”
          diye sunmak App Store 3.1.2 ve Play’in beyan kurallarına aykırı. Amaç normal
          kullanıcıyı durdurmak değil, tek bir hesabın bütçeyi yakmasını engellemek.
        </p>
        <Grid>
          <Num label="Günde cepte yürüyüş turu" v={cfg.fairUse.pocketWalksPerDay} on={(n) => num(["fairUse", "pocketWalksPerDay"], n)} />
          <Num label="Günde AI değerlendirmesi" v={cfg.fairUse.aiPracticePerDay} on={(n) => num(["fairUse", "aiPracticePerDay"], n)} />
        </Grid>
      </Card>

      <Card title="Deneme sınavı paketleri">
        <Grid>
          <Num label="Paket boyu (kâğıt)" v={cfg.mock.packSize} on={(n) => num(["mock", "packSize"], n)} />
          <Num label="Sonraki paketi açan yüzde" v={cfg.mock.unlockPct} on={(n) => num(["mock", "unlockPct"], n)} />
        </Grid>
        <label className="mt-3 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={cfg.mock.unlockOnComplete}
            onChange={(e) => setCfg({ ...cfg, mock: { ...cfg.mock, unlockOnComplete: e.target.checked } })}
            className="mt-1"
          />
          <span>
            <b>Paketi bitirmek de açsın</b> (puan yetmese bile)
            <span className="block text-xs" style={{ color: "var(--text-muted)" }}>
              Kapatırsan yüzdeyi tutturamayan bir <b>ödeme yapmış</b> kullanıcı hiçbir yeni
              kâğıt göremez. İadenin ve tek yıldızın en sık sebebi budur. Kapatacaksan paywall
              metnine “puan yetmezse paket açılmaz” cümlesi eklenmeli.
            </span>
          </span>
        </label>
      </Card>

      <Card title="Referans (davet)">
        <Grid>
          <Num label="Ödül (gün)" v={cfg.referral.rewardDays} on={(n) => num(["referral", "rewardDays"], n)} />
          <Num label="Kişi başı en fazla ödül (0 = sınırsız)" v={cfg.referral.maxRewards} on={(n) => num(["referral", "maxRewards"], n)} />
        </Grid>
        <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          Ödül davet edilenin <b>ilk ödemesinde</b> düşer; ücretsiz deneme ödül üretmez.
          Ödüller bakiyede birikir ve üst üste eklenir.
        </p>
      </Card>

      <Card title="Planlar ve fiyat bilgisi">
        <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
          <b>Buradaki fiyatlar mağazadaki fiyatı değiştirmez.</b> Mobilde fiyat mağazadan
          gelir (politika gereği); bu tablo web vitrini ve mağaza kurulumunda referans.
          Değiştirirsen App Store Connect ve Play Console’daki tutarları da elle eşitle.
        </p>
        <Grid>
          <Txt label="Aylık ürün kimliği" v={cfg.plans.productMonthly} on={(v) => setCfg({ ...cfg, plans: { ...cfg.plans, productMonthly: v } })} />
          <Txt label="Yıllık ürün kimliği" v={cfg.plans.productYearly} on={(v) => setCfg({ ...cfg, plans: { ...cfg.plans, productYearly: v } })} />
          <Num label="Ücretsiz deneme (gün)" v={cfg.plans.trialDays} on={(n) => setCfg({ ...cfg, plans: { ...cfg.plans, trialDays: n } })} />
        </Grid>
        <div className="mt-3 flex flex-col gap-2">
          {cfg.plans.prices.map((p, i) => (
            <div key={i} className="flex flex-wrap items-end gap-2">
              <Txt label="Bölge" v={p.region} w="6rem" on={(v) => editPrice(i, { region: v })} />
              <Txt label="Aylık" v={p.monthly} w="9rem" on={(v) => editPrice(i, { monthly: v })} />
              <Txt label="Yıllık" v={p.yearly} w="9rem" on={(v) => editPrice(i, { yearly: v })} />
              <Num label="Kazanç %" v={p.yearlySavePct} w="6rem" on={(n) => editPrice(i, { yearlySavePct: n })} />
            </div>
          ))}
        </div>
      </Card>

      <div className="sticky bottom-4 mt-6 flex items-center gap-3 rounded-2xl border p-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <button type="button" onClick={save} disabled={busy} className="rounded-xl px-5 py-2.5 text-sm font-bold on-fill disabled:opacity-60" style={{ background: "var(--color-brand)" }}>
          Kaydet
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            if (!confirm("Tüm premium ayarları kod varsayılanlarına dönecek. Emin misin?")) return;
            const r = await post({ action: "reset_config" });
            if (r?.config) {
              setCfg(r.config as PremiumConfig);
              setMsg("Varsayılanlara dönüldü.");
            }
          }}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold"
          style={{ background: "var(--surface-2)" }}
        >
          Varsayılanlara dön
        </button>
        {msg && <span className="text-sm font-semibold">{msg}</span>}
      </div>

      <CodesSection codes={codes} post={post} busy={busy} />

      <Card title="Davet sıralaması">
        {referrers.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Henüz davet yok.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ color: "var(--text-muted)" }}>
                <th className="py-1">Kullanıcı</th>
                <th className="py-1">Davet</th>
                <th className="py-1">Ödüllenen</th>
              </tr>
            </thead>
            <tbody>
              {referrers.map((r) => (
                <tr key={r.userId} className="border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="py-1 font-mono text-xs">{r.userId.slice(0, 12)}…</td>
                  <td className="py-1">{r.invited}</td>
                  <td className="py-1">{r.rewarded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );

  function editPrice(i: number, patch: Partial<PremiumConfig["plans"]["prices"][number]>) {
    setCfg((prev) => {
      const prices = prev.plans.prices.map((p, ix) => (ix === i ? { ...p, ...patch } : p));
      return { ...prev, plans: { ...prev.plans, prices } };
    });
  }
}

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

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <Card title="Promo kodları">
      <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
        Kod üç platformda da geçerli ve mağazadan bağımsız. Dağıtım bağlantısı:{" "}
        <code>{origin}/premium?code=KOD</code> — bağlantıya tıklayan kullanıcıda kod alanı
        dolu gelir.
      </p>
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
        className="mt-3 rounded-xl px-4 py-2 text-sm font-bold on-fill disabled:opacity-60"
        style={{ background: "var(--color-brand)" }}
      >
        Kod üret
      </button>

      {made.length > 0 && (
        <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
          <p className="mb-2 text-xs font-bold">Üretilen kodlar — bu listeyi şimdi kopyala.</p>
          <textarea
            readOnly
            rows={Math.min(10, made.length + 1)}
            className="w-full rounded-lg p-2 font-mono text-xs"
            style={{ background: "var(--surface)" }}
            value={made.map((c) => `${c}\t${origin}/premium?code=${c}`).join("\n")}
          />
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left" style={{ color: "var(--text-muted)" }}>
              <th className="py-1">Kod</th>
              <th className="py-1">Gün</th>
              <th className="py-1">Kullanım</th>
              <th className="py-1">Kampanya</th>
              <th className="py-1"></th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 100).map((c) => (
              <tr key={`${c.id}-${c.code}`} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-1 font-mono">{c.code}</td>
                <td className="py-1">{c.days}</td>
                <td className="py-1">
                  {c.uses}/{c.maxUses}
                </td>
                <td className="py-1 text-xs" style={{ color: "var(--text-muted)" }}>{c.campaign ?? "—"}</td>
                <td className="py-1 text-right">
                  {c.id > 0 && (
                    <button
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
                      className="rounded-lg px-2 py-1 text-xs font-semibold"
                      style={{ background: "var(--surface-2)" }}
                    >
                      {c.disabledAt ? "Aç" : "Kapat"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h2 className="mb-2 text-base font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

function Num({ label, v, on, w = "12rem" }: { label: string; v: number; on: (n: number) => void; w?: string }) {
  return (
    <label className="flex flex-col gap-1 text-xs" style={{ width: w }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <input
        type="number"
        value={v}
        onChange={(e) => on(Number(e.target.value))}
        className="rounded-lg border px-2 py-1.5 text-sm"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
      />
    </label>
  );
}

function Txt({ label, v, on, w = "12rem" }: { label: string; v: string; on: (s: string) => void; w?: string }) {
  return (
    <label className="flex flex-col gap-1 text-xs" style={{ width: w }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <input
        type="text"
        value={v}
        onChange={(e) => on(e.target.value)}
        className="rounded-lg border px-2 py-1.5 text-sm"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
      />
    </label>
  );
}
