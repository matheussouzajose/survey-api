import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { type EmailValidatorProtocol } from '@/Validation/Protocols/EmailValidatorProtocol'
import { InvalidParamError } from '@/Presentation/Errors/InvalidParamError'

export class EmailValidation implements ValidationProtocol {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidatorProtocol
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
