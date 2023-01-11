import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TransactionTag } from './transaction-tag.entity';
import { BudgetTag } from './budget-tag.entity';

@Entity({name: "tags"})
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    name: string;

    @Column({type: 'datetime', default: () => 'NOW()', name: 'create_at'})
    createAt: Date;

    @Column({type: "boolean", default: false})
    systemTag: boolean;

    @OneToMany(() => TransactionTag, transactionTag => transactionTag.id)
    transactionTagIds: TransactionTag[]

    @OneToMany(() => BudgetTag, budgetTag => budgetTag.id)
    budgetTagIds: BudgetTag[]
}