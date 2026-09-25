import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "../src/theme";
import { AuthProvider } from "../src/lib/AuthContext";
import { WeeklyScreen } from "../src/screens/WeeklyScreen";
import type { QuizPayload } from "../src/game/weekly";
import { setLang } from "../src/lib/i18n";

/**
 * Haftalık quiz — ANA DİL SÖZLEŞMESİ.
 *
 * Quizin kapağı (tema, tür etiketi) ve açıklamaları (`why`) Türkçe yazılıyor
 * ve SUNUCUDA öğrencinin anadiline çözülüyor (`src/lib/weekly-quiz/native`,
 * `/api/quiz`). Mobilde çözücü YOK ve olmamalı: sözlük quizin cevap
 * gerekçelerini taşıyor ve kapılı pakette duruyor, istemciye hiç inmiyor.
 *
 * Mobilin payına düşen tek şey sunucunun çözdüğü alanları GÖSTERMEK: kapakta
 * `themeTr` (adı tarihsel; artık "anadildeki tema" demek), uyaranda `genreTr`,
 * sonuçta `why`. Ekran bir gün `theme`e (öğrenilen dil) ya da sabit bir
 * Türkçe metne dönerse İngilizce/Almanca arayüzde kapak yine yanlış dilde
 * çıkar ve sunucudaki bütün hat boşa gider. Bu test o sözleşmeyi tutuyor —
 * fikstür, sunucunun İngilizce ve Almanca arayüze gerçekten döndürdüğü
 * dizelerle yazıldı (`data/weekly-quiz/prose/out*`).
 */

jest.mock("../src/lib/tts", () => ({
  ttsAvailable: jest.fn(async () => false),
  loadVoicePref: jest.fn(async () => "de-DE-KatjaNeural"),
  setVoicePref: jest.fn(async () => {}),
  currentVoiceId: jest.fn(() => "de-DE-KatjaNeural"),
  stopSpeaking: jest.fn(),
  speakTarget: jest.fn(),
  speakWithVoice: jest.fn(),
  speakAndWaitVoiced: jest.fn(async () => {}),
  speakDialogue: jest.fn(async () => {}),
  prefetchDialogue: jest.fn(),
  speakAndWait: jest.fn(async () => {}),
}));

/* `mock` öneki jest'in fabrika kuralı: dışarıdaki değişkene yalnız bu önekle erişilebiliyor. */
let mockPayload: QuizPayload;
jest.mock("../src/game/weekly", () => ({
  ...jest.requireActual("../src/game/weekly"),
  fetchQuiz: jest.fn(async () => mockPayload),
}));

const EN = {
  theme: "Sich vorstellen",
  themeTr: "Introductions",
  genre: "Profile text",
  why: 'The text says "Ich komme aus Österreich". Berlin is where she LIVES NOW; where she comes from and where she lives are two separate pieces of information, and the text gives them one after the other.',
};
const DE = {
  theme: "Introductions",
  themeTr: "Sich vorstellen",
  genre: "Steckbrief",
  why: 'Der Text sagt "I am from Ireland". London ist der Ort, an dem sie JETZT lebt; woher sie kommt und wo sie lebt, sind zwei verschiedene Informationen, und der Text nennt beide direkt nacheinander.',
};

function cover(f: typeof EN): QuizPayload {
  return {
    week: "2026-09-21",
    done: false,
    quiz: {
      id: "de-a1-w01",
      theme: f.theme,
      themeTr: f.themeTr,
      level: "A1",
      stimuli: [{ kind: "text", id: "t1", genre: "Profil", genreTr: f.genre, body: "…" }],
      items: [{ id: "de-a1-w01-r1", block: "read", ref: "t1", stem: "Woher kommt Lena?", options: ["A", "B", "C"], targets: [] }],
    },
  };
}

function result(f: typeof EN): QuizPayload {
  return {
    week: "2026-09-21",
    done: true,
    quiz: null,
    score: {
      correct: 0,
      total: 1,
      pct: 0,
      byBlock: [{ block: "read", correct: 0, total: 1 }],
      items: [{ itemId: "de-a1-w01-r1", block: "read", chosen: 0, answer: 2, correct: false, why: f.why, targets: [] }],
      band: "wquiz.band_practice",
    },
  };
}

const Stack = createNativeStackNavigator();

async function textsOf(): Promise<string> {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 47, left: 0, right: 0, bottom: 34 } }}>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Weekly" component={WeeklyScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>,
    );
  });
  const out: string[] = [];
  const walk = (n: unknown): void => {
    if (typeof n === "string") out.push(n);
    else if (Array.isArray(n)) n.forEach(walk);
    else if (n && typeof n === "object" && "children" in n) walk((n as { children: unknown }).children);
  };
  walk(tree!.toJSON());
  await ReactTestRenderer.act(async () => {
    tree!.unmount();
  });
  return out.join("\n");
}

describe.each([
  ["İngilizce arayüz (Almanca kurs)", "en", EN],
  ["Almanca arayüz (İngilizce kurs)", "de", DE],
] as const)("haftalık quiz · %s", (_name, lang, f) => {
  /* Arayüz dili de o dil: ekrandaki TEK bir Türkçe dize (sabit metin ya da
     çözülmemiş içerik) testi kırmızıya çeviriyor. */
  beforeAll(async () => {
    await setLang(lang);
  });
  afterAll(async () => {
    await setLang("tr");
  });

  it("kapak sunucunun çözdüğü temayı gösteriyor, öğrenilen dildekini değil", async () => {
    mockPayload = cover(f);
    const text = await textsOf();
    expect(text).toContain(f.themeTr);
    expect(text).not.toMatch(/[ışğİĞŞ]/);
  });

  it("sonuç dökümü açıklamayı anadilde gösteriyor", async () => {
    mockPayload = result(f);
    const text = await textsOf();
    expect(text).toContain(f.why);
    expect(text).not.toMatch(/[ışğİĞŞ]/);
  });
});
