import type {Request, Response, NextFunction} from 'express';
import {AppError} from './errorMiddleware';
import {verifyAccessToken} from '../services/tokenService';
import type {UserRole} from '../types/authTypes';

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
){
    const authorization = req.headers.authorization;
    if (!authorization){
        return next(new AppError('인증 토큰이 없습니다.', 401));
    }

    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer' || !token) {
        return next(new AppError('인증 토큰 형식이 올바르지 않습니다.', 401));
    }
    try {
        req.user = verifyAccessToken(token);
        return next();
    }
    catch {
        return next(new AppError(`인증 토큰이 유효하지 않습니다.`, 401));
    }
}

export function requireRoles(...roles: UserRole[]){
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError('인증 정보가 없습니다.', 401));
        }
        const hasRole = req.user.roles.some((role)=> roles.includes(role));

        if (!hasRole){
            return next(new AppError('접근 권한이 없습니다.', 403));
        }

        return next();
    }
}