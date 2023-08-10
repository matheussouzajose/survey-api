import { type LoadAnswersBySurvey, type LoadAnswersBySurveyProtocol } from '@/Domain/UseCases/Survey/LoadAnswersBySurveyProtocol'
import {
  type LoadAnswersBySurveyRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadAnswersBySurveyRepositoryProtocol'

export class LoadAnswersBySurveyUseCase implements LoadAnswersBySurveyProtocol {
  constructor (private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepositoryProtocol) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    return this.loadAnswersBySurveyRepository.loadAnswers(id)
  }
}
