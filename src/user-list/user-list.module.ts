import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserListEntity } from "./models/entities/user-list.entity";
import { UserListTypeOrmRepository } from "./repositories/user-list.repository";
import { CreateUserListUseCase } from "./use-cases/create/create-user-list.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserListEntity])
    ],
    controllers: [],
    providers: [
        UserListTypeOrmRepository,
        CreateUserListUseCase
    ],
    exports: [
        CreateUserListUseCase
    ]
})
export class UserListModule {}