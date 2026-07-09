import {httpClient} from '@/shared/api/httpClient';
import type{LoginRequest, LoginResponse} from '@/features/auth/types/authTypes';

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>('/auth/signin', data);
    return response.data;
}

export async function logoutApi(): Promise<void> {
    return Promise.resolve();
}
