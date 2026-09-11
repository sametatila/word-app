"use client";

import {
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  CompassIcon,
  FlagIcon,
  FlameIcon,
  GlobeIcon,
  GrammarIcon,
  HeadphonesIcon,
  KeyboardIcon,
  LockIcon,
  MapIcon,
  MicIcon,
  MoonIcon,
  MountainIcon,
  PenIcon,
  PuzzleIcon,
  RunIcon,
  SchoolIcon,
  SortIcon,
  SparkIcon,
  StackIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  TargetIcon,
  TranslateIcon,
  TrophyIcon,
} from "@/components/icons";

/**
 * Rozetin görsel dili.
 *
 * Kademe rengi metalden geliyor (bronz · gümüş · altın) ve en üst kademe
 * "efsane" bir metal değil: sayıca az olan şey renkçe de ayrışmalı. Kilitli
 * rozet silinmiyor, SÖNÜYOR — ne olduğu görünür kalıyor çünkü görünmeyen
 * hedef, hedef değildir.
 *
 * Efsane eskiden markanın rengiydi ve marka indigoyken üç metalden kendiliğinden
 * ayrılıyordu. Marka maskotun kehribarına taşınınca bu bozuldu: koyu temada
 * efsane ile ALTIN arasında ΔE 8.8 kalıyordu, yani iki kademe aynı görünüyordu.
 * Kural aynı kaldı, rengi değişti — efsane artık paletin metallere en uzak
 * hue'su olan erikte (altınla ΔE 63.4).
 *
 * Gümüş de değişti: #93a3b8 mavi-gri idi ve sıcak paletin içinde tek başına
 * soğuk duruyordu; aynı açıklıkta sıcak bir griye alındı.
 *
 * GÜMÜŞ VE ALTIN SONRA BİR KEZ DAHA KOYULAŞTI. Rozetin üstünde BEYAZ ikon
 * duruyor ve grafik ögesi için eşik 3.0; ölçümde gümüş 2.53, altın 2.38
 * veriyordu, yani ikon kendi zemininde eriyordu. Sıcak gri ve altın hue'su
 * korunarak açıklık düşürüldü: gümüş 3.79, altın 3.62. Bronz (4.44) ve
 * efsane (6.83) zaten geçiyordu, onlara dokunulmadı.
 *
 * Aynı dört değer mobilde de duruyor (`AchievementsScreen` `tierColor`);
 * kademe renkleri kimliğin parçası, iki platformda ayrışmamalı.
 */

export const TIER_COLOR: Record<string, string> = {
  bronze: "#a9683c",
  silver: "#8a8277",
  gold: "#aa8012",
  /* SABİT, tema duyarlı jeton DEĞİL - öteki üçü gibi.
     `var(--color-violet)` yazılıydı ve koyu temada 300'e düşüyordu: rozet dolu
     zemin + BEYAZ ikon taşıyor, ölçüm açık temada 6.83 ama koyu temada 3.24 -
     dördün en kötüsü ve grafik eşiğinin (3.0) hemen üstünde. Üstelik bu tablo
     kendi yorumunda "kimlik" diyor ve kimlik temayla dönmez: mobil karşılığı
     (`theme/colors.ts` `TIER_COLOR`) dördünü de sabit tutuyor, yani koyu
     temada efsane rozeti iki uygulamada iki ayrı mordu. Değer açık temada
     zaten çözülen `violet-600`. */
  legend: "#77439d",
};

/**
 * Kademe adları — ANAHTAR, metin değil. Değerler Türkçe yazılıydı ve rozet
 * açılış kartı Almanca arayüzde de "Altın rozet açıldı" diyordu.
 */
export const TIER_LABEL_KEYS: Record<string, string> = {
  bronze: "tier.bronze",
  silver: "tier.silver",
  gold: "tier.gold",
  legend: "tier.legend",
};

