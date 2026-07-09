import type {NextFunction, Request, Response} from 'express';

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 500){
        super(message);
        this.statusCode = statusCode;
    }
}

export function asyncHandler<TRequest extends Request=Request>(
    handler: (
        req: TRequest,
        res: Response,
        next: NextFunction
    ) => Promise<unknown>,
){
    return (req: TRequest, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction){
    next(new AppError(`요청한 경로를 찾을 수 없습니다: ${req.originalUrl}`, 404))
}

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
){
    console.error(error);
    if (error instanceof AppError){
        return res.status(error.statusCode).json({
            message: error.message,
        })
    }
    if (error instanceof Error){
        const statusCode = 
            error.message.includes('아이디 혹은 비밀번호') ||
            error.message.includes('사용자를 찾을 수 없습니다.')
            ? 401
            : 400;
        return res.status(statusCode).json({
            message: error.message,
        })
    }

    return res.status(500).json({
        message: '서버 내부 오류가 발생했습니다.'
    })
}