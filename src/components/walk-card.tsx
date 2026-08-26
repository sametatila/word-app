"use client";

import { HeadphonesIcon } from "@/components/icons";
import { ModeTile } from "@/components/mode-tile";

/**
 * Başlangıç ekranındaki "yürürken" kartı.
 *
 * Uygulamanın tamamı ekrana bakmayı gerektiriyordu; bu mod o zorunluluğu
 * kaldırdığı için bir oyun değil bir KULLANIM ANI açıyor — yürürken, bulaşık
 * yıkarken, otobüste. Kart bunu tek cümlede söylüyor, çünkü "sesli mod"
 * yazsaydı kimse ne olduğunu anlamazdı.
 *
 * Arena ve günün turunun altında: ikisi bir OLAY, bu ise turun başka bir
 * yoldan oynanması. Oyun seçicinin hemen üstünde duruyor çünkü ona en yakın
 * akraba o.
 */
export function WalkCard({
  onPlay,
  bare = false,
  tile = false,
}: {
  onPlay: () => void;
  bare?: boolean;
  /** Izgara döşemesi olarak çiz (bkz. components/mode-tile). */
  tile?: boolean;
}) {
  if (tile) {
    return (
      <ModeTile
        icon={<HeadphonesIcon size={18} />}
        tone="var(--color-mint)"
        title="Yürürken"
        status="Ekrana bakmadan, sesli"
        onPlay={onPlay}
      />
    );
  }
  return (
    <section
      /* Giriş animasyonu YOK: bu kart başlangıç ekranında bir zincirin halkası
         ve zinciri `Stagger` yönetiyor (bkz. components/reveal). Kendi başına
         belirdiğinde altı kart aynı anda ama farklı mesafelerle (kimi 8, kimi
         14 piksel) açılıyordu — hepsi birden oynayan ama aynı ritmi tutmayan
         bir hareket. */
      className={bare ? "w-full" : "card mx-auto mt-3 w-full max-w-md overflow-hidden"}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "color-mix(in srgb, var(--color-mint) 16%, transparent)",
            color: "var(--color-mint)",
          }}
        >
          <HeadphonesIcon size={22} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">Yürürken</p>
          <p className="muted mt-0.5 text-xs">
            Türkçesini duy, Almancasını söyle · ekrana bakmadan
          </p>
        </div>

        <button onClick={onPlay} className="btn btn-ghost shrink-0 px-4 py-2.5 text-sm">
          Başla
        </button>
      </div>
    </section>
  );
}
