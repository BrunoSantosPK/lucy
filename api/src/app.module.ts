import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './models/wallet.entity';
import { WalletsController } from './wallets/wallets.controller';
import { ConfigModule } from '@nestjs/config';
import { Tag } from './models/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./src/config/app.env"
    }),
    WalletsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Wallet, Tag],
      synchronize: true
    })
  ],
  controllers: [AppController, WalletsController],
  providers: [AppService],
})
export class AppModule {}
