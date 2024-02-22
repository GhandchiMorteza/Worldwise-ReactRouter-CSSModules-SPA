import { createContext, useContext } from 'react';
import { AuthContextType } from '../types';

const defaultValue = {
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    console.warn(`Login not implemented! ${email + password}`);
  },
  logout: () => {
    console.warn('Logout not implemented!');
  },
};

const AuthContext = createContext<AuthContextType>(defaultValue);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside the AuthProvider');
  return context;
}

export { useAuth, AuthContext };
