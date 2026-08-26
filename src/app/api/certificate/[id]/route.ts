import { NextResponse } from "next/server";
import { getUserId, getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { examById } from "@/lib/exam";

export const dynamic = "force-dynamic";

/**
 * Sertifika (WP-41): geçilmiş bir sınav için paylaşılabilir SVG.
 * Yalnız sahibine ve yalnız geçilmiş, deneme olmayan sınav için. PDF yok:
 * SVG her yerde açılıyor ve tarayıcı "yazdır → PDF" ile aynı sonucu veriyor.
 */
function esc(s: string): string {
  return s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const exam = await examById(userId, Number(id));
  if (!exam || !exam.passed || exam.trial) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const info = await getUserInfo();
  const profile = await ensureProfile(userId, info?.name);
  const name = esc(profile.displayName ?? info?.name ?? "Öğrenci");
  const title = exam.kind === "level" ? `${exam.level} Seviye Sınavı` : `${exam.level} Modül ${(exam.module ?? 0) + 1} Sınavı`;
  const date = exam.at.slice(0, 10);
  const rows = exam.sections.map((s, i) => `<text x="80" y="${330 + i * 30}" font-size="18" fill="#5b4636">${esc(sectionLabel(s.id))}</text><text x="720" y="${330 + i * 30}" font-size="18" fill="#5b4636" text-anchor="end">%${s.pct}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
  <rect width="800" height="560" rx="24" fill="#fbf6ef"/>
  <rect x="20" y="20" width="760" height="520" rx="18" fill="none" stroke="#c8792d" stroke-width="3"/>
  <text x="400" y="90" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#8a6a4f" letter-spacing="4">WORTSPIEL</text>
  <text x="400" y="150" text-anchor="middle" font-family="sans-serif" font-size="36" font-weight="700" fill="#3b2a1e">${esc(title)}</text>
  <text x="400" y="200" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#5b4636">Bu sertifika</text>
  <text x="400" y="245" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="700" fill="#c8792d">${name}</text>
  <text x="400" y="285" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#5b4636">adına, sınavı %${exam.total} ile geçtiği için verilmiştir.</text>
  <g font-family="sans-serif">${rows}</g>
  <text x="80" y="510" font-family="sans-serif" font-size="16" fill="#8a6a4f">${date}</text>
  <text x="720" y="510" text-anchor="end" font-family="sans-serif" font-size="16" fill="#8a6a4f">Geçme: toplam ≥ %70, her bölüm ≥ %50</text>
</svg>`;
  return new NextResponse(svg, { headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "private, max-age=3600" } });
}

function sectionLabel(id: string): string {
  return { vocab: "Kelime", grammar: "Dilbilgisi", reading: "Okuma", listening: "Dinleme", speaking: "Konuşma", writing: "Yazma" }[id] ?? id;
}
