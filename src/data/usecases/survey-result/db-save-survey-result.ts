import { type SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    return this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
  }
}
