import { type EncrypterProtocol } from '@/Data/Protocols/Criptography/EncrypterProtocol'
import { type DecrypterProtocol } from '@/Data/Protocols/Criptography/DecrypterProtocol'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements EncrypterProtocol, DecrypterProtocol {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret)
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
