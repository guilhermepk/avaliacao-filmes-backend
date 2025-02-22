import { ConflictException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterUserDto } from "src/user/models/dtos/register-user.dto";
import { UserEntity } from "src/user/models/entities/user.entity";
import { UserTypeOrmRepository } from "src/user/repositories/user.repository";
import { FindUserByNicknameUseCase } from "../find-user-by-nickname/find-user-by-nickname.use-case";
import { tryCatch } from "src/common/functions/try-catch";
import { BcryptHashPasswordUseCase } from "src/bcrypt/use-cases/bcrypt-hash/bcrypt-hash.use-case";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly typeOrmRepository: UserTypeOrmRepository,
        private readonly findUserByNicknameUseCase: FindUserByNicknameUseCase,
        private readonly bcryptHashPasswordUseCase: BcryptHashPasswordUseCase
    ){}

    async execute(data: RegisterUserDto): Promise<{ success: true }> {
        return tryCatch(async () => {
            const { name, nickname, password } = data;
    
            const userFound = await this.findUserByNicknameUseCase.execute(nickname)
                .catch((error: Error | HttpException) => {
                    if (error instanceof HttpException && error.getStatus() == 404) return null;
                    else throw error;
                });
    
            if (userFound) throw new ConflictException(`Já existe um usuário com o nickname '${nickname}'`);
    
            const hashedPassword: string = await this.bcryptHashPasswordUseCase.execute(password);

            const newUser: UserEntity = new UserEntity(name, nickname, hashedPassword);
    
            await this.typeOrmRepository.create(newUser);
    
            return { success: true };
        }, `Erro ao gerar usuário`);
    }
}