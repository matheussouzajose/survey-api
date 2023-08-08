import { DbAddSurvey } from '@/data/usecases/survey/db-add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { type AddSurvey } from '@/domain/usecases/survey/add-survey'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
