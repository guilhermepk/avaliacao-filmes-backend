import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { ListEntity } from "../models/entities/list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/models/entities/user.entity";
import { printSqlAndParams } from "src/common/functions/print-sql-and-params.function";

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

    async findByUser(user: UserEntity): Promise<Array<{ usersListsCount: number, countMovie: number, countTV: number } & ListEntity>> {
        const schema = process.env.DB_SCHEMA

        const query = `                
            WITH "usersLists" AS (
                SELECT COUNT(fk_list) AS "count", fk_list 
                FROM ${schema ? schema+'.' : ''}users_lists 
                GROUP BY fk_list
            ), "contentTypes" AS (
                SELECT
                    SUM(CASE WHEN content_type = 'movie' THEN 1 ELSE 0 END) AS "countMovie",
                    SUM(CASE WHEN content_type = 'tv' THEN 1 ELSE 0 END) AS "countTV",
                    fk_list
                FROM ${schema ? schema+'.' : ''}listings 
                GROUP BY fk_list
            )
            SELECT
                LI.*,
                "usersLists".count AS "usersListsCount",
                "contentTypes"."countMovie",
                "contentTypes"."countTV"
            FROM
                ${schema ? schema+'.' : ''}lists AS LI
                LEFT JOIN ${schema ? schema+'.' : ''}users_lists AS UL ON UL.fk_list = LI.id
                LEFT JOIN "usersLists" ON "usersLists".fk_list = LI.id
                LEFT JOIN "contentTypes" ON "contentTypes".fk_list = LI.id
            WHERE
                UL.fk_user = $1
            GROUP BY 
                LI.id, "usersLists".count, "contentTypes"."countMovie", "contentTypes"."countTV";
        `
        const params = [user.id];

        // printSqlAndParams(query, params);

        return await this.repository.query(query, params);
    }
}