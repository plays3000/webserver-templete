// src/features/auth/contexts/AuthContext.tsx

import {
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthUser } from '../types/authTypes';
import {
  getStoredUser,
  removeStoredUser,
  saveUser,
} from '../utils/tokenStorage';
import {deleteAccountApi} from '../api/authApi';
import type {DeleteAccountRequest} from '../types/authTypes';
import {AuthContext} from './authContext';

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
  const deleteAccount = async (data: DeleteAccountRequest) => {
    await deleteAccountApi(data);
    removeStoredUser();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.roles.includes('ROLE_ADMIN') ?? false,
      isModerator: user?.roles.includes('ROLE_MODERATOR') ?? false,
      login,
      logout,
      deleteAccount,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
