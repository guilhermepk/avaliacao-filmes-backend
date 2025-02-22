import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashPasswordUseCase {
    private readonly SALT_ROUNDS = parseInt(process.env.BCRYPPT_SALT_ROUNDS) || (() => { throw new Error('BCRYPPT_SALT_ROUNDS não definido no .env'); })()

    async execute(text: string): Promise<string> {
      return bcrypt.hash(text, this.SALT_ROUNDS);
    }
}