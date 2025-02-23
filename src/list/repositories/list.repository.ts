import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { ListEntity } from "../models/entities/list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/models/entities/user.entity";

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

    async findByUser(user: UserEntity): Promise<Array<{ usersListsCount: number } & ListEntity>> {
        const schema = process.env.DB_SCHEMA

        const query = `
            WITH "usersLists" AS (
                SELECT COUNT(fk_list) AS "count", fk_list 
                FROM users_lists 
                GROUP BY fk_list
            )
            SELECT
                LI.*,
                "usersLists".count AS "usersListsCount"
            FROM
                ${schema ? schema+'.' : ''}lists AS LI
                LEFT JOIN ${schema ? schema+'.' : ''}users_lists AS UL ON UL.fk_list = LI.id
                LEFT JOIN "usersLists" ON "usersLists".fk_list = LI.id
            WHERE
                UL.fk_user = $1
            GROUP BY 
                LI.id, "usersLists".count;
        `
        const params = [user.id];
        return await this.repository.query(query, params);
    }
}