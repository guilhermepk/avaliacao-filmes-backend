import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ContentEntity } from "src/content/models/entities/content.entity";
import { ListEntity } from "src/list/models/entities/list.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'listings', schema: process.env.DB_SCHEMA })
export class ListingEntity extends EntityTemplate {
    // --{ RELATIONS } --

    @JoinColumn({ name: 'fk_list' })
    @ManyToOne(() => ListEntity, list => list.listings, { nullable: false })
    list: ListEntity;

    @JoinColumn({ name: 'fk_content' })
    @ManyToOne(() => ContentEntity, content => content.listings, { nullable: false })
    content: ContentEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;
}