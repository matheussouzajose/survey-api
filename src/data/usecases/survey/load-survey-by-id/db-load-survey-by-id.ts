import { type LoadSurveysById } from '@/domain/usecases/survey/load-survey-by-id'
import { type LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { type SurveyModel } from '@/domain/models/survey'

export class DbLoadSurveyById implements LoadSurveysById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {
  }

  async loadById (id: string): Promise<SurveyModel | null> {
    return await this.loadSurveyByIdRepository.loadById(id)
  }
}
