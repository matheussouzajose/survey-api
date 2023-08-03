import { type Account } from '@/domain/models/account'

export type AddAccountModel = Omit<Account, 'id'>
export interface AddAccount {
  add: (account: AddAccountModel) => Promise<Account | null>
}
