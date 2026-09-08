"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MyAvatar } from "@/components/my-avatar";
import { GLASSES, HAT_COLORS, HATS, MUSTACHES } from "@/components/avatar-parts";
import { getAvatar, saveAvatar, DEFAULT_AVATAR, type AvatarConfig } from "@/lib/avatar";
import { PageBack } from "@/components/page-back";

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
  const router = useRouter();
  const [cfg, setCfg] = useState<AvatarConfig>(DEFAULT_AVATAR);

  // Depolama yalnız istemcide okunabiliyor; ilk render varsayılanla çiziliyor
  // ve kayıtlı seçim hemen ardından yerine geçiyor.
  useEffect(() => setCfg(getAvatar()), []);

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
      <PageBack fallback="/profile" title="Avatarın" />

      <div className="my-5 flex justify-center">
        <MyAvatar size={140} config={cfg} className="shadow-soft-lg" />
      </div>

      <Group title="ŞAPKA">
        <Opt preview={only({ hat: null })} selected={cfg.hat === null} label="Şapkasız" onPick={() => setCfg((c) => ({ ...c, hat: null }))} />
        {HATS.map((h) => (
          <Opt
            key={h}
            preview={only({ hat: h })}
            selected={cfg.hat === h}
            label={h}
            onPick={() => setCfg((c) => ({ ...c, hat: h }))}
          />
        ))}
      </Group>

      {cfg.hat ? (
        <div className="mt-4">
          <p className="muted mb-2 ml-1 text-caption">ŞAPKA RENGİ</p>
          <div className="flex flex-wrap gap-2">
            {HAT_COLORS.map((col) => (
              <button
                key={col}
                type="button"
                aria-label={`Şapka rengi ${col}`}
                aria-pressed={cfg.hatColor === col}
                onClick={() => setCfg((c) => ({ ...c, hatColor: col }))}
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

      <Group title="GÖZLÜK">
        <Opt preview={only({ glasses: null })} selected={cfg.glasses === null} label="Gözlüksüz" onPick={() => setCfg((c) => ({ ...c, glasses: null }))} />
        {GLASSES.map((g) => (
          <Opt
            key={g}
            preview={only({ glasses: g })}
            selected={cfg.glasses === g}
            label={g}
            onPick={() => setCfg((c) => ({ ...c, glasses: g }))}
          />
        ))}
      </Group>

      <Group title="BIYIK">
        <Opt preview={only({ mustache: null })} selected={cfg.mustache === null} label="Bıyıksız" onPick={() => setCfg((c) => ({ ...c, mustache: null }))} />
        {MUSTACHES.map((m) => (
          <Opt
            key={m}
            preview={only({ mustache: m })}
            selected={cfg.mustache === m}
            label={m}
            onPick={() => setCfg((c) => ({ ...c, mustache: m }))}
          />
        ))}
      </Group>

      <button type="button" onClick={save} className="btn btn-primary mt-7 w-full py-4">
        Kaydet
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
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{children}</div>
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
      aria-pressed={selected}
      className="pressable shrink-0 rounded-panel p-1"
      style={{ border: `2px solid ${selected ? "var(--color-brand-500)" : "transparent"}` }}
    >
      <MyAvatar size={54} config={preview} />
    </button>
  );
}
