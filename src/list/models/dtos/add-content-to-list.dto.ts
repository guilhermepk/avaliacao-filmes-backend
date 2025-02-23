import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { ContentDto } from "src/content/models/dtos/content.dto";

export class AddContentToListDto {
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    listId: number;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ContentDto)
    contents: ContentDto[];
}