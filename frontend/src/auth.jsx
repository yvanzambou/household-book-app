import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext(null);

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("session")) || { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);
  // true, solange direkt nach dem Login die Begrüßung angezeigt werden soll
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  function login(token, user) {
    const s = { token, user };
    localStorage.setItem("session", JSON.stringify(s));
    setSession(s);
    setJustLoggedIn(true);
  }

  const logout = useCallback(() => {
    localStorage.removeItem("session");
    setSession({ token: null, user: null });
    setJustLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ ...session, login, logout, justLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
