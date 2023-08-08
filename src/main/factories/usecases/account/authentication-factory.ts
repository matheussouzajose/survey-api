import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'
import { type Authentication } from '@/domain/usecases/account/authentication'

export const makeDbAuthentication = (): Authentication => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
