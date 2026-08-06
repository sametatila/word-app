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
/** Kilit — yol haritasında sırası gelmemiş ders. */
export const LockIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Svg>
);

/** Selamlaşma — el sallama. */
export const WaveIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.5 11.5 6 10a1.6 1.6 0 0 0-2.3 2.3l4.6 4.9A6 6 0 0 0 18 13l-1-4.6a1.5 1.5 0 0 0-2.9.6" />
    <path d="M14.1 9.4 11.9 5.6a1.5 1.5 0 0 0-2.6 1.5l2 3.5" />
    <path d="M11.3 10.6 9.5 7.5a1.5 1.5 0 0 0-2.6 1.5l1.9 3.2" />
    <path d="M18.5 4.5c1.2.4 2 1.2 2.5 2.3" />
  </Svg>
);

/** Kafe — fincan. */
export const CoffeeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 9.5h11v5.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
    <path d="M16 10.5h1.5a2.25 2.25 0 0 1 0 4.5H16" />
    <path d="M8.5 3.5c-.8 1 .8 1.7 0 2.7M12 3.5c-.8 1 .8 1.7 0 2.7" />
  </Svg>
);

/** Sağlık — steteskop. */
export const StethoscopeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 4v4.5a4 4 0 0 0 8 0V4" />
    <path d="M10 12.5v3a4.5 4.5 0 0 0 9 0v-1.6" />
    <circle cx="19" cy="11.5" r="2" />
  </Svg>
);

/** Tatil — plaj şemsiyesi. */
export const UmbrellaIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 10.5a8 8 0 0 1 15 0z" />
    <path d="M12 4.5v-1M12 10.5 14 20M6.5 20h9" />
  </Svg>
);

/** İş — evrak çantası. */
export const BriefcaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="8" width="16" height="11" rx="2" />
    <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M4 12.5h16" />
  </Svg>
);

/** Ev — daire. */
export const HomeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 11 12 4.5 19.5 11" />
    <path d="M6.5 9.5V19h11V9.5" />
    <path d="M10 19v-4.5h4V19" />
  </Svg>
);

/** Alışveriş — sepet. */
export const CartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5h2l2.2 10.5h9.3L20 8H7" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="16.5" cy="19" r="1.4" />
  </Svg>
);

/** Ulaşım — otobüs. */
export const BusIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="4.5" width="14" height="12.5" rx="2.5" />
    <path d="M5 11h14M8 20v-2.5M16 20v-2.5" />
    <path d="M8.5 14.5h.01M15.5 14.5h.01" />
  </Svg>
);

/** Aile — iki kişi. */
export const FamilyIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M4 19a5 5 0 0 1 10 0" />
    <circle cx="16.5" cy="9.5" r="2.3" />
    <path d="M14.5 14.6a4.2 4.2 0 0 1 6 3.9" />
  </Svg>
);

/** Telefon. */
export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 4.5 9.5 7 8 9.5a10 10 0 0 0 6.5 6.5L17 14.5l2.5 2.5c-1 2-3 2.8-5.2 2A15 15 0 0 1 5 9.7c-.8-2.2 0-4.2 2-5.2z" />
  </Svg>
);

/** Okul — mezuniyet kepi. */
export const SchoolIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 9.5 12 5.5l8.5 4-8.5 4z" />
    <path d="M7 11.6V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3.4" />
    <path d="M20.5 9.5V14" />
  </Svg>
);

/** Yemek — tabak ve çatal. */
export const FoodIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="13.5" cy="12" r="6" />
    <circle cx="13.5" cy="12" r="2.7" />
    <path d="M4.5 4.5V10M4.5 20v-8M3 4.5v3.2a1.5 1.5 0 0 0 3 0V4.5" />
  </Svg>
);

/** Hava durumu — güneşli bulut. */
export const WeatherIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 17.5h8.5a3.5 3.5 0 0 0 .6-6.95 5 5 0 0 0-9.7 1.15A3 3 0 0 0 8 17.5z" />
    <path d="M17.5 6.5a3 3 0 0 1 2.5-1M19.5 9a3 3 0 0 1 1.7.9" />
  </Svg>
);

/** Para — banknot. */
export const MoneyIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="7" width="17" height="10" rx="2" />
    <circle cx="12" cy="12" r="2.4" />
    <path d="M6.5 10h.01M17.5 14h.01" />
  </Svg>
);

/** Takvim. */
export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="5.5" width="15" height="14" rx="2" />
    <path d="M4.5 10h15M9 3.5v4M15 3.5v4" />
  </Svg>
);

