import { type LoadSurveysRepository } from './db-save-survey-result-protocols'
import { type SaveSurveyResult, type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {
  }

  async save (survey: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(survey)
    return {
      id: 'string',
      surveyId: 'string',
      accountId: 'string',
      answer: 'string',
      date: new Date()
    }
  }
}
