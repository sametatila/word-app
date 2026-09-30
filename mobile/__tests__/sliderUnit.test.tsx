import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { t, setLang } from "../src/lib/i18n";
import { ThemeProvider } from "../src/theme";
import { Slider } from "../src/ui/Slider";
import { PROFILE_LIMITS } from "../src/lib/profileDefaults";

/**
 * AYAR KAYDIRICILARININ BİRİMİ (2026-09-30, Samet: "40 tekrar" bazen yalnız
 * "40").
 *
 * İki kök neden: birim sayıdan ayrı bir sözcüktü (tekil biçim yok: "1 words",
 * "1 Wörter") ve değer metni satırda sıkışınca "40 / tekrar" diye bölünüp
 * birimi alt satıra düşürüyordu. Test her iki kaydırıcının HER değerinde
 * birimin sayıyla birlikte, doğru biçimde yazıldığını ve değer metninin
 * bölünemediğini tutuyor.
 */
const CASES: [lang: "tr" | "en" | "de", key: string, n: number, want: string][] = [
  ["tr", "settings.reviews_n", 1, "1 tekrar"],
  ["tr", "settings.reviews_n", 40, "40 tekrar"],
  ["tr", "settings.words_n", 1, "1 kelime"],
  ["en", "settings.reviews_n", 1, "1 review"],
  ["en", "settings.reviews_n", 40, "40 reviews"],
  ["en", "settings.words_n", 0, "0 words"],
  ["en", "settings.words_n", 1, "1 word"],
  ["de", "settings.reviews_n", 1, "1 Wiederholung"],
  ["de", "settings.reviews_n", 40, "40 Wiederholungen"],
  ["de", "settings.words_n", 1, "1 Wort"],
  ["de", "settings.words_n", 15, "15 Wörter"],
];

describe("kaydırıcı birimi", () => {
  it.each(CASES)("%s %s %d → %s", async (lang, key, n, want) => {
    await setLang(lang);
    expect(t(key, { n })).toBe(want);
  });

  it("her dilde, iki kaydırıcının bütün değerlerinde birim var", async () => {
    for (const lang of ["tr", "en", "de"] as const) {
      await setLang(lang);
      const sets: [string, { min: number; max: number }][] = [
        ["settings.reviews_n", PROFILE_LIMITS.dailyGoal],
        ["settings.words_n", PROFILE_LIMITS.newPerDay],
      ];
      for (const [key, { min, max }] of sets) {
        for (let n = min; n <= max; n++) {
          const s = t(key, { n });
          /* Sayı + boşluk + en az bir harf: birim düşmemiş, anahtar adı da değil. */
          expect(s).toMatch(new RegExp(`^${n} \\p{L}+$`, "u"));
        }
      }
    }
  });

  it("değer metni bölünmez boşlukla ve tek satırda çiziliyor", async () => {
    await setLang("tr");
    let r!: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      r = ReactTestRenderer.create(
        <ThemeProvider>
          <Slider label="Günlük tekrar hedefi" value={40} min={5} max={120} step={5} format={(n) => t("settings.reviews_n", { n })} onChange={() => {}} onCommit={() => {}} />
        </ThemeProvider>,
      );
    });
    const deger = r.root.findAll((n) => n.props.numberOfLines === 1 && n.props.children === "40 tekrar");
    expect(deger.length).toBeGreaterThan(0);
  });
});
