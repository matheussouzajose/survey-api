import { type Controller } from '@/presentation/protocols/controller'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey-controller'
import { makeSurveyValidation } from '@/main/factories/controllers/survey/add-survey-validation-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeAddSurveyController = (): Controller => {
  const signUpController = new AddSurveyController(makeSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(signUpController)
}
