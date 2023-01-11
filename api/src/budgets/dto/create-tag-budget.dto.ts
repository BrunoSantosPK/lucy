import { IsNotEmpty, Length, Min } from "class-validator";

export class CreateBudgetTagDto {
    @IsNotEmpty()
    @Length(36, 36)
    idTag: string;

    @IsNotEmpty()
    @Length(36, 36)
    idBudget: string;

    @IsNotEmpty()
    @Min(0)
    minValue: number;

    @IsNotEmpty()
    @Min(0)
    maxValue: number;
}