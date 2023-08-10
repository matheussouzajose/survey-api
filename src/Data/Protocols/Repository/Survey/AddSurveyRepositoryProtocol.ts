import { type AddSurvey } from '@/Domain/UseCases/Survey/AddSurveyProtocol'

export interface AddSurveyRepositoryProtocol {
  add: (data: AddSurveyRepository.Params) => Promise<void>
}

export namespace AddSurveyRepository {
  export type Params = AddSurvey.Params
}
