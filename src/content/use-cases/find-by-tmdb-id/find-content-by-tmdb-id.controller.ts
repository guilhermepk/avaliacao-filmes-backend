import { BadRequestException, Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { FindContentByTmdbIdUseCase } from "./find-content-by-tmdb-id.use-case";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";

@Controller('content')
export class FindContentByTmdbIdController {
    constructor(
        private readonly useCase: FindContentByTmdbIdUseCase
    ){}

    @Get('find-by-tmdb-id/:contentType/:tmdbId')
    async handle(
        @Param('contentType') contentType: string,
        @Param('tmdbId', ParseIntPipe) tmdbId: number
    ){
        const validContentType = Object.values(ContentTypesEnum).find(value => value == contentType);
        if (!validContentType) throw new BadRequestException(`O tipo de conteúdo deve ser um dos seguintes: ${Object.values(ContentTypesEnum).join(', ')}`);

        return await this.useCase.execute(tmdbId, validContentType);
    }
}