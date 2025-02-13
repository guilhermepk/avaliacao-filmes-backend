import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionEntity } from "./models/entities/session.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([SessionEntity])
    ],
    controllers: [],
    providers: [],
})
export class SessionModule {}