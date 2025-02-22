import { Injectable } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch";
import { CreateUserListDto } from "src/user-list/models/dtos/create-user-list.dto";
import { UserListEntity } from "src/user-list/models/entities/user-list.entity";
import { UserListTypeOrmRepository } from "src/user-list/repositories/user-list.repository";
import { EntityManager } from "typeorm";

@Injectable()
export class CreateUserListUseCase {
    constructor(
        private readonly typeOrmRepository: UserListTypeOrmRepository
    ){}

    async execute(data: CreateUserListDto, entityManager?: EntityManager): Promise<UserListEntity> {
        return await tryCatch(async () => {
            const { list, user } = data;
            return await this.typeOrmRepository.create(new UserListEntity(user, list), entityManager);
        }, `Erro ao criar relação entre usuário ${data.user.id} - ${data.user.name} e lista ${data.list.id} - ${data.list.name}`);
    }
}