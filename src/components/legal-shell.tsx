import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/icons";
import { LEGAL_EFFECTIVE_DATE, LEGAL_PATHS, LEGAL_VERSION } from "@/lib/legal";

/**
 * Hukuki sayfaların ortak çerçevesi (/privacy, /terms): okunur satır genişliği,
 * yürürlük tarihi, sayfalar arası geçiş. Uygulama kabuğu yok — bu sayfalar
 * oturumsuz da açılır (Play Console bağlantısı, mağaza listesi).
 */
export function LegalShell({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <LogoMark size={32} />
        <span className="text-base font-bold">Nomi</span>
      </Link>
      <nav className="muted mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <Link href={LEGAL_PATHS.privacy} className="underline-offset-4 hover:underline">Gizlilik politikası</Link>
        <Link href={LEGAL_PATHS.terms} className="underline-offset-4 hover:underline">Kullanım şartları</Link>
        <Link href={LEGAL_PATHS.deleteAccount} className="underline-offset-4 hover:underline">Hesabını sil</Link>
      </nav>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="muted mt-2 text-sm">
        Yürürlük: {LEGAL_EFFECTIVE_DATE} · Sürüm {LEGAL_VERSION}
      </p>
      <div className="card mt-6 p-5">
        <p className="text-sm font-semibold">Kısaca</p>
        <p className="muted mt-1 text-sm leading-relaxed">{summary}</p>
      </div>
      <article className="legal mt-8">{children}</article>
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
      `}</style>
    </div>
  );
}
