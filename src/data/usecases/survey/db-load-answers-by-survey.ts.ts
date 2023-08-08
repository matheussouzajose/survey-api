import { type LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { type LoadAnswersBySurveyRepository } from '@/data/protocols/db/survey/load-answers-by-survey-repository'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    return this.loadAnswersBySurveyRepository.loadAnswers(id)
  }
}
