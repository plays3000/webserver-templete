import {Router} from 'express';
import authRoutes from './authRoutes';
import healthRoutes from './healthRoutes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;