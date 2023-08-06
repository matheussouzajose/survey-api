import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type SurveyModel } from '@/domain/models/survey'
import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test/test-helpers'
import { mockAddSurveyParams, mockSurveyModel } from '@/domain/test/mock-survey'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyParams): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(mockSurveyModel()) })
    }
  }
  return new AddSurveyRepositoryStub()
}

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(mockAddSurveyParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddSurveyParams())
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an add-account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddSurveyParams())
    expect(account).toEqual(mockSurveyModel())
  })
})
