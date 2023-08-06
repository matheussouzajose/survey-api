import { type Controller } from '@/presentation/protocols/controller'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoadSurveysController = (): Controller => {
  const signUpController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(signUpController)
}
