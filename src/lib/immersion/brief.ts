import type { CefrLevel } from "@/lib/skills/types";
import type { NativeLang } from "@/lib/courses";
import type { Conversation, PatternItem, VocabItem } from "@/lib/conversations/types";
import { conversationsFor } from "@/lib/conversations/index";
import { MODULE_SIZE, moduleTheme } from "@/lib/conversations/modules";
import { UNIT_CONVERSATIONS } from "./build";

/**
 * İçerik brief'i — "diğer item tipleri conversation'a göre türetilir" ilkesinin somut
 * hâli (bkz. docs/plan/immersion.md §İçerik stratejisi).
 *
 * Her ünite için, kendi 4 dersinden tema + hedef kelime/kalıp/cando'yu toplar.
 * Bu, o üniteye yazılacak temalı okuma/dinleme/yazma/quiz/gramer içeriğinin
 * ŞARTNAMESİdir: yeni içerik bu kelimeleri/kalıpları/temayı kullanmalı ki
 * ünitenin dersleriyle aynı dünyada olsun. Saf ve DB'siz — test edilebilir.
 */

export type UnitBrief = {
  unitId: string;
  index: number;
  level: CefrLevel;
  course: string;
  theme: string;
  conversationIds: string[];
  /** Derslerin başlıkları (Almanca) — sahnenin adları. */
  conversationTitles: string[];
  /** Birleşik cando etiketleri (WP-43). */
  cando: string[];
  /** Birleşik kelime havuzu (de'ye göre tekilleştirilmiş). */
  vocab: VocabItem[];
  /** Birleşik kalıp havuzu (de'ye göre tekilleştirilmiş). */
  patterns: PatternItem[];
  /** Bu üniteye desenden beklenen yeni içerik slotları. */
  needs: { read: number; listen: number; write: number };
};

/** Temasız dilimin yedek adı ("A1 · Ünite 3"). Üç kelime için sözlük açmıyoruz;
 *  arayüz sözlüğündeki `common.unit` istemci tarafında, burası sunucu. */
const UNIT_WORD: Record<NativeLang, string> = { tr: "Ünite", en: "Unit", de: "Einheit" };

function uniq(xs: string[]): string[] {
  return [...new Set(xs)];
}
function dedupeBy<T>(xs: T[], key: (x: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of xs) {
    const k = key(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

/** Saf çekirdek: brief'leri verilen derslerden kurar (buildTrack ile aynı 4'erli bölme). */
export function buildUnitBriefs(
  course: string,
  level: CefrLevel,
  conversations: Conversation[],
  /** Ünite başlığının dili — öğrencinin anadili. */
  lang: NativeLang,
): UnitBrief[] {
  const briefs: UnitBrief[] = [];
  const count = Math.ceil(conversations.length / UNIT_CONVERSATIONS);
  const levelLower = level.toLowerCase();

  for (let u = 0; u < count; u++) {
    const index = u + 1;
    const unitConversations = conversations.slice(u * UNIT_CONVERSATIONS, u * UNIT_CONVERSATIONS + UNIT_CONVERSATIONS);
    const theme =
      moduleTheme(course, level, Math.floor((u * UNIT_CONVERSATIONS) / MODULE_SIZE), lang) ||
      `${level} · ${UNIT_WORD[lang]} ${index}`;
    briefs.push({
      unitId: `${course}-${levelLower}-u${String(index).padStart(2, "0")}`,
      index,
      level,
      course,
      theme,
      conversationIds: unitConversations.map((l) => l.id),
      conversationTitles: unitConversations.map((l) => l.title),
      cando: uniq(unitConversations.flatMap((l) => l.cando ?? [])),
      vocab: dedupeBy(unitConversations.flatMap((l) => l.vocab), (v) => v.de),
      patterns: dedupeBy(unitConversations.flatMap((l) => l.patterns), (p) => p.de),
      needs: { read: 2, listen: 2, write: 2 },
    });
  }
  return briefs;
}

/**
 * Brief'ler, dizeleri ÖĞRENCİNİN DİLİNE çevrilmiş derslerden.
 *
 * Ünite quiz'i ve dilbilgisi alıştırması sorularını brief'in kelime ve kalıp
 * havuzundan kuruyor: soru kökü arayüz sözlüğünden geliyor ama ŞIKLAR
 * `v.tr`/`p.tr`, yani dersin anadil yüzü. Ham dersten kurulduğunda o yüz
 * Türkçe kalıyordu ve anadili İngilizce ya da Almanca olan kullanıcı Türkçe
 * şıklar arasında seçim yapıyordu — soruyu anladığı hâlde cevaplayamıyordu.
 *
 * ÇEVİRİYİ ÇAĞIRAN VERİYOR. Sözlük yükleyicisi sunucuya bağlı
 * (`native-server.ts`, `import "server-only"`); bu dosya saf kalmalı ki
 * `test:track` onu veritabanısız koşturabilsin. Çözülemeyen ders OLDUĞU GİBİ
 * geçiyor — hep-ya-hiç kuralı ders başına, havuz başına değil.
 */
export async function nativeUnitBriefs(
  course: string,
  level: CefrLevel,
  lang: NativeLang,
  localise: (conversation: Conversation) => Promise<Conversation>,
): Promise<UnitBrief[]> {
  const conversations = await Promise.all(
    (await conversationsFor(course))
      .filter((l) => l.level === level)
      .map(localise),
  );
  return buildUnitBriefs(course, level, conversations, lang);
}

/** DB'siz sarmalayıcı: seviyenin derslerini katalogdan alıp brief'leri kurar. */
export async function unitBriefs(course: string, level: CefrLevel, lang: NativeLang): Promise<UnitBrief[]> {
  const conversations = (await conversationsFor(course)).filter((l) => l.level === level);
  return buildUnitBriefs(course, level, conversations, lang);
}
