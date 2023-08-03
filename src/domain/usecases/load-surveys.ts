import { type Survey } from '@/domain/models/survey'

export interface LoadSurveys {
  loadAll: () => Promise<Survey[]>
}
