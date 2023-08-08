import { type LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbLoadAnswersBySurvey } from '@/data/usecases/survey/db-load-answers-by-survey.ts'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
