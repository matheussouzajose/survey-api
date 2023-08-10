import { type EmailValidatorProtocol } from '@/Validation/Protocols/EmailValidatorProtocol'

export class EmailValidatorSpy implements EmailValidatorProtocol {
  isEmailValid = true
  email: string

  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}
