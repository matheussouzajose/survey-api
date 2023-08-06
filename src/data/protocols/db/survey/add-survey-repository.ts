import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (survey: AddSurveyParams) => Promise<SurveyModel>
}
