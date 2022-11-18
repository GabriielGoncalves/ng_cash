import { Request, Response } from 'express';
import Database from '../models/database/index';
import { decryptToken } from '../utils/decryptToken';

export const showBalance = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization!.split(' ')[1];
        const payload = decryptToken(token);

        const result = await Database.showBalance(payload?.account?.id);
        if (result) {
            return res
                .status(200)
                .json({ msg: `Balance: R$ ${result.balance}` });
        }
        return res.status(404).json({
            msg: 'Ops! Você não pode visualizar um balance que não seja o seu.',
        });
    } catch (error) {
        console.log(error);
    }
};

//usuario deve ser capaz de transferir dinheiro pra outra pessoa informando apenas o username
//usuario não pode transferir pra ele mesmo
export const transferMoney = (req: Request, res: Response) => {
    const a = 1;
};

export const showExtract = (req: Request, res: Response) => {
    const a = 1;
};
