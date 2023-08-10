import { type AuthenticationProtocol } from '@/Domain/UseCases/User/AuthenticationProtocol'
import { JwtAdapter } from '@/Infra/Criptography/JwtAdapter/JwtAdapter'
import env from '@/Main/Config/Env'
import { BcryptAdapter } from '@/Infra/Criptography/BcryptAdapter/BcryptAdapter'
import { UserMongoRepository } from '@/Infra/Db/MongoDb/User/UserMongoRepository'
import { AuthenticationUseCase } from '@/Data/UseCases/User/AuthenticationUseCase'

export const makeAuthenticationUseCase = (): AuthenticationProtocol => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const userMongoRepository = new UserMongoRepository()
  return new AuthenticationUseCase(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}
