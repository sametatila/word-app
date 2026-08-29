import { api, API_BASE } from "../api/client";

/**
 * Sohbet (roleplay) — web /api/roleplay (DEPLOY'LU). Senaryo metnini SUNUCU
 * tutuyor; mobil yalnız lessonId + mesaj geçmişini yolluyor, asistanın Almanca
 * cevabı DÜZ METİN olarak akıyor (RN akışı parça parça okuyamadığı için tam
 * metni bekliyoruz). LLM yapılandırılmamışsa configured=false döner.
 */
export type ChatMsg = { role: "user" | "assistant"; content: string };

export async function roleplayConfigured(): Promise<boolean> {
  try { const r = await api<{ configured: boolean }>("/api/roleplay"); return !!r.configured; } catch { return false; }
}

export async function sendRoleplay(lessonId: string, messages: ChatMsg[]): Promise<string> {
  const res = await fetch(`${API_BASE}/api/roleplay`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ lessonId, messages, mode: "practice" }),
  });
  if (!res.ok) throw new Error(`roleplay ${res.status}`);
  return (await res.text()).trim();
}

/**
 * Sohbet cevabının biçimi — web'in chat-format'ının mobil karşılığı. Model
 * cevabı üç parça: gövde, [FIX] düzeltmeleri, [SAY] önerilen cevaplar. Satır
 * başı işaretle ayrılıyor (JSON değil, küçük model kaçırmasın diye). İşaretler
 * ekrana çıkmamalı; TTS de yalnız gövdeyi okumalı.
 */
const CORRECTION_MARK = "[FIX]";
const SUGGESTION_MARK = "[SAY]";
const EMPHASIS = /\*\*?([^*\n]+)\*\*?/g;
const stripEmphasis = (line: string): string => line.replace(EMPHASIS, "$1");

function isSectionHeader(line: string): boolean {
  if (!line) return false;
  const dashed = /^[—–-]+\s*/.test(line);
  const bare = line.replace(/^[—–-]+\s*/, "").replace(/[:：]\s*$/, "").trim();
  if (!bare || bare.length > 40 || /[.!?]/.test(bare)) return false;
  if (!dashed && !bare.includes(" ")) return false;
  return bare === bare.toLocaleUpperCase("tr-TR") && /[A-ZÇĞİÖŞÜ]/.test(bare);
}

/** Yalnız büyük/küçük harf ya da noktalama farkı taşıyan düzeltme — gösterilmez. */
function isCosmetic(correction: string): boolean {
  const parts = correction.split(/→|->/);
  if (parts.length < 2) return false;
  const bare = (t: string) => t.replace(/\([^)]*\)\s*$/, "").toLocaleLowerCase("de-DE").replace(/[^\p{L}\p{N}]+/gu, "");
  const left = bare(parts[0]);
  return left.length > 0 && left === bare(parts.slice(1).join("→"));
}

export type ParsedReply = { body: string; corrections: string[]; suggestions: string[] };

export function parseReply(text: string): ParsedReply {
  const body: string[] = [];
  const corrections: string[] = [];
  const suggestions: string[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith(CORRECTION_MARK)) {
      const value = stripEmphasis(trimmed.slice(CORRECTION_MARK.length).trim());
      if (value && !isCosmetic(value)) corrections.push(value);
    } else if (trimmed.startsWith(SUGGESTION_MARK)) {
      const value = stripEmphasis(trimmed.slice(SUGGESTION_MARK.length).trim())
        .replace(/^\d+[.)]\s*/, "").replace(/^["“„']|["”“']$/g, "").trim();
      if (value) suggestions.push(value);
    } else if (!isSectionHeader(trimmed)) {
      body.push(stripEmphasis(line));
    }
  }
  return { body: body.join("\n").trim(), corrections, suggestions };
}
