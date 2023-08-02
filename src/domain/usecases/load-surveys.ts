import { type SurveyModel } from '@/domain/models/survey-model'

export interface LoadSurveys {
  loadAll: () => Promise<SurveyModel[]>
}
