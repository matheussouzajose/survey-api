import { type SaveSurveyResult, type SaveSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/SaveSurveyResultProtocol'
import { mockSurveyResultModel } from '@/tests/Domain/Mocks/SurveyResultMock'
import { type LoadSurveyResult, type LoadSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/LoadSurveyResultProtocol'

export class SaveSurveyResultSpy implements SaveSurveyResultProtocol {
  params: SaveSurveyResult.Params
  result = mockSurveyResultModel()

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.params = params
    return this.result
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResultProtocol {
  surveyId: string
  userId: string
  result = mockSurveyResultModel()

  async load (surveyId: string, userId: string): Promise<LoadSurveyResult.Result> {
    this.surveyId = surveyId
    this.userId = userId
    return this.result
  }
}
