"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import type { AnalysisRow, MockItemRow } from "@/lib/admin-content";
import { BTN, DataTable, Notice, Panel, TONE, type Tone } from "../_ui/ui";
import { TwoStep } from "../_ui/two-step";

/**
 * MADDE ANALİZİ — en düşük başarıdan başlayarak, kapatma düğmesiyle.
 *
 * Öğrenme metrikleri çubuk listesiydi ve bakınca ne yapılacağını söylemiyordu.
 * Bu görünüm tek bir soruya cevap veriyor: hangi madde öğrencileri düşürüyor
 * ve kapatılmalı mı? Kapatma geri alınabilir, sürümden bağımsız ve göstergeye
 * yarım dakikada düşüyor (lib/content `disableItem`); düzeltmenin kendisi
 * git'te yapılıp yayınlanıyor.
 *
 * Deneme sınavında kapatılabilen birim KÂĞIT (`papers/<kurs>` paketinin
 * maddesi kâğıt kimliği): tek soru kapatılamıyor, kâğıt kapatılıyor.
 */
const tone = (pct: number): Tone => (pct < 35 ? "bad" : pct < 60 ? "warn" : "ok");
const TABS = ["Konuşmalar", "Beceri egzersizleri", "Deneme sınavı soruları", "Patika adımları"] as const;
const SKILL_TR: Record<string, string> = { reading: "okuma", listening: "dinleme" };

async function post(body: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await apiFetch("/api/admin/content", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) return null;
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return adminErrorText(data.error ?? res.status);
  } catch {
    return adminErrorText("network");
  }
}

