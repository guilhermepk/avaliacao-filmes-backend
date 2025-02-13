import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentEntity } from "./models/entities/content.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ContentEntity])
    ],
    controllers: [],
    providers: [],
})
export class ContentModule {}