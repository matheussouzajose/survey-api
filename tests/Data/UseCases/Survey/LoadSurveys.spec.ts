import { LoadSurveysUseCase } from '@/Data/UseCases/Survey/LoadSurveysUseCase'
import { LoadSurveysRepositorySpy } from '@/tests/Data/Mocks/SurveyUseCaseMock'
import { throwError } from '@/tests/Domain/Mocks/TestHelpers'
import faker from 'faker'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadSurveysUseCase
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new LoadSurveysUseCase(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('LoadSurveys UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const userId = faker.datatype.uuid()
    await sut.load(userId)
    expect(loadSurveysRepositorySpy.userId).toBe(userId)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const surveys = await sut.load(faker.datatype.uuid())
    expect(surveys).toEqual(loadSurveysRepositorySpy.result)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.datatype.uuid())
    await expect(promise).rejects.toThrow()
  })
})
