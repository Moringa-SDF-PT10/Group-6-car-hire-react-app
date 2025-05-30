import { createContext, useContext } from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the custom hook
const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// 3. Export as named exports
export { AuthContext, useAuth };
