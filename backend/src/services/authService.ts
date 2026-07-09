import bcrypt from 'bcryptjs';
import {UserModel} from '../models/User.js';
import type {
    AuthResponse,
    SigninRequest,
    SignupRequest,
    UserRole,
} from '../types/authTypes';
import {env} from '../config/env';
import {signAccessToken} from './tokenService';

const allowedRoles: UserRole[] = ['ROLE_USER', 'ROLE_MODERATOR','ROLE_ADMIN'];

function normalizeRoles(roles?: UserRole[]): UserRole[] {
    if (!roles || roles.length === 0){
        return ['ROLE_USER'];
    }

    const uniqueRoles = Array.from(new Set(roles));

    const invalidRole = uniqueRoles.find((role)=> !allowedRoles.includes(role));

    if (invalidRole){
        throw new Error(`허용되지 않은 권한입니다: ${invalidRole}`);
    }

    return uniqueRoles;

};

function toAuthResponse (user: {
    _id: unknown;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: UserRole[];
}): AuthResponse{
    const accessToken = signAccessToken({
        userId: String(user._id),
        username: user.username,
        roles: user.roles,
    });

    return {
        id: String(user._id),
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles,
        accessToken,
        tokenType: 'Bearer',
    };
}

export async function signup(data: SignupRequest): Promise<AuthResponse> {
    const existingUser = await UserModel.findOne({
        $or: [{username: data.username},{email: data.email.toLowerCase()}],
    });

    if (existingUser){
        throw new Error(`이미 사용 중인 아이디 혹은 이메일입니다.`);
    }

    const passwordHash = await bcrypt.hash(data.password, env.bcryptSaltRounds);

    const user = await UserModel.create({
        username: data.username,
        email: data.email,
        passwordHash,
        roles: normalizeRoles(data.roles),
    });

    return toAuthResponse({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles as UserRole[],
    });
}

export async function signin(data: SigninRequest): Promise<AuthResponse> {
    const user = await UserModel.findOne({
        username: data.username,
    });

    if (!user){
        throw new Error('아이디 혹은 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid){
        throw new Error('아이디 혹은 비밀번호가 올바르지 않습니다.');
    }

    return toAuthResponse({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles as UserRole[],
    });
}

export async function getMe(userId: string): Promise<Omit<AuthResponse, 'accessToken' | 'tokenType'>>{
    const user = await UserModel.findById(userId);
    if (!user){
        throw new Error('사용자를 찾을 수 없습니다.');
    }
    return {
        id: String(user._id),
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles as UserRole[],
    }
}