import { type SurveyModel } from '../models/survey-model'

export interface LoadSurveys {
  loadAll: () => Promise<SurveyModel[]>
}
