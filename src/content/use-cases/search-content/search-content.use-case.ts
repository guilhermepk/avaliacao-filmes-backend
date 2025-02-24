import { Injectable, NotFoundException } from "@nestjs/common";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";
import { search } from "src/apis/tmdb/tmdb.api";
import { tryCatch } from "src/common/functions/try-catch";

@Injectable()
export class SearchContentUseCase {
    constructor(){}

    async execute(query: string, type: ContentTypesEnum, page?: number){
        return await tryCatch(async () => {
            return await search(type, query, page)
                .then(response => {
                    if (response['total_results'] === 0) throw new NotFoundException(`Nenhum resultado encontrado para ${query}`);
                    else return response;
                });
        }, ``);
    }
}