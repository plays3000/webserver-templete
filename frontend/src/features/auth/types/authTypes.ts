// src/features/auth/types/authTypes.ts

export type UserRole = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN';

export type LoginRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export type AuthUser = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: UserRole[];
  accessToken: string;
  tokenType?: string;
};

export type LoginResponse = AuthUser;

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  deleteAccount: (data: DeleteAccountRequest)=> Promise<void>;
};

export type DeleteAccountRequest = {
  password: string;
  confirmText: string;
};

export type DeleteAccountResponse = {
  message: string;
}