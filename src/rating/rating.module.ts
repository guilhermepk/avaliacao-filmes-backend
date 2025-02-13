import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingEntity } from "./models/entities/rating.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([RatingEntity])
    ],
    controllers: [],
    providers: [],
})
export class RatingModule {}