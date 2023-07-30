export interface SurveyAnswer {
  image: string | null
  answer: string
}

export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswer[]
}
