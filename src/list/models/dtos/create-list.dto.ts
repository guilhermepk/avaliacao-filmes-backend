import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { ListVisibilitiesEnum } from "../enums/list-visibilities.enum";
import { ContentDto } from "src/content/models/dtos/content.dto";
import { Type } from "class-transformer";

export class CreateListDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(ListVisibilitiesEnum)
    visibility: ListVisibilitiesEnum

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ContentDto)
    contents: Array<ContentDto>;

    @IsOptional()
    @IsArray()
    @IsNumber(undefined, { each: true })
    @IsInt({ each: true })
    @IsPositive({ each: true })
    otherUsersIds?: Array<number>;
}