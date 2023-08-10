import { type HasherProtocol } from '@/Data/Protocols/Criptography/HasherProtocol'
import { type HashComparerProtocol } from '@/Data/Protocols/Criptography/HashComparerProtocol'
import { type EncrypterProtocol } from '@/Data/Protocols/Criptography/EncrypterProtocol'
import { type DecrypterProtocol } from '@/Data/Protocols/Criptography/DecrypterProtocol'
import faker from 'faker'

export class HasherSpy implements HasherProtocol {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparerProtocol {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}

export class EncrypterSpy implements EncrypterProtocol {
  ciphertext = faker.datatype.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class DecrypterSpy implements DecrypterProtocol {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}
