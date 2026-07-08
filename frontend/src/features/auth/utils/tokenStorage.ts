import type {AuthUser} from '@/features/auth/types/authTypes';

const USER_STORAGE_KEY = 'user';

export function saveUser(user: AuthUser) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function getStoredUser(): AuthUser | null {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser){
        return null;
    }

    try {
        return JSON.parse(storedUser) as AuthUser;
    }
    catch{
        localStorage.removeItem(USER_STORAGE_KEY);
        return null
    }
}

export function getAccessToken(): string | null {
    const user = getStoredUser();
    return user?.accessToken ?? null;
}

export function removeStoredUser(){
    localStorage.removeItem(USER_STORAGE_KEY);
}