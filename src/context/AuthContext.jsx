import React, { createContext, useState } from 'react';
import { someHelper } from './authContextUtils';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
export function useAuth() {
  return useContext(AuthContext);
}

  // auth logic here

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
