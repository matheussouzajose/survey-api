import { type AddAccount, type AddAccountModel, type AccountModel, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {

  }

  // @ts-ignore
  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    await new Promise(resolve => {
      resolve(null)
    })
  }
}
