import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../models/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserTypeOrmRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ){}

    async create(user: UserEntity) {
        return this.repository.save(user);
    }

    async findByNickname(nickname: string) {
        return await this.repository.findOne({ where: { nickname } });
    }
}