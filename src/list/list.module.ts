import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListEntity } from "./models/entities/list.entity";
import { ListingModule } from "src/listing/listing.module";
import { ContentModule } from "src/content/content.module";
import { UserListModule } from "src/user-list/user-list.module";
import { CreateListUseCase } from "./use-cases/create/create-list.use-case";
import { CreateListController } from "./use-cases/create/create-list.controller";
import { ListTypeOrmRepository } from "./repositories/list.repository";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ListEntity]),
        ContentModule,
        ListingModule,
        UserListModule,
        UserModule
    ],
    controllers: [
        CreateListController
    ],
    providers: [
        ListTypeOrmRepository,
        CreateListUseCase
    ],
})
export class ListModule {}