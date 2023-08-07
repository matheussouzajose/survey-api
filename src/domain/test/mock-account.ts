import { type AccountModel } from '@/domain/models/account'
import { type AddAccount, type AddAccountParams } from '@/domain/usecases/account/add-account'
import { type LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadByToken (token: string, role: string): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }

  return new LoadAccountByTokenStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }

  return new AddAccountStub()
}
