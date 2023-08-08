import { type AddSurvey } from '@/domain/usecases/survey/add-survey'
import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { mockSurveyModels } from '@/tests/domain/mocks/mock-survey'
import { type LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import faker from 'faker'
import { type CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'

export class AddSurveySpy implements AddSurvey {
  params: AddSurvey.Params

  async add (params: AddSurvey.Params): Promise<void> {
    this.params = params
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  accountId: string
  result = mockSurveyModels()

  async load (accountId: string): Promise<LoadSurveys.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
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

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
