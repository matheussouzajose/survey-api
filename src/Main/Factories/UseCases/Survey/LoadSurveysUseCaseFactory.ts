import { type LoadSurveysProtocol } from '@/Domain/UseCases/Survey/LoadSurveysProtocol'
import { SurveyMongoRepository } from '@/Infra/Db/MongoDb/Survey/SurveyMongoRepository'
import { LoadSurveysUseCase } from '@/Data/UseCases/Survey/LoadSurveysUseCase'

export const makeLoadSurveysUseCase = (): LoadSurveysProtocol => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new LoadSurveysUseCase(surveyMongoRepository)
}
