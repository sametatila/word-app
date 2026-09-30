import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CSSProperties, ReactNode } from "react";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { NativeLang } from "@/lib/courses";
import { courseBadges, type Badge } from "@/lib/og/langs";
import { translate } from "@/lib/i18n/dict";
import { parseAvatar } from "@/lib/avatar-config";
import { avatarImageUrl, avatarLayers, type AvatarCatalog } from "@/lib/avatar-layers";
import { avatar3dBase } from "@/lib/avatar-items";
import { GET as avatarImage } from "@/app/api/avatar/img/route";

/**
 * PAYLAŞIM KARTI (Open Graph) — bütün önizleme görsellerinin tek çizimi.
 *
 * Kök kart, grup kampanyası (`/g/<KOD>`), davet (`/r/<KOD>`) ve açık profil
 * (`/u/<ad>`) aynı iskeleti kullanıyor: sayfa başına ayrı el işi kart, marka
 * değişince birinin geride kalması demekti (eski kök kart koyu zemin ve "L"
 * harf karosuyla kalmıştı).
 *
 * Tasarım: uygulamanın AÇIK teması (globals.css `--bg`, `--text`,
 * `--text-muted`, marka rampası), gerçek logo (`public/icon-192.png`, uygulama
 * ikonuyla aynı dosya), yazı tipi Inter (uygulama sistem yazı tipini
 * kullanıyor; sunucuda sistem yazı tipi yok, en yakın açık lisanslı eşi bu).
 *
 * Kare kırpma: WhatsApp küçük önizlemede görselin ORTASINDAN kare kesiyor.
 * Her şey ortalı ve dar bir sütunda, kenarlarda anlamlı içerik yok.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/* globals.css jetonlarının açık tema değerleri. Satori CSS değişkeni
   okumuyor, o yüzden değerler burada; değişirse ikisi birlikte. */
const C = {
  bg: "#f6f6f4", // --bg
  warm: "#fff4e9", // --color-brand-50
  surface: "#ffffff", // --surface
  border: "#e3e3df", // --border
  text: "#1b1b1d", // --text
  muted: "#66666c", // --text-muted
  brand: "#f87612", // --color-brand-500 (dolgu)
  brandDeep: "#db5f08", // --color-brand-600 (beyaz yazı taşıyan dolgu)
  brandSoft: "#ffe3c4", // --brand-soft
  onBrandSoft: "#8f3a0f", // --on-brand-soft
};

type Font = { name: string; data: Buffer; weight: 600 | 800; style: "normal" };
type Assets = { fonts: Font[]; logo: string | null };

/*
 * DOSYALAR DİSKTEN, SÜREÇ BAŞINA BİR KEZ. Kök `process.cwd()`: sunucu
 * `next start`ı checkout kökünden çalıştırıyor (avatar ucu da `public/`i
 * böyle okuyor). Okunamayan dosya kartı DÜŞÜRMEZ: yazı tipi yoksa next/og'un
 * kendi yazı tipi, logo yoksa yalnız marka adı. Bozuk önizleme, önizlemesiz
 * bağlantıdan kötü.
 */
let assets: Promise<Assets> | null = null;
function loadAssets(): Promise<Assets> {
  assets ??= (async () => {
    const root = process.cwd();
    const font = (file: string, weight: 600 | 800) =>
      readFile(path.join(root, "src", "lib", "og", "fonts", file))
        .then((data): Font => ({ name: "Inter", data, weight, style: "normal" }))
        .catch(() => null);
    const [semi, extra, logo] = await Promise.all([
      font("Inter-SemiBold.ttf", 600),
      font("Inter-ExtraBold.ttf", 800),
      readFile(path.join(root, "public", "icon-192.png"))
        .then((b) => `data:image/png;base64,${b.toString("base64")}`)
        .catch(() => null),
    ]);
    const fonts = [semi, extra].filter((f): f is Font => f !== null);
    // İkisi birden yoksa yarım küme yerine next/og'un varsayılanı.
    return { fonts: fonts.length === 2 ? fonts : [], logo };
  })();
  return assets;
}


/**
 * Avatarın PNG'si (data URI) — `/api/avatar/img`in kendisiyle çiziliyor ki
 * listelerdeki avatarla birebir aynı olsun. Uç WebP veriyor, Satori WebP
 * okumuyor: PNG'ye çevriliyor. Kayıt yoksa ya da bir adım düşerse `null`
 * (kart avatarsız çizilir).
 */
