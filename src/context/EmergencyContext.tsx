// Path: src/context/EmergencyContext.tsx
import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the shape of the emergency object
export interface Emergency {
  _id: number;
  email: string;
  location: {
    latitude: number;
    longitude: number;
    landmark: string | null;
  };
  status: string;
  createdOn : string;
  resolvedOn: string | null;
  timeTaken: number | null;
  description: string | null;
  sensitivity: string | null;
  user: User;
}
 
export interface User{
  id: number;
  email: string;
  username: string;
  phone: string;
  imageUrl:string | null ;
  rollNo: string;
  deviceToken: string | null;

}

// Define the state structure
export interface EmergencyState {
  emergencies: Emergency[] | null;
}

// Define action types and the shape of action objects
type EmergencyAction =
  | { type: 'GET_EMERGENCIES'; payload: Emergency[] };

// Create the EmergencyContext with a default value
export const EmergencyContext = createContext<{
  emergencies: Emergency[] | null;
  dispatch: Dispatch<EmergencyAction>;
}>({
  emergencies: null,
  dispatch: () => null,
});

// Define the reducer function
const emergencyReducer = (state: EmergencyState, action: EmergencyAction): EmergencyState => {
  switch (action.type) {
    case 'GET_EMERGENCIES':
      return {
        emergencies: action.payload
      };
    default:
      return state;
  }
};

// Define the provider component
interface EmergencyContextProviderProps {
  children: ReactNode;
}

export const EmergencyContextProvider = ({ children }: EmergencyContextProviderProps) => {
  const initialState: EmergencyState = {
    emergencies: null,
  };
  const [state, dispatch] = useReducer(emergencyReducer, initialState);

  return (
    <EmergencyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmergencyContext.Provider>
  );
};
