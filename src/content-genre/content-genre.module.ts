import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentGenreEntity } from "./models/entities/content-genre.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ContentGenreEntity])
    ],
    controllers: [],
    providers: [],
})
export class ContentGenreModule {}