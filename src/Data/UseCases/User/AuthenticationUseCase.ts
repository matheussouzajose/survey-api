import { type Authentication, type AuthenticationProtocol } from '@/Domain/UseCases/User/AuthenticationProtocol'
import { type LoadUserByEmailRepositoryProtocol } from '@/Data/Protocols/Repository/User/LoadUserByEmailRepositoryProtocol'
import { type HashComparerProtocol } from '@/Data/Protocols/Criptography/HashComparerProtocol'
import {
  type UpdateAccessTokenRepositoryProtocol
} from '@/Data/Protocols/Repository/User/UpdateAccessTokenRepositoryProtocol'
import { type EncrypterProtocol } from '@/Data/Protocols/Criptography/EncrypterProtocol'

export class AuthenticationUseCase implements AuthenticationProtocol {
  constructor (
    private readonly loaduserByEmailRepository: LoadUserByEmailRepositoryProtocol,
    private readonly hashComparer: HashComparerProtocol,
    private readonly encrypter: EncrypterProtocol,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepositoryProtocol
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.loaduserByEmailRepository.loadByEmail(authenticationParams.email)
    if (!user) {
      return null
    }

    const isValid = await this.hashComparer.compare(authenticationParams.password, user.password)
    if (!isValid) {
      return null
    }

    const accessToken = await this.encrypter.encrypt(user.id)
    await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
    return {
      accessToken,
      name: user.name
    }
  }
}
