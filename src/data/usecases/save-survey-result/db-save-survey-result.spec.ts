import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
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
const makeSurveyResultModel = (): SurveyResultModel => {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

const makeSaveSurveyResultModel = (): SaveSurveyResultModel => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

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

    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeSaveSurveyResultModel())
    expect(addSpy).toHaveBeenCalledWith(makeSaveSurveyResultModel())
  })

  // test('Should throw if AddSurveyRepository throws', async () => {
  //   const { sut, addSurveyRepositoryStub } = makeSut()
  //
  //   jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
  //   const promise = sut.add(makeAddSurveyModel())
  //   await expect(promise).rejects.toThrow()
  // })

  // test('Should return an add-account on success', async () => {
  //   const { sut } = makeSut()
  //   const account = await sut.add(makeAddSurveyModel())
  //   expect(account).toEqual(makeFakeSurveyModel())
  // })
})
