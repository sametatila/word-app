"use client";

import { useEffect, useState } from "react";

/**
 * Erdi kliplerini blob URL olarak veren yükleyici.
 *
 * Neden doğrudan `/anim/x.webp` değil: Safari animasyonlu görselin oynatma
 * durumunu ÖĞE başına değil URL başına tutuyor. Klipler bir tur oynayıp
 * donacak şekilde kodlu (loop=1); ilk tur bittikten sonra aynı URL'yi
 * kullanan her yeni <img> iPhone'da donmuş son karede açılıyordu — "birkaçı
 * hariç bütün mirketler duruyor" sorununun kaynağı buydu. Chrome her öğeyi
 * baştan oynatır, Safari oynatmaz.
 *
 * Çözüm: dosya bir kez indirilir (Blob, bellekte önbellek), her montajda o
 * Blob'dan TAZE bir `blob:` URL üretilir. Safari için yeni bir görsel, ağ için
 * hiçbir ek indirme yok. URL sökülürken serbest bırakılır.
 */
const blobs = new Map<string, Promise<Blob>>();

function loadBlob(file: string): Promise<Blob> {
  let p = blobs.get(file);
  if (!p) {
    p = fetch(`/anim/${file}.webp`).then((r) => {
      if (!r.ok) throw new Error(`clip ${file}: ${r.status}`);
      return r.blob();
    });
    p.catch(() => blobs.delete(file));
    blobs.set(file, p);
  }
  return p;
}

/** Klipleri önden ısıt — idle zinciri ilk geçişte takılmasın. */
export function preloadClips(files: string[]) {
  for (const f of files) void loadBlob(f).catch(() => {});
}

/**
 * Klibin bu montaja özel blob URL'si; yüklenene kadar null, hata olursa
 * dosya yolu (statik illüstrasyona düşüş orada, <img onError> ile).
 */
export function useClipUrl(file: string | null): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    let alive = true;
    let objectUrl: string | null = null;
    loadBlob(file)
      .then((b) => {
        if (!alive) return;
        objectUrl = URL.createObjectURL(b);
        setUrl(objectUrl);
      })
      .catch(() => {
        if (alive) setUrl(`/anim/${file}.webp`);
      });
    return () => {
      alive = false;
      setUrl(null);
      // Çift tampon eski URL'yi kısa süre daha gösteriyor; serbest bırakma gecikmeli.
      if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl!), 1500);
    };
  }, [file]);
  return url;
}
