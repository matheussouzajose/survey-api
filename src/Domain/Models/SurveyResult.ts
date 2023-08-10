export type SurveyResult = {
  surveyId: string
  question: string
  answers: SurveyResultAnswer[]
  date: Date
}

type SurveyResultAnswer = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentUserAnswer: boolean
}
