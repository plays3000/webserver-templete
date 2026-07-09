export type UserRole = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN';

export type SignupRequest = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles?: UserRole[];
};

export type SigninRequest = {
    username: string;
    password: string;
};

export type AuthResponse = {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email:string;
    roles: UserRole[];
    accessToken: string;
    tokenType: 'Bearer';
};

export type JwtPayload= {
    userId: string;
    username: string;
    roles: UserRole[];
};

