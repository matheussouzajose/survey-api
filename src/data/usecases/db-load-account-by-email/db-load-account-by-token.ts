import { type LoadAccountByTokenRepository } from '../../protocols/db/account'
import { type AccountModel, type Decrypter } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByEmailRepository: LoadAccountByTokenRepository
  ) {
  }

  async loadByToken (token: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.decrypter.decrypt(token)
    return {
      id: '',
      name: '',
      email: '',
      password: ''
    }
  }
}
