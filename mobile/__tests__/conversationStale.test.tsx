import React from "react";
import ReactTestRenderer, { act } from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "../src/theme";
import { ConversationScreen } from "../src/screens/ConversationScreen";
import { setLang, t } from "../src/lib/i18n";
import { track } from "../src/lib/track";
import { ensureMicPermission, listenOnce } from "../src/lib/stt";
import type { Conversation } from "../src/data/conversations";

/**
 * KONUŞMA ADIMI: ESKİ ÇİZİMİN KAPANIŞI (2026-10-08).
 *
 * Mikrofon sonucu, dinlemenin başladığı çizimin işleyicisiyle geliyor. Dinlerken
 * yazılan cevap `tries`i artırmış ya da adımı bitirmiş olabiliyor; sonuç state'ten
 * okununca doğru sözlü cevap ilk deneme sayılıyor, adım iki kez puanlanıp sonraki
 * adım iki kez açılıyordu. "Atla" ilerleme beklemesinde basılınca da öyle.
 */

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), replace: jest.fn() }),
  useRoute: () => ({ params: { id: "de-a1-test" } }),
  useFocusEffect: () => {},
}));
jest.mock("../src/lib/AuthContext", () => ({ useAuth: () => ({ user: { id: "u1", guest: false } }) }));
jest.mock("../src/lib/premium", () => ({
  usePremiumStatus: () => ({ status: null, loading: false, refresh: async () => {} }),
  notePremiumGate: jest.fn(),
  refreshPremium: jest.fn(async () => {}),
}));
jest.mock("../src/lib/useAiDeclined", () => ({ useAiDeclined: () => false }));
jest.mock("../src/lib/unlock", () => ({ conversationLocked: () => false, tieredCopy: () => null }));
jest.mock("../src/lib/track", () => ({ track: jest.fn() }));
jest.mock("../src/lib/sfx", () => ({ sfx: jest.fn() }));
jest.mock("../src/lib/haptics", () => ({ haptic: jest.fn() }));
jest.mock("../src/lib/tts", () => ({
  speakTarget: jest.fn(),
  stopSpeaking: jest.fn(),
  currentVoiceId: jest.fn(() => "de-DE-KatjaNeural"),
  speakAndWaitVoiced: jest.fn(async () => {}),
}));
jest.mock("../src/lib/stt", () => ({
  ensureMicPermission: jest.fn(async () => true),
  sttAvailable: jest.fn(async () => true),
  listenOnce: jest.fn(),
  stopListening: jest.fn(),
}));
jest.mock("../src/lib/nativeContent", () => ({ nativeContentReady: () => true, waitNativeContent: async () => {} }));
jest.mock("../src/game/chat", () => ({
  sendChat: jest.fn(async () => "ok"),
  chatAvailability: jest.fn(async () => "ai"),
  parseReply: (r: string) => ({ body: r, corrections: [], suggestions: [] }),
  patternUsed: () => false,
}));
jest.mock("../src/game/pathProgress", () => ({
  markItemDone: jest.fn(async () => {}),
  newFinishId: () => "f1",
  queueConversationResult: jest.fn(async () => {}),
  loadConversationResume: jest.fn(async () => null),
  saveConversationResume: jest.fn(async () => {}),
  clearConversationResume: jest.fn(async () => {}),
}));
const mockConv: Conversation = {
  id: "de-a1-test", level: "A1", course: "de", icon: "x", title: "Test", titleTr: "Test", summary: "", minutes: 1, focusId: "f",
  vocab: [], patterns: [],
  lecture: [
    { say: [{ lang: "de", text: "Wie heißt du?" }], expect: { kind: "produce", target: "Ich heiße Anna", hint: [] } },
    { say: [{ lang: "tr", text: "IKINCI_ADIM" }], expect: { kind: "confirm" } },
  ],
  chat: { scene: "s", partner: "p", opening: "Hallo", openingTr: "Merhaba", goal: "g", minTurns: 1 },
};
jest.mock("../src/data/conversations", () => ({
  findConversation: () => mockConv,
  conversationLevelOf: () => null,
  ensureConversations: async () => true,
  conversationsForLevel: () => [mockConv],
  scoredSteps: () => 1,
}));

const mockListen = listenOnce as jest.Mock;
const mockTrack = track as jest.Mock;

