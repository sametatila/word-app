"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** framer-motion'ı "hareketi azalt" tercihine bağlayan asıl sarmalayıcı (gerekçe `motion-provider`). */
export default function MotionConfigUser({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
