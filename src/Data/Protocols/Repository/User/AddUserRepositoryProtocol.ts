import { type AddUser } from '@/Domain/UseCases/User/AddUserProtocol'

export interface AddUserRepositoryProtocol {
  add: (data: AddUserRepository.Params) => Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = AddUser.Params
  export type Result = boolean
}
