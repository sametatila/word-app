import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "../src/theme";
import { AuthProvider } from "../src/lib/AuthContext";
import { MockExamScreen } from "../src/screens/MockExamScreen";
import { MockExamsScreen } from "../src/screens/MockExamsScreen";
import { mockPapersFor, mockPaperById, partPoints } from "../src/data/exams";

/**
 * Deneme sınavı paketi ve ekranları.
 *
 * NEDEN BURADA DA VAR: kâğıtların asıl doğrulayıcısı web tarafında
 * (`npm run test:mock-exams`) ve kaynağı denetliyor. Mobilin gördüğü şey
 * kaynak değil, `npm run dump:mock-exams` ile üretilen JSON. Döküm
 * unutulursa ya da yarım kalırsa web tarafındaki doğrulama bunu göremez —
 * mobil eski ya da eksik içerikle çalışmaya devam eder ve hiçbir test
 * kırılmaz. Buradaki denetim tam o boşluğu kapatıyor: PAKETİN kendisini
 * ölçüyor.
 */

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const COURSE = "de";

describe("deneme sınavı paketi", () => {
  it("her seviyede iki kâğıt var", () => {
    for (const level of LEVELS) {
      expect(mockPapersFor(COURSE, level).map((p) => p.no)).toEqual([1, 2]);
    }
  });

  it("kâğıtlar dört bölümlü ve süre toplamı tutuyor", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        expect(p.parts.map((x) => x.skill)).toEqual(["reading", "listening", "writing", "speaking"]);
        expect(p.parts.reduce((a, x) => a + x.minutes, 0)).toBe(p.minutes);
      }
    }
  });

  it("aynı seviyedeki iki kâğıt aynı planda — yoksa puanlar kıyaslanamaz", () => {
    for (const level of LEVELS) {
      const [a, b] = mockPapersFor(COURSE, level);
      expect(a.parts.map(partPoints)).toEqual(b.parts.map(partPoints));
      expect(a.parts.map((x) => x.minutes)).toEqual(b.parts.map((x) => x.minutes));
      expect(a.parts.map((x) => x.tasks.length)).toEqual(b.parts.map((x) => x.tasks.length));
    }
  });

  it("madde numaraları bölüm boyunca 1..N kesintisiz", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        for (const part of p.parts) {
          const nos = part.tasks.flatMap((tk) => tk.items.map((i) => i.no));
          expect(nos).toEqual(nos.map((_, i) => i + 1));
        }
      }
    }
  });

  it("her maddede açıklama var ve cevabı çözülebiliyor", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        for (const part of p.parts) {
          for (const task of part.tasks) {
            for (const it of task.items) {
              expect(it.explain.trim().length).toBeGreaterThanOrEqual(20);
              if (it.kind === "mcq") expect(it.options[it.answer]).toBeTruthy();
              if (it.kind === "match") expect(task.options?.some((o) => o.key === it.answer)).toBe(true);
              if (it.kind === "gap") expect(it.accept[0]?.trim()).toBeTruthy();
            }
          }
        }
      }
    }
  });

  it("yazma ve konuşma görevlerinde ölçüt ve örnek cevap var", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        for (const part of p.parts) {
          for (const task of part.tasks) {
            if (task.format !== "writing" && task.format !== "speaking") continue;
            expect(task.rubric?.sample?.trim()).toBeTruthy();
            expect(task.rubric?.criteria.length ?? 0).toBeGreaterThanOrEqual(3);
          }
        }
      }
    }
  });

  it("dinleme kayıtları çalınabilir durumda", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        const listening = p.parts.find((x) => x.skill === "listening")!;
        for (const task of listening.tasks) {
          expect((task.texts ?? []).some((st) => st.kind === "audio")).toBe(true);
          for (const st of task.texts ?? []) {
            // Dinleme bölümündeki YAZILI metin ancak cevap kâğıdı olabilir
            // (C1'in not alma sayfası): boşluk işareti taşımayan bir yazılı
            // metin, dinleme görevine sızmış okuma malzemesi demektir.
            if (st.kind === "text") { expect(/\{\{\d+\}\}/.test(st.body)).toBe(true); continue; }
            expect(st.segments.length).toBeGreaterThan(0);
            expect(st.segments.every((s) => s.text.trim().length > 0)).toBe(true);
            // Gerçek sınavın "bir kez / iki kez" ayrımı; oynatıcı bunu sınır
            // olarak uyguluyor, geçersiz bir sayı düğmeyi kilitlerdi.
            expect([1, 2]).toContain(st.plays);
          }
        }
      }
    }
  });

  it("kurum ve sınav markası hiçbir alanda geçmiyor", () => {
    const brands = /(^|[^\p{L}])(goethe|telc|ösd|oesd|testdaf|dsh|dtz|öif|oeif|modellsatz)($|[^\p{L}])/iu;
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        expect(brands.test(JSON.stringify(p))).toBe(false);
      }
    }
  });
});

/* ── ekranlar ─────────────────────────────────────────────────────────────── */

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

  // Dört bölüm dört ayrı çizim yolu: okuma metin kartları, dinleme oynatma
  // düğmesi, yazma serbest metin alanı, konuşma yalnız ölçüt listesi.
  it.each(["reading", "listening", "writing", "speaking"] as const)("%s bölümü çiziliyor", async (skill) => {
    const paper = mockPaperById("de-b1-01")!;
    expect(paper.parts.some((p) => p.skill === skill)).toBe(true);
    await render(<Harness name="MockExam" component={MockExamScreen} params={{ paperId: paper.id, skill }} />);
  });
});
