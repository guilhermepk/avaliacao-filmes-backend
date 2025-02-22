import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from "../models/dtos/jwt-payload.dto";
import { UserDataDto } from "../models/dtos/user-data.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    validate(payload: JwtPayloadDto): UserDataDto {
        const { name, nickname, sub } = payload;

        return new UserDataDto(sub, name, nickname)
    }
}