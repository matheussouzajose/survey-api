import { type User } from '@/Domain/Models/User'

export interface AddUserProtocol {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = Omit<User, 'id'>
  export type Result = boolean
}
