import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../src/theme";
import { setLang } from "../src/lib/i18n";
import { StreakMoment, STREAK_MOMENT_MS } from "../src/ui/StreakMoment";

/**
 * SERİ ANI — tur sonunda, sonuçtan önce oynayan kısa sahne.
 *
 * Sahne cihazda ancak günün İLK turu bitince görünüyor; bu yüzden elle
 * denemek zor ve kırılırsa fark edilmesi geç olur. Test üç sözü tutuyor:
 * yeni seri sayısı ve başlık doğru dilde yazılı, sahne süresi dolunca
 * kendiliğinden geçiyor (sonuç ekranı açılsın), ve dokununca HEMEN geçiyor.
 */

jest.mock("../src/lib/haptics", () => ({ haptic: jest.fn(), vibrate: jest.fn() }));

const metrics = { frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } };

function mount(streak: number, onDone: () => void) {
  let r!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    r = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={metrics}>
        <ThemeProvider>
          <StreakMoment streak={streak} onDone={onDone} />
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  return r;
}

const texts = (r: ReactTestRenderer.ReactTestRenderer) =>
  r.root.findAll((n) => typeof n.props.children === "string").map((n) => n.props.children as string);

beforeEach(() => {
  jest.useFakeTimers();
  setLang("tr");
});
afterEach(() => jest.useRealTimers());

test("yeni seri sayısını ve başlığı yazıyor, süre dolunca kendiliğinden geçiyor", () => {
  const onDone = jest.fn();
  const r = mount(5, onDone);
  const all = texts(r).join(" | ");
  expect(all).toContain("5");
  expect(all).toMatch(/günlük seri/);
  expect(onDone).not.toHaveBeenCalled();
  act(() => { jest.advanceTimersByTime(STREAK_MOMENT_MS + 50); });
  expect(onDone).toHaveBeenCalledTimes(1);
  act(() => r.unmount());
});

test("dokununca hemen geçiyor ve süre dolunca ikinci kez çağırmıyor", () => {
  const onDone = jest.fn();
  const r = mount(3, onDone);
  const pressable = r.root.find((n) => typeof n.props.onPress === "function");
  act(() => { pressable.props.onPress(); });
  expect(onDone).toHaveBeenCalledTimes(1);
  act(() => { jest.advanceTimersByTime(STREAK_MOMENT_MS + 50); });
  expect(onDone).toHaveBeenCalledTimes(1);
  act(() => r.unmount());
});
