/**
 * Sürüm denetimi — GitHub'ın herkese açık "latest release" ucundan (push
 * gerektirmez, her an güncel). Yüklü sürüm (version.ts) son sürümden düşükse
 * indirme bağlantısını döndürür; ana ekran bir güncelleme şeridi gösterir.
 *
 * YALNIZ ANDROID. Dağıtılan dosya bir APK; iOS'ta hem anlamsız hem de App Review
 * Guidelines 2.5.2'ye takılır (mağaza dışından kod/uygulama indirtmek). iOS'ta
 * güncelleme App Store'un işi: kanca hiç istek atmaz ve hep null döner, şerit de
 * (screens/LearnScreen) hiç çizilmez.
 */
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { APP_VERSION } from "../version";

const LATEST_API = "https://api.github.com/repos/sametatila/word-app/releases/latest";
/** Sürümden bağımsız kalıcı bağlantı — hep son sürümü verir. */
export const APK_DOWNLOAD_URL = "https://github.com/sametatila/word-app/releases/latest/download/lernomi.apk";

/** "1.2.0" > "1.1.5" → pozitif. Eksik parçalar 0. */
function cmpVersion(a: string, b: string): number {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) { const d = (pa[i] || 0) - (pb[i] || 0); if (d) return d; }
  return 0;
}

export type UpdateInfo = { version: string; url: string; notes?: string };

export function useUpdate(): UpdateInfo | null {
  const [info, setInfo] = useState<UpdateInfo | null>(null);
  useEffect(() => {
    if (Platform.OS !== "android") return;   // bkz. dosya başı: APK yolu iOS'ta yok
    let alive = true;
    (async () => {
      try {
        const res = await fetch(LATEST_API, { headers: { accept: "application/vnd.github+json" } });
        if (!res.ok) return;
        const j = (await res.json()) as { tag_name?: string; body?: string; assets?: { name: string; browser_download_url: string }[] };
        const remote = (j.tag_name ?? "").replace(/^v/, "");
        if (remote && cmpVersion(remote, APP_VERSION) > 0) {
          const apk = j.assets?.find((a) => a.name.endsWith(".apk"));
          if (alive) setInfo({ version: remote, url: apk?.browser_download_url ?? APK_DOWNLOAD_URL, notes: j.body });
        }
      } catch { /* çevrimdışı/limit: sessizce geç */ }
    })();
    return () => { alive = false; };
  }, []);
  return info;
}
