import { type SaveSurveyResult } from '@/Domain/UseCases/SurveyResult/SaveSurveyResultProtocol'

export interface SaveSurveyResultRepositoryProtocol {
  save: (data: SaveSurveyResultRepository.Params) => Promise<void>
}

export namespace SaveSurveyResultRepository {
  export type Params = SaveSurveyResult.Params
}
