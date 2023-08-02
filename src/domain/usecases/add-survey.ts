import { type SurveyModel } from '@/domain/models/survey-model'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<SurveyModel>
}
