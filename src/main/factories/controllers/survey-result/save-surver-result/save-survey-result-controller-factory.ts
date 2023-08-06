import { type Controller } from '@/presentation/protocols/controller'
import {
  SaveSurveyResultController
} from '@/presentation/controllers/survey-result/save-survey-survey/save-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import {
  makeDbSaveSurveyResult
} from '@/main/factories/usecases/survey-result/save-surver-result/db-save-survey-result-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResult = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResult)
}
