import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "../src/theme";
import { AuthProvider } from "../src/lib/AuthContext";
import { MockExamScreen } from "../src/screens/MockExamScreen";
import { MockExamsScreen } from "../src/screens/MockExamsScreen";
import { isOpenTask, taskSeconds, type MockPart, type MockSkill } from "../src/data/exams";

/**
 * Deneme sınavı ekranları.
 *
 * BU DOSYA KÜÇÜLDÜ VE SEBEBİ İYİ BİR SEBEP. Eskiden burada kâğıtların kendisi
 * denetleniyordu — madde numaraları, süre toplamları, cevap karşılaştırması —
 * çünkü mobil kâğıtları KENDİ PAKETİNDE taşıyordu ve dökümün unutulması
 * sessizce eski içerikle çalışmak demekti.
 *
 * Kâğıtlar artık pakette değil: sunucudan, yetki kontrolünden geçtikten sonra
 * ve cevap anahtarı çıkarılmış hâlde iniyor (`src/lib/mock-exams/deliver`).
 * Dolayısıyla denetlenecek bir paket de yok; kâğıdın doğrulayıcısı tek yerde
 * kaldı (`npm run test:mock-exams`) ve orada teslim edilen gövdede anahtar
 * kalmadığını da ölçen bir kapı var.
 *
 * Geriye bu dosyanın asıl işi kaldı: EKRANLAR ÇİZİLİYOR MU. Dört bölümün dört
 * ayrı çizim yolu var (okuma metin kartları, dinleme oynatma düğmesi, yazma
 * serbest metin alanı, konuşma yalnız ölçüt listesi) ve bir çizim kazası tip
 * denetiminden geçip yayına çıkabiliyor.
 */

// Ekran açılır açılmaz yönergeyi sesli okuyor ve konuşma görevinde mikrofonu
// açıyor. İkisi de gerçek cihaz işi; testte sahtesi kullanılıyor, yoksa
// tanıyıcının ve sentezleyicinin zamanlayıcıları testten sonra da yaşıyor.
jest.mock("../src/lib/tts", () => ({
  speakAndWaitVoiced: jest.fn(async () => {}),
  speakTarget: jest.fn(),
  ttsAvailable: jest.fn(async () => false),
}));
jest.mock("../src/lib/stt", () => ({
  ensureMicPermission: jest.fn(async () => false),
  sttAvailable: jest.fn(async () => false),
  listenOnce: jest.fn(async () => null),
  stopListening: jest.fn(),
}));

/**
 * Kâğıt sunucudan geliyor; testte sahte bir bölüm veriliyor.
 *
 * Fikstür ELLE YAZILI ve bilerek küçük: amacı kâğıdı denetlemek değil, dört
 * çizim yolunu da bir kez çalıştırmak. Gerçek kâğıdın doğrulayıcısı sunucuda.
 */
function mockFixturePart(skill: MockSkill): MockPart {
  const base = { id: `t-${skill}`, no: 1, goal: "test", prompt: "Aufgabe", promptTr: "Görev" };
  if (skill === "reading") {
    return {
      skill, minutes: 20, instruction: "Lesen Sie.", instructionTr: "Okuyun.",
      tasks: [{
        ...base, format: "mcq",
        texts: [{ kind: "text", id: "s1", genre: "Anzeige", genreTr: "İlan", body: "Das Café öffnet um acht." }],
        items: [{ id: "i1", no: 1, kind: "mcq", text: "Wann öffnet das Café?", options: ["Acht", "Neun"] }],
      }],
    };
  }
  if (skill === "listening") {
    return {
      skill, minutes: 15, instruction: "Hören Sie.", instructionTr: "Dinleyin.",
      tasks: [{
        ...base, format: "truefalse",
        texts: [{ kind: "audio", id: "a1", genre: "Durchsage", genreTr: "Anons", situation: "Bahnhof", plays: 2, segments: [{ text: "Der Zug fällt aus." }] }],
        items: [{ id: "i1", no: 1, kind: "bool", text: "Der Zug fährt." }],
      }],
    };
  }
  if (skill === "writing") {
    return {
      skill, minutes: 20, instruction: "Schreiben Sie.", instructionTr: "Yazın.",
      tasks: [{ ...base, format: "writing", items: [], rubric: { minWords: 40, points: [{ de: "Anrede", tr: "Hitap" }], sample: "Sehr geehrte Damen und Herren,", criteria: ["Anrede"] } }],
    };
  }
  return {
    skill, minutes: 15, instruction: "Sprechen Sie.", instructionTr: "Konuşun.",
    tasks: [{ ...base, format: "speaking", speakSeconds: 90, items: [], rubric: { minutes: 2, points: [{ de: "Vorstellung", tr: "Tanıtım" }], sample: "Ich heiße …", criteria: ["Vorstellung"] } }],
  };
}

