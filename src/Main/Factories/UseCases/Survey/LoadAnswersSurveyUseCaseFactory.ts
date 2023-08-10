import { type LoadAnswersBySurveyProtocol } from '@/Domain/UseCases/Survey/LoadAnswersBySurveyProtocol'
import { SurveyMongoRepository } from '@/Infra/Db/MongoDb/Survey/SurveyMongoRepository'
import { LoadAnswersBySurveyUseCase } from '@/Data/UseCases/Survey/LoadAnswersBySurveyUseCase'

export const makeLoadAnswersSurveyUseCase = (): LoadAnswersBySurveyProtocol => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new LoadAnswersBySurveyUseCase(surveyMongoRepository)
}
