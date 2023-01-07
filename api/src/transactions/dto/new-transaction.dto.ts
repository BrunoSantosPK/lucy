import { IsNotEmpty, Length } from "class-validator";

export class NewTransactionDto {
    @IsNotEmpty()
    @Length(36, 36)
    idWalletOrigin: string;

    @Length(36, 36)
    idWalletDestiny: string;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    tags: string[];

    @IsNotEmpty()
    date: Date;
}