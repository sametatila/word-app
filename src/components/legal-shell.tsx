import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { LEGAL_LOCALES, legalPath, type LegalLocale } from "@/lib/legal";
import { legalConfig } from "@/lib/legal/config";
import { legalDocument, type LegalDocId } from "@/lib/legal/documents";
import { renderLegalBody } from "@/lib/legal/markdown";

/**
 * Hukuki sayfaların ortak kabuğu (/privacy, /terms, /support).
 *
 * METİN ARTIK KODDA DEĞİL. 2026-09-09'a kadar gövdeler JSX'ti; panelden
 * düzenlenebilmeleri istenince markdown olarak `legal_documents` tablosuna
 * taşındı ve buraya `renderLegalBody` ile basılıyor. Kabuk (üst şerit, dil
 * seçici, yürürlük satırı, sürüm geçmişi) kodda kaldı: bunlar metin değil,
 * belgenin ÇERÇEVESİ ve her belgede aynı.
 *
 * Uygulama kabuğu yok — bu sayfalar oturumsuz da açılır (Play Console
 * bağlantısı, App Store Support URL, mağaza listesi).
 */

/** Çerçevenin kendi metinleri — belge gövdesi değil, kabuk. */
const CHROME: Record<LegalLocale, {
  privacy: string; terms: string; support: string; deleteAccount: string;
  effective: string; version: string; inBrief: string;
  languageLabel: string; names: Record<LegalLocale, string>;
  changelog: string; changelogNote: string;
  binding: string;
}> = {
  tr: {
    privacy: "Gizlilik politikası", terms: "Kullanım şartları", support: "Destek", deleteAccount: "Hesabını sil",
    effective: "Yürürlük", version: "Sürüm", inBrief: "Kısaca",
    changelog: "Sürüm geçmişi", changelogNote: "Bağlayıcı olan metnin kendisidir; bu liste yalnız neyin değiştiğini gösterir.",
    languageLabel: "Dil", names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    binding: "",
  },
  en: {
    privacy: "Privacy policy", terms: "Terms of use", support: "Support", deleteAccount: "Delete your account",
    effective: "Effective", version: "Version", inBrief: "In brief",
    changelog: "Version history", changelogNote: "What binds is the text itself; this list only shows what changed.",
    languageLabel: "Language", names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    binding: "This is an informational translation. The binding text is the Turkish version.",
  },
  de: {
    privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen", support: "Support", deleteAccount: "Konto löschen",
    effective: "Gültig ab", version: "Version", inBrief: "Kurz gefasst",
    changelog: "Versionsverlauf", changelogNote: "Verbindlich ist der Text selbst; diese Liste zeigt nur, was sich geändert hat.",
    languageLabel: "Sprache", names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    binding: "Dies ist eine informative Übersetzung. Verbindlich ist die türkische Fassung.",
  },
};

/**
 * Hukuki sayfaların üst şeridi: logo + belgeler arası gezinme.
 *
 * Ayrı bileşen, çünkü destek sayfası da kullanıyor ve bu şerit tam olarak
 * "başka hangi sayfalar var"ı anlatan yer — iki kopya olsaydı yeni bir belge
 * eklendiğinde biri güncellenip öteki unutulurdu.
 */
export function DocHeader({ locale = "tr" }: { locale?: LegalLocale }) {
  const c = CHROME[locale];
  return (
    <>
      <Link href="/" className="mb-8 flex items-center gap-2">
        <LogoMark size={32} />
        <span className="text-base font-bold">Lernomi</span>
      </Link>
      <nav className="muted mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <Link href={legalPath("privacy", locale)} className="underline-offset-4 hover:underline">{c.privacy}</Link>
        <Link href={legalPath("terms", locale)} className="underline-offset-4 hover:underline">{c.terms}</Link>
        <Link href={legalPath("support", locale)} className="underline-offset-4 hover:underline">{c.support}</Link>
        <Link href={legalPath("deleteAccount", locale)} className="underline-offset-4 hover:underline">{c.deleteAccount}</Link>
      </nav>
    </>
  );
}

