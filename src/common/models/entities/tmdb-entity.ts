import { Column } from "typeorm";
import { EntityTemplate } from "./entity-template";

export abstract class TMDBEntity extends EntityTemplate {
    @Column({ type: 'int', nullable: false, name: 'tmdb_id' })
    tmdbId: number;
}