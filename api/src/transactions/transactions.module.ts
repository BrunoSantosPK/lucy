import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../models/transaction.entity";
import { Wallet } from "../models/wallet.entity";
import { TransactionController } from "./transactions.controller";
import { TransactionService } from "./transactions.service";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet])],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService]
})
export class TransactionModule {}