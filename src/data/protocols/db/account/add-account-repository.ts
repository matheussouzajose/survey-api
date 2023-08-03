import { type AddAccountModel } from '@/domain/usecases/add-account'
import { type Account } from '@/domain/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<Account>
}
