import { CheckSurveyByIdUseCase } from '@/Data/UseCases/Survey/CheckSurveyByIdUseCase'
import { CheckSurveyByIdRepositorySpy } from '@/tests/Data/Mocks/SurveyUseCaseMock'
import { throwError } from '@/tests/Domain/Mocks/TestHelpers'
import faker from 'faker'

type SutTypes = {
  sut: CheckSurveyByIdUseCase
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new CheckSurveyByIdUseCase(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('LoadSurveyById UseCase', () => {
  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('Should call CheckSurveyByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById(surveyId)
    expect(checkSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('Should return true if CheckSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(surveyId)
    expect(exists).toBe(true)
  })

  test('Should return false if CheckSurveyByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    checkSurveyByIdRepositorySpy.result = false
    const exists = await sut.checkById(surveyId)
    expect(exists).toBe(false)
  })

  test('Should throw if CheckSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
