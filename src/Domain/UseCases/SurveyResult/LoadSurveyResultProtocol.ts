import { type SurveyResult } from '@/Domain/Models/SurveyResult'

export interface LoadSurveyResultProtocol {
  load: (surveyId: string, userId: string) => Promise<LoadSurveyResult.Result>
}

export namespace LoadSurveyResult {
  export type Result = SurveyResult
}
