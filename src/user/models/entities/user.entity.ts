import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ListEntity } from "src/list/models/entities/list.entity";
import { RatingEntity } from "src/rating/models/entities/rating.entity";
import { SessionEntity } from "src/session/models/entities/session.entity";
import { UserListEntity } from "src/user-list/models/entities/user-list.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: `users`, schema: process.env.DB_SCHEMA })
export class UserEntity extends EntityTemplate {
    constructor(name: string, nickname: string, password: string) {
        super();
        this.name = name;
        this.nickname = nickname;
        this.password = password;
    }

    @Column({ type: `varchar`, nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    nickname: string;

    @Column({ type: `varchar`, nullable: false })
    password: string;


    // --{ RELATIONS }--
    
    @OneToMany(() => SessionEntity, session => session.user)
    sessions: SessionEntity[];

    @OneToMany(() => UserListEntity, userList => userList.user)
    usersLists: UserListEntity[];

    @OneToMany(() => RatingEntity, rating => rating.user)
    ratings: RatingEntity[];
}