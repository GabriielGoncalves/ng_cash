import { AppDataSource } from './data-source';
import { Accounts } from '../entity/Account';
import { Transactions } from '../entity/Transaction';
import { Users } from '../entity/User';

const [accountsRepository, transactionsRepository, usersRepository] = [
    AppDataSource.getRepository(Accounts),
    AppDataSource.getRepository(Transactions),
    AppDataSource.getRepository(Users),
];

class Database {
    async findUserByName(username: string): Promise<Users | null> {
        const result = await usersRepository.findOne({
            where: {
                username,
            },
            relations: {
                account: true,
            },
        });
        return result;
    }

    private async createAccount(): Promise<Accounts> {
        try {
            const newAccount = new Accounts();
            newAccount.balance = 100;
            const result = await accountsRepository.save(newAccount);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async registerNewUser(user: {
        username: string;
        password: string;
    }): Promise<Users> {
        try {
            const account = await this.createAccount();
            const newUser = new Users();
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.account = account;
            const result = await usersRepository.save(newUser);

            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async showBalance(id: string): Promise<Accounts | null> {
        try {
            const result = await accountsRepository.findOneBy({
                id,
            });
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async transfer(senderUser: Users, recipientUser: Users, value: number) {
        try {
            const debitedAccount = await this.findAccount(
                senderUser.account.id,
            );

            const creditedAccount = await this.findAccount(
                recipientUser.account.id,
            );

            await this.updateBalance(debitedAccount!, creditedAccount!, value);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    private async findAccount(id: string) {
        try {
            const result = await accountsRepository.findOne({
                where: {
                    id,
                },
            });
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    private async updateBalance(
        debitedAccount: Accounts,
        creditedAccount: Accounts,
        value: number,
    ) {
        try {
            let accountUpdate = new Accounts();
            accountUpdate.balance = debitedAccount.balance - value;

            await accountsRepository.update(
                {
                    id: debitedAccount.id,
                },
                accountUpdate,
            );

            accountUpdate = new Accounts();
            accountUpdate.balance = creditedAccount.balance + value;

            await accountsRepository.update(
                {
                    id: creditedAccount.id,
                },
                accountUpdate,
            );

            const transaction = await this.createTransaction(
                debitedAccount,
                creditedAccount,
                value,
            );

            return transaction;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    private async createTransaction(
        debitedAccount: Accounts,
        creditedAccount: Accounts,
        value: number,
    ) {
        try {
            const newTransaction = new Transactions();

            newTransaction.creditedAccount = creditedAccount;
            newTransaction.debitedAccount = debitedAccount;
            newTransaction.value = value;

            const result = await transactionsRepository.save(newTransaction);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async showExtract(user: Users) {
        try {
            const accountFound = await this.findAccount(user.account.id);
            const result = await transactionsRepository.find({
                where: [
                    { creditedAccount: accountFound! },
                    { debitedAccount: accountFound! },
                ],
                relations: {
                    creditedAccount: true,
                    debitedAccount: true,
                },
            });
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default new Database();
