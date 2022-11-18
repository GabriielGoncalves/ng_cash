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
    async createAccount(): Promise<Accounts> {
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

    async findUserById(id: string): Promise<Users | null> {
        const result = await usersRepository.findOne({
            where: {
                id,
            },
            relations: {
                account: true,
            },
        });
        return result;
    }
}

export default new Database();
