import { type Controller } from '@/presentation/protocols/controller'
import { SignInController } from '@/presentation/controllers/account/signin-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication-factory'
import { makeSignInValidation } from '@/main/factories/controllers/account/signin-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignInController = (): Controller => {
  const signInController = new SignInController(makeDbAuthentication(), makeSignInValidation())
  return makeLogControllerDecorator(signInController)
}
