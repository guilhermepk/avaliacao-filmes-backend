import { EntityTemplate } from "src/common/models/entities/entity-template";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RatingVisibilitiesEnum } from "../enums/rating-visibilities.enum";
import { Max, Min } from "class-validator";
import { UserEntity } from "src/user/models/entities/user.entity";
import { ContentEntity } from "src/content/models/entities/content.entity";

@Entity({ name: 'ratings', schema: process.env.DB_SCHEMA })
export class RatingEntity extends EntityTemplate {
    public static MIN_SCORE = 1
    public static MAX_SCORE = 10;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    @Min(RatingEntity.MIN_SCORE, { message: `'score' deve ser no mínimo ${RatingEntity.MIN_SCORE}` })
    @Max(RatingEntity.MAX_SCORE, { message: `'score' deve ser no máximo ${RatingEntity.MAX_SCORE}` })
    score: number;

    @Column({ type: 'enum', enum: RatingVisibilitiesEnum })
    visibility: RatingVisibilitiesEnum;

    // --{ RELATIONS }--

    @JoinColumn({ name: 'fk_user' })
    @ManyToOne(() => UserEntity, user => user.ratings, { nullable: false })
    user: UserEntity;

    @JoinColumn({ name: 'fk_content' })
    @ManyToOne(() => ContentEntity, content => content.ratings, { nullable: false })
    content: ContentEntity;
}