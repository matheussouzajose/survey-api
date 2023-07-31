import { type AccountModel } from '../models/account-model'

export interface LoadAccountByToken {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
