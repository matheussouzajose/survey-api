import { type LoadAccountByTokenRepository } from '../../protocols/db/account'
import { type AccountModel, type Decrypter } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByEmailRepository: LoadAccountByTokenRepository
  ) {
  }

  async loadByToken (token: string, role?: string | undefined): Promise<AccountModel | null> {
    const result = await this.decrypter.decrypt(token)
    if (!result) {
      return null
    }
    const account = await this.loadAccountByEmailRepository.loadByToken(token, role)

    if (!account) {
      return null
    }

    return account
  }
}
