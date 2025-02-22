import { EntityTemplate } from "src/common/models/entities/entity-template";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ListVisibilitiesEnum } from "../enums/list-visibilities.enum";
import { UserEntity } from "src/user/models/entities/user.entity";
import { ListingEntity } from "src/listing/models/entities/listing.entity";
import { UserListEntity } from "src/user-list/models/entities/user-list.entity";

@Entity({ name: 'lists', schema: process.env.DB_SCHEMA })
export class ListEntity extends EntityTemplate {
    constructor(name: string, visibility: ListVisibilitiesEnum) {
        super();
        this.name = name;
        this.visibility = visibility;
    }

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'enum', enum: ListVisibilitiesEnum, nullable: false })
    visibility: ListVisibilitiesEnum;

    // --{ RELATIONS }--

    @OneToMany(() => UserListEntity, userList => userList.user)
    usersLists: UserListEntity[];

    @OneToMany(() => ListingEntity, listing => listing.list)
    listings: ListingEntity[];
}