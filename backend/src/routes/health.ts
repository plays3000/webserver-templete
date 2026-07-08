import {Router} from 'express';
import type{Request, Response} from 'express';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
    // throw new Error ('Application error');
    res.send({message : 'OK', timestamp: req.timestamp});
});