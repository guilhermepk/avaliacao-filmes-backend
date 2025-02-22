import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashPasswordUseCase {
    private readonly SALT_ROUNDS = parseInt(process.env.BCRYPPT_SALT_ROUNDS) || (() => { throw new Error('BCRYPPT_SALT_ROUNDS não definido no .env'); })()

    async execute(text: string): Promise<string> {
      console.log(this.SALT_ROUNDS, typeof this.SALT_ROUNDS)
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      console.log(salt, typeof salt)
      return bcrypt.hash(text, this.SALT_ROUNDS);
    }
}