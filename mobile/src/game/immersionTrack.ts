/**
 * Patika track'ini CİHAZDA kurar — /api/immersion (henüz canlı değil) yerine.
 *
 * Web'in saf builder'ının (src/lib/immersion/build.ts) mobil karşılığı: aynı
 * slot deseni, aynı 4/2/2/2 + gramer + quiz + kontrol düzeni, aynı modül
 * temaları. Fark: beceri içeriği (read/listen/write) veritabanında ve daha canlı
 * değil; o slotlar "yayına alınınca" olarak işaretlenir (playable:false).
 * Dersler pakette olduğu için oynanabilir. /api/immersion açıldığında
 * useLearningPath onu tercih eder ve gerçek ilerleme/gating gelir.
 */
import { conversationsForLevel } from "../data/conversations";
import { moduleTheme } from "../data/moduleThemes";
import { t } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
import { listPathSkillMeta, type SkillMeta } from "../data/skills";
import type { LearningPath, LearningPathItem, LearningPathUnit } from "../lib/useLearningPath";

const UNIT_CONVERSATIONS = 4;
const GROUP_SIZE = 10;
const MODULE_SIZE = 10;

/** Her ünitenin deseni: 4 ders + 2 okuma + 2 dinleme + 2 yazma + gramer + quiz + kontrol. */
const BASE_PATTERN = ["conversation", "read", "conversation", "listen", "conversation", "write", "conversation", "read", "listen", "write"] as const;
function slotPlan(): string[] { return [...BASE_PATTERN, "grammar", "quiz", "checkpoint"]; }

/** Slot başlıkları çeviriden; `sub` Patika kartındaki ikinci satır. */
const SKILL_KEY: Record<string, string> = { read: "unitkind.read", listen: "unitkind.listen", write: "unitkind.write" };
const SLOT_KEY: Record<string, { title: string; sub: string }> = {
  grammar: { title: "unitkind.grammar", sub: "path.slot_grammar_sub" },
  quiz: { title: "unitkind.quiz", sub: "path.slot_quiz_sub" },
  checkpoint: { title: "path.slot_checkpoint", sub: "path.slot_checkpoint_sub" },
};


function unitTheme(level: string, firstConversationIndex: number, unitIndex: number): string {
  const theme = moduleTheme(currentCourseId(), level, Math.floor(firstConversationIndex / MODULE_SIZE));
  return theme || t("path.unit_fallback", { level: level, n: unitIndex });
}

/**
 * Cihazda kurulan Patika. `done` seti biten ders id'leri (yerel + sunucu).
 * Gating YOK: sunucu ilerlemesi olmadan kilit yanıltıcı olur ve kullanıcıyı
 * ilk ünitede kilitler; onun yerine hepsi açık, ilerleme derse göre.
 */
