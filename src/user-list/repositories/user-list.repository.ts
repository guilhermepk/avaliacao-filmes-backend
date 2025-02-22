import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserListEntity } from "../models/entities/user-list.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class UserListTypeOrmRepository {
    constructor(
        @InjectRepository(UserListEntity)
        private readonly repository: Repository<UserListEntity>
    ){}

    async create(userList: UserListEntity, entityManager?: EntityManager): Promise<UserListEntity> {
        if (entityManager) return await entityManager.save(UserListEntity, userList);
        else return await this.repository.save(userList);
    }
}