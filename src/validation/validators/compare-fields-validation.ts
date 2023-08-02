import { type Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

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
