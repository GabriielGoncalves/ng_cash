import { Router } from 'express';
import { showBalance } from '../controllers/account';
import { verifyToken } from '../middlewares/verifyToken';

export const accountRouter = Router();

accountRouter.get('/account/balance', verifyToken, showBalance);
