import { type Encrypter } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'
import { type Decrypter } from '@/data/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string | null> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}
