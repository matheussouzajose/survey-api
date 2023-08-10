import { LoadSurveyResultController } from '@/Presentation/Controllers/SurveyResult/LoadSurveyResultController'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import {
  makeCheckSurveyByIdUseCase
} from '@/Main/Factories/UseCases/Survey/CheckSurveyByIdUseCaseFactory'
import {
  makeLoadSurveyResultUseCase
} from '@/Main/Factories/UseCases/SurveyResult/LoadSurveyResultUseCaseFactory'

export const makeLoadSurveyResultController = (): ControllerProtocol => {
  const controller = new LoadSurveyResultController(makeCheckSurveyByIdUseCase(), makeLoadSurveyResultUseCase())
  return makeLogControllerDecorator(controller)
}
