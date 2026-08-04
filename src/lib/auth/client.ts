"use client";

import { createAuthClient } from "@neondatabase/auth/next";

/** Tarayıcı tarafı Neon Auth istemcisi; istekleri /api/auth üzerinden geçer. */
export const authClient = createAuthClient();
