import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListingEntity } from "../models/entities/listing.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class ListingTypeOrmRepository {
    constructor(
        @InjectRepository(ListingEntity)
        private readonly repository: Repository<ListingEntity>
    ){}

    async create(listing: ListingEntity, entityManager?: EntityManager){
        if (entityManager) return await entityManager.save(ListingEntity, listing);
        else return await this.repository.save(listing);
    }
}