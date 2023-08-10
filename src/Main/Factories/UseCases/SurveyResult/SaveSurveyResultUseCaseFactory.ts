import { type SaveSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/SaveSurveyResultProtocol'
import { SurveyResultMongoRepository } from '@/Infra/Db/MongoDb/SurveyResult/SurveyResultMongoRepository'
import { SaveSurveyResultUseCase } from '@/Data/UseCases/SurveyResult/SaveSurveyResultUseCase'

export const makeSaveSurveyResultUseCase = (): SaveSurveyResultProtocol => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new SaveSurveyResultUseCase(surveyResultMongoRepository, surveyResultMongoRepository)
}
