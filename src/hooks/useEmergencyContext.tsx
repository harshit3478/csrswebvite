// Path: src/hooks/useEmergencyContext.ts
import { useContext } from "react";
import { EmergencyContext } from "../context/EmergencyContext";
import { EmergencyState } from "../context/EmergencyContext"; // Ensure you export EmergencyState from the context file

export const useEmergencyContext = (): EmergencyState & { dispatch: React.Dispatch<any> } => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error("useEmergencyContext must be used within an EmergencyContextProvider");
  }
  return context;
};