/** Spor — top. */
export const SportIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a12 12 0 0 1 0 16M4.6 9a12 12 0 0 0 14.8 0M4.6 15a12 12 0 0 1 14.8 0" />
  </Svg>
);

/** Doğa — yaprak. */
export const NatureIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 5c.5 7.5-3 13-9 13-3 0-5-2-5-4.5C5 9 10.5 5.5 19 5z" />
    <path d="M5.5 19.5C9 15 12.5 12 16 10" />
  </Svg>
);

/** Şehir — binalar. */
export const CityIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 19.5V8l5-2v13.5M9 19.5h11V11l-6-1.8V19.5" />
    <path d="M6.5 10.5h.01M6.5 13.5h.01M16.5 13h.01M16.5 16h.01M20 19.5H4" />
  </Svg>
);

/** Medya — televizyon/haber. */
export const MediaIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="6.5" width="16" height="11" rx="2" />
    <path d="M10 10v4l3.5-2z" />
    <path d="M9 20.5h6" />
  </Svg>
);

/** Duygular — kalp. */
export const HeartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19.5C7 15.8 4.5 13 4.5 9.9A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7.5 1.9c0 3.1-2.5 5.9-7.5 9.6z" />
  </Svg>
);

/** Kültür — dünya. */
export const GlobeIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16" />
  </Svg>
);

/** Tamirat — İngiliz anahtarı. */
export const WrenchIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.5 6.5a4 4 0 0 1 5-1l-3 3 .8 2.2 2.2.8 3-3a4 4 0 0 1-6 4.5l-7 7a2 2 0 0 1-2.8-2.8l7-7a4 4 0 0 1 .8-3.7z" transform="scale(0.86) translate(1.8 1.8)" />
  </Svg>
);

/** Resmî işler — belge ve damga. */
export const OfficeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3.5h7l3.5 3.5v13.5H7z" />
    <path d="M14 3.5V7h3.5M9.5 11h5M9.5 14h5M9.5 17h3" />
  </Svg>
);

/** Müzik — nota. */
export const MusicIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 17.5V6l9-1.8v11.3" />
    <circle cx="7" cy="17.5" r="2.5" />
    <circle cx="16" cy="15.5" r="2.5" />
  </Svg>
);

/** Posta — zarf. */
export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </Svg>
);

/** Kutlama — kadeh. */
export const PartyIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 4.5h8c0 4.5-1.6 7.5-4 7.5s-4-3-4-7.5z" />
    <path d="M12 12v6.5M8.5 20h7M17.5 5.5l2-1M18.5 9h2" />
  </Svg>
);

/** Teknoloji — dizüstü. */
export const TechIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5.5" y="5.5" width="13" height="9" rx="1.5" />
    <path d="M3.5 18.5h17l-1.5-3h-14z" />
  </Svg>
);

/** Saat. */
export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

/** Yatak — uyku ve rutin. */
export const BedIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 18.5v-8M3.5 14.5h17v4M3.5 16.5h17" />
    <path d="M6 11.5a2 2 0 0 1 4 0M10 12.5h8a2.5 2.5 0 0 1 2.5 2" />
  </Svg>
);

/** Araba. */
export const CarIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 15.5 6.3 10a2 2 0 0 1 2-1.5h7.4a2 2 0 0 1 2 1.5L19 15.5" />
    <rect x="4" y="13.5" width="16" height="4.5" rx="1.5" />
    <path d="M7.5 18v1.5M16.5 18v1.5M7 15.8h.01M17 15.8h.01" />
  </Svg>
);

/** Tren. */
export const TrainIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6" y="4" width="12" height="13" rx="3" />
    <path d="M6 11h12M9.5 14.5h.01M14.5 14.5h.01M8 20l1.5-3M16 20l-1.5-3" />
  </Svg>
);

/** Uçak. */
export const PlaneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.5 13.5 4 11l1.5-1.5 6 .5 4-4.5c.8-.8 2-.8 2.5-.3s.5 1.7-.3 2.5l-4.5 4 .5 6L12 19l-2.5-6.5z" />
  </Svg>
);

/** Harita. */
export const MapIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6.5 9 4.5l6 2 5-2v13l-5 2-6-2-5 2z" />
    <path d="M9 4.5v13M15 6.5v13" />
  </Svg>
);

/** Fotoğraf makinesi. */
export const CameraIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="7.5" width="16" height="11" rx="2" />
    <path d="M9 7.5 10.5 5h3L15 7.5" />
    <circle cx="12" cy="13" r="3" />
  </Svg>
);

