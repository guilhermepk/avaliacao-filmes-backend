import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ListEntity } from "src/list/models/entities/list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'listings', schema: process.env.DB_SCHEMA })
export class ListingEntity extends EntityTemplate {
    @Column({ type: 'integer', name: 'tmdb_content_id', nullable: false })
    tmdbContentId: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;

    // --{ RELATIONS } --

    @JoinColumn({ name: 'fk_list' })
    @ManyToOne(() => ListEntity, list => list.listings, { nullable: false })
    list: ListEntity;
}