const mockPaperFor = (skill: MockSkill) => ({
  id: "de-b1-01", no: 1, level: "B1" as const, course: "de" as const,
  theme: "Arbeit und Alltag", themeTr: "İş ve gündelik hayat",
  part: mockFixturePart(skill),
});

/* `mock` öneki ZORUNLU: jest, sahte modül fabrikasının dışarıdaki
   değişkenlere erişmesine yalnız bu önekle izin veriyor (başlatılmamış
   değişken tuzağına karşı). */
let mockWantedSkill: MockSkill = "reading";
jest.mock("../src/game/mockExam", () => {
  const real = jest.requireActual("../src/game/mockExam");
  return {
    ...real,
    fetchMockPaper: jest.fn(async () => ({ paper: mockPaperFor(mockWantedSkill) })),
    startAttempt: jest.fn(async () => ({ attempt: null, resumed: false, paper: mockPaperFor(mockWantedSkill) })),
    fetchMockAccess: jest.fn(async () => ({ premium: false, unlocked: ["de-b1-01"], packs: [], unlockPct: 60, unlockOnComplete: true, freeLimit: 1 })),
    fetchMockStats: jest.fn(async () => null),
  };
});

// Künye içerik hattından geliyor; testte ağ yok, boş liste dönmesi yeterli:
// liste ekranı boş durumu da çizebilmeli.
jest.mock("../src/content/mockCatalog", () => ({
  ...jest.requireActual("../src/content/mockCatalog"),
  mockCatalogFor: jest.fn(async () => []),
}));

const Stack = createNativeStackNavigator();

function Harness({ name, component, params }: { name: string; component: React.ComponentType<any>; params?: object }) {
  return (
    <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 47, left: 0, right: 0, bottom: 34 } }}>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name={name} component={component} initialParams={params} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

async function render(el: React.ReactElement) {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => { tree = ReactTestRenderer.create(el); });
  expect(tree!.toJSON()).toBeTruthy();
  await ReactTestRenderer.act(async () => { tree!.unmount(); });
}

describe("deneme sınavı ekranları", () => {
  it("liste ekranı çiziliyor", async () => {
    await render(<Harness name="MockExams" component={MockExamsScreen} />);
  });

  it.each(["reading", "listening", "writing", "speaking"] as const)("%s bölümü çiziliyor", async (skill) => {
    mockWantedSkill = skill;
    await render(<Harness name="MockExam" component={MockExamScreen} params={{ paperId: "de-b1-01", skill }} />);
  });
});

describe("görev süreleri", () => {
  /*
    Süre bölüştürme kuralı `src/lib/mock-exams/types.ts` `taskSeconds` ile aynı
    ve ikisi ayrılırsa oynatıcının saati kâğıdın kendi süresiyle çelişir. Kural
    kâğıda değil hesaba ait, o yüzden kâğıtlar gidince de burada kalıyor.
  */
  it("görev süreleri bölümün süresini tam dolduruyor", () => {
    for (const skill of ["reading", "listening", "writing", "speaking"] as const) {
      const part = mockFixturePart(skill);
      const secs = taskSeconds(part);
      expect(secs.reduce((a, x) => a + x, 0)).toBe(part.minutes * 60);
    }
  });

  it("yazma ve konuşma görevleri açık uçlu sayılıyor", () => {
    expect(isOpenTask(mockFixturePart("writing").tasks[0])).toBe(true);
    expect(isOpenTask(mockFixturePart("speaking").tasks[0])).toBe(true);
    expect(isOpenTask(mockFixturePart("reading").tasks[0])).toBe(false);
  });
});
