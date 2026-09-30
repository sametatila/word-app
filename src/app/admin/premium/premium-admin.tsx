"use client";

import { useState, useSyncExternalStore } from "react";
import { apiFetch } from "@/lib/api-fetch";
import type { PremiumConfig } from "@/lib/premium/gates";
import { PROMO_CODE_DAYS } from "@/lib/premium/promo-policy";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, Linkify, BTN, DANGER, DataTable, Field, FIELD, FIELD_AREA, FIELD_STYLE, PageHeader, Panel, TONE } from "../_ui/ui";
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
/** Grup kodu (mağaza denemesi) satırı — `lib/premium/store-trial` `listStoreTrialCodes`. */
export type TrialCodeRow = {
  id: number;
  code: string;
  campaign: string | null;
  group: string | null;
  maxUses: number;
  uses: number;
  expiresAt: string | null;
  disabledAt: string | null;
  createdAt: string;
  claims: number;
  started: number;
  converted: number;
  cancelled: number;
  expired: number;
  sandbox: number;
  iosMonthly: number;
  iosYearly: number;
};
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
  trialCodes,
  iosReady,
}: {
  config: PremiumConfig;
  codes: CodeRow[];
  referrers: Referrer[];
  trialCodes: TrialCodeRow[];
  iosReady: { monthly: boolean; yearly: boolean };
}) {
  const [cfg, setCfg] = useState<PremiumConfig>(config);
  const [saved, setSaved] = useState<PremiumConfig>(config);
  const dirty = JSON.stringify(cfg) !== JSON.stringify(saved);
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
      setSaved(r.config as PremiumConfig);
      setMsg("Kaydedildi.");
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

      {/* SINIRLAR. Kaydet çubuğu ÜSTTE ve yapışkan: değişiklik varsa görünür
          biçimde söylüyor. Alttaydı ve fiyat satırlarının üstüne biniyordu. */}
      <div
        className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-panel border px-4 py-2.5 sm:top-14"
        style={{ borderColor: dirty ? "var(--color-brand)" : "var(--border)", background: "var(--surface)", boxShadow: dirty ? "var(--shadow-soft)" : undefined }}
      >
        <span className="text-caption" style={{ color: dirty ? "var(--text)" : "var(--text-muted)" }}>
          {dirty ? <b>Kaydedilmemiş değişiklik var</b> : "Sınırlar kayıtlı"}
          <span className="muted"> · kayıttan en geç 30 sn sonra üç platformda geçerli</span>
        </span>
        {msg ? <span className="text-caption text-strong" role="status" style={{ color: bad ? TONE.bad : TONE.ok }}><Linkify text={msg} /></span> : null}
        <span className="ml-auto flex flex-wrap items-center gap-2">
          {dirty ? <button type="button" onClick={() => { setCfg(saved); setMsg(""); }} disabled={busy} className={BTN.secondary}>Vazgeç</button> : null}
          <TwoStep
            label="Varsayılanlara dön"
            confirm="Evet, tüm premium ayarları sıfırlansın"
            disabled={busy}
            onConfirm={async () => {
              const r = await post({ action: "reset_config" });
              if (r?.config) {
                setCfg(r.config as PremiumConfig);
                setSaved(r.config as PremiumConfig);
                setMsg("Varsayılanlara dönüldü.");
              }
            }}
          />
          <button type="button" onClick={save} disabled={busy || !dirty} className={BTN.primary}>Sınırları kaydet</button>
        </span>
      </div>

      <Panel title="Ücretsiz katman" hint={<>Her yüzeyde <b>taban hak</b>; üstüne her dilim, açık hakların hepsi <b>bitirilince VE</b> seri eşiğe varınca açılır: izin verilen = taban + ek hak × k, k = min(⌊en uzun seri ÷ seri adımı⌋, bitirilmiş dilim). Patika ve Beceriler seviye başına, <b>ayrı sayaç</b>. 0 = ücretsizde hiç yok.</>}>
        <div className="grid gap-x-10 @4xl:grid-cols-2">
          <Settings title="Seviye başına taban hak">
            <Row label="Patika konuşma adımı" v={cfg.free.conversationsPerLevel} on={(n) => num(["free", "conversationsPerLevel"], n)} />
            <Row label="Patika yazma" v={cfg.free.pathWritingPerLevel} on={(n) => num(["free", "pathWritingPerLevel"], n)} />
            <Row label="Beceriler: konuşma" v={cfg.free.speakingSkills} on={(n) => num(["free", "speakingSkills"], n)} />
            <Row label="Beceriler: yazma" v={cfg.free.writingSkills} on={(n) => num(["free", "writingSkills"], n)} />
            <Row label="Deneme sınavı" v={cfg.free.mockExamsPerLevel} on={(n) => num(["free", "mockExamsPerLevel"], n)} />
          </Settings>
          <Settings title="Seriyle açılan ek hak">
            <Row label="Seri adımı" help="kaç günlük seri bir dilim açar" unit="gün" v={cfg.free.streakStep} on={(n) => num(["free", "streakStep"], n)} />
            <Row label="Dilim başına ek hak" help="Patika ve Beceriler" v={cfg.free.streakBonus} on={(n) => num(["free", "streakBonus"], n)} />
            <Row label="Dilim başına ek deneme sınavı" v={cfg.free.mockStreakBonus} on={(n) => num(["free", "mockStreakBonus"], n)} />
            <Row label="Kademe tavanı" help="0 = sınırsız" v={cfg.free.maxTiers} on={(n) => num(["free", "maxTiers"], n)} />
            <Row label="Günde yürüyüş turu" help="ekran açıkken" v={cfg.free.walkRoundsPerDay} on={(n) => num(["free", "walkRoundsPerDay"], n)} />
          </Settings>
        </div>
      </Panel>

      <div className="grid items-stretch gap-5 @5xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Panel title="Premium sınırları" hint={<>Paywall’da kullanıcıya <b>yazılıyor</b>: tavanı olan şeyi “sınırsız” diye sunmak App Store 3.1.2 ve Play beyan kurallarına aykırı. Amaç tek hesabın bütçeyi yakmasını engellemek. Sohbet mesajı tavanı kodda (günde 300).</>}>
          <Settings>
            <Row label="Günde yürüyüş turu" v={cfg.fairUse.walkRoundsPerDay} on={(n) => num(["fairUse", "walkRoundsPerDay"], n)} />
            <Row label="Günde yapay zekâ değerlendirmesi" v={cfg.fairUse.aiPracticePerDay} on={(n) => num(["fairUse", "aiPracticePerDay"], n)} />
            <Row label="Deneme sınavı paket boyu" help="paketin hepsi bitince sonraki açılır" v={cfg.mock.packSize} on={(n) => num(["mock", "packSize"], n)} />
          </Settings>
        </Panel>

        <Panel title="Planlar ve fiyat bilgisi" hint={<><b>Mağazadaki fiyatı değiştirmez.</b> Mobilde fiyat mağazadan gelir; bu tablo web vitrini ve mağaza kurulumu için referans. Değiştirirsen App Store Connect ve Play Console’daki tutarları da eşitle.</>}>
          <div className="grid items-end gap-3 @xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem]">
            <Txt label="Aylık ürün kimliği" v={cfg.plans.productMonthly} on={(v) => setCfg({ ...cfg, plans: { ...cfg.plans, productMonthly: v } })} />
            <Txt label="Yıllık ürün kimliği" v={cfg.plans.productYearly} on={(v) => setCfg({ ...cfg, plans: { ...cfg.plans, productYearly: v } })} />
            <Num label="Deneme (gün)" v={cfg.plans.trialDays} on={(n) => setCfg({ ...cfg, plans: { ...cfg.plans, trialDays: n } })} />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-caption">
              <thead>
                <tr className="muted text-micro uppercase tracking-eyebrow">
                  <th className="pb-1.5 pr-2 text-left font-semibold">Bölge</th>
                  <th className="pb-1.5 pr-2 text-left font-semibold">Aylık</th>
                  <th className="pb-1.5 pr-2 text-left font-semibold">Yıllık</th>
                  <th className="pb-1.5 text-left font-semibold">Yıllıkta kazanç %</th>
                </tr>
              </thead>
              <tbody>
                {cfg.plans.prices.map((p, i) => (
                  <tr key={i}>
                    <td className="py-1 pr-2"><input aria-label={`Bölge ${i + 1}`} value={p.region} onChange={(e) => editPrice(i, { region: e.target.value })} className={FIELD} style={FIELD_STYLE} /></td>
                    <td className="py-1 pr-2"><input aria-label={`${p.region} aylık`} value={p.monthly} onChange={(e) => editPrice(i, { monthly: e.target.value })} className={FIELD} style={FIELD_STYLE} /></td>
                    <td className="py-1 pr-2"><input aria-label={`${p.region} yıllık`} value={p.yearly} onChange={(e) => editPrice(i, { yearly: e.target.value })} className={FIELD} style={FIELD_STYLE} /></td>
                    <td className="py-1"><input aria-label={`${p.region} yıllıkta kazanç yüzdesi`} type="number" value={p.yearlySavePct} onChange={(e) => editPrice(i, { yearlySavePct: Number(e.target.value) })} className={`${FIELD} tabular-nums`} style={FIELD_STYLE} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <TrialCodesSection codes={trialCodes} iosReady={iosReady} post={post} busy={busy} />

      <CodesSection codes={codes} post={post} busy={busy} />

      <div className="grid items-stretch gap-5 @4xl:grid-cols-2">
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
    <Panel title="Promo kodları" hint={<>Her kod {PROMO_CODE_DAYS} gün (2 ay) Premium verir; kodlar yalnız ücretsiz dağıtılır, satılmaz (Play Ödemeler politikası). Kod üç platformda da geçerli ve mağazadan bağımsız. Dağıtım bağlantısı: <code>{origin}/premium?code=KOD</code> — bağlantıya tıklayan kullanıcıda kod alanı dolu gelir.</>}>
      <Grid>
        <Num label="Kaç kod üretilsin" v={count} on={setCount} />
        <Num label="Kod başına kullanım" v={maxUses} on={setMaxUses} />
        <Txt label="Kampanya adı" v={campaign} on={setCampaign} />
      </Grid>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          const r = await post({ action: "create_codes", count, maxUses, campaign });
          if (r?.codes) {
            const list = r.codes as string[];
            setMade(list);
            setRows((prev) => [
              ...list.map((code, i) => ({
                id: -1 - i,
                code,
                days: PROMO_CODE_DAYS,
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
            className={`${FIELD_AREA} font-mono text-caption`}
            style={{ ...FIELD_STYLE, background: "var(--surface)" }}
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

/**
 * Karşılama adresi SABİT ALAN ADIYLA: Android App Link doğrulaması yalnız
 * `www.lernomi.app`te (manifest `android:host`). Panel başka bir kökten
 * açılsa bile gruplara giden bağlantı uygulamayı açabilen adres olmalı.
 */
const GROUP_LINK_BASE = "https://www.lernomi.app/g/";

/**
 * GRUP KODLARI — "2 ay ücretsiz, sonra ücretli" kampanyası (lib/premium/store-trial).
 *
 * Kampanya bir kez adlandırılıyor, her satır bir grup ve her gruba bir kod
 * düşüyor. Kod gün VERMİYOR: kullanıcıyı mağazanın 2 aylık deneme teklifine
 * götürüyor. Huni iki platformda farklı ve tablo bunu saklamıyor: Android'de
 * talepten dönüşüme kadar her halka sayılıyor; iOS'ta kod uygulamada girilmiyor
 * (Guideline 3.1.1), yalnız webden App Store'a yönlendirme sayılabiliyor.
 */
function TrialCodesSection({
  codes,
  iosReady,
  post,
  busy,
}: {
  codes: TrialCodeRow[];
  iosReady: { monthly: boolean; yearly: boolean };
  post: (b: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  busy: boolean;
}) {
  const [campaign, setCampaign] = useState("");
  const [groups, setGroups] = useState("");
  const [prefix, setPrefix] = useState("");
  const [maxUses, setMaxUses] = useState(500);
  const [expires, setExpires] = useState("");
  const [rows, setRows] = useState(codes);
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1500);
    } catch {
      /* pano izni yoksa kullanıcı bağlantıyı elle seçebilir */
    }
  }

  const iosLine = iosReady.monthly && iosReady.yearly
    ? "iPhone yolu açık (App Store teklif kodları env'de tanımlı)."
    : "iPhone yolu KAPALI: IOS_PROMO2M_CODE_MONTHLY / _YEARLY boş, karşılama sayfası iPhone'da “yakında” diyor.";

  return (
    <Panel
      title="Grup kodları — 2 ay ücretsiz (mağaza denemesi)"
      hint={<>Her gruba ayrı kod. Kod gün vermez: Android’de uygulama Play’in <code>promo-2m</code> teklifini açar; iPhone’da webdeki sayfa Apple’ın teklif kodu sayfasına yönlendirir. Mağaza ödeme yöntemi ister, iptal edilmezse seçilen planla yenilenir. <b>Kampanya ve grup adı karşılama sayfasında herkese görünür.</b> {iosLine}</>}
    >
      <Grid>
        <Txt label="Kampanya adı" v={campaign} on={setCampaign} />
        <Txt label="Kod öneki (ör. WA)" v={prefix} on={setPrefix} />
        <Num label="Kod başına kullanım" v={maxUses} on={setMaxUses} />
        <Field label="Son kullanma (boş = süresiz)">
          <input aria-label="Son kullanma" type="date" value={expires} onChange={(e) => setExpires(e.target.value)} className={FIELD} style={FIELD_STYLE} />
        </Field>
      </Grid>
      <Field label="Gruplar — her satıra bir grup" className="mt-3">
        <textarea
          aria-label="Gruplar"
          rows={4}
          value={groups}
          onChange={(e) => setGroups(e.target.value)}
          placeholder={"WA Almanca A1\nTelegram İstanbul"}
          className={FIELD_AREA}
          style={FIELD_STYLE}
        />
      </Field>
      <button
        type="button"
        disabled={busy || !campaign.trim() || !groups.trim()}
        onClick={async () => {
          const r = await post({
            action: "create_trial_codes",
            campaign,
            groups: groups.split("\n"),
            prefix,
            maxUses,
            // Günün SONU: "30 Eylül'e kadar" diyen yönetici 30 Eylül'ü de kastediyor.
            expiresAt: expires ? new Date(`${expires}T23:59:59`).toISOString() : null,
          });
          if (r?.list) {
            setRows(r.list as TrialCodeRow[]);
            setGroups("");
          }
        }}
        className={`${BTN.primary} mt-3`}
      >
        Grup kodlarını üret
      </button>

      <div className="mt-4">
        <DataTable
          empty="Henüz grup kodu yok."
          head={[
            "Grup",
            "Kod · bağlantı",
            { label: "Kullanım", align: "right" },
            { label: "Talep", align: "right" },
            { label: "Deneme", align: "right" },
            { label: "Ücretli", align: "right" },
            { label: "İptal", align: "right" },
            { label: "iOS aylık/yıllık", align: "right" },
            "Durum",
            "",
          ]}
          rows={rows.map((c) => {
            const link = GROUP_LINK_BASE + c.code;
            return [
              <span key="g">
                {c.group ?? "—"}
                <span className="muted block text-caption">{c.campaign ?? ""}</span>
              </span>,
              <span key="c" className="flex flex-col gap-1">
                <span className="font-mono">{c.code}</span>
                <button type="button" onClick={() => void copy(link)} className={`${BTN.small} self-start`}>
                  {copied === link ? "Kopyalandı" : "Bağlantıyı kopyala"}
                </button>
              </span>,
              `${c.uses}/${c.maxUses}`,
              c.claims,
              <span key="s">
                {c.started}
                {c.sandbox > 0 ? <span className="muted block text-caption">test: {c.sandbox}</span> : null}
              </span>,
              c.converted,
              c.cancelled,
              `${c.iosMonthly}/${c.iosYearly}`,
              c.disabledAt ? <span key="d" style={{ color: TONE.bad }}>kapalı</span> : <span key="d" style={{ color: TONE.ok }}>açık</span>,
              <button
                key="b"
                type="button"
                disabled={busy}
                onClick={async () => {
                  const next = !c.disabledAt;
                  const r = await post({ action: "toggle_code", id: c.id, disabled: next });
                  if (r?.ok) {
                    setRows((prev) => prev.map((x) => (x.id === c.id ? { ...x, disabledAt: next ? new Date().toISOString() : null } : x)));
                  }
                }}
                className={BTN.small}
                style={c.disabledAt ? undefined : DANGER}
              >
                {c.disabledAt ? "Aç" : "Kapat"}
              </button>,
            ];
          })}
        />
        <p className="muted mt-2 text-caption">
          Talep → Deneme → Ücretli → İptal <b>yalnız Android</b> (uygulama içi kod). iOS sütunu
          webden App Store’a yönlendirme tıklaması: Apple webhook’ta yalnız teklifin adını
          bildirdiği için iPhone’daki deneme ve dönüşüm gruba yazılamıyor; toplamı
          /admin/revenue’da. “test” = TestFlight / Play iç test (sandbox), üst sayılara girmiyor.
        </p>
      </div>
    </Panel>
  );
}

/**
 * Form ızgarası: alanlar ALT kenardan hizalı (etiket iki satıra kırılsa da
 * giriş kutuları aynı çizgide); kartın genişliğine göre 1 / 2 / 4 sütun.
 */
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid items-end gap-3 @xl:grid-cols-2 @4xl:grid-cols-4">{children}</div>;
}

/** Ayar grubu: başlık + satırlar (ayraçlı). */
function Settings({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div>
      {title ? <div className="muted mb-1 mt-2 text-micro uppercase tracking-eyebrow">{title}</div> : null}
      <div className="divide-y" style={{ borderColor: "var(--hairline)" }}>{children}</div>
    </div>
  );
}

/**
 * Tek sayı ayarı: solda etiket (ve kısa açıklama), sağda sabit genişlikte
 * kutu. Etiketin uzunluğu kutunun yerini değiştirmiyor: bütün kutular aynı
 * sütunda (eski ızgarada iki satıra kırılan etiket kutuyu aşağı itiyordu).
 */
function Row({ label, help, unit, v, on }: { label: string; help?: string; unit?: string; v: number; on: (n: number) => void }) {
  return (
    <label className="flex items-center gap-3 py-2" style={{ borderColor: "var(--hairline)" }}>
      <span className="min-w-0 flex-1">
        <span className="block text-caption text-strong">{label}</span>
        {help ? <span className="muted block text-micro">{help}</span> : null}
      </span>
      {unit ? <span className="muted text-micro">{unit}</span> : null}
      {/* Ortak FIELD sınıfı w-full taşıyor; burada sabit genişlik isteniyor. */}
      <input aria-label={label} type="number" min={0} value={v} onChange={(e) => on(Number(e.target.value))} className="h-9 w-24 shrink-0 rounded-tile border px-3 text-right text-body tabular-nums" style={FIELD_STYLE} />
    </label>
  );
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
