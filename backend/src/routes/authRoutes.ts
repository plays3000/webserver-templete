import {Router} from 'express';
import {z} from 'zod';
import {validateBody} from '../middlewares/validateRequest';
import {asyncHandler} from '../middlewares/errorMiddleware';
import {authenticateToken} from '../middlewares/authMiddleware';
import {getMe, signin, signup} from '../services/authService';

const router = Router();

const signupSchema = z.object({
    username: z.string().trim().min(3, '아이디는 최소 3자 이상이어야 합니다.'),
    firstname: z.string().trim().min(1, '이름은 최소 1자 이상 작성해야 합니다.'),
    lastname: z.string().trim().min(1, '성씨는 최소 1자 이상 작성해야 합니다.'),
    email: z.string().trim().email('이메일 형식이 올바르지 않습니다.'),
    password: z.string().min(6,'비밀번호는 최소 6자 이상이어야 합니다.'),
    roles: z.array(z.enum(['ROLE_USER', 'ROLE_MODERATOR','ROLE_ADMIN'])).optional()
});

const signinSchema = z.object({
    username: z.string().trim().min(1, '아이디를 입력해주세요.'),
    password: z.string().trim().min(1, '비밀번호를 입력해주세요.'),
});

router.post(
    '/signup',
    validateBody(signupSchema),
    asyncHandler(async (req, res) => {
        const result = await signup(req.body);
        return res.status(201).json(result);
    }),
);
router.post(
    '/signin',
    validateBody(signinSchema),
    asyncHandler(async (req, res) => {
        const result = await signin(req.body);
        return res.status(200).json(result);
    }),

);
router.get(
    '/me',
    authenticateToken,
    asyncHandler(async (req, res) => {
        if (!req.user){
            return res.status(401).json({
                message: '인증 정보가 없습니다.',
            });
        }
        const result = await getMe(req.user.userId);
        return res.status(200).json(result);
    })
);

export default router