import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ListEntity } from "src/list/models/entities/list.entity";
import { UserEntity } from "src/user/models/entities/user.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'users_lists', schema: process.env.DB_SCHEMA })
export class UserListEntity extends EntityTemplate {
    // --{ RELATIONS }--
    @JoinColumn({ name: 'fk_user' })
    @ManyToOne(() => UserEntity, user => user.usersLists)
    user: UserEntity;

    @JoinColumn({ name: 'fk_list' })
    @ManyToOne(() => ListEntity, list => list.usersLists)
    list: ListEntity;
}