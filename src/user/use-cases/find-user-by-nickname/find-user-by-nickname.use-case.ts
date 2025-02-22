import { Injectable, NotFoundException } from "@nestjs/common";
import { UserTypeOrmRepository } from "src/user/repositories/user.repository";

@Injectable()
export class FindUserByNicknameUseCase {
    constructor(
        private readonly typeOrmRepository: UserTypeOrmRepository
    ){}

    async execute(nickname: string){
        return await this.typeOrmRepository.findByNickname(nickname)
            .then(response => {
                if (!response) throw new NotFoundException(`Nenhum usuário com o nickname ${nickname} encontrado`);
                else return response;
            });
    }
}