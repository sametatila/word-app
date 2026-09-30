import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { ThemeProvider } from "../src/theme";
import { Slider } from "../src/ui/Slider";
import { snapValue, sliderFraction, valueAt, THUMB } from "../src/lib/slider";
import { barPct } from "../src/ui/Bar";

/**
 * KAYDIRICI (ayarlar › günlük hedef, günde yeni kelime).
 *
 * Cihazda görülen: tutamaç ilk açılışta yerinde değildi (genişlik ölçülene
 * kadar hiç çizilmiyordu), sürüklerken sıçrıyordu (`locationX` parmağın
 * altındaki ÇOCUĞA göre geliyordu) ve bırakınca eski `onCommit` çağrılıyordu
 * (`PanResponder` ilk render'da donuyordu). Test üç sözü tutuyor.
 */

type Node = ReactTestRenderer.ReactTestInstance;

function touchHistory(startX: number, x: number) {
  const t = Date.now();
  return {
    numberActiveTouches: 1,
    indexOfSingleActiveTouch: 0,
    mostRecentTimeStamp: t,
    touchBank: [
      {
        touchActive: true,
        startPageX: startX, startPageY: 0, startTimeStamp: t,
        currentPageX: x, currentPageY: 0, currentTimeStamp: t,
        previousPageX: startX, previousPageY: 0, previousTimeStamp: t,
      },
    ],
  };
}

function mount(props: Partial<React.ComponentProps<typeof Slider>> = {}) {
  const onChange = jest.fn();
  const onCommit = jest.fn();
  const all = { label: "Hedef", value: 35, min: 5, max: 120, step: 5, format: (v: number) => `${v} tekrar`, onChange, onCommit, ...props };
  let r!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    r = ReactTestRenderer.create(
      <ThemeProvider>
        <Slider {...all} />
      </ThemeProvider>,
    );
  });
  const area = r.root.find((n: Node) => n.props.accessibilityRole === "adjustable" && typeof n.props.onResponderGrant === "function");
  return { r, area, onChange, onCommit, all };
}

const thumbLeft = (r: ReactTestRenderer.ReactTestRenderer) =>
  r.root.find((n: Node) => n.props.style && n.props.style.borderRadius === 11 && n.props.style.width === 22).props.style.left;

describe("kaydırıcı hesabı", () => {
  it("ızgaraya min'den oturtuyor ve sınırlıyor", () => {
    expect(snapValue(12, 5, 120, 5)).toBe(10);
    expect(snapValue(13, 5, 120, 5)).toBe(15);
    expect(snapValue(500, 5, 120, 5)).toBe(120);
    expect(snapValue(-3, 0, 40, 1)).toBe(0);
    expect(snapValue(7, 2, 20, 5)).toBe(7);
    expect(snapValue(NaN, 5, 120, 5)).toBe(5);
  });

  it("konum tutamaç merkezinin ekseninde", () => {
    const w = 322; // yol 300
    expect(valueAt(THUMB / 2, w, 0, 100, 1)).toBe(0);
    expect(valueAt(0, w, 0, 100, 1)).toBe(0);
    expect(valueAt(w - THUMB / 2, w, 0, 100, 1)).toBe(100);
    expect(valueAt(THUMB / 2 + 150, w, 0, 100, 1)).toBe(50);
    expect(valueAt(50, 0, 0, 100, 1)).toBeNull();
    expect(sliderFraction(35, 5, 120)).toBeCloseTo(30 / 115);
  });
});

describe("<Slider>", () => {
  it("tutamaç ilk karede, ölçüm olmadan yerinde", () => {
    const { r } = mount({ value: 35 });
    expect(thumbLeft(r)).toBe(`${(30 / 115) * 100}%`);
  });

  it("ızgara dışı değer ızgarada gösteriliyor", () => {
    const { r } = mount({ value: 12 });
    expect(thumbLeft(r)).toBe(`${(5 / 115) * 100}%`);
  });

  it("sürükleme başlangıç + dx ile, bırakınca SON onCommit", () => {
    const { r, area, onChange, all } = mount({ value: 5, min: 0, max: 100, step: 1 });
    act(() => area.props.onLayout({ nativeEvent: { layout: { x: 0, y: 0, width: 322, height: 22 } } }));
    act(() => {
      area.props.onResponderGrant({ nativeEvent: { locationX: THUMB / 2 + 30, pageX: 100, touches: [] }, touchHistory: touchHistory(100, 100) });
    });
    expect(onChange).toHaveBeenLastCalledWith(10);
    /* Ebeveyn yeni bir onCommit veriyor (ör. `me` indi): bırakma onu çağırmalı. */
    const yeni = jest.fn();
    act(() => {
      r.update(
        <ThemeProvider>
          <Slider {...all} value={10} min={0} max={100} step={1} onCommit={yeni} />
        </ThemeProvider>,
      );
    });
    const area2 = r.root.find((n: Node) => n.props.accessibilityRole === "adjustable" && typeof n.props.onResponderGrant === "function");
    act(() => {
      area2.props.onResponderMove({ nativeEvent: { locationX: 3, pageX: 190, touches: [] }, touchHistory: touchHistory(100, 190) });
    });
    // 30 + 90 px = 120 px → %40; `locationX` (3, bir çocuğa göre) kullanılmadı.
    expect(onChange).toHaveBeenLastCalledWith(40);
    act(() => {
      area2.props.onResponderRelease({ nativeEvent: { locationX: 3, pageX: 190, touches: [] }, touchHistory: touchHistory(100, 190) });
    });
    expect(yeni).toHaveBeenCalledWith(40);
    expect(all.onCommit).not.toHaveBeenCalled();
  });
});

describe("çubuk yüzdesi", () => {
  it("sıfır boş, sıfırın üstü en az taban", () => {
    expect(barPct(0)).toBe(0);
    expect(barPct(-5)).toBe(0);
    expect(barPct(NaN)).toBe(0);
    expect(barPct(1)).toBe(3);
    expect(barPct(1, 2)).toBe(2);
    expect(barPct(40)).toBe(40);
    expect(barPct(140)).toBe(100);
  });
});
