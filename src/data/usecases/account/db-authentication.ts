import { type Authentication } from '@/domain/usecases/account/authentication'
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
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (!account) {
      return null
    }

    const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
    if (!isValid) {
      return null
    }

    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return {
      accessToken,
      name: account.name
    }
  }
}
