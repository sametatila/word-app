"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef } from "react";

/**
 * KAYDEDİLMEMİŞ EMEK — bir oynatıcının içindeki herhangi bir parça "burada
 * yazılmış ya da çözülmüş ama henüz kaydedilmemiş bir şey var" diyebiliyor.
 * Mobil `lib/unsavedWork` ile aynı sözleşme.
 *
 * NEDEN: Beceriler ve Patika alıştırmasında (yazma, okuma, dinleme, dil
 * bilgisi, konuşma) "Kapat" ve kenar çubuğu bağlantıları SORMADAN çıkıyordu;
 * yazılan ilan metni ve çözülen görevler hiçbir yere kaydedilmiyor,
 * alıştırma baştan açılıyordu (QA F-0054, Android'de görüldü). Ekran hangi kartta ne yazıldığını bilmiyor; kart
 * biliyor. Bayrağı her karttan ekrana prop prop taşımak yerine bağlam: kart
 * `useUnsavedWork(koşul)` çağırıyor, ekran yalnız "bir şey var mı"yı görüyor.
 */
type Report = (key: object, dirty: boolean) => void;
const UnsavedContext = createContext<Report | null>(null);

/** Ekranın kapsamı: kartlardan biri bile kirliyse `onChange(true)`. `onChange` kararlı olmalı (`setState`). */
export function UnsavedWorkScope({ onChange, children }: { onChange: (dirty: boolean) => void; children: React.ReactNode }) {
  const dirty = useRef(new Set<object>());
  const report = useCallback<Report>((key, on) => {
    const set = dirty.current;
    const before = set.size > 0;
    if (on) set.add(key);
    else set.delete(key);
    if (before !== set.size > 0) onChange(set.size > 0);
  }, [onChange]);
  return <UnsavedContext.Provider value={report}>{children}</UnsavedContext.Provider>;
}

/** Kartın bildirimi: `dirty` doğruyken çıkış onaya bağlı. Kart sökülünce bildirimi düşüyor. */
export function useUnsavedWork(dirty: boolean): void {
  const report = useContext(UnsavedContext);
  const key = useRef({}).current;
  useEffect(() => { report?.(key, dirty); }, [report, key, dirty]);
  useEffect(() => () => report?.(key, false), [report, key]);
}
