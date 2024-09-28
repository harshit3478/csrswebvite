// Path: src/hooks/useLoadEmergencies.ts
import { useEmergencyContext } from "./useEmergencyContext";
import { Emergency } from "../context/EmergencyContext"; // Ensure you export Emergency from the context file

interface FetchResponse {
  data: Emergency[];
}

export const useLoadEmergencies = () => {
  const { emergencies , dispatch } = useEmergencyContext();

  const loadEmergencies = async () => {
    try {
      if(emergencies !== null) return console.log("emergencies already fetched");

      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/emergency/v1/get`);
      const data: FetchResponse = await res.json();

      if (res.ok) {
        console.log("emergencies fetched", data);
        dispatch({ type: "GET_EMERGENCIES", payload: data.data });
      } else {
        console.error("error fetching emergencies", data);
      }
    } catch (error) {
      console.error("error fetching emergencies", error);
    }
  };

  return { loadEmergencies };
};
