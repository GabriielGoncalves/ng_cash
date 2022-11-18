import 'dotenv/config';
import { NextFunction, Response, Request } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.headers.authorization!.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET as Secret);
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Falha na autenticação' });
    }
};
