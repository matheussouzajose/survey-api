import { type Survey } from '@/domain/models/survey'
import { type AddSurveyModel } from '@/domain/usecases/add-survey'

export interface AddSurveyRepository {
  add: (survey: AddSurveyModel) => Promise<Survey>
}
