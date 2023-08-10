import { AuthMiddleware } from '@/Presentation/Middlewares/AuthMiddleware'
import { LoadUserByTokenSpy } from '@/tests/Presentation/Mocks/UserMock'
import { AccessDeniedError } from '@/Presentation/Errors/AccessDeniedError'
import { forbidden, ok, serverError } from '@/Presentation/Helpers/Http/HttpHelper'
import { throwError } from '@/tests/Domain/Mocks/TestHelpers'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadUserByTokenSpy: LoadUserByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadUserByTokenSpy = new LoadUserByTokenSpy()
  const sut = new AuthMiddleware(loadUserByTokenSpy, role)
  return {
    sut,
    loadUserByTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadUserByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadUserByTokenSpy.accessToken).toBe(httpRequest.accessToken)
    expect(loadUserByTokenSpy.role).toBe(role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadUserByTokenSpy } = makeSut()
    loadUserByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadUserByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      userId: loadUserByTokenSpy.result.id
    }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadUserByTokenSpy } = makeSut()
    jest.spyOn(loadUserByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
