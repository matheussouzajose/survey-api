import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { DbAddSurvey } from './db-add-survey'
import { type AddSurveyModel, type SurveyModel } from './db-add-survey-protocols'
import MockDate from 'mockdate'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddAccountRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyModel): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(makeFakeSurveyModel()) })
    }
  }
  return new AddAccountRepositoryStub()
}
const makeAddSurveyModel = (): AddSurveyModel => {
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

interface SutTypes {
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
    await sut.add(makeAddSurveyModel())
    expect(addSpy).toHaveBeenCalledWith(makeAddSurveyModel())
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.add(makeAddSurveyModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an add-account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeAddSurveyModel())
    expect(account).toEqual(makeFakeSurveyModel())
  })
})
