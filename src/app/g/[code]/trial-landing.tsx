"use client";

import { useState } from "react";

type Valid = {
  code: string;
  group: string | null;
  showAndroid: boolean;
  showIos: boolean;
  /** Android telefonda `intent:` adresi; masaüstünde null (açılacak uygulama yok). */
  androidAppUrl: string | null;
  /** Play yayında değilse null → "yakında". */
  playUrl: string | null;
  /** App Store teklif kodları env'de tanımlı mı; değilse "iPhone için yakında". */
  iosReady: boolean;
  iosMonthlyHref: string;
  iosYearlyHref: string;
};

type Copy = {
  title: string;
  lead: string;
  termsTitle: string;
  termFree: string;
  termRenew: string;
  termCancelIos: string;
  termCancelAndroid: string;
  account: string;
  androidTitle: string;
  androidHow: string;
  androidOpen: string;
  androidPlay: string;
  androidPlaySoon: string;
  codeLabel: string;
  copy: string;
  copied: string;
  iosTitle: string;
  iosMonthly: string;
  iosYearly: string;
  iosNote: string;
  iosSoon: string;
};

/**
 * Grup kodu karşılama ekranı — `app/g/[code]/page` sunucuda karar veriyor,
 * burası yalnız çiziyor (istemci bileşeni tek sebeple: kodu panoya kopyalamak).
 *
 * SIRA: teklif → ŞARTLAR → eylem. Şartlar düğmelerin ÜSTÜNDE ve kutu içinde:
 * "2 ay ücretsiz" cümlesinin hemen ardından ödeme yöntemi, yenileme fiyatı ve
 * iptal yolu okunmadan hiçbir mağaza akışına girilmesin (Apple 3.1.2,
 * Play abonelik beyanı; ikisi de denemenin bitince ne olacağının satın
 * almadan ÖNCE açıkça gösterilmesini istiyor).
 *
 * iOS BÖLÜMÜ UYGULAMAYA DEĞİL APP STORE'A GİDER (Guideline 3.1.1): kod
 * uygulamada girilmiyor, Apple'ın teklif kodu sayfası açılıyor.
 */
export function TrialLanding({ valid, invalid, t }: { valid?: Valid; invalid?: { title: string; lead: string }; t?: Copy }) {
  if (!valid || !t) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12 text-center">
        <h1 className="text-h1 text-balance">{invalid?.title}</h1>
        <p className="muted mt-2 text-body">{invalid?.lead}</p>
      </main>
    );
  }

  const cancelLines = [valid.showIos ? t.termCancelIos : null, valid.showAndroid ? t.termCancelAndroid : null].filter(Boolean) as string[];

  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-4 py-10">
      <h1 className="text-center text-h1 text-balance">{t.title}</h1>
      <p className="muted mt-2 text-center text-body">{t.lead}</p>

      <section
        aria-labelledby="terms"
        className="mt-6 rounded-panel px-4 py-3 text-caption"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
      >
        <h2 id="terms" className="text-strong" style={{ color: "var(--text)" }}>{t.termsTitle}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>{t.termFree}</li>
          <li>{t.termRenew}</li>
          {cancelLines.map((l) => (
            <li key={l}>{l}</li>
          ))}
          <li>{t.account}</li>
        </ul>
      </section>

      {valid.showAndroid && (
        <section aria-labelledby="android" className="mt-7">
          <h2 id="android" className="text-h3">{t.androidTitle}</h2>
          <p className="muted mt-1 text-caption">{t.androidHow}</p>
          <CodeBox code={valid.code} label={t.codeLabel} copy={t.copy} copied={t.copied} />
          {valid.androidAppUrl && (
            <a
              href={valid.androidAppUrl}
              className="mt-3 block w-full rounded-panel px-5 py-3 text-center text-strong on-fill"
              style={{ background: "var(--color-brand)" }}
            >
              {t.androidOpen}
            </a>
          )}
          {valid.playUrl ? (
            <a
              href={valid.playUrl}
              className="mt-3 block w-full rounded-panel border px-5 py-3 text-center text-strong"
              style={{ borderColor: "var(--border)" }}
            >
              {t.androidPlay}
            </a>
          ) : (
            <p className="muted mt-3 text-center text-caption">{t.androidPlaySoon}</p>
          )}
        </section>
      )}

      {valid.showIos && (
        <section aria-labelledby="ios" className="mt-7">
          <h2 id="ios" className="text-h3">{t.iosTitle}</h2>
          {valid.iosReady ? (
            <>
              {/* Düz bağlantı, form değil: sunucu tıklamayı sayıp App Store'a
                  yönlendiriyor (`/g/<KOD>/ios`). Planı kullanıcı SEÇİYOR —
                  Apple'da teklif kodu plana bağlı, sonradan değiştirilemez. */}
              <a
                href={valid.iosMonthlyHref}
                className="mt-3 block w-full rounded-panel px-5 py-3 text-center text-strong on-fill"
                style={{ background: "var(--color-brand)" }}
              >
                {t.iosMonthly}
              </a>
              <a
                href={valid.iosYearlyHref}
                className="mt-3 block w-full rounded-panel border px-5 py-3 text-center text-strong"
                style={{ borderColor: "var(--border)" }}
              >
                {t.iosYearly}
              </a>
              <p className="muted mt-3 text-caption">{t.iosNote}</p>
            </>
          ) : (
            <p className="muted mt-2 text-caption">{t.iosSoon}</p>
          )}
        </section>
      )}
    </main>
  );
}

/** Kod, kopyalama düğmesiyle — uygulama kurulduktan sonra elle girilecek. */
function CodeBox({ code, label, copy, copied }: { code: string; label: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="mt-3 flex items-center gap-2 rounded-panel px-4 py-3" style={{ background: "var(--surface-2)" }}>
      <div className="min-w-0 flex-1">
        <p className="muted text-caption">{label}</p>
        <p className="font-mono text-h3 tracking-widest">{code}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          } catch {
            /* pano izni yoksa kod ekranda, elle seçilebilir */
          }
        }}
        className="rounded-panel border px-3 py-2 text-caption"
        style={{ borderColor: "var(--border)" }}
        aria-live="polite"
      >
        {done ? copied : copy}
      </button>
    </div>
  );
}
