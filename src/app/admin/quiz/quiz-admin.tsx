"use client";

import type { QuizAdminData } from "@/lib/weekly-quiz/admin";

/**
 * Haftalık quiz yönetim görünümü.
 *
 * DÖRT SORUYA CEVAP VERİYOR, sırayla:
 *  1. Bu hafta ne canlı? (hangi paket, hangi kurs/seviye)
 *  2. Kaç kişi giriyor, kaç kişi bitiriyor?
 *  3. Hangi yetkinlik zorluyor? (içerik mi zor, öğrenci mi zayıf)
 *  4. HANGİ MADDE BOZUK? — asıl değer burada.
 *
 * MADDE ANALİZİ EN ALTTA DEĞİL, EN ÖNEMLİ OLDUĞU İÇİN EN GÖRÜNÜR YERDE:
 * doğruluk oranı çok düşük bir madde neredeyse her zaman içerik kusurudur
 * (yanlış anahtar, belirsiz soru, iki savunulabilir şık). Kontrol betiği bunu
 * göremez — ancak öğrenciler cevapladıktan sonra görünür.
 */

const BLOCK_TR: Record<string, string> = {
  read: "Okuma",
  listen: "Dinleme",
  grammar: "Dil bilgisi",
  vocab: "Kelime",
  personal: "Kişisel tekrar",
};

/** Doğruluk oranına göre renk: düşük = incelenecek. */
function tone(pct: number): string {
  if (pct < 35) return "var(--color-rose)";
  if (pct < 60) return "var(--color-flame)";
  return "var(--color-mint)";
}