/** Hediye. */
export const GiftIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="9" width="15" height="10" rx="1.5" />
    <path d="M12 9v10M4.5 12.5h15" />
    <path d="M12 9c-1.5-.5-4-1-4-3a1.8 1.8 0 0 1 3.5-.5c.4.9.5 2.3.5 3.5zm0 0c1.5-.5 4-1 4-3a1.8 1.8 0 0 0-3.5-.5c-.4.9-.5 2.3-.5 3.5z" />
  </Svg>
);

/** Pasta — kutlama. */
export const CakeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19.5v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6z" />
    <path d="M5 15c1.5 1.5 3 .2 4.5 0s3 1.5 5 0 3-.2 4.5 0M12 11.5V9" />
    <path d="M12 6.5c-.8-.8-.8-2 0-2.8.8.8.8 2 0 2.8z" />
  </Svg>
);

/** Yüzük — düğün. */
export const RingIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="14" r="5.5" />
    <path d="m12 8.5-2.5-3h5zM9.5 5.5h5" />
  </Svg>
);

/** Bebek. */
export const BabyIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="4.5" />
    <path d="M12 4.5c.3-1 1-1.5 2-1.5" />
    <path d="M6 19.5a6 6 0 0 1 12 0" />
  </Svg>
);

/** Köpek — evcil hayvan. */
export const DogIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 8.5 6 5.5c2 0 3.4.4 4.3 1.5h3.4c.9-1.1 2.3-1.5 4.3-1.5l-2 3" />
    <path d="M8 8.5a4.8 4.8 0 0 0-1 3v3.5a4.5 4.5 0 0 0 9 0V11.5a4.8 4.8 0 0 0-1-3" />
    <path d="M10.5 12h.01M13.5 12h.01M12 14.5v1.5M10.8 16.4c.4.4 2 .4 2.4 0" />
  </Svg>
);

/** Çiçek. */
export const FlowerIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="2" />
    <path d="M12 6.5c-1-2.5 3-3.5 2.6-1M14 8.5c2.6-.6 2.6 3.4 0 2M12 10.5c1 2.5-3 3.5-2.6 1M10 8.5c-2.6.6-2.6-3.4 0-2" />
    <path d="M12 12.5v7M12 16c-2 0-3.5-1-4-3M12 17.5c2 0 3.5-1 4-3" />
  </Svg>
);

/** Kar — kış. */
export const SnowIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v16M5.1 8l13.8 8M18.9 8 5.1 16" />
    <path d="m12 4-1.7 1.7M12 4l1.7 1.7M12 20l-1.7-1.7M12 20l1.7-1.7" />
  </Svg>
);

/** Yağmur. */
export const RainIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 14h8.5a3.5 3.5 0 0 0 .6-6.95 5 5 0 0 0-9.7 1.15A3 3 0 0 0 8 14z" />
    <path d="M9 17l-1 2.5M13 17l-1 2.5M17 17l-1 2.5" />
  </Svg>
);

/** Diş. */
export const ToothIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5.5c-1-.8-2.5-1.3-4-.8C6 5.4 5 7.3 5.5 9.6l2 8.4c.2 1 1.6 1 1.9 0l1.2-4.3c.4-1.3 2.4-1.3 2.8 0l1.2 4.3c.3 1 1.7 1 1.9 0l2-8.4c.5-2.3-.5-4.2-2.5-4.9-1.5-.5-3 0-4 .8z" />
  </Svg>
);

/** İlaç — hap. */
export const PillIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="9" width="17" height="6.5" rx="3.25" transform="rotate(-35 12 12)" />
    <path d="m8.5 9.5 6 4.2" transform="rotate(0)" />
  </Svg>
);

/** Koşu. */
export const RunIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="14.5" cy="5.5" r="1.8" />
    <path d="m9 20 2.5-4.5-2-2.5 3-3.5 3 2.5 3-1" />
    <path d="M12.5 9.5 9 8.5l-3 2.5M11.5 15.5 14 18l1 2.5" />
  </Svg>
);

/** Bisiklet. */
export const BikeIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6.5" cy="15.5" r="3.5" />
    <circle cx="17.5" cy="15.5" r="3.5" />
    <path d="M6.5 15.5 10 9h5.5M13 15.5 10 9M14.5 6.5h2.5l1.8 9" />
  </Svg>
);

/** Film — sinema. */
export const FilmIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="5" width="15" height="14" rx="2" />
    <path d="M8 5v14M16 5v14M4.5 9H8M4.5 15H8M16 9h3.5M16 15h3.5" />
  </Svg>
);

