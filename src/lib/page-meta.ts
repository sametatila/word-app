import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";

/**
 * Sekme başlığını ARAYÜZ DİLİNDE üretir.
 *
 * Her sayfa `export const metadata = { title: "Başarımlar" }` yazıyordu ve
 * bu başlıklar sabit Türkçeydi: arayüzü Almanca olan kullanıcının tarayıcı
 * sekmesinde, yer imlerinde ve ana ekrana eklediği kısayolda Türkçe yazıyordu.
 * `metadata` bir SABİT olduğu için çeviri oradan çağrılamıyor; `generateMetadata`
 * ise sunucuda çalışan bir fonksiyon, yani çerezi okuyabiliyor.
 *
 * Kullanım tek satır:
 *
 *   export const generateMetadata = titleMeta("profile.achievements");
 *
 * Not: bir rota parçasında `metadata` ile `generateMetadata` BİRLİKTE
 * dışa aktarılamıyor (Next belgeleri) — biri gidince öteki gelir.
 */
export function titleMeta(key: string): () => Promise<Metadata> {
  return async () => {
    const t = await getT();
    return { title: t(key) };
  };
}
