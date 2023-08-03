import { type AddSurvey, type AddSurveyModel } from '@/domain/usecases/add-survey'
import { type Survey } from '@/domain/models/survey'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add (survey: AddSurveyModel): Promise<Survey> {
    return await this.addSurveyRepository.add(survey)
  }
}
