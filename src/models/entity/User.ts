import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Accounts } from './Account';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @OneToOne(() => Accounts)
    @JoinColumn()
    account: Accounts;
}
