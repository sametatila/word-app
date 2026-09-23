/**
 * MİSAFİR AÇILIŞINDA CİHAZ BELGESİ (Play Integrity, kayıt kipi).
 *
 * NEDEN TEST: buradaki hata misafir açılışını KİLİTLER. Kurallar:
 *  - iOS'ta ve kip kapalıyken (proje numarası yok) hiçbir şey yapılmaz,
 *  - belge gelirse belge + nonce, gelmezse yalnız hata kodu döner,
 *  - asılı kalan native çağrı açılışı en çok zaman aşımı kadar bekletir,
 *  - hiçbir yol fırlatmaz.
 */
type Mod = typeof import("../src/lib/integrity");

/* Modül platformu ve native modülü YÜKLENİRKEN okuyor; her test kendi
   react-native kopyasıyla taze yükleniyor. Platform test bitene dek sabit. */
const restores: { restore(): void }[] = [];
afterEach(() => { while (restores.length) restores.pop()!.restore(); });

function load(os: "ios" | "android", native: unknown): Mod {
  let mod!: Mod;
  jest.isolateModules(() => {
    const rn = require("react-native") as typeof import("react-native");
    restores.push(jest.replaceProperty(rn.Platform, "OS", os));
    (rn.NativeModules as Record<string, unknown>).LernomiIntegrity = native;
    mod = require("../src/lib/integrity") as Mod;
  });
  return mod;
}

const P = "658160017552";

test("iOS: belge istenmez, native'e dokunulmaz", async () => {
  const native = { prepare: jest.fn(), requestGuestToken: jest.fn() };
  const m = load("ios", native);
  expect(await m.guestAttestation(P)).toBeNull();
  m.warmUpIntegrity(P);
  expect(native.requestGuestToken).not.toHaveBeenCalled();
  expect(native.prepare).not.toHaveBeenCalled();
});

test("kip kapalı (proje numarası yok): Google'a gidilmez", async () => {
  const native = { prepare: jest.fn(), requestGuestToken: jest.fn() };
  const m = load("android", native);
  expect(await m.guestAttestation(null)).toBeNull();
  m.warmUpIntegrity(undefined);
  expect(native.requestGuestToken).not.toHaveBeenCalled();
  expect(native.prepare).not.toHaveBeenCalled();
});

test("Android: belge ve nonce döner; ön hazırlık bir kez", async () => {
  const native = { prepare: jest.fn().mockResolvedValue(true), requestGuestToken: jest.fn().mockResolvedValue({ token: "tok", nonce: "n1" }) };
  const m = load("android", native);
  m.warmUpIntegrity(P);
  m.warmUpIntegrity(P);
  expect(await m.guestAttestation(P)).toEqual({ token: "tok", nonce: "n1" });
  expect(native.prepare).toHaveBeenCalledTimes(1);
  expect(native.requestGuestToken).toHaveBeenCalledWith(P);
});

test("Play hizmetleri yok: yalnız hata kodu, fırlatmaz", async () => {
  const native = { prepare: jest.fn(), requestGuestToken: jest.fn().mockRejectedValue(Object.assign(new Error("x"), { code: "-1" })) };
  const m = load("android", native);
  expect(await m.guestAttestation(P)).toEqual({ error: "-1" });
});

test("asılı native çağrı: zaman aşımında hata koduyla döner", async () => {
  const native = { prepare: jest.fn(), requestGuestToken: jest.fn(() => new Promise(() => {})) };
  const m = load("android", native);
  expect(await m.guestAttestation(P, 20)).toEqual({ error: "timeout" });
});

test("native modül yoksa: no_module", async () => {
  const m = load("android", undefined);
  expect(await m.guestAttestation(P)).toEqual({ error: "no_module" });
});
