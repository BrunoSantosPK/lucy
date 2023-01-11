import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "../models/tag.entity";
import { SeedService } from "./seed.service";
import { ConfigModule } from "@nestjs/config";
import { Wallet } from "../models/wallet.entity";
import { Seeder } from "./seeder";
import { WalletTag } from "../models/wallet-tag.entity";
import { Transaction } from "../models/transaction.entity";
import { Budget } from "../models/budget.entity";
import { BudgetTag } from "../models/budget-tag.entity";
import { TransactionTag } from "../models/transaction-tag.entity";
import { Transfer } from "../models/transaction-transfer.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: "./src/config/app.env"
        }),
        SeedModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Wallet, Tag, WalletTag, Transaction, Budget, BudgetTag, TransactionTag, Transfer],
            synchronize: true
        }),
        TypeOrmModule.forFeature([Tag])
    ],
    providers: [SeedService, Seeder]
})
export class SeedModule {}