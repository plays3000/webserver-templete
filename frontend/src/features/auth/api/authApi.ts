// import {httpClient} from '@/shared/api/httpClient';
// import type{LoginRequest, LoginResponse} from '@/features/auth/types/authTypes';

// export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
//     const response = await httpClient.post<LoginResponse>('/auth/signin', data);
//     return response.data;
// }

// export async function logoutApi(): Promise<void> {
//     return Promise.resolve();
// }

// src/features/auth/api/authApi.ts

import type { AuthUser, LoginRequest, LoginResponse } from '../types/authTypes';

type MockUser = AuthUser & {
  password: string;
};

const mockUsers: MockUser[] = [
  {
    id: 1,
    username: 'admin',
    password: '12345678',
    email: 'admin@example.com',
    roles: ['ROLE_ADMIN'],
    accessToken: 'mock-admin-access-token',
    tokenType: 'Bearer',
  },
  {
    id: 2,
    username: 'testuser',
    password: '12345678',
    email: 'test@example.com',
    roles: ['ROLE_USER'],
    accessToken: 'mock-user-access-token',
    tokenType: 'Bearer',
  },
];

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers.find(
    (mockUser) =>
      mockUser.username === data.username &&
      mockUser.password === data.password,
  );

  if (!user) {
    throw new Error('Invalid username or password');
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    roles: user.roles,
    accessToken: user.accessToken,
    tokenType: user.tokenType,
  };
}

export async function logoutApi(): Promise<void> {
  return Promise.resolve();
}