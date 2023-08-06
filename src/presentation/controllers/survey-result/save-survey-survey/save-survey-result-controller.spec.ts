import { type SaveSurveyResult, type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type LoadSurveysById } from '@/domain/usecases/survey/load-survey-by-id'
import { type SurveyModel } from '@/domain/models/survey'
import { type HttpRequest } from '@/presentation/protocols/http'
import {
  SaveSurveyResultController
} from '@/presentation/controllers/survey-result/save-survey-survey/save-survey-result-controller'
import MockDate from 'mockdate'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { ServerError } from '@/presentation/errors/server-error'
import {throwError} from "@/domain/test/test-helpers";

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class AddSurveyStub implements SaveSurveyResult {
    async save (survey: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => {
        resolve(makeSurveyResultModel())
      })
    }
  }

  return new AddSurveyStub()
}

const makeLoadSurveyById = (): LoadSurveysById => {
  class LoadSurveysByIdStub implements LoadSurveysById {
    async loadById (id: string): Promise<SurveyModel | null> {
      return await new Promise(resolve => {
        resolve(makeSurveyModel())
      })
    }
  }

  return new LoadSurveysByIdStub()
}

const makeHttpRequest = (): HttpRequest => {
  return {
    body: {
      answer: 'any_answer'
    },
    params: {
      surveyId: 'any_survey_id'
    },
    accountId: 'any_account_id'
  }
}

const makeSurveyModel = (): SurveyModel => {
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

const makeSurveyResultModel = (): SurveyResultModel => {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveysById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)

  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call loadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const httpRequest = makeHttpRequest()

    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.params.surveyId)
  })

  test('Should return 403 if loadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = makeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if loadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if an invalid answer is provide', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_survey_id'
      },
      body: {
        answer: 'wrong_answer'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const httpRequest = makeHttpRequest()

    await sut.handle(httpRequest)
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should ok on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok(makeSurveyResultModel()))
  })
})
