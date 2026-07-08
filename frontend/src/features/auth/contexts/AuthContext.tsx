// src/features/auth/contexts/AuthContext.tsx

import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthContextValue, AuthUser } from '../types/authTypes';
import {
  getStoredUser,
  removeStoredUser,
  saveUser,
} from '../utils/tokenStorage';

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const login = (loginUser: AuthUser) => {
    saveUser(loginUser);
    setUser(loginUser);
  };

  const logout = () => {
    removeStoredUser();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(() => {
    const roles = user?.roles ?? [];

    return {
      user,
      isAuthenticated: Boolean(user),
      isAdmin: roles.includes('ROLE_ADMIN'),
      isModerator: roles.includes('ROLE_MODERATOR'),
      login,
      logout,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}