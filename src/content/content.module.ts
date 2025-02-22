import { Module } from "@nestjs/common";
import { FindContentByTmdbIdUseCase } from "./use-cases/find-by-tmdb-id/find-content-by-tmdb-id.use-case";
import { FindContentByTmdbIdController } from "./use-cases/find-by-tmdb-id/find-content-by-tmdb-id.controller";

@Module({
    imports: [],
    controllers: [
        FindContentByTmdbIdController
    ],
    providers: [
        FindContentByTmdbIdUseCase
    ],
    exports: [
        FindContentByTmdbIdUseCase
    ]
})
export class ContentModule {}