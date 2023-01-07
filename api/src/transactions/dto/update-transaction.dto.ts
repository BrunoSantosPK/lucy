import { IsNotEmpty, Length } from "class-validator";

export class UpdateTransactionDto {
    @IsNotEmpty()
    @Length(36, 36)
    idTransaction: string;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    tags: string[];

    @IsNotEmpty()
    date: Date;
}