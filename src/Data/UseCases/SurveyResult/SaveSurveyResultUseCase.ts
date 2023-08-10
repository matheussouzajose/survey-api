import { type SaveSurveyResult, type SaveSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/SaveSurveyResultProtocol'
import {
  type SaveSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/SaveSurveyResultRepositoryProtocol'
import {
  type LoadSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/LoadSurveyResultRepositoryProtocol'

export class SaveSurveyResultUseCase implements SaveSurveyResultProtocol {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepositoryProtocol,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepositoryProtocol
  ) {}

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    return this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.userId)
  }
}
