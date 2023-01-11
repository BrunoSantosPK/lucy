import { Body, Controller, Delete, Post, Put, Res } from "@nestjs/common";
import { TransactionService } from "./transactions.service";
import { Response } from "express";
import { NewTransactionDto } from "./dto/new-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { DeleteTransactionDto } from "./dto/delete-transaction.dto";

@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async new(@Res() res: Response, @Body() body: NewTransactionDto) {}

    @Put()
    async update(@Res() res: Response, @Body() body: UpdateTransactionDto) {}

    @Delete()
    async delete(@Res() res: Response, @Body() body: DeleteTransactionDto) {}
}