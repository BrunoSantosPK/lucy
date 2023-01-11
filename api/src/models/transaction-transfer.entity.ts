import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity({name: "transfers"})
export class Transfer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Transaction, transaction => transaction.originIds)
    @JoinColumn({name: "origin_id"})
    originId: string;

    @ManyToOne(() => Transaction, transaction => transaction.destinyIds)
    @JoinColumn({name: "destiny_id"})
    destinyId: string;
}