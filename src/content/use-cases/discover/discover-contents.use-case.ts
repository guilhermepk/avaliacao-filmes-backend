import { Injectable } from "@nestjs/common";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";
import { discover } from "src/apis/tmdb/tmdb.api";
import { tryCatch } from "src/common/functions/try-catch";

@Injectable()
export class DiscoverContentsUseCase {
    async execute(type: ContentTypesEnum, page?: number){
        return await tryCatch(async () => {
            return await discover(type, page);
        }, `Erro ao descobrir conteúdos`);
    }
}