import {
  type SaveSurveyResultModel,
  type SurveyResultModel,
  type SaveSurveyResultRepository
} from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result/db-save-survey-result'
import MockDate from 'mockdate'

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (survey: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeSurveyResultModel()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeSaveSurveyResultModel = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeSurveyResultModel = (): SurveyResultModel => Object.assign({}, makeSaveSurveyResultModel(), {
  id: 'any_id'
})

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeSaveSurveyResultModel())
    expect(saveSpy).toHaveBeenCalledWith(makeSaveSurveyResultModel())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.save(makeSaveSurveyResultModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeSaveSurveyResultModel())
    expect(surveyResult).toEqual(makeSurveyResultModel())
  })
})
