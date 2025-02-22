import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserUseCase } from "./register-user.use-case";
import { RegisterUserDto } from "src/user/models/dtos/register-user.dto";

@Controller('user')
export class RegisterUserController {
    constructor(
        private readonly useCase: RegisterUserUseCase
    ){}

    @Post('register')
    async execute(
        @Body() body: RegisterUserDto
    ){
        return await this.useCase.execute(body);
    }
}