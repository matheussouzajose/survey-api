import { type Survey } from '@/Domain/Models/Survey'

export interface LoadSurveysRepositoryProtocol {
  loadAll: (userId: string) => Promise<LoadSurveysRepository.Result>
}

export namespace LoadSurveysRepository {
  export type Result = Survey[]
}
