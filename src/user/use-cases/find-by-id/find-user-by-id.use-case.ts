import { Injectable, NotFoundException } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch";
import { UserEntity } from "src/user/models/entities/user.entity";
import { UserTypeOrmRepository } from "src/user/repositories/user.repository";

@Injectable()
export class FindUserByIdUseCase {
    constructor(
        private readonly typeOrmRepository: UserTypeOrmRepository
    ){}

    async execute(id: number): Promise<UserEntity>{
        return await tryCatch(async () => {
            return await this.typeOrmRepository.findById(id)
                .then(response => {
                    if (!response) throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
                    else return response
                });
        }, `Erro ao buscar usuário com ID ${id}`);
    }
}