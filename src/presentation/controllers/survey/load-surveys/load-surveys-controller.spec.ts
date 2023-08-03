import { LoadSurveysController } from './load-surveys-controller'
import { type LoadSurveys, type SurveyModel } from './load-surveys-protocols'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_string',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async loadAll (): Promise<SurveyModel[]> {
      return makeFakeSurveys()
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
    expect(surveys).toEqual(ok(makeFakeSurveys()))
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
    jest.spyOn(loadSurveysStub, 'loadAll').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
