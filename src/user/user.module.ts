import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./models/entities/user.entity";
import { RegisterUserController } from "./use-cases/register-user/register-user.controller";
import { RegisterUserUseCase } from "./use-cases/register-user/register-user.use-case";
import { FindUserByNicknameUseCase } from "./use-cases/find-user-by-nickname/find-user-by-nickname.use-case";
import { UserTypeOrmRepository } from "./repositories/user.repository";
import { BcryptModule } from "src/bcrypt/bcrypt.module";
import { FindUserByIdUseCase } from "./use-cases/find-by-id/find-user-by-id.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        BcryptModule
    ],
    controllers: [
        RegisterUserController
    ],
    providers: [
        UserTypeOrmRepository,
        RegisterUserUseCase,
        FindUserByNicknameUseCase,
        FindUserByIdUseCase
    ],
    exports: [
        FindUserByNicknameUseCase,
        FindUserByIdUseCase
    ]
})
export class UserModule {}