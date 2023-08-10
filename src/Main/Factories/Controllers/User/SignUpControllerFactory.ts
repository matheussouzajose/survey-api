import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { makeAddUserUseCase } from '@/Main/Factories/UseCases/User/AddUserUseCaseFactory'
import { makeSignUpValidation } from '@/Main/Factories/Controllers/User/SignupValidationFactory'
import { makeAuthenticationUseCase } from '@/Main/Factories/UseCases/User/AuthenticationUseCaseFactory'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'
import { SignUpController } from '@/Presentation/Controllers/User/SignUpController'

export const makeSignUpController = (): ControllerProtocol => {
  const signUpController = new SignUpController(makeAddUserUseCase(), makeSignUpValidation(), makeAuthenticationUseCase())
  return makeLogControllerDecorator(signUpController)
}
