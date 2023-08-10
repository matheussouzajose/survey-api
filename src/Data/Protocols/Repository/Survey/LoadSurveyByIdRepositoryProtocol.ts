import { type Survey } from '@/Domain/Models/Survey'

export interface LoadSurveyByIdRepositoryProtocol {
  loadById: (id: string) => Promise<LoadSurveyByIdRepository.Result>
}

export namespace LoadSurveyByIdRepository {
  export type Result = Survey
}
