import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { FindListsByUserUseCase } from "./find-lists-by-user.use-case";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('list')
export class FindListsByUserController {
    constructor(
        private readonly useCase: FindListsByUserUseCase
    ){}

    @Get('find-by-user')
    async handle(
        @Req() req
    ){
        return await this.useCase.execute(req.user.id, req.user.name);
    }
}