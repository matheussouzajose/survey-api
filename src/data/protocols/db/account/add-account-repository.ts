import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account-model'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
