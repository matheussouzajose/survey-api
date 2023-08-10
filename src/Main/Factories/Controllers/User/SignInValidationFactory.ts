import { ValidationComposite } from '@/Validation/Validators/ValidationComposite'
import { RequiredFieldValidation } from '@/Validation/Validators/RequiredFieldValidation'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { EmailValidation } from '@/Validation/Validators/EmailValidation'
import { EmailValidatorAdapter } from '@/Infra/Validators/EmailValidatorAdapter'

export const makeSignInValidation = (): ValidationComposite => {
  const validations: ValidationProtocol[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
