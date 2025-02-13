import { EntityTemplate } from "src/common/models/entities/entity-template";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ListVisibilitiesEnum } from "../enums/list-visibilities.enum";
import { UserEntity } from "src/user/models/entities/user.entity";
import { ListingEntity } from "src/listing/models/entities/listing.entity";

@Entity({ name: 'lists', schema: process.env.DB_SCHEMA })
export class ListEntity extends EntityTemplate {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'enum', enum: ListVisibilitiesEnum, nullable: false })
    visibility: ListVisibilitiesEnum;

    // --{ RELATIONS }--

    @JoinColumn({ name: 'fk_user' })
    @ManyToOne(() => UserEntity, user => user.lists, { nullable: false })
    user: UserEntity;

    @OneToMany(() => ListingEntity, listing => listing.list)
    listings: ListingEntity[];
}