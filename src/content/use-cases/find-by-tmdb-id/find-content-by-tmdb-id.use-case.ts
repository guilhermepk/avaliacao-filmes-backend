import { HttpException, ImATeapotException, Injectable, NotFoundException } from "@nestjs/common";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";
import { MovieContentType } from "src/apis/tmdb/models/types/movie-content.type";
import { TvContentType } from "src/apis/tmdb/models/types/tv-content.type";
import { getMovieById, getTvShowById } from "src/apis/tmdb/tmdb.api";
import { tryCatch } from "src/common/functions/try-catch";

@Injectable()
export class FindContentByTmdbIdUseCase {
    constructor(){}

    async execute(tmdbId: number, contentType: ContentTypesEnum): Promise<TvContentType | MovieContentType> {
        return await tryCatch(async () => {
            try {
                if(contentType === ContentTypesEnum.MOVIE) return await getMovieById(tmdbId);
                else if (contentType === ContentTypesEnum.TV_SHOW) return await getTvShowById(tmdbId);
                else throw new ImATeapotException(`Esse tipo de conteúdo nem existe aqui :( - ${contentType}`)
            } catch(error) {
                if (error instanceof HttpException) {
                    if (error.getStatus() == 404) throw new NotFoundException(`Conteúdo do tipo ${contentType} com ID ${tmdbId} não encontrado`);
                } else throw error;
            }
        }, `Erro ao buscar conteúdo de tipo ${contentType} com id ${tmdbId}`);
    }
}