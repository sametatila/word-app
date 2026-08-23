"use client";

import { useEffect, useState } from "react";
import { CheckIcon, TrophyIcon } from "@/components/icons";

/**
 * Ana ekrandaki "günün turu" kartı.
 *
 * Durumu kendisi çekiyor çünkü iki farklı şey söylemesi gerekiyor: tur
 * oynanmadıysa bir davet, oynandıysa sonuç ve sıra. Aynı kartın iki hâli
 * olması, "bugün oynadım mı" sorusunun cevabını ekranda tutuyor — kaçırılan
 * günün fark edilmesi de böyle oluyor.
 */

type State = {
  loading: boolean;
  played: { score: number; correct: number; total: number } | null;
  rank: number | null;
  players: number;
  level: string;
};

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function DailyCard({ onPlay, bare = false }: { onPlay: () => void; bare?: boolean }) {
  const [state, setState] = useState<State>({
    loading: true,
    played: null,
    rank: null,
    players: 0,
    level: "",
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/daily?day=${localDay()}`, { cache: "no-store" });
        if (!res.ok) return alive && setState((s) => ({ ...s, loading: false }));
        const d = (await res.json()) as {
          level: string;
          rounds: unknown[];
          played: { score: number; correct: number; total: number } | null;
          board: { rank: number; isMe: boolean }[];
        };
        if (!alive) return;
        // Tur kurulamıyorsa (seviyede yeterli kelime yok) kart hiç görünmesin.
        if (!d.played && !d.rounds.length) return setState((s) => ({ ...s, loading: false }));
        setState({
          loading: false,
          played: d.played,
          rank: d.board.find((r) => r.isMe)?.rank ?? null,
          players: d.board.length,
          level: d.level,
        });
      } catch {
        if (alive) setState((s) => ({ ...s, loading: false }));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Yüklenirken satırın YERİ duruyor.
  //
  // Önce `null` dönüyordu ve bölümün içinde bir satır eksik başlıyordu: veri
  // gelince satır en üste giriyor, altındaki her şey aşağı kayıyordu. Kullanıcı
  // bunu "önce eski düzen geliyor, sonra yenisine atlıyor" diye görüyor —
  // düzenin kendisi değişmiyor ama gözün gördüğü şey iki farklı düzen.
  //
  // Veri hiç yoksa (seviye de yok, oynanmış tur da) satır tamamen kalkıyor:
  // orada gösterilecek bir şey gerçekten yok.
  if (state.loading) return <DailyRowSkeleton bare={bare} />;
  if (!state.played && !state.level) return null;

  const done = Boolean(state.played);

  return (
    <section
      /* Giriş animasyonu YOK: bu kart başlangıç ekranında bir zincirin halkası
         ve zinciri `Stagger` yönetiyor (bkz. components/reveal). Kendi başına
         belirdiğinde altı kart aynı anda ama farklı mesafelerle (kimi 8, kimi
         14 piksel) açılıyordu — hepsi birden oynayan ama aynı ritmi tutmayan
         bir hareket. */
      /* `bare`: kendi kartını bırakıp bir bölümün satırı oluyor. Günün turu ve
         hayatta kalma turu aynı doğada iki olay; ikisini iki ayrı beyaz kutuya
         koymak onları birbirinden alakasız gösteriyordu. */
      className={bare ? "w-full" : "card mx-auto mt-4 w-full max-w-md overflow-hidden"}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: done
              ? "color-mix(in srgb, var(--color-mint-500) 16%, transparent)"
              : "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
            color: done ? "var(--color-mint-500)" : "var(--color-brand-500)",
          }}
        >
          {done ? <CheckIcon size={22} /> : <TrophyIcon size={22} />}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">Bugünün turu</p>
          <p className="muted mt-0.5 text-xs">
            {done
              ? `${state.played!.score.toLocaleString("tr-TR")} puan · ${state.played!.correct}/${state.played!.total} doğru` +
                (state.rank ? ` · ${state.rank}. sıra` : "")
              : `${state.level} seviyesindeki herkes aynı kelimeler · tek hak`}
          </p>
        </div>

        <button
          onClick={onPlay}
          className={`btn shrink-0 px-4 py-2.5 text-sm ${done ? "btn-ghost" : "btn-primary"}`}
        >
          {done ? "Tabloyu gör" : "Oyna"}
        </button>
      </div>
    </section>
  );
}

/**
 * Günün turu satırının yer tutucusu — gerçek satırla aynı yükseklikte.
 *
 * Yükseklik uydurulmuyor: aynı yapı (11 birimlik simge kutusu, iki satır metin,
 * dikey pay) sönük renklerle çiziliyor. Uydurulan bir yükseklik veriyle
 * uyuşmadığında kayma yine oluyor, sadece daha az.
 */
function DailyRowSkeleton({ bare }: { bare?: boolean }) {
  return (
    <section className={bare ? "w-full" : "card mx-auto mt-4 w-full max-w-md overflow-hidden"}>
      <div className="flex items-center gap-3 px-5 py-4">
        <span className="surface-2 h-11 w-11 shrink-0 rounded-xl" />
        {/* Alt metin İKİ çubuk: gerçek satırda "A1 seviyesindeki herkes aynı
            kelimeler · tek hak" iki satıra sarıyor. Tek çubukla yer tutucu 14
            piksel kısa kalıyor ve veri gelince altındaki satırlar o kadar
            kayıyordu. */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="surface-2 h-4 w-28 rounded" />
          <div className="surface-2 h-3 w-full max-w-52 rounded" />
          <div className="surface-2 h-3 w-24 rounded" />
        </div>
      </div>
    </section>
  );
}
