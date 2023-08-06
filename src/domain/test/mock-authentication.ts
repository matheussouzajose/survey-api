import { type AuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})
