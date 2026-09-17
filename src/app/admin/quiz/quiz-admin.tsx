"use client";

import type { QuizAdminData } from "@/lib/weekly-quiz/admin";
import { AdminPage, Badge, BarList, DataTable, Empty, PageHeader, Panel, TONE, type Tone } from "../_ui/ui";

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

/** Doğruluk oranına göre ton: düşük = incelenecek. */
function tone(pct: number): Tone {
  if (pct < 35) return "bad";
  if (pct < 60) return "warn";
  return "ok";
}

export function QuizAdmin({ data }: { data: QuizAdminData }) {
  const totalAttempts = data.weeks.reduce((a, w) => a + w.started, 0);
  const totalDone = data.weeks.reduce((a, w) => a + w.finished, 0);

  return (
    <AdminPage>
      <PageHeader
        title="Haftalık quiz"
        description="Gözlem sayfası: bu hafta ne canlı, kaç kişi giriyor, hangi madde bozuk."
        meta={<>Bu hafta: <b>{data.thisWeek}</b> · son 12 haftada <b>{data.scanned}</b> deneme okundu{totalAttempts ? <> · <b>{totalDone}</b>/<b>{totalAttempts}</b> tamamlandı</> : null}</>}
      />

      {/* 1. Bu hafta canlı olan paketler */}
      <Panel title="Bu hafta canlı" hint="Takvim haftasından; herkes aynı hafta aynı paketi görüyor.">
        {data.live.length ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {data.live.map((l) => (
              <div key={l.quizId} className="flex items-center justify-between gap-3 rounded-tile px-3 py-2" style={{ background: "var(--surface-2)" }}>
                <div className="min-w-0">
                  <p className="text-strong">{l.theme}</p>
                  <p className="muted font-mono text-caption">{l.quizId}</p>
                </div>
                <Badge>{l.course.toUpperCase()} · {l.level} · W{l.no}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <Empty>Bu hafta hiçbir kurs/seviye için paket bulunamadı.</Empty>
        )}
      </Panel>

      {/* 4. MADDE ANALİZİ — en değerli sinyal, üstte */}
      <Panel
        title="Gözden geçirilecek maddeler"
        hint="En düşük doğruluk oranından başlayarak. Çok düşük bir oran genelde öğrencinin değil maddenin kusurudur: yanlış anahtar, belirsiz soru ya da iki savunulabilir şık. En az 3 cevap almış maddeler listeleniyor. Bozuk maddeyi kapatmak için: /admin/content (paket quiz/de ya da quiz/en, madde kimliği soldaki sütun)."
        flush
      >
        <DataTable
          empty="Henüz madde analizi için yeterli cevap yok (madde başına en az 3 cevap gerekiyor)."
          head={["Madde", "Blok", "Soru", { label: "Doğru", align: "right" }]}
          rows={data.items.map((i) => [
            <span key="i" className="font-mono whitespace-nowrap">{i.itemId}</span>,
            <span key="b" className="whitespace-nowrap">{BLOCK_TR[i.block] ?? i.block}</span>,
            <span key="s" className="line-clamp-2">{i.stem}</span>,
            <span key="p"><b style={{ color: TONE[tone(i.pct)] }}>%{i.pct}</b><span className="muted"> · {i.correct}/{i.asked}</span></span>,
          ])}
        />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* 3. Yetkinlik kırılımı */}
        <Panel title="Yetkinliklere göre" hint="Tüm bitmiş denemelerin toplamı. Sürekli düşük kalan bir blok ya içerikte zor ya da öğretimde eksik demektir.">
          <BarList
            empty="Henüz bitmiş deneme yok."
            max={100}
            items={data.blocks.map((b) => ({ label: BLOCK_TR[b.block] ?? b.block, value: b.pct, right: `%${b.pct} · ${b.correct}/${b.total}`, tone: tone(b.pct) }))}
          />
        </Panel>

        {/* Katalog sağlığı */}
        <Panel title="Katalog" hint="Seviye başına kaç paket yazıldı. Takvim haftası havuzu tükettiğinde başa sarıyor — yazım temposu takvimin önünde kalmalı." flush>
          <DataTable
            head={["Seviye", { label: "Almanca", align: "right" }, { label: "İngilizce", align: "right" }]}
            rows={data.catalog.map((c) => [
              <span key="l" className="font-mono">{c.level}</span>,
              <span key="d" style={c.de ? undefined : { color: TONE.bad }}>{c.de}</span>,
              <span key="e" style={c.en ? undefined : { color: TONE.bad }}>{c.en}</span>,
            ])}
          />
        </Panel>
      </div>

      {/* 2. Haftalık katılım */}
      <Panel title="Haftalık katılım" hint="Başlayan, bitiren ve ortalama skor." flush>
        <DataTable
          empty="Henüz deneme yok."
          head={["Hafta", { label: "Başlayan", align: "right" }, { label: "Bitiren", align: "right" }, { label: "Ortalama", align: "right" }]}
          rows={data.weeks.map((w) => [
            <span key="w" className="font-mono">{w.week}</span>, w.started, w.finished,
            <b key="a" style={{ color: TONE[tone(w.avgScore)] }}>%{w.avgScore}</b>,
          ])}
        />
      </Panel>
    </AdminPage>
  );
}
