import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { type Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../config/env'

export const makeSignUpController = (): Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation(), dbAuthentication)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
