import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (survey: AddSurveyModel) => Promise<SurveyModel>
}
