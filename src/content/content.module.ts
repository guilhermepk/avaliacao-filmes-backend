import { Module } from "@nestjs/common";
import { FindContentByTmdbIdUseCase } from "./use-cases/find-by-tmdb-id/find-content-by-tmdb-id.use-case";
import { FindContentByTmdbIdController } from "./use-cases/find-by-tmdb-id/find-content-by-tmdb-id.controller";
import { SearchContentUseCase } from "./use-cases/search-content/search-content.use-case";
import { SearchContentController } from "./use-cases/search-content/search-content.controller";
import { DiscoverContentsController } from "./use-cases/discover/discover-contents.controller";
import { DiscoverContentsUseCase } from "./use-cases/discover/discover-contents.use-case";

@Module({
    imports: [],
    controllers: [
        FindContentByTmdbIdController,
        SearchContentController,
        DiscoverContentsController
    ],
    providers: [
        FindContentByTmdbIdUseCase,
        SearchContentUseCase,
        DiscoverContentsUseCase
    ],
    exports: [
        FindContentByTmdbIdUseCase
    ]
})
export class ContentModule {}