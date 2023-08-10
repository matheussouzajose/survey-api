import { type Survey } from '@/Domain/Models/Survey'

export interface LoadSurveysProtocol {
  load: (userId: string) => Promise<LoadSurveys.Result>
}

export namespace LoadSurveys {
  export type Result = Survey[]
}
