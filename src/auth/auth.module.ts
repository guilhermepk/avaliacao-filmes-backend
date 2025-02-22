import { Module, OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LoginController } from "./use-cases/login/login.controller";
import { LoginUseCase } from "./use-cases/login/login.use-case";
import { JwtStrategy } from './strategies/jwt.strategy';
import * as dotenv from 'dotenv';
import { BcryptModule } from "src/bcrypt/bcrypt.module";
import { UserModule } from "src/user/user.module";

dotenv.config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        }),
        BcryptModule,
        UserModule
    ],
    controllers: [
        LoginController
    ],
    providers: [
        JwtStrategy,
        LoginUseCase
    ]
})
export class AuthModule implements OnModuleInit {
    onModuleInit() {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET não definido');
    }
}