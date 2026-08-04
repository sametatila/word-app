"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth/client";

type Mode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res =
        mode === "signin"
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({ email, password, name: name || email.split("@")[0] });

      if (res?.error) {
        setError(translateError(res.error.message ?? ""));
        return;
      }
      router.push("/learn");
      router.refresh();
    } catch {
      setError("Bağlantı kurulamadı. Tekrar dene.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2">
        <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-white">
          W
        </span>
        <span className="text-lg font-bold">Wortspiel</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h1 className="text-xl font-bold">
          {mode === "signin" ? "Tekrar hoş geldin" : "Hesap oluştur"}
        </h1>
        <p className="muted mt-1 text-sm">
          {mode === "signin"
            ? "Serini kaldığın yerden sürdür."
            : "Birkaç saniye sürer, ilk kelimen hazır."}
        </p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          {mode === "signup" ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adın (isteğe bağlı)"
              autoComplete="name"
              className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand-400)]"
            />
          ) : null}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="E-posta"
            autoComplete="email"
            className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand-400)]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={8}
            placeholder="Parola (en az 8 karakter)"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand-400)]"
          />

          {error ? (
            <p className="rounded-xl px-3 py-2 text-sm" style={{ background: "color-mix(in srgb, var(--color-rose-500) 12%, transparent)", color: "var(--color-rose-500)" }}>
              {error}
            </p>
          ) : null}

          <button type="submit" disabled={busy} className="btn btn-primary w-full px-5 py-3.5 disabled:opacity-60">
            {busy ? "Bekle…" : mode === "signin" ? "Giriş yap" : "Kayıt ol"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="muted mt-4 w-full text-center text-sm underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}
        </button>
      </motion.div>

      <Link href="/" className="muted mt-6 text-center text-sm underline-offset-4 hover:underline">
        Ana sayfaya dön
      </Link>
    </div>
  );
}

function translateError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid") && m.includes("password")) return "E-posta veya parola hatalı.";
  if (m.includes("credential")) return "E-posta veya parola hatalı.";
  if (m.includes("exist")) return "Bu e-posta zaten kayıtlı. Giriş yapmayı dene.";
  if (m.includes("password")) return "Parola en az 8 karakter olmalı.";
  if (m.includes("email")) return "Geçerli bir e-posta gir.";
  return message || "Bir şeyler ters gitti. Tekrar dene.";
}
