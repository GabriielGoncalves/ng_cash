import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Accounts } from './Account';

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'double precision', default: 100.0 })
    value: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Accounts)
    debitedAccount: Accounts;

    @ManyToOne(() => Accounts)
    creditedAccount: Accounts;
}
