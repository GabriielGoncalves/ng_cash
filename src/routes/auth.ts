import { Router } from 'express';
import { register, login } from '../controllers/auth';
import {
    setValidationResult,
    userValidator,
} from '../middlewares/userValidator';

export const authRouter = Router();

authRouter.post(
    '/users/register',
    userValidator,
    setValidationResult,
    register,
);
authRouter.post('/users/login', login);
