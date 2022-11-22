import { Request, Response } from 'express';
import { getPayloadToken } from '../utils/getPayloadToken';
import Database from '../models/database/index';

const showBalance = async (req: Request, res: Response) => {
    try {
        const payload = getPayloadToken(req);
        const result = await Database.showBalance(payload!.user.account.id);
        if (result) {
            return res
                .status(200)
                .json({ msg: `Balance: R$ ${result.balance.toFixed(2)}` });
        }
        return res.status(404).json({
            msg: 'Ops! Você não pode visualizar um balance que não seja o seu.',
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const transferMoney = async (req: Request, res: Response) => {
    try {
        const { username, money }: { username: string; money: number } =
            req.body;

        const payload = getPayloadToken(req);

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

const showExtract = async (req: Request, res: Response) => {
    try {
        const payload = getPayloadToken(req);
        const result = await Database.showExtract(payload!.user);

        if (!result) {
            return res.status(200).json({
                msg: 'Ops! Você ainda não realizou nenhuma transação para visualizar.',
            });
        }

        return res.status(200).json({ msg: result });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const showTransactionsSend = async (req: Request, res: Response) => {
    try {
        const payload = getPayloadToken(req);
        const result = await Database.showTransactionsSend(payload!.user);

        if (!result) {
            return res.status(200).json({
                msg: 'Ops! Você ainda não realizou nenhuma transação para visualizar.',
            });
        }

        return res.status(200).json({ msg: result });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const showTransactionsReceived = async (req: Request, res: Response) => {
    try {
        const payload = getPayloadToken(req);
        const result = await Database.showTransactionsReceived(payload!.user);

        if (!result) {
            return res.status(200).json({
                msg: 'Ops! Você ainda não recebeu nenhuma transação para visualizar.',
            });
        }
        return res.status(200).json({ msg: result });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    showBalance,
    transferMoney,
    showExtract,
    showTransactionsSend,
    showTransactionsReceived,
};