/** Sanat — palet. */
export const ArtIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4a8 8 0 1 0 .5 16c1.5 0 1.8-1 1.3-1.9-.6-1.1-.2-2.6 1.7-2.6H17a3.8 3.8 0 0 0 3-3.7C19.8 7 16.3 4 12 4z" />
    <path d="M8 9.5h.01M12 7.5h.01M16 9.5h.01M7.5 13.5h.01" />
  </Svg>
);

/** Hukuk — terazi. */
export const LawIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.5V19M8.5 19.5h7M5.5 7.5h13" />
    <path d="M5.5 7.5 3.5 12a2.5 2.5 0 0 0 4 0zM18.5 7.5l-2 4.5a2.5 2.5 0 0 0 4 0z" />
  </Svg>
);

/** Bayrak — bayram, kültür günleri. */
export const FlagIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 20V4.5" />
    <path d="M6 5c4-2 8 2 12 0v8c-4 2-8-2-12 0" />
  </Svg>
);

/** Bavul. */
export const SuitcaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5.5" y="7.5" width="13" height="12" rx="2" />
    <path d="M9.5 7.5V5.8A1.3 1.3 0 0 1 10.8 4.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M9.5 7.5v12M14.5 7.5v12" />
  </Svg>
);

/** Bilet. */
export const TicketIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.5h16v3a1.5 1.5 0 0 0 0 3v3H4v-3a1.5 1.5 0 0 0 0-3z" transform="rotate(-8 12 13)" />
    <path d="M14.5 7.5l1 9" transform="rotate(-8 12 13)" strokeDasharray="1.5 2" />
  </Svg>
);

/** Grafik — sunum, ekonomi. */
export const ChartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 4.5v15h15" />
    <path d="M8 15v-3M12 15V8M16 15v-5" />
  </Svg>
);

/** Fikir — ampul. */
export const IdeaIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5a5.5 5.5 0 0 1 3 10.1c-.7.5-1 1.2-1 1.9h-4c0-.7-.3-1.4-1-1.9a5.5 5.5 0 0 1 3-10.1z" />
    <path d="M10 18.5h4M10.8 21h2.4" />
  </Svg>
);

/** El sıkışma — anlaşma. */
export const HandshakeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m3 8 4-1.5L12 9l-3 3a1.4 1.4 0 0 0 2 2l3.5-3.5L21 8" />
    <path d="m12.5 14.5 2 2a1.4 1.4 0 0 1-2 2l-1-1a1.4 1.4 0 0 1-2 2l-2.3-2.3L3 13.5M21 13.5l-3.5 3.5" />
  </Svg>
);

/** Geri dönüşüm — çevre. */
export const RecycleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9.5 5.5 2.5-1.5 2.5 1.5-1.5 3.5h-2z" />
    <path d="m5.5 12 1.5 4.5H11M18.5 12 17 16.5h-4" />
    <path d="m5.5 12 2.5-4M18.5 12l-2.5-4M8 19l3-2.5M16 19l-3-2.5" />
  </Svg>
);

/** Tişört — kıyafet. */
export const ShirtIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 4.5-4.5 3 2 3.5L9 9.5V19.5h6V9.5l2.5 1.5 2-3.5-4.5-3a3 3 0 0 1-6 0z" />
  </Svg>
);

/** Ekmek — fırın. */
export const BreadIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 11a4 4 0 0 1 4-3.5h7a4 4 0 0 1 4 3.5 2.7 2.7 0 0 1-1.5 2.6v5.4h-12v-5.4A2.7 2.7 0 0 1 4.5 11z" />
    <path d="M10 11.5c-.7 1.5-.7 3 0 4.5M14 11.5c-.7 1.5-.7 3 0 4.5" />
  </Svg>
);

/** Dağ. */
export const MountainIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m3.5 18.5 6-10 3.3 5.4L15 11l5.5 7.5z" />
    <path d="m8 12.9 1.5 1.6 1.6-1.6M19 6.5h.01" />
  </Svg>
);

/** Yıldız. */
export const StarIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z" />
  </Svg>
);

/** Soru — tartışma. */
export const QuestionIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.5 9a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1.2-1.5 2.3" />
    <path d="M12 18h.01" />
    <circle cx="12" cy="12" r="9" />
  </Svg>
);

/** Anahtar. */
export const KeyIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="8.5" r="4" />
    <path d="m10.8 11.3 8.2 8.2M16 16.5l2-2M13.5 19l2-2" />
  </Svg>
);

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
