import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { InvalidParamError } from '@/Presentation/Errors/InvalidParamError'

export class CompareFieldsValidation implements ValidationProtocol {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
