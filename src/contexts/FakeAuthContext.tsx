import { useReducer } from 'react';
import { AuthContext } from './useAuth';
import { User } from '../types';

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action!');
  }
}

function AuthProvider({ children }: Props) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: 'login',
        payload: FAKE_USER,
      });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

interface Props {
  children: React.ReactNode;
}

interface StateType {
  user: null | User;
  isAuthenticated: boolean;
}

type ActionType = { type: 'login'; payload: User } | { type: 'logout' };

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};