/** Belge gövdesinin tipografisi — `.legal` sınıfı altında. */
export function LegalStyles() {
  return (
    <style>{`
      .legal h2 { font-size: 1.125rem; font-weight: 800; margin: 2rem 0 0.5rem; letter-spacing: -0.01em; }
      .legal h3 { font-size: 1rem; font-weight: 700; margin: 1.25rem 0 0.35rem; }
      .legal p, .legal li { font-size: 0.95rem; line-height: 1.65; }
      .legal p { margin: 0.5rem 0; }
      .legal ul { margin: 0.5rem 0 0.5rem 1.25rem; list-style: disc; }
      .legal li { margin: 0.25rem 0; }
      .legal table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin: 0.75rem 0 1rem; }
      .legal th, .legal td { text-align: left; vertical-align: top; padding: 0.45rem 0.5rem; border-bottom: 1px solid var(--border); }
      .legal th { font-weight: 700; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; }
      .legal .tablewrap { overflow-x: auto; }
      .legal a { text-decoration: underline; text-underline-offset: 4px; }
      .legal code { font-size: 0.85em; background: var(--surface-2); padding: 0.05em 0.35em; border-radius: 0.35rem; }
      .legal .ph { font-family: ui-monospace, monospace; font-size: 0.85em; padding: 0.05em 0.4em; border-radius: 0.35rem; background: color-mix(in srgb, var(--color-flame-400) 22%, transparent); color: var(--text); white-space: nowrap; }
      .legal .entity { margin: 0.75rem 0 1rem; }
      .legal .entity dt { font-weight: 700; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.5rem; }
      .legal .entity dd { margin: 0.1rem 0 0; font-size: 0.95rem; }
    `}</style>
  );
}

/**
 * Bir hukuki sayfanın tamamı.
 *
 * `sözleşme` ayrımı: gizlilik ve şartlar yürürlük tarihi, sürüm numarası ve
 * sürüm geçmişi taşıyor; destek sayfası taşımıyor çünkü sözleşme değil, bir
 * iletişim sayfası. Aynı kabuğu kullanmalarının sebebi görünüm birliği.
 */
export async function LegalPage({ doc, locale }: { doc: LegalDocId; locale: LegalLocale }) {
  const [cfg, page] = await Promise.all([legalConfig(), legalDocument(doc, locale)]);
  const c = CHROME[locale];
  const isContract = doc !== "support";
  const changelog = cfg.changelog.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <DocHeader locale={locale} />
      <h1 className="text-3xl font-extrabold tracking-tight">{page.title}</h1>
      {isContract ? (
        <p className="muted mt-2 text-sm">
          {c.effective}: {cfg.effectiveDate} · {c.version} {cfg.version}
        </p>
      ) : null}
      <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span>{c.languageLabel}:</span>
        {LEGAL_LOCALES.map((l) =>
          l === locale ? (
            <span key={l} className="font-semibold text-[var(--text)]">{c.names[l]}</span>
          ) : (
            <Link key={l} href={legalPath(doc, l)} hrefLang={l} className="underline-offset-4 hover:underline">
              {c.names[l]}
            </Link>
          ),
        )}
      </p>
      {isContract && c.binding ? <p className="muted mt-2 text-xs">{c.binding}</p> : null}

      {page.summary.length ? (
        <div className="card mt-6 p-5">
          <p className="text-sm font-semibold">{c.inBrief}</p>
          <ul className="muted mt-2 flex flex-col gap-1.5 text-sm leading-relaxed">
            {page.summary.map((point) => (
              <li key={point} className="flex gap-2"><span aria-hidden="true">·</span><span>{point}</span></li>
            ))}
          </ul>
        </div>
      ) : null}

      <article className="legal mt-8">
        {renderLegalBody(page.body, { cfg, locale })}
        {isContract ? (
          <>
            <h2>{c.changelog}</h2>
            <p className="muted" style={{ fontSize: "0.85rem" }}>{c.changelogNote}</p>
            {changelog.map((entry) => (
              <div key={entry.version}>
                <h3>{c.version} {entry.version} · {entry.date}</h3>
                <ul>{entry.changes[locale].map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </>
        ) : null}
      </article>
      <LegalStyles />
    </div>
  );
}

/** Sayfa üstverisi — başlık ve açıklama da panelden geliyor. */
export async function legalMetadata(doc: LegalDocId, locale: LegalLocale) {
  const page = await legalDocument(doc, locale);
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: legalPath(doc, locale),
      languages: { tr: legalPath(doc), en: legalPath(doc, "en"), de: legalPath(doc, "de") },
    },
  };
}
