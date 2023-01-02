import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "../models/tag.entity";
import { SeedService } from "./seed.service";
import { ConfigModule } from "@nestjs/config";
import { Wallet } from "../models/wallet.entity";
import { Seeder } from "./seeder";

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
            entities: [Wallet, Tag],
            synchronize: true
        }),
        TypeOrmModule.forFeature([Tag])
    ],
    providers: [SeedService, Seeder]
})
export class SeedModule {}