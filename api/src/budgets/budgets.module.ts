import { Module } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { BudgetController } from "./budgets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Budget } from "../models/budget.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Budget])],
    providers: [BudgetService],
    controllers: [BudgetController],
    exports: [BudgetService]
})
export class BudgetModule {}