import { Body, Controller, Post } from "@nestjs/common";
import { LoginUseCase } from "./login.use-case";
import { LoginDto } from "src/auth/models/dtos/login.dto";

@Controller('auth')
export class LoginController {
    constructor(
        private readonly useCase: LoginUseCase
    ){}

    @Post('login')
    async execute(
        @Body() body: LoginDto
    ){
        return await this.useCase.execute(body);
    }
}