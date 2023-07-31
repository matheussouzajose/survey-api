import { type Controller } from '../../../../../presentation/protocols'
import { SignInController } from '../../../../../presentation/controllers/access/signin/signin-controller'
import { makeSignInValidation } from './signin-validation-factory'
import { makeDbAuthentication } from '../../../usecases/access/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignInController = (): Controller => {
  const signInController = new SignInController(makeDbAuthentication(), makeSignInValidation())
  return makeLogControllerDecorator(signInController)
}
