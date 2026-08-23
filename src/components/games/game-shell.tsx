"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, XIcon } from "@/components/icons";

/**
 * Her oyunun ortak çerçevesi.
 *
 * Giriş/çıkış animasyonu üstteki tur sarmalayıcısına aittir; burada tekrar
 * animasyon yapılmaz, yoksa iki hareket üst üste binip titrek görünür.
 *
 * ## Ekran üç bölge
 *
 * Telefonda kart bir bütün olarak dikey ortalanıyordu ve bu tek elle
 * oynanamıyordu: başparmağın rahat ulaştığı yer ekranın alt yarısıyken
 * şıklar tam ortada duruyor, üsttekilere uzanmak için elin kayması ya da
 * ikinci el gerekiyordu. Çözüm kartı aşağı ötelemek DEĞİL — o yalnızca aynı
 * yığını başka bir yere taşır. Ekran işlevine göre bölünüyor:
 *
 *   OKUMA (üstte)    — oyun etiketi, soru, ipucu. Gözün gittiği yer;
 *                      cevaplarken elin altında kalmamalı.
 *   DOKUNMA (ortada) — şıklar, girdi, butonlar. Başparmağın alanı.
 *   SONUÇ (dipte)    — cevaptan sonraki geri bildirim şeridi.
 *
 * ## Sonuç şeridi neden ayrı bir bölge
 *
 * Geri bildirim daha önce her oyunun kendi içinde, şıkların altında, küçük
 * gri bir satırdı ve her oyunda ayrı yazılmıştı. Üç sorunu vardı: turun en
 * önemli anı (yanlış bildiğini öğrenmek) ekranın en zayıf tipografisine
 * düşüyordu; satır belirince şıkların zıplamaması için her oyun kendi
 * boşluğunu ayırıyordu, yani ekranın dibinde kalıcı bir ölü alan vardı; ve
 * on bir oyunda on bir farklı biçim çıkmıştı.
 *
 * Şerit o alanı işlevlendiriyor: yer zaten rezerveydi, artık dolduruluyor.
 * Renk cevabın kendisini anlatıyor, ikon renk körlüğünde de okunuyor, konum
 * sabit — öğrenci sonucu nereye bakacağını biliyor. Şeridin kendisine
 * dokunulmuyor; tur sesin bitişiyle kendiliğinden ilerliyor.
 *
 * ## Boşluk
 *
 * Artan boşluk üç yere dağılıyor, ikisinin TAVANI var: iki bölge arası en çok
 * 7rem, dokunma bölgesiyle şerit arası en çok 2rem, artan ne varsa okuma
 * bölgesinin üstünde toplanıyor. Tavanlar meselenin can alıcı yeri — boşluğu
 * sadece oranlayıp bırakmak, tek kelimelik bir soruda soruyla şıklar arasında
 * 250 pikselden fazla ölü alan bırakıyordu.
 *
 * Şıkların yüksekliğini belirleyen tek şeyin ALT pay olduğuna dikkat: üstteki
 * ve aradaki payı değiştirmek yalnızca sorunun yerini oynatıyor. Bu yüzden
 * ulaşım alt payla, görsel denge ara payla ayarlanıyor.
 *
 * Boşluk azaldıkça üç pay da birlikte küçülüyor; hiç boşluk kalmadığında
 * ikisi sıfırlanıp yalnızca aradaki en az pay (`min-h-5`) kalıyor — yani
 * sıkışık ekranda düzen eski hâline dönüyor ve dar telefonda bir piksel bile
 * israf edilmiyor.
 *
 * `md`den itibaren (tablet/masaüstü) bölge ayrımı kapanıyor: orada ulaşım
 * diye bir sorun yok, imleç her yere aynı uzaklıkta ve ikiye bölünmüş bir
 * kart yalnızca dağınık görünürdü. Kart yine tek parça ve ortalanmış
 * (bkz. FitBox); şerit orada da kartın altında, aynı yerde.
 */
export function GameShell({
  label,
  prompt,
  hint,
  children,
  footer,
  verdict = null,
  feedback,
}: {
  label: string;
  /** Sorunun kendisi. Oyunun içeriği zaten yeterince açıksa boş bırakılabilir. */
  prompt?: ReactNode;
  hint?: ReactNode;
  /** Dokunma bölgesi: şıklar, girdi, butonlar. */
  children: ReactNode;
  footer?: ReactNode;
  /**
   * Cevap verildi mi, verildiyse doğru mu.
   *
   * `null` iken şerit görünmüyor ama yeri duruyor: cevap verilince şıkların
   * zıplaması, dokunulan şıkkın parmağın altından kayması demek olurdu.
   */
  verdict?: "correct" | "wrong" | null;
  /** Şeritte yazacak olan: doğru karşılık, anlam, düzeltme. */
  feedback?: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:block">
      {/* Okuma bölgesinin üstü — tavansız, artan boşluk burada toplanıyor. */}
      <div aria-hidden className="grow md:hidden" />

      <div className="text-center">
        <span className="brand-gradient inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {label}
        </span>
        {prompt ? <div className="mt-2.5 text-lg font-medium sm:text-xl">{prompt}</div> : null}
        {hint ? <div className="muted mt-1 text-sm">{hint}</div> : null}
      </div>

      {/* İki bölge arası — en az bir nefes payı, en çok okunabilir bir aralık. */}
      <div aria-hidden className="min-h-5 max-h-28 grow-[3] md:hidden" />

      <div className="md:mt-5">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}

      {/* Dokunma bölgesiyle şerit arasındaki pay. En az sınırı yok: sıkışık
          ekranda tamamen kapanıp yeri içeriğe bırakıyor. */}
      <div aria-hidden className="max-h-8 grow md:hidden" />

      <VerdictBar verdict={verdict} feedback={feedback} />
    </div>
  );
}

/**
 * Sonuç şeridi.
 *
 * Yer her zaman ayrılmış (`min-h-16`), içerik yalnızca cevaptan sonra geliyor.
 * Yükseklik bir ALT sınır olduğu için iki satırlık bir düzeltme de sığıyor;
 * daha uzun ek bilgiler (örnek cümle gibi) bilerek şeride konmuyor — şerit
 * tek bakışta okunan bir cevap, bir metin bloğu değil.
 */
function VerdictBar({
  verdict,
  feedback,
}: {
  verdict: "correct" | "wrong" | null;
  feedback?: ReactNode;
}) {
  // Şerit yalnızca söyleyecek sözü olan oyunlarda var. Eşleştirme ve tanıtım
  // kartında cevaptan sonra gösterilecek bir düzeltme yok; orada boş bir şerit
  // ekranın dibinde 80 piksel ölü alan demek olurdu.
  if (!feedback) return null;

  return (
    <div className="mt-4 min-h-16 shrink-0">
      <AnimatePresence initial={false}>
        {verdict ? (
          <motion.div
            key={verdict}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`verdict flex min-h-16 items-center gap-3 px-4 py-3 text-left text-sm font-semibold ${
              verdict === "correct" ? "verdict-correct" : "verdict-wrong"
            }`}
          >
            <span className="shrink-0">
              {verdict === "correct" ? <CheckIcon size={20} /> : <XIcon size={20} />}
            </span>
            <div className="min-w-0">{feedback}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
