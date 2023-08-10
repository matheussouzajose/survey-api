import { AddSurveyController } from '@/Presentation/Controllers/Survey/AddSurveyController'
import { makeAddSurveyValidation } from '@/Main/Factories/Controllers/Survey/AddSurveyValidationFactory'
import {
  makeAddSurveyUseCase
} from '@/Main/Factories/UseCases/Survey/AddSurveyUseCaseFactory'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'

export const makeAddSurveyController = (): ControllerProtocol => {
  const signUpController = new AddSurveyController(makeAddSurveyValidation(), makeAddSurveyUseCase())
  return makeLogControllerDecorator(signUpController)
}
