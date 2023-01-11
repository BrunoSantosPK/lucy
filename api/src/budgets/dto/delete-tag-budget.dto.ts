import { IsNotEmpty, Length } from "class-validator";

export class DeleteBudgetTagDto {
    @IsNotEmpty()
    @Length(36, 36)
    id: string;
}