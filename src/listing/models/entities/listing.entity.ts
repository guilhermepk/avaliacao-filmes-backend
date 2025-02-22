import { ContentTypesEnum } from "src/apis/tmdb/models/enums/content-type.enum";
import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ListEntity } from "src/list/models/entities/list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'listings', schema: process.env.DB_SCHEMA })
export class ListingEntity extends EntityTemplate {
    constructor(tmdbContentId: number, list: ListEntity, contentType: ContentTypesEnum){
        super();
        this.tmdbContentId = tmdbContentId;
        this.list = list;
        this.contentType = contentType;
    }

    @Column({ type: 'integer', name: 'tmdb_content_id', nullable: false })
    tmdbContentId: number;

    @Column({ name: 'content_type', type: 'enum', enum: ContentTypesEnum, nullable: false })
    contentType: ContentTypesEnum;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string;

    // --{ RELATIONS } --

    @JoinColumn({ name: 'fk_list' })
    @ManyToOne(() => ListEntity, list => list.listings, { nullable: false })
    list: ListEntity;
}