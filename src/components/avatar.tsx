"use client";

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
 * Arma paleti — her biri beyaz metinle okunur, hepsi uygulamanın tonuyla
 * uyumlu. Çiftler gradyanın iki ucu.
 */
const PALETTE: [string, string][] = [
  ["#6366f1", "#a855f7"], // indigo → mor
  ["#0ea5e9", "#22d3ee"], // gök → turkuaz
  ["#f97316", "#f59e0b"], // turuncu → kehribar
  ["#10b981", "#84cc16"], // zümrüt → fıstık
  ["#ec4899", "#f43f5e"], // pembe → gül
  ["#8b5cf6", "#6366f1"], // menekşe → indigo
  ["#14b8a6", "#0ea5e9"], // deniz → gök
  ["#ef4444", "#f97316"], // kırmızı → turuncu
  ["#a855f7", "#ec4899"], // mor → pembe
  ["#22c55e", "#14b8a6"], // yeşil → deniz
  ["#eab308", "#f97316"], // sarı → turuncu
  ["#3b82f6", "#8b5cf6"], // mavi → menekşe
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
  size = 32,
  /** Kazanılmış bir unvanın halkası — yoksa arma çıplak görünür. */
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
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
