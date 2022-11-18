import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Accounts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    balance: number;
}
