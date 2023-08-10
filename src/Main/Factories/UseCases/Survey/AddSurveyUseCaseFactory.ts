import { type AddSurveyProtocol } from '@/Domain/UseCases/Survey/AddSurveyProtocol'
import { SurveyMongoRepository } from '@/Infra/Db/MongoDb/Survey/SurveyMongoRepository'
import { AddSurveyUseCase } from '@/Data/UseCases/Survey/AddSurveyUseCase'

export const makeAddSurveyUseCase = (): AddSurveyProtocol => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new AddSurveyUseCase(surveyMongoRepository)
}
