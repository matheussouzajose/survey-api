import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'

export class ValidationSpy implements ValidationProtocol {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
