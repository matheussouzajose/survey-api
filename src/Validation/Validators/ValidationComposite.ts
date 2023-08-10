import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'

export class ValidationComposite implements ValidationProtocol {
  constructor (private readonly validations: ValidationProtocol[]) {}

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
