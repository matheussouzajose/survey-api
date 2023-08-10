import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { LogControllerDecorator } from '@/Main/Decorators/LogControllerDecorator'
import { LogErrorRepositorySpy } from '@/tests/Data/Mocks/LogUseCaseMock'
import { ok,serverError } from '@/Presentation/Helpers/Http/HttpHelper'
import faker from 'faker'

class ControllerSpy implements ControllerProtocol {
  httpResponse = ok(faker.datatype.uuid())
  request: any

  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(faker.lorem.sentence())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(faker.lorem.sentence())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
