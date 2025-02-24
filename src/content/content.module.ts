import { Module } from "@nestjs/common";
import { FindContentByTmdbIdUseCase } from "./use-cases/find-by-tmdb-id/find-content-by-tmdb-id.use-case";
import { FindContentByTmdbIdController } from "./use-cases/find-by-tmdb-id/find-content-by-tmdb-id.controller";
import { SearchContentUseCase } from "./use-cases/search-content/search-content.use-case";
import { SearchContentController } from "./use-cases/search-content/search-content.controller";

@Module({
    imports: [],
    controllers: [
        FindContentByTmdbIdController,
        SearchContentController
    ],
    providers: [
        FindContentByTmdbIdUseCase,
        SearchContentUseCase
    ],
    exports: [
        FindContentByTmdbIdUseCase
    ]
})
export class ContentModule {}