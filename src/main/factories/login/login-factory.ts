import env from '../../config/env'
import { type Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation-factory'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'

export const makeLoginController = (): Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
