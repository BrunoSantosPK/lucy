import { IsNotEmpty, Length } from "class-validator";

export class DeleteTransactionDto {
    @IsNotEmpty()
    @Length(36, 36)
    idTransaction: string;
}