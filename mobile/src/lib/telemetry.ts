import { AppState, type AppStateStatus } from "react-native";
import { track } from "./track";

/**
 * Ekran ölçümü — web `components/telemetry` ile aynı üç soruyu cevaplıyor:
 * hangi ekran açıldı, ekranda ne kadar kalındı, hangi hata yakalanmadı.
 *
 * Mobilde yalnız sekme dokunuşu (`nav`) yazılıyordu; yığın ekranları
 * (profil, kelimeler, sınav, ayarlar, yazılarım…) hiç sayılmıyordu. Sonuç:
 * "kimse açmıyor mu" sorusu Android için cevapsız, panodaki ekran tablosu
 * yanlı.
 *
 * Süre GÖRÜNÜR süre: uygulama arkaya atılınca sayaç duruyor (web sekme
 * gizlenince aynısını yapıyor). Üç saniyenin altı yazılmıyor.
 */
const MIN_SECONDS = 3;
/** Hata seli olmasın: dakikada en çok bir `client_error` (web ile aynı sınır). */
const ERROR_WINDOW_MS = 60_000;

let ekran = "";
let gorunurdenBeri: number | null = null;
let biriken = 0;
let sonHata = 0;

function topla(): void {
  if (gorunurdenBeri !== null) {
    biriken += (Date.now() - gorunurdenBeri) / 1000;
    gorunurdenBeri = null;
  }
}

function yaz(): void {
  topla();
  const saniye = Math.round(biriken);
  biriken = 0;
  if (ekran && saniye >= MIN_SECONDS) track("time_spent", saniye, ekran);
}

/** Ekran değişti: öncekinin süresini yaz, yenisini aç. */
export function screenChanged(ad: string | undefined): void {
  if (!ad || ad === ekran) return;
  yaz();
  ekran = ad;
  gorunurdenBeri = Date.now();
  track("page_view", 0, ad);
}

/** Uygulama ön/arka plan — sayaç yalnız ön planda işliyor. */
function appState(s: AppStateStatus): void {
  if (s === "active") { if (gorunurdenBeri === null) gorunurdenBeri = Date.now(); return; }
  yaz(); // arkaya atıldı: biriken süre kaydedilir, sayaç durur
}

/** Yakalanmamış hata — ekran adıyla birlikte, dakikada en çok bir. */
function hata(): void {
  const now = Date.now();
  if (now - sonHata < ERROR_WINDOW_MS) return;
  sonHata = now;
  track("client_error", 1, ekran || "unknown");
}

type ErrorUtilsShape = {
  getGlobalHandler?: () => ((e: unknown, fatal?: boolean) => void) | undefined;
  setGlobalHandler?: (h: (e: unknown, fatal?: boolean) => void) => void;
};

/** Açılışta bir kez; geri dönen işlev dinleyicileri kaldırır. */
export function attachTelemetry(): () => void {
  const sub = AppState.addEventListener("change", appState);
  gorunurdenBeri = Date.now();
  /* Global hata kancası ZİNCİRLENİYOR: RN'in kendi işleyicisi (geliştirmede
     kırmızı ekran, üretimde çökme raporu) çalışmaya devam etmeli - onu
     değiştirmek hata ayıklamayı bozardı. */
  const eu = (globalThis as { ErrorUtils?: ErrorUtilsShape }).ErrorUtils;
  const onceki = eu?.getGlobalHandler?.();
  eu?.setGlobalHandler?.((e, fatal) => {
    hata();
    onceki?.(e, fatal);
  });
  return () => {
    yaz();
    sub.remove();
    if (onceki) eu?.setGlobalHandler?.(onceki);
  };
}
