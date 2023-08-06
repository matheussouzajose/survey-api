import { type SaveSurveyResult, type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SurveyResultModel } from '@/domain/models/survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {
  }

  async save (survey: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return await this.saveSurveyResultRepository.save(survey)
  }
}
