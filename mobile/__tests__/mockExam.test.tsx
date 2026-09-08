import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "../src/theme";
import { AuthProvider } from "../src/lib/AuthContext";
import { MockExamScreen } from "../src/screens/MockExamScreen";
import { MockExamsScreen } from "../src/screens/MockExamsScreen";
import { isOpenTask, mockPapersFor, mockPaperById, partPoints, taskSeconds } from "../src/data/exams";
import { foldAnswer, isItemCorrect, offlineScore } from "../src/game/mockExam";

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
  it("her seviyede eşit sayıda kâğıt var ve numaralar boşluksuz", () => {
    const counts = new Set<number>();
    for (const level of LEVELS) {
      const nos = mockPapersFor(COURSE, level).map((p) => p.no);
      expect(nos.length).toBeGreaterThanOrEqual(2);
      expect(nos).toEqual(nos.map((_, i) => i + 1));
      counts.add(nos.length);
    }
    // Seviyelerden biri geride kalırsa o seviyedeki öğrenci daha az deneme
    // görür ve ilerlemesi ötekilerle kıyaslanamaz.
    expect(counts.size).toBe(1);
  });

  it("kâğıtlar dört bölümlü ve süre toplamı tutuyor", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        expect(p.parts.map((x) => x.skill)).toEqual(["reading", "listening", "writing", "speaking"]);
        expect(p.parts.reduce((a, x) => a + x.minutes, 0)).toBe(p.minutes);
      }
    }
  });

  it("aynı seviyedeki kâğıtlar aynı planda — yoksa puanlar kıyaslanamaz", () => {
    for (const level of LEVELS) {
      const [first, ...rest] = mockPapersFor(COURSE, level);
      for (const other of rest) {
        expect(other.parts.map(partPoints)).toEqual(first.parts.map(partPoints));
        expect(other.parts.map((x) => x.minutes)).toEqual(first.parts.map((x) => x.minutes));
        expect(other.parts.map((x) => x.tasks.length)).toEqual(first.parts.map((x) => x.tasks.length));
      }
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

  it("görev süreleri bölümün süresini tam dolduruyor", () => {
    // Dijital oturumda saat görev başına işliyor; toplam kâğıtta yazan süreyle
    // çelişemez, yoksa öğrencinin gördüğü süre kâğıdın süresi olmaz.
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        for (const part of p.parts) {
          const secs = taskSeconds(part);
          expect(secs).toHaveLength(part.tasks.length);
          expect(secs.reduce((a, x) => a + x, 0)).toBe(part.minutes * 60);
          expect(Math.min(...secs)).toBeGreaterThanOrEqual(60);
        }
      }
    }
  });

  it("konuşma görevleri fazlı ve karşılıklı olanlarda adımlar var", () => {
    for (const level of LEVELS) {
      for (const p of mockPapersFor(COURSE, level)) {
        const part = p.parts.find((x) => x.skill === "speaking")!;
        for (const task of part.tasks) {
          expect(task.prepSeconds).toBeGreaterThan(0);
          if (task.goal === "production") {
            expect(task.speakSeconds).toBeGreaterThan(0);
          } else {
            const ex = task.exchange ?? [];
            expect(ex.length).toBeGreaterThan(0);
            // Konuşmayı açan sınavda hep karşı taraftır.
            expect(ex[0].who).toBe("partner");
            const mine = ex.filter((x) => x.who === "you");
            expect(mine.length).toBeGreaterThanOrEqual(2);
            for (const turn of mine) {
              if (turn.who !== "you") continue;
              expect(turn.hint.trim()).toBeTruthy();
              expect(turn.expect.trim()).toBeTruthy();
              expect(turn.seconds).toBeGreaterThanOrEqual(15);
              expect(turn.seconds).toBeLessThanOrEqual(120);
            }
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

/* ── puanlama ─────────────────────────────────────────────────────────────── */

describe("cevap karşılaştırma", () => {
  // Bu kural `src/lib/mock-exams/scoring.ts` içindeki `foldAnswer` ile aynı.
  // İkisi ayrılırsa öğrenci ekranda doğru görünen bir cevabın sunucuda yanlış
  // sayıldığını görür; testin ölçtüğü şey tam bu.
  it.each([
    ["Straße", "strasse"],
    ["Gartenstraße 21", "gartenstrasse 21"],
    ["  Zwei   Jahresgehälter ", "zwei jahresgehaelter"],
    ["04.03.1990", "04 03 1990"],
    ["Bezug nehmend auf", "bezug nehmend auf"],
  ])("%s → %s", (raw, folded) => {
    expect(foldAnswer(raw)).toBe(folded);
  });

  it("boşluk maddesi kabul listesindeki her biçimi kabul ediyor", () => {
    const paper = mockPaperById("de-a1-01")!;
    const part = paper.parts.find((p) => p.skill === "writing")!;
    const gap = part.tasks[0].items.find((i) => i.kind === "gap")!;
    if (gap.kind !== "gap") return;
    for (const ok of gap.accept) expect(isItemCorrect(gap, ok)).toBe(true);
    expect(isItemCorrect(gap, "")).toBe(false);
    expect(isItemCorrect(gap, "kesinlikle yanlış")).toBe(false);
  });

  it("boş bırakılan madde her zaman yanlış", () => {
    const paper = mockPaperById("de-b1-01")!;
    const part = paper.parts.find((p) => p.skill === "reading")!;
    const s = offlineScore(part, {});
    expect(s.correct).toBe(0);
    expect(s.total).toBe(part.tasks.filter((t) => !isOpenTask(t)).reduce((a, t) => a + t.items.length, 0));
    expect(s.passed).toBe(false);
  });

  it("tamamı doğru cevaplanınca puan yüz", () => {
    const paper = mockPaperById("de-a2-01")!;
    const part = paper.parts.find((p) => p.skill === "listening")!;
    const answers: Record<string, string> = {};
    for (const task of part.tasks) {
      for (const it of task.items) {
        if (it.kind === "mcq") answers[it.id] = String(it.answer);
        else if (it.kind === "bool") answers[it.id] = it.answer ? "true" : "false";
        else if (it.kind === "match") answers[it.id] = it.answer;
        else answers[it.id] = it.accept[0];
      }
    }
    const s = offlineScore(part, answers);
    expect(s.pct).toBe(100);
    expect(s.passed).toBe(true);
    // Hedef kırılımı da dolu olmalı: zayıf beceriyi gösteren tek yer orası.
    expect(s.byGoal.length).toBeGreaterThan(0);
  });
});
