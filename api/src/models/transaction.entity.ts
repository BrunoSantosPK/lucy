import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Wallet } from "./wallet.entity";
import { Transfer } from "./transaction-transfer.entity";
import { TransactionTag } from "./transaction-tag.entity";

@Entity({name: "transactions"})
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Wallet, wallet => wallet.transactionIds)
    @JoinColumn({name: "wallet_id"})
    walletId: string;

    @Column({type: "float", nullable: false})
    value: number;

    @Column({type: "date", nullable: false})
    date: Date;

    @Column({type: "text", nullable: true})
    comment: string;

    @Column({type: "datetime", default: () => "NOW()", name: "create_at"})
    createAt: Date;

    @Column({type: "datetime", nullable: true, name: "modify_at"})
    modifyAt: Date;

    @OneToMany(() => Transfer, transfer => transfer.id)
    originIds: Transfer[];

    @OneToMany(() => Transfer, transfer => transfer.id)
    destinyIds: Transfer[];

    @OneToMany(() => TransactionTag, transactionTag => transactionTag.id)
    transactionTagIds: TransactionTag[]
}