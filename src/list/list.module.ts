import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListEntity } from "./models/entities/list.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ListEntity])
    ],
    controllers: [],
    providers: [],
})
export class ListModule {}