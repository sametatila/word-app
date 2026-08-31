import { NextResponse } from "next/server";
import { getUserId, getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { examById, examCando, SECTION_TITLE, SECTION_TITLE_DE, type ExamSectionId } from "@/lib/exam";
import { moduleExamPlan } from "@/lib/lessons/module-exam";

export const dynamic = "force-dynamic";

/**
 * Sertifika (WP-41): geçilmiş bir sınav için paylaşılabilir SVG.
 *
 * Yalnız sahibine ve yalnız geçilmiş, deneme olmayan sınav için. PDF yok:
 * SVG her yerde açılıyor ve tarayıcı "yazdır → PDF" ile aynı sonucu veriyor.
 *
 * Kâğıtta bölüm yüzdelerinin yanında **yapabilirlik listesi** var. Sebebi:
 * "%78" bir hafta sonra hiçbir şey ifade etmiyor, "Ich kann im Restaurant
 * bestellen" ise sınavın ne olduğunu tek satırda söylüyor. Sertifikanın
 * gösterilme sebebi de bu — puan değil, kazanılan iş.
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
  const plan = exam.module === null ? undefined : moduleExamPlan(exam.level, exam.module);
  const kicker = exam.kind === "level" ? `${exam.level} · Niveauprüfung` : `Modulprüfung ${plan?.code ?? `${exam.level}.${(exam.module ?? 0) + 1}`}`;
  const title = plan ? plan.titleDe : exam.kind === "level" ? `Prüfung ${exam.level}` : `Modul ${(exam.module ?? 0) + 1}`;
  const subtitle = plan ? plan.titleTr : "";
  const date = exam.at.slice(0, 10);
  const cando = examCando(exam.level, exam.module).slice(0, 5);

  const rowTop = 330;
  const rows = exam.sections
    .map(
      (s, i) =>
        `<text x="72" y="${rowTop + i * 26}" font-size="15" fill="#5b4636">${esc(SECTION_TITLE_DE[s.id as ExamSectionId] ?? s.id)} · ${esc(SECTION_TITLE[s.id as ExamSectionId] ?? s.id)}</text>` +
        `<text x="380" y="${rowTop + i * 26}" font-size="15" fill="#5b4636" text-anchor="end">%${s.pct}</text>`,
    )
    .join("");
  const candoRows = cando
    .map(
      (c, i) =>
        `<text x="430" y="${rowTop + i * 44}" font-size="14" fill="#3b2a1e">✓ ${esc(c.de.length > 52 ? `${c.de.slice(0, 51)}…` : c.de)}</text>` +
        `<text x="444" y="${rowTop + i * 44 + 17}" font-size="12" fill="#8a6a4f">${esc(c.tr.length > 56 ? `${c.tr.slice(0, 55)}…` : c.tr)}</text>`,
    )
    .join("");
  const height = Math.max(560, rowTop + Math.max(exam.sections.length * 26, cando.length * 44) + 110);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}">
  <rect width="800" height="${height}" rx="24" fill="#fbf6ef"/>
  <rect x="20" y="20" width="760" height="${height - 40}" rx="18" fill="none" stroke="#c8792d" stroke-width="3"/>
  <g font-family="sans-serif">
    <text x="400" y="80" text-anchor="middle" font-size="20" fill="#8a6a4f" letter-spacing="4">NOMI</text>
    <text x="400" y="120" text-anchor="middle" font-size="16" fill="#8a6a4f">${esc(kicker)}</text>
    <text x="400" y="166" text-anchor="middle" font-size="34" font-weight="700" fill="#3b2a1e">${esc(title)}</text>
    ${subtitle ? `<text x="400" y="196" text-anchor="middle" font-size="17" fill="#8a6a4f">${esc(subtitle)}</text>` : ""}
    <text x="400" y="240" text-anchor="middle" font-size="18" fill="#5b4636">Bu belge</text>
    <text x="400" y="278" text-anchor="middle" font-size="28" font-weight="700" fill="#c8792d">${name}</text>
    <text x="400" y="306" text-anchor="middle" font-size="16" fill="#5b4636">adına, sınavı %${exam.total} ile geçtiği için verilmiştir.</text>
    <text x="72" y="${rowTop - 22}" font-size="13" font-weight="700" fill="#8a6a4f">BÖLÜMLER</text>
    ${cando.length ? `<text x="430" y="${rowTop - 22}" font-size="13" font-weight="700" fill="#8a6a4f">DAS KANN ICH JETZT</text>` : ""}
    ${rows}
    ${candoRows}
    <text x="72" y="${height - 44}" font-size="14" fill="#8a6a4f">${date}</text>
    <text x="728" y="${height - 44}" text-anchor="end" font-size="14" fill="#8a6a4f">Geçme: toplam ≥ %70, her bölüm ≥ %50</text>
  </g>
</svg>`;
  return new NextResponse(svg, { headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "private, max-age=3600" } });
}
