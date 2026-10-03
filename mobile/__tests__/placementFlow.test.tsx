import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "../src/theme";
import { PlacementScreen } from "../src/screens/PlacementScreen";
import { setLang, t } from "../src/lib/i18n";
import { loadOnboardingPrefs } from "../src/lib/onboardingPrefs";

/**
 * SEVİYE TESTİ v2 — onboarding akışı uçtan uca (docs/plan/placement-v2.md).
 *
 * Misafir: kapak → kendini değerlendirme → kelime kartları → uyarlanabilir sorular → sonuç
 * (seviye, yapabildikleri, ±1 seçim) → seçilen seviye ve CEVAPLAR onboarding tercihlerine
 * yazılır (hesap açılınca sunucuya gider). "Hiç bilmiyorum" testi atlayıp A1 önerir.
 */

const mockReset = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ reset: mockReset, navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({ params: { onboarding: true } }),
  useFocusEffect: () => {},
}));
jest.mock("../src/lib/AuthContext", () => ({ useAuth: () => ({ user: null }) }));
jest.mock("../src/lib/track", () => ({ track: jest.fn() }));
jest.mock("../src/lib/sfx", () => ({ sfx: jest.fn() }));
jest.mock("../src/lib/haptics", () => ({ haptic: jest.fn() }));
jest.mock("../src/lib/tts", () => ({ speakTarget: jest.fn(), stopSpeaking: jest.fn() }));

const texts = (r: ReactTestRenderer.ReactTestRenderer) =>
  r.root.findAll((n) => typeof n.props.children === "string").map((n) => n.props.children as string);

const pressable = (r: ReactTestRenderer.ReactTestRenderer, label: string) =>
  r.root.findAll((n) => typeof n.type !== "string" && typeof n.props.onPress === "function"
    && (n.props.label === label || n.findAll((c) => c.props.children === label).length > 0))[0];

function press(r: ReactTestRenderer.ReactTestRenderer, label: string) {
  const el = pressable(r, label);
  if (!el) throw new Error(`düğme yok: ${label}`);
  act(() => { el.props.onPress(); });
}

function mount() {
  let r!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    r = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 375, height: 667 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        <ThemeProvider>
          <PlacementScreen />
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  return r;
}

beforeEach(async () => {
  jest.useFakeTimers();
  await AsyncStorage.clear();
  await act(async () => { await setLang("tr"); });
});
afterEach(() => { jest.useRealTimers(); });

test("akış sonuca varıyor; seviye ve cevaplar onboarding tercihlerine yazılıyor", async () => {
  const r = mount();
  expect(texts(r)).toContain(t("plc2.cover_title"));
  press(r, t("common.start"));
  expect(texts(r)).toContain(t("plc2.self_title"));
  press(r, t("plc2.self_B1"));
  // Kelime kartları: hepsine "Biliyorum" (gerçek ya da uydurma, hangisi geldiyse).
  let guard = 0;
  while (texts(r).includes(t("plc2.cards_title")) && guard++ < 60) press(r, t("plc2.know"));
  expect(guard).toBeGreaterThan(30);
  // Sorular: hepsine "Bilmiyorum" — test durup sonucu vermeli (en çok 15 soru).
  let n = 0;
  while (!texts(r).includes(t("plc2.cando_title") + " · A1") && n++ < 20) {
    press(r, t("plc.dont_know"));
  }
  expect(n).toBeLessThanOrEqual(15);
  // Hep "bilmiyorum" diyen biri A1 çıkmalı ve "bu seviyede" listesi görünmeli.
  expect(texts(r)).toContain(t("placement.your_level", { level: "A1" }));
  expect(texts(r)).toContain(t("plc2.cando_A1_1"));
  // ±1 seçimi: A1'in üstü A2 sunuluyor.
  expect(texts(r)).toContain(t("plc2.adjust_higher", { level: "A2" }));
  press(r, t("plc2.adjust_higher", { level: "A2" }));
  await act(async () => { pressable(r, t("plc2.start_with", { level: "A2" })).props.onPress(); });
  const prefs = await loadOnboardingPrefs();
  expect(prefs.level).toBe("A2");
  expect(prefs.placement?.lang).toBe("de");
  expect(prefs.placement?.self).toBe("B1");
  expect(Object.keys(prefs.placement?.known ?? {}).length).toBe(33);
  expect(prefs.placement?.responses.every((x) => x.choice === "dontknow")).toBe(true);
});

test("“Hiç bilmiyorum” testi atlayıp A1 öneriyor", async () => {
  const r = mount();
  press(r, t("common.start"));
  press(r, t("plc2.self_none"));
  expect(texts(r)).toContain(t("plc2.zero_title"));
  await act(async () => { pressable(r, t("plc2.start_with", { level: "A1" })).props.onPress(); });
  const prefs = await loadOnboardingPrefs();
  expect(prefs.level).toBe("A1");
  expect(prefs.placement).toBeUndefined();
});
