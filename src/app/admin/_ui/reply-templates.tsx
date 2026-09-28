"use client";

import { useState } from "react";
import { REVIEW_TEMPLATES } from "@/lib/response-sla";
import { BTN, Segmented } from "./ui";

/**
 * Mağaza yorumu yanıt şablonları (TR / EN / DE). Yorumun dilinde seçilir,
 * `[…]` kısımları yoruma göre doldurulur; kopyala düğmesi panoya alır.
 */
type Lang = "tr" | "en" | "de";
const LANGS: [Lang, string][] = [["tr", "Türkçe"], ["en", "English"], ["de", "Deutsch"]];

export function ReplyTemplates() {
  const [lang, setLang] = useState<Lang>("tr");
  const [copied, setCopied] = useState("");

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? "" : c)), 1500);
    } catch {
      setCopied("");
    }
  }

  return (
    <div className="space-y-3">
      <Segmented label="Dil" items={LANGS} value={lang} onChange={setLang} />
      <div className="space-y-2.5">
        {REVIEW_TEMPLATES.map((t) => (
          <div key={t.id} className="rounded-tile border p-3 text-caption" style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-strong">{t.label}</span>
              <button type="button" className={BTN.small} onClick={() => void copy(t.id, t[lang])}>
                {copied === t.id ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <p className="mt-1.5 whitespace-pre-wrap text-body">{t[lang]}</p>
            <p className="muted mt-1 tabular-nums">{t[lang].length} karakter{t[lang].length > 350 ? " · Play sınırı 350" : ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
