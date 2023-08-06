import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type SurveyModel } from '@/domain/models/survey'
import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test/test-helpers'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddAccountRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyParams): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(makeFakeSurveyModel()) })
    }
  }
  return new AddAccountRepositoryStub()
}
const makeAddSurveyParams = (): AddSurveyParams => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

const makeFakeSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }],
    date: new Date()
  }
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
    await sut.add(makeAddSurveyParams())
    expect(addSpy).toHaveBeenCalledWith(makeAddSurveyParams())
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(makeAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an add-account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeAddSurveyParams())
    expect(account).toEqual(makeFakeSurveyModel())
  })
})