const ICONS: Record<string, (p: { size?: number; className?: string }) => React.ReactNode> = {
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  CompassIcon,
  FlagIcon,
  FlameIcon,
  GlobeIcon,
  GrammarIcon,
  HeadphonesIcon,
  KeyboardIcon,
  MapIcon,
  MicIcon,
  MoonIcon,
  MountainIcon,
  PenIcon,
  PuzzleIcon,
  RunIcon,
  SchoolIcon,
  SortIcon,
  SparkIcon,
  StackIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  TargetIcon,
  TranslateIcon,
  TrophyIcon,
};

export type BadgeRow = {
  id: string;
  title: string;
  hint: string;
  icon: string;
  tier: string;
  target: number;
  done: number;
  unlocked: boolean;
};

/**
 * Rozetin KENDİ ikonu, adından.
 *
 * Harita modül içinde kalıyordu ve rozet duvarı (`achievement-wall`) ona
 * ulaşamadığı için her rozete `TrophyIcon` çiziyordu: sunucunun her satırda
 * gönderdiği `icon` alanı duvarda hiç kullanılmıyordu ve kırk yedi rozet
 * birbirinin aynısı görünüyordu. Kutlama kartı baştan beri doğrusunu
 * çiziyordu; artık ikisi de buradan geçiyor.
 */
export function BadgeIcon({ name, size }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? StarIcon;
  return <>{Icon({ size })}</>;
}

export function AchievementBadge({
  row,
  size = 58,
  onClick,
  selected,
}: {
  row: BadgeRow;
  size?: number;
  onClick?: () => void;
  selected?: boolean;
}) {
  const color = TIER_COLOR[row.tier] ?? "var(--color-brand)";
  const pct = row.target > 0 ? Math.min(100, Math.round((row.done / row.target) * 100)) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${row.title}${row.unlocked ? "" : ` — ${row.hint}`}`}
      className="group flex flex-col items-center gap-1 rounded-tile p-1 text-center transition-transform active:scale-95"
    >
      <span
        className="relative flex items-center justify-center rounded-tile"
        style={{
          width: size,
          height: size,
          background: row.unlocked
            ? `linear-gradient(140deg, color-mix(in srgb, ${color} 26%, transparent), color-mix(in srgb, ${color} 8%, transparent))`
            : "var(--surface-2)",
          boxShadow: row.unlocked ? `inset 0 0 0 1.5px ${color}` : "inset 0 0 0 1.5px var(--border)",
          color: row.unlocked ? color : "var(--text-muted)",
          opacity: row.unlocked ? 1 : 0.6,
          outline: selected ? `2px solid ${color}` : undefined,
          outlineOffset: 2,
        }}
      >
        {row.unlocked ? (
          <BadgeIcon name={row.icon} size={Math.round(size * 0.45)} />
        ) : (
          <>
            <BadgeIcon name={row.icon} size={Math.round(size * 0.4)} />
            <span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--text-muted)" }}
            >
              <LockIcon size={11} />
            </span>
          </>
        )}
      </span>

      {/* İki satıra izin var, kırpma yok. Tek satırda "Kelime hazinesi" →
          "Kelime hazi…" oluyordu: adı okunamayan rozet, hedef olmuyor.
          Sabit yükseklik satırların hizasını koruyor. */}
      <span
        className="flex w-full items-start justify-center text-micro leading-tight"
        style={{
          color: row.unlocked ? "var(--text)" : "var(--text-muted)",
          /*
            Yükseklik SABİT, en az değil. `minHeight` iki satırlık başlıkta
            aşılıyordu (11px × 1.25 satır aralığı × 2 = 2.5em) ve o sütunun
            ilerleme çubuğu tek satırlıkların 11 piksel altında kalıyordu —
            bir ızgarada göze ilk çarpan şey bozuk hizadır.
          */
          height: "2.5em",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {row.title}
      </span>

      {/* Kilitli rozetin altında ilerleme: "ne kadar kaldı" bilgisi olmadan
          kilit yalnızca bir duvar; varken hedefe dönüşüyor. */}
      {!row.unlocked && row.done > 0 ? (
        <span
          className="-mt-0.5 h-1 w-full overflow-hidden rounded-full"
          style={{ background: "var(--surface-2)" }}
        >
          <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </span>
      ) : null}
    </button>
  );
}
