import { type Validation } from '@/presentation/protocols/validation'
import { type AddSurvey } from '@/domain/usecases/survey/add-survey'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors/server-error'
import { throwError } from '@/domain/test/test-helpers'
import { mockAddSurvey, mockAddSurveyParams, mockSurveyModel } from '@/domain/test/mock-survey'
import { mockHttpRequest, mockValidation } from '@/presentation/test/mock-protocols'
import MockDate from 'mockdate'

const httpRequest = mockHttpRequest({
  body: mockAddSurveyParams()
})

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}
const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addSurveyStub = mockAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      question: httpRequest.body.question,
      answers: httpRequest.body.answers,
      date: new Date()
    })
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created(mockSurveyModel()))
  })
})
