import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    value: number;

    @CreateDateColumn()
    createdAt: Date;
}
