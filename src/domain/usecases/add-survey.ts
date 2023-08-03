import { type Survey } from '@/domain/models/survey'

export type AddSurveyModel = Omit<Survey, 'id'>

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<Survey>
}
