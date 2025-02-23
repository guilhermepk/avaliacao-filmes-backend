import { Injectable } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch";
import { ListEntity } from "src/list/models/entities/list.entity";
import { ListTypeOrmRepository } from "src/list/repositories/list.repository";
import { FindUserByIdUseCase } from "src/user/use-cases/find-by-id/find-user-by-id.use-case";

@Injectable()
export class FindListsByUserUseCase {
    constructor(
        private readonly typeOrmRepository: ListTypeOrmRepository,
        private readonly findUserById: FindUserByIdUseCase
    ){}

    async execute(userId: number, userName: string): Promise<{ singleLists: ListEntity[], sharedLists: ListEntity[] }> {
        return await tryCatch(async () => {
            const user = await this.findUserById.execute(userId);

            return await this.typeOrmRepository.findByUser(user)
                .then(response => {
                    const singleLists = response.filter(list => list.usersListsCount == 1);
                    const sharedLists = response.filter(list => list.usersListsCount > 1);

                    return { singleLists, sharedLists }
                });
        }, `Erro ao buscar listas de ${userName}`);
    }
}