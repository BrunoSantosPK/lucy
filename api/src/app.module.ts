import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './models/wallet.entity';
import { WalletsController } from './wallets/wallets.controller';
import { ConfigModule } from '@nestjs/config';
import { Tag } from './models/tag.entity';
import { WalletTag } from './models/wallet-tag.entity';
import { TagsModule } from './tags/tags.module';
import { TagsController } from './tags/tags.controller';
import { Transaction } from './models/transaction.entity';
import { Budget } from './models/budget.entity';
import { BudgetTag } from './models/budget-tag.entity';
import { TransactionTag } from './models/transaction-tag.entity';
import { Transfer } from './models/transaction-transfer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./src/config/app.env"
    }),
    WalletsModule,
    TagsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Wallet, Tag, WalletTag, Transaction, Budget, BudgetTag, TransactionTag, Transfer],
      synchronize: true
    })
  ],
  controllers: [AppController, WalletsController, TagsController],
  providers: [AppService],
})
export class AppModule {}
