import type { SVGProps } from "react";

/**
 * Uygulamanın ikon seti — emoji yerine tek çizgi kalınlığında, 24×24 ızgarada
 * tasarlanmış SVG'ler. Renk `currentColor`'dan gelir, boyut `size` ile ayarlanır.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Seri (streak) — alev */
export const FlameIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3c.6 2.2.1 3.6-1.3 4.9C9 9.4 8 10.7 8 12.8a4 4 0 0 0 8 0c0-1.4-.5-2.5-1.4-3.5" />
    <path d="M12 21a3 3 0 0 1-3-3c0-1.4 1-2.3 1.6-3.1.5.9 1.4 1.3 1.4 2.3.9-.4 1.4-1.2 1.4-2.3.7.8 1.6 1.7 1.6 3.1a3 3 0 0 1-3 3z" />
  </Svg>
);

/** XP — parıltı */
export const SparkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9z" />
    <path d="M18.5 3.5v3M20 5h-3" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </Svg>
);

export const XIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

/** Telaffuz */
export const SpeakerIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 9.5h3L11.5 6v12L7 14.5H4z" />
    <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10" />
  </Svg>
);

/**
 * Mikrofon — öğrencinin KONUŞTUĞU yerler.
 *
 * Hoparlörden ayrı duruyor ve ayrım kasıtlı: hoparlör "sana bir şey
 * okunacak", mikrofon "senden bir şey bekleniyor" demek. Aynı simgeyi ikisi
 * için de kullanmak, konuşma düğmesini dinleme düğmesi sanmaya yol açıyordu.
 */
export const MicIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M8.5 21h7" />
  </Svg>
);

export const SunIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </Svg>
);

export const MoonIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2z" />
  </Svg>
);

/** Öğren sekmesi — üst üste kartlar */
export const CardsIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="6.5" width="12" height="13" rx="2.5" />
    <path d="M8 4.5h9.5A2.5 2.5 0 0 1 20 7v10" />
  </Svg>
);

/** Kelimeler sekmesi — liste */
export const ListIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 6.5h11M9 12h11M9 17.5h11" />
    <circle cx="4.5" cy="6.5" r="1.3" />
    <circle cx="4.5" cy="12" r="1.3" />
    <circle cx="4.5" cy="17.5" r="1.3" />
  </Svg>
);

/** Beceriler sekmesi — pusula */
export const CompassIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15.5 8.5 13.6 13.6 8.5 15.5 10.4 10.4z" />
  </Svg>
);

/** Okuma becerisi — açık kitap */
export const BookOpenIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6.5C10.7 5.2 8.9 4.5 6.9 4.5H4v13h2.9c2 0 3.8.7 5.1 2 1.3-1.3 3.1-2 5.1-2H20v-13h-2.9c-2 0-3.8.7-5.1 2z" />
    <path d="M12 6.5v13" />
  </Svg>
);

/** Dinleme becerisi — kulaklık */
export const HeadphonesIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 17v-4a7.5 7.5 0 0 1 15 0v4" />
    <rect x="3.5" y="14" width="4" height="6" rx="1.6" />
    <rect x="16.5" y="14" width="4" height="6" rx="1.6" />
  </Svg>
);

/** Profil sekmesi */
export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 19.5c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8" />
  </Svg>
);

/** Eşleştirme oyunu — bağlantı halkaları */
export const LinkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5L11.5 7.5" />
    <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0L6 13a3.5 3.5 0 0 0 5 5l1.5-1.5" />
  </Svg>
);

/** Doğru anlam oyunu — hedef */
export const TargetIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.2" />
  </Svg>
);

/** Artikel oyunu — etiket */
export const TagIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 11.2V5.5a1 1 0 0 1 1-1h5.7c.3 0 .5.1.7.3l7 7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 0 1-1.4 0l-7-7a1 1 0 0 1-.3-.7z" />
    <circle cx="8.5" cy="8.5" r="1.3" />
  </Svg>
);

/** Harf bulmacası — yapboz */
export const PuzzleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 4.5h2a1.8 1.8 0 1 1 3.6 0h2A1.4 1.4 0 0 1 18.5 6v2.4a1.8 1.8 0 1 1 0 3.6v3.9c0 .8-.6 1.4-1.4 1.4h-3.4a1.8 1.8 0 1 0-3.6 0H6.7c-.8 0-1.4-.6-1.4-1.4v-3.4a1.8 1.8 0 1 1 0-3.6V6c0-.8.6-1.5 1.4-1.5z" />
  </Svg>
);

/** Cümleyi tamamla — kalem */
export const PenIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16.5 4.5 19.5 7.5 9 18l-4 1 1-4z" />
    <path d="M14.5 6.5 17.5 9.5" />
  </Svg>
);

/** Yazarak hatırla — klavye */
export const KeyboardIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
    <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M8 14h8" />
  </Svg>
);

/** Yeni kelime — kitap */
export const BookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h4.5A1.5 1.5 0 0 1 20 5.5v11a1.5 1.5 0 0 1-1.5 1.5H14a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H5.5A1.5 1.5 0 0 1 4 16.5z" />
    <path d="M12 5v14" />
  </Svg>
);

/** En uzun seri — kupa */
export const TrophyIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 4.5h8v4a4 4 0 0 1-8 0z" />
    <path d="M8 6H5.5v1a3 3 0 0 0 3 3M16 6h2.5v1a3 3 0 0 1-3 3" />
    <path d="M12 12.5V16M9 19.5h6M10 16h4l.5 3.5h-5z" />
  </Svg>
);

/** Kutlama — konfeti */
export const ConfettiIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20l4.5-11 6.5 6.5z" />
    <path d="M14.5 4.5v.01M18.5 8v.01M20 13v.01M16.5 11.5v.01M11.5 5.5v.01" />
    <path d="M14 3.5a3 3 0 0 0 3 3 3 3 0 0 0-3 3" opacity=".55" />
  </Svg>
);

/** Uyarı */
export const AlertIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.5 21 19H3z" />
    <path d="M12 10v3.5M12 16.2v.01" />
  </Svg>
);

/** Sohbet balonu */
export const ChatIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L4 20l1.2-3.3C4.15 15.5 3.5 14.06 3.5 12.5 3.5 8.9 7.1 6 12 6s8 2.9 8 6.5Z" />
  </Svg>
);

/** Bilgi */
export const InfoIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8v.01" />
  </Svg>
);

/** Geri */
export const ArrowLeftIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.5 12h-15M10.5 6 4.5 12l6 6" />
  </Svg>
);

/** Yenile */
export const RefreshIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.5 12a7.5 7.5 0 0 1-13 5M4.5 12a7.5 7.5 0 0 1 13-5" />
    <path d="M17.5 3.5V7h-3.5M6.5 20.5V17H10" />
  </Svg>
);

/**
 * Marka işareti: "W" (Wort) ve üzerinde umlaut noktaları — Almancanın görsel
 * imzası. public/ altındaki uygulama ikonlarıyla aynı çizim.
 */
export const LogoMark = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="10.5" cy="6.1" r="1.25" fill="currentColor" />
    <circle cx="13.5" cy="6.1" r="1.25" fill="currentColor" />
    <path
      d="M5.9 9.6 8.8 17.9 12 10.8 15.2 17.9 18.1 9.6"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
