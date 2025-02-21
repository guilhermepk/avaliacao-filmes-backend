import { EntityTemplate } from "src/common/models/entities/entity-template";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RatingVisibilitiesEnum } from "../enums/rating-visibilities.enum";
import { Max, Min } from "class-validator";
import { UserEntity } from "src/user/models/entities/user.entity";

@Entity({ name: 'ratings', schema: process.env.DB_SCHEMA })
export class RatingEntity extends EntityTemplate {
    public static MIN_RATING = 1
    public static MAX_RATING = 10;
    
    @Column({ type: 'integer', name: 'tmdb_content_id', nullable: false })
    tmdbContentId: number;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    @Min(RatingEntity.MIN_RATING, { message: `'rating' deve ser no mínimo ${RatingEntity.MIN_RATING}` })
    @Max(RatingEntity.MAX_RATING, { message: `'rating' deve ser no máximo ${RatingEntity.MAX_RATING}` })
    rating: number;

    @Column({ type: 'enum', enum: RatingVisibilitiesEnum })
    visibility: RatingVisibilitiesEnum;


    // --{ RELATIONS }--

    @JoinColumn({ name: 'fk_user' })
    @ManyToOne(() => UserEntity, user => user.ratings, { nullable: false })
    user: UserEntity;
}