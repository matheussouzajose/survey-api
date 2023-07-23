import {Authentication, AuthenticationModel} from '../../../domain/usecases/authentication'
import {DbAuthentication} from './db-authentication'
import {AccountModel} from '../../../domain/models/account'
import {LoadAccountByEmailRepository} from '../../protocols/db/load-account-by-email-repository'

const makeLoadAccountByEmailRepositoryStub = () => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return new Promise(resolve => {
        resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password',
        })
      })
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const fakeMakeRequest = (): AuthenticationModel => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})

interface SutTypes {
  sut: Authentication,
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const {
      sut,
      loadAccountByEmailRepositoryStub
    } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(fakeMakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})
