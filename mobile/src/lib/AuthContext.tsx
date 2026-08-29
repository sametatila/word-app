import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getSession, signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut, type AuthUser, type AuthOutcome } from "./auth";

type Ctx = {
  user: AuthUser | null;
  /** Oturum ilk kez okunuyor (açılış): ekran kararı bunu bekler. */
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthOutcome>;
  signUp: (name: string, email: string, password: string) => Promise<AuthOutcome>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<Ctx>({
  user: null, loading: true,
  signIn: async () => ({ ok: false, code: "", message: "" }),
  signUp: async () => ({ ok: false, code: "", message: "" }),
  signOut: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => { setUser(await getSession()); }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const u = await getSession();
      if (alive) { setUser(u); setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const r = await apiSignIn(email, password);
    if (r.ok) setUser(r.user ?? (await getSession()));
    return r;
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const r = await apiSignUp(name, email, password);
    if (r.ok) setUser(r.user ?? (await getSession()));
    return r;
  }, []);

  const signOut = useCallback(async () => { await apiSignOut(); setUser(null); }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
