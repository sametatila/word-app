import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../src/theme";
import { AuthProvider } from "../src/lib/AuthContext";
import { RoundView } from "../src/game/rounds";
import { ReportSheet } from "../src/ui/ReportSheet";
import { useTimerPause } from "../src/lib/useTimerPause";
import { setLang, t } from "../src/lib/i18n";
import { setCurrentCourse } from "../src/lib/courses";
import type { Round } from "../src/game/session";

/**
 * İÇERİK BİLDİRİMİNİN YERİ (Samet 2026-09-28, Duolingo/Babbel düzeni).
 *
 * "⚑ Bildir" CEVAPTAN SONRA, sonuç katmanında "Devam"ın solunda duruyor; soru
 * ekranında (ilerleme satırı, başlık) bayrak yok. Sınav turunda (`report`
 * verilmeden) katmanda da yok. Kaynağa dönük kontrol: `FlowProgress`in bayrak
 * yuvası geri gelmesin ve sınav ekranları sınav sırasında bayrak çizmesin.
 */

jest.mock("../src/lib/tts", () => ({
  ttsAvailable: jest.fn(async () => false),
  currentVoiceId: jest.fn(() => "de-DE-KatjaNeural"),
  stopSpeaking: jest.fn(),
  speakTarget: jest.fn(),
  speakWithVoice: jest.fn(),
  speakAndWait: jest.fn(async () => {}),
  speakAndWaitVoiced: jest.fn(async () => {}),
}));
jest.mock("../src/lib/sfx", () => ({ sfx: jest.fn(), sfxDurationMs: jest.fn(() => 0) }));
jest.mock("../src/lib/haptics", () => ({ haptic: jest.fn() }));

const round = {
  id: "r-1", game: "choice", direction: "de-tr",
  word: { id: 42, de: "Haus", artikel: "das", tr: "ev", en: "house", typ: "noun", niveau: "A1", beispiel: null, beispielTr: null, formen: null, isNew: false },
  options: [{ text: "ev", sub: null }, { text: "araba", sub: null }],
} as Round;

function mount(report?: { surface: "practice"; onOpen?: () => void; onClose?: () => void }) {
  let r!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    r = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 375, height: 667 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        <ThemeProvider>
          <AuthProvider>
            <RoundView round={round} onDone={() => {}} report={report} />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  return r;
}

const flags = (r: ReactTestRenderer.ReactTestRenderer) =>
  r.root.findAll((n) => typeof n.type !== "string" && n.props.accessibilityLabel === t("report.flag_a11y") && n.props.accessibilityRole === "button");

function answer(r: ReactTestRenderer.ReactTestRenderer) {
  const opt = r.root.findAll((n) => typeof n.type !== "string" && n.props.accessibilityRole === "radio" && n.props.accessibilityLabel === "araba")[0];
  act(() => { opt.props.onPress(); });
}

beforeAll(async () => {
  await setLang("tr");
  setCurrentCourse("de");
});

afterEach(() => { jest.clearAllTimers(); });

test("soru ekranında Bildir yok; cevaptan sonra sonuç katmanında var", () => {
  const r = mount({ surface: "practice" });
  expect(flags(r)).toHaveLength(0);
  answer(r);
  expect(flags(r).length).toBeGreaterThan(0);
  act(() => r.unmount());
});

test("sınav turu (report verilmedi): cevaptan sonra da Bildir yok", () => {
  const r = mount();
  answer(r);
  expect(flags(r)).toHaveLength(0);
  act(() => r.unmount());
});

test("kaynak: ilerleme satırında bayrak yuvası yok, sınavlarda test sırasında bayrak yok", () => {
  const fs = require("node:fs") as typeof import("node:fs");
  const path = require("node:path") as typeof import("node:path");
  const read = (p: string) => fs.readFileSync(path.join(__dirname, "..", p), "utf8");
  expect(read("src/ui/flow.tsx")).not.toMatch(/\bflag\??:/);
  for (const f of ["GameScreen", "ChallengeScreen", "BossScreen", "PlacementScreen", "WeeklyScreen", "WalkModeScreen"]) {
    expect(read(`src/screens/${f}.tsx`)).not.toMatch(/\bflag=\{/);
  }
  /* Yerleştirmede hiç yok (anlamlı hedef yok). */
  expect(read("src/screens/PlacementScreen.tsx")).not.toMatch(/ReportFlag/);
  /* Tek görünüm: içerik bildirimi yapay zekâ "Bildir"inin düğmesini kullanıyor. */
  expect(read("src/ui/ReportFlag.tsx")).toMatch(/ReportButton/);
});

test("süreli tur: Bildir sayfası açılınca onOpen, kapanınca onClose (sayaç duruyor)", () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const r = mount({ surface: "practice", onOpen, onClose });
  answer(r);
  act(() => { flags(r)[0].props.onPress(); });
  expect(onOpen).toHaveBeenCalledTimes(1);
  const sheet = r.root.findByType(ReportSheet);
  expect(sheet.props.visible).toBe(true);
  expect(onClose).not.toHaveBeenCalled();
  act(() => { sheet.props.onClose(); });
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(r.root.findByType(ReportSheet).props.visible).toBe(false);
  act(() => r.unmount());
});

test("useTimerPause: açık kalınan süre kapanışta damgalara ekleniyor, çift açılış tek sayılıyor", () => {
  let now = 1_000;
  const spy = jest.spyOn(Date, "now").mockImplementation(() => now);
  const shift = jest.fn();
  let clock!: ReturnType<typeof useTimerPause>;
  function Probe() { clock = useTimerPause(shift); return null; }
  let r!: ReactTestRenderer.ReactTestRenderer;
  try {
    act(() => { r = ReactTestRenderer.create(<Probe />); });
    clock.resume();
    expect(shift).not.toHaveBeenCalled();
    clock.pause();
    expect(clock.paused()).toBe(true);
    now += 2_000;
    clock.pause();
    now += 3_000;
    clock.resume();
    expect(shift).toHaveBeenCalledWith(5_000);
    expect(clock.paused()).toBe(false);
  } finally {
    spy.mockRestore();
    act(() => r.unmount());
  }
});