export function LearningAnalysis({ conversations, skills, path, mockItems, mockScanned, minAnswers }: {
  conversations: AnalysisRow[];
  skills: AnalysisRow[];
  path: AnalysisRow[];
  mockItems: MockItemRow[];
  mockScanned: number;
  minAnswers: number;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Konuşmalar");
  const [off, setOff] = useState<Set<string>>(
    () => new Set([...conversations, ...skills].filter((r) => r.disabled).map((r) => `${r.pack}:${r.id}`).concat(mockItems.filter((m) => m.disabled).map((m) => `${m.pack}:${m.paperId}`))),
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: Tone; text: string } | null>(null);

  async function toggle(pack: string, item: string, disable: boolean) {
    setBusy(true);
    setMsg(null);
    const err = await post({ action: disable ? "disable" : "enable", pack, item, reason: "broken" });
    setBusy(false);
    if (err) {
      setMsg({ tone: "bad", text: err });
      return;
    }
    setOff((s) => {
      const n = new Set(s);
      if (disable) n.add(`${pack}:${item}`);
      else n.delete(`${pack}:${item}`);
      return n;
    });
    setMsg({ tone: "ok", text: disable ? `${item} kapatıldı: en geç 30 saniyede web ve mobilde görünmez. Kapalı maddeler: /admin/content` : `${item} yeniden açıldı.` });
  }

  const action = (pack: string, item: string) => {
    if (!pack) return <span className="muted">yayın hattında değil</span>;
    return off.has(`${pack}:${item}`) ? (
      <button type="button" disabled={busy} onClick={() => void toggle(pack, item, false)} className={BTN.small}>Aç</button>
    ) : (
      <TwoStep small label="Kapat" confirm="Evet, kapat" disabled={busy} onConfirm={() => void toggle(pack, item, true)} />
    );
  };
  const pctCell = (pct: number) => <b style={{ color: TONE[tone(pct)] }}>%{pct}</b>;
  const unitRows = (list: AnalysisRow[]) =>
    list.map((r) => [
      <div key="i" className="min-w-40">
        <div className="font-mono">{r.id}</div>
        {r.title ? <div className="muted">{r.title}</div> : null}
        {off.has(`${r.pack}:${r.id}`) ? <span style={{ color: TONE.bad }}>kapalı</span> : null}
      </div>,
      r.level,
      pctCell(r.pct),
      r.users,
      r.attempts,
      <span key="a">{action(r.pack, r.id)}</span>,
    ]);
  const unitHead = ["Madde", "Seviye", { label: "Başarı", align: "right" as const }, { label: "Kişi", align: "right" as const }, { label: "Deneme", align: "right" as const }, ""];

  return (
    <Panel
      title="Madde analizi"
      hint={`En düşük başarıdan başlayarak; en az ${minAnswers} kişinin çalıştığı maddeler. Çok düşük oran çoğunlukla maddenin kusurudur (yanlış anahtar, belirsiz soru). Kapatmak geri alınabilir; kapalı maddeler ve sürümler: /admin/content — düzeltme git'te yapılıp yayınlanır.`}
    >
      {/* Sekmeler — seçili olan `aria-selected` ile de söyleniyor (bkz. parity 258). */}
      <div role="tablist" aria-label="Madde türü" className="-mx-1 mb-3 flex gap-1 overflow-x-auto border-b px-1" style={{ borderColor: "var(--border)" }}>
        {TABS.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className="-mb-px h-9 shrink-0 border-b-2 px-3 text-caption whitespace-nowrap"
            style={tab === t ? { borderColor: "var(--color-brand)", color: "var(--text)" } : { borderColor: "transparent", color: "var(--text-muted)" }}>
            {t}
          </button>
        ))}
      </div>
      {msg ? <div className="mb-3"><Notice tone={msg.tone}>{msg.text}</Notice></div> : null}

      {tab === "Konuşmalar" ? <DataTable head={unitHead} rows={unitRows(conversations)} empty="Analiz için yeterli konuşma sonucu yok." /> : null}
      {tab === "Beceri egzersizleri" ? <DataTable head={unitHead} rows={unitRows(skills)} empty="Analiz için yeterli egzersiz sonucu yok." /> : null}
      {tab === "Deneme sınavı soruları" ? (
        <>
          <p className="muted mb-2 text-caption">
            {mockScanned} bitmiş okuma/dinleme bölümü okundu. Kapatma birimi <b>kâğıt</b>: bir soru için kâğıdın tamamı yayından kalkıyor.
          </p>
          {/* Sıralamanın ölçütü doğruluk oranı DEĞİL — %30'da kalan bir madde zor
              olabilir. "Ayırt", maddeyi doğru cevaplayanların kâğıt puanı
              ortalaması eksi yanlış cevaplayanların ortalaması: negatifse
              sınavın geri kalanında iyi olanlar burada yanılıyor, yani sorun
              öğrencide değil maddede (bkz. lib/content/analytics). */}
          <p className="muted mb-2 text-caption">
            Sıra <b>ayırt etme gücüne</b> göre: negatif olan, sınavın geri kalanında iyi olanların yanıldığı madde — yanlış anahtar imzası.
            Düşük doğruluk tek başına bozukluk göstergesi değil.
          </p>
          <DataTable
            empty="Analiz için yeterli deneme cevabı yok."
            head={["Kâğıt · bölüm", "Soru", { label: "Doğru", align: "right" }, { label: "Ayırt", align: "right" }, ""]}
            rows={mockItems.map((m) => [
              <div key="p" className="whitespace-nowrap">
                <div className="font-mono">{m.paperId}</div>
                <div className="muted">{SKILL_TR[m.skill] ?? m.skill} · {m.itemId}</div>
                {off.has(`${m.pack}:${m.paperId}`) ? <span style={{ color: TONE.bad }}>kâğıt kapalı</span> : null}
              </div>,
              <span key="l" className="line-clamp-2">{m.label || "—"}</span>,
              <span key="c">{pctCell(m.pct)}<span className="muted"> · {m.correct}/{m.asked}</span></span>,
              <span key="d" className="whitespace-nowrap">
                <b style={{ color: m.suspect ? TONE.bad : TONE.ok }}>
                  {m.discrimination > 0 ? `+${m.discrimination}` : m.discrimination}
                </b>
                {m.why ? <div className="muted line-clamp-2">{m.why}</div> : null}
              </span>,
              <span key="a">{action(m.pack, m.paperId)}</span>,
            ])}
          />
        </>
      ) : null}
      {tab === "Patika adımları" ? (
        <>
          <p className="muted mb-2 text-caption">Patika adımları konuşmadan ve egzersizden türetiliyor, ayrıca yayınlanmıyor: kapatmak için adımın konuşmasını ya da egzersizini kapat.</p>
          <DataTable head={["Adım", { label: "Ort. en iyi", align: "right" }, { label: "Kişi", align: "right" }, { label: "Deneme", align: "right" }]} rows={path.map((r) => [<span key="i" className="font-mono">{r.id}</span>, pctCell(r.pct), r.users, r.attempts])} empty="Analiz için yeterli adım sonucu yok." />
        </>
      ) : null}
    </Panel>
  );
}
