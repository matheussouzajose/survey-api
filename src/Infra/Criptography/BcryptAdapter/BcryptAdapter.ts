import { type HasherProtocol } from '@/Data/Protocols/Criptography/HasherProtocol'
import { type HashComparerProtocol } from '@/Data/Protocols/Criptography/HashComparerProtocol'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HasherProtocol, HashComparerProtocol {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}
