import { type Authentication } from '@/domain/usecases/account/authentication'
import { type Validation } from '@/presentation/protocols/validation'
import { SignInController } from '@/presentation/controllers/account/signin/signin-controller'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors/server-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { throwError } from '@/domain/test/test-helpers'
import { mockAuthentication, mockAuthenticationParams } from '@/domain/test/mock-authentication'
import { mockHttpRequest, mockValidation } from '@/presentation/test/mock-protocols'

const httpRequest = mockHttpRequest({
  body: mockAuthenticationParams()
})

type SutTypes = {
  sut: SignInController
  authenticationStub: Authentication
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new SignInController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('SignIn Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('Should return 401 if invalid credentials provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
