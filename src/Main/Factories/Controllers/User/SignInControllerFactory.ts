import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import {
  makeAuthenticationUseCase
} from '@/Main/Factories/UseCases/User/AuthenticationUseCaseFactory'
import { makeSignInValidation } from '@/Main/Factories/Controllers/User/SignInValidationFactory'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'
import { SignInController } from '@/Presentation/Controllers/User/SignInController'

export const makeSignInController = (): ControllerProtocol => {
  const signInController = new SignInController(makeAuthenticationUseCase(), makeSignInValidation())
  return makeLogControllerDecorator(signInController)
}
