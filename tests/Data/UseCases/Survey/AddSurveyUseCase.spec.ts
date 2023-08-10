import { AddSurveyUseCase } from '@/Data/UseCases/Survey/AddSurveyUseCase'
import { AddSurveyRepositorySpy } from '@/tests/Data/Mocks/SurveyUseCaseMock'
import { mockAddSurveyParams } from '@/tests/Domain/Mocks/SurveyMock'
import { throwError } from '@/tests/Domain/Mocks/TestHelpers'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddSurveyUseCase
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new AddSurveyUseCase(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('AddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.params).toEqual(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
