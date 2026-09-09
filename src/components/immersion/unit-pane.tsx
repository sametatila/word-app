"use client";

import Link from "next/link";
import type { HubItem, HubUnit } from "@/components/immersion/immersion-hub";
import {
  BookOpenIcon,
  CheckIcon,
  ChevronRightIcon,
  HeadphonesIcon,
  LearnIcon,
  LockIcon,
  MicIcon,
  PenIcon,
  PuzzleIcon,
  TargetIcon,
} from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Ünitenin GÖVDESİ — adımların tam listesi.
 *
 * Web'de ünite ayrıntısı diye bir şey yoktu: Patika'da bir üniteye dokununca
 * o ünite "öne çıkan" karta geçiyor ve adımlar yalnız ince bir segment
 * şeridinde görünüyordu. Yani her adımın TÜRÜ, ADI ve DURUMU hiçbir yerde
 * okunamıyordu; bir okumaya geri dönmek için şeritteki doğru dilimi tahmin
 * etmek gerekiyordu.
 *
 * Mobilde ünitenin kendi ekranı var (`M/src/screens/UnitScreen.tsx`) ve o
 * ekranın gövdesi iki yerde birden çiziliyor: kendi ekranında ve yatay
 * tablette Patika'nın sağ panelinde. Burası aynı gövde, aynı iki iş için.
 *
 * `embedded` yalnız KABUĞU değiştiriyor: panelde başlık satırı yok (Patika
 * zaten hangi ünitede olduğunu söylüyor). Adımların açılması ve ilerleme
 * ölçütü iki yerde de aynı.
 */

/** Tür → sözlük anahtarı; etiket kullanım anında çözülüyor (mobil `KIND_KEY`). */
const KIND_KEY: Record<string, string> = {
  lesson: "unitkind.lesson",
  read: "unitkind.read",
  listen: "unitkind.listen",
  write: "unitkind.write",
  speak: "unitkind.speaking",
  grammar: "unitkind.grammar",
  quiz: "unitkind.quiz",
  checkpoint: "unitkind.checkpoint",
};

/** Tür → renk. Mobil `KIND_TINT` ile birebir. */
const KIND_TINT: Record<string, string> = {
  lesson: "var(--color-brand-500)",
  read: "var(--color-sky-500)",
  listen: "var(--color-violet-500)",
  write: "var(--color-mint-500)",
  speak: "var(--color-brand-500)",
  grammar: "var(--color-flame-500)",
  quiz: "var(--color-brand-500)",
  checkpoint: "var(--color-rose-500)",
};

/** Tür simgesi — Patika'nın "sıradaki adım" satırı da bunu kullanıyor. */
export function KindIconFor({ kind, size = 22 }: { kind: string; size?: number }) {
  const p = { size } as const;
  switch (kind) {
    case "read":
      return <BookOpenIcon {...p} />;
    case "listen":
      return <HeadphonesIcon {...p} />;
    case "write":
      return <PenIcon {...p} />;
    case "speak":
      return <MicIcon {...p} />;
    case "grammar":
      return <PuzzleIcon {...p} />;
    case "quiz":
      return <TargetIcon {...p} />;
    case "checkpoint":
      return <CheckIcon {...p} />;
    default:
      return <LearnIcon {...p} />;
  }
}

/**
 * İLERLEME YALNIZ KAYIT TUTAN ADIMLARA GÖRE — mobil ve sunucu ile aynı ölçüt.
 *
 * Tekrar ve kontrol noktası ünite brief'inden türetilen pratik: oynanabilir
 * ama madde başına "bitti" kaydı tutmuyorlar. Paydaya katılınca ünite hiçbir
 * zaman %100 görünmüyor.
 */
function counted(items: HubItem[]): HubItem[] {
  return items.filter(
    (i) => i.kind === "lesson" || i.kind === "read" || i.kind === "listen" || i.kind === "write",
  );
}

export function UnitPane({
  unit,
  level,
  embedded = false,
}: {
  unit: HubUnit;
  level: string;
  embedded?: boolean;
}) {
  // İçeriği olmayan (oynanamaz) slotlar listede hiç görünmez: "Yakında" rozeti
  // yerine ünite yalnız gerçekten yapılabilecek adımları gösteriyor.
  const t = useT();
  const items = unit.items.filter((i) => i.playable || i.kind === "lesson");

  /*
    "Şimdi" = ilk açık ve HENÜZ DENENMEMİŞ adım — bitmemiş ilk adım değil.

    Eskisi "bitmemiş" olsaydı, bir beceriden geçer not alamayan öğrencide
    "şimdi" hep aynı adımı gösterirdi. Deneme sırayı ilerletiyor; geçilmemiş
    adım listede açık kalıyor ve tekrar edilebiliyor.
  */
  const open = items.filter((i) => i.open);
  const currentId = (open.find((i) => !i.attempted) ?? open.find((i) => !i.done))?.id;

  const list = counted(items);
  const doneCount = list.filter((i) => i.done).length;
  const pct = list.length ? Math.round((doneCount / list.length) * 100) : 0;

  return (
    <div className={embedded ? "" : "mx-auto w-full max-w-2xl"}>
      {!embedded ? (
        <p className="muted text-micro uppercase tracking-wider">
          {level} · {t("common.unit")} {unit.index}
        </p>
      ) : null}
      {!embedded ? <h1 className="mb-3 text-h2">{unit.theme}</h1> : null}

      <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, background: "var(--color-mint-500)" }}
        />
      </div>
      <p className="muted mb-4 mt-1.5 text-caption">
        {t("unit.steps_done", { n: doneCount, total: list.length })}
      </p>

      <div className="space-y-3">
        {items.map((it) => {
          const current = it.id === currentId;
          const tint = KIND_TINT[it.kind] ?? "var(--color-brand-500)";
          const openable = it.open && it.href;
          const inner = (
            <>
              <span
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-tile text-white shadow-soft-sm"
                style={{ background: tint }}
              >
                <KindIconFor kind={it.kind} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="muted block text-micro">{t(KIND_KEY[it.kind] ?? "") || it.kind}</span>
                <span className="block truncate text-strong">{it.title}</span>
              </span>
              {it.done ? (
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "color-mix(in srgb, var(--color-mint-500) 18%, transparent)",
                    color: "var(--color-mint)",
                  }}
                >
                  <CheckIcon size={16} />
                </span>
              ) : current ? (
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-micro"
                  style={{
                    background: "color-mix(in srgb, var(--color-brand-500) 16%, transparent)",
                    color: "var(--color-brand)",
                  }}
                >
                  {t("unit.now")}
                </span>
              ) : openable ? (
                <ChevronRightIcon size={20} className="faint shrink-0" />
              ) : (
                <LockIcon size={18} className="muted shrink-0" />
              )}
            </>
          );

          const cls = "card flex items-center gap-3 p-4";
          const style = {
            opacity: it.open ? 1 : 0.55,
            borderWidth: current ? 2 : 1,
            borderColor: current ? "var(--color-brand-500)" : "var(--hairline)",
          };

          return openable ? (
            <Link key={it.id} href={it.href!} prefetch={false} className={`pressable ${cls}`} style={style}>
              {inner}
            </Link>
          ) : (
            <div key={it.id} className={cls} style={style}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
