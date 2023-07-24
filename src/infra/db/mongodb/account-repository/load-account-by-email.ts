import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { type AccountModel } from '../../../../domain/models/account'

class LoadAccountByEmail implements LoadAccountByEmailRepository {
  async load (email: string): Promise<AccountModel> {
    return {
      id: '',
      name: '',
      email: '',
      password: ''
    }
  }
}
