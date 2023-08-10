import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import {
  makeLoadAnswersSurveyUseCase
} from '@/Main/Factories/UseCases/Survey/LoadAnswersSurveyUseCaseFactory'
import {
  makeSaveSurveyResultUseCase
} from '@/Main/Factories/UseCases/SurveyResult/SaveSurveyResultUseCaseFactory'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'
import { SaveSurveyResultController } from '@/Presentation/Controllers/SurveyResult/SaveSurveyResultController'

export const makeSaveSurveyResultController = (): ControllerProtocol => {
  const controller = new SaveSurveyResultController(makeLoadAnswersSurveyUseCase(), makeSaveSurveyResultUseCase())
  return makeLogControllerDecorator(controller)
}
