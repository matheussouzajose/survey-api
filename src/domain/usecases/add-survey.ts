import { type SurveyAnswer, type SurveyModel } from '@/domain/models/survey-model'

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<SurveyModel>
}
