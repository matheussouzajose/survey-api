import { type AccountModel } from '@/domain/models/account-model'

export interface LoadAccountByToken {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