export async function avatarPng(raw: string | null | undefined): Promise<string | null> {
  const cfg = parseAvatar(raw);
  if (!cfg) return null;
  try {
    const base = avatar3dBase();
    const v = /\/avatar\/v(\d+)$/.exec(base)?.[1] ?? "1";
    const cat = JSON.parse(
      await readFile(path.join(process.cwd(), "public", "avatar", `v${v}`, "katalog.json"), "utf8"),
    ) as AvatarCatalog;
    const res = await avatarImage(new Request(avatarImageUrl(base, avatarLayers(cfg, cat), 192)));
    if (!res.ok) return null;
    const png = await sharp(Buffer.from(await res.arrayBuffer())).png().toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Satori `text-wrap: balance` biliyor; React'in stil tipi henüz bilmiyor. */
const balance = { textWrap: "balance" } as unknown as CSSProperties;

function Brand({ logo, size }: { logo: string | null; size: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: Math.round(size * 0.24) }}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} width={size} height={size} alt="" style={{ borderRadius: Math.round(size * 0.22) }} />
      ) : null}
      <div style={{ display: "flex", fontSize: Math.round(size * 0.5), fontWeight: 800, color: C.text, letterSpacing: -1 }}>
        Lernomi
      </div>
    </div>
  );
}

export type CardProps = {
  title: string;
  sub?: string | null;
  badges?: Badge[];
  /** Başlığın üstündeki görsel (avatar); varsa marka satırı küçülür. */
  visual?: ReactNode;
  /** Başlık puntosu — kısa bir ad büyük, uzun bir cümle küçük. */
  titleSize?: number;
};

/** Kartı çizer. Başlık dışındaki her şey isteğe bağlı. */
export async function ogCard({ title, sub, badges = [], visual, titleSize = 64 }: CardProps): Promise<ImageResponse> {
  const { fonts, logo } = await loadAssets();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 150px 14px",
          background: `linear-gradient(180deg, ${C.warm} 0%, ${C.bg} 62%)`,
          color: C.text,
          fontFamily: fonts.length ? "Inter" : "sans-serif",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Brand logo={logo} size={visual ? 56 : 88} />

        {visual ? <div style={{ display: "flex", marginTop: 30 }}>{visual}</div> : null}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 800,
            marginTop: visual ? 24 : 36,
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -1.8,
            wordBreak: "break-word",
            /* Dengeli kırılım yalnız birden çok satıra inebilecek başlıkta:
               Satori tek kelimelik kısa başlığı dengelerken sağa kaydırıyor. */
            ...(title.length > 24 ? balance : {}),
          }}
        >
          {/* Sayı ile birimi ayrılmasın ("2 / Monate"). */}
          {title.replace(/(\d) /g, "$1\u00a0")}
        </div>

        {/* Alt satır " · " ile ayrılmış parçalardan oluşuyor: satır parçanın
            ORTASINDAN değil, iki parça arasından kırılsın. */}
        {sub ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              columnGap: 14,
              maxWidth: 960,
              marginTop: 20,
              fontSize: 29,
              fontWeight: 600,
              lineHeight: 1.35,
              color: C.muted,
            }}
          >
            {sub.split(" · ").map((part, i, all) => (
              <div key={i} style={{ display: "flex", gap: 14, whiteSpace: all.length > 1 ? "nowrap" : "normal" }}>
                {i > 0 ? <span>·</span> : null}
                <span>{part.replace(/(\d) /g, "$1\u00a0")}</span>
              </div>
            ))}
          </div>
        ) : null}

        {badges.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 34, maxWidth: 900 }}>
            {badges.map((b) => (
              <div
                key={b.label}
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 600,
                  padding: "12px 26px",
                  borderRadius: 999,
                  background: b.tone === "brand" ? C.brandSoft : C.surface,
                  color: b.tone === "brand" ? C.onBrandSoft : C.text,
                  border: `2px solid ${b.tone === "brand" ? C.brandSoft : C.border}`,
                }}
              >
                {b.label}
              </div>
            ))}
          </div>
        ) : null}

        {/* Marka şeridi — uygulamanın birincil düğme turuncusu. */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: C.brand }} />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts,
      /*
       * Kart ziyaretçinin diline göre değişiyor (çerez / Accept-Language):
       * next/og'un varsayılanı bir yıllık `immutable`, yani ilk dilin kartı
       * paylaşılan önbellekte herkese giderdi. Bir saat + dil başlıklarına
       * göre ayrım; önizleme servisleri zaten kendi kopyalarını tutuyor.
       */
      headers: { "cache-control": "public, max-age=3600", vary: "Accept-Language, Cookie" },
    },
  );
}

/** Yuvarlak avatar, turuncu halkalı; yoksa baş harf. */
export function AvatarVisual({ src, name, size }: { src: string | null; name: string; size: number }) {
  const ring = { border: `6px solid ${C.surface}`, boxShadow: `0 0 0 4px ${C.brand}` };
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} width={size} height={size} alt="" style={{ borderRadius: size, background: C.brand, ...ring }} />;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size,
        background: C.brandDeep,
        color: C.surface,
        fontSize: Math.round(size * 0.45),
        fontWeight: 800,
        ...ring,
      }}
    >
      {(name.trim()[0] ?? "L").toLocaleUpperCase()}
    </div>
  );
}

/** Genel kart — kök ve düşülen her yol (geçersiz kod, gizli profil). */
export function genericCard(lang: NativeLang): Promise<ImageResponse> {
  return ogCard({
    title: translate(lang, "meta.tagline"),
    sub: translate(lang, "meta.og_sub"),
    badges: courseBadges(lang),
  });
}
