import type {NextFunction, Request, Response} from 'express';
import type {ZodSchema} from 'zod';

export function validateBody(schema: ZodSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success){
            return res.status(400).json({
                message: '요청 데이터가 올바르지 않습니다',
                errors: result.error.flatten(),
            });
        }
        req.body = result.data;
        return next();
    }
}