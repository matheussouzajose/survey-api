import {
  type AddSurveyRepository,
  type AddSurveyRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/AddSurveyRepositoryProtocol'
import {
  type LoadSurveyByIdRepository,
  type LoadSurveyByIdRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadSurveyByIdRepositoryProtocol'
import { mockSurveyModel, mockSurveyModels } from '@/tests/Domain/Mocks/SurveyMock'
import {
  type LoadAnswersBySurveyRepository,
  type LoadAnswersBySurveyRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadAnswersBySurveyRepositoryProtocol'
import {
  type CheckSurveyByIdRepository,
  type CheckSurveyByIdRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/CheckSurveyByIdRepositoryProtocol'
import {
  type LoadSurveysRepository,
  type LoadSurveysRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadSurveysRepositoryProtocol'

import faker from 'faker'
export class AddSurveyRepositorySpy implements AddSurveyRepositoryProtocol {
  params: AddSurveyRepository.Params

  async add (params: AddSurveyRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepositoryProtocol {
  id: string
  result = mockSurveyModel()

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepositoryProtocol {
  id: string
  result = [
    faker.random.word(),
    faker.random.word()
  ]

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepositoryProtocol {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepositoryProtocol {
  userId: string
  result = mockSurveyModels()

  async loadAll (userId: string): Promise<LoadSurveysRepository.Result> {
    this.userId = userId
    return this.result
  }
}
