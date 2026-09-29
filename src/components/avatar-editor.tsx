"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AvatarStage, derivedAvatar, MascotAvatar } from "@/components/avatar";
import { useShell } from "@/components/app-shell";
import { GLASSES, HAT_COLORS, HATS, MUSTACHES } from "@/components/avatar-parts";
import { saveAvatar, useAvatar, DEFAULT_AVATAR, type AvatarConfig } from "@/lib/avatar";
import { AVATAR_BGS, AVATAR_RARITY, EXTRA_SLOTS, type ExtraSlot } from "@/lib/avatar-config";
import { useAvatarCatalog } from "@/lib/avatar-catalog-client";
import { partIcon } from "@/lib/avatar-layers";
import { CheckIcon, CloseIcon, LockedIcon, UndoIcon } from "@/components/icons";
import { useT, useLang } from "@/lib/i18n/client";
import { vibrate } from "@/lib/fx";

/**
 * AVATAR DÜZENLEYİCİ — mobil `AvatarScreen` ile aynı düzen (2026-09-28, taslak
 * F2; `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Üstte büyük sahne (profildekiyle aynı `AvatarStage`), altında yuva
 * sekmeleri, parça kartları, renklenen parçada renk satırı ve Kaydet.
 *
 * İKİ KİP. 3B katalog kapalıyken (bugün) yuvalar arka plan, şapka, gözlük,
 * bıyık; kartlar parçayı taşıyan mini 2B avatar. Katalog açılınca boyun, yüz,
 * küpe ve sırt da gelir; kartlar kataloğun ikonları, adları ve nadirlik
 * renkleriyle çizilir. Kilitli parça gizlenmez, dokununca açılış yolu yazar.
 */
type Slot = "bg" | "hat" | "glasses" | "mustache" | ExtraSlot;
const SLOT_LABEL: Record<Slot, string> = {
  bg: "avatar.slot_bg",
  hat: "avatar.hat",
  glasses: "avatar.glasses",
  mustache: "avatar.mustache",
  neck: "avatar.slot_neck",
  face: "avatar.slot_face",
  ear: "avatar.slot_ear",
  back: "avatar.slot_back",
};
const RARITY = AVATAR_RARITY;

type Tile = { key: string; label: string; selected: boolean; locked: boolean; hint?: string; rarity?: string; icon?: string; preview?: AvatarConfig; swatch?: { from: string; to: string }; apply: () => void };

