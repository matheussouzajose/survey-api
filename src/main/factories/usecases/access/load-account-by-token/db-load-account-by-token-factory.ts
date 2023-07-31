import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { DbLoadAccountByToken } from '../../../../../data/usecases/db-load-account-by-email/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { type LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import env from '../../../../config/env'
export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
