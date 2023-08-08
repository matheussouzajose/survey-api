import { type AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Result = boolean
}
