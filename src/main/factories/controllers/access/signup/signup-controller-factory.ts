import { SignUpController } from '@/presentation/controllers/access/signup/signup-controller'
import { type Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/access/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/access/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
