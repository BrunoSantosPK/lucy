import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Tag } from "./tag.entity";
import { Transaction } from "./transaction.entity";

@Entity({name: "transaction_tags"})
export class TransactionTag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Transaction, transaction => transaction.transactionTagIds)
    @JoinColumn({name: "transaction_id"})
    transactionId: string;

    @ManyToOne(() => Tag, tag => tag.transactionTagIds)
    @JoinColumn({name: "tag_id"})
    tagId: string;
}