/**
 * `listenOnce` OTURUMLARI (yürüyüşte "Atla" sonrası kelimenin "duyamadım"a düşmesi).
 *
 * Native olaylar oturum taşımıyor; kurallar:
 *  - yeni oturum açılınca eskisi hemen `null` döner ve yenisinin olaylarını almaz,
 *  - eski oturumun zamanlayıcısı yeni oturumun tanıyıcısını yok etmez,
 *  - durdurulan oturum son parçayı bekler ama en geç kısa bir süre sonra döner.
 */
export {}; // modül kapsamı: öteki testlerin `Mod`/`load` adlarıyla çakışmasın
type Mod = typeof import("../src/lib/stt");
type Handler = (e?: unknown) => void;

function load() {
  const handlers = new Map<string, Set<Handler>>();
  const native = { start: jest.fn(async () => true), stop: jest.fn(), destroy: jest.fn(), setApiBase: jest.fn() };
  let mod!: Mod;
  jest.isolateModules(() => {
    jest.doMock("react-native/Libraries/EventEmitter/NativeEventEmitter", () => ({
      __esModule: true,
      default: class {
        addListener(name: string, cb: Handler) {
          if (!handlers.has(name)) handlers.set(name, new Set());
          handlers.get(name)!.add(cb);
          return { remove: () => handlers.get(name)!.delete(cb) };
        }
      },
    }));
    const rn = require("react-native") as typeof import("react-native");
    (rn.NativeModules as Record<string, unknown>).LernomiSpeech = native;
    mod = require("../src/lib/stt") as Mod;
  });
  const emit = (name: string, e?: unknown) => { for (const cb of [...(handlers.get(name) ?? [])]) cb(e); };
  return { mod, native, emit };
}

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

// Yeni oturum eskisini null ile kapatır; eskinin zamanlayıcısı yenisini yok etmez.
// (Test adları İngilizce: `src/` altı çeviri kapısının taramasında.)
test("a new session supersedes the old one; the old timer never destroys the new session", async () => {
  const { mod, native, emit } = load();
  const first = mod.listenOnce("de-DE", 8000);
  mod.stopListening(); // "Atla"
  const second = mod.listenOnce("de-DE", 9000);
  await expect(first).resolves.toBeNull();
  jest.advanceTimersByTime(8500); // eskinin penceresi doldu
  expect(native.destroy).not.toHaveBeenCalled();
  emit("LernomiSpeechResults", { value: ["der Hund"] });
  await expect(second).resolves.toEqual(["der Hund"]);
  expect(native.destroy).toHaveBeenCalledTimes(1);
});

// Durdurulan oturum son parçayı verir, gelmezse pencereyi beklemeden döner.
test("a stopped session keeps its final chunk, else resolves without waiting for the window", async () => {
  const { mod, native, emit } = load();
  const a = mod.listenOnce("de-DE", 30000);
  mod.stopListening(); // "Bitir"
  emit("LernomiSpeechResults", { value: ["ich gehe nach Hause"] });
  await expect(a).resolves.toEqual(["ich gehe nach Hause"]);

  let done = false;
  const b = mod.listenOnce("de-DE", 30000).then((v) => { done = true; return v; });
  mod.stopListening(); // tanıyıcı hiçbir şey göndermiyor
  jest.advanceTimersByTime(1000);
  await Promise.resolve();
  expect(done).toBe(false);
  jest.advanceTimersByTime(600);
  await expect(b).resolves.toBeNull();
  expect(native.destroy).toHaveBeenCalledTimes(2);
});
