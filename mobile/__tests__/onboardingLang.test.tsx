import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../src/theme";
import { ContentColumn } from "../src/ui/ContentColumn";
import { OnboardingScreen } from "../src/screens/OnboardingScreen";
import { setLang, t } from "../src/lib/i18n";

/**
 * DİL SEÇİMİ AKIŞI BAŞA ATMIYOR (kapalı test geri bildirimi, 2026-10-03).
 *
 * Dil seçmek arayüz dilini değiştiriyor; `ContentColumn` dil değişince ekranı
 * baştan kuruyor (`key={lang}`). Onboarding'in adım ve seçimleri o anda
 * sıfırlanıyor, cihaz dilinden farklı dil seçen kullanıcı karşılamaya dönüyordu.
 */

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ reset: jest.fn(), navigate: jest.fn() }),
  useFocusEffect: () => {},
}));
jest.mock("../src/lib/track", () => ({ track: jest.fn() }));

const texts = (r: ReactTestRenderer.ReactTestRenderer) =>
  r.root.findAll((n) => typeof n.props.children === "string").map((n) => n.props.children as string);

/** "Devam" (`PrimaryButton label=common.continue`). */
function next(r: ReactTestRenderer.ReactTestRenderer) {
  const el = r.root.findAll((n) => typeof n.type !== "string" && n.props.label === t("common.continue") && typeof n.props.onPress === "function")[0];
  act(() => { el.props.onPress(); });
}

test("dil adımında başka dil seçilince akış dil adımında kalıyor ve seçim duruyor", async () => {
  await act(async () => { await setLang("tr"); });
  let r!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    r = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 375, height: 667 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        <ThemeProvider>
          <ContentColumn><OnboardingScreen /></ContentColumn>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  expect(texts(r)).toContain(t("onboarding.welcome_to_lernomi"));
  next(r); // karşılama → dil adımı
  expect(texts(r)).toContain(t("onboarding.which_language_should_we_teach"));
  // İngilizce seç: arayüz İngilizceye geçer, ekran yeniden kurulur.
  await act(async () => {
    const el = r.root.findAll((n) => typeof n.type !== "string" && n.props.accessibilityRole === "radio" && typeof n.props.onPress === "function")
      .find((n) => n.findAll((c) => c.props.children === "English").length > 0)!;
    el.props.onPress();
  });
  // Hâlâ dil adımı (artık İngilizce metinle), karşılama DEĞİL; seçim işaretli.
  expect(texts(r)).toContain(t("onboarding.which_language_should_we_teach"));
  expect(texts(r)).not.toContain(t("onboarding.welcome_to_lernomi"));
  const english = r.root.findAll((n) => typeof n.type !== "string" && n.props.accessibilityRole === "radio")
    .find((n) => n.findAll((c) => c.props.children === "English").length > 0)!;
  expect(english.props.accessibilityState).toEqual({ selected: true });
  await act(async () => { await setLang("tr"); });
});
