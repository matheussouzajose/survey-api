import { type LoadUserByTokenProtocol } from '@/Domain/UseCases/User/LoadUserByTokenProtocol'
import { JwtAdapter } from '@/Infra/Criptography/JwtAdapter/JwtAdapter'
import { LoadUserByTokenUseCase } from '@/Data/UseCases/User/LoadUserByTokenUseCase'
import { UserMongoRepository } from '@/Infra/Db/MongoDb/User/UserMongoRepository'
import env from '@/Main/Config/Env'

export const makeLoadUserByTokenUseCase = (): LoadUserByTokenProtocol => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new LoadUserByTokenUseCase(jwtAdapter, userMongoRepository)
}
