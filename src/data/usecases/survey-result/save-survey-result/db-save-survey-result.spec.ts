import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { throwError } from '@/domain/test/test-helpers'
import MockDate from 'mockdate'

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (survey: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return makeSurveyResultModel()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeSurveyResultModel = (): SurveyResultModel => Object.assign({}, makeSaveSurveyResultParams(), {
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
    await sut.save(makeSaveSurveyResultParams())
    expect(saveSpy).toHaveBeenCalledWith(makeSaveSurveyResultParams())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(makeSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeSaveSurveyResultParams())
    expect(surveyResult).toEqual(makeSurveyResultModel())
  })
})
