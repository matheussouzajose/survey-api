import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { MissingParamError } from '@/Presentation/Errors/MissingParamError'

export class RequiredFieldValidation implements ValidationProtocol {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
