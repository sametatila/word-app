"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpenIcon } from "@/components/icons";

/**
 * Başlangıç ekranındaki dilbilgisi kartı.
 *
 * Girişi burada, ders yolunda değil. Ders yolunun tepesine yapışık bir düğme
 * konmuştu ve yanlıştı: harita zaten dikey bir yolculuk ve tepesindeki her
 * şerit ondan yer çalıyor. Dilbilgisi tabloları da bir ders değil — normal
 * turun yerine geçen bir çalışma biçimi, yani buradaki üç kardeşiyle aynı
 * cinsten.
 *
 * Adı ekranın başlığıyla BİREBİR aynı: kartta bir ad, açılan ekranda başka bir
 * ad görmek kullanıcıya iki ayrı yere gittiğini düşündürüyor. Ad Türkçe —
 * uygulamanın geri kalanı da öyle (Dersler, Beceriler, Kelimeler).
 *
 * Kart tekrar borcunu gösteriyor: sayı olmadan tek satırlık bir menü
 * maddesi, sayıyla birlikte bir çağrı. Borç yoksa hiç sayı yazmıyor —
 * "0 tekrar" bilgi değil gürültü.
 */
export function CheatsheetCard({ bare = false }: { bare?: boolean }) {
  const [due, setDue] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cheat", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { due: number };
        if (alive) setDue(data.due);
      } catch {
        /* çevrimdışı: kart sayısız görünür, bağlantı yine çalışır */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={bare ? "w-full" : "card mx-auto mt-3 w-full max-w-md overflow-hidden"}>
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "color-mix(in srgb, var(--color-violet) 16%, transparent)",
            color: "var(--color-violet)",
          }}
        >
          <BookOpenIcon size={22} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">Dilbilgisi</p>
          <p className="muted mt-0.5 text-xs">
            {due && due > 0
              ? `${due} maddenin tekrarı geldi · A1'den C1'e tablolar`
              : "A1'den C1'e tablolar · oku ya da sorularla çalış"}
          </p>
        </div>

        <Link
          href="/cheatsheet"
          prefetch={false}
          className="btn btn-ghost shrink-0 px-4 py-2.5 text-sm"
        >
          Aç
        </Link>
      </div>
    </section>
  );
}
