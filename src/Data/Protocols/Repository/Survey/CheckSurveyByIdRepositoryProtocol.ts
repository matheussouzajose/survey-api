export interface CheckSurveyByIdRepositoryProtocol {
  checkById: (id: string) => Promise<CheckSurveyByIdRepository.Result>
}

export namespace CheckSurveyByIdRepository {
  export type Result = boolean
}
