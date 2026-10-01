import { NativeModules, Platform } from "react-native";

/**
 * Yükselen seri (kombo merdiveni) — web `lib/sfx` `LADDER` / `correctCue` ile birebir.
 * Native `playSfx`e giden tarif ölçülüyor: kök basamağın frekansı, 4. doğrudan sonra
 * ışıltı katmanı, yanlışta ve `resetCombo`da başa dönüş, 25 sn boşlukta sıfırlanma.
 */
const WEB_LADDER = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];

const played: string[] = [];
jest.mock("../src/lib/ttsBridge", () => ({ bridgeReady: () => false, bridgeSfx: jest.fn() }));

const load = () => require("../src/lib/sfx") as typeof import("../src/lib/sfx");

/** Tarifi çöz: [parçalar, oran]. */
const parse = (spec: string): [string[], number] => {
  const [names, r] = spec.split("@");
  return [names.split("+"), r ? Number(r) : 1];
};

describe("kombo merdiveni", () => {
  let now = 1_000_000;
  let sfx: ReturnType<typeof load>;
  beforeEach(() => {
    jest.resetModules();
    played.length = 0;
    Platform.OS = "android";
    NativeModules.LernomiSpeech = { playSfx: (s: string) => played.push(s), sfxSilent: () => false };
    jest.spyOn(Date, "now").mockImplementation(() => now);
    jest.spyOn(console, "log").mockImplementation(() => undefined); // __DEV__ PROBE satırları
    sfx = load();
  });
  afterEach(() => jest.restoreAllMocks());

  /** Kuyruk beklemesi olmasın diye her çağrı arasında 2 sn. */
  const hit = (k: "correct" | "wrong" | "near") => { now += 2000; sfx.sfx(k); };

  it("her doğru bir pentatonik basamak çıkar, kök web merdiveniyle aynı", () => {
    for (let i = 0; i < 11; i++) hit("correct");
    const roots = played.map((s) => Math.round(523.25 * parse(s)[1] * 100) / 100);
    expect(roots).toEqual([...WEB_LADDER, 1567.98, 1567.98]);
  });

  it("ışıltı 4. doğrudan itibaren (web: combo >= 4)", () => {
    for (let i = 0; i < 5; i++) hit("correct");
    expect(played.map((s) => parse(s)[0].includes("sparkle"))).toEqual([false, false, false, true, true]);
  });

  it("yanlış, resetCombo ve 25 sn boşluk başa sarar; neredeyse bir basamak ilerletir", () => {
    hit("correct"); hit("correct"); hit("wrong"); hit("correct");
    expect(parse(played[3])[1]).toBe(1);
    hit("near"); hit("correct");
    expect(played[5]).toMatch(/^correct@/);
    expect(sfx.comboStep()).toBe(3);
    sfx.resetCombo(); hit("correct");
    expect(played[6]).toBe("correct");
    hit("correct"); now += 26_000; hit("correct");
    expect(played[8]).toBe("correct");
  });

  it("Android zil modu sessizken efekt çalmaz ama merdiven ilerler", () => {
    NativeModules.LernomiSpeech.sfxSilent = () => true;
    hit("correct"); hit("correct");
    expect(played).toEqual([]);
    NativeModules.LernomiSpeech.sfxSilent = () => false;
    hit("correct");
    expect(parse(played[0])[1]).toBeCloseTo(659.25 / 523.25, 5);
  });

  it("yürüyüş oturumunda zil sessizken de efekt çalar (iOS walkSessionHeld karşılığı)", () => {
    NativeModules.LernomiSpeech.sfxSilent = () => true;
    sfx.setSfxWalkSession(true);
    hit("correct");
    expect(played.length).toBe(1);
    sfx.setSfxWalkSession(false);
    hit("wrong");
    expect(played.length).toBe(1); // oturum bitince zil kuralı geri geliyor
  });
});
