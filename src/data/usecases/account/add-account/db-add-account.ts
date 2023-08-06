import { type AddAccount, type AddAccountParams } from '@/domain/usecases/account/add-account'
import { type Hasher } from '@/data/protocols/criptography/hasher'
import { type AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { type AccountModel } from '@/domain/models/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
  }

  async add (accountData: AddAccountParams): Promise<AccountModel | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    }
    return null
  }
}
