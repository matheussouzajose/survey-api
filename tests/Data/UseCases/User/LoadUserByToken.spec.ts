import { LoadUserByTokenUseCase } from '@/Data/UseCases/User/LoadUserByTokenUseCase'
import { DecrypterSpy } from '@/tests/Data/Mocks/CryptographyUseCaseMock'
import { LoadUserByTokenRepositorySpy } from '@/tests/Data/Mocks/UserUseCaseMock'
import { throwError } from '@/tests/Domain/Mocks/TestHelpers'
import faker from 'faker'

type SutTypes = {
  sut: LoadUserByTokenUseCase
  decrypterSpy: DecrypterSpy
  loadUserByTokenRepositorySpy: LoadUserByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadUserByTokenRepositorySpy = new LoadUserByTokenRepositorySpy()
  const sut = new LoadUserByTokenUseCase(decrypterSpy, loadUserByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadUserByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('LoadUserByToken UseCase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid()
    role = faker.random.word()
  })

  test('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const User = await sut.load(token, role)
    expect(User).toBeNull()
  })

  test('Should call LoadUserByTokenRepository with correct values', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    await sut.load(token, role)
    expect(loadUserByTokenRepositorySpy.token).toBe(token)
    expect(loadUserByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadUserByTokenRepository returns null', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    loadUserByTokenRepositorySpy.result = null
    const User = await sut.load(token, role)
    expect(User).toBeNull()
  })

  test('Should return an User on success', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    const User = await sut.load(token, role)
    expect(User).toEqual(loadUserByTokenRepositorySpy.result)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const User = await sut.load(token, role)
    expect(User).toBeNull()
  })

  test('Should throw if LoadUserByTokenRepository throws', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadUserByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })
})
