import { EntityTemplate } from "src/common/models/entities/entity-template";
import { Column, Entity } from "typeorm";

@Entity({ name: `users` })
export class UserEntity extends EntityTemplate {
    @Column({ type: `varchar`, nullable: false })
    name: string;

    @Column({ type: `varchar`, nullable: false })
    password: string;
}