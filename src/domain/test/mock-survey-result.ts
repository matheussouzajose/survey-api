import { type SaveSurveyResult, type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => Object.assign({}, mockSaveSurveyResultParams(), {
  id: 'any_id'
})

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class AddSurveyStub implements SaveSurveyResult {
    async save (survey: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => {
        resolve(mockSurveyResultModel())
      })
    }
  }

  return new AddSurveyStub()
}
