import { LoadSurveysController } from '@/Presentation/Controllers/Survey/LoadSurveysController'
import {
  makeLoadSurveysUseCase
} from '@/Main/Factories/UseCases/Survey/LoadSurveysUseCaseFactory'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'

export const makeLoadSurveysController = (): ControllerProtocol => {
  const signUpController = new LoadSurveysController(makeLoadSurveysUseCase())
  return makeLogControllerDecorator(signUpController)
}
