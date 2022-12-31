import { IsNotEmpty, Length } from 'class-validator'

export class CreateWalletDto {
    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsNotEmpty()
    @Length(10)
    description: string;
}