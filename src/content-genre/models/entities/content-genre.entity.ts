import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ContentEntity } from "src/content/models/entities/content.entity";
import { GenreEnrity } from "src/genre/models/entities/genre.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'contents_genres', schema: process.env.DB_SCHEMA })
export class ContentGenreEntity extends EntityTemplate {
    // --{ RELATIONS }--

    @JoinColumn({ name: 'fk_genre' })
    @ManyToOne(() => GenreEnrity, genre => genre.contentsGenres, { nullable: false })
    genre: GenreEnrity;

    @JoinColumn({ name: 'fk_content' })
    @ManyToOne(() => ContentEntity, content => content.contentsGenres, { nullable: false })
    content: ContentEntity;
}