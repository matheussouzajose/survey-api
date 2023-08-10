import { type SurveyResult } from '@/Domain/Models/SurveyResult'

export interface LoadSurveyResultRepositoryProtocol {
  loadBySurveyId: (surveyId: string, userId: string) => Promise<LoadSurveyResultRepository.Result>
}

export namespace LoadSurveyResultRepository {
  export type Result = SurveyResult
}
