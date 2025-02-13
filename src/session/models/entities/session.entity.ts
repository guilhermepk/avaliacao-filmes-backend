import { EntityTemplate } from "src/common/models/entities/entity-template";
import { UserEntity } from "src/user/models/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'sessions', schema: process.env.DB_SCHEMA })
export class SessionEntity extends EntityTemplate {
    @Column({ type: 'varchar', nullable: false, name: 'refresh_token' })
    refreshToken: string;

    // --{ RELATIONS }--

    @JoinColumn({ name: 'fk_user' })
    @ManyToOne(() => UserEntity, user => user.sessions, { nullable: false })
    user: UserEntity;
}