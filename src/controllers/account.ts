import { Request, Response } from 'express';
import Database from '../models/database/index';
import { decryptToken } from '../utils/decryptToken';

const showBalance = async (req: Request, res: Response) => {
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
        throw new Error((error as Error).message);
    }
};

//salvar transação na tabela transactions
const transferMoney = async (req: Request, res: Response) => {
    try {
        const { username, money }: { username: string; money: number } =
            req.body;

        const token = req.headers.authorization!.split(' ')[1];
        const payload = decryptToken(token);

        const user = await Database.findUserByName(payload!.user.username);

        if (username == user!.username) {
            return res.status(400).json({
                msg: 'Não é possível realizar uma transferência para si mesmo',
            });
        }
        const userFound = await Database.findUserByName(username);

        if (!userFound) {
            return res.status(404).json({ msg: 'Usuário nao encontrado!' });
        }

        if (money > user!.account.balance) {
            return res.status(400).json({ msg: 'Saldo insuficiente' });
        }

        await Database.transfer(user!, userFound!, money);

        return res
            .status(200)
            .json({ msg: 'Transferência realizada com sucesso!' });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    showBalance,
    transferMoney,
};
