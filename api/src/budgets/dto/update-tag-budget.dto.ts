import { IsNotEmpty, Length, Min } from "class-validator";

export class UpdateBudgetTagDto {
    @IsNotEmpty()
    @Length(36, 36)
    id: string;

    @IsNotEmpty()
    @Min(0)
    minValue: number;

    @IsNotEmpty()
    @Min(0)
    maxValue: number;
}