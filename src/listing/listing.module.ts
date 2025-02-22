import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListingEntity } from "./models/entities/listing.entity";
import { ListingTypeOrmRepository } from "./repositories/listing.repository";
import { CreateListingUseCase } from "./use-cases/create/create-listing.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([ListingEntity])
    ],
    controllers: [],
    providers: [
        ListingTypeOrmRepository,
        CreateListingUseCase
    ],
    exports: [
        CreateListingUseCase
    ]
})
export class ListingModule {}