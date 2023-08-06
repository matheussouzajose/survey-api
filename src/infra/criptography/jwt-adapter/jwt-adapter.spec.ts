import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { throwError } from '@/domain/test/test-helpers'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => {
      resolve('any_token')
    })
  },

  async verify (): Promise<string> {
    return await new Promise(resolve => {
      resolve('any_value')
    })
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('Should throws if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)

      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith('any_id', 'secret')
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_id')
      expect(value).toBe('any_value')
    })

    test('Should throws if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)

      const promise = sut.decrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
