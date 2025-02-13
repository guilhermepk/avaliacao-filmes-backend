import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenreEnrity } from "./models/entities/genre.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([GenreEnrity])
    ],
    controllers: [],
    providers: [],
})
export class GenreModule {}