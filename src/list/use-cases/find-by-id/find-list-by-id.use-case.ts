import { Injectable, NotFoundException } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch";
import { ListTypeOrmRepository } from "src/list/repositories/list.repository";

@Injectable()
export class FindListByIdUseCase {
    constructor(
        private readonly typeOrmRepository: ListTypeOrmRepository
    ){}

    async execute(id: number){
        return await tryCatch(async () => {
            return await this.typeOrmRepository.findById(id)
                .then(response => {
                    if (!response) throw new NotFoundException(`Nenhuma lista com ID ${id} encontrada`);
                    else return response
                });
        }, `Erro ao buscar lista ${id}`);
    }
}