import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../models/transaction.entity";
import { Wallet } from "../models/wallet.entity";
import { TransactionController } from "./transactions.controller";
import { TransactionService } from "./transactions.service";
import { Tag } from "../models/tag.entity";
import { Transfer } from "../models/transaction-transfer.entity";
import { TransactionTag } from "../models/transaction-tag.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet, Tag, Transfer, TransactionTag])],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService]
})
export class TransactionModule {}