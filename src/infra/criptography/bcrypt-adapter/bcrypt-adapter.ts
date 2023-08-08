import { type Hasher } from '@/data/protocols/criptography/hasher'
import { type HashComparer } from '@/data/protocols/criptography/hash-comparer'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}
