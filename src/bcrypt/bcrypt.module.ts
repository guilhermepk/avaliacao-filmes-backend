import { Module } from "@nestjs/common";
import { BcryptHashPasswordUseCase } from "./use-cases/bcrypt-hash/bcrypt-hash.use-case";
import { BcryptCompareUseCase } from "./use-cases/bcrypt-compare/bcrypt-compare.use-case";

@Module({
    imports: [],
    providers: [
        BcryptHashPasswordUseCase,
        BcryptCompareUseCase
    ],
    exports: [
        BcryptHashPasswordUseCase,
        BcryptCompareUseCase
    ]
})
export class BcryptModule {}