// Path: src/context/AuthContext.tsx
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';

// Define the shape of the user object and the state
interface User {
    id: string;
    name: string;
    token:string;
}

export interface AuthState {
  user: User | null;
}

// Define action types and the shape of action objects
type AuthAction =
  | { type: 'LOGIN'; payload: { data: User } }
  | { type: 'LOGOUT' };

// Create the AuthContext with a default value
export const AuthContext = createContext<{
  user: User | null;
  dispatch: Dispatch<AuthAction>;
}>({
  user: null,
  dispatch: () => null,
});

// Define the reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: { ...action.payload.data },
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};

// Define the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const user = JSON.parse(localStorage.getItem('user') ?? 'null') as User | null;
  const initialState: AuthState = { user };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
