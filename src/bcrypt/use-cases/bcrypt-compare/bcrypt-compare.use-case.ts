import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptCompareUseCase {
    async execute(text: string, hash: string): Promise<boolean> {
        return bcrypt.compare(text, hash);
    }
}