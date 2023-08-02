import { type AddSurvey, type AddSurveyModel } from '@/domain/usecases/add-survey'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type SurveyModel } from '@/domain/models/survey-model'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add (survey: AddSurveyModel): Promise<SurveyModel> {
    return await this.addSurveyRepository.add(survey)
  }
}
