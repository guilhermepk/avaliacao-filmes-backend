import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AddContentToListUseCase } from "./add-content-to-list.use-case";
import { AddContentToListDto } from "src/list/models/dtos/add-content-to-list.dto";

@UseGuards(JwtAuthGuard)
@Controller('list')
export class AddContentToListController {
    constructor(
        private readonly useCase: AddContentToListUseCase
    ){}

    @Post('add-content')
    async handle(
        @Body() body: AddContentToListDto,
        @Req() req
    ){
        return await this.useCase.execute(body, req.user);
    }
}