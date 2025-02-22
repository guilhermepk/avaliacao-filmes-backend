import { Injectable } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch";
import { FindContentByTmdbIdUseCase } from "src/content/use-cases/find-by-tmdb-id/find-content-by-tmdb-id.use-case";
import { CreateListDto } from "src/list/models/dtos/create-list.dto";
import { ListEntity } from "src/list/models/entities/list.entity";
import { ListTypeOrmRepository } from "src/list/repositories/list.repository";
import { CreateListingDto } from "src/listing/models/dtos/create-listing.dto";
import { CreateListingUseCase } from "src/listing/use-cases/create/create-listing.use-case";
import { CreateUserListDto } from "src/user-list/models/dtos/create-user-list.dto";
import { CreateUserListUseCase } from "src/user-list/use-cases/create/create-user-list.use-case";
import { UserEntity } from "src/user/models/entities/user.entity";
import { FindUserByIdUseCase } from "src/user/use-cases/find-by-id/find-user-by-id.use-case";
import { EntityManager } from "typeorm";

@Injectable()
export class CreateListUseCase {
    private currentTransactionManager: EntityManager;
    private createdList: ListEntity;

    constructor(
        private readonly repository: ListTypeOrmRepository,
        private readonly entityManager: EntityManager,
        private readonly findContentByTmdbIdUseCase: FindContentByTmdbIdUseCase,
        private readonly createListingUseCase: CreateListingUseCase,
        private readonly createUserListUseCase: CreateUserListUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase
    ){}

    async execute(data: CreateListDto, requesterId: number){
        return await tryCatch(async () => {
            return await this.entityManager.transaction(async (manager: EntityManager) => {
                this.currentTransactionManager = manager;

                const { contents, name, visibility, otherUsersIds } = data;
                
                const newList = new ListEntity(name, visibility);
                this.createdList = await this.repository.create(newList, manager);

                await this.bindUsers(requesterId, otherUsersIds)

                await Promise.all(contents.map(async (content) => {
                    const { tmdbId, type } = content;

                    await this.findContentByTmdbIdUseCase.execute(tmdbId, type)

                    await this.createListingUseCase.execute(new CreateListingDto(tmdbId, type, this.createdList), manager);
                }));

                return { success: true };
            })
        }, `Erro ao criar lista`);
    }

    async bindUsers(requesterId: number, otherUsersIds?: number[]): Promise<void> {
        const requester: UserEntity = await this.findUserByIdUseCase.execute(requesterId);
        await this.createUserListUseCase.execute(new CreateUserListDto(requester, this.createdList), this.currentTransactionManager);
        
        if (otherUsersIds) {
            await Promise.all(otherUsersIds?.map(async (id) => {
                const foundUser = await this.findUserByIdUseCase.execute(id);
                await this.createUserListUseCase.execute(new CreateUserListDto(foundUser, this.createdList), this.currentTransactionManager);
            }));
        }
    }
}