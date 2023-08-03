import { DbLoadSurveys } from './db-load-surveys'
import { type Survey, type LoadSurveysRepository } from './db-load-surveys-protocols'

const makeLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<Survey[]> {
      return await new Promise(resolve => {
        resolve(makeFakeSurveys())
      })
    }
  }

  return new LoadSurveysRepositoryStub()
}

const makeFakeSurveys = (): Survey[] => {
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

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys UseCase', () => {
  test('Should call LoadSurveysRepository with correct value', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return null if LoadSurveysRepository return null', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const account = await sut.loadAll()
    expect(account).toEqual([])
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.loadAll()
    expect(account).toEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
