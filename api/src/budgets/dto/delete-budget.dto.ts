import { IsNotEmpty, Length } from "class-validator";

export class DeleteBudgetDto {
    @IsNotEmpty()
    @Length(36, 36)
    id: string;
}