export function QuizAdmin({ data }: { data: QuizAdminData }) {
  const totalAttempts = data.weeks.reduce((a, w) => a + w.started, 0);
  const totalDone = data.weeks.reduce((a, w) => a + w.finished, 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6">
      <header className="flex flex-col gap-1">
        <a href="/admin" className="text-caption" style={{ color: "var(--text-muted)" }}>← Yönetim</a>
        <h1 className="text-h1">Haftalık quiz</h1>
        <p className="muted text-body">
          Bu hafta: <b>{data.thisWeek}</b> · son 12 haftada <b>{data.scanned}</b> deneme okundu
          {totalAttempts ? <> · <b>{totalDone}</b>/<b>{totalAttempts}</b> tamamlandı</> : null}
        </p>
      </header>

      {/* 1. Bu hafta canlı olan paketler */}
      <Section title="Bu hafta canlı" sub="Takvim haftasından; herkes aynı hafta aynı paketi görüyor.">
        {data.live.length ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {data.live.map((l) => (
              <div key={l.quizId} className="card flex items-center justify-between gap-3 px-3 py-2">
                <div className="min-w-0">
                  <p className="text-strong">{l.theme}</p>
                  <p className="muted font-mono text-caption">{l.quizId}</p>
                </div>
                <span className="chip h-7 shrink-0 px-2 text-caption">{l.course.toUpperCase()} · {l.level} · W{l.no}</span>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Bu hafta hiçbir kurs/seviye için paket bulunamadı." />
        )}
      </Section>

      {/* 4. MADDE ANALİZİ — en değerli sinyal, üstte */}
      <Section
        title="Gözden geçirilecek maddeler"
        sub="En düşük doğruluk oranından başlayarak. Çok düşük bir oran genelde öğrencinin değil maddenin kusurudur: yanlış anahtar, belirsiz soru ya da iki savunulabilir şık. En az 3 cevap almış maddeler listeleniyor."
      >
        {data.items.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-caption" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="muted text-micro uppercase tracking-eyebrow">
                  <th className="px-2 py-2 text-left">Madde</th>
                  <th className="px-2 py-2 text-left">Blok</th>
                  <th className="px-2 py-2 text-left">Soru</th>
                  <th className="px-2 py-2 text-right">Doğru</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((i) => (
                  <tr key={i.itemId} className="border-t" style={{ borderColor: "var(--hairline)" }}>
                    <td className="px-2 py-2 font-mono whitespace-nowrap">{i.itemId}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{BLOCK_TR[i.block] ?? i.block}</td>
                    <td className="px-2 py-2">
                      <span className="line-clamp-2">{i.stem}</span>
                    </td>
                    <td className="px-2 py-2 text-right whitespace-nowrap tabular-nums">
                      <b style={{ color: tone(i.pct) }}>%{i.pct}</b>
                      <span className="muted"> · {i.correct}/{i.asked}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty text="Henüz madde analizi için yeterli cevap yok (madde başına en az 3 cevap gerekiyor)." />
        )}
      </Section>

      {/* 3. Yetkinlik kırılımı */}
      <Section title="Yetkinliklere göre" sub="Tüm bitmiş denemelerin toplamı. Sürekli düşük kalan bir blok ya içerikte zor ya da öğretimde eksik demektir.">
        {data.blocks.length ? (
          <div className="flex flex-col gap-2">
            {data.blocks.map((b) => (
              <div key={b.block} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-caption">{BLOCK_TR[b.block] ?? b.block}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: tone(b.pct) }} />
                </div>
                <span className="w-24 shrink-0 text-right text-caption tabular-nums muted">%{b.pct} · {b.correct}/{b.total}</span>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="Henüz bitmiş deneme yok." />
        )}
      </Section>

      {/* 2. Haftalık katılım */}
      <Section title="Haftalık katılım" sub="Başlayan, bitiren ve ortalama skor.">
        {data.weeks.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-caption" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="muted text-micro uppercase tracking-eyebrow">
                  <th className="px-2 py-2 text-left">Hafta</th>
                  <th className="px-2 py-2 text-right">Başlayan</th>
                  <th className="px-2 py-2 text-right">Bitiren</th>
                  <th className="px-2 py-2 text-right">Ortalama</th>
                </tr>
              </thead>
              <tbody>
                {data.weeks.map((w) => (
                  <tr key={w.week} className="border-t" style={{ borderColor: "var(--hairline)" }}>
                    <td className="px-2 py-2 font-mono whitespace-nowrap">{w.week}</td>
                    <td className="px-2 py-2 text-right tabular-nums">{w.started}</td>
                    <td className="px-2 py-2 text-right tabular-nums">{w.finished}</td>
                    <td className="px-2 py-2 text-right tabular-nums">
                      <b style={{ color: tone(w.avgScore) }}>%{w.avgScore}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty text="Henüz deneme yok." />
        )}
      </Section>

      {/* Katalog sağlığı */}
      <Section title="Katalog" sub="Seviye başına kaç paket yazıldı. Takvim haftası havuzu tükettiğinde başa sarıyor — yazım temposu takvimin önünde kalmalı.">
        <div className="overflow-x-auto">
          <table className="w-full text-caption" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="muted text-micro uppercase tracking-eyebrow">
                <th className="px-2 py-2 text-left">Seviye</th>
                <th className="px-2 py-2 text-right">Almanca</th>
                <th className="px-2 py-2 text-right">İngilizce</th>
              </tr>
            </thead>
            <tbody>
              {data.catalog.map((c) => (
                <tr key={c.level} className="border-t" style={{ borderColor: "var(--hairline)" }}>
                  <td className="px-2 py-2 font-mono">{c.level}</td>
                  <td className="px-2 py-2 text-right tabular-nums" style={{ color: c.de ? undefined : "var(--color-rose)" }}>{c.de}</td>
                  <td className="px-2 py-2 text-right tabular-nums" style={{ color: c.en ? undefined : "var(--color-rose)" }}>{c.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-h3">{title}</h2>
      {sub ? <p className="muted mt-1 max-w-[70ch] text-caption">{sub}</p> : null}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="card px-3 py-4 text-caption" style={{ color: "var(--text-muted)" }}>
      {text}
    </div>
  );
}
