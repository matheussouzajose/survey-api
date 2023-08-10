import { type AddUser } from '@/Domain/UseCases/User/AddUserProtocol'
import { type Authentication } from '@/Domain/UseCases/User/AuthenticationProtocol'
import faker from 'faker'

export const mockAddUserParams = (): AddUser.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
