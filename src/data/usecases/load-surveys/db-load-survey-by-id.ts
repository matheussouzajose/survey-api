import { type SurveyModel } from './db-load-survey-by-id-protocols'
import { type LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { type LoadSurveysById } from '@/domain/usecases/load-survey-by-id'

export class DbLoadSurveyById implements LoadSurveysById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {
  }

  async loadById (id: string): Promise<SurveyModel | null> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    if (!survey) {
      return null
    }
    return survey
  }
}
