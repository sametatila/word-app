import { Platform } from "react-native";
import { api } from "../src/api/client";
import { buildReportBody, reasonsFor, reportContext, sendReport, snapshotText, targetRef } from "../src/lib/report";
import { roundReport } from "../src/game/roundReport";
import { setCurrentCourse } from "../src/lib/courses";
import { setLang } from "../src/lib/i18n";
import { APP_VERSION, APP_VERSION_CODE } from "../src/version";
import type { Round } from "../src/game/session";

/**
 * İÇERİK BİLDİRİMİ — tel sözleşmesi (`docs/plan/content-feedback.md`).
 *
 * Sessiz kırılabilen üç yer:
 *  1. Eski gövde (`{kind, ref, reason, content}`) AYNEN gitmeli: kurulu sunucu
 *     yalnız onu okuyor; yapay zekâ bildirimleri (sohbet, değerlendirme) ve
 *     kullanıcı şikâyeti değişmemeli.
 *  2. İçerik bildiriminin `ref`i hedeften türüyor ve panel aynı hedefe gelenleri
 *     onunla grupluyor: biçim kayarsa gruplar dağılır.
 *  3. Bağlam (platform, sürüm, kurs, anadil, içerik sürümü) panelin süzgeci.
 */
jest.mock("../src/api/client", () => ({ api: jest.fn(), fetchWithTimeout: jest.fn(), apiBase: () => "https://www.lernomi.app", onBaseChange: () => () => {}, PRIMARY_BASE: "https://www.lernomi.app", FALLBACK_BASE: "https://lernomi.rumpuskit.com" }));
jest.mock("../src/content/store", () => ({ contentRelease: jest.fn(() => 123) }));

const apiMock = api as jest.MockedFunction<typeof api>;
const lastBody = () => JSON.parse(String((apiMock.mock.calls.at(-1)?.[1] as { body: string }).body));

beforeEach(() => {
  apiMock.mockReset();
  setCurrentCourse("de");
});

test("hedefin ref'i: type:id[:sub]", () => {
  expect(targetRef({ type: "word", id: "42", game: "choice" })).toBe("word:42");
  expect(targetRef({ type: "exercise", id: "de-a1-r-001", sub: "3" })).toBe("exercise:de-a1-r-001:3");
  expect(targetRef({ type: "exam_item", id: "g-12", sub: "module:A1:2" })).toBe("exam_item:g-12:module:A1:2");
});

test("bağlam: platform, 'sürüm (kod)', kurs, anadil, içerik sürümü", () => {
  const restore = jest.replaceProperty(Platform, "OS", "android");
  try {
    const ctx = reportContext();
    expect(ctx).toMatchObject({ platform: "android", appVersion: `${APP_VERSION} (${APP_VERSION_CODE})`, course: "de", contentVersion: 123 });
    expect(["tr", "en", "de"]).toContain(ctx.nativeLang);
  } finally {
    restore.restore();
  }
});

test("içerik gövdesi: eski dört alan + surface, target, detail, context", () => {
  const body = buildReportBody("content", "word:42", "typo", "x".repeat(5000), {
    surface: "round",
    target: { type: "word", id: "42", game: "choice" },
    detail: `  ${"d".repeat(700)}  `,
  });
  expect(body).toMatchObject({ kind: "content", ref: "word:42", reason: "typo", surface: "round", target: { type: "word", id: "42", game: "choice" } });
  expect((body.content as string).length).toBe(4000);
  expect((body.detail as string).length).toBe(500);
  expect(body.context).toMatchObject({ course: "de", contentVersion: 123 });
});

test("içerik bildiriminde ref hedeften türüyor", () => {
  const body = buildReportBody("content", "eski", "unclear", "", { surface: "exam", target: { type: "exam_item", id: "g-1", sub: "level:A2" } });
  expect(body.ref).toBe("exam_item:g-1:level:A2");
});

test("boş ayrıntı gönderilmiyor", () => {
  const body = buildReportBody("content", "word:1", "other", "", { surface: "words", target: { type: "word", id: "1" }, detail: "   " });
  expect(body).not.toHaveProperty("detail");
});

