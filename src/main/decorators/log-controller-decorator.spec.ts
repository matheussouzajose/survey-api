import { type Controller } from '@/presentation/protocols/controller'
import { created, serverError } from '@/presentation/helpers/http/http-helper'
import { type LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { mockAccountModel } from '@/domain/test/mock-account'
import { mockLogErrorRepository } from '@/data/test/db-log'
import { mockController, mockHttpRequest } from '@/presentation/test/mock-protocols'

const fakeRequest = mockHttpRequest({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = mockController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}
describe('LogDecorator Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(fakeRequest)
    expect(handleSpy).toHaveBeenCalledWith(fakeRequest)
  })

  test('Should return the same result of controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(created(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => { resolve(serverError(fakeError)) }))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(fakeRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
