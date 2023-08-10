export interface LoadAnswersBySurveyProtocol {
  loadAnswers: (id: string) => Promise<LoadAnswersBySurvey.Result>
}

export namespace LoadAnswersBySurvey {
  export type Result = string[]
}
