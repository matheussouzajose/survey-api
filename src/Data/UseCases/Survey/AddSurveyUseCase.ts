import { type AddSurvey, type AddSurveyProtocol } from '@/Domain/UseCases/Survey/AddSurveyProtocol'
import { type AddSurveyRepositoryProtocol } from '@/Data/Protocols/Repository/Survey/AddSurveyRepositoryProtocol'

export class AddSurveyUseCase implements AddSurveyProtocol {
  constructor (private readonly addSurveyRepository: AddSurveyRepositoryProtocol) {}

  async add (data: AddSurvey.Params): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