export function buildLocalLearningPath(level: string, done: Set<string>): LearningPath {
  const conversations = conversationsForLevel(level);
  // Beceri havuzları — web builder gibi sırayla tüketilir (2/ünite/tür);
  // biterse slot boş (ref=null → "Yakında"). Erken üniteler dolu.
  const pools: Record<string, SkillMeta[]> = {
    read: listPathSkillMeta(level, "reading"),
    listen: listPathSkillMeta(level, "listening"),
    write: listPathSkillMeta(level, "writing"),
  };
  const cursors: Record<string, number> = { read: 0, listen: 0, write: 0 };
  const unitCount = Math.ceil(conversations.length / UNIT_CONVERSATIONS) || 1;
  const units: LearningPathUnit[] = [];

  for (let u = 0; u < unitCount; u++) {
    const index = u + 1;
    // Kurs önekli: "de-a1-u01". Sabit "de-" olsaydı başka bir kursun üniteleri
    // Almanca kursunun ilerlemesiyle aynı kimliği paylaşırdı.
    const unitId = `${currentCourseId()}-${level.toLowerCase()}-u${String(index).padStart(2, "0")}`;
    const unitConversations = conversations.slice(u * UNIT_CONVERSATIONS, u * UNIT_CONVERSATIONS + UNIT_CONVERSATIONS);
    const items: LearningPathItem[] = [];
    const counters: Record<string, number> = {};
    let conversationCursor = 0;

    for (const kind of slotPlan()) {
      const n = (counters[kind] = (counters[kind] ?? 0) + 1);
      const id = `${unitId}-${kind}${n}`;
      if (kind === "conversation") {
        const conversation = unitConversations[conversationCursor++];
        if (!conversation) continue; // kısmi son ünitede boş ders slotu üretilmez
        items.push({ id, kind, title: conversation.title, titleTr: conversation.titleTr, playable: true, done: done.has(conversation.id), open: true, ref: conversation.id });
      } else if (kind === "read" || kind === "listen" || kind === "write") {
        const meta = pools[kind][cursors[kind]++];
        items.push({
          id, kind,
          title: meta?.title ?? t(SKILL_KEY[kind]),
          titleTr: meta?.genre ?? t(SKILL_KEY[kind]),
          playable: !!meta,
          done: meta ? done.has(meta.id) : false,
          open: true,
          ref: meta?.id ?? null,
        });
      } else if (kind === "quiz" || kind === "checkpoint") {
        // Quiz/checkpoint ünitenin ders içeriğinden CİHAZDA türetilir. Ünitede
        // hiç ders yoksa türetecek bir şey de yok: "oynanır" demek boş bir tur
        // açmak olurdu. Ders paketi olmayan kurslarda (ör. İngilizce, henüz
        // ders içeriği yazılmadı) tüm ünite bu durumda.
        const slot = SLOT_KEY[kind];
        const derivable = unitConversations.length > 0;
        items.push({ id, kind, title: t(slot.title), titleTr: t(slot.sub), playable: derivable, done: derivable && done.has(id), open: true, ref: derivable ? unitId : null });
      } else {
        // grammar — sunucuyla aynı: ders taşıyan ünitede TÜRETİLİYOR
        // (`immersionQuiz.deriveGrammar`, QuizScreen onu çiziyor). "Yakında"
        // yazılıydı ama oynatıcı hazırdı: yerel patika 12, sunucu 13 adım sayıyordu.
        const slot = SLOT_KEY[kind];
        const derivable = unitConversations.length > 0;
        items.push({ id, kind, title: t(slot.title), titleTr: t(slot.sub), playable: derivable, done: derivable && done.has(id), open: true, ref: derivable ? unitId : null });
      }
    }

    const conversationItems = items.filter((it) => it.kind === "conversation");
    const conversationsDone = conversationItems.filter((it) => it.done).length;
    /*
      SAYILABİLİR item'lar: OYNANABİLİR HER ADIM (sunucu `state.ts` ile aynı,
      pratik adımlar artık kayıt tutuyor). Aşağıdaki not eski ölçütün tarihçesi.

      Eski: oynanabilir ders ve beceri yuvaları. Şablon her
      ünitede 13 yuva açıyor ama içerik bitince kalanlar "Yakında" (ref yok) ve
      gramer/quiz/kontrol noktası done-takibi tutmuyor. `total` bunların
      hepsini sayıyordu: ünite, içeriği olmayan yuvalar yüzünden hiç
      dolmayacak bir "x / 13" gösteriyordu. Sunucu (lib/immersion/state.ts)
      zaten sayılabilir olanları sayıyor; yerel kurulum da öyle.
    */
    const completable = items.filter((it) => it.playable);
    const completableCount = completable.length;
    const doneCount = completable.filter((it) => it.done).length;
    units.push({
      id: unitId, index, group: Math.floor(u / GROUP_SIZE),
      theme: unitTheme(level, u * UNIT_CONVERSATIONS, index),
      moduleIndex: Math.floor((u * UNIT_CONVERSATIONS) / MODULE_SIZE),
      topics: unitConversations.map((l) => l.title),
      locked: false,
      // Sunucudaki kuralla aynı (lib/immersion/state.ts): "bitti" ünitedeki
      // BÜTÜN sayılabilir item'lara bakar. Yalnız derslere bakmak, dört dersi
      // bitiren kullanıcıya beceri yuvaları dururken "tamamlandı" diyordu.
      complete: completableCount > 0 && doneCount === completableCount,
      done: doneCount, total: completableCount,
      conversationsDone, conversationsTotal: conversationItems.length,
      items,
    });
  }

  const firstOpen = units.find((u) => !u.complete);
  const doneUnits = units.filter((u) => u.complete).length;
  return {
    level,
    units,
    currentIndex: firstOpen?.index ?? units.length,
    doneUnits,
    totalUnits: units.length,
  };
}

/**
 * item id → ref haritası (aynı seviye). /api/immersion cevabı ref taşımıyor;
 * item id'leri hem sunucu hem istemci aynı formülle üretiyor
 * (`${unitId}-${kind}${n}`, aynı kaynak içerik) → ref'leri buradan doldururuz.
 */
export function refIndex(level: string): Map<string, string | null> {
  const p = buildLocalLearningPath(level, new Set<string>());
  const m = new Map<string, string | null>();
  for (const u of p.units) for (const it of u.items) m.set(it.id, it.ref ?? null);
  return m;
}
