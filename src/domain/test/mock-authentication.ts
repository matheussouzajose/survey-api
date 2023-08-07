import { type Authentication, type AuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string | null> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}
