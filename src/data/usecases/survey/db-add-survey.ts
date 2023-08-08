import { type AddSurvey } from '@/domain/usecases/survey/add-survey'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurvey.Params): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
