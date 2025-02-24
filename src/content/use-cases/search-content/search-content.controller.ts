import { BadRequestException, Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { SearchContentUseCase } from "./search-content.use-case";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";

@Controller('content')
export class SearchContentController {
    constructor(
        private readonly useCase: SearchContentUseCase
    ){}

    @Get('search/:type/:query')
    async handle(
        @Param('type') type: string,
        @Param('query') query: string,
        @Query('page') page: string
    ){
        const numberPage = parseInt(page);
        const validPage = Number.isNaN ? undefined : numberPage;

        const validType = Object.values(ContentTypesEnum).find(contentType => contentType == type);
        if (!validType) throw new BadRequestException(`type deve ser um dos seguintes: ${Object.values(ContentTypesEnum).join(', ')}`);

        return await this.useCase.execute(query, validType, validPage);
    }
}