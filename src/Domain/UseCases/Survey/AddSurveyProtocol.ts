import { type Survey } from '@/Domain/Models/Survey'

export interface AddSurveyProtocol {
  add: (data: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey {
  export type Params = Omit<Survey, 'id'>
}
