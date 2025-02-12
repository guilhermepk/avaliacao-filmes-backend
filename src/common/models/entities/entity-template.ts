import { PrimaryGeneratedColumn } from "typeorm";

export abstract class EntityTemplate {
    @PrimaryGeneratedColumn()
    id: number;
}