import { type LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { type Decrypter } from '@/data/protocols/criptography/decrypter'
import { type LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
      if (token) {
        const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
        if (!account) {
          return null
        }
        return account
      }
    } catch (error) {
      return null
    }
  }
}
