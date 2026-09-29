"use client";

import { AvatarOverlay, HAT_COLORS } from "@/components/avatar-parts";
import { useAvatar } from "@/lib/avatar";
import { avatarBg, parseAvatar, type AvatarConfig } from "@/lib/avatar-config";
import { avatarImageUrl, avatarLayers, catalogBlink, catalogGlance, catalogSize, circleFrame, idleScript, stageFrame, type AvatarCatalog, type IdleStep } from "@/lib/avatar-layers";
import { useAvatarCatalog } from "@/lib/avatar-catalog-client";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { T } from "@/lib/motion";
import { useStill } from "@/lib/use-still";

/**
 * Bir kişinin avatarı — iki platformda tek kural: HERKES maskotla çizilir.
 *
 * Eskiden avatar seçmemiş kişi kimliğinden türeyen baş harfli, renkli bir
 * armayla çiziliyordu. Avatar sunucuya taşındıktan sonra listeler iki ayrı
 * dil konuşmaya başladı: seçmiş iki kişi Nomi, geri kalan herkes (canlıda 23
 * profilin 21'i) eski arma. Arkadaşlar, Bul sekmesi ve sıralama baştan sona
 * eski görünüyordu.
 *
 * Arma kalktı, AYIRT EDİCİLİĞİ kalmadı değil: seçmemiş kişinin aksesuarları
 * kimliğinden türetiliyor (`derivedAvatar`). Aynı kişi her ekranda ve iki
 * platformda aynı şapkayla görünüyor, tabloda da kimse kimseyle aynı değil.
 * Kişi kendi avatarını seçince o geçer.
 */

/** Kimlikten sayı: aynı kimlik her zaman aynı avatarı verir (mobil `hash` ile aynı). */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Türetilen avatarda YALNIZ HERKESE AÇIK parçalar çıkıyor (iki platformda aynı
 * liste). Kazanılmamış bir aksesuarı rastgele dağıtmak, kazananın emeğini
 * değersizleştirirdi; kilit tablosu yalnız sunucuda (`lib/avatar-unlocks`),
 * istemci onu bilmiyor. Taç eskiden bu havuzdaydı, artık lig birinciliğiyle
 * açılıyor.
 */
const FREE_HATS = ["beanie", "cap"];
const FREE_GLASSES = ["round", "square"];
const FREE_MUSTACHES = ["curl", "thick"];

/**
 * Avatar seçmemiş kişinin kimliğinden türeyen maskot.
 *
 * Herkese şapka (3 × 6 renk = 18 görünüm); üçte birine gözlük, dörtte birine
 * bıyık — hepsi aynı olsaydı yedi kişilik tabloda yine kimse kimseyi
 * ayırt edemezdi. Bitler birbirine binmesin diye her seçim hash'in ayrı bir
 * diliminden okunuyor. Mobil `derivedAvatar` ile BİREBİR.
 */
export function derivedAvatar(seed: string): AvatarConfig {
  const h = hash(seed || "?");
  return {
    hat: FREE_HATS[h % FREE_HATS.length],
    hatColor: HAT_COLORS[(h >>> 4) % HAT_COLORS.length],
    glasses: (h >>> 8) % 3 === 0 ? FREE_GLASSES[(h >>> 10) % FREE_GLASSES.length] : null,
    mustache: (h >>> 12) % 4 === 0 ? FREE_MUSTACHES[(h >>> 14) % FREE_MUSTACHES.length] : null,
    bg: null,
    extra: {},
    fur: null,
    expression: null,
  };
}

