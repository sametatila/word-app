"use client";

import { AvatarOverlay } from "@/components/avatar-parts";
import { useAvatar } from "@/lib/avatar";
import { parseAvatar, type AvatarConfig } from "@/lib/avatar-config";

/**
 * Öğrenci arması.
 *
 * Sıralamada insanlar adlarının BAŞ HARFLERİYLE görünüyordu: gri bir daire
 * içinde "SA". Yedi kişilik bir tabloda bile kimin kim olduğu ancak okunarak
 * anlaşılıyordu ve tablo bir liste gibi değil, bir tablo gibi duruyordu.
 *
 * Arma bunu iki şekilde çözüyor:
 *
 *   - **Tanınırlık.** Renk okumaktan hızlıdır. Aynı kişi her ekranda aynı
 *     armayla göründüğü için tablo taranarak değil, bakılarak okunuyor.
 *   - **Kimlik.** Uygulamanın avatar yükleme yeri yok ve olmasını da
 *     istemiyoruz (dosya yükleme, depolama, moderasyon — hepsi bu ölçekte
 *     gereksiz). Armanın tamamı kullanıcı kimliğinden TÜRETİLİYOR: sıfır
 *     depolama, sıfır ayar, herkes farklı.
 *
 * Renkler rastgele değil, sabit bir paletten seçiliyor. Serbest hue kullanmak
 * koyu temada okunmayan ya da uygulamanın markasıyla kavga eden tonlar
 * üretiyordu; palet hem tutarlı hem de her zaman beyaz metinle okunur.
 */

/** Kimlikten sayı: aynı kimlik her zaman aynı armayı verir. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Arma paleti — çiftler gradyanın iki ucu.
 *
 * Ham hex, CSS değişkeni değil: arma bir KİMLİK. Aynı kişi açık ve koyu temada
 * aynı renkte görünmeli, yoksa listede tanıdığın kişiyi renginden bulamazsın.
 *
 * İki kısıt var. Her uç beyaz metinle okunmalı — hepsi rampanın 600 ve daha
 * koyu basamaklarından, en düşüğü 5.0 kontrast. Ve on iki çift birbirinden
 * ayrılmalı: altı ailenin her biri önce kendi içinde koyulaşan bir çift veriyor,
 * sonra farklı ailelerden altı çapraz çift.
 */
const PALETTE: [string, string][] = [
  ["#a65c15", "#653916"], // kehribar → kestane
  ["#16748a", "#115a6b"], // turkuaz → derin turkuaz
  ["#237a4c", "#1a5c39"], // yosun → koyu yosun
  ["#b62e43", "#8e2335"], // kiremit → koyu kiremit
  ["#77439d", "#5d347a"], // erik → koyu erik
  ["#86690e", "#6a530b"], // hardal → koyu hardal
  ["#a65c15", "#8e2335"], // kehribar → kiremit
  ["#16748a", "#5d347a"], // turkuaz → erik
  ["#237a4c", "#115a6b"], // yosun → turkuaz
  ["#b62e43", "#5d347a"], // kiremit → erik
  ["#86690e", "#854a15"], // hardal → kestane
  ["#77439d", "#1a5c39"], // erik → yosun
];

/**
 * Arka plan deseni — aynı renk çiftine düşen iki kişi bile aynı görünmesin.
 * Desenler kasten çok sade: armanın işi süslemek değil ayırt etmek.
 */
const PATTERNS = ["none", "rays", "dots", "stripe", "arc"] as const;

export function initials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  const out = parts.map((p) => [...p][0]?.toLocaleUpperCase("tr-TR") ?? "").join("");
  return out || "?";
}

