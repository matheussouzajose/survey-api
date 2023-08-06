import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '@/domain/models/survey'
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import { throwError } from '@/domain/test/test-helpers'
import { mockSurveysModel } from '@/domain/test/mock-survey'

const makeLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => {
        resolve(mockSurveysModel())
      })
    }
  }

  return new LoadSurveysRepositoryStub()
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

describe('DbSaveSurveyResult UseCase', () => {
  test('Should call LoadSurveysRepository with correct value', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return null if LoadSurveysRepository return null', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const surveys = await sut.loadAll()
    expect(surveys).toEqual([])
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(mockSurveysModel())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
