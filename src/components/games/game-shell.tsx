"use client";

import type { ReactNode } from "react";
import type { Why } from "@/lib/why";
import { Mascot } from "@/components/mascot";
import { RoundSheet, roundSheetHeight } from "./round-sheet";

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
 *   SONUÇ (dipte)    — cevaptan sonraki geri bildirim katmanı.
 *
 * ## Sonuç neden ayrı bir KATMAN
 *
 * Geri bildirim daha önce her oyunun kendi içinde, şıkların altında, küçük
 * gri bir satırdı ve her oyunda ayrı yazılmıştı. Üç sorunu vardı: turun en
 * önemli anı (yanlış bildiğini öğrenmek) ekranın en zayıf tipografisine
 * düşüyordu; satır belirince şıkların zıplamaması için her oyun kendi
 * boşluğunu ayırıyordu; ve on bir oyunda on bir farklı biçim çıkmıştı.
 *
 * Ortak bir şerit bunu çözdü ama bir kayma kaldı: şeridin altındaki "Devam"
 * cevapla birlikte belirdiği için kart uzuyor, esneyen boşluklar küçülüyor
 * ve şıklar YUKARI kayıyordu — hem de tam öğrencinin işaretlediği şıkka
 * baktığı anda. Şerit artık akışta değil, içeriğin üstüne binen ayrı bir
 * katman (`round-sheet`): alttaki hiçbir şey kımıldamıyor.
 *
 * Katman içeriği örtmüyor; kapladığı bandı burası turun başından itibaren
 * dipte boş tutuyor (`SheetGap`). Yani cevaptan önceki ve sonraki düzen
 * birebir aynı.
 *
 * ## Boşluk
 *
 * Artan boşluk üç yere dağılıyor, ikisinin TAVANI var: iki bölge arası en çok
 * 7rem, dokunma bölgesiyle katman arası en çok 2rem, artan ne varsa okuma
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
 * (bkz. FitBox); katman orada da ekranın dibinde, kartın kolonunda.
 */
export function GameShell({
  label,
  prompt,
  hint,
  children,
  footer,
  verdict = null,
  feedback,
  why = null,
  pull = true,
  sheet = true,
  onContinue,
}: {
  label: string;
  /** Sorunun kendisi. Oyunun içeriği zaten yeterince açıksa boş bırakılabilir. */
  prompt?: ReactNode;
  hint?: ReactNode;
  /** Dokunma bölgesi: şıklar, girdi, butonlar. */
  children: ReactNode;
  footer?: ReactNode;
  /** Cevap verildi mi, verildiyse doğru mu. `null` iken katman kapalı. */
  verdict?: "correct" | "wrong" | null;
  /**
   * Yanlışın gerekçesi (WP-13): şeridin ikinci satırı. Yalnız yanlışta ve
   * yalnız oyun bir kural çıkarabildiğinde; doğru cevapta gerekçe yok.
   */
  why?: Why | null;
  /** Şeritte yazacak olan: doğru karşılık, anlam, düzeltme. */
  feedback?: ReactNode;
  /** Erdi'nin şeridi çekerek getirme koreografisi bu oyunda olabilir mi. */
  pull?: boolean;
  /**
   * Bu turda alttan çıkan katman var mı.
   *
   * Yer turun BAŞINDAN ayrıldığı için karar cevaba bakamaz: `onContinue`
   * ancak cevaptan sonra dolduğundan ona bakmak, boşluğun tam cevap anında
   * belirmesi — yani düzeltmeye çalışılan kaymanın ta kendisi — demek olurdu.
   * Tanıtım kartında sonuç diye bir şey yok; oradan `false` geliyor.
   */
  sheet?: boolean;
  /**
   * "Devam" — cevaptan sonra turu KULLANICI kapatır.
   *
   * Tur eskiden kendiliğinden ilerliyordu: doğruda 620 ms, yanlışta 1200 ms
   * ya da okumanın süresi. Bu, düzeltmeyi ve gerekçeyi okumaya yetmiyordu ve
   * kararı öğrencinin elinden alıyordu — hoparlöre basıp tekrar dinlemek de
   * mümkün değildi, tur çoktan geçmiş oluyordu. Katmanın dibinde sabit bir
   * "Devam" var ve karar öğrencinin.
   */
  onContinue?: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:block">
      {/* SORU KARTI — mobil `rounds.tsx` › `Prompt` ile aynı: kendi yüzeyi,
          kenarlığı ve gölgesi var. Önce etiket dolgulu bir çipti ve soru
          sayfa zemininde duruyordu; okuma bölgesinin nerede bittiği yalnızca
          boşluktan anlaşılıyordu. */}
      <div className="card px-4 py-6 text-center">
        <span className="muted text-micro uppercase tracking-eyebrow">{label}</span>
        {prompt ? <div className="mt-1.5 text-h3 sm:text-h2">{prompt}</div> : null}
        {hint ? <div className="muted mt-1 text-body">{hint}</div> : null}
      </div>

      {/*
        İki bölge arası — boşluğu Erdi dolduruyor (mobil `MascotMid`).
        Cevaptan sonra gizleniyor ama YERİNİ koruyor: şıklar zıplamasın.
        Sebebi tek Erdi kuralı: aynı anda hem burada hem katmanda duramaz.

        ARTAN BOŞLUK BURADA TOPLANIYOR, sorunun ÜSTÜNDE değil. Önce üstteydi
        ve uzun ekranda soru kartı dibe çöküyordu; mobilde soru en üstte kalır,
        esneyen tek yer bu orta bölge (`MascotMid`, `flex: 1`).
      */}
      <div aria-hidden={verdict != null} className="flex min-h-5 grow items-center justify-center md:hidden">
        {verdict == null ? <Mascot mood="idle" size={72} /> : null}
      </div>

      <div className="md:mt-5">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}

      {/* Dokunma bölgesiyle katman arasındaki pay. En az sınırı yok: sıkışık
          ekranda tamamen kapanıp yeri içeriğe bırakıyor. */}
      <div aria-hidden className="max-h-8 grow md:hidden" />

      {/* AKSİYON ALANI — katmanın oturacağı band. Cevaptan önce boş duruyor;
          dolduğunda içerik kımıldamıyor. */}
      {sheet ? <SheetGap hasFeedback={feedback !== undefined} /> : null}
      <RoundSheet verdict={verdict} feedback={feedback} why={why} pull={pull} onContinue={onContinue} />
    </div>
  );
}

/**
 * Katmanın kapladığı boşluk.
 *
 * Ölçü katmanın kendi en az yüksekliğiyle aynı yerden geliyor
 * (`roundSheetHeight`); iki sayı ayrı yazılsaydı biri değişince öbürü sessizce
 * kayar, katman ya şıkların üstüne biner ya da altta boşluk bırakırdı.
 */
function SheetGap({ hasFeedback }: { hasFeedback: boolean }) {
  return <div aria-hidden className="shrink-0" style={{ height: roundSheetHeight(hasFeedback) }} />;
}
