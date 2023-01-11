import { Body, Controller, Delete, Post, Put, Res } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { Response } from "express";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { DeleteBudgetDto } from "./dto/delete-budget.dto";
import { CreateBudgetTagDto } from "./dto/create-tag-budget.dto";
import { UpdateBudgetTagDto } from "./dto/update-tag-budget.dto";
import { DeleteBudgetTagDto } from "./dto/delete-tag-budget.dto";

@Controller("budget")
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) {}

    @Post()
    async createBudget(@Res() res: Response, @Body() body: CreateBudgetDto) {}

    @Put()
    async updateBudget(@Res() res: Response, @Body() body: UpdateBudgetDto) {}

    @Delete()
    async deleteBudget(@Res() res: Response, @Body() body: DeleteBudgetDto) {}

    @Post("tag")
    async addBudgetTag(@Res() res: Response, @Body() body: CreateBudgetTagDto) {}

    @Put("tag")
    async updateBudgetTag(@Res() res: Response, @Body() body: UpdateBudgetTagDto) {}

    @Delete("tag")
    async deleteBudgetTag(@Res() res: Response, @Body() body: DeleteBudgetTagDto) {}
}