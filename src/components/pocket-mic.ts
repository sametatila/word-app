"use client";

/**
 * Cepte çalışan mikrofon.
 *
 * Tarayıcının kendi konuşma tanıyıcısı (`SpeechRecognition`) yalnızca sayfa
 * GÖRÜNÜRKEN çalışıyor; telefon kilitlenince susuyor. `getUserMedia` ile
 * açılan mikrofon akışı ise arka planda yaşamaya devam ediyor — sesli not
 * uygulamalarının ekran kapalıyken kayıt yapabilmesinin sebebi bu.
 *
 * Bu yüzden akış oturum boyunca **bir kez** açılıp AÇIK TUTULUYOR. Her tur
 * için yeniden açmak iki şeyi birden bozardı: her açılış yarım saniyeye kadar
 * gecikme ekliyor ve daha önemlisi, akış kapalıyken sekmenin arka planda
 * canlı kalması için bir sebep kalmıyor. Açık bir yakalama, tarayıcının
 * sekmeyi dondurmamasının en güçlü güvencesi.
 *
 * Kayıt penceresi SABİT. Sessizlik algılamak için WebAudio çözümleyicisi
 * kullanılabilirdi ama ekran kapandığında `AudioContext` askıya alınıyor ve
 * çözümleyici duruyor — yani tam ihtiyaç duyulan yerde çalışmıyor. Sabit
 * pencere biraz daha az duyarlı, buna karşılık her koşulda aynı davranıyor.
 */

let stream: MediaStream | null = null;

/** Tarayıcının kabul ettiği ilk kayıt biçimi. */
function pickMime(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4", // Safari
    "audio/ogg;codecs=opus",
  ];
  const R = typeof window !== "undefined" ? window.MediaRecorder : undefined;
  if (!R) return "";
  return candidates.find((t) => R.isTypeSupported?.(t)) ?? "";
}

export function micSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.MediaRecorder !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  );
}

/**
 * Mikrofonu açar ve açık tutar.
 *
 * Ses işleme açık bırakıldı: yankı/gürültü bastırma ve kazanç denetimi, cepteki
 * telefonun kumaşa sürtünmesi ve sokak gürültüsü karşısında yazıya çevirmeyi
 * belirgin biçimde kolaylaştırıyor.
 */
export async function openMic(): Promise<boolean> {
  if (!micSupported()) return false;
  if (stream?.active) return true;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    return true;
  } catch {
    stream = null;
    return false;
  }
}

export function micOpen(): boolean {
  return Boolean(stream?.active);
}

export function closeMic() {
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
}

/**
 * Belirtilen süre kadar kaydeder.
 *
 * `null` dönmesi "kayıt yapılamadı" demek — çağıran taraf bunu duyulmamış
 * cevaptan ayırt edebilsin diye boş bir blob dönülmüyor.
 */
export function recordClip(ms: number): Promise<Blob | null> {
  if (!stream?.active) return Promise.resolve(null);
  const mime = pickMime();
  let rec: MediaRecorder;
  try {
    rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  } catch {
    return Promise.resolve(null);
  }

  return new Promise<Blob | null>((resolve) => {
    const chunks: BlobPart[] = [];
    let settled = false;
    const done = (value: Blob | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    rec.onstop = () => done(chunks.length ? new Blob(chunks, { type: mime || "audio/webm" }) : null);
    rec.onerror = () => done(null);

    try {
      rec.start();
    } catch {
      return done(null);
    }
    setTimeout(() => {
      try {
        if (rec.state !== "inactive") rec.stop();
      } catch {
        done(null);
      }
    }, ms);
  });
}

/** Kaydı sunucuya gönderip yazıya çevirir. Başarısızsa boş dizi. */
export async function transcribe(
  clip: Blob,
  language = "de",
  /** Beklenen cevap — karara etki etmiyor, yalnızca kayda geçiyor. */
  expected = "",
): Promise<string[]> {
  const form = new FormData();
  const ext = clip.type.includes("mp4") ? "mp4" : clip.type.includes("ogg") ? "ogg" : "webm";
  form.append("audio", clip, `clip.${ext}`);
  form.append("language", language);
  if (expected) form.append("expected", expected);
  try {
    const res = await fetch("/api/stt", { method: "POST", body: form });
    if (!res.ok) return [];
    const data = (await res.json()) as { text?: string };
    const text = (data.text ?? "").trim();
    return text ? [text] : [];
  } catch {
    return [];
  }
}

/** Sunucuda yazıya çevirme açık mı — mod hangi yolu kullanacağını buna göre seçiyor. */
export async function sttAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/stt", { cache: "no-store" });
    if (!res.ok) return false;
    const data = (await res.json()) as { configured?: boolean };
    return data.configured === true;
  } catch {
    return false;
  }
}
