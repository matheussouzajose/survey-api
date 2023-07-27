import { type Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldCompareToName: string) {
  }

  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.fieldCompareToName]) {
      return new InvalidParamError(this.fieldCompareToName)
    }
    return null
  }
}
