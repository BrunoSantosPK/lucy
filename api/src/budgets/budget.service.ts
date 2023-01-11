import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Budget } from "../models/budget.entity";
import { Repository } from "typeorm";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";

@Injectable()
export class BudgetService {
    constructor(@InjectRepository(Budget) private budgetRepository: Repository<Budget>) {}

    async newBudget(data: CreateBudgetDto) {
        // Verifica se as datas são condizentes
        if(data.endDate < data.startDate) {
            throw new Error("A data de finalização tem de ser maior que a data de início.");
        }

        const budget = new Budget();
        budget.name = data.name;
        budget.startDate = data.startDate;
        budget.endDate = data.endDate;
        if(data.comment) {
            budget.description = data.comment;
        }
        await this.budgetRepository.save(budget);
    }

    async updateBudget(data: UpdateBudgetDto) {
        // Verifica se as datas são condizentes
        if(data.endDate < data.startDate) {
            throw new Error("A data de finalização tem de ser maior que a data de início.");
        }

        // Verifica se a meta enviada existe
        const budget = await this.budgetRepository.findOne({where: {id: data.id}});
        if(budget === null) {
            throw new Error("Meta não encontrada.");
        }

        budget.name = data.name;
        budget.startDate = data.startDate;
        budget.endDate = data.endDate;
        if(data.comment) {
            budget.description = data.comment;
        }
        await this.budgetRepository.save(budget);
    }
}