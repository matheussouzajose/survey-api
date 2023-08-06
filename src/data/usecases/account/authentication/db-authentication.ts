import { type Authentication, type AuthenticationParams } from '@/domain/usecases/account/authentication'
import { type LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { type HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { type Encrypter } from '@/data/protocols/criptography/encrypter'
import { type UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
  }

  async auth (authentication: AuthenticationParams): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!account) {
      return null
    }

    const { id, password } = account
    const isValid = await this.hashComparer.compare(authentication.password, password)
    if (!isValid) {
      return null
    }

    const accessToken = await this.encrypter.encrypt(id)
    await this.updateAccessTokenRepository.updateAccessToken(id, accessToken)

    return accessToken
  }
}
