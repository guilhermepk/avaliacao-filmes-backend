import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserDataDto } from "src/auth/models/dtos/user-data.dto";
import { tryCatch } from "src/common/functions/try-catch";
import { AddContentToListDto } from "src/list/models/dtos/add-content-to-list.dto";
import { FindListByIdUseCase } from "../find-by-id/find-list-by-id.use-case";
import { FindContentByTmdbIdUseCase } from "src/content/use-cases/find-by-tmdb-id/find-content-by-tmdb-id.use-case";
import { EntityManager } from "typeorm";
import { CreateListingUseCase } from "src/listing/use-cases/create/create-listing.use-case";
import { CreateListingDto } from "src/listing/models/dtos/create-listing.dto";
import { FindUserByIdUseCase } from "src/user/use-cases/find-by-id/find-user-by-id.use-case";

@Injectable()
export class AddContentToListUseCase {
    constructor(
        private readonly findListById: FindListByIdUseCase,
        private readonly findContentByTmdbId: FindContentByTmdbIdUseCase,
        private readonly entityManager: EntityManager,
        private readonly createListing: CreateListingUseCase,
        private readonly findUserById: FindUserByIdUseCase
    ){}

    async execute(data: AddContentToListDto, userData: UserDataDto): Promise<{ success: true }> {
        return await tryCatch(async () => {
            return await this.entityManager.transaction(async (manager) => {
                const { contents, listId } = data;
    
                const user = await this.findUserById.execute(userData.id);

                const list = await this.findListById.execute(listId);
                if (!list.usersLists.find(userList => userList.user.id === user.id)) throw new ForbiddenException(`A lista ${list.id} - ${list.name} não pertence a ${userData.name}`);

                await Promise.all(contents.map(async (content) => {
                    if (!list.listings.find(listing => listing.tmdbContentId == content.tmdbId)) {
                        await this.findContentByTmdbId.execute(content.tmdbId, content.type);
    
                        await this.createListing.execute(new CreateListingDto(content.tmdbId, content.type, list), manager);
                    }
                }));

                return { success: true };
            });
        }, `Erro ao adicionar conteúdo à lista`);
    }
}