export function AvatarEditor({ locked }: { locked: Record<string, string> }) {
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  const catalog = useAvatarCatalog();
  /*
    TASLAK ile KAYITLI ayrı duruyor: kayıtlı değer reaktif, taslak yalnız
    kullanıcı bir şeye dokununca doluyor ve o andan sonra kazanıyor. Hiç
    seçmemiş kişi kimliğinden türeyen maskotla başlıyor (listelerde öyle görünüyor).
  */
  const stored = useAvatar();
  const [draft, setDraft] = useState<AvatarConfig | null>(null);
  const { userId } = useShell();
  const cfg = draft ?? stored ?? derivedAvatar(userId);
  const setCfg = (patch: Partial<AvatarConfig>) => setDraft({ ...cfg, ...patch });
  const [slot, setSlot] = useState<Slot>("hat");
  const [hint, setHint] = useState<string | null>(null);
  // Parça seçilince sahnedeki figür sıçrıyor (`AvatarStage` `bump`) ve kısa
  // "tap" sesi + titreşim; renk ve yuva sekmesi gezinme, sessiz.
  const [bump, setBump] = useState(0);
  const choose = (tile: Tile) => {
    tile.apply();
    setBump((n) => n + 1);
    vibrate("tap");
  };
  const slots: Slot[] = catalog ? ["bg", "hat", "glasses", "mustache", ...EXTRA_SLOTS] : ["bg", "hat", "glasses", "mustache"];
  const only = (over: Partial<AvatarConfig>): AvatarConfig => ({ ...DEFAULT_AVATAR, hatColor: cfg.hatColor, bg: cfg.bg, ...over });
  const current = (s: Slot): string | null => (s === "bg" ? cfg.bg : s === "hat" ? cfg.hat : s === "glasses" ? cfg.glasses : s === "mustache" ? cfg.mustache : cfg.extra[s]?.id ?? null);
  const pick = (s: Slot, id: string | null, color?: string | null) => {
    if (s === "bg") return setCfg({ bg: id });
    if (s === "hat") return setCfg({ hat: id });
    if (s === "glasses") return setCfg({ glasses: id });
    if (s === "mustache") return setCfg({ mustache: id });
    const extra = { ...cfg.extra };
    if (id) extra[s] = { id, color: color ?? null };
    else delete extra[s];
    return setCfg({ extra });
  };

  let tiles: Tile[];
  if (catalog) {
    const parts = catalog.cat.parcalar.filter((p) => p.slot === slot);
    tiles = slot === "bg" ? [] : [{ key: "none", label: t("avatar.none"), selected: !current(slot), locked: false, apply: () => pick(slot, null) }];
    /* Karo, yuvanın şu anki rengini gösterir; başka parçaya geçince renk
       korunur (parça o rengi taşıyorsa). */
    const slotColor = slot === "hat" ? cfg.hatColor : slot === "bg" || slot === "glasses" || slot === "mustache" ? null : cfg.extra[slot]?.color ?? null;
    for (const p of parts) {
      const col = slot === "hat" ? cfg.hatColor : slotColor && p.renkler.includes(slotColor) ? slotColor : p.renkler[0] ?? null;
      tiles.push({
        key: p.id,
        label: p.adlar[lang] ?? p.ad,
        selected: current(slot) === p.id || (slot === "bg" && !cfg.bg && p.id === "bg_orange"),
        locked: p.id in locked,
        hint: locked[p.id],
        rarity: p.nadir,
        icon: `${catalog.base}/${partIcon(p, col)}`,
        apply: () => pick(slot, p.id, col),
      });
    }
  } else if (slot === "bg") {
    tiles = AVATAR_BGS.map((b) => ({ key: b.id, label: "", selected: (cfg.bg ?? "bg_orange") === b.id, locked: false, swatch: b, apply: () => pick("bg", b.id) }));
  } else {
    const ids = slot === "hat" ? HATS : slot === "glasses" ? GLASSES : MUSTACHES;
    tiles = [
      { key: "none", label: t(slot === "hat" ? "avatar.no_hat" : slot === "glasses" ? "avatar.no_glasses" : "avatar.no_mustache"), selected: !current(slot), locked: false, preview: only({ [slot]: null }), apply: () => pick(slot, null) },
      ...ids.map((id, i) => ({ key: id, label: `${t(SLOT_LABEL[slot])} ${i + 1}`, selected: current(slot) === id, locked: id in locked, hint: locked[id], preview: only({ [slot]: id }), apply: () => pick(slot, id) })),
    ];
  }
  /* RENK: seçili parça renkleniyorsa (şapka, boyun, sırt… kataloğun `renkler`i)
     parçanın altında renk şeridi. Şapka rengi eski alanında (`hatColor`),
     yeni yuvalarınki parçanın yanında (`extra[yuva].color`). */
  const selPart = catalog ? catalog.cat.parcalar.find((p) => p.id === current(slot)) : undefined;
  const colors: string[] = catalog ? (selPart?.renkler ?? []) : slot === "hat" && cfg.hat ? HAT_COLORS : [];
  const colorNow = slot === "hat" ? cfg.hatColor : slot !== "bg" && slot !== "glasses" && slot !== "mustache" ? cfg.extra[slot]?.color ?? colors[0] : null;
  const setColor = (col: string) => (slot === "hat" ? setCfg({ hatColor: col }) : slot !== "bg" && slot !== "glasses" && slot !== "mustache" && cfg.extra[slot] ? setCfg({ extra: { ...cfg.extra, [slot]: { ...cfg.extra[slot]!, color: col } } }) : undefined);
  const colorable = colors.length > 0 && colorNow !== null;

  function save() {
    saveAvatar(cfg);
    router.push("/profile");
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-card">
        <AvatarStage config={cfg} height={260} inset={24} bump={bump}>
          <div className="absolute inset-x-3 top-3 flex items-center">
            <button type="button" onClick={() => router.back()} aria-label={t("common.close")} className="pressable flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text)" }}>
              <CloseIcon size={20} />
            </button>
            {/* Başlık GÖRÜNMÜYOR: sahnenin üstünde hap uzun şapka ve balonların
                üstüne biniyor, giydirirken görünümü bozuyordu. Ekran okuyucu
                için yerinde (sr-only). */}
            <h1 className="sr-only">{t("avatar.your_avatar")}</h1>
            <div className="flex-1" />
            <button type="button" onClick={() => setDraft(null)} aria-label={t("avatar.reset")} className="pressable flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text)" }}>
              <UndoIcon size={20} />
            </button>
          </div>
        </AvatarStage>
      </div>

      <div className="relative -mx-4 -mt-6 rounded-t-[1.5rem] px-4 pt-4 sm:mx-0" style={{ background: "var(--bg)" }}>
        {/* YUVA SEKMELERİ */}
        <div role="tablist" aria-label={t("avatar.your_avatar")} className="no-scrollbar flex gap-1.5 overflow-x-auto pb-2">
          {slots.map((s) => (
            <button
              key={s}
              role="tab"
              type="button"
              aria-selected={s === slot}
              onClick={() => { setSlot(s); setHint(null); }}
              className="pressable shrink-0 rounded-tile px-3.5 py-2 text-strong"
              /* Yuva sekmesi küçük seçim: dolu turuncu + beyaz (2026-09-29 Samet: seçim B). */
              style={s === slot ? { background: "var(--brand-fill)", color: "var(--on-brand)" } : { background: "var(--surface-2)", color: "var(--text-muted)" }}
            >
              {t(SLOT_LABEL[s])}
            </button>
          ))}
        </div>

        {colorable ? (
          /* TEK SEÇİMLİK ŞERİT RADYO GRUBUDUR — Android aynı şeritleri
             `accessibilityRole="radio"` ile veriyor (`AvatarScreen`). */
          <div role="radiogroup" aria-label={t("avatar.color")} className="flex flex-wrap items-center gap-2 py-2">
            <span className="muted text-caption">{t("avatar.color")}</span>
            {colors.map((col) => (
              <button
                key={col}
                type="button"
                aria-label={`${t("avatar.color")} ${col}`}
                role="radio"
                aria-checked={colorNow === col}
                onClick={() => setColor(col)}
                className="pressable h-8 w-8 rounded-full"
                style={{ background: col, border: `3px solid ${colorNow === col ? "var(--text)" : "var(--bg)"}` }}
              />
            ))}
          </div>
        ) : null}

        <div role="radiogroup" aria-label={t(SLOT_LABEL[slot])} className="grid grid-cols-3 gap-2 py-2 sm:grid-cols-4">
          {tiles.map((tile) => (
            <button
              key={tile.key}
              type="button"
              role="radio"
              aria-checked={tile.selected}
              aria-label={tile.locked ? `${tile.label} — ${tile.hint ?? ""}` : tile.label || t("avatar.slot_bg")}
              onClick={tile.locked ? () => setHint(tile.hint ?? null) : () => choose(tile)}
              className="pressable relative flex flex-col items-center gap-1.5 rounded-panel p-2"
              style={{ background: "var(--surface)", border: `1px solid ${tile.selected ? "var(--color-brand-500)" : tile.rarity ? RARITY[tile.rarity] ?? "var(--border)" : "var(--border)"}` }}
            >
              <span className="flex h-16 w-16 items-center justify-center" style={{ opacity: tile.locked ? 0.35 : 1 }}>
                {tile.preview ? (
                  <MascotAvatar config={tile.preview} size={60} />
                ) : tile.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tile.icon} alt="" className="h-[60px] w-[60px] object-contain" />
                ) : tile.swatch ? (
                  <span className="block h-14 w-14 rounded-full" style={{ background: tile.swatch.to, border: `6px solid ${tile.swatch.from}` }} />
                ) : (
                  <span className="block h-11 w-11 rounded-full" style={{ border: "1.5px dashed var(--border)" }} />
                )}
              </span>
              {tile.label ? <span className="muted w-full truncate text-micro">{tile.label}</span> : null}
              {tile.locked ? (
                <span aria-hidden className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "var(--surface-2)" }}>
                  <LockedIcon size={12} />
                </span>
              ) : tile.selected ? (
                <span aria-hidden className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}>
                  <CheckIcon size={12} />
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {hint ? <p role="status" className="muted pt-1 text-caption">{hint}</p> : null}
        <button type="button" onClick={save} className="btn btn-primary mt-4 w-full py-4">
          {t("common.save")}
        </button>
      </div>
    </div>
  );
}
