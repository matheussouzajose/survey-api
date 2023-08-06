import { type Controller } from '@/presentation/protocols/controller'
import { SignInController } from '@/presentation/controllers/account/signin/signin-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeSignInValidation } from '@/main/factories/controllers/account/signin/signin-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignInController = (): Controller => {
  const signInController = new SignInController(makeDbAuthentication(), makeSignInValidation())
  return makeLogControllerDecorator(signInController)
}
