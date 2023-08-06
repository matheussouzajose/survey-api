import { type AddSurvey, type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add (survey: AddSurveyParams): Promise<SurveyModel> {
    return await this.addSurveyRepository.add(survey)
  }
}
