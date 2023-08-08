import { type Controller } from '@/presentation/protocols/controller'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result-factory'
import { makeDbCheckSurveyById } from '@/main/factories/usecases/survey/check-survey-by-id-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
