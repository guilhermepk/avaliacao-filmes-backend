import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";
import { ListEntity } from "src/list/models/entities/list.entity";

export class CreateListingDto {
    constructor(tmdbContentId: number, contentType: ContentTypesEnum, list: ListEntity){
        this.tmdbContentId = tmdbContentId;
        this.contentType = contentType;
        this.list = list;
    }

    contentType: ContentTypesEnum;
    tmdbContentId: number;
    list: ListEntity
}