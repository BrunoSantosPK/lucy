import { Controller, Delete, Post, Put, Res } from "@nestjs/common";
import { TransactionService } from "./transactions.service";
import { Response } from "express";

@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async new(@Res() res: Response) {}

    @Put()
    async update(@Res() res: Response) {}

    @Delete()
    async delete(@Res() res: Response) {}
}