import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wortspiel'i indir",
  description: "Wortspiel Android uygulamasını indir — Goethe'ye hazırlanan Türkler için konuşma odaklı Almanca.",
};

// Sürüm GitHub'ın son yayınından okunur (tek doğruluk kaynağı) — böylece bu
// sayfa "versiyon kontrollü": yeni APK yayınlanınca sürüm ve bağlantı kendiliğinden güncellenir.
export const dynamic = "force-dynamic";

const REPO = "sametatila/word-app";
/** Sürümden bağımsız kalıcı bağlantı — her zaman son sürümü indirir. */
const LATEST_APK = `https://github.com/${REPO}/releases/latest/download/wortspiel.apk`;

async function getLatest(): Promise<{ version: string; url: string; notes: string } | null> {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const j = (await r.json()) as { tag_name?: string; body?: string; assets?: { name: string; browser_download_url: string }[] };
    const apk = j.assets?.find((a) => a.name.endsWith(".apk"));
    return { version: (j.tag_name ?? "").replace(/^v/, "") || "—", url: apk?.browser_download_url ?? LATEST_APK, notes: j.body ?? "" };
  } catch {
    return null;
  }
}

export default async function IndirPage() {
  const latest = await getLatest();
  const version = latest?.version ?? "en son";
  const url = latest?.url ?? LATEST_APK;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-black text-white"
        style={{ background: "var(--color-brand)" }}
      >
        W
      </div>

      <div>
        <h1 className="text-2xl font-extrabold">Wortspiel</h1>
        <p className="mt-1 text-[15px]" style={{ color: "var(--text-muted)" }}>
          Goethe'ye hazırlanan Türkler için konuşma odaklı Almanca.
        </p>
      </div>

      <span
        className="rounded-full px-3.5 py-1.5 text-sm font-bold"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
      >
        Android · sürüm {version}
      </span>

      <a
        href={url}
        className="w-full rounded-2xl px-6 py-4 text-lg font-bold text-white"
        style={{ background: "var(--color-brand)" }}
      >
        APK indir
      </a>

      <ol className="w-full space-y-2 text-left text-sm" style={{ color: "var(--text-muted)" }}>
        <li>1. APK'yı indir ve dosyayı aç.</li>
        <li>2. "Bilinmeyen kaynaklara izin ver" çıkarsa onayla (bu tek uygulama için).</li>
        <li>3. Kur ve aç — güncellemeler uygulama içinde bildirilir.</li>
      </ol>

      <p className="text-xs" style={{ color: "var(--text-faint)" }}>
        Bağlantı her zaman en son sürümü verir. iOS yakında.
      </p>
    </main>
  );
}
