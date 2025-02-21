import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserListEntity } from "./models/entities/user-list.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserListEntity])
    ],
    controllers: [],
    providers: []
})
export class UserListModule {}