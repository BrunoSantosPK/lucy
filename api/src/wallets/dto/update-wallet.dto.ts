import { IsNotEmpty, Length } from 'class-validator'

export class UpdateWalletDto {
    @IsNotEmpty()
    @Length(36, 36)
    id: string;

    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsNotEmpty()
    @Length(10)
    description: string;
}