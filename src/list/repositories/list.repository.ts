import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { ListEntity } from "../models/entities/list.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ListTypeOrmRepository {
    constructor(
        @InjectRepository(ListEntity)
        private readonly repository: Repository<ListEntity>
    ){}

    async create(list: ListEntity, entityManager?: EntityManager){
        if (entityManager) {
            return await entityManager.save(ListEntity, list);
        } else {
            return await this.repository.save(list);
        }
    }
}