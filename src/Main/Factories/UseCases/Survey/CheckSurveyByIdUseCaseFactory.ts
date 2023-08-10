import { type CheckSurveyByIdProtocol } from '@/Domain/UseCases/Survey/CheckSurveyByIdProtocol'
import { SurveyMongoRepository } from '@/Infra/Db/MongoDb/Survey/SurveyMongoRepository'
import { CheckSurveyByIdUseCase } from '@/Data/UseCases/Survey/CheckSurveyByIdUseCase'

export const makeCheckSurveyByIdUseCase = (): CheckSurveyByIdProtocol => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new CheckSurveyByIdUseCase(surveyMongoRepository)
}
