"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MascotAvatar } from "@/components/avatar";
import { GLASSES, HAT_COLORS, HATS, MUSTACHES } from "@/components/avatar-parts";
import { saveAvatar, useAvatar, DEFAULT_AVATAR, type AvatarConfig } from "@/lib/avatar";
import { PageBack } from "@/components/page-back";
import { useT } from "@/lib/i18n/client";

/**
 * Avatar düzenleme — Erdi'ye şapka (renkli), gözlük, bıyık.
 *
 * Mobilde bu ekran baştan beri var (`AvatarScreen`), web'de hiç yoktu: web
 * kullanıcısının avatarı kimliğinden türetilen bir baş-harf armasıydı ve
 * değiştirilemiyordu.
 *
 * Seçenekler seçildikleri şeyi TAŞIYAN mini avatarlar olarak gösteriliyor —
 * ad listesi değil. Bir şapkanın adını okumak onun nasıl durduğunu
 * söylemiyor; kırk piksellik önizleme söylüyor.
 */
export function AvatarEditor() {
  const t = useT();
  const router = useRouter();
  /*
    TASLAK ile KAYITLI ayrı duruyor.

    Ekran kayıtlı avatarı BİR KEZ okuyup duruma kopyalıyordu ve bu okuma,
    sunucudan gelen avatarın cihaza yazılmasından ÖNCE oluyordu (alt bileşenin
    etkisi üstünkinden önce çalışır). Başka bir cihazda avatarını seçmiş biri
    bu ekranı açınca boş maskot görüyor, bir şey seçip kaydedince de gerçek
    avatarını üzerine yazıyordu.

    Kayıtlı değer artık reaktif okunuyor; taslak yalnız kullanıcı bir şeye
    dokununca doluyor ve o andan sonra kazanıyor (geç gelen eşitleme
    düzenlemeyi bozmasın).
  */
  const stored = useAvatar();
  const [draft, setDraft] = useState<AvatarConfig | null>(null);
  const cfg = draft ?? stored ?? DEFAULT_AVATAR;
  const setCfg = (patch: Partial<AvatarConfig>) => setDraft({ ...cfg, ...patch });

  /** Tek bir aksesuarı gösteren önizleme — diğerleri kapalı, şapka rengi korunuyor. */
  const only = (over: Partial<AvatarConfig>): AvatarConfig => ({
    ...DEFAULT_AVATAR,
    hatColor: cfg.hatColor,
    ...over,
  });

  function save() {
    saveAvatar(cfg);
    router.push("/profile");
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <PageBack fallback="/profile" title={t("avatar.your_avatar")} />

      <div className="my-5 flex justify-center">
        <MascotAvatar config={cfg} size={140} className="shadow-soft-lg" />
      </div>

      <Group title={t("avatar.hat")}>
        <Opt preview={only({ hat: null })} selected={cfg.hat === null} label={t("avatar.no_hat")} onPick={() => setCfg({ hat: null })} />
        {HATS.map((h) => (
          <Opt
            key={h}
            preview={only({ hat: h })}
            selected={cfg.hat === h}
            label={h}
            onPick={() => setCfg({ hat: h })}
          />
        ))}
      </Group>

      {cfg.hat ? (
        <div className="mt-4">
          <p className="muted mb-2 ml-1 text-caption">{t("avatar.hat_color")}</p>
          {/* TEK SEÇİMLİK ŞERİT RADYO GRUBUDUR — Android aynı şeritleri
              `accessibilityRole="radio"` ile veriyor (`AvatarScreen`). */}
          <div role="radiogroup" aria-label={t("avatar.hat_color")} className="flex flex-wrap gap-2">
            {HAT_COLORS.map((col) => (
              <button
                key={col}
                type="button"
                aria-label={`${t("avatar.hat_color")} ${col}`}
                role="radio"
                aria-checked={cfg.hatColor === col}
                onClick={() => setCfg({ hatColor: col })}
                className="pressable h-11 w-11 rounded-full"
                style={{
                  background: col,
                  border: `3px solid ${cfg.hatColor === col ? "var(--text)" : "transparent"}`,
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      <Group title={t("avatar.glasses")}>
        <Opt preview={only({ glasses: null })} selected={cfg.glasses === null} label={t("avatar.no_glasses")} onPick={() => setCfg({ glasses: null })} />
        {GLASSES.map((g) => (
          <Opt
            key={g}
            preview={only({ glasses: g })}
            selected={cfg.glasses === g}
            label={g}
            onPick={() => setCfg({ glasses: g })}
          />
        ))}
      </Group>

      <Group title={t("avatar.mustache")}>
        <Opt preview={only({ mustache: null })} selected={cfg.mustache === null} label={t("avatar.no_mustache")} onPick={() => setCfg({ mustache: null })} />
        {MUSTACHES.map((m) => (
          <Opt
            key={m}
            preview={only({ mustache: m })}
            selected={cfg.mustache === m}
            label={m}
            onPick={() => setCfg({ mustache: m })}
          />
        ))}
      </Group>

      <button type="button" onClick={save} className="btn btn-primary mt-7 w-full py-4">
        {t("common.save")}
      </button>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="muted mb-2 ml-1 text-caption">{title}</p>
      {/* Yatay şerit: seçenek sayısı büyüyünce (Replicate sanatı geldiğinde)
          satır sarmalayıp ekranı yemesin. Çubuk gizli — kesilme zaten
          kaydırılabildiğini söylüyor (bkz. globals.css .no-scrollbar). */}
      {/* TEK SEÇİMLİK ŞERİT RADYO GRUBUDUR (bkz. şapka rengi notu). */}
      <div role="radiogroup" aria-label={title} className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{children}</div>
    </div>
  );
}

function Opt({
  preview,
  selected,
  label,
  onPick,
}: {
  preview: AvatarConfig;
  selected: boolean;
  label: string;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={label}
      role="radio"
      aria-checked={selected}
      className="pressable shrink-0 rounded-panel p-1"
      style={{ border: `2px solid ${selected ? "var(--color-brand-500)" : "transparent"}` }}
    >
      <MascotAvatar config={preview} size={54} />
    </button>
  );
}
