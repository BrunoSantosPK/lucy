import { IsNotEmpty, Length } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @Length(3, 20)
    name: string;
}