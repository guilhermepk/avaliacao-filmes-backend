import { EntityTemplate } from "src/common/models/entities/entity-template";
import { ContentGenreEntity } from "src/content-genre/models/entities/content-genre.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'genres', schema: process.env.DB_SCHEMA })
export class GenreEnrity extends EntityTemplate {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    // --{ RELATIONS }--

    @OneToMany(() => ContentGenreEntity, contentGenre => contentGenre.genre)
    contentsGenres: ContentGenreEntity[];
}