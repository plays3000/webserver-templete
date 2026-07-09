// 인증 미들웨어에서 req.user를 사용할 수 있게 타입 확장을 합니다.

import type {JwtPayload} from './authTypes';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {};