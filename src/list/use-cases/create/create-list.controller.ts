import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CreateListUseCase } from "./create-list.use-case";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateListDto } from "src/list/models/dtos/create-list.dto";

@UseGuards(JwtAuthGuard)
@Controller('list')
export class CreateListController {
    constructor(
        private readonly useCase: CreateListUseCase
    ){}

    @Post('create')
    async handle(
        @Body() body: CreateListDto,
        @Req() req
    ){
        return await this.useCase.execute(body, req.user.id);
    }
}