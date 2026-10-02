import { genericCard, OG_SIZE } from "@/lib/og/card";

/**
 * `/en` paylaşım görseli. Görsel ayrı bir istek ve `proxy.ts` yalnız
 * sayfanın kendisine dil başlığı yazıyor; dil burada sabit.
 */
export const alt = "Lernomi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return genericCard("en");
}
