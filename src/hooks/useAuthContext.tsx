// Path: src/hooks/useAuthContext.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthState } from "../context/AuthContext"; // Ensure you export AuthState from the context file

export const useAuthContext = (): AuthState & { dispatch: React.Dispatch<any> } => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
