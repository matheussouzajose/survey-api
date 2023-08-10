import { type AddUserProtocol } from '@/Domain/UseCases/User/AddUserProtocol'
import { BcryptAdapter } from '@/Infra/Criptography/BcryptAdapter/BcryptAdapter'
import { UserMongoRepository } from '@/Infra/Db/MongoDb/User/UserMongoRepository'
import { AddUserUseCase } from '@/Data/UseCases/User/AddUserUseCase'

export const makeAddUserUseCase = (): AddUserProtocol => {
  const bcryptAdapter = new BcryptAdapter(12)
  const userMongoRepository = new UserMongoRepository()
  return new AddUserUseCase(bcryptAdapter, userMongoRepository, userMongoRepository)
}
