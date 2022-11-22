import { Router } from 'express';
import accountController from '../controllers/account';
import { verifyToken } from '../middlewares/verifyToken';

export const accountRouter = Router();

accountRouter.get(
    '/account/balance',
    verifyToken,
    accountController.showBalance,
);
accountRouter.post(
    '/account/transfer',
    verifyToken,
    accountController.transferMoney,
);

accountRouter.get(
    '/account/extract',
    verifyToken,
    accountController.showExtract,
);

accountRouter.get(
    '/account/extract/cash-in',
    verifyToken,
    accountController.showTransactionsReceived,
);

accountRouter.get(
    '/account/extract/cash-out',
    verifyToken,
    accountController.showTransactionsSend,
);
