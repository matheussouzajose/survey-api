import {
  type SaveSurveyResult,
  type SaveSurveyResultParams,
  type SurveyResultModel,
  type SaveSurveyResultRepository
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {
  }

  async save (survey: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return await this.saveSurveyResultRepository.save(survey)
  }
}
