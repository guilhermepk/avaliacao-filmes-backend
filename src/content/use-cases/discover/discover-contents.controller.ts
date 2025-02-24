import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";
import { DiscoverContentsUseCase } from "./discover-contents.use-case";
import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";

@Controller('content')
export class DiscoverContentsController {
    constructor(
        private readonly useCase: DiscoverContentsUseCase
    ){}

    @Get('discover/:type')
    async handle(
        @Param('type') type: string
    ){
        const validType = Object.values(ContentTypesEnum).find(contentType => contentType == type);
        if (!validType) throw new BadRequestException(`type deve ser um dos seguintes: ${Object.values(ContentTypesEnum).join(', ')}`);

        return await this.useCase.execute(validType);
    }
}