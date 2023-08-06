import {
  type Authentication,
  type AuthenticationParams,
  type HashComparer,
  type Encrypter,
  type UpdateAccessTokenRepository,
  type LoadAccountByEmailRepository
} from './db-authentication-protocols'

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