export function Avatar({
  userId,
  name,
  avatar,
  size = 32,
  /** Kazanılmış bir unvanın halkası — yoksa arma çıplak görünür. */
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  /**
   * Kişinin KENDİ avatarı (ham JSON, bkz. lib/avatar-config). Doluysa arma
   * yerine maskot çiziliyor.
   *
   * Avatar eskiden yalnız cihazda duruyordu, yani başkalarınınkini kimse
   * göremiyordu ve herkes bu dosyadaki türetilmiş armayla çiziliyordu. Artık
   * sunucuda: seçmiş olan kendi avatarıyla, seçmemiş olan eski armasıyla
   * görünüyor. Arma SİLİNMEDİ çünkü hâlâ gerçek bir yedek.
   */
  avatar?: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  const cfg = parseAvatar(avatar);
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} className={className} />;
  const h = hash(userId || name || "?");
  const [from, to] = PALETTE[h % PALETTE.length];
  const pattern = PATTERNS[(h >>> 8) % PATTERNS.length];
  const rotate = (h >>> 16) % 360;
  const text = initials(name);
  // Uzun baş harfler küçük armada taşıyor; ölçü armanın kendisinden geliyor.
  const fontSize = Math.round(size * (text.length > 1 ? 0.36 : 0.44));

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(${rotate}deg, ${from}, ${to})`,
        boxShadow: ring ? `0 0 0 2px var(--bg), 0 0 0 4px ${ring}` : undefined,
      }}
      aria-hidden
    >
      {pattern === "rays" ? (
        <span
          className="absolute inset-0"
          style={{
            background: `repeating-conic-gradient(from ${rotate}deg, rgba(255,255,255,0.16) 0deg 18deg, transparent 18deg 36deg)`,
          }}
        />
      ) : pattern === "dots" ? (
        <span
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)",
            backgroundSize: `${Math.max(4, size / 5)}px ${Math.max(4, size / 5)}px`,
          }}
        />
      ) : pattern === "stripe" ? (
        <span
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(${rotate + 45}deg, rgba(255,255,255,0.18) 0 3px, transparent 3px 9px)`,
          }}
        />
      ) : pattern === "arc" ? (
        <span
          className="absolute -bottom-1/3 left-1/2 h-full w-[140%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "rgba(255,255,255,0.18)" }}
        />
      ) : null}

      <span
        className="relative font-black leading-none text-white"
        style={{ fontSize, textShadow: "0 1px 2px rgba(0,0,0,0.28)" }}
      >
        {text}
      </span>
    </span>
  );
}

/**
 * Maskot avatarı — Erdi tabanı + aksesuar katmanları.
 *
 * TEK çizim yeri: hem başkalarının avatarı (`Avatar`), hem kendi avatarın
 * (`MyAvatar`), hem düzenleme ekranının önizlemesi buradan geçiyor. Üç ayrı
 * kopya vardı ve biri değişince ötekiler geride kalıyordu.
 *
 * Taban görsel iki platformda AYNI dosya (`public/logo-mark.png` =
 * `M/src/assets/avatar-base.png`, aynı md5).
 */
export function MascotAvatar({
  config,
  size = 44,
  ring,
  className = "",
}: {
  config: AvatarConfig;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size, background: "#FA7C13", ...(ring ? { boxShadow: `0 0 0 2px ${ring}` } : {}) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={size} height={size} className="block h-full w-full object-cover" />
      <AvatarOverlay config={config} size={size} />
    </span>
  );
}

/**
 * KENDİ avatarın — başlıkta ve profilde.
 *
 * `Avatar`dan tek farkı kaynağı: sunucudan gelen alan yerine REAKTİF yerel
 * depo okunuyor, böylece düzenleme ekranından çıkar çıkmaz başlıktaki kopya
 * da değişiyor (sayfa tazelemeden). Çizim aynı: seçim varsa maskot, yoksa
 * arma.
 *
 * Ayrı bir "ben" çizimi VARDI ve maskotu koşulsuz çiziyordu: hiç avatar
 * seçmemiş biri başlıkta çıplak maskot, kendi arkadaş listesinde arma olarak
 * görünüyordu — aynı kişi, aynı ekranda, iki kimlik.
 */
export function MyAvatar({
  userId,
  name,
  size = 44,
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  const cfg = useAvatar();
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} className={className} />;
  return <Avatar userId={userId} name={name} size={size} ring={ring} className={className} />;
}
