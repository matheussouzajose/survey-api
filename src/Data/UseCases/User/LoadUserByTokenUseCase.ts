import { type LoadUserByToken, type LoadUserByTokenProtocol } from '@/Domain/UseCases/User/LoadUserByTokenProtocol'
import { type DecrypterProtocol } from '@/Data/Protocols/Criptography/DecrypterProtocol'
import { type LoadUserByTokenRepositoryProtocol } from '@/Data/Protocols/Repository/User/LoadUserByTokenRepositoryProtocol'

export class LoadUserByTokenUseCase implements LoadUserByTokenProtocol {
  constructor (
    private readonly decrypter: DecrypterProtocol,
    private readonly loaduserByTokenRepository: LoadUserByTokenRepositoryProtocol
  ) {
  }

  async load (accessToken: string, role?: string): Promise<LoadUserByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (!token) {
      return null
    }

    const user = await this.loaduserByTokenRepository.loadByToken(accessToken, role)
    if (!user) {
      return null
    }
    return user
  }
}
