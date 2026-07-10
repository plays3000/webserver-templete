import {httpClient} from '@/shared/api/httpClient';
import type{
    LoginRequest, 
    LoginResponse, 
    SignupRequest,
    DeleteAccountRequest,
    DeleteAccountResponse
} from '@/features/auth/types/authTypes';

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>('/auth/signin', data);
    return response.data;
}

export async function logoutApi(): Promise<void> {
    return Promise.resolve();
}

export async function signupApi(data: SignupRequest): Promise<LoginResponse>{
    const response = await httpClient.post<LoginResponse>('/auth/signup', data);
    return response.data;
}

export async function deleteAccountApi(data: DeleteAccountRequest): Promise<DeleteAccountResponse>{
    const response = await httpClient.delete<DeleteAccountResponse>('/auth/me', { data });
    return response.data;
}