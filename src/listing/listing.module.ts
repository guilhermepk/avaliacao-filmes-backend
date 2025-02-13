import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListingEntity } from "./models/entities/listing.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ListingEntity])
    ],
    controllers: [],
    providers: [],
})
export class ListingModule {}