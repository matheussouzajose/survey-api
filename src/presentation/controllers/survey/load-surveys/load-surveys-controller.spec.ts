import { type SurveyModel } from '@/domain/models/survey'
import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors/server-error'
import { throwError } from '@/domain/test/test-helpers'
import { mockSurveysModel } from '@/domain/test/mock-survey'

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async loadAll (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }

  return new LoadSurveysStub()
}

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys one time', async () => {
    const {
      sut,
      loadSurveysStub
    } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.handle({})
    expect(surveys).toEqual(ok(mockSurveysModel()))
  })

  test('Should return 204 if LoadSurveys return empty', async () => {
    const {
      sut,
      loadSurveysStub
    } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const surveys = await sut.handle({})
    expect(surveys).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