export function Avatar({
  userId,
  name,
  avatar,
  size = 32,
  /** Kazanılmış bir unvanın halkası. */
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  /** Kişinin KENDİ avatarı (ham JSON, bkz. lib/avatar-config). Boşsa türetilmiş maskot. */
  avatar?: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  const cfg = parseAvatar(avatar) ?? derivedAvatar(userId || name || "?");
  return <MascotAvatar config={cfg} size={size} ring={ring} className={className} />;
}

/**
 * Maskot avatarı — Nomi tabanı + aksesuar katmanları.
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
  const catalog = useAvatarCatalog();
  /* 3B KATALOG AÇIKSA katmanlar: arka plan, Nomi tabanı, yuvalar. Tuvalin
     yalnız yüzü içeren karesi (`circleFrame`, katalogdan) daireyi dolduruyor;
     profil sahnesi tuvalin tamamını çiziyor. */
  if (catalog) {
    const L = avatarLayers(config, catalog.cat);
    /* KÜÇÜK BOY TEK GÖRSEL: listelerde kişi başına bir istek (sunucuda
       birleşiyor, bkz. `avatarImageUrl`). Çift yoğunluklu ekran için 2×. */
    if (size <= 96) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarImageUrl(catalog.base, L, size * 2)}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className={`block shrink-0 rounded-full ${className}`}
          style={{ width: size, height: size, background: "#FA7C13", ...(ring ? { boxShadow: `0 0 0 2px ${ring}` } : {}) }}
        />
      );
    }
    const fr = circleFrame(catalog.cat);
    return (
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}
        style={{ width: size, height: size, background: "#FA7C13", ...(ring ? { boxShadow: `0 0 0 2px ${ring}` } : {}) }}
      >
        <span className="absolute block" style={{ left: `${fr.left}%`, top: `${fr.top}%`, width: `${fr.w}%`, height: `${fr.h}%` }}>
          {[L.bg, L.base, ...L.layers].filter((f): f is string => !!f).map((f) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={f} src={`${catalog.base}/${f}`} alt="" className="absolute inset-0 h-full w-full" />
          ))}
        </span>
      </span>
    );
  }
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size, background: "#FA7C13", ...(ring ? { boxShadow: `0 0 0 2px ${ring}` } : {}) }}
    >
      {/* Büyük boyda aynı çizimin 512 px'liği: 128'lik taban profil üst
          alanında bulanıklaşıyordu. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={size > 72 ? "/icon-512.png" : "/logo-mark.png"} alt="" width={size} height={size} className="block h-full w-full object-cover" />
      <AvatarOverlay config={config} size={size} />
    </span>
  );
}

/**
 * PROFİL SAHNESİ — büyük avatar, arka planıyla (2026-09-28, taslak F2).
 *
 * 3B katalog açıkken kullanıcının arka plan görseli ve göğüsten yukarı Nomi
 * (katmanlar kare, alttan hizalı). Kapalıyken arka planın düz geçişi ve
 * ortada büyük 2B avatar dairesi. `children` üst alanın düğmeleri (geri,
 * ayarlar, koleksiyon etiketi). Mobil `AvatarStage` ile aynı düzen.
 */
/**
 * Sahnedeki figürün küçük sıçraması (1 → 1,06 → 1, `T.short`): düzenleyicide
 * parça seçilince "giydin" hissi. `bump` her seçimde artan bir sayaç; 0 iken
 * hareket yok. "Hareketi azalt"ta hiç başlamıyor. Mobil karşılığı
 * `AvatarScreen` sahnesi.
 */
function useBump(bump: number) {
  const controls = useAnimationControls();
  const still = useStill();
  useEffect(() => {
    if (!bump || still) return;
    void controls.start({ scale: [1, 1.06, 1], transition: T.short });
  }, [bump, still, controls]);
  return controls;
}

/**
 * Rastgele bekleme senaryosunu oynatır (`idleScript`, mobil `useIdle` aynı
 * işlevi oynatıyor). Sekme gizliyken ve "hareketi azalt"ta durur.
 */
function useIdleActions(enabled: boolean, glances: string[]) {
  const [st, setSt] = useState<{ eyes: string | null; tilt: number; bob: number }>({ eyes: null, tilt: 0, bob: 0 });
  const key = glances.join(",");
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const play = (steps: IdleStep[]) => {
      for (const s of steps) {
        timers.push(setTimeout(() => {
          if (!alive) return;
          setSt((p) => ({ eyes: s.eyes !== undefined ? s.eyes : p.eyes, tilt: s.tilt ?? p.tilt, bob: s.bob ?? p.bob }));
        }, s.t));
      }
    };
    const loop = () => {
      if (!alive) return;
      const { steps, ms } = idleScript(Math.random, key ? key.split(",") : []);
      if (typeof document === "undefined" || !document.hidden) play(steps);
      timers.push(setTimeout(loop, ms));
    };
    timers.push(setTimeout(loop, 1400));
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      setSt({ eyes: null, tilt: 0, bob: 0 });
    };
  }, [enabled, key]);
  return st;
}

