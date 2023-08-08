import { type Controller } from '@/presentation/protocols/controller'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import {
  makeDbSaveSurveyResult
} from '@/main/factories/usecases/survey-result/save-survey-result-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAnswersBySurvey } from '@/main/factories/usecases/survey/load-answers-survey-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
