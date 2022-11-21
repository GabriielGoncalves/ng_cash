import { NextFunction, Request, Response } from 'express';
import Database from '../models/database/index';
import { hashPassword } from '../utils/encryptPassword';
import { generateToken, validatePassword } from '../utils/auth';

//rever regex
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user: {
            username: string;
            password: string;
        } = req.body;

        const userFound = await Database.findUserByName(user.username);
        if (userFound) {
            return res.status(406).json({
                message: `Usuário existente. Por favor, informe outro username para cadastro`,
            });
        }

        user.password = await hashPassword(user.password);

        const result = await Database.registerNewUser(user);

        return res.status(200).json({ msg: result });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const userFound = await Database.findUserByName(req.body.username);
        if (!userFound) {
            return res.status(404).json({ msg: 'Usuário não cadastrado!' });
        }
        const passwordIsValid = await validatePassword(
            req.body.password,
            userFound.password,
        );
        if (!passwordIsValid) {
            return res.status(401).json({
                msg: 'Usuário ou senha incorretos. Favor tentar novamente.',
            });
        }
        const token = generateToken(userFound);
        return res.status(200).json({
            msg: {
                ...userFound,
                token,
            },
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