/**
 * Nomi'nin tuvali (profil sahnesi, düzenleyici): taban, göz kareleri ve
 * yuvalar, BEKLEME HAREKETİYLE (v3, 2026-09-29): sürekli nefes (CSS
 * `.nomi-breathe`) ve rastgele hafif hareketler (`idleScript`): göz kırpma,
 * sağa/sola bakma, başı eğip bakma, eğilme, küçük sekme. Eğilme ve sekme
 * yumuşak geçişli; göz kareleri (kırpma: `kirpma`, bakış: `bakis`) yalnız
 * gözlerin kutusu kadar, tabanın hemen üstünde, aksesuarların altında.
 * "Hareketi azalt"ta hiçbiri yok.
 */
function NomiFigure({ cat, base, files }: { cat: AvatarCatalog; base: string; files: { base: string; layers: string[] } }) {
  const still = useStill();
  const blink = catalogBlink(cat);
  const glance = catalogGlance(cat);
  const idle = useIdleActions(!still, glance ? Object.keys(glance.frames) : []);
  const eyeImgs: { name: string; file: string; box: { left: number; top: number; w: number; h: number } }[] = [
    ...(blink ? blink.frames.slice(0, 2).map((f, i) => ({ name: `kirp${i + 1}`, file: f, box: blink })) : []),
    ...(glance ? Object.entries(glance.frames).map(([name, f]) => ({ name, file: f, box: glance })) : []),
  ];
  return (
    <div
      className="absolute inset-0"
      style={{
        transformOrigin: "50% 100%",
        transform: `translateY(${idle.bob}px) rotate(${idle.tilt}deg)`,
        transition: `transform ${idle.bob ? 180 : 650}ms cubic-bezier(.45,.05,.35,1)`,
      }}
    >
      <div className="nomi-breathe absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base}/${files.base}`} alt="" className="absolute inset-0 h-full w-full" />
        {eyeImgs.map((e) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={e.name} src={`${base}/${e.file}`} alt="" className="absolute" style={{ left: `${e.box.left}%`, top: `${e.box.top}%`, width: `${e.box.w}%`, height: `${e.box.h}%`, opacity: idle.eyes === e.name ? 1 : 0 }} />
        ))}
        {files.layers.map((f) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f} src={`${base}/${f}`} alt="" className="absolute inset-0 h-full w-full" />
        ))}
      </div>
    </div>
  );
}

/**
 * Öğenin genişliği (px); ölçülene kadar 0. Geri çağrılı ref: öğe sonradan
 * doğuyor (katalog yüklenince), sabit ref ile gözlemci hiç bağlanmıyordu.
 */
function useWidth<T extends HTMLElement>() {
  const [el, setEl] = useState<T | null>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!el) return;
    setW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, w] as const;
}

