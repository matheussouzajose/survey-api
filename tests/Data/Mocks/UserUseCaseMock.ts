import { type AddUserRepository, type AddUserRepositoryProtocol } from '@/Data/Protocols/Repository/User/AddUserRepositoryProtocol'
import {
  type LoadUserByEmailRepository,
  type LoadUserByEmailRepositoryProtocol
} from '@/Data/Protocols/Repository/User/LoadUserByEmailRepositoryProtocol'
import {
  type CheckUserByEmailRepository,
  type CheckUserByEmailRepositoryProtocol
} from '@/Data/Protocols/Repository/User/CheckUserByEmailRepositoryProtocol'
import { type LoadUserByTokenRepositoryProtocol } from '@/Data/Protocols/Repository/User/LoadUserByTokenRepositoryProtocol'
import { type LoadUserByToken } from '@/Domain/UseCases/User/LoadUserByTokenProtocol'
import {
  type UpdateAccessTokenRepositoryProtocol
} from '@/Data/Protocols/Repository/User/UpdateAccessTokenRepositoryProtocol'
import faker from 'faker'

export class AddUserRepositorySpy implements AddUserRepositoryProtocol {
  params: AddUserRepository.Params
  result = true

  async add (params: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepositoryProtocol {
  email: string
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckUserByEmailRepositorySpy implements CheckUserByEmailRepositoryProtocol {
  email: string
  result = false

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadUserByTokenRepositorySpy implements LoadUserByTokenRepositoryProtocol {
  token: string
  role: string
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (token: string, role?: string): Promise<LoadUserByToken.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepositoryProtocol {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
