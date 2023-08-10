import {
  type SaveSurveyResultRepository,
  type SaveSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/SaveSurveyResultRepositoryProtocol'
import {
  type LoadSurveyResultRepository,
  type LoadSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/LoadSurveyResultRepositoryProtocol'
import { mockSurveyResultModel } from '@/tests/Domain/Mocks/SurveyResultMock'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepositoryProtocol {
  params: SaveSurveyResultRepository.Params

  async save (params: SaveSurveyResultRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepositoryProtocol {
  surveyId: string
  userId: string
  result = mockSurveyResultModel()

  async loadBySurveyId (surveyId: string, userId: string): Promise<LoadSurveyResultRepository.Result> {
    this.surveyId = surveyId
    this.userId = userId
    return this.result
  }
}
