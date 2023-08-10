import { type AddSurvey, type AddSurveyProtocol } from '@/Domain/UseCases/Survey/AddSurveyProtocol'
import { mockSurveyModels } from '@/tests/Domain/Mocks/SurveyMock'
import { type LoadSurveys, type LoadSurveysProtocol } from '@/Domain/UseCases/Survey/LoadSurveysProtocol'
import { type LoadAnswersBySurvey, type LoadAnswersBySurveyProtocol } from '@/Domain/UseCases/Survey/LoadAnswersBySurveyProtocol'
import { type CheckSurveyById, type CheckSurveyByIdProtocol } from '@/Domain/UseCases/Survey/CheckSurveyByIdProtocol'
import faker from 'faker'

export class AddSurveySpy implements AddSurveyProtocol {
  params: AddSurvey.Params

  async add (params: AddSurvey.Params): Promise<void> {
    this.params = params
  }
}

export class LoadSurveysSpy implements LoadSurveysProtocol {
  userId: string
  result = mockSurveyModels()

  async load (userId: string): Promise<LoadSurveys.Result> {
    this.userId = userId
    return this.result
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurveyProtocol {
  id: string
  result = [
    faker.random.word(),
    faker.random.word()
  ]

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyByIdProtocol {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
