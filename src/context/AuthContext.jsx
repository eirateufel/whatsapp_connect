import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    apiUrl: null,
    idInstance: null,
    token: null,
    isAuthenticated: false,
  });

  const login = ({ apiUrl, idInstance, token }) => {
    setAuth({ apiUrl, idInstance, token, isAuthenticated: true });
  };

  const logout = () => {
    setAuth({
      apiUrl: null,
      idInstance: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}