import { type Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey-factory'
import {
  LoadSurveysController
} from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const signUpController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(signUpController)
}
