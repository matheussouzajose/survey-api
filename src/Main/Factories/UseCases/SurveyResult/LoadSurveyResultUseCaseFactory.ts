import { type LoadSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/LoadSurveyResultProtocol'
import { LoadSurveyResultUseCase } from '@/Data/UseCases/SurveyResult/LoadSurveyResultUseCase'
import { SurveyMongoRepository } from '@/Infra/Db/MongoDb/Survey/SurveyMongoRepository'
import { SurveyResultMongoRepository } from '@/Infra/Db/MongoDb/SurveyResult/SurveyResultMongoRepository'

export const makeLoadSurveyResultUseCase = (): LoadSurveyResultProtocol => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new LoadSurveyResultUseCase(surveyResultMongoRepository, surveyMongoRepository)
}
