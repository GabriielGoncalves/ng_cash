import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Accounts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'double precision', default: 100.0 })
    balance: number;
}
