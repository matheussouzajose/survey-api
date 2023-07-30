import { type SurveyAnswer, type SurveyModel } from '../models/survey-model'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<SurveyModel>
}
