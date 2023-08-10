import { type SurveyResult } from '@/Domain/Models/SurveyResult'

export interface SaveSurveyResultProtocol {
  save: (data: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}

export namespace SaveSurveyResult {
  export type Params = {
    surveyId: string
    userId: string
    answer: string
    date: Date
  }

  export type Result = SurveyResult
}
