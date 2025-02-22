import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "../../models/dtos/login.dto";
import { tryCatch } from "src/common/functions/try-catch";
import { FindUserByNicknameUseCase } from "src/user/use-cases/find-user-by-nickname/find-user-by-nickname.use-case";
import { BcryptCompareUseCase } from "src/bcrypt/use-cases/bcrypt-compare/bcrypt-compare.use-case";
import { JwtPayloadDto } from "src/auth/models/dtos/jwt-payload.dto";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly findUserByNicknameUseCase: FindUserByNicknameUseCase,
        private readonly bcryptCompareUseCase: BcryptCompareUseCase
    ){}

    async execute(data: LoginDto): Promise<{ accessToken: string }> {
        return await tryCatch(async () => {
            const { nickname, password } = data;

            const userFound = await this.findUserByNicknameUseCase.execute(nickname)
                .catch(error => {
                    if (error.status == 404) return null;
                    else throw error;
                });

            if (userFound) {
                const validPassword = await this.bcryptCompareUseCase.execute(password, userFound.password);
    
                if (!validPassword) throw new UnauthorizedException(`Usuário ou senha inválidos`);
            } else throw new UnauthorizedException(`Usuário ou senha inválidos`);

            const payload: JwtPayloadDto = {
                nickname,
                name: userFound.name,
                sub: userFound.id
            }

            return { accessToken: this.jwtService.sign(payload) };
        }, `Erro ao realizar login`);
    }
}