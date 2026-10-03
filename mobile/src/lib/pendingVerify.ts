import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * BU CİHAZDAN BAŞLATILAN E-POSTA DOĞRULAMALARI.
 *
 * Doğrulama bağlantısı oturumu da açıyor (sunucu `autoSignInAfterVerification`).
 * Oturumu olmayan uygulamaya herkes kendi hesabının bağlantısını yollayabiliyor:
 * kurban dokununca sessizce saldırganın hesabına giriyor ve orada konuşma, ses
 * alıştırması yapıyordu (login CSRF; güvenlik denetimi 2026-10-03, D11).
 *
 * Kayıt, giriş denemesi ve "tekrar gönder" adresi burada not ediyor; bağlantı
 * yalnız not edilmiş bir adrese aitse oturum açık kalıyor. Değilse doğrulama
 * yine yapılıyor (kullanıcı postayı başka cihazdan açmış olabilir) ama oturum
 * kapatılıp "giriş yap" deniyor (bkz. App `verify-email`).
 *
 * Cihaza ait, hesaba değil: çıkışta silinmiyor (`accountScope` listesinde yok).
 */
const KEY = "lernomi:pending-verify";
/** Doğrulama bağlantısının ömründen uzun; eski notlar budanıyor. */
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Notes = Record<string, number>;
const norm = (email: string) => email.trim().toLowerCase();

async function load(): Promise<Notes> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    if (!parsed || typeof parsed !== "object") return {};
    const now = Date.now();
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter(
        (e): e is [string, number] => typeof e[1] === "number" && now - e[1] < TTL_MS,
      ),
    );
  } catch {
    return {};
  }
}

export async function notePendingVerify(email: string): Promise<void> {
  if (!email.trim()) return;
  try {
    const notes = await load();
    notes[norm(email)] = Date.now();
    await AsyncStorage.setItem(KEY, JSON.stringify(notes));
  } catch {
    /* not düşerse bağlantı "giriş yap" yoluna düşer; akış kırılmıyor */
  }
}

/** Not varsa siler ve true döner (tek kullanımlık). */
export async function takePendingVerify(email: string): Promise<boolean> {
  try {
    const notes = await load();
    const k = norm(email);
    if (!(k in notes)) return false;
    delete notes[k];
    await AsyncStorage.setItem(KEY, JSON.stringify(notes));
    return true;
  } catch {
    return false;
  }
}

/**
 * Doğrulama bağlantısındaki jetonun e-postası. better-auth jetonu imzalı bir
 * JWT; burada yalnız gövde OKUNUYOR (imzayı sunucu doğruluyor), amaç bağlantının
 * kime ait olduğunu bilmek. Okunamazsa null: bağlantı "bize ait değil" sayılır.
 */
export function verifyLinkEmail(url: string): string | null {
  try {
    const token = new URL(url).searchParams.get("token") ?? "";
    const part = token.split(".")[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "=");
    const bin = atob(b64);
    // atob ikili dizge veriyor; UTF-8 için bayt bayt yüzde kodlamasından geçiyor.
    const text = decodeURIComponent(Array.from(bin, (c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""));
    const json = JSON.parse(text) as { email?: unknown };
    return typeof json.email === "string" ? json.email : null;
  } catch {
    return null;
  }
}
