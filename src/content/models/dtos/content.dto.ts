import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";

export class ContentDto {
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    tmdbId: number;

    @IsNotEmpty()
    @IsEnum(ContentTypesEnum)
    type: ContentTypesEnum
}