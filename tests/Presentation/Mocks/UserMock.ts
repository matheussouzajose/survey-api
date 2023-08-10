import { type AddUser, type AddUserProtocol } from '@/Domain/UseCases/User/AddUserProtocol'
import { type Authentication, type AuthenticationProtocol } from '@/Domain/UseCases/User/AuthenticationProtocol'
import faker from 'faker'
import { type LoadUserByToken, type LoadUserByTokenProtocol } from '@/Domain/UseCases/User/LoadUserByTokenProtocol'

export class AddUserSpy implements AddUserProtocol {
  params: AddUser.Params
  result = true

  async add (params: AddUser.Params): Promise<AddUser.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements AuthenticationProtocol {
  params: Authentication.Params
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadUserByTokenSpy implements LoadUserByTokenProtocol {
  accessToken: string
  role: string
  result = {
    id: faker.datatype.uuid()
  }

  async load (accessToken: string, role?: string): Promise<LoadUserByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