test("eski yapay zekâ bildirimi: aynı dört alan, yeni hedef alanı yok", async () => {
  apiMock.mockResolvedValueOnce({ ok: true });
  expect(await sendReport("chat", "conv-1:3", "offensive", "yanıt")).toBe("ok");
  expect(apiMock.mock.calls.at(-1)?.[0]).toBe("/api/reports");
  const body = lastBody();
  expect(body).toMatchObject({ kind: "chat", ref: "conv-1:3", reason: "offensive", content: "yanıt" });
  expect(body).not.toHaveProperty("target");
  expect(body).not.toHaveProperty("surface");
  expect(body).not.toHaveProperty("context");
  expect(Object.keys(body).sort()).toEqual(["content", "kind", "reason", "ref"]);
});

test("kullanıcı şikâyeti sosyal uca gidiyor (değişmedi)", async () => {
  apiMock.mockResolvedValueOnce(null);
  expect(await sendReport("user", "u-9", "spam", "ad")).toBe("ok");
  expect(apiMock.mock.calls.at(-1)?.[0]).toBe("/api/social/reports");
  expect(lastBody()).toEqual({ userId: "u-9", reason: "spam", detail: "ad" });
});

test("mükerrer ve hata ayrı sonuçlar", async () => {
  apiMock.mockResolvedValueOnce({ ok: true, duplicate: true });
  expect(await sendReport("content", "word:1", "typo", "", { target: { type: "word", id: "1" } })).toBe("duplicate");
  apiMock.mockRejectedValueOnce(new Error("429"));
  expect(await sendReport("content", "word:1", "typo", "")).toBe("error");
});

test("içerik sebepleri spec sırasında", () => {
  expect(reasonsFor("content").map((r) => r.key)).toEqual(["wrong_answer", "typo", "translation", "audio", "unclear", "technical", "inappropriate", "other"]);
  expect(reasonsFor("chat").map((r) => r.key)).toEqual(["inappropriate", "offensive", "wrong", "other"]);
});

test("kelime turu: hedef kelime + oyun, anlık görüntüde cevaplar", () => {
  const round = {
    id: "r-7", game: "choice", direction: "de-tr",
    word: { id: 42, de: "Haus", artikel: "das", tr: "ev", en: "house", typ: "noun", niveau: "A1", beispiel: null, beispielTr: null, formen: null, isNew: false },
    options: [{ text: "ev", sub: null }, { text: "araba", sub: null }],
  } as Round;
  const r = roundReport(round, "practice", { correct: false, answer: "das Haus", you: "araba" });
  expect(r.surface).toBe("practice");
  expect(r.target).toEqual({ type: "word", id: "42", game: "choice" });
  expect(r.snapshot).toMatchObject({ word: "das Haus", options: ["ev", "araba"], correct: "das Haus", you: "araba", wasCorrect: false });
  expect(snapshotText(r.snapshot)).toContain("\"you\":\"araba\"");
  /* Cevap verilmeden: kullanıcı cevabı yok. */
  expect(roundReport(round, "round", null).snapshot).not.toHaveProperty("you");
});

test("kelime turu: anlam ANADİLDE (ekrandaki satır), Türkçe karşılık sızmıyor", async () => {
  const round = {
    id: "r-8", game: "choice", direction: "de-tr",
    word: { id: 42, de: "Haus", artikel: "das", tr: "ev", en: "house", deGloss: null, typ: "noun", niveau: "A1", beispiel: null, beispielTr: null, formen: null, isNew: false },
    options: [{ text: "house", sub: null }, { text: "car", sub: null }],
  } as Round;
  try {
    await setLang("en");
    const en = roundReport(round, "round", null).snapshot as Record<string, unknown>;
    expect(en.meaning).toBe("house");
    expect(en).not.toHaveProperty("meaningSub");
    expect(JSON.stringify(en)).not.toContain("\"ev\"");
    await setLang("tr");
    expect(roundReport(round, "round", null).snapshot).toMatchObject({ meaning: "ev", meaningSub: "house" });
  } finally {
    await setLang("tr");
  }
});