export function AvatarStage({ config, height = 280, inset = 0, children, className = "", bump = 0 }: { config: AvatarConfig; height?: number; /** Altta sahnenin üstüne binen içeriğin payı (px): tuval o kadar yukarıda, kesik alt kenarı içeriğin arkasında kalır. */ inset?: number; children?: ReactNode; className?: string; /** Artınca figür sıçrar (bkz. `useBump`). */ bump?: number }) {
  const catalog = useAvatarCatalog();
  const controls = useBump(bump);
  const [ref, stageW] = useWidth<HTMLDivElement>();
  const g = avatarBg(config.bg);
  if (catalog) {
    const L = avatarLayers(config, catalog.cat);
    const { w, h } = catalogSize(catalog.cat);
    /* v3: burun görünen alanın dikey ortasında, en uzun parça sığacak ölçekte
       (`stageFrame`). Arka plan sahneyi ortadan kaplıyor: ışığı burunda. */
    const fr = stageFrame(catalog.cat, stageW, height - inset, [L.base, ...L.layers]);
    if (catalog.cat.burun) {
      return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ height, background: L.bg ? `center / cover url(${catalog.base}/${L.bg})` : `linear-gradient(${g.from}, ${g.to})` }}>
          {fr ? (
            /* Parça değişince kadraj yumuşakça yaklaşır/uzaklaşır (balon takılınca geri çekilir). */
            <div className="absolute" style={{ left: fr.left, top: fr.top, width: fr.w, height: fr.h, transition: "left .35s ease, top .35s ease, width .35s ease, height .35s ease" }}>
              <motion.div animate={controls} className="absolute inset-0" style={{ transformOrigin: `${(catalog.cat.burun[0] / w) * 100}% ${(catalog.cat.burun[1] / h) * 100}%` }}>
                <NomiFigure cat={catalog.cat} base={catalog.base} files={L} />
              </motion.div>
            </div>
          ) : null}
          {children}
        </div>
      );
    }
    /* TUVAL ALANIN GENİŞLİĞİNDE, alta hizalı; geniş ekranda yüksekliğe
       sığdırılıyor (hiçbir parça kesilmesin: kanat, balon). Arka plan tüm
       sahneyi kaplıyor, alttan hizalı ki ışığı başın arkasında kalsın. Alt
       kenar binen içeriğin (`inset`) biraz altında: kesik göğüs orada
       görünmez, sallanırken de çizgi açılmaz. */
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ height, background: L.bg ? `center bottom / cover url(${catalog.base}/${L.bg})` : `linear-gradient(${g.from}, ${g.to})` }}>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: Math.max(0, inset - 6) - height * 0.015, width: `min(100%, ${Math.round(((height - Math.max(0, inset - 6)) * w) / h)}px)`, aspectRatio: `${w} / ${h}` }}>
          <motion.div animate={controls} className="absolute inset-0 origin-bottom">
            <NomiFigure cat={catalog.cat} base={catalog.base} files={L} />
          </motion.div>
        </div>
        {children}
      </div>
    );
  }
  const d = Math.round(height * 0.56);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height, background: `linear-gradient(${g.from}, ${g.to})` }}>
      <span aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-[50%]" style={{ bottom: height * 0.14, width: d * 0.9, height: 22, background: "radial-gradient(closest-side, rgba(0,0,0,.28), transparent)" }} />
      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: height * 0.17 }}>
        <motion.div animate={controls} className="rounded-full" style={{ boxShadow: "0 0 0 5px rgba(255,255,255,.85), 0 14px 30px rgba(0,0,0,.18)" }}>
          <MascotAvatar config={config} size={d} />
        </motion.div>
      </div>
      {children}
    </div>
  );
}

/**
 * KENDİ avatarın — başlıkta ve profilde.
 *
 * `Avatar`dan tek farkı kaynağı: sunucudan gelen alan yerine REAKTİF yerel
 * depo okunuyor, böylece düzenleme ekranından çıkar çıkmaz başlıktaki kopya
 * da değişiyor (sayfa tazelemeden). Çizim aynı: seçim varsa o, yoksa
 * kimlikten türeyen maskot.
 *
 * Ayrı bir "ben" çizimi VARDI ve maskotu koşulsuz çiziyordu: hiç avatar
 * seçmemiş biri başlıkta çıplak maskot, kendi arkadaş listesinde arma olarak
 * görünüyordu — aynı kişi, aynı ekranda, iki kimlik.
 */
export function MyAvatar({
  userId,
  name,
  serverAvatar = null,
  size = 44,
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  /**
   * Sunucudan gelen avatar (düzenin okuduğu profil). İLK BOYAMA bununla
   * çiziliyor: yerel depo yalnız tarayıcıda okunabildiği için sunucu
   * çiziminde boş, ve tek başına bırakılsaydı her sayfa açılışında önce arma
   * görünüp sonra maskota atlardı.
   */
  serverAvatar?: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  const cfg = useAvatar() ?? parseAvatar(serverAvatar);
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} className={className} />;
  return <Avatar userId={userId} name={name} size={size} ring={ring} className={className} />;
}
