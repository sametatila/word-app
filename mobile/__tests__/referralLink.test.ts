import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseDeepLink } from "../src/lib/deepLink";
import { PART_UNLOCKS, isLockedPart, stripLockedParts } from "../src/lib/avatarUnlocks";

/**
 * DAVET BAĞLANTISI — mobil tarafın SESSİZ kırılabilen üç yeri.
 *
 * NEDEN TEST. Bu zincirin hiçbir halkası kırıldığında hata vermiyor:
 * bağlantı uygulamayı açar ve hiçbir şey olmaz, ya da kilitli aksesuar açık
 * görünür ve kayıt sessizce düşer. Derleyici de, öteki kapılar da göremiyor.
 *
 *  1. ADRES ÇÖZÜMÜ. `/r/<KOD>` tanınmalı ve kod SUNUCUDAKİ ile aynı kuralla
 *     sadeleşmeli (`normalizeReferral`: büyük harf, harf/rakam dışı atılır).
 *     Ayrışırsa küçük harfle paylaşılan bağlantı mobilde bulunamaz, webde
 *     bulunur — kimsenin fark etmeyeceği bir yarım çalışma.
 *
 *  2. YABANCI KÖKEN. Bağlantı DIŞARIDAN geliyor ve `MainActivity` dışa açık:
 *     telefondaki herhangi bir uygulama istediği adresle bizi açabilir.
 *     RN'in `URL`i düzenli ifadeyle çalıştığı için `https://saldirgan.com/
 *     @www.lernomi.app/...` adresinde ana makineyi bizim sanıyor.
 *
 *  3. KAZANILAN AKSESUAR. Kilit listesi web ile aynı olmalı; ayrışırsa bir
 *     platformda kilitli olan ötekinde açık görünür.
 */
jest.mock("../src/api/client", () => ({ api: jest.fn(), fetchWithTimeout: jest.fn(), API_BASE: "https://www.lernomi.app" }));

beforeEach(async () => {
  await AsyncStorage.clear();
});

test("davet adresi tanınıyor ve kod sadeleşiyor", () => {
  expect(parseDeepLink("https://www.lernomi.app/r/7RE97B")).toEqual({ kind: "referral", code: "7RE97B" });
  /* Küçük harf ve ayraç: paylaşılan bağlantı her biçimde gelebiliyor. */
  expect(parseDeepLink("https://lernomi.app/r/7re97b")).toEqual({ kind: "referral", code: "7RE97B" });
  expect(parseDeepLink("https://www.lernomi.app/r/7re-97b")).toEqual({ kind: "referral", code: "7RE97B" });
});

test("kodsuz ve bozuk adres içeri alınmıyor", () => {
  /* Kod boşsa uygulama açılıp hiçbir şey yapmasın. */
  expect(parseDeepLink("https://www.lernomi.app/r/")).toBeNull();
  expect(parseDeepLink("https://www.lernomi.app/r/---")).toBeNull();
  /* Bozuk yüzde dizisi `decodeURIComponent`i fırlatıyordu: sarmalanmazsa
     açılış kancası yarıda kalırdı. */
  expect(() => parseDeepLink("https://www.lernomi.app/r/%")).not.toThrow();
});

test("yabancı kökenden gelen davet adresi reddediliyor", () => {
  expect(parseDeepLink("https://saldirgan.com/r/7RE97B")).toBeNull();
  /* RN `URL` tuzağı: ham adres denetimi olmasa ana makine bizim sanılırdı. */
  expect(parseDeepLink("https://saldirgan.com/@www.lernomi.app/r/7RE97B")).toBeNull();
  expect(parseDeepLink("http://www.lernomi.app/r/7RE97B")).toBeNull();
});

test("kazanılan aksesuar kilidi", () => {
  /* Eşleme web (`lib/avatar-unlocks`) ile birebir — `check:parity` ikisini
     karşılaştırıyor; burada DAVRANIŞ sınanıyor. */
  expect(PART_UNLOCKS.party).toBe("invite1");
  expect(isLockedPart("party")).toBe(true);
  expect(isLockedPart("beanie")).toBe(false);

  const cfg = { hat: "party", hatColor: "#c0392b", glasses: "round", mustache: null };
  /* Rozetsiz: yalnız kilitli parça düşüyor, ötekiler duruyor. */
  expect(stripLockedParts(cfg, new Set<string>())).toEqual({ ...cfg, hat: null });
  /* Rozetli: dokunulmuyor. */
  expect(stripLockedParts(cfg, new Set(["invite1"]))).toEqual(cfg);
});
