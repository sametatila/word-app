"use client";

import { useEffect, useState } from "react";
import { CheckIcon, LogoMark } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Kurulum rehberi — kalıcı, her zaman ulaşılabilir.
 *
 * Neden gerekiyor: tarayıcının kendi kurulum önerisi bir kez çıkıyor. Android'de
 * kullanıcı "hayır" derse bir daha görmüyor ve uygulamayı elle nasıl
 * kuracağını bilmiyor. iOS'ta ise tarayıcı böyle bir öneri hiç sunmuyor —
 * adımlar yalnızca anlatılarak öğrenilebiliyor.
 *
 * Bu yüzden rehber iki kalıcı yerde duruyor: giriş yapılmadan görülen ana
 * sayfada ve profilde. Geçici bir bildirim değil, geri dönülebilen bir sayfa
 * parçası.
 *
 * Tarayıcı `beforeinstallprompt` verirse gerçek kurulum düğmesi de gösteriliyor;
 * vermezse yalnızca adımlar kalıyor. Adımlar her hâlükârda görünür — düğmenin
 * çıkacağına güvenilemiyor, çıkmadığı durum zaten asıl sorunun kendisi.
 */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Platform = "ios-safari" | "ios-other" | "android" | "desktop";

/* Metin değil ANAHTAR: adımlar gösterildiği yerde çevriliyor. */
const STEPS: Record<Platform, { title: string; steps: string[]; note?: string }> = {
  "ios-safari": {
    title: "install.ios_safari",
    steps: ["install.ios_1", "install.ios_2", "install.ios_3"],
  },
  "ios-other": {
    title: "install.ios_other",
    steps: ["install.iso_1", "install.iso_2", "install.iso_3"],
    note: "install.iso_note",
  },
  android: {
    title: "install.android",
    steps: ["install.and_1", "install.and_2", "install.and_3"],
    note: "install.and_note",
  },
  desktop: {
    title: "install.desktop",
    steps: ["install.desk_1", "install.desk_2", "install.desk_3"],
  },
};

/** Tarayıcıdan platformu çıkarır. */
function detect(): Platform {
  const ua = navigator.userAgent;
  // iPadOS 13'ten beri kendini Mac olarak tanıtıyor; dokunma noktası sayısı ayırıyor.
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1);
  if (isIos) return /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua) ? "ios-other" : "ios-safari";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

export function InstallGuide({ tone = "surface" }: { tone?: "surface" | "plain" }) {
  const t = useT();
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [installed, setInstalled] = useState(false);
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  /** Kendi platformu dışındaki adımları da görmek isteyen olur. */
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setPlatform(detect());
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Sunucuda platform bilinmiyor; ilk çizimde bir şey uydurmak yerine bekleniyor.
  if (!platform) return null;

  if (installed)
    return (
      <div
        className="flex items-center gap-3 rounded-panel px-4 py-3.5"
        style={{ background: "color-mix(in srgb, var(--color-mint) 12%, transparent)" }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: "var(--color-mint-600)" }}
        >
          <CheckIcon size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold">{t("install.installed")}</p>
          <p className="muted text-xs">{t("install.installed_sub")}</p>
        </div>
      </div>
    );

  const shown: Platform[] = showAll
    ? (Object.keys(STEPS) as Platform[])
    : [platform];

  return (
    <div
      className="rounded-panel px-4 py-4"
      style={
        tone === "surface"
          ? { background: "var(--surface)", border: "1px solid var(--border)" }
          : undefined
      }
    >
      <div className="flex items-start gap-3">
        <LogoMark size={40} className="shrink-0" />
        <div className="min-w-0 flex-1">
          {/* Başlık yok: rehber her iki yerde de kendi başlığı olan bir bölümün
              içinde duruyor, buraya bir tane daha koymak onu tekrarlıyordu. */}
          <p className="text-sm">
            {t("install.pitch")}
          </p>
          {deferred ? (
            <button
              onClick={() => {
                void deferred.prompt().then(() => deferred.userChoice.catch(() => null));
              }}
              className="btn btn-primary mt-3 px-5 py-2.5 text-sm"
            >
              {t("install.now")}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {shown.map((p) => (
          <div key={p}>
            <p className="text-xs font-bold" style={{ color: "var(--color-brand)" }}>
              {t(STEPS[p].title)}
            </p>
            <ol className="mt-1.5 space-y-1.5">
              {STEPS[p].steps.map((step, i) => (
                <li key={step} className="flex gap-2.5 text-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums"
                    style={{ background: "var(--surface-2)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">{t(step)}</span>
                </li>
              ))}
            </ol>
            {STEPS[p].note ? <p className="muted mt-1.5 text-xs">{t(STEPS[p].note)}</p> : null}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAll((v) => !v)}
        className="muted mt-3 text-xs font-semibold underline underline-offset-2"
      >
        {t(showAll ? "install.show_this_device" : "install.show_other_device")}
      </button>
    </div>
  );
}