/** Ekrandaki düz metinler (yalnız yerel düğümler: sarmalayıcı bileşen iki kez sayılmasın). */
const flat = (c: unknown): string | null =>
  typeof c === "string" ? c : Array.isArray(c) && c.every((x) => typeof x === "string") ? c.join("").trim() : null;
const texts = (r: ReactTestRenderer.ReactTestRenderer) =>
  r.root.findAll((n) => typeof n.type === "string" && flat(n.props.children) != null).map((n) => flat(n.props.children) as string);
const count = (r: ReactTestRenderer.ReactTestRenderer, s: string) => texts(r).filter((x) => x === s).length;

function pressText(r: ReactTestRenderer.ReactTestRenderer, label: string) {
  const el = r.root.findAll((n) => typeof n.type !== "string" && typeof n.props.onPress === "function"
    && n.findAll((c) => c.props.children === label).length > 0)[0];
  if (!el) throw new Error(`düğme yok: ${label}`);
  act(() => { el.props.onPress(); });
}

/** Yazma satırına yaz ve gönder (iki ayrı çizim: gönderen kapanış güncel metni görsün). */
async function typeAndSend(r: ReactTestRenderer.ReactTestRenderer, text: string) {
  const input = () => r.root.findAll((n) => (n.type as unknown) === "TextInput")[0];
  act(() => { input().props.onChangeText(text); });
  await act(async () => { input().props.onSubmitEditing(); });
}

const tick = (ms = 0) => act(async () => { await new Promise((res) => setTimeout(res, ms)); });

/** Ekranı aç; eller serbest dinlemesi açılıp sonucu bekleyene dek ilerle. */
async function mountListening() {
  let finish!: (v: string[] | null) => void;
  mockListen.mockImplementationOnce(() => new Promise((res) => { finish = res; }));
  let r!: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    r = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 375, height: 667 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        <ThemeProvider>
          <ConversationScreen />
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  for (let i = 0; i < 10 && !mockListen.mock.calls.length; i++) await tick(10);
  expect(mockListen).toHaveBeenCalledTimes(1);
  return { r, finish: (v: string[] | null) => act(async () => { finish(v); }) };
}

const stepEvents = () => mockTrack.mock.calls.filter((c) => c[0] === "conversation_step");

beforeEach(async () => {
  jest.clearAllMocks();
  (ensureMicPermission as jest.Mock).mockImplementation(async () => true);
  await AsyncStorage.clear();
  await act(async () => { await setLang("tr"); });
});

test("dinlerken yazılan yanlış cevaptan sonra gelen doğru sözlü cevap ilk deneme sayılmıyor", async () => {
  const { r, finish } = await mountListening();
  pressText(r, t("conversation.answer_by_typing"));
  await typeAndSend(r, "falsch");
  await finish(["Ich heiße Anna"]);
  expect(stepEvents()).toEqual([["conversation_step", 1, "produce:mic"]]);
  await tick(600);
  expect(count(r, "IKINCI_ADIM")).toBe(1);
  act(() => { r.unmount(); });
});

test("adım bir kez puanlanıyor ve sonraki adım bir kez açılıyor (yazılı doğru + sözlü doğru + atla)", async () => {
  const { r, finish } = await mountListening();
  pressText(r, t("conversation.answer_by_typing"));
  await typeAndSend(r, "Ich heiße Anna");
  await finish(["Ich heiße Anna"]);
  // İlerleme beklemesinde "Atla": hemen geçiyor ama atlama sayılmıyor.
  pressText(r, t("conversationp.skip_step"));
  await tick(600);
  expect(stepEvents()).toEqual([["conversation_step", 2, "produce:typed"]]);
  expect(count(r, "IKINCI_ADIM")).toBe(1);
  act(() => { r.unmount(); });
});

test("izin reddedilince 'duyamadım' denmiyor", async () => {
  (ensureMicPermission as jest.Mock).mockImplementation(async () => false);
  let r!: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    r = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 375, height: 667 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        <ThemeProvider>
          <ConversationScreen />
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  await tick(50);
  expect(texts(r)).toContain(t("speak.mic_needed"));
  expect(texts(r)).not.toContain(t("speak.not_heard"));
  act(() => { r.unmount(); });
});
