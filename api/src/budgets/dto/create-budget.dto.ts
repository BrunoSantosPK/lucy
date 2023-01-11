import { IsNotEmpty, Length } from "class-validator";

export class CreateBudgetDto {
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