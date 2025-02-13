import { EntityTemplate } from "src/common/models/entities/entity-template";
import { Column, Entity, OneToMany } from "typeorm";
import { ContentTypesEnum } from "../enums/content_types.enum";
import { ListingEntity } from "src/listing/models/entities/listing.entity";
import { RatingEntity } from "src/rating/models/entities/rating.entity";
import { ContentGenreEntity } from "src/content-genre/models/entities/content-genre.entity";

@Entity({ name: 'contents', schema: process.env.DB_SCHEMA })
export class ContentEntity extends EntityTemplate {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'enum', enum: ContentTypesEnum, nullable: false })
    category: ContentTypesEnum;

    @Column({ type: 'varchar', nullable: false })
    overview: string;

    // TODO: autores

    // --{ RELATIONS }--

    @OneToMany(() => ListingEntity, listing => listing.content)
    listings: ListingEntity[];

    @OneToMany(() => RatingEntity, rating => rating.content)
    ratings: RatingEntity[];

    @OneToMany(() => ContentGenreEntity, contentGenre => contentGenre.content)
    contentsGenres: ContentGenreEntity[];
}