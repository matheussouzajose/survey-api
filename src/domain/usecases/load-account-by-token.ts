import { type Account } from '@/domain/models/account'

export interface LoadAccountByToken {
  loadByToken: (accessToken: string, role?: string) => Promise<Account | null>
}
