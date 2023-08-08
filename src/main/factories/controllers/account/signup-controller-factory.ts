import { type Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account-factory'
import { makeSignUpValidation } from '@/main/factories/controllers/account/signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
