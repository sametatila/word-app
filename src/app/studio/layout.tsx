import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminPreview, adminSecurityState } from "@/lib/admin";
import { studioGate } from "@/lib/studio-auth";
import { requestBadge } from "@/lib/studio-requests";
import { APP_LINKS } from "@/lib/admin-links";
import { Linkify } from "../admin/_ui/ui";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { default: "Stüdyo", template: "%s · Stüdyo" }, robots: { index: false, follow: false } };

/**
 * STÜDYO kabuğu (sosyal medya videoları). Admin panelinden AYRI bir ağaç: sosyal medya editörü (SOCIAL_EDITOR_EMAILS)
 * yalnız burayı görür, /admin ona 404 döner (`adminGate` bu listeye bakmaz). Admin buraya panelin İçerik › Sosyal
 * medya bağlantısıyla gelir. Yetkisiz istek gerçek 404 (admin kabuğuyla aynı gerekçe, TEC-12).
 */
/** public/social/fonts/fonts.css, dosya adları site köküne göre (/social/fonts/…). */
let fonts: string | null = null;
function fontCss(): string {
  fonts ??= readFileSync(path.join(process.cwd(), "public/social/fonts/fonts.css"), "utf8").replace(/url\(([\w.-]+\.woff2)\)/g, "url(/social/fonts/$1)");
  return fonts;
}

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const gate = await studioGate();
  if (!gate.ok) notFound();
  const preview = adminPreview();
  const state = preview ? null : await adminSecurityState();
  const badge = gate.role ? await requestBadge(gate.email ?? "", gate.role) : 0;
  const strip = preview
    ? { tone: "var(--color-brand)", text: "Yerel önizleme (ADMIN_PREVIEW): veri salt okunur, kaydetme ve onay reddedilir." }
    : state && !state.twoFactor
      ? { tone: "var(--color-rose)", text: `Hesabında iki adımlı doğrulama kapalı: stüdyo yalnız okuma kipinde (kaydetme ve onay kapalı). Açmak için: ${APP_LINKS.security.path}` }
      : null;
  return (
    <div data-selectable className="min-h-dvh" style={{ background: "var(--bg)" }}>
      {/* Önizleme motorunun yazı tipleri (sitenin kendi dosyaları; video üretimiyle aynı) */}
      <style>{fontCss()}</style>
      <header className="z-30 border-b sm:sticky sm:top-0" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex h-14 items-center gap-4 px-4 lg:px-5">
          <Link href="/studio" className="flex shrink-0 items-baseline gap-1.5">
            <span className="text-strong">Lernomi</span>
            <span className="muted text-caption">Stüdyo</span>
          </Link>
          <nav className="flex items-center gap-1 text-caption">
            <Link href="/studio" className="rounded-tile px-3 py-1.5 hover:bg-[var(--surface-2)]">Takvim</Link>
            <Link href="/studio/requests" className="flex items-center gap-1.5 rounded-tile px-3 py-1.5 hover:bg-[var(--surface-2)]">
              Talepler
              {badge ? <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-micro on-fill" style={{ background: "var(--color-flame)" }}>{badge}</span> : null}
            </Link>
          </nav>
          <span className="flex-1" />
          {gate.role === "admin" ? (
            <Link href="/admin" className="muted text-caption underline-offset-2 hover:underline">Yönetim paneli</Link>
          ) : null}
          {gate.email ? <span className="faint hidden truncate text-caption md:inline">{gate.email}{gate.role === "editor" ? " · editör" : ""}</span> : null}
        </div>
      </header>
      {strip ? (
        <div role="status" className="border-b px-4 py-1.5 text-center text-caption" style={{ borderColor: strip.tone, color: strip.tone, background: `color-mix(in srgb, ${strip.tone} 8%, var(--surface))` }}>
          <Linkify text={strip.text} />
        </div>
      ) : null}
      <main className="min-w-0">{children}</main>
    </div>
  );
}
