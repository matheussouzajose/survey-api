import { type CheckSurveyByIdRepositoryProtocol } from '@/Data/Protocols/Repository/Survey/CheckSurveyByIdRepositoryProtocol'
import { type CheckSurveyById, type CheckSurveyByIdProtocol } from '@/Domain/UseCases/Survey/CheckSurveyByIdProtocol'

export class CheckSurveyByIdUseCase implements CheckSurveyByIdProtocol {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepositoryProtocol) {}

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return this.checkSurveyByIdRepository.checkById(id)
  }
}
