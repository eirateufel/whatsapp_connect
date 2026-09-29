import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    phone: null,
    apiUrl: null,
    idInstance: null,
    token: null,
    isAuthenticated: false,
  });

  const login = ({ phone, apiUrl, idInstance, token }) => {
    setAuth({ phone, apiUrl, idInstance, token, isAuthenticated: true });
  };

  const logout = () => {
    setAuth({
      phone: null,
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