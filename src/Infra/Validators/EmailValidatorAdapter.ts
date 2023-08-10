import { type EmailValidatorProtocol } from '@/Validation/Protocols/EmailValidatorProtocol'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidatorProtocol {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
