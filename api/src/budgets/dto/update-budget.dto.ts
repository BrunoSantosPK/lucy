import { IsNotEmpty, Length } from "class-validator";

export class UpdateBudgetDto {
    @IsNotEmpty()
    @Length(36, 36)
    id: string;

    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @Length(10)
    comment: string;
}