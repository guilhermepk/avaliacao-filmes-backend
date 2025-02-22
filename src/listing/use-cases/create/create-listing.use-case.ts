import { Injectable } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch";
import { CreateListingDto } from "src/listing/models/dtos/create-listing.dto";
import { ListingEntity } from "src/listing/models/entities/listing.entity";
import { ListingTypeOrmRepository } from "src/listing/repositories/listing.repository";
import { EntityManager } from "typeorm";

@Injectable()
export class CreateListingUseCase {
    constructor(
        private readonly typeOrmRepository: ListingTypeOrmRepository
    ){}

    async execute(data: CreateListingDto, entityManager?: EntityManager): Promise<ListingEntity> {
        return await tryCatch(async () => {
            const { list, tmdbContentId, contentType } = data;

            const newListing = new ListingEntity(tmdbContentId, list, contentType);
            return await this.typeOrmRepository.create(newListing, entityManager)
        }, ``);
    }
}